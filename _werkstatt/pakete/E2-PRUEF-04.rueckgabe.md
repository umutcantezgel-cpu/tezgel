# E2-PRUEF-04 · Rolle Prüfer · Ergebnis: Spec steht, 12 von 26 Tests grün, 14 rot. Der Befund „bedeckt fehlt“ ist ein echter Komponentenfehler, kein Test-Artefakt.

GEÄNDERTE DATEIEN
- Neu: /home/user/tezgel/_werkstatt/werkzeuge/tests/verlegen.spec.mjs (13 Fälle × mobil/desktop = 26 Tests).
- Nur Scratch: /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-PRUEF-04/ (ergebnis.json, lauf1–4.txt, einzeln-N.txt, gegenprobe.txt).
- Keine Commits, keine Pushes. Komponente, Logik, fixtures.mjs und Konfiguration unverändert.

WAS UND WARUM
- Fixtures (Sperre, Einwilligung abgelehnt), bedienbar(), Zustandsprotokoll per MutationObserver auf data-zustand, keine Wartezeiten. Fall 2 misst 5 Vor- und 5 Zurück-Wechsel und berichtet Mediane.
- Abweichungen vom Briefing, jeweils begründet:
  a) Reduzierte Bewegung: test.use({reducedMotion}) wirkte in der Reduce-Gruppe nicht (matchMedia meldete no-preference). Daher page.emulateMedia vor jeder Seite. Unter reduce erscheint html.k-modul nie, weil beobachte() es nur mit k-bewegung setzt; Fall 12 wartet deshalb nicht darauf.
  b) Fall 6: target am externen Link entfernt, weil alle externen Links auf /bad target=_blank tragen (sonst Grund „target“ statt „extern“).
  c) Fall 7: Sprunglink #main-content per Tastatur (Enter). Der Cookie-Anker existiert nur mobil.
  d) Fall 1 „danach nichts inert“: geprüft wird header/main/footer offen und Gleichheit mit dem Stand vor dem Klick. Vor jedem Klick sind vier eingeklappte Navigationspanels inert (Ausgangsstand).
  e) Gegenprobe per Umgebungsvariable VERLEGEN_GEGENPROBE=1 (setzt data-kein-verlegen am Link von Fall 1).
- Lauf 1 bis 3 waren vor vier Korrekturen an der Testseite (Hydrierungsgate, Sprunglink, soft checks, inert-Ausgangsstand). Berichtet wird nur Lauf 4.

GEMEINSAME DATEIEN (gewünschte Änderungen, exakt)
1. /home/user/tezgel/src/components/verlegen/Verlegen.tsx: data-zustand wird nie auf „bedeckt“ gesetzt. Die Aktion navigiere (Zeilen 346–348) ruft kein stelle('bedeckt') auf. Im Zurück-Pfad (ziel leer) gibt es keine Aktion. stelle('bedeckt') steht nur in liege() (Zeile 250), das nur im Modus „sicher“ läuft (Zeile 418). Gewünscht: data-zustand bei jedem Übergang aus lage.zustand setzen, mindestens bedeckt. Aus dem Code abgeleitet, im Lauf nicht beobachtet: warten (zeige-laser) und abbruch (blende-aus) fehlen im DOM ebenso.

PRÜFUNG UND ERGEBNIS
- `npx playwright test tests/verlegen.spec.mjs --list` → 26 Tests.
- Gegenprobe: `VERLEGEN_GEGENPROBE=1 … --grep "\(1\) Klick"` → Fall 1 rot auf beiden Projekten („kein Zustandswechsel“, Protokoll bleibt bei einem Eintrag). Ohne Attribut bleibt Fall 1 rot nur wegen des Befunds; alle übrigen Prüfungen von Fall 1 (Adresse, Fokus H1, Scroll 0, inert) sind grün. „Wieder grün“ ist durch den Befund blockiert.
- Hauptlauf (Lauf 4): `RELAUNCH_BASE=http://127.0.0.1:4320 … npx playwright test tests/verlegen.spec.mjs --workers=1` → 12 bestanden, 14 nicht bestanden.

| Fall | mobil | desktop |
|---|---|---|
| 1 Klick | rot: Zustandsfolge | rot: Zustandsfolge |
| 2 Zeit (Mediane) | rot: Zustandsfolge | rot: Zustandsfolge |
| 3 Sperre während legen, Mitte | rot: Zustandsfolge | rot: Zustandsfolge |
| 4 Doppelklick | rot: Zustandsfolge (Verlaufszuwachs 1 grün) | rot: dito |
| 5 tel: | grün | grün |
| 6 extern | grün | grün |
| 7 Anker | grün | grün |
| 8 Strg-Klick | grün | grün |
| 9 data-kein-verlegen | grün | grün |
| 10 Zurück (Scroll 400 ± 2 px) | rot: Zustandsfolge (Scroll grün) | rot: dito |
| 11 Vor | rot: Zustandsfolge | rot: Zustandsfolge |
| 12 reduziert | rot: Zustandsfolge (Blende, Fliesen-Animation, Fokus grün) | rot: dito |
| 13 Layoutverschiebung | grün (Summe 0) | grün (Summe 0) |

- Einzelwiederholung (jeder rote Fall einmal, beide Projekte): gleiches Ergebnis. Die Soll-Ist-Differenz ist jeweils nur „bedeckt“ (Diff-Zeile „- bedeckt“).
- Messung Fall 2 (Lauf 4, Dev-Server, nur Bericht, keine Schwelle): mobil Vor-Median 1420 ms, Zurück-Median 891 ms; desktop Vor 1377 ms, Zurück 1067 ms (je n=5). Die Kernwerte 1200/900 ms bzw. 630 ms wurden nicht bestätigt; Navigation im Dev-Server erklärt wahrscheinlich einen Teil.
- Git: `git status --porcelain` vor und nach dem Lauf verglichen. Einzige neue Datei aus meinem Bereich ist verlegen.spec.mjs. Fremde Änderungen unter src/ und public/ nicht bewertet.
- Server 4320 nur genutzt, nicht gestartet oder beendet. 4310 nicht genutzt.

BILDBELEGE
- Keine Bildschirmfotos (Konfiguration ohne Screenshots). Fehlerkontext (ARIA-Snapshot, Playwright-erzeugt) als Beispiel: /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-PRUEF-04/einzeln-1/verlegen-Bewegung-an-Wechs-468b4-ll-0-danach-ruhe-ohne-inert-mobil/error-context.md

OFFENE FRAGEN
1. Sperre: Der Code gibt inert zu Beginn von „ziehen“ frei. K-007 verlangt Sperre „während des Wechsels“. Welche Lesart gilt?
2. Warum test.use(reducedMotion) in dieser Harness nicht wirkt, ist ungeklärt. Ob andere Specs unter tests/ dieselbe Lücke haben, habe ich nicht geprüft.
3. Während des Laufs änderten sich Dateien unter src/, u. a. src/lib/verlegen/raster.ts (23:24:56). Die Ergebnisse gelten für den jeweiligen Stand. Eine Wiederholung nach Ende der Änderungen empfiehlt sich.

=== ENDE E2-PRUEF-04 · BEREIT ZUR RÜCKGABE ===
