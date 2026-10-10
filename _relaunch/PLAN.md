# Plan · Tezgel-Aufwertung · Lauf 1 (angepasst), danach Lauf 2 bis zum Freigabepunkt A2

## Context

Du hast zwei Aufträge geschickt: Lauf 1 „Rückführung und Veredelung“ und Lauf 2 „Ausbau auf Showcase-Niveau“. Nachgeschoben kam: „Werte einfach die Webseite speziell für Fliesenverlegung Tezgel auf, nur noch für ihn das Repo, der Rest kann entfernt werden.“

- **Repo:** `umutcantezgel-cpu/tezgel` (öffentlich), Next.js 16.3.6 (App Router, Turbopack, SSG), React 19, Tailwind 4.3. Deutsch, kein Dunkelmodus, keine i18n.
- **Vercel** ist mit GitHub verbunden: Ein Push auf `main` geht live auf www.tezgel.de, andere Branches bekommen eine Vorschau. Beleg: vercel[bot] in umutcantezgel-cpu/tezgel#2; der Commit-Status „Vercel – tezgel“ ist per GitHub lesbar.
- `_relaunch/` existiert nicht. Lauf 1 beginnt bei P0. Lauf 2 verlangt den ABSCHLUSS von Lauf 1 (A0) und schließt direkt an.
- **Ziel:** eine eigenständige, messbar bessere Tezgel-Website ohne KI-Einheitslook, im Repo nur noch Tezgel. Danach der Showcase-Ausbau bis zu seinem Freigabepunkt.

### Deine Entscheidungen (Chat, 10.10.2026) – sie gehen den Einstellungen der Aufträge vor
| Thema | Auftrag | Jetzt gilt |
|---|---|---|
| Ablauf Lauf 1 | Rückführung und Veredelung | **Nur aufwerten.** P1 Verlustatlas entfällt. Z-01 und Z-02 stehen als „ENTFÄLLT – Entscheidung des Auftraggebers“ (mit Zitat) in ABNAHME.md; das ist keine AUSNAHME. Tezgel-Stände in Git dienen nur zum Nachschlagen. |
| Aufräumen | G4: entfernen nur mit Ersatz | **Entfernen erlaubt**, mit Protokoll, für: (a) Reste der Vorgängerfirma · (b) Prompt- und Pipeline-Dokumente · (c) Export-Ordner · (d) Logs, Vorlagen, Altkonfig. Für Gestaltungsmerkmale (WaterCursor, Marquee, Glow-Orbs …) gilt G4 weiter: Ersatz oder begründeter Eintrag in ENTSCHEIDUNGEN.md. |
| Push | nie | **Nach jeder Welle auf `main` (= live)**, nur nach grünem Tor (siehe „Push-Tor“). Sinngemäß auch in Lauf 2; am Freigabepunkt A2 änderbar. |
| Branch | `relaunch/rueckfuehrung-veredelung` | **`main`.** Der Sitzungs-Branch `claude/kind-franklin-5y6s1d` dient nur als Vorab-Prüfstand für die Vercel-Vorschau vor jedem main-Push. |
| Freigabe Lauf 1 | Halt nach P2 | **Vollautonom.** Die Richtung wird per Denkprotokoll festgeschrieben. |
| Lauf 2 | – | **Direkt anschließen.** Halt nach A2 (`WARTET AUF FREIGABE`). |
| `_relaunch/` | nur lokal | **Ins Repo**, mit zwei begründeten Einschränkungen (siehe unten). |

**Zwei Abweichungen, die ich vorschlage, weil das Repo öffentlich ist:**
1. **Heikle Details nicht öffentlich.** Sicherheitslücken (offenes `/api/indexnow`, Inhalts-Override per localStorage, Lead-Fallback) und rechtliche Angriffsflächen (KI-Fotos als eigene Arbeit, unbelegte Behauptungen, Lücken in der Datenschutzerklärung) stehen nur in `_relaunch/intern/`. Der Ordner ist per `.git/info/exclude` ausgeschlossen. Du bekommst die Details im Chat und im Morgenbericht; das committete MENSCHEN.md verweist nur neutral darauf.
2. **Belege in vertretbarer Menge.** Ins Repo kommen alle Belege, auf die MESSUNGEN, ABNAHME oder BERICHT verweisen: Hauptseiten und je Vorlage zwei Seiten, als JPEG q70 bei DPR 1, dazu Kontaktbögen, Lighthouse-Mediane als Zahlen, Bildfolgen und Aufzeichnungen. Massen-Rohaufnahmen (über 4.000 Bilder je Volltest) bleiben im lokalen Cache; aus jeder Commit-Kennung lassen sie sich neu erzeugen. Grenzen: keine Datei über 5 MB, höchstens 50 MB je Push.

**Unverändert gilt der Rest beider Aufträge:**
- UNANTASTBAR: Logo, Rechts- und Fließtexte, Geschäftslogik.
- G5-Anfragesperre; keine Rückfragen außer an Haltepunkten; nichts Erfundenes.
- Opus 5.5 orchestriert und urteilt, Haiku 5.5 arbeitet zu; PARALLELITÄT 5.
- Budgets, ANSICHTEN, Slop-Katalog, L0–L8.
- Der CLAUDE.md-Block wird nie committet; die Commit-Routine bricht ab, wenn `CLAUDE.md` gestaged ist.

## Befunde der Exploration (Ausgangsstand 5a7a7b0)

- **Routen:** 76 Seitendateien (70 statisch, 6 dynamisch), ergibt 170 HTML-Seiten. Sitemap 163 URLs, lokal wie live.
- **Grundmenge:** 70 statische + `leistungen/[id]` 4 + `[id]/[stadt]` 10 + `standorte/[stadt]` 10 + `blog/[slug]` 10 + `musterbaeder/[slug]` 10 + `referenzen/[id]` 6 = **120 Seiten**.
- **Hauptseiten (ab P0 fest):** `/`, `/bad`, `/leistungen`, `/standorte`, `/blog`, `/ueber-uns`, `/kontakt`.
  - Erzählseiten: `/`, `/bad`, `/leistungen`, `/standorte`, `/ueber-uns`.
  - Arbeitsseiten: `/blog` (Liste), `/kontakt`.
- **Gestaltung:** Orange/Rot/Grau, Inter + Plus Jakarta Sans (`next/font/google`).
  - `tokens.css` überschreibt Tailwind-Farben: `slate` wird grau, `red-500/600` wird orange.
  - 498 `rounded-tile-*`-Klassen sind wirkungslos.
  - Undefinierte Klassen: `eyebrow-orange` 97, `ambient-glow-warm` 32.
  - Etwa 340 freie Werte.
  - Glow-Orbs 161, Verlaufstext 94, `icon-chip` 135, Badge über der Einstiegsüberschrift auf 73 von 76 Seiten, zentrierter Einstieg mit zwei Knöpfen auf 60, Marquee, Bento-Raster, Sparkles-Icon 92.
  - Der Hamburger ist auch am Desktop sichtbar.
  - `html { scroll-behavior: smooth }` braucht unter Next 16 `data-scroll-behavior`.
- **Icons/SVG:** lucide in 122 Dateien (133 Icons, `iconMapper` löst Konfig-Strings auf), Phosphor nur für Social-Logos, `TileCraftIcons.jsx`. Die Logo-SVGs sind PNG-Hüllen; das Logo wird als WebP gerendert (unantastbar).
- **Bewegung:** framer-motion in 7 Dateien; das Paket `motion` wird nie importiert. WaterCursor (WebGL-Nachlaufcursor). WhatsApp-Bubble und Cookie-Banner mit Wurfphysik. Keine View Transitions, kein Register.
- **Funktionen:**
  - Neun Formulare posten an `POST /api/anfrage` (Resend-Mock ohne Key, Zod, Honeypot, `_t` ≥ 1,5 s, Rate-Limit 5 pro 10 min pro IP, Doppel-Sperre 60 s).
  - Dazu WhatsApp, Karten hinter Marketing-Einwilligung, `/api/indexnow`.
  - Login ist deaktiviert. Keine Zahlungen.
  - Tests: `npm test` (17, braucht Node ≥ 22.6), `qa:graph`, `lint`, `typecheck`. Keine Git-Hooks.
- **Fremdreste:**
  - Im Baum steht nirgends „Batherm“ oder „Haustechnik“. Reste stecken in Dateien.
  - `CookieConsentExport/` stammt aus dem fremden Projekt „MS Schlüsseldienst“.
  - `build_*.txt` sind Logs von „baris-haustechnik“; `.gitignore.old` ist die Vite-Vorlage.
  - `netlify.toml` und `Dockerfile` beschreiben das Vite-SPA; `.github/workflows/deploy.yml` (Node 18, `dist/`) scheitert bei jedem `v*`-Tag.
  - `SECURITY.md` beschreibt die alte Authentifizierung.
  - Wurzel-`fonts.css` und `src/styles/index.css` sind ungenutzt.
  - `src/config/routes.js` und `createPageUrl` (`/energieberatung`) sind ungenutzt.
  - `public/llms.txt` ist tot (live liefert die Route) und behauptet „Meisterbetrieb“.
  - Ungenutzte Abhängigkeiten: `motion`, `vanilla-cookieconsent` sicher; `@radix-ui/react-slot`, `@tanstack/react-query`, `class-variance-authority`, `dompurify` per knip prüfen.
- **Nicht löschen:**
  - Coday-Credits (deine Agentur, teils Rechtstext) und Formularoptionen wie „Fußbodenheizung“ (Fliesenthema).
  - `public/4c6796df…txt` (IndexNow-Schlüssel), `google831a76ab6f34b9f6.html` (Search-Console-Bestätigung), `humans.txt`.
  - Logo-Ordner, E-Mail-Vorlagen, `icon.png`.
- **Verwaiste Tezgel-Komponenten** (TrustBadges, TrustSignals, ContactSection, TiltCard, AnimatedNumber, OptimizedImage, ContactMapWrapper, BlogComments, Lightbox, FloatingDock, RotatingText, `common/GoogleMap`, LaserLevelLine …) werden im zuständigen P4- oder P5-Paket mit Protokoll entfernt oder wiederverwendet.
- **URLs:** Es gibt keine Weiterleitungen. Batherm-Pfade (`/heizung/*`, `/haustechnik/*`, `/lueftung/*`, `/energie/*`, `/gewerbe/*`, `/energieberatung`, `/notdienst`, 13 HVAC-Blogslugs, `/referenzen/project-00x`) liefern 404. Tezgel-Umbenennung: `/bad/budgetkalkulator` → `/bad/projekt-check`. Die URLs der Original-tezgel.de sind unbekannt (Wayback gesperrt); ein Search-Console-Export kommt nach MENSCHEN.md.
- **Wahrheit und Recht → `_relaunch/intern/`:**
  - Alle 11 Fotos sind offenbar KI-generiert (Gemini: C2PA-Kennzeichen, sichtbares Wasserzeichen) und werden per Alt-Text als eigene Arbeit ausgegeben. Wasserzeichen werden **nicht** weggeschnitten oder retuschiert.
  - Die Referenzen sind Platzhalter.
  - Die Datenschutzerklärung nennt Resend, Vercel, Maps, GA4 und Meta nicht.
  - Erstbesuch-Fehler in der Einwilligung.
  - BookingCalendar verliert Datum und Uhrzeit.
  - Lead-Fallback auf Vercel wirkungslos.
  - Behauptungen: „#1 Fachbetrieb“, „Meister-Erfahrung“ (2 Stellen), „DIN 18534 zertifiziert“ (in die Metadaten zurückgekehrt), „Fliesenausstellung“.
  - Öffnungszeiten widersprüchlich; „5,0 / 27“ siebenmal von Hand eingetragen; „über 15 Jahre“.
  - Die Video-Sitemap nennt Videos, die es nicht gibt.
  - Lizenz des Maskottchens unklar.
- **Umgebung:**
  - 4 CPUs, 15 GB RAM, 30 GB frei.
  - Node 22.22 (`.nvmrc` sagt 20 und bleibt; Grund in ENTSCHEIDUNGEN.md).
  - Playwright 1.56.1 mit Chromium 1194 unter `/opt/pw-browsers`. WebKit und Firefox sind nicht installierbar, die Geräteprobe geht an einen Menschen.
  - npm erreichbar; Live-Seite lesbar; Wayback gesperrt; PageSpeed-API ohne Key liefert 429.
  - Der Klon ist flach.

## Orchestrierung (alle Phasen)

- **Pakete:**
  - Bis zu 5 Hintergrund-Unteragenten über das Agent-Werkzeug, Modell je Paket ausdrücklich: `haiku` für Stufe 1–2, `opus` mit `effort: high` für Stufe 3.
  - Briefing nach dem Paket-Bauplan in `_relaunch/pakete/<Kennung>.md`, Rückgabe daneben.
  - Exakte Schreibrechte. Gemeinsame Dateien schreibt nur der Orchestrator: `globals.css`, `tokens.css`, `layout.tsx`, `next.config.ts`, `navigation.js`, Konfiguration, KERN.
  - Jedes Briefing verbietet: `next build`/`start`, `npm run indexnow`, POST per curl, Commits.
- **Prüf- und Urteilspipelines** laufen als Workflow mit ausdrücklichem `model` je Agent: Jury zu dritt mit Lockvogel und Blindvergleich, Slop-Jäger plus Opus-Gegenprüfer, Gegenprüfer. Workflows laufen auf 4 CPUs mit höchstens 2 Agenten gleichzeitig, deshalb geht Massenarbeit über das Agent-Werkzeug.
- **Messfenster:** Während Build, Lighthouse, Bewegungs- und Pixelmessung läuft kein Unteragent.
- **Push-Tor** (nach jeder Welle, nacheinander):
  1. `git status --porcelain` darf keine unverfolgten Dateien unter `src/`, `public/` und Root-Konfig zeigen.
  2. Commits je Paket mit Kennung und Attributionszeilen; Abbruch, wenn `CLAUDE.md` gestaged ist.
  3. **Reinraum-Build** aus `git worktree add <scratchpad> HEAD`: `npm ci && npm run build && typecheck && lint && test && qa:graph`. Dazu die Routentabelle (○/●/ƒ) gegen den Ausgangsstand und `.nft.json` ohne `_relaunch`.
  4. Wellenprüfung am lokalen `next start -H 127.0.0.1`:
     - betroffene Playwright-Tests
     - Text-Invarianten: `main`-Text, Überschriften, Rechtstexte, Meta-Titel und -Beschreibung, Alt- und FAQ-Texte gegen den Ausgangsstand; erlaubt sind nur die Mikrotexte, die im Paket freigegeben sind
     - SEO-Invarianten (`seo-invarianten.mjs`): Sitemap-Menge, Canonical, robots, JSON-LD-Hash, H1, interner Linkgraph
     - Logo-Hash
     - axe der betroffenen Seiten
     - Überlauf bei 320/360/390/768/1024/1280/1440
     - Pixelvergleich außerhalb der Welle; bei globalen Wellen stattdessen Invarianten und Jury-Stichprobe
  5. `git fetch origin main`. Hat sich main bewegt: Merge-Commit (kein Rebase, kein Force), dann Tor neu.
  6. Push auf `claude/kind-franklin-5y6s1d`, dann den Vercel-Status per GitHub abwarten (alle 20 s, höchstens 10 min).
  7. Ist er grün: `git push origin HEAD:main`. Danach Produktionsstatus abwarten und Live-Rauchtest:
     - `<meta name="x-build">` mit `VERCEL_GIT_COMMIT_SHA` gleich dem gepushten Commit (die Meta-Zeile kommt in W0)
     - Hauptseiten 200, `/gibt-es-nicht` 404
     - `/sitemap.xml`, `/robots.txt`, `/llms.txt` erreichbar
     - keine Konsolen-, CSP- oder Hydrationsfehler
     - höchstens 1 Anfrage pro Sekunde, über die Anfragesperre
  8. Ist der Live-Stand kaputt: Revert-Commit, Push, Ursache finden, Test ergänzen.
- **Gedächtnis:**
  - `STATUS.md` und `PRUEFPUNKT.md` nach jedem Paket; stündliche Protokollzeile.
  - L6 in `_relaunch/LERNEN.md`, fließt in die Paketvorlage zurück.
  - Morgenbericht als Routine `create_trigger` mit `CRON_TZ=Europe/Berlin 52 6 * * *`, an diese Sitzung gebunden; am Halt oder bei P7 löschen.
  - Der CLAUDE.md-Block `<!-- RELAUNCH -->` dient der Wiederaufnahme.

## Lauf 1 – Phasen

### P0 Sicherung und Lagebild
1. **Sicherung:**
   - `git fetch --unshallow origin`, dann `git checkout -B main origin/main`.
   - Sicherung = Commit-Kennung 5a7a7b0 plus Archiv `_relaunch/sicherung/ausgangsstand.tar.gz` (lokal, ignoriert).
   - Der Arbeitsbaum ist sauber, deshalb kein Ausgangsstand-Commit.
2. **Arbeitsdateien:**
   - `_relaunch/AUFTRAG.md` (Lauf 1, wörtlich) und `_relaunch/ausbau/AUFTRAG.md` (Lauf 2, wörtlich).
   - STATUS (Annahmen, drei Sätze Schärfung), PRUEFPUNKT, ENTSCHEIDUNGEN (Tabelle oben), MENSCHEN, `intern/`, NEBELKARTE, MESSUNGEN, TEXTVORSCHLAEGE, BERICHT, LERNEN und die Ordner.
   - CLAUDE.md-Block einfügen.
   - **Erster Commit (Infrastruktur):**
     - `.gitignore`: `**/node_modules/`, `test-results/`, `playwright-report/`, `_relaunch/sicherung/`, `_relaunch/cache/`, `_relaunch/intern/`, Lighthouse-JSON
     - `.vercelignore` mit `_relaunch`
     - ESLint-Ignore und tsconfig-`exclude` für `_relaunch`
     - `@source not "../../_relaunch";` in `globals.css`
     - `x-build`-Meta
     - Danach Push-Tor; das ist der erste Live-Push und funktional neutral.
3. **Technik:**
   - `npm ci`; die Next-16-Dokumentation in `node_modules/next/dist/docs/` lesen, mit Prüfliste:
     - `next/font/local` (wörtliche Pfade, `adjustFontFallback`)
     - `preload` statt `priority`, `images.qualities`
     - `experimental.viewTransition` + `<ViewTransition>`
     - `data-scroll-behavior`
     - Inline-Head-Skript plus `suppressHydrationWarning`
     - `proxy.ts`, `redirects()`
     - `turbopack`- neben `webpack`-Schlüssel
   - Start über `next start -H 127.0.0.1 -p 4310` und `next dev`; kein statischer Server, weil es kein `output: export` gibt.
   - Funktionsliste als Bestandsschutz. Grundmenge und Hauptseiten festschreiben.
   - Neuatlas je Seite (Abschnitte, Komponenten, SVGs, Bewegungen, Slop-Fundstellen): Haiku-Kundschafter, Opus prüft Stichproben. Er ersetzt den Verlustatlas als Grundlage des Mengengerüsts.
4. **Werkzeuge** in `_relaunch/werkzeuge/`:
   - Eigene `package.json`, installiert mit `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.
   - `@playwright/test@1.56.1`, `@axe-core/playwright`, `lighthouse` (`CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, `--headless=new --no-sandbox`, `benchmarkIndex` notiert), `pixelmatch`/`pngjs`, `svgo` (zwei Konfigurationen), `knip`.
   - Eigene Skripte:
     - **Anfragesperre:**
       - schreibende Methoden blockiert
       - Attrappe für `/api/anfrage`
       - Hosts GA, GTM, Facebook, Vercel-Insights, Maps, OSM, WhatsApp, IndexNow gesperrt
       - `window.open` gestubbt
       - harter Abbruch, wenn die baseURL nicht 127.0.0.1 ist
     - Text-Invarianten, SEO-Invarianten
     - Freie-Werte-Lint (Klassen `-[…]`, Hex, rgb, ms) plus `getComputedStyle`-Stichprobe
     - SVG-Prüfung, Überlaufprüfung
     - Bewegungsmessung: `getAnimations`, Bildfolgen; Framezeiten bei 4× CPU-Drosselung per CDP ohne `page.clock`; LoAF-Observer; Register-Abgleich
     - Formulartests in zwei Schichten:
       - Attrappe per Route
       - echte Route im Mock-Modus mit eigener `x-real-ip` je Test, zufälligen Daten und ≥ 1,6 s Echtzeit; geprüft wird auf `mocked:true` und keinen `TEZ-BOT/SPAM-IGN`
   - **Fotoprotokoll, eingefroren:** DPR 1, feste Uhrzeit, Einwilligung im Erstbesuchszustand und als „abgelehnt“, Masken für Öffnungsstatus, Kalender, Jahr, Karussell. Dazu eine rollende Referenz für den Pixelvergleich, getrennt vom P0-Vorher-Satz.
5. **Messbasis des Ausgangsstands** (vor dem Aufräumen):
   - Fotos der Grundmenge in 4 Ansichten.
   - Lighthouse mobil und Desktop als Median aus 5 je Hauptseite, Erstbesuch mit Banner.
   - axe auf allen Seiten, inklusive offenem Menü und Fehlerzustand.
   - Bündel- und Schriftgrößen, Konsolenfehler.
   - Slop-Zählung: hart per Skript, weich per Katalog und Opus-Gegenprüfung.
   - Jury-Ausgangswert je Hauptseite (3 frische Opus).
   - Alles in MESSUNGEN.md mit Bedingungen.
6. ABNAHME.md (Z-01 bis Z-14; Z-01/Z-02 ENTFÄLLT; Z-06 gegen die Live-Sitemap, die Batherm-Pfade und die Umbenennung) und NEBELKARTE.md.
7. **W0 „Aufräumen“:**
   - Rest ist positiv definiert: Er nennt die Vorgängerfirma oder ein Fremdprojekt, oder er ist ein Gewerk, das Tezgel nicht anbietet, belegt per `git log -S`. Dazu die freigegebenen Dateigruppen.
   - Haiku listet Funde mit Fundstelle; knip, Build und Typprüfung bestätigen „ungenutzt“; ein Opus-Gegenprüfer bestätigt jede Löschung.
   - Entfernt werden die Liste oben, `deploy.yml` und ungenutzte Abhängigkeiten per `npm uninstall`. Der Lockfile-Diff darf nur entfernen; `optimizePackageImports` wird bereinigt.
   - Reste in Fließtext löscht W0 nicht, sie gehen nach TEXTVORSCHLAEGE.
   - Das Archiv ist die Commit-Kennung plus eine Pfadliste in ENTSCHEIDUNGEN.md, ohne Kopie in `_relaunch`.
   - Tor: Diff der CSS-Selektoren, Pixelvergleich über alle 120 Seiten; dann Push-Tor.
- **Phasentor:** Plattform läuft, Sicherung belegt, Messbasis vollständig, W0 live und grün.

### P1 Verlustatlas → ENTFÄLLT (deine Entscheidung)

### P2 Richtung und Plan (vollautonom)
- **Marke (Annahme):** Fliesenverlegung Tezgel, Deniz Tezgel, Aßlar, seit 2008, HWK Wiesbaden. Zielgruppe: Eigentümer in Mittelhessen mit Bad- oder Bodenprojekt. Gefühl: ruhige Präzision, ehrliches Handwerk, Verlässlichkeit.
- **Fünf Besucheraufgaben (Annahme):**
  1. Passende Leistung finden.
  2. Vertrauen prüfen.
  3. Aufmaß oder Anfrage stellen.
  4. Eigenen Ort prüfen.
  5. Ablauf, Förderung und Planung verstehen.
- Jede Seite wird als Erzähl- oder Arbeitsseite eingeordnet.
- **Drei Richtungen** von drei frischen Opus-Agenten, jede aus einem anderen Markenaspekt, zum Beispiel Fugenraster und Präzision · Material, Licht und Großformat · Aufmaß und Werkstatt. Jede wird eine Stilkachel `_relaunch/richtungen/{A,B,C}/index.html` (eine Datei, Schriften eingebettet):
  - Leitidee
  - Schriften: offene Lizenz, woff2 mit OFL-Vermerk; nicht Inter, Space Grotesk oder Playfair
  - Palette mit Kontrastwerten, Raster
  - Beispielabschnitt mit echtem Tezgel-Inhalt
  - Bewegungsprobe, SVG-Motiv
  - Fotos in 4 Ansichten
- Jury 3 × 3 Opus (nur Bildmaterial, Lockvogel), dann Denkprotokoll, dann Wahl oder Verschmelzung in ENTSCHEIDUNGEN.md.
- **Weitere Denkprotokolle:**
  - Bewegungsarchitektur: CSS-first mit eigenem Modul, framer-motion entfernen, oder LazyMotion, oder GSAP; Budget ≤ 60 KB gzip.
  - Icon-Familie: eigenes Formsystem für den reduzierten Bestand, dazu eine Zuordnung der `iconMapper`-Strings.
  - WaterCursor: entfernen (S-09 Nachlaufcursor; WebGL ist in Lauf 1 nur bei „experimentell“ erlaubt), mit Ersatz-Begründung.
  - WhatsApp-Bubble: Funktion bleibt, Form nach KERN.
  - Cookie-Banner: nur die Darstellung, Inhalt und gleichwertige Knöpfe unverändert.
- KERN.md v1 (K-001–K-015, fünf Sätze, Register, Formsystem).
- Mengengerüst und Gesamtplan über L0 (Gegenprüfer und Vorab-Scheitern, ≤ 3 Runden).
- Schätzung 150–170 Pakete, also etwa 4–6 Tage (Formel aus dem Auftrag).

### P3 Durchstich – Referenzseite `/` (streng auf `/` begrenzt)
- Neue Schriften lädt nur das Modul von `/`: `.variable` am Seiten-Wrapper. Neue Tokens kommen additiv als `--k-*`; bestehendes `@theme` und `tokens.css` bleiben unverändert. **Pixeldiff 0 auf allen anderen Seiten.**
- Eigene Mobilkomposition.
- Bewegungsmodul `src/lib/motion/`; Inline-Head-Startklasse mit 2-s-Zeitlimit; das LCP-Element startet nie unsichtbar.
- Ein Signaturmoment; Formsystem-Icons; alle Zustände.
- Funktionstests für HeroContactForm, PricingCalculator und Funnel. Die vier Anfrage-Einstiege werden klarer angeordnet, keiner fällt weg.
- Die vorab angehakte Einwilligungs-Checkbox im PricingCalculator: Ich schlage vor, sie im Zuge der Zustandsgestaltung auszuschalten (Fairness-Leitplanke, Rang 1). Protokoll in ENTSCHEIDUNGEN.md, Prüfhinweis an dich.
- **Tor:** Alle seitenbezogenen Z-Kriterien auf `/`.

### P4 Fundament (globaler Umstieg)
- Tokens als Skalen, globale Schriften, `--k-*` werden zur Wahrheit.
- Tote Klassen (`rounded-tile-*`, `eyebrow-orange`, `ambient-glow-warm`) bleiben wirkungslos und werden nie definiert. P5 entfernt sie je Cluster; ihre Zahl darf nur sinken.
- Header und Mega-Menü, MobileMenu (Hamburger nur mobil), Footer, MobileBottomBar.
- Basiskomponenten mit allen Zuständen.
- Fokus über `outline` (übersteht forced-colors), `scroll-padding-top`, `#main-content` mit `tabindex="-1"`, `data-scroll-behavior`.
- 404 mit Charakter und Status 404.
- View Transitions: Fokus auf die h1 nicht beim ersten Laden, nicht bei Hash oder Zurück; kein doppelter Route-Announcer.
- Icon-Sprite.
- WaterCursor raus; WhatsApp-Widget und Banner neu gestaltet.
- **Wege:** `redirects()` mit 308 `/bad/budgetkalkulator` → `/bad/projekt-check` und `/blog/barrierefreies-bad-planung-zuschuesse` → `/bad/barrierefreies-bad`; 410 für die übrigen Batherm-Pfade über `proxy.ts`. hreflang ist N/A (nur Deutsch).
- **Tor:** Z-05, Z-11, Z-13 auf den Hauptseiten. Ein globaler Umstieg wird über Invarianten und Jury-Stichprobe geprüft; jede Abweichung wird im festen Format begründet.

### P5 Ausrollen (jede Welle schließt einen Cluster ab und geht live)
1. `/bad`-Cluster
2. `/leistungen` + `[id]` + `[id]/[stadt]`
3. `/standorte` + `[stadt]` + Karten
4. `/fliesen` + 13 Unterseiten + Konfigurator
5. Untergrund, Balkon, Naturstein, Treppen, Service
6. Blog
7. Musterbäder und Referenzen
8. Firmenseiten
9. Arbeitsseiten (kontakt, termin, faq, preise, login)
10. Rechtsseiten (nur Darstellung)

Dazu:
- Mikrotexte direkt; Wahrheitskorrekturen in Metadaten und Badges protokolliert („zertifiziert“ → „normgerecht nach DIN 18534“, „Meister-Erfahrung“, „#1“). Überschriften und Fließtext nur als Vorschlag.
- Ein Lauf ohne JavaScript je Welle; die Mutationsprobe an jedem Phasentor und bei jedem neuen Testtyp, im ruhigen Fenster, dateigenau zurückgesetzt.
- **Tor:** Z-03 bis Z-07, Z-09 bis Z-13.

### P6 Feinschliff und Signatur
- Mikrointeraktionen, Lade-, Leer- und Fehlerzustände, Auswahlfarbe, Favicon im Formsystem (das Logo bleibt), Teilen-Bilder.
- Zwei bis drei Signaturmomente.
- Konsistenzdurchgang.
- **Tor:** Z-08 (Jury ≥ 8,0, Blindvergleich ≥ 90 %), Z-01 bis Z-13 erneut.

### P7 Abnahme und Übergabe
- Volltest aller 8 Ebenen.
- BERICHT.md mit Galerie.
- KERN als Gestaltungsdokumentation; `docs/DESIGN_SYSTEM.md` und `README.md` werden ehrlich nachgezogen (das sind Mikro- und Dokutexte).
- Anleitung zum Zurückrollen über Revert-Commits.
- MENSCHEN.md vollständig.
- Ein frischer Gegenprüfer bestätigt jedes Häkchen, jedes ENTFÄLLT und jede AUSNAHME.
- CLAUDE.md-Block entfernen, Morgenbericht-Routine löschen, `STATUS · ABSCHLUSS`.

## Lauf 2 – A0 bis Freigabepunkt
- **A0 Übernahme und Lagebild:**
  - Voraussetzung: ABSCHLUSS in `_relaunch/STATUS.md`.
  - Sicherung, Block `<!-- AUSBAU -->`, neue Morgenbericht-Routine.
  - Messbasis des Endstands 1 in 6 Ansichten: Volltest, Jury mit Spitzenankern, Wow-Probe mit 5 frischen Haiku-Erstbetrachtern, Lighthouse, axe.
  - Schwerpunktseiten festlegen (voraussichtlich `/`, `/bad`, `/leistungen`).
  - ABNAHME.md (A-01–A-11), NEBELKARTE.md.
- **A1 Steigerungsanalyse:** Lückenliste je Schwerpunktseite (erster Bildschirm mit Einwilligungsbanner, Mobil und Desktop) und die Seiten, die beim Weiterklicken abfallen; ein frischer Gegenprüfer bestätigt.
- **A2 Richtungen und Drehbuch:**
  - Drei lauffähige Prototypen des ersten Bildschirms von `/` in `_relaunch/ausbau/richtungen` (A zuspitzen, B neu interpretieren, C bis an „spektakulär“ mit höchstens einem markenbezogenen WebGL- oder Canvas-Moment), mit Bildfolgen und Aufzeichnung.
  - Erstbetrachter und Jury bewerten, dann Denkprotokoll.
  - Drehbücher und Vorführpfad; KERN v2 und Plan über L0.
- **HALT:**
  - Übersicht im Chat (≤ 40 Zeilen), Prototypen und Aufzeichnungen per SendUserFile.
  - `WARTET AUF FREIGABE` in `_relaunch/ausbau/PRUEFPUNKT.md`, Routine löschen.

## Risiken
- **Live zwischen den Wellen:** P3 bleibt auf `/` begrenzt, P4 ist der globale Umstieg, P5 geht clusterweise vor. Vorab-Vorschau, Reinraum-Build, Live-Rauchtest, Revert.
- **Harte S-01-Behauptungen im unantastbaren Fließtext:** Sie gehen nach TEXTVORSCHLAEGE und MENSCHEN. Bleiben sie offen, wird Z-07 nach L7 zur AUSNAHME mit Begründung.
- **KI-Fotos:** Typografie und SVG-Formsystem tragen die Gestaltung. Ehrliche Alt-Texte, einheitliche Behandlung ohne Wasserzeichen-Kaschierung. Echte Baustellenfotos werden angefragt.
- **Messrauschen** im Container: Median aus 5, ruhiges Messfenster, Bedingungen notiert. Live-Lighthouse ist nicht maßgeblich.
- **Laufzeit, Nutzungslimits, Kontextverdichtung:** L5-Prüfpunkte im Repo, Paketvorrat, Fortsetzung nach dem Limit-Reset.

## Verifikation
- **Je Welle:** das Push-Tor oben, also Reinraum-Build mit allen `npm`-Prüfungen, die Playwright-Suiten (Funktion, Darstellung, Bewegung, axe, forced-colors, ohne JS), Invarianten-Skripte, dann Vorschau-Status, Produktionsstatus und Live-Rauchtest.
- **An Phasentoren:** Volltest über die 120 Seiten in 4 Ansichten (Lauf 2: 6), Lighthouse-Median aus 5 je Hauptseite, Jury zu dritt mit Lockvogel, Mutationsprobe, Gegenprüfer.
- **Abschluss:** frischer Gegenprüfer gegen ABNAHME.md, mit Beleg für jede Zeile.

## Vorrat (aus P0-Befunden, je mit Kriterium)
- V-01 (Z-13/Z-04, P5 W3): /standorte mobil – Info-Kasten der Karte überdeckt „Karte laden & zustimmen“; danach `test.fixme(isMobile…)` in funktion-einwilligung.spec.mjs entfernen.
- V-02 (Z-05, P5 W9): /kontakt – Hydrationsfehler #418, wenn Besuchstag ≠ Build-Tag (Kalender statisch vorgerendert) → Kalender clientseitig nach dem Mount rendern (Darstellung, keine Logik).
- V-03 (Z-11, P5): LeadQuickForm – Labels mit Feldern verknüpfen (htmlFor/id); Fehlerblöcke mit role="alert" (BadProjektCheck, FliesenKonfigurator, TezgelAnfrageFunnel).
- V-04 (Z-06, P4): Weiterleitungen/410 nach Plan.
- V-05 (Z-05/Mikrotext, P5): `tel:`-Ziel in DirectContactCard ohne Leerzeichen; feste Telefonnummern in BookingCalendar/LeadQuickForm aus COMPANY_DATA.
- V-06 (Z-05/Z-04, P4): Menü-Schalter wirkt erst nach der Hydrierung (Tippen davor bleibt wirkungslos); Drawer kann beim ersten Öffnen neu einhängen → Menü so bauen, dass es ohne JS/vor Hydrierung funktioniert (z. B. Navigation als Link zum Fußbereich/<details>-Fallback) und Zustand stabil bleibt.
