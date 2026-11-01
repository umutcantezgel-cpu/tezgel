#!/bin/bash
S=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad; Z=$S/sfix2/pruef
grep -q "^=== ENDE" $Z/kette-rest.log || { echo "kette-rest nicht fertig"; exit 4; }
echo "=== kette-rest beendet $(date +%T)"
bash $Z/lh-nach.sh
export PATH=$S/node-lts/aktuell/bin:$PATH PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome RELAUNCH_SCRATCH=$S
cd /home/user/tezgel/_werkstatt/werkzeuge
echo "=== CLS-PROBE desktop nachher 4325 $(date +%T)"; timeout 1500 node $S/cls/cls-probe.mjs http://127.0.0.1:4325 $S/cls/probe-n-desktop.json /ueber-uns,/fliesen,/bad/badsanierung,/blog 10 desktop 2>&1 | tail -25
echo "=== CLS-PROBE mobil nachher 4325 $(date +%T)"; timeout 1500 node $S/cls/cls-probe.mjs http://127.0.0.1:4325 $S/cls/probe-n-mobil.json /bad/barrierefreies-bad,/leistungen,/ 8 mobil 2>&1 | tail -15
echo "=== ENDE danach $(date +%T)"
