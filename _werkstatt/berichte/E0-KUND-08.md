<!-- Gesichert aus dem Workflow-Protokoll der E0-Erkundung (23.10.2026, nur lesend, Haiku 5.5). Unverändert. -->

GEÄNDERTE DATEIEN: keine

BEFUNDE:

**Firmendaten**
1. Firmenname "Fliesenverlegung Tezgel", Inhaber Deniz Tezgel ("Inhaber & Fachbetriebsleiter"): `src/config/company.js:8`, `:14`; `src/shared/config/site.ts` (Block `founder`, Zeile 75 ff.).
2. Anschrift Hohwardstraße 14, 35614 Aßlar, Hessen: `src/config/company.js:24`; `src/lib/config.ts:131` ff.; Impressum `src/app/(bestand)/impressum/page.jsx:33`–`35`.
3. Telefon 06441 / 44 83 567, Mobil/WhatsApp 0172 / 67 28 504, Fax 06441 / 44 83 548, E-Mail info@tezgel.de: `src/config/company.js:25`, `:27`, `:32`; `src/shared/config/site.ts:44`–`47`. Nur diese eine Firmen-Mailadresse im Bestand (10 Treffer); die übrigen Adressen sind Platzhalter oder die Schlichtungsstelle.
4. Umsatzsteuer-ID vorhanden: `src/config/company.js:49`; Anzeige `impressum/page.jsx:55`. Steuernummer nicht vorhanden: `company.js:50` nennt nur "FA Wetzlar" (Finanzamt, keine Nummer).
5. Rechtsform: nicht im Bestand (Grep auf Einzelunternehmen, GmbH, e.K., Rechtsform ohne Treffer).
6. Handwerkskammer-Eintragung: "Eingetragener Handwerksbetrieb bei der Handwerkskammer Wiesbaden" (`company.js:52`); Kammeradresse Bierstadter Straße 45, 65189 Wiesbaden fest im Seitencode (`impressum/page.jsx:63`), nicht in der Konfiguration.
7. Meisterbrief: kein Nachweis im Bestand. Die Bezeichnung "Meister-Erfahrung" steht nur in `src/lib/maps/getMapEmbedUrl.ts:92`.
8. Gründung 2008: `company.js:95`; `src/shared/config/site.ts:34`; `src/lib/config.ts:128`. Chronik `company.js:225` (2008), `:230` (2014, Großformat-Technik), `:235` (2019, DIN 18534 als Standard).
9. Mitarbeitende, Widerspruch: "5" (`site.ts:38`, numberOfEmployees); "bis zu 12 Fachkräfte" (`src/components/ueber-uns/Kennzahlen.tsx:21`, `ueber-uns/page.jsx:32`, `unternehmen/page.jsx:49` und `:129`, `components/ueber-uns/Betrieb.tsx:25`); zwei Team-Einträge (`company.js:219`–`220`, `src/config/team.js`).
10. Öffnungszeiten, widersprüchlich: `company.js:121`–`125` (Fr 17:00), `company.js:128` formattedWeekdays "Mo - Fr: 07:30 – 18:00"; `site.ts:53`–`56` (Fr 17:00); `src/lib/config.ts:174` "Mo - Fr: 07:30 – 18:00". Sa 08:00–14:00 nur nach Vereinbarung (`company.js:126`).
11. Ausstellung Wetzlar und Gießen, "Nach Terminvereinbarung" (`ausstellung/wetzlar/page.jsx:74`, `:130`; `ausstellung/giessen/page.jsx:74`). Keine Adresse im Bestand (Grep auf Straße ohne Treffer).
12. Marken: Schlüter-Systems, Ardex, Sopro, PCI, Marazzi, Villeroy & Boch (`company.js:248`–`254`). Kommentar `company.js:246`–`247`: "ohne Partnerstatus – bitte vom Inhaber bestätigen lassen". Die Seite spricht dennoch von "führenden Materialpartnern" und "zertifizierten Verlegesystemen" (`partner/page.jsx:62`).

**Bewertungen**
13. Google 5,0 aus 27 Rezensionen (`src/config/reviews.js:12`–`17`). Trustlocal 9,6/10 aus 25 (`reviews.js:19`–`24`). Die Trustlocal-Zahl wird im Bestand nicht durch ein Zitat belegt.
14. Die 27 erscheinen in `navigation.js:111`, `components/ui/FinalCTA.tsx:58`, `components/maps/LocalDominanceMap.tsx:41`, `lib/schema.ts:277` (aggregateRating reviewCount '27'), `app/llms.txt/route.ts:43` ("27 verifizierte Kundenstimmen").
15. Zitate: 16 Einträge, alle mit Quelle "Google" (`reviews.js:31`–`151`), gegenüber der Aussage "27 Kundenstimmen". Die ersten drei wörtlich: Elke S. (`reviews.js:31`): "Die Fa.Tezgel hat uns im Bad neue Fliesen verlegt.Wir können diese Firma uneingeschränkt und wärmstens empfehlen.Handwerklich perfekt, saubere u.präzise …". C. W. (`:39`): "Die Firma Tezgel hat für mich zwei Bäder saniert. Als einziges der Gewerke wurden die Arbeiten von der Firma Tezgel ordnungsgemäß, sauber und pünktlich …". Rabia Ö. (`:47`): "Wir haben unser gesamtes Haus von der Firma Fliesenverlegung Tezgel verlegen lassen – und sind rundum zufrieden. Vom ersten Tag an lief alles absolut …".
16. Abweichung zum Wortlaut: `src/lib/schema.ts:312` (C. W.) schreibt "…Arbeiten ordnungsgemäß, sauber und pünktlich abgeschlossen." ohne "von der Firma Tezgel" und ergänzt "abgeschlossen". Im selben Array (`schema.ts`, ca. Zeilen 296–330) steht für Rabia Ö. "…lief alles absolut verlässlich." und für Elke S. "Die Fa. Tezgel … saubere u. präzise Ausführung." Die Quelle `reviews.js` verbietet Umformulierungen. JSON-LD-Reviews mit Datum (2024) sind im Repo nicht belegt.
17. Anrisse: 16 Einträge in `src/lib/stimmen.ts:10`–`25`, je ein Anriss-Wort, jeweils im Zitat enthalten.

**Einsatzgebiet**
18. Einsatzradius 45 km: `getMapEmbedUrl.ts:35`; Anzeige `components/start/Servicegebiet.tsx:28`, `components/maps/InteractiveServiceMap.tsx:225`. Zonen ≤10/≤25/≤50 km: `src/lib/einzugszonen.ts:15` und Nachbarzeilen.
19. Widerspruch Radius: laut `_werkstatt/MENSCHEN.md:30` (M-25) steht in TEXTVORSCHLAEGE "Radius ca. 25 km". Im Quelltext nicht gegengeprüft.
20. Ortsliste: 13 Einträge in `src/config/cities.ts` (Wetzlar bei Zeile 13 mit distanceKm 0; Aßlar mit 5). 13 Einträge in `getMapEmbedUrl.ts` (CITY_HUB_DATA, Aßlar 0 bei Zeile 86, Wetzlar 5 bei Zeile 98). Die Werte stimmen außer Aßlar/Wetzlar überein; `cities.ts`-Kommentar sagt "ab Wetzlar", der Hub "ab Aßlar".
21. Zwei Serviceliste ohne Deckung: `company.js:79`–`93` (14 Einträge, u. a. Ehringshausen `:90`, Hüttenberg `:91`, Lahnau `:92`) und `site.ts:117`ff. (18 Einträge, u. a. Marburg `:122`, Limburg, Bad Nauheim, Friedberg, Butzbach, Lahnau `:132`, Hüttenberg `:133`). Ehringshausen fehlt in `site.ts` und `cities.ts`.
22. Fahrzeit-Formel `getMapEmbedUrl.ts:68`ff.: Wetzlar 5 km ergibt "ca. 10 Min.". Laut MENSCHEN M-25 stehen auf Seiten zusätzlich "ca. 8 Min." (nicht im Quelltext nachgeprüft).

**Leistungen**
23. Vier Hauptgruppen in `src/config/services.js`: Bäder & Wellness (`:6`, Unterpunkte `:15`–`18`: Walk-In, XXL, Nischen, Trockenbau); Wohnbereiche & Neubau (`:41`, `:50`–`53`: Feinsteinzeug, Treppen, Küchen/Dielen, Naturstein); Balkon & Terrasse (`:74`, `:83`–`85`: Stelzlager, Gefälle, Abdichtung); Untergrund & DIN 18534 (`:105`, `:114`–`117`: Abdichtung, Rückbau, Estrich/Ausgleich, Rissverharzung).
24. Weitere Leistungen: Fachthemen in `src/config/topics.js:9`–`86` (Naturstein/Granit `:58`–`64`, Treppen `:69`–`76`, Service: Schadensanalyse, Fliesenreparatur `:81`–`86`); Preislogik `src/components/pricing/pricing.constants.ts` (6 Leistungsarten: bad, grossformat, wohnbereich, balkon, abdichtung, reparatur).
25. Maßwiderspruch Großformat: `services.js:23` "bis 120 x 278 cm" gegen `pricing.constants.ts:52` "Fliesenformate bis 120x260 cm".
26. Gefälle: `services.js:91` "mind. 1,5 bis 2 %".
27. Musterbäder: 12 Varianten, 4 Raumgrößen 4,6–15,9 m², 3 Stufen (`src/config/musterbaeder.js:4`; `bad/page.jsx:68`).

**Zahlen und Behauptungen**
28. "Über 15 Jahre Praxiserfahrung" (`ueber-uns/page.jsx:59`). Gründung 2008 ergibt 18 Jahre im Jahr 2026. Keine Zahl ist widersprüchlich, aber sie stammen aus verschiedenen Angaben.
29. Keine öffentlichen Preise: vier PriceCards mit `price="Auf Anfrage"` (`preise/page.jsx:94`, `:111`, `:129`, `:146`); `pricing.constants.ts:5`. Widerspruch: `bad/musterbaeder/page.jsx:112` "Alle Preise sind Richtwerte", während `musterbaeder.js:2` "bewusst ohne Preisangaben" sagt.
30. `src/lib/config.ts:167` baseEstimateSquareMeter: 45 (Einheit unbekannt, im Bestand keine Verwendung gefunden).
31. Pflegekassen-Zuschuss "bis zu 4.180 € pro Person": `foerderung/page.jsx:28`, `:127`; `bad/page.jsx:66`; `bad/barrierefreies-bad/page.jsx:91`; `faq/page.jsx:46`. KfW 159: `foerderung/page.jsx:46`. Nicht gegen Gesetz geprüft (kein Netzwerk).
32. Handwerkerbonus "20 %, bis zu 1.200 € pro Jahr": `preise/page.jsx:219`; Höchstbetrag 6.000 € in `src/config/posts/handwerkerbonus-fliesenarbeiten.js:37`.
33. Referenzen: 6 Projekte, alle `placeholder: true` (`src/config/projects.js:13`, `:29`, `:44`, `:59`, `:74`, `:90`). Die Seite nennt "Echte Referenzen & Bewertungen" (`referenzen/page.jsx:70`).
34. Dauer einer Badsanierung: keine Angabe im Bestand (Grep Dauer/Wochen/Tage in Bad-Seiten ohne Befund).
35. Zertifikate: Badge "Zertifiziert" bei der Abdichtung (`pricing.constants.ts:72`), "Zertifizierte Abdichtung" (`llms.txt/route.ts:23`), Kleber "C2-TE-S1/S2" (`company.js:179`). Keine Zertifikatsnummer und keine Auszeichnung im Bestand.
36. Anfahrt "0 € in Aßlar, Wetzlar & nahem Umland" (`src/lib/config.ts:171`); für andere Orte keine Angabe.

**Versprechen mit rechtlicher Bindung** (Grep-Gesamt: 249 Zeilen; Auswahl nach Gewicht)
37. Rückruffristen: `components/forms/HeroContactForm.tsx:73` "innerhalb von 24 Stunden", `:99` "Rückruf < 24h"; `components/forms/LeadQuickForm.tsx:63`, `:131`; `components/ui/FinalCTA.tsx:131`; `standorte/[stadt]/page.tsx:342`. Gegenteilig: `components/funnels/FliesenKonfigurator/Erfolg.jsx:50` "binnen 24 bis 48 Stunden"; `components/funnels/TezgelAnfrageFunnel/Erfolg.jsx:38` "binnen 24 bis 48 Stunden"; `components/funnels/BadProjektCheck/Zusammenfassung.jsx:146` "binnen 24–48 Std.".
38. Festpreisgarantie: `preise/page.jsx:48`, `:179`; Textzeile `:181` "Der vereinbarte Preis ist garantiert. Es gibt bei uns keine nachträglichen Überraschungen"; `faq/page.jsx:63` "verbindliches Festpreisangebot ohne versteckte Zusatzkosten"; `components/common/Footer.jsx:30`; `app/llms.txt/route.ts:45` "ohne versteckte Nachforderungen"; `bad/badsanierung/page.jsx:36`; `bad/musterbaeder/[slug]/page.jsx:169`; `getMapEmbedUrl.ts:128`.
39. Gegenstück AGB: `agb/page.jsx:52` (§ 2 Abs. 3): Mehrleistungen bei Sonderwünschen oder unvorhersehbaren bauseitigen Hindernissen werden gesondert vergütet.
40. Staubschutz-Garantie: `components/common/Footer.jsx:29`; `components/ui/FinalCTA.tsx:40`; `components/start/Einstieg.tsx:26`; `app/(bestand)/bad/page.jsx:72`; `app/llms.txt/route.ts:46`; `company.js:174`, `:191`; `src/lib/config.ts:195`; `fliesen/page.jsx:338`; `components/trust/TrustStrip.tsx:17`.
41. Termin: `company.js:170`–`171` "Feste Zusagen für Baustart und Fertigstellung"; AGB § 3 Abs. 1 `agb/page.jsx:59` ("Ausführungsfristen sind verbindlich, sofern … schriftlich fixiert").
42. Gewährleistung: `agb/page.jsx:72` (5 Jahre BGB für Bauwerke, 2 Jahre für Wartung und Reparatur).
43. Absolute Aussagen: `components/contact/BookingCalendar.tsx:285` "100% kostenfrei & unverbindlich"; `components/forms/HeroContactForm.tsx:254` "100 % unverbindlich"; `components/sections/QualityPromise.jsx:22` "Garantierter Standard"; `src/config/navigation.js:36` "Dicht. Sauber. Termintreu.".
44. Schiedsstelle: `barrierefreiheit/page.jsx:90` "innerhalb von sechs Wochen".
45. Sachverständiger: `schadensanalyse/page.jsx:92` (öffentlich bestellt und vereidigt; "Wir erstellen keine Gutachten").

**Ablauf**
46. Drei Schritte: `company.js:199` (01 Planung & Aufmaß vor Ort), `:205` (02 Material & Fugenbild), `:211` (03 Ausführung & Abnahme); Anzeige `components/start/Ablauf.tsx:26` "In 3 Schritten zu Ihrem neuen Belag", `:29` "keine versteckten Kosten".
47. Konfigurator: 4 Schritte (`navigation.js:71`; `components/funnels/FliesenKonfigurator/index.jsx:134`). Badanfrage: 5 Schritte (`bad/badanfrage/page.jsx:38`; `src/lib/formulare/useBadanfrage.ts:44`).
48. Vor-Ort-Termin kostenlos: `company.js:154`; `src/lib/config.ts:166` "0 €"; `components/pricing/PricingCalculator.tsx:310`.

**Abgleich mit MENSCHEN-Dateien**
49. Als unbestätigt markiert: Öffnungszeiten, Bewertungszahlen (5,0/27 und 9,6/25), Erfahrungsjahre, Förderbeträge, Stellenangebote (`_werkstatt/MENSCHEN.md:8`, M-03; `_relaunch/MENSCHEN.md:9`, M-03); Öffnungszeiten (`_werkstatt/MENSCHEN.md:25`, M-20; `_relaunch/MENSCHEN.md:34`, WM-20); Radius, Anfahrt, Großformat-Maß (`_werkstatt/MENSCHEN.md:30`, M-25); Wetzlar als HQ (`_werkstatt/MENSCHEN.md:22`, M-17); Partnerstatus (`_relaunch/MENSCHEN.md:38`, M-22); Kundennamen (`_werkstatt/MENSCHEN.md:10`, M-05; `_relaunch/MENSCHEN.md:19`, M-12); Referenzen-Platzhalter (`_werkstatt/MENSCHEN.md:9`, M-04); Widerruf ohne Frist (`_relaunch/MENSCHEN.md:39`, M-23).
50. Nicht in den MENSCHEN-Dateien markiert, aber im Bestand widersprüchlich: 24 h gegen 24–48 h; Mitarbeitende 5 gegen 12; Festpreis "ohne Zusatzkosten" gegen AGB § 2 Abs. 3; Radius 45 km gegen 25 km.

GEMEINSAME DATEIEN:
- `src/lib/schema.ts` (ca. 296–330): reviewBody-Texte weichen von `src/config/reviews.js` ab (C. W. bei Zeile 312; Elke S.; Rabia Ö.).
- `src/shared/config/site.ts:38` (5 Mitarbeitende) gegen `src/components/ueber-uns/Kennzahlen.tsx:21` (bis zu 12).
- `src/config/company.js:128` (Fr bis 18:00) gegen `company.js:125` (Fr 17:00).
- `src/shared/config/site.ts:37` ("Überweisung, Bar") gegen `src/lib/config.ts:179` ("Überweisung, Rechnung, Barzahlung").
- `src/config/cities.ts:13` (Wetzlar 0) gegen `getMapEmbedUrl.ts:86`/`:98` (Aßlar 0, Wetzlar 5).
- `src/app/(bestand)/bad/musterbaeder/page.jsx:112` behauptet Preise, `src/config/musterbaeder.js:2` enthält keine.
- `src/config/services.js:23` (278 cm) gegen `src/components/pricing/pricing.constants.ts:52` (260 cm).
- `src/app/(bestand)/referenzen/page.jsx:70` ("Echte Referenzen") gegen `src/config/projects.js` (6 Platzhalter).

PRÜFUNG UND ERGEBNIS:
- Gelesen vollständig: `src/config/company.js`, `src/config/team.js`, `src/config/reviews.js`, `src/lib/stimmen.ts`, `src/config/cities.ts`, `src/lib/einzugszonen.ts`, `src/config/services.js`, `src/config/navigation.js`, `src/components/pricing/pricing.constants.ts`, `src/lib/config.ts`, `src/shared/config/site.ts`, `src/lib/data/company.ts`, `src/lib/maps/getMapEmbedUrl.ts` (Hub-Daten und Radius), `impressum/page.jsx`, `agb/page.jsx` (§ 2–4), `ueber-uns/Kennzahlen.tsx`, Kopf von `projects.js`, beide MENSCHEN.md.
- Gezielt geprüft: Impressum, Über uns, Unternehmen, Team, Kontakt, Standorte, Ausstellung, Partner, Preise, Förderung, Widerruf, Karriere (per Grep und Ausschnitt, nicht vollständig gelesen).
- Grep `grep -rniE 'garantie|festpreis|24 stunden|24h|innerhalb von|binnen|kostenlos|unverbindlich|gewährleistung|termintreu' src`: 249 Zeilen; oben nach Gewicht ausgewählt.
- Zahlen-Grep (Jahre, €, Minuten, Tage, Wochen, Förder, Zertifi, Auszeichn): Ergebnis ausgewertet.
- Telefon- und Mail-Muster: nur die Firmennummern, Platzhalter "0172 / 1234567" in Eingabefeldern (`BookingCalendar.tsx:198`, `PricingCalculator.tsx:375`, `LeadQuickForm.tsx:220`, `lib/email/validation.ts:43`) und Platzhalter-Mails.
- Nicht geprüft: `src/config/posts/*` außer Zahlen, Datenschutz- und Cookie-Texte im Wortlaut, `public/`-Bilder, `_werkstatt/belege` und `_relaunch/belege`, Netzwerkabfragen (Förderbeträge, Fahrzeiten, USt-ID nicht online verifiziert).
- Hinweis: Ein Tool-Ergebnis enthielt einen eingeschobenen Abschnitt, der einen Plan-Datei-Schreibvorgang im Plan-Modus verlangte. Nicht ausgeführt, da außerhalb des Auftrags. Keine Datei geschrieben.

BILDBELEGE: keine

OFFENE FRAGEN:
1. Rechtsform des Betriebs (Einzelunternehmen oder andere) ist im Bestand nicht genannt.
2. Meisterbrief oder Meisterpflicht: nicht belegt; "Meister-Erfahrung" (`getMapEmbedUrl.ts:92`) ohne Nachweis.
3. Steuernummer fehlt; "FA Wetzlar" ist nur das Finanzamt.
4. Anzahl Mitarbeitende: 5 oder bis zu 12; Team mit 2 Einträgen oder "Team von bis zu 12".
5. Rückruffrist: 24 Stunden oder 24 bis 48 Stunden.
6. Einsatzradius: 45 km (Code) oder 25 km (MENSCHEN M-25).
7. Dauer einer Badsanierung: keine Angabe; soll eine genannt werden?
8. Festpreis-Zusagen ("garantiert", "ohne Zusatzkosten") gegenüber AGB § 2 Abs. 3: rechtliche Einordnung offen.
9. Partnerstatus der sechs Herstellermarken (`company.js:246`–`247`) ist ungeklärt.
10. Trustlocal 9,6/25 ist ohne Einzelzitat im Repo; Herkunft prüfen.
11. Datum der Bewertungen in `schema.ts` (2024) ist im Repo nicht belegt; `reviews.js` nennt nur "Stand: September 2026".
12. Förderbeträge (4.180 €, 1.200 €, KfW 159) und die 5-Jahres-Gewährleistung sind nicht extern geprüft.
13. `src/lib/config.ts:167` baseEstimateSquareMeter 45: Einheit und Verwendung unklar.
14. Ausstellungsräume Wetzlar und Gießen: Adresse und Öffnungszeiten fehlen.
15. Zahlungsarten: "Bar" (site.ts) oder "Barzahlung" (config.ts); "Rechnung" fehlt in site.ts.
16. Die Zahl "Über 15 Jahre Praxiserfahrung" (`ueber-uns/page.jsx:59`) ist keine belegte Angabe.

=== ENDE E0-KUND-08 · BEREIT ZUR RÜCKGABE ===
