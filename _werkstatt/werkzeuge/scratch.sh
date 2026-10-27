# Scratchpad-Ermittlung für die Prüfwerkzeuge (per `source` einbinden, nicht direkt ausführen).
# Regel: RELAUNCH_SCRATCH, sonst SCRATCH, sonst der zuletzt geänderte Ordner
# /tmp/claude-0/-home-user-tezgel/*/scratchpad. Fehlt alles, Abbruch mit Meldung.
# Gleiche Regel in lib.mjs (Konstante SCRATCH).
if [ -n "${RELAUNCH_SCRATCH:-}" ]; then
  SCRATCH="$RELAUNCH_SCRATCH"
elif [ -n "${SCRATCH:-}" ]; then
  SCRATCH="$SCRATCH"
else
  SCRATCH="$(ls -td /tmp/claude-0/-home-user-tezgel/*/scratchpad 2>/dev/null | head -1)"
fi
if [ -z "${SCRATCH:-}" ] || [ ! -d "$SCRATCH" ]; then
  echo "ABBRUCH: kein Scratchpad gefunden. RELAUNCH_SCRATCH oder SCRATCH setzen (Pfad zu .../scratchpad)." >&2
  return 1 2>/dev/null || exit 1
fi
export SCRATCH
export RELAUNCH_SCRATCH="$SCRATCH"
# Laufzeit des Projekts (`.nvmrc`, UM-E2-U01): Liegt die LTS im Scratchpad unter node-lts/aktuell
# (EINRICHTUNG Schritt 0), gilt sie für alle Skripte, die diese Datei einbinden (Reinraum, Server).
if [ -x "$SCRATCH/node-lts/aktuell/bin/node" ]; then
  case ":$PATH:" in
    *":$SCRATCH/node-lts/aktuell/bin:"*) ;;
    *) export PATH="$SCRATCH/node-lts/aktuell/bin:$PATH" ;;
  esac
fi
