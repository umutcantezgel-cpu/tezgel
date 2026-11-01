# Messpunkt nach Welle 2 von UM-E4-SICHT-FIX (1.11.2026)

Vorher 13315fa8 (Server 4325, Stand nach Welle 1), nachher a3c28d36 (Server 4324, HEAD nach SF-B2, SF-A2, SF-C3, Nachtrag und Zusammenführung). Kette `kette.sh` losgelöst (setsid) von 01:47 bis 04:24 UTC, Lighthouse und Reaktion am Ende allein auf dem Rechner. Nachmessung der Reaktion `reaktion-nach.sh` (4 Seiten, 7 Läufe je Handlung, im Wechsel V N V N) von 04:24 bis 04:38 UTC, ebenfalls allein.

| Prüfung | Ergebnis |
|---|---|
| Reinraum a3c28d36 | grün (lint 0, test 0, qa-graph 0), 280/280, 0 übersprungen |
| Stylesheets | eines je Seite (13 Seiten, beide Stände) |
| CSS gzip | 24.541 → 25.111 B (+570 B); seit der Grundlinie vor Welle 1 23.400 → 25.111 B (+1.711 B; Budget beider Wellen +4 KB) |
| G8-Abgleich | gleich (Fuß, Zitate, Zahlen auf /, /bad, /ueber-uns, Impressum, Datenschutz) |
| Suite reduziert / Bewegung an | 398 / 0 / 26 und 398 / 0 / 26, 0 flaky |
| Bildrate im Wechsel (vorher → nachher) | / 0,14 → 0,21 %, /bad 3,36 → 2,46 %, /referenzen 2,16 → 0,17 %, /standorte/wetzlar 0,16 → 0,31 %; alle unter 5 %, keine durchgängige Verschlechterung |
| axe Hauptansichten (--zustaende) | 396 Läufe, 0 ernste oder kritische Knoten |
| axe Zusatz (9 Seiten, --zustaende) | 297 Läufe, **0** Knoten (Welle 1: 104 am WhatsApp-Knopf) → **X-1 erledigt** |
| ruhig / reduziert (13 Seiten) | 0 Befunde |
| Register d1440 / m390 | 0 unbekannt, 0 ohne Register |
| Strukturdaten | 113 von 113 grün, je Seite ein Service-Knoten |
| Lesbarkeit | 10 von 12 grün, rot nur die geschützten H1 auf / und /bad/badsanierung (Floskel, G8) |
| Erstes Bild | 240 Fälle, 212 bestanden; Ausfälle Fall für Fall gleich wie nach Welle 1 (vor allem Cookie-Hinweis im Erstbesuch) |
| Werte (--basis 13315fa8) | 38 Dateien, 0 Befunde |
| Pixel Hauptansichten | 48 Paare, 44 mit Abweichung; gleich nur /kontakt (in Welle 2 nicht geändert); alle Abweichungen in Ansichten mit gewollten Änderungen (Notizen SF-A2, SF-B2, SF-C3) |
| Pixel Zusatz | 36 Paare, 8 mit Abweichung, nur /standorte/asslar und /standorte/giessen (Ortsvorlage, SF-A2 und SF-B2); /preise, /termin, /leistungen/bad, /foerderung pixelgleich, die Behebung von X-1 ist unsichtbar |

## Lighthouse mobil (Median aus 6 Läufen je Stand, V N N V, allein)

| Seite | Leistung | LCP ms | TBT ms | Desktop |
|---|---|---|---|---|
| / | 94,5 → 95 | 2844 → 2814 | 111 → 91 | 100 → 100 |
| /bad | 93 → 94 | 3036 → 2856 | 122 → 109 | 100 → 100 |
| /bad/badsanierung | 92,5 → 91 | 2853 → 2904 | 157 → 194 | 100 → 100 |
| /bad/barrierefreies-bad | 94 → 94 | 2991 → 2963 | 83 → 98 | 100 → 100 |
| /leistungen | 95 → 94,5 | 2844 → 2854 | 98 → 116 | 100 → 100 |
| /fliesen | 94 → 92,5 | 2822 → 3160 | 105 → 152 | 100 → 100 |
| /balkon-terrasse | 93 → 93,5 | 3109 → 2930 | 96 → 116 | 100 → 100 |
| /referenzen | 95 → 94 | 2700 → 2963 | 105 → 77 | 100 → 100 |
| /ueber-uns | 94 → 94 | 2989 → 2986 | 94 → 98 | 100 → 100 |
| /kontakt | 87,5 → **87** | 3751 → 3826 | 131 → 135 | 100 → 100 |
| /standorte/wetzlar | 94 → 93 | 2816 → 2954 | 122 → 112 | 100 → 100 |
| /blog | 95 → 94,5 | 2744 → 2787 | 79 → 124 | 100 → 100 |

- CLS im Median 0, nur /bad nachher 0,010 (Leiste `aside.unten-sicher`). Zwei einzelne Ausreißer am Einstiegsbehälter (`section.relative > div.relative > div.relative > div.mx-auto`), je einer in jedem Stand: vorher / 0,129 (v2, Lauf 2), nachher /bad 0,169 (n2, Lauf 1). Das sind 2 von 72 mobilen Läufen; nach Welle 1 waren es 0 von 72. Der Ausreißer tritt auch auf 13315fa8 auf und folgt damit nicht aus Welle 2. Ursache klären in UM-E5-C.
- FCP in allen Läufen 1,05 bis 1,27 s.
- /kontakt: LCP-Element in allen 12 Läufen der Text des Cookie-Hinweises (`p#cookie-consent-description`), wie nach Welle 1 → R-2 nicht behoben, Entscheidung in E-112.
- /fliesen: Der simulierte LCP (Element: Vorspann `p.max-w-mass`) springt in Stufen von rund 230 ms (2,71 / 2,94 / 3,16 / 3,45 s). Vorher lagen 6 von 6 Läufen in den zwei unteren Stufen, nachher 4 von 6 in den oberen. Leistung 92,5 bleibt über 90 und über E0 (92).
- /bad/badsanierung: TBT 157 → 194 ms. Die Spannen überlappen (vorher 110 bis 411, nachher 117 bis 253). Die Leistung bleibt über 90 und über E0 (90).

## Reaktion (m390, CPU 4×, Schwelle 200 ms)

Hauptlauf (3 Läufe je Handlung, höchster Median je Ansicht, vorher → nachher): / 168 → 128, /bad 112 → 112, /bad/badsanierung 232 → 104, /bad/barrierefreies-bad 112 → 120, /leistungen 128 → 176, /fliesen 168 → 136, /balkon-terrasse 160 → 128, /referenzen 560 → 224 (Akkordeon), /ueber-uns 120 → 168, /kontakt 160 → 224 (Hauptknopf), /standorte/wetzlar 168 → 232 (Hauptknopf), /blog 160 → 168.

Die Werte über 200 ms streuten zwischen den Ständen. Deshalb gab es eine Nachmessung mit 7 Läufen je Handlung, im Wechsel V N V N, Median über 14 Läufe je Stand:

| Seite · Handlung | vorher | nachher | nachher Spanne |
|---|---|---|---|
| /referenzen · Akkordeon (Galerie aufklappen) | 496 | **192** | 168 bis 256 |
| /referenzen · Hauptknopf | 148 | 112 | 80 bis 192 |
| /kontakt · Hauptknopf | 152 | 136 | 72 bis 232 |
| /standorte/wetzlar · Hauptknopf | 156 | 160 | 96 bis 280 |
| /bad/badsanierung · Hauptknopf | 136 | 140 | 88 bis 208 |

- **R-1 erledigt, knapp:** /referenzen beim Aufklappen 192 ms (Rundenmediane 176 und 200). Welle 1 maß auf 13315fa8 384 ms, diese Kette auf demselben Stand 496 bis 560 ms.
- Die Hauptknöpfe auf /kontakt und /standorte/wetzlar liegen im Median unter 200 ms. Die Werte über 200 ms im Hauptlauf sind Streuung des Ankersprungs.
