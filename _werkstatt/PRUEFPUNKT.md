# PRUEFPUNKT

- Etappe: E2 Referenz, Tor läuft · Stand 10.10.2026 23:50 CEST
- Abgenommen: E2-ORCH-01…09, E2-BAU-01…04, E2-GRAF-01/02 (Belege in den Rückgaben E2-PRUEF-A-1…-A-4 und E2-BAU-04). Letzter Code-Stand fürs Tor: 1ad2e45.
- Laufend (Haiku): E2-PRUEF-B (Briefing `_werkstatt/pakete/E2-PRUEF-B.md`) auf Reinraum-Build 1ad2e45, Port 4312; Belege nach `_werkstatt/belege/e2-tor/`. Während B keine weiteren Prüfläufe (Bildrate).
- Danach in dieser Reihenfolge:
  1. Sichtabnahme durch frischen Unteragenten (Modell ORCHESTRATOR) nach `_werkstatt/pakete/_vorlage-sichtabnahme.md`, ≤ 24 Ausschnitte aus `belege/e2-tor/bilder/` plus Einzelbilder SIG-1; Bericht `_werkstatt/berichte/E2-SICHT.md`; Ansichtswert ≥ 8.
  2. E2-PRUEF-L1 Lighthouse im Ruhefenster (kein anderer Agent): e0 auf 4310 (745335f) und E2 auf 4312 (Vorlage `scratchpad/orch/spez/E2-PRUEF-L1.vorlage.json`, COMMIT = 1ad2e45).
  3. Prüfstufe A für E3-ORCH-00 (b34f429: Funnel-Stilmodule, OptionGroup, Markenlogos).
  4. E3-Welle 1: Spezifikationen fertig in `scratchpad/orch/spez/e3/` (Generator `erzeuge.py`, 16 Pakete); Briefing je Paket mit `node _werkstatt/werkzeuge/briefing.mjs <spez>` (Ausgabe NICHT umleiten – das Werkzeug schreibt die Datei selbst). Reihenfolge: -11, -16, -02, -07 → -12, -17, -03, -21 → -13, -18, -09, -10 → -14, -19, -15, -20.
- Vorbereitet für E3-ORCH-01: Entwürfe `scratchpad/orch/entwurf/e3` (Verlegeplan-Zustände, SzeneAblauf mit view-timeline).
- Offene Menschen-Fragen: M-15 (Löschfreigabe, erweitert), M-16 (GA im selben Besuch), M-17 (Standortdaten Wetzlar/Aßlar).
- Bei Wiederaufnahme nach Abbruch: laufende Pakete in ihren Dateien auf den letzten Commit zurücksetzen und neu starten; Server nach `_werkstatt/werkzeuge/EINRICHTUNG.md` (4312 = Reinraum 1ad2e45).
