# Rückgabe E4-BAU-06 · Baumeister (Arbeitsmodell)

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/fliesen/festpreisangebot/page.jsx`
- `src/app/(bestand)/fliesen/fliesenarten/page.jsx`

Keine weiteren Dateien. Kein Commit, kein Push.

## WAS UND WARUM
- Mechanischer Vorlauf: `umbau.mjs` (Trockenlauf, dann `--schreiben`) auf beiden Dateien. Lucide-Icons zu eigener Icon-Familie, Klassen zu KERN-Tokens. Textfingerabdruck unverändert.
- Struktur von Hand nach Referenz (`(bestand)/bad/page.jsx`, `fliesen/page.jsx`):
  - Einstieg `art="erzaehl"`: Etikett aus der bisherigen Kennzeile, H1 mit bisheriger ID, Vorspann, Knöpfe als `Knopf`, rechts Planblatt (`wohnen` bzw. `naturstein`, ohne Bemaßung, interaktiv).
  - Leitachse mit `leitachse` und `spaet` an jedem Abschnitt. Reihenfolge der Abschnitte wie im Bestand.
  - Feldraster, Merkliste, Tabelle (Baustein `Tabelle`, Bestandstabellen unverändert im Inhalt), Abschnitt-Text mit Textlink.
  - Konfigurator per `next/dynamic` nachgeladen, Rückfrage daneben.
  - Verwendete Breiten und Abstände nur auf der Systemskala. Icon-Kacheln und Zierelemente entfallen. Keine neue Bewegung außer `interaktiv` am Plan.

## MIKROTEXT-ÄNDERUNGEN (alt → neu)
- Keine Knopf-, Label- oder Zustandstexte verändert. Wortlaut identisch.
- Neu: „Anfrageformular wird geladen...“ (Ladehinweis der Konfigurator-Nachladung, wie in der Referenz).
- Neu aus Bausteinen: Planblatt-Schriftfeld (Blatt, Verband, Betrieb, Inhaber, Kammer, Betrieb seit) und Rückfrage (Ansprechpartner, Telefon, Mobil & WhatsApp, E-Mail, Sitz).
- Neu, nur für Screenreader: Tabellenbeschriftung (sr-only). Bei der Raum-Tabelle wiederholt sie die Überschrift „Welche Fliese für welchen Raum?“.
- Badge zu Mono-Etikett mit gleichem Wortlaut: „Transparente Kalkulation“, „Unser Weg zum Angebot“, „Aufwand“, „Angebot lesen“, „Materialkunde · DIN EN 14411“, „Gruppen nach DIN EN 14411“, „Kennwerte lesen“, „Übersicht“, „Materialberatung vom Fachbetrieb“.
- Entfallen: nur dekorative Icons, keine Texte.

## GEMEINSAME DATEIEN
Keine Änderung nötig. Bausteine und Komponenten unberührt.

## PRÜFUNG UND ERGEBNIS
- Prüfstufe A `pruefe-a.sh E4-BAU-06 …`: **GRÜN**, Exit 0.
  - Typprüfung: 0 Fehler (eigene 0, übrige 0).
  - Lint: 0 Fehler, 0 Warnungen.
  - Funktionstests (navigation, kontaktwege): 72 erwartet, 0 unerwartet.
  - Bilder: HTTP 200, Konsole 0, Überlauf 0, Überlappung 0.
  - Textvergleich: entfernt 0; unerlaubt entfernt je Seite 0.
- `textprobe.cjs` gegen HEAD: alle entfernten Texte kehren als Prop, Datenstring oder zusammengeführte Überschrift zurück.
- `werte.mjs`: 0 Befunde. `bezeichner.cjs`: keine Befunde.
- Hand-Sichtung Vollbild d1440 und m390 (beide Seiten): keine leere Rasterspalte, keine grauen Restzellen, Tabellen scrollen im eigenen Bereich.
- Mengen: 5 Schritte und 4 Kostenfaktoren (festpreisangebot), 6 Materialgruppen, 4 Kennwerte, 3 Kaufhinweise und 7 Raumzeilen (fliesenarten) entsprechen dem Bestand.
- Schreibrechte: `git status` zeigt nur meine zwei Dateien. Andere geänderte Dateien stammen von anderen Agenten.

## BILDBELEGE (Scratchpad, `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E4-BAU-06/`)
- `bilder/fliesen__festpreisangebot/{m390,d1440}.jpg`
- `bilder/fliesen__fliesenarten/{m390,d1440}.jpg`
- `voll/{d1440,m390}-voll.jpg` (festpreisangebot, ganze Seite), `voll-fa/{d1440,m390}-voll.jpg` (fliesenarten)
- `festpreis-mobil-streifen.jpg`, `fliesenarten-mobil-streifen.jpg`

## OFFENE FRAGEN
1. Einstieg „merkmale als Fugenkreuz-Liste“: Die Bestandseinstiege haben keine Merkmalsliste. Ich habe keine ergänzt, weil sie vorhandenen Text verdoppeln würde. Bitte bestätigen.
2. Die sr-only Tabellenbeschriftung der Raum-Tabelle wiederholt die Überschrift. Soll sie bleiben oder entfallen? Der Baustein `Tabelle` verlangt einen Namen.
3. `#konfigurator`: Auf fliesenarten bleibt der Anker. Auf festpreisangebot gab es im Bestand keinen Anker; ich habe keinen ergänzt.
4. `Planblatt.tsx` wurde während meines Laufs von anderer Stelle geändert (`mitAchse`, `planblatt-achse`). Mein Lauf kann einen der beiden Stände geprüft haben. Eine Wiederholung von Prüfstufe A nach dieser Änderung wird empfohlen.
5. Merkliste „Beim Kauf“ (eine Spalte) hat auf d1440 lange Zeilen. Falls gewünscht, bitte Entscheidung.
