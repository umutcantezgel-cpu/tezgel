// Werte-Prüfung (Z-03): findet Werte außerhalb des Designsystems in geänderten Dateien.
// Klassen werden über Tailwinds eigenes Designsystem aufgelöst (@tailwindcss/node, src/app/globals.css, base src/app).
// Nutzung: node werte.mjs [--basis <commit>] [--arbeitsbaum] [--dateien a.tsx,b.tsx] [--regeln werte-regeln.json] [--ziel <ordner>]
//   --basis        Vergleichsstand für git diff (Standard: HEAD)
//   --arbeitsbaum  zusätzlich neue, noch nicht versionierte Dateien
//   --dateien      feste Dateiliste (kommagetrennt, relativ zum Repo oder absolut) statt git diff
//   --regeln       Regeldatei (Standard: werte-regeln.json neben diesem Skript)
//   --ziel         Ausgabeordner (Standard: _werkstatt/cache/werte)
// Befunde: ohne_css · beliebig · farbe_ausserhalb · abstand_ausserhalb · groesse_ausserhalb · schrift_ausserhalb ·
//          radius_ausserhalb · dauer_ausserhalb · farbe_literal · style_wert · dauer_zahl
// Exit: 0 ohne Befund · 1 mit Befund · 2 Laufzeitfehler. Der Bericht steht als JSON im Ausgabeordner.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { REPO, RELAUNCH, WERKZEUGE, ensureDir, assertLocal } from './lib.mjs';

const require = createRequire(path.join(REPO, 'package.json'));
const ts = require('typescript');
const postcss = require('postcss');
const tw = require('@tailwindcss/node');

export const ARTEN = ['ohne_css', 'beliebig', 'farbe_ausserhalb', 'abstand_ausserhalb', 'groesse_ausserhalb', 'schrift_ausserhalb', 'radius_ausserhalb', 'dauer_ausserhalb', 'farbe_literal', 'style_wert', 'dauer_zahl'];

// Präfixe, unter denen ein Kandidat wie eine Utility aussieht (Befund ohne_css, wenn Tailwind kein CSS erzeugt).
const UTILITY_PRAEFIXE = ['bg', 'text', 'border', 'rounded', 'shadow', 'ring', 'outline', 'fill', 'stroke', 'from', 'via', 'to', 'decoration', 'accent', 'caret', 'placeholder', 'divide', 'p', 'px', 'py', 'pt', 'pr', 'pb', 'pl', 'ps', 'pe', 'm', 'mx', 'my', 'mt', 'mr', 'mb', 'ml', 'ms', 'me', 'gap', 'space', 'inset', 'top', 'right', 'bottom', 'left', 'translate', 'scroll', 'w', 'h', 'size', 'min', 'max', 'font', 'leading', 'tracking', 'duration', 'dauer', 'ease', 'opacity', 'z', 'grid', 'flex', 'col', 'row', 'items', 'justify', 'content', 'self', 'place', 'overflow', 'aspect', 'object', 'order', 'basis', 'cursor', 'select', 'transition', 'animate', 'blur', 'backdrop', 'eyebrow', 'glass', 'ambient', 'ceramic'];
const WORTE = ['eyebrow'];
const KLASSEN_FNS = new Set(['clsx', 'cn', 'twMerge']);
// Attribute, in denen Zeichenketten keine Farben sind (Anker, Kennungen, Namen).
const NICHT_FARBE_ATTR = new Set(['href', 'to', 'id', 'htmlFor', 'name', 'src', 'key', 'ref']);
// Eigenschaftsnamen mit Dauern (speed, timing u. ä. sind Faktoren oder Auswahlen und bleiben außen vor).
const DAUER_NAME_RE = /dauer|duration|delay|stagger|staffel|^ms$/i;
const HEX_RE = /(?<![&\w-])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})(?![\w-])/g;
const FUNK_RE = /(?<![\w-])(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(/g;
const VAR_FARBE_RE = /var\(\s*--color-([a-z0-9-]+)/g;
const MS_RE = /(?<![\w.])\d+(?:\.\d+)?ms\b/;
const SEK_RE = /(?<![\w.])\d+(?:\.\d+)?s\b/;
const BEWEGUNG_RE = /transition|animation|ease|linear|forwards|infinite|duration|delay|opacity|transform|translate|scale|rotate|all/;
const ZEIT_CSS_RE = /(?<![\w.])\d+(?:\.\d+)?m?s\b/;

const relPfad = (f) => path.relative(REPO, f).split(path.sep).join('/');
const treffer = (re, text) => { const m = re.exec(text); return m ? m[0] : null; };
const istText = (n) => ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n) || ts.isTemplateHead(n) || ts.isTemplateMiddle(n) || ts.isTemplateTail(n) || ts.isJsxText(n);
const zeileVon = (sf, knoten) => sf.getLineAndCharacterOfPosition(knoten.getStart(sf)).line + 1;

// Glob (nur ** * ?) in eine Regex umwandeln, für die Ausnahmen aus der Regeldatei.
export function globRegex(glob) {
  let re = '';
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === '*') {
      if (glob[i + 1] === '*') {
        if (glob[i + 2] === '/') { re += '(?:.*/)?'; i += 2; } else { re += '.*'; i += 1; }
      } else re += '[^/]*';
    } else if (c === '?') re += '[^/]';
    else re += c.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  }
  return new RegExp(`^${re}$`);
}

export function ladeRegeln(datei) {
  const r = JSON.parse(fs.readFileSync(datei, 'utf8'));
  for (const k of ['farben', 'abstaende', 'groessen', 'schrift', 'dauern', 'kurven', 'radien', 'ausnahmen']) {
    if (!(k in r)) throw new Error(`Regeldatei ${relPfad(datei)}: Schlüssel fehlt: ${k}`);
  }
  const nachLaenge = (liste) => [...liste].sort((a, b) => b.length - a.length);
  return {
    farben: new Set(r.farben),
    abstaende: new Set(r.abstaende.stufen),
    abstPraef: nachLaenge(r.abstaende.praefixe),
    groesseOk: new Set([...r.groessen.stufen, ...r.groessen.benannt]),
    grPraef: nachLaenge(r.groessen.praefixe),
    schrift: new Set(r.schrift),
    dauern: new Set(r.dauern),
    kurven: new Set(r.kurven),
    radien: new Set(r.radien),
    ausnahmenRe: r.ausnahmen.dateien.map(globRegex),
    svgDaten: new Set(r.ausnahmen.svg_pfaddaten || []),
    roh: r,
  };
}

// Klassenartiges Token: Varianten, Wichtigkeits-! und Beliebigwerte eingeschlossen; keine Code- oder Template-Reste.
// Enden mit - oder : sind Bruchstücke dynamischer Klassen ("text-" + groesse) und werden nicht bewertet.
export function istKandidat(t) {
  if (/[${};`]/.test(t) || /[-:]$/.test(t)) return false;
  if (/\[[^\]]*\]/.test(t)) return true;
  return /^!?-?[a-zA-Z@][a-zA-Z0-9_\-:/.%@()!]*$/.test(t);
}

// Grundklasse ohne Variante und Wichtigkeits-!; die letzte Variante steht rechts vom letzten Doppelpunkt.
export function basis(token) {
  const i = token.lastIndexOf(':');
  return (i > -1 ? token.slice(i + 1) : token).replace(/^!/, '').replace(/!$/, '');
}

const istUtilityArtig = (x) => WORTE.includes(x) || UTILITY_PRAEFIXE.some((p) => x.startsWith(`${p}-`));
const praefixTreffer = (x, praefixe) => {
  for (const p of praefixe) if (x.startsWith(`${p}-`)) return { praefix: p, wert: x.slice(p.length + 1) };
  return null;
};

function skriptArt(datei) {
  if (datei.endsWith('.tsx')) return ts.ScriptKind.TSX;
  if (datei.endsWith('.ts')) return ts.ScriptKind.TS;
  return ts.ScriptKind.JSX;
}

// Alle Zeichenketten eines Teilbaums mit Zeilennummer (Literale, Template-Teile, JSX-Text).
function zeichenketten(knoten, sf) {
  const liste = [];
  const besuche = (n) => {
    if (istText(n)) liste.push({ node: n, text: n.text, zeile: zeileVon(sf, n) });
    ts.forEachChild(n, besuche);
  };
  besuche(knoten);
  return liste;
}

function rufName(n) {
  const e = n.expression;
  if (ts.isIdentifier(e)) return e.text;
  if (ts.isPropertyAccessExpression(e)) return e.name.text;
  return '';
}

// Erste Zahl im Ausdruck; Indizes wie TABELLE[1] zählen nicht.
function findeZahl(knoten) {
  let fund = null;
  const b = (n) => {
    if (fund) return;
    if (ts.isNumericLiteral(n)) { fund = n; return; }
    if (ts.isElementAccessExpression(n)) { b(n.expression); return; }
    ts.forEachChild(n, b);
  };
  b(knoten);
  return fund;
}

// Schlüssel eines Objektliterals; berechnete Schlüssel nur, wenn sie eindeutig mit -- beginnen.
function schluessel(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  if (ts.isComputedPropertyName(name)) {
    const e = name.expression;
    if (ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e)) return e.text;
    if (ts.isTemplateExpression(e) && e.head.text.startsWith('--')) return '--…';
  }
  return undefined;
}

// style={{…}}: nur Schlüssel mit -- (CSS-Variablen) sind erlaubt; alles andere wird gemeldet.
function pruefeStil(init, sf, melde, out) {
  const objekte = [];
  const sammle = (e) => {
    if (!e) return;
    if (ts.isJsxExpression(e) || ts.isParenthesizedExpression(e)) return sammle(e.expression);
    if (ts.isConditionalExpression(e)) { sammle(e.whenTrue); sammle(e.whenFalse); return; }
    if (ts.isBinaryExpression(e) && e.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) return sammle(e.right);
    if (ts.isObjectLiteralExpression(e)) { objekte.push(e); return; }
    if ((ts.isIdentifier(e) && e.text === 'undefined') || e.kind === ts.SyntaxKind.NullKeyword || e.kind === ts.SyntaxKind.FalseKeyword) return;
    out.stilUnpruefbar += 1; // Variable oder Aufruf: nicht statisch prüfbar
  };
  sammle(init);
  for (const o of objekte) {
    for (const p of o.properties) {
      if (ts.isSpreadAssignment(p)) { out.stilUnpruefbar += 1; continue; }
      const key = schluessel(p.name);
      if (key === undefined) { out.stilUnpruefbar += 1; continue; }
      if (key.startsWith('--')) continue;
      melde('style_wert', `style.${key}`, zeileVon(sf, p), 'Inline-style nur zum Setzen von CSS-Variablen (--name)');
    }
  }
}

// Dauern als Zahl in Bewegungscode: Eigenschaften wie duration, delay, dauer, staffel (setTimeout wird nicht erfasst).
function pruefeDauerName(n, sf, melde) {
  const nm = n.name;
  if (!nm || !(ts.isIdentifier(nm) || ts.isStringLiteral(nm)) || !n.initializer) return;
  if (!DAUER_NAME_RE.test(nm.text)) return;
  const zahl = findeZahl(n.initializer);
  if (zahl) melde('dauer_zahl', `${nm.text}: ${zahl.text}`, zeileVon(sf, n), 'Dauer als Zahl; nur dauer-1 … dauer-5 und ease-Tokens');
}

// Literale und Zeitangaben in Zeichenketten (Klassenzeichenketten werden separat behandelt).
function pruefeText(n, attr, sf, R, melde) {
  const text = n.text;
  if (!text || (attr && R.svgDaten.has(attr))) return;
  const zeile = zeileVon(sf, n);
  if (!(NICHT_FARBE_ATTR.has(attr) || (attr && attr.startsWith('aria-')))) {
    for (const m of text.matchAll(HEX_RE)) melde('farbe_literal', m[0], zeile, 'Farbliteral im Quelltext; Farben nur über Theme-Tokens');
    for (const m of text.matchAll(FUNK_RE)) melde('farbe_literal', m[0], zeile, 'Farbfunktion im Quelltext; Farben nur über Theme-Tokens');
  }
  for (const m of text.matchAll(VAR_FARBE_RE)) {
    if (!R.farben.has(m[1])) melde('farbe_ausserhalb', `var(--color-${m[1]})`, zeile, `--color-${m[1]} nicht in farben`);
  }
  const z = treffer(MS_RE, text) || (SEK_RE.test(text) && BEWEGUNG_RE.test(text) ? treffer(SEK_RE, text) : null);
  if (z) melde('dauer_zahl', z, zeile, 'Zeitangabe im Quelltext; Dauern nur über dauer-* oder Tokens');
}

// Quelltext (TSX/JSX/TS/JS): Klassenkandidaten aus className, class, clsx, cn, twMerge; Literale; style; Dauern.
export function analysiereTs(datei, text, R, out) {
  const sf = ts.createSourceFile(datei, text, ts.ScriptTarget.Latest, true, skriptArt(datei));
  const rel = relPfad(datei);
  const melde = (art, kandidat, zeile, hinweis) => out.befunde.push({ datei: rel, zeile, art, kandidat, hinweis });
  // Eine Zeichenkette zählt nur einmal, auch wenn sie in cn(...) innerhalb von className liegt.
  const gesehen = new Set();
  const klassen = (z) => {
    if (gesehen.has(z.node)) return;
    gesehen.add(z.node);
    for (const t of z.text.split(/\s+/)) if (t && istKandidat(t)) out.kandidaten.push({ datei: rel, zeile: z.zeile, token: t });
  };
  const besuche = (n, kontext) => {
    let k = kontext;
    if (ts.isJsxAttribute(n)) {
      const name = n.name.getText(sf);
      if (name === 'className' || name === 'class') {
        if (n.initializer) for (const z of zeichenketten(n.initializer, sf)) klassen(z);
        k = { attr: name, klasse: true };
      } else {
        if (name === 'style' && n.initializer) pruefeStil(n.initializer, sf, melde, out);
        k = { attr: name, klasse: false };
      }
    } else if (ts.isCallExpression(n) && KLASSEN_FNS.has(rufName(n))) {
      for (const arg of n.arguments) for (const z of zeichenketten(arg, sf)) klassen(z);
      k = { attr: undefined, klasse: true };
    }
    if (!k.klasse) {
      if (ts.isPropertyAssignment(n) || ts.isVariableDeclaration(n)) pruefeDauerName(n, sf, melde);
      if (istText(n)) pruefeText(n, k.attr, sf, R, melde);
    }
    ts.forEachChild(n, (c) => besuche(c, k));
  };
  besuche(sf, { attr: undefined, klasse: false });
}

function innerhalbTokens(knoten) {
  for (let p = knoten.parent; p; p = p.parent) {
    if (p.type === 'atrule' && p.name === 'theme') return true;
    if (p.type === 'rule' && /(^|,)\s*:root\b/.test(p.selector)) return true;
  }
  return false;
}

// CSS-Quelle: @apply-Listen sind Klassenkandidaten; Literale und Zeitangaben außerhalb von @theme und :root.
export function analysiereCss(datei, text, R, out) {
  const root = postcss.parse(text, { from: datei });
  const rel = relPfad(datei);
  root.walkAtRules('apply', (at) => {
    const zeile = at.source?.start?.line ?? 0;
    for (const t of at.params.replace(/!important/g, '').split(/\s+/)) {
      if (t && istKandidat(t)) out.kandidaten.push({ datei: rel, zeile, token: t });
    }
  });
  const melde = (art, kandidat, zeile, hinweis) => out.befunde.push({ datei: rel, zeile, art, kandidat, hinweis });
  root.walkDecls((d) => {
    if (innerhalbTokens(d)) return; // Token-Definitionen (@theme, :root) sind die Quelle und dürfen Literale tragen
    const zeile = d.source?.start?.line ?? 0;
    for (const m of d.value.matchAll(HEX_RE)) melde('farbe_literal', m[0], zeile, 'Farbliteral außerhalb von @theme/:root');
    for (const m of d.value.matchAll(FUNK_RE)) melde('farbe_literal', m[0], zeile, 'Farbfunktion außerhalb von @theme/:root');
    for (const m of d.value.matchAll(VAR_FARBE_RE)) {
      if (!R.farben.has(m[1])) melde('farbe_ausserhalb', `var(--color-${m[1]})`, zeile, `--color-${m[1]} nicht in farben`);
    }
    if (/^(transition|animation)/i.test(d.prop)) {
      const z = treffer(ZEIT_CSS_RE, d.value);
      if (z) melde('dauer_zahl', z, zeile, 'Zeitangabe in Bewegungs-CSS; Dauern nur über Tokens');
    }
  });
}

// Designsystem laden und Kandidaten in einem Aufruf auflösen (je eindeutiger Klasse einmal).
export async function ladeDesignsystem() {
  const css = fs.readFileSync(path.join(REPO, 'src/app/globals.css'), 'utf8');
  return tw.__unstable__loadDesignSystem(css, { base: path.join(REPO, 'src/app') });
}

export function aufloesen(ds, basen) {
  const liste = [...basen];
  let css;
  try {
    css = ds.candidatesToCss(liste);
  } catch {
    css = liste.map((b) => { try { return ds.candidatesToCss([b])[0]; } catch { return null; } });
  }
  return new Map(liste.map((b, i) => [b, css[i] ?? null]));
}

// Fakten aus dem von Tailwind erzeugten CSS einer Klasse (@property-Register ausgenommen).
function fakten(css, farben) {
  const f = { farbvars: new Set(), roh: new Set(), schriftGroesse: false, schriftFamilie: false, radius: false };
  postcss.parse(css).walkDecls((d) => {
    if (d.parent && d.parent.type === 'atrule' && d.parent.name === 'property') return;
    const p = d.prop.toLowerCase();
    const v = d.value;
    const vars = [...v.matchAll(VAR_FARBE_RE)].map((m) => m[1]);
    for (const n of vars) f.farbvars.add(n);
    const roh = [...v.matchAll(HEX_RE), ...v.matchAll(FUNK_RE)].map((m) => m[0]);
    if (roh.length && !vars.some((n) => farben.has(n))) for (const r of roh) f.roh.add(r);
    if (p === 'font-size') f.schriftGroesse = true;
    if (p === 'font-family') f.schriftFamilie = true;
    if (p.includes('radius')) f.radius = true;
  });
  return f;
}

// Befunde einer aufgelösten Grundklasse (ohne Ort); je Klasse einmal berechnet.
export function befundeZuBase(base, css, R, klassenInCss) {
  const x = base.replace(/^-/, '');
  const out = [];
  if (css === null) {
    if (!klassenInCss.has(base) && istUtilityArtig(x)) out.push({ art: 'ohne_css', hinweis: 'erzeugt kein CSS: Klasse ist nicht im Designsystem' });
    return out;
  }
  const f = fakten(css, R.farben);
  for (const n of f.farbvars) if (!R.farben.has(n)) out.push({ art: 'farbe_ausserhalb', hinweis: `--color-${n} nicht in farben` });
  for (const r of f.roh) out.push({ art: 'farbe_ausserhalb', hinweis: `Roh-Farbwert ${r} im erzeugten CSS` });
  if ((f.schriftGroesse || f.schriftFamilie) && !R.schrift.has(x)) {
    out.push({ art: 'schrift_ausserhalb', hinweis: f.schriftGroesse ? 'Schriftgröße nicht in schrift (text-fs-1 … text-fs-7)' : 'Schriftfamilie nicht in schrift' });
  }
  if (f.radius && !R.radien.has(x)) out.push({ art: 'radius_ausserhalb', hinweis: 'Radius nicht in radien' });
  const ab = praefixTreffer(x, R.abstPraef);
  if (ab && /^\d+(\.\d+)?$/.test(ab.wert) && !R.abstaende.has(ab.wert)) {
    out.push({ art: 'abstand_ausserhalb', hinweis: `${ab.praefix}-${ab.wert}: Stufe nicht in abstaende` });
  }
  const gr = praefixTreffer(x, R.grPraef);
  if (gr && /^(\d+(\.\d+)?|\d+\/\d+|[a-z]+)$/.test(gr.wert) && !R.groesseOk.has(gr.wert)) {
    out.push({ art: 'groesse_ausserhalb', hinweis: `${gr.praefix}-${gr.wert}: nicht in groessen` });
  }
  const du = praefixTreffer(x, ['duration']);
  if (du && !R.dauern.has(du.wert)) out.push({ art: 'dauer_ausserhalb', hinweis: `duration-${du.wert} nicht in dauern` });
  if (x.startsWith('dauer-') && !R.dauern.has(x)) out.push({ art: 'dauer_ausserhalb', hinweis: `${x} nicht in dauern` });
  const ea = praefixTreffer(x, ['ease']);
  if (ea && !R.kurven.has(ea.wert)) out.push({ art: 'dauer_ausserhalb', hinweis: `ease-${ea.wert} nicht in kurven` });
  return out;
}

// Alle .css-Dateien unter src/ durchsuchen: Klassen mit eigenem Selektor gelten als definiert (keine Tailwind-Utilities).
function klassenInCss() {
  const namen = new Set();
  const rek = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) rek(p);
      else if (e.name.endsWith('.css')) {
        postcss.parse(fs.readFileSync(p, 'utf8'), { from: p }).walkRules((r) => {
          for (const m of r.selector.matchAll(/\.([a-zA-Z_][\w-]*)/g)) namen.add(m[1]);
        });
      }
    }
  };
  rek(path.join(REPO, 'src'));
  return namen;
}

export function parseArgs(args) {
  const o = { basis: 'HEAD', arbeitsbaum: false, dateien: null, regeln: null, ziel: null };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    const wert = () => { if (i + 1 >= args.length) throw new Error(`${a} braucht einen Wert`); return args[++i]; };
    if (a === '--basis') o.basis = wert();
    else if (a === '--arbeitsbaum') o.arbeitsbaum = true;
    else if (a === '--dateien') o.dateien = wert().split(',').map((s) => s.trim()).filter(Boolean);
    else if (a === '--regeln') o.regeln = wert();
    else if (a === '--ziel') o.ziel = wert();
    else throw new Error(`Unbekannte Option: ${a}`);
  }
  return o;
}

function git(args) {
  return execFileSync('git', ['-C', REPO, ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).split('\n').filter(Boolean);
}

function dateiMenge(opt, R) {
  let liste;
  if (opt.dateien) {
    liste = opt.dateien.map((d) => path.resolve(REPO, d));
    for (const f of liste) if (!fs.existsSync(f)) throw new Error(`Datei nicht gefunden: ${relPfad(f)}`);
  } else {
    const rel = git(['diff', '--name-only', opt.basis]);
    if (opt.arbeitsbaum) rel.push(...git(['ls-files', '--others', '--exclude-standard']));
    liste = [...new Set(rel)]
      .filter((f) => /^src\/.+\.(js|jsx|ts|tsx|css)$/.test(f))
      .map((f) => path.join(REPO, f))
      .filter((f) => fs.existsSync(f));
  }
  return liste.filter((f) => fs.statSync(f).isFile() && !R.ausnahmenRe.some((re) => re.test(relPfad(f))));
}

export async function main(argv) {
  const t0 = performance.now();
  assertLocal(); // Gemeinsame Regel aller Werkzeuge (G5); dieses Werkzeug nutzt keinen Browser und keine Adresse
  const opt = parseArgs(argv);
  const regelDatei = opt.regeln ? path.resolve(REPO, opt.regeln) : path.join(WERKZEUGE, 'werte-regeln.json');
  const R = ladeRegeln(regelDatei);
  const dateien = dateiMenge(opt, R);
  const zeit = new Date();
  if (!dateien.length) {
    console.log('werte: keine Dateien zu prüfen (nach Dateimenge und Ausnahmen)');
    return 0;
  }
  const ds = await ladeDesignsystem();
  const cssNamen = klassenInCss();
  const out = { kandidaten: [], befunde: [], stilUnpruefbar: 0 };
  const fehler = [];
  for (const d of dateien) {
    try {
      const text = fs.readFileSync(d, 'utf8');
      if (d.endsWith('.css')) analysiereCss(d, text, R, out);
      else analysiereTs(d, text, R, out);
    } catch (e) {
      fehler.push({ datei: relPfad(d), meldung: String(e.message).slice(0, 200) });
    }
  }
  // Klassen: Beliebigwerte direkt; alle übrigen je eindeutiger Grundklasse einmal auflösen und bewerten.
  // Beliebig ist nur der Wert (Teil nach der letzten Variante); Varianten wie aria-[current=page]: sind Selektoren.
  const wertTeil = (t) => { let tiefe = 0, start = 0; for (let i = 0; i < t.length; i++) { const c = t[i]; if (c === '[' || c === '(') tiefe++; else if (c === ']' || c === ')') tiefe--; else if (c === ':' && tiefe === 0) start = i + 1; } return t.slice(start); };
  const beliebigWert = (t) => /[[(]/.test(wertTeil(t));
  const basen = new Set(out.kandidaten.filter((k) => !beliebigWert(k.token)).map((k) => basis(k.token)));
  const aufgeloest = aufloesen(ds, [...basen]);
  const cache = new Map();
  for (const k of out.kandidaten) {
    if (beliebigWert(k.token)) {
      out.befunde.push({ datei: k.datei, zeile: k.zeile, art: 'beliebig', kandidat: k.token, hinweis: 'Beliebigwert: nur Tokens aus dem Theme verwenden' });
      continue;
    }
    const b = basis(k.token);
    if (!cache.has(b)) cache.set(b, befundeZuBase(b, aufgeloest.get(b), R, cssNamen));
    for (const x of cache.get(b)) out.befunde.push({ datei: k.datei, zeile: k.zeile, art: x.art, kandidat: k.token, hinweis: x.hinweis });
  }
  // Zeilenausnahmen aus den Regeln (ausnahmen.zeilen: [{datei, muster, grund}]) – Befund entfällt, wenn die Quellzeile das Muster enthält
  const zeilenAusnahmen = (R.roh?.ausnahmen?.zeilen || []);
  if (zeilenAusnahmen.length) {
    const quellzeilen = new Map();
    const zeileText = (datei, n) => {
      if (!quellzeilen.has(datei)) quellzeilen.set(datei, fs.readFileSync(path.join(REPO, datei), 'utf8').split('\n'));
      return quellzeilen.get(datei)[n - 1] || '';
    };
    out.befunde = out.befunde.filter((b) => !zeilenAusnahmen.some((a) => a.datei === b.datei && zeileText(b.datei, b.zeile).includes(a.muster)));
  }
  out.befunde.sort((a, b) => (a.datei < b.datei ? -1 : a.datei > b.datei ? 1 : a.zeile - b.zeile));
  const zusammenfassung = Object.fromEntries(ARTEN.map((a) => [a, out.befunde.filter((b) => b.art === a).length]));
  const bericht = {
    werkzeug: 'werte.mjs',
    zeitpunkt: zeit.toISOString(),
    basis: opt.dateien ? '--dateien' : opt.basis,
    arbeitsbaum: opt.arbeitsbaum,
    regeln: relPfad(regelDatei),
    dateien: dateien.map(relPfad),
    kandidaten_vorkommen: out.kandidaten.length,
    kandidaten_eindeutig: basen.size,
    stil_nicht_pruefbar: out.stilUnpruefbar,
    laufzeit_ms: Math.round(performance.now() - t0),
    zusammenfassung,
    befunde: out.befunde,
    fehler,
  };
  const ausgabeOrdner = ensureDir(opt.ziel ? path.resolve(REPO, opt.ziel) : path.join(RELAUNCH, 'cache', 'werte'));
  const datei = path.join(ausgabeOrdner, `${zeit.toISOString().replace(/[:.]/g, '-')}.json`);
  fs.writeFileSync(datei, JSON.stringify(bericht, null, 1));
  console.log(`werte: ${dateien.length} Dateien · ${out.kandidaten.length} Klassenvorkommen (${basen.size} eindeutig) · ${(bericht.laufzeit_ms / 1000).toFixed(1)} s`);
  for (const [a, n] of Object.entries(zusammenfassung)) if (n) console.log(`  ${a.padEnd(20)} ${n}`);
  console.log(`  ${'befunde gesamt'.padEnd(20)} ${out.befunde.length}`);
  if (fehler.length) console.log(`  Lesefehler: ${fehler.map((f) => f.datei).join(', ')}`);
  console.log(`Bericht: ${path.relative(REPO, datei).split(path.sep).join('/')}`);
  return fehler.length ? 2 : out.befunde.length ? 1 : 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main(process.argv.slice(2))
    .then((code) => { process.exitCode = code; })
    .catch((e) => { console.error(`ABBRUCH: ${e.message}`); process.exitCode = 2; });
}
