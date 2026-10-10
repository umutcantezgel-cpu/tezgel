# Prüfstufe B2 · E2-Tor · Nachprüfung auf Reinraum f8899dc

Stand: 2026-10-10 · Reinraum f8899dc auf 127.0.0.1:4312 · GA-Variante f8899dc auf 127.0.0.1:4311 · Dev-Schaufenster auf 127.0.0.1:4320 (Arbeitsbaum; `src/` unverändert seit 5841449, HEAD während des Laufs bis b7bae98 (23:05), nur Belege und Protokolle) · Schritte 1–4 aus E2-PRUEF-B2 übernommen und gegengeprüft · Schritte 2–9 aus E2-PRUEF-B3 (axe, Bewegung, Szene, Systemwerte, Texte) · Abschluss durch E2-PRUEF-B3.

Pfade sind relativ zu `_werkstatt/belege/e2-tor/`. Jede Messung nennt in ihrer Ergebnisdatei das Feld `base` (Ziel-URL); bei allen Läufen unten stimmt sie mit dem angegebenen Port überein.

PRUEFSTUFE-B.md (Build 1ad2e45) bleibt unverändert und gilt für diesen Stand nicht mehr.

## Tabelle Kriterium · Ergebnis · Belegpfad

| Kriterium | Ergebnis | Belegpfad |
|---|---|---|
| Werkzeugoption `--ausschnitt ansicht` in `bewegung.mjs` (B2 Schritt 1) | `node --check` ohne Fehler. Diff zur Vorfassung: nur die Option und ein Zweig, der nur bei `ansicht` greift; ohne Option gleicher Ablauf. Lauf gegen 4310 `/` (m390): 0 Bilder, Meldung „Keine [data-motion]-Elemente auf /“. Lauf gegen 4320 `/` (m390): 5 Bilder, Ausschnitt `ansicht`. Commit 69da8fd | werkzeug-ausschnitt/4310/ (ergebnis.json, lauf.log), werkzeug-ausschnitt/4320/ (ergebnis.json, lauf.log, sig-kreuzlinie-0..4.jpg) |
| Reinraum f8899dc: Build, Typprüfung, Lint, npm test, qa:graph, nft (B2 Schritt 2) | GRÜN. npm ci 0 · build 0 · typecheck 0 · lint 0 · test 0 (26 von 26 bestanden, 0 fehlgeschlagen) · qa:graph 0 („QA SUCCESS“) · nft ohne `_relaunch`/`_werkstatt` (Datei leer). Build-Zähler 179/179 statische Seiten | b2/reinraum/ergebnis.txt, b2/reinraum/test.log, b2/reinraum/routen.txt, b2/reinraum/nft-werkstatt.txt, b2/reinraum/lauf.log |
| GA-Variante f8899dc, Port 4311 (B2 Schritt 2) | GRÜN. Dieselben Stufen, alle Exit 0; npm test 26 von 26; 179/179 Seiten. Build mit `NEXT_PUBLIC_GA4_ID=G-TEST000000`: Test-ID im Bundle nachgewiesen; im Build 4312 nicht vorhanden | b2/reinraum-ga/ergebnis.txt, b2/reinraum-ga/test.log, b2/reinraum-ga/build.log |
| Server erreichbar (B2 Schritt 2; B3 Abgleich) | 4312 `/` 200, `/kontakt` 200 · 4311 `/` 200, `/kontakt` 200 · 4310 `/` 200 · 4320 `/` 200. Verzeichnisse laut Prozessliste: 4312 = scratchpad/reinraum-f8899dc, 4311 = scratchpad/E2-PRUEF-B2/reinraum-ga-f8899dc. Nicht gestoppt | b2/server/curl.log |
| Funktionstests 4312 (B2 Schritt 3; Gegenprüfung pw.json) | 306 Tests · bestanden 286 · fehlgeschlagen 0 · flaky 0 · übersprungen 20 · Laufzeit 519,6 s. Die 20 Übersprungenen: 4 fixme (funktion-konfigurator, „Weiß nicht“ im Versand und „Nur Treppe“ in der Nutzlast, je mobil und desktop) · 8 Tracking gegen den Platzhalter-Build (Ersatz unten, 4311) · 8 nach Werkzeugbegründung (mobil: Hover-, Tastatur-, Klick-Test des Mega-Menüs und Inhaltsverzeichnis; desktop: Desktop-Navigation nur mobil; mobil: Widget-Doppelklick; desktop: Mobil-Leiste ×2). Keine Wiederholung nötig | b2/funktion/pw.json, b2/funktion/pw-lauf.log |
| Tracking GA-Variante 4311 (B2 Schritt 3) | 8 von 8 bestanden · übersprungen 0 · fehlgeschlagen 0 · flaky 0 · 48,0 s. Schließt die 8 auf 4312 übersprungenen Tracking-Tests ab (nicht übersprungen) | b2/funktion/pw-ga.json, b2/funktion/pw-ga-lauf.log |
| Bildsatz e2-tor-n, `/` und `/kontakt`, m390 · t768 · d1440 (B2 Schritt 4) | 66 Aufnahmen · Fehler 0 · nicht 200: 0 · Überlauf 0 Ansichten (0 Befunde) · Überlappung 0 · Konsole 0 · GRÜN (Werkzeugurteil). Aufnahmen je Seite: `/` d1440 12, m390 12, t768 12 · `/kontakt` d1440 8, m390 12, t768 10. Bilder ≤ 1.440 px. Gegengeprüft: 66 Aufnahmen in bildsatz.json | b2/bildsatz/bildsatz.json, b2/bildsatz/bildsatz-lauf.log, bilder/ (66 JPEG; md5-gleich mit dem Bildsatz 4312) |
| Ersatzpfad e2-tor-n-ersatz (ohne Scroll-Animationen und View Transitions) (B2 Schritt 4) | 66 Aufnahmen · Fehler 0 · nicht 200: 0 · Überlauf 0 · Überlappung 0 · Konsole 0. Nur Zahlen, keine Bilder übernommen | b2/bildsatz-ersatz/bildsatz.json, b2/bildsatz-ersatz/bildsatz-ersatz-lauf.log |
| axe WCAG 2.2 AA auf 4312 (Tags wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa), Zustände normal, Menü m390, Banner m390 und d1440 (B3 Schritt 2) | GRÜN für den Maßstab. `/`: 0 ernste/kritische Knoten in allen 5 Läufen. `/kontakt`: 0 in allen 5 Läufen. Keine Regel, kein Selektor. Zur Kenntnis (nicht Maßstab): 25 Läufe insgesamt 66 Knoten, alle color-contrast (serious): `/bad` 24 (3 Zustände × 8), `/blog` 42 (3 × 14). Der axe-Lauf gegen 4310 aus E2-PRUEF-B2 ist verworfen | b2/axe/axe.json, b2/axe/axe-lauf.log |
| Bewegung register `/` (m390, d1440) (B3 Schritt 3) | m390: data-motion 172 · Kennungen 7 (anriss, aufklappen, auftritt, druck, sig-flucht, sig-kreuzlinie, zustand) · unbekannt 0 · ohne data-motion 0 · Hover 20 geprüft, 0 Fehler · Tab 30 Schritte, 29 mit wechselndem Fokus. d1440: data-motion 172 · dieselben 7 · unbekannt 0 · ohne data-motion 0 · Hover 20/0 · Tab 30, 20 mit wechselndem Fokus | bewegung/register-start-m390/ergebnis.json, bewegung/register-start-d1440/ergebnis.json |
| Bewegung register `/kontakt` (m390, d1440) (B3 Schritt 3) | m390: data-motion 145 · Kennungen 3 (aufklappen, druck, zustand) · unbekannt 0 · ohne data-motion 0 · Hover 20/0 · Tab 30, 5 mit wechselndem Fokus. d1440: data-motion 145 · dieselben 3 · 0 · 0 · Hover 20/0 · Tab 30, 19 mit wechselndem Fokus | bewegung/register-kontakt-m390/ergebnis.json, bewegung/register-kontakt-d1440/ergebnis.json |
| Bewegung reduziert `/` (m390, d1440) (B3 Schritt 3) | Bewegungsbefunde 0 (beide). m390: geprüft 172, unsichtbar 20 (anriss „außerhalb des Dokuments“ 15 · druck „Deckkraft 0.40“ 1 · display none 4: zustand/a, druck/a, aufklappen #mobile-menu, druck #whatsapp). d1440: geprüft 172, unsichtbar 15 (anriss „außerhalb“ 13 · druck „Deckkraft 0.40“ 1 · aufklappen #mobile-menu display none 1) | bewegung/reduziert-start-m390/ergebnis.json, bewegung/reduziert-start-d1440/ergebnis.json |
| Bewegung reduziert `/kontakt` (m390, d1440) (B3 Schritt 3) | Bewegungsbefunde 0 (beide). m390: geprüft 145, unsichtbar 4 (display none). d1440: geprüft 145, unsichtbar 1 (display none) | bewegung/reduziert-kontakt-m390/ergebnis.json, bewegung/reduziert-kontakt-d1440/ergebnis.json |
| Einzelbilder sig-kreuzlinie m390 (Ausschnitt `ansicht`, DPR 2) (B3 Schritt 3) | 5 Bilder bei 0/25/50/75/100 % · 780 × 1688 px · Dauer 1200 ms · Befund leer. md5: Bild 0 34d25ff3…, Bild 1 588bb36a…, **Bild 2 = Bild 3 = Bild 4 = 3239deec… (byte-gleich)** | bewegung/einzel-sig-kreuzlinie-m390/ (ergebnis.json, sig-kreuzlinie-0..4.jpg) |
| Einzelbilder sig-kreuzlinie d1440 (B3 Schritt 3) | 5 Bilder · 1440 × 900 · Dauer 1200 ms · Befund leer. Fünf verschiedene md5. **Bild 0 (ac4de85c…) ist byte-gleich mit Bild 0 von sig-flucht d1440** | bewegung/einzel-sig-kreuzlinie-d1440/ (ergebnis.json, sig-kreuzlinie-0..4.jpg) |
| Einzelbilder sig-flucht d1440 (B3 Schritt 3) | 5 Bilder · 1440 × 900 · Dauer 860 ms · Befund leer · fünf verschiedene md5 | bewegung/einzel-sig-flucht-d1440/ (ergebnis.json, sig-flucht-0..4.jpg) |
| Bildrate m390, 3 Wiederholungen, CPU 4×, DPR 2, Scroll 800 px/s (B3 Schritt 3) | Median verworfene Bilder 0 % (Läufe 0,07 · 0 · 0) · Median Bilder 4258 (4256 · 4258 · 4258) · Median LoAF 0 (Läufe 23 · 0 · 0). Trace vollständig in allen drei Läufen | bewegung/bildrate-start-m390/ergebnis.json |
| Bildrate d1440 | Nicht Teil dieses Pakets und nicht ausgeführt. Das Werkzeug bricht ab (offen seit PRUEFSTUFE-B) | – |
| Szene 4320 `/werkstatt-schaufenster/szene`: register m390 und d1440 (B3 Schritt 4) | Kennungen 4 (aufklappen, druck, szene-ablauf, zustand) · unbekannt 0 · data-motion 79 (beide). m390: ohne data-motion 1 Eintrag (`a.inline-block.py-1`, Transition outline-color, 59 Vorkommen) · Hover 20/0 · Tab 30, 30 mit wechselndem Fokus. d1440: ohne data-motion 2 Einträge (`a.inline-block.py-1` outline-color 15 · `a.text-kalk.underline` outline-color 6) · Hover 20/0 · Tab 30, 25 mit wechselndem Fokus | szene/register-m390/ergebnis.json, szene/register-d1440/ergebnis.json, szene/szene-register-m390.log, szene/szene-register-d1440.log |
| Szene 4320: reduziert m390 und d1440 (B3 Schritt 4) | Bewegungsbefunde 0 (beide). Geprüft 79 (beide). m390: unsichtbar 4 (display none: zustand/a, druck/a, aufklappen #mobile-menu, druck #whatsapp). d1440: unsichtbar 1 (display none: aufklappen #mobile-menu) | szene/reduziert-m390/ergebnis.json, szene/reduziert-d1440/ergebnis.json |
| Szene 4320: Einzelbilder szene-ablauf, d1440 (B3 Schritt 4) | 5 Bilder bei scroll_y 1102 / 1172 / 1243 / 1313 / 1384 · Ausschnitt Element · Modus scroll · alle md5 verschieden. Werkzeug-Befund: „nicht im K-009-Auszug: Scroll-Auslöser angenommen“ (übernommen, wie im Paket vorgesehen) | szene/einzel-szene-ablauf-d1440/ (ergebnis.json, szene-ablauf-0..4.jpg) |
| Szene 4320: Bildsatz e3-szene, `/werkstatt-schaufenster/szene`, m390 · t768 · d1440 (B3 Schritt 4) | 19 Aufnahmen (m390 9 · t768 6 · d1440 4) · Fehler 0 · nicht 200: 0 · Überlauf 0 · Überlappung 0 · Konsole 0 · GRÜN (Werkzeugurteil) | szene/bildsatz.json, szene/bildsatz-szene.log; Bilder: szene/bildsatz-d1440-00.jpg, -01.jpg, -02.jpg; szene/bildsatz-m390-00.jpg, -01.jpg |
| Szene 4320: Ersatzpfad e3-szene (nur Zahlen) (B3 Schritt 4) | 19 Aufnahmen · Fehler 0 · nicht 200: 0 · Überlauf 0 · Überlappung 0 · Konsole 0 | szene/bildsatz-ersatzpfad.json, szene/bildsatz-szene-ersatz.log |
| Systemwerte: seit 1ad2e45 geänderte Dateien (`werte.mjs --basis 1ad2e45 --arbeitsbaum`) (B3 Schritt 5) | GRÜN für den Maßstab. 20 Dateien · 1445 Klassenvorkommen (242 eindeutig) · **0 Befunde**. Jede der 20 Dateien: 0 Befunde (Liste unter der Tabelle). Nicht erfasst: `src/app/werkstatt-schaufenster/szene/page.dev.tsx` (in der git-Liste 1ad2e45..f8899dc enthalten; durch Ausnahmeliste `src/app/werkstatt-schaufenster/**` ausgenommen) | b2/werte/lauf-1ad2e45.log, b2/werte/2026-10-10T23-02-41-621Z.json, b2/werte/dateien-1ad2e45-f8899dc.txt |
| Systemwerte gesamt, nur zur Information (`--basis 745335f --arbeitsbaum`) | 106 Dateien · 5142 Vorkommen (536 eindeutig) · 713 Befunde in 23 Dateien. Befunde je Art: farbe_ausserhalb 322 · schrift_ausserhalb 186 · abstand_ausserhalb 77 · groesse_ausserhalb 45 · radius_ausserhalb 32 · ohne_css 20 · beliebig 19 · dauer_ausserhalb 9 · dauer_zahl 2 · style_wert 1. Größte Dateien: BadProjektCheck/Zusammenfassung.jsx 98 · beratung/page.jsx 74 · BadanfrageFunnel/Schritt5.jsx 53 | b2/werte/werte-745335f.json, b2/werte/lauf-745335f.log |
| Texte: Vergleich gegen e0, `/` und `/kontakt` (B3 Schritt 6) | Erste Zeile: `{"seiten_mit_abweichung":242,"entfernt":0,"hinzu":151,"meta":0,"seo":0,"spannen_entfernt":75,"spannen_hinzu":95,"spannen_unerlaubt_entfernt":0,"sitemap_entfernt":0,"sitemap_hinzu":0,"robots_geaendert":false,"kaputte_links":0,"ergebnis":"GRÜN"}`. Unerlaubt entfernte Spannen je Seite: `/` 0 · `/kontakt` 0. Entfernte Zeilen: `/` 0 · `/kontakt` 0. Hinzugefügte Zeilen je Seite: `/` 135 (Hauptbereich 124 · Fußbereich 10 · Überschrift 1) · `/kontakt` 16 (Hauptbereich 6 · Fußbereich 10). SEO 0 · Sitemap 163, unverändert · robots.txt unverändert · interne Ziele 58 · kaputte Links 0 | b2/texte/texte-vergleich-gegen-e0.json, b2/texte/vergleich.log, b2/texte/lauf.log, b2/texte/texte-index.json |
| Texte: hinzugefügte Spannen ohne Erlaubtlisten-Eintrag (Werkzeug wertet sie nicht als Befund) | 95 Spannen: `/` 86 (Hauptbereich 79, Fußbereich 7) · `/kontakt` 9 (Hauptbereich 2, Fußbereich 7). Erlaubtliste `_werkstatt/texte-erlaubt.json`: 88 Einträge, davon 48 mit alt und 0 mit neu (OFFENE FRAGE 2) | b2/texte/texte-vergleich-gegen-e0.json (Feld `spannen.*.hinzugefuegt`, `erlaubt: false`) |

## Systemwerte: Liste je Datei (seit 1ad2e45, je 0 Befunde)

1. src/app/bewegung.css
2. src/app/kontakt/page.jsx
3. src/app/page.tsx
4. src/components/common/MobileMenu.jsx
5. src/components/funnels/BadProjektCheck/stile.js
6. src/components/funnels/BadanfrageFunnel/stile.js
7. src/components/funnels/FliesenKonfigurator/OptionGroup.jsx
8. src/components/funnels/FliesenKonfigurator/stile.js
9. src/components/kern/SzeneAblauf.tsx
10. src/components/kern/Verlegeplan.tsx
11. src/components/legal/MapConsentGate.tsx
12. src/components/locations/LocationContact.tsx
13. src/components/maps/ContactPremiumMap.tsx
14. src/components/maps/InteractiveMap.tsx
15. src/components/maps/InteractiveServiceMap.tsx
16. src/components/maps/LocalDominanceMap.tsx
17. src/components/maps/ServiceMapWrapper.tsx
18. src/components/pricing/PricingCalculator.tsx
19. src/components/ui/FinalCTA.tsx
20. src/components/ui/Markenlogos.tsx

## Maßstab E2-PRUEF-B3, nur Werkzeugausgaben

| Maßstab | Stand |
|---|---|
| axe 0 ernste/kritische Knoten auf `/` und `/kontakt` in allen Zuständen | erfüllt: 0 und 0 (je 5 Läufe) |
| Register ohne Einträge „ohne data-motion“ (`/`, `/kontakt`) | erfüllt: 0 und 0 (m390 und d1440) |
| Reduziert: 0 Bewegungsbefunde | erfüllt: `/`, `/kontakt` und Szene 4320 je 0 |
| Textvergleich GRÜN | erfüllt (Werkzeugurteil), mit OFFENE FRAGE 2 |
| werte.mjs 0 Befunde in seit 1ad2e45 geänderten Dateien (Ausnahmeliste gilt) | erfüllt: 20 Dateien, 0 Befunde; eine Datei durch die Ausnahmeliste nicht erfasst (OFFENE FRAGE 1) |
| Funktionstests grün bis auf bekannte fixme | erfüllt: 0 fehlgeschlagen, 4 fixme |
| Tracking gegen 4311 ausgeführt (nicht übersprungen) | erfüllt: 8 von 8 |
| 0 Konsolenfehler; Bildsatz 0 Überlauf/Überlappung in 390/768/1440 | erfüllt: Konsole 0 in 66 + 19 Aufnahmen; Überlauf und Überlappung 0 in m390, t768, d1440 |

## Ausführung und Vermerke

- Der Lauf `bewegung-lauf.sh` aus E2-PRUEF-B2 endete am 10.10.2026 um 22:57 UTC ohne Abbruch (alle Schritte „exit 0“). Er setzte `RELAUNCH_BASE` nicht, übergab aber `--base http://127.0.0.1:4312`. Alle zwölf Ergebnisdateien tragen `base` = 4312. Die Läufe sind vollständig und wurden übernommen, nicht wiederholt.
- Ein erster Lauf `--kennung szene-ablauf --ausschnitt ansicht` (Fehler im Aufruf, Schritt 4 sieht die Option nicht vor) hat fünf Bilder bei Scrollposition 0 erzeugt. Dieser Ordner wurde gelöscht; der Beleg ist die Wiederholung ohne Option.
- Gegenüber PRUEFSTUFE-B (1ad2e45): axe `/kontakt` 10 → 0 Knoten; Register `/kontakt` ohne data-motion 6 → 0.

## OFFENE FRAGEN (nur Feststellungen, nichts behoben)

1. Die Ausnahmeliste `_werkstatt/werkzeuge/werte-regeln.json` (`ausnahmen.dateien`: `src/app/werkstatt-schaufenster/**`) nimmt `src/app/werkstatt-schaufenster/szene/page.dev.tsx` von der Werte-Prüfung aus, obwohl die Datei seit 1ad2e45 geändert ist. Die Entscheidung über die Ausnahme liegt beim Orchestrator.
2. Texte: 151 hinzugefügte Zeilen (`/` 135, `/kontakt` 16) und 95 hinzugefügte Spannen ohne Erlaubtlisten-Eintrag. Das Werkzeug wertet sie nicht als Befund. In `texte-erlaubt.json` gibt es keinen Eintrag mit „neu“; offen bleibt, ob sie als protokollierte Änderungen gelten (vgl. PRUEFSTUFE-B, Frage 3).
3. Tracking: Die 8 Tests auf 4312 sind wegen des Platzhalter-Builds übersprungen. Der Ersatz ist der Lauf auf 4311 (GA-Variante, Test-ID G-TEST000000). Ob das als Nachweis genügt, entscheidet der Orchestrator.
4. Einzelbilder sig-kreuzlinie m390: Bild 2, 3 und 4 sind byte-gleich. In PRUEFSTUFE-B (Stand 1ad2e45) waren Bild 0 = 1 und 3 = 4. Das Werkzeug meldet keinen Befund. Ursache nicht geprüft.
5. Einzelbilder sig-kreuzlinie d1440: Bild 0 ist byte-gleich mit Bild 0 von sig-flucht d1440 (md5 ac4de85c…). Deutung offen.
6. Szene szene-ablauf: Das Werkzeug kennt den Auslöser nicht (Befund „Scroll-Auslöser angenommen“). Die Frames sind bei Scrollpositionen 1102–1384 verschieden, der Auslöser bleibt damit ungeklärt.
7. Dev-Schaufenster (E3-ORCH-01, Prüfstufe A): ohne data-motion sind Transitionen von outline-color an Links ohne Register: d1440 2 Einträge (21 Vorkommen), m390 1 Eintrag (59 Vorkommen). Auf `/` und `/kontakt` sind es 0.
8. Reduziert `/`: „unsichtbar“ enthält anriss „außerhalb des Dokuments“ (m390 15, d1440 13) und druck „Deckkraft 0.40“ (1 je Ansicht). Das Werkzeug zählt das nicht als Befund. Bewertung offen (PRUEFSTUFE-B, Frage 6).
9. Bildrate d1440: nicht Teil dieses Pakets, weiterhin ungeklärt (PRUEFSTUFE-B, Frage 2).
10. Bildbelege: Die Kundenstimmen auf `/` tragen Kürzel wie „Elke S.“. Ob sie auf den Bildern erscheinen, ist nicht geprüft (PRUEFSTUFE-B, Frage 4).
