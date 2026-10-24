# Stufe B (Kurzfassung) · Startseite, Tor E2 Anlauf 2 · Stand 564ff56 (24.10.2026)

Produktionsbau im Reinraum (`$SCRATCH/reinraum-564ff56`, Port 4311): npm ci, Build, Typen, Lint, `npm test` (117 von 117), qa-graph, Dateispur sauber. Material für die Sichtabnahme in `$SCRATCH/E2-SICHT-2/` (Bildsätze, Videos der großen Momente, Belege).

| Prüfung | Ergebnis | Vorher (E-035, 5df89bc) |
|---|---|---|
| Funktionsspecs (alle, Produktionsbau) | 326 bestanden, 26 übersprungen, 0 rot (neu: plan-morph.spec.mjs) | 319 bestanden, 12 übersprungen |
| Erstes Bild, 10 Geräte, nach Einwilligung | überall 5 von 5 | überall 5 von 5 |
| Erstes Bild mit Einwilligungsbanner | 1 bis 5 von 5 (Banner verdeckt, Verhalten unantastbar, G8) | ähnlich |
| Überlauf, 10 Geräte | 0 | 0 |
| Überlappung, 10 Geräte ohne Banner | 0 | 0 |
| Systemschrift 200 % (m360, m390, m430) | Überlauf 0, Überlappung 0 | eine Textkreuzung je Gerät |
| axe (11 Läufe) | 0 ernst oder kritisch | 0 |
| Lesbarkeit `/` | GRÜN, Flesch 79,3, Satz Ø 7,2 | GRÜN, 78,5 |
| Lighthouse mobil (Median aus 3) | Leistung 86, LCP 2.863 ms, TBT 333 ms, CLS 0; LCP-Element Vorspann | 89, 3.029 ms, 270 ms, 0 |
| Lighthouse Desktop | Leistung 100, LCP 715 ms, CLS 0,001 | 98, CLS 0,082 |
| CLS eigene Messung 1350 × 940 (mit und ohne Intro, mit und ohne Banner) | 0 | 0,07 bis 0,15 |

Offen: Leistung mobil ≥ 90 und LCP ≤ 2,5 s (Z-08, E-034); die zurückgeholten SVG-Bewegungen (E-037) kosten rund 60 ms Blockierzeit. Hebel im Leistungspaket nach dem Tor.
