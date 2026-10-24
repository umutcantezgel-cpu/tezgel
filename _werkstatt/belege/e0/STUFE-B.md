# STUFE B · Ausgangswerte (E0-PRUEF-03)

Stand der Messung: alter Stand c53faf4 auf 127.0.0.1:4310 (Reinraum). HEAD ist 583656d; `git diff --stat c53faf4 HEAD -- src public package.json package-lock.json next.config.ts` ist leer, daher gilt der Reinraum-Stand von c53faf4 für Schritt 1. Keine Deutung, keine Empfehlung.

## 1 · Bestand

| Prüfung | Ergebnis | Quelle |
| --- | --- | --- |
| npm ci | Exit 0 (24s) | reinraum-c53faf4/ergebnis.txt |
| build | Exit 0 (45s) | reinraum-c53faf4/ergebnis.txt |
| typecheck | Exit 0 (12s) | reinraum-c53faf4/ergebnis.txt |
| lint | Exit 0 (27s) | reinraum-c53faf4/ergebnis.txt |
| test (node --test) | Exit 0 (1s); 37 von 37 bestanden, 0 fehlgeschlagen | reinraum-c53faf4/test.log |
| qa:graph | Exit 0 (0s) | reinraum-c53faf4/qa-graph.log |

| Funktionsspecs (13 Dateien, ohne funktion-tracking) | Bestanden | Fehlgeschlagen | Übersprungen | Gesamt | Quelle |
| --- | --- | --- | --- | --- | --- |
| Playwright, Port 4310, workers 1 | 290 | 0 | 12 | 302 | E0-PRUEF-03/funktion.json, schritt1-funktion.log |

Fehlschläge: keine, daher keine Einzelwiederholung. Übersprungen: 4 Einträge als `test.fixme` (funktion-konfigurator.spec.mjs Zeilen 210 und 225, je Projekt mobil und desktop), 8 Einträge durch projektbedingtes `test.skip`.

## 2 · Konsolenfehler je Seite (Erstbesuch, ohne Einwilligung, reducedMotion reduce)

| Seite | m390 | d1440 |
| --- | --- | --- |
| / (start) | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 |
| /bad | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 |
| /bad/badsanierung | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 |
| /bad/barrierefreies-bad | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 |
| /leistungen | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 |
| /fliesen | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 |
| /balkon-terrasse | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 |
| /referenzen | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 |
| /ueber-uns | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 |
| /kontakt | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 |
| /standorte/wetzlar | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 |
| /blog | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 | 0 (ohne Ressourcenmeldungen 0) / Seitenfehler 0 / eigene Anfragen ≥400 0 |

Gesperrte Dritt-Host-Anfragen: 0; blockierte Schreibzugriffe: 0 (Summe über alle 24 Läufe). Positivprobe (`konsole.mjs --probe`): BESTANDEN.

## 3 · Bildsatz: Überlauf je Seite und Gerät (Befunde, Werkzeug bildsatz.mjs)

| Seite | m360 | m390 | m430 | q844 | t768 | t1024 | d1280 | d1440 | d1920 | d2560 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| / (start) | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 0 |
| /bad | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 0 |
| /bad/badsanierung | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 0 |
| /bad/barrierefreies-bad | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 0 |
| /leistungen | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 0 |
| /fliesen | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 0 |
| /balkon-terrasse | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 0 |
| /referenzen | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 0 |
| /ueber-uns | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 0 |
| /kontakt | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 0 |
| /standorte/wetzlar | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 0 |
| /blog | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 0 |

Aufnahmen gesamt 1247, Fehler 0, nicht 200: 0. Überlappung: 0 Befunde. Konsolenmeldungen im Bildsatz: 0. Alle Überlauf-Befunde liegen bei d1280 (je Seite 2, Art „ragt-heraus“, rechte Kante 1285 px bei 1280 px Breite).

## 4 · Erstes Bild (Werkzeug erstesbild.mjs): bestandene Elemente von 5

Durchgang erstbesuch:

| Seite | m360 | m390 | m430 | q844 | t768 | t1024 | d1280 | d1440 | d1920 | d2560 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| / (start) | 1/5 | 3/5 | 3/5 | 3/5 | 5/5 | 4/5 | 2/5 | 3/5 | 5/5 | 5/5 |
| /bad | 2/5 | 3/5 | 3/5 | 3/5 | 5/5 | 4/5 | 3/5 | 4/5 | 5/5 | 5/5 |
| /bad/badsanierung | 2/5 | 2/5 | 2/5 | 3/5 | 4/5 | 5/5 | 3/5 | 4/5 | 5/5 | 5/5 |
| /bad/barrierefreies-bad | 3/5 | 3/5 | 3/5 | 3/5 | 5/5 | 4/5 | 3/5 | 5/5 | 5/5 | 5/5 |
| /leistungen | 2/5 | 3/5 | 3/5 | 3/5 | 5/5 | 4/5 | 3/5 | 4/5 | 5/5 | 5/5 |
| /fliesen | 2/5 | 2/5 | 2/5 | 3/5 | 4/5 | 5/5 | 4/5 | 5/5 | 5/5 | 5/5 |
| /balkon-terrasse | 2/5 | 2/5 | 3/5 | 3/5 | 4/5 | 5/5 | 3/5 | 4/5 | 5/5 | 5/5 |
| /referenzen | 2/5 | 2/5 | 3/5 | 3/5 | 5/5 | 4/5 | 2/5 | 4/5 | 5/5 | 5/5 |
| /ueber-uns | 3/5 | 3/5 | 5/5 | 3/5 | 5/5 | 5/5 | 4/5 | 5/5 | 5/5 | 5/5 |
| /kontakt | 3/5 | 3/5 | 4/5 | 3/5 | 5/5 | 5/5 | 4/5 | 5/5 | 5/5 | 5/5 |
| /standorte/wetzlar | 3/5 | 3/5 | 4/5 | 3/5 | 5/5 | 4/5 | 3/5 | 5/5 | 5/5 | 5/5 |
| /blog | 2/5 | 4/5 | 4/5 | 3/5 | 5/5 | 5/5 | 4/5 | 5/5 | 5/5 | 5/5 |

Durchgang nach-einwilligung:

| Seite | m360 | m390 | m430 | q844 | t768 | t1024 | d1280 | d1440 | d1920 | d2560 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| / (start) | 3/5 | 4/5 | 5/5 | 3/5 | 5/5 | 5/5 | 4/5 | 5/5 | 5/5 | 5/5 |
| /bad | 3/5 | 3/5 | 3/5 | 5/5 | 5/5 | 5/5 | 4/5 | 5/5 | 5/5 | 5/5 |
| /bad/badsanierung | 2/5 | 3/5 | 3/5 | 4/5 | 4/5 | 5/5 | 3/5 | 4/5 | 5/5 | 5/5 |
| /bad/barrierefreies-bad | 3/5 | 4/5 | 4/5 | 5/5 | 5/5 | 5/5 | 4/5 | 5/5 | 5/5 | 5/5 |
| /leistungen | 3/5 | 4/5 | 5/5 | 5/5 | 5/5 | 5/5 | 4/5 | 5/5 | 5/5 | 5/5 |
| /fliesen | 2/5 | 2/5 | 2/5 | 4/5 | 4/5 | 5/5 | 4/5 | 5/5 | 5/5 | 5/5 |
| /balkon-terrasse | 3/5 | 3/5 | 3/5 | 4/5 | 4/5 | 5/5 | 3/5 | 4/5 | 5/5 | 5/5 |
| /referenzen | 4/5 | 4/5 | 4/5 | 4/5 | 5/5 | 5/5 | 4/5 | 5/5 | 5/5 | 5/5 |
| /ueber-uns | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 4/5 | 5/5 | 5/5 | 5/5 |
| /kontakt | 4/5 | 4/5 | 4/5 | 5/5 | 5/5 | 5/5 | 4/5 | 5/5 | 5/5 | 5/5 |
| /standorte/wetzlar | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 4/5 | 5/5 | 5/5 | 5/5 |
| /blog | 4/5 | 4/5 | 4/5 | 5/5 | 5/5 | 5/5 | 4/5 | 5/5 | 5/5 | 5/5 |

Fälle 240, alle 5 bestanden 116, Fehler 0, nicht 200: 0. Querformat q844 (Grenze 25 %): 32,4 % in allen 24 Fällen (Seite × Durchgang). Erste Bilder: 120 Dateien in _werkstatt/bilder/e0.

## 5 · Zugänglichkeit (axe-core, WCAG 2.2 AA, Werkzeug axe.mjs)

| Seite | Läufe (Ansichten) | kritisch | ernst | mittel | gering |
| --- | --- | --- | --- | --- | --- |
| / (start) | 11 | 0 | 0 | 0 | 0 |
| /bad | 11 | 0 | 0 | 0 | 0 |
| /bad/badsanierung | 11 | 0 | 0 | 0 | 0 |
| /bad/barrierefreies-bad | 11 | 0 | 0 | 0 | 0 |
| /leistungen | 11 | 0 | 0 | 0 | 0 |
| /fliesen | 11 | 0 | 0 | 0 | 0 |
| /balkon-terrasse | 11 | 0 | 0 | 0 | 0 |
| /referenzen | 11 | 0 | 0 | 0 | 0 |
| /ueber-uns | 11 | 0 | 0 | 0 | 0 |
| /kontakt | 11 | 0 | 0 | 0 | 0 |
| /standorte/wetzlar | 11 | 0 | 0 | 0 | 0 |
| /blog | 11 | 0 | 0 | 0 | 0 |

Läufe gesamt 132; Befund-Knoten kritisch/ernst 0. Positivprobe (bekannte Fehler image-alt, button-name, color-contrast per Ad-hoc-Seite): BESTANDEN. Läufe je Seite: 10 Geräte plus m375.

## 6 · Lesbarkeit (Werkzeug lesbarkeit.mjs, alle Sitemap-Adressen)

Seiten 163 · GRÜN 0 · ROT 162 · ausgenommen 1 (/barrierefreiheit).

| Regel | Seiten ROT | Befunde gesamt (Werkzeug) |
| --- | --- | --- |
| flesch | 142 | 142 |
| satz-mittel | 0 | 0 |
| satz-lang | 57 | 90 |
| absatz-lang | 4 | 4 |
| gedankenstrich | 162 | 4398 |
| bindestrich | 162 | 5833 |
| floskel | 135 | 324 |
| glossar-offen | 155 | 1335 |
| titel | 0 | 0 |
| beschreibung | 0 | 0 |
| alt | 0 | 0 |

Flesch-Schwelle je Seitenart: erzählend 60, Ort 60, Wissen 50, Arbeit ohne Schwelle. Positivprobe (`lesbarkeit.mjs --probe`): PROBE OK.

## 7 · Reduzierte Bewegung (Werkzeug bewegung.mjs --modus reduziert, Ansicht m390)

| Seite | Bewegungsbefunde | Geprüfte Fälle | Unsichtbare Einträge (Liste im Werkzeug) | Hover-Fehler | Tab-Schritte |
| --- | --- | --- | --- | --- | --- |
| / (start) | 0 | 255 | 9 | 0 | 30 |
| /bad | 0 | 168 | 5 | 0 | 30 |
| /bad/badsanierung | 0 | 149 | 5 | 0 | 30 |
| /bad/barrierefreies-bad | 0 | 146 | 5 | 0 | 30 |
| /leistungen | 0 | 184 | 5 | 0 | 30 |
| /fliesen | 0 | 207 | 6 | 0 | 30 |
| /balkon-terrasse | 0 | 152 | 5 | 0 | 30 |
| /referenzen | 0 | 154 | 5 | 0 | 30 |
| /ueber-uns | 0 | 146 | 5 | 0 | 30 |
| /kontakt | 0 | 202 | 5 | 0 | 30 |
| /standorte/wetzlar | 0 | 152 | 5 | 0 | 30 |
| /blog | 0 | 167 | 5 | 0 | 30 |

## 8 · Leistung (Lighthouse, E0-PRUEF-03L)

Lauf 24.10.2026 00:00 bis 01:00 CEST im Ruhefenster gegen den Prüfbau von c53faf4 (Port 4310), Werkzeug `lighthouse.mjs --satz e0 --hauptansichten --laeufe 3 --formen mobil,desktop`: lokal `next start` (komprimiert), Erstbesuch mit Banner, Dritt-Hosts blockiert, Standard-Drosselung (mobil simuliert 4× CPU, Slow 4G; Desktop-Preset), frisches Profil je Lauf, ein Aufwärmlauf, Median aus 3. Zusammenfassung `belege/e0/lighthouse.json`; Rohberichte nur im Scratchpad.

| Seite | Form | Leistung (Spanne) | Zugängl. | Best Practices | SEO | LCP ms (Spanne) | CLS | TBT ms (Spanne) | FCP ms | LCP-Element |
|---|---|---|---|---|---|---|---|---|---|---|
| `/` | mobil | 89 (88–90) | 100 | 100 | 100 | 3472 (3446–3497) | 0 | 162 (107–173) | 1364 | `> div.relative > div.mt-8 > p.max-w-mass` |
| `/` | desktop | 100 (100) | 100 | 100 | 100 | 687 (660–694) | 0 | 4 (0–6) | 333 | `> div.relative > div.mt-8 > p.max-w-mass` |
| `/bad` | mobil | 92 (88–94) | 100 | 100 | 100 | 2854 (2506–2881) | 0 | 207 (192–319) | 1061 | `div.grid > div.col-span-4 > div.mt-6 > p` |
| `/bad` | desktop | 100 (100) | 100 | 100 | 100 | 671 (538–686) | 0 | 19 (16–33) | 294 | `.col-span-4 > h1.text-tinte > span.block` |
| `/bad/badsanierung` | mobil | 92 (89–96) | 100 | 100 | 100 | 2596 (2418–2609) | 0 | 287 (117–330) | 1065 | `div.grid > div.col-span-4 > div.mt-6 > p` |
| `/bad/badsanierung` | desktop | 100 (100) | 100 | 100 | 100 | 687 (662–696) | 0 | 8 (3–10) | 292 | `div.grid > div.col-span-4 > div.mt-6 > p` |
| `/bad/barrierefreies-bad` | mobil | 95 (92–96) | 100 | 100 | 100 | 2472 (2412–2565) | 0 | 197 (166–256) | 1061 | `div.grid > div.col-span-4 > div.mt-6 > p` |
| `/bad/barrierefreies-bad` | desktop | 100 (100) | 100 | 100 | 100 | 665 (605–704) | 0 | 7 (0–21) | 294 | `div.grid > div.col-span-4 > div.mt-6 > p` |
| `/leistungen` | mobil | 87 (86–91) | 100 | 100 | 100 | 2925 (2868–3161) | 0 | 283 (224–387) | 1063 | `div.grid > div.col-span-4 > div.mt-6 > p` |
| `/leistungen` | desktop | 100 (100) | 100 | 100 | 100 | 593 (550–682) | 0 | 13 (9–35) | 335 | `div.grid > div.col-span-4 > div.mt-6 > p` |
| `/fliesen` | mobil | 91 (91–95) | 100 | 100 | 100 | 2718 (2559–2932) | 0 | 215 (118–289) | 1215 | `div.grid > div.col-span-4 > div.mt-6 > p` |
| `/fliesen` | desktop | 100 (100) | 100 | 100 | 100 | 589 (576–687) | 0.051 | 1 (0–15) | 333 | `div.grid > div.col-span-4 > div.mt-6 > p` |
| `/balkon-terrasse` | mobil | 95 (90–96) | 100 | 100 | 100 | 2429 (2415–2484) | 0 | 179 (160–347) | 1063 | `div.grid > div.col-span-4 > div.mt-6 > p` |
| `/balkon-terrasse` | desktop | 100 (100) | 100 | 100 | 100 | 662 (535–695) | 0 | 24 (6–53) | 294 | `div.grid > div.col-span-4 > div.mt-6 > p` |
| `/referenzen` | mobil | 94 (94) | 100 | 100 | 100 | 2411 (2410–2418) | 0 | 208 (206–218) | 1062 | `div.grid > div.col-span-4 > div.mt-6 > p` |
| `/referenzen` | desktop | 100 (100) | 100 | 100 | 100 | 618 (565–619) | 0 | 10 (7–19) | 291 | `.col-span-4 > h1.text-tinte > span.block` |
| `/ueber-uns` | mobil | 94 (94–95) | 100 | 100 | 100 | 2629 (2413–2710) | 0 | 166 (133–231) | 1066 | `div.grid > div.col-span-4 > div.mt-6 > p` |
| `/ueber-uns` | desktop | 100 (100) | 100 | 100 | 100 | 537 (533–693) | 0 | 7 (7–29) | 295 | `div.grid > div.col-span-4 > div.mt-6 > p` |
| `/kontakt` | mobil | 88 (87–89) | 99 | 100 | 100 | 2706 (2399–2859) | 0 | 376 (353–379) | 914 | `div.grid > div.col-span-4 > div.mt-6 > p` |
| `/kontakt` | desktop | 100 (100) | 99 | 100 | 100 | 553 (534–698) | 0.002 | 4 (3–9) | 297 | `div.grid > div.col-span-4 > div.mt-6 > p` |
| `/standorte/wetzlar` | mobil | 90 (89–96) | 100 | 100 | 100 | 2427 (2414–2857) | 0 | 300 (167–349) | 1064 | `div.grid > div.col-span-4 > div.mt-6 > p` |
| `/standorte/wetzlar` | desktop | 100 (100) | 100 | 100 | 100 | 569 (567–665) | 0 | 9 (7–10) | 290 | `.col-span-4 > h1.text-tinte > span.block` |
| `/blog` | mobil | 85 (84–88) | 100 | 100 | 100 | 3120 (2729–3179) | 0 | 369 (338–413) | 912 | `div.grid > div.col-span-4 > div.mt-6 > p` |
| `/blog` | desktop | 100 (100) | 100 | 100 | 100 | 655 (597–661) | 0 | 5 (5–16) | 291 | `div.grid > div.col-span-4 > div.mt-6 > p` |

