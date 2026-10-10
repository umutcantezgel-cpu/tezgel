# PLAN · Werkstatt-Lauf Tezgel · Version 1 (E1)

Kern-Version: v2 · Stand: 10.10.2026 · Gilt bis zum nächsten Etappentor; Änderungen nur an Etappentoren und nur, wenn ein Kriterium sonst unerreichbar wäre (Auftrag 3.4). Begründungen: ENTSCHEIDUNGEN.md; Gestaltung: KERN.md; Kriterien: ABNAHME.md.

## Mengengerüst
- Ansichten: 76 Seitendateien · 120 Prüfseiten (Grundmenge) · 170 HTML-Seiten · 12 Hauptansichten (`HAUPTANSICHTEN.json`) · 1 Sprache.
- Komponenten: 85 Bestand (13 verwaist → E2-AUF-01); neu ≈ 18 Bausteine in `src/components/kern/` plus Icon-Kette; 6 Bestandskomponenten an Ort und Stelle umgebaut (FinalCTA, QualityPromise, ReviewCarousel/Card, FAQAccordion, TrustStrip, GoogleReviewsBadge).
- Grafiken: ≈ 36 Icons (10 Fachzeichen Orchestrator, 25 UI-Icons, davon 12 Muster vom Orchestrator), parametrischer Verlegeplan mit ≈ 12 Planvorgaben, 3 Verbände, Zustandsgrafiken, 404-Plan, Leitachse, Einzugsband, Fugenband.
- Bewegungen: 16 Registereinträge (K-007, `register.json`).
- Neue Logik mit Tests: Bewegungsmodul, Einzugszonen, Verband-Geometrie, Fokus nach Seitenwechsel (node --test); Menü vor Hydrierung, Tracking nach Einwilligung, V-Abnahmetests (Playwright).

## Pflicht und Kür
- **Pflicht** (ohne sie bliebe ein Kriterium offen): alle Pakete E0–E6 und C der Liste unten. Begründungskette für „alle 76 Seiten auf Systemstand“: Z-06 verlangt eine Icon-Familie projektweit (lucide in 120 Dateien) → jede Seitendatei wird berührt → Z-03 gilt für sie (nur Systemwerte) → und der Abbau von `tokens.css` (E6-ORCH-01) würde unumgebaute Seiten umfärben.
- **Kür** (nach Wirkung sortiert, jede mit Schwelle): K-01 … K-09. Die Kürliste wächst nach diesem Plan nicht.

## Etappen, Wellen, kritischer Pfad
- E0 Start · E1 Plan · E2 Referenz (W1 Fundament/Bewegung/Form/Waisen · W2 Bausteine-Referenz, Funnels zerlegen, Icons nach Muster · W3 Rahmen, Bausteine nach Muster, Karten, Umbauskript · W4 `/` und `/kontakt` · Tor) · E3 Hauptansichten und Komponenten (W1 Seitenkörper + Arbeitsansichten + Formteile · W2 große Momente + restliche Formteile · Tor) · E4 Bad- und Fliesen-Familie · E5 Untergrund, Balkon, Naturstein, Treppen, Stadtseiten · E6 Firma, Arbeit, Recht, Rest, Abbau · E7–E8 Kür · Abschluss (C).
- Wellen nach Dateihoheit und Importgraph: Pakete derselben Welle teilen keine Datei; Seiten, die eine im Umbau befindliche Komponente importieren, laufen erst nach deren Abnahme.
- Kritischer Pfad: E0-PRUEF-02 → E0-PRUEF-03 → E2-ORCH-01 → -03/-04 → -05 → -08 → E2-Tor → E3-W1 → E3-W2 → E3-Tor → E4–E6 → E6-ORCH-01 → C.

## Modellanteil und Kapazität
- Pakete gesamt ≈ 140 (Liste unten; Prüfstufe-A-Läufe der Orchestrator-Pakete und Wellen-Builds als je ein Paket je Lauf gezählt, ≈ 30): ARBEITSMODELL ≈ 118, ORCHESTRATOR ≈ 22 (davon 3 als frische Unteragenten: E2-SICHT, C-END, ggf. ein übergroßes Stufe-3-Paket).
- Kapazität: 140 ÷ (4 Plätze × 5 Wellen/Tag) × 1,2 ≈ 8,4 Tage → 9 Etappen à etwa einem Tag (E0+E1 · E2 ×2 · E3 · E4 · E5 · E6 · E7–E8 · C).

## Paketliste
Legende Status: offen · läuft · ✔ <Commit> · AUSNAHME. Rolle/Modell nach Auftrag Abschnitt 5; Modelle nur als Rollen benannt (E-012).

| Kennung | Ziel | Rolle | Modell | Stufe | Schreibrechte | Abhängig | Kriterium | Welle | Status |
|---|---|---|---|---|---|---|---|---|---|
| E0-ORCH-01 | Werkstatt, Auftrag, Werkzeuge, Block | Orchestrator | ORCHESTRATOR | 3 | _werkstatt/*, CLAUDE.md, Ausschlüsse | – | Z-10 | E0 | ✔ 745335f |
| E0-PRUEF-01 | Einrichtung, Reinraum, Server | Prüfer | ARBEITSMODELL | 1 | werkzeuge/{server,reinraum,dev-server}.sh, lib, playwright.config, EINRICHTUNG | E0-ORCH-01 | Z-02 | E0 | ✔ 3e17980 |
| E0-PRUEF-02a | Einzelbild, Bildsatz, Überlappung, pruefe-a.sh | Prüfer | ARBEITSMODELL | 1 | werkzeuge/{einzelbild,bildsatz,ueberlappung}.mjs, pruefe-a.sh, test-zuordnung.json, lib.mjs | E0-PRUEF-01 | Z-02, Z-09 | E0-W1 | offen |
| E0-PRUEF-02b | Bewegung (Einzelbilder, Bildrate, Register, reduziert), Glyphen | Prüfer | ARBEITSMODELL | 1 | werkzeuge/{bewegung,glyphen}.mjs, glyphen.py | E0-PRUEF-01 | Z-05 | E0-W1 | offen |
| E0-PRUEF-02c | Lighthouse-Kette, Textinvarianten | Prüfer | ARBEITSMODELL | 1 | werkzeuge/{lighthouse,texte,texte-vergleich}.mjs | E0-PRUEF-01 | Z-02, Z-08 | E0-W1 | offen |
| E0-PRUEF-02d | Systemwerte, SVG-Prüfung | Prüfer | ARBEITSMODELL | 1 | werkzeuge/{werte,svg}.mjs, werte-regeln.json | E0-PRUEF-01 | Z-03, Z-06 | E0-W1 | offen |
| E0-PRUEF-03 | Ausgangswerte Prüfstufe B (12 Hauptansichten) | Prüfer | ARBEITSMODELL | 1 | _werkstatt/belege/e0/** | E0-PRUEF-02a–d | alle | E0-W2 | offen |
| E0-PRUEF-04 | Funktionsliste als Ausgangswert; neuer Fall Tracking erst nach Einwilligung | Prüfer | ARBEITSMODELL | 1 | werkzeuge/tests/funktion-tracking.spec.mjs (neu), belege/e0/funktion* | E0-PRUEF-02a | Z-02 | E0-W2 | offen |
| E0-DOK-01 | Vorher-Bildsatz nach Aufnahmeprotokoll | Dokumentar | ARBEITSMODELL | 1 | _werkstatt/bilder/e0/** | E0-PRUEF-03 | Z-04, Z-10 | E0-W3 | offen |
| E0-ORCH-02 | LAGEBILD.md | Orchestrator | ORCHESTRATOR | 3 | _werkstatt/LAGEBILD.md | E0-PRUEF-03, -04 | Z-10 | E0 | offen |
| E1-ORCH-01 | KERN v2, PLAN, ABNAHME, Denkprotokolle | Orchestrator | ORCHESTRATOR | 3 | _werkstatt/{KERN,PLAN,ABNAHME,ENTSCHEIDUNGEN}.md, register.json | E0 | Z-01 | E1 | offen |
| E1-PRUEF-01 | L0-Planprüfung (≤ 2 Runden) | Prüfer | ARBEITSMODELL | 1 | _werkstatt/berichte/E1-L0-*.md | E1-ORCH-01 | Z-01 | E1 | offen |
| E2-ORCH-01 | Fundament: Schriften lokal, @theme static, layer(alt), Basisstile, Umfärben der Basisklassen, images.qualities | Orchestrator | ORCHESTRATOR | 3 | src/app/globals.css, src/app/layout.tsx, src/app/fonts/**, next.config.ts, werkzeuge/werte-regeln.json | E1 | Z-03, Z-08 | E2-W1 | offen |
| E2-ORCH-02 | Bewegungssystem: src/lib/motion, Head-Skript, Register-CSS, Leitachse, Tests | Orchestrator | ORCHESTRATOR | 3 | src/lib/motion/**, src/components/kern/Laserachse.tsx, globals.css, test/bewegung.test.mjs, package.json (test) | E2-ORCH-01 | Z-05 | E2-W1 | offen |
| E2-ORCH-03 | Formsystem: Icon/Sprite-Kette, 12 Muster-Icons, 10 Fachzeichen, Zuordnung 134 lucide, Fugenkreuz, Verlegeplan + Planvorgaben | Orchestrator | ORCHESTRATOR | 3 | src/components/icons/**, src/components/kern/{Fugenkreuz,Verlegeplan}.tsx, src/lib/plaene/**, src/utils/iconMapper.jsx, werkzeuge/sprite.mjs | E2-ORCH-01 | Z-06 | E2-W1 | offen |
| E2-ORCH-04 | Referenzbausteine Einstieg, Abschnitt, Feldraster, Knopf, Feld, Kundenstimme (= ReviewCarousel/ReviewCard an Ort und Stelle), FAQ (= FAQAccordion), Abschluss (= FinalCTA); Dev-Schaufenster | Orchestrator | ORCHESTRATOR | 3 | src/components/kern/{Einstieg,Abschnitt,Feldraster,Knopf,Feld,Kundenstimme}.tsx, src/components/reviews/{ReviewCarousel,ReviewCard}.tsx, src/components/ui/{FAQAccordion,FinalCTA}.tsx, src/app/werkstatt-schaufenster/page.dev.tsx, next.config.ts | E2-ORCH-01..03 | Z-03, Z-04, Z-07 | E2-W2 | offen |
| E2-ORCH-05a | Rahmen: Kopf mit Mega-Menü (Links), Popover-Mobilmenü (V-06), untere Leiste, Fuß mit Schriftfeld und Seitenindex | Orchestrator | ORCHESTRATOR | 3 | src/components/common/{Header,MobileMenu,Footer}.jsx, src/components/layout/{HeaderWrapper,MobileBottomBar}.tsx | E2-ORCH-04 | Z-02, Z-04, Z-07 | E2-W3 | offen |
| E2-ORCH-05b | Rahmen: WhatsApp-Knopf flach, Banner als Schriftfeld (Logik unverändert), WaterCursor und Physik entfernen | Orchestrator | ORCHESTRATOR | 3 | src/components/common/{FloatingWhatsAppWidget,CookieConsent}.tsx, src/components/layout/ClientWidgets.tsx, src/components/ui/WaterCursor.tsx (entf.), src/components/common/WaterCursor.tsx (entf.), src/lib/physics/** (entf.) | E2-ORCH-04 | Z-02, Z-05, Z-07 | E2-W3 | offen |
| E2-ORCH-05c | Provider verlegen (E-010), MotionProvider abbauen, 404 mit Charakter, redirects() (V-04) | Orchestrator | ORCHESTRATOR | 3 | src/app/layout.tsx, src/app/not-found.tsx, src/app/blog/layout.tsx, src/app/login/layout.tsx, src/components/providers/MotionProvider.tsx (entf.), next.config.ts | E2-ORCH-05a | Z-02, Z-08 | E2-W3 | offen |
| E2-ORCH-06 | Funnels zerlegen ohne Verhaltensänderung (E-011) | Orchestrator | ORCHESTRATOR | 3 | src/components/funnels/** (FliesenKonfigurator, BadanfrageFunnel, TezgelAnfrageFunnel, BadProjektCheck → Ordner mit logik/stile/Schritt*/Zusammenfassung) | E2-ORCH-01 | Z-02 | E2-W2 | offen |
| E2-ORCH-07 | Umbauskript für wiederholte Muster (Einstieg, Abschnittskopf, lucide → Icon, Ratgeber-Liste), Textknoten wörtlich | Orchestrator | ORCHESTRATOR | 3 | werkzeuge/umbau.mjs | E2-ORCH-04 | Z-03, Z-06 | E2-W3 | offen |
| E2-ORCH-08 | Referenzansicht / vollständig: SIG-1, Leitachse, Leistungspläne, Ablauf, Stimmen mit Anriss; HeroContactForm, PricingCalculator, TezgelAnfrageFunnel in allen Zuständen | Orchestrator | ORCHESTRATOR | 3 | src/app/page.tsx, src/components/forms/HeroContactForm.tsx, src/components/pricing/PricingCalculator.tsx, src/components/funnels/TezgelAnfrageFunnel/** (Darstellung), src/components/trust/TrustStrip.tsx | E2-ORCH-05*, -06 | Z-04, Z-05, Z-07, Z-08 | E2-W4 | offen |
| E2-ORCH-09 | Referenz Arbeitsansicht /kontakt inkl. BookingCalendar (V-02, V-05) und DirectContactCard (V-05) | Orchestrator | ORCHESTRATOR | 3 | src/app/kontakt/page.jsx, src/components/contact/{BookingCalendar,DirectContactCard}.tsx | E2-ORCH-08 | Z-02, Z-04, Z-07 | E2-W4 | offen |
| E2-GRAF-01 | 12 UI-Icons nach Muster (telefon … uhr-Gruppe) | Grafiker | ARBEITSMODELL | 2 | src/components/icons/svg/{mail,sprechblase,ort,uhr,kalender,pfeil-links,winkel-unten,winkel-rechts,schliessen,menue,hinweis,fehler}.svg | E2-ORCH-03 | Z-06 | E2-W2 | offen |
| E2-GRAF-02 | 13 UI-Icons nach Muster | Grafiker | ARBEITSMODELL | 2 | src/components/icons/svg/{plus,minus,stern,download,suche,teilen,link-extern,haus,dokument,schloss,pfeil-hoch,info,uhr-laeuft}.svg | E2-ORCH-03 | Z-06 | E2-W2 | offen |
| E2-BAU-01 | Bausteine nach Muster: Merkliste (= QualityPromise), Schriftfeld, Kennwert (= GoogleReviewsBadge) | Baumeister | ARBEITSMODELL | 2 | src/components/kern/{Merkliste,Schriftfeld,Kennwerte}.tsx, src/components/sections/QualityPromise.jsx, src/components/reviews/GoogleReviewsBadge.tsx, src/app/werkstatt-schaufenster/merkliste/page.dev.tsx | E2-ORCH-04 | Z-03, Z-04 | E2-W3 | offen |
| E2-BAU-02 | Bausteine nach Muster: Schrittfolge, RatgeberListe, Hinweis | Baumeister | ARBEITSMODELL | 2 | src/components/kern/{Schrittfolge,RatgeberListe,Hinweis}.tsx, src/app/werkstatt-schaufenster/schritte/page.dev.tsx | E2-ORCH-04 | Z-03 | E2-W3 | offen |
| E2-BAU-03 | Bausteine nach Muster: Tabelle (Region, Name, tabindex), Bildfeld | Baumeister | ARBEITSMODELL | 2 | src/components/kern/{Tabelle,Bildfeld}.tsx, src/app/werkstatt-schaufenster/tabelle/page.dev.tsx | E2-ORCH-04 | Z-03, Z-07 | E2-W3 | offen |
| E2-BAU-04 | Karten hinter Einwilligung im System, Platzhalter fester Höhe, V-01 (Info-Kasten überdeckt Knopf) | Baumeister | ARBEITSMODELL | 2 | src/components/legal/MapConsentGate.tsx, src/components/maps/** | E2-ORCH-04 | Z-02, Z-08, Z-09 | E2-W3 | offen |
| E2-AUF-01 | 13 verwaiste Komponenten entfernen (Denkprotokoll E-014) | Baumeister | ARBEITSMODELL | 2 | die 13 Dateien laut E0-KUN-03 Abschnitt 3 | E1 | Z-03 | E2-W1 | offen |
| E2-PRUEF-A | Prüfstufe A je Orchestrator-Paket (je Paket ein Lauf) | Prüfer | ARBEITSMODELL | 1 | _werkstatt/pakete/E2-PRUEF-A-*.rueckgabe.md | je E2-ORCH | Z-02 | laufend | offen |
| E2-PRUEF-W | Wellen-Build per reinraum.sh (je Welle) | Prüfer | ARBEITSMODELL | 1 | Rückgabe | je Welle | Z-02 | laufend | offen |
| E2-PRUEF-B | Prüfstufe B auf / und /kontakt (inkl. Lighthouse, Bewegung, Ersatzpfad) | Prüfer | ARBEITSMODELL | 1 | _werkstatt/belege/e2/** | E2-W4 | alle | E2-Tor | offen |
| E2-SICHT | Sichtabnahme Referenz (frischer Opus-Unteragent), Ansichtswert ≥ 8 | Orchestrator-Unteragent | ORCHESTRATOR | 3 | _werkstatt/berichte/E2-SICHT.md | E2-PRUEF-B | Z-04 | E2-Tor | offen |
| E2-DOK-01 | Referenz-Bildsatz (/ und /kontakt) ins Repo | Dokumentar | ARBEITSMODELL | 1 | _werkstatt/bilder/e2/** | E2-PRUEF-B | Z-10 | E2-Tor | offen |
| E3-BAU-01 | Seitenkörper /bad aus Bausteinen nach Referenz (Welle 1) | Baumeister | ARBEITSMODELL | 2 | src/app/bad/page.jsx | E2-Tor | Z-03, Z-04, Z-06 | E3-W1 | offen |
| E3-BAU-02 | Seitenkörper /leistungen aus Bausteinen nach Referenz (Welle 1) | Baumeister | ARBEITSMODELL | 2 | src/app/leistungen/page.jsx | E2-Tor | Z-03, Z-04, Z-06 | E3-W1 | offen |
| E3-BAU-03 | Seitenkörper /leistungen/[id] aus Bausteinen nach Referenz (Welle 1) | Baumeister | ARBEITSMODELL | 2 | src/app/leistungen/[id]/page.jsx | E2-Tor | Z-03, Z-04, Z-06 | E3-W1 | offen |
| E3-BAU-04 | Seitenkörper /standorte aus Bausteinen nach Referenz (Welle 1) | Baumeister | ARBEITSMODELL | 2 | src/app/standorte/page.tsx | E2-Tor | Z-03, Z-04, Z-06 | E3-W1 | offen |
| E3-BAU-05 | Seitenkörper /standorte/[stadt] aus Bausteinen nach Referenz (Welle 1) | Baumeister | ARBEITSMODELL | 2 | src/app/standorte/[stadt]/page.tsx | E2-Tor | Z-03, Z-04, Z-06 | E3-W1 | offen |
| E3-BAU-06 | Seitenkörper /fliesen aus Bausteinen nach Referenz (Welle 1) | Baumeister | ARBEITSMODELL | 2 | src/app/fliesen/page.jsx | E2-Tor | Z-03, Z-04, Z-06 | E3-W1 | offen |
| E3-BAU-07 | Seitenkörper /ueber-uns aus Bausteinen nach Referenz (Welle 1) | Baumeister | ARBEITSMODELL | 2 | src/app/ueber-uns/page.jsx | E2-Tor | Z-03, Z-04, Z-06 | E3-W1 | offen |
| E3-ORCH-01 | Großer Moment /bad: Szene „Verlegeplan entsteht“ + Komposition | Orchestrator | ORCHESTRATOR | 3 | src/components/kern/SzeneAblauf.tsx, src/app/bad/page.jsx | E3-BAU-01 | Z-04, Z-05 | E3-W2 | offen |
| E3-ORCH-02 | SIG-3 Verlegeplan je Leistung + Seitenwechsel /leistungen → /leistungen/[id] + Komposition | Orchestrator | ORCHESTRATOR | 3 | src/app/leistungen/page.jsx, src/app/leistungen/[id]/page.jsx, src/components/kern/LeistungsPlan.tsx | E3-BAU-02, -03 | Z-04, Z-05 | E3-W2 | offen |
| E3-ORCH-03 | Einzugsband /standorte und [stadt] + Komposition (Logik mit Test) | Orchestrator | ORCHESTRATOR | 3 | src/components/kern/Einzugsband.tsx, src/lib/einzugszonen.ts, test/einzugszonen.test.mjs, src/app/standorte/page.tsx, src/app/standorte/[stadt]/page.tsx | E3-BAU-04, -05 | Z-04, Z-05 | E3-W2 | offen |
| E3-ORCH-04 | Verband-Umschalter /fliesen + Komposition (Geometrie mit Test) | Orchestrator | ORCHESTRATOR | 3 | src/components/kern/VerbandUmschalter.tsx, src/lib/plaene/verband.ts, test/verband.test.mjs, src/app/fliesen/page.jsx | E3-BAU-06 | Z-04, Z-05 | E3-W2 | offen |
| E3-ORCH-05 | Fugenband /ueber-uns (ersetzt framer-motion in CompanyHistory) + Komposition | Orchestrator | ORCHESTRATOR | 3 | src/components/sections/CompanyHistory.jsx, src/app/ueber-uns/page.jsx | E3-BAU-07 | Z-04, Z-05 | E3-W2 | offen |
| E3-BAU-08 | Arbeitsansicht /fliesen/konfigurator nach /kontakt | Baumeister | ARBEITSMODELL | 2 | src/app/fliesen/konfigurator/page.jsx | E2-Tor | Z-04, Z-06 | E3-W1 | offen |
| E3-BAU-09 | Arbeitsansicht /blog als Server-Komponente mit Filter-Insel; BlogCard, BlogSidebar | Baumeister | ARBEITSMODELL | 2 | src/app/blog/page.jsx, src/components/blog/{BlogCard,BlogSidebar,BlogFilter}.jsx | E2-ORCH-05c | Z-04, Z-08 | E3-W1 | offen |
| E3-BAU-10 | Lesemodus /blog/[slug]: ReadingProgress, TableOfContents, ShareButtons, BlogAuthorCard, RelatedPosts, BlogVoteButton (Phosphor → Markenlogos) | Baumeister | ARBEITSMODELL | 2 | src/app/blog/[slug]/page.jsx, src/components/blog/{ReadingProgress,TableOfContents,ShareButtons,BlogAuthorCard,RelatedPosts,BlogVoteButton}.jsx | E2-Tor | Z-04, Z-06 | E3-W1 | offen |
| E3-BAU-11 | FliesenKonfigurator Schritt 1 nach Formular-Muster | Baumeister | ARBEITSMODELL | 2 | src/components/funnels/FliesenKonfigurator/(Teil 1) | E2-ORCH-06, E2-Tor | Z-02, Z-03 | E3-W1/W2 | offen |
| E3-BAU-12 | FliesenKonfigurator Schritt 2 nach Formular-Muster | Baumeister | ARBEITSMODELL | 2 | src/components/funnels/FliesenKonfigurator/(Teil 2) | E2-ORCH-06, E2-Tor | Z-02, Z-03 | E3-W1/W2 | offen |
| E3-BAU-13 | FliesenKonfigurator Schritt 3 nach Formular-Muster | Baumeister | ARBEITSMODELL | 2 | src/components/funnels/FliesenKonfigurator/(Teil 3) | E2-ORCH-06, E2-Tor | Z-02, Z-03 | E3-W1/W2 | offen |
| E3-BAU-14 | FliesenKonfigurator Schritt 4 nach Formular-Muster | Baumeister | ARBEITSMODELL | 2 | src/components/funnels/FliesenKonfigurator/(Teil 4) | E2-ORCH-06, E2-Tor | Z-02, Z-03 | E3-W1/W2 | offen |
| E3-BAU-15 | FliesenKonfigurator Zusammenfassung, Rahmen, Fehler (V-03) nach Formular-Muster | Baumeister | ARBEITSMODELL | 2 | src/components/funnels/FliesenKonfigurator/(Teil 5) | E2-ORCH-06, E2-Tor | Z-02, Z-03 | E3-W1/W2 | offen |
| E3-BAU-16 | BadanfrageFunnel Schritte 1–2 nach Formular-Muster | Baumeister | ARBEITSMODELL | 2 | src/components/funnels/BadanfrageFunnel/(Teil 1) | E2-ORCH-06, E2-Tor | Z-02, Z-03 | E3-W2 | offen |
| E3-BAU-17 | BadanfrageFunnel Schritte 3–5 nach Formular-Muster | Baumeister | ARBEITSMODELL | 2 | src/components/funnels/BadanfrageFunnel/(Teil 2) | E2-ORCH-06, E2-Tor | Z-02, Z-03 | E3-W2 | offen |
| E3-BAU-18 | BadanfrageFunnel Zusammenfassung, Rahmen, Fehler (V-03) nach Formular-Muster | Baumeister | ARBEITSMODELL | 2 | src/components/funnels/BadanfrageFunnel/(Teil 3) | E2-ORCH-06, E2-Tor | Z-02, Z-03 | E3-W2 | offen |
| E3-BAU-19 | BadProjektCheck Darstellung, Fehler mit role=alert (V-03) | Baumeister | ARBEITSMODELL | 2 | src/components/funnels/BadProjektCheck/** | E2-ORCH-06, E2-Tor | Z-02, Z-03 | E3-W2 | offen |
| E3-BAU-20 | LeadQuickForm: Labels verknüpft, Fehler role=alert (V-03), Nummer aus COMPANY_DATA (V-05) | Baumeister | ARBEITSMODELL | 2 | src/components/forms/LeadQuickForm.tsx | E2-Tor | Z-02, Z-07 | E3-W1 | offen |
| E3-BAU-21 | LocationContact, RouteVisualization im System (Standorte-Bausteine) | Baumeister | ARBEITSMODELL | 2 | src/components/locations/{LocationContact,RouteVisualization}.tsx | E2-Tor | Z-03 | E3-W1 | offen |
| E3-PRUEF-B | Prüfstufe B alle 12 Hauptansichten | Prüfer | ARBEITSMODELL | 1 | _werkstatt/belege/e3/** | E3 | alle | E3-Tor | offen |
| E3-SICHT | Sichtabnahme Hauptansichten (Orchestrator) | Orchestrator | ORCHESTRATOR | 3 | _werkstatt/berichte/E3-SICHT.md | E3-PRUEF-B | Z-04 | E3-Tor | offen |
| E4-BAU-01 | Systemstand /bad/badsanierung, /bad/bad-aus-einer-hand: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/bad/{badsanierung,bad-aus-einer-hand}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E4-W | offen |
| E4-BAU-02 | Systemstand /bad/barrierefreies-bad, /bad/fliesen: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/bad/{barrierefreies-bad,fliesen}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E4-W | offen |
| E4-BAU-03 | Systemstand /bad/badplaner, /bad/badanfrage, /bad/projekt-check (Arbeit): Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/bad/{badplaner,badanfrage,projekt-check}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E4-W | offen |
| E4-BAU-04 | Systemstand /bad/musterbaeder, /bad/musterbaeder/[slug]: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/bad/musterbaeder/page.jsx, src/app/bad/musterbaeder/[slug]/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E4-W | offen |
| E4-BAU-05 | Systemstand /fliesen/abnahme, /fliesen/auf-fussbodenheizung: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/fliesen/{abnahme,auf-fussbodenheizung}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E4-W | offen |
| E4-BAU-06 | Systemstand /fliesen/festpreisangebot, /fliesen/fliesenarten: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/fliesen/{festpreisangebot,fliesenarten}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E4-W | offen |
| E4-BAU-07 | Systemstand /fliesen/flur-diele, /fliesen/fugensanierung: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/fliesen/{flur-diele,fugensanierung}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E4-W | offen |
| E4-BAU-08 | Systemstand /fliesen/grossformat, /fliesen/holzoptik: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/fliesen/{grossformat,holzoptik}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E4-W | offen |
| E4-BAU-09 | Systemstand /fliesen/kueche, /fliesen/neubau: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/fliesen/{kueche,neubau}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E4-W | offen |
| E4-BAU-10 | Systemstand /fliesen/renovierung, /fliesen/verlegetechnik: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/fliesen/{renovierung,verlegetechnik}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E4-W | offen |
| E4-BAU-11 | Systemstand /fliesen/verlegemuster (Systemstand; Umschalter = Kür K-02): Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/fliesen/verlegemuster/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E4-W | offen |
| E5-BAU-01 | Systemstand /untergrund-abdichtung, /untergrund-abdichtung/din-18534: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/untergrund-abdichtung/page.jsx, …/din-18534/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E5-W | offen |
| E5-BAU-02 | Systemstand /untergrund-abdichtung/ausgleich-gefaelle, /estrich-belegreife: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/untergrund-abdichtung/{ausgleich-gefaelle,estrich-belegreife}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E5-W | offen |
| E5-BAU-03 | Systemstand /untergrund-abdichtung/entkopplung, /fliesen-auf-fliesen: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/untergrund-abdichtung/{entkopplung,fliesen-auf-fliesen}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E5-W | offen |
| E5-BAU-04 | Systemstand /balkon-terrasse, /balkon-terrasse/balkonsanierung: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/balkon-terrasse/page.jsx, …/balkonsanierung/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E5-W | offen |
| E5-BAU-05 | Systemstand /balkon-terrasse/stelzlager, /terrassenplatten: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/balkon-terrasse/{stelzlager,terrassenplatten}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E5-W | offen |
| E5-BAU-06 | Systemstand /naturstein, /naturstein/granit: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/naturstein/page.jsx, …/granit/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E5-W | offen |
| E5-BAU-07 | Systemstand /naturstein/marmor-kalkstein, /fliesenreparatur: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/naturstein/marmor-kalkstein/page.jsx, src/app/fliesenreparatur/page.tsx | E3-Tor | Z-03, Z-06, Z-09 | E5-W | offen |
| E5-BAU-08 | Systemstand /treppen, /treppen/innentreppe: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/treppen/page.jsx, …/innentreppe/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E5-W | offen |
| E5-BAU-09 | Systemstand /treppen/aussentreppe, /treppen/treppenhaus: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/treppen/{aussentreppe,treppenhaus}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E5-W | offen |
| E5-BAU-10 | Systemstand /leistungen/[id]/[stadt] (52 Seiten, Vorlage): Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/leistungen/[id]/[stadt]/page.tsx | E3-Tor | Z-03, Z-06, Z-09 | E5-W | offen |
| E5-BAU-11 | Systemstand /schadensanalyse: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/schadensanalyse/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E5-W | offen |
| E6-BAU-01 | Systemstand /unternehmen, /team, /partner: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/{unternehmen,team,partner}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E6-W | offen |
| E6-BAU-02 | Systemstand /karriere, /karriere/ausbildung: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/karriere/page.jsx, …/ausbildung/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E6-W | offen |
| E6-BAU-03 | Systemstand /ausstellung/wetzlar, /ausstellung/giessen: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/ausstellung/{wetzlar,giessen}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E6-W | offen |
| E6-BAU-04 | Systemstand /referenzen, /referenzen/[id] (Platzhalter-Kennzeichnung bleibt): Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/referenzen/page.jsx, …/[id]/page.jsx, src/components/sections/ReviewsSection.jsx | E3-Tor | Z-03, Z-06, Z-09 | E6-W | offen |
| E6-BAU-05 | Systemstand /termin (Arbeit): Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/termin/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E6-W | offen |
| E6-BAU-06 | Systemstand /beratung (Arbeit; framer-motion raus), CalendlySection: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/beratung/page.jsx, src/components/common/CalendlySection.jsx | E3-Tor | Z-03, Z-06, Z-09 | E6-W | offen |
| E6-BAU-07 | Systemstand /faq, /preise (Arbeit), PriceCard: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/{faq,preise}/page.jsx, src/components/pricing/PriceCard.tsx | E3-Tor | Z-03, Z-06, Z-09 | E6-W | offen |
| E6-BAU-08 | Systemstand /foerderung, /downloads, /login (Arbeit): Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/{foerderung,downloads,login}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E6-W | offen |
| E6-BAU-09 | Systemstand Rechtsseiten: /impressum, /datenschutz, /agb (nur Darstellung): Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/{impressum,datenschutz,agb}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E6-W | offen |
| E6-BAU-10 | Systemstand Rechtsseiten: /widerruf, /cookie-richtlinie, /barrierefreiheit (nur Darstellung): Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/{widerruf,cookie-richtlinie,barrierefreiheit}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E6-W | offen |
| E6-BAU-11 | Systemstand Restkomponenten: HeartbeatCTA (ersetzen), TileCraftIcons (ersetzen), PageWrapper, GradientText, SpotlightCard (entfernen nach null Nutzung): Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/components/animations/HeartbeatCTA.tsx, src/components/common/{TileCraftIcons,PageWrapper}.jsx, src/components/ui/{GradientText,SpotlightCard}.tsx | E3-Tor | Z-03, Z-06, Z-09 | E6-W | offen |
| E6-ORCH-01 | Altsystem-Abbau: Aliasse, tokens.css, --color-*: initial, npm uninstall framer-motion lucide-react @phosphor-icons/react, optimizePackageImports, docs/DESIGN_SYSTEM.md | Orchestrator | ORCHESTRATOR | 3 | src/app/globals.css, src/styles/tokens.css (entf.), package.json, package-lock.json, next.config.ts, docs/DESIGN_SYSTEM.md, src/utils/iconMapper.jsx | E4–E6 | Z-03, Z-06 | E6-Ende | offen |
| E4/E5/E6-PRUEF-B | Prüfstufe B je Etappe | Prüfer | ARBEITSMODELL | 1 | _werkstatt/belege/e4|e5|e6/** | Etappe | alle | Etappentor | offen |
| K-01 | SIG-3-Plan auf allen 30 Leistungs- und Themenseiten (Schwelle 100 %) | Baumeister/Orchestrator | ARBEITSMODELL bzw. ORCHESTRATOR | 2/3 | wird beim Start der Kür als Dateiliste festgelegt | Pflicht erfüllt | Nordstern (Kür) | E7–E8 | offen |
| K-02 | Verband-Umschalter auf /fliesen/verlegemuster | Baumeister/Orchestrator | ARBEITSMODELL bzw. ORCHESTRATOR | 2/3 | wird beim Start der Kür als Dateiliste festgelegt | Pflicht erfüllt | Nordstern (Kür) | E7–E8 | offen |
| K-03 | Planvorschau im Konfigurator aus Fläche und Verschnitt | Baumeister/Orchestrator | ARBEITSMODELL bzw. ORCHESTRATOR | 2/3 | wird beim Start der Kür als Dateiliste festgelegt | Pflicht erfüllt | Nordstern (Kür) | E7–E8 | offen |
| K-04 | Leitachse und Ablauf-Szene auf allen Erzähl-Hubs | Baumeister/Orchestrator | ARBEITSMODELL bzw. ORCHESTRATOR | 2/3 | wird beim Start der Kür als Dateiliste festgelegt | Pflicht erfüllt | Nordstern (Kür) | E7–E8 | offen |
| K-05 | Seitenwechsel für [stadt]- und musterbaeder-Paare | Baumeister/Orchestrator | ARBEITSMODELL bzw. ORCHESTRATOR | 2/3 | wird beim Start der Kür als Dateiliste festgelegt | Pflicht erfüllt | Nordstern (Kür) | E7–E8 | offen |
| K-06 | Teilen-Bilder über next/og für die 12 Hauptansichten | Baumeister/Orchestrator | ARBEITSMODELL bzw. ORCHESTRATOR | 2/3 | wird beim Start der Kür als Dateiliste festgelegt | Pflicht erfüllt | Nordstern (Kür) | E7–E8 | offen |
| K-07 | Druckansicht für Ratgeber | Baumeister/Orchestrator | ARBEITSMODELL bzw. ORCHESTRATOR | 2/3 | wird beim Start der Kür als Dateiliste festgelegt | Pflicht erfüllt | Nordstern (Kür) | E7–E8 | offen |
| K-08 | forced-colors und Lauf ohne JS auf allen Hauptansichten ohne Befund | Baumeister/Orchestrator | ARBEITSMODELL bzw. ORCHESTRATOR | 2/3 | wird beim Start der Kür als Dateiliste festgelegt | Pflicht erfüllt | Nordstern (Kür) | E7–E8 | offen |
| K-09 | LCP mobil ≤ 2,0 s auf allen Hauptansichten | Baumeister/Orchestrator | ARBEITSMODELL bzw. ORCHESTRATOR | 2/3 | wird beim Start der Kür als Dateiliste festgelegt | Pflicht erfüllt | Nordstern (Kür) | E7–E8 | offen |
| C-PRUEF-01..04 | Prüfstufe C (B + 10 % Stichprobe, Funktionsliste, Hauptaufgaben mit Tastatur, Register, alle SVG) | Prüfer | ARBEITSMODELL | 1 | _werkstatt/belege/c/** | Kür | alle | Abschluss | offen |
| C-DOK-01 | Vorher-Nachher-Galerie (neutral benannt, Schlüssel getrennt) und Abschluss-Bildsatz | Dokumentar | ARBEITSMODELL | 1 | _werkstatt/bilder/{abschluss,galerie.html,blind/**} | C-PRUEF | Z-04, Z-10 | Abschluss | offen |
| C-ORCH-01 | BERICHT.md, Anleitung Zusammenführen/Zurückrollen, MENSCHEN vollständig | Orchestrator | ORCHESTRATOR | 3 | _werkstatt/{BERICHT,MENSCHEN}.md | C-DOK-01 | Z-10 | Abschluss | offen |
| C-END | Endprüfer (frischer Opus-Unteragent): jede Zeile von ABNAHME gegen Beleg | Orchestrator-Unteragent | ORCHESTRATOR | 3 | _werkstatt/berichte/C-ENDPRUEFUNG.md | C-ORCH-01 | Z-01..Z-10 | Abschluss | offen |

## Offene Punkte (aus Etappentoren)
_keine_

---

# Anhang · Genehmigter Grobplan (Chat, 10.10.2026)

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
