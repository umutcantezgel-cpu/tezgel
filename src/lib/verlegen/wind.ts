// Seitenwechsel B-01 „Wind“ (E-042, Entscheidung des Auftraggebers): Ein Band aus Fliesen 2:1 quer im Drittelverband weht wie
// ein Windstoß über die Seite. Vor dem Band steht noch die alte Seite (das eingefrorene Bild der View Transition), hinter
// ihm ist schon die neue zu sehen (live, per Clip aufgedeckt); der Bildschirm ist nie ganz bedeckt. Klick: von rechts nach
// links; Zurück und Vor im Browser: gespiegelt. Reine Logik ohne DOM: Maß, Reihen, Breite des Bands, Naht und Wege.
import { FUGE_ANTEIL, FUGE_MIN, versatzStufe, type Mass, type Richtung } from './raster';

/** Fliesen je Reihe im Band; die Reihen stehen im Drittelverband, ihre Enden ergeben das Zickzack. */
export const BAND_FLIESEN = 2;
/** Größte Auslenkung einer Reihe beim Wehen, als Anteil der Fliesenlänge (das Band flattert, die Naht bleibt bedeckt). */
export const FLATTERN_ANTEIL = 1 / 8;
export const LAENGE_MIN = 64;
export const LAENGE_MAX = 176;

/** Fliesen je Bildschirmbreite: 5,5 bei 390 px, 9 bei 1440 px, dazwischen linear, außerhalb begrenzt. */
export function windJeBreite(breite: number): number {
  const n = 5.5 + ((breite - 390) * 3.5) / 1050;
  return Math.min(9, Math.max(5, n));
}

/** Maß der Fliesen im Band in ganzen Pixeln (Länge gerade, Höhe halbe Länge, Fuge 1 % der kurzen Seite, mindestens 2 px). */
export function windMass(breite: number): Mass {
  const roh = 2 * Math.round(breite / windJeBreite(breite) / 2);
  const laenge = Math.min(LAENGE_MAX, Math.max(LAENGE_MIN, roh));
  const kurz = laenge / 2;
  return { laenge, hoehe: kurz, fuge: Math.max(FUGE_MIN, kurz * FUGE_ANTEIL) };
}

export interface WindReihe {
  /** Reihe von oben */
  reihe: number;
  /** linke Kante der ersten Fliese im Band (Rand für das Flattern eingerechnet) */
  x: number;
  y: number;
  /** Auslenkung beim Wehen in px (Vorzeichen: Richtung der Welle); bewegt sich von +a nach −a */
  auslenkung: number;
}

export interface WindBand {
  mass: Mass;
  reihen: WindReihe[];
  /** Breite und Höhe des Bands (Element) in px */
  breite: number;
  hoehe: number;
  /** größte Auslenkung einer Reihe in px (Rand links und rechts im Element) */
  rand: number;
  /** Lage der Naht im Band: Hier endet die alte und beginnt die neue Seite; immer im Kern, den jede Reihe bedeckt */
  naht: number;
}

/** Versatz einer Reihe im Drittelverband in ganzen Pixeln (0, ⅓, ⅔ der Länge). */
function versatz(reihe: number, laenge: number): number {
  return Math.round((versatzStufe(reihe, 'drittel') * laenge) / 3);
}

/** Das Band für eine Ansicht: so viele Reihen, dass es die ganze Höhe deckt, je Reihe BAND_FLIESEN Fliesen im Verband. */
export function windBand(breite: number, hoehe: number): WindBand {
  const mass = windMass(breite);
  const rand = Math.round(mass.laenge * FLATTERN_ANTEIL);
  const anzahl = Math.ceil(hoehe / mass.hoehe);
  const reihen: WindReihe[] = [];
  for (let r = 0; r < anzahl; r++) {
    // Welle über die Höhe: benachbarte Reihen lenken versetzt aus, so läuft das Zickzack beim Wehen wie Stoff im Wind
    const auslenkung = Math.round(rand * Math.sin(r * 0.9));
    reihen.push({ reihe: r, x: rand + versatz(r, mass.laenge), y: r * mass.hoehe, auslenkung });
  }
  const groessterVersatz = versatz(2, mass.laenge);
  // Kern: von der Reihe mit dem größten Versatz bis zum Ende der Reihe ohne Versatz, abzüglich der Auslenkung beidseits
  const kernVon = rand + groessterVersatz + rand;
  const kernBis = rand + BAND_FLIESEN * mass.laenge - rand;
  return {
    mass,
    reihen,
    breite: 2 * rand + groessterVersatz + BAND_FLIESEN * mass.laenge,
    hoehe: anzahl * mass.hoehe,
    rand,
    naht: Math.round((kernVon + kernBis) / 2),
  };
}

/** Kern des Bands: der Bereich, den jede Reihe in jeder Auslenkung bedeckt (für Tests und die Naht). */
export function windKern(band: WindBand): { von: number; bis: number } {
  let von = -Infinity;
  let bis = Infinity;
  for (const r of band.reihen) {
    for (const a of [r.auslenkung, -r.auslenkung]) {
      von = Math.max(von, r.x + a);
      bis = Math.min(bis, r.x + a + BAND_FLIESEN * band.mass.laenge);
    }
  }
  return { von, bis };
}

export interface WindWeg {
  /** Verschiebung des Bands (translate X in px) am Anfang und am Ende */
  band: { von: number; bis: number };
  /** Clip der neuen Seite: vor = Abstand von links (inset links), zurueck = Abstand von rechts (inset rechts) */
  naht: { seite: 'links' | 'rechts'; von: number; bis: number };
}

/**
 * Wege für eine Bildschirmbreite. Vor: Das Band kommt ganz von rechts herein und verlässt das Bild ganz nach links; die
 * neue Seite ist rechts der Naht sichtbar (inset links = Lage der Naht). Zurück: gespiegelt, die neue Seite links der Naht.
 * Am Anfang ist von der neuen Seite nichts zu sehen, am Ende alles; Band und Naht laufen mit derselben Dauer und Kurve, die
 * Naht liegt also immer unter dem Band.
 */
export function windWeg(band: WindBand, breite: number, richtung: Richtung): WindWeg {
  if (richtung === 'vor') {
    const von = breite;
    const bis = -band.breite;
    return { band: { von, bis }, naht: { seite: 'links', von: von + band.naht, bis: bis + band.naht } };
  }
  const von = -band.breite;
  const bis = breite;
  return { band: { von, bis }, naht: { seite: 'rechts', von: breite - (von + band.naht), bis: breite - (bis + band.naht) } };
}

/** Obergrenze für das Warten auf die neue Seite, bevor der Wind trotzdem weht (das Bild steht so lange still). */
export const WARTEN_HOECHSTENS = 2500;

export type WindZustand = 'ruhe' | 'warten' | 'wehen';
