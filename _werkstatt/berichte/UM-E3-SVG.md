# UM-E3-SVG · Bericht Grafiker (Haiku 5.5)

Kern 4.0.2 · 27.10.2026, 07:36 UTC · Branch `claude/tezgel-website-redesign-iqxt8z`

## GEÄNDERTE DATEIEN

| Datei | Änderung |
|---|---|
| `src/components/icons/svg/pause.svg`, `verband-diagonal.svg`, `verband-fischgraet.svg`, `verband-halb.svg`, `verband-wild.svg` | SVGO statisch; Icon-Kopf `stroke-linejoin="miter"` wieder gesetzt |
| `src/components/icons/sprite.svg` | mit `sprite.mjs` neu erzeugt, danach SVGO animiert |
| `public/images/logo/tezgel-mark.svg` | SVGO statisch; `role="img"` und `id="title"` wieder gesetzt |
| `src/lib/formulare/useAnfrageFunnel.ts` | lucide-Import entfernt, Felder `icon` als Namen |

Unverändert: `namen.ts` (Neuerzeugung identisch), `zuordnung.ts` (alle Werte vorhanden), `RouteVisualization.tsx` (nichts nötig).

Die fünf Icon-Dateien stehen schon in HEAD, im Commit `9f623415` („UM-E3-SVG: ZWISCHENSTAND …“). Ich habe nichts committet oder gepusht; den Urheber bitte prüfen.

## WAS UND WARUM

- **Bestand:** Fünf Icons, das Sprite und `tezgel-mark.svg` waren `nicht_optimiert` (U07 bestätigt).
- **Icons:** SVGO streicht `stroke-linejoin="miter"` als Standardwert. Ich habe es am Wurzelelement wieder gesetzt, wie bei den übrigen 42 Icons (K-008; `svg.mjs` toleriert es). Strich 1,5, `square`, `miter`, `currentColor` sind in allen fünf Dateien da.
- **Sprite:** `sprite.mjs` erzeugt 47 Symbole, danach `svgo-animiert.config.mjs` (E-069). 10.903 → 10.897 Byte, IDs identisch, Symbole 174–338 Byte.
- **lucide:** Fünf Importe in `useAnfrageFunnel.ts` wurden zu Namen: `Droplets`, `ShieldCheck` zu `'abdichtung'`, `Sun` zu `'balkon'`, `Layers` zu `'untergrund'`, `Sparkles` zu `null` (entfällt). `PROJECT_TYPES.icon` liest niemand (`Schritt1.jsx` nutzt `PROJEKT_ICONS`). Die anderen `.icon`-Lesestellen reichen schon Namen durch, kein Umbau nötig.
- **tezgel-mark.svg:** SVGO entfernt `role` und die `id` des `<title>`; `aria-labelledby` liefe ins Leere. Beides habe ich wiederhergestellt. Die Datei weicht dadurch nur in diesen zwei Attributen von der SVGO-Ausgabe ab (Frage 1). Im Code ungenutzt.
- **RouteVisualization.tsx:** Das einzige direkte SVG (Raster) ist dekorativ (`aria-hidden`, `focusable="false"`). Ein `viewBox` fehlt bewusst: Das Muster arbeitet in Nutzerkoordinaten, ein `viewBox` skalierte das 24-px-Raster. Das Fugenkreuz (`kern/Fugenkreuz.tsx`) ist ebenfalls dekorativ.
- **Logos:** `tezgel-logo.svg` und `tezgel-logo-dark.svg` nicht angefasst.

## GEMEINSAME DATEIEN

| Datei | Zeile | alt → neu |
|---|---|---|
| `src/config/blog.js` | 1–7 | Importblock `from 'lucide-react'` entfernen |
| `src/config/blog.js` | 12 | `icon: LayoutGrid` → `icon: 'fliese'` |
| `src/config/blog.js` | 13 | `icon: Droplets` → `icon: 'abdichtung'` |
| `src/config/blog.js` | 14 | `icon: Grid3x3` → `icon: 'fliese'` |
| `src/config/blog.js` | 15 | `icon: Sun` → `icon: 'balkon'` |
| `src/config/blog.js` | 16 | `icon: BookOpen` → `icon: 'dokument'` |
| `src/config/company.js` | 4 | Importzeile entfernen |
| `src/config/company.js` | 137 | `icon: ShieldCheck` → `icon: 'abdichtung'` |
| `src/config/company.js` | 142 | `icon: Award` → `icon: null` |
| `src/config/company.js` | 147 | `icon: Sparkles` → `icon: null` |
| `src/config/company.js` | 189 | `{ icon: Award,` → `{ icon: null,` |
| `src/config/company.js` | 190 | `{ icon: ShieldCheck,` → `{ icon: 'abdichtung',` |
| `src/config/company.js` | 191 | `{ icon: Sparkles,` → `{ icon: null,` |
| `src/config/company.js` | 192 | `{ icon: Clock,` → `{ icon: 'uhr',` |
| `src/config/company.js` | 193 | `{ icon: Ruler,` → `{ icon: 'aufmass',` |
| `src/config/company.js` | 194 | `{ icon: Heart,` → `{ icon: null,` |
| `public/images/logo/tezgel-logo.svg`, `tezgel-logo-dark.svg` | – | Vorschlag: entfernen; in `next.config.ts` je ein `permanent: true`-Redirect auf `tezgel-logo.png` bzw. `tezgel-logo-dark.png` |
| `_werkstatt/werkzeuge/sprite.mjs` | Schreibvorgang | Vorschlag: Ausgabe durch `optimize(…, ANIMIERT)` leiten (Frage 3) |

Diese Dateien habe ich nicht verändert.

## PRÜFUNG UND ERGEBNIS

- `svg.mjs` statisch, Icons: vorher 5 Befunde `nicht_optimiert`; nachher 47/47 Fixpunkt, 47/47 optimiert, ohne Befund.
- `svg.mjs --animiert`, Sprite: ohne Befund (je Symbol unter 1.500 Byte).
- `svg.mjs` statisch, `tezgel-mark.svg`: `nicht_optimiert`, nur wegen `role` und `id` (Frage 1).
- Gleichbild (sharp 96 × 96, pixelmatch, Schwelle 0): 53 Bilder (5 Icons, 1 Mark, 47 Symbole). Abweichung 0 Pixel in allen, RGBA-Rohdaten identisch, jedes Bild mit Inhalt. Gegenprobe `pause` gegen `verband-halb`: 2.752 Pixel.
- `grep -rn "lucide-react" src`: nur `src/config/blog.js` und `src/config/company.js`.
- Logo-SVG: kein Code verweist auf `tezgel-logo.svg` oder `-dark.svg`; 16 Dokumente unter `_werkstatt` und `_relaunch` tun es.
- `git status --short`: geändert `tezgel-mark.svg`, `sprite.svg`, `useAnfrageFunnel.ts`; neu dieser Bericht.
- **Typecheck und Lint nicht gelaufen (Messreihe aktiv):** `messen.log` enthält um 07:36 UTC noch kein `=== FERTIG`. Der Orchestrator holt sie nach.
- `svg.mjs --seiten` nicht gelaufen (kein Server gestartet).
- Git: außer `status` und `diff` nur lesend `git ls-files`, `git check-ignore` und `git log -1 -- <Pfad>` zur Ursachenklärung.

## BILDBELEGE

Ordner: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/um-e3-svg/bilder/`

- Icons: `icon-<name>-vorher.png`, `-nachher.png`, `-diff.png` (5 Paare)
- Mark: `mark-tezgel-mark-vorher.png`, `-nachher.png`, `-diff.png`
- Sprite: `sprite-<id>-vorher.png`, `-nachher.png`, `-diff.png` (47 Paare)
- Gegenprobe: `STOERPROBE-pause-gegen-verband-halb-*.png`
- Zahlen: `…/um-e3-svg/gleich-ergebnis.json`; Prüfberichte: `…/um-e3-svg/pruef/`

## OFFENE FRAGEN

1. **`tezgel-mark.svg`:** E-069 (Punkt 5) gibt die Entscheidung über die ungenutzte Datei an UM-E3-SVG nach dem Logo-Muster (ersetzen oder entfernen). Das Briefing verlangt Optimierung. Ich habe optimiert und `role` und `id` erhalten. Zu entscheiden: entfernen (mit Vermerk), so lassen oder Ausnahme in `svg.mjs`.
2. **Icon-Kopf `miter`:** Bitte bestätigen, dass `stroke-linejoin="miter"` gewollt ist (K-008). SVGO streicht es, die Prüfung toleriert es.
3. **`sprite.mjs`** (nicht in meinem Schreibrecht): Ein neuer Lauf erzeugt wieder das unoptimierte Sprite. Vorschlag: vor dem Schreiben `optimize(text, ANIMIERT)` aus `svgo` mit `./svgo-animiert.config.mjs`, danach die 47 IDs prüfen.
4. **Logos:** Entfernen und per 308 auf die `.png` leiten. Die Weiterleitungen steigen dann von 2 auf 4; die Kern-Zählung (202) bitte prüfen.
5. **Feld `icon` in `PROJECT_TYPES`:** ungelesen. Nach der Tabelle zeigt „Bad & Wellness“ `abdichtung`, Schritt 1 zeigt `bad`. Soll das Feld entfallen?
6. **Nachlauf:** Nach dem Umbau von `blog.js` und `company.js` ist `lucide-react` ungenutzt (`package.json`, Lockfile). `src/components/icons/ersatz.tsx` (generiert, ungenutzt) und der Kommentar in `src/lib/formulare/useBlogListe.ts` (Zeile 10) werden veraltet.
7. **Typecheck und Lint** nachholen, sobald `messen.log` `=== FERTIG` enthält.

=== ENDE UM-E3-SVG · BEREIT ZUR RÜCKGABE ===
