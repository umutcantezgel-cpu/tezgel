// Pixelvergleich zweier lokaler Server (z. B. Ausgangsstand gegen Welle) außerhalb des Wellenumfangs.
// Nutzung: node pixel.mjs --a http://127.0.0.1:4310 --b http://127.0.0.1:4311 --satz <name> [--seiten …] [--ohne /,/x] [--ansichten m375,t768,d1440,d1920] [--maske "sel1, sel2"]
// Bedingungen: DPR 1, reduzierte Bewegung, Einwilligung „abgelehnt“, durchgescrollt, Animationen beim Foto angehalten.
// Erst A gegen A laufen lassen (Rauschen), dann A gegen B.
import { chromium } from '@playwright/test';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import fs from 'node:fs';
import path from 'node:path';
import { assertLocal, ANSICHTEN, installSperre, setzeEinwilligung, durchscrollen, bereit, grundmenge, slug, ensureDir, RELAUNCH } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const A = arg('a', 'http://127.0.0.1:4310');
const B = arg('b', 'http://127.0.0.1:4311');
assertLocal(A); assertLocal(B);
const satz = arg('satz', 'adhoc');
const ohne = new Set((arg('ohne') || '').split(',').filter(Boolean));
const seiten = (arg('seiten') ? arg('seiten').split(',') : grundmenge().seiten).filter((s) => !ohne.has(s));
const ansichten = (arg('ansichten') || 'm375,t768,d1440,d1920').split(',');
// Globale schwebende Ebenen erscheinen zeitabhängig (Leerlauf-Rückruf) und an Zieh-Positionen → beim Foto ausblenden;
// sie werden in ihrer eigenen Welle (P4) gesondert geprüft.
// Zusätzliche Masken (zeitabhängige Inhalte, z. B. Öffnungsstatus) per --maske "<CSS-Selektoren>"; A/A-Lauf zeigt, ob nötig.
// Berichtigung P4-Tor R2 (E-036): Die frühere Maske `*:has(> #whatsapp-floating-btn)` traf das Elternelement des Knopfs –
//   im Kern `<body>`, im Bestand ein `div.contents` mit fast der ganzen Seite. Beide Aufnahmen waren dann nahezu leer und
//   jeder Vergleich „gleich“ (nur Höhenänderungen fielen auf). Der Knopf ist in beiden Fassungen selbst `position: fixed`;
//   maskiert wird nur er. Selbstprüfungen: Abbruch, wenn ein maskiertes Element mehr als MASKE_MAX Nachfahren hat, und
//   Abbruch, wenn eine Aufnahme fast einfarbig ist (LEER_ANTEIL).
const MASKE_SELEKTOR = ['#whatsapp-floating-btn', arg('maske')].filter(Boolean).join(', ');
const MASKE = MASKE_SELEKTOR + ' { visibility: hidden !important; }';
const MASKE_MAX = 40;
const LEER_ANTEIL = 0.98;
function fastEinfarbig(png) {
  // Anteil der häufigsten Farbe (auf 4 Bit je Kanal gerundet), Stichprobe jedes 7. Pixel
  const z = new Map(); let n = 0;
  for (let i = 0; i < png.data.length; i += 4 * 7) {
    const k = ((png.data[i] >> 4) << 8) | ((png.data[i + 1] >> 4) << 4) | (png.data[i + 2] >> 4);
    z.set(k, (z.get(k) || 0) + 1); n++;
  }
  return Math.max(...z.values()) / n;
}
const ziel = ensureDir(path.join(RELAUNCH, 'cache', 'pixel', satz));
const browser = await chromium.launch();

async function foto(base, s, a) {
  const v = ANSICHTEN[a];
  const context = await browser.newContext({ viewport: { width: v.width, height: v.height }, isMobile: v.isMobile, hasTouch: v.hasTouch, deviceScaleFactor: 1, reducedMotion: 'reduce', locale: 'de-DE', timezoneId: 'Europe/Berlin' });
  await installSperre(context);
  await setzeEinwilligung(context, 'abgelehnt', base);
  const page = await context.newPage();
  await page.goto(base + s, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await bereit(page);
  await durchscrollen(page);
  await bereit(page);
  const zuViel = await page.evaluate(([sel, max]) => [...document.querySelectorAll(sel)].map((e) => e.querySelectorAll('*').length).filter((n) => n > max), [MASKE_SELEKTOR, MASKE_MAX]);
  if (zuViel.length) throw new Error(`Maske trifft zu viel (${zuViel.join(', ')} Nachfahren > ${MASKE_MAX}): ${MASKE_SELEKTOR}`);
  const buf = await page.screenshot({ fullPage: true, animations: 'disabled', caret: 'hide', scale: 'css', style: MASKE });
  await context.close();
  const png = PNG.sync.read(buf);
  const anteil = fastEinfarbig(png);
  if (anteil > LEER_ANTEIL) throw new Error(`Aufnahme fast einfarbig (${(anteil * 100).toFixed(1)} %) – Maske oder Seite prüfen`);
  return png;
}

const ergebnis = [];
let i = 0;
const jobs = seiten.flatMap((s) => ansichten.map((a) => [s, a]));
await Promise.all(Array.from({ length: 2 }, async () => {
  while (i < jobs.length) {
    const [s, a] = jobs[i++];
    try {
      const [pa, pb] = [await foto(A, s, a), await foto(B, s, a)];
      if (pa.width !== pb.width || pa.height !== pb.height) {
        ergebnis.push({ seite: s, ansicht: a, gleich: false, grund: 'Maße', a: [pa.width, pa.height], b: [pb.width, pb.height] });
        process.stdout.write('M');
        continue;
      }
      const diff = new PNG({ width: pa.width, height: pa.height });
      const n = pixelmatch(pa.data, pb.data, diff.data, pa.width, pa.height, { threshold: 0.1 });
      if (n > 0) fs.writeFileSync(path.join(ziel, `${a}-${slug(s)}-diff.png`), PNG.sync.write(diff));
      ergebnis.push({ seite: s, ansicht: a, gleich: n === 0, abweichende_pixel: n, flaeche: pa.width * pa.height });
      process.stdout.write(n === 0 ? '.' : 'X');
    } catch (e) {
      ergebnis.push({ seite: s, ansicht: a, fehler: String(e.message).slice(0, 200) });
      process.stdout.write('F');
    }
  }
}));
await browser.close();
const abw = ergebnis.filter((r) => !r.gleich);
fs.writeFileSync(path.join(ziel, 'ergebnis.json'), JSON.stringify({ satz, a: A, b: B, laeufe: ergebnis.length, abweichend: abw.length, ergebnis }, null, 1));
console.log(`\npixel: ${ergebnis.length} Vergleiche · abweichend ${abw.length}`);
for (const r of abw.slice(0, 40)) console.log(r.seite, r.ansicht, r.grund || r.abweichende_pixel || r.fehler);
