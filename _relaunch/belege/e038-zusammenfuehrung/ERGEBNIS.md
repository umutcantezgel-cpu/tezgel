# Phase 0 · Zusammenführung mit origin/main (E-038) · live c27fc77

| Prüfung | Ergebnis |
|---|---|
| Merge | 6e9b619 (`commit.sh --merge`), origin/main 6156079 eingemischt; einziger Konflikt `src/lib/motion/kopfskript.ts`: `KOPFSKRIPT` (aktives Dokument `(bestand)`) byte-gleich aus origin, `KOPF_SKRIPT` (ruhendes `(kern)`) mit Einwilligungsteil aus P4-13 |
| Arbeitsbaum | eslint `kopfskript.ts` grün · `npm test` 35/35 (inkl. `test/bewegung.test.mjs`) · tsc lokal ohne `next-env.d.ts` (entsteht beim Build) |
| Reinraum 6156079 / c27fc77 | npm ci, Build, typecheck, lint, test, qa:graph: alle Exit 0 |
| build-vergleich streng 6156079 → c27fc77 | **HTML 172 gleich, CSS gleich** (0 Selektoren, 0 Variablen, 0 Keyframes) – live unverändert |
| Bereich | Produktdateien nur ruhend (`src/components/kern/{einwilligung,fuss,kopf-b}`, `src/styles/kern.css`) und `kopfskript.ts` (nur `KOPF_SKRIPT`); 29,4 MB, größte Datei 0,5 MB; `CLAUDE.md` nicht im Bereich |
| Push | `6156079..c27fc77` auf main; Vercel-Status success |
| Live | `x-build` = c27fc77 · `live-rauchtest.sh` GRÜN (Hauptseiten 200, 404, Sitemap 163, robots, llms) · `live-browser.mjs` GRÜN (8 Routen, Konsole 0, CSP 0, 53 Anfragen ≥ 1 s Abstand) |
| Übergabe | `_werkstatt/STATUS.md` und `PRUEFPUNKT.md`: Vermerk „ÜBERGEBEN – nicht fortsetzen, nicht pushen“; M-21 beantwortet; E-038 |
