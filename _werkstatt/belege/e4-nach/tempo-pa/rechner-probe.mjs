// Hilfsskript E4-NACH-17 (Prüfung): Bedienbarkeit des nachgeladenen Rechners auf / (ohne Absenden).
// Nutzung: node rechner-probe.mjs <Ausgabeordner> [Wiederholungen]
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const WERKZEUGE = '/home/user/tezgel/_werkstatt/werkzeuge';
const require = createRequire(path.join(WERKZEUGE, 'package.json'));
const { chromium } = require('@playwright/test');
const L = await import(path.join(WERKZEUGE, 'lib.mjs'));

const ziel = path.resolve(process.argv[2]);
const wiederholungen = Number(process.argv[3] || '3');
const base = 'http://127.0.0.1:4320';
L.assertLocal(base);
fs.mkdirSync(ziel, { recursive: true });

const ANSICHTEN = {
  m390: { width: 390, height: 844, isMobile: true, hasTouch: true },
  d1440: { width: 1440, height: 900, isMobile: false, hasTouch: false },
};

const ergebnisse = [];
for (const [name, v] of Object.entries(ANSICHTEN)) {
  for (let lauf = 1; lauf <= wiederholungen; lauf++) {
    const browser = await chromium.launch({ args: ['--font-render-hinting=none'] });
    const context = await browser.newContext({
      viewport: { width: v.width, height: v.height }, deviceScaleFactor: 1, isMobile: v.isMobile, hasTouch: v.hasTouch,
      reducedMotion: 'reduce', locale: 'de-DE', timezoneId: 'Europe/Berlin',
    });
    const protokoll = [];
    await L.installSperre(context, { protokoll });
    await L.setzeEinwilligung(context, 'abgelehnt', base);
    const page = await context.newPage();
    const fehler = [];
    page.on('pageerror', (e) => fehler.push(String(e.message).slice(0, 160)));
    page.on('console', (m) => { if (m.type() === 'error') fehler.push(m.text().slice(0, 160)); });
    const t0 = Date.now();
    await page.goto(base + '/', { waitUntil: 'load', timeout: 120000 });
    await L.versteckeDevOverlay(page);
    const gruppe = page.locator('[role="group"][aria-labelledby="calc-gewerk"]');
    let ladeMs = null;
    try {
      await gruppe.waitFor({ state: 'attached', timeout: 60000 });
      ladeMs = Date.now() - t0;
    } catch { ladeMs = null; }
    await L.bereit(page);
    const schritte = {};
    if (ladeMs !== null) {
      await gruppe.scrollIntoViewIfNeeded();
      const dienst = gruppe.locator('button[aria-pressed]').first();
      schritte.dienstVorhanden = await dienst.count();
      await dienst.click();
      schritte.dienstGewaehlt = (await dienst.getAttribute('aria-pressed')) === 'true';
      const flaeche = page.locator('[role="group"][aria-labelledby="calc-flaeche"]');
      schritte.flaecheSichtbar = await flaeche.isVisible();
      const groesse = flaeche.locator('button[aria-pressed]').first();
      await groesse.click();
      schritte.groesseGewaehlt = (await groesse.getAttribute('aria-pressed')) === 'true';
      const eigen = page.locator('#calc-custom-area');
      await eigen.fill('42');
      schritte.eigeneFlaecheWert = await eigen.inputValue();
      const rahmen = page.locator('[role="group"][aria-labelledby="calc-rahmen"]');
      schritte.rahmenSichtbar = await rahmen.isVisible();
      schritte.absendeKnopfDa = (await page.locator('form button[type="submit"]').count()) > 0;
      await page.screenshot({ path: path.join(ziel, `rechner-${name}-${lauf}.png`), fullPage: false });
    }
    ergebnisse.push({
      ansicht: name, lauf, ladeMs, schritte,
      anfragenGesendet: protokoll.filter((p) => p.art === 'anfrage').length,
      fremdAnfragen: protokoll.filter((p) => p.art === 'fremd').length,
      fehler: fehler.length, fehlerText: fehler.slice(0, 3),
    });
    await browser.close();
  }
}

const median = (xs) => { const s = xs.filter((x) => x !== null).sort((a, b) => a - b); if (!s.length) return null; const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const zusammen = Object.keys(ANSICHTEN).map((a) => {
  const rs = ergebnisse.filter((e) => e.ansicht === a);
  return {
    ansicht: a, laeufe: rs.length,
    ladeMs_median: median(rs.map((r) => r.ladeMs)), ladeMs_werte: rs.map((r) => r.ladeMs),
    dienstGewaehlt_werte: rs.map((r) => r.schritte.dienstGewaehlt),
    groesseGewaehlt_werte: rs.map((r) => r.schritte.groesseGewaehlt),
    eigeneFlaeche_werte: rs.map((r) => r.schritte.eigeneFlaecheWert),
    rahmenSichtbar_werte: rs.map((r) => r.schritte.rahmenSichtbar),
    absendeKnopfDa_werte: rs.map((r) => r.schritte.absendeKnopfDa),
    anfragenGesendet_summe: rs.reduce((n, r) => n + r.anfragenGesendet, 0),
    fremdAnfragen_summe: rs.reduce((n, r) => n + r.fremdAnfragen, 0),
    fehler_summe: rs.reduce((n, r) => n + r.fehler, 0),
  };
});
fs.writeFileSync(path.join(ziel, 'rechner-probe.json'), JSON.stringify({ erzeugt: new Date().toISOString(), basis: base, zusammen, laeufe: ergebnisse }, null, 2));
console.log(JSON.stringify(zusammen, null, 2));
