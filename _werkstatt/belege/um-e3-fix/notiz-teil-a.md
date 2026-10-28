# UM-E3-FIX · Teil A (F1 bis F3) · Notiz des Baumeisters

Arbeitskopie `…/scratchpad/fix/baum`, Stand vorher `…/fix/vor-A` (rsync fehlt auf dem Host, abgelegt mit `tar` ohne `node_modules` und `.next`, sonst gleich). Diff `…/fix/UM-E3-FIX-A.diff` (19 Dateien, Stand nach der Nacharbeit unten). Bilder des Sichtabgleichs unter `…/fix/sicht-A/` (Bau in der Arbeitskopie, `next start -p 4391`, Playwright nur über `installSperre` und `setzeEinwilligung`, Einwilligung „abgelehnt“, DPR 1). Server per Prozessgruppe beendet, `node_modules` wieder als Verweis, `.next` gelöscht.

## Entwurf

Der mittige Einstieg bleibt (E-047). Er bekommt eine rote Schnur als Grundlinie unter der H1. An ihrem linken Ende beginnt das Lot der Leitachse und läuft ohne Lücke in den Leitfaden der Seite über. Das Bild im ersten Bildschirm ist damit eine Laserkreuzlinie: waagerecht die Schnur, senkrecht das Lot. Die H1 ist auf `/` ab lg eine Stufe größer, das Foto zwei Drittel der Spalte breit, aber nie höher als ein Bildschirm.

## Befunde

### F1 · Einstieg ab t1024: umgesetzt
- **H1:** auf `/` ab lg `fs-7` (Eigenschaft `titelGross` aus `WorumInhalt`, nur in `START` gesetzt). Alle übrigen Seiten mit mittigem Einstieg bleiben einheitlich bei `fs-6`; die Längenregel `KURZE_ZEILE` ist entfallen (Nacharbeit).
  - `/`: d1440 92 px statt 56 px, d1280 85 px, t1024 71 px. Mobil unverändert 32,6 px.
- **Foto:** ab lg `einstieg-foto` (neue Utility in `globals.css`): zwei Drittel der Spalte, höchstens `(100svh − 24 Stufen) · --bild-format`. `--bild-format` setzt die Vorlage aus der Bilddatei (Kennung) bzw. 4 : 5 für das Startbild (Bildplatz Einstieg). Vollständig im eigenen Seitenverhältnis und immer ganz in einem Bildschirm unter dem Kopf.
  - Breite × Höhe: t1024 536 × 669, d1280 561 × 701, d1440 641 × 801, d1920 785 × 981, d2560 809 × 1011 (zwei Drittel). Vorher A1: 617 × 770 bis 809 × 1011, vor A etwa 485 px breit.
  - Es ist das LCP-Element auf allen zehn Geräten außer m360 (dort der Satz zum ersten Schritt, wie vor A), gemessen, siehe Prüfzahlen. Vorladen mit `imageSizes` und `fetchPriority="high"` steht im HTML (`EINSTIEG_MITTE_SIZES`, eine Quelle für Vorlage und `page.tsx`).
  - `arbeiten.ts` und die Bildverteilung sind unberührt. Ein Querformat gibt der Bestand nicht her: Die Originale sind 1080 × 1350 oder quadratisch, und hochskaliert wird nie.
- **Schnur:** 1 px `bg-laser`, von der Achse bis zur gespiegelten Stelle rechts (`SCHNUR_LAGE`).
  - Abstand zur H1 `schnur-abstand` = 0,25em: Das ist mehr als der Überstand der Zeilenmaske (0,2em). Mobil haben die Unterlängen gut 8 px Abstand.
- **Lot:** `Laserachse` im Einstieg (`.einstieg-lot`), von der Schnur bis zum Fuß des Einstiegs.
  - Es läuft mit demselben Bereich wie der Leitfaden (`cover 60vh … calc(100% - 40vh)`): rot gezogen bis zur Leselinie, danach übernimmt die Leitachse ohne Lücke.
  - Reduziert, ruhig und ohne JavaScript ist das Lot grau (Grundschicht), die Schnur bleibt rot.
- **Abstände ab lg (Nacharbeit):** H1 oben `pt-24` (vorher `lg:pt-32`), Knopfzeile `lg:mt-6`, erster Schritt `lg:mt-6`, Bewertung `lg:mt-3`, Foto `lg:pt-8`. So ragt das Foto auf t1024 154 px und auf d1280 148 px in den ersten Bildschirm.
- **Vorlage:** Die Änderungen gelten in der Vorlage `EinstiegMitte`, also auf allen acht Seiten mit mittigem Einstieg. `fs-7` hat davon nur `/`.
- **Bilder** (Stand nach der Nacharbeit):
  - erster Bildschirm `sicht-A/n2/t1024-oben-start-00.png`, `d1280-oben-start-00.png`, `d1440-oben-start-00.png`, `d1920-oben-start-00.png`, `m390-oben-start-00.png`
  - Foto ganz unter dem Kopf `sicht-A/n2/foto/<gerät>-foto-ganz-start.png` (t1024 bis d2560)
  - übrige Seiten `sicht-A/n2/seiten/bogen-d1440.png`
  - Stand A1 zum Vergleich: `sicht-A/r2/`, `sicht-A/seiten/`

### F2 · Eingang „An der Schnur“: umgesetzt
- Nur CSS unter `html.k-eingang.k-bewegung:not(.k-notaus):not(.k-wiederkehr)`: `eingang-schnur` (`scale` 0 → 1 von links) in `dauer-3` mit `ease-laser`.
- Die Zeilen beginnen bei `dauer-2`, wenn die Schnur gut zur Hälfte gezogen ist. Sie steigen mit `ease-setzen` hinter ihren Masken über der Schnur auf, nie durch sie hindurch. Das ist im Bild geprüft; vorher lief die Maske 6 px unter die Schnur.
- **Takt voll:**

  | Teil | Zeit |
  |---|---|
  | Logo | 0–800 ms |
  | Schnur | 0–600 ms |
  | Zeilen | 320–1040 ms |
  | Ort | 680–1280 ms |
  | Nebenlink, Knöpfe, erster Schritt, Bewertung | 800–1400 ms |
  | Fugenriss | 800–1400 ms |
  | gesamt | 1,40 s (≤ 1,5 s) |

- **Wiederkehr:** unverändert, nur Zeilenmasken; die Schnur steht.
- **Endzustand:** gleich dem Ruhezustand mit Schnur (`backwards`). Druck und erzwungene Farben ohne Animation. Kein Spiegel nötig, weil alles an `k-bewegung` hängt.
- **Logo-Aufbau beim Erstbesuch geprüft:** bei 0 ms verdeckt, bei 150 ms halb, ab etwa 450 ms ganz, Ende vor 800 ms.
- **Register:** `register.ts` und `register.json` zu `eingang` und `zeilenmaske` nachgezogen. Neu sind die Kurve `--ease-laser` und die Dauer `dauer-2`; `dauer-1` entfällt. Die Staffel bleibt bei 8 und 6.
- **Lesefolge (Nacharbeit):** `data-eingang="knoepfe"` steht jetzt an drei Teilen in derselben einen Regel: an einer Hülle um Nebenlink und Knopfzeile, am Satz zum ersten Schritt und an einer Hülle um die Bewertung. Die Folge ist Schnur, H1, Ort, Rest. Unter sm bleibt der Satz zum ersten Schritt ab dem ersten Bild stehen (`max-sm:animate-none`), weil er dort das LCP-Element sein kann (m360) und das nie unsichtbar startet (E-067-4).
- **Bilder** (Erstbesuch, Animationen angehalten und gesetzt):
  - nach der Nacharbeit `sicht-A/n2/e/bogen-d1440.png`, `bogen-t1024.png`, `bogen-m360.png` (Einzelbilder `sicht-A/n2/e/<gerät>-eingang-<ms>.png`)
  - Stand A1 `sicht-A/e2/bogen-d1440.png`, `sicht-A/e2/bogen-m390.png`
  - `sicht-A/e2/bogen-ausschnitt-d1440.png` (450, 600 und 800 ms an der Schnur)
  - Einzelbilder `sicht-A/e2/<gerät>-eingang-<ms>.png` für m390, t1024, d1440 und d1920

### F3 · Leitachse mobil und doppelte Marke: umgesetzt
- **Achse mobil:** 4 px vom Rand (`ACHSE_LAGE` `left-1`). Kreuze auf dem Lot sind mobil 8 px groß (`KREUZ_GROESSE` `size-2 md:size-3`).
  - Abstand zum Text: Lot gut 10 px, Kreuz 8 px.
  - Nachgezogen, damit nichts am Rand abgeschnitten wird: Abschnitt, Kreuzlinie, ReviewsSection, Stelzlager, Terrassenplatten, Ablauf-Treppe (mobil `-ml-3`, liegt weiter genau auf dem Lot) sowie die ruhenden Bausteine Weg und Planblatt.
- **Kopfkreuz (Abschnittsmarke):** unter md ausgeblendet (`max-md:hidden`). Ab md steht es 10 px vor dem Text.
- **Abschnittskreuze im Leitfaden:** nur auf einer Trennlinie, also an der Kante einer Fliese- oder Tintefläche (`data-kante`) und am Abschnitt direkt danach (`globals.css` „abschnitt-kreuz“).
  - Auf `/` entfallen dadurch die Kreuze über „Was möchten Sie ändern?“ und „Wir kümmern uns …“. Das gilt in allen Zuständen, auch ruhig.
  - Andere Leitachsen (Wissens- und Ortsseiten) bleiben, wie sie sind.
- **Kilometerskala (ab xl):** Ihre Linie beginnt auf der Achse, das rote Ursprungskreuz sitzt auf dem Lot. Ein Kreuz markiert so beides; vorher standen zwei Kreuze 16 px nebeneinander.
- **Überlappungsprüfung** (`ueberlappung.mjs`, `/`, m360, m390, t1024, d1440, d1920): 0 Befunde. Schnur und Lot tragen `data-leitachse`.
- **Bilder:**
  - `sicht-A/r2/bogen-m390-reduziert.png`, `bogen-m390-ruhe.png`
  - `sicht-A/r2/bogen-d1440-ab.png`
  - `sicht-A/r2/d1440-ruhe-start-ab-einsatzgebiet.png`
  - `sicht-A/r2/bogen-t1024-d1920.png`

## Prüfzahlen (nach der Nacharbeit neu erhoben)
- `npm test`: 248/248.
- `npx tsc --noEmit -p .` mit vorübergehender `next-env.d.ts`: 0 Fehler.
- `npx eslint` über 16 Code-Dateien: 0. Die zwei CSS-Dateien prüft eslint nicht.
- `werte.mjs --dateien` (Kopie der Werkzeuge in der Arbeitskopie, also gegen deren `globals.css`) über 18 Dateien: 0 Befunde.
- `next build`: ok. `ueberlappung.mjs` auf `/` für m360, m390, t1024, d1280, d1440, d1920: 0 Befunde.
- `erstesbild.mjs` (`/`, `/balkon-terrasse`, `/bad`, zehn Geräte): nach der Einwilligung 30 von 30 bestanden. Im Erstbesuch verdeckt das Banner wie im Tor E3 Knöpfe auf m360, m390 und q844 (8 Fälle, gleiche Art wie `belege/e3/erstes-bild.json`).
- **LCP-Element** (PerformanceObserver, Erstbesuch und Wiederkehr gleich, `sicht-A/n2/lcp.json`):

  | Gerät | LCP `/` | Fläche Foto | Foto sichtbar | größte H1-Zeile | Foto passt in den Bildschirm | geladene Breite |
  |---|---|---|---|---|---|---|
  | m360 | Satz erster Schritt (P), 320 ms, sichtbar ab dem ersten Bild | 0 | 0 px | 8 843 | ja | 640 |
  | m390 | Foto | 45 568 | 128 px | 9 166 | ja | 640 |
  | m430 | Foto | 83 952 | 212 px | 9 667 | ja | 640 |
  | q844 | Foto | 26 760 | 60 px | 7 355 | nein (wie vor A, unter lg unverändert) | 640 |
  | t768 | Foto | 188 212 | 422 px | 14 435 | ja | 640 |
  | t1024 | Foto | 82 544 | 154 px | 43 900 | ja | 640 |
  | d1280 | Foto | 83 176 | 148 px | 62 578 | ja | 640 |
  | d1440 | Foto | 148 302 | 231 px | 73 108 | ja | 750 |
  | d1920 | Foto | 323 046 | 411 px | 73 108 | ja | 828 |
  | d2560 | Foto | 622 968 | 771 px | 73 108 | ja | 828 |

  Vorher (Prüfer A): t1024 und d1280 eine H1-Zeile, d1920 und d2560 w=1920. `fs-7` hat nur noch `/`. Gegenproben m360, m390, t1024, d1280, d1440, d1920 auf `/balkon-terrasse`, `/bad`, `/ueber-uns`, `/referenzen`, `/leistungen`, `/bad/badsanierung` und `/bad/barrierefreies-bad`: ab m390 überall das Foto, auf m360 überall der Satz zum ersten Schritt (`sicht-A/n2/lcp_*.json`).
- **Lighthouse** (Desktop-Preset mit Fenster des Geräts, frisches Profil, Dritt-Hosts blockiert, Median aus 3 nach Aufwärmlauf, `sicht-A/n2/lh/lighthouse.json`): t1024 Leistung 100, LCP 618 ms, CLS 0, LCP-Element `img`. d1280 Leistung 100, LCP 582 ms, CLS 0, LCP-Element `img`.

## Nacharbeit nach der Prüfung von Teil A (zwei Prüfer, neun Befunde)

Jeden Befund am Bau in der Arbeitskopie nachgeprüft (`next start -p 4391`, Playwright nur über `installSperre` und `setzeEinwilligung`). Skripte unter `…/fix/sicht-skript/` (`lcp.mjs`, `foto.mjs`, `lh-geraet.mjs`), Belege unter `…/fix/sicht-A/n2/`.

**Behoben**
- **LCP auf t1024 und d1280 (hoch, beide Prüfer):** bestätigt; der Stand A1 hatte dort eine H1-Zeile als LCP-Element, die im Eingang hinter der Maske unsichtbar beginnt (E-067-4). Ab lg sind die senkrechten Abstände knapper: H1 oben `pt-24` statt `lg:pt-32`, Knopfzeile `lg:mt-6`, erster Schritt `lg:mt-6`, Bewertung `lg:mt-3`, Foto `lg:pt-8` statt `lg:pt-16`. Das Foto beginnt bei t1024 auf 614 statt 730 (154 px sichtbar), bei d1280 auf 652 statt 768 (148 px). Es ist dort wieder das LCP-Element mit der größten Fläche (82 544 und 83 176 gegen 43 900 und 62 578 der größten H1-Zeile). `fs-7` bleibt auf `/` ab lg. Mobil ist alles unverändert.
- **Foto höher als der Bildschirm (mittel):** bestätigt (t1024 770 px bei 704 sichtbar, d1280 984 bei 736, d1440 1011 bei 836). Lösung: `einstieg-foto` (siehe F1). Auf allen lg-Geräten steht das Foto in der Stellung „Oberkante 16 px unter dem Kopf“ ganz im Bild (`sicht-A/n2/foto/`). Zwei Drittel der Spalte bleiben, wo der Platz reicht (d2560). Auf t1024 bis d1920 ist das Foto dafür schmaler als zwei Drittel (536 bis 785 px). E-047 „Bilder vollständig“ geht hier der Breitenangabe in F1 vor.
- **Lesefolge im Eingang (mittel):** bestätigt. Nebenlink, erster Schritt und Bewertung setzen sich jetzt mit der Knopfzeile (F2, „Lesefolge“). Weitere Selektoren in der Setz-Regel hätten Test „Eingang 1“ verletzt: Er zählt je Selektor, erwartet sind genau zwei. Darum trägt die Regel weiter einen Selektor, und der Wert `data-eingang="knoepfe"` steht an drei Elementen. Der Test ist unverändert, der Takt (1,40 s) und der Endzustand bleiben gleich. Unter sm bleibt der Satz zum ersten Schritt sichtbar: Mit dem Vorschlag der Prüfer begann das LCP-Element auf m360 unsichtbar, es kam bei 1 740 statt 320 ms. Darum `max-sm:animate-none`. Bilder: `sicht-A/n2/e/bogen-d1440.png`, `bogen-t1024.png`, `bogen-m360.png`.
- **H1-Stufe springt zwischen den Hauptseiten (gering):** bestätigt (`/balkon-terrasse` 92 px, `/bad` 56 px). `fs-7` nur über `titelGross` auf `/`, die Längenregel entfällt. Damit ist `/balkon-terrasse` auch auf t1024 und d1280 wieder mit dem Foto als LCP-Element. `sicht-A/n2/seiten/bogen-d1440.png`.
- **`sizes` zu groß (gering):** bestätigt (d1920 und d2560 w=1920 bei 809 px). Neu: `(min-width: 1024px) min(calc(66.67vw - 4rem), 51rem, calc(80vh - 4.8rem)), (min-width: 640px) 28rem, 100vw`. Das ist die Breite von `einstieg-foto` samt Höhengrenze. Geladen werden jetzt t1024 und d1280 w=640, d1440 w=750, d1920 und d2560 w=828. Chrome wertet `min()` in `sizes` aus, im HTML geprüft (`imageSizes` am Vorladen).

**Nicht behoben (Entscheidung beim Orchestrator)**
- **Doppelte Marke an der Kilometerskala und Kopfkreuz neben der H2 (gering, beide Prüfer, Frage 5):** bestätigt. Steht die Leselinie genau auf dem Ursprung, liegen beide Kreuze deckungsgleich (`sicht-A/n2/foto/d1440-kette-leselinie.png`, `d1440-kette-zoom.png`). Einige Pixel daneben entsteht das „‡“. Dasselbe gilt für jede schwarze Abschnittskante, an der die rote Marke vorbeiläuft. Beide vorgeschlagenen Wege ändern beschlossene Gestaltung: E-040 sagt „Der Ursprung bleibt das rote Fugenkreuz“, und die Abschnittsmarke ist das Leitfaden-Motiv aus K-007 (UM-E3-LEIT). Das Kreuz ohne Kenntnis der Lage nur zeitweise auszublenden, geht nicht in reinem CSS. Unverändert.
- **Schnur eher Trennlinie als Grundlinie (gering, Frage 2):** bestätigt (d1440 25 px über, 31 px unter der Schnur). Näher an die Unterlängen geht nur mit einer kürzeren Zeilenmaske. Die Maske steht in `eingang-zeile` für alle Einstiege (0,2em für Unterlängen, K-006). Sonst laufen die Zeilen im Eingang durch die Schnur. Das ist weder klein noch eindeutig richtig. Unverändert.

## Offene Fragen
1. **JPEG im Bildsatz:** Die 1-px-Schnur ist auf dem Bildschirm rot (216, 32, 32). Als JPEG mit 4:2:0-Unterabtastung, wie in `bildsatz.mjs` mit Qualität 70, wird sie dunkelbraun (138, 67, 71) und kann im Bildsatz grau wirken. Vorschlag: den Ausschnitt als PNG aufnehmen oder die Schnur nach K-009 in 2 px setzen (`border-t-2`; `h-0.5` ist keine erlaubte Stufe).
2. **Wortlaut F1 und F2, Lage der Schnur:** F1 sagt „Grundlinie unter der H1“, F2 sagt „Grundlinie der ersten Zeile“. Die Schnur liegt unter der letzten Zeile, beide Zeilen setzen darauf auf; bei einer einzeiligen H1 ist beides gleich. Eine Linie zwischen den Zeilen würde die H1 zerteilen. Soll sie näher an die Unterlängen, muss die Zeilenmaske für alle Einstiege kürzer werden (siehe oben).
3. **Reichweite:** Einstieg (alle acht Seiten mit mittigem Einstieg: Abstände ab lg, Foto, Schnur, Lot, Eingang), Achse mobil 4 px (alle Leitachsen) und Kreuzregel (alle Leitfäden) wirken über `/` hinaus. In Stufe A sind deshalb Pixelabweichungen auf diesen Hauptansichten zu erwarten. `fs-7` gilt jetzt nur für `/`.
4. **Fotobreite gegen F1:** F1 verlangt mindestens zwei Drittel der Spalte, E-047 ein Foto, das man ganz sieht. Mit der Höhengrenze erreicht das Hochformat zwei Drittel erst ab etwa 1 110 px Fensterhöhe (d2560). Ein Querformat in voller Breite gibt der Bestand nicht her. Wird die Breite höher gewichtet, wäre der Kompromiss ein kleinerer Rand: 4 statt 8 Stufen ergeben auf d1440 656 statt 641 px.
5. **Kopfkreuz am Desktop:** Es bleibt. Es kann kurz neben dem Skalenkreuz, neben einer schwarzen Abschnittskante oder neben einer H2 vorbeilaufen, mit 10 px Abstand (siehe oben).
6. **Ruhig:** Das Lot bleibt grau (R-01a). K-007 „steht vollständig“ und Prüfer 1 wünschen es rot; das ist nicht Teil von F3.
7. **Erstbesuch mobil, Banner:** Auf m360, m390 und q844 verdeckt das Einwilligungsbanner Hauptknopf oder Anruf (`erstesbild.mjs`, wie im Tor E3; M-28). `/` auf m390 ist seit A1 dabei: Der Anrufknopf liegt durch den Schnurabstand 8 px tiefer. In dieser Runde ist mobil nichts verändert.
8. **Erster Schritt auf Handys im Eingang:** Er steht unter sm weiter ab dem ersten Bild, als LCP-Element auf m360. Ihn einzubinden ginge nur, wenn dort ein anderes Element das LCP-Element wäre oder die H1 früher käme (Zeilen ab `dauer-1`). Dann zöge die Schnur aber nicht mehr vor den Zeilen.
