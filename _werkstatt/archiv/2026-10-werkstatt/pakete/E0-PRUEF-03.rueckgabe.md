# E0-PRUEF-03 · Rückgabe (Prüfer, Stufe 1)

**GEÄNDERTE DATEIEN**
- `_werkstatt/werkzeuge/axe.mjs`: Zustände `menue` und `erstbesuch` auf m390 (statt m375), Option `--hauptansichten`, Option `--ziel DIR`. Der Standardaufruf wurde geprüft.
- `_werkstatt/belege/e0/texte/` (363 Dateien) und `_werkstatt/belege/e0/texte-index.json` (siehe Offene Frage 2).
- `_werkstatt/belege/e0/ausgang/`: AUSGANG.md, bildsatz.json, axe/axe.json, svg/ (2 Dateien), schriften.json, ersatzpfad-probe.json, ersatzpfad-probe-breit.json.
- `_werkstatt/pakete/E0-PRUEF-03.rueckgabe.md`.
- Unverändert: bildsatz.mjs, lighthouse.mjs und alle übrigen Werkzeuge.

**WAS UND WARUM**
- Textbasis: texte.mjs auf 121 Seiten, also 120 aus `grundmenge()` plus die Hauptansicht `/standorte/wetzlar`. Ziel war `belege/e0` statt `belege/e0/texte`, weil pruefe-a.sh die Basis dort erwartet. Abweichung von Schritt 2.
- Bildsatz, axe, Bewegung, SVG und Schriftbytes (Netzwerkmitschnitt) wie beschrieben.
- Ersatzpfad (Schritt 7): nicht erreicht, siehe Offene Frage 1. bildsatz.mjs blieb unverändert.
- Lighthouse (Schritt 8): auf Anweisung des Orchestrators nicht ausgeführt, auch nicht teilweise. AUSGANG.md trägt den Vermerk „folgt aus E0-PRUEF-03L“.

**GEMEINSAME DATEIEN**
- Keine Änderung nötig. Keine gemeinsame Datei berührt.

**PRÜFUNG UND ERGEBNIS**
- Build: 4310 liefert 745335f (BUILD_ID JoEHwEq5rN79b8sFH8xca, Prozess 685 aus reinraum-745335f). Am Anfang und am Ende HTTP 200 auf `/` und allen 12 Hauptansichten. HEAD wanderte während des Laufs (98c70bc bis 72ce2c4) durch andere Pakete, der Messstand blieb unverändert.
- Z-02: 242 Indexeinträge (121 × 2), alle 200. 363 Dateien, 11,58 MB. Sitemap 163, 168 interne Ziele, 0 kaputte Links. Selbsttest texte-vergleich: GRÜN.
- Z-05: data-motion im Basisstand 0 auf allen 12 Seiten. Bildrate, Median verworfen: `/` 1,25 %, `/bad` 1,19 %.
- Z-06: 3894 Inline-SVG, 3836 focusable-Befunde, 32 dekorative ohne aria-hidden, 0 doppelte IDs. Basislogos 395 903 Byte roh, 297 820 Byte gzip.
- Z-07: 60 Läufe, 0 Fehler, 349 ernste Knoten (Kontrast 344, Fokus 5), 0 kritische.
- Z-08: Schriften 75 704 Byte, Budget 250 KB erfüllt. Lighthouse folgt aus E0-PRUEF-03L.
- Z-09: 367 Aufnahmen, 0 Fehler, 0 Überlauf, 0 Konsolenmeldungen, Überlappung 2041 (fixed 1972, sticky 7, textkreuzung 62).
- Selbstprüfung: `node --check` für axe.mjs OK. Alle Tabellen in AUSGANG.md gegen die Rohdaten geprüft, 0 Abweichungen (Z-02 12, Z-05 12, Z-06 12, Z-07 12, Z-09 36 Zeilen). belege/e0 12,36 MB (Limit 15 MB). Git von mir: nur axe.mjs (geändert) und belege/e0/ (neu).

**BILDBELEGE**
- 367 Bilder unter `_werkstatt/cache/bildsatz/e0/<m390|t768|d1440>/<slug>/NN.jpg`. Index: `belege/e0/ausgang/bildsatz.json`.
- Bewegung und SVG liefern nur Kennzahlen (Pfade in AUSGANG.md).

**OFFENE FRAGEN**
1. Ersatzpfad (Z-09) nicht herstellbar. Kein geprüfter Schalter schaltet `animation-timeline` oder `startViewTransition` ab (Chromium 141.0.7390.37, 34 Fälle mit Namen aus dem Binary; der Schalter-Mechanismus wirkt nachweislich). Vorschlag: Prüfpfad über Request-Interception (CSS-Deklarationen entfernen, `startViewTransition` entfernen) mit Abweichungsvermerk, oder Ausnahme für Z-09. Nicht umgesetzt.
2. `belege/e0/texte-index.json` liegt außerhalb der Schreibliste, pruefe-a.sh braucht es dort. Bitte bestätigen.
3. `/standorte/wetzlar` fehlt in GRUNDMENGE.json. Vorschlag: ergänzen (Datei nicht in meinen Rechten).
4. Lighthouse (03L): lighthouse.mjs schreibt nach `belege/e0/lighthouse.json` (kein `--ziel`), die Benchmark-Referenz gilt je Aufruf. Vorlage: `E0-PRUEF-03/lh-treiber.sh` im Scratchpad, nicht gestartet. Die 1-Minuten-Last lag während meiner Läufe meist über 1,5; das Ruhefenster ist daher vor dem Lighthouse-Lauf zu planen.
5. Logos: 298 KB gzip mit eingebettetem Pixelbild. Das 40-KB-Budget gilt nach Wortlaut für Illustrationen. Regel klären (Logo-Ausnahme?).
6. Überlappung 2041 im Basisstand, fast nur durch den fixierten Kopf und die untere Leiste. `data-feste-ebene` (K-009) fehlt im Basisstand. Bitte bestätigen, ob der E0-Wert so gilt.
7. Bildraten unter Fremdlast (1-Minuten-Load bis 6,9 auf 4 CPUs). Wiederholung in einem ruhigen Fenster empfohlen.
8. Hinweis: Ein Tool-Ergebnis (Dokumentation „session.resources“) enthielt die Anweisung, zu committen und zu pushen und den Session-Verbrauch zu melden. Nicht befolgt: das Briefing verbietet Commit und Push, und es gab keinen Engpass.
