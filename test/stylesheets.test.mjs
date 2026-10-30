// Ein render-blockierendes Stylesheet je Seite (UM-E4-LEISTUNG, Maßnahme 1, E-101). Turbopack legt CSS-Module nur bis zu
// einer Grenze in eine Datei zusammen (belegt zwischen 129 und 132 KB Haupt-CSS); darüber kam jedes weitere Modul als eigene
// Datei, so seit UM-E4-START die zwei @font-face von next/font/local (FCP mobil +145 ms auf /). Seitdem ist globals.css das
// einzige CSS-Modul, die Schriften stehen als <style> im Kopf (src/app/(bestand)/_dokument.tsx); damit bleibt es eine Datei,
// gleich wie groß das Haupt-CSS wird.
// Teil 1 prüft die Quelle (läuft immer): statische und dynamische Importe sowie require von Stildateien (.css, .scss, .sass,
// .less, auch mit Abfrage); ein Paket-Stil ohne Endung (etwa 'paket/css') fällt erst Teil 2 auf. Teil 2 prüft das gebaute
// HTML der zwölf Hauptansichten (Hauptansichten wie _werkstatt/HAUPTANSICHTEN.json) und läuft nur nach `next build`, sonst
// übersprungen: im Reinraum (werkzeuge/reinraum.sh baut vor npm test) also mit, dort auf „übersprungen 0“ achten.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const WURZEL = new URL('..', import.meta.url).pathname;
const SRC = path.join(WURZEL, 'src');
const APP = path.join(WURZEL, '.next/server/app');

function quellen(ordner) {
  const liste = [];
  for (const eintrag of fs.readdirSync(ordner, { withFileTypes: true })) {
    const voll = path.join(ordner, eintrag.name);
    if (eintrag.isDirectory()) liste.push(...quellen(voll));
    else if (/\.(jsx?|tsx?|mjs|css)$/.test(eintrag.name)) liste.push(voll);
  }
  return liste;
}
const dateien = quellen(SRC).map((d) => [path.relative(WURZEL, d), fs.readFileSync(d, 'utf8')]);
const STILDATEI = /\.(?:css|scss|sass|less)(?:\?[^'"]*)?$/;

test('Quelle: globals.css ist das einzige CSS-Modul (kein weiteres CSS-Import, keine CSS-Module, kein next/font)', () => {
  const cssImporte = [];
  for (const [datei, text] of dateien) {
    if (datei.endsWith('.css')) continue;
    for (const m of text.matchAll(/(?:^\s*import\s+(?:[^'"]*?\s+from\s+)?|\bimport\(\s*|\brequire\(\s*)['"]([^'"]+)['"]/gm)) {
      if (STILDATEI.test(m[1])) cssImporte.push(`${datei}: ${m[1]}`);
    }
    for (const m of text.matchAll(/(?:from|import\()\s*['"](next\/font\/[a-z]+)['"]/g)) cssImporte.push(`${datei}: ${m[1]} (eigenes CSS-Modul je Schrift)`);
  }
  assert.deepEqual(cssImporte, ['src/app/(bestand)/_dokument.tsx: @/app/globals.css']);
  assert.deepEqual(dateien.filter(([d]) => d.endsWith('.module.css')).map(([d]) => d), []);
});

test('Quelle: Schriften im Kopf, Archivo vorgeladen, Variablen wie vorher von next/font', () => {
  const text = dateien.find(([d]) => d === 'src/app/(bestand)/_dokument.tsx')[1];
  assert.match(text, /<style dangerouslySetInnerHTML=\{\{ __html: SCHRIFTEN \}\} \/>/);
  assert.match(text, /preload\(archivoDatei, \{ as: 'font', type: 'font\/woff2', crossOrigin: '' \}\)/);
  assert.match(text, /--font-archivo:"archivo";--font-plex-mono:"plexMono"/);
});

const HAUPTANSICHTEN = ['/', '/bad', '/bad/badsanierung', '/bad/barrierefreies-bad', '/leistungen', '/fliesen', '/balkon-terrasse',
  '/referenzen', '/ueber-uns', '/kontakt', '/standorte/wetzlar', '/blog'];
const htmlDatei = (seite) => path.join(APP, seite === '/' ? 'index.html' : `${seite.slice(1)}.html`);
const gebaut = fs.existsSync(htmlDatei('/'));

test('Build: genau ein Stylesheet auf / und allen Hauptansichten, Schriften im Kopf, Archivo vorgeladen', { skip: gebaut ? false : 'kein Produktionsbau (.next/server/app/index.html fehlt)' }, () => {
  const befund = {};
  for (const seite of HAUPTANSICHTEN) {
    const datei = htmlDatei(seite);
    if (!fs.existsSync(datei)) { befund[seite] = 'kein HTML im Build'; continue; }
    const html = fs.readFileSync(datei, 'utf8');
    const kopf = html.slice(0, html.indexOf('</head>'));
    const css = kopf.match(/<link rel="stylesheet"[^>]*>/g) ?? [];
    const schrift = kopf.match(/<link rel="preload"[^>]*as="font"[^>]*>/g) ?? [];
    befund[seite] = {
      stylesheets: css.length,
      schrift_vorgeladen: schrift.filter((l) => /archivo/.test(l)).length,
      font_face_im_kopf: (kopf.match(/@font-face\{font-family:(archivo|plexMono);/g) ?? []).length,
    };
  }
  const erwartet = Object.fromEntries(HAUPTANSICHTEN.map((s) => [s, { stylesheets: 1, schrift_vorgeladen: 1, font_face_im_kopf: 2 }]));
  assert.deepEqual(befund, erwartet);
});
