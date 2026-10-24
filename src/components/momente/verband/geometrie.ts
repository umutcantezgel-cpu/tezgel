// Geometrie der Musterprobe „verband“ (KERN v3.4 K-007, E3-GRAF-06): reine Rechnung ohne React, damit sie testbar ist
// (test/verband.test.mjs). Einheiten der Zeichnung (unbemaßt); Platte 2 : 1 wie im VerbandUmschalter und im Seitenwechsel,
// damit die Versatzwerte in bewegung.css (40px, 26.667px, 53.333px = ½, ⅓, ⅔ Platte) für beide Bausteine gelten.
import { reihenversatz } from '@/lib/plaene/geometrie';

export const RAUM = { b: 360, h: 200 } as const;
export const PLATTE = { b: 80, h: 40 } as const;
/** Rand um den Raum in der viewBox, damit die Wandlinie (1,5 px) nicht abgeschnitten wird */
export const RAND = 4;
export const REIHEN = RAUM.h / PLATTE.h;

export interface Rechteck {
  x: number;
  y: number;
  b: number;
  h: number;
}

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Waagrechte Fugen der Reihenverbände (Kreuzfuge, Halb- und Drittelverband): eine Linie je Reihengrenze. */
export function waagrechteFugen(): string {
  let d = '';
  for (let i = 1; i < REIHEN; i++) d += `M0 ${i * PLATTE.h}H${RAUM.b}`;
  return d;
}

/** Stoßfugen einer Reihe im Stand Kreuzfuge: die Raummitte liegt auf einer Fuge (gleiche Passstücke an beiden Rändern);
 *  links eine Platte mehr, damit nach dem Versatz (höchstens ⅔ Platte nach rechts) keine Fuge fehlt, rechts über den Rand. */
export function stossfugen(): number[] {
  const x0 = ((RAUM.b / 2) % PLATTE.b) - PLATTE.b;
  const xs: number[] = [];
  for (let k = 0; k < Math.ceil(RAUM.b / PLATTE.b) + 3; k++) xs.push(x0 + (k - 1) * PLATTE.b);
  return xs;
}

/** Pfad der Stoßfugen einer Reihe (eine senkrechte Linie je Stoß, Höhe einer Reihe). */
export function reihenPfad(reihe: number): string {
  const y1 = reihe * PLATTE.h;
  const y2 = y1 + PLATTE.h;
  return stossfugen()
    .map((x) => `M${x} ${y1}V${y2}`)
    .join('');
}

/** Merkmale einer Reihe für die Regeln in bewegung.css: Halbverband versetzt jede zweite Reihe um ½ Platte,
 *  Drittelverband jede Reihe um 0, ⅓ oder ⅔ Platte (wie im VerbandUmschalter). */
export function reihenDaten(reihe: number): { halb: '0' | '1'; drittel: '0' | '1' | '2' } {
  return {
    halb: reihenversatz('halb', reihe) > 0 ? '1' : '0',
    drittel: String(Math.round(reihenversatz('drittel', reihe) * 3)) as '0' | '1' | '2',
  };
}

// Fischgrät: im „Dominorahmen“ (Einheit = Plattenbreite W) liegen die Platten als Treppe aus einer liegenden
// (k − 2m, k + 2m)·W und einer stehenden Platte (k − 2m + 2, k + 2m − 1)·W; um −45° gedreht läuft der Grat waagrecht.
const W = PLATTE.h;
const L = PLATTE.b;
const C = Math.SQRT1_2;
/** halbe Diagonale einer Platte 80 × 40 (44,7), aufgerundet: Platten mit der Mitte weiter draußen berühren den Raum nicht */
const GRENZE = 45;

/** Punkt aus dem Dominorahmen in den Raum: Drehung um −45°, Ursprung auf der Raummitte. */
export function inRaum(u: number, v: number): [number, number] {
  return [RAUM.b / 2 + (u + v) * C, RAUM.h / 2 + (v - u) * C];
}

/** Umkehrung von inRaum (für die Prüfung der Deckung). */
export function inDominorahmen(x: number, y: number): [number, number] {
  const a = x - RAUM.b / 2;
  const b = y - RAUM.h / 2;
  return [(a - b) * C, (a + b) * C];
}

/** Platten des Fischgräts im Dominorahmen, nur die, die den Raum berühren können. */
export function fischRechtecke(): Rechteck[] {
  const liste: Rechteck[] = [];
  for (let k = -8; k <= 8; k++) {
    for (let m = -4; m <= 4; m++) {
      const paar: Rechteck[] = [
        { x: (k - 2 * m) * W, y: (k + 2 * m) * W, b: L, h: W },
        { x: (k - 2 * m + 2) * W, y: (k + 2 * m - 1) * W, b: W, h: L },
      ];
      for (const f of paar) {
        const [mx, my] = inRaum(f.x + f.b / 2, f.y + f.h / 2);
        if (mx >= -GRENZE && mx <= RAUM.b + GRENZE && my >= -GRENZE && my <= RAUM.h + GRENZE) liste.push(f);
      }
    }
  }
  return liste;
}

/** Ein Pfad mit allen Fischgrät-Platten als geschlossene Vierecke (Koordinaten auf 0,01 gerundet). */
export function fischPfad(): string {
  return fischRechtecke()
    .map((f) => {
      const ecken = [inRaum(f.x, f.y), inRaum(f.x + f.b, f.y), inRaum(f.x + f.b, f.y + f.h), inRaum(f.x, f.y + f.h)];
      return `M${ecken.map(([x, y]) => `${r2(x)} ${r2(y)}`).join('L')}Z`;
    })
    .join('');
}
