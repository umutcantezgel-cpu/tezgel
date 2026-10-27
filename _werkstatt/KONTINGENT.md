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
