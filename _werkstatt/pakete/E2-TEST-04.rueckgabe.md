<!-- Gesichert aus der Rückgabe des Haiku-Agenten (24.10.2026). Antworten des Orchestrators unten. -->
# E2-TEST-04 · Rückgabe

- Neu: `test/verlegen.test.mjs` mit 35 Fällen (Raster 7, Zeitplan 8, Linkfilter 12, Automat 8), Erwartungen aus der Spezifikation K-007 und E-017.
- Ergebnis: 35 von 35 grün; Gegenprobe je Gruppe (Obergrenze 80 → 70, Verlegen-Ende 45 % → 40 %, Grund `datei` → `verlegen`, Wartezeit 3000 → 2000) scheitert wie erwartet, danach Datei byte-gleich zurück. `npx eslint test/verlegen.test.mjs` ohne Befund. `npm test` unverändert grün.
- Wunsch an gemeinsame Datei: Eintrag im Skript `test` der `package.json` (vom Orchestrator gesetzt).

## Offene Fragen und Antworten des Orchestrators
1. `bereit` vor `gelegt` führt ohne `navigiere` zu `ziehen`: gewollt. Bei einem Klick navigiert die Komponente erst nach `gelegt`; ein früheres `bereit` heißt, dass die Seite schon gewechselt hat (etwa durch eine andere Navigation), also wird nicht noch einmal navigiert.
2. Fliesen je Reihe: gemeint ist Breite ÷ Fliesenlänge („etwa drei“, „etwa acht“), wie im Test.
3. Staffel 15 % bezieht sich auf die Weiterzieh-Phase (40 % der Gesamtdauer), wie im Test.
4. Punkte in einer Fuge gelten als gedeckt: richtig, die Fuge gehört zur Fliese (halbe Fuge als Rand in Fugenfarbe).

=== ENDE E2-TEST-04 · BEREIT ZUR RÜCKGABE ===
