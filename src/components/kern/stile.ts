// Gemeinsame Klassenbausteine des KERN (K-005, K-009) – für neue Bausteine und für bestehendes Markup,
// das seine IDs, Labels und Rollen behalten muss (Funnels, Formulare). Nur Tokens, keine freien Werte.
import clsx from 'clsx';

export type KnopfVariante = 'haupt' | 'neben' | 'text' | 'hell';

// Schmal (große Systemschrift, Container unter 16rem) weniger Innenabstand und Trennung langer Wörter mit Strich: sonst stand
// „Weiter zu Schritt 2“ Wort für Wort untereinander (Browserprüfung E4-W0, E-065)
const KNOPF_BASIS =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-none px-6 py-3 font-text text-fs-2 font-semibold no-underline hyphens-auto @max-3xs:px-3 transition-colors dauer-1 ease-setzen motion-safe:active:translate-y-px ruhig:active:translate-y-0! disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50';

const KNOPF: Record<KnopfVariante, string> = {
  haupt: 'border border-tinte bg-tinte text-kalk hover:border-tinte-2 hover:bg-tinte-2',
  neben: 'border border-strich bg-fliese text-tinte hover:border-tinte',
  hell: 'border border-kalk bg-kalk text-tinte hover:border-fliese hover:bg-fliese',
  text: 'min-h-11 px-0 text-tinte underline decoration-strich underline-offset-4 hover:decoration-tinte',
};

/** Knopfklassen: das Element trägt immer data-motion="druck" (Register K-007) */
export function knopfKlassen(variante: KnopfVariante = 'haupt', className?: string) {
  return clsx(variante === 'text' ? 'inline-flex items-center gap-2 font-semibold transition-colors dauer-1 ease-setzen' : KNOPF_BASIS, KNOPF[variante], className);
}

/** Beschriftung über dem Feld */
// hyphens-auto: lange Feldnamen trennen bei großer Schrift, statt samt Pflichtsternchen über die Spalte zu ragen (Runde 3)
export const labelKlassen = 'block font-text text-fs-2 font-semibold text-tinte hyphens-auto';
/** Pflichtmarke hinter dem Label; das Formular erklärt sie einmal mit `kern/PflichtHinweis` (Vorleser hören „erforderlich“
 *  über required). Nicht rot: Rot nur für Achse, Anriss,
 *  Fokus-Akzent und Fehlerzeichen (K-003 Nr. 2) – sonst stehen Sternchen und Fehlerrand als zwei Rot im Bildschirm (R-01a) */
export const pflichtKlassen = 'ml-1 font-mono text-fs-1 text-tinte-2';
/** Eingabe, Auswahl, Textbereich. Schmal (große Systemschrift) nur links weniger Innenabstand: ein `pr-12` für Pfeil oder Lupe
 *  (Auswahl, Suchfeld) bleibt stehen, sonst lief der Text darunter (Browserprüfung E4-W0, E-065) */
export const feldKlassen =
  'mt-2 block w-full min-h-11 rounded-r1 border border-strich bg-fliese px-4 py-3 font-text text-fs-3 text-tinte placeholder:text-tinte-2 @max-xs:pl-3 @max-xs:placeholder:text-transparent hover:border-tinte focus-visible:border-tinte aria-[invalid=true]:border-laser-tief disabled:opacity-50';
/** Hilfetext unter dem Feld */
export const hilfeKlassen = 'mt-2 font-text text-fs-2 text-tinte-2';
/** Fehlertext (mit Fehler-Icon und role="alert") */
export const fehlerKlassen = 'mt-2 flex items-start gap-2 font-text text-fs-2 text-laser-tief';
/** Auswahlknopf in Gruppen (aria-pressed bzw. Radio). Gewählt: doppelt so starker Rand in Tinte und halbfett auf Fliese,
 *  nicht als Tinte-Fläche – die bleibt dem Haupt- und Absendeknopf (K-003 Nr. 5, Sichtprüfung E2); nie nur über Farbe.
 *  Deaktiviert (disabled oder aria-disabled) wie Knopf: halbe Deckkraft, ohne Zeiger und damit ohne Hover (K-010, ZUST-M). */
export const wahlKlassen =
  'inline-flex min-h-11 items-center justify-center rounded-none border border-strich bg-fliese px-4 py-3 text-center font-text text-fs-2 text-tinte hyphens-auto @max-3xs:px-2 hover:border-tinte aria-pressed:border-tinte aria-pressed:font-semibold aria-pressed:ring-1 aria-pressed:ring-inset aria-pressed:ring-tinte aria-checked:border-tinte aria-checked:font-semibold aria-checked:ring-1 aria-checked:ring-inset aria-checked:ring-tinte disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50';
/** Kontrollkästchen: 20 × 20 px im Feld; Ziel ist mit dem Label die ganze Zeile (label umschließt oder htmlFor), so bleibt es
 *  über 24 px. Hover vom Browser am nativen Kasten, angehakt in Tinte, beim Überfahren Tinte-2; deaktiviert halbe Deckkraft
 *  (K-010, ZUST-M) */
export const kontrollKlassen =
  'mt-1 size-5 shrink-0 cursor-pointer rounded-r1 border border-strich accent-tinte hover:accent-tinte-2 disabled:cursor-not-allowed disabled:opacity-50';
/** Mono-Etikett ohne Farbe (für Flächen mit eigener Textfarbe, z. B. Tinte) */
export const etikettForm = 'inline-flex items-center gap-2 font-mono text-fs-1';
export const etikettKlassen = `${etikettForm} text-tinte-2`;
/** Textlink im Fließtext (Farbwechsel ohne Überblendung: kein Registereintrag nötig) */
export const linkKlassen = 'text-tinte underline decoration-strich underline-offset-4 hover:decoration-tinte';
/** Seitenrand und Satzspiegel */
export const seitenKlassen = 'mx-auto w-full max-w-seite px-4 md:px-8 lg:px-12';
