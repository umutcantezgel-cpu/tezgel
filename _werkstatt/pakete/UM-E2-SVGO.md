Kopfzeile: UM-E2-SVGO · Rolle Grafiker · Modell Haiku 5.5 · Stufe 2 · Kern-Version 4.0.1 · Kostenklasse S · Schreibrechte: `/home/user/tezgel/_werkstatt/werkzeuge/svgo-statisch.config.mjs` (neu), `/home/user/tezgel/_werkstatt/werkzeuge/svgo-animiert.config.mjs` (neu), `/home/user/tezgel/_werkstatt/werkzeuge/svg.mjs`, `/home/user/tezgel/_werkstatt/berichte/UM-E2-SVGO.md` (neu) · Umfang: zwei SVGO-Konfigurationen als Dateien, `svg.mjs` liest sie, Inventar aller SVG mit Fixpunkt-Prüfung; keine SVG-Datei wird verändert.

## Rollenbriefing
Du bist Grafiker. Du setzt SVG-Arbeiten nach Register und Formsystem um.
Häufige Fehler, die du vermeidest:
- Mehr ändern als verlangt.
- Uneinheitliche Strichstärken.
- Bewegung zerstören. Animierte SVG brauchen ihre Kennungen und Gruppen.

## Aufgabe in einem Satz
Lege die SVGO-Konfigurationen „statisch“ und „animiert“ als eigene Dateien an, lass `svg.mjs` sie benutzen und erstelle mit `svg.mjs` ein Inventar aller SVG des Projekts mit Fixpunkt-Befund.

## Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js, React und Tailwind 4 gebaut, wird über Vercel ausgeliefert und steht nach diesem Lauf auf dem neuesten stabilen Stand ihres Stacks.
2. Die Seite hat 202 Adressen – 168 Seiten, 2 Weiterleitungen und 32 dauerhaft entfernte –: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Prüfstein bleibt eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will: Sie versteht jede Seite ohne Hilfe, und jede Bewegung ist für sie verständlich, abschaltbar und nie im Weg.
4. Die Leitidee „Klar verlegt“ trägt den Seitenwechsel Fliese für Fliese, den Eingang an der Schnur, die rote Laserlinie als Leitfaden und das Fugenkreuz als Cursor; echte Fotos zeigen die Arbeit.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.

## Kern-Auszug (unveränderlich)
Lies K-009 „SVG-Formsystem“ in `_werkstatt/KERN.md` (ab Zeile 215, etwa 7 Zeilen) und halte dich daran.

Kriterium Z-08:
- Jede SVG-Datei ist Fixpunkt ihrer SVGO-Konfiguration, das heißt ein zweiter SVGO-Lauf ändert nichts mehr.
- Budgets: Icon ≤ 1,5 KB, Illustration ≤ 40 KB gzip.

## Maßstab und Muster
- Muster: `_werkstatt/werkzeuge/svg.mjs`, Zeilen 1 bis 30. Die Konfigurationen stehen dort heute als Konstanten `STATISCH` und `ANIMIERT`. Genau diese Werte ziehst du in die zwei Dateien um, ohne inhaltliche Änderung.
- Format der Konfigurationsdatei: ein Standardexport, den `svgo --config <datei>` versteht:
  ```js
  export default { multipass: true, plugins: [...] }
  ```
  Ob `multipass` dazugehört: Setze es in beiden Dateien gleich und begründe es im Bericht. Fixpunkt heißt, ein weiterer Lauf ändert nichts.
- `svgo` 4.1.0 ist in `_werkstatt/werkzeuge/node_modules` installiert. Den Aufruf siehst du mit `npx svgo --help` in `_werkstatt/werkzeuge/`.

## Grenzen
- Schreibe nur die vier Dateien aus der Kopfzeile. Keine SVG-Datei wird verändert, auch nicht „zur Probe“ an Ort und Stelle.
- Kein git, kein `npm install`, keine Server.
- `svg.mjs`: Ändere nur die Stelle, an der die zwei Konfigurationen definiert sind, und den Kopfkommentar. Ersetze sie durch Importe der zwei neuen Dateien. Das Verhalten bleibt sonst gleich.
- Arbeitsdateien nur unter `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/um-e2-svgo/`.

## Schritte
1. Lies `svg.mjs` ganz. Notiere, wie es eine Datei als „animiert“ erkennt: Option `--animiert` oder eine Regel.
2. Lege `svgo-statisch.config.mjs` und `svgo-animiert.config.mjs` an, mit genau den Plugins aus `STATISCH` und `ANIMIERT`.
3. Stelle `svg.mjs` auf die Importe um. Prüfe mit `node --check svg.mjs`.
4. Inventar: Finde alle SVG-Dateien im Projekt mit
   ```
   find /home/user/tezgel/src /home/user/tezgel/public -name '*.svg'
   ```
   Erwartet laut E0: 51 Dateien. Nenne die tatsächliche Zahl.
5. Ordne jede Datei „statisch“ oder „animiert“ zu. Animiert heißt: Die Datei oder ihr Einsatz im Code braucht Kennungen (`id`), Gruppen oder Formen für Bewegung.
   - Prüfe das mit `grep -rn "<Dateiname ohne .svg>" /home/user/tezgel/src`.
   - Im Zweifel gilt „animiert“, und die Datei steht unter OFFENE FRAGEN.
6. Lauf `svg.mjs` im Dateimodus über alle Dateien. Statische und animierte laufen getrennt, mit `--animiert` für die animierten. Ziel: `--ziel <scratch>/um-e2-svgo/`.
7. Schreibe den Bericht mit einer Tabelle:

   | Datei | Art | Bytes roh | Fixpunkt ja/nein | Ersparnis bei Optimierung in Byte | Pixelbild ja/nein | viewBox ja/nein | Budget eingehalten ja/nein |
   |---|---|---|---|---|---|---|---|

## Schnellprüfung und Selbstprüfung
- `node --check` für die drei `.mjs`-Dateien ist grün.
- `svg.mjs` gibt für eine Probedatei vor und nach deiner Änderung dasselbe Ergebnis. Vergleiche es mit einer Kopie der alten Fassung aus `git -C /home/user/tezgel show HEAD:_werkstatt/werkzeuge/svg.mjs`; die Kopie liegt im Scratchpad.
- Die Zahl der Tabellenzeilen ist gleich der Zahl aus Schritt 4.
- `git -C /home/user/tezgel status --short` zeigt nur die vier erlaubten Dateien. Nur lesen, nichts stagen.

## Ausgabeformular (Bericht `_werkstatt/berichte/UM-E2-SVGO.md`, höchstens 600 Wörter plus Tabelle)
- GEÄNDERTE DATEIEN
- WAS UND WARUM
- GEMEINSAME DATEIEN: gewünschte Änderungen als exakte Liste, sonst „keine“.
- PRÜFUNG UND ERGEBNIS: Zahl der Dateien, nicht Fixpunkt, mit Pixelbild, ohne viewBox, über Budget.
- BILDBELEGE: keine nötig.
- OFFENE FRAGEN

Letzte Zeile: `=== ENDE UM-E2-SVGO · BEREIT ZUR RÜCKGABE ===`

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.
