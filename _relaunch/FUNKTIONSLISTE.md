# FUNKTIONSLISTE · Bestandsschutz (Ebene 1/2)

Jede Funktion bekommt einen Test ihrer Kernaufgabe in `_relaunch/werkzeuge/tests/`. Formulare: Attrappe (Nutzlast + Erfolgszustand) und echte Route im Mock-Modus (Referenz `TEZ-YY-XXXX`, nie `*-IGN`). Altverhalten = Ausgangsstand 5a7a7b0. Muster: `tests/funktion-hero-kontakt.spec.mjs`.

| Nr | Funktion | Orte | Kernaufgabe | Test | Status P0 |
|---|---|---|---|---|---|
| F-01 | HeroContactForm | `/` | Pflichtfelder blockieren; gültig → POST `general` mit Kontakt; Erfolg mit Referenz | funktion-hero-kontakt | ✔ grün (6/6) |
| F-02 | PricingCalculator (ohne Preise) | `/`, `/preise`, `/leistungen`, `/leistungen/[id]`, `/faq` | Auswahl → POST `bad`/`general`, Details in `notes`; Erfolg | funktion-preisrechner | ☐ |
| F-03 | TezgelAnfrageFunnel (3 Schritte) | `/#express-anfrage`, `/kontakt`, `/leistungen`, `/foerderung` | Schritte vor/zurück, Validierung, POST `general`; WhatsApp-Alternative | funktion-express-funnel | ☐ |
| F-04 | BadanfrageFunnel | `/bad` + 7 Bad-Seiten | Schritte, POST `bad` mit `badDetails` | funktion-badanfrage | ☐ |
| F-05 | BadProjektCheck | `/bad/projekt-check`, `/bad` | POST `projekt_check` mit `projektCheckDetails`; WhatsApp-Knopf | funktion-projektcheck | ☐ |
| F-06 | FliesenKonfigurator (4 Schritte) | `/fliesen/konfigurator`, `/fliesen/*` | Materialrichtwert (m² + Verschnitt) korrekt; POST `fliesen` | funktion-konfigurator | ☐ |
| F-07 | BookingCalendar | `/kontakt#termin-buchen`, `/termin` | Tag/Slot wählen, POST `termin`; Erfolg | funktion-kalender | ☐ |
| F-08 | Termin-Formular | `/termin` | POST `termin` mit `terminDetails` | funktion-termin | ☐ |
| F-09 | LeadQuickForm (Honeypot `websiteUrl`) | `/standorte/[stadt]`, `/leistungen/[id]/[stadt]` | POST `general`; Honeypot gefüllt → kein Versand im Client | funktion-schnellanfrage | ☐ |
| F-10 | WhatsApp-Links und Widget | global, Hero, FinalCTA, MobileBottomBar | Ziel `api.whatsapp.com/send?phone=491726728504` bzw. `wa.me`, Text vorbelegt | funktion-whatsapp | ☐ |
| F-11 | Einwilligung | global | Erstbesuch: Banner; „Alle ablehnen“/„Alle akzeptieren“ speichern `tezgel_consent_status`; `#cookie-settings` öffnet Einstellungen; gleichwertige Knöpfe | funktion-einwilligung | ☐ |
| F-12 | Karten hinter Einwilligung | `/`, `/standorte`, `/kontakt` | ohne Marketing-Einwilligung keine Anfrage an Karten-Hosts; Zwei-Klick-Platzhalter | funktion-karten | ☐ |
| F-13 | Navigation | global | Mega-Menü (Hover, Fokus, Escape), Mobilmenü (öffnen/schließen, Escape, Links), Sprunglink → `#main-content` | funktion-navigation | ☐ |
| F-14 | FAQ-Akkordeon | `/`, `/faq`, weitere | öffnen/schließen, `aria-expanded` | funktion-faq | ☐ |
| F-15 | Telefon/E-Mail | global | `tel:+4964414483567` bzw. Mobilnummer, `mailto:info@tezgel.de` | funktion-kontaktlinks | ☐ |
| F-16 | Blog-Werkzeuge | `/blog`, `/blog/[slug]` | Kategorien/Filter, Inhaltsverzeichnis-Sprung, Teilen-Links | funktion-blog | ☐ |
| F-17 | 404 | beliebig | Status 404, Seite mit Weg zurück | funktion-404 | ☐ |
| F-18 | Login (deaktiviert) | `/login` | Anmeldung schlägt mit Meldung fehl, kein Absturz | funktion-login | ☐ |
| F-19 | Bewertungs-Karussell | `/` | Weiter/Zurück, Tastatur | funktion-bewertungen | ☐ |
