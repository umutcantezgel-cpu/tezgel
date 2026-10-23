# E3-PRUEF-W1 · Rückgabe (Prüfer, Arbeitsmodell)

**GEÄNDERTE DATEIEN**
- `_werkstatt/werkzeuge/bewegung.mjs`: 1 Zeile (AUSLOESER).
- `_werkstatt/werkzeuge/bildsatz.mjs`: `--ersatzpfad` mit Wartelogik, Kopf und Nutzungszeile.
- `_werkstatt/werkzeuge/server.sh`: Startzeile.
- Commit `a566314` (nicht von mir) enthält bildsatz.mjs und server.sh in dieser Fassung; bewegung.mjs ist nur im Arbeitsbaum. Nichts von mir committet.

**WAS UND WARUM**
1. `sig-ablauf` → `szene-ablauf` (Trigger `scroll` bleibt). KERN v2 kennt kein SIG-2; der große Moment auf /bad ist die Szene `szene-ablauf` (K-007, Scroll). Alle 12 Zeilen stehen jetzt im Register. Die Meldung „nicht im K-009-Auszug“ entfällt für `szene-ablauf`.
2. Ersatzpfad: Bisher war er mit dem normalen Satz pixelgleich (`reducedMotion: 'reduce'`). Jetzt läuft normale Bewegung (`no-preference`); nach dem Durchscrollen wartet der Lauf höchstens 5 s auf das Ende laufender Animationen. Die Restzahl steht in `ergebnisse[].animationen` und `zusammenfassung.animationen`. Der normale Satz bleibt reduziert.
3. Blockierender Start: Die Unterschale hielt die Ausgabe-Pipe des Aufrufers offen. Jetzt `( cd "$DIR" && exec setsid nohup … ) > /dev/null 2>&1 &`. `$!` ist PID = PGID des Servers, sodass `stop` die richtige Gruppe trifft.

**GEMEINSAME DATEIEN**
Keine Änderung nötig. Bedarf, nicht geschrieben: ein Test in `_werkstatt/werkzeuge/tests/*` für `AUSLOESER['szene-ablauf']` und die Wartelogik.

**PRÜFUNG UND ERGEBNIS**
- `node --check` (bewegung, bildsatz) und `bash -n server.sh`: OK.
- Register `/` (4310, m390), vorher gleich nachher: gefunden anriss, aufklappen, auftritt, druck, sig-kreuzlinie, zustand; unbekannt leer. Der Modus liest die Tabelle nicht.
- `szene-ablauf` und `sig-ablauf` fehlen auf 4310 in /bad (m390; vorher gleich nachher). Tabelle per Import geprüft (12 Einträge; Befundwirkung nur auf dev-Seiten).
- Bildsatz `/`, m390, t768, d1440, je 12 Aufnahmen: Ersatz vorher gleich normal (36/36 md5). Ersatz nachher gleich normal (36/36). Zweiter Lauf gleich erstem (36/36). Animationen: 0 Ansichten mit Zeitlimit, Restzahl 0, Wartezeit 19–750 ms. Keine Fehler, Überlauf, Überlappung oder Konsolenmeldung.
- Kontrolle: reduce hat 0 laufende Animationen; no-preference hat bis 8 gleichzeitig beim Scrollen.
- Server 4312, drei Zyklen: Start 2,22 / 2,29 / 2,64 s (Median 2,29 s), status OK, PID = PGID, stop „gestoppt“. Danach 4312 = 000, 4310 = 200, 4320 = 200.
- Vorher (altes Skript, 4312): Skript endet nach 2 s, die Pipe hängt bis `timeout` nach 90 s (Exit 124).
- Nachweis mit `RELAUNCH_SCRATCH` im Prüfordner (Build-Kopie danach gelöscht), wegen Frage 1.
- `git diff` gelesen: keine Schwelle, Zählung oder Befundart geändert.

**BILDBELEGE**
- Ersatz nachher: `…/E3-PRUEF-W1/s2/ersatz-nachher/{d1440,m390,t768}/start/00–11.jpg`. Vorher: `…/s2/ersatz-vorher/`, normal: `…/s2/normal-vorher/`.
- Vergleiche: `…/E3-PRUEF-W1/vergleich-bildsatz.txt`, `…/vergleich-bewegung.txt`. Server: `…/E3-PRUEF-W1/s3/nachweis-nachher.txt`, `…/s3/vorher-pipeline.txt`.
- Gesichtet: `d1440/start/00.jpg`, `m390/start/00.jpg` (Hero, Plan und Formular vollständig).
- Inhalte fehlen unten: Der Satz deckt nur 12 Bildschirme ab (m390 12 von 33, d1440 12 von 18, t768 12 von 21). Ursache ist die Obergrenze `MAX_AUSSCHNITTE`, nicht der Ersatzpfad.

**OFFENE FRAGEN**
1. DRINGEND: Der Rückfall in `stoppe()` trifft jeden Prozess mit demselben Build-Verzeichnis, unabhängig vom Port. Trockenlauf ohne Signal (`…/E3-PRUEF-W1/probe/trocken-stoppe.sh`): Im Standardscratch würde ein Stop von 4312 die 4310-Prozesse 11057, 11071 und 11072 beenden. Der erste Start ist unkritisch, jeder weitere Start und Stop nicht. Nicht behoben (außerhalb des Auftrags). Vorschlag: Im Rückfall Verzeichnisse aus `fremd` überspringen, auch wenn `eigen` gesetzt ist.
2. `server-4310.pid` zeigt auf die alte Unterschale (PID 11056, PGID 11036), nicht auf den Gruppenführer 11057. Das korrigiert erst der nächste Start von 4310. Nicht angefasst.
3. `sig-ablauf` steht noch in `src/components/kern/seiten/bad/Schrittfuge.tsx` und `src/styles/kern.css` (P4-08a, KERN v1.2). Die Schrittfuge hängt nur an der privaten Route `_entwurf/bad`. Außerhalb meiner Schreibrechte: umbenennen oder Register ergänzen.
4. Register v2 hat `leitachse`, `einzugsband`, `verband`, `fugenband` ohne Tabellenzeile. Das ist keine Namensabweichung; sie erhalten den Befund „nicht im K-009-Auszug“ und den Modus `scroll`. Nicht ergänzt. Kommentar in Zeile 21 nennt noch K-009.
5. Die Obergrenze von 12 Bildschirmen bleibt. Abschnittsbilder über die ganze Höhe sind ein eigenes Thema (E-021).
