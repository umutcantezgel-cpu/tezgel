GEÄNDERTE DATEIEN
Keine im Repo. Lauf-Dateien liegen unter `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E0-PROBE-10/A1.json` bis `A6.json`. Läufe: `/home/user/tezgel/_werkstatt/cache/probelauf/e0/P5-d1440-A1` bis `P5-d1440-A6`. Matrix: `/home/user/tezgel/_werkstatt/cache/probelauf/e0/matrix.json`.
Fehler von mir: Beim ersten Anlauf war `$SCRATCH` in der Shell nicht gesetzt. Dadurch entstand `/E0-PROBE-10/A1.json` außerhalb meiner Schreibrechte. Das Entfernen verweigerte die Sicherheitsprüfung; die Datei ist noch da.

WAS UND WARUM
Person P5 (Limburg, Deutsch als Zweitsprache, Handy-Nutzerin mit kurzen Wörtern), Gerät d1440 mit Maus. Nur Bildschirminhalt genutzt, nichts abgeschickt, keine Kontaktlinks ausgelöst.
- A1 gelöst, 1 Handlung (Banner „Alle ablehnen“). Antwort: „Der Betrieb verlegt Fliesen und saniert Bäder. Er ist in Aßlar.“ Befunde: gering (Banner verdeckt Beschreibung), mittel (Hauptüberschrift ohne Leistung, Fachwörter).
- A2 gelöst, 0 Handlungen bis Ziel: Die Nummer steht schon im Kopf. Befund gering: Telefonsymbol ohne Wort, WhatsApp-Symbol ohne Beschriftung.
- A3 bis vor den Absendeknopf, nicht abgeschickt. Kurzformular oben ausgefüllt; Langformular unten mit Einwilligungshäkchen gesetzt, Knopf „Unverbindliche Anfrage absenden“ im Bild. Gesamt 20 Handlungen. Befunde: gering (Wort „Aufmaß“), mittel x3 (zwei Formulare, etwa zehn Bildläufe bis zum Langformular, Fachbegriffe).
- A4 nicht gelöst, 24 Handlungen über Badsanierung, Musterbäder, Barrierefreies Bad, Badsanierung komplett und Referenzen & Bewertungen. Keine Fotos fertiger Arbeiten, nur Grundrisszeichnungen, Produktlisten und Textzitate. Befund hoch (auf diesen Wegen nicht lösbar), mittel x2 (Referenzen tief versteckt, Musterbäder ohne Bilder).
- A5 gelöst, 9 Handlungen. Antwort: drei Schritte, der Termin vor Ort kostet nichts. Befunde: mittel (Ablauf erst nach etwa sieben Bildschirmen), gering (Fachbegriffe).
- A6 gelöst, 13 Handlungen über Standorte, „Alle 13 Standorte“ und die Ortsseite. Antwort: ja, Limburg an der Lahn. Befunde: mittel (Limburg fehlt im Standorte-Menü), gering (Name „Limburg an der Lahn“; „ab Wetzlar“ gegen „vom Firmensitz Aßlar“).

PRÜFUNG UND ERGEBNIS
Matrix e0, meine Zeilen (P5, d1440): A1 gelöst 1 · 2 Befunde; A2 gelöst 0 · 1; A3 gelöst 4 · 4; A4 offen · 3 (1 hoch); A5 gelöst 9 · 2; A6 gelöst 13 · 2. Die Matrix zählt bei A3 nur bis Schritt 4; mein Weg zum Langformular sind 20 Handlungen.
Werkzeug-Befunde:
- A2 und A5: Das Ziel „gesehen“ ist schon bei Schritt 00 erfüllt, ohne Handlung.
- A3: „Absendeknopf im Bild“ meldet Erfolg bei Schritt 04. Im Bild 06 ist der Knopf nicht zu sehen. Die Prüfung meint das Kurzformular; das Langformular mit Einwilligung wird nicht erkannt.
- A4: Die Antwortprüfung wertete „keine Fotos, nur Zeichnungen“ als Treffer.
- Selbstprüfung: `git status` zeigt 48 Einträge, keiner davon von mir. Meine Läufe liegen nur im Cache. Die geänderten Dateien `probelauf.mjs` und `lib.mjs` habe ich nicht angefasst.
- Unsicher: Der Befund hoch zu A4 ist bis zur Gegenprüfung offen. Ratgeber und die Bad-Übersicht habe ich nicht geprüft.

BILDBELEGE
- /home/user/tezgel/_werkstatt/cache/probelauf/e0/P5-d1440-A2/00-start.jpg (Nummer im Kopf)
- /home/user/tezgel/_werkstatt/cache/probelauf/e0/P5-d1440-A3/07-scrolle.jpg (Kurzformular), 11-scrolle.jpg (Langformular), 17-tippe.jpg (Häkchen, Knopf im Bild)
- /home/user/tezgel/_werkstatt/cache/probelauf/e0/P5-d1440-A4/03-tippe.jpg (Musterbäder ohne Fotos), 12-tippe.jpg (Referenzen)
- /home/user/tezgel/_werkstatt/cache/probelauf/e0/P5-d1440-A5/03-scrolle.jpg (Ablauf)
- /home/user/tezgel/_werkstatt/cache/probelauf/e0/P5-d1440-A6/03-tippe.jpg (Ortsliste), 04-tippe.jpg (Ortsseite Limburg)

OFFENE FRAGEN
1. Die Datei `_werkstatt/pakete/E0-PROBE-10.rueckgabe.md` habe ich nicht angelegt. Der Hinweis des Orchestrators und die Systemregel verbieten Berichtsdateien; dieser Text ist die Rückgabe.
2. Die Testdaten im Briefing (Erika Muster, 0172 0000000) weichen vom Protokoll ab (Probe Läufer, 0641 000000). Ich habe Name und Telefon aus dem Briefing sowie E-Mail und Ort aus dem Protokoll genutzt.
3. Das Kurzformular hat kein Einwilligungshäkchen, das Langformular schon. Ob das Kurzformular rechtlich genügt, habe ich nicht bewertet.
4. Ich habe angenommen, dass P5 „Limburg an der Lahn“ als ihren Ort erkennt.
5. Die Datei `/E0-PROBE-10/A1.json` bitte durch den Orchestrator oder den Nutzer löschen (`rm /E0-PROBE-10/A1.json`, danach `rmdir /E0-PROBE-10`).

GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste)
Werkzeug `probelauf.mjs` (Orchestrator):
1. A2 und A5: Ziel „gesehen“ erst nach einer Handlung oder nach Erreichen des Abschnitts erfüllen, nicht schon bei Schritt 00.
2. A3: „Absendeknopf im Bild“ nur bei vollständig sichtbarem Knopf melden; auf das Formular mit Einwilligung beziehen.
3. A4: Verneinungen in der Antwortprüfung erkennen.
Produkt (Startseite, von mir nicht behoben; Dateien nicht ermittelt):
4. Fotos fertiger Arbeiten auf den Bad-Seiten ergänzen; auf den besuchten Seiten gibt es keine.
5. Im Standorte-Menü Limburg an der Lahn aufnehmen.
6. „Referenzen & Bewertungen“ im Hauptmenü verlinken.
7. Entfernungsbezug vereinheitlichen (Ortsseite „ab Wetzlar“, Ring „vom Firmensitz Aßlar“).
8. Kurz- und Langformular der Anfrage zusammenführen oder eindeutig trennen.

=== ENDE E0-PROBE-10 · BEREIT ZUR RÜCKGABE ===
