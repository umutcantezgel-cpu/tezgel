@AGENTS.md

<!-- WERKSTATT:ANFANG -->
## Werkstatt-Lauf „Verständlich, echt, ausgezeichnet“ (nur für den Orchestrator)
- Unteragenten mit einem Paket-Briefing ignorieren diesen Block vollständig und folgen nur ihrem Briefing.
- Bei jedem Sitzungsstart und nach jeder Kontextverdichtung zuerst `_werkstatt/AUFTRAG.md`, `_werkstatt/STATUS.md` und `_werkstatt/PRUEFPUNKT.md` lesen und exakt dort fortsetzen (L5). Bildquelle nach `_werkstatt/werkzeuge/EINRICHTUNG.md` wiederherstellen.
- Push nur auf den Arbeitsbranch `claude/tezgel-website-redesign-iqxt8z` (`git push -u origin claude/tezgel-website-redesign-iqxt8z`), nie auf `main`, nie erzwungen. Kein Deploy, keine Veröffentlichung.
- Unteragenten (Haiku) committen und pushen nie; gemeinsame Dateien und Tests schreibt nur der Orchestrator.
<!-- WERKSTATT:ENDE -->
