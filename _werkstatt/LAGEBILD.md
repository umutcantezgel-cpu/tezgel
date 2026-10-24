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

### Stufe B (E0-PRUEF-03, `belege/e0/STUFE-B.md`)
- Bestand: npm ci, Build, Typprüfung, Linter, `qa:graph` Exit 0; `node --test` 37 von 37; Funktionsspecs 290 bestanden, 0 fehlgeschlagen, 12 übersprungen (4 `fixme` als Altfehler, 8 je Ansicht), gesamt 302.
- Konsole: 0 Fehler, 0 Seitenfehler, 0 eigene Anfragen ≥ 400 auf den 12 Hauptansichten (m390 und d1440).
- Überlauf: 24 Befunde, alle bei d1280 (je Hauptansicht 2, rechte Kante bei 1285 px); alle übrigen Größen ohne Befund.
- Erstes Bild: 116 von 240 Fällen mit allen fünf Elementen. Am schwächsten: Handy klein (m360, `/` nur 1 von 5 beim Erstbesuch), Querformat q844 durchgehend 3 von 5, d1280 2 bis 4 von 5; ab d1920 immer 5 von 5.
- Zugänglichkeit (axe, 132 Läufe): 0 Befunde in allen Schweren.
- Lesbarkeit (163 Seiten): 162 ROT, 1 ausgenommen. ROT je Regel: Gedankenstrich 162, Bindestrich 162, Glossar offen 155, Flesch 142, Floskel 135, Satz über 25 Wörter 57, Absatz über 4 Sätze 4.
- Reduzierte Bewegung: 0 Befunde.
- Lighthouse (E0-PRUEF-03L, Median aus 3, `belege/e0/lighthouse.json`): mobil Leistung 85 bis 95, Zugänglichkeit 99 bis 100, Best Practices und SEO je 100; LCP 2.411 bis 3.472 ms (über 2,5 s auf `/`, `/bad`, `/bad/badsanierung`, `/leistungen`, `/fliesen`, `/ueber-uns`, `/kontakt`, `/blog`), TBT 162 bis 376 ms (über 200 ms auf acht Seiten), CLS 0. Unter 90: `/` 89, `/leistungen` 87, `/kontakt` 88, `/blog` 85. Desktop überall 100, LCP unter 0,7 s. Auf `/` mobil: FCP 1.364 ms, LCP 3.472 ms, LCP-Element der Vorspann `p.max-w-mass` im Einstieg (beobachtete Renderverzögerung 170 ms; der Abstand zur FCP entsteht in der Simulation, Spur in E2-PRUEF-00).
- Bildsatz des ersten Bildschirms: `bilder/e0/<seite>/<gerät>.jpg` (120 Bilder).

## 5. Probeläufe alter Stand (E0-PROBE-01…10, Satz e0, Matrix `cache/probelauf/e0/matrix.json`)
Je Person zwei Gerätegruppen, Start `/`, Einwilligung als Erstbesuch („Alle ablehnen“ zählt als Handlung). Zahl = Handlungen bis zum Ziel; „offen“ = nicht gelöst innerhalb von 40 Handlungen. Rückgaben in `pakete/E0-PROBE-*.rueckgabe.md`.

| Person · Gerät | A1 | A2 | A3 | A4 | A5 | A6 |
|---|---|---|---|---|---|---|
| P1 · m390 | 3 | 3 | 27 | offen | offen | 21 |
| P1 · d1440 | 1 | 2 | 21 | offen | 6 | 4 |
| P2 · t768 | 0 | 1 | 13 | offen | 4 | 3 |
| P2 · d1440 | 1 | 0 | 12 | offen | 4 | 2 |
| P3 · m360 | 1 | 2 | 15 | offen | 4 | 11 |
| P3 · d1440 | 1 | 0 | 5 | offen | 10 | 3 |
| P4 · m390 | 1 | 2 | 16 | offen | 5 | 18 |
| P4 · d1280 | 1 | 0 | 12 | offen | 10 | 3 |
| P5 · m390 | 1 | 2 | 13 | offen | 6 | 19 |
| P5 · d1440 | 1 | 0 | 4 | offen | 9 | 13 |

- Gelöst: A1, A2, A3 und A6 je 10 von 10, A5 9 von 10, **A4 0 von 10** (11 Befunde „hoch“: keine Fotos fertiger Arbeiten, die Referenzseite sagt „Projektdokumentation in Vorbereitung“).
- Häufige Befunde: Menüpunkte unter der unteren Leiste nicht antippbar (P1, P4, P5 mobil); „Aufmaß anfragen“ führt zur Kontaktseite, nicht ins Formular (A3); Vorauswahl ohne Hinweis im Formular; Fachwörter (Walk-In-Dusche, Stelzlager, DIN 18534, Festpreisangebot, Endübergabe); Ort „Aßlar“ erst nach einem Bildlauf (P1 mobil); Telefonnummer im Kopf nur als Symbol; A6 mobil lang (11 bis 21 Handlungen) über „Alles für Ihr Vorhaben“.
- Zielwert Z-11 für den neuen Stand: jede Aufgabe gelöst und Handlungen ≤ diese Zahlen (bei „offen“: gelöst innerhalb der Grenze).

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
