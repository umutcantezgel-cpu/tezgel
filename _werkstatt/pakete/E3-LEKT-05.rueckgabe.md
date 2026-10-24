**GEÄNDERTE DATEIEN**
- `/home/user/tezgel/_werkstatt/texte/balkon-terrasse.md`: 6 Zeilen geändert, 1 Absatz entfernt.
- Vorher-Kopie: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-LEKT-05/vorher.md`
- Notizen: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-LEKT-05/notizen.md`

**CHECKLISTE**
1. Verständlichkeit P1: Vorher mehr als drei Hängepunkte. Nachher drei: „Abnahme“ (Abschnitt 4), zwei Fachwörter in einem Satz (Kachel 4, Untergrund und Abdichtung), „Rutschhemmung R10 oder R11“. Ziel erreicht.
2. Schreibregeln: textpruefung GRÜN (Ausgabe unten).
3. Fakten: Jede Zahl und jeder Ort hat eine F-Nummer: 1,5 bis 2 % (F-21), R10/R11 (F-22), Aßlar, Wetzlar, Umgebung (F-03, F-09, neu als Bauhinweis), Telefon (F-04), kostenfrei (F-12), Ansprechpartner (F-13), Ablauf (F-11, F-17). Die Zusage „Angebot mit festem Preis“ ist sinngleich zum Festpreisangebot (K-015 Versprechen). „Nicht verwenden“: keine Treffer. Nicht in K-015 und deshalb nicht im Text: frostsichere Keramik, Naturstein am Balkon, „Beläge, die Frost und Regen standhalten“.
4. Suchbegriffe: Balkon, Terrasse, fliesen (Titel), Wetzlar, Aßlar, Stelzlager, Platten, Frost und Regen (H2) kommen natürlich vor. Teilweise erfüllt: Naturstein und frostsichere Keramik fehlen (siehe Offene Fragen 1). „Fachbetrieb Tezgel“ ist nicht ausgeschrieben, der Titel enthält „Tezgel“.
5. Seitenformel: Alle sechs Abschnitte sind da. Genau ein Hauptknopf „Termin vor Ort anfragen“ in Abschnitt 1 und 6, Ziel `/kontakt`. Links geprüft: `balkon-terrasse/{balkonsanierung,terrassenplatten,stelzlager}` (Verzeichnisse vorhanden), `/leistungen/aussen`, `/leistungen/untergrund` (ids in services.js), `/blog/barrierefreier-balkonaustritt` (posts.js), `/faq`, `/referenzen?raum=balkon-und-terrasse` (arbeiten.ts). Doppelte Aussagen entfernt (siehe Änderungen 1 und 2).
6. Glossarklammern: Alle Sätze mit Fachwort gelesen. Gestrichen wurde nichts. Die Unterschrift zum Gefälle wiederholt die Erklärung inhaltlich, sie ist aber vom Auftrag vorgegeben und blieb (Offene Fragen 2).
7. Ton (zusätzlich geprüft): Sie-Form, keine Ich-Form, keine Werbewörter, keine Floskeln aus K-010-F.

**WICHTIGSTE ÄNDERUNGEN**
1. Vorspann: Satz „Entscheidend ist auch, was darunter liegt.“ gestrichen. Grund: wiederholt „Der Aufbau darunter“ in Abschnitt 3.
2. Abschnitt 3, Kachel 2: „Platten auf Stelzen / Wir legen Platten auch auf Stelzlagern“ wurde zu „Platten auf Stelzlagern / Ob Stelzlager zu Ihrer Fläche passen, prüfen wir vor Ort …“. Der gleichlautende Absatz nach den Kacheln entfällt. Grund: Aussage nur einmal, einheitlicher Fachbegriff.
3. Beleg-Einzelbild: „auf Stelzen“ zu „auf Stelzlagern“. Grund: Begriff wie im Glossar.
4. Abschnitt 4, Schritt 2: Bauhinweis „(F-11; Versprechen K-015: Festpreisangebot)“. Grund: Zusage nachweisbar, Wortlaut nicht verschärft.
5. Abschnitt 4, Schritt 3: „besenrein“ erhält „also gefegt“. Grund: Verständlichkeit für P1, Sinn unverändert (F-17).
6. Ort-Zeile: Bauhinweis „(F-03, F-09)“. Grund: Ort ohne F-Nummer.

**PRÜFUNG UND ERGEBNIS**
Befehl: `node /home/user/tezgel/_werkstatt/werkzeuge/textpruefung.mjs --art erzaehl _werkstatt/texte/balkon-terrasse.md`

Ausgabe: `_werkstatt/texte/balkon-terrasse.md · GRÜN · Stücke 25 · Sätze 34 · Flesch 69.4 · Satz Ø 8.1`. Alle 12 Regeln „ok“. Zahlen im Text: 1,5 · 2 · 10 · 11. Vorher: GRÜN, Flesch 70.2, Satz Ø 7.9.

`git status --porcelain` vor und nach dem Lauf: identische Ausgabe. Die Datei ist laut Status untracked. Keine Commits, keine Pushes.

**GEMEINSAME DATEIEN**
Nichts geändert. Gefunden, nicht behoben: Der Bestand in `src/app/(bestand)/balkon-terrasse/page.jsx` und die Zeile `/balkon-terrasse` in `_werkstatt/adressen-e0.csv` enthalten „Beläge, die Frost und Regen standhalten“ und „frostsichere Keramik“. K-015 belegt beides nicht.

**OFFENE FRAGEN**
1. Naturstein und frostsichere Keramik (Suchbegriffe E0) fehlen im Text. K-015 führt Naturstein nur allgemein als Leistung (F-08) und belegt keine Frostsicherheit. Soll ein Satz dazu, und auf welcher Faktengrundlage?
2. Unterschrift „Der Regen läuft vom Balkon ab.“ (`gefaelle-balkon`) wiederholt die Gefälle-Erklärung. Sie ist vom Auftrag vorgegeben und blieb. Soll sie anders lauten?
3. „Abnahme“ (Abschnitt 4, F-13) ist ein Fachwort ohne Erklärung. Eine Erklärung könnte rechtlich Inhalt setzen. Bitte entscheiden, ob „bis zur Abnahme“ bleibt.
4. Abschnitt 5, H2 „Balkone und Terrassen, die wir verlegt haben.“ stützt sich auf die Fotos. Deren Herkunft ist laut K-015 eine markierte Annahme (M-08). Bitte bestätigen.
5. Rutschhemmung: K-015 F-22 sagt „R10 und R11 je nach Raum“, der Text sagt „R10 oder R11“ (wie das Muster). Bitte bestätigen.

=== ENDE E3-LEKT-05 · BEREIT ZUR RÜCKGABE ===
