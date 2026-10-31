#!/bin/bash
# Messpunkt UM-E4-SICHT-FIX Welle 1, Teil 1 (ohne Lighthouse): vorher 4d2d3fef auf 4324, nachher $1 (HEAD nach A, B, C1, C2) auf 4325.
SHA=$1; VOR=4d2d3fef
[ -z "$SHA" ] && { echo "Aufruf: kette-1.sh <sha>"; exit 2; }
S=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad
Z=$S/sfix/pruef-w1
export PATH=$S/node-lts/aktuell/bin:$PATH RELAUNCH_SCRATCH=$S SCRATCH=$S PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome
SEITEN="/ /bad /bad/badsanierung /bad/barrierefreies-bad /leistungen /fliesen /balkon-terrasse /referenzen /ueber-uns /kontakt /standorte/wetzlar /blog /preise"
ZUSATZ="/preise,/bad/projekt-check,/termin,/blog/barrierefreier-balkonaustritt,/standorte/giessen,/standorte/asslar,/leistungen/bad,/foerderung,/bad/badanfrage"
cd /home/user/tezgel
FREI=$(df --output=avail -k / | tail -1); [ "$FREI" -lt 5000000 ] && { echo "ABBRUCH: nur $((FREI/1024)) MB frei"; exit 3; }
echo "=== REINRAUM $SHA $(date +%T)"; bash _werkstatt/werkzeuge/reinraum.sh $SHA $Z/reinraum-log > $Z/reinraum.out 2>&1; echo "exit $?"; tail -3 $Z/reinraum.out
grep -h "ℹ \(tests\|pass\|fail\|skipped\)" $Z/reinraum-log/* 2>/dev/null | tail -4
PORT=4325 timeout 60 bash _werkstatt/werkzeuge/server.sh stop > /dev/null 2>&1
curl -s -o /dev/null http://127.0.0.1:4324/ || PORT=4324 REINRAUM_DIR=$S/reinraum-$VOR timeout 150 bash _werkstatt/werkzeuge/server.sh start $VOR | tail -1
PORT=4325 REINRAUM_DIR=$S/reinraum-$SHA timeout 150 bash _werkstatt/werkzeuge/server.sh start $SHA | tail -1
for P in 4324 4325; do curl -s -o /dev/null -w "$P %{http_code}\n" http://127.0.0.1:$P/ || exit 1; done
for U in $(echo $ZUSATZ | tr ',' ' '); do curl -s -o /dev/null -w "$U %{http_code}\n" http://127.0.0.1:4325$U; done
echo "=== STYLESHEETS und CSS gzip $(date +%T)"
for P in 4324 4325; do for U in $SEITEN; do printf "%s %s css=%s\n" $P $U "$(curl -s http://127.0.0.1:$P$U | grep -o '<link rel="stylesheet"[^>]*>' | wc -l)"; done
  H=$(curl -s http://127.0.0.1:$P/ | grep -o '<link rel="stylesheet" href="[^"]*"' | head -1 | sed 's/.*href="//;s/"$//'); printf "%s css %s roh=%s gzip=%s\n" $P "$H" "$(curl -s http://127.0.0.1:$P$H | wc -c)" "$(curl -s http://127.0.0.1:$P$H | gzip -9 | wc -c)"; done
cd _werkstatt/werkzeuge
echo "=== G8 $(date +%T)"; timeout 300 node $S/fix/pruef/fuss-g8.mjs http://127.0.0.1:4324 http://127.0.0.1:4325 $Z/g8.json 2>&1 | tail -6; echo "g8 exit ${PIPESTATUS[0]}"
echo "=== ERSTES BILD $(date +%T)"; RELAUNCH_BASE=http://127.0.0.1:4325 timeout 1200 node erstesbild.mjs --satz sfix-w1 --hauptansichten --geraete alle --ziel $Z/erstesbild 2>&1 | tail -8; echo "erstesbild exit ${PIPESTATUS[0]}"
while pgrep -f kontingent.mjs > /dev/null; do sleep 10; done
echo "=== SUITE reduziert $(date +%T) last $(cut -d' ' -f1 /proc/loadavg)"; RELAUNCH_BASE=http://127.0.0.1:4325 RELAUNCH_REPORT=$Z/suite.json RELAUNCH_OUTPUT=$Z/suite-out npx playwright test > $Z/suite.txt 2>&1; echo "exit $?"
echo "=== SUITE Bewegung an $(date +%T) last $(cut -d' ' -f1 /proc/loadavg)"; RELAUNCH_BEWEGUNG=an RELAUNCH_BASE=http://127.0.0.1:4325 RELAUNCH_REPORT=$Z/suite-bewegung.json RELAUNCH_OUTPUT=$Z/suite-b-out npx playwright test > $Z/suite-bewegung.txt 2>&1; echo "exit $?"
python3 -c "
import json
for f in ('suite','suite-bewegung'):
    try: d=json.load(open('$Z/'+f+'.json')); print(f, d.get('stats'))
    except Exception as e: print(f, 'FEHLER', e)"
echo "=== BILDRATE im Wechsel $(date +%T)"
for SEITE in / /bad /referenzen /standorte/wetzlar; do for P in 4324 4325; do printf "%s %s " "$SEITE" "$P"; node bewegung.mjs --modus bildrate --seite $SEITE --base http://127.0.0.1:$P --ziel $Z/bildrate/$P$(echo $SEITE | tr '/' '_') 2>&1 | python3 -c "import json,sys; d=json.loads(sys.stdin.read()); print({k:d.get(k) for k in ('anteil_verworfen_prozent','loaf_anzahl','loaf_summe_ms')})" 2>&1 | tail -1; done; done
echo "=== AXE $(date +%T)"; RELAUNCH_BASE=http://127.0.0.1:4325 node axe.mjs --satz sfix-w1 --hauptansichten --zustaende --ziel $Z/axe > $Z/axe.out 2>&1; tail -c 300 $Z/axe.out; echo
echo "=== AXE Zusatz $(date +%T)"; RELAUNCH_BASE=http://127.0.0.1:4325 node axe.mjs --satz sfix-w1-zusatz --seiten $ZUSATZ --zustaende --ziel $Z/axe-zusatz > $Z/axe-zusatz.out 2>&1; tail -c 300 $Z/axe-zusatz.out; echo
echo "=== RUHIG/REDUZIERT $(date +%T)"; for SEITE in $SEITEN; do for M in ruhig reduziert; do X=""; [ $M = ruhig ] && X="--schalter ruhig"; node bewegung.mjs --modus reduziert $X --seite $SEITE --base http://127.0.0.1:4325 --ziel $Z/$M/$(echo $SEITE | tr '/' '_') 2>&1 | python3 -c "import json,sys; d=json.loads(sys.stdin.read()); print('$M $SEITE befunde', len(d.get('bewegungsbefunde',[])), 'unsichtbar', len(d.get('unsichtbar',[])))" 2>&1 | tail -1; done; done
echo "=== REGISTER $(date +%T)"; for A in d1440 m390; do for SEITE in $SEITEN; do node bewegung.mjs --modus register --seite $SEITE --base http://127.0.0.1:4325 --ansicht $A --ziel $Z/register-$A/$(echo $SEITE | tr '/' '_') 2>&1 | python3 -c "import json,sys; d=json.loads(sys.stdin.read()); print('$A $SEITE', {k:(v if not isinstance(v,list) else len(v)) for k,v in d.items() if k in ('unbekannt','gefundene_kennungen','ohne_register_anzahl')})" 2>&1 | tail -1; done; done
echo "=== JSONLD $(date +%T)"; RELAUNCH_BASE=http://127.0.0.1:4325 node jsonld.mjs --seiten "$(cat $S/inhalt/skript-b/service-113.txt)" --ziel $Z/jsonld 2>&1 | tail -1; node $S/inhalt/skript-b/zaehle-service.mjs http://127.0.0.1:4325 $Z/jsonld/jsonld.json $S/inhalt/skript-b/service-113.txt 2>&1 | tail -4
echo "=== LESBARKEIT $(date +%T)"; RELAUNCH_BASE=http://127.0.0.1:4325 timeout 900 node lesbarkeit.mjs --satz sfix-w1 --hauptansichten --ziel $Z/lesbarkeit 2>&1 | tail -4
echo "=== WERTE $(date +%T)"; cd /home/user/tezgel; node _werkstatt/werkzeuge/werte.mjs $(git diff --name-only $VOR $SHA -- src | grep -E '\.(tsx?|jsx?|css)$') 2>&1 | tail -4; cd _werkstatt/werkzeuge
echo "=== PIXEL $(date +%T)"; node pixelvergleich.mjs --vorher http://127.0.0.1:4324 --nachher http://127.0.0.1:4325 --satz sfix-w1 --hauptansichten --ziel $Z/pixel 2>&1 | grep -E "Paare:|  [0-9]+\." | head -20
echo "=== ENDE $(date +%T)"
