#!/bin/bash
# UM-E5-C Teil 1 (ohne Lighthouse): Prüfstufe C auf dem Endstand $1, Reinraum auf 4325. E0 des Laufs = 7ceb5e41 (Werte aller geänderten Dateien).
SHA=$1; E0=7ceb5e41
[ -z "$SHA" ] && { echo "Aufruf: e5c-1.sh <sha>"; exit 2; }
S=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad
Z=$S/e5/c
BASE=http://127.0.0.1:4325
export PATH=$S/node-lts/aktuell/bin:$PATH RELAUNCH_SCRATCH=$S SCRATCH=$S PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome SICHT_BASE=$BASE RELAUNCH_BASE=$BASE
SEITEN="/ /bad /bad/badsanierung /bad/barrierefreies-bad /leistungen /fliesen /balkon-terrasse /referenzen /ueber-uns /kontakt /standorte/wetzlar /blog"
KOMMA=$(echo $SEITEN | tr ' ' ',')
ZUSATZ="/preise,/bad/projekt-check,/termin,/blog/barrierefreier-balkonaustritt,/standorte/giessen,/standorte/asslar,/leistungen/bad,/foerderung,/bad/badanfrage"
STICHPROBE=$(python3 -c "import json;print(','.join(json.load(open('$S/e5/stichprobe.json'))['stichprobe']))")  # 11 von 109 übrigen Ansichten, Startwert 20261101
mkdir -p $Z; cd /home/user/tezgel
FREI=$(df --output=avail -k / | tail -1); [ "$FREI" -lt 5000000 ] && { echo "ABBRUCH: nur $((FREI/1024)) MB frei"; exit 3; }
echo "=== REINRAUM $SHA $(date +%T)"; bash _werkstatt/werkzeuge/reinraum.sh $SHA $Z/reinraum-log > $Z/reinraum.out 2>&1; echo "exit $?"; tail -3 $Z/reinraum.out
grep -h "ℹ \(tests\|pass\|fail\|skipped\)" $Z/reinraum-log/* 2>/dev/null | tail -4
PORT=4325 timeout 60 bash _werkstatt/werkzeuge/server.sh stop > /dev/null 2>&1
PORT=4325 REINRAUM_DIR=$S/reinraum-$SHA timeout 150 bash _werkstatt/werkzeuge/server.sh start $SHA | tail -1
curl -s -o /dev/null -w "4325 %{http_code}\n" $BASE/ || exit 1
for U in $SEITEN $(echo $ZUSATZ,$STICHPROBE | tr ',' ' '); do printf "%s %s css=%s\n" $U "$(curl -s -o /dev/null -w '%{http_code}' $BASE$U)" "$(curl -s $BASE$U | grep -o '<link rel="stylesheet"[^>]*>' | wc -l)"; done
cd _werkstatt/werkzeuge
# Bildsatz vorgezogen (1.11., Orchestrator): die Vergleichsbögen gegen den Torstand a3c28d36 gehen an die Gesamtsicht, während die übrigen Prüfungen laufen.
echo "=== BILDSATZ Endbilder PNG $(date +%T)"; timeout 3600 node bildsatz.mjs --satz um-e5-c --hauptansichten --geraete alle --base $BASE --ziel $Z/bildsatz --png 2>&1 | tail -6
echo "=== VERGLEICHSBÖGEN a3c28d36 | Endstand $(date +%T)"; mkdir -p $S/sfix2/gesamt/boegen; for G in m390 t768 d1440; do for D in $Z/bildsatz/$G/*/; do SL=$(basename $D); N=$(ls $D | wc -l); for VON in 0 4 8 12; do [ $VON -lt $N ] && python3 $S/sfix2/vergleich.py $S/sfix/sicht2/bildsatz $Z/bildsatz $G $SL $S/sfix2/gesamt/boegen/$SL-$G-$VON.png 4 560 $VON > /dev/null; done; done; done; ls $S/sfix2/gesamt/boegen | wc -l
echo "=== ADRESSEN $(date +%T)"; timeout 1800 node adressen.mjs --satz um-e5-c --ziel $Z/adressen 2>&1 | tail -6
echo "=== SUITE reduziert $(date +%T)"; RELAUNCH_REPORT=$Z/suite.json RELAUNCH_OUTPUT=$Z/suite-out npx playwright test > $Z/suite.txt 2>&1; echo "exit $?"; tail -5 $Z/suite.txt
echo "=== SUITE Bewegung an $(date +%T)"; RELAUNCH_BEWEGUNG=an RELAUNCH_REPORT=$Z/suite-bewegung.json RELAUNCH_OUTPUT=$Z/suite-b-out npx playwright test > $Z/suite-bewegung.txt 2>&1; echo "exit $?"; tail -5 $Z/suite-bewegung.txt
echo "=== LESBARKEIT $(date +%T)"; timeout 900 node lesbarkeit.mjs --satz um-e5-c --hauptansichten --ziel $Z/lesbarkeit 2>&1 | tail -4
echo "=== WERTE seit $E0 $(date +%T)"; node werte.mjs --basis $E0 --ziel $Z/werte 2>&1 | tail -4
echo "=== SVG alle $(date +%T)"; timeout 1500 node svg.mjs --seiten $KOMMA,$ZUSATZ,$STICHPROBE --base $BASE --ziel $Z/svg 2>&1 | tail -6
echo "=== SVG Dateien $(date +%T)"; node svg.mjs --dateien /home/user/tezgel/src/components/icons/svg --ziel $Z/svg-dateien-icons 2>&1 | tail -3; for D in $(find /home/user/tezgel/src/components/icons -maxdepth 1 -name "*.svg") /home/user/tezgel/public/images/logo; do node svg.mjs --dateien $D --ziel $Z/svg-dateien-$(basename $D) 2>&1 | tail -2; done
echo "=== AXE $(date +%T)"; node axe.mjs --satz um-e5-c --hauptansichten --zustaende --ziel $Z/axe > $Z/axe.out 2>&1; tail -c 300 $Z/axe.out; echo
echo "=== AXE Zusatz $(date +%T)"; node axe.mjs --satz um-e5-c-zusatz --seiten $ZUSATZ,$STICHPROBE --zustaende --ziel $Z/axe-zusatz > $Z/axe-zusatz.out 2>&1; tail -c 300 $Z/axe-zusatz.out; echo
echo "=== RUHIG/REDUZIERT $(date +%T)"; for SEITE in $SEITEN; do for M in ruhig reduziert; do X=""; [ $M = ruhig ] && X="--schalter ruhig"; node bewegung.mjs --modus reduziert $X --seite $SEITE --base $BASE --ziel $Z/$M/$(echo $SEITE | tr '/' '_') 2>&1 | python3 -c "import json,sys; d=json.loads(sys.stdin.read()); print('$M $SEITE befunde', len(d.get('bewegungsbefunde',[])), 'unsichtbar', len(d.get('unsichtbar',[])))" 2>&1 | tail -1; done; done
echo "=== REGISTER $(date +%T)"; for A in d1440 m390; do for SEITE in $SEITEN; do node bewegung.mjs --modus register --seite $SEITE --base $BASE --ansicht $A --ziel $Z/register-$A/$(echo $SEITE | tr '/' '_') 2>&1 | python3 -c "import json,sys; d=json.loads(sys.stdin.read()); print('$A $SEITE', {k:(v if not isinstance(v,list) else len(v)) for k,v in d.items() if k in ('unbekannt','gefundene_kennungen','ohne_register_anzahl')})" 2>&1 | tail -1; done; done
echo "=== BILDRATE alle $(date +%T)"; for SEITE in $SEITEN; do printf "%s " "$SEITE"; node bewegung.mjs --modus bildrate --seite $SEITE --base $BASE --ziel $Z/bildrate/$(echo $SEITE | tr '/' '_') 2>&1 | python3 -c "import json,sys; d=json.loads(sys.stdin.read()); print({k:d.get(k) for k in ('anteil_verworfen_prozent','loaf_anzahl','loaf_summe_ms')})" 2>&1 | tail -1; done
echo "=== JSONLD $(date +%T)"; node jsonld.mjs --seiten "$(cat $S/inhalt/skript-b/service-113.txt)" --ziel $Z/jsonld 2>&1 | tail -1; node $S/inhalt/skript-b/zaehle-service.mjs $BASE $Z/jsonld/jsonld.json $S/inhalt/skript-b/service-113.txt 2>&1 | tail -4
echo "=== ERSTES BILD (Zoom 200 %, q844) $(date +%T)"; timeout 1500 node erstesbild.mjs --satz um-e5-c --hauptansichten --geraete alle --ziel $Z/erstesbild 2>&1 | tail -8
echo "=== ERSTES BILD Stichprobe $(date +%T)"; timeout 1500 node erstesbild.mjs --satz um-e5-c-stichprobe --seiten $STICHPROBE --geraete alle --ziel $Z/erstesbild-stichprobe 2>&1 | tail -6
echo "=== BILDSATZ Stichprobe PNG $(date +%T)"; timeout 3600 node bildsatz.mjs --satz um-e5-c-stichprobe --seiten $STICHPROBE --geraete alle --base $BASE --ziel $Z/bildsatz-stichprobe --png 2>&1 | tail -6
echo "=== LESBARKEIT Stichprobe $(date +%T)"; timeout 900 node lesbarkeit.mjs --satz um-e5-c-stichprobe --seiten $STICHPROBE --ziel $Z/lesbarkeit-stichprobe 2>&1 | tail -3
echo "=== ZUGANG Reflow 320, erzwungene Farben, Seitensuche $(date +%T)"; timeout 1500 node $S/e5/zugang.mjs $BASE $Z/zugang 2>&1 | tail -4
echo "=== CURSOR $(date +%T)"; mkdir -p $Z/cursor; timeout 200 node $S/vorl/pruef/cursor-probe.mjs $BASE $Z/cursor 2>&1 | tail -3
echo "=== ENDE $(date +%T)"; du -sh $Z
