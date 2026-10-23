E0-PRUEF-02d · Prüfer · Modell: ARBEITSMODELL · Stufe 1 · Kern-Version: v1 · Umfang: Werkzeuge für Systemwerte (Z-03) und SVG (Z-06)
Schreibrechte (exakt): `_werkstatt/werkzeuge/werte.mjs`, `_werkstatt/werkzeuge/werte-regeln.json`, `_werkstatt/werkzeuge/svg.mjs`, dazu die Rückgabe `_werkstatt/pakete/E0-PRUEF-02d.rueckgabe.md`. Sonst nichts.

## Rollenbriefing · Prüfer
Du richtest Prüfwerkzeuge ein, führst die Prüfungen deiner Stufe aus, schreibst Tests für neue Logik und berichtest knapp mit Belegpfaden. Häufige Fehler: Einzelmessung statt Median; deuten statt berichten; über die Stufe hinaus prüfen.

## Aufgabe in einem Satz
Baue `werte.mjs` (Werte außerhalb des Designsystems und wirkungslose Klassen in geänderten Dateien, über Tailwinds eigenes Designsystem aufgelöst) samt Regeldatei und `svg.mjs` (SVGO-Fixpunkt, eingebettete Pixelbilder, IDs, Zugänglichkeit, Budgets) und belege beide mit echten Läufen.

## Das Projekt in fünf Sätzen (wortgleich aus KERN)
1. Wir werten die Website von Fliesenverlegung Tezgel (Deniz Tezgel, Aßlar, seit 2008 bei der Handwerkskammer Wiesbaden eingetragen) zu einer eigenständigen, messbar besseren Seite auf, ohne Texte, Logo, Rechtliches oder Funktionen zu verlieren.
2. Leitidee: Jede Seite ist ein Verlegeplan – ein Fugenraster, eine rote Laserachse, und alles fluchtet daran.
3. Besucher sind Eigentümer in Mittelhessen zwischen 35 und 75, die in wenigen Schritten die passende Leistung finden, Vertrauen prüfen, ihren Ort prüfen, den Ablauf verstehen und ein Aufmaß anfragen wollen.
4. Gestaltet wird mit Archivo und IBM Plex Mono, mit Kalk, Tinte und genau einem Rot, mit gezeichneten Verlegeplänen statt Fotos und mit Bewegung, die ausrichtet und nie federt.
5. Alles ist zugänglich nach WCAG 2.2 AA, schnell (Lighthouse mobil ≥ 90), ohne Effektteppich und ohne Erfundenes – im Zweifel gilt Bestand vor Gestaltung.

## Kern-Auszug (unveränderlich)
## K-005 Typografie
- Familien (OFL, selbst gehostet, woff2, Teilmengen Latin + Latin Extended mit ß/ẞ/Umlauten, Lizenzvermerk in `src/app/fonts/LIZENZEN.md`):
  - **Archivo** variabel (wght 100–900, wdth 62–125). Anzeige und Überschriften in Breite 74 %, Gewicht 760. Text in Breite 100 %, Gewicht 400/600.
  - **IBM Plex Mono** 400 (optional 500) für Messbares und Belegbares: Normen, Rutschklassen, Telefonnummern, PLZ, Jahreszahlen, Bewertungen, Schrittnummern, Bildunterschriften. Nie für Fließtext, nur Satzschreibung, keine Versalien-Sperrung.
  - Kaufempfehlung in MENSCHEN.md [A]: keine lizenzierte Hausschrift bekannt.
- Skala (7 Stufen, `clamp` mit rem-Anteil, Max ≤ 2,5 × Min):

  | Token | Wert | Einsatz |
  |---|---|---|
  | `--k-fs-1` | clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem) | Etiketten, Mono-Kleinangaben |
  | `--k-fs-2` | clamp(0.9375rem, 0.9rem + 0.15vw, 1rem) | Nebentext, Formularhilfe |
  | `--k-fs-3` | clamp(1.0625rem, 1.02rem + 0.2vw, 1.1875rem) | Fließtext |
  | `--k-fs-4` | clamp(1.25rem, 1.15rem + 0.45vw, 1.5rem) | Vorspann, H4 |
  | `--k-fs-5` | clamp(1.5rem, 1.25rem + 1.1vw, 2.25rem) | H3 |
  | `--k-fs-6` | clamp(2rem, 1.5rem + 2.2vw, 3.5rem) | H2 |
  | `--k-fs-7` | clamp(2.75rem, 1.4rem + 5vw, 6.5rem) | H1 Erzählseiten (Arbeitsseiten: `--k-fs-6`) |
- Zeilenhöhen: Anzeige 1,08 · Kopf 1,1 · Vorspann 1,5 · Text 1,6. Maß 66ch. Große Größen Laufweite −0,01 em bis −0,02 em.
- Satz: `text-wrap: balance` für Überschriften, `pretty` für Absätze. `hyphens: auto` mit `lang="de"`; lange Komposita in Überschriften tragen `&shy;` an der Fugenstelle (nur Darstellung, Wortlaut gleich). Mobil die längsten Wörter je Überschrift bei 320 px prüfen. „…“, Gedankenstrich, geschütztes Leerzeichen vor Einheiten („8 m²“). Zeilenmasken mit Innenabstand für Unterlängen und Umlautpunkte.

## K-007 Raster und Abstände
- Raster: 12 Spalten (Desktop ≥ 1024), 8 (Tablett 768), 4 (mobil). Spalten ohne Zwischenraum, getrennt nur durch 1-px-Fugen (`--k-fuge`). Seitenbreite `--k-seite` 82rem. Rand `--k-rand`: mobil `--k-s-4`, Tablett `--k-s-6`, Desktop `--k-s-7`.
- Abstandsskala (10 Stufen): `--k-s-1` 4 · `-2` 8 · `-3` 12 · `-4` 16 · `-5` 24 · `-6` 32 · `-7` 48 · `-8` 64 · `-9` 96 · `-10` 128 px. Abschnittsabstand Erzählseite `--k-s-9`/`-10`, Arbeitsseite `--k-s-7`/`-8`.
- Achse: eine sichtbare Achse je Erzählseite. Desktop als Waage oder Lot an einer Spaltengrenze, mobil als Lot am linken Rand (`--k-rand` − 1 px). Die Achse schneidet nie Text.
- Bewusste Brüche: Verbände als Rastervarianten – Kreuzfuge (Standard), Halbverband (Listen), Drittelverband (Großformat-Seiten, Reihenversatz 4/12 Spalten).
- `scroll-padding-top` = Kopfhöhe + `--k-s-4`. Touch-Ziele ≥ 44 × 44 px.

## K-010 SVG-Formsystem
- Grundgeometrie: 24er-Raster, Lebensbereich 2,75–21,25, Strich 1,5 px auf Halbpixel, Enden `square`, Ecken `miter`, fast nur 0° und 90° (45° nur bei Pfeilspitzen und Tropfen). Farbe `currentColor`. `vector-effect: non-scaling-stroke` bei skalierten Plänen.
- Gefülltes Zeichen nur das **Fugenkreuz** (Markierung, Aufzählung, Kreuzpunkt der Achse, Trenner „Fugenlinie mit Kreuz“).
- Icon-Familie (eigene, ersetzt lucide und Phosphor; E-010): Grundbestand Telefon, Mail, Sprechblase, WhatsApp (Markenlogo, unverändert, zählt nicht zur Familie), Ort, Uhr, Kalender, Pfeil, Winkel (Chevron), Schließen, Menü, Haken, Hinweis, Fehler (Versatz-Zeichen), Plus/Minus, Stern (Bewertung), Download, Suche, Teilen, sowie Fachzeichen Bad, Dusche/Rinne, Großformat, Abdichtung, Untergrund, Treppe, Balkon, Naturstein, Reparatur, Fußbodenheizung. Über `<symbol>` + `<use>` (Sprite) und eine Komponente `Icon`; `iconMapper`-Strings werden auf diese Namen abgebildet. Je Icon ≤ 1,5 KB.
- Motive: **Verlegeplan** (Draufsicht mit Achse, schraffierten Passstücken, Bemaßung „=“) je Leistung; Muster Kreuzfuge, Halbverband, Drittelverband (CSS-Linien, keine Verläufe sichtbar). Illustrationen ≤ 40 KB gzip.
- Zugänglichkeit: dekorativ `aria-hidden="true"`; bedeutungstragend `role="img"` + `<title>` über `aria-labelledby`. IDs je Instanz eindeutig (`useId`).
- Optimierung: zwei SVGO-Konfigurationen (statisch/animiert) nach AUFTRAG Abschnitt 7.

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
1. `werte-regeln.json` (erste Fassung nach KERN v1; der Orchestrator pflegt sie später): `farben` (erlaubte Theme-Farbnamen: kalk, fliese, fuge, strich, tinte, tinte-2, laser, laser-tief, abnahme, nacht-2, nacht-fuge, white, black, transparent, current, inherit), `abstaende` (Tailwind-Stufen 0, px, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32 für die Präfixe p, px, py, pt, pr, pb, pl, ps, pe, m, mx, my, mt, mr, mb, ml, ms, me, gap, gap-x, gap-y, space-x, space-y, inset, inset-x, inset-y, top, right, bottom, left, translate-x, translate-y, scroll-mt, scroll-pt), `groessen` (für w-, h-, size-, min-w-, min-h-, max-w-: 4, 5, 6, 11, full, auto, screen, fit, min, max, px, 0 sowie Brüche 1/2, 1/3, 2/3, 1/4, 3/4 und benannte Containergrößen), `schrift` (text-fs-1 … text-fs-7 sowie font-…-Familien des Themes), `dauern` (dauer-1 … dauer-5), `kurven` (kurve-setzen, kurve-laser, kurve-weg), `radien` (rounded-none, rounded-r1 laut Theme), `ausnahmen` (Pfadmuster: `src/lib/email/**`, `src/components/ui/GoogleIcon.tsx`, `**/opengraph-image.*`, SVG-Pfaddaten). Kommentarfeld mit Quelle „KERN v1, wird mit v2 angepasst“.
2. `werte.mjs` Aufruf: `node werte.mjs [--basis <commit>] [--arbeitsbaum] [--dateien a,b] [--regeln werte-regeln.json]`. Dateimenge: `git diff --name-only <basis>` (mit `--arbeitsbaum` inkl. ungestageter/neuer Dateien) gefiltert auf `src/**/*.{js,jsx,ts,tsx,css}`, oder `--dateien`. Ausnahmen aus den Regeln abziehen.
3. Klassenkandidaten je Datei: Zeichenketten in `className=`, `class=`, Aufrufen von `clsx(`, `cn(`, `twMerge(` und Template-Literalen darin (Tokens trennen an Leerraum); in CSS-Dateien `@apply`-Listen. Varianten (`hover:`, `md:` …) abtrennen, Wichtigkeits-`!` entfernen.
4. Auflösung: Tailwinds Designsystem aus `/home/user/tezgel/node_modules/@tailwindcss/node` laden (die exportierte Funktion zum Laden des Designsystems im Code nachschlagen, z. B. `__unstable__loadDesignSystem`) mit dem Inhalt von `src/app/globals.css` und `base` = `src/app`; für jeden Kandidaten `candidatesToCss` aufrufen. Befunde: (1) `ohne_css`: Kandidat sieht aus wie eine Utility (enthält `-` und beginnt mit bekanntem Präfix wie bg-, text-, border-, rounded-, shadow-, p-, m-, gap-, w-, h-, font-, from-, via-, to-, ring-, eyebrow, glass-, ambient-, ceramic-), erzeugt aber kein CSS; (2) `beliebig`: Kandidat mit `[`…`]`; (3) `farbe_ausserhalb`: Farb-Utility, deren Farbname nicht in `farben` steht (auch mit `/Deckkraft`), sowie erzeugte Deklarationen mit Roh-Farbwerten (hex, rgb, hsl, oklch) ohne `var(--color-<erlaubt>)`; (4) `abstand_ausserhalb` und `groesse_ausserhalb` laut Regeln; (5) `dauer_ausserhalb`: `duration-*`/`ease-*`, die nicht in `dauern`/`kurven` stehen. Zusätzlich direkt im Quelltext: (6) Hex-/rgb-/hsl-Literale außerhalb von Kommentaren, (7) `style={{…}}` mit Werten, die keine CSS-Variable setzen (`'--name'`-Schlüssel sind erlaubt), (8) Zahlen-Dauern in ms in Bewegungscode (`setTimeout`-Zeiten ausgenommen).
5. Ausgabe: `_werkstatt/cache/werte/<zeitstempel>.json` mit Befunden je Datei (Zeile, Kandidat, Art) und Zusammenfassung je Art auf stdout; Exit 1 bei mindestens einem Befund. Laufzeit für 100 Dateien unter 60 s halten (Kandidaten über alle Dateien dedupliziert auflösen).
6. `svg.mjs` Aufruf: `node svg.mjs [--dateien <svg…|Ordner>] [--seiten /a,/b --base URL] [--animiert]`. Dateimodus: jede SVG mit svgo (aus `_werkstatt/werkzeuge/node_modules/svgo`, Voreinstellung `preset-default`; mit `--animiert` ohne `cleanupIds`, `removeUnknownsAndDefaults`, `collapseGroups`, `convertShapeToPath` und mit `removeViewBox: false`) optimieren und prüfen: Fixpunkt (zweite Optimierung ändert nichts mehr UND Datei entspricht bereits der optimierten Fassung ± Leerraum), eingebettete Pixelbilder (`<image`, `data:image`), Größe roh und gzip (Budget: Icon ≤ 1,5 KB roh, wenn viewBox 24×24; sonst Illustration ≤ 40 KB gzip), `viewBox` vorhanden. Seitenmodus (Playwright, Anfragesperre, Ansichten m390 und d1440): alle `<svg>` im DOM – doppelte `id` innerhalb der Seite, dekorativ ohne `aria-hidden="true"` und ohne Namen (`role=img` + `aria-label`/`aria-labelledby`/`<title>`), `focusable` nicht false bei dekorativen; Zahl der Inline-SVGs.
7. Belege: `werte.mjs --dateien src/app/page.tsx,src/components/ui/FinalCTA.tsx` (heute viele Befunde erwartet – Zahlen je Art in die Rückgabe), Laufzeit; `svg.mjs --dateien /home/user/tezgel/public/images/logo` (erwartet: eingebettete Pixelbilder in tezgel-logo*.svg) und `svg.mjs --seiten /,/kontakt --base http://127.0.0.1:4310`.

## Schnellprüfung und Selbstprüfung
- Jedes neue oder geänderte Werkzeug einmal gegen eine echte Ansicht ausführen (Beleg: Ausgabepfad), `node --check` bzw. `bash -n` grün.
- Mengen gezählt (je Schritt die geforderte Menge erreicht), Schreibrechte und Grenzen eingehalten (`git status --porcelain` zeigt nur erlaubte Dateien), offene Fragen gelistet.

## Ausgabeformular
In `_werkstatt/pakete/E0-PRUEF-02d.rueckgabe.md` UND als letzte Antwort, höchstens 600 Wörter (Kundschafter 1.500): GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.

=== ENDE E0-PRUEF-02d · BEREIT ZUR RÜCKGABE ===
