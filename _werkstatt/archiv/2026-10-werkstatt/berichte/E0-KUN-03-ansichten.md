# E0-KUN-03-ansichten

Kundschafter-/Prüferbericht aus der Planungsphase (10.10.2026, nur lesend, Arbeitsmodell bzw. Orchestrator-Unteragent). Stand: Commit 2362a5a.

## Bereich 3: Ansichten, Abläufe, Inhalte

**Methode:** Zeilen per `wc -l`. Datei relativ zu `src/app/<Route>/page.jsx`; `†` = `page.tsx`. Komponenten aus `@/components`-Imports und Tag-Nutzung per Grep. Abschnittsfolge aus `<section>`-Labels, Überschrift-IDs und Komponenten-Tags abgeleitet. Ich habe nicht jeden Block einzeln gelesen, daher sind die Kürzel grob.

**Legende:** H Hero (`ceramic-hero`) · I Inhaltsabschnitt (Karten/Liste/Text) · P Prozess · T Tabelle · K Kundenstimme · R Ratgeber-Linkliste · FAQ · F Formular/Funnel/Konfigurator · CTA Abschluss-Block · QP QualityPromise · FC FinalCTA · KA Karte · TXT Fließtext ohne `<section>` · Typ: E Erzähl, A Arbeit, ? OFFENE FRAGE. Komponenten: FK FliesenKonfigurator, FB BadanfrageFunnel, TAF TezgelAnfrageFunnel, PC PricingCalculator, BPC BadProjektCheck, JL JsonLd, FQ FAQAccordion, KAL Kalender/Calendly.

### 1. Tabelle aller 76 Seiten

| # | Route | Datei | Zeilen | Komp. | Abschnittsfolge | Typ |
|---|---|---|---|---|---|---|
| 1 | /agb | agb | 84 | – | TXT | A |
| 2 | /ausstellung/giessen | ausstellung/giessen | 251 | QP | P · I · QP | E |
| 3 | /ausstellung/wetzlar | ausstellung/wetzlar | 250 | QP | P · I · QP | E |
| 4 | /bad | bad | 193 | BPC FB FC | H · I · I · BPC · FB · FC | E |
| 5 | /bad/badanfrage | bad/badanfrage | 39 | FB QP | F · QP | ? |
| 6 | /bad/badplaner | bad/badplaner | 152 | FB | H · I · F | ? |
| 7 | /bad/badsanierung | bad/badsanierung | 138 | FB QP | H · I · QP · F | E |
| 8 | /bad/bad-aus-einer-hand | bad/bad-aus-einer-hand | 137 | FB QP | H · I · QP · F | E |
| 9 | /bad/barrierefreies-bad | bad/barrierefreies-bad | 162 | FB | H · I · I · F | E |
| 10 | /bad/fliesen | bad/fliesen | 169 | FB | H · I · P · K · F | E |
| 11 | /bad/musterbaeder | bad/musterbaeder | 131 | – | H · I | E |
| 12 | /bad/musterbaeder/[slug] | bad/musterbaeder/[slug] | 178 | FB | H · I · F | E, DYN |
| 13 | /bad/projekt-check | bad/projekt-check | 40 | BPC QP | BPC · QP | A |
| 14 | /balkon-terrasse | balkon-terrasse | 381 | QP FC | H · I×5 · QP · FC | E |
| 15 | /balkon-terrasse/balkonsanierung | balkon-terrasse/balkonsanierung | 379 | QP | H · I · I · P · I · CTA · QP | E |
| 16 | /balkon-terrasse/stelzlager | balkon-terrasse/stelzlager | 379 | QP | H · I×4 · CTA · QP | E |
| 17 | /balkon-terrasse/terrassenplatten | balkon-terrasse/terrassenplatten | 354 | QP | H · I×3 · CTA · QP | E |
| 18 | /barrierefreiheit | barrierefreiheit | 87 | – | TXT | ? |
| 19 | /beratung | beratung | 225 | KAL FC | TXT · KAL · FC | A |
| 20 | /blog | blog | 217 | QP | Liste · Sidebar · QP | A |
| 21 | /blog/[slug] | blog/[slug] | 257 | QP | TXT · TOC · Teilen · Autor · Verwandte · QP | A, DYN |
| 22 | /cookie-richtlinie | cookie-richtlinie | 84 | – | TXT | A |
| 23 | /datenschutz | datenschutz | 127 | – | TXT | A |
| 24 | /downloads | downloads | 113 | QP | Liste · QP | A |
| 25 | /faq | faq | 224 | PC FC QP | FAQ · PC · QP · FC | A |
| 26 | /fliesen | fliesen | 422 | FK QP FC | H · I×5 · R · FK · QP · FC | E |
| 27 | /fliesen/abnahme | fliesen/abnahme | 365 | QP | H · I · I · T · I · R · QP | E |
| 28 | /fliesen/auf-fussbodenheizung | fliesen/auf-fussbodenheizung | 243 | FK QP | H · I · I · R · FK · QP · CTA | E |
| 29 | /fliesen/festpreisangebot | fliesen/festpreisangebot | 307 | FK QP | H · I×4 · R · QP · FK | ? |
| 30 | /fliesen/fliesenarten | fliesen/fliesenarten | 362 | FK QP | H · I · T · I · I · R · FK · QP · CTA | E |
| 31 | /fliesen/flur-diele | fliesen/flur-diele | 269 | FK QP | H · I×3 · R · QP · FK | E |
| 32 | /fliesen/fugensanierung | fliesen/fugensanierung | 320 | QP | H · I×5 · K · R · QP | E |
| 33 | /fliesen/grossformat | fliesen/grossformat | 374 | FK QP | H · I×4 · FAQ · R · FK · QP · CTA | E |
| 34 | /fliesen/holzoptik | fliesen/holzoptik | 313 | FK QP | H · I×3 · R · FK · QP · CTA | E |
| 35 | /fliesen/konfigurator | fliesen/konfigurator | 345 | FK QP | H · P · FK · I×3 · FAQ · R · QP | A |
| 36 | /fliesen/kueche | fliesen/kueche | 317 | FK QP | H · I · I · I · K · R · FK · QP · CTA | E |
| 37 | /fliesen/neubau | fliesen/neubau | 297 | FK QP | H · P · I×3 · R · QP · FK | E |
| 38 | /fliesen/renovierung | fliesen/renovierung | 316 | FK QP | H · I · P · I×3 · R · QP · FK | E |
| 39 | /fliesen/verlegemuster | fliesen/verlegemuster | 450 | FK QP | H · I×4 · R · FK · QP · CTA | E |
| 40 | /fliesen/verlegetechnik | fliesen/verlegetechnik | 366 | FK QP | H · I×5 · R · FK · QP | E |
| 41 | /fliesenreparatur† | fliesenreparatur | 348 | QP | H · I×4 · K · F · R · QP | E |
| 42 | /foerderung | foerderung | 163 | TAF QP FC | TXT · QP · F · FC | ? |
| 43 | /impressum | impressum | 129 | – | TXT | A |
| 44 | /karriere | karriere | 189 | QP | TXT · QP | E |
| 45 | /karriere/ausbildung | karriere/ausbildung | 100 | QP | TXT · QP | E |
| 46 | /kontakt | kontakt | 170 | TAF FC (+Karte, Kalender) | KA · KAL · F · FC | A |
| 47 | /leistungen | leistungen | 265 | JL PC TAF FC | Kacheln · PC · F · FC | E |
| 48 | /leistungen/[id] | leistungen/[id] | 420 | JL PC TAF FQ FC | H · I · PC · F · FQ · FC | E, DYN |
| 49 | /leistungen/[id]/[stadt] | leistungen/[id]/[stadt]† | 410 | JL QP FC | I · P · I · QP · FC | E, DYN |
| 50 | /login | login | 130 | – (PageWrapper) | F | A |
| 51 | /naturstein | naturstein | 480 | QP FC | H · I×5 · T · CTA · QP · FC | E |
| 52 | /naturstein/granit | naturstein/granit | 361 | QP | H · I×4 · CTA · QP | E |
| 53 | /naturstein/marmor-kalkstein | naturstein/marmor-kalkstein | 391 | QP | H · I×5 · CTA · QP | E |
| 54 | / | page.tsx† | 710 | TAF(dyn) PC FQ FC | H · Vertrauen · I · PC · I · Ablauf · I · Bewertungen · KA · FQ · F | E |
| 55 | /partner | partner | 71 | QP | TXT · QP | E |
| 56 | /preise | preise | 231 | PC FQ FC | PC · Preiskarten · FQ · FC | A |
| 57 | /referenzen | referenzen | 192 | FC (+ReviewsSection) | I · K · CTA | E |
| 58 | /referenzen/[id] | referenzen/[id] | 331 | QP | H · BILD · I×3 · QP | E, DYN |
| 59 | /schadensanalyse | schadensanalyse | 455 | JL | H · I×3 · P · I×3 · FQ · R · CTA | E |
| 60 | /standorte | standorte | 233 | JL FC | H · KA · I · KA · Kontakt · FC | E |
| 61 | /standorte/[stadt] | standorte/[stadt]† | 345 | JL QP FC | H · KA · KA · I · I · Kontakt · QP · FC | E, DYN |
| 62 | /team | team | 102 | QP FC | TXT · QP · FC | E |
| 63 | /termin | termin | 473 | KAL FC | F · KAL · FC | A |
| 64 | /treppen | treppen | 369 | QP FC | H · I×5 · R · QP · FC | E |
| 65 | /treppen/aussentreppe | treppen/aussentreppe | 311 | QP | H · I×5 · R · QP | E |
| 66 | /treppen/innentreppe | treppen/innentreppe | 305 | QP | H · I×3 · K · R · QP | E |
| 67 | /treppen/treppenhaus | treppen/treppenhaus | 278 | QP | H · I×4 · R · QP | E |
| 68 | /ueber-uns | ueber-uns | 143 | QP FC | TXT · Zeitleiste · QP · FC | E |
| 69 | /unternehmen | unternehmen | 121 | QP FC | TXT · QP · FC | E |
| 70 | /untergrund-abdichtung | untergrund-abdichtung | 394 | QP FC | H · I×6 · QP · FC | E |
| 71 | /untergrund-abdichtung/ausgleich-gefaelle | untergrund-abdichtung/ausgleich-gefaelle | 406 | QP | H · I×6 · FAQ · CTA · QP | E |
| 72 | /untergrund-abdichtung/din-18534 | untergrund-abdichtung/din-18534 | 423 | QP | H · I×5 · FAQ · CTA · QP | E |
| 73 | /untergrund-abdichtung/entkopplung | untergrund-abdichtung/entkopplung | 359 | QP | H · I×4 · FAQ · CTA · QP | E |
| 74 | /untergrund-abdichtung/estrich-belegreife | untergrund-abdichtung/estrich-belegreife | 448 | QP | H · I×6 · FAQ · CTA · QP | E |
| 75 | /untergrund-abdichtung/fliesen-auf-fliesen | untergrund-abdichtung/fliesen-auf-fliesen | 380 | QP | H · I×5 · FAQ · CTA · QP | E |
| 76 | /widerruf | widerruf | 140 | – (SEO) | TXT | A |

Die Zeilenangaben der Dateien mit `DYN` sind Quelltext-Zeilen, die erzeugten Seiten stehen in Abschnitt 4.

### 2. Vorlagen-Familien

- **Fliesen-Unterseiten** (`/fliesen/*`, 13 Seiten + Hub): H → 2–5 I (Eyebrow + h2 + Karten/Liste) → optional K, P, T → R → Konfigurator-Abschnitt (`<section id="konfigurator" aria-label="Fliesen-Konfigurator">`, Beleg `fliesen/kueche/page.jsx:282`) → QP (`:286`) → CTA (`:289`). Abweichungen: `/fliesen/abnahme` ohne FK und CTA; `/fliesen/fugensanierung` ohne FK; `/fliesen/konfigurator` mit FK in der Mitte; Reihenfolge QP/FK uneinheitlich (`flur-diele:262/264`, `holzoptik:278/282`).
- **Bad-Funnel-Seiten** (8 mit FB): H → I → Abschnitt `aria-label="Badanfrage"` mit FB → QP. QP vor FB in `bad-aus-einer-hand` (`:130`/`:133`) und `badsanierung` (`:130`/`:134`), nach FB in `badanfrage` (`:34`/`:36`). QP fehlt in `badplaner`, `barrierefreies-bad`, `bad/fliesen`, `musterbaeder/[slug]`.
- **Untergrund-Unterseiten** (5): H → 4–6 I (`details` in 4 Seiten, T in 3) → FAQ-Abschnitt (`faq-heading`, 9 Seiten gesamt) → CTA (`cta-heading`) → QP am Seitenende. Hub `/untergrund-abdichtung` hat FC statt CTA-Abschnitt.
- **Balkon/Terrasse** (3 + Hub): H → 3–4 I → CTA → QP. Hub mit FC.
- **Naturstein** (2 + Hub): H → I×3–5 → CTA → QP; Hub zusätzlich FC.
- **Treppen** (3 + Hub): H → I×3–5 → R → QP; Innentreppe mit K und T.
- **Dynamische Erzählvorlagen:** `/leistungen/[id]` und `[id]/[stadt]`, `/standorte/[stadt]`, `/bad/musterbaeder/[slug]`, `/referenzen/[id]`, `/blog/[slug]`.
- **Nur-Text-Rechtsseiten** (6): `agb`, `barrierefreiheit`, `cookie-richtlinie`, `datenschutz`, `impressum`, `widerruf`. Kein `<section>`-Element, daher TXT.
- **Kurzseiten mit QP** (ausstellung ×2, karriere ×2, partner, team, unternehmen, ueber-uns, downloads): TXT/I plus QP, teils FC.

**Wiederholte Inline-Muster** (grep über alle Seiten):
- `ceramic-hero rounded-tile-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden`: 67 Seiten, Hero und CTA identisch (`fliesen/kueche/page.jsx:75` und `:292`).
- `text-center max-w-3xl mx-auto mb-12` als Abschnittskopf: 85 Treffer.
- `grid grid-cols-1 md:grid-cols-3 gap-6`: 28 Treffer.
- `span className="eyebrow eyebrow-orange …"`: 33 Seiten (z. B. `fliesen/kueche/page.jsx:101`).
- `glass-surface rounded-tile-xl p-8`: 16 Treffer.
- `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10`: 57 Treffer.
- Kundenstimme (`aria-label="Kundenstimme"`, figure/blockquote): 5 Seiten.
- Ratgeber-Linkliste: 34 Seiten mit `ratgeber`-ID, `glass-surface-subtle` auf 7.
- Extrahierbare Bausteine nach Häufigkeit: Hero/CTA-Block, Abschnittskopf, Ratgeber-Liste, FAQ-Abschnitt, Konfigurator-Wrapper.

### 3. Gemeinsame Bausteine (`src/components`) nach Nutzung

- **sections/QualityPromise** (53): Pfade in Tabelle Spalte „Komp.“.
- **seo/JsonLd** (28): 22 `layout.*` plus 6 Seiten (`leistungen`, `leistungen/[id]`, `leistungen/[id]/[stadt]`, `schadensanalyse`, `standorte`, `standorte/[stadt]`).
- **ui/FinalCTA** (22): alle Seiten mit FC in Tabelle.
- **funnels/FliesenKonfigurator** (13): alle `/fliesen/*` mit FK.
- **funnels/BadanfrageFunnel** (8): alle `/bad/*`-Funnel-Seiten plus `musterbaeder/[slug]`.
- **funnels/TezgelAnfrageFunnel** (5): `foerderung`, `kontakt`, `leistungen`, `leistungen/[id]`, `page.tsx`.
- **pricing/PricingCalculator** (5): `faq`, `leistungen`, `leistungen/[id]`, `page.tsx`, `preise`.
- **ui/FAQAccordion** (3): `leistungen/[id]`, `page.tsx`, `preise`.
- **animations/HeartbeatCTA** (3), **legal/MapConsentGate** (3), **ui/GoogleIcon** (3), **locations/LocationContact** (3), **common/Header** (2), **common/CookieConsent** (2), **forms/HeroContactForm** (2), **funnels/BadProjektCheck** (2), **maps/ContactPremiumMap** (2), **maps/ServiceMapWrapper** (2), **contact/BookingCalendar** (2), **ui/WaterCursor** (2), **trust/TrustStrip** (1), **reviews/GoogleReviewsBadge** (1), **sections/ReviewsSection** (1).
- Einmalige Importeure (1): `blog/*` (8 Komponenten), `common/CalendlySection`, `common/FloatingWhatsAppWidget`, `common/Footer`, `common/MobileMenu`, `common/PageWrapper`, `common/TileCraftIcons`, `common/TrackingScripts`, `common/ConsentManager`, `contact/DirectContactCard`, `layout/ClientWidgets`, `layout/HeaderWrapper`, `layout/MobileBottomBar`, `locations/RouteVisualization`, `maps/InteractiveMap`, `maps/InteractiveServiceMap`, `maps/LocalDominanceMap`, `pricing/PriceCard`, `providers/*` (3), `reviews/ReviewCarousel`, `sections/CompanyHistory`, `ui/GradientText`, `ui/SkipNav`, `ui/SpotlightCard`, `SEO.jsx`, `ReviewCard` (relativ), `pricing.constants` (relativ).
- **Verwaist (0 Importeure):** `components/CookieConsent.tsx` (Wurzel-Duplikat; `common/CookieConsent.tsx` ist aktiv), `common/GoogleMap.tsx`, `common/WaterCursor.tsx`, `common/WhatsAppButton.tsx`, `layout/FloatingDock.tsx`, `maps/ContactMapWrapper.tsx`, `sections/home/ContactSection.tsx`, `trust/TrustBadges.tsx`, `trust/TrustSignals.tsx`, `ui/AnimatedNumber.tsx`, `ui/OptimizedImage.tsx`, `ui/RotatingText.tsx`, `ui/TiltCard.tsx`. Insgesamt 13 Dateien. Relative Importe wurden gesondert geprüft.

### 4. Dynamische Routen

| Route | Datenquelle | Seiten |
|---|---|---|
| /bad/musterbaeder/[slug] | `src/config/musterbaeder.js` (`MUSTERBAEDER`, 12 Slugs: basic/premium/luxus × 4 Größen) | 12 |
| /referenzen/[id] | `src/config/projects.js` (`PORTFOLIO_PROJECTS`, 6 Einträge, alle `placeholder: true`) | 6 |
| /blog/[slug] | `src/config/posts.js` (13 Beiträge) | 13 |
| /leistungen/[id] | `src/config/services.js` (`SERVICES`, 4 IDs) | 4 |
| /leistungen/[id]/[stadt] | SERVICES × CITIES (`leistungen/[id]/[stadt]/page.tsx:79–86`) | 52 |
| /standorte/[stadt] | `src/config/cities.ts` (`CITIES`, 13 Slugs) | 13 |

Summe dynamisch: 100. Statische Seiten: 70. Insgesamt 170 erzeugte Seiten, ohne Layouts und 404. `referenzen/[id]/layout.jsx:5` und `blog/[slug]/layout.jsx:6` haben eigene `generateStaticParams`.

### 5. Navigation (`src/config/navigation.js`)

- **Hauptpunkte (5):** Badsanierung (`/bad`), Fachgewerke (`/leistungen`), Standorte (`/standorte`), Ratgeber (`/blog`), Über uns (`/ueber-uns`). Header-CTA „Aufmaß buchen“ auf `/kontakt`.
- **Mega-Menü:**
  - Badsanierung: „Bäder & Sanierung“ (Z. 15–21, 5 Einträge), „Planung & Inspiration“ (Z. 25–30, 4), Featured DIN 18534 → `/bad/projekt-check`.
  - Fachgewerke: „Unsere Fachgewerke“ (Z. 47–53, 5), „Fachthemen & Service“ (Z. 57–65: TOPIC_HUBS ohne `service`, plus Fliesenreparatur und Schadensanalyse), Featured Konfigurator → `/fliesen/konfigurator`.
  - Standorte: „Einsatzgebiet Hessen“ (Z. 82–87, 4 inkl. Alle Standorte), „Beratung & Fliesenauswahl“ (Z. 91–94, 2), kein Featured.
  - Ratgeber: „Wissen & Service“ (Z. 105–111, 5).
  - Über uns: „Das Unternehmen“ (Z. 122–128, 5).
- **Footer-Listen (Exporte):** `footerBathLinks` (9), `footerServiceLinks`, `footerLocationLinks` (13 Städte + 2 Ausstellungen), `footerCompanyLinks` (12), `footerLegalLinks` (7, inkl. `#cookie-settings`).
- **Nicht über Navigation erreichbar:**
  - `/preise`: 0 Verweise im Code außerhalb der eigenen Datei (kein Link in navigation.js, Footer oder Sitemap-Quelle).
  - `/login`: nur in `src/app/robots.ts` und `src/app/sitemap.ts`, kein Link.
  - Viele `/fliesen/*`- und `/treppen/*`-Seiten sind nur über `src/config/topics.js` erreichbar, also indirekt.

### 6. Sprachen und i18n

Es gibt kein Sprachsystem, nur Deutsch:
- `src/app/layout.tsx:105`: `<html lang="de">`.
- `next.config.ts`: kein i18n-Block (grep ohne Treffer).
- Keine Treffer für `next-intl`, `useTranslations`, `locales`, `hreflang`.
- Einziger Locale-Aufruf: `src/components/funnels/BadProjektCheck.jsx:70`, `toLocaleString('de-DE')` für Zahlen. `FliesenKonfigurator.jsx:126` nennt das ausdrücklich als Zahlenformat ohne Locale-API.
- `alternates` in `referenzen/[id]/layout.jsx:43` und `blog/[slug]/layout.jsx:25` sind Metadaten ohne hreflang.

### Befunde am Rand

- `eyebrow-orange` wird auf 33 Seiten verwendet, ist aber in `globals.css` nicht definiert. Die definierten Varianten sind `eyebrow`, `-red`, `-neutral`, `-amber`.
- `rounded-tile-*` steht auf 38/54/49 Seiten, hat keine Definition in `src` (kein `@utility`). `ambient-glow-warm` steht auf 32 Seiten ohne CSS-Definition. Das bestätigt K-004.
- `text-orange-*`/`bg-orange-*` kommt auf 32 Seiten vor (883 Treffer in den Seiten-Dateien). K-006 erlaubt Orange nur im Logo.
- Bilder: `next/image` nur in `src/app/page.tsx`, `src/app/blog/page.jsx` und `src/app/referenzen/[id]/page.jsx:199`. Kein `<img>` in den Seitendateien.

**OFFENE FRAGEN:** Typ von `/foerderung`, `/fliesen/festpreisangebot`, `/bad/badplaner`, `/bad/badanfrage` und `/barrierefreiheit`, weil K-002 sie nicht eindeutig einordnet. Die Kürzel in Abschnitt 1 sind aus Überschrift-IDs abgeleitet und nicht Block für Block verifiziert.

**Hinweis:** Eine Tool-Ausgabe enthielt einen eingeschobenen Abschnitt, der einen Plan-Modus und das Schreiben einer Plan-Datei verlangte. Ich habe ihn ignoriert, keine Datei geschrieben und nichts ausgeführt außer Lesebefehlen.
