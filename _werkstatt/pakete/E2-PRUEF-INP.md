# E2-PRUEF-INP

## 1. Kopfzeile
E2-PRUEF-INP · Rolle Prüfer · Modell Haiku 5.5 · Stufe 1 · Kern-Version v3.0 · Schreibrechte (exakt): `_werkstatt/werkzeuge/reaktion.mjs`, `_werkstatt/werkzeuge/tests-logik/reaktion-probe.html`, `$SCRATCH/E2-PRUEF-INP/**` · Umfang: ein neues Prüfwerkzeug mit Positivprobe; der Ausgangswert auf 4310 folgt später im Ruhefenster durch den Orchestrator

## 2. Rollenbriefing
Du bist **Prüfer**: Du richtest Werkzeuge ein, führst die Prüfungen deiner Stufe aus und berichtest knapp mit Belegpfaden.
- Gute Arbeit: Jede Aussage ist mit Befehl und Ausgabe belegt; neue Werkzeuge und Tests haben eine Positivprobe, die zeigt, dass sie einen bekannten Fehler wirklich finden; Messungen sind Mediane.
- Die drei häufigsten Fehler: 1. Einzelmessung statt Median; 2. deuten statt berichten; 3. über die eigene Stufe hinaus prüfen oder ändern.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Baue das Werkzeug reaktion.mjs, das die Reaktionszeit (INP-Näherung) einer Seite bei fünf Handlungen auf m390 mit vierfach gedrosselter CPU misst, und zeige mit einer Positivprobe, dass es eine absichtlich langsame Handlung erkennt.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js 16.3.6, React 19 und Tailwind 4 gebaut und wird über Vercel ausgeliefert.
2. Die Seite hat 170 Adressen: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Ziel dieses Laufs ist eine Seite, die jeder Laie ohne Hilfe versteht; Prüfstein ist eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will.
4. Echte Fotos, eine durchgehende Geschichte, ein Intro mit sich zeichnendem Logo und ein Seitenwechsel, bei dem sich Fliesen verlegen, heben die Gestaltung auf Award-Niveau.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.

## 5. Kern-Auszug
- Z-08 (`_werkstatt/ABNAHME.md`): Reaktion per Playwright mit `PerformanceObserver` vom Typ `event` (durationThreshold 16 ms) auf m390 mit 4-fach gedrosselter CPU (CDP `Emulation.setCPUThrottlingRate`, rate 4) bei fünf Handlungen: Hauptknopf, Menü öffnen, Akkordeon, Eingabefeld, interner Link; höchster Wert je Seite, Median aus 3 Läufen; Schwelle ≤ 200 ms.
- Vorhandene Werkzeuge als Muster: `_werkstatt/werkzeuge/lib.mjs` (`installSperre`, `setzeEinwilligung`, `ANSICHTEN`, `BASE`, `RELAUNCH`, `ensureDir`, `CHROME`), `erstesbild.mjs` (Aufbau, Argumente, JSON-Ausgabe), `tests-logik/erstesbild-probe.html` (Positivprobe als statische Seite).
- Handlungen: (1) Hauptknopf `[data-hauptknopf]` im main antippen (bei Ankerziel bleibt die Seite; bei Linkziel nur den Druck messen und die Navigation abfangen: vor dem Antippen `page.route` auf das Ziel nicht nötig, stattdessen `event.preventDefault()` per Init-Skript auf diesem einen Klick ist erlaubt, weil nur die Reaktion zählt); (2) Menü-Schalter (`button[popovertarget="mobile-menu"]` bzw. Name „Menü öffnen“) öffnen und mit Escape schließen; (3) erstes Akkordeon oder `details`/Schalter mit `aria-expanded` im main, falls vorhanden; (4) erstes Textfeld im main antippen und 5 Zeichen tippen (kein Absenden); (5) einen internen Link im main antippen (Seitenwechsel B-01 läuft, gemessen wird die Reaktion des Klicks). Fehlt eine Handlung auf einer Seite, wird sie als „nicht vorhanden“ ausgewiesen.
- Messung: `new PerformanceObserver(...).observe({ type: 'event', durationThreshold: 16, buffered: true })`, je Handlung die größte `duration` der Ereignisse mit interactionId > 0 im Zeitfenster der Handlung; dazu `first-input` als Gegencheck. CPU-Drosselung über `page.context().newCDPSession(page)` und `Emulation.setCPUThrottlingRate({ rate: 4 })`.
- Ausgabe JSON (`--ziel`, Standard `$RELAUNCH/belege/<satz>/reaktion.json`): je Seite je Handlung die drei Werte, Median, höchster Median der Seite, Bedingungen (Gerät, Drosselung, Commit-Hinweis, Basisadresse).

## 6. Maßstab
- Aufruf wie die anderen Werkzeuge: `node reaktion.mjs --satz <name> (--seiten /a,/b | --hauptansichten) [--laeufe 3] [--base URL] [--ziel DIR] [--probe]`.
- Positivprobe: `tests-logik/reaktion-probe.html` mit einem Knopf, dessen Klick 300 ms rechnet (Schleife), und einem schnellen Knopf; `--probe` muss den langsamen über 200 ms und den schnellen darunter melden.

## 7. Grenzen
- Nur die Dateien unter „Schreibrechte“ ändern oder anlegen; alles andere nur lesen. Fehler in fremden Dateien unter GEMEINSAME DATEIEN melden, nie beheben.
- Nie committen, nie pushen, nie `git checkout`, `reset`, `stash` oder `clean` im Repo. Keine `.env*`-Dateien lesen oder zitieren.
- Keine echten Formularsendungen, E-Mails, Anrufe oder WhatsApp-Nachrichten; Browserläufe nur über `installSperre()` aus `_werkstatt/werkzeuge/lib.mjs`.
- Fremde Prozesse nie beenden; `pkill -f next` und Ähnliches sind verboten. Server 4310 (Produktion, alter Stand bis E2) und 4320 (Entwicklung, zeigt den Arbeitsbaum) nur nutzen, nicht neu starten.
- Keine Dateien außerhalb von `/home/user/tezgel` und `$SCRATCH` anlegen, auch nicht im Wurzelverzeichnis `/`.
- Umgebung in jeder Shell: `export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`.
- Nur `_werkstatt/werkzeuge/reaktion.mjs` und `tests-logik/reaktion-probe.html` anlegen; `lib.mjs` nicht ändern (gewünschte Änderungen melden).

## 8. Schritte
1. Lies lib.mjs, erstesbild.mjs, die Probe-Seiten und ABNAHME Z-08.
2. Baue `reaktion.mjs` nach dem Muster (assertLocal, installSperre, frischer Kontext je Lauf mit gesetztem Intro-Speicher, Einwilligung abgelehnt, Warten bis hydriert: ein Element hat einen `__reactProps$`-Schlüssel).
3. Baue `tests-logik/reaktion-probe.html` und den Modus `--probe` (lokale Datei über `file://` oder per `page.setContent`).
4. Positivprobe ausführen und Ausgabe sichern unter `$SCRATCH/E2-PRUEF-INP/probe.txt`.
5. Einen kurzen Rauchlauf gegen 4320 nur für `/` mit `--laeufe 1` (Werte nicht als Ausgangswert verwenden, der Rechner ist gerade belastet), Ausgabe unter `$SCRATCH/E2-PRUEF-INP/`.
6. Den Ausgangswert auf 4310 NICHT messen; der Orchestrator misst ihn im Ruhefenster mit deinem Werkzeug.

## 9. Schnellprüfung und Selbstprüfung
- `node reaktion.mjs --probe` meldet langsam > 200 ms und schnell < 200 ms (Ausgabe im Bericht).
- `node --check reaktion.mjs` ohne Fehler.
- `git -C /home/user/tezgel status --porcelain` vor und nach deiner Arbeit vergleichen: neu oder geändert sind nur Dateien aus deinen Schreibrechten (fremde Einträge, etwa Arbeit des Orchestrators unter `src/`, bleiben unberührt und werden nicht gemeldet).

## 10. Ausgabeformular
Höchstens 600 Wörter, genau diese Abschnitte: GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS (Befehl und Ergebnis je Prüfung) · BILDBELEGE (Pfade) · OFFENE FRAGEN. Dein Bericht ist deine Antwort; lege keine Berichtsdatei an.

## 11. Letzte Zeile
=== ENDE E2-PRUEF-INP · BEREIT ZUR RÜCKGABE ===
