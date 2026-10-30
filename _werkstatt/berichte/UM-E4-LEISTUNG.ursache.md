# UM-E4-LEISTUNG · Schritt 1 · Ursachen (Kundschafter)

Quellen: Grundmessung `cache/lighthouse/leist4-grund/` (72 Rohberichte, Lighthouse 13.5.0, mobil simuliert mit RTT 150 ms, 1.638,4 kbit/s, CPU 4-fach; Zusammenfassung `…/leist4/grund/leist4-grund/lighthouse.json`), E0-Rohberichte `cache/lighthouse/e0/`, Vergleich für `/` vor und nach START `cache/lighthouse/lh-{1,2}-{4324,4325}/`, das ausgelieferte HTML und die Bau-Zahlen des Reinraums `reinraum-9c98aa9a/.next` (das ist der gemessene Bau; `src/`, `public/` und `next.config.ts` sind zwischen 9c98aa9a und HEAD unverändert, geprüft mit `git diff --stat`). „KB“ heißt hier 1.024 Byte, wie im Bericht von Lighthouse.
Alle Zahlen stammen aus Skripten unter `…/leist4/kund/` (siehe Abschnitt 9). Gemessen oder neu berechnet habe ich nichts am laufenden System: kein Lighthouse, keine Zeitmessung, kein Bau.

## 1 · Kurzfassung

1. **Budget mobil:** Alle zwölf Ansichten verfehlen LCP ≤ 2,5 s (Median 2,79 bis 3,46 s; `/standorte/wetzlar` 4,88 s). Leistung < 90 haben nur `/standorte/wetzlar` (79) und `/blog` (89). CLS ist überall 0, TBT liegt überall bei höchstens 200 ms (`/blog` genau 200, Wetzlar 194). INP steht in keinem Rohbericht (Navigationsmessung); dafür gilt `werkzeuge/reaktion.mjs` (E-085: 128 ms auf `/`).
2. **Gegen E0** (dritter Budgetpunkt) sind sechs Ansichten im LCP um mehr als die E0-Spanne schlechter (`/bad/badsanierung`, `/bad/barrierefreies-bad`, `/balkon-terrasse`, `/referenzen`, `/ueber-uns`, `/standorte/wetzlar`) und `/standorte/wetzlar` auch in der Leistung (90 → 79). Dieser Punkt ist mit „nur `/`“ nicht erledigt.
3. **Woher die rund 3 s kommen:** Der simulierte LCP ist das Ende des letzten Knotens im Graphen, nicht das Ende des Fotos. Im Graphen stehen 333 bis 410 KB (Median 365 KB): Skripte 192 bis 269 KB (React DOM 71 KB, Next-Laufzeit 45 KB), Schriften 57 KB, Dokument 39 bis 62 KB, zwei Stylesheets 27 KB, das Foto 8 bis 50 KB. Das Foto ist beobachtet nach 65 bis 90 ms fertig und ist nie der letzte Knoten.
4. **Gegenüber E0 gewachsen** (deshalb der LCP-Rückstand): Acht Dokumente sind von unter 43.800 B auf 49 bis 61 KB gestiegen (E0 32 bis 42 KB; `/bad`, `/bad/badsanierung`, `/bad/barrierefreies-bad`, `/balkon-terrasse`, `/referenzen`, `/ueber-uns`, `/blog`, `/standorte/wetzlar`), das kostet eine Rundreise (150 ms) in FCP und LCP. Die Stylesheets wuchsen von 15,5 auf 26,7 KB und eine Datei mehr. Das Foto steht jetzt im Graphen (E0: ein Textabsatz war das LCP-Element, nur das Logo war Bild). Gespart haben die Schriften (72,5 → 56,8 KB). Die sechs Ansichten mit LCP über E0 + Spanne sind genau sechs der acht Dokumente über der Stufe.
5. **Zwei Ausreißer mit je einer klaren Ursache:**
   - `/standorte/wetzlar`: Das LCP-Element ist der Banner-Text (`p#cookie-consent-description > span.block`, 380 × 78 px), den `useConsent` 400 ms nach dem Einhängen einblendet. Beobachtet 807 statt 192 ms. Dadurch stehen 19 bis 20 Prefetch-Abrufe (168 bis 170 KB) und sechs weitere Skriptstücke (43 KB) im Graphen (578 statt 365 KB), simuliert 4,88 s.
   - `/blog`: Die Client-Insel zieht über `ContentContext` → `dataService` den ganzen Inhaltsspeicher und zod ins Bündel (3 zusätzliche Skripte, 234 KB roh, 76,5 KB übertragen, 80 % von zod ungenutzt): +0,35 s LCP und TBT 200.
6. **Maßnahme 1 (ein Stylesheet):** Alle zwölf Ansichten haben dieselben zwei Stylesheets, es gibt kein seitenspezifisches CSS. Belegt ist FCP −145 ms (`/` vor/nach START, sechs gegen sechs Läufe). Für den LCP ist die Wirkung im Nachbau 0 bis −80 ms, für die Leistung +0,1 bis +0,7 Punkte. Der LCP-Anstieg von START (+181 ms im Median) ist damit **nicht allein** der zweiten Datei zuzuschreiben (Abschnitt 5.4).
7. **LCP ≤ 2,5 s:** Mit den belegten, inhaltsgleichen Maßnahmen liegt der Nachbau auf 2,6 bis 2,9 s (Abschnitt 7, Spalte C). Unter 2,5 s käme er nur, wenn React DOM und die Laufzeit aus dem Graphen fallen (−0,45 bis −0,76 s). Das hängt am Wettlauf der Skriptauswertung gegen das erste Malen und ist nach G7 nicht steuerbar. Das Budget ist deshalb auf keiner Ansicht sicher erreichbar; die Ausnahme A-1 trägt für alle zwölf (Abschnitt 8).

## 2 · Ist gegen Budget (mobil)

| Ansicht | Leistung (≥ 90) | LCP s (≤ 2,5) | CLS (≤ 0,1) | TBT ms (≤ 200) | FCP s | Befund |
|---|---|---|---|---|---|---|
| / | 94 (94–94) | 2,85 (2,84–3,00) | 0 | 121 (102–126) | 1,36 | verfehlt: LCP |
| /bad | 93 (93–94) | 3,14 (2,92–3,15) | 0 | 100 (91–109) | 1,36 | verfehlt: LCP |
| /bad/badsanierung | 92 (90–95) | 3,13 (2,85–3,31) | 0 | 142 (102–157) | 1,36 | verfehlt: LCP |
| /bad/barrierefreies-bad | 93 (90–94) | 3,00 (2,99–3,51) | 0 | 95 (89–134) | 1,36 | verfehlt: LCP |
| /leistungen | 94 (92–94) | 3,01 (2,79–3,23) | 0 | 100 (92–147) | 1,36 | verfehlt: LCP |
| /fliesen | 92 (91–93) | 3,01 (2,84–3,23) | 0 | 168 (139–173) | 1,36 | verfehlt: LCP |
| /balkon-terrasse | 93 (91–93) | 3,00 (3,00–3,30) | 0 | 130 (116–131) | 1,36 | verfehlt: LCP |
| /referenzen | 95 (91–95) | 2,86 (2,85–3,30) | 0 | 93 (85–120) | 1,36 | verfehlt: LCP |
| /ueber-uns | 94 (87–95) | 3,00 (2,84–3,25) | 0 | 93 (74–264) | 1,36 | verfehlt: LCP |
| /kontakt | 95 (94–95) | 2,79 (2,56–2,86) | 0 | 98 (69–184) | 1,21 | verfehlt: LCP |
| /standorte/wetzlar | 79 (78–79) | 4,88 (4,88–4,89) | 0 | 194 (191–236) | 1,36 | verfehlt: Leistung, LCP; TBT am Rand |
| /blog | 89 (87–91) | 3,46 (3,10–3,46) | 0 | 200 (157–231) | 1,36 | verfehlt: Leistung, LCP; TBT am Rand |

Lesehilfe: Zahl vor der Klammer = Median je Metrik wie im Zusammenfassungsbericht; die Klammer ist die Spanne der drei Läufe. Einzelne Läufe unter 90: `/ueber-uns` 87 (TBT 264), `/blog` 87, `/bad/badsanierung` 90, `/bad/barrierefreies-bad` 90 (CLS 0,011). Desktop: Leistung 100 überall, LCP 0,53 bis 0,70 s; ein Lauf `/referenzen` Desktop hat 77 (CLS 0,646, Abschnitt 5.8).

### 2.1 Gegenüber E0 (dritter Budgetpunkt)

| Ansicht | Leistung E0 → jetzt | LCP E0 s | LCP jetzt s | Δ LCP s | E0-Spanne s | schlechter als E0 + Spanne? | FCP E0 → jetzt s | Dokument jetzt gegen E0, KB Übertragung |
|---|---|---|---|---|---|---|---|---|
| / | 89 → 94 | 3,47 | 2,85 | −0,62 | 0,05 | nein | 1,36 → 1,36 | 61,0 gegen 73,4 |
| /bad | 92 → 93 | 2,85 | 3,14 | +0,28 | 0,38 | nein | 1,06 → 1,36 | 54,5 gegen 38,0 |
| /bad/badsanierung | 92 → 92 | 2,60 | 3,13 | +0,54 | 0,19 | LCP | 1,06 → 1,36 | 53,6 gegen 34,9 |
| /bad/barrierefreies-bad | 95 → 93 | 2,47 | 3,00 | +0,53 | 0,15 | LCP | 1,06 → 1,36 | 49,7 gegen 32,2 |
| /leistungen | 87 → 94 | 2,92 | 3,01 | +0,09 | 0,29 | nein | 1,06 → 1,36 | 56,6 gegen 53,5 |
| /fliesen | 91 → 92 | 2,72 | 3,01 | +0,29 | 0,37 | nein | 1,22 → 1,36 | 54,1 gegen 56,0 |
| /balkon-terrasse | 95 → 93 | 2,43 | 3,00 | +0,57 | 0,07 | LCP | 1,06 → 1,36 | 59,1 gegen 41,2 |
| /referenzen | 94 → 95 | 2,41 | 2,86 | +0,45 | 0,01 | LCP | 1,06 → 1,36 | 59,5 gegen 42,3 |
| /ueber-uns | 94 → 94 | 2,63 | 3,00 | +0,38 | 0,30 | LCP | 1,07 → 1,36 | 54,1 gegen 33,8 |
| /kontakt | 88 → 95 | 2,71 | 2,79 | +0,08 | 0,46 | nein | 0,91 → 1,21 | 38,5 gegen 33,0 |
| /standorte/wetzlar | 90 → 79 | 2,43 | 4,88 | +2,46 | 0,44 | LCP und Leistung | 1,06 → 1,36 | 49,2 gegen 39,8 |
| /blog | 85 → 89 | 3,12 | 3,46 | +0,34 | 0,45 | nein | 0,91 → 1,36 | 48,2 gegen 35,4 |

TBT ist auf allen Ansichten besser als in E0 (Mediane E0: 162 bis 376 ms, jetzt 93 bis 200 ms), CLS ist 0. FCP ist auf elf Ansichten schlechter (E0 0,91 bis 1,22 s, jetzt 1,21 bis 1,36 s; `/` gleich), geht aber nicht ins Budget ein.

## 3 · Ursache je Ansicht unter Budget (ein Satz)

- **`/` (2,85 s, 94):** Das Foto (13,6 KB) ist beobachtet nach 0,2 s da, aber der simulierte LCP endet am Skript-Ende (React DOM 71 KB und Laufzeit 45 KB teilen sich die Leitung mit 57 KB Schriften, 61 KB Dokument in der dritten Rundreise-Stufe und zwei Stylesheets); die zweite CSS-Datei seit START kostet 145 ms FCP.
- **`/bad` (3,14 s, 93):** wie `/`, dazu ein Foto von 22,9 KB, 16,4 KB eigene Skripte (`2wf7…` Projekt-Check und Badanfrage-Funnel, `2o40…`) und ein Dokument von 54,5 KB.
- **`/bad/badsanierung` (3,13 s, 92, TBT 142):** Dokument 53,6 KB, Foto 18,8 KB, Anfrage-Funnel `3vr-…` (10,7 KB mit `2o40…`) vor dem LCP; eine lange Aufgabe von 259 ms in der Laufzeit.
- **`/bad/barrierefreies-bad` (3,00 s, 93):** Dokument 49,7 KB und Funnel `3vr-…`; der LCP-Rückstand zu E0 (+0,53 s) ist das Dokument (+17,5 KB) plus Foto im Graphen.
- **`/leistungen` (3,01 s, 94):** Dokument 56,6 KB und `2rg4…` (Formatregler und Anfrage-Funnel, 11,1 KB) im Graphen.
- **`/fliesen` (3,01 s, 92, TBT 168):** Das LCP-Element ist der Vorspann-Text; das Foto fehlt im Graphen, dafür stehen die Konfigurator-Stücke (`2qe9…`, `2gmw…`, `2o40…`, 23,4 KB) und ein Dokument von 54,1 KB davor.
- **`/balkon-terrasse` (3,00 s, 93):** Das LCP-Foto `terrasse-hellgraue-platten-weisses-gelaender.jpg` hat 49,7 KB (w=750), das größte aller Ansichten, dazu 59,1 KB Dokument.
- **`/referenzen` (2,86 s, 95):** Dokument 59,5 KB (das größte rohe HTML, 461 KB) und Galerie-Stück `0lnq…` (6,8 KB); sonst nur der gemeinsame Anteil.
- **`/ueber-uns` (3,00 s, 94, ein Lauf 87):** Foto `ueber-uns-mitarbeiter-dichtband-balkon.jpg` 33,3 KB und Dokument 54,1 KB; keine eigenen Skripte. Der Lauf mit 87 hat TBT 264 ms.
- **`/kontakt` (2,79 s, 95):** Das Dokument liegt mit 38,5 KB als einziges unter der Stufe von 43.800 B (zwei statt drei Rundreisen, FCP 1,21 s statt 1,36 s); der Rest ist der gemeinsame Anteil plus Funnel `3dtz…` (9,5 KB). Läufe 2,56 bis 2,86 s: knapp über dem Budget.

Unter dem Leistungs-Budget:

- **`/standorte/wetzlar` (4,88 s, 79):** Der Banner-Text wird 400 ms nach dem Einhängen gezeichnet und ist als Textblock (380 × 78 px = 29.640 px²) größer als der zweizeilige Vorspann; das verschiebt die LCP-Grenze von 192 auf 807 ms und zieht 19 bis 20 Prefetch-Abrufe und weitere Skripte in den Graphen (Abschnitt 5.2).
- **`/blog` (3,46 s, 89, TBT 200):** Die Insel `BlogFilter` bringt über `ContentContext` und `dataService` Inhaltsspeicher und zod mit (76,5 KB Skripte zusätzlich im Graphen, Abschnitt 5.3).

## 4 · Wie der LCP entsteht (Lantern) und was die Rohberichte hergeben

- Lighthouse rechnet mobil simuliert: `LCP = 0,5 · optimistisch + 0,5 · pessimistisch`, je als **Ende des letzten Knotens** im Graphen. Im Graphen steht jede Anfrage, die im ungedrosselten Lauf **vor dem beobachteten LCP** fertig war (das Dokument immer); optimistisch ohne Bilder mit niedriger Priorität. Skripte fallen heraus, wenn ihre erste Auswertung nach dem beobachteten Malen beginnt (der Wettlauf aus E-085; er ist der Grund für die Klassen 2,56 bis 3,5 s zwischen den Läufen derselben Ansicht).
- `lcpLoadDelay` und `lcpLoadDuration` unter `metrics` (auf `/` 843 und 1.181 ms) sind **skalierte Zeitstempel** (beobachtete Werte mal LCP_sim/LCP_beob), keine Dauern. Ich verwende nur die beobachteten Phasen aus `lcp-breakdown-insight`.
- **Beobachtete Phasen** (ungedrosselt, Medianlauf; die Tabelle nennt auch die längsten Aufgaben):

| Ansicht | LCP-Element | beob. FCP / LCP ms | TTFB | Ladeverzögerung | Ladedauer | Render-Verzögerung (alle beobachtet, ungedrosselt) | längste Aufgaben simuliert (Datei Dauer ms @ ms) | TBT (Medianlauf) |
|---|---|---|---|---|---|---|---|---|
| / | Foto | 208 / 208 | 16 | 44 | 27 | 122 | 2tbu000sg63yb 206@3758; Unattributable 131@903; / 127@1170 | 126 |
| /bad | Foto | 159 / 159 | 13 | 39 | 15 | 92 | 2oi9n3b4syua3 197@3913; Unattributable 103@903; /bad 93@1051 | 100 |
| /bad/badsanierung | Foto | 217 / 217 | 17 | 35 | 25 | 140 | 2oi9n3b4syua3 259@3765; 2tbu000sg63yb 123@4185; /bad/badsanierung 116@1045 | 157 |
| /bad/barrierefreies-bad | Foto | 191 / 191 | 12 | 48 | 18 | 113 | 2oi9n3b4syua3 204@3613; /bad/barrierefreies-bad 131@1076; Unattributable 121@904 | 134 |
| /leistungen | Foto | 144 / 175 | 12 | 41 | 18 | 104 | 2oi9n3b4syua3 222@3761; Unattributable 110@904; /leistungen 85@1121 | 100 |
| /fliesen | Vorspann-Text | 152 / 187 | 16 | – | – | 171 | 2oi9n3b4syua3 223@3460; Unattributable 138@903; /fliesen 78@1282 | 173 |
| /balkon-terrasse | Foto | 187 / 187 | 17 | 47 | 24 | 98 | 2tbu000sg63yb 216@4066; /balkon-terrasse 126@1076; Unattributable 125@904 | 130 |
| /referenzen | Foto | 190 / 190 | 14 | 45 | 15 | 116 | 2tbu000sg63yb 201@3608; Unattributable 149@902; /referenzen 85@1096 | 85 |
| /ueber-uns | Foto | 176 / 176 | 15 | 44 | 22 | 96 | 2oi9n3b4syua3 197@3467; Unattributable 130@904; /ueber-uns 94@1081 | 74 |
| /kontakt | Vorspann-Text | 177 / 177 | 11 | – | – | 165 | 2oi9n3b4syua3 188@3161; Unattributable 135@754; /kontakt 101@950 | 69 |
| /standorte/wetzlar | Banner-Text | 192 / 807 | 19 | – | – | 789 | 2oi9n3b4syua3 217@3458; Unattributable 122@903; /standorte/wetzlar 102@1083 | 194 |
| /blog | Vorspann-Text | 205 / 205 | 13 | – | – | 192 | turbopack-3-ry682tkyiqk 200@3758; /blog 117@1049; /blog 116@1226 | 157 |

Das Foto ist nach 67 bis 88 ms (TTFB + Ladeverzögerung + Ladedauer) fertig; bis zum Malen vergehen weitere 92 bis 140 ms. Bei Textansichten (`/blog`, `/fliesen`, `/kontakt`) und Wetzlar fehlen die Foto-Phasen. `lcp-discovery-insight` ist auf allen Foto-Ansichten erfüllt (Foto im Kopf vorgeladen, `fetchpriority=high`, nicht faul). `image-delivery-insight` meldet auf `/balkon-terrasse` 37,4 KiB (LCP-Schätzung −300 ms), `/ueber-uns` 24,9 KiB, `/bad` 16,9 KiB (−100 ms) und `/bad/badsanierung` 13,8 KiB (−100 ms) „größer als nötig“ (750 × 938 geliefert, 378 × 473 angezeigt); Lighthouse rechnet gegen die Anzeigegröße ohne Geräte-Pixelverhältnis (1,75), erreichbar sind bei einer Breite von rund 662 px nur etwa 20 % (Maßnahme 5). Auf den übrigen Ansichten meldet es 0 Byte.
- Die Bandbreite regiert: Im Modell gehen 204,8 KB/s durch eine Leitung, die sich alle laufenden Anfragen teilen; Dokumentstufen sind 14.600, 43.800 und 74.460 B (je Stufe eine Rundreise mehr). Alles im Graphen verlängert das Ende des letzten Knotens, auch wenn es selbst früh fertig ist.
- **Nachbau:** Ich habe die Rechnung mit dem Simulator aus `werkzeuge/node_modules/@paulirish/trace_engine` aus den Anfragen der Rohberichte nachgebaut (Spuren liegen nicht vor). Annahmen aus UM-E3-LEISTUNG: Parsen 40 ms, erstes Layout 54 ms, alle Anfragen am Dokument, Plex Mono am Schrift-CSS, per Skript geladene Anfragen am Laufzeitstück. **Prüfung:** Die FCP-Stufen des Nachbaus (1.182, 1.332, 1.482 ms) liegen konstant 122 bis 127 ms über den gemessenen (1.057/1.060, 1.208/1.209, 1.355 bis 1.363 ms); die Stufen selbst und ihre Verteilung auf die Ansichten stimmen. Der LCP des Nachbaus ist die Klasse „alle Skripte im Graphen“ und liegt 0,06 bis 0,49 s über dem Median (Wetzlar, wo alle Skripte ausgewertet sind: 4.941 gegen 4.885 ms). Differenzen sind deshalb belastbarer als Absolutwerte, und sie sind in Rundreisen von 75 und 150 ms gestuft. Die Lighthouse-Wertung habe ich nachgerechnet (Log-Normal je Metrik, Gewichte 10/10/25/30/25): Abweichung gegen alle 36 mobilen Läufe höchstens 0,77 Punkte.

## 5 · Belege

### 5.1 Was im LCP-Graphen steht

| Ansicht | LCP-Element (Medianlauf) | beob. LCP ms | Graph gesamt | Dokument | CSS (n) | Schriften | Skripte (n) | Bilder | Fetch | routeneigene Skripte |
|---|---|---|---|---|---|---|---|---|---|---|
| / | Foto | 208 | 365,4 (19) | 61,0 | 26,7 (2) | 56,8 | 197,7 (11) | 20,0 | 0,0 | – |
| /bad | Foto | 159 | 378,9 (20) | 54,5 | 26,7 (2) | 56,8 | 208,4 (12) | 29,3 | 0,0 | 2o40bxd28dyf-, 2wf7y3ds1nmhy = 16,4 KB |
| /bad/badsanierung | Foto | 217 | 368,2 (20) | 53,6 | 26,7 (2) | 56,8 | 202,8 (12) | 25,2 | 0,0 | 2o40bxd28dyf-, 3vr-5ix5av2km = 10,7 KB |
| /bad/barrierefreies-bad | Foto | 191 | 355,8 (20) | 49,7 | 26,7 (2) | 56,8 | 202,8 (12) | 16,6 | 0,0 | 2o40bxd28dyf-, 3vr-5ix5av2km = 10,7 KB |
| /leistungen | Foto | 175 | 360,9 (19) | 56,6 | 26,7 (2) | 56,8 | 203,2 (11) | 14,5 | 0,0 | 2rg47gaf7g827 = 11,1 KB |
| /fliesen | Vorspann-Text | 187 | 362,6 (20) | 54,1 | 26,7 (2) | 56,8 | 215,4 (13) | 6,4 | 0,0 | 2o40bxd28dyf-, 2qe979sefxosr, 2gmwve6jrygsl = 23,4 KB |
| /balkon-terrasse | Foto | 187 | 395,8 (19) | 59,1 | 26,7 (2) | 56,8 | 193,9 (11) | 56,1 | 0,0 | 2o40bxd28dyf- = 1,9 KB |
| /referenzen | Foto | 190 | 364,3 (19) | 59,5 | 26,7 (2) | 56,8 | 198,9 (11) | 19,3 | 0,0 | 0lnqw5bp7jraw = 6,8 KB |
| /ueber-uns | Foto | 176 | 372,5 (18) | 54,1 | 26,7 (2) | 56,8 | 192,0 (10) | 39,7 | 0,0 | – |
| /kontakt | Vorspann-Text | 177 | 333,2 (18) | 38,5 | 26,7 (2) | 56,8 | 201,6 (11) | 6,4 | 0,0 | 3dtzn5idq5fg4 = 9,5 KB |
| /standorte/wetzlar | Banner-Text | 807 | 578,3 (45) | 49,2 | 26,7 (2) | 56,8 | 235,5 (16) | 30,0 | 168,4 | 2zhriw9rsdnp8, 0wab_i2m8piux, 2gsi20eqbgjgw = 33,8 KB |
| /blog | Vorspann-Text | 205 | 409,9 (20) | 48,2 | 26,7 (2) | 56,8 | 268,6 (13) | 6,4 | 0,0 | 36m4q_d6seksv, 24-lmw2vpwb45, 2_pzjakezlp0f = 76,5 KB |

Das Muster: Skripte sind rund die Hälfte des Graphen (192 KB gemeinsam: `2tbu…` React DOM 71,2 KB, `2oi9…` Next-Laufzeit 44,8 KB, `20bq…` Kopf, Menü und B-01-Code 19,7 KB, `1y-c…` Link, Einwilligung und Konfiguration 15,1 KB, `2n_l…` Karussell, Firmendaten und `next/image` 13,2 KB, `3srf…` React-Kern 9,5 KB, `03cob…`, `turbopack-…`, `0umf…`, `41sk…`). Davon sind 22,4 KB (32 %) von `2tbu…` laut `unused-javascript` ungenutzt (React DOM, nicht entfernbar).

### 5.2 `/standorte/wetzlar`: der Banner

- `lcp-breakdown-insight`: TTFB 19 ms, Render-Verzögerung 789 ms; Element `div.hoehe-banner > div.p-4 > p#cookie-consent-description > span.block`, 380 × 78 px. Beobachteter FCP 192 ms, LCP 807, 818 und 835 ms in den drei Läufen.
- Quelle: `src/hooks/useConsent.ts` Zeile 141 bis 143 blendet den Banner erst nach `setTimeout(…, 400)` im Effekt ein (Kommentar: „Defer banner slightly so browser paints Hero first“); `src/components/layout/ClientWidgets.tsx` lädt `CookieConsent` per `dynamic(…, { ssr: false })`. Im Markup (`src/components/common/CookieConsent.tsx` Zeile 97 bis 110) stehen zwei `span.block` je drei Zeilen. Der Kommentar dort („kein Textblock des Banners wird größer als die Überschrift der Seite“) stimmt für die Ortsseite nicht: Ihr Vorspann hat nur zwei Zeilen (`/blog`, `/fliesen`, `/kontakt` haben 62.700 bis 104.100 px² und gewinnen gegen den Banner).
- Folge im Graphen (Medianlauf): 45 statt 19 Anfragen, 578 statt 365 KB. Zusätzlich stehen darin 19 bis 20 `?_rsc=`-Abrufe (168 bis 170 KB; Next-Prefetch der Links zu `/standorte/*`, `/`, `/impressum`, `/datenschutz`) und sechs weitere Skriptstücke (43 KB): `0wab…` und `2gsi…` (beide Stücke von `/standorte`, 28,5 KB; Prefetch des Ziels), `2zhr…` (LeadQuickForm) und die späten gemeinsamen `0o-qi2…`, `3kd-…`, `0neekl7…`.
- Nachbau: Grenze auf den beobachteten FCP (192 ms) gesetzt, sonst gleich: −1.686 ms (4.941 → 3.255). Auf den Median übertragen: rund 3,2 s (Spanne 3,0 bis 3,3 s, vergleichbar mit `/fliesen` 3,01 s).
- Betrifft alle Ortsseiten (`/standorte/[stadt]`, gleiche Vorlage `OrtsSeite`), nicht nur Wetzlar.

### 5.3 `/blog`: Inhaltsspeicher und zod

- Route-eigene Chunks laut `.next/diagnostics/route-bundle-stats.json`: `36m4q…` (95.433 B roh, 32,7 KB gz), `24-lmw…` (105.628 B roh, 30,3 KB gz) und `2_pzjakezlp0f` (32.892 B roh, 10,5 KB gz). Zusammen 233.953 B roh; im Graphen 76,5 KB übertragen. Erste Ladung `/blog`: 858 KB roh gegen 625 bis 684 KB der anderen.
- Inhalt: `24-lmw…` enthält zod (`invalid_type`, `too_small`, `ZodError`); `unused-javascript` meldet 23,8 von 29,6 KB ungenutzt. `36m4…` enthält Firmen-, Leistungs-, Projekt-, Beitrags- und Teamdaten (`tezgel_content_*`).
- Kette im Quelltext: `src/app/(bestand)/blog/layout.tsx` (`ContentProvider`) → `src/contexts/ContentContext.jsx` → `src/services/dataService.js` (importiert `@/config/company`, `services`, `projects`, `blog`, `posts`, `team` und `@/schemas/validation` → `zod`). Die Insel braucht nur Kategorien und Beiträge (`useBlogListe`, `BlogCard`, `BlogSidebar`); zod braucht nur `dataService.save()`, und `updateContent`, `resetContent`, `clearAllContent` haben außerhalb des Kontexts keinen Aufrufer (Suche in `src/`).
- Wirkung im Nachbau: Skripte `36m4` und `24-lmw` aus dem Graphen: −300 bis −390 ms (alle drei eigenen Skripte: −390 ms). TBT liegt mit 157 bis 231 ms (Median 200) über den Medianen von 93 bis 100 ms auf `/ueber-uns`, `/referenzen`, `/kontakt`, `/bad` und `/leistungen`; wie viel davon an den 234 KB liegt, ist nicht belegt (Schätzung nach der Maßnahme: rund 130 ms).

### 5.4 Maßnahme 1: Stylesheets je Hauptansicht (render-blockierend)

- **Alle zwölf Ansichten, mobil und Desktop, alle 72 Läufe** liefern dieselben zwei Stylesheets (`render-blocking-insight` und `network-requests` stimmen überein):

  | Datei | Übertragung | roh | Inhalt |
  |---|---|---|---|
  | `3vic8i9diekr2.css` | 25.278 B | 136.490 B | Tailwind-Ausgabe: globals.css und bewegung.css |
  | `0nxicmqezp7pl.css` | 2.056 B (davon rund 1,5 KB Kopfzeilen) | 478 B | die zwei `@font-face` von `next/font/local` (Archivo, Plex Mono) samt `.className` und `.variable` |

  Zusammen 27.334 B Übertragung, 136.968 B roh, 2 Anfragen. `static/chunks` des Builds enthält insgesamt nur diese zwei CSS-Dateien, und im Referenz-Manifest von `/` (`entryCSSFiles`) nennen alle Einträge nur sie: Es gibt **kein seitenspezifisches CSS**, die Einteilung hängt allein an der Größe des einen Haupt-CSS.
- Lighthouse selbst: `render-blocking-insight` schätzt 300 bis 450 ms FCP-Ersparnis mobil (Desktop 50 bis 150 ms); LCP-Ersparnis 0 bei den Foto-Ansichten und 300 bis 400 ms bei `/blog`, `/fliesen`, `/kontakt`, `/standorte/wetzlar` (Text oder Banner als LCP-Element). Das ist die Schätzung für „nicht blockierend“, nicht für „eine Datei“.
- **Kette:** `network-dependency-tree-insight` zeigt auf jeder Ansicht Dokument → `0nxic…css` (2 KB) → `plex_mono_400…woff2` (12 KB, Priorität VeryHigh); längste Kette 153 bis 194 ms beobachtet. Plex Mono kommt erst aus dem Schrift-CSS und steht im FCP-Graphen (VeryHigh), Archivo ist vorgeladen (High).
- **Größenschwelle:** Vor START lag das Haupt-CSS bei 129.046 B roh und enthielt die Schrift-Deklarationen (eine Datei); mit 135.794 B (4325) und jetzt 136.490 B trennt Turbopack sie ab. Die Schwelle liegt zwischen 129.046 und 135.794 B; ihr genauer Wert (vermutlich 128 KiB = 131.072 B) steht in keiner lesbaren Quelle. Zusammensetzung des Haupt-CSS (postcss-Auswertung): `@layer utilities` 75,9 KB (613 Regeln, 37 `@media`, 25 `@container`), `@layer components` (vor allem bewegung.css) 44,6 KB (davon `@media` 13,3 KB, `@supports` 9,5 KB; Regeln mit `k-*`/`data-motion` im Selektor insgesamt rund 24,7 KB), `base` 6,1 KB, `theme` 4,2 KB, `@property` 3,4 KB (56 Stück), `@keyframes` 2,7 KB (40), `@layer properties` (Fallback für Altbrowser) 1,5 KB, drei `@font-face` für die Ersatzschriften 0,7 KB.
- **Wirkung belegt für `/` (lh-1/lh-2 4324 gegen 4325, je sechs Läufe):**

  | | vorher 4324 | nachher 4325 |
  |---|---|---|
  | Stylesheets | 1 (129.046 B roh, 24.388 B) | 2 (478 B/2.056 B und 135.794 B/25.174 B) |
  | Dokument | 57.616 B | 62.475 B (+4,7 KB) |
  | Graph | 17 Anfragen, 356,4 KB (Skripte 193,8, 10 Stück) | 19 Anfragen, 364,9 KB (Skripte 197,4, 11 Stück) |
  | FCP (Läufe) | 1.217, 1.211, 1.213, 1.057, 1.060, 1.211 | 1.357, 1.355, 1.363, 1.356, 1.356, 1.361 |
  | LCP sortiert | 2.702, 2.703, 2.766, 2.867, 3.161, 3.165 (Median 2.816) | 2.848, 2.857, 2.990, 3.004, 3.006, 3.212 (Median 2.997) |

  FCP +145 ms ist eindeutig (alle sechs Läufe). Im Nachbau erzeugt der Wechsel der beiden Graphen FCP +150 und LCP +150 (1.332 → 1.482 und 3.186 → 3.336), die Teilrechnung „nur ein Stylesheet“ auf dem Graphen von 4325 aber nur LCP −6 ms und FCP −246 ms (zu groß, weil Plex dort ohne Kette läuft; belegt sind −145). **Der LCP-Anstieg ist also ein Zusammenspiel** aus 8,5 KB mehr im Graphen (Dokument +4,7, Stylesheets +2,8, Skripte +3,6, Bild −2,5) und der Rundreisen-Stufung; die zweite CSS-Datei erklärt FCP, aber höchstens 0 bis 80 ms des LCP. Für Maßnahme 1 gilt deshalb: **erwarteter Gewinn FCP −145 ms (belegt), LCP 0 bis −80 ms (Modell), Leistung +0,1 bis +0,7 Punkte.**
- Wege: (a) `experimental.cssChunking: 'graph'` mit hohem `requestCost` oder (b) das Haupt-CSS unter die Schwelle (belegt gesichert unter 129.046 B: −7,4 KB roh oder 5,4 %; Kandidaten: `@property` 3,4 KB, `@layer properties` 1,5 KB, `@keyframes` 2,7 KB prüfen, `bewegung.css` 86,6 KB Quelle) oder (c) die zwei `@font-face` (478 B) als `<style>` im Kopf statt als Datei: Das spart die Anfrage samt 1,5 KB Kopfzeilen und ließ im Nachbau FCP −150 (Plex nicht mehr hinter dem CSS), ohne die Schwelle des Haupt-CSS zu berühren. (c) ändert `src/app/(bestand)/_dokument.tsx` (die zwei `localFont`-Aufrufe), was `.className`/`.variable` (`html class="…_variable"`) und die Vorladung von Archivo berührt; das ist Sache des Baumeisters. Absicherung für jeden Weg: ein Test in `test/`, der im Build-HTML von `/` (`.next/server/app/index.html`) die `<link rel="stylesheet">` zählt (jetzt 2).

### 5.5 Dokument

| Ansicht | roh B | Übertragung laut Bericht B | gzip-Körper B | Brotli-4 B | Stufe 2 (≤ 43.800 B): nötig −B | in % |
|---|---|---|---|---|---|---|
| / | 431886 | 62509 | 60770 | 43336 | 18709 | 30 % |
| /bad | 374239 | 55764 | 54025 | 40472 | 11964 | 21 % |
| /bad/badsanierung | 362623 | 54910 | 53172 | 39029 | 11110 | 20 % |
| /bad/barrierefreies-bad | 324879 | 50889 | 49153 | 36826 | 7089 | 14 % |
| /leistungen | 412075 | 57940 | 56201 | 42089 | 14140 | 24 % |
| /fliesen | 357865 | 55397 | 53657 | 40412 | 11597 | 21 % |
| /balkon-terrasse | 395083 | 60545 | 58806 | 42223 | 16745 | 28 % |
| /referenzen | 471694 | 60903 | 59164 | 42863 | 17103 | 28 % |
| /ueber-uns | 376144 | 55363 | 53624 | 40420 | 11563 | 21 % |
| /kontakt | 261169 | 39457 | 37725 | 30331 | unter der Stufe |  |
| /standorte/wetzlar | 348146 | 50349 | 48618 | 36925 | 6549 | 13 % |
| /blog | 357596 | 49364 | 47633 | 36996 | 5564 | 11 % |

Zusammensetzung von `/` (gzip, Stufe 6; `docanalyse.mjs`): RSC-Fluss `self.__next_f` 203.824 B roh = 29,7 KB gz (die Hälfte der Übertragung), Markup ohne RSC und JSON-LD 29,5 KB gz, davon `class`-Attribute 101 KB roh = 6,1 KB gz und 192 Inline-SVG 54 KB roh = 5,2 KB gz; Kopf 15,8 KB roh = 4,2 KB gz; JSON-LD 2,1 KB gz; `srcSet`-Werte nur 0,7 KB gz. Im RSC-Fluss stehen die `className`-Werte noch einmal (67,6 KB roh). `/kontakt` (37,7 KB gz) hat 117 KB RSC-Fluss und zeigt, was unter der Stufe liegt. Mit Brotli (Vercel) liegt das Dokument deutlich niedriger (Stufe 4: `/` 42,3 KB; E-085 mit dem Proxy: 34,9 KB vor START); der Hebel steckt also in der gzip-Messung, die das Budget streng prüft.

### 5.6 Skripte und TBT

- Vor dem LCP laden 10 gemeinsame Skripte (192,1 KB) plus 0 bis 3 eigene (bis 76,5 KB, `/blog`; Wetzlar 33,8 KB nur wegen des späten Banners). Weitere gemeinsame Stücke laden danach (`0o-qi2…` 1,7 KB, `3kd-…` 5,7 KB, `0neekl7…` 2,3 KB).
- Erste Ladung laut Next (`.next/diagnostics/route-bundle-stats.json`, unkomprimiert): 624 KB (`/ueber-uns`) bis 684 KB (`/fliesen`), `/blog` 858 KB. Module der Quelle in den Stücken des Layouts (`module.mjs`, gz einzeln): `components/verlegen/Verlegen.tsx` (B-01, eingefroren) 18,6 KB roh / 6,9 KB gz; `components/layout/HeaderWrapper.tsx` 15,5 / 4,8; `components/kern/Karussell.tsx` 5,6 / 2,1; Einwilligung `98150` 9,7 / 3,0 und `cookie-inventory` 5,6 / 2,3; `config/cities` 3,9 / 1,5 und Firmen- und Seiten-Konfiguration 5,0 + 3,2 KB roh (2,2 + 1,6 gz) im Client; `next/image` (Client-Teil) 7,3 / 3,6.
- **TBT-Verursacher** (simulierte lange Aufgaben, Tabelle in Abschnitt 4): bei allen Ansichten eine Aufgabe von 188 bis 259 ms in der Laufzeit `2oi9…`, in React DOM `2tbu…` oder in `turbopack-…` bei 3,1 bis 4,2 s (Hydrierung), je 94 bis 149 ms „Unattributable“ bei 0,9 s (erstes Layout) und 78 bis 131 ms für das Parsen des Dokuments (`/blog` zweimal 117/116 ms, in einem Lauf 143 ms). `max-potential-fid` 188 bis 259 ms. `bootup-time` auf `/`: `2tbu…` 962 ms gesamt (651 ms Auswertung), Dokument 918 ms. `forced-reflow-insight` auf 9 von 12 Ansichten (17 bis 67 ms, `2tbu…` und Unattributiertes).
- Höchste TBT-Werte: `/blog` 200 (Läufe 157 bis 231) und Wetzlar 194; beide wegen des zusätzlichen JS beziehungsweise der Prefetch-Abrufe in den Aufgaben.

### 5.7 Schriften

Archivo: 45.909 B übertragen (44.364 B roh), Priorität High, vorgeladen, fertig nach 61 bis 85 ms. Plex Mono: 12.237 B (10.692 B roh), VeryHigh, aus dem Schrift-CSS, fertig nach 147 bis 213 ms, steht in allen Läufen im FCP- und LCP-Graphen (57 KB Schriften gesamt gegen 72,5 KB in E0). Plex Mono nicht im Graphen: Nachbau −75 bis −150 ms; die Schrift ist aber sichtbar benutzt (Mono-Zeilen), also keine inhaltsgleiche Maßnahme. Ein Vorladen von Plex (am Dokument statt am CSS) ist im Nachbau **schlechter** (FCP +150).

### 5.8 CLS und Ausreißerläufe

- Mobil CLS 0 im Median; Läufe mit Verschiebung: `/bad/barrierefreies-bad` Lauf 2 (0,011), Desktop `/referenzen` Lauf 2 (**0,646**, Leistung 77). Beide Male nennt `layout-shifts` als Ursachen das Foto im `einstieg-lot` („Media element lacking an explicit size“, `width`/`height` sind gesetzt) und **„Web font loaded“: Plex Mono** (`font-display: swap`, nicht vorgeladen). Das ist ein seltener Wettlauf (2 von 72 Läufen), aber der einzige Weg, auf dem das CLS-Budget reißen kann. Ersatzschrift „Plex Ersatz“ steht in `src/app/globals.css` Zeile 243 ff. (`local("Courier New")`, `Liberation Mono`); ob sie in der Messumgebung greift, ist nicht belegt.
- Lauf `/ueber-uns` 1: TBT 264 ms, Leistung 87.

### 5.9 Unbenutztes CSS und JS

`unused-css-rules` ist auf allen 72 Läufen leer (kein Beleg für „kein toter Code“: das Haupt-CSS ist ein globales Tailwind-Ergebnis und Lighthouse wertet hier nur Seiten-Abdeckung). `unused-javascript`: nur `2tbu…` (React DOM) 22,4 von 69,6 KB, auf `/blog` zusätzlich `24-lmw…` (zod) 23,8 von 29,6 KB. `unused-javascript` meldet LCP-Ersparnis 150 ms in rund der Hälfte der Läufe: die Klasse, in der React DOM im Graphen steht.

## 6 · Maßnahmen, geordnet nach belegter Wirkung

Wirkung = Nachbau-Differenz in ms auf den simulierten LCP (gestuft in 75/150 ms) und gerechnete Leistungspunkte; „belegt“ = aus den Messungen selbst. Ansichten ohne Angabe sind nicht betroffen.

| # | Maßnahme | Ansichten | Dateien | Wirkung | Beleg | Bedingung |
|---|---|---|---|---|---|---|
| **1** (verbindlich) | **Ein render-blockierendes Stylesheet** (cssChunking `graph`, kleineres Haupt-CSS oder die zwei `@font-face` inline) | alle 12 (gleich) | `next.config.ts`, `src/app/globals.css`, `src/app/bewegung.css`, `src/app/(bestand)/_dokument.tsx` | FCP **−145 ms** (belegt), LCP 0 bis −80, Leistung +0,1 bis +0,7 | 5.4 | Test auf Zahl der Stylesheets von `/`; G6 mit Denkprotokoll |
| 2 | **Banner nicht mehr LCP-Element der Ortsseiten:** Textblöcke des Banners kleiner als der Vorspann (Wortlaut, Knöpfe, Wirkung gleich) | `/standorte/wetzlar` (und alle Ortsseiten) | `src/components/common/CookieConsent.tsx` Z. 97 bis 110 (Hook `src/hooks/useConsent.ts` Z. 141 bis 143 unverändert lassen) | LCP **−1.690 ms** (4,88 → ca. 3,0 bis 3,2 s), Leistung **79 → 90 bis 92** (+11 bis +13), beobachteter LCP 807 → ca. 190 ms | 5.2 | E-067: Wortlaut, Knöpfe, Wirkung gleich; nur Messbreite 412 px belegt, bei 200 % Schrift wachsen die Blöcke wieder |
| 3 | **Blog ohne Inhaltsspeicher und zod:** Beiträge und Kategorien schlank (Server-Props oder eigene kleine Datenquelle), zod nur beim Speichern laden | `/blog` (und `/blog/[slug]`) | `src/app/(bestand)/blog/layout.tsx`, `src/contexts/ContentContext.jsx`, `src/services/dataService.js`, `src/lib/formulare/useBlogListe.ts`, `components/blog/BlogFilter.jsx`, `BlogCard.jsx`, `BlogSidebar.jsx` | LCP **−300 bis −390 ms** (3,46 → ca. 3,1 bis 3,2 s), TBT 200 → ca. 130, Leistung 89 → 92 bis 94 | 5.3 | G9 (keine Logikänderung): nur `localStorage`-Überschreibungen der Inhalte entfallen, wenn `dataService` fällt; sauberer Weg: `dataService` bleibt, `validationSchemas` per `import()` nur in `save()` (zod −30,3 KB gz) |
| 4 | **Dokumentstufe: Übertragung ≤ 43.800 B** (eine Rundreise weniger) | 11 von 12 (nicht `/kontakt`) | RSC-Fluss und Markup der Vorlagen `src/components/vorlagen/*`, Klassenketten (`class` 6,1 KB gz plus `className` im RSC-Fluss), Inline-SVG (192 Stück auf `/`), `src/lib/schema*` | LCP **−150 ms** und FCP −150 ms je Ansicht, Leistung +1,0 bis +1,2 | 5.5 (T4) | nötig −5,4 bis −18,3 KB (−11 bis −30 %), ohne Inhaltsverlust: kein billiger Einzelhebel belegt (`srcSet` 0,7 KB, JSON-LD 2,1 KB gz); Produktion (Brotli) erfüllt die Stufe voraussichtlich schon |
| 5 | **LCP-Foto leichter:** `terrasse-hellgraue-platten-weisses-gelaender.jpg` (49,7 KB), `ueber-uns-mitarbeiter-dichtband-balkon.jpg` (33,3 KB), `helles-bad-glasdusche-holzoptik.jpg` (22,9 KB), `badewanne-ornamentfliesen-nische.jpg` (18,8 KB) bei w=750. Ohne Qualitätsverlust nur über genauere Breite (Zwischenstufe um 662 px in `images.deviceSizes`, `sizes` der Hochformat-Fotos mit Rand): rund −20 % Bytes | `/balkon-terrasse`, `/bad`, `/bad/badsanierung`, `/ueber-uns` | `public/images/arbeiten/**`, `next.config.ts` (`images.deviceSizes`, `images.qualities` ist `[75]`), `sizes` im Bildfeld | genauere Breite: 0 bis −75 ms (Nachbau); „auf 14 KB“ (nur mit Qualitätsverlust): `/balkon-terrasse` −150, die anderen −75; Lighthouse schätzt −300/−100/−100 ms | 4, 5.1, T5 | E-097 nennt „Bildbreite und `sizes` für m390 bei DPR 3“ als Restmaßnahme: das gilt nicht für die Lighthouse-Emulation (412 px, DPR 1,75); kleinere Qualität verändert das Bild (Pixelvergleich) |
| 6 | **Kleine gemeinsame Skriptposten aus dem Client-Bündel:** Firmen-, Seiten-, Städte- und Navigationsdaten, die Kopf und Menü als Import mitbringen, und der Client-Teil von `next/image`; Daten per Props statt Import | alle 12 | `src/components/common/Header.jsx`, `MobileMenu.jsx`, `src/components/layout/MobileBottomBar.tsx`, `src/components/layout/HeaderWrapper.tsx`, `src/config/company.js`, `cities.ts`, `navigation.js`, `site.js` | je 10 KB gz weniger rund −80 ms (Stufen); erreichbar sind nur etwa 9 KB gz (Firmen 2,2 + Seite 1,6 + Städte 1,5 + `next/image` 3,6) | 5.6 | G8 (Einwilligung, Formulare unberührt); `Verlegen.tsx` (B-01, 6,9 KB gz) bleibt eingefroren; Wirkung unsicher |
| 7 | Stufe 2 für route-eigene Skripte (Funnels, Konfigurator, Galerie): nicht vor dem LCP laden | 8 Ansichten (−75 bis −150) | `app/(bestand)/{bad,leistungen,fliesen,kontakt,referenzen}/page.jsx` | −75 bis −150 ms | T5 | **nicht empfohlen:** die Formulare stehen im HTML (G8); Verschieben nur der Messung wegen ist G7 |
| 8 | Plex Mono aus dem ersten Bild nehmen (kein Vorladen!) | alle | `src/app/(bestand)/_dokument.tsx` | −75 bis −150 ms | 5.7 | **nicht empfohlen:** sichtbare Änderung; Vorladen verschlechtert (FCP +150) |
| 9 | Inline-Kopfskript (`KOPFSKRIPT`, 943 B) vor das Stylesheet (Parser-Halt) | alle | `src/app/(bestand)/_dokument.tsx` Z. 156 bis 166 | Nachbau 0; für echte Nutzer kleiner Vorteil | E-085 | Reihenfolge der Kopf-Elemente steuert React (`data-precedence`); Wirkung nicht belegt |
| 10 | Next-Prefetch der Links im ersten Bild abschalten (19 bis 20 Abrufe, 168 bis 170 KB auf der Ortsseite; Links in Kopf, Fuß, Brotkrumen und Einzugsband) | `/standorte/*` | `src/components/kern/Einzugsband.tsx` Z. 83, `src/components/common/Header.jsx`, `Footer.jsx` | nach Maßnahme 2 ohne LCP-Wirkung; spart 170 KB und RSC-Parsen im ersten Bildschirm | 5.2 | Speculation Rules (`_dokument.tsx`) holen das Ziel ohnehin beim Zeigen; Sofortgefühl prüfen |
| 11 | Plex-Wettlauf als CLS-Risiko absichern (Ersatzschrift-Metriken prüfen) | Desktop `/referenzen`, mobil `/bad/barrierefreies-bad` | `src/app/globals.css` Z. 243 ff. | schützt CLS und Leistung in 2 von 72 Läufen | 5.8 | keine sichtbare Änderung im Ruhezustand |
| – | React DOM und Laufzeit aus dem Graphen (Wettlauf) | alle | – | −450 bis −760 ms | E-085, 4 | **nicht steuerbar (G7)** |

## 7 · Erwartung je Ansicht (Nachbau; Leistung nachgerechnet)

A = Maßnahme 1 allein (FCP −145 ms, LCP laut Nachbau). B = A plus Foto leichter (nur wo das Foto über 15 KB hat). C = B plus Dokumentstufe (nur wo das Dokument über der Stufe liegt). D = C plus Banner (Wetzlar) beziehungsweise Blog ohne Inhaltsspeicher (TBT dort ca. 130). Alle Angaben auf den **Median** gerechnet, mit ±1 Stufe (150 ms) Unsicherheit.

| Ansicht | Ist (Median): LCP / Leistung | A: ein Stylesheet (FCP −145) | B: A + Foto auf 14 KB | C: B + Dokumentstufe | D: C + Banner (Wetzlar) bzw. Blog-JS | Leistung A / C (Punkte) |
|---|---|---|---|---|---|---|
| / | 2,85 s / 94 (Lauf 94) | 2,84 s / 94 | 2,84 s / 94 | 2,69 s / 95 | 2,69 s / 95 | +0,2 / +1,1 |
| /bad | 3,14 s / 93 (Lauf 93) | 3,06 s / 94 | 2,98 s / 94 | 2,83 s / 95 | 2,83 s / 95 | +0,7 / +2,2 |
| /bad/badsanierung | 3,13 s / 92 (Lauf 92) | 3,13 s / 92 | 3,05 s / 92 | 2,90 s / 93 | 2,90 s / 93 | +0,2 / +1,7 |
| /bad/barrierefreies-bad | 3,00 s / 93 (Lauf 93) | 2,99 s / 93 | 2,99 s / 93 | 2,84 s / 94 | 2,84 s / 94 | +0,2 / +1,2 |
| /leistungen | 3,01 s / 94 (Lauf 94) | 2,93 s / 94 | 2,93 s / 94 | 2,78 s / 95 | 2,78 s / 95 | +0,7 / +1,7 |
| /fliesen | 3,01 s / 92 (Lauf 92) | 3,00 s / 92 | 3,00 s / 92 | 2,85 s / 93 | 2,85 s / 93 | +0,2 / +1,2 |
| /balkon-terrasse | 3,00 s / 93 (Lauf 93) | 2,93 s / 94 | 2,78 s / 95 | 2,63 s / 96 | 2,63 s / 96 | +0,6 / +2,5 |
| /referenzen | 2,86 s / 95 (Lauf 95) | 2,85 s / 95 | 2,85 s / 95 | 2,70 s / 96 | 2,70 s / 96 | +0,2 / +1,2 |
| /ueber-uns | 3,00 s / 94 (Lauf 94) | 3,00 s / 94 | 2,92 s / 95 | 2,77 s / 96 | 2,77 s / 96 | +0,2 / +1,7 |
| /kontakt | 2,79 s / 95 (Lauf 96) | 2,71 s / 96 | 2,71 s / 96 | 2,71 s / 96 | 2,71 s / 96 | +0,5 / +0,5 |
| /standorte/wetzlar | 4,88 s / 79 (Lauf 79) | 4,82 s / 80 | 4,82 s / 80 | 4,67 s / 81 | 2,99 s / 92 (Banner nicht LCP) | +0,4 / +1,3 |
| /blog | 3,46 s / 89 (Lauf 89) | 3,38 s / 90 | 3,38 s / 90 | 3,23 s / 91 | 2,93 s / 94 (JS −63 KB gz) | +0,7 / +1,8 |

Folgerungen:

- Mit A allein bleibt der LCP bei 2,71 bis 3,38 s (außer Wetzlar 4,82 s); die Leistung ändert sich um höchstens +0,7 Punkte.
- Leistung ≥ 90 erreichen mit den Maßnahmen 2 und 3 alle zwölf Ansichten im Nachbau (Wetzlar 90 bis 92, `/blog` 92 bis 94). Wetzlar bleibt das knappste Ergebnis (rechnerisch 90,2 bei LCP 3,2 s und TBT 194 ms; 91,2 bei 3,05 s).
- LCP ≤ 2,5 s erreicht keine Ansicht: bester Nachbauwert `/balkon-terrasse` 2,63 s, dann `/` 2,69, `/referenzen` 2,70, `/kontakt` 2,71 s. Die verbleibenden 0,13 bis 0,3 s liegen in React DOM und Laufzeit.
- Gegen E0 bleiben `/bad/badsanierung` (2,90 s gegen 2,60 s, Spanne 0,19 s), `/bad/barrierefreies-bad` (2,84 s gegen 2,47 s, 0,15 s), `/balkon-terrasse` (2,63 s gegen 2,43 s, 0,07 s), `/referenzen` (2,70 s gegen 2,41 s, 0,01 s) und `/standorte/wetzlar` (rund 3,0 s gegen 2,43 s, 0,44 s) über der E0-Spanne; `/ueber-uns` (2,77 s gegen 2,63 s, Spanne 0,30 s) käme hinein. Der Abstand ist im Kern das Foto im Graphen und das Dokument (E0 32 bis 42 KB, davon ist die Stufe schon in C eingerechnet).

Wirkung je Maßnahme je Ansicht im Nachbau (Differenz in ms gegen den Nachbau-Ausgangswert):

| Ansicht | Nachbau LCP (gemessen) | ein Stylesheet | Dokument auf Stufe 43,8 KB | LCP-Foto auf 14 KB | routeneigene Skripte nicht im Graphen | Plex Mono nicht im Graphen | Skripte −20 KB (kleinste Stücke) | Banner nicht LCP (Grenze = FCP) |
|---|---|---|---|---|---|---|---|---|
| / | 3336 (2850) | -6 | -150 | – | – | -75 | -162 | – |
| /bad | 3486 (3137) | -81 | -150 | -75 | -150 | -150 | -231 | – |
| /bad/badsanierung | 3411 (3135) | -6 | -150 | -75 | -75 | -75 | -162 | – |
| /bad/barrierefreies-bad | 3336 (2998) | -6 | -150 | – | -75 | -75 | -162 | – |
| /leistungen | 3336 (3011) | -81 | -150 | – | -150 | -150 | -162 | – |
| /fliesen | 3330 (3010) | -6 | -150 | – | -150 | -75 | -156 | – |
| /balkon-terrasse | 3486 (3002) | -75 | -150 | -150 | -75 | -150 | -162 | – |
| /referenzen | 3336 (2857) | -6 | -150 | – | -75 | -75 | -162 | – |
| /ueber-uns | 3336 (3005) | -6 | -150 | -75 | – | 0 | -87 | – |
| /kontakt | 3105 (2786) | -81 | – | – | -75 | -75 | -81 | – |
| /standorte/wetzlar | 4941 (4885) | -63 | -150 | – | -276 | -126 | -144 | -1686 |
| /blog | 3567 (3458) | -75 | -150 | – | -387 | -138 | -201 | – |

## 8 · Offene Fragen und Grenzen

1. **Zweiter Messweg:** Gemessen wird lokal mit `next start` und gzip. Mit Brotli Stufe 4 liegen neun der zwölf Dokumente (samt rund 1,7 KB Kopfzeilen) unter der Stufe von 43.800 B (nicht `/`, `/referenzen`, `/balkon-terrasse`), mit der Stärke des Proxys `werkzeuge/brotli-proxy.mjs` aus E-085 vermutlich alle; Maßnahme 4 wäre in Produktion dann schon erfüllt. Welche Messung gilt für die Abnahme von K-012 (E-085: gzip für den Vergleich mit E0, Brotli als Zweitmessung)?
2. **Ausnahme A-1:** Für `/` gilt sie seit E-085. Nach den belegten Maßnahmen liegt der Nachbau auf keiner Ansicht sicher unter 2,5 s. Soll A-1 auf alle zwölf Ansichten (und alle Ortsseiten) ausgedehnt werden? Der dritte Budgetpunkt (E0 + Spanne) bleibt auf `/bad/badsanierung`, `/bad/barrierefreies-bad`, `/balkon-terrasse`, `/referenzen` und `/standorte/wetzlar` verfehlt, solange das Dokument nicht unter die Stufe kommt (Maßnahme 4).
3. **Anteil der zweiten CSS-Datei am LCP:** Belegt ist nur FCP +145 ms. Der Nachbau gibt 0 bis −80 ms für den LCP. Ob Maßnahme 1 den LCP-Median um 181 ms zurückholt (so E-097), ist durch die Daten nicht gedeckt; die Messung des Orchestrators klärt es.
4. **Wetzlar, Maßnahme 2:** Nur das Teilen der Textblöcke lässt den Vorspann (192 ms) LCP-Element bleiben: Nachbau 3.255 ms. Den Banner früher einzublenden wäre schlechter: Bei Grenze 400 ms steht er im Graphen mit 29 statt 18 Anfragen, Nachbau 3.816 ms (+0,56 s). Ob die geteilten Blöcke bei 412 px (Lighthouse), m360 und m390 kleiner als der Vorspann bleiben, prüft der Baumeister am Browserbild.
5. **Blog, Maßnahme 3:** Darf `ContentContext`/`dataService` für `/blog` fallen oder nur zod/Daten schlank werden (Admin-Überschreibungen über `localStorage` bleiben)? G9 verlangt keine Logikänderung.
6. **Foto-Gewicht, Maßnahme 5:** Qualität der vier Fotos senken (sichtbar) oder lassen?
7. **INP:** nicht aus den Rohberichten ablesbar; `reaktion.mjs` gegen die Hauptansichten laufen lassen. `max-potential-fid` liegt auf 8 von 12 Ansichten über 200 ms (188 bis 259 ms), ist aber kein INP.
8. **Wettlauf der Skripte:** Er bestimmt, ob eine Ansicht im Lauf 2,56 oder 3,5 s hat (Spanne `/kontakt` 2,56 bis 2,86 s, `/bad/barrierefreies-bad` 2,99 bis 3,51 s). Für Mediane aus drei Läufen heißt das: Unterschiede unter 0,2 s sind kein Beleg.
9. **Nicht belegt:** der Wert der Schwelle für das Verschmelzen der CSS-Dateien; ob die Ersatzschrift „Plex Ersatz“ in der Messumgebung greift; der LCP-Anteil der zweiten CSS-Datei; Wirkung des Kopfskripts vor dem Stylesheet; Wirkung von Maßnahme 6 jenseits des Nachbaus.

## 9 · Skripte und Dateien (nur lesend entstanden)

Alle unter `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/leist4/kund/`:

- `extrahiere.mjs` zieht aus den Rohberichten je Ansicht, Form und Lauf alle Werte nach `lauf.json` (Grundmessung), `e0.json` (E0) und `start-lh-*.json` (4324/4325).
- `html.mjs`, `docanalyse.mjs`, `cssanalyse.cjs`, `chunkmap.mjs`, `module.mjs`, `module2.mjs` lesen den Reinraum-Bau (`reinraum-9c98aa9a/.next`): HTML, Dokumentzusammensetzung, CSS, Chunks und Module.
- `modell.mjs` (Kopie des Simulatoraufrufs aus `leist-skripte/modell.mjs`, Herkunft auf 4325), `modell2.mjs` (Graph aus den Anfragen), `szenarien.mjs`, `wirkung.mjs`, `stufe.mjs`, `zeige.mjs`: der Lantern-Nachbau mit den Rechnungen.
- `punkte.mjs` (Wertung), `erwartung.mjs`, `tabellen.mjs`: die Tabellen dieses Berichts.
- Quelltext, auf den sich die Maßnahmen beziehen (HEAD, nur gelesen): `next.config.ts`, `src/app/globals.css`, `src/app/bewegung.css`, `src/app/(bestand)/_dokument.tsx`, `src/components/common/CookieConsent.tsx`, `src/hooks/useConsent.ts`, `src/components/layout/ClientWidgets.tsx`, `src/app/(bestand)/blog/layout.tsx`, `src/contexts/ContentContext.jsx`, `src/services/dataService.js`, `src/schemas/validation.js`, `src/lib/formulare/useBlogListe.ts`, `src/components/blog/*`.
