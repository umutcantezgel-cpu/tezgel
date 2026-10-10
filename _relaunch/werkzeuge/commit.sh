#!/usr/bin/env bash
# Commit-Routine des Orchestrators: nur ausdrücklich genannte Pfade, nie CLAUDE.md, Attributionszeilen.
# Nutzung: commit.sh "<Betreff>" "<Text>" pfad1 [pfad2 ...]
set -euo pipefail
cd "$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
SUBJ="$1"; BODY="$2"; shift 2
[ "$#" -gt 0 ] || { echo "keine Pfade"; exit 2; }
git add -- "$@"
if git diff --cached --name-only | grep -qx 'CLAUDE.md'; then
  git restore --staged CLAUDE.md; echo "ABBRUCH: CLAUDE.md war gestaged"; exit 3
fi
# keine Datei > 5 MB
big=$(git diff --cached --name-only -z | xargs -0 -I{} sh -c '[ -f "{}" ] && [ $(stat -c%s "{}") -gt 5242880 ] && echo "{}"' || true)
[ -z "$big" ] || { echo "ABBRUCH: Datei > 5 MB: $big"; exit 4; }
git diff --cached --quiet && { echo "nichts zu committen"; exit 0; }
git commit -q -F - <<MSG
$SUBJ

$BODY

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01R5GwnzadLaqH6WWL74KkLx
MSG
git log --oneline -1
