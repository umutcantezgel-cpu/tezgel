# E4-NACH-17-PA · Rückgabe Prüfer (Stufe A)

**GEÄNDERTE DATEIEN**
Keine Projektdatei. Neu nur unter `_werkstatt/belege/e4-nach/tempo-pa/` (Läufe, Bilder, JSON, HTML-Kopien, Messskripte) und diese Rückgabe.

**WAS UND WARUM**
Schritte 1 bis 3 nach Briefing: Lauf 1 mit 6 Dateien und 5 Pfaden, HTML-Stichprobe gegen 4320 (Vergleich 4310), Kartenplatz bei 390 px (3 Läufe, Median). Zusatz: Die Zuordnung löst für diese Dateien keinen Rechner-, Schnellformular- oder Kontaktweg-Test aus. Deshalb liefen diese Specs und ein Bedienungstest des Rechners auf `/` gesondert, mit gleicher Konfiguration.

**PRÜFUNG UND ERGEBNIS**
1. Lauf 1 (`lauf1/pruefe-a.txt`): Gesamt GRÜN, Exit 0.
   - tsc: 0 Fehler. eslint: 0 Fehler, 0 Warnungen.
   - Funktionstests laut Zuordnung (termin, einwilligung): 62 erwartet, 0 unerwartet, 0 flaky.
   - Bilder: 10 Einzelbilder, HTTP 200, Konsole 0, Überlauf 0. Überlappung 25 nur auf `/` m390 (Textkreuzung, Text aus `src/config/services.js`), im Build 4310 identisch, also vorbestehend.
   - Texte gegen e0: GRÜN, entfernt 0, unerlaubt entfernt 0, kaputte Links 0.
2. HTML, Trefferzahl je Wort (`html-stichprobe/stichprobe.tsv`):

| Seite | Rechner „Situation“ | Termin „Uhrzeit“ | Karte „Einwilligung“ | Schnellformular „Wohnort“ |
|---|---|---|---|---|
| / | 4 | – | 1 | – |
| /kontakt | – | 3 | 1 | – |
| /standorte | – | – | 2 | 4 |
| /leistungen | 4 | – | – | 0 (Erwartung nicht erfüllt, Frage 1) |

   „–“ = auf dieser Seite nicht vorgesehen.
3. Mobil 390 (`mobil-390/messung.json`, Median aus 3 Läufen):

| Seite | Zonen sichtbar | sichtbare Ortsliste | größte Leerlücke | Breite |
|---|---|---|---|---|
| / | 0 von 3 | keine (Einzugsband erst ab md) | 48 px, Innenabstand unter den Knöpfen | 390 |
| /kontakt | 3 von 3 | 16 Einträge in 3 Zonen | 42 px, Abstand Knöpfe–Zonen | 390 |

   Grenze „> 48 px“ nicht überschritten, auf `/` genau am Grenzwert.
4. Funktionen:
   - Zusatz (4320): funktion-preisrechner 18/18 (/preise, /faq), funktion-schnellanfrage 24/24 (/standorte/wetzlar, /leistungen/bad/wetzlar), funktion-kontaktwege 31/31 plus 3 projektbedingt übersprungen. Gesamt 73 bestanden, 0 fehlgeschlagen (`zusatz-pw/pw.json`).
   - Rechner auf `/` (`rechner-start/rechner-probe.json`): Gewerk, Fläche, eigene Fläche, Rahmen sichtbar. 6 von 6 Läufen bedienbar, 0 Anfragen gesendet, 0 Konsolenfehler. Zeit bis sichtbar (Dev-Server, Median): 1636 ms (390), 1919 ms (1440).

**BILDBELEGE** (unter `_werkstatt/belege/e4-nach/tempo-pa/`)
- `mobil-390/start/kartenplatz-m390.png`: Platzhalter auf `/`, ohne Ortsliste. `mobil-390/start/abschnitt-m390.png`: Servicegebiet.
- `mobil-390/kontakt/kartenplatz-m390.png`: Zonen auf `/kontakt`; die fixe Bodenleiste überdeckt im Ausschnitt den unteren Zonenrand.
- `lauf1/bilder/<seite>/m390.jpg`, `d1440.jpg`: Stufe-A-Einzelbilder. `rechner-start/rechner-m390-1.png`: Rechner nach Bedienung.

**GEMEINSAME DATEIEN** (nicht geändert, Vorschlag)
1. `_werkstatt/werkzeuge/test-zuordnung.json`, neue Einträge:
   - `{"muster": "src/app/\\(bestand\\)/page\\.tsx$", "specs": ["funktion-preisrechner.spec.mjs", "funktion-kontaktwege.spec.mjs"]}` (preisrechner erst nach Punkt 2)
   - `{"muster": "components/ui/FinalCTA\\.tsx$", "specs": ["funktion-kontaktwege.spec.mjs"]}`
2. `_werkstatt/werkzeuge/tests/funktion-preisrechner.spec.mjs`: neuer Fall „Rechner auf /“ (Gewerk, Fläche, eigene Fläche, Rahmen, kein Absenden). Vorlage: `tempo-pa/rechner-probe.mjs`.
3. Optional `_werkstatt/werkzeuge/pruefe-a.sh`: Kartenplatz-Messung als Schritt, Vorlage `tempo-pa/mobil-messung.mjs`.

**OFFENE FRAGEN**
1. Schnellformular im Abschluss auf `/leistungen`: Die Erwartung aus dem Briefing trifft nicht zu. Die Seite rendert `<FinalCTA />` ohne `showQuickForm`, und kein Bestandsaufruf übergibt es heute. Prod (4310) hat dort ebenfalls keinen Treffer. Soll `/leistungen` das Formular haben?
2. Zuordnung: Die sechs Dateien lösen nur termin und einwilligung aus. Rechner auf `/` und die Abschluss-Knöpfe haben keine Funktionsprüfung.
3. Meta-Beschreibung von `/` weicht von e0 ab („fugenlose“ → „fugenarme“, „DIN 18534 zertifiziert“ → „Abdichtung DIN 18534“). Herkunft: Commit 2e5317f, vor E4-NACH-17. Nicht bewertet.
4. Die Ergebnisse gelten für den Arbeitsbaum mit fremden unversionierten Änderungen (u. a. konfigurator, bewegung.mjs, Einstieg.tsx). Prod 4310 läuft auf älterem Build (reinraum-8debc92).
5. Bitte bestätigen, ob 48 px Innenabstand auf `/` als „Leerfeld“ gelten. Kartenplatz-Nachtrag E4-NACH-12 (ec49875, 3976226) ist durch Schritt 3 abgedeckt.
