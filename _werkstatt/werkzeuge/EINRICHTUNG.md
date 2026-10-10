# EINRICHTUNG · Prüfwerkzeuge und Server (E0-PRUEF-01)

Stand der Einrichtung: Node v22.22.0 · Playwright 1.56.1 (Chromium 141 aus `/opt/pw-browsers/chromium-1194`) · Build-Commit 745335f (HEAD während der Einrichtung) · Branch `claude/amazing-mendel-b0g40w`.

Voraussetzung: Die Dateiänderungen der Schritte 2–4 (Scratchpad-Pfade in `server.sh`, `reinraum.sh`, `build-vergleich.mjs`; `reinraum.sh` Z. 10 und 25–26; `knip.json`; `playwright.config.mjs` Projekt `mobil` 390×844; `lib.mjs` Ansicht `m390`) sind im Arbeitsbaum. Die Befehle unten ändern außer den genannten Pfaden keine Dateien im Repo.

## Umgebung (in jeder neuen Shell setzen)

    export SCRATCH=/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad
    export RELAUNCH_SCRATCH="$SCRATCH"
    export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
    export SHA=$(git -C /home/user/tezgel rev-parse --short HEAD)

Nach jedem neuen Commit gilt eine neue `SHA`: Schritt 6 und Schritt 7 dann erneut ausführen.

## Schritt 1 · Repo-Abhängigkeiten (Repo-Wurzel)

    node --version
    mkdir -p "$SCRATCH/e0"
    npm --prefix /home/user/tezgel ci > "$SCRATCH/e0/npm-ci.log" 2>&1; echo "npm ci exit $?"

## Schritt 5 · Werkzeug-Abhängigkeiten außerhalb des Repos

    mkdir -p "$SCRATCH/e0" "$SCRATCH/werkzeuge-nm" "$SCRATCH/npm-cache"
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm_config_cache="$SCRATCH/npm-cache" npm --prefix /home/user/tezgel/_werkstatt/werkzeuge ci > "$SCRATCH/e0/werkzeuge-npm-ci.log" 2>&1; echo "werkzeuge npm ci exit $?"
    mv /home/user/tezgel/_werkstatt/werkzeuge/node_modules "$SCRATCH/werkzeuge-nm/node_modules"
    ln -s "$SCRATCH/werkzeuge-nm/node_modules" /home/user/tezgel/_werkstatt/werkzeuge/node_modules
    npm --prefix /home/user/tezgel/_werkstatt/werkzeuge exec -- playwright --version

Erwartet: `Version 1.56.1`.

## Schritt 6 · Reinraum-Build (aus HEAD, nicht aus dem Arbeitsbaum)

    bash /home/user/tezgel/_werkstatt/werkzeuge/reinraum.sh HEAD

Dauer hier etwa 2 Minuten. Ergebnis: `$SCRATCH/werkstatt-cache/reinraum-$SHA/ergebnis.txt`. Je Stufe ein Log (`npm-ci.log`, `build.log`, `typecheck.log`, `lint.log`, `test.log`, `qa-graph.log`), ferner `routen.txt` und `nft-werkstatt.txt`. Der Build nutzt nur committete Dateien (`git archive HEAD`); Änderungen am Arbeitsbaum fließen nicht ein.

## Schritt 7 · Produktionsserver 127.0.0.1:4310

    bash /home/user/tezgel/_werkstatt/werkzeuge/server.sh start HEAD   # abgelöst per setsid, PID-Datei $SCRATCH/server-4310.pid
    bash /home/user/tezgel/_werkstatt/werkzeuge/server.sh status       # OK | FEHLT
    curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:4310/gibt-es-nicht   # erwartet 404

`server.sh stop` beendet die Prozessgruppe aus der PID-Datei und zusätzlich jeden `next-server`, dessen Arbeitsverzeichnis ein Reinraum-Build im SCRATCH ist (Dev-Server bleibt unberührt). Nach jedem neuen Commit: `reinraum.sh HEAD`, dann `server.sh start HEAD` (Orchestrator).

## Schritt 8 · Entwicklungsserver 127.0.0.1:4320 (Wächter)

    bash /home/user/tezgel/_werkstatt/werkzeuge/dev-server.sh start
    bash /home/user/tezgel/_werkstatt/werkzeuge/dev-server.sh status

`status` gibt `OK` oder `FEHLT` aus (HTTP-Probe auf `/`, Zeitlimit 60 s). Die erste Kompilierung kann länger dauern; dann `status` wiederholen. Zusätzlich `/kontakt` prüfen. Stoppen: `bash /home/user/tezgel/_werkstatt/werkzeuge/dev-server.sh stop`.

Nach dem Start prüfen, ob `next dev` das Repo verändert hat:

    git -C /home/user/tezgel status --porcelain -- AGENTS.md

Ausgabe muss leer sein (siehe Stolpersteine).

## Ports, Logs, PID-Dateien

| Dienst | Port | Läuft aus | Log | PID |
|---|---|---|---|---|
| Produktion (`server.sh`, nach Ablösung) | 4310 | `$SCRATCH/reinraum-$SHA` (Kopie von HEAD) | `$SCRATCH/server-$SHA-4310.log` | keine Datei; PID über `pgrep -f next-server` und `/proc/<PID>/cwd` |
| Entwicklung (`dev-server.sh`) | 4320 | Repo-Wurzel `/home/user/tezgel` | `$SCRATCH/dev-4320.log` | `$SCRATCH/dev-4320.pid` (PID des Wächters = Prozessgruppe) |
| Reinraum-Build | – | `$SCRATCH/reinraum-$SHA` | `$SCRATCH/werkstatt-cache/reinraum-$SHA/` | – |

## Stolpersteine

- Der Scratchpad-Pfad ist sitzungsgebunden. Die Standardpfade in `server.sh`, `reinraum.sh`, `build-vergleich.mjs` und `dev-server.sh` zeigen auf `dace07c4-…`. In einer neuen Sitzung `RELAUNCH_SCRATCH` setzen und `SCRATCH` oben anpassen.
- Schritt 5 nicht wiederholen, ohne vorher aufzuräumen: Existiert `$SCRATCH/werkzeuge-nm/node_modules` schon, verschiebt `mv` den neuen Ordner hinein statt ihn zu ersetzen. Vorher `rm -rf "$SCRATCH/werkzeuge-nm/node_modules"` und den Symlink `_werkstatt/werkzeuge/node_modules` entfernen.
- `_werkstatt/werkzeuge/node_modules` ist ein Symlink. `git status` zeigt ihn als `??`, weil `**/node_modules/` in `.gitignore` nur Verzeichnisse erfasst. Nicht von E0 geändert, da `.gitignore` Repo-Konfiguration ist.
- `server.sh stop` hat den Prozess `next-server` nicht beendet (geprüft: Port 4310 antwortete danach weiter). `server.sh start` nutzt dasselbe Muster. Ein alter Server bliebe dann auf 4310 und lieferte seinen Build weiter aus. Das ist aus dem Code abgeleitet, nicht geprüft. Deshalb vor jedem Neustart die Ablösung aus Schritt 7 ausführen und den Port prüfen.
- Dev- und Produktionsserver heißen beide `next-server`. `pkill -f next-server` würde also beide treffen. Die PID immer über das Arbeitsverzeichnis wählen.
- `next dev` schreibt beim Start den Block `nextjs-agent-rules` in `AGENTS.md` um (Diff: 5 Zeilen ergänzt, 1 entfernt). Das ist eine Änderung an einer versionierten Datei. E0 hat `AGENTS.md` nach dem Start mit `git show HEAD:AGENTS.md` wiederhergestellt. Dauerhaft abstellen lässt sich das nur über `agentRules: false` in `next.config.ts` (Repo-Konfiguration, nicht von E0 geändert).
- `next dev` legt `next-env.d.ts` in der Repo-Wurzel an. Die Datei ist gitignored, liegt aber außerhalb der Schreibliste.
- `next dev` (4320) und `next build` teilen sich `.next` in der Repo-Wurzel. Solange der Dev-Server läuft, dort kein `next build` ausführen. Der Reinraum baut in einer eigenen Kopie und ist davon nicht betroffen.
- `npm test` des Projekts braucht Node ≥ 22.6 (hier v22.22.0).
- Playwright ohne `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` findet keinen Browser.
- Rauchprobe (nur dieser eine Test, nicht die ganze Suite): Testfall 3 je Projekt schickt einen POST an `/api/anfrage` des lokalen Servers (Option `echteRoute`). Der Testname nennt den Mock-Modus ohne Resend-Schlüssel. Vor einer Wiederholung bestätigen, dass der Server so läuft.

    cd /home/user/tezgel/_werkstatt/werkzeuge && RELAUNCH_BASE=http://127.0.0.1:4310 RELAUNCH_OUTPUT="$SCRATCH/e0/pw-out" RELAUNCH_REPORT="$SCRATCH/e0/pw-hero.json" npx playwright test tests/funktion-hero-kontakt.spec.mjs --workers=1

## Hinweise (Orchestrator, nach E0-PRUEF-01)
- `next dev` (16.3) pflegt in `AGENTS.md` einen verwalteten Block (`<!-- BEGIN:nextjs-agent-rules -->`); laut `node_modules/next/dist/docs/01-app/02-guides/ai-agents.md` wird die Auffrischung mit committet (kein `agentRules: false`).
- `.gitignore` enthält `/_werkstatt/werkzeuge/node_modules` (Symlink, daher ohne Schrägstrich).
- Die Anfrage-Route läuft ohne Mail-Schlüssel im Mock-Modus (keine `.env*`, keine `RESEND_*`-Variable) – Testläufe gegen die echte Route versenden nichts.

## Variante mit Platzhalter-Analyse-ID (Tracking-Test, Port 4311)
Für `funktion-tracking.spec.mjs` (Tracking erst nach Einwilligung) wird derselbe Stand zusätzlich mit einer
Platzhalter-Kennung gebaut (keine echte Kennung, keine echte Anfrage – die Werkzeuge sperren Fremd-Hosts):

```bash
S=<Scratchpad>
REINRAUM_DIR=$S/reinraum-ga-<commit> NEXT_PUBLIC_GA4_ID=G-TEST000000 bash _werkstatt/werkzeuge/reinraum.sh <commit> $S/reinraum-ga-log
PORT=4311 REINRAUM_DIR=$S/reinraum-ga-<commit> bash _werkstatt/werkzeuge/server.sh start <commit>
RELAUNCH_BASE=http://127.0.0.1:4311 RELAUNCH_TRACKING=1 npx playwright test funktion-tracking.spec.mjs --workers=1
```
`server.sh stop` beendet nur den Server des jeweiligen Ports (Verzeichnis in `server-<Port>.dir`).
