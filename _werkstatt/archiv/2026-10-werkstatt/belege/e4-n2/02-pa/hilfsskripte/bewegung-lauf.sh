#!/usr/bin/env bash
# Lauf 3 und 4 (Bewegung) gegen 4320, nacheinander. Helfer-Skript im Scratchpad.
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
W=/home/user/tezgel/_werkstatt/werkzeuge
B=/home/user/tezgel/_werkstatt/belege/e4-n2/02-pa
cd "$W" || exit 2
run() { # name, args...
  local name="$1"; shift
  echo "=== $name $(date -Iseconds)" 
  node bewegung.mjs "$@" > "$B/bewegung/$name.txt" 2> "$B/logs/$name.log"
  echo "exit $? $(date -Iseconds)"
}
run einzelbilder-bad-sig-plan-d1440  --modus einzelbilder --base http://127.0.0.1:4320 --seite /bad --kennung sig-plan --ansicht d1440 --ziel "$B/bewegung/einzelbilder-bad-sig-plan-d1440"
run einzelbilder-bad-sig-plan-m390   --modus einzelbilder --base http://127.0.0.1:4320 --seite /bad --kennung sig-plan --ansicht m390  --ziel "$B/bewegung/einzelbilder-bad-sig-plan-m390"
run einzelbilder-leistungen-bad-sig-plan-d1440 --modus einzelbilder --base http://127.0.0.1:4320 --seite /leistungen/bad --kennung sig-plan --ansicht d1440 --ziel "$B/bewegung/einzelbilder-leistungen-bad-sig-plan-d1440"
run einzelbilder-standorte-einzugsband-d1440 --modus einzelbilder --base http://127.0.0.1:4320 --seite /standorte --kennung einzugsband --ansicht d1440 --ziel "$B/bewegung/einzelbilder-standorte-einzugsband-d1440"
run einzelbilder-standorte-einzugsband-m390  --modus einzelbilder --base http://127.0.0.1:4320 --seite /standorte --kennung einzugsband --ansicht m390  --ziel "$B/bewegung/einzelbilder-standorte-einzugsband-m390"
run reduziert-bad-m390      --modus reduziert --base http://127.0.0.1:4320 --seite /bad --ansicht m390  --ziel "$B/bewegung/reduziert-bad-m390"
run reduziert-bad-d1440     --modus reduziert --base http://127.0.0.1:4320 --seite /bad --ansicht d1440 --ziel "$B/bewegung/reduziert-bad-d1440"
run reduziert-standorte-m390  --modus reduziert --base http://127.0.0.1:4320 --seite /standorte --ansicht m390  --ziel "$B/bewegung/reduziert-standorte-m390"
run reduziert-standorte-d1440 --modus reduziert --base http://127.0.0.1:4320 --seite /standorte --ansicht d1440 --ziel "$B/bewegung/reduziert-standorte-d1440"
run register-kontakt-m390   --modus register --base http://127.0.0.1:4320 --seite /kontakt --ansicht m390  --ziel "$B/bewegung/register-kontakt-m390"
run register-kontakt-d1440  --modus register --base http://127.0.0.1:4320 --seite /kontakt --ansicht d1440 --ziel "$B/bewegung/register-kontakt-d1440"
echo "ALLE FERTIG $(date -Iseconds)"
