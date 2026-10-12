#!/usr/bin/env bash
# Prüftor T2-S / T2-Q (Vereinheitlichung E-037/E-038, PLAN Abschnitt „Vereinheitlichung“ Phase 1.3): ein Seiten-Schritt
# aus dem Commit (Reinraum, nie aus dem Arbeitsbaum) gegen den Live-Stand.
# Nutzung: tor-s.sh <live-commit> <kennung> <seiten,kommagetrennt> [specs,kommagetrennt] [--q]
#   --q (T2-Q, geteilte Komponente): zusätzlich Pixel-Stichprobe der übrigen Hauptansichten (m375, d1440).
# Stufen (Logs und Zahlen nach _relaunch/belege/<kennung>/tor/):
#   1 Sperrklinke · 2 Reinraum HEAD (npm ci, build, typecheck, lint, test, qa:graph) · 3 build-vergleich LIVE→HEAD:
#   HTML-Abweichungen nur auf den Seiten des Schritts, CSS-Änderungen gezählt · 4 werte.mjs auf geänderten src-Dateien ·
#   5 Altsystem-Suche in geänderten src-Dateien · 6 texte2 (Build gegen Build, Freigabe MIKROTEXTE.md): rot 0 ·
#   7 Server HEAD auf 4360 · 8 axe mit Zuständen (0 ernst/kritisch) · 9 a11y-zusatz (Zahlen, harte Kennzahlen prüft der
#   Orchestrator) · 10 Wortbruch 0 · 11 Fotos 4 Ansichten (Überlauf, Konsolenfehler; Sichtung durch den Orchestrator) ·
#   12 Funktionstests (beide Projekte) · 13 (--q) Pixel-Stichprobe. Port des HEAD-Servers: TOR_PORT (Standard 4360).
# Exit 0 = alle automatischen Stufen grün (Sichtung und a11y-Kennzahlen bleiben Orchestrator-Aufgabe), 1 = rot.
set -uo pipefail
REPO="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"; W="$REPO/_relaunch/werkzeuge"
SCRATCH="${RELAUNCH_SCRATCH:-/tmp/claude-0/-home-user-tezgel/f51f963a-66a5-5b8c-a0c5-6b569a6ff96b/scratchpad}"
export PLAYWRIGHT_BROWSERS_PATH="${PLAYWRIGHT_BROWSERS_PATH:-/opt/pw-browsers}"
[ $# -ge 3 ] || { echo "Nutzung: tor-s.sh <live-commit> <kennung> <seiten> [specs] [--q]" >&2; exit 2; }
LIVE="$(git -C "$REPO" rev-parse --short "$1")"; KENNUNG="$2"; SEITEN="$3"; SPECS="${4:-}"
Q=0; for a in "$@"; do [ "$a" = "--q" ] && Q=1; done; [ "$SPECS" = "--q" ] && SPECS=""
KOPF="$(git -C "$REPO" rev-parse --short HEAD)"
AUS="$REPO/_relaunch/belege/$KENNUNG/tor"; mkdir -p "$AUS"; ROH="$AUS/ergebnis.txt"; : > "$ROH"
PORT="${TOR_PORT:-4360}"; HEAD_URL="http://127.0.0.1:$PORT"
rot=0
stufe() { echo "$1 $2 ${3:-}" | tee -a "$ROH"; [ "$2" = "0" ] || rot=1; }

echo "T2 · $KENNUNG · live $LIVE → $KOPF · Seiten $SEITEN · $(date -Iseconds)" | tee -a "$ROH"

# 1 Sperrklinke
node "$W/testzahl.mjs" > "$AUS/01-testzahl.log" 2>&1; stufe 01-sperrklinke $?

# 2 Reinraum HEAD
bash "$W/reinraum.sh" "$KOPF" > "$AUS/02-reinraum.log" 2>&1
E="$REPO/_relaunch/cache/reinraum-$KOPF/ergebnis.txt"; r=0
for k in npm-ci build typecheck lint test qa-graph; do grep -qE "^$k 0 " "$E" 2>/dev/null || { r=1; echo "  rot: $k" | tee -a "$ROH"; }; done
stufe 02-reinraum $r
[ $r -eq 0 ] || { echo "T2 ROT (Reinraum)"; exit 1; }
[ -d "$SCRATCH/reinraum-$LIVE/.next" ] || bash "$W/reinraum.sh" "$LIVE" > "$AUS/02-reinraum-live.log" 2>&1

# 3 build-vergleich: Abweichungen nur auf den Seiten des Schritts (Datei-Namen aus den Pfaden: /a/b → a/b.html)
node "$W/build-vergleich.mjs" "$LIVE" "$KOPF" > "$AUS/03-build-vergleich.log" 2>&1
BV="$REPO/_relaunch/belege/build-vergleich-$LIVE-$KOPF/bericht.json"
node -e '
  const [bv, seiten] = process.argv.slice(1);
  const j = require(bv);
  // BEREICH_AUCH (T2-Q): weitere Seiten, deren HTML sich durch eine geteilte Komponente ändern darf (Pixel und Specs decken sie).
  const auch = (process.env.BEREICH_AUCH || "").split(",").filter(Boolean);
  const erlaubt = new Set([...seiten.split(","), ...auch].map((s) => (s === "/" ? "index" : s.replace(/^\//, "")) + ".html"));
  const dateien = [...new Set(j.abweichungen.map((a) => a.datei))];
  // BEREICH_AUCH="*": Sammel-Tor über mehrere geteilte Komponenten – keine Sperre, die Liste prüft der Orchestrator von Hand.
  const fremd = auch.includes("*") ? [] : dateien.filter((d) => !erlaubt.has(d));
  console.log(JSON.stringify({ html_abweichend: dateien, fremd, nur_vorher: j.nur_vorher, nur_nachher: j.nur_nachher, css_weg: j.css_selektoren_weg.length, css_neu: j.css_selektoren_neu.length, keyframes_weg: j.keyframes_weg, keyframes_neu: j.keyframes_neu }));
  process.exit(fremd.length || j.nur_vorher.length || j.nur_nachher.length ? 1 : 0);
' "$BV" "$SEITEN" > "$AUS/03-bereich.json" 2>&1; r=$?; stufe 03-bereich $r "$(cat "$AUS/03-bereich.json" | head -c 600)"

# 4/5 geänderte Produktdateien
SRC="$(git -C "$REPO" diff --name-only "$LIVE" HEAD -- src | grep -E '\.(tsx|ts|jsx|js)$' | while read -r f; do [ -f "$REPO/$f" ] && echo "$f"; done | paste -sd, -)"
if [ -n "$SRC" ]; then
  (cd "$REPO" && node _werkstatt/werkzeuge/werte.mjs --dateien "$SRC" --ziel "$AUS/werte") > "$AUS/04-werte.log" 2>&1; stufe 04-werte $? "$(tail -1 "$AUS/04-werte.log")"
  (cd "$REPO" && echo "$SRC" | tr ',' '\n' | grep -v '^src/components/kern/\(basis\|seiten\|start\|vorlagen\|einwilligung\|formulare\|fuss\|kopf-b\|icons\|motive\|schale\)/' | grep -v '^src/app/(kern)/' \
    | xargs -r grep -nE "lucide-react|framer-motion|@phosphor|glass-|ambient-|ceramic-|(^|[\"' \`])eyebrow([\"' \`]|$)|btn-primary|btn-ghost|icon-chip|gradient|backdrop-blur|shadow-\[|rounded-(sm|md|lg|xl|2xl|3xl|full|tile)|(slate|neutral|orange|amber|gray|zinc|stone)-[0-9]") > "$AUS/05-altsystem.log" 2>&1
  [ -s "$AUS/05-altsystem.log" ] && stufe 05-altsystem 1 "$(wc -l < "$AUS/05-altsystem.log") Treffer" || stufe 05-altsystem 0
else
  stufe 04-werte 0 "keine src-Datei"; stufe 05-altsystem 0 "keine src-Datei"
fi

# 6 texte2 Build gegen Build
node "$W/texte2.mjs" --build "$SCRATCH/reinraum-$LIVE/.next" --satz "$KENNUNG-texte-live" --aus "$AUS/texte-live" --seiten "$SEITEN" > "$AUS/06-texte2-live.log" 2>&1
node "$W/texte2.mjs" --build "$SCRATCH/reinraum-$KOPF/.next" --satz "$KENNUNG-texte-kopf" --aus "$AUS/texte-kopf" --seiten "$SEITEN" > "$AUS/06-texte2-kopf.log" 2>&1
node "$W/texte2.mjs" --vergleich "$AUS/texte-live" "$AUS/texte-kopf" --freigabe "$REPO/_relaunch/MIKROTEXTE.md" --aus "$AUS/06-texte2-vergleich.json" --streng > "$AUS/06-texte2.log" 2>&1
stufe 06-texte2 $? "$(tail -1 "$AUS/06-texte2.log")"

# 7 Server HEAD
PORT=$PORT bash "$W/server.sh" start "$KOPF" > "$AUS/07-server.log" 2>&1; stufe 07-server $?
export RELAUNCH_BASE="$HEAD_URL"

# 8 axe mit Zuständen
(cd "$W" && node axe.mjs --satz "$KENNUNG" --seiten "$SEITEN" --zustaende) > "$AUS/08-axe.log" 2>&1
# Zustände laufen über die Grundmenge (auch fremde Bestandsseiten); gezählt werden nur die Seiten des Schritts.
n="$(node -e 'const [d,s]=process.argv.slice(1);const j=require(d);const S=new Set(s.split(","));let n=0;for(const e of j.ergebnisse){if(!S.has(e.seite))continue;for(const v of e.verstoesse||[])if(["serious","critical"].includes(v.impact))n+=v.anzahl}console.log(n)' "$REPO/_relaunch/belege/$KENNUNG/axe.json" "$SEITEN" 2>/dev/null || echo fehlt)"
[ "$n" = "0" ] && stufe 08-axe 0 "ernst/kritisch auf den Seiten des Schritts 0" || stufe 08-axe 1 "ernst/kritisch auf den Seiten des Schritts $n"

# 9 a11y-zusatz (Zahlen; Bewertung der harten Kennzahlen durch den Orchestrator)
(cd "$W" && node a11y-zusatz.mjs --satz "$KENNUNG" --seiten "$SEITEN") > "$AUS/09-a11y-zusatz.log" 2>&1; stufe 09-a11y-zusatz-lauf $? "$(tail -2 "$AUS/09-a11y-zusatz.log" | tr '\n' ' ' | head -c 400)"

# 10 Wortbruch
(cd "$W" && node wortbruch.mjs --base "$HEAD_URL" --seiten "$SEITEN" --satz "$KENNUNG") > "$AUS/10-wortbruch.log" 2>&1; stufe 10-wortbruch $? "$(tail -1 "$AUS/10-wortbruch.log")"

# 11 Fotos in vier Ansichten
(cd "$W" && node fotos.mjs --satz "$KENNUNG" --seiten "$SEITEN" --ansichten m375,t768,d1440,d1920) > "$AUS/11-fotos.log" 2>&1; stufe 11-fotos-lauf $? "$(tail -1 "$AUS/11-fotos.log")"

# 12 Funktionstests
if [ -n "$SPECS" ]; then
  LISTE="$(echo "$SPECS" | tr ',' '\n' | sed 's#^#tests/#' | tr '\n' ' ')"
  (cd "$W" && RELAUNCH_REPORT="$AUS/12-specs.json" RELAUNCH_OUTPUT="$SCRATCH/tor-$KENNUNG-pw" npx playwright test $LISTE --reporter=line) > "$AUS/12-specs.log" 2>&1
  stufe 12-specs $? "$(grep -E '[0-9]+ (passed|failed|skipped|flaky)' "$AUS/12-specs.log" | tr '\n' ' ')"
fi

# 13 Pixel-Stichprobe der übrigen Hauptansichten (T2-Q)
if [ $Q -eq 1 ]; then
  [ -n "$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4337/)" ] || true
  # Feste Stichprobe der Hauptvorlagen (die ganze Grundmenge sprengt das Zeitfenster); Vergleich gegen PIXEL_A (Standard:
  # Live-Server 4337 – Seiten, die seit dessen Stand umgebaut wurden, gehören nicht in die Stichprobe).
  STICH="${PIXEL_STICHPROBE:-/,/kontakt,/bad,/standorte,/standorte/giessen,/fliesen,/faq,/preise,/leistungen/bad,/bad/badanfrage,/fliesen/konfigurator}"
  STICH="$(echo "$STICH" | tr ',' '\n' | grep -vxF -f <(echo "$SEITEN" | tr ',' '\n') | paste -sd, -)"
  (cd "$W" && node pixel.mjs --a "${PIXEL_A:-http://127.0.0.1:4337}" --b "$HEAD_URL" --satz "$KENNUNG-pixel" --seiten "$STICH" --ansichten m375,d1440) > "$AUS/13-pixel.log" 2>&1
  stufe 13-pixel $? "$(grep -E '^pixel:' "$AUS/13-pixel.log")"
fi

[ $rot -eq 0 ] && echo "T2 GRÜN (automatische Stufen) · Sichtung und a11y-Kennzahlen: $AUS" | tee -a "$ROH" || echo "T2 ROT · $ROH" | tee -a "$ROH"
exit $rot
