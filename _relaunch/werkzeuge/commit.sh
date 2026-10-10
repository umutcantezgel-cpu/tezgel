#!/usr/bin/env bash
# Commit-Routine des Orchestrators: nur ausdrücklich genannte DATEIEN (keine Verzeichnisse), nie CLAUDE.md, Attributionszeilen.
# Nutzung: commit.sh "<Betreff>" "<Text>" datei1 [datei2 ...]
# Pflicht: PAKET=_relaunch/pakete/<Kennung>.md (jede Datei muss zu einem Muster der Zeile „Schreibrechte:“ passen) oder ORCHESTRATOR=1 für Orchestrator-Dateien.
set -euo pipefail
cd "$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
SUBJ="$1"; BODY="$2"; shift 2
[ "$#" -gt 0 ] || { echo "keine Pfade"; exit 2; }
for p in "$@"; do
  if [ -d "$p" ]; then echo "ABBRUCH: Verzeichnis statt Datei: $p (Dateien einzeln nennen)"; exit 5; fi
  if [ ! -e "$p" ] && ! git ls-files --error-unmatch -- "$p" >/dev/null 2>&1; then echo "ABBRUCH: unbekannter Pfad: $p"; exit 6; fi
done
[ -n "${PAKET:-}" ] || [ "${ORCHESTRATOR:-}" = 1 ] || { echo "ABBRUCH: PAKET=<Auftrag.md> (Unteragenten-Paket) oder ORCHESTRATOR=1 angeben"; exit 9; }
if [ -n "${PAKET:-}" ]; then
  muster=$(grep -m1 'Schreibrechte:' "$PAKET" | sed 's/.*Schreibrechte://; s/· Kriterium.*//; s/· Umfang.*//' | grep -o '`[^`]*`' | tr -d '`' || true)
  [ -n "$muster" ] || { echo "ABBRUCH: keine Schreibrechte in $PAKET"; exit 7; }
  for p in "$@"; do
    ok=0; while IFS= read -r m; do [ -n "$m" ] || continue; case "$p" in $m) ok=1;; esac; done <<< "$muster"
    [ $ok = 1 ] || { echo "ABBRUCH: $p liegt außerhalb der Schreibrechte von $PAKET"; exit 8; }
  done
fi
git add -A -- "$@"
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
