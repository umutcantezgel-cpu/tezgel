# E4-NACH-09 · Rückgabe Baumeister

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/standorte/page.tsx`
- `src/app/(bestand)/standorte/[stadt]/page.tsx`
- `src/components/locations/RouteVisualization.tsx`
- `src/components/locations/LocationContact.tsx`
- `src/components/maps/LocalDominanceMap.tsx`

Keine weitere Datei geändert.

## WAS UND WARUM
- **Befund 23 (/standorte, Hauptstandort):** Die Karte bleibt hinter der Einwilligung, ohne eigenen Infokasten (`showInfoBox={false}`). Daneben steht ein Schriftfeld mit Anschrift, Telefon und Zeiten, darunter der Link „Route planen“. Abweichung vom Befund: Die Karte wird nicht ersetzt, weil `funktion-einwilligung.spec.mjs` den Knopf „Karte laden & zustimmen“ im Abschnitt „Unser Hauptstandort in Aßlar“ verlangt. Das ist der Fallback des Briefings.
- **Befund 24 (/standorte, Städte):** Eigenes Raster mit Fugen an rechter und unterer Kante. Leere Restzellen der letzten Reihe bleiben Fliese statt Grau. Region und Entfernung sind je `whitespace-nowrap`, das Etikett bricht nicht mehr.
- **Befund 27/28/29 ([stadt], Einsatzgebiet):** Die Komponente ist hell, ohne Navy und ohne Radar. Die Zonenliste nutzt `Einzugsband aktuell={slug} kompakt form="stapel"`; stapelnd, damit kein rotes Lot entsteht. Die Badge „#1 Fachbetrieb …“ entfällt, auch im Default der Komponente. Sterne stehen nur bei ★-Angaben.
- **Befund 30 ([stadt], Anfahrt und Formular):** Die drei Schritte stehen ab `sm` dicht in einer Zeile, mit Fugen statt gefüllter Felder. Das Schnellformular liegt nicht mehr im Abschluss, sondern im Raster 8/4 mit `Rueckfrage` rechts (ab lg). Props und Texte unverändert.
- **Tempo:** `spaet` an RouteVisualization und LocationContact (Schalter, Standard aus; /kontakt unverändert). Schnellformular per `dynamic`.

## GEMEINSAME DATEIEN (gewünscht, nicht geändert)
1. `src/components/kern/Feldraster.tsx`: `gap-px` mit `bg-fuge` lässt leere Restzellen grau. Gewünscht: Fugen über die Zellenränder, leere Zellen in Fliese.
2. `src/components/ui/FinalCTA.tsx`: Das Formular bei `showQuickForm` steht zentriert (`mx-auto max-w-mass`). Dasselbe gilt für `src/app/(bestand)/leistungen/[id]/[stadt]/page.tsx:405`. Vorschlag: wie auf der Stadtseite umsetzen.
3. `src/components/sections/QualityPromise.tsx` (Bestand, [stadt]): ohne `spaet`. Die Tempo-Regel verlangt es nach dem Einstieg.

## PRÜFUNG UND ERGEBNIS
- Prüfstufe A (`/standorte`, `/standorte/wetzlar`, `/standorte/giessen`): Typprüfung grün (0 Fehler), Lint grün (0/0), Funktionstests grün (58 erwartet, 0 unerwartet, 0 flaky), Bilder grün (HTTP 200, Konsole 0, Überlauf 0, Überlappung 0).
- Textvergleich rot gegen den älteren Stand e0 (nicht HEAD); Ursache Fuß und Merkliste, nicht meine Dateien. Textprobe gegen HEAD: 0 Wörter entfernt.
- `werte.mjs`: 0 Befunde in den fünf Dateien.
- Schreibrechte: Commit `9651b1d` (Orchestrator) enthält nur meine fünf Dateien und die Rückgabe.
- Nach dem Lauf hat ein anderes Paket `standorte/page.tsx` geändert: `InteractiveMap` lädt jetzt per `dynamic` (E4-NACH-17). Mein Stand ist darauf aufgebaut, `showInfoBox={false}` bleibt wirksam. Nachlauf: eslint 0 Befunde, tsc ohne Fehler in dieser Datei. Die Funktionstests liefen vor dieser Änderung.

## BILDBELEGE
Scratchpad `…/scratchpad/E4-NACH-09/`: `bilder/…` (Prüfstufe A, Ansichten 390 und 1440), `voll/standorte/d1440-voll.jpg`, `voll/wetzlar/d1440-voll.jpg` und die `m390-voll.jpg` je Seite. Die 1440-Ganzseiten sind gesichtet, mobil nur automatisch geprüft.

## MIKROTEXT-ÄNDERUNGEN (alt → neu)
- „#1 Fachbetrieb in {Stadt} & Region“ → entfällt (Befund 28). Default der Komponente „#1 Fachbetrieb Aßlar & Wetzlar“ → entfällt.
- Neu im Schriftfeld Hauptstandort: „Anschrift“, „Telefon“, „Zeiten“ (Wert „Mo - Fr: 07:30 – 18:00 Uhr“).
- Adresse: zwei Zeilen „Hohwardstraße 14“ / „35614 Aßlar“ → eine Zeile „Hohwardstraße 14, 35614 Aßlar“, gleicher Wortlaut.
- Unverändert verschoben: „Route planen“ (vorher im Infokasten), „Anfrageformular wird geladen...“ (vorher in FinalCTA).
- Bestandstexte „Radius: ca. 25 km“ und „100% DSGVO-konform“ bleiben. Vorschlag: DSGVO-Zeile in `LeadQuickForm.tsx:222` prüfen.

## OFFENE FRAGEN
1. Befund 24, Ortsleiste rechts abgeschnitten: Ursache liegt nicht in meinen Dateien, vermutlich in `src/components/maps/InteractiveServiceMap.tsx` (Satelliten-Labels um Zeile 86–110, Fußleiste um Zeile 222). Nicht geändert, nicht geprüft.
2. `Einzugsband` (kern, fremd) setzt zwei kleine rote Fugenkreuze (Firmensitz, eigene Stadt). K-003 Regel 2 prüfen.
3. Auf [stadt] folgen „Unsere Leistungen“ (Feldraster 4) und „Weitere Einsatzgebiete“ (Feldraster 3) direkt aufeinander, gleiche Bauart. Nicht geändert, außerhalb der Befunde.
4. In `standorte/page.tsx` steht der `dynamic`-Import von `InteractiveMap` nach einer Konstante (fremde Änderung). Bei strenger Import-Regel meldet eslint das noch nicht, Verschieben nach oben wäre sauberer. Nicht geändert.
