// Prüfstufe A · Einzelbild: je Ansicht ein JPEG einer Seite (q70, DPR 1), dazu einzelbild.json mit HTTP-Status,
// Konsolenfehlern, ueberlauf() und ueberlappung() je Ansicht.
// Nutzung: node einzelbild.mjs [--base URL] --seite /kontakt [--ansichten m390,d1440] [--ziel DIR]
//          [--scroll 0|<px>|#anker] [--voll] [--einwilligung abgelehnt|erstbesuch|alle]
//          [--bewegung reduce|no-preference] [--warte ms]
// Standard: --base aus lib.mjs (BASE, 4310), --ansichten m390,t768,d1440, --scroll 0, Ziel
//           _werkstatt/cache/einzelbild/<seiten-slug>/. Dateiname <ansicht>.jpg, bei --voll <ansicht>-voll.jpg (ganze Seite).
// Ausgabe: Bildpfade auf stdout, Zusammenfassung auf stderr. Exit 1, wenn eine Ansicht nicht 200 liefert
// oder ein Fehler auftritt; Bilder und einzelbild.json bleiben in beiden Fällen erhalten.
// Voraussetzung: PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers (wie bei den übrigen Werkzeugen).
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { BASE, assertLocal, ANSICHTEN, GERAETE, installSperre, setzeEinwilligung, durchscrollen, bereit, slug, ensureDir, ueberlauf, versteckeDevOverlay, RELAUNCH } from './lib.mjs';
import { ueberlappungMitZahl } from './ueberlappung.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const flag = (k) => process.argv.includes(`--${k}`);

const base = arg('base', BASE);
assertLocal(base);
const seite = arg('seite', '/');
if (!seite.startsWith('/')) { console.error('--seite muss mit / beginnen'); process.exit(2); }
const ansichten = (arg('ansichten') || GERAETE.join(',')).split(',');
for (const a of ansichten) if (!ANSICHTEN[a]) { console.error(`unbekannte Ansicht: ${a}`); process.exit(2); }
const scroll = arg('scroll', '0');
if (scroll !== '0' && !scroll.startsWith('#') && !Number.isFinite(Number(scroll))) { console.error('--scroll: 0, <px> oder #anker'); process.exit(2); }
const einwilligung = arg('einwilligung', 'abgelehnt');
const bewegung = arg('bewegung', 'reduce');
const warte = Number(arg('warte', '0'));
const voll = flag('voll');
const ziel = ensureDir(arg('ziel') ? path.resolve(arg('ziel')) : path.join(RELAUNCH, 'cache', 'einzelbild', slug(seite)));

const rahmenAbwarten = (page) => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(null)))));

/** Scrollposition setzen (ohne Animation): 0, Pixelwert oder #anker. Liefert bei #anker, ob das Element gefunden wurde. */
async function setzeScroll(page) {
  if (scroll === '0') { await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); return null; }
  if (scroll.startsWith('#')) {
    return page.evaluate((id) => {
      const el = document.getElementById(id);
      if (!el) return false;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'instant' });
      return true;
    }, scroll.slice(1));
  }
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Number(scroll));
  return null;
}

const browser = await chromium.launch({ args: ['--font-render-hinting=none'] });
const ergebnisse = [];
for (const a of ansichten) {
  const v = ANSICHTEN[a];
  const context = await browser.newContext({ viewport: { width: v.width, height: v.height }, deviceScaleFactor: 1, isMobile: v.isMobile, hasTouch: v.hasTouch, reducedMotion: bewegung, locale: 'de-DE', timezoneId: 'Europe/Berlin', colorScheme: 'light' });
  const protokoll = [];
  await installSperre(context, { protokoll });
  await setzeEinwilligung(context, einwilligung, base);
  const page = await context.newPage();
  const konsole = [];
  page.on('console', (m) => { if (m.type() === 'error') konsole.push(m.text().slice(0, 300)); });
  page.on('pageerror', (e) => konsole.push(`pageerror: ${String(e.message).slice(0, 300)}`));
  const r = { ansicht: a, seite, status: null, datei: null, anker: null, konsole, ueberlauf: [], ueberlappung: [], ueberlappungGesamt: 0, ueberlappungNachArt: {}, fehler: null };
  try {
    const resp = await page.goto(base + seite, { waitUntil: 'domcontentloaded', timeout: 45000 });
    r.status = resp?.status() ?? null;
    await bereit(page);
    await versteckeDevOverlay(page);
    await durchscrollen(page); // löst Lazy-Inhalte und Auftritte aus, endet bei 0
    await bereit(page);
    if (warte > 0) await page.waitForTimeout(warte);
    r.ueberlauf = await ueberlauf(page);
    const zahl = await ueberlappungMitZahl(page); // scrollt selbst und setzt auf 0 zurück
    r.ueberlappung = zahl.befunde;
    r.ueberlappungGesamt = zahl.gesamt;
    r.ueberlappungNachArt = zahl.nachArt;
    const datei = path.join(ziel, voll ? `${a}-voll.jpg` : `${a}.jpg`);
    if (voll) {
      // Ganzseitenbild: spätes Zeichnen (content-visibility: auto, E-022) aufheben, sonst bleiben Abschnitte außerhalb des
      // Bildschirms leer, die beim Scrollen gezeichnet werden
      await page.addStyleTag({ content: '.spaet-zeichnen { content-visibility: visible !important; }' });
      await page.screenshot({ path: datei, type: 'jpeg', quality: 70, fullPage: true });
    } else {
      const anker = await setzeScroll(page);
      if (anker !== null) r.anker = anker;
      await rahmenAbwarten(page);
      await page.screenshot({ path: datei, type: 'jpeg', quality: 70 });
    }
    r.datei = datei;
  } catch (e) {
    r.fehler = String(e.message).slice(0, 300);
  }
  r.fremd = protokoll.filter((p) => p.art === 'fremd').length;
  r.blockiert = protokoll.filter((p) => p.art !== 'fremd').map((p) => `${p.art} ${p.methode} ${p.url}`);
  await context.close();
  ergebnisse.push(r);
}
await browser.close();

const bericht = { seite, base, ziel, optionen: { ansichten, scroll, voll, einwilligung, bewegung, warte, dpr: 1, qualitaet: 70 }, ergebnisse };
fs.writeFileSync(path.join(ziel, 'einzelbild.json'), JSON.stringify(bericht, null, 1));

for (const r of ergebnisse) if (r.datei && fs.existsSync(r.datei)) console.log(r.datei);
for (const r of ergebnisse) {
  const art = Object.entries(r.ueberlappungNachArt).map(([k, n]) => `${k} ${n}`).join(', ');
  console.error(`${r.ansicht} · HTTP ${r.status}${r.fehler ? ` · FEHLER ${r.fehler}` : ''}${r.anker === false ? ' · Anker fehlt' : ''} · Konsole ${r.konsole.length} · Überlauf ${r.ueberlauf.length} · Überlappung ${r.ueberlappungGesamt}${art ? ` (${art})` : ''}`);
}
console.error(`Belege: ${path.join(ziel, 'einzelbild.json')}`);
process.exitCode = ergebnisse.some((r) => r.fehler || r.status !== 200) ? 1 : 0;
