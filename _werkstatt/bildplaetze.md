# Bildplätze · Lauf „Verständlich, echt, ausgezeichnet“ · Fassung 1 (E1, 24.10.2026)

Auswahl durch den Orchestrator nach `bildinventar.csv` (Sichtung E0-BILD-01…05, Technik E0-PRUEF-BILD-01) und eigener Sichtung der Schlüsselbilder. Regeln: KERN K-012. Quelle jeder Webfassung ist das **Original** in `_eingang/entpackt/IMG_xxxx.PNG` (meist 1320 × 2868 mit schwarzen Balken oben und unten; die Spalten `breite`, `hoehe`, `kb` in `bildinventar.csv` beschreiben die Social-Zuschnitte), nicht der Social-Zuschnitt; der Social-Zuschnitt dient nur als Vorschau und für den Schwerpunkt. Nie hochskalieren. Ablage `public/images/arbeiten/<raum>/<name>.jpg`, Daten in `src/config/arbeiten.ts`.

Spalten: **ID** · Seite und Platz · Format (Breite : Höhe) · Original · Zuschnitt (Schwerpunkt, was weg muss) · Alt-Text (≤ 125 Zeichen) · `sizes` · Vorrang

## Startseite `/`
| ID | Platz | Format | Original | Zuschnitt | Alt-Text | sizes | Vorrang |
|---|---|---|---|---|---|---|---|
| start-dusche | Einstieg, rechts (Desktop) bzw. unter Knopf und Telefon (mobil) | 4:5 | IMG_2578 | Schwerpunkt 50 % / 48 % (Duschkopf ganz im Bild); Heizkörper links darf angeschnitten sein | Dusche ohne Stufe mit großen grauen Fliesen und einer Glaswand | `(min-width: 1024px) 40vw, 100vw` | ja (einziges `preload`) |
| start-dusche-boden | Einstieg ab lg, unter der Waage zwischen den Wänden des Plans (E3-START-01, E-039) | 4:3 | IMG_2578 | unterster Ausschnitt: Boden mit Fugen läuft ohne Kante unter der Glaswand durch (Kern der Aussage für P1) | Boden einer Dusche ohne Stufe: große graue Fliesen laufen ohne Kante unter der Glaswand durch | `(min-width: 1312px) 520px, 40vw` | nein (nicht im ersten Bildschirm) |
| lage-dusche | Fliese „Wanne raus, Dusche ohne Stufe“ | 1:1 | IMG_2582 | Sitzbank und Mosaik mittig | Dusche ohne Stufe mit Sitzbank und türkisen Mosaikfliesen | `(min-width: 1024px) 16vw, 50vw` | nein |
| lage-bad | Fliese „Das ganze Bad soll neu werden“ | 1:1 | IMG_2610 | Wanne und Boden | Badewanne mit dunkler Verkleidung und hellen Wandfliesen | wie oben | nein |
| lage-neubau | Startseite, Lage „Im Neubau sollen Böden und Wände gefliest werden.“ (E3-START-06, E-040) | 1:1 | IMG_2602 | links unten: Wanne, Wandfliesen, frisch verlegter Boden mit Nivellierlaschen; rechts die Montageplatte mit Herstellerzeichen weggeschnitten | Bad während der Arbeit: Wanne, weiße Wandfliesen und frisch verlegter Boden | `(min-width: 1024px) 16vw, (min-width: 768px) 25vw, 33vw` | nein |
| lage-reparatur | Fliese „Fliese gesprungen, Fugen alt“ | 1:1 | — | kein Foto: Fliesenkomposition „eine Fliese mit Riss“ | (dekorativ) | — | — |
| lage-balkon | Fliese „Wasser auf dem Balkon“ | 1:1 | IMG_2545 | rechts der Säule: Fliesen mit Geländer, Schwerpunkt 62 % / 62 %; Säule links und Schatten unten links weg (E2-BILD-01) | Balkon mit großen hellgrauen Fliesen | wie oben | nein |
| lage-treppe | Fliese „Treppe vor dem Haus kaputt“ | 1:1 | IMG_2525 | Stufen mittig, Tuch rechts weg | Außentreppe mit terrakottafarbenen Fliesen und hellen Kanten | wie oben | nein |
| start-galerie-1…6 | Beleg „So sieht unsere Arbeit aus“ | 4:5 | IMG_2582, IMG_2610, IMG_2544, IMG_2533, IMG_2525, IMG_2547 | je Schwerpunkt aus dem Inventar; IMG_2547: Person nur von hinten, Gesicht nicht sichtbar | aus `arbeiten.ts` | `(min-width: 1024px) 30vw, 50vw` | nein |

## `/bad`
| bad-einstieg | Einstieg | 4:5 | IMG_2550 | Deko (Pflanzen, Figur) möglichst am Rand; Schild oben links weg | Helles Bad mit Glasdusche, Holzoptik am Boden und Waschtisch | `(min-width: 1024px) 40vw, 100vw` | nein |
| bad-beleg-1…4 | Beleg | 4:5 | IMG_2573, IMG_2599, IMG_2571, IMG_2603 | Schwerpunkt aus Inventar | aus `arbeiten.ts` | `(min-width: 1024px) 30vw, 50vw` | nein |
- Großer Moment `schichten`: Zeichnung, kein Foto.

## `/bad/badsanierung`
| sanierung-einstieg | Einstieg | 4:5 | IMG_2570 | Katze und Bildrahmen mit Schrift am Rand oder weg | Bad im Dachgeschoss mit freistehender Badewanne und beigen Fliesen | wie `bad-einstieg` | nein |
| sanierung-weg-1…3 | Stationen des Wegs (Während) | 4:5 | IMG_2587, IMG_2575, IMG_2568 | Montageplatten mit Herstellerzeichen möglichst am Rand | ehrlich: „Bad während der Arbeit: …“ | `(min-width: 1024px) 25vw, 60vw` | nein |
- Die drei Stationsbilder stammen aus verschiedenen Baustellen; die Unterschriften behaupten keinen gemeinsamen Verlauf.

## `/bad/barrierefreies-bad`
| bereich-dusche-sitzbank | Einstieg | 4:5 | IMG_2582 | Sitzbank mittig, Brauseschlauch darf bleiben | Dusche ohne Stufe mit Sitzbank und kleinen Mosaikfliesen | wie `bad-einstieg` | nein |
| bereich-dusche-streifen-sitzbank | Beleg | 4:5 | IMG_2608 | Inventar | Bodengleiche Dusche mit dunklem Streifen und Sitzbank | `(min-width: 1024px) 30vw, 50vw` | nein |
| bereich-wanne-mit-tuer | Beleg | 4:5 | IMG_2567 | Thermosflasche möglichst weg | Badewanne mit Tür zum leichten Einsteigen | wie oben | nein |
| entstehung-dusche-1 | Zweierbild links | 4:5 | IMG_2555 | Gefälleschnitt mittig | Dusche im Bau: große Fliesen mit Klemmen, die sie auf eine Höhe bringen | `(min-width: 1024px) 30vw, 50vw` | nein |
| entstehung-dusche-2 | Zweierbild rechts | 4:5 | IMG_2549 | Ablauf mittig | Fast fertige Dusche ohne Stufe: Fliesen schräg zum Ablauf geschnitten | wie oben | nein |
- `start-dusche` wird hier als Beleg wiederverwendet. Großer Moment `gefaelle-dusche`: Zeichnung.

## `/leistungen`
| leistungen-bad · -balkon · -untergrund | Kopfbilder der Bereiche | 4:5 | IMG_2610, IMG_2544, IMG_2547 | Inventar | aus `arbeiten.ts` | `(min-width: 1024px) 25vw, 50vw` | nein |
| leistungen-wohnen | Kopfbild „Böden und Wände“ | 4:5 | — | kein passendes Foto (keine Küche, kein Flur, kein Wohnraum im Bestand): Fliesenkomposition „Drittelverband“ | (dekorativ) | — | — |
- Großer Moment `formatregler`: Zeichnung.

## `/fliesen` (Wissen)
| fliesen-fischgraet | Beispiel im Verlegemuster „Fischgrät“ | 4:5 | IMG_2563 | Fischgrätfläche mittig, Anschlüsse am Rand | Grüne Fliesen im Fischgrätmuster an einer Vorwand mit Nische | `(min-width: 1024px) 25vw, 50vw` | nein |
| fliesen-halbverband | Beispiel „Halbverband“ | 4:5 | IMG_2544 | Fläche mittig, Gerüst rechts weg | Balkon mit dunklen Rechteckfliesen, die versetzt verlegt sind | wie oben | nein |

## `/balkon-terrasse`
| balkon-einstieg | Einstieg | 4:5 | IMG_2535 | Plattenkante mit Aluprofil und Belag; rostiges Rohr vorn mittig und Fahne oben rechts wegschneiden | Terrasse mit großen grauen Platten und Aluminiumkante | wie `bad-einstieg` | nein |
| balkon-beleg-1…4 | Beleg | 4:5 | IMG_2544, IMG_2536, IMG_2539, IMG_2533 | Inventar | aus `arbeiten.ts` | `(min-width: 1024px) 30vw, 50vw` | nein |
| balkon-stelzlager | „So legen wir Platten auf Stelzen“ | 4:5 | IMG_2542 | **Gesichter der Personen ganz wegschneiden** (nur Hände, Platten, Lager); gelingt das nicht, Bild entfällt | Große Platten werden auf Stelzlagern verlegt | wie oben | nein |
- IMG_2538 (Kind im Hintergrund) nur, wenn das Kind vollständig weggeschnitten werden kann; sonst nicht verwenden. Großer Moment `gefaelle-balkon`: Zeichnung.

## `/referenzen` (Galerie „Unsere Arbeiten“)
- Alle Bilder aus `bildinventar.csv` mit Eignung Galerie, Seitenbild oder Detail und Qualität A oder B, außer: IMG_2561 (Herkunft offen, M-08), IMG_2577 (M-08), IMG_2594 und IMG_2581 (Dubletten), IMG_2530 und IMG_2531 (Autohaus-Name, nur wenn sauber wegschneidbar), IMG_2538 (Kind), IMG_2543 (Gesicht, nur wenn wegschneidbar), C-Bilder und „ungeeignet“.
- Format 4:5 einheitlich (Raster), Filter nach Raum: Bad · Dusche · Balkon und Terrasse · Treppe und Eingang · So arbeiten wir (Während und Vorher).
| ref-vorher | Vorher-Nachher-Regler links | eigenes, 900 × 1752 (K-016, E-052) | IMG_2527 | auf IMG_2525 ausrichten (gleicher Blick, Geraderichten und Zuschnitt erlaubt) | Vorher: Außentreppe aus ausgebessertem Beton | `(min-width: 1024px) 40vw, 100vw` | nein |
| ref-nachher | Vorher-Nachher-Regler rechts | eigenes, 900 × 1752 (K-016, E-052) | IMG_2525 | wie oben | Nachher: Außentreppe mit terrakottafarbenen Fliesen | wie oben | nein |

## `/ueber-uns`
| ueber-einstieg | Einstieg „So arbeiten wir“ | 4:5 | IMG_2547 | Person nur von hinten, Pullover mit Tezgel-Logo sichtbar, kein Gesicht | Mitarbeiter von Fliesenverlegung Tezgel klebt Dichtband an den Anschlüssen eines Balkons | wie `bad-einstieg` | nein |
- Großer Moment `karte`: Zeichnung.

## `/kontakt`
| kontakt-eingang | kleines Bild neben den Kontaktwegen | 4:5 | IMG_2524 | Fußmatte am Rand | Hauseingang mit Podest und beigen Fliesen | `(min-width: 1024px) 25vw, 60vw` | nein |

## `/standorte/[stadt]`
- Drei Galeriebilder ohne Ortsbezug (rotierend nach Raum aus `arbeiten.ts`, fest je Ort, damit die Seite stabil ist).

## `/blog` und Artikel
| Artikel | Original | Alt-Text-Entwurf |
|---|---|---|
| duschrinne-oder-punktablauf | IMG_2591 (Rinne) | Dusche mit Rinne im Boden und Fliesen bis zur Decke |
| undichte-dusche-warnzeichen | IMG_2549 | Duschboden mit Fliesen, die schräg zum Ablauf geschnitten sind |
| wandnischen-dusche-planen | IMG_2588 | Dusche mit zwei Nischen in der Wand und Boden in Holzoptik |
| gaeste-wc-fliesen | IMG_2572 | Kleines Bad mit WC, Bidet und Fachwerkwand |
| rutschfeste-fliesen-r-klassen | IMG_2539 | Terrasse mit Fliesen in Erdtönen und einem Ablauf |
| barrierefreier-balkonaustritt | IMG_2546 | Anbau mit Glasfront, terrakottafarbenen Fliesen und Gitter vor der Tür |
| feinsteinzeug-oder-naturstein-vergleich | IMG_2522 | Vorher: Eingangspodest mit beschädigten Natursteinplatten |
| fliesen-reinigen-pflegen | IMG_2606 | Badewanne mit Ornamentfliesen in Blau und Beige |
| schimmel-fliesenfugen-vermeiden | IMG_2583 | Duschnische mit weißen Wandfliesen und Eckprofilen |
| fliesen-fuer-allergiker | IMG_2579 | Dusche mit grauen Fliesen in Steinoptik |
| fliesen-mythen-faktencheck | IMG_2555 | Dusche im Bau mit großen Fliesen und Klemmen |
| handwerkerbonus-fliesenarbeiten | IMG_2575 | Großes Bad während der Arbeit mit Fliesen in Holzoptik |
| fliesenleger-gesucht-geselle-meister | IMG_2547 | Mitarbeiter klebt Dichtband an einem Balkon, von hinten |
- Ersetzt das Generatorbild `gaeste-bad.png` und alle Verweise auf `public/images/bad/*` in Artikeln, Leistungen und Musterbädern (E-013).

## Stimmungsbilder (KI, nur vorbereitet; E-047, Entscheidung des Auftraggebers „Nur Stimmungsbilder“)
Regeln: nur dort, wo kein echtes Foto die Aussage trägt; nie unter „Unsere Arbeiten“, bei Referenzen, im Beleg oder als Vorher/Nachher. Alt-Text beschreibt das Motiv, ohne eigene Arbeit zu behaupten; in den Metadaten der Datei und in `arbeiten.ts` (Feld `quelle: 'ki'`, folgt mit dem ersten Bild) als erzeugt gekennzeichnet. Format wie der Platz, Webfassung wie K-012. Ein Generator ist noch nicht angebunden (MENSCHEN); bis dahin bleiben die Plätze leer bzw. bei den Fliesenkompositionen.

| ID | Platz | Format | Bildbeschreibung (Prompt, deutsch) | Alt-Text | Vorrang |
|---|---|---|---|---|---|
| stimmung-boeden-waende | `/leistungen`, Bereich „Böden und Wände“ (heute Fliesenkomposition) | 4:5 | Heller, ruhiger Wohnraum mit großformatigen hellgrauen Bodenfliesen 60 × 120 cm, feine graue Fugen, weiches Tageslicht von links, wenige Möbel, keine Personen, keine Schrift, kein Logo, fotorealistisch, Blick leicht von oben | Wohnraum mit großen hellgrauen Bodenfliesen im Tageslicht | nein |
| stimmung-untergrund | `/leistungen`, Bereich „Untergrund und Abdichtung“ | 4:5 | Nahaufnahme einer frisch gestrichenen grauen Flüssigabdichtung auf Estrich in einer Dusche, Dichtband in der Ecke, sauber, Baustellenlicht, keine Personen, keine Markennamen, fotorealistisch | Graue Abdichtung mit Dichtband in der Ecke einer Dusche | nein |
| stimmung-ratgeber | `/fliesen` und `/blog`, Einstieg (heute ohne Foto) | 4:3 | Aufgeräumter Tisch mit drei Fliesenmustern in Weiß, Grau und Holzoptik, Zollstock und Bleistift, helles Tageslicht, ruhiger heller Hintergrund, keine Personen, keine Schrift, fotorealistisch | Drei Fliesenmuster mit Zollstock und Bleistift auf einem Tisch | nein |
| stimmung-kontakt | `/kontakt`, unter dem Einstieg (heute ohne Foto) | 16:9 | Hand mit Zollstock misst einen hellen Fliesenboden in einem Bad, Ausschnitt ohne Gesicht, warmes Licht, fotorealistisch, keine Schrift | Hand misst mit einem Zollstock einen hellen Fliesenboden | nein |

## Teilen-Bild (OG)
| og-start | Vorschaubild für alle Seiten ohne eigenes | 1200 × 630 | IMG_2578 | Querausschnitt aus der Dusche (Glaswand und Fliesenfugen), ohne Hochskalieren (Quelle 1320 px breit) | Bodengleiche Dusche mit großen grauen Fliesen | — | — |

## Ohne Foto (Fliesenkompositionen aus dem Formsystem, K-008)
`lage-reparatur` (die Zeichnung zeigt den Schaden: ein Riss, das ausgetauschte Stück; seit E-040 einzige Zeichnung im Lage-Raster), `leistungen-wohnen`, 404, Platzhalter für Seiten ohne passendes Foto (Küche, Flur, Wohnräume, Naturstein innen, Treppenhaus). Nie graue Kästen, nie „Bild folgt“.

## Fassung 2 · E4-W0-BILDER (25.10.2026)

Geht den Zeilen oben vor. Ziel: kein Foto doppelt auf den zwölf Hauptansichten (Ausnahme: die Übersicht `/leistungen` zeigt die Fotos ihrer Leistungsseiten; die Galerie auf `/referenzen` zeigt alle), jedes Foto mindestens 720 px breit (Einstieg 960), fertige Arbeit im Beleg, Baustelle nur in Lage und Zweierbild, Alt-Text und Unterschrift nur über das, was zu sehen ist. Auswahl: Runde 2 mit Probe-Zuschnitten und Gegenprüfung (Workflow im Scratchpad `E4-BILDER`), Abnahme jedes Zuschnitts am Bild durch den Orchestrator. Auftrag: `_werkstatt/bilder/auftrag-e4.json`.

| Seite | Platz | ID | Original | Zuschnitt (px im Original) | Alt-Text | Hinweis |
|---|---|---|---|---|---|---|
| `/` | Einstieg | start-dusche | – | – | aus `arbeiten.ts` | unverändert |
| `/` | Lage „Wanne raus“ | start-lage-dusche | IMG_2608 | 1:1, x 420, y 554, 900 × 900 | Bodengleiche Dusche mit weißen Großformatfliesen und einem dunklen Fliesenstreifen |  |
| `/` | Lage „Bad alt“ | start-lage-bad | IMG_2590 | 1:1, x 165, y 939, 990 × 990 | Eckbadewanne mit grauer Verkleidung und hellen Wandfliesen |  |
| `/` | Lage „Neubau“ | start-lage-neubau | IMG_2602 | 1:1, x 0, y 939, 900 × 900 | Bad im Bau: Wanne mit dunkler Verkleidung, weiße Wandfliesen und frisch verlegter Boden mit Nivellierklemmen | Baustelle in der Lage zulässig |
| `/` | Lage „Balkon“ | start-lage-balkon | IMG_2545 | 1:1, x 560, y 554, 760 × 760 | Balkon mit hellgrauen Großformatfliesen und weißem Geländer |  |
| `/` | Lage „Treppe“ | start-lage-treppe | IMG_2524 | 1:1, x 0, y 700, 1150 × 1150 | Hauseingang mit beigen Fliesen auf Stufen und Podest, davor eine Fußmatte | Gartenstuhl und Geländerpfosten oben rechts weg |
| `/` | Beleg 1 | start-galerie-1 | – | – | aus `arbeiten.ts` | unverändert, Unterschrift ohne „ohne Stufe“ |
| `/` | Beleg 2 | start-beleg-bad | IMG_2610 | 4:5, x 264, y 939, 792 × 990 | Badewanne mit dunklen Mosaikfliesen und blauem Plissee am Fenster |  |
| `/` | Beleg 3 | start-beleg-dusche | IMG_2553 | 4:5, x 0, y 600, 1320 × 1650 | Dusche mit Glastür, Mosaikband an der Wand und Chromgriff |  |
| `/` | Beleg 4 | start-beleg-terrasse | IMG_2532 | 4:5, x 0, y 600, 960 × 1200 | Terrasse mit blaugrauen Fliesen vor einer Glastür mit Holzrahmen | Fallrohr rechts weg |
| `/` | Beleg 5 | start-beleg-treppe | IMG_2529 | 4:5, x 240, y 554, 1080 × 1350 | Außentreppe mit anthrazitfarbenen Fliesen und Handlauf bis zur weißen Haustür | Fahrzeug links weg |
| `/bad` | Einstieg, Beleg 1 bis 4 | bad-einstieg | – | – | aus `arbeiten.ts` | unverändert; bad-beleg-2 neu in 688 px |
| `/bad/badsanierung` | Einstieg | badsanierung-einstieg | IMG_2606 | 4:5, x 320, y 600, 1000 × 1250 | Badewanne mit blauen und beigen Ornamentfliesen und heller Wandnische | Schutzkappen links weg |
| `/bad/badsanierung` | Beleg 1 | badsanierung-beleg-1 | IMG_2580 | 4:5, x 264, y 939, 792 × 990 | Badewanne mit gestreifter dunkler Verkleidung, daneben ein WC an der Wand |  |
| `/bad/badsanierung` | Beleg 2 | badsanierung-beleg-2 | IMG_2605 | 4:5, x 264, y 939, 792 × 990 | Badewanne mit dunkler Verkleidung, daneben eine Dusche mit Mosaikboden und Glaswand |  |
| `/bad/badsanierung` | Zweierbild links | badsanierung-zweier-1 | IMG_2557 | 4:5, x 0, y 554, 1320 × 1650 | Dusche im Bau: dunkle Wandfliesen in Metalloptik, Nische in der Mitte, Duschwanne eingebaut | Baustelle im Zweierbild zulässig |
| `/bad/badsanierung` | Zweierbild rechts | badsanierung-zweier-2 | IMG_2560 | 4:5, x 528, y 939, 792 × 990 | Bad im Bau: dunkle Bodenfliesen in Schieferoptik, helle Wände, die Nische ist noch offen | Eimer links weg |
| `/bad/barrierefreies-bad` | Einstieg | barrierefrei-einstieg | IMG_2566 | 4:5, x 0, y 200, 1320 × 1650 | Begehbare Dusche mit weißen Metrofliesen, Handbrause und gemustertem Boden | WC in Folie unten weg |
| `/bad/barrierefreies-bad` | Beleg 1 | barrierefrei-beleg-1 | IMG_2595 | 4:5, x 0, y 554, 1320 × 1650 | Dusche mit Mosaikboden in Schwarz, Weiß und Grau und gefliester Eckbank |  |
| `/bad/barrierefreies-bad` | Beleg 2 | barrierefrei-beleg-2 | IMG_2567 | 4:5, x 0, y 700, 1000 × 1250 | Badewanne mit Tür zum leichten Einsteigen, daneben eine Regendusche vor hellen Wandfliesen | Thermosflasche und Klebeband unten weg |
| `/leistungen` | Einstieg | leistungen-einstieg | IMG_2548 | 4:5, x 0, y 554, 1320 × 1650 | Dusche mit zwei Lichtleisten an der Wand, gefliester Sitzbank und Mosaikboden | ersetzt start-dusche-boden (dasselbe Original wie das Startbild) |
| `/fliesen` | Beleg | fliesen-beleg | IMG_2600 | 4:5, x 0, y 554, 1320 × 1650 | Dusche mit großen beigen Fliesen, flacher weißer Duschfläche und einer Holztür am Ende |  |
| `/blog` | Beleg | blog-beleg | IMG_2583 | 4:5, x 0, y 556, 1320 × 1650 | Duschnische mit weißen Wandfliesen und einer Rinne im dunklen Boden, die Armatur fehlt noch | Armatur fehlt, im Alt-Text genannt |
| `/balkon-terrasse` | Einstieg | balkon-einstieg-hell | IMG_2533 | 4:5, x 40, y 762, 1240 × 1550 | Terrasse mit großen hellgrauen Platten, einer weißen Stütze und weißem Geländer | Nachbardächer oben weg |
| `/balkon-terrasse` | Beleg 1 | balkon-beleg-anthrazit | IMG_2544 | 4:5, x 0, y 261, 900 × 1125 | Balkon mit anthrazitfarbenen Fliesen am Haus, daneben ein Fenster mit Rollladen | Gerüst rechts weg |
| `/balkon-terrasse` | Beleg 3 | balkon-beleg-aluprofil | IMG_2535 | 4:5, x 0, y 554, 870 × 1088 | Terrassenkante mit grauen Platten und hellem Aluprofil, dahinter eine Glastür | rostiges Rohr rechts weg |
| `/referenzen` | Einstieg | referenzen-einstieg | IMG_2562 | 4:5, x 0, y 554, 1320 × 1650 | Bad mit Fliesen in Marmoroptik, Regendusche und einem WC an der Wand mit weißer Betätigungsplatte |  |
| `/ueber-uns` | Einstieg | ueber-einstieg | IMG_2547 | 4:5, Schwerpunkt 42 % / 44 % | Mitarbeiter von Fliesenverlegung Tezgel kniet auf dem Balkon, blaues Dichtband läuft an den Rändern entlang | neu in 1280 px; Aufdruck auf dem Pullover ist das eigene Firmenzeichen |
| `/standorte/wetzlar` | Foto 1 (GALERIE_START 0) | ort-gaeste-wc | IMG_2572 | 4:5, x 0, y 554, 1320 × 1650 | Gäste-WC mit WC und Bidet an der Wand vor weißen Metrofliesen |  |
| `/standorte/wetzlar` | Foto 3 (GALERIE_START 4) | ort-terrasse-erdtoene | IMG_2539 | 4:5, x 0, y 554, 1320 × 1650 | Terrasse mit rustikalen Fliesen in Erdtönen und einem Pflanzbeet am Rand |  |

- `/standorte/wetzlar` Foto 2 ist `start-galerie-5` (Außentreppe in Terrakotta, dasselbe Original wie „nachher“ auf `/referenzen`, anderer Zuschnitt).
- Entfallen (nicht mehr benutzt, Dateien gelöscht): lage-dusche, lage-bad, lage-balkon, lage-treppe, lage-neubau, start-galerie-2, start-dusche-boden, sanierung-einstieg, bereich-dusche-sitzbank, bereich-wanne-mit-tuer, balkon-einstieg, balkon-beleg-1, balkon-beleg-4, leistungen-bad.
- Verworfen nach Gegenprüfung und eigener Sichtung (Baustellenreste, Herstellerschrift, falsches Motiv): IMG_2559, IMG_2585, IMG_2593, IMG_2607, IMG_2579, IMG_2584, IMG_2536 als Einstieg.
- Offen: `/fliesen` Verband zeigt weiter IMG_2544 (Balkon) und IMG_2563 (Baustelle, grünes Fischgrät); Ersatz durch Fliesenkompositionen nur nach Rückfrage (echte Fotos gehen vor, K-012).

### Nachtrag Fassung 2 · E-065 (Browserprüfung E4-W0)
- `leistungen-einstieg` neu zugeschnitten (IMG_2548, x 0, y 554, 1140 × 1425): Eckschutzschiene, Holzplatte und Rohrstutzen am rechten Rand weg.
- `fliesen-beleg` enger zugeschnitten (IMG_2600, x 100, y 800, 900 × 1125): weniger Verzerrung vom Weitwinkel.
- `barrierefrei-beleg-2` (Wanne mit Tür, Herstelleraufkleber und Klebeband) und `blog-beleg` (Duschnische ohne Armatur) entfallen, ihre Dateien sind gelöscht.
- `/bad/barrierefreies-bad` Beleg: `barrierefrei-beleg-1` und `bad-beleg-4` (bodengleiche Dusche, vorher auf `/bad`); `/bad` zeigt `bad-beleg-1` bis `-3`.
- `/blog` ohne Foto im Beleg.
- Alt-Texte ohne Bindestrichwörter („WC an der Wand“, „blauen und beigen“).
