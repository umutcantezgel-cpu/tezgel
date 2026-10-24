# STUFE B · Messung Startseite `/` (Stand 5df89bc, Produktionsbau 127.0.0.1:4311)

Prüfer E2-PRUEF-B, Haiku 5.5. Keine Deutung, keine Empfehlung. Ausgangswerte E0 aus `_werkstatt/belege/e0/STUFE-B.md` und `_werkstatt/belege/e0/lighthouse.json` (Stand c53faf4). Quellen je Zeile: Spalte „Beleg“. Werte aus Einzelläufen, außer Lighthouse (Median) und Reaktion (Median aus 5 Läufen); Funktionstests als Summe je Spec.

Positivproben vor der Messung: `einzelbild.mjs` mit Seite `/gibt-es-wirklich-nicht-200` endete mit Exit 1 und HTTP 404 (BESTANDEN); `reaktion.mjs --probe` Exit 0, „PROBE OK“ (BESTANDEN).

## 1 · Bestand

| Prüfung | Neuer Wert | E0 (c53faf4) | Budget | erfüllt | Beleg |
| --- | --- | --- | --- | --- | --- |
| npm ci, build, typecheck, lint, test, qa-graph | alle Exit 0 | alle Exit 0 | Exit 0 | ja | `_werkstatt/cache/reinraum-5df89bc/ergebnis.txt` |
| npm test (Wurzel) | 114 bestanden, 0 gescheitert | 37 von 37 | 0 gescheitert | ja | `$SCRATCH/E2-PRUEF-B/npm-test.txt` |

## 2 · Funktionsspecs (je Spec, Playwright, workers 1, Ziel 4311; tracking gegen 4313)

| Spec | erwartet | unerwartet | übersprungen |
| --- | --- | --- | --- |
| badanfrage | 14 | 0 | 0 |
| einwilligung | 34 | 0 | 0 |
| express-funnel | 26 | 0 | 0 |
| hero-kontakt | 8 | 0 | 0 |
| konfigurator | 46 | 0 | 4 |
| kontaktwege | 30 | 1 (Erstlauf, Zeile 134, mobil) | 3 |
| navigation | 43 | 0 | 5 |
| preisrechner | 18 | 0 | 0 |
| projektcheck | 18 | 0 | 0 |
| schnellanfrage | 24 | 0 | 0 |
| termin | 28 | 0 | 0 |
| weiterleitung | 4 | 0 | 0 |
| verlegen | 26 | 0 | 0 |
| tracking (4313) | 8 | 0 | 0 |

Summe ohne tracking: 319 erwartet bestanden, 1 unerwartet (Erstlauf), 12 übersprungen. Einzelwiederholung kontaktwege (`-g "Fußbereich: Festnetz"`): 2 von 2 bestanden (mobil und desktop). Beleg: `_werkstatt/belege/e2/funktion.json`, Berichte `$SCRATCH/E2-PRUEF-B/funktion/`.

| Prüfung | Neuer Wert | E0 | Budget | erfüllt |
| --- | --- | --- | --- | --- |
| Funktionstests gesamt bestanden | 319 (ohne tracking), 327 mit tracking | 290 | ≥ E0 je Spec | Gesamt ja; je Spec OFFENE FRAGE |
| unerwartet | 1 (Erstlauf), 0 nach Wiederholung | 0 | 0 | nein (Erstlauf) |

## 3 · Bildsatz (`bildsatz.mjs`, Seiten `/` und `/gibt-es-nicht`, 10 Geräte)

| Seite | Geräte | HTTP | Überlauf | Überlappung | Konsole | E0 Überlauf `/` |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 10 | 200 je Gerät | 0 | 0 | 0 | d1280: 2, sonst 0 |
| `/gibt-es-nicht` | 10 | 404 je Gerät (erwartet) | 0 | 0 | 404-Ressourcenmeldung je Gerät | — |

Aufnahmen 161, Fehler 0. Beleg: `_werkstatt/belege/e2/bildsatz.json`.

| Prüfung | Neuer Wert | E0 | Budget | erfüllt |
| --- | --- | --- | --- | --- |
| Überlauf je Gerät `/` | 0 | d1280: 2 | 0 | ja |
| Überlappung je Gerät `/` | 0 | 0 | 0 | ja |

## 4 · Konsole und große Schrift (`einzelbild.mjs`)

| Prüfung | Neuer Wert | E0 | Budget | erfüllt |
| --- | --- | --- | --- | --- |
| Konsole `/`, 10 Geräte (Einzelbild) | 0 je Gerät | 0 (m390, d1440) | 0 | ja |
| Schrift 200 %, `/`, m360/m390/m430: Überlauf | 0 je Gerät | nicht gemessen | 0 | ja |
| Schrift 200 %, `/`, m360/m390/m430: Überlappung | 1 je Gerät (Textkreuzung) | nicht gemessen | 0 | nein |
| Schrift 200 %, `/gibt-es-nicht`: Überlauf / Überlappung | 0 / 0 je Gerät | nicht gemessen | 0 | ja |

Der Befund je Gerät ist die Rufnummernzeile „06441 /“ im Fußbereich (Selektor `div.md:col-span-2.lg:col-span-1 > a.text-tinte.underline > span.font-mono > span.whitespace-nowrap`), y 31034 (m360), 29611 (m390), 28186 (m430). Beleg: `_werkstatt/belege/e2/schrift200.json`. Ausschnitte: `$SCRATCH/E2-PRUEF-B/sichtung/m360-s200-ueberlappung.png`, `$SCRATCH/E2-PRUEF-B/sichtung/m390-s200-ueberlappung.png`. Ganzseitige Mosaiks je Gerät: `$SCRATCH/E2-PRUEF-B/sichtung/m360-s200-mosaik-1.png` bis `-4.png`, `m390-…`, `m430-…`.

## 5 · Erstes Bild (`erstesbild.mjs`, Seite `/`, 10 Geräte)

| Gerät | m360 | m390 | m430 | q844 | t768 | t1024 | d1280 | d1440 | d1920 | d2560 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Erstbesuch, neu | 3/5 | 5/5 | 5/5 | 3/5 | 5/5 | 3/5 | 3/5 | 3/5 | 4/5 | 5/5 |
| E0 Erstbesuch | 1/5 | 3/5 | 3/5 | 3/5 | 5/5 | 4/5 | 2/5 | 3/5 | 5/5 | 5/5 |
| nach Einwilligung, neu | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 |

Budget: 5 von 5 je Gerät. Erfüllt im Erstbesuch: nein (sechs Geräte unter 5/5). Gemeldete verdeckte Elemente im Erstbesuch: Hauptknopf, Überschrift und Ort, verdeckt durch den Einwilligungstext (`p#cookie-consent-description`) bzw. das Intro-Banner (`div.hoehe-banner.ueber-leiste-12`). Beleg: `_werkstatt/belege/e2/erstes-bild.json`. Querformat q844: 24,1 % (Grenze 25 %).

## 6 · Zugänglichkeit (`axe.mjs`, WCAG 2.2 AA, Zustände)

| Seite | Läufe | kritisch | ernst | mittel | gering |
| --- | --- | --- | --- | --- | --- |
| `/` | 14 | 0 | 0 | 0 | 0 |
| `/gibt-es-nicht` | 14 | 0 | 0 | 0 | 0 |

Läufe gesamt 28. Budget 0 kritisch, 0 ernst: erfüllt. E0: 132 Läufe, 0 kritisch, 0 ernst, `/` je 11 Läufe ohne Befund. Beleg: `_werkstatt/belege/e2/axe.json`.

## 7 · Lesbarkeit (`lesbarkeit.mjs`)

| Seite | Ergebnis | Flesch | Befunde | E0 `/` |
| --- | --- | --- | --- | --- |
| `/` | GRÜN | 78,5 | 0 | ROT (Flesch 35, Gedankenstrich 38, Bindestrich 72, Floskel 2, Glossar offen 17) |
| `/gibt-es-nicht` | ROT | 75,9 | 1 (Regel status: HTTP 404) | — |

Budget GRÜN: für `/` erfüllt, nein für `/gibt-es-nicht` (einziger Befund ist der 404-Status). Beleg: `_werkstatt/belege/e2/lesbarkeit.json`, `_werkstatt/belege/e2/lesbarkeit.md`.

## 8 · Bewegung

| Prüfung | Neuer Wert | E0 `/` | Budget | erfüllt |
| --- | --- | --- | --- | --- |
| Reduzierte Bewegung `/`, m390: Bewegungsbefunde | 0 (188 geprüft) | 0 (255 Fälle) | 0 | ja |
| Hover-Fehler / Tab-Schritte / Fokus verschieden | 0 / 30 / 19 | 0 / 30 / — | 0 | ja |
| Bildrate m390, 4× CPU: verworfen (Median) | 0,17 % (Läufe: 0,57; 0,12; 0,17 %) | nicht gemessen | ≤ 5 % | ja |
| Register: unbekannte Kennungen | 0 | — | 0 | ja |
| Einzelbilder intro / startbild / verlegen | Kennung auf `/` nicht vorhanden, 0 Bilder | — | fünf Bilder je Moment | OFFENE FRAGE |

Register (`bewegung.mjs --modus register`): 188 data-motion-Elemente. Im DOM nicht vorhanden: verlegen, intro, startbild, verband, anriss, auftritt, notiert, laden, sig-kreuzlinie, sig-flucht, szene-ablauf, sig-plan, einzugsband, fugenband. Ohne Register: `span.startbild-reihe` (translate, 8), `div.startbild-decke` (visibility, 1). Belege: `_werkstatt/belege/e2/bewegung-reduziert.json`, `bewegung-register.json`, `bewegung-bildrate.json`.

## 9 · Werte außerhalb des Designsystems (`werte.mjs`)

| Prüfung | Neuer Wert | Budget | erfüllt |
| --- | --- | --- | --- |
| Befunde in 44 Dateien (Liste aus E2-PRUEF-A1 bis A3, Abschnitt 5) | 0 (1455 Klassenvorkommen) | 0 | ja |

Beleg: `_werkstatt/belege/e2/werte.json`.

## 10 · Adressen und Links (`adressen.mjs`, HTTP)

| Prüfung | Neuer Wert | E0 | Budget | erfüllt |
| --- | --- | --- | --- | --- |
| Adressen gesamt | 203 (neu: `/preise`) | 202 | — | — |
| Status 200 / 308 / 410 | 169 / 2 / 32 | 168 / 2 / 32 | — | — |
| Adressen mit 200 oder 308 | 171 | 170 | alle E0-Adressen mit 200 oder 308 | ja (kein E0-Adresse mit anderem Status) |
| Kaputte Links (404, 5xx, 0) | 0 | 0 | 0 | ja |
| Seiten mit 200 ohne genau eine H1 | 0 | 0 | 0 | ja |
| Seiten mit 200 ohne Titel, Beschreibung oder korrektem Canonical | 0 | 0 | 0 | ja |

Die 32 Adressen mit 410 sind dieselbe Menge wie in E0 (ohne eingehende Links). Beleg: `_werkstatt/belege/e2/adressen.json`, `_werkstatt/belege/e2/adressen-e2.csv`.

## 11 · Reaktion (`reaktion.mjs`, m390, CPU 4×, Median aus 5 Läufen)

| Handlung | Median ms |
| --- | --- |
| Hauptknopf | 160 |
| Menü | 168 |
| Akkordeon | — (vom Werkzeug nicht gemessen) |
| Eingabe | 72 |
| Link | 80 |

Höchster Median 168 ms. Budget ≤ 200 ms: ja. E0-Wert nicht im E0-Stand ausgewiesen. Beleg: `_werkstatt/belege/e2/reaktion.json`.

## 12 · Leistung (Lighthouse, Median; mobil 5 Läufe, Desktop 3 Läufe; frisches Profil je Lauf)

| Form | Leistung | Spanne | LCP ms | Spanne | CLS | TBT ms | Zugänglichkeit | Best Practices | SEO |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mobil, neu | 89 | 82–90 | 3029 | 2872–3318 | 0 | 302 | 100 | 100 | 100 |
| mobil, E0 | 89 | 88–90 | 3472 | 3446–3497 | 0 | 162 | 100 | 100 | 100 |
| desktop, neu | 98 | 98–98 | 725 | 719–781 | 0,082 | 8 | 100 | 100 | 100 |
| desktop, E0 | 100 | 100 | 687 | 660–694 | 0 | 4 | 100 | 100 | 100 |

LCP-Element je Lauf (mobil und Desktop): `div.relative > figure > div.border > img.block` (Bild „Dusche ohne Stufe …“, `fetchpriority="high"`). Budgets mobil:

| Prüfung | Neuer Wert | Budget | erfüllt |
| --- | --- | --- | --- |
| LCP mobil (Median) | 3029 ms | ≤ 2500 ms | nein |
| CLS mobil | 0 | ≤ 0,1 | ja |
| Reaktion (Abschnitt 11) | 168 ms | ≤ 200 ms | ja |
| Leistung mobil | 89 | ≥ 90 | nein |
| Zugänglichkeit mobil | 100 | ≥ 95 | ja |
| Best Practices mobil | 100 | ≥ 95 | ja |
| SEO mobil | 100 | 100 | ja |

Lauf-Werte mobil (Leistung; LCP ms): 82 (3318), 90 (2873), 90 (3113), 89 (2872), 87 (3029). Desktop CLS 0,082 je Lauf. Alle Läufe im Benchmark-Band ±15 %. Beleg: `_werkstatt/belege/e2/lighthouse.json`; Rohberichte nur in `$SCRATCH/E2-PRUEF-B/lh-belege/`.
