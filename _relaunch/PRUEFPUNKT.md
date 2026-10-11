# PRUEFPUNKT

- Lauf: 1 (angepasst, E-000) · Phase: P4 (Fundament) · P3 abgeschlossen
- Live auf main: f60360d (Produkt f2c4180). Lokal, nicht gepusht: P4-13 (0d26ca5, wirkt sofort auf `/`), Abnahme c5ef582, Belege und Entscheidungen der Runde 2 bis f4584fb.
- Server: 4321 = Vorschau c5ef582-v (sieben Kern-Seiten), 4324 = Kandidat c5ef582, 4337 = Live f2c4180, 4323 = Bestand-`/` a8e049f, 4310 = Ausgangsstand 707a93d.
- P4-Tor Runde 2 (`belege/p4-tor-r2/ERGEBNIS.md`):
  - H1 und H2 behoben (ohne JS 0; Fünf-Sekunden Desktop ≥ Bestand, `/standorte` streng 3 → 5).
  - Suite 382/1/15: 1 Lastfall auf einer Bestandsseite, einzeln 6/6 auf Vorschau und Live.
  - a11y harte Kennzahlen 0 (ausgenommen „dünn“ 1 nach E-018), axe 57/0, Fotos und Wortbruch 0, texte2 1 rot (erklärt: H1).
  - Gegenprobe 13/15 (W9, E-034), Mutation P6 6/6.
  - T2 `/`: Pixel nur Kopf; Lighthouse gegen Live gleich; INP max 80 ms.
  - Z-12 TBT verfehlt → E-035, P4-14 vor W1.
- Werkzeugbefund E-036: Pixelvergleiche seit P2-PLAN-01 blind (Maske). Berichtigt und nachgeprüft (M3 und rückwirkend Stichprobe: nur der gewollte Haken auf `/leistungen/aussen`). Vollvergleich rückwirkend läuft (`cache/pixel/p4r2-voll-rueckwirkend/`).
- Laufend: Gegenprüfer P4-GEG2 (Opus, Auftrag `pakete/P4-GEG2.md`, 5 Urteile inkl. Werkzeugregel E-035).
- Nächster exakter Schritt: Rückgabe P4-GEG2 auswerten. Bei bestanden: Bereichsprüfung, `git fetch`, `git push origin HEAD:main`, danach `live-rauchtest.sh` und `live-browser.mjs` mit fester Kennung. Dann P4-14 (Aufschub mit Werkzeugregel, falls zugelassen), danach P5 W1 `/bad`.
- Offen für den Auftraggeber: M-20 (Zielgruppe im Wortlaut /kontakt, /leistungen, /ueber-uns), M-19 und weitere in MENSCHEN.
