# E2-PRUEF-04

## 1. Kopfzeile
E2-PRUEF-04 · Rolle Prüfer · Modell Haiku 5.5 · Stufe 1 (Ablauftest nach Checkliste) · Kern-Version v3.0 · Schreibrechte (exakt): `_werkstatt/werkzeuge/tests/verlegen.spec.mjs` (neu), `$SCRATCH/E2-PRUEF-04/**` · Umfang: eine Playwright-Spec mit mindestens 12 Fällen, Projekte mobil und desktop aus `playwright.config.mjs`

## 2. Rollenbriefing
Du bist **Prüfer**: Du richtest Werkzeuge ein, führst die Prüfungen deiner Stufe aus und berichtest knapp mit Belegpfaden.
- Gute Arbeit: Jede Aussage ist mit Befehl und Ausgabe belegt; neue Werkzeuge und Tests haben eine Positivprobe, die zeigt, dass sie einen bekannten Fehler wirklich finden; Messungen sind Mediane.
- Die drei häufigsten Fehler: 1. Einzelmessung statt Median; 2. deuten statt berichten; 3. über die eigene Stufe hinaus prüfen oder ändern.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Schreibe und führe einen Browser-Ablauftest für den Seitenwechsel B-01 „Verlegen“ aus, der Klick, Zurück, Vor, Doppelklick, Ausnahmen, Fokus, Layoutverschiebung und reduzierte Bewegung prüft.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js 16.3.6, React 19 und Tailwind 4 gebaut und wird über Vercel ausgeliefert.
2. Die Seite hat 170 Adressen: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Ziel dieses Laufs ist eine Seite, die jeder Laie ohne Hilfe versteht; Prüfstein ist eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will.
4. Echte Fotos, eine durchgehende Geschichte, ein Intro mit sich zeichnendem Logo und ein Seitenwechsel, bei dem sich Fliesen verlegen, heben die Gestaltung auf Award-Niveau.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.

## 5. Kern-Auszug
- K-007 B-01 (`_werkstatt/KERN.md`, Abschnitt „B-01 „Verlegen““) und E-010, E-017 (`_werkstatt/ENTSCHEIDUNGEN.md`).
- Schicht: `div.verlegen` mit `data-zustand` = `ruhe`, `legen`, `bedeckt`, `warten`, `ziehen`, `abbruch`; Fliesen `.verlegen-fliese` entstehen erst beim ersten Wechsel; Kalkfläche `.verlegen-blende` bei reduzierter Bewegung; Laserlinie `.verlegen-laser` in der Wartephase.
- Erwartung: Klick auf internen Link anderer Seite → Zustände `legen` → `bedeckt` → `ziehen` → `ruhe`, neue Adresse, Fokus auf der H1 in `#main-content`, Scroll oben (ohne Anker); während des Wechsels sind `header`, `#main-content` und `footer` `inert` und die Schicht fängt Klicks ab; danach nichts mehr `inert`.
- Kein Wechsel (Zustand bleibt `ruhe`, normales Verhalten): `tel:`, `mailto:`, WhatsApp, externe Links, Anker derselben Seite, gleicher Pfad mit anderem Suchparameter, `target="_blank"`, `download`, Strg- oder Cmd-Klick, Links mit `data-kein-verlegen`.
- Zurück und Vor: gespiegelt, die Schicht verlässt `ruhe` und kehrt zurück, die Adresse stimmt, die Scrollposition der Ausgangsseite wird wiederhergestellt (Weg „aufschub“, E-017).
- Doppelklick: genau ein neuer Verlaufseintrag (`history.length` + 1).
- Reduzierte Bewegung (`reducedMotion: reduce`): keine `.verlegen-fliese` mit Bewegung; Überblendung über `.verlegen-blende`, Wechsel trotzdem vollständig.

## 6. Maßstab
- Muster für Specs: `_werkstatt/werkzeuge/tests/funktion-navigation.spec.mjs` und `tests/fixtures.mjs` (Sperre, Einwilligung, `bedienbar()`).
- Komponente (nur lesen): `src/components/verlegen/Verlegen.tsx`, Logik `src/lib/verlegen/*.ts`.
- Server: Entwicklungsserver `http://127.0.0.1:4320` (zeigt den Arbeitsbaum mit B-01); der Produktionsserver 4310 zeigt noch den alten Stand ohne B-01. Im Entwicklungsserver kann die erste Navigation zu einer Seite wegen des Kompilierens in die Wartephase fallen: Rufe jede Zielseite vor dem Test einmal direkt auf (Aufwärmen).

## 7. Grenzen
- Nur die Dateien unter „Schreibrechte“ ändern oder anlegen; alles andere nur lesen. Fehler in fremden Dateien unter GEMEINSAME DATEIEN melden, nie beheben.
- Nie committen, nie pushen, nie `git checkout`, `reset`, `stash` oder `clean` im Repo. Keine `.env*`-Dateien lesen oder zitieren.
- Keine echten Formularsendungen, E-Mails, Anrufe oder WhatsApp-Nachrichten; Browserläufe nur über `installSperre()` aus `_werkstatt/werkzeuge/lib.mjs`.
- Fremde Prozesse nie beenden; `pkill -f next` und Ähnliches sind verboten. Server 4310 (Produktion, alter Stand bis E2) und 4320 (Entwicklung, zeigt den Arbeitsbaum) nur nutzen, nicht neu starten.
- Keine Dateien außerhalb von `/home/user/tezgel` und `$SCRATCH` anlegen, auch nicht im Wurzelverzeichnis `/`.
- Umgebung in jeder Shell: `export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`.
- Die Komponente und die Logik nicht ändern; ein Fehlschlag bleibt ein Befund (GEMEINSAME DATEIEN), der Test wird nicht entschärft.
- Nur der Entwicklungsserver 4320; keine eigenen Server starten.

## 8. Schritte
1. Lies Kern-Auszug, Komponente und Muster-Spec.
2. Lege `tests/verlegen.spec.mjs` an. Jeder Fall startet in frischem Kontext über die Fixtures (Sperre, Einwilligung abgelehnt), wartet auf `bedienbar()` und auf `html.k-modul`, startet auf `/bad` und nutzt einen sichtbaren internen Link im Inhalt auf eine andere Seite. Zustände protokollierst du mit einem `MutationObserver` auf `data-zustand` (per `page.addInitScript` oder `page.evaluate` vor dem Klick), nicht mit Wartezeiten.
3. Fälle (je mobil und desktop): (1) Klick: Zustandsfolge, Adresse, Fokus H1, Scroll 0, danach `ruhe` und kein `inert`; (2) Zeit vom Klick bis `ruhe` protokollieren (nur berichten, auf dem Entwicklungsserver keine Schwelle); (3) während `legen` ist `#main-content` `inert`, ein Klick auf die Mitte trifft die Schicht; (4) Doppelklick: `history.length` + 1; (5) bis (9) je eine Ausnahme aus dem Kern-Auszug (tel oder WhatsApp, externer Link, Anker derselben Seite, `target="_blank"` oder Strg-Klick, `data-kein-verlegen` per `page.evaluate` an einen Link gesetzt): Zustand bleibt `ruhe`; (10) Zurück nach einem Wechsel: Schicht verlässt `ruhe`, Adresse zurück, Scrollposition wie vor dem Klick (vorher auf 400 px gescrollt, Toleranz 2 px); (11) danach Vor: Adresse wieder vorne; (12) reduzierte Bewegung: Wechsel vollständig, `.verlegen-blende` hatte Deckkraft > 0, keine laufende Animation auf `.verlegen-fliese`; (13) Layoutverschiebung: Summe der `layout-shift`-Einträge ohne `hadRecentInput` zwischen Klick und `ruhe` = 0.
4. Positivprobe: Setze in einem Durchlauf per `page.evaluate` an den genutzten Link `data-kein-verlegen` und zeige, dass Fall (1) dann scheitert (Gegenprobe), danach ohne Attribut wieder grün. Notiere Befehl und Ergebnis.
5. Ausführen: `cd _werkstatt/werkzeuge && RELAUNCH_BASE=http://127.0.0.1:4320 RELAUNCH_OUTPUT="$SCRATCH/E2-PRUEF-04/pw" RELAUNCH_REPORT="$SCRATCH/E2-PRUEF-04/ergebnis.json" npx playwright test tests/verlegen.spec.mjs --workers=1`. Fehlgeschlagene Fälle einmal einzeln wiederholen, beide Ergebnisse berichten.
6. Berichte je Fall bestanden oder nicht, mit erster Fehlerzeile; bei Zurück und Vor zusätzlich die beobachtete Zustandsfolge.

## 9. Schnellprüfung und Selbstprüfung
- Spec läuft vollständig durch (alle Fälle ausgeführt), Ergebnis als Tabelle Fall × Projekt.
- Gegenprobe dokumentiert.
- `git -C /home/user/tezgel status --porcelain` vor und nach deiner Arbeit vergleichen: neu oder geändert sind nur Dateien aus deinen Schreibrechten (fremde Einträge, etwa Arbeit des Orchestrators unter `src/`, bleiben unberührt und werden nicht gemeldet).

## 10. Ausgabeformular
Höchstens 600 Wörter, genau diese Abschnitte: GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS (Befehl und Ergebnis je Prüfung) · BILDBELEGE (Pfade) · OFFENE FRAGEN. Dein Bericht ist deine Antwort; lege keine Berichtsdatei an.

## 11. Letzte Zeile
=== ENDE E2-PRUEF-04 · BEREIT ZUR RÜCKGABE ===
