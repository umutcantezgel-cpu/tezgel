# UM-E2-B2 · Tor E2 Anlauf 2 · Prüfstufe B · HEAD gegen E0 7ceb5e41

Stand 27.10.2026, 17:40 MEZ. Zusammengestellt vom Orchestrator aus den Auswertungen der Haiku-Prüfer mit Gegenprüfung (wf_e0aa9ea7-730 Leistung, wf_7a7ba863-e85 Bestand) und den Werkzeugausgaben. Entscheidung in E-076.

## Messstand
- E0: Server 4311 = reinraum-7ceb5e41.
- HEAD:
  - 4315 = f5544581: Lighthouse, Bildsatz, Bewegung, Pixel.
  - 4316 = 51355ef7: axe und Suite. Gegenüber f5544581 nur `MobileMenu.jsx` (Logo-Link, Hintergrund inert), wirksam nur bei offenem Menü.
- Jede Datei nennt `server_stand`.
- Messung als Skript ohne Agenten (`scratchpad/um-e2-b2/lauf-lh.sh`, `lauf-rest.sh`). Lighthouse lief Seite für Seite verschränkt, E0 direkt vor HEAD:
  - Seiten 1–8 am 27.10. 12:26–12:55 UTC;
  - Seiten 9–12 um 14:41–14:54 UTC nach einem Neustart der Umgebung.

## Übersicht
| Kriterium | Schwelle (Etappe) | Ergebnis | Beleg |
|---|---|---|---|
| Z-02 Bestand | Suite mindestens wie E0 (393/0/25) | 393/0/25 reduziert und mit Bewegung; Reinraum grün; `npm test` 216/216 | `belege/um-e2-b2/suite*.json` |
| Z-03 Stack | Audit 0 hoch/kritisch; Pixel ohne unerklärte Abweichung | Audit 0; Pixel 48 Paare, 0 Pixel, keine Höhenabweichung | `belege/um-e2/audit.json`, `belege/um-e2-b2/pixelvergleich.json` |
| Z-06 Bewegung | Register ohne unbekannte Kennung, reduziert ohne Lage-/Größenänderung, wie E0 | erfüllt, alle 12 Ansichten gleich E0 | `belege/um-e2-b2/bewegung/` |
| Z-07 Reaktion | nicht schlechter als E0 | 12/12 bestanden (Anlauf 1, 6caeeb9c; E0 4/12) | `belege/um-e2/reaktion/` |
| Z-09 Zugänglichkeit | 0 ernste/kritische axe-Knoten, alle Größen mit Menü und Dialog | 396 Läufe, 0 (vor den Menü-Fixes 50) | `belege/um-e2-b2/axe/` |
| Z-10 Leistung | keine Ansicht schlechter als E0 um mehr als die E0-Spanne | **offen**: TBT mobil auf 3 Ansichten 2–8 ms über der Spanne, `/` Desktop TBT 0 → 2 | `belege/um-e2-b2/lh-*/` |
| Z-11 Darstellung | kein Überlauf, keine Überlappung, kein Fehler | 10 Größen, 1.334 Aufnahmen, 0 Befunde | `belege/um-e2-b2/bildsatz.json` |

## Lighthouse (Median aus drei, in Klammern E0-Spanne; Bewertung nach Lesart „um mehr als die Spanne“)
| Ansicht | mobil Leistung | mobil LCP ms | mobil TBT ms | Desktop LCP ms | Desktop TBT ms |
|---|---|---|---|---|---|
| `/` | 94 (89–95) → 88 im Rahmen | 2863 (2861–3364) → 3317 im Rahmen | 128 (87–198) → 247 **über Spanne** | 716 (713–752) → 701 gleich | 0 (0–0) → 2 **über Spanne** |
| `/bad` | 89 (89–93) → 88 im Rahmen | 3386 (3128–3440) → 3387 im Rahmen | 176 (119–183) → 211 im Rahmen | 786 (730–788) → 710 besser | 5 (0–6) → 3 gleich |
| `/bad/badsanierung` | 93 (77–93) → 88 im Rahmen | 3087 (3071–3381) → 3389 im Rahmen | 126 (119–570) → 202 im Rahmen | 708 (704–766) → 767 im Rahmen | 0 (0–2) → 2 im Rahmen |
| `/bad/barrierefreies-bad` | 89 (89–91) → 93 besser | 3239 (3236–3242) → 3007 besser | 217 (147–227) → 111 besser | 715 (708–721) → 707 gleich | 0 (0–0) → 0 gleich |
| `/leistungen` | 92 (91–95) → 91 im Rahmen | 3311 (2860–3318) → 3312 im Rahmen | 105 (91–132) → 148 **über Spanne** | 698 (693–699) → 696 gleich | 0 (0–0) → 0 gleich |
| `/fliesen` | 92 (92–94) → 92 gleich | 3290 (3053–3292) → 3253 gleich | 109 (85–118) → 114 im Rahmen | 693 (691–698) → 696 im Rahmen | 0 (0–0) → 0 gleich |
| `/balkon-terrasse` | 90 (89–95) → 90 gleich | 3459 (2788–3642) → 3462 im Rahmen | 102 (91–153) → 172 **über Spanne** | 734 (733–784) → 709 gleich | 0 (0–0) → 0 gleich |
| `/referenzen` | 91 (88–95) → 95 gleich | 3236 (2868–3241) → 2787 besser | 150 (62–264) → 87 gleich | 710 (705–716) → 696 besser | 0 (0–0) → 0 gleich |
| `/ueber-uns` | 94 (90–95) → 92 im Rahmen | 2938 (2938–3386) → 3314 im Rahmen | 83 (64–166) → 105 im Rahmen | 713 (707–798) → 692 gleich | 0 (0–10) → 0 gleich |
| `/kontakt` | 93 (92–93) → 93 gleich | 3208 (3133–3252) → 3142 gleich | 72 (51–117) → 106 im Rahmen | 707 (660–717) → 709 im Rahmen | 0 (0–11) → 2 im Rahmen |
| `/standorte/wetzlar` | 81 (79–82) → 82 gleich | 4651 (4527–4668) → 4595 gleich | 167 (159–267) → 190 im Rahmen | 699 (697–706) → 657 besser | 0 (0–0) → 0 gleich |
| `/blog` | 88 (87–94) → 90 gleich | 3449 (2984–3848) → 3449 gleich | 159 (114–201) → 138 gleich | 790 (745–790) → 745 gleich | 0 (0–3) → 0 gleich |

- Alle 7 Leistungs- und LCP-Verletzungen aus Anlauf 1 sind entfallen; sie entstanden unter Last.
- Verletzungen nach Lesart 1, alle bei TBT:
  - `/` mobil +119 ms gegen Spanne 111;
  - `/leistungen` mobil +43 gegen 41;
  - `/balkon-terrasse` mobil +70 gegen 62;
  - `/` Desktop 0 → 2 ms bei Spanne 0.
- Lesart 2 („HEAD innerhalb [E0-Min, E0-Max]“): 21 Zeilen außerhalb, 9 Richtung schlechter, 12 Richtung besser.
- Grenzen der Messung:
  - Die Reihenfolge E0 vor HEAD war fest.
  - Die Mediane stammen aus den gerundeten Werten der Datei.
  - 7 Läufe wurden wegen des Benchmark-Bands verworfen und neu gemessen (1 E0, 6 HEAD).
  - Die Streuung von TBT mobil ist groß (`/` HEAD 99 bis 277 ms).
- BUDGETS (K-012), nur als Hinweis: LCP mobil ≤ 2,5 s auf 0 von 12 Ansichten (E0 ebenso); Leistung mobil ≥ 90 verfehlt auf 4 Ansichten (E0 ebenso).

## Zugänglichkeit
- Auf f5544581 standen 50 ernste Knoten, alle im Zustand „Menü offen“. Die alte Prüfung maß das Menü nur bei m390.
  - 36 × `label-content-name-mismatch` am Logo-Link im Menü (t768, q844, t1024). Echter Fehler, behoben in 25395ee4.
  - 12 × `target-size` am Schließen-Knopf bei q844 und 2 × `color-contrast` bei m360 auf `/referenzen`. axe maß hier Seiteninhalt unter dem offenen Menüblatt (verwandte Knoten: Menü-Öffner der Seite, Hauptknopf der Seite).
  - Behoben durch `inert` auf dem Seiteninhalt bei offenem Menü (51355ef7). Die Probe ergab danach 0, der volle Lauf auf 51355ef7 ebenfalls 0.
- Navigations-Spec 47/47 in beiden Bewegungszuständen; die Suite bleibt 393/0/25.

## Bestand
- Bildsatz: 120 Kombinationen (12 Ansichten × 10 Größen), 1.334 Aufnahmen. Fehler, Status ungleich 200, Konsolenfehler, Überläufe und Überlappungen: je 0. Die 48 E0-Kombinationen haben Aufnahmenzahl und Seitenhöhe wie E0.
- Bewegung: Register mit 0 unbekannten Kennungen. Übergänge ohne Registereintrag wie E0 (Werte je Ansicht 0 bis 10). Reduziert mit 0 Lage- oder Größenänderungen; die Liste „unsichtbar“ ist je Ansicht gleich E0.
  - Neu ausgewiesen sind je Ansicht 4 Elemente „verdeckt durch Zustand“. Es sind die geschlossenen Aufklappblätter des Kopfs (`#kopf-blatt-*`, `display: none`), kein Inhalt. Das ältere Werkzeug von E0 führte das Feld nicht.
- Pixel: 48 Paare, 0 Pixel, gleiche Höhen; `hoehe_genau` je Paar im Beleg.

## Gegenprüfung
- Leistung: Die Zahlen sind bestätigt, das Ergebnis „nicht erfüllt“ ist robust. Korrigiert wurden ein Grenzfall (`/bad/badsanierung` Desktop TBT, roh 1,5 gegen Spanne 2: kein Grenzfall), zwei Rundungsfälle (`/blog`) und die Angabe zur Last.
- Bestand: Z-11 und Z-03 sind bestätigt. Z-06 hängt an der Lesart von „verdeckt durch Zustand“ (siehe oben); die E0-Herkunft ist nur über den Pixellauf belegt.

## Offene Punkte
- Z-10 TBT mobil → UM-E3-TBT (Messung mit wechselnder Reihenfolge, Zuordnung der Long Tasks), danach UM-E3-LEISTUNG.
- Bildrate wurde in Anlauf 2 nicht neu gemessen. Anlauf 1 (6caeeb9c) lag auf allen 12 Ansichten innerhalb der E0-Streuung; die Menü-Änderung wirkt nur bei offenem Menü.
