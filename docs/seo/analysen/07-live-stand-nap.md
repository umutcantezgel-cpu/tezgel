# Analyse: Live-Stand www.tezgel.de und Einträge (NAP)

> Momentaufnahme vom 01.11.2026 (Code-Stand `main` f19ebba, Werkstatt-Branch 40 Commits voraus). Erstellt als Grundlage für [`docs/seo/KONTEXT.md`](../KONTEXT.md); bei Abweichungen gilt `KONTEXT.md`, das nach einer unabhängigen Gegenprüfung korrigiert wurde. Zeilennummern können sich mit späteren Commits verschieben. Hinweise auf damals noch fehlende Dateien im Bildordner (`bildinventar`, `projekte.md`, `KONTEXT.md`, Platzhalter im README) sind mit dem Commit der Bilder erledigt. `B/` = `src/app/(bestand)/`.

## 1 Live-Stand www.tezgel.de (Abruf 01.11.2026)

### Fakten: Technik
- **Weiterleitungen:** `http://tezgel.de` → 308 `https://tezgel.de` → 308 `https://www.tezgel.de` (zwei Sprünge). `http://www…` → 308 auf https. Eine URL mit Schrägstrich am Ende → 308 auf die URL ohne Schrägstrich. Unbekannte URLs liefern eine echte 404 (zum Beispiel `/standorte/lahnau`). HSTS ist aktiv. Die alten URLs `tezgel.de/impressum/` und `tezgel.de/datenschutz/` kommen nach zwei 308-Sprüngen auf 200 an.
- **Auf allen geprüften Seiten gleich:** Status 200, Canonical zeigt auf die eigene URL (Startseite `https://www.tezgel.de`), robots-Meta `index, follow` (Googlebot zusätzlich `max-image-preview:large`), hreflang de/x-default. Als og:image steht immer das Logo. Das geo-Meta „Aßlar 50.5900;8.4600“ steht auf allen Seiten, auch auf den Wetzlar-Seiten.
- **robots.txt:** Alles ist erlaubt außer `/api/`, `/login`, `/admin` und `/*?*`. Es gibt eigene Allow-Gruppen für 13 KI-Crawler (GPTBot, ClaudeBot, PerplexityBot, Google-Extended …). Die Sitemap ist eingetragen.
- **sitemap.xml:** 164 URLs, alle liefern 200. Alle tragen dasselbe lastmod `2026-10-31T20:55:22.390Z` (Build-Zeit). Bild-Einträge gibt es keine.

| Gruppe | URLs |
|---|---|
| Startseite | 1 |
| Ortsseiten `/standorte/*`: Übersicht + Aßlar, Wetzlar, Gießen, Marburg, Limburg, Bad Nauheim, Friedberg, Butzbach, Herborn, Dillenburg, Haiger, Braunfels, Solms | 1 + 13 |
| Leistungs-Ort-Seiten `/leistungen/{bad,wohnen,aussen,untergrund}/{ort}` (4 × 13) + `/leistungen` und 4 Übersichten | 52 + 5 |
| `/ausstellung/wetzlar`, `/ausstellung/giessen` | 2 |
| Bad (davon 12 Musterbäder) | 21 |
| Fliesen-Themen | 15 |
| Balkon/Terrasse, Treppen, Naturstein, Untergrund, Reparatur, Schadensanalyse | 19 |
| Blog | 1 + 13 |
| Referenzen | 1 + 6 |
| Unternehmen/Service (Über uns, Team, Karriere, FAQ, Preise, Kontakt, Termin, Beratung …) | 14 |

- **Titles (alle 164 erfasst):** 25 enthalten „Wetzlar“, 19 enthalten „Aßlar“. Es gibt keine doppelten Titles, keiner ist länger als 60 Zeichen. „Wetzlar“ steht unter anderem bei Startseite, `/bad`, `/bad/badsanierung`, `/leistungen`, `/beratung` (H1 „Kostenlose Fliesenberatung in Wetzlar“), `/termin`, `/ausstellung/wetzlar` und `/karriere`. Der Firmenname im Title wechselt: „Fliesenverlegung Tezgel“, „Fliesen Tezgel“, „Fliesenleger Tezgel“, „Fachbetrieb Tezgel“.

### Fakten: geprüfte Seiten

| Seite | Title (Zeichen) | Description (Zeichen) | H1 |
|---|---|---|---|
| / | Fliesenleger Aßlar und Wetzlar \| Fliesenverlegung Tezgel (56) | „…aus Aßlar: Badsanierung, Böden, Balkon und Terrasse für Wetzlar und Umgebung…“ (146) | Perfektion auf jedem Quadratmeter. |
| /standorte | Fliesenleger Standorte & Einsatzgebiete \| Tezgel (48) | 13 Städte, „von Aßlar und Wetzlar bis Marburg…“ (154) | Standorte & Einsatzgebiete in Mittelhessen |
| /standorte/wetzlar | Fliesenleger in Wetzlar \| Fliesenverlegung Tezgel (49) | „Fliesenleger für Wetzlar: Wir erneuern Bäder, verlegen Böden und machen Balkone dicht…“ (131) | Fliesenleger in Wetzlar |
| /standorte/asslar | Fliesenleger in Aßlar \| Fliesenverlegung Tezgel (47) | gleicher Text, Ort getauscht (129) | Fliesenleger in Aßlar |
| /kontakt | Kontakt und Termin vor Ort \| Fliesenleger Tezgel Aßlar (54) | Anruf, WhatsApp, Anfrage, „Festpreis für Wetzlar und Hessen“ (153) | Nehmen Sie Kontakt auf. Wir kommen für einen Termin zu Ihnen. |
| /referenzen | Referenzen und Bewertungen \| Fliesenleger Tezgel Aßlar (54) | „…mit 5,0 Sternen bei Google…“ (133) | Das sagen unsere Kunden, und so sieht unsere Arbeit aus. |
| /ausstellung/wetzlar | Fliesenberatung in Wetzlar \| Fliesenverlegung Tezgel (52) | Beratung „nach Vereinbarung“ (152) | Fliesenberatung & Materialauswahl in Wetzlar |
| /leistungen/bad/wetzlar | Badsanierung & Bäder in Wetzlar \| Fliesen Tezgel (48) | „Badsanierung in Wetzlar: Leistungen, Ablauf und Festpreis…“ (126) | Badsanierung & Bäder in Wetzlar |

| Seite | H2-Gliederung (kurz) | Nennungen Wetzlar/Aßlar | Bilder (davon Projektfotos) | Formular |
|---|---|---|---|---|
| / | Was möchten Sie ändern? → Leistungen → Ablauf → Arbeiten → Kundenstimmen → Einsatzgebiet → Termin (7) | 13/17 | 9 (6) | 5 Felder: Name*, Telefon*, E-Mail, Ort, Notiz |
| /standorte | 45-km-Gebiet → Stadtwahl → Leistungen → Hauptstandort Aßlar → … (7) | 31/26 | 3 (0) | – |
| /standorte/wetzlar | Sie suchen…? → Das machen wir in Wetzlar → Ablauf → So arbeiten wir → Kunden → Qualitätsversprechen → Termin in Wetzlar (7) | 24/13 | 6 (3) | 5 Felder + Einwilligungs-Checkbox als Pflicht (3 Pflichtfelder) |
| /standorte/asslar | wie Wetzlar | 12/24 | 6 (dieselben 3 Fotos wie Wetzlar) | wie Wetzlar |
| /kontakt | Termin anfragen → Lieber anrufen? → Einsatzgebiet → Was danach passiert (4) | 13/17 | 3 (0) | Assistent mit 3 Schritten, erst im Browser gerendert: Projektart → Fläche/Zeitraum/Ort → Name*, Telefon*, E-Mail, Notiz (laut Code auf main) |
| /referenzen | Galerie, Vorher/Nachher Außentreppe, Kundenstimmen … (7) | 11/12 | 32 (29) | – |
| /ausstellung/wetzlar | Ablauf → Beratungsthemen → 8-Punkte-Versprechen (4) | 28/14 | 3 (0) | – |
| /leistungen/bad/wetzlar | Fachkompetenz für Wetzlar → Leistungsspektrum → Schritte → Weitere Leistungen in Wetzlar … (6) | 36/15 | 3 (0) | wie Ortsseite |

„3 (0)“ heißt: dreimal das Logo, kein Projektfoto.

- **Alt-Texte:** Alle 65 Bilder dieser 8 Seiten haben einen Alt-Text. Beispiele:
  - „Bad im Dachgeschoss mit Dusche hinter einer Glaswand und großen beigen Fliesen an Wand und Boden“
  - „Dusche ohne Stufe mit Sitzbank und Mosaikfliesen am Boden und an der Bank“
  - „Gäste-WC mit WC und Bidet an der Wand vor weißen Metrofliesen“
  - „Außentreppe mit terrakottafarbenen Fliesen und hellen Stufenkanten“
  - Logo: „Fliesenverlegung Tezgel“

  Kein Alt-Text nennt einen Ort. Die Dateinamen sind sprechend (zum Beispiel `/images/arbeiten/bad/dachgeschoss-bad-dusche-glaswand-beige.jpg`).
- **Vorlagen-Gleichheit** (Wortfolge verglichen, Ortsname vorher ersetzt): `/standorte/wetzlar` gleicht `/standorte/asslar` zu 94 % und `/standorte/giessen` zu 95 %. `/leistungen/bad/wetzlar` gleicht `/leistungen/bad/marburg` zu 96 %. Die Leistungs-Ort-Seiten haben keine Projektfotos. Die Wetzlar-Seite nennt keinen Stadtteil und keine Wetzlarer Postleitzahl.
- **Interne Links:** Die Startseite verlinkt `/standorte/wetzlar` und `/standorte/asslar` (im Abschnitt Einsatzgebiet und im Footer). `/standorte/wetzlar` verlinkt alle 4 Leistungs-Ort-Seiten für Wetzlar und `/ausstellung/wetzlar`.
- **Weitere Anfrage-Strecken:**
  - `/bad/badanfrage`: 5 Schritte
  - `/bad/badplaner`: 5 Schritte
  - `/fliesen/festpreisangebot`: 4 Schritte
  - `/fliesen/konfigurator`: 4 Schritte
  - `/bad/projekt-check`: 4 Schritte
  - `/termin` und `/beratung`: kein Formular im ausgelieferten HTML
- **JSON-LD, auf jeder Seite gleich:**
  - Firmeneintrag als HomeAndConstructionBusiness/GeneralContractor/LocalBusiness (`#local-business`): „Fliesenverlegung Tezgel“, Hohwardstraße 14, 35614 Aßlar, +49 6441 4483567, info@tezgel.de, Koordinaten 50.59/8.46, Mo–Do 7:30–18:00, Fr 7:30–17:00. Kein sameAs, keine Mobilnummer.
  - Das Einsatzgebiet (areaServed) nennt Aßlar, Wetzlar, Gießen, Braunfels, Solms, Herborn, Dillenburg, Lahnau, Hüttenberg und Hessen. Für Lahnau und Hüttenberg gibt es keine Ortsseite. Marburg, Limburg, Bad Nauheim, Friedberg, Butzbach und Haiger haben eine Ortsseite, fehlen aber im Einsatzgebiet.
  - Dazu: Organization (sameAs nur Instagram), WebSite, Person „Deniz Tezgel“.
  - Ein **Product** „…Komplettpaket“ mit Angebot über 0,00 EUR und **aggregateRating 5,0 aus 27** plus 3 Reviews.
- **JSON-LD, seitenspezifisch:**
  - `/standorte/wetzlar` und `/standorte/asslar`: je ein zweiter LocalBusiness-Eintrag „Fliesenverlegung Tezgel – Wetzlar“ bzw. „– Aßlar“ mit eigener @id, aber der Aßlarer Adresse.
  - `/leistungen/bad/wetzlar`: Service. `/kontakt`: ContactPage. `/standorte` und `/referenzen`: CollectionPage.
- **Bewertungsangaben auf der Website:**
  - Die Website zeigt „27 Bewertungen bei Google · Stand September 2026“.
  - Der Link „Alle Bewertungen bei Google lesen“ führt auf eine Google-Suche, der Kartenlink auf `/kontakt` auf eine Adresssuche, keiner von beiden auf das Unternehmensprofil.
  - `/referenzen` schreibt: „Auf Trustlocal haben wir 9,6 von 10 Punkten aus 25 Bewertungen.“

## 2 Index-Lage

**Fakten:**
- Das verfügbare Suchwerkzeug durchsucht einen anderen Index als Google (US-Index). `site:` wird ignoriert, die Google-Indexierung lässt sich damit also nicht prüfen.
- Die Suchen „Fliesenverlegung Tezgel“ und „Tezgel Fliesen Aßlar“ liefern keine Treffer zur Firma.
- Mit Zusatzbegriffen (Hohwardstraße, „Fliesenleger in Wetzlar“) erscheinen:
  - nur die **alte** tezgel.de-Fassung: Title „Hauptseite - Fliesenverlegung Tezgel“ unter `https://tezgel.de/`, `/impressum/` und `/datenschutz/`
  - fliesen-asslar.de, Trustlocal, 11880, Gelbe Seiten
  - Das Örtliche, aber nur mit dem Betrieb von Özcan Tezgel
  - die Referenzseite auf codayweb.de
  - das GitHub-Repo `umutcantezgel-cpu/tezgel` samt PR #1

  Keine der neuen Unterseiten taucht auf.
- Das GitHub-Repo ist **öffentlich** (laut API `visibility: public`).

**Vermutung:** Dieser Index zeigt den Stand vor dem Relaunch. Ob Google die 164 neuen URLs kennt, lässt sich nur in der Search Console klären (Indexierungsbericht, URL-Prüfung von `/standorte/wetzlar`).

## 3 Einträge und NAP

Abgleich gegen die Website und das Impressum: Fliesenverlegung Tezgel, Inhaber Deniz Tezgel, Hohwardstraße 14, 35614 Aßlar, 06441 4483567, 0172 6728504, Fax 06441 4483548, info@tezgel.de.

| Fundstelle | Name | Adresse | Telefon | Website | Bewertungen | Abweichung |
|---|---|---|---|---|---|---|
| Google-Profil (nur indirekt: Trustlocal, Website) | ? | ? | ? | ? | 5,0 / 27 | Profil selbst nicht abrufbar |
| Trustlocal | Fliesenverlegung Tezgel | Hohwardstraße 14, Aßlar | – | keine | 8,8 / 27 (dazu Google 5,0 / 27) | Website nennt veraltet 9,6 / 25 |
| Gelbe Seiten (Platz 7 von 17) | **Tezgel Fliesenverlegung** | Hohwardstr. 14, 35614 Aßlar | **06441 5643776** (Hauptnummer), **06441 2047127**, 0172 6728504 | http://www.tezgel.de | 0 | Hauptnummer 4483567 fehlt, zwei andere Festnetznummern |
| 11880 (1), aktualisiert 10.10.2026 | Fliesenverlegung Tezgel | Hohwardstr. 14, 35614 Aßlar | nur 0172 6728504 | https://tezgel.de | 0 | Festnetz fehlt, keine Öffnungszeiten |
| 11880 (2), aktualisiert 04.10.2026 | **Ismail Deniz Tezgel** | Hohwardstr. 14 | 06441 5643776, 0172 6728504 | https://tezgel.de | 0 | doppelter Eintrag unter Personenname |
| fliesen-asslar.de (Partnerseite, Anbieter laut Impressum STARK Deutschland GmbH, Vermerk „Mit Hilfe von KI erstellt“) | Fliesenverlegung Tezgel | Hohwardstr. 14, 35614 Aßlar | 06441 4483567 | eigene Domain, **kein Link auf tezgel.de** | – | zweite Website mit 4 Seiten und eigenem LocalBusiness-JSON-LD, `index, follow` |
| Instagram @fliesenverlegung_tezgel | „Deniz Ismail Tezgel“ (Seitentitel) | Profil nur mit Login sichtbar | – | – | – | Personenname statt Firmenname |
| Cylex | laut Suchtreffer „Ismail Deniz Tezgel“, Hohwardstraße 14 | | | | | Seite antwortet mit 403, unbestätigt |
| Das Örtliche, Facebook, Yelp, MyHammer, Handwerkskammer | nicht gefunden | | | | | |

**Fakt, Verwechslungsgefahr:** Ein anderer Betrieb heißt „Özcan Tezgel Kreativ Fliesenlegerfachbetrieb“, Wetzlarer Str. 42 A, 35614 Aßlar, 0163 4986644 (11880, Das Örtliche). Ein Suchtreffer von meinestadt nennt dafür Wetzlarer Str. 21.

## 4 Vermutungen und Bewertung
1. **Kannibalisierung:**
   - Der Startseiten-Title „Fliesenleger Aßlar und Wetzlar“, `/standorte/asslar` und rund 20 weitere Seiten mit Wetzlar im Title (`/beratung`, `/ausstellung/wetzlar`, `/termin`, `/leistungen` …) konkurrieren mit `/standorte/wetzlar`.
   - Für das Ziel (Startseite für Marke und Aßlar, eigene Seite für Wetzlar) gehört „Wetzlar“ aus dem Startseiten-Title heraus.
   - `/standorte/asslar` muss sich klar von der Startseite abgrenzen oder mit ihr zusammengelegt werden.
2. **Brückenseiten-Risiko:** 13 Ortsseiten (94–95 % gleich) und 52 Leistungs-Ort-Seiten (96 % gleich, ohne Fotos) kann Google als Brückenseiten (doorway pages) werten. Die Wetzlar-Seite braucht eigene Inhalte: Projekte aus Wetzlar, Stadtteile, eigene Fotos und Kundenstimmen. Die 127 neuen Fotos würden hier am meisten bringen.
3. **Strukturierte Daten:**
   - Ein Product mit eigener Bewertung für die eigene Leistung bringt vermutlich kein Rich Result und birgt ein Risiko für eine manuelle Maßnahme.
   - Die Einträge „Fliesenverlegung Tezgel – Wetzlar/Aßlar“ geben eine Filiale vor, die es nicht gibt. Besser ist ein einziger Firmeneintrag (`#local-business`), auf den die Ortsseiten über Service und areaServed verweisen.
   - Das Einsatzgebiet (areaServed) sollte zu den Ortsseiten passen.
   - Als sameAs fehlt der Link zum Google-Profil.
4. **NAP:**
   - Gelbe Seiten und 11880 auf 06441 4483567 und den Firmennamen „Fliesenverlegung Tezgel“ korrigieren.
   - Den doppelten 11880-Eintrag „Ismail Deniz Tezgel“ zusammenführen.
   - Bei Google prüfen, welche Website, welche Nummer und welche Kategorie im Profil stehen.
   - Auf der Website die Trustlocal-Angabe aktualisieren und den Bewertungslink auf das Profil setzen.
5. **fliesen-asslar.de:** Als zweite Website mit gleichen NAP-Daten verteilt sie die Signale auf zwei Domains. Vorschlag: auf tezgel.de verlinken oder per 301 dorthin umleiten lassen, falls STARK das erlaubt. Möglicherweise verweist auch das Google-Profil auf diese Domain.
6. **Formulare:** Es gibt mindestens 8 verschiedene Anfragewege. Die Pflicht-Checkbox zur Einwilligung steht nur auf den Orts- und Leistungsseiten, nicht auf der Startseite. Ob sie nötig ist, sollte rechtlich geprüft werden. Ein einheitliches Kurzformular (Name, Telefon, Ort, Anliegen) wäre einfacher.
7. **Wettbewerber „Haag“:** Gemeint ist vermutlich „Fliesenleger Fachbetrieb Leonid Haak“ aus Leun mit eigener Seite `https://www.fliesenleger-haak.de/fliesenleger-in-wetzlar.html` (nur als Suchtreffer gesehen, nicht geöffnet).
8. **Öffentliches Repo:** Ins öffentliche Repo gepushte Fotos sind öffentlich abrufbar, bevor sie auf der Website stehen.

## Quellen (alle abgerufen am 01.11.2026)
- https://www.tezgel.de/, /standorte, /standorte/wetzlar, /standorte/asslar, /kontakt, /referenzen, /ausstellung/wetzlar, /leistungen/bad/wetzlar, /impressum, /termin, /beratung, /robots.txt, /sitemap.xml, dazu Statusabfrage aller 164 Sitemap-URLs
- https://trustlocal.de/hessen/a%C3%9Flar/fliesenleger/fliesenverlegung-tezgel/
- https://www.gelbeseiten.de/branchen/fliesenleger/a%c3%9flar
- https://www.gelbeseiten.de/gsbiz/0f576fac-d6b9-44a7-80ea-7ecd575052d2
- https://www.11880.com/suche/fliesenleger/asslar
- https://www.11880.com/branchenbuch/asslar/060691660B113399323/fliesenverlegung-tezgel.html
- https://www.11880.com/branchenbuch/asslar/060691660B113752899/ismail-deniz-tezgel.html
- https://www.11880.com/branchenbuch/asslar/060691660B107292264/oezcan-tezgel-kreativ-fliesenlegerfachbetrieb.html (Listeneintrag)
- https://www.dasoertliche.de/Themen/Kreativ-Fliesenlegerfachbetrieb-%C3%96zcan-Tezgel-A%C3%9Flar-Wetzlarer-Str (Suchtreffer)
- https://www.fliesen-asslar.de/ (mit /impressum und Sitemap)
- https://www.instagram.com/fliesenverlegung_tezgel/ (nur Seitentitel)
- https://web2.cylex.de/suche/fliesenleger%20und%20plattenleger/Asslar (403)
- https://branchenbuch.meinestadt.de/asslar/brazl/100-95328-96319-78345 (Suchtreffer)
- https://github.com/umutcantezgel-cpu/tezgel
- https://www.codayweb.de/en/work/fliesen-tezgel (Suchtreffer)
- https://www.fliesenleger-haak.de/fliesenleger-in-wetzlar.html (Suchtreffer)
