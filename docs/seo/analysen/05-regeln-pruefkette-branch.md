# Analyse: Regeln, Prüfkette, Branch-Lage

> Momentaufnahme vom 01.11.2026 (Code-Stand `main` f19ebba, Werkstatt-Branch 40 Commits voraus). Erstellt als Grundlage für [`docs/seo/KONTEXT.md`](../KONTEXT.md); bei Abweichungen gilt `KONTEXT.md`, das nach einer unabhängigen Gegenprüfung korrigiert wurde. Zeilennummern können sich mit späteren Commits verschieben. Hinweise auf damals noch fehlende Dateien im Bildordner (`bildinventar`, `projekte.md`, `KONTEXT.md`, Platzhalter im README) sind mit dem Commit der Bilder erledigt. `B/` = `src/app/(bestand)/`.

Pfadschlüssel: `KERN.md`, `AUFTRAG.md`, `ENTSCHEIDUNGEN.md`, `MENSCHEN.md`, `STATUS.md`, `PRUEFPUNKT.md`, `ABNAHME.md`, `TEXTVORSCHLAEGE.md` und `HAUPTANSICHTEN.json` liegen unter `_werkstatt/`. „(Branch)“ meint die Fassung auf `claude/tezgel-website-redesign-iqxt8z`, alles andere main f19ebba9. „Bilder-README“ meint `_werkstatt/bilder/neue-bilder-2026-10-31/README.md`, die Datei ist noch nicht versioniert.

## 1. Text- und Stilregeln

**Rangfolge:** Grenzen und Leitplanken gehen vor Bestand, Zugänglichkeit, Abnahme, Vorhaben und KERN (`AUFTRAG.md:75`). KERN v4.4.1 ist die Quelle der Wahrheit (`KERN.md:3`). Der Branch ändert dort nur Gestaltungsregeln (Diff main gegen Branch).

- **Texthoheit:** Die Werkstatt ändert nur Mikrotexte. Die Texte des Vorlaufs gelten als abgenommener Bestand (`AUFTRAG.md:16`, `KERN.md:282`). Empfehlung: Jede SEO-Textänderung mit altem Text, neuem Text und Grund protokollieren.
- **Ton:** Sie-Anrede, wir-Form, kurze Sätze, konkrete Dinge (`KERN.md:276`). Offen ist nur die du-Anrede auf `/karriere/ausbildung` (`ENTSCHEIDUNGEN.md:423`).
- **Mikrotexte:** Jede Seite hat genau eine Hauptaktion. Feste Beschriftungen: „Termin vor Ort anfragen“, „Nachricht per WhatsApp“, „Anfrage senden“ (`KERN.md:63`, `:281`).
- **Striche:** kein Gedankenstrich und kein „ - “ in Text, Alt-Text, Titel, Beschreibung oder Bedienbeschriftung. Zeitspannen schreibt man mit „bis“ (`KERN.md:277`).
- **Bindestrichwörter:** nur die Wörter aus `_werkstatt/regeln/bindestrich-erlaubt.json:3-51`, zum Beispiel Lahn-Dill-Kreis, Gäste-WC, DIN 18040-2. „Walk-in-Dusche“ ist nur dort erlaubt, wo es der Suchbegriff der Seite ist.
- **„&“:** in Titeln erlaubt, in Beschreibungen und Fließtext nicht (`ENTSCHEIDUNGEN.md:430`, `test/meta.test.mjs:21`).
- **Floskeln:** Verboten ist die Liste in `_werkstatt/regeln/floskeln.json:3-58`, darunter nahtlos, maßgeschneidert, „Entdecken Sie“, „Ihr Partner für“, Perfektion, perfekt, Traumbad, „nicht nur … sondern auch“, Stakkato und Überschriften nach dem Muster „Begriff: Erklärung“. Emojis sind ebenfalls ausgeschlossen (`AUFTRAG.md:141-142`).
  - Ausnahmen sind nur zwei H1, beide Wortlaut des Auftraggebers und UNANTASTBAR (`STATUS.md:17`): „Perfektion auf jedem Quadratmeter.“ (`src/inhalte/start.ts:21`) und „Ihr neues Traumbad zum Festpreis.“ (`src/inhalte/bad-badsanierung.ts:23`).
- **Ersetzungen** (`KERN.md:280`):
  - „Vor-Ort-Aufmaß“ wird „Termin bei Ihnen vor Ort“.
  - „Walk-In-Dusche“ wird „bodengleiche Dusche“, außer wo es der Suchbegriff ist.
  - „XXL-Fliesen“ wird „große Fliesen“.
- **Glossar:** Ein Glossarwort braucht beim ersten Vorkommen je Seite eine Erklärung mit höchstens 15 Wörtern, gesetzt als Textmarke `[[id|Wort]]` (`KERN.md:61`, `:277`, `:291`). Auch „bodengleiche Dusche“ ist ein Glossarwort (`KERN.md:300`). Eine unbekannte Kennung löst einen Fehler aus (`test/textmarken.test.mjs:26-28`).
- **Lesbarkeit** (`KERN.md:277`, `_werkstatt/werkzeuge/lesbarkeit.mjs:28-30`):
  - Flesch mindestens 60 auf Erzähl- und Ortsseiten, mindestens 50 auf Wissensseiten.
  - Sätze im Schnitt höchstens 14 Wörter, kein Satz über 25 Wörter.
  - Absätze höchstens 4 Sätze.
- **Längen:**
  - Titel: KERN erlaubt 60 Zeichen, die Tests 58. In der Praxis 47 bis 58 Zeichen mit „Tezgel“ (`ENTSCHEIDUNGEN.md:429`).
  - Beschreibung: 120 bis 155 Zeichen, ohne „…“, „ – “, „&“ und „!“ (`test/meta.test.mjs:18-23`).
  - Alt-Text: höchstens 125 Zeichen (`KERN.md:158`).
  - Galerie-Unterschrift: höchstens 80 Zeichen, ohne Fachwort (`test/galerie-filter.test.mjs:42-48`).
- **Überschriften:** genau eine H1 je Seite (`KERN.md:70`). Sie steht in Alltagssprache, umfasst ein bis zwei Sätze und eröffnet die Seitenformel aus sechs Teilen (`KERN.md:262`).
- **Fakten und Zahlen:** nur aus dem Faktenblatt (`KERN.md:342-375`). Vor Einheiten steht ein geschütztes Leerzeichen (`KERN.md:152`).
  - Verboten (`KERN.md:375`): „Meisterbetrieb“, Zahl der Mitarbeiter, „über 15 Jahre“, Zertifikate, Partnerstatus, Projektorte zu Fotos, Dauer einer Badsanierung.
  - Erlaubt sind „eingetragener Fachbetrieb“ und „Mittelhessen“ (`KERN.md:372`).
  - Versprechen werden nie verschärft (`KERN.md:373`).
- **Orte:** Alle 13 Ortsseiten entstehen aus einer Vorlage (`src/inhalte/orte.ts:38-40`). Sie dürfen sich „nur durch echte Angaben“ unterscheiden (`KERN.md:277`). Die Entfernung lautet „etwa X km bis <Ort>.“ (`test/orte.test.mjs:54-62`). Im Text steht „Aßlar“, der Slug ist `asslar` (`src/config/cities.ts:109`).
- **Suchbegriffe:** Die Begriffe aus Titel, H1 und Beschreibung in `_werkstatt/adressen-e0.csv` bleiben natürlich im Text (`KERN.md:71`, `:277`). Fachtext für Suchmaschinen steht weiter unten unter „Mehr erfahren“ oder auf Unterseiten (`KERN.md:47`).
- **Bilder:** nur echte Fotos, bearbeitet mit `werkzeuge/bilder.mjs`. Metadaten werden entfernt, es wird nie hochskaliert, Personen, Hausnummern, Kennzeichen und fremde Logos werden entfernt (`KERN.md:155-157`).
  - Ablage unter `public/images/arbeiten/<raum>/`, Daten in `src/config/arbeiten.ts`, Einbau nur über `Bildfeld` (`KERN.md:60`).
  - Der Alt-Text nennt nur, was zu sehen ist (`ENTSCHEIDUNGEN.md:494`).

**Kollisionen mit SEO**

| Regel | Konflikt | Weg (Empfehlung) |
|---|---|---|
| Suchbegriffe aus E0 bleiben; `/` trägt im Titel „Fliesenleger Aßlar und Wetzlar …“ (`src/inhalte/start.ts:14`) | Die Startseite soll Wetzlar abgeben | Entscheidung dokumentieren; der Begriff zieht auf die Wetzlar-Seite um |
| H1 A-1 ist unantastbar | Gewünschte H1 mit Marke und Aßlar | H1 lassen; Begriff in Ortszeile „… aus Aßlar“ (`ENTSCHEIDUNGEN.md:366`), Titel und H2; sonst Freigabe |
| Kein erfundener Ort im Alt-Text | Ortsname im Alt-Text | Motiv und Material ins Alt; Ort erst nach Bestätigung; Ortsbezug im Seitentext |
| Ortsseiten nur mit echten Unterschieden | Eigenständige Wetzlar-Seite | Echte Belege: bestätigte Baustellen, Kundenstimmen, Antworten aus dem Fragebogen |
| Ruhe, wenig Text | Inhaltstiefe | Aufklapper „Mehr erfahren“ (`details`); der Inhalt bleibt im DOM (`ENTSCHEIDUNGEN.md:1704`) |
| Firmendaten nur auf Kontakt, Über uns und im Fuß (`KERN.md:47`) | Vertrauenssignale | Der Fuß trägt Name, Adresse, Telefon; dazu Link auf `/ueber-uns` |
| „Meisterbetrieb“ verboten | Gängiger Suchbegriff | „Fachbetrieb“ verwenden |
| „Walk-in-Dusche“ nur als Suchbegriff | Suchvolumen | Eine Zielseite mit diesem Begriff, sonst „bodengleiche Dusche“ |

## 2. Prüfkette

**Voraussetzungen:**
- Node 24.x (`.nvmrc:1`, `package.json:5-7`) und npm 11.19.1 (`package.json:8`), installiert mit `npm ci`.
- Install-Skripte sind nur für `unrs-resolver` freigegeben (`package.json:50-52`).
- Im lokalen Klon fehlen die `node_modules`.
- Vor Code mit Next-Schnittstellen die Doku in `node_modules/next/dist/docs/` lesen (`AGENTS.md:5`).

| Befehl | Inhalt | Dauer (Cloud, `EINRICHTUNG.md:63`) |
|---|---|---|
| `npm run build` | next build | 45 s |
| `npm run typecheck` | `tsc --noEmit` | 12 s |
| `npm run lint` | eslint, ohne `_werkstatt` und `_relaunch` (`eslint.config.mjs:17-19`) | 27 s |
| `npm test` | 31 Dateien, einzeln aufgezählt (`package.json:14`); auf dem Branch 280 Tests, 1 übersprungen (`PRUEFPUNKT.md:3` Branch) | – |
| `npm run qa:graph` | prüft Zeichenketten im Schema (`scripts/qa/check-graph.mjs:37-48`) | – |

- `test/stylesheets.test.mjs:56` läuft nur nach einem Build.
- Eine neue Testdatei läuft erst, wenn sie in `package.json:14` eingetragen ist.
- Die CI (`.github/workflows/security.yml:3-29`) läuft nur bei einem PR auf main oder von Hand. Sie macht Audit und Lint, **aber keinen Build und keine Tests**.
- **Werkstatt-Werkzeuge:** Sie brauchen ein eigenes `npm ci`, Playwright und Chromium. Die Pfade sind fest auf `/home/user/tezgel` und `/opt/pw-browsers` gesetzt (`EINRICHTUNG.md:11`, `:43`, `:59`).
  - Werkzeuge: `meta.mjs`, `lesbarkeit.mjs`, `jsonld.mjs`, `adressen.mjs`, `texte-vergleich.mjs`, `bilder.mjs` (`EINRICHTUNG.md:113-150`).
  - Die Funktionssuite hat 398 Fälle und läuft zweimal (`EINRICHTUNG.md:198-202`).
  - Prüfstufen A bis C stehen in `AUFTRAG.md:264-266`; das Budget verlangt Lighthouse SEO 100 (`KERN.md:286`).

**Welche Tests bei welcher Änderung anschlagen:**
- **Titel und Meta:**
  - `test/titleLength.test.mjs:7-71`: Titel höchstens 58 Zeichen; robots-Angaben werden durchgereicht.
  - `test/meta.test.mjs:14-48`: Beschreibungen in `src/inhalte/meta/*`.
  - `test/meta.test.mjs:66-124`: Service-Knoten.
  - `test/meta.test.mjs:149-154`: Einwilligungssatz in `LeadQuickForm`.
  - `test/orte.test.mjs:30-43`: Titel, Beschreibungen und Textmarken der Ortsseiten.
- **Text:** `test/glossar.test.mjs`, `test/textmarken.test.mjs`, `test/blogKategorien.test.mjs:8-11`, `test/seitenformel-folgen.test.mjs:13-24`.
- **Bilder:**
  - `test/galerie-filter.test.mjs:19-48`: nur Fotos aus `ARBEITEN`, Format 4:5, Regeln für Unterschriften.
  - `test/orte.test.mjs:45-52`: drei Fotos je Ort.
  - Auf dem Branch zusätzlich „Orte 7“: höchstens drei verschiedene Aufmacherfotos über alle Orte.
- **Adressen:**
  - `test/wege.test.mjs:73-97`: genaue Liste der 308-Weiterleitungen.
  - `test/navigation.test.mjs:7-21`: Sprungziele `#termin`, `#express-anfrage`, `#anfrage`.
- **Formulare:** `test/email-pipeline.test.mjs:153-176` und `:327`, dazu die Specs `funktion-hero-kontakt`, `-schnellanfrage` und `-express-funnel` (`_werkstatt/werkzeuge/test-zuordnung.json`).
- **Titel werden im Code umgeschrieben:** `src/lib/metadata.ts:17-110` lässt Titel mit 45 bis 58 Zeichen und „Tezgel“ unverändert (`:21`). Alle anderen Titel werden aufgefüllt oder gekürzt (`:62-97`).

## 3. Deploy und Branches

**Fakten:**
- **Produktion:** main ist Produktion. `vercel.json:4-6` schaltet Vercel-Builds nur für den Werkstatt-Branch ab. Der Auftraggeber hat die Kosten von Vorschau-Builds je Push beanstandet (`ENTSCHEIDUNGEN.md:364-365`). `_werkstatt` und `_relaunch` werden nicht ausgeliefert (`.vercelignore:1-2`).
- **Push-Regel:** Der WERKSTATT-Block erlaubt Push nur auf den Werkstatt-Branch, nie auf main (`CLAUDE.md:7`).
  - Auf Anweisung wurde trotzdem mehrfach auf main geschoben (zum Beispiel `STATUS.md:197-198`).
  - Jeder Push auf main braucht eine neue Anweisung (`ENTSCHEIDUNGEN.md:359`).
  - Ein Push ohne ausdrückliches „live“ wurde abgelehnt (`ENTSCHEIDUNGEN.md:1796` Branch).
- **Stand des Werkstatt-Laufs** (laut gh compare): Der Branch ist 40 Commits vor main und 0 dahinter, letzter Commit am 01.11. um 14:07 UTC.
  - Tor E4 wurde zweimal verfehlt. Die letzte Nacharbeit ist eingespielt, die volle Prüfkette läuft gerade.
  - Danach folgen E-114, E5 (C, BLIND, END, GAL, BER, KONT) und die Endabnahme. Dann geht der Stand „einmal Fast-Forward auf main“ (`PRUEFPUNKT.md:3` Branch).
  - Dieser Fast-Forward kommt ohne weitere Rückfrage. Bedingung ist „main ist Vorfahr von HEAD“ (`ENTSCHEIDUNGEN.md:1723` Branch).
  - Frühere Hotfixes auf main wurden in den Branch zurückgemischt (`ENTSCHEIDUNGEN.md:1753` Branch).
  - Maßnahmen an Texten und Formularen hat die Werkstatt bewusst abgelehnt (`STATUS.md:219` Branch).
  - Eine Routine setzt den Lauf stündlich fort (`PRUEFPUNKT.md:18`).
  - Die Fassungen von `STATUS.md` und `PRUEFPUNKT.md` auf main sind veraltet (Stand 31.10., 11:27).
- **Dateien, die die Werkstatt anfasst:**
  - `src/inhalte/{start,orte,kontakt,galerie,…}.ts` und `src/components/{vorlagen,kern,momente}/**`.
  - Seiten `standorte/[stadt]/page.tsx` und `kontakt/page.jsx`.
  - Formularteile `TezgelAnfrageFunnel/Schritt1.jsx`, `FinalCTA.tsx`, `DirectContactCard.tsx`.
  - `globals.css`.
  - Tests orte, galerie-filter, intro und seitenformel.
- **Dateien, die sie nicht anfasst:**
  - `src/lib/metadata.ts`, `src/inhalte/meta/*`, `src/lib/schema.ts`, `src/app/sitemap.ts`, `next.config.ts`.
  - `src/config/*` und `public/images/**`.
  - HeroContactForm, LeadQuickForm und `/api`.
- **Endabnahme:** `/standorte/wetzlar` ist eine der Hauptansichten mit Schwelle 8,0 (`HAUPTANSICHTEN.json:26`, `ENTSCHEIDUNGEN.md:1702`). Kriterium Z-02 verlangt alle 202 Adressen im Status aus E0 (`ABNAHME.md:15` Branch).
- **Altlasten:**
  - `_relaunch` ist veraltet, letzter Eintrag am 12.10. (`_relaunch/STATUS.md:60`, `ENTSCHEIDUNGEN.md:9`).
  - Der Branch `claude/amazing-mendel-b0g40w` ist veraltet (`ENTSCHEIDUNGEN.md:6`).
  - Was `claude/kind-franklin-5y6s1d` ist, ist unbekannt.

**Empfehlung (nicht beschlossen):**
1. Die SEO-Runde arbeitet auf einem eigenen Branch von main, etwa `seo/lokal`. Vorher klären, ob `vercel.json` ihn von Vorschau-Builds ausnimmt.
2. Sofort und ohne Überschneidung mit der Werkstatt möglich:
   - Recherche.
   - Webfassungen der neuen Fotos samt Einträgen in `src/config/arbeiten.ts`.
   - Änderungen in `src/inhalte/meta/*`, `metadata.ts`, `schema.ts` und `sitemap.ts`.
   - Dokumentation unter `docs/seo/`.
3. Erst nach dem Fast-Forward der Werkstatt oder mit einer abgesprochenen Dateisperre: Ortsseiten, Inhalt der Startseite, Formulare und Galerie samt ihren Tests.
4. Nach main nur mit ausdrücklicher „live“-Freigabe und nach voller Prüfkette. Danach die Werkstatt informieren, damit sie main zurückmischt.
5. Nie auf den Werkstatt-Branch pushen. `_werkstatt/` nur lesen, außer dem neuen Bilderordner.

## 4. Offene Punkte für Menschen (SEO)

- **Google-Unternehmensprofil:** Es gibt dazu keinen Eintrag in `MENSCHEN.md`. Das ist eine Lücke.
- **Bewertungen:** Google 5,0 bei 27 Bewertungen, Trustlocal 9,6 bei 25, Stand September 2026 (M-02, `MENSCHEN.md:15`). Die Zahlen kommen nur aus `src/config/reviews.js` (`KERN.md:70`). Gekürzte Kundenstimmen sind offen (UM-13, `MENSCHEN.md:81`).
- **Search Console:** Der Export der alten Adressen ist offen (`_relaunch/MENSCHEN.md:14`).
- **Fotos:**
  - Ort der Baustellen (`MENSCHEN.md:59`, Bilder-README `:34`).
  - Herkunft einzelner Fotos (M-08, `:22`) und Einverständnis des Mitarbeiters (M-17, `:24`).
  - Es fehlen Fotos von Küche und Flur (M-25, `:33`), Nahaufnahmen (UM-12, `:80`) und ein scharfes Fischgrät-Foto (UM-14, `:82`).
  - Die Originale liegen in der öffentlichen Git-Historie (M-01, `:7-10`).
  - Über die Mosaike nb-113 bis nb-116 entscheidet der Inhaber (Bilder-README `:36`).
- **Ausstellung:** M-22 ist offen (`MENSCHEN.md:30`). Das Faktenblatt kennt nur eine Beratung ohne Adresse (`KERN.md:362`).
- **Einsatzgebiet:** M-04 fragt nach Bezugspunkt, Radius und „Mittelhessen“ oder „ganz Hessen“ (`MENSCHEN.md:17-18`). Ehringshausen, Hüttenberg und Lahnau haben keine eigene Seite. Dazu M-26, Karte auf den Ortsseiten (`:34`).
- **Recht und Formulare:** Einwilligung M-11 (`:40`), Cookie-Inventar M-13 (`:42`), Vorauswahl M-24 (`:32`), Versprechen M-07 (`:21`), Öffnungszeiten M-03 (`:16`).
- **Aktualität:** Datum der Ratgeber M-27 (`:35`), Datum der Stellenanzeige UM-10 (`:74`).
- **Domains:** tezgel.de leitet per 308 auf www.tezgel.de (`ENTSCHEIDUNGEN.md:1731` Branch), siehe auch `src/lib/schema.ts:11`. Eine offene Frage gibt es dazu nicht.
- **Textvorschläge:** T-A1 bis T-A3 (`TEXTVORSCHLAEGE.md:11-13`) und T-C1-2 (`:29` Branch) würden „Fliesenverlegung Tezgel“ beziehungsweise „Fliesenleger“ aus der Ortszeile nehmen.

## 5. G-Regeln (`AUFTRAG.md:57-65`)

| Regel | Inhalt | Für die SEO-Runde |
|---|---|---|
| G1 | Nur in diesem Repository arbeiten; fremde Quellen nur lesen, höchstens eine Anfrage je Sekunde | gilt; Wettbewerber-Seiten nur lesen |
| G2 | Nur auf dem Arbeitsbranch; kein Force-Push, Rebase, Reset, Löschen, kein Merge in main, keine Änderung an Git-Einstellungen | gilt; Merge in main nur mit Freigabe |
| G3 | Keine Deploys, Releases, Domain- oder DNS-Änderungen | gilt; ein Push auf main ist ein Deploy; `npm run indexnow` (`scripts/submit-indexnow.mjs:4-11`) nur mit Freigabe |
| G4 | Zugangsdaten nie anfassen oder zeigen; Inhalte nur mit Ersatz entfernen | gilt |
| G5 | Keine echten Formularsendungen, Mails oder Konten; im Browser nur Attrappen | gilt; `/api/anfrage` versendet live (`STATUS.md:212` Branch) |
| G6 | Neue Laufzeitbibliotheken nur, wenn die Plattform nicht reicht | gilt |
| G7 | Prüfungen nie abschalten, lockern oder umgehen | gilt; eine gewollte Änderung passt die Erwartung mit Beleg an (`ENTSCHEIDUNGEN.md:1898` Branch) |
| G8 | Was UNANTASTBAR ist, bleibt in Inhalt und Verhalten gleich | kollidiert mit Formularen, H1 und Adressen; nur mit ausdrücklicher Freigabe |
| G9 | Einstellungen von Claude Code nicht ändern | gilt |

Die Leitplanken Wahrheit, Originalität, Datenschutz, Recht, Fairness und Bilder gelten unverändert (`AUFTRAG.md:66-72`).

## Risiken und Fehler

1. **WERKSTATT-Block:** `CLAUDE.md:3-9` wird in jeder Sitzung geladen und verlangt, den Werkstatt-Lauf fortzusetzen. Der Startprompt muss die SEO-Sitzung ausdrücklich davon ausnehmen.
2. **Coday-Datei:** `/Users/umurey/Downloads/CLAUDE.md` wird in jeder Sitzung unter `~/Downloads` geladen. Ihre du-Anrede, Zuschnitte, Umbenennungen und EXIF-Texte widersprechen `KERN.md:276`, `:156` und Bilder-README `:3`. Die SEO-Runde sollte außerhalb von `~/Downloads` arbeiten oder die Datei ausdrücklich ausschließen.
3. **Titel-Code:** `src/lib/metadata.ts:72` kann „– Tezgel Hessen“ mit Gedankenstrich anhängen, das verstößt gegen `KERN.md:277`. Titel außerhalb von 45 bis 58 Zeichen werden still umgeschrieben.
4. **Weiterleitungen:** Jede neue 308 lässt `test/wege.test.mjs:77-84` scheitern. G8 schützt die bestehenden Adressen (`STATUS.md:17`).
5. **Formulare:** Pflichtfelder, Empfänger und `/api/anfrage` sind UNANTASTBAR (`STATUS.md:17`, `ENTSCHEIDUNGEN.md:56`). Eine Vereinfachung braucht eine Freigabe und eine Rechtsprüfung (M-11).
6. **Reihenfolge der Pushes:**
   - Fakt: Der Fast-Forward der Werkstatt setzt voraus, dass main Vorfahr ihres Stands ist. Ein SEO-Push auf main erzwingt deshalb vorher ein Zurückmischen.
   - Vermutung: Änderungen an `/standorte/wetzlar` oder an Adressen vor E5 verfälschen den Blindvergleich und die Adressprüfung der Werkstatt.
7. **Prüfumgebung:** Die CI prüft weder Build noch Tests. Die Pfade der Werkzeuge sind auf die Cloud-Umgebung zugeschnitten.
8. **Öffentliches Repository:** Das Repo ist öffentlich (laut gh api).
   - Die neuen Originale: 127 Dateien, keine mit EXIF- oder XMP-Daten (eigene Prüfung).
   - Das Bilder-README enthält noch den Platzhalter `__ZURUECKGEHALTEN__` (`:9`).
   - Es verweist auf Dateien, die noch fehlen: `bildinventar.csv/json` und `projekte.md` (`:20-22`) sowie `docs/seo/KONTEXT.md` (`:3`).
9. **„Meisterbetrieb“:** `README.md:3` und `STATUS.md:14` nennen „Meisterbetrieb“, `KERN.md:375` verbietet das Wort.
10. **Veraltete Bildregeln:** `KERN.md:155` kennt nur die 84 alten Originale. Die Regel „keine Querformat-Zuschnitte“ (`ENTSCHEIDUNGEN.md:1707`) beruhte darauf, dass es keine Querformate gab. Die neue Serie enthält 23 (Bilder-README `:11`).

## Offene Fragen an den Auftraggeber

1. Darf die SEO-Runde G8 aufheben: Pflichtfelder der Formulare, H1 der Startseite, neue Adressen mit 308?
2. Wartet die SEO-Runde auf den Endstand der Werkstatt, oder arbeitet sie parallel mit Dateisperre? Wer informiert die Werkstatt-Sitzung?
3. Soll der SEO-Branch von Vercel-Vorschau-Builds ausgenommen werden?
4. Gilt für jeden Push auf main eine eigene ausdrückliche „live“-Freigabe?
5. Dürfen die Orte der neuen Fotos genannt werden? Gibt es Freigaben für Personen, Gewerbeprojekte und Mosaike?
6. Bekommt die SEO-Runde Zugang zum Google-Unternehmensprofil und zur Search Console? Wie lauten die aktuellen Bewertungszahlen?
7. Wie lauten Bezugspunkt und Radius (M-04)? Was ist mit „Ausstellung Wetzlar“ (M-22) und den Versprechen (M-07)?
8. Sollen die Ortszeilen-Vorschläge T-A1 bis T-A3 und T-C1-2 abgelehnt werden, damit die Suchbegriffe im ersten Bildschirm sichtbar bleiben?
