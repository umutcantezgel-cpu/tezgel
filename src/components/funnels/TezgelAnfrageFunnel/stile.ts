// Klassen der Express-Anfrage (E2-ORCH-08): aus kern/stile.ts abgeleitet, keine freien Werte.
import { feldKlassen, wahlKlassen } from '@/components/kern/stile';

export const inputClass = feldKlassen;

/** Auswahlknopf; der Zustand steht in aria-pressed (wahlKlassen färbt danach) */
export const optionClass = wahlKlassen;

/** Projektkarte in Schritt 1 (aria-pressed) */
export const projektClass =
  'flex h-full flex-col justify-between gap-6 border border-strich bg-fliese p-4 text-left text-tinte hover:border-tinte aria-pressed:border-tinte aria-pressed:bg-tinte aria-pressed:text-kalk';
