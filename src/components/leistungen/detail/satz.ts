// /leistungen/[id] · Satz großer Überschriften (S-04, KERN K-006): weiches Trennzeichen (U+00AD) an der Fuge langer Komposita,
// damit H1 (text-fs-7) und H2 in schmalen Spalten nicht über den Rand laufen (gemessen 320–1920 px: „Terrassensanierung“ in
// H1, Fragen-Kopf und Schriftfeld, „Untergrundvorbereitung“ in der H1). Nur Darstellung: Der Wortlaut bleibt gleich, der
// Trennstrich erscheint nur, wenn der Browser dort umbricht. Bewusst nur dort eingesetzt, wo ein Überlauf gemessen wurde.
const FUGEN: Record<string, string> = {
  Terrassensanierung: 'Terrassen­sanierung',
  Untergrundvorbereitung: 'Untergrund­vorbereitung',
};

export function fugen(text: string): string {
  return text.replace(/Terrassensanierung|Untergrundvorbereitung/g, (wort) => FUGEN[wort] ?? wort);
}
