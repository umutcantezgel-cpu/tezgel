// Ebene 8 · Formsystem SVG (K-010, K-013, Z-10) · Kern v1.2 · Werkzeug P3-00b
// Zweck: prüft alle SVGs statisch gegen das Formsystem. Quellen: public/**/*.svg, Inline-SVG in
//   src/**/*.{tsx,jsx} (nur lesen) und Build-HTML .next/server/app/**/*.html (nur lesen, je Seite).
// Prüfungen je SVG: viewBox · feste Farben (Markenlogos per Liste ausgenommen) · eingebettete Pixelbilder ·
//   IDs (Datei bzw. gesamtes Seiten-DOM) · url(#…)/aria-labelledby mit Ziel · Zugänglichkeit · Strichstärke
//   gegen 1,5 · Größe gegen Budget (Icon 1,5 KB roh, Illustration 40 KB gzip) · Icon-Familie und
//   „Familien je Seite“.
// Optimierung (Modus --optimiere statisch|animiert): SVGO mit den beiden Konfigurationen, Fixpunkt-Probe
//   (zweiter Lauf ändert nichts), Erhalt von viewBox, Titel, aria-labelledby-Zielen und Schutz-IDs.
// Messbedingungen: kein Browserlauf, daher kein assertLocal/installSperre (das Werkzeug sendet keine Anfragen).
// Nutzung:
//   node svg.mjs --satz <name> [--seiten /,/bad] [--nur <datei|ordner>] [--build <ordner>] [--ausgabe <ordner>]
//   node svg.mjs --satz <name> --nur <datei|ordner> --optimiere statisch|animiert
// Ausgabe: _relaunch/belege/<satz>/svg.json (Zusammenfassung); Rohdaten je Instanz unter
//   _relaunch/cache/svg/<satz>/instanzen.json (Pfad mit --ausgabe änderbar).
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { optimize } from 'svgo';
import { RELAUNCH, REPO, BASE, WERKZEUGE, ensureDir } from './lib.mjs';

const arg = (k, d = null) => {
  const i = process.argv.indexOf(`--${k}`);
  return i > -1 && process.argv[i + 1] !== undefined ? process.argv[i + 1] : d;
};
const SATZ = arg('satz', 'adhoc');
const SEITEN_FILTER = arg('seiten') ? arg('seiten').split(',').map((s) => s.trim()) : null;
const NUR = arg('nur');
const BUILD = arg('build', '/tmp/claude-0/-home-user-tezgel/f51f963a-66a5-5b8c-a0c5-6b569a6ff96b/scratchpad/reinraum-707a93d/.next/server/app');
const OPT = arg('optimiere');

const KB = 1024;
const BUDGET_ICON_ROH = 1.5 * KB;      // K-013: Icon ≤ 1,5 KB (roh, Bytes)
const BUDGET_ILL_GZ = 40 * KB;         // K-013: Illustration ≤ 40 KB gzip
const STRICH_SOLL = 1.5;               // K-010: Strich 1,5
const PUBLIC_DIR = path.join(REPO, 'public');
const SRC_DIR = path.join(REPO, 'src');

// Markenlogos: nur von Farbregel und Strichregel ausgenommen (Größe und Pixelbilder werden gemeldet).
const MARKEN_DATEI = /(^|\/)public\/images\/logo\/tezgel-/;
const MARKEN_BESCHREIBUNG = [
  'Dateien: public/images/logo/tezgel-*.svg (Bestand, unverändert)',
  'Attribut data-marke an <svg>',
  'Google: <title>Google</title> oder aria-label="Google"',
  'WhatsApp: Pfad beginnt mit "M17.472 14.382"',
];

const R = {
  VB: 'viewBox fehlt',
  FARBE: 'feste Farbe statt currentColor/Variable',
  PIX: 'eingebettetes Pixelbild (image)',
  ID: 'ID-Kollision',
  REF: 'url(#…)/href ohne Ziel',
  A11Y: 'Zugänglichkeit nicht belegt',
  STRICH: 'Strichstärke ≠ 1,5',
  BUD_ICON: 'Budget Icon über 1,5 KB (roh)',
  BUD_ILL: 'Budget Illustration über 40 KB (gzip)',
  FAM: 'mehrere Icon-Familien je Seite',
  IDSEITE: 'ID-Dopplung im Seiten-DOM (Build, alle Elemente)',
};

// ---------- Tokenizer für HTML und JSX (keine Parser-Abhängigkeit im Paket) ----------
const RE_OPEN = /<([A-Za-z][\w:.-]*)/y;
const RE_CLOSE = /<\/([A-Za-z][\w:.-]*)\s*>/y;
const RE_ATTR = /[^\s=>/{}"'<]+/y;
const RE_UNQ = /[^\s>]+/y;
const WS = /\s/;

function findEnd(s, i, q) {
  for (; i < s.length; i++) {
    if (s[i] === '\\') { i++; continue; }
    if (s[i] === q) return i;
  }
  return s.length;
}

// s[k] === '{' → Index hinter der passenden schließenden Klammer (Strings, Kommentare beachtet)
function skipBraces(s, k) {
  let d = 0;
  for (let i = k; i < s.length; i++) {
    const c = s[i];
    if (c === '"' || c === "'" || c === '`') { i = findEnd(s, i + 1, c); continue; }
    if (c === '/' && s[i + 1] === '*') { const e = s.indexOf('*/', i + 2); i = e < 0 ? s.length : e + 1; continue; }
    if (c === '/' && s[i + 1] === '/') { const e = s.indexOf('\n', i); i = e < 0 ? s.length : e; continue; }
    if (c === '{') d++;
    else if (c === '}') { d--; if (d === 0) return i + 1; }
  }
  return s.length;
}

function tokenize(s) {
  const ev = [];
  const L = s.length;
  let i = 0;
  let tStart = -1;
  const flush = (end) => { if (tStart >= 0 && end > tStart) ev.push({ t: 'x', v: s.slice(tStart, end) }); tStart = -1; };
  while (i < L) {
    if (s[i] !== '<') { if (tStart < 0) tStart = i; i++; continue; }
    if (s.startsWith('<!--', i)) { flush(i); const e = s.indexOf('-->', i + 4); i = e < 0 ? L : e + 3; continue; }
    if (s[i + 1] === '!' || s[i + 1] === '?') { flush(i); const e = s.indexOf('>', i); i = e < 0 ? L : e + 1; continue; }
    RE_CLOSE.lastIndex = i;
    let m = RE_CLOSE.exec(s);
    if (m) { flush(i); ev.push({ t: 'c', n: m[1], s: i, e: RE_CLOSE.lastIndex }); i = RE_CLOSE.lastIndex; continue; }
    RE_OPEN.lastIndex = i;
    m = RE_OPEN.exec(s);
    if (!m) { if (tStart < 0) tStart = i; i++; continue; }
    flush(i);
    const start = i;
    const name = m[1];
    let j = RE_OPEN.lastIndex;
    const a = {};
    let sc = false;
    let spread = false;
    while (j < L) {
      while (j < L && WS.test(s[j])) j++;
      if (j >= L) break;
      if (s[j] === '/' && s[j + 1] === '>') { sc = true; j += 2; break; }
      if (s[j] === '>') { j++; break; }
      if (s[j] === '{') { j = skipBraces(s, j); spread = true; continue; }
      RE_ATTR.lastIndex = j;
      const am = RE_ATTR.exec(s);
      if (!am) { j++; continue; }
      const an = am[0];
      j = RE_ATTR.lastIndex;
      let k = j;
      while (k < L && WS.test(s[k])) k++;
      if (s[k] !== '=') { a[an] = { v: '', x: false }; continue; }
      k++;
      while (k < L && WS.test(s[k])) k++;
      const q = s[k];
      if (q === '"' || q === "'") {
        const e = s.indexOf(q, k + 1);
        const end = e < 0 ? L : e;
        a[an] = { v: s.slice(k + 1, end), x: false };
        j = end + 1;
      } else if (q === '{') {
        const e = skipBraces(s, k);
        a[an] = { v: s.slice(k + 1, e - 1).trim(), x: true };
        j = e;
      } else {
        RE_UNQ.lastIndex = k;
        const um = RE_UNQ.exec(s);
        a[an] = { v: um ? um[0] : '', x: false };
        j = um ? RE_UNQ.lastIndex : k;
      }
    }
    ev.push({ t: 'o', n: name, a, sc, spread, s: start, e: j });
    i = j;
    if (!sc && (name === 'script' || name === 'style')) {
      const re = new RegExp(`</${name}\\s*>`, 'gi');
      re.lastIndex = i;
      const mm = re.exec(s);
      const end = mm ? mm.index : L;
      if (end > i) ev.push({ t: 'x', v: s.slice(i, end) });
      if (mm) { ev.push({ t: 'c', n: name, s: end, e: end + mm[0].length }); i = end + mm[0].length; } else i = L;
    }
  }
  flush(L);
  return ev;
}

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const JSX_NAMEN = {
  className: 'class', strokeWidth: 'stroke-width', strokeLinecap: 'stroke-linecap', strokeLinejoin: 'stroke-linejoin',
  strokeDasharray: 'stroke-dasharray', strokeDashoffset: 'stroke-dashoffset', strokeOpacity: 'stroke-opacity',
  strokeMiterlimit: 'stroke-miterlimit', fillOpacity: 'fill-opacity', fillRule: 'fill-rule', clipRule: 'clip-rule',
  clipPath: 'clip-path', stopColor: 'stop-color', stopOpacity: 'stop-opacity', floodColor: 'flood-color',
  floodOpacity: 'flood-opacity', lightingColor: 'lighting-color', vectorEffect: 'vector-effect', xlinkHref: 'xlink:href',
  textAnchor: 'text-anchor', dominantBaseline: 'dominant-baseline', fontFamily: 'font-family', fontSize: 'font-size',
  fontWeight: 'font-weight', markerEnd: 'marker-end', markerStart: 'marker-start',
};

// Baum aus Tokens; Knoten: {n, a, ch, p, txt, s, ee}
function parse(text) {
  const root = { n: '#doc', a: {}, ch: [], p: null, txt: '', s: 0, ee: text.length };
  const stack = [root];
  let cur = root;
  for (const e of tokenize(text)) {
    if (e.t === 'o') {
      const a = {};
      for (const [k, v] of Object.entries(e.a)) a[JSX_NAMEN[k] || k] = v;
      const node = { n: e.n, a, ch: [], p: cur, txt: '', s: e.s, ee: e.e };
      cur.ch.push(node);
      if (!e.sc && !VOID.has(e.n.toLowerCase())) { stack.push(node); cur = node; }
    } else if (e.t === 'c') {
      for (let k = stack.length - 1; k > 0; k--) {
        if (stack[k].n === e.n) { stack[k].ee = e.e; stack.length = k; cur = stack[k - 1]; break; }
      }
    } else if (e.t === 'x') {
      cur.txt += e.v;
    }
  }
  for (const n of stack.slice(1)) n.ee = text.length;
  return root;
}

function allEls(n, out = []) { out.push(n); for (const c of n.ch) allEls(c, out); return out; }

function findSvgRoots(n, out = [], inSvg = false) {
  for (const c of n.ch) {
    if (c.n === 'svg' && !inSvg) out.push(c);
    findSvgRoots(c, out, inSvg || c.n === 'svg');
  }
  return out;
}

// Literalwert eines Attributs: String, '' (bool), oder null (Ausdruck, nicht auswertbar)
function lit(at) {
  if (!at.x) return at.v;
  const t = at.v.trim();
  const m = /^(["'`])([\s\S]*)\1$/.exec(t);
  if (m && !m[2].includes('${')) return m[2];
  if (/^-?\d+(\.\d+)?$/.test(t) || t === 'true' || t === 'false') return t;
  return null;
}
// undefined = fehlt · null = Ausdruck · string = Literal
function getA(node, name) {
  const at = node.a[name];
  return at === undefined ? undefined : lit(at);
}

const kurz = (s, n) => { const t = String(s); return t.length > n ? t.slice(0, n - 1) + '…' : t; };

// ---------- Prüfungen ----------
const FARB_ATTR = ['fill', 'stroke', 'stop-color', 'flood-color', 'lighting-color', 'color'];
const EXEMPT = new Set(['none', 'currentcolor', 'inherit', 'transparent', 'context-fill', 'context-stroke', '']);
const NAMED = new Set(['black', 'white', 'red', 'green', 'blue', 'gray', 'grey', 'orange', 'yellow', 'purple', 'pink',
  'brown', 'silver', 'navy', 'teal', 'maroon', 'lime', 'aqua', 'fuchsia', 'olive', 'cyan', 'magenta']);
const HEX = /(?<!\()#[0-9a-fA-F]{3,8}\b/;
const FUNK = /\b(?:rgba?|hsla?)\(/i;
const GEOM = new Set(['path', 'line', 'polyline', 'polygon', 'rect', 'circle', 'ellipse', 'use', 'text', 'image']);

function testFarbe(t) {
  const s = String(t).trim();
  if (/^url\(/i.test(s) || EXEMPT.has(s.toLowerCase())) return null;
  if (HEX.test(s) || FUNK.test(s) || NAMED.has(s.toLowerCase())) return s;
  return null;
}
function farbeFund(at) {
  if (at.x) {
    const l = lit(at);
    if (l !== null) return testFarbe(l);
    return HEX.test(at.v) || FUNK.test(at.v) ? kurz(at.v, 40) : null;
  }
  return testFarbe(at.v);
}

function markeVon(sv, els, ort) {
  const dm = getA(sv, 'data-marke');
  if (dm !== undefined) return `data-marke=${dm}`;
  if (MARKEN_DATEI.test(ort)) return 'Tezgel-Logo (Bestand)';
  const titel = els.find((e) => e.n === 'title');
  if ((titel && titel.txt.trim() === 'Google') || getA(sv, 'aria-label') === 'Google') return 'Google-Logo';
  if (els.some((e) => { const d = getA(e, 'd'); return typeof d === 'string' && d.startsWith('M17.472 14.382'); })) return 'WhatsApp-Logo';
  return null;
}

function analyseUnit(sv, kx) {
  const { text, scope, dup, quelle, ort } = kx;
  const els = allEls(sv);
  const markup = text.slice(sv.s, sv.ee ?? text.length);
  const bytes = Buffer.byteLength(markup, 'utf8');
  const gz = zlib.gzipSync(markup, { level: 9 }).length;
  const hash = crypto.createHash('sha1').update(markup).digest('hex').slice(0, 12);
  const befunde = [];

  // viewBox
  const vbRoh = getA(sv, 'viewBox');
  if (vbRoh === undefined) befunde.push(R.VB);
  const vb = typeof vbRoh === 'string' ? vbRoh.trim().split(/[\s,]+/).join(' ') : null;

  // Familie und Art
  const marke = markeVon(sv, els, ort);
  const cls = String(getA(sv, 'class') ?? '');
  let familie;
  if (marke) familie = 'marke';
  else if (/(^|\s)lucide(\s|-|$)/.test(cls)) familie = 'lucide';
  else if (vb === '0 0 256 256' || /(^|\s)ph(-|\s|$)/.test(cls)) familie = 'phosphor';
  else familie = 'eigene';
  let art;
  if (marke) art = 'marke';
  else if (familie === 'lucide' || familie === 'phosphor') art = 'icon';
  else if (!vb) art = 'unbekannt';
  else { const p = vb.split(' ').map(Number); art = p.length === 4 && p[2] === p[3] && p[2] <= 256 ? 'icon' : 'illustration'; }

  // feste Farben (Markenlogos ausgenommen)
  const farben = [];
  for (const e of els) {
    for (const k of FARB_ATTR) {
      const at = e.a[k];
      if (!at) continue;
      const f = farbeFund(at);
      if (f) farben.push(`${e.n}.${k}=${kurz(f, 40)}`);
    }
    const st = e.a.style;
    if (st && (HEX.test(st.v) || FUNK.test(st.v))) farben.push(`${e.n}.style=${kurz(st.v, 40)}`);
  }
  if (!marke && farben.length) befunde.push(R.FARBE);

  // Strichstärke je Geometrie-Element mit wirksamer Kontur (vererbt)
  const striche = {};
  (function w(n, inh) {
    const st = n.a.stroke !== undefined ? lit(n.a.stroke) : inh.st;
    const swRoh = n.a['stroke-width'] !== undefined ? lit(n.a['stroke-width']) : inh.sw;
    if (GEOM.has(n.n) && typeof st === 'string' && st !== 'none' && st !== '') {
      let k;
      if (swRoh === undefined) k = '1';
      else if (swRoh === null) k = 'Ausdruck';
      else { const num = parseFloat(swRoh); k = Number.isFinite(num) ? String(num) : String(swRoh); }
      striche[k] = (striche[k] || 0) + 1;
    }
    for (const c of n.ch) w(c, { st, sw: swRoh });
  })(sv, {});
  const abweichend = Object.keys(striche).filter((k) => k !== 'Ausdruck' && Math.abs(parseFloat(k) - STRICH_SOLL) > 1e-9);
  if (!marke && abweichend.length) befunde.push(R.STRICH);

  // IDs und Verweise
  const ids = [];
  for (const e of els) { const v = getA(e, 'id'); if (typeof v === 'string' && v) ids.push(v); }
  if (ids.some((i) => dup.has(i))) befunde.push(R.ID);
  const refs = [];
  for (const e of els) {
    for (const [k, at] of Object.entries(e.a)) {
      if (at.x) continue;
      for (const m of at.v.matchAll(/url\(\s*['"]?#([^)'"\s]+)/g)) refs.push(m[1]);
      if ((k === 'href' || k === 'xlink:href') && at.v.startsWith('#')) refs.push(at.v.slice(1));
    }
  }
  if (refs.some((r) => !scope.has(r))) befunde.push(R.REF);

  // eingebettete Pixelbilder
  const pixel = els.filter((e) => e.n === 'image').length;
  if (pixel) befunde.push(R.PIX);

  // Zugänglichkeit: dekorativ (aria-hidden am SVG oder Vorfahr) oder bedeutungstragend (role=img + aria-labelledby mit Ziel)
  const verdeckt = (() => { for (let p = sv; p && p.n !== '#doc'; p = p.p) if (getA(p, 'aria-hidden') === 'true') return true; return false; })();
  const role = getA(sv, 'role');
  const lb = getA(sv, 'aria-labelledby');
  let a11y;
  let grund = null;
  if (verdeckt) a11y = 'dekorativ';
  else if (lb === null) a11y = 'unbestimmt';
  else if (role === 'img' && typeof lb === 'string' && lb.trim()) {
    if (lb.trim().split(/\s+/).every((z) => scope.has(z))) a11y = 'bedeutung';
    else { a11y = 'fehlt'; grund = 'aria-labelledby ohne Ziel'; }
  } else {
    a11y = 'fehlt';
    if (role === 'img') grund = getA(sv, 'aria-label') !== undefined ? 'role=img nur mit aria-label' : 'role=img ohne aria-labelledby';
    else grund = 'weder aria-hidden noch role=img';
  }
  if (a11y === 'fehlt') befunde.push(R.A11Y);

  // Budgets (Marken ausgenommen; Quellblöcke nicht: ihr Text ist JSX, nicht das ausgelieferte Markup)
  const budgetPruefen = !marke && quelle !== 'src';
  if (budgetPruefen && art === 'icon' && bytes > BUDGET_ICON_ROH) befunde.push(R.BUD_ICON);
  if (budgetPruefen && (art === 'illustration' || art === 'unbekannt') && gz > BUDGET_ILL_GZ) befunde.push(R.BUD_ILL);

  return {
    quelle, ort, art, familie, marke, hash, vb, viewBox: vbRoh !== undefined,
    bytes, gz, farben: marke ? [] : farben, striche, abweichend: abweichend.length > 0, pixel,
    ids: ids.length, a11y, grund, befunde, kurz: kurz(markup.replace(/\s+/g, ' '), 160),
  };
}

function dupSet(liste) {
  const zaehl = new Map();
  for (const i of liste) zaehl.set(i, (zaehl.get(i) || 0) + 1);
  return new Set([...zaehl].filter(([, c]) => c > 1).map(([i]) => i));
}

// Quelldatei (public: ganze Datei; Build: ganzes Dokument)
function analyseDoc(text, quelle, ort) {
  const tree = parse(text);
  const roots = findSvgRoots(tree);
  const ids = roots.flatMap((sv) => allEls(sv).map((e) => getA(e, 'id')).filter((v) => typeof v === 'string' && v));
  const scope = new Set(ids);
  const dup = dupSet(ids);
  return roots.map((sv) => analyseUnit(sv, { text, scope, dup, quelle, ort }));
}

// Inline-SVG in JSX: ganze Datei geparst, damit Vorfahren (z. B. <div aria-hidden>) sichtbar bleiben.
// Die Zahl der Wurzeln wird gegen die grep-Zählung von <svg in der Datei geprüft (siehe Bedingungen).
function analyseFragmente(text, quelle, ort) {
  const tree = parse(text);
  const roots = findSvgRoots(tree);
  const ids = roots.flatMap((sv) => allEls(sv).map((e) => getA(e, 'id')).filter((v) => typeof v === 'string' && v));
  const scope = new Set(ids);
  const dup = dupSet(ids);
  return roots.map((sv) => {
    const zeile = text.slice(0, sv.s).split('\n').length;
    return analyseUnit(sv, { text, scope, dup, quelle, ort: `${ort}:${zeile}` });
  });
}

function analysePage(html, seite) {
  const tree = parse(html);
  const idsAlle = allEls(tree).map((e) => getA(e, 'id')).filter((v) => typeof v === 'string' && v);
  const scope = new Set(idsAlle);
  const dup = dupSet(idsAlle);
  const roots = findSvgRoots(tree);
  const us = roots.map((sv) => analyseUnit(sv, { text: html, scope, dup, quelle: 'build', ort: seite }));
  return { us, idDoppelt: dup.size };
}

// ---------- Eingaben ----------
function walk(dir, re) {
  const out = [];
  (function rec(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) rec(p); else if (re.test(e.name)) out.push(p);
    }
  })(dir);
  return out.sort();
}
const relRepo = (f) => path.relative(REPO, f);
function eingabenNur(pfad) {
  const abs = path.resolve(pfad);
  if (fs.statSync(abs).isDirectory()) return [...walk(abs, /\.(svg|tsx|jsx)$/)];
  return [abs];
}
const istSvgDatei = (f) => f.endsWith('.svg');

// ---------- Optimierung ----------
function schutzListe(tree) {
  const ids = new Set();
  for (const e of allEls(tree)) {
    for (const k of ['aria-labelledby', 'aria-describedby']) {
      const v = getA(e, k);
      if (typeof v === 'string') v.trim().split(/\s+/).forEach((x) => x && ids.add(x));
    }
    if (e.n === 'style' || e.n === 'script') {
      const t = e.txt;
      for (const m of t.matchAll(/#([A-Za-z_][\w-]*)/g)) ids.add(m[1]);
      for (const m of t.matchAll(/getElementById\(\s*['"`]([^'"`]+)/g)) ids.add(m[1]);
      for (const m of t.matchAll(/querySelector(?:All)?\(\s*['"`]#([^'"`\s]+)/g)) ids.add(m[1]);
    }
  }
  return [...ids].sort();
}
const zaehleTags = (s) => ({
  path: (s.match(/<path\b/g) || []).length,
  g: (s.match(/<g\b/g) || []).length,
  formen: (s.match(/<(rect|circle|ellipse|line|polygon|polyline)\b/g) || []).length,
});

function optimiereLauf(modus, dateien) {
  const basis = JSON.parse(fs.readFileSync(path.join(WERKZEUGE, `svgo-${modus}.json`), 'utf8'));
  const ziel = ensureDir(path.join(RELAUNCH, 'cache', 'svg', 'optimiert', modus));
  const bericht = [];
  for (const f of dateien) {
    const text = fs.readFileSync(f, 'utf8');
    const schutz = schutzListe(parse(text));
    const cfg = structuredClone(basis);
    cfg.plugins[0].params.overrides.cleanupIds.preserve = schutz;
    const o1 = optimize(text, { path: f, ...cfg }).data;
    const o2 = optimize(o1, { path: f, ...cfg }).data;
    fs.writeFileSync(path.join(ziel, path.basename(f)), o1);
    const gz = (s) => zlib.gzipSync(s, { level: 9 }).length;
    const vorher = zaehleTags(text);
    const nachher = zaehleTags(o1);
    const idsNachher = new Set(allEls(parse(o1)).map((e) => getA(e, 'id')).filter((v) => typeof v === 'string'));
    bericht.push({
      datei: relRepo(f),
      bytes: [Buffer.byteLength(text), Buffer.byteLength(o1)],
      gzip: [gz(text), gz(o1)],
      tags_vorher: vorher,
      tags_nachher: nachher,
      viewBox_erhalten: /viewBox=/.test(o1) === /viewBox=/.test(text),
      title_erhalten: /<title\b/.test(o1) === /<title\b/.test(text),
      role_erhalten: /role=/.test(o1) === /role=/.test(text),
      schutz_ids: schutz,
      schutz_fehlend: schutz.filter((i) => !idsNachher.has(i)),
      fixpunkt: o1 === o2,
    });
  }
  fs.writeFileSync(path.join(ziel, 'bericht.json'), JSON.stringify({ modus, erstellt: new Date().toISOString(), bericht }, null, 2));
  console.log(JSON.stringify({ modus, ziel: relRepo(ziel), bericht }, null, 2));
}

// ---------- Hauptlauf ----------
if (OPT) {
  const dateien = NUR ? eingabenNur(NUR).filter(istSvgDatei) : [];
  if (!dateien.length) { console.error('Optimierung braucht --nur <svg-datei|ordner>'); process.exit(2); }
  optimiereLauf(OPT, dateien);
  process.exit(0);
}

const t0 = Date.now();
const RAW = ensureDir(path.join(RELAUNCH, 'cache', 'svg', SATZ));
const AUSGABE = ensureDir(arg('ausgabe') || path.join(RELAUNCH, 'belege', SATZ));
const units = [];
const dateien = { public: [], src: [], nur: [] };

if (NUR) {
  for (const f of eingabenNur(NUR)) {
    const text = fs.readFileSync(f, 'utf8');
    const us = f.endsWith('.svg') ? analyseDoc(text, 'nur', relRepo(f)) : analyseFragmente(text, 'nur', relRepo(f));
    units.push(...us);
    dateien.nur.push({ datei: relRepo(f), svg: us.length });
  }
} else {
  for (const f of walk(PUBLIC_DIR, /\.svg$/)) {
    const us = analyseDoc(fs.readFileSync(f, 'utf8'), 'public', relRepo(f));
    units.push(...us);
    dateien.public.push({ datei: relRepo(f), svg: us.length });
  }
  for (const f of walk(SRC_DIR, /\.(tsx|jsx)$/)) {
    const us = analyseFragmente(fs.readFileSync(f, 'utf8'), 'src', relRepo(f));
    if (us.length) { units.push(...us); dateien.src.push({ datei: relRepo(f), svg: us.length }); }
  }
}

const seiten = [];
let idSeiten = 0;
if (!NUR) {
  if (!fs.existsSync(BUILD)) { console.error(`Build-HTML fehlt: ${BUILD}`); process.exit(2); }
  for (const f of walk(BUILD, /\.html$/)) {
    const seite = (() => { const r = path.relative(BUILD, f).replace(/\.html$/, '').split(path.sep).join('/'); return r === 'index' ? '/' : '/' + r; })();
    if (SEITEN_FILTER && !SEITEN_FILTER.includes(seite)) continue;
    const { us, idDoppelt } = analysePage(fs.readFileSync(f, 'utf8'), seite);
    units.push(...us);
    if (idDoppelt) idSeiten++;
    const icons = us.filter((u) => u.art === 'icon');
    const familienSeite = [...new Set(icons.filter((u) => u.familie !== 'marke').map((u) => u.familie))];
    const befundeSeite = {};
    for (const u of us) for (const b of u.befunde) befundeSeite[b] = (befundeSeite[b] || 0) + 1;
    if (familienSeite.length > 1) befundeSeite[R.FAM] = 1;
    const fam = {};
    for (const u of us) fam[u.familie] = (fam[u.familie] || 0) + 1;
    seiten.push({
      seite, svg: us.length, muster: new Set(us.map((u) => u.hash)).size, familien: fam,
      icon_familien: familienSeite.length, familien_liste: familienSeite, id_doppelt: idDoppelt, befunde: befundeSeite,
    });
  }
}

// ---------- Aggregation ----------
const regeln = {};
for (const u of units) {
  for (const b of u.befunde) {
    const r = (regeln[b] ||= { instanzen: 0, muster: new Set(), orte: new Set(), beispiele: [] });
    r.instanzen++;
    r.muster.add(u.hash);
    r.orte.add(u.ort);
    if (r.beispiele.length < 3 && !r.beispiele.some((x) => x.hash === u.hash)) {
      r.beispiele.push({ ort: u.ort, art: u.art, familie: u.familie, hash: u.hash, kurz: u.kurz });
    }
  }
}
for (const seite of seiten) {
  if (seite.id_doppelt) {
    const r = (regeln[R.IDSEITE] ||= { instanzen: 0, muster: new Set(), orte: new Set(), beispiele: [] });
    r.instanzen += seite.id_doppelt;
    r.orte.add(seite.seite);
  }
  if (seite.befunde[R.FAM]) {
    const r = (regeln[R.FAM] ||= { instanzen: 0, muster: new Set(), orte: new Set(), beispiele: [] });
    r.instanzen++;
    r.orte.add(seite.seite);
  }
}
const regelnAus = Object.fromEntries(Object.entries(regeln).map(([k, r]) => [k, {
  instanzen: r.instanzen, muster: r.muster.size, orte: r.orte.size,
  beispiele: r.beispiele.map(({ hash, ...rest }) => rest),
}]));
for (const k of Object.values(R)) regelnAus[k] ??= { instanzen: 0, muster: 0, orte: 0, beispiele: [] };
// Seitenweise Zählung für die Icon-Familien-Regel (kein Muster)
regelnAus[R.FAM] && (regelnAus[R.FAM].einheit = 'Seiten');
if (regelnAus[R.ID]) regelnAus[R.ID].einheit = 'SVG-Instanzen mit doppelter ID (Quelle: Datei; Build: Seiten-DOM)';
if (regelnAus[R.IDSEITE]) regelnAus[R.IDSEITE].einheit = 'doppelte IDs je Seite (instanzen = Anzahl IDs)';

const familien = {};
for (const u of units) {
  const f = (familien[u.familie] ||= { instanzen: 0, arten: {}, strich: {} });
  f.instanzen++;
  f.arten[u.art] = (f.arten[u.art] || 0) + 1;
  if (u.marke) continue;
  for (const [k, c] of Object.entries(u.striche)) f.strich[k] = (f.strich[k] || 0) + c;
}

const ausgeliefert = units.filter((u) => u.quelle !== 'src' && !u.marke);
const icons = ausgeliefert.filter((u) => u.art === 'icon');
const ills = ausgeliefert.filter((u) => u.art === 'illustration' || u.art === 'unbekannt');
const budgets = {
  icon: {
    geprueft: icons.length,
    groesstes_roh_bytes: Math.max(0, ...icons.map((u) => u.bytes)),
    ueber_budget: icons.filter((u) => u.befunde.includes(R.BUD_ICON)).length,
  },
  illustration: {
    geprueft: ills.length,
    groesstes_gzip_bytes: Math.max(0, ...ills.map((u) => u.gz)),
    ueber_budget: ills.filter((u) => u.befunde.includes(R.BUD_ILL)).length,
  },
  marke_quelle: units.filter((u) => u.marke && u.quelle !== 'build').map((u) => ({ ort: u.ort, marke: u.marke, bytes: u.bytes, gzip: u.gz, pixel: u.pixel })),
  marke_build: (() => {
    const m = units.filter((u) => u.marke && u.quelle === 'build');
    return { instanzen: m.length, muster: new Set(m.map((u) => u.hash)).size, marken: [...new Set(m.map((u) => u.marke))] };
  })(),
};

const a11yZaehl = {};
const a11yGrund = {};
for (const u of units) {
  a11yZaehl[u.a11y] = (a11yZaehl[u.a11y] || 0) + 1;
  if (u.grund) a11yGrund[u.grund] = (a11yGrund[u.grund] || 0) + 1;
}

const familienJeSeite = {};
for (const s of seiten) familienJeSeite[s.icon_familien] = (familienJeSeite[s.icon_familien] || 0) + 1;

let head = 'unbekannt';
try { head = execFileSync('git', ['-C', REPO, 'rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim(); } catch {}

const erg = {
  satz: SATZ,
  base: BASE,
  bedingungen: {
    werkzeug: 'svg.mjs (P3-00b), Kern-Version 1.2',
    kern: 'K-010 (Formsystem), K-013 (Budgets), Z-10',
    messmodus: 'statisch, kein Browserlauf: keine Anfragen, daher ohne assertLocal/installSperre',
    quellen: {
      public: 'public/**/*.svg',
      src: 'src/**/*.{tsx,jsx}, nur Inline-<svg>-Blöcke (Datei-Ebene für IDs und Verweise)',
      build: NUR ? null : BUILD,
      nur: NUR,
    },
    src_stand: `git HEAD ${head} (Arbeitsbaum ohne Änderungen an src/ und public/)`,
    build_stand: 'Ausgangsstand 707a93d (reinraum-707a93d/.next/server/app), nur lesen',
    einheiten: { kilobyte: 1024, icon_budget_roh_bytes: BUDGET_ICON_ROH, illustration_budget_gzip_bytes: BUDGET_ILL_GZ, gzip: 'zlib, Level 9' },
    strichstaerke_soll: STRICH_SOLL,
    klassifikation: {
      familie: 'marke (Liste) · lucide (class enthält lucide) · phosphor (viewBox 0 0 256 256 oder class ph) · sonst eigene',
      art: 'marke (Liste) · icon (lucide/phosphor oder quadratische viewBox ≤ 256) · illustration (übrige mit viewBox) · unbekannt (ohne viewBox)',
      strichstaerke: 'je Geometrie-Element mit wirksamer Kontur, vererbt; ohne stroke-width = 1 (SVG-Standard)',
    },
    marken_liste: MARKEN_BESCHREIBUNG,
    a11y_regel: 'dekorativ = aria-hidden="true" am SVG oder an einem Vorfahren; bedeutungstragend = role="img" + aria-labelledby, alle Ziele in Datei bzw. Seite; sonst fehlt; Ausdruck in aria-labelledby = unbestimmt',
    id_regel: 'Quelle: Dopplung innerhalb der Datei (alle <svg>-Blöcke zusammen); Build: Dopplung im gesamten Seiten-DOM; url(#…) und href="#…" ohne Ziel gemeldet',
    grenzen: [
      'JSX-Ausdrücke (z. B. fill={c}, viewBox per Template) werden nur über Literale geprüft; nicht auswertbare Werte bleiben ungezählt',
      'Phosphor-Imports im Quellcode sind nicht im Markup sichtbar; Familie wird nur über Markup erkannt',
      'Build-Stand (707a93d) und Arbeitsbaum (HEAD) unterscheiden sich in 25 Dateien unter src/ und public/',
      'Marken-Erkennung über Liste; neue Marken brauchen einen Eintrag',
      'Budgets gelten für ausgelieferte Markups (public, Build); Quellblöcke aus src/ werden nur gezählt, nicht gegen das Budget geprüft (JSX-Text ist größer als das Ergebnis)',
      'Quelle wird als ganze Datei geparst; Parser ist ein Tokenizer ohne TypeScript-Parser (keine Abhängigkeit im Paket), Zählung gegen grep geprüft',
    ],
    laufzeit_s: Number(((Date.now() - t0) / 1000).toFixed(1)),
  },
  erstellt: new Date().toISOString(),
  zaehlung: {
    public: { dateien: dateien.public.length, svg: dateien.public.reduce((s, d) => s + d.svg, 0) },
    src: { dateien: dateien.src.length, svg: dateien.src.reduce((s, d) => s + d.svg, 0) },
    build: { seiten: seiten.length, svg_instanzen: seiten.reduce((s, p) => s + p.svg, 0), muster: new Set(units.filter((u) => u.quelle === 'build').map((u) => u.hash)).size, seiten_mit_id_kollision: idSeiten },
    nur: dateien.nur,
  },
  regeln: regelnAus,
  a11y: { zaehlung: a11yZaehl, gruende: a11yGrund },
  familien,
  budgets,
  familien_je_seite: familienJeSeite,
  seiten,
  dateien,
};

fs.writeFileSync(path.join(AUSGABE, 'svg.json'), JSON.stringify(erg, null, 2));
fs.writeFileSync(path.join(RAW, 'instanzen.json'), JSON.stringify(units.map(({ kurz, ...u }) => ({ ...u, kurz })), null, 1));

console.log(`svg.mjs · satz=${SATZ} · ${units.length} SVG-Einheiten · ${erg.bedingungen.laufzeit_s} s`);
console.log(`zaehlung ${JSON.stringify(erg.zaehlung)}`);
for (const [k, v] of Object.entries(regelnAus)) console.log(`  ${k}: Instanzen ${v.instanzen}, Muster ${v.muster}, Orte ${v.orte}`);
console.log(`familien ${JSON.stringify(Object.fromEntries(Object.entries(familien).map(([k, v]) => [k, v.instanzen])))}`);
console.log(`budgets icon ${JSON.stringify(budgets.icon)} · illustration ${JSON.stringify(budgets.illustration)}`);
console.log(`a11y ${JSON.stringify(a11yZaehl)} · familien je Seite ${JSON.stringify(familienJeSeite)}`);
console.log(`geschrieben: ${path.relative(REPO, path.join(AUSGABE, 'svg.json'))}`);
