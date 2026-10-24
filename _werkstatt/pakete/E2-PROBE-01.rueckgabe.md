# E2-PROBE-01 · Rückgabe · P1 · m390 · Satz e2 (Port 4311)

## GEÄNDERTE DATEIEN
- $SCRATCH/E2-PROBE-01/A1.json, A2.json, A3.json (Lauf-Dateien)
- /home/user/tezgel/_werkstatt/cache/probelauf/e2/P1-m390-A1/, P1-m390-A2/, P1-m390-A3/
- /home/user/tezgel/_werkstatt/pakete/E2-PROBE-01.rueckgabe.md
- /home/user/tezgel/_werkstatt/cache/probelauf/e2/matrix.json (vom Werkzeug `--matrix` geschrieben; außerhalb meiner Rechte, bitte prüfen)
- Kein Commit, kein Push. Die untracked Dateien in `git status` stammen nicht von mir.

## ERGEBNIS JE AUFGABE
- **A1** (Was der Betrieb macht, wo): gelöst ja. Schritte neu 4, E0 3. Antwort: „Das ist ein Fliesenleger-Betrieb von Deniz Tezgel aus Aßlar. Er verlegt Fliesen in Bad, Küche, Flur und auf dem Balkon, für Wetzlar und die Orte rundherum.“
- **A2** (Telefon oder WhatsApp): gelöst ja (Attrappe). Schritte neu 2, E0 3. Antwort: „Ich rufe die Nummer 06441 / 44 83 567 an, oder ich schreibe per WhatsApp.“
- **A3** (Termin anfragen bis vor Absendeknopf): gelöst ja, Knopf im Bild, nichts abgeschickt. Schritte neu 11, E0 27 (E0 mit anderen Testdaten, nur bedingt vergleichbar). Antwort: „Ich habe den Termin vor Ort angefragt: Name, Telefonnummer, E-Mail und Ort ausgefüllt. Abgeschickt habe ich noch nicht.“

## BEFUNDE (Schwere, Schritt, Bild)
- **mittel**, A1 Schritt 1: Cookie-Banner füllt bei 200 % den Bildschirm; die Startaussage ist erst nach dem Schließen (X) sichtbar. P1-m390-A1/00-start.jpg
- **gering**, A1 Schritt 2: Der Ortssatz (Aßlar, Wetzlar) liegt teils unter Kopf- oder unterer Leiste; erst nach Rücklauf lesbar. P1-m390-A1/02-scrolle.jpg, 04-scrolle.jpg
- **gering**, A1 Schritt 4 (Beobachtung): Beim Hochscrollen überlappen sich die Beschriftungen „Anrufen“ und „WhatsApp“ in der unteren Leiste. Bild überschrieben, Gegenprobe offen.
- **gering**, A2 Schritt 1: Untere Leiste zeigt bei 200 % nur Symbole; Telefonnummer im Startbild nicht sichtbar. P1-m390-A2/01-tippe.jpg
- **gering**, A2 Schritt 1: Schloss-Symbol links unten ist nicht deutbar. P1-m390-A2/01-tippe.jpg
- **mittel**, A3 Schritt 2: Formular beginnt erst nach langem Lesen; Namensfeld erst nach mehreren Bildläufen im Bild (Schritt 6). P1-m390-A3/02-tippe.jpg, 04-scrolle.jpg, 05-scrolle.jpg
- **gering**, A3 Schritt 8: Keine Einwilligungs-Kästchen sichtbar (siehe OFFENE FRAGEN). P1-m390-A3/11-scrolle.jpg
- **gering**, A3 Schritt 6 bis 10: Untere Leiste überdeckt beim Bildlauf Teile der Felder. P1-m390-A3/07-fuelle.jpg
- Hoch: keine.

## UNVERSTANDENE WÖRTER
- „Cookie-Einstellungen“, „Privatsphäre & Cookie-Einstellungen“ (A1/00-start.jpg)
- „Badsanierung“ (unklar, ob die Wanne-gegen-Dusche-Arbeit darunter fällt; A3/04-scrolle.jpg)
- „Reparatur & Fugen“ (A3/04-scrolle.jpg)
- „Projektnotiz (optional)“ (A3/11-scrolle.jpg)

## GEMEINSAME DATEIEN (exakte Liste)
- Nur gelesen: /home/user/tezgel/_werkstatt/werkzeuge/PROBELAUF.md; /home/user/tezgel/_werkstatt/werkzeuge/probelauf.mjs (nur Hilfe und Aufgabenliste); /home/user/tezgel/_werkstatt/pakete/E0-PROBE-01.rueckgabe.md (nur A1 bis A3)
- Vom Werkzeug geschrieben: /home/user/tezgel/_werkstatt/cache/probelauf/e2/matrix.json

## OFFENE FRAGEN
1. Die Testdaten verlangen „Pflicht-Einwilligungen ankreuzen“. Bis zum Absendeknopf ist kein Kästchen sichtbar (P1-m390-A3/11-aria.txt, Zeilen 173 bis 212). Fehlt die Einwilligung absichtlich?
2. Zählung: Nach dem Anker-Sprung auf /#termin zählte „scrolle unten“ in zwei frühen Läufen 4550 px und 6 Handlungen, obwohl die Seite stehen blieb. Im gewerteten Lauf zählte derselbe Schritt 1. Vermutlich Anker-Animation im Werkzeug; gewertet wurden 11.
3. Gegenprobe zur Beschriftungs-Überlappung (A1, Schritt 4) steht aus.
4. Satz e2 enthält Läufe P1-d1440 und P5-m390, die nicht von mir stammen. Die Matrix-Spalte d1440 ist nicht meine Messung.

=== ENDE E2-PROBE-01 · BEREIT ZUR RÜCKGABE ===
