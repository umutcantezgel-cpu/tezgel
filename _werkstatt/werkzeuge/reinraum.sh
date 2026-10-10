#!/usr/bin/env bash
# Reinraum-Build: baut einen Commit aus einer frischen git-archive-Kopie (nur getrackte Dateien),
# genau wie Vercel ihn sieht. Nutzung: reinraum.sh <commit> [logverzeichnis]
set -uo pipefail
REPO="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
REF="${1:-HEAD}"
SHA="$(git -C "$REPO" rev-parse --short "$REF")"
SCRATCH="${RELAUNCH_SCRATCH:-/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad}"
DIR="${REINRAUM_DIR:-$SCRATCH/reinraum-$SHA}"
LOG="$(realpath -m "${2:-$REPO/_werkstatt/cache/reinraum-$SHA}")"
mkdir -p "$LOG"
rm -rf "$DIR" && mkdir -p "$DIR"
git -C "$REPO" archive "$REF" | tar -x -C "$DIR"
cd "$DIR" || exit 2
declare -A RES
run() { local name="$1"; shift; local t0=$(date +%s); "$@" > "$LOG/$name.log" 2>&1; local rc=$?; RES[$name]="$rc ($(( $(date +%s)-t0 ))s)"; echo "$name: exit $rc"; return 0; }
run npm-ci npm ci --no-audit --no-fund
run build env NEXT_TELEMETRY_DISABLED=1 npm run build
run typecheck npm run typecheck
run lint npm run lint
run test npm test
run qa-graph npm run qa:graph
# Routentabelle aus dem Build-Log extrahieren (○ static, ● SSG, ƒ dynamic)
grep -E '^[├└┌│ ]+[○●ƒ◐]' "$LOG/build.log" | sed -E 's/[[:space:]]+[0-9.]+ ?[kKmM]?B.*$//' > "$LOG/routen.txt" || true
# Tracing darf _relaunch und _werkstatt nie enthalten
if grep -rlE "_relaunch|_werkstatt" .next/server --include='*.nft.json' > "$LOG/nft-werkstatt.txt" 2>/dev/null && [ -s "$LOG/nft-werkstatt.txt" ]; then echo "nft: _relaunch/_werkstatt GEFUNDEN"; else echo "nft: sauber"; fi
{ echo "commit $SHA"; for k in npm-ci build typecheck lint test qa-graph; do echo "$k ${RES[$k]}"; done; } > "$LOG/ergebnis.txt"
cat "$LOG/ergebnis.txt"
