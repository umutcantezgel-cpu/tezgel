# E3-PRUEF-A-1 · Rückgabe (vom Orchestrator aus der Antwort des Prüfers und den Belegen übertragen)

Belege: Scratchpad `E3-PRUEF-A-1/` (pruefe-a.log, abschnitte-start, abschnitte-kontakt, bewegung, axe, werte).

## Ergebnis
- tsc GRÜN (0 Fehler), eslint GRÜN (0 Fehler).
- Funktionstests GRÜN: 13 Specs, 290 erwartet, 0 unerwartet, 0 flaky, 20 übersprungen (4 bekannte fixme, 8 Tracking nur mit RELAUNCH_TRACKING=1, 8 projektbedingt).
- Bilder: HTTP 200, Konsole 0, Überlappung 0; **Überlauf 1** auf `/` m390 (`div.plan-buendig`, −10 bis 400 px) → behoben in 3c44b4c (Mobilplan ohne Bemaßungsrand).
- Texte ROT: (a) 290 „entfernte“ Zeilen auf `/` – Messfehler durch `content-visibility: auto` (innerText lässt übersprungene Abschnitte aus) → `texte.mjs` hebt es vor dem Lesen auf (3c44b4c); (b) `/standorte` „5 km“ – Korrektur Firmensitz aus E-020 → Erlaubnis (3c44b4c).
- Bewegung (4320, `/`): Register m390/d1440 – 8 Kennungen gefunden (neu: `sig-flucht`, `leitachse`), 0 unbekannt, 0 ohne Register; reduziert – 0 Bewegungsbefunde (m390, d1440, /kontakt m390); Einzelbilder `sig-kreuzlinie` (m390, d1440) und `sig-flucht` (d1440) erzeugt.
- axe `/`, `/kontakt` (m390, d1440): 0 Verstöße.
- werte.mjs über 14 Dateien: 0 Befunde.

## Folgen (Orchestrator)
- Plan-Lot im geschnittenen Plan erschien bei 25 % noch nicht (Ursprung unter der Schnittkante) → `transform-box: view-box` (9ccf5d1).
- Abschnittsbilder zeigten spät gezeichnete Abschnitte leer → `abschnitte.mjs` und `einzelbild.mjs --voll` heben `content-visibility` auf (9ccf5d1).
- Nachweis von Überlauf, Text und Lighthouse im nächsten Prüflauf.
