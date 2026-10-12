# Tor e6-e039 · E6-Welle · live 5be70eb → 1d837bd · 12.10.2026

Inhalt: S-20 Firma (16d892e), S-22 Ausstellung (3aa9309), S-23 Referenzen + ReviewsSection (a7136de), S-24 Termin
(268cfdd), S-25 Beratung + CalendlySection (14f3e0e), S-26 FAQ/Preise + PriceCard (2c46ffb), S-27 Förderung/Downloads/Login
(13e948d), S-28 Impressum/Datenschutz/AGB (614a2d0), S-29 Widerruf/Cookie-Richtlinie/Barrierefreiheit (b230ba5); dazu
MIKROTEXTE-Freigaben (66792e4, 8695b7b) und Werkzeugfixes texte.mjs (3c37a13), axe.mjs (d6cfa98). Produktänderungen nur in
den 25 Seiten und den drei nur dort eingebundenen Bausteinen.

## Automatische Stufen (tor-s.sh, TOR_PORT 4365, Pixel gegen live 4364)
- Grün: Sperrklinke, Reinraum, Bereich (HTML nur auf den 25 Seiten), Werte 0, Altsystem 0, texte2 rot 0, axe 0
  ernst/kritisch, Wortbruch 0, Fotos 100/0 (Überlauf 0, Konsole 0), Pixel 18 Vergleiche 0 abweichend.
- `12-specs` im Torlauf: 379 bestanden, **1 rot** – `[desktop] funktion-einwilligung › /standorte: „Karte laden &
  zustimmen“` (Einwilligung nach dem Klick nicht gesetzt, Zeitüberschreitung 10 s). /standorte und die
  Einwilligungsbausteine sind in diesem Stand unverändert. Gegenproben: dieselbe Gruppe (3 Fälle × 2 Projekte, 3×) gegen
  **live 4364 ebenfalls 1 rot**, gegen 4365 0 rot; einzeln 8/8 grün auf 4364 und 4365; eigene Probe (10 Klicks mit
  Protokoll) 10/10. Befund liegt im Bestand (Klick geht unter paralleler Last gelegentlich verloren) → Ursachensuche als
  Punkt in R-02. **Eine Wiederholung der vollen Suite gegen 4365: 380 bestanden, 0 rot** (`tor/12-specs-wdh.log`).

## a11y-zusatz (25 Seiten, 300 Läufe) und Abgleich mit live
- Harte Kennzahlen 0: Falle, Zyklus, Sprunglink, Reflow/Zoom/Textabstand waagerecht, forced-Felder, ohne JS (erster
  Bildschirm, Navigation).
- `sprung_rueckwaerts` 4 = /faq und /preise d1440 je 1 (beide Bannerzustände): Tab-Rücksprung im Preisrechner.
  **Live gleich** (`belege/e6-e039-live-ref/`, 4 auf denselben Seiten) – Bestandsbefund, Behebung in R-02b.
- `ohnejs text_unter_80` 6 = /termin (live gleich) sowie /faq und /preise (neu): Der Rechner wird dort jetzt wie auf `/`
  und `/leistungen` nachgeladen (`next/dynamic` + FormularPlatzhalter mit Telefon/WhatsApp/E-Mail); ohne JS steht der
  Platzhalter. Entscheidung über Lighthouse (unten): ohne messbaren Gewinn Rückkehr zum direkten Einbau wie live.
- Weich: Fokus verdeckt 4 (fest 4, Erstbesuch d1440), Zoom „nie im Bild“ 7 je Seite (Kopf, R-02a), Textabstand
  abgeschnitten 1.

## Lighthouse
Folgt im ruhigen Fenster (nach R-02a/b).
