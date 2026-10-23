# E0-PRUEF-01

## 1. Kopfzeile
E0-PRUEF-01 · Rolle Prüfer · Modell Haiku 5.5 · Stufe 1 (Fleiß nach Checkliste) · Kern-Version: v2 (bis v3), Auftrag `_werkstatt/AUFTRAG.md` · Schreibrechte (exakt): `_werkstatt/werkzeuge/EINRICHTUNG.md`, `_werkstatt/werkzeuge/lib.mjs`, `_werkstatt/werkzeuge/scratch.sh` (neu), `_werkstatt/werkzeuge/lighthouse.mjs`, `_werkstatt/werkzeuge/package.json`, `_werkstatt/werkzeuge/package-lock.json`, jede Datei unter `_werkstatt/werkzeuge` mit festem Sitzungspfad (Liste im Bericht), Symlink `_werkstatt/werkzeuge/node_modules`, Symlink `_werkstatt/cache`, `$SCRATCH/**` · Umfang: Einrichtung, ein Reinraum-Build, zwei Server, eine Lighthouse-Probe

## 2. Rollenbriefing
Du bist **Prüfer**: Du richtest Werkzeuge ein, führst die Prüfungen deiner Stufe aus und berichtest knapp mit Belegpfaden.
- Gute Arbeit: Jede Aussage ist mit einem Befehl und seiner Ausgabe belegt; neue Werkzeuge haben eine Positivprobe, die zeigt, dass sie einen bekannten Fehler wirklich finden; Messungen sind Mediane, keine Einzelwerte.
- Die drei häufigsten Fehler: 1. Einzelmessung statt Median; 2. deuten statt berichten; 3. über die eigene Stufe hinaus prüfen oder ändern.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Richte Abhängigkeiten, Reinraum-Build, Produktions- und Entwicklungsserver und die Werkzeuge für diese Sitzung ein und stelle Lighthouse auf ein frisches Browserprofil je Lauf um.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js 16.3.6, React 19 und Tailwind 4 gebaut und wird über Vercel ausgeliefert.
2. Die Seite hat 170 Adressen: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Ziel dieses Laufs ist eine Seite, die jeder Laie ohne Hilfe versteht; Prüfstein ist eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will.
4. Echte Fotos, eine durchgehende Geschichte, ein Intro mit sich zeichnendem Logo und ein Seitenwechsel, bei dem sich Fliesen verlegen, heben die Gestaltung auf Award-Niveau.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.
(Fassung aus STATUS.md bis KERN v3; wortgleich in allen E0-Paketen.)

## 5. Kern-Auszug
- K-004 Stack und Konventionen (Auszug): Prüfwerkzeuge liegen nur in `_werkstatt/werkzeuge` mit eigener `package.json`; ihre `node_modules` liegen außerhalb des Repos im Scratchpad (Symlink). Jeder Browserlauf geht über `installSperre()` aus `lib.mjs` (Formulare nur an Attrappen, Dritt-Hosts gesperrt, G5). Nichts erkennt Prüfwerkzeuge, um sich anders zu verhalten (G7).
- K-013 Geräte und Budgets (Auszug): Gerätegrößen stehen in `_werkstatt/HAUPTANSICHTEN.json` unter `geraete` (10 Größen: m360 360×740, m390 390×844, m430 430×932, q844 844×390, t768 768×1024, t1024 1024×768, d1280 1280×800, d1440 1440×900, d1920 1920×1080, d2560 2560×1440). Budgets mobil, Median aus drei Läufen: LCP ≤ 2,5 s, CLS ≤ 0,1, TBT/INP ≤ 200 ms, Lighthouse mobil Leistung ≥ 90, Zugänglichkeit ≥ 95, Best Practices ≥ 95, SEO 100.
- K-014 Adressen (Auszug): Jede Adresse liefert 200 oder eine dauerhafte Weiterleitung; je Seite genau eine H1, Titel, Beschreibung, Canonical; strukturierte Daten gültig.

## 6. Maßstab
Vorlage ist `_werkstatt/werkzeuge/EINRICHTUNG.md` (Vorlauf). Gutachten zu Lighthouse: `_werkstatt/berichte/E0-GUT-02-b02-leistung.md` (Abschnitt „Vorab“ und Empfehlung 1: localStorage wird von Lighthouse nicht geleert).

## 7. Grenzen
- Nur die Dateien unter „Schreibrechte“ ändern oder anlegen; alles andere nur lesen. Fehler in fremden Dateien unter GEMEINSAME DATEIEN melden, nie beheben.
- Nie committen, nie pushen, nie `git checkout`/`reset`/`stash` im Repo. Nie Dateien unter `src/`, `public/`, `test/`, `next.config.ts` oder die `package.json` der Wurzel ändern.
- Keine `.env*`-Dateien lesen oder zitieren. Keine echten Formularsendungen, E-Mails, Anrufe oder WhatsApp-Nachrichten. Netzwerk nur für die npm-Registry.
- Ports: 4310 = Produktionsserver (Reinraum), 4320 = Entwicklungsserver. Fremde Prozesse nie beenden; `pkill -f next-server` ist verboten (trifft beide Server).
- Rechenintensives (Build, Lighthouse) nur nacheinander. Große Ausgaben (Bilder, Berichte von Lighthouse, Protokolle) nur nach `$SCRATCH` oder `_werkstatt/cache` (Symlink in den Scratchpad), nie ins Repo außer den genannten Belegdateien.
- Umgebung in jeder Shell: `export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`, `export RELAUNCH_SCRATCH="$SCRATCH"`, `export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.

## 8. Schritte
1. Lies `_werkstatt/werkzeuge/EINRICHTUNG.md` vollständig. Sie stammt aus dem Vorlauf; dort steht noch der alte Scratchpad-Pfad `dace07c4-…`.
2. **Scratchpad-Pfad als Variable.** Finde jede Datei unter `_werkstatt/werkzeuge` mit festem Sitzungspfad: `grep -rln "dace07c4\|/tmp/claude-0/-home-user-tezgel/[0-9a-f-]*/scratchpad" _werkstatt/werkzeuge --exclude-dir=node_modules`. Lege `_werkstatt/werkzeuge/scratch.sh` an (für Shell-Skripte, per `source` eingebunden) und exportiere in `_werkstatt/werkzeuge/lib.mjs` eine Konstante `SCRATCH` (für .mjs). Regel in beiden: `RELAUNCH_SCRATCH`, sonst `SCRATCH`, sonst der zuletzt geänderte Ordner `/tmp/claude-0/-home-user-tezgel/*/scratchpad` (`ls -td … | head -1`); fehlt alles, Abbruch mit klarer Meldung. Ersetze in jeder gefundenen Datei den festen Pfad durch diese Regel. Liste die Dateien im Bericht.
3. **Abhängigkeiten der Wurzel:** `npm --prefix /home/user/tezgel ci > "$SCRATCH/e0/npm-ci.log" 2>&1` (vorher `mkdir -p "$SCRATCH/e0"`). Exit-Code berichten.
4. **Werkzeug-Abhängigkeiten** genau nach EINRICHTUNG.md Schritt 5 (Installation, Verschieben nach `$SCRATCH/werkzeuge-nm/node_modules`, Symlink). Vorher prüfen, ob ein alter Symlink oder Ordner existiert, und die Stolperstein-Regel aus EINRICHTUNG.md beachten. Danach prüfen, ob diese Module aus `_werkstatt/werkzeuge` heraus auflösbar sind: `chrome-launcher`, `@babel/parser`, `@babel/traverse`, `magic-string`, `typescript`, `postcss`, `@tailwindcss/node` (z. B. `cd _werkstatt/werkzeuge && node -e "import('chrome-launcher').then(()=>console.log('ok'))"`). Nur wenn ein Modul NICHT auflösbar ist, trage es mit der Version aus der Wurzel-`package-lock.json` bzw. aus `node_modules/lighthouse/package.json` in `_werkstatt/werkzeuge/package.json` ein und installiere neu.
5. **Reinraum-Build:** `bash _werkstatt/werkzeuge/reinraum.sh HEAD`. Berichte aus `ergebnis.txt` je Stufe (npm ci, build, typecheck, lint, test, qa:graph) Exit-Code und, falls rot, die ersten 20 Fehlerzeilen. Das ist der E0-Ausgangswert für Z-02; nichts reparieren.
6. **Server:** `bash _werkstatt/werkzeuge/server.sh start HEAD` (4310), `server.sh status`, `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4310/` (erwartet 200) und `/gibt-es-nicht` (erwartet 404). Dann `bash _werkstatt/werkzeuge/dev-server.sh start` (4320) und `status`. Danach `git -C /home/user/tezgel diff --stat -- AGENTS.md`: Hat `next dev` AGENTS.md verändert, NICHT zurücksetzen, sondern den Diff im Bericht nennen (der Orchestrator committet die Auffrischung). Beide Server laufen lassen.
7. **Lighthouse mit frischem Profil je Lauf:** Ändere `_werkstatt/werkzeuge/lighthouse.mjs` so, dass jeder einzelne Lauf in einer neu gestarteten Chrome-Instanz mit neuem, leerem `userDataDir` unter `$SCRATCH/lh-profile/<lauf-nr>-<zeitstempel>` läuft (chrome-launcher `userDataDir`, Chrome-Pfad wie bisher). Nach dem Lauf Chrome beenden und das Profil löschen. Jeder Lauf schreibt zusätzlich `profil: "frisch"`, das LCP-Element (Selektor oder Ausschnitt aus dem Audit `largest-contentful-paint-element`) und die LCP-Zeit in das Ergebnis. Median aus drei Läufen bleibt. Probe: `--satz e0-probe --laeufe 1` nur für `/` mobil gegen 4310; berichte Leistung, LCP, LCP-Element und den Profilpfad des Laufs. Danach das Profil-Verzeichnis prüfen (leer bzw. gelöscht).
8. **EINRICHTUNG.md aktualisieren** (Stand, Node-Version, Playwright-Version, Build-Commit, Branch `claude/tezgel-website-redesign-iqxt8z`, neue Pfadregel, Ports). Füge oben einen Abschnitt „Schritt 0 · Bildquelle wiederherstellen“ ein: `mkdir -p /home/user/tezgel/_eingang/entpackt && git -C /home/user/tezgel archive 35af5cc _werkstatt/bilder/referenzen/originale | tar -x --strip-components=4 -C /home/user/tezgel/_eingang/entpackt && ls /home/user/tezgel/_eingang/entpackt | wc -l` (erwartet 84; vorher prüfen, ob die Dateien schon da sind). Führe diesen Befehl einmal als Probe in ein Testverzeichnis `$SCRATCH/bildquelle-probe` aus (nicht in `_eingang`, dort liegen die Dateien schon) und berichte die Zahl.
9. **Cache-Symlink:** `_werkstatt/cache` muss ein Symlink nach `$SCRATCH/werkstatt-cache` sein (in .gitignore). Ist er alt oder zeigt ins Leere, ersetze ihn (`ln -sfn`). Nimm ihn in EINRICHTUNG.md auf.

## 9. Schnellprüfung und Selbstprüfung
- `bash -n` für jedes geänderte Shell-Skript, `node --check` für jedes geänderte .mjs.
- Server 4310 und 4320 antworten; Lighthouse-Probe hat ein Ergebnis mit `profil: "frisch"`.
- Selbstprüfung: `git -C /home/user/tezgel status --porcelain` zeigt nur Dateien aus deinen Schreibrechten (dazu ggf. `AGENTS.md`, siehe Schritte, und den Symlink `_werkstatt/werkzeuge/node_modules`). Alle Mengen gezählt, alle offenen Punkte gelistet.

## 10. Ausgabeformular
Schreibe deinen Bericht nach `_werkstatt/pakete/E0-PRUEF-01.rueckgabe.md` UND gib ihn als letzte Antwort zurück, höchstens 600 Wörter, mit genau diesen Überschriften:
GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Letzte Zeile genau: `=== ENDE E0-PRUEF-01 · BEREIT ZUR RÜCKGABE ===`
