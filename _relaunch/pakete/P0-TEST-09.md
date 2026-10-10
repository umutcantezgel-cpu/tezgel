# P0-TEST-09 · Testschreiber · Stufe 2 · Modell: Haiku · Kern-Version: vorläufig (P0) · Schreibrechte: _relaunch/werkzeuge/tests/funktion-einwilligung.spec.mjs · Umfang: F-11 Einwilligung und F-12 Karten hinter Einwilligung

## Aufgabe in einem Satz
Schreibe Funktionstests der Kernaufgabe für F-11 Einwilligung und F-12 Karten hinter Einwilligung nach dem Muster `tests/funktion-hero-kontakt.spec.mjs`, grün auf dem Ausgangsstand, in `_relaunch/werkzeuge/tests/funktion-einwilligung.spec.mjs`.

## Vorlage
`_relaunch/pakete/_vorlage-testschreiber-P0.md` (Rollenbriefing, Projekt, Grenzen, Ausgabeformular, Selbstprüfung) und `_relaunch/FUNKTIONSLISTE.md` (Kernaufgaben). Lies zuerst beide und das Muster.

## Orte
/ und /standorte und /kontakt

## Hinweise
Für Erstbesuch: test.use({ einwilligung: 'erstbesuch' }). Banner erscheint; „Alle ablehnen“ und „Alle akzeptieren“ sind gleichwertig erreichbar und speichern Cookie tezgel_consent_status; #cookie-settings öffnet Einstellungen. Karten: ohne Marketing-Einwilligung keine Anfrage an maps.googleapis.com/openstreetmap (Fixture protokoll, Einträge art 'fremd').

## Schritte
1. Lies Vorlage, Funktionsliste, Muster und den Quellcode der Komponente(n) (nur lesen).
2. Schreibe je Funktion: (a) Blockier-/Validierungsfall, (b) Gutfall mit Prüfung der gesendeten Nutzlast (Fixture `anfragen`) bzw. des Ziels/Zustands, (c) bei Formularen genau ein Test gegen die echte Route (`test.use({ echteRoute: true })`, `warteBotSchwelle`, `istEchteReferenz`).
3. Lauf in beiden Projekten, bis alles grün ist. Wenn eine Funktion auf dem Ausgangsstand nachweislich kaputt ist: Test mit `test.fixme` und Begründung, als OFFENE FRAGE melden.
4. Rückgabe nach Ausgabeformular.
