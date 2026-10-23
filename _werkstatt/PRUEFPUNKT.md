# PRUEFPUNKT

- Lauf „Verständlich, echt, ausgezeichnet“ · Etappe E0/E1, Vorarbeit E2 · Stand 2026-10-24 01:00 CEST
- Letzter grüner Commit (src): c53faf4 (src gleich main 388fa7b). HEAD 583656d (nur `_werkstatt`).
- Erledigt: E0-ORCH-01, E0-PRUEF-01, -02a…d, -02-PA (Werkzeuge abgenommen, E-016), E1-ORCH-01 (KERN v3, Referenztexte, Bildplätze, MENSCHEN), E1-PROBE-IA (Baumtest), PLAN Fassung 1, ABNAHME, LAGEBILD-Entwurf, Planprüfung Runde 1 (25 Befunde, Rückgabe in `pakete/E1-PRUEF-PLAN.rueckgabe.md`).
- Laufende Pakete:
  - Workflow `tezgel-e0-ausgang` (wf_735574af-33b): E0-PRUEF-03 (Schritte 1 bis 7 und 9) und E0-PROBE-05, dann -07, -09.
  - Workflow `tezgel-e0-probe-andere` (wf_478d8b82-dd1): E0-PROBE-06, dann -08, -10.
  - Hintergrundagenten: E2-PRUEF-04 (Ablauftest B-01 gegen 4320), E2-BILD-01 (Bildwerkzeug).
  - Im Arbeitsbaum, nicht committet (Orchestrator): E2-ORCH-01 Tokens, E2-ORCH-01b Register v3 (`src/lib/motion/register.ts`, `test/bewegung.test.mjs`, `_werkstatt/register.json`, `werte-regeln.json`), E2-ORCH-04 B-01 (`src/lib/verlegen/*`, `src/components/verlegen/Verlegen.tsx`, `bewegung.css`, `_dokument.tsx`, `package.json` Testskript), E2-TEST-04 (`test/verlegen.test.mjs`), E2-FIX-01a bis c (GoogleReviewsBadge, FinalCTA, LocalDominanceMap, llms.txt, schema.ts, standorte/[stadt]). Sicherung des Entwurfs: `$SCRATCH/orch/src-entwurf/`.
- Danach: E0-PRUEF-03L (Lighthouse im Ruhefenster, allein, auf c53faf4), LAGEBILD Abschnitt 4 und 5 mit Werten, ABNAHME E0-Werte; dann src-Commits je Paket (E2-W1), Reinraum, Stufe A; weiter E2-ORCH-02 Bausteine, E2-BILD-02, E2-ORCH-03 Navigation, E2-ORCH-05 Ersatz-Intro, E2-ORCH-06 Startseite.
- Bei Abbruch eines Workflows: Belegdateien der laufenden Pakete löschen (nur deren Schreibrechte: `belege/e0/**`, `bilder/e0/**`, `cache/probelauf/e0/**`), Paket neu starten. Die Vorarbeit unter src bleibt im Arbeitsbaum; bei neuer Umgebung ist sie verloren und wird in E2 neu geschrieben (Entwurf auch in `$SCRATCH/orch/`).
- Bei Wiederaufnahme (L5): Branch sicherstellen, Bildquelle nach EINRICHTUNG.md wiederherstellen, an „Laufende Pakete“ fortsetzen.
