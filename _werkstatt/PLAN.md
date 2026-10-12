# PLAN · Werkstatt-Lauf Tezgel · Version 1 (E1)

Kern-Version: v2 · Stand: 10.10.2026 · Gilt bis zum nächsten Etappentor; Änderungen nur an Etappentoren und nur, wenn ein Kriterium sonst unerreichbar wäre (Auftrag 3.4). Begründungen: ENTSCHEIDUNGEN.md; Gestaltung: KERN.md; Kriterien: ABNAHME.md.

## Mengengerüst
- Ansichten: 76 Seitendateien · 120 Prüfseiten (Grundmenge) · 170 HTML-Seiten · 12 Hauptansichten (`HAUPTANSICHTEN.json`) · 1 Sprache.
- Komponenten: 85 Bestand (13 verwaist → E2-AUF-01); neu ≈ 18 Bausteine in `src/components/kern/` plus Icon-Kette; 6 Bestandskomponenten an Ort und Stelle umgebaut (FinalCTA, QualityPromise, ReviewCarousel/Card, FAQAccordion, TrustStrip, GoogleReviewsBadge).
- Grafiken: 38 Icons (Orchestrator: 12 Fachzeichen und 3 UI-Muster telefon, pfeil-rechts, haken; ARBEITSMODELL: 23 UI-Icons in E2-GRAF-01/-02), parametrischer Verlegeplan mit ≈ 12 Planvorgaben, 3 Verbände, Zustandsgrafiken, 404-Plan, Leitachse, Einzugsband, Fugenband.
- Bewegungen: 16 Registereinträge (K-007, `register.json`).
- Neue Logik mit Tests: Bewegungsmodul, Einzugszonen, Verband-Geometrie, Fokus nach Seitenwechsel (node --test); Menü vor Hydrierung, Tracking nach Einwilligung, V-Abnahmetests (Playwright).

## Pflicht und Kür
- **Pflicht** (ohne sie bliebe ein Kriterium offen): alle Pakete E0–E6 der Liste unten (Abschluss C ist der Prüfweg, keine Pflichtposition). Begründungskette für „alle 76 Seiten auf Systemstand“: Z-06 verlangt eine Icon-Familie projektweit (lucide in 120 Dateien) → jede Seitendatei wird berührt → Z-03 gilt für sie (nur Systemwerte) → und der Abbau von `tokens.css` (E6-ORCH-01) würde unumgebaute Seiten umfärben.
- **Kür** (nach Wirkung sortiert, jede mit Schwelle und Z-Kriterium): KÜR-01 (a–d) … KÜR-09 (eigene Kennung, nicht zu verwechseln mit KERN K-001 ff.). Die Kürliste wächst nach diesem Plan nicht.

## Etappen, Wellen, kritischer Pfad
- E0 Start · E1 Plan · E2 Referenz (W1 Fundament/Bewegung/Form/Waisen · W2 Bausteine-Referenz, Funnels zerlegen, Icons nach Muster · W3 Rahmen, Bausteine nach Muster, Karten, Umbauskript · W4 `/` und `/kontakt` · Tor) · E3 Hauptansichten und Komponenten (W1 Seitenkörper + Arbeitsansichten + Formteile · W2 große Momente + restliche Formteile · Tor) · E4 Bad- und Fliesen-Familie · E5 Untergrund, Balkon, Naturstein, Treppen, Stadtseiten · E6 Firma, Arbeit, Recht, Rest, Abbau · E7–E8 Kür · Abschluss (C).
- Wellen nach Dateihoheit und Importgraph: Pakete derselben Welle teilen keine Datei; Seiten, die eine im Umbau befindliche Komponente direkt importieren, laufen erst nach deren Abnahme (transitive Bestandteile prüft das Etappentor gemeinsam). E3: W1 Komponenten und Seiten ohne W1-Importe · W2 übrige Seiten und große Momente ohne Abhängigkeit · W3 übrige große Momente.
- Kritischer Pfad: E0-PRUEF-02 → E0-PRUEF-03 → E2-ORCH-01 → -03/-04 → -05 → -08 → E2-Tor → E3-W1 → E3-W2 → E3-Tor → E4–E6 → E6-ORCH-01 → C.

## Modellanteil und Kapazität
- Pakete laut Tabelle: 119 Zeilen (ARBEITSMODELL 91, ORCHESTRATOR 28; davon als frische Unteragenten E2-SICHT und C-END). Dazu wiederholte Läufe aus Sammelzeilen, je Lauf ein Paket: Prüfstufe A der Orchestrator-Pakete (≈ 16) und Wellen-Builds (≈ 10) – zusammen ≈ 145 Pakete, ARBEITSMODELL ≈ 117 (≈ 81 %), ORCHESTRATOR ≈ 28. Es gilt die Tabellenzahl; die Läufe werden in STATUS gezählt.
- Kapazität: 145 ÷ (4 Plätze × 5 Wellen/Tag) × 1,2 ≈ 8,7 Tage → 9 Etappen à etwa einem Tag (E0+E1 · E2 ×2 · E3 · E4 · E5 · E6 · E7–E8 · C).
- Abweichungen vom Anhang (Grobplan): Seitenpässe entfallen – ersetzt durch das Umbauskript (E2-ORCH-07) und die Seitenpakete E3–E6, deren Briefings die Selektor- und Textliste tragen; Logik-Tests liegen in den Orchestrator-Paketen mit neuer Logik (E2-ORCH-02, E3-ORCH-03, E3-ORCH-04, KÜR-03) bzw. als neue Testdatei bei E0-PRUEF-04; weitere Bausteine sind E2-BAU-01 bis -03. Registereinträge (K-007) setzt E2-ORCH-02 als CSS/JS; ihren Einsatz bringen die Seitenpakete, die großen Momente bauen Orchestrator-Pakete.

## Paketliste
Legende Status: offen · läuft · ✔ <Commit> · AUSNAHME. Rolle/Modell nach Auftrag Abschnitt 5; Modelle nur als Rollen benannt (E-012).

| Kennung | Ziel | Rolle | Modell | Stufe | Schreibrechte | Abhängig | Kriterium | Welle | Status |
|---|---|---|---|---|---|---|---|---|---|
| E0-ORCH-01 | Werkstatt, Auftrag, Werkzeuge, Block | Orchestrator | ORCHESTRATOR | 3 | _werkstatt/{AUFTRAG,STATUS,PRUEFPUNKT,ENTSCHEIDUNGEN,MENSCHEN,TEXTVORSCHLAEGE,BERICHT,PLAN}.md, _werkstatt/berichte/E0-KUN-*.md, _werkstatt/werkzeuge/** (git mv), CLAUDE.md, Ausschlüsse | – | Z-10 | E0 | ✔ 745335f |
| E0-PRUEF-01 | Einrichtung, Reinraum, Server | Prüfer | ARBEITSMODELL | 1 | werkzeuge/{server,reinraum,dev-server}.sh, lib, playwright.config, EINRICHTUNG | E0-ORCH-01 | Z-02 | E0 | ✔ 3e17980 |
| E0-PRUEF-02a | Einzelbild, Bildsatz, Überlappung, pruefe-a.sh | Prüfer | ARBEITSMODELL | 1 | werkzeuge/{einzelbild,bildsatz,ueberlappung}.mjs, pruefe-a.sh, test-zuordnung.json, lib.mjs | E0-PRUEF-01 | Z-02, Z-09 | E0-W1 | ✔ 98c70bc |
| E0-PRUEF-02b | Bewegung (Einzelbilder, Bildrate, Register, reduziert), Glyphen | Prüfer | ARBEITSMODELL | 1 | werkzeuge/{bewegung,glyphen}.mjs, glyphen.py | E0-PRUEF-01 | Z-05 | E0-W1 | ✔ baf57f4 |
| E0-PRUEF-02c | Lighthouse-Kette, Textinvarianten | Prüfer | ARBEITSMODELL | 1 | werkzeuge/{lighthouse,texte,texte-vergleich}.mjs | E0-PRUEF-01 | Z-02, Z-08 | E0-W1 | ✔ d89d8b5 |
| E0-PRUEF-02d | Systemwerte, SVG-Prüfung | Prüfer | ARBEITSMODELL | 1 | werkzeuge/{werte,svg}.mjs, werte-regeln.json | E0-PRUEF-01 | Z-03, Z-06 | E0-W1 | ✔ d89d8b5 |
| E0-PRUEF-03 | Ausgangswerte Prüfstufe B (12 Hauptansichten) | Prüfer | ARBEITSMODELL | 1 | _werkstatt/belege/e0/ausgang/**, _werkstatt/belege/e0/texte/** (Textbasis für pruefe-a.sh) | E0-PRUEF-02a–d | alle | E0-W2 | ✔ db2619d (ohne Lighthouse; Lighthouse als E0-PRUEF-03L im Ruhefenster offen); Textbasis neu 4c5d51f |
| E0-PRUEF-04 | Funktionsliste als Ausgangswert; neuer Fall Tracking erst nach Einwilligung | Prüfer | ARBEITSMODELL | 1 | _werkstatt/werkzeuge/tests/funktion-tracking.spec.mjs (neue Testdatei, Regel „Testhoheit“), _werkstatt/belege/e0/funktion/** | E0-PRUEF-02a | Z-02 | E0-W2 | ✔ 006c894 |
| E0-DOK-01 | Vorher-Bildsatz nach Aufnahmeprotokoll | Dokumentar | ARBEITSMODELL | 1 | _werkstatt/bilder/e0/** | E0-PRUEF-03 | Z-04, Z-10 | E0-W3 | ✔ b062ab7 |
| E0-ORCH-02 | LAGEBILD.md | Orchestrator | ORCHESTRATOR | 3 | _werkstatt/LAGEBILD.md | E0-PRUEF-03, -04 | Z-10 | E0 | ✔ 2fcf98c, b9825fd |
| E1-ORCH-01 | KERN v2, PLAN, ABNAHME, Denkprotokolle | Orchestrator | ORCHESTRATOR | 3 | _werkstatt/{KERN,PLAN,ABNAHME,ENTSCHEIDUNGEN,MENSCHEN}.md, _werkstatt/register.json | E0 | Z-01 | E1 | ✔ nach L0 (Zwischenstand e28f3b4, 3012cb7) |
| E1-PRUEF-01 | L0-Planprüfung (≤ 2 Runden) | Prüfer | ARBEITSMODELL | 1 | _werkstatt/berichte/E1-L0-*.md | E1-ORCH-01 | Z-01 | E1 | ✔ (Runde 1: 22 Befunde, Runde 2: 5 Befunde – eingearbeitet) |
| E2-ORCH-01 | Fundament: Schriften lokal, @theme static, layer(alt), Basisstile, Umfärben der Basisklassen, images.qualities | Orchestrator | ORCHESTRATOR | 3 | src/app/globals.css, src/app/layout.tsx, src/app/fonts/**, next.config.ts, werkzeuge/werte-regeln.json | E1 | Z-03, Z-08 | E2-W1 | Zwischenstand 8bad228; Prüfstufe A gelaufen (E2-PRUEF-A-1: Systemwerte ROT durch Altblöcke; plate/fugen-bevel 513cfe8, WhatsApp/WaterCursor 1f8529f entfernt, Laufband folgt mit E2-ORCH-08) |
| E2-ORCH-02 | Bewegungssystem: src/lib/motion, Head-Skript, Register-CSS, Leitachse, Tests | Orchestrator | ORCHESTRATOR | 3 | src/lib/motion/**, src/app/bewegung.css, src/components/kern/{Laserachse,BewegungsWaechter}.tsx, test/bewegung.test.mjs, package.json (test) | E2-ORCH-01 | Z-05 | E2-W1 | Zwischenstand 8bad228; Prüfstufe A GRÜN (E2-PRUEF-A-1) |
| E2-ORCH-03 | Formsystem: Icon/Sprite-Kette, 12 Muster-Icons, 10 Fachzeichen, Zuordnung 134 lucide, Fugenkreuz, Verlegeplan + Planvorgaben | Orchestrator | ORCHESTRATOR | 3 | src/components/icons/**, src/components/kern/{Fugenkreuz,Verlegeplan}.tsx, src/lib/plaene/**, src/utils/iconMapper.jsx, werkzeuge/sprite.mjs | E2-ORCH-01 | Z-06 | E2-W1 | Zwischenstand 75511cf, ac5ea17; Prüfstufe A gelaufen (E2-PRUEF-A-1: Schaufenster-Überlappung, behoben 513cfe8) |
| E2-ORCH-04 | Referenzbausteine Einstieg, Abschnitt, Feldraster, Knopf, Feld, Kundenstimme (= ReviewCarousel/ReviewCard an Ort und Stelle), FAQ (= FAQAccordion), Abschluss (= FinalCTA); Dev-Schaufenster | Orchestrator | ORCHESTRATOR | 3 | src/components/kern/{Einstieg,Abschnitt,Feldraster,Knopf}.tsx (Feld liegt in Feldraster.tsx; Kundenstimme = ReviewCarousel/ReviewCard), src/components/reviews/{ReviewCarousel,ReviewCard}.tsx, src/components/ui/{FAQAccordion,FinalCTA}.tsx, src/app/werkstatt-schaufenster/page.dev.tsx, next.config.ts | E2-ORCH-01..03 | Z-03, Z-04, Z-07 | E2-W2 | ✔ 96070c6, Nacharbeit 417d7cf (Prüfstufe A: E2-PRUEF-A-1/-A-2) |
| E2-ORCH-05a | Rahmen: Kopf mit Mega-Menü (Links), Popover-Mobilmenü (V-06), untere Leiste, Fuß mit Schriftfeld und Seitenindex | Orchestrator | ORCHESTRATOR | 3 | src/components/common/{Header,MobileMenu,Footer}.jsx, src/components/layout/{HeaderWrapper,MobileBottomBar}.tsx | E2-ORCH-04 | Z-02, Z-04, Z-07 | E2-W3 | ✔ 8c983b9, 53f66a1, 72ce2c4, Nacharbeit 211417c, 513cfe8 (Prüfstufe A: E2-PRUEF-A-1/-A-2; Kopf ohne Überlauf bei 1280/1440) |
| E2-ORCH-05b | Rahmen: WhatsApp-Knopf flach, Banner als Schriftfeld (Logik unverändert), WaterCursor und Physik entfernen | Orchestrator | ORCHESTRATOR | 3 | src/components/common/{FloatingWhatsAppWidget,CookieConsent}.tsx, src/components/layout/ClientWidgets.tsx, src/components/ui/WhatsAppLogo.tsx, src/lib/whatsapp.ts (kontextNachricht), src/components/layout/MobileBottomBar.tsx; WaterCursor.tsx und src/lib/physics/** ungenutzt (Löschung M-15) | E2-ORCH-04 | Z-02, Z-05, Z-07 | E2-W3 | ✔ 1f8529f (Prüfstufe A: E2-PRUEF-A-2) |
| E2-ORCH-05c | Provider verlegen (E-010), MotionProvider abbauen, 404 mit Charakter, redirects() (V-04) | Orchestrator | ORCHESTRATOR | 3 | src/app/layout.tsx, src/app/not-found.tsx, src/app/blog/layout.tsx, src/app/login/layout.tsx, next.config.ts, src/components/sections/CompanyHistory.jsx und src/app/beratung/page.jsx (lokales MotionConfig); MotionProvider/UIProvider ungenutzt (Löschung M-15); Test funktion-weiterleitung.spec.mjs | E2-ORCH-05a | Z-02, Z-08 | E2-W3 | ✔ f499b5f (Prüfstufe A: E2-PRUEF-A-2; 308/308/404 belegt) |
| E2-ORCH-06 | Funnels zerlegen ohne Verhaltensänderung (E-011): je Ordner logik (gesperrt), stile, Schritt*, Erfolg/WhatsAppGeoeffnet bzw. Zusammenfassung, index; Gestaltung von stile.* und gemeinsamen Teilen (OptionGroup, TAF) in E2-ORCH-08 | Orchestrator | ORCHESTRATOR | 3 | src/components/funnels/{FliesenKonfigurator,BadanfrageFunnel,BadProjektCheck}.jsx und TezgelAnfrageFunnel.tsx → gleichnamige Ordner (git mv der Datei nach index.*) | E2-ORCH-01 | Z-02 | E2-W2 | ✔ f61f709, Nacharbeit 6e7c116 (Prüfstufe A: E2-PRUEF-A-2; Konfigurator nach Fix 46/0) |
| E2-ORCH-07 | Umbauskript für wiederholte Muster (Einstieg, Abschnittskopf, lucide → Icon, Ratgeber-Liste), Textknoten wörtlich | Orchestrator | ORCHESTRATOR | 3 | werkzeuge/umbau.mjs | E2-ORCH-04 | Z-03, Z-06 | E2-W3 | ✔ 960b0c4 (Trockenlauf 129 Dateien, Text-Fingerabdruck unverändert); Anwendung je Seite in E3–E6 |
| E2-ORCH-08 | Referenzansicht / vollständig: SIG-1, Leitachse, Leistungspläne, Ablauf, Stimmen mit Anriss; HeroContactForm, PricingCalculator, TezgelAnfrageFunnel in allen Zuständen; ersetzt GradientText und SpotlightCard auf / durch Bausteine (L0-R2 C-3) | Orchestrator | ORCHESTRATOR | 3 | src/app/page.tsx, src/components/forms/HeroContactForm.tsx, src/components/pricing/PricingCalculator.tsx, src/components/funnels/TezgelAnfrageFunnel/** (Darstellung), src/components/trust/TrustStrip.tsx | E2-ORCH-05*, -06 | Z-04, Z-05, Z-07, Z-08 | E2-W4 | ✔ Zwischenstand + N1 (Prüfstufe A E2-PRUEF-A-3: tsc/Lint/Text/Register/Werte grün; F-12 nach Testanpassung erneut in E2-PRUEF-A-4); N2 f8899dc (Fotos nur beim passenden Gewerk, Kennwert neben Vertrauensleiste, Rechner-Etikett) |
| E2-ORCH-09 | Referenz Arbeitsansicht /kontakt inkl. BookingCalendar (V-02, V-05) und DirectContactCard (V-05); LocationContact bleibt eingebunden, Umbau in E3-BAU-21 nach Muster /kontakt (L0-R2 C-3) | Orchestrator | ORCHESTRATOR | 3 | src/app/kontakt/page.jsx, src/components/contact/{BookingCalendar,DirectContactCard}.tsx | E2-ORCH-08 | Z-02, Z-04, Z-07 | E2-W4 | ✔ Prüfstufe A (E2-PRUEF-A-4) grün nach N1 (scroll-padding) und N2 (Drehung bei reduzierter Bewegung aus); N3 381ea43 LocationContact und Karten-Register nach E2-PRUEF-B; Tor-Nachweis in E2-PRUEF-B |
| E2-GRAF-01 | 12 UI-Icons nach Muster (mail … fehler) | Grafiker | ARBEITSMODELL | 2 | src/components/icons/svg/{mail,sprechblase,ort,uhr,kalender,pfeil-links,winkel-unten,winkel-rechts,schliessen,menue,hinweis,fehler}.svg | E2-ORCH-03 | Z-06 | E2-W2 | ✔ 99d012d |
| E2-GRAF-02 | 11 UI-Icons nach Muster (plus … info) | Grafiker | ARBEITSMODELL | 2 | src/components/icons/svg/{plus,minus,stern,download,suche,teilen,link-extern,haus,dokument,schloss,info}.svg | E2-ORCH-03 | Z-06 | E2-W2 | ✔ 99c6f2d |
| E2-BAU-01 | Bausteine nach Muster: Merkliste (= QualityPromise), Schriftfeld, Kennwert (= GoogleReviewsBadge) | Baumeister | ARBEITSMODELL | 2 | src/components/kern/{Merkliste,Schriftfeld,Kennwerte}.tsx, src/components/sections/QualityPromise.jsx, src/components/reviews/GoogleReviewsBadge.tsx, src/app/werkstatt-schaufenster/merkliste/page.dev.tsx | E2-ORCH-04 | Z-03, Z-04 | E2-W3 | ✔ 8415326; Nacharbeit 211417c |
| E2-BAU-02 | Bausteine nach Muster: Schrittfolge, RatgeberListe, Hinweis | Baumeister | ARBEITSMODELL | 2 | src/components/kern/{Schrittfolge,RatgeberListe,Hinweis}.tsx, src/app/werkstatt-schaufenster/schritte/page.dev.tsx | E2-ORCH-04 | Z-03 | E2-W3 | ✔ 3787be1 |
| E2-BAU-03 | Bausteine nach Muster: Tabelle (Region, Name, tabindex), Bildfeld | Baumeister | ARBEITSMODELL | 2 | src/components/kern/{Tabelle,Bildfeld}.tsx, src/app/werkstatt-schaufenster/tabelle/page.dev.tsx | E2-ORCH-04 | Z-03, Z-07 | E2-W3 | ✔ e458c8e |
| E2-BAU-04 | Karten hinter Einwilligung im System, Platzhalter fester Höhe, V-01 (Info-Kasten überdeckt Knopf) | Baumeister | ARBEITSMODELL | 2 | src/components/legal/MapConsentGate.tsx, src/components/maps/{ContactPremiumMap,InteractiveMap,InteractiveServiceMap,LocalDominanceMap,ServiceMapWrapper}.tsx | E2-ORCH-04 | Z-02, Z-08, Z-09 | E2-W3 | ✔ Zwischenstände bis 96155f9 (Nacharbeit 1–3; Prüfstufe A grün, V-01 behoben, Kartenhöhen E-018) |
| E2-AUF-01 | 13 verwaiste Komponenten entfernen (Denkprotokoll E-014) | Baumeister | ARBEITSMODELL | 2 | src/components/CookieConsent.tsx, src/components/common/{GoogleMap,WaterCursor,WhatsAppButton}.tsx, src/components/layout/FloatingDock.tsx, src/components/maps/ContactMapWrapper.tsx, src/components/sections/home/ContactSection.tsx, src/components/trust/{TrustBadges,TrustSignals}.tsx, src/components/ui/{AnimatedNumber,OptimizedImage,RotatingText,TiltCard}.tsx | E1 | Z-03 | E2-W1 | zurückgestellt: Nutzung 0 für alle 13 belegt, Löschung braucht Freigabe (MENSCHEN M-15) |
| E2-PRUEF-A | Prüfstufe A je Orchestrator-Paket (je Paket ein Lauf) | Prüfer | ARBEITSMODELL | 1 | _werkstatt/pakete/E2-PRUEF-A-*.rueckgabe.md | je E2-ORCH | Z-02 | E2-W2 bis E2-W4 (je Orchestrator-Paket nach dessen Abschluss) | Lauf 1 ✔ 06b542d; Lauf 2 ✔ (E2-PRUEF-A-2.rueckgabe.md) |
| E2-PRUEF-W | Wellen-Build per reinraum.sh (je Welle) | Prüfer | ARBEITSMODELL | 1 | _werkstatt/pakete/E2-PRUEF-W-*.rueckgabe.md | je Welle | Z-02 | E2-W1 bis E2-W4 (je Welle nach deren Abschluss) | offen |
| E2-PRUEF-B | Prüfstufe B auf / und /kontakt (inkl. Lighthouse, Bewegung, Ersatzpfad) | Prüfer | ARBEITSMODELL | 1 | _werkstatt/belege/e2/** | E2-W4 | alle | E2-Tor | ✔ Lauf 1 auf 1ad2e45 (32013cb) → Nacharbeiten N2/N3; Lauf 2 auf f8899dc (E2-PRUEF-B2/-B3, 105a6fd): alle Werkzeug-Maßstäbe erfüllt (axe 0, Register lückenlos, reduziert 0, Werte seit 1ad2e45 0, Texte grün, Funktion 286/0, Tracking 8/8, Bildsatz 0); Lighthouse als E2-PRUEF-L1 |
| E2-SICHT | Sichtabnahme Referenz (frischer Opus-Unteragent), Ansichtswert ≥ 8 | Orchestrator-Unteragent | ORCHESTRATOR | 3 | _werkstatt/berichte/E2-SICHT.md | E2-PRUEF-B | Z-04 | E2-Tor | läuft (Briefing `_werkstatt/pakete/E2-SICHT.md`) |
| E2-DOK-01 | Referenz-Bildsatz (/ und /kontakt) ins Repo | Dokumentar | ARBEITSMODELL | 1 | _werkstatt/bilder/e2/** | E2-PRUEF-B | Z-10 | E2-Tor | offen |
| E3-BAU-01 | Seitenkörper /bad aus Bausteinen nach Referenz (Welle 1) | Baumeister | ARBEITSMODELL | 2 | src/app/bad/page.jsx | E3-BAU-16 bis -19 abgenommen | Z-03, Z-04, Z-06 | E3-W2 | abgenommen (c2c1ad6) |
| E3-BAU-02 | Seitenkörper /leistungen aus Bausteinen nach Referenz (Welle 1) | Baumeister | ARBEITSMODELL | 2 | src/app/leistungen/page.jsx | E2-Tor | Z-03, Z-04, Z-06 | E3-W1 | abgenommen (eb9f553) |
| E3-BAU-03 | Seitenkörper /leistungen/[id] aus Bausteinen nach Referenz (Welle 1) | Baumeister | ARBEITSMODELL | 2 | src/app/leistungen/[id]/page.jsx | E2-Tor | Z-03, Z-04, Z-06 | E3-W1 | abgenommen (b1568a0) |
| E3-BAU-04 | Seitenkörper /standorte aus Bausteinen nach Referenz (Welle 1) | Baumeister | ARBEITSMODELL | 2 | src/app/standorte/page.tsx | E3-BAU-21 abgenommen | Z-03, Z-04, Z-06 | E3-W2 | abgenommen (5493007) |
| E3-BAU-05 | Seitenkörper /standorte/[stadt] aus Bausteinen nach Referenz (Welle 1) | Baumeister | ARBEITSMODELL | 2 | src/app/standorte/[stadt]/page.tsx | E3-BAU-21 abgenommen | Z-03, Z-04, Z-06 | E3-W2 | abgenommen (61b2acc) |
| E3-BAU-06 | Seitenkörper /fliesen aus Bausteinen nach Referenz (Welle 1) | Baumeister | ARBEITSMODELL | 2 | src/app/fliesen/page.jsx | E3-BAU-11 bis -15 abgenommen | Z-03, Z-04, Z-06 | E3-W2 | abgenommen (dd40e6e) |
| E3-BAU-07 | Seitenkörper /ueber-uns aus Bausteinen nach Referenz (Welle 1) | Baumeister | ARBEITSMODELL | 2 | src/app/ueber-uns/page.jsx | E2-Tor | Z-03, Z-04, Z-06 | E3-W1 | abgenommen (af1b434) |
| E3-ORCH-01 | Großer Moment /bad: Szene „Verlegeplan entsteht“ + Komposition | Orchestrator | ORCHESTRATOR | 3 | src/components/kern/SzeneAblauf.tsx, src/app/bad/page.jsx | E3-BAU-01 | Z-04, Z-05 | E3-W3 | umgesetzt (31f371b), Abnahme am E3-Tor |
| E3-ORCH-02 | SIG-3 Verlegeplan je Leistung + Seitenwechsel /leistungen → /leistungen/[id] + Komposition | Orchestrator | ORCHESTRATOR | 3 | src/app/leistungen/page.jsx, src/app/leistungen/[id]/page.jsx, src/components/kern/LeistungsPlan.tsx | E3-BAU-02, -03 | Z-04, Z-05 | E3-W2 | umgesetzt (3a0d64b), Abnahme am E3-Tor |
| E3-ORCH-03 | Einzugsband /standorte und [stadt] + Komposition (Logik mit Test); Entfernungen ab dem Firmensitz Aßlar aus `CITY_HUB_DATA` statt `CITIES.distanceKm` (ab Wetzlar; Rückgabe E3-BAU-04, M-17), Einbindung an der markierten Stelle in /standorte | Orchestrator | ORCHESTRATOR | 3 | src/components/kern/Einzugsband.tsx, src/lib/einzugszonen.ts, test/einzugszonen.test.mjs, src/app/standorte/page.tsx, src/app/standorte/[stadt]/page.tsx | E3-BAU-04, -05 | Z-04, Z-05 | E3-W3 | umgesetzt (61b2acc), Abnahme am E3-Tor |
| E3-ORCH-04 | Verband-Umschalter /fliesen + Komposition (Geometrie mit Test) | Orchestrator | ORCHESTRATOR | 3 | src/components/kern/VerbandUmschalter.tsx, src/lib/plaene/verband.ts, test/verband.test.mjs, src/app/fliesen/page.jsx | E3-BAU-06 | Z-04, Z-05 | E3-W3 | umgesetzt (8496eb9), Abnahme am E3-Tor |
| E3-ORCH-05 | Fugenband /ueber-uns (ersetzt framer-motion in CompanyHistory) + Komposition · CompanyHistory wird erst hier geändert (nach E3-BAU-07, keine gleichzeitige Änderung; L0-R2 C-1) | Orchestrator | ORCHESTRATOR | 3 | src/components/sections/CompanyHistory.jsx, src/app/ueber-uns/page.jsx | E3-BAU-07 | Z-04, Z-05 | E3-W2 | umgesetzt (ea86c75), Abnahme am E3-Tor |
| E3-ORCH-00 | Vorlauf: Stilmodule der Funnels FK/BF/BPC und OptionGroup im System (gewählt = Tinte, Farbwechsel ohne Überblendung), Markenlogos (ersetzt Phosphor in Blog-Bausteinen) | Orchestrator | ORCHESTRATOR | 2 | src/components/funnels/{FliesenKonfigurator,BadanfrageFunnel,BadProjektCheck}/stile.js, src/components/funnels/FliesenKonfigurator/OptionGroup.jsx, src/components/ui/Markenlogos.tsx | E2-ORCH-06 | Z-03, Z-06 | E3-W0 | abgenommen (in E3-BAU-11 bis -19 mitgeprüft) |
| E3-BAU-08 | Arbeitsansicht /fliesen/konfigurator nach /kontakt | Baumeister | ARBEITSMODELL | 2 | src/app/fliesen/konfigurator/page.jsx | E3-BAU-11 bis -15 abgenommen | Z-04, Z-06 | E3-W2 | abgenommen (d514b6d) |
| E3-BAU-09 | Arbeitsansicht /blog als Server-Komponente mit Filter-Insel; BlogCard, BlogSidebar; Muster /kontakt (E2-ORCH-09) | Baumeister | ARBEITSMODELL | 2 | src/app/blog/page.jsx, src/components/blog/{BlogCard,BlogSidebar,BlogFilter}.jsx | E2-Tor | Z-04, Z-08 | E3-W1 | abgenommen (cc02925) |
| E3-BAU-10 | Lesemodus /blog/[slug]: ReadingProgress, TableOfContents, ShareButtons, BlogAuthorCard, RelatedPosts, BlogVoteButton (Phosphor → Markenlogos) | Baumeister | ARBEITSMODELL | 2 | src/app/blog/[slug]/page.jsx, src/components/blog/{ReadingProgress,TableOfContents,ShareButtons,BlogAuthorCard,RelatedPosts,BlogVoteButton}.jsx | E2-Tor | Z-04, Z-06 | E3-W1 | abgenommen (b3f97a3) |
| E3-BAU-11 | FliesenKonfigurator Schritt 1 nach Formular-Muster src/components/forms/HeroContactForm.tsx + src/components/funnels/TezgelAnfrageFunnel/** (E2-ORCH-08), Klassen aus src/components/kern/stile.ts | Baumeister | ARBEITSMODELL | 2 | src/components/funnels/FliesenKonfigurator/Schritt1.jsx (logik.js gesperrt; stile.js und OptionGroup.jsx gehören E2-ORCH-06/-08) | E2-ORCH-06, E2-Tor | Z-02, Z-03 | E3-W1 | abgenommen (74ef030) |
| E3-BAU-12 | FliesenKonfigurator Schritt 2 nach Formular-Muster src/components/forms/HeroContactForm.tsx + src/components/funnels/TezgelAnfrageFunnel/** (E2-ORCH-08), Klassen aus src/components/kern/stile.ts | Baumeister | ARBEITSMODELL | 2 | src/components/funnels/FliesenKonfigurator/Schritt2.jsx (logik.js gesperrt; stile.js und OptionGroup.jsx gehören E2-ORCH-06/-08) | E2-ORCH-06, E2-Tor | Z-02, Z-03 | E3-W1 | abgenommen (9035c8a) |
| E3-BAU-13 | FliesenKonfigurator Schritt 3 nach Formular-Muster src/components/forms/HeroContactForm.tsx + src/components/funnels/TezgelAnfrageFunnel/** (E2-ORCH-08), Klassen aus src/components/kern/stile.ts | Baumeister | ARBEITSMODELL | 2 | src/components/funnels/FliesenKonfigurator/Schritt3.jsx (logik.js gesperrt; stile.js und OptionGroup.jsx gehören E2-ORCH-06/-08) | E2-ORCH-06, E2-Tor | Z-02, Z-03 | E3-W1 | abgenommen (8da19e4) |
| E3-BAU-14 | FliesenKonfigurator Schritt 4 und Zusammenfassung, Sendefehler mit role=alert (V-03, Meldung steht in Schritt4) nach Formular-Muster src/components/forms/HeroContactForm.tsx + src/components/funnels/TezgelAnfrageFunnel/** (E2-ORCH-08), Klassen aus src/components/kern/stile.ts | Baumeister | ARBEITSMODELL | 2 | src/components/funnels/FliesenKonfigurator/{Schritt4,ResultSummary}.jsx (logik.js gesperrt; stile.js und OptionGroup.jsx gehören E2-ORCH-06/-08) | E2-ORCH-06, E2-Tor | Z-02, Z-03 | E3-W1 | abgenommen (36ad6e7) |
| E3-BAU-15 | FliesenKonfigurator Erfolg, WhatsApp geöffnet, Rahmen (V-03 liegt in E3-BAU-14) nach Formular-Muster src/components/forms/HeroContactForm.tsx + src/components/funnels/TezgelAnfrageFunnel/** (E2-ORCH-08), Klassen aus src/components/kern/stile.ts | Baumeister | ARBEITSMODELL | 2 | src/components/funnels/FliesenKonfigurator/{Erfolg,WhatsAppGeoeffnet,index}.jsx (logik.js gesperrt; stile.js gehört E2-ORCH-06/-08) | E2-ORCH-06, E2-Tor | Z-02, Z-03 | E3-W1 | abgenommen (4efdf15) |
| E3-BAU-16 | BadanfrageFunnel Schritte 1–2 nach Formular-Muster src/components/forms/HeroContactForm.tsx + src/components/funnels/TezgelAnfrageFunnel/** (E2-ORCH-08), Klassen aus src/components/kern/stile.ts | Baumeister | ARBEITSMODELL | 2 | src/components/funnels/BadanfrageFunnel/{Schritt1,Schritt2}.jsx (Dateinamen nach E-011; logik.js gesperrt, stile.js gehört E2-ORCH-06) | E2-ORCH-06, E2-Tor | Z-02, Z-03 | E3-W1 | abgenommen (888d8e5) |
| E3-BAU-17 | BadanfrageFunnel Schritte 3–5, Sendefehler mit role=alert (V-03, Meldung steht in Schritt5) nach Formular-Muster src/components/forms/HeroContactForm.tsx + src/components/funnels/TezgelAnfrageFunnel/** (E2-ORCH-08), Klassen aus src/components/kern/stile.ts | Baumeister | ARBEITSMODELL | 2 | src/components/funnels/BadanfrageFunnel/{Schritt3,Schritt4,Schritt5}.jsx (Dateinamen nach E-011; logik.js gesperrt, stile.js gehört E2-ORCH-06) | E2-ORCH-06, E2-Tor | Z-02, Z-03 | E3-W1 | abgenommen |
| E3-BAU-18 | BadanfrageFunnel Erfolg, WhatsApp geöffnet, Rahmen (V-03 liegt in E3-BAU-17) nach Formular-Muster src/components/forms/HeroContactForm.tsx + src/components/funnels/TezgelAnfrageFunnel/** (E2-ORCH-08), Klassen aus src/components/kern/stile.ts | Baumeister | ARBEITSMODELL | 2 | src/components/funnels/BadanfrageFunnel/{Erfolg,WhatsAppGeoeffnet,index}.jsx (logik.js gesperrt; stile.js gehört E2-ORCH-06/-08) | E2-ORCH-06, E2-Tor | Z-02, Z-03 | E3-W1 | abgenommen (7f28abd) |
| E3-BAU-19 | BadProjektCheck Darstellung, Fehler mit role=alert (V-03) | Baumeister | ARBEITSMODELL | 2 | src/components/funnels/BadProjektCheck/{Schritt*,Zusammenfassung,index}.jsx (ohne logik.js) (Dateinamen nach E-011; logik.js gesperrt, stile.js gehört E2-ORCH-06) | E2-ORCH-06, E2-Tor | Z-02, Z-03 | E3-W1 | abgenommen (6225006) |
| E3-BAU-20 | LeadQuickForm: Labels verknüpft, Fehler role=alert (V-03), Nummer aus COMPANY_DATA (V-05) | Baumeister | ARBEITSMODELL | 2 | src/components/forms/LeadQuickForm.tsx | E2-Tor | Z-02, Z-07 | E3-W1 | abgenommen (2d2f40a) |
| E3-BAU-21 | RouteVisualization im System (Standorte-Baustein); LocationContact vorgezogen in E2-ORCH-09-N3 (Kontrastbefund am Tor), Muster für diesen Baustein | Baumeister | ARBEITSMODELL | 2 | src/components/locations/RouteVisualization.tsx | E2-Tor | Z-03 | E3-W1 | abgenommen (9b00eec) |
| E3-PRUEF-B | Prüfstufe B alle 12 Hauptansichten | Prüfer | ARBEITSMODELL | 1 | _werkstatt/belege/e3/** | E3-BAU-01 bis -21, E3-ORCH-01 bis -05 | alle | E3-Tor | offen |
| E3-SICHT | Sichtabnahme Hauptansichten (Orchestrator) | Orchestrator | ORCHESTRATOR | 3 | _werkstatt/berichte/E3-SICHT.md | E3-PRUEF-B | Z-04 | E3-Tor | offen |
| E4-BAU-01 | Systemstand /bad/badsanierung, /bad/bad-aus-einer-hand: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/bad/{badsanierung,bad-aus-einer-hand}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E4-W | abgenommen (fb069cf) |
| E4-BAU-02 | Systemstand /bad/barrierefreies-bad, /bad/fliesen: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/bad/{barrierefreies-bad,fliesen}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E4-W | abgenommen (559975b) |
| E4-BAU-03 | Systemstand /bad/badplaner, /bad/badanfrage, /bad/projekt-check (Arbeit): Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/bad/{badplaner,badanfrage,projekt-check}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E4-W | abgenommen (dc5f2ae) |
| E4-BAU-04 | Systemstand /bad/musterbaeder, /bad/musterbaeder/[slug]: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/bad/musterbaeder/page.jsx, src/app/(bestand)/bad/musterbaeder/[slug]/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E4-W | abgenommen (92ed276) |
| E4-BAU-05 | Systemstand /fliesen/abnahme, /fliesen/auf-fussbodenheizung: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/fliesen/{abnahme,auf-fussbodenheizung}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E4-W | abgenommen (4c1f614) |
| E4-BAU-06 | Systemstand /fliesen/festpreisangebot, /fliesen/fliesenarten: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/fliesen/{festpreisangebot,fliesenarten}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E4-W | abgenommen (691218b) |
| E4-BAU-07 | Systemstand /fliesen/flur-diele, /fliesen/fugensanierung: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/fliesen/{flur-diele,fugensanierung}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E4-W | abgenommen (48b76da) |
| E4-BAU-08 | Systemstand /fliesen/grossformat, /fliesen/holzoptik: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/fliesen/{grossformat,holzoptik}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E4-W | läuft |
| E4-BAU-09 | Systemstand /fliesen/kueche, /fliesen/neubau: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/fliesen/{kueche,neubau}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E4-W | läuft |
| E4-BAU-10 | Systemstand /fliesen/renovierung, /fliesen/verlegetechnik: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/fliesen/{renovierung,verlegetechnik}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E4-W | läuft |
| E4-BAU-11 | Systemstand /fliesen/verlegemuster (Systemstand; Umschalter = KÜR-02): Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/fliesen/verlegemuster/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E4-W | läuft |
| E5-BAU-01 | Systemstand /untergrund-abdichtung, /untergrund-abdichtung/din-18534: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/untergrund-abdichtung/page.jsx, …/din-18534/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E5-W | offen |
| E5-BAU-02 | Systemstand /untergrund-abdichtung/ausgleich-gefaelle, /estrich-belegreife: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/untergrund-abdichtung/{ausgleich-gefaelle,estrich-belegreife}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E5-W | offen |
| E5-BAU-03 | Systemstand /untergrund-abdichtung/entkopplung, /fliesen-auf-fliesen: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/untergrund-abdichtung/{entkopplung,fliesen-auf-fliesen}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E5-W | offen |
| E5-BAU-04 | Systemstand /balkon-terrasse, /balkon-terrasse/balkonsanierung: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/balkon-terrasse/page.jsx, …/balkonsanierung/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E5-W | offen |
| E5-BAU-05 | Systemstand /balkon-terrasse/stelzlager, /terrassenplatten: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/balkon-terrasse/{stelzlager,terrassenplatten}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E5-W | offen |
| E5-BAU-06 | Systemstand /naturstein, /naturstein/granit: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/naturstein/page.jsx, …/granit/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E5-W | offen |
| E5-BAU-07 | Systemstand /naturstein/marmor-kalkstein, /fliesenreparatur: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/naturstein/marmor-kalkstein/page.jsx, src/app/(bestand)/fliesenreparatur/page.tsx | E3-Tor | Z-03, Z-06, Z-09 | E5-W | offen |
| E5-BAU-08 | Systemstand /treppen, /treppen/innentreppe: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/treppen/page.jsx, …/innentreppe/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E5-W | offen |
| E5-BAU-09 | Systemstand /treppen/aussentreppe, /treppen/treppenhaus: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/treppen/{aussentreppe,treppenhaus}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E5-W | offen |
| E5-BAU-10 | Systemstand /leistungen/[id]/[stadt] (52 Seiten, Vorlage): Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/leistungen/[id]/[stadt]/page.tsx | E3-Tor | Z-03, Z-06, Z-09 | E5-W | offen |
| E5-BAU-11 | Systemstand /schadensanalyse: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/schadensanalyse/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E5-W | offen |
| E6-BAU-01 | Systemstand /unternehmen, /team, /partner: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/{unternehmen,team,partner}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E6-W | offen |
| E6-BAU-02 | Systemstand /karriere, /karriere/ausbildung: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/karriere/page.jsx, …/ausbildung/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E6-W | offen |
| E6-BAU-03 | Systemstand /ausstellung/wetzlar, /ausstellung/giessen: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/ausstellung/{wetzlar,giessen}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E6-W | offen |
| E6-BAU-04 | Systemstand /referenzen, /referenzen/[id] (Platzhalter-Kennzeichnung bleibt): Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/referenzen/page.jsx, …/[id]/page.jsx, src/components/sections/ReviewsSection.jsx | E3-Tor | Z-03, Z-06, Z-09 | E6-W | offen |
| E6-BAU-05 | Systemstand /termin (Arbeit): Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/termin/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E6-W | offen |
| E6-BAU-06 | Systemstand /beratung (Arbeit; framer-motion raus), CalendlySection: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/beratung/page.jsx, src/components/common/CalendlySection.jsx | E3-Tor | Z-03, Z-06, Z-09 | E6-W | offen |
| E6-BAU-07 | Systemstand /faq, /preise (Arbeit), PriceCard: Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/{faq,preise}/page.jsx, src/components/pricing/PriceCard.tsx | E3-Tor | Z-03, Z-06, Z-09 | E6-W | offen |
| E6-BAU-08 | Systemstand /foerderung, /downloads, /login (Arbeit): Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/{foerderung,downloads,login}/page.jsx | E3-Tor, E6-BAU-11 abgenommen (PageWrapper) | Z-03, Z-06, Z-09 | E6-W | offen |
| E6-BAU-09 | Systemstand Rechtsseiten: /impressum, /datenschutz, /agb (nur Darstellung): Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/{impressum,datenschutz,agb}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E6-W | offen |
| E6-BAU-10 | Systemstand Rechtsseiten: /widerruf, /cookie-richtlinie, /barrierefreiheit (nur Darstellung): Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/{widerruf,cookie-richtlinie,barrierefreiheit}/page.jsx | E3-Tor | Z-03, Z-06, Z-09 | E6-W | offen |
| E6-BAU-11 | Systemstand Restkomponenten: HeartbeatCTA (ersetzen), TileCraftIcons (ersetzen), PageWrapper, GradientText, SpotlightCard (entfernen nach null Nutzung): Umbauskript + Bausteine, eine Icon-Familie, nur Systemwerte | Baumeister | ARBEITSMODELL | 2 | src/components/animations/HeartbeatCTA.tsx, src/components/common/{TileCraftIcons,PageWrapper}.jsx, src/components/ui/{GradientText,SpotlightCard}.tsx | E3-Tor | Z-03, Z-06, Z-09 | E6-W | offen |
| E6-ORCH-01 | Altsystem-Abbau: Aliasse, tokens.css, --color-*: initial, npm uninstall framer-motion lucide-react @phosphor-icons/react, optimizePackageImports, docs/DESIGN_SYSTEM.md | Orchestrator | ORCHESTRATOR | 3 | src/app/globals.css, src/styles/tokens.css (entf.), package.json, package-lock.json, next.config.ts, docs/DESIGN_SYSTEM.md, src/utils/iconMapper.jsx | E4-BAU-01 bis -11, E5-BAU-01 bis -11, E6-BAU-01 bis -11, E4-PRUEF-B, E5-PRUEF-B, E6-PRUEF-B | Z-03, Z-06 | E6-Ende | offen |
| E4-PRUEF-B | Prüfstufe B Etappe E4 (Bildsatz, axe, Funktionsliste, Texte, Werte, SVG) | Prüfer | ARBEITSMODELL | 1 | _werkstatt/belege/e4/** | E4-BAU-01 bis -11 | alle | E4-Tor | offen |
| E5-PRUEF-B | Prüfstufe B Etappe E5 (Bildsatz, axe, Funktionsliste, Texte, Werte, SVG) | Prüfer | ARBEITSMODELL | 1 | _werkstatt/belege/e5/** | E5-BAU-01 bis -11 | alle | E5-Tor | offen |
| E6-PRUEF-B | Prüfstufe B Etappe E6 (Bildsatz, axe, Funktionsliste, Texte, Werte, SVG) | Prüfer | ARBEITSMODELL | 1 | _werkstatt/belege/e6/** | E6-BAU-01 bis -11 | alle | E6-Tor | offen |
| KÜR-01a | SIG-3-Plan auf den Themenseiten: Bad- und Reparaturseiten (6) · Schwelle KÜR-01 gesamt: 30 von 30 Themenseiten (ohne Hubs = KÜR-04, ohne /fliesen/verlegemuster = KÜR-02, ohne /fliesen/festpreisangebot) zeigen ihren Plan (Muster E3-ORCH-02) | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/bad/{badsanierung,fliesen,barrierefreies-bad,bad-aus-einer-hand}/page.jsx, src/app/(bestand)/fliesenreparatur/page.tsx, src/app/(bestand)/schadensanalyse/page.jsx (nur Einsatz von src/components/kern/LeistungsPlan.tsx) | E6-ORCH-01 | Z-01, Z-04 | E7–E8 | offen |
| KÜR-01b | SIG-3-Plan auf den Themenseiten: Fliesen-Themenseiten (11) · Schwelle KÜR-01 gesamt: 30 von 30 Themenseiten (ohne Hubs = KÜR-04, ohne /fliesen/verlegemuster = KÜR-02, ohne /fliesen/festpreisangebot) zeigen ihren Plan (Muster E3-ORCH-02) | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/fliesen/{abnahme,auf-fussbodenheizung,fliesenarten,flur-diele,fugensanierung,grossformat,holzoptik,kueche,neubau,renovierung,verlegetechnik}/page.jsx (nur Einsatz von src/components/kern/LeistungsPlan.tsx) | E6-ORCH-01 | Z-01, Z-04 | E7–E8 | offen |
| KÜR-01c | SIG-3-Plan auf den Themenseiten: Untergrund- und Balkonseiten (8) · Schwelle KÜR-01 gesamt: 30 von 30 Themenseiten (ohne Hubs = KÜR-04, ohne /fliesen/verlegemuster = KÜR-02, ohne /fliesen/festpreisangebot) zeigen ihren Plan (Muster E3-ORCH-02) | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/untergrund-abdichtung/{din-18534,ausgleich-gefaelle,estrich-belegreife,entkopplung,fliesen-auf-fliesen}/page.jsx, src/app/(bestand)/balkon-terrasse/{balkonsanierung,stelzlager,terrassenplatten}/page.jsx (nur Einsatz von src/components/kern/LeistungsPlan.tsx) | E6-ORCH-01 | Z-01, Z-04 | E7–E8 | offen |
| KÜR-01d | SIG-3-Plan auf den Themenseiten: Naturstein- und Treppenseiten (5) · Schwelle KÜR-01 gesamt: 30 von 30 Themenseiten (ohne Hubs = KÜR-04, ohne /fliesen/verlegemuster = KÜR-02, ohne /fliesen/festpreisangebot) zeigen ihren Plan (Muster E3-ORCH-02) | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/naturstein/{granit,marmor-kalkstein}/page.jsx, src/app/(bestand)/treppen/{innentreppe,aussentreppe,treppenhaus}/page.jsx (nur Einsatz von src/components/kern/LeistungsPlan.tsx) | E6-ORCH-01 | Z-01, Z-04 | E7–E8 | offen |
| KÜR-02 | Verband-Umschalter auf /fliesen/verlegemuster · Schwelle: 3 von 3 Verbänden umschaltbar, ohne JS bedienbar (Muster E3-ORCH-04) | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/fliesen/verlegemuster/page.jsx | E6-ORCH-01 | Z-01, Z-04 | E7–E8 | offen |
| KÜR-03 | Planvorschau im Konfigurator aus Fläche und Verschnitt · Schwelle: Vorschau in jedem Schritt ab Eingabe der Fläche; Rechenwerte unverändert aus logik.js (Test) | Orchestrator | ORCHESTRATOR | 3 | src/components/funnels/FliesenKonfigurator/Planvorschau.jsx (neu), src/lib/plaene/vorschau.ts (neu), test/vorschau.test.mjs (neu), src/components/funnels/FliesenKonfigurator/{Schritt2,Schritt3,Schritt4,Zusammenfassung}.jsx | E6-ORCH-01 | Z-01, Z-04, Z-02 | E7–E8 | offen |
| KÜR-04 | Leitachse und Ablauf-Szene auf allen Erzähl-Hubs · Schwelle: 8 von 8 Hubs (/bad, /leistungen, /fliesen, /untergrund-abdichtung, /balkon-terrasse, /naturstein, /treppen, /standorte) (Muster E3-ORCH-01) | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/{untergrund-abdichtung,balkon-terrasse,naturstein,treppen}/page.jsx (übrige Hubs tragen sie seit E3) | E6-ORCH-01 | Z-01, Z-04, Z-05 | E7–E8 | offen |
| KÜR-05 | Seitenwechsel für [stadt]- und Musterbad-Paare · Schwelle: 13 von 13 Stadt-Paaren und alle Musterbad-Paare (vorwärts, ab lg, Fokus auf h1) (Muster E3-ORCH-02) | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/standorte/page.tsx, src/app/(bestand)/standorte/[stadt]/page.tsx, src/app/(bestand)/bad/musterbaeder/page.jsx, src/app/(bestand)/bad/musterbaeder/[slug]/page.jsx | E6-ORCH-01 | Z-01, Z-05 | E7–E8 | offen |
| KÜR-06 | Teilen-Bilder über next/og für die 12 Hauptansichten · Schwelle: 12 von 12 Hauptansichten mit eigenem Bild, Build grün | Orchestrator | ORCHESTRATOR | 3 | src/lib/og/vorlage.tsx (neu), opengraph-image.tsx (neu) in den Ordnern der 12 Hauptansichten laut HAUPTANSICHTEN.json | E6-ORCH-01 | Z-01, Z-02 | E7–E8 | offen |
| KÜR-07 | Druckansicht für Ratgeber · Schwelle: 13 von 13 Ratgebern drucken ohne Kopf, Leiste, Banner und Menü, mit Quelle im Fuß (Bildsatz im Druckmedium) (Muster E3-BAU-10) | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/blog/[slug]/page.jsx, src/components/blog/{ReadingProgress,TableOfContents,ShareButtons,RelatedPosts,BlogVoteButton,BlogAuthorCard}.jsx | E6-ORCH-01, E3-BAU-10 | Z-01, Z-09 | E7–E8 | offen |
| KÜR-08 | forced-colors und Lauf ohne JS auf allen Hauptansichten · Schwelle: 12 von 12 ohne Befund; Messweg: axe und Bildsatz mit forcedColors: active sowie Lauf mit gesperrtem /_next/static (Hauptaufgaben erreichbar) | Orchestrator | ORCHESTRATOR | 3 | src/app/globals.css, src/app/bewegung.css (Befunde in Bausteinen werden Folgezeilen mit eigener Dateiliste) | E6-ORCH-01 | Z-01, Z-07 | E7–E8 | offen |
| KÜR-09 | LCP mobil ≤ 2,0 s auf allen Hauptansichten · Schwelle: 12 von 12, Median aus 3 nach Messprotokoll | Orchestrator | ORCHESTRATOR | 3 | src/app/layout.tsx, next.config.ts, src/app/fonts/** (Befunde in Ansichten werden Folgezeilen mit eigener Dateiliste) | E6-ORCH-01 | Z-01, Z-08 | E7–E8 | offen |
| C-PRUEF-01 | Prüfstufe C: Prüfstufe B auf 12 Hauptansichten + 10 %-Stichprobe (Bildsatz 390/768/1440, Überlauf, Überlappung, abgeschnittener Text) und Ersatzpfad-Lauf der Szenen-Ansichten ohne animation-timeline/View Transitions (Z-09) | Prüfer | ARBEITSMODELL | 1 | _werkstatt/belege/c/01/** | KÜR-01 bis KÜR-09 (erreicht oder als AUSNAHME belegt) | Z-04, Z-09 | Abschluss | offen |
| C-PRUEF-02 | Prüfstufe C: Reinraum-Build, npm-Prüfungen, Funktionsliste F-01…F-19 + neue Fälle, Text- und SEO-Vergleich gegen E0 | Prüfer | ARBEITSMODELL | 1 | _werkstatt/belege/c/02/** | KÜR-01 bis KÜR-09 (erreicht oder als AUSNAHME belegt) | Z-02 | Abschluss | offen |
| C-PRUEF-03 | Prüfstufe C: axe WCAG 2.2 AA mit Zuständen, fünf Hauptaufgaben nur mit Tastatur, Kontraste; Lighthouse nach Messprotokoll | Prüfer | ARBEITSMODELL | 1 | _werkstatt/belege/c/03/** | KÜR-01 bis KÜR-09 (erreicht oder als AUSNAHME belegt) | Z-07, Z-08 | Abschluss | offen |
| C-PRUEF-04 | Prüfstufe C: Register in beide Richtungen, reduzierte Bewegung, 5-Bild-Folgen, Bildrate bei 4× CPU; alle SVG (Fixpunkt, ARIA, IDs, Budgets); werte.mjs über alle seit E0 geänderten Dateien | Prüfer | ARBEITSMODELL | 1 | _werkstatt/belege/c/04/** | KÜR-01 bis KÜR-09 (erreicht oder als AUSNAHME belegt) | Z-03, Z-05, Z-06 | Abschluss | offen |
| C-DOK-01 | Vorher-Nachher-Galerie (neutral benannt, Schlüssel getrennt) und Abschluss-Bildsatz | Dokumentar | ARBEITSMODELL | 1 | _werkstatt/bilder/{abschluss,galerie.html,blind/**} | C-PRUEF-01 bis -04 | Z-04, Z-10 | Abschluss | offen |
| C-ORCH-01 | BERICHT.md, Anleitung Zusammenführen/Zurückrollen, MENSCHEN vollständig | Orchestrator | ORCHESTRATOR | 3 | _werkstatt/{BERICHT,MENSCHEN}.md | C-DOK-01 | Z-10 | Abschluss | offen |
| C-END | Endprüfer (frischer Opus-Unteragent): jede Zeile von ABNAHME gegen Beleg | Orchestrator-Unteragent | ORCHESTRATOR | 3 | _werkstatt/berichte/C-ENDPRUEFUNG.md | C-ORCH-01 | Z-01..Z-10 | Abschluss | offen |

## Offene Punkte (aus Etappentoren)

### E3-Tor, Anlauf 2 (E3-SICHT-2-ERZ/-ARB, Lighthouse e3-tor-2) → Pakete E4-N2 (zweiter und letzter Durchgang, E-026)

| Kennung | Ziel | Rolle | Modell | Stufe | Dateien | Abhängig | Kriterium | Welle | Status |
|---|---|---|---|---|---|---|---|---|---|
| E4-N2-01 | Mängel aus dem Tor (keine Sichtpakete): axe-Kontrast durch spätes Zeichnen (Qualitätsversprechen), Tabellenbeschriftung Konfigurator mobil, Werte im Zeitband, Erlaubnisse mit Vermerk; CLS durch Schrifttausch (Mono-Ersatz metrikgleich), Fuß-Übergänge ohne Kennung, Lesefortschritt unter reduzierter Bewegung (ARB 27) | Orchestrator | ORCHESTRATOR | 3 | QualityPromise.jsx, fliesen/konfigurator/page.jsx, kern/Zeitband.tsx, globals.css, common/Footer.jsx, blog/ReadingProgress.jsx, texte-erlaubt.json | E3-Tor 2 | Z-02, Z-03, Z-05, Z-07, Z-08 | N2-1 | abgenommen (2229ba8, 066aa25; Prüfstufe A: axe 0, CLS /bad 0,284 → 0,0007, Register ohne Lücke, Texte grün; 2 Einwilligungstests unter Last rot, einzeln 12/12 grün) |
| E4-N2-02 | Bausteine (Typo, Farbe, Komposition): H2 der Arbeitsansichten eine Stufe unter der H1 (ARB 4, 15, 25); je Planblatt ein rotes Achsstück (ERZ Q3); Vorspann im Einstieg ≤ 4 Zeilen bei 1440 und mobil kürzer, Plan bzw. Kennwerte mobil früher (ERZ 10, 25, Q4) | Orchestrator | ORCHESTRATOR | 3 | kern/{Abschnitt,Einstieg,Planblatt}.tsx | E3-Tor 2 | Z-04 | N2-1 | abgenommen (172bd63, c956779, ff07a57; Prüfstufe A E4-N2-02-PA: Funktion 290/0, axe 0 auf 24 Läufen, npm test 37/0; Nachtrag Planachse /leistungen/[id] und ein Rot je Bildschirm) |
| E4-N2-03 | Bewegung: /bad Planflucht auch bei 1440 erkennbar (rotes Achsstück zieht mit, ERZ 7); Einzugsband legt Zonen frei, Text ab Bild 0 lesbar (ERZ 18); /kontakt ohne Leitachse am Abschluss (Arbeitsansicht, ARB 6) | Orchestrator | ORCHESTRATOR | 3 | bewegung.css, kern/{Verlegeplan,Einzugsband}.tsx, ui/FinalCTA.tsx, kontakt/page.jsx | E4-N2-02 | Z-04, Z-05 | N2-1 | abgenommen (172bd63, 28abfc9; reduziert 0, Register /kontakt ohne Leitachse) |
| E4-N2-04 | /bad (Komposition, Details, Typo): Projektcheck und Badanfrage in einem Abschnitt mit einem Kontaktblock (ERZ 4); Zusammenfassung ohne Wortbruch und Überstand, Spalte ≥ 280 px, Werte linksbündig (ERZ 5, 6) | Baumeister | ARBEITSMODELL | 2 | bad/page.jsx, funnels/BadProjektCheck/Zusammenfassung.jsx | E4-N2-02 | Z-04, Z-09 | N2-1 | abgenommen (ff07a57) |
| E4-N2-05 | /leistungen (Komposition, Details): Ablauf mit Plänen, Merkmale aufklappbar, keine 2×2 gleichen Langlisten (ERZ 8); Reihen auf einer Grundlinie (ERZ Q2) | Baumeister | ARBEITSMODELL | 2 | leistungen/page.jsx | E4-N2-02 | Z-04 | N2-1 | abgenommen (c956779) |
| E4-N2-06 | /leistungen/[id] (Komposition, Details, Grafik): Direktkontakt ohne Leerfläche (ERZ 11); Spezialisierungen als dichte Liste, jedes H2 mit Etikett (ERZ 12); Schnittzeichnung statt Hinweiskasten-Icon (ERZ 13) | Baumeister | ARBEITSMODELL | 2 | leistungen/[id]/page.jsx | E4-N2-02 | Z-04 | N2-1 | abgenommen (f8cd790) |
| E4-N2-07 | /standorte (Komposition, Grafik, Details): ein Kartenplatz, ein Anfrageblock vor dem Abschluss (ERZ 15); Einzugsband als gezeichnetes Band (ERZ 16); Telefon einheitlich in Mono, ein WhatsApp-Zeichen, Ortsleiste ganz (ERZ 17, Mangel Z-09) | Baumeister | ARBEITSMODELL | 2 | standorte/page.tsx, maps/InteractiveServiceMap.tsx, locations/LocationContact.tsx | E4-N2-02 | Z-04, Z-09 | N2-1 | abgenommen (2db9127) |
| E4-N2-08 | /standorte/[stadt] (Komposition, Details, Grafik/Typo): Einzugsband einmal, im Einsatzgebiet nur der Ausschnitt um die Stadt (ERZ 19); Tabelle ≤ 66ch ohne Lücke (ERZ 20); eine H2-Stufe, gezeichnetes Band (ERZ 21) | Baumeister | ARBEITSMODELL | 2 | standorte/[stadt]/page.tsx, maps/LocalDominanceMap.tsx | E4-N2-02 | Z-04 | N2-2 | abgenommen (02c412c) |
| E4-N2-09 | /fliesen (Details, Komposition): Plan in den Wissensfeldern vollständig, Zahlen bündig (ERZ 23, Mangel Z-09); Konfigurator-Abschnitt mit Kopf, mobil Umschalter früher (ERZ 24) | Baumeister | ARBEITSMODELL | 2 | fliesen/page.jsx | E4-N2-02 | Z-04, Z-09 | N2-2 | abgenommen (f27c143) |
| E4-N2-10 | /ueber-uns (Farbe, Typo, Grafik): ein rotes Lot je Bildschirm (Leitachse neben dem Fugenband, ERZ 26); Kennwerte in Mono auf einer Grundlinie (ERZ 27); Formatskizzen an den Jahresmarken der Zeitleiste (ERZ 29); Zielgröße im Fuß (axe, Mangel Z-07) | Baumeister | ARBEITSMODELL | 2 | ueber-uns/page.jsx | E4-N2-01-PA | Z-04, Z-07 | N2-2 | abgenommen (51e737f) |
| E4-N2-11 | /fliesen/konfigurator (Komposition, Farbe/Bild, Grafik, Details): Werkzeug im ersten Bildschirm, rechte Spalte mit Bedarfsanzeige (ARB 11, 12); Auswahl mit Zeichen bzw. Zeichnung (ARB 13); Auswahlfelder als Feldraster an der Fuge (ARB 14); Etikett in 05, kein Wortbruch (ARB 17) | Baumeister | ARBEITSMODELL | 2 | fliesen/konfigurator/page.jsx, funnels/FliesenKonfigurator/** (ohne logik, stile) | E4-N2-02 | Z-04 | N2-2 | abgenommen (6196c07) |
| E4-N2-12 | /blog (Komposition, Farbe/Bild, Grafik, Details, Typo): rechte Spalte ohne Leerband, mobil erster Eintrag im ersten Bildschirm (ARB 18, 19); Zeichnung je Beitrag statt je Kategorie, eigenes Zeichen je Kategorie (ARB 20, 21); Metazeile ohne Überlauf (Mangel Z-09), eine linke Kante (ARB 22, 23); Auszug an der Wortgrenze, ein Schnitt für Überschriften (ARB 24, 25) | Baumeister | ARBEITSMODELL | 2 | blog/page.jsx, blog/{BlogCard,BlogFilter,BlogSidebar}.jsx, kern/RatgeberListe.tsx | E4-N2-02 | Z-04, Z-09 | N2-2 | abgenommen (52c2cb7, ffafb14) |
| E4-N2-13 | Ratgeber-Artikel (Farbe/Bild, Typo, Komposition, Details): Zeichnung im Einstieg wie in der Liste (ARB 28); Klassen in Tabellen durchgehend Mono (ARB 29); eine Spaltenkante bis zum Ende (ARB 30); Tabellen mobil gestapelt bzw. mit Hinweis (Mangel Z-09, ARB 31); Trenner „·“ statt Fugenkreuz (ARB 32) | Baumeister | ARBEITSMODELL | 2 | blog/[slug]/page.jsx, blog/{RelatedPosts,TableOfContents}.jsx, kern/Tabelle.tsx | E4-N2-02 | Z-04, Z-09 | N2-2 | abgenommen (15e564e, ffafb14) |

Zählstand nach diesem Durchgang (je Ansicht und Kategorie höchstens 2): alle Kategorien der zehn Ansichten mit Befund jetzt 2 – danach nur noch Mängel (Z-07/Z-09) und Vorschläge. `/` erschöpft (Befunde ERZ 1–3 als Vorschlag bzw. M-25); `/kontakt` Bewegung 1 (E4-N2-03), übrige erschöpft (ARB 1–5, 7–10 als Vorschlag bzw. M-20/M-26).

### E3-Tor, Anlauf 1 (E3-SICHT-ERZ/-ARB, Lighthouse e3-tor) → Pakete E4-NACH (Zählung je Tor-Durchgang, E-025)

Befundnummern: ERZ = `berichte/E3-SICHT-ERZ.md`, ARB = `berichte/E3-SICHT-ARB.md`. Wellen: N1 Bausteine und unabhängige Seiten, N2 Seitenpakete nach N1-01/-02. Danach E3-Tor Anlauf 2 (Reinraum, Funktion/Texte/axe, Bilder aller 12, Sichtabnahme, Lighthouse).

| Kennung | Ziel | Rolle | Modell | Stufe | Dateien | Abhängig | Kriterium | Welle | Status |
|---|---|---|---|---|---|---|---|---|---|
| E4-NACH-01 | Planblatt-Einstieg der Erzählansichten (Komposition, Typo, Grafik): Randspalte als Planblatt – Plan oben, Schriftfeld unten nur aus Stammdaten, über die volle Höhe der Textspalte (keine Spalte > 200 px leer, ERZ 1); H1-Stufe nach Länge (≤ 3 Zeilen bei 1440, ERZ 4); Etiketten mobil ruhig (ERZ 4, `/` Typo); eigenes Motiv je Einstieg – /bad eigener Plan, /standorte und [stadt] Einzugsband, /ueber-uns Schriftfeld des Betriebs (ERZ 6, 35); Baustein „Rückfrage“ (Ansprechpartner, Telefon, WhatsApp aus COMPANY_DATA) für Funnel-Abschnitte statt leerer Rasterspalte (ERZ 15, 34) | Orchestrator | ORCHESTRATOR | 3 | src/components/kern/{Einstieg,Planblatt,Rueckfrage,Schriftfeld}.tsx, src/components/start/Einstieg.tsx (Etikett), src/lib/plaene/vorgaben.ts, Randspalte der Seiten bad, leistungen, leistungen/[id], standorte, standorte/[stadt], fliesen, ueber-uns | E3-Tor | Z-04 | N1 | umgesetzt (e734018), Prüfstufe A grün in E4-NACH-16 (b7b187b) |
| E4-NACH-02 | Große Momente sichtbar (Bewegung): `sig-plan` als Flucht mit Reihenversatz und dunkler werdender Fuge (ERZ 14, 18), Ladeflucht des Einstiegsplans (ERZ 21), `szene-ablauf` mit sichtbar wachsendem Plan je Schritt (ERZ 9), Lot mobil ohne Sprung (ERZ 10), Einzugsband zonenweise mit einem roten Lot je Bildschirm (ERZ 25, 26, 31), Verband mit gewähltem Feld in Tinte und Reihenverschiebung ½/⅓ (ERZ 32); Fachzeichen der Verbände (Kreuzfuge, Halb, Drittel, Wild, Diagonal, Fischgrät) für den Konfigurator | Orchestrator | ORCHESTRATOR | 3 | src/app/bewegung.css, src/components/kern/{Verlegeplan,SzeneAblauf,Einzugsband,VerbandUmschalter}.tsx, src/components/start/Einstieg.tsx (Lot mobil), src/components/icons/** (Verbandszeichen), src/lib/motion/** | E3-Tor | Z-04, Z-05 | N1 | umgesetzt (132381a, d5aea3b, 9aade89, c99f6d5, b6ecd0c), Prüfstufe A grün in E4-NACH-16/-18 |
| E4-NACH-03 | Abschluss und Fuß (Farbe, Details): Abschluss hell auf Fliese mit Fugenrahmen, vor dem Fuß keine zweite dunkle Fläche (ERZ 3, 29, ARB 4); „Cookie-Einstellungen“ einmal in der Rechtszeile (ERZ Slop, ARB 8); Bewertungssterne gefüllt statt Umriss (ERZ 8) | Baumeister | ARBEITSMODELL | 2 | src/components/ui/FinalCTA.tsx, src/components/common/Footer.jsx, src/components/reviews/GoogleReviewsBadge.tsx, src/components/kern/Kennwerte.tsx | E3-Tor | Z-04 | N1 | abgenommen (b2d64da) |
| E4-NACH-04 | Qualitätsversprechen als Merkliste im Halbverband (Grafik, Komposition, Details): acht Punkte als Zeilen an der Fuge mit Mono-Nummer, „Garantierter Standard“ einmal im Kopf statt achtmal, Schlusszeile ohne zweiten Kasten und linksbündig (ERZ 5, ARB 28) | Baumeister | ARBEITSMODELL | 2 | src/components/sections/QualityPromise.*, src/components/kern/Merkliste.tsx | E3-Tor | Z-04 | N1 | abgenommen (86daa7a) |
| E4-NACH-05 | Express-Anfrage (Details, Komposition, Grafik): wertende Eckmarken entfallen (ERZ 7, ARB 6, Mikrotext), Auswahl als Feldraster ohne Zwischenraum und ohne Loch (ARB 9), mobil dichte Auswahlzeilen statt hoher Kacheln (ARB 3), Fachzeichen statt generischer Icons (ERZ /leistungen) | Baumeister | ARBEITSMODELL | 2 | src/components/funnels/TezgelAnfrageFunnel/** (ohne logik.ts, stile.ts) | E3-Tor | Z-04 | N1 | abgenommen (65c6a0d) |
| E4-NACH-06 | Tempo-Diagnose: Bündelanalyse (`next experimental-analyze --output`) im Reinraum; je Hauptansicht früh geladene Client-Module nach Größe, Inhalt der gemeinsamen Pakete, Inseln mit `"use client"` | Prüfer | ARBEITSMODELL | 1 | _werkstatt/belege/e4-nach/tempo/** | E3-Tor | Z-08 | N1 | abgenommen (Belege `belege/e4-nach/tempo/BUENDEL.md`) |
| E4-NACH-07 | /bad Seitenkörper (Komposition, Details, Grafik): Projektcheck und Badanfrage mit Rückfrage-Spalte statt leerem Drittel (ERZ 15), Zusammenfassung ohne Überlauf, Rufnummer einzeilig (ERZ 16), Qualitäts-Kategorien als Grundrisse nach Fläche aus dem Bestand (ERZ 17); spätes Zeichnen und nachgeladene Funnels (Tempo) | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/bad/page.jsx | E4-NACH-01, -02 | Z-04, Z-08 | N2 | abgenommen (8f8d334, 5f7c684) |
| E4-NACH-08 | /leistungen und /leistungen/[id] (Typo, Komposition, Details): Merkmallisten in Textschrift (ERZ 19), keine zwei gleich gebauten Abschnitte in Folge, Zitat nicht allein in leerer Hälfte (ERZ 20), eine H3-Stufe (ERZ 22), Linktexte und Waisenzelle (ERZ /leistungen/bad), je Feld eine Aktion; spätes Zeichnen, nachgeladene Express-Anfrage | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/leistungen/page.jsx, src/app/(bestand)/leistungen/[id]/page.jsx | E4-NACH-01 | Z-04, Z-08 | N2 | abgenommen (b1a2338) |
| E4-NACH-09 | /standorte und /standorte/[stadt] (Komposition, Details, Farbe, Grafik): ein Kartenplatz, der zweite als Adresse und Weg (ERZ 23), keine Füllfläche, Ortsleiste ganz, Etikett einzeilig (ERZ 24), Anfahrtskasten dicht, Formular im Raster mit Rückfrage (ERZ 30), Radarkreise → Einzugsband-Ausschnitt auf heller Fläche (ERZ 27, 29), „#1 Fachbetrieb …“ entfällt (Mikrotext, ERZ 28); spätes Zeichnen | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/standorte/page.tsx, src/app/(bestand)/standorte/[stadt]/page.tsx, src/components/locations/{RouteVisualization,LocationContact}.tsx | E4-NACH-01, -02 | Z-04, Z-08 | N2 | abgenommen (9651b1d) |
| E4-NACH-10 | /fliesen (Grafik, Komposition, Details): Zeichnungen in den Textabschnitten (Format- bzw. Verbandsplan, ERZ 33), Konfigurator-Abschnitt mit Rückfrage statt leerem Drittel, mobil lange Felder als Aufklapper (ERZ 34), „Drittelverband“ mobil mit Abstand zur Zellkante; spätes Zeichnen, nachgeladener Konfigurator | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/fliesen/page.jsx | E4-NACH-01, -02 | Z-04, Z-08 | N2 | abgenommen (926e519) |
| E4-NACH-11 | /ueber-uns (Komposition, Details, Bewegung): Werte als Merkliste ohne Plus-Karten (ERZ 35), Leitachse über alle Abschnitte (ERZ 36), Fugenband mobil belegt (ERZ 37); spätes Zeichnen | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/ueber-uns/page.jsx | E4-NACH-01, -02 | Z-04 | N2 | abgenommen (78ad6c5, 1dab47a) |
| E4-NACH-12 | /kontakt (Typo, Komposition, Details, Farbe): Zeiten und Nummern überall in Mono (ARB 1), Terminliste im Zweierraster ohne Waise, Kartenplatz auf Inhaltshöhe (ARB 10), Zonen auch mobil (Mangel, ARB 7); Einzugsband im Kartenplatz von `/` nicht abgeschnitten (Mangel Z-09, ERZ 11) | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/kontakt/page.jsx, src/components/contact/BookingCalendar.tsx, src/components/maps/ServiceMapWrapper.tsx, src/components/legal/MapConsentGate.tsx | E3-Tor | Z-04, Z-09 | N1 | abgenommen (3976226, ec49875) |
| E4-NACH-13 | /fliesen/konfigurator (Typo, Komposition, Farbe, Grafik, Details): H1 und H2 eine Stufe ruhiger (ARB 11), Werkzeug direkt unter dem Kopf mit Ergebnis-Spalte rechts (ARB 12, 13; Lesefolge der Texte bleibt), Ergebnis als Fliese mit Fugenrahmen, ein roter Blickfang (ARB 14), Verbandszeichen in Tabelle und Musterwahl (ARB 17), Verschnitttabelle mobil als Zeilenblöcke, eine Fortschrittsanzeige, Etikett in 08 (ARB 18, 19) | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/fliesen/konfigurator/page.jsx, src/components/funnels/FliesenKonfigurator/** (ohne logik, stile) | E4-NACH-02 (Verbandszeichen) | Z-04 | N2 | abgenommen (82bbf77) |
| E4-NACH-14 | /blog (Typo, Komposition, Farbe/Bild, Grafik, Details): Titel ohne Unterstreichung, Meta einzeilig (ARB 20, 21), Seitenleiste als ein Feld ≤ Bildschirmhöhe (ARB 22, 27), Filter mobil eine querlaufende Zeile mit sichtbar beschrifteter Suche davor (ARB 23, Hinweis E3-BAU-09), Listenbild als gezeichnetes Themenmotiv statt wiederholter Fotos (ARB 24), Fachzeichen je Kategorie (ARB 26), „+ Alle Themen“ mit Abstand (ARB 28) | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/blog/page.jsx, src/components/blog/** (Liste, Filter, Seitenleiste), src/components/kern/RatgeberListe.tsx | E3-Tor | Z-04, Z-08 | N1 | abgenommen (20b080f) |
| E4-NACH-15 | Ratgeber-Artikel (Typo, Komposition, Farbe/Bild, Grafik, Details, Bewegung): Messwerte in Mono, Titel der Verwandten in Anzeige (ARB 29), eine rechte Kante (ARB 30), Tabellen als Region mit Name und Fokus (Mangel Z-07, ARB 31), Verwandte ohne doppeltes Bild (ARB 32), Lesefortschritt ohne Überdeckung des Menüknopfs und an der Kopfkante (Mangel Z-09, ARB 35, 36), Markierung im Inhaltsverzeichnis ohne Verzug (ARB 33), Logo statt Platzhalter-Monogramm (ARB 34) | Baumeister | ARBEITSMODELL | 2 | src/app/(bestand)/blog/[slug]/page.jsx, src/components/blog/{ReadingProgress,TableOfContents,RelatedPosts,BlogAuthorCard}.jsx, Tabellen-Darstellung der Ratgeber | E3-Tor | Z-04, Z-07, Z-09 | N1 | abgenommen (09027df, c0002fa) |
| E4-NACH-16 | Bewegungswerkzeug nachschärfen (Auslöser laden/Wahl/Scroll, Ausschnitt, Scrollbereich über den Durchgang, Bildrate-Kennzahl) und Prüfstufe A der Orchestrator-Pakete E4-NACH-01/-02 mit Fünf-Bild-Folgen | Prüfer | ARBEITSMODELL | 1 | _werkstatt/werkzeuge/bewegung.mjs, _werkstatt/belege/e4-nach/bewegung/** | E4-NACH-01, -02 | Z-05, Z-04 | N2 | abgenommen (b7b187b) |
| E4-NACH-17 | Tempo nach Bündelanalyse (E4-NACH-06): Schnellformular im Abschluss nachgeladen (62 KiB roh aus der Erstladung von 9 Hauptansichten), Kartenbibliothek erst nach Einwilligung laden (@vis.gl 48 KiB), Anfragewege nachgeladen (Seitenpakete); `/blog`: zod (276 KiB roh) kommt über `ContentContext`/`dataService` (lokale Bearbeitung, Datenmodell unantastbar) – Frage an Menschen statt Eingriff | Orchestrator | ORCHESTRATOR | 3 | src/components/ui/FinalCTA.tsx, src/components/maps/ServiceMapWrapper.tsx (nach E4-NACH-12) | E4-NACH-06 | Z-08 | N2 | umgesetzt (1350b02, 8cd4710), Prüfstufe A grün (79742a4) |
| E4-NACH-18 | Bewegungsbelege aussagekräftig: Lade-Momente in Echtzeit (Anker Animationsbeginn, Wiedergabe 0,1×), Ausschnitt nach Lage, Pixelanteil je Bildpaar; Folgen für /, /bad, /leistungen/bad, /standorte, /fliesen | Prüfer | ARBEITSMODELL | 1 | _werkstatt/werkzeuge/bewegung.mjs, _werkstatt/belege/e4-nach/bewegung2/** | E4-NACH-16 | Z-05, Z-04 | N2 | abgenommen (b4d595b) |
Zählstand nach dieser Runde (Pakete je Ansicht und Kategorie, höchstens 2): `/` Typo 2 (-01), Bewegung 2 (-02), übrige 2 – erschöpft. `/kontakt` Komposition 2 (-05), Farbe 2 (-03), Typo 2 (-12), Details 2 (-05, -12), Bewegung 0, Grafik 2. Übrige zehn Ansichten: jede Kategorie mit Befund 1 – der zweite Durchgang folgt nach Anlauf 2.
Als Vorschlag statt Paket (E-025): ein Formular je Erzählansicht; Terminwahl als Schritt der Express-Anfrage; Öffnungszeiten (M-20); „Radius ca. 25 km“, „100% DSGVO-konform“, Leitsatz viermal auf `/ueber-uns` (TEXTVORSCHLAEGE). Bekannte Altfehler im Konfigurator (Fußbodenheizung „Weiß nicht“ → „Nein“, Treppe ohne Fläche) bleiben fixme – die Logik ist gesperrt (MENSCHEN).

### E2-Tor, Anlauf 2 (E2-SICHT-2, Lighthouse e2-tor-3) → Pakete für E3 (höchstens 2 je Ansicht und Kategorie; E-021)

| Kennung | Ziel | Rolle | Modell | Stufe | Dateien | Abhängig | Kriterium | Welle | Status |
|---|---|---|---|---|---|---|---|---|---|
| E3-NACH-01 | `/` Komposition und Grafik: Textspalte des Einstiegs ab lg klebend neben dem Formular (Befund 3, kein Leerfeld > 200 px); Großformat-Kennwert „XXL“ → Maß aus dem Bestand der Seite „120 × 260 cm“ (Befund 1, Mikrotext, TEXTVORSCHLAEGE); zweites Planmotiv im Großformat ersetzt durch Formatvergleich (Befund 3); Mobilplan auf Spaltenbreite an der Textkante (Befund 12); Unterzeile mobil eine Stufe kleiner (Befund 8) | Orchestrator | ORCHESTRATOR | 3 | src/components/start/{Einstieg,Grossformat}.tsx, src/components/kern/Verlegeplan.tsx | E2-Tor | Z-04 | E3-W1 | umgesetzt (3c44b4c), Abnahme am E3-Tor |
| E3-NACH-02 | `/` Bewegung: SIG-1 vollständig (Waage und Lot aus dem Kreuzpunkt, H1-Zeilen mit `sig-flucht` ≤ 14 px, Lot ohne Startverzug) und `leitachse` nach dem Einstieg (Befunde 5, 6, 11) | Orchestrator | ORCHESTRATOR | 3 | src/app/bewegung.css, src/components/start/Einstieg.tsx, src/app/(bestand)/page.tsx, src/lib/motion/** | E3-NACH-01 | Z-04, Z-05 | E3-W1 | umgesetzt (9ccf5d1), Abnahme am E3-Tor |
| E3-NACH-03 | `/` Farbe und Details: Anriss nur auf der aktiven Stimme (Befund 4); Fachthemen mobil kompakt, Raster ≤ 1 Bildschirmhöhe (Befund 9); Platzhalter bei 390 px ohne Schnitt (Befund 13, Mikrotext) | Baumeister | ARBEITSMODELL | 2 | src/components/reviews/{ReviewCarousel,ReviewCard}.tsx, src/components/start/Fachgewerke.tsx, src/components/forms/HeroContactForm.tsx | E3-NACH-01 | Z-04 | E3-W2 | abgenommen (3c8e536) |
| E3-NACH-04 | `/kontakt` Farbe und Typo: Kontaktkarte hell mit Fugen statt Tinte-Fläche, vor dem Fuß höchstens eine dunkle Fläche (Befund 16); Adresse und Samstagszeit in Mono wie die übrigen Werte (Befund 14) | Orchestrator | ORCHESTRATOR | 3 | src/app/(bestand)/kontakt/page.jsx, src/components/contact/DirectContactCard.tsx, src/components/locations/LocationContact.tsx | E2-Tor | Z-04 | E3-W1 | umgesetzt, Abnahme am E3-Tor |
| E3-NACH-05 | `/kontakt` Grafik und Details: Express-Auswahl mit Fachzeichen der Familie statt generischer Icons, Eckmarken als ruhiges Mono-Etikett (Wortlaut bleibt; Streichung „Sehr beliebt“ als Vorschlag) (Befunde 18, 21); Ortsnamen ungekürzt (19); Terminliste mit Kante an einer Fuge, kein Restknopf (20, 22); Filterzeile einzeilig, helle Naht geschlossen (22) | Baumeister | ARBEITSMODELL | 2 | src/components/funnels/TezgelAnfrageFunnel/**, src/components/contact/BookingCalendar.tsx, src/components/maps/ServiceMapWrapper.tsx, src/components/kern/Einzugsband.tsx | E3-NACH-04 | Z-04 | E3-W2 | abgenommen (5e506bc) |
| E3-NACH-06 | Rahmen ab lg: Widerruf-Schild und WhatsApp aus dem Seitenrand in Kopf bzw. Fuß (Befund 7); getestete Namen und Ereignisse bleiben (`#whatsapp-floating-btn`, `openCookieSettings`) | Orchestrator | ORCHESTRATOR | 3 | src/components/common/{Header.jsx,Footer.jsx,CookieConsent.tsx,FloatingWhatsAppWidget.tsx} | E3-NACH-01 | Z-04, Z-07 | E3-W2 | umgesetzt, Abnahme am E3-Tor |
| E3-NACH-07 | Tempo `/` mobil: TBT 779 ms gegen E0 415 ms (Spanne 373–593) – Rückschritt über der Spanne (Z-08); Hydrierung der Inseln unterhalb des Einstiegs in eigene Suspense-Grenzen und spätere Aufgaben, Ursachen per Trace belegen; Ziel TBT ≤ E0 + Spanne, LCP-Weg (Renderverzögerung) prüfen | Orchestrator | ORCHESTRATOR | 3 | src/app/(bestand)/page.tsx, src/components/start/**, src/lib/motion/** | E3-NACH-02 | Z-08 | E3-W1 | umgesetzt, Abnahme am E3-Tor |
| E3-PRUEF-W1 | Werkzeuge: `bewegung.mjs` Auslöser `sig-ablauf` → `szene-ablauf`; Ersatzpfad-Lauf mit normaler Bewegung (nicht reduziert), sonst ist er mit dem Bildsatz identisch; Sichtabnahmen bekommen Abschnittsbilder (`abschnitte.mjs`) für die ganze Seitenhöhe; `server.sh start` darf die Shell nicht blockieren | Prüfer | ARBEITSMODELL | 1 | _werkstatt/werkzeuge/{bewegung.mjs,bildsatz.mjs,server.sh} | – | Z-05, Z-09 | E3-W1 | abgenommen (c00e478) |

Hinweise aus E3-Rückgaben für spätere Pakete: Rahmen des BadanfrageFunnel nimmt die volle Containerbreite ein – auf `/bad/badanfrage` Lesebreite für den Funnel im Seitenkörper setzen (E4 Bad-Familie, Rückgabe E3-BAU-18); Überschriftenfolge h2 → h4 „Treppe“ im Konfigurator Schritt 3 (Bestand, E3-BAU-15 bzw. Seitenkörper); Pflichtfeld-Zusatz für Screenreader nach K-009 einheitlich in allen Formularen (Mikrotext, E3-BAU-17). `/blog`: Suchfelder brauchen sichtbare Beschriftung (Mikrotext „Ratgeber durchsuchen“/„Artikel suchen“), Suche in der Lesefolge vor die Liste, Kategorien mobil als eine Zeile statt fünf (Rückgabe E3-BAU-09); Ratgeberbilder mit Generatorzeichen in voller Größe prüfen (M-19/M-22).

Nicht als Paket (Funktion oder Bestand, Vorschlag in BERICHT/MENSCHEN): Einstiegsformular und Projektanfrage auf `/` zu einem Weg vereinen (Befund 2); Terminwahl als Schritt der Express-Anfrage, Rückruf nur als Telefonzeile auf `/kontakt` (Befund 15); Google-„G“ einfarbig (Befund 10, Markenregeln von Google). Bewegungsbelege für `/kontakt` (Befund 17) liefert die nächste Prüfstufe B.

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
  - Gemeinsame Dateien schreibe nur ich: `globals.css`, `layout.tsx`, `next.config.ts`, `package.json`, Tokens, KERN. **Testhoheit:** bestehende Testdateien ändere nur ich (mit Vermerk, dass der Test gleich streng bleibt); neue Testdateien schreibt ein Prüfer, wenn sie ausdrücklich in seinen Schreibrechten stehen (Auftrag 5); die Aufnahme in `npm test` bzw. die Playwright-Liste mache ich.
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
