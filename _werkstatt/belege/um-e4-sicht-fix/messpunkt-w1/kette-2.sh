#!/bin/bash
# Messpunkt Teil 2: Lighthouse allein im Wechsel (mobil V N, je 3 gezählte Läufe, zwölf Hauptansichten), dann Reaktion V N. Server 4324 = vorher, 4325 = nachher laufen.
S=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad
Z=$S/sfix/pruef-w1
export PATH=$S/node-lts/aktuell/bin:$PATH RELAUNCH_SCRATCH=$S SCRATCH=$S PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome
cd /home/user/tezgel/_werkstatt/werkzeuge
while pgrep -f kontingent.mjs > /dev/null; do sleep 10; done
mkdir -p $Z/lh
for LAUF in v1:4324:mobil n1:4325:mobil; do
  K=${LAUF%%:*}; R=${LAUF#*:}; P=${R%%:*}; F=${R#*:}
  echo "--- lh $K port $P $F $(date +%T) last $(cut -d' ' -f1 /proc/loadavg)"
  RELAUNCH_BELEGE=$Z/lh timeout 3000 node lighthouse.mjs --satz sfix-w1-$K --hauptansichten --laeufe 3 --formen $F --base http://127.0.0.1:$P > $Z/lh-$K.out 2>&1; echo "lighthouse $K exit $?"; tail -16 $Z/lh-$K.out
done
echo "=== REAKTION (INP) $(date +%T)"
for LAUF in v:4324 n:4325; do K=${LAUF%%:*}; P=${LAUF#*:}
  timeout 1800 node reaktion.mjs --satz sfix-w1-reaktion-$K --hauptansichten --laeufe 3 --base http://127.0.0.1:$P --ziel $Z/reaktion-$K > $Z/reaktion-$K.out 2>&1; echo "reaktion $K exit $?"; tail -16 $Z/reaktion-$K.out
done
echo "=== ENDE $(date +%T)"
