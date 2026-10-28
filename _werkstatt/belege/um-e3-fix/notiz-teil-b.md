# UM-E3-FIX · Teil B (F4 bis F10) · Notiz des Baumeisters

Arbeitskopie `…/scratchpad/fix/baum` (fortlaufend nach Teil A). Stand vorher: `…/fix/vor-B`. Diese Ablage stammt aus einem früheren, abgebrochenen Anlauf von Teil B (19:58). Sie ist nicht neu angelegt, sonst hätte sie halbfertige Änderungen aufgenommen. Geprüft: `vor-B` ist genau der Endstand von Teil A (`vor-A` + `UM-E3-FIX-A.diff` = `vor-B`, alle 19 Dateien gleich). Was der abgebrochene Anlauf schon in `baum` geschrieben hatte (F4, F5, F8, F10), ist übernommen, im Bau geprüft und wo nötig nachgebessert.

Diff: `…/fix/UM-E3-FIX-B.diff` (12 Dateien, nach der Nacharbeit neu erzeugt aus `vor-B`). Die Nacharbeit nach der Prüfung von Teil B steht im Abschnitt „Nacharbeit nach der Prüfung“ am Ende; wo sie einen Befund ändert, ist der Text darüber angepasst.

Sichtabgleich: Bau in der Arbeitskopie mit echter Kopie von `node_modules`, `next start -p 4391 -H 127.0.0.1`. Playwright nur über `installSperre` und `setzeEinwilligung` (abgelehnt) aus `_werkstatt/werkzeuge/lib.mjs`, nur gegen 127.0.0.1:4391, DPR 1. Skripte: `…/fix/sicht-skript/bau-B.sh`, `sicht-B.mjs`, `fuss-offen.mjs`, dazu `sicht.mjs` und `lcp.mjs` aus Teil A. Bilder liegen unter `…/fix/sicht-B/`. Die letzten Stände sind `b2` (Fuß, Orte, Galerie, Leistungen) und `b3` (Stimmen nach der letzten Nacharbeit).

Abschluss: Server über seine Prozessgruppe beendet (PID-Datei, kein `pkill -f`). `node_modules` ist wieder ein Verweis, die echte Kopie, `.next` und `next-env.d.ts` sind gelöscht.

## Dateien
- `src/app/globals.css`: F8, Token `--grundschrift`, `html { font-size }`; F6, Varianten `fuss-zu` und `fuss-offen`
- `src/components/common/Footer.jsx`: F6, F7
- `src/components/common/FussGruppe.tsx`: F6, zuklappen auch flach (Handy quer)
- `src/components/vorlagen/teile/Einsatzorte.tsx`: F9
- `src/components/vorlagen/teile/Stimmen.tsx`: F4 (Form „einzeln“) und F10
- `src/components/vorlagen/teile/Beleg.tsx`: F4 (Drittelverband der Fotos, Form der Stimmen)
- `src/components/vorlagen/inhalt.ts`: F4, Felder `fotosVersatz` und `stimmenEinzeln`
- `src/inhalte/start.ts`: F4, beide Felder auf `/` gesetzt
- `src/components/vorlagen/teile/Tun.tsx`: F5
- `src/components/vorlagen/teile/EinstiegMitte.tsx`: F8, `sizes` ab 1440 px mit der wachsenden Grundschrift
- `src/config/reviews.js`: F10, `RATING_SUMMARY.google.url`; Wortlaut der Stimmen unberührt
- `src/components/reviews/GoogleReviewsBadge.tsx`: F10, nimmt dieselbe Adresse aus `reviews.js` statt einer eigenen Zeichenkette

## Befunde

### F4 · Keine drei gleichförmigen Kartenraster in Folge: umgesetzt
- **Galerie, Drittelverband:**
  - Neu ist `fotosVersatz` in `inhalt.ts`, gesetzt nur auf `/`.
  - Ab md steht jedes zweite Foto 16 Stufen (64 px, ein Drittel der langen Fliesenseite) tiefer. Ab lg ist es jedes dritte ab dem zweiten.
  - Je zwei bzw. drei Nachbarn enthalten genau einen Versatz. Wie weit man auch blättert, jeder Bildschirm der Reihe trägt einen.
  - Umgesetzt als Innenabstand einer Hülle, nicht als Verschiebung: Die Spur beschneidet nichts, und die Knöpfe rücken mit.
  - Mobil steht eine Karte im Bild, dort gibt es keinen Versatz.
- **Stimmen, eine große Stimme je Schritt:**
  - Neu ist `stimmenEinzeln` bzw. die Form `einzeln` in `Stimmen`.
  - Das langsame Karussell zeigt auf jeder Breite eine Stimme.
  - Ab 36rem Breite der Stimme (Container in rem; bei normaler Schrift ab t768 wie zuvor md) stehen Sterne und Name im ersten Drittel an der Fuge, der Wortlaut in `fs-5` in den zwei Dritteln dahinter. Schmaler, auch bei 200 % auf t768 bis t1024, gestapelt wie mobil. Die Laser-Unterstreichung der Kernstelle bleibt.
  - Selbstlauf, Anhalten und Knöpfe sind unverändert (`Karussell`).
  - Andere Seiten behalten `gross` bzw. `klein`.
- **Folge auf `/` ab md:** vier Leistungskarten, dann Fotoreihe mit Versatz, dann eine große Stimme. Es folgen keine drei gleich gebauten Raster mehr aufeinander.
- **Bilder:**
  - `sicht-B/b2/d1440-start-unsere-arbeiten-0.png`
  - `sicht-B/b2/t1024-start-unsere-arbeiten-0.png`
  - `sicht-B/b2/d1920-start-unsere-arbeiten-0.png`
  - `sicht-B/b3/d1440-start-kundenstimmen-0.png`
  - `sicht-B/b3/d1920-start-kundenstimmen-0.png`
  - `sicht-B/b3/m390-start-kundenstimmen-0.png`
- **Maße:** Fotos t1024 bei y 4321 / 4385 / 4321, d1440 bei 4038 / 4102 / 4038 (`sicht-B/b2/*-masse.json`).

### F5 · Leistungsblock mobil verdichtet: umgesetzt
- `Bereichsfliesen` mit Plan-Vignette: Unter 36rem Container (Handy) gibt es eine Zeile je Bereich.
  - Die Zeichnung steht als Feld von 32 Stufen (128 px, 4 : 3) links an der Fuge, Name und Pfeil rechts daneben. Die Fuge hängt an einer über die ganze Kartenhöhe gestreckten Zelle, das Feld steht darin mittig: Auch bei zwei- und dreizeiligen Namen stößt sie an Ober- und Unterkante.
  - Ab 36rem bleibt alles wie zuvor (zwei Spalten, Zeichnung oben), ebenso am Desktop.
- Kein Inhalt fällt weg: alle vier Bereiche mit Zeichnung, Name und Ziel.
- Auf m390 sind die vier Karten zusammen rund 500 statt rund 1 200 px hoch. Der ganze Abschnitt samt Kopf und Satz misst 844 px.
- Seite m390 gesamt 10 612 px, im Anlauf 11 540 (zusammen mit Teil A).
- **Bilder:** `sicht-B/b2/m390-start-was-wir-tun-0.png`, `-1.png`; Desktop unverändert `sicht-B/b1/d1440-start-was-wir-tun-bild.png`.

### F6 · Fuß gegliedert: umgesetzt
- **Schriftfeld ab lg:**
  - Links (3 von 12 Spalten) über die ganze Höhe Logo und Inhaber, der Leitsatz unten bündig.
  - Rechts (9 Spalten) die Kontaktfelder. Darunter in einer Zeile Kammer, „Betrieb seit“ und USt-IdNr.
  - Das leere Feld links (rund 600 px) ist weg, beide Seiten enden auf einer Linie.
  - Mobil und bis lg bleibt die Lesefolge Betrieb, Anschrift und Nummern, Kammer.
- **Seitenindex:**
  - Er steht jetzt unter dem Schriftfeld über die ganze Breite, ab 56rem Breite des Index (Container in rem, bei normaler Schrift ab rund 960 px, also t1024) in vier festen Spalten nach Themen:
    - Bad und Balkon und Terrasse
    - Böden und Wände
    - Wissen
    - Hilfen für Ihre Anfrage und Über uns
  - Darunter steht das Ortsregister „Wo wir arbeiten“ fließend (kurze Namen nebeneinander, mit Umbruch).
  - Darunter, offen (breit und nicht flach), zwei Spalten im Spaltensatz: Die Gruppen fließen untereinander weiter (Bad, Balkon und Terrasse, Böden und Wände | Wissen, Hilfen, Über uns), kein Loch unter einer kurzen Gruppe (E-065). Links ab lg eine Stufe dichter (Abstand 1 statt 2 Stufen, Link rund 33 px hoch). Abstand der Gruppen als Innenabstand, damit er am Ende des Spaltensatzes nicht entfällt.
  - Die Spalten sind auf d1440 etwa gleich lang (Unterkanten 1 150 / 1 300 / 1 225 / 1 332 px im Fußbild).
- **Mobil:**
  - Die Gruppen klappen mit `FussGruppe` zu (Schalter ≥ 44 px, `aria-expanded`, ohne JavaScript alles offen), jetzt schmal **oder flach** (quer und höchstens 32rem hoch, dieselbe Grenze wie Kopf und untere Leiste): auch auf q844.
  - Neu stehen die sieben Schalter als dichte Liste ohne 32-px-Lücken. Eine geöffnete Gruppe hält 16 px Abstand zur nächsten.
  - Natives `details` ist nicht eingesetzt (siehe offene Fragen).
- **Ziele und Wortlaut:** alle unverändert aus `footerGruppen`, 79 Links gezählt auf allen Geräten.
  - Eine Gruppe, die in `INDEX_SPALTEN` nicht zugeordnet ist, landet in der letzten Spalte; so fällt nie ein Link weg.
  - `#seitenindex` bleibt das Sprungziel (Kopf ohne Popover, Regel `scripting: none` in `globals.css`).
  - `navigation.js` ist unverändert.
- **Fußhöhe:**

  | Gerät | Höhe |
  |---|---|
  | d1440 | 1 702 px |
  | t1024 | 1 809 px |
  | d1920 | 1 913 px |
  | m390 (zugeklappt) | 1 921 px |
  | q844 (zugeklappt, nach der Nacharbeit) | 1 399 px (vorher 2 842) |
  | t768 (offen, zwei Spalten im Spaltensatz, nach der Nacharbeit) | 2 761 px (vorher 2 842) |

- **Bilder:**
  - `sicht-B/b2/d1440-start-fuss-ganz.png`
  - `sicht-B/b2/t1024-start-fuss-ganz.png`
  - `sicht-B/b2/d1920-start-fuss-0.png`, `-1.png`
  - `sicht-B/b2/m390-start-fuss-ganz.png`
  - `sicht-B/b2/m390-fuss-offen-0.png`, `-1.png` (zwei Gruppen geöffnet)
  - `sicht-B/t768/t768-start-fuss-1.png`

### F7 · Telefonnummern brechen nicht um: umgesetzt
- Die Kontaktfelder richten sich nach der Breite ihres Felds (Container in rem): einspaltig, ab 28rem zwei, ab 42rem drei Spalten.
- Jede Spalte ist dann mindestens 14rem breit. Eine Nummer in `fs-2` braucht samt Innenabstand rund 12,2rem.
- Telefon, Mobil und Fax tragen im Fuß `whitespace-nowrap`.
- Unter 18rem Feldbreite (nur bei großer Systemschrift) setzt `Rufnummer` die Vorwahl wie bisher darüber.
- t1024 hat jetzt drei Spalten mit je rund 229 px statt zwei schmaler Kacheln. Alle drei Nummern sind auf m390, t768, t1024, d1440 und d1920 einzeilig (Messung `nummern.zeilen` = 1/1/1).
- **Bild:** `sicht-B/b2/t1024-start-fuss-ganz.png`.

### F8 · Große Bildschirme: umgesetzt
- Token `--grundschrift` in `globals.css`: `clamp(100%, calc(100% + (100vw - 90rem) / 240), 125%)` als Schriftgröße von `<html>`.
  - Bis 1 440 px gilt die Einstellung des Browsers. Bei 1 920 px sind es 112,5 % (18 px), ab 2 400 px höchstens 125 %.
  - Alle rem-Tokens wachsen damit im selben Maß: Schriftstufen, Satzspiegel `max-w-seite`, Abstände, Kopf und Logo.
  - Inhalt d1920 1 368 statt 1 216 px, d2560 rund 1 520 px. H1 d1920 103,5 px, d2560 115 px.
  - Medienabfragen messen in der Ausgangsgröße: Kein Umbruchpunkt verschiebt sich. Zoom und große Systemschrift wirken weiter (Untergrenze 100 %).
- **`EINSTIEG_MITTE_SIZES` ab 1 440 px:** dieselbe Rechnung mit der wachsenden Grundschrift.
  - Geladen werden d1920 w=828 für 776 px und d2560 w=1080 für 1 011 px.
  - Das Foto bleibt auf allen fünf geprüften Geräten das LCP-Element (`sicht-B/lcp/`, Erstbesuch und Wiederkehr). Es steht ganz in einem Bildschirm.
- **Bilder:**
  - `sicht-B/oben/d1920-oben-start-00.png`
  - `sicht-B/oben/d2560-oben-start-00.png`
  - `sicht-B/oben/d1920-oben-_bad-01.png` (Gegenprobe einer Unterseite)
  - `sicht-B/b2/d1920-start-fuss-0.png`

### F9 · Einsatzorte in Entfernungsfolge: umgesetzt
- Mobil bleibt alles untereinander von nah nach weit.
- Von md bis unter xl:
  - Oben stehen „Bis 10 km“ und „Bis 25 km“ nebeneinander. Darunter steht über die ganze Breite „Mehr als 25 km“ mit dem Verweis auf alle Orte.
  - Die Orte der weiten Gruppe stehen in zwei Spalten genau unter den Spalten darüber (Abstand 12 Stufen = zweimal der Innenabstand), gefüllt Spalte für Spalte (Raster `grid-flow-col` mit so vielen Zeilen wie die erste Spalte Orte hat): links 30, 35, 35 km, rechts 40, 40, 45 km. Lese- und Tabfolge gelten so auch von oben nach unten wie in der Zeile darüber.
  - Ihre Kette ist so lang wie die beiden darüber.
  - Der rote Abschnitt wandert so links, Mitte, rechts, statt hin und her zu springen. Beide Spalten enden ohne Fuge.
- Ab xl bleibt das gelobte Lineal mit drei Spalten unverändert.
- Lesefolge im Quelltext und Tabfolge: 10, 25, mehr als 25.
- Gemessene Köpfe auf t1024: 10 km (x 73, y 6190), 25 km (x 537, y 6190), mehr als 25 km (x 73, y 6482).
- **Bilder:**
  - `sicht-B/b2/t1024-start-einsatzgebiet-0.png`, `-1.png`
  - `sicht-B/t768/t768-start-einsatzgebiet-0.png`
  - `sicht-B/b2/d1440-start-einsatzgebiet-0.png` (xl unverändert)
  - `sicht-B/b3/m390-start-einsatzgebiet-1.png`

### F10 · Weg zum ganzen Text: umgesetzt (nach der Prüfung geändert)
- Einmal unter den Stimmen, an der Kennzeile, steht der Link „Alle Bewertungen bei Google lesen“ mit Zeichen für „extern“, sobald eine gezeigte Google-Stimme gekürzt ist (Wortlaut endet mit „…“, 12 von 16). Er gilt in allen Formen (einzeln, groß, klein, einzelne Stimme).
  - Er führt zu den Google-Bewertungen des Betriebs; dort steht der ganze Wortlaut. Der Name sagt jetzt, was das Ziel ist (Google hat keine feste Adresse je Rezension). Die Adresse steht als `RATING_SUMMARY.google.url` an einer Stelle; die Bewertungsplakette nutzt sie auch.
  - Er öffnet in neuem Tab, Name für Vorleser „Alle Bewertungen bei Google lesen, öffnet in neuem Tab“ (beginnt mit dem sichtbaren Text, WCAG 2.5.3). Trefffläche 47 bis 49 px.
  - Vorher stand „Ganze Bewertung bei Google“ in jeder Karte: Der Name versprach die einzelne Rezension, alle Links hatten dasselbe Ziel (auf `/bad` vier gleiche nebeneinander), und der Link stand in der `figure` hinter der `figcaption` (gegen das Inhaltsmodell). Jetzt je Seite ein Link, außerhalb jeder `figure`; Kinderfolge der Figuren `span,blockquote,figcaption` bzw. `figcaption,div`.
- Der Wortlaut der Stimmen ist unverändert (G8).
- **Bilder:**
  - `sicht-B/b3/d1440-start-kundenstimmen-0.png`
  - `sicht-B/b3/m390-start-kundenstimmen-0.png`
  - nach der Nacharbeit: `sicht-B/nach2/d1440-start-kundenstimmen-0.png`, `sicht-B/nach2/d1440-_bad-kundenstimmen-0.png`, `sicht-B/nach2/d1440-_ueber-uns-kundenstimmen-0.png`, `sicht-B/nach2/m390-_bad-kundenstimmen-0.png`

## Prüfzahlen (Endstand nach der Nacharbeit, neu erhoben)
- `npm test`: 248/248 (`…/fix/test-B2.log`).
- `npx tsc --noEmit -p .` mit vorübergehender `next-env.d.ts`: 0 Fehler (danach gelöscht).
- `npx eslint` über die 11 Code-Dateien: 0. `globals.css` prüft eslint nicht.
- `werte.mjs --arbeitsbaum --dateien` (Werkzeuge der Arbeitskopie, gegen deren `globals.css`) über alle 12 Dateien: 0 Befunde (`…/fix/werte-B2/`; ein erster Entwurf mit `md:grid-rows-(--zeilen)` war ein Beliebigwert und ist durch ausgeschriebene Token-Klassen ersetzt).
- `next build`: ok (`…/fix/build-B.log`).
- `ueberlappung.mjs` (Einwilligung abgelehnt): `/` auf m360, m390, q844, t768, t1024, d1440, d1920 je 0 Befunde; `/bad` und `/ueber-uns` auf m390 und d1440 je 0.
- Messlauf `…/fix/sicht-skript/nach-B2.mjs` → `…/fix/sicht-B/nach2/mess.json` und Bilder daneben:
  - Fuß: 79 Links auf jedem Gerät. m360 1 973, m390 1 921, q844 1 399 (zugeklappt, 7 Schalter), t768 2 761 (zwei Spalten, Lücken in den Spalten je 32 px), t1024 1 809, d1280 1 702, d1440 1 702, d1920 1 913, d2560 2 126 px (vier Spalten).
  - Index bei großer Schrift: zerrissene Wörter t768, t1024, d1440, d1920 bei 200 % je 0, t1024 und d1440 bei 150 % je 0; t1024 bei 200 % zwei Spalten zu 384 px statt vier zu 160 px.
  - Einzelstimme: letzter Stern in seiner Zelle auf t768, q844, t1024, d1440, d1920 bei 200 %, t1024 und d1440 bei 150 % und auf t768, q844, t1024, d1440, m390 bei 100 %.
  - Leistungskarten m360, m390, m430 und t1024 bei 200 %: Zelle mit Fuge so hoch wie die Karte (Abstand 1 px = Rahmen), z. B. m360 124/122, 154/152 px.
  - Einsatzorte weite Gruppe t768 und t1024: Haiger, Butzbach, Limburg in der linken, Bad Nauheim, Marburg, Friedberg in der rechten Spalte; ohne Fuge Limburg und Friedberg. Ab xl (d1280, d1440) und mobil eine Spalte wie zuvor.
  - Stimmen: je Seite ein Google-Link, außerhalb jeder `figure` (`/`, `/bad`, `/ueber-uns` d1440 und m390, `/fliesen` t1024).
- LCP-Element `/` (m390, t1024, d1440, d1920, d2560): überall das Foto (`sicht-B/lcp/`, Lauf vor der Nacharbeit; Einstieg und `sizes` sind in der Nacharbeit unverändert).
- Bewegung: In Teil B ist keine Bewegung neu oder geändert. Der Versatz ist ein Ruhezustand, das Karussell ist unverändert. Damit gibt es weder neue Startzustände noch neue Spiegel, und es entsteht kein CLS durch Bewegung.
- Abschluss: Server über seine Prozessgruppe beendet (PID-Datei), `node_modules` wieder ein Verweis, `.next`, `next-env.d.ts` und die echte Kopie gelöscht.

## Offene Fragen
1. **Natives `details` im Fuß (F6):** nicht eingesetzt. `FussGruppe` klappt am Handy schon zu: Schalter mit `aria-expanded`, ohne JavaScript alles offen, breit immer offen. Mit `details` müssten die Gruppen breit per CSS dauerhaft offen stehen. Das geht verlässlich erst mit `::details-content`, das ältere Safari-Fassungen nicht kennen. Soll trotzdem umgestellt werden?
2. **Fuß auf t768 (beantwortet durch die Nacharbeit):** Zugeklappt wird jetzt schmal oder flach (q844 1 399 statt 2 842 px). t768 hochkant bleibt offen, aber im Spaltensatz ohne Loch (2 761 px). Wer t768 ebenfalls zugeklappt will, setzt die Schwelle in `globals.css` (`fuss-zu`, `fuss-offen`) und in `FussGruppe.tsx` (`MOBIL`) auf 48rem.
3. **Grundschrift (F8) wirkt auf allen Seiten ab 1 440 px**, nicht nur auf `/`, auch auf Einwilligung, Rechtstexte und Formulare (Banner d1920 504 statt 448 px, d2560 560 px; Wortlaut, Schloss und Funktion unverändert). Browser-Zoom wirkt dort gedämpft (d2560 200 % Zoom: Fließtext × 1,59). Bitte in Stufe A mit Bildern d1920 und d2560 von Einwilligung, `/kontakt` und einer Rechtsseite abnehmen und den Nachweis zu WCAG 1.4.4 (200 % Text bei rund 300 % Zoom) ablegen; siehe „Nicht behoben“.
4. **Ziel des Bewertungslinks (F10):** Die Google-Suche nach den Bewertungen des Betriebs (dieselbe Adresse wie die Plakette). Ein Link auf das Profil (Place-ID) wäre genauer, die Kennung liegt im Bestand nicht vor; dann nur `RATING_SUMMARY.google.url` ändern.
5. **Reichweite F9:** `Einsatzorte` ist ein Vorlagenteil. Das neue Raster von md bis xl gilt überall, wo es eingesetzt ist (derzeit nur `/`, über `orte` in `start.ts`).
6. **Kreuz der Leitachse am Desktop** (Teil A, Frage 5) bleibt, wie es ist. In Teil B gab es dazu nichts zu ändern.
7. **Folge der Fußgruppen gegen die Navigation:** siehe „Nicht behoben“. Soll das Menü dieselbe Folge bekommen (Bad, Balkon und Terrasse, Böden und Wände)? Das wäre eine Änderung an `navigation.js` (Kopf und Fuß).

## Nacharbeit nach der Prüfung (Befunde von Gestaltung und Leitplanken)
Jeder Befund selbst nachgeprüft (Code und Messlauf `nach-B2.mjs`, nur 127.0.0.1:4391, `installSperre` und `setzeEinwilligung`).

### Behoben
- **Fuß, Loch zwischen sm und lg (mittel), `Footer.jsx`:** bestätigt (zweite Rasterzeile erst unter „Böden und Wände“). Unter 56rem Breite des Index fließen die Gruppen im Spaltensatz (`fuss-offen:columns-2`, `break-inside-avoid`, Hüllen der vier Spalten mit `contents` aufgelöst), ab 56rem das Raster in vier Spalten. t768: Lücken in den Spalten je 32 px statt 207 px. Bilder `sicht-B/nach2/t768-index-0.png`, `-1.png`.
- **Fuß auf q844 offen (mittel), `FussGruppe.tsx`, `globals.css`:** bestätigt (Schwelle nur nach Breite). Zuklappen jetzt schmal oder flach, mit der Grenze von `flach` (quer, höchstens 32rem hoch; Kopf und Leiste nutzen sie schon). Gleiche Bedingung in CSS (Varianten `fuss-zu`, `fuss-offen`, genaue Gegenstücke) und in `matchMedia`. q844 1 399 statt 2 842 px. Bilder `sicht-B/nach2/q844-index-0.png`, `q844-fuss-offen-0.png`.
- **Fuß bei 200 % auf t1024 (gering):** bestätigt. Vier Spalten erst ab 56rem Containerbreite (`#seitenindex` als `@container`): bei 200 % auf t1024 zwei Spalten zu 384 px, zerrissene Wörter 0 statt 9. Bild `sicht-B/nach2/t1024-s200-index-0.png` bis `-3.png`.
- **Fuge der Leistungskarten (gering), `Tun.tsx`:** bestätigt. Äußere Zelle mit `border-r` über die ganze Kartenhöhe, darin das Feld 4 : 3 mittig. Bild `sicht-B/nach2/m360-tun-karten-0.png`.
- **Sterne der Einzelstimme bei 200 % (gering), `Stimmen.tsx`:** bestätigt. Die Stimme ist ein Container, gedrittelt ab 36rem (rem, wächst mit der Schrift), Innenabstand `p-12` ab 56rem; schmaler gestapelt. Alle gemessenen Fälle in der Zelle. Bild `sicht-B/nach2/t1024-s200-kundenstimmen-0.png`.
- **F10 Linkname und Ziel (gering), `Stimmen.tsx`:** bestätigt. Ein ehrlich benannter Link „Alle Bewertungen bei Google lesen“ einmal unter den Stimmen statt eines gleichlautenden in jeder Karte.
- **figcaption nicht am Rand der figure (gering), `Stimmen.tsx`:** bestätigt, mit dem vorigen Punkt behoben (kein Link mehr in der `figure`).
- **Zickzack in der weiten Ortsgruppe (gering), `Einsatzorte.tsx`:** bestätigt. Raster spaltenweise gefüllt (`grid-flow-col`, Zeilenzahl aus der Zahl der Orte über ausgeschriebene Klassen `md:grid-rows-1` bis `-12`, der Bau bricht ab, wenn sie nicht reichen); Fugenregel auf das Spaltenende umgestellt. Statt Spaltensatz, damit die Zeilen beider Spalten fluchten. Bild `sicht-B/nach2/t1024-einsatzgebiet-1.png`, `t768-einsatzgebiet-0.png`.

### Nicht behoben (Begründung)
- **Folge der Fußgruppen gegen die Navigation (gering, `Footer.jsx:22`):** bestätigt, aber nicht klein. Mit den Gruppenlängen (7, 18, 5, 16, 10, 7 Links) lässt sich die Folge der Navigation in vier Spalten nur als Bad | Böden | Balkon + Wissen | Hilfen + Über uns halten, dann stünde „Bad“ allein und unter ihm wieder ein leeres Feld von rund 600 px (das, was F6 beseitigt hat). Rasterplatzierung mit der Navigationsfolge im Quelltext ließe am Desktop die Tabfolge zwischen den Spalten springen. Die Spaltenfolge ist jetzt im Code bewusst festgelegt und begründet; das Menü umzuordnen ist eine Änderung an `navigation.js` außerhalb dieses Pakets (offene Frage 7).
- **Grundschrift dämpft den Zoom (gering, `globals.css` 114, 241–242):** bestätigt (bei 200 % Zoom auf 2 560 px fällt die Grundschrift auf 100 %, Fließtext × 1,59). WCAG 1.4.4 bleibt erfüllt. Der vorgeschlagene Umbau (nur Satzspiegel und `fs-5` bis `fs-7` wachsen) ändert alle rem-Tokens, Kopf, Fliesenskala und die `sizes` des LCP-Fotos und ist nicht klein; die Obergrenze 112,5 % nähme d2560 einen guten Teil von F8 (Inhalt rund 1 476 statt 1 640 px). Bitte als Entscheidung des Orchestrators mit Nachweis in Stufe A (offene Frage 3).
- **Grundschrift auf Unantastbarem (gering, `globals.css` 242):** bestätigt, kein Verstoß: Einwilligung, Rechtstexte und Formulare sind im Code unverändert, sie wachsen nur mit der Grundschrift, wie F8 es über Tokens verlangt. Abnahme mit Bildern in Stufe A (offene Frage 3); die Alternative ist derselbe Umbau wie oben.
