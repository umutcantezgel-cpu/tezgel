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
