# PRUEFPUNKT

- Lauf „Verständlich, echt, ausgezeichnet“ · Etappe E0 · Stand 2026-10-23 23:30 CEST
- Letzter grüner Commit (src): 388fa7b (= main, live). src ist unverändert.
- Plan: freigegeben im Chat, Fassung 0 in `_werkstatt/PLAN.md`, E1 erweitert sie.
- Erledigt: E0-ORCH-01 (Archiv, Eingang, AUFTRAG, CLAUDE.md, Berichte E0-KUND-01…09, E0-PRUEF-BILD-01, E0-BILD, E0-GUT-01/02, bildinventar.csv, HAUPTANSICHTEN.json).
- Jetzt: E0-PRUEF-01 (Haiku): `npm ci`, Build, Server 4310 und 4320, Werkzeuge mit node_modules im Scratchpad, Sitzungspfade als Variable, fehlende Abhängigkeiten, Lighthouse mit frischem Profil je Lauf, EINRICHTUNG.md inklusive Wiederherstellung der Bildquelle.
- Danach: E0-PRUEF-02a–d (Gerätegrößen und Erstes Bild; Lesbarkeit und Zeichen; Linkprüfer und adressen-e0.csv; Laufwerkzeug), E0-PRUEF-03 (Stufe B Ausgangswerte), E0-PROBE-01…10, E0-ORCH-02 (LAGEBILD, Faktenblatt), dann E1.
- Laufende Pakete: Workflow `tezgel-e0-werkzeuge` (wf_063a3313-3d1): E0-PRUEF-01 → 02a, 02b, 02c, 02d → 02-PA (Briefings in `pakete/`). Parallel Orchestrator: Faktenblatt K-015, KERN v3-Entwurf.
- Bei Abbruch des Workflows: Dateien der laufenden Pakete auf den letzten Commit zurücksetzen (nur deren Schreibrechte), Paket neu starten.
- Bei Wiederaufnahme (L5): Branch sicherstellen, Bildquelle nach EINRICHTUNG.md wiederherstellen, an „Jetzt“ fortsetzen.
