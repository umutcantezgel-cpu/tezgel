// literal.mjs – Text-Selbstprüfung auf Quelltext-Ebene (Paket P3-00e · Kern v1.2 · Kriterium Z-05, Z-06)
//
// Zweck
//   Zieht JSX-Text und String-Literale (auch Template-Literale, JSX-Attribute, JSON-Werte) per TypeScript-Parser aus
//   zwei Fassungen und meldet entfernte, geänderte und hinzugekommene Texte – in Sekunden, ohne Build. Für Paketbauer:
//   „Habe ich beim Umbau Text verloren oder verändert?“ Das Build-Werkzeug texte2.mjs bleibt die Instanz für das Tor.
//
// Nutzung
//   node literal.mjs <dateiA> <dateiB>                    zwei Dateien (Reihenfolge mit LCS ausgerichtet)
//   node literal.mjs --git <ref> [--pfade src]            alle gegenüber <ref> geänderten/neuen/gelöschten Dateien (Arbeitsbaum)
//   node literal.mjs --route <pfad> --git <ref>           je Route: Literale aller Dateien der Seite (Import-Kette) in <ref>
//                                                          gegen den Arbeitsbaum, als Mengenvergleich – Dateiwechsel zählen nicht
//   node literal.mjs --route <pfad> --wurzel-a <dir> [--wurzel-b <dir>]   je Route zwischen zwei Quellbäumen
//   Zusätze: --einstieg-a <datei> / --einstieg-b <datei> (Seitendatei vorgeben, z. B. ein Entwurf unter _entwurf/),
//            --ohne-layout (nur page.* und Importe, ohne layout.*/template.* der Ordnerkette), --alle (auch codeartige
//            Literale), --json <aus.json>, --liste (alle Literale ausgeben)
//   Exitcode: 0 = keine Abweichung, 1 = Abweichung gemeldet, 2 = Aufruf-/Lesefehler.
//
// Messbedingungen
//   Parser: typescript aus /home/user/tezgel/node_modules (nur lesen), ScriptKind nach Endung (.ts ohne JSX).
//   Ignoriert: className/class/style-Attribute samt Ausdruck, Argumente von cn/clsx/cx/twMerge/classNames/cva/tv,
//   Eigenschaften className/class, Importpfade (import/export from, import(), require()), Typ-Positionen,
//   Direktiven ('use client'), console.*-Argumente, Objektschlüssel. Standardmäßig auch „codeartige“ Literale ohne
//   Leerzeichen (Tailwind-Klassenlisten, Bezeichner wie 'submit' oder 'aria-expanded'); --alle zeigt sie.
//   Pfade/URLs/E-Mail-Adressen ('/bad', 'https://…', '#ziel', 'tel:…', 'info@…') bleiben drin (Z-06: Linkziele, N-18: Fragmente).
//   Normalisierung wie texte2: U+00AD/U+200B/U+2060/U+FEFF entfernt, U+00A0/U+2007/U+202F → Leerzeichen,
//   Leerraum zusammengefasst, JSX-Entitäten (&nbsp; &shy; &amp; …) aufgelöst; kein Groß/Klein-Angleich.
//   Zahlen-Literale werden nicht erfasst (Grenze: Preise/Jahreszahlen als Zahl prüft nur texte2 im Build).
//   Route: Seite = src/app/**/page.(tsx|ts|jsx|js) ohne (gruppe)/@slot-Segmente, private _ordner nur per --einstieg;
//   Import-Kette statisch über '@/…' (→ src/…) und relative Pfade inkl. import(); Pakete aus node_modules nicht.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { REPO } from './lib.mjs';

const require = createRequire(import.meta.url);
const ts = require(path.join(REPO, 'node_modules', 'typescript'));

const ARGV = process.argv.slice(2);
const arg = (k, d) => { const i = ARGV.indexOf(`--${k}`); return i > -1 && ARGV[i + 1] && !ARGV[i + 1].startsWith('--') ? ARGV[i + 1] : d; };
const hat = (k) => ARGV.includes(`--${k}`);
const ALLE = hat('alle');
const CODE_ENDUNGEN = ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.cjs', '.mts', '.cts'];
const KLASSEN_FUNKTIONEN = new Set(['cn', 'clsx', 'cx', 'twMerge', 'twJoin', 'classNames', 'classnames', 'cva', 'tv']);
const OHNE_ATTRIBUTE = new Set(['className', 'class', 'style', 'key']);
const ENTITAETEN = { nbsp: ' ', shy: '­', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", ndash: '–', mdash: '—', hellip: '…', bdquo: '„', ldquo: '“', rdquo: '”', laquo: '«', raquo: '»', middot: '·', euro: '€', copy: '©', reg: '®', sup2: '²', sup3: '³', times: '×', zwj: '‍', zwnj: '‌' };

const norm = (s) => String(s)
  .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+[0-9]*);/gi, (m, e) => e[0] === '#' ? String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)) : (ENTITAETEN[e] ?? m))
  .replace(/[­​⁠﻿]/g, '')
  .replace(/[   ]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();
const istPfad = (w) => /^(\/|#|https?:|mailto:|tel:|\.\.?\/)/.test(w) || /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(w); // Pfade, URLs, E-Mail-Adressen
// Tailwind-Klassenliste oder Bezeichner ohne Leerzeichen
const istKlassenliste = (w) => w.split(' ').every((t) => /^[!-]?[a-z0-9@[\]()/:._%#,'"=&>*+~-]+$/.test(t)) && w.split(' ').some((t) => /[-:[\]]/.test(t));
const istBezeichner = (w) => !/\s/.test(w) && !istPfad(w) && /^[a-zA-Z_$@][\w$.:@/*-]*$/.test(w) && !/^[A-ZÄÖÜ][a-zäöüß]+$/.test(w) && !/[äöüßÄÖÜ]/.test(w);
const codeartig = (w) => !istPfad(w) && (istKlassenliste(w) || istBezeichner(w));

function scriptKind(datei) {
  const e = path.extname(datei).toLowerCase();
  if (e === '.ts' || e === '.mts' || e === '.cts') return ts.ScriptKind.TS;
  if (e === '.tsx') return ts.ScriptKind.TSX;
  return ts.ScriptKind.JSX; // .js/.jsx/.mjs: JSX zulassen (Bestand nutzt JSX in .jsx)
}

/** Literale und Importe einer Datei. Rückgabe { literale: [{wert, art, zeile}], importe: [spezifizierer], ignoriert } */
export function analysiere(code, datei) {
  const literale = [];
  const importe = [];
  const ignoriert = { klasse: 0, codeartig: 0, direktive: 0, konsole: 0 };
  if (datei.endsWith('.json')) {
    let j;
    try { j = JSON.parse(code); } catch { return { literale, importe, ignoriert, fehler: 'JSON ungültig' }; }
    const lauf = (v, p) => {
      if (typeof v === 'string') { const w = norm(v); if (w) { if (!ALLE && codeartig(w)) ignoriert.codeartig++; else literale.push({ wert: w, art: 'json:' + p, zeile: 0 }); } }
      else if (Array.isArray(v)) v.forEach((x) => lauf(x, p));
      else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) lauf(x, k);
    };
    lauf(j, '');
    return { literale, importe, ignoriert };
  }
  const sf = ts.createSourceFile(datei, code, ts.ScriptTarget.Latest, true, scriptKind(datei));
  const zeile = (n) => sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1;
  const neu = (wert, art, n, kontextJsx) => {
    const w = norm(wert);
    if (!w) return;
    if (!ALLE && !kontextJsx && codeartig(w)) { ignoriert.codeartig++; return; }
    literale.push({ wert: w, art, zeile: zeile(n) });
  };
  const attrName = (n) => {
    // direkter oder in {…} geklammerter Wert eines JSX-Attributs
    let p = n.parent;
    while (p && (ts.isParenthesizedExpression(p) || ts.isConditionalExpression(p) || ts.isBinaryExpression(p) || ts.isJsxExpression(p) || ts.isAsExpression?.(p))) {
      if (ts.isJsxAttribute(p.parent)) return p.parent.name.getText(sf);
      p = p.parent;
    }
    if (p && ts.isJsxAttribute(p)) return p.name.getText(sf);
    return null;
  };
  const imJsxKind = (n) => {
    let p = n.parent;
    while (p && (ts.isParenthesizedExpression(p) || ts.isConditionalExpression(p) || ts.isBinaryExpression(p))) p = p.parent;
    return !!p && ts.isJsxExpression(p) && !!p.parent && (ts.isJsxElement(p.parent) || ts.isJsxFragment(p.parent));
  };
  const propName = (n) => {
    const p = n.parent;
    if (p && ts.isPropertyAssignment(p) && p.initializer === n) return p.name.getText(sf).replace(/^['"]|['"]$/g, '');
    return null;
  };
  const besuche = (n) => {
    // Typ-Positionen überspringen
    if (ts.isTypeNode(n) && !ts.isExpressionWithTypeArguments?.(n)) return;
    if (ts.isInterfaceDeclaration(n) || ts.isTypeAliasDeclaration(n)) return;
    // Importe / Re-Exporte
    if ((ts.isImportDeclaration(n) || ts.isExportDeclaration(n)) && n.moduleSpecifier && ts.isStringLiteral(n.moduleSpecifier)) {
      const nurTyp = ts.isImportDeclaration(n) ? !!n.importClause?.isTypeOnly : !!n.isTypeOnly;
      if (!nurTyp) importe.push(n.moduleSpecifier.text);
      if (ts.isExportDeclaration(n) && n.exportClause) ts.forEachChild(n.exportClause, besuche);
      return;
    }
    if (ts.isImportEqualsDeclaration(n)) return;
    if (ts.isCallExpression(n)) {
      const c = n.expression;
      if (c.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(c) && c.text === 'require')) {
        const a = n.arguments[0];
        if (a && (ts.isStringLiteral(a) || ts.isNoSubstitutionTemplateLiteral(a))) importe.push(a.text);
        return;
      }
      if (ts.isIdentifier(c) && KLASSEN_FUNKTIONEN.has(c.text)) { ignoriert.klasse++; return; }
      if (ts.isPropertyAccessExpression(c) && ts.isIdentifier(c.expression) && c.expression.text === 'console') { ignoriert.konsole++; return; }
    }
    if (ts.isJsxAttribute(n) && OHNE_ATTRIBUTE.has(n.name.getText(sf))) { ignoriert.klasse++; return; }
    if (ts.isPropertyAssignment(n)) {
      const k = n.name.getText(sf).replace(/^['"]|['"]$/g, '');
      if (k === 'className' || k === 'class') { ignoriert.klasse++; return; }
      besuche(n.initializer); // Schlüssel selbst nicht erfassen
      return;
    }
    if (ts.isExpressionStatement(n) && ts.isStringLiteral(n.expression) && ts.isSourceFile(n.parent)) { ignoriert.direktive++; return; }
    if (ts.isJsxText(n)) { neu(n.text, 'jsx', n, true); return; }
    if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) {
      const a = attrName(n);
      const jsx = imJsxKind(n);
      neu(n.text, a ? 'attr:' + a : jsx ? 'jsx' : (propName(n) ? 'prop:' + propName(n) : 'string'), n, !!a || jsx);
      return;
    }
    if (ts.isTemplateExpression(n)) {
      const teile = [n.head.text, ...n.templateSpans.map((s) => '${…}' + s.literal.text)].join('');
      const a = attrName(n);
      const jsx = imJsxKind(n);
      if (norm(teile.replace(/\$\{…\}/g, ''))) neu(teile, a ? 'attr:' + a : jsx ? 'jsx' : 'template', n, !!a || jsx);
      for (const s of n.templateSpans) besuche(s.expression);
      return;
    }
    ts.forEachChild(n, besuche);
  };
  besuche(sf);
  return { literale, importe, ignoriert };
}

// ---------------------------------------------------------------------------------------------------------------
// Quellen: Dateisystem-Wurzel oder Git-Stand
function quelleDateisystem(wurzel) {
  wurzel = path.resolve(wurzel);
  return {
    name: wurzel,
    lies: (rel) => { try { return fs.readFileSync(path.join(wurzel, rel), 'utf8'); } catch { return null; } },
    gibt: (rel) => { try { return fs.statSync(path.join(wurzel, rel)).isFile(); } catch { return false; } },
    dateien: (unter) => {
      const out = [];
      const lauf = (d) => { let es; try { es = fs.readdirSync(path.join(wurzel, d), { withFileTypes: true }); } catch { return; } for (const e of es) { if (e.name === 'node_modules' || e.name === '.next') continue; const r = path.posix.join(d, e.name); if (e.isDirectory()) lauf(r); else out.push(r); } };
      lauf(unter);
      return out;
    },
  };
}
function git(args) { return execFileSync('git', ['-C', REPO, ...args], { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }); }
function quelleGit(ref) {
  const liste = new Set(git(['ls-tree', '-r', '--name-only', ref]).split('\n').filter(Boolean));
  const cache = new Map();
  return {
    name: `git:${ref}`,
    lies: (rel) => { if (!liste.has(rel)) return null; if (!cache.has(rel)) cache.set(rel, git(['show', `${ref}:${rel}`])); return cache.get(rel); },
    gibt: (rel) => liste.has(rel),
    dateien: (unter) => [...liste].filter((f) => f.startsWith(unter + '/')),
  };
}

// Route → Seitendatei (+ Layouts der Ordnerkette)
function routeVon(relPage) {
  const segs = relPage.replace(/^src\/app\/?/, '').split('/').slice(0, -1);
  if (segs.some((s) => s.startsWith('_'))) return null; // private Ordner sind nicht geroutet
  return '/' + segs.filter((s) => !/^\(.*\)$/.test(s) && !s.startsWith('@')).join('/');
}
function passt(muster, route) {
  const m = muster.split('/').filter(Boolean), r = route.split('/').filter(Boolean);
  let punkte = 0;
  for (let i = 0; i < m.length; i++) {
    const s = m[i];
    if (/^\[\[\.\.\..+\]\]$/.test(s)) return { ok: true, punkte };
    if (/^\[\.\.\..+\]$/.test(s)) return { ok: r.length > i, punkte };
    if (i >= r.length) return { ok: false };
    if (/^\[.+\]$/.test(s)) continue;
    if (s !== decodeURIComponent(r[i])) return { ok: false };
    punkte++;
  }
  return { ok: m.length === r.length, punkte };
}
function findeSeite(q, route) {
  const seiten = q.dateien('src/app').filter((f) => /\/page\.(tsx|ts|jsx|js)$/.test(f));
  let best = null;
  for (const f of seiten) {
    const muster = routeVon(f);
    if (muster === null) continue;
    const p = passt(muster, route.replace(/\/+$/, '') || '/');
    if (p.ok && (!best || p.punkte > best.punkte)) best = { datei: f, punkte: p.punkte, muster };
  }
  return best;
}
function layoutsZu(q, seite) {
  const teile = seite.split('/').slice(0, -1);
  const out = [];
  for (let i = 2; i <= teile.length; i++) {
    const d = teile.slice(0, i).join('/');
    for (const n of ['layout', 'template']) for (const e of ['tsx', 'ts', 'jsx', 'js']) if (q.gibt(`${d}/${n}.${e}`)) out.push(`${d}/${n}.${e}`);
  }
  return out;
}
function loese(q, von, spez) {
  let basis;
  if (spez.startsWith('@/')) basis = path.posix.join('src', spez.slice(2));
  else if (spez.startsWith('./') || spez.startsWith('../')) basis = path.posix.normalize(path.posix.join(path.posix.dirname(von), spez));
  else return null;
  const kand = [basis, ...CODE_ENDUNGEN.map((e) => basis + e), basis + '.json', ...CODE_ENDUNGEN.map((e) => `${basis}/index${e}`)];
  for (const k of kand) if (q.gibt(k) && (CODE_ENDUNGEN.includes(path.extname(k)) || k.endsWith('.json'))) return k;
  return null;
}
function importKette(q, einstiege) {
  const gesehen = new Map();
  const offen = [...einstiege];
  const unaufloesbar = [];
  while (offen.length) {
    const f = offen.shift();
    if (gesehen.has(f)) continue;
    const code = q.lies(f);
    if (code === null) { unaufloesbar.push(f); continue; }
    const a = analysiere(code, f);
    gesehen.set(f, a);
    for (const s of a.importe) {
      const r = loese(q, f, s);
      if (r) { if (!gesehen.has(r)) offen.push(r); } else if (s.startsWith('@/') || s.startsWith('.')) { if (!/\.(css|scss|svg|png|jpe?g|webp|avif|gif|woff2?|mp4)$/i.test(s)) unaufloesbar.push(`${f} → ${s}`); }
    }
  }
  return { dateien: gesehen, unaufloesbar };
}

// ---------------------------------------------------------------------------------------------------------------
// Vergleiche
function lcs(a, b) {
  const n = a.length, m = b.length;
  const W = m + 1;
  if (n * m > 25e6) { // Notfall: gieriger Abgleich
    const paare = []; let j0 = 0;
    for (let i = 0; i < n; i++) { const j = b.indexOf(a[i], j0); if (j > -1) { paare.push([i, j]); j0 = j + 1; } }
    return paare;
  }
  const T = new Uint32Array((n + 1) * W);
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) T[i * W + j] = a[i] === b[j] ? T[(i + 1) * W + j + 1] + 1 : Math.max(T[(i + 1) * W + j], T[i * W + j + 1]);
  const paare = []; let i = 0, j = 0;
  while (i < n && j < m) { if (a[i] === b[j]) { paare.push([i, j]); i++; j++; } else if (T[(i + 1) * W + j] >= T[i * W + j + 1]) i++; else j++; }
  return paare;
}
const bigramme = (s) => { const m = new Map(); const t = s.toLowerCase(); for (let i = 0; i < t.length - 1; i++) { const g = t.slice(i, i + 2); m.set(g, (m.get(g) || 0) + 1); } return m; };
function aehnlich(a, b) {
  if (a === b) return 1;
  const A = bigramme(a), B = bigramme(b);
  let s = 0, na = 0, nb = 0;
  for (const v of A.values()) na += v;
  for (const v of B.values()) nb += v;
  for (const [g, v] of A) s += Math.min(v, B.get(g) || 0);
  return na + nb ? (2 * s) / (na + nb) : 0;
}
/** Folgenvergleich (eine Datei): LCS, Lücken → geändert/entfernt/hinzu, Gleiches anderswo → verschoben */
function vergleicheFolge(A, B) {
  const paare = lcs(A.map((x) => x.wert), B.map((x) => x.wert));
  const freiA = new Set(A.keys()), freiB = new Set(B.keys());
  for (const [i, j] of paare) { freiA.delete(i); freiB.delete(j); }
  const ergebnis = { entfernt: [], geaendert: [], hinzu: [], verschoben: [] };
  // verschoben
  const posB = new Map();
  for (const j of freiB) { if (!posB.has(B[j].wert)) posB.set(B[j].wert, []); posB.get(B[j].wert).push(j); }
  for (const i of [...freiA]) { const l = posB.get(A[i].wert); if (l && l.length) { const j = l.shift(); freiA.delete(i); freiB.delete(j); ergebnis.verschoben.push({ wert: A[i].wert, zeile_a: A[i].zeile, zeile_b: B[j].zeile }); } }
  // Lücken paaren
  const luecken = [];
  let pi = 0, pj = 0;
  for (const [i, j] of [...paare, [A.length, B.length]]) { luecken.push([[...range(pi, i)].filter((x) => freiA.has(x)), [...range(pj, j)].filter((x) => freiB.has(x))]); pi = i + 1; pj = j + 1; }
  for (const [la, lb] of luecken) {
    const rest = [...lb];
    for (const i of la) {
      let best = -1, bs = 0;
      rest.forEach((j, k) => { const s = aehnlich(A[i].wert, B[j].wert); if (s > bs) { bs = s; best = k; } });
      if (best > -1 && (bs >= 0.4 || (la.length === 1 && rest.length === 1))) {
        const j = rest.splice(best, 1)[0];
        freiA.delete(i); freiB.delete(j);
        ergebnis.geaendert.push({ alt: A[i].wert, neu: B[j].wert, art: A[i].art, zeile_a: A[i].zeile, zeile_b: B[j].zeile, aehnlichkeit: Math.round(bs * 100) / 100 });
      }
    }
  }
  for (const i of [...freiA].sort((x, y) => x - y)) ergebnis.entfernt.push({ wert: A[i].wert, art: A[i].art, zeile: A[i].zeile });
  for (const j of [...freiB].sort((x, y) => x - y)) ergebnis.hinzu.push({ wert: B[j].wert, art: B[j].art, zeile: B[j].zeile });
  return ergebnis;
}
function* range(a, b) { for (let x = a; x < b; x++) yield x; }
/** Mengenvergleich (Route): Dateiwechsel zählt nicht; ähnliche Paare → geändert */
function vergleicheMenge(A, B) {
  const zaehle = (L) => { const m = new Map(); for (const x of L) { if (!m.has(x.wert)) m.set(x.wert, []); m.get(x.wert).push(x); } return m; };
  const MA = zaehle(A), MB = zaehle(B);
  const weg = [], neu = [], gewechselt = [];
  for (const [w, la] of MA) {
    const lb = MB.get(w) || [];
    for (let k = lb.length; k < la.length; k++) weg.push(la[k]);
    const da = new Set(la.map((x) => x.datei)), db = new Set(lb.map((x) => x.datei));
    if (lb.length && [...da].sort().join() !== [...db].sort().join()) gewechselt.push({ wert: w, von: [...da], nach: [...db] });
  }
  for (const [w, lb] of MB) { const la = MA.get(w) || []; for (let k = la.length; k < lb.length; k++) neu.push(lb[k]); }
  const ergebnis = { entfernt: [], geaendert: [], hinzu: [], dateiwechsel: gewechselt };
  const rest = [...neu];
  for (const a of weg) {
    let best = -1, bs = 0;
    rest.forEach((b, k) => { const s = aehnlich(a.wert, b.wert); if (s > bs) { bs = s; best = k; } });
    if (best > -1 && bs >= 0.6) { const b = rest.splice(best, 1)[0]; ergebnis.geaendert.push({ alt: a.wert, neu: b.wert, datei_a: `${a.datei}:${a.zeile}`, datei_b: `${b.datei}:${b.zeile}`, aehnlichkeit: Math.round(bs * 100) / 100 }); }
    else ergebnis.entfernt.push({ wert: a.wert, art: a.art, datei: `${a.datei}:${a.zeile}` });
  }
  for (const b of rest) ergebnis.hinzu.push({ wert: b.wert, art: b.art, datei: `${b.datei}:${b.zeile}` });
  return ergebnis;
}

// ---------------------------------------------------------------------------------------------------------------
const kurz = (s, n = 90) => (s.length > n ? s.slice(0, n - 1) + '…' : s);
function druckeDatei(name, e) {
  const n = e.entfernt.length + e.geaendert.length + e.hinzu.length;
  if (!n) return 0;
  console.log(`\n${name}: ${e.entfernt.length} entfernt · ${e.geaendert.length} geändert · ${e.hinzu.length} hinzu${e.verschoben?.length ? ` · ${e.verschoben.length} verschoben` : ''}`);
  for (const x of e.entfernt) console.log(`  - ${x.zeile ?? x.datei ?? ''} [${x.art}] „${kurz(x.wert)}“`);
  for (const x of e.geaendert) console.log(`  ~ ${x.zeile_a ?? x.datei_a}→${x.zeile_b ?? x.datei_b} „${kurz(x.alt, 60)}“ → „${kurz(x.neu, 60)}“`);
  for (const x of e.hinzu) console.log(`  + ${x.zeile ?? x.datei ?? ''} [${x.art}] „${kurz(x.wert)}“`);
  return n;
}
function lesePfad(p) { try { return fs.readFileSync(path.resolve(p), 'utf8'); } catch (e) { console.error(`Kann ${p} nicht lesen: ${e.message}`); process.exit(2); } }
function schreibeJson(obj) {
  const z = arg('json');
  if (!z) return;
  fs.mkdirSync(path.dirname(path.resolve(z)), { recursive: true });
  fs.writeFileSync(path.resolve(z), JSON.stringify({ satz: 'literal', base: null, bedingungen: { parser: `typescript ${ts.version}`, alle: ALLE }, erstellt: new Date().toISOString(), ...obj }, null, 1));
}

function hauptDateien(a, b) {
  const A = analysiere(lesePfad(a), a), B = analysiere(lesePfad(b), b);
  const e = vergleicheFolge(A.literale, B.literale);
  if (hat('liste')) { console.log('A:', A.literale); console.log('B:', B.literale); }
  const n = druckeDatei(`${a} → ${b}`, e);
  console.log(JSON.stringify({ literale_a: A.literale.length, literale_b: B.literale.length, entfernt: e.entfernt.length, geaendert: e.geaendert.length, hinzu: e.hinzu.length, verschoben: e.verschoben.length, ignoriert_a: A.ignoriert, ergebnis: n ? 'ABWEICHUNG' : 'GLEICH' }));
  schreibeJson({ a, b, ...e });
  process.exit(n ? 1 : 0);
}
function hauptGit(ref) {
  const pfade = (arg('pfade', 'src')).split(',');
  const geaendert = git(['diff', '--name-only', ref, '--', ...pfade]).split('\n').filter(Boolean);
  const neu = git(['ls-files', '--others', '--exclude-standard', '--', ...pfade]).split('\n').filter(Boolean);
  const dateien = [...new Set([...geaendert, ...neu])].filter((f) => CODE_ENDUNGEN.includes(path.extname(f)) || f.endsWith('.json')).sort();
  const q = quelleGit(ref);
  let summe = 0;
  const bericht = {};
  for (const f of dateien) {
    const alt = q.lies(f);
    const neuCode = (() => { try { return fs.readFileSync(path.join(REPO, f), 'utf8'); } catch { return null; } })();
    const A = alt === null ? [] : analysiere(alt, f).literale;
    const B = neuCode === null ? [] : analysiere(neuCode, f).literale;
    const e = vergleicheFolge(A, B);
    bericht[f] = e;
    summe += druckeDatei(`${f}${alt === null ? ' (neu)' : ''}${neuCode === null ? ' (gelöscht)' : ''}`, e);
  }
  console.log(JSON.stringify({ ref, dateien: dateien.length, abweichungen: summe, ergebnis: summe ? 'ABWEICHUNG' : 'GLEICH' }));
  schreibeJson({ ref, dateien: bericht });
  process.exit(summe ? 1 : 0);
}
function hauptRoute(route) {
  const qa = arg('git') ? quelleGit(arg('git')) : arg('wurzel-a') ? quelleDateisystem(arg('wurzel-a')) : null;
  const qb = arg('wurzel-b') ? quelleDateisystem(arg('wurzel-b')) : quelleDateisystem(REPO);
  if (!qa) { console.error('--route braucht --git <ref> oder --wurzel-a <dir>'); process.exit(2); }
  const seite = (q, eigen) => {
    if (eigen) return { datei: eigen.replace(/^\.\//, ''), muster: '(vorgegeben)' };
    return findeSeite(q, route);
  };
  const sa = seite(qa, arg('einstieg-a')), sb = seite(qb, arg('einstieg-b'));
  if (!sa || !sb) { console.error(`Seite zu ${route} nicht gefunden: A=${sa?.datei ?? '–'} B=${sb?.datei ?? '–'}`); process.exit(2); }
  const einstieg = (q, s) => hat('ohne-layout') ? [s.datei] : [...layoutsZu(q, s.datei), s.datei];
  const ka = importKette(qa, einstieg(qa, sa)), kb = importKette(qb, einstieg(qb, sb));
  const sammle = (k) => [...k.dateien].flatMap(([f, a]) => a.literale.map((x) => ({ ...x, datei: f })));
  const A = sammle(ka), B = sammle(kb);
  const e = vergleicheMenge(A, B);
  if (hat('liste')) for (const x of B) console.log(`${x.datei}:${x.zeile} [${x.art}] ${x.wert}`);
  const n = druckeDatei(`Route ${route} (${qa.name} → ${qb.name})`, e);
  const info = {
    route, a: { quelle: qa.name, seite: sa.datei, dateien: ka.dateien.size, literale: A.length, unaufloesbar: ka.unaufloesbar.length },
    b: { quelle: qb.name, seite: sb.datei, dateien: kb.dateien.size, literale: B.length, unaufloesbar: kb.unaufloesbar.length },
    entfernt: e.entfernt.length, geaendert: e.geaendert.length, hinzu: e.hinzu.length, dateiwechsel: e.dateiwechsel.length, ergebnis: n ? 'ABWEICHUNG' : 'GLEICH',
  };
  if (ka.unaufloesbar.length || kb.unaufloesbar.length) console.log('Unauflösbar:', [...ka.unaufloesbar, ...kb.unaufloesbar].slice(0, 10).join(' | '));
  console.log(JSON.stringify(info));
  schreibeJson({ ...info, dateien_a: [...ka.dateien.keys()], dateien_b: [...kb.dateien.keys()], ...e });
  process.exit(n ? 1 : 0);
}

const frei = ARGV.filter((x, i) => !x.startsWith('--') && !(i > 0 && ARGV[i - 1].startsWith('--') && !['--alle', '--liste', '--ohne-layout'].includes(ARGV[i - 1])));
if (arg('route')) hauptRoute(arg('route'));
else if (arg('git')) hauptGit(arg('git'));
else if (frei.length === 2) hauptDateien(frei[0], frei[1]);
else { console.error('Nutzung: node literal.mjs <dateiA> <dateiB> | --git <ref> | --route <pfad> (--git <ref> | --wurzel-a <dir> [--wurzel-b <dir>])'); process.exit(2); }
