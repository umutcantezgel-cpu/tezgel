#!/usr/bin/env bash
# Live-Rauchtest nach Push (nur lesend, ≤ 1 Anfrage/s): wartet bis x-build = Commit (max. 10 min), prüft Kernadressen.
SHA="$(git -C "$(dirname "$0")" rev-parse "${1:-HEAD}")"
for i in $(seq 1 30); do b=$(curl -s https://www.tezgel.de/ | grep -o '<meta name="x-build" content="[^"]*"' | sed 's/.*content="//;s/"//'); [ "$b" = "$SHA" ] && break; sleep 20; done
echo "live x-build: ${b:-<leer>} · erwartet: $SHA"; [ "$b" = "$SHA" ] || { echo "ROT: Live-Stand nicht aktualisiert"; exit 1; }
rc=0
for p in / /bad /leistungen /standorte /blog /ueber-uns /kontakt /sitemap.xml /robots.txt /llms.txt; do
  for t in 1 2 3; do c=$(curl -s -o /dev/null -w '%{http_code}' "https://www.tezgel.de$p"); [ "$c" != "000" ] && break; sleep 2; done  # 000 = Proxy-Abbruch, kein HTTP-Status
  echo "$p $c"; [ "$c" = "200" ] || rc=1; sleep 1; done
c=$(curl -s -o /dev/null -w '%{http_code}' "https://www.tezgel.de/gibt-es-nicht-relaunch"); echo "/gibt-es-nicht-relaunch $c"; [ "$c" = "404" ] || rc=1; sleep 1  # G1
# Sitemap: bis zu 3 Versuche nur bei leerer Antwort (Proxy-Abbruch, 13.10.: einmal 0 Byte trotz 200); eine echte Sitemap
# mit zu wenigen Einträgen bleibt rot.
for t in 1 2 3; do sm=$(curl -s https://www.tezgel.de/sitemap.xml); [ -n "$sm" ] && break; sleep 2; done
n=$(printf '%s' "$sm" | grep -c '<loc>'); echo "Sitemap-URLs: $n"; [ "$n" -ge 163 ] || rc=1
[ $rc = 0 ] && echo "GRÜN" || echo "ROT"; exit $rc
