#!/usr/bin/env bash
# Entwicklungsserver des Relaunch: next dev auf 127.0.0.1:4320 im Repo-Wurzelverzeichnis.
# Wächter: startet next dev neu, sobald es endet (Pause 3 s). Der Wächter läuft abgelöst (setsid),
# überlebt also das Ende der Sitzung. Log und PID-Datei liegen in SCRATCH.
# Nutzung: dev-server.sh start | stop | status
#   start  – startet den Wächter (läuft er schon, passiert nichts)
#   stop   – beendet Wächter und next dev (ganze Prozessgruppe)
#   status – HTTP-Probe auf http://127.0.0.1:4320/ (Zeitlimit 60 s): OK oder FEHLT
set -uo pipefail
SCRATCH="${RELAUNCH_SCRATCH:-/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad}"
PORT=4320
LOG="$SCRATCH/dev-$PORT.log"
PIDFILE="$SCRATCH/dev-$PORT.pid"
REPO="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
SELF="$(realpath "$0")"

lebt() { [ -s "$PIDFILE" ] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null; }

# Interne Endlosschleife des Wächters (wird von start abgelöst aufgerufen).
wache() {
  echo $$ > "$PIDFILE"
  while true; do
    echo "$(date -Iseconds) next dev startet auf 127.0.0.1:$PORT" >> "$LOG"
    (cd "$REPO" && NEXT_TELEMETRY_DISABLED=1 npx next dev -H 127.0.0.1 -p "$PORT") >> "$LOG" 2>&1
    echo "$(date -Iseconds) next dev beendet (Exit $?), Neustart in 3 s" >> "$LOG"
    sleep 3
  done
}

case "${1:-}" in
  _wache) wache;;
  start)
    if lebt; then echo "läuft bereits (PID $(cat "$PIDFILE"))"; exit 0; fi
    rm -f "$PIDFILE"; mkdir -p "$SCRATCH"
    setsid nohup "$SELF" _wache > /dev/null 2>&1 < /dev/null &
    for i in $(seq 1 10); do [ -s "$PIDFILE" ] && break; sleep 1; done
    echo "gestartet (PID $(cat "$PIDFILE" 2>/dev/null || echo unbekannt)), Log: $LOG";;
  stop)
    if lebt; then
      PGID="$(ps -o pgid= -p "$(cat "$PIDFILE")" | tr -d ' ')"
      if [ -n "$PGID" ]; then
        kill -TERM -- "-$PGID" 2>/dev/null
        for i in $(seq 1 10); do kill -0 -- "-$PGID" 2>/dev/null || break; sleep 1; done
        kill -KILL -- "-$PGID" 2>/dev/null
      fi
      echo "gestoppt"
    else
      echo "war nicht gestartet"
    fi
    rm -f "$PIDFILE";;
  status)
    CODE="$(curl -s -o /dev/null -m 60 -w '%{http_code}' "http://127.0.0.1:$PORT/" || true)"
    if [ "$CODE" = "200" ]; then echo OK; else echo FEHLT; fi;;
  *) echo "Nutzung: $(basename "$0") start | stop | status" >&2; exit 2;;
esac
