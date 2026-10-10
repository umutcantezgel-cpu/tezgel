# E0-PRUEF-01 · Rückgabe

SCRATCH = /tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad

## GEÄNDERTE DATEIEN
- `/home/user/tezgel/_werkstatt/werkzeuge/server.sh` Z. 5: Scratchpad-Pfad.
- `/home/user/tezgel/_werkstatt/werkzeuge/reinraum.sh` Z. 8 (Scratchpad-Pfad), Z. 10 (`_werkstatt/cache`), Z. 25–26 (Leck-Prüfung auf `_relaunch|_werkstatt`, Datei `nft-werkstatt.txt`, neue Meldungen).
- `/home/user/tezgel/_werkstatt/werkzeuge/build-vergleich.mjs` Z. 8: Scratchpad-Pfad.
- `/home/user/tezgel/_werkstatt/werkzeuge/knip.json`: `ignore` um `"_werkstatt/**"` erweitert.
- `/home/user/tezgel/_werkstatt/werkzeuge/playwright.config.mjs`: Projekt `mobil` auf 390×844.
- `/home/user/tezgel/_werkstatt/werkzeuge/lib.mjs`: Ansicht `m390` in `ANSICHTEN`, vor `t768`.
- Neu: `_werkstatt/werkzeuge/dev-server.sh` (ausführbar), `_werkstatt/werkzeuge/EINRICHTUNG.md`, `_werkstatt/pakete/E0-PRUEF-01.rueckgabe.md`.
- Unverändert: `lighthouse.mjs` (Standard-Chromium-Pfad existiert).
- Nebeneffekte von `next dev`: `AGENTS.md` wurde umgeschrieben und auf HEAD zurückgesetzt (jetzt unverändert). `next-env.d.ts` in der Repo-Wurzel angelegt (gitignored, bleibt).
- Symlink: `_werkstatt/werkzeuge/node_modules` → `SCRATCH/werkzeuge-nm/node_modules`.

## WAS UND WARUM
- Scratchpad-Pfad `f51f963a-…` durch `dace07c4-…` ersetzt, an den drei vorgegebenen Stellen.
- Reinraum: Cache-Pfad und Leck-Prüfung auf `_werkstatt` umgestellt. knip ignoriert `_werkstatt/**`.
- Mobil-Viewport 390×844 und Ansicht `m390` wie vorgegeben. Wirkung: `m390` läuft jetzt auch in den Standardläufen von `axe.mjs`, `fotos.mjs` und `kachel-fotos.mjs`.
- `dev-server.sh`: Wächter für `next dev` auf 4320, abgelöst per `setsid`, PID-Datei, Log, Status `OK`/`FEHLT`.
- `server.sh start` ließ den Produktionsserver in der Shell-Sitzung. Deshalb neu gestartet, abgelöst per `setsid nohup` (Befehl in `EINRICHTUNG.md`, Schritt 7).
- Mengen: 3 Pfadersetzungen (Schritt 2), knip 1, reinraum Z. 10 und 25–26, 1 Viewport, 1 Ansicht.

## GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste)
1. `/home/user/tezgel/next.config.ts`: im Objekt `nextConfig` die Zeile `agentRules: false,` ergänzen. Ohne sie schreibt `next dev` bei jedem Start `AGENTS.md` um.
2. `/home/user/tezgel/.gitignore`: Zeile `_werkstatt/werkzeuge/node_modules` ergänzen. Ohne sie zeigt `git status` den Symlink als unverfolgt.
3. Optional: `_werkstatt/werkzeuge/jury-workflow.js` Z. 18 und `slop-workflow.js` Z. 7 verweisen auf `_relaunch/pakete/…`. Die Dateien existieren dort noch.

## PRÜFUNG UND ERGEBNIS
- Node: v22.22.0 (≥ 22.6 für `npm test`).
- `npm ci` (Repo): Exit 0, 480 Pakete, 36 s. `npm audit`: 8 high, nicht bearbeitet.
- Reinraum HEAD `745335f` (`SCRATCH/werkstatt-cache/reinraum-745335f/ergebnis.txt`): npm-ci 0 (28 s), build 0 (53 s), typecheck 0 (10 s), lint 0 (23 s), test 0 (2 s), qa:graph 0 (0 Fehler), nft: sauber. `routen.txt`: 105 Zeilen.
- test: 17/17 bestanden.
- qa:graph: bestanden, 0 Fehler.
- nft: sauber, kein `_relaunch` oder `_werkstatt` im Tracing.
- Server 4310 (`745335f`, eigene Sitzung): `/` → 200, `/gibt-es-nicht` → 404.
- Server 4320 (`dev-server.sh`, Wächter PID 1596): `status` → OK. `/` → 200, `/kontakt` → 200.
- Rauchprobe Playwright (`funktion-hero-kontakt.spec.mjs`, gegen 4310): 6/6 bestanden, mobil 3/3 (390×844), desktop 3/3. 0 fehlgeschlagen, 0 übersprungen, 15,8 s. Reports: `SCRATCH/e0/pw-hero.json`, `SCRATCH/e0/pw-hero.log`.
- Werkzeuge: Playwright 1.56.1. Chromium 141 aus `/opt/pw-browsers/chromium-1194` startet über Playwright.
- `bash -n`, `node --check` und JSON-Parse der geänderten Dateien: alle OK.
- Git: nur erlaubte Dateien plus der Symlink (`??`). `AGENTS.md` unverändert. Nicht committet.

## BILDBELEGE
Keine nötig.

## OFFENE FRAGEN
1. `server.sh stop` hat `next-server` nicht beendet (geprüft: Port 4310 antwortete weiter). `start` nutzt dasselbe Muster. Ein alter Server bliebe dann auf 4310, und `start` könnte „läuft“ melden (aus dem Code abgeleitet, nicht geprüft). Soll die Prozesssteuerung über PID oder Prozessgruppe umgestellt werden, wie in `dev-server.sh`? Nicht geändert.
2. Testfall 3 je Projekt schickt einen POST an den lokalen `/api/anfrage` (`echteRoute`). Laut Testname läuft der Server im Mock-Modus ohne Resend-Schlüssel. Nicht geprüft, da keine `.env*` gelesen wurden. Bitte bestätigen, dass nichts versendet wurde.
3. `m390` steht in `lib.mjs` zweimal (`ANSICHTEN` und `ANSICHTEN_AUSBAU`, gleiche Werte). Soll `m390` in den Standardläufen von `axe.mjs`, `fotos.mjs` und `kachel-fotos.mjs` enthalten sein?
4. HEAD wechselte während der Sitzung auf `745335f` (Orchestrator-Commit). Alle Builds und Server beziehen sich darauf. Die Änderungen aus Schritt 2–4 liegen unstaged darüber und müssen vom Orchestrator committet werden.
