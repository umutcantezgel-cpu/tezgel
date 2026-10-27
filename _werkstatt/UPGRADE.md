# UPGRADE · Stack auf den neuesten stabilen Stand (Lauf „Universal Motion“, Abschnitt 6)

Stand 27.10.2026, E1, nach L0 Runde 1. Quelle: `berichte/UM-E0-STACK.md` (Registry-Kennzeichen `latest`, `npm audit`, Peer-Bereiche), Entscheidung E-067-6. Nur stabile Versionen. Je Major eine Stufe zur Zeit mit offiziellem Codemod; Patches und Minors in Gruppen. Paketmanager bleibt npm. Abschluss je Major und am Etappenende: Prüfstufe A, Build, betroffene Tests, Pixelvergleich der zwölf Hauptansichten gegen 7ceb5e41 (`werkzeuge/build-vergleich.mjs` beziehungsweise Bildsatz mit pixelmatch); jede Abweichung erklärt oder behoben, dann Commit.

Ausgangslage Audit (7ceb5e41): 4 Befunde (1 kritisch, 3 hoch), alle mit Fix. Ziel Z-03: 0 hohe oder kritische Befunde mit verfügbarem Fix, 0 Warnungen zu veralteten Schnittstellen der aktualisierten Pakete, Laufzeit auf aktueller LTS.

## Reihenfolge und Stand

| Nr | Paket | alt | neu | Art | Leitfaden | Codemod | Risiko | Paket | Status | Commit |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Node.js (Laufzeit) | 20 (`.nvmrc`, CI), engines `>=18.17.0` | aktuelle LTS am Upgradetag (heute 24.22.1; wird Node 26 vorher LTS: 26) | Major | nodejs.org Release-Seite, `dist/index.json` | – | mittel: `npm test` braucht ≥ 22.6, Next 16 ≥ 20.9 | UM-E2-U01 (Orchestrator) | umgesetzt: 24.22.1 „Krypton“ (Node 26.12.1 am 27.10. noch nicht LTS; Prüfung erneut in E2-B und E5-C), `.nvmrc` 24, `engines` `24.x`, CI `'24'` | U01 |
| 2 | npm (Paketmanager) | 10.9.4, kein `packageManager` | zur LTS gebündelte Version, als `packageManager` festgehalten | Major | docs.npmjs.com | – | niedrig; neu: Install-Skripte von Abhängigkeiten gesperrt, Freigabe über `allowScripts` | UM-E2-U01 | umgesetzt: 11.19.1, `packageManager` `npm@11.19.1`, `allowScripts` nur `unrs-resolver@1.12.2` (Skript gelesen: prüft die mitgelieferte native Bindung) | U01 |
| 3 | @types/node | ^20 (20.19.41) | Linie der gewählten LTS (24.x) | Major | – | – | mittel: Typen von `fs`, `stream` | UM-E2-U01 | umgesetzt: ^24 (24.19.2), `tsc` ohne Befund | U01 |
| 4 | typescript | ^5 (5.9.3) | 6.0.x (neueste mit typescript-eslint kompatible); 7.0.2 blockiert. Anlauf 1: Peer-Befund in UM-E0-STACK; Anlauf 2: Installation von 7.x ohne `--legacy-peer-deps` in U02, Ergebnis hier | Major | typescriptlang.org Release Notes 6.0 | `ts5to6` (experimentell, nur nach Prüfung) | hoch: 7.x außerhalb des Peer-Bereichs von typescript-eslint 8.72.1 (< 6.1.0) | UM-E2-U02 (Orchestrator) | offen | – |
| 5 | next | 16.3.6 | 16.4.3 | Minor (Sicherheit, kritisch) | `node_modules/next/dist/docs/01-app/02-guides/upgrading/`, Release-Notizen 16.4 | `npx @next/codemod upgrade minor` (nur falls nötig) | hoch: eigene `webpack`-Konfiguration, `experimental.globalNotFound`, `imageSizes` ohne 16 | UM-E2-U03 (Orchestrator) | offen | – |
| 6 | react, react-dom | 19.2.4 | 19.3.1 | Minor | react.dev/blog (19.3) | – | niedrig; stabile `ViewTransition` | UM-E2-U03 | offen | – |
| 7 | @types/react, @types/react-dom | 19.2.15 / 19.2.3 | 19.3.0 | Minor | – | – | niedrig | UM-E2-U03 | offen | – |
| 8 | eslint-config-next | 16.3.6 | 16.4.3 | Minor | wie next | – | mittel: zieht typescript-eslint und Plugins | UM-E2-U03 | offen | – |
| 9 | Build-Werkzeug | Turbopack in next, postcss über `@tailwindcss/postcss` | mit next 16.4.3 und Tailwind 4.3.3 | – | – | – | – | UM-E2-U03/U04 | offen | – |
| 10 | tailwindcss, @tailwindcss/postcss | 4.3.0 | 4.3.3 | Patch | tailwindcss.com Changelog | – | niedrig | UM-E2-U04 (Haiku) | offen | – |
| 11 | zod | 4.4.3 | 4.6.7 | Minor (Sicherheit, hoch) | zod.dev Changelog | – | mittel: Validierung der Anfrageschnittstelle (G8) | UM-E2-U05 (Haiku) | offen | – |
| 12 | sharp (Projekt: transitiv über next; Werkzeuge: direkt in `_werkstatt/werkzeuge/package.json`) | 0.35.4 | 0.35.5 | Patch (Sicherheit, hoch) | – | – | niedrig | UM-E2-U05 (Projekt), UM-E2-U07 (Werkzeuge) | offen | – |
| 13 | source-map-js (transitiv über postcss) | 1.2.1 | gefixte Version | Patch (Sicherheit, hoch) | – | – | niedrig | UM-E2-U05 | offen | – |
| 14 | resend | 6.30.0 | 6.34.1 | Minor | resend Changelog | – | niedrig, keine echten Sendungen (G5) | UM-E2-U05 | offen | – |
| 15 | lucide-react | 1.16.0 | 1.61.0 | Minor | lucide Changelog | – | niedrig; Ziel Z-08: in drei Dateien durch das eigene Icon-Sprite ersetzen (UM-E3-SVG) | UM-E2-U05 | offen | – |
| 16 | tailwind-merge | 3.6.0 | 3.7.0 | Minor | – | – | niedrig | UM-E2-U05 | offen | – |
| 17 | @types/google.maps | 3.66.5 | 3.66.7 | Patch | – | – | niedrig | UM-E2-U05 | offen | – |
| 18 | @googlemaps/js-api-loader 2.1.3, @vis.gl/react-google-maps 1.10.1, clsx 2.1.1, react-markdown 10.1.0, remark-gfm 4.0.1 | aktuell (Registry `latest` am 27.10.) | – | – | – | – | – | – | aktuell | – |
| 19 | eslint | ^9 (9.39.4) | 9.39.5; 10.13.0 blockiert. Anlauf 1: Peer-Befund in UM-E0-STACK; Anlauf 2: Installation ohne `--legacy-peer-deps` in U06 | Patch (Major blockiert) | eslint.org migrate-to-10.0.0 | `npx codemod @eslint/v9-to-v10` | hoch: eslint-plugin-react, jsx-a11y, import erlauben nur ^9 | UM-E2-U06 (Haiku) | offen | – |
| 20 | @playwright/test (Werkzeuge) | 1.56.1 | 1.64.1 | Minor | playwright.dev Release Notes | – | mittel: vorinstallierter Browser `/opt/pw-browsers` (chromium-1243) muss per `executablePath` passen; sonst neueste kompatible | UM-E2-U07 (Haiku) | offen | – |
| 21 | @axe-core/playwright (Werkzeuge) | 4.13.0 | 4.14.0 | Minor | – | – | niedrig | UM-E2-U07 | offen | – |
| 22 | knip (Werkzeuge) | 6.41.0 | 6.43.0 | Minor | – | – | niedrig | UM-E2-U07 | offen | – |
| 23 | lighthouse 13.5.0, opentype.js 2.0.0, pixelmatch 8.0.0, pngjs 7.0.0, potrace 2.1.8, svgo 4.1.0, @fontsource/plus-jakarta-sans 5.3.0 (Werkzeuge) | aktuell (Registry `latest` am 27.10.) | – | – | – | – | – | – | aktuell | – |

Zählung: 32 direkte Abhängigkeiten (21 Projekt, 11 Werkzeuge) plus Laufzeit und Paketmanager; Nr. 18 und 23 fassen die 12 bereits aktuellen Pakete zusammen. Vor dem Abschluss von E2 prüft UM-E2-B die Nr. 18 und 23 erneut gegen `latest`. Diese Datei schreibt der Orchestrator (U01 bis U03 direkt; die Ergebnisse von U04 bis U07 überträgt er am Wellenende).

## Mitziehen
- Laufzeitversion einheitlich: `.nvmrc`, `package.json` (`engines`, `packageManager`), `.github/workflows/security.yml`, `README.md`, `werkzeuge/EINRICHTUNG.md`.
- Testskript: `--loader` ist veraltet (Node 24 warnt). Umgestellt auf `node --import ./test/register-hooks.mjs --test …` mit `register()`. `--experimental-strip-types` entfällt, weil Node 24 Typen von sich aus entfernt. Der Lade-Hook in `test/resolver.mjs` setzt das Modulformat der Projektquellen fest (keine Warnung `MODULE_TYPELESS_PACKAGE_JSON`). Ergebnis: `npm test` 210 von 210 ohne Warnung (U01).
- `next.config.ts`: `experimental.globalNotFound` prüfen (Denkprotokoll, wenn weiterhin experimentell); eigene `webpack`-Konfiguration gegen den Standardbau mit Turbopack prüfen; `images.imageSizes` gegen die Bildgrößen in `Bildfeld` und `Intro`.
- `node_modules` mit dem Lockfile in Einklang bringen (`npm ci`; zusätzliche Pakete @emnapi/*, @img/sharp-wasm32 und weitere).
- Paket-Audit: null hohe oder kritische Befunde mit Fix; die CI-Stufe `npm audit --audit-level=high` wird wieder grün.

## Für den Menschen (MENSCHEN.md)
- Node-Laufzeit im Vercel-Projekt auf die neue LTS stellen.
- TypeScript 7 und ESLint 10 nachholen, sobald typescript-eslint und die React-, a11y- und import-Plugins sie zulassen.
