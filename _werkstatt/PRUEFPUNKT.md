# PRUEFPUNKT

- Etappe: E2 Referenz · Stand 10.10.2026 23:19 CEST
- Abgenommen: E2-ORCH-01…08, E2-BAU-01…04, E2-GRAF-01/02 (Belege in den Rückgaben E2-PRUEF-A-1…-A-3 und E2-BAU-04).
- Laufend (Haiku): E2-PRUEF-A-4 (Prüfstufe A für E2-ORCH-09 /kontakt und -04-N2; alle Funktionstests; V-02-Test).
- Danach E2-Tor in dieser Reihenfolge:
  1. E2-PRUEF-B auf Reinraum-Build HEAD (Port 4312; Vorlage `scratchpad/orch/spez/E2-PRUEF-B.vorlage.json`, COMMIT einsetzen).
  2. E2-PRUEF-L1 Lighthouse im Ruhefenster (kein anderer Agent): e0 auf 4310 (745335f) und E2 auf 4312 (Vorlage `E2-PRUEF-L1.vorlage.json`).
  3. Sichtabnahme durch frischen Unteragenten (Modell ORCHESTRATOR) nach `_werkstatt/pakete/_vorlage-sichtabnahme.md`, Bilder aus E2-PRUEF-B; Ansichtswert ≥ 8.
- Vorbereitet für E3: Entwürfe `scratchpad/orch/entwurf/e3` (Verlegeplan-Zustände, SzeneAblauf mit view-timeline).
- Offene Menschen-Fragen: M-15 (Löschfreigabe, erweitert), M-16 (GA im selben Besuch), M-17 (Standortdaten Wetzlar/Aßlar).
- Bei Wiederaufnahme nach Abbruch: laufende Pakete in ihren Dateien auf den letzten Commit zurücksetzen und neu starten; Server nach `_werkstatt/werkzeuge/EINRICHTUNG.md`.
