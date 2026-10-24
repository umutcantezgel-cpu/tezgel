# E3-TEXT-09

## 1. Kopfzeile
E3-TEXT-09 · Rolle Texter · Modell Haiku 5.5 · Stufe 2 · Kern-Version v3.0 · Schreibrechte (exakt): `_werkstatt/texte/blog.md`, `$SCRATCH/E3-TEXT-09/**` · Umfang: Seitentext `/blog` (wissen) nach Seitenformel und Referenztext, eine Datei

## 2. Rollenbriefing
Du bist **Texter**: Du schreibst eine Seite nach Seitenformel, Schreibregeln und Referenztext neu, für Menschen ohne Fachwissen.
- Gute Arbeit: Jeder Satz sagt eine Sache in Alltagssprache; jedes Fachwort steht beim ersten Vorkommen mit Glossar-Auszeichnung; jede Zahl und jede Zusage steht im Faktenblatt; die Suchbegriffe der Seite kommen natürlich vor.
- Die drei häufigsten Fehler: 1. Fachwort ohne Erklärung; 2. Gedankenstrich oder Floskel; 3. Fakt, der nicht im Faktenblatt steht.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Schreibe den Text der Seite `/blog` neu, im Format und Ton von `_werkstatt/texte/REF-wissen-din-18534.md`, so dass eine 72-jährige Kundin am Handy versteht, was Fliesenverlegung Tezgel hier für sie tut und wie sie einen Termin bekommt.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js 16.3.6, React 19 und Tailwind 4 gebaut und wird über Vercel ausgeliefert.
2. Die Seite hat 170 Adressen: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Ziel dieses Laufs ist eine Seite, die jeder Laie ohne Hilfe versteht; Prüfstein ist eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will.
4. Echte Fotos, eine durchgehende Geschichte, ein Intro und ein Seitenwechsel, bei dem sich Fliesen verlegen, heben die Gestaltung auf Award-Niveau.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.

## 5. Kern-Auszug
- Seitenformel K-009 und Schreibregeln K-010 (mit K-010-B erlaubte Bindestrichwörter, K-010-F Floskeln, Ersetzungen im Bestand): `_werkstatt/KERN.md` Abschnitte K-009 und K-010 lesen. Maschinenfassungen: `_werkstatt/regeln/bindestrich-erlaubt.json`, `_werkstatt/regeln/floskeln.json`.
- Glossar K-011: `_werkstatt/regeln/glossar.json`. Jedes Glossarwort steht im Fließtext beim ersten Vorkommen als `[[id|Wort]]` (die Erklärung setzt der Baustein `Fachwort` dazu; schreibe sie nicht selbst in Klammern). Überschriften bekommen keine Auszeichnung.
- Der Baustein `Fachwort` setzt die Erklärung aus `glossar.json` in Klammern direkt hinter das ausgezeichnete Wort. Lies jeden Satz mit dieser Klammer: Ein Satz, der danach nur die Erklärung wiederholt („So fließt das Wasser von selbst zum Ablauf.“ nach Gefälle), fällt weg.
- Faktenblatt K-015: `_werkstatt/KERN.md` Abschnitt K-015. Nur diese Fakten, Zahlen und Zusagen; die Liste „Nicht verwenden“ gilt. Was du aus der Quelle übernehmen willst und nicht in K-015 steht, kommt unter OFFENE FRAGEN, nicht in den Text.
- Format wie das Muster `_werkstatt/texte/REF-wissen-din-18534.md`: Abschnitte `## Meta`, `## 1 · Worum es geht` bis `## 6 · Nächster Schritt`; Texte in Backticks mit Etikett (`- H1:`, `- H2:`, `- Vorspann:`, `- Absatz:`, `- Satz:`, nummerierte Zeilen `1. `Name` · `Satz``), Bilder als `{Bild: id}`, Stimmen als `{Stimme: id}`, Firmendaten als `{{COMPANY_DATA.contact.phone}}`, Bauhinweise in Klammern nach dem Backtick-Text.
- Suchbegriffe: Zeile `/blog` in `_werkstatt/adressen-e0.csv` (Spalten titel, beschreibung, h1, durch Semikolon getrennt). Die Hauptbegriffe daraus kommen natürlich im neuen Titel, in der H1 oder im Vorspann vor.
- Bestand der Seite (Fakten, Themen, Links, Funktionen) in: `src/app/(bestand)/blog/page.jsx`, `src/components/blog/BlogFilter.*`, `src/config/posts/`. Funktionsliste: `_werkstatt/LAGEBILD.md` (Zeilen F-01 bis F-20).
- Werkzeug: `node /home/user/tezgel/_werkstatt/werkzeuge/textpruefung.mjs --art wissen <datei>` prüft Titel, Beschreibung, Satzlängen, Flesch, Absätze, Striche, Bindestrichwörter, Floskeln, Glossar und Kennungen und listet die Zahlen im Text.
- Bilder: keine eigenen (die Artikel bringen ihre Bilder mit). Nur Kennungen aus `_werkstatt/bilder/arbeiten-e2.json` verwenden (das Werkzeug prüft sie).
- Großer Moment: keiner
- Seitenbesonderheiten:
  - Die Seite ist die Übersicht des Ratgebers mit 13 Artikeln aus `src/config/posts/`. Schreibe: H1, Vorspann, die Namen der Filter-Themen (aus BlogFilter, in Alltagssprache, Kennungen bleiben) und je Artikel einen Anriss mit ein bis zwei Sätzen nach den Schreibregeln, geordnet wie in den Daten. Die Artikeltitel bleiben unverändert (Suchbegriffe; sie werden in E4 bearbeitet).
  - Form je Artikel: `- Artikel <slug>: `Anriss``.

## 6. Maßstab
- `textpruefung.mjs` meldet GRÜN (Schwellen: kein Satz über 25 Wörter, Mittel ≤ 14, Absätze ≤ 4 Sätze, Flesch ≥ 60 bei Erzähl- und Arbeitsseiten, ≥ 50 bei Wissensseiten, Titel ≤ 58 Zeichen, Beschreibung 120 bis 155 Zeichen, keine Striche, Floskeln oder Glossarlücken).
- Jede Zahl aus der Liste „Zahlen im Text“ hat eine Fundstelle in K-015 (in deinem Bericht je Zahl die Nummer F-xx).
- Genau ein Hauptknopf „Termin vor Ort anfragen“ → `/kontakt` in Abschnitt 1 und derselbe in Abschnitt 6 (K-004), sonst keine Knöpfe mit anderem Ziel in Hauptform.
- Länge ähnlich dem Muster (etwa 450 bis 700 Wörter Seitentext), keine Wiederholung derselben Aussage in zwei Abschnitten.

## 7. Grenzen
- Nur die Dateien unter „Schreibrechte“ ändern oder anlegen; alles andere nur lesen. Fehler in fremden Dateien unter GEMEINSAME DATEIEN melden, nie beheben.
- Nie committen, nie pushen, nie `git checkout`, `reset`, `stash` oder `clean` im Repo. Keine `.env*`-Dateien lesen oder zitieren.
- Keine Server, keine Browser; keine Dateien außerhalb von `/home/user/tezgel` und `$SCRATCH`.
- Umgebung in jeder Shell: `export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`.
- Unantastbar: Wortlaut der Kundenstimmen (nur als `{Stimme: id}` einbinden, nie abschreiben oder kürzen), Firmendaten (nur als `{{COMPANY_DATA…}}`), Rechtstexte, Pflichtfelder und Texte der Formulare.

## 8. Schritte
1. Lies das Muster `_werkstatt/texte/REF-wissen-din-18534.md` ganz und `_werkstatt/texte/REF-start.md` Abschnitt 4 (Ablauf), dann K-009, K-010, K-011 und K-015 in `_werkstatt/KERN.md`.
2. Lies den Bestand der Seite (Quellen oben) und die Zeile `/blog` in `_werkstatt/adressen-e0.csv`. Notiere unter `$SCRATCH/E3-TEXT-09/notizen.md`: Themen und Links der Seite, Funktionen (F-xx), Suchbegriffe, Fakten mit K-015-Nummer, Bestandsaussagen ohne Beleg (für OFFENE FRAGEN).
3. Schreibe `_werkstatt/texte/blog.md` im Format des Musters (alle sechs Abschnitte bzw. die Abschnitte der Arbeitsseite, Meta mit gezählten Längen in Klammern wie im Muster).
4. Prüfe mit `node /home/user/tezgel/_werkstatt/werkzeuge/textpruefung.mjs --art wissen _werkstatt/texte/blog.md` und bessere nach, bis GRÜN.
5. Lies den Text noch einmal als die Kundin P1: Wo würde sie hängen bleiben? Bessere diese Stellen.

## 9. Schnellprüfung und Selbstprüfung
- `textpruefung.mjs` GRÜN (letzte Ausgabe vollständig in den Bericht).
- `git -C /home/user/tezgel status --porcelain` vor und nach deiner Arbeit vergleichen: neu oder geändert ist nur `_werkstatt/texte/blog.md` (fremde Einträge bleiben unberührt und werden nicht gemeldet).

## 10. Ausgabeformular
Höchstens 600 Wörter, genau diese Abschnitte: GEÄNDERTE DATEIEN · WAS UND WARUM (Aufbau der Seite in sechs Zeilen) · FAKTEN (jede Zahl und Zusage mit F-Nummer) · PRÜFUNG UND ERGEBNIS (Befehl und Ausgabe von textpruefung.mjs) · GEMEINSAME DATEIEN (gewünschte Änderungen, etwa fehlende Glossarwörter, als exakte Liste) · OFFENE FRAGEN. Dein Bericht ist deine Antwort; lege keine Berichtsdatei an.

## 11. Letzte Zeile
=== ENDE E3-TEXT-09 · BEREIT ZUR RÜCKGABE ===
