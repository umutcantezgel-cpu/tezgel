# E2-PRUEF-A3 · Rückgabe (Haiku, Workflow wf_465d4634-607)

GEÄNDERTE DATEIEN (nur Belege)
Keine durch mich. `git status --porcelain` ist vorher und nachher gleich (`/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-PRUEF-A3-status-vorher.txt`, `…/E2-PRUEF-A3-status-nachher.txt`). Schon vorher offen und nicht Teil meiner Pakete: ` M src/components/verlegen/Verlegen.tsx`, ` M _werkstatt/werkzeuge/tests/verlegen.spec.mjs`. Vorab-Prüfung `git diff --stat 4479016 HEAD -- src test`: leer. HEAD ist jetzt 701ccd5.

ERGEBNIS JE PAKET
- Wurzel `npm test`: 114 bestanden, 0 gescheitert (`…/scratchpad/E2-PRUEF-A3-npmtest.txt`).
- Gesamt: 2 Pakete grün mit Einschränkung, 1 Paket rot.

E2-PRUEF-A3-1 (Intro und Startbild, Ansicht `/`): GRÜN nach Maßstab, zwei Punkte nicht geprüft.
- tsc: GRÜN, eigene 0, übrige 0
- eslint: GRÜN, Fehler 0, Warnungen 0
- Funktionstests: ÜBERSPRUNGEN, keine Zuordnung in test-zuordnung.json
- Bilder `/`: GRÜN, HTTP 200, Konsole 0, Überlauf 0, Überlappung 0
- Lesbarkeit `/`: GRÜN
- Textvergleich: ÜBERSPRUNGEN, keine Basis (siehe OFFENE FRAGEN)
- Log: `…/scratchpad/E2-PRUEF-A3-1/pruefe-a.txt`

E2-PRUEF-A3-2 (Startseite, `/`): GRÜN, Textvergleich nicht geprüft.
- tsc: GRÜN, eigene 0, übrige 0; eslint: GRÜN, 0/0
- Funktionstests: GRÜN, erwartet 39, unerwartet 0, flaky 0, ohne Ergebnis 0 (Specs funktion-kontaktwege, funktion-hero-kontakt aus dem Wellenbericht)
- Bilder `/`: GRÜN, HTTP 200, Konsole 0, Überlauf 0, Überlappung 0
- Lesbarkeit `/`: GRÜN
- Textvergleich: ÜBERSPRUNGEN
- Log: `…/scratchpad/E2-PRUEF-A3-2/pruefe-a.txt`

E2-PRUEF-A3-3 (Seite nicht gefunden, `/gibt-es-nicht`): ROT.
- tsc: GRÜN, 0/0; eslint: GRÜN, 0/0
- Funktionstests: GRÜN, Spec funktion-navigation, erwartet 43, unerwartet 0 (Wellenbericht)
- Bilder: ROT. HTTP 404 ist erwartet und nicht gewertet. Gewertet wird „Konsole 2“ je Ansicht (m390 und d1440): zwei Meldungen „Failed to load resource: 404“, ohne URL.
- Lesbarkeit `/gibt-es-nicht`: ROT, „main hat keinen sichtbaren Fließtext“ (fliesstext-fehlt 1). Der Status-Befund 404 ist ausgenommen.
- Textvergleich: ÜBERSPRUNGEN
- Log: `…/scratchpad/E2-PRUEF-A3-3/pruefe-a.txt`
- Lesbarkeit-Bericht für alle Ansichten: `…/scratchpad/E2-PRUEF-A3/lesbarkeit/lesbarkeit.md` und `lesbarkeit.json`

POSITIVPROBE
- P1 `pruefe-a.sh E2-PRUEF-A3-PROBE src/components/kern/Hauptknopf.tsx -- /`: Gesamt GRÜN, Exit 0. tsc, eslint, Bilder GRÜN; Funktionstests und Textvergleich ÜBERSPRUNGEN (keine Zuordnung, keine Basis).
- P1b `-- /gibt-es-wirklich-nicht-200`: HTTP 404/404, Bilder ROT, Gesamt ROT, Exit 1.
- P2 mit `PRUEFE_A_WELLENLAUF=/gibt-es-nicht.json` und HeroContactForm.tsx: Funktionstests ROT (ohne Ergebnis -1), Gesamt ROT, Exit 1.
- Server: 4310 und 4320 antworteten mit 200, nicht angefasst.

BILDBELEGE (sichtgeprüft; nichts sichtbar abgeschnitten, überdeckt oder leer)
- Paket 1: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-PRUEF-A3-1/bilder/start/m390.jpg` und `…/d1440.jpg`. Ohne Befund. Auf m390 überdeckt die feste untere Leiste den unteren Rand des Badfotos; bei fixierter Leiste erwartbar, nicht gewertet.
- Paket 2: `…/scratchpad/E2-PRUEF-A3-2/bilder/start/m390.jpg` und `…/d1440.jpg`. Ohne Befund.
- Paket 3: `…/scratchpad/E2-PRUEF-A3-3/bilder/gibt-es-nicht/m390.jpg` und `…/d1440.jpg`. Ohne sichtbaren Befund.

GEMEINSAME DATEIEN (gemeldete Fehler, exakte Liste)
Keine. In allen Läufen blieben die übrigen tsc-Fehler bei 0 und eslint meldete keine Fehler.

OFFENE FRAGEN
1. Der Textvergleich läuft in keinem Lauf. `_werkstatt/belege/e0/texte-index.json` fehlt; belege/e0 und belege/e2 enthalten keine solche Datei. Ich habe keine andere Basis gesetzt. Bitte Basis festlegen oder die Textstufe als nicht geprüft abnehmen.
2. Paket 1 (Intro, Startbild) und Hauptknopf haben keine Funktionsspec in test-zuordnung.json. Bitte bestätigen, ob das so gewollt ist.
3. Paket 3: Die zwei 404-Konsolenmeldungen haben keine URL. Probe P1b zeigt dasselbe Bild, die Startseite 0 Meldungen. Per curl liefert auf 4320 `/gibt-es-nicht` 404, `/manifest.webmanifest` 404, `/favicon.ico` 200. Welche Ressource die Meldungen auslöst, ist nicht geklärt.
4. Paket 3: K-010 verlangt auf der 404-Seite Fließtext (Art erzaehl). Bitte entscheiden, ob die Seite so eingestuft bleibt.
5. Der Wellenbericht gilt für 4479016, HEAD ist 701ccd5. Die zwei offenen Änderungen (Verlegen.tsx, verlegen.spec.mjs) sind im Wellenstand nicht enthalten. Ob Server 4320 sie ausliefert, habe ich nicht geprüft.

=== ENDE E2-PRUEF-A3 · BEREIT ZUR RÜCKGABE ===
