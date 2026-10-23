# LAGEBILD · Ausgangsstand E0

Stand 23.10.2026, Entwurf (E0-ORCH-02). Messwerte aus E0-PRUEF-03 und E0-PROBE-01…10 stehen in Abschnitt 4 und 5, sobald die Pakete abgenommen sind. Alter Stand = main 388fa7b (live), Prüfbau aus dem Reinraum von c53faf4 (src gleich).

## 1. Die Seite in fünf Sätzen
1. tezgel.de ist eine Next.js-16-Seite mit 170 Adressen (163 in der Sitemap, 5 nur verlinkt, 2 Weiterleitungen) und 32 bewusst entfernten Adressen mit Status 410 (`src/lib/wege.ts`).
2. Gestaltet ist sie nach KERN v2 „Verlegeplan“: Kalk, Fliese und Tinte mit Laser-Rot, Archivo und IBM Plex Mono, 45 eigene Icons, eine gesperrte Tailwind-Palette und 16 registrierte Bewegungen.
3. Inhaltlich spricht sie in Fachsprache (DIN 18534, Verbundabdichtung, Vor-Ort-Aufmaß) und mit 830 Gedankenstrichen; die Startseite beginnt mit „Perfektion auf jedem Quadratmeter.“
4. Echte Fotos fehlen ganz: 11 generierte Bad-Bilder und 6 Referenzprojekte mit `placeholder: true` tragen die Bildseite.
5. Technisch ist der Bestand sauber: Build, Typen, Linter und Tests grün, alle Adressen mit Titel, Beschreibung, einer H1, Canonical und gültigen strukturierten Daten.

## 2. Hauptansichten (12, `HAUPTANSICHTEN.json`)
| Ansicht | Seitenart | Rolle im Lauf |
|---|---|---|
| `/` | Erzählseite | Referenzansicht (E2) |
| `/bad` | Erzählseite | Bereich Bad, großer Moment `schichten` |
| `/bad/badsanierung` | Erzählseite | Bad komplett erneuern, Moment `weg` |
| `/bad/barrierefreies-bad` | Erzählseite | Referenztext Bereich, Ziel von P1, Moment `gefaelle-dusche` |
| `/leistungen` | Erzählseite | Überblick, Moment `formatregler` |
| `/fliesen` | Wissensseite | Moment `verband` |
| `/balkon-terrasse` | Erzählseite | Moment `gefaelle-balkon` |
| `/referenzen` | Erzählseite | Galerie mit Filter, Vorher-Nachher |
| `/ueber-uns` | Erzählseite | Moment `karte` |
| `/kontakt` | Arbeitsseite | Hauptweg „Termin vor Ort anfragen“ |
| `/standorte/wetzlar` | Ortsseite | Referenztext Ort |
| `/blog` | Wissensseite | Ratgeber |

Referenztext Wissen: `/untergrund-abdichtung/din-18534` (keine Hauptansicht).

## 3. Funktionsliste (Bestandsschutz, Z-02)
Quelle: `_relaunch/FUNKTIONSLISTE.md` (F-01…F-19), Tests in `_werkstatt/werkzeuge/tests/` (13 Funktionsspecs plus Tracking auf Port 4311). Die Spalte „Orte nach dem Lauf“ folgt E-012; jede Funktion bleibt erhalten, nur ihr Platz ändert sich, und der Test zieht mit.

| Nr | Funktion | Orte heute | Orte nach dem Lauf | Test |
|---|---|---|---|---|
| F-01 | HeroContactForm (Name, Telefon, Ziel `general`) | `/` Einstieg | `/kontakt` oben, `/` unten (`#termin`) | funktion-hero-kontakt |
| F-02 | Preisrechner | `/`, `/preise`, `/leistungen`, `/leistungen/[id]`, `/faq` | ohne `/`, sonst gleich, als Hilfe | funktion-preisrechner |
| F-03 | Express-Anfrage (3 Schritte) | `/#express-anfrage`, `/kontakt`, `/leistungen`, `/foerderung` | ohne `/`; `/kontakt` als Hilfe unter dem Hauptweg | funktion-express-funnel |
| F-04 | Badanfrage | `/bad` und 7 Bad-Seiten | gleich | funktion-badanfrage |
| F-05 | Projektcheck | `/bad/projekt-check`, `/bad` | gleich, als Hilfe | funktion-projektcheck |
| F-06 | Fliesen-Konfigurator | `/fliesen/konfigurator`, `/fliesen/*` | gleich, als Hilfe | funktion-konfigurator |
| F-07 | Terminkalender | `/kontakt#termin-buchen`, `/termin` | gleich | funktion-termin |
| F-08 | Termin-Formular | `/termin` | gleich | funktion-termin |
| F-09 | Schnellanfrage mit Honigtopf | Ortsseiten, Leistung × Ort | gleich | funktion-schnellanfrage |
| F-10 | WhatsApp-Links und Widget | global | gleich | funktion-kontaktwege |
| F-11 | Einwilligung | global | unverändert (G8) | funktion-einwilligung |
| F-12 | Karten hinter Einwilligung | `/`, `/standorte`, `/kontakt` | `/ueber-uns`, `/standorte`, `/kontakt`; auf `/` gezeichnete Karte ohne Anfrage | funktion-einwilligung |
| F-13 | Navigation (Mega-Menü, Mobilmenü, Sprunglink) | global | neue Navigation K-009, eine Aufklappebene | funktion-navigation |
| F-14 | FAQ-Akkordeon | `/`, `/faq` und weitere | gleich | funktion-navigation |
| F-15 | Telefon und E-Mail | global | gleich | funktion-kontaktwege |
| F-16 | Blog-Werkzeuge | `/blog`, `/blog/[slug]` | gleich | funktion-navigation |
| F-17 | 404 | beliebig | neue 404 mit drei Wegen | funktion-navigation |
| F-18 | Login (deaktiviert) | `/login` | gleich | funktion-navigation |
| F-19 | Bewertungs-Karussell | `/` | gleich oder als ruhige Stimmenreihe, Wortlaut unverändert | funktion-navigation |
| F-20 | Weiterleitungen 308 und 410 | `next.config.ts`, `wege.ts` | gleich, dazu neue 308 aus E5-BAU-01 | funktion-weiterleitung |

Altfehler aus dem Vorlauf (bleiben, MENSCHEN.md): Konfigurator 2 Fälle `fixme`; Kartenplatzhalter mobil vom Info-Kasten überdeckt; Knopf „Cookie-Einstellungen“ im Kartenplatzhalter öffnet den Banner nicht (M-12).

## 4. Ausgangswerte
### Bestand und Adressen (erhoben)
- Reinraum c53faf4: Build, Typprüfung, Linter, Tests, `qa:graph` jeweils Exit 0.
- Adressen (E0-PRUEF-02c, `adressen-e0.csv`, 202 Zeilen): 168 × 200, 2 × 308, 32 × 410, 0 × 404; H1 ungleich 1: 0; Canonical fehlt oder weicht ab: 0; Titel über 60: 0; Beschreibung außerhalb 120 bis 155: 0; JSON-LD ungültig: 0; kaputte interne Links: 0. Zwei absolute Links auf tezgel.de (in `/barrierefreiheit`, `/cookie-richtlinie`) prüft das Werkzeug lokal nicht.
- Erstes Bild, Rauchlauf `/` und `/kontakt` (E0-PRUEF-02a): alle fünf Elemente in 20 von 40 Fällen; auf `/` mobil m360 nur 1 von 5 beim Erstbesuch; Handy quer: Kopf und Leisten 32,4 % der Höhe (Schwelle 25 %).
- Lighthouse Probe `/` mobil, ein Lauf: 88, LCP 3.240 ms, TBT 237 ms, CLS 0; LCP-Element `p.max-w-mass` im Einstieg.

### Stufe B (offen bis E0-PRUEF-03)
Konsolenfehler, Bildsatz in 10 Größen, Erstes Bild aller Hauptansichten, axe, Lesbarkeit aller Seiten, reduzierte Bewegung, Lighthouse Median aus 3 mobil und Desktop, Funktionsspecs.

## 5. Probeläufe alter Stand (offen bis E0-PROBE-01…10)
P1 bis P5 × eigenes und anderes Gerät × A1 bis A6.

## 6. Stärken, die bleiben
- Sauberer technischer Kern: grüner Bestand, 289 Funktionsfälle aus dem Vorlauf, Weiterleitungen und 410 gepflegt, Adressen und strukturierte Daten fehlerfrei.
- Ein vorhandenes Designsystem mit gesperrter Palette, Tokens, Icon-Sprite und Bewegungsregister; v3 schärft es, statt ein zweites daneben zu bauen.
- Einwilligung sauber umgesetzt (gleichwertige Knöpfe, Karten erst nach Zustimmung).
- Echte, gute Kundenstimmen (Google 5,0 bei 27, Trustlocal 9,6 bei 25) und klare Firmendaten.
- 84 echte Fotos vom Betrieb liegen vor; 4 mit Note A, 72 mit B.

## 7. Schwächen, die der Lauf behebt
- Navigation: 5 Aufklappmenüs, 37 Ziele, 3 Ebenen, das Bad dreimal, Fachwörter im Menü.
- Anfragewege: 9 Wege in 8 Komponenten, 3 Formulare auf der Startseite.
- Sprache: Fachwörter ohne Erklärung, 830 Gedankenstriche, Floskeln („Perfektion“), „Vor-Ort-Aufmaß“ 132-mal.
- Bilder: keine echten Fotos, Generatorbilder, Platzhalter-Referenzen unter „Echte Referenzen“.
- Bewertungszeile liest sich als „5,0 von 527“ (`GoogleReviewsBadge.tsx:35-38`); die Zahl 27 steht vierfach hart im Code; Kundenstimmen in `schema.ts` weichen vom Wortlaut ab.
- Leistung: LCP auf `/` mobil über 3 s.
- Erstes Bild: auf kleinen Handys und im Querformat fehlen Hauptknopf oder Kontakt im ersten Bildschirm.
- Kleinere Bestandsfehler: `video-sitemap.xml` zeigt auf zwei Videos unter `/videos/`, die es nicht gibt, und auf Generatorbilder; das OG-Bild meldet 1200 × 630 (`metadata.ts:158-159`) für eine Datei mit 640 × 200. Nicht bestätigt hat der Linkprüfer zwei ältere Notizen: `/preise` steht in der Sitemap, und alle 168 Canonicals sind absolut und stimmen.
