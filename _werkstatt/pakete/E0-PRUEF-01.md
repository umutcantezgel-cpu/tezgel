E0-PRUEF-01 · Prüfer · Modell: ARBEITSMODELL · Stufe 1 · Kern-Version: v1 (`_relaunch/KERN.md`) · Umfang: Einrichtung von Projekt und Prüfwerkzeugen
Schreibrechte (exakt): `_werkstatt/werkzeuge/server.sh`, `_werkstatt/werkzeuge/reinraum.sh`, `_werkstatt/werkzeuge/build-vergleich.mjs`, `_werkstatt/werkzeuge/lighthouse.mjs`, `_werkstatt/werkzeuge/knip.json`, `_werkstatt/werkzeuge/playwright.config.mjs`, `_werkstatt/werkzeuge/lib.mjs`, neu: `_werkstatt/werkzeuge/dev-server.sh`, `_werkstatt/werkzeuge/EINRICHTUNG.md`, `_werkstatt/pakete/E0-PRUEF-01.rueckgabe.md`. Dazu darf `npm ci` die Ordner `node_modules` (Repo-Wurzel) und `.next` anlegen. Sonst nichts.

## Rollenbriefing · Prüfer
Du richtest Prüfwerkzeuge ein, führst die Prüfungen deiner Stufe aus und berichtest knapp mit Belegpfaden. Häufige Fehler: Einzelmessung statt Median; deuten statt berichten; über die Stufe hinaus prüfen.

## Aufgabe in einem Satz
Installiere und baue das Projekt, starte Produktions- und Dev-Server dauerhaft, richte die Prüfwerkzeuge in `_werkstatt/werkzeuge` für die neue Sitzung und den neuen Ordner ein und dokumentiere jeden Schritt reproduzierbar.

## Das Projekt in fünf Sätzen (wortgleich aus KERN)
1. Wir werten die Website von Fliesenverlegung Tezgel (Deniz Tezgel, Aßlar, seit 2008 bei der Handwerkskammer Wiesbaden eingetragen) zu einer eigenständigen, messbar besseren Seite auf, ohne Texte, Logo, Rechtliches oder Funktionen zu verlieren.
2. Leitidee: Jede Seite ist ein Verlegeplan – ein Fugenraster, eine rote Laserachse, und alles fluchtet daran.
3. Besucher sind Eigentümer in Mittelhessen zwischen 35 und 75, die in wenigen Schritten die passende Leistung finden, Vertrauen prüfen, ihren Ort prüfen, den Ablauf verstehen und ein Aufmaß anfragen wollen.
4. Gestaltet wird mit Archivo und IBM Plex Mono, mit Kalk, Tinte und genau einem Rot, mit gezeichneten Verlegeplänen statt Fotos und mit Bewegung, die ausrichtet und nie federt.
5. Alles ist zugänglich nach WCAG 2.2 AA, schnell (Lighthouse mobil ≥ 90), ohne Effektteppich und ohne Erfundenes – im Zweifel gilt Bestand vor Gestaltung.

## Kern-Auszug
K-004 (v1): Next.js 16.3.6, App Router, SSG, Turbopack, React 19, Tailwind 4. Prüfungen: `npm run build`, `typecheck`, `lint`, `npm test` (Node ≥ 22.6), `qa:graph`. Keine Erkennung von Testumgebungen im Produkt.

## Maßstab
Vorhandene Werkzeuge des Vorlaufs (jetzt in `_werkstatt/werkzeuge/`): `server.sh`, `reinraum.sh`, `lib.mjs`, `fotos.mjs`, `axe.mjs`, `lighthouse.mjs`, `playwright.config.mjs`, `tests/`. Ändere nur Pfade und Umgebung, nicht ihre Prüflogik.

## Grenzen
- Repository `/home/user/tezgel`, Branch `claude/amazing-mendel-b0g40w`. Kein `git commit`, kein `git push`, kein `git checkout`/`reset`/`stash`.
- Keine Datei unter `src/`, `public/`, `test/` oder Repo-Konfiguration ändern. Keine Umgebungsdateien (`.env*`) anlegen oder lesen.
- Keine echten Formularsendungen, kein `npm run indexnow`, keine POST-Anfragen per curl. Server nur auf 127.0.0.1.
- Neue Pakete nur in `_werkstatt/werkzeuge` (eigene `package.json`), nie in den Abhängigkeiten des Projekts.
- Scratchpad: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad` (im Folgenden SCRATCH). `_werkstatt/cache` ist bereits ein Symlink nach `SCRATCH/werkstatt-cache` (nicht ändern).

## Schritte
1. In `/home/user/tezgel`: `node --version` notieren, dann `npm ci` (Ausgabe nach `SCRATCH/e0/npm-ci.log`).
2. Ersetze in genau diesen 3 Dateien den alten Scratchpad-Pfad `/tmp/claude-0/-home-user-tezgel/f51f963a-66a5-5b8c-a0c5-6b569a6ff96b/scratchpad` durch SCRATCH: `server.sh` Z. 5, `reinraum.sh` Z. 8, `build-vergleich.mjs` Z. 8. Ersetze in `reinraum.sh` Z. 10 `_relaunch/cache` durch `_werkstatt/cache` und in Z. 25–26 die Leck-Prüfung so, dass sie nach `_relaunch` UND `_werkstatt` sucht (Datei `nft-werkstatt.txt`, Meldung „nft: _relaunch/_werkstatt GEFUNDEN“ bzw. „nft: sauber“). Ersetze in `knip.json` `"_relaunch/**"` durch `"_relaunch/**", "_werkstatt/**"`. In `lighthouse.mjs` Z. 18: Standardpfad nur ändern, wenn `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` nicht existiert (prüfen und Ergebnis notieren).
3. `playwright.config.mjs`: Projekt `mobil` auf `viewport { width: 390, height: 844 }` (isMobile, hasTouch bleiben), `desktop` bleibt 1440×900. Nichts sonst.
4. `lib.mjs`: In `ANSICHTEN` die Einträge `m390: { width: 390, height: 844, isMobile: true, hasTouch: true }` ergänzen (vor `t768`); bestehende Einträge bleiben (Rückwärtskompatibilität). Nichts sonst.
5. Werkzeug-Abhängigkeiten installieren, ohne dass `node_modules` im Repo liegt: `mkdir -p SCRATCH/werkzeuge-nm`; in `_werkstatt/werkzeuge`: `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm ci` mit `npm_config_cache` im SCRATCH; danach `node_modules` nach `SCRATCH/werkzeuge-nm/node_modules` verschieben und in `_werkstatt/werkzeuge` einen Symlink `node_modules -> SCRATCH/werkzeuge-nm/node_modules` anlegen. Prüfe, dass `git status --porcelain` den Symlink NICHT als unverfolgt zeigt (`**/node_modules/` ist ignoriert) – sonst melden. Prüfe `npx playwright --version` (erwartet 1.56.1) und dass Chromium aus `/opt/pw-browsers` startet (`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`).
6. Reinraum-Build: `bash _werkstatt/werkzeuge/reinraum.sh HEAD` (aus `/home/user/tezgel`). Ergebnis jeder Stufe (npm ci, build, typecheck, lint, test mit Anzahl, qa:graph, nft) notieren. Läuft es länger als 25 Minuten: abbrechen und melden.
7. Produktionsserver: `bash _werkstatt/werkzeuge/server.sh start HEAD` (Port 4310). Prüfe `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4310/` = 200 und `/gibt-es-nicht` = 404. Der Server muss nach Ende deiner Sitzung weiterlaufen: Falls `server.sh` ihn nicht abgelöst startet, starte ihn mit `setsid nohup … &` und dokumentiere das.
8. Neu `dev-server.sh` (ausführbar): startet `npx next dev -H 127.0.0.1 -p 4320` im Repo-Wurzelverzeichnis in einer Endlosschleife mit Neustart (Wächter); Log `SCRATCH/dev-4320.log`; Unterbefehle `start` (abgelöst per `setsid nohup`, PID-Datei `SCRATCH/dev-4320.pid`), `stop`, `status` (HTTP-Probe auf `/` mit Zeitlimit 60 s, Ausgabe `OK` oder `FEHLT`). Starte ihn und prüfe `status` = OK (erste Kompilierung kann dauern; Probe auf `/` und `/kontakt`).
9. Funktionstests einmal gegen 4310 als Rauchprobe: in `_werkstatt/werkzeuge`: `RELAUNCH_BASE=http://127.0.0.1:4310 RELAUNCH_OUTPUT=SCRATCH/e0/pw-out RELAUNCH_REPORT=SCRATCH/e0/pw-hero.json npx playwright test tests/funktion-hero-kontakt.spec.mjs --workers=1`. Ergebnis (bestanden/fehlgeschlagen/übersprungen je Projekt) notieren. Nicht die ganze Suite (das macht E0-PRUEF-04).
10. Schreibe `_werkstatt/werkzeuge/EINRICHTUNG.md`: nummerierte, kopierbare Befehle, mit denen eine neu aufgesetzte Umgebung exakt diesen Stand wieder herstellt (Schritte 1, 5, 6, 7, 8), plus Ports, Logpfade, PID-Dateien, bekannte Stolpersteine.

## Schnellprüfung und Selbstprüfung
- Server 4310 und 4320 antworten (Beleg: curl-Ausgabe). Reinraum-Ergebnisse vollständig. `git status --porcelain` zeigt nur deine erlaubten Dateien (plus vom Orchestrator bereits vorhandene Änderungen – diese nicht anfassen).
- Mengen gezählt: 3 Pfadersetzungen in Schritt 2 + knip + reinraum Z. 10/25–26; 1 Viewport; 1 Ansicht in lib.mjs.
- Offene Fragen gelistet.

## Ausgabeformular (in `_werkstatt/pakete/E0-PRUEF-01.rueckgabe.md` UND als letzte Antwort, höchstens 600 Wörter)
GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS (Node-Version, npm ci, build, typecheck, lint, test n/n, qa:graph, nft, Server 4310/4320, Rauchprobe Playwright) · BILDBELEGE (keine nötig) · OFFENE FRAGEN

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.

=== ENDE E0-PRUEF-01 · BEREIT ZUR RÜCKGABE ===
