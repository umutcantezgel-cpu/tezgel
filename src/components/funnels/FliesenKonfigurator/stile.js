// Klassen des Fliesen-Konfigurators (Q-05, KERN v2): aus kern/stile.ts abgeleitet, keine freien Werte.
// Farbwechsel ohne Überblendung (E-016): Auswahlknöpfe und Felder tragen kein transition-* und keinen Registereintrag;
// gewählt = Tinte-Fläche über aria-pressed (wie wahlKlassen und die Projektkacheln der Express-Anfrage).
// Spalten richten sich nach der Breite des Konfigurators (@container in index.jsx und den Meldungen), nicht nach dem Fenster.
import { feldKlassen, hilfeKlassen, labelKlassen, linkKlassen, wahlKlassen } from '@/components/kern/stile';

export const inputClass = feldKlassen;

/** Zahlenfeld (Fläche, Sockel, Stufen, Maße): Wert und Platzhalter in Mono (K-006) */
export const zahlClass = feldKlassen.replace('font-text', 'font-mono');

/** Auswahlknopf in Gruppen (aria-pressed färbt) */
export const chipOptionClass = wahlKlassen;

/** Auswahlkachel mit Titel und Beschreibung (aria-pressed färbt die Fläche, den Nebentext setzt nebenClass) */
export const cardOptionClass =
    'flex h-full w-full flex-col gap-2 rounded-none border border-strich bg-fliese p-4 text-left font-text text-tinte hover:border-tinte aria-pressed:border-tinte aria-pressed:bg-tinte aria-pressed:text-kalk';

/** Nebentext in einer Kachel: auf Tinte Nacht-Text (8,45 : 1), sonst Tinte-2 */
export const nebenClass = (selected) => (selected ? 'text-nacht-2' : 'text-tinte-2');

export const legendClass = labelKlassen;
export const labelClass = labelKlassen;
/** Hilfetext unter einem Feld bzw. einer Legende (mit Abstand nach oben) */
export const hintClass = hilfeKlassen;
/** Hilfetext als eigener Absatz in einer Spalte mit Zwischenraum (ohne eigenen Abstand) */
export const absatzHintClass = 'font-text text-fs-2 text-tinte-2';
/** Zusatz in einer Beschriftung, z. B. „(optional)“ */
export const zusatzClass = 'font-normal text-tinte-2';
export const linkClass = `${linkKlassen} font-semibold`;

/** Merkhinweis (wie Hinweis „merk“): Rahmen Strich, Kante links, Info-Zeichen */
export const merkClass = 'flex items-start gap-3 border border-l-2 border-strich bg-kalk p-4 font-text text-fs-2 text-tinte';
