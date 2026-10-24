# E2-PRUEF-B · Rückgabe (Stufe B, Startseite `/`, Stand 5df89bc, Port 4311)

## GEÄNDERTE DATEIEN
Nur Belege in `_werkstatt/belege/e2/` (u. a. STUFE-B.md, funktion.json, schrift200.json, lighthouse.json). Die CSV von `adressen.mjs` lag zuerst in `_werkstatt/`; verschoben nach `belege/e2/`. Keine Commits, keine Pushes.

## ERGEBNIS JE PRÜFUNG
Befehle und Quellen: `_werkstatt/belege/e2/STUFE-B.md`.
1. Bestand: ergebnis.txt alle Exit 0; `npm test` 114 bestanden, 0 gescheitert. E0: 37/37. Erfüllt: ja.
2. Funktionsspecs: 319 bestanden, 12 übersprungen, 1 unerwartet im Erstlauf (kontaktwege, mobil, Zeile 134). Wiederholung 2/2 bestanden. E0: 290/0/12. Gesamt ≥ E0: ja. 0 unerwartet: nein.
3. Bildsatz `/`, 10 Geräte: Überlauf 0, Überlappung 0, Konsole 0. E0: d1280 Überlauf 2. Erfüllt: ja.
4. Konsole `/` (Einzelbild, 10 Geräte): 0. E0: 0. Erfüllt: ja.
5. Schrift 200 %, `/`, m360/m390/m430: Überlauf 0, Überlappung 1 je Gerät. Erfüllt: nein.
6. Erstes Bild, Erstbesuch, `/`: m360 3, m390 5, m430 5, q844 3, t768 5, t1024 3, d1280 3, d1440 3, d1920 4, d2560 5 (von 5). E0: 1, 3, 3, 3, 5, 4, 2, 3, 5, 5. Erfüllt: nein. Nach Einwilligung: 5/5 auf allen Geräten.
7. axe (WCAG 2.2 AA, 28 Läufe): 0 kritisch, 0 ernst, 0 Befunde. E0: 132 Läufe, 0. Erfüllt: ja.
8. Lesbarkeit `/`: GRÜN (Flesch 78,5). E0: ROT. Erfüllt: ja.
9. Reduzierte Bewegung `/`, m390: 0 Befunde (188 geprüft). E0: 0. Erfüllt: ja.
10. Bildrate m390, 4× CPU: verworfen 0,17 % (Läufe 0,57 / 0,12 / 0,17 %). Ziel ≤ 5 %. Erfüllt: ja.
11. Werte außerhalb des Designsystems: 0 Befunde in 44 Dateien. Erfüllt: ja.
12. Adressen: 203 gemessen (E0 202; neu `/preise`). Status 200: 169, 308: 2, 410: 32 (E0: 168, 2, 32). Keine E0-Adresse mit anderem Status. Kaputte Links (404, 5xx, 0): 0. Erfüllt: ja.
13. Reaktion m390, 4× CPU, Median aus 5: Hauptknopf 160, Menü 168, Eingabe 72, Link 80 ms. Höchster Median 168 ms (≤ 200). Erfüllt: ja.
14. Lighthouse mobil `/` (Median aus 5): Leistung 89 [82–90] (E0 89), LCP 3029 ms [2872–3318] (E0 3472), CLS 0 (E0 0), Zugänglichkeit 100, Best Practices 100, SEO 100. Leistung ≥ 90: nein. LCP ≤ 2500 ms: nein. CLS, Zugänglichkeit, Best Practices, SEO: ja.
15. Lighthouse Desktop `/` (Median aus 3): Leistung 98 (E0 100), LCP 725 ms (E0 687), CLS 0,082 (E0 0). Kein Desktop-Budget; nur berichtet.

## POSITIVPROBE
- `einzelbild.mjs` mit `/gibt-es-wirklich-nicht-200` (m390): HTTP 404, Exit 1. Bestanden.
- `reaktion.mjs --probe`: langsam 344 ms, schnell 32 ms, Drosselung 3,1. „PROBE OK“. Bestanden.

## BILDBELEGE
- Schrift-200-Überlappung, m360: `$SCRATCH/E2-PRUEF-B/sichtung/m360-s200-ueberlappung.png`. Die Unterstreichung der Zeile „06441 /“ berührt den Schrägstrich; kein Text ist abgeschnitten. m390: `$SCRATCH/E2-PRUEF-B/sichtung/m390-s200-ueberlappung.png`.
- Ganzseitig 200 %: `$SCRATCH/E2-PRUEF-B/sichtung/*-s200-mosaik-1..4.png`. Sichtung: keine abgeschnittenen, leeren oder überdeckten Bereiche außer dem Befund oben. Die untere Leiste (Anruf, WhatsApp, Termin) steht in der Vollseitenaufnahme mitten im Bild; das ist ein Aufnahmeartefakt.

## GEMEINSAME DATEIEN
Keine geändert. Keine Fehler in fremden Dateien gemeldet.

## OFFENE FRAGEN
1. Funktionstests je Spec gegen E0: Die E0-Datei `E0-PRUEF-03/funktion.json` ist im Repo nicht auffindbar. Das Archiv hat andere Describe-Namen. Seit c53faf4 sind 8 Testdateien geändert (+588/−112). Nur der Gesamtvergleich (319 gegen 290) ist belegbar.
2. kontaktwege mobil, Zeile 134 (Festnetz-Link im Fußbereich): im Erstlauf rot, in der Wiederholung grün. Ursache offen.
3. Einzelbilder intro, startbild, verlegen: Auf `/` nicht vorhanden (Werkzeug: „kommt nicht vor“, 0 Bilder). Im DOM ebenfalls nicht vorhanden (Register). Auslöser oder Intro-Speicher prüfen.
4. Lesbarkeit `/gibt-es-nicht`: ROT nur durch HTTP 404. Soll die 404-Seite ausgenommen werden?
5. Adressen mit 410 (32, wie E0): zählen sie als kaputte Links?
6. Quelle der Schrift-200-Textkreuzung (Rufnummerzeile im Fuß): nicht zugeordnet.
7. Briefing nennt 170 Adressen; gemessen 203.
8. Commit c5f81b7 (08:31, Orchestrator) enthält Zwischenstände meiner Belege. Spätere Änderungen an STUFE-B.md und den Belegen sind unkommittiert.

=== ENDE E2-PRUEF-B · BEREIT ZUR RÜCKGABE ===
