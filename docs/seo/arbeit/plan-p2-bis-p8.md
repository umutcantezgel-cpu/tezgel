# Plan der SEO-Runde: Pakete P2 bis P8

Stand 01.11.2026, Entwurf zur Freigabe durch Umut. Grundlage: `docs/seo/KONTEXT.md` (Abschnitte 5, 6, 9 bis 12) und der Produktionsbau von `seo/lokal` 7d84de41 (Paket P1 eingebaut, Texte gleich `main`). Alle Zahlen in Abschnitt 1 sind aus diesem Bau gezählt. Suchvolumen nenne ich keine: Es gibt dafür bisher keine Quelle (kein Zugang zur Search Console, keine kostenpflichtigen Werkzeuge). Positionen nur aus KONTEXT.md Abschnitt 7 (Analyse 06, 01.11.2026, eigener Index eines Suchwerkzeugs, nicht Google).

**Was Umut entscheiden soll**, kurz:
1. Den Plan insgesamt (Freigabe für P2 bis P8 in der Reihenfolge von Abschnitt 6).
2. **Markenzusatz** (Abschnitt 3): überall „| Fliesenverlegung Tezgel“, bei Platzmangel „· Tezgel“.
3. **Titel und Descriptions** wie in Abschnitt 4, einzeln änderbar.
4. **H1** (Abschnitt 5): die Regelverstöße sofort mit P2, Wetzlar raus mit P3. Die zwei geschützten H1 bleiben.
5. Die offenen Entscheidungen S2, S3, S4, S6 und S10 aus meiner ersten Nachricht. Davon hängen P3, P4 und P6 ab.

## 1. Ausgangslage (Fakten aus dem Bau)

- 170 Seiten, davon 164 indexierbar (noindex: `/agb`, `/cookie-richtlinie`, `/datenschutz`, `/impressum`, `/login`, `/widerruf`). Jede indexierbare Seite hat genau eine H1, keine zwei Seiten haben denselben Titel oder dieselbe Description, alle Titel liegen zwischen 45 und 58 Zeichen.
- **Wetzlar** steht außerhalb der Wetzlar-Seiten in **19 Titeln** (`/`, `/leistungen`, `/leistungen/bad`, `/leistungen/wohnen`, `/leistungen/aussen`, `/bad`, `/bad/badsanierung`, `/bad/bad-aus-einer-hand`, `/bad/musterbaeder`, `/bad/badanfrage`, `/balkon-terrasse`, `/balkon-terrasse/balkonsanierung`, `/treppen`, `/naturstein`, `/fliesenreparatur`, `/fliesen/kueche`, `/beratung`, `/termin`, `/karriere`) und in **27 Descriptions**. Für „Wetzlar“ konkurrieren damit fast alle wichtigen Seiten mit `/standorte/wetzlar`.
- **Direkte Konkurrenz um denselben Begriff:**
  - Wetzlar: `/standorte/wetzlar`, `/ausstellung/wetzlar` („Fliesenberatung in Wetzlar“), vier Seiten `/leistungen/*/wetzlar`, `/beratung` (Wetzlar in Titel und H1) und die Startseite.
  - Aßlar: `/`, `/standorte/asslar`, vier Seiten `/leistungen/*/asslar`.
  - Badsanierung: `/bad`, `/bad/badsanierung`, `/leistungen/bad`, 13 Seiten `/leistungen/bad/<ort>`, `/bad/bad-aus-einer-hand`.
- **Ortsseiten:** Die 13 Seiten `/standorte/<ort>` entstehen aus einer Vorlage (`src/inhalte/orte.ts`). Sie unterscheiden sich nur durch Ortsname, Entfernung, Landkreis, die Reihenfolge der Fotos und eine Kundenstimme ohne Ortsbezug (KONTEXT.md A03: 89 bis 95 % gleich). Die 52 Seiten Leistung × Ort sind zu 96 % gleich (A04). Das widerspricht der Leitplanke „Ortsseiten unterscheiden sich nur durch echte Angaben“ und ist der Kern von P3 und P4.
- **Marke im Titel:** 17 verschiedene Zusätze, darunter „Fliesen Tezgel“ (42 Seiten), „Badsanierung Tezgel“ (13), „Fachbetrieb Tezgel“ (6), „Fliesenleger Tezgel“ (4). 12 Titel ohne Marke: `/preise`, `/blog/barrierefreier-balkonaustritt`, `/referenzen/balkon-stelzlager`, `/referenzen/barrierefreies-duschbad` und acht Seiten `/leistungen/*/limburg` und `/leistungen/*/friedberg`.
- **Regelverstöße:** Die Description von `/preise` endet mit „...“ (abgeschnitten). Die H1 der 12 Musterbäder enthalten einen Gedankenstrich („Musterbad Basic-Bad 7,0 ㎡ – Komplettbad & Badsanierung“). Die H1 von `/bad/fliesen` beginnt mit der Floskel „Perfekte“. 33 H1 folgen dem Muster „Begriff: Erklärung“ (Floskelliste, Muster für Überschriften).
- **Alt-Texte im Bestand:** Die Website zeigt 46 verschiedene Bilddateien, alle mit Alt-Text, keiner über 125 Zeichen. Regelverstoß nur beim Logo in der Autorenkarte der Ratgeber (`src/components/blog/BlogAuthorCard.jsx:59`: „Fliesenverlegung Tezgel – Fachbetrieb Aßlar & Wetzlar“ mit Gedankenstrich, Orten und „&“; sonst heißt das Logo überall „Fliesenverlegung Tezgel“). Zwei Fotos tragen je zwei leicht verschiedene Alt-Texte (`balkon-anthrazit-fliesen-versetzt.jpg`, `balkon-dichtband-von-hinten.jpg`). Vorschlag: mit P2 vereinheitlichen. Das Ziel „gute Alt-Texte für alle Bilder“ betrifft damit vor allem die neuen Fotos (P5).
- **Strukturdaten** nach P1: genau ein LocalBusiness auf allen Seiten, kein Product, keine Rezension, alle Verweise mit Ziel. `priceValidUntil` steht noch auf `/leistungen` (Rest von T09, Ablauf 31.12.2026).

## 2. Suchbegriff-Cluster je Zielseite

Grundsatz aus KONTEXT.md Abschnitt 6: ein Suchbegriff, eine Zielseite. Andere Seiten verlinken die Zielseite, statt um denselben Begriff zu konkurrieren. Die Beispiele für ähnliche Suchen sind Formulierungen, keine gemessenen Suchanfragen; welche davon wirklich gesucht werden, zeigt erst die Search Console (P8).

| Cluster | Begriffe (Beispiele) | Zielseite | Gestützt durch | Hört auf zu konkurrieren |
|---|---|---|---|---|
| Marke | Fliesenverlegung Tezgel, Tezgel Fliesen, Fliesenleger Tezgel | `/` | ein Markenzusatz in allen Titeln (Abschnitt 3), gleicher Name in Schema, Profil und Verzeichnissen (P7) | alle Varianten wie „Fliesen Tezgel“ oder „Fachbetrieb Tezgel“ |
| Aßlar (S2 Variante 1) | Fliesenleger Aßlar, Fliesenverlegung Aßlar, Fliesen Aßlar | `/` | Titel und Ortszeile der Startseite; Link „Fliesenverlegung Tezgel in Aßlar“ von der Wetzlar-Seite | `/standorte/asslar` (308 auf `/`, S2), `/leistungen/*/asslar` (S3) |
| Wetzlar | Fliesenleger Wetzlar, Fliesenverlegung Wetzlar, Fliesen verlegen Wetzlar | `/standorte/wetzlar` | Links mit dem Ankertext „Fliesenleger in Wetzlar“ aus dem Einsatzgebiet der Startseite, aus dem Fuß, den Fachseiten und `/referenzen` | `/ausstellung/wetzlar` (S4: als Abschnitt in die Wetzlar-Seite, dann 308), `/leistungen/*/wetzlar` (S3), Wetzlar in Titeln und Descriptions der Übersichten (P3) |
| Leistung in Wetzlar | Badsanierung Wetzlar, bodengleiche Dusche Wetzlar, Balkon sanieren Wetzlar | zuerst Abschnitte auf `/standorte/wetzlar` | je Leistung ein Abschnitt mit Link zur Fachseite | eigene Seite erst mit echten Wetzlar-Projekten |
| Bad allgemein | neues Bad, Bad erneuern, Dusche statt Wanne | `/bad` | Navigation | |
| Badsanierung | Badsanierung, Bad sanieren, Komplettbad | `/bad/badsanierung` | Links „Badsanierung“ aus `/bad` und `/leistungen/bad` | `/bad` (neu „Bad und Dusche erneuern“), `/leistungen/bad` (neu „Leistungen rund ums Bad“), `/leistungen/bad/<ort>` (S3) |
| Barrierefreies Bad | barrierefreies Bad, Dusche ohne Stufe, bodengleiche Dusche, Zuschuss Pflegekasse | `/bad/barrierefreies-bad` | `/foerderung` verlinkt dorthin | `/referenzen/barrierefreies-duschbad` (Platzhalter, T11) |
| Balkon und Terrasse | Balkon fliesen, Terrasse fliesen, Terrassenplatten verlegen | `/balkon-terrasse` | | |
| Balkonsanierung | Balkonsanierung, Balkon abdichten | `/balkon-terrasse/balkonsanierung` | | `/leistungen/aussen` (neu „Leistungen für draußen“) |
| Großformat | Großformatfliesen verlegen, große Fliesen | `/fliesen/grossformat` | | |
| Treppe | Treppe fliesen, Außentreppe sanieren, Treppenhaus | `/treppen` mit Unterseiten | | |
| Naturstein | Naturstein verlegen, Granit verlegen, Marmor verlegen | `/naturstein` mit Unterseiten | | |
| Abdichtung | Abdichtung DIN 18534, Verbundabdichtung | `/untergrund-abdichtung/din-18534` | | `/leistungen/untergrund` (neu „Leistungen für den Untergrund“) |
| Reparatur | Fliesen reparieren, einzelne Fliese austauschen | `/fliesenreparatur` | | |
| Fugen | Fugensanierung, Silikonfugen erneuern | `/fliesen/fugensanierung` | | |
| Küche | Küchenfliesen, Fliesenspiegel | `/fliesen/kueche` | | |
| Kontakt | Fliesenleger Termin, Fliesenleger anfragen | `/kontakt` | eine Kurzanfrage überall (P6) | `/termin`, `/beratung` (S6: 308 auf `/kontakt`) |
| Jobs | Fliesenleger Job Wetzlar, Ausbildung Fliesenleger | `/karriere`, `/karriere/ausbildung` | Wetzlar darf hier bleiben: Stellenangebot in Aßlar bei Wetzlar | |
| Ratgeber | Fragen wie „Fliesen auf Fußbodenheizung“, „Schimmel in Fugen“ | `/fliesen/*`, `/blog/*` | ortsneutral, Links zur passenden Leistung | |

## 3. Markenzusatz im Titel (Entscheidung)

**Empfehlung:** Ein Name, „Fliesenverlegung Tezgel“, als Zusatz „| Fliesenverlegung Tezgel“. Wo der Platz nicht reicht (lange Fragen im Ratgeber), die Kurzform „· Tezgel“. Die Startseite stellt die Marke nach vorn („Fliesenverlegung Tezgel · Fliesenleger in Aßlar“). Varianten wie „Fliesen Tezgel“, „Fliesenleger Tezgel“, „Fachbetrieb Tezgel“ oder „Badsanierung Tezgel“ entfallen, weil sie wie andere Firmennamen aussehen.

Dazu in `src/lib/metadata.ts` (T10): Die automatische Auffüllung auf 45 Zeichen hängt heute „· Fachbetrieb Tezgel“, „· Fliesen Tezgel“ oder „– Tezgel Hessen“ (mit Gedankenstrich) an. Sie soll nur noch die zwei Formen oben verwenden; Titel werden bewusst gesetzt. Die Tests `test/titleLength` und `test/meta` bleiben streng.

## 4. Titel und Descriptions, alt und neu

Spalte „Paket“: **P2** = mit der Freigabe dieses Plans. **P3** = im selben Push wie die neue Wetzlar-Seite (Leitplanke: Wetzlar verlässt Startseite und Übersichten erst dann). **(S4)**, **(S6)** = entfällt, wenn die Adresse nach dieser Entscheidung per 308 umzieht. **P4 (S3)** = hängt an der Entscheidung zu den Ortsseiten.

Alle Vorschläge sind maschinell geprüft (`docs/seo/arbeit/pruefe-meta.mjs` mit der Titel-Bereinigung der Website, Daten in `meta-vorschlaege.json`): Titel 45 bis 58 Zeichen mit „Tezgel“, die Website schreibt sie nicht um; Descriptions 120 bis 155 Zeichen ohne „&“, „!“, „…“ und Strich; keine Floskel; Wetzlar nur auf der Wetzlar-Seite und bei `/karriere`; keine zwei gleichen Titel. Aussagen nur aus dem Faktenblatt (F-06 Gründung 2008, F-05 Handwerkskammer, F-08 Leistungen, F-12 Termin kostenfrei, F-13 ein Ansprechpartner, F-21 Gefälle, F-25 Pflegekasse) und den Versprechen sinngleich (Festpreisangebot, kostenfreier Termin). Die Description der Wetzlar-Seite ist vorläufig; mit bestätigten Wetzlar-Belegen von Deniz (Projekte, Stadtteile) wird sie konkreter.

### 4a. Titel

| Seite | Paket | Titel heute (Zeichen) | Titel neu (Zeichen) |
|---|---|---|---|
| `/` | P3 | Fliesenleger Aßlar und Wetzlar \| Fliesenverlegung Tezgel (56) | Fliesenverlegung Tezgel · Fliesenleger in Aßlar (47) |
| `/standorte/wetzlar` | P3 | Fliesenleger in Wetzlar \| Fliesenverlegung Tezgel (49) | bleibt |
| `/leistungen` | P3 | Fliesenleger Leistungen Wetzlar \| Fliesenverlegung Tezgel (57) | Leistungen vom Fliesenleger \| Fliesenverlegung Tezgel (53) |
| `/bad` | P3 | Ihr neues Bad in Aßlar & Wetzlar \| Fliesenverlegung Tezgel (58) | Bad und Dusche erneuern \| Fliesenverlegung Tezgel (49) |
| `/bad/badsanierung` | P3 | Badsanierung in Aßlar & Wetzlar \| Fliesenverlegung Tezgel (57) | Badsanierung zum Festpreis \| Fliesenverlegung Tezgel (52) |
| `/bad/barrierefreies-bad` | P3 | Barrierefreies Bad nach DIN 18040 \| Tezgel Aßlar (48) | Barrierefreies Bad umbauen \| Fliesenverlegung Tezgel (52) |
| `/bad/fliesen` | P3 | Badfliesen & große Fliesen \| Fliesenverlegung Tezgel (52) | bleibt |
| `/bad/bad-aus-einer-hand` | P3 | Bad aus einer Hand Wetzlar & Aßlar \| Tezgel Badsanierung (56) | Ihr Bad aus einer Hand \| Fliesenverlegung Tezgel (48) |
| `/balkon-terrasse` | P3 | Balkon und Terrasse fliesen in Wetzlar und Aßlar \| Tezgel (57) | Balkon und Terrasse fliesen \| Fliesenverlegung Tezgel (53) |
| `/balkon-terrasse/balkonsanierung` | P3 | Balkonsanierung Wetzlar & Aßlar \| Abdichtung · Tezgel (53) | Balkonsanierung mit Abdichtung \| Fliesenverlegung Tezgel (56) |
| `/treppen` | P3 | Treppe fliesen & sanieren Wetzlar \| Fachbetrieb Tezgel (54) | Treppe fliesen und sanieren \| Fliesenverlegung Tezgel (53) |
| `/naturstein` | P3 | Naturstein verlegen Wetzlar & Aßlar \| Granit · Tezgel (53) | Naturstein verlegen lassen \| Fliesenverlegung Tezgel (52) |
| `/fliesenreparatur` | P3 | Fliesenreparatur Wetzlar & Aßlar \| Fliesen Tezgel (49) | Fliesenreparatur und Fugen \| Fliesenverlegung Tezgel (52) |
| `/fliesen/kueche` | P3 | Küchenfliesen verlegen Wetzlar \| Fliesenleger Tezgel (52) | Küchenfliesen verlegen lassen \| Fliesenverlegung Tezgel (55) |
| `/fliesen/fugensanierung` | P3 | Fugensanierung & Silikonfugen erneuern \| Tezgel (47) | bleibt |
| `/fliesen/neubau` | P3 | Fliesen im Neubau verlegen lassen \| Fliesen Tezgel (50) | Fliesen im Neubau verlegen \| Fliesenverlegung Tezgel (52) |
| `/kontakt` | P3 | Kontakt und Termin vor Ort \| Fliesenleger Tezgel Aßlar (54) | Kontakt und Termin vor Ort \| Fliesenverlegung Tezgel (52) |
| `/ueber-uns` | P3 | Über uns \| Fliesenlegerbetrieb Tezgel in Aßlar (46) | Über uns, seit 2008 in Aßlar \| Fliesenverlegung Tezgel (54) |
| `/team` | P3 | Unser Team \| Fachbetrieb für Fliesen Tezgel Aßlar (49) | Unser Team \| Fliesenverlegung Tezgel aus Aßlar (46) |
| `/leistungen/bad` | P3 | Badsanierung & Komplettbäder Wetzlar \| Tezgel (45) | Leistungen rund ums Bad \| Fliesenverlegung Tezgel (49) |
| `/leistungen/wohnen` | P3 | Fliesenverlegung Wohnbereich Wetzlar \| Tezgel (45) | Böden und Wände im Überblick \| Fliesenverlegung Tezgel (54) |
| `/leistungen/aussen` | P3 | Balkon- & Terrassensanierung Wetzlar \| Tezgel (45) | Leistungen für draußen \| Fliesenverlegung Tezgel (48) |
| `/leistungen/untergrund` | P3 | DIN 18534 Abdichtung & Untergrund \| Fliesen Tezgel (50) | Leistungen für den Untergrund \| Fliesenverlegung Tezgel (55) |
| `/beratung` | P3 (S4, S6) | Kostenlose Fliesenberatung Wetzlar \| Fachbetrieb Tezgel (55) | Kostenlose Fliesenberatung \| Fliesenverlegung Tezgel (52) |
| `/termin` | P3 (S6) | Termin vereinbaren \| Fliesenleger Tezgel Wetzlar (48) | Termin vor Ort vereinbaren \| Fliesenverlegung Tezgel (52) |
| `/karriere` | P3 | Fliesenleger Jobs Wetzlar & Aßlar \| Karriere Tezgel (51) | Fliesenleger Jobs bei Wetzlar \| Fliesenverlegung Tezgel (55) |
| `/bad/musterbaeder` | P3 | Musterbäder & Badideen Wetzlar \| Badsanierung Tezgel (52) | Musterbäder und Badideen \| Fliesenverlegung Tezgel (50) |
| `/bad/badanfrage` | P3 (S6) | Badsanierung Angebot anfordern \| Tezgel Wetzlar (47) | Angebot für Ihre Badsanierung \| Fliesenverlegung Tezgel (55) |
| `/standorte` | P4 (S3) | Fliesenleger Standorte & Einsatzgebiete \| Tezgel (48) | Einsatzgebiet in Mittelhessen \| Fliesenverlegung Tezgel (55) |
| `/preise` | P2 | Fliesenleger Preise auf Anfrage \| Festpreisangebote (51) | Preise und Festpreisangebot \| Fliesenverlegung Tezgel (53) |
| `/faq` | P2 | Häufige Fragen zu Fliesen, Bad & Kosten \| Tezgel (48) | Häufige Fragen und Antworten \| Fliesenverlegung Tezgel (54) |
| `/referenzen` | P2 | Referenzen und Bewertungen \| Fliesenleger Tezgel Aßlar (54) | Referenzen und Bewertungen \| Fliesenverlegung Tezgel (52) |
| `/unternehmen` | P2 | Unternehmen & Qualitätsversprechen \| Tezgel Fachbetrieb (55) | Unternehmen und Geschichte \| Fliesenverlegung Tezgel (52) |
| `/blog/barrierefreier-balkonaustritt` | P2 | Wie niedrig ist ein barrierefreier Balkonaustritt? (50) | Wie niedrig ist ein barrierefreier Balkonaustritt · Tezgel (58) |
| `/bad/musterbaeder/basic-bad-7` | P2 (Muster für 12 Musterbäder) | Musterbad Basic mit 7,0 m² \| Badsanierung Tezgel (48) | Musterbad Basic mit 7,0 m² \| Fliesenverlegung Tezgel (52) |

Muster für alle 12 Musterbäder: „Musterbad <Linie> mit <Größe> m² | Fliesenverlegung Tezgel“. Die übrigen Seiten bekommen mit P2 nur den einheitlichen Markenzusatz (Abschnitt 3); die 52 Seiten Leistung × Ort und die fernen Ortsseiten folgen S3 (P4).

### 4b. Descriptions

| Seite | Description heute (Zeichen) | Description neu (Zeichen) |
|---|---|---|
| `/` | Fliesenverlegung Tezgel aus Aßlar: Badsanierung, Böden, Balkon und Terrasse für Wetzlar und Umgebung. Der Termin bei Ihnen vor Ort ist kostenfrei. (146) | Fliesenverlegung Tezgel aus Aßlar: Bäder, Duschen ohne Stufe, Böden, Balkone und Treppen. Der Termin bei Ihnen vor Ort ist kostenfrei. (134) |
| `/standorte/wetzlar` | Fliesenleger für Wetzlar: Wir erneuern Bäder, verlegen Böden und machen Balkone dicht. Der Termin bei Ihnen vor Ort ist kostenfrei. (131) | Ihr Fliesenleger für Wetzlar aus dem Nachbarort Aßlar: Bad und Dusche ohne Stufe, Böden, Balkon und Treppe. Der Termin bei Ihnen vor Ort ist kostenfrei. (152) |
| `/leistungen` | Fliesenleger Leistungen in Aßlar und Wetzlar: Badsanierung, Böden, Balkon, Terrasse, Naturstein und Abdichtung. Der Termin vor Ort ist kostenfrei. (146) | Alle Leistungen von Fliesenverlegung Tezgel aus Aßlar: Bad und Dusche, Böden und Wände, Balkon und Terrasse, Treppe, Naturstein und Abdichtung. (143) |
| `/bad` | Badsanierung in Aßlar und Wetzlar: altes Bad umbauen, große Fliesen verlegen, Abdichtung nach DIN 18534. Festpreisangebot, Termin vor Ort kostenfrei. (149) | Ein neues Bad vom Fliesenleger: Wanne raus, Dusche ohne Stufe rein, große Fliesen und Abdichtung nach DIN 18534. Der Termin vor Ort ist kostenfrei. (147) |
| `/bad/badsanierung` | Komplette Badsanierung in Aßlar und Wetzlar mit Walk-in-Dusche. Festpreisangebot von Fliesenverlegung Tezgel, Termin vor Ort kostenfrei. (136) | Komplette Badsanierung mit Dusche ohne Stufe und großen Fliesen. Sie bekommen ein Festpreisangebot, der Termin bei Ihnen vor Ort ist kostenfrei. (144) |
| `/bad/barrierefreies-bad` | Badewanne raus, Dusche ohne Stufe rein: Wir bauen Ihr Bad in Aßlar und Wetzlar barrierefrei um, mit rutschfesten Fliesen und Zuschuss der Pflegekasse. (150) | Badewanne raus, Dusche ohne Stufe rein: Wir bauen Ihr Bad barrierefrei um. Mit Pflegegrad zahlt die Pflegekasse bis zu 4.180 € je Person dazu. (142) |
| `/bad/fliesen` | Badfliesen in Aßlar und Wetzlar: große Fliesen, Feinsteinzeug, Naturstein und Mosaik, fachgerecht abgedichtet nach DIN 18534. Beratung auf Anfrage. (147) | Badfliesen vom Fachbetrieb: große Fliesen, Feinsteinzeug, Naturstein und Mosaik, abgedichtet nach DIN 18534. Wir beraten Sie beim Termin vor Ort. (145) |
| `/bad/bad-aus-einer-hand` | Bad aus einer Hand in Aßlar und Wetzlar: Wir koordinieren Sanitär, Fliesen, Elektrik und Trockenbau. Sie haben einen festen Ansprechpartner. (140) | Bad aus einer Hand: Wir koordinieren Sanitär, Fliesen, Elektrik und Trockenbau. Sie haben einen festen Ansprechpartner von der Planung bis zur Abnahme. (151) |
| `/balkon-terrasse` | Balkon und Terrasse fliesen lassen in Wetzlar und Aßlar: Wir verlegen Platten, auch auf Stelzlagern. Der Termin bei Ihnen vor Ort ist kostenfrei. (145) | Balkon und Terrasse fliesen lassen: Wir verlegen Platten, auch auf Stelzlagern, mit Gefälle vom Haus weg. Der Termin bei Ihnen vor Ort ist kostenfrei. (150) |
| `/balkon-terrasse/balkonsanierung` | Balkonsanierung in Wetzlar und Aßlar: Wir stellen ein Gefälle vom Gebäude weg her, dann folgen Abdichtung und neuer Belag. (122) | Balkonsanierung vom Fachbetrieb: Wir stellen ein Gefälle vom Gebäude weg her, dann folgen Abdichtung und neuer Belag. Der Termin vor Ort ist kostenfrei. (152) |
| `/treppen` | Treppe fliesen oder sanieren: Innentreppe, Treppenhaus oder Außentreppe mit Fliesen oder Naturstein neu belegen. Fachbetrieb Tezgel in Wetzlar und Aßlar. (153) | Treppe fliesen oder sanieren: Innentreppe, Treppenhaus oder Außentreppe mit Fliesen oder Naturstein neu belegen. Der Termin vor Ort ist kostenfrei. (147) |
| `/naturstein` | Naturstein verlegen in Wetzlar und Aßlar: Granit, Marmor, Kalkstein, Travertin und Schiefer. Der Termin bei Ihnen vor Ort ist kostenfrei. (137) | Naturstein verlegen lassen: Granit, Marmor, Kalkstein, Travertin und Schiefer, verlegt vom Fachbetrieb aus Aßlar. Der Termin vor Ort ist kostenfrei. (148) |
| `/fliesenreparatur` | Fliesenreparatur in Wetzlar und Aßlar: einzelne Fliesen austauschen, Sockelfliesen reparieren und Fugen erneuern. Wir stimmen den Termin mit Ihnen ab. (150) | Fliesenreparatur: einzelne Fliesen austauschen, Sockelfliesen reparieren und Fugen erneuern. Den Termin stimmen wir mit Ihnen ab, Fotos helfen vorab. (149) |
| `/fliesen/kueche` | Küchenfliesen und Fliesenspiegel verlegt Fachbetrieb Tezgel aus Aßlar in Wetzlar und Umgebung. Dichtes Feinsteinzeug nimmt Öl und Kaffee kaum auf. (146) | Küchenfliesen und Fliesenspiegel vom Fachbetrieb aus Aßlar. Dichtes Feinsteinzeug nimmt Öl und Kaffee kaum auf und lässt sich leicht sauber halten. (147) |
| `/fliesen/fugensanierung` | Fugensanierung in Wetzlar und Aßlar: Schimmelige Silikonfugen und bröselnde Zementfugen erneuern. Für eine erste Einschätzung helfen Fotos per WhatsApp. (152) | Fugensanierung: schimmelige Silikonfugen und bröselnde Zementfugen erneuern. Für eine erste Einschätzung helfen uns Fotos per WhatsApp. (135) |
| `/fliesen/neubau` | Fliesen im Neubau verlegen lassen: Belegreife prüfen, Material festlegen und Termine mit Bauleitung abstimmen. Fachbetrieb Tezgel in Wetzlar und Aßlar. (151) | Fliesen im Neubau verlegen lassen: Belegreife prüfen, Material festlegen und Termine mit der Bauleitung abstimmen. Fachbetrieb Tezgel aus Aßlar. (144) |
| `/kontakt` | Fliesenleger Tezgel in Aßlar: Anruf, WhatsApp oder Anfrage. Der Termin vor Ort ist kostenfrei. Persönliche Beratung und Festpreis für Wetzlar und Hessen. (153) | Fliesenverlegung Tezgel in Aßlar: Rufen Sie an, schreiben Sie per WhatsApp oder senden Sie eine Anfrage. Der Termin bei Ihnen vor Ort ist kostenfrei. (149) |
| `/ueber-uns` | Fliesenverlegung Tezgel in Aßlar seit 2008, eingetragen bei der Handwerkskammer Wiesbaden. Inhaber Deniz Tezgel kommt selbst zu Ihnen, auch nach Wetzlar. (153) | Fliesenverlegung Tezgel in Aßlar seit 2008, eingetragen bei der Handwerkskammer Wiesbaden. Inhaber Deniz Tezgel kommt selbst zu Ihnen und berät Sie. (148) |
| `/team` | Unser Team: Inhaber Deniz Tezgel und sein Verlegeteam für Fliesen, Platten und Mosaik. Wir arbeiten in Wetzlar, Gießen und ganz Mittelhessen. (141) | Unser Team: Inhaber Deniz Tezgel und sein Verlegeteam für Fliesen, Platten und Mosaik. Wir arbeiten in Aßlar und in ganz Mittelhessen. (134) |
| `/leistungen/bad` | Badsanierung in Wetzlar: bodengleiche Dusche, barrierefreies Bad und große Fliesen. Abdichtung nach DIN 18534, der Regel für Bad und Dusche. (140) | Leistungen rund ums Bad: Dusche ohne Stufe, barrierefreies Bad und große Fliesen, abgedichtet nach DIN 18534. Der Termin bei Ihnen vor Ort ist kostenfrei. (154) |
| `/leistungen/wohnen` | Fliesenverlegung im Wohnbereich in Wetzlar: Feinsteinzeug, Naturstein und Treppen für Wohnräume und Küchen. Der Termin bei Ihnen vor Ort ist kostenfrei. (152) | Fliesen für Wohnräume und Küchen: Feinsteinzeug, Naturstein und Treppen, verlegt vom Fachbetrieb aus Aßlar. Der Termin bei Ihnen vor Ort ist kostenfrei. (152) |
| `/leistungen/aussen` | Balkon und Terrassensanierung in Wetzlar, auch auf Stelzlagern. Das Gefälle ist mindestens 1,5 bis 2 %, damit Regenwasser abläuft. (130) | Balkon und Terrasse sanieren, auch auf Stelzlagern. Das Gefälle beträgt mindestens 1,5 bis 2 %, damit Regenwasser vom Haus weg abläuft. (135) |
| `/leistungen/untergrund` | Untergrund und Abdichtung in Wetzlar: Wir gleichen Estrich aus, messen die Restfeuchte und dichten unter den Fliesen nach DIN 18534 ab. (135) | Untergrund und Abdichtung: Wir gleichen Estrich aus, messen die Restfeuchte und dichten unter den Fliesen nach DIN 18534 ab. Der Termin ist kostenfrei. (151) |
| `/beratung` | Kostenlose Fliesenberatung in Wetzlar und Aßlar ohne Verpflichtung. Wir prüfen den Untergrund und beraten Sie zu Formaten, Fugenbild und Rutschhemmung. (151) | Kostenlose Fliesenberatung ohne Verpflichtung: Wir prüfen den Untergrund und beraten Sie zu Formaten, Fugenbild und Rutschhemmung für Ihren Raum. (145) |
| `/termin` | Termin vereinbaren in Aßlar und Wetzlar: Wählen Sie Ihr Wunschthema und senden Sie die Anfrage online oder per WhatsApp. Der Termin vor Ort ist kostenfrei. (155) | Termin vereinbaren: Wählen Sie Ihr Thema und senden Sie die Anfrage online oder per WhatsApp. Der Termin bei Ihnen vor Ort ist kostenfrei. (138) |
| `/karriere` | Jobs als Fliesenleger (m/w/d): Wir suchen Gesellen oder erfahrene Fachkräfte in Aßlar, Wetzlar und Mittelhessen. Bewerben Sie sich per E-Mail oder Telefon. (155) | Jobs als Fliesenleger (m/w/d) in Aßlar bei Wetzlar: Wir suchen Gesellen oder erfahrene Fachkräfte. Bewerben Sie sich per E-Mail oder Telefon. (141) |
| `/preise` | Preise für Fliesenverlegung, große Fliesen & Badsanierung in Wetzlar & Aßlar auf Anfrage. Schildern Sie Ihr Vorhaben für ein verbindliches... (141) | Was kostet Ihr Vorhaben? Den Preis für Fliesen, große Formate oder die Badsanierung nennen wir nach dem Termin vor Ort als Festpreisangebot. (140) |

## 5. H1

Die zwei geschützten H1 bleiben: `/` „Perfektion auf jedem Quadratmeter.“ und `/bad/badsanierung` „Ihr neues Traumbad zum Festpreis.“ (S5: keine Änderung empfohlen). Vorschläge für die übrigen:

| Seite | Paket | H1 heute | H1 neu |
|---|---|---|---|
| `/bad/musterbaeder/basic-bad-7` | P2 | Musterbad Basic-Bad 7,0 ㎡ – Komplettbad & Badsanierung | Musterbad Basic mit 7,0 m² |
| `/bad/fliesen` | P2 | Perfekte Fliesenverlegung für Ihr neues Badezimmer | Fliesen für Ihr neues Badezimmer |
| `/leistungen/bad` | P3 | Badsanierung & Komplettbäder: Bäder & Wellness in Wetzlar | Leistungen rund ums Bad |
| `/leistungen/wohnen` | P3 | Fliesenverlegung Wohnbereich & Neubau in Wetzlar | Böden und Wände im Wohnbereich und Neubau |
| `/leistungen/aussen` | P3 | Balkon- & Terrassensanierung in Wetzlar & Mittelhessen | Leistungen für Balkon, Terrasse und Eingang |
| `/leistungen/untergrund` | P3 | DIN 18534 Abdichtung & Untergrundvorbereitung in Wetzlar | Untergrund vorbereiten und nach DIN 18534 abdichten |
| `/fliesen/kueche` | P3 | Küchenfliesen verlegen in Wetzlar mit Fliesenleger Tezgel | Küchenfliesen und Fliesenspiegel verlegen |
| `/bad/musterbaeder` | P3 | Musterbäder & Badideen Wetzlar: Badsanierung Tezgel | Musterbäder und Badideen |
| `/bad/badanfrage` | P3 (S6) | Badsanierung Angebot anfordern bei Tezgel Wetzlar | Angebot für Ihre Badsanierung anfordern |
| `/bad/projekt-check` | P3 (S6) | Bad-Projektcheck: Badsanierung online prüfen bei Tezgel Wetzlar | Badsanierung online prüfen mit dem Projektcheck |
| `/beratung` | P3 (S4, S6) | Kostenlose Fliesenberatung in Wetzlar | Kostenlose Fliesenberatung |
| `/karriere` | P3 | Fliesenleger Jobs & Karriere bei Tezgel in Wetzlar & Aßlar | Jobs als Fliesenleger in Aßlar bei Wetzlar |

Das Muster der ersten Zeile gilt für alle 12 Musterbäder (Strich und „㎡“ raus). Auffällig in den Daten: `/bad/musterbaeder/premium-bad-4_6` und `premium-bad-15_9` heißen in Titel und H1 „Komfort“, die anderen Premium-Bäder „Premium“. Welcher Name stimmt, entscheidet Umut; ich ändere ihn nicht von mir aus.

**Nicht in diesem Plan:** 33 H1 im Muster „Begriff: Erklärung“ (zum Beispiel „Fugensanierung: Silikon- und Zementfugen fachgerecht erneuern“). Das ist eine Hausregel, aber kein Suchproblem. Vorschlag: Ich überarbeite sie Seite für Seite, wenn eine Seite ohnehin angefasst wird (P3, P5).

## 6. Reihenfolge der Pakete

| Schritt | Paket | Inhalt | Braucht vorher | Wirkung |
|---|---|---|---|---|
| 1 | **P2 Meta und Zuordnung** | Markenzusatz (Abschnitt 3), Titel ohne Marke, `/preise` (abgeschnittene Description, Titel ohne Marke), H1-Regelverstöße (Musterbäder, `/bad/fliesen`), `sanitizeTitle` ohne Gedankenstrich (T10), Links mit Ankertext „Fliesenleger in Wetzlar“ aus Einsatzgebiet der Startseite, Fuß, Einzugsband und Karte; S2 Variante 1 (`/standorte/asslar` per 308 auf `/`); T07 Öffnungszeiten nach M-03 | Freigabe des Plans, S2; für T07 die Öffnungszeiten von Deniz und die Freigabe der Firmendaten | einheitliche Marke, die Wetzlar-Seite bekommt Links |
| 2 | **P3 Wetzlar-Seite** und der Wetzlar-Teil von P4 | eigene Inhalte für `/standorte/wetzlar` (Anfahrt aus Aßlar, Leistungsblöcke mit Links, Fragen aus Wetzlar, Beratung in Wetzlar nach Vereinbarung, Stimmen und Projekte nur mit Erlaubnis); im selben Push Startseite und Übersichten ohne Wetzlar (Tabellen 4a, 4b, 5) und, nach S3 und S4, `/leistungen/*/wetzlar`, `/leistungen/*/asslar` und `/ausstellung/wetzlar` auf noindex oder 308 | S3, S4; für Projekte, Fotos und Stimmen die Bestätigung von Deniz | Hauptziel: eine starke Seite für „Fliesenleger Wetzlar“, keine Konkurrenz mehr auf der eigenen Website |
| 3 | **P4 Ortsseiten-Matrix** | übrige Leistung-×-Ort-Seiten und ferne Orte nach S3; Nachbarorte (A08), Entfernungen (A09), T06, Sitemap nur mit Seiten mit eigenem Inhalt, IndexNow ohne noindex-Seiten (T12), Rest von T09 | S3 | weniger fast gleiche Seiten, klarere Signale |
| 4 | **P5 Bilder** | Webfassungen der geeigneten neuen Fotos, Alt-Texte für alle Bilder, Teilen-Bilder (T08), Referenzprojekte statt Platzhalter (T11), stabile Bild-Adressen (T13) | Freigabe des Plans; Orte an Fotos nur mit Bestätigung von Deniz; Gewerbeanlage und Mosaike nur mit Freigabe | Bildersuche, echte Belege auf den Seiten |
| 5 | **P6 Formulare** | eine Kurzanfrage überall, Quelle in jeder Mail, keine stille Verwerfung (K01 bis K04), Stilllegung der übrigen Formulare per 308 | S6, Rechtsprüfung für Einwilligung und Datenschutzhinweis; K01 und K02 schon mit S10 | mehr Anfragen, keine verlorenen |
| laufend | **P7 Entität und Offpage** | Liste für Umut: Profil, gleiche Angaben in Verzeichnissen, fliesen-asslar.de (S8), Bewertungen anfragen und beantworten, lokale Erwähnungen. Ich kontaktiere niemanden und ändere keine Einträge | nichts; die Liste schreibe ich sofort | Bekanntheit im lokalen Ergebnis |
| laufend | **P8 Messen** | Search Console (Property www, Bericht „Bilder“), Bing Webmaster Tools, Ereignisse nach Einwilligung, IndexNow nach Freigabe, Vergleich nach 4 und 8 Wochen | Zugang zur Search Console; Freigabe für Tracking-Ereignisse | Ausgangswerte und Erfolgskontrolle |

**Warum diese Reihenfolge:** P2 ist klein und schafft die Grundlage (Marke, Links auf die Wetzlar-Seite). P3 ist das Hauptziel; der Wetzlar-Teil von P4 gehört in denselben Push, weil sonst vier Leistungsseiten und die Ausstellungsseite weiter um Wetzlar konkurrieren. P5 und P6 brauchen Antworten von Deniz und eine Rechtsprüfung und laufen deshalb danach; vorbereiten kann ich sie vorher.

## 6a. Seitentexte: Striche und Floskeln (Befund und Vorschlag)

Gezählt im sichtbaren Text (`<main>`) des Baus, ohne Rechtstexte:

| Seitengruppe | Gedankenstriche „ – “ oder „ - “ | Floskeln | Seiten mit Strich |
|---|---|---|---|
| Leistung × Ort (52 Seiten) | 322 | 39 | 52 |
| Musterbäder (12) | 24 | 12 („Entdecken Sie“) | 12 |
| Ratgeber im Blog (13) | 112 | 0 | 13 |
| Referenzen (6) | 19 | 0 | 6 |
| Ortsseiten (13) | 0 | 0 | 0 |
| übrige Seiten | 471 | 14 | 53 |

Die meisten Striche stehen auf den älteren Seiten unter `src/app/(bestand)/`, die die Werkstatt nicht neu geschrieben hat, zum Beispiel `/balkon-terrasse/stelzlager` (18), `/treppen` (17), `/standorte` (17), `/untergrund-abdichtung/din-18534` (17). Ein Teil der Floskeln steht im Wortlaut von Kundenstimmen („perfekt“) und in der geschützten H1 der Startseite; beides bleibt.

**Vorschlag:** Die Seiten Leistung × Ort folgen S3 (bei noindex oder 308 lohnt keine Überarbeitung). Die Musterbäder bekommen mit P2 neue Vorlagentexte. Die übrigen Seiten überarbeite ich Seite für Seite, wenn ein Paket sie ohnehin anfasst (P3 bis P5), zuerst die Zielseiten aus Abschnitt 2. Zeitspannen heißen dann „bis“ statt Strich; der Inhalt bleibt.

## 6b. Weitere Hebel aus der Methodik (Vorschläge)

Abgeglichen mit dem SEO-Prompt (Abschnitte 8 bis 12, nur Methodik):

- **Schon erfüllt:** Meta-Robots mit `max-image-preview: large`, `max-snippet: -1`, `max-video-preview: -1` für Googlebot (`src/lib/metadata.ts`); alles Wichtige steht im ersten HTML (statischer Bau); Titel in Pixeln: Die neuen Titel aus Abschnitt 4a messen 415 bis 517 px in Liberation Sans 20 px (metrisch gleich Arial), Grenze 580 px; heute liegt kein Titel darüber.
- **Markendefinition in einem Satz**, wortgleich auf Startseite, Über uns, im Fuß, in den Strukturdaten und in den Profiltexten (P7): „Fliesenverlegung Tezgel ist ein eingetragener Fachbetrieb für Fliesen-, Platten- und Mosaikarbeiten in Aßlar, gegründet 2008.“ (F-05, F-06). Vorschlag für P2.
- **Seitenname in der Google-Suche:** Der WebSite-Knoten (`src/lib/schema.ts`, `buildWebSiteNode`) bekommt `alternateName: 'Tezgel'`; seine Beschreibung („Ihr Fachbetrieb für exklusive Fliesenverlegung … in Aßlar, Wetzlar und Hessen“) wird die Markendefinition. Vorschlag für P2, mit `npm run qa:graph`.
- **Kurzantworten:** Unter Frage-Überschriften steht zuerst ein vollständiger Antwortsatz mit Marke, Leistung und Ort. Das hilft Suchmaschinen und KI-Antworten, eine Passage zuzuordnen. Umsetzung mit den Fragen der Wetzlar-Seite (P3) und auf den Fachseiten, wenn sie angefasst werden.
- **Preise offen:** Echte Preisspannen und Kostentreiber gehören zu den häufigsten Fragen. Sie kommen nur mit Zahlen von Deniz auf die Seite (Fragen an Deniz); bis dahin bleibt es beim Festpreisangebot nach dem Termin.
- **KI-Crawler:** `robots.txt` lässt Such- und Trainings-Bots zu (GPTBot, ClaudeBot, Google-Extended, CCBot und andere). Ob Trainings-Bots draußen bleiben sollen, ist eine Geschäftsentscheidung; Empfehlung: so lassen, die Such-Bots bleiben in jedem Fall frei.

## 7. Was ich bis zur Freigabe vorbereite (ohne Änderung an der Website)

- Gegenprüfung von P1 durch zwei unabhängige Prüfer (läuft) und gegebenenfalls Nacharbeit.
- Die Liste für P7 (Dokument für Umut).
- P5: Auswahl der Fotos aus dem Inventar (Qualität A bis C, ohne offene Freigabe, je Fast-Duplikat eins), die Alt-Entwürfe gegen die Bilder prüfen, Zuordnung zu den Seiten. Nur als Vorschlag, ohne Orte.
- P3: Textentwurf der Wetzlar-Seite nur aus belegten Fakten, als Datei zur Durchsicht, nicht im Code.
- Für jede Zeile der Tabellen in Abschnitt 4 und 5 die genaue Stelle im Code (`docs/seo/arbeit/code-stellen-p2-p3.md`), damit die Umsetzung nach der Freigabe schnell geht.
- **P2 als fertiger Patch** (Stand 02.11.2026): `docs/seo/arbeit/p2.patch`, anwendbar mit `git apply` auf `seo/lokal`. Er enthält:
  - den einheitlichen Markenzusatz für 55 Seiten ohne Wetzlar in Titel oder Description, Liste alt und neu in `docs/seo/arbeit/p2-markenzusatz.json`;
  - T10: Die Auffüllung in `src/lib/metadata.ts` nutzt nur noch „| Fliesenverlegung Tezgel“ oder „· Tezgel“, mit Test;
  - Titel und Description von `/preise`;
  - die H1 aus Abschnitt 5 mit Paket P2: `/bad/fliesen` „Fliesen für Ihr neues Badezimmer“ und die 12 Musterbäder im Muster „Musterbad Basic mit 7,0 m²“;
  - die Links „Fliesenleger in Wetzlar“ aus dem Einsatzgebiet der Startseite und aus dem Fuß. Einzugsband und Karte zeigen nur Ortsnamen; die Namen in der Karte sind keine Links. Dort bleibt „Wetzlar“, sonst stünde ein Werbetext zwischen Ortsnamen.
  - **Geprüft** in einer Arbeitskopie: Typprüfung, Lint, Build, 282 von 282 Tests, `qa:graph`. Im gebauten HTML stimmen alle 55 Titel, und kein Titel kommt doppelt vor.
  - Titel und Descriptions mit Wetzlar (Spalte „P3“) sind nicht darin; sie kommen mit der Wetzlar-Seite.
- **P3, Meta-Teil, als fertiger Patch** (Stand 02.11.2026): `docs/seo/arbeit/p3-meta.patch`, anzuwenden nach `p2.patch`.
  - Inhalt: die 28 Titel und Descriptions mit Paket „P3“ aus Abschnitt 4 (Wetzlar raus, eigene Description für `/standorte/wetzlar`) und die 10 H1 mit „P3“ aus Abschnitt 5.
  - Geprüft in einer Arbeitskopie: Typprüfung, Lint, Build, 282 von 282 Tests, `qa:graph`. Im gebauten HTML stimmen alle Titel, Descriptions und H1.
  - Außerhalb der Wetzlar-Seite, der Karriere-Seite und der Seiten, die an S3 und S4 hängen, steht Wetzlar dann in keinem Titel und keiner Description mehr.
  - Laut Leitplanke geht er nur im selben Push wie die neue Wetzlar-Seite live.
- **Befund zu Garantien und Zertifikaten in sichtbaren Texten:** `docs/seo/arbeit/zusagen-befund.md`, mit Vorschlägen gleicher Bedeutung aus dem Faktenblatt.
- **K01 und K02 als fertiger Patch:** `docs/seo/arbeit/k01-k02.patch`, Beschreibung in `docs/seo/arbeit/p6-kurzanfrage.md`. Er wartet auf S10.

## 8. Offene Fragen

- Freigabe des Plans, ganz oder mit Änderungen (einzelne Zeilen der Tabellen gern direkt korrigieren).
- Markenzusatz wie in Abschnitt 3?
- S2 (Aßlar auf der Startseite, `/standorte/asslar` per 308), S3 (Leistung × Ort und ferne Orte), S4 (Ausstellung oder Beratung), S6 (Formulare), S10 (K01 und K02 sofort).
- Musterbäder: „Komfort“ oder „Premium“?
- Profil-Link (T05), Zugang zur Search Console, Fragen an Deniz wie in meiner ersten Nachricht.
