# E4-NACH-15 · Rückgabe Baumeister

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/blog/[slug]/page.jsx`
- `src/components/blog/ReadingProgress.jsx`
- `src/components/blog/TableOfContents.jsx`
- `src/components/blog/RelatedPosts.jsx`
- `src/components/blog/BlogAuthorCard.jsx`

## WAS UND WARUM
- **Tabellen** (Befund 29, axe): Jede Tabelle ist eine benannte, per Tab fokussierbare Region (`role="region"`, `tabIndex=0`, Name „Tabelle: <nächste Überschrift>“). Zellen brechen um (`break-words`, `hyphens-auto`, `min-w-0`), unter sm `px-3`. Messwerte (kurz, mit Ziffer oder A/B/C) stehen in `font-mono`, der Text bleibt.
- **Lesebreite** (Befund 30): `max-w-mass` (66ch) richtet sich nach der Schriftgröße des Elements. Vorspann, Schlagworte, Teilen, PDF-Feld und Autorfeld setzen deshalb `text-fs-3` wie der Text. Text, Schlagworte und Teilen enden bei x≈1143 (1440 px). Verwandte bleiben voll breit ab der Inhaltskante.
- **Lesefortschritt** (Befunde 35/36): Das Prozentfeld entfällt unter `lg`; ab `lg` steht es unter dem Kopf, rechts bündig (x=1328). Die Linie bleibt.
- **Inhaltsverzeichnis** (Befund 33): Aktiv ist der Abschnitt, dessen Überschrift `scroll-padding-top` passiert hat. Eine Scroll-Berechnung ersetzt dafür den IntersectionObserver. 12 von 12 Proben stimmen.
- **Verwandte** (Befunde 32/36): Kein Foto mehr. Ein dekoratives Verlegeplan-Motiv je Kategorie (Zuordnung laut Briefing, ohne Laserachse), Titel in `font-anzeige`, Anreißer ist der eigene Auszug.
- **Autorfeld** (Befund 34): Beim Betrieb steht das Logo (gleiche Datei und Alt-Text wie im Kopf) statt des Monogramms „F“. Name, Rolle und Texte bleiben.

## MIKROTEXT-ÄNDERUNGEN (alt → neu)
- Tabellenregion: – → „Tabelle: <Überschrift>“ (neu, zu melden; Fallback Artikeltitel)
- Verwandte Anreißer: „Fachbeitrag von Fliesenverlegung Tezgel – praxisnahe Hinweise zu Planung, Material und Ausführung.“ → eigener Auszug (`excerpt`)
- Verwandte Bilder: alt „<Titel>“ → entfällt mit dem Foto
- Autorfeld: Monogramm „F“ → Logo, alt „Fliesenverlegung Tezgel – Fachbetrieb Aßlar & Wetzlar“

## GEMEINSAME DATEIEN
- `src/app/globals.css`, Kommentar an `scroll-padding-top`: „Kopfhöhe + 16 px“ passt nicht zum Wert (`--spacing` × 24 = 96 px; Kopf `h-16` = 64 px). Bitte Kommentar oder Wert prüfen. Nicht geändert.
- Die Kategorie-Motiv-Zuordnung steht in `RelatedPosts.jsx`. Eine Zuordnung in der Liste habe ich nicht gefunden. Gibt es sie, gehört sie nach `src/config/blog.js`.

## PRÜFUNG UND ERGEBNIS
- Prüfstufe A: tsc GRÜN (0 Fehler) · eslint GRÜN (0/0) · Funktionstests GRÜN (41 erwartet, 0 unerwartet) · Bilder GRÜN · Textvergleich ROT (siehe unten).
- axe, final, beide Artikel bei 390 und 1440: 0 ernst/kritisch (vorher 3 × `scrollable-region-focusable`).
- `werte.mjs`: 0 Befunde. `textprobe`: page, ReadingProgress, TableOfContents je ENTFERNT 0; RelatedPosts ENTFERNT 1 (Teaser), BlogAuthorCard HINZU 1 (Alt-Text), beides gewollt.
- Textvergleich gegen e0: ROT, 242 Seiten, überwiegend Kopf, Fuß und fremde Seiten. Auf meinen Seiten nur die oben genannten Mikrotexte.
- Browserlauf (Lesen), beide Artikel: kein Dokumentüberlauf bei 390, 768, 1440. Menüknopf bei 390 an allen Scrolllagen frei. Verwandte: 3 Motive, 0 Bilder.
- Tabellen bei 390: Rutschfeste-Tabellen 1 und 3 passen. Bewertungsgruppen scrollt 63 px, Entscheidungshilfe (vier Spalten) 132 px; beide bleiben fokussierbar.

## BILDBELEGE
Scratchpad: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E4-NACH-15/`
- `bilder/blog__rutschfeste-fliesen-r-klassen/m390.jpg`, `…/d1440.jpg`
- `bilder/blog__duschrinne-oder-punktablauf/m390.jpg`, `…/d1440.jpg`
- `bilder-pruef/m390-tabelle.png`, `m390-mitte.png`, `d1440-mitte.png`, `d1440-verwandte.png`, `d1440-autor.png`, `duschrinne-m390-tabelle.png`

## OFFENE FRAGEN
1. Mikrotext „Tabelle: <Überschrift>“ (Fallback Artikeltitel) bestätigen oder ändern.
2. Angeschnittene Spalten bei 390 (Bewertungsgruppen 63 px, Entscheidungshilfe 132 px): Der Rahmen ist der einzige Hinweis, der Auftrag verlangt aber einen. Ein Hinweistext („seitlich scrollen“) bräuchte Freigabe, ein Umbau zu Zeilenkarten eine Gestaltungsentscheidung.
3. Zwei Verwandte derselben Kategorie zeigen dasselbe Motiv (z. B. „Fliesen & Material“). Gilt das als doppeltes Bild?
4. Die Kategorie `naturstein` gibt es in `src/config/blog.js` nicht; der Eintrag wirkt erst, wenn sie existiert.
5. Überlappung Stufe A, d1440: 22 Befunde, alle vom transparenten Vollbreiten-Rahmen des Prozentfelds (fixed, `pointer-events-none`). Das sichtbare Feld (50 × 26 px) überdeckt keinen Text. Soll die Stufe 0 zeigen, braucht das Feld eine andere Verankerung.
6. Über den Auftrag hinaus: Der Vorspann hat jetzt die Textbreite; vorher war er breiter als der Text. Bitte bestätigen, ebenso die Ausnahme beim Textvergleich.
7. Befund 29 betrifft nur Tabellenzellen. R-Klassen im Fließtext bleiben in Sans.
