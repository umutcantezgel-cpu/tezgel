// Vorlage Fachseite (P4-01, KERN v1.2) – Erzählseiten wie /bad/badsanierung, /fliesen/*, /untergrund-abdichtung/*,
// /balkon-terrasse/*, /naturstein/*, /treppen/*, /fliesenreparatur, /schadensanalyse, /foerderung (Seitenart laut
// `_relaunch/GRUNDMENGE.json`, Feld `seitenart` = „erzaehl“).
// Import: `import { Einstieg, Ablauf, Fragen } from '@/components/kern/vorlagen/fachseite'`.
//
// Regeln für die Seiten (Wellen W1, W4, W5):
// 1. Wortlaut wörtlich aus der Bestandsseite als Props; die Vorlage enthält keinen Seitentext. Daten (Telefon, Inhaber,
//    Kammer, Bewertungen) aus `@/config/*`, nie fest im Markup. Verlaufsschrift-Spans des Bestands entfallen, ihr Text bleibt
//    (H1: Teil nach dem Doppelpunkt bzw. nach `<br />` → `unterzeile`; H2: Teile mit Leerzeichen zu einem Titel verbinden).
// 2. IDs und Anker des Bestands mitgeben (`titelId="workflow-heading"`, `id="anfrage"`), Reihenfolge der Abschnitte wie im Bestand.
// 3. Ein Abschnitt je Bestandsabschnitt (Tabelle „Bestandsabschnitt → Vorlagen-Abschnitt“ in der Rückgabe P4-01).
// 4. Struktur und Dichte wechseln (K-011): nie zweimal hintereinander dieselbe Anordnung; Wechsel z. B.
//    Ablauf (Linie, luftig) → Felder raster (dicht) → Tabelle (Fläche Fliese) → Felder zeilen → Fragen (Kopf seitlich).
//    `flaeche="fliese"` dort, wo der Bestand einen weißen Streifen mit Linien oben und unten setzt.
// 5. Bewegung: `auftritt` auf höchstens der Hälfte der Abschnitte (K-009, S-02); Ablauf trägt ihn standardmäßig.
//    Kein Signaturmoment auf Fachseiten; der Plan im Einstieg steht ruhend (SIG-3 ruhend, Pläne aus P4-03).
// 6. Gemeinsame Bestandsabschnitte: QualityPromise → `Qualitaetsversprechen`; FinalCTA → `@/components/kern/start/Abschluss`
//    (Kern-Fassung von FinalCTA); Formulare → Kern-Ansichten aus `@/components/kern/formulare` in `Anfrage`.
// 7. FAQ-JSON-LD und Metadaten bleiben Sache der Seite (`createMetadata`, `JsonLd`).
// 8. Messbares im Fließtext mit `Mass` in Mono (DIN 18534, W2-I, R10); „·“ zwischen Texteinheiten mit `Trenner`.
// 9. Einstieg (P4-10a): `motiv={<Plan ruhend />}` mit dem Plan der Seite aus `PLAN_JE_PFAD` (`@/components/kern/motive/plaene`),
//    `schriftfeld={<SchriftfeldBetrieb />}` (E-027; MIKROTEXTE-Zeilen Klasse 3 trägt der Orchestrator mit der Welle ein).
// 10. Kein Wort bricht mitten im Wort (Z-13): Überschriften wählen ihre Stufe selbst (`stufeNachWort`), Raster ihre Spalten nach
//    dem Platz (Container-Abfragen). Seiten setzen keine eigene Schriftgröße und kein `&shy;` in Überschriften.
// Gemeinsame Teile mit Übersicht, Liste, Artikel und Detail liegen seit P4-10a in `../teile`; hier stehen sie unter altem Namen.
export { default as Abschnitt, Abschnittskopf, Nachsatz, type AbschnittProps, type AbschnittKopfProps, type AbschnittRahmenProps } from '@/components/kern/vorlagen/teile/Abschnitt';
export { default as Einstieg, type EinstiegProps } from '@/components/kern/vorlagen/teile/Einstieg';
export { default as Schriftfeld, SchriftfeldBetrieb, type SchriftfeldProps, type SchriftfeldEintrag } from '@/components/kern/vorlagen/teile/Schriftfeld';
export { default as Faktenfeld, Faktenliste, type FaktenfeldProps, type Fakt } from '@/components/kern/vorlagen/fachseite/Faktenfeld';
export { default as Tabelle, Tabellenblock, type TabelleProps, type Tabellenzeile } from '@/components/kern/vorlagen/fachseite/Tabelle';
export { default as Ablauf, Schrittfolge, type AblaufProps, type Schritt } from '@/components/kern/vorlagen/fachseite/Ablauf';
export { default as Felder, Feldliste, type FelderProps, type Feld } from '@/components/kern/vorlagen/teile/Felder';
export { default as Punkteliste, type PunktelisteProps } from '@/components/kern/vorlagen/fachseite/Punkte';
export { Punkte, type PunkteProps } from '@/components/kern/vorlagen/teile/Punkte';
export { default as Notiz, type NotizProps } from '@/components/kern/vorlagen/fachseite/Notiz';
export { default as Stimme, Stimmenfigur, type StimmeProps } from '@/components/kern/vorlagen/fachseite/Stimme';
export { default as Merkfeld, type MerkfeldProps } from '@/components/kern/vorlagen/fachseite/Merkfeld';
export { default as Fragen, type FragenProps, type Frage } from '@/components/kern/vorlagen/fachseite/Fragen';
export { default as Abschluss, type AbschlussProps } from '@/components/kern/vorlagen/fachseite/Abschluss';
export { default as Querverweise, type QuerverweiseProps } from '@/components/kern/vorlagen/teile/Verweise';
export { default as Qualitaetsversprechen, type QualitaetsversprechenProps } from '@/components/kern/vorlagen/fachseite/Qualitaetsversprechen';
export { default as Anfrage, type AnfrageProps } from '@/components/kern/vorlagen/fachseite/Anfrage';
export { default as PlanDerSeite } from '@/components/kern/vorlagen/teile/PlanDerSeite';
export { default as Knopfreihe, type KnopfreiheProps } from '@/components/kern/vorlagen/teile/Knopfreihe';
export { Mass, Trenner } from '@/components/kern/vorlagen/teile/Mass';
export type { KnopfAngabe, Flaeche, Dichte, Ebene, Verweis } from '@/components/kern/vorlagen/teile/typen';
