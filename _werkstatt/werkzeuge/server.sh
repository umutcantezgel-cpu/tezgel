#!/usr/bin/env bash
# Startet den Reinraum-Build eines Commits als Produktionsserver auf 127.0.0.1:${PORT:-4310}.
# Abgelöst per setsid (überlebt das Ende der aufrufenden Sitzung); gestoppt wird die ganze Prozessgruppe.
# Nutzung: server.sh start <commit> | server.sh stop | server.sh status
set -uo pipefail
SCRATCH="${RELAUNCH_SCRATCH:-/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad}"
PORT="${PORT:-4310}"
PIDFILE="$SCRATCH/server-$PORT.pid"

stoppe() {
  if [ -s "$PIDFILE" ] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null; then
    PGID="$(ps -o pgid= -p "$(cat "$PIDFILE")" | tr -d ' ')"
    [ -n "$PGID" ] && kill -TERM -- "-$PGID" 2>/dev/null
  fi
  # Rückfall: jeder next-server/next start, dessen Arbeitsverzeichnis ein Reinraum-Build im SCRATCH ist
  # (auch ohne PID-Datei gestartete; der Dev-Server läuft im Repo und bleibt unberührt)
  for p in $(pgrep -f "next-server|next start" 2>/dev/null); do
    case "$(readlink "/proc/$p/cwd" 2>/dev/null)" in "$SCRATCH"/reinraum-*) kill -TERM "$p" 2>/dev/null;; esac
  done
  for i in $(seq 1 10); do curl -s -o /dev/null -m 1 "http://127.0.0.1:$PORT/" || break; sleep 1; done
  rm -f "$PIDFILE"
}

case "${1:-}" in
  stop) stoppe; echo "gestoppt";;
  status) CODE="$(curl -s -o /dev/null -m 30 -w '%{http_code}' "http://127.0.0.1:$PORT/" || true)"; [ "$CODE" = "200" ] && echo OK || echo FEHLT;;
  start)
    REPO="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
    SHA="$(git -C "$REPO" rev-parse --short "${2:-HEAD}")"
    DIR="$SCRATCH/reinraum-$SHA"
    [ -d "$DIR/.next" ] || { echo "kein Build in $DIR – zuerst reinraum.sh $SHA"; exit 2; }
    stoppe
    cd "$DIR" && setsid nohup npx next start -H 127.0.0.1 -p "$PORT" > "$SCRATCH/server-$SHA-$PORT.log" 2>&1 < /dev/null &
    echo $! > "$PIDFILE"
    for i in $(seq 1 60); do curl -s -o /dev/null "http://127.0.0.1:$PORT/" && { echo "läuft: $SHA auf $PORT"; exit 0; }; sleep 1; done
    echo "Start fehlgeschlagen"; exit 1;;
  *) echo "start <commit> | stop | status";;
esac
