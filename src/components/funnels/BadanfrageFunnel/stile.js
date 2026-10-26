// Klassen der Badanfrage (E-011, Q-01 im KERN v2, Fusion F-04 nach E-039): aus kern/stile.ts abgeleitet, keine freien Werte.
// Optik wie die Express-Anfrage (TezgelAnfrageFunnel): Auswahl über wahlKlassen (gewählt = Tinte über aria-pressed,
// Farbwechsel ohne Überblendung), Felder über feldKlassen. Spalten richten sich nach der Breite des Behälters
// (`@container` an der Wurzel in index), nicht nach dem Fenster: Der Funnel steht in Seiten verschiedener Breite,
// auf allen /bad-Seiten in der 8/12-Spalte neben der Rückfrage (d1440 etwa 795 px).
import { feldKlassen, wahlKlassen } from '@/components/kern/stile';

export const inputClass = feldKlassen;

/** Maße in Mono mit festen Ziffernbreiten (K-006: Messbares in Mono); sonst wie feldKlassen */
export const zahlClass = `${feldKlassen.replace('font-text', 'font-mono')} tabular-nums`;

/** Behälter: Rahmen Strich, Fläche Fliese, kein Abheben; Innenabstand nach Behälterbreite (wie die Express-Anfrage).
 *  Schmal (unter 16rem, bei großer Systemschrift): weniger Innenabstand, damit Kacheln und „Weiter“ Platz für Wörter haben (E4-W1, F1) */
export const feldClass = 'border border-strich bg-fliese p-6 @max-3xs:p-4 @2xl:p-8 @3xl:p-12';

/** Schrittfrage (Absatz wie im Bestand) und ihre Nummer in Mono */
export const frageClass = 'font-text text-fs-4 font-semibold text-tinte';
export const nummerClass = 'font-mono font-normal text-tinte-2';

/** Auswahlkachel mit Titel und Beschreibung (aria-pressed): wahlKlassen über die volle Rasterzelle,
 *  der Inhalt steht links oben (self-start hebt die Mitte von wahlKlassen für das Kind auf). min-w-0: die Kachel
 *  schrumpft mit der Spalte statt über den Rand zu ragen; wrap-break-word: lange Wörter (Komposita) brechen bei großer Schrift */
export const kachelClass = `${wahlKlassen} h-full w-full min-w-0`;
export const kachelInhaltClass = 'flex w-full min-w-0 flex-col gap-1 self-start py-1 text-left hyphens-auto wrap-break-word';

/** Wunschausstattung (aria-pressed): wahlKlassen, Zeichen und Text links; bei großer Schrift schrumpft das Feld mit der Spalte,
 *  lange Wörter trennen nach Silben (lang="de") */
export const ausstattungClass = `${wahlKlassen} w-full min-w-0`;
export const ausstattungInhaltClass = 'flex w-full min-w-0 items-center gap-2 text-left hyphens-auto wrap-break-word';

/** Fehlermeldung über den Sendeknöpfen (K-005: Rahmen + Versatz-Zeichen + Text): umlaufend 1 px Strich (aus A),
 *  Kantenstrich links in Laser und Kalk-Grund (aus B); Rot nur an Kante und Zeichen, kein rundum roter Rahmen */
export const fehlerClass = 'flex items-start gap-3 border border-l-2 border-strich border-l-laser bg-kalk p-4 text-fs-2 text-tinte';
