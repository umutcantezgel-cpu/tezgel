# Bildplätze · Lauf „Verständlich, echt, ausgezeichnet“ · Fassung 1 (E1, 24.10.2026)

Auswahl durch den Orchestrator nach `bildinventar.csv` (Sichtung E0-BILD-01…05, Technik E0-PRUEF-BILD-01) und eigener Sichtung der Schlüsselbilder. Regeln: KERN K-012. Quelle jeder Webfassung ist das **Original** in `_eingang/entpackt/IMG_xxxx.PNG` (bis 1320 px breit), nicht der Social-Zuschnitt; der Social-Zuschnitt dient nur als Vorschau und für den Schwerpunkt. Nie hochskalieren. Ablage `public/images/arbeiten/<raum>/<name>.jpg`, Daten in `src/config/arbeiten.ts`.

Spalten: **ID** · Seite und Platz · Format (Breite : Höhe) · Original · Zuschnitt (Schwerpunkt, was weg muss) · Alt-Text (≤ 125 Zeichen) · `sizes` · Vorrang

## Startseite `/`
| ID | Platz | Format | Original | Zuschnitt | Alt-Text | sizes | Vorrang |
|---|---|---|---|---|---|---|---|
| start-dusche | Einstieg, rechts (Desktop) bzw. unter Knopf und Telefon (mobil) | 4:5 | IMG_2578 | Schwerpunkt 50 % / 52 %; Heizkörper links darf angeschnitten sein | Dusche ohne Stufe mit großen grauen Fliesen und einer Glaswand | `(min-width: 1024px) 40vw, 100vw` | ja (einziges `preload`) |
| lage-dusche | Fliese „Wanne raus, Dusche ohne Stufe“ | 1:1 | IMG_2582 | Sitzbank und Mosaik mittig | Dusche ohne Stufe mit Sitzbank und türkisen Mosaikfliesen | `(min-width: 1024px) 16vw, 50vw` | nein |
| lage-bad | Fliese „Das ganze Bad soll neu werden“ | 1:1 | IMG_2610 | Wanne und Boden | Badewanne mit dunkler Verkleidung und hellen Wandfliesen | wie oben | nein |
| lage-neubau | Fliese „Im Neubau Böden und Wände fliesen“ | 1:1 | — | kein passendes Foto: Fliesenkomposition „Halbverband“ | (dekorativ) | — | — |
| lage-reparatur | Fliese „Fliese gesprungen, Fugen alt“ | 1:1 | — | kein Foto: Fliesenkomposition „eine Fliese mit Riss“ | (dekorativ) | — | — |
| lage-balkon | Fliese „Wasser auf dem Balkon“ | 1:1 | IMG_2545 | Stange in der Mitte wegschneiden (Ausschnitt links oder rechts davon) | Balkon mit großen hellgrauen Fliesen | wie oben | nein |
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
| ref-vorher | Vorher-Nachher-Regler links | 4:5 | IMG_2527 | auf IMG_2525 ausrichten (gleicher Blick, Geraderichten und Zuschnitt erlaubt) | Vorher: Außentreppe aus ausgebessertem Beton | `(min-width: 1024px) 40vw, 100vw` | nein |
| ref-nachher | Vorher-Nachher-Regler rechts | 4:5 | IMG_2525 | wie oben | Nachher: Außentreppe mit terrakottafarbenen Fliesen | wie oben | nein |

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

## Teilen-Bild (OG)
| og-start | Vorschaubild für alle Seiten ohne eigenes | 1200 × 630 | IMG_2578 | Querausschnitt aus der Dusche (Glaswand und Fliesenfugen), ohne Hochskalieren (Quelle 1320 px breit) | Bodengleiche Dusche mit großen grauen Fliesen | — | — |

## Ohne Foto (Fliesenkompositionen aus dem Formsystem, K-008)
`lage-neubau`, `lage-reparatur`, `leistungen-wohnen`, 404, Platzhalter für Seiten ohne passendes Foto (Küche, Flur, Wohnräume, Naturstein innen, Treppenhaus). Nie graue Kästen, nie „Bild folgt“.
