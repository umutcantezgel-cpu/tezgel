#!/usr/bin/env bash
# Prüfstufe A (E0-PRUEF-02a): Typprüfung, Lint, Funktionstests, Einzelbilder und Textvergleich für geänderte Dateien.
# Nutzung: pruefe-a.sh <Kennung> <Datei…> -- <Ansichtspfad…>
#   Beispiel: pruefe-a.sh PROBE-A src/components/forms/HeroContactForm.tsx -- /
# Ablauf: (1) Semaphor, höchstens zwei Läufe gleichzeitig · (2) tsc aus der Repo-Wurzel, eigene und übrige Fehler getrennt
#   · (3) eslint · (4) Funktionstests nach test-zuordnung.json (ALLE = alle Specs) gegen 127.0.0.1:4320 · (5) Einzelbilder
#   je Ansichtspfad (m390, d1440) · (6) Textvergleich: Lauf nach _werkstatt/cache/texte/<Kennung>, Vergleich gegen
#   _werkstatt/belege/e0 (nur wenn vorhanden) · (7) Zusammenfassung.
# Ergebnis: stdout und $SCRATCH/<Kennung>/pruefe-a.txt. Exit 1 bei Fehlern in eigenen Dateien (tsc, eslint), bei
#   fehlgeschlagenem Test oder bei Bildfehlern (HTTP ≠ 200). Die Textstufe wirkt nicht auf den Exit-Code.
# Nur die Testzuordnung anzeigen: PRUEFE_A_NUR_SPECS=1 pruefe-a.sh <Kennung> <Datei…>
# Testbasis statt _werkstatt/belege/e0 (nur für Prüfläufe): PRUEFE_A_BASIS_ORDNER=<Ordner mit texte-index.json und texte/>
set -uo pipefail
export PLAYWRIGHT_BROWSERS_PATH="${PLAYWRIGHT_BROWSERS_PATH:-/opt/pw-browsers}"

WERKZEUGE="$(cd "$(dirname "$0")" && pwd)"
REPO="$(cd "$WERKZEUGE/../.." && pwd)"
SCRATCH="${RELAUNCH_SCRATCH:-/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad}"
DEV="http://127.0.0.1:4320"
ZUORDNUNG="$WERKZEUGE/test-zuordnung.json"
TESTS="$WERKZEUGE/tests"

# Kennung und Argumente prüfen
if [ $# -lt 2 ]; then echo "Nutzung: pruefe-a.sh <Kennung> <Datei…> -- <Ansichtspfad…>" >&2; exit 2; fi
KENNUNG="$1"; shift
if ! [[ "$KENNUNG" =~ ^[A-Za-z0-9._-]+$ ]]; then echo "Kennung ungültig: $KENNUNG" >&2; exit 2; fi
DATEIEN=()
while [ $# -gt 0 ] && [ "$1" != "--" ]; do DATEIEN+=("${1#./}"); shift; done
[ "${1:-}" = "--" ] && shift
PFADE=("$@")
if [ ${#DATEIEN[@]} -eq 0 ]; then echo "keine Datei angegeben" >&2; exit 2; fi
for d in "${DATEIEN[@]}"; do [ -f "$REPO/$d" ] || { echo "Datei fehlt im Repo: $d" >&2; exit 2; }; done
for p in ${PFADE[@]+"${PFADE[@]}"}; do case "$p" in /*) ;; *) echo "Ansichtspfad muss mit / beginnen: $p" >&2; exit 2;; esac; done

# Slug wie lib.mjs (slug()): / → start, /a/b → a__b
slug_von() { local s="${1#/}"; s="${s//\//__}"; echo "${s:-start}"; }

# Specs je geänderter Datei: Muster aus test-zuordnung.json (Regex, sonst Teilstring); ALLE = alle funktion-Specs.
spec_liste() {
  node -e '
    const fs = require("node:fs");
    const [zuordnung, testDir, ...dateien] = process.argv.slice(1);
    const z = JSON.parse(fs.readFileSync(zuordnung, "utf8"));
    const alle = fs.readdirSync(testDir).filter((f) => /^funktion-.*\.spec\.mjs$/.test(f)).sort();
    const aus = new Set();
    for (const d of dateien) for (const e of z) {
      let trifft;
      try { trifft = new RegExp(e.muster).test(d); } catch { trifft = d.includes(e.muster); }
      if (!trifft) continue;
      for (const s of e.specs) {
        if (s === "ALLE") alle.forEach((x) => aus.add(x));
        else if (alle.includes(s)) aus.add(s);
        else { console.error(`unbekannte Spec in test-zuordnung.json: ${s}`); process.exit(2); }
      }
    }
    for (const s of aus) console.log(s);
  ' "$ZUORDNUNG" "$TESTS" "$@"
}

if [ "${PRUEFE_A_NUR_SPECS:-0}" = "1" ]; then spec_liste "${DATEIEN[@]}"; exit $?; fi

# (1) Semaphor: höchstens zwei gleichzeitige Läufe. Erst -n auf slot1, dann -n auf slot2, sonst blockierend auf slot1.
mkdir -p "$SCRATCH"
exec 8>"$SCRATCH/pruefe-a.slot1" 9>"$SCRATCH/pruefe-a.slot2"
if flock -n 8; then PLATZ=slot1
elif flock -n 9; then PLATZ=slot2
else echo "Beide Plätze belegt, warte auf slot1 …"; flock 8; PLATZ=slot1
fi

OUT="$SCRATCH/$KENNUNG"
mkdir -p "$OUT"
LOG="$OUT/pruefe-a.txt"
START=$(date +%s)
EIGENE="$(printf '%s\n' "${DATEIEN[@]}")"

# (2) Typprüfung: Fehler in den übergebenen Dateien zählen getrennt von übrigen Fehlern
cd "$REPO" || exit 2
t0=$(date +%s)
npx tsc --noEmit --incremental --tsBuildInfoFile "$OUT/tsbuildinfo" > "$OUT/tsc.txt" 2>&1
TSC_RC=$?
TSC_SEK=$(( $(date +%s) - t0 ))
read -r TSC_GES TSC_EIG TSC_UEB < <(EIGENE="$EIGENE" awk '
  BEGIN { n = split(ENVIRON["EIGENE"], arr, "\n"); for (i = 1; i <= n; i++) if (arr[i] != "") eigen[arr[i]] = 1 }
  /error TS[0-9]+:/ { ges++; datei = $0; sub(/\(.*/, "", datei); if (datei in eigen) eig++; else ueb++ }
  END { print ges + 0, eig + 0, ueb + 0 }' "$OUT/tsc.txt")
if [ "$TSC_RC" -eq 0 ]; then TSC_STATE=GRÜN
elif [ "$TSC_GES" -eq 0 ]; then TSC_STATE=ROT
elif [ "$TSC_EIG" -gt 0 ]; then TSC_STATE=ROT
else TSC_STATE=GRÜN
fi
if [ "$TSC_RC" -ne 0 ] && [ "$TSC_GES" -eq 0 ]; then TSC_HINWEIS=" · tsc ohne Fehlerzeilen (Exit $TSC_RC), siehe $OUT/tsc.txt"; else TSC_HINWEIS=""; fi

# (3) Lint der übergebenen Dateien
t0=$(date +%s)
npx eslint -f json "${DATEIEN[@]}" > "$OUT/eslint.json" 2> "$OUT/eslint.err"
ESL_RC=$?
ESL_SEK=$(( $(date +%s) - t0 ))
read -r ESL_FEHLER ESL_WARN < <(node -e 'const r = JSON.parse(require("node:fs").readFileSync(process.argv[1], "utf8")); let e = 0, w = 0; for (const f of r) { e += f.errorCount; w += f.warningCount; } console.log(e, w);' "$OUT/eslint.json" 2>/dev/null || echo "-1 -1")
if [ "$ESL_RC" -eq 0 ]; then ESL_STATE=GRÜN; else ESL_STATE=ROT; fi

# (4) Funktionstests nach Zuordnung
TEST_INFO=""
t0=$(date +%s)
if ! spec_liste "${DATEIEN[@]}" > "$OUT/specs.txt" 2> "$OUT/specs.err"; then
  TEST_STATE=ROT; TEST_SEK=0; TEST_INFO="Zuordnung fehlgeschlagen: $(cat "$OUT/specs.err")"; SPECS=()
else
  mapfile -t SPECS < "$OUT/specs.txt"
fi
if [ -z "$TEST_INFO" ] && [ ${#SPECS[@]} -eq 0 ]; then
  TEST_STATE=ÜBERSPRUNGEN; TEST_SEK=0; TEST_INFO="keine Zuordnung für diese Dateien"
elif [ -z "$TEST_INFO" ]; then
  (cd "$WERKZEUGE" && RELAUNCH_BASE="$DEV" RELAUNCH_OUTPUT="$OUT/pw" RELAUNCH_REPORT="$OUT/pw.json" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers npx playwright test "${SPECS[@]}" --workers=1) > "$OUT/pw.log" 2>&1
  PW_RC=$?
  TEST_SEK=$(( $(date +%s) - t0 ))
  read -r ERW UNERW FLAKY < <(node -e 'const s = JSON.parse(require("node:fs").readFileSync(process.argv[1], "utf8")).stats; console.log(s.expected, s.unexpected, s.flaky);' "$OUT/pw.json" 2>/dev/null || echo "-1 -1 -1")
  if [ "$PW_RC" -eq 0 ] && [ "$UNERW" -eq 0 ] && [ "$ERW" -gt 0 ]; then TEST_STATE=GRÜN; else TEST_STATE=ROT; fi
  TEST_INFO="Specs ${SPECS[*]} · erwartet $ERW · unerwartet $UNERW · flaky $FLAKY · Exit $PW_RC"
fi

# (5) Einzelbilder je Ansichtspfad
t0=$(date +%s)
BILD_PFADE=()
BILD_INFO=()
BILD_FEHLER=0
if [ ${#PFADE[@]} -eq 0 ]; then
  BILD_STATE=ÜBERSPRUNGEN; BILD_SEK=0; BILD_INFO=("keine Ansichtspfade")
else
  for p in "${PFADE[@]}"; do
    s="$(slug_von "$p")"
    node "$WERKZEUGE/einzelbild.mjs" --base "$DEV" --seite "$p" --ansichten m390,d1440 --ziel "$OUT/bilder/$s" > "$OUT/bilder-$s.txt" 2> "$OUT/bilder-$s.log"
    [ $? -eq 0 ] || BILD_FEHLER=1
    mapfile -t ZEILEN_BILD < "$OUT/bilder-$s.txt"
    for z in ${ZEILEN_BILD[@]+"${ZEILEN_BILD[@]}"}; do BILD_PFADE+=("$z"); done
    BILD_INFO+=("$p: $(node -e 'const j = JSON.parse(require("node:fs").readFileSync(process.argv[1], "utf8")); const e = j.ergebnisse; console.log(`HTTP ${e.map((r) => r.status).join("/")} · Konsole ${e.reduce((n, r) => n + r.konsole.length, 0)} · Überlauf ${e.reduce((n, r) => n + r.ueberlauf.length, 0)} · Überlappung ${e.reduce((n, r) => n + r.ueberlappungGesamt, 0)}`);' "$OUT/bilder/$s/einzelbild.json" 2>/dev/null || echo "Bericht fehlt")")
  done
  BILD_SEK=$(( $(date +%s) - t0 ))
  if [ "$BILD_FEHLER" -eq 0 ]; then BILD_STATE=GRÜN; else BILD_STATE=ROT; fi
fi

# (6) Textvergleich: Lauf nach _werkstatt/cache/texte/<Kennung>, Vergleich gegen die Basis _werkstatt/belege/e0
#     (PRUEFE_A_BASIS_ORDNER ersetzt die Basis; nur für Prüfläufe mit einer Testbasis gedacht)
TEXT_BASIS="${PRUEFE_A_BASIS_ORDNER:-$REPO/_werkstatt/belege/e0}"
TEXT_BASIS_NAME="$(basename "$TEXT_BASIS")"
TEXT_ZIEL="$REPO/_werkstatt/cache/texte/$KENNUNG"
if [ ! -f "$TEXT_BASIS/texte-index.json" ]; then
  TEXT_STATE=ÜBERSPRUNGEN; TEXT_INFO="keine Basis ($TEXT_BASIS/texte-index.json fehlt)"
elif [ ${#PFADE[@]} -eq 0 ]; then
  TEXT_STATE=ÜBERSPRUNGEN; TEXT_INFO="keine Ansichtspfade"
else
  rm -rf "$TEXT_ZIEL"
  SEITEN_KOMMA="$(IFS=,; echo "${PFADE[*]}")"
  RELAUNCH_BASE="$DEV" node "$WERKZEUGE/texte.mjs" --satz "$KENNUNG" --seiten "$SEITEN_KOMMA" --base "$DEV" --ziel "$TEXT_ZIEL" > "$OUT/texte.log" 2>&1
  T_RC=$?
  node "$WERKZEUGE/texte-vergleich.mjs" "$TEXT_BASIS_NAME" "$KENNUNG" --vorher-ordner "$TEXT_BASIS" --nachher-ordner "$TEXT_ZIEL" > "$OUT/texte-vergleich.log" 2>&1
  V_RC=$?
  if [ "$T_RC" -ne 0 ] || [ "$V_RC" -ne 0 ]; then TEXT_STATE=ROT
  elif grep -q '"ergebnis":"ROT"' "$OUT/texte-vergleich.log"; then TEXT_STATE=ROT
  else TEXT_STATE=GRÜN
  fi
  TEXT_INFO="gegen $TEXT_BASIS_NAME · $(head -n 1 "$OUT/texte-vergleich.log" 2>/dev/null) · $TEXT_ZIEL/texte-vergleich-gegen-$TEXT_BASIS_NAME.json"
fi

# (7) Zusammenfassung und Exit-Code
GESAMT=GRÜN
for st in "$TSC_STATE" "$ESL_STATE" "$TEST_STATE" "$BILD_STATE" "$TEXT_STATE"; do [ "$st" = ROT ] && GESAMT=ROT; done
EXIT=0
if [ "$TSC_STATE" = ROT ] || [ "$ESL_STATE" = ROT ] || [ "$TEST_STATE" = ROT ] || [ "$BILD_STATE" = ROT ] || [ "$TEXT_STATE" = ROT ]; then EXIT=1; fi
ZEILEN=()
ZEILEN+=("PRÜFSTUFE A · Kennung $KENNUNG · Platz $PLATZ · $(date -Iseconds)")
ZEILEN+=("Dateien: ${DATEIEN[*]}")
ZEILEN+=("Ansichtspfade: ${PFADE[*]:-keine}")
ZEILEN+=("Typprüfung (tsc): $TSC_STATE · Fehler in eigenen Dateien $TSC_EIG · übrige $TSC_UEB · ${TSC_SEK} s · $OUT/tsc.txt$TSC_HINWEIS")
ZEILEN+=("Lint (eslint): $ESL_STATE · Fehler $ESL_FEHLER · Warnungen $ESL_WARN · ${ESL_SEK} s · $OUT/eslint.json")
ZEILEN+=("Funktionstests: $TEST_STATE · ${TEST_SEK} s · $TEST_INFO · $OUT/pw.json")
ZEILEN+=("Bilder: $BILD_STATE · ${BILD_SEK:-0} s")
for z in ${BILD_INFO[@]+"${BILD_INFO[@]}"}; do ZEILEN+=("  $z"); done
for z in ${BILD_PFADE[@]+"${BILD_PFADE[@]}"}; do ZEILEN+=("  Bild: $z"); done
ZEILEN+=("Textvergleich: $TEXT_STATE · $TEXT_INFO")
ZEILEN+=("Gesamt: $GESAMT · Laufzeit $(( $(date +%s) - START )) s · Exit-Code $EXIT (Gate: tsc, eslint, Test, Bilder, Texte)")
printf '%s\n' "${ZEILEN[@]}" | tee "$LOG"
exit "$EXIT"
