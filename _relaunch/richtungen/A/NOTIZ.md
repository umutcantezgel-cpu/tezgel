# Richtung A · Fuge und Achse

**Markenaspekt:** Präzision von Fuge und Raster – Fugenbild, Achse, Millimeter, Nivelliersystem, Laserlinie: Ordnung als sichtbare Qualität.

## Leitidee (ein Satz)
Jede Seite ist ein Verlegeplan: ein Fugenraster, eine rote Laserachse – und alles fluchtet daran.

## Herleitung
- Kunden loben bei Tezgel zuerst „sauber und präzise“ (Elke S.), „ordnungsgemäß, sauber und pünktlich“ (C. W.). Präzision zeigt man beim Fliesenleger nicht mit Adjektiven. Man sieht sie an der Fuge, die durchläuft, und an der Achse, auf die alles ausgerichtet ist.
- Werkzeug und Ablauf liefern die Formen: Der **Kreuzlinienlaser** wirft Waage und Lot an die Wand. Das **Fugenkreuz** (Abstandhalter) sitzt in jedem Kreuzpunkt. Der **Verlegeplan** legt fest, wo die Achse liegt und dass die Passstücke an beiden Rändern gleich breit werden (Ablauf 02 „Planung von Fugenachsen“).
- Daraus folgen alle Gestaltungsebenen:
  - **Raster:** Spalten ohne Zwischenraum, nur durch 1-px-Fugen getrennt.
  - **Farbe:** genau ein Rot, und zwar das Laserrot. Es ist zugleich das Logo-Rot von „Tezgel“.
  - **Schrift:** schmale technische Grotesk, Maße in Mono.
  - **Bewegung:** Laser schaltet ein, Reihen rücken in die Flucht, nichts federt nach.
  - **SVG:** eckige Enden, spitze Ecken, Fugenkreuz als einziges gefülltes Zeichen.
- Das Logo verlangt diese Zurückhaltung: Der Comic-Fliesenleger ist laut und orange. Die Seite antwortet deshalb mit Ordnung statt mit noch mehr Farbe. Navy und Rot übernimmt sie aus der Wortmarke, Orange bleibt allein im Logo.

## Austauschprobe
- **Malerbetrieb:** hat keine Fuge, keine Passstücke, keinen Verlegeplan, kein Fugenkreuz. Der Einstieg wäre bei ihm sinnlos, denn dort liegt die Achse auf der Fuge unter „Großformat,“ und läuft am Desktop exakt durch die Mittelachse des gezeichneten Badplans.
- **Anderer Fliesenleger:** Raster und Laser allein könnte er übernehmen. Gebunden an Tezgel sind:
  - das Schriftfeld mit Inhaber, HWK Wiesbaden seit 2008, 35614 Aßlar und 5,0 / 27 (der Plan „gehört“ einem Betrieb),
  - die Gleichung Laserrot = Logo-Rot (bei einem anderen Logo bricht die Farblogik),
  - der Ablauf mit „Deniz Tezgel begutachtet … persönlich“,
  - die Kundenstimme „saubere u. präzise“ als Beleg genau dieser Leitidee.
- **OFFENE FRAGE:** Reicht das, oder soll der Plan später ein echtes, von Tezgel freigegebenes Projekt-Fugenbild zeigen? Nur das wäre wirklich unaustauschbar.

## Schriften
- **Archivo** (variabel, Gewicht + Breite), eine Familie in zwei Breiten:
  - Überschriften: Breite 74 %, Gewicht 760. Schmal genug, dass „Badsanierung,“ auf 375 px mit 44 px steht. Die Groteske wirkt wie Planbeschriftung, nicht wie Mode.
  - Fließtext: Breite 100 %, 400/600, 17–19 px, Zeilenhöhe 1,6. Ruhig für 35- bis 75-Jährige.
- **IBM Plex Mono 400** für alles Messbare und Belegbare: DIN 18534, R10/R11, Telefonnummern, PLZ, Bewertungen, Token-Namen. Nie für Fließtext.
- Eingebettet ist je eine latin-Datei (Archivo standard 90 KB, Plex Mono 15 KB). Die ganze Seite wiegt ≈ 338 KB.
- Skala mit 7 Stufen, alle per `clamp()` mit rem-Anteil, Maximum ≤ 2,5 × Minimum. Die größte Stufe `--fs-7` geht von 44 bis 104 px (Faktor 2,36).

## Palette (Regel: Neutrale auf 228°, gestuft nach Soll-Kontrast gegen Kalk)

| Rolle | Token | Hex | Kontrast |
|---|---|---|---|
| Grund | `--c-kalk` | #F5F4F0 | – |
| Fläche | `--c-fliese` | #FFFFFF | – |
| Fuge (deko) | `--c-fuge` | #DDDEE2 | 1,22 |
| Strich, Feldrand | `--c-strich` | #818698 | 3,29 Kalk / 3,62 Fliese |
| Nebentext | `--c-tinte-2` | #4B5067 | 7,22 / 7,95 |
| Text = Logo-Navy | `--c-tinte` | #0A1129 | 16,96 / 18,66 |
| Laser = Logo-Rot | `--c-laser` | #D82020 | 4,60 / 5,06 / 3,69 auf Tinte (nur Grafik/Fokus) |
| Rot als Text | `--c-laser-tief` | #A8171C | 6,80 / 7,49 |
| Erfolg | `--c-abnahme` | #1D6B3F | 5,91 / 6,51 |
| Text auf Tinte | `--c-nacht-2` | #A9AEC0 | 8,45 |
| Fuge auf Tinte | `--c-nacht-fuge` | #2B3352 | deko |

Alle Werte sind nach WCAG 2.x aus der relativen Leuchtdichte gerechnet und stehen auch in der Kachel. Rot hat zwei Stufen: Laser für Linien und Fokus, Laser tief für Text.

## Formsystem
- **Icons:** 24er-Raster, Lebensbereich 2,75–21,25, ein Strich von 1,5 px auf Halbpixel. Enden `square`, Ecken `miter`, fast nur 0° und 90°, Farbe über `currentColor`. Die sechs Icons: Telefon, Sprechblase (generisch), Bad, Großformat (Fliese + Bemaßung), Abdichtung (Wand-Boden-Kehle mit Dichtlage + Tropfen), Ort (Nadel mit Fadenkreuz).
- **Fugenkreuz** (gefüllt): das einzige flächige Zeichen. Es dient als Kreuzpunkt, Markierung und Aufzählungszeichen.
- **Trenner** „Fugenlinie mit Kreuz“ statt `<hr>`.
- **Muster:** Kreuzfuge, Halbverband, Drittelverband.
- **Motiv** „Verlegeplan“: Draufsicht eines Bades mit Achse mittig, schraffierten Passstücken, Duschrinne und Schiene.
  - Bemaßt ist mit „=“ statt mit Zahlen. So entstehen keine erfundenen Maße.

## Signaturmomente (Vorschläge für die ganze Website)
1. **Kreuzlinie im Einstieg:** Waage und Lot wachsen aus dem Kreuzpunkt (1200 ms). Die drei Überschriftenreihen rücken aus 7–14 px Versatz in die Flucht. Am Desktop liegt die Laserlinie pixelgenau auf der Mittelachse des Badplans (gemessen: 340,90 / 340,91 px).
   - *Austauschprobe:* Ein Maler hat keine Flucht, die man herstellen muss. Bei einem anderen Fliesenleger fehlen Rot = Logo-Rot und das Schriftfeld.
2. **Laser zieht den Ablauf:** Beim Hineinscrollen zieht der Laser die Achse, am Desktop als Waage, am Handy als Lot (Hochformat = Lot). An jeder Schrittfuge setzt sich ein Fugenkreuz, dann legt sich der Schritt an.
   - *Austauschprobe:* Die Schrittinhalte (Ebenheit, Restfeuchte, Fugenachsen, R10/R11, DIN 18534) sind Tezgels eigener Ablauf. Ohne diesen Text bleibt nur eine Linie.
3. **Vorschlag Leistungsseiten:** Jede Leistung bekommt ihren eigenen kleinen Verlegeplan, z. B. Walk-In mit Rinne und Gefälle, Treppe mit Kantenschiene, Terrasse auf Stelzlagern. Beim Fokus/Hover auf die Leistung verschiebt sich die Achse (translateX) auf die Mitte, und die Passstücke werden gleich.
   - *Austauschprobe:* Die Pläne zeigen genau Tezgels sechs Leistungen. Sie sind gezeichnet, nicht fotografiert und nicht generiert.
   - **OFFENE FRAGE:** Darf Herr Tezgel echte Pläne oder Skizzen liefern?

## Umgang mit echten Fotos (später)
- **Zuschnitt:** nur rechtwinklig, auf ganze Rasterspalten. Formate 2:1 (Großformat 120 × 60) oder 1:1. Keine runden Ecken, kein Schatten.
- **Ausrichtung:** Bildkante auf eine Fuge, Bildmitte möglichst auf die Achse. Eine echte Fuge im Foto soll an der Raster-Fuge der Seite anliegen (ausgerichtet beim Zuschnitt).
- **Farbe:** neutral entsättigt bis −15 %, Weißabgleich auf Kalk (#F5F4F0). Keine Filter, kein Overlay-Verlauf. Darüber höchstens eine 2-px-Laserlinie als Markierung, kein Text auf dem Bild.
- **Maske:** keine. Statt Masken eine 1-px-Fuge (`--c-fuge`) als Rahmen, wie eine verfugte Fliese. Bildunterschrift in Mono: Ort · Leistung · Jahr, nur wenn belegt.
- Die vorhandenen KI-Badfotos werden nicht verwendet.

## Risiken
- **Strenge kann kühl wirken.** Für Kunden zwischen 35 und 75 muss Wärme aus Text, Inhaberbezug und Stimmen kommen. Das Logo ist der einzige „lustige“ Teil, und das ist gewollt.
- **Rot = Laser = Fehler?** Fehler nutzen deshalb Laser tief, ein eigenes Versatz-Zeichen und Text. Die Achse ist nie Fehleranzeige. Im Test mit Nutzern beobachten.
- **Die Achsen-Deckung braucht exakte Maße.** Die Deckung Plan ↔ Laserlinie hängt an `--lh-anzeige`, `--fs-7` und am Seitenverhältnis 380/480 (Container-Query-Einheiten `cqw`). Wer Schriftgröße oder Planformat ändert, muss die Formel mitziehen.
- **Ausrichtung nicht prüfbar:** Fehlende Silbentrennung in einzelnen Browsern ist durch `&shy;` in langen Wörtern abgefangen. Getestet ist nur Chromium.
- **Die Startanimation verschiebt Text kurz** (≤ 14 px, 800 ms). Bei „Bewegung reduzieren“ und ohne JS steht alles sofort. Für Prüfläufe mit Standbildern ist das unkritisch.
- **Gemeinsamer Scratchpad:** Der gemeinsame Scratchpad im Lauf wurde von einer anderen Richtung gleichzeitig benutzt, gleicher Dateiname `vorlage.html`. Meine Arbeitsdateien liegen deshalb in `scratchpad/richtung-A-p2/`. Für den Orchestrator: je Richtung einen eigenen Ordner vorgeben.

## Offene Fragen
- **OFFENE FRAGE:** Ist die H1 „Badsanierung, Großformat, Abdichtung nach DIN 18534“ zulässig? Sie ist aus wörtlichen Bestandteilen der Leistungsliste gebaut, also kein neuer Werbetext. Andernfalls wäre ein freigegebener Einstiegssatz nötig.
- **OFFENE FRAGE:** Darf die Kundenstimme auf „Handwerklich perfekt, saubere u. präzise“ gekürzt werden? „perfekt“ ist ein Kundenwort, keine eigene Behauptung.
- **OFFENE FRAGE:** Ist Abnahme-Grün als vierte bedeutungstragende Farbe gewünscht, oder soll Erfolg nur über Tinte + Haken laufen?
- **OFFENE FRAGE:** Dürfen „Schriftfeld“ und „Blatt 0x / 09“ als Gestaltungsetiketten auf die echte Website, oder bleiben sie Stilkachel-Sprache?
