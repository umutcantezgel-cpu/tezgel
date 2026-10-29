# KONTINGENT · Tempomat nach Abschnitt 12

Quelle: `~/.claude/kontingent.json` fehlt in dieser Cloud-Umgebung. Bis eine Meldung (Befehl KONTINGENT) oder ein Messwert vorliegt, gilt die Schätzung des Kontingent-Werkzeugs (`werkzeuge/kontingent.mjs`, E0-Ergänzung), kalibriert an Limit-Ereignissen.

## Kalibrierpunkte
| Zeit (UTC) | Art | Fenster | Woche | Beleg |
|---|---|---|---|---|
| 2026-10-26 ≈ 16:4x | Limit-Ereignis „session limit · resets 6:30pm (UTC)“ | 100 % (Fensterende 18:30 UTC, Beginn ≈ 13:30 UTC) | unbekannt | 13 Widerleger von wf_5eafaa08-272 fielen aus (`ENTSCHEIDUNGEN.md` E-065, Runde 4) |

Auswertung (UM-E0-PRUEF-K, `berichte/UM-E0-KONTINGENT.md`): Kalibrierfenster 13:30–18:30 UTC kostete 50,69 USD (gewichtet nach Listenpreis) → Faktor 1,973 % je USD. Widerspruch: Das folgende Fenster 18:31–23:31 UTC kommt nach dieser Rechnung auf 118 % ohne Limit-Ereignis. Der Faktor ist damit eher zu hoch (die Grenze liegt über 50,69 USD); er bremst also früher als nötig und ist auf der sicheren Seite. Nächster Kalibrierpunkt: das nächste Limit-Ereignis oder eine Meldung KONTINGENT. Woche: keine Kalibrierung (7-Tage-Kosten 1.224,91 USD, davon Opus rund 95 %).

## Kosten je Klasse aus dem Vorlauf (Workflow wf_7f3987b4-6e4, 32 Agenten)
- Haiku-Agent (Klasse S/M): Median 0,041 USD · Opus-Agent (Klasse L): Median 2,694 USD · ganzer Workflow 45,20 USD (≈ 89 % eines Fensters nach Faktor 1,973).

## Kosten je Klasse (gleitender Mittelwert, Token gewichtet nach Listenpreis)
| Klasse | Modell | Mittelwert | Stichproben |
|---|---|---|---|
| S | Haiku | ≈ 0,04 USD (≈ 0,08 %) | 1 Workflow (Haiku-Median) |
| M | Haiku | ≈ 0,1 bis 0,3 USD (E0-Kundschafter, wird nachgetragen) | 6 |
| L | Opus / Bildsätze / Sichtabnahme | ≈ 2,7 USD je frischem Opus-Agent (≈ 5 %) | 1 Workflow (Opus-Median) |

## Protokoll (alle 30 Minuten eine Zeile)
Uhrzeit · Fenster Verbrauch, Soll, Ziel · Woche Verbrauch, Spielraum · belegte Plätze · Gas/Halten/Bremse · Quelle
- 2026-10-26 22:40 MEZ · Fenster ? (seit 18:30 UTC), Soll ?, Ziel 95 nach Kalibrierung · Woche ? · Plätze: Runde-5-Workflow (bis 13 Haiku gleichzeitig, vor dem Auftrag gestartet) · Halten mit halben Plätzen (2) für neue Pakete · Quelle: keine, Werkzeug folgt
- 2026-10-27 05:31 MEZ · Fenster ? (Werkzeug im Bau), Ziel 95 nach Kalibrierung · Woche ? · Plätze 2 Haiku (Workflow wf_96d3a16e-a1b) plus Messreihe · Halten · Quelle: keine
- 2026-10-27 06:05 MEZ · Fenster 29,9 % (Soll 84,9 %, Ziel 95 %), Fenster 00:31–05:31 UTC · Woche ? · Plätze: Messreihe läuft, Haiku frei · Gas · Quelle Schätzung (Faktor 1,973)
- 2026-10-27 06:30 MEZ · Fenster 48,0 % (Soll 93,7 %, Ziel 95 %), Fenster 00:31–05:31 UTC · Woche ? · Plätze 2 Haiku (L0 Runde 2, UM-E2-SVGO) plus Messreihe · Gas · Quelle Schätzung (Faktor 1,973)
- 2026-10-27 07:00 MEZ · Fenster 16,0 % (Soll 7,8 %, Ziel 95 %), Fenster 05:31–10:31 UTC · Woche ? · Plätze 1 Haiku (Workflow PX) plus Reinraum · Bremse: keine neuen Agenten bis zur Soll-Linie, Opus-Arbeit auf Abnahmen beschränkt · Quelle Schätzung (Faktor 1,973)
- 2026-10-27 07:31 MEZ · Fenster 26,5 % (Soll 19,0 %, Ziel 95 %), Fenster 05:31–10:31 UTC · Woche ? · Plätze 1 Haiku (U04, Workflow) · Bremse: ein Platz, keine Opus-lastige Arbeit · Quelle Schätzung (Faktor 1,973)
- 2026-10-27 08:31 MEZ · Fenster 50,7 % (Soll 37,9 %, Ziel 95 %), Fenster 05:31–10:31 UTC · Woche ? · Plätze 1 Haiku (UM-E3-SVG) plus E2-B-Messreihe · Bremse: keine weiteren Agenten, eigene Arbeit auf Abnahmen beschränkt · Quelle Schätzung (Faktor 1,973)
- 2026-10-27 10:50 MEZ · **Kalibrierpunkt (Limit-Ereignis, L5):** Die Sitzung meldete um 08:30 UTC „session limit · resets 9:30am (UTC)“. Der Auftraggeber hat das Limit bestätigt.
  - Fenster 04:30–09:30 UTC = 100 %, gewichtete Kosten 40,64 USD, neuer Faktor 2,461 %/USD (vorher 1,973). Ein Fenster entspricht damit etwa 40,6 USD statt 50,7.
  - Die Schätzung lag beim Limit bei rund 53 %. Der alte Faktor kam aus einem Fenster mit anderem Modellmix (mehr Haiku-Workflows) und war zu niedrig.
  - Die Fensterkette lief zudem eine Stunde versetzt (05:31 statt 04:30); der neue Anker 09:30 korrigiert das.
  - Z-12: Das ist ein Kalibrierpunkt ohne Messwert; ein solches Limit-Ereignis ist erlaubt.
  - Folge: Tempomat mit 2,461 %/USD; Kapazität im PLAN (≈ 48 USD je Fenster zu 95 %) sinkt auf ≈ 38,6 USD; Neuberechnung am Etappentor E2.
- 2026-10-27 11:00 MEZ · Fenster 25,3 % (Soll 8,3 %, Ziel 95 %), Fenster 09:32–14:32 UTC (Kette ab dem Kalibrierpunkt 09:30, Werkzeug korrigiert) · Woche ? · Plätze 0 Haiku, Gegenprobe der Specs läuft · Bremse: wenige gebündelte Schritte, keine neuen Agenten bis zur Soll-Linie · Quelle Schätzung (Faktor 2,461)
- 2026-10-27 11:31 MEZ · Fenster 32.0 % (Soll 18.6 %, Ziel 95 %) 2026-10-27 09:32–2026-10-27 14:32 UTC · Woche ? % · Bremse · Quelle Schätzung (Faktor 2.461, Stand 2026-10-27) · Plätze 0 Haiku, Nachprüfung der Specs läuft
- 2026-10-27 12:45 MEZ · Fenster 76.0 % (Soll 42.0 %, Ziel 95 %) 2026-10-27 09:32–2026-10-27 14:32 UTC · Woche ? % · Bremse · Quelle Schätzung (Faktor 2.461, Stand 2026-10-27) · Plätze 2 Haiku (Workflow UM-E2-B: Höhe, Bericht) · Bremse: Nachmessung Anlauf 2 nur mit Haiku, eigene Schritte gebündelt
- 2026-10-27 13:45 MEZ · Fenster 83.0 % (Soll 60.6 %, Ziel 95 %) 2026-10-27 09:32–2026-10-27 14:32 UTC · Woche ? % · Bremse · Quelle Schätzung (Faktor 2.461, Stand 2026-10-27) · Plätze 1 Haiku (Messer Anlauf 2) · Bremse: nur Haiku-Messung, keine eigenen Läufe
- 2026-10-27 15:47 MEZ · **Zweites Limit-Ereignis, Kalibrierpunkt.**
  - Gegen 13:00 UTC meldete die Sitzung „You've hit your session limit · resets 2:30pm (UTC)“. Die Schätzung zeigte um 12:43 UTC 83 %.
  - Kalibriert: Fenster 09:30–14:30 UTC, 34,14 USD = 100 %, Faktor 2,929 %/USD (vorher 2,461).
  - Z-12: Kalibrierpunkt ohne Messwert. Das Limit lag nicht im Endspurt; die Ursache ist der zu niedrige Faktor.
  - Lehre (L6): Bis zwei Fenster ohne Limit enden, plant der Tempomat mit Ziel 85 statt 95. Haiku-Workflows mit vielen Agenten zählen voll in das Fenster.
  - Neues Fenster 14:31–19:31 UTC: 16,5 % um 14:40 UTC (Soll 3 %), Bremse. Messungen laufen als Skript ohne Agenten.
- 2026-10-27 16:57 MEZ · Fenster 33,9 % (Soll 27,2 %, Ziel für die Planung 85 %) 14:31–19:31 UTC · Woche ? · Plätze 0 Haiku (zwei Auswertungen fertig), Suite läuft · Bremse (knapp über Soll)
- 2026-10-27 18:15 MEZ ·  · Plätze 1 Haiku (LCP-K) · Bremse beachtet: ZUST-M eigene Arbeit, eine Messreihe nach der anderen
- 2026-10-27 20:35 MEZ · **Drittes Limit-Ereignis, Kalibrierpunkt.** (Berichtigung der Zeile „18:15 MEZ“: richtig 17:45 MEZ, Fensterwert fehlte, weil das Werkzeug nach dem Neustart über 3 min las.)
  - Gegen 16:46 UTC brach der Haiku-Kundschafter LCP-K mit „You've hit your session limit · resets 7:30pm (UTC)“ ab. Die Schätzung lag um 15:56 UTC bei 33,9 %, der Faktor 2,929 war also wieder zu niedrig.
  - Kalibrierung: Fenster 14:30–19:30 UTC = 100 % (Faktor folgt in der nächsten Zeile).
  - Z-12: Kalibrierpunkt ohne Messwert. Das Limit lag nicht im Endspurt.
  - Arbeitshypothese zur Ursache: Die Schätzung rechnet in USD. Jeder Werkzeugaufruf des Orchestrators liest den sehr großen Gesprächskontext neu (Cache-Lesen, günstig in USD, teuer im Limit). Die Fehlschätzung wächst mit der Gesprächslänge.
  - Lehre (L6):
    - Eigene Werkzeugaufrufe bündeln, wenige große Schritte.
    - Planungsziel 60, bis ein Fenster ohne Limit endet.
    - Arbeit mit eigenem kleinem Kontext an frische Haiku-Agenten.
    - Messungen als Skripte.
  - Kalibrierung ausgeführt: Kalibrierpunkt gespeichert: Fenster 2026-10-27 14:30–2026-10-27 19:30 UTC · Kosten $16.33 · 100 % · Faktor 6.122 · Quelle limit · Stand 2026-10-27
- 2026-10-27 21:31 MEZ · Schätzung nicht erhalten (Werkzeug über 280 s) · Plätze 0 Haiku (LCP-K fertig), Prüfkette ZUST-M als Skript · Planungsziel 60
- 2026-10-27 22:31 MEZ · Fenster 93.4 % (Soll 38.2 %, Ziel 95 %) 2026-10-27 19:30–2026-10-28 00:30 UTC · Woche ? % · Bremse · Quelle Schätzung (Faktor 6.122, Stand 2026-10-27) · Plätze 1 Haiku (TBT-Auswertung) · Planungsziel 60, gebündelte Schritte
- 2026-10-27 22:36 MEZ · **Pause bis zum Fensterwechsel.**
  - Die Schätzung mit dem neuen Faktor 6,122 zeigt 93,4 % um 21:35 UTC (Soll 38,2 %). Bei dieser Lage käme das vierte Limit vor dem Fensterende 00:30 UTC; Z-12 erlaubt das nur im Endspurt.
  - Deshalb ist die Haiku-Auswertung UM-E3-TBT angehalten; ihre Arbeit ist gespeichert und wird mit SendMessage fortgesetzt.
  - Die Routine WEITER antwortet bis 00:30 UTC nur knapp.
  - Ab 00:30 UTC: TBT-Auswertung fortsetzen, dann UM-E3-MOD.
- 2026-10-28 06:16 MEZ · Schätzung nicht erhalten (Werkzeug nach dem Neustart über 400 s) · Fenster 00:30–05:30 UTC fast ungenutzt: Der Plan-Modus wartete von 00:35 bis 05:05 UTC auf Freigabe, WEITER 01:31 bis 04:31 UTC ohne Arbeit · Plätze 0 Haiku (TBT fertig) · Planungsziel 60, gebündelte Schritte
- 2026-10-28 07:10 MEZ · Schätzung nicht erhalten (Werkzeug nach dem Neustart über 400 s, nicht erneut gestartet) · neues Fenster ab 05:30 UTC · Plätze 0 Haiku · UM-E3-MOD in wenigen großen Schritten (8 Dateien in zwei Aufrufen, Prüfkette als ein Hintergrundskript) · Planungsziel 60
- 2026-10-28 08:31 MEZ · Schätzung nicht erhoben (Werkzeug zu langsam nach Neustart) · Fenster seit 05:30 UTC · Plätze 0 (Opus-Baumeister UM-E3-EIN fertig: 436 Tsd. Tokens, 120 Aufrufe, 33 min) · Prüfkette als Skript · Planungsziel 60
- 2026-10-28 09:31 MEZ · Fenster 122,9 % (Soll 47,3 %) 05:53–10:53 UTC · Woche ? % · Quelle Schätzung (Faktor 6,122) · Plätze 1 Workflow UM-E3-ZUST (3 Agenten, davon 1 Haiku) · Bremse
  - Ein Limit ist bis jetzt nicht erreicht. Der Faktor 6,122 schätzt also mindestens 23 % zu hoch, sobald der eigene Kontext klein bleibt und Arbeit an frische Agenten geht (L6 wirkt). Ein Kalibrierpunkt entsteht daraus nicht: Es gibt weder ein Limit noch einen Messwert.
  - Folge bis zum Fensterende 10:53 UTC: nur der laufende Workflow, die Übernahme seines Diffs und die Prüfkette als Skript. Kein neues großes Paket. Danach weiter mit Planungsziel 60.
- 2026-10-28 10:25 MEZ · Schätzung nicht erneut erhoben (letzter Wert 122,9 % um 08:31 UTC ohne Limit) · Workflow UM-E3-ZUST fertig: 3 Agenten, 576 Tsd. Tokens, 18 min · Pause bis 10:53 UTC (Fensterende laut Werkzeug), danach Planungsziel 60
- 2026-10-28 12:32 MEZ · **Ein Fenster endet ohne Limit:** 05:53 bis 10:53 UTC.
  - Die Schätzung zeigte um 10:35 UTC 184,6 % (Faktor 6,122). Der Faktor schätzt seit L6 also um mindestens das 1,85-Fache zu hoch: wenig eigener Kontext, Arbeit an frische Agenten, Messungen als Skript.
  - Ein Kalibrierpunkt entsteht nicht, weil weder ein Limit noch ein Messwert vorliegt. Die Schätzung gilt bis zur nächsten Kalibrierung nur als obere Schranke.
  - Folge nach L6 („Planungsziel 60, bis ein Fenster ohne Limit endet“): Das Planungsziel steigt wieder auf 85.
  - Plätze: 1 Workflow UM-E3-W3 (CURSOR fertig mit Prüfung und Nacharbeit, SCROLL läuft).
- 2026-10-28 13:43 MEZ · Schätzung nicht erhoben (nur obere Schranke, E-083-Lage unverändert) · Plätze 1 Workflow UM-E3-W3 (2 von 4 Paketen fertig, 8 Agenten) · Planungsziel 85
- 2026-10-28 14:46 MEZ · Schätzung nicht erhoben (nur obere Schranke) · Plätze 1 Workflow UM-E3-W3 (3 von 4 Paketen fertig, 12 Agenten) · Planungsziel 85
- 2026-10-28 15:33 MEZ · Workflow UM-E3-W3 fertig: 16 Agenten, 4,24 Mio. Tokens, 994 Aufrufe, 3 h 19 min · kein Limit · Prüfkette als Skript · Planungsziel 85
  - Lehre (L6): Die Prüfketten brauchen freien Speicher in der Sitzung. Jeder Reinraum belegt mit `node_modules` und `.next` mehrere hundert MB; alte Reinräume nach der Abnahme löschen. Die Kette bricht jetzt unter 6 GB frei ab.
- 2026-10-28 16:33 MEZ · Schätzung nicht erhoben (nur obere Schranke) · Plätze 0 Agenten, Nachlauf als Skript · Planungsziel 85
- 2026-10-28 17:31 MEZ · Schätzung nicht erhoben (nur obere Schranke) · Plätze 1 Workflow UM-E3-LEISTUNG (bis 4 Agenten) · Planungsziel 85
- 2026-10-28 18:31 MEZ · Workflow UM-E3-LEISTUNG fertig: 4 Agenten, 1,09 Mio. Tokens, 74 min · Messung als Skript · Planungsziel 85
- 2026-10-28 19:31 MEZ · Schätzung nicht erhoben (nur obere Schranke) · Plätze 1 Workflow UM-E3-SICHT (2 Opus-Prüfer) · Planungsziel 85
- 2026-10-28 20:31 MEZ · Schätzung nicht erhoben (nur obere Schranke) · Plätze 1 Workflow UM-E3-FIX (bis 8 Agenten, Opus) · Planungsziel 85
- 2026-10-28 21:40 MEZ · **Viertes Limit-Ereignis, Kalibrierpunkt.** Gegen 20:3x MEZ brach der Baumeister von UM-E3-FIX Teil B ab („resets 8:30pm (UTC)“). Das Fenster endete um 20:30 UTC.
  - Kalibrierung: Fenster 15:30–20:30 UTC = 100 %, Quelle limit (`kontingent.mjs --kalibrieren`, läuft im Hintergrund, Faktor folgt in der nächsten Zeile).
  - Z-12: Kalibrierpunkt ohne Messwert. Das Limit kam mitten in einem Workflow mit bis zu 8 Opus-Agenten, die Schätzung war seit 13:43 MEZ nicht erhoben.
  - Lehre (L6, ergänzt): Ein Workflow mit vielen Opus-Agenten verbraucht das Fenster schnell. Die Schätzung muss vor jedem solchen Workflow erhoben werden, und die Prüfer laufen als Sonnet, wo das Urteil es zulässt.
  - Folge nach L6: Das Planungsziel sinkt wieder auf 60, bis ein Fenster ohne Limit endet.
  - Plätze: 1 Workflow UM-E3-FIX (Teil A aus dem Zwischenspeicher, Teil B läuft).
  - Kalibrierung ausgeführt: Kalibrierpunkt gespeichert: Fenster 2026-10-28 15:30–2026-10-28 20:30 UTC · Kosten $78.75 · 100 % · Faktor 1.27 · Quelle limit · Stand 2026-10-28
  - Deutung: Der Faktor fällt von 6,122 auf 1,27 %/USD, weil das Fenster fast ganz aus Opus-Agenten mit kleinem eigenem Kontext bestand. Die USD-Schätzung bildet das Limit also je nach Arbeitsart sehr verschieden ab: Mein großer Kontext ist billig in USD, aber teuer im Limit; frische Agenten sind teurer in USD, aber billiger im Limit. Ab jetzt gilt der neue Faktor als Schätzung für Workflow-Fenster und 6,122 als Schranke für Fenster mit viel eigener Arbeit.
- 2026-10-28 22:31 MEZ · Schätzung nicht erhoben (Werkzeug liest über 5 min; nach dem neuen Faktor 1,27 bleibt das Fenster 20:30–01:30 UTC bei einem Workflow unter dem Planungsziel) · Plätze 1 Workflow UM-E3-FIX (Teil B Nacharbeit, 1 Agent) · Planungsziel 60
- 2026-10-28 23:31 MEZ · Workflow UM-E3-FIX fertig: 8 Agenten (Teil A aus dem Zwischenspeicher), 1,19 Mio. Tokens, 343 Aufrufe, 76 min · Prüfkette als Skript · Schätzung nicht erhoben · Plätze 0 Agenten · Planungsziel 60
- 2026-10-28 23:57 MEZ · Schätzung 40,6 % (Soll 45, Fenster 20:34–01:34 UTC, Faktor 1,27) · Halten · Plätze 1 Workflow UM-E3-SICHT Anlauf 2 (2 Opus-Prüfer, wf_83666fef-b8b) · Planungsziel 60
- 2026-10-29 00:31 MEZ · Workflow Sicht Anlauf 2 fertig: 2 Opus-Prüfer, 0,52 Mio. Tokens, 7 min · Schätzung nicht erhoben (letzte 40,6 % um 23:57 MEZ, seitdem Sicht und Start von FIX2) · Plätze 1 Workflow UM-E3-FIX2 (Baumeister Opus, Prüfer Sonnet) · Planungsziel 60
- 2026-10-29 06:20 MEZ · Neustart der Umgebung gegen 00:45 MEZ; WEITER 00:31 bis 04:31 UTC ohne Arbeit (Plan-Modus wartete auf Freigabe) · Fenster 01:34–06:34 UTC fast ungenutzt · Schätzung läuft im Hintergrund · Plätze 1 Workflow UM-E3-FIX2 (bau:A neu, Opus) · Planungsziel 60
- 2026-10-29 06:31 MEZ · Schätzung 4,7 % (Soll 52, Fenster 02:31–07:31 UTC, Faktor 1,27) · Gas · Plätze 1 Workflow UM-E3-FIX2 (bau:A, Opus) · Planungsziel 60
- 2026-10-29 07:31 MEZ · Schätzung nicht erhoben (4,7 % um 06:15 MEZ, seitdem ein Opus-Baumeister) · Plätze 1 Workflow UM-E3-FIX2 (Teil A: 2 Sonnet-Prüfer) · Planungsziel 60
- 2026-10-29 08:31 MEZ · Schätzung läuft im Hintergrund (Fenster ab 07:31 UTC neu) · Plätze 1 Workflow UM-E3-FIX2 (bau:B, Opus) · Planungsziel 60
- 2026-10-29 09:31 MEZ · Fenster 02:31–07:31 UTC endete bei 65,9 % (Schätzung, Faktor 1,27; Workflow UM-E3-FIX2: 8 Agenten, 2,64 Mio. Tokens, 2 h 45 min) · neues Fenster ab 07:31 UTC · Plätze 0 Agenten, Prüfkette als Skript · Planungsziel 60
- 2026-10-29 10:20 MEZ · Schätzung 19,6 % (Soll 33,1, Fenster 07:31–12:31 UTC, Faktor 1,27) · Gas · Plätze 2 Workflows: UM-E3-SICHT Anlauf 3 (2 Opus), UM-E3-TAKT (Opus-Baumeister, Sonnet-Prüfer) · Planungsziel 60
- 2026-10-29 10:31 MEZ · Workflow Sicht Anlauf 3 fertig (2 Opus, 0,52 Mio. Tokens, 9 min) · Schätzung nicht erhoben (19,6 % um 10:16 MEZ) · Plätze 2 Workflows: UM-E3-TAKT (Opus), E4-W1 (3 Haiku + 3 Sonnet) · Planungsziel 60
- 2026-10-29 12:37 MEZ · **Fünftes Limit-Ereignis, Kalibrierpunkt.** Gegen 10:5x UTC brach der Baumeister von UM-E3-TAKT ab („resets 11:30am UTC“). Davor liefen zwei Opus-Workflows gleichzeitig (Sicht 3 und TAKT) neben E4-W1. WEITER 10:31 UTC fiel aus.
  - Kalibrierung: Fenster 06:30–11:30 UTC = 100 %, Quelle limit (läuft im Hintergrund).
  - Lehre (L6, ergänzt): nie zwei Opus-Workflows gleichzeitig; vor jedem Workflow schätzen; Prüfer Sonnet oder Haiku. Die Schätzung um 10:16 MEZ (19,6 % für das Fenster ab 07:31 UTC) lag daneben, weil die Fenstergrenzen des Werkzeugs (Raster :31) nicht zu den echten Fenstern (:30 nach dem Limit) passen.
  - Plätze: 1 Workflow UM-E3-TAKT (Opus-Baumeister, Sonnet-Prüfer). Planungsziel 60.
- 2026-10-29 13:35 MEZ · Kalibrierung fünftes Limit: Fenster 06:30–11:30 UTC · Kosten $66.00 · 100 % · Faktor 1,515 (vorher 1,27) · Plätze 1 Workflow UM-E3-TAKT (bau:takt läuft) · Planungsziel 60
- 2026-10-29 14:34 MEZ · Schätzung 29,7 % (Soll 38,2, Fenster 11:31–16:31 UTC, Faktor 1,515) · Gas · Plätze 1 Workflow UM-E4-VORL (Opus-Baumeister, 2 Sonnet-Prüfer) · Planungsziel 60
- 2026-10-29 15:04 MEZ · Schätzung nicht erhoben (29,7 % um 13:4x MEZ) · Plätze 1 Workflow UM-E4-VORL (bau läuft) · Speicher 4,0 GB frei (Baukopien des Baumeisters) · Planungsziel 60
- 2026-10-29 18:13 MEZ · **Sechstes Limit-Ereignis.** Die Nacharbeit von UM-E4-VORL brach ab („resets 4:30pm UTC“). Das Fenster endete um 16:30 UTC; die Schätzung um 13:4x MEZ stand bei 29,7 % mit Faktor 1,515. Der VORL-Workflow (Opus-Baumeister mit 1,6 Mio. Tokens) verbrauchte das Fenster allein.
  - Kalibrierung folgt im Hintergrund.
  - Plätze: 1 Workflow (VORL-Nacharbeit). Planungsziel 60.
- 2026-10-29 19:49 MEZ · Kalibrierpunkt sechstes Limit: Fenster 11:30–16:30 UTC · Kosten $78.80 · 100 % · Faktor 1,269 · Workflow VORL fertig (4 Agenten, 1,96 Mio. Tokens) · Plätze 0 Agenten, Prüfkette als Skript · Planungsziel 60
- 2026-10-29 20:01 MEZ · Neustart der Umgebung um etwa 19:5x MEZ, Prüfkette VORL ab den Servern fortgesetzt (Skript, kein Agent) · Fenster 16:30–21:30 UTC · Plätze 0 Agenten · Planungsziel 60
