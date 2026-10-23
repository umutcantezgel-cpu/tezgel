GEÄNDERTE DATEIEN
Keine Dateien im Repo geändert. Geschrieben nur unter meinen Schreibrechten: `/home/user/tezgel/_werkstatt/cache/probelauf/e0/P4-d1280-A1` bis `-A6` (lauf.json, Bilder, aria, sichtbar, eingabe.json) und `$SCRATCH/E0-PROBE-07/` (Lauf-Eingaben und Laufprotokolle). Außerhalb: `_werkstatt/cache/probelauf/e0/matrix.json` wurde durch `--matrix --satz e0` neu geschrieben (siehe unten).

WAS UND WARUM
Person P4 (Hausbesitzer, Braunfels, Balkon mit Wasser, Laptop), Gerät d1280, Start `/`. Der Cookie-Banner „Alle ablehnen“ zählt als erster Schritt.
- A1 gelöst, 1 Handlung. Antwort: „Das ist ein Fliesenleger aus Aßlar, der Fliesen verlegt und Bäder saniert.“
- A2 gelöst, 0 bis Ziel, 1 gesamt (Banner). Die Nummer steht im Kopfbereich. Antwort: „Ich rufe unter 06441 / 44 83 567 an, oder ich schreibe per WhatsApp über den grünen Knopf daneben.“
- A3 Ziel erreicht: Formular bis vor den Absendeknopf, 12 Handlungen. Weg: „Aufmaß vor Ort anfragen“, „Zur Express-Anfrage“, Balkon, zweimal „Weiter“, Name, Telefon, E-Mail. Nicht abgesendet.
- A4 offen nach 16 Handlungen (13 Schritte, davon Bildläufe). Besuchte Wege: Fachgewerke, Balkon & Terrasse, Balkonsanierung, Leistung Außenbereiche, Über uns, Referenzen. Überall Grundrisszeichnungen. Der Text sagt: „Projektdokumentation in Vorbereitung“ und „Fotos … veröffentlichen wir erst, wenn unsere Kunden zugestimmt haben.“
- A5 gelöst nach 10 Handlungen (Banner, Bildlauf zu „In 3 Schritten zu Ihrem neuen Belag“).
- A6 gelöst nach 3 Handlungen (Standorte, Alle 13 Standorte, Braunfels „ca. 10 km“).

Befunde (Schwere, Schritt):
- A1 gering, 1: Cookie-Dialog liegt über dem Startinhalt.
- A2 gering, 0: Telefon und WhatsApp nur als Symbol mit Nummer, ohne Wort „anrufen“.
- A3 mittel, 2: „Aufmaß vor Ort anfragen“ führt nur auf /kontakt, das Formular erst nach einem weiteren Klick. Zusätzlich gibt es ein Formular rechts auf der Startseite. Zwei Wege zum selben Ziel.
- A3 gering, 4: Vorauswahl „Bad & Wellness“, „15–35 m²“, „In 1–3 Monaten“.
- A3 gering, 9: kein Ortsfeld, keine Einwilligungs-Kästchen.
- A4 hoch, 16: keine Fotos fertiger Arbeiten auf den besuchten Wegen.
- A5 mittel, 2: Der Ablauf liegt erst nach rund neun Bildlauf-Schritten. Oben steht nur „Kostenloses Aufmaß vor Ort“.
- A5 gering, 3: Fachwörter ohne Erklärung.
- A6 gering, 2: Das Menü „Standorte“ nennt Braunfels nicht.

Wörter, die P4 nicht verstanden hätte: Stelzlager, Splittbett, gebundene Verlegung, Verbundabdichtung, DIN 18534, Kreuzfuge, Fugenbild, Rutschhemmung.

Werkzeug-Befunde (keine Seitenbefunde):
- A3 Schritt 4 („Balkon & Terrasse“) traf den Navigationslink, nicht die Formularkarte. Das war mein Eingabefehler; ich habe den Schritt aus dem Lauf gestrichen und den Lauf neu gefahren.
- A6 ohne Wartebefehl meldete „Braunfels“ als nicht gesehen, obwohl es im Bild steht. Mit `warte_auf` wurde es erkannt.
- A3: Die Nummern der Bedienliste wechselten bei gleichem Zustand (Nr. 32 war einmal „Balkon & Terrasse“, einmal „10:30 Uhr“).

PRÜFUNG UND ERGEBNIS
- 5 von 6 gelöst. A4 offen.
- Sechs Läufe `P4-d1280-A1` bis `-A6` vorhanden. Antworten in eigenen Worten. Kein Absenden.
- Matrix `--matrix --satz e0`, Zeilen P4 d1280: A1 gelöst 1 (1 Befund), A2 gelöst 0 (1), A3 gelöst 12 (4), A4 offen (1 hoch), A5 gelöst 10 (2), A6 gelöst 3 (1).
- Selbstprüfung: `git status --porcelain` zeigt keine von mir geänderten Repo-Dateien. Die übrigen Änderungen (u. a. `_werkstatt/register.json`, `package.json`, `src/`) gehören nicht zu mir.
- Ich habe `_werkstatt/pakete/E0-PROBE-07.rueckgabe.md` nicht angelegt, weil der Orchestrator keine Berichtsdatei im Repo wünscht. Dieser Text ist die Rückgabe.
- Ordner `P4-d1280-A3` enthält Restdateien (`10-scrolle.jpg`, `10-aria.txt`) aus einem früheren Lauf mit zehn Schritten. Sie gehören nicht zum Endlauf.

GEMEINSAME DATEIEN (gewünschte Änderungen)
1. `_werkstatt/cache/probelauf/e0/matrix.json`: keine Änderung, nur Hinweis, dass `--matrix` diese gemeinsame Datei neu schreibt (23:22).
2. `_werkstatt/werkzeuge/probelauf.mjs`: Vor der Zielprüfung einen Wartepunkt setzen, damit Texte nach Navigation erkannt werden.
3. `probelauf.mjs`: Bedienlisten-Nummern stabil halten.
4. `probelauf.mjs`: Bei mehrdeutigen Namen melden, auch wenn nur einer im Bild ist.

BILDBELEGE
- `/home/user/tezgel/_werkstatt/cache/probelauf/e0/P4-d1280-A1/01-tippe.jpg`
- `/home/user/tezgel/_werkstatt/cache/probelauf/e0/P4-d1280-A2/01-tippe.jpg`
- `/home/user/tezgel/_werkstatt/cache/probelauf/e0/P4-d1280-A3/06-tippe.jpg` (Schritt 3, Kontakt)
- `/home/user/tezgel/_werkstatt/cache/probelauf/e0/P4-d1280-A3/09-fuelle.jpg` (Ziel erreicht)
- `/home/user/tezgel/_werkstatt/cache/probelauf/e0/P4-d1280-A4/08-tippe.jpg` (Referenzen)
- `/home/user/tezgel/_werkstatt/cache/probelauf/e0/P4-d1280-A4/13-scrolle.jpg` (Grundrisse statt Fotos)
- `/home/user/tezgel/_werkstatt/cache/probelauf/e0/P4-d1280-A5/03-scrolle.jpg` (Ablauf)
- `/home/user/tezgel/_werkstatt/cache/probelauf/e0/P4-d1280-A6/03-tippe.jpg` (Braunfels)

OFFENE FRAGEN
1. Das Protokoll verlangt in A3 „Pflicht-Einwilligungen ankreuzen“. Im Formular fand ich keine Kästchen, nur einen Datenschutzhinweis. Ist das Absicht?
2. Der hohe Befund A4 (keine Fotos fertiger Arbeiten) braucht laut Protokoll §7 eine Gegenprüfung durch einen frisch gestarteten Opus-Prüfer.
3. Soll das Werkzeug bei mehrdeutigen Namen wie „Balkon & Terrasse“ künftig melden?

=== ENDE E0-PROBE-07 · BEREIT ZUR RÜCKGABE ===
