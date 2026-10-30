# UM-E4-NBSP · Geschützte Leerzeichen vor Einheiten in den Inhaltsdateien · Rolle Baumeister (Arbeitskopie) · Modell Haiku · Kern-Version 4.4.1

Grundlage: die PLAN-Zeile UM-E4-NBSP und ENTSCHEIDUNGEN E-067 (Mikrotypografie: „geschütztes Leerzeichen vor Einheiten, 101 Stellen, nicht in Kundenstimmen“). Ziel: Zahl und Einheit brechen im sichtbaren Text nie auseinander („120 / cm“, „2 / m²“, „10 / Jahre“).

## Entscheidungen des Orchestrators (verbindlich)
1. **Dateien:** nur die Inhaltsdateien `src/inhalte/*.ts` aus der PLAN-Zeile: `bad.ts`, `bad-badsanierung.ts`, `balkon-terrasse.ts`, `barrierefreies-bad.ts`, `blog.ts`, `fliesen.ts`, `galerie.ts`, `kontakt.ts`, `leistungen.ts`, `orte.ts`, `referenzen.ts`, `start.ts`, `ueber-uns.ts`.
   - Nicht `src/inhalte/meta/*`: Titel und Beschreibungen brechen nicht um, und die Beschreibung muss der des Seitenknotens gleichen (jsonld.mjs Regel 5).
   - Nicht `src/config/*` (gemeinsame Dateien): Diese Stellen meldest du nur als Liste (Datei, Zeile, Ausschnitt). Der Orchestrator überträgt sie.
   - Nicht `src/config/reviews.js` und nichts aus Kundenstimmen (G8).
2. **Was eine Stelle ist:** eine Ziffernfolge (auch mit Komma, Punkt, Bindestrich oder „bis“-Spanne wie „2 bis 3“, dann nur vor der Einheit) und danach ein normales Leerzeichen und eine Einheit:
   - Maße: `mm`, `cm`, `m`, `m²`, `m³`, `km`, `kg`, `t`, `l`;
   - Zeit und Anzahl: `Jahre`, `Jahren`, `Monate`, `Wochen`, `Tage`, `Tagen`, `Stunden`, `Minuten`, `Std.`;
   - Werte: `%`, `€`, `Euro`, `°C`, `Grad`.
   - Ersetze genau dieses eine Leerzeichen durch U+00A0, im Quelltext als Escape ` ` geschrieben (sichtbar im Diff).
   - Keine anderen Zeichen ändern. Keine Stellen in URLs, `href`, Kennungen, Dateinamen, Bild-`alt`-Texten mit Dateibezug oder in `[[id|…]]`-Kennungen (der Teil nach dem Strich darf).
   - „DIN 18534“ und ähnliche Normnummern nicht anfassen; das erledigen `zusammen()` und `Fachwort`.
3. **Wortlaut:** Ersetzt man jedes U+00A0 wieder durch ein Leerzeichen, ist jede Datei Zeichen für Zeichen gleich wie vorher. Prüfe das mit einem kleinen Skript (Vergleich vor/baum) und lege die Ausgabe in die Notiz.
4. **Zählung:** In der Notiz je Datei die Zahl der Stellen und die Gesamtzahl. Dazu die Liste der Stellen in `src/config/*` (nur gemeldet, nicht geändert).

## Nicht ändern
- Wortlaut aller Texte, H1 A-1/A-2, Kundenstimmen, Bewertungszahlen, Einwilligung, Rechtstexte, Firmendaten, Formulare (G8). B-01 (E-078).
- Keine Komponente, kein CSS, keine Tests.

## Arbeitsweise (verbindlich)
- Arbeitskopie: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/nbsp/baum` (Abzug von HEAD, `node_modules` verlinkt).
- Vor dem ersten Edit `vor` anlegen:
  `mkdir -p …/nbsp/vor && (cd …/nbsp/baum && tar --exclude=./node_modules --exclude=./.next -cf - .) | (cd …/nbsp/vor && tar -xf -)`
- Am Ende:
  - `cd …/nbsp && diff -ruN --exclude=node_modules --exclude=.next --exclude=cache --exclude=next-env.d.ts --exclude=tsconfig.tsbuildinfo vor baum > UM-E4-NBSP.diff`
  - Notiz `UM-E4-NBSP.notiz.md`: Zählung, Wortlaut-Vergleich, Liste `src/config/*`, Prüfzahlen.
- Prüfen in der Arbeitskopie: `npm test`, `npx eslint`, `npx tsc --noEmit` mit vorübergehender `next-env.d.ts`.
- Bauen und Bildschirmfotos nur, wenn das Workflow-Briefing den Rechner freigibt: eine echte Kopie `node_modules_echt` für Turbopack, danach Verweis zurück und `.next` löschen; Server `npx next start -p 4440 -H 127.0.0.1`, per Prozessgruppe aus der eigenen PID-Datei beenden; Bilder als PNG mit `installSperre` und `setzeEinwilligung` aus `_werkstatt/werkzeuge/lib.mjs`. Zeige bei 200 % Schrift auf m390 je eine Stelle aus `/bad/badsanierung` und `/balkon-terrasse` (Zahl und Einheit in einer Zeile).
- Das Repository liest du nur. Kein Git mit Schreibwirkung.

## Rückgabe
Prüfzahlen, Diff-Pfad und Dateien, Zählung je Datei, Wortlaut-Vergleich, Liste `src/config/*`, Bildpfade, offene Fragen.
