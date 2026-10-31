// Hilfsskript SF-C3 (vorübergehend, wird nach dem Lauf gelöscht): misst im Browser mit einer Funktion aus einer Datei.
// Nutzung: node sfixc3-mass.mjs --base URL --seiten /a,/b --geraete d1440,d1920 --fn datei.js [--ruhig] [--scroll] [--zoom 2]
// Die Datei enthält einen Funktionsausdruck `() => {...}`, der im Seitenkontext läuft und JSON liefert.
import fs from 'node:fs';
import { chromium } from 'playwright';
import { ANSICHTEN, CHROME, assertLocal, bereit, installSperre, setzeEinwilligung } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const base = arg('base');
assertLocal(base);
const seiten = arg('seiten').split(',');
const geraete = arg('geraete', 'd1440').split(',');
const fn = fs.readFileSync(arg('fn'), 'utf8');
const ruhig = process.argv.includes('--ruhig');
const scroll = process.argv.includes('--scroll');
const zoom = Number(arg('zoom', '1'));
const browser = await chromium.launch({ executablePath: CHROME });
const aus = [];
for (const g of geraete) {
  for (const s of seiten) {
    const v = ANSICHTEN[g];
    const context = await browser.newContext({ viewport: { width: v.width, height: v.height }, isMobile: v.isMobile, hasTouch: v.hasTouch, deviceScaleFactor: 1, locale: 'de-DE', timezoneId: 'Europe/Berlin', reducedMotion: 'no-preference' });
    await installSperre(context);
    await setzeEinwilligung(context, 'abgelehnt', base);
    if (ruhig) await context.addInitScript(() => { try { localStorage.setItem('tezgel-bewegung', 'ruhig'); } catch {} });
    if (zoom !== 1) await context.addInitScript((z) => { document.addEventListener('DOMContentLoaded', () => { const st = document.createElement('style'); st.textContent = `html{font-size:${z * 100}% !important}`; document.head.appendChild(st); }); }, zoom);
    const page = await context.newPage();
    await page.goto(base + s, { waitUntil: 'load' });
    await bereit(page);
    if (scroll) {
      await page.evaluate(async () => { const vh = innerHeight; for (let y = 0; y < document.documentElement.scrollHeight; y += vh / 2) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 150)); } scrollTo(0, 0); await new Promise((r) => setTimeout(r, 300)); });
    }
    const wert = await page.evaluate(`(${fn})()`);
    aus.push({ geraet: g, seite: s, wert });
    await context.close();
  }
}
await browser.close();
console.log(JSON.stringify(aus, null, 1));
