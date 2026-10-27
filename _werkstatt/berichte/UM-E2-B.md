# UM-E2-B · Etappentor E2 · Prüfstufe B · Vergleich E2-Endstand 6caeeb9c gegen E0 7ceb5e41

UM-E2-B-BERICHT · Rolle Dokumentar · Modell Haiku 5.5 · Stufe 1 · Kostenklasse S · Stand 27.10.2026

Grundlage sind die geprüften Ergebnisse je Messgröße (Vergleich mit Gegenprüfung) und die Höhenprobe. Der Dokumentar hat die Schlüsselwerte an den JSON-Belegen nachgerechnet: Lighthouse (240 Mediane und die Schwellenzählung), axe (84 Läufe), Bildsatz (48 Läufe), Pixel (48 Paare), Reaktion (Mediane und Commit), Bildrate (Mediane), Register (24 Dateien), Höhenprobe (40 Läufe) und Stufe A (test.log). Die nachgerechneten Werte stimmen. Korrekturen der Gegenprüfung sind übernommen und in Abschnitt 6 vermerkt.

**Abweichung vom Auftrag (Messstand).** Die E2-Reaktion wurde auf 3d481570 mit ungesicherten Änderungen gemessen (E0: ee39c956, sauber). Die E2-Bewegungsdaten (07:55 bis 08:33) stammen wahrscheinlich aus einem Stand nach 3d481570. Die übrigen E2-Belege stammen vom Server 4314 aus reinraum-6caeeb9c. Die JSON-Dateien nennen keinen Commit; die Zuordnung beruht auf Port, Feld satz und Serverprotokollen.

**Gesamtlage:** Erfüllt sind Z-02 Stufe A (Endstand) und Z-11. Nicht erfüllt sind Z-03, Z-09 und Z-10. Nicht bestätigt sind Z-06 und Z-07.

## 2 Übersicht

| Kriterium | Schwelle | erfüllt | Beleg |
|---|---|---|---|
| Z-02 Stufe A (ohne Suite) | Build, Typen, Linter, Tests mindestens so grün wie E0; npm test 210 von 210 | ja (Endstand); U01 bis U03 nicht belegt | reinraum-Logs 6caeeb9c; UM-E2-U04 bis U07 |
| Z-03 Stack | Aktualität, LTS, 0 hoch/kritisch mit Fix, 0 Veraltungswarnungen, Pixel ohne unerklärte Abweichung | nein | audit.json; pixelvergleich-ende; npm-ci.log |
| Z-06 Bewegung | Register, reduziert, Bildrate (höchstens 5 %), Bildfolgen (Stufe B), Schalter (Stufe C) | nein (nicht bestätigt) | belege/um-e2/bewegung |
| Z-07 Reaktion | höchster Median höchstens 200 ms; nicht schlechter als E0 über dessen Spanne | nein (nicht bestätigt; Messstand) | reaktion.json |
| Z-09 axe | 0 ernste oder kritische Befunde; vier Größen, mit Menü und Dialog | nein (E2 24, E0 0) | axe.json |
| Z-10 Lighthouse | keine Hauptansicht schlechter als E0 über dessen Spanne (Leistung, LCP); K-012-Budgets | nein (7 Verletzungen; Budgets verfehlt) | lighthouse.json |
| Z-11 Bildsatz | kein Überlauf, keine Überlappung, keine Fehler, keine neuen Konsolenmeldungen | ja (Stufe B) | bildsatz.json |

## 3 Messgrößen

### 3.1 Lighthouse (Z-10)

Median aus drei Läufen, Spanne (min bis max) in Klammern. „Im Rahmen“ heißt schlechter, höchstens um die E0-Spanne; „schlechter“ heißt mehr. CLS steht in Rohwerten, die Datei rundet auf drei Stellen.

**Leistung (Punkte, mobil und Desktop)**

| Ansicht | mobil E0 | mobil E2 | mobil Bew. | Desktop E0 | Desktop E2 | Desktop Bew. |
|---|---|---|---|---|---|---|
| / | 92 (91–95) | 89 (89–90) | im Rahmen | 100 (100–100) | 100 (100–100) | gleich |
| /bad | 91 (91–93) | 93 (91–94) | besser | 100 (100–100) | 100 (100–100) | gleich |
| /bad/badsanierung | 90 (89–91) | 91 (90–93) | besser | 100 (100–100) | 100 (100–100) | gleich |
| /bad/barrierefreies-bad | 93 (92–94) | 91 (89–94) | im Rahmen | 100 (100–100) | 100 (100–100) | gleich |
| /leistungen | 95 (94–95) | 90 (89–91) | schlechter | 100 (100–100) | 100 (100–100) | gleich |
| /fliesen | 92 (92–92) | 93 (92–94) | besser | 100 (100–100) | 100 (100–100) | gleich |
| /balkon-terrasse | 91 (90–94) | 90 (89–94) | im Rahmen | 100 (100–100) | 100 (100–100) | gleich |
| /referenzen | 92 (92–95) | 93 (92–94) | besser | 100 (100–100) | 100 (100–100) | gleich |
| /ueber-uns | 92 (91–93) | 89 (89–94) | schlechter | 100 (100–100) | 100 (100–100) | gleich |
| /kontakt | 93 (91–93) | 94 (93–96) | besser | 100 (100–100) | 100 (99–100) | gleich |
| /standorte/wetzlar | 81 (80–82) | 80 (77–81) | im Rahmen | 100 (100–100) | 100 (100–100) | gleich |
| /blog | 87 (85–90) | 91 (87–92) | besser | 100 (100–100) | 100 (100–100) | gleich |

**LCP (ms)**

| Ansicht | mobil E0 | mobil E2 | mobil Bew. | Desktop E0 | Desktop E2 | Desktop Bew. |
|---|---|---|---|---|---|---|
| / | 3.311 (2.859–3.320) | 3.315 (3.308–3.556) | im Rahmen | 708 (706–713) | 710 (708–713) | im Rahmen |
| /bad | 3.382 (3.136–3.435) | 3.014 (3.009–3.385) | besser | 726 (719–731) | 726 (723–766) | gleich |
| /bad/badsanierung | 3.388 (3.388–3.389) | 3.084 (3.067–3.434) | besser | 701 (627–752) | 711 (704–747) | im Rahmen |
| /bad/barrierefreies-bad | 3.003 (2.980–3.240) | 3.235 (2.862–3.239) | im Rahmen | 716 (707–753) | 712 (711–722) | besser |
| /leistungen | 2.860 (2.858–2.991) | 3.315 (3.310–3.319) | schlechter | 696 (694–758) | 693 (690–694) | besser |
| /fliesen | 3.288 (3.283–3.367) | 3.067 (2.785–3.299) | besser | 715 (693–738) | 696 (694–747) | besser |
| /balkon-terrasse | 3.459 (3.014–3.636) | 3.460 (3.014–3.463) | im Rahmen | 722 (720–723) | 727 (723–788) | schlechter |
| /referenzen | 3.235 (2.863–3.236) | 3.016 (3.005–3.234) | besser | 703 (701–707) | 712 (705–774) | schlechter |
| /ueber-uns | 3.382 (3.125–3.385) | 3.385 (2.934–3.390) | im Rahmen | 701 (699–706) | 724 (689–727) | schlechter |
| /kontakt | 3.147 (3.133–3.371) | 3.061 (2.634–3.132) | besser | 699 (698–707) | 703 (650–721) | im Rahmen |
| /standorte/wetzlar | 4.517 (4.445–4.655) | 4.616 (4.595–4.645) | im Rahmen | 701 (699–741) | 744 (694–758) | schlechter |
| /blog | 3.774 (3.454–3.827) | 3.365 (3.178–3.542) | besser | 788 (785–797) | 746 (744–772) | besser |

**TBT (ms, informativ)**

| Ansicht | mobil E0 | mobil E2 | mobil Bew. | Desktop E0 | Desktop E2 | Desktop Bew. |
|---|---|---|---|---|---|---|
| / | 88 (80–146) | 208 (115–209) | schlechter | 0 (0–0) | 0 (0–0) | gleich |
| /bad | 94 (74–123) | 120 (108–129) | im Rahmen | 0 (0–0) | 0 (0–0) | gleich |
| /bad/badsanierung | 165 (105–199) | 154 (111–204) | besser | 0 (0–1) | 0 (0–0) | gleich |
| /bad/barrierefreies-bad | 107 (84–148) | 143 (136–214) | im Rahmen | 0 (0–0) | 0 (0–0) | gleich |
| /leistungen | 86 (77–91) | 184 (135–195) | schlechter | 5 (0–8) | 0 (0–0) | besser |
| /fliesen | 64 (58–68) | 94 (81–181) | schlechter | 0 (0–0) | 0 (0–1) | gleich |
| /balkon-terrasse | 77 (68–79) | 130 (78–176) | schlechter | 0 (0–0) | 0 (0–8) | gleich |
| /referenzen | 100 (43–103) | 106 (100–123) | im Rahmen | 0 (0–10) | 10 (0–25) | im Rahmen |
| /ueber-uns | 93 (65–102) | 179 (119–182) | schlechter | 0 (0–0) | 0 (0–8) | gleich |
| /kontakt | 95 (83–116) | 113 (83–122) | im Rahmen | 1 (0–3) | 14 (0–70) | schlechter |
| /standorte/wetzlar | 171 (161–232) | 219 (187–293) | im Rahmen | 0 (0–0) | 0 (0–8) | gleich |
| /blog | 145 (120–221) | 129 (128–216) | besser | 0 (0–0) | 0 (0–0) | gleich |

**CLS**

| Ansicht | mobil E0 | mobil E2 | mobil Bew. | Desktop E0 | Desktop E2 | Desktop Bew. |
|---|---|---|---|---|---|---|
| / | 0,0000 (0,0000–0,0000) | 0,0000 (0,0000–0,0000) | gleich | 0,0003 (0,0003–0,0003) | 0,0003 (0,0003–0,0003) | gleich |
| /bad | 0,0000 (0,0000–0,0000) | 0,0000 (0,0000–0,0000) | gleich | 0,0006 (0,0000–0,0006) | 0,0006 (0,0006–0,0006) | gleich |
| /bad/badsanierung | 0,0000 (0,0000–0,0000) | 0,0000 (0,0000–0,0000) | gleich | 0,0006 (0,0006–0,0006) | 0,0006 (0,0006–0,0006) | gleich |
| /bad/barrierefreies-bad | 0,0000 (0,0000–0,0000) | 0,0000 (0,0000–0,0000) | gleich | 0,0006 (0,0006–0,0006) | 0,0006 (0,0006–0,0006) | gleich |
| /leistungen | 0,0000 (0,0000–0,0000) | 0,0000 (0,0000–0,0000) | gleich | 0,0006 (0,0006–0,0006) | 0,0006 (0,0006–0,0006) | gleich |
| /fliesen | 0,0000 (0,0000–0,0000) | 0,0000 (0,0000–0,0000) | gleich | 0,0006 (0,0006–0,0006) | 0,0006 (0,0006–0,0006) | gleich |
| /balkon-terrasse | 0,0000 (0,0000–0,0000) | 0,0000 (0,0000–0,0000) | gleich | 0,0006 (0,0006–0,0006) | 0,0006 (0,0006–0,0006) | gleich |
| /referenzen | 0,0000 (0,0000–0,0000) | 0,0000 (0,0000–0,0000) | gleich | 0,0006 (0,0000–0,0006) | 0,0006 (0,0006–0,0006) | gleich |
| /ueber-uns | 0,0000 (0,0000–0,0000) | 0,0000 (0,0000–0,0000) | gleich | 0,0006 (0,0006–0,0006) | 0,0006 (0,0006–0,0006) | gleich |
| /kontakt | 0,0000 (0,0000–0,0000) | 0,0000 (0,0000–0,0000) | gleich | 0,0006 (0,0000–0,0006) | 0,0006 (0,0006–0,0006) | gleich |
| /standorte/wetzlar | 0,0000 (0,0000–0,0000) | 0,0000 (0,0000–0,0000) | gleich | 0,0006 (0,0006–0,0207) | 0,0006 (0,0006–0,0006) | gleich |
| /blog | 0,0000 (0,0000–0,0000) | 0,0000 (0,0000–0,0000) | gleich | 0,0006 (0,0000–0,0006) | 0,0006 (0,0006–0,0207) | gleich |

**JavaScript (KB, Gesamt-Skripte; kein Bewegungs-JS)**

| Ansicht | mobil E0 | mobil E2 | mobil Bew. | Desktop E0 | Desktop E2 | Desktop Bew. |
|---|---|---|---|---|---|---|
| / | 196 (196–196) | 198 (198–198) | schlechter | 240 (240–240) | 241 (241–241) | schlechter |
| /bad | 220 (220–220) | 221 (221–221) | schlechter | 250 (250–250) | 251 (251–251) | schlechter |
| /bad/badsanierung | 228 (228–228) | 230 (230–230) | schlechter | 258 (258–258) | 259 (259–259) | schlechter |
| /bad/barrierefreies-bad | 228 (228–228) | 230 (230–230) | schlechter | 258 (258–258) | 259 (259–259) | schlechter |
| /leistungen | 217 (217–217) | 219 (219–219) | schlechter | 261 (261–261) | 262 (262–262) | schlechter |
| /fliesen | 227 (227–227) | 228 (228–228) | schlechter | 271 (271–271) | 272 (272–272) | schlechter |
| /balkon-terrasse | 206 (206–206) | 207 (207–207) | schlechter | 250 (250–250) | 251 (251–251) | schlechter |
| /referenzen | 213 (213–213) | 214 (214–214) | schlechter | 250 (250–250) | 251 (251–251) | schlechter |
| /ueber-uns | 206 (206–206) | 207 (207–207) | schlechter | 250 (250–250) | 251 (251–251) | schlechter |
| /kontakt | 206 (206–206) | 207 (207–207) | schlechter | 250 (250–250) | 251 (251–251) | schlechter |
| /standorte/wetzlar | 230 (230–230) | 231 (231–231) | schlechter | 274 (274–274) | 275 (275–275) | schlechter |
| /blog | 318 (318–318) | 286 (286–286) | besser | 362 (362–362) | 330 (330–330) | besser |

**Verletzungen der Regel** (Z-10 mit Leistung und LCP; TBT nach gleicher Regel, informativ)

| Ansicht | Gerät | Messgröße | E0 | E2 | E0-Spanne | Befund |
|---|---|---|---|---|---|---|
| /leistungen | mobil | Leistung | 95 | 90 | 1 | Z-10 verletzt |
| /leistungen | mobil | LCP (ms) | 2.860 | 3.315 | 133 | Z-10 verletzt |
| /ueber-uns | mobil | Leistung | 92 | 89 | 2 | Z-10 verletzt |
| /ueber-uns | Desktop | LCP (ms) | 701 | 724 | 7 | Z-10 verletzt |
| /referenzen | Desktop | LCP (ms) | 703 | 712 | 6 | Z-10 verletzt |
| /balkon-terrasse | Desktop | LCP (ms) | 722 | 727 | 3 | Z-10 verletzt |
| /standorte/wetzlar | Desktop | LCP (ms) | 701 | 744 | 42 | Z-10 verletzt (knapp: roh 43,5 gegen 41,9) |
| / | mobil | TBT (ms) | 88 | 208 | 66 | informativ, verletzt |
| /leistungen | mobil | TBT (ms) | 86 | 184 | 14 | informativ, verletzt |
| /fliesen | mobil | TBT (ms) | 64 | 94 | 10 | informativ, verletzt |
| /balkon-terrasse | mobil | TBT (ms) | 77 | 130 | 11 | informativ, verletzt |
| /ueber-uns | mobil | TBT (ms) | 93 | 179 | 37 | informativ, verletzt |
| /kontakt | Desktop | TBT (ms) | 1 | 14 | 3 | informativ, verletzt |

- **Z-10 nicht erfüllt:** 7 Verletzungen auf 5 Ansichten bei Leistung und LCP (Auftragslesart). Alternative Lesart (E2-Median außerhalb der E0-Spanne): 9 auf 7 Ansichten, zusätzlich / mobil Leistung 89 und /bad/barrierefreies-bad mobil Leistung 91.
- **K-012-Budgets (mobil, E2 gegen E0):** LCP unter 2,5 s verfehlt auf 12 von 12 Ansichten (E0 ebenso). Leistung ab 90 verfehlt auf 3 (E0: 2). TBT bis 200 ms verfehlt auf 2 (E0: 0).
- **JavaScript:** 22 von 24 Messungen liegen 1 bis 2 KB höher; /blog sinkt deutlich. Das Bewegungs-JS (60 KB gzip) ist nicht gemessen.
- **CLS:** alle Mediane gleich; je ein Einzelausreißer von 0,0207 bei E0 (/standorte/wetzlar Desktop) und E2 (/blog Desktop).

### 3.2 axe und Bildsatz (Z-09, Z-11)

| Lauf-Gruppe | Läufe | E0 ernst/kritisch | E2 ernst/kritisch | Bewertung |
|---|---|---|---|---|
| Normal, vier Größen, je 12 Seiten | 48 | 0 | 0 | gleich |
| Menü offen, m390 | 12 | 0 | 0 | gleich |
| Einwilligungsbanner (Erstbesuch), m390 | 12 | 0 | 12 | schlechter |
| Einwilligungsbanner (Erstbesuch), d1440 | 12 | 0 | 12 | schlechter |
| Menü t768; Dialog t768 und d1920 | nicht gemessen | – | – | offen |
| Summe | 84 | 0 | 24 (label-content-name-mismatch) | schlechter |

Moderate und geringe Befunde: 0 in beiden Sätzen.

| Größe | Aufnahmen E0 | Aufnahmen E2 | Fehler | Überlauf | Überlappung | Konsolenfehler | Bewertung |
|---|---|---|---|---|---|---|---|
| m390 (390 × 844) | 140 | 140 | 0 | 0 | 0 | 0 | gleich |
| t768 (768 × 1024) | 134 | 134 | 0 | 0 | 0 | 0 | gleich |
| d1440 (1440 × 900) | 136 | 136 | 0 | 0 | 0 | 0 | gleich |
| d1920 (1920 × 1080) | 124 | 124 | 0 | 0 | 0 | 0 | gleich |
| Summe, 48 Läufe | 534 | 534 | 0 | 0 | 0 | 0 | gleich |

- **Z-09 nicht erfüllt.** Alle 24 Befunde liegen am Datenschutz-Link im Einwilligungsbanner. Das Markup von CookieConsent.tsx ist unverändert; die Ursache liegt in der Regelversion (axe-core 4.13 in E0, 4.14 in E2). Eine E0-Messung mit 4.14 fehlt, die Vergleichsbasis ist also nicht gleichartig.
- **Logo-Link:** Der Header-Diff geht über das entfernte aria-label hinaus (Kommentar und sr-only-Zusatz „, zur Startseite“). Der Logo-Fix in 6caeeb9c ist nicht belegt.
- **Abdeckung** ist in E0 und E2 gleich unvollständig: Das Menü wurde nur bei m390 geöffnet, obwohl der Schalter bis 80 rem sichtbar ist; der Dialog nur bei m390 und d1440.
- **Z-11 erfüllt (Stufe B):** 534 Aufnahmen ohne Befund, Läufe identisch. Grenzen: Die Konsole erfasst nur Fehler; bei 21 von 48 Läufen decken 12 Ausschnitte die Seitenhöhe nicht vollständig ab; der Banner ist nicht geprüft; 200 % Schrift und Reflow (Stufe C) fehlen.

### 3.3 Reaktion, Register, Bewegung (Z-06, Z-07)

Gerät m390, Touch, CPU 4x gedrosselt.

| Ansicht | E0 höchster Median (Handlung; Spanne) | E2 höchster Median (Handlung; Spanne) | Bewertung |
|---|---|---|---|
| / | 608 (Eingabe; 32–1992) | 128 (Menü; 96–136) | besser |
| /bad | 216 (Hauptknopf; 136–376) | 64 (Menü; 64–80) | besser |
| /bad/badsanierung | 80 (Hauptknopf; 40–536) | 80 (Menü; 72–104) | gleich |
| /bad/barrierefreies-bad | 168 (Hauptknopf; 56–464) | 72 (Menü; 72–88) | besser |
| /leistungen | 72 (Hauptknopf; 40–368) | 80 (Menü; 48–80) | im Rahmen |
| /fliesen | 96 (Hauptknopf; 64–376) | 72 (Menü; 72–80) | besser |
| /balkon-terrasse | 404 (Hauptknopf; 56–752; 2 Läufe) | 72 (Menü; 64–72) | besser |
| /referenzen | 304 (Hauptknopf; 80–536) | 72 (Menü; 72–80) | besser |
| /ueber-uns | 456 (Hauptknopf; 432–936) | 80 (Menü; 64–96) | besser |
| /kontakt | 812 (Hauptknopf; 320–1304; 2 Läufe) | 64 (Hauptknopf; 56–120) | besser |
| /standorte/wetzlar | 584 (Link; 184–592) | 128 (Hauptknopf; 88–144) | besser |
| /blog | 744 (Hauptknopf; 184–1040) | 96 (Hauptknopf; 48–96) | besser |

| Ansicht | Register: Kennungen im DOM / unbekannt / Übergänge ohne Eintrag (Vorkommen); E0 = E2 | reduziert: Lage- oder Größenänderungen; unsichtbare Elemente; E0 = E2 |
|---|---|---|
| / | 7 / 0 / 1 (10) | 0; 10 (6 display none, 4 außerhalb) |
| /bad | 7 / 0 / 0 | 0; 8 (6 display none, 2 außerhalb) |
| /bad/badsanierung | 6 / 0 / 1 (2) | 0; 6 (display none) |
| /bad/barrierefreies-bad | 7 / 0 / 1 (2) | 0; 6 (display none) |
| /balkon-terrasse | 7 / 0 / 1 (2) | 0; 6 (display none) |
| /blog | 5 / 0 / 1 (2) | 0; 6 (display none) |
| /fliesen | 7 / 0 / 1 (2) | 0; 7 (6 display none, 1 Deckkraft 0,50) |
| /kontakt | 6 / 0 / 1 (2); 1 Hover-Timeout | 0; 6 (display none) |
| /leistungen | 8 / 0 / 1 (2) | 0; 8 (6 display none, 2 außerhalb) |
| /referenzen | 8 / 0 / 1 (6) | 0; 6 (display none) |
| /standorte/wetzlar | 6 / 0 / 1 (10) | 0; 8 (6 display none, 2 außerhalb) |
| /ueber-uns | 8 / 0 / 1 (8) | 0; 6 (display none) |

| Ansicht | Bildrate E0, Median (Spanne), % | Bildrate E2, Median (Spanne), % | Bewertung | LAF E0 (Anzahl / ms) | LAF E2 (Anzahl / ms) |
|---|---|---|---|---|---|
| / | 0,06 (0–1,15) | 0,06 (0–0,83) | gleich | 1 / 76 | 0 / 0 |
| /bad | 1,77 (1,53–9,31) | 2,15 (1,72–2,50) | im Rahmen | 3 / 166 | 0 / 0 |
| /bad/badsanierung | 0 (0–0,26) | 0,06 (0,06–1,21) | im Rahmen | 1 / 72 | 0 / 0 |
| /bad/barrierefreies-bad | 0,79 (0–0,82) | 0,07 (0,07–0,41) | besser | 1 / 153 | 0 / 0 |
| /balkon-terrasse | 0,16 (0,08–0,47) | 0,16 (0–0,31) | gleich | 1 / 113 | 1 / 63 |
| /blog | 0 (0–0,19) | 0 (0–0,13) | gleich | 0 / 0 | 0 / 0 |
| /fliesen | 0,06 (0–0,47) | 0 (0–1,41) | besser | 0 / 0 | 1 / 53 |
| /kontakt | 0 (0–0,68) | 0 (0–1,08) | gleich | 0 / 0 | 1 / 56 |
| /leistungen | 0 (0–0,47) | 0,47 (0,06–1,55) | im Rahmen | 0 / 0 | 1 / 114 |
| /referenzen | 0,03 (0,03–1,63) | 0,17 (0,03–2,33) | im Rahmen | 2 / 200 | 2 / 161 |
| /standorte/wetzlar | 0,18 (0–0,41) | 0,25 (0,16–0,28) | im Rahmen | 0 / 0 | 1 / 76 |
| /ueber-uns | 0 (0–0,55) | 0,18 (0,18–1,09) | im Rahmen | 1 / 55 | 1 / 76 |

- **Z-07: Zahlen erfüllt, Messstand nicht.** E2 besteht in 12 von 12 Ansichten, höchster Median 128 ms (E0: 4 bestanden, 6 nicht, 2 unvollständig). Keine Ansicht ist über die E0-Spanne hinaus schlechter. Drei E2-Mediane liegen jedoch über dem E0-Maximum derselben Handlung (/bad Link 40 gegen 32; /bad/badsanierung Link 48 gegen 32; /ueber-uns Menü 80 gegen 56 bis 64 ms). Laut Gegenprüfung verlangt Stufe B gedrosseltes Scrollen; die Belege enthalten keine Scroll-Messung.
- **Z-06 Register und reduziert erfüllt:** keine unbekannten Kennungen; die 24 Dateien sind bei E0 und E2 identisch; 0 Lage- oder Größenänderungen.
- **Bildrate erfüllt:** Kopfwerte höchstens 2,15 %, Einzellauf höchstens 2,50 % (E0 Einzellauf 9,31 %). Laut Gegenprüfung lief die Bildrate mit DPR 2 (nur im Cache-Ergebnis, nicht im Beleg), die Reaktion mit DPR 1.
- **Z-06 nicht bestätigt:** Bildfolgen (Stufe B) fehlen in E0 und E2. Der Schalter data-bewegung="ruhig" fehlt im Code und im Werkzeug. LAF ist mit dem Werkzeug nicht nach der Schwelle messbar (Werkzeug: Frames über 50 ms; Schwelle: Skriptzeit über 20 ms).
- Ein Teil der E2-Bewegungsdaten stammt wahrscheinlich aus einem Stand mit geänderten Tokens (--ease-hammer, --verlegen-ruhig). Die Herkunft der E0-Bewegungsdaten ist nicht belegt.

### 3.4 Stack, Audit, Pixel, Stufe A (Z-03, Z-02)

| Kriterium | E0 (7ceb5e41) | E2 (6caeeb9c) | Bewertung |
|---|---|---|---|
| Projekt-Audit hoch und kritisch (mit Fix) | 3 hoch, 1 kritisch | 0 | besser |
| Projekt-Audit moderat, niedrig, info | 0 | 0 | gleich |
| Werkzeuge-Audit (eigener Lock, nicht Schwelle) | nicht gemessen | 0 hoch, 0 kritisch, 5 moderat | nicht vergleichbar |
| Direkte Abhängigkeiten auf latest (32) | 12 von 32 | 29 von 32 | besser; Schwelle nicht erfüllt |
| Laufzeit (LTS) | Node 20 (.nvmrc) | Node 24.22.1 (neueste LTS-Linie) | besser; erfüllt |
| npm-Veraltungswarnungen (Installation, Build, Tests, Lint) | kein E0-Log | 1 (eslint@9.39.5) | Schwelle nicht erfüllt |
| Pixel (48 Paare) | Selbsttest E0 gegen E0: 0 Pixel | 0 Pixel; 1 Höhenabweichung | nicht erfüllt |

| Pixelvergleich, Lauf | Paarung | Höhe E0 | Höhe E2 | Ergebnis |
|---|---|---|---|---|
| Endstand, 48 Paare, 3,67 min | 4311 gegen 4314 | 10706 | 10705 | 0 Pixel; 1 Höhenabweichung |
| u01, 48 Paare | 4311 gegen 4312 | 10706 | 10705 | 0 Pixel; 1 Höhenabweichung |
| u03, 48 Paare | 4311 gegen 4313 | 10706 | 10705 | 0 Pixel; 1 Höhenabweichung |
| Voll-Läufe d1440, je 12 Paare, 3 Läufe | 4311 gegen 4314 | 10706 | 10706 | 0 Pixel |
| Nachläufe, Einzelpaar, 3 Läufe | 4311 gegen 4311, 4312, 4313 | 10706 | 10706 | 0 Pixel |

| Lauf | Build | Typen | Lint | Tests | qa:graph | Bewertung |
|---|---|---|---|---|---|---|
| E0 (Reinraum 7ceb5e41, ABNAHME) | grün | grün | 437 Dateien, 0 Fehler (eslint src) | 210 von 210 | grün | Referenz |
| E2 Endstand 6caeeb9c (Reinraum-Logs) | Exit 0, 105 Routenzeilen | Exit 0 | Exit 0 (npm run lint) | 210 bestanden, 0 fehlgeschlagen, 0 übersprungen | Exit 0 | erfüllt |
| U01 bis U03 | nur Commit-Texte | nur Commit-Texte | nur Commit-Texte | 210 von 210 (Commit-Text) | nur Commit-Text | nicht belegt |
| U04 bis U06 (Berichte) | Exit 0 (104, 117, 85 Routen) | Exit 0 | Exit 0 | 210 von 210 | Exit 0 | belegt |
| U07 (Bericht) | – | – | – | tests-logik 43 von 43, kontingent 11 von 11 | – | belegt |

- **Z-03 nicht erfüllt.** Aktualität: 29 von 32 direkten Abhängigkeiten auf latest; die drei übrigen sind begründet (Frage 11). Projekt-Audit: 0 hoch, 0 kritisch.
- **Pixel:** 47 von 48 Paaren ohne Abweichung. Ein Paar (/bad/barrierefreies-bad, d1440) hat 1 px Höhendifferenz, die Ursache ist nicht belegt. Die Begründungen „einmalig“ (Commit 0d37880e) und „dreimal nicht reproduziert“ (UPGRADE.md Nr. 5) tragen nicht: Der Nachlauf war teils E0 gegen E0, teils Einzelpaar. Die Abweichung trat vor und nach dem Wechsel der Playwright-Version auf.
- **Veraltungswarnung:** npm meldet eslint@9.39.5 als nicht mehr unterstützt. Nach dem Wortlaut der Null-Schwelle zählt sie; E0 (eslint 9.39.4) trägt laut Registry denselben Hinweis.
- **Z-02 Stufe A erfüllt** am Endstand: Build, Typen, Lint und qa:graph mit Exit 0; Tests 210 von 210. Der Lint-Umfang unterscheidet sich (Frage 13).

## 4 Höhenabweichung /bad/barrierefreies-bad, d1440 (1440 × 900, DPR 1)

| Server und Last (je 10 Läufe, Stand final) | scrollHeight (gerundet) | body (gebrochen) | main (gebrochen) |
|---|---|---|---|
| E0 4311, ohne Last | 10706 | 10705,75 | 8832,0625 |
| E0 4311, mit Hintergrundlast | 10706 | 10705,75 | 8832,0625 |
| E2 4314, ohne Last | 10706 | 10705,75 | 8832,0625 |
| E2 4314, mit Hintergrundlast | 10706 | 10705,75 | 8832,0625 |

**Ergebnis: in dieser Messung nicht reproduziert.** In 40 Läufen hat die Seite bei E0 und E2 gleich 10706 px scrollHeight. Mechanismus laut Höhenprobe (nicht gegengeprüft): Der Fuß footer.spaet-zeichnen (content-visibility auto) trägt den Bruch; die Summe 10705,75 liegt 0,25 px über der Rundungsgrenze 10705,5. **Erklärt: nein.** Der Endstand-Pixellauf gegen 4314 zeigte dagegen 10705; die Höhenprobe und drei Voll-Läufe gegen 4314 zeigten 10706 (Frage 16).

## 5 Funktionssuite

Folgt nach der Nacharbeit am Prüfwerkzeug (Playwright 1.64, belege/um-e2/suite-2.json); Eintrag durch den Orchestrator.

## 6 Gegenprüfung

Alle vier Gegenprüfungen melden „bestätigt: nein“. Die Zahlen stimmen, die Urteile und Begründungen wurden korrigiert.

| Messgröße | Bestätigt | Dokumentar-Stichprobe | Übernommene Korrekturen |
|---|---|---|---|
| Lighthouse (Z-10) | nein | 240 Mediane und die Verletzungszählungen (7 und 6) stimmen | Budgets K-012 bewertet; TBT-Verletzung /kontakt Desktop ergänzt; JavaScript ist Gesamt-Skriptgröße; CLS-Rundung; Schwellenlesart ausgewiesen |
| axe und Bildsatz (Z-09, Z-11) | nein | 84 axe-Läufe, 24 Knoten, 534 Aufnahmen stimmen | Header-Diff mit sr-only-Zusatz; Menü t768 und Dialog t768 und d1920 fehlen; Konsole erfasst nur Fehler; Ursache axe 4.13 gegen 4.14 belegt |
| Reaktion, Register, Bewegung (Z-06, Z-07) | nein | Mediane, Commit 3d481570, 24 Dateien identisch, Bildrate-Mediane stimmen | Messstand korrigiert; Bildfolgen fehlen; Schalter ist Stufe C; LAF nicht messbar; Handlungsebene ergänzt; Einträge 28 gegen 23 offen |
| Stack, Audit, Pixel, Stufe A (Z-02, Z-03) | nein | Audit, 48 Paare, 594 Ausschnitte, Node 24, test.log 210 von 210 stimmen | Begründung „einmalig“ und „nicht reproduziert“ zurückgenommen; U01 bis U03 nicht belegt; Routenzahlen widersprüchlich; Werkzeuge 5 moderat; Veraltungswarnung zählt; Node-Datum war das Release-, nicht das LTS-Datum |
| Höhenprobe (Abschnitt 4) | keine Gegenprüfung | 40 Läufe stimmen | Mechanismus ungeprüft |

## 7 OFFENE FRAGEN

| Nr | OFFENE FRAGE | Quelle |
|---|---|---|
| 1 | Z-10-Lesart: nur Leistung und LCP (7 Verletzungen) oder alle Messgrößen mit E0-Spanne (TBT ergibt 6 weitere; alternative Lesart 9)? | Vergleich, Gegenprüfung |
| 2 | Gelten die K-012-Budgets schon in E2 oder erst in UM-E3-LCP-K, UM-E3-LEISTUNG und UM-E4-LEISTUNG? | Gegenprüfung |
| 3 | Der Beleg belege/um-e5/lighthouse/ (ABNAHME Z-10) fehlt. Bewegungs-JS (60 KB gzip) und INP sind nicht gemessen. | Gegenprüfung |
| 4 | Reaktion und Bewegung auf 6caeeb9c mit sauberem Baum nachmessen? | Vergleich, Gegenprüfung |
| 5 | Welcher Build lief auf 4314 bei Reaktion (07:50) und Bewegung (07:55 bis 08:33)? Der Serverstart widerspricht sich (07:24 laut Axe-Prüfung, 07:43 laut Lighthouse-Prüfung). Der Commit-Text 7344cd9a behauptet die Messung am Endstand; reaktion.json widerspricht. | Gegenprüfung |
| 6 | Z-06 Stufe B: Bildfolgen nachmessen (Modus einzelbilder)? Stufe C: Bewegungsschalter verlangen? LAF-Werkzeug auf Skriptzeit umstellen? | Gegenprüfung |
| 7 | Z-07 Stufe B: Scroll-Messung ergänzen? | Gegenprüfung |
| 8 | Register: 28 Kennungen (register.json) oder 23 (ABNAHME)? | Gegenprüfung |
| 9 | Ist der Fliesen-Button „druck“ (Deckkraft 0,50, reduziert) sichtbar? Sind die 2 bis 4 Elemente außerhalb des Dokuments je Ansicht Karussell-Kopien? | Vergleich |
| 10 | axe: Datenschutz-Link beheben oder E0 mit 4.14 gegenmessen? Logo-Fix bei 1024 px nachmessen; Menü t768, Dialog t768 und d1920 ergänzen. | Vergleich, Gegenprüfung |
| 11 | Z-03: Zählt die npm-Warnung zu eslint@9.39.5 als veraltete Schnittstelle? Gilt @types/node ^24 als „neueste kompatible“ (latest 26.6.5)? Reichen Registry-Peers als Beleg für die Blocker typescript 7 und eslint 10? | Gegenprüfung |
| 12 | Zählen Prüfwerkzeuge zur Laufzeitschwelle? Die Gegenprobe lief auf node 22 (10:07 bis 10:47). | Gegenprüfung |
| 13 | Lint-Umfang: E0 „eslint src“ (437 Dateien) gegen E2 „npm run lint“ nachmessen? | Gegenprüfung |
| 14 | Routenzahl: 105 (routen.txt) oder die Berichtswerte 104, 107, 109, 117, 85? Die Gleichheitsbehauptungen sind unbelegt. | Gegenprüfung |
| 15 | Stufe-A-Berichte für U01 bis U03 nachreichen; Herkunft der E0-Bewegungsdaten belegen. | Gegenprüfung |
| 16 | Höhe und Pixel: Welche Bedingung zeigte 10705 im Endstand und in u01 und u03, aber nicht in der Höhenprobe? Welches Kind des Fußes trägt die .1875 px? PRUEFPUNKT Schritt 3 ist offen. | Höhenprobe, Gegenprüfung |
| 17 | Funktionssuite: suite.json (Vorlauf) meldet 21 unerwartete Fälle und „suite exit 1“. Die Dateien suite-2.json und suite-2-bewegung.json liegen seit 11:26 vor; sie sind nicht Teil dieses Berichts. | Gegenprüfung, Dokumentar |
| 18 | Hover-Timeout auf /kontakt (1500 ms) in E0 und E2: Werkzeugfehler? | Vergleich |
| 19 | Genügen die Bedingungsvermerke (Bildrate DPR 2 und CPU 4x, Reaktion DPR 1) für den Vergleich? | Vergleich |

## Vermerk des Orchestrators (27.10.2026, 13:00 MEZ)
- **Messstand, Berichtigung:**
  - Die Felder `commit` in `reaktion.json` (3d481570, „mit ungesicherten Änderungen“) und die Zeitleiste der Bewegungsläufe nennen den HEAD des Repositorys zur Messzeit. Gemessen wurde aber der Server 4314.
  - Dieser lief aus `reinraum-6caeeb9c`: `server-4314.dir`, Server-Protokoll `server-6caeeb9c-4314.log` ab 07:43 UTC, nach dem Neustart 09:54 UTC derselbe Ordner.
  - Der Reinraum baut nur committete Dateien (`git archive`). Die ungesicherten Änderungen im Arbeitsbaum (Designsystem v4) flossen deshalb nicht ein.
  - Alle E2-Belege dieser Messreihe gehören damit zu 6caeeb9c. Ab f5544581 schreiben die Messwerkzeuge zusätzlich `server_stand`.
- **Funktionssuite (Abschnitt 5):**
  - Nach der Nacharbeit am Prüfwerkzeug (5a5e3dd8, E-076) am E2-Endstand 6caeeb9c: wie konfiguriert (reduzierte Bewegung) 393 bestanden, 0 rot, 25 übersprungen (`belege/um-e2/suite-2.json`).
  - Mit `RELAUNCH_BEWEGUNG=an` (Zustand der E0-Suite) ebenso 393/0/25 (`suite-2-bewegung.json`). E0: 393/0/25.
- **Lesarten:**
  - Z-06: Die Bildfolgen und der Bewegungsschalter entfallen in E2 (PLAN 2.2, Zeile UM-E2-B; Prüfmatrix: Schalter in Stufe C).
  - Z-10: Die Schwelle in E2 ist „keine Hauptansicht schlechter als E0 um mehr als die Spanne der drei E0-Läufe“. Sie gilt hier für alle gemessenen Kennzahlen (Leistung, LCP, TBT, CLS). Die BUDGETS (K-012) sind Ziel von UM-E3-LCP-K, UM-E3-LEISTUNG und UM-E4-LEISTUNG und verfehlten schon in E0.
- **Folge:** Tor E2 Anlauf 1 nicht bestanden (E-076). Die Nacharbeit steht in PRUEFPUNKT.

=== ENDE UM-E2-B · BEREIT ZUR RÜCKGABE ===
