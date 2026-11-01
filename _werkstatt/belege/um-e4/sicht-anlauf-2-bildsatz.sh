#!/bin/bash
# Bildsatz für UM-E4-SICHT Anlauf 2 (E-104 Nr. 8): PNG ruhig in allen Größen, Bildfolgen mit Bewegung m390/d1440,
# Erstbesuch (Eingang 0 bis 1500 ms) für alle zwölf Hauptansichten, B-01 in Einzelbildern (0 bis 2400 ms), Cursor-Zustände. Aufruf: bildsatz.sh <sha> (Bau läuft auf 4325).
SHA=$1; [ -z "$SHA" ] && { echo "Aufruf: bildsatz.sh <sha>"; exit 2; }
S=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad
Z=$S/sfix/sicht2
BASE=http://127.0.0.1:${PORT:-4325}
export PATH=$S/node-lts/aktuell/bin:$PATH RELAUNCH_SCRATCH=$S SCRATCH=$S PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome SICHT_BASE=$BASE
SEITEN="/ /bad /bad/badsanierung /bad/barrierefreies-bad /leistungen /fliesen /balkon-terrasse /referenzen /ueber-uns /kontakt /standorte/wetzlar /blog"
curl -s -o /dev/null -w "$BASE %{http_code}\n" $BASE/ || exit 1
FREI=$(df --output=avail -k / | tail -1); [ "$FREI" -lt 5000000 ] && { echo "ABBRUCH: nur $((FREI/1024)) MB frei"; exit 3; }
cd /home/user/tezgel/_werkstatt/werkzeuge
echo "=== BILDSATZ ruhig PNG $SHA $(date +%T)"; timeout 3600 node bildsatz.mjs --satz um-e4-sicht-2 --hauptansichten --geraete alle --base $BASE --ziel $Z/bildsatz --png 2>&1 | tail -6
echo "=== BEWEGT m390,d1440 $(date +%T)"; for SEITE in $SEITEN; do timeout 400 node $S/fix/sicht2/bewegt.mjs $BASE $Z/bewegt/$(echo $SEITE | tr '/' '_') m390,d1440 $SEITE 2>&1 | tail -1; done
echo "=== ERSTBESUCH alle $(date +%T)"; for SEITE in $SEITEN; do timeout 300 node $S/fix/sicht2/sicht.mjs $Z/erstbesuch/$(echo $SEITE | tr '/' '_') eingang m390,d1440 $SEITE 2>&1 | tail -1; done
echo "=== B-01 $(date +%T)"; for G in d1440 m390; do timeout 300 node $S/fix/sicht2/b01-bilder.mjs $BASE $G $Z/b01/$G 2>&1 | tail -1; done
echo "=== ENDE $(date +%T)"; du -sh $Z
