# UM-E4-INHALT · Teil A (EP1, EP2, EP3) · Notiz des Baumeisters (29.10.2026, Kern 4.4)

- Arbeitskopie: `…/inhalt/baum`.
- Vergleichsstand: `…/inhalt/vor-A` (gleich HEAD 0e5b2002, vor dem ersten Edit angelegt, danach unverändert).
- Diff: `…/inhalt/UM-E4-INHALT-A.diff` (14 Dateien, 884 Zeilen; nach der Nacharbeit neu erzeugt).
- Skripte, Protokolle, Messungen und Bilder: `…/inhalt/a/` (`skript/`, `log/`, `mess/`, `bild/r6/`).
- Gebaut in vier Läufen (`a/log/build-1.log` bis `build-4.log`): Produktionsbau mit echter `node_modules`-Kopie, Server `next start` auf
  127.0.0.1:4400, beendet über die Prozessgruppe aus `a/log/server-4400.pid`.
- Nacharbeit nach der Prüfung (Abschnitt „Nacharbeit“ unten): drei weitere Läufe (`a/log/build-n1.log` bis `build-n3.log`),
  Protokolle in `a/log/n/`, Messungen in `a/mess/n/`, Bilder in `a/bild/r6/`. Die Notiz vor der Nacharbeit liegt als
  `a/log/n/notiz-vor-nacharbeit.md`.
- Danach `node_modules` wieder als Verweis, `.next`, `node_modules_echt` und `next-env.d.ts` gelöscht.
- Repository nur gelesen.

## Prüfzahlen (Endstand nach der Nacharbeit, Bau n3)

| Prüfung | Ergebnis |
|---|---|
| `npm test` | 249 / 249, 0 fail |
| `npx tsc --noEmit` (mit vorübergehender `next-env.d.ts`) | exit 0 |
| `npx eslint` | exit 0, keine Meldung |
| `werte.mjs --arbeitsbaum --dateien` (14 Dateien) | 0 Befunde |
| `jsonld.mjs` (die 6 Seiten, `/`, `/balkon-terrasse/stelzlager`, `/balkon-terrasse/terrassenplatten`) | 9 / 9 grün |
| `bewegung.mjs` register (6 Seiten) | unbekannt 0, ohne Register 0, Hover-Fehler 0 |
| `bewegung.mjs` reduziert und ruhig (6 Seiten) | Bewegungsbefunde 0 |
| Seitenformel (6 Seiten × 3 Geräte) | worum › lage › tun › ablauf › beleg › schritt |
| Konsolenfehler und Überlauf (`ueberlauf()` aus lib.mjs) | 0 auf m390, t1024, d1440 und mit 200 % Schrift auf m360 und m390 |
| Textüberlauf in den drei Abschnitten (`scrollWidth` je Block) | 0 auf m390, m360-200, m390-200; t1024 und d1440 siehe unten |

- Die Formel-Kette prüft `abschnitte.mjs`, Bericht in `a/bild/r6/bericht.json` und `bericht-200.json`.
- Textüberlauf ab lg: Die Prüfung meldet auf /balkon-terrasse bei t1024 und d1440 je einen Block (`mt-12`, 960 > 928 und
  1248 > 1216). Das ist der gewollte Griff der Spalten über den Satzspiegel (`lg:-mx-8`, nur Innenabstand). Gegenprobe
  `a/skript/rand.mjs`: kein Text, keine Überschrift und kein Schnitt liegt außerhalb der Hülle.
- `lesbarkeit.mjs` lief zusätzlich (`a/mess/n/lesbarkeit/`). Der Rest von „rot“ ist vorbestehend: Gedankenstrich im aria-label
  „Cookies – Einstellungen verwalten“ auf allen Seiten, auch `/`; „Traumbad“ und „Perfektion“ in den geschützten H1.
- Seit der Nacharbeit misst `lesbarkeit.mjs` die 15 Zellen des Vergleichs mit: Jeder Wert steht als Absatz in seiner Zelle.
  Vorher standen die Werte nur in `dd`, das Werkzeug liest `p` und `li`. Die Werte vor der Nacharbeit (63,4 und „Glossar offen 0“
  auf /balkon-terrasse) ließen die Zellen aus.
- Gegenprobe mit einer Kopie des Werkzeugs, die zusätzlich `dd` liest (`a/skript/lesbarkeit-dd.mjs`, `a/mess/n/lesbarkeit-dd/`):
  gleiche Werte auf allen sieben Seiten.

| Seite | Flesch vorher (E3-Satz) | Flesch nachher | Satz max | Glossar offen |
|---|---|---|---|---|
| /balkon-terrasse | 71 | 60,5 (mit den Zellen) | 25 | 0 |
| /ueber-uns | 73,4 | 64,9 | 25 | 0 |
| /bad/badsanierung | 74,5 | 66,1 | 25 | 0 |
| /fliesen (Wissen, ≥ 50) | 67,5 | 60,9 | 25 | 0 |
| /standorte/wetzlar | 78,4 | 66,5 | 25 | 0 |
| /blog (Wissen, ≥ 50) | 68,1 | 63,3 | 25 | 0 |

- Alle Werte liegen über der Schwelle; /balkon-terrasse hat den kleinsten Abstand (0,5 Punkte). Die Zellen senken den Wert
  (ohne sie 63,4): Fachtexte im Wortlaut der Quelle mit langen Wörtern wie Abdichtungsebene, Belagsoberfläche oder
  wasserdurchlässig. Mehr Abstand ginge nur über den Wortlaut.

## Geänderte Dateien

1. `src/components/vorlagen/teile/Vergleich.tsx` (neu)
2. `src/components/vorlagen/teile/Versprechen.tsx` (neu)
3. `src/components/vorlagen/inhalt.ts`: Typen `VergleichInhalt` (Werte als `Markentext`), `VergleichSchnitt` und `VersprechenInhalt`; Felder `vergleich?` (Erzählseite) und `versprechen?` (Erzähl- und Wissensseite, damit auch Ort)
4. `src/components/vorlagen/ErzaehlSeite.tsx`: Vergleich und Slot `nachTun` nach „Was wir tun“; Versprechen nach Beleg und `nachBeleg`
5. `src/components/vorlagen/WissensSeite.tsx` und `OrtsSeite.tsx`: Versprechen nach dem Beleg
6. `src/components/ueber-uns/Werte.tsx`: neu gefasst; die E0-Datei war im HEAD unbenutzt; prüft Garantie-Wörter mit `GARANTIE` aus `Versprechen.tsx`
7. `src/app/(bestand)/ueber-uns/page.jsx`: `nachTun={<Werte inhalt={WERTE} />}`
8. `src/inhalte/balkon-terrasse.ts` (Vergleich, Versprechen), `ueber-uns.ts` (`WERTE` aus `values` mit `WERTE_ANPASSUNG` und Abgleich, Versprechen mit `erklaert`), `bad-badsanierung.ts`, `fliesen.ts`, `blog.ts`, `orte.ts` (je `versprechen: {}`)

- Nicht geändert: `src/config/company.js` (nur gelesen), Unterseiten von /balkon-terrasse, B-01, Formulare, Kundenstimmen,
  Rechtstexte, H1, gemeinsame Dateien (Designsystem, Bewegungsmodul, `kern/*`, `zusammen.tsx` nur importiert).
- `/` ist unverändert. Der Inhalt der Startseite setzt keines der neuen Felder; im HTML von `/` steht keine der Kennungen
  `vergleich`, `werte` oder `qualitaet`.

## Je Paket: umgesetzt wie

### EP1 · Vergleich der Aufbauten auf /balkon-terrasse

**Fundstelle des Wortlauts**
- `git log -S "Splittbett"`: eingeführt in 693ff2d6 (24.09.2026, „feat(balkon,naturstein): repurpose …“).
- Unverändert in 5a7a7b06, dem letzten Stand vor `relaunch(P0-ORCH-01)` 707a93d3, in `src/app/balkon-terrasse/page.jsx`:
  - `CONSTRUCTIONS` ab Zeile 62;
  - Abschnitt „Aufbauten im Vergleich: Stelzlager, Splittbett, gebunden“ Zeilen 190 bis 245, mit den Zeilen der Tabelle (Z. 219 bis 223) und dem Hinweis „Plattenstärke“ (Z. 239).
- Wortgleich in E0 c53faf4 `src/app/(bestand)/balkon-terrasse/page.jsx`, Zeilen 199 bis 235 (nach 2e5317f7 verschoben).
- Entfernt in 82a8286c (E3-BAU-06, Zwischenstand) ohne Entscheidung.

**Form**
- Eigener Abschnitt `#vergleich` auf Fliese nach „Was wir tun“ (formel `tun`), Kopf mittig.
- Je Bauweise ein Schnitt im Stil der Plan-Vignetten, gezeichnet mit `kern/vignetten/zeichnen` (Linie, Punkt, Schraffur, Pfeil; Strich 1,5 px, currentColor, Nebenlinien in `strich`, kein Rot, keine IDs, dekorativ):
  - Stelzlager über Abdichtung und Rohdecke: Regen in die offene Fuge, auf der Abdichtung im Gefälle ab;
  - Splittbett: Platten auf Splitt, Schotter-Unterbau, Erdreich; Regen versickert;
  - gebunden: Belag im Bett auf Abdichtung, Fugen geschlossen; Regen läuft oben ab.
- Gleicher Maßstab, so liest man die Aufbauhöhe ohne Zahl.
- Darunter Name (H3) und die fünf Kriterien als Beschreibungsliste an der Fuge.
- Ab lg drei gleich breite Spalten mit Fuge dazwischen. Schnitt, Name und jedes Kriterium sind über Subgrid je eine gemeinsame
  Zeile, die Werte fluchten quer wie in der alten Tabelle.
- Darunter Bauweise für Bauweise in der Lesebreite. Der Hinweis „Plattenstärke“ steht mit Tintenkante (wie der Hinweis im Ablauf).
- Keine neue Bibliothek, keine Bewegung.
- Die Spalten sind Gruppen (`div`), keine Liste. Als `li` zählte `lesbarkeit.mjs` jede Spalte als einen Satz von rund 50 Wörtern
  (Flesch auf /balkon-terrasse 56,6).
- Jeder Wert steht als Absatz (`p`) in seiner Zelle (`dd`), mit Textmarken. So misst `lesbarkeit.mjs` jede Zelle für sich mit
  (Nacharbeit). Gemessen in Bau n3: Flesch 60,5, Satz max 25, Glossar offen 0. Der Wert 63,4 aus Lauf 4 ließ die Zellen aus.

**Anpassungen am Wortlaut (K-011)**
- H2 „Drei Aufbauten im Vergleich.“ statt „Aufbauten im Vergleich: Stelzlager, Splittbett, gebunden“: K-010-F verbietet
  Überschriften „Begriff: Erklärung“. Das Stichwort „Aufbauten im Vergleich“ der Unterseiten bleibt.
- Einleitung: Komma statt Gedankenstrich.
- „2 cm starke Platten“ statt „2-cm-Platten“ (K-011 „Ersetzungen im Bestand“, mit geschütztem Leerzeichen).
- Hinweis: Punkt statt Gedankenstrich.
- Fachwörter beim ersten Vorkommen der Seite, und das liegt in den Zellen (Nacharbeit, K-011):
  - Feinsteinzeug erklärt in „Stelzlager, Platten“: „2 cm starke Platten aus Feinsteinzeug (Erklärung) oder geeignetem
    Naturstein“ statt „… (Feinsteinzeug oder geeigneter Naturstein)“, sonst stünde die Erklärung in einer zweiten Klammer.
  - Spalte „gebunden“ und Hinweis nennen Feinsteinzeug danach ohne Erklärung.
  - Mörtelbett (Glossar `duennbett`) erklärt in „Gebundene Verlegung, Aufbauhöhe“.
- Alle Zellen und Kriterien sonst wörtlich, auch „Revision“ (siehe offene Fragen).

**Brotkrumen der Unterseiten**
- Unverändert und wieder gültig: BreadcrumbList „Balkon und Terrasse“ → /balkon-terrasse.
- Ebenso „Aufbauten im Vergleich: Balkon & Terrasse“ und der Knopf „Aufbauten vergleichen“ auf `stelzlager`, `terrassenplatten` und `balkonsanierung`.
- jsonld grün auf beiden geprüften Unterseiten.

### EP2 · Werte-Block mit Vertrauensliste auf /ueber-uns

**Quelle**
- `values` in `src/config/company.js`, Zeilen 188 bis 195; Wortlaut seit vor dem Relaunch gleich (5a7a7b06), nur die Icons wechselten.
- In E0 ausgegeben von `components/ueber-uns/Werte.tsx`; die Überschrift „Unsere Werte im Handwerk“ stammt von dort.
- `WERTE` in `src/inhalte/ueber-uns.ts` liest Titel und Satz beim Bau aus `values` und hält nur die Anpassungen
  (`WERTE_ANPASSUNG`, je mit Grund); Baustein `Werte.tsx`. `values` ist damit wieder gelesen (vorher toter Export).
- Abgleich beim Bau wie bei `PUNKTE` (Nacharbeit): Weicht ein Titel der Quelle ab oder ein Satz, den die Tabelle ersetzt
  (`quelleSatz`), bricht der Bau ab. Ein Satz ohne Anpassung kommt unverändert aus `values`.

**Form**
- Eigener Abschnitt `#werte` (Kennungen `werte` und `werte-heading` wie in E0) auf Fliese nach „Was wir tun“ (Slot `nachTun`,
  formel `tun`).
- Eine Wand aus ungleichen Fliesen mit 1-px-Fugen, die Seiten offen:
  - Die Vertrauensliste mit HWK und DIN (belegt, F-05 und F-15) steht ab xl als zwei große Fliesen.
  - Die übrigen vier stehen als kleine Fliesen in einer Reihe darunter.
  - Bis xl zwei Spalten, mobil eine; bei t1024 wären vier Spalten zu schmal.
- Zeichen aus der eigenen Icon-Familie (haken, abdichtung, haus, uhr, grossformat, stern), Name als H3.
- Keine Bewegung. Kein gleichförmiges Kartenraster wie in E0 (drei gleiche Spalten).

**Garantie-Wörter (M-07) und K-011**

| Stelle | Quelle | Anzeige | Grund |
|---|---|---|---|
| Wert 3, Name | Staubschutz-Garantie | Staubschutz | M-07 |
| Wert 4, Name | Termintreue & Festpreis | Termintreue und fester Preis | M-07 wie Punkt 4 des Versprechens („fester Preis“ wie E-027); K-011 „und“ statt „&“ |
| Wert 4, Satz | Verbindliche Zeitpläne und klare Kosten ohne versteckte Aufschläge. | Abgestimmte Zeitpläne und klare Kosten. | M-07: ohne „verbindlich“ und ohne Zusage zu Aufschlägen, wie Punkt 4 (AGB § 2 Abs. 3) |
| Wert 5, Name | Großformat-Präzision | Präzision bei Großformaten | K-011 |
| Wert 5, Satz | XXL-Fliesen | große Fliesen | K-011 |

- Wert 5: Nivelliersystem mit Erklärung (erstes Vorkommen auf der Seite).
- Wert 6: Trennfuge in „Kunden·begeisterung“; der Satz ist das Motto, wörtlich aus `values` (gleich `COMPANY_DATA.motto`, F-19).
- Garantie-Wörter prüft `Werte.tsx` beim Bau mit demselben Muster wie das Qualitätsversprechen (Nacharbeit). So steht M-07 auf
  /ueber-uns in einer Linie: kein „Festpreis“, keine Zusage zu Zusatzkosten oder Aufschlägen.

### EP3 · Qualitätsversprechen auf sechs Hauptansichten

**Einbindung**
- Vorlagen-Teil `Versprechen.tsx`, eingeschaltet über `versprechen` im Inhalt (`inhalt.ts`).
- Auf /bad/badsanierung, /fliesen, /balkon-terrasse, /ueber-uns, /standorte/[stadt] (alle 13 über `orte.ts`) und /blog.
- Eigener Abschnitt `#qualitaet` (Überschrift `quality-promise-heading` wie E0 `QualityPromise`) auf Kalk zwischen
  Kundenstimmen und nächstem Schritt (beide Fliese); formel `beleg`.

**Wortlaut**
- Wird zur Bauzeit aus `COMPANY_DATA.qualityPromises` gelesen, `company.js` bleibt unverändert.
- Anpassungen stehen je Punkt mit Grund in `ANPASSUNG`.
- Schutz beim Bau:
  - Ändert sich ein Titel der Quelle, bricht der Bau ab.
  - Ebenso, wenn ein Text auf `/garant|verbindlich|festpreis|zusatzkosten|aufschl[aä]g|feste zusage/i` passt (`GARANTIE`,
    seit der Nacharbeit mit „festpreis“ ohne Bindestrich und „aufschläg“, und auch für die Werte auf /ueber-uns).

**Form**
- Nummerierte Liste (`ol`, Nummer in Mono als Marke, `aria-hidden`) an der Fuge im Halbverband: ab md zwei Spalten, jeder
  zweite Punkt eine halbe Zeile tiefer. Das ist der Versatz dieses Bildschirms, kein Kasten.
- Titel als H3 (font-text). Daneben tritt der Kopf des Leitfadens zurück (`data-kopf-pause="ganz"`, nie ein Kreuz neben einer H3).
- Die H3 trennen nur an Trennfugen (`TITEL_FUGEN` in `Versprechen.tsx`, nur Anzeige): Schadens·analyse, Millimeter·genaue,
  Großformat·verlegung, Norm·gerechte, Verbund·abdichtung, Bauzeiten·plan, Verlege·werkstoffe, Marken·kleber. Vorher trennte
  `hyphens-auto` falsch („Verbundab-dichtung“; Nacharbeit).
- Keine Bewegung.

**Fachwörter**
- Erklärt nur, was die Seite davor noch nicht erklärt.
- Die Vorlage liest die Textmarken des Inhalts davor (`fachwoerterIn`).
- /ueber-uns ergänzt `erklaert: ['nivelliersystem']`, weil die Werte (Slot außerhalb des Inhalts) es schon erklären.
- Ergebnis: Glossar offen 0 auf allen sechs Seiten; kein Satz über 25 Wörter mit den Erklärungen.

**Garantie-Wörter (M-07) und K-011**

| Punkt | Quelle | Anzeige | Grund |
|---|---|---|---|
| 1 Titel | Kostenfreies Vor-Ort-Aufmaß & Schadensanalyse | Kostenfreier Termin vor Ort und Schadensanalyse | K-011 |
| 2 Titel | Millimetergenaue Großformatverlegung (XXL) | … ohne „(XXL)“ | K-011 |
| 2 Satz | Vakuum-Heber; ein Satz | Vakuumheber; zwei Sätze | Bindestrich; mit Erklärungen sonst über 25 Wörter |
| 3 Satz | unverändert | unverändert | nur Glossar Dichtmanschette |
| 4 Titel | Verbindliche Festpreis-Kalkulation | Kalkulation mit festem Preis | M-07 |
| 4 Satz | … ohne unvorhergesehene Zusatzkosten | ohne diesen Satzteil | M-07, Zusage gegen AGB § 2 Abs. 3 |
| 5 Titel | Verlässliche Termintreue & Bauzeitenplan | … und … | K-011 |
| 5 Satz | Feste Zusagen für Baustart und Fertigstellung – damit … | Wir stimmen Baustart und Fertigstellung mit Ihnen ab, damit Ihr Alltag planbar bleibt. | M-07; ohne Gedankenstrich |
| 6 Titel | Garantierter Staubschutz bei Sanierungen | Staubschutz bei Sanierungen | M-07 |
| 7 Titel | Hochwertige Verlegewerkstoffe & Markenkleber | … und … | K-011 |
| 7 Satz | C2-TE-S1/S2 Fliesenkleber, Premium-Fugenmassen | Fliesenkleber der Klasse C2TE S1 (erklärt) oder S2, Premiumfugenmassen | Bindestrich; Schreibweise des Glossars |
| 8 | unverändert | unverändert | – |

- Glossar in den Sätzen 1, 2, 3 und 7: Untergrund, Nivelliersystem, Überzähne, Dichtmanschette, C2TE S1.
- Abschnittsüberschrift „Unser Qualitäts·versprechen in acht Punkten.“ statt „Unser 8-Punkte-Qualitätsversprechen für Ihr
  Fliesenprojekt“: ohne Bindestrichwörter; Trennfuge für 200 % Schrift.
- Etikett „Garantierter Standard“ und Einleitung („Wir stehen zu unseren … Preisen und Terminen –“) aus E0 entfallen (M-07,
  Gedankenstrich).
- Kein Garantie-Wort im sichtbaren Text der sechs Seiten (Suche im HTML, Bau n3). Das strengere Muster `GARANTIE` trifft in den
  neuen Abschnitten nichts; auf /bad/badsanierung trifft es nur Vorbestehendes: H1 „zum Festpreis“ (geschützt),
  „Festpreisangebot, also ein Angebot mit festem Preis“ (E-027) und „unverbindlich“ im Formular, auf `/` ebenso im Formular.

## Gestaltung und Bewegung

**Flächenfolge**
- /balkon-terrasse: Lage (Kalk), Tun (Kalk), Vergleich (Fliese), Ablauf (Fliese), Fotos (Kalk), Stimmen (Fliese), Versprechen
  (Kalk), nächster Schritt (Fliese).
- /ueber-uns ebenso, mit Werte (Fliese) an der Stelle des Vergleichs.

**Formen**
- Je Inhalt ein eigener, ruhiger Abschnitt mit eigener Form: Planblatt mit Schnitten; ungleiche Fliesenwand; nummerierte Liste im Halbverband.
- Keine davon ist eine gleichförmige Kartenreihe.
- Keine zwei gleich gebauten Abschnitte in Folge.

**Bewegung**
- Keine neue Bewegung, keine neue Kennung, kein neuer Keyframe.
- E-092 ist damit nicht berührt; bewegung.mjs zeigt keinen Befund.
- Leitfaden und Kantenkreuze kommen unverändert aus `Abschnitt`.

**Angleichungen nach Durchsicht im Bau**
- Spalten des Vergleichs gleich breit (vorher war die mittlere schmaler).
- Körnung im Splittbett lässt dem Pfeil eine Gasse.
- Werte erst ab xl in vier Spalten.
- „C2TE S1“ bricht nicht um.
- Bei 200 % Schrift liefen „Großformatverlegung“ (H3) und „Qualitätsversprechen“ (H2) über den Rand. Abhilfe: Trennfugen in
  Titeln und H2 (seit der Nacharbeit auch in den H3 statt automatischer Trennung); danach 0 Überlauf in den drei Abschnitten.

## Bilder (PNG, Produktionsbau n3 auf 4400, `installSperre`, Einwilligung „abgelehnt“, Kopf und untere Leiste für die Aufnahme ausgeblendet)

- Ordner: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/inhalt/a/bild/r6/` (236 Bilder).
- Unterordner `m390/`, `t1024/`, `d1440/`, `m360-200/` und `m390-200/` (mit 200 % Schrift).
- Je Abschnitt `<seite>-<kennung>.png` (Element) und `-umfeld.png` (160 px Übergang zu den Nachbarn), zum Beispiel:
  - `d1440/balkon-terrasse-vergleich.png`, `t1024/balkon-terrasse-vergleich.png`, `m390/balkon-terrasse-vergleich.png`
  - `d1440/ueber-uns-werte.png`, `t1024/ueber-uns-werte.png`, `m390/ueber-uns-werte.png`
  - `d1440/standorte__wetzlar-qualitaet.png`, `m390/fliesen-qualitaet.png`, `m390-200/fliesen-qualitaet.png`
- Bei 200 % zusätzlich Viewport-Streifen je Abschnitt (`-streifen-<n>.png`, Abschnitt oben am Rand, dann je Bildschirmhöhe
  weiter), zum Beispiel `m390-200/ueber-uns-qualitaet-streifen-2.png` (Punkte 2 und 3 mit den Trennfugen der H3).
- Berichte: `bericht.json` (18 Läufe) und `bericht-200.json` (12 Läufe), je mit Überlauf und Textüberlauf.
- Nacharbeit: Die 200-%-Bilder in r5 waren zum Teil leer (hohe Elemente, `content-visibility: auto` zeichnete außerhalb des
  Bildschirms nicht). `abschnitte.mjs` setzt die späten Hüllen vor der Aufnahme auf `visible` (wie `lesbarkeit.mjs`). Pixelprüfung
  aller 236 Bilder in r6: keines leer, längste leere Strecke in einem Elementbild 248 px (Abstand zwischen zwei Bauweisen bei 200 %). r5 ist gelöscht (alter Bau, leere Bilder).

## Nacharbeit nach der Prüfung (9 Befunde, alle selbst nachgeprüft und bestätigt)

| Nr. | Schwere | Befund | Nachprüfung | Umgesetzt |
|---|---|---|---|---|
| 1 | mittel | Feinsteinzeug zuerst in einer Zelle ohne Erklärung, erklärt erst im Hinweis | Quelltext: Werte als einfache Zeichenkette, Textmarke nur im Hinweis | Werte als `Markentext`, Zellen mit `Textmarken`; Erklärung in „Stelzlager, Platten“, Hinweis ohne zweite Erklärung |
| 2 | gering | H3 im Versprechen mit `hyphens-auto`, „Verbundab-dichtung“ | Klasse in `Versprechen.tsx` Z. 150 | `hyphens-auto` entfernt, Trennfugen `TITEL_FUGEN`; Bild `a/bild/r6/m390-200/ueber-uns-qualitaet-streifen-2.png` |
| 3 | gering | 200-%-Bilder leer | r5 `m390-200/ueber-uns-werte.png`: 16 dunkle Pixel (jedes zweite gezählt), jetzt rund 18 000 | `abschnitte.mjs` zeichnet späte Hüllen vor der Aufnahme, dazu Viewport-Streifen; r6 neu, r5 gelöscht |
| 4 | gering | Plattenstärke gegen E-027 und K-011 nicht in der Notiz | E-027 Z. 183 gelesen | Offene Frage 8, Wortlaut belassen |
| 5 | gering | Zusage zu Kosten auf /ueber-uns uneinheitlich | `values` Wert 4 gegen Punkt 4 | mit Nr. 6 |
| 6 | mittel | M-07 uneinheitlich: Wert 4 mit „Festpreis“ und „ohne versteckte Aufschläge“ | gebautes HTML /ueber-uns | Wert 4 „Termintreue und fester Preis“, „Abgestimmte Zeitpläne und klare Kosten.“; `GARANTIE` mit „festpreis“ und „aufschläg“, gilt auch für die Werte |
| 7 | mittel | `lesbarkeit.mjs` misst die Zellen nicht; Mörtelbett nie erklärt | `lesbarkeit.mjs` liest `p, li`; in Bau n2 meldete es Feinsteinzeug im Hinweis, die `dd`-Kopie nicht | Mörtelbett mit Glossar `duennbett`; jeder Wert als Absatz in der Zelle, jetzt gemessen: Flesch 60,5, Glossar offen 0 (Werkzeug und `dd`-Kopie gleich) |
| 8 | gering | Werte von Hand abgeschrieben, kein Abgleich mit `values` | kein Import von `values` in `src` | `WERTE` aus `values` mit `WERTE_ANPASSUNG`, Abbruch beim Bau bei Abweichung |
| 9 | gering | 200-%-Bilder von /ueber-uns leer | wie Nr. 3 | wie Nr. 3 |

- Prüfzahlen danach neu erhoben (Tabelle oben). Geändert in der Nacharbeit: `Vergleich.tsx`, `Versprechen.tsx`, `inhalt.ts`,
  `Werte.tsx`, `balkon-terrasse.ts`, `ueber-uns.ts`; dazu die eigenen Skripte `a/skript/abschnitte.mjs`, `kette-n.sh`,
  `lesbarkeit-dd.mjs` und `rand.mjs`.
- Wortlaut neu gegenüber Lauf 4: „aus Feinsteinzeug oder geeignetem Naturstein“ (statt Klammer), Wert 4 Name und Satz. Sonst nur
  Erklärungen und Trennfugen.

## Offene Fragen

1. **„Revision“ und „Mörtelbett“ im Vergleich.** „Revision“ steht wörtlich aus der Quelle, ist ein Fachwort und hat keinen
   Glossar-Eintrag (`glossar.ts` gehört nicht zum Paket). Vorschlag für TEXTVORSCHLAEGE.md: „Später zugänglich“.
   - „Mörtelbett“ steht seit der Nacharbeit mit der Glossarerklärung von `duennbett` („wie dick die Kleberschicht unter der
     Fliese ist: dünn, mittel oder dick“). Sie passt nur halb zum Satz. Vorschlag: „Gering, Belag fest im Kleber oder Mörtel auf
     der Abdichtung“ (ohne Fachwort).
2. **Länge auf dem Handy.** Der Vergleich ist auf m390 rund 3 100 px hoch: drei Bauweisen × fünf Kriterien, Wortlaut der Quelle.
   Kürzen ginge nur über den Wortlaut, das ist eine Textentscheidung.
3. **M-07, nach einer Antwort des Auftraggebers.** Dann sind `ANPASSUNG` in `Versprechen.tsx` und `WERTE_ANPASSUNG` (Werte 3 und 4)
   in `ueber-uns.ts` nachzuführen; die Bauprüfung auf Garantie-Wörter (`GARANTIE`, für Punkte und Werte) ist dann zu lockern.
   - Beide Stellen auf /ueber-uns stehen seit der Nacharbeit in einer Linie: Punkt 4 „Kalkulation mit festem Preis“ ohne
     „ohne unvorhergesehene Zusatzkosten“, Wert 4 „Termintreue und fester Preis“ ohne „ohne versteckte Aufschläge“. Bestätigt der
     Auftraggeber die Kostenzusage, kommen beide zurück; sonst bleiben beide draußen.
   - Vorbestehend und nicht Teil dieses Pakets: Der JSON-LD-Knoten der Ortsseiten (`schemaPyramid`, Angebot) sagt
     „verbindliches Festpreisangebot“.
   - `QualityPromise.jsx` auf /team, /downloads, /bad/badanfrage, /bad/projekt-check und /bad/bad-aus-einer-hand trägt
     weiter „Garantierter Standard“ (M-23).
4. **Motto auf /ueber-uns.** Es steht jetzt dreimal: Einleitung der Stimmen, Wert „Kundenbegeisterung“ (wörtlich aus `values`)
   und Abschluss der Firmengeschichte. Behalten wegen der vollständigen Rückführung (E0 hatte es ebenso mehrfach). Kürzen
   wäre eine Entscheidung des Orchestrators.
5. **Glossar in Überschriften.** Auf /fliesen stehen „Verbundabdichtung“ und „DIN 18534“ nur im Titel von Punkt 3. Überschriften
   erklären im Projekt nicht; das Werkzeug zählt sie nicht. Soll der Satz von Punkt 3 dort die Erklärung tragen?
6. **Unterseiten.** Die Links „Aufbauten im Vergleich“ könnten auf `/balkon-terrasse#vergleich` zeigen (Sprung direkt in den
   Abschnitt). Nicht geändert, weil die Unterseiten nicht zum Paket gehören.
7. **Test der Logik.** Für `PUNKTE`, `WERTE` und `fachwoerterIn` gibt es keine Testdatei, weil das Briefing keine nennt. Abgleich
   und Garantie-Prüfung laufen beim Bau. Ein Test `test/versprechen.test.mjs` wäre klein, wenn der Orchestrator ihn freigibt.
8. **Plattenstärke (E-027, K-011).** Vergleich und Hinweis führen „2 cm starke Platten“ (zwei Zellen und Hinweis), „dickere
   Terrassenplatten“ und „in üblicher Stärke“ aus dem Wortlaut der Quelle wieder ein.
   - E-027 (ENTSCHEIDUNGEN Z. 183) ließ die Plattenstärke für die neuen Seitentexte als nicht belegt draußen; K-011 erlaubt Zahlen
     nur aus K-015, und F-01 bis F-28 nennen keine Plattenstärke.
   - Gedeckt durch die Vorgabe „Wortlaut aus der Quelle“ (Briefing EP1); Wortlaut geprüft gegen 5a7a7b06 und E0 c53faf4.
   - Bitte bestätigen oder streichen. Der Wortlaut bleibt vorerst. Ohne Zahl hieße die Zelle zum Beispiel „Feste, tragfähige
     Platten aus Feinsteinzeug …“, der Hinweis entfiele oder spräche nur von „stärkeren Platten“.
9. **`lesbarkeit.mjs` und `dd`.** Das Werkzeug liest weiter nur `p` und `li`. Der Vergleich ist jetzt gemessen, weil jeder Wert als
   Absatz in seiner Zelle steht. Andere Beschreibungslisten im Bestand bleiben ungemessen; ob das Werkzeug `dd` mitlesen soll,
   entscheidet der Orchestrator (gemeinsame Datei). Die Kopie `a/skript/lesbarkeit-dd.mjs` zeigt den Unterschied (eine Zeile).
