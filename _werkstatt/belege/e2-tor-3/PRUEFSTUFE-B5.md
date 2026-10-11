# PRUEFSTUFE B5 · E2-Tor Anlauf 2 (Belege)

- Stand (Commit): 5324b62 (Reinraum-Build, Ausgangslage Bildsatz und Bewegung); Vergleichs-Server 745335f auf Port 4310 (Lighthouse-Grundlage)
- Datum: 2026-10-11
- Server: 5324b62 auf 127.0.0.1:4312 (HTTP 200), 745335f auf 127.0.0.1:4310 (HTTP 200)
- Protokoll Bildsatz: Einwilligung abgelehnt, reducedMotion reduce, DPR 1, Dev-Overlay ausgeblendet, max. 12 Ausschnitte, JPEG q70

## 1. Reinraum-Ergebnis (wörtlich)

```
commit 5324b62
npm-ci 0 (39s)
build 0 (53s)
typecheck 0 (20s)
lint 0 (42s)
test 0 (2s)
qa-graph 0 (0s)
```

Weitere Prüfung im Reinraum: nft-Tracing ohne _relaunch/_werkstatt (sauber). Testlauf: 35 bestanden, 0 fehlgeschlagen. Lint und Typecheck ohne Meldungen. Ausgabe der Routentabelle: reinraum/routen.txt.

## 2. Bildsatz (Schritt 3) · Seiten / und /kontakt

Zusammenfassung: Aufnahmen 65, Fehler 0, nicht 200: 0, Überlauf-Befunde 0, Überlappungs-Befunde 0, Konsolenmeldungen 0

| Ansicht | Seite | HTTP | Höhe (px) | Aufnahmen | Konsole | Überlauf | Überlappung | Fehler | Fremd |
|---|---|---|---|---|---|---|---|---|---|
| d1440 | / | 200 | 15807 | 12 | 0 | 0 | 0 | – | 0 |
| d1440 | /kontakt | 200 | 6947 | 8 | 0 | 0 | 0 | – | 0 |
| m390 | / | 200 | 27717 | 12 | 0 | 0 | 0 | – | 0 |
| m390 | /kontakt | 200 | 11853 | 12 | 0 | 0 | 0 | – | 0 |
| t768 | / | 200 | 21083 | 12 | 0 | 0 | 0 | – | 0 |
| t768 | /kontakt | 200 | 8954 | 9 | 0 | 0 | 0 | – | 0 |

Belege: bilder/bildsatz.json

## 3. Ersatzpfad ohne Scroll-Animationen und View Transitions (Schritt 4) · Seite /

Zusammenfassung: Aufnahmen 36, Fehler 0, nicht 200: 0, Überlauf-Befunde 0, Überlappungs-Befunde 0, Konsolenmeldungen 0

| Ansicht | Seite | HTTP | Höhe (px) | Aufnahmen | Konsole | Überlauf | Überlappung | Fehler | Fremd |
|---|---|---|---|---|---|---|---|---|---|
| d1440 | / | 200 | 15807 | 12 | 0 | 0 | 0 | – | 0 |
| m390 | / | 200 | 27717 | 12 | 0 | 0 | 0 | – | 0 |
| t768 | / | 200 | 21083 | 12 | 0 | 0 | 0 | – | 0 |

Belege: bilder-ersatz/bildsatz.json

## 4. Bewegung · Einzelbilder (Schritt 5a), Seite /

| Ansicht | Kennungen | Elemente | Auslöser | Ausgelöst | Animationen | Längste Dauer | Bilder | Befunde |
|---|---|---|---|---|---|---|---|---|
| d1440 | sig-kreuzlinie | 2 | seite | 0 | 1 | 1200 ms | 5 | 0 |
| m390 | sig-kreuzlinie | 2 | seite | 0 | 1 | 1200 ms | 5 | 0 |

## 5. Bewegung · Bildrate, Register, reduziert (Schritte 5b–c), Seite /

| Lauf | Kennzahl | Wert |
|---|---|---|
| bildrate (4× CPU, m390, 3 Wiederholungen) | Bilder gesamt | 4036 |
| bildrate | verworfene Bilder | 4 (0.1 %) |
| bildrate | Long Animation Frames | 3, Summe 172 ms |
| register | gefundene Kennungen | anriss, aufklappen, auftritt, druck, sig-kreuzlinie, zustand |
| register | unbekannte Kennungen | 0 |
| register | im Register, aber nicht im DOM von / | 10: sig-flucht, szene-ablauf, sig-plan, einzugsband, verband, fugenband, leitachse, notiert, laden, seitenwechsel |
| register | Animationen ohne data-motion | 0 |
| register | Hover geprüft / Fehler | 20 / 0 |
| register | Tab-Schritte / Fokus verschieden | 30 / 29 |
| reduziert | geprüft (Elemente) | 210 |
| reduziert | Bewegungsbefunde | 0 |
| reduziert | nicht sichtbar (Einträge) | 22 |

Unsichtbar unter reduce, nach Grund: zustand (display none): 2; druck (display none): 2; aufklappen (display none): 1; sig-kreuzlinie (display none): 1; druck (Deckkraft 0.40): 1; anriss (außerhalb des Dokuments): 15

## 6. Auffälligkeiten

- Bildsatz: keine Befunde in Überlauf, Überlappung und Konsole, alle Seiten und Ansichten HTTP 200.
- Bildsatz /kontakt d1440 und t768: Aufnahme 07 (d1440) ist am Seitenende verschoben (y 6300 → wirksam 6047); erwartbarer Klemmeffekt.
- sig-kreuzlinie hat den Auslöser "seite" (Auslösung beim Laden). Daher ausgelöst = 0 ist erwartet. Befund je Ansicht leer.
- reduziert: 0 Bewegungsbefunde. Die Einträge unter "nicht sichtbar" sind 15 Anriss-Elemente (mark) außerhalb des Dokuments, eine Mobilmenü-Box, Schaltflächen mit display none sowie ein Druck-Button mit Deckkraft 0.40. Zur Sichtung, kein Befund des Werkzeugs.
- bildrate: 4 von 4036 Bildern verworfen (0.1 %), 3 Long Animation Frames mit zusammen 172 ms. Das Werkzeug weist für diesen Lauf keinen Befund aus.
- Register: 10 Kennungen sind im Register, aber auf / nicht im DOM (u. a. notiert, laden, seitenwechsel, die laut Werkzeug nicht auslösbar sind). Ob das ein Befund ist, entscheidet die Sichtung. Namensabweichung zur Auslöser-Tabelle des Werkzeugs: szene-ablauf (Register) gegenüber sig-ablauf.
- Werkzeug: server.sh start 5324b62 (Port 4312) lief nach erfolgreichem Start nicht zurück und blockierte die Shell (ca. 400 s, Wrapper-Prozess verwaist). Der Server selbst lief (HTTP 200). Der Wrapper wurde beendet. Port 4310 wurde danach einzeln gestartet, ohne Hänger.

## 7. Bildpfade für die Sichtabnahme (je Seite und Ansicht, in Reihenfolge)

- d1440 · /: /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/d1440/start/00.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/d1440/start/01.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/d1440/start/02.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/d1440/start/03.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/d1440/start/04.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/d1440/start/05.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/d1440/start/06.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/d1440/start/07.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/d1440/start/08.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/d1440/start/09.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/d1440/start/10.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/d1440/start/11.jpg
- d1440 · /kontakt: /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/d1440/kontakt/00.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/d1440/kontakt/01.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/d1440/kontakt/02.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/d1440/kontakt/03.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/d1440/kontakt/04.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/d1440/kontakt/05.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/d1440/kontakt/06.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/d1440/kontakt/07.jpg
- m390 · /: /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/start/00.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/start/01.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/start/02.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/start/03.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/start/04.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/start/05.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/start/06.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/start/07.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/start/08.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/start/09.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/start/10.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/start/11.jpg
- m390 · /kontakt: /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/kontakt/00.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/kontakt/01.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/kontakt/02.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/kontakt/03.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/kontakt/04.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/kontakt/05.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/kontakt/06.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/kontakt/07.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/kontakt/08.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/kontakt/09.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/kontakt/10.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/m390/kontakt/11.jpg
- t768 · /: /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/t768/start/00.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/t768/start/01.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/t768/start/02.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/t768/start/03.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/t768/start/04.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/t768/start/05.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/t768/start/06.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/t768/start/07.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/t768/start/08.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/t768/start/09.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/t768/start/10.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/t768/start/11.jpg
- t768 · /kontakt: /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/t768/kontakt/00.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/t768/kontakt/01.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/t768/kontakt/02.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/t768/kontakt/03.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/t768/kontakt/04.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/t768/kontakt/05.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/t768/kontakt/06.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/t768/kontakt/07.jpg, /home/user/tezgel/_werkstatt/belege/e2-tor-3/bilder/t768/kontakt/08.jpg

Bewegungsbilder: bewegung/sig-kreuzlinie-d1440/sig-kreuzlinie-0.jpg bis -4.jpg; bewegung/sig-kreuzlinie-m390/sig-kreuzlinie-0.jpg bis -4.jpg (Zeitpunkte 0/25/50/75/100 %).

---
## Vermerk des Orchestrators (nach der Rückgabe)
- Ersatzpfad-Bilder (`bilder-ersatz/`): laut Sichtabnahme alle 36 Aufnahmen pixelgleich zum Bildsatz, weil beide Läufe mit reduzierter Bewegung aufgenommen sind. Committet ist nur `bilder-ersatz/bildsatz.json`; die gleichen JPEGs liegen nicht doppelt im Repo. Der Lauf wird mit normaler Bewegung wiederholt, sobald E3-PRUEF-W1 das Werkzeug angepasst hat.
- `LIGHTHOUSE.md` schreibt der Orchestrator aus der Rückgabe von E2-PRUEF-L1 (Prüfer schreiben keine Berichtsdateien).
