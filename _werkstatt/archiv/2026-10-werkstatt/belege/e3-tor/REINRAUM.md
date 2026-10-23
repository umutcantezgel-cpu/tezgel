# E3-PRUEF-R: Reinraum am E3-Tor

**Stand:** Commit `8debc92`, Lauf am 2026-10-11. Prüfer: Arbeitsmodell (keine Quell-, Test- oder Werkzeugdateien geändert, kein Commit, kein Push).

**Pfade:**
- Reinraum-Build: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/reinraum-8debc92`
- Logs: `/home/user/tezgel/_werkstatt/belege/e3-tor/reinraum/`
- Server-Logs: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/server-8debc92-4310.log` und `...-4312.log`

## 1. Reinraum-Lauf

`ergebnis.txt` (wörtlich):

```
commit 8debc92
npm-ci 0 (21s)
build 0 (46s)
typecheck 0 (19s)
lint 0 (39s)
test 0 (2s)
qa-graph 0 (0s)
nft: sauber
```

Alle Stufen mit Exit 0. Keine Stufe fehlgeschlagen, daher kein Fehler-Log zu zitieren.

Einzelbefunde:
- **npm-ci:** `added 480 packages in 21s`.
- **build:** Routenliste erzeugt (`routen.txt`). Proxy (Middleware) ƒ, statische Seiten ○, SSG ●, dynamische API-Routen ƒ (`/api/anfrage`, `/api/indexnow`).
- **typecheck:** `tsc --noEmit` ohne Ausgabe, Exit 0.
- **lint:** `eslint` ohne Meldungen, Exit 0.
- **qa-graph:** 4 Prüfungen ✓ (Germany Country Q183, Google SERP Stern-Filter, 3-stufige lokale SEO-Pyramide, Site-Config-Konstanten). Ergebnis: `[QA SUCCESS] ... 0 errors`.

## 2. Tests (`test/…`, Node-Test-Runner, TAP)

- **Bestanden: 37**
- **Fehlgeschlagen: 0**
- Abgebrochen: 0, übersprungen: 0, todo: 0
- Dauer laut TAP-Summe: 1378,8 ms (Stufe meldet 2 s)

## 3. nft-Befund

`nft: sauber`. Das Skript hat 87 `*.nft.json`-Dateien unter `.next/server` geprüft. Die Suche nach `_relaunch` oder `_werkstatt` war ohne Treffer, `nft-werkstatt.txt` ist deshalb leer. Die Prüfung war nicht leer: es wurden 87 Dateien gescannt.

## 4. Schritt 2: Server 4310 auf den neuen Build

Befehl: `PORT=4310 ./server.sh start 8debc92`

Ausgabe:
```
läuft: 8debc92 auf 4310
```

Prüfung:
- `GET http://127.0.0.1:4310/` → **200**
- `GET http://127.0.0.1:4310/gibt-es-nicht` → **404**

## 5. Schritt 3: Nachweis der Stop-Korrektur (zwei Ports, derselbe Build)

Ablauf:
1. `PORT=4312 ./server.sh start 8debc92` → Ausgabe `läuft: 8debc92 auf 4312`
2. vor dem Stop: `4312 /` → **200**, `4310 /` → **200**
3. `PORT=4312 ./server.sh stop` → Ausgabe `gestoppt`, Exit 0
4. nach dem Stop: `4312 /` → **000** (kein 200, Verbindung verweigert), `4310 /` → **200**

Ergebnis: Der Stop von 4312 hat 4310 nicht beendet. Die Korrektur in `server.sh` wirkt.

## 6. Schritt 4: Entwicklungsserver 4320

Nicht angefasst, es wurde kein Befehl gegen 4320 gesendet, außer der lesenden Abfrage nach dem Lauf. Ergebnis dieser Abfrage: `4320 /` → **000** (nicht erreichbar). Vor dem Lauf wurde 4320 nicht geprüft, daher ist nicht belegt, ob er vorher lief.

## Offen / Hinweise

- Port 4310 läuft nach dem Lauf weiter mit Build `8debc92` (wie beauftragt, nicht gestoppt).
- Der Befund zu 4320 ist eine Beobachtung, keine Änderung durch diesen Lauf.
