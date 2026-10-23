# LIGHTHOUSE · E2-Tor Anlauf 2 (E2-PRUEF-L1)

Stand 5324b62 (Port 4312) gegen Ausgang 745335f (Port 4310) · 11.10.2026 · Messprotokoll ABNAHME: lokaler Produktionsserver, Erstbesuch mit Banner, Dritt-Hosts gesperrt, Lighthouse-Standardprofile, Aufwärmlauf, Median aus 3, kein anderer Agent und kein Build während der Messung (Last vor dem Start 0,02). Benchmark-Referenz E0 1351,5 (Band 1148,8–1554,2), E2 1566,0 (Band 1331,1–1800,9).

Rohdaten: `lighthouse/lighthouse.json` (E2), `../e0/ausgang/lighthouse/lighthouse.json` (E0), Laufprotokolle daneben. Werte vom Prüfer aus den JSON-Dateien übernommen und stichprobenhaft nachgerechnet; diese Datei schreibt der Orchestrator nach der Rückgabe.

## E2 (5324b62) · Median [Spanne]

| Ansicht | Form | Leistung | LCP ms | CLS | TBT ms | LCP-Element |
|---|---|---|---|---|---|---|
| / | mobil | 77 [71–79] | 2867 [2861–2873] | 0,001 [0,000–0,001] | 779 [637–1219] | Einstiegstext `p.max-w-mass` |
| / | Desktop | 100 [100–100] | 622 [620–725] | 0,002 | 36 [13–47] | wie mobil |
| /kontakt | mobil | 90 [82–91] | 2714 [2713–2715] | 0,000 | 294 [268–574] | Einstiegstext `p` |
| /kontakt | Desktop | 100 [100–100] | 607 [603–648] | 0,001 [0,001–0,002] | 3 [0–8] | wie mobil |

## E0 (745335f) · Median [Spanne]

| Ansicht | Form | Leistung | LCP ms | CLS | TBT ms | LCP-Element |
|---|---|---|---|---|---|---|
| / | mobil | 76 [76–77] | 4112 [3494–4260] | 0,000 | 415 [373–593] | Einstiegstext `p.text-base` |
| / | Desktop | 100 [99–100] | 815 [796–827] | 0,000 | 34 [14–47] | H1 |
| /kontakt | mobil | 75 [75–76] | 4849 [4836–4871] | 0,000 | 326 [305–337] | Banner-Text `p#cookie-consent-description` |
| /kontakt | Desktop | 96 [96–96] | 1408 [1395–1436] | 0,000 | 18 [13–25] | Banner-Text (Lauf 3 außerhalb des Bands) |

## Bewertung gegen Z-08 und die Budgets (mobil)

| Seite | LCP ≤ 2500 | CLS ≤ 0,1 | TBT ≤ 200 | Leistung ≥ 90 | gegen E0 (Spanne der drei E0-Läufe) |
|---|---|---|---|---|---|
| / | 2867 · verfehlt | 0,001 · erfüllt | 779 · verfehlt | 77 · verfehlt | LCP −1245 ms (−30 %) besser · **TBT +364 ms, über der E0-Spanne von 220 ms → Rückschritt** |
| /kontakt | 2714 · verfehlt | 0,000 · erfüllt | 294 · verfehlt | 90 · erfüllt (ein Lauf 82) | LCP −2135 ms (−44 %), TBT −32 ms, Leistung +15 |

Desktop: beide Seiten 100, LCP −24 % bzw. −57 %.

## Folgen
- E3-NACH-07 (Orchestrator): TBT auf `/` mobil zurück unter E0 + Spanne; Ursachen per Trace (Hydrierung der Inseln unterhalb des Einstiegs, Bewegungsmodul, Karte, Rechner, Bewertungen).
- LCP mobil 2,7–2,9 s: Renderverzögerung 205–259 ms, TTFB 13–17 ms; der Rest entfällt auf die simulierte Drosselung von Skript und Schrift. Weiter an der Ursache in E3-NACH-07 und KÜR-09; Budget 2,5 s bleibt Pflichtziel für Prüfstufe C.
- Banner ist auf /kontakt nicht mehr das LCP-Element (E-010 erfüllt).
