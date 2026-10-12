// Klassen der Express-Anfrage (E2-ORCH-08): aus kern/stile.ts abgeleitet, keine freien Werte.
import { feldKlassen, wahlKlassen } from '@/components/kern/stile';

export const inputClass = feldKlassen;

/** Auswahlknopf; der Zustand steht in aria-pressed (wahlKlassen färbt danach) */
export const optionClass = wahlKlassen;

/** Projektfeld in Schritt 1 (aria-pressed); steht im Feldraster mit 1-px-Fugen, daher ohne eigenen Rahmen (E4-NACH-05):
 *  Zeigen hellt das Feld auf Kalk ab, gewählt ist es Tinte */
export const projektClass =
  'flex h-full flex-col justify-between gap-6 bg-fliese p-4 text-left text-tinte hover:bg-kalk aria-pressed:bg-tinte aria-pressed:text-kalk';
