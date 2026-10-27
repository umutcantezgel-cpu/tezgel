// Probe UM-E3-DS: Größe der Pixelabweichung je Paar (größte Kanaldifferenz, Verteilung) und Element an der Abweichung.
// Lauf aus _werkstatt/werkzeuge: node <pfad>/delta.mjs URL_A URL_B seite:geraet:k [...]
import { chromium } from '/home/user/tezgel/_werkstatt/werkzeuge/node_modules/@playwright/test/index.mjs';
import { PNG } from '/home/user/tezgel/_werkstatt/werkzeuge/node_modules/pngjs/lib/png.js';
import fs from 'node:fs';
import { ANSICHTEN, installSperre, setzeEinwilligung, durchscrollen, bereit, versteckeDevOverlay } from '/home/user/tezgel/_werkstatt/werkzeuge/lib.mjs';
const [A, B, ...paare] = process.argv.slice(2);
const ZIEL = new URL('.', import.meta.url).pathname;
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
async function bild(base, seite, geraet, k) {
  const v = ANSICHTEN[geraet];
  const context = await browser.newContext({ viewport: { width: v.width, height: v.height }, deviceScaleFactor: 1, isMobile: v.isMobile, hasTouch: v.hasTouch, reducedMotion: 'reduce', locale: 'de-DE', timezoneId: 'Europe/Berlin', colorScheme: 'light' });
  await installSperre(context, { protokoll: [] });
  await setzeEinwilligung(context, 'abgelehnt', base);
  const page = await context.newPage();
  await page.goto(base + seite, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await bereit(page); await versteckeDevOverlay(page); await durchscrollen(page); await bereit(page);
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), k * v.height);
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  const png = PNG.sync.read(await page.screenshot({ type: 'png', animations: 'disabled', caret: 'hide' }));
  return { png, page, context };
}
const ergebnis = [];
for (const p of paare) {
  const [seite, geraet, ks] = p.split(':'); const k = Number(ks);
  const a = await bild(A, seite, geraet, k), b = await bild(B, seite, geraet, k);
  const { width: w, height: h } = a.png; const verteilung = {}; let max = 0, n = 0; const punkte = [];
  for (let i = 0; i < w * h; i++) {
    let d = 0; for (let c = 0; c < 3; c++) d = Math.max(d, Math.abs(a.png.data[i * 4 + c] - b.png.data[i * 4 + c]));
    if (d > 0) { n++; max = Math.max(max, d); verteilung[d] = (verteilung[d] || 0) + 1; if (punkte.length < 4000) punkte.push([i % w, Math.floor(i / w), d]); }
  }
  // Elemente an den Abweichungen (größte zuerst)
  punkte.sort((x, y) => y[2] - x[2]);
  const proben = [...new Set(punkte.filter((_, i) => i % Math.max(1, Math.floor(punkte.length / 12)) === 0).slice(0, 12).map(([x, y]) => `${x},${y}`))];
  const elemente = await b.page.evaluate((ps) => ps.map((s) => { const [x, y] = s.split(',').map(Number); const e = document.elementFromPoint(x, y); if (!e) return s + ' –'; const cs = getComputedStyle(e); return `${s} <${e.tagName.toLowerCase()} class="${(e.getAttribute('class') || '').slice(0, 80)}"> bg=${cs.backgroundColor} bgimg=${cs.backgroundImage.slice(0, 60)} color=${cs.color} op=${cs.opacity}`; }), proben);
  ergebnis.push({ paar: p, abweichend: n, max_kanal: max, verteilung, elemente });
  fs.writeFileSync(`${ZIEL}/${seite.replaceAll('/', '_') || '_start'}-${geraet}-k${k}-a.png`, PNG.sync.write(a.png));
  fs.writeFileSync(`${ZIEL}/${seite.replaceAll('/', '_') || '_start'}-${geraet}-k${k}-b.png`, PNG.sync.write(b.png));
  await a.context.close(); await b.context.close();
}
await browser.close();
console.log(JSON.stringify(ergebnis, null, 1));
