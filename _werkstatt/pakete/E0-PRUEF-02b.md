E0-PRUEF-02b · Prüfer · Modell: ARBEITSMODELL · Stufe 1 · Kern-Version: v1 · Umfang: Werkzeuge für Bewegung (Einzelbilder, Bildrate, Register, reduzierte Bewegung) und Glyphenabdeckung
Schreibrechte (exakt): `_werkstatt/werkzeuge/bewegung.mjs`, `_werkstatt/werkzeuge/glyphen.mjs`, `_werkstatt/werkzeuge/glyphen.py`, dazu die Rückgabe `_werkstatt/pakete/E0-PRUEF-02b.rueckgabe.md`. Sonst nichts.

## Rollenbriefing · Prüfer
Du richtest Prüfwerkzeuge ein, führst die Prüfungen deiner Stufe aus, schreibst Tests für neue Logik und berichtest knapp mit Belegpfaden. Häufige Fehler: Einzelmessung statt Median; deuten statt berichten; über die Stufe hinaus prüfen.

## Aufgabe in einem Satz
Baue `bewegung.mjs` (fünf Einzelbilder je Animation, Bildratenmessung bei 4× CPU-Drosselung per Tracing, Register-Abgleich in beide Richtungen, Prüfung bei reduzierter Bewegung) und `glyphen.mjs` (Zeichenabdeckung der Schriftdateien) und belege beide mit echten Läufen.

## Das Projekt in fünf Sätzen (wortgleich aus KERN)
1. Wir werten die Website von Fliesenverlegung Tezgel (Deniz Tezgel, Aßlar, seit 2008 bei der Handwerkskammer Wiesbaden eingetragen) zu einer eigenständigen, messbar besseren Seite auf, ohne Texte, Logo, Rechtliches oder Funktionen zu verlieren.
2. Leitidee: Jede Seite ist ein Verlegeplan – ein Fugenraster, eine rote Laserachse, und alles fluchtet daran.
3. Besucher sind Eigentümer in Mittelhessen zwischen 35 und 75, die in wenigen Schritten die passende Leistung finden, Vertrauen prüfen, ihren Ort prüfen, den Ablauf verstehen und ein Aufmaß anfragen wollen.
4. Gestaltet wird mit Archivo und IBM Plex Mono, mit Kalk, Tinte und genau einem Rot, mit gezeichneten Verlegeplänen statt Fotos und mit Bewegung, die ausrichtet und nie federt.
5. Alles ist zugänglich nach WCAG 2.2 AA, schnell (Lighthouse mobil ≥ 90), ohne Effektteppich und ohne Erfundenes – im Zweifel gilt Bestand vor Gestaltung.

## Kern-Auszug (unveränderlich)
## K-009 Bewegung
- Haltung: Bewegung richtet aus. Dinge rücken in die Flucht, der Laser schaltet ein, nichts federt, nichts schwebt.
- Dauer-Tokens (5): `--k-dauer-1` 140 ms (Rückmeldung) · `-2` 320 ms (Zustandswechsel) · `-3` 600 ms (Auftritt) · `-4` 800 ms (Flucht) · `-5` 1200 ms (Laser). Signaturabläufe ≤ 1600 ms gesamt. Staffel `--k-staffel` 60 ms, höchstens 8 Elemente.
- Kurven (4): `--k-kurve-setzen` cubic-bezier(0.2, 0.8, 0.2, 1) (ausklingend) · `--k-kurve-laser` cubic-bezier(0.7, 0, 0.2, 1) (wechselnd) · `--k-kurve-weg` cubic-bezier(0.32, 0, 0.67, 0) (beschleunigend, Ausgänge eine Dauerstufe kürzer) · `linear` (Fortschritt, scroll-gebunden).
- Technik: nur `transform` und `opacity`. Aufklapphöhen über `grid-template-rows` (Registereintrag). Auslöser über IntersectionObserver. Seitenwechsel über React `<ViewTransition>` als progressive Verbesserung; nach clientseitigem Wechsel Fokus auf die h1 (nicht beim ersten Laden, nicht bei Hash oder Zurück).
- Sichtbarkeit: Inline-Head-Skript setzt `html.k-bewegung` vor dem ersten Rendern, nur wenn `prefers-reduced-motion: no-preference`. Startzustände hängen nur an dieser Klasse. Nach 2 s setzt ein Zeitlimit `k-bereit` und zeigt alles. Das LCP-Element startet nie unsichtbar (nur Versatz ≤ 14 px, Deckkraft 1). Ohne JavaScript ist alles sichtbar.
- Reduziert: Überblendung oder Sofortzustand, gleiche Information. Hover-Effekte nur bei `(hover: hover) and (pointer: fine)`; Touch bekommt `:active`-Rückmeldung.
- Choreografie: Reihenfolge nach Lesefluss, eine Richtung je Abschnitt, je Bildschirmhöhe höchstens ein Auftritt mit Gewicht, Scroll-Auftritte auf höchstens der Hälfte der Abschnitte einer Seite (S-02).
- Signaturmomente (AUSBAUSTUFE Voll: drei, nur Erzählseiten):
  - **SIG-1 Kreuzlinie** (`/`): Waage und Lot wachsen aus dem Kreuzpunkt (`--k-dauer-5`, `--k-kurve-laser`), die Zeilen der H1 rücken aus 7–14 px Versatz in die Flucht (`--k-dauer-4`, Staffel). Mobil nur das Lot. *Austauschprobe:* bestanden (Laserrot = Logo-Rot, Achse auf dem Plan).
  - **SIG-2 Laser zieht den Ablauf** (`/`, `/bad`, Ablaufabschnitte): Beim Erreichen zieht der Laser die Achse (Desktop Waage, mobil Lot); an jeder Schrittfuge setzt sich ein Fugenkreuz, die Prüfhaken Ebenheit · Restfeuchte · Tragfähigkeit werden gesetzt. *Austauschprobe:* bestanden (Tezgels eigener Ablauftext).
  - **SIG-3 Verlegeplan je Leistung** (`/leistungen`, `[id]`, Bad- und Fliesen-Unterseiten): Jede Leistung hat ihren gezeichneten Plan; bei Fokus oder Hover rückt die Achse auf die Mitte, die Passstücke werden gleich. *Austauschprobe:* bestanden (genau Tezgels Leistungen, gezeichnet).
- Bewegungsregister (jedes animierte Element trägt `data-motion="<Kennung>"`):

  | Kennung | Zweck | Auslöser | Dauer · Kurve | Reduziert |
  |---|---|---|---|---|
  | `sig-kreuzlinie` | SIG-1 | Laden (Startklasse) | dauer-5 · laser | Endzustand sofort |
  | `sig-flucht` | H1-Zeilen in die Flucht | Laden | dauer-4 · setzen, Staffel | kein Versatz |
  | `sig-ablauf` | SIG-2 | IO 30 % | dauer-5 · laser, Staffel | Endzustand sofort |
  | `sig-plan` | SIG-3 | Fokus/Hover | dauer-2 · setzen | Sofortzustand |
  | `anriss` | Schlüsselwort einer Kundenstimme anstreichen | IO 50 % | dauer-4 · setzen | Strich sofort sichtbar |
  | `auftritt` | Abschnitt rückt 8 px in die Flucht | IO 20 % | dauer-3 · setzen | Überblendung dauer-2 |
  | `aufklappen` | Menü, Akkordeon, Mega-Menü | Klick/Taste | dauer-2 · setzen; zu: dauer-1 · weg | Sofortzustand |
  | `druck` | Knopf-Rückmeldung (1 px nach unten) | :active | dauer-1 · setzen | keine Bewegung, Farbwechsel |
  | `zustand` | Hover/Fokus-Farbwechsel, Fuge wird Strich | Hover/Fokus | dauer-1 · setzen | gleich (Farbe ist keine Bewegung) |
  | `notiert` | Erfolg: Haken zeichnet sich | Erfolg | dauer-3 · setzen | Haken sofort |
  | `laden` | Ladeanzeige (Fuge läuft) ab 300 ms, ≥ 500 ms sichtbar | Absenden | linear, endlos | statischer Text „Wird gesendet …“ |
  | `seitenwechsel` | Überblendung zwischen Seiten | Navigation | dauer-2 · setzen | keine |

## Maßstab
- Vorhandene Werkzeuge als Muster für Stil und Anfragesperre: `_werkstatt/werkzeuge/lib.mjs` (installSperre, setzeEinwilligung, durchscrollen, bereit, ueberlauf, ANSICHTEN), `fotos.mjs`, `axe.mjs`.
- Hauptansichten: `_werkstatt/HAUPTANSICHTEN.json`; Bewegungsregister: `_werkstatt/register.json`; Einrichtung: `_werkstatt/werkzeuge/EINRICHTUNG.md`.
- Werkzeug-Abhängigkeiten: `_werkstatt/werkzeuge/node_modules` (Symlink, enthält @playwright/test 1.56.1, @axe-core/playwright, lighthouse 13.5.0, svgo 4.1.0, pngjs, pixelmatch); Projekt-Abhängigkeiten (u. a. tailwindcss 4, @tailwindcss/node) unter `/home/user/tezgel/node_modules` (per createRequire erreichbar). Browser: PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers.

## Grenzen
- Repository `/home/user/tezgel`, Branch `claude/amazing-mendel-b0g40w`. Kein `git commit`, `push`, `checkout`, `reset`, `stash`, `restore` – Git nur lesend (`status`, `diff`, `log`, `show`).
- Nur die Dateien unter „Schreibrechte“ ändern. Fehler in fremden Dateien melden (OFFENE FRAGEN), nicht beheben. Gemeinsame Dateien (`src/app/globals.css`, `src/app/layout.tsx`, `next.config.ts`, `package.json`, `src/config/*`, `_werkstatt/KERN.md`, `_werkstatt/werkzeuge/tests/*`) nie ändern – Bedarf unter GEMEINSAME DATEIEN melden.
- Kein `next build`, kein `npm run build`, kein Start oder Stopp von Servern. Server laufen bereits: Produktion http://127.0.0.1:4310 (Stand des letzten Commits), Entwicklung http://127.0.0.1:4320 (Arbeitsbaum). Ist einer nicht erreichbar: melden, nicht starten.
- Keine echten Formularsendungen, kein `npm run indexnow`, keine POST-Anfragen per curl; Browserläufe nur über die Werkzeuge in `_werkstatt/werkzeuge` (Anfragesperre aus `lib.mjs`). Keine `.env*`-Dateien lesen oder anlegen.
- UNANTASTBAR: Logo, Rechtstexte, Geschäftslogik (`src/app/api/**`, `src/lib/email/**`, Validierung, Einwilligungslogik), Verhalten der Datenmodelle (`src/config/*`), Überschriften und Fließtexte (nur Vorschlag in der Rückgabe). Mikrotexte (Knöpfe, Labels, Etiketten, Alt-Texte, Zustandsmeldungen) nur, wenn das Paket es ausdrücklich erlaubt, und jede Änderung alt → neu in der Rückgabe auflisten.
- Neue Abhängigkeiten nie im Projekt. Scratchpad für Hilfsdateien: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/<Kennung>/` (eigener Unterordner).
- Werkzeuge dürfen `_werkstatt/werkzeuge/package.json` NICHT ändern (keine neuen npm-Abhängigkeiten). Python-Hilfspakete nur in eine venv im Scratchpad.
- Jedes Werkzeug ruft `assertLocal(base)` auf und nutzt für jeden Browserlauf `installSperre` (Anfragesperre). Ergebnisse unter `_werkstatt/cache/…` (liegt außerhalb des Repos) oder dem per `--ziel` genannten Ordner.
- Deutsche Kommentare im Stil der vorhandenen Werkzeuge; Kopfkommentar mit Zweck und Aufruf.
- `lib.mjs` nicht ändern (gehört E0-PRUEF-02a); nur importieren.

## Schritte
1. `bewegung.mjs` Aufruf: `node bewegung.mjs --modus einzelbilder|bildrate|register|reduziert --seite /pfad [--base URL] [--ansicht m390] [--kennung NAME] [--ziel DIR]`. Standard-Ziel `_werkstatt/cache/bewegung/<modus>/<slug>/`. Ergebnis je Lauf als `ergebnis.json` plus Zusammenfassung auf stdout.
2. Modus `einzelbilder`: Seite laden (reducedMotion `no-preference`, Einwilligung abgelehnt), betroffene Elemente `[data-motion]` (oder nur `--kennung`) nacheinander auslösen (in den Viewport scrollen; bei Kennungen mit Hover/Fokus-Auslöser `hover()`/`focus()`), dann alle laufenden Animationen über `document.getAnimations()` anhalten (`pause()`) und für die Zeitpunkte 0 %, 25 %, 50 %, 75 %, 100 % der jeweils längsten Gesamtdauer (`effect.getComputedTiming().endTime`) per `currentTime` setzen und je einen Ausschnitt des Elements (Bounding-Box + 24 px Rand, im Viewport) als JPEG q70 aufnehmen: genau 5 Bilder je Kennung (`<kennung>-0.jpg` … `-4.jpg`). Für scroll-gebundene Animationen (`animation-timeline` ≠ auto, erkennbar an `anim.timeline` vom Typ ScrollTimeline/ViewTimeline) stattdessen 5 gleichmäßig verteilte Scrollpositionen über den Wirkbereich des Elements. Gibt es keine `[data-motion]`-Elemente, endet der Lauf mit einer klaren Meldung (kein Fehler).
3. Modus `bildrate`: Ansicht m390 (isMobile, hasTouch, DPR 2 fest), CDP-Sitzung (`context.newCDPSession(page)`), `Emulation.setCPUThrottlingRate {rate: 4}`, Tracing starten (`Tracing.start` mit Kategorien `devtools.timeline,disabled-by-default-devtools.timeline.frame,benchmark,cc`), dann `Input.synthesizeScrollGesture` von oben nach unten über die ganze Seite (Geschwindigkeit 800 px/s) und wieder zurück, Tracing beenden und auswerten: Anzahl präsentierter und verworfener Bilder aus den Frame-Ereignissen (z. B. `PipelineReporter` mit `chrome_frame_reporter.state` STATE_DROPPED/STATE_PRESENTED_*, alternativ `DroppedFrame`/`Frame`); welche Ereignisart tatsächlich ausgewertet wurde, ins Ergebnis schreiben. Zusätzlich im Seitenkontext Long Animation Frames (`PerformanceObserver` Typ `long-animation-frame`, Anzahl und Summe > 50 ms). Ergebnis: `{bilder_gesamt, verworfen, anteil_verworfen_prozent, loaf_anzahl, loaf_summe_ms, quelle}`. Rohtrace NICHT speichern (Größe), nur Kennzahlen.
4. Modus `register`: Kennungen aus `_werkstatt/register.json` lesen. (a) Alle `data-motion`-Werte im DOM (nach `durchscrollen`, Hover über die ersten 20 Links/Knöpfe, Fokus per Tab über die ersten 30 fokussierbaren Elemente) gegen das Register: unbekannte Kennungen = Befund. (b) Gegenrichtung: während dieser Interaktionen alle 100 ms `document.getAnimations()` sammeln; jede Animation/Transition, deren Zielelement keinen Vorfahren/sich selbst mit `data-motion` hat, ist ein Befund (Element-Selektor, animierte Eigenschaft). Ergebnis: Listen `unbekannt`, `ohne_register`, `gefundene_kennungen`.
5. Modus `reduziert`: reducedMotion `reduce`, Seite laden, durchscrollen, Hover/Fokus wie oben; alle Animationen sammeln und ihre Keyframes prüfen (`effect.getKeyframes()`): Befund, wenn `transform`, `translate`, `scale`, `rotate`, `width`, `height`, `top`, `left`, `inset` animiert wird. Danach 2,5 s warten und für alle `[data-motion]`-Elemente prüfen: `opacity` > 0,99, `visibility` visible, nicht außerhalb des Dokuments verschoben. Ergebnis: `{bewegungsbefunde: [], unsichtbar: []}`.
6. `glyphen.py` + `glyphen.mjs`: Python-venv im Scratchpad anlegen (`python3 -m venv $SCRATCH/venv-glyphen && $SCRATCH/venv-glyphen/bin/pip install fonttools brotli`). `glyphen.py <zeichen.txt> <font.woff2>…` liest die cmap jeder Schrift und gibt JSON `{font: [fehlende Zeichen als U+XXXX mit Zeichen]}` aus. `glyphen.mjs --texte <satz-ordner mit texte/*.json oder texte-index.json> --schriften <woff2-Dateien oder Ordner>` sammelt alle Zeichen aus allen Textfeldern (Überschriften, Absätze, Alt-Texte, Labels, Meta), schreibt sie in eine Datei und ruft `glyphen.py` mit dem venv-Python auf. Ausgabe: je Schrift die fehlenden Zeichen mit Häufigkeit und bis zu 3 Fundstellen (Seite + Textauszug).
7. Belege: `einzelbilder` und `register` gegen `http://127.0.0.1:4310/` (heute ohne data-motion: Ergebnis muss das sauber ausweisen, Gegenrichtung listet die vorhandenen Animationen/Transitions); `bildrate` gegen `/` (4310); `reduziert` gegen `/` (4310); `glyphen.mjs --texte /home/user/tezgel/_relaunch/belege/p0-ausgangsstand --schriften <eine beliebige .woff2 aus /home/user/tezgel/node_modules, Pfad per find bestimmen>`. Je Lauf Kennzahlen und Ausgabepfad in die Rückgabe.

## Schnellprüfung und Selbstprüfung
- Jedes neue oder geänderte Werkzeug einmal gegen eine echte Ansicht ausführen (Beleg: Ausgabepfad), `node --check` bzw. `bash -n` grün.
- Mengen gezählt (je Schritt die geforderte Menge erreicht), Schreibrechte und Grenzen eingehalten (`git status --porcelain` zeigt nur erlaubte Dateien), offene Fragen gelistet.

## Ausgabeformular
In `_werkstatt/pakete/E0-PRUEF-02b.rueckgabe.md` UND als letzte Antwort, höchstens 600 Wörter (Kundschafter 1.500): GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.

=== ENDE E0-PRUEF-02b · BEREIT ZUR RÜCKGABE ===
