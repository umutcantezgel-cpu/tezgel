#!/bin/bash
# Nachmessung Lighthouse mobil (1.11., Orchestrator): Runde n1 der Kette lief mit Benchmark-Referenz 1641 (v1 1914, n2 1961,
# v2 2042), also 15 bis 20 % unter den übrigen Runden. /bad/badsanierung lag nachher im Median aus 6 Läufen bei TBT 209 ms
# (ohne n1: 174 ms). Vor einer Rücknahme nach dem Rückweg je Ansicht (TBT über 200 ms) misst diese Kette /bad, /bad/badsanierung
# und /kontakt mit vier weiteren Runden zu je 3 Läufen im Wechsel V N N V, allein auf dem Rechner.
S=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad
Z=$S/sfix2/pruef
export PATH=$S/node-lts/aktuell/bin:$PATH RELAUNCH_SCRATCH=$S SCRATCH=$S PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome
cd /home/user/tezgel/_werkstatt/werkzeuge
for P in 4324 4325; do curl -s -o /dev/null -w "$P %{http_code}\n" http://127.0.0.1:$P/ || exit 1; done
echo "=== LH-NACH /bad, /bad/badsanierung, /kontakt $(date +%T) last $(cut -d' ' -f1 /proc/loadavg)"
for LAUF in v3:4324 n3:4325 n4:4325 v4:4324; do K=${LAUF%%:*}; P=${LAUF#*:}
  echo "--- lh $K port $P $(date +%T) last $(cut -d' ' -f1 /proc/loadavg)"
  RELAUNCH_BELEGE=$Z/lh timeout 1800 node lighthouse.mjs --satz sfix2-$K --seiten /bad,/bad/badsanierung,/kontakt --laeufe 3 --formen mobil --base http://127.0.0.1:$P > $Z/lh-$K.out 2>&1; echo "lighthouse $K exit $?"; tail -8 $Z/lh-$K.out | grep -E "mobil:|Benchmark"
done
echo "=== ENDE $(date +%T)"
