# Rückgabe E5-BAU-02 · Baumeister (Arbeitsmodell)

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/untergrund-abdichtung/ausgleich-gefaelle/page.jsx`
- `src/app/(bestand)/untergrund-abdichtung/estrich-belegreife/page.jsx`

Keine weiteren Dateien. Git: nur lesend, kein Commit, kein Push.

## WAS UND WARUM
- **Einstieg** `art="erzaehl"` mit Etikett aus der bisherigen Kennzeile, H1 mit der bisherigen ID (`ausgleich-heading`, `estrich-heading`), Vorspann, zwei Knöpfe. Keine Stichpunkte im bisherigen Einstieg, daher kein `merkmale`.
- **Planblatt** rechts: Ausgleich mit Plan „abdichtung“, Estrich mit Plan „untergrund“, jeweils `ohneAchse bemassung={false} interaktiv`. Blattname = Seitentitel vor „|“ (ohne Ortsangabe).
- **Leitachse** mit neun Abschnitten je Seite, Lesefolge unverändert: Tabelle der Stichmaße, Feldraster für Verfahren, Gefälle und Messverfahren, Fugenlisten für Wand, Grundierung und Heizestrich, Schrittfolge (Estrich), FAQ mit `FAQAccordion`, Anfrage-Knöpfe, Ratgeber als `Merkliste`. Abschnitte wechseln Kalk und Fliese.
- Eyebrow-Badges sind Mono-Etiketten mit gleichem Wortlaut. Icon-Kacheln und lucide-Imports sind entfernt, Icons nur aus `@/components/icons/Icon`.
- Kein Auftritt, keine neue Bewegung, Metadaten, IDs, Links, Knopftexte unverändert.
- Vorlauf: `umbau.mjs` erst im Trockenlauf, dann mit `--schreiben`. Die ZU_PRUEFEN-Stellen (Beliebigwert `min-w`, ungenutzte Icon-Variablen) sind durch den Neubau erledigt.

## GEMEINSAME DATEIEN
Keine Änderung nötig. Keine gemeinsame Datei angefasst.

## PRÜFUNG UND ERGEBNIS
Prüfstufe A, zweiter Lauf nach Korrektur (Log: `scratchpad/E5-BAU-02/pruefe-a.txt`). Gesamt GRÜN, Exit 0.
- Typprüfung (tsc): GRÜN, 0 Fehler in eigenen Dateien, 0 übrige.
- Lint (eslint): GRÜN, 0 Fehler, 0 Warnungen.
- Funktionstests (navigation, kontaktwege): GRÜN, 72 erwartet, 0 unerwartet, 0 flaky.
- Bilder m390/d1440: HTTP 200/200, Konsole 0, Überlauf 0, Überlappung 0.
- Textvergleich: GRÜN, entfernt 0, unerlaubt entfernt 0. Hinzu sind Texte aus geteilten Komponenten und Planblatt-Feldern.
- Werte (`werte.mjs`): 0 Befunde. Bezeichner: keine freien Namen.
- Erster Lauf: Textstufe ROT, weil die sr-only-Beschriftung der Richtwert-Tabelle entfiel. Behoben, siehe OFFENE FRAGE 1.

## MIKROTEXT-ÄNDERUNGEN (alt → neu)
- Keine Knopf-, Label- oder Alt-Texte geändert. H1 wortgleich: „Untergrund ausgleichen und Gefälle herstellen: eben verlegen, Wasser gezielt ableiten“ und „Estrich prüfen: Belegreife und Restfeuchte vor dem Fliesen“.
- Estrich, Hero-Link „Fliesen auf Fußbodenheizung“: Textlink wird Nebenknopf (gleicher Text).
- Pfeil-Icons der Ratgeber-Links entfallen (kein Text).

## BILDBELEGE
Ganzseite d1440 (`einzelbild.mjs --voll`), in 2300-px-Teile geschnitten:
- `scratchpad/E5-BAU-02/teile/ausgleich-gefaelle/d-teil1.jpg` … `d-teil5.jpg`
- `scratchpad/E5-BAU-02/teile/estrich-belegreife/d-teil1.jpg` … `d-teil5.jpg`
- Ganzseite: `scratchpad/E5-BAU-02/voll/<seite>/d1440-voll.jpg`
- Viewports: `scratchpad/E5-BAU-02/bilder/untergrund-abdichtung__<seite>/m390.jpg` und `d1440.jpg`

Gesichtet: Teile 2 bis 4 der Ausgleich-Seite, Teile 1 bis 4 der Estrich-Seite, m390 der Estrich-Seite. Ohne Befund. Der Fuß (Teil 5) ist das gemeinsame Bauteil.

## OFFENE FRAGEN
1. **Tabellenname Estrich-Richtwerte.** Die Regel „Name = Überschrift darüber“ hätte die sr-only-Beschriftung „Häufig genannte CM-Richtwerte für die Belegreife mit Fliesen“ gestrichen. Das ist ein Mikrotext, den das Paket nicht erlaubt. Deshalb ist der Name die alte Beschriftung, die Überschrift H3 bleibt darüber. Bitte entscheiden: Name = Überschrift (dann Mikrotext per `texte-erlaubt.json` freigeben) oder so lassen.
2. **Ratgeber-Block.** Der alte Block war `<nav aria-labelledby>`. Jetzt ist es ein `section` mit gleicher `aria-labelledby`-Beziehung, der Landmark-Typ hat sich geändert. Ok?
3. **FAQAccordion** ergänzt pro Frage eine Telefonzeile („Persönliche Beratung: 06441 / 44 83 567“). Das ist Verhalten der geteilten Komponente, unverändert übernommen. Sie erscheint im Textvergleich als „hinzu“.
4. Beim Lesen aufgefallen, nicht geprüft und nicht verwendet: In `Abschnitt.tsx` hat der Inhalt bei `kopf="seitlich"` `col-span-4`, im Großformat bliebe eine Spalte leer. Ich habe `seitlich` in beiden Seiten nicht eingesetzt.
