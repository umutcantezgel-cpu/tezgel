# E4-W0-LEISTUNG-3 · Bytes vor dem LCP (mobil, simuliert)

Auftraggeber im Lauf: Orchestrator. Ausführung: ein Versuchsleiter, danach ein zweiter Prüfer, der die empfohlene Kombination unabhängig nachmisst. Ergebnis sind gemessene Wirkungen je Änderung und ein Diff gegen den Ausgang. Am Repository wird nichts geändert; das macht danach der Orchestrator.

## Was wir aus E4-W0-LEISTUNG-2 wissen (E-064)
- Werkzeuge und Rohdaten liegen unter `$SCRATCH/e4l2-werkzeug/` (`mess.sh`, `lantern.mjs`, `chunkmap.mjs`, `pool.mjs`, `funktion.mjs`, `ablation.cjs`) und `$SCRATCH/e4-leist-2/` (`klassen.txt`, `lantern-v0-*.txt`, `zusammenfassung.json`). `$SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`.
- Der simulierte LCP fällt je Seite in drei Klassen (auf `/bad` rund 2.865, 3.150 und 3.460 ms). In welche Klasse ein Lauf fällt, entscheidet ein Wettlauf: Werden React DOM (71 KB) und die Next-Laufzeit (45 KB) vor dem beobachteten Malen des LCP (rund 200 bis 300 ms) ausgewertet, gehören sie zum Graphen.
- In der tiefen Klasse ist die Simulation nur durch die Bandbreite begrenzt. Der LCP ist das Ende des letzten Downloads vor dem beobachteten LCP: Dokument rund 910 ms, danach etwa 224 KB, die sich die Leitung teilen. Das sind etwa 9 ms je KB (`lantern-v0-bad.txt`: Archivo endet bei 2.873 ms = LCP).
  - Archivo 57,9 KB
  - LCP-Foto 22,9 KB
  - CSS 21,1 KB
  - Logo in zwei Größen, 6,4 und 10,1 KB
  - Sprite 3,2 KB
  - Plex Mono 14,6 KB
  - neun Skriptstücke, zusammen rund 87 KB
- Bis 2.500 ms fehlen in der tiefen Klasse rund 45 KB, in der hohen deutlich mehr.
- Inline-CSS, Schrift ohne Vorladen, Platzhalter, Klassenketten und die Karussell-Hülle brachten nichts oder schadeten.

## Ziel
Die Bytes, die auf den Seiten mit Bild als LCP (`/`, `/bad`, `/bad/badsanierung`) und mit Text als LCP (`/fliesen`, `/blog`) vor dem LCP geladen werden, um mindestens 45 KB komprimiert senken. Verhalten und Darstellung bleiben gleich. Jede Änderung wird einzeln gegen V0 gemessen, je mindestens 9 Läufe abwechselnd mit V0. Ausgewertet wird innerhalb der Klassen (`klassen.txt`), zusätzlich mit der Lantern-Zerlegung eines Laufs.

## Kandidaten (prüfen, einzeln messen, begründet auslassen)
1. **Logo w=640 vor dem LCP.** Finden, welches Element es anfordert (vermutlich das Logo auf der Wand im Seitenwechsel B-01, `Verlegen.tsx`), und ob es später geladen werden kann. Bedingung: Beim ersten Seitenwechsel steht das Logo sofort auf der Wand, zum Beispiel weil es bei der ersten Zeige-, Tipp- oder Tastenbewegung oder nach `load` geholt wird. Das Logo selbst bleibt unverändert (G8).
2. **Skriptstücke vor dem LCP.** Mit Quellkarten (Build mit `productionBrowserSourceMaps` nur in der Kopie) und `chunkmap.mjs` bestimmen, welche Module die Stücke füllen. Bekannt: `1-5grn…` hat CookieConsent mit `cities.ts` und `lib/config.ts`; `0itv1…` hat Karussell, den next/image-Client und `company.js`; `3zdo8…` ist auf `/bad` der Bad-Funnel; lucide-Symbole stehen in mehreren Stücken.
   - Erlaubt sind Änderungen, die nur Importe verschlanken: Daten als Eigenschaft vom Server statt ganzer Konfiguration im Client, ein schmaler Import statt einer Sammeldatei.
   - Das Verhalten der Einwilligung bleibt unberührt (G8): Erscheinen, Zeitpunkt, Texte, Knöpfe, Speicherung. Auch die Symbole im Banner bleiben gleich.
   - Pflichtfelder und Empfänger der Formulare bleiben unberührt.
3. **Archivo als Teilmenge.**
   - Zeichensatz aus allen Texten der Seite: `glyphen.mjs` mit `$SCRATCH/venv-glyphen` (fonttools und brotli sind dort installiert). Dazu Lateinisch-1 und Lateinisch-Erweitert-A für Namen in Formularen und Stimmen.
   - Die Achsen wght 400 bis 800 und wdth 74 bis 100 bleiben, ebenso Kerning und Ligaturen.
   - Größe vorher und nachher angeben, Glyphenabdeckung prüfen (fehlende Zeichen = 0) und Darstellung vergleichen.
   - Nur in der Kopie. Die Lizenz OFL 1.1 erlaubt eine Teilmenge, der Name bleibt.
4. **Plex Mono als Teilmenge**, nur wenn die Abdeckung der Texte in Mono (Rufnummern, Etiketten) vollständig bleibt.
5. **Weiteres** aus der Lantern-Zerlegung, wenn es ohne Verhaltensänderung geht (zum Beispiel ein Bild vor dem LCP, das unten auf der Seite steht).

## Regeln
- Wie `pakete/E4-W0-LEISTUNG-2.md`.
  - Nur Kopien unter `$SCRATCH/e4-leist-3/`. Ausgang ist `$SCRATCH/e4-leist-2/v0` (Stand 5ef34982, gebaut).
  - Nur Port 4313, eigene Prozessgruppe beenden. 4311 und 4320 nicht anfassen.
  - Während einer Messreihe läuft nichts anderes. Bildprobe vor jeder Reihe.
- Kein Schreiben im Repository, kein Git-Befehl, der schreibt. Keine neue Abhängigkeit im Repository.
- G7: nichts erkennt Lighthouse oder Prüfwerkzeuge, um sich anders zu verhalten. Nicht erlaubt ist auch, den beobachteten LCP künstlich zu verschieben.
- Für jede Änderung prüfen, was sich für Nutzer ändert: Playwright mobil und Desktop mit `funktion.mjs`. B-01, Karussell, Einwilligung, Formular absenden mit abgefangenem Ziel (G5), keine Konsolenfehler.
- Plattenplatz: Kopien nach der Messung löschen. Pro Kopie rund 1,3 GB.

## Rückgabe
Je Änderung:
- Dateien und Diff in Kurzform
- Bytes vor dem LCP vorher und nachher (komprimiert)
- Messwerte je Seite: Median, Klassen-Mittel, n
- Lantern-Zerlegung eines Laufs
- Nebenwirkungen und Funktionsprüfung

Am Ende die empfohlene Kombination als `$SCRATCH/e4-leist-3/empfehlung.diff` gegen 5ef34982 und für die Schrift die Datei als `$SCRATCH/e4-leist-3/archivo-teilmenge.woff2`. Zuletzt die unabhängige Nachmessung: frische Kopien A (Ausgang) und B (Empfehlung), 9 Läufe je Seite, abwechselnd.
