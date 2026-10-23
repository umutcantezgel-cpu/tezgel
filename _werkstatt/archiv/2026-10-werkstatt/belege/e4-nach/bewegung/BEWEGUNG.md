# BEWEGUNG – Lauf E4-NACH-16 (Prüfer, Arbeitsmodell)

**Stand:** Dev-Server http://127.0.0.1:4320 (Arbeitsbaum, HEAD c0002fa, nicht d5aea3b wie im Briefing), 2026-10-12, ca. 01:20 bis 01:40 UTC.
**Werkzeug:** `_werkstatt/werkzeuge/bewegung.mjs` (nachgeschärft, siehe Rückgabe). Bilder: je Ordner, Ergebnis je Ordner in `ergebnis.json`.
**Lesart:** Die Spalte „Änderung 0 → 4“ misst den Anteil der Pixel mit Helligkeitsunterschied über 24 (Graustufen) zwischen Bild 0 und Bild 4 derselben Folge. Die Beschreibungen nennen nur, was sich ändert; sie bewerten nicht.

## 1. Einzelbilder (Folgen)

| Seite · Kennung · Ansicht | Auslöser (Modus) | Ordner (unter `bewegung/`) | Was sich sichtbar ändert (Bild 0 bis 4) | Änderung 0 → 4 (%) |
|---|---|---|---|---|
| `/` sig-kreuzlinie · m390 | seite (Zeit; ganze Ansicht bei Scroll 0) | `einzel-start-sig-kreuzlinie-m390` | Bild 0 ohne Laser; Bild 1 rotes Lot bereits fast voll lang; Bilder 2 bis 4 identisch (Zeitsteuerung greift nicht, siehe Befund) | 1,49 |
| `/` sig-kreuzlinie · d1440 | seite (Zeit; ganze Ansicht) | `einzel-start-sig-kreuzlinie-d1440` | Bild 0 ohne Laser; Bild 1 kurze Waage und Lot am Kreuzpunkt (rote Pixel bis y 530); Bild 2 bis 3 Waage und Lot voll (y 879); Bild 4 minimal länger | 0,56 |
| `/bad` sig-plan · d1440 | seite (Planblatt „laden“; ganze Ansicht) | `einzel-bad-sig-plan-d1440` | Raster des Planblatts rückt in die Flucht (Fugen verschieben sich um ein Drittel Platte); Änderung klein, Bild 1 bis 4 nahe beieinander | 0,51 |
| `/bad` sig-plan · m390 | seite (Element unterhalb des ersten Bildschirms: Ausschnitt ≥ 400 px) | `einzel-bad-sig-plan-m390` | Raster im Ausschnitt rückt in die Flucht; an den Wänden wird das Passstück gleich breit (Bild 0 ungleich, Bild 4 gleich) | 2,16 |
| `/leistungen/bad` sig-plan · d1440 | seite (Planblatt „laden“; ganze Ansicht) | `einzel-leistungen__bad-sig-plan-d1440` | wie `/bad` d1440, Raster rückt in die Flucht | 0,49 |
| `/leistungen` sig-plan · d1440 | hover (Ausschnitt um das erste Element; vier Karten nacheinander) | `einzel-leistungen-sig-plan-d1440` | Raster der Karte wechselt zwischen Versatz und Flucht beim Hover; Übergang 0,6 s | 0,52 |
| `/fliesen` verband · d1440 | wahl (Folge Halb → Drittel) | `einzel-fliesen-verband-d1440` | Bild 0 = Zustand Halb; Bilder 1 bis 3 = Abtastung nach dem Klick (Übergang zu rund 85 % im Bild); Bild 4 = Drittel | 9,59 |
| `/fliesen` verband · d1440 | wahl (Folge Drittel → Kreuz) | (gleicher Ordner, Bilder `verband-drittel-kreuz-*`) | Bild 0 = Drittel; Bilder 1 bis 3 Abtastung; Bild 4 = Kreuzfuge | 9,30 |
| `/fliesen` verband · m390 | wahl (Halb → Drittel; Drittel → Kreuz) | `einzel-fliesen-verband-m390` | wie d1440: Reihen gleiten um ½ bzw. ⅓ Platte; Start, Ende und Zwischenbilder geprüft (Bild 0 = Halb 0,03 %; Bild 4 = Drittel 0,04 %; Drittel → Kreuz Bild 4 = Kreuz 0,04 %) | 10,06 (Halb → Drittel); 10,02 (Drittel → Kreuz) |
| `/standorte` einzugsband · d1440 | seite (Zeit; ganze Ansicht) | `einzel-standorte-einzugsband-d1440` | Die Abdeckungen über den drei Zonen werden nacheinander kleiner (Zone 1 zuerst, Zone 2 und 3 versetzt) | 0,96 |
| `/standorte` einzugsband · m390 | seite (Zeit; ganze Ansicht bei Scroll 0) | `einzel-standorte-einzugsband-m390` | **keine sichtbare Änderung**: Das Band beginnt bei y 780 px (Ansicht 844 px); die erste Abdeckung liegt bei y 817 px und damit unter der Bodenleiste. Die Regel „unterhalb des ersten Bildschirms“ greift nicht (OFFENE FRAGE) | 0,00 |
| `/standorte/wetzlar` einzugsband · d1440 | seite (Zeit; ganze Ansicht) | `einzel-standorte__wetzlar-einzugsband-d1440` | wie `/standorte` d1440 | 0,96 |
| `/ueber-uns` fugenband · d1440 | scroll (Durchgang 1970 bis 3699 px; Positionen 10/30/50/70/90 %) | `einzel-ueber-uns-fugenband-d1440` | Ganze Ansicht bei scroll_y 2143, 2489, 2835, 3180, 3526: Inhalt und Zeitleiste rücken mit dem Scroll | 8,32 |
| `/ueber-uns` fugenband · m390 | scroll (Durchgang 3571 bis 5348 px) | `einzel-ueber-uns-fugenband-m390` | Ganze Ansicht bei scroll_y 3749 bis 5170: Jahresmarken 2008, 2014, 2019, „Heute“ wandern durch das Bild; roter Strich an der Zeitleiste ist je Bild unterschiedlich lang | 13,01 |
| Kompatibilität: `/ueber-uns` fugenband · m390 mit `--ausschnitt ansicht` | scroll | `kompat-ueber-uns-fugenband-m390-ausschnitt-ansicht` | identisch zur Zeile darüber (Werte 12,57/12,43/12,55/13,01); Befund „ohne Wirkung im Scrollmodus“ gesetzt | 13,01 |

## 2. Register und reduziert (m390 und d1440)

Register: `data-motion`-Elemente im DOM, gegen `_werkstatt/register.json`; Animationen ohne `data-motion` aus dem Lauf.

| Seite | Ansicht | data-motion-Elemente | gefundene Kennungen | unbekannt | Animationen ohne data-motion |
|---|---|---|---|---|---|
| `/` | m390 · d1440 | 199 | 8 | 0 | 0 |
| `/bad` | m390 · d1440 | 112 | 5 | 0 | 1 (m390) · 0 (d1440) |
| `/fliesen` | m390 · d1440 | 132 | 5 | 0 | 0 |
| `/standorte` | m390 · d1440 | 100 | 5 | 0 | 0 |
| `/ueber-uns` | m390 · d1440 | 90 | 5 | 0 | 1 |

Reduziert (`prefers-reduced-motion: reduce`): Bewegungsbefunde in allen zehn Läufen 0. `html.k-bewegung` ist dort korrekt nicht gesetzt.

| Seite | Ansicht | geprüft | unsichtbar | verdeckt durch Zustand |
|---|---|---|---|---|
| `/` | m390 · d1440 | 199 | 9 · 4 | 5 · 4 |
| `/bad` | m390 · d1440 | 112 | 5 · 2 | 5 · 4 |
| `/fliesen` | m390 · d1440 | 132 | 6 · 3 | 5 · 4 |
| `/standorte` | m390 · d1440 | 100 | 5 · 2 | 5 · 4 |
| `/ueber-uns` | m390 · d1440 | 90 | 5 · 2 | 5 · 4 |

## 3. Auffälligkeiten

1. **Zeitsteuerung der Laser-Animationen greift nicht (Einzelbilder).** `sig-kreuzlinie` m390 (Ordner `einzel-start-sig-kreuzlinie-m390`): Die roten Pixel (Logo-Rot oben ausgenommen, Bild 0 nur Logo: 1496) betragen 1496 · 18947 · 19254 · 19254 · 19254 (Bild 0 bis 4). Auf Produktion (4310, `prod-…` im Scratchpad) ergibt sich dasselbe Muster (6528 · 6988 · 6988 · 6988). Die Bilder 2 bis 4 sind also identisch und zeigen nicht die Stände 50, 75 und 100 %. Pause, CDP-Seek und Pause beim Entstehen (transitionrun) ändern das Bild bei composited Animationen und Übergängen nicht (geprüft am verband-Übergang). **Die Zeitmodus-Bilder für CSS-Animationen sind daher nicht streng an 0/25/50/75/100 % gebunden.**
2. **Einzugsband m390 zeigt keine Änderung** (siehe Tabelle). Befund ist genannt; OFFENE FRAGE zur Regel für den Auslöser „seite“.
3. **sig-plan-Folgen (Raster-Versatz) sind klein** (0,4 bis 2,2 %). Die Flucht ist in den Bildern nachvollziehbar, aber im Gesamtbild schwach.
4. **Farbübergänge an Links ohne Register:** `/bad` m390 (1 Eintrag, `a.text-kalk.underline`), `/ueber-uns` m390 und d1440 (1 Eintrag, `a.inline-block.py-1`, 59 Elemente), jeweils nur `outline-color`. Entspricht dem E3-Befund.
5. **`druck` mit reduzierter Deckkraft** im reduzierten Lauf: `/` d1440 Deckkraft 0,40; `/fliesen` m390 Deckkraft 0,50. Das Element ist per Selektor nicht zuzuordnen (`button`). Nicht bewertet, OFFENE FRAGE.
6. **Unsichtbare Elemente unter reduzierter Bewegung** sind überwiegend `display:none`: geschlossene Menüs (`aufklappen`, `zustand`) und mobile bzw. Desktop-Duplikate (`sig-kreuzlinie` 3 bei `/` m390, 1 bei `/` d1440).
7. **Bildrate:** nur Format-Kurzlauf `bildrate-start-m390` (drei Wiederholungen, `/`). Die Zahlen liefen unter Fremdlast durch die Prüfstufe-A-Läufe anderer Pakete und sind nicht vergleichbar; kein Befund.
