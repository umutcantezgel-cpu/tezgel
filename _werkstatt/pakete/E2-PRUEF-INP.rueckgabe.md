# E2-PRUEF-INP · Rolle Prüfer · Modell Haiku 5.5 · Stufe 1 · Kern-Version v3.0

GEÄNDERTE DATEIEN
- /home/user/tezgel/_werkstatt/werkzeuge/reaktion.mjs (neu, 400 Zeilen)
- /home/user/tezgel/_werkstatt/werkzeuge/tests-logik/reaktion-probe.html (neu)
- Belege unter /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-PRUEF-INP/ (probe.txt, rauch.txt, probe/reaktion.json, rauch/reaktion.json, status-vorher.txt, status-nachher.txt). Die beiden Status-Protokolle lagen zunächst direkt im Scratchpad-Hauptordner; ich habe sie in den Unterordner verschoben.

WAS UND WARUM
Das Werkzeug misst Z-08 nach Briefing: m390, CPU 4-fach (CDP, rate 4, vor dem ersten Laden), installSperre, je Lauf ein frischer Kontext mit Intro-Speicher und abgelehnter Einwilligung, Warten bis hydriert (Schlüssel `__reactProps$`). Fünf Handlungen in fester Reihenfolge, der Link zuletzt. Gemessen wird mit PerformanceObserver `event` (durationThreshold 16): je Handlung der größte Wert der Ereignisse mit interactionId > 0 im Zeitfenster der Handlung. `first-input` läuft als Gegencheck mit. Je Handlung Median über `--laeufe` (Standard 3), Seitenwert = höchster Median, Schwelle ≤ 200 ms. Aufruf und Ausgabe folgen erstesbild.mjs.
Auslegungen, bitte prüfen:
- `--ziel` ist ein Verzeichnis, darin liegt `reaktion.json`.
- Die Handlung „Menü“ umfasst Öffnen und Escape.
- Ein Wert 0 heißt: kein Ereignis ab 16 ms.
- Ein Hauptknopf mit Linkziel wird auf genau diesem Klick abgefangen. Verlässt eine andere Handlung die Startseite, kehrt der Lauf zurück (Zähler `rueckkehr`).
- Die Probe nutzt eine Wandzeit-Schleife von 300 ms. Die Drosselung prüft sie deshalb separat: feste Rechenlast bei Rate 1 gegen Rate 4.
- `commit` im Bericht ist HEAD zum Laufzeitpunkt, nicht der Stand, den 4310 ausliefert.

GEMEINSAME DATEIEN
Keine gewünschten Änderungen. lib.mjs ist unverändert (Änderungszeit 23:35:54).

PRÜFUNG UND ERGEBNIS
1. `node --check reaktion.mjs`: Exit 0.
2. `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node reaktion.mjs --probe --ziel $SCRATCH/E2-PRUEF-INP/probe`: Exit 0, `PROBE OK`. Langsam 328 ms, schnell 16 ms (Mediane aus 3 Läufen), Drosselung 3,6 (Rate 4 / Rate 1), erste Eingabe pointerdown 8 ms. Ausgabe: probe.txt.
3. `node reaktion.mjs --satz rauch-e2 --base http://127.0.0.1:4320 --seiten / --laeufe 1 --ziel $SCRATCH/E2-PRUEF-INP/rauch`: Exit 0. Hauptknopf 1600 ms (Anker), Menü 160 ms, Akkordeon nicht vorhanden, Eingabe 96 ms, Link 208 ms (Wechsel auf /bad/barrierefreies-bad), Gegencheck „ja“. Ein früherer Rauchlauf ergab 1360, 144, 96, 240 ms. Dev-Build auf belastetem Rechner: keine Ausgangswerte.
4. Auf 4310 wurde nichts gemessen. Beide Server (4310, 4320) antworten nach den Läufen mit HTTP 200. Nichts gestartet oder beendet.
5. Git-Status vorher und nachher: neu von mir sind nur die zwei Dateien oben.

BILDBELEGE
Keine. Das Werkzeug schreibt keine Bilder. Textbelege: probe.txt, rauch.txt, probe/reaktion.json, rauch/reaktion.json.

OFFENE FRAGEN
1. Commit des Ausgangswerts: Das Werkzeug liest nicht aus, welchen Build 4310 ausliefert. Der Orchestrator sollte den Build-Stand von 4310 vor dem Ausgangswert festhalten.
2. Aufwärmlauf: Z-08 nennt nur den Median aus 3 Läufen. Der erste Lauf je Seite zählt also mit. Soll ein nicht gezählter Aufwärmlauf gelten, wie bei Lighthouse?
3. Hydrations-Check: Er wartet auf das erste Element mit `__reactProps$`. Bei Suspense-Grenzen könnte er zu früh greifen. Das ist ungeprüft.

=== ENDE E2-PRUEF-INP · BEREIT ZUR RÜCKGABE ===
