<!-- Gesichert aus der Rückgabe des Haiku-Agenten (24.10.2026), gekürzt. Antworten des Orchestrators unten. -->
# E2-BILD-01 · Rückgabe

- Neu: `_werkstatt/werkzeuge/bilder.mjs` (Modi `--auftrag`, `--pruefe`, `--probe`; reine Funktionen `ausschnitt`, `zielbreiten`, `dateiname`, `slug`, `randAbschnitt`, `korrekturGewinne`, `metadatenFunde`, `pngChunks`, `auftragNormalisieren`) und `tests-logik/bilder.test.mjs` (25 Tests).
- Ränder: Zeilen und Spalten mit Helligkeits-Standardabweichung unter 4, höchstens 25 % je Seite (die Originale haben schwarze Balken von rund 19 bis 20 % oben und unten).
- Korrektur: Weißabgleich nach Grauwelt, Belichtung nur außerhalb des Bandes 100 bis 170, je Kanal höchstens ±8 %.
- Prüfung: `node --test tests-logik/bilder.test.mjs` 25 von 25; `--probe` PROBE OK (Ränder erkannt, 4:5, Metadaten vorher exif, xmp, PNG-eXIf, PNG-zTXt, nachher keine); `--pruefe` findet die Probequelle (Exit 1) und nichts im Rauchlauf (Exit 0).
- Rauchlauf: start-dusche 640 px 38 KB, 960 px 71 KB, 1280 px 107 KB; lage-balkon 470 px 26 KB; progressiv, sRGB, ohne Metadaten.
- Hinweis an gemeinsame Datei: In `bildinventar.csv` beschreiben `breite` und `hoehe` die Social-Zuschnitte (1080 × 1350), nicht die Originale (1320 × 2868).

## Antworten des Orchestrators
1. JPEG-Qualität 82 nach K-012 gilt (Briefing nannte 78).
2. lage-balkon: rechts der Säule (Fliesen mit Geländer, rund 780 px), Schwerpunkt 62 % / 62 %; in `bildplaetze.md` geändert.
3. Schatten unten links: liegt damit außerhalb des Zuschnitts.
4. start-dusche: Schwerpunkt 50 % / 48 %, damit der Duschkopf ganz im Bild ist; in `bildplaetze.md` geändert.
5. Schwerpunkte beziehen sich auf das ganze Originalfoto: bestätigt.
6. `bildinventar.csv`: Die Spalten `breite`, `hoehe`, `kb` beschreiben die Social-Zuschnitte; die Webfassungen entstehen aus den Originalen (1320 × 2868). Vermerk im Kopf von `bildplaetze.md` genügt.

=== ENDE E2-BILD-01 · BEREIT ZUR RÜCKGABE ===
