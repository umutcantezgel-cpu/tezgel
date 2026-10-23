# E2-LEKT-404 · Rückgabe

GEÄNDERTE DATEIEN
Keine im Repo. Notizen nur in `$SCRATCH/E2-LEKT-404/` (`zaehl.py`, `zaehl2.py`, `zaehlung.txt`, Ausgaben, Statusdateien). Eine Statusdatei lag kurz außerhalb und wurde verschoben.

WAS UND WARUM
Zuerst als P1 gelesen, dann nach Regeln. Die Regeln sind bis auf den Glossarbefund unter 4 bestanden.

404:
1. „Hier liegt eine Fliese schief:“ (Vorspann). Die Metapher hängt am Bild, das auf dem Handy nicht sicher neben dem Text steht. Ersatz: „Diese Seite gibt es nicht, oder sie ist umgezogen. Einer dieser drei Wege bringt Sie weiter.“
2. „Diese Adresse“ (Vorspann, Beschreibung). Kann als Wohnadresse gelesen werden. Ersatz: „Diese Seite“. Die Beschreibung bleibt dann bei 144 Zeichen.
3. Der Telefonknopf zeigt nur „06441 / 44 83 567“. K-010 nennt als Mikrotext „Anrufen: 06441 / 44 83 567“. Ersatz: dieser Text sichtbar; der Name bleibt.

Startseite:
4. „Balkon vor dem Fliesen: Dichtband an allen Rändern“. „vor dem Fliesen“ holpert, „allen“ steht nicht im Alt-Text, und „Dichtband“ (K-011) hat keine Erklärung. Ersatz: „Balkonboden vor dem Verlegen: blaues Dichtband an den Rändern“. „Dichtband“ bekommt den Baustein Fachwort mit der K-011-Erklärung „Bänder und Stücke, die Ecken, Rohre und Abläufe in der Abdichtung dicht machen.“
5. „Balkon mit dunklen Fliesen, versetzt verlegt“: Fachjargon. Ersatz: „Balkon mit dunklen Fliesen, jede Reihe um ein Stück versetzt“.
6. „Badewanne mit dunkler Mosaikverkleidung“: schwer lesbares Kompositum. Ersatz: „Badewanne mit dunklen Mosaikfliesen“.
7. „Treppe vor dem Haus mit Fliesen in Terrakotta“: „vor dem Haus“ steht nicht im Alt-Text. Ersatz: „Außentreppe mit Fliesen in Terrakotta“.

GEMEINSAME DATEIEN (nicht geändert)
- `src/app/(bestand)/not-found.tsx`: Befunde 1 bis 3.
- `src/components/start/StartBeleg.tsx`: Unterschriften nach den Befunden 4 bis 7. Die Ortsgruppen ändern sich erst nach Klärung von M-04.
- `src/config/arbeiten.ts`, `start-galerie-4`, alt: „Terrasse mit großen hellgrauen Platten, einer Stütze in der Mitte und einem Geländer am Rand“.

PRÜFUNG UND ERGEBNIS
- `python3 zaehl.py`: Gedankenstriche 0 · Bindestrichwörter 0 · Floskeln 0 · Sätze über 25 Wörter 0 · Glossartreffer 1 („Dichtband“, Befund 4).
- `python3 zaehl2.py`: Titel 52 Zeichen (≤ 60) bestanden · Beschreibung 146 (120 bis 155) bestanden · mittlere Satzlänge 11,5 (≤ 14) bestanden · Entfernungen: 11 von 13 Werten gleich ab Aßlar und ab Wetzlar (Offene Frage 1).
- Lesen: texte.md stimmt mit `not-found.tsx`, `StartBeleg.tsx`, `TerminAnfrage.tsx` und `StartEinstieg.tsx` überein. Bewertung, Stand und Telefon stimmen mit `src/config/reviews.js` und K-015 F-04 überein.
- Amstad nicht gemessen: K-010 nennt für die 404 keine Schwelle.
- `git status --porcelain` vor und nach der Arbeit verglichen: keine Änderung durch mich.

BILDBELEGE (unter `/home/user/tezgel/public/images/arbeiten/`)
- start-galerie-4: `balkon-und-terrasse/terrasse-hellgraue-platten-stuetze-800.jpg` (große Platten sichtbar, nicht im Alt-Text)
- start-galerie-5: `treppe/aussentreppe-terrakotta-hochformat-800.jpg` („vor dem Haus“ nicht erkennbar)
- start-galerie-6: `balkon-und-terrasse/balkon-dichtband-von-hinten-800.jpg` (blaues Band an zwei Rändern sichtbar, nicht an allen belegt)
- start-galerie-1 bis -3: nur Alt-Abgleich, passt.

OFFENE FRAGEN
1. M-04: Die Startseite zählt ab Aßlar, K-015 F-09 und `src/config/cities.ts` ab Wetzlar. In `src/lib/maps/getMapEmbedUrl.ts` sind alle Werte außer Aßlar und Wetzlar gleich. Neu messen oder den Bezug ändern? „Bis 50 km“ hat keine Fundstelle; K-015 nennt 45 km.
2. M-03: Freitag bis 17 oder 18 Uhr? Text und Code sagen 17 Uhr; K-015 F-07 markiert das als Annahme.
3. Soll unter dem Hauptknopf der 404 ein Satz stehen, was nach dem Klick passiert (Rückruf, kostenfreier Termin nach K-015 F-12)?
4. Soll die Metapher bleiben? Alternative: „Hier ist etwas verrutscht: Diese Seite gibt es nicht, oder sie ist umgezogen.“
5. Abschnitt B enthält 19 Kurztexte, nicht 17. Alle sind geprüft.

=== ENDE E2-LEKT-404 · BEREIT ZUR RÜCKGABE ===
