# E2-PRUEF-TESTS-GEGEN · Gegenprüfung (Haiku, Workflow wf_cd610d35-773)

- **Urteil:** Mängel
- **Gelockert:** nichts
- **Ohne Gegenprobe:** funktion-einwilligung.spec.mjs: die Zwei-Klick-Prüfungen auf /standorte und /kontakt (Körper unverändert, nur die Ortsliste ohne / gekürzt) haben keine eigene Gegenprobe. Kein Mangel an der Prüfung selbst, aber nicht belegt.
- **Funktionen ohne Prüfung:** keine
- **Schlusslauf:** Schlusslauf der fünf Specs gegen 4320 (Befehl wie vorgegeben; Berichte nach /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-PRUEF-TESTS-GEGEN/ umgeleitet, Dauer 5,9 min): 121 bestanden, 2 gescheitert, 5 übersprungen. Die Summe stimmt mit dem Bericht des Prüfers überein. Gescheitert sind beide Fälle in funktion-einwilligung.spec.mjs, mobil, /standorte: Zeile 157 „Karte laden &amp; zustimmen“ (im Wiederholungslauf grün) und Zeile 178 „Karte ohne Platzhalter“ (schon im Vorlauf rot). Übersprungen: 5, wie im Vorlauf; die Zahl der skip-/fixme-Stellen ist gegenüber HEAD unverändert.

## Bemerkungen

URTEIL: Mängel, weil (a) der Maßstab „mindestens gleich viele Prüfungen je Funktion“ bei F-03, F-12 und F-14 nicht erfüllt ist und (b) zwei Mobil-Prüfungen rot sind, deren Ursache im Scroll-Ziel der Prüfung liegt. Lockerungen habe ich keine gefunden.

1. LOCKERUNGSPRÜFUNG (Schritt 1): Keine Prüfung weicht in ihrer Erwartung ab. Die Änderungen sind Ort-, Namens- und Strukturänderungen, und die Entfälle folgen dem LAGEBILD.
- hero: Ort auf /#termin, neue Anker-Prüfung (streng). Bot-Wartebedingung nach bedienbar(): Assertions unverändert.
- express: /#express-anfrage entfällt (LAGEBILD F-03 ohne /). Zählung 26 auf 24.
- einwilligung: / entfällt aus der Zwei-Klick-Schleife. Die Prüfung „Karte laden“ auf / entfällt, weil dort laut LAGEBILD keine Karte mehr ist; das Server-HTML von / enthält weder Knopf noch Iframe. Neu: keine Anfrage an Karten-Hosts auf /. Hinweis: ruhe() fängt das networkidle-Timeout ab, die Negativprüfung ist dadurch zeitlich schwächer als ihr Name.
- navigation: Namen gegen src/config/navigation.js geprüft (Bad, Bad komplett erneuern, Ziel /bad/badsanierung). Stimmen: exakter Vergleich mit REVIEWS, strenger als vorher. 404: strenger (H1, genau drei Wege, Reihenfolge). Zur Leistungsübersicht entfällt laut LAGEBILD F-17. Startseiten-Akkordeon entfällt laut LAGEBILD F-14; /faq prüft das Umschalten weiter (Zeile 149). Karussell durch drei Stimmen-Prüfungen ersetzt. Hinweis: Der Dateikopf sagt „nicht Aussehen“, die c-wolf-Prüfung misst aber die Schriftgröße; LAGEBILD F-19 verlangt „c-wolf groß“.

2. GEGENPROBEN (Schritt 2): Alle geänderten und neuen Prüfungen haben ein rotes Protokoll in gegenproben/ (hero-rot, hero-echt-rot, express-rot, einwilligung-rot, navigation-rot und navigation-rot2; „statt Karussell“ rot auf beiden Projekten). Die Sicherungen .richtig sind gleich der Arbeitskopie und gleich dem Commit. Lücke nur bei der Ortsliste, siehe ohne_gegenprobe.

3. FUNKTIONEN (Schritt 3): F-01, F-02, F-03, F-11, F-12, F-13, F-14, F-16, F-17, F-18 und F-19 sind in den fünf Specs weiterhin geprüft. Die Zählung ist nicht erhalten:
- F-03, 26 auf 24: Der Ort / entfällt. LAGEBILD nennt keinen Ausgleichsort. Entscheidung des Orchestrators: Maßstab ausdrücklich lockern oder einen Ausgleich auf /kontakt, /leistungen oder /foerderung festlegen. Ich habe keinen Ersatz erfunden.
- F-12, 16 auf 14: LAGEBILD nennt /ueber-uns („keine Anfrage an Karten-Hosts“). Dort gibt es heute weder Knopf noch Kartenelement im Server-HTML (Status 200). Eine Prüfung wäre also jetzt grün und bliebe nach E3 gültig. Das Briefing schiebt sie auf E3. Vorschlag: jetzt ergänzen.
- F-14, 8 auf 6: Ausgleich möglich auf /preise. Dort nutzt die Seite FAQAccordion (src/app/(bestand)/preise/page.jsx). Umschalt-Prüfung wie in Zeile 149 anlegen.

4. ANTWORTEN AUF DIE OFFENEN FRAGEN DES PRÜFERS:
- Frage 2 (mobil /standorte): Die Ursache liegt im Scroll-Ziel der Prüfung, nicht in der Seite. Diagnose ohne Repo-Änderung, Skript unter .../E2-PRUEF-TESTS-GEGEN/diag/iframe-in-sicht.mjs: Scrollen nur zum Abschnitt ergibt Iframe-Oberkante 3428 px und 0 Kartenanfragen. Scrollen bis zum Iframe ergibt 207 px und 1 Kartenanfrage. Der Iframe ist loading=lazy und lädt, sobald er im Blick ist.
- Vorschlag für beide Prüfungen (Zeilen 157 und 178): vor dem Warten auf die Anfrage den Iframe in den Blick holen, z. B. page.locator('iframe[src*="openstreetmap.org"]').scrollIntoViewIfNeeded(). Das habe ich nicht im Test selbst bestätigt.
- „Karte laden &amp; zustimmen“ war im Vorlauf grün, im Schlusslauf rot und im Wiederholungslauf (nur die zwei Mobil-Prüfungen) grün. Das spricht für Instabilität durch dieselbe Ursache: Der Klick rollt den Iframe nur zufällig ins Bild. Ob die Karte nach dem Zustimmen ohne Scrollen sichtbar sein soll, ist eine Frage an die Seite, nicht an die Prüfung.
- Protokolle: .../E2-PRUEF-TESTS-GEGEN/schlusslauf.log und .../E2-PRUEF-TESTS-GEGEN/rerun-mobil-standorte.log.

5. WEITERE HINWEISE:
- Der Commit 16831f8 („ZWISCHENSTAND“) enthält die vier geänderten Testdateien. Das Arbeitsverzeichnis ist sauber. Ich habe nichts committet, gepusht oder zurückgesetzt, und den Server nicht angefasst.
- Briefing-Wunsch 1 (warteBotSchwelle nach bedienbar in fixtures.mjs) bleibt offen. Die echte-Route-Prüfungen in preisrechner und express sind ungesichert, heute grün.
- reviews.js: FEATURED_REVIEW_IDS (c-wolf, hasan-oe, ute-t) wird nirgends verwendet. Die Startseite zeigt c-wolf, rabia-oe, elke-s, wie die Prüfung verlangt. Aufräumen durch den Orchestrator.
