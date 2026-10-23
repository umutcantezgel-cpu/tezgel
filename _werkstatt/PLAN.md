# PLAN · Lauf „Verständlich, echt, ausgezeichnet“ · Fassung 1

Stand 23.10.2026, E1. Erweitert Fassung 0 (freigegebener Plan, unten im Anhang wörtlich). Gegen KERN v3.0. Jedes Paket: Kennung, Gegenstand, Rolle, Modell, Stufe, Schreibrechte, Abhängigkeit, Kriterium, Welle, Status (mit Commit, sobald abgenommen). Briefings entstehen je Welle in `_werkstatt/pakete/<Kennung>.md` nach dem 11-teiligen Paket-Bauplan.

## Mengengerüst
- Seiten nach Art (170 Adressen): Erzählseiten 24 Dateien · Wissensseiten 33 Dateien plus 13 Artikel und 12 Musterbäder · Ortsseiten 1 Vorlage (13 Orte) und 1 Vorlage (52 Leistung × Ort) und `/standorte` · Arbeitsseiten 11 · Rechtstexte 6 (nur Gestaltung) · 404.
- Texte: 11 Hauptansichten und 53 übrige Seitendateien als Texter- und Lektorpakete, 13 Artikel, Datentexte für 13 Orte, 4 Leistungen, 52 Leistung × Ort, 12 Musterbäder; 4 Referenztexte (erledigt).
- Bilder: 84 Originale, rund 60 Webfassungen nach `bildplaetze.md`, OG-Bild; Fliesenkompositionen für Plätze ohne Foto.
- Komponenten: 6 Bausteine (E2-ORCH-02), 4 Vorlagen (E3-ORCH-01), Kopf, Fuß, Menü, untere Leiste, 404, B-01, B-02, 9 große Momente.
- Bewegungen: B-01, B-02, `startbild` und 9 große Momente; 7 Einträge aus v2 entfallen (E-009).
- Weiterleitungen: neu nur aus E5-BAU-01 (Referenzseiten ohne passende Fotos); keine Adresse entfällt.

## Etappen, Wellen, kritischer Pfad
- E0 (Tag 1): Werkzeuge → Ausgangswerte Stufe B und Probeläufe → LAGEBILD.
- E1 (Tag 1 bis 2): KERN v3 (erledigt), Baumtest (erledigt), PLAN und ABNAHME (dieses Dokument), Planprüfung.
- E2 (Tag 2 bis 4) Referenz: W1 Designsystem, Bausteine, Bewertungen, Bildwerkzeug, Logo-Nachzeichnung, LCP-Ursache · W2 Kopf und Navigation, B-01 mit Tests · W3 B-02, Startseite, 404 · Tor (Stufe B, Probeläufe P1 und P5, Sichtabnahme ≥ 8, höchstens 2 Anläufe).
- E3 (Tag 4 bis 6): W1 Vorlagen, große Momente, Texte der Hauptansichten · W2 Lektorat, Datentexte · W3 Seitenbau · Tor.
- E4 (Tag 6 bis 9): drei Wellen zu je etwa 18 Seiten im Fluss Text → Lektorat → Bau (je Seite als Kette ohne Sperre zwischen den Seiten), Datenvorlagen, 13 Artikel, Rechtstexte · Tor.
- E5 (Tag 8 bis 10, teils parallel zu E4): restliche Bilder, Generatorbilder raus, Referenzseiten, Weiterleitungen und Sitemap, Abbau entfallender Bewegung · Tor.
- Kür (nach Wirkung), dann Abschluss.
- **Kritischer Pfad:** E0-PRUEF-03 → E2-PRUEF-00/E2-ORCH-00 (LCP) → E2-ORCH-04 (B-01) → E2-ORCH-05 (B-02) → E2-ORCH-06 (Startseite) → E2-Tor → E3-ORCH-01 (Vorlagen) → E3-BAU → E4 → AB.

## Modellanteil und Kapazität
- Pakete gesamt: 299 (davon E0 und E1 14 Zeilen, E2 18, E3 48, E4 202, E5 6, Abschluss 3, Kür 8).
- Haiku 276, Opus 23 (≈ 92 % Haiku).
- Kapazität: Tage = Pakete ÷ (HAIKU-PLÄTZE × Wellen pro Tag) × 1,2 = 299 ÷ (5 × 10) × 1,2 ≈ 7.2 Tage. Engpass ist der Container (4 Kerne, Workflows mit höchstens 2 gleichzeitigen Agenten, E-005); rechenleichte Text- und Lektorpakete laufen in zwei Workflows parallel.

## Pflicht
Alle Pakete unten außer `KUER-*` sind Pflicht, nach Wirkung sortiert innerhalb jeder Etappe (Rahmen und Startseite vor Hauptansichten vor übrigen Seiten).

### E0 und E1
| Kennung | Gegenstand | Rolle | Modell | Status |
|---|---|---|---|---|
| E0-ORCH-01 | Werkstatt einrichten | Orchestrator | Opus | erledigt df3c241 |
| E0-KUND-01…09 | Erkundung | Kundschafter | Haiku | erledigt |
| E0-PRUEF-BILD-01 | Bildtechnik | Prüfer | Haiku | erledigt |
| E0-BILD-01…05 | Bildsichtung | Bildsichter | Haiku | erledigt |
| E0-GUT-01/02 | Technikgutachten B-01, B-02 | Gutachter | Opus | erledigt |
| E0-PRUEF-01 | Einrichtung | Prüfer | Haiku | erledigt (Rückgabe im Journal) |
| E0-PRUEF-02a…d, -02-PA | Werkzeuge | Prüfer | Haiku | läuft |
| E0-PRUEF-03 | Ausgangswerte Stufe B | Prüfer | Haiku | offen |
| E0-PROBE-01…10 | Probeläufe alter Stand | Probeläufer | Haiku | offen |
| E0-ORCH-02 | LAGEBILD, Faktenblatt | Orchestrator | Opus | offen |
| E1-ORCH-01 | KERN v3, Denkprotokolle, Referenztexte, Bildplätze, MENSCHEN | Orchestrator | Opus | erledigt daf0f30, 394b300 |
| E1-PROBE-IA | Baumtest Navigation | Probeläufer | Haiku | erledigt 394b300 |
| E1-ORCH-02 | PLAN.md, ABNAHME.md | Orchestrator | Opus | läuft |
| E1-PRUEF-PLAN | Planprüfung (≤ 2 Runden) | Prüfer | Haiku | offen |

### E2 · Referenz
| Kennung | Gegenstand | Rolle | Modell | Stufe | Schreibrechte | Abhängig von | Kriterium | Welle | Status |
|---|---|---|---|---|---|---|---|---|---|
| E2-PRUEF-00 | Spurenanalyse LCP auf `/` mobil (Trace, LCP-Element, Kette bis zum Malen) | Prüfer | Haiku | 1 | `$SCRATCH/E2-PRUEF-00/**`, Bericht | E0-PRUEF-03 | Z-08 | E2-W1 | offen |
| E2-ORCH-00 | LCP-Ursache auf `/` beheben (Schrift, Startzustände, späte Abschnitte) | Orchestrator | Opus | 3 | `_dokument.tsx`, `globals.css`, `bewegung.css`, `src/components/start/Einstieg.tsx` | E2-PRUEF-00 | Z-08 | E2-W1 | offen |
| E2-ORCH-01 | Designsystem v3: Tokens und Skalen aus K-005 (Schatten, z-60, `ease-hammer`, Verlegen- und Intro-Dauern), Abbau entfallender Register-Einträge vorbereiten | Orchestrator | Opus | 3 | `src/app/globals.css`, `src/app/bewegung.css`, `src/lib/motion/register.ts`, `_werkstatt/register.json`, `_werkstatt/werkzeuge/werte-regeln.json` | — | Z-03, Z-05 | E2-W1 | offen |
| E2-ORCH-02 | Bausteine: `Fachwort`, `Seitenformel`, `Bildfeld` v3, `Hauptknopf`, `Brotkrumen`, `Fliesenkomposition`, `src/config/glossar.ts`, `src/config/arbeiten.ts` | Orchestrator | Opus | 3 | `src/components/kern/*` (neue Dateien und `Bildfeld.tsx`), `src/config/glossar.ts`, `src/config/arbeiten.ts` | E2-ORCH-01 | Z-03, Z-12, Z-13 | E2-W1 | offen |
| E2-FIX-01 | Bewertungen aus einer Quelle (27, 5,0), Kundenstimmen in `schema.ts` wörtlich, Bewertungszeile ohne „527“ | Orchestrator | Opus | 3 | `src/config/reviews.js`, `src/lib/schema.ts`, `src/components/reviews/GoogleReviewsBadge.tsx`, `src/components/trust/TrustStrip.tsx`, `src/app/llms.txt/route.ts` | — | Z-12, Z-14, G8 | E2-W1 | offen |
| E2-ORCH-03 | Kopf, Navigation (K-009), Mobilmenü, untere Leiste, Fuß als vollständige Übersicht, Markierung der aktuellen Seite | Orchestrator | Opus | 3 | `src/config/navigation.js`, `src/components/common/{Header,MobileMenu,Footer}.jsx`, `src/components/layout/{HeaderWrapper,MobileBottomBar}.tsx` | E2-ORCH-01 | Z-11, Z-09 | E2-W2 | offen |
| E2-ORCH-04 | B-01 „Verlegen“ (Überlagerung, Klick-Abfangen, Zustandsautomat, Zurück und Vor, Wartephase, reduziert) | Orchestrator | Opus | 3 | `src/components/verlegen/*`, `src/lib/verlegen/*`, `_dokument.tsx` (Einhängen) | E2-ORCH-01 | Z-05, Z-07, Z-08 | E2-W2 | offen |
| E2-TEST-04 | Tests für die Logik von B-01: Fliesenraster im Drittelverband, Größenwahl ≤ 80, Linkfilter (Ausnahmen), Zustandsautomat (Doppelklick, Wartephase, Abbruch), Dauern 1.200/900 ms | Prüfer | Haiku | 2 | `test/verlegen.test.mjs` (neu), Eintrag im Skript `test` meldet der Prüfer | E2-ORCH-04 | Z-05 | E2-W2 | offen |
| E2-GRAF-05 | Logo nachzeichnen per Skript (Farbebenen, potrace), Wortmarke aus Schriftkonturen, Deckungsmessung bei doppelter Größe | Grafiker | Haiku | 2 | `_werkstatt/werkzeuge/logo/**` (neu, eigene Pakete in `werkzeuge/package.json` nach E-011), `$SCRATCH/E2-GRAF-05/**` | — | Z-06 | E2-W1 | offen |
| E2-ORCH-05 | B-02 Intro: Pfade bereinigen und ordnen, Ablauf, Abbruch, reduziert; Ersatz-Intro falls < 98 % | Orchestrator | Opus | 3 | `src/components/intro/*`, `src/lib/motion/kopfskript.ts`, `_dokument.tsx` | E2-GRAF-05, E2-ORCH-04 | Z-05, Z-06, Z-08 | E2-W3 | offen |
| E2-BILD-01 | Bildwerkzeug `bilder.mjs` (sharp) und Webfassungen aller Bildplätze aus `bildplaetze.md` mit Platzhaltern; Metadaten weg | Bildbearbeiter | Haiku | 2 | `_werkstatt/werkzeuge/bilder.mjs`, `public/images/arbeiten/**`, `_werkstatt/bilder/arbeiten.json` (Bilddaten für `arbeiten.ts`) | — | Z-13 | E2-W1 | offen |
| E2-ORCH-06 | Startseite nach `REF-start.md`: erster Bildschirm, Lage-Fliesen, Was wir tun, Ablauf, Beleg, Formular; großer Moment `startbild`; Preisrechner und Express-Anfrage von `/` entfernt | Orchestrator | Opus | 3 | `src/app/(bestand)/page.tsx`, `src/components/start/*` | E2-ORCH-02, -03, -04, E2-BILD-01 | Z-04, Z-11, Z-12, Z-13 | E2-W3 | offen |
| E2-ORCH-07 | 404 mit verrutschter Fliese und drei Wegen | Orchestrator | Opus | 3 | `src/app/(bestand)/not-found.tsx`, `src/app/global-not-found.tsx` | E2-ORCH-02 | Z-11 | E2-W3 | offen |
| E2-PRUEF-A | Stufe A je Welle für alle Opus-Pakete (Typprüfung, Linter, Tests, Lesbarkeit, Bild mobil und Desktop) | Prüfer | Haiku | 1 | `$SCRATCH/E2-PRUEF-A*/**` | je Welle | Z-02 | E2-W1…W3 | offen |
| E2-PRUEF-B | Stufe B für `/` (alle Werkzeuge, 10 Geräte, Lighthouse mit Intro) | Prüfer | Haiku | 1 | `_werkstatt/belege/e2/**` | E2-ORCH-06 | Z-02…Z-09 | E2-Tor | offen |
| E2-PROBE-01…04 | Probeläufe P1 und P5, je mobil und Desktop, A1 bis A3 | Probeläufer | Haiku | 1 | `_werkstatt/cache/probelauf/e2/**` | E2-PRUEF-B | Z-11 | E2-Tor | offen |
| E2-DOK-01 | Bildsatz der Referenz nach `_werkstatt/bilder/e2/` (≤ 1440 px) | Dokumentar | Haiku | 1 | `_werkstatt/bilder/e2/**` | E2-PRUEF-B | Z-10 | E2-Tor | offen |
| E2-SICHT | Sichtabnahme der Referenz nach Award-Rubrik (frischer Opus-Unteragent), Ziel ≥ 8 | Juror | Opus | 3 | `_werkstatt/berichte/E2-SICHT.md` | E2-DOK-01 | Z-04 | E2-Tor | offen |

### E3 · Vorlagen, große Momente, Hauptansichten
| Kennung | Gegenstand | Rolle | Modell | Stufe | Schreibrechte | Abhängig von | Kriterium | Welle | Status |
|---|---|---|---|---|---|---|---|---|---|
| E3-ORCH-01 | Vorlagen je Seitenart: `ErzaehlSeite`, `WissensSeite`, `OrtsSeite`, `ArbeitsSeite` nach Seitenformel K-009 | Orchestrator | Opus | 3 | `src/components/vorlagen/*` (neu) | E2-Tor | Z-03, Z-11 | E3-W1 | offen |
| E3-GRAF-01 | Großer Moment `schichten` für `/bad`: Was unter der Fliese steckt (Untergrund, Abdichtung, Kleber, Fliese, Fuge), scrollgebunden; Register-Eintrag K-007, reduzierte Bewegung, Budget | Grafiker | Haiku | 2 | `src/components/momente/schichten/*` (neu) | E3-ORCH-01 | Z-04, Z-05 | E3-W1 | offen |
| E3-GRAF-02 | Großer Moment `weg` für `/bad/badsanierung`: Vom Anruf bis zur letzten Fuge, Weg mit Stationen; Register-Eintrag K-007, reduzierte Bewegung, Budget | Grafiker | Haiku | 2 | `src/components/momente/weg/*` (neu) | E3-ORCH-01 | Z-04, Z-05 | E3-W1 | offen |
| E3-GRAF-03 | Großer Moment `gefaelle-dusche` für `/bad/barrierefreies-bad`: Wasser läuft über das Gefälle zum Ablauf; Register-Eintrag K-007, reduzierte Bewegung, Budget | Grafiker | Haiku | 2 | `src/components/momente/gefaelle-dusche/*` (neu) | E3-ORCH-01 | Z-04, Z-05 | E3-W1 | offen |
| E3-GRAF-04 | Großer Moment `gefaelle-balkon` für `/balkon-terrasse`: Regen läuft vom Balkon ab; Register-Eintrag K-007, reduzierte Bewegung, Budget | Grafiker | Haiku | 2 | `src/components/momente/gefaelle-balkon/*` (neu) | E3-ORCH-01 | Z-04, Z-05 | E3-W1 | offen |
| E3-GRAF-05 | Großer Moment `formatregler` für `/leistungen`: Formatvergleich 60 × 60 gegen 120 × 260 als Regler; Register-Eintrag K-007, reduzierte Bewegung, Budget | Grafiker | Haiku | 2 | `src/components/momente/formatregler/*` (neu) | E3-ORCH-01 | Z-04, Z-05 | E3-W1 | offen |
| E3-GRAF-06 | Großer Moment `verband` für `/fliesen`: Verlegemuster zum Ausprobieren: Kreuzfuge, Halbverband, Drittelverband, Fischgrät; Register-Eintrag K-007, reduzierte Bewegung, Budget | Grafiker | Haiku | 2 | `src/components/momente/verband/*` (neu) | E3-ORCH-01 | Z-04, Z-05 | E3-W1 | offen |
| E3-GRAF-07 | Großer Moment `vorher-nachher` für `/referenzen`: Vorher-Nachher-Regler (Außentreppe); Register-Eintrag K-007, reduzierte Bewegung, Budget | Grafiker | Haiku | 2 | `src/components/momente/vorher-nachher/*` (neu) | E3-ORCH-01 | Z-04, Z-05 | E3-W1 | offen |
| E3-GRAF-08 | Großer Moment `galerie-filter` für `/referenzen`: Galerie „Unsere Arbeiten“ mit Filter nach Raum; Register-Eintrag K-007, reduzierte Bewegung, Budget | Grafiker | Haiku | 2 | `src/components/momente/galerie-filter/*` (neu) | E3-ORCH-01 | Z-04, Z-05 | E3-W1 | offen |
| E3-GRAF-09 | Großer Moment `karte` für `/ueber-uns`: Einsatzkarte mit Aßlar in der Mitte (auch `/standorte`); Register-Eintrag K-007, reduzierte Bewegung, Budget | Grafiker | Haiku | 2 | `src/components/momente/karte/*` (neu) | E3-ORCH-01 | Z-04, Z-05 | E3-W1 | offen |
| E3-TEXT-01 | Text `/bad` (erzaehl) nach Seitenformel und `texte/REF-start.md`, `texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/bad.md` (neu) | E3-ORCH-01 | Z-12 | E3-W1 | offen |
| E3-LEKT-01 | Lektorat `/bad` nach Checkliste (Verständlichkeit, Schreibregeln, Fakten K-015, Suchbegriffe) | Lektor | Haiku | 2 | `_werkstatt/texte/bad.md` | E3-TEXT-01 | Z-12 | E3-W2 | offen |
| E3-BAU-01 | Seite `/bad` nach Vorlage `erzaehl`, Text aus `texte/bad.md`, Bilder aus `bildplaetze.md`, Moment falls vorgesehen; Stufe A selbst | Baumeister | Haiku | 2 | `src/app/(bestand)/bad/page.*` und seitenspezifische Komponenten unter `src/components/seiten/bad/*` | E3-LEKT-01, E3-GRAF (falls Moment) | Z-04, Z-09, Z-11, Z-13 | E3-W3 | offen |
| E3-TEXT-02 | Text `/bad/badsanierung` (erzaehl) nach Seitenformel und `texte/REF-start.md`, `texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/bad-badsanierung.md` (neu) | E3-ORCH-01 | Z-12 | E3-W1 | offen |
| E3-LEKT-02 | Lektorat `/bad/badsanierung` nach Checkliste (Verständlichkeit, Schreibregeln, Fakten K-015, Suchbegriffe) | Lektor | Haiku | 2 | `_werkstatt/texte/bad-badsanierung.md` | E3-TEXT-02 | Z-12 | E3-W2 | offen |
| E3-BAU-02 | Seite `/bad/badsanierung` nach Vorlage `erzaehl`, Text aus `texte/bad-badsanierung.md`, Bilder aus `bildplaetze.md`, Moment falls vorgesehen; Stufe A selbst | Baumeister | Haiku | 2 | `src/app/(bestand)/bad/badsanierung/page.*` und seitenspezifische Komponenten unter `src/components/seiten/bad-badsanierung/*` | E3-LEKT-02, E3-GRAF (falls Moment) | Z-04, Z-09, Z-11, Z-13 | E3-W3 | offen |
| E3-TEXT-03 | Text `/bad/barrierefreies-bad` (erzaehl) nach Seitenformel und `texte/REF-start.md`, `texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/bad-barrierefreies-bad.md` (neu) | E3-ORCH-01 | Z-12 | E3-W1 | offen |
| E3-LEKT-03 | Lektorat `/bad/barrierefreies-bad` nach Checkliste (Verständlichkeit, Schreibregeln, Fakten K-015, Suchbegriffe) | Lektor | Haiku | 2 | `_werkstatt/texte/bad-barrierefreies-bad.md` | E3-TEXT-03 | Z-12 | E3-W2 | offen |
| E3-BAU-03 | Seite `/bad/barrierefreies-bad` nach Vorlage `erzaehl`, Text aus `texte/bad-barrierefreies-bad.md`, Bilder aus `bildplaetze.md`, Moment falls vorgesehen; Stufe A selbst | Baumeister | Haiku | 2 | `src/app/(bestand)/bad/barrierefreies-bad/page.*` und seitenspezifische Komponenten unter `src/components/seiten/bad-barrierefreies-bad/*` | E3-LEKT-03, E3-GRAF (falls Moment) | Z-04, Z-09, Z-11, Z-13 | E3-W3 | offen |
| E3-TEXT-04 | Text `/leistungen` (erzaehl) nach Seitenformel und `texte/REF-start.md`, `texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/leistungen.md` (neu) | E3-ORCH-01 | Z-12 | E3-W1 | offen |
| E3-LEKT-04 | Lektorat `/leistungen` nach Checkliste (Verständlichkeit, Schreibregeln, Fakten K-015, Suchbegriffe) | Lektor | Haiku | 2 | `_werkstatt/texte/leistungen.md` | E3-TEXT-04 | Z-12 | E3-W2 | offen |
| E3-BAU-04 | Seite `/leistungen` nach Vorlage `erzaehl`, Text aus `texte/leistungen.md`, Bilder aus `bildplaetze.md`, Moment falls vorgesehen; Stufe A selbst | Baumeister | Haiku | 2 | `src/app/(bestand)/leistungen/page.*` und seitenspezifische Komponenten unter `src/components/seiten/leistungen/*` | E3-LEKT-04, E3-GRAF (falls Moment) | Z-04, Z-09, Z-11, Z-13 | E3-W3 | offen |
| E3-TEXT-05 | Text `/fliesen` (wissen) nach Seitenformel und `texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/fliesen.md` (neu) | E3-ORCH-01 | Z-12 | E3-W1 | offen |
| E3-LEKT-05 | Lektorat `/fliesen` nach Checkliste (Verständlichkeit, Schreibregeln, Fakten K-015, Suchbegriffe) | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen.md` | E3-TEXT-05 | Z-12 | E3-W2 | offen |
| E3-BAU-05 | Seite `/fliesen` nach Vorlage `wissen`, Text aus `texte/fliesen.md`, Bilder aus `bildplaetze.md`, Moment falls vorgesehen; Stufe A selbst | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/page.*` und seitenspezifische Komponenten unter `src/components/seiten/fliesen/*` | E3-LEKT-05, E3-GRAF (falls Moment) | Z-04, Z-09, Z-11, Z-13 | E3-W3 | offen |
| E3-TEXT-06 | Text `/balkon-terrasse` (erzaehl) nach Seitenformel und `texte/REF-start.md`, `texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/balkon-terrasse.md` (neu) | E3-ORCH-01 | Z-12 | E3-W1 | offen |
| E3-LEKT-06 | Lektorat `/balkon-terrasse` nach Checkliste (Verständlichkeit, Schreibregeln, Fakten K-015, Suchbegriffe) | Lektor | Haiku | 2 | `_werkstatt/texte/balkon-terrasse.md` | E3-TEXT-06 | Z-12 | E3-W2 | offen |
| E3-BAU-06 | Seite `/balkon-terrasse` nach Vorlage `erzaehl`, Text aus `texte/balkon-terrasse.md`, Bilder aus `bildplaetze.md`, Moment falls vorgesehen; Stufe A selbst | Baumeister | Haiku | 2 | `src/app/(bestand)/balkon-terrasse/page.*` und seitenspezifische Komponenten unter `src/components/seiten/balkon-terrasse/*` | E3-LEKT-06, E3-GRAF (falls Moment) | Z-04, Z-09, Z-11, Z-13 | E3-W3 | offen |
| E3-TEXT-07 | Text `/referenzen` (erzaehl) nach Seitenformel und `texte/REF-start.md`, `texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/referenzen.md` (neu) | E3-ORCH-01 | Z-12 | E3-W1 | offen |
| E3-LEKT-07 | Lektorat `/referenzen` nach Checkliste (Verständlichkeit, Schreibregeln, Fakten K-015, Suchbegriffe) | Lektor | Haiku | 2 | `_werkstatt/texte/referenzen.md` | E3-TEXT-07 | Z-12 | E3-W2 | offen |
| E3-BAU-07 | Seite `/referenzen` nach Vorlage `erzaehl`, Text aus `texte/referenzen.md`, Bilder aus `bildplaetze.md`, Moment falls vorgesehen; Stufe A selbst | Baumeister | Haiku | 2 | `src/app/(bestand)/referenzen/page.*` und seitenspezifische Komponenten unter `src/components/seiten/referenzen/*` | E3-LEKT-07, E3-GRAF (falls Moment) | Z-04, Z-09, Z-11, Z-13 | E3-W3 | offen |
| E3-TEXT-08 | Text `/ueber-uns` (erzaehl) nach Seitenformel und `texte/REF-start.md`, `texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/ueber-uns.md` (neu) | E3-ORCH-01 | Z-12 | E3-W1 | offen |
| E3-LEKT-08 | Lektorat `/ueber-uns` nach Checkliste (Verständlichkeit, Schreibregeln, Fakten K-015, Suchbegriffe) | Lektor | Haiku | 2 | `_werkstatt/texte/ueber-uns.md` | E3-TEXT-08 | Z-12 | E3-W2 | offen |
| E3-BAU-08 | Seite `/ueber-uns` nach Vorlage `erzaehl`, Text aus `texte/ueber-uns.md`, Bilder aus `bildplaetze.md`, Moment falls vorgesehen; Stufe A selbst | Baumeister | Haiku | 2 | `src/app/(bestand)/ueber-uns/page.*` und seitenspezifische Komponenten unter `src/components/seiten/ueber-uns/*` | E3-LEKT-08, E3-GRAF (falls Moment) | Z-04, Z-09, Z-11, Z-13 | E3-W3 | offen |
| E3-TEXT-09 | Text `/kontakt` (arbeit) nach Seitenformel und `texte/REF-start.md` Abschnitt 6 und `texte/REF-bereich-barrierefreies-bad.md` Abschnitt 6 | Texter | Haiku | 2 | `_werkstatt/texte/kontakt.md` (neu) | E3-ORCH-01 | Z-12 | E3-W1 | offen |
| E3-LEKT-09 | Lektorat `/kontakt` nach Checkliste (Verständlichkeit, Schreibregeln, Fakten K-015, Suchbegriffe) | Lektor | Haiku | 2 | `_werkstatt/texte/kontakt.md` | E3-TEXT-09 | Z-12 | E3-W2 | offen |
| E3-BAU-09 | Seite `/kontakt` nach Vorlage `arbeit`, Text aus `texte/kontakt.md`, Bilder aus `bildplaetze.md`, Moment falls vorgesehen; Stufe A selbst | Baumeister | Haiku | 2 | `src/app/(bestand)/kontakt/page.*` und seitenspezifische Komponenten unter `src/components/seiten/kontakt/*` | E3-LEKT-09, E3-GRAF (falls Moment) | Z-04, Z-09, Z-11, Z-13 | E3-W3 | offen |
| E3-TEXT-10 | Text `/standorte/[stadt]` (ort) nach Seitenformel und `texte/REF-ort-wetzlar.md` | Texter | Haiku | 2 | `_werkstatt/texte/standorte-stadt.md` (neu) | E3-ORCH-01 | Z-12 | E3-W1 | offen |
| E3-LEKT-10 | Lektorat `/standorte/[stadt]` nach Checkliste (Verständlichkeit, Schreibregeln, Fakten K-015, Suchbegriffe) | Lektor | Haiku | 2 | `_werkstatt/texte/standorte-stadt.md` | E3-TEXT-10 | Z-12 | E3-W2 | offen |
| E3-BAU-10 | Seite `/standorte/[stadt]` nach Vorlage `ort`, Text aus `texte/standorte-stadt.md`, Bilder aus `bildplaetze.md`, Moment falls vorgesehen; Stufe A selbst | Baumeister | Haiku | 2 | `src/app/(bestand)/standorte/[stadt]/page.tsx` und seitenspezifische Komponenten unter `src/components/seiten/standorte-stadt/*` | E3-LEKT-10, E3-GRAF (falls Moment) | Z-04, Z-09, Z-11, Z-13 | E3-W3 | offen |
| E3-TEXT-11 | Text `/blog` (wissen) nach Seitenformel und `texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/blog.md` (neu) | E3-ORCH-01 | Z-12 | E3-W1 | offen |
| E3-LEKT-11 | Lektorat `/blog` nach Checkliste (Verständlichkeit, Schreibregeln, Fakten K-015, Suchbegriffe) | Lektor | Haiku | 2 | `_werkstatt/texte/blog.md` | E3-TEXT-11 | Z-12 | E3-W2 | offen |
| E3-BAU-11 | Seite `/blog` nach Vorlage `wissen`, Text aus `texte/blog.md`, Bilder aus `bildplaetze.md`, Moment falls vorgesehen; Stufe A selbst | Baumeister | Haiku | 2 | `src/app/(bestand)/blog/page.*` und seitenspezifische Komponenten unter `src/components/seiten/blog/*` | E3-LEKT-11, E3-GRAF (falls Moment) | Z-04, Z-09, Z-11, Z-13 | E3-W3 | offen |
| E3-ORCH-02 | Datentexte der Welle übertragen (`cities.ts`, `services.js`, `company.js`, `topics.js`) und gemeinsame Dateien bündeln | Orchestrator | Opus | 3 | gemeinsame Daten- und Textdateien | E3-LEKT-* | Z-12 | E3-W2 | offen |
| E3-PRUEF-A | Stufe A je Welle (unabhängig) | Prüfer | Haiku | 1 | `$SCRATCH/E3-PRUEF-A*/**` | je Welle | Z-02 | E3-W1…W3 | offen |
| E3-PRUEF-B | Stufe B der 12 Hauptansichten | Prüfer | Haiku | 1 | `_werkstatt/belege/e3/**` | E3-BAU-* | Z-02…Z-09 | E3-Tor | offen |
| E3-PROBE-01…10 | Probeläufe P1 bis P5 × mobil und Desktop, A1 bis A6 | Probeläufer | Haiku | 1 | `_werkstatt/cache/probelauf/e3/**` | E3-PRUEF-B | Z-11 | E3-Tor | offen |
| E3-SICHT | Sichtabnahme der Hauptansichten (Orchestrator an Bildsatz) | Orchestrator | Opus | 3 | `_werkstatt/berichte/E3-SICHT.md` | E3-PRUEF-B | Z-04 | E3-Tor | offen |

### E4 · Übrige Seiten
| Kennung | Gegenstand | Rolle | Modell | Stufe | Schreibrechte | Abhängig von | Kriterium | Welle | Status |
|---|---|---|---|---|---|---|---|---|---|
| E4-TEXT-01 | Text `/ausstellung/giessen` (erzaehl) | Texter | Haiku | 2 | `_werkstatt/texte/ausstellung-giessen.md` | E3-Tor | Z-12 | E4-W1 | offen |
| E4-LEKT-01 | Lektorat `/ausstellung/giessen` | Lektor | Haiku | 2 | `_werkstatt/texte/ausstellung-giessen.md` | E4-TEXT-01 | Z-12 | E4-W1+1 | offen |
| E4-BAU-01 | Seite `/ausstellung/giessen` nach Vorlage `erzaehl` | Baumeister | Haiku | 2 | `src/app/(bestand)/ausstellung/giessen/page.*` und `src/components/seiten/ausstellung-giessen/*` | E4-LEKT-01 | Z-04, Z-09, Z-11, Z-13 | E4-W1+2 | offen |
| E4-TEXT-02 | Text `/ausstellung/wetzlar` (erzaehl) | Texter | Haiku | 2 | `_werkstatt/texte/ausstellung-wetzlar.md` | E3-Tor | Z-12 | E4-W1 | offen |
| E4-LEKT-02 | Lektorat `/ausstellung/wetzlar` | Lektor | Haiku | 2 | `_werkstatt/texte/ausstellung-wetzlar.md` | E4-TEXT-02 | Z-12 | E4-W1+1 | offen |
| E4-BAU-02 | Seite `/ausstellung/wetzlar` nach Vorlage `erzaehl` | Baumeister | Haiku | 2 | `src/app/(bestand)/ausstellung/wetzlar/page.*` und `src/components/seiten/ausstellung-wetzlar/*` | E4-LEKT-02 | Z-04, Z-09, Z-11, Z-13 | E4-W1+2 | offen |
| E4-TEXT-03 | Text `/bad/bad-aus-einer-hand` (erzaehl) | Texter | Haiku | 2 | `_werkstatt/texte/bad-bad-aus-einer-hand.md` | E3-Tor | Z-12 | E4-W1 | offen |
| E4-LEKT-03 | Lektorat `/bad/bad-aus-einer-hand` | Lektor | Haiku | 2 | `_werkstatt/texte/bad-bad-aus-einer-hand.md` | E4-TEXT-03 | Z-12 | E4-W1+1 | offen |
| E4-BAU-03 | Seite `/bad/bad-aus-einer-hand` nach Vorlage `erzaehl` | Baumeister | Haiku | 2 | `src/app/(bestand)/bad/bad-aus-einer-hand/page.*` und `src/components/seiten/bad-bad-aus-einer-hand/*` | E4-LEKT-03 | Z-04, Z-09, Z-11, Z-13 | E4-W1+2 | offen |
| E4-TEXT-04 | Text `/bad/badanfrage` (arbeit) | Texter | Haiku | 2 | `_werkstatt/texte/bad-badanfrage.md` | E3-Tor | Z-12 | E4-W1 | offen |
| E4-LEKT-04 | Lektorat `/bad/badanfrage` | Lektor | Haiku | 2 | `_werkstatt/texte/bad-badanfrage.md` | E4-TEXT-04 | Z-12 | E4-W1+1 | offen |
| E4-BAU-04 | Seite `/bad/badanfrage` nach Vorlage `arbeit` | Baumeister | Haiku | 2 | `src/app/(bestand)/bad/badanfrage/page.*` und `src/components/seiten/bad-badanfrage/*` | E4-LEKT-04 | Z-04, Z-09, Z-11, Z-13 | E4-W1+2 | offen |
| E4-TEXT-05 | Text `/bad/badplaner` (arbeit) | Texter | Haiku | 2 | `_werkstatt/texte/bad-badplaner.md` | E3-Tor | Z-12 | E4-W1 | offen |
| E4-LEKT-05 | Lektorat `/bad/badplaner` | Lektor | Haiku | 2 | `_werkstatt/texte/bad-badplaner.md` | E4-TEXT-05 | Z-12 | E4-W1+1 | offen |
| E4-BAU-05 | Seite `/bad/badplaner` nach Vorlage `arbeit` | Baumeister | Haiku | 2 | `src/app/(bestand)/bad/badplaner/page.*` und `src/components/seiten/bad-badplaner/*` | E4-LEKT-05 | Z-04, Z-09, Z-11, Z-13 | E4-W1+2 | offen |
| E4-TEXT-06 | Text `/bad/fliesen` (erzaehl) | Texter | Haiku | 2 | `_werkstatt/texte/bad-fliesen.md` | E3-Tor | Z-12 | E4-W1 | offen |
| E4-LEKT-06 | Lektorat `/bad/fliesen` | Lektor | Haiku | 2 | `_werkstatt/texte/bad-fliesen.md` | E4-TEXT-06 | Z-12 | E4-W1+1 | offen |
| E4-BAU-06 | Seite `/bad/fliesen` nach Vorlage `erzaehl` | Baumeister | Haiku | 2 | `src/app/(bestand)/bad/fliesen/page.*` und `src/components/seiten/bad-fliesen/*` | E4-LEKT-06 | Z-04, Z-09, Z-11, Z-13 | E4-W1+2 | offen |
| E4-TEXT-07 | Text `/bad/musterbaeder` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/bad-musterbaeder.md` | E3-Tor | Z-12 | E4-W1 | offen |
| E4-LEKT-07 | Lektorat `/bad/musterbaeder` | Lektor | Haiku | 2 | `_werkstatt/texte/bad-musterbaeder.md` | E4-TEXT-07 | Z-12 | E4-W1+1 | offen |
| E4-BAU-07 | Seite `/bad/musterbaeder` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/bad/musterbaeder/page.*` und `src/components/seiten/bad-musterbaeder/*` | E4-LEKT-07 | Z-04, Z-09, Z-11, Z-13 | E4-W1+2 | offen |
| E4-TEXT-08 | Text `/bad/projekt-check` (arbeit) | Texter | Haiku | 2 | `_werkstatt/texte/bad-projekt-check.md` | E3-Tor | Z-12 | E4-W1 | offen |
| E4-LEKT-08 | Lektorat `/bad/projekt-check` | Lektor | Haiku | 2 | `_werkstatt/texte/bad-projekt-check.md` | E4-TEXT-08 | Z-12 | E4-W1+1 | offen |
| E4-BAU-08 | Seite `/bad/projekt-check` nach Vorlage `arbeit` | Baumeister | Haiku | 2 | `src/app/(bestand)/bad/projekt-check/page.*` und `src/components/seiten/bad-projekt-check/*` | E4-LEKT-08 | Z-04, Z-09, Z-11, Z-13 | E4-W1+2 | offen |
| E4-TEXT-09 | Text `/balkon-terrasse/balkonsanierung` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/balkon-terrasse-balkonsanierung.md` | E3-Tor | Z-12 | E4-W1 | offen |
| E4-LEKT-09 | Lektorat `/balkon-terrasse/balkonsanierung` | Lektor | Haiku | 2 | `_werkstatt/texte/balkon-terrasse-balkonsanierung.md` | E4-TEXT-09 | Z-12 | E4-W1+1 | offen |
| E4-BAU-09 | Seite `/balkon-terrasse/balkonsanierung` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/balkon-terrasse/balkonsanierung/page.*` und `src/components/seiten/balkon-terrasse-balkonsanierung/*` | E4-LEKT-09 | Z-04, Z-09, Z-11, Z-13 | E4-W1+2 | offen |
| E4-TEXT-10 | Text `/balkon-terrasse/stelzlager` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/balkon-terrasse-stelzlager.md` | E3-Tor | Z-12 | E4-W1 | offen |
| E4-LEKT-10 | Lektorat `/balkon-terrasse/stelzlager` | Lektor | Haiku | 2 | `_werkstatt/texte/balkon-terrasse-stelzlager.md` | E4-TEXT-10 | Z-12 | E4-W1+1 | offen |
| E4-BAU-10 | Seite `/balkon-terrasse/stelzlager` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/balkon-terrasse/stelzlager/page.*` und `src/components/seiten/balkon-terrasse-stelzlager/*` | E4-LEKT-10 | Z-04, Z-09, Z-11, Z-13 | E4-W1+2 | offen |
| E4-TEXT-11 | Text `/balkon-terrasse/terrassenplatten` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/balkon-terrasse-terrassenplatten.md` | E3-Tor | Z-12 | E4-W1 | offen |
| E4-LEKT-11 | Lektorat `/balkon-terrasse/terrassenplatten` | Lektor | Haiku | 2 | `_werkstatt/texte/balkon-terrasse-terrassenplatten.md` | E4-TEXT-11 | Z-12 | E4-W1+1 | offen |
| E4-BAU-11 | Seite `/balkon-terrasse/terrassenplatten` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/balkon-terrasse/terrassenplatten/page.*` und `src/components/seiten/balkon-terrasse-terrassenplatten/*` | E4-LEKT-11 | Z-04, Z-09, Z-11, Z-13 | E4-W1+2 | offen |
| E4-TEXT-12 | Text `/beratung` (arbeit) | Texter | Haiku | 2 | `_werkstatt/texte/beratung.md` | E3-Tor | Z-12 | E4-W1 | offen |
| E4-LEKT-12 | Lektorat `/beratung` | Lektor | Haiku | 2 | `_werkstatt/texte/beratung.md` | E4-TEXT-12 | Z-12 | E4-W1+1 | offen |
| E4-BAU-12 | Seite `/beratung` nach Vorlage `arbeit` | Baumeister | Haiku | 2 | `src/app/(bestand)/beratung/page.*` und `src/components/seiten/beratung/*` | E4-LEKT-12 | Z-04, Z-09, Z-11, Z-13 | E4-W1+2 | offen |
| E4-TEXT-13 | Text `/downloads` (arbeit) | Texter | Haiku | 2 | `_werkstatt/texte/downloads.md` | E3-Tor | Z-12 | E4-W1 | offen |
| E4-LEKT-13 | Lektorat `/downloads` | Lektor | Haiku | 2 | `_werkstatt/texte/downloads.md` | E4-TEXT-13 | Z-12 | E4-W1+1 | offen |
| E4-BAU-13 | Seite `/downloads` nach Vorlage `arbeit` | Baumeister | Haiku | 2 | `src/app/(bestand)/downloads/page.*` und `src/components/seiten/downloads/*` | E4-LEKT-13 | Z-04, Z-09, Z-11, Z-13 | E4-W1+2 | offen |
| E4-TEXT-14 | Text `/faq` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/faq.md` | E3-Tor | Z-12 | E4-W1 | offen |
| E4-LEKT-14 | Lektorat `/faq` | Lektor | Haiku | 2 | `_werkstatt/texte/faq.md` | E4-TEXT-14 | Z-12 | E4-W1+1 | offen |
| E4-BAU-14 | Seite `/faq` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/faq/page.*` und `src/components/seiten/faq/*` | E4-LEKT-14 | Z-04, Z-09, Z-11, Z-13 | E4-W1+2 | offen |
| E4-TEXT-15 | Text `/fliesen/abnahme` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-abnahme.md` | E3-Tor | Z-12 | E4-W1 | offen |
| E4-LEKT-15 | Lektorat `/fliesen/abnahme` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-abnahme.md` | E4-TEXT-15 | Z-12 | E4-W1+1 | offen |
| E4-BAU-15 | Seite `/fliesen/abnahme` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/abnahme/page.*` und `src/components/seiten/fliesen-abnahme/*` | E4-LEKT-15 | Z-04, Z-09, Z-11, Z-13 | E4-W1+2 | offen |
| E4-TEXT-16 | Text `/fliesen/auf-fussbodenheizung` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-auf-fussbodenheizung.md` | E3-Tor | Z-12 | E4-W1 | offen |
| E4-LEKT-16 | Lektorat `/fliesen/auf-fussbodenheizung` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-auf-fussbodenheizung.md` | E4-TEXT-16 | Z-12 | E4-W1+1 | offen |
| E4-BAU-16 | Seite `/fliesen/auf-fussbodenheizung` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/auf-fussbodenheizung/page.*` und `src/components/seiten/fliesen-auf-fussbodenheizung/*` | E4-LEKT-16 | Z-04, Z-09, Z-11, Z-13 | E4-W1+2 | offen |
| E4-TEXT-17 | Text `/fliesen/festpreisangebot` (arbeit) | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-festpreisangebot.md` | E3-Tor | Z-12 | E4-W1 | offen |
| E4-LEKT-17 | Lektorat `/fliesen/festpreisangebot` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-festpreisangebot.md` | E4-TEXT-17 | Z-12 | E4-W1+1 | offen |
| E4-BAU-17 | Seite `/fliesen/festpreisangebot` nach Vorlage `arbeit` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/festpreisangebot/page.*` und `src/components/seiten/fliesen-festpreisangebot/*` | E4-LEKT-17 | Z-04, Z-09, Z-11, Z-13 | E4-W1+2 | offen |
| E4-TEXT-18 | Text `/fliesen/fliesenarten` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-fliesenarten.md` | E3-Tor | Z-12 | E4-W1 | offen |
| E4-LEKT-18 | Lektorat `/fliesen/fliesenarten` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-fliesenarten.md` | E4-TEXT-18 | Z-12 | E4-W1+1 | offen |
| E4-BAU-18 | Seite `/fliesen/fliesenarten` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/fliesenarten/page.*` und `src/components/seiten/fliesen-fliesenarten/*` | E4-LEKT-18 | Z-04, Z-09, Z-11, Z-13 | E4-W1+2 | offen |
| E4-TEXT-19 | Text `/fliesen/flur-diele` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-flur-diele.md` | E3-Tor | Z-12 | E4-W2 | offen |
| E4-LEKT-19 | Lektorat `/fliesen/flur-diele` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-flur-diele.md` | E4-TEXT-19 | Z-12 | E4-W2+1 | offen |
| E4-BAU-19 | Seite `/fliesen/flur-diele` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/flur-diele/page.*` und `src/components/seiten/fliesen-flur-diele/*` | E4-LEKT-19 | Z-04, Z-09, Z-11, Z-13 | E4-W2+2 | offen |
| E4-TEXT-20 | Text `/fliesen/fugensanierung` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-fugensanierung.md` | E3-Tor | Z-12 | E4-W2 | offen |
| E4-LEKT-20 | Lektorat `/fliesen/fugensanierung` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-fugensanierung.md` | E4-TEXT-20 | Z-12 | E4-W2+1 | offen |
| E4-BAU-20 | Seite `/fliesen/fugensanierung` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/fugensanierung/page.*` und `src/components/seiten/fliesen-fugensanierung/*` | E4-LEKT-20 | Z-04, Z-09, Z-11, Z-13 | E4-W2+2 | offen |
| E4-TEXT-21 | Text `/fliesen/grossformat` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-grossformat.md` | E3-Tor | Z-12 | E4-W2 | offen |
| E4-LEKT-21 | Lektorat `/fliesen/grossformat` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-grossformat.md` | E4-TEXT-21 | Z-12 | E4-W2+1 | offen |
| E4-BAU-21 | Seite `/fliesen/grossformat` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/grossformat/page.*` und `src/components/seiten/fliesen-grossformat/*` | E4-LEKT-21 | Z-04, Z-09, Z-11, Z-13 | E4-W2+2 | offen |
| E4-TEXT-22 | Text `/fliesen/holzoptik` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-holzoptik.md` | E3-Tor | Z-12 | E4-W2 | offen |
| E4-LEKT-22 | Lektorat `/fliesen/holzoptik` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-holzoptik.md` | E4-TEXT-22 | Z-12 | E4-W2+1 | offen |
| E4-BAU-22 | Seite `/fliesen/holzoptik` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/holzoptik/page.*` und `src/components/seiten/fliesen-holzoptik/*` | E4-LEKT-22 | Z-04, Z-09, Z-11, Z-13 | E4-W2+2 | offen |
| E4-TEXT-23 | Text `/fliesen/konfigurator` (arbeit) | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-konfigurator.md` | E3-Tor | Z-12 | E4-W2 | offen |
| E4-LEKT-23 | Lektorat `/fliesen/konfigurator` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-konfigurator.md` | E4-TEXT-23 | Z-12 | E4-W2+1 | offen |
| E4-BAU-23 | Seite `/fliesen/konfigurator` nach Vorlage `arbeit` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/konfigurator/page.*` und `src/components/seiten/fliesen-konfigurator/*` | E4-LEKT-23 | Z-04, Z-09, Z-11, Z-13 | E4-W2+2 | offen |
| E4-TEXT-24 | Text `/fliesen/kueche` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-kueche.md` | E3-Tor | Z-12 | E4-W2 | offen |
| E4-LEKT-24 | Lektorat `/fliesen/kueche` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-kueche.md` | E4-TEXT-24 | Z-12 | E4-W2+1 | offen |
| E4-BAU-24 | Seite `/fliesen/kueche` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/kueche/page.*` und `src/components/seiten/fliesen-kueche/*` | E4-LEKT-24 | Z-04, Z-09, Z-11, Z-13 | E4-W2+2 | offen |
| E4-TEXT-25 | Text `/fliesen/neubau` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-neubau.md` | E3-Tor | Z-12 | E4-W2 | offen |
| E4-LEKT-25 | Lektorat `/fliesen/neubau` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-neubau.md` | E4-TEXT-25 | Z-12 | E4-W2+1 | offen |
| E4-BAU-25 | Seite `/fliesen/neubau` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/neubau/page.*` und `src/components/seiten/fliesen-neubau/*` | E4-LEKT-25 | Z-04, Z-09, Z-11, Z-13 | E4-W2+2 | offen |
| E4-TEXT-26 | Text `/fliesen/renovierung` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-renovierung.md` | E3-Tor | Z-12 | E4-W2 | offen |
| E4-LEKT-26 | Lektorat `/fliesen/renovierung` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-renovierung.md` | E4-TEXT-26 | Z-12 | E4-W2+1 | offen |
| E4-BAU-26 | Seite `/fliesen/renovierung` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/renovierung/page.*` und `src/components/seiten/fliesen-renovierung/*` | E4-LEKT-26 | Z-04, Z-09, Z-11, Z-13 | E4-W2+2 | offen |
| E4-TEXT-27 | Text `/fliesen/verlegemuster` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-verlegemuster.md` | E3-Tor | Z-12 | E4-W2 | offen |
| E4-LEKT-27 | Lektorat `/fliesen/verlegemuster` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-verlegemuster.md` | E4-TEXT-27 | Z-12 | E4-W2+1 | offen |
| E4-BAU-27 | Seite `/fliesen/verlegemuster` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/verlegemuster/page.*` und `src/components/seiten/fliesen-verlegemuster/*` | E4-LEKT-27 | Z-04, Z-09, Z-11, Z-13 | E4-W2+2 | offen |
| E4-TEXT-28 | Text `/fliesen/verlegetechnik` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-verlegetechnik.md` | E3-Tor | Z-12 | E4-W2 | offen |
| E4-LEKT-28 | Lektorat `/fliesen/verlegetechnik` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-verlegetechnik.md` | E4-TEXT-28 | Z-12 | E4-W2+1 | offen |
| E4-BAU-28 | Seite `/fliesen/verlegetechnik` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/verlegetechnik/page.*` und `src/components/seiten/fliesen-verlegetechnik/*` | E4-LEKT-28 | Z-04, Z-09, Z-11, Z-13 | E4-W2+2 | offen |
| E4-TEXT-29 | Text `/fliesenreparatur` (erzaehl) | Texter | Haiku | 2 | `_werkstatt/texte/fliesenreparatur.md` | E3-Tor | Z-12 | E4-W2 | offen |
| E4-LEKT-29 | Lektorat `/fliesenreparatur` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesenreparatur.md` | E4-TEXT-29 | Z-12 | E4-W2+1 | offen |
| E4-BAU-29 | Seite `/fliesenreparatur` nach Vorlage `erzaehl` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesenreparatur/page.*` und `src/components/seiten/fliesenreparatur/*` | E4-LEKT-29 | Z-04, Z-09, Z-11, Z-13 | E4-W2+2 | offen |
| E4-TEXT-30 | Text `/foerderung` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/foerderung.md` | E3-Tor | Z-12 | E4-W2 | offen |
| E4-LEKT-30 | Lektorat `/foerderung` | Lektor | Haiku | 2 | `_werkstatt/texte/foerderung.md` | E4-TEXT-30 | Z-12 | E4-W2+1 | offen |
| E4-BAU-30 | Seite `/foerderung` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/foerderung/page.*` und `src/components/seiten/foerderung/*` | E4-LEKT-30 | Z-04, Z-09, Z-11, Z-13 | E4-W2+2 | offen |
| E4-TEXT-31 | Text `/karriere` (erzaehl) | Texter | Haiku | 2 | `_werkstatt/texte/karriere.md` | E3-Tor | Z-12 | E4-W2 | offen |
| E4-LEKT-31 | Lektorat `/karriere` | Lektor | Haiku | 2 | `_werkstatt/texte/karriere.md` | E4-TEXT-31 | Z-12 | E4-W2+1 | offen |
| E4-BAU-31 | Seite `/karriere` nach Vorlage `erzaehl` | Baumeister | Haiku | 2 | `src/app/(bestand)/karriere/page.*` und `src/components/seiten/karriere/*` | E4-LEKT-31 | Z-04, Z-09, Z-11, Z-13 | E4-W2+2 | offen |
| E4-TEXT-32 | Text `/karriere/ausbildung` (erzaehl) | Texter | Haiku | 2 | `_werkstatt/texte/karriere-ausbildung.md` | E3-Tor | Z-12 | E4-W2 | offen |
| E4-LEKT-32 | Lektorat `/karriere/ausbildung` | Lektor | Haiku | 2 | `_werkstatt/texte/karriere-ausbildung.md` | E4-TEXT-32 | Z-12 | E4-W2+1 | offen |
| E4-BAU-32 | Seite `/karriere/ausbildung` nach Vorlage `erzaehl` | Baumeister | Haiku | 2 | `src/app/(bestand)/karriere/ausbildung/page.*` und `src/components/seiten/karriere-ausbildung/*` | E4-LEKT-32 | Z-04, Z-09, Z-11, Z-13 | E4-W2+2 | offen |
| E4-TEXT-33 | Text `/login` (arbeit) | Texter | Haiku | 2 | `_werkstatt/texte/login.md` | E3-Tor | Z-12 | E4-W2 | offen |
| E4-LEKT-33 | Lektorat `/login` | Lektor | Haiku | 2 | `_werkstatt/texte/login.md` | E4-TEXT-33 | Z-12 | E4-W2+1 | offen |
| E4-BAU-33 | Seite `/login` nach Vorlage `arbeit` | Baumeister | Haiku | 2 | `src/app/(bestand)/login/page.*` und `src/components/seiten/login/*` | E4-LEKT-33 | Z-04, Z-09, Z-11, Z-13 | E4-W2+2 | offen |
| E4-TEXT-34 | Text `/naturstein` (erzaehl) | Texter | Haiku | 2 | `_werkstatt/texte/naturstein.md` | E3-Tor | Z-12 | E4-W2 | offen |
| E4-LEKT-34 | Lektorat `/naturstein` | Lektor | Haiku | 2 | `_werkstatt/texte/naturstein.md` | E4-TEXT-34 | Z-12 | E4-W2+1 | offen |
| E4-BAU-34 | Seite `/naturstein` nach Vorlage `erzaehl` | Baumeister | Haiku | 2 | `src/app/(bestand)/naturstein/page.*` und `src/components/seiten/naturstein/*` | E4-LEKT-34 | Z-04, Z-09, Z-11, Z-13 | E4-W2+2 | offen |
| E4-TEXT-35 | Text `/naturstein/granit` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/naturstein-granit.md` | E3-Tor | Z-12 | E4-W2 | offen |
| E4-LEKT-35 | Lektorat `/naturstein/granit` | Lektor | Haiku | 2 | `_werkstatt/texte/naturstein-granit.md` | E4-TEXT-35 | Z-12 | E4-W2+1 | offen |
| E4-BAU-35 | Seite `/naturstein/granit` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/naturstein/granit/page.*` und `src/components/seiten/naturstein-granit/*` | E4-LEKT-35 | Z-04, Z-09, Z-11, Z-13 | E4-W2+2 | offen |
| E4-TEXT-36 | Text `/naturstein/marmor-kalkstein` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/naturstein-marmor-kalkstein.md` | E3-Tor | Z-12 | E4-W2 | offen |
| E4-LEKT-36 | Lektorat `/naturstein/marmor-kalkstein` | Lektor | Haiku | 2 | `_werkstatt/texte/naturstein-marmor-kalkstein.md` | E4-TEXT-36 | Z-12 | E4-W2+1 | offen |
| E4-BAU-36 | Seite `/naturstein/marmor-kalkstein` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/naturstein/marmor-kalkstein/page.*` und `src/components/seiten/naturstein-marmor-kalkstein/*` | E4-LEKT-36 | Z-04, Z-09, Z-11, Z-13 | E4-W2+2 | offen |
| E4-TEXT-37 | Text `/partner` (erzaehl) | Texter | Haiku | 2 | `_werkstatt/texte/partner.md` | E3-Tor | Z-12 | E4-W3 | offen |
| E4-LEKT-37 | Lektorat `/partner` | Lektor | Haiku | 2 | `_werkstatt/texte/partner.md` | E4-TEXT-37 | Z-12 | E4-W3+1 | offen |
| E4-BAU-37 | Seite `/partner` nach Vorlage `erzaehl` | Baumeister | Haiku | 2 | `src/app/(bestand)/partner/page.*` und `src/components/seiten/partner/*` | E4-LEKT-37 | Z-04, Z-09, Z-11, Z-13 | E4-W3+2 | offen |
| E4-TEXT-38 | Text `/preise` (arbeit) | Texter | Haiku | 2 | `_werkstatt/texte/preise.md` | E3-Tor | Z-12 | E4-W3 | offen |
| E4-LEKT-38 | Lektorat `/preise` | Lektor | Haiku | 2 | `_werkstatt/texte/preise.md` | E4-TEXT-38 | Z-12 | E4-W3+1 | offen |
| E4-BAU-38 | Seite `/preise` nach Vorlage `arbeit` | Baumeister | Haiku | 2 | `src/app/(bestand)/preise/page.*` und `src/components/seiten/preise/*` | E4-LEKT-38 | Z-04, Z-09, Z-11, Z-13 | E4-W3+2 | offen |
| E4-TEXT-39 | Text `/schadensanalyse` (erzaehl) | Texter | Haiku | 2 | `_werkstatt/texte/schadensanalyse.md` | E3-Tor | Z-12 | E4-W3 | offen |
| E4-LEKT-39 | Lektorat `/schadensanalyse` | Lektor | Haiku | 2 | `_werkstatt/texte/schadensanalyse.md` | E4-TEXT-39 | Z-12 | E4-W3+1 | offen |
| E4-BAU-39 | Seite `/schadensanalyse` nach Vorlage `erzaehl` | Baumeister | Haiku | 2 | `src/app/(bestand)/schadensanalyse/page.*` und `src/components/seiten/schadensanalyse/*` | E4-LEKT-39 | Z-04, Z-09, Z-11, Z-13 | E4-W3+2 | offen |
| E4-TEXT-40 | Text `/standorte` (ort) | Texter | Haiku | 2 | `_werkstatt/texte/standorte.md` | E3-Tor | Z-12 | E4-W3 | offen |
| E4-LEKT-40 | Lektorat `/standorte` | Lektor | Haiku | 2 | `_werkstatt/texte/standorte.md` | E4-TEXT-40 | Z-12 | E4-W3+1 | offen |
| E4-BAU-40 | Seite `/standorte` nach Vorlage `ort` | Baumeister | Haiku | 2 | `src/app/(bestand)/standorte/page.*` und `src/components/seiten/standorte/*` | E4-LEKT-40 | Z-04, Z-09, Z-11, Z-13 | E4-W3+2 | offen |
| E4-TEXT-41 | Text `/team` (erzaehl) | Texter | Haiku | 2 | `_werkstatt/texte/team.md` | E3-Tor | Z-12 | E4-W3 | offen |
| E4-LEKT-41 | Lektorat `/team` | Lektor | Haiku | 2 | `_werkstatt/texte/team.md` | E4-TEXT-41 | Z-12 | E4-W3+1 | offen |
| E4-BAU-41 | Seite `/team` nach Vorlage `erzaehl` | Baumeister | Haiku | 2 | `src/app/(bestand)/team/page.*` und `src/components/seiten/team/*` | E4-LEKT-41 | Z-04, Z-09, Z-11, Z-13 | E4-W3+2 | offen |
| E4-TEXT-42 | Text `/termin` (arbeit) | Texter | Haiku | 2 | `_werkstatt/texte/termin.md` | E3-Tor | Z-12 | E4-W3 | offen |
| E4-LEKT-42 | Lektorat `/termin` | Lektor | Haiku | 2 | `_werkstatt/texte/termin.md` | E4-TEXT-42 | Z-12 | E4-W3+1 | offen |
| E4-BAU-42 | Seite `/termin` nach Vorlage `arbeit` | Baumeister | Haiku | 2 | `src/app/(bestand)/termin/page.*` und `src/components/seiten/termin/*` | E4-LEKT-42 | Z-04, Z-09, Z-11, Z-13 | E4-W3+2 | offen |
| E4-TEXT-43 | Text `/treppen` (erzaehl) | Texter | Haiku | 2 | `_werkstatt/texte/treppen.md` | E3-Tor | Z-12 | E4-W3 | offen |
| E4-LEKT-43 | Lektorat `/treppen` | Lektor | Haiku | 2 | `_werkstatt/texte/treppen.md` | E4-TEXT-43 | Z-12 | E4-W3+1 | offen |
| E4-BAU-43 | Seite `/treppen` nach Vorlage `erzaehl` | Baumeister | Haiku | 2 | `src/app/(bestand)/treppen/page.*` und `src/components/seiten/treppen/*` | E4-LEKT-43 | Z-04, Z-09, Z-11, Z-13 | E4-W3+2 | offen |
| E4-TEXT-44 | Text `/treppen/aussentreppe` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/treppen-aussentreppe.md` | E3-Tor | Z-12 | E4-W3 | offen |
| E4-LEKT-44 | Lektorat `/treppen/aussentreppe` | Lektor | Haiku | 2 | `_werkstatt/texte/treppen-aussentreppe.md` | E4-TEXT-44 | Z-12 | E4-W3+1 | offen |
| E4-BAU-44 | Seite `/treppen/aussentreppe` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/treppen/aussentreppe/page.*` und `src/components/seiten/treppen-aussentreppe/*` | E4-LEKT-44 | Z-04, Z-09, Z-11, Z-13 | E4-W3+2 | offen |
| E4-TEXT-45 | Text `/treppen/innentreppe` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/treppen-innentreppe.md` | E3-Tor | Z-12 | E4-W3 | offen |
| E4-LEKT-45 | Lektorat `/treppen/innentreppe` | Lektor | Haiku | 2 | `_werkstatt/texte/treppen-innentreppe.md` | E4-TEXT-45 | Z-12 | E4-W3+1 | offen |
| E4-BAU-45 | Seite `/treppen/innentreppe` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/treppen/innentreppe/page.*` und `src/components/seiten/treppen-innentreppe/*` | E4-LEKT-45 | Z-04, Z-09, Z-11, Z-13 | E4-W3+2 | offen |
| E4-TEXT-46 | Text `/treppen/treppenhaus` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/treppen-treppenhaus.md` | E3-Tor | Z-12 | E4-W3 | offen |
| E4-LEKT-46 | Lektorat `/treppen/treppenhaus` | Lektor | Haiku | 2 | `_werkstatt/texte/treppen-treppenhaus.md` | E4-TEXT-46 | Z-12 | E4-W3+1 | offen |
| E4-BAU-46 | Seite `/treppen/treppenhaus` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/treppen/treppenhaus/page.*` und `src/components/seiten/treppen-treppenhaus/*` | E4-LEKT-46 | Z-04, Z-09, Z-11, Z-13 | E4-W3+2 | offen |
| E4-TEXT-47 | Text `/untergrund-abdichtung` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/untergrund-abdichtung.md` | E3-Tor | Z-12 | E4-W3 | offen |
| E4-LEKT-47 | Lektorat `/untergrund-abdichtung` | Lektor | Haiku | 2 | `_werkstatt/texte/untergrund-abdichtung.md` | E4-TEXT-47 | Z-12 | E4-W3+1 | offen |
| E4-BAU-47 | Seite `/untergrund-abdichtung` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/untergrund-abdichtung/page.*` und `src/components/seiten/untergrund-abdichtung/*` | E4-LEKT-47 | Z-04, Z-09, Z-11, Z-13 | E4-W3+2 | offen |
| E4-TEXT-48 | Text `/untergrund-abdichtung/ausgleich-gefaelle` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/untergrund-abdichtung-ausgleich-gefaelle.md` | E3-Tor | Z-12 | E4-W3 | offen |
| E4-LEKT-48 | Lektorat `/untergrund-abdichtung/ausgleich-gefaelle` | Lektor | Haiku | 2 | `_werkstatt/texte/untergrund-abdichtung-ausgleich-gefaelle.md` | E4-TEXT-48 | Z-12 | E4-W3+1 | offen |
| E4-BAU-48 | Seite `/untergrund-abdichtung/ausgleich-gefaelle` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/untergrund-abdichtung/ausgleich-gefaelle/page.*` und `src/components/seiten/untergrund-abdichtung-ausgleich-gefaelle/*` | E4-LEKT-48 | Z-04, Z-09, Z-11, Z-13 | E4-W3+2 | offen |
| E4-TEXT-49 | Text `/untergrund-abdichtung/din-18534` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/untergrund-abdichtung-din-18534.md` | E3-Tor | Z-12 | E4-W3 | offen |
| E4-LEKT-49 | Lektorat `/untergrund-abdichtung/din-18534` | Lektor | Haiku | 2 | `_werkstatt/texte/untergrund-abdichtung-din-18534.md` | E4-TEXT-49 | Z-12 | E4-W3+1 | offen |
| E4-BAU-49 | Seite `/untergrund-abdichtung/din-18534` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/untergrund-abdichtung/din-18534/page.*` und `src/components/seiten/untergrund-abdichtung-din-18534/*` | E4-LEKT-49 | Z-04, Z-09, Z-11, Z-13 | E4-W3+2 | offen |
| E4-TEXT-50 | Text `/untergrund-abdichtung/entkopplung` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/untergrund-abdichtung-entkopplung.md` | E3-Tor | Z-12 | E4-W3 | offen |
| E4-LEKT-50 | Lektorat `/untergrund-abdichtung/entkopplung` | Lektor | Haiku | 2 | `_werkstatt/texte/untergrund-abdichtung-entkopplung.md` | E4-TEXT-50 | Z-12 | E4-W3+1 | offen |
| E4-BAU-50 | Seite `/untergrund-abdichtung/entkopplung` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/untergrund-abdichtung/entkopplung/page.*` und `src/components/seiten/untergrund-abdichtung-entkopplung/*` | E4-LEKT-50 | Z-04, Z-09, Z-11, Z-13 | E4-W3+2 | offen |
| E4-TEXT-51 | Text `/untergrund-abdichtung/estrich-belegreife` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/untergrund-abdichtung-estrich-belegreife.md` | E3-Tor | Z-12 | E4-W3 | offen |
| E4-LEKT-51 | Lektorat `/untergrund-abdichtung/estrich-belegreife` | Lektor | Haiku | 2 | `_werkstatt/texte/untergrund-abdichtung-estrich-belegreife.md` | E4-TEXT-51 | Z-12 | E4-W3+1 | offen |
| E4-BAU-51 | Seite `/untergrund-abdichtung/estrich-belegreife` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/untergrund-abdichtung/estrich-belegreife/page.*` und `src/components/seiten/untergrund-abdichtung-estrich-belegreife/*` | E4-LEKT-51 | Z-04, Z-09, Z-11, Z-13 | E4-W3+2 | offen |
| E4-TEXT-52 | Text `/untergrund-abdichtung/fliesen-auf-fliesen` (wissen) | Texter | Haiku | 2 | `_werkstatt/texte/untergrund-abdichtung-fliesen-auf-fliesen.md` | E3-Tor | Z-12 | E4-W3 | offen |
| E4-LEKT-52 | Lektorat `/untergrund-abdichtung/fliesen-auf-fliesen` | Lektor | Haiku | 2 | `_werkstatt/texte/untergrund-abdichtung-fliesen-auf-fliesen.md` | E4-TEXT-52 | Z-12 | E4-W3+1 | offen |
| E4-BAU-52 | Seite `/untergrund-abdichtung/fliesen-auf-fliesen` nach Vorlage `wissen` | Baumeister | Haiku | 2 | `src/app/(bestand)/untergrund-abdichtung/fliesen-auf-fliesen/page.*` und `src/components/seiten/untergrund-abdichtung-fliesen-auf-fliesen/*` | E4-LEKT-52 | Z-04, Z-09, Z-11, Z-13 | E4-W3+2 | offen |
| E4-TEXT-53 | Text `/unternehmen` (erzaehl) | Texter | Haiku | 2 | `_werkstatt/texte/unternehmen.md` | E3-Tor | Z-12 | E4-W3 | offen |
| E4-LEKT-53 | Lektorat `/unternehmen` | Lektor | Haiku | 2 | `_werkstatt/texte/unternehmen.md` | E4-TEXT-53 | Z-12 | E4-W3+1 | offen |
| E4-BAU-53 | Seite `/unternehmen` nach Vorlage `erzaehl` | Baumeister | Haiku | 2 | `src/app/(bestand)/unternehmen/page.*` und `src/components/seiten/unternehmen/*` | E4-LEKT-53 | Z-04, Z-09, Z-11, Z-13 | E4-W3+2 | offen |
| E4-TEXT-ORTE | Texte der 13 Ortsseiten aus echten Angaben (Entfernung, Region, Präposition) als JSON | Texter | Haiku | 2 | `_werkstatt/texte/orte.json` | E3-Tor | Z-12 | E4-W1…W3 | offen |
| E4-LEKT-ORTE | Lektorat Ortstexte | Lektor | Haiku | 2 | `_werkstatt/texte/orte.json` | E3-Tor | Z-12 | E4-W1…W3 | offen |
| E4-TEXT-LEISTUNGEN | Texte der 4 Leistungen (`services.js`) als JSON | Texter | Haiku | 2 | `_werkstatt/texte/leistungen.json` | E3-Tor | Z-12 | E4-W1…W3 | offen |
| E4-LEKT-LEISTUNGEN | Lektorat Leistungen | Lektor | Haiku | 2 | `_werkstatt/texte/leistungen.json` | E3-Tor | Z-12 | E4-W1…W3 | offen |
| E4-BAU-LEISTUNG | Vorlage `/leistungen/[id]` (4 Seiten) | Baumeister | Haiku | 2 | `src/app/(bestand)/leistungen/[id]/page.jsx` | E3-Tor | Z-04, Z-12 | E4-W1…W3 | offen |
| E4-TEXT-LS | Bausteine der 52 Seiten Leistung × Ort (nur echte Angaben) | Texter | Haiku | 2 | `_werkstatt/texte/leistung-ort.json` | E3-Tor | Z-12 | E4-W1…W3 | offen |
| E4-LEKT-LS | Lektorat Leistung × Ort | Lektor | Haiku | 2 | `_werkstatt/texte/leistung-ort.json` | E3-Tor | Z-12 | E4-W1…W3 | offen |
| E4-BAU-LS | Vorlage `/leistungen/[id]/[stadt]` (52 Seiten) | Baumeister | Haiku | 2 | `src/app/(bestand)/leistungen/[id]/[stadt]/page.tsx` | E3-Tor | Z-04, Z-12 | E4-W1…W3 | offen |
| E4-TEXT-MUSTER-1 | Texte Musterbäder 1 bis 6 (`musterbaeder.js`) als JSON | Texter | Haiku | 2 | `_werkstatt/texte/musterbaeder-1.json` | E3-Tor | Z-12 | E4-W1…W3 | offen |
| E4-TEXT-MUSTER-2 | Texte Musterbäder 7 bis 12 als JSON | Texter | Haiku | 2 | `_werkstatt/texte/musterbaeder-2.json` | E3-Tor | Z-12 | E4-W1…W3 | offen |
| E4-LEKT-MUSTER | Lektorat Musterbäder | Lektor | Haiku | 2 | `_werkstatt/texte/musterbaeder-*.json` | E3-Tor | Z-12 | E4-W1…W3 | offen |
| E4-BAU-MUSTER | Vorlage `/bad/musterbaeder/[slug]` (12 Seiten) | Baumeister | Haiku | 2 | `src/app/(bestand)/bad/musterbaeder/[slug]/page.jsx` | E3-Tor | Z-04, Z-12 | E4-W1…W3 | offen |
| E4-BAU-BLOG | Vorlage `/blog/[slug]` (Lesemodus, Wissensseite) | Baumeister | Haiku | 2 | `src/app/(bestand)/blog/[slug]/page.jsx`, `layout.jsx` | E3-Tor | Z-04, Z-12 | E4-W1…W3 | offen |
| E4-BAU-RECHT | Darstellung der 6 Rechtstexte (Inhalt unverändert, G8) | Baumeister | Haiku | 2 | 6 Seitendateien der Rechtstexte | E3-Tor | Z-04, Z-12 | E4-W1…W3 | offen |
| E4-ORCH-01 | Datentexte übertragen (`cities.ts`, `services.js`, `musterbaeder.js`, `topics.js`) | Orchestrator | Opus | 3 | gemeinsame Datendateien | E3-Tor | Z-04, Z-12 | E4-W1…W3 | offen |
| E4-TEXT-POST-01 | Artikel `/blog/handwerkerbonus-fliesenarbeiten` neu schreiben (Wissensseite), Bild aus `bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/handwerkerbonus-fliesenarbeiten.js` | E4-BAU-BLOG | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-01 | Lektorat `/blog/handwerkerbonus-fliesenarbeiten` | Lektor | Haiku | 2 | `src/config/posts/handwerkerbonus-fliesenarbeiten.js` | E4-TEXT-POST-01 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-02 | Artikel `/blog/undichte-dusche-warnzeichen` neu schreiben (Wissensseite), Bild aus `bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/undichte-dusche-warnzeichen.js` | E4-BAU-BLOG | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-02 | Lektorat `/blog/undichte-dusche-warnzeichen` | Lektor | Haiku | 2 | `src/config/posts/undichte-dusche-warnzeichen.js` | E4-TEXT-POST-02 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-03 | Artikel `/blog/feinsteinzeug-oder-naturstein-vergleich` neu schreiben (Wissensseite), Bild aus `bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/feinsteinzeug-oder-naturstein-vergleich.js` | E4-BAU-BLOG | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-03 | Lektorat `/blog/feinsteinzeug-oder-naturstein-vergleich` | Lektor | Haiku | 2 | `src/config/posts/feinsteinzeug-oder-naturstein-vergleich.js` | E4-TEXT-POST-03 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-04 | Artikel `/blog/fliesen-reinigen-pflegen` neu schreiben (Wissensseite), Bild aus `bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/fliesen-reinigen-pflegen.js` | E4-BAU-BLOG | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-04 | Lektorat `/blog/fliesen-reinigen-pflegen` | Lektor | Haiku | 2 | `src/config/posts/fliesen-reinigen-pflegen.js` | E4-TEXT-POST-04 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-05 | Artikel `/blog/barrierefreier-balkonaustritt` neu schreiben (Wissensseite), Bild aus `bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/barrierefreier-balkonaustritt.js` | E4-BAU-BLOG | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-05 | Lektorat `/blog/barrierefreier-balkonaustritt` | Lektor | Haiku | 2 | `src/config/posts/barrierefreier-balkonaustritt.js` | E4-TEXT-POST-05 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-06 | Artikel `/blog/wandnischen-dusche-planen` neu schreiben (Wissensseite), Bild aus `bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/wandnischen-dusche-planen.js` | E4-BAU-BLOG | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-06 | Lektorat `/blog/wandnischen-dusche-planen` | Lektor | Haiku | 2 | `src/config/posts/wandnischen-dusche-planen.js` | E4-TEXT-POST-06 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-07 | Artikel `/blog/duschrinne-oder-punktablauf` neu schreiben (Wissensseite), Bild aus `bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/duschrinne-oder-punktablauf.js` | E4-BAU-BLOG | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-07 | Lektorat `/blog/duschrinne-oder-punktablauf` | Lektor | Haiku | 2 | `src/config/posts/duschrinne-oder-punktablauf.js` | E4-TEXT-POST-07 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-08 | Artikel `/blog/schimmel-fliesenfugen-vermeiden` neu schreiben (Wissensseite), Bild aus `bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/schimmel-fliesenfugen-vermeiden.js` | E4-BAU-BLOG | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-08 | Lektorat `/blog/schimmel-fliesenfugen-vermeiden` | Lektor | Haiku | 2 | `src/config/posts/schimmel-fliesenfugen-vermeiden.js` | E4-TEXT-POST-08 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-09 | Artikel `/blog/fliesen-fuer-allergiker` neu schreiben (Wissensseite), Bild aus `bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/fliesen-fuer-allergiker.js` | E4-BAU-BLOG | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-09 | Lektorat `/blog/fliesen-fuer-allergiker` | Lektor | Haiku | 2 | `src/config/posts/fliesen-fuer-allergiker.js` | E4-TEXT-POST-09 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-10 | Artikel `/blog/rutschfeste-fliesen-r-klassen` neu schreiben (Wissensseite), Bild aus `bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/rutschfeste-fliesen-r-klassen.js` | E4-BAU-BLOG | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-10 | Lektorat `/blog/rutschfeste-fliesen-r-klassen` | Lektor | Haiku | 2 | `src/config/posts/rutschfeste-fliesen-r-klassen.js` | E4-TEXT-POST-10 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-11 | Artikel `/blog/fliesen-mythen-faktencheck` neu schreiben (Wissensseite), Bild aus `bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/fliesen-mythen-faktencheck.js` | E4-BAU-BLOG | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-11 | Lektorat `/blog/fliesen-mythen-faktencheck` | Lektor | Haiku | 2 | `src/config/posts/fliesen-mythen-faktencheck.js` | E4-TEXT-POST-11 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-12 | Artikel `/blog/gaeste-wc-fliesen` neu schreiben (Wissensseite), Bild aus `bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/gaeste-wc-fliesen.js` | E4-BAU-BLOG | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-12 | Lektorat `/blog/gaeste-wc-fliesen` | Lektor | Haiku | 2 | `src/config/posts/gaeste-wc-fliesen.js` | E4-TEXT-POST-12 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-13 | Artikel `/blog/fliesenleger-gesucht-geselle-meister` neu schreiben (Wissensseite), Bild aus `bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/fliesenleger-gesucht-geselle-meister.js` | E4-BAU-BLOG | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-13 | Lektorat `/blog/fliesenleger-gesucht-geselle-meister` | Lektor | Haiku | 2 | `src/config/posts/fliesenleger-gesucht-geselle-meister.js` | E4-TEXT-POST-13 | Z-12 | E4-W3 | offen |
| E4-PRUEF-A | Stufe A je Welle (unabhängig) und Textstichprobe 10 % (mindestens 5 Seiten) | Prüfer | Haiku | 1 | `$SCRATCH/E4-PRUEF-A*/**` | je Welle | Z-02, Z-12 | E4-W1…W3 | offen |
| E4-PRUEF-B | Stufe B der Etappe | Prüfer | Haiku | 1 | `_werkstatt/belege/e4/**` | E4-* | Z-02…Z-14 | E4-Tor | offen |

### E5 · Bilder, Referenzen, Adressen, Abbau
| Kennung | Gegenstand | Rolle | Modell | Stufe | Schreibrechte | Abhängig von | Kriterium | Welle | Status |
|---|---|---|---|---|---|---|---|---|---|
| E5-BILD-01 | Restliche Webfassungen (Galerie, Artikel, Ortsseiten, OG-Bild 1200 × 630) | Bildbearbeiter | Haiku | 2 | `public/images/arbeiten/**`, `_werkstatt/bilder/arbeiten.json` | E2-BILD-01 | Z-13 | E5-W1 | offen |
| E5-ORCH-01 | `arbeiten.ts` aus den Bilddaten übertragen; Generatorbilder aus allen Verwendungen entfernen (Leistungen, Musterbäder, Artikel, strukturierte Daten) (E-013) | Orchestrator | Opus | 3 | `src/config/{arbeiten.ts,services.js,musterbaeder.js}`, `src/lib/schema.ts` | E5-BILD-01 | Z-13, Z-14 | E5-W1 | offen |
| E5-BAU-01 | Referenzseiten `/referenzen/[id]`: ehrliche Themenansichten mit echten Fotos oder 308 auf die gefilterte Galerie (E-013) | Baumeister | Haiku | 2 | `src/app/(bestand)/referenzen/[id]/page.jsx`, `src/config/projects.js` (nur Kennzeichnung), Weiterleitungen meldet er | E5-ORCH-01 | Z-12, Z-14 | E5-W2 | offen |
| E5-ORCH-02 | Weiterleitungen und Sitemap: 308 aus E5-BAU-01 in `next.config.ts`, Sitemap angleichen, echtes OG-Bild mit richtigen Maßen, Video-Sitemap ohne fehlende Videos | Orchestrator | Opus | 3 | `next.config.ts`, `src/app/sitemap.ts`, `src/lib/metadata.ts`, `src/shared/config/site.ts`, `src/app/video-sitemap.xml/route.ts` | E5-BAU-01 | Z-14 | E5-W2 | offen |
| E5-ORCH-03 | Abbau entfallender Bewegung und toter Teile (Kreuzlinie, Flucht, Planblatt-Szene, Einzugsband, Fugenband, Plan-Morph), Register und Werkzeuge angleichen | Orchestrator | Opus | 3 | `bewegung.css`, `register.ts`, `register.json`, betroffene Komponenten | E4-Tor | Z-05, Z-03 | E5-W2 | offen |
| E5-PRUEF-B | Stufe B der Etappe | Prüfer | Haiku | 1 | `_werkstatt/belege/e5/**` | E5-* | Z-02…Z-14 | E5-Tor | offen |

### Abschluss
| Kennung | Gegenstand | Rolle | Modell | Stufe | Schreibrechte | Abhängig von | Kriterium | Welle | Status |
|---|---|---|---|---|---|---|---|---|---|
| AB-PRUEF-C | Stufe C (Endprüfung) mit Stichprobe 10 %, allen Adressen, Probeläufen, Systemschrift 200 % | Prüfer | Haiku | 1 | `_werkstatt/belege/abschluss/**` | Kür leer | Z-01…Z-14 | AB | offen |
| AB-DOK-01 | BERICHT.md, Vorher-Nachher-Galerie (`_werkstatt/bilder/galerie.html`), blinder Vergleich (neutral benannt, Schlüssel getrennt), Anleitung Zusammenführen und Zurückrollen | Dokumentar | Haiku | 1 | `_werkstatt/BERICHT.md`, `_werkstatt/bilder/abschluss/**` | AB-PRUEF-C | Z-04, Z-10 | AB | offen |
| AB-END | Endprüfung jedes Kriteriums gegen Beleg (frischer Opus-Unteragent, keine Tests) | Juror | Opus | 3 | `_werkstatt/berichte/ABSCHLUSS.md` | AB-DOK-01 | Z-01…Z-14 | AB | offen |

## Kür (nach Wirkung)
| Kennung | Gegenstand | Kriterium | Status |
|---|---|---|---|
| KUER-01 | Feinschliff nach Jury: jede Hauptansicht, jede Kategorie unter 9 wird ein Paket (höchstens 2 Runden je Ansicht und Kategorie) | Z-04 | offen |
| KUER-02 | Klang „leises Klacken je Spalte“ (Einstellung KLANG Alternative), nur nach Interaktion, mit Schalter | Z-05 | offen |
| KUER-03 | Halbverband als Alternative für B-01 testen (Einstellung SEITENWECHSEL Alternative) und per Jury entscheiden | Z-04 | offen |
| KUER-04 | Badplaner und Badanfrage zusammenlegen, falls Probeläufe Verwirrung zeigen (E-012 Umkehrprobe) | Z-11 | offen |
| KUER-05 | Ortsseiten: gezeichnete Karte mit Anfahrt je Ort | Z-04 | offen |
| KUER-06 | Artikelbilder je Abschnitt (zweites Foto) | Z-13 | offen |
| KUER-07 | Fuß: Öffnungszeiten als „Jetzt geöffnet“ ohne Uhrzeit-Hydrierfehler | Z-11 | offen |
| KUER-08 | Druckansicht der Wissensseiten | Z-09 | offen |

## Offene Punkte
- (wird an Etappentoren ergänzt)

## Anhang · Fassung 0 (wörtlich, im Chat freigegeben am 23.10.2026)

## Context

**Warum:** Deniz Tezgel findet seine eigene Website schwer verständlich, und ein Kunde hat sich nicht zurechtgefunden. Die Erkundung (E0, nur lesend, bereits gelaufen) bestätigt die Ursachen:
- 5 Aufklappmenüs mit 37 Zielen und 3 Ebenen. Das Bad steht dreimal darin. Fachwörter stehen schon in der Navigation (DIN 18534, Verbundabdichtung, Estrichspachtelung, Stelzlager).
- 9 Anfragewege in 8 Komponenten; Badplaner und Badanfrage sind sogar dieselbe Komponente. Die Startseite hat 3 Formulare.
- 830 Gedankenstriche in 217 Dateien. „Vor-Ort-Aufmaß“ steht 132-mal da, „Verbundabdichtung“ 114-mal. Die H1 der Startseite lautet „Perfektion auf jedem Quadratmeter.“
- „5,0 von 527“ entsteht im Textinhalt, weil „5,0 von 5“ und „27 Google-Rezensionen“ ohne Trenner aneinanderstoßen (`GoogleReviewsBadge.tsx:35-38`). Screenreader und Suchschnipsel lesen es genau so.
- Es gibt keine echten Projektfotos. Die 11 Bad-Fotos in `public/images/bad` tragen laut früheren Notizen Generatorzeichen (M-02, M-19). Die 6 Referenzprojekte sind `placeholder: true`, obwohl die Seite „Echte Referenzen“ sagt.

**Ziel (Nordstern):** Jeder Laie versteht tezgel.de ohne Hilfe. Prüfstein ist P1, eine Frau von 72 Jahren, die am Handy die Wanne gegen eine bodengleiche Dusche tauschen will. Echte Bilder und eine durchgehende Geschichte zeigen die Arbeit. Intro, Seitenwechsel „Verlegen“ und Bewegung mit Sinn bringen die Gestaltung auf Award-Niveau. Alle 170 Adressen, alle Funktionen, Rechtstexte, Stimmen und Firmendaten bleiben erhalten.

**Ausgangslage im Code:**
- Next.js 16.3.6, React 19.2.4, Tailwind 4.3, kein CMS (Texte in TSX und `src/config/*`), Root-Layout `src/app/(bestand)/_dokument.tsx`.
- 170 Adressen: 70 statisch, 100 aus Daten (13 Orte, 52 Leistung × Ort, 13 Artikel, 12 Musterbäder, 6 Referenzen, 4 Leistungen).
- KERN v2 „Verlegeplan“ der Vorläufe: Kalk, Fliese und Tinte mit einem Laser-Rot, Archivo und IBM Plex Mono, 45 eigene Icons (Sprite, 1,5er Strich), 16 Bewegungskennungen, Tailwind-Palette gesperrt. Als Seitenwechsel gibt es nur den Plan-Morph `/leistungen → [id]`.
- Branch `claude/tezgel-website-redesign-iqxt8z` = main (388fa7b, live) + 3 Bild-Commits vom 23.10.: 81 Social-Zuschnitte und 84 Originale (iPhone-Screenshots, meist 1320 px breit) in `_werkstatt/bilder/referenzen/`.

## Grundentscheidungen vor dem Start (gehen in ENTSCHEIDUNGEN.md)

1. **Arbeitsbranch:** `claude/tezgel-website-redesign-iqxt8z`. Die Sitzungsvorgabe geht dem Standard `werkstatt/tezgel-…` und dem veralteten Branch im CLAUDE.md-Block vor. Push nur dorthin (`git push -u origin claude/tezgel-website-redesign-iqxt8z`), nach jeder Welle und mindestens stündlich. Nie main, nie erzwungen, kein Deploy. Automatische Vercel-Vorschauen des Branchs sind erlaubt (G3).
2. **Neuer Lauf, keine Wiederaufnahme:** Das vorhandene `_werkstatt` gehört zu einem früheren, formell beendeten Lauf (HALT/ÜBERGEBEN). Seine Dokumente ziehen per `git mv` nach `_werkstatt/archiv/2026-10-werkstatt/`. `_werkstatt/werkzeuge` bleibt und wird erweitert; `_relaunch` bleibt unberührt. Wiederverwendbares übernehme ich mit Fundstelle: KERN v2 als Ausgangspunkt, Funktionsliste, Werkzeuge, Lernpunkte aus `_relaunch/LERNEN.md`.
3. **Fehlender Auftragsteil:** `_werkstatt/AUFTRAG.md` enthält den Auftrag wörtlich bis zur Abbruchstelle. Darunter folgt ein markierter Block „ERGÄNZUNG · rekonstruiert (Annahme)“ (deine Wahl). Er enthält den Rest von Stufe B, Stufe C, die Award-Rubrik, Z-01 bis Z-14, L0 bis L7, Statuszeile und Start, abgeleitet aus dem Vorgänger-Auftrag und den Abschnitten 6 bis 11. Kurzfassung siehe „Abnahme“ unten.
4. **Bildquelle:**
   - BILDQUELLE sind die 84 Originale. In E0 kommt `/_eingang/` in die .gitignore, die Originale werden nach `_eingang/entpackt/` kopiert und per `git rm` aus dem Baum genommen (G4: Originale nie im Commit).
   - Wiederherstellung bei neuer Umgebung: `git checkout 35af5cc -- _werkstatt/bilder/referenzen/originale` und verschieben (steht in EINRICHTUNG.md).
   - Die 81 Social-Zuschnitte bleiben als Arbeitsmaterial. Webfassungen entstehen neu aus den Originalen, mit entfernten Metadaten.
   - Weil das Repo laut Vorlauf öffentlich ist und die Originale schon in der Geschichte stehen, kommt das als dringender Punkt in MENSCHEN.md. Empfehlung: zusammenführen per Squash, Repo-Sichtbarkeit prüfen; Personenbilder IMG_2542/43/47 betroffen.
5. **Modelle und Plätze:**
   - Jeder Haiku-Agent wird mit `model: 'haiku'` aufgerufen, Prüfer und Texter mit hoher Denkstufe, reine Fleißarbeit niedriger. 5 Haiku-Plätze.
   - Dieser Container hat 4 Kerne, deshalb begrenzt ein Workflow auf 2 gleichzeitige Agenten. Rechenleichte Wellen (Texte, Lektorat, Bildsichtung) laufen in bis zu zwei parallelen Workflows plus Hintergrundagenten, zusammen höchstens 5.
   - Rechenintensives (Build, Lighthouse, Playwright) läuft strikt nacheinander; Lighthouse in einem eigenen Ruhefenster.
   - Höchstens 2 Reinraum-Kopien gleichzeitig (Plattenbudget).
   - Orchestrierung: Jede Welle läuft als Workflow-Skript: Bau oder Text durch Haiku, dann unabhängige Stufe-A-Prüfung durch einen zweiten Haiku-Agenten, dann meine Abnahme an Bericht, Diff und Bild.
   - Tore laufen mit unabhängigen Gutachtern. Befunde werden gegengeprüft, bevor sie Pakete werden.
6. **Takt und Gedächtnis:**
   - PRUEFPUNKT nach jedem Paket, eine STATUS-Zeile stündlich, Push nach jeder grünen Welle.
   - Zwei Routinen in diese Sitzung: „Morgenbericht“ täglich 06:47 Europe/Berlin (damit er um 07:00 steht) und ein stündliches „WEITER“, das nach Leerlauf oder Containerwechsel an PRUEFPUNKT.md fortsetzt (L5).
   - Morgenbericht in BERICHT.md: höchstens 20 Zeilen, du-Anrede, ohne Fachjargon, höchstens 6 Bilder (≤ 1440 px) je Tag. Ins Repo kommen nur die Bildsätze von E0, Referenz und Abschluss.
7. **Umgebung und Einstellungen:**
   - UMGEBUNG ist hier die Cloud, nicht lokal. Alle übrigen Einstellungen gelten wie in Abschnitt 0.
   - KLANG aus. MUT „deutlich sichtbar neu“: Wiedererkennung tragen nur Logo, Farbwelt und Firmendaten.
   - Pakete folgen dem 11-teiligen Paket-Bauplan, Berichte haben höchstens 600 Wörter.
   - Zu Beginn jeder Etappe lese ich KERN, PLAN und ABNAHME und verankere mich in drei Sätzen am Nordstern.
   - Vor jeder Welle prüfe ich `_eingang` und die Bildquelle neu.
8. **Vorrang bei Konflikten** wie im Auftrag. Besonders:
   - Pflichtfelder und Empfänger bleiben (G8). Alle Formulare verlangen heute nur Name und Telefon, plus Einwilligung bei Preisrechner, Konfigurator, Kalender und Schnellanfrage. Der Hauptweg kommt also ohne Eingriff auf höchstens 4 Pflichtangaben.
   - Fehlende Einwilligungs-Häkchen in 4 Formularen sind eine Rechtsfrage für MENSCHEN.md und keine Änderung.

## Ablauf

### E0 · Start und Ausgangswerte (Tag 1)
1. **E0-ORCH-01 (ich):**
   - .gitignore um `/_eingang/` ergänzen, Originale verschieben, alte Dokumente archivieren.
   - AUFTRAG.md mit Ergänzung schreiben, CLAUDE.md-Block mit Marken ersetzen (alter Werkstatt-Block → neuer Block mit diesem Branch).
   - STATUS.md und PRUEFPUNKT.md anlegen.
   - Kundschafterberichte E0-KUND-01 bis -09 und die beiden Technikgutachten nach `_werkstatt/berichte/` schreiben; Bildsichtung und Technikwerte nach `_werkstatt/bildinventar.csv`.
   - Drei Streudateien außerhalb des Repos löschen, die Kundschafter versehentlich angelegt haben: `/tmp/x`, `/root/.cache_tezgel_home.html`, `/root/.noop`.
   - Committen, pushen, Routinen anlegen.
2. **E0-PRUEF-01 (Haiku · Prüfer):**
   - `npm ci`, Build, Start über `server.sh` (Port 4310) und `dev-server.sh` (4320).
   - Werkzeuge per `npm ci` in `_werkstatt/werkzeuge`, `node_modules` als Symlink in den Scratchpad.
   - Feste alte Sitzungspfade in den Skripten auf eine Variable umstellen. Fehlende Abhängigkeiten (chrome-launcher, @babel/*, magic-string) in deren package.json eintragen.
   - `lighthouse.mjs`: frisches Chrome-Profil je Lauf, damit localStorage leer ist und das Intro in jedem Lauf vorkommt. LCP-Element und Zeitpunkt werden mitgeschrieben.
   - EINRICHTUNG.md aktualisieren.
3. **E0-PRUEF-02a–d (Haiku · Prüfer), neue Werkzeuge:**
   - a: Gerätegrößen in `lib.mjs` auf alle 10 erweitern; Prüfung „Erstes Bild“ (Logo, H1, Ort, Hauptknopf, Telefon oder WhatsApp vollständig im ersten Bildschirm, je Gerätegröße).
   - b: `lesbarkeit.mjs` über die gerenderte Seite:
     - Flesch nach Amstad, mittlere Satzlänge, längster Satz, Sätze je Absatz;
     - Gedanken- und Bindestriche gegen die Liste K-010-B, Floskeln K-010-F;
     - Glossarwort beim ersten Vorkommen mit Erklärung (über `<dfn data-glossar>` und `data-erklaert`);
     - Titel ≤ 60, Beschreibung 120 bis 155, Alt-Texte ≤ 125;
     - Rechtstexte und wörtliche Stimmen ausgenommen.
   - c: Linkprüfer und Crawler für `adressen-e0.csv` (Status, Titel, Beschreibung, H1, Canonical, strukturierte Daten, Suchbegriffe).
   - d: Laufwerkzeug aus `_relaunch/werkzeuge/probelauf.mjs` übernehmen (tippe, scrolle, zurück, Schrittzähler, sichtbare Bedienelemente), dazu Attrappen für Formularziele, Analyse und WhatsApp (G5) und eine Einstellung für große Systemschrift.
4. **E0-PRUEF-03 (Haiku · Prüfer), Ausgangswerte Stufe B auf den 12 Hauptansichten:**
   - Build, Typprüfung, Linter, Suite (37 Tests plus 13 Funktionsspecs), Konsolenfehler.
   - Bildsatz in 10 Größen mit Überlauf und Erstem Bild, axe, Lighthouse mobil und Desktop als Median aus 3, reduzierte Bewegung, Lesbarkeit, Links.
   - Danach Durchlauf der Funktionsliste.
5. **E0-PROBE-01–10 (Haiku · Probeläufer):** P1 bis P5 lösen A1 bis A6 auf dem alten Stand, je mobil und am Desktop. Das ist der Vorher-Wert der Nutzerführung.
6. **E0-ORCH-02 (ich):**
   - Hauptansichten festlegen: `/`, `/bad`, `/bad/badsanierung`, `/bad/barrierefreies-bad`, `/leistungen`, `/fliesen`, `/balkon-terrasse`, `/referenzen`, `/ueber-uns`, `/kontakt`, `/standorte/wetzlar`, `/blog`.
   - LAGEBILD.md schreiben und Faktenblatt-Entwurf K-015 mit allen Widersprüchen.

### E1 · Plan, einmal gründlich (Tag 1 bis 2, ich)
- Denkprotokolle (Ziel, drei Wege, Bewertung, Umkehrprobe, Folgen):
  - Leitidee, Informationsarchitektur und Navigation, Zusammenlegen der Werkzeuge, B-01-Technik, B-02-Weg;
  - Auswahl der großen Momente, Bildablage, Umgang mit Generatorbildern und Platzhalter-Referenzen;
  - Werkzeugbibliotheken (sharp, potrace, Schriftdateien nur in `_werkstatt/werkzeuge`).
- KERN.md v3 als Weiterentwicklung von v2 mit K-001 bis K-015, darin:
  - der Erzählbogen der ganzen Seite in drei Sätzen;
  - Skalen statt Einzelwerten für Abstände, Schrift, Dauern, Kurven, Radien und Schatten. Das Fugenraster ist das Grundraster; Abstände leiten sich aus Fliese und Fuge ab.
  - Logo-Farben bleiben exakt (#0F172A, #DC2626). Ob `tinte` und `laser` darauf angeglichen werden, entscheide ich per Kontrastrechnung.
- Vier Referenztexte: `/`, `/bad/barrierefreies-bad` (Bereich), `/untergrund-abdichtung/din-18534` (Wissen), `/standorte/wetzlar` (Ort).
- Bildplatzliste `bildplaetze.md`.
- PLAN.md (alle Pakete mit Kennung, Rolle, Modell, Schreibrechten, Abhängigkeit, Kriterium), ABNAHME.md, MENSCHEN.md (Fragebogen an Deniz, ≤ 10 Fragen).
- Planprüfung durch einen Haiku-Prüfer, höchstens 2 Runden.

### E2 · Referenz: Kernsysteme und Startseite (Tag 2 bis 4, ich baue selbst)
- Zuerst E2-ORCH-00, die Ursache des LCP auf `/` mobil:
  - Letzter Messwert vom 13.10.: 3,46 s bei FCP 1,38 s, Lighthouse 90. LCP-Element ist ein Absatz. Kandidaten: Schriftwechsel bei Archivo, Startzustände der Bewegung, späte Abschnitte.
  - Ich behebe sie, bevor Intro und Startbild dazukommen, weil das Budget daran hängt.
- Designsystem-Erweiterung, Formsystem mit Icons (eine Familie, ein Strich), Kopf, Navigation, Fuß, Brotkrumen, Markierung der aktuellen Seite.
- 404 mit Charakter (eine verrutschte Fliese) und den drei wichtigsten Wegen: Startseite, Termin anfragen, Anrufen.
- B-01, B-02 und die Startseite auf Zielniveau. Haiku erledigt Bildbearbeitung und Prüfungen.
- Erstes Bild auf allen 10 Gerätegrößen. Am Handy quer nehmen Kopf und Leisten höchstens ein Viertel der Höhe ein.
- Tor:
  - Stufe B für `/`;
  - Probelauf P1 und P5 mit A1 bis A3;
  - Sichtabnahme durch einen frischen Opus-Unteragenten nach Rubrik, Ansichtswert ≥ 8.
- Höchstens 2 Anläufe, danach ist `/` das Muster.

### E3 · Seitenvorlagen und Hauptansichten (Tag 4 bis 5)
- Ich baue die Vorlagen je Seitenart (gemeinsame Dateien): Erzählseite, Wissensseite, Ortsseite, Arbeitsseite. Grundlage ist die Seitenformel: Worum es geht, Ihre Lage, Was wir tun, So läuft es ab, Beleg, Nächster Schritt.
- Die übrigen 11 Hauptansichten laufen als Paare: Baumeister (Haiku) baut nach Vorlage und Referenz, Texter (Haiku) schreibt nach Referenztext, Lektor (Haiku) prüft eine Welle später.
- Texte in gemeinsamen Datendateien (`cities.ts`, `services.js`, `company.js`, `topics.js`, `musterbaeder.js`, `projects.js`) liefern Texter als Datei in `_werkstatt/texte/<Kennung>.json`. Ich übertrage sie am Wellenende.
- Stufe B am Etappenende, Probeläufe P1 bis P5 auf allen A-Aufgaben.

### E4 · Alle übrigen Seiten (Tag 5 bis 8)
- Wellen nach Dateihoheit:
  - 25 Wissensseiten unter `/fliesen`, `/untergrund-abdichtung`, `/balkon-terrasse`, `/naturstein`, `/treppen`;
  - Bad-Unterseiten und Musterbäder, `/blog` mit 13 Artikeln;
  - 13 Ortsseiten und 52 Leistung-mal-Ort-Seiten (Text aus Daten, echte Angaben wie Entfernung und Anfahrt);
  - Arbeitsseiten (Werkzeuge, `/termin`, `/beratung`, `/faq`, `/preise`, `/downloads`, `/login`), Rechtstexte nur gestalterisch.
- Textstichprobe je Welle (10 %, mindestens 5 Seiten). Verfehlen mehr als 10 % die Regeln, geht die Welle zurück.

### E5 · Große Momente, Galerie, Bilder vollständig (Tag 7 bis 9, parallel zu E4)
- Galerie „Unsere Arbeiten“ auf `/referenzen` mit Raumfilter.
- Vorher-Nachher-Regler (Außentreppe IMG_2527 → IMG_2525). „So entsteht eine bodengleiche Dusche“ als Zweierbild (IMG_2555 → IMG_2549, andere Blickwinkel, deshalb kein Regler).
- Je Erzählseite ein großer Moment, Bildplätze nach Liste, Weiterleitungen für zusammengelegte Werkzeuge.

### Kür (nach Wirkung)
- Zuerst Feinschliff: Ein Haiku-Juror bewertet jede Hauptansicht nach der Rubrik. Jede Kategorie unter 9 wird ein Paket, höchstens 2 Runden je Hauptansicht und Kategorie.
- Dann die übrigen Kürpakete aus PLAN.md. Neue Pakete entstehen nur aus Lücken der Abnahmeliste oder aus Befunden von Sichtabnahme und Jury.

### Abschluss
- Stufe C, BERICHT.md, Vorher-Nachher-Galerie als eigene Seite in `_werkstatt/bilder`.
- Anleitung zum Zusammenführen (Squash, `_werkstatt` und `_relaunch` vorher entfernen) und zum Zurückrollen; MENSCHEN.md vollständig.
- Ein frischer Opus-Unteragent bestätigt jedes Kriterium gegen seinen Beleg. Sein Urteil gebe ich wörtlich wieder. Danach Block aus CLAUDE.md entfernen, committen, pushen, Statuszeile ABSCHLUSS.

## Kernsysteme, Richtung (endgültig per Denkprotokoll in E1/E2)

**Leitidee (Entwurf):** „Klar verlegt.“ Jede Seite legt dem Kunden eine Sache nach der anderen hin: Fliese für Fliese, im festen Fugenraster, an einer geraden Linie, bis das Ganze fertig daliegt wie ein Boden von Deniz Tezgel.
- Daraus folgt: ein Gedanke je Block, Versatz als bewusster Bruch, die Laserlinie zur Orientierung, und Bewegung, die setzt und nie federt.
- Austauschprobe: Weder Bäckerei noch Steuerbüro haben Verband, Fuge, Gefälle oder Laser.

**Informationsarchitektur (Kandidat, wird in E1 per Baumtest mit 5 Haiku-Personen geprüft):**
- Fünf Hauptpunkte, je höchstens eine Aufklappebene, kein Thema doppelt:
  - **Bad**: komplett erneuern, Dusche statt Wanne, große Fliesen, alles aus einer Hand, Beispielbäder;
  - **Böden und Wände**: Küche, Flur, Wohnräume, Treppen, Naturstein, Reparatur und Fugen;
  - **Balkon und Terrasse**;
  - **Unsere Arbeiten**;
  - **Über uns**: Deniz Tezgel und Team, Wo wir arbeiten, Ratgeber, Fragen und Antworten, Kontakt.
- Immer sichtbar: Hauptknopf „Termin vor Ort anfragen“ und Telefon. Mobil zusätzlich die vorhandene untere Leiste mit Anrufen, WhatsApp und Anfrage.
- Fachthemen wie Untergrund und Abdichtung stehen im Fuß (vollständiger Index) und in der jeweiligen Seite, aber nicht im Kopf.
- Mobilmenü passt ohne Scrollen auf 360 × 740.

**Anfrage-Hauptweg:**
- Ein Formular „Termin vor Ort anfragen“ mit der vorhandenen HeroContactForm-Logik. Pflicht sind Name und Telefon, Ziel `general`, Empfänger info@tezgel.de unverändert. Es steht oben auf `/kontakt` und einmal unten auf der Startseite, daneben Anruf und WhatsApp.
- Preisrechner und Express-Funnel verlassen die Startseite; sie bleiben auf ihren übrigen Seiten erhalten.
- Werkzeuge (Badplaner, Projektcheck, Konfigurator, Kalender) erscheinen als „Hilfen“ unter dem Hauptweg.
- Zusammenlegen nur, wo es dieselbe Funktion ist: Kandidat `/bad/badplaner` → `/bad/badanfrage` mit 308. Endgültig per Denkprotokoll, alte Adressen leiten dauerhaft weiter.
- „Kostenfrei“ beim Termin vor Ort ist Bestand und bleibt sinngleich.

**B-01 „Verlegen“, gewählte Richtung:** eine eigene Überlagerung statt View-Transition-Pseudoelementen. Nur so geht „erst bedecken, dann wechseln, bei Wartezeit Laserlinie bis 3 s“ in allen Browsern.
- Ein Gutachter hat den Quelltext von Next 16.3.6 geprüft (Next liefert dafür sein eigenes React 19.3 Canary). Ergebnis: Für Klicks ist der Ansatz tragfähig, mit den folgenden Korrekturen.
- Aufbau:
  - Client-Komponente in `_dokument.tsx` außerhalb von `main`. Sie wird nur mit `usePathname` gebaut; `useSearchParams` im Root-Layout würde ohne Suspense alles clientseitig rendern.
  - Fester Layer mit `aria-hidden` und höchstens 80 DOM-Fliesen über WAAPI, nur `transform` und `opacity`. Der Schatten ist eine eigene Ebene mit Deckkraft.
  - Die Fliesen entstehen erst bei der ersten Navigation, damit DOM-Größe und TBT der Erstansicht unberührt bleiben.
  - Während des Wechsels fängt der Layer Klicks ab (`pointer-events: auto`), und `header`, `main` und `footer` sind `inert`.
- Abfangen per Klick-Listener in der Capture-Phase für interne Links:
  - `next/link` prüft nach dem eigenen onClick `e.defaultPrevented` (link.tsx#L692). Der Listener erfasst auch reine `<a>`, etwa Markdown-Links und Kartenlinks.
  - Ausgenommen sind Zusatztasten, `target`, `download`, `tel:`, `mailto:`, WhatsApp, externe Links, Anker auf derselben Seite, dieselbe Adresse, Formulare und Links mit `data-kein-verlegen` (dafür alle Links mit `replace` oder `scroll={false}` markieren).
  - Beim Klick sofort `router.prefetch(href)`.
- Ablauf:
  - Verlegen über ~45 % der Dauer: Verband nach SEITENWECHSEL, Kante von rechts nach links, neue Fliesen unter der gelegten Kante, Größe 1,06 auf 1,0 ohne Nachfedern.
  - Dann `router.push` in `startTransition`. Abschluss erkannt über `isPending` und den `usePathname`-Commit plus zwei Frames, mit Zeitlimit.
  - Danach Scroll nach oben (`behavior: 'instant'`, weil global smooth gesetzt ist) und Fokus auf die H1 (`tabindex=-1`). Next setzt keinen Fokus; die Titelansage kommt vom Routen-Ansager von Next. Auf Doppelansage per Screenreader-Test achten.
  - Weiterziehen über ~40 %: Spalten ziehen links aus dem Bild, die linke Spalte startet zuerst, also überholt keine Fliese eine andere.
- Größenwahl: etwa 3 Fliesen je Reihe bei 390 px und etwa 8 bei 1440 px, gedeckelt auf 80. Fuge 1 % der kurzen Seite, mindestens 2 px.
- Dauer: der erste Wechsel einer Sitzung ≤ 1.200 ms, ab dem zweiten ≤ 900 ms (sessionStorage). Doppelklicks sperrt ein Zustandsautomat.
- Zurück und Vor (gespiegelt, 70 % der Dauer), zwei Wege; in E2 entscheide ich per Denkprotokoll und Playwright-Test:
  - (a) **Aufschub:**
    - Ein `popstate`-Lauscher in der Capture-Phase, registriert auf Modulebene (wegen Firefox 111 bis 115), stoppt das Ereignis, verlegt gespiegelt und schickt es dann mit dem aktuellen `history.state` neu ab. Next prüft `isTrusted` nicht.
    - Durchlassen bei `!state?.__NA` und reinen Hash-Wechseln; abbrechen, wenn sich `location` inzwischen geändert hat.
    - Die Scrollposition merkt er selbst (`scrollRestoration = 'manual'`).
  - (b) **Sicher:**
    - Im Capture-Lauscher liegt der Boden sofort fertig (statisch), das Ereignis läuft unverzögert weiter. React rendert beim popstate synchron, der Browser stellt den Scroll selbst wieder her.
    - Danach Weiterziehen in gespiegelter Richtung.
  - (a) ist näher am Auftrag; (b) ist der Rückfall, falls (a) die Tests nicht besteht.
- Reduzierte Bewegung: Überblendung 150 ms.
- Der Plan-Morph `/leistungen → [id]` entfällt zugunsten eines einzigen Systems. Laufende View Transitions würden benannte Elemente über die Überlagerung heben.
- Vor dem Bauen lese ich die Next-16-Doku zu Link, Router, View Transitions und Scroll in `node_modules/next/dist/docs/`.

**B-02 „Logo zeichnet sich“:**
- Vektorweg:
  - Die Wortmarke ist laut Logo-SVG in „Plus Jakarta Sans“ 900 gesetzt (OFL). In E2 baue ich sie per Schriftkontur nach und prüfe alternativ gegen Inter.
  - Das Maskottchen entsteht per Farbebenen-Nachzeichnung (potrace als Werkzeug) und wird zu wenigen glatten Pfaden bereinigt.
  - Abnahme per Skript: Formflächen bei doppelter Größe ≥ 98 % deckungsgleich, Farben exakt #0F172A, #DC2626, #DE5126 usw. aus dem PNG.
- Ablauf:
  - Kontur zeichnet sich (~1.000 ms): `stroke-dashoffset` direkt auf den Umrisspfaden, ohne Maske. Das ist die einzige dokumentierte Ausnahme von „nur Lage, Größe, Drehung, Deckkraft“, begründet mit B-02 selbst.
  - Flächen füllen sich (~400 ms), überlappend mit dem Ende der Kontur.
  - Das Logo gleitet per FLIP (nur `transform`) an seinen Platz im Kopf (~600 ms). Gleichzeitig ziehen Fliesen die Decke von der Startseite ab, sodass der sichtbare Teil stetig wächst.
  - Ziel ist eine deckende Phase ≤ 800 ms und gesamt ≤ 1.600 ms; Obergrenze 2.200 ms.
- Auslösung:
  - Ein Inline-Kopfskript setzt die Klasse nur beim ersten Besuch je Browser (localStorage, im Fehlerfall kein Intro).
  - Der Beenden-Lauscher steckt im Kopfskript (passiv, `once`, setzt nur eine Klasse). Aufräumen erst nach dem nächsten Bild.
  - Reduzierte Bewegung: Einblenden in 300 ms.
- Leistung (Gutachten Lighthouse 13.5):
  - Verdeckter Inhalt zählt als LCP, solange er mit Deckkraft > 0 malt. Deshalb nie `opacity: 0` oder `visibility: hidden` auf html, body oder main.
  - Die Überlagerung ist kein LCP-Kandidat: nur `path` und `rect`, kein `<image>`, kein `url()`, kein Text. Sie ist in Kalk gehalten, weil der Speed Index Farbverteilungen vergleicht.
  - Keine Scroll-Sperre per `overflow: hidden`, weil die Scrollleiste sonst die Breite verschiebt (CLS). Das Kopf-Logo wird nur per Deckkraft versteckt.
  - Das Lighthouse-Werkzeug leert localStorage bisher nicht und nutzt eine Chrome-Instanz für alle Läufe. E0-PRUEF-01 stellt auf ein frisches Profil je Lauf um und weist Läufe mit und ohne Intro getrennt aus.
- Gelingt die 98-%-Prüfung nicht: Ersatz-Intro „Der erste Boden“ und Bitte um Vektordatei in MENSCHEN.md.

**Bilder:**
- Bearbeitung per Skript mit `sharp` in `_werkstatt/werkzeuge`: Ränder der Screenshots weg, Ausrichtung, nur Belichtung und Weißabgleich, Zuschnitt nach Bildplatz und Schwerpunkt, keine Hochskalierung, Metadaten weg.
- Ablage `public/images/arbeiten/<raum>/<sprechender-name>.jpg`. Einbau über `next/image` mit festen Maßen, `sizes`, Platzhalter (vorab erzeugte blurDataURL) und `preload` nur für das Startbild.
- Befund der Sichtung (81 Zuschnitte, 84 Originale):
  - Qualität: 4 Bilder mit Note A, 72 mit B, 5 mit C. Kein Querformat, keine Standortdaten. Alle Zuschnitte tragen EXIF-Bildtexte, die Webfassungen entfernen sie.
  - Viele Bäder zeigen die fertigen Fliesen bei noch offener Sanitärmontage. Die Alt-Texte sagen das ehrlich.
  - Wegschneiden oder weglassen: Kind im Hintergrund (Balkon Steinoptik), Gesichter auf zwei Stelzlager-Fotos, Logo eines Autohauses auf zwei Treppen-Fotos, Markenaufdrucke (Dosen, Klebeband).
  - Ein starkes Echtheitsbild: Mitarbeiter von hinten im Pullover mit Tezgel-Logo (Balkon, Dichtband).
  - Herkunft klären: Die Schiefer-Dusche mit Glaswand wirkt wie ein Herstellerfoto, IMG_2577 ist ein Bildschirmfoto aus einem Bildbetrachter. Beide bis zur Antwort nicht verwenden.
- Startbild: „Bodengleiche Dusche mit großen grauen Fliesen und Glaswand“ (Note A, 4:5). Es ist das Ziel von P1 und zeigt sichtbar Fugenraster. Am Desktop steht es in der rechten Spalte statt als Vollbild, weil die Quellen höchstens 1320 px breit sind.
- Die Generatorbilder in `public/images/bad` verschwinden aus allen Verwendungen (Leistungen, Musterbäder, Artikel, OG-Bild). Die Dateien bleiben vorerst liegen; Löschung steht in MENSCHEN.md.
- Platzhalter-Referenzen `/referenzen/[id]`: jedes Projekt wird zur ehrlichen Themenansicht mit echten Fotos und ohne erfundene Projektangaben, oder zur 308 auf die gefilterte Galerie, wenn keine passenden Fotos da sind.
- Personen, Kind im Hintergrund und Autohaus-Logos werden weggeschnitten oder das Bild entfällt; die Liste kommt in MENSCHEN.md.

**Texte:**
- Gemeinsame Bausteine `Fachwort` (dfn plus Erklärung) und `Abschnitt` nach Seitenformel.
- Glossar K-011 aus der Zählung, mit über 80 Kandidaten wie Verbundabdichtung, DIN 18534, Stelzlager, Kuvertschnitt, Nivelliersystem, Belegreife.
- K-010-B startet mit E-Mail, Gäste-WC, Lahn-Dill-Kreis, Marburg-Biedenkopf; geprüft wird Walk-in-Dusche als Suchbegriff. „Vor-Ort-Aufmaß“ wird durchgehend zu „Termin bei Ihnen vor Ort“.
- Suchbegriffe je Seite aus `adressen-e0.csv` bleiben natürlich im Text.
- Faktenblatt K-015 nur mit Fundstelle. Widersprüche (5 oder 12 Mitarbeitende, Fr 17 oder 18 Uhr, Rückruf 24 h oder 24 bis 48 h, Radius 45 oder 25 km, 260 oder 278 cm, „Über 15 Jahre“) bleiben bis zur Antwort auf der vorsichtigen Bestandsfassung. Alle Versprechen kommen zur Bestätigung in MENSCHEN.md.

**Gefundene Bestandsfehler:**
- Werden behoben (kleine Pakete in E3 und E4, je mit Test, wo es Logik ist):
  - „527“ durch saubere Trennung in der Bewertungszeile; die Zahl 27 steht heute vierfach hart im Code und kommt künftig aus `reviews.js`.
  - Kundenstimmen in `schema.ts` weichen vom Wortlaut ab und werden auf den wörtlichen Text aus `reviews.js` zurückgeführt (G8).
  - `video-sitemap.xml` verweist auf zwei fehlende Videos.
  - OG-Bild meldet 1200×630 für eine 640×200-Datei.
  - Relative Canonicals bei Blog und Referenzen.
  - `/preise` ist indexierbar, steht aber nicht in der Sitemap.
- Bleiben unberührt und kommen in MENSCHEN.md:
  - Login führt nach Erfolg zu `/admin`, das es nicht gibt.
  - Der Knopf „Cookie-Einstellungen“ im Kartenplatzhalter öffnet den Banner nicht (G8 Einwilligung).
  - Das Cookie-Inventar nennt Einträge ohne Code.
  - 4 Formulare ohne Einwilligungshäkchen.
  - Die Festpreis-Zusagen stehen im Widerspruch zu AGB § 2 Abs. 3.

## Abnahme (rekonstruiert, Kurzfassung; Schwellen aus Abschnitt 0, 6 bis 11)
- Z-01 Plan: 100 % Pflicht, Kür leer.
- Z-02 Bestand: Build, Typen, Linter, Tests ≥ E0, Funktionsliste vollständig, 0 neue Konsolenfehler.
- Z-03 Designsystem: 0 freie Werte in geänderten Dateien.
- Z-04 Gestaltung: Endprüfer ≥ 8 je Hauptansicht, keine Kategorie < 7, blinder Vorher-Nachher-Vergleich für den neuen Stand.
- Z-05 Bewegung: Register vollständig, B-01 und B-02 nach Spezifikation, reduzierte Bewegung, ≤ 5 % verworfene Bilder bei 4× gedrosselter CPU.
- Z-06 Grafik: eine Icon-Familie, SVGs optimiert und zugänglich, Logo-Vektor ≥ 98 % oder Ersatz-Intro.
- Z-07 Zugänglichkeit: 0 ernste oder kritische axe-Befunde, Tastatur, Fokus, Kontraste, Systemschrift 200 %.
- Z-08 Leistung: BUDGETS mit Intro (LCP ≤ 2,5 s, CLS ≤ 0,1, INP ≤ 200 ms, Lighthouse mobil 90/95/95/100, Bewegungscode ≤ 60 KB, Startbild ≤ 200 KB); E0 gilt, wenn besser.
- Z-09 Darstellung: 10 Gerätegrößen ohne Überlauf, Erstes Bild auf allen Hauptansichten.
- Z-10 Übergabe: BERICHT, KERN, MENSCHEN, Galerie, Anleitung.
- Z-11 Nutzerführung: P1 bis P5 lösen A1 bis A6 mobil und am Desktop, Schritte ≤ E0. Navigationsregeln, ein Hauptknopf je Seite, Startseite ≤ 1 Formular, Hauptweg ≤ 4 Pflichtangaben.
- Z-12 Texte: Schreibregeln per Skript auf allen Seiten, Stichproben bestanden, 0 Fakten außerhalb K-015.
- Z-13 Bilder: jede Hauptansicht mit echtem Bild, Startbild, Galerie mit Filter, Regler, 0 Metadaten, Alt-Regeln, keine erkennbaren Personen.
- Z-14 Adressen: alle Adressen aus `adressen-e0.csv` mit 200 oder 308 gleichwertig, 0 kaputte Links, je Seite 1 H1, Titel, Beschreibung, Canonical, gültige Daten, Sitemap vollständig.
- Keine AUSNAHME für Z-02, Z-11, Z-14.
- UMGEBUNGSAUSNAHMEN (in MENSCHEN.md): echte Geräte und echtes Safari oder Firefox (nur Chromium vorhanden), Bildrate auf echter Grafik, echtes Mobilnetz.

## Mengengerüst und Kapazität (Schätzung, PLAN.md legt fest)
- Etwa 330 Pakete:
  - E0: 20; E1: 6; E2: 25 (davon 10 Opus);
  - E3: 60; E4: 170 (75 Texter, 75 Lektor, 20 Baumeister);
  - E5: 30; Kür: 25.
- Modellanteil etwa 85 % Haiku, 15 % Opus.
- Tage ≈ 330 ÷ (5 × 10 Wellen) × 1,2 ≈ 8; die Laufzeit läuft bis alle Kriterien belegt sind.

## Kritische Dateien
- Rahmen: `src/app/(bestand)/_dokument.tsx`, `src/lib/motion/{kopfskript,bewegung,register}.ts`, `src/app/{globals,bewegung}.css`, `src/config/navigation.js`, `src/components/common/{Header,MobileMenu,Footer}.jsx`, `src/components/layout/MobileBottomBar.tsx`.
- Startseite: `src/app/(bestand)/page.tsx`, `src/components/start/*`.
- Bausteine: `src/components/kern/*`, `src/components/forms/HeroContactForm.tsx`, `src/components/reviews/GoogleReviewsBadge.tsx`.
- Daten: `src/config/{company,cities,services,topics,projects,musterbaeder,reviews}.*`.
- Adressen: `next.config.ts` (Weiterleitungen), `src/lib/wege.ts`, `src/app/sitemap.ts`, `src/app/video-sitemap.xml/route.ts` (zeigt auf fehlende Videos), `src/lib/{metadata,schema}.ts` (Bewertungstexte weichen vom Wortlaut ab).
- Neu: `src/components/verlegen/*` (B-01), `src/components/intro/*` und Logo-Vektor (B-02), `src/components/galerie/*`, `public/images/arbeiten/*`.

## Verifikation
- Je Paket Stufe A durch einen Haiku-Prüfer: Typprüfung und Linter der Dateien, betroffene Tests, Lesbarkeit der Seite, ein Bild mobil und am Desktop. Nach jeder Welle ein Build im Reinraum.
- Je Etappe Stufe B auf den Hauptansichten (Werkzeuge siehe E0) und Probeläufe.
- Neue Logik bekommt Tests nach `node --test`: Fliesenraster, Größenwahl ≤ 80, Linkfilter, Zustandsautomat von B-01, Intro-Schalter, Glossarprüfung, Weiterleitungen.
- Prüfwerkzeuge werden vor ihrem ersten Einsatz mit einer Positivprobe geprüft (Lernpunkt aus `_relaunch/LERNEN.md`).

## Risiken und Gegenmaßnahmen
- Lighthouse liegt schon heute an der Grenze (90, LCP 3,46 s). Speed Index kostet mit Intro 1 bis 3 Punkte. Gegenmaßnahmen:
  - LCP-Ursache zuerst (E2-ORCH-00); deckende Phase des Intros ≤ 800 ms in Kalk, Freilegung per `transform`.
  - Budget je Paket, Messung mit frischem Profil im Ruhefenster.
- `popstate`-Aufschub bricht mit Next (Wettlauf mit dem HistoryUpdater, Firefox ≤ 115) → sicherer Weg (b), Test für Zurück und Vor, Schalter in der Komponente.
- B-01 im Feld: Der Inhaltswechsel kommt nach 540 ms, also nach dem 500-ms-Eingabefenster der CLS-Messung. Verschiebungen bleibender Elemente zählen dort. Deshalb bewegt der Wechsel nur die Überlagerung, der Kopf bleibt fest. Eine Layout-Shift-Messung während des Wechsels steht im Test.
- Logo-Vektor erreicht keine 98 % → Ersatz-Intro nach Spezifikation.
- Bilder sind Screenshots mittlerer Qualität (fast alles Note B) → nur gute Ausschnitte, kein Vollbild am Desktop, gestaltete Fliesenkompositionen, wo nichts passt.
- Gedächtnisverlust durch Containerwechsel → Takt L2 und L4, WEITER-Routine, EINRICHTUNG.md mit Bildwiederherstellung.
- Platte voll → höchstens 2 Reinraum-Kopien, Bildsätze im Scratchpad, nur zugelassene Bilder ins Repo.
