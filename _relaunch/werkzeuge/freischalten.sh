#!/usr/bin/env bash
# Freischaltung (E-015): ruhende Entwürfe einer oder mehrerer Routen live schalten.
# Nutzung: freischalten.sh <repo-wurzel> <route> [<route> ...]   (Route „/“ oder z. B. „bad“, „leistungen/[id]“)
# Je Route: alle Dateien und privaten Ordner (_…) aus src/app/(kern)/_entwurf/<route>/ nach src/app/(kern)/<route>/ verschieben;
# in src/app/(bestand)/<route>/ alle Dateien und privaten Ordner entfernen (Unterrouten bleiben). Dasselbe Skript baut den Kandidaten.
set -euo pipefail
W="$1"; shift
A="$W/src/app"
for r in "$@"; do
  rel="${r#/}"; [ "$r" = "/" ] && rel=""
  von="$A/(kern)/_entwurf/$rel"; nach="$A/(kern)/$rel"; alt="$A/(bestand)/$rel"
  [ -f "$von/page.tsx" ] || [ -f "$von/page.jsx" ] || { echo "kein Entwurf für $r ($von)"; exit 3; }
  mkdir -p "$nach"
  find "$von" -mindepth 1 -maxdepth 1 \( -type f -o -type d -name '_*' \) -print0 | while IFS= read -r -d '' e; do
    [ "$rel" = "" ] && [ "$(basename "$e")" = "_entwurf" ] && continue
    mv "$e" "$nach/"; done
  if [ -d "$alt" ]; then
    find "$alt" -mindepth 1 -maxdepth 1 \( -type f -o -type d -name '_*' \) -print0 | while IFS= read -r -d '' e; do
      [ "$rel" = "" ] && case "$(basename "$e")" in layout.tsx|not-found.tsx|_dokument.tsx) continue;; esac
      rm -rf "$e"; done
    rmdir "$alt" 2>/dev/null || true
  fi
  rmdir "$von" 2>/dev/null || true
  echo "freigeschaltet: $r"
done
