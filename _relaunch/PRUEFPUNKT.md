# PRUEFPUNKT

- Lauf: 1 (angepasst, E-000) · Vereinheitlichung (E-037, E-038) · **Fusion II (E-039)**: Beide Sitzungsstände werden ohne Verlust zusammengeführt. Plan: `PLAN.md`, Abschnitt „Fusion II“ (F0–F3).
- Live: a1aeda6 (Werkstatt, enthält 5c3c359). Die Werkstatt steht auf HALT (bestätigt in `_werkstatt/PRUEFPUNKT.md`/`STATUS.md`); nur diese Sitzung pusht.
- **F0 abgeschlossen (Tor m-e039 grün, `belege/m-e039/ERGEBNIS.md`):**
  - Merge-Commit c4f2a04 + 090858e: die 29 Konflikte vorläufig in der Werkstatt-Fassung; N-01/N-01b, Suite und Werkzeuge sind mitgemischt. Sichtbar gegenüber a1aeda6 nur die Phasenleiste des Preisrechners.
  - Fassung B dieser Sitzung: f53181e. WIP S-05/S-08/S-10 gesichert in `scratchpad/wip-e039/`.
  - Push von M auf main, dann Live-Prüfung und Meldung.
- **F1 abgeschlossen:** Gutachten U1–U8 in `belege/e039-gutachten/` (Grundgerüst: U1 A, U2 B, U3 A, U4–U8 B). Geteilte Bausteine (Express, FinalCTA, QualityPromise, Preisrechner) bleiben in der Fassung der Startseite; ihre a11y-Lücken → Paket F-09. **F2 läuft:** F-01 `/leistungen`, F-02 `/leistungen/[id]`, F-03 `/blog`, F-04 Badanfrage, F-05 Projekt-Check (Opus, Arbeitsbaum, `next dev` 4350); F-06 Konfigurator und F-07 Stadtseiten-Bausteine folgen, sobald Plätze frei sind (PARALLELITÄT 5). Server: 4360 = 090858e (= live 28ee443), 4370 = M, 4371 = B (f53181e). a11y-Bezug A/B: `scratchpad/e039/a11y/`.
- Lokaler `CLAUDE.md`-Block (E-039 ergänzt), nie committen.
- Offen für den Auftraggeber: M-20, WM-15–WM-22 (siehe MENSCHEN.md); dazu Fotos, Kalender-Termin, IndexNow-Geheimwort, Datenschutzerklärung (Morgenbericht 12.10.).
- 2026-10-12 10:55 CEST · Tor m-e039 grün (380/0 Specs, Pixel nur Preisrechner m375, a11y hart 0, Lighthouse `/` mobil 92 / TBT 139 ms, Desktop 100 gleich). F1-Gutachten der Formulare läuft. Push M.
- 2026-10-12 12:20 CEST · M live (28ee443, Live-Prüfung grün). Gutachten U1–U8 fertig; Baumeister F-01–F-05 laufen.
