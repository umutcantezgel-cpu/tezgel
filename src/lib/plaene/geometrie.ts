// Reine Geometrie des Verlegeplans – ohne React, damit sie testbar ist (test/plaene.test.mjs).
import type { Planvorgabe, Verband } from './typen';

export interface Fugenbild {
  /** senkrechte Fugenabschnitte je Reihe: [x, y1, y2] */
  senkrecht: Array<[number, number, number]>;
  /** waagrechte Fugen: y */
  waagrecht: number[];
  /** Passstücke (Randfliesen) als Rechtecke [x, y, b, h] */
  passstuecke: Array<[number, number, number, number]>;
  /** Lage der Achsen */
  achseX: number;
  achseY: number;
}

const r = (n: number) => Math.round(n * 1000) / 1000;

/** Versatz einer Reihe im Verband als Bruchteil der Plattenbreite. */
export function reihenversatz(verband: Verband, reihe: number): number {
  if (verband === 'halb') return reihe % 2 === 0 ? 0 : 0.5;
  if (verband === 'drittel') return (reihe % 3) / 3;
  return 0;
}

/** Erster Fugenabstand vom Rand so, dass die Achse auf einer Fuge liegt (gleiche Passstücke an beiden Rändern). */
export function startversatz(laenge: number, plattenmass: number): number {
  const mitte = laenge / 2;
  const rest = mitte % plattenmass;
  return r(rest);
}

export function fugenbild(plan: Planvorgabe): Fugenbild {
  const { raum, platte, verband, achse } = plan;
  const achseX = r(raum.b / 2);
  const achseY = r(raum.h / 2);
  const y0 = achse === 'lot' ? 0 : startversatz(raum.h, platte.h);
  const waagrecht: number[] = [];
  for (let y = y0; y < raum.h - 1e-6; y += platte.h) if (y > 1e-6) waagrecht.push(r(y));
  const reihenGrenzen = [0, ...waagrecht, raum.h];
  const senkrecht: Fugenbild['senkrecht'] = [];
  const passstuecke: Fugenbild['passstuecke'] = [];
  const x0 = startversatz(raum.b, platte.b);
  for (let i = 0; i < reihenGrenzen.length - 1; i++) {
    const ya = reihenGrenzen[i];
    const yb = reihenGrenzen[i + 1];
    const start = (x0 + reihenversatz(verband, i) * platte.b) % platte.b;
    const xs: number[] = [];
    for (let x = start; x < raum.b - 1e-6; x += platte.b) if (x > 1e-6) xs.push(r(x));
    for (const x of xs) senkrecht.push([x, ya, yb]);
    if (xs.length) {
      if (xs[0] < platte.b - 1e-6) passstuecke.push([0, ya, xs[0], r(yb - ya)]);
      const letzte = xs[xs.length - 1];
      if (raum.b - letzte < platte.b - 1e-6) passstuecke.push([letzte, ya, r(raum.b - letzte), r(yb - ya)]);
    }
  }
  return { senkrecht, waagrecht, passstuecke, achseX, achseY };
}

/** Prüft, ob die Passstücke einer Reihe links und rechts gleich breit sind (Ziel des Verlegeplans). */
export function passstueckeGleich(bild: Fugenbild, toleranz = 0.001): boolean {
  const reihen = new Map<number, number[]>();
  for (const [, y, b] of bild.passstuecke) reihen.set(y, [...(reihen.get(y) || []), b]);
  return [...reihen.values()].every((bs) => bs.length !== 2 || Math.abs(bs[0] - bs[1]) <= toleranz);
}
