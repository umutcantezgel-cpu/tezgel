@AGENTS.md

<!-- WERKSTATT:ANFANG -->
## Werkstatt-Lauf (nur für den Orchestrator)
- Unteragenten mit einem Paket-Briefing ignorieren diesen Block vollständig und folgen nur ihrem Briefing.
- Bei jedem Sitzungsstart und nach jeder Kontextverdichtung zuerst `_werkstatt/AUFTRAG.md`, `_werkstatt/STATUS.md` und `_werkstatt/PRUEFPUNKT.md` lesen und exakt dort fortsetzen.
- Push nur auf den Arbeitsbranch `claude/amazing-mendel-b0g40w` (`git push -u origin claude/amazing-mendel-b0g40w`), nie auf `main`, nie erzwungen. Kein Deploy, keine Veröffentlichung.
- Unteragenten (Arbeitsmodell) committen und pushen nie; gemeinsame Dateien und Tests schreibt nur der Orchestrator.
<!-- WERKSTATT:ENDE -->
