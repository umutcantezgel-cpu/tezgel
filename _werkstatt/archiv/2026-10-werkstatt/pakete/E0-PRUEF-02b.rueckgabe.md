# E0-PRUEF-02b · Rückgabe

## GEÄNDERTE DATEIEN
- `_werkstatt/werkzeuge/bewegung.mjs` (neu), `_werkstatt/werkzeuge/glyphen.mjs` (neu), `_werkstatt/werkzeuge/glyphen.py` (neu)
- `_werkstatt/pakete/E0-PRUEF-02b.rueckgabe.md` (neu)

Unberührt: `lib.mjs` (nur Import), `package.json`, `tests/*`, Quellcode. Tests und Sondierungen liegen im Scratchpad `E0-PRUEF-02b/`, Ergebnisse unter `_werkstatt/cache/` (außerhalb des Repos).

## WAS UND WARUM
- `bewegung.mjs`, vier Modi: `einzelbilder` (fünf Bilder je Kennung bei 0/25/50/75/100 % der längsten Dauer; bei Scroll-Animationen fünf Positionen im ganz sichtbaren Bereich), `bildrate` (4× CPU, Tracing, Geste hin und zurück, Median aus drei Läufen), `register` (beide Richtungen), `reduziert` (Keyframes und Sichtbarkeit).
- `glyphen.mjs` und `glyphen.py`: Zeichen aus `texte/*.json` (Überschriften, Absätze, Alt-Texte, Labels, Meta), Häufigkeit und bis zu drei Fundstellen, cmap per fonttools im venv.
- Abweichungen, durch Sondierung belegt:
  1. Geste mit `gestureSourceType: 'default'`; `touch` scrollte in dieser Emulation nicht.
  2. Frame-Quelle `Display::FrameDisplayed` und `DroppedFrame`; PipelineReporter lieferte kein `STATE_DROPPED`.
  3. Nur Kennzahlen gespeichert, kein Rohtrace.
  4. Hover nur auf Elementen im Ansichtsfenster.
  5. `laden`, `notiert`, `seitenwechsel` nicht ausgelöst, nur im Register gezählt.

## GEMEINSAME DATEIEN
- Für meine Werkzeuge keine Änderung nötig.
- Wunsch: Kennungen in `_werkstatt/register.json` (16) und im K-009-Auszug (12) angleichen; `leitachse`, `szene-ablauf`, `einzugsband`, `verband` haben keine Auslöserzeile.
- Optional: Fixture-Test aus dem Scratchpad nach `_werkstatt/werkzeuge/tests/` übernehmen.

## PRÜFUNG UND ERGEBNIS
- `node --check` für `bewegung.mjs` und `glyphen.mjs` grün; `glyphen.py` per `ast` geprüft.
- Fixture-Tests (Browser-Route, kein Server): 25 von 25 bestanden, u. a. neun Kennungen mit allen Auslösern, wachsender Rotanteil, Registerbefunde, reduziert, Geste erreicht das Seitenende exakt.
- Glyphen: Häufigkeiten identisch zu einer unabhängigen Python-Zählung (111 Zeichen, 17.204 Felder).
- Belege gegen 4310 `/`:
  - einzelbilder m390: 0 data-motion-Elemente, 0 Bilder, Meldung sauber.
  - register m390: 0 gefunden, 0 unbekannt. 41 Einträge ohne data-motion (172 Ereignisse), davon 32 Farb-/Outline-Übergänge (157 Ereignisse). Hover 20 (1 Fehler, 12 außerhalb), Tab 30.
  - register d1440: 0 gefunden, 0 unbekannt. 82 Einträge (482 Ereignisse), davon 64 Farb-/Outline-Übergänge (313 Ereignisse). Transform-, Translate-, Scale- und Rotate-Übergänge in 9 Einträgen (40 Ereignisse), darunter Mega-Menü-Panels `div#mega-0` und `div#mega-1`. Hover 20 fehlerfrei, Tab 30.
  - reduziert m390: 4 Transform-Befunde (Ereignisse): `a.glass-button-whatsapp.w-full` 3, `a.btn-ghost.w-full` 3, `a.btn-primary.w-full` 2, `button.btn-primary.w-full` 2. Unsichtbar 0.
  - bildrate m390, Median aus 3 Läufen: 3.434 Bilder, 71 verworfen (2,06 %), 18 Long Animation Frames (1.744 ms). Einzelläufe: 3.364/50 (1,49 %), 3.434/90 (2,62 %), 3.440/71 (2,06 %). Alle Traces vollständig, Geste erreichte das Seitenende (22.300 bzw. 22.767 px). Laufzeit knapp 5 Min; parallel nur kurze Lesebefehle.
  - Glyphen, Test-Schrift `geist-latin.woff2`: 8 fehlend von 111.
  - Glyphen, Projekt: `archivo-variabel.woff2` fehlt 8 Zeichen (㎡ ×158, ★ ×12, ≤ ×8, ← ×5, → ×5, Emoji ×4). `plex-mono-400.woff2` fehlt zusätzlich ß (×3.694); das ist laut `globals.css` Z. 32 gewollt, im Schriftstapel greift Archivo.

## BILDBELEGE
- Auf 4310 keine Einzelbilder, da keine data-motion-Elemente vorhanden sind.
- Fixture-Bilder: `scratchpad/E0-PRUEF-02b/test/out/einzelbilder/` (`auftritt`, `sig-plan`, `zustand`, `sig-kreuzlinie`, `anriss`, je `-0.jpg` bis `-4.jpg`).
- Ergebnisse: `_werkstatt/cache/bewegung/<modus>/start/ergebnis.json`; Register d1440 unter `start-d1440/`; Glyphen unter `_werkstatt/cache/glyphen/p0-ausgangsstand/` und `p0-projektschriften/`.

## OFFENE FRAGEN
1. Geklärt laut Orchestrator: Positivpfad folgt mit data-motion; laden, notiert, seitenwechsel nur im Register; Farb-/Outline-Übergänge gehören unter `zustand` (32 bzw. 64 Einträge); 3 Läufe bleiben.
2. Transform-Übergänge ohne data-motion (m390 11, d1440 40 Ereignisse) und die Mega-Menü-Panels: unter `aufklappen` zuordnen oder als Befund für die Umsetzung? Entscheidung nötig.
3. reduziert: vier Transform-Übergänge laufen bei reduce weiter. Befund für die Umsetzung.
4. ㎡ (158 Vorkommen, z. B. „Basic-Bad 4,6 ㎡“), ★, ≤, ←, →, Emoji fehlen in beiden Projektschriften und fallen auf die Ersatzschriften des Stapels zurück. Schrift ergänzen oder Zeichen ändern?
5. `lib.mjs` (02a): `setzeEinwilligung` setzt das Cookie ohne `base`-Angabe an BASE; `bewegung.mjs` übergibt `base`.
