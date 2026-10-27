# KONTINGENT · Tempomat nach Abschnitt 12

Quelle: `~/.claude/kontingent.json` fehlt in dieser Cloud-Umgebung. Bis eine Meldung (Befehl KONTINGENT) oder ein Messwert vorliegt, gilt die Schätzung des Kontingent-Werkzeugs (`werkzeuge/kontingent.mjs`, E0-Ergänzung), kalibriert an Limit-Ereignissen.

## Kalibrierpunkte
| Zeit (UTC) | Art | Fenster | Woche | Beleg |
|---|---|---|---|---|
| 2026-10-26 ≈ 16:4x | Limit-Ereignis „session limit · resets 6:30pm (UTC)“ | 100 % (Fensterende 18:30 UTC, Beginn ≈ 13:30 UTC) | unbekannt | 13 Widerleger von wf_5eafaa08-272 fielen aus (`ENTSCHEIDUNGEN.md` E-065, Runde 4) |

## Kosten je Klasse (gleitender Mittelwert, Token gewichtet nach Listenpreis)
| Klasse | Modell | Mittelwert | Stichproben |
|---|---|---|---|
| S | Haiku | offen | 0 |
| M | Haiku | offen | 0 |
| L | Opus / Bildsätze / Sichtabnahme | offen | 0 |

## Protokoll (alle 30 Minuten eine Zeile)
Uhrzeit · Fenster Verbrauch, Soll, Ziel · Woche Verbrauch, Spielraum · belegte Plätze · Gas/Halten/Bremse · Quelle
- 2026-10-26 22:40 MEZ · Fenster ? (seit 18:30 UTC), Soll ?, Ziel 95 nach Kalibrierung · Woche ? · Plätze: Runde-5-Workflow (bis 13 Haiku gleichzeitig, vor dem Auftrag gestartet) · Halten mit halben Plätzen (2) für neue Pakete · Quelle: keine, Werkzeug folgt
- 2026-10-27 05:31 MEZ · Fenster ? (Werkzeug im Bau), Ziel 95 nach Kalibrierung · Woche ? · Plätze 2 Haiku (Workflow wf_96d3a16e-a1b) plus Messreihe · Halten · Quelle: keine
