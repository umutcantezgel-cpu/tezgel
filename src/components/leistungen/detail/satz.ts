// /leistungen/[id] · Satz großer Überschriften (S-04, KERN K-006): weiches Trennzeichen (U+00AD) an der Fuge langer Komposita,
// damit H1 und H2 in schmalen Spalten nicht über den Rand laufen (gemessen 320–1920 px: „Terrassensanierung“ in
// H1, Fragen-Kopf und Schriftfeld, „Untergrundvorbereitung“ in der H1). Nur Darstellung: Der Wortlaut bleibt gleich, der
// Trennstrich erscheint nur, wenn der Browser dort umbricht. Bewusst nur dort eingesetzt, wo ein Überlauf gemessen wurde
// (Fusion F-02: auch bei erhöhtem Textabstand nach WCAG 1.4.12, wo die H1 von untergrund sonst 13 px aus main ragte, und
// im Namen der Gewerk-Zeilen, die bei 320 px mit Plan-Miniatur sonst über die Spalte liefen).
const FUGEN: Record<string, string> = {
  Terrassensanierung: 'Terrassen­sanierung',
  Untergrundvorbereitung: 'Untergrund­vorbereitung',
};

export function fugen(text: string): string {
  return text.replace(/Terrassensanierung|Untergrundvorbereitung/g, (wort) => FUGEN[wort] ?? wort);
}

/** Unterstrich an Namen in ganzflächigen Links: Linie in Strich, bei feinem Zeiger und beim Antippen in Tinte (Register
 *  `zustand` am Link) */
export const UNTERSTRICH =
  'underline decoration-strich decoration-1 underline-offset-4 pointer-fine:group-hover:decoration-tinte group-active:decoration-tinte';
