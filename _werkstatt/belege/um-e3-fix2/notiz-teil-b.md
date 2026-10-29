# UM-E3-FIX2 · Teil B (N8 bis N12) · Notiz des Baumeisters

Alle folgenden Pfade liegen unter `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/fix2/`.

- **Arbeitskopie:** `baum`, Stand vorher `vor-B` (= Endstand Teil A nach der Nacharbeit, A7).
- **Diff:** `UM-E3-FIX2-B.diff` mit 9 Dateien, 474 Zeilen (nach der Nacharbeit, siehe letzter Abschnitt; der Stand davor liegt als `UM-E3-FIX2-B-vor-nacharbeit.diff` mit 458 Zeilen daneben). Die Probe `patch -p1 --dry-run` gegen `vor-B` ist sauber.
- **Sichtabgleich:**
  - Bau in der Arbeitskopie mit echter Kopie von `node_modules`, gestartet mit `next start -p 4393 -H 127.0.0.1`.
  - Bauten B1 bis B6; B5 und B6 haben denselben Code.
  - Playwright lief nur über `installSperre` und `setzeEinwilligung` (Einwilligung „abgelehnt“), mit DPR 1 und als PNG.
  - Hinweis: Im Auftragstext steht „Port 4391“, im Briefing 4393. Bau und Aufnahmen liefen beide auf 4393.
- **Skripte:** liegen in `skript/` (`b-stelle.mjs`, `b-stellen.sh`, `b-dom.mjs`, `q-*.js`). Daneben habe ich `bau.sh`, `ende.sh`, `bewegt.mjs` und `kreuze.mjs` aus Teil A genutzt.
- **Zum Schluss:**
  - Den Server habe ich über die Prozessgruppe aus `server-4393.pid` beendet.
  - `node_modules` ist wieder ein Verweis.
  - `.next`, `next-env.d.ts` und `tsconfig.tsbuildinfo` sind gelöscht.
  - Der Hilfsverweis `baum/_werkstatt/werkzeuge/node_modules` für `werte.mjs` ist entfernt.
  - Im Repository gibt es keine Änderung (`git status` ist leer).

## Prüfzahlen (Endstand B5/B6)
- `npm test`: 248/248 (`test-B.log`).
- `npx tsc --noEmit -p .` mit vorübergehender `next-env.d.ts`: 0 Fehler (`tsc-B.log`).
- `npx eslint` über die 9 Dateien des Diffs: 0 (`eslint-B.log` ist leer).
- `werte.mjs --arbeitsbaum --dateien …` über die 9 Dateien und beide CSS-Dateien (Werkzeug der Arbeitskopie): **0 Befunde** (`werte-B/`).
  - Im ersten Lauf gab es 4 Befunde. Drei kamen aus meinem Code (`@5xl:w-40`, `@5xl:min-h-64`, `@5xl:p-10`), einer stand schon vorher in `Lage.tsx` (`h-[1lh]`, siehe N8).
  - Alle vier sind ersetzt.
- `next build`: ok (`build-B5.log`, `build-B6.log`).
- `ueberlappung.mjs` auf `/` (m360, m390, t1024, d1440, d1920): je 0 (`sicht-B5/ueberlappung/`).
- **Kreuze im Leitfaden** (`skript/kreuze.mjs`, Schritt 8 px, `/`, Regel N1 aus Teil A) bleiben bei 0 Befunden (`sicht-B5/kreuze/`):

  | Gerät | Befunde | kleinster Abstand Rot zu anderem Kreuz | Einrasten (Schritte) |
  |---|---|---|---|
  | t768 | 0 | 66 px | 42 |
  | t1024 | 0 | 101 px | 42 |
  | q844 | 0 | 66 px | 42 |
  | d1440 | 0 | 98 px | 42 |
  | d1920 | 0 | 109 px | 45 |
  | m390 | 0 | (kein Kopf mobil) | 42 |

  - d1440 im Zustand „ruhig“ und reduziert: kein Kopf, kein Einrasten.
- **Seitenbreite:** Kein Element ragt über das Fenster, weder bei 100 % noch bei 200 % Schrift (m360, m390, t768, d1440).
- **Gegenprobe `/bad` (d1440):** Lage, „Was wir tun“ und Stimmen sind unverändert (`sicht-B5/gegenprobe/`). Neu gilt dort nur der Fuß aus N12.
- Messwerte: `sicht-B5/mass.txt`.

## Befunde

### N8 (mittel) · Bruch nach dem Einstieg: umgesetzt
- **Wahl:** „Was möchten Sie ändern?“ steht auf `/` auf Fliese (weiß), nicht auf Kalk.
  - Die Fläche bringt Fuge und Kantenkreuz an Ober- und Unterkante mit, wie bei den späteren Wechseln.
  - Ab dort wechseln die Flächen Abschnitt für Abschnitt: Einstieg Kalk · Lage Fliese · Leistungen Kalk · Ablauf Fliese · Arbeiten Kalk · Stimmen Fliese · Orte Kalk · Termin Fliese · Fuß Tinte.
  - Vorher lagen drei Abschnitte auf Kalk mit drei mittigen Köpfen.
- **Köpfe:** Der dritte Kopf („Wir kümmern uns …“) steht jetzt linksbündig an der Laserlinie (N9). Damit folgen nie mehr drei mittige Köpfe aufeinander.
- **Je Bildschirm ein Bruch (d1440, `sicht-B5/bewegt/d1440/start/00` bis `10`):**
  - 01: Fuge mit Kreuz, dann Weiß.
  - 02: Fuge, dann linksbündiger Kopf und ungleiches Raster.
  - 03: Treppe.
  - 04: versetzte Galerie.
  - 05: Stimme mit Zelle im ersten Viertel.
  - 06: Entfernungslineal.
  - 07 und 08: Termin auf Weiß.
- **Technik:**
  - `LageInhalt.aufFliese` steht nur in `inhalte/start.ts`. Die übrigen Seiten der Vorlage bleiben unverändert.
  - Den Abstand ab lg setzt der Einstieg innen (`EinstiegMitte fugeUnten`, `lg:pb-16`). Von der Bewertungszeile bis zur Fuge sind es 64 px, von der Fuge bis zur H2 65 px (`Lage lg:pt-16`).
  - Ein erster Bau mit `lg:mt-16` an der Lage ließ eine Lücke von 64 px im Lot. Der Außenabstand fiel durch das Zusammenfallen der Ränder aus der Leitachse heraus, sichtbar in `sicht-B3/stellen/d1440-grenze-einstieg-lage.png`. Behoben: Das Lot läuft jetzt ohne Lücke bis an die Fuge.
  - Messung: Unterkante Einstieg gleich Oberkante Lage auf allen 8 Geräten (`mass.txt`, „grenze“).
- **werte.mjs:** In `Lage.tsx` stand schon vor Teil B `h-[1lh]` (Pfeil an der ersten Zeile, ein Beliebigwert). Weil ich die Datei geändert habe, meldete `werte.mjs` ihn.
  - Ersatz: Pfeil und ein unsichtbares Leerzeichen derselben Stufe teilen sich eine Rasterzelle (`grid`, `col-start-1`, `row-start-1`, `invisible`).
  - Gemessen ist das gleich: Die Mitte des Pfeils liegt auf m390 und d1440 in allen 6 Zeilen genau auf der Mitte der ersten Textzeile (`skript/q-pfeile.js`).
- **Bilder:**
  - Grenze mit Bewegung: `sicht-B5/stellen/d1440-grenze-einstieg-lage.png`, `d1920-grenze-einstieg-lage.png`, `t1024-grenze-einstieg-lage.png`, `m390-grenze-einstieg-lage.png`.
  - Grenze zum nächsten Abschnitt: `sicht-B5/stellen/d1440-grenze-lage-tun.png`.
  - Grenze in den anderen Zuständen: `d1440-reduziert-grenze.png`, `d1440-ruhig-grenze.png`.
  - Übersicht: `sicht-B5/bogen-d1440.png`, `bogen-d1920.png`, `bogen-t1024.png`, `bogen-m390.png`.

### N9 (mittel) · Leistungen als ungleiches Raster: umgesetzt
- **Abschnitt:** linksbündig an der Laserlinie (`TunInhalt.anDerLinie`, nur `/`). Der Leitfaden-Kopf läuft links an der großen Fliese entlang.
- **Raster** (`Planfliesen` in `vorlagen/teile/Tun.tsx`, Containerabfragen in rem):
  - **Ab 64rem (d1280 bis d2560):** drei Spalten und drei gleich hohe Reihen.
    - „Badsanierung und neue Dusche“ ist eine große Fliese über zwei Drittel und drei Reihen, mit großer Plan-Zeichnung oben und Name und Pfeil unten.
    - Die drei übrigen stehen als Querkarten im letzten Drittel, die Zeichnung zwei Fünftel breit.
    - Ihre Fugen teilen die große Fliese genau in Drittel.
    - Die Zeichnung der großen Fliese steht absolut im Feld, damit die Reihen sich nach den Querkarten richten.
  - **36 bis 64rem (t768, q844, t1024):** die mobile Querkarte in zwei Spalten.
  - **Unter 36rem (Handy):** eine Querkarte je Zeile, wie bisher.
  - **Unter 20rem (große Schrift):** ohne Zeichnung, wie bisher.
- **Maße** (`mass.txt`):

  | Gerät | große Fliese | Querkarten |
  |---|---|---|
  | d1440 | 800 × 440 | 384 × 125 |
  | d1920 | 900 × 494 | 432 × 141 |
  | d1280 | 779 × 438 | 373 × 125 |
  | d2560 | 1000 × 548 | 480 × 156 |

- **Tablet:** Die Karten sind auf t768 120 px hoch, auf t1024 und q844 97 px; vorher waren es rund 300 px Zeichnung plus Name. Auf q844 (390 px hoch) ist keine Karte höher als der Bildschirm.
- **Inhalt:** Alle vier Bereiche bleiben mit Zeichnung, Name und Ziel. Die Fassung nur mit Verlegemustern (ohne Vignetten, heute ungenutzt) ist unverändert.
- **200 % Schrift:**
  - d1440: zwei Spalten Querkarten.
  - m360: eine Spalte ohne Zeichnung.
  - Kein Überlauf.
- **Kreuze:** Die Namen sind keine Überschriften (span im Link). `data-kopf-pause` ist darum nicht nötig, und die Prüfung zählt 0.
- **Bilder:**
  - Desktop: `sicht-B5/stellen/d1440-tun.png`, `d1920-tun.png`, `d1280-tun.png`.
  - Tablet: `sicht-B5/stellen/t1024-tun.png`, `t768-tun.png`, `q844-tun-raster.png`.
  - Handy: `sicht-B5/stellen/m390-tun.png`.
  - 200 %: `d1440-s200-tun.png`, `m360-s200-tun.png`.
  - ruhig: `d1440-ruhig-tun.png`.

### N10 (gering) · Doppelte Wahl: teilweise umgesetzt
- **Nachrangig gesetzt:**
  - Die Lagen stehen zuerst auf eigener weißer Fläche, mit großen Sätzen (fs-4, halbfett).
  - Die Leistungen folgen als kompakte Übersicht: Namen eine Stufe kleiner (fs-3). Nur der große Bereich trägt ab 64rem fs-4.
  - Der Block ist mobil rund 440 px hoch (m390, vier Karten zu 97 px) und auf dem Tablet 220 bis 265 px (t1024, t768).
- **Inhalt:** Nichts fällt weg (G4).
- **Grenze:** Die große Bad-Fliese ist am Desktop zugleich der zweite grafische Höhepunkt, den die Prüfer vermisst haben. Ganz nachrangig ist der Abschnitt dort darum nicht (offene Frage 2).
- **Bilder:** `sicht-B5/stellen/d1440-grenze-lage-tun.png`, `sicht-B5/bewegt/m390/start/02.png` und `03.png`.

### N11 (gering) · Kundenstimme einzeln: umgesetzt
- **Zelle schmaler und Karte niedriger:**
  - Ab 56rem stehen Sterne und Name im ersten Viertel, der Wortlaut in drei Vierteln. Vorher war es ein Drittel zu zwei Dritteln.
  - Karte auf d1440: 295 statt 344 px hoch (vorher gemessen an `fix2/sicht-A3/bewegt/d1440/start/05.png`). Auf d1920 sind es 333 px.
  - Von 36 bis 56rem (t768, q844) bleibt das Drittel.
- **Zelle gefüllt:** Unten in der Zelle steht die Nummer der Stimme in Mono („01 / 08“). Sie ist nur fürs Auge (`aria-hidden`); die Folie nennt dem Vorleser „1 von 8“.
- **Link nah an der Stimme:** Die Kennzeile (Bewertung mit Stand) und „Alle Bewertungen bei Google lesen“ stehen jetzt direkt unter der Karte, an der Kante des Wortlauts und vor den Knöpfen.
  - Kennzeile 16 px, Link 41 px unter der Karte (d1440). Vorher standen beide unter den Knöpfen, rund 150 px tiefer.
  - Mobil stehen die Knöpfe wie bisher über der Karte, der Link direkt darunter.
  - Der Link steht einmal je Seite.
- **Technik:** neuer optionaler Platz `nachSpur` in `kern/Karussell.tsx`. Er steht im Bild zwischen Spur und Knöpfen und liegt im Bereich des Karussells: Maus und Fokus halten den Selbstlauf an.
  - Nacharbeit: Im DOM steht er hinter den Knöpfen, ab sm rücken die Knöpfe per `sm:order-last` im Bild dahinter (Fokusfolge, siehe letzter Abschnitt).
  - Nur die Form „einzeln“ (Startseite) nutzt ihn.
  - Die Formen „gross“ und „klein“ der übrigen Seiten sind unverändert.
- **Wortlaut:** unverändert (G8). Die Markierung „ordnungsgemäß, sauber und pünktlich“ bleibt.
- **Bilder:**
  - Desktop und Tablet: `sicht-B5/stellen/d1440-stimmen.png`, `d1920-stimmen.png`, `t1024-stimmen.png`, `t768-stimmen.png`.
  - Handy: `m390-stimmen.png`.
  - 200 %: `d1440-s200-stimmen.png`.

### N12 (gering) · Fuß, Firmendaten: umgesetzt
- **Raster:** Die untere Zeile steht auf denselben Fugen wie die Kontaktfelder darüber.
  - Ab 42rem drei Spalten, je Angabe eine: Kammer, Betrieb seit, USt-IdNr. Vorher waren es Viertel, Kammer über zwei.
  - Ab 28rem zwei Spalten, Kammer über beide, wie die zweispaltigen Felder darüber; unter 28rem einspaltig wie die Felder.
  - Nacharbeit: Vorher teilte die untere Zeile schon ab 20rem; auf dem Handy hatte ihre Mittelfuge oben kein Gegenstück (siehe letzter Abschnitt).
- **Gemessen** (rechte Kanten der Felder oben und unten gleich):

  | Gerät | Kanten |
  |---|---|
  | d1440 | 725, 1026, 1327 |
  | d1280 | 645, 938, 1231 |
  | d1920 | 966, 1304, 1643 |
  | d2560 | 1286, 1663, 2039 |
  | t1024 | 517, 746, 975 |
  | t768 | 266, 501, 735 |
  | q844 | 292, 551, 811 |

- **Inhalt:** Angaben und Reihenfolge bleiben (G8).
- **Bilder:** `sicht-B5/stellen/d1440-fuss.png`, `d1280-fuss.png`, `d1920-fuss.png`, `t1024-fuss.png`.

## Dateien
- **Inhalt und Modell:**
  - `src/inhalte/start.ts`: `lage.aufFliese`, `tun.anDerLinie`.
  - `src/components/vorlagen/inhalt.ts`.
- **Vorlage:**
  - `src/components/vorlagen/ErzaehlSeite.tsx`: `fugeUnten` an EinstiegMitte.
  - `src/components/vorlagen/teile/EinstiegMitte.tsx`.
  - `src/components/vorlagen/teile/Lage.tsx`.
  - `src/components/vorlagen/teile/Tun.tsx`.
  - `src/components/vorlagen/teile/Stimmen.tsx`.
- **Kern:** `src/components/kern/Karussell.tsx` (`nachSpur`).
- **Rahmen:** `src/components/common/Footer.jsx`.
- **Nicht berührt:**
  - Bewegungsregeln, Register, Tokens (`globals.css`, `bewegung.css`) und Tests.
  - B-01 und `verlegen/**`.
  - Logo, Rechtstexte, Formulare und `/api/anfrage`.
  - Die H1.

## Offene Fragen
1. **Reichweite N8 und N9:** Auf `/bad`, `/bad/badsanierung`, `/bad/barrierefreies-bad`, `/balkon-terrasse`, `/leistungen`, `/referenzen` und `/ueber-uns` liegen Einstieg, Lage und „Was wir tun“ weiter auf Kalk mit mittigen Köpfen (Gegenprobe `sicht-B5/gegenprobe/bad-d1440-lage.png`).
   - Mit `lage.aufFliese` und `tun.anDerLinie` im Inhalt ließe sich das dort gleich setzen.
   - Ich habe es nicht getan (Stufe A, Pixelabweichungen auf 7 Seiten). Bitte entscheiden.
2. **N10:** Die große Bad-Fliese macht die Leistungen am Desktop sichtbarer, nicht unauffälliger.
   - Soll der Abschnitt strenger nachrangig stehen, wären die Plan-Fliesen am Desktop als vier Querkarten in einer Reihe denkbar. Dann fiele aber der Bruch aus N9 weg.
3. **Zähler „01 / 08“** in der Stimme ist ein neues, rein visuelles Element (Mono wie die Schrittnummern des Ablaufs). Bitte bestätigen oder streichen; die Zelle bliebe dann bis auf Sterne und Name leer.
4. **Kennzeile auch in den übrigen Formen?**
   - „gross“ und „klein“ (z. B. `/bad`) zeigen Kennzeile und Link weiter unter den Knöpfen (`sicht-B5/gegenprobe/bad-d1440-stimmen.png`).
   - Mit `nachSpur` ließe sich das einheitlich direkt unter die Karten setzen.
5. **Abstand Einstieg bis H2 auf `/` ab lg:** jetzt 64 px Kalk, Fuge, 65 px Weiß, zusammen 129 px. Teil A hatte 96 px ohne Fuge. Die Fuge teilt die Fläche, die H2 steht wie nach jedem anderen Flächenwechsel eine Stufe 16 unter der Kante.
6. **Fuß unter 28rem (Handy):** in der Nacharbeit erledigt. Die untere Zeile ist dort jetzt einspaltig wie die Felder darüber (79 px mehr Höhe auf dem Handy).
7. **`Lage.tsx` Pfeil:** `h-[1lh]` war ein vorbestehender Beliebigwert. Ich habe ihn ersetzt, damit `werte.mjs` über die geänderte Datei 0 zeigt; das Verhalten ist gemessen gleich (N8). Bitte beim Zusammenführen mit Teil A beachten: Teil A hat `Lage.tsx` nicht berührt.

## Nacharbeit nach der Gegenprüfung (N10 bis N12)
Vier Befunde der Gegenprüfung, alle „gering“. Jeden habe ich selbst nachgemessen (Bau C0 = Endstand B5/B6, Port 4393, `skript/c-tab.mjs`). Zwei sind behoben (Bau C1), zwei bleiben als Entscheidung beim Orchestrator.

### Behoben
- **Fokusfolge der Kundenstimme unter sm (WCAG 2.4.3, 1.3.2), `kern/Karussell.tsx`:**
  - Bestätigt auf C0, m390: Spur (y 4993) → „Alle Bewertungen bei Google lesen“ (5420) → Zurück, Anhalten, Weiter (4933) → „Aßlar“ (5910). Der Fokus sprang vom Link unter der Karte rund 490 px zurück zu den Knöpfen über ihr. Am Desktop lief er aufsteigend.
  - Umsetzung: `{nachSpur}` steht im DOM jetzt hinter dem Knopfblock. Der Knopfblock trägt zusätzlich `sm:order-last`; ab sm steht er damit im Bild wie bisher unter der Kennzeile. Unter sm bleibt `max-sm:order-first`.
  - Fokus- und Lesefolge ist damit auf jeder Breite wie vor Teil B: Spur, Knöpfe, Kennzeile mit Link. Am Desktop weichen nur die Nachbarn Knöpfe und Link um einen Schritt ab (d1440: Knöpfe 5476, Link 5403, 73 px darüber). Das steht als Abwägung im Kommentar an der Stelle.
  - Gemessen auf C1: m360, m390, m430: Spur → Knöpfe (60 px darüber, direkt über der Karte) → Link → nächster Abschnitt. t768, q844, t1024, d1280, d1440, d1920, d2560: Spur → Knöpfe → Link → nächster Abschnitt (`sicht-C/tab-fuss.jsonl`; Lauf mit Anhalten-Knopf einzeln auf m390 und d1440 in `sicht-C/tab-einzeln.jsonl`).
    - Im parallelen Lauf über zehn Geräte fehlt „Anhalten“: Unter Last ist die Bewegung aus (Ladeschwelle), dann gibt es keinen Selbstlauf und keinen Knopf. Einzeln gemessen ist er da.
  - Das Bild ist unverändert: Spur, Kennzeile und Knöpfe stehen auf m390 und d1440 an denselben Koordinaten wie auf C0.
  - Gegenprobe der Formen „gross“ und „klein“ (`/bad`, `/ueber-uns`, d1440 und m390): Ohne `nachSpur` ist der Knopfblock das letzte Kind, `sm:order-last` ändert dort nichts (Knöpfe 24 px unter der Spur, unter sm darüber).
  - Bilder: `sicht-C/stellen/d1440-stimmen.png`, `t768-stimmen.png`, `m390-stimmen.png`.
- **Fuß unter 28rem (N12, offene Frage 6), `common/Footer.jsx`:**
  - Bestätigt auf C0: m390 oben sechs Felder [17, 373], unten [17, 373], [17, 195], [196, 373].
  - Umsetzung: `@xs:grid-cols-2` und `@xs:col-span-2` wurden zu `@md:…`. Die untere Zeile hat jetzt dieselben Stufen wie die Felder: einspaltig unter 28rem, zwei Spalten ab 28rem (Kammer über beide), drei ab 42rem.
  - Gemessen auf C1: m360, m390, m430 oben und unten alle Felder auf derselben Breite ([17, 343], [17, 373], [17, 413]). t768, q844, t1024, d1280 bis d2560 sind unverändert (zum Beispiel d1440 725, 1026, 1327 oben und unten).
  - Preis: Die Zeile ist auf dem Handy 240 statt 161 px hoch (+79 px).
  - Kein Überlauf, auch bei 200 % auf m360.
  - Bilder: `sicht-C/stellen/m390-fuss.png`, `m360-fuss.png`, `m430-fuss.png`, `m360-s200-fuss.png`, `d1440-fuss.png`.

### Nicht geändert (Entscheidung beim Orchestrator)
- **N10, Rang der Leistungen (`Tun.tsx`, `inhalte/start.ts`):**
  - Die Messung stimmt: Bad-Fliese 800 × 440 (d1440), 900 × 494 (d1920), 1000 × 548 (d2560). Die H2 hat dieselbe Stufe wie die H2 der Lage.
  - Ich ändere nichts. N10 ist im Briefing ausdrücklich an N9 gebunden („Wenn N9 es natürlich ergibt“), und N9 (mittel) verlangt die große Fliese mit großer Plan-Zeichnung.
  - Jede der vorgeschlagenen Stellschrauben nimmt N9 etwas weg:
    - eine kleinere H2 nur für diesen Abschnitt bräche die einheitliche Stufe der Abschnittsköpfe,
    - eine niedrigere Zeichnung schwächt den zweiten grafischen Höhepunkt,
    - vier Querkarten in einer Reihe heben den Bruch auf.
  - Wie offene Frage 2: Bitte entscheiden.
- **Zähler „01 / 08“ (`Stimmen.tsx`):**
  - Die Messung stimmt: Zwischen Name und Zähler bleiben am Desktop rund 100 px frei. Der Zähler steht mit `mt-auto` am Fuß der Zelle, alle acht Karten sind gleich hoch.
  - Die Gegenprüfung nennt N11 damit gelöst. Offen ist nur die Bestätigung des neuen Elements (offene Frage 3). Ich ändere nichts, bis entschieden ist.

### Prüfzahlen (Endstand C1)
- `npm test`: 248/248 (`test-C.log`).
- `npx tsc --noEmit -p .` mit vorübergehender `next-env.d.ts`: 0 Fehler (`tsc-C.log`).
- `npx eslint` über die 9 Dateien des Diffs: 0 (`eslint-C.log` ist leer).
- `werte.mjs --arbeitsbaum --dateien …` über die 9 Dateien und beide CSS-Dateien: 0 Befunde (`werte-C/`).
- `next build`: ok (`build-C1.log`).
- `ueberlappung.mjs` auf `/` (m360, m390, t1024, d1440, d1920): je 0 (`sicht-C/ueberlappung/`).
- Seitenbreite: Auf allen zehn Geräten ist `scrollWidth` gleich der Fensterbreite.
- **Zum Schluss:**
  - Den Server habe ich über die Prozessgruppe beendet.
  - `node_modules` ist wieder ein Verweis.
  - `.next`, `next-env.d.ts` und `tsconfig.tsbuildinfo` sind gelöscht.
  - Im Repository gibt es keine Änderung.
- **Dateien der Nacharbeit:**
  - `src/components/kern/Karussell.tsx`: DOM-Folge, `sm:order-last`, Kommentar.
  - `src/components/common/Footer.jsx`: `@md` statt `@xs`, Kommentar.
  - `src/components/vorlagen/teile/Stimmen.tsx`: nur der Kopfkommentar.
