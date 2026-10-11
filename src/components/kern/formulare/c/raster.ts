// Behälter-Raster der Kern-Formulare F-04 bis F-08 (P4-10b, KERN v1.2 K-007): Spalten, Innenabstände und Knopfreihen
// richten sich nach der Breite des Behälters (Container-Queries, Tailwind `@xs:` … `@5xl:`), nicht nach dem Fenster.
// Dasselbe Formular steht in Spalten verschiedener Breite (Seite, Seitenleiste, Einstieg). Jede Ansicht legt dafür
// `BEHAELTER` um ihre Wurzel; der Behälter bekommt seine Breite vom Elternteil (Block, Rasterzelle, Flex-Spalte), nie vom
// eigenen Inhalt (inline-size containment).
// Schwellen (Behälterbreite, Tailwind-Standard: @xs 20 · @sm 24 · @md 28 · @lg 32 · @xl 36 · @2xl 42 · @3xl 48 · @4xl 56 ·
// @5xl 64 rem) aus dem längsten Wort bzw. Platzhalter je Raster bei größter Schrift (text-k-3 = 19 px ab ≈ 1340 px Fenster);
// Herleitung je Raster in der Rückgabe P4-10b. Ab 18 rem bricht kein Wort mitten im Wort; `wrap-break-word` bleibt nur
// das Netz für 400 % Zoom. Wörtliche Klassen, damit Tailwind sie findet.

/** Wurzel jeder Formular-Ansicht: Abfragebehälter für alle `@…:`-Varianten darin. */
export const BEHAELTER = '@container';

/** Innenabstand der Formularfelder: 12 px unter 20 rem (Platz für „Komplettbadsanierung“ bei 18 rem), 24 px ab 20 rem,
 *  48 px ab 42 rem (wie bisher ab 1024 px Fenster). */
export const INNEN = 'p-k-3 @xs:p-k-5 @2xl:p-k-7';
/** Kopf der Formularfelder (gleiche Flucht wie INNEN). */
export const KOPF_INNEN = 'px-k-3 py-k-5 @xs:px-k-5 @2xl:px-k-7';

/** Seitlicher Innenabstand einer Auswahlkachel bzw. Ankreuzzelle: 8 px unter 24 rem, sonst 16 px wie im Baustein. */
export const ZELLE_RAND = 'px-k-2 @sm:px-k-4';

/** Kachelraster mit langen Titeln (Badanfrage Objektart und Umfang, „Komplettbadsanierung“ 200 px): zwei Spalten ab 42 rem. */
export const KACHELN_LANG = '@2xl:grid-cols-2';
/** Kachelraster mit kurzen Titeln (≤ 122 px, z. B. Qualitätsstufe, Umfang): zwei ab 28 rem, drei ab 42 rem. */
export const KACHELN_KURZ = '@md:grid-cols-2 @2xl:grid-cols-3';
/** Kachel- und Ankreuzraster mit Wörtern bis 165 px in 19 px („Doppelwaschtisch“ 162 px): zwei ab 36 rem, drei ab 56 rem. */
export const KACHELN_MITTEL = '@xl:grid-cols-2 @4xl:grid-cols-3';
/** Ankreuzraster mit sehr langen Wörtern („Holzwerkstoffplatten“ 183 px): zwei Spalten ab 36 rem. */
export const ANKREUZ_LANG = '@xl:grid-cols-2';

/** Kontaktfelder: zwei Spalten ab 36 rem (E-Mail-Platzhalter 191 px passt ganz). */
export const KONTAKT = 'grid grid-cols-1 gap-k-5 @xl:grid-cols-2';
/** Felderpaar mit langem Platzhalter („Für die Rücksprache zum Aufmaß“): untereinander bis 48 rem. */
export const PAAR_LANG = '@xl:col-span-2 @3xl:col-span-1';
/** Platzhalter in Textschrift: Telefonfelder setzen die Eingabe in Mono (K-005, Feld), ein Satz als Platzhalter ist aber
 *  kein Messwert – in Mono wäre er 342 statt 277 px breit und bräche schon in mittleren Spalten ab. Am Feldrahmen gesetzt
 *  (`className` von Feld), wirkt auf das Eingabefeld darin. */
export const PLATZHALTER_TEXT = '**:placeholder:font-k-text';
/** Feld über die ganze Zeile im Kontaktraster. */
export const GANZE_ZEILE = '@xl:col-span-2';

/** Fußleiste Zurück/Weiter: nebeneinander ab 28 rem. */
export const FUSSLEISTE = 'flex flex-col-reverse gap-k-3 border-t border-k-fuge pt-k-5 @md:flex-row @md:items-center @md:justify-between';
/** Zwei Knöpfe nebeneinander (Anrufen + Neu, Absenden + WhatsApp): ab 48 rem, darunter untereinander in voller Breite. */
export const KNOPFREIHE = 'flex flex-col gap-k-3 @3xl:flex-row';
