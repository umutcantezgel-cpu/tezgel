E2-GRAF-02 · Grafiker · Modell: ARBEITSMODELL · Stufe 2 · Kern-Version: v2 · Umfang: 11 UI-Icons der eigenen Familie
Schreibrechte (exakt): `src/components/icons/svg/plus.svg`, `src/components/icons/svg/minus.svg`, `src/components/icons/svg/stern.svg`, `src/components/icons/svg/download.svg`, `src/components/icons/svg/suche.svg`, `src/components/icons/svg/teilen.svg`, `src/components/icons/svg/link-extern.svg`, `src/components/icons/svg/haus.svg`, `src/components/icons/svg/dokument.svg`, `src/components/icons/svg/schloss.svg`, `src/components/icons/svg/info.svg`, dazu die Rückgabe `_werkstatt/pakete/E2-GRAF-02.rueckgabe.md`. Sonst nichts.

## Rollenbriefing · Grafiker
Du setzt Bewegungseinträge und SVG-Arbeiten nach Register und Formsystem um. Häufige Fehler: mehr animieren als das Register vorsieht; reduzierte Bewegung vergessen; uneinheitliche Strichstärken.

## Aufgabe in einem Satz
Zeichne 11 UI-Icons der eigenen Icon-Familie exakt im Formsystem der Muster.

## Das Projekt in fünf Sätzen (wortgleich aus KERN)
1. Wir heben die Website von Fliesenverlegung Tezgel (Deniz Tezgel, Aßlar, seit 2008 bei der Handwerkskammer Wiesbaden eingetragen) auf allen Seiten auf Spitzenniveau, ohne Texte, Logo, Rechtliches oder Funktionen zu verlieren.
2. Leitidee: Jede Seite ist ein Verlegeplan – ein Fugenraster, eine rote Laserachse, und alles fluchtet daran.
3. Besucher sind Eigentümer in Mittelhessen zwischen 35 und 75, die in wenigen Schritten die passende Leistung finden, Vertrauen prüfen, ihren Ort prüfen, den Ablauf verstehen und ein Aufmaß anfragen wollen.
4. Gestaltet wird mit Archivo und IBM Plex Mono, mit Kalk, Tinte und genau einem Rot, mit gezeichneten Verlegeplänen statt Effekten und mit Bewegung, die ausrichtet und nie federt.
5. Alles ist zugänglich nach WCAG 2.2 AA, schnell (mobil LCP ≤ 2,5 s), ohne Effektteppich und ohne Erfundenes – im Zweifel gilt Bestand vor Gestaltung.

## Kern-Auszug (unveränderlich)
## K-008 SVG-Formsystem
- Grundgeometrie: 24er-Raster, Lebensbereich 2,75–21,25, Strich 1,5 px auf Halbpixel, Enden `square`, Ecken `miter`, fast nur 0°/90° (45° nur bei Pfeilspitzen und Tropfen). Farbe `currentColor`; skalierte Pläne mit `vector-effect: non-scaling-stroke`.
- Gefülltes Zeichen nur das **Fugenkreuz** (Markierung, Aufzählung, Kreuzpunkt der Achse, Trenner „Fugenlinie mit Kreuz“).
- Icon-Familie (eigene; ersetzt lucide und Phosphor): je Icon eine Datei `src/components/icons/svg/<name>.svg`, Sprite `src/components/icons/sprite.svg` per Skript erzeugt, eingebunden per `import sprite from './sprite.svg'` und `<use href={`${sprite.src}#<name>`}/>` in `Icon.tsx` (keine IDs im DOM, cachebar). UI-Icons: telefon, mail, sprechblase, ort, uhr, kalender, pfeil-rechts, pfeil-links, winkel-unten, winkel-rechts, schliessen, menue, haken, hinweis, fehler (Versatz-Zeichen), plus, minus, stern, download, suche, teilen, link-extern, haus, dokument, schloss. Fachzeichen (vom Orchestrator): bad, dusche-rinne, grossformat, abdichtung, untergrund, treppe, balkon, naturstein, reparatur, fussbodenheizung. Markenlogos (WhatsApp, Google, Facebook, LinkedIn, X) bleiben in ihrer Form unverändert und zählen nicht zur Familie. Zuordnung aller bisherigen lucide-Namen: `src/components/icons/zuordnung.ts`.
- Motive: **Verlegeplan** (Draufsicht mit Achse, schraffierten Passstücken, Bemaßung „=“) als parametrische Komponente `src/components/kern/Verlegeplan.tsx` mit Planvorgaben `src/lib/plaene/*.ts` je Thema; Verbände Kreuzfuge, Halbverband, Drittelverband; Zustandsgrafiken laden (Fuge läuft), notiert (Haken), fehler (Versatz); 404-Plan (eine Fliese verrutscht).
- Zugänglichkeit: dekorativ `aria-hidden="true" focusable="false"`; bedeutungstragend `role="img"` + Name (`aria-label` oder `<title>` mit `useId`). IDs je Instanz eindeutig.
- Optimierung: SVGO (Voreinstellung; animierte Grafiken mit erhaltenen IDs/Klassen), keine eingebetteten Pixelbilder, keine nachgezeichneten Bitmaps. Budget: Icon ≤ 1,5 KB, Illustration ≤ 40 KB gzip. Prüfung `svg.mjs`.

## Maßstab
- Muster-Icons (Stil verbindlich): `src/components/icons/svg/telefon.svg`, `pfeil-rechts.svg`, `haken.svg` (UI) sowie die Fachzeichen `bad.svg`, `fliese.svg`, `aufmass.svg`, `treppe.svg` im selben Ordner – Kopf, Attribute und Strichführung exakt übernehmen.
- Ansicht im Dev-Schaufenster: http://127.0.0.1:4320/werkstatt-schaufenster (zeigt nur Icons im Sprite; neue Icons erscheinen erst, wenn der Orchestrator das Sprite neu erzeugt).
- Zuordnung, wofür jedes Icon steht: `src/components/icons/zuordnung.ts`.

## Grenzen
- Repository `/home/user/tezgel`, Branch `claude/amazing-mendel-b0g40w`. Kein `git commit`, `push`, `checkout`, `reset`, `stash`, `restore` – Git nur lesend (`status`, `diff`, `log`, `show`).
- Nur die Dateien unter „Schreibrechte“ ändern. Fehler in fremden Dateien melden (OFFENE FRAGEN), nicht beheben. Gemeinsame Dateien (`src/app/globals.css`, `src/app/layout.tsx`, `next.config.ts`, `package.json`, `src/config/*`, `_werkstatt/KERN.md`, `_werkstatt/werkzeuge/tests/*`) nie ändern – Bedarf unter GEMEINSAME DATEIEN melden.
- Kein `next build`, kein `npm run build`, kein Start oder Stopp von Servern. Server laufen bereits: Produktion http://127.0.0.1:4310 (Stand des letzten Commits), Entwicklung http://127.0.0.1:4320 (Arbeitsbaum). Ist einer nicht erreichbar: melden, nicht starten.
- Keine echten Formularsendungen, kein `npm run indexnow`, keine POST-Anfragen per curl; Browserläufe nur über die Werkzeuge in `_werkstatt/werkzeuge` (Anfragesperre aus `lib.mjs`). Keine `.env*`-Dateien lesen oder anlegen.
- UNANTASTBAR: Logo, Rechtstexte, Geschäftslogik (`src/app/api/**`, `src/lib/email/**`, Validierung, Einwilligungslogik), Verhalten der Datenmodelle (`src/config/*`), Überschriften und Fließtexte (nur Vorschlag in der Rückgabe). Mikrotexte (Knöpfe, Labels, Etiketten, Alt-Texte, Zustandsmeldungen) nur, wenn das Paket es ausdrücklich erlaubt, und jede Änderung alt → neu in der Rückgabe auflisten.
- Neue Abhängigkeiten nie im Projekt. Scratchpad für Hilfsdateien: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/<Kennung>/` (eigener Unterordner).
- Keine Datei außerhalb der 11 genannten SVG-Dateien anlegen oder ändern – insbesondere nicht `sprite.svg`, `namen.ts`, `Icon.tsx`, `zuordnung.ts`.

## Schritte
1. Jede Datei beginnt exakt mit `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter">` und enthält genau ein `<path d="…"/>` (mehrere Teilpfade im selben d mit M), keine weiteren Attribute, keine IDs, keine Füllflächen, kein `<image>`.
2. Formregeln (K-008): Lebensbereich 2,75–21,25; Koordinaten auf Viertelschritten (.25/.5/.75/.0); fast nur waagrechte und senkrechte Linien; 45° nur für Pfeilspitzen, Haken und Tropfen; Bögen nur, wo die Form sie verlangt (Ort-Nadel, Uhr, Lupe, Sprechblasen-Ecke als Rechteck mit Zipfel bevorzugt); optische Größe wie die Muster (Hauptform füllt 16,5 × 16,5 bzw. passt die Breite an).
3. Inhalte: plus = Kreuz aus zwei Linien 5,25–18,75; minus = waagrechte Linie 5,25–18,75; stern = fünfzackiger Stern als Umriss (Ausnahme von der 0/90°-Regel, Spitzen spitz, `miter`), Bewertungsstern; download = senkrechter Pfeil nach unten auf eine Grundlinie (Grundlinie y 20,25); suche = Lupe (Kreis r 6 bei 10,5/10,5 und Griff 45° bis 20,25/20,25); teilen = drei Quadrate 3×3 an den Ecken eines Dreiecks, verbunden durch zwei Linien; link-extern = Quadrat-Umriss mit offener Ecke oben rechts und Pfeil diagonal nach oben rechts; haus = Rechteck mit Dach (zwei 45°-Schrägen) und Türöffnung; dokument = Blatt mit eckig geknickter Ecke oben rechts und drei Textlinien; schloss = Bügel (Halbbogen erlaubt) über Rechteck mit Schlüsselloch-Strich; info = Kreis r 8,25 mit senkrechtem Strich und quadratischem Punkt.
4. Jede Datei als eine Zeile speichern; Größe je Datei ≤ 600 Byte.
5. Sichtprüfung ohne Sprite: in `SCRATCH/E2-GRAF-02/` eine HTML-Datei anlegen, die alle 11 SVGs und die Muster `telefon`, `pfeil-rechts`, `haken`, `fliese` nebeneinander in 24 px und 48 px zeigt, per Playwright als PNG aufnehmen, in die Rückgabe verlinken; Ungleichgewichte korrigieren.
6. `node _werkstatt/werkzeuge/svg.mjs --dateien <deine 11 Dateien>` ausführen (falls das Werkzeug noch fehlt: OFFENE FRAGE) und Befunde beheben.

## Schnellprüfung und Selbstprüfung
- Sichtbild (24 und 48 px) neben den Mustern; `svg.mjs` ohne Befund; jede Datei beginnt mit dem vorgegebenen Kopf.
- Mengen gezählt (je Schritt die geforderte Menge erreicht), Schreibrechte und Grenzen eingehalten (`git status --porcelain` zeigt nur erlaubte Dateien), offene Fragen gelistet.

## Ausgabeformular
In `_werkstatt/pakete/E2-GRAF-02.rueckgabe.md` UND als letzte Antwort, höchstens 600 Wörter (Kundschafter 1.500): GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.

=== ENDE E2-GRAF-02 · BEREIT ZUR RÜCKGABE ===
