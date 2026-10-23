<!-- Gesichert aus dem Workflow-Protokoll der E0-Erkundung (23.10.2026, nur lesend, Haiku 5.5). Unverändert. -->

GEÄNDERTE DATEIEN: keine

BEFUNDE: (Pfade relativ zu /home/user/tezgel/; Routen unter src/app/(bestand)/ sofern nicht anders angegeben)

1. Zählung: 82 page-Dateien. 6 davon sind `page.dev.tsx` unter `werkstatt-schaufenster/` und nur in der Entwicklung Routen (next.config.ts:12). Produktiv: 76 page-Dateien, davon 6 dynamisch (`bad/musterbaeder/[slug]`, `blog/[slug]`, `leistungen/[id]`, `leistungen/[id]/[stadt]`, `referenzen/[id]`, `standorte/[stadt]`). Erzeugte Adressen: 70 statisch + 100 dynamisch = 170.
2. Summen nach Seitenart (Zuordnung nach Funktion, Grenzfälle siehe OFFENE FRAGEN): Erzählseiten 41, Wissensseiten 44, Ortsseiten 68, Arbeitsseiten 17 (davon 6 Rechtstexte). Summe 170.
3. Statische Adressen (70):
   - Erzählseiten (19): /, /bad, /bad/bad-aus-einer-hand, /bad/badsanierung, /bad/barrierefreies-bad, /bad/fliesen, /bad/musterbaeder, /balkon-terrasse, /karriere, /karriere/ausbildung, /leistungen, /naturstein, /partner, /referenzen, /team, /treppen, /ueber-uns, /untergrund-abdichtung, /unternehmen
   - Wissensseiten (31): /balkon-terrasse/balkonsanierung, /balkon-terrasse/stelzlager, /balkon-terrasse/terrassenplatten, /blog, /faq, /fliesen, /fliesen/abnahme, /fliesen/auf-fussbodenheizung, /fliesen/festpreisangebot, /fliesen/fliesenarten, /fliesen/flur-diele, /fliesen/fugensanierung, /fliesen/grossformat, /fliesen/holzoptik, /fliesen/kueche, /fliesen/neubau, /fliesen/renovierung, /fliesen/verlegemuster, /fliesen/verlegetechnik, /fliesenreparatur, /foerderung, /naturstein/granit, /naturstein/marmor-kalkstein, /treppen/aussentreppe, /treppen/innentreppe, /treppen/treppenhaus, /untergrund-abdichtung/ausgleich-gefaelle, /untergrund-abdichtung/din-18534, /untergrund-abdichtung/entkopplung, /untergrund-abdichtung/estrich-belegreife, /untergrund-abdichtung/fliesen-auf-fliesen
   - Ortsseiten (3): /ausstellung/giessen, /ausstellung/wetzlar, /standorte
   - Arbeitsseiten (11): /bad/badanfrage, /bad/badplaner, /bad/projekt-check, /beratung, /downloads, /fliesen/konfigurator, /kontakt, /login, /preise, /schadensanalyse, /termin
   - Rechtstexte (6): /agb, /barrierefreiheit, /cookie-richtlinie, /datenschutz, /impressum, /widerruf
4. Dynamische Adressen und Quellen (100):
   - /bad/musterbaeder/<slug> (12), Quelle config/musterbaeder.js (slug-Zeilen 12 bis 597), generateStaticParams in bad/musterbaeder/[slug]/page.jsx:27: basic-bad-4_6, basic-bad-7, basic-bad-8_2, basic-bad-15_9, premium-bad-4_6, premium-bad-7, premium-bad-8_2, premium-bad-15_9, luxus-bad-4_6, luxus-bad-7, luxus-bad-8_2, luxus-bad-15_9
   - /blog/<slug> (13), Quelle config/posts.js (importiert config/posts/*.js), generateStaticParams in blog/[slug]/page.jsx:21 und blog/[slug]/layout.jsx:6: handwerkerbonus-fliesenarbeiten, undichte-dusche-warnzeichen, feinsteinzeug-oder-naturstein-vergleich, fliesen-reinigen-pflegen, barrierefreier-balkonaustritt, wandnischen-dusche-planen, duschrinne-oder-punktablauf, schimmel-fliesenfugen-vermeiden, fliesen-fuer-allergiker, rutschfeste-fliesen-r-klassen, fliesen-mythen-faktencheck, gaeste-wc-fliesen, fliesenleger-gesucht-geselle-meister
   - /leistungen/<id> (4), Quelle config/services.js (id-Zeilen 6, 41, 74, 105): bad, wohnen, aussen, untergrund (generateStaticParams leistungen/[id]/page.jsx:50)
   - /leistungen/<id>/<stadt> (52), 4 x 13 Städte, generateStaticParams leistungen/[id]/[stadt]/page.tsx:97
   - /referenzen/<id> (6), Quelle config/projects.js (id-Zeilen 12, 28, 43, 58, 73, 89): badsanierung-grossformat, einfamilienhaus-komplett, treppenanlage-wohnhaus, wohnbereich-fussbodenheizung, barrierefreies-duschbad, balkon-stelzlager (referenzen/[id]/page.jsx:54)
   - /standorte/<stadt> (13), Quelle config/cities.ts (slug-Zeilen 13 bis 109), standorte/[stadt]/page.tsx:62: wetzlar, giessen, marburg, limburg, bad-nauheim, friedberg, butzbach, herborn, dillenburg, haiger, braunfels, solms, asslar
5. Textquelle: Kein CMS. Suche nach contentful, sanity, storyblok, strapi, prismic, notion, wordpress, graphql in src ergibt 0 Treffer. fetch-Aufrufe: lib/seo/indexnow.ts:94 (extern) und 10 Formular-Hooks in lib/formulare/*.ts (intern /api/anfrage). Texte stehen als TSX/JSX-Literale in den Seiten, in config/*.js|ts und als Markdown in config/posts/*.js (Feld content, gerendert mit react-markdown in blog/[slug]/page.jsx:187 bis 266). Einzige .md-Datei in src: src/app/fonts/LIZENZEN.md. Größte Dateien nach Bytes (Code und Text gemischt): config/musterbaeder.js 29929; app/(bestand)/termin/page.jsx 29270; schadensanalyse/page.jsx 27503; fliesen/page.jsx 24750; balkon-terrasse/stelzlager/page.jsx 24600; untergrund-abdichtung/entkopplung/page.jsx 24098; naturstein/page.jsx 23909; untergrund-abdichtung/estrich-belegreife/page.jsx 23772; fliesen/verlegetechnik/page.jsx 23202; untergrund-abdichtung/din-18534/page.jsx 23136.
6. Metadaten: Hilfsfunktion lib/metadata.ts, generatePageMetadata, exportiert als createMetadata (letzte Zeile). Verwendet von 59 page-Dateien und 20 layout-Dateien. Ausnahme: blog/[slug]/layout.jsx:14 baut Metadaten ohne Helper; der canonical ist relativ (/blog/<slug>) und wird über metadataBase aufgelöst (app/(bestand)/_dokument.tsx:39). sanitizeTitle (metadata.ts): Titel mit "Tezgel" und 45 bis 58 Zeichen bleiben unverändert, sonst Suffix-Umbau, harte Kappung bei 58. sanitizeDescription: unter 120 Zeichen wird aufgefüllt, über 155 gekürzt mit "...".
7. test/titleLength.test.mjs: Regel "Title höchstens 58 Zeichen". Test 1 Langtitel; Test 2 alle CITIES; Test 3 SERVICES x erste 5 CITIES; Test 4 /impressum mit robots index false, follow true. Der Test wurde nicht ausgeführt (kein node_modules, Import über den Alias "@/").
8. Die 13 geforderten Adressen (Datei:Zeile, Title mit Zeichenzahl, Description, H1):
   - /: src/app/(bestand)/page.tsx:36. "Fliesenleger Wetzlar & Aßlar | Fliesenverlegung Tezgel" (55). Description "Ihr Fliesenleger für Wetzlar & Aßlar: Badsanierung, fugenarme Großformate & Terrassen. Abdichtung DIN 18534. Jetzt kostenfreies Vor-Ort-Aufmaß anfragen!" (156, wird gekürzt). H1 "Perfektion auf jedem Quadratmeter." (components/start/Einstieg.tsx:25)
   - /bad: bad/page.jsx:57. "Badsanierung Wetzlar & Aßlar | Fachbetrieb Tezgel" (50). Description "Schlüsselfertige Badsanierung in Wetzlar & Aßlar: barrierefreie Walk-In Duschen, XXL-Fliesen & DIN 18534 Abdichtung. Jetzt Festpreisangebot anfragen!" (151). H1 "Ihr Traumbad schlüsselfertig in Fachqualität" (page.jsx:93).
   - /bad/badsanierung: bad/badsanierung/page.jsx:27. "Badsanierung Wetzlar & Aßlar | Komplettbäder Tezgel" (53). Description "Komplette Badsanierung in Wetzlar & Aßlar: Demontage bis Fuge, Walk-In Dusche, Großformate & Verbundabdichtung. Festpreisangebot vom Fachbetrieb Tezgel!" (154). H1 "Badsanierung in Aßlar & Wetzlar: Ihr neues Traumbad ohne Stress & zum Festpreis" (page.jsx:52).
   - Barrierefreies Bad: bad/barrierefreies-bad/page.jsx:26. "Barrierefreies Bad Wetzlar & Aßlar | DIN 18040 Tezgel" (54). Description "Barrierefreie Badsanierung nach DIN 18040-2 in Wetzlar & Aßlar: Bodengleiche Duschen, rutschfeste Fliesen & Pflegekassen-Zuschuss. Jetzt anfragen!" (147). H1 "Barrierefreie Badmodernisierung in Aßlar & Wetzlar: Sicherheit, Komfort & bis zu 4.180 € Zuschuss" (page.jsx:51).
   - /leistungen: leistungen/layout.tsx:3. "Fliesenleger Leistungen Wetzlar | Fachbetrieb Tezgel" (52). Description "Alle Fliesenleger-Leistungen von Tezgel in Wetzlar & Aßlar: Badsanierung, XXL-Großformate, Terrassen, Naturstein & Abdichtung. Jetzt Festpreis anfragen!" (154). H1 "Fliesenleger Leistungen & Fachgewerke Wetzlar" (leistungen/page.jsx:103).
   - /fliesen: fliesen/page.jsx:38. "Fliesenverlegung & Ratgeber | Fliesenleger Tezgel" (49). Description "Ratgeber & Fachwissen zur Fliesenverlegung: Großformate, Feinsteinzeug, Holzoptik & Verlegetechniken vom Fliesenleger-Fachbetrieb Tezgel in Hessen." (148). H1 "Fliesen-Ratgeber: Formate, Räume und Verlegetechnik verständlich erklärt" (page.jsx:217).
   - /balkon-terrasse: balkon-terrasse/page.jsx:30. "Balkon & Terrasse fliesen Wetzlar | Fachbetrieb Tezgel" (54). Description "Balkon & Terrasse fliesen lassen in Wetzlar & Aßlar: frostsichere Keramik, Stelzlager & Naturstein. Jetzt kostenfreies Vor-Ort-Aufmaß anfragen!" (145). H1 "Balkon und Terrasse: Beläge, die Frost und Regen standhalten" (page.jsx:134).
   - /referenzen: referenzen/layout.tsx:5. "Referenzen & Bewertungen | Fliesenleger Tezgel ★ 5,0" (54). Description "Kundenbewertungen & Referenzen von Fliesenleger Tezgel: Bäder, Terrassen, Treppen & Großformate in Wetzlar, Aßlar & Mittelhessen. 5,0 Google-Bewertung!" (154). H1 "Referenzen & Bewertungen Fliesenleger Tezgel" (referenzen/page.jsx:63).
   - /ueber-uns: ueber-uns/layout.tsx:8. "Über uns | Fliesenleger-Fachbetrieb Tezgel Aßlar" (50). Description ist ein Template mit Werten aus config/company.js (nicht gemessen). H1 "Über uns – Fliesenleger-Fachbetrieb Tezgel in Aßlar" (ueber-uns/page.jsx:29).
   - /kontakt: kontakt/layout.tsx:5. "Kontakt & Vor-Ort-Aufmaß | Fliesenleger Tezgel Aßlar" (54). Description "Kontaktieren Sie Fliesenleger Tezgel in Aßlar: kostenfreies Vor-Ort-Aufmaß, persönliche Beratung & Festpreis für Wetzlar & Hessen. Jetzt anfragen!" (150). H1 "Kontakt & Aufmaß Fliesenleger Tezgel" (kontakt/page.jsx:30).
   - Ortsseite Wetzlar: standorte/[stadt]/page.tsx:81 (generateMetadata, city wetzlar). "Fliesenleger & Bad in Wetzlar | Tezgel Fachbetrieb" (50). Description "Ihr Fliesenleger in Wetzlar: Badsanierung, XXL-Fliesen & DIN 18534 Abdichtung. Fachbetrieb Tezgel – Jetzt Vor-Ort-Aufmaß & Festpreisangebot anfragen!" (152). H1 "Fliesenverlegung & Badsanierung in Wetzlar" (page.tsx:167).
   - /blog: blog/layout.tsx:6. "Fliesen-Ratgeber & Badsanierung Tipps | Tezgel" (46). Description "Praxiswissen & Ratgeber zu Badsanierung, Fliesenverlegung & DIN 18534 Abdichtung vom Fliesenleger-Fachbetrieb Tezgel aus Aßlar. Jetzt informieren!" (147). H1 "Fliesen-Ratgeber & Badsanierung Tipps" (blog/page.jsx:17).
   - /standorte: standorte/page.tsx:35. "Fliesenleger Standorte & Einsatzgebiete | Tezgel" (48). Description "Fliesenleger-Fachbetrieb Tezgel aus Aßlar: Fliesenverlegung & Badsanierung in Wetzlar, Gießen, Herborn & Lahn-Dill-Kreis. Jetzt Vor-Ort-Aufmaß anfragen!" (155). H1 "Standorte & Einsatzgebiete in Mittelhessen" (page.tsx:88).
   Alle 13 Titel enthalten "Tezgel". Nach Code-Lesart bleiben sie unverändert, weil sie zwischen 45 und 58 Zeichen liegen.
9. Navigation und Fuß: Kopf (components/common/Header.jsx:117) und Mobilmenü (MobileMenu.jsx:97) nutzen navigationLinks aus config/navigation.js; primaryCta ist /kontakt. Fuß (Footer.jsx:20 bis 23, 190) nutzt footerBathLinks, footerServiceLinks, footerLocationLinks, footerCompanyLinks, footerLegalLinks. Nicht verlinkt in Kopf oder Fuß:
   - Ohne Link in Kopf oder Fuß: /preise (einziger Treffer: eigene Datei, preise/page.jsx:31), /termin (fliesen/neubau/page.jsx:134, sitemap.ts, lib/seo/indexnow.ts:41), /karriere/ausbildung (karriere/page.jsx:48).
   - Nur über Hub-Seiten erreichbar: 25 statische Unterseiten (13 unter /fliesen, 5 unter /untergrund-abdichtung, 3 unter /balkon-terrasse, 2 unter /naturstein, 3 unter /treppen). Die Hub-Pfade stehen in der Navigation, die Unterseiten nicht.
   - Dynamisch ohne Kopf- oder Fußlink: /bad/musterbaeder/<12> (bad/musterbaeder/page.jsx), /referenzen/<6> (referenzen/page.jsx), /blog/<13> (components/blog/BlogCard.jsx, RelatedPosts.jsx), /leistungen/<4>/<13> (components/start/Fachgewerke.tsx, components/leistungen/Gewerk.tsx, standorte/[stadt]/page.tsx).
   - Ausgeschlossen: /login (robots.ts:29, 34, disallow).
10. Sitemap (app/sitemap.ts): Fehlen /agb, /datenschutz, /impressum, /widerruf, /cookie-richtlinie, /login und /preise. Die Rechtstexte sind per Metadaten auf index false gesetzt (impressum/layout.tsx:10, agb/layout.tsx:10, datenschutz/layout.tsx:10, widerruf/layout.tsx:10, cookie-richtlinie/page.jsx:16). /preise hat keine robots-Angabe, ist also indexierbar, steht aber nicht in der Sitemap.
11. Auffälligkeiten mit Fundstelle:
   - config/musterbaeder.js: premium-bad-4_6 (Zeile 242) hat den Titel "Komfort-Bad 4,6" (246), premium-bad-15_9 (385) hat "Komfort-Bad 15,9" (389). Die Tier-Namen in Zeile 652 bis 663 sind Basic, Premium, Luxus.
   - Team-Daten doppelt: config/company.js:218 (2 Einträge, genutzt von team/page.jsx:10) und config/team.js (2 Einträge, genutzt nur von services/dataService.js:14).
   - Blog: zwei generateMetadata, in blog/[slug]/page.jsx:23 und blog/[slug]/layout.jsx:14.
   - standorte/[stadt]/page.tsx:76 bis 77: Bad Nauheim hat eine Sonderformel im Titel, "Fliesenleger in Bad Nauheim | Badsanierung Tezgel".
   - Startseiten-Description ist 156 Zeichen und wird durch sanitizeDescription gekürzt (metadata.ts, über 155 mit "...").
   - Markenschreibweisen in den Titeln: "Fliesenverlegung Tezgel", "Fliesenleger Tezgel", "Fachbetrieb Tezgel", "Tezgel", "Fliesenleger-Fachbetrieb Tezgel", "Tezgel Fachbetrieb".
   - Referenzen: alle 6 Projekte in config/projects.js haben placeholder: true (Zeilen 13, 29, 44, 59, 74, 90). referenzen/page.jsx:103 bis 107 sagt, Fotos realer Projekte werden erst nach Zustimmung veröffentlicht.

GEMEINSAME DATEIEN:
- config/musterbaeder.js:246 und :389: Titel "Komfort-Bad" passt nicht zu Slug und Tier-Namen premium-bad-4_6 und premium-bad-15_9.
- app/sitemap.ts: /preise fehlt in den Sitemap-Einträgen, obwohl die Seite indexierbar ist.
- config/team.js und config/company.js:218: zwei Quellen für dasselbe Team.
- blog/[slug]/page.jsx:23 und blog/[slug]/layout.jsx:14: doppelte Metadaten-Logik.

PRÜFUNG UND ERGEBNIS:
- find über src/app nach page.*, route.*, layout.*, not-found.*, sitemap.*, robots.* ausgeführt. Routenliste per sed aus 82 Dateien gebildet (76 produktiv).
- grep auf generateStaticParams (9 Treffer, 6 dynamische Segmente). Datenquellen einzeln geöffnet: cities.ts, services.js, musterbaeder.js, posts.js, projects.js, Slugs aus config/posts/*.js abgeglichen.
- grep auf CMS-Namen (0 Treffer), fetch-Aufrufe (10 plus indexnow), react-markdown (1 Datei), metadata- und generateMetadata-Exporte (59 page, 20 layout).
- Für alle 70 statischen Routen: exakter quotierter Literalvergleich gegen navigation.js, topics.js, services.js und sitemap.ts. Ergebnis siehe BEFUNDE 9 und 10.
- Titel und Description der 13 Adressen aus dem Quellcode gelesen; Zeichenlängen mit wc -m auf dem Rohtext gemessen, nicht über den Helper.
- Inbound-Links für dynamische Routen per grep geprüft (BEFUNDE 9).
- Nicht geprüft: Seiteninhalte jenseits H1 und Metadaten; jede Hub-Seite einzeln; tatsächliches Rendering und Build.

BILDBELEGE: keine

OFFENE FRAGEN:
1. Es gibt keine src/app/layout.*. Das Root-Layout liegt in der Route-Gruppe (bestand)/layout.tsx. Ob der Build damit fehlerfrei läuft, ist nicht belegt, weil kein Build ausgeführt wurde.
2. Grenzfälle der Seitenart-Zuordnung: /bad/musterbaeder und seine 12 Unterseiten (Erzählung oder Wissen), /schadensanalyse, /fliesen/festpreisangebot und /fliesen/abnahme, /downloads, /preise, /login, /ausstellung/*.
3. Ob die Hub-Unterseiten (/fliesen/*, /untergrund-abdichtung/*, /balkon-terrasse/*, /treppen/*, /naturstein/*) auf jeder Hub-Seite tatsächlich gelistet werden, ist nur für /fliesen (HUB_PAGES) geprüft.
4. Das Ergebnis des Titel-Tests ist nur Code-Lesart, nicht ausgeführt.
5. Die Description von /ueber-uns wurde nicht gemessen, weil sie aus Template-Werten besteht.
6. Ob city.description aus config/cities.ts auf den Ortsseiten gerendert wird, ist nicht geprüft.
7. Ob /preise absichtlich weder in Navigation noch in Sitemap steht, ist aus dem Code nicht ersichtlich.

=== ENDE E0-KUND-03 · BEREIT ZUR RÜCKGABE ===
