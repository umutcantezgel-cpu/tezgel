@AGENTS.md

<!-- WERKSTATT -->
## Werkstatt-Lauf „Universal Motion“ (nur für den Orchestrator)
- **Angehalten seit 01.11.2026 auf Anweisung des Auftraggebers (E-115).** Der Werkstatt-Stand ist live. Fortsetzen nur auf neue, ausdrückliche Anweisung des Auftraggebers; bis dahin gilt dieser Block für keine Sitzung.
- Unteragenten mit einem Paket-Briefing ignorieren diesen Block vollständig und folgen nur ihrem Briefing.
- Bei jedem Sitzungsstart, nach jeder Kontextverdichtung und nach jedem Limit zuerst `_werkstatt/AUFTRAG.md`, `_werkstatt/STATUS.md`, `_werkstatt/PRUEFPUNKT.md` und `_werkstatt/KONTINGENT.md` lesen und exakt dort fortsetzen (L5). Bildquelle nach `_werkstatt/werkzeuge/EINRICHTUNG.md` wiederherstellen.
- Push nur auf den Arbeitsbranch `claude/tezgel-website-redesign-iqxt8z` (`git push -u origin claude/tezgel-website-redesign-iqxt8z`), nie auf `main`, nie erzwungen. Kein Deploy, keine Veröffentlichung.
- Unteragenten (Haiku) committen und pushen nie; gemeinsame Dateien (Designsystem, Bewegungsmodul, Navigation, Routen, Weiterleitungen, gemeinsame Daten, Paketdateien, KERN, Testkonfiguration) schreibt nur der Orchestrator. Eine neue Testdatei gehört dem Paket, das sie im Briefing nennt.
<!-- /WERKSTATT -->
