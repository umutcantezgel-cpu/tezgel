# EINRICHTUNG · Prüfwerkzeuge und Server (E0-PRUEF-01)

Stand 29.10.2026 (UM-E4-DOK): Laufzeit Node 24.x (`.nvmrc`, `engines`), npm 11.19.1, Next.js 16.4.3, React 19.3.1, TypeScript ~6.0.3, Tailwind CSS 4 (nach `package.json`). Prüfwerkzeuge: `@playwright/test` 1.64.1 (`_werkstatt/werkzeuge/package.json`). Der Container bringt Node v22.22.0 mit; Projekt und Werkzeuge laufen über Node 24, sobald Schritt 0 die LTS in den PATH legt. Ursprüngliche Einrichtung E0-PRUEF-01 (2026-10-23): Playwright 1.56.1 · Build-Commit c53faf4 (HEAD bei der Einrichtung) · Branch `claude/tezgel-website-redesign-iqxt8z` (Arbeitsbranch nach E-001) · Chromium: Der Standardpfad `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` fehlt auf diesem Host; vorhanden ist `/opt/pw-browsers/chromium-1243/chrome-linux64/chrome`. `lib.mjs` ermittelt das neueste `/opt/pw-browsers/chromium-*/chrome-linux*/chrome` selbst und setzt `CHROME_PATH`, falls die Variable fehlt; alle Werkzeuge, `playwright.config.mjs` und Lighthouse nutzen diesen Wert (E0-ORCH, nach E0-PRUEF-02a).

Voraussetzung: Die Dateiänderungen der Schritte 2–4 (Scratchpad-Regel in `scratch.sh` und `lib.mjs`, `server.sh`, `reinraum.sh`, `dev-server.sh`, `pruefe-a.sh`, `build-vergleich.mjs`, `glyphen.mjs`, `briefing.mjs`, `lighthouse.mjs`; `_werkstatt/werkzeuge/lib.mjs` Konstante `SCRATCH`) sind im Arbeitsbaum. Die Befehle unten ändern außer den genannten Pfaden keine Dateien im Repo.

## Schritt 0 · Bildquelle wiederherstellen

Die Originalbilder der Referenzen liegen im Commit 35af5cc unter `_werkstatt/bilder/referenzen/originale`. Nur ausführen, wenn `_eingang/entpackt` fehlt oder unvollständig ist (Prüfung vorher: `ls /home/user/tezgel/_eingang/entpackt | wc -l`):

    mkdir -p /home/user/tezgel/_eingang/entpackt && git -C /home/user/tezgel archive 35af5cc _werkstatt/bilder/referenzen/originale | tar -x --strip-components=4 -C /home/user/tezgel/_eingang/entpackt && ls /home/user/tezgel/_eingang/entpackt | wc -l

Erwartet: 84. Probe (E0-PRUEF-01, 2026-10-23): dieselbe Ausführung in ein Testverzeichnis (`$SCRATCH/bildquelle-probe`) ergab 84 Dateien mit identischen Namen wie in `_eingang/entpackt`. Dort liegen die Dateien bereits; nicht erneut in `_eingang` entpacken, wenn es schon 84 sind.

## Umgebung (in jeder neuen Shell setzen)

    source /home/user/tezgel/_werkstatt/werkzeuge/scratch.sh   # setzt SCRATCH und RELAUNCH_SCRATCH nach der Pfadregel
    export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
    export SHA=$(git -C /home/user/tezgel rev-parse --short HEAD)

Pfadregel (ersetzt die festen Sitzungspfade): `RELAUNCH_SCRATCH`, sonst `SCRATCH`, sonst der zuletzt geänderte Ordner `/tmp/claude-0/-home-user-tezgel/*/scratchpad` (`ls -td … | head -1`). Fehlt alles, bricht `scratch.sh` mit einer Meldung ab. Dieselbe Regel gilt in `lib.mjs` (Konstante `SCRATCH`) und in `server.sh`, `reinraum.sh`, `dev-server.sh`, `pruefe-a.sh` (jeweils `source` von `scratch.sh`). Auf diesem Stand (Sitzung e3298496): `SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`.

Nach jedem neuen Commit gilt eine neue `SHA`: Schritt 6 und Schritt 7 dann erneut ausführen.

## Schritt 0 · Laufzeit (Node-LTS, UM-E2-U01)

Das Projekt läuft auf Node 24.x (aktuelle LTS, `.nvmrc`, `engines` in `package.json`) mit npm 11.19.1 (`packageManager`). Der Container bringt Node 22 mit; die LTS kommt deshalb ins Scratchpad:

    mkdir -p "$SCRATCH/node-lts" && cd "$SCRATCH/node-lts"
    curl -fsSLO https://nodejs.org/dist/v24.22.1/node-v24.22.1-linux-x64.tar.xz
    curl -fsSL https://nodejs.org/dist/v24.22.1/SHASUMS256.txt | grep ' node-v24.22.1-linux-x64.tar.xz$' | sha256sum -c -
    tar -xJf node-v24.22.1-linux-x64.tar.xz && ln -sfn node-v24.22.1-linux-x64 aktuell
    export PATH="$SCRATCH/node-lts/aktuell/bin:$PATH" && node -v && npm -v

Erwartet: `v24.22.1` und `11.19.1`. `scratch.sh` stellt `node-lts/aktuell` an den Anfang von `PATH`, sobald es existiert; Reinraum, Server und Entwicklungsserver laufen dann auf der LTS. Vor jeder neuen LTS (zum Beispiel Node 26) prüfen: `curl -s https://nodejs.org/dist/index.json`, Feld `lts`.

npm 11.19 sperrt Install-Skripte von Abhängigkeiten, die nicht in `allowScripts` (`package.json`) stehen. Freigegeben ist nur `unrs-resolver@1.12.2` (prüft die mitgelieferte native Bindung, UM-E2-U01). Meldet `npm install` weitere Pakete, erst das Skript lesen, dann `npm install-scripts approve <paket>` oder `deny`.

## Schritt 1 · Repo-Abhängigkeiten (Repo-Wurzel)

    node --version
    mkdir -p "$SCRATCH/e0"
    npm --prefix /home/user/tezgel ci > "$SCRATCH/e0/npm-ci.log" 2>&1; echo "npm ci exit $?"

Ergebnis E0-PRUEF-01: `npm ci exit 0`.

## Schritt 5 · Werkzeug-Abhängigkeiten außerhalb des Repos

    mkdir -p "$SCRATCH/e0" "$SCRATCH/werkzeuge-nm" "$SCRATCH/npm-cache"
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm_config_cache="$SCRATCH/npm-cache" npm --prefix /home/user/tezgel/_werkstatt/werkzeuge ci > "$SCRATCH/e0/werkzeuge-npm-ci.log" 2>&1; echo "werkzeuge npm ci exit $?"
    mv /home/user/tezgel/_werkstatt/werkzeuge/node_modules "$SCRATCH/werkzeuge-nm/node_modules"
    ln -s "$SCRATCH/werkzeuge-nm/node_modules" /home/user/tezgel/_werkstatt/werkzeuge/node_modules
    npm --prefix /home/user/tezgel/_werkstatt/werkzeuge exec -- playwright --version

Erwartet: `Version 1.64.1` (E0-PRUEF-01 hatte 1.56.1). Ergebnis E0-PRUEF-01: `werkzeuge npm ci exit 0`, Playwright 1.56.1, Symlink `_werkstatt/werkzeuge/node_modules` gesetzt. Auflösbar aus `_werkstatt/werkzeuge`: chrome-launcher, @babel/parser, @babel/traverse, magic-string, typescript, postcss, @tailwindcss/node, lighthouse (keine Änderung an `package.json` nötig).

## Schritt 6 · Reinraum-Build (aus HEAD, nicht aus dem Arbeitsbaum)

    bash /home/user/tezgel/_werkstatt/werkzeuge/reinraum.sh HEAD

Dauer hier etwa 2 Minuten. Ergebnis: `$SCRATCH/werkstatt-cache/reinraum-$SHA/ergebnis.txt`. Je Stufe ein Log (`npm-ci.log`, `build.log`, `typecheck.log`, `lint.log`, `test.log`, `qa-graph.log`), ferner `routen.txt` und `nft-werkstatt.txt`. Der Build nutzt nur committete Dateien (`git archive HEAD`); Änderungen am Arbeitsbaum fließen nicht ein.

Ergebnis E0-PRUEF-01 (c53faf4): npm-ci 0 (24 s) · build 0 (45 s) · typecheck 0 (12 s) · lint 0 (27 s) · test 0 (fail 0) · qa-graph 0; nft-Prüfung „sauber“.

## Schritt 7 · Produktionsserver 127.0.0.1:4310

    bash /home/user/tezgel/_werkstatt/werkzeuge/server.sh start HEAD   # abgelöst per setsid, PID-Datei $SCRATCH/server-4310.pid
    bash /home/user/tezgel/_werkstatt/werkzeuge/server.sh status       # OK | FEHLT
    curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:4310/gibt-es-nicht   # erwartet 404

`server.sh stop` beendet die Prozessgruppe aus der PID-Datei und zusätzlich jeden `next-server`, dessen Arbeitsverzeichnis ein Reinraum-Build im SCRATCH ist (Dev-Server bleibt unberührt). Nach jedem neuen Commit: `reinraum.sh HEAD`, dann `server.sh start HEAD` (Orchestrator).

Stand E0-PRUEF-01: `server.sh start HEAD` (c53faf4) läuft, `status` OK, `/` 200, `/gibt-es-nicht` 404.

## Schritt 8 · Entwicklungsserver 127.0.0.1:4320 (Wächter)

    bash /home/user/tezgel/_werkstatt/werkzeuge/dev-server.sh start
    bash /home/user/tezgel/_werkstatt/werkzeuge/dev-server.sh status

`status` gibt `OK` oder `FEHLT` aus (HTTP-Probe auf `/`, Zeitlimit 60 s). Die erste Kompilierung kann länger dauern; dann `status` wiederholen (E0-PRUEF-01: erste Probe FEHLT, zweite Probe OK). Zusätzlich `/kontakt` prüfen (E0-PRUEF-01: 200). Stoppen: `bash /home/user/tezgel/_werkstatt/werkzeuge/dev-server.sh stop`.

Nach dem Start prüfen, ob `next dev` das Repo verändert hat:

    git -C /home/user/tezgel status --porcelain -- AGENTS.md

Ausgabe muss leer sein (siehe Stolpersteine). E0-PRUEF-01: leer, also keine Änderung an `AGENTS.md` durch den Start.

## Lighthouse · frisches Profil je Lauf

`lighthouse.mjs` startet für jeden Lauf (auch Aufwärm- und Wiederholungsläufe) eine neue Chrome-Instanz mit neuem, leerem `userDataDir` unter `$SCRATCH/lh-profile/<lauf-nr>-<zeitstempel>`. Nach dem Lauf wird Chrome beendet und das Profil gelöscht. Grund: localStorage bleibt sonst über Läufe erhalten (Gutachten E0-GUT-02-b02, „Vorab“).

Jeder Lauf schreibt zusätzlich `profil: "frisch"`, `profil_pfad` (Pfad des Profils) und `profil_dateien` (Anzahl der Einträge im Profil vor dem Löschen; 0 hieße: Chrome hat es nicht benutzt) sowie das LCP-Element (`lcp_element`) und die LCP-Zeit (`lcp`).

Aufruf (Chrome-Pfad auf diesem Host, Ausgabe nach Scratchpad):

    cd /home/user/tezgel/_werkstatt/werkzeuge && CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome RELAUNCH_BELEGE="$SCRATCH/belege" node lighthouse.mjs --satz e0-probe --laeufe 1 --seiten / --formen mobil

`RELAUNCH_BELEGE` setzt das Ausgabeverzeichnis (Standard `_werkstatt/belege`, sonst würde jeder Lauf ins Repo schreiben). Probe E0-PRUEF-01 (Start, 4310, Seite `/`, mobil, 1 gezählter Lauf): Leistung 88, LCP 3240 ms, TBT 237 ms, CLS 0; LCP-Element `div.mx-auto > div.relative > div.mt-8 > p.max-w-mass`; `profil_dateien` 20 vor dem Löschen; danach `$SCRATCH/lh-profile` leer, kein Chrome-Prozess des Laufs übrig. Ergebnis: `$SCRATCH/belege/e0-probe/lighthouse.json`.

## Seitenzahl (Stand 29.10.2026, Arbeitsbaum)

Ergebnis: 169 öffentliche Seiten, dazu die interne Seite `/login` (nicht im Sitemap, per `robots.ts` gesperrt). Die Zahl steht auch in `README.md`.

- **Methode 1, Sitemap:** `src/app/sitemap.ts` liefert 164 eindeutige Adressen. Gezählt mit Node 24 und dem Ladehaken des Projekts (`node --import ./test/register-hooks.mjs`). Eine Kopie der Datei ließ die Zeile `import { MetadataRoute } from 'next'` weg, weil sie nur einen Typ liefert und Node sie sonst als Wert lädt. Davon sind 64 statische Seiten und 100 Adressen aus den Datenlisten (Leistungen mal Orte, Ortsseiten, Musterbäder, Referenzen, Ratgeber).
- **Methode 2, `src/app`:** 76 Dateien `page.*` (tsx, ts, jsx oder js) außerhalb von `api/`. Die Dateien `page.dev.tsx` (Schaufenster) zählen nicht: `next.config.ts` nimmt sie nur im Entwicklungsbetrieb. Davon 70 statisch und 6 mit dynamischen Segmenten (`[slug]`, `[id]`, `[stadt]`, `[id]/[stadt]`).
- **Ergebnis:** 164 Sitemap-Adressen plus fünf Rechtsseiten ohne Sitemap-Eintrag (`/agb`, `/cookie-richtlinie`, `/datenschutz`, `/impressum`, `/widerruf`) ergibt 169. Die 70 statischen Seiten aus Methode 2 bestehen aus 64 Sitemap-Seiten und den sechs Seiten ohne Sitemap-Eintrag (fünf Rechtsseiten und `/login`).
- **Abweichung:** `_werkstatt/KERN.md` nennt 168 Seiten (202 Adressen = 168 Seiten, 2 Weiterleitungen, 32 entfernte). Die Zählung hier liegt um eine Seite höher: Die E0-Zählung (168) kannte `/preise` noch nicht, die Seite kam am 25.10. in die Sitemap.

## Prüfwerkzeuge in `_werkstatt/werkzeuge/` (Stand 29.10.2026)

Die Liste nennt den Zweck aus dem Kopf jeder Datei. Steuerwerkzeuge des Werkstatt-Laufs (`kontingent.mjs`, `briefing.mjs`, `commit.sh`) stehen nicht hier.

| Werkzeug | Zweck |
|---|---|
| `bildsatz.mjs` | Bildsatz je Seite und Gerät, für vorher und nachher gleich. `--png` speichert verlustfrei als PNG statt JPEG q70 (E-087). `--ersatzpfad` schaltet Scroll-Animationen ab. |
| `abschnitte.mjs` | Abschnittsbilder: erster Bildschirm und jeder Abschnitt einer Seite als JPEG. |
| `einzelbild.mjs` | Prüfstufe A: je Ansicht ein JPEG einer Seite, dazu HTTP-Status. |
| `ueberlappung.mjs` | Prüfstufe A: sichtbarer Text unter fixierten oder klebenden Elementen. |
| `pruefe-a.sh` | Prüfstufe A für geänderte Dateien: Typprüfung, Lint, Funktionstests, Einzelbilder, Textvergleich. |
| `fotos.mjs` | Darstellung auf Bildschirmhöhe, Konsolenfehler und Überlauf (Ebene 3). |
| `reaktion.mjs` | Reaktionszeit (INP-Näherung) je Hauptansicht (Z-08). |
| `erstesbild.mjs` | Prüfung „Erstes Bild“ (K-002, K-009, K-013). |
| `lighthouse.mjs` | Lighthouse mobil und Desktop, Median aus den gezählten Läufen (Ebene 6). |
| `axe.mjs` | axe-core je Seite und Zustand, etwa offenes Menü oder Einwilligungsbanner (Ebene 5). |
| `statisch.mjs` | Werte, Icon-Familien, Platzhalter und Slop-Muster als Zählung mit Fundstellen (Ebene 8). |
| `werte.mjs` | Werte außerhalb des Designsystems in geänderten Dateien (Z-03). |
| `svg.mjs` | SVG-Prüfung: SVGO, eingebettete Pixelbilder, viewBox und Budgets (Z-06). |
| `sprite.mjs` | Erzeugt das Icon-Sprite aus `src/components/icons/svg/` (KERN K-009, Formsystem). |
| `texte.mjs` | Text- und SEO-Invarianten je Seite (Ebene 7). |
| `texte-vergleich.mjs` | Vergleicht zwei Textstände; entfernte Zeilen sind möglicher Inhaltsverlust. |
| `textpruefung.mjs` | Textprüfung nach K-010 und K-011 im Format der Referenztexte. |
| `lesbarkeit.mjs` | Lesbarkeit und Zeichen über die gerenderte Seite. |
| `glyphen.mjs` | Glyphenabdeckung der Textfelder eines Satzes. |
| `jsonld.mjs` | Strukturierte Daten je Seite, nur HTTP. |
| `adressen.mjs` | Adress- und Linkprüfung (K-014), nur HTTP. |
| `meta.mjs` | Titel und Meta-Beschreibung je Seite (E-050). |
| `bilder.mjs` | Bildbestand; mit `--pruefe` die Metadaten ausgelieferter Bilder. |
| `textprobe.cjs` | Textvergleich vor Stufe A. |
| `bezeichner.cjs` | Bezeichner-Probe; Pflicht bei jeder Zerlegung laut Kopf der Datei. |
| `pixelvergleich.mjs` | Pixelvergleich zweier Server, Seite für Seite und Größe für Größe. |
| `build-vergleich.mjs` | Vergleicht zwei Reinraum-Builds: HTML und CSS-Selektoren. |
| `bewegung.mjs` | Bewegungsprüfung in vier Modi (Kopf der Datei nennt sie). |
| `probelauf.mjs` | Fernsteuerung für Probeläufe mit den fünf Besucheraufgaben (K-002). |
| `brotli-proxy.mjs` | Brotli-Vorschalter für Leistungsmessungen (E-085). |
| `reinraum.sh` | Build aus einem Commit in einer eigenen Kopie, nur committete Dateien. |
| `server.sh` | Produktionsserver auf Port 4310 aus dem Reinraum-Build. |
| `dev-server.sh` | Entwicklungsserver auf Port 4320 mit Wächter. |
| `live-rauchtest.sh` | Rauchprüfung nach dem Push, nur lesend. |
| `vercel-status.sh` | Wartet auf den Vercel-Status eines Commits (alle 20 s, höchstens 10 min). |
| `lib.mjs`, `playwright.config.mjs`, `tests/`, `tests-logik/` | Gemeinsame Bausteine und Playwright-Konfiguration; `tests/` ist die Funktionssuite, `tests-logik/` die Logiktests (`node --test`). |

Häufige Aufrufe, jeweils aus `_werkstatt/werkzeuge/`:

    PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node bildsatz.mjs --satz NAME --hauptansichten --png
    bash reinraum.sh HEAD
    bash server.sh start HEAD

`bildsatz.mjs` braucht den Produktionsserver auf 127.0.0.1:4310 (Standard in `lib.mjs`) und die Browser-Variable aus Schritt „Umgebung“. Ohne `--png` speichert es JPEG q70.

Entfernte und ersetzte Bewegungsteile (Eingang statt Intro, Vorhang entfernt, Schalter, Takt, Cursor) stehen in `README.md` im Abschnitt „Bewegung: entfernt, ersetzt, neu“. Quelle ist `ENTSCHEIDUNGEN.md`.

## Ports, Logs, PID-Dateien

| Dienst | Port | Läuft aus | Log | PID |
|---|---|---|---|---|
| Produktion (`server.sh`, nach Ablösung) | 4310 | `$SCRATCH/reinraum-$SHA` (Kopie von HEAD) | `$SCRATCH/server-$SHA-4310.log` | keine Datei; PID über `pgrep -f next-server` und `/proc/<PID>/cwd` (PID-Datei `$SCRATCH/server-4310.pid` wird bei `start` geschrieben) |
| Entwicklung (`dev-server.sh`) | 4320 | Repo-Wurzel `/home/user/tezgel` | `$SCRATCH/dev-4320.log` | `$SCRATCH/dev-4320.pid` (PID des Wächters = Prozessgruppe) |
| Reinraum-Build | – | `$SCRATCH/reinraum-$SHA` | `$SCRATCH/werkstatt-cache/reinraum-$SHA/` | – |
| Lighthouse-Profile | – | `$SCRATCH/lh-profile/<lauf-nr>-<zeitstempel>` | – | – (nach jedem Lauf gelöscht) |

## Cache-Symlink

`/home/user/tezgel/_werkstatt/cache` ist ein Symlink nach `$SCRATCH/werkstatt-cache` (in `.gitignore`: `/_werkstatt/cache`). Anlegen oder ersetzen, falls alt oder ins Leere zeigend:

    mkdir -p "$SCRATCH/werkstatt-cache" && ln -sfn "$SCRATCH/werkstatt-cache" /home/user/tezgel/_werkstatt/cache

Stand E0-PRUEF-01: angelegt (vorher kein Eintrag vorhanden).

## Stolpersteine
- `git add` mit einem Pfad, den es nicht mehr gibt (gelöschter Ordner), bricht ganz ab („pathspec did not match“); ein folgendes `git commit` nimmt dann nur, was schon vorgemerkt war (zweimal in E2-ORCH-09, Nachtrags-Commits 05af18e und e33c42c). Gelöschte Dateien mit `git rm` vormerken und nur vorhandene Pfade an `git add` geben, oder `git add -u` für Änderungen und Löschungen.
- `npx prettier --write` ohne Projektkonfiguration formt Dateien in einen fremden Stil um (doppelte Anführungszeichen, 80 Zeichen); das Projekt hat keine Prettier-Vorgabe, nicht verwenden.

- Der Scratchpad-Pfad ist sitzungsgebunden. Keine festen Sitzungspfade mehr in den Werkzeugen: `scratch.sh`, `lib.mjs` und die Skripte lesen `RELAUNCH_SCRATCH`, sonst `SCRATCH`, sonst den zuletzt geänderten Scratchpad-Ordner. Ein Lauf in einer neuen Sitzung braucht keine Änderung, nur `RELAUNCH_SCRATCH`, falls mehrere Scratchpads existieren.
- Schritt 5 nicht wiederholen, ohne vorher aufzuräumen: Existiert `$SCRATCH/werkzeuge-nm/node_modules` schon, verschiebt `mv` den neuen Ordner hinein statt ihn zu ersetzen. Vorher `rm -rf "$SCRATCH/werkzeuge-nm/node_modules"` und den Symlink `_werkstatt/werkzeuge/node_modules` entfernen.
- `_werkstatt/werkzeuge/node_modules` ist ein Symlink. `.gitignore` enthält `/_werkstatt/werkzeuge/node_modules` (ohne Schrägstrich am Ende), daher erscheint der Symlink nicht in `git status` (E0-PRUEF-01 geprüft).
- `server.sh stop` hat den Prozess `next-server` nicht beendet (geprüft: Port 4310 antwortete danach weiter). `server.sh start` nutzt dasselbe Muster. Ein alter Server bliebe dann auf 4310 und lieferte seinen Build weiter aus. Das ist aus dem Code abgeleitet, nicht geprüft. Deshalb vor jedem Neustart die Ablösung aus Schritt 7 ausführen und den Port prüfen.
- Dev- und Produktionsserver heißen beide `next-server`. `pkill -f next-server` würde also beide treffen. Die PID immer über das Arbeitsverzeichnis wählen.
- `next dev` schreibt beim Start den Block `nextjs-agent-rules` in `AGENTS.md` um (Diff: 5 Zeilen ergänzt, 1 entfernt). Das ist eine Änderung an einer versionierten Datei. E0 hat `AGENTS.md` nach dem Start mit `git show HEAD:AGENTS.md` wiederhergestellt. Dauerhaft abstellen lässt sich das nur über `agentRules: false` in `next.config.ts` (Repo-Konfiguration, nicht von E0 geändert). Auf HEAD c53faf4 hat der Start von `next dev` `AGENTS.md` nicht verändert.
- `next dev` legt `next-env.d.ts` in der Repo-Wurzel an. Die Datei ist gitignored, liegt aber außerhalb der Schreibliste.
- `next dev` (4320) und `next build` teilen sich `.next` in der Repo-Wurzel. Solange der Dev-Server läuft, dort kein `next build` ausführen. Der Reinraum baut in einer eigenen Kopie und ist davon nicht betroffen.
- `npm test` des Projekts braucht Node ≥ 22.6; seit UM-E2-U01 läuft es auf Node 24.22.1 (Schritt 0).
- Playwright ohne `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` findet keinen Browser. Playwright 1.64.1 erwartet `chromium-1248`, der Host hat `chromium-1243` (in E0: 1.56.1 mit `chromium-1194`); gelöst über die Ermittlung in `lib.mjs` (`CHROME`); eine gesetzte Variable `CHROME_PATH` geht vor.
- Rauchprobe (nur dieser eine Test, nicht die ganze Suite): Testfall 3 je Projekt schickt einen POST an `/api/anfrage` des lokalen Servers (Option `echteRoute`). Der Testname nennt den Mock-Modus ohne Mail-Zugang. Vor einer Wiederholung bestätigen, dass der Server so läuft.

    cd /home/user/tezgel/_werkstatt/werkzeuge && RELAUNCH_BASE=http://127.0.0.1:4310 RELAUNCH_OUTPUT="$SCRATCH/e0/pw-out" RELAUNCH_REPORT="$SCRATCH/e0/pw-hero.json" npx playwright test tests/funktion-hero-kontakt.spec.mjs --workers=1

## Funktionssuite im Etappentor (ab Playwright 1.63, E-076)
Die Suite läuft im Tor zweimal gegen denselben Produktionsbau; beide Läufe müssen grün sein (Stand E-084, 28.10.2026: je 398 bestanden, 0 rot, 26 übersprungen):

    cd /home/user/tezgel/_werkstatt/werkzeuge
    RELAUNCH_BASE=http://127.0.0.1:<Port> RELAUNCH_REPORT="$SCRATCH/<paket>/suite.json" RELAUNCH_OUTPUT="$SCRATCH/<paket>/out" npx playwright test
    RELAUNCH_BEWEGUNG=an RELAUNCH_BASE=http://127.0.0.1:<Port> RELAUNCH_REPORT="$SCRATCH/<paket>/suite-bewegung.json" RELAUNCH_OUTPUT="$SCRATCH/<paket>/out-bewegung" npx playwright test

- Ohne Variable gilt `reducedMotion: 'reduce'` aus `playwright.config.mjs`. Mit `RELAUNCH_BEWEGUNG=an` gilt `no-preference`, also der Zustand, in dem die Suite bis Playwright 1.62 tatsächlich lief: Bis dahin wirkte die Einstellung nicht (Probe: `matchMedia('(prefers-reduced-motion: reduce)')` meldete `false`).
- Fremde Navigationen (WhatsApp, externe Links) bricht die Sperre in `lib.mjs` als `aborted` ab. Ab Playwright 1.64.0 bleibt eine mit 204 beantwortete Navigation offen, und `click()` wartet bis zur Zeitüberschreitung. `blockedbyclient` zeigt die Chrome-Fehlerseite. Subressourcen erhalten weiter 204.

## Hinweise (Orchestrator, nach E0-PRUEF-01)
- `next dev` (ab 16.3, heute 16.4.3) pflegt in `AGENTS.md` einen verwalteten Block (`<!-- BEGIN:nextjs-agent-rules -->`); laut `node_modules/next/dist/docs/01-app/02-guides/ai-agents.md` wird die Auffrischung mit committet (kein `agentRules: false`).
- `.gitignore` enthält `/_werkstatt/werkzeuge/node_modules` (Symlink, daher ohne Schrägstrich).
- Die Anfrage-Route läuft ohne Mail-Zugang im Mock-Modus – Testläufe gegen die echte Route versenden nichts.

## Variante mit Platzhalter-Analyse-ID (Tracking-Test, Port 4311)
Für `funktion-tracking.spec.mjs` (Tracking erst nach Einwilligung) wird derselbe Stand zusätzlich mit einer
Platzhalter-Kennung gebaut (keine echte Kennung, keine echte Anfrage – die Werkzeuge sperren Fremd-Hosts):

```bash
S=<Scratchpad>
REINRAUM_DIR=$S/reinraum-ga-<commit> NEXT_PUBLIC_GA4_ID=G-TEST000000 bash _werkstatt/werkzeuge/reinraum.sh <commit> $S/reinraum-ga-log
PORT=4311 REINRAUM_DIR=$S/reinraum-ga-<commit> bash _werkstatt/werkzeuge/server.sh start <commit>
RELAUNCH_BASE=http://127.0.0.1:4311 RELAUNCH_TRACKING=1 npx playwright test funktion-tracking.spec.mjs --workers=1
```
`server.sh stop` beendet nur den Server des jeweiligen Ports (Verzeichnis in `server-<Port>.dir`).

## Logik-Tests der Werkzeuge
    cd /home/user/tezgel/_werkstatt/werkzeuge && node --test tests-logik/*.test.mjs
(Node 22 nimmt bei `--test` keinen Ordner; der Glob muss ausgeschrieben sein, E-016.)

## Entwicklungsserver und globals.css (E-026)
Der Entwicklungsserver (Turbopack, `next dev` auf 4320) übernimmt Inhaltsänderungen an `src/app/globals.css` nicht zuverlässig: Das Bündel wird neu geschrieben, enthält aber den alten Stand. Nach jeder Änderung an `globals.css`:

    _werkstatt/werkzeuge/dev-server.sh stop && rm -rf .next/dev && _werkstatt/werkzeuge/dev-server.sh start
    for u in $(curl -s http://127.0.0.1:4320/ | grep -o '/_next/static/chunks/[^"]*\.css' | sort -u); do curl -s "http://127.0.0.1:4320$u" | grep -c '<Marke aus der Änderung>'; done


## Produktionsserver vor Messreihen (E-034)
Der Bildoptimierer von `next start` kann nach vielen Läufen mit abgebrochenen Anfragen hängen: ungecachte Breiten von `/_next/image` antworten nicht, das `load`-Ereignis kommt nie (Werkzeuge melden „waitForLoadState: Timeout“). Vor jeder Messreihe neu starten und prüfen:

    PORT=4311 bash _werkstatt/werkzeuge/server.sh stop; PORT=4311 REINRAUM_DIR=$SCRATCH/reinraum-<sha> bash _werkstatt/werkzeuge/server.sh start <sha>
    curl -s -o /dev/null -m 15 -w '%{http_code} %{time_total}\n' -H 'Accept: image/avif,image/webp,*/*' 'http://127.0.0.1:4311/_next/image?url=%2Fimages%2Farbeiten%2Fbad%2Fhelles-bad-glasdusche-holzoptik.jpg&w=1080&q=75'
    curl -s -o /dev/null -m 10 -w 'logo %{http_code} %{time_total}\n' -H 'Accept: image/avif,image/webp,*/*' 'http://127.0.0.1:4311/_next/image?url=%2Fimages%2Flogo%2Ftezgel-logo.webp&w=256&q=75'

Auch schon gecachte Breiten können hängen (E-041: nach zehn Lighthouse-Läufen antwortete das Kopf-Logo in 256 px nicht mehr, 384 px sofort; alle 354 Funktionsprüfungen liefen danach in Zeitüberschreitung). Darum vor jedem Lauf der Funktionsprüfungen und nach jeder Lighthouse-Reihe neu starten und das Logo mitprüfen; Funktionsprüfungen nie direkt nach Lighthouse ohne Neustart.
