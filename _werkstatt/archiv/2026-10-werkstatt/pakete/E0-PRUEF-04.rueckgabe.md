# E0-PRUEF-04 · Rückgabe (Prüfer, Stufe 1)

**GEÄNDERTE DATEIEN**
- Neu: `_werkstatt/werkzeuge/tests/funktion-tracking.spec.mjs` (Teil B, 4 Fälle × 2 Projekte).
- Neu: `_werkstatt/belege/e0/funktion/FUNKTION.md`, `funktion.json`, `tracking.md`.
- Neu: `_werkstatt/pakete/E0-PRUEF-04.rueckgabe.md`.
- Rohberichte (Cache): `_werkstatt/cache/e0-funktion/pw.json`, `tracking-4311.json`, `tracking-4310-gegenprobe.json`.
- Sonst nichts geändert. Kein Commit, kein Push. Fremde Änderungen im Arbeitsbaum nicht berührt.

**WAS UND WARUM**
- Teil A, Funktionsliste F-01 bis F-19 gegen 4310 (Build 745335f): 292 Läufe, 279 bestanden, 8 übersprungen (bewusst, mit Grund), 5 fixme (Altfehler: Konfigurator 4, Standortkarte mobil 1), 0 unerwartet. Laufzeit 15 min 25 s. Je F-Nummer und je Spec in `FUNKTION.md`.
- Teil B, `funktion-tracking.spec.mjs` (F-11-Erweiterung): (1) Erstbesuch ohne Entscheidung, keine GA-Anfrage; (2) „Alle ablehnen“, auch nach Neuladen und Seitenwechsel keine Anfrage; (3) „Alle akzeptieren“, danach Anfrage an `gtag/js?id=G-TEST000000`; (4) Widerruf, nach Neuladen keine neue Anfrage. Läuft nur mit `RELAUNCH_TRACKING=1`, sonst übersprungen.
- Vor dem Beleglauf zwei Testfehler behoben: Die Leerlauf-Warteschleife hatte keine Obergrenze. Der Seitenwechsel in (2) ist jetzt ein Aufruf von `/kontakt`, weil der Fußlink mobil nicht klickbar ist.

**GEMEINSAME DATEIEN**
- Keine Änderung. Gewünscht: nichts. Playwright findet die neue Datei über `testDir`. Die Aufnahme in `npm test` bzw. in die Liste liegt beim Orchestrator.

**PRÜFUNG UND ERGEBNIS**
- Basis: 4310 läuft als Build `reinraum-745335f`. `src/`, `next.config.ts` und `package.json` sind identisch mit `git archive 745335f`. HEAD ist b062ab7; 4310 ist nicht HEAD.
- Teil A: `pw.json`-Stats stimmen mit der Auswertung überein. Kein unerwarteter Fehlschlag, daher keine Wiederholung.
- Teil B gegen 4311 (Platzhalter G-TEST000000): (1), (2) und (4) grün in mobil und desktop. **(3) rot in beiden Projekten. Das Ziel „grün in beiden Projekten“ ist nicht erreicht.**
- Gegenprobe 4310 mit `RELAUNCH_TRACKING=1`: (3) rot, wie erwartet, weil im Build keine ID steht. (1), (2) und (4) grün.
- Ohne Flag: 8 übersprungen, nicht rot. `--list` ohne Fehler.
- Ursache von (3), Diagnose über dieselbe Sperre: Nach „Alle akzeptieren“ kommen ohne Neuladen in 8 s 0 Anfragen an gtag, obwohl der Cookie `analytics: true` hat. Nach Neuladen kommt 1 Anfrage mit `G-TEST000000`; auf 4310 keine. Im Code registriert `src/hooks/useConsent.ts` den Listener für `cookie_consent_updated` beim Erstbesuch nicht. `TrackingScripts.jsx` übernimmt die Zustimmung deshalb erst beim nächsten Seitenaufruf. Details in `tracking.md`.

**BILDBELEGE**
- Keine. Die Läufe haben keine Screenshots erzeugt. Fehlerkontext als Text: `_werkstatt/cache/e0-funktion/tracking-4311-out/`.

**OFFENE FRAGEN**
1. (3) rot auf 4311. Soll GA nach „Alle akzeptieren“ im selben Besuch starten? Dann braucht es eine Korrektur der Einwilligungslogik (unantastbar, Freigabe nötig). Genügt der Start beim nächsten Seitenaufruf? Dann ist (3) auf „nach Neuladen“ umzustellen. Ich habe nichts verändert.
2. Der Fußlink „Kostenfreies Vor-Ort-Aufmaß“ in der Fußzeile liegt mobil bei x = 407 px in einer 390 px breiten Ansicht und ist nicht klickbar. Ausgangsbefund, auf 4310 ebenso. Nicht von mir behoben.
3. Projekt `mobil` steht im Werkzeugstand auf 390 × 844 (745335f: 375 × 812, Änderung in E0-PRUEF-01). Die Ausgangswerte gelten für 390 × 844. Bitte bestätigen.
