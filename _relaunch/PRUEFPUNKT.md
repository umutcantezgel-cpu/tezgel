# PRUEFPUNKT

- Lauf: 1 (angepasst, E-000) · **Vereinheitlichung (E-037, E-038):** Vorbild ist die live laufende Fusions-Startseite (KERN v2); nur diese Sitzung baut, Seite für Seite direkt auf `main`. Plan: `PLAN.md`, Abschnitt „Vereinheitlichung“; Stand und Reihenfolge ab 12.10.: Plan-Datei der Sitzung, Abschnitt „Stand 12.10.“ (inhaltsgleich unten).
- Live: c27fc77 (Phase 0). Lokal committet, nicht gepusht: 29c9a95 (Belege Phase 0).
- **Basiswerte (12.10.):** `belege/e038-basis/ERGEBNIS.md` – live `/` mobil 70,5 Punkte gegen 82,5 im Ausgangsstand, TBT 1 045 gegen 286 ms; Ursache laut Spur wiederholte Stil-Neuberechnung nach dem ersten Bild (nicht CSS-Animationen). INP noch offen.
- **In Arbeit (Opus, Hintergrund):**
  - N-01 Startseite TBT (`pakete/N-01.md`, eigene Arbeitskopie, Ports 4343–4345) – Vorrang beim Push.
  - S-01 `/leistungen`, S-02 `/ueber-uns`, S-03 `/blog` (`pakete/S-0x.md` + `pakete/_seitenregeln.md`) im Arbeitsbaum, Vorschau `next dev` 4350.
- **Orchestrator:** Suite gegen live 4337 (`RELAUNCH_FASSUNG=bestand`, Log `scratchpad/suite/live-bestand.log`) → Abweichungen anpassen, Sperrklinke neu basieren; `funktion-weiterleitung`/`funktion-tracking` übernommen. Neues Prüftor `werkzeuge/tor-s.sh` (T2-S/T2-Q).
- Je fertiger Schritt: abnehmen (Rückgabe, Bilder sichten) → commit `PAKET=<Kennung>` → `tor-s.sh c27fc77 <kennung> <seiten> <specs>` → Bereichsprüfung → Push → `live-rauchtest.sh`/`live-browser.mjs` mit fester Kennung → Meldung.
- Server: 4310 = 707a93d, 4337 = c27fc77 (live), 4350 = next dev (Arbeitsbaum; nach Start `AGENTS.md` gegen HEAD prüfen), 4360 = Prüftor.
- Werkstatt-Werkzeuge: `_werkstatt/werkzeuge/node_modules` ist ein Symlink auf `_relaunch/werkzeuge/node_modules` (gleiche Abhängigkeiten, gitignored).
- Morgenbericht-Routine auf den neuen Ablauf umgestellt (12.10.).
- Lokaler `CLAUDE.md`-Block (überholt den Werkstatt-Block), nie committen.
- Offen für den Auftraggeber: M-20 (Zielgruppe im Wortlaut), WM-15–WM-22 (aus der Werkstatt, in MENSCHEN.md), optional Ersatz des Werkstatt-Blocks in der committeten `CLAUDE.md`.
