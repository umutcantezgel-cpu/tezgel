GEÄNDERTE DATEIEN (nur Scratchpad)
/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E1-LEKT-REF-2/zaehlung.py, zaehlung.txt, status_vorher.txt, status_nachher.txt

WAS UND WARUM (ein Satz)
Referenztext per Lektüre als P1 und per Skript gegen K-010, K-011, K-015 und die Seitenformel geprüft; geändert habe ich im Repo nichts.

GEMEINSAME DATEIEN
1. „Unter die Fliesen kommt eine Abdichtung nach Norm (DIN 18534).“ · Regel: K-011, Glossarwort „DIN 18534“ beim ersten Vorkommen auszeichnen · Ersatz: „Unter die Fliesen kommt eine [[abdichtung|Abdichtung]] nach Norm ([[din-18534|DIN 18534]]). So bleibt das Wasser in der Dusche.“ · muss
2. H1 „Ein barrierefreies Bad mit Dusche ohne Stufe“ · Regel: E0-Suchbegriff „Badmodernisierung“ fehlt; Wortform von „barrierefrei“ steht erstmals unausgezeichnet (OFFENE FRAGE 1) · Ersatz: „Barrierefreie Badmodernisierung mit Dusche ohne Stufe“ (53 Zeichen) · soll
3. „Haben Sie einen Pflegegrad? Dann kann die Pflegekasse bis zu 4.180 € je Person dazugeben.“ · Regel: K-015 F-23 nennt keinen Pflegegrad als Voraussetzung · Ersatz: „Die Pflegekasse kann bis zu 4.180 € je Person als Zuschuss dazugeben.“ · muss
4. „Wir planen nach der Regel für barrierefreies Bauen ([[din-18040|DIN 18040]])“ · Regel: K-015 hat keine Fundstelle für eine Planung nach DIN 18040 · Ersatz: „Wir planen so, dass Sie ohne Stufen und mit genug Platz zum Bewegen duschen können.“ (bis OFFENE FRAGE 2 geklärt) · muss
5. „Wir verlegen Fliesen, die nicht rutschig sind ([[rutschhemmung|Rutschhemmung R10 oder R11]]).“ · Regel: Suchbegriff „rutschfeste Fliesen“ fehlt; F-22 sagt „je nach Raum“ · Ersatz: „Wir verlegen rutschfeste Fliesen, je nach Raum mit [[rutschhemmung|Rutschhemmung R10 oder R11]].“ · soll
6. Hauptknopf „Termin vor Ort anfragen“ in Abschnitt 1 (Zeile 16) und Abschnitt 6 (Zeile 51) · Regel: Seitenformel, genau ein Element mit data-hauptknopf · Ersatz: Abschnitt-1-Knopf durch Textlink „Umbau mit uns besprechen“ → /kontakt ersetzen (ohne Hauptknopf-Markierung; OFFENE FRAGE 3) · muss
7. Titel „Barrierefreies Bad in Aßlar und Wetzlar | Tezgel“ · Regel: E0-Titel nennt „DIN 18040“ · Ersatz: „Barrierefreies Bad in Aßlar und Wetzlar | DIN 18040 Tezgel“ (58 Zeichen, vorbehaltlich OFFENE FRAGE 2) · soll
8. Beschreibung „… mit rutschfesten Fliesen nach DIN 18040.“ · Regel: Die Norm betrifft barrierefreies Bauen, nicht die Fliese; Meta-Text ist nicht auszeichenbar · Ersatz: „Badewanne raus, Dusche ohne Stufe rein: Wir bauen Ihr Bad barrierefrei um, mit rutschfesten Fliesen. Mit Hinweis zum Zuschuss.“ (126 Zeichen) · soll

PRÜFUNG UND ERGEBNIS
- Schritt 1 (Lesung als P1): 5 Stellen (H1 „barrierefreies“, „nach Norm (DIN 18534)“, „Rutschhemmung R10 oder R11“, „Pflegegrad“ und „Pflegekasse“, „nach DIN 18040“). Manuell, nicht gezählt.
- Schritt 2 (Zählung): 0 Befunde. 30 Sätze, 250 Wörter, mittlere Satzlänge 8,3; kein Satz über 25 Wörter; kein Absatz über 4 Sätzen; 0 Gedankenstriche; 0 Bindestrichwörter im sichtbaren Text; 0 Floskeln. Befehl: zaehlung.txt, Schritte 2a, 2d, 2e. Flesch war nicht Teil des Auftrags und ist nicht gerechnet.
- Schritt 3 (Glossar): 2 Lücken (Befunde 1 und 2). Befehl: zaehlung.txt, Schritt 3. Ohne Lücke: Abdichtung, DIN 18040, bodengleiche Dusche, Rutschhemmung, R10, R11, Gefälle.
- Schritt 4 (Fakten): 2 Befunde ohne Fundstelle (3, 4). Belegt: 4.180 € (F-23), DIN 18534 (F-15), R10 und R11 (F-22), kostenfreier Termin (F-12), Staub (F-17), Ort (F-09), Festpreis (Versprechen, sinngleich). „Gefälle“ im Duschboden hat nur F-21 für Balkon und Terrasse (OFFENE FRAGE 4). Nicht-verwenden-Liste: 0 Treffer. Befehl: zaehlung.txt, Schritt 4.
- Schritt 5 (Suchbegriffe): Titel 48 und Beschreibung 141 Zeichen, beides im Rahmen. Befunde 2, 5, 7, 8. Befehl: zaehlung.txt, Schritt 5.
- Schritt 6 (Seitenformel): alle sechs Abschnitte in Reihenfolge vorhanden; 1 Befund (6). Befehl: zaehlung.txt, Schritt 6.
- Repo: `git status` unterscheidet sich vorher und nachher (u. a. `_werkstatt/register.json`, `_werkstatt/werkzeuge/werte-regeln.json`, `_werkstatt/werkzeuge/.zl.mjs`, mehrere `src/`-Dateien). Ich habe nichts geschrieben; diese Änderungen stammen nicht aus meinem Lauf. Vergleich: status_vorher.txt und status_nachher.txt.

BILDBELEGE: keine

OFFENE FRAGEN
1. Zählt die Wortform „barrierefreies“ in der H1 als Glossarvorkommen, und darf die H1 eine Auszeichnung tragen?
2. Ist „nach DIN 18040 planen“ belegt? K-015 hat keine Fundstelle; der Bestand (E0) nennt DIN 18040-2. Davon hängen Befunde 4, 7 und 8 ab.
3. Soll Abschnitt 1 ohne Hauptknopf bleiben? Die Erstes-Bild-Regel verlangt einen Hauptknopf im ersten Bildschirm, die Seitenformel genau einen.
4. Ist „Der Duschboden bekommt ein leichtes Gefälle“ belegt? F-21 nennt Gefälle nur für Balkon und Terrasse (1,5 bis 2 %).
5. Die Sätze „Duschen ohne Stufe, die wir gebaut haben“ und „Die Fugen sind fertig“ setzen voraus, dass die Fotos eigene Arbeiten zeigen. M-08 markiert die Herkunft einzelner Fotos als Annahme; nicht geprüft.
6. Die Kundenstimme in Abschnitt 5 steht im Referenztext nur als Platzhalter („aus REVIEWS“). Wortlaut und Auswahl sind nicht prüfbar.
7. Welche H1 gilt, die des Referenztextes oder die E0-H1 („Barrierefreie Badmodernisierung in Aßlar & Wetzlar: …“)? Befund 2 folgt der Suchbegriff-Regel.

=== ENDE E1-LEKT-REF-2 · BEREIT ZUR RÜCKGABE ===
