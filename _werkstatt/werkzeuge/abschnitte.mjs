// Abschnittsbilder: je Ansicht der erste Bildschirm (mit Kopf) und jeder Abschnitt der Seite als eigenes JPEG,
// zuletzt der Fuß (in den Ausschnitten ohne feste und klebende Ebenen). Für Abschnittsvergleiche (z. B. zwei Fassungen einer Seite), nach demselben Aufnahmeprotokoll wie
// bildsatz.mjs: Einwilligung abgelehnt, reducedMotion reduce, DPR 1, Dritt-Hosts gesperrt, erst durchscrollen und bereit.
// Abschnitt = äußerstes <section>/<header> innerhalb von <main> (verschachtelte zählen nicht doppelt); Abschnitte höher
// als 2 × Viewporthöhe werden in Streifen zu je 2 × Viewporthöhe geteilt.
// Nutzung: node abschnitte.mjs --base URL --seite / [--ansichten m390,t768,d1440] --ziel DIR
// Ziel: <ansicht>/NN-<name>.jpg und abschnitte.json (Name, Höhe, Datei je Abschnitt; HTTP-Status, Konsolenfehler).
// Voraussetzung: PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers (wie bei den übrigen Werkzeugen).
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { BASE, assertLocal, ANSICHTEN, GERAETE, installSperre, setzeEinwilligung, durchscrollen, bereit, slug, ensureDir, versteckeDevOverlay } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const base = arg('base', BASE);
assertLocal(base);
const seite = arg('seite', '/');
const ansichten = (arg('ansichten') || GERAETE.join(',')).split(',');
for (const a of ansichten) if (!ANSICHTEN[a]) { console.error(`unbekannte Ansicht: ${a}`); process.exit(2); }
if (!arg('ziel')) { console.error('Nutzung: node abschnitte.mjs --base URL --seite / [--ansichten m390,t768,d1440] --ziel DIR'); process.exit(2); }
const ziel = ensureDir(path.resolve(arg('ziel')));

const browser = await chromium.launch({ args: ['--font-render-hinting=none'] });
const bericht = { seite, base, ergebnisse: [] };
for (const a of ansichten) {
  const v = ANSICHTEN[a];
  const dir = ensureDir(path.join(ziel, a));
  const context = await browser.newContext({ viewport: { width: v.width, height: v.height }, deviceScaleFactor: 1, isMobile: v.isMobile, hasTouch: v.hasTouch, reducedMotion: 'reduce', locale: 'de-DE', timezoneId: 'Europe/Berlin', colorScheme: 'light' });
  await installSperre(context, { protokoll: [] });
  await setzeEinwilligung(context, 'abgelehnt', base);
  const page = await context.newPage();
  const konsole = [];
  page.on('console', (m) => { if (m.type() === 'error') konsole.push(m.text().slice(0, 300)); });
  page.on('pageerror', (e) => konsole.push(`pageerror: ${String(e.message).slice(0, 300)}`));
  const r = { ansicht: a, status: null, konsole, bilder: [], fehler: null };
  try {
    const resp = await page.goto(base + seite, { waitUntil: 'domcontentloaded', timeout: 45000 });
    r.status = resp?.status() ?? null;
    await bereit(page);
    await versteckeDevOverlay(page);
    await durchscrollen(page);
    await bereit(page);
    let n = 0;
    const name = (s) => `${String(n++).padStart(2, '0')}-${slug(s).slice(0, 40) || 'abschnitt'}`;
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    const erst = path.join(dir, `${name('erster-bildschirm')}.jpg`);
    await page.screenshot({ path: erst, type: 'jpeg', quality: 70 });
    r.bilder.push({ name: 'erster Bildschirm', datei: erst });
    // spätes Zeichnen (content-visibility: auto, E-022) aufheben: Ganzseiten-Ausschnitte zeigen sonst Abschnitte außerhalb
    // des Bildschirms leer, die beim Scrollen gezeichnet werden – das Bild soll den Abschnitt zeigen, wie er in Sicht aussieht
    await page.addStyleTag({ content: '* { content-visibility: visible !important; }' });
    // Abschnitte in Dokumentreihenfolge mit absoluter Lage; der feste Kopf wird für Ausschnitte ausgeblendet
    const teile = await page.evaluate(() => {
      const els = [...document.querySelectorAll('main section, main header')].filter((el) => !el.parentElement.closest('main section, main header'));
      const fuss = document.querySelector('body footer, [role="contentinfo"]');
      if (fuss) els.push(fuss);
      return els.map((el) => {
        const b = el.getBoundingClientRect();
        const h = el.querySelector('h1, h2');
        const titel = el.getAttribute('aria-label') || (h ? h.textContent.trim().replace(/\s+/g, ' ') : '') || el.id || el.tagName.toLowerCase();
        return { titel: el === fuss ? `Fuß: ${titel}` : titel, y: b.top + window.scrollY, hoehe: b.height };
      }).filter((t) => t.hoehe > 8);
    });
    // feste und klebende Ebenen (Kopf, Leiste, WhatsApp, Schild) verdecken sonst die Ausschnitte
    await page.evaluate(() => {
      for (const el of document.body.querySelectorAll('*')) {
        const pos = getComputedStyle(el).position;
        if (pos === 'fixed' || pos === 'sticky') el.style.setProperty('visibility', 'hidden', 'important');
      }
    });
    const breite = await page.evaluate(() => document.documentElement.clientWidth);
    for (const t of teile) {
      const streifen = Math.max(1, Math.ceil(t.hoehe / (2 * v.height)));
      for (let s = 0; s < streifen; s++) {
        const y = Math.round(t.y + s * 2 * v.height);
        const h = Math.round(Math.min(2 * v.height, t.hoehe - s * 2 * v.height));
        const datei = path.join(dir, `${name(t.titel)}.jpg`);
        await page.screenshot({ path: datei, type: 'jpeg', quality: 70, fullPage: true, clip: { x: 0, y, width: breite, height: h } });
        r.bilder.push({ name: streifen > 1 ? `${t.titel} (${s + 1}/${streifen})` : t.titel, hoehe: Math.round(t.hoehe), datei });
      }
    }
  } catch (e) {
    r.fehler = String(e.message).slice(0, 300);
  }
  await context.close();
  bericht.ergebnisse.push(r);
  console.error(`${a} · HTTP ${r.status}${r.fehler ? ` · FEHLER ${r.fehler}` : ''} · Konsole ${konsole.length} · Bilder ${r.bilder.length}`);
}
await browser.close();
fs.writeFileSync(path.join(ziel, 'abschnitte.json'), JSON.stringify(bericht, null, 1));
console.error(`Belege: ${path.join(ziel, 'abschnitte.json')}`);
process.exitCode = bericht.ergebnisse.some((r) => r.fehler || r.status !== 200) ? 1 : 0;
