<!-- Technikgutachten zur Planung (23.10.2026, Opus 5.5, nur lesend, Quellen per Web). Unverändert. -->

# Gutachten B-02 (und B-01): Lighthouse 13.5 und Chrome, Ladeleistung und Messung

**Vorab:** Die Annahme „Lighthouse startet immer mit leerem Speicher“ stimmt nicht. Lighthouse 13.5 leert standardmäßig nur `file_systems`, `shader_cache`, `service_workers` und `cache_storage`, also kein `local_storage` (https://raw.githubusercontent.com/GoogleChrome/lighthouse/main/core/config/constants.js Z. 69–70; navigation-runner.js Z. 238–242). Das Projektwerkzeug nutzt eine Chrome-Instanz für alle Läufe (`/home/user/tezgel/_relaunch/werkzeuge/lighthouse.mjs:105,110`). Das Intro erscheint deshalb nur im ersten Lauf je Herkunft, und der Median wird geschönt. Frische CLI-Läufe und PSI haben vermutlich ein neues Profil. OFFENE FRAGE: Wie verhält sich die PSI-Infrastruktur genau?

## 1. LCP unter Verdeckung
- **Verdeckung wird nicht geprüft.** Die Größe ist nur der Schnitt mit dem sichtbaren Viewport (w3c.github.io/largest-contentful-paint §4.3 „effective visual size“). §1.3 „Limitations“ nennt Splash-Screens ausdrücklich als Schwäche. web.dev/articles/lcp schneidet nur am Viewport, an Clipping und Overflow ab. Entfernte Inhalte bleiben Kandidat (Chromium `metrics_changelog/2020_11_lcp_2.md`).
- **Voraussetzung:** Der heutige LCP-Absatz `p.max-w-mass` (`_relaunch/belege/e6o1-lh/lighthouse-vergleich.json`) muss unter der Überlagerung mit Deckkraft größer 0 malen. html, body und main dürfen nie per `opacity:0` oder `visibility:hidden` versteckt werden. Chrome ignoriert Malvorgänge mit Deckkraft 0 (`2020_08_lcp.md`); Chrome 144 hat außerdem die Behandlung bei Dokument-Deckkraft 0 korrigiert (`lcp.md`).
- **Kandidaten der Überlagerung:** LCP-fähig sind nur img, SVG `<image>`, Video-Poster, `background-image: url()` und Textknoten (w3c.github.io/paint-timing §2 „timing-eligible“).
  - Inline-SVG-Pfade: nein (web.dev/articles/lcp: „<svg> elements are not considered LCP candidates“).
  - Hintergrundfarbe oder Verlauf: nein, weil kein url-Bild.
  - SVG `<image>`: ja.
  - SVG `<text>`: OFFENE FRAGE.
  - Vermeiden: nur path, rect und Farben; kein url(), kein `<image>`, kein Text.

## 2. Speed Index
- **Gewicht und Schwellen:** SI zählt 10 % (default-config.js Z. 423). Mobil gilt p10 3387 ms, Median 5800 ms (core/audits/metrics/speed-index.js Z. 44–45). Note 0,9 gibt es also bei höchstens 3387 ms.
- **Lantern-Formel:** SI = 1,4 × beobachteter SI + 0,4 × layoutbasierter SI, mindestens FCP (devtools-frontend `front_end/models/trace/lantern/metrics/SpeedIndex.ts` Z. 25–26, 71, 86; Stand main, kann vom trace_engine 0.0.67 in LH 13.5 abweichen).
- **Folge:** Der beobachtete SI stammt aus echten, ungedrosselten Bildschirmfotos (speedline-core 1.4.3 `lib/speed-index.js` Z. 206–250). Die Intro-Dauer geht also in Wanduhrzeit ein und wird mit 1,4 verstärkt; die Drosselung verdünnt sie nicht.
- **Speedline vergleicht Farb-Histogramme, nicht Positionen** (Z. 38–66). Eine Überlagerung in Kalk mit Tinte-Linien zählt deshalb schon als Fortschritt, eine dunkle Fläche kaum. OFFENE FRAGE: wie groß der Effekt ist; messen.
- **Schätzung** (Fortschritt etwa 0 bis zur Freilegung, Layout-Anteil etwa 0,8 s; nicht belegt):

| Deckende Phase | Beobachteter SI | SI in Lighthouse | SI-Note |
|---|---|---|---|
| 1,4 s | ca. 1,7 s | ca. 3,2 s | ca. 0,92 |
| 2,2 s | ca. 2,2–2,5 s | ca. 3,9–4,3 s | ca. 0,83–0,76 |

- **Leistungswert mit Ihren Werten** (LCP 1,8 s, TBT 100 ms, CLS 0, FCP 1,2 s): ohne SI 89,05 Punkte. SI-Note 1,0 ergibt 99, 0,92 ergibt 98, 0,76 ergibt 97. Selbst SI-Note 0 ergibt noch 89. Mit diesen Werten reißt SI allein die 90 nicht.
- **Ist-Stand `/` mobil** (13.10., LH 13.5, Median aus 5 Läufen): Leistung 90, LCP 3461 ms, TBT 149 ms, FCP 1375 ms, SI 1382 ms. Ohne SI sind das etwa 79,5 Punkte; mit SI 3,2 s etwa 89, mit 4,3 s etwa 87. Das Budget ist damit gerissen.

## 3. FCP
- **Die Logo-Pfade zählen zu FCP.** „svg element with rendered descendants“ gilt als contentful (paint-timing §2).
- **Netto bleibt FCP gleich.** Der verdeckte Text malt im selben Bild. Das gilt nur ohne zusätzliche blockierende Ressource: kein externes CSS oder Skript, SVG klein halten.
- **Besser wird FCP praktisch nicht.** OFFENE FRAGE: Gelten Pfade mit voll versetzter Strichlinie als „rendered“? Das ist hier unerheblich, weil der Text gleichzeitig malt.
- **Wichtiger Lantern-Hebel:** Sind beobachtetes FCP und LCP gleich und ist LCP Text, nimmt Lantern den FCP-Graphen (LargestContentfulPaint.ts Z. 47, 63). Sonst schneidet es am beobachteten LCP-Zeitpunkt und zählt alle Anfragen davor mit (Z. 68–69).
  - Heute weichen LCP und FCP stark ab (3,46 s gegen 1,38 s). Warum, ist eine OFFENE FRAGE: Spur prüfen, Kandidaten sind Archivo-Wechsel und Startzustände.
  - Das Intro darf den beobachteten LCP-Zeitpunkt nie nach hinten schieben.

## 4. TBT
- **stroke-dashoffset läuft auf dem Hauptthread.** Beschleunigt sind nur opacity, filter und transform, auf SVG seit Chromium 89 (developer.chrome.com/blog/hardware-accelerated-animations). Jedes Bild braucht Stil und Paint, mit Masken teurer.
- **TBT-Effekt in Lighthouse wahrscheinlich klein.** Lantern verwirft Aufgaben unter 10 ms (PageDependencyGraph.ts Z. 29, 387–417) und rechnet mit CPU ×4 (simulation/Constants.ts Z. 43–50). Nur beobachtete Aufgaben über 12,5 ms werden zu langen Aufgaben. Einzelbilder bleiben meist darunter.
- **Auf echten Telefonen** konkurrieren die Bilder mit der Hydrierung. OFFENE FRAGE: Kosten des Masken-Paints; per Spur messen.
- **WAAPI mit transform und opacity** läuft im Compositor; nur der Start kostet. Beim FLIP das Ziel-Rechteck einmal messen.
- **B-01:** Die 80 Fliesen nicht in jede Seite rendern, sondern erst bei der ersten Navigation erzeugen. Ebenenzahl beachten (web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count).

## 5. INP
- **Lighthouse misst INP im Navigationsmodus nicht** (interaction-to-next-paint.js Z. 33, nur timespan).
- **Im Feld zählen nur Klicken, Tippen und Tasten** (web.dev/articles/inp). wheel, scroll und touchmove zählen nicht. LCP endet bei der ersten Eingabe (LCP-Spec §1.1).
- **Beenden-Handler:**
  - In das Inline-Kopfskript legen, damit er vor der Hydrierung wirkt.
  - `once`, `passive` für wheel, touchmove und scroll, kein preventDefault.
  - Im Handler nur eine Klasse setzen und die Animationen abbrechen.
  - DOM-Entfernung und localStorage erst nach dem nächsten Bild per setTimeout; `scheduler.yield` fehlt in Safari.
  - Kein `document.getAnimations()` über die ganze Seite.

## 6. CLS
- **Einblenden oder Entfernen der festen Überlagerung verschiebt nichts.** Hinzufügen und Entfernen sind keine Verschiebung, solange andere Elemente bleiben (web.dev/articles/cls). Fallen:
  - (a) Scroll-Sperre per `overflow:hidden`: Die Scrollleiste verschwindet, auf dem Desktop ändert sich die Breite, das ist eine Verschiebung ohne Eingabe. Nicht sperren oder `scrollbar-gutter: stable`.
  - (b) FLIP nur mit transform. top, left oder width erzeugen je Bild Verschiebungen, auch mit aria-hidden.
  - (c) Kopf-Logo (next/image, `src/components/common/Header.jsx:25–31`) nur per opacity verstecken, nie `display:none`.
  - (d) Ziel-Rechteck nach dem Schriftladen lesen.
- **B-01 im Feld:** `hadRecentInput` gilt nur 500 ms nach einer diskreten Eingabe. Der Inhaltswechsel kommt erst nach 540 ms (45 % von 1200 ms). Verschiebungen bleibender Elemente wie dem Fuß zählen deshalb in CrUX-CLS; die Abdeckung schützt nicht. Lighthouse sieht B-01 nicht.

## 7. Empfehlungen
1. **Messwerkzeug korrigieren, nicht das Produkt:** `clearStorageTypes` um `local_storage` ergänzen oder Chrome je Lauf neu starten. Läufe mit und ohne Intro getrennt ausweisen.
2. **Reduzierte Bewegung:** Lighthouse emuliert keine Medienmerkmale. `core/lib/emulation.js` setzt nur Gerätemetriken, Touch und CPU (Z. 75–103, 153). Lighthouse sieht also „no-preference“ und das Intro. Keine Erkennung von Prüfwerkzeugen über User-Agent oder webdriver.
3. **Deckende Phase kürzen:** Freilegung spätestens nach etwa 800 ms beginnen. Kontur und Flächen parallel statt nacheinander. Freilegen per Fliesen-Abzug mit transform, sodass der sichtbare Anteil der Startseite stetig wächst. Ziel: beobachteter SI höchstens 1,2 s, dann Lighthouse-SI höchstens etwa 2,5 s.
4. **Überlagerung in Seitenfarben,** Kalk mit Tinte, gern leicht durchscheinend; nicht dunkel.
5. **Kontur ohne mask** zeichnen. OFFENE FRAGE: Ob clip-path-Animationen schon im Compositor laufen; Chromium hat sie noch im Rollout.
6. **Gesamtdauer etwa 1,5 s oder weniger.** Lighthouse beendet die Spur nach load + 1 s und 1 s Netz- und CPU-Ruhe (constants.js Z. 56–59). Ein längeres Intro kann mitten in der Spur abbrechen und die Streuung erhöhen. OFFENE FRAGE; messen.
7. **LCP-Ursache (3,46 s) vorher beheben.** Das Budget hängt daran.

## 8. Gesamturteil
Machbar mit Auflagen. „Budgets halten mit Intro“ ist heute nicht belegt. Die drei größten Risiken:
1. **Ungültige Messung,** weil localStorage nicht geleert wird und alle Läufe in einer Chrome-Instanz laufen. Gegenmaßnahme: Werkzeug ändern, beide Zustände berichten.
2. **SI kostet 1–3 Punkte bei LCP 3,46 s,** damit fällt `/` unter 90. Gegenmaßnahme: kurze deckende Phase, Seitenfarben, Freilegung per transform; LCP-Fix vorziehen.
3. **Verschobener beobachteter LCP,** etwa durch versteckten Inhalt oder Startzustände bis zum Intro-Ende; dann wächst der Lantern-LCP stark. Gegenmaßnahme: Inhalt unter der Überlagerung fertig malen. LCP-Element und Zeitpunkt in jeder Messung prüfen; `lighthouse.mjs` erfasst beides schon.

Nebenbefund: Feld-LCP misst verdeckten Text. Der Wert ist „gut“, obwohl Nutzer den Inhalt erst nach dem Intro sehen.

### Critical Files for Implementation
- /home/user/tezgel/src/app/(bestand)/_dokument.tsx
- /home/user/tezgel/src/lib/motion/kopfskript.ts
- /home/user/tezgel/src/components/start/Einstieg.tsx
- /home/user/tezgel/src/components/common/Header.jsx
- /home/user/tezgel/_relaunch/werkzeuge/lighthouse.mjs
