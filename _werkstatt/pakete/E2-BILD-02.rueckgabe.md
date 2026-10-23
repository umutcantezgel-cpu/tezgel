# E2-BILD-02 · Rückgabe

GEÄNDERTE DATEIEN
- Neu: `_werkstatt/bilder/auftrag-e2.json` (38 Aufträge), `_werkstatt/bilder/arbeiten-e2.json` (38 Einträge: id, src, breite, hoehe, alt, raum, blurDataURL).
- Neu: `public/images/arbeiten/**` (91 JPEG in den Ordnern bad, dusche, balkon-und-terrasse, treppe). `public/images/arbeiten/bilder.json` nach Schritt 3 gelöscht.

WAS UND WARUM
- 38 Aufträge für 38 Fotoplätze in den neun Abschnitten. Sechs Plätze teilen Dateien mit gleichem Ausschnitt, daher 32 Bilddateien.
- Schwerpunkte aus Liste oder Inventar. Weggeschnitten wurden Gerüst und Pfosten (IMG_2544, IMG_2545), eine Herstellerplatte (IMG_2587, nur bis 52 % Breite), Markenfolie am Fenster (IMG_2608, oben 34 %), Anleitungsaufkleber (IMG_2567, links 34 %), Schrift auf dem Dichtband (IMG_2547, rechts 35 %), Gesichter (IMG_2542), Fußmatte und Rohr (IMG_2524, IMG_2535).
- Bei IMG_2610, IMG_2599 und IMG_2570 liegen die Balken über 25 %. Oben und unten sind deshalb manuell 33 bis 35 % gesetzt, sonst kappt das Werkzeug bei 25 %.
- Farbkorrektur aus bei 16 warmen Motiven (Terrakotta, Holz, Beige, Rosé, Erdtöne, Salbeigrün). Mit Korrektur wirkten sie grau.
- Alt-Texte nach dem Bild geschrieben. Sieben Plätze weichen von der Liste ab, weil das Bild es verlangt (entstehung-dusche-2, kontakt-eingang, sanierung-weg-1 und -3, bereich-wanne-mit-tuer, balkon-einstieg, ueber-einstieg). Keine Striche, längster Text 107 Zeichen.
- Die Quelle reicht nicht für die Wunschbreite (nie hochskaliert): fünf Plätze nur 480 px, drei nur 640 px.

GEMEINSAME DATEIEN (nicht geändert)
- `_werkstatt/bildplaetze.md`: Alt-Texte der sieben Plätze übernehmen (siehe JSON). Die Tabelle „/bad“ hat keine Kopfzeile.
- `_werkstatt/bildinventar.csv`: IMG_2608 zeigt oben links ein Fenster mit Markenfolie (Inventar: „kein Fenster“). IMG_2567 hat einen Anleitungsaufkleber an der Wannentür.
- Raum: Die Während-Bilder (IMG_2587, IMG_2575, IMG_2568) liegen unter `bad` wie im Inventar, nicht `baustelle`.
- Beobachtung: `_werkstatt/werkzeuge/.ueb.mjs` (nicht verfolgt) war vor meinem Lauf im Status und ist danach weg. Ich habe sie nicht angefasst.

PRÜFUNG UND ERGEBNIS
- `node _werkstatt/werkzeuge/bilder.mjs --auftrag _werkstatt/bilder/auftrag-e2.json --ziel public/images/arbeiten`: Exit 0, 38 Einträge. Letzter Lauf auf leerem Ordner.
- `node _werkstatt/werkzeuge/bilder.mjs --pruefe public/images/arbeiten`: Exit 0, 91 Bilder, kein Fund.
- Sichtprüfung: alle 32 Dateien in größter Breite mit Read angesehen. Nach dem Sehen drei Ausschnitte korrigiert.
- start-dusche: 37 KB bei 640 px, 105 KB bei 1280 px (Grenze 200 KB eingehalten).
- Rand-Hinweis „am Anschlag“ bei fünf Aufträgen erwartet (siehe oben). Im Ergebnis kein schwarzer Balken.
- `git status` vorher und nachher: neu nur `public/images/arbeiten/`, `_werkstatt/bilder/arbeiten-e2.json`, `_werkstatt/bilder/auftrag-e2.json`.

BILDBELEGE (ab `public/images/arbeiten/`, größte Breite je Datei; Breiten 480 bis 1280 liegen daneben; ID-Zuordnung in `_werkstatt/bilder/arbeiten-e2.json`)
- dusche/: dusche-ohne-stufe-graue-fliesen, dusche-ohne-stufe-sitzbank-mosaik, galerie-dusche-sitzbank-mosaik, barrierefrei-dusche-sitzbank-mosaik, dusche-dunkler-streifen-sitzbank, dusche-im-bau-nivellierlaschen, dusche-im-bau-fliesen-schraeg-zum-ablauf
- bad/: badewanne-dunkle-verkleidung-quadrat, badewanne-dunkle-verkleidung-hochformat, helles-bad-glasdusche-holzoptik, wanne-weisse-fliesen-lichtlinie, landhausbad-wanne-holzregal, landhausbad-doppelwaschtisch-goldspiegel, dusche-mosaikstreifen-handbrause, freistehende-wanne-steinoptik, bad-waehrend-arbeit-beige-wand, bad-waehrend-ausbau-holzoptik-decke, bad-waehrend-ausbau-braune-fliesen, einstiegswanne-mit-tuer, fischgraet-gruene-fliesen-nische
- balkon-und-terrasse/: balkon-grosse-hellgraue-fliesen, balkon-anthrazit-fliesen-versetzt, terrasse-hellgraue-platten-stuetze, balkon-dichtband-von-hinten, terrasse-aluprofil-plattenkante, balkon-rosebraune-fliesen, terrasse-erdtoene-ablaufrost, platten-auf-stelzlagern, ueber-uns-dichtband-balkon
- treppe/: aussentreppe-terrakotta-quadrat, aussentreppe-terrakotta-hochformat, eingang-stufen-beige-fliesen

OFFENE FRAGEN
1. start-dusche (IMG_2578): Das Inventar verlangt eine Herkunftsklärung vor der Startbild-Nutzung. Die „Schiefer-Dusche“ aus K-012 ist IMG_2561 und nicht verwendet.
2. sanierung-einstieg (IMG_2570): Herkunft und Urheberrecht offen. Katze und Bilderrahmen „NAKED“ bleiben im Bild, weil die Wanne sonst wegfiele. Behalten oder neu besetzen?
3. Person von hinten (IMG_2547, drei Plätze): kein Gesicht, eigenes Firmenlogo. Das Inventar verlangt eine Freigabe vor Veröffentlichung.
4. bereich-wanne-mit-tuer: Eine schwarz-rote Thermoskanne ist unten rechts angeschnitten, nicht ganz weg.
5. sanierung-weg-1: Die Herstellerplatte ist nur durch den Schnitt auf 52 % Breite entfernt. Das Bild ist schwach (480 px). Anderes Bild?
6. fliesen-fischgraet: Ein kleiner, nicht lesbarer Herstellerschriftzug steht auf dem Nischenrahmen im Hintergrund.
7. balkon-beleg-3: Drei kleine Blätter liegen auf den Platten (Inventar: vor Verwendung entfernen).
8. bad-einstieg: Der Boden wirkt wie echtes Holz. Material offen, der Alt-Text bleibt „Holzoptik“.

=== ENDE E2-BILD-02 · BEREIT ZUR RÜCKGABE ===
