// Klassen des Fliesen-Konfigurators (E-011, E3-Vorlauf): aus kern/stile.ts abgeleitet, keine freien Werte.
// Farbwechsel ohne Überblendung (E-016); gewählt = Tinte wie wahlKlassen, Signatur (selected) unverändert.
import { feldKlassen, labelKlassen, linkKlassen } from '@/components/kern/stile';

export const inputClass = feldKlassen;

const WAHL_BASIS = 'border text-left font-text text-fs-2';
const GEWAEHLT = 'border-tinte bg-tinte text-kalk';
const OFFEN = 'border-strich bg-fliese text-tinte hover:border-tinte';

/** Auswahlkarte; Nebentexte darin: gewählt text-nacht-2, sonst text-tinte-2 */
export const cardOptionClass = (selected) =>
    `flex h-full flex-col gap-2 p-4 ${WAHL_BASIS} ${selected ? GEWAEHLT : OFFEN}`;

/** Auswahlchip */
export const chipOptionClass = (selected) =>
    `inline-flex min-h-11 items-center justify-center px-3 py-2 text-center ${WAHL_BASIS} ${selected ? GEWAEHLT : OFFEN}`;

export const legendClass = `${labelKlassen} mb-2`;
export const labelClass = labelKlassen;
export const linkClass = `${linkKlassen} font-semibold`;
