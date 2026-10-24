# PLAN · Lauf „Verständlich, echt, ausgezeichnet“ · Fassung 1.2

Stand 24.10.2026, E1. Fassung 1.1 arbeitete die Planprüfung Runde 1 ein (25 Befunde), Fassung 1.2 die Runde 2 (14 Befunde, `pakete/E1-PRUEF-PLAN-2.rueckgabe.md`); weitere Prüfrunden gibt es nicht (L0). Gegen KERN v3.0. Jede Zeile: Kennung, Gegenstand, Rolle, Modell, Stufe, Schreibrechte, Abhängigkeit, Kriterium, Welle, Status (mit Commit, sobald abgenommen). Briefings entstehen je Welle in `_werkstatt/pakete/<Kennung>.md` nach dem 11-teiligen Paket-Bauplan. `$SCRATCH` = Sitzungs-Scratchpad (EINRICHTUNG.md).

## Regeln dieses Plans
- Gleichzeitige Pakete berühren nie dieselbe Datei. Pakete derselben Welle mit derselben Datei sind Orchestrator-Pakete und hängen nacheinander voneinander ab (Spalte „Abhängig von“).
- Schreibrechte sind exakte Dateien. Ein Eintrag mit `/**` bezeichnet einen **neuen** Ordner, den es vor dem Paket nicht gibt (`src/components/momente/<kennung>/`, `src/components/seiten/<seite>/`, `src/components/start/` für die neue Startseite, `public/images/arbeiten/`, Beleg- und Cacheordner); jede Datei darin entsteht in diesem Paket und gehört nur ihm. Der Bericht nennt jede angelegte Datei.
- Haiku-Pakete schreiben keine gemeinsamen Dateien. Texte für gemeinsame Datendateien liefern Texter als JSON unter `_werkstatt/texte/`, Registereinträge liefern Grafiker als `_werkstatt/register/<kennung>.json`; der Orchestrator überträgt sie (Pakete `E*-ORCH-0*`). Eine Artikeldatei `src/config/posts/<slug>.js` gehört genau einem Artikel und ist keine gemeinsame Datei; Texter und Lektor desselben Artikels arbeiten in verschiedenen Wellen.
- Referenztexte (`_werkstatt/texte/REF-*.md`) und den Text der 404 schreibt der Orchestrator; diese Seiten haben kein Texter-Paket (`/`, `/bad/barrierefreies-bad`, `/untergrund-abdichtung/din-18534`, Ortsvorlage, 404), aber ein Lektorpaket (`E1-LEKT-REF-1` bis `-4`, `E2-LEKT-404`), das Befunde meldet; der Orchestrator ändert den Text.
- Tests neuer Logik schreibt ein Haiku-Prüfer als neue Datei (`test/*.test.mjs`); den Eintrag im Skript `test` der `package.json` setzt der Orchestrator.
- Stufe A gilt je Paket (Auftrag Abschnitt 14): Jedes Briefing enthält die Schnellprüfung nach Stufe A als Selbstprüfung (Teil 9), und der unabhängige Haiku-Prüfer der Welle (`E*-PRUEF-A<n>`) liefert für jedes Paket der Welle ein eigenes Ergebnis. Wellen mit Texten haben zusätzlich die Textstichprobe (`E*-PRUEF-T<n>`); das Urteil fällt der Orchestrator (L1).
- Jede Etappe endet mit einer Torzeile (`E*-TOR`), die von Stufe B, Probeläufen und Sichtabnahme abhängt; die nächste Etappe hängt am Tor.
- Werkstatt-Schaufenster (`src/app/(bestand)/werkstatt-schaufenster/*/page.dev.tsx`): bleibt als Werkzeug der Entwicklung (nur mit `NODE_ENV=development` gebaut, `next.config.ts` `pageExtensions`), wird in E2-ORCH-02g erweitert und in E5-ORCH-03c/d aufgeräumt; kein Baumeister-Paket.

## Mengengerüst
- 170 Adressen (163 Sitemap, 5 nur verlinkt, 2 Weiterleitungsquellen) nach Auftrag Abschnitt 11; `adressen-e0.csv` führt zusätzlich die 32 Adressen mit 410 aus `src/lib/wege.ts` (E-016). 82 Seitendateien unter `src/app/(bestand)/` (davon 6 nur im Schaufenster), dazu 404.
- Seiten nach Art: Hauptansichten 12; übrige statische Seiten 53 (darunter `/untergrund-abdichtung/din-18534` mit Referenztext); Rechtstexte 6; Vorlagen für 13 Orte, 52 Leistung × Ort, 4 Leistungen, 12 Musterbäder, 13 Artikel, 6 Referenzen.
- Texte: 84 Texterpakete, 89 Lektorpakete; 4 Referenztexte (erledigt).
- Bilder: 84 Originale, Webfassungen in zwei Paketen (E2-BILD-02 Start und Hauptansichten, E3-BILD-01 alle übrigen Plätze und OG-Bild); Fliesenkompositionen für Plätze ohne Foto.
- Komponenten: 6 Bausteine, 4 Vorlagen, Kopf, Mobilmenü, untere Leiste, Fuß, 404, B-01, B-02, `startbild`, 9 große Momente.
- Weiterleitungen: neu nur aus E5-BAU-01; keine Adresse entfällt.

## Etappen, Wellen, kritischer Pfad
- E0: Werkzeuge (erledigt) → Ausgangswerte Stufe B und Probeläufe → Lighthouse im Ruhefenster → LAGEBILD.
- E1: KERN v3, Baumtest (erledigt), PLAN und ABNAHME, Planprüfung (zwei Runden, erledigt), Lektorat der Referenztexte.
- E2 Referenz: W0 Werkzeugbibliotheken · W1 LCP-Ursache, Tokens, Register, Bewertungen, Bildwerkzeug und Bilder, Logo-Vektor, Bausteine, Reaktionswerkzeug · W2 Navigation, Kopf, B-01, Plan-Morph weg · W3 B-02, Startseite, `startbild`, 404, Funktionsspecs · Tor (Stufe B, Probeläufe P1 und P5, Sichtabnahme ≥ 8, höchstens 2 Anläufe).
- E3: W1 Vorlagen, große Momente, Bilder, Texte der Hauptansichten und Orte · W2 Lektorat, Übertragungen · W3 Seitenbau · Tor.
- E4: fünf Wellen im Fluss Text (W1 bis W3) → Lektorat (eine Welle später) → Bau (zwei Wellen später), dazu Datenvorlagen, Rechtstexte, Artikel · Tor.
- E5 (teils parallel zu E4): Referenzseiten, Generatorbilder raus, Weiterleitungen, Sitemap, OG-Bild, Video-Sitemap, Abbau entfallender Bewegung · Tor.
- Kür (nach Wirkung, hängt an E4-TOR und E5-TOR), dann Abschluss (hängt an E4-TOR, E5-TOR und der Kür).
- **Kritischer Pfad (wie in den Tabellen):** E0-PRUEF-03L → E2-PRUEF-00 → E2-ORCH-00 → E2-ORCH-01 → E2-ORCH-01b → E2-ORCH-04 → E2-ORCH-04b → E2-ORCH-05 → E2-ORCH-06b → E2-PRUEF-A3 → E2-PRUEF-B → E2-SICHT → E2-TOR → E3-ORCH-01a → E3-BAU → E3-TOR → E4 → E4-TOR → Kür → AB-PRUEF-C → AB-END.

## Modellanteil und Kapazität
- Pflichtzeilen: 398 (E0 und E1 21, E2 51, E3 70, E4 223, E5 25, Abschluss 8); dazu Kür 8. Sammelzeilen in E0 (zum Beispiel `E0-KUND-01…09`) zählen als eine Zeile.
- Pflicht nach Modell: Haiku 332, Opus 66 (≈ 83 % Haiku); Kür: Haiku 3, Opus 5.
- Kapazität: Tage = Pakete ÷ (HAIKU-PLÄTZE × Pakete je Platz und Tag) × 1,2 = 406 ÷ (5 × 10) × 1,2 ≈ 9,7 Tage. Annahme 10 Pakete je Platz und Tag: ein Paket braucht im Mittel 1 bis 2 Stunden (Texter, Lektor, Prüfer der Stufe A eher 1, Baumeister eher 2) bei rund 20 Arbeitsstunden je Tag. Engpass ist der Container (4 Kerne, höchstens 2 gleichzeitige Agenten je Workflow, E-005); Text- und Lektorpakete laufen in zwei Workflows parallel, Lighthouse allein im Ruhefenster.

## Pflicht
Alle Pakete außer `KUER-*` sind Pflicht, nach Wirkung sortiert (Rahmen und Startseite vor Hauptansichten vor übrigen Seiten).

### E0 und E1
| Kennung | Gegenstand | Rolle | Modell | Stufe | Schreibrechte | Abhängig von | Kriterium | Welle | Status |
|---|---|---|---|---|---|---|---|---|---|
| E0-ORCH-01 | Werkstatt einrichten | Orchestrator | Opus | 3 | `_werkstatt/**` (Archiv, AUFTRAG, STATUS, PRUEFPUNKT), `.gitignore`, `CLAUDE.md` | — | Z-10 | E0 | erledigt df3c241 |
| E0-KUND-01…09 | Erkundung (je ein Bereich, nur lesend) | Kundschafter | Haiku | 1 | keine (Bericht als Antwort) | E0-ORCH-01 | Z-02, Z-14 | E0 | erledigt |
| E0-PRUEF-BILD-01 | Bildtechnik | Prüfer | Haiku | 1 | `_werkstatt/bildinventar.csv` | E0-ORCH-01 | Z-13 | E0 | erledigt |
| E0-BILD-01…05 | Bildsichtung (je 20 Bilder) | Bildsichter | Haiku | 2 | keine (Formular als Antwort) | E0-PRUEF-BILD-01 | Z-13 | E0 | erledigt |
| E0-GUT-01, E0-GUT-02 | Technikgutachten B-01 und B-02 (Stufe 3: frischer Opus-Unteragent, weil der Quelltext von Next den Kontext stark belastet hätte, Auftrag Abschnitt 5) | Gutachter | Opus | 3 | keine (Gutachten als Antwort) | E0-ORCH-01 | Z-05, Z-08 | E0 | erledigt |
| E0-PRUEF-01 | Einrichtung | Prüfer | Haiku | 1 | `_werkstatt/werkzeuge/**` | E0-ORCH-01 | Z-02 | E0 | erledigt 583656d |
| E0-PRUEF-02a…02d | Werkzeuge (Geräte und Erstes Bild, Lesbarkeit, Adressen, Laufwerkzeug) | Prüfer | Haiku | 1 | `_werkstatt/werkzeuge/**`, `_werkstatt/adressen-e0.csv`, `_werkstatt/belege/e0/**` | E0-PRUEF-01 | Z-09, Z-11, Z-12, Z-14 | E0 | erledigt 583656d |
| E0-PRUEF-02-PA | Unabhängige Abnahme der Werkzeuge | Prüfer | Haiku | 1 | `$SCRATCH/E0-PRUEF-02-PA/**` | E0-PRUEF-02a…02d | Z-02 | E0 | erledigt 583656d |
| E0-PRUEF-03 | Ausgangswerte Stufe B ohne Lighthouse | Prüfer | Haiku | 1 | `_werkstatt/belege/e0/**`, `_werkstatt/bilder/e0/**` | E0-PRUEF-02-PA | Z-02 bis Z-09, Z-12 | E0 | erledigt cce868a (Rückgabe gesichert) |
| E0-PRUEF-03L | Ausgangswerte Lighthouse im Ruhefenster | Prüfer | Haiku | 1 | `_werkstatt/belege/e0/lighthouse.json` | E0-PRUEF-03, E0-PROBE-01…10 | Z-08 | E0 | erledigt (Orchestrator, reiner Werkzeuglauf; Tabelle STUFE-B Abschnitt 8) |
| E0-PROBE-01…10 | Probeläufe alter Stand (P1 bis P5 × eigenes und anderes Gerät) | Probeläufer | Haiku | 1 | `_werkstatt/cache/probelauf/e0/**` | E0-PRUEF-02-PA | Z-11 | E0 | erledigt (zehn Rückgaben gesichert, LAGEBILD Abschnitt 5) |
| E0-ORCH-02 | LAGEBILD mit Ausgangswerten, Faktenblatt | Orchestrator | Opus | 3 | `_werkstatt/LAGEBILD.md`, `_werkstatt/ABNAHME.md` | E0-PRUEF-03L | Z-01, Z-02 | E0 | läuft (Entwurf 583656d) |
| E1-ORCH-01 | KERN v3, Denkprotokolle, Referenztexte, Bildplätze, MENSCHEN | Orchestrator | Opus | 3 | `_werkstatt/KERN.md`, `_werkstatt/ENTSCHEIDUNGEN.md`, `_werkstatt/texte/REF-*.md`, `_werkstatt/bildplaetze.md`, `_werkstatt/MENSCHEN.md`, `_werkstatt/regeln/**` | E0-ORCH-01 | Z-10, Z-12 | E1 | erledigt daf0f30, 16a1873, 394b300 |
| E1-PROBE-IA | Baumtest Navigation | Probeläufer | Haiku | 1 | keine (Ergebnis als Antwort) | E1-ORCH-01 | Z-11 | E1 | erledigt 394b300 |
| E1-ORCH-02 | PLAN und ABNAHME | Orchestrator | Opus | 3 | `_werkstatt/PLAN.md`, `_werkstatt/ABNAHME.md` | E1-ORCH-01 | Z-01 | E1 | läuft (Fassung 1.2) |
| E1-PRUEF-PLAN | Planprüfung Runde 1 | Prüfer | Haiku | 1 | `$SCRATCH/E1-PRUEF-PLAN/**` | E1-ORCH-02 | Z-01 | E1 | erledigt 583656d |
| E1-PRUEF-PLAN-2 | Planprüfung Runde 2 (letzte Runde, L0) | Prüfer | Haiku | 1 | `$SCRATCH/E1-PRUEF-PLAN-2/**` | E1-PRUEF-PLAN | Z-01 | E1 | erledigt |
| E1-LEKT-REF-1 | Lektorat des Referenztexts für `/` (Befunde als Liste, der Orchestrator ändert den Text) | Lektor | Haiku | 2 | `$SCRATCH/E1-LEKT-REF-1/**` | E1-ORCH-01 | Z-12 | E1-W1 | erledigt 6be59f9 |
| E1-LEKT-REF-2 | Lektorat des Referenztexts für `/bad/barrierefreies-bad` (Befunde als Liste, der Orchestrator ändert den Text) | Lektor | Haiku | 2 | `$SCRATCH/E1-LEKT-REF-2/**` | E1-ORCH-01 | Z-12 | E1-W1 | erledigt 6be59f9 |
| E1-LEKT-REF-3 | Lektorat des Referenztexts für `/untergrund-abdichtung/din-18534` (Befunde als Liste, der Orchestrator ändert den Text) | Lektor | Haiku | 2 | `$SCRATCH/E1-LEKT-REF-3/**` | E1-ORCH-01 | Z-12 | E1-W1 | erledigt 6be59f9 |
| E1-LEKT-REF-4 | Lektorat des Referenztexts für `/standorte/wetzlar` (Befunde als Liste, der Orchestrator ändert den Text) | Lektor | Haiku | 2 | `$SCRATCH/E1-LEKT-REF-4/**` | E1-ORCH-01 | Z-12 | E1-W1 | erledigt 6be59f9 |

### E2 · Referenz
| Kennung | Gegenstand | Rolle | Modell | Stufe | Schreibrechte | Abhängig von | Kriterium | Welle | Status |
|---|---|---|---|---|---|---|---|---|---|
| E2-ORCH-W0 | Werkzeugbibliotheken für Bild und Logo eintragen (sharp, potrace, Schrift Plus Jakarta Sans als Datei, E-011) | Orchestrator | Opus | 3 | `_werkstatt/werkzeuge/package.json`, `_werkstatt/werkzeuge/package-lock.json` | E1-PRUEF-PLAN | Z-06, Z-13 | E2-W0 | erledigt b1b6762 |
| E2-PRUEF-00 | Spur der LCP auf `/` mobil: Trace, LCP-Element, Kette bis zum ersten Malen, Anteil von Schrift, Startzuständen und Hydrierung | Prüfer | Haiku | 1 | `$SCRATCH/E2-PRUEF-00/**` | E0-PRUEF-03L | Z-08 | E2-W1 | offen |
| E2-PRUEF-INP | Werkzeug `reaktion.mjs` für die Reaktion (INP über `PerformanceObserver`, fünf Handlungen, m390, 4-fach gedrosselt) mit Positivprobe; Ausgangswert auf 4310 | Prüfer | Haiku | 1 | `_werkstatt/werkzeuge/reaktion.mjs`, `_werkstatt/werkzeuge/tests-logik/reaktion-probe.html`, `_werkstatt/belege/e0/reaktion.json` | E2-ORCH-W0 | Z-08 | E2-W1 | läuft (Werkzeug und Positivprobe; Ausgangswert auf 4310 im Ruhefenster durch den Orchestrator) |
| E2-ORCH-00 | Ursache der LCP auf `/` beheben | Orchestrator | Opus | 3 | `src/app/(bestand)/_dokument.tsx`, `src/app/globals.css`, `src/app/bewegung.css`, `src/components/start/Einstieg.tsx` | E2-PRUEF-00 | Z-08 | E2-W1 | offen |
| E2-ORCH-01 | Tokens v3 aus K-005 (Glanz, Schatten, `ease-hammer`, Dauern von B-01 und B-02) | Orchestrator | Opus | 3 | `src/app/globals.css` | E2-ORCH-00 | Z-03 | E2-W1 | gebaut im Arbeitsbaum |
| E2-ORCH-01b | Register v3 (K-007): neue Einträge, entfallende Einträge markiert, Werte-Regeln angeglichen | Orchestrator | Opus | 3 | `src/lib/motion/register.ts`, `_werkstatt/register.json`, `_werkstatt/werkzeuge/werte-regeln.json`, `test/bewegung.test.mjs` | E2-ORCH-01 | Z-03, Z-05 | E2-W1 | gebaut im Arbeitsbaum |
| E2-FIX-01a | Bewertungszeile ohne „527“ (Trenner zwischen Note und Zahl, auch im Textinhalt) | Orchestrator | Opus | 3 | `src/components/reviews/GoogleReviewsBadge.tsx` | — | Z-12, G8 | E2-W1 | gebaut im Arbeitsbaum |
| E2-FIX-01b | Bewertungszahl nur aus `src/config/reviews.js` (alle harten „27“) | Orchestrator | Opus | 3 | `src/components/ui/FinalCTA.tsx`, `src/components/maps/LocalDominanceMap.tsx`, `src/app/llms.txt/route.ts`, `src/lib/schema.ts`, `src/app/(bestand)/standorte/[stadt]/page.tsx` | E2-FIX-01a | Z-12, G8 | E2-W1 | gebaut im Arbeitsbaum |
| E2-FIX-01c | Kundenstimmen in den strukturierten Daten wörtlich aus `src/config/reviews.js` | Orchestrator | Opus | 3 | `src/lib/schema.ts` | E2-FIX-01b | Z-14, G8 | E2-W1 | gebaut im Arbeitsbaum |
| E2-BILD-01 | Bildwerkzeug `bilder.mjs` (Ränder weg, Ausrichtung, Belichtung, Weißabgleich, Zuschnitt nach Schwerpunkt, keine Hochskalierung, Metadaten weg, unscharfer Platzhalter, Prüfmodus `--pruefe`) mit Tests | Bildbearbeiter | Haiku | 2 | `_werkstatt/werkzeuge/bilder.mjs`, `_werkstatt/werkzeuge/tests-logik/bilder.test.mjs` | E2-ORCH-W0 | Z-13 | E2-W1 | offen |
| E2-BILD-02 | Webfassungen der Bildplätze von `/` und der 11 Hauptansichten nach `_werkstatt/bildplaetze.md` | Bildbearbeiter | Haiku | 2 | `public/images/arbeiten/**`, `_werkstatt/bilder/arbeiten-e2.json` | E2-BILD-01 | Z-13 | E2-W1 | abgenommen (32 Motive, 91 Dateien; Fragen in M-08, M-17) |
| E2-ORCH-05a | Logo-Vektor, Wortmarke aus Schriftkonturen (Stufe 3 nach Auftrag Abschnitt 5) | Orchestrator | Opus | 3 | `_werkstatt/werkzeuge/logo/wortmarke.mjs`, `src/components/intro/logo-pfade.ts` | E2-ORCH-W0 | Z-06 | E2-W1 | erledigt 25cbca7 (unter 98 %, E-018) |
| E2-ORCH-05b | Logo-Vektor, Maskottchen per Farbebenen-Nachzeichnung, zu wenigen glatten Pfaden bereinigt | Orchestrator | Opus | 3 | `_werkstatt/werkzeuge/logo/maskottchen.mjs`, `src/components/intro/logo-pfade.ts` | E2-ORCH-05a | Z-06 | E2-W1 | entfällt (E-018) |
| E2-PRUEF-05 | Deckungsmessung des Logo-Vektors bei doppelter Größe (Flächen ≥ 98 %, Farben exakt) | Prüfer | Haiku | 1 | `_werkstatt/werkzeuge/logo/deckung.mjs`, `_werkstatt/belege/e2/logo-deckung.json` | E2-ORCH-05b | Z-06 | E2-W1 | entfällt (E-018) |
| E2-ORCH-02a | Glossardaten aus K-011 (Begriffe, Formen, Erklärung ≤ 15 Wörter) | Orchestrator | Opus | 3 | `src/config/glossar.ts` | E2-ORCH-01 | Z-03, Z-12, Z-13 | E2-W1 | offen |
| E2-ORCH-02h | Baustein `Fachwort` (dfn mit Erklärung beim ersten Vorkommen je Seite) | Orchestrator | Opus | 3 | `src/components/kern/Fachwort.tsx` | E2-ORCH-02a | Z-03, Z-12, Z-13 | E2-W1 | offen |
| E2-ORCH-02b | Baustein `Seitenformel` (sechs Abschnitte, Kennzeichnung für die Prüfung) | Orchestrator | Opus | 3 | `src/components/kern/Seitenformel.tsx` | E2-ORCH-01 | Z-03, Z-12, Z-13 | E2-W1 | offen |
| E2-ORCH-02c | Baustein `Bildfeld` v3 (next/image, feste Maße, `sizes`, Platzhalter) und Bilddaten | Orchestrator | Opus | 3 | `src/components/kern/Bildfeld.tsx`, `src/config/arbeiten.ts` | E2-BILD-02 | Z-03, Z-12, Z-13 | E2-W1 | gebaut im Arbeitsbaum (Bildfeld v3, arbeiten.ts) |
| E2-ORCH-02d | Baustein `Hauptknopf` („Termin vor Ort anfragen“, `data-hauptknopf`) auf Basis von `Knopf` | Orchestrator | Opus | 3 | `src/components/kern/Hauptknopf.tsx`, `src/components/kern/Knopf.tsx` | E2-ORCH-01 | Z-03, Z-12, Z-13 | E2-W1 | offen |
| E2-ORCH-02e | Baustein `Brotkrumen` mit strukturierten Daten | Orchestrator | Opus | 3 | `src/components/kern/Brotkrumen.tsx` | E2-ORCH-01 | Z-03, Z-12, Z-13 | E2-W1 | offen |
| E2-ORCH-02f | Baustein `Fliesenkomposition` für Bildplätze ohne Foto | Orchestrator | Opus | 3 | `src/components/kern/Fliesenkomposition.tsx` | E2-ORCH-01 | Z-03, Z-12, Z-13 | E2-W1 | offen |
| E2-ORCH-02g | Schaufenster der neuen Bausteine (nur Entwicklung) | Orchestrator | Opus | 3 | `src/app/(bestand)/werkstatt-schaufenster/bausteine/page.dev.tsx` | E2-ORCH-02h, E2-ORCH-02b, E2-ORCH-02c, E2-ORCH-02d, E2-ORCH-02e, E2-ORCH-02f | Z-03, Z-12, Z-13 | E2-W1 | offen |
| E2-TEST-02 | Tests der Glossarlogik (erstes Vorkommen, Erklärung ≤ 15 Wörter, Begriffsformen) | Prüfer | Haiku | 2 | `test/glossar.test.mjs` | E2-ORCH-02h | Z-12 | E2-W1 | läuft (erweitert um test/oeffnungszeiten.test.mjs) |
| E2-PRUEF-A1 | Stufe A je Paket der Welle E2-W1 (Typprüfung und Linter der geänderten Dateien, betroffene Tests, Zeichen und Lesbarkeit geänderter Seiten, ein Bild mobil und Desktop), ein Ergebnis je Paket, unabhängig | Prüfer | Haiku | 1 | `$SCRATCH/E2-PRUEF-A1/**` | E2-PRUEF-00, E2-PRUEF-INP, E2-ORCH-00, E2-ORCH-01, E2-ORCH-01b, E2-FIX-01a, E2-FIX-01b, E2-FIX-01c, E2-BILD-01, E2-BILD-02, E2-ORCH-05a, E2-ORCH-05b, E2-PRUEF-05, E2-ORCH-02a, E2-ORCH-02h, E2-ORCH-02b, E2-ORCH-02c, E2-ORCH-02d, E2-ORCH-02e, E2-ORCH-02f, E2-ORCH-02g, E2-TEST-02 | Z-02, Z-09, Z-12 | E2-W1 | offen |
| E2-ORCH-03a | Navigationsdaten nach K-009 (fünf Hauptpunkte, eine Ebene, Hauptknopf, Telefon) | Orchestrator | Opus | 3 | `src/config/navigation.js` | E2-ORCH-02d | Z-09, Z-11 | E2-W2 | offen |
| E2-ORCH-03e | Kopf mit Markierung der aktuellen Seite, Hauptknopf und Telefon | Orchestrator | Opus | 3 | `src/components/common/Header.jsx`, `src/components/layout/HeaderWrapper.tsx` | E2-ORCH-03a | Z-09, Z-11 | E2-W2 | offen |
| E2-ORCH-03b | Mobilmenü ohne Scrollen auf 360 × 740 | Orchestrator | Opus | 3 | `src/components/common/MobileMenu.jsx` | E2-ORCH-03a | Z-09, Z-11 | E2-W2 | offen |
| E2-ORCH-03c | Untere Leiste (Anrufen, WhatsApp, Termin → `/kontakt`), Querformat ≤ 25 % mit Kopf | Orchestrator | Opus | 3 | `src/components/layout/MobileBottomBar.tsx` | E2-ORCH-03a | Z-09, Z-11 | E2-W2 | offen |
| E2-ORCH-03d | Fuß als vollständige, geordnete Übersicht aller Bereiche | Orchestrator | Opus | 3 | `src/components/common/Footer.jsx` | E2-ORCH-03a | Z-09, Z-11 | E2-W2 | offen |
| E2-ORCH-04 | B-01 „Verlegen“: Überlagerung, Klick-Abfangen, Zustandsautomat, Zurück und Vor, Wartephase, reduzierte Bewegung, Eintrag im Testskript | Orchestrator | Opus | 3 | `src/components/verlegen/Verlegen.tsx`, `src/lib/verlegen/raster.ts`, `src/lib/verlegen/linkfilter.ts`, `src/lib/verlegen/automat.ts`, `src/app/(bestand)/_dokument.tsx`, `src/app/bewegung.css`, `package.json` (nur Skript `test`) | E2-ORCH-01b | Z-05, Z-07, Z-08 | E2-W2 | gebaut im Arbeitsbaum (Zurück-Weg aufschub, E-020) |
| E2-ORCH-04b | Plan-Morph `/leistungen → [id]` entfernen (ein System für Seitenwechsel, E-010) | Orchestrator | Opus | 3 | `src/components/leistungen/uebersicht/PlanUebergang.jsx`, `src/components/leistungen/Gewerk.tsx`, `src/components/leistungen/detail/Planfeld.tsx`, `src/app/(bestand)/leistungen/page.jsx`, `src/app/(bestand)/leistungen/[id]/page.jsx`, `src/app/bewegung.css` | E2-ORCH-04 | Z-05 | E2-W2 | gebaut im Arbeitsbaum (Plan-Morph entfernt) |
| E2-TEST-04 | Logik-Tests B-01: Drittelverband, Größenwahl ≤ 80, Zeitplan ohne Überholen, Linkfilter mit allen Ausnahmen, Zustandsautomat (Doppelklick, Wartephase, Abbruch), Dauern 1.200, 900 und 70 % | Prüfer | Haiku | 2 | `test/verlegen.test.mjs` | E2-ORCH-04 | Z-05 | E2-W2 | abgenommen, im Arbeitsbaum bis zum Commit von E2-ORCH-04 |
| E2-PRUEF-04 | Ablauftest B-01 im Browser: Klick, Zurück, Vor, Doppelklick, Ausnahmen, Fokus auf H1, Layoutverschiebung während des Wechsels, reduzierte Bewegung | Prüfer | Haiku | 1 | `_werkstatt/werkzeuge/tests/verlegen.spec.mjs` | E2-ORCH-04 | Z-05, Z-07 | E2-W2 | abgenommen (Befund behoben, E-020; Lauf 5: 26/26) |
| E2-PRUEF-A2 | Stufe A je Paket der Welle E2-W2 (Typprüfung und Linter der geänderten Dateien, betroffene Tests, Zeichen und Lesbarkeit geänderter Seiten, ein Bild mobil und Desktop), ein Ergebnis je Paket, unabhängig | Prüfer | Haiku | 1 | `$SCRATCH/E2-PRUEF-A2/**` | E2-ORCH-03a, E2-ORCH-03e, E2-ORCH-03b, E2-ORCH-03c, E2-ORCH-03d, E2-ORCH-04, E2-ORCH-04b, E2-TEST-04, E2-PRUEF-04 | Z-02, Z-09, Z-12 | E2-W2 | offen |
| E2-ORCH-05 | B-02 Intro als Ersatz-Intro „Der erste Boden“ (E-018): kleine Fläche im Drittelverband, Original-Logo als Bild, Gleiten in den Kopf, Abbruch, reduzierte Bewegung, Kopfschalter | Orchestrator | Opus | 3 | `src/components/intro/Intro.tsx`, `src/lib/motion/kopfskript.ts`, `src/app/(bestand)/_dokument.tsx`, `src/app/bewegung.css` | E2-ORCH-05a, E2-ORCH-03e, E2-ORCH-04b | Z-05, Z-06, Z-08 | E2-W3 | gebaut im Arbeitsbaum (Ersatz-Intro, E-019; Tests Intro 1–11) |
| E2-TEST-05 | Tests Intro-Schalter (erster Besuch, Speicher fehlt, reduzierte Bewegung, Abbruchereignisse) | Prüfer | Haiku | 2 | `test/intro.test.mjs` | E2-ORCH-05 | Z-05 | E2-W3 | erledigt durch den Orchestrator (test/intro.test.mjs, Intro 1 bis 11, Startbild 1) |
| E2-ORCH-06 | Startseite nach `_werkstatt/texte/REF-start.md` (Text vom Orchestrator): erster Bildschirm, Lage-Fliesen, Was wir tun, Ablauf, Beleg, Formular `#termin`; Preisrechner und Express-Anfrage nicht mehr auf `/` | Orchestrator | Opus | 3 | `src/app/(bestand)/page.tsx`, `src/components/start/**` | E2-ORCH-00, E2-ORCH-02h, E2-ORCH-02b, E2-ORCH-02c, E2-ORCH-02d, E2-ORCH-03e, E2-BILD-02 | Z-04, Z-11, Z-12, Z-13 | E2-W3 | gebaut, Sichtprüfung Runde 1 umgesetzt (E-021), Runde 2 läuft |
| E2-ORCH-06b | Großer Moment `startbild` (Startbild legt sich frei) | Orchestrator | Opus | 3 | `src/components/momente/startbild/**` | E2-ORCH-06, E2-ORCH-05 | Z-05, Z-08 | E2-W3 | gebaut (Startbild-Belag, Tests Startbild 1), im Prüf-Workflow bestanden |
| E2-ORCH-07 | 404 mit verrutschter Fliese und drei Wegen (Text vom Orchestrator) | Orchestrator | Opus | 3 | `src/app/(bestand)/not-found.tsx`, `src/app/global-not-found.tsx` | E2-ORCH-02d | Z-11 | E2-W3 | gebaut (Text nach E2-LEKT-404, Sichtprüfung Runde 1 umgesetzt) |
| E2-LEKT-404 | Lektorat des 404-Texts (Befunde als Liste) | Lektor | Haiku | 2 | `$SCRATCH/E2-LEKT-404/**` | E2-ORCH-07 | Z-12 | E2-W3 | abgenommen (7 Befunde übernommen; Fragen M-03, M-04 offen) |
| E2-PRUEF-TESTS | Funktionsspecs an neue Orte anpassen (F-01 auf `/kontakt` und `/#termin`, F-02 und F-03 ohne `/`, F-13 neue Navigation) | Prüfer | Haiku | 2 | `_werkstatt/werkzeuge/tests/funktion-hero-kontakt.spec.mjs`, `_werkstatt/werkzeuge/tests/funktion-preisrechner.spec.mjs`, `_werkstatt/werkzeuge/tests/funktion-express-funnel.spec.mjs`, `_werkstatt/werkzeuge/tests/funktion-navigation.spec.mjs` | E2-ORCH-06, E2-ORCH-03d | Z-02 | E2-W3 | offen |
| E2-PRUEF-A3 | Stufe A je Paket der Welle E2-W3 (Typprüfung und Linter der geänderten Dateien, betroffene Tests, Zeichen und Lesbarkeit geänderter Seiten, ein Bild mobil und Desktop), ein Ergebnis je Paket, unabhängig | Prüfer | Haiku | 1 | `$SCRATCH/E2-PRUEF-A3/**` | E2-ORCH-05, E2-TEST-05, E2-ORCH-06, E2-ORCH-06b, E2-ORCH-07, E2-LEKT-404 | Z-02, Z-09, Z-12 | E2-W3 | offen |
| E2-PRUEF-T3 | Textstichprobe der Welle E2-W3: 10 %, mindestens 5 Texte (bei weniger alle), gegen Schreibregeln, Faktenblatt und Suchbegriffe | Prüfer | Haiku | 1 | `$SCRATCH/E2-PRUEF-T3/**` | E2-LEKT-404 | Z-12 | E2-W3 | offen |
| E2-PRUEF-B | Stufe B für `/` (alle Werkzeuge, 10 Geräte, Lighthouse mit Intro, Reaktion) | Prüfer | Haiku | 1 | `_werkstatt/belege/e2/**` | E2-PRUEF-A3 | Z-02 bis Z-09 | E2-Tor | offen |
| E2-PROBE-01 | Probelauf P1 auf m390, A1 bis A3 | Probeläufer | Haiku | 1 | `_werkstatt/cache/probelauf/e2/P1-m390-*/**` | E2-PRUEF-B | Z-11 | E2-Tor | offen |
| E2-PROBE-02 | Probelauf P1 auf d1440, A1 bis A3 | Probeläufer | Haiku | 1 | `_werkstatt/cache/probelauf/e2/P1-d1440-*/**` | E2-PRUEF-B | Z-11 | E2-Tor | offen |
| E2-PROBE-03 | Probelauf P5 auf m390, A1 bis A3 | Probeläufer | Haiku | 1 | `_werkstatt/cache/probelauf/e2/P5-m390-*/**` | E2-PRUEF-B | Z-11 | E2-Tor | offen |
| E2-PROBE-04 | Probelauf P5 auf d1440, A1 bis A3 | Probeläufer | Haiku | 1 | `_werkstatt/cache/probelauf/e2/P5-d1440-*/**` | E2-PRUEF-B | Z-11 | E2-Tor | offen |
| E2-DOK-01 | Bildsatz der Referenzansicht nach `_werkstatt/bilder/e2/` (≤ 1440 px) | Dokumentar | Haiku | 1 | `_werkstatt/bilder/e2/**` | E2-PRUEF-B | Z-10 | E2-Tor | offen |
| E2-SICHT | Sichtabnahme der Referenzansicht nach Award-Rubrik, Ziel Ansichtswert ≥ 8 (frischer Opus-Unteragent, Auftrag Abschnitt 5) | Juror | Opus | 3 | `_werkstatt/berichte/E2-SICHT.md` (legt der Orchestrator aus der Rückgabe ab) | E2-DOK-01 | Z-04 | E2-Tor | offen |
| E2-TOR | Etappentor E2: Abgleich mit ABNAHME.md (L3, L7), Befunde werden Pakete der nächsten Etappe, höchstens zwei Anläufe | Orchestrator | Opus | 3 | `_werkstatt/PLAN.md`, `_werkstatt/ABNAHME.md`, `_werkstatt/STATUS.md` | E2-PRUEF-B, E2-PROBE-01, E2-PROBE-02, E2-PROBE-03, E2-PROBE-04, E2-SICHT | Z-01 bis Z-14 | E2-Tor | offen |

### E3 · Vorlagen, große Momente, Hauptansichten
| Kennung | Gegenstand | Rolle | Modell | Stufe | Schreibrechte | Abhängig von | Kriterium | Welle | Status |
|---|---|---|---|---|---|---|---|---|---|
| E3-ORCH-01a | Vorlage `ErzaehlSeite` für Erzählseiten nach Seitenformel K-009 | Orchestrator | Opus | 3 | `src/components/vorlagen/ErzaehlSeite.tsx` | E2-TOR | Z-03, Z-11 | E3-W1 | offen |
| E3-ORCH-01b | Vorlage `WissensSeite` für Wissensseiten nach Seitenformel K-009 | Orchestrator | Opus | 3 | `src/components/vorlagen/WissensSeite.tsx` | E2-TOR | Z-03, Z-11 | E3-W1 | offen |
| E3-ORCH-01c | Vorlage `OrtsSeite` für Ortsseiten nach Seitenformel K-009 | Orchestrator | Opus | 3 | `src/components/vorlagen/OrtsSeite.tsx` | E2-TOR | Z-03, Z-11 | E3-W1 | offen |
| E3-ORCH-01d | Vorlage `ArbeitsSeite` für Arbeitsseiten nach Seitenformel K-009 | Orchestrator | Opus | 3 | `src/components/vorlagen/ArbeitsSeite.tsx` | E2-TOR | Z-03, Z-11 | E3-W1 | offen |
| E3-GRAF-01 | Großer Moment `schichten` für `/bad`: Was unter der Fliese steckt (Untergrund, Abdichtung, Kleber, Fliese, Fuge), scrollgebunden; Registereintrag als Datei, reduzierte Bewegung, Budget | Grafiker | Haiku | 2 | `src/components/momente/schichten/**`, `_werkstatt/register/schichten.json` | E3-ORCH-01a | Z-04, Z-05 | E3-W1 | offen |
| E3-GRAF-02 | Großer Moment `weg` für `/bad/badsanierung`: Vom Anruf bis zur letzten Fuge als Weg mit Stationen; Registereintrag als Datei, reduzierte Bewegung, Budget | Grafiker | Haiku | 2 | `src/components/momente/weg/**`, `_werkstatt/register/weg.json` | E3-ORCH-01a | Z-04, Z-05 | E3-W1 | offen |
| E3-GRAF-03 | Großer Moment `gefaelle-dusche` für `/bad/barrierefreies-bad`: Wasser läuft über das Gefälle zum Ablauf; Registereintrag als Datei, reduzierte Bewegung, Budget | Grafiker | Haiku | 2 | `src/components/momente/gefaelle-dusche/**`, `_werkstatt/register/gefaelle-dusche.json` | E3-ORCH-01a | Z-04, Z-05 | E3-W1 | offen |
| E3-GRAF-04 | Großer Moment `gefaelle-balkon` für `/balkon-terrasse`: Regen läuft vom Balkon ab; Registereintrag als Datei, reduzierte Bewegung, Budget | Grafiker | Haiku | 2 | `src/components/momente/gefaelle-balkon/**`, `_werkstatt/register/gefaelle-balkon.json` | E3-ORCH-01a | Z-04, Z-05 | E3-W1 | offen |
| E3-GRAF-05 | Großer Moment `formatregler` für `/leistungen`: Formatvergleich 60 × 60 gegen 120 × 260 als Regler; Registereintrag als Datei, reduzierte Bewegung, Budget | Grafiker | Haiku | 2 | `src/components/momente/formatregler/**`, `_werkstatt/register/formatregler.json` | E3-ORCH-01a | Z-04, Z-05 | E3-W1 | offen |
| E3-GRAF-06 | Großer Moment `verband` für `/fliesen`: Verlegemuster zum Ausprobieren (Kreuzfuge, Halbverband, Drittelverband, Fischgrät); Registereintrag als Datei, reduzierte Bewegung, Budget | Grafiker | Haiku | 2 | `src/components/momente/verband/**`, `_werkstatt/register/verband.json` | E3-ORCH-01b | Z-04, Z-05 | E3-W1 | offen |
| E3-GRAF-07 | Großer Moment `vorher-nachher` für `/referenzen`: Vorher-Nachher-Regler (Außentreppe IMG_2527 → IMG_2525); Registereintrag als Datei, reduzierte Bewegung, Budget | Grafiker | Haiku | 2 | `src/components/momente/vorher-nachher/**`, `_werkstatt/register/vorher-nachher.json` | E3-ORCH-01a, E3-BILD-01 | Z-04, Z-05 | E3-W1 | offen |
| E3-GRAF-08 | Großer Moment `galerie-filter` für `/referenzen`: Galerie „Unsere Arbeiten“ mit Filter nach Raum; Registereintrag als Datei, reduzierte Bewegung, Budget | Grafiker | Haiku | 2 | `src/components/momente/galerie-filter/**`, `_werkstatt/register/galerie-filter.json` | E3-ORCH-01a, E3-BILD-01 | Z-04, Z-05 | E3-W1 | offen |
| E3-GRAF-09 | Großer Moment `karte` für `/ueber-uns`: Gezeichnete Einsatzkarte mit Aßlar in der Mitte (auch `/standorte`); Registereintrag als Datei, reduzierte Bewegung, Budget | Grafiker | Haiku | 2 | `src/components/momente/karte/**`, `_werkstatt/register/karte.json` | E3-ORCH-01a | Z-04, Z-05 | E3-W1 | offen |
| E3-BILD-01 | Webfassungen aller übrigen Bildplätze aus `_werkstatt/bildplaetze.md` (Galerie, Seitenbilder, Artikel, Ortsseiten, Musterbäder, OG-Bild 1200 × 630) | Bildbearbeiter | Haiku | 2 | `public/images/arbeiten/**`, `public/images/og/tezgel-og.jpg`, `_werkstatt/bilder/arbeiten-e3.json` | E2-BILD-02 | Z-13 | E3-W1 | offen |
| E3-TEXT-01 | Text `/bad` (erzaehl) nach Seitenformel und `_werkstatt/texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/bad.md` | E2-TOR | Z-12 | E3-W1 | offen |
| E3-LEKT-01 | Lektorat `/bad` nach Checkliste (Verständlichkeit, Schreibregeln, Fakten K-015, Suchbegriffe) | Lektor | Haiku | 2 | `_werkstatt/texte/bad.md` | E3-TEXT-01 | Z-12 | E3-W2 | offen |
| E3-TEXT-02 | Text `/bad/badsanierung` (erzaehl) nach Seitenformel und `_werkstatt/texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/bad-badsanierung.md` | E2-TOR | Z-12 | E3-W1 | offen |
| E3-LEKT-02 | Lektorat `/bad/badsanierung` nach Checkliste (Verständlichkeit, Schreibregeln, Fakten K-015, Suchbegriffe) | Lektor | Haiku | 2 | `_werkstatt/texte/bad-badsanierung.md` | E3-TEXT-02 | Z-12 | E3-W2 | offen |
| E3-TEXT-03 | Text `/leistungen` (erzaehl) nach Seitenformel und `_werkstatt/texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/leistungen.md` | E2-TOR | Z-12 | E3-W1 | offen |
| E3-LEKT-03 | Lektorat `/leistungen` nach Checkliste (Verständlichkeit, Schreibregeln, Fakten K-015, Suchbegriffe) | Lektor | Haiku | 2 | `_werkstatt/texte/leistungen.md` | E3-TEXT-03 | Z-12 | E3-W2 | offen |
| E3-TEXT-04 | Text `/fliesen` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/fliesen.md` | E2-TOR | Z-12 | E3-W1 | offen |
| E3-LEKT-04 | Lektorat `/fliesen` nach Checkliste (Verständlichkeit, Schreibregeln, Fakten K-015, Suchbegriffe) | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen.md` | E3-TEXT-04 | Z-12 | E3-W2 | offen |
| E3-TEXT-05 | Text `/balkon-terrasse` (erzaehl) nach Seitenformel und `_werkstatt/texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/balkon-terrasse.md` | E2-TOR | Z-12 | E3-W1 | offen |
| E3-LEKT-05 | Lektorat `/balkon-terrasse` nach Checkliste (Verständlichkeit, Schreibregeln, Fakten K-015, Suchbegriffe) | Lektor | Haiku | 2 | `_werkstatt/texte/balkon-terrasse.md` | E3-TEXT-05 | Z-12 | E3-W2 | offen |
| E3-TEXT-06 | Text `/referenzen` (erzaehl) nach Seitenformel und `_werkstatt/texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/referenzen.md` | E2-TOR | Z-12 | E3-W1 | offen |
| E3-LEKT-06 | Lektorat `/referenzen` nach Checkliste (Verständlichkeit, Schreibregeln, Fakten K-015, Suchbegriffe) | Lektor | Haiku | 2 | `_werkstatt/texte/referenzen.md` | E3-TEXT-06 | Z-12 | E3-W2 | offen |
| E3-TEXT-07 | Text `/ueber-uns` (erzaehl) nach Seitenformel und `_werkstatt/texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/ueber-uns.md` | E2-TOR | Z-12 | E3-W1 | offen |
| E3-LEKT-07 | Lektorat `/ueber-uns` nach Checkliste (Verständlichkeit, Schreibregeln, Fakten K-015, Suchbegriffe) | Lektor | Haiku | 2 | `_werkstatt/texte/ueber-uns.md` | E3-TEXT-07 | Z-12 | E3-W2 | offen |
| E3-TEXT-08 | Text `/kontakt` (arbeit) nach Seitenformel und `_werkstatt/texte/REF-start.md` (Abschnitt Anfrage) | Texter | Haiku | 2 | `_werkstatt/texte/kontakt.md` | E2-TOR | Z-12 | E3-W1 | offen |
| E3-LEKT-08 | Lektorat `/kontakt` nach Checkliste (Verständlichkeit, Schreibregeln, Fakten K-015, Suchbegriffe) | Lektor | Haiku | 2 | `_werkstatt/texte/kontakt.md` | E3-TEXT-08 | Z-12 | E3-W2 | offen |
| E3-TEXT-09 | Text `/blog` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/blog.md` | E2-TOR | Z-12 | E3-W1 | offen |
| E3-LEKT-09 | Lektorat `/blog` nach Checkliste (Verständlichkeit, Schreibregeln, Fakten K-015, Suchbegriffe) | Lektor | Haiku | 2 | `_werkstatt/texte/blog.md` | E3-TEXT-09 | Z-12 | E3-W2 | offen |
| E3-TEXT-ORTE-1 | Ortstexte Orte 1 bis 7 aus `src/config/cities.ts` als JSON (nur echte Angaben: Entfernung, Region, Anfahrt), nach `_werkstatt/texte/REF-ort-wetzlar.md` | Texter | Haiku | 2 | `_werkstatt/texte/orte-1.json` | E2-TOR | Z-12 | E3-W1 | offen |
| E3-LEKT-ORTE-1 | Lektorat Ortstexte Orte 1 bis 7 aus `src/config/cities.ts` | Lektor | Haiku | 2 | `_werkstatt/texte/orte-1.json` | E3-TEXT-ORTE-1 | Z-12 | E3-W2 | offen |
| E3-TEXT-ORTE-2 | Ortstexte Orte 8 bis 13 aus `src/config/cities.ts` als JSON (nur echte Angaben: Entfernung, Region, Anfahrt), nach `_werkstatt/texte/REF-ort-wetzlar.md` | Texter | Haiku | 2 | `_werkstatt/texte/orte-2.json` | E2-TOR | Z-12 | E3-W1 | offen |
| E3-LEKT-ORTE-2 | Lektorat Ortstexte Orte 8 bis 13 aus `src/config/cities.ts` | Lektor | Haiku | 2 | `_werkstatt/texte/orte-2.json` | E3-TEXT-ORTE-2 | Z-12 | E3-W2 | offen |
| E3-ORCH-02a | Registereinträge der großen Momente übertragen | Orchestrator | Opus | 3 | `src/lib/motion/register.ts`, `_werkstatt/register.json`, `test/bewegung.test.mjs` | E3-GRAF-01, E3-GRAF-02, E3-GRAF-03, E3-GRAF-04, E3-GRAF-05, E3-GRAF-06, E3-GRAF-07, E3-GRAF-08, E3-GRAF-09 | Z-05 | E3-W2 | offen |
| E3-ORCH-02b | Ortstexte übertragen | Orchestrator | Opus | 3 | `src/config/cities.ts` | E3-LEKT-ORTE-1, E3-LEKT-ORTE-2 | Z-12 | E3-W2 | offen |
| E3-ORCH-02c | Leistungstexte der Übersicht übertragen | Orchestrator | Opus | 3 | `src/config/services.js` | E3-LEKT-03 | Z-12 | E3-W2 | offen |
| E3-ORCH-02d | Bilddaten der Welle übertragen | Orchestrator | Opus | 3 | `src/config/arbeiten.ts` | E3-BILD-01 | Z-13 | E3-W2 | offen |
| E3-PRUEF-A1 | Stufe A je Paket der Welle E3-W1 (Typprüfung und Linter der geänderten Dateien, betroffene Tests, Zeichen und Lesbarkeit geänderter Seiten, ein Bild mobil und Desktop), ein Ergebnis je Paket, unabhängig | Prüfer | Haiku | 1 | `$SCRATCH/E3-PRUEF-A1/**` | E3-ORCH-01a, E3-ORCH-01b, E3-ORCH-01c, E3-ORCH-01d, E3-GRAF-01, E3-GRAF-02, E3-GRAF-03, E3-GRAF-04, E3-GRAF-05, E3-GRAF-06, E3-GRAF-07, E3-GRAF-08, E3-GRAF-09, E3-BILD-01, E3-TEXT-01, E3-TEXT-02, E3-TEXT-03, E3-TEXT-04, E3-TEXT-05, E3-TEXT-06, E3-TEXT-07, E3-TEXT-08, E3-TEXT-09, E3-TEXT-ORTE-1, E3-TEXT-ORTE-2 | Z-02, Z-09, Z-12 | E3-W1 | offen |
| E3-PRUEF-T1 | Textstichprobe der Welle E3-W1: 10 %, mindestens 5 Texte (bei weniger alle), gegen Schreibregeln, Faktenblatt und Suchbegriffe | Prüfer | Haiku | 1 | `$SCRATCH/E3-PRUEF-T1/**` | E3-TEXT-01, E3-TEXT-02, E3-TEXT-03, E3-TEXT-04, E3-TEXT-05, E3-TEXT-06, E3-TEXT-07, E3-TEXT-08, E3-TEXT-09, E3-TEXT-ORTE-1, E3-TEXT-ORTE-2 | Z-12 | E3-W1 | offen |
| E3-PRUEF-A2 | Stufe A je Paket der Welle E3-W2 (Typprüfung und Linter der geänderten Dateien, betroffene Tests, Zeichen und Lesbarkeit geänderter Seiten, ein Bild mobil und Desktop), ein Ergebnis je Paket, unabhängig | Prüfer | Haiku | 1 | `$SCRATCH/E3-PRUEF-A2/**` | E3-LEKT-01, E3-LEKT-02, E3-LEKT-03, E3-LEKT-04, E3-LEKT-05, E3-LEKT-06, E3-LEKT-07, E3-LEKT-08, E3-LEKT-09, E3-LEKT-ORTE-1, E3-LEKT-ORTE-2, E3-ORCH-02a, E3-ORCH-02b, E3-ORCH-02c, E3-ORCH-02d | Z-02, Z-09, Z-12 | E3-W2 | offen |
| E3-PRUEF-T2 | Textstichprobe der Welle E3-W2: 10 %, mindestens 5 Texte (bei weniger alle), gegen Schreibregeln, Faktenblatt und Suchbegriffe | Prüfer | Haiku | 1 | `$SCRATCH/E3-PRUEF-T2/**` | E3-LEKT-01, E3-LEKT-02, E3-LEKT-03, E3-LEKT-04, E3-LEKT-05, E3-LEKT-06, E3-LEKT-07, E3-LEKT-08, E3-LEKT-09, E3-LEKT-ORTE-1, E3-LEKT-ORTE-2 | Z-12 | E3-W2 | offen |
| E3-BAU-01 | Seite `/bad` nach Vorlage `ErzaehlSeite`, Text aus `_werkstatt/texte/bad.md`, Bilder nach `_werkstatt/bildplaetze.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/bad/page.jsx`, `src/components/seiten/bad/**` | E3-LEKT-01, E3-ORCH-01a, E3-GRAF-01, E3-ORCH-02d | Z-04, Z-09, Z-11, Z-13 | E3-W3 | offen |
| E3-BAU-02 | Seite `/bad/badsanierung` nach Vorlage `ErzaehlSeite`, Text aus `_werkstatt/texte/bad-badsanierung.md`, Bilder nach `_werkstatt/bildplaetze.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/bad/badsanierung/page.jsx`, `src/components/seiten/bad-badsanierung/**` | E3-LEKT-02, E3-ORCH-01a, E3-GRAF-02, E3-ORCH-02d | Z-04, Z-09, Z-11, Z-13 | E3-W3 | offen |
| E3-BAU-03 | Seite `/bad/barrierefreies-bad` nach Vorlage `ErzaehlSeite`, Text aus `_werkstatt/texte/REF-bereich-barrierefreies-bad.md`, Bilder nach `_werkstatt/bildplaetze.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/bad/barrierefreies-bad/page.jsx`, `src/components/seiten/bad-barrierefreies-bad/**` | E3-ORCH-01a, E3-GRAF-03, E3-ORCH-02d | Z-04, Z-09, Z-11, Z-13 | E3-W3 | offen |
| E3-BAU-04 | Seite `/leistungen` nach Vorlage `ErzaehlSeite`, Text aus `_werkstatt/texte/leistungen.md`, Bilder nach `_werkstatt/bildplaetze.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/leistungen/page.jsx`, `src/components/seiten/leistungen/**` | E3-LEKT-03, E3-ORCH-01a, E3-GRAF-05, E3-ORCH-02d | Z-04, Z-09, Z-11, Z-13 | E3-W3 | offen |
| E3-BAU-05 | Seite `/fliesen` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/fliesen.md`, Bilder nach `_werkstatt/bildplaetze.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/page.jsx`, `src/components/seiten/fliesen/**` | E3-LEKT-04, E3-ORCH-01b, E3-GRAF-06, E3-ORCH-02d | Z-04, Z-09, Z-11, Z-13 | E3-W3 | offen |
| E3-BAU-06 | Seite `/balkon-terrasse` nach Vorlage `ErzaehlSeite`, Text aus `_werkstatt/texte/balkon-terrasse.md`, Bilder nach `_werkstatt/bildplaetze.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/balkon-terrasse/page.jsx`, `src/components/seiten/balkon-terrasse/**` | E3-LEKT-05, E3-ORCH-01a, E3-GRAF-04, E3-ORCH-02d | Z-04, Z-09, Z-11, Z-13 | E3-W3 | offen |
| E3-BAU-07 | Seite `/referenzen` nach Vorlage `ErzaehlSeite`, Text aus `_werkstatt/texte/referenzen.md`, Bilder nach `_werkstatt/bildplaetze.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/referenzen/page.jsx`, `src/components/seiten/referenzen/**` | E3-LEKT-06, E3-ORCH-01a, E3-GRAF-07, E3-GRAF-08, E3-ORCH-02d | Z-04, Z-09, Z-11, Z-13 | E3-W3 | offen |
| E3-BAU-08 | Seite `/ueber-uns` nach Vorlage `ErzaehlSeite`, Text aus `_werkstatt/texte/ueber-uns.md`, Bilder nach `_werkstatt/bildplaetze.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/ueber-uns/page.jsx`, `src/components/seiten/ueber-uns/**` | E3-LEKT-07, E3-ORCH-01a, E3-GRAF-09, E3-ORCH-02d | Z-04, Z-09, Z-11, Z-13 | E3-W3 | offen |
| E3-BAU-09 | Seite `/kontakt` nach Vorlage `ArbeitsSeite`, Text aus `_werkstatt/texte/kontakt.md`, Bilder nach `_werkstatt/bildplaetze.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/kontakt/page.jsx`, `src/components/seiten/kontakt/**` | E3-LEKT-08, E3-ORCH-01d, E3-ORCH-02d | Z-04, Z-09, Z-11, Z-13 | E3-W3 | offen |
| E3-BAU-10 | Seite `/standorte/[stadt]` nach Vorlage `OrtsSeite`, Text aus `_werkstatt/texte/REF-ort-wetzlar.md`, Bilder nach `_werkstatt/bildplaetze.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/standorte/[stadt]/page.tsx`, `src/components/seiten/standorte-stadt/**` | E3-ORCH-02b, E3-ORCH-01c, E3-GRAF-09, E3-ORCH-02d | Z-04, Z-09, Z-11, Z-13 | E3-W3 | offen |
| E3-BAU-11 | Seite `/blog` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/blog.md`, Bilder nach `_werkstatt/bildplaetze.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/blog/page.jsx`, `src/components/seiten/blog/**` | E3-LEKT-09, E3-ORCH-01b, E3-ORCH-02d | Z-04, Z-09, Z-11, Z-13 | E3-W3 | offen |
| E3-PRUEF-A3 | Stufe A je Paket der Welle E3-W3 (Typprüfung und Linter der geänderten Dateien, betroffene Tests, Zeichen und Lesbarkeit geänderter Seiten, ein Bild mobil und Desktop), ein Ergebnis je Paket, unabhängig | Prüfer | Haiku | 1 | `$SCRATCH/E3-PRUEF-A3/**` | E3-BAU-01, E3-BAU-02, E3-BAU-03, E3-BAU-04, E3-BAU-05, E3-BAU-06, E3-BAU-07, E3-BAU-08, E3-BAU-09, E3-BAU-10, E3-BAU-11 | Z-02, Z-09, Z-12 | E3-W3 | offen |
| E3-PRUEF-B | Stufe B der 12 Hauptansichten | Prüfer | Haiku | 1 | `_werkstatt/belege/e3/**` | E3-PRUEF-A3 | Z-02 bis Z-09 | E3-Tor | offen |
| E3-PROBE-01 | Probelauf P1 auf m390, A1 bis A6 | Probeläufer | Haiku | 1 | `_werkstatt/cache/probelauf/e3/P1-m390-*/**` | E3-PRUEF-B | Z-11 | E3-Tor | offen |
| E3-PROBE-02 | Probelauf P1 auf d1440, A1 bis A6 | Probeläufer | Haiku | 1 | `_werkstatt/cache/probelauf/e3/P1-d1440-*/**` | E3-PRUEF-B | Z-11 | E3-Tor | offen |
| E3-PROBE-03 | Probelauf P2 auf t768, A1 bis A6 | Probeläufer | Haiku | 1 | `_werkstatt/cache/probelauf/e3/P2-t768-*/**` | E3-PRUEF-B | Z-11 | E3-Tor | offen |
| E3-PROBE-04 | Probelauf P2 auf d1440, A1 bis A6 | Probeläufer | Haiku | 1 | `_werkstatt/cache/probelauf/e3/P2-d1440-*/**` | E3-PRUEF-B | Z-11 | E3-Tor | offen |
| E3-PROBE-05 | Probelauf P3 auf m360, A1 bis A6 | Probeläufer | Haiku | 1 | `_werkstatt/cache/probelauf/e3/P3-m360-*/**` | E3-PRUEF-B | Z-11 | E3-Tor | offen |
| E3-PROBE-06 | Probelauf P3 auf d1440, A1 bis A6 | Probeläufer | Haiku | 1 | `_werkstatt/cache/probelauf/e3/P3-d1440-*/**` | E3-PRUEF-B | Z-11 | E3-Tor | offen |
| E3-PROBE-07 | Probelauf P4 auf d1280, A1 bis A6 | Probeläufer | Haiku | 1 | `_werkstatt/cache/probelauf/e3/P4-d1280-*/**` | E3-PRUEF-B | Z-11 | E3-Tor | offen |
| E3-PROBE-08 | Probelauf P4 auf m390, A1 bis A6 | Probeläufer | Haiku | 1 | `_werkstatt/cache/probelauf/e3/P4-m390-*/**` | E3-PRUEF-B | Z-11 | E3-Tor | offen |
| E3-PROBE-09 | Probelauf P5 auf m390, A1 bis A6 | Probeläufer | Haiku | 1 | `_werkstatt/cache/probelauf/e3/P5-m390-*/**` | E3-PRUEF-B | Z-11 | E3-Tor | offen |
| E3-PROBE-10 | Probelauf P5 auf d1440, A1 bis A6 | Probeläufer | Haiku | 1 | `_werkstatt/cache/probelauf/e3/P5-d1440-*/**` | E3-PRUEF-B | Z-11 | E3-Tor | offen |
| E3-DOK-01 | Bildsatz der Hauptansichten nach `_werkstatt/cache/bilder/e3/` für die Sichtabnahme | Dokumentar | Haiku | 1 | `_werkstatt/cache/bilder/e3/**` | E3-PRUEF-B | Z-04 | E3-Tor | offen |
| E3-SICHT | Sichtabnahme der Hauptansichten nach Rubrik (Orchestrator am Bildsatz) | Orchestrator | Opus | 3 | `_werkstatt/berichte/E3-SICHT.md` | E3-DOK-01 | Z-04 | E3-Tor | offen |
| E3-TOR | Etappentor E3: Abgleich mit ABNAHME.md (L3, L7), Befunde werden Pakete der nächsten Etappe, höchstens zwei Anläufe | Orchestrator | Opus | 3 | `_werkstatt/PLAN.md`, `_werkstatt/ABNAHME.md`, `_werkstatt/STATUS.md` | E3-PRUEF-B, E3-PROBE-01, E3-PROBE-02, E3-PROBE-03, E3-PROBE-04, E3-PROBE-05, E3-PROBE-06, E3-PROBE-07, E3-PROBE-08, E3-PROBE-09, E3-PROBE-10, E3-SICHT | Z-01 bis Z-14 | E3-Tor | offen |

### E4 · Übrige Seiten
| Kennung | Gegenstand | Rolle | Modell | Stufe | Schreibrechte | Abhängig von | Kriterium | Welle | Status |
|---|---|---|---|---|---|---|---|---|---|
| E4-TEXT-01 | Text `/ausstellung/giessen` (erzaehl) nach Seitenformel und `_werkstatt/texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/ausstellung-giessen.md` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-01 | Lektorat `/ausstellung/giessen` | Lektor | Haiku | 2 | `_werkstatt/texte/ausstellung-giessen.md` | E4-TEXT-01 | Z-12 | E4-W2 | offen |
| E4-BAU-01 | Seite `/ausstellung/giessen` nach Vorlage `ErzaehlSeite`, Text aus `_werkstatt/texte/ausstellung-giessen.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/ausstellung/giessen/page.jsx`, `src/components/seiten/ausstellung-giessen/**` | E4-LEKT-01, E3-ORCH-01a | Z-04, Z-09, Z-11, Z-13 | E4-W3 | offen |
| E4-TEXT-02 | Text `/bad/badanfrage` (arbeit) nach Seitenformel und `_werkstatt/texte/REF-start.md` (Abschnitt Anfrage) | Texter | Haiku | 2 | `_werkstatt/texte/bad-badanfrage.md` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-02 | Lektorat `/bad/badanfrage` | Lektor | Haiku | 2 | `_werkstatt/texte/bad-badanfrage.md` | E4-TEXT-02 | Z-12 | E4-W2 | offen |
| E4-BAU-02 | Seite `/bad/badanfrage` nach Vorlage `ArbeitsSeite`, Text aus `_werkstatt/texte/bad-badanfrage.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/bad/badanfrage/page.jsx`, `src/components/seiten/bad-badanfrage/**` | E4-LEKT-02, E3-ORCH-01d | Z-04, Z-09, Z-11, Z-13 | E4-W3 | offen |
| E4-TEXT-03 | Text `/bad/musterbaeder` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/bad-musterbaeder.md` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-03 | Lektorat `/bad/musterbaeder` | Lektor | Haiku | 2 | `_werkstatt/texte/bad-musterbaeder.md` | E4-TEXT-03 | Z-12 | E4-W2 | offen |
| E4-BAU-03 | Seite `/bad/musterbaeder` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/bad-musterbaeder.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/bad/musterbaeder/page.jsx`, `src/components/seiten/bad-musterbaeder/**` | E4-LEKT-03, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W3 | offen |
| E4-TEXT-04 | Text `/balkon-terrasse/stelzlager` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/balkon-terrasse-stelzlager.md` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-04 | Lektorat `/balkon-terrasse/stelzlager` | Lektor | Haiku | 2 | `_werkstatt/texte/balkon-terrasse-stelzlager.md` | E4-TEXT-04 | Z-12 | E4-W2 | offen |
| E4-BAU-04 | Seite `/balkon-terrasse/stelzlager` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/balkon-terrasse-stelzlager.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/balkon-terrasse/stelzlager/page.jsx`, `src/components/seiten/balkon-terrasse-stelzlager/**` | E4-LEKT-04, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W3 | offen |
| E4-TEXT-05 | Text `/downloads` (arbeit) nach Seitenformel und `_werkstatt/texte/REF-start.md` (Abschnitt Anfrage) | Texter | Haiku | 2 | `_werkstatt/texte/downloads.md` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-05 | Lektorat `/downloads` | Lektor | Haiku | 2 | `_werkstatt/texte/downloads.md` | E4-TEXT-05 | Z-12 | E4-W2 | offen |
| E4-BAU-05 | Seite `/downloads` nach Vorlage `ArbeitsSeite`, Text aus `_werkstatt/texte/downloads.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/downloads/page.jsx`, `src/components/seiten/downloads/**` | E4-LEKT-05, E3-ORCH-01d | Z-04, Z-09, Z-11, Z-13 | E4-W3 | offen |
| E4-TEXT-06 | Text `/fliesen/auf-fussbodenheizung` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-auf-fussbodenheizung.md` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-06 | Lektorat `/fliesen/auf-fussbodenheizung` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-auf-fussbodenheizung.md` | E4-TEXT-06 | Z-12 | E4-W2 | offen |
| E4-BAU-06 | Seite `/fliesen/auf-fussbodenheizung` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/fliesen-auf-fussbodenheizung.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/auf-fussbodenheizung/page.jsx`, `src/components/seiten/fliesen-auf-fussbodenheizung/**` | E4-LEKT-06, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W3 | offen |
| E4-TEXT-07 | Text `/fliesen/flur-diele` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-flur-diele.md` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-07 | Lektorat `/fliesen/flur-diele` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-flur-diele.md` | E4-TEXT-07 | Z-12 | E4-W2 | offen |
| E4-BAU-07 | Seite `/fliesen/flur-diele` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/fliesen-flur-diele.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/flur-diele/page.jsx`, `src/components/seiten/fliesen-flur-diele/**` | E4-LEKT-07, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W3 | offen |
| E4-TEXT-08 | Text `/fliesen/holzoptik` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-holzoptik.md` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-08 | Lektorat `/fliesen/holzoptik` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-holzoptik.md` | E4-TEXT-08 | Z-12 | E4-W2 | offen |
| E4-BAU-08 | Seite `/fliesen/holzoptik` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/fliesen-holzoptik.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/holzoptik/page.jsx`, `src/components/seiten/fliesen-holzoptik/**` | E4-LEKT-08, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W3 | offen |
| E4-TEXT-09 | Text `/fliesen/neubau` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-neubau.md` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-09 | Lektorat `/fliesen/neubau` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-neubau.md` | E4-TEXT-09 | Z-12 | E4-W2 | offen |
| E4-BAU-09 | Seite `/fliesen/neubau` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/fliesen-neubau.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/neubau/page.jsx`, `src/components/seiten/fliesen-neubau/**` | E4-LEKT-09, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W3 | offen |
| E4-TEXT-10 | Text `/fliesen/verlegetechnik` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-verlegetechnik.md` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-10 | Lektorat `/fliesen/verlegetechnik` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-verlegetechnik.md` | E4-TEXT-10 | Z-12 | E4-W2 | offen |
| E4-BAU-10 | Seite `/fliesen/verlegetechnik` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/fliesen-verlegetechnik.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/verlegetechnik/page.jsx`, `src/components/seiten/fliesen-verlegetechnik/**` | E4-LEKT-10, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W3 | offen |
| E4-TEXT-11 | Text `/karriere` (erzaehl) nach Seitenformel und `_werkstatt/texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/karriere.md` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-11 | Lektorat `/karriere` | Lektor | Haiku | 2 | `_werkstatt/texte/karriere.md` | E4-TEXT-11 | Z-12 | E4-W2 | offen |
| E4-BAU-11 | Seite `/karriere` nach Vorlage `ErzaehlSeite`, Text aus `_werkstatt/texte/karriere.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/karriere/page.jsx`, `src/components/seiten/karriere/**` | E4-LEKT-11, E3-ORCH-01a | Z-04, Z-09, Z-11, Z-13 | E4-W3 | offen |
| E4-TEXT-12 | Text `/naturstein` (erzaehl) nach Seitenformel und `_werkstatt/texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/naturstein.md` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-12 | Lektorat `/naturstein` | Lektor | Haiku | 2 | `_werkstatt/texte/naturstein.md` | E4-TEXT-12 | Z-12 | E4-W2 | offen |
| E4-BAU-12 | Seite `/naturstein` nach Vorlage `ErzaehlSeite`, Text aus `_werkstatt/texte/naturstein.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/naturstein/page.jsx`, `src/components/seiten/naturstein/**` | E4-LEKT-12, E3-ORCH-01a | Z-04, Z-09, Z-11, Z-13 | E4-W3 | offen |
| E4-TEXT-13 | Text `/partner` (erzaehl) nach Seitenformel und `_werkstatt/texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/partner.md` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-13 | Lektorat `/partner` | Lektor | Haiku | 2 | `_werkstatt/texte/partner.md` | E4-TEXT-13 | Z-12 | E4-W2 | offen |
| E4-BAU-13 | Seite `/partner` nach Vorlage `ErzaehlSeite`, Text aus `_werkstatt/texte/partner.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/partner/page.jsx`, `src/components/seiten/partner/**` | E4-LEKT-13, E3-ORCH-01a | Z-04, Z-09, Z-11, Z-13 | E4-W3 | offen |
| E4-TEXT-14 | Text `/standorte` (ort) nach Seitenformel und `_werkstatt/texte/REF-ort-wetzlar.md` | Texter | Haiku | 2 | `_werkstatt/texte/standorte.md` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-14 | Lektorat `/standorte` | Lektor | Haiku | 2 | `_werkstatt/texte/standorte.md` | E4-TEXT-14 | Z-12 | E4-W2 | offen |
| E4-BAU-14 | Seite `/standorte` nach Vorlage `OrtsSeite`, Text aus `_werkstatt/texte/standorte.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/standorte/page.tsx`, `src/components/seiten/standorte/**` | E4-LEKT-14, E3-ORCH-01c | Z-04, Z-09, Z-11, Z-13 | E4-W3 | offen |
| E4-TEXT-15 | Text `/treppen` (erzaehl) nach Seitenformel und `_werkstatt/texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/treppen.md` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-15 | Lektorat `/treppen` | Lektor | Haiku | 2 | `_werkstatt/texte/treppen.md` | E4-TEXT-15 | Z-12 | E4-W2 | offen |
| E4-BAU-15 | Seite `/treppen` nach Vorlage `ErzaehlSeite`, Text aus `_werkstatt/texte/treppen.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/treppen/page.jsx`, `src/components/seiten/treppen/**` | E4-LEKT-15, E3-ORCH-01a | Z-04, Z-09, Z-11, Z-13 | E4-W3 | offen |
| E4-TEXT-16 | Text `/treppen/treppenhaus` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/treppen-treppenhaus.md` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-16 | Lektorat `/treppen/treppenhaus` | Lektor | Haiku | 2 | `_werkstatt/texte/treppen-treppenhaus.md` | E4-TEXT-16 | Z-12 | E4-W2 | offen |
| E4-BAU-16 | Seite `/treppen/treppenhaus` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/treppen-treppenhaus.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/treppen/treppenhaus/page.jsx`, `src/components/seiten/treppen-treppenhaus/**` | E4-LEKT-16, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W3 | offen |
| E4-BAU-17 | Seite `/untergrund-abdichtung/din-18534` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/REF-wissen-din-18534.md` (Referenztext) | Baumeister | Haiku | 2 | `src/app/(bestand)/untergrund-abdichtung/din-18534/page.jsx`, `src/components/seiten/untergrund-abdichtung-din-18534/**` | E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W3 | offen |
| E4-TEXT-18 | Text `/untergrund-abdichtung/fliesen-auf-fliesen` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/untergrund-abdichtung-fliesen-auf-fliesen.md` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-18 | Lektorat `/untergrund-abdichtung/fliesen-auf-fliesen` | Lektor | Haiku | 2 | `_werkstatt/texte/untergrund-abdichtung-fliesen-auf-fliesen.md` | E4-TEXT-18 | Z-12 | E4-W2 | offen |
| E4-BAU-18 | Seite `/untergrund-abdichtung/fliesen-auf-fliesen` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/untergrund-abdichtung-fliesen-auf-fliesen.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/untergrund-abdichtung/fliesen-auf-fliesen/page.jsx`, `src/components/seiten/untergrund-abdichtung-fliesen-auf-fliesen/**` | E4-LEKT-18, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W3 | offen |
| E4-TEXT-19 | Text `/ausstellung/wetzlar` (erzaehl) nach Seitenformel und `_werkstatt/texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/ausstellung-wetzlar.md` | E3-TOR | Z-12 | E4-W2 | offen |
| E4-LEKT-19 | Lektorat `/ausstellung/wetzlar` | Lektor | Haiku | 2 | `_werkstatt/texte/ausstellung-wetzlar.md` | E4-TEXT-19 | Z-12 | E4-W3 | offen |
| E4-BAU-19 | Seite `/ausstellung/wetzlar` nach Vorlage `ErzaehlSeite`, Text aus `_werkstatt/texte/ausstellung-wetzlar.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/ausstellung/wetzlar/page.jsx`, `src/components/seiten/ausstellung-wetzlar/**` | E4-LEKT-19, E3-ORCH-01a | Z-04, Z-09, Z-11, Z-13 | E4-W4 | offen |
| E4-TEXT-20 | Text `/bad/badplaner` (arbeit) nach Seitenformel und `_werkstatt/texte/REF-start.md` (Abschnitt Anfrage) | Texter | Haiku | 2 | `_werkstatt/texte/bad-badplaner.md` | E3-TOR | Z-12 | E4-W2 | offen |
| E4-LEKT-20 | Lektorat `/bad/badplaner` | Lektor | Haiku | 2 | `_werkstatt/texte/bad-badplaner.md` | E4-TEXT-20 | Z-12 | E4-W3 | offen |
| E4-BAU-20 | Seite `/bad/badplaner` nach Vorlage `ArbeitsSeite`, Text aus `_werkstatt/texte/bad-badplaner.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/bad/badplaner/page.jsx`, `src/components/seiten/bad-badplaner/**` | E4-LEKT-20, E3-ORCH-01d | Z-04, Z-09, Z-11, Z-13 | E4-W4 | offen |
| E4-TEXT-21 | Text `/bad/projekt-check` (arbeit) nach Seitenformel und `_werkstatt/texte/REF-start.md` (Abschnitt Anfrage) | Texter | Haiku | 2 | `_werkstatt/texte/bad-projekt-check.md` | E3-TOR | Z-12 | E4-W2 | offen |
| E4-LEKT-21 | Lektorat `/bad/projekt-check` | Lektor | Haiku | 2 | `_werkstatt/texte/bad-projekt-check.md` | E4-TEXT-21 | Z-12 | E4-W3 | offen |
| E4-BAU-21 | Seite `/bad/projekt-check` nach Vorlage `ArbeitsSeite`, Text aus `_werkstatt/texte/bad-projekt-check.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/bad/projekt-check/page.jsx`, `src/components/seiten/bad-projekt-check/**` | E4-LEKT-21, E3-ORCH-01d | Z-04, Z-09, Z-11, Z-13 | E4-W4 | offen |
| E4-TEXT-22 | Text `/balkon-terrasse/terrassenplatten` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/balkon-terrasse-terrassenplatten.md` | E3-TOR | Z-12 | E4-W2 | offen |
| E4-LEKT-22 | Lektorat `/balkon-terrasse/terrassenplatten` | Lektor | Haiku | 2 | `_werkstatt/texte/balkon-terrasse-terrassenplatten.md` | E4-TEXT-22 | Z-12 | E4-W3 | offen |
| E4-BAU-22 | Seite `/balkon-terrasse/terrassenplatten` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/balkon-terrasse-terrassenplatten.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/balkon-terrasse/terrassenplatten/page.jsx`, `src/components/seiten/balkon-terrasse-terrassenplatten/**` | E4-LEKT-22, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W4 | offen |
| E4-TEXT-23 | Text `/faq` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/faq.md` | E3-TOR | Z-12 | E4-W2 | offen |
| E4-LEKT-23 | Lektorat `/faq` | Lektor | Haiku | 2 | `_werkstatt/texte/faq.md` | E4-TEXT-23 | Z-12 | E4-W3 | offen |
| E4-BAU-23 | Seite `/faq` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/faq.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/faq/page.jsx`, `src/components/seiten/faq/**` | E4-LEKT-23, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W4 | offen |
| E4-TEXT-24 | Text `/fliesen/festpreisangebot` (arbeit) nach Seitenformel und `_werkstatt/texte/REF-start.md` (Abschnitt Anfrage) | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-festpreisangebot.md` | E3-TOR | Z-12 | E4-W2 | offen |
| E4-LEKT-24 | Lektorat `/fliesen/festpreisangebot` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-festpreisangebot.md` | E4-TEXT-24 | Z-12 | E4-W3 | offen |
| E4-BAU-24 | Seite `/fliesen/festpreisangebot` nach Vorlage `ArbeitsSeite`, Text aus `_werkstatt/texte/fliesen-festpreisangebot.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/festpreisangebot/page.jsx`, `src/components/seiten/fliesen-festpreisangebot/**` | E4-LEKT-24, E3-ORCH-01d | Z-04, Z-09, Z-11, Z-13 | E4-W4 | offen |
| E4-TEXT-25 | Text `/fliesen/fugensanierung` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-fugensanierung.md` | E3-TOR | Z-12 | E4-W2 | offen |
| E4-LEKT-25 | Lektorat `/fliesen/fugensanierung` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-fugensanierung.md` | E4-TEXT-25 | Z-12 | E4-W3 | offen |
| E4-BAU-25 | Seite `/fliesen/fugensanierung` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/fliesen-fugensanierung.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/fugensanierung/page.jsx`, `src/components/seiten/fliesen-fugensanierung/**` | E4-LEKT-25, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W4 | offen |
| E4-TEXT-26 | Text `/fliesen/konfigurator` (arbeit) nach Seitenformel und `_werkstatt/texte/REF-start.md` (Abschnitt Anfrage) | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-konfigurator.md` | E3-TOR | Z-12 | E4-W2 | offen |
| E4-LEKT-26 | Lektorat `/fliesen/konfigurator` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-konfigurator.md` | E4-TEXT-26 | Z-12 | E4-W3 | offen |
| E4-BAU-26 | Seite `/fliesen/konfigurator` nach Vorlage `ArbeitsSeite`, Text aus `_werkstatt/texte/fliesen-konfigurator.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/konfigurator/page.jsx`, `src/components/seiten/fliesen-konfigurator/**` | E4-LEKT-26, E3-ORCH-01d | Z-04, Z-09, Z-11, Z-13 | E4-W4 | offen |
| E4-TEXT-27 | Text `/fliesen/renovierung` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-renovierung.md` | E3-TOR | Z-12 | E4-W2 | offen |
| E4-LEKT-27 | Lektorat `/fliesen/renovierung` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-renovierung.md` | E4-TEXT-27 | Z-12 | E4-W3 | offen |
| E4-BAU-27 | Seite `/fliesen/renovierung` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/fliesen-renovierung.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/renovierung/page.jsx`, `src/components/seiten/fliesen-renovierung/**` | E4-LEKT-27, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W4 | offen |
| E4-TEXT-28 | Text `/fliesenreparatur` (erzaehl) nach Seitenformel und `_werkstatt/texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/fliesenreparatur.md` | E3-TOR | Z-12 | E4-W2 | offen |
| E4-LEKT-28 | Lektorat `/fliesenreparatur` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesenreparatur.md` | E4-TEXT-28 | Z-12 | E4-W3 | offen |
| E4-BAU-28 | Seite `/fliesenreparatur` nach Vorlage `ErzaehlSeite`, Text aus `_werkstatt/texte/fliesenreparatur.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesenreparatur/page.tsx`, `src/components/seiten/fliesenreparatur/**` | E4-LEKT-28, E3-ORCH-01a | Z-04, Z-09, Z-11, Z-13 | E4-W4 | offen |
| E4-TEXT-29 | Text `/karriere/ausbildung` (erzaehl) nach Seitenformel und `_werkstatt/texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/karriere-ausbildung.md` | E3-TOR | Z-12 | E4-W2 | offen |
| E4-LEKT-29 | Lektorat `/karriere/ausbildung` | Lektor | Haiku | 2 | `_werkstatt/texte/karriere-ausbildung.md` | E4-TEXT-29 | Z-12 | E4-W3 | offen |
| E4-BAU-29 | Seite `/karriere/ausbildung` nach Vorlage `ErzaehlSeite`, Text aus `_werkstatt/texte/karriere-ausbildung.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/karriere/ausbildung/page.jsx`, `src/components/seiten/karriere-ausbildung/**` | E4-LEKT-29, E3-ORCH-01a | Z-04, Z-09, Z-11, Z-13 | E4-W4 | offen |
| E4-TEXT-30 | Text `/naturstein/granit` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/naturstein-granit.md` | E3-TOR | Z-12 | E4-W2 | offen |
| E4-LEKT-30 | Lektorat `/naturstein/granit` | Lektor | Haiku | 2 | `_werkstatt/texte/naturstein-granit.md` | E4-TEXT-30 | Z-12 | E4-W3 | offen |
| E4-BAU-30 | Seite `/naturstein/granit` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/naturstein-granit.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/naturstein/granit/page.jsx`, `src/components/seiten/naturstein-granit/**` | E4-LEKT-30, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W4 | offen |
| E4-TEXT-31 | Text `/preise` (arbeit) nach Seitenformel und `_werkstatt/texte/REF-start.md` (Abschnitt Anfrage) | Texter | Haiku | 2 | `_werkstatt/texte/preise.md` | E3-TOR | Z-12 | E4-W2 | offen |
| E4-LEKT-31 | Lektorat `/preise` | Lektor | Haiku | 2 | `_werkstatt/texte/preise.md` | E4-TEXT-31 | Z-12 | E4-W3 | offen |
| E4-BAU-31 | Seite `/preise` nach Vorlage `ArbeitsSeite`, Text aus `_werkstatt/texte/preise.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/preise/page.jsx`, `src/components/seiten/preise/**` | E4-LEKT-31, E3-ORCH-01d | Z-04, Z-09, Z-11, Z-13 | E4-W4 | offen |
| E4-TEXT-32 | Text `/team` (erzaehl) nach Seitenformel und `_werkstatt/texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/team.md` | E3-TOR | Z-12 | E4-W2 | offen |
| E4-LEKT-32 | Lektorat `/team` | Lektor | Haiku | 2 | `_werkstatt/texte/team.md` | E4-TEXT-32 | Z-12 | E4-W3 | offen |
| E4-BAU-32 | Seite `/team` nach Vorlage `ErzaehlSeite`, Text aus `_werkstatt/texte/team.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/team/page.jsx`, `src/components/seiten/team/**` | E4-LEKT-32, E3-ORCH-01a | Z-04, Z-09, Z-11, Z-13 | E4-W4 | offen |
| E4-TEXT-33 | Text `/treppen/aussentreppe` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/treppen-aussentreppe.md` | E3-TOR | Z-12 | E4-W2 | offen |
| E4-LEKT-33 | Lektorat `/treppen/aussentreppe` | Lektor | Haiku | 2 | `_werkstatt/texte/treppen-aussentreppe.md` | E4-TEXT-33 | Z-12 | E4-W3 | offen |
| E4-BAU-33 | Seite `/treppen/aussentreppe` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/treppen-aussentreppe.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/treppen/aussentreppe/page.jsx`, `src/components/seiten/treppen-aussentreppe/**` | E4-LEKT-33, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W4 | offen |
| E4-TEXT-34 | Text `/untergrund-abdichtung` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/untergrund-abdichtung.md` | E3-TOR | Z-12 | E4-W2 | offen |
| E4-LEKT-34 | Lektorat `/untergrund-abdichtung` | Lektor | Haiku | 2 | `_werkstatt/texte/untergrund-abdichtung.md` | E4-TEXT-34 | Z-12 | E4-W3 | offen |
| E4-BAU-34 | Seite `/untergrund-abdichtung` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/untergrund-abdichtung.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/untergrund-abdichtung/page.jsx`, `src/components/seiten/untergrund-abdichtung/**` | E4-LEKT-34, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W4 | offen |
| E4-TEXT-35 | Text `/untergrund-abdichtung/entkopplung` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/untergrund-abdichtung-entkopplung.md` | E3-TOR | Z-12 | E4-W2 | offen |
| E4-LEKT-35 | Lektorat `/untergrund-abdichtung/entkopplung` | Lektor | Haiku | 2 | `_werkstatt/texte/untergrund-abdichtung-entkopplung.md` | E4-TEXT-35 | Z-12 | E4-W3 | offen |
| E4-BAU-35 | Seite `/untergrund-abdichtung/entkopplung` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/untergrund-abdichtung-entkopplung.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/untergrund-abdichtung/entkopplung/page.jsx`, `src/components/seiten/untergrund-abdichtung-entkopplung/**` | E4-LEKT-35, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W4 | offen |
| E4-TEXT-36 | Text `/unternehmen` (erzaehl) nach Seitenformel und `_werkstatt/texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/unternehmen.md` | E3-TOR | Z-12 | E4-W2 | offen |
| E4-LEKT-36 | Lektorat `/unternehmen` | Lektor | Haiku | 2 | `_werkstatt/texte/unternehmen.md` | E4-TEXT-36 | Z-12 | E4-W3 | offen |
| E4-BAU-36 | Seite `/unternehmen` nach Vorlage `ErzaehlSeite`, Text aus `_werkstatt/texte/unternehmen.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/unternehmen/page.jsx`, `src/components/seiten/unternehmen/**` | E4-LEKT-36, E3-ORCH-01a | Z-04, Z-09, Z-11, Z-13 | E4-W4 | offen |
| E4-TEXT-37 | Text `/bad/bad-aus-einer-hand` (erzaehl) nach Seitenformel und `_werkstatt/texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/bad-bad-aus-einer-hand.md` | E3-TOR | Z-12 | E4-W3 | offen |
| E4-LEKT-37 | Lektorat `/bad/bad-aus-einer-hand` | Lektor | Haiku | 2 | `_werkstatt/texte/bad-bad-aus-einer-hand.md` | E4-TEXT-37 | Z-12 | E4-W4 | offen |
| E4-BAU-37 | Seite `/bad/bad-aus-einer-hand` nach Vorlage `ErzaehlSeite`, Text aus `_werkstatt/texte/bad-bad-aus-einer-hand.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/bad/bad-aus-einer-hand/page.jsx`, `src/components/seiten/bad-bad-aus-einer-hand/**` | E4-LEKT-37, E3-ORCH-01a | Z-04, Z-09, Z-11, Z-13 | E4-W5 | offen |
| E4-TEXT-38 | Text `/bad/fliesen` (erzaehl) nach Seitenformel und `_werkstatt/texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/bad-fliesen.md` | E3-TOR | Z-12 | E4-W3 | offen |
| E4-LEKT-38 | Lektorat `/bad/fliesen` | Lektor | Haiku | 2 | `_werkstatt/texte/bad-fliesen.md` | E4-TEXT-38 | Z-12 | E4-W4 | offen |
| E4-BAU-38 | Seite `/bad/fliesen` nach Vorlage `ErzaehlSeite`, Text aus `_werkstatt/texte/bad-fliesen.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/bad/fliesen/page.jsx`, `src/components/seiten/bad-fliesen/**` | E4-LEKT-38, E3-ORCH-01a | Z-04, Z-09, Z-11, Z-13 | E4-W5 | offen |
| E4-TEXT-39 | Text `/balkon-terrasse/balkonsanierung` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/balkon-terrasse-balkonsanierung.md` | E3-TOR | Z-12 | E4-W3 | offen |
| E4-LEKT-39 | Lektorat `/balkon-terrasse/balkonsanierung` | Lektor | Haiku | 2 | `_werkstatt/texte/balkon-terrasse-balkonsanierung.md` | E4-TEXT-39 | Z-12 | E4-W4 | offen |
| E4-BAU-39 | Seite `/balkon-terrasse/balkonsanierung` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/balkon-terrasse-balkonsanierung.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/balkon-terrasse/balkonsanierung/page.jsx`, `src/components/seiten/balkon-terrasse-balkonsanierung/**` | E4-LEKT-39, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W5 | offen |
| E4-TEXT-40 | Text `/beratung` (arbeit) nach Seitenformel und `_werkstatt/texte/REF-start.md` (Abschnitt Anfrage) | Texter | Haiku | 2 | `_werkstatt/texte/beratung.md` | E3-TOR | Z-12 | E4-W3 | offen |
| E4-LEKT-40 | Lektorat `/beratung` | Lektor | Haiku | 2 | `_werkstatt/texte/beratung.md` | E4-TEXT-40 | Z-12 | E4-W4 | offen |
| E4-BAU-40 | Seite `/beratung` nach Vorlage `ArbeitsSeite`, Text aus `_werkstatt/texte/beratung.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/beratung/page.jsx`, `src/components/seiten/beratung/**` | E4-LEKT-40, E3-ORCH-01d | Z-04, Z-09, Z-11, Z-13 | E4-W5 | offen |
| E4-TEXT-41 | Text `/fliesen/abnahme` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-abnahme.md` | E3-TOR | Z-12 | E4-W3 | offen |
| E4-LEKT-41 | Lektorat `/fliesen/abnahme` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-abnahme.md` | E4-TEXT-41 | Z-12 | E4-W4 | offen |
| E4-BAU-41 | Seite `/fliesen/abnahme` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/fliesen-abnahme.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/abnahme/page.jsx`, `src/components/seiten/fliesen-abnahme/**` | E4-LEKT-41, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W5 | offen |
| E4-TEXT-42 | Text `/fliesen/fliesenarten` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-fliesenarten.md` | E3-TOR | Z-12 | E4-W3 | offen |
| E4-LEKT-42 | Lektorat `/fliesen/fliesenarten` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-fliesenarten.md` | E4-TEXT-42 | Z-12 | E4-W4 | offen |
| E4-BAU-42 | Seite `/fliesen/fliesenarten` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/fliesen-fliesenarten.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/fliesenarten/page.jsx`, `src/components/seiten/fliesen-fliesenarten/**` | E4-LEKT-42, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W5 | offen |
| E4-TEXT-43 | Text `/fliesen/grossformat` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-grossformat.md` | E3-TOR | Z-12 | E4-W3 | offen |
| E4-LEKT-43 | Lektorat `/fliesen/grossformat` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-grossformat.md` | E4-TEXT-43 | Z-12 | E4-W4 | offen |
| E4-BAU-43 | Seite `/fliesen/grossformat` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/fliesen-grossformat.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/grossformat/page.jsx`, `src/components/seiten/fliesen-grossformat/**` | E4-LEKT-43, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W5 | offen |
| E4-TEXT-44 | Text `/fliesen/kueche` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-kueche.md` | E3-TOR | Z-12 | E4-W3 | offen |
| E4-LEKT-44 | Lektorat `/fliesen/kueche` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-kueche.md` | E4-TEXT-44 | Z-12 | E4-W4 | offen |
| E4-BAU-44 | Seite `/fliesen/kueche` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/fliesen-kueche.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/kueche/page.jsx`, `src/components/seiten/fliesen-kueche/**` | E4-LEKT-44, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W5 | offen |
| E4-TEXT-45 | Text `/fliesen/verlegemuster` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/fliesen-verlegemuster.md` | E3-TOR | Z-12 | E4-W3 | offen |
| E4-LEKT-45 | Lektorat `/fliesen/verlegemuster` | Lektor | Haiku | 2 | `_werkstatt/texte/fliesen-verlegemuster.md` | E4-TEXT-45 | Z-12 | E4-W4 | offen |
| E4-BAU-45 | Seite `/fliesen/verlegemuster` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/fliesen-verlegemuster.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/fliesen/verlegemuster/page.jsx`, `src/components/seiten/fliesen-verlegemuster/**` | E4-LEKT-45, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W5 | offen |
| E4-TEXT-46 | Text `/foerderung` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/foerderung.md` | E3-TOR | Z-12 | E4-W3 | offen |
| E4-LEKT-46 | Lektorat `/foerderung` | Lektor | Haiku | 2 | `_werkstatt/texte/foerderung.md` | E4-TEXT-46 | Z-12 | E4-W4 | offen |
| E4-BAU-46 | Seite `/foerderung` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/foerderung.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/foerderung/page.jsx`, `src/components/seiten/foerderung/**` | E4-LEKT-46, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W5 | offen |
| E4-TEXT-47 | Text `/login` (arbeit) nach Seitenformel und `_werkstatt/texte/REF-start.md` (Abschnitt Anfrage) | Texter | Haiku | 2 | `_werkstatt/texte/login.md` | E3-TOR | Z-12 | E4-W3 | offen |
| E4-LEKT-47 | Lektorat `/login` | Lektor | Haiku | 2 | `_werkstatt/texte/login.md` | E4-TEXT-47 | Z-12 | E4-W4 | offen |
| E4-BAU-47 | Seite `/login` nach Vorlage `ArbeitsSeite`, Text aus `_werkstatt/texte/login.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/login/page.jsx`, `src/components/seiten/login/**` | E4-LEKT-47, E3-ORCH-01d | Z-04, Z-09, Z-11, Z-13 | E4-W5 | offen |
| E4-TEXT-48 | Text `/naturstein/marmor-kalkstein` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/naturstein-marmor-kalkstein.md` | E3-TOR | Z-12 | E4-W3 | offen |
| E4-LEKT-48 | Lektorat `/naturstein/marmor-kalkstein` | Lektor | Haiku | 2 | `_werkstatt/texte/naturstein-marmor-kalkstein.md` | E4-TEXT-48 | Z-12 | E4-W4 | offen |
| E4-BAU-48 | Seite `/naturstein/marmor-kalkstein` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/naturstein-marmor-kalkstein.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/naturstein/marmor-kalkstein/page.jsx`, `src/components/seiten/naturstein-marmor-kalkstein/**` | E4-LEKT-48, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W5 | offen |
| E4-TEXT-49 | Text `/schadensanalyse` (erzaehl) nach Seitenformel und `_werkstatt/texte/REF-bereich-barrierefreies-bad.md` | Texter | Haiku | 2 | `_werkstatt/texte/schadensanalyse.md` | E3-TOR | Z-12 | E4-W3 | offen |
| E4-LEKT-49 | Lektorat `/schadensanalyse` | Lektor | Haiku | 2 | `_werkstatt/texte/schadensanalyse.md` | E4-TEXT-49 | Z-12 | E4-W4 | offen |
| E4-BAU-49 | Seite `/schadensanalyse` nach Vorlage `ErzaehlSeite`, Text aus `_werkstatt/texte/schadensanalyse.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/schadensanalyse/page.jsx`, `src/components/seiten/schadensanalyse/**` | E4-LEKT-49, E3-ORCH-01a | Z-04, Z-09, Z-11, Z-13 | E4-W5 | offen |
| E4-TEXT-50 | Text `/termin` (arbeit) nach Seitenformel und `_werkstatt/texte/REF-start.md` (Abschnitt Anfrage) | Texter | Haiku | 2 | `_werkstatt/texte/termin.md` | E3-TOR | Z-12 | E4-W3 | offen |
| E4-LEKT-50 | Lektorat `/termin` | Lektor | Haiku | 2 | `_werkstatt/texte/termin.md` | E4-TEXT-50 | Z-12 | E4-W4 | offen |
| E4-BAU-50 | Seite `/termin` nach Vorlage `ArbeitsSeite`, Text aus `_werkstatt/texte/termin.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/termin/page.jsx`, `src/components/seiten/termin/**` | E4-LEKT-50, E3-ORCH-01d | Z-04, Z-09, Z-11, Z-13 | E4-W5 | offen |
| E4-TEXT-51 | Text `/treppen/innentreppe` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/treppen-innentreppe.md` | E3-TOR | Z-12 | E4-W3 | offen |
| E4-LEKT-51 | Lektorat `/treppen/innentreppe` | Lektor | Haiku | 2 | `_werkstatt/texte/treppen-innentreppe.md` | E4-TEXT-51 | Z-12 | E4-W4 | offen |
| E4-BAU-51 | Seite `/treppen/innentreppe` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/treppen-innentreppe.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/treppen/innentreppe/page.jsx`, `src/components/seiten/treppen-innentreppe/**` | E4-LEKT-51, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W5 | offen |
| E4-TEXT-52 | Text `/untergrund-abdichtung/ausgleich-gefaelle` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/untergrund-abdichtung-ausgleich-gefaelle.md` | E3-TOR | Z-12 | E4-W3 | offen |
| E4-LEKT-52 | Lektorat `/untergrund-abdichtung/ausgleich-gefaelle` | Lektor | Haiku | 2 | `_werkstatt/texte/untergrund-abdichtung-ausgleich-gefaelle.md` | E4-TEXT-52 | Z-12 | E4-W4 | offen |
| E4-BAU-52 | Seite `/untergrund-abdichtung/ausgleich-gefaelle` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/untergrund-abdichtung-ausgleich-gefaelle.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/untergrund-abdichtung/ausgleich-gefaelle/page.jsx`, `src/components/seiten/untergrund-abdichtung-ausgleich-gefaelle/**` | E4-LEKT-52, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W5 | offen |
| E4-TEXT-53 | Text `/untergrund-abdichtung/estrich-belegreife` (wissen) nach Seitenformel und `_werkstatt/texte/REF-wissen-din-18534.md` | Texter | Haiku | 2 | `_werkstatt/texte/untergrund-abdichtung-estrich-belegreife.md` | E3-TOR | Z-12 | E4-W3 | offen |
| E4-LEKT-53 | Lektorat `/untergrund-abdichtung/estrich-belegreife` | Lektor | Haiku | 2 | `_werkstatt/texte/untergrund-abdichtung-estrich-belegreife.md` | E4-TEXT-53 | Z-12 | E4-W4 | offen |
| E4-BAU-53 | Seite `/untergrund-abdichtung/estrich-belegreife` nach Vorlage `WissensSeite`, Text aus `_werkstatt/texte/untergrund-abdichtung-estrich-belegreife.md` | Baumeister | Haiku | 2 | `src/app/(bestand)/untergrund-abdichtung/estrich-belegreife/page.jsx`, `src/components/seiten/untergrund-abdichtung-estrich-belegreife/**` | E4-LEKT-53, E3-ORCH-01b | Z-04, Z-09, Z-11, Z-13 | E4-W5 | offen |
| E4-BAU-RECHT-1 | Darstellung `/agb` in der Vorlage `ArbeitsSeite`, Inhalt unverändert (G8) | Baumeister | Haiku | 2 | `src/app/(bestand)/agb/page.jsx` | E3-ORCH-01d | Z-04, Z-09, G8 | E4-W1 | offen |
| E4-BAU-RECHT-2 | Darstellung `/barrierefreiheit` in der Vorlage `ArbeitsSeite`, Inhalt unverändert (G8) | Baumeister | Haiku | 2 | `src/app/(bestand)/barrierefreiheit/page.jsx` | E3-ORCH-01d | Z-04, Z-09, G8 | E4-W1 | offen |
| E4-BAU-RECHT-3 | Darstellung `/cookie-richtlinie` in der Vorlage `ArbeitsSeite`, Inhalt unverändert (G8) | Baumeister | Haiku | 2 | `src/app/(bestand)/cookie-richtlinie/page.jsx` | E3-ORCH-01d | Z-04, Z-09, G8 | E4-W1 | offen |
| E4-BAU-RECHT-4 | Darstellung `/datenschutz` in der Vorlage `ArbeitsSeite`, Inhalt unverändert (G8) | Baumeister | Haiku | 2 | `src/app/(bestand)/datenschutz/page.jsx` | E3-ORCH-01d | Z-04, Z-09, G8 | E4-W1 | offen |
| E4-BAU-RECHT-5 | Darstellung `/impressum` in der Vorlage `ArbeitsSeite`, Inhalt unverändert (G8) | Baumeister | Haiku | 2 | `src/app/(bestand)/impressum/page.jsx` | E3-ORCH-01d | Z-04, Z-09, G8 | E4-W1 | offen |
| E4-BAU-RECHT-6 | Darstellung `/widerruf` in der Vorlage `ArbeitsSeite`, Inhalt unverändert (G8) | Baumeister | Haiku | 2 | `src/app/(bestand)/widerruf/page.jsx` | E3-ORCH-01d | Z-04, Z-09, G8 | E4-W1 | offen |
| E4-TEXT-LEIST | Texte der 4 Leistungen (`bad`, `wohnen`, `aussen`, `untergrund`) als JSON | Texter | Haiku | 2 | `_werkstatt/texte/leistungen.json` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-LEIST | Lektorat der Leistungstexte | Lektor | Haiku | 2 | `_werkstatt/texte/leistungen.json` | E4-TEXT-LEIST | Z-12 | E4-W2 | offen |
| E4-ORCH-01a | Leistungstexte übertragen | Orchestrator | Opus | 3 | `src/config/services.js` | E4-LEKT-LEIST | Z-12 | E4-W2 | offen |
| E4-BAU-LEIST | Vorlage `/leistungen/[id]` (4 Seiten) | Baumeister | Haiku | 2 | `src/app/(bestand)/leistungen/[id]/page.jsx`, `src/app/(bestand)/leistungen/[id]/layout.jsx` | E4-ORCH-01a, E3-ORCH-01a | Z-04, Z-11, Z-12 | E4-W3 | offen |
| E4-TEXT-LS-bad | Bausteine der 13 Seiten Leistung `bad` × Ort als JSON (nur echte Angaben) | Texter | Haiku | 2 | `_werkstatt/texte/leistung-ort-bad.json` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-LS-bad | Lektorat Leistung `bad` × Ort | Lektor | Haiku | 2 | `_werkstatt/texte/leistung-ort-bad.json` | E4-TEXT-LS-bad | Z-12 | E4-W2 | offen |
| E4-TEXT-LS-wohnen | Bausteine der 13 Seiten Leistung `wohnen` × Ort als JSON (nur echte Angaben) | Texter | Haiku | 2 | `_werkstatt/texte/leistung-ort-wohnen.json` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-LS-wohnen | Lektorat Leistung `wohnen` × Ort | Lektor | Haiku | 2 | `_werkstatt/texte/leistung-ort-wohnen.json` | E4-TEXT-LS-wohnen | Z-12 | E4-W2 | offen |
| E4-TEXT-LS-aussen | Bausteine der 13 Seiten Leistung `aussen` × Ort als JSON (nur echte Angaben) | Texter | Haiku | 2 | `_werkstatt/texte/leistung-ort-aussen.json` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-LS-aussen | Lektorat Leistung `aussen` × Ort | Lektor | Haiku | 2 | `_werkstatt/texte/leistung-ort-aussen.json` | E4-TEXT-LS-aussen | Z-12 | E4-W2 | offen |
| E4-TEXT-LS-untergrund | Bausteine der 13 Seiten Leistung `untergrund` × Ort als JSON (nur echte Angaben) | Texter | Haiku | 2 | `_werkstatt/texte/leistung-ort-untergrund.json` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-LS-untergrund | Lektorat Leistung `untergrund` × Ort | Lektor | Haiku | 2 | `_werkstatt/texte/leistung-ort-untergrund.json` | E4-TEXT-LS-untergrund | Z-12 | E4-W2 | offen |
| E4-ORCH-01b | Bausteine Leistung × Ort in eine neue Datendatei übertragen | Orchestrator | Opus | 3 | `src/config/leistung-ort.ts` | E4-LEKT-LS-bad, E4-LEKT-LS-wohnen, E4-LEKT-LS-aussen, E4-LEKT-LS-untergrund | Z-12 | E4-W2 | offen |
| E4-BAU-LS | Vorlage `/leistungen/[id]/[stadt]` (52 Seiten) | Baumeister | Haiku | 2 | `src/app/(bestand)/leistungen/[id]/[stadt]/page.tsx` | E4-ORCH-01b, E3-ORCH-01c | Z-04, Z-11, Z-12 | E4-W3 | offen |
| E4-TEXT-MUSTER-1 | Texte der Musterbäder 1 bis 6 (`src/config/musterbaeder.js`) als JSON | Texter | Haiku | 2 | `_werkstatt/texte/musterbaeder-1.json` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-MUSTER-1 | Lektorat Musterbäder 1 bis 6 | Lektor | Haiku | 2 | `_werkstatt/texte/musterbaeder-1.json` | E4-TEXT-MUSTER-1 | Z-12 | E4-W2 | offen |
| E4-TEXT-MUSTER-2 | Texte der Musterbäder 7 bis 12 (`src/config/musterbaeder.js`) als JSON | Texter | Haiku | 2 | `_werkstatt/texte/musterbaeder-2.json` | E3-TOR | Z-12 | E4-W1 | offen |
| E4-LEKT-MUSTER-2 | Lektorat Musterbäder 7 bis 12 | Lektor | Haiku | 2 | `_werkstatt/texte/musterbaeder-2.json` | E4-TEXT-MUSTER-2 | Z-12 | E4-W2 | offen |
| E4-ORCH-01c | Musterbad-Texte übertragen | Orchestrator | Opus | 3 | `src/config/musterbaeder.js` | E4-LEKT-MUSTER-1, E4-LEKT-MUSTER-2 | Z-12 | E4-W2 | offen |
| E4-BAU-MUSTER | Vorlage `/bad/musterbaeder/[slug]` (12 Seiten) | Baumeister | Haiku | 2 | `src/app/(bestand)/bad/musterbaeder/[slug]/page.jsx` | E4-ORCH-01c, E3-ORCH-01b | Z-04, Z-11, Z-12 | E4-W3 | offen |
| E4-BAU-BLOG | Vorlage `/blog/[slug]` (Lesemodus nach `WissensSeite`, absoluter Canonical) | Baumeister | Haiku | 2 | `src/app/(bestand)/blog/[slug]/page.jsx`, `src/app/(bestand)/blog/[slug]/layout.jsx` | E3-ORCH-01b | Z-04, Z-12, Z-14 | E4-W1 | offen |
| E4-TEXT-POST-01 | Artikel `/blog/barrierefreier-balkonaustritt` neu schreiben (Wissensseite), Bild nach `_werkstatt/bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/barrierefreier-balkonaustritt.js` | E4-BAU-BLOG, E3-ORCH-02d | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-01 | Lektorat `/blog/barrierefreier-balkonaustritt` | Lektor | Haiku | 2 | `src/config/posts/barrierefreier-balkonaustritt.js` | E4-TEXT-POST-01 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-02 | Artikel `/blog/duschrinne-oder-punktablauf` neu schreiben (Wissensseite), Bild nach `_werkstatt/bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/duschrinne-oder-punktablauf.js` | E4-BAU-BLOG, E3-ORCH-02d | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-02 | Lektorat `/blog/duschrinne-oder-punktablauf` | Lektor | Haiku | 2 | `src/config/posts/duschrinne-oder-punktablauf.js` | E4-TEXT-POST-02 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-03 | Artikel `/blog/feinsteinzeug-oder-naturstein-vergleich` neu schreiben (Wissensseite), Bild nach `_werkstatt/bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/feinsteinzeug-oder-naturstein-vergleich.js` | E4-BAU-BLOG, E3-ORCH-02d | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-03 | Lektorat `/blog/feinsteinzeug-oder-naturstein-vergleich` | Lektor | Haiku | 2 | `src/config/posts/feinsteinzeug-oder-naturstein-vergleich.js` | E4-TEXT-POST-03 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-04 | Artikel `/blog/fliesen-fuer-allergiker` neu schreiben (Wissensseite), Bild nach `_werkstatt/bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/fliesen-fuer-allergiker.js` | E4-BAU-BLOG, E3-ORCH-02d | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-04 | Lektorat `/blog/fliesen-fuer-allergiker` | Lektor | Haiku | 2 | `src/config/posts/fliesen-fuer-allergiker.js` | E4-TEXT-POST-04 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-05 | Artikel `/blog/fliesen-mythen-faktencheck` neu schreiben (Wissensseite), Bild nach `_werkstatt/bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/fliesen-mythen-faktencheck.js` | E4-BAU-BLOG, E3-ORCH-02d | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-05 | Lektorat `/blog/fliesen-mythen-faktencheck` | Lektor | Haiku | 2 | `src/config/posts/fliesen-mythen-faktencheck.js` | E4-TEXT-POST-05 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-06 | Artikel `/blog/fliesen-reinigen-pflegen` neu schreiben (Wissensseite), Bild nach `_werkstatt/bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/fliesen-reinigen-pflegen.js` | E4-BAU-BLOG, E3-ORCH-02d | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-06 | Lektorat `/blog/fliesen-reinigen-pflegen` | Lektor | Haiku | 2 | `src/config/posts/fliesen-reinigen-pflegen.js` | E4-TEXT-POST-06 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-07 | Artikel `/blog/fliesenleger-gesucht-geselle-meister` neu schreiben (Wissensseite), Bild nach `_werkstatt/bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/fliesenleger-gesucht-geselle-meister.js` | E4-BAU-BLOG, E3-ORCH-02d | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-07 | Lektorat `/blog/fliesenleger-gesucht-geselle-meister` | Lektor | Haiku | 2 | `src/config/posts/fliesenleger-gesucht-geselle-meister.js` | E4-TEXT-POST-07 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-08 | Artikel `/blog/gaeste-wc-fliesen` neu schreiben (Wissensseite), Bild nach `_werkstatt/bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/gaeste-wc-fliesen.js` | E4-BAU-BLOG, E3-ORCH-02d | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-08 | Lektorat `/blog/gaeste-wc-fliesen` | Lektor | Haiku | 2 | `src/config/posts/gaeste-wc-fliesen.js` | E4-TEXT-POST-08 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-09 | Artikel `/blog/handwerkerbonus-fliesenarbeiten` neu schreiben (Wissensseite), Bild nach `_werkstatt/bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/handwerkerbonus-fliesenarbeiten.js` | E4-BAU-BLOG, E3-ORCH-02d | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-09 | Lektorat `/blog/handwerkerbonus-fliesenarbeiten` | Lektor | Haiku | 2 | `src/config/posts/handwerkerbonus-fliesenarbeiten.js` | E4-TEXT-POST-09 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-10 | Artikel `/blog/rutschfeste-fliesen-r-klassen` neu schreiben (Wissensseite), Bild nach `_werkstatt/bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/rutschfeste-fliesen-r-klassen.js` | E4-BAU-BLOG, E3-ORCH-02d | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-10 | Lektorat `/blog/rutschfeste-fliesen-r-klassen` | Lektor | Haiku | 2 | `src/config/posts/rutschfeste-fliesen-r-klassen.js` | E4-TEXT-POST-10 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-11 | Artikel `/blog/schimmel-fliesenfugen-vermeiden` neu schreiben (Wissensseite), Bild nach `_werkstatt/bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/schimmel-fliesenfugen-vermeiden.js` | E4-BAU-BLOG, E3-ORCH-02d | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-11 | Lektorat `/blog/schimmel-fliesenfugen-vermeiden` | Lektor | Haiku | 2 | `src/config/posts/schimmel-fliesenfugen-vermeiden.js` | E4-TEXT-POST-11 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-12 | Artikel `/blog/undichte-dusche-warnzeichen` neu schreiben (Wissensseite), Bild nach `_werkstatt/bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/undichte-dusche-warnzeichen.js` | E4-BAU-BLOG, E3-ORCH-02d | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-12 | Lektorat `/blog/undichte-dusche-warnzeichen` | Lektor | Haiku | 2 | `src/config/posts/undichte-dusche-warnzeichen.js` | E4-TEXT-POST-12 | Z-12 | E4-W3 | offen |
| E4-TEXT-POST-13 | Artikel `/blog/wandnischen-dusche-planen` neu schreiben (Wissensseite), Bild nach `_werkstatt/bildplaetze.md` | Texter | Haiku | 2 | `src/config/posts/wandnischen-dusche-planen.js` | E4-BAU-BLOG, E3-ORCH-02d | Z-12, Z-13 | E4-W2 | offen |
| E4-LEKT-POST-13 | Lektorat `/blog/wandnischen-dusche-planen` | Lektor | Haiku | 2 | `src/config/posts/wandnischen-dusche-planen.js` | E4-TEXT-POST-13 | Z-12 | E4-W3 | offen |
| E4-PRUEF-A1 | Stufe A je Paket der Welle E4-W1 (Typprüfung und Linter der geänderten Dateien, betroffene Tests, Zeichen und Lesbarkeit geänderter Seiten, ein Bild mobil und Desktop), ein Ergebnis je Paket, unabhängig | Prüfer | Haiku | 1 | `$SCRATCH/E4-PRUEF-A1/**` | E4-TEXT-01, E4-TEXT-02, E4-TEXT-03, E4-TEXT-04, E4-TEXT-05, E4-TEXT-06, E4-TEXT-07, E4-TEXT-08, E4-TEXT-09, E4-TEXT-10, E4-TEXT-11, E4-TEXT-12, E4-TEXT-13, E4-TEXT-14, E4-TEXT-15, E4-TEXT-16, E4-TEXT-18, E4-BAU-RECHT-1, E4-BAU-RECHT-2, E4-BAU-RECHT-3, E4-BAU-RECHT-4, E4-BAU-RECHT-5, E4-BAU-RECHT-6, E4-TEXT-LEIST, E4-TEXT-LS-bad, E4-TEXT-LS-wohnen, E4-TEXT-LS-aussen, E4-TEXT-LS-untergrund, E4-TEXT-MUSTER-1, E4-TEXT-MUSTER-2, E4-BAU-BLOG | Z-02, Z-09, Z-12 | E4-W1 | offen |
| E4-PRUEF-T1 | Textstichprobe der Welle E4-W1: 10 %, mindestens 5 Texte (bei weniger alle), gegen Schreibregeln, Faktenblatt und Suchbegriffe | Prüfer | Haiku | 1 | `$SCRATCH/E4-PRUEF-T1/**` | E4-TEXT-01, E4-TEXT-02, E4-TEXT-03, E4-TEXT-04, E4-TEXT-05, E4-TEXT-06, E4-TEXT-07, E4-TEXT-08, E4-TEXT-09, E4-TEXT-10, E4-TEXT-11, E4-TEXT-12, E4-TEXT-13, E4-TEXT-14, E4-TEXT-15, E4-TEXT-16, E4-TEXT-18, E4-TEXT-LEIST, E4-TEXT-LS-bad, E4-TEXT-LS-wohnen, E4-TEXT-LS-aussen, E4-TEXT-LS-untergrund, E4-TEXT-MUSTER-1, E4-TEXT-MUSTER-2 | Z-12 | E4-W1 | offen |
| E4-PRUEF-A2 | Stufe A je Paket der Welle E4-W2 (Typprüfung und Linter der geänderten Dateien, betroffene Tests, Zeichen und Lesbarkeit geänderter Seiten, ein Bild mobil und Desktop), ein Ergebnis je Paket, unabhängig | Prüfer | Haiku | 1 | `$SCRATCH/E4-PRUEF-A2/**` | E4-LEKT-01, E4-LEKT-02, E4-LEKT-03, E4-LEKT-04, E4-LEKT-05, E4-LEKT-06, E4-LEKT-07, E4-LEKT-08, E4-LEKT-09, E4-LEKT-10, E4-LEKT-11, E4-LEKT-12, E4-LEKT-13, E4-LEKT-14, E4-LEKT-15, E4-LEKT-16, E4-LEKT-18, E4-TEXT-19, E4-TEXT-20, E4-TEXT-21, E4-TEXT-22, E4-TEXT-23, E4-TEXT-24, E4-TEXT-25, E4-TEXT-26, E4-TEXT-27, E4-TEXT-28, E4-TEXT-29, E4-TEXT-30, E4-TEXT-31, E4-TEXT-32, E4-TEXT-33, E4-TEXT-34, E4-TEXT-35, E4-TEXT-36, E4-LEKT-LEIST, E4-ORCH-01a, E4-LEKT-LS-bad, E4-LEKT-LS-wohnen, E4-LEKT-LS-aussen, E4-LEKT-LS-untergrund, E4-ORCH-01b, E4-LEKT-MUSTER-1, E4-LEKT-MUSTER-2, E4-ORCH-01c, E4-TEXT-POST-01, E4-TEXT-POST-02, E4-TEXT-POST-03, E4-TEXT-POST-04, E4-TEXT-POST-05, E4-TEXT-POST-06, E4-TEXT-POST-07, E4-TEXT-POST-08, E4-TEXT-POST-09, E4-TEXT-POST-10, E4-TEXT-POST-11, E4-TEXT-POST-12, E4-TEXT-POST-13 | Z-02, Z-09, Z-12 | E4-W2 | offen |
| E4-PRUEF-T2 | Textstichprobe der Welle E4-W2: 10 %, mindestens 5 Texte (bei weniger alle), gegen Schreibregeln, Faktenblatt und Suchbegriffe | Prüfer | Haiku | 1 | `$SCRATCH/E4-PRUEF-T2/**` | E4-LEKT-01, E4-LEKT-02, E4-LEKT-03, E4-LEKT-04, E4-LEKT-05, E4-LEKT-06, E4-LEKT-07, E4-LEKT-08, E4-LEKT-09, E4-LEKT-10, E4-LEKT-11, E4-LEKT-12, E4-LEKT-13, E4-LEKT-14, E4-LEKT-15, E4-LEKT-16, E4-LEKT-18, E4-TEXT-19, E4-TEXT-20, E4-TEXT-21, E4-TEXT-22, E4-TEXT-23, E4-TEXT-24, E4-TEXT-25, E4-TEXT-26, E4-TEXT-27, E4-TEXT-28, E4-TEXT-29, E4-TEXT-30, E4-TEXT-31, E4-TEXT-32, E4-TEXT-33, E4-TEXT-34, E4-TEXT-35, E4-TEXT-36, E4-LEKT-LEIST, E4-LEKT-LS-bad, E4-LEKT-LS-wohnen, E4-LEKT-LS-aussen, E4-LEKT-LS-untergrund, E4-LEKT-MUSTER-1, E4-LEKT-MUSTER-2, E4-TEXT-POST-01, E4-TEXT-POST-02, E4-TEXT-POST-03, E4-TEXT-POST-04, E4-TEXT-POST-05, E4-TEXT-POST-06, E4-TEXT-POST-07, E4-TEXT-POST-08, E4-TEXT-POST-09, E4-TEXT-POST-10, E4-TEXT-POST-11, E4-TEXT-POST-12, E4-TEXT-POST-13 | Z-12 | E4-W2 | offen |
| E4-PRUEF-A3 | Stufe A je Paket der Welle E4-W3 (Typprüfung und Linter der geänderten Dateien, betroffene Tests, Zeichen und Lesbarkeit geänderter Seiten, ein Bild mobil und Desktop), ein Ergebnis je Paket, unabhängig | Prüfer | Haiku | 1 | `$SCRATCH/E4-PRUEF-A3/**` | E4-BAU-01, E4-BAU-02, E4-BAU-03, E4-BAU-04, E4-BAU-05, E4-BAU-06, E4-BAU-07, E4-BAU-08, E4-BAU-09, E4-BAU-10, E4-BAU-11, E4-BAU-12, E4-BAU-13, E4-BAU-14, E4-BAU-15, E4-BAU-16, E4-BAU-17, E4-BAU-18, E4-LEKT-19, E4-LEKT-20, E4-LEKT-21, E4-LEKT-22, E4-LEKT-23, E4-LEKT-24, E4-LEKT-25, E4-LEKT-26, E4-LEKT-27, E4-LEKT-28, E4-LEKT-29, E4-LEKT-30, E4-LEKT-31, E4-LEKT-32, E4-LEKT-33, E4-LEKT-34, E4-LEKT-35, E4-LEKT-36, E4-TEXT-37, E4-TEXT-38, E4-TEXT-39, E4-TEXT-40, E4-TEXT-41, E4-TEXT-42, E4-TEXT-43, E4-TEXT-44, E4-TEXT-45, E4-TEXT-46, E4-TEXT-47, E4-TEXT-48, E4-TEXT-49, E4-TEXT-50, E4-TEXT-51, E4-TEXT-52, E4-TEXT-53, E4-BAU-LEIST, E4-BAU-LS, E4-BAU-MUSTER, E4-LEKT-POST-01, E4-LEKT-POST-02, E4-LEKT-POST-03, E4-LEKT-POST-04, E4-LEKT-POST-05, E4-LEKT-POST-06, E4-LEKT-POST-07, E4-LEKT-POST-08, E4-LEKT-POST-09, E4-LEKT-POST-10, E4-LEKT-POST-11, E4-LEKT-POST-12, E4-LEKT-POST-13 | Z-02, Z-09, Z-12 | E4-W3 | offen |
| E4-PRUEF-T3 | Textstichprobe der Welle E4-W3: 10 %, mindestens 5 Texte (bei weniger alle), gegen Schreibregeln, Faktenblatt und Suchbegriffe | Prüfer | Haiku | 1 | `$SCRATCH/E4-PRUEF-T3/**` | E4-LEKT-19, E4-LEKT-20, E4-LEKT-21, E4-LEKT-22, E4-LEKT-23, E4-LEKT-24, E4-LEKT-25, E4-LEKT-26, E4-LEKT-27, E4-LEKT-28, E4-LEKT-29, E4-LEKT-30, E4-LEKT-31, E4-LEKT-32, E4-LEKT-33, E4-LEKT-34, E4-LEKT-35, E4-LEKT-36, E4-TEXT-37, E4-TEXT-38, E4-TEXT-39, E4-TEXT-40, E4-TEXT-41, E4-TEXT-42, E4-TEXT-43, E4-TEXT-44, E4-TEXT-45, E4-TEXT-46, E4-TEXT-47, E4-TEXT-48, E4-TEXT-49, E4-TEXT-50, E4-TEXT-51, E4-TEXT-52, E4-TEXT-53, E4-LEKT-POST-01, E4-LEKT-POST-02, E4-LEKT-POST-03, E4-LEKT-POST-04, E4-LEKT-POST-05, E4-LEKT-POST-06, E4-LEKT-POST-07, E4-LEKT-POST-08, E4-LEKT-POST-09, E4-LEKT-POST-10, E4-LEKT-POST-11, E4-LEKT-POST-12, E4-LEKT-POST-13 | Z-12 | E4-W3 | offen |
| E4-PRUEF-A4 | Stufe A je Paket der Welle E4-W4 (Typprüfung und Linter der geänderten Dateien, betroffene Tests, Zeichen und Lesbarkeit geänderter Seiten, ein Bild mobil und Desktop), ein Ergebnis je Paket, unabhängig | Prüfer | Haiku | 1 | `$SCRATCH/E4-PRUEF-A4/**` | E4-BAU-19, E4-BAU-20, E4-BAU-21, E4-BAU-22, E4-BAU-23, E4-BAU-24, E4-BAU-25, E4-BAU-26, E4-BAU-27, E4-BAU-28, E4-BAU-29, E4-BAU-30, E4-BAU-31, E4-BAU-32, E4-BAU-33, E4-BAU-34, E4-BAU-35, E4-BAU-36, E4-LEKT-37, E4-LEKT-38, E4-LEKT-39, E4-LEKT-40, E4-LEKT-41, E4-LEKT-42, E4-LEKT-43, E4-LEKT-44, E4-LEKT-45, E4-LEKT-46, E4-LEKT-47, E4-LEKT-48, E4-LEKT-49, E4-LEKT-50, E4-LEKT-51, E4-LEKT-52, E4-LEKT-53 | Z-02, Z-09, Z-12 | E4-W4 | offen |
| E4-PRUEF-T4 | Textstichprobe der Welle E4-W4: 10 %, mindestens 5 Texte (bei weniger alle), gegen Schreibregeln, Faktenblatt und Suchbegriffe | Prüfer | Haiku | 1 | `$SCRATCH/E4-PRUEF-T4/**` | E4-LEKT-37, E4-LEKT-38, E4-LEKT-39, E4-LEKT-40, E4-LEKT-41, E4-LEKT-42, E4-LEKT-43, E4-LEKT-44, E4-LEKT-45, E4-LEKT-46, E4-LEKT-47, E4-LEKT-48, E4-LEKT-49, E4-LEKT-50, E4-LEKT-51, E4-LEKT-52, E4-LEKT-53 | Z-12 | E4-W4 | offen |
| E4-PRUEF-A5 | Stufe A je Paket der Welle E4-W5 (Typprüfung und Linter der geänderten Dateien, betroffene Tests, Zeichen und Lesbarkeit geänderter Seiten, ein Bild mobil und Desktop), ein Ergebnis je Paket, unabhängig | Prüfer | Haiku | 1 | `$SCRATCH/E4-PRUEF-A5/**` | E4-BAU-37, E4-BAU-38, E4-BAU-39, E4-BAU-40, E4-BAU-41, E4-BAU-42, E4-BAU-43, E4-BAU-44, E4-BAU-45, E4-BAU-46, E4-BAU-47, E4-BAU-48, E4-BAU-49, E4-BAU-50, E4-BAU-51, E4-BAU-52, E4-BAU-53 | Z-02, Z-09, Z-12 | E4-W5 | offen |
| E4-PRUEF-B | Stufe B der Etappe (Hauptansichten und Stichprobe der neuen Seiten) | Prüfer | Haiku | 1 | `_werkstatt/belege/e4/**` | E4-PRUEF-A5 | Z-02 bis Z-14 | E4-Tor | offen |
| E4-DOK-01 | Bildsatz der Stichprobe nach `_werkstatt/cache/bilder/e4/` | Dokumentar | Haiku | 1 | `_werkstatt/cache/bilder/e4/**` | E4-PRUEF-B | Z-04 | E4-Tor | offen |
| E4-SICHT | Sichtabnahme der Stichprobe nach Rubrik (Orchestrator) | Orchestrator | Opus | 3 | `_werkstatt/berichte/E4-SICHT.md` | E4-DOK-01 | Z-04 | E4-Tor | offen |
| E4-TOR | Etappentor E4: Abgleich mit ABNAHME.md (L3, L7), Befunde werden Pakete der nächsten Etappe, höchstens zwei Anläufe | Orchestrator | Opus | 3 | `_werkstatt/PLAN.md`, `_werkstatt/ABNAHME.md`, `_werkstatt/STATUS.md` | E4-PRUEF-B, E4-SICHT | Z-01 bis Z-14 | E4-Tor | offen |

### E5 · Referenzen, Bilder, Adressen, Abbau
| Kennung | Gegenstand | Rolle | Modell | Stufe | Schreibrechte | Abhängig von | Kriterium | Welle | Status |
|---|---|---|---|---|---|---|---|---|---|
| E5-TEXT-REF | Texte der 6 Referenz-Themenansichten mit echten Fotos (ohne erfundene Projektangaben) als JSON | Texter | Haiku | 2 | `_werkstatt/texte/referenzen.json` | E3-TOR | Z-12 | E5-W1 | offen |
| E5-LEKT-REF | Lektorat der Referenztexte | Lektor | Haiku | 2 | `_werkstatt/texte/referenzen.json` | E5-TEXT-REF | Z-12 | E5-W2 | offen |
| E5-ORCH-01e | Referenztexte und Kennzeichnung übertragen (`placeholder` entfällt nur mit echten Fotos) | Orchestrator | Opus | 3 | `src/config/projects.js` | E5-LEKT-REF | Z-12, Z-13 | E5-W2 | offen |
| E5-BAU-01 | Referenzseiten `/referenzen/[id]` als ehrliche Themenansichten; ohne passende Fotos meldet der Baumeister die Adresse für eine 308 auf die gefilterte Galerie | Baumeister | Haiku | 2 | `src/app/(bestand)/referenzen/[id]/page.jsx`, `src/app/(bestand)/referenzen/[id]/layout.jsx` | E5-ORCH-01e | Z-12, Z-14 | E5-W3 | offen |
| E5-ORCH-01a | Generatorbilder aus den Leistungsdaten entfernen (E-013) | Orchestrator | Opus | 3 | `src/config/services.js` | E4-BAU-LEIST | Z-13 | E5-W1 | offen |
| E5-ORCH-01b | Generatorbilder aus den Musterbad-Daten entfernen | Orchestrator | Opus | 3 | `src/config/musterbaeder.js` | E4-BAU-MUSTER | Z-13 | E5-W1 | offen |
| E5-ORCH-01c | Generatorbilder aus den strukturierten Daten entfernen | Orchestrator | Opus | 3 | `src/lib/schema.ts` | E2-FIX-01c | Z-13, Z-14 | E5-W1 | offen |
| E5-ORCH-02a | Dauerhafte Weiterleitungen aus E5-BAU-01 | Orchestrator | Opus | 3 | `next.config.ts` | E5-BAU-01 | Z-14 | E5-W3 | offen |
| E5-ORCH-02b | Sitemap angleichen (alle indexierbaren Adressen, keine Weiterleitungsquellen) | Orchestrator | Opus | 3 | `src/app/sitemap.ts` | E5-ORCH-02a | Z-14 | E5-W3 | offen |
| E5-ORCH-02c | Echtes OG-Bild mit richtigen Maßen | Orchestrator | Opus | 3 | `src/lib/metadata.ts`, `src/shared/config/site.ts` | E3-BILD-01 | Z-13, Z-14 | E5-W1 | offen |
| E5-ORCH-02d | Video-Sitemap ohne fehlende Videos und ohne Generatorbilder | Orchestrator | Opus | 3 | `src/app/video-sitemap.xml/route.ts` | — | Z-13, Z-14 | E5-W1 | offen |
| E5-PRUEF-KNIP | Bericht nicht mehr genutzter Dateien und Exporte (knip) nach Abschluss von E4 | Prüfer | Haiku | 1 | `$SCRATCH/E5-PRUEF-KNIP/**` | E4-TOR | Z-03, Z-05 | E5-W1 | offen |
| E5-ORCH-03a | Abbau entfallender Bewegung im Stil (sig-kreuzlinie, sig-flucht, sig-plan, szene-ablauf, einzugsband, fugenband) | Orchestrator | Opus | 3 | `src/app/bewegung.css` | E5-PRUEF-KNIP | Z-03, Z-05 | E5-W2 | offen |
| E5-ORCH-03b | Register ohne entfallende Einträge, Tests angeglichen | Orchestrator | Opus | 3 | `src/lib/motion/register.ts`, `_werkstatt/register.json`, `test/bewegung.test.mjs` | E5-ORCH-03a | Z-05 | E5-W2 | offen |
| E5-ORCH-03c | Nicht mehr importierte Komponenten laut Bericht E5-PRUEF-KNIP entfernen (Kandidaten: Kreuzlinie, SzeneAblauf, Einzugsband, Planblatt); Tests nur, wenn ihre Logik entfällt (Denkprotokoll) | Orchestrator | Opus | 3 | `src/components/kern/Kreuzlinie.tsx`, `src/components/kern/SzeneAblauf.tsx`, `src/components/kern/Einzugsband.tsx`, `src/components/kern/Planblatt.tsx`, `src/app/(bestand)/werkstatt-schaufenster/szene/page.dev.tsx` | E5-ORCH-03b | Z-03 | E5-W2 | offen |
| E5-ORCH-03d | Schaufenster aufräumen (Seiten für entfernte Bausteine) | Orchestrator | Opus | 3 | `src/app/(bestand)/werkstatt-schaufenster/page.dev.tsx`, `src/app/(bestand)/werkstatt-schaufenster/schritte/page.dev.tsx`, `src/app/(bestand)/werkstatt-schaufenster/tabelle/page.dev.tsx`, `src/app/(bestand)/werkstatt-schaufenster/merkliste/page.dev.tsx` | E5-ORCH-03c | Z-03 | E5-W2 | offen |
| E5-PRUEF-A1 | Stufe A je Paket der Welle E5-W1 (Typprüfung und Linter der geänderten Dateien, betroffene Tests, Zeichen und Lesbarkeit geänderter Seiten, ein Bild mobil und Desktop), ein Ergebnis je Paket, unabhängig | Prüfer | Haiku | 1 | `$SCRATCH/E5-PRUEF-A1/**` | E5-TEXT-REF, E5-ORCH-01a, E5-ORCH-01b, E5-ORCH-01c, E5-ORCH-02c, E5-ORCH-02d, E5-PRUEF-KNIP | Z-02, Z-09, Z-12 | E5-W1 | offen |
| E5-PRUEF-T1 | Textstichprobe der Welle E5-W1: 10 %, mindestens 5 Texte (bei weniger alle), gegen Schreibregeln, Faktenblatt und Suchbegriffe | Prüfer | Haiku | 1 | `$SCRATCH/E5-PRUEF-T1/**` | E5-TEXT-REF | Z-12 | E5-W1 | offen |
| E5-PRUEF-A2 | Stufe A je Paket der Welle E5-W2 (Typprüfung und Linter der geänderten Dateien, betroffene Tests, Zeichen und Lesbarkeit geänderter Seiten, ein Bild mobil und Desktop), ein Ergebnis je Paket, unabhängig | Prüfer | Haiku | 1 | `$SCRATCH/E5-PRUEF-A2/**` | E5-LEKT-REF, E5-ORCH-01e, E5-ORCH-03a, E5-ORCH-03b, E5-ORCH-03c, E5-ORCH-03d | Z-02, Z-09, Z-12 | E5-W2 | offen |
| E5-PRUEF-T2 | Textstichprobe der Welle E5-W2: 10 %, mindestens 5 Texte (bei weniger alle), gegen Schreibregeln, Faktenblatt und Suchbegriffe | Prüfer | Haiku | 1 | `$SCRATCH/E5-PRUEF-T2/**` | E5-LEKT-REF | Z-12 | E5-W2 | offen |
| E5-PRUEF-A3 | Stufe A je Paket der Welle E5-W3 (Typprüfung und Linter der geänderten Dateien, betroffene Tests, Zeichen und Lesbarkeit geänderter Seiten, ein Bild mobil und Desktop), ein Ergebnis je Paket, unabhängig | Prüfer | Haiku | 1 | `$SCRATCH/E5-PRUEF-A3/**` | E5-BAU-01, E5-ORCH-02a, E5-ORCH-02b | Z-02, Z-09, Z-12 | E5-W3 | offen |
| E5-PRUEF-B | Stufe B der Etappe | Prüfer | Haiku | 1 | `_werkstatt/belege/e5/**` | E5-PRUEF-A3 | Z-02 bis Z-14 | E5-Tor | offen |
| E5-DOK-01 | Bildsatz Galerie, Referenzseiten und Stichprobe nach `_werkstatt/cache/bilder/e5/` | Dokumentar | Haiku | 1 | `_werkstatt/cache/bilder/e5/**` | E5-PRUEF-B | Z-04 | E5-Tor | offen |
| E5-SICHT | Sichtabnahme nach Rubrik (Orchestrator) | Orchestrator | Opus | 3 | `_werkstatt/berichte/E5-SICHT.md` | E5-DOK-01 | Z-04 | E5-Tor | offen |
| E5-TOR | Etappentor E5: Abgleich mit ABNAHME.md (L3, L7), Befunde werden Pakete der nächsten Etappe, höchstens zwei Anläufe | Orchestrator | Opus | 3 | `_werkstatt/PLAN.md`, `_werkstatt/ABNAHME.md`, `_werkstatt/STATUS.md` | E5-PRUEF-B, E5-SICHT | Z-01 bis Z-14 | E5-Tor | offen |

### Abschluss
| Kennung | Gegenstand | Rolle | Modell | Stufe | Schreibrechte | Abhängig von | Kriterium | Welle | Status |
|---|---|---|---|---|---|---|---|---|---|
| AB-PRUEF-C | Stufe C (Endprüfung): Stufe B, Stichprobe 10 % (mindestens 5), alle Adressen, Probeläufe mit Tastatur, Systemschrift 200 %, Register, SVG, Metadaten | Prüfer | Haiku | 1 | `_werkstatt/belege/abschluss/**` | E4-TOR, E5-TOR, KUER-01, KUER-02, KUER-03, KUER-04, KUER-05, KUER-06, KUER-07, KUER-08 | Z-01 bis Z-14 | AB | offen |
| AB-DOK-01a | BERICHT.md (du-Anrede, ohne Fachjargon, mit Bildpfaden) | Dokumentar | Haiku | 1 | `_werkstatt/BERICHT.md` | AB-PRUEF-C | Z-10 | AB | offen |
| AB-DOK-01b | Vorher-Nachher-Galerie als eigene Seite | Dokumentar | Haiku | 1 | `_werkstatt/bilder/galerie.html`, `_werkstatt/bilder/abschluss/**` | AB-PRUEF-C | Z-10 | AB | offen |
| AB-DOK-01c | Blinder Vergleich: Bilder neutral benannt und gemischt, Schlüssel getrennt | Dokumentar | Haiku | 1 | `_werkstatt/cache/blind/**`, `_werkstatt/cache/blind-schluessel.json` | AB-PRUEF-C | Z-04 | AB | offen |
| AB-DOK-01d | Anleitung zum Zusammenführen (Squash, `_werkstatt` und `_relaunch` vorher entfernen) | Dokumentar | Haiku | 1 | `_werkstatt/ANLEITUNG-ZUSAMMENFUEHREN.md` | AB-PRUEF-C | Z-10 | AB | offen |
| AB-DOK-01e | Anleitung zum Zurückrollen (Revert-Commit, Vercel-Rücksprung durch den Menschen) | Dokumentar | Haiku | 1 | `_werkstatt/ANLEITUNG-ZURUECKROLLEN.md` | AB-PRUEF-C | Z-10 | AB | offen |
| AB-END | Endprüfung jedes Kriteriums gegen seinen Beleg, mit blindem Vergleich (frischer Opus-Unteragent) | Juror | Opus | 3 | `_werkstatt/berichte/ABSCHLUSS.md` (legt der Orchestrator ab) | AB-DOK-01a, AB-DOK-01b, AB-DOK-01c, AB-DOK-01d, AB-DOK-01e | Z-01 bis Z-14 | AB | offen |
| AB-ORCH-01 | CLAUDE.md-Block entfernen, Statuszeile ABSCHLUSS, Commit und Push | Orchestrator | Opus | 3 | `CLAUDE.md`, `_werkstatt/STATUS.md`, `_werkstatt/PRUEFPUNKT.md` | AB-END | Z-10 | AB | offen |

## Kür (nach Wirkung, Schnitt nach Befund der Jury und der Abnahmeliste)
| Kennung | Gegenstand | Rolle | Modell | Stufe | Schreibrechte | Abhängig von | Kriterium | Welle | Status |
|---|---|---|---|---|---|---|---|---|---|
| KUER-01 | Jury nach Award-Rubrik an Bildsätzen der Hauptansichten; jede Kategorie unter 9 wird ein Feinschliffpaket (höchstens 2 Runden je Ansicht und Kategorie) | Juror | Haiku | 1 | `$SCRATCH/KUER-01/**` | E4-TOR, E5-TOR | Z-04 | Kür | offen |
| KUER-02 | Klang „leises Klacken je Spalte“ (Alternative KLANG), nur nach erster Interaktion, mit Schalter | Orchestrator | Opus | 3 | `src/components/verlegen/Verlegen.tsx`, `src/lib/verlegen/klang.ts` | E4-TOR, E5-TOR | Z-05 | Kür | offen |
| KUER-03 | Halbverband als Alternative für B-01 testen und per Jury entscheiden | Orchestrator | Opus | 3 | `src/lib/verlegen/raster.ts` | KUER-01 | Z-04 | Kür | offen |
| KUER-04 | Badplaner und Badanfrage zusammenlegen, falls Probeläufe Verwirrung zeigen (Umkehrprobe E-012), mit 308 | Orchestrator | Opus | 3 | `next.config.ts`, `src/app/(bestand)/bad/badplaner/page.jsx` | E4-TOR, E5-TOR | Z-11, Z-14 | Kür | offen |
| KUER-05 | Gezeichnete Karte mit Anfahrt je Ortsseite | Grafiker | Haiku | 2 | `src/components/momente/karte-ort/**`, `_werkstatt/register/karte-ort.json` | E4-TOR, E5-TOR | Z-04 | Kür | offen |
| KUER-06 | Zweites Foto je Artikelabschnitt, wo passende Fotos da sind | Bildbearbeiter | Haiku | 2 | `public/images/arbeiten/artikel/**`, `_werkstatt/bilder/arbeiten-kuer.json` | E4-TOR, E5-TOR | Z-13 | Kür | offen |
| KUER-07 | Fuß: „Jetzt geöffnet“ ohne Hydrierfehler | Orchestrator | Opus | 3 | `src/components/common/Footer.jsx` | E4-TOR, E5-TOR | Z-11 | Kür | offen |
| KUER-08 | Druckansicht der Wissensseiten | Orchestrator | Opus | 3 | `src/app/globals.css` | E4-TOR, E5-TOR | Z-09 | Kür | offen |

## Offene Punkte
- Planprüfung Runde 2, Befund 9d: Ob die 32 Adressen mit 410 zur Schwelle von Z-14 gehören, entscheidet der Wortlaut von Abschnitt 11 (Adressen aus Sitemap und internen Links); sie stehen weder in der Sitemap noch in Links und bleiben 410 wie in E0 (E-016). Steht in MENSCHEN.md zur Bestätigung.

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
