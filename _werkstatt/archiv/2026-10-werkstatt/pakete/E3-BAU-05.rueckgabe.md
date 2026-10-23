# E3-BAU-05 · Rückgabe · /standorte/[stadt]

**GEÄNDERTE DATEIEN**
- `src/app/(bestand)/standorte/[stadt]/page.tsx`: Seitenkörper aus KERN-Bausteinen. Metadaten, `generateStaticParams`, JSON-LD und Datenlogik unverändert.
- `_werkstatt/pakete/E3-BAU-05.rueckgabe.md` (diese Datei).
- Kein Commit, Push, Build oder Serverstart durch mich. Die Zwischenstand-Commits `9fa2dd5` und `8622b23` stammen nicht von mir (vermutlich `commit.sh`); der Stand der Datei entspricht HEAD.

**WAS UND WARUM**
- Einstieg (`erzaehl`): Etikett Region · Entfernung, H1 an der Laserachse, Vorspann, Knöpfe „Aufmaß in {Stadt} anfragen“ und Telefon. Rechts Verlegeplan `bad` ohne Achse, damit Rot einmal erscheint.
- Leitachse über alle Abschnitte: „Regionaler Fachservice“ mit drei Kennzahlen; Anfahrt (`RouteVisualization`, unverändert); „Regionale Marktabdeckung“ mit `LocalDominanceMap` (Karte unverändert; die Titelzeile bleibt Absatz wie im Bestand, kein H2); „Unsere Fachgewerke“ als Feldraster, das ganze Feld ist der Link; „Weitere Einsatzgebiete in der Region“ als Feldraster mit Knopf „Alle Standorte ansehen“.
- `LocationContact` und `QualityPromise` unverändert in der Leitachse; `FinalCTA` unverändert außerhalb.
- Abweichung 1: `Kennwerte` nicht verwendet. Das Kennwerte-Raster stellt das Etikett vor den Wert (`dl`/`dt`/`dd`) und würde die Wortfolge ändern. Die drei Zahlen nutzen dieselbe Raster- und Flächenlogik, Wert vor Etikett, ab `md` dreispaltig.
- Abweichung 2: `bg-neutral-50` am `LocationContact` entfernt (Wert außerhalb des Systems, wie E3-BAU-04).
- Entfernt: Ambient-Glow, Glasflächen, Schatten, Verlauf am Stadtnamen, Icon-Kacheln, Hover-Versatz, Pill-Badge; lucide-Icons durch `Icon` ersetzt.
- Erhalten: H1, alle Überschriften, Fließtexte, Links, Knopftexte, `aria-label`-Werte, IDs `stadt-leistungen` und `weitere-orte` (über `titelId`). Mikrotexte: keine Änderung (alt → neu: keine). Kein `auftritt`, kein großer Moment.

**GEMEINSAME DATEIEN**
- `_werkstatt/werkzeuge/test-zuordnung.json`, vor dem Eintrag `standorte/page` ergänzen: `{"muster": "standorte/\\[stadt\\]/page", "specs": ["funktion-schnellanfrage.spec.mjs"]}`. Ohne Eintrag laufen für diese Seite in Prüfstufe A keine Funktionstests.
- Sonst keine. `Einzugsband.tsx` unangetastet.

**PRÜFUNG UND ERGEBNIS**
- `umbau.mjs`: Trockenlauf, dann `--schreiben`: 6 Icons als Daten, 45 Klassenlisten, 3 Zierelemente entfernt, 0 ZU_PRUEFEN.
- Textprobe gegen den Stand vor dem Umbau: kein Textverlust. Vier Texte wandern als Props weiter, die zwei IDs stehen in `titelId`.
- Bezeichner-Probe: 0 offene Namen. Werte-Prüfung: 0 Befunde. ESLint: 0 Fehler, 0 Warnungen. tsc: 0 Fehler.
- Wortfolge des sichtbaren Textes gegen die Produktion (4310): zwei Abweichungen, beide in fremden Bausteinen (Kopfzeile „WhatsApp“, Honeypot-Hinweis im Schnellformular). Der Seitentext ist wortgleich.
- Prüfstufe A (`pruefe-a.sh E3-BAU-05 … -- /standorte/wetzlar /standorte/giessen`): GRÜN, Exit 0. Bilder HTTP 200, Konsole 0, Überlauf 0, Überlappung 0. Textvergleich: unerlaubt entfernt 0. Funktionstests ohne Zuordnung übersprungen.
- Funktionstest von Hand, `funktion-schnellanfrage.spec.mjs` gegen 4320, `--workers=1`: 24 bestanden, 0 fehlgeschlagen, 0 flaky (2,0 min).
- Mengen: 1 Einstieg, 4 eigene Abschnitte, 3 Knöpfe, 4 + 6 Felder, 3 Kennzahlen.

**BILDBELEGE** (Scratchpad `E3-BAU-05/`)
- Wetzlar: `bilder/standorte__wetzlar/m390.jpg`, `bilder/standorte__wetzlar/d1440.jpg`. Gießen: `bilder/standorte__giessen/m390.jpg`, `bilder/standorte__giessen/d1440.jpg`.
- Ganze Seite Wetzlar: `voll-wetzlar/m390-voll.jpg`, `voll-wetzlar/d1440-voll.jpg`.

**OFFENE FRAGEN**
1. Einzugsband: Stelle markiert (Kommentar) im Abschnitt „Weitere Einsatzgebiete in der Region“, vor dem Feldraster. Bitte Position und Form bestätigen.
2. Motiv im Einstieg: `bad`, weil die H1 die Badsanierung nennt. E3-BAU-04 nutzt `wohnen`. Bestätigen oder ersetzen.
3. Kennwerte: Soll Wert vor Etikett als Lesefolge erlaubt werden? Dann Eintrag in `texte-erlaubt.json` und eine Kennwerte-Variante ohne `dl`. Sonst bleibt die Liste wie gebaut.
4. Schriftfeld (Vertrauenszeile) fehlt, weil der Bestand dieser Seite keine hat. Neuer Inhalt wäre eine Entscheidung.
