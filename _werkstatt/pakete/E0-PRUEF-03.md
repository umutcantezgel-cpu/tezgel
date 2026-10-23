# E0-PRUEF-03

## 1. Kopfzeile
E0-PRUEF-03 · Rolle Prüfer · Modell Haiku 5.5 · Stufe 1 (Messung nach Checkliste) · Kern-Version: v2 (bis v3), Auftrag `_werkstatt/AUFTRAG.md` · Schreibrechte (exakt): `_werkstatt/belege/e0/**` (neu: STUFE-B.md, lighthouse.json, erstes-bild.json, axe.json, lesbarkeit.*, bildsatz.json, konsole.json), `_werkstatt/bilder/e0/**` (≤ 120 Bilder), `$SCRATCH/E0-PRUEF-03/**` · Umfang: 12 Hauptansichten × 10 Geräte (Bildsatz, Erstes Bild), 12 × 2 × 3 Lighthouse-Läufe, alle Adressen für Lesbarkeit, 13 Funktionsspecs

## 2. Rollenbriefing
Du bist **Prüfer**: Du richtest Werkzeuge ein, führst die Prüfungen deiner Stufe aus und berichtest knapp mit Belegpfaden.
- Gute Arbeit: Jede Aussage ist mit einem Befehl und seiner Ausgabe belegt; neue Werkzeuge haben eine Positivprobe, die zeigt, dass sie einen bekannten Fehler wirklich finden; Messungen sind Mediane, keine Einzelwerte.
- Die drei häufigsten Fehler: 1. Einzelmessung statt Median; 2. deuten statt berichten; 3. über die eigene Stufe hinaus prüfen oder ändern.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Erhebe die Ausgangswerte aller Prüfungen der Stufe B auf dem alten Stand, damit jedes Kriterium einen Vorher-Wert hat.

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
Auftrag Abschnitt 14 (Stufe B) und die Ergänzung (Rest von Stufe B); Werkzeuge in `_werkstatt/werkzeuge` (EINRICHTUNG.md); Budgets in K-013.

## 7. Grenzen
- Nur die Dateien unter „Schreibrechte“ ändern oder anlegen; alles andere nur lesen. Fehler in fremden Dateien unter GEMEINSAME DATEIEN melden, nie beheben.
- Nie committen, nie pushen, nie `git checkout`/`reset`/`stash` im Repo. Nie Dateien unter `src/`, `public/`, `test/`, `next.config.ts` oder die `package.json` der Wurzel ändern.
- Keine `.env*`-Dateien lesen oder zitieren. Keine echten Formularsendungen, E-Mails, Anrufe oder WhatsApp-Nachrichten. Netzwerk nur für die npm-Registry.
- Ports: 4310 = Produktionsserver (Reinraum), 4320 = Entwicklungsserver. Fremde Prozesse nie beenden; `pkill -f next-server` ist verboten (trifft beide Server).
- Rechenintensives (Build, Lighthouse) nur nacheinander. Große Ausgaben (Bilder, Berichte von Lighthouse, Protokolle) nur nach `$SCRATCH` oder `_werkstatt/cache` (Symlink in den Scratchpad), nie ins Repo außer den genannten Belegdateien.
- Umgebung in jeder Shell: `export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`, `export RELAUNCH_SCRATCH="$SCRATCH"`, `export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.

## 8. Schritte
Arbeite gegen den Produktionsserver 4310 (Reinraum von HEAD). Prüfe zuerst `server.sh status` und `curl` auf `/` (200). Rechenintensive Läufe strikt nacheinander, nie zwei Browser-Werkzeuge gleichzeitig; jeden Lauf über 20 Minuten in Teile zerlegen (Hintergrundbefehle enden nach etwa 30 Minuten), Ausgaben in Protokolldateien unter `$SCRATCH/E0-PRUEF-03/`.
1. **Bestand:** Übernimm Build, Typprüfung, Linter, Tests und `qa:graph` aus dem letzten Reinraum (`$SCRATCH/werkstatt-cache/reinraum-<SHA>/ergebnis.txt`, SHA = `git rev-parse --short HEAD`; fehlt es, `bash _werkstatt/werkzeuge/reinraum.sh HEAD`). Dann die 13 Funktionsspecs: `cd _werkstatt/werkzeuge && RELAUNCH_BASE=http://127.0.0.1:4310 RELAUNCH_OUTPUT="$SCRATCH/E0-PRUEF-03/pw" RELAUNCH_REPORT="$SCRATCH/E0-PRUEF-03/funktion.json" npx playwright test tests/ --workers=1` (ohne `funktion-tracking.spec.mjs`, der braucht Port 4311). Zähle bestanden, fehlgeschlagen, übersprungen; liste jeden Fehlschlag mit Testname und erster Fehlerzeile. Wiederhole fehlgeschlagene Tests einmal einzeln und berichte beide Ergebnisse.
2. **Konsolenfehler:** Für die 12 Hauptansichten (`_werkstatt/HAUPTANSICHTEN.json`) je auf m390 und d1440 mit Playwright über `installSperre()` laden und alle `console.error`, `pageerror` und fehlgeschlagenen eigenen Anfragen (Status ≥ 400, ohne gesperrte Dritt-Hosts) zählen. Ein kleines Hilfsskript darfst du nur unter `$SCRATCH/E0-PRUEF-03/` anlegen.
3. **Bildsatz:** `node _werkstatt/werkzeuge/bildsatz.mjs --satz e0 --hauptansichten --geraete alle`. Übernimm die Kennzahlen (Überlauf, abgeschnittener oder überlappender Text) je Seite und Gerät. Lege danach je Hauptansicht und Gerät **nur das Bild des ersten Bildschirms** verkleinert (höchstens 1440 px breit, JPEG Qualität 60) nach `_werkstatt/bilder/e0/<seite>/<geraet>.jpg` (Seitenname: `/` = `start`, sonst Pfad mit `-` statt `/`). Das sind höchstens 120 Bilder; alle übrigen Bilder bleiben im Scratchpad.
4. **Erstes Bild:** `node _werkstatt/werkzeuge/erstesbild.mjs --satz e0 --hauptansichten --geraete alle` (Ziel Standard `_werkstatt/belege/e0`).
5. **Zugänglichkeit:** `node _werkstatt/werkzeuge/axe.mjs --satz e0 --hauptansichten` (Ziel Standard). Zähle Befunde je Schwere (kritisch, ernst, mittel, gering) je Seite.
6. **Lesbarkeit:** `node _werkstatt/werkzeuge/lesbarkeit.mjs --satz e0 --alle` (alle Adressen der Sitemap; Ziel Standard).
7. **Reduzierte Bewegung:** `node _werkstatt/werkzeuge/bewegung.mjs --modus reduziert` für jede der 12 Hauptansichten (Aufruf laut Kopf der Datei); Befunde zählen.
8. **Leistung (Ruhefenster, zuletzt, nichts anderes läuft):** `CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome RELAUNCH_BELEGE="$SCRATCH/E0-PRUEF-03/lh-belege" node _werkstatt/werkzeuge/lighthouse.mjs --satz e0 --hauptansichten --laeufe 3 --formen mobil,desktop` (frisches Profil je Lauf). Bei Zeitnot in Teilen nach Seiten. Kopiere danach nur die Zusammenfassung `lighthouse.json` nach `_werkstatt/belege/e0/lighthouse.json` (keine Rohberichte ins Repo).
9. **Zusammenfassung** `_werkstatt/belege/e0/STUFE-B.md`: je Prüfung eine Tabelle mit den Zahlen (Bestand: Exit-Codes, Tests bestanden/gesamt; Konsolenfehler je Seite; Überlauf je Seite und Gerät; Erstes Bild bestanden von 5 je Seite und Gerät und Durchgang; axe je Schwere je Seite; Lesbarkeit: Zahl der Seiten ROT je Regel; reduzierte Bewegung; Lighthouse mobil und Desktop je Seite: Leistung, Zugänglichkeit, Best Practices, SEO, LCP, CLS, TBT, Median und Spanne). Keine Deutungen, keine Empfehlungen.

## 9. Schnellprüfung und Selbstprüfung
- Jede Zahl in `STUFE-B.md` hat ihre Quelldatei; Bildzahl in `_werkstatt/bilder/e0/` ≤ 120 und jedes Bild ≤ 1440 px breit (`identify`).
- `git status --porcelain` zeigt nur `_werkstatt/belege/e0/**` und `_werkstatt/bilder/e0/**`.
- Selbstprüfung: `git -C /home/user/tezgel status --porcelain` zeigt nur Dateien aus deinen Schreibrechten (dazu ggf. `AGENTS.md`, siehe Schritte, und den Symlink `_werkstatt/werkzeuge/node_modules`). Alle Mengen gezählt, alle offenen Punkte gelistet.

## 10. Ausgabeformular
Schreibe deinen Bericht nach `_werkstatt/pakete/E0-PRUEF-03.rueckgabe.md` UND gib ihn als letzte Antwort zurück, höchstens 600 Wörter, mit genau diesen Überschriften:
GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Letzte Zeile genau: `=== ENDE E0-PRUEF-03 · BEREIT ZUR RÜCKGABE ===`
