# E3-PRUEF-R2: Reinraum am E3-Tor (Anlauf 2)

**Stand:** Commit `adacabf`, Lauf am 2026-10-12. Prüfer: Arbeitsmodell (keine Quell-, Test- oder Werkzeugdateien geändert, keine Erlaubnisliste geändert, kein Commit, kein Push, Entwicklungsserver 4320 nicht angefasst).

**Pfade:**
- Reinraum-Build: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/reinraum-adacabf`
- Logs: `/home/user/tezgel/_werkstatt/belege/e3-tor-2/reinraum/`
- Rohausgaben: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/belege-roh/e3-tor-2/` (Lauf-Ausgabe, Start-Ausgabe, Schritt-2-Prüfung, Server-Log)
- Server-Log: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/server-adacabf-4310.log`

## 1. Reinraum-Lauf

`ergebnis.txt` (wörtlich):

```
commit adacabf
npm-ci 0 (21s)
build 0 (53s)
typecheck 0 (21s)
lint 0 (43s)
test 0 (2s)
qa-graph 0 (0s)
```

Die Zeile `nft: sauber` steht nicht in `ergebnis.txt`, sondern auf der Konsole des Skripts (Ausgabe des Laufs: `nft: sauber`). Alle Stufen mit Exit 0. Keine Stufe fehlgeschlagen, daher kein Fehler-Log zu zitieren.

Einzelbefunde:
- **npm-ci:** `added 480 packages in 21s`.
- **build:** Routenliste erzeugt (`routen.txt`). Legende im Build-Log: `●` (SSG) vorgerendert als statisches HTML, `ƒ` (Dynamic) serverseitig bei Abruf.
- **typecheck:** `tsc --noEmit` ohne Ausgabe, Exit 0.
- **lint:** `eslint` ohne Meldungen, Exit 0.
- **qa-graph:** 4 Prüfungen ✓ (Germany Country Q183, Google SERP Stern-Filter, 3-stufige lokale SEO-Pyramide, Site-Config-Konstanten). Ergebnis: `[QA SUCCESS] All Knowledge Graph, Linked Data & Schema checks passed with 0 errors.`

## 2. Tests (Node-Test-Runner, TAP, `test.log`)

- **Bestanden: 37**
- **Fehlgeschlagen: 0**
- Abgebrochen: 0, übersprungen: 0, todo: 0
- Dauer laut TAP-Summe: 1550,0 ms (Stufe meldet 2 s)

## 3. nft-Befund

`nft: sauber`. Das Skript hat 87 `*.nft.json`-Dateien unter `.next/server` geprüft (Gegenprobe per Zählung: 87 Dateien, 0 Treffer für `_relaunch` oder `_werkstatt`). `nft-werkstatt.txt` ist leer (0 Zeilen). Die Prüfung war nicht leer.

## 4. Schritt 2: Server 4310 auf den neuen Build

Vor dem Stop: `PORT=4310 ./server.sh status` → `OK`; Verzeichnisdatei zeigte noch den Vorlauf-Build `reinraum-8debc92` (Anlauf 1).

Befehle und Ausgaben:

```
$ PORT=4310 ./server.sh stop
gestoppt                         (Exit 0)
$ PORT=4310 ./server.sh start adacabf
läuft: adacabf auf 4310          (Exit 0)
```

Prüfung per HTTP:
- `GET http://127.0.0.1:4310/` → **200**
- `GET http://127.0.0.1:4310/gibt-es-nicht` → **404**

Prüfung per Prozesse (ps und /proc):
- Hauptprozess `npm exec next start -H 127.0.0.1 -p 4310`, PID 15630 (PGID 15630), cwd `.../reinraum-adacabf`.
- Kind-Prozesse `sh -c next start …` (PID 15644) und `next-server (v16.3.6)` (PID 15645), beide cwd `.../reinraum-adacabf`, gleiche PGID 15630.
- Der Listener auf Port 4310 (Socket-Inode 1014143) gehört zu PID 15645 mit cwd `.../reinraum-adacabf`. Dass 4310 aus dem Reinraum-Ordner von `adacabf` läuft, ist damit belegt.
- Der alte Prozess aus `reinraum-8debc92` ist durch den Stop beendet worden (nicht mehr in der Prozessliste).
- Start-Log: `▲ Next.js 16.3.6 · Local: http://127.0.0.1:4310 · ✓ Ready in 252ms`.

Hinweis zum Stop: `server.sh stop` hat laut Skript nur den Port 4310 und Prozesse aus Reinraum-Ordnern beendet, deren Verzeichnis nicht zu einem anderen Port gehört. Ein Prozess mit cwd `/home/user/tezgel` (PID 3498, Port 4320, Entwicklungsserver) blieb unberührt.

## 5. Schritt 4: Entwicklungsserver 4320

Nicht angefasst, es wurde kein Befehl gegen 4320 gesendet außer der lesenden Abfrage. Ergebnis: `4320 /` → **200** (erreichbar). Der Listener auf 4320 (Socket-Inode 652807) gehört zu PID 3498 mit cwd `/home/user/tezgel`, Start 00:44:32. Im Anlauf 1 war 4320 nach dem Lauf nicht erreichbar (000); hier wurde nichts geändert, der Unterschied ist eine Beobachtung und keine Folge dieses Laufs.

## Offen / Hinweise

- Port 4310 läuft mit Build `adacabf` weiter (wie beauftragt, nicht gestoppt).
- Die Rohausgaben von Lauf und Start liegen im Scratchpad unter `belege-roh/e3-tor-2/`.
