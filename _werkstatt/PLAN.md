# PLAN · Werkstatt-Lauf Tezgel · Grobplan (genehmigt, E0) – Paketliste folgt in E1

## Context

Du hast den Master-Auftrag „Gestalten, Entwickeln, Aufwerten“ geschickt. Ziel ist, das Projekt in Gestaltung, Bewegung, SVG-Grafik, Bedienung und Technik sichtbar auf Spitzenniveau zu heben. Der Lauf ist autonom und dauert mehrere Tage: Opus plant, gestaltet und baut die Kernsysteme, Haiku erkundet, baut nach Muster und prüft.

**Projekt:** `umutcantezgel-cpu/tezgel`, die Website von Fliesenverlegung Tezgel (Deniz Tezgel, Aßlar).
- Technik: Next.js 16.3.6 (App Router, statisch vorgerendert), React 19, Tailwind 4.
- Nur Deutsch, kein Dunkelmodus.
- 76 Seitendateien ergeben 120 geprüfte Seiten bzw. 170 HTML-Seiten.
- Neun Anfrageformulare laufen über `POST /api/anfrage`.

**Wichtigster Befund: Es gibt schon einen Vorlauf.** Er lief am 10.10. unter dem Auftrag „Rückführung und Veredelung“, liegt in `_relaunch/` und endete bei „Richtung gewählt“ (Commit 2362a5a). Er hat hinterlassen:
- **Aufräumen:** Fremdreste entfernt.
- **Atlas:** vollständiger Atlas aller Seiten (3.600 Zeilen). Die Stichprobe heute zeigt, dass er aktuell ist.
- **Funktionstests:** Funktionsliste F-01 bis F-19 mit 292 Playwright-Fällen, grün.
- **Prüfwerkzeuge.**
- **Messbasis:**
  - Mobil wird das größte Inhaltselement nach 3,4–6,6 s sichtbar; das Budget ist 2,5 s.
  - 1.661 ernste Zugänglichkeitsbefunde.
  - Jury-Wert 4,2–4,4 von 10.
- **Gestaltungskern v1:** gewählt nach drei Stilproben, Jury und Denkprotokoll. Leitidee: *„Jede Seite ist ein Verlegeplan: ein Fugenraster, eine rote Laserachse – und alles fluchtet daran.“*

Der Sitzungs-Branch `claude/amazing-mendel-b0g40w` ist identisch mit `main`.

**Ergebnis am Ende:**
- Die ganze Website ist auf dem Arbeitsbranch im Verlegeplan-System umgesetzt, schnell und zugänglich.
- Der Bestand ist intakt.
- Mitgeliefert werden Bewegungs- und SVG-System, interaktive Grafik, Vorher-Nachher-Galerie und die Übergabe-Unterlagen.
- Nichts geht live.

Die Freigabe dieses Plans ersetzt den Halt nach E1 (FREIGABE = nein). Danach läuft der Lauf ohne Rückfragen durch.

## Einstellungen (Standardwerte; als Annahmen in STATUS.md)

- **VORHABEN, geschärft:**
  1. Die Website verlässt den generischen KI-Look (Leuchtkugeln, Verläufe, Pill-Badges, Kartenraster, Stockanmutung) und wird auf allen Seiten zum Verlegeplan-System: eigene Schrift, Raster, Fugen, ein Rot, eigene Icons, gezeichnete Pläne.
  2. Bewegung, interaktive Grafik und ein durchgehendes Leitelement, die Laserachse, erzählen Präzision. Arbeitsansichten bleiben ruhig, dicht und schnell.
  3. Texte, Adressen, Funktionen und Logo bleiben erhalten; Tempo und Zugänglichkeit werden messbar besser.
- **SCHWERPUNKT · BEREICH · AUSBAU:** alles · ganzes Projekt · maximal.
- **MARKE:** aus KERN v1 abgeleitet, als Annahme markiert.
- **GESCHMACK:** keiner.
- **UNANTASTBAR:** Standard, also Logo, Rechtstexte, Geschäftslogik (Anfrage-Route, Validierung, E-Mail, Einwilligungslogik), Verhalten der Datenmodelle und Schnittstellen nach außen. Dazu Überschriften und Fließtext nach TEXTE-Regel.
- **TEXTE:** Mikrotexte direkt, sonst als Vorschlag. Badge-Texte gelten als Mikrotext: Sie werden zum Mono-Etikett, ihr Wortlaut bleibt, und jede Änderung wird protokolliert.
- **LAUFZEIT:** bis Pflicht und Kür erledigt sind.
- **HAIKU-PLÄTZE:** 4.
- **ARBEITSBRANCH:** `claude/amazing-mendel-b0g40w`; Push nur dorthin, nach jeder Welle und mindestens stündlich.
- **GERÄTEGRÖSSEN:** 390×844 · 768×1024 · 1440×900.
- **BUDGETS** des Projekts (KERN v1 K-013):
  - mobil: LCP ≤ 2,5 s, CLS ≤ 0,1, TBT ≤ 200 ms, Lighthouse ≥ 90
  - Bewegungs-JS ≤ 60 KB gzip, Schriften ≤ 250 KB
  - Icon ≤ 1,5 KB, Illustration ≤ 40 KB gzip
- **BERICHTE:** Morgenbericht 07:00 Europe/Berlin in `_werkstatt/BERICHT.md`.

## Grundsatzentscheidungen

Die Denkprotokolle stehen ab E0/E1 in `_werkstatt/ENTSCHEIDUNGEN.md`.

- **E-001 · Vorlauf übernehmen.**
  - Richtung und KERN v1 gelten; es gibt keine neue Runde mit Varianten.
  - Atlas, Tests, Werkzeuge und Messbasis werden weiter genutzt.
  - Die fünf Kundschafter-Berichte dieser Planung werden zu `_werkstatt/berichte/E0-KUN-01…05.md`. Eine weitere Erkundung entfällt.
  - KERN v1 wird in die Gliederung K-001 bis K-012 überführt (v2) und für AUSBAU maximal erweitert.
- **E-002 · Was aus dem Vorlauf nicht mehr gilt:**
  - Push auf `main` und Live-Gang.
  - Alte Jury-Rubrik und Slop-Katalog S-xx; jetzt gelten Rubrik und Katalog des neuen Auftrags.
  - Phasen P3–P7.
  - Die offenen Vorrat-Punkte V-01 bis V-06 werden Pflicht.
- **E-003 · Arbeitsordner `_werkstatt/`.**
  - `git mv _relaunch/werkzeuge _werkstatt/werkzeuge`; die Pfade werden angepasst (fester Bezug auf `_relaunch` und auf die alte Sitzung).
  - Der Rest von `_relaunch/` bleibt Archiv.
  - Beide Ordner bleiben aus Build, Lint, tsc, Tailwind-Quellen und Vercel ausgeschlossen.
  - `node_modules` der Werkzeuge, Rohbilder und Messrohdaten liegen im Scratchpad (Symlink, gitignored).
- **E-004 · Designsystem global, mit eindeutigen Namen.**
  - KERN-Tokens kommen als `@theme static` mit eigenen Namen, zum Beispiel `kalk`, `fliese`, `fuge`, `strich`, `tinte`, `tinte-2`, `laser`, `laser-tief`, `abnahme`, `nacht-*`. Es gibt genau eine Quelle, kein `--k-*` daneben.
  - Schriftstufen `--text-fs-1…7`, jeweils mit Zeilenhöhe, Laufweite und Gewicht.
  - `@utility dauer-1…5` und `kurve-setzen|laser|weg`.
  - Die Abstandsskala gilt für margin, padding, gap, inset und translate: Tailwind-Stufen 1/2/3/4/6/8/12/16/24/32, das entspricht 4–128 px. Größen bekommen eigene erlaubte Stufen: Icons 4/5/6 (16/20/24 px), Touch-Ziel 11 (44 px).
  - `tokens.css` wird in `globals.css` als `@import … layer(alt)` unter das Theme gelegt. Damit gilt die Fehlerfarbe wieder.
  - Die Basisklassen `btn-*` und `eyebrow*` werden in E2 auf das System umgefärbt.
  - Altes wird erst bei null Nutzungen entfernt. Danach setzt `@theme` mit `--color-*: initial` die Tailwind-Standardpalette zurück, damit Reste sichtbar auffallen.
- **E-005 · Bewegung CSS-first** (aus Vorlauf-E-009, geschärft).
  - Modul `src/lib/motion/`; ein Head-Skript setzt die Startklasse.
  - Das Zeitlimit von 2 s greift nur, wenn das Modul sich nicht als bereit meldet.
  - Der Zustand liegt in `data-`Attributen außerhalb der React-Verwaltung; nach jedem Seitenwechsel werden die Elemente neu gesucht.
  - Im ersten Bildschirm gibt es nur Versatz, nie Deckkraft < 1 (wegen LCP). `@media print` hebt die Startzustände auf.
  - Animiert werden nur `transform` und `opacity`. Linien „ziehen“ sich per `scaleX/Y`, nicht per `stroke-dashoffset`.
  - Scroll-Szenen nutzen `animation-timeline`. Der Zweig `@supports not` ist identisch mit dem Zustand bei reduzierter Bewegung.
  - Die globale Regel `0.01ms !important` wird durch Register-Regeln ersetzt.
  - framer-motion fliegt nach der letzten Fundstelle raus.
- **E-006 · Eigene Icon-Familie** (aus E-010).
  - Je Icon eine SVG-Datei; ein Skript erzeugt daraus das Sprite.
  - Eingebunden per `import sprite from './sprite.svg'`: gehashte, cachebare Adresse, keine IDs im DOM.
  - Ich lege in E2 die vollständige Zuordnung aller 134 lucide-Icons fest (eigenes Icon oder „entfällt“) und zeichne die 10 Fachzeichen selbst. Haiku zeichnet nur die UI-Icons nach Muster.
  - Die Config-Dateien `company.js` und `blog.js` importieren lucide als Daten. Dort ändert sich nur die Importzeile, die Datenform bleibt gleich (Denkprotokoll). `navigation.js` wird nur gelesen.
- **E-007 · AUSBAU maximal, konkret.** Je Erzählansicht gibt es *einen* großen Moment und je Bildschirmhöhe höchstens einen Auftritt mit Gewicht.
  - **Leitelement Laserachse:**
    - Grundschicht in Fugengrau im Seitenfluss, nicht `fixed`.
    - Rot ist nur das Stück, das beim Scrollen gezogen wird (rückwärts genauso).
    - Mobil als Lot mit mindestens 8 px Abstand zum Text.
  - **Scroll-Szene „Verlegeplan entsteht“** im Ablauf (`/`, `/bad`): Aufmaß mit Prüfhaken → Fugenbild mit Passstücken → verlegt und abgenommen. Ohne Animation sind alle drei Zustände sichtbar.
  - **Interaktiv:**
    - Verband-Umschalter (Kreuzfuge, Halbverband, Drittelverband) als Radiogruppe mit `:has()`, ohne JS, auf `/fliesen`.
    - „Einzugsband“ auf `/standorte`: Fugenband mit Zonen (≤ 10 / 25 / 50 km nach `cities.ts`) plus Linkliste als Hauptform. Kein Maßband, denn das würde bei gerundeten Daten Genauigkeit vortäuschen.
    - SIG-3-Verlegepläne reagieren am Desktop auf Hover und Fokus, mobil per IntersectionObserver.
  - **Seitenwechsel** `/leistungen` → `/leistungen/[id]` mit gemeinsamem Plan (React `<ViewTransition>`):
    - nur ab `lg` und nur bei Vorwärts-Navigation
    - Fokus nach `finished` auf die h1 mit `preventScroll`
  - **3D/Shader entfallen** (Denkprotokoll): Die Marke liegt in der Zeichnung; dazu kommen Zielgruppe und Budget.
- **E-008 · WaterCursor, WhatsApp, Banner** (aus E-011 bis E-013):
  - Der WaterCursor fällt weg.
  - WhatsApp liegt mobil in der Leiste, am Desktop ist es ein flacher Knopf mit gleichbleibender `#whatsapp-floating-btn`. Das vorgetäuschte Badge entfällt.
  - Das Banner wird zum Schriftfeld; Inhalt, Knöpfe und Namen bleiben.
  - Die Physik wird entfernt.
- **E-009 · Menü vor der Hydrierung bedienbar (V-06).**
  - Popover-API (`popover`/`popovertarget`) und `role="dialog"` „Hauptnavigation“; der Schalter behält seinen Namen und `aria-expanded` (über `onToggle`).
  - Für Safari < 17 ein Rückfall-Link auf den Seitenindex im Fuß.
  - Die Oberpunkte des Mega-Menüs bleiben echte Links.
- **E-010 · Tempo an der Ursache.**
  - `AuthProvider`/`ContentProvider` ziehen zod und 13 Ratgebertexte in jedes Bündel. Sie wandern an ihren Nutzungsort (`/blog`, `/login`); die Logik bleibt unverändert (Denkprotokoll).
  - `/blog` wird eine Server-Komponente mit kleiner Filter-Insel.
  - Schriften:
    - nur Archivo-latin vorladen, Plex Mono mit `preload: false`
    - auf die genutzten Achsenbereiche und Zeichen beschneiden (fonttools, nur in den Werkzeugen)
    - `adjustFontFallback: false` und eigene Ersatzschriften mit `size-adjust`, getrennt für Text und Anzeige
    - `font-stretch: 62% 125%`
  - Karte und Kalender bekommen Platzhalter mit fester Höhe; das behebt den CLS auf `/standorte`.
  - Banner und Bilder sind nie das LCP-Element.
  - Das LCP-Element jeder Hauptansicht wird gemessen, nicht vermutet.
- **E-011 · Funnels zuerst zerlegen, dann gestalten.**
  - Ich verschiebe Code, ohne Verhalten zu ändern. Aus FliesenKonfigurator (1.375 Zeilen), BadanfrageFunnel (675), TezgelAnfrageFunnel (620) und BadProjektCheck (513) werden:
    - `logik.js` (gesperrt)
    - `stile.js`
    - `Schritt*.jsx`
    - `Zusammenfassung.jsx`
  - Nachweis: Die Funktionstests bleiben grün.
  - Danach gestalten mehrere Haiku-Pakete parallel.
- **E-012 · Modellnamen.** In Repo-Dateien stehen nur die Rollen ORCHESTRATOR und ARBEITSMODELL, keine exakten Kennungen. `AUFTRAG.md` bleibt wörtlich.

## Hauptansichten (12, ab E0 fest)

| | Ansicht | Art | vertritt |
|---|---|---|---|
| 1 | `/` | Erzählansicht · **Referenz** | Start |
| 2 | `/bad` | Erzählansicht | Bad-Familie (10) |
| 3 | `/leistungen` | Erzählansicht | Leistungen |
| 4 | `/leistungen/bad` | Erzählansicht | `[id]` + 52 Stadtseiten |
| 5 | `/standorte` | Erzählansicht | Einzugsgebiet |
| 6 | `/standorte/wetzlar` | Erzählansicht | `[stadt]` (13) |
| 7 | `/fliesen` | Erzählansicht | Fliesen-Familie (14) |
| 8 | `/ueber-uns` | Erzählansicht | Firmenseiten |
| 9 | `/kontakt` | Arbeitsansicht · **Referenz für Arbeitsansichten** | Kontakt, Termin |
| 10 | `/fliesen/konfigurator` | Arbeitsansicht | größter Ablauf |
| 11 | `/blog` | Arbeitsansicht | Ratgeber-Liste |
| 12 | `/blog/rutschfeste-fliesen-r-klassen` | Arbeitsansicht (Lesemodus) | `blog/[slug]` |

## Mengengerüst

- **Bestand:**
  - 76 Seitendateien (71 davon `.jsx`) mit 20.600 Zeilen Markup und unantastbarem Text.
  - 85 Komponenten, davon 13 verwaist.
  - 487 wirkungslose `rounded-tile-*`, 307 Beliebigwerte.
  - Zentrierter Einstiegsblock auf 67 Seiten, Abschnittskopf 116×, 245 Badges.
  - lucide in 120 Dateien.
  - 11 Fotos.
- **Bestand → Baustein, umgebaut an Ort und Stelle** (gleicher Pfad, gleiche Props; jede Datei hat genau einen Eigentümer):
  - `FinalCTA` → Abschluss
  - `QualityPromise` (53 Seiten) → Merkliste mit Fugenkreuz
  - `ReviewCarousel`/`ReviewCard` → Kundenstimme mit Anriss
  - `FAQAccordion` → FAQ
  - `TrustStrip` → Schriftfeld
  - `GoogleReviewsBadge` → Kennwert
- **Neue Bausteine:**
  - Einstieg in den Formen Erzählung und Arbeit
  - Abschnitt mit Kopf (Mono-Etikett statt Badge)
  - Feldraster (Fugen statt Karten), Kennwerte, Schrittfolge
  - Ratgeber-Liste
  - Tabelle mit Region, Name und `tabindex` (löst axe `scrollable-region-focusable`)
  - Hinweis
  - Bildfeld: Seitenverhältnis der Datei, ganze Spalten, `sizes`, `preload` nur fürs LCP
  - Knopf und Felder mit allen 8 Zuständen
- **Grafik:**
  - etwa 36 Icons (10 Fachzeichen von mir)
  - parametrischer `Verlegeplan` mit Planvorgaben als Daten für etwa 12 Themen
  - 3 Verbände, 404-Plan, Zustandsgrafiken (Laden, Notiert, Fehler)
- **Bewegung:** Register mit etwa 15 Einträgen: 12 aus v1 plus `leitachse`, `szene-ablauf`, `einzugsband`, `verband`.
- **Neue Logik mit Tests:**
  - Funktionen in `node --test` (Bewegungsmodul, Einzugszonen, Verband-Geometrie, Fokus nach Seitenwechsel); die Liste in `npm test` wird ergänzt.
  - Abläufe in Playwright.

## Pflicht und Kür

- **Pflicht:**
  - Kernsysteme, Rahmen und die 12 Hauptansichten auf Zielniveau (Z-04, Z-07, Z-08, Z-09).
  - Projektweit eine Icon-Familie und Register-Bewegung (Z-05, Z-06). Das berührt jede Seitendatei; für geänderte Dateien verlangt Z-03 nur Systemwerte. Dazu kommt der Abbau von `tokens.css`, der unumgebaute Seiten sonst umfärben würde.
  - Daraus folgt: **alle 76 Seiten mindestens auf Systemstand**.
  - Abbau der Altsysteme.
  - V-01 bis V-06, jeweils mit eigenem Abnahmetest:
    - V-01: `fixme` entfernt
    - V-02: Uhr auf Build-Tag + 1, ohne #418
    - V-04: 308
    - V-06: mit gesperrtem `_next/static` bedienbar
- **Kür**, nach Wirkung sortiert, jede Position mit Schwelle:
  1. SIG-3-Plan auf allen Leistungs- und Themenseiten: 100 % der 30 Themenseiten.
  2. Verband-Umschalter auf `/fliesen/verlegemuster`.
  3. Planvorschau im Konfigurator aus Fläche und Verschnitt.
  4. Leitachse und Ablauf-Szene auf allen Erzähl-Hubs.
  5. Seitenwechsel für die Paare `[stadt]` und `musterbaeder`.
  6. Teilen-Bilder über `next/og` für die 12 Hauptansichten.
  7. Druckansicht für Ratgeber.
  8. `forced-colors` und Lauf ohne JS auf allen Hauptansichten ohne Befund.
  9. LCP mobil ≤ 2,0 s auf allen Hauptansichten.

## Etappen und Wellen · zwei Spuren

Opus-Spur = kritischer Pfad; die Haiku-Spur füllt 4 Plätze.

Grob 165 Pakete: etwa 143 ARBEITSMODELL, 22 ORCHESTRATOR. Rechnung: 165 ÷ (4 × 5 Wellen/Tag) × 1,2 ≈ 10 Tage. Lighthouse-Ruhefenster an jedem Tor sind eingeplant.

- **E0 Start (Tag 1)**
  - **E0-ORCH-01 (ich):**
    - `_werkstatt` mit AUFTRAG.md (wörtlich), STATUS, PRUEFPUNKT, ENTSCHEIDUNGEN, MENSCHEN (übernimmt M-01 bis M-11, plus: vertrauliche Vorlauf-Befunde nicht im Klon, Bildrechte, Referenz-Platzhalter), TEXTVORSCHLAEGE, BERICHT.
    - `git mv` der Werkzeuge.
    - Ausschlüsse in tsconfig, eslint, `.vercelignore`, `@source not` und `.gitignore`.
    - CLAUDE.md-Block mit Marken `<!-- WERKSTATT:ANFANG -->` / `<!-- WERKSTATT:ENDE -->`.
    - Commit, Push.
  - **E0-PRUEF-01:**
    - `npm ci`; Reinraum-Build (Build, tsc, Lint, `npm test` 17/17, `qa:graph`).
    - Produktionsserver 4310; Dev-Server 4320 in einer Neustart-Schleife mit Gesundheitsprobe (`dev-server.sh`).
    - Werkzeuge installieren und Pfade umstellen; Playwright-Projekte auf 390×844, 768×1024 und 1440×900.
    - Schritte in STATUS.md.
    - Danach lese ich die Next-16-Doku: viewTransition, `next/font/local`, `preload`/`qualities`, `redirects`, Popover/Metadata.
  - **E0-PRUEF-02 Werkzeuglücken:**
    - `pruefe-a.sh` für alle Pakete:
      - Basis 4320, eigenes Ausgabeverzeichnis, `--workers=1`
      - `flock` mit höchstens 2 gleichzeitigen Läufen von tsc/Playwright
      - `tsBuildInfo` je Paket
      - Dev-Overlay vor dem Foto ausgeblendet
    - `einzelbild.mjs` und Bildsatz in 3 Größen nach festem Aufnahmeprotokoll: Einwilligung „abgelehnt“, reduzierte Bewegung, feste Scrollpositionen, gleich für vorher und nachher.
    - `bewegung.mjs`:
      - 5 Einzelbilder je `data-motion`
      - verworfene Bilder per CDP-Tracing bei 4× CPU während `Input.synthesizeScrollGesture`, feste DPR
      - Register-Abgleich in beide Richtungen: `getAnimations()` plus `transition-property` bei Hover, Fokus und Scrollen
      - Prüfung bei reduzierter Bewegung
    - `werte.mjs`: kompiliert die Klassen geänderter Dateien (Basis = E0-Commit) mit Tailwind und meldet Werte außerhalb von KERN sowie Klassen ohne CSS; dazu eine Ausnahmeliste.
    - `svg.mjs`: SVGO-Fixpunkt, IDs im DOM, ARIA, Budgets.
    - `ueberlappung.mjs`: Textflächen gegen feste Ebenen und Leitachse.
    - `glyphen.mjs`: alle Zeichen aus `texte-index` gegen die woff2. Betrifft ß, ≤, ㎡, ★, →.
    - Lighthouse:
      - echter Median aus 3 nach einem Aufwärmlauf
      - LCP-Element, LCP-Teilzeiten, CLS-Quellen und JS je Route
      - Benchmark-Band ±15 %
    - `texte.mjs`: Wortfolge aus `textContent` je Block, zusätzlich in 390.
    - `briefing.mjs`: füllt die festen Teile des Paket-Bauplans.
  - **E0-PRUEF-03:** Ausgangswerte nach Prüfstufe B für die 12 Hauptansichten. Lighthouse 3× mobil und 3× Desktop, Spanne notiert; Lauf ohne `animation-timeline`/View Transitions (Blink-Features in E0 verifiziert).
  - **E0-PRUEF-04:**
    - Funktionsliste als Ausgangswert.
    - Neuer F-11-Fall: Tracking erst nach Einwilligung, mit Dummy-GA4-ID.
  - **E0-DOK-01:** Vorher-Bildsatz (≤ 1.440 px, komprimiert) nach `_werkstatt/bilder/e0/`.
  - **E0-ORCH-02:** LAGEBILD.md.
- **E1 Plan (Tag 1–2)**
  - **Ich:**
    - KERN v2 mit exakten Token-Werten aus v1 und Register.
    - PLAN.md: alle Pakete mit Kennung, Ziel, Rolle, Modell, Stufe, Dateiliste, Abhängigkeiten, Kriterium; dazu Bestand → Baustein, Importgraph-Trennung der Wellen und Pflicht/Kür.
    - ABNAHME.md.
    - Denkprotokolle E-001 bis E-012.
  - **E1-PRUEF-01:** L0, höchstens 2 Runden.
  - Danach Push und sofort weiter.
- **E2 Referenz (Tag 2–4)**
  - **Opus-Spur:**
    1. Fundament: Schriften, `@theme static`, `layer(alt)`, Basisstile mit Fokus, Auswahl, `scroll-padding`, `data-scroll-behavior`, `forced-colors` und `hyphens`; Umfärben der Basisklassen.
    2. Bewegungssystem mit Leitachse und Tests.
    3. Formsystem: Sprite-Kette, 12 Muster-Icons, 10 Fachzeichen, `Verlegeplan` mit Planvorgaben, Zuordnung der 134 lucide-Icons.
    4. Fünf Referenzbausteine (Einstieg, Abschnitt, Feldraster, Knopf/Felder, Kundenstimme) und das Dev-Schaufenster. Das Schaufenster existiert nur im Dev-Server, über `pageExtensions` mit `.dev.tsx`; im Build gibt es die Route nicht.
    5. Rahmen:
       - Kopf mit Popover-Menü, Mobilmenü, Fuß mit Schriftfeld und Seitenindex, Leiste, Banner-Form, WhatsApp-Knopf
       - WaterCursor und Physik raus, Provider verlegt (E-010)
       - 404, `redirects()` (V-04)
    6. Funnels zerlegen (E-011).
    7. AST-Umbauskript: Einstieg, Badge + H2 → Abschnitt, lucide → Icon, Ratgeber-Liste; Textknoten bleiben wörtlich.
    8. `/` vollständig mit SIG-1 und Ablauf-Szene; Darstellung von HeroContactForm, PricingCalculator und TezgelAnfrageFunnel in allen Zuständen.
    9. `/kontakt` als Referenz für Arbeitsansichten.
  - **Haiku-Spur parallel**, ohne Datei-Überschneidung:
    - Seitenpässe für alle 76 Seiten (Abschnitt → Baustein, lucide → Icon, Textliste, Test-Selektoren). Sie schreiben nur in `_werkstatt/paesse/`.
    - Verwaiste Komponenten entfernen.
    - 11 weitere Bausteine nach den Referenzbausteinen.
    - 24 UI-Icons in 2 Paketen.
    - Logik-Tests.
    - Prüfstufe A meiner Pakete.
  - **Tor:**
    - Prüfstufe B auf `/` und `/kontakt`, Lighthouse eingeschlossen.
    - Sichtabnahme durch einen frischen Opus-Unteragenten, Wert ≥ 8.
    - Nach 2 Anläufen geht es weiter; die Befunde werden Pakete.
- **E3 Hauptansichten und gemeinsame Komponenten (Tag 4–6)**
  - **Erzählansichten, je Datei nacheinander:**
    - Welle 1: Haiku baut den Seitenkörper aus Bausteinen und Pass.
    - Welle 2: Ich setze großen Moment und Komposition:
      - `/bad` SIG-2
      - `/leistungen` und `/leistungen/bad` mit SIG-3 und Seitenwechsel
      - `/standorte` und `[stadt]` mit Einzugsband
      - `/fliesen` mit Verband
      - `/ueber-uns` mit Zeitleiste als Fugenband (ohne framer-motion)
  - **Haiku:**
    - Arbeitsansichten nach `/kontakt`: Konfigurator, Blog-Liste, Artikel.
    - Funnel-Teile (FK 5, BF 3, TAF 2, BPC 2); darin V-03 und V-05.
    - BookingCalendar (V-02, V-05), LeadQuickForm (V-03, V-05), Karten (V-01).
    - Bewertungen, QualityPromise, FinalCTA, Blog-Bausteine.
  - **Tor:** Prüfstufe B für alle 12 Hauptansichten; Sichtabnahme; Befunde werden Pakete.
- **E4–E6 Familien auf Systemstand (Tag 6–8)**
  - Umbauskript plus Pass, Haiku mit 1–2 Seiten je Paket:
    - `/bad` 4 Pakete, `/fliesen` 7, Untergrund 3, Balkon 2, Naturstein 2, Treppen 2
    - `[id]/[stadt]` 1, Firma 6, Arbeit 5, Recht 2 (nur Darstellung)
    - Banner 1, Restkomponenten 3
  - Je Etappe Prüfstufe B, Sichtabnahme und L7.
  - Danach **Altsystem-Abbau (ich):**
    - Aliasse und `tokens.css` raus.
    - `--color-*: initial`.
    - `npm uninstall framer-motion lucide-react @phosphor-icons/react`; `optimizePackageImports` bereinigt.
    - `docs/DESIGN_SYSTEM.md` auf KERN umgestellt.
- **E7–E9 Kür und Abschluss (Tag 8–10)**
  - Kür nach Priorität.
  - Prüfstufe C.
  - BERICHT.md mit Galerie-Seite `_werkstatt/bilder/galerie.html`.
  - Anleitung zum Zusammenführen und Zurückrollen, mit dem Hinweis, `_werkstatt` und `_relaunch` vor dem Zusammenführen zu entfernen oder bewusst zu behalten.
  - Ein frischer Opus-Endprüfer prüft jede Zeile gegen ihren Beleg; ich gebe sein Urteil wörtlich wieder.
  - Block entfernen, Routinen löschen, `ABSCHLUSS`.

**Kritischer Pfad:** Einrichtung → KERN v2 → Fundament → Bausteine → Rahmen → `/` → Tor → Hauptansichten → Familien → Abbau → Prüfstufe C → Endprüfer.

## Orchestrierung und Prüfen

- **Haiku-Pakete:**
  - Hintergrund-Agenten mit `model: haiku`, höchste Denkstufe (Fleißarbeit niedriger), höchstens 4 gleichzeitig.
  - Briefing nach Bauplan (`briefing.mjs`) in `_werkstatt/pakete/`. Jedes Briefing enthält die Liste der getesteten Selektoren und Namen.
- **Workflows** nur für Prüfketten (L0, Prüfstufe B, Blindvergleich, Endprüfung); dort laufen auf 4 Kernen 2 Agenten. Opus-Unteragenten nur für Sichtabnahme, Endprüfung und übergroße Stufe-3-Pakete.
- **Dateihoheit:**
  - Gemeinsame Dateien und **alle Testdateien** schreibe nur ich: `globals.css`, `layout.tsx`, `next.config.ts`, `package.json`, Tokens, KERN, `werkzeuge/tests`. Jede Teständerung bekommt einen Vermerk, dass der Test gleich streng bleibt.
  - Wellen werden zusätzlich nach Importgraph getrennt.
  - Haiku committet nicht, pusht nicht, baut nicht und startet keinen Server.
- **Prüfstufe A je Paket (`pruefe-a.sh`):**
  - tsc, Lint der Dateien, betroffene Funktionstests gegen 4320.
  - Bilder 390/1440.
  - Selbstprüfung mit `texte-vergleich` der eigenen Seiten.
- **Prüfung je Welle:** `reinraum.sh`-Build im Worktree durch einen Haiku-Prüfer; nennt bei Rot das verursachende Paket. Danach starte ich 4310 neu.
- **Prüfstufen B und C** genau nach Abschnitt 9, unter dem Messprotokoll unten.
- **Gedächtnis:**
  - STATUS/PRUEFPUNKT nach jeder Welle; stündlich Statuszeile mit Commit und Push („ZWISCHENSTAND“).
  - L6 in ENTSCHEIDUNGEN.
  - **Routinen** (an diese Sitzung gebunden, bei ABSCHLUSS/HALT gelöscht):
    - Morgenbericht `CRON_TZ=Europe/Berlin 47 6 * * *`.
    - „WEITER“ alle 3 Stunden als Sicherheitsnetz nach Limits.
- **Commits:**
  - `werkstatt(<Kennung>): …` mit Attributionszeilen.
  - Nur Paketdateien, `_werkstatt` und CLAUDE.md.
  - `git push -u origin claude/amazing-mendel-b0g40w`.
  - Rückfall per Revert.

## Abnahme (ABNAHME.md)

**Messprotokoll** (gilt für Ausgangswerte und alle späteren Messungen):
- lokaler Produktionsserver
- Erstbesuch mit Banner, Dritt-Hosts gesperrt
- Lighthouse-Standardprofile, Benchmark-Band ±15 %
- kein Agent und kein Build während der Messung
- Aufwärmlauf, dann Median aus 3

| Nr | Methode und Schwelle |
|---|---|
| Z-01 | 100 % der Pflichtpakete erledigt und abgenommen; jede Kür-Position erreicht ihre Schwelle. Beleg: PLAN.md mit Commit-Kennungen. |
| Z-02 | Build, tsc, Lint, `npm test` (alle grün, mindestens 17) und `qa:graph`. Dazu: F-01 bis F-19 plus neue Fälle grün (bekannte Altfehler-`fixme` dürfen nicht zunehmen, V-01 wird aufgelöst), 0 neue Konsolenfehler, Text- und SEO-Vergleich (Sitemap 163, 0 kaputte Links, nur protokollierte Mikrotexte). |
| Z-03 | `werte.mjs` über alle seit E0 geänderten Dateien: 0 Werte außerhalb von KERN, 0 Klassen ohne CSS. Ausnahmen in einer Liste: E-Mail-Vorlagen, SVG-Koordinaten, `next/og`-Stile. |
| Z-04 | Frischer Opus-Endprüfer, nur Bilder plus 5-Bild-Folgen der großen Momente. Jede Hauptansicht ≥ 8, keine Kategorie < 7. Im Blindvergleich nach gleichem Aufnahmeprotokoll wird überall der neue Stand vorgezogen. |
| Z-05 | Register-Abgleich in beide Richtungen ohne Lücke. Bei reduzierter Bewegung keine Lage- oder Größenänderung, alle Inhalte sichtbar. Große Momente bei 4× CPU mit ≤ 5 % verworfenen Bildern (CDP-Tracing beim Scrollen). |
| Z-06 | Eine Icon-Familie, lucide und Phosphor deinstalliert (Markenlogos ausgenommen). SVGO-Fixpunkt, ARIA, 0 doppelte IDs. Icon ≤ 1,5 KB, Illustration ≤ 40 KB gzip. |
| Z-07 | axe WCAG 2.2 AA auf den Hauptansichten, auch mit offenem Menü und Banner: 0 ernste oder kritische Befunde. Die fünf Hauptaufgaben gelingen nur mit Tastatur bei sichtbarem Fokus. Kontraste nach Abschnitt 6. |
| Z-08 | Mobil auf allen Hauptansichten: LCP ≤ 2,5 s, CLS ≤ 0,1, TBT ≤ 200 ms. Je Kennzahl mobil und Desktop nicht schlechter als E0 um mehr als die Spanne der drei E0-Läufe. Belegfelder: Lighthouse ≥ 90, Schriften ≤ 250 KB, Bewegungs-JS ≤ 60 KB. |
| Z-09 | Bildsatz der Hauptansichten plus Stichprobe von 10 % der übrigen (mindestens 5, nach Familien geschichtet, feste Saat) in 390/768/1440: 0 Überlauf, 0 Überlappung, kein abgeschnittener Text. Dazu Bildsatz und axe der Szenen-Ansichten ohne `animation-timeline` und View Transitions (Ersatzpfad für Safari < 26 und Firefox). |
| Z-10 | BERICHT mit Galerie, KERN, MENSCHEN und Anleitung zum Zusammenführen und Zurückrollen sind vollständig. |

**UMGEBUNGSAUSNAHMEN**, mit Ersatzprüfung und Eintrag in MENSCHEN:
- **Echte Geräte, WebKit und Firefox.** Ersatz: Chromium-Emulation mit Touch und DPR in allen Größen sowie der Ersatzpfad-Lauf.
- **Bildrate auf echter GPU.** Ersatz: Software-Rendering bei 4× CPU mit Tracing.
- **INP im Feld.** Ersatz: TBT plus gemessene Eingabeverzögerung auf den Hauptknöpfen.

## Verifikation (Ende-zu-Ende)

- **Bestand:**
  - Reinraum-Build mit allen `npm`-Prüfungen.
  - Funktionstests gegen 4310, mit Attrappe und mit echter Route im Mock-Modus.
  - Text- und SEO-Vergleich gegen E0.
  - Abnahmetests V-01 bis V-06.
- **Darstellung und Zugänglichkeit:**
  - Bildsatz 390/768/1440 mit Überlauf- und Überlappungsprüfung.
  - axe mit Zuständen.
  - Tastatur-Probelauf der fünf Hauptaufgaben, mobil und am Desktop.
  - Ersatzpfad-Lauf.
- **Bewegung:** Register in beide Richtungen, reduzierte Bewegung, 5-Bild-Folgen, Tracing bei 4× CPU.
- **Leistung:** Lighthouse nach Messprotokoll, mit LCP-Element und JS je Route.
- **Urteil:**
  - Sichtabnahmen durch frische Opus-Agenten.
  - Blindvergleich; ein Haiku-Dokumentar bereitet neutral vor, der Schlüssel liegt getrennt.
  - Belegprüfung durch den Endprüfer.

## Risiken

- **LCP-Budget:** Die Ursachen werden in E0 gemessen; E-010 setzt an der Ursache an. Lighthouse läuft schon am E2-Tor. Bleibt das Budget nach 2 belegten Anläufen unerreichbar, wird es eine AUSNAHME mit Ersatzlösung.
- **„Fremdkörper“ im Zwischenstand:** Basisklassen früh umfärben; Bausteine an Ort und Stelle umbauen. So wechseln 75 Einbindungen ohne Seitenänderung.
- **Textschutz bei 20.600 Zeilen Markup:** Das AST-Umbauskript übernimmt Textknoten wörtlich; jedes Paket prüft sich selbst mit `texte-vergleich`.
- **Bestandsschutz der Tests:** Selektorliste in jedem Briefing; Tests ändert nur der Orchestrator.
- **Container mit 4 Kernen:** `flock`-Sperre, `--workers=1`, Dev-Server mit Wächter, Builds und Messungen nacheinander.
- **Kontext über Tage:** CLAUDE.md-Block, PRUEFPUNKT, Takt aus L2 und L4, WEITER-Routine.
- **Öffentliches Repo:** Sicherheits- und Rechtsbefunde stehen nie in Dateien, nur neutral in MENSCHEN.
