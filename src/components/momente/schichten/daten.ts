// Großer Moment „schichten“ (KERN v3.3 K-007, /bad; E3-GRAF-01): Wortlaut aus _werkstatt/texte/bad.md (Abschnitt 3) und
// Maße der Zeichnung in Zeichnungseinheiten (viewBox 0 0 240 104, y wächst nach unten). Reine Daten ohne JSX, damit
// test/schichten.test.mjs sie direkt lesen kann.
export type SchichtKennung = 'untergrund' | 'abdichtung' | 'kleber' | 'fliese' | 'fuge';
export interface Schicht {
  kennung: SchichtKennung;
  name: string;
  satz: string;
  /** Oberkante in Zeichnungseinheiten */
  oben: number;
  /** Unterkante in Zeichnungseinheiten */
  unten: number;
}
export const UNTERSCHRIFT = 'So ist eine Fläche im Bad aufgebaut, von unten nach oben.';
/** Zeichenfläche: Schnitt von links bis rechts, vier Fliesen, drei Fugen; `weg` = Weg von Kleber und Fliesen beim Setzen
 *  (passt zu translate 0 -16px in bewegung.css, Zeichnungseinheiten wie beim Verband; E-045) */
export const ZEICHNUNG = { breite: 240, hoehe: 104, links: 8, rechts: 232, fliesen: 4, fuge: 4, weg: 16 } as const;
/** von unten nach oben, Reihenfolge des Seitentexts; die Fuge liegt zwischen den Fliesen auf deren Höhe */
export const SCHICHTEN: readonly Schicht[] = [
  { kennung: 'untergrund', name: 'Untergrund', satz: 'Darauf wird alles aufgebaut.', oben: 50, unten: 96 },
  { kennung: 'abdichtung', name: 'Abdichtung', satz: 'Die Abdichtung liegt zwischen Untergrund und Kleber.', oben: 46, unten: 50 },
  { kennung: 'kleber', name: 'Kleber', satz: 'Der Kleber hält die Fliese fest auf der Abdichtung.', oben: 36, unten: 46 },
  { kennung: 'fliese', name: 'Fliese', satz: 'Die Fliese liegt oben, und darauf stehen Sie im Bad.', oben: 20, unten: 36 },
  { kennung: 'fuge', name: 'Fuge', satz: 'Die Fugen füllen die Lücken zwischen den Fliesen.', oben: 20, unten: 36 },
];
export function schicht(kennung: SchichtKennung): Schicht {
  const s = SCHICHTEN.find((e) => e.kennung === kennung);
  if (!s) throw new Error(`Schicht fehlt: ${kennung}`);
  return s;
}
/** Breite einer Fliese: (224 − 3 × 4) / 4 = 53 */
export const FLIESE_B = (ZEICHNUNG.rechts - ZEICHNUNG.links - (ZEICHNUNG.fliesen - 1) * ZEICHNUNG.fuge) / ZEICHNUNG.fliesen;
/** linke Kante jeder Fliese: 8, 65, 122, 179 */
export const FLIESEN_X: readonly number[] = Array.from({ length: ZEICHNUNG.fliesen }, (_, i) => ZEICHNUNG.links + i * (FLIESE_B + ZEICHNUNG.fuge));
/** linke Kante jeder Fuge: 61, 118, 175 */
export const FUGEN_X: readonly number[] = FLIESEN_X.slice(1).map((x) => x - ZEICHNUNG.fuge);
/** Zahnung des Kammspachtels als Zickzack von x1 bis x2: Täler auf `tal`, Spitzen auf `spitze`, je `schritt` ein Punkt */
export function zickzack(x1: number, x2: number, tal: number, spitze: number, schritt: number): string {
  const n = Math.round((x2 - x1) / schritt);
  return Array.from({ length: n + 1 }, (_, i) => `${i === 0 ? 'M' : 'L'}${x1 + i * schritt} ${i % 2 === 0 ? tal : spitze}`).join('');
}
