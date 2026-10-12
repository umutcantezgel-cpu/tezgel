# BILDER-BEWEGUNG: Bilder und Bewegung am E3-Tor (Anlauf 2)

**Hinweis zur Ablage:** Ich habe die Datei `/home/user/tezgel/_werkstatt/belege/e3-tor-2/BILDER-BEWEGUNG.md` nicht geschrieben, weil meine Regeln das Schreiben von Berichtsdateien ausschließen. Der vollständige Inhalt steht unten, der Orchestrator kann ihn dort ablegen.

**Stand:** Commit `adacabf` laut Auftrag, Server 4310 (Produktionsbuild). Lauf am 2026-10-12, 02:57 bis 03:31 UTC, seriell mit höchstens 2 Workern. Entwicklungsserver 4320 nur lesend mit `GET /` abgefragt (200), sonst nicht angefasst. Kein Commit, kein Push, keine Quell-, Test- oder Werkzeugdateien geändert.

**Rohbelege:** `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/belege-roh/e3-tor-2/` (Unterordner `bildsatz/`, `ersatz/`, `abschnitte/`, `bewegung/`, `logs/`). Auswertung: `.../scratchpad/auswertung/auswertung.py`, Ausgabe `.../scratchpad/auswertung/out.txt`.

Die Bilder und Bewegungsfolgen sind Messung und Stichprobe. Die Sichtabnahme entscheidet über die Befunde.

## 1. Bildsatz (normales Protokoll, `bildsatz.mjs --satz e3-tor-2 --hauptansichten`)

Gesamt: 401 Aufnahmen, Fehler 0, Nicht-200 0, Überlauf 1 Befund (1 Ansicht), Überlappung 150 Befunde (sticky 2, textkreuzung 148) in 6 Ansichten, Konsolenmeldungen 0. Anlauf 1 hatte 398 Aufnahmen und 110 Überlappungsbefunde.

| Seite | Ansicht | HTTP | Höhe (px) | Aufnahmen | Konsole | Überlauf | Überlappung | nach Art |
|---|---|---|---|---|---|---|---|---|
| `/` | d1440 | 200 | 16086 | 12 | 0 | 0 | 0 | – |
| `/` | m390 | 200 | 26702 | 12 | 0 | 0 | 25 | textkreuzung 25 |
| `/` | t768 | 200 | 22519 | 12 | 0 | 0 | 0 | – |
| `/bad` | d1440 | 200 | 8028 | 9 | 0 | 0 | 2 | sticky 2 |
| `/bad` | m390 | 200 | 14373 | 12 | 0 | 0 | 0 | – |
| `/bad` | t768 | 200 | 10860 | 11 | 0 | 0 | 0 | – |
| `/leistungen` | d1440 | 200 | 9542 | 11 | 0 | 0 | 0 | – |
| `/leistungen` | m390 | 200 | 18218 | 12 | 0 | 0 | 0 | – |
| `/leistungen` | t768 | 200 | 12972 | 12 | 0 | 0 | 0 | – |
| `/leistungen/bad` | d1440 | 200 | 9888 | 11 | 0 | 0 | 0 | – |
| `/leistungen/bad` | m390 | 200 | 16124 | 12 | 0 | 0 | 0 | – |
| `/leistungen/bad` | t768 | 200 | 12519 | 12 | 0 | 0 | 0 | – |
| `/standorte` | d1440 | 200 | 9387 | 11 | 0 | 0 | 0 | – |
| `/standorte` | m390 | 200 | 15677 | 12 | 0 | 0 | 0 | – |
| `/standorte` | t768 | 200 | 11430 | 12 | 0 | 0 | 0 | – |
| `/standorte/wetzlar` | d1440 | 200 | 9939 | 12 | 0 | 0 | 0 | – |
| `/standorte/wetzlar` | m390 | 200 | 16636 | 12 | 0 | 0 | 0 | – |
| `/standorte/wetzlar` | t768 | 200 | 11890 | 12 | 0 | 0 | 0 | – |
| `/fliesen` | d1440 | 200 | 11694 | 12 | 0 | 0 | 0 | – |
| `/fliesen` | m390 | 200 | 17290 | 12 | 0 | 0 | 40 | textkreuzung 40 |
| `/fliesen` | t768 | 200 | 14440 | 12 | 0 | 0 | 0 | – |
| `/ueber-uns` | d1440 | 200 | 7662 | 9 | 0 | 0 | 0 | – |
| `/ueber-uns` | m390 | 200 | 12267 | 12 | 0 | 0 | 0 | – |
| `/ueber-uns` | t768 | 200 | 9260 | 10 | 0 | 0 | 0 | – |
| `/kontakt` | d1440 | 200 | 6855 | 8 | 0 | 0 | 0 | – |
| `/kontakt` | m390 | 200 | 11769 | 12 | 0 | 0 | 0 | – |
| `/kontakt` | t768 | 200 | 8791 | 9 | 0 | 0 | 0 | – |
| `/fliesen/konfigurator` | d1440 | 200 | 8170 | 10 | 0 | 0 | 22 | textkreuzung 22 |
| `/fliesen/konfigurator` | m390 | 200 | 13397 | 12 | 0 | 0 | 39 | textkreuzung 39 |
| `/fliesen/konfigurator` | t768 | 200 | 9771 | 10 | 0 | 0 | 22 | textkreuzung 22 |
| `/blog` | d1440 | 200 | 7163 | 8 | 0 | 0 | 0 | – |
| `/blog` | m390 | 200 | 13480 | 12 | 0 | **1** | 0 | – |
| `/blog` | t768 | 200 | 8426 | 9 | 0 | 0 | 0 | – |
| `/blog/rutschfeste-fliesen-r-klassen` | d1440 | 200 | 9941 | 12 | 0 | 0 | 0 | – |
| `/blog/rutschfeste-fliesen-r-klassen` | m390 | 200 | 15200 | 12 | 0 | 0 | 0 | – |
| `/blog/rutschfeste-fliesen-r-klassen` | t768 | 200 | 10849 | 11 | 0 | 0 | 0 | – |

Befunde im Einzelnen:
- **Neu, Überlauf:** `/blog` m390, `span.shrink-0` ragt von x=283 bis x=424 über die 390 px Breite. Die Lage im Bild ist nicht vermerkt.
- **Überlappung `/bad` d1440 (sticky, 2):** „06441 / 44 83 567“ und „Aufmaß anfragen“ bei y≈4534, überdeckt von `aside.lg:sticky.lg:top-24`. Bild: `bildsatz/d1440/bad/05.jpg` (Ausschnitt ab y=4500). In Anlauf 1 stand dieser Befund bei `/blog` d1440 (y≈3622), dort ist er jetzt nicht mehr gemeldet.
- **Neu, Überlappung `/fliesen` m390 (textkreuzung, 40):** Texte in Ratgeber-Karten (`article … p`) und in ausgeklappten FAQ-Einträgen (`details > summary/p`). Der Befund liegt bei y≈3823 bis 3878, also in `bildsatz/m390/fliesen/04.jpg` (Ausschnitt ab y=3376).
- **Unverändert gegenüber Anlauf 1:** `/fliesen/konfigurator` m390 39, t768 22, d1440 22 (alle in `details`-Inhalten). Bei `/` m390 25 (Listeneinträge in `details`). Das Muster sind Texte geschlossener oder ausgeklappter Elemente, am Bild zu prüfen.

## 2. Abschnittsbilder (`abschnitte.mjs`, Ansichten m390 und d1440)

| Seite | Ordner | m390 Bilder | d1440 Bilder | HTTP m390/d1440 | Konsole m390/d1440 | Fehler |
|---|---|---|---|---|---|---|
| `/` | `abschnitte/start/` | 22 | 17 | 200/200 | 0/0 | – |
| `/bad` | `abschnitte/__bad/` | 12 | 9 | 200/200 | 0/0 | – |
| `/leistungen` | `abschnitte/__leistungen/` | 15 | 10 | 200/200 | 0/0 | – |
| `/leistungen/bad` | `abschnitte/__leistungen__bad/` | 16 | 13 | 200/200 | 0/0 | – |
| `/standorte` | `abschnitte/__standorte/` | 15 | 11 | 200/200 | 0/0 | – |
| `/standorte/wetzlar` | `abschnitte/__standorte__wetzlar/` | 15 | 11 | 200/200 | 0/0 | – |
| `/fliesen` | `abschnitte/__fliesen/` | 16 | 12 | 200/200 | 0/0 | – |
| `/ueber-uns` | `abschnitte/__ueber-uns/` | 11 | 8 | 200/200 | 0/0 | – |
| `/kontakt` | `abschnitte/__kontakt/` | 12 | 9 | 200/200 | 0/0 | – |
| `/fliesen/konfigurator` | `abschnitte/__fliesen__konfigurator/` | 14 | 11 | 200/200 | 0/0 | – |
| `/blog` | `abschnitte/__blog/` | 12 | 7 | 200/200 | 0/0 | – |
| `/blog/rutschfeste-fliesen-r-klassen` | `abschnitte/__blog__rutschfeste-fliesen-r-klassen/` | 7 | 4 | 200/200 | 0/0 | – |

Summe: 12 Seiten, 2 Ansichten, 24 Ordner, 289 Bilder (Anlauf 1: 287). Keine Fehler, keine Konsolenmeldungen, alle HTTP 200.

## 3. Ersatzpfad (`bildsatz.mjs --satz e3-tor-2-ersatz --ersatzpfad`, 5 Seiten × 3 Ansichten)

Kennzahlen: 169 Aufnahmen, Fehler 0, Nicht-200 0, Überlauf 0, Überlappung 27 (sticky 2, textkreuzung 25), Konsole 0. Animationen: in keiner der 15 Ansichten das Zeitlimit erreicht, Restzahl laufender Animationen 0.

| Seite | Ansicht | Höhe normal/Ersatz | Aufnahmen normal/Ersatz | Überlappung normal/Ersatz | Stichprobe Aufnahme 00 / 01 / 02 (mittlere Abweichung, Anteil Pixel > 24) |
|---|---|---|---|---|---|
| `/` | d1440 | 16086 / 16086 | 12 / 12 | 0 / 0 | 0.0 / 0 % ; 0.0 / 0 % ; 0.0 / 0 % |
| `/` | m390 | 26702 / 26702 | 12 / 12 | 25 / 25 | 0.0 / 0 % ; 0.0 / 0 % ; 0.0 / 0 % |
| `/` | t768 | 22519 / 22519 | 12 / 12 | 0 / 0 | 0.0 / 0 % ; 0.0 / 0 % ; 0.0 / 0 % |
| `/bad` | d1440 | 8028 / 8028 | 9 / 9 | 2 / 2 | 0.0 / 0 % ; 0.0 / 0 % ; 0.0 / 0 % |
| `/bad` | m390 | 14373 / 14373 | 12 / 12 | 0 / 0 | 0.0 / 0 % ; 0.0 / 0 % ; 0.0 / 0 % |
| `/bad` | t768 | 10860 / 10860 | 11 / 11 | 0 / 0 | 0.0 / 0 % ; 0.0 / 0 % ; 0.0 / 0 % |
| `/leistungen` | d1440 | 9542 / 9542 | 11 / 11 | 0 / 0 | 0.0 / 0 % ; **1.1 / 1.6 %** ; **1.0 / 1.4 %** |
| `/leistungen` | m390 | 18218 / 18218 | 12 / 12 | 0 / 0 | 0.0 / 0 % ; 0.0 / 0 % ; 0.0 / 0 % |
| `/leistungen` | t768 | 12972 / 12972 | 12 / 12 | 0 / 0 | 0.0 / 0 % ; 0.0 / 0 % ; 0.0 / 0 % |
| `/standorte` | d1440 | 9387 / 9387 | 11 / 11 | 0 / 0 | 0.0 / 0 % ; 0.0 / 0 % ; 0.0 / 0 % |
| `/standorte` | m390 | 15677 / 15677 | 12 / 12 | 0 / 0 | 0.0 / 0 % ; 0.0 / 0 % ; 0.0 / 0 % |
| `/standorte` | t768 | 11430 / 11430 | 12 / 12 | 0 / 0 | 0.0 / 0 % ; 0.0 / 0 % ; 0.0 / 0 % |
| `/ueber-uns` | d1440 | 7662 / 7662 | 9 / 9 | 0 / 0 | 0.0 / 0 % ; 0.0 / 0 % ; 0.0 / 0 % |
| `/ueber-uns` | m390 | 12267 / 12267 | 12 / 12 | 0 / 0 | 0.0 / 0 % ; 0.0 / 0 % ; 0.0 / 0 % |
| `/ueber-uns` | t768 | 9260 / 9260 | 10 / 10 | 0 / 0 | 0.0 / 0 % ; 0.0 / 0 % ; 0.0 / 0 % |

Ergebnis: Höhe, Aufnahmenzahl und Überlappungsbefunde stimmen in allen 15 Ansichten mit dem normalen Bildsatz überein. Es fehlen keine Inhalte gegenüber dem Normalpfad. Die einzige Abweichung in der Stichprobe ist `/leistungen` d1440 (Aufnahmen 01 und 02, Anteil 1,4 bis 1,6 %); Anlauf 1 zeigte an derselben Stelle ähnliche Werte. Die Stichprobe umfasst nur die Aufnahmen 00 bis 02 je Ansicht.

## 4a. Einzelbilder (`bewegung.mjs --modus einzelbilder`, 11 Läufe)

Alle elf Kennungen haben ausgelöst (ausgelöst ≥ 1). Keine Kennung war „nicht auslösbar“. Lade-Folgen liefen als Echtzeit-Folge (Modus `echtzeit`). Die Werkzeugdatei `bewegung.mjs` wurde nach Anlauf 1 geändert (Änderungszeit 02:32 UTC), `sig-plan` läuft jetzt als Lade-Folge statt als Hover-Folge. Der Vergleich mit Anlauf 1 ist deshalb eingeschränkt.

Die Spalte „Sichtbar“ zählt Bilder, die sich vom Nachbarn um mehr als 0,5 % der Pixel unterscheiden (Grau, Schwelle 24). Für `verband`, `fugenband` und `leitachse` liefert das Werkzeug keine Kennzahl, die Zählung ist eigene Auswertung nach derselben Regel.

| Seite | Ansicht | Kennung | Auslöser (Werkzeug) | Modus | Dauer (ms) | Bilder | Sichtbar | Paare % (Nachbarpaare) | Quelle | Befund |
|---|---|---|---|---|---|---|---|---|---|---|
| `/` | m390 | sig-kreuzlinie | seite (1, 4 Elemente) | echtzeit | 1200 | 5 | 4/5 | 3.34 / 3.45 / 1.48 / 0.24 | Werkzeug | Scroll-Grenze erreicht, Oberkante 31 px unter dem Kopf |
| `/` | d1440 | sig-kreuzlinie | seite (1, 4 Elemente) | echtzeit | 1520 | 5 | 3/5 | 2.92 / 1.59 / 0.40 / 0.09 | Werkzeug | Ausschnitt über die ganze Ansichtshöhe |
| `/bad` | m390 | sig-plan | seite (1) | echtzeit | 1120 | 5 | 4/5 | 0 / 1.75 / 2.03 / 1.14 | Werkzeug | auf 909 px gescrollt |
| `/bad` | d1440 | sig-plan | seite (1) | echtzeit | 1120 | 5 | **0/5** | 0 / 0.41 / 0.49 / 0.21 | Werkzeug | keine Änderung über der Schwelle |
| `/leistungen/bad` | d1440 | sig-plan | seite (1) | echtzeit | 1120 | 5 | 2/5 | 0 / 0.44 / 0.51 / 0.19 | Werkzeug | knapp an der Schwelle |
| `/standorte` | d1440 | einzugsband | seite (1) | echtzeit | 1200 | 5 | **0/5** | 0.13 / 0.21 / 0.49 / 0 | Werkzeug | keine Änderung über der Schwelle |
| `/standorte` | m390 | einzugsband | seite (1) | echtzeit | 1200 | 5 | 3/5 | 0.57 / 0.58 / 0.41 / 0 | Werkzeug | Ausschnitt über die ganze Ansichtshöhe |
| `/fliesen` | m390 | verband | wahl (2 Folgen) | echtzeit | 600 | 10 | 10/10 | Halb→Drittel 9.99 / 1.42 / 1.30 / 1.22; Drittel→Kreuz 9.52 / 1.13 / 1.16 / 0.99 | eigene Zählung | Bilder 1–3 sind Echtzeit-Abtastungen nach dem Klick, keine Zeitpunkte 25/50/75 % |
| `/fliesen` | d1440 | verband | wahl (2 Folgen) | echtzeit | 600 | 10 | 10/10 | Halb→Drittel 9.58 / 1.42 / 1.41 / 1.12; Drittel→Kreuz 9.22 / 1.24 / 1.25 / 1.07 | eigene Zählung | wie oben |
| `/ueber-uns` | d1440 | fugenband | scroll (1) | scroll | 0 (Scroll) | 5 | 5/5 | 8.18 / 8.64 / 7.26 / 7.09 | eigene Zählung | Scrollpositionen 2251 / 2597 / 2943 / 3289 / 3634 |
| `/ueber-uns` | d1440 | leitachse | scroll (3 Elemente) | scroll | 0 (Scroll) | 5 | 5/5 | 14.12 / 12.66 / 10.70 / 9.98 | eigene Zählung | – |

Auffällig: Auf d1440 bewegen sich `/bad` sig-plan (0/5, Maximum 0,49 %) und `/standorte` einzugsband (0/5, Maximum 0,49 %) nicht über der Schwelle, auf m390 dagegen deutlich. Ob die Bewegung im d1440-Ausschnitt liegt, ist nicht geprüft.

Bildordner (unter `bewegung/`):
- `einzel-start-sig-kreuzlinie-m390/`, `einzel-start-sig-kreuzlinie-d1440/`
- `einzel-bad-sig-plan-m390/`, `einzel-bad-sig-plan-d1440/`
- `einzel-leistungen-bad-sig-plan-d1440/`
- `einzel-standorte-einzugsband-m390/`, `einzel-standorte-einzugsband-d1440/`
- `einzel-fliesen-verband-m390/`, `einzel-fliesen-verband-d1440/`
- `einzel-ueber-uns-fugenband-d1440/`, `einzel-ueber-uns-leitachse-d1440/`

## 4b. Register (`bewegung.mjs --modus register`, je Hauptansicht m390 und d1440)

| Seite | Ansicht | data-motion-Elemente | gefunden | Kennungen | unbekannt | ohne Register | im Register, nicht im DOM | Hover geprüft / Fehler |
|---|---|---|---|---|---|---|---|---|
| `/` | m390 | 199 | 8 | anriss, aufklappen, auftritt, druck, leitachse, sig-flucht, sig-kreuzlinie, zustand | 0 | 0 | 8 | 20 / 0 |
| `/` | d1440 | 199 | 8 | wie oben | 0 | 0 | 8 | 20 / 0 |
| `/bad` | m390 | 112 | 5 | aufklappen, druck, leitachse, sig-plan, zustand | 0 | 1 | 11 | 20 / 0 |
| `/bad` | d1440 | 112 | 5 | wie oben | 0 | 0 | 11 | 20 / 0 |
| `/leistungen` | m390 | 120 | 5 | aufklappen, druck, leitachse, sig-plan, zustand | 0 | 0 | 11 | 20 / 0 |
| `/leistungen` | d1440 | 120 | 5 | wie oben | 0 | 0 | 11 | 20 / 0 |
| `/leistungen/bad` | m390 | 127 | 5 | wie oben | 0 | 0 | 11 | 20 / 0 |
| `/leistungen/bad` | d1440 | 127 | 5 | wie oben | 0 | 0 | 11 | 20 / 0 |
| `/standorte` | m390 | 100 | 5 | aufklappen, druck, einzugsband, leitachse, zustand | 0 | 0 | 11 | 20 / 0 |
| `/standorte` | d1440 | 100 | 5 | wie oben | 0 | 0 | 11 | 20 / 0 |
| `/standorte/wetzlar` | m390 | 96 | 5 | wie oben | 0 | 0 | 11 | 20 / 0 |
| `/standorte/wetzlar` | d1440 | 96 | 5 | wie oben | 0 | 0 | 11 | 20 / 0 |
| `/fliesen` | m390 | 151 | 5 | aufklappen, druck, leitachse, verband, zustand | 0 | 1 | 11 | 20 / 0 |
| `/fliesen` | d1440 | 151 | 5 | wie oben | 0 | 0 | 11 | 20 / 0 |
| `/ueber-uns` | m390 | 91 | 5 | aufklappen, druck, fugenband, leitachse, zustand | 0 | 1 | 11 | 20 / 0 |
| `/ueber-uns` | d1440 | 91 | 5 | wie oben | 0 | 1 | 11 | 20 / 0 |
| `/kontakt` | m390 | 147 | 4 | aufklappen, druck, leitachse, zustand | 0 | 0 | 12 | 20 / 0 |
| `/kontakt` | d1440 | 147 | 4 | wie oben | 0 | 0 | 12 | 20 / 0 |
| `/fliesen/konfigurator` | m390 | 80 | 3 | aufklappen, druck, zustand | 0 | 2 | 13 | 20 / 0 |
| `/fliesen/konfigurator` | d1440 | 80 | 3 | wie oben | 0 | 0 | 13 | 20 / 0 |
| `/blog` | m390 | 98 | 3 | wie oben | 0 | 2 | 13 | 20 / 0 |
| `/blog` | d1440 | 98 | 3 | wie oben | 0 | 0 | 13 | 20 / 0 |
| `/blog/rutschfeste-fliesen-r-klassen` | m390 | 96 | 3 | wie oben | 0 | 1 | 13 | 20 / 0 |
| `/blog/rutschfeste-fliesen-r-klassen` | d1440 | 96 | 3 | wie oben | 0 | 0 | 13 | 20 / 0 |

Summen über 24 Läufe: gefundene Kennungen (Summe je Lauf) 112, unbekannt 0, ohne Register 9 Einträge. Verschiedene Kennungen insgesamt: 12 (anriss, aufklappen, auftritt, druck, einzugsband, fugenband, leitachse, sig-flucht, sig-kreuzlinie, sig-plan, verband, zustand). Gegenüber Anlauf 1 fehlt `szene-ablauf` (Anlauf 1 hatte 13 verschiedene Kennungen, 110 gefundene Summe, 10 ohne Register).

Die 9 Einträge „ohne Register“ sind alle Farb-Übergänge (`outline-color`) an Textlinks, nicht an `data-motion` gebunden. Sie kommen in `/bad` m390, `/fliesen` m390, `/ueber-uns` m390 und d1440, `/fliesen/konfigurator` m390 (2), `/blog` m390 (2) und `/blog/rutschfeste-fliesen-r-klassen` m390 vor. Die Hover-Schritte liefen in allen 24 Läufen ohne Fehler.

## 4c. Reduzierte Bewegung (`bewegung.mjs --modus reduziert`, prefers-reduced-motion: reduce)

| Seite | Ansicht | geprüft | Bewegungsbefunde | unsichtbar (nach Kennung) | verdeckt durch Zustand | Hover-Fehler |
|---|---|---|---|---|---|---|
| `/` | m390 | 199 | 0 | 9 (zustand 2, druck 3, aufklappen 1, sig-kreuzlinie 3) | 5 | 0 |
| `/` | d1440 | 199 | 0 | 4 (zustand 1, aufklappen 1, sig-kreuzlinie 1, druck 1) | 4 | 0 |
| `/bad` | m390 | 112 | 0 | 5 (zustand 2, druck 2, aufklappen 1) | 5 | 0 |
| `/bad` | d1440 | 112 | 0 | 2 (zustand 1, aufklappen 1) | 4 | 0 |
| `/leistungen` | m390 | 120 | 0 | 5 (zustand 2, druck 2, aufklappen 1) | 5 | 0 |
| `/leistungen` | d1440 | 120 | 0 | 2 (zustand 1, aufklappen 1) | 4 | 0 |
| `/standorte` | m390 | 100 | 0 | 5 (zustand 2, druck 2, aufklappen 1) | 5 | 0 |
| `/standorte` | d1440 | 100 | 0 | 2 (zustand 1, aufklappen 1) | 4 | 0 |
| `/fliesen` | m390 | 151 | 0 | 5 (zustand 2, druck 2, aufklappen 1) | 5 | 0 |
| `/fliesen` | d1440 | 151 | 0 | 2 (zustand 1, aufklappen 1) | 4 | 0 |
| `/ueber-uns` | m390 | 91 | 0 | 5 (zustand 2, druck 2, aufklappen 1) | 5 | 0 |
| `/ueber-uns` | d1440 | 91 | 0 | 2 (zustand 1, aufklappen 1) | 4 | 0 |

Alle zwölf Läufe ohne Bewegungsbefund. Der Hover-Fehler von Anlauf 1 (`/fliesen/konfigurator` m390, Timeout bei 1 von 20 Schritten) trat in diesem Lauf nicht auf.

## 4d. Bildrate (`bewegung.mjs --modus bildrate`, 4× CPU, 3 Wiederholungen)

| Seite | Ansicht | Anteil verworfen je Lauf (1 / 2 / 3) | Kopfwert (Median der Anteile) | Bilder gesamt | Long Animation Frames (Anzahl / Summe ms) | Pipeline-Anteil je Lauf |
|---|---|---|---|---|---|---|
| `/` | m390 | 0 % / 0.23 % / 0.03 % | 0.03 % | 3846 | 12 / 1377 | 0.12 / 0.28 / 0.08 % |
| `/bad` | m390 | 0 % / 0 % / 0 % | 0 % | 2030 | 4 / 375 | 0.14 / 0.53 / 0.05 % |

Die Werte schwanken stark und liegen weit unter Anlauf 1 (`/` m390: Kopfwert 4,9 %). Das Werkzeug weist jetzt im Feld `hinweis` aus, dass die Felder je für sich Mediane sind und der Kopfwert der Median der Anteile je Lauf ist. Anlauf 1 hatte diese Erklärung nicht. Die Werte aus Anlauf 1 und aus diesem Lauf sind nicht vergleichbar, weil Build und Systemlast verschieden sind.

## 5. Auffälligkeiten (zur Sichtabnahme)

1. **Neuer Überlauf auf `/blog` m390:** `span.shrink-0` ragt bis x=424 bei 390 px Breite. Anlauf 1 hatte keinen Überlauf. Lage im Bild unbekannt, Sichtprüfung nötig.
2. **Überlappung gestiegen von 110 auf 150:** +40 durch `/fliesen` m390 (textkreuzung, Bild `bildsatz/m390/fliesen/04.jpg`). Die sticky-Befunde (2) wandern von `/blog` d1440 nach `/bad` d1440 (`bildsatz/d1440/bad/05.jpg`), das ist dieselbe Seitenleiste (`aside.lg:sticky`).
3. **`/fliesen/konfigurator` und `/`:** unverändert (39 / 22 / 22 bzw. 25), Muster geschlossener oder ausgeklappter Elemente.
4. **Ersatzpfad:** Kennzahlen identisch mit dem normalen Bildsatz. Pixelabweichung nur bei `/leistungen` d1440 Aufnahmen 01 und 02 (1,4 bis 1,6 %).
5. **Einzelbilder auf d1440:** `/bad` sig-plan (0/5) und `/standorte` einzugsband (0/5) zeigen über der Schwelle keine Bewegung, Maximum 0,49 %. Auf m390 sind beide sichtbar. Ob die Bewegung außerhalb des Ausschnitts liegt, ist nicht geprüft.
6. **Werkzeug geändert:** `sig-plan` läuft nicht mehr als Hover-, sondern als Lade-Folge. `verband`, `fugenband`, `leitachse` haben keine Werkzeugkennzahl (eigene Zählung in dieser Auswertung).
7. **Register:** 0 unbekannte Kennungen in 24 Läufen. `szene-ablauf` ist auf `/` nicht mehr im DOM gefunden worden. Die 9 Einträge „ohne Register“ sind Link-Übergänge (`outline-color`).
8. **Bildrate:** Die Messungen schwanken von 0 % bis 0,23 % (`/` m390) bzw. 0 % (`/bad` m390). Das ist nicht mit Anlauf 1 (4,9 %) vergleichbar.
9. **Konsole, HTTP, Abschnitte:** keine Konsolenmeldungen, alle HTTP 200, keine Fehler in den 24 Abschnittsläufen.

Nicht Teil dieses Pakets und nicht geprüft: die Reinraum-Kurzfassung.

## 6. Ordnerlisten für die Gutachter

Basis: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/belege-roh/e3-tor-2/`

### 6a. Abschnittsbilder (je Seite zwei Ordner `m390/` und `d1440/`, Dateinamen in Reihenfolge)

`abschnitte/start/m390/` (22): 00-erster-bildschirm.jpg, 01-Perfektion auf jedem Quadratmeter.Fliese.jpg, 02-Perfektion auf jedem Quadratmeter.Fliese.jpg, 03-Vertrauenssignale und Fachbetriebs-Garan.jpg, 04-Garantien & Qualitätsversprechen von Fli.jpg, 05-Alles für Ihr Vorhaben auf über 100 Fach.jpg, 06-Alles für Ihr Vorhaben auf über 100 Fach.jpg, 07-Projekt anfragen & Situation schildern.jpg, 08-Projekt anfragen & Situation schildern.jpg, 09-Projekt anfragen & Situation schildern.jpg, 10-Fliesen-, Platten- & Verlegearbeiten in .jpg, 11-Fliesen-, Platten- & Verlegearbeiten in .jpg, 12-In 3 Schritten zu Ihrem neuen Belag.jpg, 13-In 3 Schritten zu Ihrem neuen Belag.jpg, 14-Fugenarme XXL-Großformate & fachgerechte.jpg, 15-Was unsere Kunden in Mittelhessen sagen.jpg, 16-In ganz Mittelhessen schnell auf Ihrer B.jpg, 17-In ganz Mittelhessen schnell auf Ihrer B.jpg, 18-Häufig gestellte Fragen zu Fliesen & Bad.jpg, 19-Ihre Express-Anfrage in 3 Klicks.jpg, 20-Bereit für Ihr Fliesen- oder Badprojekt?.jpg, 21-Fuß: footer.jpg

`abschnitte/start/d1440/` (17): 00-erster-bildschirm.jpg, 01-Perfektion auf jedem Quadratmeter.Fliese.jpg, 02-Vertrauenssignale und Fachbetriebs-Garan.jpg, 03-Garantien & Qualitätsversprechen von Fli.jpg, 04-Alles für Ihr Vorhaben auf über 100 Fach.jpg, 05-Projekt anfragen & Situation schildern.jpg, 06-Projekt anfragen & Situation schildern.jpg, 07-Fliesen-, Platten- & Verlegearbeiten in .jpg, 08-Fliesen-, Platten- & Verlegearbeiten in .jpg, 09-In 3 Schritten zu Ihrem neuen Belag.jpg, 10-Fugenarme XXL-Großformate & fachgerechte.jpg, 11-Was unsere Kunden in Mittelhessen sagen.jpg, 12-In ganz Mittelhessen schnell auf Ihrer B.jpg, 13-Häufig gestellte Fragen zu Fliesen & Bad.jpg, 14-Ihre Express-Anfrage in 3 Klicks.jpg, 15-Bereit für Ihr Fliesen- oder Badprojekt?.jpg, 16-Fuß: footer.jpg

`abschnitte/__bad/m390/` (12): 00-erster-bildschirm.jpg, 01-Ihr Traumbad schlüsselfertig in Fachqual.jpg, 02-Alles für Ihr neues Bad aus einer Hand.jpg, 03-Unsere Qualitäts-Kategorien im Überblick.jpg, 04-Unsere Qualitäts-Kategorien im Überblick.jpg, 05-Bad-Projektcheck.jpg, 06-Bad-Projektcheck.jpg, 07-Badanfrage.jpg, 08-Planen Sie ein Fliesen- oder Badprojekt?.jpg, 09-Fuß: footer.jpg, 10-Fuß: footer.jpg, 11-Fuß: footer.jpg

`abschnitte/__bad/d1440/` (9): 00-erster-bildschirm.jpg, 01-Ihr Traumbad schlüsselfertig in Fachqual.jpg, 02-Alles für Ihr neues Bad aus einer Hand.jpg, 03-Unsere Qualitäts-Kategorien im Überblick.jpg, 04-Bad-Projektcheck.jpg, 05-Bad-Projektcheck.jpg, 06-Badanfrage.jpg, 07-Planen Sie ein Fliesen- oder Badprojekt?.jpg, 08-Fuß: footer.jpg

`abschnitte/__leistungen/m390/` (15): 00-erster-bildschirm.jpg, 01-Fliesenleger Leistungen & Fachgewerke We.jpg, 02-Bäder & Wellness.jpg, 03-Bäder & Wellness.jpg, 04-Bäder & Wellness.jpg, 05-Bäder & Wellness.jpg, 06-Ihr verlässlicher Weg zum neuen Traumbel.jpg, 07-Projekt anfragen & Situation schildern.jpg, 08-Projekt anfragen & Situation schildern.jpg, 09-Projekt anfragen & Situation schildern.jpg, 10-Fordern Sie Ihr persönliches Angebot an.jpg, 11-Planen Sie ein Fliesen- oder Badprojekt?.jpg, 12-Fuß: footer.jpg, 13-Fuß: footer.jpg, 14-Fuß: footer.jpg

`abschnitte/__leistungen/d1440/` (10): 00-erster-bildschirm.jpg, 01-Fliesenleger Leistungen & Fachgewerke We.jpg, 02-Bäder & Wellness.jpg, 03-Bäder & Wellness.jpg, 04-Ihr verlässlicher Weg zum neuen Traumbel.jpg, 05-Projekt anfragen & Situation schildern.jpg, 06-Projekt anfragen & Situation schildern.jpg, 07-Fordern Sie Ihr persönliches Angebot an.jpg, 08-Planen Sie ein Fliesen- oder Badprojekt?.jpg, 09-Fuß: footer.jpg

`abschnitte/__leistungen__bad/m390/` (16): 00-erster-bildschirm.jpg, 01-Badsanierung & Komplettbäder: Bäder & We.jpg, 02-Spezialisierungen in Bäder & Wellness.jpg, 03-Fachkompetenz & Ausführungsdetails.jpg, 04-Weitere Gewerke von Fliesenverlegung Tez.jpg, 05-Bäder & Wellness in Ihrer Region.jpg, 06-Projekt in Bäder & Wellness anfragen?.jpg, 07-Projekt anfragen & Situation schildern.jpg, 08-Projekt anfragen & Situation schildern.jpg, 09-Projekt anfragen & Situation schildern.jpg, 10-Häufige Fragen zu Bäder & Wellness.jpg, 11-Jetzt unverbindlich anfragen.jpg, 12-Planen Sie ein Fliesen- oder Badprojekt?.jpg, 13-Fuß: footer.jpg, 14-Fuß: footer.jpg, 15-Fuß: footer.jpg

`abschnitte/__leistungen__bad/d1440/` (13): 00-erster-bildschirm.jpg, 01-Badsanierung & Komplettbäder: Bäder & We.jpg, 02-Spezialisierungen in Bäder & Wellness.jpg, 03-Fachkompetenz & Ausführungsdetails.jpg, 04-Weitere Gewerke von Fliesenverlegung Tez.jpg, 05-Bäder & Wellness in Ihrer Region.jpg, 06-Projekt in Bäder & Wellness anfragen?.jpg, 07-Projekt anfragen & Situation schildern.jpg, 08-Projekt anfragen & Situation schildern.jpg, 09-Häufige Fragen zu Bäder & Wellness.jpg, 10-Jetzt unverbindlich anfragen.jpg, 11-Planen Sie ein Fliesen- oder Badprojekt?.jpg, 12-Fuß: footer.jpg

`abschnitte/__standorte/m390/` (15): 00-erster-bildschirm.jpg, 01-Standorte & Einsatzgebiete in Mittelhess.jpg, 02-Standorte & Einsatzgebiete in Mittelhess.jpg, 03-Unser 45-km-Einsatzgebiet in Mittelhesse.jpg, 04-Wählen Sie Ihre Stadt oder Gemeinde.jpg, 05-Wählen Sie Ihre Stadt oder Gemeinde.jpg, 06-Wählen Sie Ihre Stadt oder Gemeinde.jpg, 07-Unsere Leistungen vor Ort.jpg, 08-Ihre Stadt ist nicht aufgeführt?.jpg, 09-Unser Hauptstandort in Aßlar.jpg, 10-Fliesenleger oder Badsanierung in Mittel.jpg, 11-Planen Sie ein Fliesen- oder Badprojekt .jpg, 12-Fuß: footer.jpg, 13-Fuß: footer.jpg, 14-Fuß: footer.jpg

`abschnitte/__standorte/d1440/` (11): 00-erster-bildschirm.jpg, 01-Standorte & Einsatzgebiete in Mittelhess.jpg, 02-Unser 45-km-Einsatzgebiet in Mittelhesse.jpg, 03-Wählen Sie Ihre Stadt oder Gemeinde.jpg, 04-Wählen Sie Ihre Stadt oder Gemeinde.jpg, 05-Unsere Leistungen vor Ort.jpg, 06-Ihre Stadt ist nicht aufgeführt?.jpg, 07-Unser Hauptstandort in Aßlar.jpg, 08-Fliesenleger oder Badsanierung in Mittel.jpg, 09-Planen Sie ein Fliesen- oder Badprojekt .jpg, 10-Fuß: footer.jpg

`abschnitte/__standorte__wetzlar/m390/` (15): 00-erster-bildschirm.jpg, 01-Fliesenverlegung & Badsanierung in Wetzl.jpg, 02-Fliesenverlegung & Badsanierung in Wetzl.jpg, 03-Ihr Fliesen-Fachbetrieb für Wetzlar.jpg, 04-Schnell bei Ihnen in Wetzlar.jpg, 05-Einsatzgebiet und Marktabdeckung Wetzlar.jpg, 06-Unsere Leistungen in Wetzlar.jpg, 07-Weitere Einsatzgebiete in der Region.jpg, 08-Fliesenleger oder Badsanierung in Wetzla.jpg, 09-Unser 8-Punkte-Qualitätsversprechen für .jpg, 10-Unser 8-Punkte-Qualitätsversprechen für .jpg, 11-Ihr Fliesenleger für Wetzlar: Jetzt kost.jpg, 12-Fuß: footer.jpg, 13-Fuß: footer.jpg, 14-Fuß: footer.jpg

`abschnitte/__standorte__wetzlar/d1440/` (11): 00-erster-bildschirm.jpg, 01-Fliesenverlegung & Badsanierung in Wetzl.jpg, 02-Ihr Fliesen-Fachbetrieb für Wetzlar.jpg, 03-Schnell bei Ihnen in Wetzlar.jpg, 04-Einsatzgebiet und Marktabdeckung Wetzlar.jpg, 05-Unsere Leistungen in Wetzlar.jpg, 06-Weitere Einsatzgebiete in der Region.jpg, 07-Fliesenleger oder Badsanierung in Wetzla.jpg, 08-Unser 8-Punkte-Qualitätsversprechen für .jpg, 09-Ihr Fliesenleger für Wetzlar: Jetzt kost.jpg, 10-Fuß: footer.jpg

`abschnitte/__fliesen/m390/` (16): 00-erster-bildschirm.jpg, 01-Fliesen-Ratgeber: Formate, Räume und Ver.jpg, 02-Fliesen & Verlegung im Überblick.jpg, 03-Vom Raum bis zur Abnahme: die wichtigste.jpg, 04-Vom Raum bis zur Abnahme: die wichtigste.jpg, 05-Unter der Fliese und über das Wohnen hin.jpg, 06-Wohnbereiche, Küche, Flur und Neubau – a.jpg, 07-Weiterführende Ratgeber zur Fliesenverle.jpg, 08-Fliesen-Konfigurator.jpg, 09-Fliesen-Konfigurator.jpg, 10-Unser 8-Punkte-Qualitätsversprechen für .jpg, 11-Unser 8-Punkte-Qualitätsversprechen für .jpg, 12-Planen Sie ein Fliesen- oder Badprojekt?.jpg, 13-Fuß: footer.jpg, 14-Fuß: footer.jpg, 15-Fuß: footer.jpg

`abschnitte/__fliesen/d1440/` (12): 00-erster-bildschirm.jpg, 01-Fliesen-Ratgeber: Formate, Räume und Ver.jpg, 02-Fliesen & Verlegung im Überblick.jpg, 03-Vom Raum bis zur Abnahme: die wichtigste.jpg, 04-Vom Raum bis zur Abnahme: die wichtigste.jpg, 05-Unter der Fliese und über das Wohnen hin.jpg, 06-Wohnbereiche, Küche, Flur und Neubau – a.jpg, 07-Weiterführende Ratgeber zur Fliesenverle.jpg, 08-Fliesen-Konfigurator.jpg, 09-Unser 8-Punkte-Qualitätsversprechen für .jpg, 10-Planen Sie ein Fliesen- oder Badprojekt?.jpg, 11-Fuß: footer.jpg

`abschnitte/__ueber-uns/m390/` (11): 00-erster-bildschirm.jpg, 01-Über uns – Fliesenleger-Fachbetrieb Tezg.jpg, 02-Handwerkliche Präzision aus Aßlar.jpg, 03-Unsere Werte im Handwerk.jpg, 04-Unsere Unternehmensgeschichte.jpg, 05-Unser 8-Punkte-Qualitätsversprechen für .jpg, 06-Unser 8-Punkte-Qualitätsversprechen für .jpg, 07-Lernen Sie uns persönlich kennen: Kosten.jpg, 08-Fuß: footer.jpg, 09-Fuß: footer.jpg, 10-Fuß: footer.jpg

`abschnitte/__ueber-uns/d1440/` (8): 00-erster-bildschirm.jpg, 01-Über uns – Fliesenleger-Fachbetrieb Tezg.jpg, 02-Handwerkliche Präzision aus Aßlar.jpg, 03-Unsere Werte im Handwerk.jpg, 04-Unsere Unternehmensgeschichte.jpg, 05-Unser 8-Punkte-Qualitätsversprechen für .jpg, 06-Lernen Sie uns persönlich kennen: Kosten.jpg, 07-Fuß: footer.jpg

`abschnitte/__kontakt/m390/` (12): 00-erster-bildschirm.jpg, 01-Kontakt & Aufmaß Fliesenleger Tezgel.jpg, 02-Direkter Kontakt und Qualitätsverspreche.jpg, 03-Unser Fachbetrieb & Einsatzgebiet Mittel.jpg, 04-Unser Fachbetrieb & Einsatzgebiet Mittel.jpg, 05-Fliesenleger oder Badsanierung in Aßlar,.jpg, 06-Wunschtermin in 2 Schritten reservieren.jpg, 07-Ihr Vor-Ort-Aufmaß anfordern.jpg, 08-Sie möchten Ihr Bad oder Ihre Fliesen er.jpg, 09-Fuß: footer.jpg, 10-Fuß: footer.jpg, 11-Fuß: footer.jpg

`abschnitte/__kontakt/d1440/` (9): 00-erster-bildschirm.jpg, 01-Kontakt & Aufmaß Fliesenleger Tezgel.jpg, 02-Direkter Kontakt und Qualitätsverspreche.jpg, 03-Unser Fachbetrieb & Einsatzgebiet Mittel.jpg, 04-Fliesenleger oder Badsanierung in Aßlar,.jpg, 05-Wunschtermin in 2 Schritten reservieren.jpg, 06-Ihr Vor-Ort-Aufmaß anfordern.jpg, 07-Sie möchten Ihr Bad oder Ihre Fliesen er.jpg, 08-Fuß: footer.jpg

`abschnitte/__fliesen__konfigurator/m390/` (14): 00-erster-bildschirm.jpg, 01-Fliesen-Konfigurator & Bedarfsrechner vo.jpg, 02-Fliesen-Konfigurator.jpg, 03-Vier Schritte bis zur strukturierten Anf.jpg, 04-So rechnet der Konfigurator: Fläche, Mus.jpg, 05-Bei Treppen nur die Nettofläche.jpg, 06-Wie es weitergeht: Aufmaß und Festpreisa.jpg, 07-Häufige Fragen zum Konfigurator.jpg, 08-Weiterführende Ratgeber zur Fliesenplanu.jpg, 09-Unser 8-Punkte-Qualitätsversprechen für .jpg, 10-Unser 8-Punkte-Qualitätsversprechen für .jpg, 11-Fuß: footer.jpg, 12-Fuß: footer.jpg, 13-Fuß: footer.jpg

`abschnitte/__fliesen__konfigurator/d1440/` (11): 00-erster-bildschirm.jpg, 01-Fliesen-Konfigurator & Bedarfsrechner vo.jpg, 02-Fliesen-Konfigurator.jpg, 03-Vier Schritte bis zur strukturierten Anf.jpg, 04-So rechnet der Konfigurator: Fläche, Mus.jpg, 05-Bei Treppen nur die Nettofläche.jpg, 06-Wie es weitergeht: Aufmaß und Festpreisa.jpg, 07-Häufige Fragen zum Konfigurator.jpg, 08-Weiterführende Ratgeber zur Fliesenplanu.jpg, 09-Unser 8-Punkte-Qualitätsversprechen für .jpg, 10-Fuß: footer.jpg

`abschnitte/__blog/m390/` (12): 00-erster-bildschirm.jpg, 01-Fliesen-Ratgeber & Badsanierung Tipps.jpg, 02-Handwerkerbonus: Fliesenarbeiten von der.jpg, 03-Handwerkerbonus: Fliesenarbeiten von der.jpg, 04-Handwerkerbonus: Fliesenarbeiten von der.jpg, 05-Handwerkerbonus: Fliesenarbeiten von der.jpg, 06-Handwerkerbonus: Fliesenarbeiten von der.jpg, 07-Unser 8-Punkte-Qualitätsversprechen für .jpg, 08-Unser 8-Punkte-Qualitätsversprechen für .jpg, 09-Fuß: footer.jpg, 10-Fuß: footer.jpg, 11-Fuß: footer.jpg

`abschnitte/__blog/d1440/` (7): 00-erster-bildschirm.jpg, 01-Fliesen-Ratgeber & Badsanierung Tipps.jpg, 02-Handwerkerbonus: Fliesenarbeiten von der.jpg, 03-Handwerkerbonus: Fliesenarbeiten von der.jpg, 04-Handwerkerbonus: Fliesenarbeiten von der.jpg, 05-Unser 8-Punkte-Qualitätsversprechen für .jpg, 06-Fuß: footer.jpg

`abschnitte/__blog__rutschfeste-fliesen-r-klassen/m390/` (7): 00-erster-bildschirm.jpg, 01-Rutschfeste Fliesen: Welche R-Klasse ist.jpg, 02-Unser 8-Punkte-Qualitätsversprechen für .jpg, 03-Unser 8-Punkte-Qualitätsversprechen für .jpg, 04-Fuß: footer.jpg, 05-Fuß: footer.jpg, 06-Fuß: footer.jpg

`abschnitte/__blog__rutschfeste-fliesen-r-klassen/d1440/` (4): 00-erster-bildschirm.jpg, 01-Rutschfeste Fliesen: Welche R-Klasse ist.jpg, 02-Unser 8-Punkte-Qualitätsversprechen für .jpg, 03-Fuß: footer.jpg

### 6b. Bewegungsfolgen (Ordner unter `bewegung/`, Dateinamen in Reihenfolge)

- `einzel-start-sig-kreuzlinie-m390/` (5): sig-kreuzlinie-0.jpg, sig-kreuzlinie-1.jpg, sig-kreuzlinie-2.jpg, sig-kreuzlinie-3.jpg, sig-kreuzlinie-4.jpg
- `einzel-start-sig-kreuzlinie-d1440/` (5): sig-kreuzlinie-0.jpg bis sig-kreuzlinie-4.jpg
- `einzel-bad-sig-plan-m390/` (5): sig-plan-0.jpg bis sig-plan-4.jpg
- `einzel-bad-sig-plan-d1440/` (5): sig-plan-0.jpg bis sig-plan-4.jpg
- `einzel-leistungen-bad-sig-plan-d1440/` (5): sig-plan-0.jpg bis sig-plan-4.jpg
- `einzel-standorte-einzugsband-m390/` (5): einzugsband-0.jpg bis einzugsband-4.jpg
- `einzel-standorte-einzugsband-d1440/` (5): einzugsband-0.jpg bis einzugsband-4.jpg
- `einzel-fliesen-verband-m390/` (10): verband-halb-drittel-0.jpg bis verband-halb-drittel-4.jpg, verband-drittel-kreuz-0.jpg bis verband-drittel-kreuz-4.jpg
- `einzel-fliesen-verband-d1440/` (10): verband-halb-drittel-0.jpg bis verband-halb-drittel-4.jpg, verband-drittel-kreuz-0.jpg bis verband-drittel-kreuz-4.jpg
- `einzel-ueber-uns-fugenband-d1440/` (5): fugenband-0.jpg bis fugenband-4.jpg
- `einzel-ueber-uns-leitachse-d1440/` (5): leitachse-0.jpg bis leitachse-4.jpg

Ergebnisdateien je Lauf: `ergebnis.json` im selben Ordner.