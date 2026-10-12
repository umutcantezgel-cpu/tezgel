// Klassen des Fliesen-Konfigurators (F-06, Fusion E-039: Grundgerüst Q-05/B, Auswahl als Fugenraster aus E4-NACH-13/A):
// aus kern/stile.ts abgeleitet, keine freien Werte. Farbwechsel ohne Überblendung (E-016): Auswahlfelder und Felder tragen
// kein transition-* und keinen Registereintrag. Spalten richten sich nach der Breite des Konfigurators bzw. der Gruppe
// (@container), nicht nach dem Fenster – so bricht das Raster auch bei 200 % Zoom einspaltig um.
import { feldKlassen, hilfeKlassen, labelKlassen, linkKlassen } from '@/components/kern/stile';

export const inputClass = feldKlassen;

/** Zahlenfeld (Fläche, Sockel, Stufen, Maße): Wert und Platzhalter in Mono (K-006) */
export const zahlClass = feldKlassen.replace('font-text', 'font-mono');

/** Fugenraster einer Auswahl: Felder mit gemeinsamen 1-px-Kanten (K-003 „Fuge statt Karte“, wie die Express-Anfrage) */
export const rasterClass = 'grid gap-px border border-fuge bg-fuge';

/**
 * Auswahlfeld im Fugenraster (aria-pressed trägt der Knopf): Fliese, Zeigen Kalk, gewählt Tinte mit Haken.
 * Fokus (Gutachten u6, Stolperstein a): Das fokussierte Feld steigt über die Nachbarn (relative, z-10), sonst überdeckt das
 * Nachbarfeld den Ring (outline 2 px, Abstand 2 px, K-009). Den 2-px-Abstand zwischen Feld und Ring füllt eine Fliese-Linie
 * (Outline des ::before ohne Abstand, liegt genau im Zwischenraum, nicht auf dem Ring), damit der Ring auch neben einem
 * gewählten (Tinte-)Feld frei steht; eine zweite Fliese-Linie außen am Ring (::after) macht ihn zweifarbig, so bleibt er auch
 * zwischen zwei gewählten Feldern sichtbar. Nur bei Fokus und nicht unter forced-colors (dort gilt der Ring in Highlight).
 * kompakt: kurze Paare und Dreier (Ja/Nein/Weiß nicht, Innen/Außen) mit weniger Innenabstand.
 */
export const feldClass = (selected, kompakt = false) =>
    [
        'relative flex h-full min-h-11 w-full min-w-0 justify-between text-left font-text',
        kompakt ? 'items-center gap-2 px-3 py-3' : 'items-start gap-3 p-4',
        'focus-visible:z-10 focus-visible:before:pointer-events-none focus-visible:before:absolute focus-visible:before:inset-0 focus-visible:before:outline-2 focus-visible:before:outline-offset-0 focus-visible:before:outline-fliese forced-colors:before:hidden',
        'focus-visible:after:pointer-events-none focus-visible:after:absolute focus-visible:after:inset-0 focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-fliese forced-colors:after:hidden',
        selected ? 'bg-tinte text-kalk hover:bg-tinte-2' : 'bg-fliese text-tinte hover:bg-kalk'
    ].join(' ');

/** Nebentext in einem Feld: auf Tinte Nacht-Text (8,45 : 1), sonst Tinte-2 */
export const nebenClass = (selected) => (selected ? 'text-nacht-2' : 'text-tinte-2');

/** Haken am Feld: immer gesetzt, ungewählt unsichtbar – die Zeile bricht beim Wählen nicht neu um */
export const hakenClass = (selected) => (selected ? '' : 'invisible');

export const legendClass = labelKlassen;
export const labelClass = labelKlassen;
/** Hilfetext unter einem Feld bzw. einer Legende (mit Abstand nach oben) */
export const hintClass = `${hilfeKlassen} max-w-mass`;
/** Hilfetext als eigener Absatz in einer Spalte mit Zwischenraum (ohne eigenen Abstand), Zeilenmaß max-w-mass */
export const absatzHintClass = 'max-w-mass font-text text-fs-2 text-tinte-2';
/** Zusatz in einer Beschriftung, z. B. „(optional)“: heller, nicht fett */
export const zusatzClass = 'font-normal text-tinte-2';
export const linkClass = `${linkKlassen} font-semibold`;

/** Merkhinweis (wie Hinweis „merk“, Fläche Kalk wie in B): Rahmen Strich, Kante links, Info-Zeichen, Zeilenmaß max-w-mass */
export const merkClass = 'flex max-w-mass items-start gap-3 border border-l-2 border-strich bg-kalk p-4 font-text text-fs-2 text-tinte';
