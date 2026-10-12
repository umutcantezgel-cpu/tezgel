# E4-NACH-16 · Rückgabe Prüfer (Arbeitsmodell)

## GEÄNDERTE DATEIEN
- `_werkstatt/werkzeuge/bewegung.mjs` (einzige Werkzeugdatei)
- `_werkstatt/belege/e4-nach/bewegung/**` (Folgen, Register, Reduziert, Bildrate-Kurzlauf, `BEWEGUNG.md`)
- `_werkstatt/pakete/E4-NACH-16.rueckgabe.md`

Keine Projektdateien. Prüfstufe A schreibt nur gitignored Caches (`_werkstatt/cache/texte/E4-NACH-01`) und den Scratchpad.

## WAS UND WARUM (Werkzeug)
- `AUSLOESER`: `einzugsband` seite, `fugenband` und `leitachse` scroll, `verband` wahl. `sig-plan` wird zur Laufzeit seite bei `data-flucht="laden"`, sonst hover.
- Auslöser seite: kein Scroll zum Element mehr (Ursache des 80-px-Streifens). Ganze Ansicht bei Scroll 0; liegt das Element unterhalb des ersten Bildschirms, Ausschnitt mindestens 400 px hoch.
- Scrollmodus: Durchgang Eintritt bis Austritt, Positionen 10/30/50/70/90 %, Bild = ganze Ansicht. Neue Felder `anteil`, `wirkbereich_px`; `scroll_y` ist der Istwert.
- Wahl: je Wechsel eine Folge aus `vorher` (0 %), `echtzeit` (1–3, mit `ms_nach_klick`) und `nachher` (4). Abweichung: Radiofelder per Wert (drittel, kreuz) statt „zweites bzw. drittes“, weil das Markup Kreuz, Halb (Start), Drittel lautet.
- Bildrate: neu `anteile_je_lauf`, `anteile_pipeline_je_lauf`, `hinweis` („Median je Feld, nicht aus derselben Zeile“), `zusatz.*.anteil_prozent`. Kopfwert bleibt Median der Anteile.
- Rückwärtskompatibel: alle bestehenden Felder bleiben. Alte Optionen laufen; `--ausschnitt ansicht` ist im Scrollmodus ohne Wirkung und wird befundet.

## GEMEINSAME DATEIEN
Keine geändert. Zur Entscheidung:
1. `src/components/kern/Zeitband.tsx:22` eslint `react-hooks/immutability` (Fehler). Prüfstufe A: Lint ROT.
2. Textvergleich ROT: 6 Zeilen entfernt, darunter Adresszeile „Hohwardstraße 14 · 35614 Aßlar“ (`/standorte`, Hauptbereich), „#1 Fachbetrieb in Wetzlar & Region“ (`/standorte/wetzlar`), drei Linktexte „Gewerk … ansehen“ (`/leistungen/bad`). 27 Textspannen ohne Erlaubnis entfernt (`/fliesen` 7, `/ueber-uns` 7, `/standorte/wetzlar` 8, `/leistungen/bad` 4, `/standorte` 1). Nicht von mir; Erlaubnisliste oder Wiederherstellung durch den Orchestrator.

## PRÜFUNG UND ERGEBNIS
- HEAD ist c0002fa (Briefing nannte d5aea3b). `git status --short`: `M _werkstatt/werkzeuge/bewegung.mjs`; `?? _werkstatt/belege/e4-nach/bewegung/`; elf `M` Projektdateien fremder Baumeister (u. a. `kontakt/page.jsx`, `leistungen/page.jsx`, `standorte/*`, `components/maps/*`); `?? _werkstatt/pakete/E4-NACH-08/09.rueckgabe.md`.
- `node --check` grün. Alle 13 Folgen und der Kompatibilitätslauf liefern Bilder.
- Prüfstufe A (E4-NACH-01, Briefing-Ansichten): tsc GRÜN (0 Fehler); eslint ROT (1 Fehler, s. o.); Funktionstests GRÜN (290 erwartet, 0 unerwartet, 0 flaky); Bilder GRÜN (alle HTTP 200, Konsole 0, Überlauf 0; Überlappung `/` 25, `/bad` 2); Texte ROT (s. o.). Gesamt ROT, Exit 1, Laufzeit 951 s. Log: Scratchpad `E4-NACH-16/pruefe-a-lauf.log`.
- Register (m390 und d1440): unbekannte Kennungen 0. Ohne data-motion nur Farbübergänge an Links (`/bad` m390, `/ueber-uns` 1).
- Reduziert (10 Läufe): 0 Bewegungsbefunde; „unsichtbar“ überwiegend `display:none`.
- Bildrate-Kurzlauf `/` m390: Format korrekt. Die Zahlen liefen unter Fremdlast und sind nicht als Befund verwertbar.

## BILDBELEGE
`_werkstatt/belege/e4-nach/bewegung/`: `BEWEGUNG.md` mit Folgentabelle und Auffälligkeiten; `einzel-*` (Ordner je Seite, Kennung, Ansicht); `kompat-ueber-uns-fugenband-m390-ausschnitt-ansicht`; `register-*` und `reduziert-*` je Seite und Ansicht; `bildrate-start-m390`.

## OFFENE FRAGEN
1. **Zeitmodus der Laser-Animationen (wichtigster Punkt).** Die Stände 25/50/75 % werden nicht sauber erreicht. `sig-kreuzlinie` m390: Bilder 2 bis 4 identisch, das Lot ist schon bei 25 % voll (Produktion 4310 ebenso). In den Tests änderten JS-Pause, JS-Seek und CDP-Seek das Bild bei composited Animationen (Laser, Produktion und Dev) und Übergängen (Verband) nicht. Verband-Folgen sind deshalb Echtzeit-Abtastungen. Akzeptieren oder anderen Ansatz wählen?
2. **Einzugsband m390 ohne sichtbare Änderung.** Das Band beginnt bei y 780 (Ansicht 844), die Zonen ab y 817 liegen unter der Bodenleiste. Die Regel „unterhalb des ersten Bildschirms“ greift nicht. Vorschlag: Ausschnitt, wenn das Element nicht vollständig im sichtbaren Bereich liegt.
3. Radiofelder per Wert statt Position (Abweichung von „zweites bzw. drittes“). Bestätigen?
4. `druck`-Element mit Deckkraft 0,40 (`/` d1440) und 0,50 (`/fliesen` m390): nicht per Selektor zuzuordnen. Ursache offen.
5. sig-plan-Folgen (Raster-Versatz) ändern nur 0,4 bis 2,2 % der Pixel, im Gesamtbild schwach.
