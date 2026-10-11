// Gemeinsame Teile aller Vorlagen (P4-10a, KERN v1.2): Fachseite, Übersicht, Liste, Artikel und Detail bauen daraus.
// Import: `import { Abschnitt, Einstieg, Feldliste } from '@/components/kern/vorlagen/teile'`.
// Zuordnung alt → gemeinsam: Rückgabe P4-10a, Tabelle „alt → gemeinsam“. Kein Text in den Teilen (Ausnahme: `SchriftfeldBetrieb`
// setzt vorhandenen Kern-Wortlaut zusammen, E-027). Server-Komponenten ohne Hooks außer `useId`.
// Wortbruch: Überschriften wählen ihre Stufe nach dem längsten Wort (`stufeNachWort`, `satz.ts`), Raster ihre Spalten nach dem
// Platz des Behälters (`Fugenraster`, Container-Abfragen). `UMBRUCH` bleibt nur als Netz für 400 % Zoom.
export { default as Abschnitt, Abschnittskopf, Nachsatz, kopfStufe, type AbschnittProps, type AbschnittKopfProps, type AbschnittRahmenProps, type KopfLage, type KopfGroesse } from '@/components/kern/vorlagen/teile/Abschnitt';
export { default as Einstieg, type EinstiegProps, type Kennung } from '@/components/kern/vorlagen/teile/Einstieg';
export { default as Felder, Feldliste, type Feld, type FelderProps, type FeldlisteProps } from '@/components/kern/vorlagen/teile/Felder';
export { Fugenraster, Fugenfeld, type Spalten, type FugenrasterProps, type FugenfeldProps } from '@/components/kern/vorlagen/teile/Fugenraster';
export { default as Handlungsfeld, type HandlungsfeldProps } from '@/components/kern/vorlagen/teile/Handlungsfeld';
export { default as Knopfreihe, type KnopfreiheProps } from '@/components/kern/vorlagen/teile/Knopfreihe';
export { Mass, Trenner } from '@/components/kern/vorlagen/teile/Mass';
export { Pfeillink, Ruecklink } from '@/components/kern/vorlagen/teile/Pfeillink';
export { Punkte, Zusagen, type PunkteProps, type ZusagenProps } from '@/components/kern/vorlagen/teile/Punkte';
export { default as Schriftfeld, SchriftfeldBetrieb, type SchriftfeldProps, type SchriftfeldEintrag } from '@/components/kern/vorlagen/teile/Schriftfeld';
export { default as PlanDerSeite } from '@/components/kern/vorlagen/teile/PlanDerSeite';
export { default as Querverweise, Verweisblock, Verweisliste, type QuerverweiseProps, type VerweisblockProps, type VerweislisteProps, type VerweisForm } from '@/components/kern/vorlagen/teile/Verweise';
export { stufeNachWort, stufeFuerAlle, laengstesWort, wortbreite, woerter, textVon, SCHWELLEN, type Stufe, type Ort, type Lage } from '@/components/kern/vorlagen/teile/satz';
export { UMBRUCH, feldFlaeche, istText, type Aktion, type Dichte, type Ebene, type Flaeche, type KnopfAngabe, type Seitenart, type Verweis } from '@/components/kern/vorlagen/teile/typen';
