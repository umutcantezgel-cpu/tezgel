#!/usr/bin/env bash
# Startet den Reinraum-Build eines Commits als Produktionsserver auf 127.0.0.1:${PORT:-4310}.
# Nutzung: server.sh start <commit>[-k|-v|-m] | server.sh stop   (Suffix -k = Kandidat-Build aus reinraum.sh mit KANDIDAT=…, -v = Vorschau, -m = Mutationskopie)
# Schutz: Ist der Port nach dem Stoppen noch belegt (fremder Server) oder meldet das Log EADDRINUSE oder lauscht kein next-server aus $DIR, bricht das Skript ab.
# G5: Abbruch, wenn ein Versandschlüssel gesetzt ist oder eine .env-Datei im Build liegt (echte Route bliebe sonst nicht im Mock-Modus).
set -uo pipefail
SCRATCH="${RELAUNCH_SCRATCH:-/tmp/claude-0/-home-user-tezgel/f51f963a-66a5-5b8c-a0c5-6b569a6ff96b/scratchpad}"
PORT="${PORT:-4310}"
case "${1:-}" in
  stop) pkill -f "next start -H 127.0.0.1 -p $PORT" 2>/dev/null; sleep 1; echo "gestoppt";;
  start)
    REPO="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
    NAME="${2:-HEAD}"; SUF=""; case "$NAME" in *-k) SUF="-k"; NAME="${NAME%-k}";; *-v) SUF="-v"; NAME="${NAME%-v}";; *-m) SUF="-m"; NAME="${NAME%-m}";; esac
    SHA="$(git -C "$REPO" rev-parse --short "$NAME")$SUF"
    DIR="$SCRATCH/reinraum-$SHA"
    [ -z "${RESEND_API_KEY:-}" ] || { echo "ABBRUCH (G5): RESEND_API_KEY ist gesetzt"; exit 3; }
    if ls -a "$DIR" 2>/dev/null | grep -E '^\.env' | grep -vx '.env.example' | grep -q .; then echo "ABBRUCH (G5): .env-Datei im Build"; exit 3; fi
    [ -d "$DIR/.next" ] || { echo "kein Build in $DIR – zuerst reinraum.sh $SHA"; exit 2; }
    pkill -f "next start -H 127.0.0.1 -p $PORT" 2>/dev/null; sleep 1
    if curl -s -o /dev/null "http://127.0.0.1:$PORT/"; then echo "ABBRUCH: Port $PORT ist von einem fremden Server belegt"; exit 4; fi
    cd "$DIR" && (nohup npx next start -H 127.0.0.1 -p "$PORT" > "$SCRATCH/server-$SHA-$PORT.log" 2>&1 &)
    for i in $(seq 1 60); do grep -q EADDRINUSE "$SCRATCH/server-$SHA-$PORT.log" 2>/dev/null && { echo "ABBRUCH: EADDRINUSE auf $PORT"; exit 4; }
      if curl -s -o /dev/null "http://127.0.0.1:$PORT/"; then
        for p in $(pgrep -f next-server); do [ "$(readlink "/proc/$p/cwd")" = "$DIR" ] && { echo "läuft: $SHA auf $PORT"; exit 0; }; done
        echo "ABBRUCH: Port $PORT antwortet, aber kein next-server aus $DIR"; exit 4
      fi; sleep 1; done
    echo "Start fehlgeschlagen"; exit 1;;
  *) echo "start <commit> | stop";;
esac
