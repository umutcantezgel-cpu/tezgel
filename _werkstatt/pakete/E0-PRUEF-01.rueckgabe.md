## GEÄNDERTE DATEIEN

Im Repo, alle innerhalb der Schreibrechte (10 geändert, 1 neu):
- `_werkstatt/werkzeuge/scratch.sh` (neu)
- `_werkstatt/werkzeuge/lib.mjs` (Konstante `SCRATCH`)
- `_werkstatt/werkzeuge/lighthouse.mjs` (frisches Profil je Lauf)
- `_werkstatt/werkzeuge/EINRICHTUNG.md`
- Feste Sitzungspfade ersetzt: `server.sh`, `reinraum.sh`, `dev-server.sh`, `pruefe-a.sh`, `build-vergleich.mjs`, `glyphen.mjs`, `briefing.mjs`
- Symlinks (gitignoriert): `_werkstatt/werkzeuge/node_modules` nach `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/werkzeuge-nm/node_modules`; `_werkstatt/cache` nach `…/scratchpad/werkstatt-cache` (vorher kein Eintrag)

Unverändert: `package.json`, `package-lock.json`, `AGENTS.md`, `src/`, `public/`, `test/`, `next.config.ts`.

## WAS UND WARUM

- Scratch-Regel: `RELAUNCH_SCRATCH`, sonst `SCRATCH`, sonst der zuletzt geänderte Ordner. `scratch.sh` und `lib.mjs` (Konstante `SCRATCH`) setzen sie; die Skripte binden `scratch.sh` ein. Fehlt alles, bricht es mit Meldung ab.
- `lighthouse.mjs`: Jeder Lauf, auch Aufwärm- und Wiederholungsläufe, startet Chrome neu mit leerem `userDataDir` unter `…/scratchpad/lh-profile/<lauf-nr>-<zeitstempel>`. Danach wird Chrome beendet und das Profil gelöscht. Neue Felder je Lauf: `profil`, `profil_pfad`, `profil_dateien`, `lcp_element` (Insight, Fallback Audit), `lcp`.
- `RELAUNCH_BELEGE` eingeführt, damit Lighthouse-Belege nicht ins Repo schreiben.
- `briefing.mjs` bezieht den Scratchpad-Pfad im Text dynamisch aus `lib.mjs`.

## GEMEINSAME DATEIEN

Keine Änderung nötig. Die offenen Punkte zu Branch und Chrome-Pfad stehen unter OFFENE FRAGEN.

## PRÜFUNG UND ERGEBNIS

- Pfadregel: `RELAUNCH_SCRATCH` gewinnt, dann `SCRATCH`, dann der neueste Ordner (e3298496). Ein ungültiger Pfad bricht mit ABBRUCH ab. `lib.mjs` liefert denselben Wert.
- `bash -n` (server, reinraum, dev-server, pruefe-a, scratch) und `node --check` (lib, lighthouse, build-vergleich, glyphen, briefing): alle ok.
- Schritt 1 `npm ci` (Wurzel): exit 0.
- Schritt 5 Werkzeuge: exit 0, Playwright 1.56.1. Alle acht Module aus `_werkstatt/werkzeuge` auflösbar, daher keine `package.json`-Änderung.
- Reinraum HEAD c53faf4: npm-ci 0 · build 0 · typecheck 0 · lint 0 · test 0 (fail 0) · qa-graph 0 · nft sauber.
- Produktion 4310: status OK, `/` 200, `/gibt-es-nicht` 404.
- Entwicklung 4320: status OK (erste Probe FEHLT während der Kompilierung), `/kontakt` 200.
- `AGENTS.md` nach dem Start von `next dev`: unverändert (`git diff` leer).
- Lighthouse-Probe `/`, mobil, ein gezählter Lauf (Einzelwert, kein Median, da so beauftragt): Leistung 88, LCP 3240 ms, TBT 237 ms, CLS 0, LCP-Element `div.mx-auto > div.relative > div.mt-8 > p.max-w-mass`, Benchmark-Referenz 1416.0.
- Profil des Laufs: `…/scratchpad/lh-profile/2-2026-10-23T21-44-12-658Z`, 20 Einträge vor dem Löschen. Danach ist `lh-profile` leer, und es blieb kein Chrome-Prozess des Laufs übrig.
- Selbstprüfung `git status`: 11 Einträge (10 geändert, 1 neu), alle in den Schreibrechten.
- Diffstat tracked: 10 Dateien, +150 / −67.

## BILDBELEGE

Keine Bilder erzeugt. Bildquelle (Schritt 8): Probe in `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/bildquelle-probe` ergab 84 Dateien mit denselben Namen wie `_eingang/entpackt` (84).

## OFFENE FRAGEN

1. Der Chrome-Standardpfad `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` fehlt. Vorhanden ist `/opt/pw-browsers/chromium-1243/chrome-linux64/chrome`. Die Probe lief mit `CHROME_PATH`. Soll der Standard geändert werden? Nicht geändert, weil das Briefing „Chrome-Pfad wie bisher“ verlangt.
2. Branch: Briefing und Checkout nennen `claude/tezgel-website-redesign-iqxt8z`. CLAUDE.md nennt `claude/amazing-mendel-b0g40w` als Arbeitsbranch. Welcher gilt?
3. Rückgabedatei: `_werkstatt/pakete/E0-PRUEF-01.rueckgabe.md` wurde nicht geschrieben. Sie liegt außerhalb der Schreibrechte, und die Systemvorgabe verbietet Berichtsdateien. Dieser Text ist die Rückgabe; bitte ablegen.
4. Nicht ausgeführt: eine Positivprobe gegen den bekannten Fehler (localStorage bleibt über Läufe). Belegt ist nur, dass Chrome das frische Profil nutzt (20 Einträge) und es danach gelöscht wird.
5. Der Audit-Fallback für das LCP-Element ist ungeprüft, weil der Insight-Pfad (`lcp-breakdown-insight`) griff.
6. Ohne `RELAUNCH_BELEGE` schreibt `lighthouse.mjs` nach `_werkstatt/belege` im Repo. Dort besteht kein Schreibrecht. Ob der Standard so bleibt, entscheidet der Orchestrator.
7. In `EINRICHTUNG.md` ersetzt c53faf4 den alten Build-Commit 745335f. Der Verweis auf den alten Sitzungspfad `dace07c4` ist durch die Pfadregel ersetzt.

=== ENDE E0-PRUEF-01 · BEREIT ZUR RÜCKGABE ===
