# P0-TEST-01 · Testschreiber · Stufe 2 · Modell: Haiku · Kern-Version: vorläufig (P0) · Schreibrechte: _relaunch/werkzeuge/tests/funktion-preisrechner.spec.mjs · Umfang: F-02 PricingCalculator

## Aufgabe in einem Satz
Schreibe Funktionstests der Kernaufgabe für F-02 PricingCalculator nach dem Muster `tests/funktion-hero-kontakt.spec.mjs`, grün auf dem Ausgangsstand, in `_relaunch/werkzeuge/tests/funktion-preisrechner.spec.mjs`.

## Vorlage
`_relaunch/pakete/_vorlage-testschreiber-P0.md` (Rollenbriefing, Projekt, Grenzen, Ausgabeformular, Selbstprüfung) und `_relaunch/FUNKTIONSLISTE.md` (Kernaufgaben). Lies zuerst beide und das Muster.

## Orte
/preise (Hauptort), zusätzlich ein Gutfall auf /faq

## Hinweise
Komponente src/components/pricing/PricingCalculator.tsx, Konstanten pricing.constants.ts. Einwilligungs-Checkbox ist vorab angehakt (Ausgangsstand) – teste das Senden, nicht den Vorab-Haken.

## Schritte
1. Lies Vorlage, Funktionsliste, Muster und den Quellcode der Komponente(n) (nur lesen).
2. Schreibe je Funktion: (a) Blockier-/Validierungsfall, (b) Gutfall mit Prüfung der gesendeten Nutzlast (Fixture `anfragen`) bzw. des Ziels/Zustands, (c) bei Formularen genau ein Test gegen die echte Route (`test.use({ echteRoute: true })`, `warteBotSchwelle`, `istEchteReferenz`).
3. Lauf in beiden Projekten, bis alles grün ist. Wenn eine Funktion auf dem Ausgangsstand nachweislich kaputt ist: Test mit `test.fixme` und Begründung, als OFFENE FRAGE melden.
4. Rückgabe nach Ausgabeformular.
