# P0-TEST-05 · Testschreiber · Stufe 2 · Modell: Haiku · Kern-Version: vorläufig (P0) · Schreibrechte: _relaunch/werkzeuge/tests/funktion-konfigurator.spec.mjs · Umfang: F-06 FliesenKonfigurator (4 Schritte) inkl. Materialrichtwert

## Aufgabe in einem Satz
Schreibe Funktionstests der Kernaufgabe für F-06 FliesenKonfigurator (4 Schritte) inkl. Materialrichtwert nach dem Muster `tests/funktion-hero-kontakt.spec.mjs`, grün auf dem Ausgangsstand, in `_relaunch/werkzeuge/tests/funktion-konfigurator.spec.mjs`.

## Vorlage
`_relaunch/pakete/_vorlage-testschreiber-P0.md` (Rollenbriefing, Projekt, Grenzen, Ausgabeformular, Selbstprüfung) und `_relaunch/FUNKTIONSLISTE.md` (Kernaufgaben). Lies zuerst beide und das Muster.

## Orte
/fliesen/konfigurator

## Hinweise
Komponente src/components/funnels/FliesenKonfigurator.jsx. Rechner-Pflicht: mindestens 10 verschiedene Eingabekombinationen (Fläche, Muster/Verschnitt) – erwarteter Richtwert = heutiges Verhalten (aus dem Code berechnet und im Test als Tabelle festgehalten). Danach POST inquiryType „fliesen“ mit fliesenDetails.

## Schritte
1. Lies Vorlage, Funktionsliste, Muster und den Quellcode der Komponente(n) (nur lesen).
2. Schreibe je Funktion: (a) Blockier-/Validierungsfall, (b) Gutfall mit Prüfung der gesendeten Nutzlast (Fixture `anfragen`) bzw. des Ziels/Zustands, (c) bei Formularen genau ein Test gegen die echte Route (`test.use({ echteRoute: true })`, `warteBotSchwelle`, `istEchteReferenz`).
3. Lauf in beiden Projekten, bis alles grün ist. Wenn eine Funktion auf dem Ausgangsstand nachweislich kaputt ist: Test mit `test.fixme` und Begründung, als OFFENE FRAGE melden.
4. Rückgabe nach Ausgabeformular.
