# Prüfstufe B · E2-Tor · Referenzansichten / und /kontakt

Stand: 2026-10-10 · Build 1ad2e45 (Reinraum) auf 127.0.0.1:4312 · Prüfer: E2-PRUEF-B
Werkzeugausgaben, unverändert übernommen. Lighthouse ist nicht Teil dieser Stufe.

## Tabelle Kriterium · Ergebnis · Belegpfad

| Kriterium | Ergebnis | Belegpfad |
|---|---|---|
| Build, Typprüfung, Lint, npm test, qa:graph (reinraum.sh 1ad2e45) | GRÜN: alle sechs Stufen Exit 0; npm test 26 von 26; Build-Zähler 179 statische Seiten | reinraum/ergebnis.txt, reinraum/routen.txt, reinraum/test.log |
| nft-Tracing ohne _relaunch/_werkstatt | sauber | reinraum/nft-werkstatt.txt |
| Server 4312 erreichbar | / 200 · /kontakt 200 | server/curl.log |
| Funktionstests gegen 4312 | 306 Tests: bestanden 286 · fehlgeschlagen 0 · flaky 0 · übersprungen 16 · fixme 4 · Laufzeit 557 s. GRÜN bis auf fixme. Offen: 8 Tracking-Tests übersprungen (siehe unten) | funktion/pw.json, funktion/schritt3-pw.log |
| Bildsatz / und /kontakt, m390 · t768 · d1440 | 66 Aufnahmen · Fehler 0 · nicht 200: 0 · Überlauf 0 · Überlappung 0 · Konsolenmeldungen 0 · GRÜN | bilder/bildsatz.json, bilder/ (66 JPEG) |
| Ersatzpfad (ohne Scroll-Animation und View Transitions) | 66 Aufnahmen · Fehler 0 · nicht 200: 0 · Überlauf 0 · Überlappung 0 · Konsole 0 | bildsatz-ersatz/bildsatz.json |
| axe WCAG 2.2 AA, Zustände Menü und Banner | ROT: / 0 ernste/kritische Knoten (5 Läufe) · /kontakt 10 Knoten (5 Läufe, je 2 × color-contrast, serious) | axe/axe.json, axe/schritt6-axe.log |
| Bewegung: Register, reduziert, Einzelbilder SIG-1 und SIG-Flucht, Bildrate | Register: / 0 Animationen ohne data-motion; /kontakt 6 Einträge ohne data-motion. Reduziert: 0 Bewegungsbefunde (alle Seiten). Einzelbilder je 5 Bilder. Bildrate m390 Median 0,05 % verworfen. Bildrate d1440 vom Werkzeug nicht ausführbar (OFFENE FRAGE) | bewegung/ (Ergebnis-JSON je Lauf, Einzelbilder, lauf.log) |
| Werte-Prüfung (werte.mjs) | ROT: Commit 1ad2e45: 721 Befunde in 28 von 109 Dateien. Arbeitsbaum um 22:14 (HEAD dd0c0d0): 713 Befunde in 23 von 105 Dateien | werte/werte-commit-1ad2e45.json, werte/werte-arbeitsbaum-22-14.json, werte/dateien-commit-1ad2e45.txt |
| Textvergleich gegen e0 (/ und /kontakt) | GRÜN (Werkzeugurteil): entfernte Zeilen 0 · unerlaubt entfernte Spannen 0 · SEO 0 · Sitemap 0 · robots unverändert · kaputte Links 0. Hinzugefügte Zeilen 152, nicht durch die Erlaubtliste gedeckt (OFFENE FRAGE) | texte/texte-vergleich-gegen-e0.json, texte/schritt9-vergleich.log |

## Schritt 1 · Reinraum 1ad2e45

- npm ci 0 (20 s) · build 0 (38 s) · typecheck 0 (11 s) · lint 0 (26 s) · test 0 (26 von 26 bestanden) · qa:graph 0 · nft sauber.
- Routen: 179 (Build-Zähler „Generating static pages (0/179)“). Routentabelle: 98 Einzelzeilen plus 81 über „[+N more paths]“.
- Kopie unter Scratchpad, Build-Verzeichnis reinraum-1ad2e45 (von 4310 unabhängig).

## Schritt 2 · Server

- 4312 gestartet mit `PORT=4312 server.sh start 1ad2e45`. GET / 200, GET /kontakt 200, GET /kontakt/ 308 (Schrägstrich-Regel).
- 4310 (200) und 4320 (200) unverändert erreichbar. Nicht gestoppt.

## Schritt 3 · Funktionstests (Playwright, 2 Projekte mobil und desktop, 1 Worker)

- Gesamt 306 · bestanden 286 · fehlgeschlagen 0 · flaky 0 · übersprungen 16 · fixme 4.
- fixme (4, je Test in beiden Projekten, funktion-konfigurator.spec.mjs): „Fußbodenheizung „Weiß nicht“ wird im Versand nicht als „Nein“ gemeldet“ · „Nur Treppe: keine erfundene Fläche (Vorgabe 20 m²) in der Nutzlast“.
- übersprungen (16), Werkzeugbegründung: Mega-Menü mobil ausgeblendet (3 mobil) · Mobil-Leiste nur mobil (2 desktop) · Widget-Doppelklick nur desktop (1 mobil) · Desktop-Navigation nur mobil (1 desktop) · Inhaltsverzeichnis mobil ausgeblendet (1 mobil) · Tracking „nur gegen den Build mit Platzhalter-GA4-ID“ (8: 4 mobil, 4 desktop; Testcode prüft RELAUNCH_TRACKING=1).
- Fehlschläge: keine; Einzelwiederholung nicht nötig.

## Schritt 4 · Bildsatz (e2-tor, /,/kontakt, Einwilligung abgelehnt, reduced motion)

| Seite | Gerät | Aufnahmen | Höhe (px) | Status | Konsole | Überlauf | Überlappung |
|---|---|---|---|---|---|---|---|
| / | m390 | 12 | 30282 | 200 | 0 | 0 | 0 |
| / | t768 | 12 | 23969 | 200 | 0 | 0 | 0 |
| / | d1440 | 12 | 16644 | 200 | 0 | 0 | 0 |
| /kontakt | m390 | 12 | 12523 | 200 | 0 | 0 | 0 |
| /kontakt | t768 | 10 | 9766 | 200 | 0 | 0 | 0 |
| /kontakt | d1440 | 8 | 6890 | 200 | 0 | 0 | 0 |

Summe 66 Aufnahmen, Fehler 0. Bilder: bilder/<gerät>/<seite>/NN.jpg, Breite maximal 1440 px, 4,1 MB gesamt.

## Schritt 5 · Ersatzpfad (e2-tor-ersatz)

Summe 66 Aufnahmen · Fehler 0 · nicht 200: 0 · Überlauf 0 · Überlappung 0 · Konsole 0. Nur Zahlen, keine Bilder übernommen.

## Schritt 6 · axe (Tags wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa; Zustände normal, Menü m390, Banner m390 und d1440)

| Seite | Zustand | Ernste/kritische Knoten | Regel · Selektoren (Werkzeugausgabe) |
|---|---|---|---|
| / | normal m390 | 0 | – |
| / | normal d1440 | 0 | – |
| / | Menü m390 | 0 | – |
| / | Banner m390 | 0 | – |
| / | Banner d1440 | 0 | – |
| /kontakt | normal m390 | 2 | color-contrast (serious): `.px-8 > span`, `.bg-emerald-600 > span` |
| /kontakt | normal d1440 | 2 | dieselbe Regel, dieselben Selektoren |
| /kontakt | Menü m390 | 2 | dieselbe Regel, dieselben Selektoren |
| /kontakt | Banner m390 | 2 | dieselbe Regel, dieselben Selektoren |
| /kontakt | Banner d1440 | 2 | dieselbe Regel, dieselben Selektoren |

Gesamtlauf: 25 Läufe, 76 ernste/kritische Knoten, alle color-contrast. Davon / 0 und /kontakt 10. Die übrigen 66 stammen aus den Zustandsläufen der Hauptseiten, die das Werkzeug mit --zustaende zusätzlich fährt: /blog 42, /bad 18, /standorte 6, /leistungen 0, /ueber-uns 0.

## Schritt 7 · Bewegung

| Lauf | Ergebnis (Werkzeugausgabe) |
|---|---|
| / register m390 | data-motion 163 · Kennungen 7 (anriss, aufklappen, auftritt, druck, sig-flucht, sig-kreuzlinie, zustand) · unbekannt 0 · ohne data-motion 0 · Hover 20 geprüft, 0 Fehler · Tab 30 Schritte, 29 mit wechselndem Fokus |
| /kontakt register m390 | data-motion 134 · Kennungen 3 (aufklappen, druck, zustand) · unbekannt 0 · ohne data-motion 6 Einträge (Transition outline-color, outline-offset, outline-width an button/a, 30 Vorkommen) |
| / reduziert m390 | Bewegungsbefunde 0 · unsichtbar 20: anriss/mark „außerhalb des Dokuments“ 15 · druck/button „Deckkraft 0.40“ 1 · druck/button#whatsapp „display none“ 1 · zustand/a und druck/a „display none“ je 1 · aufklappen/#mobile-menu „display none“ 1. Verdeckt durch Zustand (geschlossene Mega-Menüs) 5 |
| / reduziert d1440 | Bewegungsbefunde 0 · unsichtbar 15: anriss/mark „außerhalb des Dokuments“ 13 · druck/button „Deckkraft 0.40“ 1 · aufklappen/#mobile-menu „display none“ 1. Verdeckt durch Zustand 4 |
| /kontakt reduziert m390 | Bewegungsbefunde 0 · unsichtbar 4 (zustand/a, druck/a, aufklappen/#mobile-menu, druck/#whatsapp-floating-btn, je „display none“) |
| /kontakt reduziert d1440 | Bewegungsbefunde 0 · unsichtbar 1 (aufklappen/#mobile-menu „display none“) |
| / einzelbilder sig-kreuzlinie m390 | 5 Bilder bei 0/25/50/75/100 % · Dauer 1200 ms · Befund leer · Bild 0 = Bild 1 und Bild 3 = Bild 4 (md5 gleich) |
| / einzelbilder sig-kreuzlinie d1440 | 5 Bilder · Dauer 1200 ms · Befund leer · Bild 0 = Bild 1 und Bild 3 = Bild 4 (md5 gleich) |
| / einzelbilder sig-flucht d1440 | 5 Bilder · Dauer 860 ms · Befund leer · fünf verschiedene Bilder |
| / bildrate m390, 3 Wiederholungen, 4× CPU | Median verworfene Bilder 0,05 % (Läufe 0,09 · 0,00 · 0,05) · Median Bilder 4419 · Median LoAF 0 (Läufe 24 · 0 · 0) |
| / bildrate d1440 | nicht ausgeführt: Werkzeug bricht ab „bildrate läuft fest in Ansicht m390 (DPR 2)“ |

Hinweis: Die Kennzahlen der Bildrate sind Mediane über drei Läufe, wie vom Werkzeug berechnet (Funktion median in bewegung.mjs).

## Schritt 8 · Werte-Prüfung

Zwei Läufe, beide Exit 1:

1. Literal laut Briefing (`--basis 745335f --arbeitsbaum`), um 22:14 UTC. Zu diesem Zeitpunkt stand HEAD auf dd0c0d0, also nach 1ad2e45. Ergebnis: 105 Dateien · 5085 Klassenvorkommen (532 eindeutig) · 713 Befunde in 23 Dateien.
2. Commit-genau für 1ad2e45 (`--basis 745335f`, Dateiliste aus `git diff --name-only 745335f 1ad2e45` für src/ mit .js/.jsx/.ts/.tsx/.css, nur Dateien, die es in 1ad2e45 gibt, Inhalte aus der Reinraum-Kopie). Ergebnis: 109 Dateien · 5138 Klassenvorkommen (530 eindeutig) · 721 Befunde in 28 Dateien.

Befunde je Art (Lauf 2): farbe_ausserhalb 323 · schrift_ausserhalb 187 · abstand_ausserhalb 77 · groesse_ausserhalb 45 · radius_ausserhalb 32 · ohne_css 20 · beliebig 19 · dauer_ausserhalb 9 · dauer_zahl 6 · farbe_literal 2 · style_wert 1.

Befunde je Datei (Lauf 2, 1ad2e45), absteigend:

| Datei | Befunde |
|---|---|
| src/components/funnels/BadProjektCheck/Zusammenfassung.jsx | 98 |
| src/app/beratung/page.jsx | 74 |
| src/components/funnels/BadanfrageFunnel/Schritt5.jsx | 53 |
| src/components/funnels/FliesenKonfigurator/index.jsx | 50 |
| src/components/funnels/BadanfrageFunnel/Erfolg.jsx | 47 |
| src/components/sections/CompanyHistory.jsx | 46 |
| src/components/funnels/FliesenKonfigurator/ResultSummary.jsx | 41 |
| src/components/funnels/FliesenKonfigurator/Erfolg.jsx | 40 |
| src/components/funnels/FliesenKonfigurator/Schritt4.jsx | 34 |
| src/components/funnels/FliesenKonfigurator/Schritt3.jsx | 30 |
| src/components/funnels/BadanfrageFunnel/Schritt4.jsx | 28 |
| src/components/funnels/BadanfrageFunnel/Schritt3.jsx | 20 |
| src/components/funnels/BadanfrageFunnel/index.jsx | 18 |
| src/components/funnels/BadProjektCheck/Schritt1.jsx | 17 |
| src/components/funnels/BadanfrageFunnel/WhatsAppGeoeffnet.jsx | 16 |
| src/components/funnels/FliesenKonfigurator/WhatsAppGeoeffnet.jsx | 16 |
| src/components/funnels/BadProjektCheck/Schritt2.jsx | 15 |
| src/components/funnels/BadProjektCheck/Schritt3.jsx | 14 |
| src/components/funnels/BadProjektCheck/Schritt4.jsx | 14 |
| src/components/funnels/FliesenKonfigurator/Schritt1.jsx | 14 |
| src/components/funnels/BadProjektCheck/index.jsx | 10 |
| src/components/funnels/BadanfrageFunnel/Schritt1.jsx | 9 |
| src/components/funnels/BadanfrageFunnel/Schritt2.jsx | 9 |
| src/components/funnels/FliesenKonfigurator/OptionGroup.jsx | 2 |
| src/app/bewegung.css | 2 |
| src/app/globals.css | 2 |
| src/app/layout.tsx | 1 |
| src/components/ui/WhatsAppLogo.tsx | 1 |

Farbliteral-Befunde (Werkzeugausgabe): src/app/layout.tsx:98 `#F5F4F0` · src/components/ui/WhatsAppLogo.tsx:7 `#25D366`. CSS-Befunde dauer_zahl: src/app/globals.css:250–251 `0.01ms` · src/app/bewegung.css:200–201 `0s`.

## Schritt 9 · Texte (texte.mjs, texte-vergleich.mjs e0 e2-tor)

Erste Zeile des Vergleichs:
`{"seiten_mit_abweichung":242,"entfernt":0,"hinzu":152,"meta":0,"seo":0,"spannen_entfernt":72,"spannen_hinzu":95,"spannen_unerlaubt_entfernt":0,"sitemap_entfernt":0,"sitemap_hinzu":0,"robots_geaendert":false,"kaputte_links":0,"ergebnis":"GRÜN"}`

- 242 sind Schlüssel. Davon 2 mit Daten (/, /kontakt). Die übrigen 240 sind e0-Seiten ohne Extrakt in diesem Lauf und stehen als „fehlt“ im Bericht. Das Werkzeug zählt sie mit, ohne Befund.
- unerlaubt entfernte Spannen je Seite: / 0 · /kontakt 0.
- Entfernte Zeilen: 0. Entfernte Spannen: 72, alle vom Werkzeug als erlaubt markiert (/ main 67, / footer 2, /kontakt main 1, /kontakt footer 2).
- Hinzugefügte Zeilen: 152 (/ 136: main 125, footer 10, Überschriften 1 · /kontakt 16: main 6, footer 10). Das Werkzeug listet sie als `hinzu`, wertet sie aber nicht als ROT. Die Erlaubtliste texte-erlaubt.json hat 79 Einträge, davon 42 Zeilen mit alt und 0 mit neu. Hinzufügungen werden deshalb nicht protokolliert. Beispiele: „Per WhatsApp schreiben“, „5,0 von 5“, „27 verifizierte Google-Rezensionen“, Kundenstimmen-Zeilen.
- Interne Ziele 58, kaputte Links 0. Sitemap 163 Einträge, unverändert.

## Bildbelege

- bilder/: 66 JPEG (d1440, m390, t768), je Seite × Gerät, Breite maximal 1440 px. bilder/bildsatz.json.
- bewegung/: 15 JPEG (Einzelbilder sig-kreuzlinie m390 780 px, sig-kreuzlinie d1440 1328 px, sig-flucht d1440 705 px Breite).

## Offene Fragen

1. axe /kontakt: 10 ernste Knoten (color-contrast) in allen Zuständen. Maßstab 0 wird nicht erreicht. Keine Änderung durch den Prüfer.
2. Werte: Maßstab 0 wird nicht erreicht (721 bzw. 713 Befunde). Lauf 1 (Arbeitsbaum) ist nicht der getestete Commit. Maßgeblich ist Lauf 2 (commit-genau). Der Werkzeugbericht liest CSS-Definitionen aus dem Arbeitsbaum, also dd0c0d0, nicht aus 1ad2e45 (bewegung.css weicht zwischen den beiden ab).
3. Bildrate d1440: Werkzeug lässt das nicht zu. Bitte entscheiden, ob es ausgeführt werden soll (Werkzeugänderung nicht durch den Prüfer).
4. Texte: 152 hinzugefügte Zeilen sind nicht protokolliert. Entscheidung, ob sie als „protokollierte Mikrotexte“ gelten, liegt beim Orchestrator. Das Werkzeug meldet GRÜN.
5. Tracking: 8 Tests übersprungen, weil RELAUNCH_TRACKING=1 nur für einen Build mit Platzhalter-GA4-ID gilt. Der Port 4311 läuft mit reinraum-ga-745335f, nicht mit 1ad2e45. Ein Lauf gegen 1ad2e45 fehlt.
6. reduziert, „alles sichtbar“: Die unsichtbar-Listen enthalten 15 bzw. 13 anriss-Striche außerhalb des Dokuments (m390 / d1440), die Deckkraft-0,40-Meldung zu druck/button auf / und display-none-Elemente. Bewertung beim Orchestrator. Bewegungsbefunde (Lage oder Größe) sind 0.
7. Einzelbilder sig-kreuzlinie: Bild 0 und Bild 1 sowie Bild 3 und Bild 4 sind byte-gleich (md5), in beiden Ansichten. Die Anzahl von fünf Bildern ist erfüllt. Die Deutung ist offen.
8. Register /kontakt: 6 Transitionen auf Fokus-Outlines ohne data-motion (30 Vorkommen). Auf / keine.
9. Personenbezug der Bildbelege: Die Bilder zeigen die öffentlichen Seiten, darunter Firmenname, Geschäftsrufnummer und „Deniz Tezgel, Inhaber“ als Text (bilder/d1440/kontakt/00.jpg geprüft). Kundenstimmen mit Kürzeln wie „Elke S.“ stehen im Text von /. Ob sie auf den Bildern erscheinen, ist nicht geprüft. Freigabe durch den Orchestrator.
10. Gemeinsame Dateien: Keine Änderung beantragt. Werkzeug-Befunde in src/app/layout.tsx:98 und src/app/globals.css:250–251 gemeldet.

## Selbstprüfung

- Schreibrechte: Nur scratchpad/E2-PRUEF-B und _werkstatt/belege/e2-tor/ beschrieben. Keine Werkzeuge, Tests, gemeinsamen Dateien, .env-Dateien oder Schutzdateien verändert. Kein Commit, kein Push, keine POST-Anfragen.
- Server: 4312 läuft mit 1ad2e45 und ist nicht gestoppt. 4310 und 4320 nicht angefasst.
- Mengen: Schritt 1 6 Stufen · Schritt 3 306 Tests · Schritt 4 66 Aufnahmen · Schritt 5 66 · Schritt 6 25 Läufe · Schritt 7 11 Läufe · Schritt 8 zwei Läufe · Schritt 9 2 Seiten.
