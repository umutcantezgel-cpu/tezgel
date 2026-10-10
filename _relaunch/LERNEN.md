# LERNEN (L6)

Fehlerstatistik je Rolle und Pakettyp. Tritt ein Fehler zweimal auf → Briefing, Muster oder Prüfskript verbessern und hier vermerken.

| Datum | Rolle | Pakettyp | Fehler | Häufigkeit | Maßnahme |
|---|---|---|---|---|---|
| 10.10. | Orchestrator | Push-Tor | Vorab-Push desselben Commits auf Branch verhindert die Produktions-Bereitstellung auf main | 1 | Push-Tor ohne Vorab-Branch (E-005) |
| 10.10. | Messprüfer (Orchestrator) | Fotoprotokoll | feste Client-Uhr (page.clock.setFixedTime) ≠ Build-Tag erzeugt künstlichen Hydrationsfehler #418 | 1 | feste Zeit nur auf Wunsch, zeitabhängige Elemente maskieren |
| 10.10. | Orchestrator | Werkzeug | Überlaufprüfung meldete visuell versteckte Elemente (sr-only) | 1 | Elemente ≤ 2 px und clip/clip-path ausgenommen |
| 10.10. | Orchestrator | axe-Zustand Menü | erster Header-Knopf mit aria-expanded war mobil unsichtbar (Mega-Menü) | 1 | Locator mit :visible |
| 10.10. | Richtung C (Opus) | Stilkachel | Erkennung von navigator.webdriver für Fotos (verstößt gegen G7 im Produkt) | 1 | Regel in KERN: keine Testumgebungs-Erkennung |
| 10.10. | Richtungsagenten | Scratchpad | gleichnamige Hilfsdateien überschrieben sich gegenseitig | 1 | Briefings: eigener Unterordner je Paket im Scratchpad |
| 10.10. | Testschreiber | Testlauf | gemeinsames Ausgabeverzeichnis/Report – parallele Läufe überschreiben sich | 2 | playwright.config: RELAUNCH_OUTPUT/RELAUNCH_REPORT je Paket; Briefing-Vorlage ergänzt |
- L6 (P0-Volllauf): „Wackelt unter Last“ hatte immer dieselbe Ursache: Klick vor der Hydrierung. Regel für alle Testschreiber: vor der ersten Interaktion mit einem Element `bedienbar(locator)` aus fixtures.mjs (prüft, dass React das Element übernommen hat) – keine festen Wartezeiten. Übernommen in die Vorlage.
