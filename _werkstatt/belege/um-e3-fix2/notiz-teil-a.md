# UM-E3-FIX2 · Teil A (N1 bis N7) · Notiz des Baumeisters

Alle folgenden Pfade liegen unter `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/fix2/`.

- Arbeitskopie `baum`, Stand vorher `vor-A` (= `vorher` = HEAD, unverändert übernommen).
- Diff `UM-E3-FIX2-A.diff`: 17 Dateien (Stand nach der Nacharbeit, Abschnitt unten). Probe `patch -p1 --dry-run` gegen `vorher` ist sauber.
- Nur die Nacharbeit: `UM-E3-FIX2-A-nacharbeit.diff` (gegen `vor-AN`, den Stand vor der Nacharbeit, 8 Dateien).
- Sichtabgleich: Bau in der Arbeitskopie, `next start -p 4393 -H 127.0.0.1`. Playwright lief nur über `installSperre` und `setzeEinwilligung` (Einwilligung „abgelehnt“), mit DPR 1 und als PNG.
- Skripte liegen in `skript/`.
- Zum Schluss habe ich den Server über die Prozessgruppe aus `server-4393.pid` beendet. `node_modules` ist wieder ein Verweis; `.next`, `next-env.d.ts` und `tsconfig.tsbuildinfo` sind gelöscht.

## Wiederaufnahme
- Den abgebrochenen Anlauf habe ich per diff gegen `vor-A` gesichtet (`zwischen-A.diff`), neu gebaut (A4) und in m390, t1024, d1440 und d1920 mit Bewegung angesehen und vermessen.
- **Übernommen:** alle Änderungen.
- **Verworfen:** ein Teil, das neue Token `--text-fs-8`.
  - Grund: `werte.mjs` meldete es (`schrift_ausserhalb`), und KERN K-006 kennt nur die Skala fs-1 bis fs-7.
  - Ersatz: siehe N7.
- Danach habe ich neu gebaut (A5, Endstand) und alles neu geprüft.

## Prüfzahlen (Stand A5, vor der Nacharbeit; Endstand A7 siehe „Nacharbeit“ unten)
- `npm test`: 248/248.
- `npx tsc --noEmit -p .` mit vorübergehender `next-env.d.ts`: 0 Fehler.
- `npx eslint` über 12 Code-Dateien: 0.
- `werte.mjs --arbeitsbaum --dateien …` über 14 Dateien, beide CSS-Dateien eingeschlossen: 0 Befunde.
  - Die Werkzeuge der Arbeitskopie liefen gegen deren `globals.css`, `node_modules` vorübergehend verlinkt.
- `next build`: ok (`build-A5.log`).
- `ueberlappung.mjs` auf `/` (m360, m390, t1024, d1440, d1920): 0 Befunde.
- **Kreuze im Leitfaden** (`skript/kreuze.mjs`, Schritt 6 px über die ganze Seite, `/`; Bau A4, im Leitfaden gleich A5):

  | Gerät | Kreuz neben H2, H3 oder Formular | zwei Kreuze < 24 px | kleinster Abstand Rot zu anderem Kreuz | Einrasten (Schritte) |
  |---|---|---|---|---|
  | m390 | 0 | 0 | 183 px (kein Kopf mobil) | 40 |
  | t768 | 0 | 0 | 65 px | 40 |
  | t1024 | 0 | 0 | 98 px | 40 |
  | q844 | 0 | 0 | 68 px | 40 |
  | d1440 | 0 | 0 | 99 px | 40 |
  | d1920 | 0 | 0 | 110 px | 45 |

  - „ruhig“ und reduziert (d1440): kein Kopf, kein Einrasten, alle Kanten schwarz.
  - Gegenproben d1440: `/bad`, `/balkon-terrasse` und `/referenzen` je 0. Zu `/ueber-uns` siehe offene Frage 4.
  - Überholt durch die Nacharbeit: Die Gegenproben ließen `/leistungen` aus, und `/ueber-uns` hatte auch einen Kopf neben einer H2. Jetzt alle acht Seiten der Vorlage auf t768, t1024, d1440 und d1920 mit 0 Befunden (Tabelle unten).
  - Daten: `sicht-A2/kreuze-an.json`, `kreuze-ruhig.json`, `kreuze-reduziert.json`.
- **LCP** (`skript/lcp.mjs`, Erstbesuch und Wiederkehr gleich, `sicht-A2/lcp2/lcp.json`):
  - Das LCP-Element ist das Foto auf allen Geräten außer m360.
  - Auf m360 ist es der Satz zum ersten Schritt, sichtbar ab 0 ms, wie vor A.
  - Foto im ersten Bildschirm:

    | Gerät | vorher | jetzt |
    |---|---|---|
    | t1024 | 154 px | 320 px |
    | d1280 | 148 px | 320 px |
    | d1440 | 231 px | 400 px |
    | d1920 | 411 px | 518 px |

- **Containing Block:** Die neue Hülle `.abschnitt-inhalt` (relative) steht auf 125 von 164 Seiten der Sitemap. Neu auf sie bezogen sind nur `sr-only`-Elemente; sichtbar ändert sich dadurch nichts (`sicht-A2/bezug.json`).

## Befunde

### N1 (hoch) · Kopf der Leitachse: umgesetzt
- **Wahl:** In weißen Abschnitten ist der Kopf weg. Die Achse läuft dort nicht grau weiter.
  - Fliese und Tinte decken das Lot mit Absicht (Gutachten u8).
  - Mobil zeichnet die Ablauf-Treppe ihre eigene rote Linie auf der Achse.
- **Kopf je Abschnitt (`kern/Abschnitt`):**
  - Eine Bahn steht nur neben dem Inhalt eines Abschnitts auf Kalk (gestapelt, Satzspiegel). Sie beginnt unter H2 und Einleitung und endet über dem unteren Innenabstand.
  - So steht der Kopf nur auf einer gezeichneten Achse. Nie neben einer H2, nie neben dem Formular (Fliese), und nie näher als 64 px an einem Kantenkreuz.
  - Mobil gibt es keinen Kopf.
- **Fangbereich:** Das Kantenkreuz bekommt eine rote Kopie (`kreuz-rot`). Solange die Leselinie die Kante auf ±24 px trifft, ist nur das rote Kreuz zu sehen (view-timeline des Abschnitts, `.abschnitt-lot`).
- **Entfernungsskala:** `data-kopf-pause="1"` am Raster der Einsatzorte, `"2"` an der breiten Gruppe von md bis xl.
  - Der Kopf tritt zurück, bis die Leselinie 128 px unter ihrer Oberkante liegt.
  - Am Ursprung steht genau ein rotes Kreuz, neben den Gruppenköpfen keines.
- **Technik:**
  - Nur CSS unter `html.k-bewegung` mit `@supports (timeline-scope)`, im Bereich `cover 60vh … cover 100% − 40vh`.
  - Spiegel für „ruhig“ in `bewegung.css`. Druck und erzwungene Farben: kein Kopf, kein rotes Kantenkreuz.
  - Register `leitachse` (ts und json) nachgezogen.
- **Bilder:**
  - Belegstellen der Prüfer, jetzt ohne Kreuz im Weiß und ohne Doppelkreuz:
    - `sicht-A3/bewegt/d1440/start/07.png`, `08.png`
    - `sicht-A3/bewegt/t1024/start/05.png`, `09.png`, `10.png`
    - `sicht-A3/bewegt/d1920/start/03.png`, `05.png` bis `08.png`
  - Einrasten: `sicht-A3/stellen/d1440-an-kante-ablauf.png`, `d1440-an-kante-termin.png`.
  - Ursprung: `sicht-A3/stellen/d1440-an-orte-ursprung.png`, `d1920-an-orte-ursprung.png`.
  - Kopf auf der Linie: `sicht-A3/bewegt/d1440/start/04.png`.
  - ruhig und reduziert: `sicht-A3/stellen/d1440-ruhig-kante-ablauf.png`, `d1440-reduziert-kante-ablauf.png`.
  - Übersicht: `sicht-A3/bogen-stellen-d1440.png`.

### N2 (mittel) · Achse mobil: umgesetzt
- **Lage:** `ACHSE_LAGE` mobil `left-2`, also 8 px vom Rand, mittig vor dem Satz (16 px). Die Kreuze (8 px) stehen ganz im Bild (x 4 bis 12).
- **Schnur:** endet passend bei `right-2` (`SCHNUR_LAGE`).
- **Nachgezogen:** Ablauf, Weg, Planblatt (`-ml-2` bzw. `-left-2`).
- **Ablauf mobil:** Das Kreuz steht am Anfang der Linie, 24 px über der Nummer, also nie auf Höhe einer Textzeile. Die Abstände zwischen den Schritten bleiben 48 px.
- **Bilder:** `sicht-A3/bewegt/m390/start/00.png`, `03.png`, `04.png`, `sicht-A3/stellen/m390-an-kante-ablauf.png`.

### N3 (mittel) · Lot am Desktop: umgesetzt
- **Lotstück (`.lot-stueck`):**
  - 2 px Laser auf der Achse, von der Schnur bis 16 px unter die Knopfreihe.
  - d1440: 162 statt 26 px. Ort und Hauptknopf stehen an der Linie.
  - Darunter übernimmt ohne Lücke das gezogene Lot des Leitfadens.
- **Zustände:** Es steht in jedem Zustand rot wie die Schnur. Im Eingang zieht es mit der Schnur aus dem Kreuzpunkt nach unten (siehe offene Frage 1).
- **Bilder:** `sicht-A3/bewegt/d1440/start/00.png`, `d1920/start/00.png`, `t1024/start/00.png`.

### N4 (mittel) · Erster Bildschirm am Desktop: umgesetzt
- **Straffung ab lg:**
  - Ort und Orte-Link stehen in einer Zeile.
  - Erster Schritt und Bewertung stehen unter dem Foto (per `order`). Quelltext, Vorlese- und Tabfolge bleiben wie mobil; dazwischen liegt nichts Fokussierbares.
  - Unter dem Einstieg bleibt bis zur nächsten H2 eine Fliesenstufe (96 px statt rund 200 px).
- **Foto:** Das Startbild bleibt (E4-W0 unberührt), vollständig, das LCP-Element und mit `EINSTIEG_MITTE_SIZES` vorgeladen. Es beginnt auf d1440 bei y 500 statt 668. Im ersten Bildschirm stehen Wandfliesen und Armatur statt nur der Decke (siehe Tabelle oben).
- **Bilder:** `sicht-A3/bewegt/t1024/start/00.png`, `d1440/start/00.png`, `d1920/start/00.png`, `d1440/start/01.png` (Abstand zur H2).

### N5 (mittel) · Quadratmeter an der Schnur: umgesetzt
- **Zeichnung:** `vorlagen/teile/Quadratmeter.tsx`, Inline-SVG mit Tokens und `aria-hidden`.
  - Vier Platten zu 50 × 50 cm, Maßlinien mit Pfeilen und Hilfslinien, „100 cm“ in Mono wie an den Plan-Vignetten.
  - Die rote Schnur ist die Waage und ersetzt die Unterkante.
- **Einsatz:** nur auf `/` (`WorumInhalt.quadratmeter`), absolut gesetzt (kein CLS).
- **Lage:** Die rechte Kante steht über dem Ende der Schnur.
- **Sichtbarkeit:** ~~nur bei einer H1-Spalte ab 56rem~~, seit der Nacharbeit ab lg und nicht flach (t1024 bis d2560). Bei 200 % Schrift und mobil ist sie weg.
- **Eingang:**
  - Die Kanten zeichnen sich: 320 bis 880 ms, links hoch, oben, rechts herab.
  - Danach setzen sich Fugen und Maße: 680 bis 1280 ms.
  - Ruhig, reduziert und in der Wiederkehr steht sie fertig.
  - Register `eingang` nachgezogen.
- **Bilder:** `sicht-A2/qm-zoom-d1440.png`, `sicht-A3/bogen-eingang-d1440.png`, `sicht-A3/eingang/d1440-eingang-0600.png`. Reduziert: `sicht-A/reduziert/d1440-reduziert-start-00.png` (Bau A3, am Desktop gleich).

### N6 (mittel) · Eingang mobil: umgesetzt
- **Unter sm:** Ort, Orte-Link, Knöpfe, erster Schritt, Bewertung und Lotstück stehen ab 0 ms (`max-sm:animate-none`). Der Fugenriss entfällt.
- **Was hereinkommt:** nur die Schnur (0 bis 320 ms) und die H1-Zeilen (140 bis 860 ms). ~~Gesamt 0,86 s.~~ Korrektur der Nacharbeit: Die unveränderte Flucht der zweiten Zeile (sig-flucht) läuft als Zeitstrahl bis 920 ms; sichtbar endet der Eingang bei 0,86 s (siehe unten).
- **Desktop:**
  - Die erste Zeile beginnt bei 140 ms, wenn die Schnur halb gezogen ist (`dauer-2` mit `ease-laser`).
  - Ab 300 ms steht die erste Zeile.
  - Gesamt bleibt 1,40 s.
- **Unverändert:** Der Logo-Aufbau bleibt. LCP-Kandidaten starten nie unsichtbar (siehe LCP).
- **Bilder:** `sicht-A3/bogen-eingang-m390.png`, `sicht-A3/eingang/m390-eingang-0000.png`, `sicht-A3/eingang/d1440-eingang-0150.png`, `-0300.png`.

### N7 (gering) · H1 mobil: umgesetzt
- **Lösung:** Auf `/` setzt die H1 unter sm `fs-7`. Das Token ist neu gestimmt: `clamp(2rem, 1.25rem + 5vw, 5.75rem)` statt `1rem + 5,4vw`.
  - Mobil: m360 38 px (Zeile 298 von 328 px, 91 %), m390 39,5 px (87 %), m430 41,5 px.
  - Ab t1024 praktisch gleich: 71,2 statt 71,3 px, d1280 84 statt 85 px, d1440 92 px.
- **Große Schrift:** ~~Wird die Spalte schmaler als 20rem, steht die H1 eine Stufe kleiner (`@max-xs:text-fs-5`, wie im Planblatt).~~ Ersetzt in der Nacharbeit: Die Zeilen sind auf 16,5 % der Spalte begrenzt (`titel-spalte`, siehe unten); die Stufe fs-5 bei 110 bis 150 % ist weg.
  - ~~200 % auf m360: 48 px, längstes Wort „Quadratmeter.“ 258 von 296 px~~ (jetzt 48,8 px, 259 von 296 px), kein Überlauf, keine Seitenbreite über 360.
  - Von sm bis lg bleibt `fs-6`.
- **Bilder:** `sicht-A3/m390-erster.png`, `sicht-A2/h1b/m360-s100-oben.png`, `m360-s200-oben.png`. Messung: `sicht-A2/h1b/h1mass.json`.

## Dateien
- **Bewegung und Gestaltungswerte:** `src/app/bewegung.css`, `src/app/globals.css`.
- **Kern:** `src/components/kern/Abschnitt.tsx`, `src/components/kern/Leitachse.tsx`.
- **Vorlage:** `src/components/vorlagen/ErzaehlSeite.tsx`, `inhalt.ts`.
- **Teile:** `teile/EinstiegMitte.tsx`, `teile/Quadratmeter.tsx` (neu), `teile/Einsatzorte.tsx`, `teile/Ablauf.tsx`, `teile/EinstiegPlanblatt.tsx`.
- **Momente:** `src/components/momente/weg/Weg.tsx`, `src/components/momente/karte/Einsatzkarte.tsx` (Nacharbeit).
- **Leistungen:** `src/components/leistungen/Leistungsplaene.tsx` (Nacharbeit).
- **Inhalt:** `src/inhalte/start.ts`.
- **Register:** `src/lib/motion/register.ts`, `_werkstatt/register.json`.

## Offene Fragen
1. **Lotstück auch ruhig und reduziert rot:** Es gehört wie die Schnur zur Figur „An der Schnur“. Das lange Lot des Leitfadens bleibt dort grau (R-01a). Bitte bestätigen.
2. **fs-7 gilt seitenweit:** Die neue Stimmung wirkt auf alle H1 in fs-7, rund 48 Seiten: `/standorte`, `/leistungen/*/<ort>`, `/referenzen/badsanierung-grossformat` und das Planblatt mobil.
   - Mobil +2,6 px, am Desktop höchstens −1,5 px (d1366), 200 % unverändert.
   - Das längste Wort „Terrassensanierung“ passt auf m360 (280 von 328 px).
   - In Stufe A sind dort kleine Pixelabweichungen zu erwarten.
   - Alternative wäre fs-8 mit Eintrag in `werte-regeln.json` und KERN K-006. Das ist Sache des Orchestrators.
3. **Reichweite der Vorlage:**
   - Die Änderungen an EinstiegMitte wirken auf allen acht Seiten mit mittigem Einstieg: erster Schritt und Bewertung ab lg unter dem Foto, Ort und Link in einer Zeile, Lotstück, Eingang.
   - Der Kopf je Kalk-Abschnitt wirkt in allen Leitfäden.
   - Der Quadratmeter steht nur auf `/`.
   - Gegenprobe `/bad`: `sicht-A2/seiten/bogen-bad-d1440.png`.
4. **`/ueber-uns`:** (Erledigt in der Nacharbeit, siehe unten.) Der Kopf läuft an den H3 der Karte im Abschnitt Beleg vorbei („Bis 10 km ab Aßlar“). Sie stehen mittig in einer weißen Karte, rund 350 px von der Achse entfernt (`sicht-A3/ueber-uns-5216.png`).
   - Die strenge Prüfung, die nur senkrecht misst, zählt dort 62 Schritte.
   - Eine weitere `data-kopf-pause` wäre möglich, falls gewünscht.
5. **Lesefolge ab lg:** Erster Schritt und Bewertung stehen im Quelltext vor dem Foto, im Bild darunter. Fokusfolge unberührt; nur die Vorlesefolge weicht vom Bild ab.
6. **`ReviewsSection`** (`/referenzen`) hat ein eigenes Kantenkreuz ohne rote Kopie und rastet darum nicht ein. Dort steht kein Kopf in der Nähe (gemessen 0). Für Gleichheit ließe sich `kreuz-rot` ergänzen.
7. **Bildstände:** Die m390-Bilder vom Bau A4 (`sicht-A2/…`) zeigen die H1 noch mit 41 px (fs-8). Maßgeblich sind `sicht-A3/…` und `sicht-A2/h1b/…` (Bau A5).

## Nacharbeit nach der Prüfung von Teil A
Sieben Befunde der Prüfer (zwei mittel, fünf gering). Jeden habe ich im eigenen Bau nachgeprüft (Port 4393, Bau A6, Endstand A7). Alle sieben sind bestätigt. Sechs sind im Code behoben, einer durch Korrektur der Zahlen. Stand vor der Nacharbeit: `vor-AN`. Nur die Änderungen der Nacharbeit: `UM-E3-FIX2-A-nacharbeit.diff`.

### Prüfzahlen (Endstand A7)
- `npm test`: 248/248 (`test-A7.log`).
- `npx tsc --noEmit -p .` mit vorübergehender `next-env.d.ts`: 0 Fehler.
- `npx eslint` über die 14 Code-Dateien des Diffs: 0.
- `werte.mjs --arbeitsbaum --dateien …` über alle 16 Dateien unter `src/` (beide CSS-Dateien eingeschlossen, Werkzeug der Arbeitskopie): 0 Befunde (`werte-A7/`).
- `next build`: ok (`build-A7.log`).
- `ueberlappung.mjs` auf `/` (m360, m390, t1024, d1440, d1920): 0 Befunde (`sicht-AN/ueberlappung/`).
- **Kreuze im Leitfaden:** `skript/kreuze.mjs` lief in Schritten von 8 px über die ganze Seite, mit Bewegung. Gezählt wird der Kopf neben einer H2, H3 oder einem Formular (±12 px senkrecht) und zwei Kreuze näher als 24 px. Alle acht Seiten der Vorlage auf vier Geräten: **0 Befunde in allen 32 Läufen.**

  | Seite | t768 | t1024 | d1440 | d1920 |
  |---|---|---|---|---|
  | `/` | 0 (65) | 0 (100) | 0 (97) | 0 (116) |
  | `/bad` | 0 (68) | 0 (102) | 0 (102) | 0 (110) |
  | `/bad/badsanierung` | 0 (69) | 0 (98) | 0 (99) | 0 (114) |
  | `/bad/barrierefreies-bad` | 0 (65) | 0 (99) | 0 (98) | 0 (115) |
  | `/balkon-terrasse` | 0 (72) | 0 (103) | 0 (98) | 0 (109) |
  | `/leistungen` | 0 (70) | 0 (100) | 0 (98) | 0 (110) |
  | `/referenzen` | 0 (68) | 0 (104) | 0 (105) | 0 (114) |
  | `/ueber-uns` | 0 (68) | 0 (97) | 0 (103) | 0 (109) |

  - In Klammern steht der kleinste Abstand vom roten Kreuz zu einem anderen Kreuz in px.
  - Einrasten an Kanten bleibt: 18 bis 35 Schritte je Lauf.
  - „ruhig“ (`/leistungen`) und reduziert (`/ueber-uns`), d1440: kein Kopf, kein Einrasten.
  - Daten: `sicht-AN/kreuze/`.
- **Eingang beim ersten Besuch** (`skript/takt.mjs`, getAnimations, `sicht-AN/takt.txt`):
  - m360 und m390 enden bei 920 ms. Das sind die Schnur (0 bis 320 ms), die Zeilenmasken (140 bis 740 und 260 bis 860 ms), die Flucht (0 bis 800 und 120 bis 920 ms) und das Logo (0 bis 800 ms).
  - t768 und d1440 enden bei 1400 ms. Den Quadratmeter gibt es nur auf d1440.

### N7 (mittel) · H1 bei 110 bis 150 % Systemschrift: behoben
- **Befund bestätigt.** Die Stufe `@max-xs:text-fs-5` griff, sobald die Spalte schmaler als 20rem wurde. Auf m360 war das schon bei etwa 103 % Schrift der Fall. Die H1 hatte dann 26,4 px bei 110 %, 30 px bei 125 % und 36 px bei 150 %, also weniger als bei 100 % (38 px).
- **Lösung:** keine Stufe mehr. Die Zeilen der H1 stehen in der Stufe der H1 (`1em`). Sie werden erst kleiner, wenn das längste Wort sonst mehr als 89 % der Spalte füllte.
  - Regel: `.titel-spalte > * { font-size: min(1em, 16.5cqi) }` in `globals.css` (Schicht utilities, neben `schnur-abstand`), mit `cqi` am Container des Einstiegs.
  - „Quadratmeter.“ misst 5,37em, also füllen 16,5cqi höchstens 88,6 % der Spalte.
  - Die H1 trägt die Klasse nur mit `titelGross`. Kein neues Token: Die Stufe bleibt fs-7, fs-6 oder fs-5; `cqi` ist nur die Obergrenze.
  - Bei 100 % greift die Grenze auf keinem Gerät, die Werte dort bleiben unverändert.
- **Messung** (`skript/h1zeilen.mjs`, Schriftgröße der Zeilen, `sicht-AN/h1/h1zeilen.json`). Je Zelle: Schriftgröße in px / Anteil von „Quadratmeter.“ an der Spalte:

  | Gerät | 100 % | 110 % | 125 % | 150 % | 175 % | 200 % |
  |---|---|---|---|---|---|---|
  | m360 | 38 / 62 % | 40 / 66 % | 43 / 72 % | 48 / 83 % | 50,2 / 88 % | 48,8 / 88 % |
  | m375 | 38,8 / 61 % | 40,8 / 64 % | 43,8 / 70 % | 48,8 / 80 % | 52,6 / 88 % | 51,3 / 88 % |
  | m390 | 39,5 / 59 % | 41,5 / 63 % | 44,5 / 68 % | 49,5 / 78 % | 55,1 / 89 % | 53,8 / 88 % |
  | m430 | 41,5 / 56 % | 43,5 / 59 % | 46,5 / 64 % | 51,5 / 72 % | 56,5 / 81 % | 60,4 / 88 % |

  - In keinem Fall ist die H1 kleiner als bei 100 %.
  - Von 175 auf 200 % sinkt sie um gut 1 px, weil die Spalte mit dem Rand schmaler wird.
  - Kein Wort läuft über, und die Seite wird nie breiter als das Fenster.
- **Bilder:** `sicht-AN/h1/m360-s110-oben.png` (vorher 26 px, jetzt 40 px), `m390-s125-oben.png`, `m360-s200-oben.png`, dazu alle anderen Stufen als `<gerät>-s<schrift>-oben.png`.

### N1 (mittel) · Kopf neben „So sind wir gewachsen.“ auf `/ueber-uns`: behoben
- **Befund bestätigt.** Der Werkzeug-Slot (`company-history`, `titel: ''`) hat keinen eigenen Kopf. Darum begann seine Bahn über der H2 des verschachtelten Abschnitts CompanyHistory.
- **Lösung (`kern/Abschnitt`):** Die Marke gibt es nur in Abschnitten mit eigenem Titel oder Etikett (`marke = Boolean(kopfInhalt) && …`).
  - Ein Abschnitt ohne eigenen Kopf trägt einen Inhalt, der seine Überschrift selbst mitbringt. Er hat keine Bahn, und die Hülle `abschnitt-inhalt` entfällt dort (wie vor A).
  - Betroffen ist nur `/ueber-uns`: Alle übrigen Abschnitte mit `leitachse` haben einen Titel.
  - Damit entfallen dort auch die Köpfe neben den H3 der Zeitleiste.
- **Bild:** `sicht-AN/stellen/d1440-ueber-uns-8370.png`. Auf Höhe der H2 steht kein Kopf, das rote Lot endet auf der Leselinie.

### N1 (gering, zwei Befunde) · Kopf neben H3 in Karten auf `/leistungen` und `/ueber-uns`: behoben
- **Befund bestätigt.** H3 zählen als Überschrift im Sinn von N1 („nie ein Kreuz neben einer Überschrift“). Vorher meldete die Prüfung auf `/leistungen` 34 Treffer bei d1440, auf `/ueber-uns` 62.
- **Lösung:** eine dritte Pause, `data-kopf-pause="ganz"` (`bewegung.css`, Zeitstrahl `--kopf-pause-ganz` im selben `timeline-scope`).
  - Neben einem Kartenraster oder einer Karte auf Fliese tritt der Kopf auf deren ganzer Höhe zurück. Das gilt von 24 px über der Oberkante bis 24 px unter der Unterkante: `cover calc(60vh − 6 Stufen)` bis `cover calc(100 % − 40vh + 6 Stufen)`. Es ist dieselbe Regel wie neben Fliese-Flächen.
  - Gesetzt am Raster `#gewerke` (`leistungen/Leistungsplaene.tsx`) und an der `figure` der Einsatzkarte (`momente/karte/Einsatzkarte.tsx`).
  - Die Pause wirkt nur im Leitfaden der Vorlage; auf `/kontakt` und den Stadtseiten ändert sich nichts.
  - Höchstens eine Pause je Abschnitt, wie bei „1“ und „2“.
  - Weiter nur CSS. Spiegel für „ruhig“: Die Marke hat dort keine Animation. Druck und erzwungene Farben: keine Marke.
- **Gegenproben:** jetzt alle acht Seiten, auch `/leistungen` und `/ueber-uns` (Tabelle oben). Gemessen werden H2, H3 und Formular; H4 gibt es auf keiner der acht Seiten.
- **Bilder:** `sicht-AN/stellen/d1440-leistungen-2496.png` (die Stelle des Prüferbilds, kein Kopf neben „Bad“ und „Böden und Wände“), `sicht-AN/stellen/d1440-ueber-uns-5216.png` (kein Kopf neben „Bis 10 km ab Aßlar“).
- **Hinweis für Teil B (N9):** Entstehen auf `/` Karten mit H3, braucht das Raster dort ebenfalls `data-kopf-pause="ganz"`. Im Abschnitt „was-wir-tun“ ist die Pause noch frei.

### N5 (gering) · Quadratmeter im flachen Querformat: behoben
- **Befund bestätigt.** Im Querformat bis 32rem Höhe ist der H1-Block nur eine Zeile hoch, deshalb ragte die Zeichnung unter den Kopf der Seite.
- **Lösung:** `flach:hidden`, wie bei Bewertung und erstem Schritt. Im gebauten CSS steht `flach:hidden` nach `lg:block` und gewinnt.
- **Messung** (`skript/qm.mjs`, `sicht-AN/qm/qm.json`): Bei 1024×480, 1280×500 und 1440×512 ist die Zeichnung ausgeblendet.
- **Bild:** `sicht-AN/qm/qm-1024x480.png`.

### N5 (gering) · Quadratmeter zwischen 960 und 1023 px: behoben
- **Befund bestätigt.** Zwischen md und lg lag die rechte Kante bei right-8, die Schnur endet dort aber bei right-4. Die Zahl stand 4 bis 11 px unter dem Kopf der Seite, weil die H1 dort nur fs-6 hat.
- **Lösung:** Die Zeichnung erscheint erst ab lg (`hidden flach:hidden lg:block` statt `@4xl:block`). Ab lg ist die Spalte immer mindestens 58rem breit, und die Bedingung „in rem“ bleibt erhalten.
  - Ab lg endet die Schnur bei right-8, die Zeichnung auch.
  - Die H1 steht dort in fs-7.
- **Messung:**
  - 960×700, 1000×720 und 1023×720: ausgeblendet.
  - Rechte Kante gleich dem Ende der Schnur: 1024×768 bei 992 = 992, 1280×800 bei 1248, 1440×900 bei 1344, 1920×1080 bei 1662, 2560×1440 bei 2060.
  - Oberkante der Zahl „100 cm“: t1024 y 126, d1440 y 177, d1920 y 200. Der Kopf der Seite endet bei 65 bis 81 px, es bleiben also mindestens 61 px Abstand.
- **Bilder:** `sicht-AN/qm/qm-1024x768.png`, `qm-1000x720.png`, `qm-1440x900.png`.

### N6 (gering) · Mobil 920 statt 860 ms: Zahl korrigiert, Code unverändert
- **Befund bestätigt** (eigene Messung oben): Die Flucht der zweiten H1-Zeile (`flucht-einruecken`, 12 px translate, 120 bis 920 ms) läuft mit.
- **Umsetzung:** Die Zahlen in `bewegung.css` (Kommentar „eingang“), in `EinstiegMitte.tsx` und oben in N6 sind korrigiert.
  - Schnur 0 bis 320 ms, Zeilenmasken 140 bis 860 ms.
  - Die Flucht läuft als Zeitstrahl bis 920 ms. Ab 860 ms fehlen ihr weniger als 0,01 px (ease-setzen bei 92,5 % der Zeit), sichtbar endet der Eingang also bei 0,86 s.
- **Warum ich die Flucht nicht um 20 ms kürze:** Die Flucht im Eingang muss Name, Dauer, Kurve, Füllung und Verzögerung mit `sig-flucht` teilen (test/intro.test.mjs „Eingang 9“). Sonst springt sie, wenn der Eingang endet (Eingabe oder 2 s).
  - Möglich wäre nur eine kürzere Staffel für alle `sig-flucht` unter sm, auf allen Seiten mit Einstieg mittig und Planblatt.
  - Das wäre eine Änderung an SIG-1 für 20 ms eines unsichtbaren Rests. Ich habe sie nicht gemacht (offene Frage N-2).

### Offene Fragen der Nacharbeit
- **N-1:** Die Regel `titel-spalte` setzt eine Schriftgröße in CSS (`min(1em, 16.5cqi)`), nicht über eine Utility. `werte.mjs` meldet nichts, weil Klassen mit eigenem Selektor als definiert gelten.
  - Die Stufen fs-1 bis fs-7 bleiben die einzigen Größen; `cqi` begrenzt nur bei großer Systemschrift.
  - Falls der Orchestrator solche Grenzen in KERN K-006 festhalten will: Der Eintrag wäre „Die H1 der Startseite ist auf 16,5 % der Spalte begrenzt“.
- **N-2:** Soll „mobil gesamt ≤ 0,9 s“ als Zeitstrahl gelten (dann 0,92 s) oder sichtbar (0,86 s)?
  - Für den Zeitstrahl müsste die Staffel von `sig-flucht` unter sm auf eine Stufe sinken: Die zweite Zeile würde 60 statt 120 ms nach der ersten beginnen und bei 860 ms enden.
  - Das wirkt seitenweit und ist eine Frage an SIG-1.
- **N-3:** `data-kopf-pause="ganz"` blendet den Kopf neben ganzen Karten aus, nicht nur neben deren H3.
  - Auf `/leistungen` steht er damit neben dem Kartenraster nicht, und das rote Lot endet dort ohne Kreuz auf der Leselinie.
  - Auf `/ueber-uns` gilt das neben der ganzen Einsatzkarte.
  - Eine feinere Lösung je H3 bräuchte je Überschrift einen eigenen Zeitstrahl, was mit reinem CSS und einem Kopf je Abschnitt nicht geht.
