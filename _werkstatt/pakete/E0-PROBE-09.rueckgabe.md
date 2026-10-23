## GEÄNDERTE DATEIEN
Keine Datei im Repo geändert. Angelegt nur unter den Schreibrechten: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E0-PROBE-09/` (run.sh, A1.json bis A6.json) und `/home/user/tezgel/_werkstatt/cache/probelauf/e0/P5-m390-A1` bis `P5-m390-A6`. Keine Berichtsdatei geschrieben (Hinweis des Orchestrators; `_werkstatt/pakete` liegt außerhalb der Schreibrechte).
Selbstprüfung: `git status` zeigt Änderungen, die nicht von mir stammen (u. a. `_werkstatt/werkzeuge/probelauf.mjs`, `lib.mjs`, `werte-regeln.json`, `tests/verlegen.spec.mjs`, src/). Ich habe sie nicht angefasst. Die Läufe `P5-d1440-A1` bis `A6` im Cache stammen ebenfalls nicht von mir.

## WAS UND WARUM
Person P5 (Limburg, Deutsch Zweitsprache, Handy 390×844, Systemschrift 100 %), Start `/`, Satz e0. Nur über `probelauf.mjs`, kein Code gelesen.
- **A1 gelöst**, 1 Handlung. Antwort: „Das ist ein Betrieb für Fliesen und Bad. Er ist in Aßlar.“
- **A2 gelöst**, 2 Handlungen (Banner, „Anrufen“ als Attrappe). Antwort: „Ich kann anrufen, unter 06441 / 44 83 567. Oder ich schreibe per WhatsApp.“
- **A3 gelöst bis vor Absendeknopf**, 13 Handlungen. Weg: Aufmaß vor Ort anfragen → Zur Express-Anfrage → Bad & Wellness → Ort → Kontaktdaten. Pflichtfelder gültig, „Anfrage verbindlich absenden“ im Bild, nicht gedrückt.
- **A4 offen**, 35 Handlungen. Antwort: „Ich finde keine Fotos von fertigen Bädern. Ich sehe nur Zeichnungen von Grundrissen, Listen und Texte.“ Besucht: Startseite, Badsanierung, Musterbäder, Referenzen, Leistungen, Standorte, Ratgeber & Blog, Beratung. Überall Grundrisse, Textkarten oder Kachel-Symbole, keine Fotos.
- **A5 gelöst**, 6 Handlungen (Ratgeber → Vor-Ort-Beratung). Antwort: „Zuerst kommt eine Bedarfsanalyse, dann die technische Prüfung, dann Material und Zuschuss, dann ein Kostenvoranschlag. Der Termin vor Ort ist kostenlos.“
- **A6 gelöst**, 19 Handlungen (davon 11 Bildläufe). Standorte → Alle 13 Standorte → Liste „≤ 50 km“ → Limburg an der Lahn. Antwort: „Ja, der Betrieb arbeitet auch in Limburg an der Lahn. Das steht auf der Seite, ca. 35 km von Wetzlar.“

Matrix (Satz e0, Spalte m390, eigene Läufe): A1 gelöst 1 · 2 Befunde | A2 gelöst 2 · 2 | A3 gelöst 13 · 3 | A4 offen · 3 Befunde, 1 hoch | A5 gelöst 6 · 2 | A6 gelöst 19 · 3.

Befunde (Schritt):
- A1: gering 1 Banner deckt untere Hälfte ab; gering 1 schwere Wörter („Handwerkskammer-eingetragener Fachbetrieb“, „Staubschutzgarantie“).
- A2: gering 2 Nummer nicht im Bild, nur „Anrufen“; gering 2 „Aufmaß“ unverständlich.
- A3: mittel 2 zwei gleichartige Wege auf /kontakt (Express-Anfrage vs. „Oder detailliert konfigurieren“); gering 7 Fachbegriffe und PLZ-Feld; gering 12 keine Einwilligungs-Kästchen, nur Datenschutz-Hinweis.
- A4: hoch 35 (unbestätigt) keine Fotos fertiger Arbeiten auf besuchten Wegen; gering 5 Grundriss als erstes Bild der Musterbad-Seite; gering 2 doppelte Menünamen.
- A5: mittel 4 Ablauf nur über Ratgeber → Vor-Ort-Beratung; gering 2 Kostenaussage klein im Kopf.
- A6: mittel 8 Limburg nur weit unten in der Liste; mittel 6 Hinweise „Lahn-Dill-Kreis“ nennen Limburg nicht; gering 8 „ca. 35 km ab Wetzlar“ wenig hilfreich.

## GEMEINSAME DATEIEN
Keine Änderung von mir nötig. Vorschläge an den Orchestrator:
1. `_werkstatt/werkzeuge/probelauf.mjs`: Antippen per Name trifft in offenen Menüs verdeckte Duplikate (Badsanierung, Badsanierung im Überblick, Badsanierung komplett, Ratgeber & Blog) und läuft in 30-s-Timeouts. Über die Listen-Nummer ging es. Werkzeug-Befund, kein Seitenbefund.
2. Testdaten widersprechen sich: Protokoll („Probe Läufer“, 0641 000000) und Briefing („Erika Muster“, 0172 0000000). Verwendet: Briefing.

## PRÜFUNG UND ERGEBNIS
- Sechs Läufe vorhanden (`P5-m390-A1` bis `A6`). Kein Absenden. Antworten in eigenen Worten.
- Ziel erreicht: A1, A2, A3, A5, A6. Nicht erreicht: A4 (Fotoprüfung).
- Handlungen gesamt: 1 + 2 + 13 + 35 + 6 + 19 = 76.

## BILDBELEGE
Unter `/home/user/tezgel/_werkstatt/cache/probelauf/e0/`:
- P5-m390-A1/01-tippe.jpg
- P5-m390-A2/02-tippe.jpg
- P5-m390-A3/03-tippe.jpg, 05-tippe.jpg, 12-scrolle.jpg (Absendeknopf im Bild)
- P5-m390-A4/05-tippe.jpg (Musterbäder), 12-scrolle.jpg (Referenzen), 14-scrolle.jpg (Startseite), 28-scrolle.jpg (Ratgeber-Kacheln)
- P5-m390-A5/05-scrolle.jpg, 06-scrolle.jpg (Kostenvoranschlag)
- P5-m390-A6/03-tippe.jpg (Standorte-Menü), 06-scrolle.jpg (Liste mit Limburg), 08-tippe.jpg (Ortsseite Limburg)

## OFFENE FRAGEN
1. A4 „hoch“ braucht Gegenprüfung. Offen bleibt, ob nicht besuchte Seiten (Badsanierung komplett, Fliesen & XXL, Barrierefreies Bad, Bad aus einer Hand) Fotos fertiger Bäder zeigen.
2. A3: Das Protokoll verlangt „Pflicht-Einwilligungen ankreuzen“. Ich fand kein Kästchen im Formular. Ist das so gewollt?
3. Testdaten: Welche gilt, Briefing oder Protokoll?

=== ENDE E0-PROBE-09 · BEREIT ZUR RÜCKGABE ===
