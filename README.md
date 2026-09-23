# Fliesenverlegung Tezgel — Offizielle Webpräsenz & Relaunch

> **Meisterbetrieb für fugenarme Großformate, luxuriöse Badsanierungen, witterungsbeständige Außenbeläge und normgerechte DIN 18534 Verbundabdichtung in Aßlar, Wetzlar und ganz Hessen.**  
> Inhaber: **Deniz Tezgel** · Handwerkskammer Wiesbaden · USt-IdNr.: DE 259249094

---

## 🏛️ Über das Projekt

Vollständiger High-End Relaunch für den Handwerks-Meisterbetrieb **Fliesenverlegung Tezgel** (Hohwardstraße 14, 35614 Aßlar). Die Plattform vereint **Clean Architectural Ceramic Light Design**, interaktive Beratungswerkzeuge und ein umfassendes **174-Seiten-Portalnetzwerk** für maximale organische Sichtbarkeit (SEO) und Conversion.

* **Leitmotiv:** *„Die Zufriedenheit unserer Kunden ist die beste Reklame für uns.“*
* **Designsystem:** Clean Architectural Ceramic Light (Marmorweiß `#FFFFFF`, Feinkeramik `#F8FAFC`, Tiefschiefer `#0F172A`, Smaragd/Mint `#059669`, Ceramic Sky `#0284C7`)
* **Framework:** Next.js (App Router, Turbopack, SSG) + Tailwind CSS + Lucide Icons + Framer Motion

---

## ✨ Kernfunktionen & Architektur

1. **Vollständiges 174-Seiten-Portal:**
   * **Badsanierung & Wellness:** `/bad`, `/bad/badsanierung`, `/bad/fliesen`, `/bad/barrierefreies-bad`, `/bad/bad-aus-einer-hand`, `/bad/musterbaeder` (inkl. aller 12 Detailmusterbäder)
   * **Interaktive Tools:** `/bad/badplaner` (3D-Planungstool), `/bad/budgetkalkulator` (Online-Kostenrechner) & `/bad/badanfrage`
   * **Fachgewerke:** `/leistungen/bad`, `/leistungen/wohnen`, `/leistungen/aussen`, `/leistungen/untergrund`
   * **Regionales Standort-Netzwerk:** Über 50 Landingpages für Städte und Regionen in ganz Hessen (`/standorte/wetzlar`, `/standorte/giessen`, `/standorte/marburg` etc.)
   * **Badausstellungen:** `/ausstellung/wetzlar`, `/ausstellung/giessen`
   * **Wissens-Hub & Ratgeber:** `/blog`, `/faq`, `/beratung`, `/foerderung` (KfW-Zuschüsse)
   * **Original-Referenzen:** `/referenzen` mit Baustellenfotogalerie von Deniz Tezgel

2. **Conversion & Express-Anfrage Funnel:**
   * 3-Schritte-Expressanfrage mit 1-Klick-WhatsApp-Übermittlung direkt an Deniz Tezgel (`0172 / 67 28 504`)
   * Mobile Floating Action Bar für schnelle Kontaktaufnahme
   * DSGVO-konforme Übermittlung

3. **Garantierte Ausführungsstandards:**
   * DIN 18534 zertifizierte Verbundabdichtung
   * Staubarme Sanierung mit Luftreinigern und Schutzwänden
   * Verbindliche Festpreisangebote

---

## 🚀 Entwicklung & Deployment

### Voraussetzungen
* Node.js >= 18.17.0
* npm >= 9.0.0

### Installation
```bash
npm install
```

### Lokalen Entwicklungsserver starten
```bash
npm run dev
```
Öffne [http://localhost:3000](http://localhost:3000) im Browser.

### Produktions-Build (SSG mit allen 174 Routen)
```bash
npm run build
```

### Produktions-Server starten
```bash
npm run start
```

---

## 📁 Projektstruktur

```
├── src/
│   ├── app/                      # Next.js App Router (174 Routen)
│   │   ├── ausstellung/          # Badausstellungen Wetzlar & Gießen
│   │   ├── bad/                  # Badsanierung, Badplaner, Budgetkalkulator, Musterbäder
│   │   ├── blog/                 # Fachratgeber & Artikel
│   │   ├── leistungen/           # Fachgewerke (Bad, Wohnen, Außen, Untergrund)
│   │   ├── referenzen/           # Projekt-Galerien mit Originalfotos
│   │   ├── standorte/            # Städte-Landingpages in Hessen
│   │   ├── layout.tsx            # Globales Root-Layout
│   │   ├── page.tsx              # Startseite mit Portal-Netzwerk
│   │   └── globals.css           # Globale Styles & Glassmorphism Tokens
│   ├── components/               # Wiederverwendbare UI-Komponenten
│   │   ├── common/               # Header, Footer, MobileMenu, HelpSidebar
│   │   ├── funnels/              # TezgelAnfrageFunnel (WhatsApp/E-Mail)
│   │   └── sections/             # Bento-Grid, Testimonials, Trust-Säulen
│   ├── config/                   # Stammdaten & Navigation
│   │   ├── company.js            # Kontaktdaten, HWK Wiesbaden, USt-ID
│   │   ├── navigation.js         # Vollständige 174-Routen-Hierarchie
│   │   └── services.js           # Leistungsbeschreibungen & Gewerke
│   └── styles/                   # Design Tokens (Farben, Glassmorphism, Schatten)
└── package.json
```

---

## ⚖️ Rechtliches & Kontakt

**Fliesenverlegung Tezgel**  
Inhaber: Deniz Tezgel  
Hohwardstraße 14, 35614 Aßlar  
Telefon: 06441 / 44 83 567 · Mobil/WhatsApp: 0172 / 67 28 504  
E-Mail: info@tezgel.de  
HWK Wiesbaden · USt-IdNr.: DE 259249094
