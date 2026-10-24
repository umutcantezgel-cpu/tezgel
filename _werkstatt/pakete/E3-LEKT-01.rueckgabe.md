GEÄNDERTE DATEIEN
- `/home/user/tezgel/_werkstatt/texte/bad.md`: 13 Zeilen geändert (diff gegen `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-LEKT-01/vorher.md`).
- Arbeitsnotiz: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-LEKT-01/notizen.md`
- Nicht committet, nicht gepusht.

CHECKLISTE
1. Verständlichkeit für P1: Vorher drei Hänger und ein Satzbaufund. (a) Zeichnung „schichten“: „Sie liegt“ und „Sie hält“ bei Abdichtung und Fliese, mit der Anrede verwechselbar. (b) „besenrein“ in Schritt 3. (c) „Abnahme“ in Abschnitt 2 und Schritt 3. (d) Vorspann: Doppelpunkt direkt hinter dem Fachwort. Nachher: 0.
2. Schreibregeln: GRÜN, Exit 0. Flesch 75,8 zu 72,9 (Mindestwert 60), mittlere Satzlänge 7,9 zu 8,1 (höchstens 14).
3. Fakten: Alle Zahlen sind in K-015 belegt: 10 und 11 (F-22), 2019 und DIN 18534 (F-15), 2008 (F-06), 4.180 € (F-23, F-25). Orte (F-03, F-09), kostenfreier Termin (F-12), Staubschutz und besenreine Übergabe (F-17), Ansprechpartner (F-13), Festpreisangebot (Versprechen, sinngleich). Stimme `peter-p`: Quelle Google, Thema Bad (`src/config/reviews.js`). Keine Treffer aus „Nicht verwenden“. Keine Versprechen verschärft.
4. Suchbegriffe: Titel enthält Badsanierung, Aßlar, Wetzlar. Beschreibung (149 Zeichen) enthält zusätzlich große Fliesen, Abdichtung, DIN 18534, Festpreisangebot. Im Text stehen große Fliesen und bodengleiche Dusche (Vorspann) sowie Abdichtung, DIN 18534 und Festpreisangebot (Abschnitte 3 und 4). Teilweise erfüllt, siehe OFFENE FRAGEN 1 und 2.
5. Seitenformel: Abschnitte 1 bis 6 mit den Namen aus dem Muster. Hauptknopf „Termin vor Ort anfragen“ je einmal in Abschnitt 1 und 6. Alle zehn Links existieren unter `src/app/(bestand)/`. Doppelungen: fünf entfernt.
6. Glossarklammern: Alle sieben Fachwörter gelesen. Zwei Sätze, die nur die Erklärung wiederholten (Gefälle, Abdichtung), sind gestrichen. Das erste Vorkommen jedes Glossarworts ist Fachwort.
7. Ton: Sie-Form, wir-Form, keine Ich-Form, kein „Traumbad“, keine Werbewörter.

WICHTIGSTE ÄNDERUNGEN
1. Zeichnung „schichten“: Sätze ohne „Sie“ für Schichten („Die Abdichtung liegt zwischen Untergrund und Kleber.“). „vorher geprüft“ und „rutschfest“ entfernt. Grund: Anredeverwechslung und Doppelungen.
2. Schritt 3: „besenrein“ zu „sauber gefegt“, „Abnahme“ zu „gehen … durch“. Grund: Wortschatz für P1, Sinn wie F-17 und F-11.
3. Abschnitt 2, „Alles aus einer Hand“: „bis zur Abnahme“ zu „bis zum fertigen Bad“. Grund: wie 2, Sinn wie F-13.
4. Abschnitt 3, Punkte 2 und 3: „So fließt das Wasser …“ und „So bleibt das Wasser …“ gestrichen. Grund: Glossarregel.
5. Vorspann: Satz umgebaut, damit das Fachwort nicht vor einem Doppelpunkt steht. Grund: Lesbarkeit.
6. Absatz zu 2019: „ist … Standard“ zu „arbeiten … standardmäßig nach DIN 18534“. Grund: Fachwort ans Satzende, Sinn wie F-15.
7. Beschreibung: neu mit Festpreisangebot und Abdichtung. Grund: Suchbegriffe aus E0.
8. Abschnitt 2 „Große Fliesen“ als ein Satz; Zeile „Hilfen“ sichtbar beschriftet. Grund: je ein kurzer Satz, Zeile sonst nicht lesbar.

PRÜFUNG UND ERGEBNIS
Befehl: `cd /home/user/tezgel/_werkstatt && node werkzeuge/textpruefung.mjs --art erzaehl texte/bad.md; echo EXIT=$?`
```
_werkstatt/texte/bad.md · GRÜN · Stücke 41 · Sätze 51 · Flesch 72.9 · Satz Ø 8.1
  ok  (alle 12 Regeln: Titel, Beschreibung, Satzlängen, Flesch, Absätze, Striche,
       Bindestriche, Floskeln, Fachwort-Kennungen, Glossar, Bild- und Stimmenkennungen)
  Zahlen im Text (gegen K-015 prüfen): 10 · 11 · 2019 · 18534 · 2008 · 4.180
EXIT=0
```
Vorher ebenfalls GRÜN. `git status --porcelain` vorher und nachher: `bad.md` ist jetzt ` M`. Dazu erschien während des Laufs `?? _werkstatt/texte/blog.md`; das habe ich nicht angelegt und nicht angefasst.

GEMEINSAME DATEIEN
- Nichts geändert.
- K-015 hat keine F-Nummer für das Gefälle im Duschboden (F-21 gilt für Balkon und Terrasse). Quelle des Satzes: `src/config/services.js:22`. Bitte Orchestrator prüfen.
- Untracked `_werkstatt/texte/blog.md` erschien während des Laufs, nicht von mir.

OFFENE FRAGEN
1. Hauptbegriffe aus der CSV-Zeile `/bad`: „Fachbetrieb“ (Titel) sowie „schlüsselfertig“ und „Fachqualität“ (H1) fehlen im Text. „schlüsselfertig“ wäre für P1 Fachjargon. Entscheidung offen.
2. Festpreisangebot, DIN 18534 und Abdichtung stehen nicht in Titel, H1 oder Vorspann. Ein Platz in der Vorspann würde den Satz aus Abschnitt 4 doppeln.
3. Methodensätze ohne F-Nummer in K-015: „Der Duschboden bekommt ein leichtes Gefälle.“, „prüft Boden und Wände“ (F-12 nennt nur Aufmaß und Schadensanalyse), „Sie wählen mit uns Fliesen und Ausstattung aus.“ (F-11: Material und Fugenbild). Bitte bestätigen oder streichen.
4. Bauhinweis „Hilfen“ nennt F-04 und F-05. Beide betreffen Telefon und Handwerkskammer, nicht die Werkzeuge. Verweis prüfen.
5. Zuschuss-Satz in Abschnitt 4: Das Fachwort „barrierefreien“ steht mitten im Satz. Lesbar, aber holpriger als die übrigen. Gestaltung der Klammer prüfen.

=== ENDE E3-LEKT-01 · BEREIT ZUR RÜCKGABE ===
