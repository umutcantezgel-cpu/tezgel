<!-- Gesichert aus dem Workflow-Protokoll der E0-Erkundung (23.10.2026, nur lesend, Haiku 5.5). Unverändert. -->

GEÄNDERTE DATEIEN: keine

BEFUNDE:

**Tests und Qualität (Schritte 1, 4)**
1. npm-Skript "test" (package.json:13) führt sechs Dateien mit `node --test` aus: bewegung 5 Tests (test/bewegung.test.mjs:10-39), einzugszonen 6 (test/einzugszonen.test.mjs:6-50), email-pipeline 13 (test/email-pipeline.test.mjs:34-283), plaene 4 (test/plaene.test.mjs:6-26), titleLength 4 (test/titleLength.test.mjs:7-61), wege 5 (test/wege.test.mjs:42-73). Summe 37 test()-Blöcke. test/resolver.mjs ist ein Loader für den `@/`-Alias, kein Test.
2. Die Tests laufen nicht in CI. .github/workflows/security.yml:29 führt nur `npm run lint` aus; es ist die einzige Workflow-Datei.
3. scripts/qa/check-graph.mjs (`npm run qa:graph`) ist eine statische Textprüfung ohne Build. Sie prüft JSON-LD-Quellen per includes(): Q183 und PLACE_DE_ID (:22-23), aggregateRating nur am Produkt, nicht an Organization (:27-35), areaServed und Hohwardstraße (:39-41), PLZ 35614, Aßlar, Deniz Tezgel (:45-47).

**Weiterleitungen (Schritt 2)**
4. 308-Weiterleitungen: 2 Stück in next.config.ts:17-18 (`/bad/budgetkalkulator` → `/bad/projekt-check`; `/blog/barrierefreies-bad-planung-zuschuesse` → `/bad/barrierefreies-bad`), beide `permanent: true`.
5. 410 über src/proxy.ts: matcher mit 25 Einträgen (proxy.ts:22-46: 7 Bereiche, 18 Einzelseiten). Antwort in :8-18, mit x-robots-tag noindex. Liste in src/lib/wege.ts:9-39. test/wege.test.mjs:65 prüft Matcher gegen Liste.

**Sitemap, robots, Sonderdateien (Schritt 3)**
6. src/app/sitemap.ts: STATIC_ROUTES :19-61 (29 Einträge). Generiert werden: SERVICES (src/config/services.js, 4 IDs) als /leistungen/{id} (:74) und SERVICES×CITIES (:75-77); CITIES (src/config/cities.ts, 14 slugs) als /standorte/{slug} (:78); MUSTERBAEDER (musterbaeder.js, 12) (:79); TOPIC_PAGES (topics.js, 40 path-Zeilen) (:80); PORTFOLIO_PROJECTS (projects.js, 11) (:81); posts (posts.js mit Ordner posts/, 13 Dateien) (:82). Dedup per URL in :85-91.
7. Nicht in der Sitemap: /impressum und /datenschutz (Ordner in src/app/(bestand)/ vorhanden).
8. src/app/robots.ts: sitemap-Verweis auf /sitemap.xml (:37); Regel `*` plus 13 KI-Crawler (:8-22) mit Disallow /api/, /login, /admin, /*?* (:29, :34).
9. video-sitemap.xml: Route-Handler src/app/video-sitemap.xml/route.ts. Zwei Videoeinträge, player_loc /videos/handwerk.mp4 (:16) und /videos/din18534.mp4 (:29). Der Ordner public/videos fehlt. Nicht in robots.ts referenziert (grep in src, public, next.config.ts).
10. llms.txt: Route-Handler src/app/llms.txt/route.ts, text/plain, 24-Stunden-Cache. Zweck: KI- und GEO-Kurzprofil (Unternehmen, Gewerke, Einzugsgebiet, Wichtige Seiten, Vertrauensmerkmale). Daten aus SITE_CONFIG, die Bewertung "5,0 … (27 verifizierte Kundenstimmen)" steht fest im Text.

**Strukturierte Daten (Schritt 4)**
11. Typen mit Fundstelle. src/lib/schema.ts: Organization 71/112/123; ImageObject 78 (nur Logo); ContactPoint 89; WebSite 104; Person 137/291/307/323; EducationalOrganization 145; City 118, 192-200, 458, 509; PostalAddress 179/513/565; GeoCoordinates 187/521; OpeningHoursSpecification 209/215; AdministrativeArea 201/460; Product 255; Brand 262; Offer 266/471; AggregateRating 275; Review 283/299/315; Rating 285/301/317; WebPage 384; AboutPage 406; ContactPage 426; BreadcrumbList 356; ListItem 364; Service 450/478; OfferCatalog 468; FAQPage 533 (Question 536, Answer 539); JobPosting 554; BlogPosting 590; HowTo 619 (HowToStep 625); CreativeWork 646; Place 563/653; LocalBusiness-Array 165/499 (HomeAndConstructionBusiness, LocalBusiness). src/lib/schemaPyramid.ts: City 298; AdministrativeArea 244/250/269/307/310; GeoCoordinates 302/338; PostalAddress 330; LocalBusiness-Array 319 (mit GeneralContractor). Seiten: leistungen/page.jsx:51 OfferCatalog, :55 Offer, :62 Service; standorte/page.tsx:56 CollectionPage; referenzen/layout.tsx:27 CollectionPage; blog/layout.tsx:28 Blog. Ausgabe über src/components/seo/JsonLd.tsx:14-17.
12. Article fehlt; stattdessen BlogPosting (schema.ts:590). Die Treffer "@type" in blog/[slug]/page.jsx:189/263 sind ESLint-Kommentare (@typescript-eslint), keine Daten.
13. Herkunft der Stammdaten. Name: schema.ts:73/107 als Literal, Quelle SITE_CONFIG.companyName (src/shared/config/site.ts:15). schema.ts hat keinen Import von site.ts. Adresse: schema.ts:179-185 als Literal; schemaPyramid.ts:330-337 aus SITE_CONFIG.headquarters (site.ts:63-73). Telefon: schema.ts:90 als Literal "+49 6441 4483567", identisch zu site.ts:45. Bewertung: schema.ts:274-279 als Literal (5.0 / 27) am Product-Knoten; drei eingebettete Reviews :283-320 (Elke S., C. W., Rabia Ö.). Quelle reviews.js: RATING_SUMMARY :9-27 (Google 5,0 bei 27; Trustlocal 9,6/10 bei 25), REVIEWS :29-153 (16 Einträge). Die drei Zitate stehen wörtlich in reviews.js:32/40/48. schema.ts importiert reviews.js nicht.

**Canonical (Schritt 5)**
14. SITE_URL: schema.ts:6 (Env NEXT_PUBLIC_SITE_URL, Fallback https://www.tezgel.de). metadataBase: src/app/(bestand)/_dokument.tsx:39, genutzt in (bestand)/layout.tsx:4 und global-not-found.tsx:7.
15. Hilfsfunktion: src/lib/metadata.ts:148-175 generatePageMetadata, Alias createMetadata (:200). canonical = BASE_URL + path (:149), alternates.languages de/x-default (:164-169), og:url (:174). Genutzt von 75 von 87 Dateien mit Metadaten-Export unter src/app.
16. Abweichung: relativer canonical-Pfad in src/app/(bestand)/blog/[slug]/layout.jsx:26 und referenzen/[id]/layout.jsx:44. Ohne Helfer: global-not-found.tsx, not-found.tsx, login/layout.tsx, (bestand)/layout.tsx und 6 page.dev.tsx unter werkstatt-schaufenster (nur im Dev-Modus, next.config.ts:12).

**Prüfwerkzeuge (Schritte 6-8)**
17. EINRICHTUNG.md (98 Zeilen) vollständig gelesen. Ports: 4310 Produktion, 4320 Entwicklung, 4311 Tracking-Variante. Stolpersteine laut Datei: Scratch-Pfad ist sitzungsgebunden (EINRICHTUNG.md:69); `next dev` schreibt AGENTS.md um (:74); server.sh stop beendet next-server nicht (:72, als aus dem Code abgeleitet markiert).
18. Werkzeuge in _werkstatt/werkzeuge (Zweck · Aufruf · Abhängigkeiten · Ausgabe):
- bildsatz.mjs · `--satz NAME (--hauptansichten | --seiten)` · playwright, lib.mjs, ueberlappung.mjs · _werkstatt/cache/bildsatz/<satz>/<ansicht>/<slug>/NN.jpg + bildsatz.json
- einzelbild.mjs · `--seite /x [--ansichten] [--scroll] [--voll]` · playwright, lib.mjs, ueberlappung.mjs · _werkstatt/cache/einzelbild/<slug>/<ansicht>.jpg + einzelbild.json
- lighthouse.mjs · `CHROME_PATH=… --satz N [--laeufe 3] [--formen mobil,desktop]` · lighthouse 13.5.0, chrome-launcher (nicht deklariert) · cache/lighthouse/<satz>/*.report.json, belege/<satz>/lighthouse.json
- axe.mjs · `--satz N [--seiten|--hauptansichten] [--zustaende]` · @axe-core/playwright 4.13.0 · belege/<satz>/axe.json (bzw. axe-zustaende.json)
- texte.mjs · `--satz N [--ansichten d1440,m390]` · playwright · belege/<satz>/texte/*.json + texte-index.json
- ueberlappung.mjs · `--seite /x --ansicht m390` (Modul/CLI) · playwright · stdout
- bewegung.mjs · `--modus einzelbilder|bildrate|register|reduziert --seite /x` · playwright; register.json · cache/bewegung/<modus>/<slug>/
- fotos.mjs · `--satz N [--seiten] [--ansichten]` · playwright · cache/fotos/<satz>/, belege/<satz>/fotos-ergebnis.json
- pruefe-a.sh · `<Kennung> <Datei…> -- <Pfad…>` · tsc, eslint, Playwright, Dev-Server 4320, test-zuordnung.json · $SCRATCH/<Kennung>/pruefe-a.txt
- reinraum.sh · `<commit> [logdir]` · git, npm ci/build/test/lint · $SCRATCH/reinraum-<SHA>/, Logs in _werkstatt/cache/reinraum-<SHA>/
- server.sh · `start <commit> | stop | status` (PORT 4310) · setsid, ps, kill · PID-/Dir-Dateien im SCRATCH
- dev-server.sh · `start | stop | status` (Port 4320) · npx next dev · SCRATCH/dev-4320.log, .pid
- statisch.mjs · `--satz N [--wurzel]` · nur Node-Bordmittel · belege/<satz>/statisch.json
- svg.mjs · `[--dateien] [--seiten] [--animiert]` · svgo 4.1.0, playwright · cache/svg/<zeit>.json
- glyphen.mjs · `--texte <satz> --schriften <woff2>` · Python fonttools (glyphen.py, Venv im SCRATCH) · cache/glyphen/<satz>/glyphen-ergebnis.json, zeichen.txt
19. _werkstatt/werkzeuge/package.json: @axe-core/playwright 4.13.0, @playwright/test 1.56.1, knip 6.41.0, lighthouse 13.5.0, pixelmatch 8.0.0, pngjs 7.0.0, svgo 4.1.0. Nicht deklariert, aber importiert: chrome-launcher (lighthouse.mjs:13), @babel/parser, @babel/traverse, magic-string (umbau.mjs:20-22; bezeichner.cjs:5-6; textprobe.cjs:6-7), typescript, postcss, @tailwindcss/node (werte.mjs:20-22). In den _werkstatt-Skripten keine Nutzung von knip, pixelmatch oder pngjs gefunden.
20. _werkstatt/werkzeuge/tests: 14 Dateien, fixtures.mjs plus 13 Specs (badanfrage, einwilligung, express-funnel, hero-kontakt, konfigurator, kontaktwege, navigation, preisrechner, projektcheck, schnellanfrage, termin, tracking, weiterleitung). _relaunch/werkzeuge/tests hat zusätzlich funktion-uhr.spec.mjs.

**Abgleich der Anforderungen (Schritt 7)**
21. Einzelbild: TEILWEISE. Erlaubt sind nur Ansichten aus ANSICHTEN (lib.mjs:20-26: m375, m390, t768, d1440, d1920); m430 steht nur in ANSICHTEN_AUSBAU (lib.mjs:28-32) und ist in einzelbild.mjs nicht zulässig.
22. Bildsatz in 10 Größen: TEILWEISE. bildsatz.mjs nutzt fest GERAETE (lib.mjs:168: m390, t768, d1440), keine Auswahloption.
23. Gerätegrößen: vorhanden 390×844 (m390), 768×1024 (t768), 1440×900 (d1440), 1920×1080 (d1920), 430×932 (m430, nur ANSICHTEN_AUSBAU). FEHLT: 360×740, 844×390, 1024×768, 1280×800 (nur als Zoom-Angabe in _relaunch/werkzeuge/a11y-zusatz.mjs:97), 2560×1440.
24. Leistungsmessung, Median aus drei Läufen: VORHANDEN in lighthouse.mjs (--laeufe 3, Median und Spanne :101-116). Abweichung: nur Formen mobil/desktop, keine Gerätegrößen.
25. Zugänglichkeit: VORHANDEN in axe.mjs (WCAG 2.0 bis 2.2 A/AA, Zustände). Zusätzlich _relaunch/werkzeuge/a11y-zusatz.mjs (Tastatur, Fokus, Zoom), nur dort.
26. Linkprüfung: TEILWEISE. texte.mjs:137-139 prüft nur interne Ziele (Hosts 127.0.0.1, localhost, tezgel.de; Status ≥ 400). Externe Links: FEHLT.
27. Zeichenprüfung: VORHANDEN (glyphen.mjs, Glyphenabdeckung der Schriften). Lesbarkeit (Flesch nach Amstad, Satzlänge, Gedankenstriche): FEHLT. Keine Treffer für flesch, amstad, satzl, gedankenstrich, lesbark in .mjs, .cjs, .js, .py, .sh beider Ordner. wortbruch.mjs (_relaunch) prüft Wortumbruch, nicht Lesbarkeit.
28. Prüfung "Erstes Bild": TEILWEISE. abschnitte.mjs:46-48 erzeugt nur das Bild "erster Bildschirm". Eine Lageprüfung der Pflichtelemente ohne Scrollen fehlt: FEHLT.
29. Einzelbildfolgen von Animationen: VORHANDEN, bewegung.mjs --modus einzelbilder (5 Bilder je Animation).
30. Probelauf-Werkzeug: VORHANDEN, nur in _relaunch/werkzeuge/probelauf.mjs. Bildschirmfoto je Schritt (NN-<art>.jpg), sichtbare Bedienelemente (NN-sichtbar.txt), Befehle tippe, scrolle, zurueck (plus taste, fuelle, waehle, wische, warte_auf), Schrittzähler über Zählregeln. Ausgabe _relaunch/cache/probelauf/<satz>/<lauf>/.

**Nur in _relaunch/werkzeuge (Schritt 8)**
31. 21 Einträge: a11y-zusatz.mjs, fuenf-sammeln.mjs, fuenf-workflow.js, inp.mjs, kanal-probe.mjs, kopfplatz-scrollleiste.mjs, literal.mjs, live-browser.mjs, pixel.mjs, probelauf.mjs, svgo-animiert.json, svgo-statisch.json, testzahl.mjs, texte2.mjs, tor-s.sh, tor-t1.sh, uhr.mjs, umzug/ (Ordner), wege.mjs, wortbruch.mjs, zuklappen.mjs.
32. Nur in _werkstatt/werkzeuge (17): EINRICHTUNG.md, abschnitte.mjs, bezeichner.cjs, bildsatz.mjs, briefing.mjs, dev-server.sh, einzelbild.mjs, glyphen.mjs, glyphen.py, pruefe-a.sh, sprite.mjs, test-zuordnung.json, textprobe.cjs, ueberlappung.mjs, umbau.mjs, werte-regeln.json, werte.mjs.

GEMEINSAME DATEIEN:
1. src/app/video-sitemap.xml/route.ts:16 und :29 verweisen auf /videos/handwerk.mp4 und /videos/din18534.mp4. Der Ordner public/videos fehlt.
2. _werkstatt/werkzeuge/lighthouse.mjs:13 importiert chrome-launcher, das nicht in _werkstatt/werkzeuge/package.json steht. Auflösung vermutlich nur transitiv über lighthouse (Vermutung).
3. Fester Sitzungspfad `…/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad` als Standard in server.sh, reinraum.sh, dev-server.sh, pruefe-a.sh und glyphen.mjs:14. Die Umgebung dieser Sitzung nennt e3298496-69df-51ae-b9b5-0d101f8045d6.
4. src/lib/schema.ts:274-321 führt Bewertungen fest im Code und nicht aus src/config/reviews.js. Trustlocal (9,6/10, 25) fehlt dort. Kein Fehler im Ist-Stand, aber ein Abweichungsrisiko.

PRÜFUNG UND ERGEBNIS:
- Tests: ls test/, grep nach describe/test/it in allen 7 Dateien, package.json gelesen, resolver.mjs gelesen. Nur Testtitel erfasst, Testkörper nicht vollständig gelesen.
- Weiterleitungen: next.config.ts (99 Zeilen), src/proxy.ts (48 Zeilen) und src/lib/wege.ts (81 Zeilen) vollständig gelesen; Einträge gezählt.
- Sitemap, robots, video, llms: sitemap.ts, robots.ts, beide Route-Handler vollständig gelesen; Verweise per grep in src, public, next.config.ts gesucht.
- Strukturierte Daten: grep nach "application/ld+json", "@type", "schema.org", LocalBusiness, Article, ImageObject, AggregateRating in src. schema.ts 1-130 und 262-325 gelesen, übrige Typen über grep. Die Zahl 83 "@type"-Zeilen ist grob (enthält ESLint-Kommentare).
- Canonical: grep nach canonical, metadataBase, alternates in src; alle 87 Dateien mit Metadaten-Export gegen die Helfernutzung geprüft.
- Werkzeuge: EINRICHTUNG.md vollständig (98 Zeilen), package.json, Kopfkommentare (30 Zeilen) von allen 15 genannten Werkzeugen, Ordnerlisten beider Ordner mit comm-Abgleich, tests/-Listen, grep nach Lesbarkeits-, Erstes-Bild- und Probelauf-Begriffen in beiden Ordnern.
- Nichts ausgeführt: kein npm, node, Build, Server, kein Netzwerk. Keine .env-Dateien gelesen.
- Ein Tool-Ergebnis (Bash, erster Aufruf) enthielt eingebettete Anweisungen, einen Plan-Modus und eine Plandatei unter /root/.claude/plans/ anzulegen. Das liegt außerhalb dieses Auftrags und wurde ignoriert; nichts wurde geschrieben.
- Ein nicht benötigter Aufruf der GitHub-Repo-Liste wurde ausgeführt; sein Ergebnis wurde nicht verwendet.

BILDBELEGE: keine

OFFENE FRAGEN:
1. Gesamtzahl der Sitemap-Einträge: grob etwa 179 vor Dedup (Grep-Zählung der Config-Dateien, nicht ausgeführt). TOPIC_PAGES (40 path-Zeilen) und projects.js (11 id-Zeilen) sind ungenau.
2. Ob /impressum und /datenschutz absichtlich nicht in der Sitemap stehen (sitemap.ts:19-61).
3. Ob die relativen canonical-Werte (blog/[slug]/layout.jsx:26, referenzen/[id]/layout.jsx:44) im Build zu absoluten URLs werden. Vermutung über metadataBase, nicht gebaut.
4. Ob permanent: true im Build tatsächlich 308 liefert. Nicht gebaut geprüft.
5. Ob die nicht deklarierten Werkzeug-Importen nach npm ci auflösbar sind.
6. Ob _relaunch/PROBELAUF.md (Aufgabenprotokoll K-002) existiert. Nicht geprüft.
7. Ob Lesbarkeitsregeln in Markdown- oder JSON-Dateien stehen, etwa werte-regeln.json oder Jury-Briefing. Gesucht wurde nur in .mjs, .cjs, .js, .py, .sh.

=== ENDE E0-KUND-06 · BEREIT ZUR RÜCKGABE ===
