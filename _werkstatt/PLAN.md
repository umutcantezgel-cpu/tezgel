# PLAN · Lauf „Universal Motion“ · Fassung 2.0

Stand 27.10.2026, E1 (E-066, E-067, KERN v4.0). Plan des Vorlaufs: `archiv/PLAN-verstaendlich-echt-ausgezeichnet.md` (abgeschlossen bis Welle E4-W1, Rest geht in diese Fassung über, soweit er ein Kriterium dieses Laufs trägt). Ändert sich nur an Etappentoren.

## Mengengerüst
- Abhängigkeiten: 32 direkte (21 Projekt, 11 Werkzeuge) plus Laufzeit und Paketmanager; 20 mit neuerer stabiler Version (UPGRADE.md).
- Ansichten: 12 Hauptansichten (`HAUPTANSICHTEN.json`: 9 Erzähl- und Ortsansichten, 2 Wissensansichten, 1 Arbeitsansicht), 170 Adressen insgesamt, 93 Seitendateien.
- Komponenten: Bausteine `src/components/kern/` (rund 25), Vorlagen `src/components/vorlagen/` (4), Formulare (7 Abläufe).
- Grafik: 47 Icons im Sprite, 16 Inline-SVG, 3 SVG unter `public/`.
- Bewegung: 28 Registereinträge; neu Bewegungsschalter, Takt, Cursor (6 Zustände), Zeilenmasken; Eingang und B-01 nach Regeln v4.
- Übergänge: B-01 zwischen Erzählansichten, schlichte Überblendung zu und zwischen Arbeitsansichten.
- Sprachen: Deutsch (einzige Sprache).
- Neue Logik: Bewegungsschalter (Speicher, Kopfskript), Takt, Cursor-Zustandsmaschine, Ladeschwelle 300/500 ms, Ansichtsart im Linkfilter; je mit Test in `test/`.

## Modellanteil und Kapazität (Abschnitt 12)
- Kalibrierung: ein Fenster ≈ 50,7 USD (gewichtet nach Listenpreis, Faktor 1,973 %/USD, eher vorsichtig); Woche ohne Kalibrierung, 7-Tage-Kosten bisher 1.225 USD.
- Kosten je Klasse (gleitend): S Haiku ≈ 0,04 USD · M Haiku ≈ 0,1 bis 0,3 USD · L eigene Stufe-3-Arbeit ≈ 5 bis 10 USD je Paket (Opus-Kontext), frischer Opus-Agent ≈ 2,7 USD, Browserprüfung mit Juroren ≈ 45 USD.
- Pflicht: 48 Pakete, davon 15 der Klasse L (≈ 110 USD eigene Arbeit), 33 der Klassen M und S (≈ 5 USD), dazu vier Prüfstufen B/C mit Sichtabnahme und Endprüfung (≈ 130 USD) → ≈ 245 USD ≈ 5 Fenster. Tage = 5 Fenster / 3,5 Fenster je Tag × 1,2 ≈ 1,7 Tage; Kür danach, so weit die Woche trägt.
- Modellanteil: Haiku trägt alle Prüfungen, Messungen, Kundschaft, Upgrades nach Leitfaden und Bau nach Muster; Opus baut die Kernsysteme und nimmt ab.

## Etappen und Wellen (kritischer Pfad fett)
- **E2 Fundament – Stack-Upgrade** (Upgrade-Pakete nacheinander): **U01 → U02 → U03** → U04 → U05 → U06 → U07; parallel nur Pakete ohne Paketdateien (SVG-Inventar, Pixelwerkzeug). Tor: Z-03 erfüllt oder als AUSNAHME belegt, Bestand mindestens wie E0.
- **E3 Referenz `/`**: **DS → MOD → EIN → B01** → CURSOR, SCROLL, LEIT, SVG, ZUST, REG; Tor: Prüfstufe B für `/` und Sichtabnahme durch einen frischen Opus-Agenten mit Ansichtswert ≥ 8,5.
- **E4 Ausführung**: Übertrag auf die Vorlagen (alle Erzählansichten), Signaturmomente und Choreografie je Hauptansicht, Rückführung der Muss- und Soll-Verluste, Mikrotypografie, Feinschliff; Tor: Prüfstufe B und Sichtabnahme aller Hauptansichten.
- **E5 Abschluss**: Prüfstufe C, Endprüfung, BERICHT mit Galerie und Vorführpfad.

## Pflichtpakete
Spalten: Kennung · Ziel · Rolle · Modell · Stufe · Klasse · Schreibrechte · hängt ab von · Kriterium · Status · Commit

### E2 Fundament
| Kennung | Ziel | Rolle | Modell | Stufe | Klasse | Schreibrechte | ab | Krit. | Status | Commit |
|---|---|---|---|---|---|---|---|---|---|---|
| UM-E2-U01 | Node auf aktuelle LTS, npm gebündelt, `@types/node`, Mitziehen (`.nvmrc`, engines, packageManager, CI, README, EINRICHTUNG); Prüfung mit LTS-Binär im Scratchpad | Orchestrator | Opus | 3 | L | package.json, package-lock.json, .nvmrc, .github/workflows/security.yml, README.md, _werkstatt/werkzeuge/EINRICHTUNG.md | – | Z-03 | offen | – |
| UM-E2-U02 | TypeScript 6.0.x (7.x belegter Anlauf, Peer-Befund), tsconfig nachziehen | Orchestrator | Opus | 3 | L | package.json, package-lock.json, tsconfig.json, betroffene Typstellen | U01 | Z-03 | offen | – |
| UM-E2-U03 | next 16.4.3, react und react-dom 19.3.1, @types/react(-dom) 19.3.0, eslint-config-next 16.4.3; webpack/Turbopack, globalNotFound, imageSizes; Pixelvergleich | Orchestrator | Opus | 3 | L | package.json, package-lock.json, next.config.ts, betroffene Stellen | U02 | Z-03, Z-02 | offen | – |
| UM-E2-U04 | tailwindcss und @tailwindcss/postcss 4.3.3 | Upgrader | Haiku | 2 | S | package.json, package-lock.json | U03 | Z-03 | offen | – |
| UM-E2-U05 | zod 4.6.7, resend, lucide-react, tailwind-merge, @types/google.maps; Audit-Fixes sharp und source-map-js ohne `--force` | Upgrader | Haiku | 2 | M | package.json, package-lock.json | U04 | Z-03 | offen | – |
| UM-E2-U06 | eslint 9.39.5; zweiter Anlauf ESLint 10 ohne `--legacy-peer-deps` belegt | Upgrader | Haiku | 2 | S | package.json, package-lock.json, eslint.config.mjs | U05 | Z-03 | offen | – |
| UM-E2-U07 | Prüfwerkzeuge: @playwright/test, @axe-core/playwright, knip (Browser über `executablePath`) | Upgrader | Haiku | 2 | M | _werkstatt/werkzeuge/package.json, deren Lockfile | U06 | Z-03 | offen | – |
| UM-E2-PX | Pixelvergleich der zwölf Hauptansichten (vier Größen) als Werkzeug `werkzeuge/pixelvergleich.mjs` (pixelmatch), Basis 7ceb5e41 | Prüfer | Haiku | 1 | M | _werkstatt/werkzeuge/pixelvergleich.mjs | – | Z-03 | offen | – |
| UM-E2-SVGO | SVGO-Konfigurationen statisch und animiert, Inventar aller SVG mit Fixpunkt-Prüfung (nur Bericht und Konfiguration) | Grafiker | Haiku | 2 | S | _werkstatt/werkzeuge/svgo-*.config.mjs, _werkstatt/berichte/UM-E2-SVGO.md | – | Z-08 | offen | – |
| UM-E2-B | Etappentor: Prüfstufe B (Build, Typen, Linter, Tests, Suite, Bildsatz, axe, Lighthouse) und Audit | Prüfer | Haiku | 1 | L | _werkstatt/belege/um-e2/ | U07 | Z-02, Z-03 | offen | – |

### E3 Referenz `/` (gemeinsame Dateien schreibt nur der Orchestrator)
| Kennung | Ziel | Rolle | Modell | Stufe | Klasse | Schreibrechte | ab | Krit. | Status | Commit |
|---|---|---|---|---|---|---|---|---|---|---|
| UM-E3-DS | Designsystem v4: OKLCH mit Abstufung, sechs Dauer- und vier Kurvenstufen mit Aliasen, Bedeutungs-Tokens, `werte-regeln.json` nachgeführt | Orchestrator | Opus | 3 | L | src/app/globals.css, _werkstatt/werkzeuge/werte-regeln.json | E2 | Z-04 | offen | – |
| UM-E3-MOD | Bewegungsmodul: Bewegungsschalter (Kopfskript, Speicher, UI im Fuß und Menü), gemeinsamer Takt, Zeigerart; 11 rAF und Karussell-Intervall auf den Takt | Orchestrator | Opus | 3 | L | src/lib/motion/*, src/components/common/Footer.jsx, Menü, Karussell.tsx, test/ | DS | Z-06 | offen | – |
| UM-E3-EIN | Eingang ohne Vorhang: Logo baut sich im Kopf auf, H1-Zeilenmasken, LCP-Foto sofort sichtbar, ≤ 1,5 s, Zeitlimit 2 s, Wiederkehr kürzer (E-067-4) | Orchestrator | Opus | 3 | L | src/components/intro/*, src/lib/intro/*, Startbild, Einstieg-Vorlagen, bewegung.css | MOD | Z-06, Z-10 | offen | – |
| UM-E3-B01 | B-01 nach Regeln v4: Tippen beendet, Navigation beim Klick, Arbeitsansichten schlicht (Liste K-010), Fokus h1, Zurück und Scroll | Orchestrator | Opus | 3 | L | src/components/verlegen/*, src/lib/verlegen/*, test/ | MOD | Z-06, Z-07 | offen | – |
| UM-E3-SCROLL | scrollbar-gutter, overscroll, svh, scroll-margin, content-visibility, passive Listener, Speculation Rules für öffentliche Seiten | Orchestrator | Opus | 3 | M | src/app/globals.css, _dokument.tsx, ReadingProgress, TableOfContents | MOD | Z-07, Z-10 | offen | – |
| UM-E3-CURSOR | Fugenkreuz-Cursor nach K-007/K-008 mit sechs Zuständen, Register, Tests der Zustandsmaschine | Orchestrator | Opus | 3 | L | src/components/cursor/*, src/lib/motion/cursor.ts, test/ | MOD | Z-07 | offen | – |
| UM-E3-LEIT | Laserlinie als Leitfaden auf `/` mit Abschnittsmarke | Orchestrator | Opus | 3 | M | Leitachse, bewegung.css | MOD | Z-05, Z-06 | offen | – |
| UM-E3-REG | Register v4: Zweck, Stufen, reduziert, Cursor-Zustände in register.json/ts; `fugenband` entscheiden; Staffel `karte` ≤ 8 | Orchestrator | Opus | 3 | M | src/lib/motion/register.ts, _werkstatt/register.json, bewegung.css | CURSOR | Z-06 | offen | – |
| UM-E3-SVG | eine Icon-Familie (lucide in drei Datendateien durch Sprite-Namen), viewBox und title ergänzen, SVGO-Fixpunkte, Logo-SVG mit PNG ersetzen oder mit Vermerk entfernen | Grafiker | Haiku | 2 | M | src/config/blog.js, src/config/company.js, src/lib/formulare/useAnfrageFunnel.ts, src/components/icons/*, src/components/maps/RouteVisualization.tsx | SVGO | Z-08 | offen | – |
| UM-E3-ZUST | Zustände und Ladeschwelle: Muster in Knopf (Orchestrator), dann die sechs lückenhaften Bausteine | Baumeister | Haiku | 2 | M | je Baustein eine Datei laut Bericht UM-E0-DESIGN | DS | Z-04, Z-09 | offen | – |
| UM-E3-B | Referenztor: Prüfstufe B für `/`, Bildfolgen der neuen Momente, Sichtabnahme durch frischen Opus-Agenten (≥ 8,5) | Prüfer + Opus | Haiku/Opus | 1/3 | L | _werkstatt/belege/um-e3/ | alle E3 | Z-05, Z-06 | offen | – |

### E4 Ausführung
| Kennung | Ziel | Rolle | Modell | Stufe | Klasse | Schreibrechte | ab | Krit. | Status | Commit |
|---|---|---|---|---|---|---|---|---|---|---|
| UM-E4-VORL | Eingang, Zeilenmasken, Leitfaden und Cursor-Ziele in die Vorlagen (Erzähl-, Wissens-, Ortsseite) | Orchestrator | Opus | 3 | L | src/components/vorlagen/** | E3 | Z-05, Z-06 | offen | – |
| UM-E4-CHOR-01…11 | je übrige Hauptansicht: Choreografie (≤ 1 Auftritt mit Gewicht je Bildschirmhöhe, Auftritte auf ≤ 50 % der Abschnitte), Signaturmoment prüfen, Befunde melden | Prüfer | Haiku | 1 | S | _werkstatt/berichte/UM-E4-CHOR-<nr>.md | VORL | Z-05, Z-06 | offen | – |
| UM-E4-CHOR-FIX | Befunde der CHOR-Pakete umsetzen | Orchestrator | Opus | 3 | L | laut Befunden | CHOR | Z-05 | offen | – |
| UM-E4-NBSP | geschützte Leerzeichen vor Einheiten (101 Stellen, nicht in Kundenstimmen) | Baumeister | Haiku | 2 | M | src/inhalte/*, src/config/* außer reviews.js | E3 | Z-11 | offen | – |
| UM-E4-EP1 | Rückführung Aufbauten-Vergleich `/balkon-terrasse` (Muss, Wesen in neuer Form, Wortlaut aus der Historie, Garantiewörter nur nach M-07) | Orchestrator | Opus | 3 | M | src/inhalte/balkon-terrasse.ts, Vorlage | VORL | Z-02 | offen | – |
| UM-E4-EP2 | Rückführung Werte-Block `/ueber-uns` (Muss) | Orchestrator | Opus | 3 | M | src/inhalte/ueber-uns.ts | VORL | Z-02 | offen | – |
| UM-E4-EP3 | Rückführung Qualitätsversprechen auf den Hauptansichten (Muss, Wahrheit und M-07) | Orchestrator | Opus | 3 | M | Vorlagenteil, src/config | VORL | Z-02 | offen | – |
| UM-E4-EP4 | Service-Strukturdaten auf 47 Seiten (Soll) | Baumeister | Haiku | 2 | M | src/lib/schema*, betroffene Seiten | E3 | Z-02 | offen | – |
| UM-E4-EP5 | Stellenangebot `/karriere/ausbildung` (Soll) | Baumeister | Haiku | 2 | S | src/app/(bestand)/karriere/ausbildung/page.* | E3 | Z-02 | offen | – |
| UM-E4-FS | 17 geringe Befunde der Browserprüfung Runde 5 (`$SCRATCH/e4w1-browser-5/sicht.json`): Trennungen, Knöpfe, Formular `/standorte/wetzlar`, `/preise` | Baumeister | Haiku | 2 | M | laut Befund | E3 | Z-11 | offen | – |
| UM-E4-VIDEO | Video-Sitemap verweist auf fehlende Datei: Eintrag entfernen mit Vermerk | Orchestrator | Opus | 3 | S | src/app/video-sitemap.xml/route.ts | – | Z-02 | offen | – |
| UM-E4-DOK | README und EINRICHTUNG auf Stand (Seitenzahl, KERN-Version, Node, entfernte Komponenten) | Dokumentar | Haiku | 1 | S | README.md, _werkstatt/werkzeuge/EINRICHTUNG.md | E2 | Z-13 | offen | – |
| UM-E4-B | Etappentor: Prüfstufe B aller Hauptansichten, Sichtabnahme, Abgleich ABNAHME | Prüfer + Opus | Haiku/Opus | 1/3 | L | _werkstatt/belege/um-e4/ | alle E4 | Z-05 bis Z-11 | offen | – |

### E5 Abschluss
| Kennung | Ziel | Rolle | Modell | Stufe | Klasse | Schreibrechte | ab | Krit. | Status | Commit |
|---|---|---|---|---|---|---|---|---|---|---|
| UM-E5-C | Prüfstufe C mit Stichprobe (10 %, mindestens fünf), Funktionsliste, Probeläufe A1 bis A5 mobil und Desktop, Tastatur, Übergänge, Cursor, Reflow, Zoom, erzwungene Farben, Register, SVG, WebKit/Firefox wenn installierbar | Prüfer | Haiku | 1 | L | _werkstatt/belege/um-e5/ | E4 | alle | offen | – |
| UM-E5-BLIND | Vorher-Nachher-Bildsätze neutral benannt und gemischt, Schlüssel getrennt | Dokumentar | Haiku | 1 | M | _werkstatt/bilder/abschluss/ | C | Z-05 | offen | – |
| UM-E5-END | Endprüfung durch frischen Opus-Agenten (Rubrik, Blindvergleich, Belege aller Kriterien) | Opus | Opus | 3 | L | _werkstatt/berichte/ABSCHLUSS-*.md | BLIND | alle | offen | – |
| UM-E5-BER | BERICHT mit Galerie als eigene Seite, Vorführpfad, Anleitung zum Zusammenführen und Zurückrollen, MENSCHEN vollständig | Dokumentar + Orchestrator | Haiku/Opus | 1/3 | M | _werkstatt/BERICHT.md, _werkstatt/bilder/galerie/ | END | Z-13 | offen | – |

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
| UM-K09 | Kann-Verlust EP-6 Blog- und CollectionPage-Strukturdaten | Baumeister | Haiku | S | Z-02 |
| UM-K10 | Zugänglichkeit über AA: `prefers-contrast`, Fokus noch deutlicher | Baumeister | Haiku | S | Z-09 |
| UM-K11 | Tests für teure Abläufe (Rückfall der Anfrageroute, Einwilligung) | Prüfer | Haiku | S | Z-02 |

## Offene Punkte
- Keine.
