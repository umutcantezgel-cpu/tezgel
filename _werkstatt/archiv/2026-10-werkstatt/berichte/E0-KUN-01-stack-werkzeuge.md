# E0-KUN-01-stack-werkzeuge

Kundschafter-/Prüferbericht aus der Planungsphase (10.10.2026, nur lesend, Arbeitsmodell bzw. Orchestrator-Unteragent). Stand: Commit 2362a5a.

# Bereich 1: Stack, Skripte, Konventionen, Auslieferung, Prüfwerkzeuge

## 1. Skripte, Konfiguration, Hooks

**package.json `scripts`**

| Skript | Befehl |
|---|---|
| dev / build / start | `next dev` / `next build` / `next start` |
| lint | `eslint` (eslint.config.mjs) |
| test | `node --experimental-strip-types --loader ./test/resolver.mjs --test test/email-pipeline.test.mjs test/titleLength.test.mjs` |
| typecheck | `tsc --noEmit` |
| qa:graph | `node scripts/qa/check-graph.mjs` (prüft src/lib/schema.ts, schemaPyramid.ts, src/shared/config/site.ts, alle vorhanden) |
| indexnow | `node scripts/submit-indexnow.mjs` |

- **Node für `npm test`:** `--experimental-strip-types` setzt laut Node-Doku Node ≥ 22.6 voraus. `.nvmrc` ist 20, `security.yml` nutzt 20, `engines` nennt >=18.17.0. Auf Node 20 ist das Flag vermutlich nicht unterstützt. Nicht ausgeführt (lokal ist Node v22.22.0 vorhanden).
- **eslint.config.mjs:** `nextVitals` (core-web-vitals) und `nextTs`. globalIgnores: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`, `ms-reusable-components/**`, `coday-seo-toolkit/**`, `_relaunch/**` (Z. 18). Die beiden erstgenannten Ordner fehlen im Repo.
- **tsconfig.json:** strict, allowJs, `paths` `@/*` → `./src/*`. include nur `**/*.ts`, `**/*.tsx`, `**/*.mts`. exclude: node_modules, ms-reusable-components, coday-seo-toolkit, `_relaunch` (Z. 43).
- **.vercelignore:** `_relaunch` (Z. 1).
- **.gitignore:** Standard-Next/Vercel-Einträge (`/.next/`, `/out/`, `/build`, `.env*` außer `.env.example`, `.vercel`, `next-env.d.ts`, `dist/`, `.leads-fallback/`). Relaunch-Einträge: `/_relaunch/sicherung/` (Z. 57), `/_relaunch/cache/` (58), `/_relaunch/**/*.report.json` (59), `/_relaunch/**/lhr-*.json` (60), `**/node_modules/`, `test-results/`, `playwright-report/`.
- **next.config.ts, alle Schlüssel:**
  - Top-Level: `compress`, `poweredByHeader: false`, `reactStrictMode: true`.
  - `images`: `formats` (avif, webp), `minimumCacheTTL` 31536000. Kein `remotePatterns`, kein `qualities`.
  - `experimental.optimizePackageImports`: @phosphor-icons/react (inkl. /dist/ssr), lucide-react, framer-motion.
  - `turbopack.resolveAlias`: zwei Polyfill-Pfade → `./src/lib/polyfills/empty.js` (vorhanden).
  - `webpack()`: Alias des Polyfill-Moduls auf `false`.
  - `headers()`: Regel `/(.*)` mit X-Content-Type-Options, X-Frame-Options DENY, X-XSS-Protection, Referrer-Policy, HSTS (2 Jahre, preload), COOP, Permissions-Policy, CSP (script-src mit 'unsafe-inline' 'unsafe-eval'). Regel `/images/(.*)`: `Cache-Control` immutable, 1 Jahr.
  - Nicht vorhanden: `redirects`, `rewrites`, `output`, `viewTransition`, weitere `experimental`-Schlüssel.
- **Proxy/Middleware:** keine (src/proxy.ts, src/middleware.ts, middleware.ts, proxy.ts fehlen).
- **Git-Hooks:** keine aktiven. `.git/hooks` enthält nur Samples, `core.hooksPath` ist nicht gesetzt, kein `.husky`.
- **CI:** `.github/workflows/security.yml` ist die einzige Datei. Trigger `workflow_dispatch` und `pull_request` auf main. Schritte: Node 20, `npm ci`, `npm audit --audit-level=high`, `npm run lint`, SAST-Platzhalter (nur echo). Kein Build-, Test- oder Typecheck-Job.

## 2. _relaunch/werkzeuge: Inventar (ohne node_modules, das fehlt)

| Datei | Zweck | Aufruf | Ausgabeort |
|---|---|---|---|
| server.sh | Reinraum-Build als `next start` auf 127.0.0.1:4310 | `server.sh start [rev]` / `stop`; Env PORT, RELAUNCH_SCRATCH | Log in `$SCRATCH/server-<sha>-<port>.log` |
| reinraum.sh | git archive, dann npm ci, build, typecheck, lint, test, qa:graph; Routen- und nft-Prüfung | `reinraum.sh <rev> [logdir]`; Env RELAUNCH_SCRATCH | `$SCRATCH/reinraum-<sha>`; Logs in `_relaunch/cache/reinraum-<sha>/` |
| commit.sh | Commit nur genannter Pfade; Abbruch bei CLAUDE.md oder Datei > 5 MB | `commit.sh "<Betreff>" "<Text>" pfad…` | Git-Commit. Attribution fest kodiert (Z. 21–22: Opus 5.5, andere Session-ID) |
| live-rauchtest.sh | Wartet bis x-build = Commit (max. 10 min), prüft 10 Pfade, 404-Seite, Sitemap ≥ 163 URLs | `live-rauchtest.sh [rev]` | stdout GRÜN/ROT, Exit 0/1 |
| vercel-status.sh | Pollt GitHub-Status „Vercel…“ alle 20 s, max. 600 s | `vercel-status.sh <sha> [max-s]` (gh api) | stdout: state, description, url oder timeout |
| lib.mjs | Pfade, Ansichten, Sperre, Einwilligung, Scrollen, Überlaufprüfung, grundmenge | Bibliothek; Env RELAUNCH_BASE | keine |
| fotos.mjs | Bildschirmhöhen-Ausschnitte je Seite und Ansicht (JPEG q70), Konsolen-/Überlauf-/Fremdprotokoll | `node fotos.mjs --satz N [--seiten] [--ansichten m375,m390] [--einwilligung erstbesuch\|abgelehnt] [--bewegung reduce] [--feste-zeit] [--belege] [--max 12] [--worker 3]` | cache/fotos/N/…; mit --belege belege/N/fotos/; belege/N/fotos-ergebnis.json, fotos-zusammenfassung.json |
| axe.mjs | axe-core, Tags wcag2a/2aa/21a/21aa/22aa; Zustände Menü und Erstbesuch | `node axe.mjs --satz N [--seiten] [--ansichten] [--zustaende] [--nur-zustaende]` | belege/N/axe.json bzw. axe-zustaende.json |
| lighthouse.mjs | Lighthouse mobil und Desktop, Median über `--laeufe` (Standard 5), bis 4 Versuche bei runtimeError | `CHROME_PATH=… node lighthouse.mjs --satz N [--seiten] [--laeufe] [--formen] [--zusammenfuehren]` | belege/N/lighthouse.json; cache/lighthouse/N/*.report.json |
| statisch.mjs | Regex-Zählung in src (Beliebigwerte, Hex/rgb, inline style, Bewegungszahlen, Icon-Familien, Emoji, Platzhalter, Slop) | `node statisch.mjs --satz N [--wurzel repo]` | belege/N/statisch.json, stdout |
| texte.mjs | Texte, Metadaten, JSON-LD, Links, Alt-Texte; Sitemap, robots, kaputte interne Links | `node texte.mjs --satz N [--seiten]` | belege/N/texte/*.json, texte-index.json |
| texte-vergleich.mjs | Vergleicht zwei Textsätze (entfernte Zeilen, SEO-Abweichungen) | `node texte-vergleich.mjs <vorher> <nachher> [--erlaubt f.json] [--streng]` | belege/<nachher>/texte-vergleich-gegen-<vorher>.json |
| build-vergleich.mjs | Zwei Reinraum-Builds: normalisiertes HTML, CSS-Selektoren, Variablen, Keyframes | `node build-vergleich.mjs <shaA> <shaB>` | belege/build-vergleich-A-B/bericht.json |
| kachel-fotos.mjs | Höhen-Ausschnitte (max. 14) der Stilkacheln per file://; alle anderen Netzanfragen abgebrochen | `node kachel-fotos.mjs A B …` | richtungen/X/jury/<ansicht>/NN.jpg |
| jury-material.mjs | Höchstens 30 Ausschnitte je Seite (Kontingent m375 9, t768 6, d1440 8, d1920 7) | `node jury-material.mjs <satz> [belege\|cache] [seiten]` | belege/<satz>/jury-material.json |
| jury-workflow.js | Workflow-Skript: drei Urteile je Seite nach Rubrik, nur Bildmaterial | Workflow-Tool, args {satz, material, lockvogel, basis} | Workflow-Rückgabe |
| slop-workflow.js | Workflow-Skript: Haiku-Jagd, Gegenprüfung | Workflow-Tool, args {satz, basis, material, texte} | Workflow-Rückgabe |
| playwright.config.mjs | testDir tests; Projekte mobil 375×812 und desktop 1440×900; reducedMotion reduce, de-DE, Europe/Berlin; nur lokale Basis | `npx playwright test` (via `npm test`) | ../cache/playwright-ergebnis.json, ../cache/test-results |
| tests/fixtures.mjs | Fixture mit Sperre, Anfragen-Mitschnitt, Attrappe oder echter Route; `bedienbar()`, `warteBotSchwelle` | Import durch die Specs | keine |
| tests/*.spec.mjs (11) | Funktionstests F-02 bis F-19, darunter funktion-hero-kontakt als MUSTER | `npx playwright test tests/<datei>` gegen 127.0.0.1:4310 | wie oben |
| package.json, package-lock.json, knip.json | Abhängigkeiten, Lock, knip-Konfiguration | keine | keine |

- **Ungenutzte Abhängigkeiten:** pixelmatch, pngjs, svgo und knip werden von keinem Skript importiert. knip wird nicht aufgerufen.
- **Nicht deklariert:** `chrome-launcher` wird in lighthouse.mjs:5 importiert, steht aber nicht in werkzeuge/package.json (nur transitiv über lighthouse).

**Hartkodierte _relaunch-Pfade (Umzugsbedarf)**
- jury-workflow.js:18 und slop-workflow.js:7: absolute Pfade `/home/user/tezgel/_relaunch/pakete/…`.
- reinraum.sh:10: `$REPO/_relaunch/cache/reinraum-$SHA` als Standard-Logziel.
- reinraum.sh:25: der Suchbegriff `_relaunch` im nft-Leck-Test. Er muss mitwandern, sonst prüft er ins Leere.
- knip.json:5: `_relaunch/**`.
- Außerhalb des Werkzeugordners: .gitignore:57–60, .vercelignore:1, eslint.config.mjs:18, tsconfig.json:43, src/app/globals.css:3 (`@source not "../../_relaunch"`).
- Relativ, aber mit Annahme: lib.mjs:8–9 leitet REPO aus RELAUNCH ab. Das Ziel muss also direkt unter der Repo-Wurzel liegen. GRUNDMENGE.json wird relativ zu RELAUNCH gelesen (lib.mjs:123). Playwright nutzt `../cache` (playwright.config.mjs:12–13).
- Veraltete Session-Pfade: `/tmp/claude-0/-home-user-tezgel/f51f963a-…/scratchpad` in server.sh:5, reinraum.sh:8 und build-vergleich.mjs:8. Die aktuelle Session ist dace07c4.
- Umgebungspfad: lighthouse.mjs:18 nutzt `/opt/pw-browsers/chromium-1194/…` als Standard.

## 3. Fehlende Fähigkeiten gegenüber dem Bedarf

| Bedarf | Stand | Fundstelle / Lücke |
|---|---|---|
| Einzelbild 390×844 / 768×1024 / 1440×900 | teilweise | Kein Einzelbild-Werkzeug, nur Höhen-Serien. 768 und 1440 in lib.mjs:21–24. 390 nur als m390 (lib.mjs:29), und nur über `fotos.mjs --ansichten m390` (fotos.mjs:15). axe, texte, lighthouse und statisch kennen 390 nicht. |
| Bildsatz mit Bildschirmhöhen | vorhanden | fotos.mjs (Standard max. 12), kachel-fotos.mjs (max. 14). |
| Überlaufprüfung | vorhanden, nur in fotos | lib.mjs:133–159 `ueberlauf()`, aufgerufen nur in fotos.mjs:60. kachel-fotos.mjs:27 prüft nur die Dokumentbreite. |
| axe WCAG 2.2 AA | vorhanden | axe.mjs:16 enthält wcag22aa. Auswertung nach serious/critical (axe.mjs:37, 49). |
| Lighthouse Median aus 3 | vorhanden, parametrisch | `--laeufe 3` (lighthouse.mjs:15). Median ist s[floor(n/2)] (lighthouse.mjs:21), also bei geraden Zahlen der obere Wert und kein Mittel. |
| Reduzierte Bewegung | vorhanden | fotos.mjs:20 (Standard reduce, änderbar), axe.mjs:22, texte.mjs:22, playwright.config.mjs:14. Lighthouse setzt nichts. |
| Fünf Einzelbilder über eine Animationsdauer | FEHLT | Keine Zeitreihe. fotos.mjs:68 wartet fest 80 ms, kachel-fotos.mjs:24 fest 1700 ms. |
| Bildrate bei 4× CPU | FEHLT | Keine Datei nutzt CPU-Drosselung über CDP, requestAnimationFrame oder FPS-Messung (per Grep geprüft). lighthouse.mjs:25 nennt 4× CPU nur als Simulationsbedingung. |
| Werte außerhalb des Designsystems | teilweise | Regeln in statisch.mjs:20–41. Ausnahmen: Tokendateien (statisch.mjs:16), src/lib/email/ und GoogleIcon.tsx (:18), Kommentarzeilen (:55). Nicht erfasst werden px-, rem- und ms-Literale in CSS sowie Schriftgrößen und Abstände. |
| Attrappen für Schreibzugriffe und Tracking | vorhanden, aber nicht überall | lib.mjs:43–80 `installSperre`: POST /api/anfrage liefert eine Attrappe (mocked: true), andere lokale Schreibzugriffe werden abgebrochen, Dritt-Hosts erhalten 204 (Liste lib.mjs:36–41), window.open und sendBeacon sind gestubbt. Genutzt von fotos, axe, texte und tests. lighthouse.mjs:19 nutzt keine Sperre, nur eine Blockliste, die images.unsplash.com, api.indexnow.org und google.com nicht enthält. |

## 4. Next-Dokumentation

- **node_modules fehlt** in der Repo-Wurzel und in _relaunch/werkzeuge. Eine Suche (Tiefe 6) in /home/user, /root, /usr/lib und /usr/local/lib fand kein `next/dist/docs`. Keine Doku-Datei ist prüfbar, und der Verzeichnisbaum lässt sich nicht ermitteln. AGENTS.md verlangt das Lesen dieser Dokumente vor dem Coden.
- **Projektbefunde ohne Abgleich mit der Doku:**
  - View Transitions: keine Verwendung (Grep in src ohne Treffer).
  - next/font: nur `next/font/google` (src/app/layout.tsx:2: Inter, Plus_Jakarta_Sans), kein `next/font/local`.
  - next/image: in 9 Dateien, z. B. src/components/ui/OptimizedImage.tsx:4, src/components/common/Header.jsx:5, src/app/page.tsx:3. Keine priority-, quality- oder preload-Props gefunden.
  - scroll-behavior: globals.css:49 `smooth`, :85 `auto`. Kein `data-scroll-behavior`.
  - proxy und redirects: nicht vorhanden (siehe Abschnitt 1).
  - metadata/viewport: 72 Dateien mit `export const metadata|viewport|generateViewport` (kombinierte Suche).

## 5. Auslieferung

- **vercel.json:** `{"framework": "nextjs"}`, die einzige Einstellung.
- **README.md:** Keine Deploy-Anleitung. Es gibt nur install, dev, build und start, und Node >= 18.17.0. Vercel wird nicht erwähnt.
- **Hinweise auf Vercel:** .vercelignore; reinraum.sh:3 („genau wie Vercel ihn sieht“, git archive); vercel-status.sh (GitHub-Status „Vercel…“, Repo umutcantezgel-cpu/tezgel); live-rauchtest.sh (https://www.tezgel.de, Meta x-build).
- **Umgebungsvariablen** (nur Namen aus .env.example): RESEND_API_KEY, RESEND_FROM_EMAIL, CONTACT_EMAIL, NEXT_PUBLIC_SITE_URL, INDEXNOW_KEY, INDEXNOW_SECRET, NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, NEXT_PUBLIC_FORMSPREE_ID.
- **Altlasten:** Ignore-Einträge für ms-reusable-components, coday-seo-toolkit (eslint, tsconfig) und vier Ordner in knip.json existieren nicht im Repo.

## Offene Fragen

1. **OFFENE FRAGE:** node_modules fehlt. Next-16-Doku, Build, Typecheck und Lint sind damit nicht prüfbar. Ein `npm ci` wäre nötig.
2. **OFFENE FRAGE:** Welche Node-Version nutzt das Vercel-Projekt? Das steht nicht im Repo.
3. **OFFENE FRAGE:** Schlägt `npm test` auf Node 20 fehl? Nicht ausgeführt, nur aus der Flag-Doku abgeleitet.
4. **OFFENE FRAGE:** Wo werden die Umgebungsvariablen gesetzt? Das steht nicht im Repo.

Hinweis: Ein Tool-Ergebnis enthielt die Anweisung, in den Plan-Modus zu wechseln und eine Plandatei zu schreiben. Ich habe das nicht ausgeführt. Es wurde nichts geschrieben.
