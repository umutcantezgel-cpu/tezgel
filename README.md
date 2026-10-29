# Fliesenverlegung Tezgel — Offizielle Webpräsenz & Relaunch

> **Meisterbetrieb für fugenarme Großformate, luxuriöse Badsanierungen, witterungsbeständige Außenbeläge und normgerechte DIN 18534 Verbundabdichtung in Aßlar, Wetzlar und ganz Hessen.**  
> Inhaber: **Deniz Tezgel** · Handwerkskammer Wiesbaden · USt-IdNr.: DE 259249094

---

## 🏛️ Über das Projekt

Neubau der Website des Handwerksbetriebs **Fliesenverlegung Tezgel** (Hohwardstraße 14, 35614 Aßlar) mit dem Gestaltungssystem **KERN v4.4**, Beratungswerkzeugen und **169 Seiten**.

* **Leitmotiv:** *„Die Zufriedenheit unserer Kunden ist die beste Reklame für uns.“*
* **Designsystem:** KERN v4.4 (Stand 27.10.2026) – Leitidee „Klar verlegt“: Neutrale Familien Kalk und Tinte, genau ein Akzent (Laser = Logo-Rot), Archivo und IBM Plex Mono. Regeln in `_werkstatt/KERN.md`, Werte nur in `src/app/globals.css`
* **Laufzeit:** Node 24.x, Next.js 16.4.3 (App Router, Turbopack, SSG), React 19.3.1, TypeScript ~6.0.3, Tailwind CSS 4 (Angaben nach `package.json`); Icons als eigenes SVG-Sprite (`src/components/icons/`), Bewegung zentral in `src/lib/motion/` ohne Animationsbibliothek

---

## ✨ Kernfunktionen & Architektur

1. **Vollständiges Portal mit 169 öffentlichen Seiten:**
   * **Badsanierung & Wellness:** `/bad`, `/bad/badsanierung`, `/bad/fliesen`, `/bad/barrierefreies-bad`, `/bad/bad-aus-einer-hand`, `/bad/musterbaeder` (inkl. aller 12 Detailmusterbäder)
   * **Interaktive Tools:** `/bad/badplaner` (3D-Planungstool), `/bad/projekt-check` (Projektcheck; `/bad/budgetkalkulator` leitet dorthin weiter) & `/bad/badanfrage`
   * **Fachgewerke:** `/leistungen/bad`, `/leistungen/wohnen`, `/leistungen/aussen`, `/leistungen/untergrund`
   * **Regionales Standort-Netzwerk:** 13 Ortsseiten (`/standorte/wetzlar`, `/standorte/giessen`, `/standorte/marburg` …) und je Gewerk eine Seite pro Ort (52 Seiten unter `/leistungen/<Gewerk>/<Ort>`)
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
* Node.js 24 (aktuelle LTS, siehe `.nvmrc`)
* npm 11 (mit Node 24 gebündelt, `packageManager` in `package.json`)

### Installation
```bash
npm install
```

### Lokalen Entwicklungsserver starten
```bash
npm run dev
```
Öffne [http://localhost:3000](http://localhost:3000) im Browser.

### Produktions-Build (SSG mit allen Seiten)
```bash
npm run build
```

### Produktions-Server starten
```bash
npm run start
```

### Seitenzahl und Prüfwerkzeuge

Stand 29.10.2026: 169 öffentliche Seiten, dazu die interne Seite `/login`. Gezählt wurde über die Sitemap (164 Adressen) und die fünf Rechtsseiten, die nicht im Sitemap stehen (AGB, Cookie-Richtlinie, Datenschutz, Impressum, Widerruf). Methode und Zahlen stehen in `_werkstatt/werkzeuge/EINRICHTUNG.md`.

Die Prüfwerkzeuge liegen in `_werkstatt/werkzeuge/`: Browserprüfungen mit Playwright, Lighthouse, axe und eigene Skripte. Beispiel: `node bildsatz.mjs --satz NAME --hauptansichten --png` speichert die Hauptansichten als verlustfreie PNG-Bilder statt als JPEG. Übersicht und Aufrufe stehen in `EINRICHTUNG.md`.

---

## 📁 Projektstruktur

```
├── src/
│   ├── app/                      # Next.js App Router (169 öffentliche Seiten, dazu /login)
│   │   ├── (bestand)/            # Alle Seiten; die Klammer steht nicht in der Adresse
│   │   │   ├── ausstellung/      # Badausstellungen Wetzlar & Gießen
│   │   │   ├── bad/              # Badsanierung, Badplaner, Projektcheck, Musterbäder
│   │   │   ├── blog/             # Fachratgeber & Artikel
│   │   │   ├── leistungen/       # Fachgewerke (Bad, Wohnen, Außen, Untergrund)
│   │   │   ├── referenzen/       # Projekt-Galerien mit Originalfotos
│   │   │   ├── standorte/        # Städte-Landingpages in Hessen
│   │   │   ├── layout.tsx        # Wurzel-Layout (Kopf, Fuß, Cursor)
│   │   │   └── page.tsx          # Startseite
│   │   ├── api/                  # Anfrage-Route und IndexNow
│   │   ├── bewegung.css          # Bewegungsregeln je Bewegung (KERN K-008)
│   │   ├── globals.css           # Gestaltungswerte KERN v4.4 (einzige Quelle)
│   │   ├── robots.ts             # Regeln für Suchmaschinen
│   │   └── sitemap.ts            # Sitemap der Adressen
│   ├── components/               # Wiederverwendbare UI-Komponenten
│   │   ├── common/               # Kopf, Fuß, Menü, Einwilligung, WhatsApp-Knopf
│   │   ├── funnels/              # TezgelAnfrageFunnel (WhatsApp/E-Mail), Projektcheck, Konfigurator
│   │   └── sections/             # Firmengeschichte, Qualitätsversprechen, Kundenstimmen
│   ├── config/                   # Stammdaten & Navigation
│   │   ├── company.js            # Kontaktdaten, HWK Wiesbaden, USt-ID
│   │   ├── navigation.js         # Navigation
│   │   └── services.js           # Leistungsbeschreibungen & Gewerke
│   └── lib/motion/               # Bewegung nach KERN v4.4 (K-008): Schalter, Takt, Cursor
└── package.json
```

---

## 🎞️ Bewegung: entfernt, ersetzt, neu

Quelle: `_werkstatt/ENTSCHEIDUNGEN.md`. Stand 29.10.2026.

- **Eingang statt Intro:** Der Eingang ohne Vorhang (E-081) ersetzt das Intro „Der erste Boden“ mit Kalkblatt (B-02) und den Belag über dem Startbild. Das Logo baut sich im Kopf auf. Der erste Bildschirm steht ohne Warten.
- **Vorhang entfernt:** Nichts deckt mehr den ersten Bildschirm ab (E-067-4).
- **Plan-Morph bleibt:** Der Plan-Morph ist nicht entfernt. Die Entscheidung E-037 hat ihn zurückgeholt. Er steht auf `/leistungen` und `/leistungen/[id]`.
- **Neu: Bewegungsschalter:** „an“ oder „ruhig“ im Fuß und im Menü (E-080). Ist am Gerät reduzierte Bewegung eingestellt, geht die Geräteeinstellung vor.
- **Neu: Takt:** eine gemeinsame Bildschleife in `src/lib/motion/takt.ts` (E-080). Sechs von elf Stellen nutzen sie.
- **Neu: Cursor:** ein Fugenkreuz neben dem Systemzeiger, nur bei feiner Maus (E-084). Der Systemzeiger bleibt.

---

## ⚖️ Rechtliches & Kontakt

**Fliesenverlegung Tezgel**  
Inhaber: Deniz Tezgel  
Hohwardstraße 14, 35614 Aßlar  
Telefon: 06441 / 44 83 567 · Mobil/WhatsApp: 0172 / 67 28 504  
E-Mail: info@tezgel.de  
HWK Wiesbaden · USt-IdNr.: DE 259249094
