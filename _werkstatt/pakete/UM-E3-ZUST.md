# UM-E3-ZUST · Rolle Baumeister (Bau in Arbeitskopie) · Modell Haiku · Stufe 2 · Kern-Version 4.3 · Kostenklasse M

## Ziel
Zustände nach dem Muster von UM-E3-ZUST-M (E-077, `src/components/kern/stile.ts`) für die übrigen fünf Bausteine (PLAN-Zeile UM-E3-ZUST; KERN K-010: Ruhe, Hover, Fokus `focus-visible` 2 px mit 3:1, gedrückt, deaktiviert):
1. **Karussell, Knopf zum Anhalten** (`src/components/kern/Karussell.tsx`, `PauseKnopf` und die Pfeile):
   - gedrückt: `active:`, 1 px wie `KNOPF_BASIS`, mit `ruhig:`-Gegenstück wie dort;
   - deaktiviert (`disabled`/`aria-disabled`): halbe Deckkraft, keine Zeigerereignisse.
2. **Verband-Umschalter** (`src/components/kern/VerbandUmschalter.tsx`): Hover am Umriss und deaktiviert, über `wahlKlassen` oder dieselben Tokens.
3. **Menüpunkte** (`src/components/common/MobileMenu.jsx`): Hover an den Links der Bereiche und Unterpunkte, als Farbwechsel oder Unterstreichung über Tokens. Kein Platzwechsel. Nur bei feinem Zeiger, mit der Tailwind-Variante `hover:`; Tailwind 4 setzt sie schon nur bei `@media (hover: hover)`.
4. **Untere Leiste** (`src/components/layout/MobileBottomBar.tsx`):
   - Fokus `focus-visible:outline-2 outline-offset-2` in einer Farbe mit mindestens 3:1 gegen ihren Grund (hell und dunkel getrennt);
   - gedrückt `active:` über Hintergrund-Token, kein Platzwechsel.
5. **Glasbild** (`src/components/kern/Glasbild.tsx`): Der Fokus-Umriss liegt auf einem Foto. Sichere ihn auf jedem Grund doppelt: innen Kalk, außen Tinte (zum Beispiel `outline` und `box-shadow` oder zwei Ringe), beide über Tokens. Messen wird der Orchestrator in Stufe A.

## Arbeitsweise (verbindlich)
- Arbeite nur in der Arbeitskopie `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/zust/baum`. Sie ist ein Abzug von HEAD 9a38525b mit verlinkten `node_modules`. Die Vergleichskopie `…/zust/vorher` liegt schon bereit; sie bleibt unverändert.
- Das Repository `/home/user/tezgel` liest du nur. Kein Git mit Schreibwirkung, kein Commit, kein Push, kein Browser, kein Server.
- Prüfen in der Arbeitskopie mit `export PATH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/node-lts/aktuell/bin:$PATH`:
  - `npm test`
  - `npx eslint <geänderte Dateien>`
  - `node _werkstatt/werkzeuge/werte.mjs --arbeitsbaum --dateien <geänderte Dateien>`
  - Für `npx tsc --noEmit -p .` vorübergehend `printf '/// <reference types="next" />\n/// <reference types="next/image-types/global" />\n' > next-env.d.ts` anlegen und danach wieder löschen.
- Ergebnis:
  - `cd …/zust && diff -ruN --exclude=node_modules vorher baum > zust.diff`
  - Notiz `…/zust/notiz.md`: je Baustein, was sich ändert und warum; Prüfzahlen.

## Leitplanken
- **Nur Klassen und Tokens:** keine neuen Farben, Dauern oder Zahlen (`werte.mjs` 0 Befunde). Bestehende Bausteine aus `stile.ts` wiederverwenden.
- **Verhalten unverändert (G8):** keine neuen Handler, keine geänderten Texte, Namen, Rollen oder Pflichtfelder. Ruhezustände bleiben pixelgleich, nur die Zustände kommen dazu.
- **B-01 eingefroren (E-078):** `src/components/verlegen/**` nicht anfassen.
- **Bewegungsschalter (E-080):** Für jede Klasse mit `motion-safe:` oder `motion-reduce:`, die mehr als einen Übergang steuert, ein `ruhig:`-Gegenstück. Die Wächtertests in `test/bewegungsschalter.test.mjs` müssen grün bleiben.
- **Kein Platzwechsel im Endzustand:** keine Lage- oder Größenänderung durch Hover oder Fokus, ausgenommen der 1-px-Druck wie bei `KNOPF_BASIS`.

## Rückgabe
Am Ende drei Zeilen:
- Ergebnis mit Prüfzahlen
- Pfad des Diffs und Liste der Dateien
- Offene Fragen
