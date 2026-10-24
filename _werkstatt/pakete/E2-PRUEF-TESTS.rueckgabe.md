# E2-PRUEF-TESTS · Rückgabe (Haiku, Workflow wf_cd610d35-773, zweiter Anlauf)

GEÄNDERTE DATEIEN
- /home/user/tezgel/_werkstatt/werkzeuge/tests/funktion-hero-kontakt.spec.mjs
- /home/user/tezgel/_werkstatt/werkzeuge/tests/funktion-express-funnel.spec.mjs
- /home/user/tezgel/_werkstatt/werkzeuge/tests/funktion-einwilligung.spec.mjs
- /home/user/tezgel/_werkstatt/werkzeuge/tests/funktion-navigation.spec.mjs
- Unverändert: funktion-preisrechner.spec.mjs (prüft `/` nicht; die Orte stehen dort schon ohne `/`).
- Nichts committet, nichts gepusht. Plan: /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-PRUEF-TESTS/plan.md

WAS UND WARUM
- F-01 Hero: Aufruf auf `/#termin` umgestellt. Neu: Anker führt zum Abschnitt, der das Formular enthält. Die echte-Route-Prüfung wartet jetzt auf die Hydrierung, bevor die 1,5-s-Bot-Schwelle läuft (sonst kam „TEZ-BOT-IGN“).
- F-03 Express: `/#express-anfrage` aus der Ortsliste entfernt (LAGEBILD: ohne `/`). `/kontakt`, `/leistungen`, `/foerderung` bleiben.
- F-11/F-12 Einwilligung: Zwei-Klick-Prüfung nur noch auf `/standorte` und `/kontakt`. Neu auf `/`: keine Anfrage an Karten-Hosts. Die Prüfung „Karte laden“ auf `/` entfällt, weil dort kein Knopf mehr ist. Banner-Prüfungen auf `/` bleiben.
- F-13 Navigation: Aufklappblatt im Kopf (Zeiger, Tastatur, Escape, Klick führt zum Ziel). Menüblatt unter 80 rem (öffnen, Escape, Schließen-Knopf, Bereich aufklappen, Link folgen). Namen aus `src/config/navigation.js`.
- F-14: Akkordeon-Prüfung auf `/` entfällt; `/faq` bleibt.
- F-17 404: H1 und drei Wege in dieser Reihenfolge (Termin, Startseite, Anruf).
- F-19 Stimmen: Karussell-Prüfungen entfallen. Neu: drei Stimmen wörtlich gleich REVIEWS, c-wolf zuerst und größer, keine Blätter-Knöpfe. REVIEWS wird als Quelltext gelesen, weil die Datei ohne „type“ im Paket nicht importierbar ist.
- Gegenproben: Liste in /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-PRUEF-TESTS/gegenproben.txt. Bei der ersten Runde blieben drei Prüfungen grün, weil ihr falscher Wert kurz im Übergang auftrat. Dort habe ich einen nie erreichten Wert gewählt und neu gelaufen.

GEMEINSAME DATEIEN (nicht geändert, Wünsche)
1. `_werkstatt/werkzeuge/tests/fixtures.mjs`, Funktion `warteBotSchwelle(page)`: vor dem Warten `bedienbar(locator)` auf das Formular aufrufen, dann den Locator als Parameter übergeben. Betrifft die echten-Route-Prüfungen in `funktion-preisrechner.spec.mjs` und `funktion-express-funnel.spec.mjs`; dort ist die Stelle noch ungesichert (heute grün).
2. Seite, zur Prüfung: Auf Mobil (390 × 844) kommt nach dem Scrollen zum Abschnitt „Unser Hauptstandort in Aßlar“ keine Kartenanfrage; der Iframe liegt bei etwa 3428 px. Desktop (1275 px) lädt. Diagnose: /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-PRUEF-TESTS/diag/diag-standorte.mjs

PRÜFUNG UND ERGEBNIS
Vorher (4320, Logs `<datei>-vorher.log`): hero 6 grün; preisrechner 18 grün; express 24 grün, 2 rot (`/#express-anfrage`); einwilligung 29 grün, 5 rot (4 erwartet, Karte-Platzhalter auf `/`; 1 schon rot: mobil `/standorte` „Karte ohne Platzhalter“); navigation 23 grün, 18 rot, 5 übersprungen (alte Namen, Karussell, Startseiten-FAQ, 404-Wege).

Befehl je Datei: `cd /home/user/tezgel/_werkstatt/werkzeuge && RELAUNCH_BASE=http://127.0.0.1:4320 timeout 590 npx playwright test tests/<datei> --workers=1 --reporter=line`

Schlusslauf (Logs `<datei>-nachher.log`):
- hero: 8 bestanden, 0 gescheitert
- preisrechner: 18 bestanden
- express: 24 bestanden
- einwilligung: 30 bestanden, 2 gescheitert (mobil `/standorte`: „Karte laden & zustimmen“ und „Karte ohne Platzhalter“ melden 0 Kartenanfragen)
- navigation: 41 bestanden, 5 übersprungen (E0-Bestand)
- Gesamt: 121 bestanden, 2 gescheitert, 5 übersprungen (vorher 100 / 25 / 5)

Gegenproben (Wert verfälscht, Lauf rot, zurück, Lauf grün): alle geänderten und neuen Prüfungen der vier Specs rot. Sicherungen der richtigen Fassungen geprüft (cmp).

BILDBELEGE
Keine Bilder. Logs und Gegenprobenläufe liegen im Verzeichnis /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-PRUEF-TESTS/ (`<datei>-vorher.log`, `<datei>-nachher.log`), die Gegenprobenlogs im Unterverzeichnis `gegenproben/`. Befund `404`: .../scratchpad/E2-PRUEF-TESTS/404-dev.html.

OFFENE FRAGEN
1. Zählung je Funktion: F-03 26 → 24, F-12 16 → 14, F-14 8 → 6. Der Maßstab „mindestens gleich viele“ ist dort nicht erfüllt, weil die Orte auf `/` entfallen. LAGEBILD nennt keinen Ersatzort; ich habe keinen erfunden. Soll einer benannt werden?
2. Mobil `/standorte`: Die Prüfung „Karte laden & zustimmen“ war im Vorlauf grün und ist jetzt rot. Liegt das an der Prüfung (Scroll zur Karte) oder an der Seite? Ich habe an den beiden Prüfungen nichts geändert.

=== ENDE E2-PRUEF-TESTS · BEREIT ZUR RÜCKGABE ===
