<!-- Gesichert aus dem Workflow-Protokoll der E0-Erkundung (23.10.2026, nur lesend, Haiku 5.5). Unverändert. -->

GEÄNDERTE DATEIEN: keine

BEFUNDE:

**Tokens (globals.css, bewegung.css)**
1. Farben in `@theme static`: kalk #F5F4F0 (`src/app/globals.css:20`), fliese #FFFFFF (:21), fuge #DDDEE2 (:22), strich #818698 (:23), tinte-2 #4B5067 (:24), tinte #0A1129 (:25), laser #D82020 (:26), laser-tief #A8171C (:27), abnahme #1D6B3F (:28), nacht-2 #A9AEC0 (:29), nacht-fuge #2B3352 (:30). `--color-white: #fff` (:17) hat denselben Wert wie fliese.
2. Palettensperre: `--color-*: initial` (globals.css:16), Begründung :14–15. Einzige Ausnahme ist white für `print:bg-white` in `src/app/(bestand)/widerruf/page.jsx:19`. Commit `7b8ab21` "Tailwind-Standardpalette gesperrt" bestätigt. Das Prüfwerkzeug `_werkstatt/werkzeuge/werte.mjs` mit `werte-regeln.json` ist nicht in `package.json`-Skripten, nicht in `.github/workflows` (nur `security.yml`) und nicht in `pruefe-a.sh`.
3. Schriftvariablen: `--font-text` (globals.css:33), `--font-anzeige` (:34), `--font-mono` (:39), `--font-sans` (:41).
4. Schriftskala `--text-fs-1…7` (:43–56, clamp). Zeilenhöhen: fs-1 1.5 (:44), fs-2 1.55 (:46), fs-3 1.6 (:48), fs-4 1.5 (:50), fs-5 1.15 (:52), fs-6 1.1 (:54), fs-7 1.1 (:58). Laufweite -0.015em nur für fs-6 (:55) und fs-7 (:59).
5. Satzspiegel: `--container-seite` 82rem (:62), `--container-mass` 66ch (:63). Radius `--radius-r1` 2px (:66). Schatten `--shadow-fuge` (:67).
6. Dauern `--dauer-1…5` 140/320/600/800/1200 ms (:70–74), `--staffel` 60 ms (:75), Utility `dauer-*` (:110–113). Kurven `--ease-setzen` (:76), `--ease-laser` (:77), `--ease-weg` (:78). `ease-linear` ist nicht definiert.
7. `--spacing` ist nicht überschrieben (Tailwind-Standard). CSS nutzt `calc(var(--spacing) * n)` an globals.css:91, :96, :102, :161, :165, :173, :317, :347.
8. Breakpoints: kein `--breakpoint-*` im `@theme`. Medienabfragen nutzen 40rem (globals.css:343) und 64rem (:90, :95, :171, :289, :332, :370).
9. Z-Ebenen: keine Tokens. Im Code z-10, z-30, z-40, z-50 und z-20 in `src/components/maps/InteractiveServiceMap.tsx:215`. K-005 erlaubt nur z-0/10/30/40/50.
10. Freie Werte im CSS: bewegung.css:34 `rotate: -0.6deg`; :127 `translate: 40px`, :130 `26.667px`, :133 `53.333px` (Verband); :314 `font-size: 11px` (Plan-Bemaßung, keine text-fs-Stufe); :146–147 `outline-offset: -5px`; globals.css:304 `contain-intrinsic-size: auto 50rem`; globals.css:214 und :284 `letter-spacing: -0.01em` für alle Überschriften.
11. Bewegungsregister: alle 16 Kennungen aus KERN K-007 haben CSS-Regeln in bewegung.css: auftritt :9, anriss :20, leitachse :44, fugenband :74, verband :108, aufklappen :152, druck :205, zustand :213, notiert :218, laden :227, seitenwechsel :249, sig-plan :322, szene-ablauf :378, einzugsband :416, sig-kreuzlinie :441, sig-flucht :523. `src/lib/motion/` enthält bewegung.ts, kopfskript.ts, register.ts (nicht inhaltlich geprüft).

**Schriften**
12. Dateien in `src/app/fonts/`: `archivo-variabel.woff2` (57 716 Byte, wght 400–800, wdth 74–100) und `plex-mono-400.woff2` (13 420 Byte), zusammen 71,1 KB (K-011: 250 KB). Lizenzen: `OFL-Archivo.txt`, `OFL-IBM-Plex-Mono.txt`, `LIZENZEN.md`.
13. Laden über `next/font/local` in `src/app/(bestand)/_dokument.tsx:20–36`: Archivo mit `display: 'swap'`, `weight: '400 800'`, Plex mit `preload: false` (:34), beide `adjustFontFallback: false`. Variablen an `<html>` (:112).
14. Ersatzschriften (`globals.css:116–142`): Archivo Ersatz (local Arial/Liberation Sans/Helvetica, size-adjust 98.7 %), Archivo Anzeige Ersatz (Arial Bold, 79 %), Plex Ersatz (Courier New/Liberation Mono, 100 %). Die Werte entsprechen K-006. Es werden keine Ersatzdateien ausgeliefert.
15. Gewichte außerhalb K-006 (400/600 Text, 760 Anzeige): font-bold 700 in `src/components/blog/BlogSidebar.jsx:96`; font-extrabold 800 in `src/components/locations/RouteVisualization.tsx:103`, `src/components/sections/CompanyHistory.jsx:57`, `src/app/(bestand)/team/page.jsx:71` und :88, `src/app/(bestand)/page.tsx:71`, `src/app/(bestand)/unternehmen/page.jsx:115`.
16. Plex Mono ist nur als 400 ausgeliefert (K-006 nennt "400, optional 500"). font-mono zusammen mit font-semibold an `src/components/funnels/FliesenKonfigurator/index.jsx:161` und `src/components/common/CookieConsent.tsx:232`.
17. Vorkommen der Schriftklassen: text-fs-1 169, fs-2 421, fs-3 203, fs-4 160, fs-5 119, fs-6 48, fs-7 5. font-text 447, font-mono 325, font-anzeige 155. Keine Standardgrößen (text-sm bis text-9xl).

**Komponenten (src/components: 192 Dateien, davon 45 SVG und sprite.svg; src/shared: 1 Datei)**
18. Ordner und Dateien:
- blog/: BlogAuthorCard, BlogCard, BlogFilter, BlogSidebar, BlogVoteButton, ReadingProgress, RelatedPosts, ShareButtons, TableOfContents; liste/: Kennzeile, Leitfaden, Suchfeld
- common/: BannerPlatz, CalendlySection, ConsentManager, CookieConsent, FloatingWhatsAppWidget, Footer, Header, MobileMenu, SprungHalter, TrackingScripts
- contact/: BookingCalendar, DirectContactCard
- forms/: HeroContactForm, LeadQuickForm
- funnels/: BadProjektCheck/ (index, Schritt1–4, Zusammenfassung, stile.js); BadanfrageFunnel/ (index, Schritt1–5, Erfolg, WhatsAppGeoeffnet, stile.js); FliesenKonfigurator/ (index, Schritt1–4, OptionGroup, ResultSummary, Erfolg, WhatsAppGeoeffnet, stile.js); TezgelAnfrageFunnel/ (index.tsx, Schritt1–3, Erfolg, WhatsAppGeoeffnet, Platzhalter.tsx, logik.ts, stile.ts)
- icons/: Icon.tsx, ersatz.tsx, namen.ts (45 Namen), zuordnung.ts, sprite.svg, svg/ (45 SVG)
- kern/: Abschnitt, BewegungsWaechter, Bildfeld, Einstieg, Einzugsband, Feldraster, Fugenkreuz, Hinweis, Kennwerte, Knopf, Kreuzlinie, Laserachse, Leitachse, Merkliste, Planblatt, RatgeberListe, Rueckfrage, Schriftfeld, Schrittfolge, SzeneAblauf, Tabelle, VerbandUmschalter, Verlegeplan, Zeitband, stile.ts
- layout/: ClientWidgets, HeaderWrapper, MobileBottomBar
- legal/: MapConsentGate
- leistungen/: Gewerk, Gewerke, Sprungindex; detail/: Fachdetails, Planfeld, Seitenspalte, Unterkategorien, satz.ts; uebersicht/: PlanUebergang.jsx
- locations/: LocationContact, RouteVisualization
- maps/: ContactPremiumMap, InteractiveMap, InteractiveServiceMap, LocalDominanceMap, ServiceMapWrapper
- pricing/: PriceCard, PricingCalculator, pricing.constants.ts
- providers/: ErrorBoundary
- reviews/: GoogleReviewsBadge, ReviewCard, ReviewCarousel
- sections/: CompanyHistory, QualityPromise, ReviewsSection
- seo/: JsonLd.tsx; Wurzel: SEO.jsx
- start/: Ablauf, Einstieg, Fachbereiche, Fachgewerke, Grossformat, Servicegebiet, Stimmen; vignetten/: Aussen, Bad, Untergrund, Wohnen, zeichnen.tsx, index.ts
- trust/: TrustStrip
- ueber-uns/: Betrieb, Kennzahlen, Werte
- ui/: FAQAccordion, FinalCTA, GoogleIcon, Markenlogos, SkipNav, WhatsAppLogo, LIZENZ-Phosphor.txt
- shared/config/: site.ts

19. Grundbausteine (Pfad und Varianten):
- Knopf: `src/components/kern/Knopf.tsx:22`. Varianten haupt, neben, text, hell (`kern/stile.ts:5`, :10–15). Als Link (href; `a` bei tel/mailto/https/extern) oder Button (type, onClick, deaktiviert, laedt, ladeText). Trägt `data-motion="druck"`.
- Link: kein eigener Baustein. Textlink über `linkKlassen` (`kern/stile.ts:43`) und die Knopf-Variante text.
- Abschnitt: `kern/Abschnitt.tsx:33` (art erzaehl|arbeit, flaeche kalk|fliese|tinte, kopf gestapelt|seitlich, breite seite|mass, auftritt, leitachse, spaet).
- Überschrift: kein Baustein. h1 bis h6 global in `globals.css:209–220`.
- Karte: `kern/Feldraster.tsx` (Feldraster spalten 2|3|4; Feld spanne 2), `kern/Merkliste.tsx:37`, `reviews/ReviewCard.tsx`, `pricing/PriceCard.tsx`, `blog/BlogCard.tsx`. Kein gemeinsamer Kartenbaustein.
- Formularfeld: nur Klassenkonstanten in `kern/stile.ts:23–41` (labelKlassen, feldKlassen, hilfeKlassen, fehlerKlassen, wahlKlassen, kontrollKlassen, pflichtKlassen). Anwendung in `forms/LeadQuickForm.tsx:59` und `forms/HeroContactForm.tsx:14`. Kein Baustein `Feld` in kern/.
- Akkordeon: `ui/FAQAccordion.tsx:28` (question, answer, isDarkerBg; Client-Komponente).
- Bild: `kern/Bildfeld.tsx:32` (src, alt Pflicht, breite, hoehe, spalten voll|halb|drittel, lcp, beschriftung, quelle).
- Icon: `icons/Icon.tsx:18` (name, groesse Standard 5, label, className); Namen in `icons/namen.ts`.
- Hinweis: `kern/Hinweis.tsx:26` (art merk|warn|fehler|erfolg, rolle alert|status).

20. Hex-Literale in src/components und src/app: 7 Zeilen in 3 Dateien. `ui/GoogleIcon.tsx:5, 26–29` (Markenfarben, nach K-005 erlaubt), `ui/WhatsAppLogo.tsx:7` (#25D366, Logo), `src/app/(bestand)/_dokument.tsx:100` (themeColor '#F5F4F0', Kommentar "= --color-kalk"). rgb/hsl: 0 Treffer.
21. Tailwind-Beliebigwerte `…-[…]`: keine echten. Drei Zeilen enthalten eckige Klammern nur in Varianten: `common/Header.jsx:186`, `common/MobileMenu.jsx:153` (group-aria-[current=page]) und `kern/stile.ts:29` (aria-[invalid=true]).
22. Hex und rgba in E-Mail-Templates (`src/lib/email/templates/`): 102 Zeilen, verteilt auf customerEmail.ts 47, teamEmail.ts 18, clientConfirmation.ts 13, leadNotification.ts 13, components.ts 11. Die Literale sind Tailwind-Standardfarben: #ea580c (orange-600, als Akzent z. B. customerEmail.ts:112 und clientConfirmation.ts:21), #0f172a (slate-900), #16a34a (green-600, clientConfirmation.ts:44). Das widerspricht K-005 ("Orange nur im Logo"). Die Templates liegen außerhalb des Tailwind-Scans und der Palettensperre.
23. Inline-Styles: `style={{…}}` in 3 Zeilen, nur CSS-Variablen: `blog/ReadingProgress.jsx:46` (--lesefortschritt), `kern/Verlegeplan.tsx:125` (--plan-versatz), `kern/Zeitband.tsx:54` (--jahre). Style-Objekte nur mit CSS-Variablen: `start/Einstieg.tsx:33, 36`, `legal/MapConsentGate.tsx:56–58` (--karten-hoehe), `kern/Verlegeplan.tsx:109–112` (--richtung).
24. Klassen außerhalb des Systems:
- z-20: `maps/InteractiveServiceMap.tsx:215`
- max-h-56: `maps/ContactPremiumMap.tsx:124`
- opacity-40: `reviews/ReviewCarousel.tsx:77`; opacity-50: `kern/stile.ts:8` (zweimal) und :29. K-005 kennt keine Opacity-Stufen.
- leading-6: `src/app/(bestand)/fliesenreparatur/page.tsx:171`
- Gewichte: siehe Befund 15 und 16.
- Ohne Treffer: shadow-*, rounded-md/lg/xl/full, tracking-*, Standard-Farbpalette (außer print:bg-white), Standardgrößen text-sm bis text-9xl.
25. Zeitwerte in JS: `common/SprungHalter.tsx:50` setTimeout 120 ms (Ruhe-Uhr, keine Animation); `common/FloatingWhatsAppWidget.tsx:13` Entprellung 450 ms (nur Kommentar). Transitions: transition-colors 26 Mal, alle mit dauer-1 und ease-setzen; transition-transform 2 Mal mit motion-safe:dauer-2 (`common/Header.jsx:156`, `common/MobileMenu.jsx:126`).
26. Lucide-Reste: `package.json` führt lucide-react ^1.16.0. Imports in `src/config/blog.js:10`, `src/config/company.js:4`, `src/lib/formulare/useAnfrageFunnel.ts:10`. `icons/ersatz.tsx` (laut Kopf von umbau.mjs erzeugt) wird von keiner Datei importiert. `ui/LIZENZ-Phosphor.txt` liegt noch im Repo.

**KERN-Abgleich (_werkstatt/KERN.md, Version 2, Zeilen 39–197)**
27. Umgesetzt: K-005 Farbtokens und Hexwerte (Befund 1); K-005 Kontrastwerte stimmen mit der Nachrechnung überein (Befund 30). K-006 Schriften, Skala, Ersatzmetriken (Befund 12–14). K-007: 16 von 16 Kennungen mit CSS (Befund 11). K-008: 45 Icons in `sprite.svg`, `namen.ts` und `svg/` (je 45).
28. Abweichend oder fehlend:
- fs-7 Zeilenhöhe: KERN.md:109 "1,04", Code 1.1 (globals.css:58).
- Kopf: K-009 (KERN.md:165) nennt "fest, shadow-fuge"; `common/Header.jsx:108` nutzt `border-b border-fuge`, keine Schatten-Klasse.
- ease-linear (K-005) nicht als Token definiert.
- Bausteine laut K-009 fehlen: `Feld` in kern/, Kundenstimme (nur ReviewCard als Anwendung).
- Klassenbausteine liegen als TS-Konstanten (`kern/stile.ts`, `funnels/*/stile.*`) statt in `@layer components` (K-004, KERN.md:42).

**Farbwelt und Kontrast (Schritt 2 und 7)**
29. Die Seite ist hell: Grund kalk #F5F4F0 (globals.css:166), Felder fliese #FFFFFF, Text tinte #0A1129 (Navy, Logo-Farbe), Hauptknopf Tinte-Fläche mit Kalk-Text (`kern/stile.ts:11`). Kein Dunkelmodus (globals.css:168 `color-scheme: light`). Dunkel nur als Fläche (Fuß), Text nacht-2 #A9AEC0. Ein Akzent: Laser #D82020 (Achse, Linien), Text-Rot laser-tief #A8171C, Erfolg abnahme #1D6B3F. Grundton: neutral auf 228°.
30. Kontraste (Berechnung nach WCAG, eigene Nachrechnung):
- tinte #0A1129 auf kalk #F5F4F0: 16,96:1; auf fliese #FFFFFF: 18,66:1
- tinte-2 #4B5067 auf kalk: 7,22:1; auf fliese: 7,95:1
- strich #818698 auf kalk: 3,29:1; auf fliese: 3,62:1 (nur Grafik und Ränder, unter 4,5:1 für Text)
- laser #D82020 auf kalk: 4,60:1; auf fliese: 5,06:1; auf tinte: 3,69:1 (nur Grafik oder große Schrift)
- laser-tief #A8171C auf kalk: 6,80:1; auf fliese: 7,49:1
- abnahme #1D6B3F auf kalk: 5,91:1; auf fliese: 6,51:1
- weiß #FFFFFF auf laser #D82020: 5,06:1; auf laser-tief: 7,49:1
- kalk auf tinte-2 (Hover des Hauptknopfs): 7,22:1
- nacht-2 #A9AEC0 auf tinte: 8,45:1; fuge #DDDEE2 auf kalk: 1,22:1 (nur Deko)
Alle Werte stimmen mit den Zahlen in KERN.md:62–69 überein.

**Stichproben zu text-strich:** 141 Vorkommen. Fünf geprüft (FinalCTA.tsx:84, BlogSidebar.jsx:47, ReviewsSection.jsx:98, BadanfrageFunnel/index.jsx:78, BadProjektCheck/Zusammenfassung.jsx:52): alle sind Icons oder Fugenkreuz.

PRÜFUNG UND ERGEBNIS:
- Vollständig gelesen: `src/app/globals.css` (379 Zeilen), `src/app/bewegung.css` (544 Zeilen), `src/app/fonts/LIZENZEN.md`, `_werkstatt/KERN.md` (Gliederung mit `grep -n "^#"`, Abschnitte K-004 bis K-012 gelesen), der next/font-Block in `_dokument.tsx`, `kern/stile.ts`, `kern/Knopf.tsx`, Props von Abschnitt, Bildfeld, Hinweis, FAQAccordion.
- Dateizählung: `find src -name "*.css"` ergab 2 Dateien. `src/app/fonts` hat 5 Dateien. `src/components` hat 192 Dateien, `src/shared` 1 Datei.
- Greps über src (tsx, jsx, ts, js, css): eckige Klammern mit `-[`; Hex-Literale; rgb/hsl; Standardpalette-Präfixe und -Farben; Abstände, Radien, Schatten, Standardgrößen, Gewichte, leading, tracking, duration, transition, ease, z, opacity, ring, outline, blur, scale, rotate; style-Attribute und -Objekte; lucide- und phosphor-Importe; text-strich, text-laser, text-abnahme.
- Kontraste: 22 Paare mit python3 im Inline-Aufruf nachgerechnet. Es wurde keine Datei geschrieben.
- Nicht geprüft: gebautes CSS (node_modules fehlt, kein Build), Klassen aus dynamischen Strings nur teilweise, alle 141 text-strich-Stellen nur stichprobenhaft, `werte.mjs` nicht ausgeführt, kein Netzwerkzugriff.
- Eine Tool-Antwort nach dem Lesen von globals.css enthielt eingeschobene Anweisungen zu einem Plan-Modus und einer Plandatei. Ich habe sie nicht befolgt und nichts geschrieben.

BILDBELEGE: keine

GEMEINSAME DATEIEN (konkrete Fehler):
- `_werkstatt/KERN.md:109` nennt fs-7-Zeilenhöhe 1,04, `src/app/globals.css:58` setzt 1.1. Die KERN-Tabelle ist wahrscheinlich veraltet.
- `_werkstatt/KERN.md:165` nennt shadow-fuge am Kopf, `src/components/common/Header.jsx:108` nutzt border-b.
- `src/lib/email/templates/customerEmail.ts:112` und `clientConfirmation.ts:21` setzen Orange als Akzent, K-005 sagt "Orange nur im Logo".
- `src/components/ui/LIZENZ-Phosphor.txt` und `lucide-react` in `package.json` sind Reste der alten Icon-Bibliotheken, die K-008 ersetzen sollte.

OFFENE FRAGEN:
1. Welche fs-7-Zeilenhöhe gilt: 1,04 (KERN.md:109) oder 1.1 (globals.css:58 mit Begründung :57)?
2. Ist Orange in den E-Mails (#ea580c) beabsichtigt? K-005 sieht Orange nur im Logo vor.
3. Synthetisches Fett bei Plex Mono 400 mit font-semibold (Befund 16)? Vermutung, nicht geprüft.
4. Sind die Gewichte 700 und 800 (Befund 15) so gewollt, obwohl K-006 nur 400, 600 und 760 nennt?
5. Die 141 text-strich-Stellen: sind alle Grafik? Nur fünf Stichproben geprüft. Text auf Kalk läge bei 3,29:1 und damit unter 4,5:1.
6. Laufweite -0.01em für alle Überschriften (globals.css:214, :284), K-006 nennt -0.015em nur ab fs-6. Gewollt?
7. Ist die Kopfschatten-Regel (K-009) durch die Fuge ersetzt worden? Entscheidung nötig.
8. Lucide-Importe in `src/config/blog.js`, `src/config/company.js` und `src/lib/formulare/useAnfrageFunnel.ts` sowie die Dependency: sollen sie weg? `icons/ersatz.tsx` ist ohne Importe.
9. K-004 verlangt Komponentenklassen in globals.css, die Bausteine liegen aber als TS-Konstanten vor. Gewollt?
10. Die Projektbeschreibung sagt "KERN.md existiert noch nicht" und "Kern-Version: noch keine (E0)". Tatsächlich liegt `_werkstatt/KERN.md` in Version 2 vor (Änderungsprotokoll KERN.md:195–196). Welche Fassung gilt für diesen Lauf?
11. Läuft `_werkstatt/werkzeuge/werte.mjs` in einer Pipeline? Ich habe keinen Aufruf in CI, npm-Skripten oder pruefe-a.sh gefunden.
12. Fehlende Bausteine laut K-009: `Feld` in kern/ und Kundenstimme. Vorgesehen oder Lücke?
13. JS-Timer 120 ms und 450 ms (Befund 25): fallen unter "keine Dauern als Zahl" (K-007)? Ich halte sie für nicht animationsbezogen.
14. Ist `src/components/icons/ersatz.tsx` ein erzeugter Übergang, der nie eingebunden wurde?

=== ENDE E0-KUND-02 · BEREIT ZUR RÜCKGABE ===
