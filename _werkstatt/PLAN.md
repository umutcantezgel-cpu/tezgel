# PLAN · Lauf „Universal Motion“ · Fassung 2.2

Stand 27.10.2026, E1 (E-066 bis E-069, KERN v4.0.2). Fassung 2.2 arbeitet die Planprüfung L0 ein: Runde 1 (`berichte/UM-E1-L0.md`, 15 Befunde) und Runde 2 (`berichte/UM-E1-L0-R2.md`, 8 Befunde). Mehr als zwei Runden gibt es nicht. Der Plan des Vorlaufs liegt in `archiv/PLAN-verstaendlich-echt-ausgezeichnet.md`. Er ist bis Welle E4-W1 abgeschlossen; der Rest geht in diese Fassung über, soweit er ein Kriterium dieses Laufs trägt. Der Plan ändert sich nur an Etappentoren.

Regeln für jede Zeile:
- Schreibrechte sind exakte Pfade. Ein `*` steht nur für einen Ordner, den das Paket allein besitzt.
- „(neu)“ kennzeichnet Dateien und Ordner, die das Paket anlegt. Ausgabeordner unter `belege/`, `berichte/` und `bilder/` legt immer das Paket an, das sie nennt.
- Seitendateien (`page.*`) gehören dem Paket, das sie nennt. „Routen“ im Sinne der Dateihoheit sind `src/config/navigation.js`, die Weiterleitungen in `next.config.ts` und die Layouts.
- U02 und U03 ändern Stellen in `src/**` nur nach der Fehlerliste von `tsc`, Build, Linter oder Codemod. Solange sie laufen, schreibt kein anderes Paket in `src/`.
- Wo eine Dateiliste erst aus einem vorausgehenden Bericht folgt, trage ich sie vor dem Wellenstart in diese Zeile ein. Ohne eingetragene Liste startet das Paket nicht.
- Gemeinsame Dateien schreibt nur der Orchestrator. Das sind:
  - Designsystem: `src/app/globals.css`, `src/components/kern/stile.ts`, `src/components/kern/zusammen.tsx`
  - Bewegung: `src/app/bewegung.css`, `src/lib/motion/*`
  - Konfiguration: `src/config/*`
  - Routen und Layouts: `src/app/**/layout.tsx`, `src/app/(bestand)/_dokument.tsx`
  - Werte-Regeln: `_werkstatt/werkzeuge/werte-regeln.json`
  - Register: `_werkstatt/register.json`
  - Paketdateien und Lockfiles: schreibt der Orchestrator oder das eine laufende Upgrade-Paket (AUFTRAG, Dateihoheit). Upgrade-Pakete laufen deshalb nacheinander.
  - Werkstattdateien: KERN, PLAN, ABNAHME, UPGRADE, MENSCHEN, STATUS, PRUEFPUNKT, KONTINGENT
- Meldet ein Haiku-Paket Bedarf an gemeinsamen Dateien (Abschnitt GEMEINSAME DATEIEN im Ausgabeformular), übertrage ich ihn gebündelt am Wellenende.
- Rechenintensive und zeitkritische Messungen (Lighthouse, Bildrate, Reaktion, ganze Suite) laufen allein. Pixel- und Bildaufnahmen sind nicht zeitkritisch und dürfen neben einem Build laufen.

## Mengengerüst
- Abhängigkeiten:
  - 32 direkte: 21 im Projekt, 11 in den Werkzeugen. Dazu kommen Laufzeit und Paketmanager.
  - 20 haben eine neuere stabile Version (UPGRADE.md).
- Ansichten:
  - 12 Hauptansichten (`HAUPTANSICHTEN.json`): 9 Erzähl- und Ortsansichten, 2 Wissensansichten, 1 Arbeitsansicht.
  - 202 Adressen insgesamt (`adressen-e0.csv`): 168 Seiten mit Status 200, 2 Weiterleitungen (308), 32 dauerhaft entfernt (410). Dazu 93 Seitendateien.
- Komponenten:
  - Bausteine in `src/components/kern/` (rund 25).
  - Vorlagen in `src/components/vorlagen/` (4).
  - Formulare (7 Abläufe).
- Grafik: 47 Icons im Sprite, 16 Inline-SVG, 3 SVG unter `public/`.
- Bewegung:
  - 28 Registereinträge.
  - 11 rAF-Stellen in 7 Dateien und 1 Intervall (Karussell).
  - Neu: Bewegungsschalter, Takt, Cursor mit 6 Zuständen, Zeilenmasken.
  - Eingang und B-01 nach Regeln v4.
- Übergänge: B-01 zwischen Erzählansichten; schlichte Überblendung zu und zwischen Arbeitsansichten.
- Sprachen: Deutsch (einzige Sprache). Themen: hell (einziges Thema; dunkel nur über Kür UM-K07).
- Neue Logik, jeweils mit eigenem Test:

  | Logik | Test | Paket |
  |---|---|---|
  | Bewegungsschalter | `test/bewegungsschalter.test.mjs` | MOD |
  | Takt | `test/takt.test.mjs` | MOD |
  | Ladeschwelle 300/500 ms | `test/ladeschwelle.test.mjs` | ZUST-M |
  | Ansichtsart im Linkfilter | `test/verlegen.test.mjs`, ergänzt | B01 |
  | Cursor-Zustandsmaschine | `test/cursor.test.mjs` | CURSOR |

## Modellanteil und Kapazität (Abschnitt 12)

**Kalibrierung:**
- Ein Fenster entspricht 50,7 USD gewichtet nach Listenpreis (Faktor 1,973 %/USD). Der Wert ist eher vorsichtig.
- Beim Sicherheitsziel von 95 % sind je Fenster 48,2 USD nutzbar.
- Die Woche ist nicht kalibriert:
  - Die 7-Tage-Kosten liegen bisher bei 1.225 USD, ohne Wochen-Limit-Ereignis.
  - Bis zu einem Wochen-Kalibrierpunkt gilt die Annahme: Die Woche trägt mindestens den Bedarf dieses Plans.
  - Ein Wochen-Limit-Ereignis kalibriert neu und kürzt die Pakete je Tag.

**Kosten je Klasse** (Schätzwerte bis zur Kalibrierung in E3, Abschnitt 12; KONTINGENT.md führt die gemessenen Werte nach):

| Klasse | Modell | Kosten je Paket |
|---|---|---|
| S | Haiku | ≈ 0,04 USD |
| M | Haiku | ≈ 0,1 bis 0,3 USD |
| M | Opus, eigene kleine Arbeit | ≈ 2,5 USD |
| L | Opus, eigene Stufe-3-Arbeit | ≈ 8 USD |
| L | Haiku, Prüfstufe mit Bildsätzen | ≈ 1 USD |
| L | Opus, frische Agenten (Sichtabnahme, Endprüfung) | ≈ 10 bis 30 USD je Tor |

**Pflicht: 58 Pakete, ohne Doppelzählung:**

| Gruppe | Pakete | Kosten |
|---|---|---|
| L Opus eigene Arbeit | 11 (U01, U02, U03, DS, MOD, EIN, B01, CURSOR, E3-LEISTUNG, VORL, CHOR-FIX) | ≈ 88 USD |
| L Opus frische Agenten | 3 (E3-SICHT ≈ 10, E4-SICHT ≈ 30, E5-END ≈ 30) | ≈ 70 USD |
| L Haiku Prüfstufen | 4 (E2-B, E3-B, E4-B, E5-C) | ≈ 4 USD |
| M Opus | 13 (ZUST-M, SCROLL, LEIT, REG, EP1 bis EP4, FS-FUGEN, VIDEO, E4-LEISTUNG, E5-BER, E5-KONT) | ≈ 33 USD |
| S und M Haiku | 27 (18 × S ≈ 0,04, 9 × M ≈ 0,1 bis 0,3) | ≈ 3 USD |
| **Summe Pakete** | **58** | **≈ 198 USD** |
| Steuerung (Wellenübertrag, Commits, Tempomat), 20 % | | ≈ 40 USD |
| **Bedarf** | | **≈ 238 USD ≈ 4,9 Fenster zu 95 %** |

**Pakete je Tag:**
- Mittlere Paketkosten: 238 / 58 ≈ 4,1 USD.
- Fenster je Tag: 4 von höchstens 4,8 (Wartezeiten und Lücken der Routinen eingerechnet).
- Pakete je Tag: 4 × 48,2 / 4,1 ≈ 47.
- Tage: 58 / 47 × 1,2 ≈ 1,5 Tage.
- Wochenspielraum: nicht messbar (U-3). Ersatz ist die Annahme oben; ein Wochen-Limit-Ereignis setzt den Kalibrierpunkt.
- Danach kommt die Kür, so weit Fenster und Woche tragen.

**Modellanteil:**
- Haiku trägt alle Prüfungen und Messungen, die Kundschaft, Upgrades nach Leitfaden und Bau nach Muster.
- Opus baut die Kernsysteme, schreibt die gemeinsamen Dateien und nimmt ab.

## Etappen und Wellen (kritischer Pfad fett)
In einer Welle laufen gleichzeitig nur Pakete mit getrennten Dateien. Pakete des Orchestrators innerhalb einer Welle laufen nacheinander in der genannten Reihenfolge.

**E2 Fundament – Stack-Upgrade**
- E2-W1: **U01** · gleichzeitig PX und SVGO (Werkzeug- und Berichtsdateien).
- E2-W2: **U02 → U03** (U03 erst nach PX).
- E2-W3: U04 → U05 → U06 → U07 (Upgrade-Pakete nacheinander, weil sie Paketdateien teilen).
- E2-W4: E2-B.
- Tor: Z-03 erfüllt oder als AUSNAHME belegt; Bestand mindestens wie E0.

**E3 Referenz `/`**
- E3-W1: **DS → ZUST-M** · gleichzeitig SVG und LCP-K (Haiku). Danach übertrage ich die Icon-Namen in `src/config/blog.js` und `src/config/company.js`.
- E3-W2: **MOD**.
- E3-W3: **EIN → B01** · gleichzeitig ZUST (Haiku).
- E3-W4: CURSOR → SCROLL → LEIT → REG → E3-LEISTUNG.
- E3-W5: E3-B → E3-SICHT.
- Tor: Prüfstufe B für `/` nach Prüfmatrix; Sichtabnahme durch einen frischen Opus-Agenten mit Ansichtswert ≥ 8,5.

**E4 Ausführung**
- E4-W1: **VORL** · gleichzeitig EP5, FS-K und DOK (Haiku).
- E4-W2:
  - Orchestrator: EP1 → EP2 → EP3 → EP4 → FS-FUGEN → VIDEO, danach **CHOR-FIX**, sobald die CHOR-Berichte vorliegen.
  - Gleichzeitig: CHOR-01 bis CHOR-11 (Haiku, nur Berichte, 2 bis 4 gleichzeitig nach Tempomat).
- E4-W3: E4-LEISTUNG (Orchestrator) · gleichzeitig NBSP und FS (Haiku, getrennte Dateien). Danach übertrage ich die NBSP-Stellen in `src/config/*`.
- E4-W4: E4-B → E4-SICHT.
- Tor: Prüfstufe B und Sichtabnahme aller Hauptansichten.

**E5 Abschluss**
- E5-W1: E5-C → E5-BLIND.
- E5-W2: E5-END.
- E5-W3: E5-GAL → E5-BER → E5-KONT.

## Pflichtpakete
Spalten: Kennung · Ziel · Rolle · Modell · Stufe · Klasse · Schreibrechte · hängt ab von · Kriterium · Status · Commit

### E2 Fundament
| Kennung | Ziel | Rolle | Modell | Stufe | Klasse | Schreibrechte | ab | Krit. | Status | Commit |
|---|---|---|---|---|---|---|---|---|---|---|
| UM-E2-U01 | Node auf aktuelle LTS am Upgradetag: 24.22.1, oder 26, falls `nodejs.org/dist/index.json` 26 dann als LTS führt. npm gebündelt, `@types/node` auf die LTS-Linie. Mitziehen: `.nvmrc`, engines, packageManager, CI, README, EINRICHTUNG. Prüfung mit LTS-Binär im Scratchpad | Orchestrator | Opus | 3 | L | package.json, package-lock.json, .nvmrc, .github/workflows/security.yml, README.md, _werkstatt/werkzeuge/EINRICHTUNG.md, _werkstatt/werkzeuge/scratch.sh, _werkstatt/UPGRADE.md, test/resolver.mjs, test/register-hooks.mjs (neu) | – | Z-03 | erledigt, abgenommen | d4ecfac9 |
| UM-E2-U02 | TypeScript: Anlauf 2 für 7.x (Installation ohne `--legacy-peer-deps`, Ergebnis belegt), sonst 6.0.x; tsconfig nachziehen | Orchestrator | Opus | 3 | L | package.json, package-lock.json, tsconfig.json, _werkstatt/UPGRADE.md; Typstellen in `src/**` nur nach Fehlerliste von `tsc`, im Commit einzeln genannt | U01 | Z-03 | erledigt, abgenommen | 54ec7ac8 |
| UM-E2-U03 | next 16.4.3, react und react-dom 19.3.1, @types/react(-dom) 19.3.0, eslint-config-next 16.4.3. webpack/Turbopack, globalNotFound, imageSizes prüfen. Pixelvergleich gegen 7ceb5e41 | Orchestrator | Opus | 3 | L | package.json, package-lock.json, next.config.ts, eslint.config.mjs, _werkstatt/UPGRADE.md, _werkstatt/belege/um-e2/pixelvergleich/; Stellen in `src/**` nur nach Fehlerliste von Build, Linter oder Codemod, im Commit einzeln genannt | U02, PX | Z-03, Z-02 | erledigt, abgenommen | a6c1bd54, 0d37880e |
| UM-E2-U04 | tailwindcss und @tailwindcss/postcss 4.3.3. Muster: UPGRADE.md Nr. 10, Leitfaden Changelog | Upgrader | Haiku | 2 | S | package.json, package-lock.json | U03 | Z-03 | erledigt, abgenommen (E-071) | 91615baa |
| UM-E2-U05 | zod 4.6.7, resend 6.34.1, lucide-react 1.61.0, tailwind-merge 3.7.0, @types/google.maps 3.66.7. Audit-Fixes für sharp und source-map-js im Projekt (transitiv, ohne `--force`). Muster: UPGRADE.md Nr. 11 bis 17 | Upgrader | Haiku | 2 | M | package.json, package-lock.json | U04 | Z-03 | erledigt, abgenommen (E-072) | f1bed29f, e117a149 |
| UM-E2-U06 | eslint 9.39.5. Zweiter Anlauf für ESLint 10 ohne `--legacy-peer-deps`, Ergebnis belegt. Muster: UPGRADE.md Nr. 19 | Upgrader | Haiku | 2 | S | package.json, package-lock.json, eslint.config.mjs | U05 | Z-03 | erledigt, abgenommen (E-073) | de351461 |
| UM-E2-U07 | Prüfwerkzeuge: @playwright/test 1.64.1 (Browser über `executablePath`), @axe-core/playwright 4.14.0, knip 6.43.0, sharp 0.35.5 (direkt in den Werkzeugen). Muster: UPGRADE.md Nr. 12 und 20 bis 22 | Upgrader | Haiku | 2 | M | _werkstatt/werkzeuge/package.json, _werkstatt/werkzeuge/package-lock.json; Nacharbeit Orchestrator: src/components/common/Header.jsx (E-074) | U06 | Z-03 | erledigt, abgenommen (E-074) | 9ecbec98, 28be7043, 6caeeb9c |
| UM-E2-PX | Pixelvergleich der zwölf Hauptansichten in vier Größen als Werkzeug. Muster: Aufnahme wie `werkzeuge/bildsatz.mjs`, Vergleich mit `pixelmatch` 8.0.0 (schon in den Werkzeugen). Maßstab: derselbe Bau gegen sich selbst ergibt 0 abweichende Pixel; Ausgabe JSON je Ansicht und Größe, Differenzbilder | Prüfer | Haiku | 1 | M | _werkstatt/werkzeuge/pixelvergleich.mjs (neu), _werkstatt/berichte/UM-E2-PX.md (neu) | – | Z-03 | erledigt, abgenommen (E-070) | 67ab6710 |
| UM-E2-SVGO | SVGO-Konfigurationen statisch und animiert; Inventar aller SVG mit Fixpunkt-Prüfung (nur Bericht und Konfiguration) | Grafiker | Haiku | 2 | S | _werkstatt/werkzeuge/svgo-statisch.config.mjs (neu), _werkstatt/werkzeuge/svgo-animiert.config.mjs (neu), _werkstatt/werkzeuge/svg.mjs, _werkstatt/berichte/UM-E2-SVGO.md (neu) | – | Z-08 | erledigt, abgenommen (E-069) | eee7cc37 |
| UM-E2-B | Etappentor, Prüfstufe B: Build, Typen, Linter, Tests, Suite, Konsole, Bildsatz vier Größen, axe vier Größen mit Menü und Dialog, Lighthouse Median aus drei, Bildrate und reduziert, Register, Scrollen gedrosselt; Audit; Pixelvergleich des Endstands E2 gegen 7ceb5e41. Je Wert der Vergleich mit E0. Z-04, Z-05, Z-08 und die Bildfolgen von Z-06 entfallen in E2, weil E2 weder Gestaltungswerte noch SVG-Dateien noch Momente ändert | Prüfer | Haiku | 1 | L | _werkstatt/belege/um-e2/lighthouse.json, axe/, reaktion/, bewegung/, bildsatz.json, audit.json, suite.json, pixelvergleich-ende/ (alle neu), _werkstatt/berichte/UM-E2-B.md (neu) | U07, PX | Z-02, Z-03; Bestand gegen E0: Z-06, Z-07, Z-09, Z-10, Z-11 | offen | erledigt nach zwei Anläufen (E-076); offen: Z-10 TBT mobil → UM-E3-TBT | 7344cd9a, 5a5e3dd8, f5544581, 25395ee4, 51355ef7 

### E3 Referenz `/`
| Kennung | Ziel | Rolle | Modell | Stufe | Klasse | Schreibrechte | ab | Krit. | Status | Commit |
|---|---|---|---|---|---|---|---|---|---|---|
| UM-E3-DS | Designsystem v4: OKLCH mit Abstufung, sechs Dauer- und vier Kurvenstufen mit Aliasen, Bedeutungs-Tokens; `werte-regeln.json` nachgeführt | Orchestrator | Opus | 3 | L | src/app/globals.css, src/app/bewegung.css, _werkstatt/werkzeuge/werte-regeln.json | E2 | Z-04 | offen | erledigt, abgenommen (E-075; vorgezogen in E2) | dc2eb85e, 11be7fde, f526adf2 
| UM-E3-ZUST-M | Muster der Zustände. Ladeschwelle (300 ms, 500 ms) als Logik mit Test, eingebaut in Knopf. Auswahlknopf: deaktiviert. Kontrollkästchen: Hover, deaktiviert, 20 px. Das sind 3 von 8 lückenhaften Bausteinen | Orchestrator | Opus | 3 | M | src/lib/ladeschwelle.ts (neu), test/ladeschwelle.test.mjs (neu), src/components/kern/Knopf.tsx, src/components/kern/stile.ts | DS, src/components/kern/LadeInhalt.tsx (neu, Vermerk E-077) | Z-04, Z-09 | offen | erledigt, abgenommen (E-077) | efac0a52, 27d87b66, 180e8ad2 
| UM-E3-SVG | Eine Icon-Familie: lucide in `useAnfrageFunnel.ts` durch Sprite-Namen ersetzen; fehlende Symbole ins Sprite. viewBox und title ergänzen, SVGO-Fixpunkte. Logo-SVG mit eingebettetem PNG: ersetzen oder mit Vermerk entfernen (G4). Meldet die Namenszuordnung für `src/config/blog.js` und `src/config/company.js` | Grafiker | Haiku | 2 | M | src/lib/formulare/useAnfrageFunnel.ts, src/components/icons/sprite.svg, src/components/icons/namen.ts, src/components/icons/zuordnung.ts, src/components/icons/svg/*, src/components/locations/RouteVisualization.tsx, public/images/logo/tezgel-logo.svg, public/images/logo/tezgel-logo-dark.svg, public/images/logo/tezgel-mark.svg | SVGO | Z-08 | offen | erledigt, abgenommen (E-075; vorgezogen in E2) | 9f623415, 3d481570, 11be7fde 
| UM-E3-MOD | Bewegungsmodul. Bewegungsschalter: Kopfskript, Speicher, Bedienelement im Fuß und im Menü. Gemeinsamer Takt; Zeigerart. Die 11 rAF-Stellen und das Karussell-Intervall laufen auf den Takt | Orchestrator | Opus | 3 | L | src/lib/motion/bewegung.ts, src/lib/motion/kopfskript.ts, src/lib/motion/takt.ts (neu), src/lib/motion/schalter.ts (neu), src/app/(bestand)/_dokument.tsx, src/app/bewegung.css, src/components/common/Footer.jsx, src/components/common/MobileMenu.jsx, src/components/kern/Karussell.tsx, src/components/kern/BewegungsWaechter.tsx, src/components/common/SprungHalter.tsx, src/components/blog/TableOfContents.jsx, src/components/verlegen/Verlegen.tsx, src/lib/formulare/useFliesenKonfigurator.ts, test/bewegungsschalter.test.mjs (neu), test/takt.test.mjs (neu), _werkstatt/register.json | DS | Z-06 | erledigt (E-080): Schalter im Fuß und im Menü, Gerät geht vor (UM-7), Takt für 6 von 11 rAF-Stellen und das Karussell, B-01 unverändert (E-078); zusätzlich BewegungsSchalter.tsx, Variante ruhig in globals.css, stile.ts, ReadingProgress.jsx, Spec bewegungsschalter | 109890d2 |
| UM-E3-EIN | Eingang ohne Vorhang: Logo baut sich im Kopf auf, H1-Zeilenmasken, LCP-Foto sofort sichtbar, ≤ 1,5 s, Zeitlimit 2 s, Wiederkehr kürzer (E-067-4) | Orchestrator | Opus | 3 | L | src/components/intro/Intro.tsx, src/lib/intro/ablauf.ts, src/components/start/Startbild.tsx, src/lib/motion/startbild.ts, src/components/vorlagen/teile/Einstieg.tsx, src/components/vorlagen/teile/EinstiegMitte.tsx, src/components/vorlagen/teile/EinstiegPlanblatt.tsx, src/app/bewegung.css, test/intro.test.mjs | MOD | Z-06, Z-10 | erledigt (E-081): voll 1,40 s, Wiederkehr kurz, Foto nie verdeckt, Intro-Schicht und Belag entfallen, Pixel 0, Lighthouse `/` besser; zusätzlich Header.jsx, kopfskript.ts, register.ts, register.json, _dokument.tsx, MobileMenu.jsx (Pfad-Effekt), Werkzeuge | 3e99db0a, c773a7c5 |
| UM-E3-B01 | B-01 nach Regeln v4: Tippen beendet, Navigation beim Klick; Ansichtsart im Linkfilter, Arbeitsansichten schlicht (Liste K-010); Fokus auf h1; Zurück und Scroll | Orchestrator | Opus | 3 | L | src/components/verlegen/Verlegen.tsx, src/lib/verlegen/automat.ts, src/lib/verlegen/linkfilter.ts, src/lib/verlegen/raster.ts, test/verlegen.test.mjs | EIN | Z-06, Z-07 | offen | entfällt (E-078: Auftraggeber will den bestehenden Seitenübergang behalten); nur falls eine Prüfung (Z-07, Z-09) am Übergang scheitert, ein unsichtbarer Einzelfix nach Rücksprache |
| UM-E3-ZUST | Zustände nach dem Muster ZUST-M für die übrigen 5 von 8 Bausteinen. Karussell-Pause: gedrückt, deaktiviert. Verband-Umschalter: Hover, deaktiviert. Menüpunkte: Hover an Links. Untere Leiste: Fokus, gedrückt. Glasbild: Umriss auf dem Foto messen und sichern. Maßstab: `stile.ts` nach ZUST-M | Baumeister | Haiku | 2 | M | src/components/kern/Karussell.tsx, src/components/kern/VerbandUmschalter.tsx, src/components/common/MobileMenu.jsx, src/components/layout/MobileBottomBar.tsx, src/components/kern/Glasbild.tsx | ZUST-M, MOD | Z-04, Z-09 | erledigt (E-082): Haiku-Bau in Arbeitskopie, zwei Prüfer, Fokus Glasbild und untere Leiste nach Befund innen; Pixel 0, axe 0 | 5c2481e0 |
| UM-E3-CURSOR | Fugenkreuz-Cursor nach K-007/K-008 mit sechs Zuständen, Register, Tests der Zustandsmaschine | Orchestrator | Opus | 3 | L | src/components/cursor/Cursor.tsx (neu), src/lib/motion/cursor.ts (neu), src/app/(bestand)/layout.tsx (Wurzel-Layout), src/app/bewegung.css, test/cursor.test.mjs (neu) | B01 | Z-07 | erledigt (E-084) | f846301a |
| UM-E3-SCROLL | scrollbar-gutter, overscroll, svh, scroll-margin, content-visibility, passive Listener, Speculation Rules für öffentliche Seiten | Orchestrator | Opus | 3 | M | src/app/globals.css, src/app/(bestand)/_dokument.tsx, src/components/blog/ReadingProgress.jsx, src/components/blog/TableOfContents.jsx | CURSOR | Z-07, Z-10 | erledigt (E-084) | f087c4c8, 1620c0f5 |
| UM-E3-LEIT | Laserlinie als Leitfaden auf `/` mit Abschnittsmarke | Orchestrator | Opus | 3 | M | src/components/kern/Leitachse.tsx, src/app/bewegung.css | SCROLL | Z-05, Z-06 | erledigt (E-084) | 752814db |
| UM-E3-REG | Register v4: Zweck, Stufen, reduziert, Cursor-Zustände; `fugenband` entscheiden; Staffel `karte` ≤ 8 | Orchestrator | Opus | 3 | M | src/lib/motion/register.ts, _werkstatt/register.json, src/app/bewegung.css | LEIT | Z-06 | erledigt (E-084) | 702dc965 |
| UM-E3-LCP-K | LCP und Reaktion aufschlüsseln, je Hauptansicht: LCP-Element; Phasen TTFB, Ladeverzögerung, Ladezeit, Renderverzögerung aus den Lighthouse-Berichten; Größe und Format des LCP-Bilds; Einfluss von Einwilligungsbanner (LCP-Element auf `/standorte/wetzlar`) und Schriften. Reaktion: langsamste Handlung je Ansicht mit Zuordnung der Long Animation Frames. Nur Bericht | Kundschafter | Haiku | 1 | S | _werkstatt/berichte/UM-E3-LCP-K.md (neu) | E2 | Z-10, Z-07 | offen | erledigt (Bericht; Hebel für UM-E3-LEISTUNG: Ladekette des LCP-Bilds, Banner-LCP auf Ortsseiten, render-blockierende CSS) |
| UM-E3-TBT | TBT mobil nach dem Stack-Upgrade (Tor E2 Anlauf 2, E-076): auf `/`, `/leistungen`, `/balkon-terrasse` knapp über der E0-Spanne, als Richtung auf mehreren Ansichten höher. Messung mit wechselnder Reihenfolge (E0, HEAD, HEAD, E0) je Seite; Long Tasks aus Performance-Traces zuordnen (Next- und React-Laufzeit, eigener Code, Bewegungsmodul); Ursache und Vorschlag. Nur Bericht; Behebung als Folgepaket | Kundschafter | Haiku | 1 | S | _werkstatt/berichte/UM-E3-TBT.md (neu) | E2 | Z-10 | erledigt (E-079): keine durchgängige Verschlechterung, alle Differenzen in der E0-Spanne | f64d09e6, Bericht im Commit zu E-079 |
| UM-E3-LEISTUNG | BUDGETS auf `/`: LCP mobil ≤ 2,5 s, Leistung mobil ≥ 90, Reaktion ≤ 200 ms. Grundlage ist LCP-K. Kein Inhalt fällt weg; Einwilligung und Logo bleiben in Inhalt und Verhalten gleich (G8) | Orchestrator | Opus | 3 | L | next.config.ts, src/components/kern/Bildfeld.tsx, src/components/start/Startbild.tsx, src/app/(bestand)/layout.tsx; weitere Stellen aus LCP-K, vor dem Start hier eingetragen | REG, LCP-K | Z-10, Z-07 | erledigt mit Ausnahme A-1 (E-085): Leistung 94–96, Reaktion 128 ms, LCP 2,70 s statt ≤ 2,5 s; zusätzlich src/app/fonts/*.woff2, LIZENZEN.md, werkzeuge/brotli-proxy.mjs | 1d101816, 6a723d7c, f60acb7a |
| UM-E3-B | Referenztor, Prüfstufe B für `/` nach Prüfmatrix: Z-02, Z-04 (`werte.mjs` der Etappe), Z-06 (Bildfolgen, Bildrate, reduziert, ruhiger Schalter), Z-07 (Scrollen gedrosselt), Z-08 (SVG der Ansicht), Z-09 (axe vier Größen mit Menü und Dialog), Z-10 (Lighthouse Median aus drei), Z-11 (Bildsatz vier Größen) | Prüfer | Haiku | 1 | L | _werkstatt/belege/um-e3/ (neu), _werkstatt/berichte/UM-E3-B.md (neu) | E3-LEISTUNG, SVG, ZUST | Z-02, Z-04, Z-06 bis Z-11 | offen | – |
| UM-E3-FIX | Nacharbeit nach Tor E3 Anlauf 1 (E-086): Teil A erster Bildschirm und Leitidee (F1 bis F3), Teil B Rhythmus, Fuß und große Bildschirme (F4 bis F10) | Orchestrator, Baumeister | Opus | 3 | L | `pakete/UM-E3-FIX.md`; Diffs aus `$SCRATCH/fix/` (27 Dateien, darunter EinstiegMitte, Footer, FussGruppe, Stimmen, Tun, Einsatzorte, globals.css, bewegung.css, register) | E3-SICHT Anlauf 1 | Z-05, Z-06 | erledigt (E-087) | c6dc40fd, 904eb1f1 |
| UM-E3-FIX2 | Nacharbeit nach Tor E3 Anlauf 2 (E-088): N1 bis N12 (Leitfaden, erster Bildschirm, Quadratmeter, Eingang mobil, Rhythmus, Leistungen, Stimme, Fuß) | Orchestrator, Baumeister | Opus | 3 | L | `pakete/UM-E3-FIX2.md`; 22 Dateien laut Diffs in `$SCRATCH/fix2/` | E3-SICHT Anlauf 2 | Z-05, Z-06 | erledigt (E-090); Bildrate → UM-E3-TAKT | 99dff87e, 8bcca3c8 |
| UM-E3-TAKT | Bildrate `/` nach FIX2 (0,2 % → 4 % verworfen, Schwelle 5 %): Ursache belegen, minimal beheben, Bild gleich | Orchestrator, Baumeister | Opus | 3 | M | `pakete/UM-E3-TAKT.md`; Dateien aus dem Diff | FIX2 | Z-06 | erledigt (E-092) | eee79b85 |
| UM-E3-SICHT | Sichtabnahme `/` durch einen frischen Opus-Agenten (Rubrik Abschnitt 13, Ansichtswert ≥ 8,5) an den Bildern von E3-B | Prüfer | Opus | 3 | L | _werkstatt/berichte/UM-E3-SICHT.md (neu) | E3-B | Z-05 | Anlauf 1: 6,7/6,9 (E-086), Anlauf 2: 7,3/7,5 (E-088), Anlauf 3: 7,5/7,6 (E-090); Tor E3 nach L3 mit offenem Punkt Z-05 geschlossen, Befunde → UM-E4-START | – |

### E4 Ausführung
| Kennung | Ziel | Rolle | Modell | Stufe | Klasse | Schreibrechte | ab | Krit. | Status | Commit |
|---|---|---|---|---|---|---|---|---|---|---|
| UM-E4-START | Befunde der Sicht Anlauf 3 für `/` (E-090, `belege/um-e3-fix2/sicht-anlauf-3.json`): Foto mobil in den ersten Bildschirm (Reihenfolge wie Desktop), H1 auf der Schnur (Grundlinie), Quadratmeter an „Quadratmeter.“ und unter lg, Startfoto ab lg größer bzw. Querformat aus dem Bestand prüfen, Leitfaden mit Präsenz (aktiver Abschnitt 2 px, DPR 1), Galerie-Namen t1024, eine Auswahlebene (Vignetten in die Lagen), ein Moment mit Gewicht in der Mitte (Treppe), Leiste „Cookies“ ohne Aufpoppen und einzeilig auf q844 | Orchestrator, Baumeister | Opus | 3 | L | aus dem Briefing, vor dem Start hier eingetragen | E3, TAKT | Z-05 | offen | – |
| UM-E4-VORL | Eingang, Zeilenmasken, Leitfaden und Cursor-Ziele in die Vorlagen (Erzähl-, Wissens-, Orts- und Arbeitsseite) | Orchestrator | Opus | 3 | L | src/components/vorlagen/ArbeitsSeite.tsx, ErzaehlSeite.tsx, OrtsSeite.tsx, WissensSeite.tsx, inhalt.ts; src/components/vorlagen/teile/Ablauf.tsx, Beleg.tsx, Einsatzorte.tsx, Einstieg.tsx, EinstiegMitte.tsx, EinstiegPlanblatt.tsx, Fotos.tsx, Lage.tsx, Schritt.tsx, Stimmen.tsx, Tun.tsx, Wissen.tsx | E3 | Z-05, Z-06 | offen | – |
| UM-E4-CHOR-01 bis CHOR-11 | Je eine der 11 übrigen Hauptansichten (Reihenfolge `HAUPTANSICHTEN.json` ohne `/`): Choreografie prüfen (≤ 1 Auftritt mit Gewicht je Bildschirmhöhe, Auftritte auf ≤ 50 % der Abschnitte), Signaturmoment prüfen, Befunde mit Datei und Zeile melden | Prüfer | Haiku | 1 | S | _werkstatt/berichte/UM-E4-CHOR-01.md bis UM-E4-CHOR-11.md (neu); Paket Nr. n schreibt nur die Datei Nr. n | VORL | Z-05, Z-06 | offen | – |
| UM-E4-CHOR-FIX | Befunde der 11 CHOR-Berichte umsetzen | Orchestrator | Opus | 3 | L | Dateiliste aus den CHOR-Berichten, vor dem Start hier eingetragen; nur Dateien ohne gleichzeitiges Paket | CHOR-01 bis 11, EP1 bis EP4 | Z-05, Z-06 | offen | – |
| UM-E4-EP1 | Rückführung Aufbauten-Vergleich `/balkon-terrasse` (Muss). Wesen in neuer Form, Wortlaut aus der E0-Quelle, Garantiewörter nur nach M-07. Brotkrumen der Unterseiten bleiben gültig | Orchestrator | Opus | 3 | M | src/inhalte/balkon-terrasse.ts, src/components/vorlagen/teile/Vergleich.tsx (neu), src/components/vorlagen/ErzaehlSeite.tsx | VORL | Z-02 | offen | – |
| UM-E4-EP2 | Rückführung Werte-Block `/ueber-uns` (Muss), Vertrauensliste mit HWK und DIN; Garantie-Wortlaut sinngleich (M-07) | Orchestrator | Opus | 3 | M | src/inhalte/ueber-uns.ts, src/components/ueber-uns/Werte.tsx | EP1 | Z-02 | offen | – |
| UM-E4-EP3 | Rückführung Qualitätsversprechen auf sechs Hauptansichten (Muss): `/bad/badsanierung`, `/fliesen`, `/balkon-terrasse`, `/ueber-uns`, `/standorte/[stadt]`, `/blog`. Wortlaut aus `COMPANY_DATA.qualityPromises` (nur lesen), Bindung sinngleich | Orchestrator | Opus | 3 | M | src/components/vorlagen/teile/Versprechen.tsx (neu), src/components/vorlagen/ErzaehlSeite.tsx, src/components/vorlagen/OrtsSeite.tsx, src/components/vorlagen/WissensSeite.tsx, src/inhalte/bad-badsanierung.ts, src/inhalte/fliesen.ts, src/inhalte/balkon-terrasse.ts, src/inhalte/ueber-uns.ts, src/inhalte/orte.ts, src/inhalte/blog.ts | EP2 | Z-02 | offen | – |
| UM-E4-EP4 | Service-Strukturdaten (Soll, E-068): Knoten je Leistungsseite über die Ordner-Layouts wie in E0, ohne Doppelknoten auf Seiten, die schon einen eigenen tragen; Zielwert 113 Seiten mit Typ Service wie E0 | Orchestrator | Opus | 3 | M | src/lib/schema.ts, src/app/(bestand)/bad/layout.tsx, src/app/(bestand)/balkon-terrasse/layout.tsx, src/app/(bestand)/fliesen/layout.tsx, src/app/(bestand)/beratung/layout.tsx, test/meta.test.mjs | EP3 | Z-02 | offen | – |
| UM-E4-EP5 | Stellenangebot `/karriere/ausbildung` (Soll): JobPosting mit Place, FAQPage. Angaben nur aus den Firmendaten (nur lesen). Muster: `buildServiceNode` in `src/lib/schema.ts` (nur lesen) | Baumeister | Haiku | 2 | S | src/app/(bestand)/karriere/ausbildung/page.jsx | E3 | Z-02 | erledigt (E-091): nur JobPosting; FAQPage entfällt mangels sichtbarer Fragen; Schema-Standardwerte entfernt | 1770c3cb |
| UM-E4-FS-K | 16 offene Befunde der Browserprüfung Runde 5 (`belege/um-e0/runde5-befunde.json`, Nr. 2 bis 17; Nr. 1 bleibt laut E-065) je Datei und Zeile zuordnen, Ursache in einem Satz | Kundschafter | Haiku | 1 | S | _werkstatt/berichte/UM-E4-FS-K.md (neu) | E3 | Z-11 | erledigt (E-091), Bericht mit Gegenprüfung | – |
| UM-E4-FS-FUGEN | Trennfugen der Befunde Nr. 2, 5, 6, 10, 11, 15, 16, 17 (Wörter in FUGEN, Einbindung `mitFugen`); Versalien-Trennung Nr. 12 über CSS, ohne Änderung am Wortlaut der Kundenstimme | Orchestrator | Opus | 3 | M | src/components/kern/zusammen.tsx, src/app/globals.css; weitere Einbindungsstellen aus FS-K, vor dem Start hier eingetragen | FS-K | Z-11 | offen | – |
| UM-E4-FS | Darstellungsbefunde Nr. 3, 4, 7, 8, 9, 13, 14 (Ortsliste, Regler ohne Angabe, Fischgrät-Foto, Leitsatz-Karte, Knopfumbruch, Preiskarte, Zusammenfassung). Muster: Container-Abfrage in `src/components/momente/karte/Einsatzkarte.tsx` und Umbruch in `src/components/kern/Hauptknopf.tsx` (Vorlauf, E4-W1-SICHT) | Baumeister | Haiku | 2 | M | Dateiliste aus FS-K ohne gemeinsame Dateien und ohne `src/inhalte/*`, vor dem Start hier eingetragen | FS-K, FS-FUGEN | Z-11 | offen | – |
| UM-E4-NBSP | Geschützte Leerzeichen vor Einheiten in den Inhaltsdateien (Teil der 101 Stellen; nicht in Kundenstimmen). Stellen in `src/config/*` als Liste melden | Baumeister | Haiku | 2 | M | src/inhalte/bad.ts, src/inhalte/bad-badsanierung.ts, src/inhalte/balkon-terrasse.ts, src/inhalte/barrierefreies-bad.ts, src/inhalte/blog.ts, src/inhalte/fliesen.ts, src/inhalte/galerie.ts, src/inhalte/kontakt.ts, src/inhalte/leistungen.ts, src/inhalte/orte.ts, src/inhalte/referenzen.ts, src/inhalte/start.ts, src/inhalte/ueber-uns.ts, src/inhalte/meta/* | EP3, CHOR-FIX | Z-11 | offen | – |
| UM-E4-LEISTUNG | BUDGETS auf den übrigen 11 Hauptansichten nach dem Muster von E3-LEISTUNG; zuerst `/standorte/wetzlar` (Leistung mobil 81) und `/blog` (87); dazu Platzhalterhöhe von `spaet-zeichnen` (50rem) für lange Abschnitte wie die Galerie auf `/referenzen` (axe-Messartefakt, E-087) | Orchestrator | Opus | 3 | M | Dateiliste aus E3-LEISTUNG und LCP-K ohne Dateien von NBSP und FS, vor dem Start hier eingetragen | E3-LEISTUNG, CHOR-FIX | Z-10, Z-07 | offen | – |
| UM-E4-VIDEO | Video-Sitemap verweist auf fehlende Datei: Eintrag entfernen mit Vermerk (G4) | Orchestrator | Opus | 3 | M | src/app/video-sitemap.xml/route.ts | – | Z-02 | offen | – |
| UM-E4-DOK | README und EINRICHTUNG auf Stand: Seitenzahl, KERN-Version, Node, entfernte Komponenten | Dokumentar | Haiku | 1 | S | README.md, _werkstatt/werkzeuge/EINRICHTUNG.md | E2 | Z-13 | erledigt (E-091) | – |
| UM-E4-B | Etappentor, Prüfstufe B aller Hauptansichten nach Prüfmatrix (Z-02, Z-04, Z-06 bis Z-11), Abgleich ABNAHME | Prüfer | Haiku | 1 | L | _werkstatt/belege/um-e4/ (neu), _werkstatt/berichte/UM-E4-B.md (neu) | alle E4 außer SICHT | Z-02, Z-04, Z-06 bis Z-11 | offen | – |
| UM-E4-SICHT | Sichtabnahme aller Hauptansichten durch frische Opus-Agenten (Rubrik Abschnitt 13) | Prüfer | Opus | 3 | L | _werkstatt/berichte/UM-E4-SICHT.md (neu) | E4-B | Z-05 | offen | – |

### E5 Abschluss
| Kennung | Ziel | Rolle | Modell | Stufe | Klasse | Schreibrechte | ab | Krit. | Status | Commit |
|---|---|---|---|---|---|---|---|---|---|---|
| UM-E5-C | Prüfstufe C vollständig nach der Spalte „Stufe C“ der Prüfmatrix in ABNAHME.md: Reinraum, Funktionsliste, Adressen, Lesbarkeit (Z-02); `werte.mjs` aller geänderten Dateien (Z-04); Endbilder für die Endprüfung (Z-05); Register, Bewegungsschalter, Bildrate (Z-06); Tastatur, Anker, Seitensuche, Zurück, Wiederherstellung, Cursor, INP (Z-07); alle SVG (Z-08); axe, Tastatur, Reflow, Zoom, erzwungene Farben (Z-09); Lighthouse Median aus drei (Z-10); Bildsatz mit Stichprobe von 10 %, mindestens fünf (Z-11); Probeläufe A1 bis A5 mobil und Desktop; WebKit und Firefox, wenn installierbar | Prüfer | Haiku | 1 | L | _werkstatt/belege/um-e5/ (neu), _werkstatt/berichte/UM-E5-C.md (neu) | E4 | Z-02, Z-04, Z-06 bis Z-11 | offen | – |
| UM-E5-BLIND | Vorher-Nachher-Bildsätze neutral benennen und mischen, Schlüssel getrennt | Dokumentar | Haiku | 1 | M | _werkstatt/bilder/abschluss/blind/ (neu), _werkstatt/bilder/abschluss/schluessel.json (neu) | C | Z-05 | offen | – |
| UM-E5-END | Endprüfung durch einen frischen Opus-Agenten: Rubrik, Blindvergleich, Belege aller Kriterien | Prüfer | Opus | 3 | L | _werkstatt/berichte/ABSCHLUSS-rubrik.md (neu), _werkstatt/berichte/ABSCHLUSS-belege.md (neu) | BLIND | Z-01 bis Z-13 | offen | – |
| UM-E5-GAL | Galerie als eigene Seite mit Vorher-Nachher-Paaren und Bildunterschriften | Dokumentar | Haiku | 1 | M | _werkstatt/bilder/galerie/ (neu) | END | Z-13 | offen | – |
| UM-E5-BER | BERICHT mit Vorführpfad. Anleitung zum Zusammenführen und Zurückrollen. KERN, UPGRADE und MENSCHEN vollständig. Abgleich PLAN gegen Commits (Z-01) | Orchestrator | Opus | 3 | M | _werkstatt/BERICHT.md, _werkstatt/ZUSAMMENFUEHREN.md (neu), _werkstatt/KERN.md, _werkstatt/UPGRADE.md, _werkstatt/MENSCHEN.md, _werkstatt/PLAN.md | GAL | Z-01, Z-13 | offen | – |
| UM-E5-KONT | Kontingent-Nachweis: Fensterprotokoll vollständig, jedes Fenster gegen Z-12 bewertet, Kalibrierpunkte und Kosten je Klasse. Die 30-Minuten-Zeile führe ich über den ganzen Lauf | Orchestrator | Opus | 3 | M | _werkstatt/KONTINGENT.md | BER | Z-12 | offen | – |

## Kür (nach Wirkung)
| Kennung | Ziel | Rolle | Modell | Klasse | Kriterium |
|---|---|---|---|---|---|
| UM-K01 | Teilen-Bilder (Open Graph) für die Hauptansichten aus dem Formsystem und echten Fotos | Grafiker | Haiku | M | Z-08 |
| UM-K02 | Favicon als SVG aus dem Formsystem (Raster bleibt Rückfall) | Grafiker | Haiku | S | Z-08 |
| UM-K03 | Lade-, Leer- und Erfolgssignaturen (Fuge zieht sich, Haken setzt sich) | Orchestrator | Opus | M | Z-06 |
| UM-K04 | Sticky-Szene „Schichtaufbau“ vertiefen (Aufbau, Wendung, Auflösung, rückwärts stimmig) | Orchestrator | Opus | L | Z-05 |
| UM-K05 | Weitere Bereichsseiten auf Erzählniveau (Stichprobe abseits der Hauptansichten) | Baumeister | Haiku | M | Z-05 |
| UM-K06 | `font-mono` auf Telefon, Maße und Zahlen beschränken (269 Stellen) | Baumeister | Haiku | M | Z-04 |
| UM-K07 | Dunkelmodus aus der OKLCH-Palette | Orchestrator | Opus | L | Z-11 |
| UM-K08 | Druckansicht für Ratgeber und Preise | Baumeister | Haiku | S | Z-11 |
| UM-K09 | Kann-Verlust EP-6: Blog- und CollectionPage-Strukturdaten | Baumeister | Haiku | S | Z-02 |
| UM-K10 | Zugänglichkeit über AA: `prefers-contrast`, Fokus noch deutlicher | Baumeister | Haiku | S | Z-09 |
| UM-K11 | Tests für teure Abläufe (Rückfall der Anfrageroute, Einwilligung) | Prüfer | Haiku | S | Z-02 |

Vor dem Start einer Kür-Zeile trage ich ihre exakte Dateiliste nach denselben Regeln ein.

## Offene Punkte
- Seitenwechsel B-01 ist eingefroren (E-078): Kein Paket ändert Ablauf, Dauer, Kurven, Logo oder Fliesen des Übergangs. MOD bindet nur den Bewegungsschalter an den bestehenden ruhigen Weg (Überblendung 150 ms).
- Erledigt (E-079): Z-10 TBT mobil aus Tor E2 ist nicht belegt verschlechtert (alle Differenzen in der E0-Spanne, wechselnde Reihenfolge). Formale Abnahme in UM-E3-LEISTUNG und Tor E5 mit derselben Methode.
