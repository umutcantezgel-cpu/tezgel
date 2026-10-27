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
