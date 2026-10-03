# UPGRADE BACKLOG: Fliesenverlegung Tezgel & Coday SEO Toolkit

## 1. Projekt- & Unternehmensprofil
- **Firmenname:** Fliesenverlegung Tezgel
- **Rechtsform & Inhaber:** Deniz Tezgel (Inhaber & Fachbetriebsleiter, Fliesen-, Platten- und Mosaiklegerbetrieb)
- **Offizielle Domain:** `https://www.tezgel.de`
- **Echte physische Adresse (HQ):** Hohwardstraße 14, 35614 Aßlar, Hessen, Deutschland
- **Telefon:** 06441 / 44 83 567 (+49 6441 4483567)
- **Mobil / WhatsApp:** 0172 / 67 28 504 (+49 172 6728504)
- **E-Mail:** `info@tezgel.de`
- **Bürozeiten:** Mo–Do: 07:30 – 18:00 Uhr, Fr: 07:30 – 17:00 Uhr, Sa: 08:00 – 14:00 Uhr (Vor-Ort-Aufmaßtermine nach Vereinbarung)
- **Hauptleistungen:**
  1. Badsanierung & Barrierefreie Walk-In-Duschen
  2. Fugenarme Großformatverlegung (XXL-Fliesen)
  3. Wohnbereiche, Neubau, Küchen & Treppenanlagen
  4. Balkon- & Terrassensanierung auf Stelzlagern
  5. Untergrundvorbereitung & DIN 18534 Verbundabdichtung
  6. Naturstein- und Granitverlegung
- **Zielregion / Einzugsgebiet:** Aßlar, Wetzlar, Gießen, Marburg, Lahn-Dill-Kreis, Limburg, Butzbach, Wetterau, Mittelhessen, Hessen
- **Google Maps Link:** `https://maps.google.com/?q=Hohwardstra%C3%9Fe+14,+35614+A%C3%9Flar`
- **Primäre Markenfarben (Hex):**
  - Primary (Orange): `#F97316` / `#EA580C`
  - Secondary (Slate): `#171717` / `#0A0A0A`
  - Accent (Red/Amber): `#EF4444` / `#F59E0B`
  - WhatsApp (Green): `#128C7E` / `#25D366`

---

## 2. Gap-Analyse & Bestandsaufnahme

| Bereich | Toolkit-Komponente | Status im Projekt | Hebel / Priorität | Geplante Maßnahme |
| :--- | :--- | :--- | :--- | :--- |
| **01 Schemas** | `site-config.ts` | Fehlt als universelle TypeScript-Quelle | 🔴 Hoch (SEO & E-E-A-T) | Anlegen von `src/shared/config/site.ts` mit allen echten Unternehmensdaten |
| **01 Schemas** | Globaler `@graph` im Root Layout | Vorhanden, aber ohne Country & ohne AggregateRating auf Product | 🔴 Hoch (SERP-Sterne) | `Country`-Knoten (Wikidata Q183) & `Product`-Node (`#main-service-package`) mit 27+ Google-Bewertungen (5.0★) einbinden; Google Filter-Schutz beachten |
| **01 Schemas** | Anti-Fake-Location 3-Tier Pyramide | Vereinfachte Standorte | 🔴 Hoch (Local SEO) | `schemaPyramid.ts` für Bundesland (Hessen) -> Landkreise (Lahn-Dill etc.) -> Städte (Aßlar, Wetzlar, etc.) mit strikter HQ-Adresse und `areaServed` |
| **02 Metadata** | Metadata Factory & Budget | Vorhanden (`createMetadata`), aber ohne `generatePageMetadata` und ohne strikten 58-Zeichen-Budget Guard | 🟡 Mittel (SERP CTR) | Erweiterung um `generatePageMetadata()`, 58-Zeichen Pixel-Budget und `{ index: false, follow: true }` für Impressum & Datenschutz |
| **03 Sitemap** | Video Sitemap | Fehlt | 🟡 Mittel (Google Video Index) | Route `src/app/video-sitemap.xml/route.ts` anlegen für Handwerks- und Showcase-Videos |
| **04 Robots** | KI-Crawler & GEO | Nur Basis-Regel in `robots.ts` | 🔴 Hoch (GEO & AI Engine) | 13 KI-Crawler (`GPTBot`, `ClaudeBot`, `PerplexityBot`, etc.) und Video-Sitemap in `src/app/robots.ts` ergänzen |
| **12 GEO** | `llms.txt` Route | Fehlt | 🔴 Hoch (KI-Suchmaschinen) | `src/app/llms.txt/route.ts` für ChatGPT, Perplexity, Gemini & Claude einrichten |
| **07 Perf** | `OptimizedImage.tsx` | Fehlte (nur Standard `next/image`) | 🔴 Hoch (CLS = 0) | `OptimizedImage.tsx` mit erzwungener Aspect-Ratio und `wrapperClassName` bereitstellen |
| **07 Perf** | `MotionProvider.tsx` | Simpler Wrapper ohne Deferral | 🔴 Hoch (LCP < 2.0s) | Defer-Strategie auf Nutzerinteraktion (Scroll, Touch, Klick) integrieren |
| **08 Maps** | `InteractiveMap.tsx` | Eigene Google Maps Komponenten | 🟡 Mittel (UX / Conversion) | `InteractiveMap.tsx` mit dezentem Kontrastfilter, Infobox und One-Click Routenplaner bereitstellen |
| **08 Maps** | `LocalDominanceMap.tsx` | Fehlt | 🔴 Hoch (Lokale Autorität) | Pulsierender Radar-Visualisierer für Standortseiten (15–30km Radius, Badges) |
| **09 CRO** | `LeadQuickForm.tsx` | Formulare vorhanden, aber kein kompakter 60s LeadQuickForm mit Bot-Honeypot | 🔴 Hoch (Conversion-Rate) | Universeller `LeadQuickForm.tsx` mit Honeypot-Spam-Falle (`websiteUrl`) für alle Leistungsseiten |
| **09 CRO** | `DirectContactCard.tsx` | Fehlt als modulare High-End Karte | 🟡 Mittel (CRO) | Modulare Kontakt-Direktkarte für Kontakt- & Leistungsseiten |
| **09 CRO** | `BookingCalendar.tsx` | Fehlt als interaktiver 2-Schritt-Kalender | 🔴 Hoch (Vor-Ort-Termine) | 2-Schritt Buchungskalender mit 14-Tage-Fenster und Doppelbuchungsschutz |
| **10 UI** | `SpotlightCard.tsx` / `TiltCard.tsx` | Fehlt | 🟡 Mittel (Branding / UX) | Maus-Spotlight und 3D-Tilt Karten für Feature-Listen und Vorteils-Sektionen |
| **10 UI** | `FaqAccordion.tsx` | Basis-FAQ vorhanden | 🟡 Mittel (Rich Snippets) | Synchronisiert mit `FAQPage` JSON-LD |
| **10 UI** | `RotatingText.tsx` & `GradientText.tsx` | Teilweise manuell | 🟡 Mittel (Hero UX) | LCP-sichere Headline-Animationen |
| **13 QA** | Automated Graph & Title QA | Fehlt | 🔴 Hoch (Code-Qualität) | `scripts/qa/check-graph.mjs` und Titel-Längen-Prüfung integrieren |

---

## 3. Umsetzungs-Roadmap nach 6-Phasen-Zyklus

- [x] **Zyklus 1: Gap-Analyse & Upgrade-Backlog** (Erledigt)
- [ ] **Zyklus 2: Globales Schema & Linked Data Graph**
  - [ ] `src/shared/config/site.ts` erstellen mit vollen Tezgel-Daten
  - [ ] Globalen `@graph` mit `Country`, `Organization`, `LocalBusiness`, `WebSite` und `Product` (`#main-service-package` mit AggregateRating) im Root-Layout verankern
  - [ ] `src/lib/schemaPyramid.ts` integrieren und in regionalen Routen nutzen
  - [ ] `src/lib/metadata.ts` erweitern um `generatePageMetadata()` mit 58-Zeichen Budget
  - [ ] Impressum & Datenschutz auf `{ index: false, follow: true }` härten
- [ ] **Zyklus 3: High-Conversion Lead- & Kontakt-Pipeline**
  - [ ] `src/components/forms/LeadQuickForm.tsx` mit unsichtbarer Honeypot-Falle implementieren
  - [ ] `LeadQuickForm` in Leistungs- und Kernseiten einbinden
  - [ ] `src/components/contact/DirectContactCard.tsx` einbinden
  - [ ] `src/components/contact/BookingCalendar.tsx` auf Termin- & Kontaktseite einbinden
  - [ ] Transaktions-E-Mail Templates synchronisieren
- [ ] **Zyklus 4: Interaktive Maps & Visuelle Aufwertung**
  - [ ] `src/components/maps/InteractiveMap.tsx` erstellen
  - [ ] `src/components/maps/LocalDominanceMap.tsx` auf Standort- & Leistungsseiten einbinden
  - [ ] `SpotlightCard.tsx` und `TiltCard.tsx` bereitstellen
  - [ ] `FaqAccordion.tsx` bereitstellen
  - [ ] `RotatingText.tsx` und `GradientText.tsx` in Hero-Bereichen einsetzen
- [ ] **Zyklus 5: Performance, Core Web Vitals & GEO**
  - [ ] `src/components/ui/OptimizedImage.tsx` mit Null-CLS-Garantie implementieren
  - [ ] `MotionProvider.tsx` mit Deferred Motion Loading aktualisieren
  - [ ] `src/app/robots.ts` um alle 13 KI-Crawler und Video-Sitemap erweitern
  - [ ] `src/app/video-sitemap.xml/route.ts` anlegen
  - [ ] `src/app/llms.txt/route.ts` als dynamisches KI-Manifest erstellen
- [ ] **Zyklus 6: End-to-End QA, Testing & Git Commits**
  - [ ] `scripts/qa/check-graph.mjs` erstellen und ausführen
  - [ ] Titel-Längen-Test ausführen
  - [ ] `npm run typecheck`, `npm run lint` und `npm run build` validieren
  - [ ] Saubere Conventional Commits erstellen und Änderungen pushen
