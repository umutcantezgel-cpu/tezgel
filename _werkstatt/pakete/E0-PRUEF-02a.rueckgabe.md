=== Haiku-Unteragent E0-PRUEF-02a: Bericht ===

**GEÄNDERTE DATEIEN**
- `/home/user/tezgel/_werkstatt/werkzeuge/lib.mjs`: 10 Gerätegrößen aus `HAUPTANSICHTEN.json` als Ansichten, neu `GERAETE_ALLE`, neu `geraeteWahl()`. Alte Schlüssel bleiben. Die Diff-Zeilen enthalten außerdem einen älteren, nicht von mir stammenden `SCRATCH`-Block (17 Zeilen), den ich unverändert gelassen habe.
- `/home/user/tezgel/_werkstatt/werkzeuge/bildsatz.mjs`: `--geraete alle|liste`, Standard `alle`.
- `/home/user/tezgel/_werkstatt/werkzeuge/einzelbild.mjs`: `--geraete alle|liste`. Standard unverändert (m390, t768, d1440).
- Neu: `/home/user/tezgel/_werkstatt/werkzeuge/erstesbild.mjs`.
- Neu: `/home/user/tezgel/_werkstatt/werkzeuge/tests-logik/erstesbild-probe.html`.
- Nicht geändert: `$SCRATCH/E0-PRUEF-02a/…` (Ausgaben), Repo, `src/`, `public/`, `test/`, `package.json`, Commits, Pushes.

**WAS UND WARUM**
- Gerätegrößen: Die 10 Größen sind für Bildsatz und Einzelbild anwählbar. Die Ausgabe von `bildsatz` enthält die gewählten Geräte im Protokoll.
- `erstesbild.mjs` prüft die fünf Pflichtelemente im ersten Bildschirm (Scroll 0) je Seite, Gerät und Durchgang (`erstbesuch`, danach `nach-einwilligung`). Jeder Fall läuft in einem frischen Kontext. Die Ursachen sind `fehlt`, `unter-dem-falz`, `abgeschnitten`, `verdeckt-durch <Selektor>` oder `ok`. Querformat wird nur bei Höhe < Breite und Höhe ≤ 500 bewertet.
- Host-Anpassung: Playwright 1.56.1 sucht `chromium-1194`, vorhanden ist nur `chromium-1243`. `erstesbild`, `einzelbild` und `bildsatz` lesen deshalb die Umgebungsvariable `CHROME_PATH`. Ohne Variable bleibt das Verhalten gleich.

**GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste)**
1. `_werkstatt/werkzeuge/abschnitte.mjs` Zeile 23, `ueberlappung.mjs` Zeile 259, `fotos.mjs` Zeile 32: `chromium.launch({ args: … })` um `executablePath: process.env.CHROME_PATH || undefined` ergänzen.
2. `_werkstatt/werkzeuge/axe.mjs` Zeile 22, `bewegung.mjs` Zeile 1054, `kachel-fotos.mjs` Zeile 8, `svg.mjs` Zeile 206, `texte.mjs` Zeile 33: `chromium.launch()` durch `chromium.launch({ executablePath: process.env.CHROME_PATH || undefined })` ersetzen.
3. `_werkstatt/werkzeuge/playwright.config.mjs`: `use.launchOptions = { executablePath: process.env.CHROME_PATH || undefined }`, sonst ist `npm test` am Host nicht lauffähig.
4. `_werkstatt/werkzeuge/EINRICHTUNG.md`: Hinweis ergänzen, dass `einzelbild`, `bildsatz` und `erstesbild` `CHROME_PATH` nutzen.

**PRÜFUNG UND ERGEBNIS**
- `node --check` für lib, bildsatz, einzelbild, erstesbild: ok.
- Positivprobe `node erstesbild.mjs --probe --ziel "$SCRATCH/E0-PRUEF-02a/probe"`: Exit 0. Ergebnis genau wie erwartet: logo ok · ueberschrift ok · ort ok · hauptknopf unter-dem-falz · kontakt verdeckt-durch (durch div.deckel).
- Einzelbild `--seite / --ansichten q844`: HTTP 200, Bild erzeugt, Konsole 0, Überlauf 0, Überlappung 0.
- Bildsatz-Selbsttest `--seiten / --geraete m360,q844`: Exit 0, 24 Aufnahmen, Fehler 0.
- Rauchlauf 1 `--satz e0-rauch --seiten /,/kontakt --geraete alle --ziel "$SCRATCH/E0-PRUEF-02a"` gegen 4310: Exit 0, 40 Fälle, Fehler 0, nicht 200 0, fremd 0, blockiert 0. Alle fünf bestanden in 20 von 40 Fällen. Bestandene Elemente von 5:

| erstbesuch | m360 | m390 | m430 | q844 | t768 | t1024 | d1280 | d1440 | d1920 | d2560 |
|---|---|---|---|---|---|---|---|---|---|---|
| / | 1 | 3 | 3 | 3 | 5 | 4 | 2 | 3 | 5 | 5 |
| /kontakt | 3 | 3 | 4 | 3 | 5 | 5 | 4 | 5 | 5 | 5 |

| nach-einwilligung | m360 | m390 | m430 | q844 | t768 | t1024 | d1280 | d1440 | d1920 | d2560 |
|---|---|---|---|---|---|---|---|---|---|---|
| / | 3 | 4 | 5 | 3 | 5 | 5 | 4 | 5 | 5 | 5 |
| /kontakt | 4 | 4 | 4 | 5 | 5 | 5 | 4 | 5 | 5 | 5 |

- Querformat (q844, nur dieses Gerät fällt unter die Regel): 32,4 % in beiden Durchgängen und beiden Seiten. Nur berichtet, nicht gedeutet.
- Stabilität: Rauchlauf 2 mit gleicher Einstellung, `--bilder`. Alle 200 Elementbefunde sind in Ursache, verdeckendem Element und Selektor identisch. Die größte Abweichung der Rechtecke beträgt 0,3 px. Die Lage ist deterministisch, Zeitmessung entfällt.
- Selbstprüfung `git status`: 28 Einträge im Repo. Meine Änderungen: `bildsatz.mjs`, `einzelbild.mjs`, `lib.mjs` (M) und `erstesbild.mjs`, `tests-logik/` (??). Der Rest stammt von anderen Agenten. `node_modules` ist per `.gitignore` ausgeschlossen.

**BILDBELEGE**
- `$SCRATCH/E0-PRUEF-02a/einzel/q844.jpg`
- `$SCRATCH/E0-PRUEF-02a/rauch-2/bilder/` (40 JPEGs, Namensschema `<seite>__<gerät>__<durchgang>.jpg`)
- `$SCRATCH/E0-PRUEF-02a/bildsatz-selbst/`

Pfade: `$SCRATCH` = `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`. Belege: `…/E0-PRUEF-02a/erstes-bild.json` (Rauchlauf 1), `…/E0-PRUEF-02a/rauch-2/erstes-bild.json` (Rauchlauf 2), `…/E0-PRUEF-02a/rauch.log`.

**OFFENE FRAGEN**
1. Bericht als Datei: Das Briefing verlangt `_werkstatt/pakete/E0-PRUEF-02a.rueckgabe.md`. Die Systemvorgabe verbietet Berichts-.md-Dateien, deshalb habe ich die Datei nicht geschrieben. Bitte entscheiden, ob die Datei trotzdem nötig ist.
2. Bildsatz-Standard ist jetzt alle 10 Geräte. Ältere Sätze mit drei Geräten sind nur mit `--geraete m390,t768,d1440` vergleichbar.
3. `GERAETE` (drei Größen) bleibt für `abschnitte.mjs` und den Einzelbild-Standard. Ob das auf zehn umgestellt wird, ist offen.
4. Auslegungen, die das Briefing nicht festlegt: Ein Element, das unten über den Falz ragt, zählt als `unter-dem-falz`. Unsichtbare oder leere Elemente zählen als `fehlt` mit Feld `grund`, weil das Briefing nur vier Ursachen kennt. Das Textelement für `ort` wird zuerst im Ausschnitt gesucht, dann irgendwo sichtbar. Die Sichtbarkeit des Einwilligungsbanners wird nicht gesondert gemessen, da kein Selektor vorgegeben ist.

=== ENDE E0-PRUEF-02a · BEREIT ZUR RÜCKGABE ===
