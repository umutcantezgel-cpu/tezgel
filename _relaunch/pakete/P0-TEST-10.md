# P0-TEST-10 · Testschreiber · Stufe 2 · Modell: Haiku · Kern-Version: vorläufig (P0) · Schreibrechte: _relaunch/werkzeuge/tests/funktion-navigation.spec.mjs · Umfang: F-13 Navigation, F-14 FAQ, F-16 Blog, F-17 404, F-18 Login, F-19 Bewertungen

## Aufgabe in einem Satz
Schreibe Funktionstests der Kernaufgabe für F-13 Navigation, F-14 FAQ, F-16 Blog, F-17 404, F-18 Login, F-19 Bewertungen nach dem Muster `tests/funktion-hero-kontakt.spec.mjs`, grün auf dem Ausgangsstand, in `_relaunch/werkzeuge/tests/funktion-navigation.spec.mjs`.

## Vorlage
`_relaunch/pakete/_vorlage-testschreiber-P0.md` (Rollenbriefing, Projekt, Grenzen, Ausgabeformular, Selbstprüfung) und `_relaunch/FUNKTIONSLISTE.md` (Kernaufgaben). Lies zuerst beide und das Muster.

## Orte
global (Header/Mobilmenü), /faq, /blog, /blog/fliesen-reinigen-pflegen, /gibt-es-nicht, /login, /

## Hinweise
Mega-Menü: Hover/Fokus öffnet, Escape schließt; Mobilmenü (Projekt mobil): öffnen, Link folgen, Escape; Sprunglink führt zu #main-content; FAQ aria-expanded; 404 liefert Status 404 (response.status()); Login meldet Fehler ohne Absturz; Bewertungs-Karussell Weiter/Zurück.

## Schritte
1. Lies Vorlage, Funktionsliste, Muster und den Quellcode der Komponente(n) (nur lesen).
2. Schreibe je Funktion: (a) Blockier-/Validierungsfall, (b) Gutfall mit Prüfung der gesendeten Nutzlast (Fixture `anfragen`) bzw. des Ziels/Zustands, (c) bei Formularen genau ein Test gegen die echte Route (`test.use({ echteRoute: true })`, `warteBotSchwelle`, `istEchteReferenz`).
3. Lauf in beiden Projekten, bis alles grün ist. Wenn eine Funktion auf dem Ausgangsstand nachweislich kaputt ist: Test mit `test.fixme` und Begründung, als OFFENE FRAGE melden.
4. Rückgabe nach Ausgabeformular.
