# UM-E0-BEWEGUNG · Bestand Bewegung, Übergänge, Scrollen, Cursor, SVG

Stand: HEAD 2fd3209b (Briefing nennt 7ceb5e41, siehe Offene Fragen). Nur statisch, keine Server, keine Browserläufe.

## GEÄNDERTE DATEIEN

- `_werkstatt/berichte/UM-E0-BEWEGUNG.md` (neu). Sonst nichts geändert.

## WAS UND WARUM

### Anforderungen aus Abschnitt 8 (35 Zeilen, Reihenfolge des Abschnitts)

| # | Anforderung | Stand | Fundstellen | Lücke |
|---|---|---|---|---|
| 1 | Dauer-/Kurvenstufen, Register mit Zweck, Auslöser, Stufen, reduziert | teilweise | globals.css:86-108; register.ts; register.json | Zweck, Stufen, reduziert nur in KERN |
| 2 | Richtwerte, Staffel 30–80 ms, höchstens acht | teilweise | globals.css:86-91, :102-108; bewegung.css:1303-1312 | B-01 über 1,6 s; Staffel bis Stufe 13 |
| 3 | Kurven-Tokens ausklingend, wechselnd, beschleunigend, linear | teilweise | globals.css:92-98 | „wechselnd“ fehlt; setzen weicht ab |
| 4 | Zentrales Modul: reduziert, Zeigerart, Schalter, gemeinsamer Takt | teilweise | lib/motion/bewegung.ts; kopfskript.ts:24; Karussell.tsx:29 | reduziert nur beim Start; kein Takt (11 rAF, setInterval Karussell.tsx:133); Schalter fehlt |
| 5 | Choreografie: eine Richtung, ein Gewichtsauftritt je Bildschirm | teilweise | Verlegen.tsx:3-6 | Dichte statisch nicht prüfbar |
| 6 | Nur Lage, Größe, Drehung, Deckkraft; FLIP; will-change kurz | teilweise | bewegung.css:436-447; kopfskript.ts (INTRO_ZIEL) | Filter bewegung.css:391; will-change :569, :632 statisch |
| 7 | Auftritte über @starting-style, view(), timeline-trigger mit IO-Rückfall | teilweise | bewegung.css:467, :475, :62, :97, :1046, :1089, :1152 | scroll() nicht belegt; timeline-trigger 0 Treffer |
| 8 | Seitenwechsel über View Transitions, React ViewTransition ab 19.3 | teilweise | Verlegen.tsx:225-260, :855-859; bewegung.css:645-675; package.json | keine @view-transition-Regel; React 19.2.4 |
| 9 | Bibliotheken nur für fehlende Choreografie | fehlt | package.json; Importe 0 | keine Bewegungsbibliothek |
| 10 | Eingang ohne Warten, Head-Skript, Klasse, 2-s-Grenze, LCP nie unsichtbar | teilweise | _dokument.tsx:117; kopfskript.ts:22-24; Intro.tsx:24 | Intro-Grenze 2200 ms (ablauf.ts:27); Intro und Startbild-Belag über LCP-Foto (Startbild.tsx:19) |
| 11 | Eingang höchstens 1,5 s, Zeilenmasken, Logo zeichnet sich, Wiederkehr kürzer | teilweise | globals.css:108 (1600 ms); bewegung.css:794-820, :1402-1404 | 1,6 s; keine Zeilenmasken; Logo zeichnet sich nicht; Intro nur einmal je Browser |
| 12 | Text in Bewegung: aria-hidden, fonts.ready | fehlt | 0 Treffer SplitText, fonts.ready | — |
| 13 | Übergangsgeste; view-transition-name je Seite; class; Arbeitsansichten schlicht | teilweise | Verlegen.tsx:899-925, :244-245; bewegung.css:649 | data-kein-verlegen nirgends gesetzt (Verlegen.tsx:907); class nur Plan-Morph |
| 14 | Tippen beendet Übergang; Navigation wartet nicht; Fokus h1; Scroll, Zurück | teilweise | automat.ts:69-74; Verlegen.tsx:369-375, :302-316, :90 | kein Tippen-Abbruch; Klicks während Belegen verworfen (Verlegen.tsx:351-354, :922-930) |
| 15 | Speculation Rules für öffentliche Seiten; sonst Abruf beim Antippen | teilweise | 0 Speculation-Rules; Verlegen.tsx:725, :851; Header.jsx:191 | keine Speculation Rules; kein Abruf beim Zeigen |
| 16 | Ohne Unterstützung oder ruhig: Überblendung oder Sofortwechsel | erfüllt | Verlegen.tsx:199-206; globals.css:105 | — |
| 17 | Natives Scrollen, keine gekaperte Bewegung | erfüllt, statisch | globals.css:188, :323 | Anker, Tastatur nicht im Browser geprüft |
| 18 | Feinsteuerung mit Lenis auf Erzählansichten | fehlt | 0 Treffer lenis | Entscheidung offen (Frage 5) |
| 19 | Sticky-Szenen, horizontale Sequenzen, Versatz höchstens 10 % | teilweise | bewegung.css:1039-1068, :1083-1135, :1152-1171 | keine Sticky-Szene, keine horizontale Sequenz |
| 20 | Tempo: keine Scroll-Effekte, passive Listener, content-visibility, scrollbar-gutter, overscroll, svh, scroll-margin | teilweise | ReadingProgress.jsx:31; TableOfContents.jsx:43; globals.css:401, :191; bewegung.css:126, :554 | Scroll-Effekt ohne passive; scrollbar-gutter 0 Treffer; overscroll nur B-01 |
| 21 | Cursor nur bei feinem Zeiger mit Hover | teilweise | bewegung.css:382, :991, :490-494 | kein eigener Cursor-Code |
| 22 | Klickpunkt ohne Verzögerung; mitlaufendes Element | fehlt | 0 Treffer cursor, mousemove | — |
| 23 | Cursor-Zustände im Register | teilweise | cursor-pointer 24 Stellen; Formatregler.tsx:53; Regler.tsx:48 | Ansehen, Abspielen, lädt fehlen |
| 24 | Magnetische Handlungen | fehlt | 0 Treffer | — |
| 25 | Ausgeblendet bei Fensterverlassen, Tastatur; Mischmodi | fehlt | 0 Treffer mix-blend | — |
| 26 | Jede Geste Rückmeldung; Abschnitte mit unterschiedlichen Auftritten | teilweise | bewegung.css:490-504, :9-14, :20-39 | nur zwei Auftrittsarten |
| 27 | Höchstens ein Dauermotiv je Erzählansicht; Pause; kein Blinken | teilweise | bewegung.css:343; Footer.jsx:56; Karussell.tsx:190, :226, :131-144 | Band ohne Sicht-Pause; kein Leitfaden; kein Video im Code (route.ts:16 nennt fehlende Datei) |
| 28 | Reduziert oder ruhig: Überblendung, kein Parallax, Autoplay; eigene Fassung | teilweise | globals.css:320-327; Karussell.tsx:29-33 | ruhige Komposition nicht statisch bewertbar; Schalter fehlt |
| 29 | Formsystem: eine Icon-Familie auf einem Raster | teilweise | sprite.svg (47 Symbole, viewBox 24); Icon.tsx | lucide-react in config/blog.js, config/company.js, useAnfrageFunnel.ts; Favicon nur Raster |
| 30 | Technik: viewBox, currentColor, vector-effect, transform-box, pathLength 1 | teilweise | 14 von 16 inline mit viewBox; vector-effect 13; transform-box 6 | RouteVisualization.tsx:44, Icon.tsx:21 ohne viewBox; pathLength 0 |
| 31 | SVGO statisch und animiert; keine Pixelbilder | fehlt | keine SVGO-Konfiguration im Projekt | public/images/logo/tezgel-logo.svg und -dark.svg mit PNG |
| 32 | Dekorativ aria-hidden; bedeutungstragend role img mit title | teilweise | Icon.tsx:23; Verlegeplan.tsx:120, :127 | Icon mit label ohne title |
| 33 | Stufe solide | teilweise | Zeilen 1–28 | Scroll-, Cursor-, Icon-Lücken |
| 34 | Stufe ausgeprägt | teilweise | Eingang und Signaturmomente vorhanden | Cursor-System, Scroll-Feinsteuerung, Schalter fehlen |
| 35 | Stufe maximal | fehlt | 0 Treffer WebGL | nicht erreicht |

Erfüllt: 2 (Zeilen 16, 17). Teilweise: 25. Fehlt: 8 (Zeilen 9, 12, 18, 22, 24, 25, 31, 35).

### Registerabgleich

- `register.json` und `register.ts`: je 28 Kennungen, identisch.
- Als data-motion-Literal im Code 23 von 28; `szene-ablauf` bedingt (SzeneAblauf.tsx:36). Keine Code-Kennung ohne Eintrag.
- Ohne data-motion-Vorkommen: `fugenband` (nur CSS bewegung.css:79-111); `verlegen`, `seitenwechsel`, `intro` steuern sich selbst.
- Register führt weder Zweck noch Stufen noch reduziertes Verhalten; dies steht nur in KERN K-007.

| Kennung | Auslöser | Stufen | Reduziert | Fundstelle |
|---|---|---|---|---|
| verlegen | Klick | 2400/1800 ms, WAAPI | Blende 150 ms | Verlegen.tsx |
| seitenwechsel | Klick | dauer-4 setzen | B-01-Blende | Verlegen.tsx:209-260 |
| intro | erster Besuch | 1600 ms, Grenze 2200 | Layer aus | bewegung.css:689-880 |
| startbild | Sicht 0,4 | dauer-4 linear | sofort frei | bewegung.css:916-945 |
| verband | Auswahl | dauer-1 weg, dauer-3 setzen | global 0,01 ms | bewegung.css:174-218 |
| leitachse | Scroll | linear | Grundschicht | bewegung.css:47-70 |
| anriss | Sicht 0,5 | dauer-4 | Strich sofort | bewegung.css:20-39 |
| auftritt | Sicht 0,2 | dauer-3 setzen | global | bewegung.css:9-14 |
| aufklappen | Klick | dauer-1 | global | bewegung.css:436-447 |
| druck | :active | dauer-1 | global | bewegung.css:490-494 |
| zustand | Hover, Fokus | dauer-1 | global | bewegung.css:498-499 |
| notiert | Erfolg | dauer-3 setzen | global | bewegung.css:503-504 |
| laden | Absenden | linear dauer-5 | global | bewegung.css:526-529 |
| sig-kreuzlinie | laden | dauer-5 linear | Linien voll | bewegung.css:1405-1436 |
| sig-flucht | laden | dauer-4, 12 px | Sofortzustand | bewegung.css:1402-1475 |
| szene-ablauf | Scroll | cover 15–50 % | Endzustand | bewegung.css:1039-1068 |
| sig-plan | Laden, Sicht grob | dauer-4 setzen | Raster Flucht | bewegung.css:987-1024 |
| einzugsband | laden | dauer-3, Staffel | Endzustand | bewegung.css:1267-1284 |
| fugenband | Scroll | CSS ohne Nutzung | — | bewegung.css:79-111 |
| schichten | Scroll | cover 15–45 % | alle sichtbar | bewegung.css:1083-1135 |
| weg | Scroll | cover 40 vh | Linie voll | bewegung.css:1152-1171 |
| gefaelle-dusche | Sicht 0,4 | dauer-5, dauer-2 | Pfeile statisch | bewegung.css:1187-1210 |
| gefaelle-balkon | Sicht 0,4 | dauer-5 linear | statisch | bewegung.css:1229-1261 |
| formatregler | Regler | direkt | gleich | Formatregler.tsx:53 |
| vorher-nachher | Regler | direkt | gleich | Regler.tsx:48 |
| karte | Sicht 0,4 | dauer-3, dauer-2, Staffel bis 13 | Endzustand | bewegung.css:1294-1316 |
| galerie-filter | Auswahl | dauer-2 setzen | sofort | bewegung.css:301-309 |
| karussell | Band endlos, Reihe 8 s | 60 s linear | kein Selbstlauf | bewegung.css:331-360; Karussell.tsx:131-144 |

### SVG und Icons

- `public/`: 3 SVG. `src/`: 48 SVG (47 Icons in `src/components/icons/svg/`, `sprite.svg`). Inline: 16 `<svg>` in 15 Dateien; `Icon` rund 297 Aufrufe über `<use href=sprite#name>`.
- Inline-IDs laufen alle über useId (RouteVisualization.tsx:41, VerbandUmschalter.tsx:68, Verlegeplan.tsx:90, Fliesenkomposition.tsx:52).
- Statischer Lauf `svg.mjs --dateien` (nur Dateimodus, Ausgabe ins Scratchpad): 51 Dateien, 14 Befunde. Pixelbild: 2 (beide Logos). Budget Illustration: 2 (~298 KB gzip). Budget Icon: sprite.svg (10.903 Byte roh). Nicht optimiert: 9.
- Icon-Familien: eigene (Raster 24, Strich 1,5). Fremd: lucide-react in 3 Dateien (nur Daten); `icons/ersatz.tsx` ungenutzt. Marken (WhatsAppLogo.tsx:8, GoogleIcon.tsx, Markenlogos.tsx) unverändert.

### Abhängigkeiten für Bewegung

- package.json und Importe: keine gsap, motion, framer-motion, lenis, three oder anime. Im Umfeld: lucide-react (Icons), react 19.2.4, next 16.3.6 ohne viewTransition-Flag (next.config.ts:27-30).

## GEMEINSAME DATEIEN

Keine geschrieben. Gelesen: bewegung.css, globals.css, register.ts, register.json, lib/motion/*, _dokument.tsx, next.config.ts.

Fremde untracked Dateien im Status (nicht meine): `_werkstatt/belege/um-e0/axe/`, `UM-E0-DESIGN.md`, `UM-E0-KONTINGENT.md`, `UM-E0-STACK.md`.

## PRÜFUNG UND ERGEBNIS

- 35 Zeilen gegen AUFTRAG.md:145-190 nachgezählt (32 Stichpunkte, 3 Stufen). Register: 28 Einträge in beiden Dateien.
- Schreibrechte: nur der Bericht. `git status` zeigt ihn als neu.

## BILDBELEGE

Keine. Nur statische Prüfung.

## OFFENE FRAGEN

1. Briefing nennt Commit 7ceb5e41, HEAD ist 2fd3209b. Geprüft gegen HEAD.
2. B-01 dauert 2400/1800 ms gegen Richtwert 1,6 s. Gilt E-043/E-047?
3. Intro 1600 ms gegen 1,5 s; Grenze 2200 ms gegen 2 s.
4. Intro und Startbild-Belag liegen beim ersten Besuch über dem LCP-Foto auf `/`. Verstoß gegen „LCP nie unsichtbar“?
5. Lenis: bewusst weggelassen oder offen?
6. Bewegungsschalter: laut ENTSCHEIDUNGEN.md:633 Pflicht, fehlt.
7. karte: Staffelstufen bis 13 gegen „höchstens acht“.
8. Arbeitsansichten ohne Opt-out: welche Seiten gelten als Arbeitsansicht?
9. Logo-SVGs mit PNG: Verwendung? Keine Fundstelle in src/.
10. Sprite-Budget gilt je Datei oder je Icon?
11. fugenband-CSS ohne Verwendung: entfernen oder bauen?
12. KOPF_SKRIPT (kopfskript.ts:56) ungenutzt.
13. Video-Sitemap nennt /videos/handwerk.mp4; Datei fehlt.
14. Teilen-Bild (OG) nicht gefunden; Metadaten nicht geprüft.
15. React 19.2.4 gegen ViewTransition ab 19.3: UM-E1.

=== ENDE UM-E0-BEWEGUNG · BEREIT ZUR RÜCKGABE ===
