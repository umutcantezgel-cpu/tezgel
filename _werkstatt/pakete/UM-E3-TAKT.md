# UM-E3-TAKT · Bildrate auf `/` nach UM-E3-FIX2 · Rolle Baumeister (Leistung der Bewegung, Arbeitskopie) · Modell Opus · Kern-Version 4.4

## Ausgangslage
- `bewegung.mjs --modus bildrate --seite /` (m390, DPR 2, CPU 4×, Scroll-Geste oben → unten → oben, Median aus 3 Läufen) misst verworfene Bilder:
  - vorher 904eb1f1: 0,20 %, 0,20 %, 0,34 % (Läufe 0,27 / 0,07 / 0,2 bzw. 0,27 / 0 / 0,2);
  - nachher 8bcca3c8: 4,3 %, 4,17 %, 3,8 % (Läufe 4,79 / 4,17 / 3,92 bzw. 4,13 / 3,8 / 3,8);
  - LoAF 0 bis 1 in beiden Ständen.
- Die Schwelle (ABNAHME Z-06) liegt bei höchstens 5 %. Der Wert ist knapp darunter und eine klare Verschlechterung.
- Neu in UM-E3-FIX2 und Hauptverdacht: die scroll-gebundene Leitachse aus N1 (`src/app/globals.css`, Block mit `@supports (animation-timeline: view()) … (timeline-scope: --a)`).
  - Mehrere benannte `view-timeline` (`--leitfaden`, `--kopf-pause`, `--kopf-pause-2`, `--kopf-pause-ganz`, `--abschnitt-kante`) mit `timeline-scope`.
  - Eine Marke mit vier Animationen auf vier Zeitstrahlen.
  - Bereiche mit `calc(60vh ± …)`.
  - Dazu `.lot-stueck`, Quadratmeter und Eingang aus N3, N5 und N6; diese sind zeitgesteuert und laufen nur beim Laden.
- Diffs: `git diff 904eb1f1 8bcca3c8`. Notizen der Baumeister: `_werkstatt/belege/um-e3-fix2/notiz-teil-a.md`, `notiz-teil-b.md`.

## Auftrag
1. **Ursache belegen.** Nicht raten.
   - Experimente gegen einen lokalen Bau: einzelne Regeln per eingespritztem Stil abschalten, im Muster von `bewegung.mjs` bildrate; Messcode aus `_werkstatt/werkzeuge/bewegung.mjs` wiederverwenden.
   - Oder ein Performance-Trace: läuft die Animation im Compositor oder im Hauptthread, Paint und Layout je Bild.
   - Jede Aussage mit Zahlen.
2. **Kleinste Behebung, die das Verhalten aus N1 erhält:**
   - Kopf nur auf gezeichneter Achse;
   - Fangbereich mit rotem Kantenkreuz;
   - genau ein rotes Kreuz am Ursprung der Entfernungsskala;
   - Spiegel für „ruhig“, reduziert, Druck und erzwungene Farben.
   - Zum Beispiel weniger Zeitstrahlen, Bereiche ohne `calc` mit `vh`, Animationen, die im Compositor laufen (`transform`/`opacity` an Ebenen mit `will-change`), oder ein einfacherer Mechanismus mit demselben Bild.
   - Kein JavaScript je Bild; wenn unvermeidbar, dann über `src/lib/motion/takt.ts`.
3. **Ziel:** verworfene Bilder ≤ 1 % (Median aus 3, zweimal im Wechsel vorher/nachher gemessen); LoAF wie vorher.
   - Das Bild der Seite bleibt gleich: Pixelvergleich der Ruhezustände 0 gegen 8bcca3c8, Bewegung an nach dem Durchscrollen ohne sichtbare Änderung.

## Nicht ändern
- Wortlaut, Einwilligung, Rechtstexte, Firmendaten, Formulare, Kundenstimmen (G8).
- B-01 und `src/components/verlegen/**` (E-078).
- Gestaltung der Startseite außerhalb des Mechanismus.

## Arbeitsweise (verbindlich)
- Arbeitskopie: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/takt/baum` (Abzug von HEAD, `node_modules` verlinkt) und `…/takt/vor` als Vergleich.
- Bauen: Turbopack braucht eine echte Kopie `node_modules_echt`, danach den Verweis wiederherstellen und `.next` löschen.
- Server `npx next start -p 4395 -H 127.0.0.1`, Messungen nur gegen 127.0.0.1:4395 mit `installSperre` und `setzeEinwilligung`.
- Den Server am Ende per Prozessgruppe aus der eigenen PID-Datei beenden, nie mit `pkill -f`.
- Messungen nur, wenn kein anderer Bau auf dem Rechner läuft. Notiere die Uhrzeit jeder Messung.
- Am Ende:
  - `cd …/takt && diff -ruN --exclude=node_modules --exclude=.next --exclude=cache --exclude=next-env.d.ts --exclude=tsconfig.tsbuildinfo vor baum > UM-E3-TAKT.diff`
  - Notiz `UM-E3-TAKT.notiz.md` mit Ursache, Messreihe, Behebung und Restrisiko.
- Prüfen:
  - `npm test`
  - `npx eslint` über die geänderten Dateien
  - `werte.mjs --arbeitsbaum --dateien …` (0 Befunde)
  - `npx tsc` mit vorübergehender `next-env.d.ts`
- Das Repository liest du nur. Kein Git mit Schreibwirkung.

## Rückgabe
Ursache mit Beleg, Messreihe vorher/nachher, Diff-Pfad, Dateien, Prüfzahlen, offene Fragen.
