# P2-GEG-01 · Rückgabe · Gegenprüfung Gesamtplan P3–P7 (L0 Runde 1) + Vorab-Scheitern

Kennung P2-GEG-01 · Rolle Gegenprüfer · Stufe 3 · Opus (frisch) · Kern v1 · Schreibrechte: nur diese Datei · Umfang: PLAN.md „Gesamtplan P3–P7“ gegen AUFTRAG, E-000–E-013, KERN v1, ABNAHME, FUNKTIONSLISTE, MESSUNGEN, NEBELKARTE, Quellcode (nur gelesen). Kein Build, kein Server, kein Netz.

## Urteil
**Mit Auflagen tragfähig – L0 Runde 1 nicht bestanden.** Richtung, Bauweise (neues System in `src/components/kern/`, `erscheinung="kern"`, Cluster-Wellen) und Push-Tor sind solide. Das Plantor (AUFTRAG.md:270) ist formal verfehlt: Z-04 hat kein Paket, Z-09/Z-10/Z-11-Zusätze/INP haben kein Werkzeug, P5–P7 sind nur Summen, es gibt keine Zuordnung Paket → Kriterium. Inhaltlich gefährden sechs Befunde „hoch“ den Live-Betrieb oder die Belegbarkeit. Auflagen 1–6 vor Fortsetzung von P3 (P3-01 ist bereits begonnen, Befund 19).

## A) Gegenprüfung

### A1 Abdeckung Z-03 bis Z-14
| Kriterium | liefert laut Plan | Lücke |
|---|---|---|
| Z-03 Funktion | P3-10, Formulare in P5 W1/W4/W9, Tests „gegen beide“ (PLAN.md:322) | Mutationsprobe nur als Satz (PLAN.md:247), kein Paket; ≥ 10 Eingaben gegen Altverhalten nicht je Rechner benannt; keine Regel für Teständerungen (Befund 4) |
| Z-04 Besucheraufgaben | – | **kein Paket**, keine Basis-Schrittzahl am Ausgangsstand (Befund 6) |
| Z-05 Bestand | Push-Tor (Reinraum), V-02 (W9), V-06 (P4-04) | Live-Prüfung auf Konsole/Hydration fehlt im Skript (Befund 15) |
| Z-06 Suche | P4-14, Texte/SEO je Welle, P4-10, P6 Teilen-Bilder | 50 von 170 HTML-Seiten außerhalb der Invarianten (Befund 3) |
| Z-07 Slop | P3-02, P4-01, P4-13, Slop-Zählung je Welle, P6 | weiche Basis nur 7 Seiten, noch ohne Ergebnis; kein S-13-Vorschlagspaket (Befund 6) |
| Z-08 Jury | P3-12, P6-Tor | Blindvergleich und L8-Runden ohne Paket/Kapazität; Kategorie Inhalt gefährdet (Befund 18) |
| Z-09 Bewegung | P3-03, P3-06, P3-08, P4-11, P4-13 | kein Messwerkzeug; P3-12 prüft Bewegung nicht (Befund 6) |
| Z-10 SVG | P3-04, P3-05, P4-12 | kein Prüfskript, keine zwei SVGO-Konfigurationen; ≈ 14 Verlegepläne ohne Paket (Befund 6, 17) |
| Z-11 Barrierefreiheit | P4-09, V-03, axe je Welle | Tastatur, Reflow 320, Zoom, Textabstände, forced-colors, ohne JS ohne Werkzeug; P4-Tor nur Hauptseiten (Befund 2, 6) |
| Z-12 Leistung | Lighthouse an Toren, W6 Blog | kein LCP-Paket, INP ungemessen, Banner ist LCP-Element (Befund 6, 7) |
| Z-13 Darstellung | Fotos + Überlauf je Welle | bei globalen Wellen alle 120 × 4 fordern (Befund 2) |
| Z-14 Übergabe | P7 | „Zusammenführen“ als entfällt (main) begründen |

**Pakete ohne zwingendes Kriterium:** P4-11 View Transitions (Voll verlangt sie nicht, experimentell, global – Befund 21); P6 „Favicon im Formsystem“ (berührt UNANTASTBAR – Befund 13); P7 README/DESIGN_SYSTEM (nur mittelbar Z-14, unkritisch).

### A2 Befunde

**1 [hoch] P3-Tor unter „streng auf `/`, Pixeldiff 0 andernorts“ unerreichbar; `/` geht halbfertig live.**
Beleg: Schale global in `src/app/layout.tsx:121–127` (HeaderWrapper, Footer, MobileBottomBar, ClientWidgets); `src/components/layout/ClientWidgets.tsx:6–8, 33–38` lädt WaterCursor, WhatsApp-Widget (Badge „1“) und Banner überall; Kopf, Fuß, Leiste nutzen lucide (`Header.jsx:13`, `Footer.jsx:17`, `MobileBottomBar.tsx:6`). PLAN.md:212 (Pixeldiff 0), :218/:340 und AUFTRAG.md:232 (alle seitenbezogenen Kriterien auf `/`). Folge auf `/`: S-04 hart (zwei Icon-Familien → Z-07, Z-10), S-09 Nachlaufcursor, manipulatives Badge, oranger Fokus (`globals.css:78–81`), vier vorgeladene Familien (Inter, Jakarta global + Archivo, Plex) statt ≤ 2 (K-004, KERN.md:45). Nach jeder P3-Welle ist `/` ein Mischstand (neuer Einstieg, alter Rest).
Vorschlag: Schale-Variante für `/` schon in P3 (Schalter je Route; `usePathname` ist in `HeaderWrapper.tsx:9` vorhanden), neue `/` als ruhende Komposition, die erst das Tor-Release einschaltet (C-2, C-3); Tor ausdrücklich „`/` inkl. Schale“.

**2 [hoch] P4 „globaler Umstieg“ ohne Abbildungsregel und mit geschwächtem Tor.**
Beleg: `src/styles/tokens.css:20–26` (slate → Grau), `:64–74` (neutral → Zink), `:187–188` (`--color-red-500/600` = Orange), ungeschichtet gegen Tailwind. Nutzung: `slate-*` 1.978× in 80 Dateien, `orange-*` 1.702× in 122, `neutral-*` 920× in 65. P4-01 sagt nur „Umdeutungen auflösen“ (PLAN.md:343). Global zusätzlich `hyphens: none` (`globals.css:54`) gegen K-005 `hyphens: auto`, Überschriftenschrift (`globals.css:67–71`), Archivo in 74 % Breite. Tor: nur Hauptseiten, Pixelvergleich „stattdessen Invarianten und Jury-Stichprobe“ (PLAN.md:100, :231) – AUFTRAG.md:236 verlangt Pixelvergleich ohne unerklärte Abweichung. 113 Nicht-Hauptseiten gingen ungeprüft live; P0: 1.614 Kontrastknoten auf 89 Seiten.
Vorschlag: P4-00 Brückentabelle mit Denkprotokoll (jede Alt-Skala → KERN-Stufe; z. B. Orange-Flächen → Tinte, Orange-50/100 → Kalk/Fliese, Text-Orange → Laser-tief, Verlaufstext → Tinte). Tor jeder globalen Welle: axe, Überlauf (320–1920) und Pixel über 120 Seiten × 4 Ansichten, Abweichung nur in vorab erklärten Bereichen; Sperrklinke je Seite (axe-Knoten, Überlauf, Konsole ≤ Vorrelease).

**3 [hoch] Text-Invarianten-Werkzeug passt nicht zum Umbau – Fehlalarme in Tausenden, echte Verluste teils unsichtbar.**
Beleg: `werkzeuge/texte.mjs:33` liest `innerText` zeilenweise, also mit CSS-Versalien: Quelle „Direktanfrage an Deniz Tezgel“ (`src/components/forms/HeroContactForm.tsx:176`) steht als „DIREKTANFRAGE AN DENIZ TEZGEL“ in `belege/p0-ausgangsstand/texte/start.json` (main_zeilen[14]); Ausgangsstand: 1.070 Versalzeilen auf 99 Seiten. K-005 (Plex ohne Versalien, KERN.md:57) und `&shy;` (KERN.md:71) erzeugen damit massenhaft „entfernt“ → die Freigabeliste wird zum Schlupfloch. Unerfasst: Mega-Menü, Mobilmenü, Banner (Einwilligung fest „abgelehnt“, `texte.mjs:24`), Widget-Tooltip, versteckte Akkordeons; 50 der 170 HTML-Seiten (`[id]/[stadt]` 52, Satz 10); „hinzu“ ist nie rot (`texte-vergleich.mjs:47`) → eine doppelte H1 durch Textzerlegung (AUFTRAG.md:146, SIG-1 KERN.md:117) bliebe grün.
Vorschlag: texte v2 vor P3-06 (C-1): Auszug der Textknoten aus dem Build-HTML (alle 172 Dateien, ohne Layoutabhängigkeit), Normalisierung Leerraum und U+00AD; AST-Literalvergleich je geänderter Datei als Paket-Selbstprüfung für Haiku (Sekunden, ohne Build); Browserlauf in den Zuständen Banner-Erstbesuch + Einstellungen, Menüs offen; „hinzu“ in Überschriften rot. SIG-1 bewegt nur die zwei vorhandenen H1-Kinder (`src/app/page.tsx:196–201`), keine Zerlegung.

**4 [hoch] Funktionstests hängen an Markup, das der Plan ändert – Gefahr „Tests lockern“ (G7, Z-03).**
Beleg: `#whatsapp-floating-btn` (`tests/funktion-kontaktwege.spec.mjs:59, 71`; Widget wird nach E-012 umgebaut), `xpath=ancestor::…` (`funktion-preisrechner.spec.mjs:10`), `xpath=../../following-sibling::div[1]` (`funktion-navigation.spec.mjs:226`), Erfolgstexte „Vielen Dank, Prüf Person!“ / „… erfolgreich übermittelt“ (`funktion-badanfrage.spec.mjs:123–124`, `funktion-konfigurator.spec.mjs:154–155`) gegen neuen Erfolg „Notiert. …“ (KERN.md:150, :159). Der Plan regelt nicht, wer Tests ändert und was erlaubt ist.
Vorschlag: Test-Sperrklinke im Push-Tor (je Spec Fälle und `expect` ≥ Vorstand, `fixme`/`skip` ≤ Vorstand, heute 11); Formular-IDs als Alias erhalten (AUFTRAG 8); Teständerungen nur in Testschreiber-Paketen mit Opus-Gegenprüfung; eine gemeinsame Mikrotext-Freigabeliste speist Text-Invarianten und Tests; Mutationsprobe als Paket je umgestelltem Formular.

**5 [hoch] Wiederaufnahme-Dateien veraltet und widersprüchlich.**
Beleg: `PRUEFPUNKT.md:2–6` steht auf P0/W0 („wartet auf Gegenprüfung P0-GEG-01“, Commit e79480a), `STATUS.md:1` „Phase P0“; HEAD ist 2362a5a (P2-KERN-01), P3-01 läuft. PLAN.md:18 und :102–103 beschreiben den Vorab-Push auf `claude/kind-franklin-5y6s1d`, den E-005 (ENTSCHEIDUNGEN.md:40–44) verworfen hat, weil er die Produktion blockierte; ebenso E-003 (:35), NEBELKARTE.md:14, :23 und PLAN.md:282. Der CLAUDE.md-Block lässt nach jeder Verdichtung genau diese Dateien lesen.
Vorschlag: sofort L5; Push-Tor in PLAN, NEBELKARTE und Verweis E-003 auf E-005 angleichen; PRUEFPUNKT um „laufende Pakete: Kennung · Agent · Schreibrechte · Start“ und „offene Orchestrator-Arbeit: berührte Dateien“ ergänzen.

**6 [hoch] Kriterien ohne Paket, Werkzeug oder Basiswert – Plantor nicht erfüllt.**
Beleg: Z-04 ohne Paket im Gesamtplan (PLAN.md:326–352) und ohne Basis-Schrittzahl (MESSUNGEN.md), obwohl „Schrittzahl ≤ Ausgangsstand“ (ABNAHME.md:11). Z-09: kein Werkzeug für getAnimations, Framezeiten, LoAF, Register-Abgleich (versprochen PLAN.md:159; `werkzeuge/` hat keins), P3-12 prüft Bewegung nicht (PLAN.md:340). Z-10: kein SVG-Prüfskript, keine SVGO-Konfigurationen. Z-11: Tastatur, Reflow, Zoom, Textabstände, forced-colors, ohne JS nicht in `axe.mjs`/`fotos.mjs`. Z-12: keine INP-Zeitspannen in `lighthouse.mjs`, keine INP-Basis. Z-07: weiche Basis nur 7 Seiten (`belege/p0-slop-args.json`), noch ohne Ergebnis (MESSUNGEN.md:62). Keine Spalte Paket → Kriterium; P5–P7 nur Summen („≈ 70“).
Vorschlag: Welle P3-00 (C-1); Pakettabellen mit Spalte „Kriterium“ für alle Pakete; L0 Runde 2.

**7 [mittel] Z-12: LCP auf `/blog` und `/kontakt` ist der Einwilligungstext.**
Beleg: `cache/lighthouse/p0-ausgangsstand/kontakt-mobil-0.report.json`, `blog-mobil-0.report.json`: LCP-Element `p#cookie-consent-desc` (Banner clientseitig, `ClientWidgets.tsx:8, 33`). LCP mobil aller Hauptseiten 3,4–6,6 s gegen 2,5 s (MESSUNGEN.md:17); nur W6 zielt auf LCP (PLAN.md:346).
Vorschlag: Lichtung „LCP-Element und Ursache je Hauptseite“ in P3-00; P4-07 mit Vorgabe „Banner ist nie LCP-Element“ (Text kleiner als größtes Inhaltselement oder serverseitig vorgerendert); Tor misst das LCP-Element.

**8 [mittel] Dateihoheit und Reihenfolge in P3/P4.**
Beleg: P3-06 bis P3-11 bauen alle in `src/app/page.tsx` (710 Zeilen, Abschnitte inline) – gleichzeitige Pakete auf einer Datei verbietet AUFTRAG.md:108. P4-06, -07, -13 berühren alle `ClientWidgets.tsx` und `src/lib/physics/widgetPhysicsCoordinator.ts`. P4 ohne Abhängigkeiten (PLAN.md:343); Kopf, Fuß, Banner brauchen P4-08 und P4-12. Der kritische Pfad (PLAN.md:357) übergeht die serielle Orchestrator-Spur (P3-01, -02, -03, -05, -06, -08, -12).
Vorschlag: Zerlegung `page.tsx` in Abschnittsdateien vorab (build-vergleich: HTML identisch); P4-Reihenfolge 01 → 02 → 08/12 → 03/04/05 → 06 → 07 → 09/14 → 13; kritischen Pfad über die Orchestrator-Spur rechnen.

**9 [mittel] Basisbausteine kommen zu spät.**
Beleg: P3-10 baut Formulare mit allen Zuständen (PLAN.md:338), Knopf/Feld/Checkbox/Akkordeon entstehen erst in P4-08 (:343) → Doppelbau oder Kopie (AUFTRAG 8 „Varianten statt Kopien“).
Vorschlag: Kernsatz (Knopf, Textlink, Feld, Auswahl, Checkbox, Akkordeon, Hinweis) als P3-04b; P4-08 ergänzt Tabelle/Feldraster und schaltet global.

**10 [mittel] MotionProvider-Entfernung in P4 nimmt Restnutzern die reduzierte Bewegung.**
Beleg: `src/components/providers/MotionProvider.tsx:48` `MotionConfig reducedMotion="user"`; framer-motion bleibt bis P5 in `CompanyHistory.jsx`, `HeartbeatCTA.tsx`, `beratung/page.jsx`, `ServiceMapWrapper.tsx` (auf `/`, `page.tsx:39`), `ContactMapWrapper.tsx` (E-009, ENTSCHEIDUNGEN.md:85); P4-13 entfernt den Provider (PLAN.md:343).
Vorschlag: P4-13 teilen – WaterCursor in P4, MotionProvider erst mit der letzten framer-motion-Fundstelle (P5-Ende) oder bis dahin lokale `MotionConfig` je Restnutzer.

**11 [mittel] Kapazität rechnerisch richtig, Eingaben zu optimistisch.**
Beleg: PLAN.md:356: 113 ÷ (5 × 4) × 1,2 = 6,78 ✔. Aber „4 Wellen/Tag“ ist unbegründet; die Formel unterstellt volle Wellen, obwohl die Hälfte von P3 und ≥ 6 P4-Pakete seriell beim Orchestrator liegen; Welle = gleichzeitige Pakete (AUFTRAG.md:38), also sind P5-„Wellen“ mit 4–10 Paketen (PLAN.md:345) ein bis zwei Wellen; Tore, Messfenster ohne Unteragenten (PLAN.md:88), L8 und Reparaturen sind nicht enthalten; der Auftraggeber kennt „150–170 Pakete, 4–6 Tage“ (PLAN.md:209). Untergrenze über Wellen: P3 ≈ 5 + P4 ≈ 5 + P5 ≈ 14 + P6 ≈ 3 + P7 ≈ 2 = 29 ÷ 4 × 1,2 ≈ 8,7 Tage.
Vorschlag: beide Rechnungen ausweisen, Planwert = Maximum (≈ 9 Tage), Puffer in STATUS, Abweichung im Morgenbericht.

**12 [mittel] KERN-Widersprüche, die der Plan übernimmt.**
Beleg: `/` bekommt SIG-1 (P3-06) und SIG-2 (P3-08), SIG-3 „vorbereitet“ (P3-07) – K-011 „ein Signaturmoment höchstens je Seite“ (KERN.md:153), genehmigter Plan „Ein Signaturmoment“ (PLAN.md:215). SIG-3 auf „Bad- und Fliesen-Unterseiten“ (KERN.md:119) schließt Rechner ein (`/bad/projekt-check`, `/fliesen/konfigurator`), die K-002 als Arbeitsseiten führt (KERN.md:30). `/foerderung` ist weder eingeordnet noch einer P5-Welle zugewiesen (PLAN.md:346). K-008 (KERN.md:105) fordert 2:1/1:1 und verbietet Beschnitt.
Vorschlag: KERN v1.1 – Signaturmomente je Seite festlegen (`/` = SIG-1, Ablauf als `auftritt` oder begründete Ausnahme); Seitenart je URL in GRUNDMENGE.json; `/foerderung` → W5 oder W9; Bildregel „Rahmen 2:1/1:1, Bild `contain` auf Kalk bei abweichendem Format“.

**13 [mittel] UNANTASTBAR-Grauzonen ohne Regel.**
Beleg: Favicon „im Formsystem“ (PLAN.md:251, :349) – `public/icon.png` ist das Maskottchen aus dem Logo (`public/images/logo/tezgel-logo.png`), Lizenz offen (MENSCHEN M-09), „Nicht löschen … icon.png“ (PLAN.md:69). Mikrotext uneinheitlich: K-012 (KERN.md:159) nennt Knöpfe/Labels/Zustände/Alt-Texte, TEXTVORSCHLAEGE.md:3 auch Badges; 462 Eyebrow-Badges (MESSUNGEN.md:58): Streichen = Textverlust, Behalten = S-09. Randnotiz je Kundenstimme (KERN.md:16, :151) ist neuer Text.
Vorschlag: Favicon nur technisch verbessern oder als Vorschlag in MENSCHEN; KERN v1.1 mit abschließenden Mikrotext-Klassen und Regel „Badges werden versetzt (Schriftfeld, Mono-Etikett), Wortlaut bleibt; Streichung nur als Textvorschlag“; Randnotiz nur als Verweis-Mikrotext („→ Ablauf 02“) oder wörtlich vorhandener Text.

**14 [mittel] Messrauschen liegt an der Schwelle.**
Beleg: `belege/p0-ausgangsstand/lighthouse.json`: `/` mobil 84–90 Punkte, LCP 3,32–4,15 s; `/standorte` 64–88, CLS 0/0,516 (MESSUNGEN.md:92); Schwelle 3 Punkte/10 % (ABNAHME.md:19). Jury-Lockvogel streut 3,9–4,8 (ENTSCHEIDUNGEN.md:62); Ziel 8,0 ohne Marge.
Vorschlag: Lighthouse verschränkt (Ausgangsbuild und Kandidat abwechselnd im selben Fenster), bei 2–5 Punkten Abstand zehn Läufe; Lighthouse nur an Toren und in Wellen mit Hauptseiten, sonst JS-Bytes je Route aus dem Build als harte Schwelle; CLS-Ursache `/standorte` als Lichtung; Jury-Zielwert intern 8,4.

**15 [mittel] Live-Rauchtest schwächer als beschrieben; Safari ungeprüft.**
Beleg: PLAN.md:107 verspricht Prüfung auf Konsolen-, CSP- und Hydrationsfehler; `werkzeuge/live-rauchtest.sh` prüft nur Status, x-build und Sitemap-Zahl. WebKit/Firefox fehlen (PLAN.md:76, M-06); Startklasse, IO und ViewTransition können nur in Safari brechen.
Vorschlag: lesender Live-Browserlauf (GET, Anfragesperre, ≤ 1/s; `assertLocal`, `lib.mjs:13`, um eine ausdrückliche Live-Leseerlaubnis erweitern) für die Hauptseiten; Kompatibilitäts-Lint (z. B. `doiuse` gegen „Safari ≥ 16“) in werkzeuge; M-06 nach dem P3-Release mit 10-Punkte-Prüfliste.

**16 [mittel] Mutationsprobe und Commit-Routine können Fremdes live bringen.**
Beleg: Mutationsprobe im gemeinsamen Arbeitsbaum (PLAN.md:247); `werkzeuge/commit.sh:8` `git add -A -- "$@"` nimmt auch Verzeichnisse, also Halbarbeit gleichzeitiger Pakete in `src/components/kern/`; die Briefing-Verbote (PLAN.md:86) nennen weder git-Schreibbefehle (checkout, restore, stash) noch npm install.
Vorschlag: Mutationen nur in der Reinraum-Kopie (`reinraum.sh` arbeitet bereits außerhalb des Baums); `commit.sh` nur Dateipfade und Abgleich mit den Schreibrechten der Paket-Kopfzeile; `git status --porcelain` zu Wellenbeginn und -ende vergleichen, Datei ohne Paket = harte Ablehnung; Verbot von git-Schreibbefehlen und npm install/uninstall; Tar-Schnappschuss `src`/`public` vor jeder Welle in `cache/`.

**17 [mittel] Gestaltungspakete der Stufe 3 fehlen oder liegen bei Haiku.**
Beleg: ≈ 14 Verlegepläne und ≈ 30 Icons (PLAN.md:314–315), Pakete nur für den Start (P3-05) und „Icon-Sprite vollständig“ (P4-12) ohne Ausführende; neue Illustrationen sind Stufe 3 (AUFTRAG.md:84). P3-11 (übrige Abschnitte von `/`) an Haiku, obwohl Stufe 2 ein Muster der Referenzseite voraussetzt (AUFTRAG.md:76), das es in P3 noch nicht gibt.
Vorschlag: P4-16 „Verlegepläne je Leistung“ (Opus, 3 Pakete à ≈ 5 Pläne, vor W1/W2); P4-12 an Opus; P3-11 an Opus.

**18 [mittel] Z-08: Kategorie Inhalt ≥ 7,5 strukturell gefährdet.**
Beleg: P0-Inhalt 4,5–5,5 (MESSUNGEN.md:70–76), Kritik Stock-/KI-Bildanmutung; neue Fotos fehlen (M-02), Texte unantastbar; Nebelkarte führt nur „Bildmaterial trägt die Marke nicht“.
Vorschlag: P3-12-Jury als Frühwarnung mit eigener Auswertung „Inhalt“; Nebelkarte-Zeile „Z-08 Inhalt“ mit Lichtung; M-02 mit konkreter Fotoliste priorisieren; L7-Pfad früh vorbereiten (Z-08 darf AUSNAHME werden).

**19 [gering] P3-01 vor bestandenem L0 begonnen; Abweichungen.**
Beleg: `src/app/fonts/` ungetrackt (git status); `src/app/fonts/LIZENZEN.md`: nur Latin gegen K-005 (KERN.md:55) und P3-01 „latin + latin-ext“ (PLAN.md:329); `src/app/fonts/kern.ts:21` `adjustFontFallback: false` gegen AUFTRAG.md:130 (size-adjust und Overrides); `ibm-plex-mono-latin-500.woff2` ungenutzt.
Vorschlag: bis L0-Ende ruhen lassen; KERN an „Latin genügt, geprüft“ angleichen oder latin-ext ergänzen; Plex-Ersatz mit Metrik-Overrides; 500 nutzen oder entfernen.

**20 [gering] Platzhalter und Zählfehler.**
Beleg: E-014 zitiert (PLAN.md:338), fehlt in ENTSCHEIDUNGEN.md; „E-xxx P3“ (KERN.md:150), „M-xx“ (ENTSCHEIDUNGEN.md:71); „P4 (14 Pakete)“ mit 15 Einträgen (PLAN.md:342–343); AUFTRAG.md:106.
Vorschlag: E-014 schreiben, inklusive Folge für Z-04 (abgewählte Vorab-Checkbox = ein Klick mehr, Rang-1-Abweichung begründet); Platzhalter auflösen.

**21 [gering] P4-11 View Transitions ohne Kriterium, experimentell, global.**
Beleg: PLAN.md:227, :343; KERN.md:112; Schalter in `next.config.ts` (gemeinsame Datei).
Vorschlag: nach P6 oder auf Hauptseiten-Wechsel begrenzen, mit Tests für Zurück, Anker, Fokus.

**22 [gering] 410 über `proxy.ts` ohne Matcher-Vorgabe.**
Beleg: PLAN.md:230; ein Proxy ohne enges `matcher` läuft vor jeder Anfrage (TTFB live).
Vorschlag: `matcher` nur auf die Batherm-Präfixe; Test, dass Hauptseiten den Proxy nicht durchlaufen.

**23 [gering] Commit vor Prüfung.**
Beleg: PLAN.md:91–93 gegen AUFTRAG.md:272 („Commit je bestandenem Paket“).
Vorschlag: Regel „gescheitertes Paket wird vor dem Push lokal revertiert; gepusht wird nur, wenn jeder Commit seit dem letzten Push das Tor bestanden hat“.

**24 [gering] `pixel.mjs`: zwei Ansichten, keine Masken.**
Beleg: `werkzeuge/pixel.mjs:19` (`m375,d1440`); Fotoprotokoll verspricht Masken (PLAN.md:163); „Pixeldiff 0“ setzt A/A-Rauschen 0 voraus.
Vorschlag: vier Ansichten, Masken für Öffnungsstatus/Kalender/Karussell, A/A-Lauf als Pflichtteil.

**25 [gering] G5-Härtung für Tests gegen die echte Route.**
Beleg: zweite Formular-Testschicht ruft `/api/anfrage` (PLAN.md:160–162); `src/lib/email/mailer.ts:106` versendet, sobald `RESEND_API_KEY` gesetzt ist. Heute keine `.env` im Baum.
Vorschlag: `server.sh` bricht ab, wenn `RESEND_API_KEY` gesetzt ist oder eine `.env*` außer `.env.example` vorliegt.

Regelprüfung ohne weiteren Befund: G4 (keine Zugangsdaten in Belegen, `intern/` ausgeschlossen), G7 (K-004 verbietet Testerkennung; Schalter nach C-2 sind für alle Besucher gleich), G9 (Formularlogik bleibt; E-014 ist Rang 1), Rechtstexte (W10 nur Darstellung, Banner wörtlich – aber Invarianten erfassen den Banner noch nicht, Befund 3).

## B) Vorab-Scheitern – sieben Tage später
1. **Flickenteppich live.** Nach P3 steht die neue `/` unter altem Kopf mit lucide, Badge „1“ und WaterCursor; nach P4 tragen 119 Seiten neue Schale und Schrift über orangen Körpern, tagelang; das P3-Tor scheitert dreimal an S-04/Z-12 (L3), der Lauf stockt. *Frühwarnung:* P3-12 rot bei Z-07/Z-10. *Gegenmaßnahme:* Schalter-Release (C-2), Schale-Variante für `/` in P3 (C-3), Brückentabelle in P4 (C-4).
2. **Globaler Umstieg beschädigt ungeprüfte Seiten.** Die Auflösung von `tokens.css` färbt 4.600 Klassenstellen um, Archivo und `hyphens` brechen Überschriften auf Nebenseiten, das Entfernen des MotionProviders schaltet reduzierte Bewegung auf Restseiten ab; das Tor sah nur sieben Hauptseiten. *Frühwarnung:* axe-Knoten auf Nicht-Hauptseiten steigen. *Gegenmaßnahme:* Volltor 120 × 4 mit Sperrklinke, P4 als ein geschaltetes Release, P4-13 teilen (C-4, C-5).
3. **Texte still verändert oder Tests aufgeweicht.** Haiku schreibt 3–5 Seiten à 300–480 Zeilen um; über 1.000 Versal-Fehlalarme machen die Freigabeliste breit, echte Verluste rutschen durch; Erfolgstexte und XPath-Selektoren brechen, Tests werden „repariert“. *Frühwarnung:* Freigabeliste wächst schneller als Seiten fertig werden; Zahl der `expect` sinkt. *Gegenmaßnahme:* texte v2 mit AST-Selbstprüfung, Test-Sperrklinke, Paketgröße eine Seite oder eine Vorlage (C-1, C-7, C-10).
4. **Wiederaufnahme am falschen Punkt, fremde Halbarbeit live.** Nach einer Verdichtung liest der Orchestrator PRUEFPUNKT (P0) und das alte Push-Tor, pusht vorab auf den Sitzungs-Branch – die Produktion bleibt stehen (E-005) – oder vergibt Dateien laufender Agenten doppelt; `commit.sh` mit Verzeichnis nimmt halbfertige Bausteine mit. *Frühwarnung:* x-build live ≠ Commit; unerklärte Dateien in `git status`. *Gegenmaßnahme:* L5 sofort, PRUEFPUNKT mit laufenden Paketen, Schreibrechte-Wächter, git/npm-Verbot, Schnappschuss (C-8, C-9).
5. **Kriterien nicht belegbar, Zeit und Kontingent erschöpft.** Werkzeuge für Bewegung, SVG, a11y-Zusätze und INP fehlen, Basiswerte für Z-04/Z-07/INP fehlen; Lighthouse-Rauschen (84–90) löst Fehlalarme und Rückfälle aus; Opus-Kontingent geht an Slop-Gegenprüfer und Jury je Welle; nach 7 Tagen ist P5 halb fertig. *Frühwarnung:* zwei Wellen ohne neues Häkchen (L7). *Gegenmaßnahme:* Welle P3-00, verschränkte Messung, Lighthouse/Jury nur an Toren, Kapazität ≈ 9 Tage mit Puffer (C-1, C-11, C-12).

## C) Änderungsvorschläge am Plan
- **C-1 Paket-Welle P3-00 vor P3-06 (neu).** a) `bewegung.mjs` (Bildfolgen über getAnimations, Framezeiten 4× CPU, LoAF, Register-Abgleich); b) `svg.mjs` + zwei SVGO-Konfigurationen; c) `a11y-zusatz.mjs` (Tastatur, Reflow 320, Zoom 200 %, Textabstände, forced-colors, ohne JS); d) INP-Zeitspannen in `lighthouse.mjs`; e) texte v2 (Build-HTML + AST, Zustände); f) `pixel.mjs` mit Masken und vier Ansichten; g) Basis am Ausgangsbuild 707a93d: Probeläufer-Schrittzahlen (5 Aufgaben × mobil/Desktop × Touch/Maus/Tastatur), Fünf-Sekunden-Probe, Slop-Jäger über die Grundmenge, INP, LCP-Element und CLS-Ursache; h) Zerlegung `page.tsx` (Orchestrator, HTML identisch). *Grund:* Befunde 3, 6, 7, 8.
- **C-2 Schalter-Release.** Fester Schalter im Code (z. B. `src/config/kern.ts`: Start, Schale, Global), für alle Besucher gleich, ohne Umgebungs- oder Testerkennung (G7). Wellen pushen ruhenden Code; je Phase ein Umschalt-Commit mit Volltor; Rückfall = Revert dieses einen Commits. *Grund:* Befunde 1, 2; erfüllt E-000 ohne halbfertige Live-Stände.
- **C-3 P3 um die Schale für `/` erweitern.** P3-13 Kopf + Mega-Menü + Mobilmenü, P3-14 Fuß + Schriftfeld, P3-15 Leiste + Widget, WaterCursor auf `/` aus; P4-03 bis P4-07 schalten danach nur noch den Standard. *Grund:* Befund 1; die Schale ist vor dem globalen Umstieg live erprobt.
- **C-4 P4-00 Brückentabelle + P4-Tor schärfen.** Denkprotokoll für die Abbildung alt → KERN; Tor jeder globalen Welle über 120 Seiten × 4 Ansichten (axe, Überlauf, Pixel mit erklärten Bereichen), Sperrklinke je Seite. *Grund:* Befund 2, AUFTRAG.md:236.
- **C-5 Umordnen.** Basisbausteine-Kern als P3-04b; P4-Reihenfolge nach Befund 8; P4-13 teilen (WaterCursor P4, MotionProvider P5-Ende); P4-11 nach P6. *Grund:* Befunde 8, 9, 10, 21.
- **C-6 P4-07 mit LCP-Vorgabe.** Banner nie LCP-Element; Tor misst das LCP-Element je Hauptseite. *Grund:* Befund 7.
- **C-7 Testordnung.** Test-Sperrklinke im Push-Tor, Formular-IDs als Alias, Teständerungen nur durch Testschreiber + Opus-Gegenprüfer, gemeinsame Mikrotext-Freigabeliste; Mutationsprobe als Paket je umgestelltem Formular, nur in der Reinraum-Kopie. *Grund:* Befunde 4, 16.
- **C-8 Schreibrechte-Wächter.** `commit.sh` nur Dateien mit Abgleich gegen die Paket-Kopfzeile; `git status`-Vergleich je Welle; Briefing-Verbot für git-Schreibbefehle und npm install; Schnappschuss vor jeder Welle. *Grund:* Befund 16.
- **C-9 Wiederaufnahme.** L5 sofort; PLAN-Push-Tor, E-003-Verweis und NEBELKARTE auf E-005; PRUEFPUNKT mit laufenden Paketen und offenen Orchestrator-Dateien. *Grund:* Befund 5.
- **C-10 P5 als echte Paketliste.** Paket = eine Seite oder eine Vorlage (dynamische Route = Vorlage + Daten), mit Dateiliste und Kriterium; `/foerderung` zuordnen; Verlegeplan-Pakete (Opus) vor W1; S-13-Vorschlagspaket (41 Floskeln, 22 Dateien) für TEXTVORSCHLAEGE. *Grund:* Befunde 6, 12, 17.
- **C-11 Messordnung.** Lighthouse verschränkt, zehn Läufe im Grenzbereich, nur an Toren und in Hauptseiten-Wellen, sonst JS-Bytes je Route; Jury intern 8,4; Opus sparen (Slop-Gegenprüfer nur auf Restfunde, Jury nur an Toren). *Grund:* Befunde 14, 18; Kontingent.
- **C-12 Kapazität und Live-Prüfung.** Zwei Rechnungen, Planwert ≈ 9 Tage, Puffer in STATUS, Hinweis im Morgenbericht; Live-Rauchtest im Browser (lesend), Kompatibilitäts-Lint, M-06 nach P3. *Grund:* Befunde 11, 15.
- **C-13 KERN v1.1.** Signaturmomente je Seite, Seitenart je URL, Mikrotext-Klassen und Badge-Regel, Favicon als Vorschlag, Schriftteilmenge und Ersatzschrift, Bildregel. *Grund:* Befunde 12, 13, 19.

## OFFENE FRAGEN
- Ob die Morgenbericht-Routine (PLAN.md:113) angelegt ist, habe ich ohne Netz nicht geprüft.
- Ob das LCP auf `/standorte` ebenfalls am Banner hängt (zweigipflig), ist offen → Lichtung in C-1 g.

## RISIKEN DIESER PRÜFUNG
- Zählungen (Klassenstellen, Versalzeilen) per grep/Skript über `src` bzw. `belege`; Größenordnung belastbar, Einzelwerte ± wenige Prozent.
- Kapazitäts-Untergrenze ist eine Schätzung aus der Abhängigkeitsstruktur, kein Messwert.

=== ENDE P2-GEG-01 · BEREIT ZUR RÜCKGABE ===
