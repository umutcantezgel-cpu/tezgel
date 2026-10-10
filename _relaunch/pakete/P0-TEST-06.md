# P0-TEST-06 · Testschreiber · Stufe 2 · Modell: Haiku · Kern-Version: vorläufig (P0) · Schreibrechte: _relaunch/werkzeuge/tests/funktion-termin.spec.mjs · Umfang: F-07 BookingCalendar und F-08 Termin-Formular

## Aufgabe in einem Satz
Schreibe Funktionstests der Kernaufgabe für F-07 BookingCalendar und F-08 Termin-Formular nach dem Muster `tests/funktion-hero-kontakt.spec.mjs`, grün auf dem Ausgangsstand, in `_relaunch/werkzeuge/tests/funktion-termin.spec.mjs`.

## Vorlage
`_relaunch/pakete/_vorlage-testschreiber-P0.md` (Rollenbriefing, Projekt, Grenzen, Ausgabeformular, Selbstprüfung) und `_relaunch/FUNKTIONSLISTE.md` (Kernaufgaben). Lies zuerst beide und das Muster.

## Orte
/termin und /kontakt#termin-buchen

## Hinweise
Komponenten src/components/contact/BookingCalendar.tsx und src/app/termin/page.jsx. Bekannter Fehler im Ausgangsstand: Datum/Uhrzeit des Kalenders erreichen die Mail nicht (Zod verwirft) – prüfe nur, was der Client sendet und welcher Zustand folgt; den Fehler NICHT „korrigieren“.

## Schritte
1. Lies Vorlage, Funktionsliste, Muster und den Quellcode der Komponente(n) (nur lesen).
2. Schreibe je Funktion: (a) Blockier-/Validierungsfall, (b) Gutfall mit Prüfung der gesendeten Nutzlast (Fixture `anfragen`) bzw. des Ziels/Zustands, (c) bei Formularen genau ein Test gegen die echte Route (`test.use({ echteRoute: true })`, `warteBotSchwelle`, `istEchteReferenz`).
3. Lauf in beiden Projekten, bis alles grün ist. Wenn eine Funktion auf dem Ausgangsstand nachweislich kaputt ist: Test mit `test.fixme` und Begründung, als OFFENE FRAGE melden.
4. Rückgabe nach Ausgabeformular.
