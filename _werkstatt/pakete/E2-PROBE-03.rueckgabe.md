# E2-PROBE-03 · Rückgabe · Probeläufer P5 auf m390 · Stand 5df89bc (Port 4311)

GEÄNDERTE DATEIEN
- `_werkstatt/cache/probelauf/e2/P5-m390-A1/`, `_werkstatt/cache/probelauf/e2/P5-m390-A2/`, `_werkstatt/cache/probelauf/e2/P5-m390-A3/` (Läufe, Bilder, lauf.json)
- `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-PROBE-03/A1.json`, `.../A2.json`, `.../A3.json` (Lauf-Dateien)
- `_werkstatt/pakete/E2-PROBE-03.rueckgabe.md` (dieser Bericht)

ERGEBNIS JE AUFGABE (gelöst, Schritte neu, Schritte E0, Antwort der Person)
- A1: gelöst ja. Schritte neu 0 (gesamt 0). Schritte E0 1. Antwort: „Sie machen Fliesen für Bad und Küche, in Aßlar und Wetzlar.“ Ein Vorlauf mit einem Klick auf „Alle ablehnen“ wurde verworfen, weil die Antwort schon auf dem ersten Bild steht.
- A2: gelöst ja. Schritte neu 0 (gesamt 0). Schritte E0 2. Antwort: „Ich rufe an: 06441 / 44 83 567. Oder ich schreibe per WhatsApp.“ Zur Kontrolle: Antippen des Anruf-Links (1 Schritt) landete in der Attrappe (kontakt_angetippt), es wurde nichts gewählt.
- A3: gelöst ja, bis vor dem Absendeknopf. Schritte neu 5 bis Ziel (gesamt 6, inklusive Feld Ort). Schritte E0 13. Weg: „Termin vor Ort anfragen“ (Hero) → „Alle ablehnen“ → Name → Telefonnummer → E-Mail → Ort/PLZ. Nicht abgesendet, keine Anfrage an die Attrappe. Antwort: „Ich habe die Anfrage ausgefüllt, bis zum Knopf Termin vor Ort anfragen. Abgeschickt habe ich nicht.“ Andere Wege wurden nicht versucht, weil der erste sichtbare Weg zum Ziel führte.

BEFUNDE (Schwere, Schritt, Bild)
- gering, A1, Schritt 0: Der Einwilligungsbanner deckt die untere Hälfte des ersten Bildes ab. `_werkstatt/cache/probelauf/e2/P5-m390-A1/00-start.jpg`
- gering, A2, Schritt 0: Der Banner verdeckt die untere Leiste mit Anrufen, WhatsApp und Termin, bis er geschlossen ist. Die Nummer steht oben im Bild. `_werkstatt/cache/probelauf/e2/P5-m390-A2/00-start.jpg`
- gering, A3, Schritt 2: Nach dem Öffnen des Formulars verdeckt der Banner Auswahl und erste Felder; erst „Alle ablehnen“ gibt sie frei. `_werkstatt/cache/probelauf/e2/P5-m390-A3/02-tippe.jpg`
- gering, A3, Schritte 1 und 6: „Termin vor Ort anfragen“ steht mehrfach auf der Seite (Hero, Kopfbereich, untere Leiste „Termin“). Verwechslungsgefahr, das Ziel war trotzdem sofort gefunden. `_werkstatt/cache/probelauf/e2/P5-m390-A3/01-tippe.jpg`
- gering, A3, Schritt 2: „Badsanierung“ ist ohne Zutun vorausgewählt; die Person wählt bewusst nichts. `_werkstatt/cache/probelauf/e2/P5-m390-A3/02-tippe.jpg`
- Keine Befunde „hoch“.

UNVERSTANDENE WÖRTER (P5, Deutsch Zweitsprache)
Einwilligungsbanner, Privatsphäre, DSGVO, TTDSG, Cookie-Einstellungen, Datenschutzerklärung, Impressum, unverbindlich, Vorhaben, Rückruf, Bestätigung, Projektnotiz, Badsanierung, Fliesenverlegung, „anfragen“ (im Satz „Termin vor Ort anfragen“).

GEMEINSAME DATEIEN (exakte Liste)
- `_werkstatt/cache/probelauf/e2/matrix.json`: vom Befehl `probelauf.mjs --matrix --satz e2` geschrieben, den das Briefing vorgibt. Nicht von mir bearbeitet. Außerhalb meiner Schreibrechte, bitte prüfen.
- Keine weiteren gemeinsamen Dateien geändert. `git status` zeigt keine Änderung aus diesem Lauf an Dateien unter src, public, test, next.config.ts oder package.json.

OFFENE FRAGEN
1. A3: Im Formular gibt es kein Einwilligungs-Kästchen (`06-aria.txt` ohne checkbox, Bild `06-fuelle.jpg`), obwohl das Briefing „Pflicht-Einwilligungen ankreuzen“ verlangt. E0 hatte denselben Befund. Ist das so gewollt?
2. Werkzeug-Ziel: A1 und A2 gelten schon bei Schritt 0 als erreicht (Antwort auf dem ersten Bild bzw. „Nummer im Bild gesehen“). Soll A2 einen Anruf-Link verlangen?
3. Die Matrix zeigt für A1 P5 in der Spalte d1440 „offen“. Im Satz e2 liegt der Ordner `_werkstatt/cache/probelauf/e2/P5-d1440-A1`, den ich nicht angelegt habe. Herkunft unklar.
4. Das Intro „Der erste Boden“ war im Startbild `00-start.jpg` nicht zu sehen, nur der Cookie-Banner.

=== ENDE E2-PROBE-03 · BEREIT ZUR RÜCKGABE ===
