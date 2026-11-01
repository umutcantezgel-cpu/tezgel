# UM-E4-SICHT-FIX-2-r · Reparatur nach der Gesamtsicht · Notiz des Baumeisters

- **Stand:** Arbeitskopie `$SCRATCH/sfix2/r/baum` (Abzug von 990b01e0), Vergleich gegen `$SCRATCH/sfix2/r/vor` (unverändert). Produktionsbau auf 4560, vorher 4325 (990b01e0).
- **Diff:** `$SCRATCH/sfix2/r/UM-E4-SICHT-FIX-2-r.diff` (`diff -ruN vor baum`, ohne node_modules, node_modules_echt, .next, bilder, next-env.d.ts, tsconfig.tsbuildinfo). 9 Dateien. `patch -p1 --dry-run` gegen HEAD 93fa042a: sauber.
- **Dateien:** `src/inhalte/bad.ts`, `src/inhalte/barrierefreies-bad.ts`, `src/inhalte/fliesen.ts`, `src/app/bewegung.css`, `src/app/globals.css`, `src/components/vorlagen/teile/Tun.tsx`, `src/components/vorlagen/teile/Lage.tsx`, `src/app/(bestand)/ueber-uns/page.jsx`, `src/components/kern/Einzugsband.tsx`.
- **Wortlaut:** unverändert (K-011). Neuer sichtbarer Text entsteht nicht. Die Unterschrift „Wanne unter weißen Fliesen“ ist der Eintrag aus a3c28d36, „Dusche mit Mosaikboden und Eckbank“ ebenso. G8 unberührt. Kein zusätzliches JavaScript. Keine neue Kennung, keine neue Bewegung, kein Registereintrag nötig.
- **Bilder** (alle PNG, DPR 1):
  - Bildsatz vorher `$SCRATCH/sfix2/r/bilder/vor/<gerät>/<slug>/NN.png` (4325) und nachher `…/bilder/nach/…` (4560). Acht Ansichten (/bad, /bad/barrierefreies-bad, /bad/badsanierung, /leistungen, /fliesen, /referenzen, /ueber-uns, /standorte/wetzlar) je d1440, m390, t768, q844 und t1024. Dazu /fliesen m360 sowie /bad und /bad/barrierefreies-bad bei m360 und d2560.
  - Gegenüberstellungen `$SCRATCH/sfix2/r/bilder/vergleich/` (R1- bis R10-…, links vorher, rechts nachher). Dazu die Kandidatenbögen mit eingezeichnetem Falz: `R1-kandidaten-bad-falz.png`, `R2-kandidaten-dusche-falz.png`. Rot 58 % (d1440 barrierefrei), orange 65 % (d1440 /bad), blau 74 % (m390).
  - Erster Bildschirm auf sieben Breiten, oben vorher, unten nachher: `$SCRATCH/sfix2/r/bilder/erster-bildschirm/bad-vor-nach.png` und `bad__barrierefreies-bad-vor-nach.png`.
  - Raumliste als Element vorher/nachher: `bilder/element/fliesen-raumliste-{vor,nach}-{d1440,t768,m360}.png`.
  - Pixelvergleich je Ausschnitt: `$SCRATCH/sfix2/r/arbeit/pixel-summary.txt`.

## 1 Maßnahmen und Stand

### R-1 /bad Einstiegsfoto · umgesetzt (Rückweg auf bad-beleg-1)
- `bad.ts`: `worum.bild` von 'bad-beleg-2' zurück auf 'bad-beleg-1' (Fassung a3c28d36, Kommentar mit Grund und Rückweg).
- In `beleg.fotos` steht an Platz 3 statt bad-beleg-1 wieder der Eintrag aus a3c28d36: `{ bild: 'bad-beleg-2', unterschrift: 'Wanne unter weißen Fliesen', href: '/bad/badsanierung' }`. Die Reihenfolge nach M2-B1 (helles Bad vorn) bleibt, siehe EV-R1b. Kein Foto steht zweimal auf der Seite.
- **Wahl belegt:** Die Kandidatenbögen zeigen alle Güte-A/B-Fotos mit Falzlinien.
  - Nur bad-beleg-1 zeigt die Fliesenarbeit oberhalb von 58 bis 65 %: Wannenschürze in weißen Metrofliesen mit Lichtlinie ab rund 15 %, Ornamentboden ab rund 45 %.
  - Verworfen:
    - bad-beleg-3: Boden erst ab rund 55 %, oben Tür, Waschtisch und Spiegel.
    - start-beleg-bad: Güte A, aber Helligkeit 0,35 unter der Untergrenze (M2-B1).
    - badsanierung-beleg-2: 13,4 % ausgefressen; Bildreihe auf /bad/badsanierung.
    - badsanierung-einstieg: Wanne erst ab 58 %; Bildreihe auf /bad/badsanierung und auf den Ortsseiten.
    - referenzen-einstieg: Marmorfliesen oben, darunter dominiert das Wand-WC; für /bad nicht geprüft.
- **Erster Bildschirm nachher:** Wanne mit Fliesenschürze und Ornamentboden auf m360, m390, t768, t1024, d1440 und d2560. Auf q844 (Bildschirmhöhe 390) steht ein Streifen mit Wannenkante und Metrofliesen, vorher nur Decke mit Spot.
- **Preis:** Die Flaschen oben rechts und der enge Ausschnitt (Sicht Anlauf 2, 1a/1b) kommen zurück. Bei DPR 2 ist bad-beleg-1 schärfer als bad-beleg-2 (800 statt 688 px Quelle, Notiz B Befund 5).

### R-2 /bad/barrierefreies-bad Einstiegsfoto · umgesetzt (Rückweg auf bereich-dusche-streifen-sitzbank)
- `barrierefreies-bad.ts`: `worum.bild` zurück auf 'bereich-dusche-streifen-sitzbank'.
- Die Galeriereihe steht wieder wie in a3c28d36: `barrierefrei-beleg-1` („Dusche mit Mosaikboden und Eckbank“) vor `bad-beleg-4`. Auf dem Telefon ist damit die erste Karte wieder die Dusche mit Mosaikboden; das erledigt nebenbei den Beobachtungsbefund 3 der Gesamtsicht zu m390.
- **Wahl belegt:** Laut Kandidatenbogen zeigt nur dieses Foto den stufenlosen Boden und die Bank oberhalb von 58 % (Boden ab rund 40 %).
  - start-galerie-1 (Güte A): Bank mit Mosaik ab rund 40 %, der Boden aber erst ab rund 72 %. Außerdem ist es der Aufmacher der Ortsseiten.
  - start-dusche: Boden erst ab rund 65 %, außerdem Einstieg von /bad/badsanierung.
  - barrierefrei-einstieg und leistungen-einstieg: liegen unter den Untergrenzen und werden nirgends verwendet.
  - bad-beleg-4: Boden im untersten Achtel (Notiz B, Zu 3).
- **Erster Bildschirm nachher:** dunkler stufenloser Duschboden mit Ablauf und Bank auf m360, m390, t768, t1024, d1440 und d2560. Auf q844 nur ein Streifen mit Wandfliesen und dunklem Fliesenstreifen, vorher Decke und Milchglasfenster.
- **Preis:** Das Foto ist grauer und weicher, und rechts im Bild liegt der blaue Gegenstand (Sicht Anlauf 2, 2a). Auf d1440 liegt er knapp am Falz.

### R-3 /leistungen Formatregler · umgesetzt (kleinster Eingriff)
- `bewegung.css` `.formatregler-wechsel { fill: var(--color-fuge) }` statt kalk, Kommentar nachgezogen. Das Schachbrett hat jetzt 255/228, rund 1,3 : 1 statt 1,1 : 1, und liest sich auf dem weißen Abschnitt als Fläche (`R3-formatregler-d1440-04.png`).
- Das optionale stärkere Fugenband ist nicht gebaut. Das Band in fuge verschwindet auf den Wechselfliesen, die jetzt selbst in fuge stehen, und auf den weißen Fliesen ist es als Saum sichtbar. Ein breiteres Band ließe die grauen Fliesen optisch in die weißen laufen.
- Kennung, Endzustand, Register und K-008 sind unverändert. Unter erzwungenen Farben gilt weiter Canvas.

### R-4 /fliesen Raumliste auf dem Telefon · umgesetzt (Telefonstufe wie LageZeichnung)
- `Tun.tsx`, Bereichszeilen: Das Feld ist jetzt `hidden w-16 shrink-0 @xs:block @sm:max-lg:w-24 lg:w-32`, die Karte innen `p-1 @sm:p-2 lg:p-2`. Der Platzhalter ist gleich gebaut. Beides steht als Konstanten `ZEILEN_FELD` und `ZEILEN_KARTE` im Modul.
- **Gemessen** (Feld, Textspalte):
  - m360 96 → 64 px, Text 176 → 208 px;
  - m390 96 → 64 px, Text 206 → 238 px;
  - t768 96 px wie bisher;
  - t1024 und d1440 128 px wie bisher (d1440 pixelgleich bis auf die Zeile mit den Mustern).
- „Flur und Diele fliesen“ steht auf m360 jetzt in einer Zeile, „Fliesen im Neubau“ in fünf statt sechs. Die Liste wird kürzer.
- Geprüft auf allen Ansichten mit Bereichszeilen und Vignetten. Die Ortslisten (Wetzlar m390: Feld 64 px) bekommen auf dem Telefon dieselbe Stufe, wie die Gesamtsicht vorhersagt. Ab t768 sind sie unverändert, d1440 und t1024 auf Wetzlar pixelgleich.
- Abweichung vom vorgeschlagenen Klassensatz siehe EV-R4.

### R-5 /fliesen leere Felder · umgesetzt (Verlegemuster auf derselben Karte)
- `fliesen.ts`: Fugensanierung bekommt `motiv: 'kreuzfuge'`, Fußbodenheizung `motiv: 'drittelverband'`. Der Kommentar ist nachgezogen.
- `Tun.tsx`: Trägt eine Liste Vignetten, steht ein Muster im selben Feld auf derselben Karte (4 : 3, Rand fuge, Fläche kalk, gleicher Innenabstand). Die Fugen des Musters stehen in strich (`*:bg-strich` an der Karte), also wie bei `deutlich`, aber ohne dessen rotes Merkmal.
- Listen ganz ohne Vignetten behalten das alte 64-px-Musterfeld, unverändert. Das Loch ist geschlossen: Alle sechs Zeilen tragen eine Karte gleicher Größe, die Textkante bleibt eine (`fliesen-raumliste-nach-*.png`).
- Entscheidungsvermerk zur Wahl der Muster und zur Fugenfarbe: EV-R5.

### R-6 /referenzen Passstücke · umgesetzt (Schraffur nur am unteren Pseudo-Element)
- `globals.css`, Block „Galerie eingeklappt und im Verband“, nur `.galerie-liste[data-verband]::after`: `background-image: repeating-linear-gradient(135deg, var(--color-fuge) 0 1px, transparent 1px calc(var(--spacing) * 2))`. Das sind Schraffurlinien unter 45 Grad in fuge im Abstand einer Stufe 2, dieselbe Richtung wie die Schraffur der Plan-Zeichnungen.
- Das obere Passstück mit der Statuszeile bleibt glatt. Es gibt keine zusätzlichen Elemente, und am Aufklappen ändert sich nichts (R-1 aus E-112).
- Die zwei Felder lesen sich jetzt als geschnittenes Material statt als leere Kacheln (`R6-referenzen-d1440-04.png`). Bei DPR 1 wechseln die Linien leicht in der Stärke (Kantenglättung der Diagonale).
  - Geprüft wurden Abstände in √2-Teilung. Sie brechen in Chrome die Linien und sind darum verworfen (Probe `arbeit/schraffur-probe-z.png`).

### R-7 /referenzen t768 Bereichsliste · umgesetzt (Lesemaß unter lg in Bereichszeilen)
- `Tun.tsx`, Bereichszeilen mit `spalten`: Um die Liste liegt innen eine Container-Hülle mit `satzMass('achse')`, also `mx-auto max-w-mass lg:@lg:mx-0 lg:@lg:max-w-none`.
- Unter lg bzw. unter einer Hülle von 32 rem steht die eine Spalte im Lesemaß mittig wie Einleitung, Punkte und Aufklapper. Ab der Teilung ist sie voll breit wie bisher; die Spalten fragen die innere Hülle ab, die dort gleich breit ist.
- t768 /referenzen: Einleitung und Liste stehen wieder auf einer Kante bei x 82. d1440, t1024 und m390 sind pixelgleich.
- Geprüft sind alle Ansichten, deren Listen über `spalten` laufen: Tun bereicheVoll (/referenzen, /ueber-uns), Lage-Wege (/bad, /fliesen) und Wissen-Wege. Den Ort der Änderung begründet EV-R7.

### R-8 /ueber-uns t1024 Glasbild-Kacheln · umgesetzt
- `ueber-uns/page.jsx`: Der Umschlag jeder Kachel ist `h-full *:h-full`; er füllt die gleich hohe Folie, und das Glasbild darin ebenso.
- `bewegung.css`, Block glasbild:
  - `.glasbild:not([data-verlauf]) { grid-template-rows: auto 1fr }`: Der zusätzliche Platz geht in die Zeile des Namens.
  - In der vorhandenen Regel für „ohne Maus, Kachel ≤ 20 rem“ ergänzt `flex-grow: 1` an `.glasbild-text`: Der Tintenblock füllt diese Zeile bis zur gemeinsamen Unterkante, der Name steht oben direkt unter dem Foto.
- Gemessen t1024: Alle drei Kacheln enden gleich, vorher 29 px Stufe (`R8-ueber-uns-t1024-03.png`; geändert ist nur die mittlere Kachel).
- Bei Höhe aus dem Inhalt (alle übrigen Glasbilder, Galerie und Beleg mit `verlauf`) ändert sich nichts. Pixelvergleich: d1440, m390, t768 und q844 auf /ueber-uns unverändert bis auf die Verschiebungen aus R-7 und R-9; Beleg und Galerie anderer Ansichten unverändert.
- Abweichung vom Vorschlag `grid-rows-[auto_1fr]` (Beliebigwert) siehe EV-R8.

### R-9 Lesemaß des Lage-Vorspanns unter lg · umgesetzt
- `Lage.tsx`: Das fs-4-Element liegt im `Satzblock satz="achse"` jetzt in einer Hülle `satzMass('achse')`, genau wie der Zusatz. Ab der Teilung ist die Hülle ohne Maß, darum sind d1440, d1920 und t1024 pixelgleich (Pixelvergleich: d1440 und t1024 ohne Änderung im Vorspann).
- **Gemessen** (nachher / vorher):
  - q844 /ueber-uns: Vorspann x 120 bis 710 mit rund 62 Zeichen je Zeile, vorher x 32 bis 797 mit rund 82.
  - t768 /bad/badsanierung, /bad/barrierefreies-bad, /leistungen, /ueber-uns, /fliesen und /bad: x 82, auf einer Kante mit Einleitung und Punkten des nächsten Abschnitts.
  - m390 unverändert.
- Betroffen sind auch die Ortsseiten (Wetzlar t768/q844), siehe offene Frage 2.

### R-10 /referenzen Kantenkreuz unter der Tinte-Bühne · umgesetzt
- `globals.css` (Ebene components, neben „abschnitt-kreuz“): Folgt ein Abschnitt auf eine Tintefläche, wird sein Kantenkreuz in nacht-2 gefüllt (`section.flaeche-tinte[data-kante] + section > .abschnitt-kreuz .kreuz-grund > path { fill: var(--color-nacht-2) }`). Das ist die Farbe, die das Kreuz an der Oberkante der Bühne trägt. Oben und unten sind damit gleich, und das Kreuz ist auf Tinte und Kalk ganz sichtbar (`R10-referenzen-d1440-05-kreuz-zoom.png`; ebenso t768 und t1024).
- Warum die Füllung am Pfad sitzt: Die Farbe am Zeichen trägt eine Utility (`text-tinte`), und die Ebene utilities schlägt components. Der Pfad erbt seine Füllung sonst nur, die Regel setzt sie direkt.
- Unter erzwungenen Farben ist die Regel ausgeschaltet (`@media (forced-colors: none)`). Das rote Einrastkreuz und die Bewegung sind unverändert.

### R-11 /standorte/wetzlar t768 · teilweise umgesetzt (Laserlinie ja, „Gießen“ nein)
- **Laserlinie** (`Einzugsband.tsx`): Endet die Spalte des Ortes vor der letzten Spalte der Reihe, endet das Rot wie bisher an ihrer Fuge (`@xl:mr-0` bzw. `@4xl:mr-0` nur dann). Ist sie die letzte Spalte, reicht das Rot wie in einer Spalte bis an die rechte Kante der Zone.
  - t768 und q844 Wetzlar: Das Rot reicht bis zur Kante, der Stummel in Tinte entfällt (`R9-R11-wetzlar-t768-01.png`).
  - d1280, d1440 und t1024 unverändert (vier Spalten, Wetzlar an Stelle 2, Ende an der Fuge vor Solms). m390 unverändert.
- **„Gießen“ allein in der zweiten Zeile:** nicht gebaut. Es ist nicht klein und sicher, siehe offene Frage 4.

## 2 Entscheidungsvermerke

- **EV-R1a · Rückweg statt eines anderen Fotos (R-1, R-2).**
  - Ziel: Fliesenarbeit im ersten Bildschirm.
  - Alternativen: andere vorhandene Fotos aus ARBEITEN (Kandidatenbögen, R-1/R-2 oben). Keines bringt die Fliesenarbeit bzw. den stufenlosen Boden ähnlich hoch ins Bild, ohne eine Untergrenze zu verletzen oder einen anderen Einstieg zu doppeln.
  - Wirkung: Der erste Bildschirm zeigt das Thema der Seite auf allen geprüften Breiten.
  - Risiko: Die Befunde 1a/1b (/bad) und 2a (/bad/barrierefreies-bad) aus Sicht Anlauf 2 kommen zurück; E-113 Nr. 7 und E-114 Nr. 6 werden für diese zwei Einstiege zurückgenommen.
  - Rückweg: je `bild:` und die Fotoreihe tauschen (in den Kommentaren beschrieben).
- **EV-R1b · Reihe auf /bad: nur der Eintrag aus a3c28d36, nicht die ganze Reihenfolge.**
  - Ziel: kein Foto zweimal auf der Seite, mit kleinstem Eingriff.
  - Alternative: die ganze Reihe aus a3c28d36 (bad-beleg-2, bad-einstieg, bad-beleg-3). Die Gesamtsicht verlangt nur, den Eintrag in Zeile 99 zu ersetzen.
  - Wirkung: Das helle Bad aus M2-B1 bleibt vorn, das Landhausbad steht zuletzt.
  - Risiko: keines bekannt.
  - Rückweg: die Reihe umstellen.
  - Auf /bad/barrierefreies-bad steht die alte Reihe ganz wieder, wie es die Gesamtsicht dort beschreibt. So ist auf dem Telefon wieder die Dusche mit Mosaikboden die erste Karte.
- **EV-R4 · Stufe 24 nur unter lg (`@sm:max-lg:w-24`, `lg:p-2`) statt `@sm:w-24 lg:w-32`.**
  - Ziel: Telefonstufe ohne Änderung ab lg.
  - Befund im ersten Bau: Mit dem vorgeschlagenen Klassensatz wurden die Felder auf d1440 und t1024 96 statt 128 px breit. In Tailwind 4 stehen Container-Varianten im Stylesheet nach den Breakpoints, darum schlug `@sm:w-24` die Klasse `lg:w-32`. Das sah man auf /fliesen und den Ortsseiten bei d1440 als verschobene Liste.
  - Alternative: Stapelvariante `lg:@sm:w-32` (Reihenfolge weniger durchschaubar).
  - Wirkung: d1440 und t1024 pixelgleich, Telefon 64 px, t768 und q844 96 px.
  - Risiko: keines bekannt.
  - Rückweg: die Klassen in den Konstanten.
  - Beobachtung, nicht geändert: LageZeichnung in `Lage.tsx` trägt denselben Klassensatz. Auf `/` sind die Lage-Zeichnungen bei d1440 und t1024 deshalb 96 px breit, obwohl der Kommentar „ab lg 32 (128 px)“ sagt (gemessen auf 4325). `/` gehört nicht zu dieser Reparatur.
- **EV-R5 · Muster kreuzfuge und drittelverband mit Fugen in strich.**
  - Ziel: Das Loch schließen, ohne neue Zeichnung und ohne zweites Rot.
  - Alternativen:
    1. Wie vorgeschlagen kreuzfuge und fischgraet in fuge: Probebau 1, auf Fliese blass. Das Fugenraster las sich bei t768 wie ein leeres weißes Feld.
    2. fischgraet mit `deutlich`: Probebau 2, als einziges Muster ohne Rot möglich. Neben den Strichzeichnungen war es aber als dichtes Zickzack deutlich schwerer.
    3. `deutlich` für kreuzfuge bringt eine rote Laserlinie.
    4. riss: doppelt die Vignette „reparatur“ (Raster mit Riss) direkt darüber.
  - Gewählt: Fugen in strich über die Karte (`*:bg-strich`, Token, kein Eingriff in `Fliesenkomposition`). Für den Boden der Drittelverband, das Muster des Hauses. Beide Karten haben dasselbe Gewicht wie die Strichzeichnungen darüber.
  - Risiko: Die Regel greift über die Hintergrundfarbe der Zeichnung (Utility mit Kindvariante schlägt `bg-fuge`). Geprüft am berechneten Stil: strich auf allen Breiten.
  - Rückweg: `motiv` in den zwei Zeilen streichen; der leere Platzhalter kehrt zurück.
- **EV-R7 · Lesemaß in `Bereichszeilen` statt nur am Aufruf in Tun.**
  - Ziel: eine Kante unter lg in allen Abschnitten mit voll breiter Liste.
  - Alternative: Hülle nur am Aufruf `bereicheVoll` in Tun (Vorschlag). Die Lage-Wege (/bad, /fliesen) und die Wissen-Wege behielten dann den Sprung, und nach R-9 stünde auf /bad und /fliesen unter lg der Vorspann bei x 82 und die Wegeliste bei x 32.
  - Wirkung: Unter lg stehen alle `spalten`-Listen im Lesemaß wie in a3c28d36 (damals `satzMass` an den Lage-Wegen). Ab lg ändert sich nichts.
  - Risiko: Gewollte Pixeländerungen auf t768 und q844 auch auf /bad und /fliesen.
  - Rückweg: die innere Hülle entfernen.
  - Die Hülle nutzt `satzMass('achse')`. Ein wörtliches `lg:@lg:max-w-none` meldete werte.mjs als „groesse_ausserhalb“; die Hilfsfunktion ist dieselbe, die Lage und Absatz schon verwenden.
- **EV-R8 · `grid-template-rows: auto 1fr` in bewegung.css statt `grid-rows-[auto_1fr]`.**
  - Ziel: gleich hohe Kacheln ohne Beliebigwert (werte.mjs, Z-04).
  - Alternative: die Klasse im Markup. Das ist ein Beliebigwert, und Glasbild nimmt keine Klasse.
  - Wirkung: wie vorgeschlagen. Die Regel trifft nur Glasbilder ohne `verlauf`; bei Höhe aus dem Inhalt ist die zweite Zeile so hoch wie ihr Inhalt oder 0.
  - Risiko: Ein künftiges Glasbild ohne Verlauf in fester Höhe bekäme den Platz unter dem Foto. Gewollt, das ist die Regel.
  - Rückweg: die Regel und `h-full *:h-full` entfernen.
- **EV-R11 · nur die Laserlinie.**
  - Ziel: Nur gebaut, was klein und sicher ist (Auftrag).
  - Wirkung und Risiko: siehe R-11.
  - Rückweg: die zwei Konstanten `BIS_KANTE_*` durch das frühere `@xl:mr-0` ersetzen.

## 3 Gewollte Pixeländerungen je Ansicht
Grundlage ist der Pixelvergleich `arbeit/pixel-summary.txt` (geänderte Ausschnitte / alle Ausschnitte).

| Ansicht | d1440 | t1024 | t768 | q844 | m390 | Ursache |
|---|---|---|---|---|---|---|
| /bad | 00, 01, 06, 07 | 00, 01, 07 | 00, 01 | alle (Folge) | 00 | R-1 Einstiegsfoto und Platz 3 der Reihe; t768/q844 R-9 Vorspann und R-7 Lage-Wege im Lesemaß |
| /bad/barrierefreies-bad | 00, 01, 05 | 00, 01, 05, 06 | 00, 01, 04 | 00–03, 09, 10 | 00, 05 | R-2 Einstiegsfoto und Reihe; t768/q844 R-9 |
| /bad/badsanierung | – | – | 01–09 (Folge) | 02–11 (Folge) | – | R-9 Vorspann (eine Zeile mehr, Verschiebung) |
| /leistungen | 04 | 04 | 01, 03 | 02, 03, 07, 08 | 05 | R-3 Formatregler; t768/q844 R-9 |
| /fliesen | 02 | 02 | 01–09 (Folge) | 02–11 (Folge) | 01–11 (Folge), ebenso m360 | R-5 Muster; R-4 Telefonstufe; t768/q844 R-9 und R-7 (Lage- und Wissen-Wege) |
| /referenzen | 04, 05 | 06 | 01, 04, 05 | 02 | – | R-6 Schraffur, R-10 Kreuz; t768 R-9, R-7, R-10 |
| /ueber-uns | – | 03 | 01–11 (Folge) | 02–11 (Folge) | – | R-8 Kacheln (t1024); t768/q844 R-9 und R-7 |
| /standorte/wetzlar | – | – | 01, 02 | 03–11 (Folge) | 02–11 (Folge) | R-11 Laserlinie, R-9 Vorspann; m390 R-4 Vignetten 64 px |

„Folge“ heißt: Die Seite rückt unter der Änderung nach oben oder unten. Ein Ausschnitt in keiner Spalte ist pixelgleich. d1440 und t1024 sind auf /bad/badsanierung, /ueber-uns (außer t1024 03) und Wetzlar pixelgleich.

## 4 Textvorschläge
Keine. Der Wortlaut bleibt (K-011); die zwei Unterschriften in den Fotoreihen sind Einträge aus a3c28d36.

## 5 Offene Fragen an den Orchestrator
1. **R-1/R-2, Preis des Rückwegs:** Für diese zwei Einstiege wiegt „Fliesenarbeit im ersten Bildschirm“ vor Schärfe und Motivfehlern (Sicht Anlauf 2, 1a/1b und 2a). Bestätigen? E-113 Nr. 7 und E-114 Nr. 6 wären für /bad und /bad/barrierefreies-bad zurückgenommen.
2. **R-9 auf den Ortsseiten:** Unter lg steht der Vorspann jetzt im Lesemaß (x 82 auf t768). Das Einzugsband bleibt nach M2-B7 (`zusatzBreit`) voll breit (x 32) und liest sich als breite Figur, der Vorspann fluchtet mit „Das machen wir in Wetzlar.“. Annehmen? Die Alternative wäre ein voll breiter Vorspann nur bei `zusatzBreit`.
3. **Gleiche Lage bei Werte und Versprechen:** Die Werte-Liste auf /ueber-uns und die Versprechen-Reihen nutzen `satzSpalten` direkt, nicht Bereichszeilen. Unter lg laufen sie weiter voll breit (/ueber-uns t768: „Unsere Werte“ bei x 32 nach Absätzen bei x 82). Das gehört nicht zum Auftrag R-7 und ist nicht geändert. Dieselbe Hülle wäre eine Zeile je Baustein.
4. **R-11 „Gießen“:**
   - (a) Nachbarorte ab md wieder über beide Spalten (Rücknahme von EV-12 aus A2: vorher alle fünf Orte in einer Zeile, dafür das rechte untere Viertel leer).
   - (b) Die Liste als Inline-Liste mit `text-wrap: balance` (3/2 statt 4/1). Das ändert den Satz auf 13 Ortsseiten und auf allen Breiten (unter md zentriert), deshalb nicht ohne Entscheidung gebaut.
5. **Hilfsskripte im Repository:** Zwei Hilfsskripte lagen während des Laufs in `_werkstatt/werkzeuge`: `r-probe-element.mjs` (Elementaufnahmen) und `r-probe-felder.mjs` (Feldbreiten messen).
   - Die Zwischenstand-Commits 5bbae3a3, 7430535e und 93fa042a haben sie ins Repository übernommen.
   - Wie im Auftrag habe ich sie am Ende gelöscht. Im Arbeitsbaum des Repositorys stehen sie deshalb als gelöscht (` D`). Ich habe kein Git ausgeführt.
   - Bitte mit dem Einspielen entfernen (`git rm`).
   - Weitere Hilfsdateien gab es nicht. `r-schraffur-probe.mjs` und die 200-%-Kopie `r-erstesbild-200.mjs` waren nur Minuten da und sind gelöscht.
6. **LageZeichnung auf `/`** (EV-R4): ab lg 96 statt der dokumentierten 128 px. Behebung wie in Tun (`@sm:max-lg:w-24`)? Das würde `/` ab lg ändern.

## 6 Prüfzahlen
- **npm test** (Arbeitskopie, nach dem letzten Bau): 280 Tests, 280 bestanden, 0 übersprungen, 0 fehlgeschlagen.
- **tsc --noEmit:** 0 Fehler. Gelaufen mit echter node_modules-Kopie; mit der Kopie unter dem Namen node_modules_echt meldet tsc Fremdfehler aus dieser Kopie.
- **eslint** über die 7 geänderten TS/JS-Dateien: 0.
- **werte.mjs** über alle 9 geänderten Dateien: 0 Befunde (vorher ebenfalls 0, Lauf in `vor`). Zwischenstand mit wörtlichem `lg:@lg:max-w-none` hatte 1 Befund, behoben (EV-R7).
- **next build:** grün, ohne Warnung (`logs/build-4.log`). Ein Stylesheet je Seite auf 12 geprüften Ansichten.
- **CSS** des gebauten Stylesheets, vorher 4325 → nachher 4560:
  - gzip -9: 25.614 → 25.701 B (+87 B), roh 149.086 → 149.707 B.
  - gzip -6: 25.745 → 25.832 B, brotli 21.100 → 21.172 B.
  - Budget +600 B eingehalten. Die Grundzahl 25.601 aus dem Auftrag stammt aus einer anderen Messart; der Zuwachs ist in jeder Messart +72 bis +87 B.
- **erstesbild.mjs:** acht Ansichten. 4325 gegen 4560 ist Fall für Fall gleich.
  - m390, q844, d1440 in zwei Durchgängen: 48 Fälle, sichtbare Pflichtelemente 205 → 205, alle fünf 37 → 37.
  - m360 mit 200 % Schrift (Kopie mit Init-Skript `html{font-size:200%}`, danach gelöscht): 16 Fälle, 35 → 35, alle fünf 0 → 0 (Altbefund wie in Notiz C).
  - Belege: `$SCRATCH/sfix2/r/erstesbild/{vor,nach,vor-200,nach-200}/erstes-bild.json`.
- **Bildsatz:** 470 + 12 + 44 Aufnahmen je Stand, 0 Fehler, 0 Überlauf, 0 Konsolenmeldungen. Die Überlappungen (leitachse, 61) sind vorher und nachher gleich.
- **Playwright,** alle Specs gegen 4560 (bewegung.css und globals.css sind laut `test-zuordnung.json` „ALLE“):
  - reduziert: 398 bestanden, 0 fehlgeschlagen, 26 übersprungen (11,5 min, `specs/reduziert.log`);
  - mit `RELAUNCH_BEWEGUNG=an`: 398 bestanden, 0 fehlgeschlagen, 26 übersprungen (12,7 min, `specs/bewegung-an.log`);
  - wie die Grundlinie der Runde (398/0/26 in beiden Bewegungszuständen).
- **axe.mjs --zustaende** gegen 4560: acht Ansichten × m390, t768, t1024, d1440 × normal, Menü, Erstbesuch = 96 Läufe, 0 übersprungen, 0 Verstöße jeder Schwere (`axe/axe.json`).
- **Keine Lighthouse- und keine Zeitmessung** (E-076).
- **Aufräumen:** Server 4560 beendet (nur die eigenen Prozesse). In der Arbeitskopie sind die node_modules-Kopie und `.next` gelöscht und der Symlink auf `/home/user/tezgel/node_modules` wiederhergestellt. Die Server 4324, 4325 und 4326 laufen unberührt (alle 200).
