<!-- Gesichert aus dem Workflow-Protokoll der E0-Erkundung (23.10.2026, nur lesend, Haiku 5.5). Unverändert. -->

GEÄNDERTE DATEIEN:
keine im Repository. Versehentlich außerhalb des Repos angelegt, durch meine Befehle, Verstoß gegen das Schreibverbot: /tmp/x (Dateiliste, nicht leer) und $HOME/.noop (leer). Nicht gelöscht, weil Löschen ebenfalls untersagt ist. Bitte entfernen lassen.

BEFUNDE:

A. Gedankenstriche (Schritt 1)
1. 335 Dateien geprüft; 10 Rechtstextdateien ausgeschlossen (barrierefreiheit, impressum, agb, widerruf, datenschutz; je page und layout). Gesamt 830 Striche: 714 " – ", 102 "–" ohne Leerzeichen, 5 " — ", 9 "—" ohne Leerzeichen. 767 Treffer-Zeilen in 217 Dateien (grep -c).
2. Top 15 (Zeilen): src/lib/metadata.ts 15; src/app/(bestand)/fliesen/verlegemuster/page.jsx 14; treppen/page.jsx 14; fliesen/konfigurator/page.jsx 13; naturstein/marmor-kalkstein/page.jsx 12; untergrund-abdichtung/din-18534/page.jsx 12; balkon-terrasse/stelzlager/page.jsx 11; naturstein/page.jsx 11; treppen/aussentreppe/page.jsx 11; src/config/cities.ts 11; src/lib/formulare/useFliesenKonfigurator.ts 11; fliesen/verlegetechnik/page.jsx 10; karriere/page.jsx 10; schadensanalyse/page.jsx 10; untergrund-abdichtung/page.jsx 10.
3. Startseite (Vorkommen inkl. Kommentare): Einstieg.tsx 6, Ablauf.tsx 4, Grossformat.tsx 2, Fachbereiche.tsx 1, Fachgewerke.tsx 1, Servicegebiet.tsx 1, page.tsx 4. Sichtbar: Einstieg.tsx:81 "Terrassen – millimetergenau", Einstieg.tsx:115 "— Deniz Tezgel, Inhaber", Fachbereiche.tsx:81 "in Hessen – wählen Sie".
4. Uneinheitlich: src/config/company.js:128 "Mo - Fr" (Bindestrich) neben :129 "08:00 – 14:00" und src/shared/config/site.ts:57 "08:00 – 14:00 Uhr".
5. Werkzeug texte.mjs prüft keine Regeln (kein Gedankenstrich-, Lesbarkeits- oder Floskelcheck). Es extrahiert Texte, Meta und JSON-LD je Seite (_werkstatt/werkzeuge/texte.mjs:1-7, 52-119). Es liest texte-erlaubt.json nicht. Der Abgleich dagegen steht in texte-vergleich.mjs:26-29 (ohne --erlaubt leere Liste) und prüft entfernte oder geänderte Textspannen gegen e0 (:13). Der Floskel-Filter ist statisch.mjs:39 (Regel S-13, u. a. "Perfektion", "Premium", "erstklassig").

B. Fachwörter (Schritt 2; Teilwort-Zählung per grep -F, Wortgrenze in Klammern)
1. Verbundabdichtung 114: site.ts:29, :87, :111
2. AIV 9 (\bAIV\b 9): config/services.js:121; untergrund-abdichtung/din-18534/page.jsx:37, :39
3. C2TE 1: components/start/Grossformat.tsx:79. Variante "C2-TE": config/company.js:179, components/pricing/PriceCard.tsx:31
4. S1 16 (\bS1\b 16): Grossformat.tsx:79; components/pricing/pricing.constants.ts:125; PriceCard.tsx:31
5. Stelzlager 81: site.ts:88, :110; components/start/vignetten/Aussen.tsx:4
6. Rutschhemmung 65: PriceCard.tsx:30; pricing.constants.ts:140; config/company.js:207
7. R9 19 / R10 17 / R11 12 (\b): config/posts/rutschfeste-fliesen-r-klassen.js:36-38 (Tabelle); company.js:208
8. Nivelliersystem 17: Grossformat.tsx:48; pricing.constants.ts:52; company.js:159
9. Vakuumhebetechnik 6: Grossformat.tsx:48; company.js:232; preise/page.jsx:117. Schreibweisen: "Vakuum-Hebetechnik" (src/app/(bestand)/page.tsx:140), "Vakuum-Heber" (company.js:159)
10. DIN 18534 160: site.ts:29, :87; page.tsx:135. DIN 18157 4: fliesen/verlegetechnik/page.jsx:34, :41, :97. DIN 18560 0.
11. Fachgewerke 30: components/start/vignetten/index.ts:1; components/start/Fachgewerke.tsx:1, :131
12. Untergrund 274 (\b 207): site.ts:90, :111; components/funnels/FliesenKonfigurator/WhatsAppGeoeffnet.jsx:23
13. Estrich 135 (\b 90): site.ts:90; components/start/vignetten/Untergrund.tsx:4, :17
14. Ausgleichsmasse 4: config/posts/fliesen-fuer-allergiker.js:63; untergrund-abdichtung/ausgleich-gefaelle/page.jsx:85; fliesen/auf-fussbodenheizung/page.jsx:65
15. Entkopplung 45: config/services.js:123; config/topics.js:40; untergrund-abdichtung/page.jsx:29
16. Drainage 2 (Großschreibung): src/app/llms.txt/route.ts:24; preise/page.jsx:153. Kleinschreibung als Schlüssel: balkon-terrasse/page.jsx:59, :67, :75, :85
17. Gefälle 127 (Substring): pricing.constants.ts:43, :64; components/start/vignetten/Bad.tsx:4
18. Feinsteinzeug 136: Fachgewerke.tsx:147; pricing.constants.ts:57, :59
19. Großformat 201 (\b 41): site.ts:29, :85, :108
20. Kuvertschnitt 0. Kapillar 0 (\b 0).
21. Fuge 1129 (\b 273): Treffer überwiegend in Kommentaren und Komponentennamen (Fugenkreuz 355). Stichprobe: ui/FAQAccordion.tsx:27; FliesenKonfigurator/stile.js:12; ui/ReviewsSection.jsx:158
22. Silikonfuge 33: pricing.constants.ts:78; config/posts/schimmel-fliesenfugen-vermeiden.js:18. Epoxidharz 1: leistungen/[id]/page.jsx:136 (nur ein Treffer).
23. Haftbrücke 6: config/services.js:117; fliesen-auf-fliesen/page.jsx:29, :217. Grundierung 16: untergrund-abdichtung/page.jsx:43; estrich-belegreife/page.jsx:50. Dichtband 10: vignetten/Untergrund.tsx:4, :21. Dichtmanschette 12: company.js:163; services.js:122.
24. bodengleich 40: TezgelAnfrageFunnel/Schritt3.jsx:114; company.js:237. barrierefrei 107 (Substring): site.ts:29; BadProjektCheck/Zusammenfassung.jsx:96. barrierearm 1: bad/barrierefreies-bad/page.jsx:59.
25. Duschrinne 29: vignetten/Bad.tsx:21; rutschfeste-fliesen-r-klassen.js:76. Punktablauf 12: config/posts/duschrinne-oder-punktablauf.js:1, :6. Vorwand 41: services.js:18, :25; duschrinne-oder-punktablauf.js:28.
26. Trockenbau 4: services.js:18; musterbaeder.js:108; bad/badsanierung/page.jsx:38. Gehrung 36: Grossformat.tsx:79; pricing.constants.ts:45; config/navigation.js:50. Schlüter 2: company.js:249; partner/page.jsx:24. Mosaik 29: site.ts:84; company.js:60, :69.
27. Naturstein 192 (\b 152): site.ts:89, :112; FliesenKonfigurator/Schritt3.jsx:262. Imprägnierung 24: posts/feinsteinzeug-oder-naturstein-vergleich.js:48, :50, :78. Frost 58: pricing.constants.ts:64; navigation.js:52; services.js:76. Ausblühung 7: schadensanalyse/page.jsx:47, :77; balkon-terrasse/page.jsx:47.
28. Weitere Fachwörter (Anzahl, Substring): Verlegemuster 47; Fußbodenheizung 51; Belegreife 43; Restfeuchte 39; Walk-In 64; Mörtelbett 24; Fugenachse 26; Fugenraster 20; Dünnbett 19; Passstück 19; EN 16165 19; Nische 29; Überzähne 17; Schwelle 14; Blockstufe 14; Pflegegrad 13; CM-Messung 13; Calciumsulfat 12; Klopfprobe 11; Mittelbett 11; Heizestrich 11; Randfuge 10; Zementestrich 10; Diagonal 10; Sinterschicht 6; Rissverharzung 6; Buttering 5; Kleberklasse 4; DIN 18040 15; Sanierung 45; Feuchtigkeit 32.

C. Bindestrichketten (Schritt 3; Top-Liste ohne CSS-Klassen und Codes, Vorkommen)
Vor-Ort-Aufmaß 132 · Lahn-Dill-Kreis 29 · Walk-In-Duschen 22 · Walk-In-Dusche 22 · Vor-Ort-Termin 17 · Wand-Tiefspül-WC 10 · E-Mail-Adresse 10 · 1-px-Fugen 10 · 2-cm-Keramikplatten 7 · Vor-Ort-Aufmaßes 6 · 2-cm-Platten 6 · 2-cm-Feinsteinzeug 6 · Vor-Ort-Beratung 4 · E-Mail-Bestätigung 4 · 2-Mengen-Spülung 4 · Vor-Ort-Termine 3 · Walk-in-Duschen 3 · Frost-Tau-Wechsel 3. Nicht Prosa, aber in der Top-40: E4-NACH-01 (14), 2026-09-24T08 (13), E3-SICHT-ERZ (9). CSS-Klassen dominieren (text-tinte-2 507, text-fs-2 416, max-w-mass 245).

D. Floskeln (Schritt 4; grep -i, Vorkommen, Fundstellen)
1. nahtlos 1: hooks/useConsent.ts:55 (Kommentar). ganzheitlich 0. Ihr Partner für 0. Experte 0. rundum sorglos 0.
2. maßgeschneidert 2: bad/badanfrage/page.jsx:38; leistungen/[id]/page.jsx:69
3. Entdecken Sie 3: bad/musterbaeder/page.jsx:43; bad/musterbaeder/[slug]/page.jsx:90
4. höchste Qualität 1: partner/page.jsx:24. Perfektion 4: components/start/Einstieg.tsx:25 (H1); config/company.js:141
5. von A bis Z 1: bad/bad-aus-einer-hand/page.jsx:38. nicht nur 1: funnels/BadanfrageFunnel/Schritt5.jsx:13 (Kommentar)
6. Premium 37 (Substring, davon Komponentennamen): config/company.js:179 "Premium-Fugenmassen"; config/musterbaeder.js:245
7. Leidenschaft 1: (bestand)/team/page.jsx:41 "Kompetenz & Leidenschaft"
8. individuell 23: components/common/CookieConsent.tsx:153; pricing/PricingCalculator.tsx:283
9. professionell 13: config/reviews.js:76, :100 (Kundenzitate, nicht Eigentext)
10. hochwertig 18: config/company.js:178; config/services.js:65
11. erstklassig 1: leistungen/[id]/[stadt]/page.tsx:58. zuverlässig 11: config/reviews.js:100 (Kundenzitat)
12. Zusätzlich: Qualität 92 (sections/QualityPromise.jsx:23); Fachbetrieb 251 (site.ts:29; config/site.js:7); unverbindlich 35 (locations/LocationContact.tsx:46); persönlich 78 (ui/FinalCTA.tsx:131); Jetzt 79 (FinalCTA.tsx:57); Traum 25 (BadanfrageFunnel/index.jsx:88); Kompetenz 16 (leistungen/detail/Fachdetails.tsx:73); Präzision 14 (ueber-uns/Betrieb.tsx:17; start/Grossformat.tsx:48); Schritt für Schritt 8 (config/navigation.js:27).

E. Startseite, sichtbare Texte (Schritt 5; Quelle src/app/(bestand)/page.tsx:50-112 und Komponenten)
Vertrauenszeile (components/trust/TrustStrip.tsx): „Aßlar & Wetzlar regional vor Ort“ · „Eingetragener HWK Wiesbaden Fachbetrieb“ · „DIN 18534 Verbundabdichtung“ · „XXL-Großformat Nivelliertechnik“ · „Staubschutz & Sauberkeits-Garantie“ · „Verbindliche Festpreis-Kalkulation“ · Kennwertfeld „5,0 von 5“ / „27 Google-Rezensionen“ (GoogleReviewsBadge.tsx:36-38).

Abschnitt 1, Einstieg (Einstieg.tsx):
- Kennzeile: „Handwerkskammer-eingetragener Fachbetrieb Deniz Tezgel“ (:54); „5,0 (27 Bewertungen)“ (:59)
- H1: „Perfektion / auf jedem / Quadratmeter.“; Unterzeile „Fliesenverlegung & Badsanierung aus Aßlar“ (:25, :72)
- Absatz (:80-83): „Fugenarme XXL-Großformatfliesen, barrierefreie Walk-in-Duschen, repräsentative Wohnbereiche und frostsichere Terrassen – millimetergenau verlegt, normgerecht abgedichtet nach DIN 18534 und mit Staubschutzgarantie im bewohnten Zuhause.“
- Knöpfe: „Aufmaß vor Ort anfragen“; „Per WhatsApp schreiben“; Telefonnummer (Wert aus config/company.js)
- Zusagen: „Kostenloses Aufmaß vor Ort“ · „Staubschutzgarantie“ · „Verbindlicher Festpreis“ (:26)
- Zitat: „Die Zufriedenheit unserer Kunden ist die beste Reklame für uns.“ — Deniz Tezgel, Inhaber (company.js:65; :114-115)

Abschnitt 2, Garantien (src/app/(bestand)/page.tsx:63-75; company.js:133-149):
- Etiketten: „Normgerechte Sicherheit“ · „Fachgerechte Ausführung“ · „Wohnkomfort bei Sanierung“
- „Normgerechte Verbundabdichtung (DIN 18534)“: „Normgerechte Abdichtung im Verbund für Walk-In-Duschen, Nassbereiche und Terrassen. Lückenloser Schutz vor Feuchtigkeitsschäden.“
- „Eingetragener HWK-Wiesbaden Fachbetrieb“: „Handwerkliche Perfektion, geprüfte Standards und fachgerechte Präzision bei Großformaten, Schnittbildern und Fugenachsen.“
- „Staubschutz & Sauberkeitsversprechen“: „Einsatz moderner Staubschutztüren, Luftreiniger und Schutzabdeckungen. Wir hinterlassen Ihr Objekt besenrein.“

Abschnitt 3, Fachbereiche (Fachbereiche.tsx; src/lib/start/daten.ts:19-64):
- Etikett „Fachbereiche & Planungshilfen“; H2 „Alles für Ihr Vorhaben auf über 100 Fachseiten“; Einleitung „Von der schlüsselfertigen Badsanierung über nützliche Planungshilfen bis zu den Standorten in Hessen – wählen Sie Ihren Themenbereich.“
- Karte „Komplettbäder / Badsanierung & Wellness“ · Knopf „Zur Bad-Übersicht“
- Karte „Planungshilfen / Rechner & Planung“ · Knopf „Projektcheck starten“
- Karte „Standorte Hessen / 14 Städte & Regionen“ · Knopf „Alle Standorte“
- Karte „Referenzen & Wissen / Bewertungen & Ratgeber“ · Knopf „Zu den Bewertungen“
- Register „Fachthemen im Detail“: 6 Themen (config/topics.js).

F. Konsistenz (Befunde mit Fundstellen)
1. HWK-Angabe, dreifach auf der Startseite: „Handwerkskammer-eingetragener Fachbetrieb“ (Einstieg.tsx:54), „HWK Wiesbaden“ (TrustStrip.tsx), „HWK-Wiesbaden“ (company.js:140). Gesamt: HWK-Fachbetrieb 12, HWK Wiesbaden 10, HWK Fachbetrieb 5, Handwerkskammer-eingetragener 2, HWK-Wiesbaden 1.
2. Staubschutz: „Staubschutzgarantie“ (Einstieg.tsx:26), „Sauberkeits-Garantie“ (TrustStrip.tsx), „Sauberkeitsversprechen“ (company.js:145).
3. Bewertungen: „(27 Bewertungen)“ (Einstieg.tsx:59), „Google-Rezensionen“ (GoogleReviewsBadge.tsx:38), „27 Rezensionen“ (TrustStrip).
4. Walk-in-: Einstieg.tsx:80 und lib/start/daten.ts:23 gegen „Walk-In-“ in 28 Dateien.
5. Sonderfall: src/app/(bestand)/standorte/[stadt]/page.tsx:74-77 setzt für Bad Nauheim einen eigenen Titel.
6. Dateien src/app/(bestand)/werkstatt-schaufenster/*/page.dev.tsx (6 Stück) enthalten deutschen Text. Routbar nur bei NODE_ENV=development (next.config.ts:12).

G. Satzlänge (Schritt 7; Wörter je Satz, Bindestrichwörter als ein Wort, Gedankenstrich entfernt, wc-Methode)
- Startseite: 10 Sätze aus Einstieg, Garantien, Fachbereiche, FAQ. Summe 117, Mittel 11,7 (Spanne 4-22).
- Ortsseite: 9 Sätze aus cities.ts (Gießen, Wetzlar, Marburg, Limburg, Bad Nauheim, Friedberg) und der Gießen-Vorspann. Summe 168, Mittel 18,7 (Spanne 8-27). Nur 9 Sätze gefunden.

PRÜFUNG UND ERGEBNIS:
- Dateiliste: find über src mit sieben Endungen ergab 345 Dateien; abzüglich 10 Rechtstextdateien blieben 335.
- Striche: grep -c (Zeilen) und grep -o (Vorkommen). Erste Zählung hatte eine Lücke bei Gedankenstrichen ohne Leerzeichen; nachgezählt (14 gesamt, davon 9 ohne Leerzeichen).
- Fachwörter: 52 aus dem Auftrag plus 40 zusätzlich. Kurze Begriffe zusätzlich mit Wortgrenze (grep -P \b). Zusätzliche Begriffe aus Stichproben-Treffern, nicht aus vollständigem Lesen aller Seiten.
- Bindestrichketten: grep -E über src/app, config, components, lib, shared; Tailwind-Klassen und Kleinbuchstaben-Slugs ausgefiltert. Ergebnis: 3723 Tokens mit Großbuchstabe oder Ziffer, darunter Codes.
- Floskeln: 18 aus dem Auftrag plus 9 zusätzlich. Kommentartreffer nicht getrennt ausgefiltert; Fundstellen sind entsprechend markiert.
- Startseite vollständig gelesen: page.tsx (178 Zeilen), Einstieg.tsx (151), Fachbereiche.tsx (144), TrustStrip.tsx, reviews.js (RATING_SUMMARY), daten.ts (PORTAL_HUBS), company.js (Zeilen 14, 65, 133-149), GoogleReviewsBadge.tsx (18-38).
- Nicht gelesen: HeroContactForm (Formulartexte), Verlegeplan-Beschriftungen, Abschnitte Fachgewerke, Ablauf, Grossformat, Stimmen, Servicegebiet.
- texte.mjs vollständig gelesen (145 Zeilen). texte-vergleich.mjs und statisch.mjs per grep und Ausschnitt geprüft.
- Keine Netzwerkzugriffe, kein Build, kein git.

BILDBELEGE: keine

GEMEINSAME DATEIEN:
1. src/components/start/Einstieg.tsx:80 "Walk-in-Duschen" gegen "Walk-In-" im Rest des Projekts (28 Dateien). Gleiche Abweichung in src/lib/start/daten.ts:23.
2. src/config/company.js:140 "HWK-Wiesbaden" gegen "HWK Wiesbaden" in src/components/trust/TrustStrip.tsx. Schreibweise angleichen.
3. src/config/company.js:145 "Sauberkeitsversprechen" gegen "Sauberkeits-Garantie" (TrustStrip.tsx) und "Staubschutzgarantie" (Einstieg.tsx:26). Begriff vereinheitlichen, nur nach Freigabe.
4. src/config/company.js:128 "Mo - Fr" mit Bindestrich, :129 und src/shared/config/site.ts:57 mit Gedankenstrich bei Uhrzeiten.
5. src/components/start/Einstieg.tsx:115 Gedankenstrich vor der Autorenzeile; :81 und Fachbereiche.tsx:81 Gedankenstrich im Fließtext.
6. src/app/(bestand)/standorte/[stadt]/page.tsx:74-77 Sonderfall-Titel für Bad Nauheim.

OFFENE FRAGEN:
1. Ist "HWK Wiesbaden" als zuständige Handwerkskammer für Aßlar richtig? Nicht geprüft, außerhalb des Repos.
2. Ist "Garantie" (Staubschutzgarantie, Sauberkeits-Garantie) eine rechtlich gewollte Zusage oder ein Werbebegriff? Dem Inhaber vorzulegen, nicht bewertet.
3. Wortfamilie "Profi" (85 Substring-Treffer) nicht ausgewertet; "über 100 Fachseiten" nicht gezählt.
4. Gedankenstrich-Zahlen enthalten Kommentare und Code (z. B. Einstieg.tsx:3). Die Zahl nur für sichtbaren Text ist nicht ermittelt.
5. Satzlänge: Stichprobe, keine automatische Satzzerlegung. Ortsseite nur N=9, nicht gerendert.
6. Glossar (K-011): ob Fachwörter auf den Unterseiten erklärt werden, nicht gelesen.
7. Fuge: die drei Stichprobentreffer sind Kommentare; sichtbare Verwendung nicht ermittelt. "barrierefrei" nur 2 Fundstellen angegeben. Epoxidharz nur 1 Treffer.
8. HeroContactForm und Verlegeplan-Beschriftungen nicht gelesen; Abschnitte 4 bis 12 der Startseite nicht gelesen.

=== ENDE E0-KUND-09 · BEREIT ZUR RÜCKGABE ===
