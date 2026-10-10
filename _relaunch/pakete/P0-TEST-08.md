# P0-TEST-08 · Testschreiber · Stufe 2 · Modell: Haiku · Kern-Version: vorläufig (P0) · Schreibrechte: _relaunch/werkzeuge/tests/funktion-kontaktwege.spec.mjs · Umfang: F-10 WhatsApp-Links/Widget und F-15 Telefon/E-Mail

## Aufgabe in einem Satz
Schreibe Funktionstests der Kernaufgabe für F-10 WhatsApp-Links/Widget und F-15 Telefon/E-Mail nach dem Muster `tests/funktion-hero-kontakt.spec.mjs`, grün auf dem Ausgangsstand, in `_relaunch/werkzeuge/tests/funktion-kontaktwege.spec.mjs`.

## Vorlage
`_relaunch/pakete/_vorlage-testschreiber-P0.md` (Rollenbriefing, Projekt, Grenzen, Ausgabeformular, Selbstprüfung) und `_relaunch/FUNKTIONSLISTE.md` (Kernaufgaben). Lies zuerst beide und das Muster.

## Orte
/, /kontakt, Fußbereich auf /bad; mobil die MobileBottomBar

## Hinweise
Ziele: api.whatsapp.com/send?phone=491726728504 bzw. wa.me/491726728504 mit vorbelegtem Text; tel:+4964414483567 und tel:+491726728504; mailto:info@tezgel.de. Prüfe href/Ziel und window.__relaunchOpened, nicht Aussehen.

## Schritte
1. Lies Vorlage, Funktionsliste, Muster und den Quellcode der Komponente(n) (nur lesen).
2. Schreibe je Funktion: (a) Blockier-/Validierungsfall, (b) Gutfall mit Prüfung der gesendeten Nutzlast (Fixture `anfragen`) bzw. des Ziels/Zustands, (c) bei Formularen genau ein Test gegen die echte Route (`test.use({ echteRoute: true })`, `warteBotSchwelle`, `istEchteReferenz`).
3. Lauf in beiden Projekten, bis alles grün ist. Wenn eine Funktion auf dem Ausgangsstand nachweislich kaputt ist: Test mit `test.fixme` und Begründung, als OFFENE FRAGE melden.
4. Rückgabe nach Ausgabeformular.
