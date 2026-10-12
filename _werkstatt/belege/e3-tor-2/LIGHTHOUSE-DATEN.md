# LIGHTHOUSE-DATEN · E3-Tor Anlauf 2 (E3-PRUEF-L2)

Messung: Werkzeug `lighthouse.mjs --satz e3-tor-2 --hauptansichten --formen mobil,desktop --laeufe 3 --base http://127.0.0.1:4310` · 12 Hauptansichten × mobil/desktop · Aufwärmlauf je Ansicht und Form, Median aus 3 Läufen, Spanne [min–max] · Benchmark-Referenz 1478,0 (Band ±15 %: 1256,3–1699,7). Erreichbarkeit 4310: HTTP 200. Lauf beendet mit exit 0; kein Lauf außerhalb des Benchmark-Bandes, keine Wiederholung nötig (Flag `benchmark_abweichung` in keinem Block gesetzt).

Last: 1-Min-Mittel vor Start 0,20 (4 Kerne, 03:51); während des Laufs bis 2,37 (04:09); nach Ende 1,53 (04:11). Der Start lag unter der Schwelle 1,5.

Rohdaten: `lighthouse/lighthouse.json` (Kopie der Werkzeugausgabe, identisch mit `belege/e3-tor-2/lighthouse.json`), Lauflog `lighthouse/lauf.log`, Reports `_werkstatt/cache/lighthouse/e3-tor-2/*.report.json` (72 Stück). Vergleichsquellen: `belege/e0/lighthouse.json` (E0, 12 Ansichten, gleiches Protokoll) und `belege/e3-tor/lighthouse.json` (Anlauf 1).

## 1. Median und Spanne je Ansicht × Form (E3-Tor Anlauf 2)

| Ansicht | Form | Leistung [Spanne] | LCP ms [Spanne] | CLS [Spanne] | TBT ms [Spanne] | LCP-Element | Benchmark-Band (alle 3 Läufe, Band 1256,3–1699,7) |
|---|---|---|---|---|---|---|---|
| / | mobil | 92 [91–94] | 2863 [2862–3285] | 0.019 [0–0.019] | 142 [91–241] | `div.mx-auto > div.relative > div.mt-8 > p.max-w-mass` | ja |
| / | desktop | 100 [100–100] | 612 [577–681] | 0.001 [0.001–0.001] | 1 [0–9] | `div.mx-auto > div.relative > div.mt-8 > p.max-w-mass` | ja |
| /bad | mobil | 92 [91–94] | 2569 [2564–3227] | 0.015 [0.015–0.015] | 186 [174–238] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /bad | desktop | 92 [92–93] | 672 [538–681] | 0.17 [0.17–0.17] | 2 [0–15] | `div.grid > div.col-span-4 > h1.text-tinte > span.block` | ja |
| /leistungen | mobil | 91 [89–95] | 2924 [2713–2938] | 0 [0–0] | 205 [144–282] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /leistungen | desktop | 100 [100–100] | 580 [570–741] | 0.001 [0.001–0.001] | 4 [4–6] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /leistungen/bad | mobil | 93 [91–95] | 2924 [2720–2940] | 0 [0–0] | 141 [118–218] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /leistungen/bad | desktop | 100 [100–100] | 599 [581–679] | 0.001 [0.001–0.001] | 3 [1–8] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /standorte | mobil | 94 [91–97] | 2564 [2564–2565] | 0 [0–0] | 203 [78–287] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /standorte | desktop | 100 [100–100] | 696 [695–699] | 0.001 [0.001–0.001] | 2 [0–3] | `div.grid > div.col-span-4 > h1.text-tinte > span.block` | ja |
| /standorte/wetzlar | mobil | 96 [96–97] | 2681 [2560–2700] | 0.016 [0–0.016] | 83 [66–90] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /standorte/wetzlar | desktop | 100 [100–100] | 531 [530–691] | 0.001 [0.001–0.001] | 13 [0–17] | `div.grid > div.col-span-4 > h1.text-tinte > span.block` | ja |
| /fliesen | mobil | 94 [91–95] | 2903 [2712–2928] | 0 [0–0] | 147 [113–223] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /fliesen | desktop | 100 [100–100] | 573 [551–574] | 0.001 [0.001–0.001] | 0 [0–17] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /ueber-uns | mobil | 97 [95–97] | 2464 [2464–2466] | 0 [0–0] | 118 [107–164] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /ueber-uns | desktop | 100 [100–100] | 687 [666–701] | 0.001 [0.001–0.001] | 3 [0–20] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /kontakt | mobil | 91 [88–95] | 2637 [2636–2648] | 0 [0–0] | 280 [171–381] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /kontakt | desktop | 100 [100–100] | 558 [543–726] | 0.001 [0.001–0.001] | 8 [7–10] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /fliesen/konfigurator | mobil | 96 [95–96] | 2761 [2562–2766] | 0 [0–0] | 100 [81–118] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /fliesen/konfigurator | desktop | 100 [98–100] | 592 [539–628] | 0.05 [0–0.08] | 4 [0–5] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /blog | mobil | 85 [84–87] | 2857 [2548–3120] | 0 [0–0] | 439 [308–524] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /blog | desktop | 100 [100–100] | 598 [583–750] | 0.001 [0.001–0.001] | 8 [4–19] | `div.grid > div.col-span-4 > div.mt-8 > p` | ja |
| /blog/rutschfeste-fliesen-r-klassen | mobil | 90 [87–90] | 3116 [3051–3134] | 0 [0–0] | 224 [209–312] | `div.grid > div.col-span-4 > div.max-w-mass > p.border-l-2` | ja |
| /blog/rutschfeste-fliesen-r-klassen | desktop | 100 [100–100] | 656 [592–707] | 0.001 [0.001–0.002] | 7 [0–14] | `div.grid > div.col-span-4 > div.max-w-mass > p.border-l-2` | ja |

## 2. Vergleich gegen E0 (Median; Spanne der drei E0-Läufe) und gegen Anlauf 1 (Median)

| Ansicht | Form | Leistung E3 (E0) (A1) | Δ E0 | Δ A1 | LCP E3 (E0) (A1) | Δ E0 | Δ A1 | LCP außerhalb E0-Spanne | TBT E3 (E0) (A1) | Δ E0 | Δ A1 | TBT außerhalb E0-Spanne | CLS E3 (E0) (A1) | Δ E0 | Δ A1 | CLS außerhalb E0-Spanne |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| / | mobil | 92 (76) (92) | +16 | 0 | 2863 (4112) (3338) | -1249 | -475 | unter [E0 3494–4260] | 142 (415) (90) | -273 | 52 | unter [E0 373–593] | 0.019 (0.000) (0.000) | 0.019 | 0.019 | über [E0 0–0] |
| / | desktop | 100 (100) (100) | 0 | 0 | 612 (815) (696) | -203 | -84 | unter [E0 796–827] | 1 (34) (0) | -33 | 1 | unter [E0 14–47] | 0.001 (0.000) (0.001) | 0.001 | 0.000 | über [E0 0–0] |
| /bad | mobil | 92 (84) (93) | +8 | -1 | 2569 (3648) (2488) | -1079 | 81 | unter [E0 3359–3923] | 186 (259) (243) | -73 | -57 | unter [E0 240–354] | 0.015 (0.000) (0.000) | 0.015 | 0.015 | über [E0 0–0] |
| /bad | desktop | 92 (100) (96) | -8 | -4 | 672 (777) (667) | -105 | 5 | unter [E0 769–777] | 2 (27) (0) | -25 | 2 | unter [E0 12–32] | 0.170 (0.000) (0.121) | 0.170 | 0.049 | über [E0 0–0] |
| /leistungen | mobil | 91 (85) (83) | +6 | +8 | 2924 (3670) (2713) | -746 | 211 | unter [E0 3651–3683] | 205 (252) (356) | -47 | -151 | unter [E0 223–267] | 0.000 (0.000) (0.000) | 0.000 | 0.000 | innerhalb [E0 0–0] |
| /leistungen | desktop | 100 (100) (100) | 0 | 0 | 580 (760) (582) | -180 | -2 | unter [E0 649–780] | 4 (22) (0) | -18 | 4 | unter [E0 11–86] | 0.001 (0.000) (0.001) | 0.001 | 0.000 | über [E0 0–0] |
| /leistungen/bad | mobil | 93 (85) (89) | +8 | +4 | 2924 (3665) (2994) | -741 | -70 | unter [E0 3657–3709] | 141 (259) (311) | -118 | -170 | unter [E0 169–274] | 0.000 (0.000) (0.000) | 0.000 | 0.000 | innerhalb [E0 0–0] |
| /leistungen/bad | desktop | 100 (100) (100) | 0 | 0 | 599 (758) (536) | -159 | 63 | unter [E0 749–767] | 3 (14) (0) | -11 | 3 | unter [E0 14–17] | 0.001 (0.000) (0.001) | 0.001 | 0.000 | über [E0 0–0] |
| /standorte | mobil | 94 (57) (94) | +37 | 0 | 2564 (3833) (2564) | -1269 | 0 | unter [E0 3794–3870] | 203 (427) (191) | -224 | 12 | innerhalb [E0 198–774] | 0.000 (0.516) (0.000) | -0.516 | 0.000 | unter [E0 0.516–0.516] |
| /standorte | desktop | 100 (83) (100) | +17 | 0 | 696 (779) (692) | -83 | 4 | unter [E0 757–823] | 2 (20) (0) | -18 | 2 | unter [E0 20–25] | 0.001 (0.338) (0.001) | -0.337 | 0.000 | innerhalb [E0 0–0.338] |
| /standorte/wetzlar | mobil | 96 (76) (96) | +20 | 0 | 2681 (4985) (2416) | -2304 | 265 | unter [E0 4859–5020] | 83 (305) (157) | -222 | -74 | unter [E0 289–331] | 0.016 (0.000) (0.000) | 0.016 | 0.016 | über [E0 0–0] |
| /standorte/wetzlar | desktop | 100 (100) (100) | 0 | 0 | 531 (715) (531) | -184 | 0 | unter [E0 700–770] | 13 (17) (10) | -4 | 3 | unter [E0 14–22] | 0.001 (0.000) (0.001) | 0.001 | 0.000 | über [E0 0–0] |
| /fliesen | mobil | 94 (82) (83) | +12 | +11 | 2903 (3785) (2716) | -882 | 187 | unter [E0 3335–4181] | 147 (267) (500) | -120 | -353 | unter [E0 215–315] | 0.000 (0.000) (0.000) | 0.000 | 0.000 | innerhalb [E0 0–0] |
| /fliesen | desktop | 100 (100) (100) | 0 | 0 | 573 (795) (578) | -222 | -5 | unter [E0 782–806] | 0 (19) (8) | -19 | -8 | unter [E0 16–43] | 0.001 (0.000) (0.001) | 0.001 | 0.000 | über [E0 0–0] |
| /ueber-uns | mobil | 97 (86) (95) | +11 | +2 | 2464 (3639) (2617) | -1175 | -153 | unter [E0 3633–3918] | 118 (236) (152) | -118 | -34 | unter [E0 207–258] | 0.000 (0.000) (0.000) | 0.000 | 0.000 | innerhalb [E0 0–0] |
| /ueber-uns | desktop | 100 (100) (100) | 0 | 0 | 687 (743) (649) | -56 | 38 | unter [E0 738–764] | 3 (13) (0) | -10 | 3 | unter [E0 12–28] | 0.001 (0.000) (0.001) | 0.001 | 0.000 | über [E0 0–0] |
| /kontakt | mobil | 91 (75) (91) | +16 | 0 | 2637 (4849) (2716) | -2212 | -79 | unter [E0 4836–4871] | 280 (326) (234) | -46 | 46 | unter [E0 305–337] | 0.000 (0.000) (0.000) | 0.000 | 0.000 | innerhalb [E0 0–0] |
| /kontakt | desktop | 100 (96) (100) | +4 | 0 | 558 (1408) (565) | -850 | -7 | unter [E0 1395–1436] | 8 (18) (1) | -10 | 7 | unter [E0 13–25] | 0.001 (0.000) (0.001) | 0.001 | 0.000 | über [E0 0–0] |
| /fliesen/konfigurator | mobil | 96 (74) (97) | +22 | -1 | 2761 (5371) (2488) | -2610 | 273 | unter [E0 5207–5429] | 100 (291) (114) | -191 | -14 | unter [E0 216–367] | 0.000 (0.000) (0.000) | 0.000 | 0.000 | innerhalb [E0 0–0] |
| /fliesen/konfigurator | desktop | 100 (100) (100) | 0 | 0 | 592 (716) (592) | -124 | 0 | unter [E0 676–765] | 4 (18) (3) | -14 | 1 | unter [E0 9–27] | 0.050 (0.000) (0.001) | 0.050 | 0.049 | über [E0 0–0] |
| /blog | mobil | 85 (66) (83) | +19 | +2 | 2857 (6608) (3289) | -3751 | -432 | unter [E0 6553–6635] | 439 (437) (388) | 2 | 51 | innerhalb [E0 392–470] | 0.000 (0.000) (0.000) | 0.000 | 0.000 | innerhalb [E0 0–0] |
| /blog | desktop | 100 (100) (100) | 0 | 0 | 598 (720) (730) | -122 | -132 | unter [E0 704–745] | 8 (11) (11) | -3 | -3 | innerhalb [E0 7–14] | 0.001 (0.000) (0.001) | 0.001 | 0.000 | über [E0 0–0] |
| /blog/rutschfeste-fliesen-r-klassen | mobil | 90 (65) (89) | +25 | +1 | 3116 (6435) (3067) | -3319 | 49 | unter [E0 6326–6505] | 224 (475) (258) | -251 | -34 | unter [E0 378–492] | 0.000 (0.000) (0.000) | 0.000 | 0.000 | innerhalb [E0 0–0] |
| /blog/rutschfeste-fliesen-r-klassen | desktop | 100 (100) (100) | 0 | 0 | 656 (787) (672) | -131 | -16 | unter [E0 753–789] | 7 (17) (0) | -10 | 7 | unter [E0 16–27] | 0.001 (0.000) (0.001) | 0.001 | 0.000 | über [E0 0–0] |

## 3. Budgets mobil (Median)

| Ansicht | LCP ≤ 2500 | CLS ≤ 0,1 | TBT ≤ 200 | Leistung ≥ 90 |
|---|---|---|---|---|
| / | 2863 verfehlt | 0.019 erfüllt | 142 erfüllt | 92 erfüllt |
| /bad | 2569 verfehlt | 0.015 erfüllt | 186 erfüllt | 92 erfüllt |
| /leistungen | 2924 verfehlt | 0.000 erfüllt | 205 verfehlt | 91 erfüllt |
| /leistungen/bad | 2924 verfehlt | 0.000 erfüllt | 141 erfüllt | 93 erfüllt |
| /standorte | 2564 verfehlt | 0.000 erfüllt | 203 verfehlt | 94 erfüllt |
| /standorte/wetzlar | 2681 verfehlt | 0.016 erfüllt | 83 erfüllt | 96 erfüllt |
| /fliesen | 2903 verfehlt | 0.000 erfüllt | 147 erfüllt | 94 erfüllt |
| /ueber-uns | 2464 erfüllt | 0.000 erfüllt | 118 erfüllt | 97 erfüllt |
| /kontakt | 2637 verfehlt | 0.000 erfüllt | 280 verfehlt | 91 erfüllt |
| /fliesen/konfigurator | 2761 verfehlt | 0.000 erfüllt | 100 erfüllt | 96 erfüllt |
| /blog | 2857 verfehlt | 0.000 erfüllt | 439 verfehlt | 85 verfehlt |
| /blog/rutschfeste-fliesen-r-klassen | 3116 verfehlt | 0.000 erfüllt | 224 verfehlt | 90 erfüllt |

## 4. JS-Bytes mobil (Median aus 3 Läufen, KB Transfer)

| Ansicht | Skripte gesamt E3 (A1) | Δ | früh angefordert E3 (A1) | Δ | Anzahl Skripte früh E3 (A1) | FCP-Median E3 (A1) |
|---|---|---|---|---|---|---|
| / | 261 (263) [tool 261] | -2 | 261 (263) | -2 | 16 (17) | 1219 (1218) |
| /bad | 280 (282) [tool 280] | -2 | 280 (282) | -2 | 18 (19) | 1070 (1070) |
| /leistungen | 278 (270) [tool 278] | 8 | 278 (270) | 8 | 17 (18) | 1220 (1217) |
| /leistungen/bad | 288 (279) [tool 288] | 9 | 288 (279) | 9 | 18 (19) | 1225 (1067) |
| /standorte | 282 (274) [tool 282] | 8 | 282 (274) | 8 | 18 (18) | 1067 (1066) |
| /standorte/wetzlar | 271 (272) [tool 271] | -1 | 271 (272) | -1 | 17 (18) | 1065 (1068) |
| /fliesen | 291 (292) [tool 291] | 0 | 291 (292) | 0 | 20 (21) | 1216 (1220) |
| /ueber-uns | 265 (268) [tool 265] | -2 | 265 (268) | -2 | 17 (18) | 1067 (1066) |
| /kontakt | 261 (263) [tool 261] | -2 | 261 (263) | -2 | 16 (17) | 1068 (1066) |
| /fliesen/konfigurator | 292 (294) [tool 292] | -2 | 292 (294) | -2 | 20 (21) | 1072 (1069) |
| /blog | 396 (378) [tool 396] | 18 | 396 (378) | 18 | 23 (22) | 1066 (919) |
| /blog/rutschfeste-fliesen-r-klassen | 376 (374) [tool 376] | 1 | 376 (374) | 1 | 21 (22) | 1076 (1067) |


## 5. Zusammenfassung des Vergleichs

- **Gegen E0 (mobil, 12 Ansichten):** LCP-Median liegt in allen 12 Ansichten unter der Spanne der drei E0-Läufe (Δ −746 bis −3751 ms). TBT liegt in 10 von 12 unter der E0-Spanne; innerhalb bei `/standorte` und `/blog`. Leistung liegt in allen 12 über der E0-Spanne (Δ +6 bis +37 Punkte). CLS mobil: 0 bis 0,019; `/` (0,019) liegt über der E0-Spanne von 0, ist aber weit unter dem Budget 0,1. Desktop: LCP in allen 12 unter der E0-Spanne; Desktop-CLS `/bad` 0,170 liegt über der E0-Spanne 0 (siehe 5).
- **Gegen Anlauf 1 (mobil, Median):** LCP fünf Ansichten schneller (`/` −475, `/leistungen/bad` −70, `/ueber-uns` −153, `/kontakt` −79, `/blog` −432 ms), eine unverändert (`/standorte`), sechs langsamer (`/bad` +81, `/leistungen` +211, `/standorte/wetzlar` +265, `/fliesen` +187, `/fliesen/konfigurator` +273, `/blog/rutschfeste-fliesen-r-klassen` +49 ms). Median der zwölf Δ: +24,5 ms. TBT acht Ansichten besser (bis −353 ms bei `/fliesen`), vier schlechter (`/` +52, `/standorte` +12, `/kontakt` +46, `/blog` +51). Leistung: 0 bis +11 Punkte bei zehn Ansichten, `/bad` und `/fliesen/konfigurator` −1. CLS mobil: `/` +0,019, `/bad` +0,015, `/standorte/wetzlar` +0,016; alle innerhalb des Budgets.
- **Budgets mobil (Median), erfüllt von 12 Ansichten:** LCP ≤ 2500 ms: 1 von 12 (Anlauf 1: 3 von 12; nur `/ueber-uns` mit 2464 ms erfüllt). CLS ≤ 0,1: 12 von 12 (Anlauf 1: 12 von 12). TBT ≤ 200 ms: 7 von 12 (Anlauf 1: 5 von 12). Leistung ≥ 90: 11 von 12 (Anlauf 1: 7 von 12); nur `/blog` mit 85 verfehlt.
- **JS-Bytes mobil:** Die Summe der übertragenen Skript-Bytes (Tool-Feld `js_kb`, Median) liegt zwischen 261 und 396 KB (Anlauf 1: 263 bis 378 KB). Differenz −2 bis +18 KB; größte Zunahme `/blog` +18 KB, `/leistungen/bad` +9, `/leistungen` +8, `/standorte` +8.

## 6. JS-Bytes: Definition „früh angefordert“

Das Werkzeug erfasst nur die Gesamtsumme der Skript-Bytes (`js_kb`) und die fünf größten Skripte je Lauf. Für „früh angefordert“ wurde je Lauf aus den Reports (`network-requests`) die Summe der Transfergrößen aller Skripte gebildet, deren Anforderungsbeginn (`networkRequestTime`) vor dem FCP des Laufs liegt; Median über 3 Läufe. Ergebnis: In allen 72 Läufen beginnt jede Skript-Anforderung vor dem FCP. Die frühe Summe ist daher gleich der Gesamtsumme. Der späteste Anforderungsbeginn eines Skripts (Median über 3 Läufe) liegt bei E3 zwischen 430 und 736 ms (Anlauf 1: 486 bis 695 ms); der FCP-Median bei E3 zwischen 1065 und 1225 ms.

## 7. Auffälligkeiten (Median, nicht Einzelläufe)

- Desktop `/bad`: CLS 0,17 in allen drei Läufen (Anlauf 1: 0,121; E0: 0). Desktop hat keine Budgets in dieser Vorgabe; die Verschlechterung gegenüber Anlauf 1 beträgt +0,049.
- Desktop `/fliesen/konfigurator`: CLS 0,05 [0–0,08] (Anlauf 1: 0,001).
- Mobil `/blog`: TBT 439 ms [308–524] und Leistung 85 [84–87]; höchster TBT der Ansichten.
- Mobil `/kontakt`: TBT 280 ms [171–381] verfehlt das Budget, Spanne streut weit.
- Benchmark-Band: alle 72 Einzelläufe innerhalb 1256,3–1699,7; keine Abweichung. Kein Lauf musste wiederholt werden.

## 8. Selbstprüfung

- Alle Zahlen aus `belege/e3-tor-2/lighthouse.json`, `belege/e0/lighthouse.json`, `belege/e3-tor/lighthouse.json` sowie den Reports unter `_werkstatt/cache/lighthouse/` (Anlauf 2 und Anlauf 1) übernommen; Vergleichstabellen per Skript erzeugt.
- Nachgerechnet 1: `/standorte/wetzlar` mobil LCP aus den drei Einzelläufen 2560, 2681, 2700 ms; Median 2681 ms; JSON 2681 ms. Übereinstimmung.
- Nachgerechnet 2: `/blog` mobil Skript-Bytes aus den drei Reports je 396,2 KB; Median 396,2 KB; JSON 396 KB (gerundet). Übereinstimmung.
- Benchmark-Band: 1478,0 × 0,85 = 1256,3; 1478,0 × 1,15 = 1699,7.
- Vergleichsspanne E0 je Ansicht aus `belege/e0/lighthouse.json` (`median.spanne`), Anlauf-1-Median aus `belege/e3-tor/lighthouse.json`.
- Werkzeuge, Quelldateien und Tests nicht verändert. Kein Build, kein Server-Start oder -Stopp, Entwicklungsserver 4320 nicht angefasst.
