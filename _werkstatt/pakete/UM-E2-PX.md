Kopfzeile: UM-E2-PX · Rolle Prüfer · Modell Haiku 5.5 · Stufe 1 · Kern-Version 4.0.1 · Kostenklasse M · Schreibrechte: `/home/user/tezgel/_werkstatt/werkzeuge/pixelvergleich.mjs` (neu), `/home/user/tezgel/_werkstatt/berichte/UM-E2-PX.md` (neu) · Umfang: ein Werkzeug für den Pixelvergleich und ein Selbsttest; keine Änderung am Projekt.

## Rollenbriefing
Du bist Prüfer. Du richtest Werkzeuge ein, führst die Prüfungen deiner Stufe aus und berichtest knapp mit Belegpfaden.
Häufige Fehler, die du vermeidest:
- Einzelmessung statt Median.
- Deuten statt berichten.
- Über die Stufe hinaus prüfen.

## Aufgabe in einem Satz
Baue `_werkstatt/werkzeuge/pixelvergleich.mjs`. Es nimmt die zwölf Hauptansichten in vier Größen auf zwei Servern auf, „vorher“ und „nachher“, vergleicht sie Pixel für Pixel mit `pixelmatch` und schreibt je Ansicht und Größe Zahlen und Differenzbilder.

## Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js, React und Tailwind 4 gebaut, wird über Vercel ausgeliefert und steht nach diesem Lauf auf dem neuesten stabilen Stand ihres Stacks.
2. Die Seite hat 202 Adressen – 168 Seiten, 2 Weiterleitungen und 32 dauerhaft entfernte –: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Prüfstein bleibt eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will: Sie versteht jede Seite ohne Hilfe, und jede Bewegung ist für sie verständlich, abschaltbar und nie im Weg.
4. Die Leitidee „Klar verlegt“ trägt den Seitenwechsel Fliese für Fliese, den Eingang an der Schnur, die rote Laserlinie als Leitfaden und das Fugenkreuz als Cursor; echte Fotos zeigen die Arbeit.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.

## Kern-Auszug (unveränderlich)
- K-004: Die Werkzeuge liegen in `_werkstatt/werkzeuge/` und teilen `lib.mjs` (BASE, Geräte, Anfragesperre, Einwilligung, Durchscrollen, Bereitschaft).
- Kriterium Z-03: Jeder Pixelvergleich endet ohne unerklärte Abweichung. Dein Werkzeug muss deshalb Abweichungen zählbar und sichtbar machen. Erklären musst du sie nicht.

## Maßstab und Muster
- Muster für Aufnahme und Protokoll: `_werkstatt/werkzeuge/bildsatz.mjs`, Zeilen 1 bis 80, und die Hilfsfunktionen aus `_werkstatt/werkzeuge/lib.mjs`:
  - Einwilligung abgelehnt.
  - `reducedMotion: 'reduce'`, DPR 1, Anfragesperre.
  - Erst durchscrollen und `bereit()` abwarten, dann aufnehmen.
- Vergleich: `pixelmatch` 8.0.0 und `pngjs` 7.0.0. Beide sind in `_werkstatt/werkzeuge/package.json` schon installiert. Lies die Schnittstelle in `_werkstatt/werkzeuge/node_modules/pixelmatch/index.js` und `README.md`.
- Hauptansichten: `_werkstatt/HAUPTANSICHTEN.json`, Feld `hauptansichten[].pfad`, 12 Einträge.
- Die vier Größen: `m390` (390 × 844), `t768` (768 × 1024), `d1440` (1440 × 900), `d1920` (1920 × 1080). Die Namen kommen aus `ANSICHTEN` in `lib.mjs`.
- Maßstab für „fertig“: Derselbe Server gegen sich selbst ergibt 0 abweichende Pixel in allen 48 Paaren.

## Grenzen
- Schreibe nur die zwei Dateien aus der Kopfzeile.
- Kein git, kein `npm install`, keine Änderung an `lib.mjs` oder anderen Werkzeugen. Brauchst du dort etwas, melde es unter GEMEINSAME DATEIEN.
- Starte und stoppe keine Server. Es läuft ein Produktionsserver auf `http://127.0.0.1:4311`; nur ihn benutzt du.
- Nur `127.0.0.1` als Ziel: `assertLocal` aus `lib.mjs` muss greifen.
- Keine echten Formularsendungen. Die Anfragesperre aus `lib.mjs` bleibt aktiv.
- Arbeitsdateien nur unter `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/um-e2-px/`.
- Voraussetzung für jeden Lauf: `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, Aufruf aus `_werkstatt/werkzeuge/`.

## Schritte
1. Lies `bildsatz.mjs` (Zeilen 1 bis 80) und in `lib.mjs` die Exporte, die `bildsatz.mjs` importiert.
2. Lege `pixelvergleich.mjs` an:
   - Kopfkommentar wie in `bildsatz.mjs`: Zweck, Protokoll, Nutzung, Ausgabe, Exit-Codes.
   - Aufruf:
     ```
     node pixelvergleich.mjs --vorher URL --nachher URL --satz NAME [--hauptansichten | --seiten /a,/b] [--geraete m390,t768,d1440,d1920] [--ziel DIR] [--schwelle 0.1]
     ```
     Standard für `--geraete` sind diese vier Größen; Standard für `--schwelle` ist 0.1 (Farbschwelle von pixelmatch).
   - Je Seite und Größe auf beiden Servern dasselbe Protokoll wie `bildsatz.mjs`:
     - Ausschnitte an denselben festen Positionen k × Viewporthöhe, k = 0 bis höchstens 11, als PNG.
     - Animationen und Caret anhalten: `animations: 'disabled'`, `caret: 'hide'` bei `page.screenshot`.
   - Je Ausschnitt `pixelmatch` mit der Schwelle. Bei mehr als 0 abweichenden Pixeln das Differenzbild als PNG speichern.
   - Weichen die Seitenhöhen ab, vergleiche nur die gemeinsamen Ausschnitte. Vermerke beide Höhen und `hoehe_abweichend: true`.
   - Ausgabe `<ziel>/pixelvergleich.json`. Je Paar:
     - `seite`, `geraet`, `hoehe_vorher`, `hoehe_nachher`, `hoehe_abweichend`.
     - `ausschnitte`: Liste aus `{ k, pixel_abweichend, anteil }`.
     - `summe_abweichend`.
   - Zusammenfassung auf stdout: Zahl der Paare, Paare mit Abweichung und die fünf größten mit Anteil.
   - Exit-Codes: 0 ohne Abweichung, 1 mit Abweichung, 2 bei Laufzeitfehler.
   - Standardziel: `_werkstatt/cache/pixelvergleich/<satz>/`.
3. Selbsttest A: einmal mit
   ```
   --vorher http://127.0.0.1:4311 --nachher http://127.0.0.1:4311 --satz selbsttest --hauptansichten --ziel <scratch>/um-e2-px/selbsttest
   ```
   Erwartet: 48 Paare, alle mit 0 abweichenden Pixeln.
4. Weicht in Schritt 3 ein Paar ab, suche die Ursache am Differenzbild. Beispiele: Uhrzeit, Zufall, laufende Animation, ein Bild, das noch lädt.
   - Behebe sie nur im Werkzeug, etwa durch Warten auf `document.fonts.ready` und auf geladene Bilder, oder durch Maskieren einer genau benannten Stelle mit `mask`.
   - Wiederhole Schritt 3. Höchstens drei Läufe; was dann noch abweicht, gehört unter OFFENE FRAGEN.
5. Selbsttest B: Prüfe, dass das Werkzeug eine echte Änderung findet. Vergleiche dazu `--seiten /` gegen `--seiten /` mit einer anderen Größe pro Server.
   - Geht das mit dem Aufruf nicht, simuliere die Änderung im Werkzeug über eine Testoption `--selbsttest-stoerung`. Sie färbt im Nachher-Ausschnitt k = 0 ein Rechteck von 10 × 10 Pixeln.
   - Erwartet: genau 100 abweichende Pixel in diesem Ausschnitt.
6. Schreibe den Bericht.

## Schnellprüfung und Selbstprüfung
- `node --check pixelvergleich.mjs` ist grün.
- Selbsttest A: 48 Paare gezählt, 0 Abweichung, oder die Abweichung ist unter OFFENE FRAGEN benannt.
- Selbsttest B: 100 Pixel.
- Nur die zwei erlaubten Dateien geändert: Prüfe das mit `git -C /home/user/tezgel status --short`. Nur lesen, nichts stagen.

## Ausgabeformular (Bericht `_werkstatt/berichte/UM-E2-PX.md`, höchstens 600 Wörter)
- GEÄNDERTE DATEIEN
- WAS UND WARUM
- GEMEINSAME DATEIEN: gewünschte Änderungen als exakte Liste, sonst „keine“.
- PRÜFUNG UND ERGEBNIS: Befehle, Zahl der Paare, Abweichungen, Laufzeit in Minuten.
- BILDBELEGE: Pfade zu einem Differenzbild aus Selbsttest B.
- OFFENE FRAGEN

Letzte Zeile: `=== ENDE UM-E2-PX · BEREIT ZUR RÜCKGABE ===`

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.
