# E0-PRUEF-02a · Rückgabe

## GEÄNDERTE DATEIEN
- `_werkstatt/werkzeuge/lib.mjs`: nur ergänzt (`GERAETE`, `versteckeDevOverlay`); keine bestehende Zeile entfernt.
- Neu: `_werkstatt/werkzeuge/einzelbild.mjs`, `bildsatz.mjs`, `ueberlappung.mjs`, `pruefe-a.sh` (ausführbar), `test-zuordnung.json`.
- Sonst nichts geändert (eine Probedatei lag kurz in `_werkstatt/werkzeuge` und wurde gelöscht). Kein Commit, kein Push.

## WAS UND WARUM
- `einzelbild.mjs`: je Ansicht ein JPEG (q70, DPR 1, Dev-Overlay aus), dazu `einzelbild.json` mit Status, Konsole, `ueberlauf()` und `ueberlappung()`. `--voll` und `--scroll #anker` ebenfalls geprüft.
- `ueberlappung.mjs`: `ueberlappung(page)` liefert höchstens 50 Befunde, `ueberlappungMitZahl(page)` zusätzlich Gesamtzahl und Anzahl je Art. Scannt alle Bildschirmschritte ohne vorzeitigen Abbruch. Zwei Zusätze zum Briefing-Format: Feld `durch`; Text in Überlaufbehältern (eigene Scroll-Listen) zählt nur im sichtbaren Teil.
- `bildsatz.mjs`: festes Protokoll aus dem Briefing, Struktur `<ziel>/<ansicht>/<slug>/NN.jpg`, `bildsatz.json`.
- `test-zuordnung.json`: die 12 Zeilen aus dem Briefing. `ALLE` steht als Token in `specs`; `pruefe-a.sh` erweitert es auf alle `funktion-*.spec.mjs`.
- `pruefe-a.sh`: Semaphor (flock slot1/slot2), tsc mit getrennter Zählung eigener und übriger Fehler, eslint (JSON), Specs nach Zuordnung, Playwright gegen 4320, Einzelbilder, Textstufe nur mit e0-Basis, Zusammenfassung auf stdout und in `pruefe-a.txt`. `PRUEFE_A_NUR_SPECS=1` zeigt nur die Zuordnung. Browser-Pfad: `pruefe-a.sh` setzt `PLAYWRIGHT_BROWSERS_PATH` selbst; die Einzelwerkzeuge brauchen es in der Umgebung.

## GEMEINSAME DATEIEN
Keine Änderung nötig. Vorschlag, nicht ausgeführt:
- `.gitignore`: Zeile `/_werkstatt/belege/` ergänzen. Stufe 6 schreibt nach `_werkstatt/belege/<Kennung>/`; ohne Eintrag erscheint das als untracked.

## PRÜFUNG UND ERGEBNIS
- `node --check` (lib, ueberlappung, einzelbild, bildsatz) und `bash -n pruefe-a.sh`: grün. `test-zuordnung.json` parst, 12 Einträge.
- Selbsttest Überlappung (Scratchpad, da `tests/*` gemeinsam ist): 14 von 14 bestanden. Prüft Befunde, Nicht-Befunde, Obergrenze, späte Schritte, Überlaufbehälter.
- Zuordnung mit je einem echten Repo-Pfad pro Eintrag geprüft. `app/layout.tsx` ergibt alle 11 Specs.
- Stufe (c), `pruefe-a.sh PROBE-A src/components/forms/HeroContactForm.tsx -- /`: GRÜN, Exit 0, Laufzeit 63 s (tsc 10 s, eslint 4 s, Tests 32 s, Bilder 17 s). Der Lauf ohne `PLAYWRIGHT_BROWSERS_PATH` in der Umgebung ist ebenfalls GRÜN. tsc: 0 Fehler in eigenen, 0 in übrigen Dateien. eslint: 0 Fehler, 0 Warnungen. hero-kontakt: 6 erwartet, 0 unerwartet. Die Befundzahl auf `/` (dev) schwankte zwischen den Läufen (238 und 276).
- Textstufe: ÜBERSPRUNGEN (keine e0-Basis). Sie ist nie gegen eine Basis gelaufen und daher ungeprüft.
- Formularroute: Der echte-Route-Test des Hero-Specs sendet zwei POSTs an 4320. Das Dev-Log zeigt `DEV MOCK MODE`; kein `.leads-fallback`.
- Die Läufe prüfen den Arbeitsbaum, nicht HEAD. Darin liegen fremde, uncommittete Änderungen (u. a. `src/app/globals.css`, `src/components/reviews/*`, `src/components/ui/*`).
- Beobachtung (Dev, nicht Produkt): Auf `/` und `/kontakt` eine React-Hydrierungswarnung und eine blockierte Dev-Anfrage. Produktion (4310) meldet 0 Konsolenfehler.

## BILDBELEGE
- (a) `_werkstatt/cache/einzelbild/kontakt/` (`m390.jpg`, `d1440.jpg`, `einzelbild.json`): m390 HTTP 200, Überlappung 66 (fixed 52, textkreuzung 14); d1440 HTTP 200, Überlappung 29 (fixed 14, textkreuzung 15); je 2 Konsolenmeldungen (Dev).
- (b) `_werkstatt/cache/bildsatz/probe/bildsatz.json`: 64 Aufnahmen, 0 Fehler, 0 nicht 200, 0 Überlauf, Überlappung 483 Befunde in 6 Ansichten (fixed 367, textkreuzung 116), 0 Konsole.
- (c) `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/PROBE-A/pruefe-a.txt`; Bilder `…/PROBE-A/bilder/start/m390.jpg` und `d1440.jpg`.
- Zusatz unter `…/scratchpad/E0-PRUEF-02a/belege-zusatz/`: `hauptansichten/bildsatz.json` (36 Ansichten, 367 Aufnahmen, 0 Fehler, Überlappung 2748 Befunde: fixed 2001, textkreuzung 740, sticky 7), `voll/`, `anker/`, `ueberlappung-cli.json`.

## OFFENE FRAGEN
1. Die meisten Befunde sind `fixed`: Kopfzeile und untere Leiste überdecken beim Scrollen Inhalt. Das folgt wörtlich aus (a). Als Befund werten oder getrennt ausweisen?
2. Doppelzählung: Text der fixierten Kopfzeile erscheint bei (c) als `textkreuzung` und zusätzlich als `fixed` beim Inhalt. Soll (c) fixierte Texte ausschließen?
3. Textstufe: `texte.mjs` schreibt nach `_werkstatt/belege/<Kennung>/`, außerhalb der Schreibliste. Entscheidung nötig, bevor eine e0-Basis existiert.
4. Bild-Fehler (HTTP ≠ 200) setzen die Stufe auf ROT, aber nicht den Exit-Code. Das Briefing nennt nur tsc, eslint und Test. Soll der Exit-Code folgen?
5. `_werkstatt/werkzeuge` ist in `tsconfig.json` und `eslint.config.mjs` ausgenommen. Geprüft sind die Werkzeuge nur per `node --check`.

## NACHTRAG (Orchestrator-Auftrag nach Abnahme)

**Geändert:** `ueberlappung.mjs`, `pruefe-a.sh`, `texte.mjs` (nur Option `--ziel`), `texte-vergleich.mjs` (Optionen `--vorher-ordner`, `--nachher-ordner`). Keine Produktdateien.

**1 · Feste Ebene.** Ein Element mit `data-feste-ebene`, selbst oder über einen Vorfahren, ist kein Verdecker für (a). Text in einer festen Ebene (Kennzeichen oder `position: fixed/sticky`, selbst oder Vorfahr) zählt bei (c) nicht; Paare mit so einem Text entfallen. Schwebende Knöpfe, Banner und Bubbles bleiben Befunde. Auslegung: Ein fixiertes Element innerhalb einer Ebene mit Kennzeichen gehört zur Ebene.
- Selbsttest 19 von 19 bestanden (fünf neue Fälle).
- Beleglauf `/kontakt`, A/B auf gleichem Seitenzustand: m390 (c) 21 → 0, Gesamt 89 → 68; d1440 (c) 15 → 0, Gesamt 29 → 14. Art (a) unverändert (68 bzw. 14). Einzelbefunde wechseln zwischen Durchläufen (bewegte Inhalte).
- **Offen:** Kein Produktelement trägt `data-feste-ebene` (Suche in `src` ohne Treffer). Die Regel für (a) greift erst, wenn Kopf und untere Leiste das Attribut setzen.

**2 · Exit-Code.** Bildfehler (HTTP ≠ 200 oder Ausnahme) setzen Exit 1. Beleglauf `PROBE-B src/config/services.js -- /gibt-es-nicht`: Bilder ROT, Gesamt ROT, Exit 1.

**3 · Textstufe.** `texte.mjs --ziel DIR` und `texte-vergleich.mjs --vorher-ordner/--nachher-ordner`; Standardpfade unverändert. `pruefe-a.sh` schreibt nach `_werkstatt/cache/texte/<Kennung>` und vergleicht gegen `_werkstatt/belege/e0`. Die Basis fehlt weiterhin, daher ÜBERSPRUNGEN mit Grund. `PRUEFE_A_BASIS_ORDNER` ersetzt die Basis, nur für Prüfläufe.
- Beleglauf GRÜN: `PROBE-C` gegen Testbasis `e0test` (Scratchpad), Exit 0, Ausgabe in `_werkstatt/cache/texte/PROBE-C/`. `_werkstatt/belege` unverändert (Prüfsumme gleich).
- Negativkontrolle ROT: `PROBE-D` gegen `e0neg` mit einer zusätzlichen Basiszeile. Vergleich ROT (entfernt 1), Gesamt ROT, Exit 0.

**Belege:** `…/scratchpad/PROBE-B/pruefe-a.txt`, `…/PROBE-C/pruefe-a.txt`, `…/PROBE-D/pruefe-a.txt`; Vergleich `_werkstatt/cache/texte/PROBE-C/texte-vergleich-gegen-e0test.json`; Einzelbild nach Regel `_werkstatt/cache/einzelbild/kontakt/` (m390 68, d1440 14); A/B-Skript `…/E0-PRUEF-02a/ab/ab.mjs`; Testbasen `…/E0-PRUEF-02a/belege-zusatz/e0test` und `e0neg`.

**Offene Fragen (neu):**
1. Wer setzt `data-feste-ebene` auf Kopf und untere Leiste (Produkt-Paket)?
2. Textstufe ROT setzt Gesamt auf ROT, der Exit-Code bleibt 0. Soll sie den Exit-Code setzen?
3. Wer legt die Basis `_werkstatt/belege/e0` an, und aus welchem Stand?

**Erledigt aus dem Bericht:** Frage 2 (Doppelzählung) durch Regel (c), Frage 3 (Textstufe schreibt nach belege) durch `--ziel`, Frage 4 (Exit bei Bildfehlern) durch Punkt 2. Frage 1 nur teilweise (Attribut fehlt im Produkt). Der `.gitignore`-Vorschlag gilt nur noch für Aufrufe von `texte.mjs` ohne `--ziel`.
