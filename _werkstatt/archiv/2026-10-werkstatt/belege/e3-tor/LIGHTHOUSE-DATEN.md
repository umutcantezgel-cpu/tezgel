# LIGHTHOUSE-DATEN · E3-Tor (E3-PRUEF-L)

Messung: Werkzeug `lighthouse.mjs --satz e3-tor --hauptansichten --formen mobil,desktop --laeufe 3 --base http://127.0.0.1:4310` · 12 Hauptansichten × mobil/desktop · Aufwärmlauf, Median aus 3 Läufen, Spanne [min–max] · Benchmark-Referenz 1426.5 (Band ±15 %: 1212.5–1640.5). Rohdaten: `lighthouse/lighthouse.json` (Kopie), Reports `_werkstatt/cache/lighthouse/e3-tor/*.report.json`. Vorlast vor Start: 1-Min-Mittel 0,05 (4 Kerne); Last während Lauf bis ca. 2.

## 1. Median und Spanne je Ansicht × Form

| Ansicht | Form | Leistung [Spanne] | LCP ms [Spanne] | CLS [Spanne] | TBT ms [Spanne] | LCP-Element | im Benchmark-Band |
|---|---|---|---|---|---|---|---|
| / | mobil | 92 [92–94] | 3338 [2860–3365] | 0 [0–0.019] | 90 [78–117] | `div.mx-auto > div.relative > div.mt-8 > p.max-w-mass` | ja |
| / | desktop | 100 [100–100] | 696 [670–704] | 0.001 [0.001–0.001] | 0 [0–1] | `div.mx-auto > div.relative > div.mt-8 > p.max-w-mass` | ja |
| /bad | mobil | 93 [90–93] | 2488 [2487–2488] | 0 [0–0] | 243 [236–333] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /bad | desktop | 96 [96–96] | 667 [532–669] | 0.121 [0.121–0.121] | 0 [0–0] | `div.grid > div.col-span-4 > h1.text-tinte > span.block` | ja |
| /leistungen | mobil | 83 [80–90] | 2713 [2711–2911] | 0 [0–0.179] | 356 [275–481] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /leistungen | desktop | 100 [100–100] | 582 [575–650] | 0.001 [0.001–0.001] | 0 [0–0] | `div.grid > div.col-span-4 > h1.text-tinte > span.block` | ja |
| /leistungen/bad | mobil | 89 [85–90] | 2994 [2560–2995] | 0 [0–0] | 311 [288–385] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /leistungen/bad | desktop | 100 [100–100] | 536 [530–648] | 0.001 [0.001–0.001] | 0 [0–8] | `div.grid > div.col-span-4 > h1.text-tinte > span.block` | ja |
| /standorte | mobil | 94 [89–95] | 2564 [2563–3205] | 0 [0–0] | 191 [156–242] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /standorte | desktop | 100 [100–100] | 692 [536–699] | 0.001 [0.001–0.001] | 0 [0–3] | `div.grid > div.col-span-4 > h1.text-tinte > span.block` | ja |
| /standorte/wetzlar | mobil | 96 [93–96] | 2416 [2412–2619] | 0 [0–0.016] | 157 [153–206] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /standorte/wetzlar | desktop | 100 [100–100] | 531 [442–700] | 0.001 [0–0.001] | 10 [3–10] | `div.grid > div.col-span-4 > h1.text-tinte > span.block` | ja |
| /fliesen | mobil | 83 [83–84] | 2716 [2713–3149] | 0 [0–0] | 500 [414–533] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /fliesen | desktop | 100 [100–100] | 578 [554–730] | 0.001 [0.001–0.001] | 8 [0–18] | `div.grid > div.col-span-4 > h1.text-tinte > span.block` | ja |
| /ueber-uns | mobil | 95 [90–96] | 2617 [2601–3164] | 0 [0–0] | 152 [100–214] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /ueber-uns | desktop | 100 [100–100] | 649 [566–653] | 0.001 [0.001–0.001] | 0 [0–3] | `div.grid > div.col-span-4 > h1.text-tinte > span.block` | ja |
| /kontakt | mobil | 91 [88–95] | 2716 [2411–2834] | 0 [0–0] | 234 [188–370] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /kontakt | desktop | 100 [100–100] | 565 [563–607] | 0.001 [0.001–0.001] | 1 [0–6] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /fliesen/konfigurator | mobil | 97 [97–97] | 2488 [2486–2493] | 0 [0–0] | 114 [78–118] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /fliesen/konfigurator | desktop | 100 [100–100] | 592 [572–701] | 0.001 [0.001–0.001] | 3 [0–5] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /blog | mobil | 83 [78–89] | 3289 [2476–3309] | 0 [0–0] | 388 [355–570] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /blog | desktop | 100 [100–100] | 730 [662–767] | 0.001 [0.001–0.001] | 11 [7–25] | `div.mb-12 > a.group > div.relative > img.object-cover` | ja |
| /blog/rutschfeste-fliesen-r-klassen | mobil | 89 [84–91] | 3067 [3065–3196] | 0 [0–0] | 258 [207–376] | `div.mx-auto > div.grid > div.col-span-4 > p.max-w-mass` | ja |
| /blog/rutschfeste-fliesen-r-klassen | desktop | 100 [100–100] | 672 [662–710] | 0.001 [0.001–0.001] | 0 [0–5] | `div.mx-auto > div.grid > div.col-span-4 > p.max-w-mass` | ja |

## 2. Vergleich gegen E0 (745335f, je Median; Spanne der drei E0-Läufe)

| Ansicht | Form | Leistung E3 (E0) | Δ Leistung | Leistung außerhalb E0-Spanne | LCP E3 (E0) | Δ LCP ms | LCP außerhalb E0-Spanne | TBT E3 (E0) | Δ TBT ms | TBT außerhalb E0-Spanne | CLS E3 (E0) | Δ CLS | CLS außerhalb E0-Spanne |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| / | mobil | 92 (76) | +16 | ja (über) [E0 76–77] | 3338 (4112) | -774 | ja (unter) [E0 3494–4260] | 90 (415) | -325 | ja (unter) [E0 373–593] | 0 (0) | +0 | nein [E0 0–0] |
| / | desktop | 100 (100) | +0 | nein [E0 99–100] | 696 (815) | -119 | ja (unter) [E0 796–827] | 0 (34) | -34 | ja (unter) [E0 14–47] | 0.001 (0) | +0.001 | ja (über) [E0 0–0] |
| /bad | mobil | 93 (84) | +9 | ja (über) [E0 83–85] | 2488 (3648) | -1160 | ja (unter) [E0 3359–3923] | 243 (259) | -16 | nein [E0 240–354] | 0 (0) | +0 | nein [E0 0–0] |
| /bad | desktop | 96 (100) | -4 | ja (unter) [E0 100–100] | 667 (777) | -110 | ja (unter) [E0 769–777] | 0 (27) | -27 | ja (unter) [E0 12–32] | 0.121 (0) | +0.121 | ja (über) [E0 0–0] |
| /leistungen | mobil | 83 (85) | -2 | ja (unter) [E0 84–86] | 2713 (3670) | -957 | ja (unter) [E0 3651–3683] | 356 (252) | +104 | ja (über) [E0 223–267] | 0 (0) | +0 | nein [E0 0–0] |
| /leistungen | desktop | 100 (100) | +0 | nein [E0 99–100] | 582 (760) | -178 | ja (unter) [E0 649–780] | 0 (22) | -22 | ja (unter) [E0 11–86] | 0.001 (0) | +0.001 | ja (über) [E0 0–0] |
| /leistungen/bad | mobil | 89 (85) | +4 | ja (über) [E0 84–87] | 2994 (3665) | -671 | ja (unter) [E0 3657–3709] | 311 (259) | +52 | ja (über) [E0 169–274] | 0 (0) | +0 | nein [E0 0–0] |
| /leistungen/bad | desktop | 100 (100) | +0 | nein [E0 100–100] | 536 (758) | -222 | ja (unter) [E0 749–767] | 0 (14) | -14 | ja (unter) [E0 14–17] | 0.001 (0) | +0.001 | ja (über) [E0 0–0] |
| /standorte | mobil | 94 (57) | +37 | ja (über) [E0 48–64] | 2564 (3833) | -1269 | ja (unter) [E0 3794–3870] | 191 (427) | -236 | ja (unter) [E0 198–774] | 0 (0.516) | -0.516 | ja (unter) [E0 0.516–0.516] |
| /standorte | desktop | 100 (83) | +17 | nein [E0 83–100] | 692 (779) | -87 | ja (unter) [E0 757–823] | 0 (20) | -20 | ja (unter) [E0 20–25] | 0.001 (0.338) | -0.337 | nein [E0 0–0.338] |
| /standorte/wetzlar | mobil | 96 (76) | +20 | ja (über) [E0 74–76] | 2416 (4985) | -2569 | ja (unter) [E0 4859–5020] | 157 (305) | -148 | ja (unter) [E0 289–331] | 0 (0) | +0 | nein [E0 0–0] |
| /standorte/wetzlar | desktop | 100 (100) | +0 | nein [E0 100–100] | 531 (715) | -184 | ja (unter) [E0 700–770] | 10 (17) | -7 | ja (unter) [E0 14–22] | 0.001 (0) | +0.001 | ja (über) [E0 0–0] |
| /fliesen | mobil | 83 (82) | +1 | nein [E0 81–88] | 2716 (3785) | -1069 | ja (unter) [E0 3335–4181] | 500 (267) | +233 | ja (über) [E0 215–315] | 0 (0) | +0 | nein [E0 0–0] |
| /fliesen | desktop | 100 (100) | +0 | nein [E0 100–100] | 578 (795) | -217 | ja (unter) [E0 782–806] | 8 (19) | -11 | ja (unter) [E0 16–43] | 0.001 (0) | +0.001 | ja (über) [E0 0–0] |
| /ueber-uns | mobil | 95 (86) | +9 | ja (über) [E0 83–87] | 2617 (3639) | -1022 | ja (unter) [E0 3633–3918] | 152 (236) | -84 | ja (unter) [E0 207–258] | 0 (0) | +0 | nein [E0 0–0] |
| /ueber-uns | desktop | 100 (100) | +0 | nein [E0 100–100] | 649 (743) | -94 | ja (unter) [E0 738–764] | 0 (13) | -13 | ja (unter) [E0 12–28] | 0.001 (0) | +0.001 | ja (über) [E0 0–0] |
| /kontakt | mobil | 91 (75) | +16 | ja (über) [E0 75–76] | 2716 (4849) | -2133 | ja (unter) [E0 4836–4871] | 234 (326) | -92 | ja (unter) [E0 305–337] | 0 (0) | +0 | nein [E0 0–0] |
| /kontakt | desktop | 100 (96) | +4 | ja (über) [E0 96–96] | 565 (1408) | -843 | ja (unter) [E0 1395–1436] | 1 (18) | -17 | ja (unter) [E0 13–25] | 0.001 (0) | +0.001 | ja (über) [E0 0–0] |
| /fliesen/konfigurator | mobil | 97 (74) | +23 | ja (über) [E0 72–77] | 2488 (5371) | -2883 | ja (unter) [E0 5207–5429] | 114 (291) | -177 | ja (unter) [E0 216–367] | 0 (0) | +0 | nein [E0 0–0] |
| /fliesen/konfigurator | desktop | 100 (100) | +0 | nein [E0 100–100] | 592 (716) | -124 | ja (unter) [E0 676–765] | 3 (18) | -15 | ja (unter) [E0 9–27] | 0.001 (0) | +0.001 | ja (über) [E0 0–0] |
| /blog | mobil | 83 (66) | +17 | ja (über) [E0 65–68] | 3289 (6608) | -3319 | ja (unter) [E0 6553–6635] | 388 (437) | -49 | ja (unter) [E0 392–470] | 0 (0) | +0 | nein [E0 0–0] |
| /blog | desktop | 100 (100) | +0 | nein [E0 100–100] | 730 (720) | +10 | nein [E0 704–745] | 11 (11) | +0 | nein [E0 7–14] | 0.001 (0) | +0.001 | ja (über) [E0 0–0] |
| /blog/rutschfeste-fliesen-r-klassen | mobil | 89 (65) | +24 | ja (über) [E0 65–68] | 3067 (6435) | -3368 | ja (unter) [E0 6326–6505] | 258 (475) | -217 | ja (unter) [E0 378–492] | 0 (0) | +0 | nein [E0 0–0] |
| /blog/rutschfeste-fliesen-r-klassen | desktop | 100 (100) | +0 | nein [E0 100–100] | 672 (787) | -115 | ja (unter) [E0 753–789] | 0 (17) | -17 | ja (unter) [E0 16–27] | 0.001 (0) | +0.001 | ja (über) [E0 0–0] |

## 3. Budgets mobil (Median)

| Ansicht | LCP ≤ 2500 | CLS ≤ 0,1 | TBT ≤ 200 | Leistung ≥ 90 |
|---|---|---|---|---|
| / | 3338 verfehlt | 0 erfüllt | 90 erfüllt | 92 erfüllt |
| /bad | 2488 erfüllt | 0 erfüllt | 243 verfehlt | 93 erfüllt |
| /leistungen | 2713 verfehlt | 0 erfüllt | 356 verfehlt | 83 verfehlt |
| /leistungen/bad | 2994 verfehlt | 0 erfüllt | 311 verfehlt | 89 verfehlt |
| /standorte | 2564 verfehlt | 0 erfüllt | 191 erfüllt | 94 erfüllt |
| /standorte/wetzlar | 2416 erfüllt | 0 erfüllt | 157 erfüllt | 96 erfüllt |
| /fliesen | 2716 verfehlt | 0 erfüllt | 500 verfehlt | 83 verfehlt |
| /ueber-uns | 2617 verfehlt | 0 erfüllt | 152 erfüllt | 95 erfüllt |
| /kontakt | 2716 verfehlt | 0 erfüllt | 234 verfehlt | 91 erfüllt |
| /fliesen/konfigurator | 2488 erfüllt | 0 erfüllt | 114 erfüllt | 97 erfüllt |
| /blog | 3289 verfehlt | 0 erfüllt | 388 verfehlt | 83 verfehlt |
| /blog/rutschfeste-fliesen-r-klassen | 3067 verfehlt | 0 erfüllt | 258 verfehlt | 89 verfehlt |

## 4. Vergleich gegen E2-Tor-3 (/ und /kontakt, Median)

| Ansicht | Form | Leistung E2→E3 | LCP ms E2→E3 (Δ) | CLS E2→E3 | TBT ms E2→E3 (Δ) |
|---|---|---|---|---|---|
| / | mobil | 77 → 92 | 2867 → 3338 (+471) | 0.001 → 0 | 779 → 90 (-689) |
| / | desktop | 100 → 100 | 622 → 696 (+74) | 0.002 → 0.001 | 36 → 0 (-36) |
| /kontakt | mobil | 90 → 91 | 2714 → 2716 (+2) | 0 → 0 | 294 → 234 (-60) |
| /kontakt | desktop | 100 → 100 | 607 → 565 (-42) | 0.001 → 0.001 | 3 → 1 (-2) |

## 5. Hauptthread / für / mobil (mainthread-work-breakdown, Median aus 3 Rohberichten)

| Gruppe | E2 Median [Läufe] ms | E3 Median [Läufe] ms | Δ ms |
|---|---|---|---|
| Style & Layout | 1608 [1584, 1608, 2375] | 831 [831, 896, 829] | -777 |
| Script Evaluation | 901 [889, 901, 992] | 960 [960, 1041, 919] | +59 |

## 6. Hinweise

- Alle 24 Blöcke: keine Abweichung vom Benchmark-Band (Flag benchmark_abweichung nicht gesetzt); alle 72 Läufe innerhalb 1212,5–1640,5 nachgerechnet.
- LCP-Element stets im Einstiegs- bzw. Kopftext (`p.max-w-mass`) bzw. H1 auf Desktop; /blog Desktop: Bild `img.object-cover`.
- Ausreißer in Einzelläufen (nicht Median): /leistungen mobil CLS 0,179 in Lauf 1; /bad desktop CLS 0,121 in allen drei Läufen.
