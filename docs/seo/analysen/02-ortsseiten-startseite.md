# Analyse: Ortsseiten, Startseite, interne Verlinkung

> Momentaufnahme vom 01.11.2026 (Code-Stand `main` f19ebba, Werkstatt-Branch 40 Commits voraus). Erstellt als Grundlage für [`docs/seo/KONTEXT.md`](../KONTEXT.md); bei Abweichungen gilt `KONTEXT.md`, das nach einer unabhängigen Gegenprüfung korrigiert wurde. Zeilennummern können sich mit späteren Commits verschieben. Hinweise auf damals noch fehlende Dateien im Bildordner (`bildinventar`, `projekte.md`, `KONTEXT.md`, Platzhalter im README) sind mit dem Commit der Bilder erledigt. `B/` = `src/app/(bestand)/`.

## 1 · Orte und erzeugte Adressen

Alle Orte kommen aus `CITIES` (`src/config/cities.ts:11-116`), insgesamt 13. Die Entfernungen werden an zwei Stellen gepflegt: `distanceKm` gilt „ab Wetzlar“ (`cities.ts:4`), `CITY_HUB_DATA` gilt ab Aßlar (`src/lib/maps/getMapEmbedUrl.ts:81-238`). Die Zonen werden aus den Aßlar-Werten berechnet (`src/lib/einzugszonen.ts:13-17,42-50`).

| Slug | Name | km `cities.ts` | km ab Aßlar | Zone |
|---|---|---|---|---|
| wetzlar | Wetzlar | 0 | 5 | nah |
| asslar | Aßlar | 5 | 0 | nah (Sitz) |
| solms | Solms | 8 | 8 | nah |
| braunfels | Braunfels | 10 | 10 | nah |
| herborn | Herborn | 20 | 20 | mittel |
| giessen | Gießen | 25 | 25 | mittel |
| dillenburg | Dillenburg | 25 | 25 | mittel |
| haiger | Haiger | 30 | 30 | weit |
| limburg | Limburg an der Lahn | 35 | 35 | weit |
| butzbach | Butzbach | 35 | 35 | weit |
| marburg | Marburg | 40 | 40 | weit |
| bad-nauheim | Bad Nauheim | 40 | 40 | weit |
| friedberg | Friedberg (Hessen) | 45 | 45 | weit |

**Erzeugte Adressen:**
- 13 × `/standorte/<slug>` (`src/app/(bestand)/standorte/[stadt]/page.tsx:56-58`).
- 52 × `/leistungen/<bad|wohnen|aussen|untergrund>/<slug>` (`src/app/(bestand)/leistungen/[id]/[stadt]/page.tsx:97-105`; Gewerk-IDs in `src/config/services.js:6,41,74,105`).
- Alle 65 stehen in der Sitemap (`src/app/sitemap.ts:76-79`) und in der IndexNow-Liste (`src/lib/seo/indexnow.ts:56-60`).
- Dazu kommen `/standorte`, `/ausstellung/wetzlar` und `/ausstellung/giessen` (`sitemap.ts:37-39`).
- Weiterleitungen (308) stehen in `next.config.ts:15-22`. `src/lib/wege.ts:9-45` regelt nur die 410-Antworten für Adressen der Vorgängerfirma.

**Aßlar:** Es gibt eine Aßlar-Seite: `/standorte/asslar` (`cities.ts:108-115`) plus vier `/leistungen/*/asslar`. Titel „Fliesenleger in Aßlar | Fliesenverlegung Tezgel“ (`src/inhalte/orte.ts:39`), Ortssatz „…hat seinen Sitz in Aßlar.“ (`orte.ts:23-24`).

**Wetzlar heute:**
- eine Ortsseite aus derselben Vorlage wie alle anderen,
- vier Seiten „Leistung in Wetzlar“,
- `/ausstellung/wetzlar`,
- „Wetzlar“ in Titel und H1 der vier Leistungsübersichten (`leistungen/[id]/layout.jsx:10-15`, `leistungen/[id]/page.jsx:61-66`),
- „Wetzlar“ im Titel der Startseite (`src/inhalte/start.ts:14`).

## 2 · Wie eine Ortsseite gebaut wird

Kette: `standorte/[stadt]/page.tsx` → `inhaltFuer()` (`:42-54`) → `ortsInhalt()` (`orte.ts:19-86`) → Vorlage `OrtsSeite` (`src/components/vorlagen/OrtsSeite.tsx:39-58`). Die Vorlage setzt: Einstieg mit H1, Lage, „Was wir tun“, Ablauf, Beleg, Qualitätsversprechen, nächster Schritt mit Formular und Nachbarorten. Metadaten kommen aus dem Inhalt (`page.tsx:60-75`). Strukturierte Daten: `SeitenDaten` plus City- und LocalBusiness-Knoten (`page.tsx:102-125`, `src/lib/schemaPyramid.ts:289-345`).

**Was je Ort wirklich eigen ist:**
- der Ortsname (rund 15 Einsetzungen),
- der Landkreis in einem Satz (`orte.ts:53`),
- der Entfernungssatz (`orte.ts:22-27`),
- eine von nur zwei Fotogruppen (`orte.ts:34` über sechs Fotos in `src/inhalte/galerie.ts:7-14`),
- eine Kundenstimme (`orte.ts:10,76`),
- fünf Nachbarorte.

**Für alle Orte gleich:** Einleitung „Was wir tun“ (`page.tsx:38-39`), Ablauf (`orte.ts:66-71`), weitere Stimmen (`page.tsx:34`), Qualitätsversprechen (`orte.ts:80`).

Das einzige individuell geschriebene Feld `description` (`cities.ts:7`) erscheint nicht auf der Ortsseite. Es steht nur auf `/standorte` (`standorte/page.tsx:159`) und auf `/leistungen/*/<ort>` (`leistungen/[id]/[stadt]/page.tsx:307`).

**Messung an zwei Orten** (`ortsInhalt` für Wetzlar und Gießen, nachgerechnet mit dem Projekt-Resolver):
- Beide Seiten haben je 48 Textfelder.
- Ersetzt man den Ortsnamen durch einen Platzhalter, unterscheiden sich nur Ortssatz („direkt neben {ORT}“ gegen „etwa 25 km bis {ORT}“), Landkreissatz, Fotos und Stimme.
- Fließtext rund 193 Wörter, davon 2 Sätze mit echtem Ortsbezug.
- Aßlar zeigt dieselben drei Fotos in derselben Reihenfolge wie Wetzlar (Index 12 und 0).

**`/leistungen/<g>/<ort>`:** vier Textschablonen mit eingesetztem Ortsnamen (`[stadt]/page.tsx:49-95`) plus `city.description` (`:307`). Dazu nicht belegte Zusagen wie „Festpreisgarantie“ (`:59`); `_werkstatt/ENTSCHEIDUNGEN.md:183,423` merkt diese Texte schon zur Überarbeitung vor.

**Einschätzung:** Risiko dünner Seiten oder Doorway-Seiten ist hoch bei den 52 Leistung-Ort-Seiten und mittel bis hoch bei den 13 Ortsseiten (Formular und Anfahrt sind nützlich, eigener Inhalt fehlt fast ganz).

## 3 · Startseite

`src/app/(bestand)/page.tsx:16-27` setzt `ErzaehlSeite` mit dem Inhalt `START`; die Abschnittsfolge steht in `src/components/vorlagen/folge.ts:37`.

- **H1:** „Perfektion auf jedem Quadratmeter.“ (`start.ts:21-22`, `EinstiegMitte.tsx:220`). Kein Ort, kein „Fliesenleger“.
- **Unter der H1:** Ortszeile „Fliesenverlegung und Badsanierung aus Aßlar“ (`start.ts:31`, `EinstiegMitte.tsx:264-265`) und Sprunglink „Alle Orte, in denen wir arbeiten“ zu `#einsatzgebiet` (`:271-274`). Der Vorspann wird in diesem Einstieg nicht ausgegeben (`ErzaehlSeite.tsx:96,146-161`).
- **H2 in dieser Reihenfolge:**
  - „Was möchten Sie ändern?“ (`start.ts:38`)
  - „Wir kümmern uns um alles, was mit Fliesen zu tun hat.“ (`:54`)
  - „So kommen Sie zu Ihrem neuen Boden.“ (`:68`)
  - „So sieht unsere Arbeit aus.“ (`:88`)
  - „Das sagen unsere Kunden.“ (`Beleg.tsx:31`)
  - „Hier sind wir für Sie unterwegs.“ (`start.ts:111`)
  - „Termin vor Ort anfragen“ (`:116`)
- **Ortsnennungen im Fließtext:** Aßlar 2× (`start.ts:31,112`), Wetzlar 1× (`:112`, neben Gießen und Herborn). Dazu alle 13 Orte als Linkliste und drei H3 „… ab Aßlar“ (`Einsatzorte.tsx:19,86-103`).
- **Meta:** Titel und Beschreibung nennen Aßlar und Wetzlar (`start.ts:14-15`).
- **Auf allen Seiten:** Kopf „Fachbetrieb Aßlar · Wetzlar“ (`Header.jsx:40`); Fuß „Vor Ort in Aßlar, Wetzlar und Umgebung“ (`Footer.jsx:42`) und „Fachbetrieb Aßlar / Wetzlar“ (`:137`).
- **Links auf Ortsseiten:** nur die Ortsliste mit dem Ortsnamen als Ankertext (`Einsatzorte.tsx:94-96`), „Alle Orte ansehen“ zu `/standorte` (`:106-109`) und der Fuß. Es gibt keinen Link im Fließtext: `Textmarken` kennt nur Glossarmarken, keine Links (`src/lib/textmarken.ts:1-9`).
- `src/lib/start/daten.ts` wird in `src` nirgends importiert (tote Datei). `Startbild.tsx:20-21` hat keinen Ortsbezug.

## 4 · Interne Verlinkung

- **Kopf und Mobilmenü:** nur `/standorte` („Wo wir arbeiten“, `src/config/navigation.js:56`; ausgegeben in `Header.jsx:134-203` und `MobileMenu.jsx:142-194`).
- **Fuß:** Ortsregister mit `/standorte`, allen 13 Orten und beiden Ausstellungsseiten (`navigation.js:171-177`, `Footer.jsx:248-251`).
- **Brotkrumen:**
  - Ortsseite: „Start › Wo wir arbeiten › Ort“ (`orte.ts:43`).
  - Leistung-Ort-Seite: „Home / Leistungen / Gewerk / Ort“, ohne Link zur Ortsseite (`[stadt]/page.tsx:176-181`).
- **Ortsseite verlinkt:**
  - die vier Leistung-Ort-Seiten mit allgemeinen Ankern ohne Ortsnamen (`orte.ts:28-33`),
  - Fotos auf Fachseiten (`page.tsx:24-31`),
  - das Einzugsband mit allen 13 Orten (`:129`),
  - die Nachbarorte (`:115`, `Schritt.tsx:45-61`).
- **Leistungsübersicht `/leistungen/<g>`:** verlinkt die 13 Leistung-Ort-Seiten (`Fachdetails.tsx:157-175`), aber keine Ortsseite. `/bad*`, `/fliesen*` und `/balkon-terrasse*` verlinken im Inhalt ebenfalls keine Ortsseite.
- **Fehler bei den Nachbarorten:** `getNearbyCities` sortiert nach der Differenz der km-Werte ab Wetzlar (`standorte/[stadt]/page.tsx:77-90`), nicht nach Lage. Nachgerechnet:
  - Gießen zeigt Dillenburg, Herborn, Haiger, Limburg, Butzbach; Wetzlar fehlt.
  - Marburg zeigt Bad Nauheim, Limburg, Butzbach, Friedberg, Haiger; Gießen fehlt.
  - Die Koordinaten für eine richtige Sortierung liegen vor (`getMapEmbedUrl.ts:38-52`).

**Links auf `/standorte/wetzlar`:**

| Quelle | Ankertext |
|---|---|
| Fuß, alle Seiten (`navigation.js:174`) | „Wetzlar“ |
| Startseite (`Einsatzorte.tsx:94-96`) | „Wetzlar“ |
| `/standorte`, Ortsfeld (`standorte/page.tsx:150-164`) | ganzes Feld, darin „Fliesenleger in Wetzlar“ |
| `/standorte` und alle Ortsseiten, Einzugsband (`Einzugsband.tsx:83-89`) | „Wetzlar ca. 5 km“ |
| Nachbarorte auf Aßlar, Solms, Braunfels | „Wetzlar“ |
| 4 × `/leistungen/*/wetzlar` (`[stadt]/page.tsx:392-397`) | „Standort Wetzlar“ |
| `/ausstellung/wetzlar` (`page.jsx:254-258`) | „Fliesenverlegung in Wetzlar“ |
| `/ueber-uns`, Einsatzkarte (`Einsatzkarte.tsx:158-166`) | „Wetzlar“ |

`/kontakt` zeigt die Karte ohne Ortsliste und damit ohne Links (`kontakt/page.jsx:50`). `LocalDominanceMap.tsx` und `ContactPremiumMap.tsx` werden nirgends importiert.

## 5 · Kannibalisierung (Ort in Titel oder H1)

| Suche | Konkurrierende Seiten |
|---|---|
| Fliesenleger Wetzlar | `/` (`start.ts:14`), `/standorte/wetzlar` (`orte.ts:39,44`), `/leistungen` (`inhalte/leistungen.ts:13`, doppelt in `leistungen/layout.tsx:4`), `/termin` (`termin/layout.tsx:7`), `/fliesen/kueche` (`page.jsx:32`) |
| Fliesenleger Aßlar | `/` (`start.ts:14,31`), `/standorte/asslar` (`orte.ts:39,44`) |
| Fliesenverlegung Wetzlar | `/standorte/wetzlar` (`orte.ts:46`), `/leistungen/wohnen/wetzlar` (`[stadt]/page.tsx:130-139,267-271`), `/leistungen/wohnen` (`[id]/layout.jsx:12`, `[id]/page.jsx:63`) |
| Badsanierung Wetzlar | `/leistungen/bad/wetzlar`, `/leistungen/bad` (`layout.jsx:11`, `page.jsx:62`, `inhalte/meta/leistungen.ts:4`), `/bad/badsanierung` (`inhalte/bad-badsanierung.ts:16`), `/bad` (`inhalte/bad.ts:13`), `/bad/bad-aus-einer-hand` (`page.jsx:28`), `/bad/musterbaeder` (`page.jsx:22`), `/bad/badanfrage` (`page.jsx:18`) |
| Fliesenberatung Wetzlar | `/ausstellung/wetzlar` (`page.jsx:26`), `/beratung` (`beratung/layout.tsx:6`) |

Zwei Regeln, die jede neue Metaangabe beachten muss:
- Titel bleiben nur dann wörtlich, wenn sie 45 bis 58 Zeichen lang sind und „Tezgel“ enthalten; sonst schreibt `sanitizeTitle` sie um (`src/lib/metadata.ts:20-23,43-97`).
- Bei der Beschreibung gewinnt ein Eintrag in `src/inhalte/meta/*` vor dem Text der Seite, und das Ergebnis wird auf 120 bis 155 Zeichen gebracht (`src/lib/beschreibung.ts:8-44`).

## 6 · /ausstellung/wetzlar und /ausstellung/giessen

Die beiden Dateien sind fast gleich; sie unterscheiden sich in Titel, Slug, Vorspann und einem Satz.

**Behauptet wird:**
- „Nach Terminvereinbarung“ (`wetzlar/page.jsx:84`) und H1 „Fliesenberatung & Materialauswahl in Wetzlar“ (`:87`).
- „Für die Fliesenausstellung in Wetzlar vergeben wir Termine…“ (`:140`).
- Gießen: „Ihren gemeinsamen Besuch der Badausstellung in Gießen stimmen wir … ab“ (`giessen/page.jsx:141`).
- `/naturstein` verlinkt die Seite als „Ausstellung Wetzlar“ (`naturstein/page.jsx:153`).

**Belegt ist:**
- Die einzige Adresse auf der Seite ist der Firmensitz in Aßlar (`wetzlar/page.jsx:165-169`).
- Das Faktenblatt kennt nur „Fliesenberatung … nach Terminvereinbarung (ohne Adresse)“ (`_werkstatt/KERN.md:362`).
- Die Frage M-22 (Ausstellung oder Beratung?) ist offen (`_werkstatt/MENSCHEN.md:30`).

**Einschätzung:** Hohes Wahrheitsrisiko, weil eine Ausstellung behauptet wird, für die es keinen belegten Ort gibt. Zusätzlich konkurriert die Seite mit `/beratung` und `/standorte/wetzlar`.

## 7 · Werkstatt-Branch

Stand per `gh api`: 40 Commits vor main, 0 dahinter; letzter Commit am 01.11.2026 um 14:07 UTC.

**`OrtsSeite.tsx`:**
- Die Eigenschaft `karte` heißt jetzt `band`.
- Der Einstieg zeigt ein Foto (`worum.bild`) und bekommt `schnur`, `bewertung` und `zeilenmaske`.
- Das Einzugsband wandert als `zusatz` in den Abschnitt „Lage“.
- `Versprechen` bekommt `offen`.

**`standorte/[stadt]/page.tsx`:**
- Neue `FOTOS`-Tabelle.
- Einzugsband mit Aufklapper „Weitere Orte bis 50 km“.
- Unverändert: `generateMetadata`, `getNearbyCities`, `inhaltFuer`, Formular.

**`orte.ts`:**
- Ein gemeinsames Aufmacherfoto für alle 13 Orte (`start-galerie-1`), Fotos nach Helligkeit sortiert.
- `vignette` statt `motiv`, neu `versprechen.offen`.
- Meta, H1 und Texte unverändert.

**Weitere Änderungen:**
- `galerie.ts`: sechs neue Fotos.
- `test/orte.test.mjs`: neuer Test „Orte 7“, direkt nach Zeile 69 angehängt.
- `start.ts`: nur `lotAnDerSatzkante` entfernt.
- Stark umgebaut: `Einzugsband.tsx`, `Lage.tsx`, `Schritt.tsx`, `Beleg.tsx`, `Einstieg*.tsx`, `ErzaehlSeite.tsx`, `Einsatzkarte.tsx`.

**Unberührt:** `cities.ts`, `einzugszonen.ts`, `navigation.js`, Kopf, Fuß und Menü, `standorte/page.tsx`, `Einsatzorte.tsx`, `leistungen/[id]/*`, `ausstellung/*`, `sitemap.ts`, `metadata.ts`, `inhalte/meta/*`, `next.config.ts`, `schemaPyramid.ts`.

**Folgerung:**
- Auf main zuerst die unberührten Dateien ändern.
- In Dateien, die der Branch ändert, nur abgegrenzte Zeilen anfassen, zum Beispiel `orte.ts:39-40` oder `standorte/[stadt]/page.tsx:60-90`.
- Neue Abschnitte in `OrtsSeite.tsx` und geänderte Links in `orte.ts:28-33` erst nach dem Merge.


## 8 · Umbauvorschlag (Empfehlung)

**A · Startseite = Marke plus Aßlar**
- Wetzlar aus Titel und Beschreibung nehmen (`start.ts:14-15`). Beispiel: „Fliesenverlegung Tezgel · Fliesenleger in Aßlar“ (47 Zeichen).
- Ortszeile stärken (`start.ts:31`). Die H1 ändern wir nur nach Freigabe, sie ist Wortlaut des Auftraggebers (`start.ts:19`).
- Einen sichtbaren Satzlink „Fliesenleger in Wetzlar“ auf `/standorte/wetzlar` einbauen. Weil Textmarken keine Links kennen, braucht `Einsatzorte.tsx` dafür eine neue Eigenschaft; die Datei ist vom Branch unberührt.
- Den Ersatztitel in `_dokument.tsx:39-42` angleichen.

**B · Wetzlar = `/standorte/wetzlar` behalten**
- Begründung: Die Adresse besteht, ist verlinkt und steht in der Sitemap. Eine neue Adresse brächte nur eine Weiterleitung und Testanpassungen (`navigation.js:75-77`, `test/navigation.test.mjs:12-13`).
- Eigenen Inhalt in eine neue Datei legen (Vorschlag: `src/inhalte/orte-eigen.ts`) und in `inhaltFuer()` einmischen (`page.tsx:42-54`). Inhalt: eigene Beschreibung, eigener Vorspann, Anfahrt ab Aßlar, bestätigte Stadtteile, echte Wetzlar-Projekte und Stimmen, Fragen und Antworten.
- Der Titel kann bleiben (49 Zeichen).
- Zusätzliche Abschnitte brauchen neue Plätze in `OrtsSeite.tsx`, also erst nach dem Merge.
- Interne Links stärken:
  - Unterpunkt „Fliesenleger in Wetzlar“ im Menü (`navigation.js:50-62`).
  - Ortsliste der Leistungsübersichten auf Ortsseiten umstellen (`Fachdetails.tsx:157-175`).
- Wetzlar aus Titel, H1 und Meta der Leistungsübersichten nehmen (`leistungen/[id]/layout.jsx:10-16`, `[id]/page.jsx:61-72`, `meta/leistungen.ts:4-7`, `inhalte/leistungen.ts:13`, `leistungen/layout.tsx:3-7`), ebenso aus den `/bad*`-Titeln in Abschnitt 5.

**C · Aßlar: keine eigene indexierte Seite**
- 308-Weiterleitung `/standorte/asslar` auf `/` (`next.config.ts:15-22`).
- Das Linkziel für Aßlar zentral über einen Helfer in `cities.ts` setzen. Betroffen: `Einsatzorte.tsx:94`, `standorte/page.tsx:150`, `navigation.js:174`, `sitemap.ts:79`, `indexnow.ts:60`; nach dem Merge zusätzlich `Einzugsband.tsx:84`, `Einsatzkarte.tsx:159`, `page.tsx:115`.
- Test `orte.test.mjs:25-28` (prüft 13 Seiten) anpassen.

**D · `/leistungen/<g>/<ort>` zusammenlegen**
- 308-Weiterleitung `/leistungen/:id/:stadt` auf `/standorte/:stadt` (Aßlar auf `/`), die Route entfernen.
- Links umstellen: `orte.ts:28-33` (nach dem Merge), `Fachdetails.tsx:157-175`, `ausstellung/wetzlar/page.jsx:229-252` (Gießen entsprechend).
- `sitemap.ts:76-78`, `indexnow.ts:57-59` und Test `orte.test.mjs:64-69` anpassen.
- Vorsichtigere erste Stufe: `robots: { index: false, follow: true }` über `createMetadata` (`metadata.ts:117-130`) in `[stadt]/page.tsx:143-147` und die Seiten aus der Sitemap nehmen.
- Kein `canonical` auf eine andere Seite. Vermutung: Google ignoriert den Hinweis, weil der Inhalt nicht gleich ist.
- Eine eigene Seite „Badsanierung Wetzlar“ erst, wenn echte Wetzlar-Bäder vorliegen.

**E · Übrige Ortsseiten**
- Nachbarorte nach Koordinaten sortieren: als reine Funktion in `einzugszonen.ts` (vom Branch unberührt), Test in `test/einzugszonen.test.mjs`.
- Entfernungen einheitlich „ab Aßlar“ angeben (`standorte/page.tsx:73-77,139-141`, `cities.ts:4`).
- Für Orte ab 35 km ohne eigenen Inhalt `noindex` erwägen.

**F · Ausstellungsseiten**
- Je nach Antwort auf M-22: Wortlaut auf „Fliesenberatung“ ohne Ausstellungsbehauptung ändern, oder 308-Weiterleitungen auf `/standorte/wetzlar` und `/standorte/giessen`.
- Links anpassen: `navigation.js:175-176`, `inhalte/ueber-uns.ts:100-101`, `naturstein/page.jsx:153`, `fliesen/fliesenarten/page.jsx:229`, `sitemap.ts:38-39`, `meta/seiten.ts:10-11`.

## Risiken und Fehler

1. Die Startseite zielt mit Titel und Beschreibung auf Wetzlar (`start.ts:14-15`) und konkurriert so mit `/standorte/wetzlar`.
2. `/standorte/asslar` konkurriert mit der Startseite um „Fliesenleger Aßlar“.
3. 52 Schablonenseiten und 13 Ortsseiten mit je etwa zwei eigenen Sätzen: Risiko von Doorway- oder dünnen Seiten.
4. „Fliesenausstellung“ und „Badausstellung“ werden ohne belegten Ort behauptet (Abschnitt 6).
5. Die Nachbarorte sind geografisch falsch (`standorte/[stadt]/page.tsx:77-90`).
6. Widersprüchlicher Entfernungsbezug: „ab Wetzlar“ (`standorte/page.tsx:76,140`; `[stadt]/page.tsx:39,46,209`) gegen „ab Aßlar“ auf den Ortsseiten.
7. 13 LocalBusiness-Knoten „Fliesenverlegung Tezgel – {Ort}“ mit derselben Aßlarer Anschrift (`schemaPyramid.ts:318-345`). Vermutung: Das verwässert die Firma als Entität.
8. Die Metadaten für `/leistungen` stehen doppelt (`leistungen/layout.tsx:3-7`, `leistungen/page.jsx:21-25`).
9. Tote Dateien: `src/lib/start/daten.ts`, `LocalDominanceMap.tsx`, `ContactPremiumMap.tsx`.
10. Merge-Konflikte mit dem Branch in `OrtsSeite.tsx`, `orte.ts`, `Einzugsband.tsx`, `standorte/[stadt]/page.tsx` und `test/orte.test.mjs`.
11. Für die neuen Fotos ist kein Baustellenort bekannt. Laut `_werkstatt/bilder/neue-bilder-2026-10-31/README.md:34` (noch nicht eingecheckt) darf ohne Bestätigung keines als Ortsbeleg dienen.

## Offene Fragen an den Auftraggeber

1. Gibt es in Wetzlar oder Gießen einen festen Ausstellungsort mit Adresse, oder ist es eine Beratung beim Kunden oder in Aßlar (M-22)?
2. Welche Projekte lagen in Wetzlar (Stadtteil, Gewerk, welche der neuen Fotos), und dürfen sie mit Ort gezeigt werden?
3. Gibt es Google-Bewertungen aus Wetzlar, die den Ort nennen dürfen?
4. Darf `/standorte/asslar` auf die Startseite weitergeleitet werden?
5. Darf die H1 der Startseite (der Slogan) einen Ortsbezug bekommen?
6. Sollen die 52 Leistung-Ort-Seiten per 308 weg oder zuerst `noindex` bekommen? Gibt es Zugriff auf die Search Console, um ihre Klicks zu prüfen?
7. Welche Orte sind wirklich gewollt, zum Beispiel Solms, Braunfels, Lahnau, Hüttenberg, Ehringshausen (`company.js:79-93`)? Welche fernen Orte nicht?
8. Soll „Badsanierung Wetzlar“ eine eigene Seite werden oder ein Abschnitt der Wetzlar-Seite?
9. Wird der Werkstatt-Branch vor der SEO-Runde nach main gemergt?
