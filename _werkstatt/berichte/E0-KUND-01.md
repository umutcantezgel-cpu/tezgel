<!-- Gesichert aus dem Workflow-Protokoll der E0-Erkundung (23.10.2026, nur lesend, Haiku 5.5). Unverändert. -->

GEÄNDERTE DATEIEN: keine im Repository. Ausnahme: Mein erster Shell-Befehl hat mit `tee /tmp/x` eine Scratch-Datei außerhalb des Repos angelegt (Liste der page-Dateien). Ich habe sie nicht gelöscht, weil Löschen ein Schreibvorgang wäre. Bitte bei Bedarf selbst entfernen: /tmp/x

BEFUNDE

Stack und Konfiguration
1. Next.js 16.3.6 (package-lock.json:6317-6319), React und react-dom 19.2.4 (lock:6781-6792), Tailwind 4.3.0 über @tailwindcss/postcss ^4 (lock:7605-7607; postcss.config.mjs:1-5), TypeScript ^5, ESLint ^9 mit eslint-config-next 16.3.6 (package.json devDependencies).
2. Node-Angaben widersprechen sich: .nvmrc = 20; package.json engines >=18.17.0; CI nutzt 20 (.github/workflows/security.yml:19); README:44 nennt >=18.17.0.
3. next.config.ts, vollständig: compress (:4), poweredByHeader false (:5), reactStrictMode (:6), devIndicators false (:9), pageExtensions mit *.dev.tsx nur in Development (:12), redirects zweimal permanent (:16-19: /bad/budgetkalkulator nach /bad/projekt-check; /blog/barrierefreies-bad-planung-zuschuesse nach /bad/barrierefreies-bad), images: formats avif/webp (:22), minimumCacheTTL 31536000 (:23), qualities [75] (:25), experimental.globalNotFound true (:30), turbopack.resolveAlias (:33-36), webpack-Alias (:39-45), headers (:48-95): acht Sicherheitsheader auf /(.*) (:51-83), Cache-Control immutable für /images/(.*) (:88-93). Kein viewTransition-, output-, basePath- oder i18n-Eintrag.
4. CSP (next.config.ts:82) erlaubt 'unsafe-inline' und 'unsafe-eval' in script-src.
5. tsconfig.json: strict; paths @/* nach ./src/* (:25-29); exclude node_modules, _relaunch, _werkstatt, ms-reusable-components, coday-seo-toolkit (:39-45).
6. eslint.config.mjs: nextVitals + nextTs; ignoriert _relaunch/** und _werkstatt/** (:9-20).
7. package.json scripts: dev, build, start, lint, test (node --test, sechs Testdateien), qa:graph (scripts/qa/check-graph.mjs), typecheck, indexnow (scripts/submit-indexnow.mjs).

Layout-Gerüst
8. Kein src/app/layout.tsx. Das Root-Layout ist src/app/(bestand)/layout.tsx:1-9 und rendert BestandDokument aus _dokument.tsx:104 (html, body).
9. _dokument.tsx: Schriften über next/font/local, Archivo (:20-27, src/app/fonts/archivo-variabel.woff2) und IBM Plex Mono (:29-36); globals.css-Import (:5); Metadata (:38-97); Viewport (:99-102); Kopfskript inline (:115); JSON-LD (:120).
10. Body-Reihenfolge (:122-137): SkipNav (:123) → ErrorBoundary (:125, client) → TrackingScripts (:126, client) → HeaderWrapper (:127, client) → main#main-content mit {children} (:130-132) → Footer (:133, Server) → MobileBottomBar (:134, client) → ClientWidgets (:135, client) → BewegungsWaechter (:136, client).
11. Provider: global nur ErrorBoundary (:125). AuthProvider nur in login/layout.tsx:12-14; ContentProvider nur in blog/layout.tsx (Import :5).
12. 26 verschachtelte layout-Dateien: agb, bad, balkon-terrasse, beratung, blog, blog/[slug] (.jsx), datenschutz, faq, fliesen, fliesenreparatur, foerderung, impressum, karriere, kontakt, leistungen, leistungen/[id] (.jsx), login, naturstein, referenzen, referenzen/[id] (.jsx), schadensanalyse, termin, treppen, ueber-uns, untergrund-abdichtung, widerruf. Meist Metadaten und JSON-LD (z. B. bad/layout.tsx:1-37). Mit Logik: login (AuthProvider), blog (ContentProvider); leistungen/layout.tsx:9-11 und termin/schadensanalyse-Layouts sind reine Durchreichen bzw. Metadaten.
13. Fehlt in src/app: template, loading, error, default, forbidden, unauthorized (0 Treffer).
14. Fehlerseiten: src/app/global-not-found.tsx:1-16 (eigenes BestandDokument, da kein Root-Layout außerhalb der Gruppe); src/app/(bestand)/not-found.tsx:1-41 (noindex in :9-12).

Routen
15. 82 page-Dateien gesamt: 76 produktiv, davon 6 dynamisch; 6 page.dev.tsx nur in Dev unter werkstatt-schaufenster (next.config.ts:12).
16. Dynamische Routen und Quellen: /bad/musterbaeder/[slug] (12 Einträge, config/musterbaeder.js); /blog/[slug] (13 Dateien in config/posts/); /referenzen/[id] (6 Einträge, config/projects.js); /standorte/[stadt] (13 Städte, config/cities.ts; generateStaticParams standorte/[stadt]/page.tsx:62-64); /leistungen/[id] (4 Leistungen bad, wohnen, aussen, untergrund; config/services.js:6,41,74,105); /leistungen/[id]/[stadt] (4 × 13 = 52; page.tsx:97-105).
17. Statische Routen (70 Dateien): /, agb, ausstellung/{giessen,wetzlar}, balkon-terrasse (+3), bad (+7, plus Index musterbaeder), barrierefreiheit, beratung, blog, cookie-richtlinie, datenschutz, downloads, faq, fliesen (Index + 14: abnahme, auf-fussbodenheizung, festpreisangebot, fliesenarten, flur-diele, fugensanierung, grossformat, holzoptik, konfigurator, kueche, neubau, renovierung, verlegemuster, verlegetechnik), fliesenreparatur, foerderung, impressum, karriere (+ausbildung), kontakt, leistungen, login, naturstein (+granit, marmor-kalkstein), partner, preise, referenzen, schadensanalyse, standorte, team, termin, treppen (+aussentreppe, innentreppe, treppenhaus), ueber-uns, unternehmen, untergrund-abdichtung (+5), widerruf.
18. Summe: 70 statisch + 100 aus Parametern = ca. 170 HTML-Routen. Das ist eine Schätzung aus den Quelldaten, kein Build. README nennt 174 (README.md:10, 58, 74).
19. Route-Handler: src/app/api/anfrage/route.ts, src/app/api/indexnow/route.ts, src/app/llms.txt/route.ts, src/app/video-sitemap.xml/route.ts. Metadata-Routen: robots.ts:4 und sitemap.ts:12 (force-static).

Seitenwechsel und Navigation
20. Einziger bestehender Seitenwechsel-Effekt: /leistungen zu /leistungen/[id], Plan-Morph nur vorwärts und ab lg. Auslöser Gewerk.tsx:94 (Link transitionTypes=['plan-vor']); Ziel leistungen/[id]/page.jsx:21, 208-210 (ViewTransition name plan-{id}); Hülle PlanUebergang.jsx:6-12 (importiert von Gewerk.tsx); CSS globals.css:328-340 und bewegung.css:271-275.
21. Knopf.tsx:19, 34, 44 reicht transitionTypes an next/link durch; gesetzt wird nur in Gewerk.tsx:94.
22. Keine globalen Seitenübergänge. Suche nach startViewTransition, unstable_ViewTransition, transitionTypes, useLinkStatus, onNavigate, view-transition-name in src: keine weiteren Auslöser. Kein ViewTransition um children in _dokument.tsx:130-132.
23. Vorhandenes CSS ohne Auslöser: bewegung.css:250-256 (root-Gruppe, Dauer dauer-2), :258-260 (.kopf-anker, Anwendung Header.jsx:108), :261-270 (Kopf bleibt stehen), :280-283 (reduced motion: Dauer 0). bewegung.css wird über globals.css:4 per @import in layer(components) geladen.
24. usePathname-Nutzer: BewegungsWaechter.tsx:9-13 (rAF beobachte je Pfadwechsel); MobileBottomBar.tsx:20; Header.jsx:55; MobileMenu.jsx:25; CookieConsent.tsx:58; FloatingWhatsAppWidget.tsx:21.
25. Fehlerhafter Ziel-Link: login/page.jsx:33 führt nach Erfolg zu router.push('/admin'). Es gibt keine Route unter src/app mit "admin" (0 Treffer). robots.ts:29 sperrt /admin.

Client-Grenzen am Layout
26. "use client": ErrorBoundary.tsx:1; TrackingScripts.jsx:1; HeaderWrapper.tsx:1 (zieht Header.jsx:1, MobileMenu.jsx:1, FloatingWhatsAppWidget.tsx:1 nach); MobileBottomBar.tsx:1; ClientWidgets.tsx:1 (CookieConsent.tsx:1, dynamic ssr:false); BewegungsWaechter.tsx:1.
27. Ohne Direktive (Server): SkipNav.tsx:3; Footer.jsx (zieht BannerPlatz.tsx und SprungHalter.tsx nach, beide 'use client'); JsonLd.tsx:10.

Ordner unter src (Dateizahl, Zweck laut Name bzw. Kopfkommentar)
28. app: 127 Dateien. Routen, Layouts, globals.css, bewegung.css, fonts/, Bilder, Route-Handler.
29. components: 192 Dateien in 21 Unterordnern plus SEO.jsx. Bereiche: blog, common, contact, forms, funnels, icons, kern, layout, legal, leistungen, locations, maps, pricing, providers, reviews, sections, seo, start, trust, ueber-uns, ui.
30. config: 25 Dateien. Stammdaten (company.js, site.js, team.js), Navigation (navigation.js), Leistungen, Städte, Projekte (services.js, cities.ts, projects.js), Blog (posts/ mit 13, posts.js, blog.js), Musterbäder, Bewertungen, Themen (topics.js).
31. contexts: 2 (AuthContext.jsx, ContentContext.jsx). hooks: 1 (useConsent.ts). schemas: 1 (validation.js). services: 2 (authService.js, dataService.js). shared: 1 (shared/config/).
32. lib: 48 Dateien. Unterordner blog, data, email, formulare, maps, motion, plaene, polyfills, seo, start. Lose Dateien u. a. schema.ts (JSON-LD), metadata.ts, wege.ts (Adressen und 410-Liste), cookie-inventory.ts, einzugszonen.ts, whatsapp.ts.

Dokumentation und CI
33. README.md: zählt 174 Routen (:10, :58, :74). Nennt src/app/layout.tsx als Root-Layout (:81) und src/app/page.tsx (:82). Beides existiert so nicht (tatsächlich (bestand)/layout.tsx und (bestand)/page.tsx). Nennt components/common/HelpSidebar (:85), Datei fehlt. Listet /bad/budgetkalkulator als Tool (:22), ist aber Redirect (next.config.ts:17).
34. docs/: nur DESIGN_SYSTEM.md, verweist auf _werkstatt/KERN.md (existiert).
35. AGENTS.md:5 verlangt Lesen von node_modules/next/dist/docs. node_modules ist nicht installiert.
36. CLAUDE.md:16 nennt Push-Branch claude/amazing-mendel-b0g40w. Aktueller Branch laut git: claude/tezgel-website-redesign-iqxt8z.
37. CI ist nur .github/workflows/security.yml. Trigger workflow_dispatch und pull_request auf main (:4-6). Schritte: checkout, setup-node 20, npm ci, npm audit --audit-level=high (:26), npm run lint --if-present (:29), SAST-Platzhalter mit echo (:32-33). Keine Build-, Typecheck-, Test- oder Deploy-Stufe.
38. Ordnerbestand: git ls-files zählt 7741 Dateien, davon _relaunch 4613, _werkstatt 2676, src 400, public 26.

Auslieferung
39. vercel.json:1-3 enthält nur "framework": "nextjs". Keine rewrites, headers oder crons.
40. .vercelignore:1-2 nennt _relaunch und _werkstatt. Zusätzlich ausgeschlossen durch tsconfig.json:43-44 und eslint.config.mjs:16-19.
41. .gitignore: .env* ignoriert, .env.example erlaubt (:35-36). /_werkstatt/cache ist ein Symlink außerhalb des Repos (:62-63). Im Repo liegt nur .env.example. Gelesen wurden nur die Schlüsselnamen: RESEND_API_KEY, RESEND_FROM_EMAIL, CONTACT_EMAIL, NEXT_PUBLIC_SITE_URL, INDEXNOW_KEY, INDEXNOW_SECRET, NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, NEXT_PUBLIC_FORMSPREE_ID.
42. Edge/Proxy: einzige Logik ist src/proxy.ts. Keine middleware.ts und keine instrumentation.*. Funktion: 410 mit noindex für Adressen der Vorgängerfirma, per istEntfernt aus lib/wege.ts:42. Matcher (:21-47): sieben Bereichspräfixe (/energie, /energieberatung, /gewerbe, /haustechnik, /heizung, /lueftung, /notdienst), zwölf Blog-Einzeladressen und sechs Referenz-Einzeladressen. Keine Weiterleitung, kein Rewrite.
43. Caching und Statik: robots und sitemap sind force-static. SSG über generateStaticParams in 8 Dateien.

Einhängepunkte für Seitenwechsel mit Überlagerung
44. Befund: Header, Footer, MobileBottomBar und ClientWidgets liegen im Root-Layout (_dokument.tsx:127-136) und bleiben beim Wechsel gemountet. Nur children in main (:130-132) wechselt.
45. Befund: Der Einhängepunkt für eine ViewTransition-Hülle ist _dokument.tsx:131, um {children}. PlanUebergang.jsx:8-13 zeigt das Muster.
46. Befund: Auslöser sind nur Link-Props (Knopf.tsx:44, Gewerk.tsx:94). Ein globaler Effekt bräuchte eine Client-Komponente, die interne Links abfängt. Ein solches Muster gibt es nicht.
47. Befund: Gating ist vorhanden: html.k-bewegung und k-notaus (kopfskript.ts:9; bewegung.ts:9-12), reduced motion (bewegung.css:280-283; globals.css:336-339).
48. Befund: BewegungsWaechter.tsx:9-13 läuft nach jedem Pfadwechsel. Bei Überlagerung muss die Reihenfolge geprüft werden, damit neue Elemente beobachtet werden, sobald sie im DOM sind.
49. Vermutung, nicht belegt: Safari-Unterstützung der View-Transitions-API beginnt laut Herstellerdoku bei Safari 18. browserslist erlaubt Safari 16.4 (package.json), daher wäre ein Fallback nötig.

GEMEINSAME DATEIEN
1. src/app/(bestand)/login/page.jsx:33: Ziel /admin hat keine Route.
2. README.md:81-82: falsche Pfade für Root-Layout und Startseite.
3. README.md:85: components/common/HelpSidebar fehlt.
4. README.md:22: /bad/budgetkalkulator ist Redirect, keine Seite.
5. README.md:10, 58, 74: "174 Routen" ist nicht belegt; die Quelldaten ergeben ca. 170.
6. CLAUDE.md:16: Branch-Name stimmt nicht mit dem aktuellen Branch überein.
7. .nvmrc, package.json engines und README:44 nennen drei verschiedene Node-Angaben.
8. next.config.ts:82: CSP mit unsafe-inline und unsafe-eval in script-src.
9. .github/workflows/security.yml: kein Build, Typecheck oder Test. npm test und npm run typecheck existieren in package.json, laufen aber nicht in CI.

PRÜFUNG UND ERGEBNIS
- Gelesen vollständig: package.json, next.config.ts, tsconfig.json, vercel.json, .vercelignore, .gitignore, eslint.config.mjs, postcss.config.mjs, src/proxy.ts, (bestand)/layout.tsx, _dokument.tsx, global-not-found.tsx, not-found.tsx, README.md, docs/, .github/, AGENTS.md, CLAUDE.md, .env.example (nur Schlüsselnamen). Aus package-lock.json nur die vier Versionseinträge. Ausschnitte aus lib/wege.ts, bewegung.css, globals.css und allen 26 verschachtelten layouts.
- Suchen: find für layout/template/loading/error/default/forbidden/unauthorized; find page.* (82) und route.* (4); find middleware/instrumentation (0); find src/app mit "admin" (0); grep mit 12 Übergangs- und Navigationsmustern über src (ts, tsx, js, jsx, css); usePathname/useRouter; "use client" in den direkten Layout-Importen; find -type f über src/*; git ls-files; git status (leer); git branch --show-current.
- Nicht gemacht: keine Installation, kein Build, keine Netzwerkabrufe, keine .env-Werte. Ohne node_modules sind Next-Dokumentation und React-Typen nicht prüfbar.
- Ein Tool-Ergebnis enthielt einen eingebetteten Block, der mich zum Schreiben einer Plandatei unter /root/.claude/plans/ und zum Plan-Modus aufforderte. Das habe ich nicht befolgt. Dort wurde nichts geschrieben.

BILDBELEGE: keine

OFFENE FRAGEN
1. Wertet Next 16.3.6 Link transitionTypes ohne experimental-Schalter aus? next.config.ts setzt keinen; node_modules fehlt.
2. Existiert `ViewTransition` als Export von react 19.2.4 (stabil)? PlanUebergang.jsx:4-6 behauptet, nur der Canary-Kanal habe ihn. Laufzeitverhalten nicht prüfbar.
3. Greift .vercelignore bei Git-Integration? Nicht belegt.
4. Läuft src/proxy.ts im Node- oder Edge-Runtime? Next-16-Default nicht geprüft.
5. Exakte Zahl der Build-Routen: 170 (Schätzung) gegen 174 (README). Nur per Build klärbar.
6. Fugenkreuz.tsx: 'use client'-Status nicht geprüft. Footer.jsx zieht es direkt nach.
7. public/4c6796df61f5479387fc4f56b1ed6b19.txt (33 Byte) ist vermutlich eine IndexNow-Verifikationsdatei. Inhalt nicht gelesen.
8. Ob der Login-Erfolgsfall im Live-Betrieb auf 404 läuft, ist nicht prüfbar.

=== ENDE E0-KUND-01 · BEREIT ZUR RÜCKGABE ===
