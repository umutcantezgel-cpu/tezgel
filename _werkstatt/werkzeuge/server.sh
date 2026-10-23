#!/usr/bin/env bash
# Startet den Reinraum-Build eines Commits als Produktionsserver auf 127.0.0.1:${PORT:-4310}.
# Abgelöst per setsid (überlebt das Ende der aufrufenden Sitzung); gestoppt wird die ganze Prozessgruppe.
# Nutzung: server.sh start <commit> | server.sh stop | server.sh status
set -uo pipefail
source "$(dirname "$0")/scratch.sh" || exit 1
PORT="${PORT:-4310}"
PIDFILE="$SCRATCH/server-$PORT.pid"
DIRFILE="$SCRATCH/server-$PORT.dir"

stoppe() {
  if [ -s "$PIDFILE" ] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null; then
    PGID="$(ps -o pgid= -p "$(cat "$PIDFILE")" | tr -d ' ')"
    [ -n "$PGID" ] && kill -TERM -- "-$PGID" 2>/dev/null
  fi
  # Rückfall: jeder next-server/next start, dessen Arbeitsverzeichnis ein Reinraum-Build im SCRATCH ist
  # (auch ohne PID-Datei gestartete; der Dev-Server läuft im Repo und bleibt unberührt)
  # Verzeichnisse anderer Ports (server-<Port>.dir) bleiben unberührt; kennt dieser Port sein Verzeichnis,
  # wird nur dieses beendet.
  # Prozessgruppen anderer Ports (server-<Port>.pid) bleiben in jedem Fall unberührt – auch wenn zwei Ports
  # denselben Build ausliefern (E3-PRUEF-W1, Frage 1: sonst beendete ein Stop von 4312 auch 4310).
  local eigen="" fremd=" " fremdgruppen=" "
  [ -s "$DIRFILE" ] && eigen="$(cat "$DIRFILE")"
  for f in "$SCRATCH"/server-*.dir; do
    [ -e "$f" ] && [ "$f" != "$DIRFILE" ] && fremd="$fremd$(cat "$f") "
  done
  for f in "$SCRATCH"/server-*.pid; do
    [ -e "$f" ] && [ "$f" != "$PIDFILE" ] || continue
    g="$(ps -o pgid= -p "$(cat "$f")" 2>/dev/null | tr -d ' ')"
    [ -n "$g" ] && fremdgruppen="$fremdgruppen$g "
  done
  for p in $(pgrep -f "next-server|next start" 2>/dev/null); do
    cwd="$(readlink "/proc/$p/cwd" 2>/dev/null)"
    case "$cwd" in "$SCRATCH"/reinraum-*) ;; *) continue;; esac
    g="$(ps -o pgid= -p "$p" 2>/dev/null | tr -d ' ')"
    case "$fremdgruppen" in *" $g "*) continue;; esac
    if [ -n "$eigen" ]; then [ "$cwd" = "$eigen" ] || continue
    else case "$fremd" in *" $cwd "*) continue;; esac; fi
    kill -TERM "$p" 2>/dev/null
  done
  for i in $(seq 1 10); do curl -s -o /dev/null -m 1 "http://127.0.0.1:$PORT/" || break; sleep 1; done
  rm -f "$PIDFILE" "$DIRFILE"
}

case "${1:-}" in
  stop) stoppe; echo "gestoppt";;
  status) CODE="$(curl -s -o /dev/null -m 30 -w '%{http_code}' "http://127.0.0.1:$PORT/" || true)"; [ "$CODE" = "200" ] && echo OK || echo FEHLT;;
  start)
    REPO="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
    SHA="$(git -C "$REPO" rev-parse --short "${2:-HEAD}")"
    DIR="${REINRAUM_DIR:-$SCRATCH/reinraum-$SHA}"
    [ -d "$DIR/.next" ] || { echo "kein Build in $DIR – zuerst reinraum.sh $SHA"; exit 2; }
    stoppe
    # Die Unterschale gibt Ausgabe und Eingabe vollständig frei (sonst hält sie die Pipe des Aufrufers offen).
    # exec macht den Server selbst zum Prozessgruppenführer: $! ist dann PID = PGID, und stop trifft die richtige Gruppe.
    ( cd "$DIR" && exec setsid nohup npx next start -H 127.0.0.1 -p "$PORT" > "$SCRATCH/server-$SHA-$PORT.log" 2>&1 < /dev/null ) > /dev/null 2>&1 &
    echo $! > "$PIDFILE"
    echo "$DIR" > "$DIRFILE"
    for i in $(seq 1 60); do curl -s -o /dev/null "http://127.0.0.1:$PORT/" && { echo "läuft: $SHA auf $PORT"; exit 0; }; sleep 1; done
    echo "Start fehlgeschlagen"; exit 1;;
  *) echo "start <commit> | stop | status";;
esac
