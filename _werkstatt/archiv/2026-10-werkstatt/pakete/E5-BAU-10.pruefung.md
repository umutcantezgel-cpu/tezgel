# Prüfstufe A: E5-BAU-10 und E4-BAU-11-NACH

Prüfer: Unteragent (Arbeitsmodell), Stand 2026-10-12. Geändert wurde nichts unter src/ oder _werkstatt außer dieser Datei. Die Läufe schrieben nur in den Cache (_werkstatt/cache, Symlink auf das Scratchpad) und ins Scratchpad. Dev-Server 4320 lief durchgehend (HTTP 200), nicht gestartet oder gestoppt. Kein Commit, kein Push.

Scratchpad-Ordner (Kürzel SCR): /tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad

## Übersicht

| Lauf | pruefe-a Exit | Gesamt | tsc | eslint | Funktionstests | Bilder | Textvergleich |
|---|---|---|---|---|---|---|---|
| E5-BAU-10 | 1 | ROT | GRÜN | GRÜN | ROT (1 unerwartet) | GRÜN | GRÜN |
| E4-BAU-11-NACH | 0 | GRÜN | GRÜN | GRÜN | GRÜN | GRÜN | GRÜN |
| werte.mjs (alle drei Dateien) | 0 | 0 Befunde | | | | | |

## 1. E5-BAU-10

Dateien: `src/app/(bestand)/leistungen/[id]/[stadt]/page.tsx`, `src/components/kern/Einstieg.tsx`
Ansichtspfade: /leistungen/bad/wetzlar, /leistungen/aussen/asslar, /leistungen/untergrund/giessen
Exit-Code pruefe-a: **1** (Gesamt ROT, Grund allein der eine unerwartete Funktionstest)
Protokoll: SCR/E5-BAU-10/pruefe-a.txt

### Zusammenfassung pruefe-a

- Typprüfung (tsc): GRÜN. Fehler in eigenen Dateien 0, übrige 0.
- Lint (eslint): GRÜN. Fehler 0, Warnungen 0.
- Funktionstests: ROT. Erwartet 95, unerwartet 1, flaky 0, übersprungen 8. Specs: funktion-schnellanfrage, funktion-navigation, funktion-kontaktwege.
  - Fehlgeschlagen (Projekt mobil): `funktion-navigation.spec.mjs` › „FAQ-Akkordeon (/faq)“ › „Startseite: Akkordeon-Frage wechselt aria-expanded und blendet die Antwort ein/aus“ (Zeile 166). Fehlermeldung: aria-expanded bleibt "false" statt "true" nach dem Klick (Timeout 10 s).
  - Einordnung (Messung, keine Ursache bewiesen): Die Startseite `/` importiert `components/start/Einstieg`, nicht `components/kern/Einstieg`. Die geänderten Dateien werden von `/` nicht geladen. Derselbe Test lief danach in zwei Einzelläufen (nur mobil, 1 Worker) zweimal grün. Der Gesamtlauf lief zeitgleich mit anderen Prüfläufen auf dem Server.
- Bilder: GRÜN. Alle drei Pfade: HTTP 200/200, Konsole 0, Überlauf 0, Überlappung 0 (m390/d1440).
- Textvergleich: GRÜN (Stufe ohne Einfluss auf den Exit-Code, siehe unten).

### Textvergleich gegen e0

Hinweise zur Basis:
- In e0 gibt es nur /leistungen/bad/wetzlar. /leistungen/aussen/asslar und /leistungen/untergrund/giessen fehlen in e0 (dort: aussen herborn, wetzlar; untergrund dillenburg, wetzlar). Diese beiden Seiten sind nicht verglichen.
- Die Kennzahl "seiten_mit_abweichung 242" besteht aus 241 e0-Seiten, die in diesem Lauf nicht neu gelesen wurden und deshalb als "fehlt" stehen, und aus der Seite wetzlar. Kein Befund.

**/leistungen/bad/wetzlar** (Ansichten m390 und d1440 zusammengefasst)
- Zeilen entfernt: main 0, header 0, footer 0. Sitemap 0, SEO 0, robots unverändert, kaputte interne Links 0.
- Wortspannen entfernt: 14, davon unerlaubt 0. Erlaubt laut texte-erlaubt.json:
  - footer: "WhatsApp:", "Fax:"
  - header: "buchen"
  - main: "Punkt"; "Garantierter Standard Punkt" (7-mal); "Garantierter Standard"; "Kostenloses Vor-Ort-Aufmaß anfordern"; "Kostenfreies Vor-Ort-Aufmaß in Wetzlar • Festpreisangebot • HWK-Fachbetrieb"
- Wortspannen hinzugefügt, nicht in der Erlaubnisliste: 15 (footer 7, header 2, main 6). Das Tool wertet das nicht als ROT. Wörtlich:
  - footer: "Anschrift" | "Telefon" | "WhatsApp" | "Fax" | "E-Mail" | "Zeiten" | "Betrieb seit 2008"
  - header: "WhatsApp" | "anfragen"
  - main: "Blatt Badsanierung & Bäder Verband Halbverband Betrieb Fliesenverlegung Tezgel Inhaber Deniz Tezgel Kammer" | "Wiesbaden Betrieb seit 2008 HWK" | "· Garantierter Standard" | "Wetzlar • Festpreisangebot • HWK-Fachbetrieb Kostenfreies Vor-Ort-Aufmaß in" | "Per" | "schreiben"
- Zeilen hinzugefügt (nur Information): main 22, header 2, footer 10.
- Die Footer-Beschriftungen stammen aus `src/components/common/Footer.jsx`. Diese Datei gehört nicht zu den geprüften Dateien. Warum sie gegen e0 abweichen, wurde nicht geprüft.

**/leistungen/aussen/asslar und /leistungen/untergrund/giessen**
- Nicht verglichen (keine Basis in e0). Der Texte-Lauf liefert für beide Seiten Titel, H1 und Überschriften. Titel: "Balkon- & Terrassensanierung in Aßlar | Tezgel" bzw. "Untergrund & Abdichtung in Gießen | Fliesen Tezgel".

Texte-Dateien: _werkstatt/cache/texte/E5-BAU-10/texte-vergleich-gegen-e0.json (Kopie im Scratchpad nicht nötig)

### werte.mjs (E5-BAU-10-Dateien)

Aufruf: `node _werkstatt/werkzeuge/werte.mjs --dateien <die drei Dateien>` (Arbeitsbaum). Befunde 0. Geprüft: 3 Dateien, 203 Klassenvorkommen, 77 eindeutig, 0 nicht prüfbar, 0 Fehler. Bericht: SCR/werte-E5/2026-10-12T06-52-55-334Z.json

### Bilder E5-BAU-10

Ganzseiten (--voll), /leistungen/bad/wetzlar:
- d1440: SCR/E5-BAU-10/voll/d1440-voll.jpg (1440 × 8469). Teile: d-teil1.jpg, d-teil2.jpg, d-teil3.jpg (je 2300 px), d-teil4.jpg (1569 px), im selben Ordner.
- m390: SCR/E5-BAU-10/voll/m390-voll.jpg (390 × 13629). Teile: m-teil1.jpg bis m-teil5.jpg (je 2400 px), m-teil6.jpg (1629 px), im selben Ordner.
- Ganzseiten-Berichte: SCR/E5-BAU-10/voll/einzelbild.json

Einzelbilder aus pruefe-a:
- SCR/E5-BAU-10/bilder/leistungen__bad__wetzlar/m390.jpg und d1440.jpg
- SCR/E5-BAU-10/bilder/leistungen__aussen__asslar/m390.jpg und d1440.jpg
- SCR/E5-BAU-10/bilder/leistungen__untergrund__giessen/m390.jpg und d1440.jpg

Sichtbefunde (nur Auffälligkeiten, keine gestalterische Bewertung):
- Keine abgeschnittenen Texte und keine Textüberlagerung zwischen Textblöcken gesehen.
- m390, m-teil1: Die fixe Mobilleiste (Anrufen, WhatsApp, Aufmaß) liegt in der Ganzseite bei etwa y 780 bis 845 über dem Planblatt. Am linken Rand ist ein Schloss-Symbol angeschnitten. Das ist ein Festelement im Vollbild, kein Layoutfehler im Fluss.
- d1440, d-teil1 und d-teil2: leere Flächen in der rechten Spalte neben "Fachkompetenz & Präzision für Wetzlar", neben "Detailliertes Leistungsspektrum in Wetzlar" und neben "Unser 8-Punkte-Qualitätsversprechen".
- Kachel "Standort Wetzlar" im Abschnitt "Weitere Leistungen": ohne Schemazeichnung, nur ein Ortssymbol mit Text unten (d-teil2 und m-teil4).

## 2. E4-BAU-11-NACH

Datei: `src/app/(bestand)/fliesen/verlegemuster/page.jsx` (Arbeitsbaum, uncommitted)
Ansichtspfad: /fliesen/verlegemuster
Exit-Code pruefe-a: **0** (Gesamt GRÜN)
Protokoll: SCR/E4-BAU-11-NACH/pruefe-a.txt

- tsc: GRÜN, Fehler in eigenen Dateien 0, übrige 0.
- eslint: GRÜN, Fehler 0, Warnungen 0.
- Funktionstests: GRÜN. Erwartet 72, unerwartet 0, flaky 0, übersprungen 8. Specs: funktion-navigation, funktion-kontaktwege.
- Bilder: GRÜN. HTTP 200/200, Konsole 0, Überlauf 0, Überlappung 0.
- Textvergleich gegen e0: GRÜN. Zeilen entfernt 0 (main, header, footer). Sitemap, SEO, robots und kaputte Links ohne Befund.
  - Wortspannen entfernt: 12, davon unerlaubt 0. Erlaubt: footer "WhatsApp:", "Fax:"; header "buchen"; main "Punkt"; "Garantierter Standard Punkt" (7-mal); "Garantierter Standard".
  - Wortspannen hinzugefügt, nicht in der Erlaubnisliste: 14 (footer 8, header 2, main 4). Wörtlich:
    - footer: "Anschrift" | "Telefon" | "WhatsApp" | "Fax" | "E-Mail" | "Zeiten" | "Betrieb seit 2008" | "Cookie-Einstellungen"
    - header: "WhatsApp" | "anfragen"
    - main: "Verband Kreuzfuge Halbverband Drittelverband Blatt Fliesen-Verlegemuster Sitz Aßlar Betrieb Fliesenverlegung Tezgel Inhaber Deniz Tezgel Kammer HWK Wiesbaden Betrieb seit 2008" | "Verschnitt je Muster: Richtwerte für die Bestellung" | "Ansprechpartner Deniz Tezgel Telefon 06441 / 44 83 567 Mobil & WhatsApp 0172 / 67 28 504 E-Mail info@tezgel.de Sitz Hohwardstraße 14, 35614 Aßlar" | "· Garantierter Standard"
  - Zeilen hinzugefügt (nur Information): main 36, header 2, footer 10.
  - Die Footer-Spannen stammen aus `src/components/common/Footer.jsx`, nicht aus der geprüften Datei (wie bei E5).
- Ausgabe-Berichte: _werkstatt/cache/texte/E4-BAU-11-NACH/texte-vergleich-gegen-e0.json

### werte.mjs (E4-BAU-11-NACH-Datei)

Im selben Lauf wie oben enthalten: 0 Befunde, keine nicht prüfbaren Stile.

### Bilder E4-BAU-11-NACH

- d1440: SCR/E4-BAU-11-NACH/bilder/fliesen__verlegemuster/d1440.jpg
- m390: SCR/E4-BAU-11-NACH/bilder/fliesen__verlegemuster/m390.jpg

Sichtbefunde:
- d1440: Einstieg vollständig im Bild. Etikett, H1 (zweizeilig), Vorspann, zwei Knöpfe, Planblatt mit Umschalter (Kreuzfuge, Halbverband aktiv, Drittelverband) und Datenraster. Keine Brüche sichtbar.
- m390: H1 und beide Knöpfe sichtbar. Das Planblatt beginnt erst im unteren Teil des Bildschirms und ist am Bildrand angeschnitten. Die fixe Mobilleiste liegt über dem unteren Rand des Bildes. Der Verband-Umschalter ist im ersten Bildschirm nicht zu sehen. Keine abgeschnittenen Texte.

## 3. Sonstiges

- Der Arbeitsbaum enthält außer `verlegemuster/page.jsx` noch uncommitted Änderungen an `fliesen/grossformat`, `holzoptik`, `kueche`, `neubau`, `renovierung` und `verlegetechnik` (je page.jsx) sowie die untracked Datei-Gruppe `_werkstatt/belege/adhoc/texte/`. Das gehört nicht zu dieser Prüfung und wurde nicht geprüft.
- Beim Start des E5-Laufs liefen weitere pruefe-a-Läufe anderer Agenten auf dem Server (Semaphor mit zwei Plätzen). Der E5-Lauf bekam Platz slot2.
