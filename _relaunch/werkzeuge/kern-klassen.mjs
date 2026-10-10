// Ebene 8 (statisch): Klassen-Abdeckung der Kern-Seiten (N-19, Bauregel 2).
// Prüft je Kern-Seite eines Builds: hat jede im Server-HTML verwendete CSS-Klasse eine Regel in dem CSS,
// das diese Seite selbst lädt? Fehlende Klassen = ungestaltete Stellen (z. B. ein Bestandsbaustein in einer
// Kern-Seite, den kern-global.css nicht scannt). Kriterien Z-07, Z-13.
//
// Nutzung:
//   node kern-klassen.mjs --build <pfad-zu-.next> [--seiten /kern-probe,/kern-probe/a] [--satz <name>]
//   node kern-klassen.mjs --build <pfad-zu-.next> --html <datei>
//       Einzeldatei; ihre <link rel="stylesheet">-Verweise werden gegen <build>/static aufgelöst.
//
// Messbedingungen (stehen im Ergebnis unter "bedingungen"):
//   - Kein Browserlauf, kein Server, kein Netz: nur Lesen von <build>/server/app und <build>/static.
//     Daher kein assertLocal/installSperre nötig (G5 betrifft Browserläufe).
//   - Klassen: class-Attribute des Server-HTML; <script>, <style> und Kommentare ausgenommen.
//   - Regeln: Klassen-Selektoren aus den verlinkten CSS-Dateien (/_next/static/...) und aus Inline-<style>.
//     Kommentare und Strings übersprungen, @-Blöcke und Verschachtelung einbezogen, Tailwind-Escapes
//     entmaskiert (\[0\.31em\] -> [0.31em]). Jedes .klasse-Vorkommen im Selektor zählt, auch in :is()/:not().
//   - Ausnahmen: Zustandsmarker ohne eigene Regel (k-bewegung, k-bereit) werden ausgewiesen, nicht gemeldet.
//   - Kern-Seiten: Schlüssel mit Segment (kern) in server/app-paths-manifest.json bzw. app-path-routes-manifest.json.
//     Dynamische Segmente: [x] = eine Ebene, [...x] = mehrere. Nicht vorgerenderte Routen stehen in nicht_geprueft.
//
// Ausgabe: JSON auf stdout. Mit --satz zusätzlich _relaunch/belege/<satz>/kern-klassen.json.
// Exit: 0 keine fehlenden Klassen · 1 mindestens eine Kern-Seite mit fehlenden Klassen · 2 Abbruch (Aufruf, Build, Seite).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { RELAUNCH, ensureDir } from './lib.mjs';

export const ZUSTANDSMARKER = new Set(['k-bewegung', 'k-bereit']);
const STATIC_PRAEFIX = '/_next/static/';

// Klassen-Selektor: "." gefolgt von einem CSS-Bezeichner mit Escapes (Tailwind maskiert Sonderzeichen).
const KLASSE_RE = /\.((?:-?(?:[A-Za-z_\u00a0-\uffff]|\\[0-9a-fA-F]{1,6}[ \t\n\r\f]?|\\[^\n\r\f0-9a-fA-F]))(?:[A-Za-z0-9_\u00a0-\uffff-]|\\[0-9a-fA-F]{1,6}[ \t\n\r\f]?|\\[^\n\r\f0-9a-fA-F])*)/g;

function fehler(msg) {
  console.error(`ABBRUCH: ${msg}`);
  process.exit(2);
}

// CSS-Escapes auflösen: \[ -> [, \31 0 -> 10, \/ -> /
export function entmaskiere(s) {
  return s.replace(/\\([0-9a-fA-F]{1,6})[ \t\n\r\f]?|\\([\s\S])/g, (m, hex, ch) => {
    if (hex === undefined) return ch;
    const cp = parseInt(hex, 16);
    return cp > 0 && cp <= 0x10ffff ? String.fromCodePoint(cp) : '\ufffd';
  });
}

// Index hinter dem schließenden Anführungszeichen eines Strings, der bei i beginnt.
const endeString = (s, i) => {
  const q = s[i];
  let j = i + 1;
  while (j < s.length && s[j] !== q) j += s[j] === '\\' ? 2 : 1;
  return Math.min(j + 1, s.length);
};

// Kommentare durch Leerraum ersetzen (Strings und Escapes bleiben unberührt).
function ohneKommentare(css) {
  let out = '';
  for (let i = 0; i < css.length;) {
    const c = css[i];
    if (c === '/' && css[i + 1] === '*') {
      const e = css.indexOf('*/', i + 2);
      i = e < 0 ? css.length : e + 2;
      out += ' ';
    } else if (c === '"' || c === "'") {
      const e = endeString(css, i);
      out += css.slice(i, e);
      i = e;
    } else if (c === '\\') {
      out += css.slice(i, i + 2);
      i += 2;
    } else {
      out += c;
      i++;
    }
  }
  return out;
}

// Klassen aus einer Selektorliste; Strings und Attributwerte [..] vorher ausblenden.
function selektorKlassen(vorspann) {
  const bereinigt = vorspann
    .replace(/"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'/g, '""')
    .replace(/\[(?:\\[\s\S]|[^\]\\])*\]/g, '[]');
  return [...bereinigt.matchAll(KLASSE_RE)].map((m) => entmaskiere(m[1]));
}

// Alle Klassen-Selektoren eines CSS-Textes. Ein Vorspann zählt, wenn er vor "{" steht und nicht mit "@" beginnt.
export function cssKlassen(roh) {
  const css = ohneKommentare(roh);
  const out = new Set();
  let start = 0;
  let klammer = 0;
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (c === '"' || c === "'") { i = endeString(css, i) - 1; continue; }
    if (c === '\\') { i++; continue; }
    if (c === '(') { klammer++; continue; }
    if (c === ')') { klammer = Math.max(0, klammer - 1); continue; }
    if (klammer > 0) continue;
    if (c === '{') {
      const vorspann = css.slice(start, i).trim();
      if (vorspann && vorspann[0] !== '@') for (const k of selektorKlassen(vorspann)) out.add(k);
      start = i + 1;
    } else if (c === '}' || c === ';') {
      start = i + 1;
    }
  }
  return out;
}

const ENT = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' };
const entitaeten = (s) => s.replace(/&(?:#x([0-9a-fA-F]+)|#(\d+)|(amp|quot|apos|lt|gt));/g,
  (m, hx, dz, nm) => (hx ? String.fromCodePoint(parseInt(hx, 16)) : dz ? String.fromCodePoint(parseInt(dz, 10)) : ENT[nm]));

// Kommentare und Skripte entfernen: deren Inhalt ist kein Markup dieser Seite.
function htmlBereinigt(html) {
  return html.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<script\b[\s\S]*?<\/script\s*>/gi, ' ');
}

// class-Werte des Server-HTML -> Map Klasse -> Vorkommen.
export function htmlKlassen(html) {
  const out = new Map();
  const ohneStyle = htmlBereinigt(html).replace(/<style\b[\s\S]*?<\/style\s*>/gi, ' ');
  for (const tag of ohneStyle.matchAll(/<[a-zA-Z][^>]*>/g)) {
    for (const a of tag[0].matchAll(/\sclass\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
      for (const k of entitaeten(a[1] ?? a[2]).split(/\s+/)) {
        if (k) out.set(k, (out.get(k) ?? 0) + 1);
      }
    }
  }
  return out;
}

function attribute(tag) {
  const out = {};
  for (const m of tag.matchAll(/([a-zA-Z_:][-\w:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
    out[m[1].toLowerCase()] = entitaeten(m[2] ?? m[3]);
  }
  return out;
}

// Verlinkte Stylesheets (href) und Inline-<style>-Inhalte einer Seite.
export function htmlCssQuellen(html) {
  const bereinigt = htmlBereinigt(html);
  const links = [];
  for (const tag of bereinigt.matchAll(/<link\b[^>]*>/gi)) {
    const a = attribute(tag[0]);
    if ((a.rel ?? '').toLowerCase().split(/\s+/).includes('stylesheet') && a.href) links.push(a.href);
  }
  const inline = [...bereinigt.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi)].map((m) => m[1]);
  return { links: [...new Set(links)], inline };
}

const istGruppe = (s) => s.startsWith('(') && s.endsWith(')');
const segmente = (p) => p.split('/').filter(Boolean);
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Route-Muster ("/kern-probe/[slug]") -> RegExp für konkrete URLs.
export function routenRegex(route) {
  const teile = route.split('/').map((s) => (s.startsWith('[') ? (s.includes('...') ? '.+' : '[^/]+') : esc(s)));
  return new RegExp('^' + teile.join('/') + '$');
}

// Kern-Routen aus dem Build-Manifest: Seiten-Schlüssel mit Segment (kern).
export function kernRouten(build) {
  const manifest = ['server/app-paths-manifest.json', 'app-path-routes-manifest.json']
    .map((p) => path.join(build, p))
    .find((p) => fs.existsSync(p));
  if (!manifest) fehler(`kein app-paths-manifest.json und kein app-path-routes-manifest.json im Build (${build})`);
  const schluessel = Object.keys(JSON.parse(fs.readFileSync(manifest, 'utf8')));
  const routen = new Set();
  for (const k of schluessel) {
    const teile = segmente(k);
    if (teile.at(-1) !== 'page' || !teile.includes('(kern)')) continue;
    routen.add('/' + teile.slice(0, -1).filter((s) => !istGruppe(s)).join('/'));
  }
  return [...routen].sort();
}

// Alle HTML-Dateien unter server/app mit ihrer URL (Routengruppen und index entfernt).
export function alleHtml(build) {
  const out = [];
  (function lauf(dir, rel) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) {
        lauf(p, [...rel, e.name]);
      } else if (e.name.endsWith('.html')) {
        const teile = [...rel, e.name.slice(0, -5)].filter((s) => !istGruppe(s));
        if (teile.at(-1) === 'index') teile.pop();
        out.push({ datei: p, url: '/' + teile.join('/') });
      }
    }
  })(path.join(build, 'server', 'app'), []);
  return out;
}

const normalisiere = (u) => {
  let s = u.split(/[?#]/)[0].trim();
  if (!s.startsWith('/')) s = '/' + s;
  if (s.length > 1) s = s.replace(/\/+$/, '');
  return s || '/';
};

function pruefe(z, build) {
  const html = fs.readFileSync(z.datei, 'utf8');
  const quellen = htmlCssQuellen(html);
  const warnungen = [];
  const regeln = new Set();
  const css = [];
  for (const href of quellen.links) {
    const pfad = href.split(/[?#]/)[0];
    if (!pfad.startsWith(STATIC_PRAEFIX)) {
      warnungen.push(`CSS-Link ohne ${STATIC_PRAEFIX} übersprungen: ${href}`);
      continue;
    }
    const datei = path.join(build, 'static', pfad.slice(STATIC_PRAEFIX.length));
    if (!fs.existsSync(datei)) fehler(`Seite ${z.seite}: verlinktes CSS ${href} fehlt im Build`);
    css.push(pfad);
    for (const k of cssKlassen(fs.readFileSync(datei, 'utf8'))) regeln.add(k);
  }
  for (const c of quellen.inline) for (const k of cssKlassen(c)) regeln.add(k);

  const klassen = htmlKlassen(html);
  const fehlend = [];
  const ausgenommen = [];
  for (const k of [...klassen.keys()].sort()) {
    if (regeln.has(k)) continue;
    const eintrag = { klasse: k, vorkommen: klassen.get(k) };
    (ZUSTANDSMARKER.has(k) ? ausgenommen : fehlend).push(eintrag);
  }
  const rel = z.datei.startsWith(build + path.sep) ? path.relative(build, z.datei) : z.datei;
  return {
    seite: z.seite,
    url: z.url,
    kern: z.kern,
    datei: rel,
    css,
    inline_style_bloecke: quellen.inline.length,
    klassen_im_html: klassen.size,
    klassen_mit_regel: klassen.size - fehlend.length - ausgenommen.length,
    fehlend,
    ausgenommen,
    warnungen,
    status: fehlend.length ? 'fehlend' : 'ok',
  };
}

function hauptlauf(argv) {
  const opt = (k) => {
    const i = argv.indexOf(`--${k}`);
    if (i < 0) return undefined;
    const v = argv[i + 1];
    if (v === undefined || v.startsWith('--')) fehler(`--${k} braucht einen Wert`);
    return v;
  };
  const bauArg = opt('build');
  if (!bauArg) fehler('Aufruf: node kern-klassen.mjs --build <pfad-zu-.next> [--seiten /a,/b] [--html <datei>] [--satz <name>]');
  const satzArg = opt('satz');
  if (satzArg !== undefined && !/^[\w.-]+$/.test(satzArg)) fehler('--satz nur mit Buchstaben, Ziffern, Punkt, Unterstrich, Bindestrich');
  const seitenArg = opt('seiten');
  const htmlArg = opt('html');
  if (seitenArg && htmlArg) fehler('--seiten und --html nicht zusammen');

  const build = path.resolve(bauArg);
  if (!fs.existsSync(path.join(build, 'server', 'app'))) fehler(`kein Next-Build unter ${build} (server/app fehlt)`);
  const alle = alleHtml(build);
  const routen = kernRouten(build);
  const nichtGeprueft = [];
  let ziele = [];

  if (htmlArg) {
    const datei = path.resolve(htmlArg);
    if (!fs.existsSync(datei)) fehler(`--html: ${datei} nicht gefunden`);
    ziele.push({ seite: `Datei ${path.basename(datei)}`, url: null, kern: null, datei });
  } else if (seitenArg) {
    for (const roh of seitenArg.split(',').map((s) => s.trim()).filter(Boolean)) {
      const url = normalisiere(roh);
      const treffer = alle.find((h) => h.url === url);
      if (!treffer) fehler(`Seite ${url} hat kein HTML im Build`);
      ziele.push({ seite: url, url, kern: routen.some((r) => routenRegex(r).test(url)), datei: treffer.datei });
    }
  } else {
    if (!routen.length) fehler('keine Kern-Seiten im Build (kein Manifest-Schlüssel mit Segment (kern))');
    for (const h of alle) {
      if (routen.some((r) => routenRegex(r).test(h.url))) ziele.push({ seite: h.url, url: h.url, kern: true, datei: h.datei });
    }
    for (const r of routen) {
      if (!alle.some((h) => routenRegex(r).test(h.url))) {
        nichtGeprueft.push({ route: r, grund: 'kein HTML im Build (dynamisch nicht vorgerendert oder fehlend)' });
      }
    }
    if (!ziele.length) fehler('keine Kern-HTML-Dateien im Build');
  }

  const seiten = ziele.map((z) => pruefe(z, build));
  const mitFehlenden = seiten.filter((s) => s.fehlend.length);
  const bericht = {
    satz: satzArg ?? 'adhoc',
    base: null,
    bedingungen: {
      modus: 'statisch: Server-HTML (server/app) und verlinkte CSS (static); kein Browserlauf, kein Server, kein Netz',
      build,
      seitenwahl: htmlArg ? `--html ${htmlArg}` : seitenArg ? `--seiten ${seitenArg}` : 'alle HTML-Dateien mit Kern-Route (Manifest)',
      klassen: 'class-Attribute des Server-HTML; script, style und Kommentare ausgenommen',
      regeln: 'Klassen-Selektoren aus verlinkten CSS (/_next/static/) und Inline-style; Kommentare und Strings übersprungen; @-Blöcke einbezogen; Escapes entmaskiert',
      zustandsmarker_ohne_regel: [...ZUSTANDSMARKER],
      exit: '0 keine fehlenden Klassen · 1 fehlende Klassen in mindestens einer Kern-Seite · 2 Abbruch',
    },
    erstellt: new Date().toISOString(),
    seiten,
    nicht_geprueft: nichtGeprueft,
    ergebnis: {
      seiten_geprueft: seiten.length,
      seiten_mit_fehlenden_klassen: mitFehlenden.length,
      fehlende_eintraege: seiten.reduce((n, s) => n + s.fehlend.length, 0),
      status: mitFehlenden.length ? 'fehlend' : 'ok',
    },
  };
  const text = JSON.stringify(bericht, null, 2) + '\n';
  process.stdout.write(text);
  if (satzArg !== undefined) {
    const ziel = path.join(ensureDir(path.join(RELAUNCH, 'belege', satzArg)), 'kern-klassen.json');
    fs.writeFileSync(ziel, text);
  }
  process.exitCode = mitFehlenden.length ? 1 : 0;
}

const direkt = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direkt) {
  try {
    hauptlauf(process.argv.slice(2));
  } catch (e) {
    fehler(e.message);
  }
}
