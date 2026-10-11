# P3-14-GEG · Gegenprüfer Testschreiber · Stufe 3 · Modell: Opus (frisch) · Schreibrechte: `_relaunch/pakete/P3-14-GEG.rueckgabe.md` · Kriterium: Z-03

## Auftrag
Prüfe die Test-Änderungen der Pakete P3-14a bis P3-14d und den Orchestrator-Test a41f371 auf zwei Fragen:
1. Wurde eine **Erwartung aufgeweicht**? Gemeint sind etwa gelockerte Selektoren, die nun Falsches treffen, entfernte `expect`, weitere Toleranzen, `skip`/`fixme` ohne Grund, ein Bestandsfall, der jetzt weniger prüft, oder ein Test, der nur noch auf den Kern passt und den Bestand nicht mehr prüft (oder umgekehrt).
2. Sind die neuen oder geänderten Fälle **trennscharf**? Sie sollen an einem falschen Verhalten scheitern; Belege dafür sind die Mutationsprobe und die Läufe gegen die Basis.

## Material
- Diff: `git diff e0de94c~1 HEAD -- _relaunch/werkzeuge/tests/` (nur lesen)
- Rückgaben: `_relaunch/pakete/P3-14a.rueckgabe.md` … `P3-14d.rueckgabe.md`, Briefing `_relaunch/pakete/P3-14.md`
- Mutationsprobe: `_relaunch/belege/t2-ad80754/MUTATION.md`
- Funktionsliste: `_relaunch/FUNKTIONSLISTE.md`
- Sperrklinke: `cd _relaunch/werkzeuge && node testzahl.mjs`

## Grenzen
Nur lesen und `node testzahl.mjs`. Kein git mit Schreibwirkung, kein Testlauf, kein Build oder Start, keine Server-Anfragen.

## Rückgabe `_relaunch/pakete/P3-14-GEG.rueckgabe.md`
- Urteil „Erwartungen gleich oder strenger: ja/nein“ je Spec-Datei.
- Befunde mit Datei und Zeile, Schwere hoch/mittel/niedrig, und ein Vorschlag je Befund.
- Fälle, die die Mutationsprobe nicht abdeckt, und dazu eine Mutation, die sie prüfen würde.
