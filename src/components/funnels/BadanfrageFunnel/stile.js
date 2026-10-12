// Klassen der Badanfrage (E-011, E3-Vorlauf): aus kern/stile.ts abgeleitet, keine freien Werte.
// Farbwechsel ohne Überblendung (E-016); gewählt = Tinte wie wahlKlassen, Signatur unverändert.
import { feldKlassen } from '@/components/kern/stile';

export const inputClass = feldKlassen;

/** Auswahlkarte; padding nur aus der Abstandsskala (p-4, p-6). Nebentexte: gewählt text-nacht-2, sonst text-tinte-2 */
export const optionClass = (selected, padding = 'p-6') =>
    `group flex h-full flex-col gap-2 ${padding} border text-left font-text text-fs-2 ${
        selected ? 'border-tinte bg-tinte text-kalk' : 'border-strich bg-fliese text-tinte hover:border-tinte'
    }`;
