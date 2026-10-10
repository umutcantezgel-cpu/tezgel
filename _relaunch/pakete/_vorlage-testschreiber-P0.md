# Gemeinsamer Teil · Testschreiber-Pakete P0 (Bestandsschutz)

## 2 Rollenbriefing · Testschreiber (Haiku, Stufe 2)
Du schreibst Funktionstests nach dem Testmuster `_relaunch/werkzeuge/tests/funktion-hero-kontakt.spec.mjs`. Du prüfst **Verhalten** (was gesendet wird, welcher Zustand folgt, was blockiert wird), nicht Aussehen. Häufige Fehler, die du vermeidest: Ist-Zustand fotografieren statt Verhalten prüfen; Tests, die nur das Laden einer Seite prüfen; feste Wartezeiten statt Zustandsabfragen (Ausnahme: `warteBotSchwelle` vor Tests gegen die echte Route); Selektoren über Gestaltungsklassen (z. B. `.bg-orange-600`) – nimm Rollen, Labels, `id`, `name`, `type`, sichtbare Texte von Bedienelementen; Klick vor der Hydrierung (vor der ersten Interaktion je Seite `await bedienbar(locator)` aus `fixtures.mjs`).

## 4 Das Projekt in fünf Sätzen (vorläufig)
Fliesenverlegung Tezgel ist ein Fliesenlegerbetrieb von Deniz Tezgel in Aßlar (Mittelhessen), seit 2008. Die Website (Next.js 16, App Router, Tailwind 4) zeigt Leistungen, Ratgeber und Standortseiten und nimmt Anfragen über Formulare, WhatsApp und Telefon entgegen. Sie wird gestalterisch komplett umgebaut; dabei darf keine Funktion kaputtgehen. Deine Tests sind der Bestandsschutz: Sie müssen jetzt auf dem Ausgangsstand grün sein und nach dem Umbau weiter gelten. Deshalb prüfen sie nur Verhalten und Daten, nie Farben, Klassen oder Layout.

## 8 Grenzen
- Schreiben darfst du **nur** die in der Kopfzeile genannte Testdatei.
- Server läuft bereits auf `http://127.0.0.1:4310` (Produktions-Build). Starte, baue oder stoppe nichts. Kein `npm install`.
- Testlauf nur so: `cd /home/user/tezgel/_relaunch/werkzeuge && RELAUNCH_OUTPUT=<dein Scratch-Ordner>/out RELAUNCH_REPORT=<dein Scratch-Ordner>/bericht.json npx playwright test tests/<deine-datei> --project=desktop` und `--project=mobil`.
- Importiere `test`, `expect`, `warteBotSchwelle`, `istEchteReferenz` aus `./fixtures.mjs`. Die Fixture `anfragen` enthält die Körper aller POST `/api/anfrage`; die Attrappe antwortet `{ success: true, referenceId: 'TEZ-26-TEST' }`. Mit `test.use({ echteRoute: true })` geht die Anfrage an die echte Route im Mock-Modus (es wird nichts versendet).
- Höchstens **ein** Test je Datei gegen die echte Route (Rate-Limit 5 / 10 min je IP; die Fixture vergibt eigene IPs).
- Kein `page.clock`. Keine echten externen Aufrufe (die Sperre fängt sie ab). Kein `curl`, kein POST außerhalb des Browsers.
- Ändere nie Dateien unter `src/` – findest du einen Fehler in der App, beschreibe ihn unter OFFENE FRAGEN.

## 11 Ausgabeformular
GEÄNDERTE DATEIEN · WAS UND WARUM (je Test ein Satz: welche Kernaufgabe) · TESTS UND ERGEBNIS (Ausgabe beider Projekte, z. B. „mobil 4/4, desktop 4/4“) · BILDBELEGE (–) · OFFENE FRAGEN · RISIKEN

## 12 Selbstprüfung
Laufen alle Tests in beiden Projekten grün? Prüft jeder Test eine Kernaufgabe (Daten/Zustand), nicht nur das Laden? Keine Gestaltungsklassen in Selektoren? Keine festen Wartezeiten außer `warteBotSchwelle`?
Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.
Letzte Zeile: `=== ENDE <Kennung> · BEREIT ZUR RÜCKGABE ===`
