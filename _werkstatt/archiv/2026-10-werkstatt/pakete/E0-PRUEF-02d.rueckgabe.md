# E0-PRUEF-02d · Rückgabe

## GEÄNDERTE DATEIEN
- `_werkstatt/werkzeuge/werte.mjs` (neu)
- `_werkstatt/werkzeuge/werte-regeln.json` (neu)
- `_werkstatt/werkzeuge/svg.mjs` (neu)
- `_werkstatt/pakete/E0-PRUEF-02d.rueckgabe.md`

## WAS UND WARUM
- **werte.mjs:** Dateimenge aus `git diff --name-only <basis>` (Standard HEAD, `--arbeitsbaum` ergänzt neue Dateien), auf `src/**` gefiltert, Ausnahmen abgezogen. Klassen aus className, class, clsx, cn, twMerge (TypeScript-AST) und @apply (postcss). Auflösung über `__unstable__loadDesignSystem` (@tailwindcss/node 4.3.0, globals.css, base src/app) und `candidatesToCss`, je Klasse einmal.
- **Abweichungen, bitte bestätigen:**
  1. `schrift_ausserhalb` und `radius_ausserhalb` ergänzt, weil die Regeln `schrift` und `radien` enthalten.
  2. Klassen mit eigenem Selektor in `src/**/*.css` gelten als definiert, sonst wären `eyebrow` und `glass-*` falsche Befunde.
  3. `name-(--x)` (Tailwind-4-Kurzform) zählt als beliebig.
  4. Literale in `@theme` und `:root` sind die Quelle, kein Befund.
  5. `schrift` und `kurven` folgen Theme und KERN v2: `font-mono` ergänzt, Kurven `setzen, laser, weg, linear` statt `kurve-*`, die es im Theme nicht gibt.
  6. Dauernamen nur duration, delay, dauer, stagger, staffel, ms; `speed` und `timing` ausgenommen (Fehlalarme im Lauf).
- **svg.mjs:** Dateimodus mit svgo 4.1.0 (preset-default; `--animiert` mit den vier Overrides). Prüft Fixpunkt, Übereinstimmung mit der Fassung (± Leerraum), Pixelbilder, viewBox und Budgets (dezimal: 24×24 roh ≤ 1500 Byte, sonst gzip ≤ 40000 Byte). Seitenmodus: Playwright, Anfragesperre aus lib.mjs, m390 und d1440. Ein aria-hidden-Vorfahr gilt als verdeckt. Keine Datei wird verändert.
- Berichte als JSON im Cache; Exit 0, 1 mit Befund, 2 bei Fehler.

## GEMEINSAME DATEIEN (nicht geändert)
- `_werkstatt/werkzeuge/tests/`: beide Selbsttests übernehmen (Scratchpad `E0-PRUEF-02d/test-werte.mjs`, 29 Fälle mit `fix/`; `test-svg.mjs`, 20 Prüfungen).
- `src/app/globals.css`: Zeilen 203–204 `0.01ms`, 418 `0.38s`, 445 `2.4s`, 502 `300ms` als `dauer-N`-Token oder Ausnahme. Zeile 533 `28s` läuft über 5 s automatisch (K-007: Pause-Knopf). Farbliterale 422, 499, 500 als Tokens; Zeile 441 setzt WhatsApp-Grün als Fläche, K-005 verbietet das.
- `src/app/layout.tsx` Zeile 102: `themeColor: '#F5F4F0'` (siehe Frage 2).

## PRÜFUNG UND ERGEBNIS
- `node --check` grün für beide Werkzeuge.
- Selbsttest werte: 29 erwartete Befunde (Datei, Zeile, Art, Klasse) exakt, keine Zusatzbefunde. Ausnahmen `GoogleIcon.tsx` und `opengraph-image.*` greifen.
- Selbsttest svg: 20 Prüfungen grün, DOM-Logik in Chromium ohne Server.
- Beleg `werte --dateien src/app/page.tsx,src/components/ui/FinalCTA.tsx`: 1107 Klassenvorkommen (273 eindeutig), 369 Befunde, 0,6 s, Exit 1. farbe_ausserhalb 132, schrift_ausserhalb 93, abstand_ausserhalb 66, groesse_ausserhalb 27, beliebig 20, radius_ausserhalb 20, dauer_ausserhalb 10, ohne_css 1.
- Gesamtes Projekt (248 Dateien): 12 404 Befunde in 140 Dateien, 3,8 s. `ohne_css` 633, davon 481 `rounded-tile-*`, 104 `eyebrow-*`, 32 `ambient-glow-warm`, 8 `shadow-tile`: nirgends definiert, also wirkungslos.
- Beleg `svg --dateien public/images/logo`: Fixpunkt 3/3, optimiert 0/3. `tezgel-logo.svg` und `-dark.svg` enthalten PNG-Pixelbilder und überschreiten das Budget (gzip 297 820 gegen 40 000 Byte). `tezgel-mark.svg` ist nicht optimiert (977 gegen 776 Byte).
- Beleg `svg --seiten /,/kontakt --base http://127.0.0.1:4310`: `/` 355 Inline-SVGs, `/kontakt` 145, in m390 und d1440 gleich. Keine doppelten IDs, HTTP 200, keine Fremdanfragen. Vier Läufe: 962 `focusable_fehlt`, 32 `dekorativ_ohne_aria_hidden`. K-008 verlangt `focusable="false"` bei dekorativen Grafiken.

## BILDBELEGE
Keine Bilder. Belege sind die JSON-Berichte: `_werkstatt/cache/werte/2026-10-10T18-29-38-133Z.json`, `_werkstatt/cache/svg/2026-10-10T18-29-42-828Z.json` (Logo), `_werkstatt/cache/svg/2026-10-10T18-29-45-177Z.json` (Seiten).

## OFFENE FRAGEN
1. KERN.md liegt als Version 2 vor (Stand 10.10.2026), das Briefing nennt v1. Bestätigen: Kurven, `font-mono`, Container `seite`/`mass`. `black` steht nur im Briefing, K-005 v2 nennt keinen Schwarzwert.
2. Ausnahmen gewünscht? `layout.tsx` `themeColor` (Metadatenwert); Nullzeiten für reduzierte Bewegung in `globals.css` 203–204 und `bewegung.css` 157–158.
3. Animiert: `removeUselessDefs` steht nicht in der Vorgabe und entfernt ungenutzte Defs samt Kennung. `removeViewBox` ist im svgo-4.1-preset nicht enthalten, daher kein Override. Soll `removeUselessDefs: false` rein?
4. Das Briefing verweist für die SVGO-Konfigurationen auf „AUFTRAG Abschnitt 7“, dort steht „Gedächtnis in der Cloud“. Umgesetzt nach Schritt 6. Verweis korrigieren?
5. Lücken: Klassen in Variablen außerhalb von className/clsx/cn/twMerge; `style={Variable}` (2 Stellen, nicht prüfbar); `transition-*` und `delay-*`.
6. Der Repo-Stand änderte sich während des Laufs (HEAD 3e17980 → 8bad228 → 75511cf). Befundzahlen gelten für 18:29 UTC.
