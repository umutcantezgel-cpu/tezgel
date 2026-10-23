# E0-PRUEF-02b · Rückgabe

## GEÄNDERTE DATEIEN
- /home/user/tezgel/_werkstatt/werkzeuge/lesbarkeit-logik.mjs (neu)
- /home/user/tezgel/_werkstatt/werkzeuge/lesbarkeit.mjs (neu)
- /home/user/tezgel/_werkstatt/werkzeuge/tests-logik/lesbarkeit.test.mjs (neu)
- /home/user/tezgel/_werkstatt/werkzeuge/tests-logik/lesbarkeit-probe.html (neu)
- /home/user/tezgel/_werkstatt/pakete/E0-PRUEF-02b.rueckgabe.md (Bericht)
Belege im Scratchpad: /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E0-PRUEF-02b/. Nicht committet, nicht gepusht.

## WAS UND WARUM
- lesbarkeit-logik.mjs (ohne Browser): silben, saetze, woerter, flesch, striche, bindestrichwoerter, floskeln. Die Regeln kommen aus den JSON-Dateien des Auftrags.
- lesbarkeit.mjs: Playwright über installSperre(), Einwilligung abgelehnt, bereit(). Misst Fließtext, sichtbaren Text ohne Zitate, Alt-Texte, Titel, Beschreibung, aria-label, Glossar und die Seitenart. Schreibt lesbarkeit.json und lesbarkeit.md.
- Tests: 18 Fälle. Die Flesch-Erwartungswerte habe ich von Hand gerechnet (66,3 und 95,6). Die Logik liefert genau diese Werte.

## PRÜFUNG UND ERGEBNIS
- `node --test` der Tests: 18 von 18 bestanden. `node --check` aller drei .mjs-Dateien: OK.
- `CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome node lesbarkeit.mjs --probe`: Exit 0, „PROBE OK“. Gemeldet werden genau die bekannten Befunde: gedankenstrich 2, bindestrich 1, floskel 1, satz-lang 1, absatz-lang 1, glossar-offen 1. Das Zitat mit Gedankenstrich zählt nicht, der erfüllte Begriff DIN 18534 wird korrekt erkannt. Beleg: .../E0-PRUEF-02b/probe/lesbarkeit.json
- Rauchlauf gegen 4310 (`--satz e0-rauch --seiten /,/standorte/wetzlar,/impressum`): Exit 0, 3 Seiten, GRÜN 0, ROT 2, ausgenommen 1, alle HTTP 200. Beleg: .../E0-PRUEF-02b/lesbarkeit.md

| Seite | Art | Flesch | Satz Ø | Satz max | Absätze > 4 | Striche | Bindestrich | Floskeln | Glossar offen | Titel | Beschreibung | Alt | Ergebnis |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| / | erzaehl | 35 | 6.1 | 25 | 0 | 38 | 72 | 2 | 17 | 54 | 152 | ok | ROT: Flesch 1, Gedankenstrich 38, Bindestrich 72, Floskel 2, Glossar offen 17 |
| /standorte/wetzlar | ort | 29.6 | 4.4 | 18 | 0 | 28 | 45 | 1 | 11 | 50 | 149 | ok | ROT: Flesch 1, Gedankenstrich 28, Bindestrich 45, Floskel 1, Glossar offen 11 |
| /impressum | ausgenommen | – | – | – | – | – | – | – | – | – | – | – | AUSGENOMMEN |

- Stichprobe: „Perfektion“ ist ein echter Floskeltreffer. Die Glossarbegriffe sind im Bestand nicht als dfn ausgezeichnet. „Walk-In“ und „Lahn-Dill“ stehen nicht auf der Erlaubtliste.
- Messungen sind Einzelläufe ohne Leistungswerte, daher keine Mediane.
- Selbstprüfung: git status zeigt von mir nur die drei neuen Pfade und tests-logik/. Die übrigen Einträge stammen von anderen Paketen. Ich habe nichts an src/, public/, test/, next.config.ts, package.json, .env-Dateien oder Servern geändert.

## BILDBELEGE
Keine.

## GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste)
1. _werkstatt/werkzeuge/EINRICHTUNG.md, Abschnitt Lesbarkeit: den Befehl `CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome node lesbarkeit.mjs --probe` aufnehmen. Ohne CHROME_PATH findet Playwright chromium-1194 nicht.
2. _werkstatt/werkzeuge/lib.mjs wurde während des Laufs von anderer Seite geändert. Ich habe die Datei nur importiert; die genutzten Exporte sind vorhanden. Keine Änderung meinerseits.

## OFFENE FRAGEN
1. Ordinalzahlen wie „am 23. Oktober“ trennen nicht. Ein Satz, der mit einer Zahl endet, bleibt dann ungetrennt. Bestätigen?
2. Floskeln zählen nur als ganze Wörter; „nahtloser“ wird nicht erkannt. Formen in floskeln.json aufnehmen?
3. Glossar: Endungen e, en, er, em, es, n, s gelten als derselbe Begriff. Bestätigen?
4. Aufklappbare details werden zur Messung geöffnet, wie in texte.mjs. Bestätigen?
5. Zeichenregeln gelten auch für Alt-Texte und aria-label. Bestätigen?
6. HTTP-Status ungleich 200 zählt als ROT. Das ist über den Auftrag hinaus und kann entfernt werden.
7. Gemessen wird nur die Ansicht d1440.

=== ENDE E0-PRUEF-02b · BEREIT ZUR RÜCKGABE ===
