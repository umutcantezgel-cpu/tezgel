# E0-KUN-05-qualitaet

Kundschafterbericht aus der Planungsphase (10.10.2026, nur lesend, Arbeitsmodell). Stand: Commit 2362a5a.

# Bericht Kundschafter · Bereich 5 · Qualität

Basis: /home/user/tezgel (HEAD 2362a5a, Arbeitsbaum sauber). Nur gelesen, nichts gebaut oder ausgeführt. Fundstellen als Datei:Zeile, Datei relativ zur Basis.

## 1 · test/ und scripts/qa

- `test/email-pipeline.test.mjs`: 13 Fälle zu HTML-Escaping, CRLF-Header, URL-Entfernung, Rate-Limits, Bot-Timing/Honeypot, Validierung, Team- und Kundenmail, Mailer-Mock mit Idempotenz. Fall 13 (:283) heißt „PricingCalculator“, prüft aber nur die Validierung.
- `test/titleLength.test.mjs`: 4 Fälle (Titel höchstens 58 Zeichen, robots für /impressum).
- `test/resolver.mjs`: Loader für `@/`, kein Testfall. `npm test` führt 17 Fälle aus.
- `scripts/qa/check-graph.mjs`: nicht in `npm test`, nur `qa:graph`. Prüft Strings in `src/lib/schema.ts`, `src/lib/schemaPyramid.ts` und `src/shared/config/site.ts` (Q183, Aggregate-Rating-Schutz, areaServed, „Hohwardstraße 14“, PLZ 35614). Alle vorhanden. Die ausgegebene JSON-LD wird nicht geprüft.

## 2 · Spec-Dateien (`_relaunch/werkzeuge/tests/`)

Zwei Projekte (mobil, desktop; `playwright.config.mjs:15–18`).

| Datei | Deklarationen | Läufe je Projekt | F-xx |
|---|---|---|---|
| hero-kontakt | 3 | 3 | F-01 |
| preisrechner | 8 | 8 | F-02 |
| express-funnel | 10 | 13 | F-03 |
| badanfrage | 7 | 7 | F-04 |
| projektcheck | 7 | 9 | F-05 |
| konfigurator | 14 | 25 | F-06 |
| termin | 9 | 13 | F-07, F-08 |
| schnellanfrage | 7 | 12 | F-09 |
| kontaktwege | 8 | 16 | F-10, F-15 |
| einwilligung | 13 | 17 | F-11, F-12 |
| navigation | 23 | 23 | F-13, F-14, F-16 bis F-19 |

Summe: 109 Deklarationen, 146 Läufe je Projekt, 292 Instanzen.

**Vorausgesetzte Selektoren** (Spec-Zeile). Stichprobe von 169 Literal-Texten: alle in `src/` vorhanden. Verhalten nicht geprüft.

- **hero-kontakt:** `#hero-name`, `#hero-phone`, `#hero-location`, `button[type=submit]`; „Namen und Ihre Telefonnummer“ (:12), „TEZ-26-TEST“ (:24).
- **preisrechner:** `#calc-name`, `#calc-phone`, `#calc-privacy`, `#calc-custom-area`, `#situation-notes`, `#calc-timing`; Buttons „Balkon, Terrasse & Außen“, „Großraum / Wohnbereich“ (:106–107); „Namen an.“ (:67).
- **express-funnel:** `#funnel-name/-phone/-email/-custom-area/-location/-notes`; `[aria-label="Fortschritt"] [aria-current="step"]` (:37); Gruppen „Ungefähre Fläche in Quadratmetern“, „Gewünschter Ausführungszeitraum“ (:15–16); Buttons „Weiter zu Schritt n:“, „Ändern“, „Direkt per WhatsApp“, „Anfrage verbindlich absenden“; „Fehler beim Absenden:“ (:185); WhatsApp-Ziel `api.whatsapp.com/send` mit `phone`/`text` (:160–170).
- **badanfrage:** Buttons „Weiter zu Schritt n“, „Zurück zu Schritt n“, „Badanfrage jetzt absenden (Online)“ (:11–15); `aria-pressed` bei „Gewerbeobjekt“, „Wanne zu Dusche“ u. a. (:36–113); Labels „Vor- & Nachname“, „PLZ & Ort“ (:17–22), „Länge (m)“ (:43); „Schritt n von 5“ (:10); „Badanfrage erfolgreich übermittelt“ (:123).
- **projektcheck:** `#projekt-check` (:15); Labels „1. Badezimmer-Größe in Quadratmetern“, „Ihr Name“, „Ihre Telefonnummer“ (:18–21); „Angebot mit Festpreis anfordern“, „Anfrage per WhatsApp senden“ (:19, :24); `aria-pressed` bei „Exklusiv“ (:45–51); „Projektcheck übermittelt“ (:25). Der Test überschreibt `window.fetch` (:31–35).
- **schnellanfrage:** `input[id^="websiteUrl-"]` (Honeypot), `input[type=tel]`, `input[type=email]`, `input[type=text][required]`, `textarea`; Labels ohne Verknüpfung (:13); Quellen `standort-wetzlar`, `leistung-bad-wetzlar` (:8–9).
- **termin:** `#booking-consent` (:32); „Vor- und Nachname“, „0172 / 1234567“; „Vor-Ort-Termin anfragen“, „Termin online anfragen“, „Individuelles Formular“; „15:00 Uhr“ (:36); „Schritt 2: Kontaktdaten für …“ (:37); `#termin-name/-phone/-email/-zip/-notes/-topic/-date/-slot` (:110–162).
- **konfigurator:** „Weiter zu Schritt n“, „Zur Zusammenfassung“, „Neuer Zementestrich“; Gruppen „Material bzw. Optik:“, „Verlegemuster:“ (:30); Labels „Zu belegende Fläche in m²“, „Anzahl Steigungen“ (:66–91); `[aria-live="polite"]` mit „Materialbedarf inkl. Verschnitt“ (:32); „Konfiguration erfolgreich übermittelt“ (:154).
- **kontaktwege:** `#whatsapp-floating-btn` (:59); `a[href*="whatsapp.com"]`, `a[href*="wa.me"]`, `a[href^="tel:"]`, `a[href^="mailto:"]` (:78–119); `complementary` „Schnellkontakt Daumenleiste“ (:88), Link „WhatsApp-Chat starten“ (:89); `contentinfo` (:116).
- **einwilligung:** Cookie `tezgel_consent_status` (:7); Dialog „Cookie-Einwilligungsbanner“ (:12); „Alle akzeptieren“, „Alle ablehnen“, „Einstellungen“, „Auswahl speichern“ (:42–82); `#cookie-settings` (:78); „Karte laden & zustimmen“ (:9), „Karte wird geladen...“ (:29); „Unser Hauptstandort in Aßlar“ (:16); `iframe[src*="openstreetmap.org"]` (:134).
- **navigation:** `navigation` und `dialog` „Hauptnavigation“ (:9, :11); „Architektur-Menü öffnen/schließen“ (:12); „Untermenü Badsanierung öffnen/schließen“ (:28); „Zum Hauptinhalt springen“ mit `href="#main-content"` (:108–110), `id="main-content"` (:113); „Nächste/Vorherige Rezensionen“ (:223–224); XPath `../../following-sibling::div[1]` (:226); `h3 a[href^="/blog/"]` (:264); `alert` „Ungültige Anmeldedaten“ (:213); Labels „Benutzername“, „Passwort“ (:199, :211); „Seite nicht gefunden“ (:176).
- **Querschnitt:** Cookie-Version `2.1.0` (`src/lib/cookie-inventory.ts:61`, vgl. `lib.mjs:86`); `POST /api/anfrage` mit `referenceId`, `mocked` (`lib.mjs:43–48`); React-intern `__reactProps$` (`fixtures.mjs:30`); Nutzlast-Schlüssel `inquiryType`, `projectType`, `badDetails`, `projektCheckDetails`, `fliesenDetails`, `terminDetails`, `privacyConsent`, `honeypot`, `source`.

**test.fixme / test.skip** (alle mit Grund):

- `einwilligung:144` fixme (nur Smartphone): Info-Kasten überdeckt Knopf (siehe V-01).
- `konfigurator:210` fixme: „Weiß nicht“ wird als „Nein“ gemeldet. Ursache `src/components/funnels/FliesenKonfigurator.jsx:606`.
- `konfigurator:225` fixme: Nur-Treppe sendet Vorgabe „20 m²“. Ursache `FliesenKonfigurator.jsx:496, :611`.
- `kontaktwege:69` skip: Doppelklick nur am Desktop (mobil Navigation). `:85` und `:127` skip: Mobil-Leiste nur mobil sichtbar.
- `navigation:23` skip: Mega-Menü mobil ausgeblendet. `:66` Drawer nur mobil. `:326` Inhaltsverzeichnis mobil ausgeblendet.
- Kein `test.only`, `test.fail` oder `test.slow`.

**Abgleich mit FUNKTIONSLISTE:**

- Neun dort genannte Dateien existieren nicht: funktion-kalender, -whatsapp, -karten, -faq, -kontaktlinks, -blog, -404, -login, -bewertungen. Die Tests liegen in termin, kontaktwege, einwilligung und navigation.
- navigation „46/46 grün, 5 übersprungen“ widerspricht sich: 23 × 2 = 46 Instanzen, davon 5 übersprungen.
- „289 Fälle“ im Volllauf: 276 + 3 + 13 = 292 = 146 × 2 (meine Zählung).

## 3 · TODO/FIXME/HACK/XXX in src/

Keine Treffer.

## 4 · Vorrat (PLAN.md:294–299)

- **V-01** Standorte mobil: besteht. `src/components/maps/InteractiveMap.tsx:79` (absolut unten, z-10) liegt neben dem Knopf `src/components/legal/MapConsentGate.tsx:98`. Überdeckung nicht gemessen (OFFENE FRAGE).
- **V-02** /kontakt Hydrierung: Code besteht. `src/components/contact/BookingCalendar.tsx:64–67` berechnet Tage im Render ohne Mount-Schranke. Eingebunden in `src/app/kontakt/page.jsx:141` und `src/app/termin/page.jsx:271`. Fehler #418 nur zur Laufzeit prüfbar (OFFENE FRAGE).
- **V-03** Labels und `role="alert"`: besteht. `LeadQuickForm.tsx` Labels ohne `htmlFor` (:167, :181, :197, :210, :224). Kein `role="alert"` bei `TezgelAnfrageFunnel.tsx:468`, `FliesenKonfigurator.jsx:1284`, `BadProjektCheck.jsx:422`.
- **V-04** Weiterleitungen/410: besteht. `next.config.ts` ohne `redirects()`, keine Middleware.
- **V-05** tel-Ziel und feste Nummern: besteht. `DirectContactCard.tsx:37` nutzt `+49 6441 4483567` mit Leerzeichen (`src/shared/config/site.ts:45`). Fest im Text: `BookingCalendar.tsx:161`, `LeadQuickForm.tsx:102`.
- **V-06** Menü vor Hydrierung: besteht. `src/components/common/Header.jsx:246–262` nur mit `onClick`, kein Fallback.

## 5 · Atlas A01/A06: 10 Stichproben

Ja (9):

1. A01 `layout.tsx:34`: Titel.
2. A01 `layout.tsx:113–122`: Body, SkipNav, ErrorBoundary, main.
3. A01 `not-found.tsx:8–11, :19–21`: robots, h1.
4. A01 `page.tsx:37, :40, :71`: Ladetexte, Metatitel.
5. A01 `page.tsx:197, :706`: Hero-Satz, CTA-Text.
6. A06 `BookingCalendar.tsx`: 443 Zeilen, Schleife `:69`.
7. A06 `LeadQuickForm.tsx:55, :102`: TEZ-BOT-IGN, Telefonnummer.
8. A06 `HeroContactForm.tsx`: ohne `privacyConsent`, `website_url_hp` `:321`.
9. A06 `button.jsx`, `input.jsx`, `textarea.jsx`: gelöscht (eca9d5b), Zeilen 47/21/20.

Teilweise (1): A06 `globals.css:83–88`. Inhalt stimmt. Spanne unvollständig: `animation-duration` steht in :89, `iteration-count` in :90.

Urteil: Als Stichprobe aktuell. Als Ganzes nicht belegt, da nur 10 von 55 Einträgen geprüft wurden und A01 sich „vorläufig (P0)“ nennt. Seit 5a7a7b0 wurden 12 Dateien in `src/` geändert oder gelöscht (u. a. `layout.tsx`, `globals.css`, `utils/index.js`). Die geprüften Zeilen stimmen mit HEAD.

## 6 · belege/p0-ausgangsstand

- Top-Level-JSON: axe.json 235,8 KB, fotos-ergebnis.json 105,1 KB, jury.json 127,8 KB, statisch.json 98,8 KB, texte-index.json 77,4 KB, lighthouse.json 25,3 KB, jury-material.json 17,3 KB, axe-zustaende.json 11,9 KB, texte-vergleich-gegen-p0-ausgangsstand.json 251 B, fotos-zusammenfassung.json 109 B.
- `texte/`: 120 JSON, von 9,5 KB (login) bis 29,9 KB (start).
- `fotos/`: Ansichtsordner d1440 (147 Bilder), d1920 (123), m375 (222), t768 (170). Summe 662 JPG, je 19 Seitenordner. Pro Seitenordner: d1440 4–12, d1920 4–8, m375 9–12, t768 5–12.
- Dateinamen `00.jpg` bis `NN.jpg` enthalten keine Ansicht. Die Größe steht nur im Ordnernamen: 1440 und 1920 px (Desktop), 375 px (Mobil), 768 px (Tablet).
- OFFENE FRAGE: `fotos-zusammenfassung.json` nennt 480 Aufnahmen, es gibt 662 Bilder.
- `texte-vergleich-…json` vergleicht p0 mit p0, alle Zähler sind 0.

## 7 · README.md (5 Punkte)

1. **Routenzahl:** „174 Routen“ (:10, :58, :74) ist nicht belegt. Im Repo: 76 `page.*`-Dateien und 6 dynamische Ordner. `_relaunch/PLAN.md:37` nennt 120. Abweichung.
2. **Städte:** „Über 50 Landingpages“ (:24) steht gegen 14 Einträge in `src/config/cities.ts` und 10 in der Grundmenge.
3. **Struktur und Routen:** `/bad/budgetkalkulator` (:22) existiert nicht. `HelpSidebar` (:85) fehlt. `components/sections/` enthält keine Bento- oder Testimonial-Datei (:87). „3D“ bei `/bad/badplaner` (:22) steht nicht im Seitencode. Der Baum fehlt `test/`, `scripts/`, `src/lib/`, `src/shared/`, `_relaunch/`.
4. **Stimmt:** Telefon, WhatsApp, E-Mail, USt-IdNr. und HWK Wiesbaden (`src/shared/config/site.ts:46`, `src/config/company.js:49, :57–58, :107`). Node >= 18.17.0 (`package.json:6`).
5. **Stimmt nicht:** `#059669` fehlt im `src/`. `#F8FAFC` und `#0F172A` stehen nur in E-Mail-Templates, nicht in `src/styles/tokens.css`. `npm test` und `qa:graph` fehlen im README. „npm >= 9.0.0“ (:45) ist nicht in `package.json` deklariert. „DIN 18534 zertifiziert“ (:35) hat im Repo keinen Nachweis (OFFENE FRAGE).
