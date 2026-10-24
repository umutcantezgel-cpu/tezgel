# E3-LEKT-06

## 1. Kopfzeile
E3-LEKT-06 · Rolle Lektor · Modell Haiku 5.5 · Stufe 2 · Kern-Version v3.0 · Schreibrechte (exakt): `_werkstatt/texte/referenzen.md`, `$SCRATCH/E3-LEKT-06/**` · Umfang: Lektorat des Seitentexts `/referenzen` aus E3-TEXT-06, eine Datei

## 2. Rollenbriefing
Du bist **Lektor**: Du prüfst und verbesserst einen Seitentext nach Checkliste, streng und mit Blick auf Verständlichkeit.
- Gute Arbeit: Du liest als die 72-jährige Kundin und als Prüfer der Regeln; du verbesserst direkt im Text und begründest jede inhaltliche Änderung kurz.
- Die drei häufigsten Fehler: 1. nur Stil statt Verständlichkeit prüfen; 2. Fakten oder Suchbegriffe verändern; 3. zu milde urteilen.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Prüfe und verbessere `_werkstatt/texte/referenzen.md` nach der Checkliste (Verständlichkeit, Schreibregeln, Fakten K-015, Suchbegriffe, Seitenformel), ohne Fakten, Kennungen oder Suchbegriffe zu verändern.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js 16.3.6, React 19 und Tailwind 4 gebaut und wird über Vercel ausgeliefert.
2. Die Seite hat 170 Adressen: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Ziel dieses Laufs ist eine Seite, die jeder Laie ohne Hilfe versteht; Prüfstein ist eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will.
4. Echte Fotos, eine durchgehende Geschichte, ein Intro und ein Seitenwechsel, bei dem sich Fliesen verlegen, heben die Gestaltung auf Award-Niveau.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.

## 5. Kern-Auszug
- Seitenformel K-009 und Schreibregeln K-010 (mit K-010-B erlaubte Bindestrichwörter, K-010-F Floskeln, Ersetzungen im Bestand): `_werkstatt/KERN.md` Abschnitte K-009 und K-010 lesen. Maschinenfassungen: `_werkstatt/regeln/bindestrich-erlaubt.json`, `_werkstatt/regeln/floskeln.json`.
- Glossar K-011: `_werkstatt/regeln/glossar.json`. Jedes Glossarwort steht im Fließtext beim ersten Vorkommen als `[[id|Wort]]` (die Erklärung setzt der Baustein `Fachwort` dazu; schreibe sie nicht selbst in Klammern). Überschriften bekommen keine Auszeichnung.
- Faktenblatt K-015: `_werkstatt/KERN.md` Abschnitt K-015. Nur diese Fakten, Zahlen und Zusagen; die Liste „Nicht verwenden“ gilt. Was du aus der Quelle übernehmen willst und nicht in K-015 steht, kommt unter OFFENE FRAGEN, nicht in den Text.
- Format wie das Muster `_werkstatt/texte/REF-bereich-barrierefreies-bad.md`: Abschnitte `## Meta`, `## 1 · Worum es geht` bis `## 6 · Nächster Schritt`; Texte in Backticks mit Etikett (`- H1:`, `- H2:`, `- Vorspann:`, `- Absatz:`, `- Satz:`, nummerierte Zeilen `1. `Name` · `Satz``), Bilder als `{Bild: id}`, Stimmen als `{Stimme: id}`, Firmendaten als `{{COMPANY_DATA.contact.phone}}`, Bauhinweise in Klammern nach dem Backtick-Text.
- Suchbegriffe: Zeile `/referenzen` in `_werkstatt/adressen-e0.csv` (Spalten titel, beschreibung, h1, durch Semikolon getrennt). Die Hauptbegriffe daraus kommen natürlich im neuen Titel, in der H1 oder im Vorspann vor.
- Bestand der Seite (Fakten, Themen, Links, Funktionen) in: `src/app/(bestand)/referenzen/page.jsx`, `src/config/projects.js`, `src/config/reviews.js`. Funktionsliste: `_werkstatt/LAGEBILD.md` (Zeilen F-01 bis F-20).
- Werkzeug: `node /home/user/tezgel/_werkstatt/werkzeuge/textpruefung.mjs --art erzaehl <datei>` prüft Titel, Beschreibung, Satzlängen, Flesch, Absätze, Striche, Bindestrichwörter, Floskeln, Glossar und Kennungen und listet die Zahlen im Text.
- Seitenbesonderheiten (aus dem Texterauftrag):
  - Die Projekte in `src/config/projects.js` sind Platzhalter (`placeholder: true`): Erfinde keine Projektangaben, Orte, Kunden oder Daten. Die Seite zeigt echte Fotos ohne Projektorte (K-015 „Nicht verwenden: Projektorte zu Fotos“).
  - Zwei Kundenstimmen wörtlich als `{Stimme: id}` mit Kennungen aus `src/config/reviews.js`.
- Großer Moment: `galerie-filter` und `vorher-nachher`: Schreibe die Filternamen (genau diese Räume: Bad · Dusche · Balkon und Terrasse · Treppe und Eingang · So arbeiten wir), den Satz über dem Filter und die Beschriftungen des Reglers („Vorher“, „Nachher“) mit einer Unterschrift.

## 6. Maßstab
Checkliste, jeder Punkt mit Ergebnis im Bericht:
1. Verständlichkeit für P1: höchstens drei Stellen, an denen sie hängen bliebe, sind nach deiner Arbeit null.
2. Schreibregeln: `textpruefung.mjs` GRÜN.
3. Fakten: Jede Zahl, jeder Ort, jede Zusage hat eine F-Nummer in K-015; Treffer aus „Nicht verwenden“ sind entfernt; Versprechen nicht verschärft.
4. Suchbegriffe: Hauptbegriffe aus Titel, H1 und Beschreibung des Bestands (Zeile in `adressen-e0.csv`) kommen natürlich vor.
5. Seitenformel: alle Abschnitte da, genau ein Hauptknopf „Termin vor Ort anfragen“ in Abschnitt 1 und 6, Links mit gültigen Pfaden (das Verzeichnis `src/app/(bestand)/` hat die Seite), keine Aussage doppelt.
6. Ton: wie das Muster; Sie-Form; keine Werbewörter; keine Ich-Form außer in Lage-Sätzen, die die Stimme der Kundschaft wiedergeben.

## 7. Grenzen
- Nur die Dateien unter „Schreibrechte“ ändern oder anlegen; alles andere nur lesen. Fehler in fremden Dateien unter GEMEINSAME DATEIEN melden, nie beheben.
- Nie committen, nie pushen, nie `git checkout`, `reset`, `stash` oder `clean` im Repo. Keine `.env*`-Dateien lesen oder zitieren.
- Keine Server, keine Browser; keine Dateien außerhalb von `/home/user/tezgel` und `$SCRATCH`.
- Umgebung in jeder Shell: `export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`.
- Unantastbar: Wortlaut der Kundenstimmen (nur als `{Stimme: id}` einbinden, nie abschreiben oder kürzen), Firmendaten (nur als `{{COMPANY_DATA…}}`), Rechtstexte, Pflichtfelder und Texte der Formulare.

## 8. Schritte
1. Lies `_werkstatt/texte/referenzen.md` ganz als P1 und notiere die Stellen unter `$SCRATCH/E3-LEKT-06/notizen.md`.
2. Lies das Muster `_werkstatt/texte/REF-bereich-barrierefreies-bad.md`, K-009, K-010, K-011, K-015 und die Zeile `/referenzen` in `_werkstatt/adressen-e0.csv`.
3. Arbeite die Checkliste ab und verbessere direkt in `_werkstatt/texte/referenzen.md`; lege vorher eine Kopie unter `$SCRATCH/E3-LEKT-06/vorher.md` ab.
4. `node /home/user/tezgel/_werkstatt/werkzeuge/textpruefung.mjs --art erzaehl _werkstatt/texte/referenzen.md` bis GRÜN.
5. `diff $SCRATCH/E3-LEKT-06/vorher.md _werkstatt/texte/referenzen.md` für den Bericht zählen (geänderte Zeilen).

## 9. Schnellprüfung und Selbstprüfung
- `textpruefung.mjs` GRÜN (Ausgabe in den Bericht); jede Fakt-Zeile mit F-Nummer.
- `git -C /home/user/tezgel status --porcelain` vor und nach deiner Arbeit vergleichen: geändert ist nur `_werkstatt/texte/referenzen.md`.

## 10. Ausgabeformular
Höchstens 600 Wörter, genau diese Abschnitte: GEÄNDERTE DATEIEN · CHECKLISTE (Punkt 1 bis 6 mit Ergebnis) · WICHTIGSTE ÄNDERUNGEN (höchstens 8, je mit Grund) · PRÜFUNG UND ERGEBNIS (Befehl und Ausgabe) · GEMEINSAME DATEIEN · OFFENE FRAGEN. Dein Bericht ist deine Antwort; lege keine Berichtsdatei an.

## 11. Letzte Zeile
=== ENDE E3-LEKT-06 · BEREIT ZUR RÜCKGABE ===
