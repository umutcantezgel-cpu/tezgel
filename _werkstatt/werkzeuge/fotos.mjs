// Ebene 3 (Darstellung) + Konsolenfehler + Überlauf: Bildschirmhöhen-Ausschnitte nach Fotoprotokoll.
// Nutzung: node fotos.mjs --satz p0-ausgangsstand [--seiten /,/bad] [--ansichten m375,d1440] [--einwilligung erstbesuch|abgelehnt] [--belege] [--max 12] [--worker 3]
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { BASE, assertLocal, ANSICHTEN, ANSICHTEN_AUSBAU, FESTE_ZEIT, installSperre, setzeEinwilligung, durchscrollen, bereit, grundmenge, slug, ensureDir, ueberlauf, RELAUNCH } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const flag = (k) => process.argv.includes(`--${k}`);
assertLocal();

const G = grundmenge();
const satz = arg('satz', 'adhoc');
const seiten = arg('seiten') ? arg('seiten').split(',') : G.seiten;
const alle = { ...ANSICHTEN_AUSBAU };
const ansichten = (arg('ansichten') || Object.keys(ANSICHTEN).join(',')).split(',');
const einwilligung = arg('einwilligung', 'abgelehnt');
const maxHoehen = Number(arg('max', '12'));
const worker = Number(arg('worker', '3'));
const bewegung = arg('bewegung', 'reduce'); // Standbilder mit reducedMotion: 'reduce'
const cacheDir = ensureDir(path.join(RELAUNCH, 'cache', 'fotos', satz));

// Belegauswahl: Hauptseiten + je Vorlage zwei Seiten
const belegSeiten = new Set([...G.hauptseiten,
  '/leistungen/bad', '/leistungen/aussen', '/leistungen/bad/wetzlar', '/leistungen/wohnen/marburg',
  G.seiten.find((s) => s.startsWith('/standorte/')), G.seiten.filter((s) => s.startsWith('/standorte/'))[3],
  G.seiten.find((s) => s.startsWith('/blog/')), G.seiten.filter((s) => s.startsWith('/blog/'))[4],
  G.seiten.find((s) => s.startsWith('/bad/musterbaeder/')), G.seiten.filter((s) => s.startsWith('/bad/musterbaeder/'))[5],
  '/referenzen/badsanierung-grossformat', '/referenzen/balkon-stelzlager']);
const belegDir = path.join(RELAUNCH, 'belege', satz, 'fotos');

const browser = await chromium.launch({ args: ['--font-render-hinting=none'] });
const ergebnisse = [];
const auftraege = [];
for (const s of seiten) for (const a of ansichten) auftraege.push({ s, a });

async function bearbeite({ s, a }) {
  const v = alle[a];
  const context = await browser.newContext({
    viewport: { width: v.width, height: v.height }, deviceScaleFactor: 1, isMobile: v.isMobile, hasTouch: v.hasTouch,
    reducedMotion: bewegung, locale: 'de-DE', timezoneId: 'Europe/Berlin', colorScheme: 'light',
  });
  const protokoll = [];
  await installSperre(context, { protokoll });
  await setzeEinwilligung(context, einwilligung);
  const page = await context.newPage();
  // Feste Uhrzeit nur auf Wunsch: statische Seiten sind zur Build-Zeit gerendert; eine abweichende Client-Zeit
  // erzeugt sonst künstliche Hydrationsfehler (React #418). Zeitabhängige Elemente werden stattdessen maskiert.
  if (flag('feste-zeit')) await page.clock.setFixedTime(FESTE_ZEIT);
  const konsole = [];
  page.on('console', (m) => { if (m.type() === 'error') konsole.push(m.text().slice(0, 300)); });
  page.on('pageerror', (e) => konsole.push('pageerror: ' + String(e.message).slice(0, 300)));
  const r = { seite: s, ansicht: a, status: null, hoehen: 0, konsole, ueberlauf: [], fremd: 0, fehler: null };
  try {
    const resp = await page.goto(BASE + s, { waitUntil: 'domcontentloaded', timeout: 45000 });
    r.status = resp?.status() ?? null;
    await bereit(page);
    await durchscrollen(page);
    await bereit(page);
    r.ueberlauf = await ueberlauf(page);
    const vh = v.height;
    const gesamt = await page.evaluate(() => document.documentElement.scrollHeight);
    r.seitenhoehe = gesamt;
    const n = Math.min(maxHoehen, Math.ceil(gesamt / vh));
    const dir = ensureDir(path.join(cacheDir, a, slug(s)));
    for (let k = 0; k < n; k++) {
      await page.evaluate((y) => window.scrollTo(0, y), k * vh);
      await page.waitForTimeout(80);
      const datei = path.join(dir, `${String(k).padStart(2, '0')}.jpg`);
      await page.screenshot({ path: datei, type: 'jpeg', quality: 70 });
      if (flag('belege') && belegSeiten.has(s)) {
        const bd = ensureDir(path.join(belegDir, a, slug(s)));
        fs.copyFileSync(datei, path.join(bd, `${String(k).padStart(2, '0')}.jpg`));
      }
    }
    r.hoehen = n;
  } catch (e) { r.fehler = String(e.message).slice(0, 300); }
  r.fremd = protokoll.filter((p) => p.art === 'fremd').length;
  r.blockiert = protokoll.filter((p) => p.art !== 'fremd');
  await context.close();
  ergebnisse.push(r);
  process.stdout.write(`${r.fehler ? 'F' : r.ueberlauf.length ? 'U' : r.konsole.length ? 'K' : '.'}`);
}

let i = 0;
await Promise.all(Array.from({ length: worker }, async () => { while (i < auftraege.length) { const job = auftraege[i++]; await bearbeite(job); } }));
await browser.close();
ergebnisse.sort((x, y) => (x.seite + x.ansicht).localeCompare(y.seite + y.ansicht));
const out = ensureDir(path.join(RELAUNCH, 'belege', satz));
fs.writeFileSync(path.join(out, 'fotos-ergebnis.json'), JSON.stringify({ satz, base: BASE, einwilligung, bewegung, feste_zeit: flag('feste-zeit') ? FESTE_ZEIT.toISOString() : null, dpr: 1, ergebnisse }, null, 1));
const sum = {
  aufnahmen: ergebnisse.length,
  fehler: ergebnisse.filter((r) => r.fehler).length,
  status_nicht_200: ergebnisse.filter((r) => r.status !== 200).map((r) => `${r.seite} ${r.status}`),
  mit_ueberlauf: ergebnisse.filter((r) => r.ueberlauf.length).map((r) => `${r.seite} [${r.ansicht}] ${r.ueberlauf.map((u) => u.art).join(',')}`),
  mit_konsolenfehler: ergebnisse.filter((r) => r.konsole.length).map((r) => `${r.seite} [${r.ansicht}] ${r.konsole[0]}`),
};
fs.writeFileSync(path.join(out, 'fotos-zusammenfassung.json'), JSON.stringify(sum, null, 1));
console.log('\n' + JSON.stringify({ aufnahmen: sum.aufnahmen, fehler: sum.fehler, nicht200: sum.status_nicht_200.length, ueberlauf: sum.mit_ueberlauf.length, konsole: sum.mit_konsolenfehler.length }));
