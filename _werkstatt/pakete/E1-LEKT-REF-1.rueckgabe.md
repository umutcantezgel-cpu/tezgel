GEÄNDERTE DATEIEN (nur Scratchpad)
- /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E1-LEKT-REF-1/zaehlung.py
- /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E1-LEKT-REF-1/zaehlung.txt
- /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E1-LEKT-REF-1/status-vorher.txt und status-nachher.txt

WAS UND WARUM
Ich habe REF-start.md nach Checkliste geprüft (Verständlichkeit für P1 zuerst), per Skript gezählt und Befunde mit Ersatzsätzen geliefert; der Text selbst blieb unverändert.

GEMEINSAME DATEIEN (Befunde)
1. Z12 „für Wetzlar und ganz Mittelhessen“ · K-015 (Faktenstand): Gebiet nicht belegt, F-09 nennt 13 Orte und 45 km · Ersatz: „Fliesenleger Deniz Tezgel aus Aßlar, für Wetzlar und die Orte rundherum.“ · muss
2. Z50 „Wir verlegen sauber und pünktlich.“ · K-015: Zusage „pünktlich“ nicht belegt · Ersatz: „Wir verlegen sauber und sorgfältig.“ · muss
3. Z17 (Alt) „Bodengleiche Dusche mit großen grauen Fliesen und einer Glaswand“ · K-011: erstes Vorkommen von „bodengleiche Dusche“ ohne [[id|Wort]] · Ersatz Alt: „Dusche ohne Stufe mit großen grauen Fliesen und einer Glaswand“ · muss (wenn Alt-Text zählt, siehe offene Frage 1)
4. Z25 „Das ganze Bad ist alt und soll neu werden.“ · Auftrag §7: Suchbegriff „Badsanierung“ fehlt im sichtbaren Text · Ersatz: „Das ganze Bad ist alt und braucht eine Badsanierung.“ · muss
5. Z33 „Dann verlegen wir neue Fliesen und machen die Fugen.“ · Auftrag §7: Suchbegriff „große Fliesen (fugenarm)“ fehlt · Ersatz: „Dann verlegen wir neue Fliesen, auch große Fliesen mit wenigen Fugen.“ · muss
6. Z41 „Wir dichten nach Norm ab ([[din-18534|DIN 18534]]).“ · Auftrag §7: Suchbegriff „Abdichtung“ fehlt (nur DIN-Nennung) · Ersatz: „Die [[abdichtung|Abdichtung]] machen wir nach [[din-18534|DIN 18534]]. So kommt kein Wasser in Wand und Boden.“ · muss
7. Z14 „Danach verlegt er mit seinem Team Fliese für Fliese.“ · Suchbegriff „Fliesenverlegung“ (Titel, H1 der E0-Zeile) fehlt im Text · Ersatz: „Danach übernimmt er mit seinem Team die Fliesenverlegung, Fliese für Fliese.“ · soll
8. Z33 „Wir nehmen alte Beläge heraus“ · P1: „Beläge“ ohne Erklärung · Ersatz: „Wir nehmen alte Fliesen heraus und bereiten den Untergrund vor.“ · soll
9. Z48 „Er misst aus und prüft den Untergrund.“ · P1: „misst aus“ ist Handwerkersprache · Ersatz: „Er schaut sich den Raum genau an und prüft den Untergrund.“ · soll
10. Z49 „Sie suchen mit uns Fliesen, Größe und Fugenbild aus.“ · P1: „Fugenbild“ ohne Erklärung · Ersatz: „Sie suchen mit uns Fliesen, Format und Fugen aus.“ · soll

PRÜFUNG UND ERGEBNIS
1. Verständlichkeit P1: 10 Stellen notiert, 7 Befunde (Nr. 7 bis 10 plus Nr. 1 bis 3 sind Mehrfachtreffer); Zählung nicht anwendbar.
2. Regeln zählbar: 0 Befunde. Befehl: `python3 -I zaehlung.py` (Abschnitt 1 bis 4 in zaehlung.txt). 38 Sätze, mittlere Länge 9,00 Wörter, kein Satz über 25 Wörter, kein Absatz über 4 Sätzen, Amstad etwa 75,6 (Vokalgruppen-Näherung), 0 Gedankenstriche im Text (7 Treffer sind Listenmarker), 0 Bindestrichwörter außerhalb der Liste, 0 Floskeln, 0 Stakkato, 0 „Begriff: Erklärung“-Überschriften.
3. Glossar: 1 Befund (Nr. 3). „Untergrund“ (Z33) und „DIN 18534“ (Z41) sind korrekt markiert.
4. Fakten: 2 Befunde (Nr. 1, 2). Geprüft: 5,0 / 5 / 27 (F-10), 2008 (F-06), 13 Orte (F-09), Stand September 2026 (F-10), „Drei Schritte“ (F-11), kostenfreier Termin (F-12), Staubschutz (F-17). „Nicht verwenden“: 0 Treffer.
5. Suchbegriffe: 3 Befunde (Nr. 4 bis 6) plus 1 soll (Nr. 7). Titel 56 Zeichen, Beschreibung 146 Zeichen, beide im Rahmen. Vorhanden: Fliesenleger, Aßlar, Wetzlar, Terrasse, DIN 18534, Termin vor Ort.
6. Seitenformel: 0 Befunde. Sechs Abschnitte in Reihenfolge, genau ein `data-hauptknopf` (Z15).

BILDBELEGE: keine

OFFENE FRAGEN
1. Zählt der Alt-Text (Z17) als sichtbarer Text für die Glossarregel? Ohne Antwort ist Nr. 3 ein Vorschlag.
2. Die Datei mischt Seitentext mit Konstruktionshinweisen (Z15, Z18, Z43, Z47, Z54, Z57, Z66). Die Zählung behandelt sie als Notizen. Welche Zeilen sind Kopie?
3. Z24 „Ich möchte eine Dusche ohne Stufe.“: Die Ton-Regel verlangt Sie und wir. Die Ich-Form ist die Kundenstimme und passt zu P1, bleibt aber eine Entscheidung.
4. Z48 „prüft den Untergrund“ ist in K-015 nicht ausdrücklich belegt (F-12 nennt Aufmaß und Schadensanalyse). Bestätigen oder streichen.
5. Versprechen bis zur Bestätigung M-07: „Angebot mit festem Preis“ (Z49), „Dieser Termin ist kostenfrei“ bleibt wie belegt. Die Zusage im Formular bleibt wörtlich.
6. Öffnungszeiten aus COMPANY_DATA.hours folgen F-07; Freitag bis 17 oder 18 Uhr ist offen (M-03).
7. Abschnitt 5 hat drei H2-Überschriften. Die Seitenformel verlangt sechs Abschnitte, nicht sechs Überschriften; das ist bestätigt, wenn so gewollt.
8. git status vor und nach meiner Arbeit unterscheidet sich (weitere geänderte Dateien unter src/ und _werkstatt/register.json). Ich habe nichts davon angefasst und im Repo nichts geschrieben; die Änderungen stammen vom Orchestrator.

=== ENDE E1-LEKT-REF-1 · BEREIT ZUR RÜCKGABE ===
