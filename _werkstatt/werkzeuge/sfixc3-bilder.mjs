// Hilfsskript SF-C3 (vorübergehend, wird nach dem Lauf gelöscht): Bildschirmfotos je Ansicht und Gerät, ruhig (ganze Seite,
// data-bewegung="ruhig" über den Speicher des Bewegungsschalters) und mit Bewegung (Ausschnitte je Bildschirmhöhe nach langsamem
// Durchscrollen, Endzustand). PNG, DPR 1, Einwilligung abgelehnt, Anfragesperre aus lib.mjs.
// Nutzung: node sfixc3-bilder.mjs --base URL --ziel DIR --seiten /a,/b [--geraete d1440,d1920,m390] [--modi ruhig,ruhigk,bewegt]
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { ANSICHTEN, CHROME, FESTE_ZEIT, assertLocal, bereit, ensureDir, installSperre, setzeEinwilligung, slug } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const base = arg('base');
const ziel = arg('ziel');
const seiten = arg('seiten').split(',');
const geraete = arg('geraete', 'd1440,d1920,m390').split(',');
const modi = arg('modi', 'ruhig,bewegt').split(',');
assertLocal(base);

async function langsam(page) {
  await page.evaluate(async () => {
    const vh = window.innerHeight;
    let y = 0;
    while (y < document.documentElement.scrollHeight - vh) {
      y += Math.round(vh * 0.5);
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 250));
    }
    await new Promise((r) => setTimeout(r, 900));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
}

const browser = await chromium.launch({ executablePath: CHROME });
const log = [];
for (const g of geraete) {
  for (const modus of modi) {
    for (const s of seiten) {
      const v = ANSICHTEN[g];
      const context = await browser.newContext({
        viewport: { width: v.width, height: v.height },
        isMobile: v.isMobile,
        hasTouch: v.hasTouch,
        deviceScaleFactor: 1,
        reducedMotion: 'no-preference',
        locale: 'de-DE',
        timezoneId: 'Europe/Berlin',
      });
      await installSperre(context);
      await setzeEinwilligung(context, 'abgelehnt', base);
      if (modus === 'ruhig' || modus === 'ruhigk') {
        await context.addInitScript(() => { try { localStorage.setItem('tezgel-bewegung', 'ruhig'); } catch {} });
      }
      const page = await context.newPage();
      await page.clock.install({ time: FESTE_ZEIT }).catch(() => {});
      await page.clock.resume().catch(() => {});
      const antwort = await page.goto(base + s, { waitUntil: 'load' });
      await bereit(page);
      await langsam(page);
      const ruhig = await page.evaluate(() => document.documentElement.getAttribute('data-bewegung'));
      const hoehe = await page.evaluate(() => document.documentElement.scrollHeight);
      if (modus === 'ruhig') {
        const datei = path.join(ensureDir(path.join(ziel, g, 'ruhig')), `${slug(s)}.png`);
        // Ganzseitenaufnahme: Abschnitte mit content-visibility auto (spaet-zeichnen) außerhalb des Fensters malt Chromium
        // sonst nicht (leere Flächen); nur für die Aufnahme sichtbar gesetzt, Lage und Größe wie nach dem Durchscrollen
        await page.addStyleTag({ content: '.spaet-zeichnen{content-visibility:visible !important}' });
        await page.waitForTimeout(400);
        await page.screenshot({ path: datei, fullPage: true });
      } else {
        // bewegt: Ausschnitte je Bildschirmhöhe; ruhigk: dieselben Ausschnitte im ruhigen Zustand (die Ganzseitenaufnahme
        // setzt in Chromium einzelne Schriftgrößen anders, O-5 von SF-B2; die Ausschnitte zeigen, was man im Fenster sieht)
        const ordner = ensureDir(path.join(ziel, g, modus === 'ruhigk' ? 'ruhig-ausschnitte' : 'bewegt', slug(s)));
        const vh = v.height;
        const n = Math.min(16, Math.ceil(hoehe / vh));
        for (let k = 0; k < n; k++) {
          await page.evaluate((y) => window.scrollTo(0, y), k * vh);
          await page.waitForTimeout(1200);
          await page.screenshot({ path: path.join(ordner, `${String(k).padStart(2, '0')}.png`) });
        }
      }
      log.push({ geraet: g, modus, seite: s, status: antwort?.status(), bewegung: ruhig, hoehe });
      console.log(g, modus, s, antwort?.status(), ruhig, hoehe);
      await context.close();
    }
  }
}
await browser.close();
fs.writeFileSync(path.join(ziel, `log-${geraete.join('_')}-${modi.join('_')}.json`), JSON.stringify(log, null, 1));
