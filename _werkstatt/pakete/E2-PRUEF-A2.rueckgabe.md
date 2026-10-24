# E2-PRUEF-A2 · Rückgabe (Haiku, Workflow wf_465d4634-607)

GEÄNDERTE DATEIEN (nur Belege)
- Im Repo von mir nichts geändert. Vor meinem ersten Befehl war `src/components/verlegen/Verlegen.tsx` bereits geändert (`git status` vorher: ` M src/components/verlegen/Verlegen.tsx`, Beleg `$SCRATCH/E2-PRUEF-A2/belege/status-vorher.txt`).
- Während des Laufs kam `_werkstatt/werkzeuge/tests/verlegen.spec.mjs` hinzu (mtime 05:52:39, nicht von mir). `Verlegen.tsx` hat mtime 05:48:56. Beide liegen außerhalb meiner Schreibrechte und sind nicht von mir.
- Meine Ausgaben: `$SCRATCH/E2-PRUEF-A2*/**` (Läufe, Lesbarkeit, Belege). Zwei Hilfsdateien, die ich zuerst am Scratch-Wurzelpfad angelegt hatte, habe ich nach `$SCRATCH/E2-PRUEF-A2/belege/` verschoben.
- Das Werkzeug legt zusätzlich `$SCRATCH/pruefe-a.slot1` und `slot2` an (Semaphor).

Vorprüfung: `git diff --stat 4479016 HEAD -- src test` ist leer (rc 0).

ERGEBNIS JE PAKET
- **E2-PRUEF-A2-1: ROT** (Grund: Lesbarkeit `/bad`)
  - tsc: GRÜN, Fehler eigene 0, übrige 0 (`$SCRATCH/E2-PRUEF-A2-1/tsc.txt`)
  - eslint: GRÜN, 0 Fehler, 0 Warnungen
  - Funktionstests: GRÜN aus Wellenlauf, navigation und kontaktwege, erwartet 74, unerwartet 0
  - Bilder: `/` und `/bad` HTTP 200, Konsole 0, Überlauf 0, Überlappung 0
  - Lesbarkeit: `/` GRÜN. `/bad` ROT: Flesch 38.7 (min. 60), Gedankenstrich 2, Bindestrich 44, Floskel 2 („Traumbad“), Glossar offen 4 (DIN 18534, Barrierefreies, Walk-In-Duschen, Untergrund)
  - Textvergleich: ÜBERSPRUNGEN, keine Basis (`_werkstatt/belege/e0/texte-index.json` fehlt)
- **E2-PRUEF-A2-2: ROT** (Grund: Lesbarkeit `/leistungen`)
  - tsc: GRÜN, Fehler eigene 0, übrige 0
  - eslint: GRÜN, 0 Fehler, 1 Warnung (`src/app/bewegung.css`: „File ignored because no matching configuration“)
  - Funktionstests: GRÜN aus Wellenlauf, 13 Specs, erwartet 294, unerwartet 0 (Stand siehe OFFENE FRAGEN)
  - Bilder: `/leistungen` HTTP 200, Konsole 0, Überlauf 0, Überlappung 0
  - Lesbarkeit: `/leistungen` ROT: Flesch 22, ein Satz mit 27 Wörtern, Gedankenstrich 10, Bindestrich 31, Floskel 3 („innovative“, „innovativen“, „perfekte“), Glossar offen 19. Fundstellen: `$SCRATCH/E2-PRUEF-A2/lesbarkeit/lesbarkeit.md`
  - Textvergleich: ÜBERSPRUNGEN, keine Basis

POSITIVPROBE
- Probe 1: `pruefe-a.sh E2-PRUEF-A2-PROBE src/components/kern/Hauptknopf.tsx -- /` mit Wellenlauf-Variable: GRÜN, Exit 0. Funktionstests ÜBERSPRUNGEN (keine Zuordnung).
- Probe 1b: dieselbe Datei mit `-- /gibt-es-wirklich-nicht-200`: HTTP 404/404, Bilder ROT, Gesamt ROT, Exit 1.
- Probe 2 (Nachtrag): `PRUEFE_A_WELLENLAUF=/gibt-es-nicht.json … HeroContactForm.tsx -- /`: Funktionstests ROT, Gesamt ROT, Exit 1.
- Ergebnis: Werkzeug verhält sich wie erwartet.

BILDBELEGE (Read-Sichtung)
- `$SCRATCH/E2-PRUEF-A2-1/bilder/start/m390.jpg` und `d1440.jpg`: nichts Falsches sichtbar. Die untere Fixleiste überdeckt das Bildende bei m390 (erwartet bei Fixleisten).
- `$SCRATCH/E2-PRUEF-A2-1/bilder/bad/m390.jpg`: Liste „Kostenfreies Vor-Ort-Aufmaß“ / „Staubschutz-Garantie“ am unteren Rand von der Fixleiste überdeckt (erwartet). Sonst nichts Falsches.
- `$SCRATCH/E2-PRUEF-A2-1/bilder/bad/d1440.jpg`: nichts Falsches.
- `$SCRATCH/E2-PRUEF-A2-2/bilder/leistungen/m390.jpg` und `d1440.jpg`: nichts Falsches sichtbar.

GEMEINSAME DATEIEN
- Keine Fehler in gemeinsamen Dateien. tsc meldet 0 Fehler außerhalb der Paketdateien (`übrige 0`).
- Hinweis: `_werkstatt/werkzeuge/tests/verlegen.spec.mjs` ist uncommitted geändert (siehe oben). Nicht bewertet.

OFFENE FRAGEN
1. Paket 2: Der Funktionstestwert (verlegen.spec, 26 Tests) stammt aus dem Wellenbericht, der vor dem Stand von `Verlegen.tsx` (05:48:56) und `verlegen.spec.mjs` (05:52:39) entstand (Gesamtlauf-Bericht 05:38). Ob der aktuelle Arbeitsbaum getestet ist, ist nicht belegt. Entscheidung durch Orchestrator, ob ein frischer Lauf der betroffenen Specs nötig ist.
2. `$SCRATCH/E2-PRUEF-A-WELLE/berichte/gesamtlauf-ohne-kopf.json`: Der `stats`-Block meldet expected 309, skipped 20, unexpected 11. Die Testeinträge ergeben 246 expected, 12 skipped, 0 unexpected. Das Werkzeug wertet die Testeinträge aus. Bitte den Bericht prüfen.
3. Textvergleich nicht geprüft: `_werkstatt/belege/e0/texte-index.json` fehlt.
4. Lesbarkeit `/bad` und `/leistungen` ist ROT. Die Fundstellen stehen in `$SCRATCH/E2-PRUEF-A2/lesbarkeit/lesbarkeit.json`. Ich habe nichts geändert.

=== ENDE E2-PRUEF-A2 · BEREIT ZUR RÜCKGABE ===
