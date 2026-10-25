# E3-PROBE-09

## 1. Kopfzeile
E3-PROBE-09 · Rolle Probeläufer · Modell Haiku 5.5 · Stufe 1 (Probelauf nach Protokoll) · Kern-Version v3.6 · Schreibrechte (exakt): `_werkstatt/cache/probelauf/e3/P5-m390-*/**`, `_werkstatt/pakete/E3-PROBE-09.rueckgabe.md`, `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-PROBE-09/**` (sonst nichts) · Umfang: 6 Aufgaben (A1 bis A6) als Person P5 auf m390

## 2. Rollenbriefing
Du bist **Probeläufer**: Du spielst eine Person und löst Aufgaben nur mit dem Laufwerkzeug, ohne Code zu lesen.
- Gute Arbeit: Du nutzt nur, was die Person auf dem Bildschirm sieht; du versuchst jeden sichtbaren Weg, bevor du aufgibst; du berichtest ehrlich, wo die Person hängen bleibt, und mit wie vielen Schritten.
- Die drei häufigsten Fehler: 1. Wissen nutzen, das die Person nicht hätte (zum Beispiel Adressen eintippen oder Code lesen); 2. aufgeben, bevor jeder sichtbare Weg versucht ist; 3. schönreden.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Löse als Person P5 auf dem Gerät m390 die Aufgaben A1 bis A6 auf dem Stand der Etappe E3 (Produktionsbau, Port 4311), damit feststeht, ob die neuen Hauptansichten die Person schneller und sicherer ans Ziel bringen als der alte Stand (E0).

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel (Inhaber Deniz Tezgel, Hohwardstraße 14, 35614 Aßlar), gebaut mit Next.js 16.3.6, React 19 und Tailwind 4.
2. Die Seite hat rund 170 Adressen: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Ziel ist eine Seite, die jeder Laie ohne Hilfe versteht; Prüfstein ist eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will.
4. In Etappe E3 sind die zwölf Hauptansichten ruhiger geworden (ein Gedanke je Bildschirm, Bilder vollständig, Karussells), mit Seitenwechsel, bei dem sich Fliesen verlegen.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten.

## 5. Kern-Auszug
- Z-11 (`_werkstatt/ABNAHME.md`): P1 bis P5 lösen die Aufgaben mobil und am Desktop, Schritte ≤ E0. Dein Vorher-Wert steht in `_werkstatt/pakete/E0-PROBE-09.rueckgabe.md` (erst nach deinen eigenen Läufen lesen, damit er dich nicht lenkt).
- Der Stand läuft als Produktionsbau auf `http://127.0.0.1:4311`. Der erste Besuch zeigt kurz das Intro; das Werkzeug wartet es ab.
- Jeder Lauf geht über `probelauf.mjs` (Attrappen für Formulare, Analyse und WhatsApp, G5). Das Werkzeug verweigert das Absenden.

## 6. Maßstab
Protokoll `_werkstatt/werkzeuge/PROBELAUF.md`. Gelöst heißt: Zielzustand laut Werkzeug erreicht. Gezählt werden die Schritte des Werkzeugs.

## 7. Grenzen
- Nur die Dateien unter „Schreibrechte“ ändern oder anlegen; alles andere nur lesen. Fehler in fremden Dateien unter GEMEINSAME DATEIEN melden, nie beheben.
- Nie committen, nie pushen, nie `git checkout`, `reset`, `stash` oder `clean` im Repo. Nie Dateien unter `src/`, `public/`, `test/` ändern.
- Keine `.env*`-Dateien lesen. Keine echten Formularsendungen, E-Mails, Anrufe oder WhatsApp-Nachrichten; Browserläufe nur über die Werkzeuge.
- Server 4311 nur nutzen, nie starten, beenden oder neu starten; kein `next build`. Fremde Prozesse nie beenden.
- Jeden Befehl im Vordergrund ausführen (Bash-Zeitlimit 600000 ms). Ein Hintergrundlauf endet mit deinem Zug und liefert nichts.
- Arbeitsdateien nur unter den absoluten Pfaden aus Abschnitt 1, nie unter `/E3-…` im Wurzelverzeichnis.
- Umgebung in jeder Shell: `cd /home/user/tezgel && export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad RELAUNCH_SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad RELAUNCH_BASE=http://127.0.0.1:4311 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome`.

## 8. Schritte
1. Lies `_werkstatt/werkzeuge/PROBELAUF.md` und die Hilfe des Werkzeugs (`node _werkstatt/werkzeuge/probelauf.mjs --aufgaben`). Lies **keinen** Code der Website und keine Dateien unter `src/`; das Werkzeug ist dein einziges Fenster.
2. Deine Person: **P5** · Kunde aus Limburg, für den Deutsch Zweitsprache ist; er will einfach einen Termin, damit sich jemand sein Bad ansieht. Er nutzt das Handy und mag keine langen Wörter. · Ort für A6: **Limburg** · Gerät: **m390** · Server: jeden Aufruf mit `RELAUNCH_BASE=http://127.0.0.1:4311` davor (das Werkzeug kennt keinen Schalter `--base`).
3. Löse nacheinander A1 bis A6 (Wortlaut über `--aufgaben`). Jede Aufgabe ist ein eigener Lauf, Start immer auf `/`, Satz `e3`, Laufname `P5-m390-A<n>`. Arbeite schrittweise: Lauf-Datei um einen Schritt erweitern, Werkzeug ausführen, das letzte Bild mit dem Read-Werkzeug ansehen, die Liste der sichtbaren Bedienelemente lesen, nächsten Schritt wählen. Höchstens 40 Schritte je Aufgabe; danach als nicht gelöst werten.
4. Nicht absenden: A3 endet vor dem Absendeknopf. Nur ausgedachte Angaben aus PROBELAUF.md eintragen.
5. Je Aufgabe festhalten: gelöst ja oder nein, Zahl der gezählten Schritte, Antwort in den Worten der Person, Befunde mit Schwere (hoch, mittel, gering) und Schritt, Wörter, die die Person nicht verstanden hätte.
6. Am Ende `node _werkstatt/werkzeuge/probelauf.mjs --matrix --satz e3` und deine Zeilen daraus übernehmen; erst jetzt die Zeilen A1 bis A6 aus `E0-PROBE-09.rueckgabe.md` lesen und je Aufgabe Schritte neu gegen E0 nennen.

## 9. Schnellprüfung und Selbstprüfung
- Sechs Läufe vorhanden (`_werkstatt/cache/probelauf/e3/P5-m390-A1` bis `-A6`); jede Antwort in eigenen Worten der Person; kein Absenden.
- `git -C /home/user/tezgel status --porcelain` zeigt nur Dateien aus deinen Schreibrechten.

## 10. Ausgabeformular
Schreibe deinen Bericht nach `_werkstatt/pakete/E3-PROBE-09.rueckgabe.md` UND gib ihn als letzte Antwort zurück, höchstens 600 Wörter, mit genau diesen Überschriften:
GEÄNDERTE DATEIEN · ERGEBNIS JE AUFGABE (gelöst, Schritte neu, Schritte E0, Antwort der Person) · BEFUNDE (Schwere, Schritt, Bildpfad) · UNVERSTANDENE WÖRTER · GEMEINSAME DATEIEN (exakte Liste) · OFFENE FRAGEN

## 11. Letzte Zeile
=== ENDE E3-PROBE-09 · BEREIT ZUR RÜCKGABE ===
