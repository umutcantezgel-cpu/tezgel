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
| Branch | `relaunch/rueckfuehrung-veredelung` | **`main`.** Kein Vorab-Push auf andere Branches (E-005: blockierte die Produktion); Vorprüfung ausschließlich über den Reinraum-Build. |
| Freigabe Lauf 1 | Halt nach P2 | **Vollautonom.** Die Richtung wird per Denkprotokoll festgeschrieben. |
| Lauf 2 | – | **Direkt anschließen.** Halt nach A2 (`WARTET AUF FREIGABE`). |
| `_relaunch/` | nur lokal | **Ins Repo**, mit zwei begründeten Einschränkungen (siehe unten). |

**Zwei Abweichungen, die ich vorschlage, weil das Repo öffentlich ist:**
1. **Heikle Details nicht öffentlich.** Sicherheits- und Rechtsbefunde stehen nur in `_relaunch/intern/`. Der Ordner ist per `.git/info/exclude` ausgeschlossen. Du bekommst die Details im Chat und im Morgenbericht; das committete MENSCHEN.md verweist nur neutral darauf.
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
  - `public/llms.txt` ist tot (live liefert die Route), Inhalt veraltet.
  - Ungenutzte Abhängigkeiten: `motion`, `vanilla-cookieconsent` sicher; `@radix-ui/react-slot`, `@tanstack/react-query`, `class-variance-authority`, `dompurify` per knip prüfen.
- **Nicht löschen:**
  - Coday-Credits (deine Agentur, teils Rechtstext) und Formularoptionen wie „Fußbodenheizung“ (Fliesenthema).
  - `public/4c6796df…txt` (IndexNow-Schlüssel), `google831a76ab6f34b9f6.html` (Search-Console-Bestätigung), `humans.txt`.
  - Logo-Ordner, E-Mail-Vorlagen, `icon.png`.
- **Verwaiste Tezgel-Komponenten** (TrustBadges, TrustSignals, ContactSection, TiltCard, AnimatedNumber, OptimizedImage, ContactMapWrapper, BlogComments, Lightbox, FloatingDock, RotatingText, `common/GoogleMap`, LaserLevelLine …) werden im zuständigen P4- oder P5-Paket mit Protokoll entfernt oder wiederverwendet.
- **URLs:** Es gibt keine Weiterleitungen. Batherm-Pfade (`/heizung/*`, `/haustechnik/*`, `/lueftung/*`, `/energie/*`, `/gewerbe/*`, `/energieberatung`, `/notdienst`, 13 HVAC-Blogslugs, `/referenzen/project-00x`) liefern 404. Tezgel-Umbenennung: `/bad/budgetkalkulator` → `/bad/projekt-check`. Die URLs der Original-tezgel.de sind unbekannt (Wayback gesperrt); ein Search-Console-Export kommt nach MENSCHEN.md.
- **Wahrheit und Recht:** Befunde I-01 bis I-18 stehen ausschließlich in `_relaunch/intern/BEFUNDE.md` (nicht öffentlich); MENSCHEN.md verweist neutral darauf.
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
  6. (entfällt nach E-005: kein Vorab-Push auf den Sitzungs-Branch.)
  7. `git push origin HEAD:main`. Danach Produktionsstatus abwarten und Live-Rauchtest:
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
- Mikrotexte direkt; Wahrheitskorrekturen in Metadaten und Badges protokolliert (Liste intern). Überschriften und Fließtext nur als Vorschlag.
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
- **Live zwischen den Wellen:** P3 bleibt auf `/` begrenzt, P4 ist der globale Umstieg, P5 geht clusterweise vor. Reinraum-Build, Live-Rauchtest, Revert (E-005). Überarbeitet in Gesamtplan Runde 2 (E-015).
- **Harte S-01-Behauptungen im unantastbaren Fließtext:** Sie gehen nach TEXTVORSCHLAEGE und MENSCHEN. Bleiben sie offen, wird Z-07 nach L7 zur AUSNAHME mit Begründung.
- **Bildmaterial:** Typografie und SVG-Formsystem tragen die Gestaltung. Ehrliche Alt-Texte, einheitliche Behandlung, keine Retusche. Echte Baustellenfotos werden angefragt.
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

---

# Gesamtplan P3–P7 (L0 Runde 1 · Kern v1 · 10.10.2026) — ERSETZT durch Runde 2 unten (P2-GEG-01)

## Mengengerüst
| Größe | Menge | Quelle |
|---|---|---|
| Seiten (Grundmenge) | 120 (76 Seitendateien: 70 statisch, 6 dynamisch → 170 HTML) | GRUNDMENGE.json |
| Codezeilen in Seitendateien | ≈ 20.600 (viele Abschnitte inline) | `wc -l` |
| Vorlagen (Seitentypen) | 13: Start · Cluster-Übersicht (bad, leistungen, fliesen, standorte, untergrund, balkon, naturstein, treppen) · Fachthema-Detail (≈ 35) · Leistung `[id]` · Leistung × Stadt · Stadt · Blog-Liste · Blog-Artikel · Musterbad/Referenz · Firmenseiten · Arbeitsseiten · Rechtsseiten · 404 | Atlas A01–A06 |
| Schale (global) | 8: Kopf, Mega-Menü, Mobilmenü, Fuß, untere Leiste, WhatsApp-Widget, Einwilligungsbanner, Sprunglink | A01 |
| Formulare/Rechner | 9 (F-01–F-09) + Karten-Platzhalter + FAQ + Karussell | FUNKTIONSLISTE |
| Gemeinsame Bausteine | 72 Komponentendateien, davon ≈ 35 Abschnitts-/UI-Bausteine | A06 |
| Icons | Bestand 133 lucide + Phosphor + 5 eigene → neu ≈ 30 im Formsystem (K-010) | statisch.json |
| Motive (SVG) | ≈ 14 Verlegepläne (6 Leistungen + 8 Fachgruppen) · 3 Muster · Fugenkreuz · Trenner · 404-Plan | K-010 |
| Bewegungen | 12 Registereinträge, 3 Signaturmomente | K-009 |
| Sprachen | 1 (de) | – |
| Tests | 289 Funktionsfälle (Bestand) + je Welle: Register-Abgleich, Zustände, axe, forced-colors, ohne JS, Überlauf, Pixelvergleich | werkzeuge/ |

## Bauweise
- Neues System lebt in `src/components/kern/` (Bausteine) und `src/lib/motion/` (Bewegung). P3 nutzt es nur auf `/`; bestehende gemeinsame Komponenten (FAQAccordion, FinalCTA, TrustStrip, ReviewCarousel …) bleiben für andere Seiten unverändert, bis ihre Welle sie auf das neue System umstellt; danach wird der alte Baustein mit Protokoll entfernt.
- Formulare (HeroContactForm, PricingCalculator, TezgelAnfrageFunnel …): Logik unverändert; neue Darstellung über eine Erscheinungs-Eigenschaft `erscheinung="kern"`, Standard bleibt alt, bis die letzte Seite umgestellt ist. Funktionstests laufen gegen beide.
- Seiten: Texte wörtlich übernehmen (Text-Invarianten je Welle), Struktur auf Vorlagen-Bausteine umstellen.

## Pakete und Wellen
### P3 Durchstich `/` (12 Pakete, alle mit Kern v1)
| Kennung | Inhalt | Wer | hängt ab von |
|---|---|---|---|
| P3-01 | Schriften `src/app/fonts/` (Archivo var, Plex Mono; latin + latin-ext; LIZENZEN.md), am Wrapper von `/` | Orchestrator | – |
| P3-02 | Tokens `--k-*` additiv (globals.css), Tailwind-Zuordnung additiv | Orchestrator | – |
| P3-03 | Bewegungsmodul `src/lib/motion/` + Head-Startklasse + Zeitlimit (layout.tsx) | Orchestrator | P3-02 |
| P3-04 | Icon-Komponente + Sprite (Grundbestand für `/`) | Opus | P3-02 |
| P3-05 | Motive: Verlegeplan Start, Fugenkreuz, Trenner, Muster | Orchestrator | P3-02 |
| P3-06 | Einstieg mit SIG-1 Kreuzlinie, Schriftfeld, Mobilkomposition | Orchestrator | P3-01–05 |
| P3-07 | Leistungsabschnitt mit Plan-Vignetten (SIG-3 vorbereitet) | Opus | P3-04/05 |
| P3-08 | Ablauf mit SIG-2 und Prüfhaken | Orchestrator | P3-03/05 |
| P3-09 | Vertrauen: Kundenstimmen mit Anriss, Einzugsgebiet/Karte | Opus | P3-04 |
| P3-10 | Anfrage-Einstiege (`erscheinung="kern"`): HeroContactForm, PricingCalculator (Vorab-Haken aus, E-014), Funnel, Abschluss; alle Zustände | Opus | P3-04 |
| P3-11 | FAQ, Großformat-Abschnitt, übrige Abschnitte von `/` | Haiku | P3-04 |
| P3-12 | Tor `/`: Funktion, axe, Fotos, Pixeldiff andere Seiten = 0, Jury, Slop, Lighthouse | Orchestrator | alle |

### P4 Fundament (14 Pakete) – globaler Umstieg
P4-01 Tokens global (`@theme`, `tokens.css`-Umdeutungen auflösen) · P4-02 Schriften global · P4-03 Kopf + Mega-Menü (Hamburger nur < lg) · P4-04 Mobilmenü (vor Hydrierung bedienbar, V-06) · P4-05 Fuß + Schriftfeld · P4-06 untere Leiste + WhatsApp-Widget (E-012) · P4-07 Einwilligungsbanner (E-013) · P4-08 Basisbausteine mit allen Zuständen (Knopf, Link, Feld, Auswahl, Checkbox, Akkordeon, Hinweis, Tabelle, Feldraster) · P4-09 Fokus, Sprunglink, `scroll-padding-top`, `#main-content tabindex=-1`, `data-scroll-behavior` · P4-10 404 mit Charakter · P4-11 View Transitions + h1-Fokus · P4-12 Icon-Sprite vollständig + `iconMapper`-Abbildung · P4-13 WaterCursor und MotionProvider raus (E-009, E-011) · P4-14 Wege: `redirects()` 308 + 410 über `proxy.ts` (V-04) · dazu P4-15 Vorlagen-Bausteine für Fachseiten (Einstieg, Faktenfeld, Tabelle, Ablauf, FAQ, Abschluss).

### P5 Ausrollen (10 Wellen, je 4–10 Pakete à 3–5 Seiten)
W1 Bad-Cluster (8 Seiten + BadanfrageFunnel, Projekt-Check) · W2 Leistungen + `[id]` + `[id]/[stadt]` (≈ 20 Seiten) · W3 Standorte + `[stadt]` + Karten (V-02 nicht hier) · W4 Fliesen + 13 Unterseiten + Konfigurator · W5 Untergrund, Balkon, Naturstein, Treppen, Reparatur, Schadensanalyse (≈ 20) · W6 Blog (Liste, Artikel, TBT/LCP) · W7 Musterbäder, Referenzen · W8 Firmenseiten · W9 Arbeitsseiten (kontakt + V-02, termin, beratung, faq, preise, downloads, login; V-03, V-05) · W10 Rechtsseiten (nur Darstellung). Jede Welle: alte Bausteine ohne Nutzer entfernen (knip), Slop-Zählung, Text-Invarianten, Push.

### P6 Feinschliff (≈ 10 Pakete)
Mikrointeraktionen, Lade-/Leer-/Fehlerzustände, Auswahlfarbe, Favicon im Formsystem (Logo bleibt), Teilen-Bilder, Konsistenzdurchgang, Signaturmomente schärfen; Tor Z-08 (Jury ≥ 8,0, Blindvergleich ≥ 90 %).

### P7 Abnahme (≈ 6 Pakete)
Volltest 8 Ebenen, BERICHT mit Galerie, KERN als Dokumentation, README/DESIGN_SYSTEM ehrlich, Rückroll-Anleitung, MENSCHEN vollständig, Gegenprüfer über ABNAHME.

## Summe, Kapazität, kritischer Pfad
- Pakete: P3 12 + P4 15 + P5 ≈ 70 + P6 10 + P7 6 ≈ **113**.
- Kapazität (Formel): Tage = 113 ÷ (5 × 4 Wellen/Tag) × 1,2 ≈ **6,8 Tage**.
- Kritischer Pfad: P3-01/02 → P3-03 → P3-06 → P3-12 → P4-01/02 → P4-08 → P4-15 → P5 W1…W10 (nacheinander, je Welle ein Push) → P6 → P7.
- Vorrat (V-01…V-06) ist den Wellen zugeordnet.

---

# Gesamtplan P3–P7 · L0 Runde 2 (Kern v1.1 · 10.10.2026, nach P2-GEG-01)

## Grundsätze (neu)
1. **Bauweise E-015:** Bestand liegt unverändert in `src/app/(bestand)/` (eigenes Root-Layout, altes CSS, alte Schriften), das Neue in `src/app/(kern)/` (eigenes Root-Layout, `kern-global.css`, Archivo/Plex, Kopfskript). Neue Seiten entstehen **ruhend** in `src/app/(kern)/_entwurf/<route>/` (nicht geroutet) und werden mit einem **Freischalt-Commit** live (verschieben nach `(kern)/<route>`, `(bestand)/<route>` entfernen). Kein globaler Umstieg, keine gemischten Seiten live.
2. **Push:** Jede Welle pusht ruhenden Code nach grünem Reinraum-Tor (E-000, E-005). Jede Freischaltung pusht erst nach grünem **Kandidat-Tor** (Reinraum-Kopie + dasselbe Freischalt-Skript = späterer Live-Stand).
3. **Kandidat-Tor** (je Freischaltung): Reinraum (`npm ci`, Build, Typen, Lint, Test, qa:graph, Routen, Tracing) · Funktionstests aller betroffenen F + Test-Sperrklinke · Text v2 (Build-HTML + Zustände; nur Einträge aus `MIKROTEXTE.md` dürfen abweichen; „hinzu“ in Überschriften rot) · SEO-Invarianten · Logo-Hash · axe + a11y-Zusatz (Tastatur, Reflow 320, Zoom 200 %, Textabstände, forced-colors, ohne JS) · Überlauf 320–1920 · Bewegung (Register, Framezeiten 4×, LoAF, reduziert) · SVG-Prüfung · Pixel **0 auf allen nicht freigeschalteten Seiten** (4 Ansichten, Masken, A/A-Lauf) · Lighthouse verschränkt (Ausgang/Kandidat abwechselnd, 5 bzw. 10 im Grenzbereich) auf betroffenen Hauptseiten, sonst JS-Bytes je Route · Slop (statisch + Jäger auf der Stichprobe) · Jury 3 + Lockvogel auf freigeschalteten Hauptseiten (intern Ziel 8,4) · Sperrklinke je Seite: axe-Knoten, Überlauf, Konsole nie schlechter.
4. **Testordnung:** Fälle und `expect` je Spec ≥ Vorstand, `fixme`/`skip` ≤ Vorstand (11); Formular-IDs und `name` bleiben (Alias, wenn nötig); Selektor-Anpassungen nur in Testschreiber-Paketen mit Opus-Gegenprüfung; Erfolgstexte nur über `MIKROTEXTE.md`; Mutationsprobe je umgestelltem Formular, nur in der Reinraum-Kopie.
5. **Schreibrechte:** Paket-Kopfzeile listet Dateien; `commit.sh` nimmt nur Dateien und gleicht sie ab; Unteragenten: keine git-Schreibbefehle, kein `npm install/uninstall`, kein Build/Start, kein POST; `git status`-Vergleich zu Wellenbeginn/-ende; Tar-Schnappschuss `src`/`public` vor jeder Welle in `cache/`.
6. **Messordnung:** Messfenster ohne Unteragenten; Lighthouse/Jury nur an Kandidat-Toren; Kapazität mit Puffer (unten).

## P3-00 · Werkzeuge, Basis, Umzug (eine Welle, vor allem anderen)
| Kennung | Inhalt | Wer | Kriterium |
|---|---|---|---|
| P3-00a | `bewegung.mjs`: Register-Abgleich `data-motion`, `getAnimations`, Bildfolgen, Framezeiten bei 4× CPU (CDP), LoAF, reduziert | Opus | Z-09 |
| P3-00b | `svg.mjs` + `svgo-statisch.json`/`svgo-animiert.json`: viewBox, currentColor, IDs eindeutig, Größenbudgets, a11y | Haiku | Z-10 |
| P3-00c | `a11y-zusatz.mjs`: Tastatur-Durchlauf (Reihenfolge, Fokus sichtbar, keine Falle), Reflow 320, Zoom 200 %, Textabstände 1.4.12, forced-colors-Foto, Lauf ohne JS | Opus | Z-11 |
| P3-00d | `lighthouse.mjs`: INP-Zeitspannen (Menü, Formular, Seitenwechsel, 4×), verschränkter Modus, LCP-Element im Ergebnis | Opus | Z-12 |
| P3-00e | `texte2.mjs`: Textknoten aus Build-HTML (alle 172), Normalisierung (Leerraum, U+00AD, kein text-transform), Zustände im Browser (Banner Erstbesuch + Einstellungen, Menüs offen), Vergleich gegen `MIKROTEXTE.md`; `literal.mjs`: AST-Vergleich der String-Literale je Datei (Selbstprüfung ohne Build) | Opus | Z-05, Z-06 |
| P3-00f | `pixel.mjs`: 4 Ansichten, Masken (Öffnungsstatus, Kalender, Jahr, Karussell), A/A-Pflichtlauf | Orchestrator | Z-13 |
| P3-00g | Basis am Ausgangsbuild: Probeläufer Z-04 (5 Aufgaben × mobil/Desktop × Touch/Maus/Tastatur, Schritte + Zeit), Fünf-Sekunden-Probe (5 Haiku-Erstbetrachter je Hauptseite), INP, LCP-Element + CLS-Ursache je Hauptseite, Slop-Jäger-Stichprobe je Vorlage (E-016), Bewegungs-Basis | Haiku ×2 + Orchestrator | Z-04, Z-07, Z-12 |
| P3-00h | Umzug Bestand → `(bestand)` mit `umzug-bestand.py` (erprobt: HTML 172/172 normalisiert gleich, 404-Status gleich), `global-not-found`, `@source not` für Kern-Ordner | Orchestrator | Z-05 |
| P3-00i | Härtung: `commit.sh` (nur Dateien, Abgleich Kopfzeile), `server.sh` (Abbruch bei `RESEND_API_KEY` oder `.env*` außer `.env.example`), `testzahl.mjs` (Sperrklinke), `freischalten.sh` + `reinraum.sh --kandidat`, Live-Rauchtest im Browser (lesend, Anfragesperre, ≤ 1/s, Konsole/Hydration/CSP) | Orchestrator | Z-03, Z-05 |
| P3-00j | `MIKROTEXTE.md` (Freigabeliste: Klassen nach KERN v1.1 K-012) + S-13-Vorschlagspaket für TEXTVORSCHLAEGE (41 Floskeln, 22 Dateien) | Haiku + Opus-Gegenprüfer | Z-07 |

## P3 · Durchstich `/` mit Kern-Schale (ruhend, dann eine Freischaltung)
| Kennung | Inhalt (Dateien) | Wer | hängt ab | Kriterium |
|---|---|---|---|---|
| P3-01 | Schriften fertig (Fallback-Metriken auch für Plex), Einbindung im Kern-Layout | Orchestrator | P3-00h | Z-12 |
| P3-02 | `(kern)/layout.tsx`, `kern-global.css` (`source(none)` + Kern-Ordner), gemeinsames Metadaten-Modul, Kopfskript, `BewegungsRegie` | Orchestrator | P3-01 | Z-05, Z-09 |
| P3-03 | Kern-Grundbausteine `src/components/kern/basis/` (Knopf, Textlink, Feld, Auswahl, Checkbox, Akkordeon, Hinweis, Etikett, Feldraster, Fugenlinie) mit allen Zuständen | Opus | P3-02 | Z-11, Z-07 |
| P3-04 | Icon-Grundsatz (≈ 20) + Sprite + `Icon` + Abbildung `iconMapper` | Opus | P3-02 | Z-10, Z-07 |
| P3-05 | Motive Verlegeplan Start, Fugenkreuz, Trenner, Muster | Orchestrator | P3-02 | Z-10 |
| P3-06 | Kern-Kopf, Mega-Menü, Mobilmenü (vor Hydrierung bedienbar, V-06) | Opus | P3-03/04 | Z-03 F-13, Z-11 |
| P3-07 | Kern-Fuß mit Schriftfeld, untere Leiste, WhatsApp-Kanal (E-012) | Opus | P3-03/04 | Z-03 F-10/F-15 |
| P3-08 | Kern-Einwilligungsbanner (E-013, wörtlich, nie LCP-Element) + Karten-Platzhalter | Opus | P3-03 | Z-03 F-11/F-12, Z-12 |
| P3-09 | Einstieg `/` mit SIG-1 Kreuzlinie, Schriftfeld, Mobilkomposition | Orchestrator | P3-05/06 | Z-08, Z-09, Z-12 |
| P3-10 | Fachbereiche + Leistungen mit Plan-Vignetten | Opus | P3-04/05 | Z-07, Z-10 |
| P3-11 | Ablauf mit Prüfhaken (`auftritt`, keine Signatur) + Großformat-Abschnitt | Opus | P3-05 | Z-07, Z-09 |
| P3-12 | Vertrauen: Stimmen mit Anriss, Bewertungs-Karussell (F-19), Einzugsgebiet/Karte | Opus | P3-03/08 | Z-03 F-19 |
| P3-13 | Anfrage-Einstiege in Kern-Erscheinung: HeroContactForm, PricingCalculator (E-014), Funnel, Abschluss (Logik unverändert) | Opus | P3-03 | Z-03 F-01–F-03, Z-04 |
| P3-14 | Testschreiber: Kern-Varianten von F-01–F-03, F-10–F-15, F-19 (Sperrklinke) + Opus-Gegenprüfer | Haiku + Opus | P3-06–P3-13 | Z-03 |
| P3-15 | FAQ + Zusammensetzen `(kern)/_entwurf/page.tsx` | Orchestrator | alle | – |
| P3-16 | Kandidat-Tor `/` → Freischalt-Commit → Push → Live-Rauchtest → M-06 Geräteprobe (Prüfliste) | Orchestrator | P3-15 | alle Z auf `/` |

## P4 · Fundament (ruhend; Bausteine für P5)
| Kennung | Inhalt | Wer | Kriterium |
|---|---|---|---|
| P4-01 | Vorlage Fachseite (Einstieg, Faktenfeld, Tabelle, Ablauf, FAQ, Abschluss, Querverweise) | Opus | Z-07, Z-13 |
| P4-02 | Vorlagen Cluster-Übersicht, Liste, Artikel, Detail (Musterbad/Referenz) | Opus | Z-07, Z-13 |
| P4-03a–c | Verlegepläne je Leistung (3 × ≈ 5) | Opus | Z-10 |
| P4-04 | Icon-Vollsatz (≈ 30) | Opus | Z-10 |
| P4-05a–b | Kern-Erscheinung übrige Formulare: BadanfrageFunnel, BadProjektCheck, FliesenKonfigurator, BookingCalendar, Termin, LeadQuickForm (Logik unverändert) | Opus | Z-03 |
| P4-06 | Testschreiber für P4-05 + Mutationsprobe (Reinraum) + Opus-Gegenprüfer | Haiku + Opus | Z-03 |
| P4-07 | Wege: `redirects()` 308 (2 Ziele) + 410 über `proxy.ts` mit engem `matcher`, Test „Hauptseiten laufen nicht durch den Proxy“ | Orchestrator | Z-06 |

## P5 · Freischaltung je Cluster (je Welle: ruhende Pakete → Kandidat-Tor → Freischaltung → Push)
| Welle | Pakete (Seiten) | Wer |
|---|---|---|
| W1 Bad | P5-W1-01 `/bad` (SIG-2) · -02 badsanierung, bad-aus-einer-hand · -03 barrierefreies-bad, fliesen · -04 badanfrage, badplaner · -05 projekt-check | Opus 01, 05 · Haiku nach Muster 02–04 |
| W2 Leistungen | -01 `/leistungen` (SIG-3) · -02 `[id]` (Vorlage, 4) · -03 `[id]/[stadt]` (Vorlage, 52 HTML) | Opus · Opus · Haiku |
| W3 Standorte | -01 `/standorte` (CLS-Ursache beheben) · -02 `[stadt]` (Vorlage, 10) | Opus · Haiku |
| W4 Fliesen | -01 `/fliesen` · -02…-05 Fachseiten (je 3–4 von 13) · -06 konfigurator | Opus · Haiku ×4 · Opus |
| W5 Fachthemen | -01 Untergrund (6) · -02 Balkon (4) · -03 Naturstein (3) · -04 Treppen (4) · -05 Reparatur, Schadensanalyse · -06 `/foerderung` | Haiku nach Vorlage, Opus-Stichprobe |
| W6 Blog | -01 Liste (TBT/LCP) · -02 Artikel-Vorlage (10) | Opus · Haiku |
| W7 Musterbäder, Referenzen | -01/-02 Musterbäder Liste + Detail · -03/-04 Referenzen Liste + Detail | Haiku nach Vorlage |
| W8 Firma | -01 ueber-uns · -02 unternehmen, team · -03 karriere ×2 · -04 partner, ausstellung ×2 | Opus 01 · Haiku |
| W9 Arbeitsseiten | -01 kontakt (V-02) · -02 termin · -03 beratung, faq · -04 preise, downloads · -05 login | Opus 01–02 · Haiku |
| W10 Recht + Abschluss | -01 Rechtsseiten (6, nur Darstellung) · -02 Kern-404 (`global-not-found` im Kern) · -03 Aufräumen: `(bestand)`, alte Bausteine, framer-motion, lucide, `tokens.css`, Inter/Jakarta (knip, Denkprotokoll) | Haiku · Opus · Orchestrator |

## P6 · Feinschliff (≈ 8 Pakete)
Mikrointeraktionen und Zustände, Auswahlfarbe, Teilen-Bilder (OG) im Formsystem, Konsistenzdurchgang, Signaturmomente schärfen, Blindvergleich (L8), optional View Transitions nur mit Messgewinn und Tests (Zurück, Anker, Fokus). Favicon: nur Vorschlag (Logo-Figur unantastbar, M-09). Tor Z-08.

## P7 · Abnahme (≈ 6 Pakete) – wie Runde 1.

## Summe, Kapazität, kritischer Pfad
- Pakete: P3-00 10 + P3 16 + P4 10 + P5 40 + P6 8 + P7 6 = **90**.
- Formel des Auftrags: 90 ÷ (5 × 4) × 1,2 ≈ **5,4 Tage**. Über die Abhängigkeiten (Wellen nacheinander, Tore, Messfenster): P3-00 1 + P3 4 + P4 2 + P5 15 + P6 3 + P7 2 = 27 Wellen ÷ 4 je Tag × 1,2 ≈ **8,1 Tage**. **Planwert = 8–9 Tage** (Maximum), Puffer in STATUS, Abweichung im Morgenbericht.
- Kritischer Pfad (Orchestrator-Spur): P3-00h → P3-01 → P3-02 → P3-05 → P3-09 → P3-15 → P3-16 → P4-01 → P5 W1 … W10 (Kandidat-Tore nacheinander) → P6 → P7.
- Vorrat: V-01…V-06 den Wellen zugeordnet (V-02 W9, V-03 P4-05, V-04 P4-07, V-05 W9, V-06 P3-06).

---

# Gesamtplan · L0 Runde 3 (Kern v1.2 · 10.10.2026, nach P2-GEG-02) — gilt vor Runde 2, wo beide sich widersprechen

## Tore (ersetzt das Push-Tor des genehmigten Plans und Grundsatz 3 der Runde 2)
| Tor | Wann | Inhalt | Ergebnis |
|---|---|---|---|
| **T1 Wellen-Tor** | jede Welle, vor jedem Push | Reinraum (npm ci, Build, Typen, Lint, Test, qa:graph, Routen, Tracing) · `testzahl.mjs` statisch + Laufzeit · Entwürfe nur mit `@/`-Importen (grep) · **build-vergleich gegen den letzten Live-Commit: HTML aller 172 Dateien und CSS-Selektoren/-Variablen/-Keyframes gleich** | gleich ⇒ ruhend bestätigt ⇒ Push. Ungleich ⇒ T2 für alle Seiten mit Abweichung, sonst kein Push |
| **T2 Kandidat-Tor** | jede Freischaltung; jede Welle mit Abweichung in T1; jedes sofort wirksame Paket (Umzug, 308/410, N-14, Hooks) | Kandidat = Reinraum-Kopie + `freischalten.sh` (bzw. HEAD) gegen den letzten Live-Stand: Funktionstests aller live erreichbaren F (289+) · Text v2 (nur `MIKROTEXTE.md` erlaubt; Überschriften „hinzu“ rot; Fragment-Ziele) · SEO-Invarianten, Logo-Hash · axe + a11y-Zusatz · Überlauf 320–1920 · Bewegung · SVG · Klassen-Abdeckung Kern-CSS · Pixel 0 auf allen nicht betroffenen Seiten (A/A, 4 Ansichten; Stichprobe Hauptseiten + 2 je Vorlage, Volltest 120 × 4 bei Paketen außerhalb der Kern-Ordner) · Lighthouse verschränkt auf betroffenen Hauptseiten · Slop (statisch + Stichprobe) · Jury 3 + Lockvogel auf betroffenen Hauptseiten · Sperrklinke je Seite (axe, Überlauf, Konsole) | **Freischalt-Schwelle:** Ränge 1–4 grün (Grenzen, Bestand/Funktion, Barrierefreiheit/Leistung, DoD der Seite), nichts schlechter als der Bestand, Jury ≥ Bestand + 2,0 je Seite. Die Zielwerte (Jury ≥ 8,0) gehören zum Phasentor |
| **T3 Phasentor** | Ende P3, P4, P5, P6 | alle Z der Phase nach AUFTRAG + L3: Probeläufer (15 Läufe), Fünf-Sekunden-Probe, frischer Gegenprüfer, Mutationsprobe; P4-Tor über die Vorschau-Kandidaten der Hauptseiten-Entwürfe (E-017) | grün oder L7 |
| **Vorschau-Kandidat** | jeder Wellenschluss, auf Anforderung | `KANDIDAT="<alle Entwürfe>" reinraum.sh HEAD` + `server.sh start <sha>-k` (Port 4320); für unfertige Arbeit Vorschaubaum im Scratchpad (Kopie des Arbeitsbaums + `freischalten.sh` + Build). Unteragenten fotografieren lesend (`fotos.mjs`, `axe.mjs` mit `RELAUNCH_BASE`) | Selbstkontrolle, L1/L8, Varianten-Wahl – kein Vorschauweg im Produkt (G7) |

**Freischalt-Ablauf (N-02):** `freischalten.sh --commit <routen>` läuft nur bei sauberem Baum (außer CLAUDE.md) und `HEAD = KANDIDAT_BASIS`, nutzt `git mv`/`git rm`, committet selbst und vergleicht danach `git archive HEAD` mit der Kandidat-Kopie (ohne `node_modules`, `.next`, Logs). Ist der Vergleich nicht leer, wird nicht gepusht. Live danach: `live-rauchtest.sh` + `live-browser.mjs` über die Hauptseiten **und** alle freigeschalteten Routen (je Vorlage 2), statische Dateien aus dem lokalen Build, Dokumente höchstens 1 je Sekunde (G1).

## Bauregeln (Ergänzung zu E-015)
1. **Einfrieren (N-01 c):** Alles außerhalb von `src/components/kern/`, `src/lib/kern/`, `src/app/(kern)/` bleibt bis W10 unverändert. Ausnahmen nur als eigenes Paket mit T2 (oder build-vergleich „gleich“): Umzug P3-00h, Formular-Hooks P3-00l, P3-00k (Fairness), P4-07 (Wege). Der Kern hat eigene Icon-Abbildung (`src/lib/kern/icons.ts`) und eigene Mikrotexte.
2. **Kern-CSS (N-01 b):** `kern-global.css` mit `@import "tailwindcss" source(none)`, `@source` auf `src/components/kern`, `src/lib/kern`, `src/app/(kern)` und `@source not "../app/(kern)/_entwurf"` – Entwurfsklassen kommen erst mit der Freischaltung ins ausgelieferte CSS.
3. **Formulare (N-05):** Logik je Formular in einen Hook ohne Markup (`src/lib/formulare/use<Formular>.ts`, wörtlich verschoben); Bestand und Kern nutzen ihn; Nachweis: build-vergleich HTML 172 gleich + Funktionstests + Mutationsprobe. Kern-Ansicht in `src/components/kern/formulare/`.
4. **Kern-Layout (N-06):** Pflichtinhalt wie Bestand: TrackingScripts (an `useConsent`), SkipNav, ErrorBoundary, UIProvider, AuthProvider, ContentProvider, Geo-Meta, Verifizierung, JSON-LD (`buildRootGraph`), Icons, `x-build`, Metadaten-Vorgaben aus einem gemeinsamen Modul `src/lib/kern/metadaten.ts` (importiert **nicht** `(bestand)/_dokument.tsx`). F-11 wird erweitert: Tracking-Hosts vor/nach Einwilligung gleich auf Bestand und Kern; Einwilligung gilt über die Gruppengrenze; `#cookie-settings` in beiden Gruppen.
5. **404 (N-07):** `(kern)/not-found.tsx` (Wortlaut der Bestands-404) ab P3-15; F-17 prüft je freigeschalteter dynamischer Vorlage einen unbekannten Parameter.
6. **Segment-Layouts (N-08):** `freischalten.sh` entfernt im Bestand `layout.*`, `template.*`, `not-found.*`, `error.*`, `loading.*` nur, wenn darunter keine Bestands-`page.*` mehr liegt.
7. **Importe (N-20):** Entwürfe nur mit `@/`-Importen; geteilter Kern-Code nur in den Kern-Ordnern.
8. **Banner als LCP (N-22):** erlaubt sind Komposition, Größe und Server-Rendern; verboten ist Einblenden nach dem LCP oder per Zeitverzug.
9. **Varianten (N-13):** SIG-1, SIG-2, SIG-3 je zwei Opus-Varianten, Kopf und Fachseiten-Vorlage je zwei; Wahl über Vorschau-Kandidat + Jury + Denkprotokoll.

## Ergänzte und neue Pakete
- **P3-00k** (Orchestrator, T2): Rang-1-Korrekturen im Bestand – Einwilligung im Preisrechner startet leer (E-014, N-14; Test „ohne Haken kein Versand“), vorgetäuschtes Benachrichtigungs-Abzeichen „1“ am WhatsApp-Widget entfällt (E-012). Erklärte Pixel-Abweichung nur an Checkbox bzw. Abzeichen.
- **P3-00l** (Opus + Gegenprüfer, T2): Formular-Hooks für F-01–F-03 und F-12 (`MapConsentGate`), `useConsent` (F-11) wird geteilt; die Hooks für F-04–F-09 entstehen in P4-05a/b vor ihrer Kern-Ansicht (je T2). Läuft nach dem Umzug P3-00h.
- **P3-00m** (Haiku): `kern-klassen.mjs` (jede Klasse im HTML einer Kern-Seite hat eine Regel im Kern-CSS, N-19).
- **P3-00n** (Haiku): Feld `seitenart` je URL in `GRUNDMENGE.json` nach K-002 (N-23).
- **P3-00o** (Orchestrator): Erprobung 2 (N-04) – Wegwerf-Baum mit Minimal-`(kern)` (Layout, Kern-CSS, statische + dynamische Probe-Route mit `notFound()`): Bestands-HTML/CSS gleich, Kern-Route lädt nur Kern-CSS und 2 Schriften, Wechsel beider Richtungen ohne Konsolenfehler, 404 für unbekannte Adressen und `notFound()` in beiden Gruppen, Klammer-Globs greifen. Belege ins Repo. Scheitert sie: E-015 Weg 2.
- **P3-02** Pflichtinhalt nach Bauregel 4. **P3-08** mit Bauregel 8. **P3-09/W1-01/W2-01** je zwei Varianten. **P3-14** geteilt: a F-01–F-03, b F-10/F-15, c F-11/F-12/F-19, d F-13/F-14/F-17 (je Haiku + Opus-Gegenprüfer). **P3-15** inkl. `(kern)/not-found.tsx` (Kriterium Z-05, Z-06). **P3-16** = T2 + T3 (Probeläufer, Fünf-Sekunden-Probe, Gegenprüfer); Geräteprobe M-06 danach, nicht blockierend.

## P5–P7 mit Kriterien (ersetzt die Kurztabellen der Runde 2)
| Welle | Pakete | hängt ab | Kriterien |
|---|---|---|---|
| W1 Bad | -01 `/bad` (SIG-2, 2 Varianten) · -02 badsanierung, bad-aus-einer-hand · -03 barrierefreies-bad, fliesen · -04 badanfrage, badplaner · -05 projekt-check · -T Testschreiber F-04/F-05 · -P Probeläufer (Aufgaben 1, 5) | P4-01, P4-05 | Z-03, Z-04, Z-05, Z-07, Z-08 (/bad), Z-09, Z-11, Z-13 |
| W2 Leistungen | -01 `/leistungen` (SIG-3, 2 Varianten) · -02 `[id]` · -03 `[id]/[stadt]` · -T F-02 auf Leistungsseiten, F-09 · -P (Aufgabe 1) | P4-01–03 | Z-03–Z-07, Z-08 (/leistungen), Z-10, Z-12 |
| W3 Standorte | -01 `/standorte` (CLS) · -02 `[stadt]` · -T F-09, F-12 · -P (Aufgabe 4) | P4-01, P3-08 | Z-03–Z-07, Z-08, Z-12 |
| W4 Fliesen | -01 `/fliesen` · -02…-05 Fachseiten · -06 konfigurator · -T F-06 (≥ 10 Eingaben gegen Altverhalten) | P4-01, P4-05 | Z-03, Z-05–Z-07, Z-10, Z-13 |
| W5 Fachthemen | -01 Untergrund · -02 Balkon · -03 Naturstein · -04 Treppen · -05 Reparatur, Schadensanalyse · -06 `/foerderung` · -P (Aufgabe 5) | P4-01 | Z-04–Z-07, Z-10, Z-13 |
| W6 Blog | -01 Liste (TBT/LCP) · -02 Artikel · -T F-16 | P4-02 | Z-03, Z-05–Z-08 (/blog), Z-12 |
| W7 Musterbäder, Referenzen | -01–-04 Liste + Detail | P4-02 | Z-05–Z-07, Z-13 |
| W8 Firma | -01 ueber-uns · -02 unternehmen, team · -03 karriere · -04 partner, ausstellung · -P (Aufgabe 2) | P4-01 | Z-04–Z-08 (/ueber-uns) |
| W9 Arbeitsseiten | -01 kontakt (V-02) · -02 termin · -03 beratung, faq · -04 preise, downloads · -05 login · -T F-07/F-08/F-14/F-18 · -P (Aufgabe 3) | P4-05, P4-06 | Z-03–Z-08 (/kontakt), Z-11, Z-12 |
| W10 Recht + Abschluss | -01 Rechtsseiten · -02 Kern-404 global · -03 Aufräumen (`(bestand)`, Altbausteine, framer-motion, lucide, tokens.css, Inter/Jakarta) · -04 Rückroll-Anleitung für den Stand ohne Bestand | alle | Z-05, Z-06, Z-07, Z-11, Z-14 |
| P6 | Mikrointeraktionen/Zustände (Z-09, Z-11) · Teilen-Bilder (Z-06) · Konsistenz (Z-07) · Signaturen schärfen + Blindvergleich L8 (Z-08) · View Transitions optional, nur Kern-Gruppe (Z-09) | P5 | Z-08 Tor |
| P7 | Volltest 8 Ebenen · Probeläufer 15 Läufe + Fünf-Sekunden-Probe (Z-04) · Jury-Stichprobe 10 % (≥ 5) · Slop-Jäger Grundmenge (Z-07) · Mutationsprobe je F (Z-03) · BERICHT, KERN-Doku, MENSCHEN, Rückroll-Anleitung (Z-14) · Gegenprüfer über ABNAHME | P6 | alle |

## Kritischer Pfad und Kapazität (N-11)
- Pfad: P3-00o → P3-00h → P3-00l → P3-01 → P3-02 → P3-03 → P3-06 → P3-09 (Varianten) → P3-14 → P3-15 → P3-16 → P4-05 → P4-06 → W1 … W10 (je T2) → P6 → P7.
- Abhängigkeitsebenen ≈ 40–45 Wellenschritte. **Planwert 10–13 Tage**, nach dem ersten T2 (P3-16) gemessen und festgeschrieben; Puffer in STATUS in Tagen. Messfenster (ohne Unteragenten) nur für Lighthouse und Framezeiten.

## Kleinpunkte (N-16–N-23)
Wiederaufnahme nach jedem Paket (L5) · `testzahl.mjs` zusätzlich mit Laufzeitzahlen aus dem Playwright-Bericht (Basis 289 Fälle; statisch fixme 3 + skip 6 = 9) · Fragment-Ziele in Text v2 · Klassen-Abdeckung (P3-00m) · `PAKET=` für Unteragenten-Commits Pflicht · gemeinsame Dateien des Orchestrators zusätzlich: `(kern)/layout.tsx`, `kern-global.css`, `(bestand)/_dokument.tsx`, `global-not-found.tsx`, `freischalten.sh`, `src/lib/kern/metadaten.ts` · Vorrat V-01…V-06 · Nebelkarte: Markenbruch Kern ↔ Bestand in der Übergangszeit → Hauptwege früh freischalten (W9-01 `/kontakt` direkt nach W1).

## L0 abgeschlossen: „bestanden mit Auflagen“ (P2-GEG-03) – Umsetzung
| Nr | Auflage | Umsetzung | Stand |
|---|---|---|---|
| 1 | T1 sieht JS, Inline-Skripte, CSS-Werte nicht (H-1) | `tor-t1.sh`: Einstufung über geänderte Dateien seit Live; bei `src`-Änderungen strenger `build-vergleich --streng` (Chunk-Namen = Inhalt, Skripte, volle CSS-Regeln; Gegenprobe: Umzug wird erkannt, 171 Abweichungen; gleicher Code in zwei Builds = 0). Bauregel 1: „(oder build-vergleich gleich)“ gestrichen – Ausnahmen nur mit T2. Live-Rauchtest nach jedem Push über Hauptseiten + alle freigeschalteten Kern-Routen (`live-browser.mjs --routen`). | erledigt |
| 2 | `@source not`-Pfad | Kern-CSS-Einstieg liegt in `src/styles/kern-global.css` mit `@source "../app/(kern)"` / `@source not "../app/(kern)/_entwurf"` (Erprobung 2 belegt); `globals.css` schließt zusätzlich `../lib/kern` aus (Umzug-Skript) | erledigt |
| 3 | Bauregel 1 ↔ K-004 | erlaubte Kern-Orte: `src/components/kern/`, `src/lib/kern/`, `src/lib/motion/`, `src/app/(kern)/`, `src/app/fonts/`, `src/styles/kern.css`, `src/styles/kern-global.css`; E-009: MotionProvider bleibt im Bestand bis W10 (E-015) | erledigt (hier) |
| 4 | Vorschau/Kandidat-Verzeichnis, Stempel, Rückweg | `reinraum.sh`: `KANDIDAT=` → `-k`, `VORSCHAU=` → `-v`, Stempel `.kandidat-stempel` (Basis, Routen, Art); `freischalten.sh --commit` prüft Stempel `art: k` + Routen, ohne `git add -A`; Rückweg bei Exit 4/5: `git revert --no-edit HEAD` lokal, nicht pushen | erledigt |
| 5 | Kopfbereich Bestand ↔ Kern | T2 vergleicht `<head>` (Meta, JSON-LD, Icons, Verifizierung, x-build) je Freischaltung (`texte2.mjs`, Paket P3-14c) | im Paket |
| 6 | P4-Tabelle, Kriterien P3-00k–o, Summe, Jury-Schwelle | P4 zusätzlich: P4-08 Entwürfe der sechs Hauptseiten W1-01, W2-01, W3-01, W6-01, W8-01, W9-01 (für das P4-Tor, E-017). Kriterien: P3-00k Rang 1 (Z-05, Z-03), P3-00l Z-03/Z-05, P3-00m Z-07/Z-13, P3-00n Z-04, P3-00o Z-05. Summe: P3-00 15 + P3 18 (Varianten) + P4 11 + P5 ≈ 50 (mit -T/-P) + P6 8 + P7 6 ≈ **108 Pakete**; Planwert 10–13 Tage bleibt bis zur Messung am ersten T2. Jury-Schwelle (Bestand + 2,0) gilt nur je Hauptseite. | erledigt (hier) |
| 7 | Wiederaufnahme | PRUEFPUNKT/STATUS aktualisiert; NEBELKARTE „erprobt“ mit Beleg (Erprobung 2) | erledigt |
| 8 | Testzahl, Laufzeit-Sperrklinke, PAKET-Pflicht, Kopfskript | Basis 292 Fälle (Laufzeit), statisch 109 Fälle, fixme 3 + skip 6; Laufzeit-Sperrklinke Teil von T2; `commit.sh` verlangt `PAKET=` oder `ORCHESTRATOR=1`; K-009-Text an das gebaute Kopfskript angeglichen (Zeitlimit entfernt die Startklasse; Modul markiert Sichtbares sofort) | erledigt |

---

## Vereinheitlichung · Startseite als Vorbild, Unterseiten Stück für Stück (E-037, E-038) · gilt vor allen früheren Abschnitten

### Context

- **Zwei Sitzungen, ein Live-Stand.** Neben dieser Relaunch-Sitzung lief eine zweite Orchestrierung, die „Werkstatt“ (`_werkstatt/`).
  - Auf Anweisung des Auftraggebers hat sie beide Arbeitsstände zusammengeführt und die Startseite aus beiden Fassungen fusioniert.
  - Am 11.10. gegen 17:10 CEST hat sie das auf `main` gepusht: **6156079 ist live** auf www.tezgel.de.
  - Die Fusions-Startseite `src/app/(bestand)/page.tsx` nutzt das Gestaltungssystem **KERN v2**:
    - Regeln in `_werkstatt/KERN.md`
    - Tokens in `src/app/globals.css` und `src/app/bewegung.css`
    - Bausteine `src/components/kern/*.tsx` (flach) und `src/components/kern/stile.ts`
  - Meine Kern-Startseite liegt dort nur noch als ruhender Entwurf.
- **Rahmen und Seitenstand heute.** Der Rahmen für alle Seiten ist bereits KERN v2: Kopf, Menü, Fuß, untere Leiste, Banner und WhatsApp.
  - Vollständig umgebaut sind nur `/`, `/kontakt` und die 404-Seite.
  - **74 von 76 Seitendateien** nutzen noch altes Markup: lucide, glass, Verläufe, slate.
- **Entscheidungen des Auftraggebers (11.10., Chat):**
  1. „vereinheitlich das design konzept auf main so das die Startseite als vorbil genommen wird und alle unterseiten stück für stück aufgewertet werden immer auf main mit immer regelmäßigen updates“ (E-037).
  2. Vorbild ist die **live laufende Fusions-Startseite**.
  3. **Nur diese Sitzung** baut weiter; die Werkstatt ist angehalten.
- **Ziel:** ein Gestaltungssystem (KERN v2) auf allen rund 120 Seiten.
  - Jede Seite bzw. Vorlage ist ein eigener Schritt mit eigenem Prüftor und eigenem Push auf `main`.
  - Nach jedem Push bekommt der Auftraggeber eine kurze Meldung.
- **Unverändert gelten:**
  - UNANTASTBAR: Logo, Rechtstexte, Überschriften und Fließtext nur als Vorschlag, Geschäftslogik, `src/config/*`.
  - G1–G9.
  - Commits nur über `commit.sh`.
  - Push nur nach grünem Tor mit `git push origin HEAD:main`.
  - Modelle: Opus 5.5 und Haiku 5.5, je Agent ausdrücklich gesetzt; PARALLELITÄT 5.

### Phase 0 · Zusammenführung und Übergabe (≈ 1,5 h, ein Push, live unverändert)

1. **Lokalen CLAUDE.md-Block sichern.** Kopie nach `$S/claude-lokal.md`, dann `git checkout -- CLAUDE.md`. Der Merge startet sonst nicht. Der Block wird nie committet.
2. **`commit.sh` erweitern um `--merge`.** Kein Commit ohne `commit.sh`, aber ein Merge-Commit lässt keine Teil-Commits zu. Der neue Modus:
   - prüft, dass eine Zusammenführung läuft;
   - prüft, dass `CLAUDE.md` im Index byte-gleich mit `origin/main` ist, also kein lokaler Block enthalten;
   - prüft, dass keine Datei größer als 5 MB ist;
   - schreibt dann den Merge-Commit mit den Attributionszeilen.
3. **Zusammenführen.** `git fetch origin main`, dann `git merge --no-ff --no-commit origin/main`.
   - Einziger Konflikt: `src/lib/motion/kopfskript.ts`.
   - `KOPFSKRIPT` (aktives Dokument `(bestand)`) bleibt byte-gleich mit `origin/main`.
   - Mein erweitertes `KOPF_SKRIPT` (ruhendes `(kern)`) bleibt, ebenso `EINWILLIGUNG`/`BEWEGUNG` samt Import aus `@/lib/cookie-inventory`.
   - Commit mit `ORCHESTRATOR=1 commit.sh --merge "integration: origin/main 6156079 (Werkstatt-Fusion) eingemischt"`.
4. **Lokalen Block wiederherstellen.** `CLAUDE.md` ist danach der committete Stand mit Werkstatt-Block, dazu mein Orchestrator-Block (uncommittet), neu gefasst:
   - Der Werkstatt-Block ist durch E-038 überholt; nur diese Sitzung arbeitet auf `main`.
   - Vor jedem Start gilt die Leseliste `_relaunch/`.
5. **Übergabe dokumentieren** (im selben Push):
   - **`_werkstatt/STATUS.md` und `PRUEFPUNKT.md`, oben:** „ÜBERGEBEN 11.10.2026 (Entscheidung des Auftraggebers): Der Werkstatt-Lauf ist beendet, nicht fortsetzen, nicht pushen. Die Fortsetzung läuft über die Relaunch-Sitzung nach `_relaunch/PLAN.md`, Abschnitt Vereinheitlichung.“ Der Werkstatt-Block in `CLAUDE.md` verweist genau auf diese Dateien, damit stoppt ein wieder aufgenommener Werkstatt-Lauf.
   - **`_werkstatt/MENSCHEN.md`:** M-21 als beantwortet markieren.
   - **`_relaunch/ENTSCHEIDUNGEN.md` E-038:**
     - KERN v2 ist das einzige Gestaltungssystem; Vorbild ist das live laufende `/`.
     - Nur diese Sitzung baut.
     - Der Werkstatt-PLAN (E3–E6, Kür) wird als Paketgerüst übernommen.
     - `_relaunch/KERN.md` v1.2 und die Kern-Entwürfe werden Archiv bzw. inhaltliche Vorlage.
     - P4-14 und P4-15 (am Kern-`/` gemessen) gelten als **überholt**; sie werden am Fusions-`/` neu gemessen (Phase 1.4).
   - **PLAN, STATUS, PRUEFPUNKT:** nachführen.
6. **T1** am Merge-Commit:
   - Reinraum: npm ci, Build, Typprüfung, Lint, `npm test` einschließlich `test/bewegung.test.mjs`, qa:graph.
   - `build-vergleich.mjs 6156079 <merge> --streng`, erwartet **HTML 172 gleich und CSS gleich**. Meine Produktänderungen liegen nur in ruhenden Kern-Dateien.
7. **Push und Live-Prüfung.**
   - Bereichsprüfung (`git diff --name-only origin/main HEAD | grep -v ^_relaunch/`): nur Kern-Ruhedateien, `kopfskript.ts` und die Übergabedokumente.
   - Größe ≤ 50 MB.
   - `git push origin HEAD:main`, danach `vercel-status.sh`.
   - `live-rauchtest.sh <sha>` und `live-browser.mjs <sha>` mit fester Kennung.
   - Meldung an den Auftraggeber.
8. **Zur `CLAUDE.md` im Repo:** Der Werkstatt-Block bleibt vorerst stehen, weil `commit.sh` `CLAUDE.md` nie committet. Die Übergabevermerke neutralisieren ihn. Ihn zu ersetzen wäre eine Ausnahme von meiner Regel; die schlage ich dem Auftraggeber nur als Option vor, sie blockiert nichts.

### Phase 1 · Eine Werkzeugkette, ein Prüfprofil, Basiswerte (≈ 3–4 h, vor der ersten Seite)

1. **Testsuite: eine einzige, `_relaunch/werkzeuge/tests`.** Sie behält Sperrklinke (`testzahl.mjs`), Uhr-Spec und meine Prüfwerkzeuge. Anpassungen:
   - `fixtures.mjs`: `KERN_SEITEN` standardmäßig `[]`.
   - `funktion-einwilligung`: `ladeKnopf` rollt auf den Knopf „Karte laden & zustimmen“.
   - `funktion-navigation`: Die Schalter-Regel hängt am gemeinsamen Kopf (Navigation erst ab xl), nicht an `istKern`.
   - `funktion-kontaktwege`: `wegIstLeiste = (p, isMobile) => isMobile`.
   - Die Specs `funktion-tracking` und `funktion-weiterleitung` aus `_werkstatt/werkzeuge/tests` übernehmen.
   - Sperrklinke neu basieren, mit Begründung in LERNEN.
   - Ziel: auf Live 6156079 grün, mindestens so viele Fälle wie die Werkstatt-Suite (290).
   - Die Werkstatt-Suite wird archiviert und nicht mehr gefahren.
2. **Werkzeuge der Werkstatt** übernehmen (bleiben in `_werkstatt/werkzeuge`, eigenes `npm ci` mit `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`):
   - Übernommen werden `werte.mjs` mit `werte-regeln.json` (nur KERN-v2-Werte), `umbau.mjs` (AST-Umbau lucide → Icon, Klassen → KERN, schreibt nur bei gleichem Text-Fingerabdruck), `ueberlappung.mjs`, `abschnitte.mjs`, `bildsatz.mjs`, `sprite.mjs`, `glyphen.mjs`, `textprobe.cjs`/`bezeichner.cjs`, `bewegung.mjs register` gegen `_werkstatt/register.json`, `briefing.mjs` und `pakete/_vorlage-sichtabnahme.md`.
   - Fest verdrahteten alten Scratchpad-Pfad und Branchnamen durch `RELAUNCH_SCRATCH` bzw. `main` ersetzen.
   - Eigene Ports (4350 ff.), damit nichts mit 4310/4320 kollidiert.
   - Abgelöst: `kern-klassen.mjs` durch `werte.mjs`. `freischalten.sh` entfällt, weil die Seiten direkt in `(bestand)` umgebaut werden, statt ruhend freigeschaltet.
3. **Prüfprofile:**
   - **T2-S (je Seiten-Schritt, Ziel ≤ 1,5 h):**
     - Reinraum aus dem Commit.
     - `build-vergleich` gegen Live: HTML ändert sich nur auf den Seiten des Schritts; CSS-Änderungen sind erklärt.
     - `werte.mjs` auf den geänderten Dateien: 0.
     - Bewegungs-Register lückenlos.
     - Funktionstests der betroffenen F, beide Projekte.
     - `texte2` der Seiten mit MIKROTEXTE: rot 0 (Überschriften und Fließtext unverändert).
     - SEO-Invarianten: Titel, Beschreibung, Canonical, JSON-LD, H1, Links.
     - axe in den Zuständen normal, Menü, Erstbesuch, Einstellungen: 0.
     - `a11y-zusatz`: harte Kennzahlen 0.
     - Fotos in 4 Ansichten, selbst gesichtet; Wortbruch 0; Überlappung 0.
     - Statischer Slop: 0 lucide, glass, glow und Verlauf auf der Seite.
   - **T2-Q (geteilte Komponente oder Formular-Ansicht):** wie T2-S, zusätzlich:
     - alle Seiten, die die Komponente nutzen (grep), in m375 und d1440;
     - Pixel-Stichprobe der übrigen Seiten mit dem berichtigten `pixel.mjs`;
     - Mutationsprobe für jede neue Formular-Ansicht.
   - **Tagestor T-D** (einmal täglich im ruhigen Fenster, ohne Agenten, vor dem Morgenbericht):
     - volle Suite mit Sperrklinke;
     - Lighthouse und INP der am Tag geänderten Hauptansichten, verschränkt gegen den Ausgangsstand 707a93d (10 Paare, echter Median, nicht schlechter als der Bestand, Budget K-011);
     - Pixel-Stichprobe der unberührten Vorlagen;
     - Sichtabnahme (frischer Opus, Werkstatt-Vorlage) der fertigen Hauptansichten: Ansichtswert ≥ 8, sonst Nachpaket.
   - **Phasentor** am Ende jeder Etappe (E3, E4/E5, E6): Probeläufer, Fünf-Sekunden-Probe mit vorab festgelegter Regel, Mutationsprobe, frischer Gegenprüfer.
4. **Basiswerte, einmal:**
   - Lighthouse und INP der Fusions-`/` gegen den Ausgangsstand (ruhig, 10 Paare). Bisher gibt es dafür keinen Beleg.
   - Gegenprobe a3 auf der Fusions-`/` mit und ohne Banner.
   - Sichtabnahme `/` und `/kontakt` (das offene Werkstatt-Tor Anlauf 2).
   - Aus den Befunden entsteht gegebenenfalls ein Paket „Startseite nachschärfen“ (TBT, Hero-Formular). Es ersetzt P4-14 und P4-15.

### Phase 2 ff. · Schrittfolge (≈ 45 Pushes, Planwert 8–10 Tage)

**Grundlagen:**
- Das Gerüst sind die Werkstatt-Pakete E3–E6 (`_werkstatt/PLAN.md`), umsortiert nach sichtbarem Nutzen und Abhängigkeiten.
- Jede Zeile unten ist ein Schritt mit eigenem Push.
- Briefings entstehen neu aus den PLAN-Zeilen mit `briefing.mjs` bzw. der Paketvorlage.
- **Inhaltliche Vorlage** sind meine ruhenden Kern-Entwürfe:
  - Abschnittsfolge, Daten, Anker (`#projekt-check`, `#anfrage`, `#express-anfrage`, `#termin-buchen`), H1-ids;
  - die geteilten Hooks aus `src/lib/formulare/*`;
  - die Auflagen W1–W9.
- Die Optik entsteht aus KERN-v2-Bausteinen. Die Übersetzungstabelle steht in `_werkstatt/pakete/FUSION-UEBERSETZUNG.md`.

**E3 · Hauptansichten und Querschnitt** (Opus baut; Formular-Schritte als T2-Q):

| Nr | Schritt | Voraussetzung |
|---|---|---|
| S-01 | `/leistungen` (E3-BAU-02); PricingCalculator und Funnel sind schon KERN v2 | Phase 1 |
| S-02 | `/ueber-uns` (E3-BAU-07) | Phase 1 |
| S-03 | `/blog`: Server-Komponente mit Filterinsel, `useBlogListe` (E3-BAU-09) | Phase 1 |
| S-04 | `/leistungen/[id]`, 4 Seiten (E3-BAU-03) | S-01 |
| Q-01…Q-05, parallel gebaut, nacheinander gepusht | BadanfrageFunnel (E3-BAU-16–18) · BadProjektCheck (-19) · LeadQuickForm (-20) · RouteVisualization (-21) · FliesenKonfigurator (-11–15) | Phase 1 |
| S-05 | `/bad` (E3-BAU-01) und Szene „Verlegeplan entsteht“ (E3-ORCH-01) | Q-01, Q-02 |
| S-06 | `/standorte` (E3-BAU-04) und Einzugsband (E3-ORCH-03) | Q-04 |
| S-07 | `/standorte/[stadt]`, 10 Seiten (E3-BAU-05) | Q-03 |
| S-08 | `/fliesen` (E3-BAU-06) und Verband-Umschalter (E3-ORCH-04) | Q-05 |
| S-09 | `/fliesen/konfigurator` (E3-BAU-08) | Q-05 |
| S-10 | `/blog/[slug]`, 10 Seiten (E3-BAU-10) | S-03 |
| S-11 | SIG-3 auf `/leistungen` (E3-ORCH-02), Fugenband `/ueber-uns` (E3-ORCH-05, framer-motion raus) | S-01, S-02 |

Danach das Phasentor E3.

**Rahmen-Nachpakete (Befunde 12.10., vor E4, je eigener Push, Prüfprofil T2-Q):**
- N-01 Startseite TBT (läuft): wiederholte Stil-Neuberechnung nach dem ersten Bild, live mobil 70,5 statt 82,5 Punkte.
- R-01 Fokus nie verdeckt: a11y-zusatz zeigt live auf jeder Seite verdeckte Fokusziele unter festen Ebenen (`/ueber-uns` live 56, vor allem
  mobil unter der unteren Leiste, am Desktop beim Erstbesuch unter dem Banner), dazu Fokus unter 2 px, Textabstand und forced-colors rot
  (`belege/s-02-live/a11y-zusatz.json`). Ziel: harte Kennzahlen 0 auf allen Hauptansichten (scroll-padding-bottom für die Leiste,
  Banner-Lage, Fokusring). Gemeinsame Dateien → nach N-01, nicht parallel dazu.

**E4 · Familien** (Haiku mit `umbau.mjs` und Bausteinen, Opus nimmt ab; je 2–3 Seiten):
- `bad/*`: 4 Schritte, darunter Musterbäder samt `[slug]`.
- `fliesen/*`: 7 Schritte.

**E5:**
- Untergrund: 3 Schritte.
- Balkon/Terrasse: 2.
- Naturstein und Fliesenreparatur: 2.
- Treppen: 2.
- `/leistungen/[id]/[stadt]`: eine Vorlage für alle Instanzen.
- `/schadensanalyse`.

**E6:**
- Firma: `/unternehmen`, `/team`, `/partner`.
- Karriere: 2 Seiten. Ausstellung: 2 Seiten.
- `/referenzen` und `[id]`.
- `/termin`.
- `/beratung`: framer-motion raus.
- `/faq` und `/preise`.
- `/foerderung`, `/downloads`, `/login`.
- Rechtsseiten in 2 Schritten, nur Darstellung.
- Restkomponenten (E6-BAU-11): Befund 12.10. – HeartbeatCTA, TileCraftIcons, GradientText und SpotlightCard nutzt keine
  lebende Seite mehr (HeartbeatCTA nur noch ruhende Kern-Entwürfe), PageWrapper nur /login (S-27). Kein eigener Bauauftrag:
  Entfernen in E6-ORCH-01 mit knip/grep-Nachweis.
- Danach das Phasentor.

**E6-ORCH-01 · Abbau des alten Systems** (eigener Schritt mit build-vergleich und knip/grep-Nachweis):
- Alias-Schicht `tokens.css` entfernen; lucide, framer-motion und Phosphor deinstallieren.
- Ruhendes `(kern)` samt `src/components/kern/{basis,…}`, `src/styles/kern*.css` und `src/lib/kern` entfernen.
- Restkomponenten ohne Nutzung entfernen: `animations/HeartbeatCTA.tsx`, `common/TileCraftIcons.jsx`, `ui/GradientText.tsx`,
  `ui/SpotlightCard.tsx`, `common/PageWrapper.jsx` (sobald /login ohne).
- `src/lib/kern/start/daten.ts` versorgt die Startseite. Vorher wird es nach `src/lib/start/daten.ts` verschoben.

**Danach:** Kür (Werkstatt KÜR-01…09), P6/P7 nach `_relaunch/PLAN.md` mit ABSCHLUSS, dann Lauf 2 A0–A2 mit Halt am Freigabepunkt.

**Parallelität:**
- Bis zu 4 Bau-Agenten bearbeiten im Arbeitsbaum getrennte Dateien (Wellenregel: keine gemeinsame Datei, getrennter Importgraph).
- Vorschau-Builds der Agenten laufen in eigenen Scratch-Kopien auf eigenen Ports, höchstens 2 Builds gleichzeitig.
- Der Orchestrator nimmt jeden fertigen Schritt ab und committet ihn einzeln (`PAKET=<brief>`).
- Tor und Push laufen nacheinander aus dem Commit. Der Reinraum baut aus `git archive HEAD`, unfertige Arbeit geht also nie live.
- Lighthouse läuft nur im Tagestor-Fenster.

### Updates an den Auftraggeber

- **Nach jedem Push:** 2–4 Zeilen im Chat (was live ist, Kennung, wichtigste Messwerte, Beleg).
- **Morgenbericht-Routine** `trig_01Emv32h2axxyM1GBuc9wCVY`: Prompt auf den neuen Ablauf umstellen (`update_trigger`): Seiten live und offen, Tagestor, Abweichungen, offene Fragen.
- **Stündlich** eine Protokollzeile in STATUS; PRUEFPUNKT nach jedem Schritt.

### Offene Entscheidungen (blockieren nichts)

- **M-20** Zielgruppe im Einleitungssatz von `/leistungen`, `/ueber-uns` und `/kontakt`: Bis zur Antwort bleibt der Wortlaut; die Fünf-Sekunden-Auflage gilt als begründete Abweichung.
- Werkstatt-Fragen **M-15 bis M-22** wandern in `_relaunch/MENSCHEN.md`: Waisen löschen, GA-Zeitpunkt, Wetzlar als HQ, Öffnungszeiten, echte Fotos.
- **Optional:** den Werkstatt-Block der committeten `CLAUDE.md` ersetzen (Ausnahme von meiner Commit-Regel).

### Verifikation

- **Je Schritt:** `_relaunch/belege/s-<nr>/ERGEBNIS.md` mit allen T2-S- bzw. T2-Q-Zeilen. Danach Push, `live-rauchtest.sh` und `live-browser.mjs` mit fester Kennung, dann die Meldung.
- **Täglich:** das Tagestor T-D mit Beleg.
- **Am Ende:** frischer Gegenprüfer über ABNAHME. Bedingungen:
  - statisch 0 lucide, glass, glow und Verlauf unter `src/app/(bestand)`;
  - `werte.mjs` 0;
  - volle Suite grün;
  - axe und `a11y-zusatz` hart 0;
  - Lighthouse nicht schlechter als der Ausgangsstand, Budgets erreicht oder als begründete Abweichung;
  - Sichtabnahme ≥ 8 auf den 12 Hauptansichten (`_werkstatt/HAUPTANSICHTEN.json`).

## Fusion II (E-039, 12.10. ~10:00 CEST) – beide Sitzungsstände ohne Verlust zusammenführen

### Context
- Die Werkstatt-Sitzung hat trotz des Übergabevermerks weitergebaut: E3-Nacharbeit, E4 Familien (bad/*, fliesen/*) und Teile von E5 (untergrund, `[id]/[stadt]`).
  - Sie hat meinen Stand 5c3c359 eingemischt und auf `main` gepusht: **a1aeda6 = live**, 191 Commits, die mir fehlen.
  - Seit 09:40 CEST steht sie auf HALT; ihre Routinen sind deaktiviert.
- Lokal: 22 eigene, ungepushte Commits (HEAD e185941).
  - N-01/N-01b Ladelast: live ist mobil TBT 1 045 ms, Ursache ist `html:has()` und steckt noch in main;
  - S-01 `/leistungen`, S-03 `/blog`, S-01b/c, S-04 `/leistungen/[id]`;
  - Q-01…Q-05 (Formulare, Routenkarte);
  - vereinheitlichte Suite, Prüftor `tor-s.sh`, Werkzeugfixes.
  - Dazu ungecommittete Teilstände S-05 `/bad`, S-08 `/fliesen`, S-10 Ratgeber-Artikel; ihre Agenten wurden durch das Nutzungslimit abgebrochen.
- Probe-Merge (`git merge-tree`):
  - 29 Konflikte, alle in den doppelt gebauten Einheiten: `/leistungen`, `/leistungen/[id]`, `/blog` + BlogCard/BlogSidebar, BadanfrageFunnel, BadProjektCheck, FliesenKonfigurator, LeadQuickForm, RouteVisualization;
  - `globals.css` führt sauber zusammen (`html:has` weg, `body:has` + `main/footer`-clip bleiben);
  - `_relaunch/` und `_werkstatt/` ohne Konflikt.
- **Entscheidungen des Auftraggebers (AskUserQuestion, 12.10.):**
  1. Doppelt gebaute Seiten und Formulare **abschnittsweise blind vergleichen und fusionieren**. Verbesserungen ohne Optik kommen aus beiden.
  2. `/bad`, `/fliesen` und Ratgeber-Artikel: **Werkstatt-Fassung**. Meine Teilstände werden nur gesichert.
  3. **Nur diese Sitzung pusht**; die Werkstatt bleibt angehalten.
- Ziel: ein `main`, das alle fertigen Seiten beider Sitzungen trägt. Jede doppelt gebaute Einheit wird die bessere Fusion aus beiden, die Ladelast ist behoben, eine grüne Suite. Danach geht es Stück für Stück weiter mit den offenen Seiten.

### F0 · Sicherung und Merge-Basis M (ein Push, sichtbar nur Ladelast + Preisrechner-Phasen)
1. **Sichern:**
   - Lokalen `CLAUDE.md`-Block → `$S/claude-lokal.md`, dann `git checkout -- CLAUDE.md`.
   - WIP S-05/S-08/S-10: `git diff` als Patch und die ungetrackten Ordner (`src/components/{bad,fliesen,blog/artikel}`, `belege/s-05*`, `s-08*`, `s-10*`, `t-sammel-1`, `sammel-live`) → `$S/wip-e039/`.
   - Danach die getrackten WIP-Dateien auf HEAD zurück und die ungetrackten Ordner entfernen (sie liegen im Archiv).
2. `git fetch origin main`, dann `git merge --no-ff --no-commit origin/main`.
3. **Konflikte einheitsweise vorläufig in der Werkstatt-Fassung** (`git checkout --theirs`):
   - für die ganze Einheit, auch meine nur dort geänderten Nebendateien (`stile.js` der Funnels, `OptionGroup.jsx`). Sonst passen Exporte nicht zusammen; das zeigte sich in Q-01 als 500er „optionClass“.
   - Meine Fassungen bleiben in 5acf5e1/d33959a abrufbar (`git show`) für F2.
   - Auto-gemischt bleiben: `globals.css` (N-01/N-01b), `PricingCalculator` (Phasen-Fix), Suite, Werkzeuge, Dokumente.
   - Meine dann verwaisten Bausteine (`src/components/leistungen/*`, `BlogListe.jsx`) bleiben vorerst liegen; F2 nutzt oder entfernt sie.
4. Merge-Commit mit `ORCHESTRATOR=1 commit.sh --merge` (CLAUDE.md-Prüfung), dann den lokalen Block wiederherstellen.
5. **Suite auf M grün machen:**
   - Erst ein Lauf gegen den Build von M und gegen den Live-Build a1aeda6.
   - Für Werkstatt-Seiten die Testanpassungen aus `_werkstatt/werkzeuge/tests` übernehmen, dabei die Sperrklinke beachten. Fallen Fälle weg, gilt eine Begründung in LERNEN plus `--basis`.
6. **Sammel-Tor** `tor-s.sh a1aeda6 m-e039 /,/leistungen,/blog,/bad,/fliesen <alle Specs> --q` mit `BEREICH_AUCH='*'`:
   - erwartet nur CSS-Änderungen (N-01) und die Preisrechner-Seiten m375.
   - Ruhiges Fenster: Lighthouse `/` mobil + Desktop, 10 Paare gegen 707a93d **und** gegen a1aeda6; INP `/`.
7. Push `git push origin HEAD:main` (vorher fetch), dann `vercel-status`, `live-rauchtest` und `live-browser` mit fester Kennung, dann die Meldung.
8. **Dokumente:**
   - E-039 in `_relaunch/ENTSCHEIDUNGEN.md` (Wortlaut der drei Antworten);
   - Vermerk in `_werkstatt/PRUEFPUNKT.md`: HALT bestätigt, weiter nur über die Relaunch-Sitzung;
   - PLAN-Abschnitt „Fusion II“, STATUS und PRUEFPUNKT.
   - Werkstatt-Routinen nicht anfassen; sie sind deaktiviert und gehören der anderen Sitzung.

### F1 · Blindes Gutachten je Einheit (Workflow, Opus, ≈ 2 h)
- **Server:**
  - A = Build von M (Werkstatt-Fassungen + Ladelast-Fix), Port 4370;
  - B = Build von e185941 (meine Fassungen), Port 4371;
  - beide aus Reinraum-Kopien.
- **Material je Einheit, vom Orchestrator per Skript:**
  - Seiten: `_werkstatt/werkzeuge/abschnitte.mjs` (m390, d1440, je Abschnitt ein Bild).
  - Formulare: Zustandsbilder (Schritte, Fehler, Serverfehler, Erfolg, WhatsApp); die Skripte der Q-Agenten liegen in `$S/q-0x/`.
  - Dazu a11y-zusatz und axe für A und B.
- **Einheiten:** U1 `/leistungen` · U2 `/leistungen/[id]` (4 Seiten) · U3 `/blog` (+ Karten, Seitenleiste, Filter) · U4 Badanfrage · U5 Projekt-Check · U6 Konfigurator · U7 Schnellanfrage · U8 Routenkarte.
- **Gutachter (frischer Opus je Einheit):**
  - Fassungen als X/Y, die Zuordnung zufällig je Einheit und nur im Workflow-Skript bekannt.
  - Wertet je Abschnitt bzw. Zustand nach KERN v2: Fuge statt Karte, ein Rot je Bildschirm, Komposition, mobil, Lesbarkeit, Zustände.
  - Ausgabe (Schema): Wahl je Abschnitt mit Begründung, dazu Liste der **Verbesserungen der unterlegenen Fassung**, die übernommen werden müssen: Fokusringe, `role="alert"`, `autocomplete`, `aria-valuetext`, Überlauf-Fixes, sichtbare Labels, Kontrast.
  - Beleg: `_relaunch/belege/e039-gutachten/<einheit>.{json,md}`.

### F2 · Fusion bauen (Workflow-Pipeline je Einheit: Bau → Gegenprüfung; Dateien je Einheit disjunkt)
- **Baumeister (Opus) auf M im Arbeitsbaum (`next dev` 4350):**
  - Werkstatt-Datei als Grundlage, wo sie gewinnt; Abschnitte aus meiner Fassung, wo sie gewinnt (aus `git show 5acf5e1:<pfad>` bzw. d33959a).
  - Alle Verbesserungen der Liste übernehmen.
  - Werkstatt-Bausteine nutzen (Planblatt, Rückfrage, Zeitband, VerbandUmschalter).
  - Wortlaut, Anker, IDs und JSON-LD: Vereinigungsmenge, nichts geht verloren.
  - Selektoren beider Suiten bleiben gültig.
- **Gegenprüfer (frischer Opus):**
  - jede Wahl des Gutachtens umgesetzt;
  - `texte-vergleich` gegen live ohne Verlust;
  - a11y-zusatz je Kennzahl ≤ dem besseren Wert von A und B;
  - Specs grün; Bilder gesichtet.
  - Bei Befund ein Nachbau (höchstens zwei Runden).
- Danach je Einheit ein Commit (`PAKET=F-0x`, Auftrag `_relaunch/pakete/F-0x.md` mit Commit-Muster).

### F3 · Tore und Pushes in zwei Lieferungen (regelmäßige Meldungen)
- **Lieferung 1:** Formulare U4–U8 (geteilte Komponenten, T2-Q mit allen einbindenden Seiten und Pixel-Stichprobe). Danach Push und Meldung.
- **Lieferung 2:** Seiten U1–U3 (T2-Q, Lighthouse der Hauptansichten im ruhigen Fenster). Danach Push und Meldung.
- Danach die Schrittfolge neu zuschneiden: Von der Werkstatt erledigt sind E4 und E5-BAU-01/-02/-10. Offen bleiben:
  - meine S-06 `/standorte` mit Einzugsband, S-07 `[stadt]`, S-09 `/fliesen/konfigurator`, S-11 SIG-3/Fugenband, R-01 Fokus/Überlauf;
  - Werkstatt E5-BAU-03…09/-11, E6, Abbau, Kür.
  - Seiten, die beide schon gebaut haben, werden nicht erneut gebaut.

### Verifikation
- **F0:**
  - Reinraum grün; Probe-Merge = echter Merge (29 Konflikte, alle Werkstatt-Fassung);
  - `build-vergleich a1aeda6 M`: HTML gleich außer den Preisrechner-Seiten, CSS nur N-01/N-01b;
  - Pixel = 0 außer Preisrechner m375;
  - Suite grün auf M;
  - Lighthouse `/` mobil: TBT deutlich unter a1aeda6;
  - Live-Prüfung grün.
- **F1/F2 je Einheit:**
  - Gutachten mit Wahl je Abschnitt;
  - Fusion enthält jede gewählte Fassung; texte2 rot 0;
  - axe 0 auf den umgebauten Teilen; a11y-zusatz nicht schlechter als der bessere Elternteil;
  - Specs beider Formulare grün; Wortbruch 0; Bilder selbst gesichtet.
- **F3:** Sammel-Tor grün, Lighthouse im Budget oder als belegte Abweichung, Live-Prüfung grün.

