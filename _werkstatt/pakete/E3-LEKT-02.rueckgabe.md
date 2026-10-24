GEÄNDERTE DATEIEN
- `/home/user/tezgel/_werkstatt/texte/bad-badsanierung.md` (11 Zeilen geändert, Vergleich mit `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-LEKT-02/vorher.md`)
- Arbeitsnotizen: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-LEKT-02/notizen.md`

CHECKLISTE
1. Verständlichkeit P1: Vorher drei Hängerstellen (Satz zur Verbundabdichtung mit doppelter Erklärung, „R10 und R11“, Satz „schicken Ihre Anfrage, und …“). Nachher null. Offen bleibt nur „Nische“ in einer Bildunterschrift, das ist kein Fachwort.
2. Schreibregeln: `textpruefung.mjs` GRÜN.
3. Fakten: Zahlen belegt (18534 und 2019 in F-15, R10/R11 in F-22, 18040 in F-25). Orte F-03 und F-09, Termin kostenfrei F-12, Ansprechpartner F-13, Staubschutz und besenreine Übergabe F-17. Rückruf ohne Frist nach K-015. Gestrichen: „ohne Stress“ (keine K-015-Zusage) und „Fachbetrieb“ (wirkt wie ein Zertifikat). Keine Treffer aus „Nicht verwenden“, keine Verschärfung.
4. Suchbegriffe: Badsanierung, Aßlar, Wetzlar (Titel, Vorspann), Komplettbad (Vorspann), Festpreisangebot (Schritt 3), Walk-in-Dusche (Abschnitt 3, Punkt 1), Verbundabdichtung (Punkt 3), Großformate (Absatz Abschnitt 3). Demontage fehlt, siehe OFFENE FRAGEN.
5. Seitenformel: Abschnitte 1 bis 6 vorhanden. Genau zwei Hauptknöpfe „Termin vor Ort anfragen“ (Abschnitt 1 und 6). Die Links /kontakt, /referenzen, /bad/badanfrage und /bad/projekt-check haben Verzeichnisse unter `src/app/(bestand)/`. Doppelung von H1 und Vorspann aufgelöst.
6. Glossarklammern: Jeder Satz mit Fachwort gelesen. Der Satz „Unter die Fliesen kommt …“ wiederholte die Erklärung und ist umgebaut. Großformat neu eingesetzt. Ton (Maßstab 7): Sie-Form, wir-Form, keine Ich-Form, keine Floskeln.

WICHTIGSTE ÄNDERUNGEN
1. Abschnitt 3, Punkt 3: Satz umgebaut. Zwei Fachwörter in einem Satz, Wiederholung der Erklärung.
2. Abschnitt 3, Punkt 4: „R10 und R11“ zu „Rutschhemmung R10 oder R11“. Muster der Bereichsseite; „je nach Raum“ meint eine Wahl je Raum.
3. Abschnitt 3, Punkt 1: „Man nennt sie auch Walk-in-Dusche.“ Suchbegriff; K-010-B erlaubt die Schreibweise nur so.
4. Abschnitt 3, Absatz: „und das Verlegen von Großformaten“. Suchbegriff fehlte im Fließtext.
5. Abschnitt 4, Schritt 1 und 3: Schritt 1 in zwei Sätze, Rückruf ohne Frist. Schritt 3 mit „Festpreisangebot“ (Suchbegriff).
6. H1: „ohne Stress und zum Festpreis“ zu „zum Festpreis“. „Ohne Stress“ ist keine Zusage in K-015.
7. Beschreibung (Meta): „vom Fachbetrieb Tezgel“ zu „von Fliesenverlegung Tezgel“, Zeichenzahl auf 136 korrigiert.
8. Vorspann: „Wir bauen Ihr Bad Stück für Stück zum Komplettbad um.“ Doppelung mit der H1 aufgelöst, Komplettbad bleibt.

PRÜFUNG UND ERGEBNIS
- `node /home/user/tezgel/_werkstatt/werkzeuge/textpruefung.mjs --art erzaehl _werkstatt/texte/bad-badsanierung.md`
  Ausgabe: „GRÜN · Stücke 34 · Sätze 42 · Flesch 69.3 · Satz Ø 10.5“, alle 12 Einzelprüfungen ok, Zahlen: 18534 · 2019 · 10 · 11 · 18040.
- `diff vorher.md bad-badsanierung.md`: 11 Zeilen geändert.
- `git status`: Mein Lauf hat nur `bad-badsanierung.md` geändert. Während des Laufs kamen Änderungen anderer Pakete hinzu (siehe unten), der Vergleich „nur eine Datei“ ist daher nicht rein. Nichts committet, nichts gepusht.

GEMEINSAME DATEIEN
- Nicht geschrieben. Fremde Änderungen, nicht von mir: `_werkstatt/texte/leistungen.md`, `src/app/globals.css`, `src/components/common/Header.jsx`, `src/components/common/MobileMenu.jsx`, `src/components/kern/*`, `src/components/start/*`, neu `src/components/kern/WeiterLink.tsx`, `_werkstatt/pakete/E2-PRUEF-START-4-*.rueckgabe.md`. Schon vor dem Lauf geändert: `_werkstatt/texte/bad.md`, nicht gesichtet.
- Fehler in `_werkstatt/regeln/glossar.json` (Orchestrator): Der Eintrag `grossformat` nennt „120 × 260 cm“. F-20 führt 260 oder 278 cm als offen (M-06). Nicht geändert.

OFFENE FRAGEN
1. „Ohne Stress“ ist gestrichen. Soll K-015 dafür eine Zusage bekommen? Dann kann der Satz zurück.
2. „Fachbetrieb“ ist gestrichen. Ist die Bezeichnung zulässig?
3. Der Bauhinweis „aus drei verschiedenen Baustellen“ ist nicht in K-015 belegt. Im Text steht jetzt nur, dass die Herkunft nicht belegt ist. Bestätigen oder streichen?
4. „Demontage bis Fuge“ aus der Bestandsbeschreibung fehlt im Text. „Ausbau“ steht in Schritt 4. Aufnehmen?
5. „R10 oder R11“ statt „und“: F-22 sagt „R10 und R11 je nach Raum“. Bitte bestätigen.
6. Den Glossar-Eintrag zu Großformat mit 120 × 260 cm vor dem Build klären (M-06).

=== ENDE E3-LEKT-02 · BEREIT ZUR RÜCKGABE ===
