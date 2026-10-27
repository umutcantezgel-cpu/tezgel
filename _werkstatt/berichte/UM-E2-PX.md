# UM-E2-PX · Pixelvergleich-Werkzeug

## GEÄNDERTE DATEIEN
- `/home/user/tezgel/_werkstatt/werkzeuge/pixelvergleich.mjs` (neu; steht bereits in Commit 8de1ed50, nicht von mir committet)
- `/home/user/tezgel/_werkstatt/berichte/UM-E2-PX.md` (neu)

## WAS UND WARUM
- Das Werkzeug nimmt je Seite und Größe auf zwei Servern nach dem Protokoll von `bildsatz.mjs` auf: Einwilligung abgelehnt, reducedMotion reduce, DPR 1, de-DE, Europe/Berlin, Dev-Overlay aus, `installSperre`, `durchscrollen`, `bereit()`. Ausschnitte k = 0 bis min(12, ceil(Höhe/Viewporthöhe)) − 1 als PNG, mit `animations: 'disabled'` und `caret: 'hide'`.
- Vergleich mit pixelmatch 8, Schwelle 0.1 und `includeAA: true`. Jede Pixelabweichung zählt, auch Kantenpixel. Die Bibliothek setzt standardmäßig `includeAA: false`; hier ist das bewusst strenger.
- Ein Paar gilt als abweichend bei Pixeln > 0, bei unterschiedlicher Höhe oder bei unterschiedlichem HTTP-Status. Bei unterschiedlicher Höhe wird nur über die gemeinsamen Ausschnitte verglichen, mit `hoehe_abweichend: true`.
- Zusätzlich: `--worker` (Standard 2 Paare gleichzeitig), `--selbsttest-stoerung` (Selbsttest B). Im JSON ergänzt: `status_vorher`, `status_nachher`, `anteil`, `abweichend`, `diffbilder`, `dauer_s`, `fehler`.
- Nach Lauf 2 (erster Versuch) habe ich die Fehlerbehandlung beim Schließen des Kontexts korrigiert. Vorher überdeckte ein Schließfehler die eigentliche Ursache. Die Erfolgspfade sind unverändert.
- Schritt 4 entfiel, da Selbsttest A ohne Abweichung lief.

## GEMEINSAME DATEIEN
keine

## PRÜFUNG UND ERGEBNIS
- `node --check pixelvergleich.mjs`: grün.
- Selbsttest A, dreimal, aus `_werkstatt/werkzeuge/` mit `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`: `node pixelvergleich.mjs --vorher http://127.0.0.1:4311 --nachher http://127.0.0.1:4311 --satz selbsttest --hauptansichten --ziel <scratch>/um-e2-px/selbsttest`
  - Lauf 1: 48 Paare, 534 Ausschnitte, 0 abweichende Pixel, keine Höhenabweichung, alle Status 200, 4,16 min, Exit 0.
  - Lauf 2, erster Versuch: 16 Paare ab Paar 33 mit „Target page, context or browser has been closed“, Exit 2. Ursache nicht ermittelt, Speicher war frei (ca. 10 GB). Ungültig, kein Pixelbefund.
  - Lauf 2, Wiederholung: 48 Paare, 0 Pixel, 0 Fehler, 3,25 min, Exit 0.
  - Lauf 3: 48 Paare, 0 Pixel, 0 Fehler, 3,9 min, Exit 0.
  - Laufzeit-Median über die drei gültigen Läufe: 3,9 min.
- Selbsttest B: `--seiten / --selbsttest-stoerung` mit den Standardgrößen. Ein Aufruf mit unterschiedlicher Größe je Server ist nicht vorgesehen, deshalb die Testoption. Ergebnis: 4 Paare mit je genau 100 abweichenden Pixeln in k = 0, Exit 1 wie erwartet. Das Differenzbild enthält 100 rote Pixel.
- `git status --short`: bei meiner letzten Prüfung leer. Die damals offenen Änderungen an `package.json` und `package-lock.json` stammen vom parallelen npm install; ich habe sie nicht angefasst.

## BILDBELEGE
- `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/um-e2-px/selbsttest-b/d1440/start/diff-k00.png` (Selbsttest B, 100 Pixel, 1440 × 900)

## OFFENE FRAGEN
1. Abdeckung: Verglichen werden nur k = 0 bis 11 (höchstens 12 Viewporthöhen), wie im Briefing. Bei 21 von 48 Paaren ist die Seite höher, z. B. `/referenzen` m390 mit 21 204 px. Ungeprüft bleiben 43 901 von 543 882 px (8,1 %); die Höhe wird verglichen. Obergrenze anheben oder so belassen?
2. Zählregel: Eine reine Höhenabweichung macht ein Paar abweichend. Das ist meine Festlegung, bitte bestätigen.
3. `includeAA: true` ist strenger als der Bibliotheksstandard. Bitte bestätigen.
4. Bei einem Chromium-Absturz endet der Lauf mit Exit 2 ohne Wiederholung. Soll das Paar einmal neu gestartet werden?

=== ENDE UM-E2-PX · BEREIT ZUR RÜCKGABE ===
