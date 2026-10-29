# UM-E3-TAKT · Bildrate auf `/` nach UM-E3-FIX2 · Notiz des Baumeisters

Arbeitskopie `…/takt/baum`, Vergleich `…/takt/vor` (= 8bcca3c8 in `src`, geprüft mit `git archive 8bcca3c8 src`; `src/app/bewegung.css`
ist auch an HEAD 322c0b00 unverändert). Geändert ist nur `src/app/bewegung.css`. Diff: `…/takt/UM-E3-TAKT.diff`.
Zeiten in MEZ (29.10.2026). Wiederaufnahme nach Nutzungslimit: Die Versuche von 10:20 bis 11:15 stammen aus dem ersten Anlauf und
wurden geprüft (Ergebnisdateien vorhanden, Werte plausibel, mit den neuen Läufen deckungsgleich). Der Lauf 11:17:47 (vor) brach ab
und ist nicht gewertet.

## Ursache (belegt)

Die zwei Animationen je Kantenkreuz aus N1 (`.kreuz-grund` mit `leitfaden-marke-aus`, `.kreuz-rot` mit `leitfaden-marke-an`,
Zeitstrahl `--abschnitt-kante`, Bereich ± 24 px um die Leselinie, Füllung `none`, Keyframes ohne Änderung `from, to { opacity }`)
laufen in Chromium nicht im Compositor. Auf `/` gibt es auf m390 sieben sichtbare Kanten, also 14 solche Animationen. Sie halten in
fast jedem Bild der Geste eine Hauptthread-Animation offen. Verpasst der Hauptthread (CPU 4×) die Frist, zeigt Chromium das Bild nur
teilweise (`STATE_PRESENTED_PARTIAL`) und zählt es als verworfen.

Belege:
- **Trace** (`skript/spur.mjs`, Protokoll wie bildrate, PipelineReporter):
  - vor (8bcca3c8), 13:02: In 94,5 % der Bilder ist `has_main_animation` gesetzt. 64 Bilder sind verworfen, alle 64 als
    `STATE_PRESENTED_PARTIAL` mit `has_main_animation = true`. 99 Ereignisse „Animation“ tragen `compositeFailed = 131072`.
  - Verteilung über die Zeit (`skript/verteilung.cjs`): Der Anteil liegt in jedem 1,6-s-Fach bei 100 %, bei beiden Durchgängen.
  - Layout und Paint sind nicht die Ursache. Über die ganze Geste sind es vorher und nachher je 33 Layouts und 56 bis 59 Paints.
    Stil (UpdateLayoutTree) liegt bei 0,5 bis 0,6 ms je Bild, in beiden Ständen gleich (Tabelle unten).
- **Abschalten einzelner Regeln** (eingespritzter Stil auf dem Bau von 8bcca3c8, `skript/varianten.mjs`), mit `bewegung.mjs` bildrate:
  - alle N1-Regeln aus: 0,14 %
  - nur Kante (Zeitstrahl und Kreuz-Animationen) aus: 0,14 %
  - nur die zwei Kreuz-Animationen aus: 0,07 %
  - nur der Kanten-Zeitstrahl aus: 0 % (Läufe 4,07 / 0 / 0)
  - nur die Marke aus (Bahn, Pausen, Scope, Marke): 9,18 % und 4,58 %. Die Marke ist also nicht die Ursache.
- **Wirkweise** (Traces mit eingespritztem Stil). Beide Bedingungen sind nötig:
  - nur Füllung `both`, Keyframes weiter ohne Änderung: 94,5 % Hauptthread-Bilder, 50 verworfen, 99 × `compositeFailed`;
  - nur Keyframes mit Änderung, Füllung weiter `none`: 94,7 %, 50 verworfen, kein `compositeFailed`. Außerhalb des Bereichs wird
    die Animation nicht gestartet, bleibt aber eine Hauptthread-Animation;
  - beides: 4,7 %, 3 verworfen;
  - Kreuz-Animationen ganz aus: 3,3 %, 2 verworfen;
  - `will-change: opacity`: 94,5 %, 71 verworfen; das hilft also nicht.

## Behebung (nur `src/app/bewegung.css`, kein JavaScript)

- Die Kantenkreuze laufen mit Füllung `both` über einen doppelt so breiten Bereich:
  `cover calc(60vh ∓ var(--spacing) * 12)` statt `* 6`.
- Neue Keyframes `kante-grund` und `kante-rot` mit `step-end`. Der Wechsel liegt bei 25 % und 75 % des Bereichs, also genau auf dem
  alten Fangbereich ± 24 px:
  - schwarz: `0%, 75%, 100% { opacity: 1 } 25% { opacity: 0 }`
  - rot: umgekehrt.
- Anfang und Ende gleichen dem Grundzustand (schwarz 1, rot 0). Damit ist das Kreuz außerhalb des Fangbereichs wie bisher schwarz,
  auch wenn die Animation jetzt immer wirkt.
- Mit `step-end` ist das Kreuz rot auf [25 %, 75 %). Das entspricht genau der alten Füllung `none` über [Anfang, Ende).
- `@keyframes leitfaden-marke-an` entfällt (nicht mehr benutzt). `leitfaden-marke-aus` bleibt für die Marke.
- Marke, Pausen, Zeitstrahlen, Scope und Spiegel bleiben unverändert. Die Kommentare sind angepasst.
- Zwischenstand verworfen: Der erste Anlauf nutzte `linear` mit Keyframes bei 24,999 % und 74,999 %. Der Bau davon (Reihe 1 und 2)
  lag bei 0 bis 0,41 %. In zwei Traces (13:01 und 13:04) hatte er aber zwei zusätzliche Schübe von Hauptthread-Bildern (9,5 %). Die
  Endfassung mit `step-end` hat 3,4 und 3,6 %, so viel wie ganz ohne Kreuz-Animationen (3,3 %).

## Messreihe Bildrate

`bewegung.mjs --modus bildrate --seite /` über `skript/mess.mjs`: m390, DPR 2, CPU 4×, Geste oben → unten → oben, 3 Läufe, Median.
Gemessen gegen 127.0.0.1:4395 mit `installSperre` und Einwilligung „abgelehnt“, jeweils ohne anderen Bau. Die Last bei Beginn lag
zwischen 0,51 und 1,19.

| Uhrzeit | Stand | Median % | Läufe % | verworfen | LoAF Anzahl (ms) |
|---|---|---|---|---|---|
| **Reihe 3: Endfassung (`step-end`), im Wechsel** | | | | | |
| 13:10:52 | nachher | **0,34** | 0,34 / 0,47 / 0,07 | 5 / 7 / 1 | 2 / 2 / 0 (161 / 118 / 0) |
| 13:13:40 | vorher | **3,93** | 3,93 / 3,93 / 3,94 | 60 / 60 / 60 | 2 / 1 / 2 (149 / 53 / 116) |
| 13:16:26 | nachher | **0,07** | 0,27 / 0,07 / 0,07 | 4 / 1 / 1 | 2 / 0 / 0 (133 / 0 / 0) |
| 13:19:11 | vorher | **3,85** | 4,88 / 3,67 / 3,85 | 75 / 56 / 59 | 4 / 0 / 1 (306 / 0 / 54) |
| **Reihe 2: Zwischenstand (`linear`)** | | | | | |
| 12:49:28 | vorher | 4,17 | 4,37 / 4,17 / 3,91 | 67 / 64 / 60 | 2 / 1 / 0 |
| 12:52:27 | Zwischenstand | 0 | 0,75 / 0 / 0 | 11 / 0 / 0 | 2 / 0 / 0 |
| 12:55:14 | vorher | 4,23 | 4,55 / 4,23 / 3,85 | 70 / 65 / 59 | 1 / 1 / 0 |
| 12:58:00 | Zwischenstand | 0,27 | 0,61 / 0,27 / 0,14 | 9 / 4 / 2 | 7 / 1 / 1 |
| **Reihe 1: erster Anlauf, Zwischenstand (`linear`)** | | | | | |
| 11:09:32 | Zwischenstand | 0,27 | 0,61 / 0,27 / 0,2 | 9 / 4 / 3 | 3 / 1 / 1 |
| 11:12:17 | vorher | 3,98 | 4,63 / 3,91 / 3,98 | 71 / 60 / 61 | 4 / 0 / 0 |
| 11:15:02 | Zwischenstand | 0,41 | 0,61 / 0,41 / 0 | 9 / 6 / 0 | 2 / 2 / 0 |

- Ziel erreicht: nachher 0,34 % und 0,07 % (≤ 1 %), vorher 3,93 % und 3,85 %.
- LoAF wie vorher, Median je Messung: nachher 2 und 0, vorher 2 und 1.
- Der erste Lauf einer Messung hat in beiden Ständen die meisten LoAF.

## Trace vorher/nachher (m390, CPU 4×, eine Geste)

| Uhrzeit | Stand | Bilder mit Hauptthread-Animation | verworfen | compositeFailed | Stil (Anzahl/ms) | Layout | Paint | PrePaint |
|---|---|---|---|---|---|---|---|---|
| 13:02:36 | vorher | 94,5 % | 64 | 99 | 1635 / 898 | 33 / 65 | 59 / 132 | 1862 / 1004 |
| 13:44:45 | nachher | 3,4 % | 4 | 1 | 1644 / 755 | 33 / 67 | 56 / 155 | 1871 / 870 |
| 13:45:32 | nachher | 3,6 % | 4 | 1 | 1626 / 909 | 33 / 84 | 57 / 139 | 1856 / 1024 |
| 13:07:21 | Zwischenstand, Kreuz-Animationen aus | 3,3 % | 8 | 1 | 1626 / 952 | 33 / 92 | 57 / 147 | 1855 / 1046 |

Nachher bleibt nur ein Schub von rund 51 Hauptthread-Bildern etwa 2,7 s nach Beginn der Geste. Er tritt auch ganz ohne
Kreuz-Animationen auf (vor-kante_anim, baum-b_aus) und hat damit eine andere Quelle als N1.

## Bild und Verhalten

- **Ruhezustand** nach dem Protokoll von pixelvergleich.mjs (reducedMotion reduce, DPR 1, Ausschnitte k × Viewport, `skript/bild.mjs`):
  m390, t768, d1440 und d1920 ergeben 46 Paare mit 0 abweichenden Pixeln. Die Seitenhöhen sind gleich (10838 / 10247 / 9877 / 11177).
  Aufnahmen 13:31 bis 13:33.
- **Bewegung an nach dem Durchscrollen** (m390, DPR 2, 16 Ausschnitte und 35 Stellen um die sieben Fangbereiche): 51 Paare, 49 ohne
  Abweichung.
  - `k10`: 4508 Pixel im laufenden Band (`karussell-laufen`, zeitgesteuert). Dieselbe Abweichung zeigt vorher gegen vorher.
  - `kante6-vor` und `kante6-zuletzt`: je 112 Pixel, nur das 8-px-Kreuz der siebten Kante. Siehe Restrisiko 1.
  - Aufnahmen 13:31 bis 13:35.
- **Abtastung der Kantenkreuze und des Kopfs** über die ganze Seite (`skript/kante.mjs`, berechneter Stil, grob 4 px, fein 1 px):
  - m390: alle 14 Wechsel gleich (Fenster je 48 px: 882–929, 1860–1907, 2623–2670, 3591–3638, 4423–4470, 5171–5218, 6513–6560).
  - d1440: alle 20 Wechsel gleich, auch die Wechsel des Kopfs.
  - Nie mehr als ein rotes Kreuz.
  - Messungen 13:24 bis 13:31.
- **Spiegel** (`skript/spiegel.mjs`, Stellen 870 / 906 / 950): „an“, „ruhig“, reduziert, Druck und erzwungene Farben sind vorher und
  nachher gleich. Geprüft wurden k-bewegung, das Attribut, die Zahl der Kreuz-Animationen und Deckkraft und display je Kante.
  „ruhig“, reduziert und Druck haben 0 Kreuz-Animationen. Messung 13:43.

## Prüfungen (Arbeitskopie)

- `npm test`: 248 bestanden, 0 fehlgeschlagen.
- `npx eslint src/app/bewegung.css`: 0 Fehler, 1 Warnung „File ignored because no matching configuration“. Die ESLint-Konfiguration
  deckt CSS nicht ab.
- `werte.mjs --arbeitsbaum --dateien …/baum/src/app/bewegung.css`: 0 Befunde.
  - Dafür wurde eine Kopie der Regeln verwendet (`skript/werte-regeln-arbeitskopie.json`). Darin gelten die bestehenden
    Zeilenausnahmen für `src/app/bewegung.css` auch für den Pfad der Arbeitskopie.
  - Mit den Originalregeln ergeben sich 2 × `dauer_zahl` (0.01ms im „ruhig“-Spiegel, Zeilen 1688/1689). Den gleichen Befund gibt es
    auch an 8bcca3c8; im Repository ist er über diese Ausnahme abgedeckt.
- `npx tsc --noEmit` mit vorübergehender `next-env.d.ts`: 0 Fehler.

## Restrisiko

1. **Rundung im Compositor:** Auf m390 (DPR 2) wechselt die siebte von sieben Kanten am Bildschirm 1 CSS-px früher als der
   berechnete Stil. Sie geht bei 6512 statt 6513 an und bei 6560 statt 6561 aus (`skript/kante-bild.mjs`, 13:36 bis 13:42). Vorher
   folgte das Bild dem Hauptthread genau. Auf d1440 stimmen alle 14 Wechsel. Bei einem Fenster von 48 px ist das in Bewegung nicht
   sichtbar. Ein Pixelvergleich genau an der Grenze zeigt es aber.
2. **Nur Chromium gemessen.** Ohne `animation-timeline` gilt weiter der Grundzustand. Andere Engines mit Scroll-Zeitstrahlen folgen
   derselben Spezifikation (Füllung, `step-end`), sind aber nicht gemessen.
3. **Zeitabhängige Inhalte:** Laufband und wechselnde Inhalte verändern Seitenhöhe und einzelne Ausschnitte zwischen zwei Ladevorgängen.
   Beispiele: m390 mit Bewegung 12960 gegen 13373 px, bildrate-Läufe 12521 gegen 9787 px. Das hängt nicht von dieser Änderung ab.
4. **Erzwungene Farben, schon an 8bcca3c8:**
   - `.kreuz-rot { display: none }` im Spiegel steht in `layer(components)` und unterliegt der Utility `inline-block` am SVG.
   - Darum läuft die rote Kreuz-Animation bei erzwungenen Farben weiter. Vorher und nachher ist das gleich; beide Kreuze haben dann
     dieselbe Systemfarbe.
   - Im Druck wirkt es nicht, dort hat das rote Kreuz Deckkraft 0.
   - Nicht geändert, weil es außerhalb dieses Auftrags liegt.

## Dateien und Belege (alle unter `…/scratchpad/takt/`)

- Änderung: `baum/src/app/bewegung.css`; Diff `UM-E3-TAKT.diff`.
- Messreihe: `messreihe.jsonl`, Einzelergebnisse unter `mess/`.
- Traces: `spur/*.json`, Rohdaten `spur/*.roh.json`.
- Abtastungen: `kante/*.json`.
- Bilder und Vergleiche: `bild/*`, darunter `vergleich-ruhe.json`, `vergleich-bewegung.json` und `diff/`.
- Skripte: `skript/` (bau.sh, start.sh, stopp.sh, ende.sh, mess.mjs, varianten.mjs, spur.mjs, spur2.mjs, verteilung.cjs, schuebe.cjs,
  kante.mjs, kante-bild.mjs, bild.mjs, spiegel.mjs).
- `spur2.mjs` ist verworfen: Seine rAF-Marken erzeugen selbst Hauptthread-Bilder.
- Server per Prozessgruppe aus der eigenen PID-Datei beendet.
- `.next`, `next-env.d.ts` und die echten `node_modules` sind gelöscht; `node_modules` ist in `vor` und `baum` wieder ein Verweis.
