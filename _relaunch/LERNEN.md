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
- 10.10. 22:45 · Mutationsprobe traf einen fremden Erprobungsserver auf demselben Port (EADDRINUSE nur im Log) → `server.sh` bricht jetzt bei belegtem Port, EADDRINUSE oder fehlendem next-server aus dem Build-Ordner ab. Mutationsproben nur über `server.sh` starten.
- 10.10. 22:45 · Push 57470f8 ging zuerst auf den Sitzungs-Branch – Verstoß gegen E-005 (Produktion lief diesmal trotzdem an). Künftig nur `git push origin HEAD:main`.
- 10.10. 22:45 · `pkill -f "<muster>"` in einer Befehlszeile, die das Muster selbst enthält, beendet die eigene Shell (Exit 144) → Klammer-Trick `[n]ext start …` oder PID gezielt beenden.
- 10.10. 23:40 · N-20 präzisiert: Entwürfe dürfen Nachbardateien im eigenen Ordner relativ importieren („./Datei“, „./_privat/…“) – sie wandern mit `freischalten.sh` mit; verboten bleiben `../` und Unterordner ohne Unterstrich. `tor-t1.sh` prüft das jetzt so (vorher schlug es bei `./Probe` und `./Vorschau` an).
- 11.10. 00:20 · `server.sh stop` beendete nur den „next start“-Elternprozess; der eigentliche `next-server` lief als Waise weiter und hielt den Port (zwei verwaiste Server gefunden). Folge: Ein Neustart auf demselben Port hätte unbemerkt den alten Build bedient. Jetzt beendet `stoppe()` die ganze Prozesskette, und der Start bricht ab, wenn der Port danach noch antwortet. Rückblick: Alle bisherigen Tore liefen auf frischen Ports oder nach dem Container-Neustart, die Ergebnisse bleiben gültig.
- 11.10. 03:20 · Testschreiber hatten Kern-Wege so eingebaut, dass Bestandsfunktionen (Drawer, Widget, Bestand-Banner) im Kandidaten ungeprüft blieben (P3-14-GEG H-1/H-2/M-2) → Regel für alle Testpakete: jede Funktion in **beiden** Fassungen prüfen, die Fassung je Seite kommt aus `KERN_SEITEN` in `fixtures.mjs` (nie aus DOM oder Laufzeitverhalten). Läufe gegen Basis/Ausgangsstand mit `RELAUNCH_FASSUNG=bestand`; nach jeder Freischaltung die Liste erweitern.
- 11.10. 03:20 · `--reporter=line,json` auf der Kommandozeile schreibt das JSON auf stdout, nicht nach `RELAUNCH_REPORT` (das gilt nur für den Reporter aus der Konfiguration) → für Belege ohne `--reporter` laufen lassen oder `PLAYWRIGHT_JSON_OUTPUT_NAME` setzen.
- 11.10. 03:20 · Die volle Suite unter Last (parallel Probeläufer, Build, Bildfolgen) liefert vereinzelt rote Fälle auf unveränderten Bestandsseiten; Einzelwiederholung grün → Suiten für Tore nur ohne parallele Browser-Last laufen lassen.
- 11.10. 06:20 · `<Suspense>` um statisch vorgerenderte Abschnitte (Next 16 App Router): Der Prerender legt den Inhalt in `<div hidden id="S:n">` und zeigt ihn erst per Skript – ohne JavaScript unsichtbar. Die bessere Lighthouse-Zahl kam daher. Regel: keine Suspense-Grenzen um Inhalt, der ohne JS lesbar sein muss; jede Leistungsänderung auch mit der Ohne-JS-Probe (a11y-zusatz) gegenprüfen.
