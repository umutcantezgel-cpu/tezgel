# E-038 Basiswerte · Fusions-Startseite (live c27fc77) gegen Ausgangsstand 707a93d · 12.10.2026

## Lighthouse (`lighthouse-vergleich.json`, 10 verschränkte Paare, echter Median, ruhiges Fenster, 4 CPUs)
| `/` | Ausgangsstand 707a93d (4310) | live c27fc77 (4337) | Budget K-011 |
|---|---|---|---|
| mobil Leistung | 82,5 | **70,5** (Δ −12, jenseits der Streuung) | ≥ 90 |
| mobil LCP | 3 888 ms | 3 401 ms (−12,5 %) | ≤ 2 500 ms |
| mobil TBT | 286 ms | **1 045 ms** | ≤ 200 ms |
| mobil CLS | 0 | 0,001 | ≤ 0,1 |
| mobil JS | 413 KB | 267 KB | – |
| Desktop Leistung / TBT | 100 / 25 ms | 100 / 61 ms | – |

LCP-Element in beiden Fassungen der Vorspann-Absatz („Fugenarme XXL-Großformatfliesen, barrier…“), 10/10.

## Leistungsspur (`spur-707a93d-c27fc77.log`, `_relaunch/cache/p4-12/spur.mjs`, 4 Läufe verschränkt, m375, Erstbesuch)
- Ausgangsstand: TBT-CPU-Median 206, lange Aufgaben fast nur Skript (98 ms).
- Live: TBT-CPU-Median 1 445; nach dem ersten Bild eine Kette langer Aufgaben im Abstand 60–100 ms, je 40–80 ms
  (4× gedrosselt), Arten: **Stil 336 ms**, Skript 70 ms, Layout 35 ms. DOM 3 035 Knoten (Ausgangsstand 2 625).
- Gegenprobe mit eingespeistem `*{transition:none!important;animation:none!important}`: Stil 550–570 ms, keine Besserung
  → nicht CSS-Übergänge/-Animationen, sondern wiederholte Stil-Invalidierung durch DOM-/Klassen-/Attributänderungen.

## INP
Lauf durch den Neustart der Sitzung abgebrochen; wird mit N-01 nachgeholt.

## Folgerung
Paket **N-01 „Startseite TBT“** (`_relaunch/pakete/N-01.md`): Ursache belegen und beheben; hat Vorrang vor Seiten-Pushes,
weil live mobil schlechter reagiert als der Ausgangsstand. Ersetzt die am Kern-`/` gemessenen P4-14/P4-15 (E-038).
