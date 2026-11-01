@AGENTS.md
<!-- SEO -->
## SEO-Runde Wetzlar und Aßlar (`docs/seo/`)
- Geltung: Dieser Block gilt für Sitzungen, die mit dem Startprompt aus `docs/seo/STARTPROMPT.md` arbeiten (SEO-Sitzungen). Der Orchestrator des Werkstatt-Laufs folgt weiter seinem WERKSTATT-Block; für ihn gilt aus diesem Block nur der letzte Punkt.
- SEO-Sitzungen sind keine Werkstatt-Sitzungen. Sie befolgen den WERKSTATT-Block nicht, auch nicht nach einer Kontextverdichtung, und starten oder setzen keine Werkstatt-Workflows fort. Nach Sitzungsstart, Kontextverdichtung oder Limit lesen sie zuerst `docs/seo/STARTPROMPT.md` und `docs/seo/KONTEXT.md` (Abschnitt 13, Stand).
- SEO-Sitzungen arbeiten auf `seo/lokal`, pushen nie auf `claude/tezgel-website-redesign-iqxt8z` und auf `main` nur nach der Freigabe „live“ von Umut für genau diesen Stand.
- Für alle Sitzungen: Die Originale in `_werkstatt/bilder/neue-bilder-2026-10-31/` liegen auf Anweisung des Auftraggebers (01.11.2026) bewusst im Repo. Nicht verschieben, löschen, umbenennen oder überschreiben.
<!-- /SEO -->

<!-- WERKSTATT -->
## Werkstatt-Lauf „Universal Motion“ (nur für den Orchestrator)
- Unteragenten mit einem Paket-Briefing ignorieren diesen Block vollständig und folgen nur ihrem Briefing.
- Bei jedem Sitzungsstart, nach jeder Kontextverdichtung und nach jedem Limit zuerst `_werkstatt/AUFTRAG.md`, `_werkstatt/STATUS.md`, `_werkstatt/PRUEFPUNKT.md` und `_werkstatt/KONTINGENT.md` lesen und exakt dort fortsetzen (L5). Bildquelle nach `_werkstatt/werkzeuge/EINRICHTUNG.md` wiederherstellen.
- Push nur auf den Arbeitsbranch `claude/tezgel-website-redesign-iqxt8z` (`git push -u origin claude/tezgel-website-redesign-iqxt8z`), nie auf `main`, nie erzwungen. Kein Deploy, keine Veröffentlichung.
- Unteragenten (Haiku) committen und pushen nie; gemeinsame Dateien (Designsystem, Bewegungsmodul, Navigation, Routen, Weiterleitungen, gemeinsame Daten, Paketdateien, KERN, Testkonfiguration) schreibt nur der Orchestrator. Eine neue Testdatei gehört dem Paket, das sie im Briefing nennt.
<!-- /WERKSTATT -->
