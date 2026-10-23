// E2-ORCH-05a/b · Logo per Farbebenen nachzeichnen (potrace) und Deckung messen (E-011, Z-06).
// Quelle: public/images/logo/tezgel-logo.png (640 × 200, Wortmarke und Maskottchen klein) und
// public/images/logo/tezgel-mascot.png (483 × 558, Maskottchen groß; im Logo bei x 12, y 10, 156 × 180 eingesetzt).
// Je Farbebene: Maske (Farbabstand ≤ toleranz) → 4-fach vergrößert → potrace → Pfade. Messung bei doppelter Größe:
// Raster der Pfade gegen die Maske des Originals (IoU je Ebene und flächengewichtet), Farben exakt aus der Ebenenliste.
// Nutzung: node logo/nachzeichnen.mjs [--teil wortmarke|maskottchen|alles] [--ziel <ordner>]
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import potrace from 'potrace';
import { REPO, SCRATCH, ensureDir } from '../lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const TEIL = arg('teil', 'wortmarke');
const ZIEL = ensureDir(arg('ziel', path.join(SCRATCH, 'logo', 'nachzeichnung')));
const FAKTOR = 2; // Messung bei doppelter Größe
const AUF = Number(arg('auf', 4)); // Vergrößerung vor dem Nachzeichnen

export function hexZuRgb(h) { return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); }

async function rgba(datei, breite, hoehe) {
  const { data } = await sharp(datei).resize(breite, hoehe, { kernel: 'lanczos3' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return data;
}

/** Maske einer Farbebene: Pixel, deren Farbe dieser Ebene näher liegt als jeder anderen der Liste (und deckend genug). */
export function ebenenMasken(data, b, h, ebenen, bereich = () => true) {
  const farben = ebenen.map((e) => hexZuRgb(e.farbe));
  const masken = ebenen.map(() => new Uint8Array(b * h));
  for (let i = 0; i < b * h; i++) {
    if (data[i * 4 + 3] < 128 || !bereich(i % b, Math.floor(i / b))) continue;
    let best = -1, bestD = Infinity;
    for (let k = 0; k < farben.length; k++) {
      const d = Math.hypot(data[i * 4] - farben[k][0], data[i * 4 + 1] - farben[k][1], data[i * 4 + 2] - farben[k][2]);
      if (d < bestD) { bestD = d; best = k; }
    }
    if (bestD <= ebenen[best].toleranz) masken[best][i] = 1;
  }
  return masken;
}

async function maskeAlsPng(m, b, h, faktor) {
  const buf = Buffer.alloc(b * h);
  for (let i = 0; i < b * h; i++) buf[i] = m[i] ? 0 : 255;
  return sharp(buf, { raw: { width: b, height: h, channels: 1 } }).resize(b * faktor, h * faktor, { kernel: 'lanczos3' }).png().toBuffer();
}

function zeichne(png, opt) {
  return new Promise((ok, nein) => potrace.trace(png, opt, (err, svg) => (err ? nein(err) : ok(svg))));
}

async function rasterPfad(d, b, h, viewB, viewH) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${b}" height="${h}" viewBox="0 0 ${viewB} ${viewH}"><path d="${d}" fill="#000" fill-rule="evenodd"/></svg>`;
  const { data } = await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const m = new Uint8Array(b * h);
  for (let i = 0; i < b * h; i++) m[i] = data[i * 4 + 3] >= 128 ? 1 : 0;
  return m;
}

function iou(a, b) {
  let s = 0, v = 0;
  for (let i = 0; i < a.length; i++) { if (a[i] & b[i]) s++; if (a[i] | b[i]) v++; }
  return { iou: v ? s / v : 1, flaeche: v };
}


/** Abdeckung je Pixel (0 bis 1) einer Ebene im Original: Deckkraft, wenn die Farbe am nächsten an dieser Ebene liegt. */
function abdeckung(data, b, h, ebenen, k, bereich) {
  const farben = ebenen.map((e) => hexZuRgb(e.farbe));
  const a = new Float32Array(b * h);
  for (let i = 0; i < b * h; i++) {
    if (!bereich(i % b, Math.floor(i / b))) continue;
    let best = -1, bestD = Infinity;
    for (let j = 0; j < farben.length; j++) {
      const d = Math.hypot(data[i * 4] - farben[j][0], data[i * 4 + 1] - farben[j][1], data[i * 4 + 2] - farben[j][2]);
      if (d < bestD) { bestD = d; best = j; }
    }
    if (best === k && bestD <= ebenen[k].toleranz) a[i] = data[i * 4 + 3] / 255;
  }
  return a;
}

async function abdeckungPfad(d, b, h, viewB, viewH) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${b}" height="${h}" viewBox="0 0 ${viewB} ${viewH}"><path d="${d}" fill="#000" fill-rule="evenodd"/></svg>`;
  const { data } = await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const a = new Float32Array(b * h);
  for (let i = 0; i < b * h; i++) a[i] = data[i * 4 + 3] / 255;
  return a;
}

/** Weiche Deckung: Σ min(a, b) / Σ max(a, b) über die Abdeckung je Pixel. */
function weicheIou(a, b) {
  let s = 0, v = 0;
  for (let i = 0; i < a.length; i++) { s += Math.min(a[i], b[i]); v += Math.max(a[i], b[i]); }
  return v ? s / v : 1;
}

export async function nachzeichnen({ datei, b, h, ebenen, bereich, name }) {
  // Nachzeichnen auf der Originalgröße (vergrößert), messen bei doppelter Größe gegen die Maske des vergrößerten Originals
  // Klassifizieren im vergrößerten Bild (subpixelgenaue Kante), nicht in der 1-fach-Maske
  const roh = await rgba(datei, b * AUF, h * AUF);
  const masken = ebenenMasken(roh, b * AUF, h * AUF, ebenen, (x, y) => bereich(x / AUF, y / AUF));
  const roh2 = await rgba(datei, b * FAKTOR, h * FAKTOR);
  const masken2 = ebenenMasken(roh2, b * FAKTOR, h * FAKTOR, ebenen, (x, y) => bereich(x / FAKTOR, y / FAKTOR));
  const ergebnis = [];
  for (const [k, e] of ebenen.entries()) {
    const png = await maskeAlsPng(masken[k], b * AUF, h * AUF, 1);
    const svg = await zeichne(png, { threshold: 128, turdSize: e.krumen ?? 4, optTolerance: Number(arg('opt', e.glaette ?? 0.4)), alphaMax: Number(arg('alpha', 1)), optCurve: true });
    const d = (svg.match(/ d="([^"]+)"/) || [])[1] || '';
    // Pfad liegt im Raum der Vergrößerung (AUF); für die Messung auf doppelte Größe abbilden
    const m2 = d ? await rasterPfad(d, b * FAKTOR, h * FAKTOR, b * AUF, h * AUF) : new Uint8Array(b * h * FAKTOR * FAKTOR);
    const r = iou(m2, masken2[k]);
    const weich = d ? weicheIou(await abdeckungPfad(d, b * FAKTOR, h * FAKTOR, b * AUF, h * AUF), abdeckung(roh2, b * FAKTOR, h * FAKTOR, ebenen, k, (x, y) => bereich(x / FAKTOR, y / FAKTOR))) : 0;
    ergebnis.push({ ebene: e.name, farbe: e.farbe, iou: +r.iou.toFixed(4), weich: +weich.toFixed(4), flaeche: r.flaeche, d, teilpfade: (d.match(/M/g) || []).length });
  }
  const ges = ergebnis.reduce((s, r) => s + r.flaeche, 0);
  const gewichtet = ergebnis.reduce((s, r) => s + r.iou * r.flaeche, 0) / (ges || 1);
  const gewichtetWeich = ergebnis.reduce((s, r) => s + r.weich * r.flaeche, 0) / (ges || 1);
  const svgAll = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${b * AUF} ${h * AUF}">${ergebnis.map((r) => `<path d="${r.d}" fill="${r.farbe}" fill-rule="evenodd"/>`).join('')}</svg>`;
  fs.writeFileSync(path.join(ZIEL, `${name}.svg`), svgAll);
  fs.writeFileSync(path.join(ZIEL, `${name}.json`), JSON.stringify({ name, faktor: FAKTOR, auf: AUF, gewichtet: +gewichtet.toFixed(4), gewichtetWeich: +gewichtetWeich.toFixed(4), ebenen: ergebnis.map(({ d, ...r }) => r) }, null, 2));
  return { name, gewichtet, gewichtetWeich, ergebnis };
}

const WORTMARKE = {
  name: 'wortmarke', datei: path.join(REPO, 'public/images/logo/tezgel-logo.png'), b: 640, h: 200,
  bereich: (x) => x >= 172,
  ebenen: [
    { name: 'fliesenverlegung', farbe: '#0F172A', toleranz: 150 },
    { name: 'tezgel', farbe: '#DC2626', toleranz: 150 },
  ],
};

if (process.argv[1] && process.argv[1].endsWith('nachzeichnen.mjs')) {
  if (TEIL === 'wortmarke' || TEIL === 'alles') {
    const r = await nachzeichnen(WORTMARKE);
    console.log('wortmarke hart', r.gewichtet.toFixed(4), 'weich', r.gewichtetWeich.toFixed(4), r.ergebnis.map((e) => `${e.ebene} ${e.iou}/${e.weich} (${e.teilpfade} Teilpfade)`).join(' · '));
  }
}
