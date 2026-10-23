# E2-TEST-04

## 1. Kopfzeile
E2-TEST-04 · Rolle Prüfer · Modell Haiku 5.5 · Stufe 2 (Tests für neue Logik) · Kern-Version v3.0 · Schreibrechte (exakt): `test/verlegen.test.mjs` (neu) · Umfang: eine Testdatei für drei Logikmodule, mindestens 20 Fälle

## 2. Rollenbriefing
Du bist **Prüfer**: Du schreibst Tests für neue Logik nach Muster der vorhandenen Tests (Rolle Prüfer, Stufe 2).
- Gute Arbeit: Jeder Test prüft eine Eigenschaft aus der Spezifikation, nicht die Umsetzung; jeder Test scheitert nachweislich, wenn die Eigenschaft verletzt ist (Gegenprobe mit absichtlich falschem Wert, danach zurück); die Tests laufen schnell und ohne Netz.
- Die drei häufigsten Fehler: 1. Tests, die nur die aktuelle Umsetzung abschreiben, statt die Spezifikation zu prüfen; 2. fehlende Gegenprobe, sodass ein Test nie scheitern kann; 3. fremde Dateien ändern, auch die geprüfte Logik.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Schreibe Logik-Tests für den Seitenwechsel B-01 (Fliesenraster, Zeitplan, Linkfilter, Zustandsautomat) gegen die Spezifikation in KERN K-007 und E-017.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js 16.3.6, React 19 und Tailwind 4 gebaut und wird über Vercel ausgeliefert.
2. Die Seite hat 170 Adressen: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Ziel dieses Laufs ist eine Seite, die jeder Laie ohne Hilfe versteht; Prüfstein ist eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will.
4. Echte Fotos, eine durchgehende Geschichte, ein Intro mit sich zeichnendem Logo und ein Seitenwechsel, bei dem sich Fliesen verlegen, heben die Gestaltung auf Award-Niveau.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.

## 5. Kern-Auszug
- K-007 B-01 (wörtlich in `_werkstatt/KERN.md`, Abschnitt „B-01 „Verlegen““): Fliese 2:1 quer, Drittelverband (jede Reihe um ein Drittel der Länge versetzt, Muster alle drei Reihen), Fuge 1 % der kurzen Seite, mindestens 2 px; etwa 3 Fliesen je Reihe bei 390 px, 8 bei 1440 px, höchstens 80 gleichzeitig; Verlegen ~45 % der Dauer von der rechten Kante her, Weiterziehen ~40 %; Zurück und Vor gespiegelt mit 70 % der Dauer; gesamt 1.200 ms beim ersten Wechsel, 900 ms ab dem zweiten.
- Ausnahmen (kein Fliesenwechsel): Zusatztasten, andere Maustaste, `target` außer `_self`, `download`, `data-kein-verlegen`, `tel:`, `mailto:`, WhatsApp und andere fremde Hosts, gleicher Pfad (Anker, Suchparameter), Dateien wie `.pdf`; ein schon verhinderter Klick.
- E-017 (`_werkstatt/ENTSCHEIDUNGEN.md`): Weiterziehen reihenweise starr, Reihen nach Versatzstufe gestaffelt (Anteil `ANTEIL_REIHENVERSATZ`), Raster in ganzen Pixeln mit gerader Länge.
- Zustandsautomat: ruhe → legen → bedeckt → (warten mit Laserlinie nach 150 ms) → ziehen → ruhe; nach 3 s Warten Abbruch ohne Fliesen; Zurück und Vor im Weg „sicher“ beginnt mit `start-liegend`; ein zweiter Start während eines Wechsels wird verworfen.

## 6. Maßstab
- Logik: `src/lib/verlegen/raster.ts`, `src/lib/verlegen/linkfilter.ts`, `src/lib/verlegen/automat.ts` (nur lesen).
- Muster für Tests: `test/bewegung.test.mjs`, `test/wege.test.mjs` (`node:test`, `node:assert/strict`, Import der `.ts`-Dateien mit Endung).
- Aufruf wie im Projekt: `node --experimental-strip-types --loader ./test/resolver.mjs --test test/verlegen.test.mjs` (aus `/home/user/tezgel`).

## 7. Grenzen
- Nur die Dateien unter „Schreibrechte“ ändern oder anlegen; alles andere nur lesen. Fehler in fremden Dateien unter GEMEINSAME DATEIEN melden, nie beheben.
- Nie committen, nie pushen, nie `git checkout`, `reset`, `stash` oder `clean` im Repo. Keine `.env*`-Dateien lesen oder zitieren.
- Keine echten Formularsendungen, E-Mails, Anrufe oder WhatsApp-Nachrichten; Browserläufe nur über `installSperre()` aus `_werkstatt/werkzeuge/lib.mjs`.
- Fremde Prozesse nie beenden; `pkill -f next` und Ähnliches sind verboten. Server 4310 (Produktion, alter Stand bis E2) und 4320 (Entwicklung, zeigt den Arbeitsbaum) nur nutzen, nicht neu starten.
- Keine Dateien außerhalb von `/home/user/tezgel` und `$SCRATCH` anlegen, auch nicht im Wurzelverzeichnis `/`.
- Umgebung in jeder Shell: `export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`.
- Die Logikdateien unter `src/lib/verlegen/` nicht ändern; findest du dort einen Widerspruch zur Spezifikation, melde ihn unter GEMEINSAME DATEIEN mit dem fehlschlagenden Testfall (der Test bleibt dann rot und wird nicht entschärft).

## 8. Schritte
1. Lies die drei Logikdateien und den Kern-Auszug. Leite aus der Spezifikation (nicht aus dem Code) die Eigenschaften ab, die gelten müssen.
2. Raster (mindestens 7 Fälle): für alle 10 Gerätegrößen aus `_werkstatt/HAUPTANSICHTEN.json` gilt: höchstens 80 Fliesen; Länge = 2 × Höhe; Länge und Versatz ganze Pixel; Fuge ≥ 2 px; die Fliesen decken die Ansicht lückenlos (prüfe ein Gitter von Punkten, etwa alle 7 px, liegt in einer Fliese); Versatz der Reihen r, r+1, r+2 ist 0, ⅓, ⅔ der Länge (gerundet) und wiederholt sich; bei 390 px liegen 2,5 bis 3,5 Fliesen je Reihe, bei 1440 px 6,5 bis 8,5.
3. Zeitplan (mindestens 5 Fälle): Verlegen endet spätestens bei 45 % der Gesamtdauer, Weiterziehen spätestens bei 40 %; bei „vor“ beginnt eine Fliese mit größerem rechtem Rand nie später als eine weiter links in derselben Reihe; früher gelegte Fliesen liegen in der Stapelreihenfolge höher; beim Weiterziehen haben alle Fliesen einer Reihe denselben Beginn und dieselbe Dauer (kein Überholen); `wechselDauer` liefert 1200, 900 und 70 % davon für „zurueck“.
4. Linkfilter (mindestens 8 Fälle): je Ausnahme aus dem Kern-Auszug ein Fall mit dem erwarteten Grund, dazu zwei gültige interne Links (anderer Pfad, mit und ohne Suchparameter und Anker) mit Ergebnis `verlegen`; ungültige URL ergibt `ungueltig`.
5. Zustandsautomat (mindestens 6 Fälle): normaler Ablauf mit den Aktionen in der richtigen Reihenfolge; Doppelklick (zweites `start` in `legen`) ohne Aktion; `bereit` während `legen` führt nach `gelegt` direkt zu `ziehen`; Wartephase mit `zeit-laser` und danach `bereit`; Abbruch nach `zeit-ende` und Rückkehr nach `ausgeblendet`; `start-liegend` aus `ruhe`.
6. Gegenprobe: Ändere für jede der vier Gruppen eine erwartete Zahl in deinem Test absichtlich falsch, führe aus, notiere den Fehlschlag, stelle zurück. Die Logikdateien änderst du dafür nie.
7. Führe die Datei aus und danach `npm test` (die Suite des Projekts) unverändert; berichte beide Ergebnisse. Den Eintrag deiner Datei im Skript `test` der `package.json` setzt der Orchestrator.

## 9. Schnellprüfung und Selbstprüfung
- `node --experimental-strip-types --loader ./test/resolver.mjs --test test/verlegen.test.mjs`: alle Fälle grün, Zahl der Fälle ≥ 20.
- `npx eslint test/verlegen.test.mjs` ohne Fehler (falls der Linter Testdateien erfasst).
- Gegenprobe je Gruppe dokumentiert (Befehl und erste Fehlerzeile).
- `git -C /home/user/tezgel status --porcelain` vor und nach deiner Arbeit vergleichen: neu oder geändert sind nur Dateien aus deinen Schreibrechten (fremde Einträge, etwa Arbeit des Orchestrators unter `src/`, bleiben unberührt und werden nicht gemeldet).

## 10. Ausgabeformular
Höchstens 600 Wörter, genau diese Abschnitte: GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS (Befehl und Ergebnis je Prüfung) · BILDBELEGE (Pfade) · OFFENE FRAGEN. Dein Bericht ist deine Antwort; lege keine Berichtsdatei an.

## 11. Letzte Zeile
=== ENDE E2-TEST-04 · BEREIT ZUR RÜCKGABE ===
