# E2-GRAF-01 · Rückgabe

## GEÄNDERTE DATEIEN
Neu unter `src/components/icons/svg/`, je eine Zeile mit Briefing-Kopf und einem `<path>`: mail, sprechblase, ort, uhr, kalender, pfeil-links, winkel-unten, winkel-rechts, schliessen, menue, hinweis, fehler (`.svg`). Dazu diese Rückgabe. Sonst nichts im Repo.

## WAS UND WARUM
- Viertelschritte, Strich 1,5, `square`/`miter`, 200 bis 316 Byte.
- mail: Rechteck 3,75–20,25 × 5,25–18,75. Klappe als 45°-Winkel zur Mitte (Spitze 12 / 13,5). Die Klappe setzt 0,75 in der Ecke an, damit keine Kappen-Nase entsteht.
- sprechblase: Rechteck 3,75–20,25 × 3,75–15,75 mit rechtwinkligem Zipfel unten links. Kein 45°-Zipfel: dessen Gehrung wäre rund 2 Einheiten lang.
- ort: Halbkreis (r 6,75), Seiten als Kurven zur Spitze bei 20,25, Innenkreis r 2,25.
- uhr: Kreis r 8,25, Zeiger 12 Uhr (bis 6,75) und 3 Uhr (bis 16,5).
- kalender: Rechteck 3,75–20,25 × 5,25–20,25, Kopfleiste bei 9,75, Aufhänger bei x 8,25 und 15,75, vier Striche (1,5 lang) bei y 13,5 und 16,5.
- pfeil-links: exakte Spiegelung von pfeil-rechts an x = 12.
- winkel-unten, winkel-rechts: Schenkel 45°, Breite 10,5, Spitze bei 14,5.
- schliessen: Diagonalen 5,25 bis 18,75. menue: y 6,75 · 12 · 17,25.
- hinweis: Spitze (12; 5,25), Basis bei y 19,25 von x 4 bis 20 (60°), Strich 9,75–13,5, Punkt 1,5 bei y 16,5. Breite 16, damit die Gehrungen im Lebensbereich bleiben.
- fehler: Stufe 3,75–12 bei y 10,5, Verbinder bei x 12, dann 12–20,25 bei y 13,5.
- Nach der Sichtprüfung: uhr und Innenring mit `z` geschlossen, offene Bögen erzeugten Kappen-Nasen.

## GEMEINSAME DATEIEN
Keine Änderung nötig. Nach Freigabe durch den Orchestrator:
1. `node _werkstatt/werkzeuge/sprite.mjs` (schreibt `sprite.svg` und `namen.ts`). Die 12 Dateien erfüllen dessen Regeln. Nicht ausgeführt.
2. `src/components/icons/zuordnung.ts`, Zeile 18: siehe Frage 6.

## PRÜFUNG UND ERGEBNIS
- Kopf 12 von 12 exakt, je ein `<path>`, keine IDs, Bilder oder Füllflächen.
- Pfad-Daten entsprechen der SVGO-Fassung. Einziger Unterschied zur SVGO-Ausgabe ist der Kopf.
- `svg.mjs --dateien` (Bericht per `--ziel` ins Scratchpad): Fixpunkt 12/12, Budgets ohne Befund, keine Pixelbilder. Einziger Befund `nicht_optimiert` bei 12/12 (Frage 1). Die vier Muster zeigen dasselbe.
- Sichtprüfung: Chromium über `installSperre`, 0 Protokolleinträge. Größen 24, 48 und 96 px, Detail 240 px.
- Dev-Schaufenster nicht geprüft, das Sprite fehlt noch.
- Kein Server, kein Build, keine `.env`, kein Commit, kein Push. Meine Änderungen im Git-Status sind nur die 12 neuen Dateien.

## BILDBELEGE
- [Sichtprüfung 24 · 48 · 96 px](/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-GRAF-01/sichtpruefung-24-48-96.png)
- [Detail 240 px](/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-GRAF-01/zoom-240.png)
- Prüfseite: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-GRAF-01/sichtpruefung.html`

## OFFENE FRAGEN
1. **svg.mjs gegen die Kopf-Vorgabe.** Der Vergleich verlangt die SVGO-Fassung. SVGO streicht den Standardwert `stroke-linejoin="miter"` und sortiert die Attribute, das Briefing verlangt beides so. Betroffen: alle 12 Dateien und alle 4 Muster. Kopf unverändert gelassen. Vorschlag: Vergleich ohne Attributreihenfolge und ohne Standardwerte.
2. **fehler ist flach.** Drei Einheiten Versatz ergeben etwa 4,5 px Höhe bei 24 px. Bitte bestätigen oder die Vorgabe ändern.
3. **mail:** Klappen-Spitze bei 13,5 statt 12, damit die Klappe 45° hat. Bitte bestätigen.
4. **Muster pfeil-rechts:** Das Schaftende bei 19,25 ragt als Kappe etwa 0,3 Einheiten neben die Gehrung (bei 240 px sichtbar). pfeil-links hat dieselbe Stelle. Vorschlag: Schaft auf 18,75 bzw. 5,75 kürzen, Muster und Spiegel gemeinsam. Liegt nicht in meinem Paket, daher ungeändert.
5. **lib.mjs, Anfragesperre:** `file://` wird mit 204 beantwortet. Dadurch bricht `page.goto(file://…)` mit ERR_ABORTED ab, und `<img src="file://…">` lädt aus einer about:blank-Seite nicht. Die Prüfseite enthält den Dateiinhalt deshalb inline. Vorschlag: `file:` für lokale Sichtprüfungen zulassen.
6. **zuordnung.ts:** `Info` und `HelpCircle` zeigen auf `'info'`. Dieses Icon gibt es weder in der UI-Liste noch in `svg/`. Bitte klären: anlegen oder umstellen. Nicht in meinem Paket.
