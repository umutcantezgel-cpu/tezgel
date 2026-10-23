# PRUEFPUNKT

- Lauf „Verständlich, echt, ausgezeichnet“ · Etappe E0/E1 · Stand 2026-10-24 00:40 CEST
- Letzter grüner Commit (src): c53faf4 (src gleich main 388fa7b). HEAD 583656d (nur `_werkstatt`).
- Erledigt: E0-ORCH-01, E0-PRUEF-01, -02a…d, -02-PA (Werkzeuge abgenommen, E-016), E1-ORCH-01 (KERN v3, Referenztexte, Bildplätze, MENSCHEN), E1-PROBE-IA (Baumtest), PLAN Fassung 1, ABNAHME, LAGEBILD-Entwurf, Planprüfung Runde 1 (25 Befunde, Rückgabe in `pakete/E1-PRUEF-PLAN.rueckgabe.md`).
- Laufende Pakete:
  - Workflow `tezgel-e0-ausgang` (wf_735574af-33b): E0-PRUEF-03 (Schritte 1 bis 7 und 9, ohne Lighthouse) parallel zu E0-PROBE-01, -03, -05, -07, -09 nacheinander.
  - Workflow `tezgel-e0-probe-andere` (wf_478d8b82-dd1): E0-PROBE-02, -04, -06, -08, -10 nacheinander.
  - Orchestrator: PLAN Fassung 1.1 (Befunde der Planprüfung), danach Planprüfung Runde 2. Vorarbeit E2-ORCH-04 (B-01) im Arbeitsbaum, NICHT committet: `src/lib/verlegen/*`, `src/components/verlegen/Verlegen.tsx`, Tokens in `globals.css`, Stil in `bewegung.css`, Einhängen in `_dokument.tsx`. src wird erst nach den Ausgangswerten committet.
- Danach: E0-PRUEF-03L (Lighthouse im Ruhefenster, allein), LAGEBILD Abschnitt 4 und 5 mit Werten, ABNAHME E0-Werte, Planprüfung Runde 2, dann E2 Welle 1.
- Bei Abbruch eines Workflows: Belegdateien der laufenden Pakete löschen (nur deren Schreibrechte: `belege/e0/**`, `bilder/e0/**`, `cache/probelauf/e0/**`), Paket neu starten. Die Vorarbeit unter src bleibt im Arbeitsbaum; bei neuer Umgebung ist sie verloren und wird in E2 neu geschrieben (Entwurf auch in `$SCRATCH/orch/`).
- Bei Wiederaufnahme (L5): Branch sicherstellen, Bildquelle nach EINRICHTUNG.md wiederherstellen, an „Laufende Pakete“ fortsetzen.
