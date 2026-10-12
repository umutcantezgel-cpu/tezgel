# PRUEFPUNKT

- Lauf: 1 (angepasst, E-000) · **Vereinheitlichung (E-037, E-038):** Vorbild ist die live laufende Fusions-Startseite (KERN v2); nur diese Sitzung baut, Seite für Seite direkt auf `main`. Plan: `PLAN.md`, Abschnitt „Vereinheitlichung“.
- Live: 6156079 (Werkstatt-Fusion). Lokal: Merge-Commit 6e9b619 (origin/main eingemischt; einziger Konflikt `src/lib/motion/kopfskript.ts`: `KOPFSKRIPT` byte-gleich aus origin, `KOPF_SKRIPT` aus P4-13) plus Übergabe-Dokumente.
- Phase 0 (läuft): Übergabevermerke `_werkstatt/STATUS.md`/`PRUEFPUNKT.md`, M-21 beantwortet, E-038. T1: Reinraum 6156079 und HEAD, `build-vergleich 6156079 HEAD --streng` – erwartet HTML 172 gleich und CSS gleich. Dann Push, `live-rauchtest.sh`/`live-browser.mjs` mit fester Kennung, Meldung an den Auftraggeber.
- Danach Phase 1: eine Suite (`_relaunch/werkzeuge/tests` angepasst + tracking/weiterleitung aus `_werkstatt`), Werkstatt-Werkzeuge einrichten, Prüfprofile T2-S/T2-Q/T-D, Basiswerte der Fusions-`/` (Lighthouse/INP gegen 707a93d, Gegenprobe a3, Sichtabnahme `/` und `/kontakt`).
- Danach Phase 2: S-01 `/leistungen` … (Schrittfolge im PLAN).
- Server: keine laufend (Neustart des Containers). Build-Kopien: 707a93d (Ausgangsstand), a8e049f (Bestand-`/`), Reinraum 6156079 im Bau.
- Lokaler `CLAUDE.md`-Block neu gefasst (überholt den Werkstatt-Block), nie committen.
- Offen für den Auftraggeber: M-20 (Zielgruppe im Wortlaut), Werkstatt M-15–M-22, optional Ersatz des Werkstatt-Blocks in der committeten `CLAUDE.md`.
