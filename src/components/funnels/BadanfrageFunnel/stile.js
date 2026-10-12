// Klassen der Badanfrage (E-011, Q-01 im KERN v2): aus kern/stile.ts abgeleitet, keine freien Werte.
// Optik wie die Express-Anfrage (TezgelAnfrageFunnel): Auswahl über wahlKlassen (gewählt = Tinte über aria-pressed,
// Farbwechsel ohne Überblendung), Felder über feldKlassen. Spalten richten sich nach der Breite des Behälters
// (`@container` in index, Erfolg, WhatsAppGeoeffnet), nicht nach dem Fenster: Der Funnel steht in Seiten verschiedener Breite.
import { feldKlassen, wahlKlassen } from '@/components/kern/stile';

export const inputClass = feldKlassen;

/** Maße in Mono mit festen Ziffernbreiten (K-006: Messbares in Mono); sonst wie feldKlassen */
export const zahlClass = `${feldKlassen.replace('font-text', 'font-mono')} tabular-nums`;

/** Behälter: Rahmen Strich, Fläche Fliese, kein Abheben; Innenabstand nach Behälterbreite (wie die Express-Anfrage) */
export const feldClass = 'border border-strich bg-fliese p-6 @2xl:p-8 @3xl:p-12';

/** Schrittfrage (Absatz wie im Bestand) und ihre Nummer in Mono */
export const frageClass = 'font-text text-fs-4 font-semibold text-tinte';
export const nummerClass = 'font-mono font-normal text-tinte-2';

/** Auswahlkachel mit Titel und Beschreibung (aria-pressed): wahlKlassen über die volle Rasterzelle,
 *  der Inhalt steht links oben (self-start hebt die Mitte von wahlKlassen für das Kind auf) */
export const kachelClass = `${wahlKlassen} h-full w-full`;
export const kachelInhaltClass = 'flex w-full flex-col gap-1 self-start py-1 text-left';

/** Wunschausstattung (aria-pressed): wahlKlassen, Zeichen und Text links */
export const ausstattungClass = `${wahlKlassen} w-full`;
export const ausstattungInhaltClass = 'flex w-full items-center gap-2 text-left';
