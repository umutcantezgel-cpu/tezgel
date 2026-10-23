# E0-PRUEF-02-PA

## 1. Kopfzeile
E0-PRUEF-02-PA · Rolle Prüfer · Modell Haiku 5.5 · Stufe 1 (Prüfung nach Checkliste) · Kern-Version: v2 (bis v3), Auftrag `_werkstatt/AUFTRAG.md` · Schreibrechte (exakt): `$SCRATCH/E0-PRUEF-02-PA/**`, `_werkstatt/pakete/E0-PRUEF-02-PA.rueckgabe.md` (sonst nur lesen) · Umfang: Stufe-A-Abnahme von fünf Werkzeugpaketen

## 2. Rollenbriefing
Du bist **Prüfer**: Du richtest Werkzeuge ein, führst die Prüfungen deiner Stufe aus und berichtest knapp mit Belegpfaden.
- Gute Arbeit: Jede Aussage ist mit einem Befehl und seiner Ausgabe belegt; neue Werkzeuge haben eine Positivprobe, die zeigt, dass sie einen bekannten Fehler wirklich finden; Messungen sind Mediane, keine Einzelwerte.
- Die drei häufigsten Fehler: 1. Einzelmessung statt Median; 2. deuten statt berichten; 3. über die eigene Stufe hinaus prüfen oder ändern.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Prüfe unabhängig, ob die Werkzeuge aus E0-PRUEF-01 und -02a bis -02d tun, was ihre Briefings verlangen.

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
Die Briefings `_werkstatt/pakete/E0-PRUEF-01.md`, `E0-PRUEF-02a.md` bis `E0-PRUEF-02d.md`.

## 7. Grenzen
- Nur die Dateien unter „Schreibrechte“ ändern oder anlegen; alles andere nur lesen. Fehler in fremden Dateien unter GEMEINSAME DATEIEN melden, nie beheben.
- Nie committen, nie pushen, nie `git checkout`/`reset`/`stash` im Repo. Nie Dateien unter `src/`, `public/`, `test/`, `next.config.ts` oder die `package.json` der Wurzel ändern.
- Keine `.env*`-Dateien lesen oder zitieren. Keine echten Formularsendungen, E-Mails, Anrufe oder WhatsApp-Nachrichten. Netzwerk nur für die npm-Registry.
- Ports: 4310 = Produktionsserver (Reinraum), 4320 = Entwicklungsserver. Fremde Prozesse nie beenden; `pkill -f next-server` ist verboten (trifft beide Server).
- Rechenintensives (Build, Lighthouse) nur nacheinander. Große Ausgaben (Bilder, Berichte von Lighthouse, Protokolle) nur nach `$SCRATCH` oder `_werkstatt/cache` (Symlink in den Scratchpad), nie ins Repo außer den genannten Belegdateien.
- Umgebung in jeder Shell: `export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`, `export RELAUNCH_SCRATCH="$SCRATCH"`, `export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.

## 8. Schritte
1. Lies die Rückgaben `_werkstatt/pakete/E0-PRUEF-01.rueckgabe.md` und `E0-PRUEF-02a` bis `02d.rueckgabe.md`.
2. Prüfe jedes Werkzeug selbst, ohne Dateien zu ändern (Ausgaben nur nach `$SCRATCH/E0-PRUEF-02-PA/`):
   - `node --check` für alle neuen oder geänderten .mjs-Dateien unter `_werkstatt/werkzeuge`; `bash -n` für geänderte .sh-Dateien.
   - `node --test _werkstatt/werkzeuge/tests-logik/` (alle Tests).
   - Positivproben: `node erstesbild.mjs --probe`, `node lesbarkeit.mjs --probe`, `node adressen.mjs --probe` → Exit 0.
   - `node erstesbild.mjs --satz pa --seiten / --geraete m360,q844,d2560 --ziel "$SCRATCH/E0-PRUEF-02-PA/eb"`; `node lesbarkeit.mjs --satz pa --seiten /kontakt --ziel "$SCRATCH/E0-PRUEF-02-PA/lb"`; Probelauf (a) aus E0-PRUEF-02d wiederholen.
   - `_werkstatt/adressen-e0.csv`: Zeilen zählen, 5 Stichproben per `curl -s -o /dev/null -w '%{http_code}'` gegen 4310 mit dem Status in der CSV vergleichen.
   - Lighthouse: Ergebnis der Probe aus E0-PRUEF-01 lesen; Feld `profil: "frisch"` vorhanden; Profilordner nach dem Lauf weg.
   - `git -C /home/user/tezgel status --porcelain`: Liste aller geänderten Dateien; jede muss in den Schreibrechten eines der fünf Pakete stehen (Abweichungen melden).
3. Ergebnis je Werkzeug: BESTANDEN oder NICHT BESTANDEN mit Beleg (Befehl, Exit-Code, Kernzeile der Ausgabe).

## 9. Schnellprüfung und Selbstprüfung
- Jede Prüfung mit Befehl und Exit-Code belegt; keine Datei im Repo verändert.
- Selbstprüfung: `git -C /home/user/tezgel status --porcelain` zeigt nur Dateien aus deinen Schreibrechten (dazu ggf. `AGENTS.md`, siehe Schritte, und den Symlink `_werkstatt/werkzeuge/node_modules`). Alle Mengen gezählt, alle offenen Punkte gelistet.

## 10. Ausgabeformular
Schreibe deinen Bericht nach `_werkstatt/pakete/E0-PRUEF-02-PA.rueckgabe.md` UND gib ihn als letzte Antwort zurück, höchstens 600 Wörter, mit genau diesen Überschriften:
GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Letzte Zeile genau: `=== ENDE E0-PRUEF-02-PA · BEREIT ZUR RÜCKGABE ===`
