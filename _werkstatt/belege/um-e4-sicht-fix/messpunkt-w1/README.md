# Messpunkt nach Welle 1 von UM-E4-SICHT-FIX (31.10.2026)

Vorher 4d2d3fef (Server 4324), nachher 13315fa8 (Server 4325, HEAD nach SF-A, SF-B, SF-C1 und SF-C2). Teil 1 `kette-1.sh` (15:25 bis 16:48 UTC) brach durch einen Neustart der Umgebung im Pixelvergleich ab; Werte, Pixel, Lighthouse und Reaktion liefen danach mit `kette-1b.sh` (17:29 bis 18:01 UTC). Zwischen 17:39 und 17:46 UTC lief daneben die kurze Prüfung von E-109 (Mail-Test, eslint, tsc) während Lighthouse v1; die Spannen der betroffenen Läufe sind unauffällig.

| Prüfung | Ergebnis |
|---|---|
| Reinraum 13315fa8 | grün (lint 0, test 0, qa-graph 0), 270/270 |
| Stylesheets | eines je Seite (13 Seiten, beide Stände) |
| CSS gzip | 23.400 → 24.541 B (+1.141 B; Budget beider Wellen +4 KB) |
| G8-Abgleich | gleich (Fuß, Zitate, Zahlen auf /, /bad, /ueber-uns, Impressum, Datenschutz) |
| Suite reduziert / Bewegung an | 398 / 0 / 26 und 398 / 0 / 26, 0 flaky (FAQ /preise nicht mehr aufgetreten) |
| Bildrate im Wechsel (vorher → nachher) | / 2,30 → 1,08 %, /bad 3,35 → 3,68 %, /referenzen 4,47 → 2,27 %, /standorte/wetzlar 2,08 → 3,09 %; keine durchgängige Verschlechterung |
| axe Hauptansichten (--zustaende) | 396 Läufe, 0 ernste oder kritische Knoten |
| axe Zusatz (9 Seiten) | 104 Knoten, nur label-content-name-mismatch am WhatsApp-Knopf auf /preise, /termin, /leistungen/bad, /foerderung (Altbefund E-100; Liste länger als dort) → X-1 in Welle 2 |
| ruhig / reduziert (13 Seiten) | 0 Befunde |
| Register d1440 / m390 | 0 unbekannt, 0 ohne Register |
| Strukturdaten | 113 von 113 grün |
| Lesbarkeit | 10 von 12 grün, rot nur die geschützten H1 |
| Erstes Bild | Ausfälle wie vorher (vor allem Cookie-Hinweis im Erstbesuch) |
| Werte (--basis 4d2d3fef) | 62 Dateien, 2 Befunde (beliebig 1, dauer_zahl 1), wie in den Notizen der Bauteile |
| Pixel | 48 Paare, 44 mit Abweichung, alle in den Ansichten mit gewollten Änderungen (Notizen der Bauteile, Abschnitt „Gewollte Pixeländerungen“) |

## Lighthouse mobil (Median aus 3 Läufen je Stand, allein)

| Seite | Leistung | LCP ms | TBT ms |
|---|---|---|---|
| / | 95 → 92 | 2829 → 2701 | 90 → 155 |
| /bad | 94 → 95 | 2976 → 2840 | 94 → 110 |
| /bad/badsanierung | 94 → 93 | 2978 → 3218 | 99 → 125 |
| /bad/barrierefreies-bad | 95 → 92 | 2898 → 2693 | 79 → 138 |
| /leistungen | 95 → 94 | 2857 → 3003 | 103 → 84 |
| /fliesen | 96 → 93 | 2714 → 3056 | 80 → 104 |
| /balkon-terrasse | 94 → 93 | 2853 → 3130 | 156 → 86 |
| /referenzen | 93 → 96 | 3141 → 2699 | 63 → 82 |
| /ueber-uns | 95 → 94 | 2727 → 2989 | 132 → 79 |
| /kontakt | 95 → **87** | 2630 → **3863** | 144 → 131 |
| /standorte/wetzlar | 86 → 93 | 3763 → 2990 | 181 → 141 |
| /blog | 94 → 94 | 2862 → 3006 | 118 → 109 |

/kontakt: LCP-Element ist nachher der Text des Cookie-Hinweises (seit SF-C2 steht im ersten Bildschirm kein größeres Element mehr) → R-2 in Welle 2.

## Reaktion (m390, CPU 4×, Median aus 3, Schwelle 200 ms)

Nachher alle Handlungen bis 152 ms, außer **/referenzen Aufklappen der Galerie 384 ms** (neuer Aufklapper aus SF-C1) → R-1 in Welle 2.

Rohdaten: `lh-v1-mobil.json`, `lh-n1-mobil.json`, `reaktion-v.json`, `reaktion-n.json`, `axe-zusatz.json`, Protokolle `kette-1.log`, `kette-1b.log`.
