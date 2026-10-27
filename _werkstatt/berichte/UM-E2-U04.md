# UM-E2-U04 · Tailwind · Bericht

## GEÄNDERTE DATEIEN
- `/home/user/tezgel/package-lock.json` (npm update, 17 Einträge). Der Stand steht bereits im lokalen Commit 91615baa auf HEAD, den ich nicht erstellt habe (siehe OFFENE FRAGEN 1).
- `/home/user/tezgel/_werkstatt/berichte/UM-E2-U04.md` (neu)
- `/home/user/tezgel/package.json`: unverändert (byte-gleich zur Sicherung, `^4` bleibt)

## WAS UND WARUM
- tailwindcss 4.3.0 → 4.3.3 (`npm ls`: 4.3.3; `npm view`: neueste 4.3.3)
- @tailwindcss/postcss 4.3.0 → 4.3.3 (`npm ls`: 4.3.3)
- Befehl: `npm update tailwindcss @tailwindcss/postcss`, Exit 0.
- Transitiv: @tailwindcss/node, @tailwindcss/oxide und zwölf Plattformpakete auf 4.3.3; enhanced-resolve 5.22.0 → 5.26.0, weil @tailwindcss/node 4.3.3 `^5.24.1` verlangt.

Leitfaden: CHANGELOG.md am Tag v4.3.3 (4.3.1 bis 4.3.3), per Git-Klon gelesen, weil die GitHub-API gesperrt ist (403). Befunde zu Klassen und Standardwerten:
1. 4.3.1 (#20196), Changed: `m-0`/`left-0` erzeugen `0` statt `calc(var(--spacing) * 0)`, `m-1` erzeugt `var(--spacing)`. Gleiche Werte. Im Build kein `*0`-Treffer; der eine `*1`-Treffer stammt aus handgeschriebenem CSS (`src/app/bewegung.css:432`). Ohne Wirkung.
2. 4.3.3 (#20318), Fixed: Standard-`--font-sans` ohne `system-ui`/`ui-sans-serif`. Das Projekt setzt `--font-sans` selbst (`src/app/globals.css:47`); der neue Stack ist im Build nur ungenutzter Fallback. Ohne Wirkung.
3. 4.3.2 (#20263) und 4.3.1 (#20203), `@source`: Das Projekt hat nur `@source not` (`globals.css:9-10`). Ohne Wirkung.
4. 4.3.3 (#20292), Fixed: Preflight überschreibt den Firefox-Fokusrahmen von `iframe:focus-visible` nicht mehr. Drei Karten-iframes (`src/components/legal/MapConsentGate.tsx:76`, `src/components/maps/ContactPremiumMap.tsx`, `src/components/maps/InteractiveServiceMap.tsx`). Mögliche Sichtänderung nur bei Tastaturfokus in Firefox; nicht geprüft.
5. 4.3.3 (#20314), Fixed: achromatische Theme-Farben in color-mix ohne Farbtonsprung. Kein Deckkraft-Modifikator auf Theme-Farben im Projekt. Ohne Wirkung.
6. Ohne Projektbezug (grep leer): `--spacing(0)`, `text-[--spacing(…)]`, `auto-rows`/`auto-cols`, `shadow-*/12.5`, `[data-x]div`, `not-@container`. Node-26-Hooks (4.3.1) und Hex-Kanonisierung (4.3.3, nur Werkzeuge) ohne Wirkung.

Ergebnis: keine Klassen- oder Standardwertänderung, die die Seite betrifft.

## GEMEINSAME DATEIEN
Nur vom Orchestrator; nicht geändert:
- `_werkstatt/UPGRADE.md`, Zeile Nr. 10, Status: „umgesetzt: 4.3.3 (`^4` unverändert, nur Lock); Stufe A grün; Changelog 4.3.1 bis 4.3.3 ohne Wirkung auf Projektklassen (berichte/UM-E2-U04.md)“. Commit: „–“.
- `_werkstatt/UPGRADE.md`, Zeile Nr. 9, Status: „Tailwind 4.3.3 mit U04 umgesetzt (postcss)“.

## PRÜFUNG UND ERGEBNIS
- Laufzeit: Node v24.22.1, npm 11.19.1.
- `npm ls tailwindcss @tailwindcss/postcss`: beide 4.3.3, Exit 0.
- `npm ls --all | grep -c invalid`: 1 Treffer, aber der Paketname `character-reference-invalid@2.0.1` (transitiv über remark, im Lock unverändert). Strenger Test auf npm-Fehler (`invalid|ERR!|ERESOLVE|missing|extraneous|overriding`): 0.
- `npm install-scripts ls`: keine ungeprüften Skripte.
- Stufe A:
  - `npm run typecheck`: Exit 0, 9 s
  - `npm run lint`: Exit 0, 17 s
  - `npm test`: Exit 0, 3 s; 210 von 210 bestanden, 0 Fehler, 0 Warnungen
  - `NEXT_TELEMETRY_DISABLED=1 npm run build`: Exit 0, 12 s, Turbopack, keine Warnung außer dem bekannten Hinweis „Experiments: globalNotFound“ (U03). Routentabelle: 104 Einträge sichtbar, 81 weitere Pfade über generateStaticParams (siehe OFFENE FRAGEN)
  - `npm run qa:graph`: Exit 0, 1 s, 0 Fehler
- Warnungen: `warn|deprecat|DEP0` in allen Logs ohne Befund (einziger Treffer ist der Routenname `/blog/undichte-dusche-warnzeichen`).
- Audit (`audit.json`): info 0, low 0, moderate 0, high 2, critical 0. Beide gehören zu U05 und sind gegenüber der Sicherung unverändert: source-map-js 1.0.0 bis 1.2.1 (`node_modules/source-map-js`) und zod <4.6.6 (`node_modules/zod`); Fix ohne `--force` verfügbar.
- Lock-Vergleich gegen die Sicherung: 17 geändert, keine hinzugefügt, keine entfernt.

## BILDBELEGE
keine nötig

## OFFENE FRAGEN
1. Commit 91615baa „UM-E2-U04: ZWISCHENSTAND Lockfile“ (06:32 UTC) liegt lokal auf HEAD und enthält genau den Lock-Stand dieses Laufs. Ich habe weder committet noch zurückgesetzt, nicht gepusht. Entscheidung beim Orchestrator.
2. Routenzahl: Das Briefing nennt 107. Die Tabelle zeigt 104 sichtbare Einträge und 185 Pfade inkl. 81 über generateStaticParams, dieselbe Struktur wie in `archiv/2026-10-werkstatt/belege/e3-tor/reinraum/build.log`. `src/` ist unverändert. Zählregel klären.
3. `npm install` meldete „removed 2 packages, changed 6“; der Lock-Vergleich zeigt keine entfernten Einträge. Vermutlich optionale Plattformpakete, nicht geklärt.
4. Fokusrahmen der Karten-iframes in Firefox (4.3.3): Sichtprüfung steht aus.
5. Prüfregel: `grep -c invalid` trifft `character-reference-invalid`; besser `grep -E 'invalid|ERR!|ERESOLVE'`.

=== ENDE UM-E2-U04 · BEREIT ZUR RÜCKGABE ===
