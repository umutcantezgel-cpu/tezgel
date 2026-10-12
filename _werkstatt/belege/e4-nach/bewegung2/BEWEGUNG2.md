# BEWEGUNG2 – Lauf E4-NACH-18 (Prüfer, Arbeitsmodell)

**Stand:** Dev-Server http://127.0.0.1:4320 (Arbeitsbaum, HEAD ebd6a54), Produktion nicht verwendet. Werkzeug: `_werkstatt/werkzeuge/bewegung.mjs` (E4-NACH-18). Je Lauf `ergebnis.json`, Bilder und `kontakt.jpg` (alle Bilder nebeneinander). Auswertung: `anteile.py` (Bildpaare je Ordner), `lotband.py` (rote Linie am linken Rand).

**Lesart:** Anteil = Anteil der Pixel mit Helligkeitsunterschied über 24 (Graustufen, 0–255) zwischen zwei Bildern der ganzen Bildfläche. Sichtbar = Bild, dessen Nachbarpaar über 0,5 % liegt. Lade-Folge erfüllt, wenn ≥ 3 von 5 Bildern sichtbar sind. Wert 0,00 % zwischen gleichen Zuständen zeigt das Rauschen: null.

## 1. Abweichungen vom Maßstab (begründet)

1. **Anker und Drosselung (Lade-Momente).** Der Maßstab (Anker: Element im DOM, danach t_k warten, CPU 4×) zeigt hier keine Zwischenstände. Beleg `anker-dom-pruefung/einzel-start-sig-kreuzlinie-m390` (`--anker dom --cpu 4`): alle fünf Bilder bei `ist_ms` 1200 (Animation bereits beendet), Paare 0/0/0/0, `ms_nach_dom` 3,7 bis 4,4 s. Unter 4× vergeht bis zum Anker mehr als die Dauer der Animation (1,2 s).
   Umgesetzt (Standard, `--anker animation --cpu 1 --zeitlupe 0.1`): Die Animation läuft mit 0,1-facher Geschwindigkeit (CDP `Animation.setPlaybackRate` vor dem Laden). Die Bilder werden auf der Animationsuhr genommen (Soll-Zeitpunkte unverändert: 0/25/50/75 % der längsten Dauer, 100 % + 150 ms), jeweils mit frischer Seite. Der Zustand ist derselbe, nur langsamer.
   Vorversuch (Scratchpad, erste Beobachtung der Animation): 1×/0,1×: 52 ms; 4×/0,1×: 258 ms; 4×/1×: bereits beendet. Der Lauf `anker-dom-pruefung/cpu4-anker-animation-zeitlupe-0-1` (4×, 0,1×) fasst 0 % erst bei 447 ms; 4 von 5 Bildern sichtbar.
2. **Zeitmessung.** `ist_ms` wird vor der Aufnahme gelesen, `ist_nach_aufnahme_ms` danach; das Bild liegt zwischen beiden. Bei 25 bis 75 % weicht `ist_ms` um 5 ms vom Soll ab. Das 0-%-Bild liegt auf der Animationsuhr bei 28 bis 122 ms, weil die Beobachtung nach dem Start der Animation einsetzt (siehe Vorversuch).
3. **Ausschnitt-Regel** umgesetzt: Liegt das Element nicht vollständig im sichtbaren Bereich (Unterkante unter Fußleiste bzw. Fensterhöhe), wird vor dem ersten Bild gescrollt, Oberkante 80 px unter dem Kopf, Ausschnitt um das Element, mindestens 400 px hoch. Scroll 0 ist die Grenze: `/` m390 erreicht nur 31 px (Element 2516 px hoch, Ausschnitt ganze Höhe).
4. **Hover** (`/leistungen` sig-plan) läuft unverändert im Zeitmodus mit Seek. Die Bilder unterscheiden sich, eine Zeitmessung gibt es dort nicht (außerhalb des Umfangs).

## 2. Folgen

| Seite · Kennung · Ansicht | Auslöser (Modus) | Ordner (unter `bewegung2/`) | Was sich zwischen den Bildern sichtbar ändert | Paare 0–1 / 1–2 / 2–3 / 3–4 (%) | 0 → 4 (%) | Sichtbar (von 5) |
|---|---|---|---|---|---|---|
| `/` sig-kreuzlinie · m390 | seite (Echtzeit; Scroll 0, Ausschnitt ganze Höhe) | `einzel-start-sig-kreuzlinie-m390` | Rotes Lot (2 px) wächst am linken Rand von der Oberkante (96 px) abwärts: Bild 0 bis 336 px, Bild 1 bis 776 px, Bild 2 bis 782 px (Bodenleiste ab 783 px). Ab Bild 2 im sichtbaren Bereich unverändert (Lot läuft unter der Leiste weiter). Zugleich rücken die H1-Zeilen in die Flucht (sig-flucht), das ist der größere Teil der geänderten Pixel; in Paar 2–3 und 3–4 ändert sich im Lotband nichts | 3,34 / 3,39 / 1,51 / 0,23 | 4,07 | 4 |
| `/` sig-kreuzlinie · d1440 | seite (Echtzeit; Scroll 169 px, Oberkante 80 px unter dem Kopf) | `einzel-start-sig-kreuzlinie-d1440` | Waage (2 px) wächst nach rechts, das Lot des Plans wächst vom Kreuzpunkt nach oben: Bild 0 Waage kurz; Bild 1 Lot angesetzt; Bild 2 Waage und Lot größer; Bild 3 beide voll; Bild 4 zusätzlich das Lot nach der Waage unterhalb des Kreuzpunkts (ab 1,2 s). Dünne Linien, deshalb kleiner Anteil | 3,14 / 1,24 / 0,19 / 0,04 | 3,56 | 3 |
| `/bad` sig-plan · d1440 | seite (Planblatt laden; Scroll 0) | `einzel-bad-sig-plan-d1440` | Änderung im Planblatt rechts (x 889–1288, y 316–615) ab Paar 1–2: Raster-Fugen rücken in die Flucht. Paar 0–1: nur H1-Bewegung, das Planblatt liegt noch in seiner 320-ms-Verzögerung | 0,02 / 0,41 / 0,50 / 0,22 | 0,43 | 0 |
| `/bad` sig-plan · m390 | seite (Planblatt laden; Scroll 909 px, Oberkante 80 px unter dem Kopf; Ausschnitt 62–462 px) | `einzel-bad-sig-plan-m390` | Raster im Planblatt rückt in die Flucht. Bild 0 und 1 gleich, weil 25 % (280 ms) vor dem Beginn (320 ms) liegen | 0,00 / 1,75 / 2,00 / 1,25 | 1,80 | 4 |
| `/leistungen/bad` sig-plan · d1440 | seite (Planblatt laden; Scroll 0) | `einzel-leistungen__bad-sig-plan-d1440` | Planblatt rechts (x 888–1287, y 169–433): Fugen rücken in die Flucht ab Bild 1. Bild 0 und 1 gleich (Verzögerung wie oben) | 0,00 / 0,44 / 0,51 / 0,19 | 0,48 | 2 |
| `/standorte` einzugsband · m390 | seite (Echtzeit; Scroll 635 px, Oberkante 80 px unter dem Kopf; Ausschnitt ganze Höhe) | `einzel-standorte-einzugsband-m390` | Zonen legen sich nacheinander frei: Bild 0 Zone 1 halb, Bild 1 Zone 1 ganz und Zone 2 beginnt, Bild 2 Zone 2 sichtbar. Paar 2–3 in den unteren Zonen, Paar 3–4 gleich | 0,49 / 0,69 / 0,37 / 0,00 | 1,55 | 2 |
| `/standorte` einzugsband · d1440 | seite (Echtzeit; Scroll 0, ganze Ansicht) | `einzel-standorte-einzugsband-d1440` | Zone 1 (≤ 10 km) zuerst, Zone 2 in Bild 1 bis 2, Zone 3 in Bild 2 bis 3; Bild 3 und 4 gleich. Die Änderung ist im Zoom klar, der Anteil klein (heller Text auf heller Fläche) | 0,12 / 0,21 / 0,49 / 0,00 | 0,82 | 0 |
| `/leistungen` sig-plan · d1440 | hover (Zeitmodus mit Seek; außerhalb Echtzeit) | `einzel-leistungen-sig-plan-d1440` | Stoßfugen der ersten Karte verschieben sich zwischen Bild 0 und 2, danach kaum noch. Keine Zeitmessung | 0,45 / 0,55 / 0,46 / 0,15 | 0,49 | 2 |
| `/fliesen` verband · d1440 | wahl (Echtzeit nach dem Klick) | `einzel-fliesen-verband-d1440` (10 Bilder: je Folge fünf) | Reihen gleiten um ½ bzw. ⅓ Platte. Bild 0 vorher, Bilder 1 bis 3 nach dem Klick (169, 249, 336 ms), Bild 4 nachher | Halb → Drittel: 9,62 / 1,52 / 1,45 / 1,44. Drittel → Kreuz: 9,15 / 1,17 / 1,23 / 1,32 | 9,59 · 9,30 | 5 je Folge |

## 3. Zeitbezug der Lade-Folgen (ms, ab Animationsbeginn)

| Folge | längste Dauer | Soll 0 / 25 / 50 / 75 / 100 % (+150) | Ist vor Aufnahme |
|---|---|---|---|
| `/` sig-kreuzlinie m390 | 1200 | 0 / 300 / 600 / 900 / 1350 | 95 / 305 / 605 / 905 / 1200 |
| `/` sig-kreuzlinie d1440 | 1800 | 0 / 450 / 900 / 1350 / 1950 | 103 / 455 / 905 / 1355 / 1800 |
| `/bad` sig-plan d1440 | 1120 | 0 / 280 / 560 / 840 / 1270 | 28 / 285 / 565 / 845 / 1120 |
| `/bad` sig-plan m390 | 1120 | 0 / 280 / 560 / 840 / 1270 | 88 / 285 / 567 / 845 / 1120 |
| `/leistungen/bad` sig-plan d1440 | 1120 | 0 / 280 / 560 / 840 / 1270 | 122 / 285 / 565 / 845 / 1120 |
| `/standorte` einzugsband m390 | 1200 | 0 / 300 / 600 / 900 / 1350 | 88 / 305 / 605 / 905 / 1200 |
| `/standorte` einzugsband d1440 | 1200 | 0 / 300 / 600 / 900 / 1350 | 78 / 305 / 605 / 905 / 1200 |

## 4. Auffälligkeiten

- **Lot auf `/` m390 läuft unter die Bodenleiste.** Das Element ist 2516 px hoch, sichtbar sind 96 bis 782 px. Das Lot erreicht die Leiste nach etwa 0,33 s (27 % der Dauer). Mit dem Lotband (x 0–12 Gerätepixel): Paar 0→1 17,4 % der Bandpixel, 1→2 0,24 %, danach 0. Rote Linie Zeilen 192–673 (Bild 0), 192–1553 (Bild 1), 192–1565 (Bild 2 bis 4).
- **Planblatt mit 320 ms Verzögerung.** 25 % der Dauer (280 ms) liegt vor dem Beginn: Bilder 0 und 1 sind gleich.
- **Dauer `/` d1440: 1800 ms** (Lot nach der Waage: 1200 ms Verzögerung + 600 ms). Über dem Maßstab von 1,6 s.
- **Pixelschwelle und Linien.** Zwei Pixel breite Linien und ein Raster-Versatz von einem Drittel Platte erreichen je Paar oft nicht 0,5 % des Bildes. Die Befunde je Folge nennen das.
- **Rauschen:** identische Zustände ergeben 0,00 % (Paar 3–4 `/standorte` m390; Paar 0–1 `/leistungen/bad`, vor Beginn der Verzögerung).
- **Gesperrte Anfragen:** in allen Läufen 0 (`gesperrt`: fremd 0, blockiert 0, Attrappe 0).

## 5. Versuche und Belege

- `anker-dom-pruefung/einzel-start-sig-kreuzlinie-m390` (Anker dom, 4×, Maßstab): ist 1200 bei allen Bildern, Paare 0/0/0/0.
- `anker-dom-pruefung/cpu4-anker-animation-zeitlupe-0-1` (Anker animation, 4×, 0,1×): ist 447/370/607/922/1200, Paare 2,06 / 2,34 / 1,94 / 0,44, 4 von 5 sichtbar.
- Vorversuch Scratchpad (nicht im Projekt): erste Beobachtung der Animation 1×/0,1× 52 ms; 1×/0,05× 47 ms; 4×/0,05× 107 ms; 4×/0,1× 258 ms; 4×/1× beendet.
