// Prüfstufe A · Bildsatz: festes Aufnahmeprotokoll für Seiten × Geräte (Standard: alle 10 GERAETE_ALLE, --geraete alle|liste), für vorher und nachher gleich.
// Protokoll: Einwilligung abgelehnt, reducedMotion reduce (mit --ersatzpfad: no-preference), DPR 1, Dev-Overlay ausgeblendet;
// erst durchscrollen und bereit, dann Ausschnitte an den festen Positionen k × Viewporthöhe, k = 0 … min(12, ceil(Seitenhöhe/vh)) − 1, JPEG q70.
// --png: verlustfrei als PNG statt JPEG q70 (feine Linien wie die 1-px-Schnur behalten ihre Farbe; UM-E3-FIX, E-087).
// Je Seite × Ansicht: Status, Konsolenfehler, ueberlauf() und ueberlappung().
// Nutzung: node bildsatz.mjs --satz NAME (--hauptansichten | --seiten /a,/b) [--geraete alle|liste] [--base URL] [--ziel DIR] [--worker 2] [--ersatzpfad (normale Bewegung, Animationen abwarten)]
// --ersatzpfad: Darstellung ohne Scroll-Animationen und View Transitions (Safari < 26, Firefox) per Emulation, mit normaler
//   Bewegung (reducedMotion no-preference). Nach dem Durchscrollen wartet der Lauf, bis keine Animation mehr läuft (höchstens 5 s);
//   die Restzahl laufender Animationen steht je Ansicht in bildsatz.json (ergebnisse[].animationen) und in der Zusammenfassung.
// Ziel (Standard _werkstatt/cache/bildsatz/<satz>/): <ansicht>/<slug>/NN.jpg (mit --png NN.png) sowie bildsatz.json.
// --hauptansichten liest _werkstatt/HAUPTANSICHTEN.json. Zusammenfassung auf stdout.
// Exit 1, wenn eine Aufnahme scheitert oder eine Seite nicht 200 liefert.
// Voraussetzung: PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers (wie bei den übrigen Werkzeugen).
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { BASE, assertLocal, ANSICHTEN, GERAETE_ALLE, geraeteWahl, installSperre, installErsatzpfad, setzeEinwilligung, durchscrollen, bereit, slug, ensureDir, ueberlauf, versteckeDevOverlay, RELAUNCH, serverStand } from './lib.mjs';
import { ueberlappungMitZahl } from './ueberlappung.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const flag = (k) => process.argv.includes(`--${k}`);
const MAX_AUSSCHNITTE = 12;
const EINWILLIGUNG = 'abgelehnt';
const NUTZUNG = 'Nutzung: node bildsatz.mjs --satz NAME (--hauptansichten | --seiten /a,/b) [--geraete alle|liste] [--base URL] [--ziel DIR] [--worker 2] [--ersatzpfad (normale Bewegung, Animationen abwarten)] [--png]';
const ZEITLIMIT_ANIMATIONEN_MS = 5000; // --ersatzpfad: höchstens so lange auf das Ende laufender Animationen warten

const base = arg('base', BASE);
assertLocal(base);
const satz = arg('satz');
if (flag('hauptansichten') && arg('seiten')) { console.error(`${NUTZUNG}\n--hauptansichten und --seiten schließen sich aus`); process.exit(2); }
let seiten = null;
if (flag('hauptansichten')) seiten = JSON.parse(fs.readFileSync(path.join(RELAUNCH, 'HAUPTANSICHTEN.json'), 'utf8')).hauptansichten.map((h) => h.pfad);
else if (arg('seiten')) seiten = arg('seiten').split(',');
if (!satz || !seiten || !seiten.length) { console.error(NUTZUNG); process.exit(2); }
for (const s of seiten) if (!s.startsWith('/')) { console.error(`Seite muss mit / beginnen: ${s}`); process.exit(2); }
const ziel = ensureDir(arg('ziel') ? path.resolve(arg('ziel')) : path.join(RELAUNCH, 'cache', 'bildsatz', satz));
const worker = Number(arg('worker', '2'));
const PNG = flag('png'); // verlustfreie Aufnahmen statt JPEG q70
const ERSATZPFAD = flag('ersatzpfad'); // ohne animation-timeline/View Transitions (lib.mjs installErsatzpfad)
const geraete = geraeteWahl(arg('geraete', 'alle'));
if (!geraete) { console.error(`${NUTZUNG}\n--geraete: alle oder Kommaliste aus ${GERAETE_ALLE.join(', ')}`); process.exit(2); }

const rahmenAbwarten = (page) => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(null)))));

/** Ersatzpfad: wartet, bis keine Animation mehr läuft (playState running oder pending), höchstens ZEITLIMIT_ANIMATIONEN_MS. */
async function wartenAufAnimationen(page) {
  const laufend = () => page.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running' || a.playState === 'pending').length);
  const start = Date.now();
  let rest = await laufend();
  while (rest > 0 && Date.now() - start < ZEITLIMIT_ANIMATIONEN_MS) {
    await page.waitForTimeout(100);
    rest = await laufend();
  }
  return { rest, zeitlimit: rest > 0, wartezeit_ms: Date.now() - start };
}

/** Eine Seite in einer Ansicht: Protokoll ausführen und Ergebnis liefern. */
async function bearbeite(browser, a, s) {
  const v = ANSICHTEN[a];
  const context = await browser.newContext({ viewport: { width: v.width, height: v.height }, deviceScaleFactor: 1, isMobile: v.isMobile, hasTouch: v.hasTouch, reducedMotion: ERSATZPFAD ? 'no-preference' : 'reduce', locale: 'de-DE', timezoneId: 'Europe/Berlin', colorScheme: 'light' });
  const protokoll = [];
  await installSperre(context, { protokoll });
  if (ERSATZPFAD) await installErsatzpfad(context);
  await setzeEinwilligung(context, EINWILLIGUNG, base);
  const page = await context.newPage();
  const konsole = [];
  page.on('console', (m) => { if (m.type() === 'error') konsole.push(m.text().slice(0, 300)); });
  page.on('pageerror', (e) => konsole.push(`pageerror: ${String(e.message).slice(0, 300)}`));
  const r = { ansicht: a, seite: s, status: null, hoehe: null, aufnahmen: [], konsole, ueberlauf: [], ueberlappung: [], ueberlappungGesamt: 0, ueberlappungNachArt: {}, animationen: null, fehler: null };
  const dir = path.join(ziel, a, slug(s));
  try {
    const resp = await page.goto(base + s, { waitUntil: 'domcontentloaded', timeout: 45000 });
    r.status = resp?.status() ?? null;
    await bereit(page);
    await versteckeDevOverlay(page);
    await durchscrollen(page);
    await bereit(page);
    if (ERSATZPFAD) r.animationen = await wartenAufAnimationen(page); // Bewegung läuft normal: Ende abwarten, damit die Bilder vergleichbar bleiben
    r.ueberlauf = await ueberlauf(page);
    const zahl = await ueberlappungMitZahl(page); // scrollt selbst und setzt auf 0 zurück
    r.ueberlappung = zahl.befunde;
    r.ueberlappungGesamt = zahl.gesamt;
    r.ueberlappungNachArt = zahl.nachArt;
    const { vh, hoehe } = await page.evaluate(() => ({ vh: window.innerHeight, hoehe: document.documentElement.scrollHeight }));
    r.hoehe = hoehe;
    fs.rmSync(dir, { recursive: true, force: true }); // alte Ausschnitte nicht stehen lassen
    ensureDir(dir);
    const n = Math.min(MAX_AUSSCHNITTE, Math.ceil(hoehe / vh));
    for (let k = 0; k < n; k++) {
      const yWirksam = await page.evaluate((y) => { window.scrollTo({ top: y, behavior: 'instant' }); return window.scrollY; }, k * vh);
      await rahmenAbwarten(page);
      const datei = path.join(dir, `${String(k).padStart(2, '0')}.${PNG ? 'png' : 'jpg'}`);
      await page.screenshot(PNG ? { path: datei, type: 'png' } : { path: datei, type: 'jpeg', quality: 70 });
      r.aufnahmen.push({ nr: k, y: k * vh, y_wirksam: yWirksam, datei: path.relative(ziel, datei) });
    }
  } catch (e) {
    r.fehler = String(e.message).slice(0, 300);
  }
  r.fremd = protokoll.filter((p) => p.art === 'fremd').length;
  await context.close();
  return r;
}

// CHROME_PATH (EINRICHTUNG.md, Host mit chromium-1243 statt 1194); ohne Variable wie bisher.
const browser = await chromium.launch({ args: ['--font-render-hinting=none'], executablePath: process.env.CHROME_PATH || undefined });
const auftraege = [];
for (const a of geraete) for (const s of seiten) auftraege.push({ a, s });
const ergebnisse = [];
let naechster = 0;
await Promise.all(Array.from({ length: worker }, async () => {
  while (naechster < auftraege.length) {
    const job = auftraege[naechster++];
    ergebnisse.push(await bearbeite(browser, job.a, job.s));
    process.stdout.write('.');
  }
}));
await browser.close();
ergebnisse.sort((x, y) => x.ansicht.localeCompare(y.ansicht) || x.seite.localeCompare(y.seite));

const aufnahmen = ergebnisse.reduce((summe, r) => summe + r.aufnahmen.length, 0);
const fehler = ergebnisse.filter((r) => r.fehler).map((r) => `${r.seite} [${r.ansicht}] ${r.fehler}`);
const nicht200 = ergebnisse.filter((r) => r.status !== 200).map((r) => `${r.seite} [${r.ansicht}] HTTP ${r.status}`);
const mitUeberlauf = ergebnisse.filter((r) => r.ueberlauf.length);
const mitUeberlappung = ergebnisse.filter((r) => r.ueberlappung.length);
const mitKonsole = ergebnisse.filter((r) => r.konsole.length);
const animationen = ERSATZPFAD ? {
  ansichten_mit_zeitlimit: ergebnisse.filter((r) => r.animationen && r.animationen.zeitlimit).length,
  restzahl_laufend: ergebnisse.reduce((s, r) => s + (r.animationen ? r.animationen.rest : 0), 0),
} : null;
function summeNachArt(liste) {
  const summe = {};
  for (const r of liste) for (const [k, n] of Object.entries(r.ueberlappungNachArt)) summe[k] = (summe[k] || 0) + n;
  return summe;
}
const zusammenfassung = {
  aufnahmen,
  fehler: fehler.length,
  nicht200: nicht200.length,
  ueberlauf: { ansichten: mitUeberlauf.length, befunde: mitUeberlauf.reduce((s, r) => s + r.ueberlauf.length, 0) },
  ueberlappung: { ansichten: mitUeberlappung.length, befunde: mitUeberlappung.reduce((s, r) => s + r.ueberlappungGesamt, 0), nachArt: summeNachArt(mitUeberlappung) },
  konsole: { ansichten: mitKonsole.length, meldungen: mitKonsole.reduce((s, r) => s + r.konsole.length, 0) },
  animationen,
};
const bericht = {
  satz,
  base,
  server_stand: serverStand(base),
  ziel,
  protokoll: { einwilligung: EINWILLIGUNG, bewegung: ERSATZPFAD ? 'no-preference' : 'reduce', ersatzpfad: ERSATZPFAD, animationen_zeitlimit_ms: ERSATZPFAD ? ZEITLIMIT_ANIMATIONEN_MS : null, dpr: 1, ansichten: geraete, max_ausschnitte: MAX_AUSSCHNITTE, qualitaet: 70 },
  seiten,
  zusammenfassung,
  ergebnisse,
};
fs.writeFileSync(path.join(ziel, 'bildsatz.json'), JSON.stringify(bericht, null, 1));

const z = zusammenfassung;
console.log(`\nSatz ${satz} · Aufnahmen ${z.aufnahmen} · Fehler ${z.fehler} · nicht 200 ${z.nicht200} · Überlauf ${z.ueberlauf.ansichten} Ansichten (${z.ueberlauf.befunde} Befunde) · Überlappung ${z.ueberlappung.ansichten} Ansichten (${z.ueberlappung.befunde} Befunde: ${Object.entries(z.ueberlappung.nachArt).map(([k, n]) => `${k} ${n}`).join(', ') || 'keine'}) · Konsole ${z.konsole.ansichten} Ansichten (${z.konsole.meldungen} Meldungen)${z.animationen ? ` · Animationen: Zeitlimit ${z.animationen.ansichten_mit_zeitlimit} Ansichten, Restzahl laufend ${z.animationen.restzahl_laufend}` : ''}`);
const listen = [
  ['Fehler', fehler],
  ['nicht 200', nicht200],
  ['Überlauf', mitUeberlauf.map((r) => `${r.seite} [${r.ansicht}] ${r.ueberlauf.map((u) => u.art).join(',')}`)],
  ['Überlappung', mitUeberlappung.map((r) => `${r.seite} [${r.ansicht}] ${r.ueberlappungGesamt} (${Object.entries(r.ueberlappungNachArt).map(([k, n]) => `${k} ${n}`).join(', ')})`)],
  ['Konsole', mitKonsole.map((r) => `${r.seite} [${r.ansicht}] ${r.konsole[0]}`)],
];
for (const [titel, liste] of listen) if (liste.length) console.log(`${titel}: ${liste.slice(0, 20).join(' | ')}`);
console.log(`Belege: ${path.join(ziel, 'bildsatz.json')}`);
process.exitCode = fehler.length || nicht200.length ? 1 : 0;
