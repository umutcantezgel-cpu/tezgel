# Analyse: SEO-Metadaten, JSON-LD, Sitemap, robots

> Momentaufnahme vom 01.11.2026 (Code-Stand `main` f19ebba, Werkstatt-Branch 40 Commits voraus). Erstellt als Grundlage für [`docs/seo/KONTEXT.md`](../KONTEXT.md); bei Abweichungen gilt `KONTEXT.md`, das nach einer unabhängigen Gegenprüfung korrigiert wurde. Zeilennummern können sich mit späteren Commits verschieben. Hinweise auf damals noch fehlende Dateien im Bildordner (`bildinventar`, `projekte.md`, `KONTEXT.md`, Platzhalter im README) sind mit dem Commit der Bilder erledigt. `B/` = `src/app/(bestand)/`.

Kürzel: `B/` = `src/app/(bestand)/`; `:n` = Zeile in der zuletzt genannten Datei. Was nicht markiert ist, steht so im Code; „Vermutung“ und „Bewertung“ sind Einschätzungen. Die Werte in Abschnitt 2 habe ich mit `generatePageMetadata` nachgerechnet (Node, Hilfsskript außerhalb des Repos, kein Build). Die Wikidata-IDs habe ich am 01.11.2026 über die Wikidata-API geprüft. Im Repo ist nichts geändert.

## 1. Wie Titel, Description, Canonical, OG, robots und JSON-LD entstehen

**Dokument.** Es gibt kein `src/app/layout.tsx`. Das Root-Layout ist `B/layout.tsx:5-17`, es bindet `B/_dokument.tsx:144-190` ein:
- `<html lang="de">` :154
- geo-Metas :162-165
- Root-JSON-LD :166
- 404 über `src/app/global-not-found.tsx:7-16`

Grundwerte stehen in `BESTAND_METADATA` (`B/_dokument.tsx:36-95`):
- Titel-`default` „Fliesenleger Wetzlar & Aßlar | Fliesenverlegung Tezgel“ und `template` „%s | Fliesenverlegung Tezgel“ (:38-41)
- Description :42, robots :68-78, Google-Verifizierung :88-90

**Je Seite** ruft `page` oder `layout` die Funktion `createMetadata` auf. Sie ist dieselbe wie `generatePageMetadata` (`src/lib/metadata.ts:123-176`). Die Werte der Seite schlagen die des Layouts. Deshalb wirken diese Layout-Werte nicht: `/leistungen` (`B/leistungen/layout.tsx:3-7`), `/kontakt` (`B/kontakt/layout.tsx:6-10`), `/referenzen` (`B/referenzen/layout.tsx:3-7`).
- **Titel:** läuft durch `sanitizeTitle` (`src/lib/metadata.ts:17-110`) und wird als `title.absolute` ausgegeben (:138). Das Template greift auf diesen Seiten daher nie. Ausnahme ist `B/login/layout.tsx:5`: Dort steht die Marke doppelt, die Seite ist aber noindex.
- **Description:** läuft durch `seitenBeschreibung()` (`src/lib/beschreibung.ts:42-44`).
  - Steht die Adresse in `META_BESCHREIBUNGEN` (`src/inhalte/meta/index.ts:15-22`), gilt immer dieser Eintrag, nicht der übergebene Text.
  - Danach kürzt oder ergänzt `sanitizeDescription` (`src/lib/beschreibung.ts:8-33`): Unter 120 Zeichen wird „Der Termin bei Ihnen vor Ort ist kostenfrei. …“ angehängt, über 155 Zeichen wird mit „...“ abgeschnitten.
- **Canonical:** `SITE_URL` plus Pfad, die Startseite ohne Slash, immer auf die Seite selbst (`src/lib/metadata.ts:124`).
- **Weitere Ausgaben:** hreflang `de` und `x-default` zeigen auf das Canonical (:140-146). OG und Twitter übernehmen Titel und Description (:147-161). Ohne eigenes Bild ist das OG-Bild das Logo (:132-135). robots kommt als Option (:117-120, :162-172).
- **JSON-LD:**
  - Ausgabe über `src/components/seo/JsonLd.tsx:11-19`.
  - `src/components/seo/SeitenDaten.tsx:28-40` erzeugt WebPage, BreadcrumbList und alles unter `weitere`.
  - Die WebPage-Description läuft noch einmal durch `seitenBeschreibung` (`src/lib/schema.ts:359`).
  - Ordner-Layouts geben nur den Unterseiten einen Service-Knoten (`src/components/seo/OrdnerService.tsx:9-15`, Daten in `src/lib/schema.ts:468-518`).

**Titelregel.** Ein Titel bleibt nur unverändert, wenn er „Tezgel“ enthält und 45–58 Zeichen lang ist (`src/lib/metadata.ts:21`). Sonst passiert Folgendes:
- Der Markenzusatz wird entfernt (:25-41) und „ · Tezgel“ angehängt (:47-48).
- Unter 45 Zeichen wird aufgefüllt (:63-90).
- Über 58 Zeichen wird gekürzt (:93-97).

Nachgerechnet:
- „Fliesenleger Wetzlar | Tezgel“ wird zu „Fliesenleger Wetzlar · Fachbetrieb Tezgel“.
- „Fliesenverlegung Tezgel – Ihr Fliesenleger in Aßlar seit 2008“ wird zu „… in Aßlar seit“.

**Tests.** Sie laufen nur mit `npm test`; die CI macht nur Audit und Lint (`.github/workflows/security.yml:22-29`).
- `test/titleLength.test.mjs:7-59` prüft nur „höchstens 58 Zeichen“, und zwar mit Beispieltiteln statt der echten Formeln.
- `test/meta.test.mjs:18-24` prüft die META-Einträge: 120–155 Zeichen, ohne „...“, „ – “, „&“ und „!“. Zeile :39-48 prüft, dass jede Adresse nur einmal vorkommt.
- `test/orte.test.mjs:30-36` prüft Ortstitel (höchstens 58) und Description (120–155). Zeile :38-43 verbietet „–“ und „—“ in allen Ortstexten, auch im Titel.
- `test/seitenformel-folgen.test.mjs` prüft nur die Reihenfolge der Seitenabschnitte, nichts zu SEO.
- `scripts/qa/check-graph.mjs:27-29` verlangt ein `aggregateRating`.

## 2. Aktuelle Werte

Das Canonical ist jeweils `https://www.tezgel.de` plus Pfad. `sanitizeTitle` verändert keinen dieser Titel.

| Adresse | Titel (Zeichen) · Quelle | Description (Zeichen) · Quelle |
|---|---|---|
| `/` | Fliesenleger Aßlar und Wetzlar \| Fliesenverlegung Tezgel (56) · `src/inhalte/start.ts:14` | „Fliesenverlegung Tezgel aus Aßlar: Badsanierung, Böden, Balkon und Terrasse für Wetzlar und Umgebung. …“ (146) · `:15` |
| `/standorte` | Fliesenleger Standorte & Einsatzgebiete \| Tezgel (48) · `B/standorte/page.tsx:37` | „Wir arbeiten in 13 Städten …“ (154) · `src/inhalte/meta/seiten.ts:9`; der Text in `B/standorte/page.tsx:38` wirkt nicht |
| `/standorte/wetzlar` | Fliesenleger in Wetzlar \| Fliesenverlegung Tezgel (49) · Formel `src/inhalte/orte.ts:39` | „Fliesenleger für Wetzlar: Wir erneuern Bäder, verlegen Böden und machen Balkone dicht. …“ (131) · Formel `:40` |
| `/standorte/asslar` | Fliesenleger in Aßlar \| Fliesenverlegung Tezgel (47) · gleiche Formel | gleiche Formel (129) |
| `/leistungen` | Fliesenleger Leistungen Wetzlar \| Fliesenverlegung Tezgel (57) · `src/inhalte/leistungen.ts:13` | (146) · `:14` |
| `/leistungen/bad` (Übersicht) | Badsanierung & Komplettbäder Wetzlar \| Tezgel (45) · `B/leistungen/[id]/layout.jsx:11` | „Badsanierung in Wetzlar: …“ (140) · `src/inhalte/meta/leistungen.ts:4` |
| `/leistungen/bad/wetzlar` (Muster `/leistungen/[id]/[stadt]`, 4 × 13 Seiten) | Badsanierung & Bäder in Wetzlar \| Fliesen Tezgel (48) · Formel `${displayName} in ${city.name} \| Fliesen Tezgel`, bei `aussen` `\| Tezgel` (`B/leistungen/[id]/[stadt]/page.tsx:130-139`) | „Badsanierung in Wetzlar: Leistungen, Ablauf und Festpreis vom Fachbetrieb Tezgel. …“ (126) · `:115-117` |
| `/ausstellung/wetzlar` | Fliesenberatung in Wetzlar \| Fliesenverlegung Tezgel (52) · `B/ausstellung/wetzlar/page.jsx:26` | „Fliesenberatung in Wetzlar nach Vereinbarung …“ (152) · `src/inhalte/meta/seiten.ts:10`; die Konstante in `B/ausstellung/wetzlar/page.jsx:27` wirkt nicht |
| `/referenzen` | Referenzen und Bewertungen \| Fliesenleger Tezgel Aßlar (54) · `src/inhalte/referenzen.ts:33` | (133) · `:34-35` |
| `/kontakt` | Kontakt und Termin vor Ort \| Fliesenleger Tezgel Aßlar (54) · `src/inhalte/kontakt.ts:40` | (153) · `:41-42` |
| `/bad` | Ihr neues Bad in Aßlar & Wetzlar \| Fliesenverlegung Tezgel (58) · `src/inhalte/bad.ts:13` | (149) · `:14-15` |
| `/fliesen` | Fliesenverlegung einfach erklärt \| Fliesenleger Tezgel (54) · `src/inhalte/fliesen.ts:18` | (154) · `:19-20` |

Aßlar hat eine normale Ortsseite (`src/config/cities.ts:108-115`) plus vier Leistungs-Ort-Seiten und ist zugleich Thema der Startseite. Die H1 der Wetzlar-Seite lautet „Fliesenleger in Wetzlar“ (`src/inhalte/orte.ts:44`).

## 3. JSON-LD

**Auf jeder Seite** steht der Root-Graph (`src/lib/schema.ts:307-316`):
- Country (Q183, korrekt)
- Organization (:74-102), sameAs nur Instagram (:100)
- WebSite mit Coday als creator (:107-135)
- Person (:140-163)
- LocalBusiness `#local-business` (:168-227)
- Product (:247-302)

**LocalBusiness:**
- Typen HomeAndConstructionBusiness, GeneralContractor, LocalBusiness (:170)
- NAP :179-190, geo 50.5900/8.4600 (:191-195)
- areaServed: neun Städte plus Hessen (:196-207). Lahnau und Hüttenberg haben keine Seite; sechs Orte mit eigener Seite fehlen.
- Öffnungszeiten Mo–Do 7:30–18, Fr 7:30–17, Samstag keine (:210-225)
- kein priceRange, kein sameAs, kein hasMap

**Das Google-Unternehmensprofil ist nirgends verlinkt.** Im Code steht keine Maps- oder CID-Adresse, nur ein Google-Suchlink (`src/config/reviews.js:18`).

**Product:**
- Preis „0.00“, `priceValidUntil` „2026-12-31“ (`src/lib/schema.ts:270-278`)
- aggregateRating 5,0 bei 27 Bewertungen aus `src/config/reviews.js:9-19`. Laut :1-3 sind sie vom Google-Profil übernommen, Stand September 2026.
- drei Rezensionen (`src/lib/schema.ts:287-300`)
- Der Kommentar :243-245 sagt, Product sei gewählt worden, um Googles Filter für Eigenbewertungen zu umgehen.

**Je Seite** stehen immer WebPage und BreadcrumbList. Bei `/kontakt` steht ContactPage statt WebPage, und zwar im Layout (`B/kontakt/layout.tsx:18-26`). Dazu kommt:
- `/standorte`: CollectionPage (`B/standorte/page.tsx:48-64`)
- `/leistungen`: OfferCatalog mit Preis 0.00 (`B/leistungen/page.jsx:38-65`)
- `/leistungen/[id]`: Service (`B/leistungen/[id]/page.jsx:153-169`)
- `/leistungen/[id]/[stadt]`: Service mit areaServed City (`B/leistungen/[id]/[stadt]/page.tsx:183-200`)
- `/referenzen`: CollectionPage (`B/referenzen/page.jsx:26-42`)
- `/bad` und `/fliesen`: Service (`B/bad/page.jsx:17-24`, `B/fliesen/page.jsx:33-42`)
- `/` und `/ausstellung/wetzlar`: nichts weiter (`B/page.tsx:25`, `B/ausstellung/wetzlar/page.jsx:72-77`)

**Ortsseiten** (`B/standorte/[stadt]/page.tsx:102-125`, von dort `src/lib/schemaPyramid.ts:289-362`):
- City `#city` mit Wikidata-sameAs (:297-316)
- ein zweites LocalBusiness „Fliesenverlegung Tezgel – <Ort>“ mit derselben Aßlarer Anschrift, ohne Öffnungszeiten (:318-345)
- Zusammen mit dem Root-Knoten stehen damit zwei LocalBusiness mit gleichem NAP auf jeder Ortsseite.
- Ungenutzter Code: `getStateHubSchema` und `getCountyHubSchema` (:237-280) sowie `buildCityLocalBusinessNode` (`src/lib/schema.ts:523-558`).

**Die Wikidata-IDs in `src/lib/schemaPyramid.ts` sind fast alle falsch.** Ist-Wert (was er wirklich ist), Zeile, richtige ID:

| Ort | Ist im Code | Zeile | Richtig |
|---|---|---|---|
| Hessen | Q1198 (Nordrhein-Westfalen) | :51, :312 | Q1199 |
| Aßlar | Q547844 („Orbital Sciences X-34“) | :64 | Q558494 |
| Wetzlar | Q4161 (Wikipedia-Kategorie) | :75 | Q4178 |
| Gießen | Q3870 (Nairobi) | :148 | Q3874 |
| Marburg | Q3935 (Windhoek) | :166 | Q3869 |
| Landkreis Gießen | Q7901 (Vogelsbergkreis) | :140 | Q7904 |
| Wetteraukreis | falsch | :194 | Q7910 |
| Marburg-Biedenkopf | falsch | :158 | Q7902 |
| Herborn | falsch | :86 | Q18998 |
| Dillenburg | falsch | :97 | Q517381 |
| Haiger | falsch | :108 | Q516448 |
| Braunfels | falsch | :119 | Q525612 |
| Solms | falsch | :130 | Q566156 |
| Limburg | falsch | :184 | Q16026 |
| Bad Nauheim | falsch | :202 | Q16105 |
| Friedberg | falsch | :213 | Q516485 |
| Butzbach | falsch | :224 | Q569680 |

Richtig sind nur Lahn-Dill-Kreis (:56) und Limburg-Weilburg (:176).

**Weiteres:**
- Der WebPage-Name weicht vom Titel ab (`B/leistungen/[id]/page.jsx:156`, `B/leistungen/[id]/[stadt]/page.tsx:186`).
- Organization und LocalBusiness sind zwei getrennte Entitäten (`src/lib/schema.ts:181`).
- Bewertung: „GeneralContractor“ (:170) und `alumniOf` Handwerkskammer (:149-152) passen fachlich nicht.

## 4. NAP

Einheitlich sind:
- Name: Fliesenverlegung Tezgel
- Anschrift: Hohwardstraße 14, 35614 Aßlar
- Telefon: 06441 / 44 83 567 (+49 6441 4483567)
- Mobil/WhatsApp: 0172 / 67 28 504
- Fax: 06441 / 44 83 548
- E-Mail: info@tezgel.de

Sie stehen gleichlautend in `src/config/company.js:18-34,98-112`, `src/shared/config/site.ts:42-73`, `src/lib/config.ts:122-155`, `src/lib/schema.ts:95,179-190,537-550` und `src/lib/maps/getMapEmbedUrl.ts:29-35`.
- `src/config/site.js` und `src/lib/data/company.ts` reichen nur `COMPANY_DATA` durch; `src/lib/anschrift.ts` formatiert nur.
- Ich habe keine abweichende Nummer oder Anschrift gefunden.
- `0172 / 1234567` ist ein Formular-Platzhalter, z. B. `src/components/forms/LeadQuickForm.tsx:230`.
- kontakt@tezgel.de ist nur Absender der Mails (`src/lib/email/mailer.ts:28`).

Widersprüche:
1. **Freitag:** 17 Uhr in `src/lib/schema.ts:219-224`, `src/config/company.js:125` und im Fuß (`src/components/common/Footer.jsx:196`). Dagegen steht „Mo - Fr: 07:30 – 18:00 Uhr“ (`src/config/company.js:128`, `src/lib/config.ts:174`). Das ist sichtbar auf `/ausstellung/wetzlar` (`B/ausstellung/wetzlar/page.jsx:201`) und auf `/standorte` (`B/standorte/page.tsx:230`).
2. **Samstag:** Im JSON-LD steht keiner (`src/lib/schema.ts:211-212`). Sichtbar steht 08:00–14:00 „Vor-Ort-Termine“ (`src/config/company.js:129`). In `src/app/llms.txt/route.ts:19` steht es als feste Öffnungszeit.
3. **Namenszusätze:** „… Aßlar“ (`src/lib/schema.ts:80`), „… Aßlar & Wetzlar“ (:173, `src/config/company.js:9`), „… – <Ort>“ (`src/lib/schemaPyramid.ts:321`).
4. **Host:** www in `src/lib/schema.ts:11`, ohne www in `public/humans.txt:11`.
5. **Einsatzgebiet:** vier verschiedene Listen (`src/lib/schema.ts:196-207`, `src/config/company.js:79-94`, `src/shared/config/site.ts:117-136`, `src/config/cities.ts`). `llms.txt` nennt zusätzlich Weilburg (`src/app/llms.txt/route.ts:30`).
6. **Entfernungen:** `src/config/cities.ts` zählt ab Wetzlar (:4; Wetzlar 0 in :15, Aßlar 5 in :111). `CITY_HUB_DATA` zählt ab Aßlar (`src/lib/maps/getMapEmbedUrl.ts:86,98`). Auf der Seite steht deshalb mal „ab Wetzlar“ (`B/standorte/page.tsx:76`), mal „ab Aßlar“ (`src/inhalte/orte.ts:27`).
7. **Vermutung:** Die geo-Werte des Firmensitzes sind die Ortsmitte von Aßlar (gleich wie die Stadt, `src/lib/schemaPyramid.ts:62-63`), nicht das Gebäude.

## 5. Sitemap, robots, Weiterleitungen, IndexNow, Verifizierung

**Sitemap** (`src/app/sitemap.ts`), statisch erzeugt (:10). 164 URLs (:73-84, nachgezählt):

| Gruppe | Anzahl | priority |
|---|---|---|
| feste Adressen (:19-62) | 30 | Start 1,0; `/ausstellung/wetzlar` 0,7 (:38) |
| Leistungs-Übersichten | 4 | 0,9 |
| Leistung × Ort | 52 | 0,7 |
| Ortsseiten | 13 | 0,8 |
| Musterbäder | 12 | 0,7 |
| Themenseiten | 34 | 0,8 / 0,7 |
| Referenzen | 6 | 0,5 |
| Blogartikel | 13 | 0,6 |

- `lastModified` ist bei allen die Build-Zeit (:65-71).
- Nicht enthalten sind die Rechtsseiten und `/login`; sie sind noindex, z. B. `B/impressum/layout.tsx:10`.

**robots** (`src/app/robots.ts:24-38`):
- Für `*` und 13 KI-Crawler gelten dieselben Regeln: allow `/`, disallow `/api/`, `/login`, `/admin`, `/*?*`.
- Der Sitemap-Verweis steht in :37.
- `/video-sitemap.xml` ist leer und nirgends verlinkt (`src/app/video-sitemap.xml/route.ts:21-24`).

**Weiterleitungen:**
- `next.config.ts:15-23`: vier 308-Weiterleitungen, keine mit Ortsbezug.
- Eine Regel für www/ohne www oder für den Schrägstrich am Ende gibt es im Repo nicht (Vermutung: in Vercel eingestellt).
- `src/proxy.ts:8-47`: 410 plus noindex für Adressen der Vorgängerfirma.

**IndexNow:**
- Schlüssel `4c6796df61f5479387fc4f56b1ed6b19` (`src/lib/seo/indexnow.ts:9`), Schlüsseldatei `public/4c6796df61f5479387fc4f56b1ed6b19.txt`.
- Nur manuell: `npm run indexnow` (`package.json:17`) liest die Live-Sitemap, sonst eine Ersatzliste (`scripts/submit-indexnow.mjs:58-80`).
- Zusätzlich gibt es `POST /api/indexnow` (`src/app/api/indexnow/route.ts:12-38`). Sie meldet alle URLs, auch die noindex-Rechtsseiten (`src/lib/seo/indexnow.ts:42-46`).
- Geschützt ist die Route nur mit `INDEXNOW_SECRET` (`route.ts:22-25`); in `.env.example:29` ist der Wert leer.
- Google nutzt IndexNow nicht.

**Google-Verifizierung:**
- Es gibt die Datei `public/google831a76ab6f34b9f6.html` und ein Meta-Tag mit demselben Wert (`B/_dokument.tsx:88-90`).
- Vermutung: Als Meta-Tag wirkt der Wert nicht; die Verifizierung läuft über die Datei.
- Eine Bing-Verifizierung gibt es im Code nicht.

## 6. Ansatzpunkte

**(a) Startseite auf Marke und Aßlar ausrichten**
- Titel und Description in `src/inhalte/start.ts:14-15` ändern. Das wirkt auf `B/page.tsx:16-20` und auf die WebPage in :25.
  - Beispiel: „Fliesenverlegung Tezgel | Fliesenleger in Aßlar“ (47 Zeichen, bleibt unverändert).
  - „Wetzlar“ aus Titel und Description nehmen.
  - Für `/` gibt es keinen META-Eintrag, der dazwischenfunkt.
- Die Grundwerte im Root angleichen (`B/_dokument.tsx:39,42,64-65`).
- Die H1 „Perfektion auf jedem Quadratmeter.“ enthält weder Marke noch Ort (`src/inhalte/start.ts:21`, Wortlaut des Auftraggebers). Die Ortszeile steht in :31.
- Im LocalBusiness (`src/lib/schema.ts:168-227`): Link zum Google-Unternehmensprofil als `sameAs`/`hasMap`, genaue Koordinaten, ein einheitlicher Name.
- `/standorte/asslar` konkurriert mit der Startseite um „Fliesenleger Aßlar“. Wenn die Seite weitergeleitet werden soll:
  - 308 in `next.config.ts:15-23` eintragen und den Eintrag aus `src/config/cities.ts:108-115` nehmen.
  - Das betrifft die Ortsseite, vier Leistungsseiten, Sitemap, IndexNow und die Navigation (`src/config/navigation.js:174`).
  - `test/orte.test.mjs:25-28` erwartet 13 Orte und muss angepasst werden.

**(b) Wetzlar-Zielseite `/standorte/wetzlar` mit eigenem Titel, eigener Description, eigenem Schema**
- Titel und Description aller 13 Orte kommen aus `ortsInhalt()` (`src/inhalte/orte.ts:38-41`). Sie wirken über `generateMetadata` (`B/standorte/[stadt]/page.tsx:60-75`) und über `SeitenDaten` (:119-125).
- Für eigene Wetzlar-Werte gibt es zwei Wege:
  - eine Ausnahme je Slug in `orte.ts` oder in `inhaltFuer()` (:42-54);
  - für die Description zusätzlich ein Eintrag `'/standorte/wetzlar'` in `src/inhalte/meta/seiten.ts`. Dieser Eintrag gewinnt immer.
- Grenzen: Titel 45–58 Zeichen mit „Tezgel“, kein „–“ oder „—“, Description 120–155 Zeichen ohne „&“ und „!“.
- Schema in `getCityLandingPageSchema` (`src/lib/schemaPyramid.ts:289-362`) oder über `weitere` (`B/standorte/[stadt]/page.tsx:102-112`) anpassen:
  - Wikidata-IDs korrigieren.
  - Das zweite LocalBusiness durch einen Service ersetzen: `buildServiceNode` (`src/lib/schema.ts:412-459`) mit Option `areaServedCity`. Der provider ist dort fest `#local-business` (:429).
- Ein eigenes OG-Bild über die Option `image` setzen (`src/lib/metadata.ts:116,133-135`). Bisher ist es das Logo mit 640 × 200 (`src/lib/schema.ts:87-88`), ausgegeben als 1200 × 630.
- Interne Links auf die Seite: Ortsblock der Startseite (`src/inhalte/start.ts:110-113`) und Navigation (`src/config/navigation.js:173-176`).
- Achtung beim Zusammenführen:
  - Auf dem Branch `claude/tezgel-website-redesign-iqxt8z` sind `src/inhalte/{orte,start,leistungen,kontakt,referenzen,bad,fliesen}.ts` und `B/standorte/[stadt]/page.tsx` geändert. Die Meta-Blöcke sind dort gleich (per Diff geprüft), Konflikte sind trotzdem wahrscheinlich.
  - Unverändert sind dort `metadata.ts`, `schema.ts`, `schemaPyramid.ts`, `sitemap.ts`, `robots.ts` und `src/inhalte/meta/*`.

**(c) Duplicate- und Kannibalisierungsrisiken vermeiden**
- „Wetzlar“ steht heute im Titel all dieser Seiten:
  - `/`, `/leistungen`, `/bad`
  - `/leistungen/bad`, `/wohnen`, `/aussen` (`B/leistungen/[id]/layout.jsx:11-13`; H1 in `B/leistungen/[id]/page.jsx:61-66`; Descriptions in `src/inhalte/meta/leistungen.ts:4-7`)
  - `/ausstellung/wetzlar`, `/standorte/wetzlar`
  - die vier Seiten `/leistungen/*/wetzlar`

  Die Übersichtsseiten ortsneutral machen, Wetzlar nur auf den Wetzlar-Seiten nennen.
- `/ausstellung/wetzlar` nennt nur den Aßlarer Sitz (`B/ausstellung/wetzlar/page.jsx:165-168`). Entweder zusammenlegen (308 plus `src/app/sitemap.ts:38`, `src/lib/seo/indexnow.ts:26`, `src/config/navigation.js:175`, `src/inhalte/meta/seiten.ts:10`) oder klar abgrenzen.
- „Badsanierung Wetzlar“ bedienen heute drei Seiten: `/bad`, `/leistungen/bad` und `/leistungen/bad/wetzlar`. Eine davon als Zielseite festlegen.
- Vorlagenseiten:
  - Laut `src/inhalte/orte.ts:1-4` unterscheiden sich die 13 Ortsseiten nur in Name, Kreis und Entfernung.
  - Die 52 Leistung-Ort-Texte entstehen aus Vorlagen (`B/leistungen/[id]/[stadt]/page.tsx:49-95`).
  - Bewertung: Risiko, als Doorway-Seiten eingestuft zu werden. Ferne Orte ohne echte Aufträge über `robots` auf noindex setzen (`src/lib/metadata.ts:117-120`) oder aus der Matrix nehmen (`src/app/sitemap.ts:76-79`).
- Ein einheitliches Markensuffix festlegen; heute gibt es fünf Varianten.

## Risiken und Fehler

1. **Sterne als Product auf jeder Seite** (`src/lib/schema.ts:243-302`). Die Bewertungen sind von Google übernommen, der Filter wird bewusst umgangen. Bewertung: Das verstößt gegen Googles Regeln für Rezensions-Snippets und kann eine manuelle Maßnahme auslösen. Wer es entfernt, muss `scripts/qa/check-graph.mjs:27-29` anpassen.
2. **`priceValidUntil` 2026-12-31 läuft in zwei Monaten ab** (`src/lib/schema.ts:274` und :447, `B/leistungen/page.jsx:54`).
3. **Falsche Wikidata-Verweise und doppeltes LocalBusiness auf allen 13 Ortsseiten** (Abschnitt 3).
4. **Öffnungszeiten widersprechen sich.** Auf `/ausstellung/wetzlar` sogar auf derselben Seite: im Text 18 Uhr, im Fuß 17 Uhr.
5. **Google-Unternehmensprofil nicht verknüpft;** die Bewertungszahl ist von Hand eingetragen (`src/config/reviews.js:15,28`).
6. **Die Kürzung schneidet die Marke ab:** „Fliesenverlegung & Wohnen in Limburg an der Lahn“ und „Badsanierung & Bäder in Friedberg (Hessen) | Fliesen“ (`B/leistungen/[id]/[stadt]/page.tsx:137-139` zusammen mit `src/lib/metadata.ts:93-97`). Die Tests prüfen diese echten Formeln nicht.
7. **OG-Bildmaße falsch angegeben** (`src/lib/metadata.ts:132-135`).
8. **Sitemap und IndexNow:** `lastmod` sagt nichts aus; IndexNow meldet noindex-Seiten; die POST-Route ist ohne Secret offen.
9. **Vermutung:** `/*?*` sperrt Adressen mit Parametern für Crawler, etwa UTM-Links aus dem Google-Unternehmensprofil.
10. **Falle beim Bearbeiten:** Geänderte Description-Konstanten in den Seiten wirken nicht, solange es einen META-Eintrag für die Adresse gibt (`src/lib/beschreibung.ts:43`).

## Offene Fragen an den Auftraggeber

1. Wie lautet das Google-Unternehmensprofil genau: Name, Kategorie, Maps-Link, Pin-Position, Öffnungszeiten? Hat der Betrieb freitags bis 17 oder bis 18 Uhr offen, und wie ist es samstags?
2. Soll `/standorte/asslar` bleiben oder auf `/` weitergeleitet werden?
3. Soll die Wetzlar-Adresse `/standorte/wetzlar` bleiben, oder eine sprechende Adresse wie `/fliesenleger-wetzlar` mit 308 bekommen?
4. Gibt es in Wetzlar oder Gießen einen echten Beratungsort? Wenn nicht: `/ausstellung/*` zusammenlegen?
5. Soll das Sterne-Markup entfallen, sodass die Bewertungen nur noch sichtbar auf der Seite stehen?
6. In welchen Orten gibt es echte Aufträge? Das ist die Grundlage, um die 13 Orts- und 52 Leistung-Ort-Seiten auszudünnen.
7. Welche der 127 neuen Fotos stammen nachweislich aus Wetzlar oder Aßlar? Ohne Nachweis sind Ortsangaben an Fotos nach `src/inhalte/orte.ts:3-4` nicht erlaubt.
8. Ist `www.tezgel.de` in Vercel die Hauptdomain, mit Weiterleitung von `tezgel.de`? Welche Search-Console-Property gibt es, und gibt es Bing Webmaster Tools?
9. Wird die SEO-Arbeit auf `main` oder auf dem Gestaltungs-Branch gemacht, und wer führt beides zusammen?
