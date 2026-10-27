// Prüfwerkzeug UM-E2-PX · Pixelvergleich „vorher“ gegen „nachher“: dieselben Seiten × Größen auf zwei Servern, Pixel für Pixel (pixelmatch 8).
// Protokoll: je Seite und Größe auf beiden Servern wie bildsatz.mjs: Einwilligung abgelehnt, reducedMotion reduce, DPR 1, Dev-Overlay ausgeblendet,
//   Anfragesperre aus lib.mjs (installSperre), erst durchscrollen und bereit() abwarten, dann aufnehmen.
//   Ausschnitte an den festen Positionen k × Viewporthöhe, k = 0 … ceil(Seitenhöhe/Viewporthöhe) − 1 (ganze Seite; mit --max-ausschnitte N
//   höchstens N, die ungeprüfte Höhe steht dann je Paar in ungeprueft_px und in der Zusammenfassung), als PNG;
//   Animationen und Caret angehalten (animations: 'disabled', caret: 'hide').
// Vergleich: je Ausschnitt pixelmatch mit --schwelle (Standard 0.1, Farbschwelle von pixelmatch) und includeAA: true,
//   d. h. jede Pixelabweichung zählt, auch Kantenpixel. Bei mehr als 0 abweichenden Pixeln wird das Differenzbild als PNG gespeichert.
//   Weichen die Seitenhöhen ab, werden nur die gemeinsamen Ausschnitte verglichen; beide Höhen stehen im Ergebnis, hoehe_abweichend: true.
//   Ein Paar gilt als abweichend bei Pixeln > 0, bei unterschiedlicher Höhe oder bei unterschiedlichem HTTP-Status.
// Nutzung: node pixelvergleich.mjs --vorher URL --nachher URL --satz NAME [--hauptansichten | --seiten /a,/b]
//   [--geraete m390,t768,d1440,d1920] [--ziel DIR] [--schwelle 0.1] [--worker 2] [--max-ausschnitte N] [--selbsttest-stoerung]
//   --hauptansichten liest _werkstatt/HAUPTANSICHTEN.json (feld hauptansichten[].pfad). Nur lokale Ziele (assertLocal).
//   --selbsttest-stoerung (nur für Selbsttest B): färbt im Nachher-Ausschnitt k = 0 jedes Paars ein Rechteck von 10 × 10 Pixeln oben links ein;
//   jede Farbe ist dabei so gewählt, dass sie vom Original deutlich abweicht. Erwartet: genau 100 abweichende Pixel je Paar.
// Ausgabe: <ziel>/pixelvergleich.json mit je Paar: seite, geraet, hoehe_vorher, hoehe_nachher, hoehe_abweichend, ausschnitte[{ k, pixel_abweichend, anteil }],
//   summe_abweichend, dazu status_vorher, status_nachher, anteil, abweichend, diffbilder, ausschnitte_gesamt, ungeprueft_px, wiederholt.
//   Verliert Chromium die Verbindung, startet der Lauf den Browser neu und wiederholt das Paar einmal (wiederholt: true). Differenzbilder: <ziel>/<geraet>/<slug>/diff-kNN.png.
//   Zusammenfassung auf stdout: Zahl der Paare, Paare mit Abweichung und die fünf größten nach Anteil.
// Standardziel: _werkstatt/cache/pixelvergleich/<satz>/.
// Exit-Codes: 0 ohne Abweichung · 1 mit Abweichung · 2 Laufzeitfehler (auch Aufruf- oder Zielfehler, unvollständige Paare).
// Voraussetzung: PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers, Aufruf aus _werkstatt/werkzeuge/.
import { chromium } from '@playwright/test';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import fs from 'node:fs';
import path from 'node:path';
import { RELAUNCH, ANSICHTEN, geraeteWahl, installSperre, setzeEinwilligung, durchscrollen, bereit, slug, ensureDir, assertLocal, versteckeDevOverlay, serverStand } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 && process.argv[i + 1] !== undefined ? process.argv[i + 1] : d; };
const flag = (k) => process.argv.includes(`--${k}`);
const NUTZUNG = 'Nutzung: node pixelvergleich.mjs --vorher URL --nachher URL --satz NAME [--hauptansichten | --seiten /a,/b] [--geraete m390,t768,d1440,d1920] [--ziel DIR] [--schwelle 0.1] [--worker 2] [--max-ausschnitte N] [--selbsttest-stoerung]';
const EINWILLIGUNG = 'abgelehnt';
const GERAETE_STANDARD = 'm390,t768,d1440,d1920';
const STOERUNG_GROESSE = 10;

function abbruch(meldung) { console.error(`${NUTZUNG}\n${meldung}`); process.exit(2); }

const vorherArg = arg('vorher');
const nachherArg = arg('nachher');
const satz = arg('satz');
if (!vorherArg || !nachherArg || !satz) abbruch('--vorher, --nachher und --satz sind Pflicht.');
if (!/^[A-Za-z0-9_-]+$/.test(satz)) abbruch(`--satz nur mit Buchstaben, Ziffern, _ oder -: ${satz}`);
if (flag('hauptansichten') && arg('seiten')) abbruch('--hauptansichten und --seiten schließen sich aus.');

let seiten = null;
if (flag('hauptansichten')) {
  seiten = JSON.parse(fs.readFileSync(path.join(RELAUNCH, 'HAUPTANSICHTEN.json'), 'utf8')).hauptansichten.map((h) => h.pfad);
} else if (arg('seiten')) {
  seiten = arg('seiten').split(',').map((s) => s.trim()).filter(Boolean);
}
if (!seiten || !seiten.length) abbruch('Seiten fehlen: --hauptansichten oder --seiten /a,/b.');
for (const s of seiten) if (!s.startsWith('/') || /\s/.test(s)) abbruch(`Seite muss mit / beginnen und ohne Leerzeichen sein: ${s}`);

const geraete = geraeteWahl(arg('geraete', GERAETE_STANDARD));
if (!geraete) abbruch(`--geraete: Kommaliste aus den Schlüsseln von ANSICHTEN, unbekannt: ${arg('geraete')}`);

const schwelle = Number(arg('schwelle', '0.1'));
if (!Number.isFinite(schwelle) || schwelle < 0 || schwelle > 1) abbruch('--schwelle muss zwischen 0 und 1 liegen.');

const worker = Number(arg('worker', '2'));
if (!Number.isInteger(worker) || worker < 1) abbruch('--worker muss eine ganze Zahl ab 1 sein.');

const stoerung = flag('selbsttest-stoerung');

const maxAusschnitte = arg('max-ausschnitte') === undefined ? Infinity : Number(arg('max-ausschnitte'));
if (!(maxAusschnitte === Infinity || (Number.isInteger(maxAusschnitte) && maxAusschnitte >= 1))) abbruch('--max-ausschnitte muss eine ganze Zahl ab 1 sein.');

let vorherBase; let nachherBase;
try {
  assertLocal(vorherArg);
  assertLocal(nachherArg);
  vorherBase = new URL(vorherArg).origin;
  nachherBase = new URL(nachherArg).origin;
} catch (e) {
  abbruch(String(e.message || e));
}

const ziel = arg('ziel') ? path.resolve(arg('ziel')) : path.join(RELAUNCH, 'cache', 'pixelvergleich', satz);
ensureDir(ziel);

const rahmenAbwarten = (page) => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(null)))));

/** Seite auf einem Server aufnehmen: Protokoll wie bildsatz.mjs, dann Ausschnitte k = 0 … max−1 als PNG. */
async function aufnahmen(browser, base, geraet, seite) {
  const v = ANSICHTEN[geraet];
  const context = await browser.newContext({ viewport: { width: v.width, height: v.height }, deviceScaleFactor: 1, isMobile: v.isMobile, hasTouch: v.hasTouch, reducedMotion: 'reduce', locale: 'de-DE', timezoneId: 'Europe/Berlin', colorScheme: 'light' });
  try {
    const protokoll = [];
    await installSperre(context, { protokoll });
    await setzeEinwilligung(context, EINWILLIGUNG, base);
    const page = await context.newPage();
    const resp = await page.goto(base + seite, { waitUntil: 'domcontentloaded', timeout: 45000 });
    const status = resp ? resp.status() : null;
    await bereit(page);
    await versteckeDevOverlay(page);
    await durchscrollen(page);
    await bereit(page);
    const hoehe = await page.evaluate(() => document.documentElement.scrollHeight);
    const anzahl = Math.min(maxAusschnitte, Math.ceil(hoehe / v.height));
    const bilder = [];
    for (let k = 0; k < anzahl; k++) {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), k * v.height);
      await rahmenAbwarten(page);
      bilder.push(await page.screenshot({ type: 'png', animations: 'disabled', caret: 'hide' }));
    }
    return { status, hoehe, bilder, gesamt: Math.ceil(hoehe / v.height), vh: v.height };
  } finally {
    await context.close().catch(() => {}); // Schließfehler überdeckt sonst die eigentliche Ursache
  }
}

/** Selbsttest B: 10 × 10 Pixel oben links auf Magenta oder Grün setzen, je Pixel die Farbe, die vom Original weiter entfernt ist. */
function stoereRechteck(png) {
  for (let y = 0; y < STOERUNG_GROESSE; y++) {
    for (let x = 0; x < STOERUNG_GROESSE; x++) {
      const i = (y * png.width + x) * 4;
      const r = png.data[i]; const g = png.data[i + 1]; const b = png.data[i + 2];
      const dMagenta = (r - 255) ** 2 + g ** 2 + (b - 255) ** 2;
      const dGruen = r ** 2 + (g - 255) ** 2 + b ** 2;
      const [tr, tg, tb] = dMagenta >= dGruen ? [255, 0, 255] : [0, 255, 0];
      png.data[i] = tr; png.data[i + 1] = tg; png.data[i + 2] = tb; png.data[i + 3] = 255;
    }
  }
}

/** Ein Ausschnitt: pixelmatch mit Schwelle, includeAA true; liefert Zahl und Differenzbild. */
function vergleicheAusschnitt(pa, pn) {
  if (pa.width !== pn.width || pa.height !== pn.height) throw new Error(`Ausschnittmaße ungleich: ${pa.width}x${pa.height} gegen ${pn.width}x${pn.height}`);
  const diff = new PNG({ width: pa.width, height: pa.height });
  const n = pixelmatch(pa.data, pn.data, diff.data, pa.width, pa.height, { threshold: schwelle, includeAA: true });
  return { n, diff };
}

/** Alte Differenzbilder desselben Paars entfernen, damit kein veraltetes Bild stehen bleibt. */
function raeumeAlteDiffs(dir) {
  if (!fs.existsSync(dir)) return;
  for (const f of fs.readdirSync(dir)) if (/^diff-k\d+\.png$/.test(f)) fs.unlinkSync(path.join(dir, f));
}

/** Ein Paar (Seite × Größe): beide Seiten parallel aufnehmen, Ausschnitte vergleichen. */
async function vergleichePaar(browser, seite, geraet) {
  const t0 = Date.now();
  const ergebnis = { seite, geraet, status_vorher: null, status_nachher: null, hoehe_vorher: null, hoehe_nachher: null, hoehe_abweichend: false, ausschnitte: [], ausschnitte_gesamt: null, ungeprueft_px: null, summe_abweichend: 0, anteil: 0, abweichend: false, diffbilder: [], dauer_s: 0, fehler: null, wiederholt: false };
  try {
    // allSettled: beide Aufnahmen enden, bevor der Worker das nächste Paar beginnt (sonst mehr offene Kontexte als --worker)
    const [ra, rn] = await Promise.allSettled([
      aufnahmen(browser, vorherBase, geraet, seite),
      aufnahmen(browser, nachherBase, geraet, seite),
    ]);
    if (ra.status === 'rejected') throw ra.reason;
    if (rn.status === 'rejected') throw rn.reason;
    const a = ra.value; const n = rn.value;
    ergebnis.status_vorher = a.status; ergebnis.status_nachher = n.status;
    ergebnis.hoehe_vorher = a.hoehe; ergebnis.hoehe_nachher = n.hoehe;
    ergebnis.hoehe_abweichend = a.hoehe !== n.hoehe;
    const gemeinsam = Math.min(a.bilder.length, n.bilder.length);
    const dir = path.join(ziel, geraet, slug(seite));
    raeumeAlteDiffs(dir);
    let flaeche = 0;
    for (let k = 0; k < gemeinsam; k++) {
      const pa = PNG.sync.read(a.bilder[k]);
      const pn = PNG.sync.read(n.bilder[k]);
      if (stoerung && k === 0) stoereRechteck(pn);
      const { n: anzahl, diff } = vergleicheAusschnitt(pa, pn);
      const px = pa.width * pa.height;
      ergebnis.ausschnitte.push({ k, pixel_abweichend: anzahl, anteil: anzahl / px });
      ergebnis.summe_abweichend += anzahl;
      flaeche += px;
      if (anzahl > 0) {
        ensureDir(dir);
        const datei = path.join(dir, `diff-k${String(k).padStart(2, '0')}.png`);
        fs.writeFileSync(datei, PNG.sync.write(diff));
        ergebnis.diffbilder.push(datei);
      }
    }
    ergebnis.ausschnitte_gesamt = Math.max(a.gesamt, n.gesamt);
    ergebnis.ungeprueft_px = Math.max(0, Math.min(a.hoehe, n.hoehe) - gemeinsam * a.vh);
    ergebnis.anteil = flaeche ? ergebnis.summe_abweichend / flaeche : 0;
    ergebnis.abweichend = ergebnis.summe_abweichend > 0 || ergebnis.hoehe_abweichend || a.status !== n.status;
  } catch (e) {
    ergebnis.fehler = String(e.message || e).slice(0, 400);
  }
  ergebnis.dauer_s = Math.round((Date.now() - t0) / 100) / 10;
  return ergebnis;
}

const aufgaben = [];
for (const seite of seiten) for (const geraet of geraete) aufgaben.push({ seite, geraet });

const t0Lauf = Date.now();
const paare = new Array(aufgaben.length);
let browser = null;
let neustart = null;
const starteBrowser = () => chromium.launch({ args: ['--font-render-hinting=none'], executablePath: process.env.CHROME_PATH || undefined });
/** Liefert einen verbundenen Browser; nach einem Verbindungsverlust startet genau ein Worker ihn neu, die anderen warten darauf. */
async function verbundenerBrowser() {
  if (browser && browser.isConnected()) return browser;
  if (!neustart) {
    console.error('Chromium nicht mehr verbunden: Neustart');
    const alt = browser;
    neustart = starteBrowser().then((b) => { browser = b; neustart = null; if (alt) alt.close().catch(() => {}); return b; });
  }
  return neustart;
}
try {
  browser = await starteBrowser();
  let naechste = 0;
  const arbeiter = async () => {
    while (naechste < aufgaben.length) {
      const j = naechste++;
      let p = await vergleichePaar(await verbundenerBrowser(), aufgaben[j].seite, aufgaben[j].geraet);
      if (p.fehler && !browser.isConnected()) {
        const erster = p.fehler;
        p = await vergleichePaar(await verbundenerBrowser(), aufgaben[j].seite, aufgaben[j].geraet);
        p.wiederholt = true;
        p.fehler_erster_versuch = erster;
      }
      paare[j] = p;
      console.error(`${j + 1}/${aufgaben.length} ${p.seite} · ${p.geraet}: ${p.fehler ? `FEHLER ${p.fehler}` : (p.abweichend ? `Abweichung ${p.summe_abweichend} Pixel` : 'ohne Abweichung')}${p.wiederholt ? ' (wiederholt nach Browserverlust)' : ''}`);
    }
  };
  await Promise.all(Array.from({ length: worker }, arbeiter));
} catch (e) {
  console.error(`ABBRUCH: ${String(e.message || e)}`);
  if (browser) await browser.close().catch(() => {});
  process.exit(2);
}
await browser.close().catch(() => {});

const laufzeitMin = Math.round(((Date.now() - t0Lauf) / 60000) * 100) / 100;
const fehlerPaare = paare.filter((p) => p.fehler);
const abweichendPaare = paare.filter((p) => p.abweichend);
const summeGesamt = paare.reduce((s, p) => s + p.summe_abweichend, 0);
const ungeprueftGesamt = paare.reduce((s, p) => s + (p.ungeprueft_px || 0), 0);
const ungeprueftPaare = paare.filter((p) => p.ungeprueft_px > 0).length;

const ausgabe = {
  werkzeug: 'pixelvergleich.mjs',
  satz,
  vorher: vorherBase,
  nachher: nachherBase,
  stand_vorher: serverStand(vorherBase),
  stand_nachher: serverStand(nachherBase),
  seiten,
  geraete,
  schwelle,
  include_aa: true,
  worker,
  selbsttest_stoerung: stoerung,
  laufzeit_min: laufzeitMin,
  max_ausschnitte: Number.isFinite(maxAusschnitte) ? maxAusschnitte : null,
  zusammenfassung: { paare: paare.length, mit_abweichung: abweichendPaare.length, summe_abweichend: summeGesamt, fehler: fehlerPaare.length, wiederholt: paare.filter((p) => p.wiederholt).length, ungeprueft_px: ungeprueftGesamt, paare_mit_ungeprueftem_rest: ungeprueftPaare },
  paare,
};
fs.writeFileSync(path.join(ziel, 'pixelvergleich.json'), JSON.stringify(ausgabe, null, 2));

const top5 = [...paare].filter((p) => !p.fehler).sort((x, y) => y.anteil - x.anteil || y.summe_abweichend - x.summe_abweichend).slice(0, 5);
const zeilen = [
  `Pixelvergleich · Satz ${satz} · ${vorherBase} gegen ${nachherBase}`,
  `Paare: ${paare.length} · mit Abweichung: ${abweichendPaare.length} · Fehler: ${fehlerPaare.length} · Pixel gesamt: ${summeGesamt} · Laufzeit: ${laufzeitMin} min`,
  ...(ungeprueftPaare ? [`Ungeprüft (Obergrenze --max-ausschnitte): ${ungeprueftGesamt} px Höhe in ${ungeprueftPaare} Paaren`] : ['Abdeckung: ganze Seiten']),
  ...(fehlerPaare.length ? fehlerPaare.map((p) => `FEHLER ${p.seite} · ${p.geraet}: ${p.fehler}`) : []),
  'Die fünf größten nach Anteil:',
  ...top5.map((p, i) => `  ${i + 1}. ${p.seite} · ${p.geraet} · ${p.summe_abweichend} Pixel · Anteil ${p.anteil.toExponential(3)}${p.hoehe_abweichend ? ` · Höhe ${p.hoehe_vorher}/${p.hoehe_nachher}` : ''}`),
  ...(top5.length && top5[0].anteil === 0 && !top5.some((p) => p.hoehe_abweichend) ? ['  (keine Abweichung)'] : []),
  `Ergebnis: ${path.join(ziel, 'pixelvergleich.json')}`,
];
console.log(zeilen.join('\n'));

if (fehlerPaare.length) process.exit(2);
process.exit(abweichendPaare.length ? 1 : 0);
