# Volle Prüfkette nach Stufe 2 von UM-E4-SICHT-FIX-2 (1.11.2026)

Vorher a3c28d36 (Server 4324, Torstand vor der Runde), nachher bce95087 (Server 4325, Stufe 1 und Stufe 2 mit Nachtrag). Die Kette `kette.sh` lief losgelöst (setsid) von 14:06 bis 16:03 UTC. Dann beendete die Zeitgrenze ihrer Hintergrundaufgabe (2 h) sie mitten in der Lighthouse-Runde n2. Alles vor Lighthouse und die Runden v1 und n1 waren da schon fertig. Den Rest (`kette-rest.sh`: n2, v2, Desktop, Reaktion) habe ich losgelöst mit nohup neu gestartet, 16:07 bis 17:20 UTC; danach `danach.sh` mit der Nachmessung `lh-nach.sh` (17:23 bis 17:34 UTC) und der CLS-Probe (17:34 bis 17:38 UTC). Lighthouse und Reaktion liefen allein auf dem Rechner.

| Prüfung | Ergebnis |
|---|---|
| Reinraum bce95087 | grün (lint 0, test 0, qa-graph 0), 280/280, 0 übersprungen |
| Stylesheets | eines je Seite (13 Seiten, beide Stände) |
| CSS gzip | 25.111 → 25.601 B (+490 B); seit der Grundlinie vor Welle 1 von UM-E4-SICHT-FIX 23.400 → 25.601 B (+2.201 B; Budget +4 KB) |
| G8-Abgleich | gleich (Fuß, Zitate, Zahlen auf /, /bad, /ueber-uns, Impressum, Datenschutz) |
| Suite reduziert / Bewegung an | 398 / 0 / 26 und 398 / 0 / 26, 0 flaky |
| Bildrate im Wechsel (vorher → nachher) | / 0 → 0 %, /bad 3,17 → 3,25 %, /referenzen 0,22 → 0,06 %, /standorte/wetzlar 0,16 → 0,59 %; alle unter 5 %, keine durchgängige Verschlechterung |
| axe Hauptansichten (--zustaende) | 396 Läufe, 0 ernste oder kritische Knoten |
| axe Zusatz (9 Seiten, --zustaende) | 297 Läufe, 0 Knoten |
| ruhig / reduziert (13 Seiten) | 0 Befunde |
| Register d1440 / m390 | 0 unbekannt, 0 ohne Register |
| Strukturdaten | 113 von 113 grün, je Seite ein Service-Knoten |
| Lesbarkeit | 10 von 12 grün, rot nur die geschützten H1 auf / und /bad/badsanierung (Floskel, G8) |
| Erstes Bild | 240 Fälle, 212 bestanden; die 74 Elementausfälle sind Fall für Fall dieselben wie nach Welle 1 und Welle 2 (vor allem der Cookie-Hinweis im Erstbesuch) |
| Werte (--basis a3c28d36) | 50 Dateien, 1 Befund: `STAFFEL_MAX = 7` in `galerie-filter/daten.ts` Zeile 83. Altbestand: die Zeile steht schon auf a3c28d36 (Zeile 79), und sie ist eine Stufenzahl, keine Dauer. Gemeldet, weil SF2-C die Datei geändert hat |
| Pixel Hauptansichten | 48 Paare, 46 mit Abweichung; gleich sind nur / m390 und /kontakt m390. Auf / weichen nur der Schlussabschnitt mit Formular (A2 M2-A2, 0,4 bis 0,7 %) und t768/d1440/d1920 ab. Alle Abweichungen liegen in Ansichten mit gewollten Änderungen (Notizen a1, a2, b, c) |
| Pixel Zusatz | 36 Paare, 14 mit Abweichung: /standorte/giessen und /standorte/asslar (Ortsvorlage, A2 und B), /leistungen/bad und /foerderung je t768/d1440/d1920 mit 58 bis 220 Pixel (geschlossenes Raster im Anfrageformular, A2 M2-A2: die Fuge neben der freien Zelle entfällt, weil der fünfte Knopf die Reihe schließt); /preise, /termin, /bad/projekt-check, /bad/badanfrage und der Ratgeber pixelgleich |

## Lighthouse mobil (Median aus 6 Läufen je Stand, V N N V, allein)

| Seite | Leistung | LCP ms | TBT ms | CLS max | Läufe | Desktop |
|---|---|---|---|---|---|---|
| / | 94.5 → 93.5 | 2811 → 2925 | 121 → 126 | 0.00540358 → 0 | 6/6 | 100 → 100 |
| /bad | 94 → 91.5 | 2995 → 3012 | 118 → 186 | 0 → 0.00360239 | 6/6 | 100 → 100 |
| /bad/badsanierung | 91.5 → 90 | 3011 → 2795 | 177 → 209 | 0.00360239 → 0 | 6/6 | 100 → 100 |
| /bad/barrierefreies-bad | 93 → 94 | 2854 → 2867 | 130 → 118 | 0.168336 → 0 | 6/6 | 100 → 100 |
| /leistungen | 94 → 93.5 | 2857 → 3004 | 110 → 138 | 0.174528 → 0 | 6/6 | 100 → 100 |
| /fliesen | 91.5 → 95 | 3010 → 2793 | 184 → 132 | 0.00540358 → 0 | 6/6 | 100 → 100 |
| /balkon-terrasse | 93 → 94 | 2967 → 2864 | 130 → 131 | 0 → 0 | 6/6 | 100 → 100 |
| /referenzen | 94.5 → 94 | 2831 → 3002 | 111 → 119 | 2.70193e-05 → 0 | 6/6 | 100 → 100 |
| /ueber-uns | 94.5 → 94 | 2855 → 2854 | 101 → 109 | 0.0104469 → 0 | 6/6 | 100 → 100 |
| /kontakt | 86 → 85.5 | 3848 → 3891 | 167 → 189 | 0.00540358 → 0 | 6/6 | 100 → 100 |
| /standorte/wetzlar | 94 → 92.5 | 2902 → 2988 | 127 → 158 | 0 → 0 | 6/6 | 100 → 100 |
| /blog | 95 → 94.5 | 2676 → 2752 | 130 → 132 | 0 → 0 | 6/6 | 100 → 100 |

- Werte als Median aller Einzelläufe je Stand (v1 und v2 gegen n1 und n2, je 6 Läufe); Desktop als Median aus 3 Läufen (dv, dn).
- **Abbruchkriterium /fliesen** (E-113 Nr. 6, Median unter 91): greift nicht (95). Der Plan „Laden“ in der Flucht bleibt.
- **Rückweg je Ansicht** (E-113): Keine Ansicht fällt unter 90. Nur /bad/badsanierung liegt mit TBT 209 ms über 200 ms. Die Runde n1 lief mit Benchmark-Referenz 1641, 15 bis 20 % unter den übrigen. Deshalb gab es eine Nachmessung (`lh-nach.sh`): vier weitere Runden V N N V zu je 3 Läufen für /bad, /bad/badsanierung und /kontakt, Median aus 12 Läufen je Stand:

Benchmark-Referenz je Runde: {'v1': 1914, 'v2': 2042.5, 'v3': 1890.5, 'v4': 1722.5, 'n1': 1641.5, 'n2': 1961, 'n3': 1717.5, 'n4': 1738.5}
| Seite | Leistung alle | TBT alle | Leistung ohne n1 | TBT ohne n1 | LCP alle | Läufe |
|---|---|---|---|---|---|---|
| /bad | 94.0 → 92.5 | 130.0 → 160.8 | 94.0 → 93 | 130.0 → 159 | 2994.0 → 3010.7 | 12/12 |
| /bad/badsanierung | 92.0 → 90.0 | 155.0 → 233.3 | 92.0 → 90 | 155.0 → 177.5 | 3000.5 → 2902.2 | 12/12 |
| /kontakt | 85.5 → 86.0 | 178.0 → 164.5 | 85.5 → 87 | 178.0 → 156.0 | 3866.2 → 3864.7 | 12/12 |

- **Ursachenprüfung /bad/badsanierung:**
  - Die zwölf Skriptdateien der Seite sind in beiden Bauten gleich (225.025 B gzip).
  - Die Arbeit des Hauptthreads ist je Aufruf gleich (normiert auf Benchmark 2000, Median aus 12): Skriptausführung 1.047 → 1.039 ms, Stil und Layout 576 → 573, HTML 118 → 121. Die Zahl der DOM-Knoten sinkt von 1.672 auf 1.650.
  - Die langen Aufgaben sind dieselben (Dokument bei rund 1,1 s, Hydrierung bei 3,3 bis 4,1 s), ihre Summe steigt leicht (561 → 596 ms je Lauf). TBT zählt nur den Teil über 50 ms und reagiert deshalb stark darauf, wie dieselbe Arbeit in Aufgaben zerfällt. Beide Stände streuen gleich weit: vorher 118 bis 323 ms, nachher 111 bis 318 ms; E0 165 ms (105 bis 199).
  - Entscheidung in E-114: keine Rücknahme. Die Überschreitung des Budgets wird in UM-E5-C gegen E0 nachgemessen.
- **CLS:** im Median 0 auf allen Ansichten. Einzelne Ausreißer in beiden Ständen an der Schnurebene des Einstiegs (`div.einstieg-lot > div.mx-auto`):
  - vorher mobil /bad/barrierefreies-bad 0,168 und /leistungen 0,175, Desktop /bad/badsanierung 0,573 und /blog 0,143;
  - nachher Desktop /fliesen 0,223 und /ueber-uns 0,555, mobil (Nachmessung n3) /bad/badsanierung 0,168.
  - Die CLS-Probe (`cls-probe.mjs`, PerformanceObserver mit vorherigem und jetzigem Rechteck, frisches Profil, Erstbesuch mit Cookie-Hinweis, Bewegung an) fand in 64 Aufrufen keine Verschiebung über 0,01: 40 am Desktop (1350 × 940; /ueber-uns, /fliesen, /bad/badsanierung, /blog) und 24 mobil (412 × 823; /bad/barrierefreies-bad, /leistungen, /).
  - Die Ausreißer entstehen nur unter Lighthouse und in beiden Ständen gleich selten. Lighthouse nennt das Foto „ohne feste Größe“, obwohl `unsized-images` leer ist und das Bild Maße trägt. Im Filmstreifen stehen Schnur und Foto ab 375 ms still.

## Reaktion (m390, CPU 4×, Schwelle 200 ms)

Hauptlauf (3 Läufe je Handlung, höchster Median je Ansicht, vorher → nachher): / 152 → 176, /bad 160 → 152, /bad/badsanierung 120 → 144, /bad/barrierefreies-bad 176 → 184, /leistungen 128 → 120, /fliesen 176 → 152, /balkon-terrasse 144 → 104, /referenzen 200 → 232 (Akkordeon), /ueber-uns 136 → 128, /kontakt 208 → 176, /standorte/wetzlar 208 → 144, /blog 184 → 176.

Nachmessung mit 7 Läufen je Handlung, im Wechsel V N V N, Median über 14 Läufe je Stand:

| Seite · Handlung | vorher | nachher | nachher Spanne | Rundenmediane nachher |
|---|---|---|---|---|
| /referenzen · hauptknopf | 136 | 156 | 88 bis 248 | 152, 200 |
| /referenzen · akkordeon | 220 | 232 | 192 bis 352 | 240, 224 |
| /kontakt · hauptknopf | 184 | 164 | 120 bis 256 | 216, 152 |
| /standorte/wetzlar · hauptknopf | 248 | 232 | 120 bis 304 | 232, 232 |
| /standorte/wetzlar · akkordeon | 92 | 104 | 64 bis 168 | 104, 104 |
| /bad/badsanierung · hauptknopf | 180 | 188 | 120 bis 280 | 184, 192 |
| /bad/badsanierung · akkordeon | 120 | 116 | 104 bis 168 | 128, 112 |

- Keine durchgängige Verschlechterung. Alle Werte liegen deutlich unter E0 (/referenzen 304, /kontakt 812).
- In dieser Sitzung liegen /referenzen beim Aufklappen (220 → 232) und /standorte/wetzlar beim Hauptknopf (248 → 232) in beiden Ständen über 200 ms. In Welle 2 maß derselbe Vorher-Stand 192 und 160. Der Rechner streut zwischen den Sitzungen; offen für UM-E5-C (gegen E0, dieselbe Methode).

## Dateien

- `kette.sh`, `kette-rest.sh`, `kette.log`, `kette-rest.log`: Ablauf und Protokoll
- `g8.json`, `axe-zusatz.json`: Abgleich und Zusatzseiten
- `lh-{v1,n1,n2,v2}-mobil.json`, `lh-{dv,dn}-desktop.json`: Lighthouse je Runde
- `reaktion-{v,n}.json`, `reaktion7-{v1,n1,v2,n2}.json`: Reaktion
- `lh-{v3,n3,n4,v4}-mobil.json`, `lh-nach.sh`, `danach.sh`, `danach.log`: Nachmessung und CLS-Probe
- `cls-probe.mjs`, `probe-n-desktop.json`, `probe-n-mobil.json`: CLS-Probe
- `lh-auswertung.py`, `lh-nach-auswertung.py`, `reaktion-auswertung.py`: Mediane über alle Einzelläufe je Stand
