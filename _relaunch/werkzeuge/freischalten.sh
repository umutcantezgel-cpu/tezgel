#!/usr/bin/env bash
# Freischaltung (E-015, Plan Runde 3): ruhende Entwürfe einer oder mehrerer Routen live schalten.
# Nutzung:
#   freischalten.sh <wurzel> <route> [<route> ...]          – auf eine Kopie anwenden (Kandidat, reinraum.sh KANDIDAT=…)
#   KANDIDAT_BASIS=<sha> freischalten.sh --commit <route> …  – im Repo: nur bei sauberem Baum und HEAD = Kandidat-Basis;
#        git mv/git rm, eigener Commit, danach Pflichtvergleich git archive HEAD ↔ Kandidat-Kopie (reinraum-<basis>-k).
# Route: „/“ oder z. B. „bad“, „leistungen/[id]“.
# Je Route: Dateien und private Ordner (_…) aus src/app/(kern)/_entwurf/<route>/ nach src/app/(kern)/<route>/;
# im Bestand src/app/(bestand)/<route>/: Dateien und private Ordner entfernen – Segment-Dateien (layout, template,
# not-found, error, loading) nur, wenn darunter keine Bestands-page.* mehr liegt (N-08). Unterrouten bleiben.
set -euo pipefail
MODUS=kopie
if [ "${1:-}" = "--commit" ]; then
  MODUS=commit; shift
  W="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
  [ -n "${KANDIDAT_BASIS:-}" ] || { echo "ABBRUCH: KANDIDAT_BASIS fehlt"; exit 2; }
  [ "$(git -C "$W" rev-parse --short HEAD)" = "$(git -C "$W" rev-parse --short "$KANDIDAT_BASIS")" ] || { echo "ABBRUCH: HEAD ≠ Kandidat-Basis $KANDIDAT_BASIS"; exit 2; }
  if git -C "$W" status --porcelain | grep -v ' CLAUDE.md$' | grep -q .; then echo "ABBRUCH: Arbeitsbaum nicht sauber"; git -C "$W" status --porcelain; exit 2; fi
else
  W="$1"; shift
fi
A="$W/src/app"
SEGMENT='^(layout|template|not-found|error|loading)\.(tsx|jsx|ts|js)$'

verschiebe() { if [ $MODUS = commit ]; then git -C "$W" mv "$1" "$2"; else mv "$1" "$2"; fi; }
entferne() { if [ $MODUS = commit ]; then git -C "$W" rm -r -q "$1"; else rm -rf "$1"; fi; }
hat_bestandsseiten_darunter() { find "$1" -mindepth 2 -name 'page.*' -print -quit | grep -q .; }

for r in "$@"; do
  rel="${r#/}"; [ "$r" = "/" ] && rel=""
  von="$A/(kern)/_entwurf/$rel"; nach="$A/(kern)/$rel"; alt="$A/(bestand)/$rel"
  [ -f "$von/page.tsx" ] || [ -f "$von/page.jsx" ] || { echo "kein Entwurf für $r ($von)"; exit 3; }
  mkdir -p "$nach"
  while IFS= read -r -d '' e; do
    [ "$rel" = "" ] && [ "$(basename "$e")" = "_entwurf" ] && continue
    verschiebe "$e" "$nach/"
  done < <(find "$von" -mindepth 1 -maxdepth 1 \( -type f -o -type d -name '_*' \) -print0)
  if [ -d "$alt" ]; then
    while IFS= read -r -d '' e; do
      b="$(basename "$e")"
      if [ "$rel" = "" ]; then case "$b" in layout.tsx|not-found.tsx|_dokument.tsx) continue;; esac; fi
      if [[ "$b" =~ $SEGMENT ]] && hat_bestandsseiten_darunter "$alt"; then echo "  behalten (Unterrouten im Bestand): $rel/$b"; continue; fi
      entferne "$e"
    done < <(find "$alt" -mindepth 1 -maxdepth 1 \( -type f -o -type d -name '_*' \) -print0)
    rmdir "$alt" 2>/dev/null || true
  fi
  rmdir "$von" 2>/dev/null || true
  echo "freigeschaltet: $r"
done

if [ $MODUS = commit ]; then
  git -C "$W" commit -q -F - <<MSG
relaunch(freischaltung): $*

Freischaltung nach Kandidat-Tor (Basis $KANDIDAT_BASIS): ruhende Entwürfe live, Bestandsseiten entfernt (E-015).

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01R5GwnzadLaqH6WWL74KkLx
MSG
  K="${RELAUNCH_SCRATCH:-/tmp/claude-0/-home-user-tezgel/f51f963a-66a5-5b8c-a0c5-6b569a6ff96b/scratchpad}/reinraum-$(git -C "$W" rev-parse --short "$KANDIDAT_BASIS")-k"
  [ -d "$K" ] || { echo "ROT: Kandidat-Kopie $K fehlt – nicht pushen (Rückweg: git revert --no-edit HEAD, lokal)"; exit 4; }
  { grep -qx "routen: $*" "$K/.kandidat-stempel" && grep -qx "art: k" "$K/.kandidat-stempel"; } 2>/dev/null || { echo "ROT: Stempel der Kandidat-Kopie passt nicht zu den Routen ($*) – nicht pushen (Rückweg: git revert --no-edit HEAD)"; exit 4; }
  T="$(mktemp -d)"; git -C "$W" archive HEAD | tar -x -C "$T"
  if diff -rq -x node_modules -x .next -x '*.log' -x 'next-env.d.ts' -x '*.tsbuildinfo' -x '.kandidat-stempel' "$T" "$K" > "$T.diff"; then
    echo "GLEICH: Freischalt-Commit = geprüfter Kandidat"; rm -rf "$T" "$T.diff"
  else
    echo "ROT: Freischalt-Commit weicht vom Kandidaten ab – nicht pushen (Rückweg: git revert --no-edit HEAD, lokal)"; cat "$T.diff"; exit 5
  fi
fi
