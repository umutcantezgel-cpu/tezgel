// Klassen der Express-Anfrage (E2-ORCH-08): aus kern/stile.ts abgeleitet, keine freien Werte.
import { feldKlassen, wahlKlassen } from '@/components/kern/stile';

export const inputClass = feldKlassen;

/** Auswahlknopf; der Zustand steht in aria-pressed (wahlKlassen färbt danach); lange Wörter trennen bei großer Schrift nach Silben */
export const optionClass = `${wahlKlassen} hyphens-auto wrap-break-word`;

/** Projektfeld in Schritt 1 (aria-pressed); steht im Feldraster mit 1-px-Fugen, daher ohne eigenen Rahmen (E4-NACH-05):
 *  Zeigen hellt das Feld auf Kalk ab, gewählt ist es Tinte.
 *  Fokus (R-01b, Muster FliesenKonfigurator/stile.js `feldClass`): Das fokussierte Feld steigt über die Nachbarn (relative,
 *  z-10), sonst überdeckt das später gezeichnete Nachbarfeld den Ring (2 px Tinte, Abstand 2 px aus globals.css). Den
 *  Abstand füllt eine Fliese-Linie (::before ohne Abstand), außen am Ring liegt eine zweite (::after), damit der Ring auch
 *  neben bzw. auf einem gewählten (Tinte-)Feld frei steht. Nur bei Fokus und nicht unter forced-colors (dort Highlight). */
export const projektClass =
  'relative flex h-full flex-col justify-between gap-6 bg-fliese p-4 text-left text-tinte hover:bg-kalk aria-pressed:bg-tinte aria-pressed:text-kalk ' +
  'focus-visible:z-10 focus-visible:before:pointer-events-none focus-visible:before:absolute focus-visible:before:inset-0 focus-visible:before:outline-2 focus-visible:before:outline-offset-0 focus-visible:before:outline-fliese forced-colors:before:hidden ' +
  'focus-visible:after:pointer-events-none focus-visible:after:absolute focus-visible:after:inset-0 focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-fliese forced-colors:after:hidden';
