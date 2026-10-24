// Geometrie des Formatreglers (KERN v3.4 K-007 formatregler, K-008 Formatvergleich; E3-GRAF-05): dieselbe Wand mit kleinen
// Fliesen (Kreuzfuge) und mit großen Fliesen 120 × 260 cm (F-20). Zeichnungseinheit 1 cm. Das Maß der kleinen Fliese steht nie
// als Text auf der Seite (ENTSCHEIDUNGEN: „60 × 60 cm bleiben draußen“), es bestimmt nur die Zeichnung. Die Fugenlänge je
// Format (meter) prüft nur der Test: große Fliesen haben sichtbar weniger Fugen; als Zahl steht sie nicht auf der Seite (E-045).
export type Format = 'klein' | 'gross';
/** Wand im Querformat: drei große Fliesen nebeneinander, damit rechts der Linie auch in der Mitte eine Fuge zu sehen ist */
export const WAND = { b: 360, h: 260 } as const;
export const FORMATE: Record<Format, { b: number; h: number }> = { klein: { b: 60, h: 60 }, gross: { b: 120, h: 260 } };
/** Startwert und Stand ohne JavaScript: Trennlinie in der Mitte */
export const START = 50;
export interface Wandbild { senkrecht: number[]; waagrecht: number[]; passstuecke: Array<[number, number, number, number]>; meter: number }
export function wandbild(format: Format): Wandbild {
  const f = FORMATE[format];
  const senkrecht: number[] = [];
  for (let x = f.b; x < WAND.b; x += f.b) senkrecht.push(x);
  const waagrecht: number[] = [];
  for (let y = f.h; y < WAND.h; y += f.h) waagrecht.push(y);
  const passstuecke: Wandbild['passstuecke'] = [];
  const restB = WAND.b % f.b;
  const restH = WAND.h % f.h;
  if (restB > 0) passstuecke.push([WAND.b - restB, 0, restB, WAND.h]);
  if (restH > 0) passstuecke.push([0, WAND.h - restH, WAND.b, restH]);
  const meter = Math.round((senkrecht.length * WAND.h + waagrecht.length * WAND.b) / 10) / 10;
  return { senkrecht, waagrecht, passstuecke, meter };
}
/** Anteil der Wand mit kleinen Fliesen (0 bis 100, ganzzahlig) aus der Zeigerlage; null ohne Breite */
export function wertAusZeiger(x: number, links: number, breite: number): number | null {
  if (!(breite > 0)) return null;
  return Math.min(100, Math.max(0, Math.round(((x - links) / breite) * 100)));
}
/** Ansage des Reglers (aria-valuetext) */
export function wertText(wert: number): string {
  if (wert <= 0) return 'Ganze Wand mit großen Fliesen';
  if (wert >= 100) return 'Ganze Wand mit kleinen Fliesen';
  return `Links ${wert} Prozent kleine Fliesen, rechts große Fliesen`;
}
