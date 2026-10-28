# UM-E3-TBT · Rolle Kundschafter · Modell Haiku 5.5 · Stufe 1 · Kern-Version 4.1 · Kostenklasse S

Frage: Ist die Total Blocking Time (TBT) mobil auf `/`, `/leistungen` und `/balkon-terrasse` nach dem Stack-Upgrade höher als in E0, und welchen Skripten ist die Differenz zuzuordnen? Nur Auswertung vorhandener Rohberichte; keine Messung, keine Codeänderung, kein git-Schreibzugriff.

## QUELLEN UND VOLLSTÄNDIGKEIT
- Rohberichte `_werkstatt/cache/lighthouse/um-e3-tbt/{e0-a,head-a,head-b,e0-b}/{start,leistungen,balkon-terrasse}-mobil-{0,1,2}.report.json`: 36 von 36 vorhanden, ohne `runtimeError`, ohne `runWarnings`, Lighthouse 13.5.0. Die `finalUrl` liegt für E0 auf Port 4311, für HEAD auf 4317.
- Belege `_werkstatt/belege/um-e3-tbt/*/lighthouse.json`: die TBT-Mediane je Satz stimmen mit den Rohberichten überein (12 von 12).
- Messlog: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/tbt/messung.log`.
- Zuordnung: Reinraum-Checkouts `…/scratchpad/reinraum-7ceb5e41` (E0) und `…/scratchpad/reinraum-27d87b66` (HEAD). `src/lib/motion` ist in beiden identisch. Im Build gibt es keine Quellkarten (`.map`), deshalb ordnet die Auswertung Chunks nach Inhaltsmarkern zu.
- Skriptzeit = Script Evaluation + Script Parse aus `bootup-time`. Mediane über je 6 Läufe (zwei Sätze mit je 3); Spanne = Min bis Max.
- Abdeckung: `bootup-time` listet je Lauf nur 2 bis 4 von 12 bis 14 geladenen Chunks. Eigener Code und der React-Core stehen in keinem der 18 Läufe darin. Die gelisteten Skripte decken trotzdem 89 bis 95 % der Hauptthread-Skriptzeit (`scriptEvaluation` + `scriptParseCompile`) ab.
- Auswertungsskripte und Zahlen: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/tbt/auswertung/` (`zahlen.txt`).

## TABELLE TBT je Seite (mobil, ms)

| Seite | E0 Median (Spanne) | HEAD Median (Spanne) | Differenz | E0-Spanne | Satzmediane E0-a / HEAD-a / HEAD-b / E0-b |
|---|---|---|---|---|---|
| `/` | 90,1 (67,5–123,5) | 84,0 (69,5–115,0) | −6,1 | 56,0 | 76,0 / 78,0 / 114,0 / 98,5 |
| `/leistungen` | 102,8 (62,5–165,2) | 90,0 (85,0–125,2) | −12,8 | 102,7 | 81,0 / 93,0 / 87,0 / 124,7 |
| `/balkon-terrasse` | 85,5 (78,5–109,5) | 96,8 (81,5–156,6) | +11,2 | 31,0 | 94,0 / 91,5 / 111,0 / 78,5 |

Reihenfolge: Differenz je Blockpaar (Block a: E0 zuerst; Block b: HEAD zuerst) `/` +2,0 / +15,5; `/leistungen` +12,0 / −37,7; `/balkon-terrasse` −2,5 / +32,5. Exakter Permutationstest auf die Differenz der Mediane (924 Teilungen, zweiseitig): p = 0,81 / 0,99 / 0,37.

## TABELLE Zuordnung je Seite und Gruppe (Skriptzeit ms, Median über 6 Läufe; Summe der gelisteten Skripte je Lauf)

| Gruppe | `/` E0 | HEAD | Diff | `/leistungen` E0 | HEAD | Diff | `/balkon-terrasse` E0 | HEAD | Diff |
|---|---|---|---|---|---|---|---|---|---|
| React (react-dom; react-core nicht gelistet) | 523,5 | 461,0 | −62,6 | 578,0 | 550,3 | −27,7 | 463,3 | 526,6 | +63,2 |
| Next-Laufzeit (Client und Kleinmodule) | 188,0 | 224,7 | +36,7 | 146,1 | 234,3 | +88,1 | 225,0 | 247,5 | +22,4 |
| Eigener Code | nicht gelistet | | | nicht gelistet | | | nicht gelistet | | |
| Bewegung + eigener Code, gemischt (41af06 / 14au8) | 12,0 | 13,1 | +1,1 | 0,0 | 13,4 | +13,4 | 24,9 | 24,9 | 0,0 |
| Dokument inline | 103,5 | 101,7 | −1,8 | 98,1 | 99,9 | +1,7 | 93,1 | 92,8 | −0,4 |
| Unattributable | 17,4 | 12,9 | −4,5 | 13,8 | 13,2 | −0,5 | 15,0 | 14,4 | −0,6 |
| Dritte | 0 (keine Dritt-URL geladen) | | | 0 | | | 0 | | |
| Summe gelisteter Skripte | 853,5 | 811,5 | −42,0 | 830,7 | 836,6 | +5,9 | 817,4 | 882,6 | +65,2 |

Je Skript (Median über die Läufe, in denen es gelistet ist; in Klammern gelistete Läufe von 6 je Satz):

| Skript E0 / HEAD | `/` E0 / HEAD | `/leistungen` E0 / HEAD | `/balkon-terrasse` E0 / HEAD |
|---|---|---|---|
| 075 / 2tbu, react-dom | 523,5 (6) / 461,0 (6) | 578,0 (6) / 550,3 (6) | 463,3 (6) / 526,6 (6) |
| 3nex4 / 3i7bb, Next-Client | 86,1 (6) / 94,1 (6) | 86,7 (6) / 117,6 (6) | 100,9 (6) / 130,3 (6) |
| 0jvhpa / 1kexj, Next-Kleinmodul | 115,7 (3) / 131,5 (3) | 123,4 (3) / 105,5 (1) | 120,9 (4) / 117,1 (3) |
| 41af06 / 14au8, Bewegung + Code | 29,2 (3) / 30,0 (3) | 33,1 (2) / 27,2 (3) | 25,9 (5) / 27,6 (4) |

Hauptthread (`scriptEvaluation`, Median): `/` 830,1 → 772,4 (−57,7); `/leistungen` 787,3 → 793,3 (+6,0); `/balkon-terrasse` 778,8 → 832,3 (+53,6). Das Vorzeichen wechselt.

## LONG TASKS (Median über 6 Läufe je Satz, ms)

| Seite | Anzahl E0 / HEAD | Summe E0 / HEAD | Längste drei E0 | Längste drei HEAD |
|---|---|---|---|---|
| `/` | 5 (3–7) / 6 (4–7) | 454,5 / 503,0 | 153,0 · 99,0 · 86,0 | 153,5 · 93,0 · 79,0 |
| `/leistungen` | 6 (4–8) / 5,5 (5–7) | 564,5 / 538,5 | 155,5 · 104,5 · 94,0 | 177,5 · 113,0 · 85,0 |
| `/balkon-terrasse` | 6 (4–7) / 6 (5–7) | 504,0 / 512,0 | 139,0 · 91,5 · 80,5 | 152,0 · 105,5 · 83,5 |

Die längste Long Task liegt auf `/` und `/balkon-terrasse` in beiden Sätzen überwiegend auf einem Next-Skript. Das kleine Next-Modul (`0jvhpaew_uadu.js` in E0, `1kexj4s7oxhs2.js` in HEAD, je 6,5 KB) trägt Tasks von 105 bis 152 ms in beiden Sätzen. Auf `/leistungen` wechselt die längste Task zwischen React (react-dom 075 bzw. 2tbu) und Next.

## ERGEBNIS
Eine durchgängige Verschlechterung ist nicht belegt: Die Differenzen (−6,1, −12,8, +11,2 ms) liegen jeweils innerhalb der E0-Spanne, bei `/leistungen` und `/balkon-terrasse` wechseln die Vorzeichen der Blockpaare, und die Permutations-p-Werte liegen zwischen 0,37 und 0,99. Der größte Kostenposten sind die React-Chunks (461 bis 578 ms Skriptzeit je Lauf); ihre E0-HEAD-Differenz wechselt das Vorzeichen (−63, −28, +63 ms) und erklärt den TBT-Unterschied nicht. Einzig gleichgerichtet ist der Next-Client (+8, +31, +29 ms Median, in allen sechs Blockpaaren höher); er bleibt klein gegen die Streuung, und eine Ursache nennen die Daten nicht. Die E2-Befunde (2 bis 8 ms über der E0-Spanne, feste Reihenfolge) liegen unter dem Rauschen und sind nicht reproduziert.

## OFFENE FRAGEN
1. Eigener Code und React-Core fehlen in `bootup-time` (in keinem der 18 Läufe). Ihr Anteil ist nur als Rest abschätzbar (5 bis 11 % der Hauptthread-Skriptzeit).
2. Long Tasks werden dem gerade laufenden Skript zugeordnet. Die Daten zeigen nicht, welcher Code im kleinen Next-Modul (105 bis 152 ms) läuft, und ob es fremden Code auslöst.
3. `Dokument inline` vereint Kopfskript, RSC-Nutzlast und Stream-Laufzeit; eine Trennung liefert die Auswertung nicht.
4. Gemischte Chunks (41af06 / 14au8: Bewegungs- und Layoutcode mit gtag-Lader; 3dmv / 25-6e: Cookie-Banner, Karussell) sind ohne Quellkarten nicht trennbar. Sie sind nach Mehrheit der Marker zugeordnet.
5. Next-Client: gleiche Richtung in 6 von 6 Blockpaaren, Größe +4 bis +41 ms. Ob das Rauschen ist, entscheiden 18 Läufe je Satz nicht.
6. Die Z-10-Abnahme vergleicht mit der Spanne einer einzelnen Dreiergruppe. Auf `/balkon-terrasse` überschreitet HEAD-b gegen E0-b die Spanne (+32,5 gegen 7,5 ms); gegen die Gesamtheit der E0-Läufe nicht. Das Ergebnis der Abnahme hängt also von der Wahl der Gruppe ab.

## EMPFEHLUNG Z-10 (TBT mobil)
Z-10 nicht über eine Codeänderung beheben; die Daten nennen keinen Verursacher. Den TBT-Punkt als „nicht belegt verschlechtert“ führen, wenn die formale Abnahme auf den drei Seiten dasselbe Bild zeigt, mit mehreren E0-Läufen als Spanne und wechselnder Reihenfolge (Offene Frage 6). Den Next-Client-Befund als offene Beobachtung mitführen.

=== ENDE UM-E3-TBT · BEREIT ZUR RÜCKGABE ===
