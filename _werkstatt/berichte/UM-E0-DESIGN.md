# UM-E0-DESIGN · Designsystem-Bestand (statisch)

Kennung UM-E0-KUND-DESIGN · Stand: Arbeitsbaum bei HEAD 2fd3209b (Briefing nennt 7ceb5e41, nicht gegengeprüft) · nur Lesen.

## GEÄNDERTE DATEIEN

Nur neu: `_werkstatt/berichte/UM-E0-DESIGN.md`.

## WAS UND WARUM

### Regeln aus Abschnitt 7 (AUFTRAG.md:122–143)

| Regel | Stand | Fundstellen | Lücke |
|---|---|---|---|
| Signatur-Momente (Übergang, Intro, Motive) | vorhanden: B-01, B-02, Planmotive | src/components/verlegen/Verlegen.tsx, src/components/intro/Intro.tsx | keine |
| Erzählansichten inszenieren, Arbeitsansichten ohne Signatur | B-01 greift auf jedem internen Link, keine Ausnahme für Rechtstexte oder Suche | src/lib/verlegen/linkfilter.ts:41–61 | Konflikt (OFFENE FRAGE 5) |
| Abstandsstufen höchstens 12 | Regeldatei: 12 Stufen; Tailwind-Standard `--spacing` 0.25rem nicht gesperrt (node_modules/tailwindcss/theme.css:325) | globals.css (keine Abstandstokens), werte-regeln.json | Standard aktiv |
| Schriftgrößen höchstens 10 | 7 Stufen | src/app/globals.css:49–66 | Standardgrößen nicht gesperrt (0 Verwendungen) |
| Dauern höchstens 6 | 5 Stufen, dazu 6 Sonderwerte = 11 | globals.css:86–107 | Überschreitung (OFFENE FRAGE 2) |
| Radien höchstens 4, Schatten höchstens 4 | Radien 2 (none, r1); Schatten 3 (fuge, gesetzt, flug) | globals.css:79–83 | Standardwerte nicht gesperrt |
| Kurven höchstens 4 | 5: setzen, laser, weg, hammer, aufsetzen | globals.css:92–98 | Überschreitung um 1 (OFFENE FRAGE 3) |
| Farben als OKLCH-Palette mit Abstufung | nicht erfüllt: 11 Tokens plus white, alle Hex, keine Stufen | globals.css:20–36 | hoch |
| Bedeutungs-Tokens verweisen auf Skalenstufen | nicht erfüllt: laser-tief (Fehler), abnahme (Erfolg) sind eigene Hex-Werte | globals.css:33–34 | keine Skala |
| Kontrast 4,5:1 Text, 3:1 Bedienelemente und Grafik | Kernpaare erfüllt (Tabelle unten); Rand `border-fuge` auf Feld 1,34:1 | src/components/kern/Karussell.tsx:37 | ja |
| Jedes Thema mitgestaltet (Dunkelmodus) | nur helles Thema, `color-scheme: light` fest | globals.css:198 | OFFENE FRAGE 4 |
| Schriften: zwei Familien plus Mono, offene Lizenz, woff2, Teilmengen, höchstens zwei Schnitte vorgeladen, Ersatzschrift mit Metrik | erfüllt: Archivo variabel und IBM Plex Mono 400 (OFL), latin-Teilmengen, 1 Schnitt vorgeladen, drei Ersatzschriften mit size-adjust und Override | src/app/fonts/LIZENZEN.md, src/app/(bestand)/_dokument.tsx:24–41, globals.css:145–172 | keine |
| Fließende Größen per clamp; Display bis etwa 20 vw | erfüllt: fs-7 mit 1rem + 5,4 vw, Obergrenze 92 px | globals.css:49–66 | keine |
| Zeilenhöhe Display 0,9–1,1, Fließtext 1,5–1,7; Zeilenlänge 60–75; Versalien gesperrt | erfüllt; `max-w-mass` 66ch (276×); Fremdwerte `leading-6` (src/components/kern/Rufnummer.tsx), `leading-snug` (src/app/(bestand)/fliesenreparatur/page.tsx) | globals.css:50–73 | Fremdwerte |
| text-wrap balance Überschrift, pretty Absatz | erfüllt: 11 bzw. 27 Verwendungen | globals.css:268, 283 | keine |
| Silbentrennung, lang="de" | erfüllt; vier Dateien ändern die Trennregel (10/4/4, 11/4/4, 12/4/4): src/components/pricing/PricingCalculator.tsx, PriceCard.tsx:111, src/components/funnels/FliesenKonfigurator/OptionGroup.jsx:49, src/app/(bestand)/preise/page.jsx:250 | _dokument.tsx:114; globals.css:218, 284–288 | Abweichung |
| „…“ und Gedankenstrich | „…“ in 48 Zeilen von src/inhalte; kein Gedankenstrich mit Leerzeichen | src/inhalte | gerade Anführungszeichen nur teilweise prüfbar |
| Geschütztes Leerzeichen vor Einheiten | nicht erfüllt: 101 Treffer „Zahl Leerzeichen Einheit“, 0 geschützt | src/inhalte, src/config | hoch |
| Fokus: focus-visible, 2 px, 3:1, nicht verdeckt | erfüllt global: 2 px Tinte, 16,98:1 auf Kalk; scroll-padding oben und unten; `outline-none` an VerbandUmschalter.tsx:106 und VerbandProbe.tsx:88 mit Ersatz nur über `:has()` (bewegung.css:151–154) | globals.css:191, 195, 305–319 | Teil |
| Ladeanzeige erst nach 300 ms, dann mindestens 500 ms | nicht erfüllt: keine Verzögerung oder Mindestzeit | src/components/kern/Knopf.tsx:53–58, LeadQuickForm.tsx:322–326 | ja (OFFENE FRAGE 8) |
| Touch-Ziele 44 × 44, nie unter 24 × 24 | Knopf, Feld, Auswahl `min-h-11`; Kontrollkästchen `size-5` = 20 px | stile.ts:10, 34, 42, 44 | Kästchen (OFFENE FRAGE 6) |
| Zustände bei jedem interaktiven Element; leere Zustände; Fehlerseite | Lücken in 6 von 13 Stichprobenbausteinen; Fehlerseite vorhanden (src/app/(bestand)/not-found.tsx) | siehe Zustände | ja; leere Zustände nicht gesucht (OFFENE FRAGE 9) |
| Keine Information nur über Hover oder Farbe; Formulare mit Beschriftung und autocomplete; Sprunglink | erfüllt in der Stichprobe | stile.ts:26, 38; LeadQuickForm.tsx; SkipNav.tsx:7 | keine |
| Nicht statisch prüfbar: Leitidee, erster Bildschirm, Zeilenmasken, Bildbehandlung, Raster | – | – | Browser- und Bildsatzprüfung |

### Skalen (Stufenlisten)

- **Abstand**: `0`, `px` (1 px), `1`=4, `2`=8, `3`=12, `4`=16, `6`=24, `8`=32, `12`=48, `16`=64, `24`=96, `32`=128 px. Genutzt: 0–4, 6, 8, 12, 16, 24, 32; keine Befunde.
- **Schrift**: fs-1 13–14 px · fs-2 15–16 · fs-3 17–19 · fs-4 20–24 · fs-5 24–36 · fs-6 32–56 · fs-7 32–92. Verwendungen: fs-2 405, fs-3 230, fs-4 159, fs-1 146, fs-5 121, fs-6 44, fs-7 4.
- **Dauer**: dauer-1 140 ms · dauer-2 320 · dauer-3 600 · dauer-4 800 · dauer-5 1200. Sonder: `--staffel` 60, `--verlegen-gesamt` 2400, `--verlegen-gesamt-folge` 1800, `--verlegen-ruhig` 150, `--intro-gesamt` 1600, `--band-durchlauf` 60 s.
- **Radius**: none, r1 (2 px). **Schatten**: fuge (0 1px 0 #DDDEE2), gesetzt, flug.
- **Kurven**: setzen, laser, weg, hammer, aufsetzen. `ease-linear` ist kein Token.
- **Ebenen (z)**: Nutzung z-10 (22×), z-20 (1× in src/components/maps/InteractiveServiceMap.tsx:215, außerhalb K-005), z-30 (2×), z-40 (3×), z-50 (4×).

### Farben

Format hex (sRGB), nicht OKLCH. Palette: kalk #F4F4F5, fliese #FFFFFF, fuge #DDDEE2, strich #818698, tinte-2 #43485F, tinte #0A1129, laser #D82020, laser-tief #A8171C, abnahme #1D6B3F, nacht-2 #A9AEC0, nacht-fuge #2B3352, white, fliese-glanz (color-mix). Keine Abstufung.

Kontraste (WCAG, selbst gerechnet mit Node):

| Paar | Verhältnis |
|---|---|
| tinte auf kalk / fliese | 16,98 / 18,66 |
| tinte-2 auf kalk / fliese | 8,20 / 9,01 (K-005: 8,19 / 9,01) |
| laser auf kalk / fliese | 4,61 / 5,06 (K-005: 4,61) |
| laser-tief auf kalk / fliese | 6,81 / 7,49 (K-005: 6,80) |
| abnahme auf kalk / fliese | 5,92 / 6,51 |
| strich auf kalk / fliese | 3,30 / 3,62 |
| fuge auf kalk / fliese | 1,22 / 1,34 (nur Deko) |
| kalk auf tinte; kalk auf tinte-2 (Hauptknopf-Hover) | 16,98; 8,20 |
| nacht-2 auf tinte | 8,45 |
| laser auf tinte | 3,69 (Grafik und Fokus ja, Text nein) |

### Themen

Nur helles Thema. `color-scheme: light` (globals.css:198); keine `prefers-color-scheme`- oder `prefers-contrast`-Regel. `forced-colors`: globals.css:315–319, bewegung.css (19 Zeilen), Karussell.tsx:21, RouteVisualization.tsx:44. E-Mail-Vorlagen tragen `light dark` (src/lib/email/templates/customerEmail.ts:309), ausgenommen.

### Schriften

- Archivo variabel 57.716 Byte, IBM Plex Mono 400 13.420 Byte, zusammen 71.136 Byte.
- Vorgeladen: Archivo, Plex nicht (`preload: false`, _dokument.tsx:37–41). `display: swap` beide.
- Ersatzschriften: Archivo 98,7 % / 88,9 % / 21,3 %; Anzeige 79 % / 111,2 % / 26,6 %; Plex 100 % / 102,5 % / 27,5 %.
- `font-mono` 269×; K-006 erlaubt Mono nur für Telefon, Maße, Zahlen (OFFENE FRAGE 7).
- Satz: `text-wrap` gesetzt; `hyphens: auto` und `lang="de"` gesetzt.

### Freie Werte

werte.mjs (`--dateien` mit allen 409 Dateien, `--ziel` im Scratch-Ordner): 13.614 Klassenvorkommen, 645 eindeutig, 16 Befunde (15 beliebig, 1 dauer_zahl), 23 Stilwerte nicht prüfbar, 0 Lesefehler. Der dauer_zahl-Befund (`STAFFEL_MAX: 7`, galerie-filter/daten.ts:76) ist eine Anzahl, also Fehlalarm.

Befunde je Datei (Zeilen): PricingCalculator.tsx 9 (159, 161, 186, 241, 242, 323, 337, 474, 484), preise/page.jsx 1 (250), PriceCard.tsx 1 (111), OptionGroup.jsx 1 (49), Funnel/Schritt1.jsx 1 (57, `align-[-0.2em]`), Schritt2.jsx 1 (100), vorlagen/teile/Lage.tsx 1 (27, `h-[1lh]`).

Außerhalb des Werkzeugs (Grep): Verlegen.tsx:508, 582, 676 (`ease-in`/`ease-out` als Fallback); Intro.tsx:36 (`zIndex` inline); acht `style={{}}` in sieben Dateien (Custom Properties); src/lib/wege.ts:56–63 (eigenes Stylesheet der 410-Seite, 1,0625rem, 0,04em); bewegung.css ohne Farb-, Zeit- und Bezier-Literale, aber 67 px-Werte und lokale Variablen (Zeilen 121, 247, 701–725, 898–899). Ausgenommen per Regeldatei: src/lib/email/**, GoogleIcon, WhatsAppLogo.

### Zustände (Stichprobe 13)

| Baustein | Vorhanden | Lücke | Fundstelle |
|---|---|---|---|
| Knopf | Ruhe, Hover, Fokus, gedrückt (1 px), deaktiviert (50 %), lädt (aria-busy, „Wird gesendet …“) | Ladeschwelle fehlt | kern/Knopf.tsx:53–58, stile.ts:9–17 |
| Hauptknopf | erbt Knopf | – | kern/Hauptknopf.tsx:31 |
| Textlink | Ruhe, Hover, Fokus | – | stile.ts:49 |
| Eingabefeld | Ruhe, Hover, Fokus, Fehler (role=alert), deaktiviert | – | stile.ts:33–38 |
| Auswahlknopf | Ruhe, Hover, aria-pressed/-checked, Fokus | deaktiviert | stile.ts:41–42 |
| Kontrollkästchen | Ruhe, Fokus | Hover, deaktiviert, 20 px | stile.ts:44 |
| Absendeformular | Hover, Fokus, lädt, Fehler, Erfolg | – | forms/LeadQuickForm.tsx:50–51, 301–326 |
| Karussell-Pause | Ruhe, Hover, Fokus | gedrückt, deaktiviert | kern/Karussell.tsx:36–50 |
| FAQ-Akkordeon | Ruhe, Hover, aria-expanded, Fokus | – | ui/FAQAccordion.tsx:43 |
| Verband-Umschalter | Ruhe, Auswahl, Fokus nur über `:has()` | Hover, deaktiviert | kern/VerbandUmschalter.tsx:98–106 |
| Menüpunkte | Ruhe, aria-current, aria-expanded | Hover an Links | common/MobileMenu.jsx:87, 109, 146 |
| Untere Leiste | Hover | Fokus und gedrückt nur allgemein | layout/MobileBottomBar.tsx:41, 60, 72 |
| Glasbild | Hover, Fokus | Umriss auf Foto ungemessen | kern/Glasbild.tsx:52–53 |

Fokusstil: 2 px Tinte, Versatz 2 px (globals.css:305–308); auf Tinte Kalk (:310–313, Footer.jsx:62); Sprunglink Laser (SkipNav.tsx:7); erzwungene Farben Highlight (:315–319).

## GEMEINSAME DATEIEN

Keine geändert. Gelesen: globals.css, bewegung.css, werte-regeln.json.

## PRÜFUNG UND ERGEBNIS

- Werte-Lauf: 16 Befunde, davon 1 Fehlalarm. Zählungen nachgerechnet, Kontraste eigenständig gerechnet, K-005-Angaben bestätigt.
- Schreibrechte eingehalten; keine Server, Browser oder Messläufe.
- `git status`: außer dieser Datei untracked `_werkstatt/belege/um-e0/axe/`, `UM-E0-KONTINGENT.md`, `UM-E0-STACK.md` (fremd).

## BILDBELEGE

Keine (statisch).

## OFFENE FRAGEN

1. Briefing nennt 7ceb5e41; geprüft: 2fd3209b.
2. Zählen die Sonderdauern zu den sechs Dauerstufen? Sonst 11.
3. Kurven 5 bei Limit 4: welche entfällt?
4. Ist ein Dunkelmodus gewollt?
5. B-01 auf Rechtstexten und Arbeitsansichten: Abschnitt 7 sagt nein, K-007 sagt „global“.
6. Kontrollkästchen 20 px: ist das Feld allein Ziel?
7. Mono (269×) gegen K-006.
8. Ladeschwelle 300/500 ms: Vorlauf-Lücke?
9. Leere Zustände: nicht vollständig gesucht.
10. werte-regeln.json ist veraltet (aufsetzen, Schatten, z-Ebenen, Standardsperre); Pflege beim Orchestrator.
11. Fließtext in fs-2 (15 px mobil, 405×) gegen K-006 (mobil nie unter 16 px): einzeln prüfen.

=== ENDE UM-E0-KUND-DESIGN · BEREIT ZUR RÜCKGABE ===
