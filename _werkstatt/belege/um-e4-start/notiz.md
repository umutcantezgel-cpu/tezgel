# UM-E4-START · Notiz des Baumeisters (Wiederaufnahme nach Abbruch)

Arbeitskopie `…/start/baum`, Vergleich `…/start/vor` (Stand vor dem ersten Edit), Bau vorher `…/start/vorbau` (Port 4421), Bau nachher
`…/start/baum` (Port 4420). `S` = `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/start`.
Diff: `S/UM-E4-START.diff`.

## Wiederaufnahme
- Der abgebrochene Anlauf hatte alle elf Punkte begonnen (Quellen 01:14–01:41, Bau 01:42, Bilder `S/bilder/nach1`, `nach2`). Gesichtet
  mit `diff -ruN vor baum`; alles übernommen, außer was unten als „neu in diesem Anlauf“ steht.
- Alte PID-Dateien `server-4420.pid`/`server-4421.pid` ohne Beenden nach `S/alt-pid/` verschoben; eigene Server über `S/skripte/srv.sh`
  (PID-Dateien `srv-<port>.pid`, Stopp per Prozessgruppe). Bau über `S/skripte/bau.sh` (echte Kopie `node_modules_echt`, danach Verweis
  zurück und Kopie gelöscht).

## Neu in diesem Anlauf
1. **Startfoto ab lg nach Rechnung statt Pauschale** (`globals.css` `einstieg-foto-start`): Breite = (Bildschirmhöhe − Stufe 62 − 2,2 ×
   fs-7) × Seitenverhältnis, zwischen der Hälfte und zwei Dritteln der Spalte. Vorher (Pauschale 31 rem): d1440 716 px = 59 %.
   Nachher: d1440 797 px (66 %), d1920 910 px (2/3), t1024 617 px (2/3); Unterkante jeweils im ersten Bildschirm (889/900, 1008/1080,
   745/768). Dafür ab lg Knöpfe `mt-4` statt `mt-6` und Foto `pt-6` statt `pt-8` (Lot, Fuge und Kreuz gehen mit).
   Linke Fotokante in der Flucht des Ort-Satzes: d1440 321 zu 317 px, d1920 505 zu 507 px. t1024: 204 zu 124 px (siehe offene Fragen).
2. **Quadratmeter ab lg 1,65em statt 1,8em**: Die Zahl „100 cm“ stand auf t1024 und d1440 nur 4–6 px unter dem Kopf; jetzt 18–22 px
   (t1024 83/65, d1440 85/65, d1920 95/73).
3. **Startfoto wieder vorgeladen** (`Bildfeld.tsx` `Bildauswahl`): Für ein `<img>` in `<picture>` setzt React kein preload. Jetzt je
   Zuschnitt `preload()` aus `react-dom` mit sich ausschließender Medienabfrage (`(min-width: 1024px)` / `not all and (min-width: 1024px)`),
   `fetchPriority: high`. Geprüft: je Ansicht genau ein Abruf, und es ist die gezeigte Datei (`S/skripte/doppelt.mjs`:
   390@3 w=1200 klein, 412@1,75 w=750 klein, 1024 w=640 breit, 1350 w=828 breit, 1440@2 w=1920 breit, 1920 w=1080 breit).
   Ohne preload lag das Desktop-LCP im Median rund 70 ms höher (Zwischenmessung `S/lh-alt`).
4. **Anriss-Kreuz im Compositor** (`Ablauf.tsx`): Das Fugenkreuz der Treppe ist ein `<svg>`; Deckkraft und Größe eines svg animiert
   Chromium im Hauptthread. Spur (m390, DPR 2, CPU 4×, Geste wie bildrate): 245 Bilder mit Hauptthread-Animation in den ersten 5 s,
   ohne die Kreuz-Animation 84, ohne alle Anriss-Animationen 91. Das Kreuz steht jetzt in einem `span`, der animiert wird; danach über
   die ganze Geste 4 bzw. 86 Hauptthread-Bilder (vorher-Bau: 93).

5. **Lagenliste und Stimmenkarte nach Sichtprüfung der eigenen Bilder** (`Lage.tsx`, `Stimmen.tsx`): Mit Zeichnung zwei Spalten
   erst ab lg (auf t768 standen die Sätze neben der Zeichnung in vier bis fünf Zeilen, jetzt eine Zeile), Zeichnung unter 24 rem
   Listenbreite Stufe 16 (64 px) statt 96 px (m360 höchstens drei Zeilen). Versetzte Stimmenkarte: Wortlaut in der Höhe mittig, weil die Karten der
   Reihe gleich hoch sind und ein kurzer Ausschnitt sonst über leerer Fläche stand.

## Nacharbeit nach Prüfung A (17 Befunde; Bau 10 auf 4420, vorher-Bau 4421 unverändert)
Jeder Befund selbst nachgeprüft (eigene Messung `S/skripte/nachpruef.mjs`, Ergebnis `S/nachpruef-4420.log`; Bilder `S/bilder/nach9/`,
`S/bilder/nach10/`). Behoben:

1. **Spec „Wortlaut wörtlich“ (hoch).** Bestätigt (2 rote Specs). Entscheidung 8 verlangt den Ausschnitt bis zum letzten ganzen Satz; die
   Spec prüfte Gleichheit. Geändert in der Arbeitskopie `_werkstatt/werkzeuge/tests/funktion-navigation.spec.mjs` (Teil des Diffs, das
   Repository bleibt unberührt): Der gezeigte Text ist der Anfang des REVIEWS-Wortlauts; ist er kürzer, endet REVIEWS mit „…“ und der
   Ausschnitt an „.“, „!“ oder „?“; Reihenfolge wie `start.ts`. Nicht den vollen Text versteckt im DOM gelassen (dann hörte der Vorleser
   den abgebrochenen Satz, den das Auge nicht sieht). Specs jetzt grün (unten).
2. **Erste Stimme ohne Lob, leeres Drittel (mittel).** Bestätigt. `start.ts`: Peter P. und C. W. getauscht (Peter P. zuerst, beide
   ganzen Sätze Lob), `MARKIERUNG['peter-p'] = 'professionell und hochwertig'` (die Stelle steht im ganzen zweiten Satz; Wortlaut
   unverändert, nur Reihenfolge). Ab lg steht die Kennzeile (Bewertung, Zahl, Stand, Link „Alle Bewertungen bei Google lesen“) im
   freien ersten Drittel auf Höhe der Kopfzeile der Karte (absolut in der Hülle, DOM- und Fokusfolge unverändert), gestapelt über die
   neue Option `untereinander` von `Bewertungszeile` (nur hier gesetzt; ohne sie unverändert). d1440: Kennzeile x 112, Breite 405,
   oben bündig mit der Karte; die erste Karte füllt vier Zeilen. Unter lg wie bisher unter der Karte.
   Bild: vorher `S/pruef-A-bilder/abschnitte/d1440-abschnitt-kundenstimmen.png`, nachher `S/bilder/nach9/abschnitte/d1440-kundenstimmen.png`,
   `S/bilder/nach10/stimmen-t1024-d1920.png`, `S/bilder/nach10/abschnitte/*-kundenstimmen.png`.
3. **Nahaufnahme / MENSCHEN.md (mittel).** Bestätigt: Eintrag fehlte. `_werkstatt/MENSCHEN.md` UM-12 neu (keine scharfe Nahaufnahme im
   Bestand, Bitte um zwei bis drei Fotos aus der Nähe, Annahme: nur Raumfoto, kein Ausschnitt als Ersatz). Den vorgeschlagenen
   1:1-Ausschnitt als zweites Foto nicht gesetzt: Entscheidung 2 bindet das zweite Foto an eine echte Nahaufnahme im Bestand; die 84
   Originale sind Bildschirmfotos mit höchstens 1320 px Breite (geprüft), ein Ausschnitt wäre bei DPR 2 rund 150 CSS-px echte Fläche.
4. **Treppe: Gewicht (mittel).** Bestätigt. `Ablauf.tsx`/`bewegung.css` „anriss an der Treppe“: Wo die Linie ankommt, setzt sich das
   Kreuz rot und auf das Doppelte vergrößert (rote Kopie `treppe-kreuz-rot`, nur Deckkraft; `anriss-kreuz` jetzt dauer-3 mit Spitze
   scale 2 bei 25 %), der Schritt (Nummer, Titel, Satz) setzt sich mit (`treppe-schritt`, „Setzen“ 8 px, dauer-3, ease-setzen), mobil
   reißt je Schritt eine rote Stufe vom Lot am Kreuz zur Spalte der Nummer an (`treppe-tritt`, 24 px, steht auch im Ruhezustand).
   Nur opacity, scale, translate. Reduziert, ruhig, Notaus, Druck, erzwungene Farben, Zurück/Vor: alles steht ganz da (k-verlauf-Regel
   ergänzt, ohne das Zentrieren von Kreuz und Setzstufe anzutasten).
   Bilder: `S/bilder/nach9/treppe/montage-d1440.png`, `…/montage-m390.png` (100 bis 2000 ms), Einzelbilder `…/<gerät>-treppe-*.png`;
   vorher `S/pruef-A-bilder/montage/treppe-d1440.png`, `…/treppe-m390.png`.
5. **Treppe löst bei großer Schrift nicht aus (mittel).** Bestätigt im Code (Schwelle 0,5 der ganzen Höhe). `bewegung.ts`: `erreicht()`
   zählt bei einem Element, das höher als das Fenster ist, denselben Anteil des Fensters; Rückrufstufen in Zwanzigsteln bis zur
   Schwelle. Für Elemente bis zur Fensterhöhe bleibt es beim Anteil des Elements (gilt für alle sicht-Kennungen; dort war derselbe
   Fehler bei großer Schrift möglich). Gemessen nach vollständigem Durchscrollen: m390 100 % (ol 746 px), m360 150 % (1605), m390 175 %
   (2015), m390 200 % (2575), m360 200 % (3066 bei 640 Höhe), t768 200 %, d1440 100 % und 200 %: alle `an`, Linie, Kreuz, Schritt
   ganz da (`S/nachpruef-4420.log`). Register-Kommentar zu `schwelle` ergänzt.
6. **Kreuz 7 bis 9 px unter der Linie (mittel).** Bestätigt. Beide svg füllen die Hülle absolut (`absolute inset-0 size-full`). Gemessen:
   Mitte svg = Mitte Hülle (0,0 px) auf allen acht Szenarien, Kreuz zur Linie 1 px (Linie 2 px über der Kante, Kreuz auf der Kante).
7. **H1 links der Achse (gering).** Bestätigt. Ab md hängt das Maß absolut rechts außen an der H1, die H1 steht mittig: Versatz der H1
   zur Achse jetzt 0 auf q844, t768, t1024, d1440, d1920 (vorher −39 bis −124 px), m390 −25,5, m360 −23,5 (unter md reicht die Spalte
   nicht, dort Gruppe mittig wie bisher). Grenzen der Zeilengröße (titel-spalte) ab md 9,2cqi, ab lg 7,7cqi, damit Zeile und Maß in die
   halbe Spalte passen; bei 100 % greift keine (Schriftgrößen unverändert, t1024 71,2 px). Kein Überlauf (scrollWidth = Breite auf
   allen sieben Geräten). Flucht der Fotokante auf t1024 nicht geändert (siehe nicht behoben).
   Bilder: `S/bilder/nach10/oben/<gerät>.png`, Übersicht `S/bilder/nach10/oben-montage.png`.
8. **Leistungszeile 3 + 1 (gering).** Bestätigt. Ab md zwei mal zwei in zwei gleich breiten Spalten, mittig; das Band ab lg 64 statt
   96 px über und unter dem Inhalt (nur mit Leistungszeile, also nur `/`). Bild: `S/bilder/nach9/abschnitte/d1440-was-wir-tun.png`.
9. **Glasbild ohne Maus deckt die Hälfte (gering).** Bestätigt. Mit `data-verlauf` ohne Maus nur der Name auf dem Verlauf („Ansehen →“
   nur für den Vorleser, die Kachel ist der Link), Auslauf 8 statt 12 Einheiten: t1024 rund ein Drittel der Kachel. Mit Maus
   unverändert. Bild: vorher `S/pruef-A-bilder/abschnitte/t1024-abschnitt-unsere-arbeiten.png`, nachher
   `S/bilder/nach9/abschnitte/t1024-unsere-arbeiten.png`, `…/t768-unsere-arbeiten.png`.
10. **q844: Maß fehlt, Foto spät (gering).** Bestätigt. Flach steht die Fliese klein (0,85em, ohne Bemaßung und Zahl, sonst im Kopf)
    hinter der einzeiligen H1 auf der Schnur; Knöpfe 12 statt 24 px, Foto 16 statt 32 px Abstand (nur Startseite). Foto oben 215 statt
    243 px. Knöpfe neben die Ort-Zeile: nicht möglich (Ort 452 + Hauptknopf 250 + Anruf 300 px > Spalte 812 px).
11. **Startfoto ohne unscharfen Platzhalter (gering).** Bestätigt. `Bildauswahl` gibt `getImageProps` jetzt `placeholder: 'blur'` mit den
    blur-Daten des kleinen Zuschnitts (deckend, auch unter dem großen Zuschnitt). Lighthouse: CLS 0, LCP nicht schlechter (unten).
12. **KERN K-008 ↔ Register (gering).** Bestätigt. Zeile `anriss` in `_werkstatt/KERN.md` ergänzt (Treppe, dauer-3/dauer-1, Schwelle bei
    hohen Elementen, reduziert), `register.ts` und `register.json` gleichlautend ergänzt (Test „register.json = register.ts“ grün).
    Hinweis: KERN-Version nicht angehoben, das entscheidet der Orchestrator beim Übernehmen.

## Nicht behoben (mit Begründung)
- **Rhythmus der Bänder (gering):** kein kleiner Eingriff. Zwei gleichfarbige Bänder hintereinander ändern Kanten (data-kante,
  Kantenkreuze) und die Abschnittsmarke des Leitfadens (nur auf Kalk); ein anderer Kopf für Galerie oder Einsatzorte ist eine
  Gestaltungsentscheidung nach K-016. Teilweise eingelöst: Stimmen jetzt mit gefülltem Drittel, Leistungsband niedriger.
- **Cookies-Feld (gering):** E-089 legt Ort und Breite fest (Feld 16 Stufen, in der Leiste, M-28 freigegeben); die Prüfung bestätigt die
  Stabilität. Umstellen nur durch Orchestrator oder Auftraggeber.
- **Startfoto bei DPR 2 weich (gering):** bestätigt (Original 1312 bzw. 1320 px, mehr gibt der Bestand nicht). Höhere Qualität hieße
  `images.qualities` in `next.config.ts` (KERN K-004, gemeinsame Datei); das Foto auf 1,0-fach zu begrenzen hieße rund 656 statt 797 px
  auf d1440 gegen Entscheidung 2. Gehört zu UM-12 (Originaldateien der Kamera).
- **Mobil lang (gering):** bestätigt (m390 15 Bildschirmhöhen). Lage-Zeilen auf 64 px hieße die Sätze eine Stufe kleiner (fs-3 statt fs-4)
  oder ohne Zeichnung (gegen Entscheidung 5), für rund 120 px; die Einleitung kürzen ändert Wortlaut (G8). Nicht gemacht.
- **Fotokante t1024 (Teil von Befund 7):** Flucht von Ort-Satz (124) und Foto (204) nur durch Umbruch der Ortszeile oder ein Foto unter
  dem Falz erreichbar; wie bisher offen.
- **CSS-Aufteilung (gering, Hinweis):** bestätigt, kein Handlungsdruck für das Paket (Prüfer); weiterhin zwei CSS-Dateien.

## Entscheidungen, umgesetzt wie
(Bildpfade: vorher `S/bilder/vor/…`, nachher `S/bilder/nach/…`)

1. **Erster Bildschirm mobil zeigt die Arbeit.** Reihenfolge in der Figur auf jeder Breite: H1, Ort, Orte-Link, Hauptknopf, Telefon,
   Foto; Vorspann und Bewertung per `order-last` darunter (DOM-Reihenfolge wie bisher, dazwischen nichts Fokussierbares). Abstand
   Orte-Link → Hauptknopf `mt-3` (12 px) wie Ort → Link. m390: Foto 467–705 px, ganz über der Leiste (783). m360: 461–678 (Leiste 680).
   Das Foto bleibt LCP (Lighthouse mobil: `picture > img.block`) und ist vorgeladen. Mobil ein Querformat 3 : 2 desselben Raums
   (IMG_2569), da es im ersten Bildschirm ganz steht; das bisherige Hochformat (Dusche ohne Stufe) läge mobil zur Hälfte unter dem Falz.
   Bilder: vorher `S/bilder/vor/wiederbesuch/m390/start/00.png`, nachher `S/bilder/nach/wiederbesuch/m390/start/00.png`,
   `S/bilder/nach/erstbesuch/m390-eingang-1500.png`.
2. **Startfoto am Desktop.** Echtes Querformat aus den 84 Originalen: IMG_2569 (Dachgeschossbad, Dusche hinter Glaswand, beige
   Großformat an Wand und Boden, Original 1320 × 880). Kandidaten gesichtet (`S/kandidaten/m1.png`, `m2.png`): IMG_2560, 2569, 2570, 2578,
   2580, 2584, 2590, 2593, 2599, 2602, 2605, 2610; 2569 zeigt Boden und Wand ganz und ist eine fertige Arbeit (2570 gleiche Aufnahme-
   situation mit Wanne, Herkunft in M-08 offen; 2578 ist das bisherige Startbild/ Galerie). Ab lg Zuschnitt 16 : 9 (oben um die
   Dachschräge gekürzt, 1312 × 738), unter lg 3 : 2 (1320 × 880), Bildauswahl per `<picture>` (next/image `getImageProps`, Art Direction
   nach der Next-16-Doku), je Ansicht genau eine Datei. Größe und Flucht siehe „Neu“ 1. Oberkante hängt an einer Fuge, die das Lot an
   seinem Ende mit einem Fugenkreuz kreuzt (ab sm). Zweites Foto „ganz und nah“: nicht gesetzt, im Bestand liegt keine scharfe
   Nahaufnahme von Fuge oder Kante (alle Kandidaten sind Raumansichten).
   Bilder: vorher `S/bilder/vor/wiederbesuch/d1440/start/00.png`, nachher `S/bilder/nach/wiederbesuch/d1440/start/00.png`,
   `…/d1920/start/00.png`, `…/t1024/start/00.png`.
3. **H1 an der Schnur.** Grundlinie der letzten Zeile auf der Schnur (`schnur-grundlinie`: die Zeile rückt um halben Durchschuss plus
   Unterlänge, 0,216 em); gemessen Grundlinie = Oberkante der Schnur auf allen sieben Geräten (z. B. d1440 278,2/279, m390 170,7/171).
   Quadratmeter als Nachbar der H1 in derselben Schriftstufe, außerhalb der H1 (Wortlaut A-1 unverändert): ab lg 1,65 em mit Maß oben
   und links, unter lg 1,1 em mit Maß oben. Ab md H1 fs-7 (t768 58,4 px statt 40,9 px). Das rote Lotstück reicht bis an die Oberkante des
   Fotos (Lot-Ende = Fototop − 1 px auf allen Geräten). Schnur mobil und bei DPR 1 2 px.
4. **Leitfaden mit Präsenz.** Der rote gezogene Teil ist bereits 2 px (`.leitachse-rot`, gemessen m390 x = 14/15). Lot mobil auf der
   Satzkante (`Seitenformel lot="satzkante"`, Haken `achse` an `ACHSE_LAGE`): rotes Stück 14–16 px, Kreuze mittig darauf, Treppe geht
   mit (`treppe-auf-lot`). Kantenkreuz rot über `kante-rot` (unverändert, Einrasten ±24 px um die Leselinie, alle Breiten), geprüft
   mit Kante genau auf der Leselinie (40 %): `.kreuz-rot` Deckkraft 1, `.kreuz-grund` 0 an #ablauf und #kundenstimmen auf m390, t1024,
   d1440 (`S/skripte/kante.mjs`, Bilder `S/bilder/nach/kante/<gerät>-kante-<abschnitt>.png`). Kein Schärfen nötig.
   Ruhige Fassung unverändert (bewegung.mjs `--schalter ruhig`: 0 Bewegungsbefunde).
5. **Eine Auswahlebene.** Plan-Zeichnungen links in den Zeilen von „Was möchten Sie ändern?“ (Dusche → bad, Bad alt → untergrund,
   Neubau → wohnen, Fliese gesprungen → reparatur, Balkon → aussen, Treppe → treppe, neu gezeichnet in der Sprache der Vignetten, ohne
   Rot); Ziele gleich. „Wir kümmern uns …“: Kopf mittig, die vier Leistungen als eine Zeile mit Links (Touch-Ziel ≥ 44 px).
   Seitenhöhe m390 12521 → 11854 px; Ablauf beginnt bei 2482 statt 2984 px.
   Bilder: `S/bilder/nach/abschnitte/<gerät>-ihre-lage.png`, `…-was-wir-tun.png`.
6. **Moment in der Mitte.** Treppe „So kommen Sie …“ mit `data-motion="anriss"`: je Stufe `dauer-3` mit `ease-setzen`, zuerst Setzstufe
   (`dauer-1`, ab lg) und Fugenkreuz, dann Lauf bzw. mobil das Lot herab; nur `scale` und `opacity`, Compositor (siehe „Neu“ 4).
   Reduziert, ruhig, Notaus, ohne JS, Zurück/Vor (`k-verlauf`): Linie voll. Register `anriss` um `--dauer-3`/`--dauer-1` ergänzt
   (`register.ts` und `_werkstatt/register.json` gleich). Auslöseschwelle: die des Registers für `anriss`, 0,5 (siehe offene Fragen).
   Bilder: `S/bilder/nach/treppe/d1440-treppe-0100.png` … `-2000.png`, `…/m390-treppe-*.png`.
7. **Galerie ohne Hover.** `fotosVerlauf` → `data-verlauf` am Glasbild: Ohne Maus auf jeder Breite der kurze Verlauf (wie mobil), der
   Block unter dem Foto nur noch bei Kachel < 16 rem (große Schrift). Desktop mit Hover unverändert.
   Bild: vorher `S/bilder/vor/abschnitte/t1024-unsere-arbeiten.png`, nachher `S/bilder/nach/abschnitte/t1024-unsere-arbeiten.png`.
8. **Kundenstimmen.** Karte ab lg in Spalte 2–3 von 3 (um ein Drittel versetzt). Ausschnitt bis zum letzten ganzen Satz
   (`bisSatzende`); für alle acht Stimmen geprüft: jeder Ausschnitt ist ein Präfix des Wortlauts aus REVIEWS und endet an „.“ oder „!“.
   FS-K Nr. 12: Versalwörter in `span.hyphens-none` (`versalien`), Wortlaut gleich.
   Bild: vorher `S/bilder/vor/abschnitte/d1440-kundenstimmen.png`, nachher `S/bilder/nach/abschnitte/d1440-kundenstimmen.png`.
9. **Leiste „Cookies“.** `#leiste-schild` trägt serverseitig ein ruhendes Schloss mit „Cookies“ (`inert`, `aria-hidden`), das per
   `:has(> button)` zurücktritt, sobald die Einwilligung ihren Knopf einhängt; während des Banners bleibt es stehen. Folge beim Erstbesuch
   (m390, q844, je 14 Bilder à ~160 ms): vorher Knopf → leer (sichtbares Verschwinden), nachher Platz → Knopf → Platz, gleiche Gestalt
   (`S/bilder/nach/leiste/leiste.json`, Bilder `…/leiste/*.png`; vorher `S/bilder/vor/leiste/`). q844: Zeichen und Wort in einer Zeile.
   Verhalten der Einwilligung unverändert (Specs unten).
10. **Trennfugen FS-K Nr. 2 und 6.** `Festpreisangebot`, `Verbundabdichtung` in `FUGEN`; `mitFugen` in `Tun.tsx` (Namen, Punkte über
    `Textmarken fugen`) und `Ablauf.tsx` (Titel, Sätze).
11. **Hauptthread-Schub ~2,7 s.** Siehe Abschnitt „Spur“.

## Spur zum Hauptthread-Schub (Punkt 11)
Werkzeuge: `S/skripte/spur.mjs` (Geste wie `bewegung.mjs --modus bildrate`, m390, DPR 2, CPU 4×), `spur_bilder.py`, `main_summe.py`
(PipelineReporter `has_main_animation` je Fenster), Ausschlussläufe per eingefügtem CSS.
- Vorher-Bau: 93–100 Bilder mit Hauptthread-Animation bei 2,5–3,5 s nach Beginn der Geste, reproduzierbar (4 Läufe).
- Nicht die Ursache: alle CSS-Animationen und -Übergänge aus (`*{animation:none;transition:none}` → 95), Plan-Vignetten, Leitfaden,
  Kopf, Leiste, Next-Vorabruf der Links (`_rsc` gesperrt → 100), requestAnimationFrame/`Element.animate`/`scrollTo` aus Seitenskript
  (während der Geste 0 Aufrufe).
- Ort: Abschnitt ausblenden verschiebt den Schub (`#was-wir-tun`, `#ihre-lage`, `#ablauf` → früher), `#unsere-arbeiten` oder seine
  Reihe ausblenden → 0. Eine Karte reicht. Auslöser: das Galeriebild mit Hintergrund (Platzhalter) beim Eintritt in den Ladeabstand
  (`loading="lazy"`): `img{background-image:none}` → 0; jeder Hintergrund (Blur-SVG, Raster-WebP/PNG als Daten-URL, Verlauf) → ~100.
- Bewertung: Verhalten von Chromium beim Laden eines faulen Bildes mit Hintergrund, nicht im eigenen Code. Der unscharfe Platzhalter ist
  KERN-Regel (K-006 „unscharfer Platzhalter“); Wegnehmen wäre keine kleine Behebung. Die Bilder werden dabei nicht verworfen
  (partial 1–5 je 500 ms wie sonst), Bildrate < 1 %. Befund, nicht behoben.
- Eigener Anteil behoben: das Anriss-Kreuz (siehe „Neu“ 4).

## Messwerte (vorher 4421 / nachher 4420, im Wechsel)
Lighthouse `/` (je Aufruf 1 Aufwärmlauf + 1 gezählter Lauf, abwechselnd vorher/nachher, frisches Profil, allein auf dem Rechner;
`S/lh/<satz>/lighthouse.json`, LCP simuliert in ms):

| Reihe | Bau nachher | mobil vorher | mobil nachher | Desktop vorher | Desktop nachher |
|---|---|---|---|---|---|
| A (`S/lh-alt` war ohne preload, verworfen; A = `S/lh-zwischen`) | preload, vor den Layout-Korrekturen | 2901 · 2416 · 2690 → **2690** | 2418 · 2683 · 2703 → **2683** | 572 · 631 · 619 · 573 · 608 → **608** | 593 · 636 · 630 · 720 · 630 → **630** |
| B (`S/lh-bau5`) | mit Lage/Stimmen-Korrektur (w-20) | 2909 · 2683 · 2917 → **2909** | 2683 · 2846 · 2696 → **2696** | 577 · 635 · 678 · 613 · 572 → **613** | 587 · 676 · 636 · 735 · 598 → **636** |
| C (`S/lh`) **Endbau** | Endstand | 2680 · 2921 · 2678 → **2680** | 2699 · 2852 · 2843 → **2843** | 631 · 720 · 639 · 576 · 533 → **631** | 597 · 589 · 745 · 619 · 571 → **597** |
| alle drei gepoolt | | Median 2690 (9 Läufe) | Median 2699 (9) | Median 613 (15) | Median 630 (15) |

- CLS 0 in allen Läufen; LCP-Element vorher `div.relative > figure > div.border > img.block` (Hochformat), nachher
  `figure > div.border > picture > img.block` (Querformat, vorgeladen).
- Bewertung: mobil gleich (gepoolt +9 ms, Reihe C allein +163 ms, Reihe B −213 ms), Desktop gepoolt +17 ms, Reihe C −34 ms. Die
  Einzelläufe streuen um ±100 ms. Ziel ≤ 2,5 s mobil: weder vorher noch nachher erreicht.
- Befund CSS-Aufteilung: Der Endbau liefert zwei render-blockierende CSS-Dateien (`2cjly9x94-xma.css` 133 189 B und
  `0nxicmqezp7pl.css` 478 B, nur die zwei `@font-face` von next/font), vorher eine (129 046 B). Probe-Bau mit 9,5 KB weniger CSS
  (130 060 B): wieder eine Datei. Turbopack legt also ab etwa 131 KB nicht mehr zusammen; die zusätzliche Anfrage kostet im
  simulierten Desktop-LCP (HTTP/1.1 lokal) vermutlich die rund 20 ms. Nicht behoben (es hinge an jedem künftigen Wachstum des CSS;
  `experimental.cssChunking` in `next.config.ts` ist eine gemeinsame Datei).

Bildrate `bewegung.mjs --modus bildrate --seite /` (m390, DPR 2, CPU 4×, Median der Anteile verworfener Bilder aus 3 Wiederholungen;
`S/bew/bildrate-*/ergebnis.json`, frühere Reihe `S/bew-alt/`):

| Reihe | vorher | nachher |
|---|---|---|
| 1 (Bau mit preload) | 0,27 % [0,27 · 0,27 · 0,07] · 0,07 % [0,2 · 0,07 · 0] | 0,07 % [0,15 · 0 · 0,07] · 0,15 % [0,15 · 0,07 · 0,22] |
| 2 (Bau 5/6, gleicher Quelltext wie Endbau bis auf w-16) | 0,07 % [0,54 · 0 · 0,07] · 0 % [0,41 · 0 · 0] | 0,22 % [0,22 · 0 · 0,95] · 0,07 % [0,66 · 0 · 0,07] |

Alle unter 1 %. LoAF: vorher 0–1, nachher 0–2 je Lauf.

`bewegung.mjs` auf `/` (m390):
- register: vorher 8 Kennungen, nachher 9 (`anriss` neu), `unbekannt` [], ohne Register 0 (beide).
- reduziert (`prefers-reduced-motion: reduce`): Bewegungsbefunde 0 vorher und nachher; „unsichtbar“ 12/12 (gleiche, vorbestehende
  Elemente: Menü, WhatsApp-Knopf, Kopfblätter), geprüft 224/225.
- ruhig (`--schalter ruhig`): Bewegungsbefunde 0/0, unsichtbar 10/10.

Spur Hauptthread (eigene Messung, m390, DPR 2, CPU 4×, ganze Geste, Bilder mit `has_main_animation`): vorher 93–100, nachher mit
Anriss-Fix 4–86 (ohne Fix 245).

Geometrie erster Bildschirm nachher (`S/skripte/geometrie.mjs`, px): siehe „Neu“ 1–2 und Entscheidung 1 und 3.

## Prüfungen
Nach der Nacharbeit, alle in `S/baum` auf Bau 10 (Node 24.22.1):
- `npm test`: 249 Tests, 249 bestanden, 0 fehlgeschlagen (`S/npm-test-2.log`).
- `npx tsc --noEmit` (mit vorübergehender `next-env.d.ts`): Exit 0, keine Ausgabe.
- `npx eslint`: Exit 0, keine Ausgabe.
- `werte.mjs --arbeitsbaum --dateien <27 geänderte .ts/.tsx/.css>`, aus der Arbeitskopie gestartet (`S/baum/_werkstatt/werkzeuge/
  werte.mjs`, damit die Pfade der Arbeitskopie und die Ausnahmen gelten): 0 Befunde (`S/werte/2026-10-30T08-36-46-519Z.json`). Hinweis:
  Mit dem Werkzeug des Repositorys und relativen Pfaden liest werte.mjs die Dateien des Repositorys, mit absoluten Pfaden greifen die
  Ausnahmen nicht (4 Scheinbefunde `0.01ms` in den vorbestehenden Ruhig-Regeln).
- Specs gegen 4420 (`funktion-navigation` mit der geänderten Stimmen-Spec, `funktion-hero-kontakt`, `funktion-einwilligung`,
  `funktion-tracking`, `funktion-kontaktwege`, `verlegen`), gestartet aus `S/baum/_werkstatt/werkzeuge` (node_modules des Repositorys
  verlinkt, danach entfernt): **191 bestanden, 17 übersprungen, 0 fehlgeschlagen** (`S/specs/nach10/lauf.log`).
- `funktion-tracking` und `funktion-einwilligung` gegen eine Kopie mit `NEXT_PUBLIC_GA4_ID=G-TEST000000` (Port 4311, `RELAUNCH_TRACKING=1`,
  `--workers=1`): 44 bestanden (`S/specs/tracking-n10/lauf.log`). Kopie danach gelöscht.
- Danach `.next` und `node_modules_echt` gelöscht, Server 4420, 4421, 4311 per Prozessgruppe beendet.

### Messwerte der Nacharbeit (vorher 4421 / nachher 4420, im Wechsel, allein auf dem Rechner)
Lighthouse `/`, je Aufruf 1 Aufwärmlauf + 1 gezählter Lauf, frisches Profil, 4 Paare je Form (`S/lh-n10/<satz>/lighthouse.json`):

| Form | vorher LCP (ms) | Median | nachher LCP (ms) | Median |
|---|---|---|---|---|
| mobil | 2693 · 2706 · 2904 · 2936 | **2805** | 2849 · 2682 · 2701 · 2415 | **2692** |
| Desktop | 642 · 588 · 642 · 606 | **624** | 583 · 634 · 752 · 553 | **609** |

CLS 0 bis 0,0015 (vorher und nachher je ein Lauf mit Kleinstwert am Kopf-Symbol, vorbestehend). LCP-Element nachher
`figure > div.border > picture > img.block`. Ziel ≤ 2,5 s mobil weiter nicht erreicht (vorher wie nachher).

`bewegung.mjs` auf `/` (m390; `S/bew-n10/`):
- bildrate (3 Wiederholungen): vorher 0,14 % [0,74 · 0,14 · 0,14], nachher 0,29 % [0,29 · 0 · 0,71]; alle unter 1 %.
- register: vorher 8 Kennungen, nachher 9, unbekannt 0, ohne Register 0.
- reduziert: Bewegungsbefunde 0/0, unsichtbar 12/12 (vorbestehend), geprüft 224/225.
- ruhig (`--schalter ruhig`): Bewegungsbefunde 0/0, unsichtbar 10/10.

Die Messwerte des ersten Durchgangs (Reihen A bis C) oben bleiben als Verlauf stehen; gültig für den Endstand sind diese.

## Offene Fragen
1. **[erledigt in der Nacharbeit: Spec in der Arbeitskopie auf Präfix + Satzende umgestellt, Orchestrator übernimmt sie mit dem Diff]** **Spec „Wortlaut wörtlich“** (`funktion-navigation.spec.mjs:276`): Nach Entscheidung 8 muss sie Präfix plus Satzende prüfen statt
   Gleichheit; sonst bleibt sie rot. Alternative wäre, den vollen Text im DOM zu lassen und nur sichtbar zu kürzen (nicht gemacht).
2. **[erledigt: Peter P. zuerst, Markierung „professionell und hochwertig“]** **Hervorhebung der ersten Stimme entfällt:** Bei C. W. steht „ordnungsgemäß, sauber und pünktlich“ im zweiten Satz, der beim
   Anbieter mit „…“ abbricht; der Ausschnitt endet darum nach „Die Firma Tezgel hat für mich zwei Bäder saniert.“ ohne Markierung.
   Wenn die Hervorhebung bleiben soll: Reihenfolge der Stimmen ändern (z. B. U. T. mit vier ganzen Sätzen zuerst) und dort ein
   Schlüsselwort markieren. Das ist eine Inhaltsentscheidung (Reihenfolge, Spec mit fester Reihenfolge).
3. **Auslöseschwelle der Treppe** (weiter offen; seit der Nacharbeit gilt sie bei Elementen, die höher als das Fenster sind, für den
   Anteil des Fensters): Briefing 40 %, Register und KERN K-008 für `anriss` 50 % (Test `bewegung.test.mjs` prüft 0,5). Die
   Schwelle hängt an der Kennung; 0,4 hieße Register, Test und KERN ändern (auch für die Markierung in Kundenstimmen). Gebaut mit 0,5.
4. **Flucht der Fotokante auf t1024:** Dort ist das Foto auf zwei Drittel begrenzt (617 px), die Zeile Ort + Orte-Link 776 px breit:
   Fotokante 204, Ort-Satz 124 px. Exakt ginge nur, wenn die Zeile umbricht oder das Foto unter den Falz wächst. Auf d1440/d1920
   in der Flucht (± 4 px).
5. **Desktop-LCP und CSS-Aufteilung:** gepoolt +17 ms (613 → 630), vermutlich die zweite CSS-Datei (Turbopack ab ~131 KB). Ziel
   „nicht schlechter“ damit im Rauschen; ob `experimental.cssChunking` oder ein CSS-Schnitt sinnvoll ist, entscheidet der Orchestrator.
   Mobil ≤ 2,5 s weiterhin nicht erreicht (2,7 s vorher wie nachher).
6. **Restschub Hauptthread:** ~95–100 Bilder beim Eintritt der Galerie in den Ladeabstand, Ursache Hintergrund (Platzhalter) der faulen
   Galeriebilder in Chromium; Platzhalter ist KERN-Regel. Nicht behoben, Beleg oben.
7. **Startfoto IMG_2569:** gleicher Raum wie IMG_2570 (M-08: Herkunft offen, Annahme „verwenden“). Im Bild Flaschen in der Nische
   (Marken nicht lesbar, bildinventar). Ab lg bei DPR 2 lädt w=1920 aus einem 1312 px breiten Original (nicht hochskaliert, leicht weich).
8. **Leitfaden 2 px:** Das rote gezogene Stück war schon vorher 2 px auf allen Breiten (auch Desktop DPR 2); das Briefing nahm 1 px an.
   Unverändert gelassen, neu ist 2 px nur für die Schnur (mobil und DPR 1).
9. **[MENSCHEN.md UM-12 eingetragen]** **Zweites Foto „ganz und nah“:** keine scharfe Nahaufnahme von Fuge oder Kante im Bestand; nicht gesetzt.

## Bildsätze (Endbau, PNG, Sperre, Einwilligung abgelehnt bzw. beim Leisten-Lauf ohne Einwilligung)
- Wiederbesuch mit Bewegung, ganze Seite: `S/bilder/nach/wiederbesuch/<gerät>/start/NN.png` (m360, m390, q844, t768, t1024, d1440,
  d1920); vorher `S/bilder/vor/wiederbesuch/…` (aus dem abgebrochenen Anlauf, vorbau unverändert).
- Erstbesuch (voller Eingang, eingefroren bei 0 … 1500 ms): `S/bilder/nach/erstbesuch/<gerät>-eingang-<ms>.png`; vorher
  `S/bilder/vor/erstbesuch/…`.
- Abschnitte (Endzustand): `S/bilder/nach/abschnitte/<gerät>-<abschnitt>.png`; Leiste `S/bilder/nach/leiste/`; Treppe
  `S/bilder/nach/treppe/`; Kantenkreuz `S/bilder/nach/kante/`; erster Bildschirm Zwischenstand `S/bilder/nach3/oben/`.
- Selbst gesichtet: erster Bildschirm aller sieben Geräte (Erst- und Wiederbesuch), Lage, Was wir tun, Treppe (Folge), Galerie t1024,
  Stimmen d1440/d1920, Leiste m390/q844. Keine Überläufe (`scrollWidth` = Breite auf allen sieben Geräten).
- Nacharbeit: `S/bilder/nach9/` (Abschnitte Stimmen, Tun, Galerie auf m390, t768, t1024, d1440; Treppe mit Bewegung und Montagen),
  `S/bilder/nach10/` (erster Bildschirm m390, q844, t768, t1024, d1440, d1920 und Montage; Stimmen auf fünf Geräten). Selbst gesichtet:
  Stimmen d1440, t1024, d1920; Tun d1440; Galerie t1024; Treppe d1440 und m390 als Folge; erster Bildschirm d1440, t1024, q844.
