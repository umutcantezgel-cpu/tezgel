#!/bin/bash
# Volle Prüfkette nach UM-E4-SICHT-FIX-2 (E-113): vorher a3c28d36 (Torstand vor der Runde) auf PV=4324, nachher $1 (HEAD nach Stufe 1 und 2) auf PN=4325; am Ende Lighthouse V N N V (je 3 Läufe, also 6 je Stand) und Desktop sowie Reaktion (Hauptlauf und 7 Läufe V N V N) allein.
SHA=$1; VOR=a3c28d36; PV=4324; PN=4325
[ -z "$SHA" ] && { echo "Aufruf: kette.sh <sha>"; exit 2; }
S=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad
Z=$S/sfix2/pruef
export PATH=$S/node-lts/aktuell/bin:$PATH RELAUNCH_SCRATCH=$S SCRATCH=$S PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome
SEITEN="/ /bad /bad/badsanierung /bad/barrierefreies-bad /leistungen /fliesen /balkon-terrasse /referenzen /ueber-uns /kontakt /standorte/wetzlar /blog /preise"
cd /home/user/tezgel/_werkstatt/werkzeuge
echo "=== REST nach Abbruch der Hintergrundaufgabe (Zeitgrenze 2 h): Lighthouse ab n2 $(date +%T)"
mkdir -p $Z/lh
for LAUF in n2:$PN:mobil v2:$PV:mobil dv:$PV:desktop dn:$PN:desktop; do
  K=${LAUF%%:*}; R=${LAUF#*:}; P=${R%%:*}; F=${R#*:}
  echo "--- lh $K port $P $F $(date +%T) last $(cut -d' ' -f1 /proc/loadavg)"
  RELAUNCH_BELEGE=$Z/lh timeout 3600 node lighthouse.mjs --satz sfix2-$K --hauptansichten --laeufe 3 --formen $F --base http://127.0.0.1:$P > $Z/lh-$K.out 2>&1; echo "lighthouse $K exit $?"; tail -16 $Z/lh-$K.out
done
echo "=== REAKTION (INP) im Wechsel $(date +%T)"
for LAUF in v:$PV n:$PN; do K=${LAUF%%:*}; P=${LAUF#*:}
  timeout 2400 node reaktion.mjs --satz sfix2-reaktion-$K --hauptansichten --laeufe 3 --base http://127.0.0.1:$P --ziel $Z/reaktion-$K > $Z/reaktion-$K.out 2>&1; echo "reaktion $K exit $?"; tail -16 $Z/reaktion-$K.out
done
echo "=== REAKTION 7 Läufe V N V N $(date +%T)"
for LAUF in v1:$PV n1:$PN v2:$PV n2:$PN; do K=${LAUF%%:*}; P=${LAUF#*:}
  echo "--- $K $P $(date +%T) last $(cut -d' ' -f1 /proc/loadavg)"
  timeout 2400 node reaktion.mjs --satz sfix2-reaktion7-$K --seiten /referenzen,/kontakt,/standorte/wetzlar,/bad/badsanierung --laeufe 7 --base http://127.0.0.1:$P --ziel $Z/reaktion7-$K > $Z/reaktion7-$K.out 2>&1; echo "exit $?"; tail -8 $Z/reaktion7-$K.out
done
echo "=== ENDE $(date +%T)"
