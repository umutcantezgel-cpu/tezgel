#!/bin/bash
# Prüfkette UM-E4-LEISTUNG (e222f6d3) gegen 9c98aa9a (Quelltext gleich 2b5c5140 bis f7ce5c67). Vorher auf 4324, nachher auf 4325.
# Zeitkritische Teile auf ruhigem Rechner; am Ende Lighthouse allein und im Wechsel (mobil V N N V zu je 3 gezählten Läufen,
# Desktop V N), danach reaktion.mjs (INP) im Wechsel V N.
SHA=e222f6d3
VOR=9c98aa9a
S=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad
Z=$S/leist4/pruef-haupt
export PATH=$S/node-lts/aktuell/bin:$PATH RELAUNCH_SCRATCH=$S SCRATCH=$S PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome
SEITEN="/ /bad /bad/badsanierung /bad/barrierefreies-bad /leistungen /fliesen /balkon-terrasse /referenzen /ueber-uns /kontakt /standorte/wetzlar /blog /preise"
ZUSATZ="/preise,/bad/projekt-check,/termin,/blog/barrierefreier-balkonaustritt,/blog/handwerkerbonus-fliesenarbeiten,/blog/fliesenleger-gesucht-geselle-meister,/standorte/giessen"
cd /home/user/tezgel
FREI=$(df --output=avail -k / | tail -1); [ "$FREI" -lt 6000000 ] && { echo "ABBRUCH: nur $((FREI/1024)) MB frei"; exit 3; }
echo "=== REINRAUM $(date +%T)"; bash _werkstatt/werkzeuge/reinraum.sh $SHA $Z/reinraum-log > $Z/reinraum.out 2>&1; echo "exit $?"; tail -3 $Z/reinraum.out
grep -h "ℹ \(tests\|pass\|fail\|skipped\)" $Z/reinraum-log/* 2>/dev/null | tail -4
for P in 4324 4325; do PORT=$P timeout 60 bash _werkstatt/werkzeuge/server.sh stop > /dev/null 2>&1; done
PORT=4324 REINRAUM_DIR=$S/reinraum-$VOR timeout 150 bash _werkstatt/werkzeuge/server.sh start $VOR | tail -1
PORT=4325 REINRAUM_DIR=$S/reinraum-$SHA timeout 150 bash _werkstatt/werkzeuge/server.sh start $SHA | tail -1
for P in 4324 4325; do curl -s -o /dev/null -w "$P %{http_code}\n" http://127.0.0.1:$P/ || exit 1; done
for U in $(echo $ZUSATZ | tr ',' ' '); do curl -s -o /dev/null -w "$U %{http_code}\n" http://127.0.0.1:4325$U; done
echo "=== STYLESHEETS im ausgelieferten HTML $(date +%T)"
for P in 4324 4325; do for U in $SEITEN /blog/fliesenleger-gesucht-geselle-meister; do printf "%s %s css=%s fontface=%s\n" $P $U "$(curl -s http://127.0.0.1:$P$U | grep -o '<link rel="stylesheet"[^>]*>' | wc -l)" "$(curl -s http://127.0.0.1:$P$U | grep -o '@font-face{font-family:[a-zA-Z]*' | wc -l)"; done; done
cd _werkstatt/werkzeuge
echo "=== G8 $(date +%T)"; timeout 300 node $S/fix/pruef/fuss-g8.mjs http://127.0.0.1:4324 http://127.0.0.1:4325 $Z/g8.json 2>&1 | tail -6; echo "g8 exit ${PIPESTATUS[0]}"
while pgrep -f kontingent.mjs > /dev/null; do sleep 10; done
echo "=== SUITE reduziert $(date +%T) last $(cut -d' ' -f1 /proc/loadavg)"; RELAUNCH_BASE=http://127.0.0.1:4325 RELAUNCH_REPORT=$Z/suite.json RELAUNCH_OUTPUT=$Z/suite-out npx playwright test 2>&1 | tail -5
echo "=== SUITE Bewegung an $(date +%T) last $(cut -d' ' -f1 /proc/loadavg)"; RELAUNCH_BEWEGUNG=an RELAUNCH_BASE=http://127.0.0.1:4325 RELAUNCH_REPORT=$Z/suite-bewegung.json RELAUNCH_OUTPUT=$Z/suite-b-out npx playwright test 2>&1 | tail -5
echo "=== BILDRATE im Wechsel $(date +%T)"
for R in 1 2; do for P in 4324 4325; do printf "%s %s " "$R" "$P"; node bewegung.mjs --modus bildrate --seite / --base http://127.0.0.1:$P --ziel $Z/bildrate-$R-$P 2>&1 | python3 -c "import json,sys; d=json.loads(sys.stdin.read()); print({k:d.get(k) for k in ('anteil_verworfen_prozent','loaf_anzahl','loaf_summe_ms')})" 2>&1 | tail -1; done; done
echo "=== AXE $(date +%T)"; RELAUNCH_BASE=http://127.0.0.1:4325 node axe.mjs --satz leist4 --hauptansichten --zustaende --ziel $Z/axe > $Z/axe.out 2>&1; tail -c 300 $Z/axe.out; echo
echo "=== AXE Zusatz $(date +%T)"; RELAUNCH_BASE=http://127.0.0.1:4325 node axe.mjs --satz leist4-zusatz --seiten $ZUSATZ --zustaende --ziel $Z/axe-zusatz > $Z/axe-zusatz.out 2>&1; tail -c 300 $Z/axe-zusatz.out; echo
echo "=== RUHIG/REDUZIERT $(date +%T)"; for SEITE in $SEITEN; do for M in ruhig reduziert; do X=""; [ $M = ruhig ] && X="--schalter ruhig"; node bewegung.mjs --modus reduziert $X --seite $SEITE --base http://127.0.0.1:4325 --ziel $Z/$M/$(echo $SEITE | tr '/' '_') 2>&1 | python3 -c "import json,sys; d=json.loads(sys.stdin.read()); print('$M $SEITE befunde', len(d.get('bewegungsbefunde',[])), 'unsichtbar', len(d.get('unsichtbar',[])))" 2>&1 | tail -1; done; done
echo "=== REGISTER $(date +%T)"; for A in d1440 m390; do for SEITE in $SEITEN; do node bewegung.mjs --modus register --seite $SEITE --base http://127.0.0.1:4325 --ansicht $A --ziel $Z/register-$A/$(echo $SEITE | tr '/' '_') 2>&1 | python3 -c "import json,sys; d=json.loads(sys.stdin.read()); print('$A $SEITE', {k:(v if not isinstance(v,list) else len(v)) for k,v in d.items() if k in ('unbekannt','gefundene_kennungen','ohne_register_anzahl')})" 2>&1 | tail -1; done; done
echo "=== JSONLD $(date +%T)"; RELAUNCH_BASE=http://127.0.0.1:4325 node jsonld.mjs --seiten "$(cat $S/inhalt/skript-b/service-113.txt)" --ziel $Z/jsonld 2>&1 | tail -1; node $S/inhalt/skript-b/zaehle-service.mjs http://127.0.0.1:4325 $Z/jsonld/jsonld.json $S/inhalt/skript-b/service-113.txt 2>&1 | tail -4
echo "=== JSONLD Zusatz $(date +%T)"; RELAUNCH_BASE=http://127.0.0.1:4325 node jsonld.mjs --seiten "$ZUSATZ" --ziel $Z/jsonld-zusatz 2>&1 | tail -2
echo "=== LESBARKEIT $(date +%T)"; RELAUNCH_BASE=http://127.0.0.1:4325 timeout 900 node lesbarkeit.mjs --satz leist4 --hauptansichten --ziel $Z/lesbarkeit 2>&1 | tail -4
echo "=== PIXEL $(date +%T)"; node pixelvergleich.mjs --vorher http://127.0.0.1:4324 --nachher http://127.0.0.1:4325 --satz leist4 --hauptansichten --ziel $Z/pixel 2>&1 | grep -E "Paare:|  [0-9]+\." | head -20
echo "=== PIXEL Zusatz $(date +%T)"; node pixelvergleich.mjs --vorher http://127.0.0.1:4324 --nachher http://127.0.0.1:4325 --satz leist4-zusatz --seiten $ZUSATZ --ziel $Z/pixel-zusatz 2>&1 | grep -E "Paare:|  [0-9]+\." | head -20
while pgrep -f kontingent.mjs > /dev/null; do sleep 10; done
echo "=== LIGHTHOUSE im Wechsel, allein $(date +%T) last $(cut -d' ' -f1 /proc/loadavg)"
mkdir -p $Z/lh
for LAUF in v1:4324:mobil n1:4325:mobil n2:4325:mobil v2:4324:mobil dv:4324:desktop dn:4325:desktop; do
  K=${LAUF%%:*}; R=${LAUF#*:}; P=${R%%:*}; F=${R#*:}
  echo "--- lh $K port $P $F $(date +%T) last $(cut -d' ' -f1 /proc/loadavg)"
  RELAUNCH_BELEGE=$Z/lh timeout 3600 node lighthouse.mjs --satz leist4-$K --hauptansichten --laeufe 3 --formen $F --base http://127.0.0.1:$P > $Z/lh-$K.out 2>&1; echo "lighthouse $K exit $?"; tail -16 $Z/lh-$K.out
done
echo "=== REAKTION (INP) im Wechsel $(date +%T)"
for LAUF in v:4324 n:4325; do K=${LAUF%%:*}; P=${LAUF#*:}
  timeout 2400 node reaktion.mjs --satz leist4-reaktion-$K --hauptansichten --laeufe 3 --base http://127.0.0.1:$P --ziel $Z/reaktion-$K > $Z/reaktion-$K.out 2>&1; echo "reaktion $K exit $?"; tail -16 $Z/reaktion-$K.out
done
echo "=== ENDE $(date +%T)"
