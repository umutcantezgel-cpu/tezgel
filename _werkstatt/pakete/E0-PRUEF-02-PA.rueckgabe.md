GEÄNDERTE DATEIEN
Keine Datei im Repo geändert. Ausgaben nur unter `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E0-PRUEF-02-PA/` (Logs, Belege, `syntax.sh`, `stich.py`, Probelauf-Ordner `a/` und `b/`).

WAS UND WARUM
Ich habe die Werkzeuge aus E0-PRUEF-01 und -02a bis -02c sowie `probelauf.mjs` aus -02d geprüft, nur ausgeführt und nicht geändert. Die Prüfung folgt Schritt 2 meines Briefings.

GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste)
1. Außerhalb aller fünf Schreibrechte, nicht von mir geändert: `CLAUDE.md`, `_werkstatt/KERN.md`, `_werkstatt/PLAN.md`, `_werkstatt/ABNAHME.md`, `_werkstatt/LAGEBILD.md`, `_werkstatt/pakete/E0-PROBE-01..10.md`, `_werkstatt/pakete/E0-PRUEF-03.md`, `_werkstatt/pakete/E1-PRUEF-PLAN.md`.
2. `src/` ist außerhalb aller fünf Pakete geändert: `src/app/(bestand)/_dokument.tsx`, `src/app/bewegung.css`, `src/app/globals.css` (M), `src/components/verlegen/` und `src/lib/verlegen/` (neu). Mein Briefing verbietet `src/`. Der Orchestrator muss das prüfen.
3. Außerhalb meiner Rechte, aber der Wunschliste aus E0-PRUEF-02a entsprechend: `abschnitte.mjs`, `axe.mjs`, `bewegung.mjs`, `fotos.mjs`, `kachel-fotos.mjs`, `svg.mjs`, `texte.mjs`, `ueberlappung.mjs` (je eine `chromium.launch`-Zeile mit `CHROME_PATH`) und `playwright.config.mjs` (3 Zeilen). Bitte bestätigen oder zurücknehmen.

PRÜFUNG UND ERGEBNIS
- Syntax: `node --check` für 21 .mjs-Dateien und `bash -n` für 5 Skripte, alle Exit 0. BESTANDEN.
- Tests: `node --test _werkstatt/werkzeuge/tests-logik/` gibt Exit 1 („Cannot find module“, Node 22.22). Mit `node --test tests-logik/*.test.mjs` ergibt sich Exit 0 und 18/18 bestanden. Nur `lesbarkeit` hat Tests, `erstesbild` und `adressen` haben keine. Der Briefing-Befehl ist nicht lauffähig.
- `erstesbild`: Probe Exit 0, „PROBE OK“. Lauf `--satz pa --seiten / --geraete m360,q844,d2560` dreimal, Exit 0 und identisch: m360 erstbesuch 1/5 (nach Einwilligung 3/5), q844 3/5 und 3/5, d2560 5/5 und 5/5. BESTANDEN.
- `lesbarkeit`: Probe Exit 0, „PROBE OK“. Lauf `--satz pa --seiten /kontakt` Exit 0, Einzellauf: ROT, Flesch 54,9, Gedankenstriche 31, Bindestriche 39, Glossar offen 2. BESTANDEN.
- `adressen`: Probe Exit 0, „PROBE BESTANDEN“. CSV: 202 Datenzeilen, Status 200 = 168, 308 = 2, 410 = 32. Fünf Stichproben (seed 20261023) gegen 4310 stimmen zu 5/5 mit der CSV überein. BESTANDEN mit Befund, siehe OFFENE FRAGEN.
- Lighthouse (E0-PRUEF-01): `belege/e0-probe/lighthouse.json`, `laeufe[0].profil` = „frisch“, `profil_dateien` = 20, Profilordner leer nach dem Lauf. BESTANDEN. Messwerte: Leistung 88, LCP 3240 ms, TBT 237 ms, CLS 0. Das ist ein Median aus einem Lauf.
- `probelauf` (02d), Probe (a) P5, m390, A2, Schritt `tippe` Nr. 11: Exit 0, Ziel ERREICHT bei Schritt 01, dreimal identisch. Protokoll: `kontakt_angetippt` mit `attrappe: true`, kein Anfrage-Ereignis. BESTANDEN.
- `probelauf` (b) P1, m390, Schrift 200, A3: NICHT ABGESCHLOSSEN. Vorschauläufe bis Schritt 3 (Kontaktdaten) liefen ohne Absenden. Der Lauf mit dem Klick auf „Anfrage verbindlich absenden“ wurde vom Berechtigungssystem abgelehnt. Ich habe ihn nicht erneut versucht.
- `git status --porcelain`: 58 Einträge. Alle übrigen Einträge liegen in den Schreibrechten der Pakete 01, 02a, 02b, 02c oder 02d, außer den oben genannten Dateien. `AGENTS.md` ist unverändert, der Symlink `node_modules` ist ignoriert.

BILDBELEGE
- `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E0-PRUEF-02-PA/a/e0-rauch/a-rauch/01-tippe.jpg`
- `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E0-PRUEF-02-PA/b/e0-rauch/b-schritt3/06-tippe.jpg`
- Weitere Belege im selben Ordner `E0-PRUEF-02-PA/`: `eb/erstes-bild.json` (plus `eb2`, `eb3`), `lb/lesbarkeit.md`, `a/e0-rauch/a-rauch/lauf.json`, `test-glob.log`.

OFFENE FRAGEN
1. Die Rückgabedatei `_werkstatt/pakete/E0-PRUEF-02-PA.rueckgabe.md` habe ich nicht geschrieben, weil diese Sitzung Berichts-.md-Dateien ausschließt. Dieser Text ist die Rückgabe. Bitte ablegen, falls nötig.
2. Probe (b), die Absendeverweigerung, ist offen. Soll der Lauf mit dem Absendeknopf freigegeben werden?
3. K-014 verlangt 200 oder dauerhafte Weiterleitung. Die 32 Adressen mit 410 (25 aus `wege.ts`, 7 `/beispiel`-Platzhalter) erfüllen das nicht. Der Auftrag nennt 170 Adressen, die CSV hat 202. Sind die 410 und die 7 Platzhalter gewollt?
4. Der Briefing-Befehl `node --test …/tests-logik/` ist auf Node 22.22 nicht lauffähig. Soll der Glob-Aufruf ins Briefing?
5. `erstesbild` und `lesbarkeit` liefen ohne `CHROME_PATH` mit Exit 0. E0-PRUEF-02a und -02b melden das Gegenteil. Welcher Stand gilt?
6. Das Probelauf-Werkzeug hat keine Positivprobe im Briefing. Die Bedienliste zeigt Eingabefelder nicht, `fuelle` braucht den exakten Feldnamen im sichtbaren Ausschnitt, und das Formular liegt hinter dem Express-Funnel (Schritt 1 bis 3).

=== ENDE E0-PRUEF-02-PA · BEREIT ZUR RÜCKGABE ===
