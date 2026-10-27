// SVG-Prüfung (Z-06): SVGO-Fixpunkt, eingebettete Pixelbilder, viewBox und Budgets je Datei;
// im Seitenmodus doppelte Kennungen und Zugänglichkeit aller Inline-SVGs je Ansicht (m390, d1440).
// Nutzung: node svg.mjs [--dateien <svg…|Ordner>] [--seiten /a,/b] [--base URL] [--animiert] [--ziel <ordner>]
//   Dateimodus: je SVG mit svgo optimieren und prüfen. Die Dateien werden nicht verändert.
//   Konfiguration: statisch = svgo-statisch.config.mjs; mit --animiert = svgo-animiert.config.mjs (gilt für den ganzen Lauf,
//   es gibt keine Erkennung je Datei; statische und animierte Dateien deshalb getrennt prüfen).
//   Seitenmodus: Playwright mit Anfragesperre aus lib.mjs; Standard-Basis ist BASE aus lib.mjs. Startet keine Server.
// Budgets (dezimal, strenger Lesart): viewBox 24×24 → roh ≤ 1,5 KB (1500 Byte); sonst gzip ≤ 40 KB (40000 Byte).
// Ergebnis: _werkstatt/cache/svg/<zeitstempel>.json bzw. --ziel. Exit: 0 ohne Befund, 1 mit Befund, 2 Laufzeitfehler.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { pathToFileURL } from 'node:url';
import { optimize } from 'svgo';
import { chromium } from '@playwright/test';
import { BASE, REPO, RELAUNCH, ANSICHTEN, assertLocal, installSperre, setzeEinwilligung, bereit, durchscrollen, ensureDir } from './lib.mjs';

const KB = 1000;
const ICON_MAX_ROH = 1.5 * KB;
const ILLU_MAX_GZIP = 40 * KB;
import STATISCH from './svgo-statisch.config.mjs';
import ANIMIERT from './svgo-animiert.config.mjs';
const ANSICHTEN_SEITE = ['m390', 'd1440'];

const relPfad = (f) => path.relative(REPO, f).split(path.sep).join('/');
const norm = (s) => s.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
// Vergleich mit der SVGO-Fassung ohne Attributreihenfolge und ohne SVG-Standardwerte, die SVGO streicht
// (der Icon-Kopf nennt stroke-linejoin="miter" bewusst; KERN K-008).
const STANDARDWERTE = new Set(['stroke-linejoin=miter', 'stroke-linecap=butt', 'stroke-miterlimit=4', 'fill-rule=nonzero', 'stroke-dashoffset=0', 'stroke-opacity=1', 'fill-opacity=1', 'opacity=1']);
const kanon = (s) => norm(s).replace(/<([\w:-]+)((?:\s+[\w:-]+\s*=\s*"[^"]*")*)\s*(\/?)>/g, (_, tag, attrs, zu) => {
  const liste = [...attrs.matchAll(/([\w:-]+)\s*=\s*"([^"]*)"/g)].map(([, n, v]) => `${n}=${v}`).filter((a) => !STANDARDWERTE.has(a)).sort();
  return `<${tag}${liste.map((a) => { const i = a.indexOf('='); return ` ${a.slice(0, i)}="${a.slice(i + 1)}"`; }).join('')}${zu}>`;
});

// Zweimal optimieren: Fixpunkt, wenn die zweite Runde nichts mehr ändert.
export function optimiere(text, animiert = false) {
  const cfg = animiert ? ANIMIERT : STATISCH;
  return optimize(optimize(text, cfg).data, cfg).data;
}

export function pruefeSvgText(text, { animiert = false } = {}) {
  const cfg = animiert ? ANIMIERT : STATISCH;
  const opt1 = optimize(text, cfg).data;
  const opt2 = optimize(opt1, cfg).data;
  const bytes = Buffer.byteLength(text, 'utf8');
  const gzip = zlib.gzipSync(Buffer.from(text, 'utf8')).length;
  const vb = /<svg\b[^>]*?\sviewBox\s*=\s*["']([^"']*)["']/i.exec(text);
  const zahlen = vb ? vb[1].trim().split(/[\s,]+/).map(Number) : [];
  const icon24 = zahlen.length === 4 && zahlen[2] === 24 && zahlen[3] === 24;
  const fixpunkt = opt1 === opt2;
  const entspricht = kanon(text) === kanon(opt1);
  const pixel = (text.match(/<image\b/gi) || []).length + (text.match(/data:image\//gi) || []).length;
  const befunde = [];
  if (!/<svg\b/i.test(text)) befunde.push({ art: 'kein_svg', hinweis: 'kein <svg>-Wurzelelement' });
  if (!vb) befunde.push({ art: 'viewbox_fehlt', hinweis: 'kein viewBox-Attribut' });
  if (!fixpunkt) befunde.push({ art: 'kein_fixpunkt', hinweis: 'zweite SVGO-Runde ändert die Datei weiter' });
  if (!entspricht) befunde.push({ art: 'nicht_optimiert', hinweis: 'Datei weicht von der SVGO-Fassung ab (ohne Leerraum, Attributreihenfolge und Standardwerte)' });
  if (pixel) befunde.push({ art: 'pixelbild', hinweis: `${pixel} eingebettete(s) Pixelbild(er): <image> bzw. data:image` });
  if (icon24 && bytes > ICON_MAX_ROH) befunde.push({ art: 'budget_icon', hinweis: `${bytes} Byte roh, Grenze ${ICON_MAX_ROH} Byte` });
  if (!icon24 && gzip > ILLU_MAX_GZIP) befunde.push({ art: 'budget_illustration', hinweis: `${gzip} Byte gzip, Grenze ${ILLU_MAX_GZIP} Byte` });
  return {
    bytes,
    gzip,
    optimiert_bytes: opt1.length,
    optimiert_gzip: zlib.gzipSync(Buffer.from(opt1, 'utf8')).length,
    viewbox: vb ? vb[1] : null,
    icon24,
    fixpunkt,
    entspricht,
    pixelbilder: pixel,
    befunde,
  };
}

// Läuft im Browser: Kennungen zählen und jedes <svg> mit Name, aria-hidden, focusable und Vorfahren erfassen.
export function sammleSvgInSeite() {
  const zaehl = new Map();
  for (const el of document.querySelectorAll('[id]')) zaehl.set(el.id, (zaehl.get(el.id) || 0) + 1);
  const doppelt = [];
  for (const [id, n] of zaehl) if (n > 1) doppelt.push({ id, n });
  const liste = [];
  for (const s of document.querySelectorAll('svg')) {
    const kind = Array.from(s.children).find((c) => c.localName === 'title');
    const lb = (s.getAttribute('aria-labelledby') || '').trim();
    const lbText = lb.split(/\s+/).filter(Boolean)
      .map((id) => ((document.getElementById(id) || {}).textContent || '').trim())
      .filter(Boolean).join(' ');
    liste.push({
      ausschnitt: s.outerHTML.replace(/\s+/g, ' ').slice(0, 160),
      role: (s.getAttribute('role') || '').trim(),
      ariaLabel: (s.getAttribute('aria-label') || '').trim(),
      labelledby: lbText,
      titel: kind ? (kind.textContent || '').trim() : '',
      ariaHidden: (s.getAttribute('aria-hidden') || '').trim(),
      focusable: (s.getAttribute('focusable') || '').trim(),
      verdeckt: s.parentElement !== null && s.parentElement.closest('[aria-hidden="true"]') !== null,
    });
  }
  return { doppelt, liste };
}

// Benannt = role="img" plus aria-label, aufgelöstes aria-labelledby oder <title>. Alles andere ist dekorativ.
export function bewerteSvgSeite(daten) {
  const befunde = [];
  for (const d of daten.liste) {
    const benannt = d.role === 'img' && Boolean(d.ariaLabel || d.labelledby || d.titel);
    if (benannt) continue;
    if (d.ariaHidden !== 'true' && !d.verdeckt) {
      befunde.push({ art: 'dekorativ_ohne_aria_hidden', kandidat: d.ausschnitt, hinweis: 'ohne Namen und ohne aria-hidden="true"' });
    }
    if (d.focusable !== 'false') befunde.push({ art: 'focusable_fehlt', kandidat: d.ausschnitt, hinweis: 'dekorativ, aber focusable ist nicht "false"' });
  }
  for (const x of daten.doppelt) befunde.push({ art: 'id_doppelt', kandidat: x.id, hinweis: `${x.n} Elemente mit derselben id` });
  return { inline: daten.liste.length, befunde };
}

function parseArgs(args) {
  const o = { dateien: [], seiten: [], base: BASE, animiert: false, ziel: null };
  let modus = null;
  const wert = (i, a) => { if (i + 1 >= args.length) throw new Error(`${a} braucht einen Wert`); return args[i + 1]; };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a.startsWith('--')) modus = null;
    if (a === '--dateien') modus = 'dateien';
    else if (a === '--seiten') { o.seiten = wert(i, a).split(',').filter(Boolean); i++; }
    else if (a === '--base') { o.base = wert(i, a); i++; }
    else if (a === '--animiert') o.animiert = true;
    else if (a === '--ziel') { o.ziel = wert(i, a); i++; }
    else if (modus === 'dateien') o.dateien.push(...a.split(',').filter(Boolean));
    else throw new Error(`Unbekannte Option oder Wert: ${a}`);
  }
  return o;
}

function svgDateien(args) {
  const liste = [];
  const rek = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) rek(p);
      else if (e.name.toLowerCase().endsWith('.svg')) liste.push(p);
    }
  };
  for (const a of args) {
    const p = path.resolve(REPO, a);
    if (!fs.existsSync(p)) throw new Error(`nicht gefunden: ${a}`);
    if (fs.statSync(p).isDirectory()) rek(p);
    else liste.push(p);
  }
  return [...new Set(liste)].sort();
}

function dateimodus(args, animiert) {
  return svgDateien(args).map((f) => {
    try {
      return { datei: relPfad(f), ...pruefeSvgText(fs.readFileSync(f, 'utf8'), { animiert }) };
    } catch (e) {
      const meldung = String(e.message).slice(0, 200);
      return { datei: relPfad(f), fehler: meldung, befunde: [{ art: 'svgo_fehler', hinweis: meldung }] };
    }
  });
}

async function erreichbar(base) {
  try {
    await fetch(`${base}/`, { signal: AbortSignal.timeout(8000) });
    return true;
  } catch {
    return false;
  }
}

async function einSeitenlauf(browser, base, seite, ansicht) {
  const v = ANSICHTEN[ansicht];
  const context = await browser.newContext({ viewport: { width: v.width, height: v.height }, isMobile: v.isMobile, hasTouch: v.hasTouch, reducedMotion: 'reduce', locale: 'de-DE' });
  const protokoll = [];
  await installSperre(context, { protokoll });
  await setzeEinwilligung(context, 'abgelehnt', base);
  const page = await context.newPage();
  const r = { seite, ansicht, status: null, inline_svgs: 0, befunde: [], fehler: null };
  try {
    const antwort = await page.goto(base + seite, { waitUntil: 'domcontentloaded', timeout: 45000 });
    r.status = antwort ? antwort.status() : null;
    await bereit(page);
    await durchscrollen(page);
    await bereit(page);
    const b = bewerteSvgSeite(await page.evaluate(sammleSvgInSeite));
    r.inline_svgs = b.inline;
    r.befunde = b.befunde.map((x) => ({ ...x, seite, ansicht }));
    if (r.status !== 200) r.befunde.push({ art: 'seite_status', kandidat: seite, hinweis: `HTTP ${r.status}`, seite, ansicht });
  } catch (e) {
    r.fehler = String(e.message).slice(0, 300);
  }
  r.anfragen = {
    fremd: protokoll.filter((p) => p.art === 'fremd').length,
    blockiert: protokoll.filter((p) => p.art === 'blockiert').length,
    anfrage_attrappe: protokoll.filter((p) => p.art === 'anfrage').length,
  };
  await context.close();
  return r;
}

async function seitenmodus(base, seiten) {
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
  const jobs = seiten.flatMap((s) => ANSICHTEN_SEITE.map((a) => [s, a]));
  const ergebnisse = [];
  let i = 0;
  try {
    await Promise.all(Array.from({ length: 2 }, async () => {
      while (i < jobs.length) {
        const [s, a] = jobs[i++];
        ergebnisse.push(await einSeitenlauf(browser, base, s, a));
      }
    }));
  } finally {
    await browser.close();
  }
  return ergebnisse.sort((x, y) => (x.seite + x.ansicht).localeCompare(y.seite + y.ansicht));
}

export async function main(argv) {
  const opt = parseArgs(argv);
  assertLocal(opt.base); // G5: auch im Dateimodus nur lokale Basis zulassen
  if (!opt.dateien.length && !opt.seiten.length) {
    throw new Error('weder --dateien noch --seiten angegeben (Aufruf siehe Kopfkommentar)');
  }
  const zeit = new Date();
  const bericht = { werkzeug: 'svg.mjs', zeitpunkt: zeit.toISOString(), animiert: opt.animiert, dateien: [], seiten: null, befunde_gesamt: 0 };
  const befunde = [];
  if (opt.dateien.length) {
    bericht.dateien = dateimodus(opt.dateien, opt.animiert);
    for (const d of bericht.dateien) for (const b of d.befunde) befunde.push({ datei: d.datei, ...b });
  }
  if (opt.seiten.length) {
    if (!(await erreichbar(opt.base))) throw new Error(`Server ${opt.base} nicht erreichbar – nicht gestartet, bitte melden`);
    const ergebnisse = await seitenmodus(opt.base, opt.seiten);
    bericht.seiten = { base: opt.base, ansichten: ANSICHTEN_SEITE, ergebnisse };
    for (const r of ergebnisse) {
      for (const b of r.befunde) befunde.push({ seite: r.seite, ansicht: r.ansicht, ...b });
      if (r.fehler) befunde.push({ seite: r.seite, ansicht: r.ansicht, art: 'lauf_fehler', hinweis: r.fehler });
    }
  }
  bericht.befunde = befunde;
  bericht.befunde_gesamt = befunde.length;
  bericht.zusammenfassung = {};
  for (const b of befunde) bericht.zusammenfassung[b.art] = (bericht.zusammenfassung[b.art] || 0) + 1;
  const ausgabe = ensureDir(opt.ziel ? path.resolve(REPO, opt.ziel) : path.join(RELAUNCH, 'cache', 'svg'));
  const datei = path.join(ausgabe, `${zeit.toISOString().replace(/[:.]/g, '-')}.json`);
  fs.writeFileSync(datei, JSON.stringify(bericht, null, 1));
  if (bericht.dateien.length) {
    const fix = bericht.dateien.filter((d) => d.fixpunkt).length;
    const optimiert = bericht.dateien.filter((d) => d.entspricht).length;
    console.log(`svg-Dateien: ${bericht.dateien.length} · Fixpunkt ${fix}/${bericht.dateien.length} · optimiert ${optimiert}/${bericht.dateien.length}${opt.animiert ? ' · animiert' : ''}`);
    for (const d of bericht.dateien) {
      const liste = d.befunde.map((b) => b.art).join(', ') || 'ohne Befund';
      console.log(`  ${d.datei}: ${liste}${d.bytes !== undefined ? ` (roh ${d.bytes} · gzip ${d.gzip})` : ''}`);
    }
  }
  if (bericht.seiten) {
    console.log(`seiten (${bericht.seiten.base}, Ansichten ${ANSICHTEN_SEITE.join(', ')}):`);
    for (const r of bericht.seiten.ergebnisse) {
      console.log(`  ${r.seite} ${r.ansicht}: Inline-SVG ${r.inline_svgs} · HTTP ${r.status ?? '–'} · Befunde ${r.befunde.length}${r.fehler ? ' · Lauf-Fehler' : ''}`);
    }
  }
  console.log(`befunde gesamt: ${befunde.length}`);
  console.log(`Bericht: ${path.relative(REPO, datei).split(path.sep).join('/')}`);
  return befunde.length ? 1 : 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main(process.argv.slice(2))
    .then((code) => { process.exitCode = code; })
    .catch((e) => { console.error(e.message.startsWith('ABBRUCH') ? e.message : `ABBRUCH: ${e.message}`); process.exitCode = 2; });
}
