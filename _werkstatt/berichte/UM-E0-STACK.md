# UM-E0-STACK · Bestandsaufnahme Stack-Upgrade (Stand 27.10.2026, Commit 7ceb5e41)

Quelle: `package.json` (Projekt, 21 direkte Abhängigkeiten), `_werkstatt/werkzeuge/package.json` (11), Registry über `npm view <paket> dist-tags` (Kennzeichen `latest`), installiert laut `npm ls --depth=0`. Keine Vorabversionen gewählt.

## Entwurf UPGRADE.md

| Paket | alt (Manifest; installiert) | neu (latest, stabil) | Art | Leitfaden | Codemod | Risiko | Status | Commit |
|---|---|---|---|---|---|---|---|---|
| **Laufzeit: Node.js** | 20 (`.nvmrc`); engines `>=18.17.0` | 24.22.1 LTS | Major | nodejs.org/dist/index.json (lts), Release-Seite | – | Mittel: Next 16 braucht >=20.9; ESLint 10 braucht >=20.19 | offen | – |
| **Laufzeit: npm** (Paketmanager bleibt npm) | kein `packageManager`-Feld; 10.9.4 | 12.2.1 | Major | OFFEN (nicht ermittelt) | – | Niedrig | offen (OFFENE FRAGE: 11 oder 12) | – |
| typescript (dev ^5; 5.9.3) | 5.9.3 | 7.0.2 | Major | TS-6.0-Notizen: typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html (geprüft); TS-7-Notiz unter .../typescript-7-0.html: 404, OFFEN | experimentell `ts5to6` (laut TS-6-Notiz, nicht ausgeführt) | Hoch: typescript-eslint 8.72.1 Peer `<6.1.0` | offen | – |
| @types/node (dev ^20; 20.19.41) | 20.19.41 | 26.6.5 (Linie 24: 24.19.2) | Major | OFFEN: kein Leitfaden gefunden | – | Mittel | offen (OFFENE FRAGE: Linie 24 oder 26) | – |
| @types/react (dev ^19; 19.2.15) | 19.2.15 | 19.3.0 | Minor | react.dev/blog (React 19.3) | – | Niedrig | offen | – |
| @types/react-dom (dev ^19; 19.2.3) | 19.2.3 | 19.3.0 | Minor | react.dev/blog | – | Niedrig | offen | – |
| @types/google.maps (^3.66.5) | 3.66.5 | 3.66.7 | Patch | – | – | Niedrig | offen | – |
| next (exakt 16.3.6) | 16.3.6 | 16.4.3 | Minor | lokal: node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md; 16.4-Notizen OFFEN | `npx @next/codemod upgrade minor` (nur falls nötig) | Hoch: kritischer Befund, Fix vorhanden | offen (Priorität) | – |
| react (exakt 19.2.4) | 19.2.4 | 19.3.1 | Minor | react.dev/blog (19.3, 9.9.2026) | – | Niedrig | offen | – |
| react-dom (exakt 19.2.4) | 19.2.4 | 19.3.1 | Minor | wie react | – | Niedrig; Peer verlangt react ^19.3.1, zusammen heben | offen | – |
| eslint-config-next (exakt 16.3.6) | 16.3.6 | 16.4.3 | Minor | wie next | – | Mittel: zieht typescript-eslint, plugin-react, jsx-a11y, import | offen | – |
| @tailwindcss/postcss (^4; 4.3.0) | 4.3.0 | 4.3.3 | Patch | OFFEN (Notizen nicht abgerufen) | – | Niedrig | offen | – |
| tailwindcss (^4; 4.3.0) | 4.3.0 | 4.3.3 | Patch | wie oben | – | Niedrig | offen | – |
| @googlemaps/js-api-loader (^2.1.3) | 2.1.3 | 2.1.3 | aktuell | – | – | – | – | – |
| @vis.gl/react-google-maps (^1.10.1) | 1.10.1 | 1.10.1 | aktuell | – | – | – | – | – |
| clsx (^2.1.1) | 2.1.1 | 2.1.1 | aktuell | – | – | – | – | – |
| lucide-react (^1.16.0) | 1.16.0 | 1.61.0 | Minor | OFFEN | – | Niedrig: Icon-Namen prüfen | offen | – |
| react-markdown (^10.1.0) | 10.1.0 | 10.1.0 | aktuell | – | – | – | – | – |
| remark-gfm (^4.0.1) | 4.0.1 | 4.0.1 | aktuell | – | – | – | – | – |
| resend (^6.30.0) | 6.30.0 | 6.34.1 | Minor | OFFEN | – | Niedrig; keine echten Sendungen | offen | – |
| tailwind-merge (^3.6.0) | 3.6.0 | 3.7.0 | Minor | OFFEN | – | Niedrig | offen | – |
| zod (^4.4.3) | 4.4.3 | 4.6.7 | Minor | OFFEN | – | Hoch: Audit high, Fix ab 4.6.6 | offen (Sicherheit) | – |
| eslint (^9; 9.39.4) | 9.39.4 | 10.13.0 (Major); 9.39.5 (Patch in ^9) | Major | eslint.org/docs/latest/use/migrate-to-10.0.0 (geprüft) | `npx codemod @eslint/v9-to-v10` | Hoch: eslint-plugin-react, -jsx-a11y, -import erlauben eslint nur `^9` | offen (10 blockiert) | – |
| @axe-core/playwright (4.13.0) | 4.13.0 | 4.14.0 | Minor | OFFEN | – | Niedrig | offen | – |
| @fontsource/plus-jakarta-sans (5.3.0) | 5.3.0 | 5.3.0 | aktuell | – | – | – | – | – |
| @playwright/test (1.56.1) | 1.56.1 | 1.64.1 | Minor | OFFEN (Notizen nicht abgerufen) | – | Mittel: Browser-Versionen | offen | – |
| knip (6.41.0) | 6.41.0 | 6.43.0 | Minor | OFFEN | – | Niedrig | offen | – |
| lighthouse (13.5.0) | 13.5.0 | 13.5.0 | aktuell | – | – | – | – | – |
| opentype.js (2.0.0) | 2.0.0 | 2.0.0 | aktuell | – | – | – | – | – |
| pixelmatch (8.0.0) | 8.0.0 | 8.0.0 | aktuell | – | – | – | – | – |
| pngjs (7.0.0) | 7.0.0 | 7.0.0 | aktuell | – | – | – | – | – |
| potrace (2.1.8) | 2.1.8 | 2.1.8 | aktuell | – | – | – | – | – |
| sharp (0.35.4) | 0.35.4 | 0.35.5 | Patch | – | – | Hoch: Audit high, Fix vorhanden | offen (Sicherheit) | – |
| svgo (4.1.0) | 4.1.0 | 4.1.0 | aktuell | – | – | – | – | – |

Zählung: 32 direkte Abhängigkeiten (21 Projekt, 11 Werkzeuge), dazu Laufzeit und Paketmanager. Die Tabelle hat 32 + 2 Zeilen.

## Laufzeit

- `.nvmrc`: `20`. `package.json:5-6` engines `>=18.17.0`. `README.md:44-45` nennt Node >=18.17.0, npm >=9.0.0. `.github/workflows/security.yml:19` `node-version: '20'`. Keine Dockerfile, kein `.node-version`. `vercel.json` nennt keine Laufzeit; sie steht im Vercel-Dashboard (MENSCHEN).
- Next 16.3.6 verlangt Node >=20.9.0 (`node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md:122`). engines von 18.17 ist damit falsch.
- Aktuelle LTS laut index.json: v24.22.1 (Krypton, 20.10.2026). Node 20 ist laut Release-Plan nicht mehr unterstützt; das Datum habe ich in diesem Lauf nicht am Quelltext bestätigt (OFFENE FRAGE).
- Lokal: Node v22.22.0, npm 10.9.4.

## Audit (`npm audit --json`, nur Lesen, Projektordner)

Befunde: 4 (critical 1, high 3, moderate/low/info 0). Alle vier haben einen Fix.

- `next` critical, direkt, Bereich 16.0.0–16.4.0, Fix 16.4.3 (Minor). Mehrere Advisories (u. a. Draft-Mode-Leck, Cache-Vergiftung SSG/ISR, Dev-MCP-Endpunkt).
- `zod` high, direkt, Bereich <4.6.6, Fix 4.6.7 (GHSA-mrhx-c7xc-m3w5).
- `sharp` high, transitiv über `next` (optionalDependencies `^0.35.4`, package-lock), Bereich <0.35.5, Fix 0.35.5 (librsvg, CVE-2026-96889).
- `source-map-js` high, transitiv über `postcss` (`next` und `@tailwindcss/postcss`), Bereich 1.0.0–1.2.1, Fix verfügbar.
- Die CI-Stufe `security.yml` führt `npm audit --audit-level=high` aus. Mit diesen Befunden schlägt sie fehl.

## Skripte (`package.json:10-16`)

- `dev` next dev · `build` next build · `start` next start · `lint` eslint (kein `next lint`, passt zu Next 16).
- `test` (Zeile 13): `node --experimental-strip-types --loader ./test/resolver.mjs --test …`. Den Schalter `--experimental-strip-types` braucht Node >=22.6 (aus der Node-Dokumentation, nicht ausgeführt). `--loader` gilt als veraltet.
- `qa:graph` node scripts/qa/check-graph.mjs · `typecheck` tsc --noEmit · `indexnow` node scripts/submit-indexnow.mjs (sendet extern, nicht ausgeführt).

## Auslieferung

- `vercel.json:4-5`: Framework nextjs; Deployment für Branch `claude/tezgel-website-redesign-iqxt8z` deaktiviert.
- `next.config.ts`: kein `output` (Standard-Serverbetrieb, kein Export). `experimental.globalNotFound: true` (Zeile 30) ist im Next-16.3.6-Docs als experimentell geführt (`01-app/03-api-reference/03-file-conventions/not-found.md:47`). Nach AUFTRAG-Regel nur mit Denkprotokoll, Rückfall und Eintrag in MENSCHEN.md.
- `next.config.ts` hat `turbopack` (Zeile 32) und `webpack` (Zeile 38). Laut Upgrade-Doku scheitert `next build` mit eigenem webpack ohne `--webpack`. Der Produktionsbau auf 16.3.6 läuft trotzdem; Verhalten auf 16.4.3 offen.
- `images` (Zeile 21-26): `minimumCacheTTL` und `qualities: [75]` sind gesetzt. Das Standard-`imageSizes` hat die 16 verloren (version-16.md:742); Auswirkung auf die `srcset` der Bilder in `src/components/kern/Bildfeld.tsx` und `src/components/intro/Intro.tsx` ist OFFEN.
- Headers mit CSP ab Zeile 47; Weiterleitungen ab Zeile 15. `src/proxy.ts` existiert (kein `middleware.ts`). `.vercelignore` schließt `_relaunch` und `_werkstatt` aus.

## Prüfung der Migrationsbrüche (Suche, keine Build-Läufe)

- Keine Treffer in `src/`: `serverRuntimeConfig`, `publicRuntimeConfig`, `next/legacy/image`, `cookies()`/`headers()`/`draftMode()` ohne await, `{ params }` ohne await, `middleware`-Export.
- `devIndicators: false` (Zeile 9) ist laut Doku zulässig.
- `tsconfig.json`: `strict`, `esModuleInterop: true` (Zeile 13), `moduleResolution: bundler` (Zeile 15), `plugins` next (Zeile 20). Kein `types`-Eintrag. Nicht geprüft: ob TS 6/7 die Typpakete dadurch anders einbindet.
- `eslint.config.mjs`: bereits Flat Config (Imports `eslint-config-next/core-web-vitals` und `/typescript`).

## Risiken (nach Priorität)

1. next 16.3.6 hat einen kritischen Befund mit Fix in 16.4.3. Der Fix ist nicht major.
2. ESLint 10 ist derzeit nicht peer-kompatibel. Die Plugins eslint-plugin-react 7.37.5, jsx-a11y 6.10.2 und import 2.32.0 erlauben eslint nur bis `^9`. Ein Upgrade nur mit `--legacy-peer-deps` ist kein gültiger Weg.
3. TypeScript 7 liegt außerhalb des Peer-Bereichs von typescript-eslint 8.72.1 (`<6.1.0`).
4. zod und sharp haben Fixes; sharp wird transitiv über Next gezogen.
5. Node 20 in `.nvmrc`, CI und Dokumenten; engines und README sind falsch.
6. `npm test` setzt Node >=22.6 voraus.
7. `node_modules` ist nicht synchron mit dem Lockfile (`npm ls` zeigt extraneous: @emnapi/*, @img/sharp-wasm32, @napi-rs/wasm-runtime, @tybys/wasm-util).

## GEÄNDERTE DATEIEN

Nur `/home/user/tezgel/_werkstatt/berichte/UM-E0-STACK.md` (neu). Keine anderen Dateien geschrieben. Die Audit-Rohdaten liegen im Scratchpad.

## WAS UND WARUM

Erfasst für UPGRADE.md: alle 32 direkten Abhängigkeiten mit alter und neuer stabiler Version, Art, Leitfaden, Codemod und Risiko, dazu Laufzeit und Paketmanager. Geprüft: TS-6-Notiz, ESLint-10-Leitfaden, Next-16-Leitfaden (lokal), React-19.3-Blog, Peer-Bereiche der Plugins.

## GEMEINSAME DATEIEN (gewünschte Änderungen, nicht ausgeführt)

- `package.json:5-6` engines `>=18.17.0` → `>=20.9.0` (Next 16.4) oder die gewählte Node-LTS.
- `.nvmrc` `20` → Zielversion nach Entscheidung (LTS 24).
- `.github/workflows/security.yml:19` `node-version: '20'` → Zielversion.
- `README.md:44-45` Node-Angabe anpassen.
- `package.json:13` Testskript: Node-Mindestversion dokumentieren.

## PRÜFUNG UND ERGEBNIS

- Direkte Abhängigkeiten: 21 (Projekt) + 11 (Werkzeuge) = 32, Tabelle hat 32 Paketzeilen plus 2 Laufzeitzeilen. Je Major-Zeile steht ein Leitfaden oder eine OFFENE FRAGE.
- `npm audit`: 4 Befunde, gezählt im JSON-Feld metadata.
- Nicht ausgeführt (Vorgabe): Build, Lint, tsc, Tests, Browserläufe, Lighthouse, axe, Server-Starts, Registry-Installation.
- `git status` zeigt zum Ende des Laufs nur `_werkstatt/berichte/UM-E0-STACK.md` als neu.

## BILDBELEGE

Keine. Es gab keinen Browserlauf.

## OFFENE FRAGEN

1. Zielversion Node: LTS 24 (empfohlen laut Index) oder Node 22/26?
2. npm: 11 (zu Node 24 gebündelt) oder 12.2.1 (latest)?
3. @types/node: Linie 24 (zur Laufzeit passend) oder 26 (latest-Tag)?
4. TypeScript 7: offizielle TS-7-Notiz (URL unbekannt, 404 unter dem Standardpfad) und ein typescript-eslint, das TS 7 unterstützt. Bis dahin Stopp.
5. ESLint 10: warten auf Plugin-Updates (react, jsx-a11y, import) oder ESLint 9.39.5 als Ziel?
6. Next 16.4.x: GitHub-Release-Notizen nicht abgerufen. Ist `experimental.globalNotFound` in 16.4 stabil oder noch experimentell?
7. Build mit eigener webpack-Konfiguration auf 16.4.3: funktioniert der Standardbau ohne `--webpack`?
8. imageSizes-Änderung: Wirkung auf die Bildgrößen-Liste in Bildfeld und Intro.
9. Node-20-Support-Ende: Datum bestätigen (nicht im Lauf geprüft).
10. Changelogs für Minor-Pakete (Tailwind, zod, resend, lucide, Playwright, knip, axe): nicht abgerufen.

=== ENDE UM-E0-KUND-STACK · BEREIT ZUR RÜCKGABE ===
