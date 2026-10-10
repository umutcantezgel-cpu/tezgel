# FUNKTIONSLISTE · Bestandsschutz (Ebene 1/2)

Jede Funktion bekommt einen Test ihrer Kernaufgabe in `_relaunch/werkzeuge/tests/`. Formulare: Attrappe (Nutzlast + Erfolgszustand) und echte Route im Mock-Modus (Referenz `TEZ-YY-XXXX`, nie `*-IGN`). Altverhalten = Ausgangsstand 5a7a7b0. Muster: `tests/funktion-hero-kontakt.spec.mjs`.

| Nr | Funktion | Orte | Kernaufgabe | Test | Status P0 |
|---|---|---|---|---|---|
| F-01 | HeroContactForm | `/` | Pflichtfelder blockieren; gültig → POST `general` mit Kontakt; Erfolg mit Referenz | funktion-hero-kontakt | ✔ grün (6/6) |
| F-02 | PricingCalculator (ohne Preise) | `/`, `/preise`, `/leistungen`, `/leistungen/[id]`, `/faq` | Auswahl → POST `bad`/`general`, Details in `notes`; Erfolg | funktion-preisrechner | ✔ grün (16/16) |
| F-03 | TezgelAnfrageFunnel (3 Schritte) | `/#express-anfrage`, `/kontakt`, `/leistungen`, `/foerderung` | Schritte vor/zurück, Validierung, POST `general`; WhatsApp-Alternative | funktion-express-funnel | ✔ grün (26/26) |
| F-04 | BadanfrageFunnel | `/bad` + 7 Bad-Seiten | Schritte, POST `bad` mit `badDetails` | funktion-badanfrage | ✔ grün (14/14) |
| F-05 | BadProjektCheck | `/bad/projekt-check`, `/bad` | POST `projekt_check` mit `projektCheckDetails`; WhatsApp-Knopf | funktion-projektcheck | ✔ grün (18/18) |
| F-06 | FliesenKonfigurator (4 Schritte) | `/fliesen/konfigurator`, `/fliesen/*` | Materialrichtwert (m² + Verschnitt) korrekt; POST `fliesen` | funktion-konfigurator | ✔ grün (46/46) · 2 Fälle `fixme` je Ansicht = Altfehler (OFFENE FRAGE, siehe Rückgabe P0-TEST-05) |
| F-07 | BookingCalendar | `/kontakt#termin-buchen`, `/termin` | Tag/Slot wählen, POST `termin`; Erfolg | funktion-kalender | ✔ grün (Datei funktion-termin 26/26) |
| F-08 | Termin-Formular | `/termin` | POST `termin` mit `terminDetails` | funktion-termin | ✔ grün (siehe F-07) |
| F-09 | LeadQuickForm (Honeypot `websiteUrl`) | `/standorte/[stadt]`, `/leistungen/[id]/[stadt]` | POST `general`; Honeypot gefüllt → kein Versand im Client | funktion-schnellanfrage | ✔ grün (24/24) |
| F-10 | WhatsApp-Links und Widget | global, Hero, FinalCTA, MobileBottomBar | Ziel `api.whatsapp.com/send?phone=491726728504` bzw. `wa.me`, Text vorbelegt | funktion-whatsapp | ✔ grün (funktion-kontaktwege, 29/29, 3 nur je Ansicht übersprungen) |
| F-11 | Einwilligung | global | Erstbesuch: Banner; „Alle ablehnen“/„Alle akzeptieren“ speichern `tezgel_consent_status`; `#cookie-settings` öffnet Einstellungen; gleichwertige Knöpfe | funktion-einwilligung | ✔ grün (funktion-einwilligung 33/33) |
| F-12 | Karten hinter Einwilligung | `/`, `/standorte`, `/kontakt` | ohne Marketing-Einwilligung keine Anfrage an Karten-Hosts; Zwei-Klick-Platzhalter | funktion-karten | ✔ grün · 1 Fall `fixme` mobil = Altfehler: Info-Kasten überdeckt Platzhalter-Knopf (OFFENE FRAGE) |
| F-13 | Navigation | global | Mega-Menü (Hover, Fokus, Escape), Mobilmenü (öffnen/schließen, Escape, Links), Sprunglink → `#main-content` | funktion-navigation | ✔ grün (funktion-navigation 46/46, 5 nur je Ansicht übersprungen) |
| F-14 | FAQ-Akkordeon | `/`, `/faq`, weitere | öffnen/schließen, `aria-expanded` | funktion-faq | ✔ grün (funktion-navigation) |
| F-15 | Telefon/E-Mail | global | `tel:+4964414483567` bzw. Mobilnummer, `mailto:info@tezgel.de` | funktion-kontaktlinks | ✔ grün (funktion-kontaktwege) |
| F-16 | Blog-Werkzeuge | `/blog`, `/blog/[slug]` | Kategorien/Filter, Inhaltsverzeichnis-Sprung, Teilen-Links | funktion-blog | ✔ grün (funktion-navigation) |
| F-17 | 404 | beliebig | Status 404, Seite mit Weg zurück | funktion-404 | ✔ grün (funktion-navigation) |
| F-18 | Login (deaktiviert) | `/login` | Anmeldung schlägt mit Meldung fehl, kein Absturz | funktion-login | ✔ grün (funktion-navigation) |
| F-19 | Bewertungs-Karussell | `/` | Weiter/Zurück, Tastatur | funktion-bewertungen | ✔ grün (funktion-navigation) |

## Volllauf P0 (10.10.2026, Ausgangsstand-Build, Chromium 1194, Projekte mobil 390 + desktop 1440)
289 Fälle · 276 grün im ersten Volllauf · 3 rot, alle durch Klick vor der Hydrierung (Testfehler, kein Produktfehler) → Wartebedingung `bedienbar()` (Element von React übernommen) statt Wartezeit; danach 72/72 bei achtfacher Wiederholung, Drawer 50/50 bei zehnfacher. 13 übersprungen (Ansichtsbezug oder `fixme` = Altfehler, offen in MENSCHEN/Rückgaben).
Hinweis für P4 (Vorrat V-06): Ein Tippen auf den Menü-Schalter vor der Hydrierung bleibt im Ausgangsstand wirkungslos – das ist echtes Besucherverhalten auf langsamen Geräten.
