# E2-TEST-02 · Rückgabe

GEÄNDERTE DATEIEN
- Neu: /home/user/tezgel/test/glossar.test.mjs (6 Tests, Prüfpunkte a bis f)
- Neu: /home/user/tezgel/test/oeffnungszeiten.test.mjs (10 Tests)
- Sonst nichts geändert. Nicht committet, nicht gepusht. package.json unverändert.

WAS UND WARUM
- Glossar: (a) glossar.ts und glossar.json haben dieselben Kennungen, Begriffe (Reihenfolge) und Erklärungen. (b) Erklärung höchstens 15 Wörter, endet mit Satzzeichen. (c) Klammer höchstens 15 Wörter, ohne Schlusspunkt, dieselben Wörter wie die Erklärung (Satzzeichen und Groß/Klein ignoriert). (d) Keine Gedankenstriche in Begriffen, Erklärung, Klammer; Bindestrichwörter in Erklärung und Klammer nur aus bindestrich-erlaubt.json. (e) Kein Begriff in zwei Kennungen, kein Begriff als Teil eines Begriffs anderer Kennungen. (f) istGlossarId erkennt jede Kennung und lehnt erfundene ab, auch toString, constructor, __proto__.
- Wörter zählen wie die Prüfliste (_werkstatt/werkzeuge/lesbarkeit-logik.mjs): Satzzeichen und „×“ zählen nicht.
- Öffnungszeiten: uhrzeit (07:30 zu 7:30, 18:00 zu 18); oeffnungszeilen() liefert die drei Sollzeilen des Auftrags; erfundene Wochen prüfen Zusammenfassung, Einzeltag ohne „bis“, geschlossener Tag fehlt und trennt, verschiedene Zeiten getrennt, „nach Vereinbarung“ ohne Uhrzeit, keine Zeile bei nur geschlossenen Tagen, keine Gedankenstriche, jede Uhrzeit in einer „bis“-Spanne.
- Regeldateien werden über import.meta.url gelesen, nicht über feste Pfade.

GEMEINSAME DATEIEN (nicht geändert)
1. package.json, Skript „test“: an die --test-Liste anhängen: test/glossar.test.mjs test/oeffnungszeiten.test.mjs
2. src/config/company.js, Zeile 128: `formattedWeekdays: "Mo - Fr: 07:30 – 18:00 Uhr"` ersetzen durch `formattedWeekdays: "Mo bis Do 7:30 bis 18 Uhr, Fr 7:30 bis 17 Uhr"` (Vorschlag).
   Zeile 129: `formattedSaturday: "Sa: 08:00 – 14:00 Uhr (Vor-Ort-Termine)"` ersetzen durch `formattedSaturday: "Sa nach Vereinbarung"` (Vorschlag; der Vor-Ort-Hinweis entfällt).
   Grund: Gedankenstriche, Freitag 18 Uhr statt 17 Uhr, Samstag widerspricht dem Soll. Verwendet in site.js, dataService.js, CalendlySection.jsx, schadensanalyse/page.jsx, fliesenreparatur/page.tsx, ausstellung/wetzlar und giessen, werkstatt-schaufenster/merkliste/page.dev.tsx. Die Sätze dort nach dem Wechsel prüfen.
3. _werkstatt/regeln/glossar.json, Eintrag grossformat, Feld woerter: 13 auf 12 (das Feld zählt „×“ mit). Regel bleibt erfüllt.

PRÜFUNG UND ERGEBNIS
- `node --experimental-strip-types --loader ./test/resolver.mjs --test test/glossar.test.mjs test/oeffnungszeiten.test.mjs` ergibt 16 bestanden, 0 fehlgeschlagen, etwa 1 s, ohne Netz.
- Gegenproben: 17 Kopien unter $SCRATCH/E2-TEST-02/kopien, Quelle unverändert. Jede mit einer absichtlich falschen Stelle, danach frische Kopie grün.
  a: Erklärung endet mit „!“ (nur a rot). b: Erklärung 16 Wörter (b und c rot). c: Klammer mit Schlusspunkt; anderer Inhalt (je nur c rot). d: Gedankenstrich (d rot); „Gipskarton-Wand“ (d rot). e: „Estrich“ bei Untergrund (nur e rot). f: istGlossarId immer true (nur f rot).
  Öffnungszeiten: Uhrzeit ohne Kürzung (1 und weitere rot); „nach Absprache“ (2, 7, 8 rot); Zusammenfassung aus (3, 5, 6, 8 rot); Einzeltag „Mi bis Mi“ (4 rot); geschlossener Tag als Zeile (5, 9 rot); Zeiten nicht getrennt (6 rot); Vereinbarung mit Uhrzeit (7, 8 rot); Gedankenstrich (10 rot); ohne „bis“ (10 rot).
- Belege je Gegenprobe (TAP-Ausgabe): $SCRATCH/E2-TEST-02/belege/. Skript: $SCRATCH/E2-TEST-02/gegen/gegenprobe.sh. $SCRATCH steht für /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad.
- Git: Neu sind nur die beiden Testdateien. Fremde Einträge (_werkstatt/werkzeuge/reaktion.mjs, _werkstatt/werkzeuge/tests-logik/reaktion-probe.html) und die Briefings (jetzt in Commit acd3468) stammen nicht von mir.
- Versehen: Eine Datei /tmp/x (git-Status-Ausgabe) wurde angelegt und sofort gelöscht.

BILDBELEGE
- Keine. Browserläufe sind nach Abschnitt 7 nicht vorgesehen. Textbelege siehe PRÜFUNG.

OFFENE FRAGEN
1. Gelten Gedankenstrich- und Bindestrichregel auch für Begriffe? Dann scheitern CM-Messung, W0-I, W1-I, W2-I, W3-I (nicht in bindestrich-erlaubt.json). Der Test prüft Erklärung und Klammer, wie K-010 es nennt.
2. Test (e) prüft nur Begriffe, nicht Erklärungen. Erklärungen nennen andere Fachwörter (etwa „Estrich“ bei Untergrund, „Untergrund“ bei Entkopplung); der Wortlaut „kommen … vor“ würde dort scheitern. Bestätigen?
3. Klammer-Vergleich ignoriert Groß- und Kleinschreibung. Bestätigen?
4. glossar.json, oberes Feld begriffe: enthält C2-TE, C2TE, Calciumsulfat, Fachgewerke, S1, Vakuum-Hebetechnik, Walk-In, Walk-in ohne Eintrag; W0-I bis W3-I fehlen dort. Zweck der Liste unklar; „Fachgewerke“ wäre ein Fachwort ohne Erklärung, falls es im Text steht.
5. Öffnungszeiten: „Fr bis Sa nach Vereinbarung“ und „12:15“ sind meine Ableitung aus den Regeln. Bestätigen?
6. Fachwort.tsx ist nicht getestet: JSX läuft nicht unter strip-types; eine Prüfung der Darstellung bräuchte Render- oder Browserlauf.

=== ENDE E2-TEST-02 · BEREIT ZUR RÜCKGABE ===
