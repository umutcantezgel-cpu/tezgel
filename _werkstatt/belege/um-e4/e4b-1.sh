#!/bin/bash
# UM-E4-B Ergänzung zur Prüfkette von UM-E4-LEISTUNG (gleicher Stand, 4325 = e222f6d3 = Endstand E4 vor der Sicht):
# Werte der Etappe (seit Tor E3, 552a9f53), SVG der Hauptansichten, Bildrate aller Hauptansichten (m390, 4× CPU),
# Bildsatz vier Größen und mehr (PNG, ruhig) als Grundlage der Sicht, Bildfolgen mit Bewegung m390 und d1440, Erstbesuch.
SHA=e222f6d3
S=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad
Z=$S/e4b
BASE=http://127.0.0.1:4325
export PATH=$S/node-lts/aktuell/bin:$PATH RELAUNCH_SCRATCH=$S SCRATCH=$S PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome SICHT_BASE=$BASE
SEITEN="/ /bad /bad/badsanierung /bad/barrierefreies-bad /leistungen /fliesen /balkon-terrasse /referenzen /ueber-uns /kontakt /standorte/wetzlar /blog"
KOMMA=$(echo $SEITEN | tr ' ' ',')
cd /home/user/tezgel
[ "$(git rev-parse --short=8 HEAD)" = "$SHA" ] || echo "Hinweis: HEAD $(git rev-parse --short=8 HEAD), geprüft wird der Bau $SHA auf 4325"
curl -s -o /dev/null -w "4325 %{http_code}\n" $BASE/ || exit 1
FREI=$(df --output=avail -k / | tail -1); [ "$FREI" -lt 5000000 ] && { echo "ABBRUCH: nur $((FREI/1024)) MB frei"; exit 3; }
cd _werkstatt/werkzeuge
echo "=== WERTE Etappe seit 552a9f53 $(date +%T)"; node werte.mjs --basis 552a9f53 --ziel $Z/werte 2>&1 | tail -4
echo "=== SVG $(date +%T)"; timeout 900 node svg.mjs --seiten $KOMMA --base $BASE --ziel $Z/svg 2>&1 | tail -6
while pgrep -f kontingent.mjs > /dev/null; do sleep 10; done
echo "=== BILDRATE alle Hauptansichten $(date +%T)"; for SEITE in $SEITEN; do printf "%s " "$SEITE"; node bewegung.mjs --modus bildrate --seite $SEITE --base $BASE --ziel $Z/bildrate/$(echo $SEITE | tr '/' '_') 2>&1 | python3 -c "import json,sys; d=json.loads(sys.stdin.read()); print({k:d.get(k) for k in ('anteil_verworfen_prozent','loaf_anzahl','loaf_summe_ms')})" 2>&1 | tail -1; done
echo "=== ENDE TEIL 1 $(date +%T)"
