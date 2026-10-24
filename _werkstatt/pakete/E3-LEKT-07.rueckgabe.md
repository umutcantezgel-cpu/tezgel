GEÄNDERTE DATEIEN
- `/home/user/tezgel/_werkstatt/texte/ueber-uns.md`: 7 Zeilen geändert.
- Kopie vor der Arbeit: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-LEKT-07/vorher.md`
- Notizen: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-LEKT-07/notizen.md`

CHECKLISTE
1. Verständlichkeit P1: Drei Stellen, an denen P1 hängen bliebe: „Abnahme“, „besenrein“, zwei Glossarklammern in einem Satz. Dazu eine doppelte Aussage („Fliese für Fliese“). Alle behoben. Nach der Arbeit null Stellen.
2. Schreibregeln: `textpruefung.mjs` GRÜN, alle 12 Regeln ok.
3. Fakten: erfüllt. F-Nummern: 2008 F-06 · Handwerkskammer Wiesbaden F-05 · Inhaber Deniz Tezgel F-02 · Aßlar F-03 · Wetzlar und Gießen F-18 und F-09 · Herborn F-09 · 2014 und 2019 mit DIN 18534 F-15 · R10 und R11 F-22 · Team ohne Zahl F-14 · kostenfreier Termin F-12 · drei Schritte F-11 · Staubschutz und besenreine Übergabe F-17 · Motto wörtlich F-19 · 5,0, 27 Bewertungen, Stand September 2026 F-10 · Rückruf ohne Frist (K-015-Regel). Festpreisangebot sinngleich zum Versprechen. Keine Treffer aus „Nicht verwenden“. Stimmen und Firmendaten unverändert.
4. Suchbegriffe: erfüllt bis auf „HWK“ (siehe Offene Fragen). Titel: Über uns, Fleisenleger-Fachbetrieb Tezgel, Aßlar. H1 und Vorspann: Fliesenleger, Fliesenverlegung Tezgel, Aßlar. Text: seit 2008 (neu), Handwerkskammer Wiesbaden, Inhaber Deniz Tezgel (neu), Wetzlar, Hessen, Fliesen im Bad.
5. Seitenformel: erfüllt. Abschnitte 1 bis 6 vorhanden. Genau ein Hauptknopf „Termin vor Ort anfragen“ in Abschnitt 1 und 6. Alle Ziele haben ein Verzeichnis unter `src/app/(bestand)/`: /kontakt, /bad, /leistungen/wohnen (dynamische Route, id „wohnen“), /balkon-terrasse, /treppen, /fliesenreparatur, /ausstellung/wetzlar, /ausstellung/giessen, /standorte, /referenzen. Keine doppelte Aussage mehr.
6. Glossarklammern: erfüllt. Gelesen wurden abdichtung, din-18534, rutschhemmung, bodengleiche-dusche. Kein Satz wiederholt nur die Erklärung. Der Abdichtungssatz hat jetzt zwei Sätze mit je einer Klammer.
7. Ton: erfüllt. Sie-Form, wir-Form, keine Ich-Form, keine Floskel aus K-010-F. Das Wort „Reklame“ steht nur im wörtlichen Motto.

WICHTIGSTE ÄNDERUNGEN
1. Abschnitt 2: „bis zur Abnahme“ wird „bis zur Übergabe“. Grund: P1 kennt „Abnahme“ nicht. Abschnitt 4 nutzt bereits „übergeben“ (F-13 sinngleich).
2. Vorspann: „Deniz Tezgel, der Inhaber, kommt…“. Grund: F-02 und Suchbegriff „Inhaber Deniz Tezgel“.
3. Abschnitt 3: „Gegründet haben wir den Betrieb 2008 in Aßlar.“ wird „Seit 2008 gibt es unseren Betrieb in Aßlar.“. Grund: Suchbegriff „seit 2008“, F-06 unverändert.
4. Abschnitt 3: Der Satz zu Abdichtung und DIN 18534 wird zwei Sätze. Grund: zwei Glossarklammern in einem Satz. F-15 unverändert.
5. Abschnitt 4, Schritt 3: „Wir verlegen Fliese für Fliese“ wird „Wir verlegen die Fliesen“. Grund: doppelte Aussage zur Vorspann.
6. Abschnitt 4, Schritt 3: „besenrein“ wird „sauber gefegt“. Grund: P1. F-17 sinngleich.
7. Abschnitt 5, Karte: „und den Orten rundherum“ gestrichen. Grund: nicht in K-015, Radius M-04 offen, Auftrag „nur diese Orte“.
8. Bauhinweis Abschnitt 4: Vermerk ergänzt, dass F-13 im Text als „Übergabe“ steht. Kein Seitentext.

PRÜFUNG UND ERGEBNIS
- Befehl: `node /home/user/tezgel/_werkstatt/werkzeuge/textpruefung.mjs --art erzaehl _werkstatt/texte/ueber-uns.md`
- Ausgabe: `_werkstatt/texte/ueber-uns.md · GRÜN · Stücke 25 · Sätze 45 · Flesch 72.7 · Satz Ø 9`, Exit 0.
- Zahlen im Text: 2008 · 2014 · 2019 · 18534 · 10 · 11 · 5,0 · 5 · 27 · 2026 · 06441 / 44 83 567. Alle gegen K-015 geprüft.
- `diff vorher.md ueber-uns.md`: 7 Zeilen geändert.
- `git status --porcelain` vor und nach: Meine einzige Schreiboperation betraf `ueber-uns.md`. Die Datei ist weiter untracked und nicht committet.

GEMEINSAME DATEIEN
- Keine Änderung an gemeinsamen Dateien.
- Zwischen Vorher- und Nachher-Stand verschwanden andere Einträge aus `git status`, etwa `bad.md` und `src/...`. Ursache sind andere Commits (zuletzt `67f36a3`, `df18b02`), nicht meine Arbeit.
- Fehler in fremden Dateien: keine gefunden.

OFFENE FRAGEN
1. Das Briefing nennt den Link „/ausstellung“. Diese Route hat keine Seite, es gibt nur `/ausstellung/wetzlar` und `/ausstellung/giessen`. Der Text verlinkt die beiden Unterseiten. Bitte bestätigen oder eine Seite /ausstellung anlegen lassen.
2. „Abnahme“ (F-13) ist durch „Übergabe“ ersetzt. Falls die rechtliche Abnahme gemeint ist, bitte entscheiden.
3. „HWK Wiesbaden“ steht nicht im Text, nur „Handwerkskammer Wiesbaden“. Die Abkürzung wäre für P1 ungünstig. Bitte bestätigen.
4. „Angebot mit festem Preis“ (Schritt 2) gilt als sinngleich zum Versprechen „verbindlicher Festpreis“. Bitte bestätigen.
5. Der Radius des Einsatzgebiets (M-04) ist offen. Die Karten-Unterschrift nennt nur Wetzlar, Gießen und Herborn.

=== ENDE E3-LEKT-07 · BEREIT ZUR RÜCKGABE ===
