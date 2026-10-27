# UM-E0-KONTINGENT · Kontingent-Werkzeug (Tempomat, Schätzung aus Sitzungsprotokollen)

Kennung UM-E0-PRUEF-K · Rolle Prüfer · Haiku 5.5 · Stand 2026-10-27, ca. 04:35 UTC
Aufruf: `cd /home/user/tezgel/_werkstatt/werkzeuge && node kontingent.mjs` (Zeile), `--json`, `--tage`, `--agenten workflows/wf_7f3987b4-6e4`, `--kalibrieren`, Test `node --test kontingent.test.mjs`

## GEÄNDERTE DATEIEN
- `_werkstatt/werkzeuge/kontingent.mjs` (neu, 560 Zeilen, ESM, nur Node-Bordmittel)
- `_werkstatt/werkzeuge/kontingent.test.mjs` (neu, 11 Tests, 239 Zeilen)
- `_werkstatt/werkzeuge/kontingent-preise.json` (neu, vier Modelle, Listenpreise je Million Token)
- `_werkstatt/werkzeuge/kontingent-kalibrierung.json` (neu, ein Kalibrierpunkt, durch `--kalibrieren` geschrieben)
- `_werkstatt/berichte/UM-E0-KONTINGENT.md` (dieser Bericht)
- Außerhalb des Projekts (Scratchpad): Prüfskripte `kontingent-pruef*.mjs` und `agenten-wf7f.txt` im Scratchpad-Ordner der Sitzung; Testordner `scratchpad/kontingent-test/` (die Tests räumen ihren Unterordner wieder weg).

## WAS UND WARUM
- `kontingent.mjs` liest rekursiv alle 884 `*.jsonl` unter `/root/.claude/projects/-home-user-tezgel/` zeilenweise (readline). Nur Zeilen mit `"usage"` werden mit JSON.parse gelesen (Zeile 139).
- Entdopplung nach `message.id`: der letzte Eintrag gewinnt (ab Zeile 133). Preisrechnung je Tokenart. Cache-Schreiben wird nach 5 min und 1 h aufgeteilt; fehlt die Aufteilung, gilt 5 min (`tokenAusUsage`). Unbekanntes Modell: Opus-Preis plus Hinweis auf stderr.
- Fensterkette ab dem Anker 2026-10-26T18:30Z: jedes Fenster beginnt mit der ersten Anfrage nach dem Ende des vorigen (`fensterKette`).
- Regel: Gas unter Soll minus 5 Punkte, Bremse über Soll plus 5, sonst Halten (`regel`). Ziel 95 ohne Messwert, 99 mit Messwert aus `~/.claude/kontingent.json` (jünger als 15 min).
- Kalibrierung: Limit-Ereignis „resets 6:30pm (UTC)“, Fenster 2026-10-26 13:30–18:30 UTC, 100 %. Gespeichert: Kosten 50,69 USD, Faktor 1,9729 Prozent je USD. Der jüngste Punkt gilt als Faktor, der erste als Anker.

## GEMEINSAME DATEIEN
Keine gemeinsame Datei verändert. KONTINGENT.md, Designsystem, Navigation, Pakete, Testkonfiguration und KERN sind unberührt.
Git: Ich habe nichts committet, gepusht oder per git add bewegt. Die Dateien `kontingent.mjs`, `kontingent.test.mjs` und `kontingent-preise.json` stehen bereits in Commit 80b6aa6d, `kontingent-kalibrierung.json` in 2fd3209b; die Herkunft dieser Commits habe ich nicht geprüft. Für meine Dateien gilt: Arbeitsbaum und HEAD stimmen überein (`git diff HEAD` leer). Ungetrackte Dateien `belege/um-e0/axe/` und `berichte/UM-E0-STACK.md` gehören anderen Paketen und sind nicht von mir.

## PRÜFUNG UND ERGEBNIS
Test: `node --test kontingent.test.mjs` ergibt 11 bestanden, 0 fehlgeschlagen, Laufzeit etwa 0,5 s (0,8 s Gesamtzeit). Ohne Netz, nur künstliches Protokoll.
Abgedeckt: Preise je Tokenart (Haiku), Cache-Split und Fallback, Fable-Mischung, unbekanntes Modell, Entdopplung (Teilstand plus Endstand, Fehlzeilen), Fensterkette (Start nach Fensterende, Lücke, Kalibrierfenster selbst aktuell), Regelgrenzen (34,9 Gas, 35 Halten, 45 Halten, 45,1 Bremse), Ende-zu-Ende-Schätzung, exakte CLI-Zeile, `--tage`, `--agenten`, `--kalibrieren` mit jüngstem Faktor.

Echte Protokolle: 884 Dateien, 26 176 eindeutige Antworten. Modelle mit Usage: Haiku, Opus, `<synthetic>` (0 USD). Keine unbekannten Modelle mit Usage. Die Rohzeilen `"model":"haiku"` (18) tragen kein Usage und zählen nicht.

Tempomat-Zeile (ca. 04:35 UTC, `node kontingent.mjs`):
`Fenster 28.3 % (Soll 76.9 %, Ziel 95 %) 2026-10-27 00:31–2026-10-27 05:31 UTC · Woche ? % · Gas · Quelle Schätzung (Faktor 1.973, Stand 2026-10-26)`
Mit Messwert nicht erprobt, weil `~/.claude/kontingent.json` fehlt.

Kosten des Kalibrierfensters: 50,69 USD, 13:30–18:30 UTC. Alle Kosten liegen vor 16:45 UTC, danach 0,00 USD. Faktor: 1,9729 Prozent je USD.

Kosten je Tag und Modell (UTC, Listenpreis, `--tage`):

| Datum | Haiku | Opus | Anmerkung |
|---|---|---|---|
| 2026-10-23 | 5,05 USD | 90,03 USD | |
| 2026-10-24 | 4,41 USD | 455,45 USD | |
| 2026-10-25 | 20,65 USD | 299,38 USD | |
| 2026-10-26 | 11,63 USD | 323,98 USD | Kalibrierfenster |
| 2026-10-27 | 0,12 USD | 14,21 USD | bis ca. 04:30 UTC |

Summe 7 Tage: 1 224,91 USD (26 170 Antworten im `--tage`-Lauf, 26 176 im späteren Lauf wegen laufender Arbeit).

Workflow wf_7f3987b4-6e4 je Agent (`--agenten`): 32 Protokolle mit Antworten, 33 Dateien (journal.jsonl ohne Usage).
- Haiku, 17 Protokolle: Kosten 0,031 bis 0,099 USD, Median 0,041 USD, Summe 0,77 USD. Anteil am Fenster 0,06 bis 0,20 %, Median 0,08 %.
- Opus, 15 Protokolle: Kosten 0,466 bis 10,514 USD, Median 2,694 USD, Summe 44,43 USD. Anteil am Fenster 0,9 bis 20,7 %, Median 5,3 %.
- Gesamt: 45,20 USD, rund 89 % des Kalibrierfensters.

Laufzeit (Wanduhr, echte Protokolle): Tempomat-Zeile 16,9 s und 15,6 s, Kalibrierung 15,9 s, Prüfskript 15,4 s. `--tage` und `--agenten` nicht einzeln gemessen, sie lesen dieselben Dateien. Die Shell-Grep-Zählung der Modellnamen dauerte 5 min 19 s; das Werkzeug ist damit rund 20-mal schneller.

## BILDBELEGE
Keine. Der Lauf hat keine Bilder erzeugt oder geprüft.

## GRENZEN DER SCHÄTZUNG
- Listenpreise statt der Gewichtung des Abos. Die Gewichte des Kontingents sind unbekannt.
- Ein einziger Kalibrierpunkt. Das Fenster 18:31:33–23:31:33 UTC am 26.10. kommt auf 59,93 USD, also 118 % (1 484 Antworten). Der 100-%-Stand (50,69 USD) war um 21:09 UTC überschritten, und für dieses Fenster ist kein Limit-Ereignis in KONTINGENT.md vermerkt. Der Faktor passt also möglicherweise nicht zum tatsächlichen Limit. Ein zu hoher Faktor überschätzt den Verbrauch und ist damit die vorsichtige Richtung; ob das so ist, ist offen.
- Woche wird nicht geschätzt; die Ausgabe zeigt deshalb „Woche ? %“.
- Erfasst werden nur Protokolle dieses Ordners und Kontos. Andere Geräte fehlen.
- Die Zeitstempel sind Protokollzeiten; nachträglich geschriebene Zeilen (bis 23:31:15 UTC) fließen ein.
- Der Messwertpfad ist ungeprüft. Die Feldnamen für die Woche (`week`, `woche`, `weekly`) sind eine Annahme.
- Modellpreise sind die vom Orchestrator vorgegebenen Werte, nicht nachgeprüft.

## OFFENE FRAGEN
1. OFFENE FRAGE: Gab es für das Fenster 18:31:33–23:31:33 UTC am 26.10. ein Limit-Ereignis oder eine Meldung? Mit einer Meldung (`--kalibrieren --ende 2026-10-26T23:31:33Z --prozent <n>`) würde der Faktor neu kalibriert.
2. OFFENE FRAGE: Soll der Faktor weiter der jüngste Punkt sein, oder über alle Punkte gemittelt werden? Der Anker bleibt der erste Punkt.
3. OFFENE FRAGE: Ist das Feld für die Woche in `~/.claude/kontingent.json` so benannt, wie es das Werkzeug erwartet?
4. OFFENE FRAGE: „Stand“ ist das Datum der Messzeit (bei Limit-Ereignissen das Fensterende). Bitte bestätigen.
5. OFFENE FRAGE: Der Alias „haiku“ hat in den Protokollen kein Usage. Falls er doch einmal mit Usage erscheint, rechnet das Werkzeug mit Opus-Preis und meldet ihn.

=== ENDE UM-E0-PRUEF-K · BEREIT ZUR RÜCKGABE ===
