# E2-GRAF-02 · Rückgabe · Grafiker (Arbeitsmodell)

## GEÄNDERTE DATEIEN
Neu, je eine Zeile, in `src/components/icons/svg/`: plus, minus, stern, download, suche, teilen, link-extern, haus, dokument, schloss, info (je `.svg`, 11 Dateien). Sonst nur diese Rückgabe.

## WAS UND WARUM
- Kopf wortgleich zur Vorgabe, je ein `<path d>`, keine IDs, keine Füllflächen. Das `d` ist SVGO-optimiert (preset-default wie in `svg.mjs`); übernommen wurde nur der Pfadinhalt.
- plus/minus 5,25–18,75. suche: Kreis r 6 bei 10,5/10,5, Griff bis 20,25/20,25. download: Grundlinie y 20,25, Schaft endet eine Einheit vor der Spitze. link-extern: Schaft endet bei 19,5/4,5 (dieselbe Stelle wie bei download). haus: Dach 45°, Türöffnung 4,5 × 4,5 im Sockel. schloss: Halbbogen r 3,75 mit Schlüsselloch-Strich. info: Kreis r 8,25 wie uhr.svg.
- stern: Umriss mit Spitzen bei ±18°, Breite 16,5, Innenradius 0,5 × Außenradius, `miter`. Die Koordinaten haben zwei Nachkommastellen, weil die Winkel nicht auf dem Viertelraster liegen (Ausnahme laut Regel).
- info: Punkt als Nullstrecke mit quadratischer Kappe (`h0`), ohne Füllung.
- teilen: drei 3×3-Quadrate an den Ecken, zwei Verbindungslinien mit Steigung ±1:2.
- dokument: Eckknick als 45°-Schnitt mit Falzlinie, drei Textlinien.

## GEMEINSAME DATEIEN
Keine Änderung an gemeinsamen Dateien nötig. Gewünscht (Orchestrator):
1. `node _werkstatt/werkzeuge/sprite.mjs` ausführen. Die elf Symbole fehlen noch in `sprite.svg` (keine Treffer für `id="<name>"`); `namen.ts` entsteht dabei neu.
2. `zuordnung.ts`: `minus` ist nicht als Ziel eingetragen. Falls gewünscht, `Minus: 'minus'` ergänzen. Die übrigen zehn Namen sind bereits zugeordnet.

## PRÜFUNG UND ERGEBNIS
- `svg.mjs --dateien` (elf Dateien, Bericht per `--ziel` in den Scratch-Ordner): Fixpunkt 11/11, optimiert 11/11, Befunde gesamt 0, Exit 0.
- Eigene Prüfung: je eine Zeile, je ein `<path>`, 193–268 Byte (Grenze 600), alle Koordinaten im Bereich 2,75–21,25, Strichstärke 1,5 überall.
- Korrigiert: Schaftende von link-extern und Griffansatz von suche auf das Viertelraster gesetzt. Sonst keine Änderung nach der Sichtprüfung.
- Sichtprüfung 24 und 48 px neben telefon, pfeil-rechts, haken, fliese, dazu 96 und 192 px. Spitzen und Gehrungen sauber; Lupe und Pfeilspitze reichen optisch bis etwa 21,3 (innerhalb 2,0–22,0).
- Git: meine Änderungen sind genau die elf neuen Dateien plus diese Rückgabe. Die übrigen Änderungen im Arbeitsbaum (u. a. `bewegung.css`, `globals.css`, `stile.ts`, `lib.mjs`, `iconMapper.jsx`) stammen nicht von mir.
- Nicht ausgeführt: `sprite.mjs`, Build, Server, Commit, Push, Formulare, `.env*`.

## BILDBELEGE
- [Sichtprüfung 24 · 48 · 96 px](/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-GRAF-02/sichtpruefung-24-48-96.png)
- [Detail 192 px](/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-GRAF-02/detail-192.png)
- Prüfseite (inline-SVG, per `setContent` geladen): `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-GRAF-02/sichtpruefung.html`

## OFFENE FRAGEN
1. **plus/minus** sind nach Vorgabe 13,5 breit. Die Hauptform-Regel (16,5) ergäbe 3,75–20,25. Im 24-px-Bild wirken sie etwas leichter als die Muster. Bitte festlegen.
2. **teilen**: Verbindungslinien mit Steigung 1:2, weil 45° nach K-008 nur Pfeilspitzen, Haken und Tropfen vorbehalten ist. Bitte Form bestätigen.
3. **dokument**: Eckknick als 45°-Schnitt wie das Dach von haus. Eine rechtwinklige Variante ist möglich; bitte entscheiden.
4. **svg.mjs** schreibt ohne `--ziel` nach `_werkstatt/cache/svg`, also in den Repo-Baum außerhalb der Schreibrechte. Hinweis für künftige Pakete.
