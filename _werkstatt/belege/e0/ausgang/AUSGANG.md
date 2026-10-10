# AUSGANG · E0-PRUEF-03 · Ausgangswerte am Basisstand 745335f

## Messstand und Umfeld

- **Build:** 745335f auf 127.0.0.1:4310. BUILD_ID `JoEHwEq5rN79b8sFH8xca` (Datei `.next/BUILD_ID` des Reinraums `reinraum-745335f`), Prozess PID 685. Zu Beginn HTTP 200 auf `/` und auf allen 12 Hauptansichten sowie BUILD_ID geprüft; BUILD_ID erneut vor Schritt 5 (Bewegung) und am Ende des Laufs.
- **Arbeitsbranch:** HEAD bei Start `98c70bc`; 745335f ist Vorfahr. Während des Laufs haben andere Pakete weitere Commits gesetzt (`3012cb7`, `99c6f2d`) und den Arbeitsbaum verändert. Der Messstand ist davon nicht betroffen, weil 4310 den Build von 745335f ausliefert.
- **Last:** Die Läufe liefen parallel zu Läufen anderer Pakete auf 4 CPUs. Der 1-Minuten-Loadavg lag zwischen 1,2 und 7,4. Die Bildraten (Z-05) wurden bei Last bis 6,9 gemessen; die Werte sind entsprechend zu lesen.
- **Lighthouse:** in diesem Paket nicht ausgeführt (Auftragsänderung durch den Orchestrator). Die Lighthouse-Felder folgen aus E0-PRUEF-03L.

## Übersicht der Läufe

| Kriterium | Werkzeug und Lauf | Beleg |
|---|---|---|
| Z-02 | `texte.mjs --satz e0 --ansichten d1440,m390` (121 Seiten) | `belege/e0/texte-index.json`, `belege/e0/texte/` |
| Z-05 | `bewegung.mjs` register und reduziert (m390) je Hauptansicht, bildrate auf `/` und `/bad` | `_werkstatt/cache/bewegung/e0/<modus>/<slug>/ergebnis.json` |
| Z-06 | `svg.mjs --seiten` (12 Hauptansichten, m390 und d1440); `svg.mjs --dateien` (Basisdateien aus 745335f) | `belege/e0/ausgang/svg/svg-seiten-zusammenfassung.json`, `belege/e0/ausgang/svg/svg-dateien-745335f.json` |
| Z-07 | `axe.mjs --hauptansichten --ansichten m390,d1440 --zustaende` | `belege/e0/ausgang/axe/axe.json` |
| Z-08 | Lighthouse: folgt aus E0-PRUEF-03L. Schriftbytes per Netzwerkmitschnitt | `belege/e0/ausgang/schriften.json` |
| Z-09 | `bildsatz.mjs --satz e0 --hauptansichten` | `belege/e0/ausgang/bildsatz.json`, Bilder in `_werkstatt/cache/bildsatz/e0/` |

## Z-02 · Texte und Seiten

Textbasis: 121 Seiten. Das sind die 120 Seiten aus `grundmenge()` plus die Hauptansicht `/standorte/wetzlar`, die dort nicht enthalten ist (siehe Offene Fragen). Ansichten d1440 und m390.

| Kennzahl | Wert | Beleg |
|---|---|---|
| Index-Einträge | 242 (121 × 2); HTTP 200 bei 242 von 242 | `belege/e0/texte-index.json` |
| Dateien | 363 (je Seite `slug.json`, `slug@d1440.json`, `slug@m390.json`) | `belege/e0/texte/` |
| Größe Textbasis | 11,58 MB (dezimal) | `belege/e0/texte/` |
| Sitemap-Einträge | 163 | `texte-index.json` (`sitemap_anzahl`) |
| Interne Ziele · kaputte interne Links | 168 · 0 | `texte-index.json` |
| robots.txt (Hash) | b0c8a9156fdef270 | `texte-index.json` (`robots_hash`) |
| Titel fehlt · Beschreibung fehlt (d1440) | 0 · 0 | `belege/e0/texte/*.json` |
| canonical fehlt | 1 (`/login`) | `belege/e0/texte/login.json` |
| genau eine h1 je Seite | 121 von 121 | `belege/e0/texte/*.json` |
| robots meta | index,follow 115 · noindex,follow 5 (`/agb`, `/cookie-richtlinie`, `/datenschutz`, `/impressum`, `/widerruf`) · noindex,nofollow 1 (`/login`) | `texte-index.json` |
| JSON-LD-Blöcke | 246 insgesamt; 1 Block auf 12 Seiten, 2 auf 93, 3 auf 16 | `belege/e0/texte/*.json` (`jsonld`) |
| Hauptinhalt d1440 = m390 | gleich auf 64 von 121 Seiten, verschieden auf 57 | `texte-index.json` (`main_hash`) |

Selbstprüfung: `texte-vergleich.mjs` mit der Basis als Vorher- und Nachher-Stand (Kopie im Scratchpad) ergibt GRÜN mit 0 Abweichungen. Die Basis liegt damit in dem Layout, das `pruefe-a.sh` erwartet.

Hauptansichten:

| Seite | HTTP d1440/m390 | h1 | JSON-LD | robots | canonical | Textzeilen d1440/m390 | Hauptinhalt gleich |
|---|---|---|---|---|---|---|---|
| `/` | 200/200 | 1 | 1 | index, follow | ja | 414/406 | nein |
| `/bad` | 200/200 | 1 | 2 | index, follow | ja | 112/110 | nein |
| `/leistungen` | 200/200 | 1 | 2 | index, follow | ja | 199/192 | nein |
| `/leistungen/bad` | 200/200 | 1 | 2 | index, follow | ja | 180/173 | nein |
| `/standorte` | 200/200 | 1 | 2 | index, follow | ja | 116/115 | nein |
| `/standorte/wetzlar` | 200/200 | 1 | 2 | index, follow | ja | 150/149 | nein |
| `/fliesen` | 200/200 | 1 | 2 | index, follow | ja | 191/190 | nein |
| `/ueber-uns` | 200/200 | 1 | 2 | index, follow | ja | 101/100 | nein |
| `/kontakt` | 200/200 | 1 | 2 | index, follow | ja | 189/184 | nein |
| `/fliesen/konfigurator` | 200/200 | 1 | 2 | index, follow | ja | 138/138 | nein |
| `/blog` | 200/200 | 1 | 2 | index, follow | ja | 136/130 | nein |
| `/blog/rutschfeste-fliesen-r-klassen` | 200/200 | 1 | 3 | index, follow | ja | 127/118 | nein |

Die Desktop-Fassung enthält bei mehreren Seiten zusätzliche Textzeilen, etwa bei `/` sieben nur dort vorhandene Zeilen (u. a. „Sehr gefragt“, „Spezialgebiet“, „Klassiker“). Das ist ein Befund, keine Bewertung.

## Z-05 · Bewegung

Register (`bewegung.mjs --modus register --ansicht m390`) und reduzierte Bewegung (`--modus reduziert --ansicht m390`), je Hauptansicht. Belege: `_werkstatt/cache/bewegung/e0/register/<slug>/ergebnis.json` und `…/reduziert/<slug>/ergebnis.json`.

| Seite | data-motion im DOM | Register-Kennungen nicht im DOM | Animationseinträge ohne Register | reduziert: Befunde | reduziert: unsichtbar | reduziert: geprüft |
|---|---|---|---|---|---|---|
| `/` | 0 | 16 | 41 | 4 | 0 | 0 |
| `/bad` | 0 | 16 | 51 | 3 | 0 | 0 |
| `/leistungen` | 0 | 16 | 95 | 4 | 0 | 0 |
| `/leistungen/bad` | 0 | 16 | 71 | 2 | 0 | 0 |
| `/standorte` | 0 | 16 | 40 | 2 | 0 | 0 |
| `/standorte/wetzlar` | 0 | 16 | 67 | 4 | 0 | 0 |
| `/fliesen` | 0 | 16 | 34 | 3 | 0 | 0 |
| `/ueber-uns` | 0 | 16 | 46 | 5 | 0 | 0 |
| `/kontakt` | 0 | 16 | 39 | 2 | 0 | 0 |
| `/fliesen/konfigurator` | 0 | 16 | 40 | 4 | 0 | 0 |
| `/blog` | 0 | 16 | 37 | 4 | 0 | 0 |
| `/blog/rutschfeste-fliesen-r-klassen` | 0 | 16 | 39 | 5 | 0 | 0 |

Lesart der Spalten: „reduziert: Befunde“ zählt Animationen mit Lage-, Größen- oder Transform-Eigenschaften bei `prefers-reduced-motion`. Unbekannte Kennungen im DOM: 0 auf allen Seiten. Da kein `data-motion` im Basisstand vorhanden ist, ist „geprüft“ 0.

Bildrate (`bewegung.mjs --modus bildrate --ansicht m390 --wiederholungen 3`, 4× CPU, Median; belege `…/bildrate/start/ergebnis.json` und `…/bildrate/bad/ergebnis.json`):

| Seite | Bilder (Median) | verworfen (Median, Anteil) | Long Animation Frames (Median, Summe) | Läufe: verworfen-Anteil |
|---|---|---|---|---|
| `/` | 3422 | 43 (1,25 %) | 17 (1532 ms) | 0,95 % · 1,25 % · 3,24 % |
| `/bad` | 1431 | 17 (1,19 %) | 5 (326 ms) | 1,46 % · 1,19 % · 0,91 % |

Die Bildraten liegen unter dem Schwellenwert von 5 % verworfener Bilder. Sie wurden auf Software-Rendering mit Last gemessen (UMGEBUNGSAUSNAHME, Bildrate auf echter Grafikhardware nicht messbar).

## Z-06 · Grafik (SVG)

Seitenmodus (`svg.mjs --seiten`, 12 Hauptansichten, Ansichten m390 und d1440): 3894 Inline-SVG in 24 Läufen, alle HTTP 200, keine Laufzeitfehler. Doppelte IDs (`id_doppelt`): 0 in allen 24 Läufen.

| Seite | Inline-SVG m390/d1440 | focusable fehlt m390/d1440 | dekorativ ohne Namen und ohne aria-hidden m390/d1440 | HTTP m390/d1440 |
|---|---|---|---|---|
| `/` | 355/355 | 337/337 | 16/16 | 200/200 |
| `/bad` | 127/127 | 126/126 | 0/0 | 200/200 |
| `/leistungen` | 148/148 | 147/147 | 0/0 | 200/200 |
| `/leistungen/bad` | 150/150 | 149/149 | 0/0 | 200/200 |
| `/standorte` | 152/152 | 151/151 | 0/0 | 200/200 |
| `/standorte/wetzlar` | 157/157 | 156/156 | 0/0 | 200/200 |
| `/fliesen` | 185/185 | 184/184 | 0/0 | 200/200 |
| `/ueber-uns` | 133/133 | 132/132 | 0/0 | 200/200 |
| `/kontakt` | 145/145 | 144/144 | 0/0 | 200/200 |
| `/fliesen/konfigurator` | 119/119 | 118/118 | 0/0 | 200/200 |
| `/blog` | 157/157 | 156/156 | 0/0 | 200/200 |
| `/blog/rutschfeste-fliesen-r-klassen` | 119/119 | 118/118 | 0/0 | 200/200 |

„focusable fehlt“ bedeutet: dekorative Inline-SVG ohne `focusable="false"`. Der Rohbericht liegt außerhalb des Repos unter `_werkstatt/cache/svg/e0/2026-10-10T19-24-33-589Z.json` (2,7 MB).

Dateimodus (`svg.mjs --dateien`, die drei SVG-Dateien des Basisstands 745335f, aus dem Commit in den Scratchpad extrahiert, Arbeitsbaum nicht verwendet):

| Datei | roh (Byte) | gzip (Byte) | Befunde |
|---|---|---|---|
| `public/images/logo/tezgel-logo-dark.svg` | 395 903 | 297 820 | nicht optimiert, eingebettetes Pixelbild, Illustrations-Budget (40 000 Byte gzip) überschritten |
| `public/images/logo/tezgel-logo.svg` | 395 903 | 297 822 | wie oben |
| `public/images/logo/tezgel-mark.svg` | 977 | 436 | nicht optimiert |

Fixpunkt 3 von 3, optimiert 0 von 3. Icons gibt es im Basisstand noch nicht; das Icon-Budget (1 500 Byte roh) ist daher nicht geprüft. Logos sind unantastbar; die Befunde werden nur festgehalten.

## Z-07 · Zugänglichkeit (axe)

`axe.mjs` mit den Tags wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa. Läufe: 60 = 12 Hauptansichten × 5 Zustände (m390 normal, m390 Menü offen, m390 Erstbesuch mit Banner, d1440 normal, d1440 Erstbesuch). Fehler: 0.

- Ernste oder kritische Knoten gesamt: **349** (serious 349, critical 0).
- Regeln: `color-contrast` 344 Knoten, `scrollable-region-focusable` 5 Knoten.
- Läufe mit ernsten oder kritischen Befunden: 48 von 60.
- Läufe ohne ernsten Befund: `/leistungen`, `/leistungen/bad`, `/ueber-uns` in den Zuständen normal und Erstbesuch (je 4 Läufe pro Seite, insgesamt 12).

| Seite | m390 normal | m390 Menü offen | m390 Erstbesuch | d1440 normal | d1440 Erstbesuch |
|---|---|---|---|---|---|
| `/` | 1 | 1 | 1 | 1 | 1 |
| `/bad` | 6 | 8 | 6 | 6 | 6 |
| `/leistungen` | 0 | 2 | 0 | 0 | 0 |
| `/leistungen/bad` | 0 | 2 | 0 | 0 | 0 |
| `/standorte` | 7 | 9 | 7 | 13 | 13 |
| `/standorte/wetzlar` | 7 | 9 | 7 | 7 | 7 |
| `/fliesen` | 17 | 19 | 17 | 17 | 17 |
| `/ueber-uns` | 0 | 2 | 0 | 0 | 0 |
| `/kontakt` | 5 | 6 | 5 | 5 | 5 |
| `/fliesen/konfigurator` | 3 | 3 | 3 | 3 | 3 |
| `/blog` | 14 | 16 | 14 | 14 | 14 |
| `/blog/rutschfeste-fliesen-r-klassen` | 4 | 4 | 4 | 4 | 4 |

Die Summen der Spalten ergeben 64, 81, 64, 70 und 70 (zusammen 349). Der Fokusbefund `scrollable-region-focusable` tritt nur auf `/` auf (5 Läufe). Beispielziele der Kontrastbefunde: Links mit `hover:text-orange-700` in den Musterbad-Kacheln. Belege: `belege/e0/ausgang/axe/axe.json`, Auswertung je Lauf in deren Feld `ergebnisse`. Der Probelauf der Hauptaufgaben (`hauptaufgaben.md`) gehört nicht zu diesem Paket.

## Z-08 · Leistung (Ausgangswerte)

### Lighthouse

Folgt aus E0-PRUEF-03L. Nicht gemessen in diesem Paket: LCP, CLS, TBT, Leistung, LCP-Element und LCP-Teilzeiten, CLS-Quellen, JS je Route, Benchmark-Index.

| Seite | mobil (LCP, CLS, TBT, Leistung, JS, Benchmark) | desktop (LCP, CLS, TBT, Leistung, JS, Benchmark) |
|---|---|---|
| `/` | folgt aus E0-PRUEF-03L | folgt aus E0-PRUEF-03L |
| `/bad` | folgt aus E0-PRUEF-03L | folgt aus E0-PRUEF-03L |
| `/leistungen` | folgt aus E0-PRUEF-03L | folgt aus E0-PRUEF-03L |
| `/leistungen/bad` | folgt aus E0-PRUEF-03L | folgt aus E0-PRUEF-03L |
| `/standorte` | folgt aus E0-PRUEF-03L | folgt aus E0-PRUEF-03L |
| `/standorte/wetzlar` | folgt aus E0-PRUEF-03L | folgt aus E0-PRUEF-03L |
| `/fliesen` | folgt aus E0-PRUEF-03L | folgt aus E0-PRUEF-03L |
| `/ueber-uns` | folgt aus E0-PRUEF-03L | folgt aus E0-PRUEF-03L |
| `/kontakt` | folgt aus E0-PRUEF-03L | folgt aus E0-PRUEF-03L |
| `/fliesen/konfigurator` | folgt aus E0-PRUEF-03L | folgt aus E0-PRUEF-03L |
| `/blog` | folgt aus E0-PRUEF-03L | folgt aus E0-PRUEF-03L |
| `/blog/rutschfeste-fliesen-r-klassen` | folgt aus E0-PRUEF-03L | folgt aus E0-PRUEF-03L |

### Schriftbytes (Netzwerkmitschnitt)

Ersatz für das Lighthouse-Feld `font_kb`. Gemessen werden die übertragenen Bytes (komprimiert) je Schriftdatei bei Erstbesuch, Einwilligung abgelehnt, reduzierte Bewegung. Die Werte sind je Seite identisch.

| Seite | Schriftdateien | Bytes übertragen m390 | Bytes übertragen d1440 | Budget 250 KB |
|---|---|---|---|---|
| alle 12 Hauptansichten | 2: `83afe278b6a6bb3c-s.p.2bn3s6zvc0dyp.woff2` (48 432 Byte), `fba5a26ea33df6a3-s.p.18rizl4rsrl42.woff2` (27 272 Byte) | 75 704 | 75 704 | erfüllt |

Keine fremden Anfragen (0). Beleg: `belege/e0/ausgang/schriften.json`, Skript im Scratchpad (`E0-PRUEF-03/schriften-mitschnitt.mjs`).

Bewegungs-JS je Route (Lighthouse-Feld `js_kb`): folgt aus E0-PRUEF-03L.

## Z-09 · Darstellung (Bildsatz, Basisstand)

Lauf: `bildsatz.mjs --satz e0 --hauptansichten`, Protokoll: Einwilligung abgelehnt, reduzierte Bewegung, DPR 1, Zeitzone Berlin, Ansichten m390, t768, d1440, bis 12 Ausschnitte je Seite, JPEG q70. Belege: `belege/e0/ausgang/bildsatz.json`, Bilder `_werkstatt/cache/bildsatz/e0/<ansicht>/<slug>/NN.jpg`.

Gesamt: 367 Aufnahmen · Fehler 0 · nicht 200: 0 · Überlauf: 0 Befunde · Konsolenmeldungen: 0 · Überlappung: 2041 Befunde (fixed 1972, sticky 7, textkreuzung 62).

| Gerät | Seite | HTTP | Konsole | Überlauf | Überlappung gesamt | fixed | sticky | textkreuzung | häufigster Verdecker (Anzahl) |
|---|---|---|---|---|---|---|---|---|---|
| m390 | `/` | 200 | 0 | 0 | 145 | 145 | 0 | 0 | `header.fixed.top-0` (19) |
| m390 | `/bad` | 200 | 0 | 0 | 90 | 90 | 0 | 0 | `header.fixed.top-0` (24) |
| m390 | `/leistungen` | 200 | 0 | 0 | 94 | 94 | 0 | 0 | `header.fixed.top-0` (24) |
| m390 | `/leistungen/bad` | 200 | 0 | 0 | 72 | 72 | 0 | 0 | `header.fixed.top-0` (26) |
| m390 | `/standorte` | 200 | 0 | 0 | 92 | 90 | 0 | 2 | `header.fixed.top-0` (22) |
| m390 | `/standorte/wetzlar` | 200 | 0 | 0 | 78 | 78 | 0 | 0 | `header.fixed.top-0` (22) |
| m390 | `/fliesen` | 200 | 0 | 0 | 104 | 104 | 0 | 0 | `aside.fixed.bottom-3` (25) |
| m390 | `/ueber-uns` | 200 | 0 | 0 | 81 | 81 | 0 | 0 | `aside.fixed.bottom-3` (24) |
| m390 | `/kontakt` | 200 | 0 | 0 | 73 | 73 | 0 | 0 | `aside.fixed.bottom-3` (26) |
| m390 | `/fliesen/konfigurator` | 200 | 0 | 0 | 93 | 45 | 0 | 48 | Textkreuzung `details.group` (22) |
| m390 | `/blog` | 200 | 0 | 0 | 79 | 79 | 0 | 0 | `aside.fixed.bottom-3` (20) |
| m390 | `/blog/rutschfeste-fliesen-r-klassen` | 200 | 0 | 0 | 116 | 116 | 0 | 0 | `header.fixed.top-0` (22) |
| t768 | `/` | 200 | 0 | 0 | 60 | 60 | 0 | 0 | `header.fixed.top-0` (33) |
| t768 | `/bad` | 200 | 0 | 0 | 33 | 33 | 0 | 0 | `header.fixed.top-0` (26) |
| t768 | `/leistungen` | 200 | 0 | 0 | 37 | 37 | 0 | 0 | `header.fixed.top-0` (33) |
| t768 | `/leistungen/bad` | 200 | 0 | 0 | 40 | 40 | 0 | 0 | `header.fixed.top-0` (37) |
| t768 | `/standorte` | 200 | 0 | 0 | 46 | 45 | 0 | 1 | `header.fixed.top-0` (35) |
| t768 | `/standorte/wetzlar` | 200 | 0 | 0 | 51 | 51 | 0 | 0 | `header.fixed.top-0` (39) |
| t768 | `/fliesen` | 200 | 0 | 0 | 51 | 51 | 0 | 0 | `header.fixed.top-0` (39) |
| t768 | `/ueber-uns` | 200 | 0 | 0 | 52 | 52 | 0 | 0 | `header.fixed.top-0` (42) |
| t768 | `/kontakt` | 200 | 0 | 0 | 34 | 34 | 0 | 0 | `header.fixed.top-0` (28) |
| t768 | `/fliesen/konfigurator` | 200 | 0 | 0 | 39 | 32 | 0 | 7 | `header.fixed.top-0` (23) |
| t768 | `/blog` | 200 | 0 | 0 | 47 | 47 | 0 | 0 | `header.fixed.top-0` (32) |
| t768 | `/blog/rutschfeste-fliesen-r-klassen` | 200 | 0 | 0 | 63 | 63 | 0 | 0 | `header.fixed.top-0` (37) |
| d1440 | `/` | 200 | 0 | 0 | 39 | 39 | 0 | 0 | `header.fixed.top-0` (39) |
| d1440 | `/bad` | 200 | 0 | 0 | 18 | 18 | 0 | 0 | `header.fixed.top-0` (18) |
| d1440 | `/leistungen` | 200 | 0 | 0 | 39 | 39 | 0 | 0 | `header.fixed.top-0` (39) |
| d1440 | `/leistungen/bad` | 200 | 0 | 0 | 27 | 25 | 2 | 0 | `header.fixed.top-0` (25) |
| d1440 | `/standorte` | 200 | 0 | 0 | 18 | 18 | 0 | 0 | `header.fixed.top-0` (18) |
| d1440 | `/standorte/wetzlar` | 200 | 0 | 0 | 15 | 15 | 0 | 0 | `header.fixed.top-0` (15) |
| d1440 | `/fliesen` | 200 | 0 | 0 | 40 | 40 | 0 | 0 | `header.fixed.top-0` (40) |
| d1440 | `/ueber-uns` | 200 | 0 | 0 | 29 | 29 | 0 | 0 | `header.fixed.top-0` (29) |
| d1440 | `/kontakt` | 200 | 0 | 0 | 16 | 16 | 0 | 0 | `header.fixed.top-0` (16) |
| d1440 | `/fliesen/konfigurator` | 200 | 0 | 0 | 40 | 36 | 0 | 4 | `header.fixed.top-0` (36) |
| d1440 | `/blog` | 200 | 0 | 0 | 34 | 32 | 2 | 0 | `header.fixed.top-0` (32) |
| d1440 | `/blog/rutschfeste-fliesen-r-klassen` | 200 | 0 | 0 | 56 | 53 | 3 | 0 | `header.fixed.top-0` (38) |

Die Überlappungsbefunde sind Ausgangswerte. Das Ziel „0 Überlappung“ (Z-09) ist im Basisstand nicht erfüllt.

## Ersatzpfad (Schritt 7) · nicht erreicht

Kein geprüfter Chromium-Schalter wirkt (Namen aus dem Chromium-Binary, Tests mit Chromium 141.0.7390.37 über `page.setContent`):

- Der Schalter-Mechanismus selbst funktioniert: `--disable-blink-features=AutomationControlled` setzt `navigator.webdriver` auf `false`, ohne den Schalter bleibt es `true` (`belege/e0/ausgang/ersatzpfad-probe-breit.json`, Abschnitt `sanity_schalter_wirkt`).
- Geprüft wurden 6 Fälle aus Probe 1 (`ersatzpfad-probe.json`: ohne Schalter, je ScrollTimeline, ViewTimeline, ViewTransition, sowie zwei Kombinationen), 25 Einzelfälle aus Probe 2 (19 Blink-Feature-Namen und 6 Base-Feature-Namen, `ersatzpfad-probe-breit.json`, Abschnitt `kandidaten_einzeln_blink_und_base`) und 3 Sammelfälle (alle Blink-Namen, alle Base-Namen, beides zusammen; Abschnitt `kandidaten_gesammelt`). Im Ergebnis bleiben `CSS.supports('animation-timeline: scroll()')` = true, `CSS.supports('animation-timeline: view()')` = true und `document.startViewTransition` = 'function' in allen Fällen.
- Ergebnis: Kein wirksamer Schalter gefunden. Die Option `--ersatzpfad` wurde nicht in `bildsatz.mjs` ergänzt (ein wirkungsloser Schalter würde den Ersatzpfad nur vortäuschen). Der Lauf `--satz e0-ersatzpfad --seiten /,/kontakt` wurde nicht durchgeführt. Die Entscheidung über einen alternativen Ersatzpfad liegt beim Orchestrator (siehe Offene Fragen).

## Auffälligkeiten

1. **Überlappung durch den festen Kopf.** Der häufigste Verdecker ist `header.fixed.top-0` in allen Ansichten, auf m390 zusätzlich die untere Leiste `aside.fixed.bottom-3`. Das Kennzeichen `data-feste-ebene` (K-009), das diese Elemente vom Befund ausnähme, fehlt im Basisstand: 0 Vorkommen im HTML von 4310 (`/`, `/bad`, `/kontakt`) und keine Fundstelle in `745335f:src/components/common/Header.jsx` und `src/components/layout/MobileBottomBar.tsx`. Die 2041 Befunde sind daher Ausgangswerte ohne das Kennzeichen.
2. **Logos.** Die beiden Logo-Dateien haben 395 903 Byte roh, 297 820 Byte gzip und eingebettete Pixelbilder. Das überschreitet das Illustrations-Budget um ein Vielfaches. Logos sind unantastbar, es gibt hier keinen Änderungsvorschlag.
3. **Kontrast.** 344 ernste Knoten `color-contrast`, darunter Links in Hover-Zuständen der Musterbad-Kacheln.
4. **Bewegung.** Im Basisstand gibt es kein `data-motion`; der Register-Abgleich liefert auf allen 12 Seiten 0 Elemente und 16 Kennungen ohne DOM-Entsprechung.
5. **Last.** Die Messungen liefen auf einem Rechner, den auch andere Pakete belastet haben (1-Minuten-Loadavg bis 7,4 auf 4 CPUs). Das betrifft die Bildraten am stärksten.

## Offene Fragen

Siehe Rückgabe `_werkstatt/pakete/E0-PRUEF-03.rueckgabe.md`, Abschnitt OFFENE FRAGEN.

## Belegliste

- `belege/e0/texte-index.json`, `belege/e0/texte/` (Z-02)
- `belege/e0/ausgang/bildsatz.json`, `_werkstatt/cache/bildsatz/e0/` (Z-09)
- `belege/e0/ausgang/axe/axe.json` (Z-07)
- `_werkstatt/cache/bewegung/e0/{register,reduziert,bildrate}/…/ergebnis.json` (Z-05)
- `belege/e0/ausgang/svg/svg-seiten-zusammenfassung.json`, `belege/e0/ausgang/svg/svg-dateien-745335f.json`, Rohbericht `_werkstatt/cache/svg/e0/2026-10-10T19-24-33-589Z.json` (Z-06)
- `belege/e0/ausgang/schriften.json` (Z-08, Schriften)
- `belege/e0/ausgang/ersatzpfad-probe.json`, `belege/e0/ausgang/ersatzpfad-probe-breit.json` (Schritt 7)
