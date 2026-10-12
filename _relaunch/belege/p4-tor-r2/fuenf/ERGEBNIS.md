# Fünf-Sekunden-Probe P4-Tor Runde 2 (PROBELAUF §8, E-030, Regel vorab: `REGEL.md`, d67895f)

**Material:**
- Erster Bildschirm mit Einwilligungsbanner der Vorschau c5ef582-v (nach P4-13), sieben Kern-Seiten, m375 und d1440. Das sind 14 Bilder unter neutralen Namen (`zuordnung-bilder.json`), je 5 frische Haiku-Erstbetrachter (`antworten-vorschau.json`), Auftrag wörtlich wie in Runde 1.
- Bestand unverändert übernommen: 60 Antworten aus Runde 1 (f2c4180) und für `/` 10 Antworten des Ausgangsstands (P0, 707a93d).
- Zusammen 140 Antworten, fest gemischt unter A001–A140 (`mische.py`, `zuordnung-kennungen.json`). Eingabe und Mischung waren vor der Bewertung committet (f31710a).

**Bewertung (`bewertung.json`):** drei frische Opus-Bewerter, blind über alle 140 Antworten: Protokoll (E-030), Umkehrprobe (zweiter Bewerter, gleiche Regel), strenge Lesart.

## Protokoll (E-030), „alle drei richtig“ je 5 (Region erkannt)
| Seite | m375 Bestand → Vorschau | d1440 Bestand → Vorschau |
|---|---|---|
| / | 5 (0) → 5 (5) | 5 (5) → 5 (5) |
| /bad | 5 (0) → 5 (5) | 4 (5) → 5 (5) |
| /leistungen | 5 (0) → **4** (5) | 5 (5) → 5 (5) |
| /standorte | 4 (0) → 5 (5) | 5 (5) → 5 (5) |
| /blog | 5 (0) → 5 (5) | 5 (5) → 5 (5) |
| /ueber-uns | 3 (5) → **3** (5) | 4 (5) → 4 (5) |
| /kontakt | 5 (0) → **2** (5) | 5 (5) → 5 (5) |
| **Summe** | **32 → 29** | **33 → 34** |

- **Desktop:** Alle sieben Seiten liegen auf oder über dem Bestand. Die Desktop-Rückschritte aus Runde 1 (Banner über der Einleitung) sind weg.
- **Mobil:** `/leistungen` (4 statt 5) und `/kontakt` (2 statt 5) liegen unter dem Bestand, `/ueber-uns` erreicht 3/5 wie der Bestand, also unter der Schwelle 4/5. **Jede** dieser Fehlstellen ist die Zielgruppe („ob Privat- oder Gewerbekunden gemeint sind, ist nicht erkennbar“); Angebot und nächster Schritt sind überall richtig. Ursache ist der Wortlaut: Die drei Seiten nennen keine Zielgruppe (M-20). Mobil hat P4-13 nichts geändert (unter lg geometrisch gleich). Die Abweichung `/ueber-uns` m375 gegenüber Runde 1 (dort 5/5) ist Streuung der Erstbetrachter bei unverändertem Bild.
- **Region:** Die Vorschau nennt sie in allen 70 Antworten (Bestand 40 von 70).

## Umkehrprobe
Der zweite Bewerter stimmt bei der Zielgruppe in **140 von 140** Urteilen mit dem Protokoll überein, beim Angebot ebenso. Beim nächsten Schritt weicht er in einem Fall ab (A100). Summe Bestand 66 (Protokoll 65), Vorschau 63 (63). Die Wertung ist reproduzierbar (Schwelle der Regel: höchstens 10 Abweichungen).

## Strenge Lesart (Zielgruppe vom Bildschirm abgelesen)
| Seite | m375 Bestand → Vorschau | d1440 Bestand → Vorschau |
|---|---|---|
| / | 1 → 2 | 5 → 4 |
| /bad | 2 → 5 | 4 → 5 |
| /leistungen | 1 → 2 | 5 → 4 |
| /standorte | 0 → 5 | 5 → 5 (Runde 1: 3) |
| /blog | 0 → 3 | 5 → 4 |
| /ueber-uns | 0 → 1 | 4 → **0** |
| /kontakt | 0 → 2 | 5 → 4 |
| **Summe** | **4 → 20** | **33 → 26** |

Gesamt Bestand 37, Vorschau 46.
- **`/standorte` d1440: 3 → 5 von 5.** Dort stand in Runde 1 die Zielgruppe unter dem Banner; jetzt ist der Einleitungssatz frei, und alle fünf lesen „Privatkunden, Architekten und Bauherren“ ab. Das ist der direkte Beleg, dass H2 (Lage des Banners) behoben ist.
- **Desktop −1 auf `/`, `/leistungen`, `/blog` und `/kontakt`:** Je eine von fünf Antworten setzt ein „vermutlich“ vor eine sonst gleiche Gruppe. Das liegt im Bereich der Streuung, nicht am Banner: Die Einleitungen liegen frei (Bilder c14, c04, c05, c12).
- **`/ueber-uns` d1440: 4 → 0.**
  - **Bild c11:** H1 und Einleitung sind vollständig frei, die Leiste beginnt darunter. Die Einleitung nennt Angebot, Sitz und Region, aber keine Zielgruppe. Alle fünf Erstbetrachter schreiben ehrlich „nicht ausdrücklich genannt“.
  - **Bestandsbild b10:** Auch dort steht keine Zielgruppe. Der Bestand zeigt aber mehr Fließtext („Unser Betrieb“), und vier von fünf nennen eine Gruppe ohne Vorbehalt.
  - Die strenge Lesart misst hier also die Vorbehalte, nicht ablesbaren Text. **Ursache ist der Wortlaut (M-20)**, nicht der Banner.

## Urteil (nach der vorab festgelegten Regel)
- **H2 (Lage des Banners): behoben.** Desktop nach Protokoll überall ≥ Bestand; `/standorte` in der strengen Lesart von 3 auf 5.
- **Rot bleibt, wie in Runde 1, der Wortlaut:** `/kontakt` m375 und `/leistungen` m375 liegen unter dem Bestand, `/ueber-uns` m375 unter der Schwelle (gleich Bestand), `/ueber-uns` d1440 in der strengen Lesart. Es bleibt bei den Auflagen W2, W8 und W9 (Freischaltung erst nach Antwort auf M-20 oder als begründete Abweichung nach L7). `/ueber-uns` m375 kommt zu W8 hinzu.
- **`/` (live): Schwelle erfüllt**, m375 und d1440 je 5/5, Region 10/10 statt 5/10.
