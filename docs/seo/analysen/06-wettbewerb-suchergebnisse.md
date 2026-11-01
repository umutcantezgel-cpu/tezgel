# Analyse: Wettbewerb und Suchergebnisse

> Momentaufnahme vom 01.11.2026 (Code-Stand `main` f19ebba, Werkstatt-Branch 40 Commits voraus). Erstellt als Grundlage für [`docs/seo/KONTEXT.md`](../KONTEXT.md); bei Abweichungen gilt `KONTEXT.md`, das nach einer unabhängigen Gegenprüfung korrigiert wurde. Zeilennummern können sich mit späteren Commits verschieben. Hinweise auf damals noch fehlende Dateien im Bildordner (`bildinventar`, `projekte.md`, `KONTEXT.md`, Platzhalter im README) sind mit dem Commit der Bilder erledigt. `B/` = `src/app/(bestand)/`.

## 1. Wettbewerber „Fliesenverlegung Haag“

**Gesehen:** Im Raum Wetzlar gibt es keinen Fliesenbetrieb „Haag“. Die Namenssuche fand nur Betriebe in Haag i. OB, Schopfloch und Herne. Gemeint ist sehr wahrscheinlich **Haak**. Dafür gibt es zwei Kandidaten:

- **A: Fliesenleger Fachbetrieb Leonid Haak**, Westerwaldring 30, 35638 Leun. Domain fliesenleger-haak.de (Contao). Wetzlar-Seite `/fliesenleger-in-wetzlar.html`. Dazu 12 Ortsseiten nach dem Muster `/fliesenleger-in-{ort}.html`: Gießen, Wetzlar, Limburg, Weilburg, Solms, Braunfels, Dillenburg, Herborn, Bad Homburg, Haiger, Butzbach und Asslar.
- **B: Alexander Haak Fliesenlegermeister GmbH & Co. KG**, In der Murch 24, 35579 Wetzlar. Domain haak-fliesen.de (WordPress mit Divi und Rank Math). Wetzlar-Seite `/fliesenleger-wetzlar/`. Dazu 4 Ortsseiten: Gießen, Wetzlar, Limburg, Butzbach.

**Warum A der Hauptvergleich ist:**
- Der Title der Wetzlar-Seite beginnt mit „…Leonid Haak - Fliesenverlegung in Wetzlar“. Das passt zum genannten Namen.
- A sitzt wie Tezgel außerhalb von Wetzlar.
- Die Wetzlar-Seite von A erscheint in 3 von 4 allgemeinen Suchen, die von B nur in einer.

Beide zeigen das beschriebene Muster: Bei „Fliesenleger Wetzlar“ erscheint die Wetzlar-Seite und nicht die Startseite.

**Analyse (gesehen):** Ich habe den Quelltext gelesen. Die Wortzahlen zählen nur den Inhalt ohne Navigation und Footer und sind gerundet.

| | A Start | A Wetzlar | B Start | B Wetzlar |
|---|---|---|---|---|
| Title | „Fliesenleger Fachbetrieb Leonid Haak in Leun bei Wetzlar, …“ (302 Zeichen) | „…Leonid Haak - Fliesenverlegung in Wetzlar. Badsanierung, …“ (303) | „Startseite - Haak Fliesenleger-Meisterbetrieb“ (45) | „Fliesenleger Wetzlar - Haak Fliesenleger-Meisterbetrieb“ (55) |
| Description | 213 Zeichen, wiederholt den Title | 214, wiederholt den Title | 46, ohne Ort | 62, „…Ihr Fliesenleger in Wetzlar“ |
| H1 | 1 (Begrüßung, Leun und 3 Städte) | **9 H1**: „Ihr Fliesenleger … in Wetzlar“, „Fachkundige Beratung in Wetzlar“, „Badsanierung / Balkonsanierung / Zementfliesen / Großformatfliesen / Mosaik in Wetzlar“, Referenzen, Kontakt | Firmenname | „Fliesenleger Wetzlar“ |
| H2 | keine | Kontaktdaten, Kontaktformular | Referenzen, Kontakt, Kundenbewertungen | „Leistungen Fliesenleger Wetzlar“, „Referenzen Fliesenleger Wetzlar“, Kundenbewertungen |
| Wörter | ~120 | ~990 | ~300 | ~280 |
| „Wetzlar“ (mit Title) | 4× | 14× | 4× | 10× |
| Canonical | fehlt | fehlt | ja | ja |
| JSON-LD | WebPage, ImageObject | wie Start | Organization, WebSite, WebPage, Article, Person | wie Start; veröffentlicht 03/2018, geändert 12/2022 |
| Lokale Signale | Adresse Leun, Telefon nicht klickbar, E-Mail | wie Start, dazu Formular | Adresse Wetzlar, Telefon klickbar, Bewertungs-Widget 4,4/5 (21), Siegel | wie Start |
| Bilder ohne Alt-Text | 11 von 12 | 33 von 34 | 1 von 3 | 12 von 14 |

- **Bei beiden fehlt:** Karte, Öffnungszeiten, LocalBusiness-Markup, Preise, Vorher-und-Nachher-Bilder und FAQ.
- **Verlinkung bei A:** Jede Seite hat ein Städte-Menü mit 12 Links „Fliesenleger in {Ort}“. Das title-Attribut lautet jeweils „…Fliesenverlegung in {Ort}“. Zur Startseite führen nur „START“ und das Logo.
- **Verlinkung bei B:** Im Footer jeder Seite stehen „Fliesenleger Gießen / Wetzlar / Limburg / Butzbach“. Zurück geht es über „Startseite“ und das Logo.
- **Vorlagen:** Ich habe die Texte nach dem Ausblenden der Ortsnamen verglichen (0 bis 1, 1 = gleicher Text).
  - Die Ortsseiten von A sind praktisch gleich: Wetzlar und Asslar 1,0, Wetzlar und Solms 0,99.
  - B ist teilweise eigenständig: Wetzlar und Limburg 0,67.

## 2. Suchergebnisse

**Wichtig:** Das ist die Websuche des Werkzeugs mit einem eigenen Index aus den USA, **nicht Google**. Es gibt kein Local Pack und keine Maps-Treffer, keinen Standortbezug und keine echten Positionen; die Reihenfolge ist die der Ausgabe.

Der Index ist für tezgel.de veraltet. Er zeigt „Hauptseite - Fliesenverlegung Tezgel“, live steht „Fliesenleger Aßlar und Wetzlar | Fliesenverlegung Tezgel“.

Ich habe jede Suche zweimal laufen lassen. Der normale Lauf brachte fast nur Jobbörsen und Verzeichnisse und **in keiner Suche tezgel.de**. Unten steht der gründlichere Lauf, Treffer 1 bis 9.

**„Fliesenleger Wetzlar“: tezgel.de nicht dabei**
1. starofservice.de/liste/hessen/lahn-dill-kreis/wetzlar/fliesenlegen, „10 beste Fliesenleger in Wetzlar…“
2. fliesenleger-haak.de/fliesenleger-in-wetzlar.html (A)
3. fliesenleger-hk.de/, „Fliesenleger HK“
4. haak-fliesen.de/fliesenleger-wetzlar/ (B)
5. madak.de/leistungen/verlegung/verlegung-eigenheim/, „Fliesenleger für Badsanierung“
6. madak.de/
7. madak.de/unser-unternehmen/service-gebiete/, „Ihr Fliesenleger für Rhein-Main & Mittelhessen“
8. fliesenleger.net/wetzlar/kretzschmar-fliesenlegermeister-gmbh-co-kg-aUOdBN
9. madak.de/standorte/showroom-wetzlar/

**„Fliesenleger Aßlar“: tezgel.de nicht dabei.** Tezgel kommt nur als Verzeichniseintrag „Hohwardstr. 14“ vor.
1. dasoertliche.de/Themen/Fliesen-Fliesenverlegung-Fliesenleger/Aßlar.html
2. dasoertliche.de/Themen/Fliesen/Aßlar.html
3. gelbeseiten.de/branchen/fliesenleger/aßlar
4. dastelefonbuch.de/Branchen/Fliesenleger/Aßlar
5. fliesenleger.net/asslar/…, Udo Schneider
6. fliesenleger.net/asslar/…, Heinz Will
7. fliesenleger.io/6762-udo-schneider-fliesenlegerei
8. fliesenleger.net/asslar/…, Peter Künholz
9. fliesenleger.net/asslar/…, Yüksel

**„Fliesenverlegung Wetzlar“: tezgel.de dabei (Treffer 6, Startseite)**
1. gelbeseiten.de/branchen/fliesen/wetzlar
2. fliesenleger-haak.de/fliesenleger-in-wetzlar.html (A)
3. hasselbach-fliesenverlegung.de/kontakt.html (Sitz Reiskirchen, Title mit 20 Ortsnamen)
4. hasselbach-fliesenverlegung.de/
5. madak.de/leistungen/verlegung/verlegung-eigenheim/
6. tezgel.de/, „Hauptseite - Fliesenverlegung Tezgel“
7. xn--sthr-fliesendesign-mtb.de/ (Stähr Fliesendesign, Wetzlar)
8. fliesenleger.net/wetzlar/reinhold-wittlif-bauhandwerker-aULh4F
9. madak.de/

**„Fliesenleger Wetzlar Badsanierung“: tezgel.de dabei (Treffer 6, Startseite)**
1. houzz.de/experten/…/top-fliesenleger-giessen-marburg-wetzlar-…
2. kleinanzeigen.de/s-wetzlar/fliesenleger/k0l4837
3. fliesenleger-haak.de/fliesenleger-in-wetzlar.html (A)
4. fliesenleger-haak.de/ (Startseite von A)
5. madak.de/leistungen/verlegung/verlegung-eigenheim/
6. tezgel.de/
7. fliesenleger-portal.de/…/Wetzlar/3811/FLIESEN-STUDIO+SCHÄFER
8. kuenholz.de/fliesen (Aßlar)
9. madak.de/handwerksleistungen/

**„Fliesenverlegung Tezgel“: tezgel.de dabei, aber erst ab Treffer 5**
1. github.com/umutcantezgel-cpu/tezgel/pull/1
2. github.com/umutcantezgel-cpu/tezgel
3. codayweb.de/en/work/fliesen-tezgel
4. **fliesen-asslar.de/**, „Fliesenverlegung Tezgel aus Aßlar“
5. tezgel.de/datenschutz/
6. tezgel.de/impressum/
7. tezgel.de/
8. trustlocal.de/hessen/aßlar/fliesenleger/fliesenverlegung-tezgel/
9. 11880.com/…/oezcan-tezgel-kreativ-fliesenlegerfachbetrieb.html. Das ist ein **anderer Betrieb** in Aßlar, Wetzlarer Str. 42a.

**Weitere Befunde (gesehen):**
- **fliesen-asslar.de ist eine zweite Tezgel-Website.**
  - Sie ist indexierbar (index, follow) und verweist per Canonical auf sich selbst.
  - Adresse, Telefon und E-Mail sind dieselben wie bei tezgel.de.
  - Sie hat ein eigenes LocalBusiness-Markup.
  - Sie ist mit einem Baukasten gebaut, mit dem Vermerk „Mit Hilfe von KI erstellt“.
- **trustlocal.de** zeigt für Tezgel Google 5,0 aus 27 Bewertungen und verlinkt keine Website.
- **tezgel.de hat schon eine Wetzlar-Seite:** /standorte/wetzlar.
  - Title „Fliesenleger in Wetzlar | Fliesenverlegung Tezgel“, H1 „Fliesenleger in Wetzlar“, ~1.000 Wörter.
  - Markup: LocalBusiness und AggregateRating 5,0/27.
  - Die Seite erscheint in keinem Lauf.
- **Für „Wetzlar“ konkurrieren auf tezgel.de mehrere Seiten:** die Startseite (Title), /ausstellung/wetzlar und vier Seiten /leistungen/{bad|wohnen|aussen|untergrund}/wetzlar.
- **Die Sitemap hat 164 URLs**, darunter 13 Orte × 4 Leistungsbereiche. Textgleichheit: /leistungen/bad/wetzlar und /giessen 0,96, /standorte/wetzlar und /asslar 0,89.

## 3. Ableitung

**Was die Wetzlar-Seite von A vermutlich richtig macht (Vermutung):**
- **Klare Zuordnung:** „Wetzlar“ steht in URL, am Title-Anfang, in der H1 und in jeder Leistungsüberschrift. Die Startseite ist auf Leun ausgerichtet und hat wenig Text. Deshalb nimmt die Suchmaschine die Wetzlar-Seite.
- **Umfang:** Rund 1.000 Wörter mit Leistungsblöcken wie „Badsanierung in Wetzlar“ decken Kombi-Suchen ab.
- **Links:** Von jeder Seite führt der genaue Ankertext „Fliesenleger in Wetzlar“ dorthin. Die Seiten sind alt, die Fotos stammen ab 2015.
- **Technisch ist die Seite schwach:** Titles mit 300 Zeichen, 9 H1, kein Canonical, kein LocalBusiness, fast keine Alt-Texte.
- **Nicht nachahmen:** Google führt in den Spam-Richtlinien gleichartige Seiten für einzelne Städte als Beispiel für Brückenseiten (Doorway Pages) auf.

**Muster für Tezgel (ohne zu kopieren):**
1. **Eine Zielseite je Ort.** „Fliesenleger Wetzlar“ gehört auf /standorte/wetzlar.
   - Der Title der Startseite nennt nur Marke und Aßlar, Wetzlar kommt dort heraus.
   - /ausstellung/wetzlar und /leistungen/*/wetzlar auf ihre jeweilige Leistung ausrichten und auf /standorte/wetzlar verlinken.
2. **Interne Links:** Ankertext „Fliesenleger in Wetzlar“ aus Startseite, Footer, Leistungs- und Projektseiten. Zurück zur Startseite mit „Fliesenverlegung Tezgel in Aßlar“.
3. **Leistungsblöcke auf der Wetzlar-Seite:** Bad, Balkon, Großformat, Abdichtung nach DIN 18534. Mit echten Projekten aus Wetzlar, nicht nur mit getauschtem Ortsnamen.
4. **Die 52 Seiten „Leistung × Ort“:** zusammenlegen, auf noindex setzen oder deutlich eigenständig machen. Sonst drohen das Brückenseiten-Problem und Konkurrenz der eigenen Seiten untereinander.
5. **fliesen-asslar.de:** per 301 auf www.tezgel.de umleiten, falls ihr Zugriff habt. Außerdem prüfen, welche Website im Google-Unternehmensprofil steht. Sonst verteilt sich die Marke auf zwei Domains (Vermutung).
6. **Markensuche:**
   - Das öffentliche GitHub-Repo steht vor tezgel.de. Ihr könntet es auf privat stellen.
   - Wegen des anderen Betriebs Özcan Tezgel überall gleich schreiben: „Fliesenverlegung Tezgel, Inhaber Deniz Tezgel, Hohwardstraße 14“.
7. **Bewertungs-Markup prüfen:** Das AggregateRating 5,0/27 entspricht vermutlich den Google-Bewertungen. Laut Google gibt es für Bewertungen, die ein Betrieb über sich selbst auf der eigenen Seite verwaltet, keine Sterne bei LocalBusiness. Bewertungen anderer Websites dürfen nicht zusammengefasst werden. Die Bewertungen deshalb sichtbar auf der Seite zeigen.
8. **Local Pack (nicht geprüft):** Laut Google zählen Relevanz, Entfernung und Bekanntheit, dazu gehören die Rezensionen. Die Wetzlar-Seite ersetzt das Unternehmensprofil nicht.

**Lücken der Konkurrenz, die Tezgel besetzen kann:**
- **Echte Projektfotos:**
  - A zeigt 23 Fotos ohne Beschriftung und ohne Alt-Text; auf der Startseite vermutlich Bilder der Hersteller.
  - B zeigt 10 Fotos von 2018 ohne Alt-Text.
  - Tezgel kann die 127 neuen Fotos nach Projekt einbinden, mit Ort, Leistung, Fläche und beschreibendem Alt-Text.
- **Vorher und Nachher:** gibt es bei keinem der beiden.
- **Bewertungen:**
  - A hat keine, B hat 4,4/5 aus 21, davon 14 % „Furchtbar“.
  - Madak hat 4,8/5 aus 19 (ProvenExpert, laut Suchtreffer).
  - Tezgel hat Google 5,0 aus 27. Kundenstimmen aus Wetzlar gehören auf die Wetzlar-Seite.
- **Reaktionszeit:**
  - Niemand nennt Öffnungs- oder Rückrufzeiten.
  - Bei A ist das Telefon nicht klickbar, B hat kein Formular auf der Ortsseite.
  - Tezgel: klickbare Nummer, WhatsApp, eine Rückrufzusage, aber nur wenn sie einhaltbar ist.
- **Festpreis:** Keiner nennt Preise, nur ein „kostenloses Angebot“. Tezgel kann einen Preisrahmen oder einen Festpreis nach Aufmaß angeben, wenn das stimmt, und auf /preise verlinken.
- **Spezialleistungen:** A wirbt mit Zementfliesen, Großformat, DIN 18531 und TÜV-Zertifikat. Tezgel kann das barrierefreie Bad, die Abdichtung nach DIN 18534 und die Förderung belegen.
- **Formular:**
  - A hat 3 Pflichtfelder (Name, Telefon, E-Mail) plus Nachricht.
  - Tezgel hat auf /standorte/wetzlar Name und Telefon als Pflicht, dazu E-Mail, PLZ/Ort, Nachricht und den Datenschutz-Haken. Hinzu kommt ein unbeschriftetes Feld, vermutlich eine Spamfalle.
  - Ziel: Name, Telefon oder E-Mail, Ort, Anliegen.

### Quellen (alle abgerufen am 01.11.2026)
- https://www.fliesenleger-haak.de/start.html, …/fliesenleger-in-wetzlar.html, …/fliesenleger-in-asslar.html, …/fliesenleger-in-solms.html, …/robots.txt
- https://haak-fliesen.de/, …/fliesenleger-wetzlar/, …/fliesenleger-giessen/, …/fliesenleger-limburg/
- https://madak.de/, https://madak.de/unser-unternehmen/service-gebiete/
- https://www.fliesen-asslar.de/
- https://www.tezgel.de/ sowie /standorte/wetzlar, /standorte/asslar, /leistungen/bad/wetzlar, /leistungen/bad/giessen, /ausstellung/wetzlar, /sitemap.xml
- https://trustlocal.de/hessen/a%C3%9Flar/fliesenleger/fliesenverlegung-tezgel/
- https://developers.google.com/search/docs/essentials/spam-policies
- https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- https://support.google.com/business/answer/7091?hl=de
- Namenssuche „Haag“, zum Beispiel https://sellwerk.de/firmenprofil/haag-martin-fliesen-kachelofenbau
- Websuche des Werkzeugs: 5 Suchen, jeweils im normalen und im gründlicheren Lauf

**Methode:** Title, Meta-Daten, JSON-LD, Überschriften, Links und Alt-Texte habe ich per HTTP abgerufen und automatisch ausgewertet. Die Textgleichheit ist die Ähnlichkeit der Wortfolge (0 bis 1) nach dem Ausblenden der Ortsnamen.
