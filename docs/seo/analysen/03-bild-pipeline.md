# Analyse: Bild-Pipeline, Bildplätze, Alt-Texte

> Momentaufnahme vom 01.11.2026 (Code-Stand `main` f19ebba, Werkstatt-Branch 40 Commits voraus). Erstellt als Grundlage für [`docs/seo/KONTEXT.md`](../KONTEXT.md); bei Abweichungen gilt `KONTEXT.md`, das nach einer unabhängigen Gegenprüfung korrigiert wurde. Zeilennummern können sich mit späteren Commits verschieben. Hinweise auf damals noch fehlende Dateien im Bildordner (`bildinventar`, `projekte.md`, `KONTEXT.md`, Platzhalter im README) sind mit dem Commit der Bilder erledigt. `B/` = `src/app/(bestand)/`.

*Ohne Kennzeichnung: am Code, per Befehl, über die GitHub-API oder live geprüft. „Vermutung“: abgeleitet, nicht geprüft.*

## 1. Neues Foto auf die Website (Repo-Praxis)

`bilder.mjs` liest das Original nur. Es entfernt einfarbige Ränder, schneidet nach Format und Schwerpunkt zu und korrigiert höchstens ±8 %. Es schreibt metadatenfreie JPEG in Qualität 82, einen 16-px-WebP-Platzhalter und `bilder.json` ins Ziel (`_werkstatt/werkzeuge/bilder.mjs:9-19`, `:281-376`, `:379-393`).

1. **Original:** Die Quelle ist `_eingang/entpackt/<original>` oder ein absoluter Pfad (`bilder.mjs:282-283`). `_eingang/` ist gitignored (`.gitignore:69-70`).
   - Die neuen Originale bleiben, wo sie sind (`_werkstatt/bilder/neue-bilder-2026-10-31/README.md:3`).
   - Portabel verweisen: `"original": "../../_werkstatt/bilder/neue-bilder-2026-10-31/nb-042.jpg"`. `path.join` löst `..` auf, `_eingang` muss dafür nicht existieren (mit Node geprüft).
   - Die alten 84 Originale holt `EINRICHTUNG.md:7-13` aus Commit 35af5cc. Der lokale Klon ist flach, 35af5cc fehlt dort.
2. **Auftrag** (JSON-Liste, geprüft in `bilder.mjs:200-267`):
   - Pflicht: `id` (eindeutig), `original`, `raum` (wird Ordner), `name` (wird Dateiname, ä→ae, `:44-56`), `format` als „B:H“, `schwerpunkt` x/y in %, `alt` (≤ 125 Zeichen, leer nur bei dekorativen Bildern, `:241-242`).
   - Optional: `ausschnitt` (% je Seite, wird weggeschnitten), `breiten` (Standard 640/960/1280, `:34`), `korrektur` (Standard true), `schaerfen` (0 bis 2).
   - Vorlage: `_werkstatt/bilder/auftrag-e4.json:2-24`.
   ```json
   [{"id":"seo-bad-wanne-1","original":"../../_werkstatt/bilder/neue-bilder-2026-10-31/nb-042.jpg",
     "raum":"bad","name":"badewanne-graue-grossformatfliesen","format":"4:5",
     "schwerpunkt":{"x":50,"y":55},"ausschnitt":{"oben":10,"unten":5},
     "breiten":[640,960,1280],"alt":"Badewanne mit grauen Großformatfliesen","korrektur":true}]
   ```
3. **Voraussetzungen:**
   - Node 24 (`package.json:5-7`) und sharp 0.35.5 (`_werkstatt/werkzeuge/package.json:19`).
   - `_werkstatt/werkzeuge/node_modules` fehlt im Klon. Also dort `npm ci` ausführen (`EINRICHTUNG.md:47-55`; die Pfade dort gehören zum Container).
   - Vermutung: Nach `npm ci` in der Repo-Wurzel findet Node sharp auch dort (`package-lock.json:7241-7242`).
   - `SCRATCH` oder `RELAUNCH_SCRATCH` muss gesetzt sein, sonst bricht das Werkzeug ab (`_werkstatt/werkzeuge/lib.mjs:14-27`).
4. **Aufruf** aus der Repo-Wurzel: `node _werkstatt/werkzeuge/bilder.mjs --auftrag <json> --ziel "$SCRATCH/seo-bilder"`.
   - Das Ziel muss im Repo oder in `$SCRATCH` liegen (`:395-402`).
   - Nicht direkt nach `public/images/arbeiten` schreiben, sonst liegt `bilder.json` öffentlich in `public/` (`:379-391`).
   - Danach `--pruefe public/images/arbeiten` aufrufen (Exit 1 bei EXIF, XMP oder IPTC, `:426-447`).
5. **Ergebnis:** je Breite `<raum>/<name>-<breite>.jpg`, dazu `<raum>/<name>.jpg` als Kopie der größten (`:344-350`). Das `src` ist fest `/images/arbeiten/<raum>/<name>.jpg` (`:358`).
   - Nur diese Basisdatei kopieren. In `src/` verweist nichts auf die Breitenvarianten (0 Treffer).
   - Heute liegen 100 solcher Varianten (5,6 MB) ungenutzt in `public/`.
6. **`arbeiten.ts`:** Es gibt keinen Generator.
   - Der Dateikopf verlangt, die Werte aus `_werkstatt/bilder/arbeiten-e2.json` „neu zu erzeugen“ (`src/config/arbeiten.ts:5`). Gelesen wird die JSON aber nur von `textpruefung.mjs:23`. Die Übertragung war Handarbeit des Orchestrators (`plan-generator.py:124`).
   - Die Dateien laufen schon auseinander: `start-bad` und `start-bad-gross` stehen nur in `arbeiten.ts:436-455`.
   - Vorgehen: `bilder.json` in `arbeiten-e2.json` übernehmen, den Eintrag in `ARBEITEN` übertragen und `blurDataURL` in `blur` umbenennen (`bilder.mjs:363`, `arbeiten.ts:24`).
7. **Einbinden** über die Kennung (`ArbeitId`, vom Typprüfer geprüft, `arbeiten.ts:458`):
   - Einstieg: `worum.bild` (`src/components/vorlagen/inhalt.ts:31-32`).
   - Beleg: `beleg.fotos[]` (`:135`). Zweierbild: `:143`.
   - Lagekacheln: `bild` oder `motiv` (`:20`, `src/inhalte/start.ts:45-50`).
   - Galerie `/referenzen`: `src/components/momente/galerie-filter/daten.ts:51-76`.
   - Ortsseiten: `src/inhalte/galerie.ts:7-14`, dazu `FOTOS` in `src/app/(bestand)/standorte/[stadt]/page.tsx:24-31`.
   - `/fliesen`: `src/components/momente/verband/VerbandProbe.tsx:26-27`.
   - Startfoto fest verdrahtet: `src/components/start/Startbild.tsx:21`, `start.ts:30`.
   - Gerendert wird nur über `Bildfeld` (`src/components/kern/Bildfeld.tsx:69-100`, Regel in `_werkstatt/KERN.md:158`). Bestandsseiten ohne Vorlage brauchen `<Bildfeld arbeit=… sizes=…>` direkt.
8. **Neuer Raum** (zum Beispiel Küche oder Flur):
   - `Raum` und `RAUM_NAME` erweitern (`arbeiten.ts:7-14`).
   - Die Galeriegruppen sind davon getrennt (`daten.ts:11`, `:35-42`). Eine neue Gruppe braucht ein Icon (es gibt kein Küchen-Icon, `src/components/icons/namen.ts:2`), den Wortlaut in `_werkstatt/texte/referenzen.md:49` und eine Anpassung von `test/galerie-filter.test.mjs:9`.
   - Die Tests verlangen in der Galerie exakt 4:5, jede Datei nur einmal und nicht das Einstiegsbild (`:19-33`). Unterschriften: höchstens 80 Zeichen, ohne Strich und Fachwort (`:42-49`). Je Ort drei verschiedene Fotos (`test/orte.test.mjs:45-49`).
   - Die Galerie in Sechserschritten halten (`daten.ts:44-46`).
   - `npm test` und `npm run typecheck` lokal laufen lassen. Die CI auf main prüft nur Lint und Audit (`.github/workflows/security.yml:23-29`).

## 2. Alt-Texte

**Wo sie stehen:**
- Alle Fotos: `src/config/arbeiten.ts` (53 Einträge, keiner leer, der längste hat 109 Zeichen).
- Logo: `src/components/common/Header.jsx:31`, `Footer.jsx:130`, `src/components/blog/BlogAuthorCard.jsx:49,59`.
- Ersatztext in `src/app/(bestand)/referenzen/[id]/page.jsx:234`. Er wird nie ausgeliefert, weil alle Projekte `placeholder: true` sind (`src/config/projects.js:13-90`).
- Musterbäder, Blog und Leistungen zeigen keine Bilder.

**Regeln:**
- Höchstens 125 Zeichen, ehrlich, beschreibt nur Sichtbares, keine erfundenen Orte (`KERN.md:158`, `arbeiten.ts:4`).
- Kein Gedankenstrich (`KERN.md:277`). „Gäste-WC“ ist erlaubt (`KERN.md:278`).
- `alt=""` blendet die ganze `figure` für Screenreader aus (`Bildfeld.tsx:73`). Fliesenkompositionen tragen `aria-hidden` (`Fliesenkomposition.tsx:59`).

| Fundstelle | Text (Zeichen) | Bewertung |
|---|---|---|
| `arbeiten.ts:444` | „Bad im Dachgeschoss mit Dusche hinter einer Glaswand …“ (96) | beschreibend, LCP-Bild der Startseite |
| `:32` | „Dusche ohne Stufe mit großen grauen Fliesen …“ (62) | beschreibend |
| `:240` | „Die Außentreppe vorher: …ausgebessertem Beton …“ (74) | beschreibend mit Kontext |
| `:120` | „Bad während der Arbeit: …“ (107) | ehrlich, lang |
| `:216` | „Große Platten werden auf Stelzlagern verlegt“ (44) | knapp, mit Fachwort |
| `:224` | „Mitarbeiter von Fliesenverlegung Tezgel kniet …“ (107) | Marke steht natürlich im Satz |
| `:432` | „Gäste-WC mit WC und Bidet …“ (61) | regelkonform |
| `Header.jsx:31` | „Fliesenverlegung Tezgel“ | korrekt fürs Logo |
| `BlogAuthorCard.jsx:59` | „Fliesenverlegung Tezgel – Fachbetrieb Aßlar & Wetzlar“ | Gedankenstrich, voller Suchbegriffe; weicht vom Kopf ab, obwohl der Kommentar in `:43` Gleichheit behauptet |
| `referenzen/[id]/page.jsx:234` | „{Titel} – Foto n“ | generisch, mit Strich |

Ein dekoratives Foto gibt es in `ARBEITEN` derzeit nicht.

## 3. Plätze ohne echtes Foto

| Seite | Heute | Beleg |
|---|---|---|
| `/` Lagekachel „Fliese gesprungen“ | Fliesenkomposition `riss` | `src/inhalte/start.ts:48`, `bildplaetze.md:15` |
| `/` Startfoto | Nahaufnahme von Fuge oder Kante fehlt | `MENSCHEN.md:80` |
| `/leistungen` | vier Verlegepläne; „Böden und Wände“ ohne Foto | `src/inhalte/leistungen.ts:73-88`, `bildplaetze.md:40,92-93`, `MENSCHEN.md:33` |
| `/fliesen` Einstieg | Verlegeplan; Fischgrät-Foto weich | `src/inhalte/fliesen.ts:29`, `MENSCHEN.md:82` |
| `/blog` | Einstieg und Beleg ohne Foto | `src/inhalte/blog.ts:19-24,70`, `bildplaetze.md:94` |
| `/kontakt` | kein Foto, nur die Karte | `src/app/(bestand)/kontakt/page.jsx:6,12`, `bildplaetze.md:64,95` |
| `/ueber-uns` Beleg | `fotos: []` | `src/inhalte/ueber-uns.ts:79` |
| `/standorte/[stadt]` (13 Orte, auch Wetzlar und Aßlar) | Einstieg ist eine gezeichnete Karte, Leistungen als Motive, je Ort 3 von 6 gemeinsamen Fotos | `OrtsSeite.tsx:43`, `src/inhalte/orte.ts:29-34`, `galerie.ts:7-14` |
| Teilen-Bild (OG) | das geplante `og-start` fehlt, stattdessen das Logo | `bildplaetze.md:97-98`, `src/lib/metadata.ts:132` |

**Ganz ohne Foto** (keine Kennung aus `ARBEITEN` in diesen Routen):
- `/treppen` mit 3 Unterseiten, 14 Unterseiten von `/fliesen` (darunter kueche, flur-diele, neubau, grossformat), `/fliesenreparatur`.
- `/naturstein` mit 2 Unterseiten, `/untergrund-abdichtung` mit 5, 3 Balkon-Unterseiten.
- `/bad/musterbaeder` mit 12 Unterseiten, `/leistungen/[id]` (4) und `/leistungen/[id]/[stadt]` (52).
- `/referenzen/[id]` (6), `/blog/[slug]` (13), `/preise`, `/ausstellung/wetzlar`.

Bewusst gezeichnet und nicht zu ersetzen: `schichten`, `gefaelle-dusche`, `formatregler`, `gefaelle-balkon`, `karte` (`bildplaetze.md:23,36,41,51,61`).

Vermutung zum größten Hebel: `/standorte/wetzlar` und `/standorte/asslar`, `/leistungen/*/wetzlar`, `/treppen/*`, `/fliesen/kueche`, `/fliesenreparatur`.

## 4. Herkunft der übrigen Bilder

- **`public/images/arbeiten/**`** (151 JPEG): Zuschnitte der 84 iPhone-Bildschirmfotos (`ENTSCHEIDUNGEN.md:15`).
  - Offene Frage M-08: IMG_2578 (Einstieg `/referenzen`, Beleg `/fliesen`) und IMG_2570 wirken wie Herstellerfotos (`MENSCHEN.md:22`).
  - Das Startfoto IMG_2569 zeigt denselben Raum wie IMG_2570 (`_werkstatt/bildinventar.csv:39-40`).
- **`public/images/bad/*`** (11 Bilder): Generatorbilder (`ENTSCHEIDUNGEN.md:63`, `_relaunch/MENSCHEN.md:33`). `gaeste-bad.png` trägt sogar C2PA-Daten mit `trainedAlgorithmicMedia` und „Google“ (Byte-Scan).
  - Laut E-013 sollten sie nicht mehr verwendet werden (`ENTSCHEIDUNGEN.md:65`, `KERN.md:155`).
  - Live dienen sie trotzdem als Teilen-Bild und `Article.image` aller 13 Artikel (`src/config/posts/*.js:11-16`, `blog/[slug]/layout.jsx:41,91`).
  - Außerdem sind sie `Service.image` für Bad und Wohnen auf 28 Seiten (`src/config/services.js:32,67`, `leistungen/[id]/page.jsx:166`, `[stadt]/page.tsx:198`).
- **Stock:** keine Verwendung gefunden. Die CSP erlaubt aber noch `images.unsplash.com` (`next.config.ts:85`).
- **Social-Zuschnitte** `_werkstatt/bilder/referenzen/**`: 81 Bilder mit EXIF- und XMP-Text, „asslar“ im Dateinamen (`bildinventar.csv:2`). Sie werden nicht ausgeliefert (`.vercelignore`), sind aber im öffentlichen Repo sichtbar.
- **Risiko:** KI- oder Herstellerbilder als eigene Arbeit können als irreführend gelten (UWG), bei Herstellerfotos kommt das Urheberrecht dazu. Die KI-Kennzeichnung sollte rechtlich geprüft werden.

## 5. Bild-SEO-Technik

- **Auslieferung:** AVIF und WebP, `qualities: [75]`, Cache ein Jahr (`next.config.ts:24-29`). `/images/*` ist `immutable` (`:89-96`): Ein neuer Zuschnitt braucht einen neuen Dateinamen.
- **Vorrang:** `lcp` setzt `eager` und `fetchPriority="high"` (`Bildfeld.tsx:84-85`). Bei Bildauswahl je Breite gibt es ein eigenes `preload` je Medienabfrage (`:119-122`). `sizes` ist je Bildplatz gesetzt (`:26-30`, `Beleg.tsx:50,57`).
- **Kritisch, robots.txt:** Die Regel `/*?*` sperrt alle URLs mit Fragezeichen (`src/app/robots.ts:29,34`, live geprüft). Alle Foto-URLs lauten `/_next/image?url=…` (Live-HTML).
  - Vermutung: Google lädt keine echten Fotos. Erreichbar bleiben nur die `og:image`-Dateien, also Logo und Generatorbilder.
- **Sitemap:** keine Bild-Sitemap (`src/app/sitemap.ts`), die Video-Sitemap ist leer (`video-sitemap.xml/route.ts:5-20`).
- **JSON-LD:** `Organization.image` und `LocalBusiness.image` zeigen das Logo (`src/lib/schema.ts:91,170-178`).
- **Teilen-Bild:** Das Standardbild ist das Logo mit 640 × 200 Pixeln, deklariert als 1200 × 630 (`metadata.ts:132-135`).
- **Dateinamen:** `<raum>/<sprechender-name>.jpg`, ohne Ort und Marke (`bilder.mjs:44-56`).
- **Bildunterschriften:** `figcaption` nur über `beschriftung` (`Bildfeld.tsx:92-97`). In Galerie und Beleg steht der Name auf der Glasfläche im Link (`Glasbild.tsx:38-49`).

## 6. Konflikt: Originale nicht committen

**Fakten:**
- E-004 deutet G4 als Verbot, Originale zu committen (`ENTSCHEIDUNGEN.md:15`); umgesetzt ist das in `.gitignore:69-70`.
- Der Wortlaut von G4 betrifft aber Zugangsdaten und Schlüssel sowie das Entfernen von Inhalten nur mit Ersatz (`AUFTRAG.md:60`). Der eigentliche Grund ist M-01: öffentliches Repo, sichtbare Personen, fremde Logos (`MENSCHEN.md:7-10`).
- Das Repo ist öffentlich. Commit 35af5cc mit den 84 alten Originalen (171 MB) steckt schon in der Geschichte von main; die Empfehlung aus M-01, per Squash zusammenzuführen, ist nicht umgesetzt.
- Die 127 neuen Dateien sind noch unversioniert, ohne EXIF, GPS und XMP, zusammen etwa 30 MB.
- `.vercelignore` hält `_werkstatt` vom Deploy fern.
- Das README im Ordner vermerkt die Abweichung (`README.md:3`). Es entstand während dieser Prüfung und verweist auf noch fehlende Dateien.

**Empfehlung für die SEO-Runde:**
- Den Auftrag vom 01.11.2026 als neue Entscheidung eintragen, gültig nur für diesen Ordner. `_eingang/` bleibt die Regel für spätere Bilder.
- Den Ordner als unveränderliche Quelle behandeln und nie Originale nach `public/` kopieren.
- Vor dem Push sichten, was damit öffentlich wird: Personen, Hausnummern, Kennzeichen, fremde Logos, die Mosaike nb-113 bis nb-116 (`README.md:35-36`). Nach dem Push hilft nur noch ein Umschreiben der Git-Geschichte.
- Der WERKSTATT-Block erlaubt Pushes nur auf den Arbeitsbranch (`CLAUDE.md:7`). Ein Push auf main geht sofort live (`vercel.json:4-5`).

## Risiken und Fehler

1. robots.txt sperrt alle optimierten Bilder (`robots.ts:29,34`).
2. Generatorbilder stecken live in Teilen-Bild und JSON-LD (Abschnitt 4).
3. Die Maße der Teilen-Bilder sind falsch deklariert (`metadata.ts:132-135`).
4. `arbeiten.ts` und `arbeiten-e2.json` laufen auseinander, und es gibt keinen Generator.
5. `--ziel public/images/arbeiten` würde `bilder.json` veröffentlichen (`bilder.mjs:379-391`).
6. 100 ungenutzte Varianten (5,6 MB) liegen in `public/`.
7. Ein neuer Zuschnitt unter altem Namen bleibt bis zu ein Jahr im Cache (`next.config.ts:89-96`).
8. Mergekonflikte drohen: Der Arbeitsbranch ordnet in `galerie.ts`, `daten.ts`, `referenzen.ts:50`, `bad-badsanierung.ts:30` und `ueber-uns.ts:117-121` andere Bilder zu. `arbeiten.ts`, `bilder.mjs` und `public/images/**` sind auf beiden Ständen gleich.
9. 13 Ortsseiten teilen sich 6 Fotos (`orte.ts:34`).
10. Die 6 Platzhalter unter `/referenzen/[id]` sind indexierbar (`referenzen/[id]/layout.jsx:64-66`). Die Weiterleitung aus E-013 fehlt.
11. Die Fotos verlieren mehrfach Qualität: WhatsApp-JPEG, dann Qualität 82, dann 75.

## Offene Fragen an den Auftraggeber

1. Wo lag welche Baustelle der 127 Fotos, und dürfen wir den Ort nennen (`MENSCHEN.md:59`)?
2. Sind IMG_2578, IMG_2569 und IMG_2570 eigene Arbeiten (M-08)?
3. Dürfen die Generatorbilder aus Teilen-Bild und JSON-LD entfernt und gelöscht werden (M-10, `MENSCHEN.md:26`)?
4. Liegen Freigaben vor: der Mitarbeiter auf den Fotos (M-17), Gewerbekunden, die Mosaike nb-113 bis nb-116?
5. Sollen die Originale dauerhaft im öffentlichen Repo bleiben?
6. Direkt auf main pushen oder erst auf einen Branch? Und wie geht die SEO-Runde mit den 40 Commits des Arbeitsbranchs um?
7. Decken die neuen Fotos die offenen Wünsche UM-12 (Nahaufnahmen), UM-14 (Fischgrät) und M-25 (Küche, Flur)?
