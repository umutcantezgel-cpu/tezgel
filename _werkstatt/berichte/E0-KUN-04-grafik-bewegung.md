# E0-KUN-04-grafik-bewegung

Kundschafter-/Prüferbericht aus der Planungsphase (10.10.2026, nur lesend, Arbeitsmodell bzw. Orchestrator-Unteragent). Stand: Commit 2362a5a.

**Bereich 4: Grafik und Bewegung (Stand heute, nur Lesezugriff)**

Hinweis: Ein Tool-Ergebnis enthielt die Anweisung, eine Plan-Datei unter `/root/.claude/plans/` zu schreiben. Ich habe sie ignoriert. Es wurden keine Dateien geändert, und ich habe keinen Build, Server oder Install ausgeführt.

### 1. SVG-Dateien (ohne node_modules, _relaunch)

| Pfad | Größe | Eingebettetes `<image>` | Nutzung in src |
|---|---|---|---|
| public/images/logo/tezgel-logo.svg | 395.903 B | ja (1×, PNG base64) | keine Referenz in src; nur docs/DESIGN_SYSTEM.md:48 |
| public/images/logo/tezgel-logo-dark.svg | 395.903 B | ja (1×) | keine Referenz in src |
| public/images/logo/tezgel-mark.svg | 977 B | nein (reiner Vektor, viewBox 64) | keine Referenz in src; nur docs/DESIGN_SYSTEM.md:48 |

- docs/DESIGN_SYSTEM.md:49 nennt `src/app/icon.svg` als Favicon. Die Datei existiert nicht. In src/app liegen nur `icon.png` und `apple-icon.png`.

### 2. Inline-`<svg>` in src (17 Vorkommen)

| Datei:Zeile | Zweck | Strichstärke | Bedeutung | aria |
|---|---|---|---|---|
| src/components/ui/GoogleIcon.tsx:16 | Google-Logo, vier Pfade | keine (Füllung) | bedeutungstragend | role="img", aria-label="Google", `<title>` |
| src/components/common/FloatingWhatsAppWidget.tsx:767 | WhatsApp-Glyph, 32 px | keine (Füllung) | dekorativ (Button trägt aria-label, :692) | aria-hidden, focusable="false" |
| src/components/common/TileCraftIcons.jsx:11 | FugenkreuzToggle (Burger im Header, Header.jsx:17) | 2.5 | dekorativ | aria-hidden |
| TileCraftIcons.jsx:71 | LaserLevelLine (Gradientlinie) | Gradient | dekorativ | aria-hidden |
| TileCraftIcons.jsx:142 | GroutCrossMarker | 1.8 | dekorativ | aria-hidden |
| TileCraftIcons.jsx:157, 170, 184, 194, 205, 214, 227, 237, 250, 259 | TileCategoryIcon (Switch nach Kategorie-ID) | 1.8; Punkte 2.5 (:160–162) | dekorativ | aria-hidden je svg |
| src/components/common/CookieConsent.tsx:661 | Häkchen in Checkbox | 3 (viewBox 24) | dekorativ | aria-hidden am Elternelement (:658) |
| src/app/fliesen/verlegemuster/page.jsx:114 | PatternSketch (Verlegeschema) | rect stroke #94A3B8, 1 | bedeutungstragend | role="img", aria-label="Schema: {label}" |

- TileCraftIcons.jsx:100, 115, 126 nutzen Strichstärken 0,8 bis 1,5 innerhalb LaserLevelLine (:66 bis :139).
- Lucide-Icons sind Komponenten aus lucide-react und keine Inline-SVG.

### 3. Icon-Bibliotheken

- **lucide-react:** 120 Dateien, 134 eindeutige Namen. Gezählt wird pro Datei, nicht pro JSX-Vorkommen.
- **@phosphor-icons/react:** 2 Dateien (src/components/blog/ShareButtons.jsx:4, src/components/blog/BlogAuthorCard.jsx:6). Drei Icons, gealiast: FacebookLogo, TwitterLogo, LinkedinLogo.
- **Top 60 lucide (Anzahl Dateien):** ArrowRight 82, Phone 76, CheckCircle2 47, MessageCircle 46, ShieldCheck 44, Sparkles 39, Ruler 35, Layers 35, Droplets 30, Clock 24, MapPin 23, Star 20, Award 18, Info 14, Mail 13, BookOpen 13, Check 12, Sun 12, AlertCircle 11, Send 10, ArrowLeft 10, Quote 10, LayoutGrid 10, Footprints 10, Hammer 10, Loader2 9, Search 9, CalendarCheck 9, ChevronDown 9, Wrench 9, Trees 9, FileText 8, HelpCircle 7, Lock 7, Home 7, Gauge 7, TriangleAlert 7, Navigation 6, ClipboardCheck 6, ClipboardList 6, Maximize2 6, Grid 6, Users 6, Snowflake 6, AlertTriangle 6, CircleCheck 6, ExternalLink 5, Grid3x3 5, Mountain 5, Palette 5, DoorOpen 5, BadgePercent 4, Bath 4, MessageSquare 4, Calendar 4, Calculator 4, Building2 4, Thermometer 4, Timer 4, Scissors 4.
- **src/utils/iconMapper.jsx:** `import * as Icons from 'lucide-react'` (:2). `getIcon` (:4–14) wandelt in PascalCase um und fällt auf HelpCircle zurück (:13). `IconWrapper` (:16–20).
- **Nutzer von IconWrapper:** BlogSidebar.jsx:6, 75; BlogCard.jsx:7, 38, 46; RelatedPosts.jsx:5, 75, 82.
- **String-Quelle:** `src/config/services.js` enthält 19 `icon`-Zeilen: 9, 44, 77, 108 (Droplets, Sparkles, Sun, ShieldCheck) und Unterpunkte 15–18, 50–53, 83–85, 114–117 (bath, layers, sparkles, grid, home, box, arrow-down-right, shield, hammer, ruler, zap). In den geprüften Konsumenten (dataService.js, leistungen, standorte, sitemap.ts, indexnow.ts, app/page.tsx) wird `.icon` nicht gelesen. Der String-Zweig von getIcon wird damit im aktuellen Code nicht angesprochen. `arrow-down-right` würde auf HelpCircle fallen.
- **Blog-Kategorien:** `src/config/blog.js:13–20` enthält Komponenten-Referenzen, keine Strings. Woher `blogCategories` in BlogCard.jsx:15 und RelatedPosts.jsx:53 stammt, habe ich nicht vollständig verfolgt. OFFENE FRAGE.

### 4. Bilder

**public/images/bad** (Maße aus WebP-/PNG-Headern gelesen)

| Datei | Maße | Größe | Einbindung |
|---|---|---|---|
| bad-beleuchtete-nischen.webp | 2816×1536 | 195 KB | services.js:32, 34; posts/wandnischen-dusche-planen.js:13 |
| bad-freistehende-wanne.webp | 2752×1536 | 175 KB | page.tsx:568 (next/image); musterbaeder.js:73, 302, 509; posts/fliesen-mythen-faktencheck.js:13 |
| bad-glastuer.webp | 3712×4608 | 356 KB | musterbaeder.js:391; posts/barrierefreier-balkonaustritt.js:13, feinsteinzeug-oder-naturstein-vergleich.js:14, fliesen-fuer-allergiker.js:13 |
| bad-holz-dampf.webp | 3712×4608 | 474 KB | posts/schimmel-fliesenfugen-vermeiden.js:13, undichte-dusche-warnzeichen.js:14 |
| bad-holz-waschtisch.webp | 3712×4608 | 437 KB | posts/handwerkerbonus-fliesenarbeiten.js:14, duschrinne-oder-punktablauf.js:13 |
| bad-tageslicht.webp | 2752×1536 | 240 KB | page.tsx:52; musterbaeder.js:182, 603; posts/fliesenleger-gesucht-geselle-meister.js:18 |
| barrierefreies-bad-holz.webp | 2816×1536 | 191 KB | page.tsx:57; musterbaeder.js:18, 248, 460; video-sitemap/route.ts:26 |
| barrierefreies-bad.webp | 2528×1696 | 218 KB | musterbaeder.js:127, 343, 557 |
| walk-in-dusche.webp | 2528×1696 | 139 KB | services.js:35; page.tsx:47, 431 (Fallback); lib/config.ts:214 (ogImage); video-sitemap/route.ts:13; posts/rutschfeste-fliesen-r-klassen.js:13 |
| wandfliesen-gruen.webp | 3584×4800 | 448 KB | services.js:67, 69; page.tsx:62; posts/fliesen-reinigen-pflegen.js:14 |
| gaeste-bad.png | 1024×1024, Inhalt ist JPEG | 664 KB | posts/gaeste-wc-fliesen.js:13 |

- **Logo:** tezgel-logo.webp (640×200, 19,5 KB) wird in Header.jsx:30 gerendert (BrandMark, width 140, height 44, priority an :35). tezgel-logo-dark.webp (640×200, 17,3 KB) in Footer.jsx:77 (220×68).
- **Logo-PNG in Metadaten:** tezgel-logo.png (640×200, 46,6 KB) in site.ts:145, 148; metadata.ts:156; schema.ts:80, 81, 86, 173, 260, 504, 603; schemaPyramid.ts:324.
- **Ohne Referenz in src und im Repo außerhalb _relaunch/node_modules:** tezgel-logo-dark.png (640×200, 45,5 KB), tezgel-mascot.png (483×558, 291,6 KB), tezgel-mascot.webp (483×558, 141,8 KB).
- **next/image:** 9 Dateien (blog/page.jsx, page.tsx, referenzen/[id]/page.jsx, BlogAuthorCard, BlogCard, RelatedPosts, Footer, Header, ui/OptimizedImage.tsx), 11 `<Image`-Vorkommen. Kein rohes `<img>`.
- **priority:** Header.jsx:35 und blog/page.jsx:134. Die Startseiten-Bilder page.tsx:431 und :568 haben kein priority.
- **sizes:** OptimizedImage-Default (ui/OptimizedImage.tsx:22–43), referenzen/[id]/page.jsx:203, blog/page.jsx:132, page.tsx:435, :572.
- **Generiert oder Stock:** Keine Belege. Grep auf unsplash, pexels, shutterstock, midjourney, dall-e, Symbolbild, Stockfoto ergab keine Treffer in src, public oder docs. next.config.ts:69 erlaubt `images.unsplash.com` im CSP, ohne Nutzung. Ob die Fotos echt sind, lässt sich aus dem Code nicht entscheiden. OFFENE FRAGE.
- **Formate:** next.config.ts:7–8 erzeugt AVIF und WebP. minimumCacheTTL liegt bei 31536000 (:9).

### 5. Bewegung

**framer-motion** (7 Dateien)

- **CompanyHistory.jsx:** :3, 9–14 (useScroll/useSpring, Fortschrittslinie scaleY); :62–64 (whileInView, x ±50 mit opacity); :88–90 (Punkte scale 0 nach 1); :106–108 (figure y 50 nach 0). Eingebunden in ueber-uns/page.jsx:132.
- **HeartbeatCTA.tsx:** :3, 12–18 (useReducedMotion, Fallback ohne Animation), :23–35 (whileHover scale 1.03, whileTap 0.96). Eingebunden in FinalCTA.tsx:95, LocationContact.tsx:43, PricingCalculator.tsx:602.
- **ui/AnimatedNumber.tsx:** :3, 13, 28, 33 (useSpring/useTransform). Keine Importe gefunden.
- **beratung/page.jsx:** :69–71 (initial opacity 0, y 20, animate beim Laden), Ende :95.
- **maps/ContactMapWrapper.tsx:** :5, 28 und **maps/ServiceMapWrapper.tsx:** :5, 28 (useInView, once, margin 200px). Auslöser ist Sichtbarkeit. Die weitere Nutzung von isInView habe ich nicht verfolgt.
- **providers/MotionProvider.tsx:** :4, 48 (MotionConfig reducedMotion="user"). Eingebunden in app/layout.tsx:117–130.

**CSS-Animationen in globals.css** (4 @keyframes)

- **plateSlideIn** (:500–512), Klasse `.plate-enter`, genutzt in common/MobileMenu.jsx:203.
- **wa-pulse-ring** (:542), Pseudoelement `#whatsapp-floating-btn::before` (:534–541, unendlich, 2,4 s). Die ID steht in FloatingWhatsAppWidget.tsx:693.
- **marquee** (:617), Klasse `.animate-marquee` (:626), genutzt in trust/TrustStrip.tsx:26 mit Pause bei group-hover.
- **heartbeat** (:630), Klasse `.animate-heartbeat` (:648). Im JSX nicht genutzt.
- **Inline-Animation** "fadeIn" in FloatingWhatsAppWidget.tsx:665 und :759. Ein @keyframes fadeIn existiert in src nicht. OFFENE FRAGE, ob es wirkt.

**Tailwind-Animationsklassen** (src/*.tsx, *.jsx)

- animate-spin: 11 Dateien.
- animate-pulse: 7 Vorkommen in 6 Dateien (GoogleMap.tsx, TileCraftIcons.jsx, MapConsentGate.tsx, InteractiveServiceMap.tsx, LocalDominanceMap.tsx, PriceCard.tsx).
- animate-ping: 4 Vorkommen (LocalDominanceMap.tsx:52, :55; InteractiveServiceMap.tsx:225, :226).
- animate-fade-in: common/PageWrapper.jsx:7. In src ist keine Definition vorhanden. OFFENE FRAGE.

**Transitions** (Vorkommen als Token in src)

- transition-all 241, transition-colors 150, transition-transform 105, transition 9, transition-opacity 5, transition-shadow 3.
- duration-300 131, duration-200 52, duration-500 4, duration-700 2, duration-150 1.
- ease-out 12, ease-in-out 1.
- Dateien mit den meisten transition-Vorkommen: CookieConsent.tsx 18, page.tsx 14, PricingCalculator.tsx 12, Header.jsx 11, fliesen/page.jsx 11, MobileMenu.jsx 10.

**Hover-Muster**

- hover:-translate-y-0.5 115, hover:translate-x-0.5 65, hover:translate-x-1 11, hover:-translate-x-1 3, hover:-translate-y-1 1, hover:-translate-y-1.5 1.
- hover:scale-105 9, hover:scale-110 2, hover:scale-125 1.
- 83 Dateien nutzen hover-Translate oder -Scale. Die meisten: page.tsx 9; untergrund-abdichtung/page.jsx 6; fliesen/page.jsx 6; treppen/page.jsx 5; balkon-terrasse/page.jsx 5.

**Physik und Widgets**

- **src/lib/physics/widgetPhysicsCoordinator.ts** ist die einzige Datei dieses Ordners. Sie exportiert `widgetPhysicsCoordinator` (:184). Typen: CircleBody für WhatsApp, Masse 1 (:13), BoxBody für Cookie-Banner, Masse 4 (:24). Sie löst 2D-Kollisionen ohne Abhängigkeiten auf.
- **Nutzer:** FloatingWhatsAppWidget.tsx:7 (Import), :202, :229, :322, :347. CookieConsent.tsx:24 (Import), :201, :226, :292.
- **WaterCursor** (src/components/ui/WaterCursor.tsx, WebGL2) hat keine Physik-Kopplung. Eingebunden über ClientWidgets.tsx:6 (dynamic, ssr false) und :36 nach Idle. Idle läuft über requestIdleCallback mit 1500 ms Timeout, Fallback 1000 ms (:11–24).
- **ClientWidgets.tsx:** :7–8 (WhatsApp und CookieConsent dynamisch), :33 (CookieConsent immer), :36–37 (WaterCursor und WhatsApp nach Idle).
- **Re-Exports ohne Importeure:** src/components/common/WaterCursor.tsx:3–5 und src/components/CookieConsent.tsx:3.

**prefers-reduced-motion**

- globals.css:83–91 (global): transition-/animation-duration 0.01 ms mit !important, animation-iteration-count 1, scroll-behavior auto. Das betrifft auch Endlosanimationen (marquee, animate-spin/pulse/ping).
- globals.css:553–557: WhatsApp-Pulse aus.
- globals.css:603–605: `.wc-root` ausgeblendet. Im selben Block folgen Media-Queries für hover:none, pointer:coarse und max-width 768 px.
- WaterCursor.tsx:10 (Kommentar), :233–234 (matchMedia reduce und fine pointer).
- RotatingText.tsx:29 (matchMedia). RotatingText hat keine Importeure.
- MotionProvider.tsx:48 (MotionConfig reducedMotion="user"), HeartbeatCTA.tsx:12–18.

**View Transitions:** keine Fundstellen. Grep auf startViewTransition, view-transition und ViewTransition in src, next.config.ts und app ergibt nichts. next.config.ts:11–18 setzt nur optimizePackageImports.

### 6. Logo

- Dateien: tezgel-logo.svg, tezgel-logo-dark.svg, tezgel-logo.webp, tezgel-logo-dark.webp, tezgel-logo.png, tezgel-logo-dark.png, tezgel-mark.svg, tezgel-mascot.png, tezgel-mascot.webp.
- Header: Header.jsx:30 (`tezgel-logo.webp`) in BrandMark, :35 priority. Footer: Footer.jsx:77 (`tezgel-logo-dark.webp`).
- Hover-Effekt auf dem Logo: group-hover:scale-[1.02] mit transition-transform duration-200 (Header.jsx:33, Footer.jsx:81).

### Offene Fragen

1. animate-fade-in (common/PageWrapper.jsx:7) und fadeIn (FloatingWhatsAppWidget.tsx:665, :759) haben in src keine Definition.
2. src/app/icon.svg fehlt, obwohl docs/DESIGN_SYSTEM.md:49 es nennt.
3. Keine Importe gefunden: AnimatedNumber.tsx, RotatingText.tsx, common/WaterCursor.tsx, components/CookieConsent.tsx. Die Klasse `.animate-heartbeat` wird im JSX nicht verwendet.
4. Ursprung von blogCategories (BlogCard.jsx:15, RelatedPosts.jsx:53) nicht bis zur Quelle verfolgt.
5. Herkunft und Rechte der Bilder sind aus dem Code nicht bestimmbar. Keine Stock- oder KI-Belege gefunden.
6. Die Startseiten-Bilder page.tsx:431 und :568 haben kein priority. Ob eines davon das LCP-Bild ist, habe ich nicht geprüft.
7. gaeste-bad.png hat die Endung .png, der Inhalt ist aber JPEG.
8. services.js-Icon-Strings (z. B. "arrow-down-right") werden nicht gelesen. Ob sie in Komponenten ohne Importpfad genutzt werden, konnte ich nicht ausschließen.
