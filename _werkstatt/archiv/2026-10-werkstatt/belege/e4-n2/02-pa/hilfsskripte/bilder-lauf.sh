#!/usr/bin/env bash
# Sichtprüfungsbilder (gleicher Aufruf wie Stufe 1, Schritt 5), weil der Stufe-1-Lauf in der Warteschlange steht.
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/tezgel/_werkstatt/werkzeuge || exit 2
B=/home/user/tezgel/_werkstatt/belege/e4-n2/02-pa
for p in / /bad /leistungen /leistungen/bad /standorte /standorte/wetzlar /fliesen /ueber-uns /kontakt /fliesen/konfigurator /blog /blog/rutschfeste-fliesen-r-klassen /bad/projekt-check; do
  s=$(echo "$p" | sed 's#^/##; s#/#__#g'); [ -z "$s" ] && s=start
  node einzelbild.mjs --base http://127.0.0.1:4320 --seite "$p" --ansichten m390,d1440 --ziel "$B/bilder/$s" > "$B/bilder/$s.pfade.txt" 2> "$B/logs/bild-$s.log"; echo "$p exit $?"
done
for p in / /leistungen /standorte /fliesen; do
  s=$(echo "$p" | sed 's#^/##; s#/#__#g'); [ -z "$s" ] && s=start
  node einzelbild.mjs --base http://127.0.0.1:4320 --seite "$p" --ansichten m390,d1440 --voll --ziel "$B/bilder/$s-voll" > "$B/bilder/$s-voll.pfade.txt" 2> "$B/logs/bild-$s-voll.log"; echo "$p voll exit $?"
done
echo "BILDER FERTIG $(date -Iseconds)"
