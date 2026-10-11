# PRUEFPUNKT

- Lauf: 1 (angepasst, E-000) · Phase: P3-16 (Kandidat-Tor `/`, vor Freischaltung) · L0 abgeschlossen
- Live auf main: 6cfad0b-Stand (Kern ruhend, T1 gleich, Rauchtest grün).
- Endstand-Kandidat `/`: 5421e5b-k (Port 4334); Quelltext seither unverändert (nur `_relaunch/`). Basis a8e049f (4323), Ausgangsstand 707a93d (4310).
- Tor-Ergebnis: `_relaunch/belege/t2-5421e5b/ERGEBNIS.md` (alles grün; offene Abweichungen Tastatur a1/a5 +3 E-023, TBT über Bestand E-024 in ABNAHME).
- Laufend: P3-16-GEG2 (Gegenprüfer Runde 2).
- Nächster exakter Schritt: Rückgabe GEG2 lesen → ggf. beheben → sauberer Baum → `KANDIDAT="/" _relaunch/werkzeuge/reinraum.sh HEAD` (Quelltext-Gleichheit zu 5421e5b: `git diff --stat 5421e5b HEAD -- src public package.json package-lock.json next.config.ts tsconfig.json` leer) → `KANDIDAT_BASIS=$(git rev-parse --short HEAD) _relaunch/werkzeuge/freischalten.sh --commit /` → `git push origin HEAD:main` → `_relaunch/werkzeuge/live-rauchtest.sh <sha>` + `node _relaunch/werkzeuge/live-browser.mjs` → STATUS/PRUEFPUNKT → P3-Phasentor-Rest (ABNAHME) → P4.
