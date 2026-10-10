#!/usr/bin/env bash
# Startet den Reinraum-Build eines Commits als Produktionsserver auf 127.0.0.1:${PORT:-4310}.
# Nutzung: server.sh start <commit>[-k] | server.sh stop   (Suffix -k = Kandidat-Build aus reinraum.sh mit KANDIDAT=…)
# G5: Abbruch, wenn ein Versandschlüssel gesetzt ist oder eine .env-Datei im Build liegt (echte Route bliebe sonst nicht im Mock-Modus).
set -uo pipefail
SCRATCH="${RELAUNCH_SCRATCH:-/tmp/claude-0/-home-user-tezgel/f51f963a-66a5-5b8c-a0c5-6b569a6ff96b/scratchpad}"
PORT="${PORT:-4310}"
case "${1:-}" in
  stop) pkill -f "next start -H 127.0.0.1 -p $PORT" 2>/dev/null; sleep 1; echo "gestoppt";;
  start)
    REPO="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
    NAME="${2:-HEAD}"; SUF=""; case "$NAME" in *-k) SUF="-k"; NAME="${NAME%-k}";; *-v) SUF="-v"; NAME="${NAME%-v}";; esac
    SHA="$(git -C "$REPO" rev-parse --short "$NAME")$SUF"
    DIR="$SCRATCH/reinraum-$SHA"
    [ -z "${RESEND_API_KEY:-}" ] || { echo "ABBRUCH (G5): RESEND_API_KEY ist gesetzt"; exit 3; }
    if ls -a "$DIR" 2>/dev/null | grep -E '^\.env' | grep -vx '.env.example' | grep -q .; then echo "ABBRUCH (G5): .env-Datei im Build"; exit 3; fi
    [ -d "$DIR/.next" ] || { echo "kein Build in $DIR – zuerst reinraum.sh $SHA"; exit 2; }
    pkill -f "next start -H 127.0.0.1 -p $PORT" 2>/dev/null; sleep 1
    cd "$DIR" && (nohup npx next start -H 127.0.0.1 -p "$PORT" > "$SCRATCH/server-$SHA-$PORT.log" 2>&1 &)
    for i in $(seq 1 60); do curl -s -o /dev/null "http://127.0.0.1:$PORT/" && { echo "läuft: $SHA auf $PORT"; exit 0; }; sleep 1; done
    echo "Start fehlgeschlagen"; exit 1;;
  *) echo "start <commit> | stop";;
esac
