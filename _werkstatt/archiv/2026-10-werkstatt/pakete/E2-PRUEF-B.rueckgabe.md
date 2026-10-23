# Rückgabe E2-PRUEF-B · Prüfstufe B E2-Tor (/ und /kontakt) · Build 1ad2e45 auf 4312

## GEÄNDERTE DATEIEN
Keine. Nur angelegt: `_werkstatt/belege/e2-tor/` (PRUEFSTUFE-B.md mit Tabelle, plus Unterordner reinraum, server, funktion, axe, bilder, bildsatz-ersatz, bewegung, texte, werte). Hilfsdateien im Scratchpad `…/scratchpad/E2-PRUEF-B/`. Keine Mikrotext-Änderungen. Kein Commit, kein Push.

## WAS UND WARUM
Alle zehn Schritte nacheinander ausgeführt, auch bei ROT. Nichts behoben. Server 4312 läuft mit 1ad2e45 und ist nicht gestoppt. 4310 und 4320 sind unberührt (je 200). Lighthouse ist nicht Teil dieses Pakets.

## GEMEINSAME DATEIEN
Keine Änderung beantragt. Werkzeug-Befunde nur zur Kenntnis: `src/app/layout.tsx:98` (Farbliteral #F5F4F0), `src/app/globals.css:250–251` (Dauer 0.01ms), `src/app/bewegung.css:200–201` (Dauer 0s).

## PRÜFUNG UND ERGEBNIS
- Schritt 1, reinraum 1ad2e45: Build, Typecheck, Lint, npm test (26/26), qa:graph, nft sauber. GRÜN. 179 Routen.
- Schritt 2: / 200, /kontakt 200.
- Schritt 3, Funktionstests: 306 gesamt, 286 bestanden, 0 fehlgeschlagen, 0 flaky, 16 übersprungen, 4 fixme (bekannt). Keine Wiederholung nötig.
- Schritt 4, Bildsatz: 66 Aufnahmen, 0 Fehler, 0 Überlauf, 0 Überlappung, 0 Konsolenmeldungen. GRÜN.
- Schritt 5, Ersatzpfad: 66 Aufnahmen, alle Zählwerte 0. GRÜN.
- Schritt 6, axe: ROT. / 0 ernste/kritische Knoten. /kontakt 2 Knoten (color-contrast, serious) in allen fünf Läufen, Zustände normal, Menü und Banner, also 10.
- Schritt 7, Bewegung: reduziert 0 Bewegungsbefunde auf allen Läufen. Einzelbilder SIG-1 und SIG-Flucht je 5 Bilder. Bildrate m390 Median verworfen 0,05 % (Läufe 0,09 / 0,00 / 0,05). Bildrate d1440 nicht ausführbar (siehe Frage 2). Register /kontakt 6 Einträge ohne data-motion.
- Schritt 8, werte.mjs: ROT. Commit 1ad2e45: 721 Befunde in 28 von 109 Dateien. Arbeitsbaum (22:14, HEAD dd0c0d0): 713 in 23 von 105. Größte: BadProjektCheck/Zusammenfassung.jsx 98, beratung/page.jsx 74, BadanfrageFunnel/Schritt5.jsx 53. Vollliste in PRUEFSTUFE-B.md.
- Schritt 9, Texte: GRÜN laut Werkzeug. Entfernte Zeilen 0, unerlaubt entfernte Spannen 0 (72 erlaubt), SEO, Sitemap und robots unverändert, kaputte Links 0. Hinzugefügte Zeilen siehe Frage 3.

## BILDBELEGE
- `_werkstatt/belege/e2-tor/bilder/`: 66 JPEG, Breite höchstens 1440 px, 4,1 MB, Pfad `<gerät>/<seite>/NN.jpg`.
- `_werkstatt/belege/e2-tor/bewegung/`: 15 JPEG der Einzelbilder (sig-kreuzlinie m390 und d1440, sig-flucht d1440).

## OFFENE FRAGEN
1. axe /kontakt (10 Knoten) und werte (721 Befunde) verfehlen den Maßstab 0. Behebung ist Sache des Orchestrators. Maßgeblich ist der Commit-Lauf (721), nicht der Arbeitsbaum-Lauf (713), der auf dd0c0d0 lief. Der Werkzeugbericht liest CSS aus dem Arbeitsbaum.
2. Bildrate d1440: Werkzeug bricht ab („bildrate läuft fest in Ansicht m390“). Soll das Werkzeug geändert werden?
3. Texte: 152 hinzugefügte Zeilen (/ 136, /kontakt 16) sind in texte-erlaubt.json nicht protokolliert. Die Erlaubtliste hat nur Entfernungen (0 Einträge mit „neu“). Das Werkzeug wertet sie nicht als ROT. Gelten sie als protokollierte Mikrotexte? Zudem zählt „seiten_mit_abweichung 242“ 240 nicht extrahierte Seiten mit.
4. Personenbezug der Bildbelege: Kundenstimmen mit Kürzeln wie „Elke S.“ stehen im Text von /. Ob sie auf Bildern erscheinen, ist nicht geprüft. Freigabe der Belege?
5. Tracking: 8 Tests übersprungen, weil RELAUNCH_TRACKING=1 nur für einen Build mit Platzhalter-GA4-ID gilt. Port 4311 läuft mit reinraum-ga-745335f, nicht mit 1ad2e45.
6. Reduziert, „alles sichtbar“: unsichtbar-Liste / m390 20, d1440 15. Darin 15 bzw. 13 anriss-Striche „außerhalb des Dokuments“ und „Deckkraft 0.40“ bei druck/button. Bewertung offen.
7. Einzelbilder sig-kreuzlinie: Bild 0 und 1 sowie 3 und 4 sind byte-gleich (md5), in beiden Ansichten. Deutung offen.
