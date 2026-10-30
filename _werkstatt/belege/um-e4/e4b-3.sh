#!/bin/bash
# UM-E4-B Teil 2 auf dem Endstand E4 vor der Sicht (4324 = 4d2d3fef = e222f6d3 plus UM-E4-WERTE, ohne sichtbare Änderung):
# Werte der Etappe (seit Tor E3, 552a9f53), SVG der Hauptansichten, Bildrate aller Hauptansichten (m390, 4× CPU),
# Bildsatz vier Größen und mehr (PNG, ruhig) als Grundlage der Sicht, Bildfolgen mit Bewegung m390 und d1440, Erstbesuch.
SHA=4d2d3fef
S=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad
Z=$S/e4b
BASE=http://127.0.0.1:4324
export PATH=$S/node-lts/aktuell/bin:$PATH RELAUNCH_SCRATCH=$S SCRATCH=$S PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome SICHT_BASE=$BASE
SEITEN="/ /bad /bad/badsanierung /bad/barrierefreies-bad /leistungen /fliesen /balkon-terrasse /referenzen /ueber-uns /kontakt /standorte/wetzlar /blog"
KOMMA=$(echo $SEITEN | tr ' ' ',')
cd /home/user/tezgel
[ "$(git rev-parse --short=8 HEAD)" = "$SHA" ] || echo "Hinweis: HEAD $(git rev-parse --short=8 HEAD), geprüft wird der Bau $SHA auf 4324"
curl -s -o /dev/null -w "4324 %{http_code}\n" $BASE/ || exit 1
FREI=$(df --output=avail -k / | tail -1); [ "$FREI" -lt 5000000 ] && { echo "ABBRUCH: nur $((FREI/1024)) MB frei"; exit 3; }
cd _werkstatt/werkzeuge
echo "=== BEWEGT m390,d1440 $(date +%T)"; for SEITE in $SEITEN; do timeout 400 node $S/fix/sicht2/bewegt.mjs $BASE $Z/bewegt/$(echo $SEITE | tr '/' '_') m390,d1440 $SEITE 2>&1 | tail -1; done
echo "=== ERSTBESUCH $(date +%T)"; for SEITE in / /bad /kontakt /standorte/wetzlar; do timeout 300 node $S/fix/sicht2/sicht.mjs $Z/erstbesuch/$(echo $SEITE | tr '/' '_') eingang m390,d1440 $SEITE 2>&1 | tail -1; done
echo "=== ENDE $(date +%T)"; du -sh $Z
