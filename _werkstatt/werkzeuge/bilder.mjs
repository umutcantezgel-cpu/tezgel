#!/usr/bin/env node
// E2-BILD-01 · Bildwerkzeug nach K-012 (sharp): Webfassungen aus den Originalen nach Bildplatzliste,
// Prüfung ausgelieferter Bilder auf Metadaten, Probelauf.
// Nutzung:
//   node bilder.mjs --auftrag <datei.json> --ziel <ordner>   Webfassungen und <ziel>/bilder.json schreiben
//   node bilder.mjs --pruefe <ordner>                        JPEG, PNG, WebP prüfen (exif, xmp, iptc, Bildtexte); Exit 1 bei Fund
//   node bilder.mjs --probe                                  Testbild mit EXIF und Rand im Scratchpad, Ablauf prüfen
//
// Festlegungen (Auslegung des Auftrags, im Bericht genannt):
// - Originale werden nur gelesen (Quelle relativ: _eingang/entpackt). Ziel nur innerhalb von REPO oder $SCRATCH.
// - Einfarbiger Rand: Zeile bzw. Spalte, deren Helligkeits-Standardabweichung unter RAND_SCHWELLE liegt,
//   vom Bildrand her gezählt, höchstens RAND_MAX_ANTEIL je Seite.
// - Korrektur: Weißabgleich nach Grauwelt (Kanäle auf das gemeinsame Mittel), Belichtung nur außerhalb des
//   Bandes 100 bis 170; je Kanal höchstens ±8 %. Helle Fotos werden nicht dunkler gemacht.
// - zielbreiten bekommt die Breite des Zuschnitts als Quelle. Passt keine Wunschbreite, liefert es die größte
//   zulässige Breite (nie größer als die Quelle).
// - dateiname(raum, name) liefert "<raum-slug>/<name-slug>" (Ordner und Name, ohne Endung).
// - bilder.json wird je id zusammengeführt: gleiche id ersetzt den Eintrag, neue werden angehängt.
// - JPEG_QUALITAET 82 nach K-012. Das Briefing (Schritt 3) nennt 78; siehe OFFENE FRAGEN im Bericht.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const WERKZEUGE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(WERKZEUGE, '..', '..');

export const RAND_SCHWELLE = 4;        // Standardabweichung der Helligkeit (0 bis 255)
export const RAND_MAX_ANTEIL = 0.25;   // höchstens dieser Anteil einer Seite gilt als Rand
export const LANGE_KANTE_MAX = 2560;   // px, K-012 / Auftrag Abschnitt 8
export const JPEG_QUALITAET = 82;      // K-012
export const KORREKTUR_GRENZE = 0.08;  // ±8 % je Kanal
export const KORREKTUR_BAND = [100, 170]; // Belichtung wirkt nur außerhalb dieses Mittelwertbandes
export const STANDARD_BREITEN = [640, 960, 1280];
export const ALT_MAX = 125;            // K-012, Alt-Text ≤ 125 Zeichen

const METADATEN_FELDER = ['exif', 'iptc', 'xmp', 'tifftagPhotoshop'];
const PNG_TEXT_CHUNKS = ['tEXt', 'iTXt', 'zTXt', 'eXIf'];
const BILD_ENDUNG = /\.(jpe?g|png|webp)$/i;

// ---------- reine Rechnung (ohne sharp, ohne Dateisystem) ----------

/** Name in Kleinbuchstaben, Ziffern, Bindestriche; Umlaute ä→ae ö→oe ü→ue ß→ss. Leer ergibt Abbruch. */
export function slug(text) {
  const s = String(text).toLowerCase()
    .replace(/ß/g, 'ss').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  if (!s) throw new Error(`ABBRUCH: „${text}“ ergibt keinen Dateinamen.`);
  return s;
}

/** Relativer Stamm ohne Endung: "<raum>/<name>". */
export function dateiname(raum, name) {
  return `${slug(raum)}/${slug(name)}`;
}

/** "4:5" → [4, 5] (Breite:Höhe). Ungültiges Format bricht ab. */
export function formatWerte(format) {
  const m = /^\s*(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)\s*$/.exec(String(format));
  if (!m || Number(m[1]) <= 0 || Number(m[2]) <= 0) {
    throw new Error(`ABBRUCH: Format „${format}“ ungültig (Breite:Höhe, zum Beispiel 4:5).`);
  }
  return [Number(m[1]), Number(m[2])];
}

const klemme = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/**
 * Größtes Rechteck im Format innerhalb des Bildes nach Abzug der Ränder, so mittig zum Schwerpunkt
 * wie möglich, nie über den Bildrand.
 * @param {{breite:number, hoehe:number}} quelle  Pixel des Originals
 * @param {{format:string, schwerpunkt:{x:number,y:number}, rand?:{links,oben,rechts,unten}}} o
 *        schwerpunkt in Prozent des Originals (0 bis 100), rand in Pixeln des Originals
 * @returns {{links:number, oben:number, breite:number, hoehe:number, format:string}} Pixel des Originals
 */
export function ausschnitt({ breite, hoehe }, { format, schwerpunkt, rand = {} } = {}) {
  const [a, b] = formatWerte(format);
  const x0 = rand.links ?? 0;
  const y0 = rand.oben ?? 0;
  const x1 = breite - (rand.rechts ?? 0);
  const y1 = hoehe - (rand.unten ?? 0);
  const aw = x1 - x0;
  const ah = y1 - y0;
  if (aw < 1 || ah < 1) throw new Error('ABBRUCH: Ränder lassen kein Bild übrig.');
  const k0 = Math.min(aw / a, ah / b);
  const k = Number.isInteger(a) && Number.isInteger(b) ? Math.floor(k0) : k0;
  const w = Math.floor(a * k + 1e-9);
  const h = Math.floor(b * k + 1e-9);
  if (w < 1 || h < 1) throw new Error('ABBRUCH: Zuschnitt wird null Pixel groß.');
  if (!schwerpunkt || !Number.isFinite(schwerpunkt.x) || !Number.isFinite(schwerpunkt.y)) {
    throw new Error('ABBRUCH: Schwerpunkt fehlt.');
  }
  const sx = (schwerpunkt.x / 100) * breite;
  const sy = (schwerpunkt.y / 100) * hoehe;
  const links = klemme(Math.round(sx - w / 2), x0, x1 - w);
  const oben = klemme(Math.round(sy - h / 2), y0, y1 - h);
  return { links, oben, breite: w, hoehe: h, format: `${a}:${b}` };
}

/**
 * Zulässige Ausgabebreiten: höchstens die Quellbreite (nie hochskalieren) und lange Kante ≤ 2.560 px.
 * Passt keine Wunschbreite, wird die größte zulässige Breite geliefert.
 */
export function zielbreiten(quellbreite, wunsch = STANDARD_BREITEN, format = '1:1') {
  const [a, b] = formatWerte(format);
  if (!(quellbreite >= 1)) throw new Error('ABBRUCH: Quellbreite fehlt.');
  const obergrenze = Math.floor(Math.min(quellbreite, LANGE_KANTE_MAX * Math.min(1, a / b)));
  const passend = [...new Set(wunsch.map(Number).filter((w) => Number.isInteger(w) && w >= 1 && w <= obergrenze))]
    .sort((p, q) => p - q);
  return passend.length ? passend : [obergrenze];
}

/** Zählt einfarbige Randzeilen oder -spalten vom Anfang der Reihe aus. */
export function randAbschnitt(stds, schwelle = RAND_SCHWELLE, maxAnteil = RAND_MAX_ANTEIL) {
  const max = Math.floor(stds.length * maxAnteil);
  let n = 0;
  while (n < max && n < stds.length && stds[n] < schwelle) n++;
  return n;
}

/** Helligkeits-Standardabweichung je Zeile und je Spalte (Luminanz nach Rec. 601). */
export function standardabweichungen({ data, w, h, c = 3 }) {
  const zs = new Float64Array(h);
  const zq = new Float64Array(h);
  const ss = new Float64Array(w);
  const sq = new Float64Array(w);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * c;
      const l = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      zs[y] += l; zq[y] += l * l;
      ss[x] += l; sq[x] += l * l;
    }
  }
  const std = (s, q, n) => {
    const m = s / n;
    return Math.sqrt(Math.max(0, q / n - m * m));
  };
  return {
    zeilen: Array.from(zs, (s, y) => std(s, zq[y], w)),
    spalten: Array.from(ss, (s, x) => std(s, sq[x], h)),
  };
}

/** Mittelwert je Kanal (RGB) über alle Pixel. */
export function kanalMittel(data, kanaele = 3) {
  const s = new Array(kanaele).fill(0);
  const n = data.length / kanaele;
  for (let i = 0; i < data.length; i += kanaele) {
    for (let k = 0; k < kanaele; k++) s[k] += data[i + k];
  }
  return s.map((v) => v / n);
}

/**
 * Sanfte Korrektur je Kanal, höchstens ±8 %:
 * - Weißabgleich (Grauwelt): jeder Kanal wird auf das gemeinsame Mittel gezogen; die Helligkeit bleibt.
 * - Belichtung: nur außerhalb des Bandes KORREKTUR_BAND (Mittel unter 100 oder über 170) zurück zum Band.
 */
export function korrekturGewinne(mittel, { band = KORREKTUR_BAND, grenze = KORREKTUR_GRENZE } = {}) {
  const lo = 1 - grenze;
  const hi = 1 + grenze;
  const m = mittel.reduce((p, q) => p + q, 0) / mittel.length;
  if (!(m > 0)) return mittel.map(() => 1);
  const belichtung = m < band[0] ? band[0] / m : m > band[1] ? band[1] / m : 1;
  return mittel.map((c) => +klemme((c > 0 ? m / c : 1) * belichtung, lo, hi).toFixed(4));
}

/** Metadatenfelder mit Inhalt aus einem sharp-metadata-Objekt. */
export function metadatenFunde(meta = {}) {
  return METADATEN_FELDER.filter((k) => meta[k] != null && meta[k].length !== 0);
}

/** Chunk-Typen einer PNG-Datei (ohne Prüfung der Prüfsummen). */
export function pngChunks(buf) {
  const typen = [];
  if (buf.length < 8 || buf.readUInt32BE(0) !== 0x89504e47) return typen;
  let p = 8;
  while (p + 8 <= buf.length) {
    const len = buf.readUInt32BE(p);
    const typ = buf.toString('latin1', p + 4, p + 8);
    typen.push(typ);
    if (typ === 'IEND') break;
    p += 12 + len;
  }
  return typen;
}

/** Chunks mit Metadaten oder Bildtexten in einer PNG-Datei. */
export function pngMetadatenChunks(buf) {
  return pngChunks(buf).filter((t) => PNG_TEXT_CHUNKS.includes(t));
}

const zahlIn = (v) => typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 100;

/**
 * Prüft die Liste der Aufträge und liefert normalisierte Einträge. Bei Fehlern: ein Abbruch mit allen Gründen.
 */
export function auftragNormalisieren(liste) {
  if (!Array.isArray(liste) || liste.length === 0) {
    throw new Error('ABBRUCH: Auftragsliste ist leer oder keine Liste.');
  }
  const fehler = [];
  const ids = new Set();
  const ergebnis = [];
  liste.forEach((a, i) => {
    const kopf = `Auftrag ${i + 1}${a && a.id ? ` (${a.id})` : ''}`;
    try {
      if (!a || typeof a !== 'object') throw new Error('kein Objekt');
      const text = (feld, wert) => {
        if (typeof wert !== 'string' || !wert.trim()) throw new Error(`${feld} fehlt`);
        return wert.trim();
      };
      const id = text('id', a.id);
      if (ids.has(id)) throw new Error(`id „${id}“ kommt doppelt vor`);
      ids.add(id);
      const original = text('original', a.original);
      const raum = text('raum', a.raum);
      slug(raum);
      const name = text('name', a.name);
      slug(name);
      formatWerte(a.format);
      if (!a.schwerpunkt || !zahlIn(a.schwerpunkt.x) || !zahlIn(a.schwerpunkt.y)) {
        throw new Error('schwerpunkt braucht x und y zwischen 0 und 100');
      }
      const ausschnittIn = a.ausschnitt ?? {};
      const ausschnittOut = {};
      for (const seite of ['links', 'oben', 'rechts', 'unten']) {
        const v = ausschnittIn[seite] ?? 0;
        if (!zahlIn(v)) throw new Error(`ausschnitt.${seite} muss zwischen 0 und 100 liegen`);
        ausschnittOut[seite] = v;
      }
      if (ausschnittOut.links + ausschnittOut.rechts >= 100 || ausschnittOut.oben + ausschnittOut.unten >= 100) {
        throw new Error('ausschnitt lässt kein Bild übrig');
      }
      const breiten = a.breiten ?? STANDARD_BREITEN;
      if (!Array.isArray(breiten) || !breiten.every((b) => Number.isInteger(b) && b > 0)) {
        throw new Error('breiten: nur ganze Zahlen größer 0');
      }
      if (typeof a.alt !== 'string') throw new Error('alt fehlt (leerer Text nur für dekorative Bilder)');
      if (a.alt.length > ALT_MAX) throw new Error(`alt hat ${a.alt.length} Zeichen (höchstens ${ALT_MAX})`);
      const korrektur = a.korrektur ?? true;
      if (typeof korrektur !== 'boolean') throw new Error('korrektur muss true oder false sein');
      // optional: leichtes Nachschärfen weicher Ausschnitte (Sigma 0,5 bis 2; Browserprüfung E4-W1, Runde 2)
      const schaerfen = a.schaerfen ?? 0;
      if (typeof schaerfen !== 'number' || schaerfen < 0 || schaerfen > 2) throw new Error('schaerfen: Zahl von 0 bis 2');
      ergebnis.push({
        id,
        original,
        raum,
        name,
        format: a.format.trim(),
        schwerpunkt: { x: a.schwerpunkt.x, y: a.schwerpunkt.y },
        ausschnitt: ausschnittOut,
        breiten: [...new Set(breiten)].sort((p, q) => p - q),
        alt: a.alt,
        korrektur,
        schaerfen,
      });
    } catch (e) {
      fehler.push(`${kopf}: ${e.message}`);
    }
  });
  if (fehler.length) throw new Error(['ABBRUCH: Auftrag fehlerhaft.', ...fehler.map((f) => `  ${f}`)].join('\n'));
  return ergebnis;
}

// ---------- Ausführung (sharp, Dateisystem) ----------

/** Prüft eine Datei und liefert die gefundenen Metadatenarten (leer = frei). */
export async function pruefeDatei(voll) {
  const funde = metadatenFunde(await sharp(voll).metadata());
  if (/\.png$/i.test(voll)) {
    funde.push(...pngMetadatenChunks(fs.readFileSync(voll)).map((t) => `PNG-${t}`));
  }
  return funde;
}

/** Bearbeitet einen Auftrag und schreibt die Webfassungen nach ziel. Liefert Eintrag für bilder.json und Bericht. */
async function bearbeite(a, ziel) {
  const quelle = path.isAbsolute(a.original) ? a.original : path.join(REPO, '_eingang', 'entpackt', a.original);
  if (!fs.existsSync(quelle)) throw new Error(`ABBRUCH: Original fehlt: ${quelle}`);
  const hinweise = [];

  // Ausrichtung nach EXIF, sRGB, ohne Alpha; nur lesen
  const roh = await sharp(quelle).rotate().flatten({ background: '#ffffff' }).toColourspace('srgb')
    .removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const bild = { data: roh.data, w: roh.info.width, h: roh.info.height };

  // einfarbige Ränder
  const { zeilen, spalten } = standardabweichungen(bild);
  const auto = {
    oben: randAbschnitt(zeilen),
    unten: randAbschnitt([...zeilen].reverse()),
    links: randAbschnitt(spalten),
    rechts: randAbschnitt([...spalten].reverse()),
  };
  for (const [seite, n] of Object.entries(auto)) {
    const groesse = seite === 'oben' || seite === 'unten' ? bild.h : bild.w;
    if (n > 0 && n >= Math.floor(groesse * RAND_MAX_ANTEIL)) hinweise.push(`Rand ${seite} am Anschlag (${Math.round(RAND_MAX_ANTEIL * 100)} %): Bild prüfen`);
  }

  // Ausschnitt in Prozent (Bereiche, die weg müssen) zum Rand dazu
  const m = a.ausschnitt;
  const rand = {
    links: Math.max(auto.links, Math.round((m.links / 100) * bild.w)),
    oben: Math.max(auto.oben, Math.round((m.oben / 100) * bild.h)),
    rechts: Math.max(auto.rechts, Math.round((m.rechts / 100) * bild.w)),
    unten: Math.max(auto.unten, Math.round((m.unten / 100) * bild.h)),
  };
  const rect = ausschnitt({ breite: bild.w, hoehe: bild.h }, { format: a.format, schwerpunkt: a.schwerpunkt, rand });
  const sx = (a.schwerpunkt.x / 100) * bild.w;
  const sy = (a.schwerpunkt.y / 100) * bild.h;
  const imZuschnitt = sx >= rect.links && sx <= rect.links + rect.breite && sy >= rect.oben && sy <= rect.oben + rect.hoehe;
  if (!imZuschnitt) hinweise.push('Schwerpunkt liegt nicht im Zuschnitt');

  const zuschnitt = await sharp(bild.data, { raw: { width: bild.w, height: bild.h, channels: 3 } })
    .extract({ left: rect.links, top: rect.oben, width: rect.breite, height: rect.hoehe })
    .raw().toBuffer({ resolveWithObject: true });
  const cw = zuschnitt.info.width;
  const ch = zuschnitt.info.height;
  const raw = { raw: { width: cw, height: ch, channels: 3 } };

  // sanfte Korrektur
  let gewinne = [1, 1, 1];
  let basis = zuschnitt.data;
  if (a.korrektur) {
    gewinne = korrekturGewinne(kanalMittel(zuschnitt.data, 3));
    basis = await sharp(zuschnitt.data, raw).linear(gewinne, [0, 0, 0]).raw().toBuffer();
  }

  // Webfassungen: JPEG, progressiv, mozjpeg, sRGB, ohne Metadaten (kein withMetadata)
  const wunsch = zielbreiten(cw, a.breiten, a.format);
  if (!a.breiten.some((b) => b <= cw)) hinweise.push(`keine Wunschbreite passt; größte Breite ${wunsch[0]} px`);
  const stamm = dateiname(a.raum, a.name);
  const ausgaben = [];
  for (const bw of wunsch) {
    let kette = sharp(basis, raw).resize({ width: bw });
    if (a.schaerfen) kette = kette.sharpen({ sigma: a.schaerfen });
    const { data, info } = await kette.toColourspace('srgb')
      .jpeg({ quality: JPEG_QUALITAET, progressive: true, mozjpeg: true })
      .toBuffer({ resolveWithObject: true });
    const datei = path.join(ziel, `${stamm}-${bw}.jpg`);
    fs.mkdirSync(path.dirname(datei), { recursive: true });
    fs.writeFileSync(datei, data);
    ausgaben.push({ breite: info.width, hoehe: info.height, kb: Math.round(data.length / 1024), datei });
  }
  const groesste = ausgaben[ausgaben.length - 1];
  fs.writeFileSync(path.join(ziel, `${stamm}.jpg`), fs.readFileSync(groesste.datei));

  // Platzhalter: 16 px breit, WebP, als Daten-URL
  const klein = await sharp(basis, raw).resize({ width: 16 }).webp({ quality: 40 }).toBuffer();

  return {
    eintrag: {
      id: a.id,
      src: `/images/arbeiten/${stamm}.jpg`,
      breite: groesste.breite,
      hoehe: groesste.hoehe,
      alt: a.alt,
      raum: a.raum,
      blurDataURL: `data:image/webp;base64,${klein.toString('base64')}`,
    },
    bericht: {
      id: a.id,
      quelle: { breite: bild.w, hoehe: bild.h },
      auto,
      ausschnitt: rect,
      imZuschnitt,
      gewinne,
      ausgaben: ausgaben.map(({ datei: _d, ...rest }) => rest),
      hinweise,
    },
  };
}

/** bilder.json im Ziel anlegen oder je id zusammenführen. */
function bilderJsonSchreiben(ziel, eintraege) {
  const datei = path.join(ziel, 'bilder.json');
  let alt = [];
  if (fs.existsSync(datei)) {
    try {
      alt = JSON.parse(fs.readFileSync(datei, 'utf8'));
    } catch {
      throw new Error(`ABBRUCH: ${datei} ist kein gültiges JSON.`);
    }
  }
  const karte = new Map(alt.map((e) => [e.id, e]));
  for (const e of eintraege) karte.set(e.id, e);
  fs.writeFileSync(datei, `${JSON.stringify([...karte.values()], null, 2)}\n`);
  return datei;
}

function zielPruefen(ziel, scratch) {
  const abs = path.resolve(ziel);
  const erlaubt = [REPO, scratch].map((p) => path.resolve(p));
  if (!erlaubt.some((w) => abs === w || abs.startsWith(w + path.sep))) {
    throw new Error(`ABBRUCH: Ziel ${abs} liegt außerhalb von ${REPO} und $SCRATCH.`);
  }
  return abs;
}

async function modusAuftrag(datei, ziel) {
  const { SCRATCH } = await import('./lib.mjs');
  const zielAbs = zielPruefen(ziel, SCRATCH);
  const liste = auftragNormalisieren(JSON.parse(fs.readFileSync(path.resolve(datei), 'utf8')));
  fs.mkdirSync(zielAbs, { recursive: true });
  const eintraege = [];
  for (const a of liste) {
    const { eintrag, bericht } = await bearbeite(a, zielAbs);
    eintraege.push(eintrag);
    const r = bericht.ausschnitt;
    console.log(`${bericht.id}: Zuschnitt x ${r.links}, y ${r.oben}, ${r.breite} × ${r.hoehe} px (${r.format}) · `
      + `Rand oben ${bericht.auto.oben}, unten ${bericht.auto.unten}, links ${bericht.auto.links}, rechts ${bericht.auto.rechts} px · `
      + `Schwerpunkt im Zuschnitt: ${bericht.imZuschnitt ? 'ja' : 'nein'} · `
      + `Korrektur je Kanal ${a.korrektur ? bericht.gewinne.join(' / ') : 'aus'}`);
    console.log(`  Ausgaben: ${bericht.ausgaben.map((g) => `${g.breite} px (${g.kb} KB)`).join(', ')}`);
    for (const h of bericht.hinweise) console.log(`  HINWEIS: ${h}`);
  }
  const json = bilderJsonSchreiben(zielAbs, eintraege);
  console.log(`bilder.json: ${json} (${eintraege.length} Einträge)`);
  return 0;
}

async function modusPruefe(ordner) {
  const wurzel = path.resolve(ordner);
  if (!fs.existsSync(wurzel)) throw new Error(`ABBRUCH: Ordner fehlt: ${wurzel}`);
  const dateien = fs.readdirSync(wurzel, { recursive: true }).map(String).filter((d) => BILD_ENDUNG.test(d)).sort();
  let auffaellig = 0;
  for (const rel of dateien) {
    try {
      const funde = await pruefeDatei(path.join(wurzel, rel));
      if (funde.length) {
        auffaellig++;
        console.log(`FUND    ${rel}: ${funde.join(', ')}`);
      } else {
        console.log(`OK      ${rel}`);
      }
    } catch (e) {
      auffaellig++;
      console.log(`FEHLER  ${rel}: ${e.message}`);
    }
  }
  console.log(`${dateien.length} Bilder geprüft, ${auffaellig} mit Fund oder Fehler.`);
  return auffaellig ? 1 : 0;
}

// Probebild: schwarzer Rand oben (300 px) und links (120 px), verrauschter Hintergrund, roter Kreis bei 30 %/60 %.
function probeBild(W, H) {
  const data = Buffer.alloc(W * H * 3);
  let seed = 7;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 3;
      if (y < 300 || x < 120) {
        data[i] = 0; data[i + 1] = 0; data[i + 2] = 0;
      } else if ((x - 396) ** 2 + (y - 1200) ** 2 < 120 ** 2) {
        data[i] = 200; data[i + 1] = 50; data[i + 2] = 40;
      } else {
        const n = Math.round((rnd() - 0.5) * 30);
        data[i] = 184 + n; data[i + 1] = 184 + n; data[i + 2] = 184 + n;
      }
    }
  }
  return data;
}

/** Mittlere Helligkeit der vier Kanten (Pixelreihen am Rand). */
function kantenHelligkeit({ data, w, h }) {
  const lum = (x, y) => {
    const i = (y * w + x) * 3;
    return 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  };
  const mittel = (n, f) => {
    let s = 0;
    for (let k = 0; k < n; k++) s += f(k);
    return s / n;
  };
  return {
    oben: mittel(w, (x) => lum(x, 0)),
    unten: mittel(w, (x) => lum(x, h - 1)),
    links: mittel(h, (y) => lum(0, y)),
    rechts: mittel(h, (y) => lum(w - 1, y)),
  };
}

const PROBE_XMP ='<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">'
  + '<rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:description>Probe-Bildtext</dc:description>'
  + '</rdf:Description></rdf:RDF></x:xmpmeta>';

async function modusProbe() {
  const { SCRATCH } = await import('./lib.mjs');
  const basis = path.join(SCRATCH, 'E2-BILD-01', 'probe');
  fs.rmSync(basis, { recursive: true, force: true });
  const quellOrdner = path.join(basis, 'quelle');
  const ziel = path.join(basis, 'ziel');
  fs.mkdirSync(quellOrdner, { recursive: true });
  const W = 1320;
  const H = 2000;
  const quelle = path.join(quellOrdner, 'probe-quelle.png');
  await sharp(probeBild(W, H), { raw: { width: W, height: H, channels: 3 } })
    .withExif({
      IFD0: { ImageDescription: 'Probe-Bildtext', Copyright: 'Probe' },
      IFD3: { GPSLatitudeRef: 'N', GPSLatitude: '50/1 30/1 0/1', GPSLongitudeRef: 'E', GPSLongitude: '8/1 30/1 0/1' },
    })
    .withXmp(PROBE_XMP)
    .png()
    .toFile(quelle);

  const vorher = await pruefeDatei(quelle);
  if (!vorher.includes('exif') || !vorher.includes('xmp')) {
    throw new Error(`PROBE FEHLGESCHLAGEN: Testbild trägt nicht die erwarteten Metadaten (gefunden: ${vorher.join(', ') || 'keine'}).`);
  }

  const [a] = auftragNormalisieren([{
    id: 'probe-bild', original: quelle, raum: 'Probe', name: 'probe-bild', format: '4:5',
    schwerpunkt: { x: 30, y: 60 }, breiten: [400, 800, 1600], alt: 'Probe',
  }]);
  const { bericht } = await bearbeite(a, ziel);

  const fehler = [];
  const pruefe = (bedingung, text) => { if (!bedingung) fehler.push(text); };
  pruefe(Math.abs(bericht.auto.oben - 300) <= 2, `oberer Rand erkannt: ${bericht.auto.oben} px statt 300`);
  pruefe(Math.abs(bericht.auto.links - 120) <= 2, `linker Rand erkannt: ${bericht.auto.links} px statt 120`);
  pruefe(bericht.auto.unten === 0 && bericht.auto.rechts === 0, 'unten oder rechts fälschlich als Rand erkannt');
  const groesste = bericht.ausgaben[bericht.ausgaben.length - 1];
  pruefe(groesste.hoehe === Math.round((groesste.breite * 5) / 4), `Format 4:5 verfehlt: ${groesste.breite} × ${groesste.hoehe}`);
  pruefe(bericht.ausgaben.every((g) => g.breite <= W), `Breite über der Quelle (${W} px)`);
  pruefe(bericht.ausgaben.every((g) => g.breite <= bericht.ausschnitt.breite), 'Breite über dem Zuschnitt');
  pruefe(bericht.imZuschnitt, 'Schwerpunkt liegt nicht im Zuschnitt');

  const dateienZiel = fs.readdirSync(ziel, { recursive: true }).map(String).filter((d) => /\.jpg$/i.test(d));
  const nachher = [];
  for (const d of dateienZiel) {
    const funde = await pruefeDatei(path.join(ziel, d));
    if (funde.length) nachher.push(`${d}: ${funde.join(', ')}`);
  }
  pruefe(dateienZiel.length > 0 && nachher.length === 0, `Metadaten nach dem Lauf: ${nachher.join('; ') || 'keine Ausgabe'}`);

  // Kontrolle an der Webfassung: die Kanten sind hell (Hintergrund ~184), der schwarze Rand hätte ~0.
  // Keine Standardabweichung hier: Herunterrechnen glättet das Rauschen des Probebildes.
  const kontrolle = await sharp(path.join(ziel, `${dateiname(a.raum, a.name)}.jpg`)).raw().toBuffer({ resolveWithObject: true });
  const kanten = kantenHelligkeit({ data: kontrolle.data, w: kontrolle.info.width, h: kontrolle.info.height });
  pruefe(Object.values(kanten).every((v) => v > 60), `dunkle Kante in der Webfassung (Helligkeit oben, unten, links, rechts: ${Object.values(kanten).map((v) => v.toFixed(0)).join(', ')})`);

  if (fehler.length) throw new Error(['PROBE FEHLGESCHLAGEN:', ...fehler.map((f) => `  ${f}`)].join('\n'));
  console.log('PROBE OK');
  console.log(`  Rand erkannt: oben ${bericht.auto.oben}, links ${bericht.auto.links} px (Testbild 300 und 120)`);
  console.log(`  Zuschnitt: x ${bericht.ausschnitt.links}, y ${bericht.ausschnitt.oben}, ${bericht.ausschnitt.breite} × ${bericht.ausschnitt.hoehe} px`);
  console.log(`  Format 4:5: ${groesste.breite} × ${groesste.hoehe} px`);
  console.log(`  Metadaten vorher: ${vorher.join(', ')} · nachher: keine`);
  console.log(`  Breiten: ${bericht.ausgaben.map((g) => g.breite).join(', ')} px (1600 nicht erzeugt, Quelle ${W} px)`);
  console.log(`  Ausgabe: ${ziel}`);
  return 0;
}

function argumente(argv) {
  const o = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--probe') {
      o.probe = true;
    } else if (['--auftrag', '--ziel', '--pruefe'].includes(a)) {
      const wert = argv[++i];
      if (!wert) return { fehler: `${a} braucht einen Wert` };
      o[a.slice(2)] = wert;
    } else {
      return { fehler: `Unbekannte Option „${a}“` };
    }
  }
  return o;
}

export async function main(argv) {
  const o = argumente(argv);
  const nutzung = 'Nutzung: node bilder.mjs --auftrag <datei.json> --ziel <ordner> | --pruefe <ordner> | --probe';
  if (o.fehler) {
    console.error(`${o.fehler}\n${nutzung}`);
    return 2;
  }
  if (o.probe) return modusProbe();
  if (o.pruefe) return modusPruefe(o.pruefe);
  if (o.auftrag && o.ziel) return modusAuftrag(o.auftrag, o.ziel);
  console.error(nutzung);
  return 2;
}

const istAufruf = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;
if (istAufruf) {
  main(process.argv.slice(2))
    .then((code) => { process.exitCode = code; })
    .catch((e) => {
      console.error(e && e.message ? e.message : e);
      process.exitCode = 1;
    });
}
