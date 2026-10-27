Kopfzeile: UM-E3-SVG · Rolle Grafiker · Modell Haiku 5.5 · Stufe 2 · Kern-Version 4.0.2 · Kostenklasse M · Schreibrechte: `src/lib/formulare/useAnfrageFunnel.ts`, `src/components/icons/sprite.svg`, `src/components/icons/namen.ts`, `src/components/icons/zuordnung.ts`, `src/components/icons/svg/*`, `src/components/locations/RouteVisualization.tsx`, `public/images/logo/tezgel-mark.svg`, `_werkstatt/berichte/UM-E3-SVG.md` (neu; diese Berichtsdatei ist ausdrücklich dein Schreibrecht) · Umfang: eine Icon-Familie, SVGO-Fixpunkte, nur Grafik- und Icon-Dateien.

## Rollenbriefing
Du bist Grafiker. Du setzt SVG-Arbeiten nach Register und Formsystem um.
Häufige Fehler, die du vermeidest:
- Mehr ändern als verlangt.
- Uneinheitliche Strichstärken.
- Ein sichtbares Bild verändern, ohne es zu belegen.

## Aufgabe in einem Satz
Bringe alle SVG-Dateien des Projekts auf eine Icon-Familie und zum SVGO-Fixpunkt, ohne dass sich ein sichtbares Bild ändert. Melde, was in der gemeinsamen Konfiguration ersetzt werden muss.

## Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js, React und Tailwind 4 gebaut, wird über Vercel ausgeliefert und steht nach diesem Lauf auf dem neuesten stabilen Stand ihres Stacks.
2. Die Seite hat 202 Adressen – 168 Seiten, 2 Weiterleitungen und 32 dauerhaft entfernte –: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Prüfstein bleibt eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will: Sie versteht jede Seite ohne Hilfe, und jede Bewegung ist für sie verständlich, abschaltbar und nie im Weg.
4. Die Leitidee „Klar verlegt“ trägt den Seitenwechsel Fliese für Fliese, den Eingang an der Schnur, die rote Laserlinie als Leitfaden und das Fugenkreuz als Cursor; echte Fotos zeigen die Arbeit.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.

## Kern-Auszug (unveränderlich)
Lies K-009 in `_werkstatt/KERN.md` (Abschnitt „K-009 SVG-Formsystem“, etwa 8 Zeilen) und halte dich daran. Kurz:
- **Eine Icon-Familie:** eigenes Sprite, Raster 24, Strich 1,5, Enden `square`, Ecken `miter`, `currentColor`.
- **Fixpunkt:** SVGO ändert die Datei nicht mehr. Maßgeblich ist die Spalte „optimiert“ in `svg.mjs`.
  - Statisch: `_werkstatt/werkzeuge/svgo-statisch.config.mjs`.
  - Animiert, nur für das Sprite: `svgo-animiert.config.mjs`. Sie behält `<symbol>` und alle Kennungen.
- **Budget:** Icon ≤ 1,5 KB, beim Sprite je Symbol.
- **Logo:** Das sichtbare Logo bleibt unverändert (UNANTASTBAR).

## Maßstab und Muster
- Muster für die Zuordnung lucide → eigene Familie: `src/components/icons/zuordnung.ts` (Tabelle `LUCIDE_ZUORDNUNG`, mit Kontextregeln in den Kommentaren).
- Sprite-Erzeugung: `node _werkstatt/werkzeuge/sprite.mjs`. Es schreibt `sprite.svg` und `namen.ts` aus `src/components/icons/svg/*.svg`. Lies den Kopfkommentar.
- Prüfung: `node _werkstatt/werkzeuge/svg.mjs --dateien <pfad> [--animiert]` aus `_werkstatt/werkzeuge/`. Bericht UM-E2-SVGO als Ausgangslage: `_werkstatt/berichte/UM-E2-SVGO.md`.

## Grenzen
- Laufzeit: Vor jedem Befehl
  ```
  export PATH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/node-lts/aktuell/bin:$PATH
  ```
- Kein git außer `git status --short` und `git diff` (lesen). Du committest und pushst nie.
- Gemeinsame Dateien schreibt nur der Orchestrator. Du lieferst die gewünschten Änderungen als exakte Liste unter GEMEINSAME DATEIEN:
  - `src/config/blog.js`, `src/config/company.js`
  - `package.json`, Lockfile
  - `next.config.ts`
  - `public/images/logo/tezgel-logo.svg`, `public/images/logo/tezgel-logo-dark.svg`
- Kein `npm run build`, kein `next dev`, keine Server, kein Lighthouse. Auf demselben Rechner laufen zeitkritische Messungen.
  - Erlaubt sind `node`-Skripte und `npx svgo`. Typecheck und Lint nur nach Schritt 8.
- Kein sichtbares Bild ändern. Jede geänderte SVG-Datei wird vor und nach der Änderung gerastert und Pixel für Pixel verglichen (Schritt 5). Abweichung 0, sonst zurücksetzen und melden.
- Arbeitsdateien nur unter `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/um-e3-svg/`. Sichere jede Datei vor der Änderung dort.

## Schritte
1. **Bestand:**
   - Lauf `svg.mjs` über `src/components/icons/svg` (statisch), über `src/components/icons/sprite.svg` (`--animiert`) und über `public/images/logo/tezgel-mark.svg` (statisch).
   - Notiere jede Datei mit dem Befund `nicht_optimiert`. Laut U07 sind es fünf Icons: pause, verband-diagonal, verband-fischgraet, verband-halb, verband-wild. Dazu kommen das Sprite und tezgel-mark.
2. **Icons:** Optimiere jede der nicht optimierten Icon-Dateien mit
   ```
   npx svgo --config svgo-statisch.config.mjs <datei>
   ```
   aus `_werkstatt/werkzeuge/`. Danach `svg.mjs` auf die Datei: Erwartet ist „ohne Befund“. Strich-Attribute (Breite 1,5, `square`, `miter`, `currentColor`) müssen erhalten bleiben; prüfe das mit `grep`.
3. **Sprite:** Erzeuge es mit `node _werkstatt/werkzeuge/sprite.mjs` neu.
   - Optimiere es dann mit `svgo-animiert.config.mjs`. Prüfe, dass 47 `<symbol>` mit denselben `id` bleiben (`grep -c '<symbol'`).
   - Danach `svg.mjs --animiert`: Erwartet ist „ohne Befund“.
   - Bleibt „nicht_optimiert“, weil `sprite.mjs` anders formatiert als SVGO: Optimiere das Sprite als letzten Schritt mit SVGO und melde, dass `sprite.mjs` künftig SVGO anwenden sollte (gewünschte Änderung an `_werkstatt/werkzeuge/sprite.mjs` als Liste).
4. **lucide in `src/lib/formulare/useAnfrageFunnel.ts`:**
   - Ersetze jeden Import aus `lucide-react` durch den Namen aus `LUCIDE_ZUORDNUNG` als Zeichenkette, zum Beispiel `icon: 'bad'` statt `icon: Bath`. Fehlt ein Name in der Tabelle, ergänze ihn in `zuordnung.ts` mit Begründung im Kommentar.
   - Prüfe vorher mit `grep -rn "\.icon\b" src`, wer die Felder liest. Liest eine lebende Stelle das Feld als Komponente (`<x.icon />`), setze die Stelle auf `<Icon name={x.icon} />` aus `src/components/icons/Icon.tsx` um. Ist sie nicht in deinen Schreibrechten, melde sie.
   - Ergebnis: `grep -rn "lucide-react" src` zeigt nur noch `src/config/blog.js` und `src/config/company.js`.
   - Für diese beiden Dateien lieferst du unter GEMEINSAME DATEIEN je Zeile alt → neu (Importzeile entfernen, Feldwerte als Namen).
5. **Gleichbild-Prüfung** für jede geänderte SVG-Datei, aus `_werkstatt/werkzeuge/`:
   - Raster vorher und nachher mit `sharp` auf 96 × 96 px PNG. Beim Sprite je Symbol ein kleines Hülldokument mit `<svg viewBox="0 0 24 24"><use href="#id"/>…` und dem Symbol darin.
   - Vergleiche mit `pixelmatch` (Schwelle 0). Erwartet: 0 Pixel je Datei bzw. je Symbol.
   - Notiere die Zahl der geprüften Bilder.
6. **Logo-Dateien:**
   - `tezgel-mark.svg`: optimieren wie in Schritt 2, mit Gleichbild-Prüfung.
   - `tezgel-logo.svg` und `tezgel-logo-dark.svg`: nicht anfassen. Sie betten je ein PNG von 396 KB ein und werden im Code nicht verwendet.
     - Melde unter GEMEINSAME DATEIEN den Vorschlag: entfernen und die beiden Adressen mit 308 auf `tezgel-logo.png` bzw. `tezgel-logo-dark.png` weiterleiten.
     - Prüfe vorher mit `grep -rn` im ganzen Repository ohne `node_modules`, dass keine Datei sie nennt.
7. `RouteVisualization.tsx`: Prüfe die Inline-SVGs auf viewBox und Zugänglichkeit:
   - dekorativ: `aria-hidden="true"` und `focusable="false"`;
   - bedeutungstragend: `role="img"` und `<title>` bzw. `aria-label`.
   Ergänze nur, was fehlt, ohne Form oder Farbe zu ändern.
8. **Am Ende** je einmal `npm run typecheck` und `npm run lint` in `/home/user/tezgel` (Exit 0), aber nur, wenn `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/um-e2-b/messen.log` die Zeile `=== FERTIG` enthält. Sonst lässt du beide weg und schreibst „Typecheck und Lint nicht gelaufen (Messreihe aktiv)“ in den Bericht; der Orchestrator holt sie nach.

## Schnellprüfung und Selbstprüfung
- `svg.mjs` über alle geänderten Dateien ohne Befund. Gleichbild-Prüfung 0 Pixel. Die Zahlen stehen im Bericht.
- `grep -rn "lucide-react" src` zeigt nur die zwei Config-Dateien.
- `git status --short` zeigt nur Dateien aus deinen Schreibrechten.

## Ausgabeformular (Bericht `_werkstatt/berichte/UM-E3-SVG.md`, höchstens 600 Wörter plus Tabellen)
- GEÄNDERTE DATEIEN
- WAS UND WARUM
- GEMEINSAME DATEIEN (exakte Liste: Datei, Zeile, alt → neu)
- PRÜFUNG UND ERGEBNIS
- BILDBELEGE: Pfade der Vergleichsbilder im Scratchpad
- OFFENE FRAGEN

Letzte Zeile: `=== ENDE UM-E3-SVG · BEREIT ZUR RÜCKGABE ===`

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.
