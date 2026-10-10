# Rückgabe P0-TEST-06 F-07/F-08 (Kurzfassung)
- 13 Tests je Projekt, mobil 13/13, desktop 13/13: Kalender auf /termin und /kontakt#termin-buchen (Pflichtfelder, Leerzeichen-Name, Einwilligung, Gutfall mit Tag/Slot in terminDetails), Termin-Formular (Pflichtfelder, Telefon < 6, Einwilligung, Gutfall, echte Route).
- Entscheidung Orchestrator zu OF-1: Ein Test gegen die echte Route je Datei genügt (Rate-Limit-Schutz); der Kalender nutzt dieselbe Route.
- Befunde: Kalender sendet `_t = Date.now() - 3000` (Bot-Schwelle wirkungslos), /termin-Formular sendet kein `_t`; Name aus Leerzeichen im /termin-Formular würde gesendet → intern I-18.
