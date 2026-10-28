# UM-E3-LCP-K · Mobiles LCP und langsamste Reaktion je Hauptansicht

Auswertung vorhandener Rohberichte, keine Messung, keine Codeänderung. Mediane über drei Läufe. Zeiten in ms.

## QUELLEN

- Lighthouse mobil: `/home/user/tezgel/_werkstatt/cache/lighthouse/um-e2-b2/lh-head/*-mobil-{0,1,2}.report.json`, 36 Dateien, Lighthouse 13.5.0, gleiche Drosselung (simuliert, 4× CPU, RTT 150 ms), keine Laufwarnungen.
- Abgleich: `/home/user/tezgel/_werkstatt/belege/um-e2-b2/lh-head/lighthouse.json` (Server 4315, Commit f5544581). LCP- und TBT-Mediane stimmen überein.
- Reaktion: `/home/user/tezgel/_werkstatt/belege/um-e2/reaktion/reaktion.json` (m390, 4× CPU, Commit 3d481570).
- Hauptansichten: `/home/user/tezgel/_werkstatt/HAUPTANSICHTEN.json`.
- Skripte: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/um-e3-lcp-k/`.
- Fehlende Briefing-Audits (Lighthouse 13.5.0) und Ersatz: `largest-contentful-paint-element` durch `lcp-breakdown-insight` und `lcp-discovery-insight`; `lcp-phases` durch `lcp-breakdown-insight` (beobachtet) und `metrics` (simuliert); `font-display` durch `font-display-insight`; `render-blocking-resources` durch `render-blocking-insight`.

## ZEITBASEN

- **Simuliert** (Basis der LCP-Zahl): `metrics` mit TTFB, Ladeverzögerung, Ladezeit. Der Rest bis zum LCP ist von mir abgeleitet und enthält die Renderverzögerung.
- **Beobachtet** (ungedrosselte Trace): `lcp-breakdown-insight`, Long Tasks, Haupt-Thread, Bootup, Startzeiten. Beispiel `/`: beobachteter LCP 261 gegen simulierten 3317. Beobachtete Phasen sind keine Anteile der 3,3 s.

## TABELLE 1 · LCP, simuliert

| Ansicht | LCP-Element | LCP ms (Med., Spanne) | TTFB | Ladeverz. | Ladezeit | Rest (abgel.) | LCP-Bild: Format, KB Übertr., Prio | Banner | TBT ms | größte Long Task ms (Med.) |
|---|---|---|---|---|---|---|---|---|---|---|
| / | Bild: „Dusche ohne Stufe mit großen grauen Fliesen …“ | 3317 (3303–3416) | 455 | 867 | 1158 | 815 | AVIF, 16, High | nein | 247 | 215 (wechselnd) |
| /bad | Bild: „Helles Bad mit Glasdusche, WC an der Wand, H…“ | 3387 (3387–3389) | 454 | 803 | 1076 | 1054 | AVIF, 23, High | nein | 211 | 137 (1kexj4s7oxhs2) |
| /bad/badsanierung | Bild: „Badewanne mit blauen und beigen Ornamentflie…“ | 3389 (3383–3576) | 453 | 794 | 1049 | 1084 | AVIF, 19, High | nein | 202 | 175 (wechselnd) |
| /bad/barrierefreies-bad | Bild: „Begehbare Dusche mit weißen Metrofliesen, Ha…“ | 3007 (2992–3236) | 454 | 792 | 1059 | 688 | AVIF, 10, High | nein | 111 | 188 (wechselnd) |
| /leistungen | Bild: „Dusche mit zwei Lichtleisten an der Wand, ge…“ | 3312 (3310–3313) | 454 | 831 | 1198 | 823 | AVIF, 8, High | nein | 148 | 133 (wechselnd) |
| /fliesen | Text: „Sie möchten Fliesen verlegen lassen und wiss…“ | 3253 (2861–3295) | 455 | – | – | 2798 | – | nein | 114 | 179 (wechselnd) |
| /balkon-terrasse | Bild: „Terrasse mit großen hellgrauen Platten, eine…“ | 3462 (2934–3466) | 455 | 866 | 1160 | 944 | AVIF, 50, High | nein | 172 | 136 (wechselnd) |
| /referenzen | Bild: „Bad mit Fliesen in Marmoroptik, Regendusche …“ | 2787 (2785–3236) | 454 | 866 | 1142 | 469 | AVIF, 13, High | nein | 87 | 130 (wechselnd) |
| /ueber-uns | Bild: „Mitarbeiter von Fliesenverlegung Tezgel knie…“ | 3314 (2873–3315) | 455 | 863 | 1165 | 817 | AVIF, 33, High | nein | 105 | 125 (wechselnd) |
| /kontakt | Text: „Wollen Sie Ihre Badewanne gegen eine Dusche …“ | 3142 (2638–3150) | 455 | – | – | 2688 | – | nein | 106 | 179 (wechselnd) |
| /standorte/wetzlar | Text im Banner: „Wir nutzen Cookies auf unserer Website …“ | 4595 (4452–4597) | 453 | – | – | 4142 | – | ja | 190 | 127 (wechselnd) |
| /blog | Text: „Hier erklären wir Badsanierung und Fliesenve…“ | 3449 (3164–3455) | 454 | – | – | 2995 | – | nein | 138 | 134 (wechselnd) |

Das LCP-Element war in allen 12 Ansichten in allen drei Läufen dasselbe. Die Bilder liegen unter `/images/arbeiten/` und werden als AVIF ausgeliefert: dusche-ohne-stufe-graue-fliesen (`/`), helles-bad-glasdusche-holzoptik (`/bad`), badewanne-ornamentfliesen-nische (`/bad/badsanierung`), begehbare-dusche-metrofliesen-musterboden (`/bad/barrierefreies-bad`), dusche-led-leisten-sitzbank-mosaik-ohne-rand (`/leistungen`), terrasse-hellgraue-platten-weisses-gelaender (`/balkon-terrasse`), bad-marmoroptik-regendusche-wand-wc (`/referenzen`), ueber-uns-mitarbeiter-dichtband-balkon (`/ueber-uns`). „wechselnd“: die Quelle der Long Task springt zwischen den Läufen.

## TABELLE 2 · LCP-Phasen, beobachtet (`lcp-breakdown-insight`)

| Ansicht | beob. LCP (Med.) | TTFB | Ladeverz. | Ladezeit | Renderverz. | Summe der Mediane |
|---|---|---|---|---|---|---|
| / | 261 | 15 | 40 | 19 | 166 | 240 |
| /bad | 237 | 15 | 38 | 22 | 157 | 233 |
| /bad/badsanierung | 258 | 15 | 38 | 25 | 174 | 253 |
| /bad/barrierefreies-bad | 221 | 13 | 43 | 22 | 143 | 221 |
| /leistungen | 228 | 14 | 42 | 27 | 146 | 229 |
| /fliesen | 226 | 16 | 0 | 0 | 210 | 226 |
| /balkon-terrasse | 239 | 16 | 45 | 23 | 159 | 243 |
| /referenzen | 193 | 16 | 35 | 27 | 114 | 192 |
| /ueber-uns | 221 | 15 | 35 | 27 | 142 | 219 |
| /kontakt | 211 | 13 | 0 | 0 | 198 | 211 |
| /standorte/wetzlar | 842 | 15 | 0 | 0 | 827 | 842 |
| /blog | 200 | 12 | 0 | 0 | 190 | 202 |

## TABELLE 3 · Haupt-Thread, beobachtet

| Ansicht | Bootup ms (Med.) | Haupt-Thread ms (Med.) | Script-Auswertung | Style & Layout | größtes Skript: CPU ms (Med.) |
|---|---|---|---|---|---|
| / | 1103 | 3253 | 1049 | 750 | 919 |
| /bad | 1184 | 3253 | 1131 | 807 | 895 |
| /bad/badsanierung | 971 | 3088 | 916 | 844 | 861 |
| /bad/barrierefreies-bad | 990 | 2877 | 927 | 704 | 836 |
| /leistungen | 1017 | 3053 | 952 | 789 | 816 |
| /fliesen | 837 | 2740 | 797 | 656 | 658 |
| /balkon-terrasse | 978 | 3196 | 909 | 832 | 891 |
| /referenzen | 895 | 2689 | 859 | 604 | 801 |
| /ueber-uns | 804 | 2579 | 752 | 667 | 615 |
| /kontakt | 834 | 2459 | 791 | 583 | 613 |
| /standorte/wetzlar | 1076 | 3098 | 1041 | 759 | 940 |
| /blog | 888 | 2779 | 886 | 694 | 777 |

## TABELLE 4 · Reaktion (m390, Schwelle 200)

| Ansicht | langsamste Handlung | Median ms | Werte je Lauf (ms) | Ziel |
|---|---|---|---|---|
| / | menue | 128 | 96–136 (96, 128, 136) | schalter |
| /bad | menue | 64 | 64–80 (80, 64, 64) | schalter |
| /bad/badsanierung | menue | 80 | 72–104 (80, 104, 72) | schalter |
| /bad/barrierefreies-bad | menue | 72 | 72–88 (72, 72, 88) | schalter |
| /leistungen | menue | 80 | 48–80 (80, 80, 48) | schalter |
| /fliesen | menue | 72 | 72–80 (72, 80, 72) | schalter |
| /balkon-terrasse | menue | 72 | 64–72 (72, 72, 64) | schalter |
| /referenzen | menue | 72 | 72–80 (72, 80, 72) | schalter |
| /ueber-uns | menue | 80 | 64–96 (80, 96, 64) | schalter |
| /kontakt | hauptknopf (Gleichstand mit menue) | 64 | 56–120 (56, 120, 64) | anker |
| /standorte/wetzlar | hauptknopf | 128 | 88–144 (128, 88, 144) | anker |
| /blog | hauptknopf | 96 | 48–96 (96, 96, 48) | link |

Das größte Skript ist in allen 36 Läufen `2tbu000sg63yb.js`.

## REAKTION

- Alle 12 Ansichten liegen unter 200 ms: Mediane 64 bis 128 ms, höchster Einzellauf 144 ms (/standorte/wetzlar).
- Langsamste Handlung ist auf 9 Ansichten das Menü, auf 3 der Hauptknopf (bei /kontakt im Gleichstand).
- Die Akkordeon-Handlung wurde auf keiner Ansicht gemessen (`nicht_vorhanden`). Das Eingabefeld nur auf /, /standorte/wetzlar und /blog.
- Long Animation Frames enthält die Datei nicht. Eine Zuordnung ist nicht möglich.

## MUSTER

1. **Dominante Phase.** In 7 von 8 Bildansichten ist die Ladezeit die größte simulierte Phase (1,05 bis 1,20 s). Bei /bad/badsanierung liegt der Rest (1,08 s) knapp vor der Ladezeit (1,05 s). Ladeverzögerung plus Ladezeit betragen 1,84 bis 2,03 s, also 54 bis 72 % des LCP-Medians. In den 4 Ansichten ohne Bildphasen entfallen 2,69 bis 4,14 s auf den Rest. Beobachtet ist die Renderverzögerung in allen 12 Ansichten die größte Phase (114 bis 827 ms).
2. **Geteilte Ressourcen auf 12 Ansichten.** Eine render-blockierende CSS-Datei (`2-pu57orri4z3.css`, 22,1 KB, beobachtete Blockierung 153 bis 158 ms). Zwei Schriften: `archivo_variabel` (57,9 KB, High, beobachteter Start Median 51 ms) und `plex_mono_400` (14,6 KB, VeryHigh, Start Median 206 ms). `font-display-insight` meldet keinen Befund. Das größte Skript ist `2tbu000sg63yb.js`. Die 8 Bildansichten teilen die Bildkomponente, nicht die Bilder. Die LCP-Discovery ist in allen 24 Bildläufen erfüllt. Die simulierte TTFB liegt in allen 36 Läufen bei 453 bis 458 ms.
3. **Banner.** Der LCP-Knoten von /standorte/wetzlar liegt in 3 von 3 Läufen im Einwilligungsbanner (`div.hoehe-banner`, außerhalb von MAIN). In den übrigen 11 Ansichten liegt er im MAIN-Baum.

## HEBEL

Reihenfolge nach der Größe des Hebels in den Daten, jeweils als Hypothese für UM-E3-LEISTUNG zu prüfen:

- **H1 · Ladekette des LCP-Bilds auf 8 Bildansichten.** Ladeverzögerung plus Ladezeit 1,84 bis 2,03 s. Das Bild ist klein (8 bis 50 KB, AVIF, High, discoverable), die Zeit steckt also nicht in den Bytes. Welche Anfrage die Verzögerung verursacht, zeigen die Daten nicht.
- **H2 · Banner-Text als LCP-Element auf /standorte/wetzlar.** LCP 4595 gegen Median 3314 der übrigen 11 Ansichten (+1,3 s). Beobachtete Renderverzögerung 827 gegen 114 bis 210. Laut HAUPTANSICHTEN ist diese Seite das Muster aller 13 Ortsseiten, gemessen ist nur sie.
- **H3 · Render-blockierende CSS auf 12 Ansichten.** Lighthouse schätzt die Ersparnis auf Median 130 ms (Spanne 20 bis 300 über 36 Läufe). Das ist eine Schätzung, keine gemessene LCP-Wirkung.

Die Schriften bleiben ohne Hebel, weil kein Beleg eine LCP-Wirkung zeigt.

## OFFENE FRAGEN

1. **Unterschiedliche Stände und Bedingungen.** Die LCP-Läufe stammen von Commit f5544581 (11:41), die Reaktion von 3d481570 (07:39). 3d481570 ist ein Vorfahr von f5544581; dazwischen liegen 79 geänderte Dateien (git diff, nur lesend). Die Reaktionsmessung lief mit „Arbeitsbaum mit ungesicherten Änderungen“, der aktuelle HEAD ist efac0a52. Die Bedingungen unterscheiden sich ebenfalls (LCP: Simulation, Erstbesuch mit Banner; Reaktion: Einwilligung abgelehnt). Ein Vergleich ist nur grob.
2. **Zeitbasen.** Die simulierte Ladeverzögerung (0,79 bis 0,87 s) und der beobachtete Bildstart (51 bis 61 ms) stammen aus verschiedenen Zeitbasen. Woher die simulierte Verzögerung kommt, ist aus den Daten nicht ableitbar.
3. **Textansichten.** Ob `plex_mono_400` (beobachteter Start 177 bis 224 ms) den Text verzögert, zeigen die Daten nicht.
4. **Banner.** Ob der Banner auf den übrigen 11 Ansichten die Renderzeit beeinflusst und welchen Anteil er an TBT hat, ist nicht gemessen. Ob die übrigen 12 Ortsseiten denselben Banner-LCP zeigen, ist nicht belegt.
5. **Laufzeiten.** Die 36 Rohberichte stammen von 12:28 bis 14:53 (fetchTime). Vier Ansichten (/ueber-uns, /kontakt, /standorte/wetzlar, /blog) wurden ab 14:43 gelaufen. Die Commit-Zuordnung beruht nur auf server_stand der Zusammenfassung.
6. **Akkordeon und Long Tasks.** Ob es auf den Seiten Akkordeons gibt oder der Test sie nicht erkennt, ist offen. Die Quelle der Long Tasks wechselt zwischen den Läufen (konsistent nur bei /bad), die Zuordnung ist unsicher.

## Vermerk des Orchestrators (27.10.2026)
- „Reaktion von Commit 3d481570“: Das Feld `commit` nennt den HEAD des Repositorys zur Messzeit. Gemessen wurde der Server 4314 aus `reinraum-6caeeb9c` (E-076, Vermerk in `berichte/UM-E2-B.md`). Seit f5544581 steht der Server-Stand in jedem Beleg (`server_stand`).

=== ENDE UM-E3-LCP-K · BEREIT ZUR RÜCKGABE ===

## Vermerk des Orchestrators (28.10.2026, E-085)
- `lcpLoadDelay` und `lcpLoadDuration` in Tabelle 1 und H1 sind skalierte Zeitstempel (Lighthouse `lcp-breakdown`), keine Dauern. H1 als „Ladekette des LCP-Bilds“ ist damit nicht belegt. Die Ursache des mobilen LCP steht in `belege/um-e3-leistung/ursache.md`.
