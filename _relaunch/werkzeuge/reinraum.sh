#!/usr/bin/env bash
# Reinraum-Build: baut einen Commit aus einer frischen git-archive-Kopie (nur getrackte Dateien),
# genau wie Vercel ihn sieht. Nutzung: reinraum.sh <commit> [logverzeichnis]
# Kandidat (E-015): KANDIDAT="/ bad" reinraum.sh <commit> – wendet freischalten.sh auf die Kopie an (Verzeichnis-Suffix -k).
set -uo pipefail
REPO="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
REF="${1:-HEAD}"
SHA="$(git -C "$REPO" rev-parse --short "$REF")${KANDIDAT:+-k}"
SCRATCH="${RELAUNCH_SCRATCH:-/tmp/claude-0/-home-user-tezgel/f51f963a-66a5-5b8c-a0c5-6b569a6ff96b/scratchpad}"
DIR="$SCRATCH/reinraum-$SHA"
LOG="$(realpath -m "${2:-$REPO/_relaunch/cache/reinraum-$SHA}")"
mkdir -p "$LOG"
rm -rf "$DIR" && mkdir -p "$DIR"
git -C "$REPO" archive "$REF" | tar -x -C "$DIR"
if [ -n "${KANDIDAT:-}" ]; then bash "$REPO/_relaunch/werkzeuge/freischalten.sh" "$DIR" $KANDIDAT || { echo "Freischalten fehlgeschlagen"; exit 2; }; fi
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
# Tracing darf _relaunch nie enthalten
if grep -rl "_relaunch" .next/server --include='*.nft.json' > "$LOG/nft-relaunch.txt" 2>/dev/null && [ -s "$LOG/nft-relaunch.txt" ]; then echo "nft: _relaunch GEFUNDEN"; else echo "nft: sauber"; fi
{ echo "commit $SHA"; for k in npm-ci build typecheck lint test qa-graph; do echo "$k ${RES[$k]}"; done; } > "$LOG/ergebnis.txt"
cat "$LOG/ergebnis.txt"
