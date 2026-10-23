// E2-ORCH-05a · Wortmarke des Logos aus Schriftkonturen nachbauen und Deckung messen (E-011, Z-06).
// Quelle: public/images/logo/tezgel-logo.png (640 × 200) und die Textangaben aus tezgel-logo.svg
// („Fliesenverlegung“ 52 px, x 180, Grundlinie 94, Laufweite −1,2; „Tezgel“ 62 px, Grundlinie 156, Laufweite −1,5).
// Ablauf: Kandidatenschrift → Pfade (opentype.js) → Raster in doppelter Größe (sharp) → Vergleich mit der Textmaske des
// PNG (Farbabstand zu #0F172A bzw. #DC2626) → Feinsuche über Lage, Größe und Laufweite → beste Deckung (IoU) je Zeile.
// Nutzung: node logo/wortmarke.mjs [--schrift <datei.woff>] [--ziel <ordner>]
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import opentype from 'opentype.js';
import { REPO, SCRATCH, ensureDir } from '../lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const NM = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'node_modules');
const SCHRIFT = arg('schrift', path.join(NM, '@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-800-normal.woff'));
const ZIEL = ensureDir(arg('ziel', path.join(SCRATCH, 'logo')));
const FAKTOR = 2; // Messung bei doppelter Größe (Auftrag Abschnitt 9)
const B = 640 * FAKTOR, H = 200 * FAKTOR;

const ZEILEN = [
  { text: 'Fliesenverlegung', groesse: 52, x: 180, y: 94, lauf: -1.2, farbe: [0x0f, 0x17, 0x2a], hex: '#0F172A' },
  { text: 'Tezgel', groesse: 62, x: 180, y: 156, lauf: -1.5, farbe: [0xdc, 0x26, 0x26], hex: '#DC2626' },
];

async function maskeAusPng() {
  const { data, info } = await sharp(path.join(REPO, 'public/images/logo/tezgel-logo.png'))
    .resize(B, H, { kernel: 'lanczos3' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return ZEILEN.map((z) => {
    const m = new Uint8Array(B * H);
    for (let i = 0; i < B * H; i++) {
      const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2], a = data[i * 4 + 3];
      const x = i % B;
      if (x < 170 * FAKTOR || a < 128) continue;
      const d = Math.hypot(r - z.farbe[0], g - z.farbe[1], b - z.farbe[2]);
      m[i] = d < 90 ? 1 : 0;
    }
    return m;
  });
}

function pfadFuer(schrift, z, p) {
  // Glyphe für Glyphe (ohne GSUB-Ersetzungen, die opentype.js für diese Schrift nicht kann), mit Unterschneidung und
  // Laufweite in px wie im SVG des Logos
  const groesse = z.groesse * p.s * FAKTOR;
  const skala = groesse / schrift.unitsPerEm;
  const sammel = new opentype.Path();
  let x = (z.x + p.dx) * FAKTOR;
  const y = (z.y + p.dy) * FAKTOR;
  const glyphen = [...z.text].map((c) => schrift.charToGlyph(c));
  glyphen.forEach((g, i) => {
    sammel.extend(g.getPath(x, y, groesse));
    const kern = i < glyphen.length - 1 ? schrift.getKerningValue(g, glyphen[i + 1]) : 0;
    x += (g.advanceWidth + kern) * skala + (z.lauf + p.dl) * p.s * FAKTOR;
  });
  return sammel;
}

async function raster(d) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${B}" height="${H}"><path d="${d}" fill="#000"/></svg>`;
  const { data } = await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const m = new Uint8Array(B * H);
  for (let i = 0; i < B * H; i++) m[i] = data[i * 4 + 3] >= 128 ? 1 : 0;
  return m;
}

function iou(a, b) {
  let schnitt = 0, verein = 0;
  for (let i = 0; i < a.length; i++) { if (a[i] & b[i]) schnitt++; if (a[i] | b[i]) verein++; }
  return verein ? schnitt / verein : 0;
}

const schrift = opentype.parse(fs.readFileSync(SCHRIFT).buffer.slice(0));
const masken = await maskeAusPng();
const ergebnis = { schrift: path.basename(SCHRIFT), faktor: FAKTOR, zeilen: [] };
for (const [n, z] of ZEILEN.entries()) {
  let best = { iou: -1 };
  // grobe, dann feine Suche
  const suche = async (dxs, dys, ss, dls) => {
    for (const s of ss) for (const dl of dls) for (const dx of dxs) for (const dy of dys) {
      const p = { dx, dy, s, dl };
      const d = pfadFuer(schrift, z, p).toPathData(2);
      const wert = iou(await raster(d), masken[n]);
      if (wert > best.iou) best = { iou: wert, p, d };
    }
  };
  const bereich = (mitte, schritt, n2) => Array.from({ length: 2 * n2 + 1 }, (_, i) => +(mitte + (i - n2) * schritt).toFixed(3));
  await suche(bereich(0, 2, 3), bereich(0, 2, 3), bereich(1, 0.04, 3), bereich(0, 0.6, 2));
  const g = best.p;
  await suche(bereich(g.dx, 0.5, 2), bereich(g.dy, 0.5, 2), bereich(g.s, 0.01, 2), bereich(g.dl, 0.2, 2));
  ergebnis.zeilen.push({ text: z.text, farbe: z.hex, iou: +best.iou.toFixed(4), lage: best.p });
  fs.writeFileSync(path.join(ZIEL, `wortmarke-${n}.svg`), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${B} ${H}"><path d="${best.d}" fill="${z.hex}"/></svg>`);
  console.log(z.text, 'IoU', best.iou.toFixed(4), JSON.stringify(best.p));
}
fs.writeFileSync(path.join(ZIEL, 'wortmarke.json'), JSON.stringify(ergebnis, null, 2));
