#!/bin/bash
# Nachmessung Reaktion (E-112): 4 Seiten, 7 Läufe je Handlung, im Wechsel V N V N, allein auf dem Rechner.
export PATH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/node-lts/aktuell/bin:$PATH RELAUNCH_SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome
cd /home/user/tezgel/_werkstatt/werkzeuge
for LAUF in v1:4325 n1:4324 v2:4325 n2:4324; do K=${LAUF%%:*}; P=${LAUF#*:}
  echo "--- $K $P $(date +%T) last $(cut -d' ' -f1 /proc/loadavg)"
  timeout 2400 node reaktion.mjs --satz sfix-w2-reaktion7-$K --seiten /referenzen,/kontakt,/standorte/wetzlar,/bad/badsanierung --laeufe 7 --base http://127.0.0.1:$P --ziel /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/sfix/pruef-w2/reaktion7-$K > /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/sfix/pruef-w2/reaktion7-$K.out 2>&1; echo "exit $?"; tail -8 /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/sfix/pruef-w2/reaktion7-$K.out
done
echo "=== ENDE $(date +%T)"
