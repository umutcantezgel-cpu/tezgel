#!/bin/bash
# Rest der Prüfkette UM-E4-LEISTUNG nach Abbruch durch die Zeitgrenze (19:29 UTC): Desktop V N, dann reaktion.mjs V N.
S=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad
Z=$S/leist4/pruef-haupt
export PATH=$S/node-lts/aktuell/bin:$PATH RELAUNCH_SCRATCH=$S SCRATCH=$S PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome
cd /home/user/tezgel/_werkstatt/werkzeuge
pkill -f 'lighthouse.mjs --satz leist4-dv' 2>/dev/null
echo "=== LIGHTHOUSE Desktop, allein $(date +%T) last $(cut -d' ' -f1 /proc/loadavg)"
for LAUF in dv:4324:desktop dn:4325:desktop; do
  K=${LAUF%%:*}; R=${LAUF#*:}; P=${R%%:*}; F=${R#*:}
  echo "--- lh $K port $P $F $(date +%T) last $(cut -d' ' -f1 /proc/loadavg)"
  rm -rf $Z/lh/leist4-$K
  RELAUNCH_BELEGE=$Z/lh timeout 3000 node lighthouse.mjs --satz leist4-$K --hauptansichten --laeufe 3 --formen $F --base http://127.0.0.1:$P > $Z/lh-$K.out 2>&1; echo "lighthouse $K exit $?"; grep -E '^/|desktop:' $Z/lh-$K.out
done
echo "=== REAKTION (INP) im Wechsel $(date +%T)"
for LAUF in v:4324 n:4325; do K=${LAUF%%:*}; P=${LAUF#*:}
  timeout 1500 node reaktion.mjs --satz leist4-reaktion-$K --hauptansichten --laeufe 3 --base http://127.0.0.1:$P --ziel $Z/reaktion-$K > $Z/reaktion-$K.out 2>&1; echo "reaktion $K exit $?"; tail -20 $Z/reaktion-$K.out
done
echo "=== ENDE $(date +%T)"
