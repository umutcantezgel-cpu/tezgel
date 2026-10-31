#!/bin/bash
# Rest des Messpunkts Welle 1 nach dem Neustart: WERTE (richtiger Aufruf) und PIXEL; danach kette-2 (Lighthouse, Reaktion) allein.
S=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad
Z=$S/sfix/pruef-w1
export PATH=$S/node-lts/aktuell/bin:$PATH RELAUNCH_SCRATCH=$S SCRATCH=$S PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome
cd /home/user/tezgel
echo "=== WERTE $(date +%T)"; node _werkstatt/werkzeuge/werte.mjs --basis 4d2d3fef --ziel $Z/werte 2>&1 | tail -6
cd _werkstatt/werkzeuge
echo "=== PIXEL $(date +%T)"; node pixelvergleich.mjs --vorher http://127.0.0.1:4324 --nachher http://127.0.0.1:4325 --satz sfix-w1 --hauptansichten --ziel $Z/pixel 2>&1 | grep -E "Paare:|  [0-9]+\." | head -20
echo "=== KETTE-2 $(date +%T)"; bash $S/sfix/pruef-w1/kette-2.sh 2>&1
echo "=== ENDE $(date +%T)"
