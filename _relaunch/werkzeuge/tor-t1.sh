#!/usr/bin/env bash
# Wellen-Tor T1 (Plan Runde 3, P2-GEG-03 H-1): Einstufung über die geänderten Dateien seit dem letzten Live-Commit.
# Nutzung: tor-t1.sh <live-commit>
#   Exit 0  = Push erlaubt (nur Arbeitsordner, oder src-Änderungen nachweislich ruhend: strenger build-vergleich gleich)
#   Exit 10 = nicht ruhend → T2 (Kandidat-Tor) für alle Seiten mit Abweichung, sonst kein Push
#   Exit 1  = Reinraum/Prüfung rot
set -uo pipefail
REPO="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"; W="$REPO/_relaunch/werkzeuge"
LIVE="$(git -C "$REPO" rev-parse --short "$1")"; KOPF="$(git -C "$REPO" rev-parse --short HEAD)"
SCRATCH="${RELAUNCH_SCRATCH:-/tmp/claude-0/-home-user-tezgel/f51f963a-66a5-5b8c-a0c5-6b569a6ff96b/scratchpad}"
geaendert="$(git -C "$REPO" diff --name-only "$LIVE" HEAD)"
produkt="$(echo "$geaendert" | grep -v '^_relaunch/' | grep -v '^$' || true)"
echo "T1 · live $LIVE → $KOPF · geänderte Dateien: $(echo "$geaendert" | grep -c .) · davon außerhalb _relaunch: $(echo "$produkt" | grep -c . || true)"
node "$W/testzahl.mjs" || { echo "T1 ROT: Test-Sperrklinke"; exit 1; }
if [ -z "$produkt" ]; then echo "T1 GRÜN: nur Arbeitsordner (wird nicht ausgeliefert)"; exit 0; fi
bash "$W/reinraum.sh" HEAD > "$SCRATCH/t1-$KOPF.log" 2>&1; tail -8 "$SCRATCH/t1-$KOPF.log"
grep -qE '^(build|typecheck|lint|test|qa-graph) 0 ' "$REPO/_relaunch/cache/reinraum-$KOPF/ergebnis.txt" || true
for k in npm-ci build typecheck lint test qa-graph; do grep -qE "^$k 0 " "$REPO/_relaunch/cache/reinraum-$KOPF/ergebnis.txt" || { echo "T1 ROT: $k"; exit 1; }; done
[ -d "$SCRATCH/reinraum-$LIVE/.next" ] || bash "$W/reinraum.sh" "$LIVE" > "$SCRATCH/t1-$LIVE.log" 2>&1
out="$(node "$W/build-vergleich.mjs" "$LIVE" "$KOPF" --streng | head -1)"; echo "$out"
echo "$out" | grep -q '"nur_vorher":0,"nur_nachher":0,"html_abweichend":0,"css_weg":0,"css_neu":0,"var_weg":0,"var_neu":0,"keyframes_weg":0,"keyframes_neu":0' \
  && { echo "T1 GRÜN: ruhend bewiesen (strenger build-vergleich gleich)"; exit 0; } \
  || { echo "T1: nicht ruhend → T2 nötig (Bericht belege/build-vergleich-$LIVE-$KOPF-streng)"; exit 10; }
