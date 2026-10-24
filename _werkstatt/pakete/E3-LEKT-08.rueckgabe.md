GEÄNDERTE DATEIEN
- `/home/user/tezgel/_werkstatt/texte/kontakt.md` (9 Zeilen). Kopie vorher: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-LEKT-08/vorher.md`. Notizen: `.../E3-LEKT-08/notizen.md`.

CHECKLISTE
1. Verständlichkeit für P1: 5 Stellen gefunden, 5 behoben, 0 verbleiben. Lesart des Lektors, kein Test mit einer echten Person.
2. Schreibregeln: `textpruefung.mjs` GRÜN vor und nach der Arbeit. Flesch 72.5 zu 71.8, mittlere Satzlänge 9.1 zu 8.8.
3. Fakten: Zahlen, Orte und Zusagen sind nach K-015 belegt (F-03, F-04, F-05, F-06, F-07, F-09, F-11, F-12, F-13, F-17). „Deniz Tezgel ruft Sie zurück“ folgt der Versprechen-Regel ohne Frist. Kein Treffer aus „Nicht verwenden“. Nichts verschärft. „Beide führen zu einem Termin vor Ort“ ist durch die Bestandsseite gedeckt (Express-Anfrage, Kalender).
4. Suchbegriffe: Titel und H1 unverändert (Kontakt, Termin vor Ort, Fliesenleger Tezgel Aßlar). Vorspann: kostenfrei, persönliche Beratung, Termin vor Ort. Beschreibung: Festpreis und Wetzlar ergänzt. Festpreis steht nicht in Titel, H1 oder Vorspann (OFFENE FRAGE 1). „Vor-Ort-Aufmaß“ ist nach K-010 durch „Termin vor Ort“ ersetzt (OFFENE FRAGE 4).
5. Seitenformel (Arbeitsseite, Abschnitte 1 bis 5): vollständig. Genau ein Hauptknopf „Termin vor Ort anfragen“ in Abschnitt 1, Ziel `#termin` (H2 in Abschnitt 2). Links: `/kontakt` (Ordner vorhanden), `#express-anfrage`, `/kontakt#termin-buchen` (Ids auf der Bestandsseite vorhanden). Doppelte Aussage „berät Sie persönlich“ entfernt.
6. Glossarklammern: einziges Fachwort ist „Untergrund“ (Abschnitt 5, Schritt 1, erstes Vorkommen, Baustein). Kein Satz wiederholt die Erklärung, daher nichts gestrichen.
7. Ton (Punkt 7 des Maßstabs): Sie-Form, wir-Form, keine Ich-Form, keine Floskeln, keine Werbewörter, keine Express-Anfrage (K-010-B).

WICHTIGSTE ÄNDERUNGEN
1. Abschnitt 3, Adresse: „Adresse unseres Betriebs:“ statt „Adresse: Unser Betrieb:“. Grund: doppeltes Etikett.
2. Abschnitt 3, Anfahrt: nennt den Knopf „Karte laden & zustimmen“ (aus `MapConsentGate.tsx`). Grund: „zugestimmt“ hatte keinen Bezug. Einwilligung und Funktion unverändert.
3. Abschnitt 4: „Diese beiden Hilfen“. Grund: „Beide“ hatte keinen Bezug.
4. Abschnitt 5, Schritt 3: „übergeben Ihnen den Raum sauber gefegt“ statt „besenrein“. Grund: Wort ohne Erklärung; F-17 bleibt sinngleich.
5. Abschnitt 2: „tragen Sie … ein“ statt „schreiben Sie“. Grund: Es sind Formularfelder. Die Vorhaben-Auswahl „Ihr Vorhaben wählen“ steht im Formular.
6. Vorspann: „und wir beraten Sie dabei persönlich“. Abschnitt 5 Absatz: „berät Sie persönlich“ entfernt. Grund: Suchbegriff in die Vorspann, Doppelung weg.
7. Beschreibung: Festpreis und Wetzlar ergänzt, 146 zu 153 Zeichen, Zeichenvermerk angepasst. „bei Ihnen“ gestrichen, damit die Länge passt.
8. Bild `kontakt-eingang`: Alt-Text aus `bildplaetze.md` („Hauseingang mit Podest und beigen Fliesen“) statt „Treppenstufen …“. Grund: Spezifikation. Das Bild selbst habe ich nicht gesichtet.

PRÜFUNG UND ERGEBNIS
- `node /home/user/tezgel/_werkstatt/werkzeuge/textpruefung.mjs --art arbeit _werkstatt/texte/kontakt.md`
- Ausgabe: `_werkstatt/texte/kontakt.md · GRÜN · Stücke 23 · Sätze 32 · Flesch 71.8 · Satz Ø 8.8`, alle 12 Einzelprüfungen ok.
- Ausgabe: `Zahlen im Text (gegen K-015 prüfen): 06441 / 44 83 567 · 2008 · 7:30 · 18 · 17`. Belegt durch F-04, F-06 und F-07. Freitag 17 Uhr ist M-03 offen.
- `git status --porcelain`: vor meiner Arbeit leer. Danach zeigt git `kontakt.md` als geändert und zusätzlich `_werkstatt/texte/blog.md`. Die Datei `blog.md` habe ich nicht angefasst.
- Nicht committet, nicht gepusht.

GEMEINSAME DATEIEN (nur gemeldet, nicht geändert)
- `src/config/company.js:128`: `formattedWeekdays` „Mo - Fr: 07:30 – 18:00 Uhr“ widerspricht `friday.close 17:00` (Zeile 125). M-03 offen.
- `_werkstatt/bildplaetze.md`, Zeile `kontakt-eingang`: Alt-Text und Textentwurf passen nicht zusammen. Bitte am Bild prüfen.
- `src/app/(bestand)/kontakt/page.jsx:79`: „Garantierter Staubschutz bei Renovierungen“. K-015 verbietet, die Staubschutz-Garantie zu verschärfen (M-07). Der neue Text sagt nur „schützen wir … vor Staub“.
- `_werkstatt/texte/blog.md`: im Repo als geändert ausgewiesen, nicht von mir.

OFFENE FRAGEN
1. Festpreis fehlt in Titel, H1 und Vorspann. Die vorgesehene Stelle wäre die Vorspann, das würde aber Abschnitt 5, Schritt 2 doppeln. Entscheidung durch den Orchestrator.
2. M-07: „Festpreis“ (Beschreibung und Schritt 2) bleibt im Wortlaut des Bestands, bis M-07 bestätigt ist.
3. M-03: Freitag 17 Uhr (Text) oder 18 Uhr (`company.js:128`). Der Text folgt 17 Uhr.
4. „Aufmaß“ fehlt jetzt im Text, obwohl Titel, H1 und Beschreibung des Bestands es hatten. Bitte bestätigen, dass die Ersetzung durch „Termin vor Ort“ gilt.
5. Die Ort-Zeile (Wetzlar und die Orte rundherum) und das Einsatzgebiet (fünf Orte) nennen dieselbe Region. Ich habe beides belassen. Bitte entscheiden, ob eine Zeile fällt.
6. Alt-Text `kontakt-eingang`: am Bild nicht geprüft (siehe Gemeinsame Dateien).

=== ENDE E3-LEKT-08 · BEREIT ZUR RÜCKGABE ===
