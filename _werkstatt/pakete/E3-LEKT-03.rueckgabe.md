E3-LEKT-03 · Lektorat `/leistungen` · Ergebnis: Text geprüft und verbessert, Schreibregeln GRÜN.

**GEÄNDERTE DATEIEN**
- `/home/user/tezgel/_werkstatt/texte/leistungen.md` (10 Zeilen geändert, siehe `diff`)
- Kopie vorher: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-LEKT-03/vorher.md`
- Notizen P1: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-LEKT-03/notizen.md`

**CHECKLISTE**
1. Verständlichkeit P1: Vor der Arbeit neun Stellen notiert. Alle behoben. Keine Stelle bleibt offen. Die Überschrift „Untergrund und Abdichtung“ wird im Absatz darunter erklärt.
2. Schreibregeln: `textpruefung.mjs` GRÜN.
3. Fakten: Jede Zahl, jeder Ort und jede Zusage hat eine F-Nummer (siehe PRÜFUNG). Keine Treffer aus „Nicht verwenden“. Versprechen nicht verschärft. „Angebot mit festem Preis“ bleibt sinngleich zum Festpreis (M-07 offen).
4. Suchbegriffe: Titel (Fliesenleger, Leistungen, Wetzlar), H1 (Aßlar), Vorspann (Badsanierung, Terrasse, Naturstein) und Text (Terrassen, Abdichtung, große Fliesen, Angebot mit festem Preis) sind vorhanden.
5. Seitenformel: Alle sechs Abschnitte sind da. Ein Hauptknopf in Abschnitt 1 und einer in Abschnitt 6. Links geprüft: `/leistungen/bad`, `/leistungen/wohnen`, `/leistungen/aussen`, `/leistungen/untergrund` (IDs aus `services.js`), `/kontakt`, `/referenzen` (Verzeichnisse vorhanden), `#kosten-rechner` und `#express-anfrage` (Anker in `page.jsx`). Keine doppelte Aussage.
6. Glossarklammern: Jeder Satz mit Erklärung gelesen. Eine Wiederholung gestrichen (Stelzlager). Jedes Fachwort einmal markiert, keine Kennung ohne Glossareintrag.

**WICHTIGSTE ÄNDERUNGEN**
1. Balkon (Abschnitt 3): „darunter läuft der Regen ab“ gestrichen, weil es die Glossarerklärung wiederholt. Jetzt „auch auf Stelzlagern“ (F-08).
2. Untergrund (Abschnitt 3): Satz mit drei Fachwörtern in Klammern geteilt: „Darauf kommt eine Abdichtung nach DIN 18534.“ Grund: Lesbarkeit für P1.
3. H2 Abschnitt 3: „bis zur Abdichtung“ zu „bis unter die Fliesen“. Grund: Fachwort in der Überschrift ohne Erklärung.
4. Abschnitt 3 Absatz: „bis zur Abnahme“ zu „bis zur fertigen Arbeit“. Grund: Fachbegriff. F-13 bleibt sinngleich.
5. Böden und Wände: Treppen und Reparaturen ergänzt. Grund: F-08 und K-009 Navigation, damit „Alle Leistungen“ stimmt.
6. Vorspann: „dazu Böden und Naturstein“. Grund: Suchbegriff Naturstein fehlte in Titel, H1 und Vorspann.
7. Abschnitt 4, Schritt 2 und 3: „ihre Größe“ klar gefasst. „besenrein“ zu „gefegt“ (F-17, sinngleich).
8. Abschnitt 6: „Schreiben Sie uns“ zu „Nennen Sie uns“. „Richtpreis“ erklärt („also einen ungefähren Preis“). Grund: P1.

Unverändert: Titel, Beschreibung, H1, Stimme `{Stimme: c-wolf}`, Firmendaten, Kennzeile, Bild- und Glossarkennungen.

**PRÜFUNG UND ERGEBNIS**
- Befehl: `node /home/user/tezgel/_werkstatt/werkzeuge/textpruefung.mjs --art erzaehl _werkstatt/texte/leistungen.md`
- Ausgabe: `GRÜN · Stücke 19 · Sätze 38 · Flesch 75 · Satz Ø 8.1`. Alle 12 Einzelprüfungen ok. Zahlen im Text: 18534 · 120 · 260 · 2008 · 5,0 · 5 · 27 · 2026. Zuordnung: 18534 (F-15), 120 × 260 (F-20), 2008 (F-06), 5,0 / 27 / September 2026 (F-10), Aßlar und Wetzlar (F-09).
- Vorher/nachher `git status`: Nur `leistungen.md` habe ich geändert. Andere Dateien erschienen parallel während meines Laufs (u. a. `src/components/...`, `_werkstatt/texte/bad-badsanierung.md`). Ich habe sie nicht angefasst.

**GEMEINSAME DATEIEN** (gemeldet, nicht behoben)
- `src/app/(bestand)/leistungen/page.jsx`: „Fachgewerke“ in Zeilen 103, 104 und 108 (K-010-Ersetzung). „Vor-Ort-Aufmaß“ in Zeilen 117 und 189 (Ersetzung „Termin vor Ort anfragen“). „Traumbelag“ in Zeile 155 (Werbewort-Verdacht, nicht auf K-010-F).
- `src/config/services.js`: „Walk-In-Duschen“ in Zeilen 8, 15 und 22. „Vor-Ort-Aufmaß“, „innovativen“ (K-010-F) und „spielend leichte Pflege“ im Bad-Text. Feature-Liste Bad (Zeile 23) nennt 278 cm, K-015 F-20 nennt 260 cm.

**OFFENE FRAGEN**
1. Kleine Fliese: Das Briefing nennt 60 × 60 cm. K-015 F-20 hat nur 120 × 260 cm. Daher steht im Text „Kleine Fliese“ ohne Maß. Bitte Maß als F-Nummer aufnehmen oder bestätigen.
2. Großformat-Maß: F-20 nennt 260 oder 278 cm (M-06). Der Text nutzt 260.
3. „leichter zu putzen“ (Briefing) steht nicht in K-015 und fehlt deshalb. Die Unterschrift lautet „Große Fliesen haben weniger Fugen.“
4. „Angebot mit festem Preis“ ist sinngleich zu „Festpreisangebot“. Bestätigung M-07 ist offen.
5. Schadensanalyse (F-08) fehlt auf der Übersicht. Treppen und Reparaturen sind ergänzt. Ob die Schadensanalyse hinein soll, entscheidet der Autor.
6. Beleg (Abschnitt 5) hat nur eine Stimme und kein Foto, obwohl die Seitenformel Fotos und Stimmen nennt. Bitte Bildplatz prüfen.
7. Meta-Zeile „siehe OFFENE FRAGEN“ verweist auf keinen Abschnitt der Datei. Der Autor entscheidet, ob der Verweis bleibt.
8. „fertige Arbeit“ statt „Abnahme“: Bitte bestätigen, dass F-13 so gemeint ist.

=== ENDE E3-LEKT-03 · BEREIT ZUR RÜCKGABE ===
