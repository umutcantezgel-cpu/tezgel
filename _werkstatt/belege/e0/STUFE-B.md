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

## 8 · Leistung (Lighthouse)

offen (E0-PRUEF-03L)
