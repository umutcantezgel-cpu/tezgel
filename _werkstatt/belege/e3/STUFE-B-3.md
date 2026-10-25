# STUFE-B-3 · Leistung (Reaktion, Lighthouse) · E3-PRUEF-B, Teil -3

Prüfer E3-PRUEF-B-3, Haiku 5.5. Stand: Produktionsbau auf 127.0.0.1:4311 (Commit e64b4adb, frisch gestartet, nicht verändert). Keine Deutung. Ausgangswerte E0: `_werkstatt/belege/e0/lighthouse.json` und `_werkstatt/belege/e0/STUFE-B.md` Abschnitt 8. Reaktion: E0 hat keinen Wert (INP-Messung ab E2); E2-Wert nur zum Vergleich in Abschnitt 1.

## Positivproben (vor der Messung)

- `einzelbild.mjs --seite /gibt-es-wirklich-nicht-200 --ansichten m390`: Exit 1, HTTP 404. BESTANDEN. Beleg: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-PRUEF-B/probe/einzelbild.json`
- `reaktion.mjs --probe --laeufe 1`: Exit 0, „PROBE OK“ (langsam 320 ms, schnell 32 ms, Drosselung 4.2). BESTANDEN. Beleg: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-PRUEF-B/reaktion-probe/reaktion.json`

## 1 · Reaktion (`reaktion.mjs`, m390, CPU 4×, Median aus 3 Läufen je Handlung)

Budget: höchster Median je Seite ≤ 200 ms (Z-08). Belege: `_werkstatt/belege/e3/reaktion.json` (Seiten `/`, `/bad`, `/kontakt`, `/referenzen`, Schritt 1 des Pakets) und `_werkstatt/belege/e3/reaktion-weitere.json` (übrige acht Hauptansichten, gleiche Bedingungen, Zusammenfassung dort).

| Seite | Hauptknopf | Menü | Akkordeon | Eingabe | Link | Höchster Median | Budget ≤ 200 | erfüllt |
|---|---|---|---|---|---|---|---|---|
| `/` | 88 | 96 | — | 48 | 40 | 96 | 200 | ja |
| `/bad` | 56 | 64 | — | — | 40 | 64 | 200 | ja |
| `/bad/badsanierung` | 56 | 64 | — | — | 40 | 64 | 200 | ja |
| `/bad/barrierefreies-bad` | 56 | 72 | — | — | 32 | 72 | 200 | ja |
| `/leistungen` | 56 | 80 | — | 64 | 48 | 80 | 200 | ja |
| `/fliesen` | 72 | 72 | — | — | 32 | 72 | 200 | ja |
| `/balkon-terrasse` | 72 | 72 | — | — | 40 | 72 | 200 | ja |
| `/referenzen` | 64 | 64 | — | — | 32 | 64 | 200 | ja |
| `/ueber-uns` | 72 | 88 | — | — | 32 | 88 | 200 | ja |
| `/kontakt` | 104 | 80 | — | 64 | 48 | 104 | 200 | ja |
| `/standorte/wetzlar` | 80 | 80 | — | 48 | 56 | 80 | 200 | ja |
| `/blog` | 56 | 80 | — | 88 | 48 | 88 | 200 | ja |

„—“: Handlung auf der Seite nicht vorhanden (Werkzeugangabe). Höchster Wert aller Seiten: 104 ms (`/kontakt`, Hauptknopf). Vergleich: E2 `/` 168 ms (`_werkstatt/belege/e2/reaktion.json`, 5 Läufe), nicht E0.

## 2 · Lighthouse (`lighthouse.mjs`, Median aus 3 Läufen, je Seite ein Aufwärmlauf)

Bedingungen: lokal `next start`, Erstbesuch mit Banner, Dritt-Hosts blockiert, Standarddrosselung, frisches Profil je Lauf. Mobil und Desktop je 3 gezählte Läufe. Benchmark-Band ±15 %: keine Abweichung in den Läufen (`benchmark_abweichung` nirgends gesetzt). Zusammenfassung: `_werkstatt/belege/e3/lighthouse.json` (Format wie E0). Rohberichte liegen im Werkzeug-Standardordner `_werkstatt/cache/lighthouse/e3/` (git-ignoriert, nicht übernommen). Die Läufe liefen in drei Teilen (mobil: 3+5+4 Seiten, desktop: 6+6 Seiten), nacheinander, ohne parallelen Browser.

### 2a · Mobil (Budgets Z-08: Leistung ≥ 90, Zugänglichkeit ≥ 95, Best Practices ≥ 95, SEO 100, LCP ≤ 2500 ms, CLS ≤ 0,1, TBT ≤ 200 ms; liegt der E0-Wert besser, gilt er)

| Seite | Leistung (E0) | Grenze Leistung | erfüllt Budget | erfüllt E0-Regel | Zugängl. (E0) | BP | SEO | LCP ms (E0, Spanne) | Grenze LCP | LCP erfüllt | CLS | TBT ms (E0) | LCP-Element (E3) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | 90 (89) | 90 | ja | ja | 100 (100) | 100 | 100 | 3322 (3472; 3446–3497) | 2500 | nein | 0 | 109 (162) | Bild |
| `/bad` | 90 (92) | 92 | ja | nein | 100 (100) | 100 | 100 | 3434 (2854; 2506–2881) | 2500 | nein | 0 | 125 (207) | Bild |
| `/bad/badsanierung` | 90 (92) | 92 | ja | nein | 100 (100) | 100 | 100 | 3331 (2596; 2418–2609) | 2500 | nein | 0 | 151 (287) | Bild |
| `/bad/barrierefreies-bad` | 90 (95) | 95 | ja | nein | 100 (100) | 100 | 100 | 3336 (2472; 2412–2565) | 2472 | nein | 0 | 167 (197) | Bild |
| `/leistungen` | 89 (87) | 90 | nein | nein | 100 (100) | 100 | 100 | 3395 (2925; 2868–3161) | 2500 | nein | 0 | 116 (283) | Bild |
| `/fliesen` | 91 (91) | 91 | ja | ja | 100 (100) | 100 | 100 | 3464 (2718; 2559–2932) | 2500 | nein | 0 | 134 (215) | Text |
| `/balkon-terrasse` | 91 (95) | 95 | ja | nein | 100 (100) | 100 | 100 | 3493 (2429; 2415–2484) | 2429 | nein | 0 | 117 (179) | Bild |
| `/referenzen` | 91 (94) | 94 | ja | nein | 100 (100) | 100 | 100 | 3331 (2411; 2410–2418) | 2411 | nein | 0 | 120 (208) | Bild |
| `/ueber-uns` | 90 (94) | 94 | ja | nein | 100 (100) | 100 | 100 | 3516 (2629; 2413–2710) | 2500 | nein | 0 | 84 (166) | Bild |
| `/kontakt` | 90 (88) | 90 | ja | ja | 100 (99) | 100 | 100 | 3379 (2706; 2399–2859) | 2500 | nein | 0 | 174 (376) | Text |
| `/standorte/wetzlar` | 82 (90) | 90 | nein | nein | 100 (100) | 100 | 100 | 4469 (2427; 2414–2857) | 2427 | nein | 0 | 163 (300) | Einwilligungstext |
| `/blog` | 86 (85) | 90 | nein | nein | 100 (100) | 100 | 100 | 3813 (3120; 2729–3179) | 2500 | nein | 0 | 186 (369) | Text |

Ergebnis mobil:
- Leistung: Budget verfehlt auf `/leistungen` (89), `/standorte/wetzlar` (82), `/blog` (86). Mit der E0-Regel zusätzlich auf `/bad` (92), `/bad/badsanierung` (92), `/bad/barrierefreies-bad` (95), `/balkon-terrasse` (95), `/referenzen` (94), `/ueber-uns` (94).
- LCP: Budget verfehlt auf allen zwölf Seiten (3322 bis 4469 ms). Auch mit der E0-Grenze verfehlt.
- E0-Spanne (Z-08, „nicht schlechter als E0 um mehr als die Spanne“): LCP über der Spanne auf elf Seiten (alle außer `/`). Leistung unter der Spanne auf `/bad/barrierefreies-bad` (90 gegen 92–96), `/referenzen` (91 gegen 94), `/ueber-uns` (90 gegen 94–95), `/standorte/wetzlar` (82 gegen 89–96).
- Zugänglichkeit, Best Practices und SEO mobil: 100 auf allen Seiten. CLS 0 auf allen Seiten. TBT unter 200 ms auf allen Seiten.
- LCP-Element mobil: Bild auf acht Seiten, Text auf drei (`/fliesen`, `/kontakt`, `/blog`), auf `/standorte/wetzlar` der Einwilligungstext des Banners. E0: Text auf allen zwölf Seiten.

### 2b · Desktop (kein Budget, nur Vergleich mit E0; Budgets gelten mobil, K-013)

| Seite | Leistung (E0) | Zugängl. (E0) | LCP ms (E0, Spanne) | CLS (E0) | TBT ms (E0) | LCP-Element |
|---|---|---|---|---|---|---|
| `/` | 100 (100) | 97 (100) | 702 (687; 660–694) | 0 (0) | 0 (4) | Bild |
| `/bad` | 100 (100) | 97 (100) | 775 (671; 538–686) | 0,001 (0) | 6 (19) | Bild |
| `/bad/badsanierung` | 100 (100) | 97 (100) | 718 (687; 662–696) | 0,001 (0) | 0 (8) | Bild |
| `/bad/barrierefreies-bad` | 100 (100) | 97 (100) | 716 (665; 605–704) | 0,001 (0) | 0 (7) | Bild |
| `/leistungen` | 100 (100) | 97 (100) | 722 (593; 550–682) | 0,001 (0) | 0 (13) | Bild |
| `/fliesen` | 100 (100) | 97 (100) | 705 (589; 576–687) | 0,001 (0,051) | 0 (1) | Text |
| `/balkon-terrasse` | 100 (100) | 97 (100) | 724 (662; 535–695) | 0,001 (0) | 0 (24) | Bild |
| `/referenzen` | 100 (100) | 100 (100) | 731 (618; 565–619) | 0,001 (0) | 0 (10) | Bild |
| `/ueber-uns` | 100 (100) | 97 (100) | 719 (537; 533–693) | 0,001 (0) | 0 (7) | Bild |
| `/kontakt` | 100 (100) | 100 (99) | 670 (553; 534–698) | 0,001 (0,002) | 0 (4) | Überschrift H1 |
| `/standorte/wetzlar` | 100 (100) | 97 (100) | 692 (569; 567–665) | 0,001 (0) | 0 (9) | Text |
| `/blog` | 100 (100) | 97 (100) | 793 (655; 597–661) | 0,001 (0) | 0 (5) | Text |

Beobachtung: Zugänglichkeit Desktop 97 auf zehn Seiten (E0 100). In den geprüften Rohberichten (`bad-desktop-0`, `bad-desktop-1`, `ueber-uns-desktop-0`) sind die fehlenden Punkte die Audits `label-content-name-mismatch` und `target-size`. Desktop-LCP liegt auf elf Seiten über der E0-Spanne (Ausnahme `/kontakt`).

### 2c · Benchmark-Index

Lighthouse-Benchmark-Index: E0 1535,5 bis 1552,5 (Referenz 1535,5); E3 je Teil-Lauf 2212,5 (mobil, Teil 1), 2464,5 (mobil, Teil 2), 2537,0 (mobil, Teil 3), 2441,0 (desktop, Teil 1), 2174,5 (desktop, Teil 2). Die Werkzeug-Referenz gilt je Prozess, daher gibt es keine Abweichung innerhalb eines Teils. Der Index zwischen E0 und E3 weicht deutlich ab. Der Vergleich der Leistungswerte mit E0 ist damit nur eingeschränkt belastbar (siehe OFFENE FRAGEN).

## 3 · Dateien

- Zusammenfassung: `_werkstatt/belege/e3/lighthouse.json`, `_werkstatt/belege/e3/reaktion.json`, `_werkstatt/belege/e3/reaktion-weitere.json`, `_werkstatt/belege/e3/STUFE-B-3.md`
- Scratchpad (nicht im Repo): `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-PRUEF-B/` (Läufe `lh-belege/e3/lighthouse.json`, `reaktion-rest/reaktion.json`, Vergleich `vergleich.json`)
- Im Repo nichts geändert, nicht committet, nicht gepusht.
