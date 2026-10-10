# E0-PRUEF-04 · Funktionsliste F-01 bis F-19 · Ausgangswert

Stand 2026-10-10 · Prüfer E0-PRUEF-04 (Arbeitsmodell, Stufe 1) · Schritte 1 und 2 des Pakets.

- **Ziel:** Produktionsserver 127.0.0.1:4310, Build `reinraum-745335f`. `src/`, `next.config.ts` und `package.json` sind gegen `git archive 745335f` geprüft und identisch (Build-ID im HTML belegt).
- **Befehl:** `cd _werkstatt/werkzeuge && RELAUNCH_BASE=http://127.0.0.1:4310 RELAUNCH_OUTPUT=../cache/e0-funktion RELAUNCH_REPORT=../cache/e0-funktion/pw.json PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers npx playwright test --workers=1`
- **Werkzeuge:** Playwright 1.56.1, Chromium 141 (`/opt/pw-browsers`), Node v22.22.0, 1 Worker. Projekt `mobil` 390 × 844, Projekt `desktop` 1440 × 900.
- **Specs:** 11 Dateien, 146 Läufe je Projekt. Specs und `fixtures.mjs` sind seit 745335f unverändert; `lib.mjs` und `playwright.config.mjs` wurden in E0-PRUEF-01 geändert (siehe Hinweise).
- **Rohbericht:** `_werkstatt/cache/e0-funktion/pw.json` (Cache, nicht im Repo). Auszug: `funktion.json` in diesem Ordner.
- **Laufzeit:** 15 min 25 s Testzeit (924535 ms). Start 19:43:16 UTC, Ende 19:58:41 UTC.

## Ergebnis

| Projekt | erwartet | bestanden | übersprungen | fixme | unerwartet | flaky |
|---|---:|---:|---:|---:|---:|---:|
| mobil | 146 | 138 | 5 | 3 | 0 | 0 |
| desktop | 146 | 141 | 3 | 2 | 0 | 0 |
| **Summe** | 292 | 279 | 8 | 5 | 0 | 0 |

Abgleich mit `pw.json` (stats): expected 279 = bestanden 279; skipped 13 = übersprungen 8 + fixme 5; unexpected 0 = unerwartet 0; flaky 0 = 0. Ergebnis: stimmt.

Wiederholungen: keine. Es gab keinen unerwarteten Fehlschlag, daher wurde kein Fall wiederholt.

## Je F-Nummer (Zellen: mobil / desktop)

| F | Spec | erwartet | bestanden | übersprungen | fixme | unerwartet |
|---|---|---:|---:|---:|---:|---:|
| F-01 | hero-kontakt | 3 / 3 | 3 / 3 | 0 / 0 | 0 / 0 | 0 / 0 |
| F-02 | preisrechner | 8 / 8 | 8 / 8 | 0 / 0 | 0 / 0 | 0 / 0 |
| F-03 | express-funnel | 13 / 13 | 13 / 13 | 0 / 0 | 0 / 0 | 0 / 0 |
| F-04 | badanfrage | 7 / 7 | 7 / 7 | 0 / 0 | 0 / 0 | 0 / 0 |
| F-05 | projektcheck | 9 / 9 | 9 / 9 | 0 / 0 | 0 / 0 | 0 / 0 |
| F-06 | konfigurator | 25 / 25 | 23 / 23 | 0 / 0 | 2 / 2 | 0 / 0 |
| F-07 | termin | 8 / 8 | 8 / 8 | 0 / 0 | 0 / 0 | 0 / 0 |
| F-08 | termin | 5 / 5 | 5 / 5 | 0 / 0 | 0 / 0 | 0 / 0 |
| F-09 | schnellanfrage | 12 / 12 | 12 / 12 | 0 / 0 | 0 / 0 | 0 / 0 |
| F-10 | kontaktwege | 8 / 8 | 7 / 7 | 1 / 1 | 0 / 0 | 0 / 0 |
| F-11 | einwilligung | 9 / 9 | 9 / 9 | 0 / 0 | 0 / 0 | 0 / 0 |
| F-12 | einwilligung | 8 / 8 | 7 / 8 | 0 / 0 | 1 / 0 | 0 / 0 |
| F-13 | navigation | 7 / 7 | 4 / 6 | 3 / 1 | 0 / 0 | 0 / 0 |
| F-14 | navigation | 4 / 4 | 4 / 4 | 0 / 0 | 0 / 0 | 0 / 0 |
| F-15 | kontaktwege | 8 / 8 | 8 / 7 | 0 / 1 | 0 / 0 | 0 / 0 |
| F-16 | navigation | 4 / 4 | 3 / 4 | 1 / 0 | 0 / 0 | 0 / 0 |
| F-17 | navigation | 3 / 3 | 3 / 3 | 0 / 0 | 0 / 0 | 0 / 0 |
| F-18 | navigation | 2 / 2 | 2 / 2 | 0 / 0 | 0 / 0 | 0 / 0 |
| F-19 | navigation | 3 / 3 | 3 / 3 | 0 / 0 | 0 / 0 | 0 / 0 |

## Je Spec und Projekt

| Spec | Projekt | erwartet | bestanden | übersprungen | fixme | unerwartet |
|---|---|---:|---:|---:|---:|---:|
| funktion-badanfrage.spec.mjs | mobil | 7 | 7 | 0 | 0 | 0 |
| funktion-badanfrage.spec.mjs | desktop | 7 | 7 | 0 | 0 | 0 |
| funktion-einwilligung.spec.mjs | mobil | 17 | 16 | 0 | 1 | 0 |
| funktion-einwilligung.spec.mjs | desktop | 17 | 17 | 0 | 0 | 0 |
| funktion-express-funnel.spec.mjs | mobil | 13 | 13 | 0 | 0 | 0 |
| funktion-express-funnel.spec.mjs | desktop | 13 | 13 | 0 | 0 | 0 |
| funktion-hero-kontakt.spec.mjs | mobil | 3 | 3 | 0 | 0 | 0 |
| funktion-hero-kontakt.spec.mjs | desktop | 3 | 3 | 0 | 0 | 0 |
| funktion-konfigurator.spec.mjs | mobil | 25 | 23 | 0 | 2 | 0 |
| funktion-konfigurator.spec.mjs | desktop | 25 | 23 | 0 | 2 | 0 |
| funktion-kontaktwege.spec.mjs | mobil | 16 | 15 | 1 | 0 | 0 |
| funktion-kontaktwege.spec.mjs | desktop | 16 | 14 | 2 | 0 | 0 |
| funktion-navigation.spec.mjs | mobil | 23 | 19 | 4 | 0 | 0 |
| funktion-navigation.spec.mjs | desktop | 23 | 22 | 1 | 0 | 0 |
| funktion-preisrechner.spec.mjs | mobil | 8 | 8 | 0 | 0 | 0 |
| funktion-preisrechner.spec.mjs | desktop | 8 | 8 | 0 | 0 | 0 |
| funktion-projektcheck.spec.mjs | mobil | 9 | 9 | 0 | 0 | 0 |
| funktion-projektcheck.spec.mjs | desktop | 9 | 9 | 0 | 0 | 0 |
| funktion-schnellanfrage.spec.mjs | mobil | 12 | 12 | 0 | 0 | 0 |
| funktion-schnellanfrage.spec.mjs | desktop | 12 | 12 | 0 | 0 | 0 |
| funktion-termin.spec.mjs | mobil | 13 | 13 | 0 | 0 | 0 |
| funktion-termin.spec.mjs | desktop | 13 | 13 | 0 | 0 | 0 |

## Alle fixme mit Grund

5 Läufe (mobil 3, desktop 2). Alle sind Altfehler des Ausgangsstands. Sie stehen im Lauf als `test.fixme` und zählen nicht als Fehlschlag.

| F | Projekt | Test | Grund (aus dem Spec) |
|---|---|---|---|
| F-12 | mobil | /standorte: „Karte laden & zustimmen“ setzt Marketing-Einwilligung und lädt die Karte (Anfrage an Karten-Host) | Ausgangsstand: Info-Kasten der Standortkarte überdeckt den Platzhalter-Knopf auf Smartphone-Breite (OFFENE FRAGE) |
| F-06 | mobil | Fußbodenheizung „Weiß nicht“ wird im Versand nicht als „Nein“ gemeldet | Ausgangsstand: underfloorHeatingLabel ist für „unklar“ (Weiß nicht) „Nein“. Siehe OFFENE FRAGEN. |
| F-06 | mobil | Nur Treppe: keine erfundene Fläche (Vorgabe 20 m²) in der Nutzlast | Ausgangsstand: Ohne Flächenangabe wird die Vorgabe 20 m² als Fläche gesendet; Treppendaten fehlen. Siehe OFFENE FRAGEN. |
| F-06 | desktop | Fußbodenheizung „Weiß nicht“ wird im Versand nicht als „Nein“ gemeldet | Ausgangsstand: underfloorHeatingLabel ist für „unklar“ (Weiß nicht) „Nein“. Siehe OFFENE FRAGEN. |
| F-06 | desktop | Nur Treppe: keine erfundene Fläche (Vorgabe 20 m²) in der Nutzlast | Ausgangsstand: Ohne Flächenangabe wird die Vorgabe 20 m² als Fläche gesendet; Treppendaten fehlen. Siehe OFFENE FRAGEN. |

## Übersprungen (bewusst, mit Grund)

8 Läufe. Grund: Die Läufe gelten nur in einem Projekt. Der Grund steht je Zeile (Breite, Sichtbarkeit oder Verhalten je Projekt).

| F | Projekt | Test | Grund |
|---|---|---|---|
| F-10 | mobil | Widget: Doppelklick löst nur einen WhatsApp-Aufruf aus (Entprellung) | Am Desktop über window.open synchron prüfbar; mobil ist es eine Navigation |
| F-10 | desktop | Mobil-Leiste: WhatsApp-Knopf öffnet Chat mit Firmennummer | MobileBottomBar ist nur mobil sichtbar |
| F-15 | desktop | Mobil-Leiste: Anrufen zeigt auf die Festnetznummer | MobileBottomBar ist nur mobil sichtbar |
| F-13 | mobil | Hover öffnet das Untermenü, Escape schließt es | Mega-Menü ist mobil ausgeblendet (hidden lg:flex) |
| F-13 | mobil | Tastatur: Schalter per Enter öffnen, Escape schließt, Fokus bleibt am Schalter | Mega-Menü ist mobil ausgeblendet (hidden lg:flex) |
| F-13 | mobil | Klick auf einen Untermenü-Punkt führt zum Ziel und schließt das Menü | Mega-Menü ist mobil ausgeblendet (hidden lg:flex) |
| F-13 | desktop | mobil: Desktop-Navigation ist ausgeblendet, der Drawer ist der Zugang | nur im Projekt mobil |
| F-16 | mobil | Inhaltsverzeichnis: Klick springt zur Überschrift | Inhaltsverzeichnis ist mobil ausgeblendet (hidden lg:block) |

## Hinweise

- F-Zuordnung: nach den Kopfkommentaren der Specs. F-01 steht nur in `berichte/E0-KUN-05-qualitaet.md` Abschnitt 2 (hero-kontakt), weil der Kopf des Specs keine F-Nummer nennt.
- Projekt `mobil` läuft mit 390 × 844. Der Werkzeugstand 745335f hatte 375 × 812 (`playwright.config.mjs`, Änderung in E0-PRUEF-01). Die Ausgangswerte gelten für 390 × 844.
- Die Anzahl 292 Läufe und die Verteilung auf die Specs stimmen mit `berichte/E0-KUN-05-qualitaet.md` Abschnitt 2 überein.
