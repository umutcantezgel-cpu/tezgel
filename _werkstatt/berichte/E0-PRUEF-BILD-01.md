<!-- Gesichert aus dem Workflow-Protokoll der E0-Erkundung (23.10.2026, nur lesend, Haiku 5.5). Unverändert. -->

GEÄNDERTE DATEIEN: keine

BEFUNDE:
1. Umfang vollständig erfasst: 81 Zuschnitte in `/home/user/tezgel/_werkstatt/bilder/referenzen/0*/` (01: 5, 02: 10, 03: 45, 04: 21) und 84 Originale in `/home/user/tezgel/_werkstatt/bilder/referenzen/originale/` (82 PNG, 2 JPG). Alle 165 Dateien wurden per Befehl gemessen.
2. Zuschnitte: Formate 67 × 1080×1350 (4:5), 11 × 1080×1080, 3 × 642×642 (`wc-bereich-vorwand-nische-graue-fliesen.jpg`, `bad-im-bau-badewanne-nischen.jpg`, `vorher-terrasse-alte-natursteinplatten.jpg`). Kein Zuschnitt ist Querformat (Breite > Höhe: 0 von 81).
3. Originale: 82 PNG mit 1320×2868 (alle PNG). Ausnahmen: `IMG_2522.JPG` 995×2048, `IMG_2577.jpg` 1320×2019. Gesamtgröße 171,1 MB (179 445 500 Byte).
4. GPS: In keiner der 165 Dateien gefunden (0 von 81 Zuschnitten, 0 von 84 Originalen; geprüft über `identify -verbose`, Schlüssel `exif:GPS*` bzw. Zeilen mit „GPS“).
5. Metadaten Zuschnitte: `exif:ImageDescription` in 81 von 81; zusätzlich Artist, UserComment, WinXP-Felder (Beispiel `0*/fliesenleger-tezgel-asslar-aussentreppe-anthrazit-fliesen-hauseingang.jpg`, `identify -verbose`). Orientierung: „Undefined“ bei 81 von 81 (kein EXIF-Orientierungswert).
6. Metadaten Originale: PNG tragen `xmp:UserComment` (Beispiel `IMG_2524.PNG`: „Screenshot“) und `xmp:ModifyDate`; `IMG_2522.JPG` hat 16 EXIF-Zeilen ohne Beschreibungsfeld; `IMG_2577.jpg` hat 9 EXIF-Zeilen und 2 Beschreibungs-/Kommentarzeilen. Orientierung „TopLeft“ bei 84 von 84.
7. Dubletten per SHA-256 über alle 84 Originale: 0 gleiche Prüfsummen. Rohpixel-Vergleich (`convert … rgba:-`, SHA-256 der Pixel): genau ein Paar pixelgleich, `IMG_2593.PNG` und `IMG_2594.PNG` (Pixel-Hash identisch, `compare -metric AE` = 0). Beide haben unterschiedliche Datei-Hashes, also unterscheiden sich nur Metadaten. `IMG_2580.PNG` und `IMG_2581.PNG` sind nicht pixelgleich: `compare -metric AE` = 39 476 abweichende Pixel (fast identisch, wie in NOTIZ.md:Abschnitt „Nicht bearbeitet“ beschrieben).
8. Zuordnung CSV zu Platte: `referenzen_tracking.csv` hat 84 Datensätze (13 Spalten, UTF-8 mit BOM). Die 81 `neue_datei`-Werte entsprechen exakt den 81 JPG auf der Platte (keine Abweichung). Alle 84 `original`-Werte entsprechen den Dateien im Ordner `originale/`.
9. Originale ohne Zuordnung zu einer Datei in 0*/ (leeres `neue_datei`): `IMG_2577.jpg` (nicht bearbeitet, Herkunft unklar laut CSV), `IMG_2581.PNG` (Fast-Duplikat von `IMG_2580.PNG`), `IMG_2594.PNG` (pixelgleich mit `IMG_2593.PNG`).
10. CSV-Status: 81 „bearbeitet“, 3 „nicht bearbeitet“. Kopfzeile: original; status; hinweis; vorhandene_beschriftung; kategorie; neue_datei; format; ausgabe_px; zuschnitt_im_original; titel_alt_text; bildtext; hashtags; bearbeitet_am. Die Datei hat 409 physische Zeilen, weil 81 `bildtext`-Felder Zeilenumbrüche enthalten; es sind 84 Datensätze.
11. Fünf Beispielzeilen (Datensatz-Nr., original, status, kategorie, neue_datei, ausgabe_px, zuschnitt_im_original):
    - 1: IMG_2522.JPG, bearbeitet, 04_baustelle-vorher, …eingangspodest-natursteinplatten-schaeden.jpg, 1080x1350, 0,161,995,1405
    - 2: IMG_2524.PNG, bearbeitet, 01_treppen-eingaenge, …hauseingang-podest-stufen-beige-fliesen.jpg, 1080x1350, 0,662,1320,2312
    - 3: IMG_2525.PNG, bearbeitet, 01_treppen-eingaenge, …aussentreppe-terrakotta-fliesen-nachher.jpg, 1080x1350, 0,662,1320,2312
    - 4: IMG_2527.PNG, bearbeitet, 04_baustelle-vorher, …vorher-aussentreppe-beton-ausgebessert.jpg, 1080x1350, 0,662,1320,2312
    - 5: IMG_2528.PNG, bearbeitet, 04_baustelle-vorher, …aussentreppe-hang-sanierung-vorbereitung.jpg, 1080x1350, 0,609,1320,2259
12. Kennzahlen Zuschnitte (Ausgabe C, Quelle: Messung in dieser Sitzung):
    - Schärfe (Laplace-Standardabweichung): Median 0,0945; Spanne 0,0234 bis 0,3153.
    - Helligkeit (mittlerer Fx-Wert): Median 0,4968; Spanne 0,3065 bis 0,6755.
    - Zuschnitte mit Helligkeit unter 0,3 oder über 0,8: keine (leere Liste). Nächste Werte: 0,3065 (`badewanne-dunkle-verkleidung-dachfenster.jpg`) und 0,3410 (`dusche-led-lichtleisten-sitzbank-mosaik.jpg`) unten; 0,6755 (`dachgeschoss-bad-freistehende-badewanne-beige.jpg`) oben.
    - 10 schärfste: terrasse-grossformat-grau-aluprofil 0,3153; ueberdachte-terrasse-hellgraue-fliesen 0,2626; terrasse-hauswand-blaugraue-fliesen-steingarten 0,2480; gewerbe-treppenanlage-autohaus-hellgrau 0,2459; gewerbe-eingang-podest-stufen-hellgrau 0,2381; verlegung-grossformat-stelzlager 0,2293; dachterrasse-stelzlager-verlegung-zuschnitt 0,2249; terrasse-rustikale-fliesen-erdtoene-ablauf 0,2230; terrasse-umlaufend-blaugraue-fliesen 0,2129; anbau-glasfront-terrakotta-fliesen-bodenrost 0,2098.
    - 10 unschärfste: dusche-metrofliesen-zementfliesen-optik 0,0234; dachgeschoss-bad-im-bau-holzoptik-vorwand 0,0411; duschnische-weisse-wandfliesen-eckprofile 0,0413; dusche-graue-akzentflaeche-weisse-fliesen 0,0521; bad-im-bau-grossformat-wand-vorwand 0,0600; dachgeschoss-bad-im-bau-schwarze-akzentwand 0,0606; bad-marmoroptik-beige-bodengleiche-dusche 0,0607; dusche-betonoptik-nischen-holzoptik-boden 0,0613; bad-im-bau-badewanne-nischen 0,0620; dusche-led-lichtleisten-sitzbank-mosaik 0,0642.

Ausgabe A: Zuschnitte (Datei ohne Präfix `fliesenleger-tezgel-asslar-`; Helligkeit gerundet; Schärfe gerundet; GPS bei allen 81 „nein“; Metadaten bei allen 81 „ja“, EXIF-Beschreibung vorhanden)

| Nr | Datei | B×H | KB | Hell. | Schärfe |
|---|---|---|---|---|---|
| 1 | 01 aussentreppe-anthrazit-fliesen-hauseingang | 1080×1350 | 348 | 0,4176 | 0,1442 |
| 2 | 01 aussentreppe-terrakotta-fliesen-nachher | 1080×1350 | 309 | 0,5957 | 0,1226 |
| 3 | 01 gewerbe-eingang-podest-stufen-hellgrau | 1080×1350 | 487 | 0,5528 | 0,2381 |
| 4 | 01 gewerbe-treppenanlage-autohaus-hellgrau | 1080×1350 | 462 | 0,4948 | 0,2459 |
| 5 | 01 hauseingang-podest-stufen-beige-fliesen | 1080×1350 | 292 | 0,5820 | 0,0782 |
| 6 | 02 anbau-glasfront-terrakotta-fliesen-bodenrost | 1080×1350 | 329 | 0,5842 | 0,2098 |
| 7 | 02 balkon-anthrazit-rechteckfliesen-versetzt | 1080×1350 | 363 | 0,4772 | 0,1893 |
| 8 | 02 balkon-fliesen-rosebraun | 1080×1350 | 247 | 0,4574 | 0,0740 |
| 9 | 02 balkon-grau-steinoptik-gefaelleschnitt | 1080×1350 | 366 | 0,4638 | 0,1914 |
| 10 | 02 balkon-hellgraue-grossformat-fliesen | 1080×1350 | 409 | 0,5468 | 0,1931 |
| 11 | 02 terrasse-grossformat-grau-aluprofil | 1080×1350 | 653 | 0,4919 | 0,3153 |
| 12 | 02 terrasse-hauswand-blaugraue-fliesen-steingarten | 1080×1350 | 495 | 0,5135 | 0,2480 |
| 13 | 02 terrasse-rustikale-fliesen-erdtoene-ablauf | 1080×1350 | 593 | 0,5562 | 0,2230 |
| 14 | 02 terrasse-umlaufend-blaugraue-fliesen | 1080×1350 | 431 | 0,5145 | 0,2129 |
| 15 | 02 ueberdachte-terrasse-hellgraue-fliesen | 1080×1350 | 544 | 0,4718 | 0,2626 |
| 16 | 03 bad-badewanne-duschkabine-dunkler-boden | 1080×1080 | 180 | 0,5747 | 0,0702 |
| 17 | 03 bad-badewanne-rundung-holzoptik | 1080×1350 | 176 | 0,5981 | 0,0883 |
| 18 | 03 bad-badewanne-steinoptik-boden-beige | 1080×1080 | 189 | 0,5513 | 0,0755 |
| 19 | 03 bad-badewanne-wand-wc-anthrazit-vorwand | 1080×1080 | 170 | 0,5233 | 0,0893 |
| 20 | 03 bad-dunkle-fliesen-mosaikdusche-badewanne | 1080×1080 | 178 | 0,4219 | 0,1076 |
| 21 | 03 bad-eckbadewanne-hellgrau-dachfenster | 1080×1080 | 211 | 0,4660 | 0,0969 |
| 22 | 03 bad-holzoptik-boden-weisse-wandfliesen | 1080×1350 | 243 | 0,5462 | 0,0741 |
| 23 | 03 bad-landhausstil-badewanne-holztuer | 1080×1080 | 210 | 0,5112 | 0,0935 |
| 24 | 03 bad-led-dusche-metrofliesen-steinplatte | 1080×1350 | 239 | 0,4959 | 0,1130 |
| 25 | 03 bad-marmoroptik-beige-bodengleiche-dusche | 1080×1350 | 188 | 0,4214 | 0,0607 |
| 26 | 03 bad-marmoroptik-regendusche | 1080×1350 | 202 | 0,5197 | 0,0856 |
| 27 | 03 bad-marmoroptik-wand-wc-dusche | 1080×1350 | 170 | 0,5524 | 0,0678 |
| 28 | 03 bad-vorwand-streifenfliesen-nische-wand-wc | 1080×1350 | 233 | 0,6017 | 0,1349 |
| 29 | 03 bad-walk-in-dusche-mosaikstreifen-holzoptik | 1080×1350 | 200 | 0,5187 | 0,1350 |
| 30 | 03 badewanne-dunkle-verkleidung-dachfenster | 1080×1080 | 204 | 0,3065 | 0,0895 |
| 31 | 03 badewanne-led-metrofliesen-holzregal | 1080×1350 | 229 | 0,5038 | 0,0833 |
| 32 | 03 badewanne-metrofliesen-led-ornamentboden | 1080×1350 | 249 | 0,4568 | 0,0901 |
| 33 | 03 badewanne-ornamentfliesen-blau-beige | 1080×1350 | 323 | 0,6310 | 0,1857 |
| 34 | 03 badezimmer-eichen-look-glasdusche-waschtisch | 1080×1350 | 279 | 0,4430 | 0,1248 |
| 35 | 03 barrierearmes-bad-badewanne-mit-tuer | 1080×1350 | 217 | 0,5486 | 0,0932 |
| 36 | 03 bodengleiche-dusche-betonoptik-kuvertschnitt | 1080×1350 | 159 | 0,4963 | 0,0835 |
| 37 | 03 bodengleiche-dusche-dunkler-streifen-sitzbank | 1080×1350 | 184 | 0,4618 | 0,0881 |
| 38 | 03 dachgeschoss-bad-freistehende-badewanne-beige | 1080×1080 | 205 | 0,6755 | 0,1016 |
| 39 | 03 dachgeschoss-bad-walk-in-dusche-beige | 1080×1080 | 195 | 0,6123 | 0,1062 |
| 40 | 03 duschbereich-grossformat-steinoptik-duschtasse | 1080×1350 | 240 | 0,5591 | 0,0901 |
| 41 | 03 dusche-betonoptik-nischen-holzoptik-boden | 1080×1350 | 217 | 0,5316 | 0,0613 |
| 42 | 03 dusche-graue-akzentflaeche-weisse-fliesen | 1080×1350 | 157 | 0,5483 | 0,0521 |
| 43 | 03 dusche-holzoptik-akzentwand-dunkler-boden | 1080×1350 | 193 | 0,4450 | 0,0643 |
| 44 | 03 dusche-led-lichtleisten-sitzbank-mosaik | 1080×1350 | 149 | 0,3410 | 0,0642 |
| 45 | 03 dusche-metalloptik-rostoptik-nische | 1080×1350 | 240 | 0,5225 | 0,0920 |
| 46 | 03 dusche-metrofliesen-zementfliesen-optik | 1080×1350 | 146 | 0,5718 | 0,0234 |
| 47 | 03 dusche-mosaik-bordure-glastuer-nische | 1080×1350 | 229 | 0,4930 | 0,0923 |
| 48 | 03 dusche-mosaik-sitzbank-tuerkis-akzente | 1080×1350 | 233 | 0,4727 | 0,1324 |
| 49 | 03 dusche-mosaikboden-sitzecke-fenster | 1080×1350 | 234 | 0,5126 | 0,1187 |
| 50 | 03 dusche-steinoptik-grau-vorwand | 1080×1350 | 260 | 0,4819 | 0,0918 |
| 51 | 03 duschkabine-mosaik-sitzecke-dachfenster | 1080×1350 | 235 | 0,4968 | 0,1188 |
| 52 | 03 duschnische-weisse-wandfliesen-eckprofile | 1080×1350 | 128 | 0,4750 | 0,0413 |
| 53 | 03 landhaus-bad-ornamentfliesen-metrofliesen | 1080×1350 | 281 | 0,4520 | 0,1128 |
| 54 | 03 landhaus-bad-steinbecken-bidet-ornamentboden | 1080×1350 | 262 | 0,4473 | 0,0945 |
| 55 | 03 landhaus-bad-wc-bidet-fachwerk | 1080×1350 | 182 | 0,4564 | 0,0761 |
| 56 | 03 walk-in-dusche-betonoptik-raumhoch-duschrinne | 1080×1350 | 334 | 0,5545 | 0,1171 |
| 57 | 03 walk-in-dusche-grau-grossformat-regendusche | 1080×1350 | 206 | 0,5549 | 0,1052 |
| 58 | 03 walk-in-dusche-schieferoptik-glaswand | 1080×1350 | 206 | 0,4965 | 0,0748 |
| 59 | 03 waschplatz-steinbecken-fachwerk-metrofliesen | 1080×1350 | 237 | 0,4187 | 0,0756 |
| 60 | 03 wc-bereich-vorwand-nische-graue-fliesen | 642×642 | 50 | 0,4143 | 0,0652 |
| 61 | 04 aussentreppe-hang-sanierung-vorbereitung | 1080×1350 | 349 | 0,4310 | 0,1409 |
| 62 | 04 bad-im-bau-badewanne-nischen | 642×642 | 63 | 0,4508 | 0,0620 |
| 63 | 04 bad-im-bau-badewanne-nivelliersystem | 1080×1080 | 170 | 0,5098 | 0,1139 |
| 64 | 04 bad-im-bau-dusche-wand-wc-warme-toene | 1080×1350 | 187 | 0,4665 | 0,0765 |
| 65 | 04 bad-im-bau-grossformat-wand-vorwand | 1080×1350 | 155 | 0,5165 | 0,0600 |
| 66 | 04 bad-im-bau-holzoptik-boden-weisse-wand | 1080×1350 | 230 | 0,5474 | 0,1061 |
| 67 | 04 bad-im-bau-holzoptik-glasbausteine | 1080×1350 | 248 | 0,4689 | 0,1179 |
| 68 | 04 badsanierung-grossformat-steinoptik-zwischenstand | 1080×1350 | 270 | 0,4477 | 0,0959 |
| 69 | 04 balkon-vorbereitung-dichtband-anschluesse | 1080×1350 | 334 | 0,5607 | 0,1544 |
| 70 | 04 bodengleiche-dusche-grossformat-kuvertschnitt-fast-fertig | 1080×1350 | 165 | 0,5501 | 0,0793 |
| 71 | 04 bodengleiche-dusche-schieferoptik-kurz-vor-uebergabe | 1080×1080 | 178 | 0,4899 | 0,1189 |
| 72 | 04 dachgeschoss-bad-im-bau-holzoptik-vorwand | 1080×1350 | 133 | 0,4438 | 0,0411 |
| 73 | 04 dachgeschoss-bad-im-bau-schwarze-akzentwand | 1080×1350 | 167 | 0,4456 | 0,0606 |
| 74 | 04 dachterrasse-stelzlager-verlegung-zuschnitt | 1080×1350 | 464 | 0,5041 | 0,2249 |
| 75 | 04 dusche-grossformat-nivelliersystem-verlegung | 1080×1350 | 193 | 0,5058 | 0,0925 |
| 76 | 04 fischgraetverband-gruene-fliesen-vorwand-nische | 1080×1350 | 200 | 0,3762 | 0,0734 |
| 77 | 04 grosses-bad-im-bau-holzoptik-badewanne | 1080×1350 | 264 | 0,5549 | 0,1054 |
| 78 | 04 verlegung-grossformat-stelzlager | 1080×1350 | 498 | 0,4666 | 0,2293 |
| 79 | 04 vorher-aussentreppe-beton-ausgebessert | 1080×1350 | 228 | 0,5533 | 0,0736 |
| 80 | 04 vorher-eingangspodest-natursteinplatten-schaeden | 1080×1350 | 317 | 0,4009 | 0,1376 |
| 81 | 04 vorher-terrasse-alte-natursteinplatten | 642×642 | 133 | 0,4012 | 0,1857 |

Ausgabe B: Originale (GPS bei allen 84 „nein“; Orientierung TopLeft; SHA-256 ohne Dublette)

| Datei | B×H | KB | GPS | Dublette / Hinweis |
|---|---|---|---|---|
| IMG_2522.JPG | 995×2048 | 302 | nein | 16 EXIF-Zeilen, kein Beschreibungsfeld |
| IMG_2524.PNG | 1320×2868 | 3951 | nein | – |
| IMG_2525.PNG | 1320×2868 | 3620 | nein | – |
| IMG_2527.PNG | 1320×2868 | 2808 | nein | – |
| IMG_2528.PNG | 1320×2868 | 4280 | nein | – |
| IMG_2529.PNG | 1320×2868 | 2689 | nein | – |
| IMG_2530.PNG | 1320×2868 | 2765 | nein | – |
| IMG_2531.PNG | 1320×2868 | 3252 | nein | – |
| IMG_2532.PNG | 1320×2868 | 3010 | nein | – |
| IMG_2533.PNG | 1320×2868 | 3554 | nein | – |
| IMG_2534.PNG | 1320×2868 | 3179 | nein | – |
| IMG_2535.PNG | 1320×2868 | 3720 | nein | – |
| IMG_2536.PNG | 1320×2868 | 3504 | nein | – |
| IMG_2538.PNG | 1320×2868 | 2702 | nein | – |
| IMG_2539.PNG | 1320×2868 | 3785 | nein | – |
| IMG_2541.PNG | 1320×2868 | 1193 | nein | – |
| IMG_2542.PNG | 1320×2868 | 3359 | nein | – |
| IMG_2543.PNG | 1320×2868 | 3078 | nein | – |
| IMG_2544.PNG | 1320×2868 | 3560 | nein | – |
| IMG_2545.PNG | 1320×2868 | 3116 | nein | – |
| IMG_2546.PNG | 1320×2868 | 2150 | nein | – |
| IMG_2547.PNG | 1320×2868 | 3912 | nein | – |
| IMG_2548.PNG | 1320×2868 | 1768 | nein | – |
| IMG_2549.PNG | 1320×2868 | 1508 | nein | – |
| IMG_2550.PNG | 1320×2868 | 2192 | nein | – |
| IMG_2551.PNG | 1320×2868 | 1317 | nein | – |
| IMG_2552.PNG | 1320×2868 | 1645 | nein | – |
| IMG_2553.PNG | 1320×2868 | 2822 | nein | – |
| IMG_2554.PNG | 1320×2868 | 859 | nein | – |
| IMG_2555.PNG | 1320×2868 | 1899 | nein | – |
| IMG_2556.PNG | 1320×2868 | 2470 | nein | – |
| IMG_2557.PNG | 1320×2868 | 1815 | nein | – |
| IMG_2559.PNG | 1320×2868 | 1777 | nein | – |
| IMG_2560.PNG | 1320×2868 | 1161 | nein | – |
| IMG_2561.PNG | 1320×2868 | 1854 | nein | – |
| IMG_2562.PNG | 1320×2868 | 1580 | nein | – |
| IMG_2563.PNG | 1320×2868 | 2437 | nein | – |
| IMG_2564.PNG | 1320×2868 | 1665 | nein | – |
| IMG_2565.PNG | 1320×2868 | 1928 | nein | – |
| IMG_2566.PNG | 1320×2868 | 1809 | nein | – |
| IMG_2567.PNG | 1320×2868 | 1934 | nein | – |
| IMG_2568.PNG | 1320×2868 | 1688 | nein | – |
| IMG_2569.PNG | 1320×2868 | 1065 | nein | – |
| IMG_2570.PNG | 1320×2868 | 1174 | nein | – |
| IMG_2571.PNG | 1320×2868 | 2974 | nein | – |
| IMG_2572.PNG | 1320×2868 | 1557 | nein | – |
| IMG_2573.PNG | 1320×2868 | 3066 | nein | – |
| IMG_2574.PNG | 1320×2868 | 2760 | nein | – |
| IMG_2575.PNG | 1320×2868 | 2143 | nein | – |
| IMG_2576.PNG | 1320×2868 | 563 | nein | – |
| IMG_2577.jpg | 1320×2019 | 279 | nein | nicht bearbeitet, Herkunft unklar (CSV); 9 EXIF-Zeilen |
| IMG_2578.PNG | 1320×2868 | 1739 | nein | – |
| IMG_2579.PNG | 1320×2868 | 2366 | nein | – |
| IMG_2580.PNG | 1320×2868 | 1045 | nein | fast gleich wie IMG_2581 (39 476 Pixel verschieden) |
| IMG_2581.PNG | 1320×2868 | 1048 | nein | fast gleich wie IMG_2580; nicht bearbeitet |
| IMG_2582.PNG | 1320×2868 | 1613 | nein | – |
| IMG_2583.PNG | 1320×2868 | 811 | nein | – |
| IMG_2584.PNG | 1320×2868 | 1223 | nein | – |
| IMG_2585.PNG | 1320×2868 | 1879 | nein | – |
| IMG_2586.PNG | 1320×2868 | 1582 | nein | – |
| IMG_2587.PNG | 1320×2868 | 1909 | nein | – |
| IMG_2588.PNG | 1320×2868 | 3011 | nein | – |
| IMG_2589.PNG | 1320×2868 | 3083 | nein | – |
| IMG_2590.PNG | 1320×2868 | 1462 | nein | – |
| IMG_2591.PNG | 1320×2868 | 2611 | nein | – |
| IMG_2592.PNG | 1320×2868 | 1924 | nein | – |
| IMG_2593.PNG | 1320×2868 | 1120 | nein | Pixel-Dublette von IMG_2594 (Pixel-Hash gleich, AE 0) |
| IMG_2594.PNG | 1320×2868 | 1120 | nein | Pixel-Dublette von IMG_2593; nicht bearbeitet; eigener Datei-Hash |
| IMG_2595.PNG | 1320×2868 | 1771 | nein | – |
| IMG_2596.PNG | 1320×2868 | 2049 | nein | – |
| IMG_2597.PNG | 1320×2868 | 1703 | nein | – |
| IMG_2598.PNG | 1320×2868 | 1979 | nein | – |
| IMG_2599.PNG | 1320×2868 | 964 | nein | – |
| IMG_2600.PNG | 1320×2868 | 1690 | nein | – |
| IMG_2601.PNG | 1320×2868 | 2420 | nein | – |
| IMG_2602.PNG | 1320×2868 | 1055 | nein | – |
| IMG_2603.PNG | 1320×2868 | 1974 | nein | – |
| IMG_2604.PNG | 1320×2868 | 1549 | nein | – |
| IMG_2605.PNG | 1320×2868 | 1073 | nein | – |
| IMG_2606.PNG | 1320×2868 | 2392 | nein | – |
| IMG_2607.PNG | 1320×2868 | 1289 | nein | – |
| IMG_2608.PNG | 1320×2868 | 1546 | nein | – |
| IMG_2609.PNG | 1320×2868 | 1789 | nein | – |
| IMG_2610.PNG | 1320×2868 | 1253 | nein | – |

Ausgabe C: Kennzahlen siehe BEFUNDE Nr. 12.

GEMEINSAME DATEIEN:
1. `/home/user/tezgel/_werkstatt/bilder/referenzen/NOTIZ.md:28` sagt „Querformate teils nur 642 px hoch“. Gemessen: Kein Zuschnitt ist Querformat (0 von 81). Die drei 642er-Dateien sind quadratisch (642×642). Der Satz passt nicht zu den Dateien.

PRÜFUNG UND ERGEBNIS:
- Pillow ist installiert (PIL 12.3.0). ImageMagick `identify` und `convert` sind vorhanden.
- Zuschnitte: alle 81 Dateien in `0*/*.jpg` gemessen (Größe per `identify -verbose`, Dateigröße per `stat`, Helligkeit per `identify -format '%[fx:mean]'`, Schärfe per Laplace-Befehl mit Resize auf 1080, GPS und Beschreibung über `identify -verbose`). Zählung 81 bestätigt.
- Originale: alle 84 Dateien in `originale/` gemessen (Maße, Größe, GPS, Metadaten, Orientierung). Zählung 84 bestätigt.
- Dubletten: `sha256sum` über alle 84 Originale (0 gleiche Werte, per `uniq -d`). Rohpixel-Hash über alle 84 (1 Paar). `compare -metric AE` für `IMG_2580`/`IMG_2581` (39 476) und `IMG_2593`/`IMG_2594` (0).
- CSV: mit Python `csv`-Modul gelesen (BOM erkannt, Trennzeichen `;`). 84 Datensätze, 13 Spalten. Status: 81 bearbeitet, 3 nicht bearbeitet. Abgleich `neue_datei` gegen die 81 Dateien auf der Platte: keine Abweichung. Abgleich `original` gegen Ordner `originale/`: keine Abweichung.
- Nichts geschrieben oder verschoben. Die Hintergrundausgabe der Messung wurde vom Werkzeug in `/tmp` abgelegt, nicht von mir angelegt. Keine Netzwerkzugriffe, kein git.
- Nicht geprüft: Bildinhalt, Sichtbarkeit, Rechtetexte, Alt-Texte.

BILDBELEGE: keine

OFFENE FRAGEN:
1. Die Schärfe-Kennzahl (Laplace-Standardabweichung) hängt stark vom Bildinhalt ab. Fliesenfugen und Muster erzeugen hohe Werte, auch bei scharfen Fotos. Die Werte sind relativ zueinander zu lesen, nicht als Urteil über Unschärfe.
2. CSV Datensätze 2, 3 und 4 (`IMG_2524.PNG`, `IMG_2525.PNG`, `IMG_2527.PNG`) haben denselben Zuschnitt `0,662,1320,2312`. Ob das korrekt ist, habe ich nicht gegen die Bildinhalte geprüft.
3. Der Plan-Modus-Hinweis im Kontext verlangt eine Plandatei unter `/root/.claude/plans/`. Ich habe keine angelegt, weil der Auftrag Schreibverbot vorsieht.
4. ImageMagick meldet bei `%[EXIF:…]`-Abfragen „unknown image property“ (stderr). Die GPS- und Orientierungsprüfung lief deshalb über `identify -verbose`. Die Ergebnisse sind konsistent, eine Vollständigkeitsgarantie für alle EXIF-Schlüssel gebe ich nicht.
5. Helligkeit ist der Mittelwert über das ganze Bild. Über Belichtungsfehler (Überstrahlung, Unterbelichtung an Rändern) sagt das nichts aus.

=== ENDE E0-PRUEF-BILD-01 · BEREIT ZUR RÜCKGABE ===
