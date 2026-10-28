# UM-E3-LEISTUNG · Schritt 1 · Ursache des simulierten LCP auf `/` (mobil)

Quelle: 12 Rohberichte `_werkstatt/cache/lighthouse/um-e3-w3/{nach-a,nach-b,vor-a,vor-b}/start-mobil-{0,1,2}.report.json` (Lighthouse 13.5.0, simuliert, RTT 150 ms, 1.638,4 kbit/s, CPU 4-fach, HTTP/1.1 auf 127.0.0.1). Spuren liegen nicht vor. Deshalb habe ich die Lantern-Rechnung mit dem Simulator von Lighthouse 13.5 nachgebaut (`_werkstatt/werkzeuge/node_modules/@paulirish/trace_engine/models/trace/lantern`). Skripte liegen unter `…/scratchpad/leist-skripte/` (`modell.mjs`, `start2.mjs`, `sweep2.mjs`, `opt.mjs`, `rest.mjs`, `pruefe-unusedjs.mjs`).

## 1 · Kurzfassung (drei Sätze)
Lantern setzt den LCP nicht auf das Ende des Fotos, sondern auf das Ende des letzten Knotens im LCP-Graphen. In diesem Graphen steht jede Anfrage, die im ungedrosselten Lauf vor dem beobachteten Malen (183 bis 247 ms) fertig war: 367 KB, davon 194 KB Skripte, 72 KB Schriften und 53 KB Dokument. Das Foto (16 KB, vorgeladen, `fetchpriority=high`) ist in der Rechnung nach rund 1,7 s fertig; den Ausschlag geben React DOM (`2tbu…`, 71 KB) und die Next-Laufzeit (`3i7bb…`, 46 KB), die sich die Leitung mit den Schriften teilen, und ein Dokument, das eine Rundreise über der Stufe liegt.

## 2 · Belegte Zahlen

### 2.1 Was vor dem LCP geladen wird (alle 12 Läufe gleich, nach-a Lauf 0)
| Anfrage | Übertragung | beobachtet (ms) | Priorität |
|---|---|---|---|
| Dokument `/` | 54.296 B (364,7 KB roh) | 6 bis 23 | VeryHigh |
| Archivo (Vorladen) | 59.261 B | 61 bis 66 | High |
| Logo w=384 (Vorladen) | 6,4 KB | 70 bis 90 | Low (Bild) |
| LCP-Foto w=750 AVIF (Vorladen im Kopf) | 16.541 B | 70 bis 93 | High |
| CSS | 23.067 B (116,6 KB roh) | 79 bis 92 | VeryHigh |
| 10 Skriptstücke, async | 193,6 KB | 105 bis 164 | Low |
| Sprite | 3,2 KB | 154 bis 163 | Low |
| Plex Mono (aus dem CSS) | 14.965 B | 189 bis 199 | VeryHigh |
| beobachtetes FCP = LCP | | 231 | |

- In allen 12 Läufen enden alle diese Anfragen vor dem beobachteten LCP. Nur `favicon.ico` endet danach.
- Summe vor dem LCP: 367,4 KB (vorher 365,4 KB).
- Nach dem Typ: Dokument 53,0 KB, CSS 22,5 KB, Schriften 72,5 KB, Skripte 193,6 KB, Bilder 22,5 KB, Sprite 3,2 KB.
- Das Foto ist schon „richtig“:
  - `lcp-discovery-insight`: alle drei Prüfungen erfüllt.
  - Das HTML trägt `<link rel="preload" as="image" imageSrcSet=… fetchPriority="high">` vor dem CSS.
  - `image-delivery-insight` meldet 0 Byte Ersparnis.
  - Dargestellt 378 px × 1,75 = 661 px: Auch ein genaueres `sizes` wählt in der Lighthouse-Emulation (412 px, DPR 1,75) weiter w=750. Das gilt nicht für jedes Telefon: Bei 390 px und DPR 3 verlangt `100vw` 1.170 px und wählt w=1200, dargestellt sind 356 px, also würde w=1080 reichen. `100vw` lässt den Rand (`px-4`, 1 px Rahmen) außer Acht. Auf die Messung wirkt das nicht (Nachtrag der Nacharbeit, siehe Notiz).
- `render-blocking-insight`: CSS 154 ms, nur FCP-Ersparnis 200 ms, LCP-Ersparnis 0. `document-latency-insight`: Server 8 ms, komprimiert, keine Umleitung.

### 2.2 So rechnet Lantern (Quelltext Lighthouse 13.5 / trace_engine)
- `LargestContentfulPaint.getOptimisticGraph/getPessimisticGraph` (`metrics/LargestContentfulPaint.js`, `FirstContentfulPaint.getFirstPaintBasedGraph`):
  - Im Graphen steht jeder Netzknoten, der vor dem beobachteten LCP endet. Im optimistischen Graphen fehlen nur Bilder mit Priorität Low.
  - Skripte fallen nur heraus, wenn ihr erstes `EvaluateScript` nach dem beobachteten LCP beginnt.
  - Der LCP ist `max(endTime)` aller Knoten, gemittelt 0,5 optimistisch + 0,5 pessimistisch.
- Netz (`simulation/Simulator.js`, `TCPConnection.js`, `ConnectionPool.js`):
  - 6 Verbindungen je Herkunft (HTTP/1.1), höchstens 10 gleichzeitig.
  - Die Leitung wird gleich auf die laufenden Anfragen geteilt. Das Fenster je Verbindung ist auf `floor(Durchsatz/n · RTT / 1460)` Segmente begrenzt, bei 6 laufenden Anfragen also 3 Segmente je Rundreise.
  - Gerechnet wird in ganzen Rundreisen zu 150 ms.
- Dokument:
  - Bis zum ersten Byte vergehen 612 ms: DNS 2 RTT, TCP 1,5 RTT, Server 12 ms, 0,5 RTT.
  - Mit 14.600 B im ersten Fenster, dann 29.200 B und 30.660 B braucht ein Dokument bis 43.800 B eine Rundreise, bis 74.460 B zwei. 54.296 B enden deshalb bei 912 ms.
  - Erst danach starten im Modell alle Unterressourcen, und zwar in der Reihenfolge Priorität, dann beobachteter Start: CSS, dann Archivo und Foto, dann die Low-Anfragen.
- Die Metrikzeilen `lcpLoadDelay`/`lcpLoadDuration` sind keine Dauern (`computed/metrics/lcp-breakdown.js`):
  - Lighthouse multipliziert dort die beobachteten Zeitstempel des Fotos mit LCP_sim/LCP_beob.
  - Beispiel nach-a Lauf 0: 70,5 bzw. 93,3 ms × 2938/231 = 12,72 ergibt rund 900 bzw. 1190 ms; im Bericht stehen 912 bzw. 1202.
  - Der Hebel H1 in `berichte/UM-E3-LCP-K.md` (Ladeverzögerung + Ladezeit 1,84 bis 2,03 s) beruht auf dieser Lesart. Die Ladekette des Fotos ist nicht die Ursache.

### 2.3 Nachbau und Gegenproben
- **Nachbau geprüft:** Der optimistische Graph von `/bad` aus E4 (`belege/e4/leistung-2/lantern-v0-bad.txt`, echte Lantern-Zerlegung) ergibt mit `modell.mjs` dieselben Zeiten auf 1 bis 3 ms. Dokument 912, Archivo 2874 gegen 2873, Foto 1974 gegen 1973, CSS 1674 gegen 1673, Plex 2286 gegen 2285.
- **Welche Skripte im Graphen stehen**, zeigt `unused-javascript`. Lighthouse rechnet dessen LCP-Ersparnis im optimistischen LCP-Graphen (`byte-efficiency-audit.js`):
  - React DOM `2tbu…` um 22,4 KB kleiner ergibt in 10 von 12 Läufen 150 ms.
  - In den Läufen mit 2561 und 2787 ms ergibt es 0 ms.
  - Das Modell gibt genau dieses Muster wieder (`pruefe-unusedjs.mjs`): 150 ms, wenn `2tbu` im Graphen steht, sonst 0.
- **Klassen** (Graph der Startseite, `start2.mjs`; CPU: Parsen 40 ms, erstes Layout 54 ms, beobachtet):

| Zusammensetzung | Modell (ms) | gemessen (ms) | Läufe |
|---|---|---|---|
| ohne React DOM und ohne Laufzeit | 2574 | 2561 | vor-b 1 |
| ohne React DOM, mit Laufzeit | 2874 | 2787 | vor-a 2 |
| mit React DOM, ohne Laufzeit | 3030 | 2915 bis 3012 | 7 Läufe (alle 2,9-s-Läufe) |
| alle Skripte | 3330 | 3223 bis 3234 | 3 Läufe |

- Im häufigsten Fall endet React DOM zuletzt: Es startet bei 912 und endet bei 3024 ms im optimistischen Graphen. Es teilt sich die Leitung bis zuletzt mit Archivo (endet 2874), den App-Stücken und Plex.
- Das Foto endet bei 1674 ms.
- Ob React DOM und die Laufzeit im Graphen stehen, entscheidet ein Wettlauf im ungedrosselten Lauf: Beginnt ihre Auswertung vor oder nach dem beobachteten Malen? Alle Downloads sind vorher fertig.
- Dass die Seite diesen Wettlauf nicht steuern kann, ist eine **offene Annahme**, nicht belegt (Nachtrag der Nacharbeit, siehe 2.5). Die beobachtete Zerlegung zeigt eine Render-Verzögerung von 107 bis 160 ms nach dem fertigen Foto. Ein Eingriff, der nur die Reihenfolge verschiebt, damit Lantern Skripte weglässt, wäre nach G7 unzulässig. Ein echtes früheres Malen wäre es nicht. Ob es dafür einen Hebel gibt, zeigt erst eine Spur der Skriptstarts relativ zum Malen.

### 2.4 Antworten auf die Fragen des Briefings
- **Welche Anfragen stehen vor dem Bild?** Im Simulator nur das Dokument (Ende 912 ms). Ab dann laufen CSS, Archivo, das Foto und die ersten Low-Anfragen parallel auf 6 Verbindungen.
- **Wann ist das Bild entdeckt und geladen?**
  - Beobachtet: entdeckt im Kopf, geladen von 70 bis 93 ms.
  - Simuliert: Start 912 ms, Ende rund 1674 ms. Das sind rund 1,3 s vor dem LCP, also nicht auf dem kritischen Pfad.
- **Wie groß sind HTML, CSS, Schriften und JS vor dem ersten Bild?** HTML 53,0 KB, CSS 22,5 KB, Schriften 72,5 KB, JS 193,6 KB (siehe 2.1).
- **Was verschiebt der Simulator vor den LCP?** Alles aus 2.1, denn alles endet vor dem beobachteten Malen. Entscheidend sind:
  - das Dokument (eine Rundreise über der Stufe von 43.800 B),
  - React DOM und die Laufzeit (im Graphen, sobald sie vor dem Malen ausgewertet werden),
  - die Schriften (immer im Graphen; sie teilen die Leitung mit React DOM).
- **Weg im Code:**
  - `Startbild` gibt an `Bildfeld` `lcp` weiter. `next/image` setzt dann `loading="eager"` und `fetchPriority="high"`, und React legt das Vorladen mit `imageSrcSet`/`imageSizes` in den Kopf.
  - Die Schriften kommen über `next/font/local`: Archivo mit `preload` (Standard), Plex mit `preload: false`.
  - Der Kopf ist 12,8 KB roh, 3,9 KB gzip. JSON-LD des Wurzelgraphen 5,8 KB roh (rund 1,9 KB gzip im HTML und noch einmal rund 2,0 KB in den RSC-Daten).
  - `KOPFSKRIPT` 960 B, Speculation Rules 513 B.
  - Das Dokument besteht aus 24,0 KB gzip Auszeichnung und 24,6 KB gzip RSC-Daten. Klassenketten machen allein 7,7 + 5,3 KB gzip aus.

### 2.5 Beobachtete Zerlegung des LCP (Nachtrag der Nacharbeit)
Quelle: `lcp-breakdown-insight`, `main-thread-tasks` und `unused-javascript` der 12 Rohberichte. Die Zeiten sind beobachtet (ungedrosselt), nicht simuliert.

| Lauf | LCP simuliert | LCP beobachtet | TTFB | Ladeverzögerung | Ladedauer | Foto fertig | Render-Verzögerung | Anteil | lange Aufgabe (Beginn + Dauer) | `unused-javascript` LCP |
|---|---|---|---|---|---|---|---|---|---|---|
| nach-a 0 | 2938 | 231 | 20 | 45 | 30 | 95 | 137 | 59 % | 136 + 54 | 150 |
| nach-a 1 | 2915 | 183 | 11 | 38 | 26 | 75 | 108 | 59 % | 104 + 57 | 150 |
| nach-a 2 | 3223 | 205 | 16 | 45 | 28 | 88 | 117 | 57 % | 106 + 55 | 150 |
| nach-b 0 | 3226 | 229 | 15 | 51 | 31 | 97 | 133 | 58 % | 154 + 52 | 150 |
| nach-b 1 | 3234 | 231 | 21 | 43 | 24 | 87 | 144 | 62 % | 133 + 63 | 150 |
| nach-b 2 | 2937 | 247 | 22 | 59 | 37 | 118 | 129 | 52 % | 150 + 59 | 150 |
| vor-a 0 | 2946 | 195 | 19 | 51 | 17 | 87 | 107 | 55 % | 121 + 50 | 150 |
| vor-a 1 | 2944 | 225 | 19 | 53 | 24 | 96 | 129 | 57 % | 126 + 63 | 150 |
| vor-a 2 | 2787 | 225 | 17 | 41 | 38 | 96 | 128 | 57 % | 116 + 74 | 0 |
| vor-b 0 | 3012 | 212 | 18 | 45 | 25 | 88 | 124 | 58 % | 118 + 63 | 150 |
| vor-b 1 | 2561 | 211 | 16 | 43 | 23 | 82 | 129 | 61 % | 119 + 58 | 0 |
| vor-b 2 | 2967 | 235 | 14 | 43 | 18 | 75 | 160 | 68 % | 106 + 62 | 150 |

Alle Zeiten in ms. „Foto fertig“ ist TTFB + Ladeverzögerung + Ladedauer.
- Das Foto ist nach 75 bis 118 ms fertig. Bis zum Malen vergehen danach noch 107 bis 160 ms, das sind 52 bis 68 % des beobachteten LCP.
- In diese Zeit fällt je Lauf eine Hauptthread-Aufgabe von 50 bis 74 ms mit Beginn bei 104 bis 154 ms. Ob sie Layout, Stil oder Skriptauswertung ist, steht nicht in den Rohberichten. Das Modell nimmt Layout an (`start2.mjs`).
- Der Zeitpunkt des Malens allein entscheidet nicht, ob React DOM im Graphen steht:
  - nach-a 1 malt am frühesten (183 ms) und hat React DOM im Graphen (`unused-javascript` 150 ms);
  - vor-b 1 (211 ms) und vor-a 2 (225 ms) haben es nicht.
  - Es zählt, ob die Auswertung beginnt, bevor gemalt wird. Diese Zeitpunkte stehen nicht in den Rohberichten.
- Die Klassen der Tabelle in 2.3 sind deshalb aus dem simulierten LCP und `unused-javascript` erschlossen, nicht beobachtet.
- Das Modell liegt über der Messung: ohne React DOM 87 ms (2874 gegen 2787), ohne Laufzeit 18 bis 115 ms (3030 gegen 2915 bis 3012), mit allen Skripten 96 bis 107 ms (3330 gegen 3223 bis 3234), ohne beide 13 ms (2574 gegen 2561). Die Abweichung ist so groß wie die erwartete Wirkung der Schriften. Wie sicher diese Wirkung ist, steht in 3.1.

## 3 · Maßnahmen, geordnet nach belegter Wirkung (Modell, ms auf den LCP, je Zusammensetzung „ohne React DOM / ohne Laufzeit / ohne beide / alle“)

| # | Maßnahme | Bytes | Wirkung (ms) | Umsetzbar ohne Inhalts- oder Verhaltensänderung? |
|---|---|---|---|---|
| 1 | **Archivo und Plex Mono als Teilmenge der genutzten Zeichen** (plus Zeichen für Namen in Formularen), Achsen, Merkmale und Kerning bleiben | Archivo 57.716 → 44.364 B, Plex 13.420 → 10.692 B, zusammen −16.080 B (−15,7 KB) | −144 / −150 / −144 / −150 (ungestört; gestört 0 bis rund −220, siehe 3.1) | ja, umgesetzt |
| 2 | Dokument ≤ 43.800 B Übertragung | −10,5 KB gzip (−20 %) | −150 in allen Zusammensetzungen | nein: Kopf und JSON-LD sind zusammen < 6 KB, die Stufe verlangt Kürzungen im Inhalt oder ein neues System für Klassenketten (Designsystem) |
| 3 | React DOM und Laufzeit aus dem Graphen | – | −756 (alle → ohne beide), −456 (ohne Laufzeit → ohne beide) | nein: nur über den Wettlauf im beobachteten Lauf (G7) |
| 4 | CSS −4,5 KB, App-Stück `43ze` −8 KB, Foto w=640, Sprite, Logo-Vorladen | je 3 bis 8 KB | 0 bis −6 in den Läufen mit React DOM; −57 bis −75 nur ohne React DOM | nach Maßnahme 1 ohne Wirkung im häufigsten Fall; `43ze` ist Einwilligung (G8) |
| 5 | Vorschläge des Briefings | | | |
| 5a | Foto im Kopf vorladen, hohe Priorität | – | 0 | ist schon so |
| 5b | `sizes` genauer | – | 0 | wählt in der Lighthouse-Emulation weiter w=750 (bei DPR 3 und 390 px w=1080 statt w=1200, ohne Wirkung auf die Messung) |
| 5c | Schriften nach dem Bild | – | 0 | das Foto ist nicht der letzte Knoten; Archivo ohne Vorladen (V2) war schlechter (E-064) |
| 5d | Kopf-HTML kleiner | < 3 KB gzip | 0 | liegt unter der Stufe von 43.800 B |
| 5e | kritisches CSS im Dokument | +39 KB im Dokument | +17 bis +120 | gemessen schlechter (E-064, V1) |

Rechnung nach Maßnahme 1 (Modell, ms):

| ohne React DOM | ohne Laufzeit | ohne beide | alle |
|---|---|---|---|
| 2730 | 2880 | 2430 | 3180 |

Auf die Messung übertragen (in der Nacharbeit korrigiert, siehe 3.1):
- Die Wirkung ist gestuft: In der Rechnung ist sie 0, −75 oder −150 ms, ohne React DOM auch rund −200 ms. Schwerpunkt ist −150 ms.
- In den 2,9-s-Läufen sinkt der LCP auf rund 2,77 bis 2,86 s, in den 3,2-s-Läufen auf rund 3,07 bis 3,08 s. Das gilt bei −150 ms; bei −75 ms sind es rund 0,08 s mehr.
- Unter 2,5 s liegt er nur in der Klasse ohne React DOM und ohne Laufzeit im Graphen, bei rund 2,42 s. Das war 1 von 12 Läufen (vor-b 1).
- Das Budget von 2,5 s ist mit Maßnahme 1 allein nicht sicher erreichbar.

### 3.1 Wie sicher die Wirkung der Schriften ist (Störrechnung, Nachtrag der Nacharbeit)
- Skripte: `…/scratchpad/leist-nach/stoerung.mjs`, `stoerung2.mjs` (Skriptbeginn über `JIT=2|5|10`) und `stoerung-uj.mjs`. Sie nutzen `modell.mjs` und `start2.mjs` unverändert.
- Je Klasse 400 Läufe, jeweils alte gegen neue Schriftgrößen. Gestört werden:
  - Dokument ±0,5 KB;
  - Parsen und erstes Layout je 25 bis 80 ms;
  - Beginn jedes Skripts ±2, ±5 oder ±10 ms;
  - Serverzeit 8 bis 14 ms;
  - Größe jedes Skripts ±3 %.
- Wirkung der Schriften in ms, p10 / p50 / p90 (Skriptbeginn ±2 ms; bei ±10 ms ähnlich):

| Klasse | p10 | p50 | p90 | Bereich | häufigste Stufen |
|---|---|---|---|---|---|
| ohne React DOM | −207 | −145 | −75 | 0 bis −221 | −150 und −200, seltener −75 |
| ohne Laufzeit (häufigste Klasse) | −150 | −150 | −75 | −75 bis −150 | −150 (2 von 3), sonst −75 |
| ohne beide | −146 | −143 | −126 | −75 bis −150 | −125 bis −150 |
| alle Skripte | −150 | −75 | −75 | 0 bis −225 | −75 und −150, in 1 von 12 Läufen 0 |

- Das Vorzeichen ist stabil: In keinem Lauf wird der LCP größer. Die Größe ist es nicht.
- Den Ausschlag geben die Reihenfolge der Skriptanfragen und ihre Größen. Dokument, CPU und Serverzeit allein ändern die Wirkung nicht (je −144 bis −150).
- `unused-javascript` nach den Schriften, mit derselben Störung: ohne React DOM immer 0 ms. Ohne Laufzeit meist 150 ms, in rund 1 von 10 Läufen 250 bis 300 ms. Mit allen Skripten etwa je zur Hälfte 130 bis 150 ms und 250 bis 300 ms (ungestört 264 ms). Lighthouse rundet auf 10 ms.

## 4 · Hinweise für die Messung
- **Verifikation ohne Messung:** Archivo und Plex Mono neu, alle übrigen Dateien des Builds gleich.
  - Die Skriptstücke haben dieselben Inhaltsnamen wie der gemessene Stand (`2tbu000sg63yb`, `3i7bb4yv5vlj-`, `43ze2r7l6z9o7` …).
  - Das HTML von `/` hat dieselbe Rohgröße (373.459 B).
  - Das CSS ist gleich groß; es ändern sich nur die Schrift-URLs.
- **Produktion:** Vercel liefert mit Brotli aus. Das Dokument wäre dann 30 bis 35 KB statt 52 KB und läge unter der Stufe von 43.800 B, also rund −150 ms in der Rechnung. Gemessen wird lokal mit `next start` und gzip (E-076). Das Budget wird also unter strengeren Bedingungen als in Produktion geprüft. Das ist eine offene Frage an den Orchestrator, keine Maßnahme.
