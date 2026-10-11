# PRUEFPUNKT

- Lauf: 1 (angepasst, E-000) · Phase: P3-16 (Kandidat-Tor `/`, vor Freischaltung) · L0 abgeschlossen
- Live auf main: 1efad2a+ (Kern ruhend, T1 streng gleich, Rauchtest grün).
- Kandidat `/`: bcd8fcb-k (Port 4331), Quelltext = Freischalt-Basis (danach nur `_relaunch/`). Basis a8e049f (4323), Ausgangsstand 707a93d (4310).
- Tor-Ergebnis: `_relaunch/belege/t2-bcd8fcb/ERGEBNIS.md` (alles grün; Abweichung Tastatur a1/a5 +3 begründet in E-023).
- Laufend: P3-16-GEG (frischer Gegenprüfer, Opus).
- Nächster exakter Schritt: Rückgabe P3-16-GEG lesen → Befunde hoch/mittel beheben (dann betroffene Prüfungen wiederholen) → Kandidat am finalen HEAD bauen (`KANDIDAT="/" reinraum.sh HEAD`, Quelltext-Gleichheit zu bcd8fcb belegen: `git diff --stat bcd8fcb HEAD -- src public package.json package-lock.json next.config.ts`) → `KANDIDAT_BASIS=$(git rev-parse --short HEAD) _relaunch/werkzeuge/freischalten.sh --commit /` → `git push origin HEAD:main` → `live-rauchtest.sh <sha>` + `live-browser.mjs` (Hauptseiten, `/`, `/kontakt`) → KERN_SEITEN in `tests/fixtures.mjs` bleibt `['/']` (stimmt nach Freischaltung) → STATUS/PRUEFPUNKT → P3-Phasentor-Rest (ABNAHME) → P4.
- Befunde für später: Region Desktop unter Banner; Leerräume; „+“ als Auswahlzeichen; Mono überdehnt; mehrere Formulare; TBT mobil 224 ms; Lighthouse mobil 84; Tastatur-Fokus Bestand (Basis-Befund „hoch“).
