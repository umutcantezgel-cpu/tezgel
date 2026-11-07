# Kontext SEO-Runde · Fliesenverlegung Tezgel in Wetzlar, Aßlar und Umgebung

Stand 01.11.2026 abends · Code-Stand `main` f19ebba (live seit 31.10.2026, 20:55 UTC) · Auftraggeber: Umut (Sohn des Inhabers) · Startprompt: [`STARTPROMPT.md`](STARTPROMPT.md) · Belege mit Zeilennummern: [`analysen/`](analysen/)

Dieses Dokument ist die gemeinsame Grundlage für die SEO-Runde. Es sagt, was erreicht werden soll, wo im Repo was liegt, was heute im Weg steht, was zu entscheiden ist und in welcher Reihenfolge gearbeitet wird. Fakten tragen einen Beleg; Empfehlungen sind als solche markiert. Kennungen: **S1 bis S10** sind Entscheidungen des Auftraggebers, **P0 bis P8** Arbeitspakete, **A01, T01, N01, K01 ff.** Befunde (Ausrichtung, Technik, Entität, Kontakt). Nicht zu verwechseln: P01 bis P35 sind Baustellen aus `projekte.md`, keine Pakete; K-001 ff. sind Abschnitte von `_werkstatt/KERN.md`; F1 bis F9 sind Formulare, G1 bis G9 Grundregeln, M-xx Fragen aus `MENSCHEN.md`. Die Werkstatt nutzt eigene Kennungen (Etappen E0 bis E5, Entscheidungen E-001 ff.); sie sind hier nicht gemeint. Zeilenangaben gelten für `main` f19ebba; in den Dateien der Werkstatt-Liste (Abschnitt 3) verschieben sie sich nach deren Merge, dann nach Funktions- oder Feldnamen suchen.

## Kurzfassung

- **Ziel:** Die Startseite rankt für die Marke „Fliesenverlegung Tezgel“ und für Aßlar (Firmensitz). Wetzlar bekommt eine eigenständige Zielseite, die bei „Fliesenleger Wetzlar“ erscheint. Vorbild ist laut Auftraggeber ein Wettbewerber „Haag“, vermutlich Fliesenleger Haak (Abschnitt 7). Dazu bessere Titel und Descriptions, Alt-Texte, die neuen Fotos an den richtigen Stellen und deutlich einfachere Kontaktformulare. Zweck: schnell mehr passende Aufträge für Deniz Tezgel in Wetzlar, Aßlar und Umgebung.
- **Heute im Weg:**
  1. Die Startseite zielt auf Wetzlar (Titel „Fliesenleger Aßlar und Wetzlar | Fliesenverlegung Tezgel“). 25 von 164 Titeln enthalten „Wetzlar“. `/standorte/wetzlar` gibt es, sie ist laut zwei Messungen aber zu 89 bis 95 % dieselbe Vorlage wie andere Ortsseiten.
  2. 65 Vorlagenseiten (13 Orte, 52 Leistung × Ort) mit kaum eigenem Inhalt: Risiko von Brückenseiten (Doorway Pages).
  3. Technik:
     - `robots.txt` sperrt mit `/*?*` alle Fotos (`/_next/image?url=…`).
     - Die Bild-Adressen ändern sich zudem mit jedem Deploy.
     - Bewertungssterne stehen als `Product` auf jeder Seite, laut Code-Kommentar bewusst am Google-Filter vorbei.
     - Die Wikidata-IDs sind falsch, jede Ortsseite trägt ein zweites LocalBusiness, und das Google-Unternehmensprofil ist nirgends verknüpft.
  4. Entität und NAP: Eine zweite Tezgel-Website (fliesen-asslar.de) ist indexierbar. Verzeichnisse führen abweichende Nummern und einen Doppeleintrag. In Aßlar gibt es einen anderen Betrieb namens Tezgel.
  5. Formulare: neun Formulare mit bis zu fünf Schritten. Eine Zeitsperre im Server verwirft echte Anfragen still (K01). Der Kalender verliert den Wunschtermin (K02).
- **Neu im Repo:** 127 Fotos mit Inventar, Projektgruppen und Vorschlägen unter [`_werkstatt/bilder/neue-bilder-2026-10-31/`](../../_werkstatt/bilder/neue-bilder-2026-10-31/).
  - Sie füllen Lücken (Küche, Flur, Treppenhaus, Neubau, Gewerbe, Großformat) und liefern Fotos für die `/treppen`-Seiten, die bisher keines zeigen.
  - **Das Repo ist öffentlich.** Mit dem Commit vom 01.11.2026 sind alle Originale über GitHub für jeden sichtbar (Auftrag: alle Bilder in einem Ordner ins Repo). Ob das Repo privat wird, ist S7.
- **Vor dem ersten Push der SEO-Runde klären:**
  - S1: Umgang mit dem Werkstatt-Branch. Stand 01.11.2026, 20:49 UTC: 45 Commits vor `main`, seit 19:40 UTC in der Endabnahme (Werkstatt-Etappe E5); ein Fast-Forward nach `main` ist geplant.
  - Die Freigaben (Abschnitt 3).
  - S10: die sofortige Reparatur von K01 und K02.
- **Reihenfolge, die nicht kippen darf:** Wetzlar verlässt Titel und Description der Startseite und der Übersichtsseiten erst im selben Push, mit dem die neue Wetzlar-Seite live geht (P3); früher nur mit Umuts ausdrücklicher Freigabe. Sonst geht die heutige Wetzlar-Sichtbarkeit verloren, bevor eine Zielseite sie auffängt.

## Inhalt

1. [Auftrag und Ziele](#1-auftrag-und-ziele)
2. [Betrieb und Fakten](#2-betrieb-und-fakten)
3. [Lage im Repository: Branches, Deploy, Freigaben](#3-lage-im-repository-branches-deploy-freigaben)
4. [Landkarte: Wo ist was auf main](#4-landkarte-wo-ist-was-auf-main)
5. [Befunde nach Priorität](#5-befunde-nach-priorität)
6. [Zielbild: Suchbegriffe und Zielseiten](#6-zielbild-suchbegriffe-und-zielseiten)
7. [Wettbewerb und Suchergebnisse](#7-wettbewerb-und-suchergebnisse)
8. [Bilder: die neuen Fotos und ihre Einbindung](#8-bilder-die-neuen-fotos-und-ihre-einbindung)
9. [Kontaktformulare: Bestand und Vereinfachung](#9-kontaktformulare-bestand-und-vereinfachung)
10. [Regeln für Texte, Titel und Bilder](#10-regeln-für-texte-titel-und-bilder)
11. [Arbeitspakete in Reihenfolge](#11-arbeitspakete-in-reihenfolge)
12. [Offene Fragen und Entscheidungen](#12-offene-fragen-und-entscheidungen)
13. [Stand und Entscheidungen der SEO-Runde](#13-stand-und-entscheidungen-der-seo-runde)

## 1. Auftrag und Ziele

Auftrag von Umut vom 01.11.2026, sinngemäß:

1. **Startseite (Hauptdomain www.tezgel.de):** rankt für „Fliesenverlegung Tezgel“. Ortsbezug ist Aßlar, weil dort der Firmensitz ist.
2. **Wetzlar, Aßlar und weitere Orte** werden von der Startseite getrennt. Die Startseite leitet auf eigene Ortsseiten über, damit diese in Wetzlar und Aßlar ranken. Wetzlar hat Vorrang („Wir wollen Wetzlar erobern“).
3. **Vorbild:** Wettbewerber „Fliesenverlegung Haag“ (vermutlich Haak, Abschnitt 7) hat eine Hauptseite und eine eigene Wetzlar-Seite. Bei „Fliesenleger Wetzlar“ zeigt Google die Wetzlar-Seite, nicht die Hauptseite. Übernommen wird das Prinzip einer eigenen Wetzlar-Seite, nicht seine fast gleichen Ortsseiten.
4. **Titel, Descriptions und Co.** aufwerten.
5. **Alt-Texte** für alle Bilder. Die geeigneten neuen Bilder überall richtig einbinden und zuordnen.
6. **Kontaktformulare** einfacher machen.
7. **Zweck:** Deniz Tezgel, Inhaber und Fliesenleger, soll in Wetzlar, Aßlar und Umgebung schnell Aufträge bekommen, und zwar passende.

**Woran wir Erfolg messen (Empfehlung):**
- Search Console: Impressionen, Klicks und Position je Zielseite für die Cluster in Abschnitt 6, auch für Bilder. Vorher einen Ausgangswert sichern.
- Anfragen je Einstiegsseite (Startseite gegenüber Wetzlar-Seite), Anrufe und WhatsApp-Klicks (Abschnitt 9).
- Sichtbarkeit im Local Pack für „Fliesenleger Wetzlar“ und „Fliesenleger Aßlar“ (Statistiken im Google-Unternehmensprofil).

## 2. Betrieb und Fakten

| Angabe | Wert | Quelle |
|---|---|---|
| Name | Fliesenverlegung Tezgel | `src/config/company.js` |
| Inhaber | Deniz Tezgel (in Verzeichnissen auch „Ismail Deniz Tezgel“) | `company.js`, [Analyse 07](analysen/07-live-stand-nap.md) |
| Anschrift | Hohwardstraße 14, 35614 Aßlar (Lahn-Dill-Kreis, rund 5 km bis Wetzlar) | `company.js:18-34` |
| Telefon | 06441 / 44 83 567 · Mobil und WhatsApp 0172 / 67 28 504 · Fax 06441 / 44 83 548 | `company.js`, `src/lib/schema.ts:179-190` |
| E-Mail | info@tezgel.de (Anfragen gehen an info@, Absender ist kontakt@tezgel.de) | `src/lib/email/mailer.ts:27-38` |
| Domain | https://www.tezgel.de; `tezgel.de` und `http` leiten per 308 dorthin | live geprüft |
| Bewertungen | Google 5,0 bei 27 (Stand September 2026, von Hand gepflegt) | `src/config/reviews.js:9-19` |
| Faktenblatt | einzige Quelle für Zahlen und Zusagen | `_werkstatt/KERN.md`, Anhang F · Faktenblatt |

**Nicht belegt, daher nicht behaupten** (`_werkstatt/KERN.md`, Anhang F, „Nicht verwenden“): „Meisterbetrieb“, Zahl der Mitarbeiter, „über 15 Jahre“, Zertifikate, Partnerstatus, Projektorte zu Fotos, Dauer einer Badsanierung. Erlaubt sind „eingetragener Fachbetrieb“ und „Mittelhessen“ (Anhang F). Bestätigt Deniz oder Umut einen neuen Fakt (etwa einen Meisterbrief), trägt die SEO-Runde ihn mit Datum und Quelle in Abschnitt 13 ein. Ab dort gilt er für die SEO-Runde wie ein Eintrag im Faktenblatt; `KERN.md` und `MENSCHEN.md` ziehen die Werkstatt oder Umut nach.

**Offene Fakten in `_werkstatt/MENSCHEN.md`, die SEO betreffen:**
- M-03: Öffnungszeiten widersprechen sich (Freitag 17 oder 18 Uhr, Samstag).
- M-04: Einsatzgebiet (Radius 45 oder 25 km, Bezug Wetzlar oder Aßlar, „Mittelhessen“ oder „ganz Hessen“). Ehringshausen, Hüttenberg und Lahnau haben keine Ortsseite.
- M-07: Zusagen mit rechtlicher Bindung (Festpreis, Rückruf in 24 oder 24 bis 48 Stunden).
- M-08: Herkunft einzelner alter Fotos (Herstellerfoto?).
- M-10: elf Generatorbilder in `public/images/bad/`.
- M-22: Ausstellung oder nur Beratung in Wetzlar und Gießen?
- **Neu:** Empfängt der Betrieb Kunden an der Hohwardstraße 14 (Beratung, Muster) mit Personal zu festen Zeiten? Davon hängt ab, ob die Adresse im Google-Unternehmensprofil sichtbar sein darf (N03).

**Verwechslungsgefahr:** „Özcan Tezgel Kreativ Fliesenlegerfachbetrieb“, Wetzlarer Str. 42 A, 35614 Aßlar, ist ein anderer Betrieb (11880, Das Örtliche).
- Deshalb in Verzeichnissen, im Google-Unternehmensprofil und im Schema einheitlich: „Fliesenverlegung Tezgel · Inhaber Deniz Tezgel · Hohwardstraße 14, 35614 Aßlar“.
- Auf der Website bleibt es bei KERN: Inhaber und Anschrift nur auf `/kontakt`, `/ueber-uns` und im Fuß.

## 3. Lage im Repository: Branches, Deploy, Freigaben

**Deploy:**
- `main` ist Produktion. Jeder Push auf `main`, auch der Merge eines Pull Requests, baut und veröffentlicht www.tezgel.de über Vercel.
- `vercel.json` schaltet Builds nur für den Werkstatt-Branch ab. Jeder andere gepushte Branch erzeugt einen Vorschau-Build, und der Auftraggeber hat deren Kosten schon beanstandet (`_werkstatt/ENTSCHEIDUNGEN.md:364-365`).
- `_werkstatt/` und `_relaunch/` werden nicht ausgeliefert (`.vercelignore`).

**Öffentliches Repo:**
- Das GitHub-Repo ist öffentlich. Seit dem Commit vom 01.11.2026 liegen dort alle 127 Originale, auch die, die für die Website erst eine Freigabe brauchen: Datenschutz hoch (`nb-107`, `nb-121`), Mosaike (`nb-113` bis `nb-116`), Gewerbeanlage (`nb-027` bis `nb-029`, `nb-032` bis `nb-037`).
- Ein späteres „Repo privat“ (S7) schützt nur ab dann; was bis dahin abgerufen wurde, bleibt draußen.
- Eigene Arbeitsdateien der SEO-Runde (Audits, Keyword-Listen, Entwürfe) gehören deshalb unter `docs/seo/arbeit/` nur, wenn sie öffentlich sein dürfen, sonst außerhalb des Repos.

**Werkstatt-Lauf „Universal Motion“** auf `claude/tezgel-website-redesign-iqxt8z`:
- Stand 01.11.2026, 20:49 UTC: 45 Commits vor `main`, letzter Commit 93fa042. Die Commits dieser Unterlagen auf `main` vom 01.11.2026 fehlen dem Branch; vor dem Fast-Forward mischt die Werkstatt sie zurück. Eine Routine setzt den Lauf stündlich fort.
- Seit 19:40 UTC läuft die Endabnahme (Werkstatt-Etappe E5). Danach ist ein einmaliger Fast-Forward auf `main` geplant, ohne weitere Rückfrage, vorausgesetzt `main` ist Vorfahr des Branches.
- Jeder Commit auf `main`, auch der Commit mit diesen Unterlagen und Bildern, zwingt die Werkstatt, `main` vorher zurückzumischen. Das hat sie bei früheren Live-Korrekturen getan. Der Bilder-Commit fügt fast nur neue Dateien hinzu; einzig `CLAUDE.md` bekommt einen eigenen SEO-Block, getrennt vom WERKSTATT-Block.
- **Die Werkstatt ändert** (85 Dateien außerhalb von `_werkstatt/`, Stand 20:49 UTC):
  - alle Dateien `src/inhalte/*.ts`, aber nicht `src/inhalte/meta/*`;
  - die Seiten `src/app/(bestand)/{bad,bad/barrierefreies-bad,balkon-terrasse,blog,fliesen,kontakt,leistungen,referenzen,standorte/[stadt],ueber-uns}/page.*`;
  - große Teile von `src/components/{kern,momente,vorlagen}/**`, dazu `blog/{BlogCard,BlogFilter,liste/Leitfaden}.jsx`, `contact/DirectContactCard.tsx`, `funnels/TezgelAnfrageFunnel/Schritt1.jsx`, `leistungen/Leistungsplaene.tsx`, `sections/{CompanyHistory,ReviewsSection}.jsx`, `ueber-uns/Werte.tsx`, `ui/FinalCTA.tsx`;
  - `src/app/globals.css`, `src/app/bewegung.css`, `src/lib/motion/register.ts`;
  - die Tests `bewegung`, `blogKategorien`, `galerie-filter`, `gefaelle-dusche`, `intro`, `orte` und `seitenformel-folgen`.
- **Die Werkstatt fasst nicht an:**
  - SEO-Technik: `src/lib/metadata.ts`, `src/lib/beschreibung.ts`, `src/inhalte/meta/*`, `src/lib/schema.ts`, `src/lib/schemaPyramid.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, `next.config.ts`, `src/app/(bestand)/_dokument.tsx`;
  - Daten und Bilder: `src/config/*` (darunter `cities.ts`, `navigation.js`, `arbeiten.ts`, `company.js`, `reviews.js`), `src/lib/einzugszonen.ts`, `public/images/**`;
  - Seiten und Bausteine: Kopf, Fuß und Menü, `B/standorte/page.tsx`, `vorlagen/teile/Einsatzorte.tsx`, `kern/Bildfeld.tsx`, `B/leistungen/[id]/**`, `B/ausstellung/*`, `B/termin`, `B/beratung`;
  - Formulare und Server: `src/components/forms/*`, `src/lib/formulare/*`, `src/lib/email/*`, `src/app/api/*`.
- Maßgeblich ist immer die aktuelle Liste. Den Befehl dafür nennt der Startprompt in Schritt 2.

**S1 (Auftraggeber), Branch-Strategie:**
- **Variante A:** Erst den Werkstatt-Endstand nach `main` bringen, dann die SEO-Runde auf dem neuen `main` beginnen. Am sichersten. Weil die Werkstatt schon in der Endabnahme ist, kostet das vermutlich nur Tage.
- **Variante B:** Die SEO-Runde arbeitet sofort auf einem eigenen Branch von `main` (Vorschlag `seo/lokal`).
  - Zuerst nur dort, wo die Werkstatt nichts ändert: Technik, Schema, Descriptions in `src/inhalte/meta/*`, `metadata.ts`, Bilddaten.
  - Einzige Ausnahme vor dem Merge: die Meta-Zeilen (`titel`, `beschreibung`) in `src/inhalte/*.ts`, als eigener Commit ohne weitere Änderung dieser Dateien. Inhalte von Startseite, Ortsseiten, Kontaktseite und Galerie nach dem Fast-Forward oder mit einer Dateisperre. Die Sperre gilt erst, wenn Umut sie der Werkstatt mitgeteilt und der SEO-Runde bestätigt hat.
  - Vorschau-Builds: `seo/lokal` nur lokal führen, oder im ersten Commit des Branches in `vercel.json` unter `git.deploymentEnabled` den Eintrag `"seo/lokal": false` setzen (wie für den Werkstatt-Branch).
- **Für beide Varianten gilt:**
  - Bis Umut S9 anders entscheidet, braucht jeder Push auf `main` (auch ein Merge) eine eigene Freigabe „live“ für genau diesen Stand. Dauerfreigaben aus `_werkstatt/ENTSCHEIDUNGEN.md` gelten für die SEO-Runde nicht.
  - Vor dem Push `origin/main` in den SEO-Branch mergen und die Prüfkette auf genau diesem Stand laufen lassen.
  - Danach bittet die SEO-Runde Umut, die Werkstatt-Sitzung zu informieren. Sie schreibt nie selbst in die Werkstatt-Sitzung, ihre Dateien oder ihren Branch.

**`CLAUDE.md` im Repo:**
- Der WERKSTATT-Block gilt nur für den Orchestrator des Werkstatt-Laufs. Für SEO-Sitzungen steht darüber ein eigener SEO-Block.
  - Sie setzen den Werkstatt-Lauf nicht fort, auch nicht nach einer Kontextverdichtung, und starten oder setzen keine Werkstatt-Workflows fort.
  - Nach Sitzungsstart, Verdichtung oder Limit lesen sie zuerst `docs/seo/STARTPROMPT.md` und Abschnitt 13 dieses Dokuments.
- `_werkstatt/` ist für die SEO-Runde Wissensquelle; geändert wird dort nur der Bildordner `neue-bilder-2026-10-31/` (neue Dateien, Inventar, `projekte.md`).
- Wer eine Sitzung unter `~/Downloads` startet, bekommt zusätzlich `~/Downloads/CLAUDE.md` geladen (Coday-Mediapipeline mit Zuschnitten, Umbenennungen und du-Anrede). Diese Datei gilt für dieses Projekt nicht; die Sitzung gehört in einen Klon außerhalb von `~/Downloads`.

**Texthoheit:**
- Die Werkstatt ändert nur Mikrotexte und legt übrige Texte als Vorschlag in `_werkstatt/TEXTVORSCHLAEGE.md` ab (`_werkstatt/STATUS.md:18`, KERN K-011, Absatz v4).
- Für die SEO-Runde gilt nach dem Auftrag vom 01.11.2026 abweichend: Titel, Descriptions, Alt-Texte und Seitentexte ändert sie direkt im Code. Grundlage ist der von Umut freigegebene Plan; im Bericht steht jeweils alt und neu. `TEXTVORSCHLAEGE.md` bleibt unberührt.
- Die 127 neuen Fotos sind echte Fotos des Betriebs und gelten für die Bildregeln (KERN K-006, „Bildregeln“) als Bestand.

**Regeln G1 bis G9** (`_werkstatt/AUFTRAG.md:57-65`), sinngemäß auch für die SEO-Runde:
- G1: nur in diesem Repo arbeiten; fremde Seiten nur lesen, höchstens eine Anfrage je Sekunde.
- G2: kein Force-Push, Rebase oder Reset, kein Löschen von Branches; Merge nach `main` nur mit Freigabe.
- G3: keine Deploys, Domain- oder DNS-Änderungen ohne Freigabe; ein Push auf `main` ist ein Deploy, `npm run indexnow` und `POST /api/indexnow` ebenfalls nur mit Freigabe.
- G4: Zugangsdaten nie anfassen oder zeigen; Inhalte nur mit Ersatz und Vermerk entfernen.
- G5: keine echten Formularsendungen, Mails oder Konten; `/api/anfrage` verschickt echte Mails.
- G6: neue Bibliotheken nur, wenn die Plattform nicht reicht.
- G7: Prüfungen nie abschalten oder lockern; eine gewollte Änderung passt die Erwartung mit Beleg an.
- G8: Was UNANTASTBAR ist, bleibt gleich (Liste unten).
- G9: Einstellungen von Claude Code nicht ändern.

**Freigaben** (UNANTASTBAR laut `_werkstatt/STATUS.md:17`):
- **Im Grundsatz freigegeben** durch den Auftrag vom 01.11.2026: Formulare vereinfachen, Startseite und Wetzlar trennen, Titel und Descriptions, Alt-Texte, neue Bilder einbinden.
- **Nur nach ausdrücklicher Einzelfreigabe durch Umut:**
  - die H1 „Perfektion auf jedem Quadratmeter.“ der Startseite (`src/inhalte/start.ts:21`) und „Ihr neues Traumbad zum Festpreis.“ auf `/bad/badsanierung` (`src/inhalte/bad-badsanierung.ts:23`);
  - alle bestehenden Adressen: entfernen, umleiten (308; die Liste prüft `test/wege.test.mjs`), noindex;
  - Geschäftslogik, Pflichtfelder, Einwilligung und Empfänger der Anfrageformulare sowie die Schnittstelle `/api/anfrage` (betrifft K01, K02 und das neue Feld `quelle`);
  - Firmendaten (Öffnungszeiten, Einsatzgebiet, `src/config/company.js`);
  - Bewertungszahlen und Wortlaut der Kundenstimmen;
  - Rechtstexte;
  - Cookie-Einwilligung und ihr Verhalten (betrifft Tracking);
  - das Logo;
  - Wetzlar aus Titel oder Description der Startseite oder der Übersichtsseiten nehmen, bevor die neue Wetzlar-Seite live ist;
  - jeder Push auf `main`.
- Einwilligung, Datenschutzhinweise und Pflichtfelder der Formulare sowie Rechtstexte zusätzlich nur nach Rechtsprüfung (M-11). Für K01 und K02 genügt Umuts Zustimmung zu S10.

## 4. Landkarte: Wo ist was auf main

Kürzel `B/` = `src/app/(bestand)/` (die Klammer steht nicht in der Adresse). Next.js 16.4 mit App Router und SSG: Vor Code mit Next-Schnittstellen die Doku in `node_modules/next/dist/docs/` lesen (`AGENTS.md`).

### Seiten

| Bereich | Dateien |
|---|---|
| Dokument, Grundwerte | `B/layout.tsx` → `B/_dokument.tsx`: html und head, geo-Meta, Root-JSON-LD, `BESTAND_METADATA` mit Ersatztitel und Ersatzbeschreibung `:36-44` |
| Startseite `/` | `B/page.tsx` mit Inhalt `src/inhalte/start.ts` (Titel und Description `:14-15`, H1 `:21`, Ortszeile `:31`, Einsatzgebiet `:110-113`); Vorlage `src/components/vorlagen/ErzaehlSeite.tsx`, Einstieg `teile/EinstiegMitte.tsx`, Ortsliste `teile/Einsatzorte.tsx`, Startfoto `src/components/start/Startbild.tsx` |
| Ortsseiten `/standorte/<ort>` (13) | `B/standorte/[stadt]/page.tsx` → `inhaltFuer()` `:42-54` → `src/inhalte/orte.ts` (`ortsInhalt()`, Titel und Description `:38-41`, H1 `:44`) → Vorlage `src/components/vorlagen/OrtsSeite.tsx`. Orte in `src/config/cities.ts` (km ab Wetzlar), Karte und km ab Aßlar in `src/lib/maps/getMapEmbedUrl.ts`, Zonen in `src/lib/einzugszonen.ts`; Übersicht `B/standorte/page.tsx` |
| Leistung × Ort (52) | `B/leistungen/[id]/[stadt]/page.tsx` (Textschablonen `:49-95`, Meta `:115-139`, Schema `:183-200`, `generateStaticParams` `:97-105`); Übersichten `B/leistungen/[id]/page.jsx` und `layout.jsx`; Gewerke `src/config/services.js` |
| Ausstellung | `B/ausstellung/wetzlar/page.jsx`, `B/ausstellung/giessen/page.jsx` (Behauptung offen, M-22) |
| Kontakt, Termin, Beratung | `B/kontakt/page.jsx` mit `src/inhalte/kontakt.ts`; `B/termin/page.jsx`; `B/beratung/` |
| Referenzen | `B/referenzen/page.jsx` mit `src/inhalte/referenzen.ts`; Galerie `src/components/momente/galerie-filter/daten.ts`; sechs Platzhalter-Projekte `src/config/projects.js` (alle `placeholder: true`, trotzdem indexierbar) |
| Bad, Fliesen, Treppen, Außen, Untergrund | `B/bad/**`, `B/fliesen/**`, `B/treppen/**`, `B/balkon-terrasse/**`, `B/naturstein/**`, `B/untergrund-abdichtung/**`, `B/fliesenreparatur/`; Inhalte teils in `src/inhalte/*.ts` |
| Navigation | `src/config/navigation.js` (Ortsregister im Fuß `:171-177`); Kopf `src/components/common/Header.jsx` („Fachbetrieb Aßlar · Wetzlar“ `:40`); Fuß `Footer.jsx` (`:42`, `:137`); `MobileMenu.jsx` |

### SEO-Technik

| Thema | Dateien und Verhalten |
|---|---|
| Titel | `src/lib/metadata.ts`: `generatePageMetadata` alias `createMetadata` `:123-176`, Ausgabe als `title.absolute`. `sanitizeTitle` `:17-110`: Titel mit 45 bis 58 Zeichen und „Tezgel“ bleiben unverändert. Titel mit 50 bis 58 Zeichen ohne „Tezgel“ bleiben ebenfalls unverändert, also ohne Marke. Andere werden aufgefüllt oder gekürzt; dabei kann die Marke wegfallen (`:27-39`, `:47-50`, `:93-97`). Live tragen 12 von 164 Titeln keine Marke |
| Description | `src/lib/beschreibung.ts` füllt kurze Texte auf und kürzt lange auf höchstens 155 Zeichen (mit „...“); „&“ und „!“ bleiben stehen. **Ein Eintrag in `src/inhalte/meta/*.ts` gewinnt immer** (`index.ts:15-22`), dann wirkt der Text der Seite nicht. Die Zeichenregeln prüft `test/meta.test.mjs` für die Einträge in `src/inhalte/meta`; für die 13 Ortsseiten prüft `test/orte.test.mjs:30-43` Länge (Titel höchstens 58, Description 120 bis 155) und Gedankenstriche, nicht aber „&“, „!“ und „...“. Alle übrigen Descriptions prüft kein Test |
| Canonical, OG | `metadata.ts:124` (selbstreferenzierend); OG-Bild ohne Angabe das Logo `:132-135` |
| JSON-LD | `src/lib/schema.ts` (Root-Graph `:307-316`, LocalBusiness `:168-227`, Product mit Sternen `:243-302`, Service `:412-459`); `src/lib/schemaPyramid.ts` (Orte, Wikidata, Ortsknoten `:289-362`); Ausgabe `src/components/seo/JsonLd.tsx`, `SeitenDaten.tsx`, `OrdnerService.tsx` |
| Sitemap, robots | `src/app/sitemap.ts` (164 Adressen, `lastmod` = Buildzeit); `src/app/robots.ts`; `src/app/llms.txt/route.ts`; leere `video-sitemap.xml` |
| Weiterleitungen | `next.config.ts:15-23` (vier 308, Liste geprüft von `test/wege.test.mjs`); 410 für Adressen der Vorgängerfirma `src/proxy.ts`, `src/lib/wege.ts` |
| IndexNow | `src/lib/seo/indexnow.ts`, `npm run indexnow` und `POST /api/indexnow` (`src/app/api/indexnow/route.ts`), beides nur mit Freigabe |
| Firmendaten | `src/config/company.js`, `src/shared/config/site.ts`, `src/lib/config.ts`; Bewertungen `src/config/reviews.js` |

### Bilder

| Thema | Dateien |
|---|---|
| Neue Originale | `_werkstatt/bilder/neue-bilder-2026-10-31/` (README, `bildinventar.csv` und `.json`, `projekte.md`, `zuordnung.csv`, Kontaktbögen) |
| Werkzeug | `_werkstatt/werkzeuge/bilder.mjs` (Zuschnitt nach Format und Schwerpunkt, metadatenfreie JPEG, Qualität 82, Platzhalter) |
| Ablage und Daten | `public/images/arbeiten/<raum>/<name>.jpg`; Einträge in `src/config/arbeiten.ts` (`ARBEITEN`, Typ `Raum`) |
| Einbau | nur über `src/components/kern/Bildfeld.tsx` per Kennung (`worum.bild`, `beleg.fotos[]`, Galerie `daten.ts`, Ortsfotos `src/inhalte/galerie.ts`) |
| Planung | `_werkstatt/bildplaetze.md` (Bildplätze je Seite), altes Inventar `_werkstatt/bildinventar.csv` |

### Formulare und Mail

`src/components/forms/` (`HeroContactForm`, `LeadQuickForm`), `src/components/funnels/` (`TezgelAnfrageFunnel`, `BadanfrageFunnel`, `BadProjektCheck`, `FliesenKonfigurator`), Hooks `src/lib/formulare/*`, Server `src/app/api/anfrage/route.ts`, Mail `src/lib/email/*` (`mailer.ts`, `validation.ts`, `security.ts`, `templates/teamEmail.ts`). Einzelheiten in Abschnitt 9.

### Regeln und Prüfkette

| Was | Wo |
|---|---|
| Text-, Bild- und Gestaltungsregeln | `_werkstatt/KERN.md`. Für die SEO-Runde zählen: K-003 (Ruhe-Regeln „Text“ und „Bilder“), K-004 („Adressen und Suchmaschinen“), K-006 („Bildregeln“), K-011 (ohne den Absatz v4, siehe Abschnitt 3, Texthoheit), K-013 (Glossar) und Anhang F · Faktenblatt |
| Verbotene Floskeln, erlaubte Bindestrichwörter, Glossar | `_werkstatt/regeln/floskeln.json`, `bindestrich-erlaubt.json`, `glossar.json` |
| Grundregeln G1 bis G9 | `_werkstatt/AUFTRAG.md:57-65` |
| Offene Fragen an Menschen | `_werkstatt/MENSCHEN.md` |
| Prüfbefehle | `npm ci`, `npm run typecheck`, `npm run lint`, `npm test` (Liste der Testdateien in `package.json`; eine neue Testdatei dort eintragen), `npm run build`, `npm run qa:graph` |
| Tests mit SEO-Bezug | `test/meta.test.mjs`, `titleLength`, `orte`, `galerie-filter`, `wege`, `navigation`, `email-pipeline`, `textmarken`, `glossar` |

**CI und Schema-Prüfung:**
- Die CI (`.github/workflows/security.yml`) läuft nur bei Pull Requests auf `main` und von Hand. Sie prüft nur Audit und Lint, weder Build noch Tests; ein direkter Push auf `main` wird gar nicht geprüft. Deshalb immer lokal prüfen.
- `scripts/qa/check-graph.mjs:27-29` verlangt per Textvergleich, dass `src/lib/schema.ts` `MAIN_SERVICE_PACKAGE_ID`, `buildMainProductOfferNode` und `aggregateRating` enthält (T02). Bei T02 alle drei Zeilen mit Beleg anpassen und Import und Aufruf in `schemaPyramid.ts:1` und `:350` mit entfernen.
- `scripts/qa/check-graph.mjs:39-41` verlangt in `schemaPyramid.ts` die Zeichenfolgen „areaServed“, „getCityLandingPageSchema“ und „Hohwardstraße 14“ (T04).

## 5. Befunde nach Priorität

Priorität: **hoch** = blockiert das Ziel oder birgt Risiko · **mittel** = wichtig · **niedrig** = Pflege. Belege mit Zeilen in [`analysen/`](analysen/). Das Paket, in dem ein Befund erledigt wird, steht in Abschnitt 11.

### Ausrichtung und Seitenarchitektur

| ID | Befund | Beleg | Empfehlung | Priorität |
|---|---|---|---|---|
| A01 | Startseite zielt auf Wetzlar: Titel „Fliesenleger Aßlar und Wetzlar \| Fliesenverlegung Tezgel“, Description „… für Wetzlar und Umgebung“; Ersatzwerte im Dokument ebenso | `src/inhalte/start.ts:14-15`, `B/_dokument.tsx:36-44` | Wetzlar aus Titel und Description, aber erst im selben Push wie die neue Wetzlar-Seite (P3) | hoch |
| A02 | „Wetzlar“ steht in 25 von 164 Titeln, auch auf Übersichten wie `/bad`, `/leistungen`, `/leistungen/bad`, `/leistungen/wohnen`, `/leistungen/aussen` (vollständige Liste in Abschnitt 6) | [Analyse 02](analysen/02-ortsseiten-startseite.md), [07](analysen/07-live-stand-nap.md) | Übersichten ortsneutral; Wetzlar nur auf Wetzlar-Seiten; umgestellt im selben Push wie P3 | hoch |
| A03 | `/standorte/wetzlar` ist Vorlage: laut zwei Messungen zu 89 bis 95 % gleich wie Aßlar und Gießen; zwei Sätze mit echtem Ortsbezug, keine Stadtteile, keine eigenen Projekte, drei von sechs gemeinsamen Fotos | `src/inhalte/orte.ts:19-86`, `src/inhalte/galerie.ts:7-14` | Eigene Inhalte (Abschnitt 6) | hoch |
| A04 | 52 Leistung-×-Ort-Seiten (96 % gleich, ohne Fotos) und 13 Ortsseiten entsprechen Googles Beispielen für Brückenseiten. Echte Aufträge in einem Ort ändern daran nichts, nur eigene Inhalte | `B/leistungen/[id]/[stadt]/page.tsx:49-95`; Google-Spam-Richtlinien | Noindex (Meta-robots, aus Sitemap und IndexNow nehmen, nicht per robots.txt sperren), 308 oder mit eigenem Inhalt ausbauen (S3) | hoch |
| A05 | `/standorte/asslar` konkurriert mit der Startseite um „Fliesenleger Aßlar“ | `src/config/cities.ts:108-115` | Entscheidung S2 | hoch |
| A06 | `/ausstellung/wetzlar` und `/ausstellung/giessen` behaupten eine „Fliesenausstellung“ beziehungsweise „Badausstellung“ ohne belegten Ort; einzige Adresse ist Aßlar; konkurriert mit `/beratung` und `/standorte/wetzlar` | `B/ausstellung/wetzlar/page.jsx:84-169`, M-22 | Je nach Antwort umformulieren oder 308 auf die Ortsseite (S4) | hoch |
| A07 | Kein Link mit dem Ankertext „Fliesenleger in Wetzlar“ im Fließtext; Leistungsübersichten verlinken Leistung × Ort statt der Ortsseite; das Menü kennt nur `/standorte` | `src/lib/textmarken.ts:1-9`, `Fachdetails.tsx:157-175`, `navigation.js:50-62` | Gezielte interne Links (Abschnitt 6) | mittel |
| A08 | Nachbarorte geografisch falsch (Sortierung nach km-Differenz ab Wetzlar; Gießen zeigt Wetzlar nicht) | `B/standorte/[stadt]/page.tsx:77-90` | Nach Koordinaten sortieren (`getMapEmbedUrl.ts:38-52`) | mittel |
| A09 | Entfernungen mal „ab Wetzlar“, mal „ab Aßlar“ | `cities.ts:4`, `src/inhalte/orte.ts:27`, `B/standorte/page.tsx:76` | Einheitlich ab Aßlar | mittel |
| A10 | Markensuffix in Titeln uneinheitlich (Fliesenverlegung Tezgel, Fliesen Tezgel, Fliesenleger Tezgel, Fachbetrieb Tezgel); 12 Titel ganz ohne Marke: `/preise`, `/leistungen/*/limburg`, `/leistungen/*/friedberg`, `/referenzen/barrierefreies-duschbad`, `/referenzen/balkon-stelzlager`, `/blog/barrierefreier-balkonaustritt` | live, `B/leistungen/[id]/[stadt]/page.tsx:130-139`, `B/preise/page.jsx:35` | Ein Suffix festlegen, Titel bewusst setzen (T10) | niedrig |

### Technik und strukturierte Daten

| ID | Befund | Beleg | Empfehlung | Priorität |
|---|---|---|---|---|
| T01 | `robots.txt` sperrt mit `Disallow: /*?*` jede Adresse mit Fragezeichen: alle Fotos `/_next/image?url=…` und jeden Link mit UTM-Parametern (etwa aus dem Unternehmensprofil) | `src/app/robots.ts:29`, `:34`, live geprüft | `/*?*` aus beiden `disallow`-Listen streichen; doppelte Parameter-Adressen fasst das selbstreferenzierende Canonical zusammen. Nur falls `/*?*` bleiben muss: `allow: ['/', '/_next/image']` in beiden Gruppen (die längere Regel gewinnt) und den Profil-Link ohne UTM setzen | hoch |
| T02 | `Product` mit `aggregateRating` 5,0 bei 27 (von Google übernommen) und drei Rezensionen auf **jeder** Seite; der Code-Kommentar nennt das Umgehen von Googles Filter für Eigenbewertungen als Zweck. Verstößt gegen die Richtlinien für Rezensions-Snippets (übernommene Bewertungen, Eigenbewertung, kein einzelnes Produkt). Bei einer manuellen Maßnahme gehen die Rich Results verloren, das Ranking bleibt laut Google unberührt | `src/lib/schema.ts:242-302` | Entfernen; Bewertungen sichtbar zeigen und auf das Profil verlinken; `scripts/qa/check-graph.mjs:27-29` mit Beleg anpassen | hoch |
| T03 | Wikidata-IDs falsch, zum Beispiel Hessen Q1198 (ist Nordrhein-Westfalen, richtig Q1199), Aßlar Q547844 (eine Rakete, richtig Q558494), Wetzlar Q4161 (eine Kategorie, richtig Q4178); vollständige Liste in [Analyse 01](analysen/01-seo-meta-schema.md) | `src/lib/schemaPyramid.ts:51-224` | Korrigieren | hoch |
| T04 | Jede Ortsseite trägt ein zweites LocalBusiness „Fliesenverlegung Tezgel – <Ort>“ mit der Aßlarer Anschrift, also eine vorgetäuschte Filiale | `src/lib/schemaPyramid.ts:318-345` | Durch `Service` mit `areaServed` ersetzen (`buildServiceNode`, `schema.ts:412-459`); `check-graph.mjs:39-41` mit Beleg anpassen | hoch |
| T05 | Google-Unternehmensprofil nirgends verknüpft: kein `sameAs` und kein `hasMap`; „Alle Bewertungen lesen“ führt auf eine Google-Suche | `src/lib/schema.ts:168-227`, `src/config/reviews.js:18` | Maps- oder CID-Link eintragen, sobald Umut ihn nennt (nie selbst ermitteln: Verwechslungsgefahr) | hoch |
| T06 | `areaServed` nennt Lahnau und Hüttenberg, aber nicht alle Orte des Einsatzgebiets. Es beschreibt, wo der Betrieb arbeitet, nicht, welche Orte eine Seite haben; Google dokumentiert die Eigenschaft für LocalBusiness nicht | `src/lib/schema.ts:196-207` | An das tatsächliche Einsatzgebiet aus M-04 angleichen, deckungsgleich mit dem Profil | niedrig |
| T07 | Öffnungszeiten widersprechen sich (JSON-LD und Fuß Freitag 17 Uhr, Text „Mo bis Fr 18 Uhr“, Samstag 8 bis 14 Uhr sichtbar, im Schema keiner) | `company.js:125-129`, `schema.ts:210-225`, M-03 | Nach Antwort und Freigabe der Firmendaten vereinheitlichen | mittel |
| T08 | Teilen-Bild ist das Logo (640 × 200, als 1200 × 630 angegeben); Generatorbilder (KI, `public/images/bad/*`) dienen als Teilen-Bild und `Article.image` der 13 Blogartikel und als `Service.image` | `metadata.ts:132-135`, `src/config/posts/*.js`, `services.js:32,67` | Echte Fotos aus der neuen Serie | mittel |
| T09 | `priceValidUntil` 2026-12-31 läuft in zwei Monaten ab | `schema.ts:274`, `:447`, `B/leistungen/page.jsx:54` | `schema.ts:274` entfällt mit T02; `schema.ts:447` in P1 mit entfernen (freie Datei); `B/leistungen/page.jsx:54` (Werkstatt-Datei) nach dem Merge, spätestens vor dem 31.12.2026 | mittel |
| T10 | Titel werden still umgeschrieben (siehe Abschnitt 4); `sanitizeTitle` kann „– Tezgel Hessen“ mit Gedankenstrich anhängen und schneidet lange Leistung-×-Ort-Titel ab („… in Friedberg (Hessen) \| Fliesen“) | `metadata.ts:72`, `:93-97` | Titel bewusst mit 45 bis 58 Zeichen und „Tezgel“ setzen. Das ist eine Hausregel und die Vorgabe des Codes; Google kennt keine feste Länge und kürzt nach Gerätebreite | mittel |
| T11 | Sechs Platzhalter-Projekte unter `/referenzen/<id>` sind indexierbar | `B/referenzen/[id]/layout.jsx:64-66` | Mit echten Projekten aus der neuen Serie füllen oder noindex | mittel |
| T12 | `lastmod` der Sitemap ist die Buildzeit; IndexNow meldet auch noindex-Seiten; `POST /api/indexnow` ist ohne gesetztes Secret offen | `sitemap.ts:65-71`, `indexnow.ts:42-46`, `src/app/api/indexnow/route.ts:22-25` | Ohne Secret mit 403 antworten; lastmod und Meldeliste pflegen | niedrig bis mittel |
| T13 | Alle Foto-Adressen tragen `dpl=<Deployment-ID>` (Vercel Skew Protection) und ändern sich mit jedem Deploy. Google empfiehlt stabile Bild-Adressen; auch nach T01 bleibt die Bildersuche so instabil | live: jede `<img src>` endet auf `&dpl=…` | Prüfen, ob die Kennung bei abgeschalteter Skew Protection entfällt (Vercel-Einstellung, nur mit Freigabe), oder Projektfotos als feste Dateien unter `/images/arbeiten/…` mit eigenem `srcset` aus den Breitenvarianten von `bilder.mjs` ausliefern | mittel |

### Entität, NAP und Offpage

| ID | Befund | Empfehlung | Priorität |
|---|---|---|---|
| N01 | **fliesen-asslar.de** ist eine zweite Tezgel-Website (Anbieter laut Impressum STARK Deutschland GmbH, Baukasten mit Vermerk „Mit Hilfe von KI erstellt“): gleiche NAP, eigenes LocalBusiness, `index, follow`, kein Link auf tezgel.de | Link auf www.tezgel.de oder 301 dorthin (mit STARK klären, Umut); prüfen, welche Website im Google-Profil steht | hoch |
| N02 | Gelbe Seiten: Hauptnummer 06441 5643776, dazu 06441 2047127, die 06441 4483567 fehlt. 11880: Eintrag nur mit Mobilnummer, dazu ein Doppel „Ismail Deniz Tezgel“. Instagram-Titel „Deniz Ismail Tezgel“ | Einträge auf Name, Anschrift und Nummern der Website bringen; Doppel zusammenführen (Liste für Umut) | hoch |
| N03 | Google-Unternehmensprofil: Name, Kategorie, Website-Link, Pin, Leistungen und Fotos nicht geprüft (kein Zugang). Offen ist auch, ob Kunden an der Hohwardstraße 14 empfangen werden: Nach Googles Richtlinien zeigt ein Betrieb mit Einzugsgebiet seine Adresse nur, wenn er dort Kunden mit Personal empfängt | Zugang klären. Empfang ja: Adresse zeigen und Einzugsgebiet ergänzen. Empfang nein: Adresse im Profil ausblenden, nur das Einzugsgebiet pflegen (bis 20 Gebiete, darunter Aßlar und Wetzlar). Das Impressum bleibt unberührt. Dazu Kategorie Fliesenleger, Leistungen, Beschreibung und Öffnungszeiten wie auf der Website, die neuen Fotos, Website-Link auf www.tezgel.de | hoch |
| N04 | Das öffentliche GitHub-Repo und ein PR erscheinen bei der Markensuche (Nicht-Google-Index) vor tezgel.de | Repo auf privat stellen erwägen (Vercel-Verbindung vorher prüfen); S7 | mittel |
| N05 | Trustlocal-Angabe auf `/referenzen` veraltet (Website 9,6 von 10 bei 25; Trustlocal zeigt 8,8 bei 27) | Aus `reviews.js` aktualisieren (Bewertungszahlen: Freigabe) | niedrig |
| N06 | Bewertungen und lokale Bekanntheit: Laut Google zählen Rezensionen (Zahl, Bewertung, Antworten) und Websites, die auf das Unternehmen verweisen, zur Bekanntheit. Lokale Links und Erwähnungen fehlen in jeder Planung | Bewertungen bei allen Kunden nach Abschluss anfragen (Kurzlink aus dem Profil, ohne Gegenleistung, ohne Vorauswahl), jede beantworten. Lokale Erwähnungen über Lieferanten, Partner, Innung oder Kammerverzeichnis, Vereine und Lokalpresse, ohne gekaufte Links | mittel |

### Kontakt und Messung (Einzelheiten in Abschnitt 9)

| ID | Befund | Priorität |
|---|---|---|
| K01 | **Stiller Verlust echter Anfragen:** Der Server vergleicht den Browser-Zeitstempel `_t` mit seiner Uhr. Unter 1,5 s oder über 24 h meldet er Erfolg („TEZ-BOT-IGN“) und verschickt keine Mail (`src/lib/email/security.ts:156-176`, `src/app/api/anfrage/route.ts:65-72`). Geht die Geräteuhr vor oder steht der Tab länger als einen Tag offen, ist die Anfrage verloren. Die Dateien fasst die Werkstatt nicht an; der Eingriff braucht S10 | hoch |
| K02 | Der Terminkalender schickt `preferredDate`, das Schema kennt das Feld nicht; der Wunschtermin geht verloren, die Ansicht meldet „bestätigt“ (`src/lib/email/validation.ts:108-115`, `useTerminKalender.ts:119-123`). Braucht S10 | hoch |
| K03 | Neun Formulare mit vier Listen für die Art des Vorhabens, bis zu fünf Schritte und etwa 30 Eingaben; Einwilligung uneinheitlich; Zusagen „24 Stunden“, „24 bis 48 Stunden“, „zeitnah“ | hoch |
| K04 | Messung: GA4 und Meta nur mit Umgebungsvariable und Einwilligung; ein einziges Ereignis (`whatsapp_click`, nur Desktop); keine Quelle je Seite außer im Titel der Schnellanfrage | mittel |

## 6. Zielbild: Suchbegriffe und Zielseiten

Grundsatz: **ein Suchbegriff, eine Zielseite.** Andere Seiten verlinken die Zielseite, statt selbst um den Begriff zu konkurrieren. Wetzlar steht am Ende nur noch auf Seiten, die wirklich von Wetzlar handeln.

| Cluster | Zielseite | Rolle und Änderung (Empfehlung) |
|---|---|---|
| Marke: „Fliesenverlegung Tezgel“, „Tezgel Fliesen“, „Fliesenleger Tezgel“ | `/` | Marke vorn im Titel; einheitlicher Name in Schema, Profil und Verzeichnissen |
| „Fliesenleger Aßlar“, „Fliesenverlegung Aßlar“, „Fliesen Aßlar“ | `/` (S2 Variante 1) oder `/standorte/asslar` (Variante 2) | Entscheidung S2, siehe unten |
| „Fliesenleger Wetzlar“, „Fliesenverlegung Wetzlar“, „Fliesen verlegen Wetzlar“ | `/standorte/wetzlar` | Hauptziel. Adresse bleibt: verlinkt, in der Sitemap; Stichwörter in der URL wirken laut Google kaum, ein Umzug lohnt nicht. Eigene Inhalte, Links, Schema |
| „Badsanierung <Ort>“, „Fliesen verlegen <Ort>“, „Balkonsanierung <Ort>“, „Untergrund und Abdichtung <Ort>“ | `/leistungen/<leistung>/<ort>` | Snippet-Runde, 07.11.2026: Die Seiten Leistung × Ort zielen auf die Leistung im Ort (H1 und Titel „{Leistung} in {Ort}“). Ausnahme nach der Zeile darüber und S2: Wohnen × Wetzlar und × Aßlar heißen „Böden und Wände fliesen in {Ort}“, weil „Fliesen verlegen Wetzlar“ der Wetzlar-Seite und „Fliesenverlegung Aßlar“ der Startseite gehören (`src/lib/seo/titel.ts`) |
| „Badsanierung Wetzlar“, „bodengleiche Dusche Wetzlar“, „Balkon sanieren Wetzlar“ | zuerst Abschnitte auf `/standorte/wetzlar` | Eigene Seite erst mit echten Wetzlar-Projekten; bis dahin konkurriert sie nur mit `/standorte/wetzlar` und `/bad/badsanierung` |
| Leistungen ohne Ort: Badsanierung, Großformat, Balkonsanierung, Treppe, Abdichtung nach DIN 18534, Fliesenreparatur | jeweilige Fachseite (`/bad/badsanierung`, `/fliesen/grossformat`, `/balkon-terrasse/balkonsanierung`, `/treppen/*`, `/untergrund-abdichtung/din-18534`, `/fliesenreparatur`) | Ortsneutral; Ortsbezug nur über Links „in Wetzlar“ |
| Nahe Orte: Solms, Braunfels, Lahnau, Hüttenberg, Ehringshausen | `/standorte/<ort>` nur mit eigenem Inhalt | Sonst im Einsatzgebiet der Wetzlar- und Startseite kurz nennen (S3) |
| Orte ab etwa 20 km: Herborn (20), Gießen und Dillenburg (25), Haiger (30), Limburg und Butzbach (35), Marburg und Bad Nauheim (40), Friedberg (45) | `/standorte/<ort>`, noindex oder 308 | Nur behalten, wenn es dort echte Aufträge gibt **und** die Seite eigene Inhalte bekommt (Projekte und Fotos mit bestätigtem Ort, Fragen und Stimmen aus dem Ort). Sonst noindex (Meta-robots, aus Sitemap und IndexNow nehmen) oder 308 auf die nächste passende Seite (S3) |

**S2 (Auftraggeber), Aßlar:**
- **Variante 1 (Empfehlung):** Die Startseite ist Ziel für Marke **und** Aßlar. Das passt zum Firmensitz. Welche Website im Google-Profil steht, ist ungeprüft (N01, N03); vor der Umsetzung klären und im Profil `https://www.tezgel.de/` eintragen, dann zeigen Profil, Startseite und Aßlar auf dieselbe Seite.
  - Aßlar bleibt in `CITIES` (Daten für Zonen, Karte und Leistung × Ort).
  - `/standorte/asslar` leitet per 308 auf `/` (`next.config.ts`, `test/wege.test.mjs` anpassen).
  - Links über einen Helfer in `cities.ts`: `Einsatzorte.tsx:94`, `B/standorte/page.tsx:150`, `navigation.js:174`, `B/leistungen/[id]/[stadt]/page.tsx:394`; dazu in Werkstatt-Dateien, also erst nach dem Merge oder mit Dateisperre: `kern/Einzugsband.tsx:84`, die Nachbarorte in `B/standorte/[stadt]/page.tsx:115` und `momente/karte/Einsatzkarte.tsx:159`. Danach verlinkt keine Seite mehr `/standorte/asslar`.
  - `sitemap.ts:79` und `indexnow.ts:60` lassen `/standorte/asslar` aus; die vier Seiten `/leistungen/*/asslar` folgen S3.
  - Fällt Aßlar doch aus `CITIES`, brauchen auch diese vier Seiten je eine 308, und `test/orte.test.mjs:25-28`, `test/einzugszonen.test.mjs:44` und `test/karte.test.mjs:40` brechen.
- **Variante 2:** Die Startseite ist nur Marke; Aßlar steht dort nur als Sitz. `/standorte/asslar` wird eine eigenständige Aßlar-Seite (zum Beispiel mit bestätigten Ortsteilen und Projekten). Dann darf „Fliesenleger Aßlar“ nicht im Titel der Startseite stehen.
- Der Auftrag deutet beides an („auf die Wetzlar-Aßlar-Seite überleiten“ und „stadtbezogen natürlich, weil der Standort in Aßlar ist“). Deshalb vor dem Umbau fragen.

**Titel und Descriptions** (Hausregeln: Titel 45 bis 58 Zeichen mit „Tezgel“, Description 120 bis 155 Zeichen; Google selbst setzt keine Grenze; Wortlaut vor dem Einbau prüfen):
- `/`, nur bei S2 Variante 1: „Fliesenverlegung Tezgel · Fliesenleger in Aßlar“ (47 Zeichen). Description etwa: „Fliesenverlegung Tezgel aus Aßlar: Bäder, Duschen ohne Stufe, Böden, Balkone und Treppen. Der Termin bei Ihnen vor Ort ist kostenfrei.“ Ohne Wetzlar. `start.ts:14-15` und die Ersatzwerte in `B/_dokument.tsx:36-44` gleich ziehen. Bei Variante 2 nur die Marke.
- `/standorte/wetzlar`: Der Titel „Fliesenleger in Wetzlar | Fliesenverlegung Tezgel“ (49) kann bleiben. Die Description wird eigen (Leistungen plus echte Wetzlar-Belege), über einen Eintrag `'/standorte/wetzlar'` in `src/inhalte/meta/seiten.ts` (gewinnt immer) oder eine Ausnahme in `orte.ts:38-41`.
- **Übersichten ortsneutral machen** (heute „Wetzlar“ im Titel; Dateien der Werkstatt mit *):
  - `/leistungen`: `src/inhalte/leistungen.ts:13`*. `B/leistungen/layout.tsx:3-7` ist wirkungslos, weil `page.jsx:21-25` eigene Metadaten setzt.
  - `/leistungen/bad`, `/leistungen/wohnen`, `/leistungen/aussen`: `B/leistungen/[id]/layout.jsx:10-16`, `B/leistungen/[id]/page.jsx:61-72`, `src/inhalte/meta/leistungen.ts:4-7`.
  - `/bad`: `src/inhalte/bad.ts:13`*. `/bad/badsanierung`: `src/inhalte/bad-badsanierung.ts:16`*. `/bad/bad-aus-einer-hand`: `B/bad/bad-aus-einer-hand/page.jsx:28`. `/bad/musterbaeder`: `B/bad/musterbaeder/page.jsx:22`. `/bad/badanfrage`: `B/bad/badanfrage/page.jsx:18`.
  - `/balkon-terrasse`: `src/inhalte/balkon-terrasse.ts:14`*. `/balkon-terrasse/balkonsanierung`: `page.jsx:32`, `:127`.
  - `/naturstein`: `page.jsx:36`, `:184`. `/treppen`: `page.jsx:32`, `:134`. `/fliesenreparatur`: `page.tsx:31`, `layout.tsx:14`. `/fliesen/kueche`: `page.jsx:32` und ein zweites Mal in SeitenDaten `:91`.
  - `/termin`: `B/termin/layout.tsx`. `/beratung`: `B/beratung/layout.tsx`.
  - `/karriere`: `B/karriere/layout.tsx:7`, `page.jsx:90`. Hier darf der Ort bleiben, wenn es um Stellen in Wetzlar geht; dann klar als Stellenangebot formulieren.
  - **Description mit Wetzlar:** `src/inhalte/meta/seiten.ts:5` (`/bad/bad-aus-einer-hand`), `:13` (`/beratung`), `:18` (`/karriere`), `:20` (`/termin`); `meta/bauteile.ts:11` (`/balkon-terrasse/balkonsanierung`), `:15` (`/treppen`), `:20` (`/fliesenreparatur`); `meta/leistungen.ts:11` (`/naturstein`); `meta/fliesen.ts:7` (`/fliesen/kueche`); in Werkstatt-Dateien `bad.ts:14`*, `bad-badsanierung.ts:17`*, `leistungen.ts:14`*, `balkon-terrasse.ts:15`*.
  - **H1 mit Wetzlar:** `B/beratung/page.jsx:81`, `B/karriere/page.jsx:110`, `B/fliesen/kueche/page.jsx:105`, `B/bad/musterbaeder/page.jsx:54`, `B/bad/badanfrage/page.jsx:47-51`.

**Bauplan der Wetzlar-Seite (Empfehlung):**
- **Eigene Belege statt Ortsname im Text:** bestätigte Projekte in Wetzlar (Stadtteil, Leistung, Fotos nur mit Bestätigung des Orts), Kundenstimmen aus Wetzlar (nur mit Erlaubnis), Anfahrt ab Aßlar, bestätigte Stadtteile, häufige Fragen aus Wetzlar.
- **Leistungsblöcke** Bad und Dusche ohne Stufe, Böden und Wände, Balkon und Terrasse, Treppe, Reparatur; je zwei bis drei Sätze und ein Link zur Fachseite.
- **Kontakt im ersten Bildschirm:** Anruf, WhatsApp, Kurzformular mit vorbelegtem Ort Wetzlar (Abschnitt 9).
- **Schema:** WebPage plus `Service` mit `areaServed` Wetzlar (Q4178) und `provider` `#local-business`; kein zweites LocalBusiness.
- **Interne Links mit Ankertext „Fliesenleger in Wetzlar“:** aus dem Einsatzgebiet der Startseite (`Einsatzorte.tsx`), aus dem Fuß (`navigation.js`), aus den Fachseiten und aus `/referenzen`. Zurück zur Startseite mit „Fliesenverlegung Tezgel in Aßlar“. `Einsatzorte.tsx` und `navigation.js` fasst die Werkstatt nicht an; diese Links können sofort kommen (P2).
- **Technischer Weg:** Eigene Inhalte in einer neuen Datei (Vorschlag `src/inhalte/orte-eigen.ts`) in `inhaltFuer()` einmischen (`B/standorte/[stadt]/page.tsx:42-54`). Neue Abschnitte in `OrtsSeite.tsx` erst nach dem Werkstatt-Merge.
- **Lesbarkeit:** Tiefe Fachtexte unter „Mehr erfahren“ (Aufklapper, bleibt im DOM), damit die Seite ruhig bleibt (KERN K-003, Ruhe-Regeln).

**Reihenfolge:** Titel und Description der Startseite und der Übersichtsseiten verlieren Wetzlar im selben Push, mit dem die neue Wetzlar-Seite live geht (P3). Früher nur, wenn Umut es nach Vorlage der Search-Console-Werte ausdrücklich freigibt.

**Google-Unternehmensprofil:**
- Lokale Ergebnisse beruhen laut Google auf Relevanz, Entfernung und Bekanntheit. Zur Bekanntheit zählen Rezensionen (Zahl und Bewertung) und Websites, die auf das Unternehmen verweisen.
- Die Wetzlar-Seite soll die organischen Treffer für Wetzlar holen; das Profil ersetzt sie nicht.
- Ein Einzugsgebiet mit Wetzlar hilft, das Profil zu finden; eine Wirkung auf das Ranking belegt Google nicht.
- Pflege des Profils: N03 und N06.

## 7. Wettbewerb und Suchergebnisse

Einzelheiten und Quellen: [Analyse 06](analysen/06-wettbewerb-suchergebnisse.md). Abgerufen am 01.11.2026.

**„Fliesenverlegung Haag“:** Im Raum Wetzlar gibt es keinen Fliesenbetrieb „Haag“. Gemeint ist sehr wahrscheinlich **Haak** (bitte bestätigen):
- **A, Hauptvergleich:** Fliesenleger Fachbetrieb Leonid Haak, Westerwaldring 30, 35638 Leun. Website fliesenleger-haak.de mit Wetzlar-Seite `/fliesenleger-in-wetzlar.html` und zwölf gleich gebauten Ortsseiten `/fliesenleger-in-{ort}.html`, darunter Asslar.
- **B:** Alexander Haak Fliesenlegermeister GmbH & Co. KG, In der Murch 24, 35579 Wetzlar. Website haak-fliesen.de mit `/fliesenleger-wetzlar/` und vier Ortsseiten.

**Was A vermutlich richtig macht:**
- Klare Zuordnung über Titel, H1 und interne Links: Jede Seite verlinkt mit dem Ankertext „Fliesenleger in Wetzlar“; die Startseite ist auf Leun ausgerichtet.
- Alte, verlinkte Seiten.
- „Wetzlar“ in der Adresse und rund 1.000 Wörter Text sind laut Google kaum oder gar nicht rankingrelevant.

**Was A schlecht macht:**
- Überlange, sich wiederholende Titel (rund 300 Zeichen).
- Zu 99 bis 100 % gleiche Ortsseiten: Brückenseiten, nicht nachahmen.
- Fast keine Alt-Texte, schlecht für die Bildersuche.
- Neun H1, kein Canonical und kein LocalBusiness sind handwerklich unsauber, laut Google-Doku aber keine Rankingfaktoren.

**Lücken der Konkurrenz, die Tezgel besetzen kann:**
- echte Projektfotos mit Beschreibung (A und B zeigen alte Fotos ohne Alt-Text);
- Vorher und Nachher (bei keinem);
- Bewertungen (A keine, B 4,4 bei 21; Tezgel Google 5,0 bei 27);
- klickbare Nummer, WhatsApp, kurze Anfrage;
- belegbare Spezialleistungen: Dusche ohne Stufe, barrierefreies Bad, Abdichtung nach DIN 18534, Großformat, Gewerbe.

**Suchergebnisse** (Suchwerkzeug mit eigenem Index, nicht Google, ohne Local Pack, nur als Richtung):
- „Fliesenleger Wetzlar“: tezgel.de nicht unter den ersten neun; Haak A auf Platz 2, Haak B auf Platz 4, dazu Verzeichnisse und madak.de.
- „Fliesenleger Aßlar“: nur Verzeichnisse.
- „Fliesenverlegung Wetzlar“ und „Fliesenleger Wetzlar Badsanierung“: tezgel.de jeweils auf Platz 6, mit der Startseite.
- Der Index zeigt für tezgel.de noch den Stand vor dem Relaunch. Ob Google die 164 neuen Adressen kennt, zeigt nur die Search Console.

## 8. Bilder: die neuen Fotos und ihre Einbindung

**Ordner** [`_werkstatt/bilder/neue-bilder-2026-10-31/`](../../_werkstatt/bilder/neue-bilder-2026-10-31/): 127 Originale `nb-001.jpg` bis `nb-127.jpg` (WhatsApp vom 31.10.2026, zwei byte-gleiche Doppel entfernt, keine EXIF-, GPS- oder XMP-Daten). Dazu gehören:
- `README.md`: Vermerk und Regeln.
- `zuordnung.csv`: WhatsApp-Name, Maße, Kennwerte, Bearbeitung.
- `bildinventar.csv` und `bildinventar.json`: Sichtung je Bild in den Spalten des alten Inventars, plus Projekt, sichtbare Arbeiten, Datenschutzrisiko, Seitenvorschlag, Schwerpunkt, Alt-Entwurf und Dateiname. Nach einer unabhängigen Stichprobe korrigiert; Spalte `korrigiert`.
- `projekte.md`: Baustellen, Vorher und Nachher, Lücken der Website, Auswahl je Zweck.
- `_uebersicht/kontaktbogen-01.jpg` bis `-08.jpg`: alle Bilder auf einen Blick.

Einzige Bearbeitung: Auf `nb-079` ist ein lesbares Straßenschild verpixelt. Das unbearbeitete Original liegt nur lokal beim Auftraggeber. Das Repo ist öffentlich (Abschnitt 3).

**Was die Serie zeigt** (Sichtung vom 01.11.2026):

| Merkmal | Verteilung |
|---|---|
| Raum | Bad 44, Dusche 34, Wohnraum 10, Gewerbe 9, Küche 5, Treppenhaus 4, Außentreppe 4, Terrasse 4, Balkon 3, Gäste-WC 2, Flur 2, sonstiges 6 |
| Phase | Während 73 (Abbruch, Untergrund, Abdichtung, Verlegung, Fliesen fertig, aber Armaturen fehlen), Nachher 54 |
| Qualität | A 5 (Startseite, Einstieg), B 76 (Galerie, Leistungsseite), C 41 (ehrlicher Baustellenbeleg, Detail), D 5 (nicht verwenden) |
| Datenschutz | keins 53; gering 68 (Herstellerlogos, Ausblicke, Wohnspuren, wiedererkennbare Gewerbeanlage, per Zuschnitt oder Freigabe lösbar); hoch 6 |

**Belege für Leistungen, für die es bisher kein Foto gab:**
- Küche und Böden mit Ornament- oder Patchworkfliesen: `nb-013`, `nb-049`, `nb-050`.
- Treppenhaus vorher und nachher: `nb-003` und `nb-004`.
- Außentreppe vorher und nachher für die `/treppen`-Seiten: `nb-080`, dazu `nb-076` und `nb-077`.
- Neubau mit Großformat in Wohnräumen: `nb-044`, `nb-054` bis `nb-063`.
- Gewerbe, ein runder Gemeinschaftsduschraum mit Toiletten (P09): `nb-027` bis `nb-029`, `nb-032` bis `nb-037`.
- Balkone und Terrassen: `nb-073` bis `nb-075`, `nb-078`, `nb-079`, `nb-088`, `nb-089`.
- Duschen ohne Stufe mit Rinne oder Diagonalschnitten: `nb-019`, `nb-067` bis `nb-070`, `nb-082`, `nb-085`.
- Fischgrät in Holzoptik im Bau: `nb-093`, `nb-094`.
- Naturstein: Bruchmosaik am Holzherd (`nb-102`), Travertin im Römischen Verband (`nb-112`), Kamin mit Marmor (`nb-123`).

**Stärkste Bilder** (Qualität A): `nb-084`, `nb-085`, `nb-086` (Bad in Beige, Großformat, Wanne vor Trennwand mit Nischen, Dusche ohne Stufe), `nb-019` (Dusche ohne Stufe mit Rinne, dunkler Boden), `nb-076` (Außentreppe zum Keller).

**Schwächen:**
- Viele Weitwinkel- und Baustellenfotos: Schutzabdeckungen mit Herstellerlogo, offene Anschlüsse.
- Fingerkuppe am Bildrand bei `nb-045` bis `nb-048` und `nb-084` bis `nb-086`.
- Ältere Fotos (etwa ab `nb-099`) haben weniger Auflösung und zeigen Wohnspuren.

**Vor einer Veröffentlichung auf der Website klären:**
- **Datenschutz hoch:**
  - `nb-107` und `nb-121`: viele private Pflegeprodukte, Wäsche.
  - `nb-113` bis `nb-116`: Mosaike mit historischen und politischen Motiven (osmanische Reiter, Offiziersporträts, türkische Flaggen, Landkarte). `nb-116` trägt die Signatur „POSEIDON MOZAİK ATÖLYESİ“; die Bilder stammen also vermutlich aus einer Mosaikwerkstatt, und Tezgel hat sie eingebaut. Nicht als eigene Kunst darstellen. Über den Einsatz entscheidet der Inhaber.
- **Gewerbe** (P09: `nb-027` bis `nb-029`, `nb-032` bis `nb-037`): Die Anlage ist wiedererkennbar; Freigabe des Betreibers einholen.
- **Wohnspuren** (Kinderbuch, Katzentoilette, Pflegeprodukte, Zeitschriften, Einkaufstüte), etwa auf `nb-013`, `nb-014`, `nb-015`, `nb-081`, `nb-103`, `nb-125`: wegschneiden.
- **Ort:** Kein Bild trägt einen Ort. Ortsbezug erst nach Bestätigung durch Deniz (Abschnitt 12).

**Projekte:** 35 Baustellen (P01 bis P35) und 15 Einzelbilder, jedes Bild genau einmal zugeordnet, mit Ablauf, bestem Bild und Idee für `/referenzen` in [`projekte.md`](../../_werkstatt/bilder/neue-bilder-2026-10-31/projekte.md).
- **Vorher und Nachher:**
  - `nb-003` → `nb-004`: Treppenhaus, fast gleicher Blick, bestes Paar für den Regler.
  - `nb-080` → `nb-077`: Kellertreppe.
  - `nb-043` → `nb-038`: Teilerneuerung einer Dusche, Beleg für Reparatur.
  - `nb-024` → `nb-023`: Wohnraum, Untergrund mit Gewebe und neuer Boden.
- **Fast-Duplikate:** 13 Paare mit Empfehlung, welches Bild bleibt.
- **Fehlt:** Nachher-Fotos der Bäder im Bau (zum Beispiel P12, P15, P17), Vorher-Fotos der Bäder, ein eindeutiger Drittelverband, Hände bei der Arbeit. Das lohnt einen Fotoauftrag an Deniz.

**Auswahl je Zweck** (Vorschlag der Sichtung, beste zuerst; Zuschnitt und Datenschutz je Bild im Inventar):

| Zweck | Bilder |
|---|---|
| Startseite, Einstieg und Galerie | `nb-084` (Einstieg), `nb-085`, `nb-013`, `nb-004`, `nb-076`, `nb-082`, `nb-081` |
| Wetzlar-Seite (ortsneutral, ohne Ortsbehauptung) | `nb-083`, `nb-118`, `nb-100`, `nb-077`, `nb-050` (nur als Bodenausschnitt ohne Fenster, nicht zusammen mit `nb-049`) |
| Aßlar oder Startseite, zweiter Satz (ortsneutral) | `nb-120`, `nb-110`, `nb-102`, `nb-089`, `nb-123` |
| `/referenzen` | `nb-086` (Einstieg), `nb-004`, `nb-013`, `nb-076`, `nb-120`, `nb-102`, `nb-033` (nur mit Freigabe), `nb-049` |
| Küche | `nb-013`, `nb-049`, `nb-050`, `nb-102`, `nb-061` |
| Flur und Treppenhaus | `nb-004`, `nb-003`, `nb-112`, `nb-063`, `nb-005` |
| Außen und Hauseingang | `nb-076`, `nb-008`, `nb-074`, `nb-088`, `nb-078`, `nb-077` |
| Bad | `nb-086`, `nb-081`, `nb-083`, `nb-117`, `nb-120`, `nb-014`, `nb-101` |
| Dusche | `nb-085`, `nb-082`, `nb-105`, `nb-118`, `nb-019`, `nb-048`, `nb-060`, `nb-070` |
| Vorher-Nachher-Regler | `nb-003` → `nb-004`, `nb-080` → `nb-077`, `nb-043` → `nb-038`, `nb-024` → `nb-023` |

**Lücken der Website, die die Serie füllt** (bisher Planblatt, Fliesenkomposition, Zeichnung oder kein Foto; Begründungen in `projekte.md`):

| Seite oder Bildplatz | Kandidaten |
|---|---|
| `/leistungen`, Bereich „Böden und Wände“ | `nb-044`, `nb-013`, `nb-004`, `nb-049`, `nb-112` |
| `/treppen`, `/treppen/treppenhaus` | `nb-004`, `nb-003`, `nb-007`, `nb-005` |
| `/treppen/aussentreppe` | `nb-076`, `nb-077`, `nb-080`, `nb-008` |
| `/naturstein` mit Unterseiten | `nb-120`, `nb-110`, `nb-112`, `nb-123`, `nb-102`, `nb-109` |
| Startseite „Fliese gesprungen“, `/fliesenreparatur` | `nb-038`, `nb-043` |
| `/untergrund-abdichtung` mit Unterseiten | `nb-037` (Gewerbe, nur mit Freigabe), `nb-024`, `nb-003`, `nb-043`, `nb-006` |
| `/fliesen/holzoptik` | `nb-014`, `nb-097`, `nb-071`, `nb-124`, `nb-093` |
| `/fliesen/flur-diele` | `nb-112`, `nb-004`, `nb-063` |
| Küche (Platzhalter) | `nb-013`, `nb-049`, `nb-050`, `nb-102` |
| `/fliesen`, großer Moment „verband“ | `nb-076`, `nb-019`, `nb-078`, `nb-093`, `nb-094` |
| `/bad/badsanierung`, Stationen und Zweierbild aus derselben Baustelle | `nb-119` → `nb-117`, `nb-043` → `nb-038`, `nb-125` |
| `/blog` und Ratgeber | `nb-085`, `nb-060`, `nb-086`, `nb-082`, `nb-084`, `nb-120`, `nb-043` |
| `/kontakt` | `nb-008` (nur Stufen und Podest, Klingel weg) |
| `/balkon-terrasse` (Stelzlager) | `nb-088`, `nb-089` (Stelzlager im Bild nicht erkennbar, nachfragen) |
| Ortsseiten, zweites Foto statt Dublette | `nb-083`, `nb-118`, `nb-077` |
| Weitere `/fliesen`-Seiten (Großformat, Neubau, Verlegemuster, Verlegetechnik, Renovierung) | `nb-084`, `nb-044`, `nb-062`, `nb-004`, `nb-112`, `nb-091`, `nb-085`, `nb-003` |

**Ablauf: neues Foto auf die Website** (Repo-Praxis, Einzelheiten in [Analyse 03](analysen/03-bild-pipeline.md)):
1. **Auftrag als JSON-Liste anlegen**, im Bildordner, zum Beispiel `_werkstatt/bilder/neue-bilder-2026-10-31/auftrag-seo.json`. Vorlage ist `_werkstatt/bilder/auftrag-e4.json`.
   - Pflicht je Eintrag: `id`, `original`, `raum` (wird Ordner), `name` (wird Dateiname; muss je Raum eindeutig sein, `bilder.mjs` prüft nur doppelte `id`), `format` „B:H“, `schwerpunkt` in Prozent (Werte stehen im Inventar), `alt`.
   - Optional: `ausschnitt` (Prozent je Seite), `breiten`, `korrektur`, `schaerfen`.
   - `original` ist relativ zu `_eingang/entpackt` oder ein absoluter Pfad. Der Ordner `_eingang` muss nicht existieren.
   ```json
   [{"id": "bad-wanne-trennwand-nischen", "original": "../../_werkstatt/bilder/neue-bilder-2026-10-31/nb-086.jpg",
     "raum": "bad", "name": "badewanne-gefliest-trennwand-nischen-beige", "format": "4:5",
     "schwerpunkt": {"x": 60, "y": 64},
     "alt": "Badewanne mit gefliester Verkleidung, dahinter Trennwand mit zwei Nischen und Glaswand zur Dusche, Fliesen in Beige"}]
   ```
2. **Voraussetzungen:** Node 24, `npm ci --prefix _werkstatt/werkzeuge` (bringt sharp), Umgebungsvariable `SCRATCH` auf einen Arbeitsordner außerhalb des Repos (`_werkstatt/werkzeuge/lib.mjs` bricht sonst ab).
3. **Aufruf aus der Repo-Wurzel:** `node _werkstatt/werkzeuge/bilder.mjs --auftrag <json> --ziel "$SCRATCH/seo-bilder"`. Nicht direkt nach `public/` schreiben, sonst liegen `bilder.json` und ungenutzte Breitenvarianten öffentlich.
4. **Kopieren:** Nur die Basisdatei `<raum>/<name>.jpg` nach `public/images/arbeiten/<raum>/` kopieren; für T13 nach Umuts Zustimmung auch die Breitenvarianten `<name>-<breite>.jpg`, `bilder.json` nie. Bei neuem Zuschnitt einen neuen Dateinamen wählen, weil `/images/*` ein Jahr unveränderlich gecacht wird.
5. **Prüfen:** `node _werkstatt/werkzeuge/bilder.mjs --pruefe public/images/arbeiten` bricht bei EXIF, XMP oder IPTC ab.
6. **Eintragen** in `src/config/arbeiten.ts`:
   - Kennung je Bildplatz; `blurDataURL` aus `bilder.json` als `blur` übernehmen.
   - Es gibt keinen Generator; `_werkstatt/bilder/arbeiten-e2.json` läuft schon auseinander.
   - Neue Räume (Küche, Flur, Wohnen, Gewerbe) im Typ `Raum` und in `RAUM_NAME` ergänzen. Eine neue Galeriegruppe braucht ein Icon, einen Wortlaut und eine Anpassung von `test/galerie-filter.test.mjs`.
7. **Einbauen** per Kennung über `Bildfeld`:
   - Einstieg `worum.bild`, Beleg `beleg.fotos[]`.
   - Galerie in `src/components/momente/galerie-filter/daten.ts`: 4:5, jede Datei einmal, Unterschrift höchstens 80 Zeichen ohne Fachwort, in Sechserschritten. Datei und Test gehören gerade der Werkstatt.
   - Ortsfotos in `src/inhalte/galerie.ts`: je Ort drei verschiedene Fotos; ebenfalls Werkstatt-Datei.
   - Seiten ohne Vorlage: `<Bildfeld arbeit=… sizes=…>`.
8. **Prüfkette:** `npm test`, `npm run typecheck`, `npm run build`.

**Alt-Texte:**
- Höchstens 125 Zeichen; sie beschreiben, was zu sehen ist (auch eine Baustelle), ohne Striche und ohne Ort ohne Beleg; die Marke nur, wo sie natürlich im Satz steht.
- Die Entwürfe im Inventar halten das ein (geprüft: keiner über 125 Zeichen, keiner mit Strich oder Stadtnamen). Trotzdem gegen das fertige Webbild prüfen, weil der Zuschnitt den Inhalt ändert.
- Logo-Alt einheitlich „Fliesenverlegung Tezgel“. `src/components/blog/BlogAuthorCard.jsx:59` weicht ab (Gedankenstrich, Suchbegriffe).

**Bild-SEO-Technik:**
- Zuerst T01 beheben (robots.txt), sonst sieht die Suche keines der Fotos. Danach T13 (stabile Bild-Adressen).
- Teilen-Bilder (T08): je wichtiger Seite ein echtes Foto im Format 1200 × 630 über die Option `image` von `createMetadata`; die Generatorbilder aus `public/images/bad/` ablösen (M-10).
- Eine Bild-Sitemap ist optional und erst sinnvoll, wenn robots.txt die Bilder freigibt und die Adressen stabil sind.
- Bildunterschriften (`beschriftung`) bei Belegfotos nutzen, wo sie dem Leser helfen.

## 9. Kontaktformulare: Bestand und Vereinfachung

Einzelheiten mit Zeilen: [Analyse 04](analysen/04-formulare-kontakt.md). Alle Formulare senden JSON an `POST /api/anfrage`; die Mail geht an info@tezgel.de, Absender ist kontakt@tezgel.de (Werkstatt-Entscheidungen E-109, E-110). `*` = Pflichtfeld.

| # | Formular | Seiten | Umfang |
|---|---|---|---|
| F1 | Startseite (`HeroContactForm`, `useHeroKontakt`) | `/` | 1 Schritt: Vorhaben, Name*, Telefon*, E-Mail, Ort, Notiz; ohne Datenschutzhinweis |
| F2 | Schnellanfrage (`LeadQuickForm`, `useSchnellanfrage`) | 13 Ortsseiten, 52 Leistung-×-Ort-Seiten | 1 Schritt: Name*, Telefon*, E-Mail, PLZ oder Ort, Notiz, Einwilligung* |
| F3 | Express (`TezgelAnfrageFunnel`) | `/kontakt`, `/leistungen`, `/leistungen/<id>`, `/foerderung` | 3 Schritte |
| F4 | Badanfrage (`BadanfrageFunnel`) | 7 Bad-Seiten und 12 Musterbad-Seiten (19 Adressen, 8 Seitendateien) | 5 Schritte |
| F5 | Projektcheck (`BadProjektCheck`) | `/bad`, `/bad/projekt-check` | Regler und Extras, fragt keinen Ort |
| F6 | Konfigurator (`FliesenKonfigurator`) | 13 Fliesen-Seiten | 4 Schritte, bis etwa 30 Eingaben |
| F7 | Preisrechner (`PricingCalculator`) | `/preise`, `/faq`, `/leistungen/<id>` | lange Seite in drei Phasen |
| F8 | Terminformular | `/termin` | 1 Schritt; ohne Ortsangabe sendet es „Aßlar / Wetzlar“ als Ort (`useTerminAnfrage.ts:109`), die Mail nennt dann einen Ort, den niemand angegeben hat; kein Honeypot, kein `_t` |
| F9 | Kalender (`BookingCalendar`) | `/termin` | 2 Schritte, verliert den Wunschtermin (K02) |

**Zielbild Kurzanfrage (Empfehlung; Pflichtfelder, Einwilligung und Logik brauchen Freigabe):**
- **Über dem Formular** zwei gleich große Knöpfe: „Anrufen“ (`tel:`) und „Nachricht per WhatsApp“. Der WhatsApp-Text nennt Vorhaben, Ort und Seite.
- **Felder:**
  - Vorhaben* (ein Tipp: Bad, Dusche statt Wanne, Boden oder Wand innen, Balkon oder Terrasse, Treppe, Reparatur, Sonstiges);
  - Ort* (ein Tipp: Aßlar, Wetzlar, Solms, Braunfels, Gießen, Herborn, „anderer Ort“ mit PLZ-Feld; auf Ortsseiten vorbelegt);
  - Name*, Telefon*;
  - Zeitraum, Nachricht, E-Mail optional.
  - Fotos per WhatsApp; ein Upload bräuchte Speicher und eine Ergänzung im Datenschutz.
- **Erfolgsanzeige:** Vorgangsnummer, eine einzige Zusage (M-07), Knopf zum Anrufen.
- **Technik:**
  - Basis `LeadQuickForm` und `useSchnellanfrage`, die Vorhaben-Kacheln aus `HeroContactForm`;
  - neues Feld `quelle` (Seitenpfad) und Zone aus `src/lib/einzugszonen.ts`; Betreff zum Beispiel „[Neue Anfrage] Bad · Wetzlar · Name [Nr.]“; das Präfix „[Neue Anfrage]“ bleibt wegen der Outlook-Regeln;
  - Zeitsperre auf eine im Browser gemessene Ausfülldauer umstellen (behebt K01);
  - Honeypot behalten.
- **Stilllegen nach Freigabe:**
  - F1, F3, F4, F5 und F7 bis F9 durch die Kurzanfrage ersetzen; F6 höchstens als Rechner ohne eigenes Formular.
  - 308 von `/bad/badanfrage`, `/bad/projekt-check` und `/bad/badplaner` auf `/bad`, von `/termin` und `/beratung` auf `/kontakt`. Die bestehende Weiterleitung `/bad/budgetkalkulator` direkt aufs neue Ziel setzen (keine Kette).
  - Sitemap, Navigation, Tests (`wege`, `navigation`, `email-pipeline`) und die Funktionstests der Werkstatt mitziehen.
- **Mailweg:** `validation.ts` (neue Felder, `preferredDate` übernehmen oder Kalender ersetzen), `types.ts`, `route.ts`, `teamEmail.ts`, `customerEmail.ts:210`, `test/email-pipeline.test.mjs`. Den Versandweg aus E-109 und E-110 nicht ändern.
- **Messung:** Ereignis `generate_lead` (Seitenpfad, Vorhaben, Zone) nach Einwilligung; `click_to_call` und `whatsapp_click` auf allen Geräten; die Quelle steht in jeder Mail, auch ohne Einwilligung.
- **Konflikt:** Die Werkstatt ändert gerade die Seiten, auf denen die Formulare sitzen: `B/kontakt/page.jsx`, `B/bad/page.jsx`, `B/bad/barrierefreies-bad/page.jsx`, `B/fliesen/page.jsx`, `B/leistungen/page.jsx`, `B/standorte/[stadt]/page.tsx`, dazu `TezgelAnfrageFunnel/Schritt1.jsx` und `FinalCTA.tsx`. Neue Logik deshalb in neue Dateien oder in die freien Dateien (`forms`, `formulare`, `email`, `api`) legen; auf den Seiten nur einzeilig tauschen, und erst nach dem Merge.

## 10. Regeln für Texte, Titel und Bilder

Quelle: `_werkstatt/KERN.md` (v4.4.1), `_werkstatt/regeln/*.json`, Tests; vollständige Liste in [Analyse 05](analysen/05-regeln-pruefkette-branch.md). Die Längen sind Hausregeln und Vorgaben des Codes, keine Google-Grenzen.

- **Ton:** Sie-Anrede, wir-Form, kurze Sätze, konkrete Dinge. Jede Seite hat genau eine Hauptaktion; feste Beschriftungen „Termin vor Ort anfragen“, „Nachricht per WhatsApp“, „Anfrage senden“.
- **Striche:** Kein Gedankenstrich und kein „ - “ in Text, Alt-Text, Titel, Description oder Beschriftung; Zeitspannen mit „bis“. Bindestrichwörter nur aus `bindestrich-erlaubt.json` (zum Beispiel Lahn-Dill-Kreis, Gäste-WC). „Walk-in-Dusche“ nur dort, wo es der Suchbegriff der Seite ist, sonst „bodengleiche Dusche“ oder „Dusche ohne Stufe“.
- **„&“** ist in Titeln erlaubt, in Descriptions und Fließtext nicht.
- **Floskeln** aus `floskeln.json` sind verboten, darunter nahtlos, maßgeschneidert, „Entdecken Sie“, „Ihr Partner für“, Perfektion, perfekt, Traumbad und Überschriften nach dem Muster „Begriff: Erklärung“. Ausnahmen sind die zwei H1 im Wortlaut des Auftraggebers.
- **Längen:**
  - Titel 45 bis 58 Zeichen mit „Tezgel“, Ziel 50 bis 58 Zeichen und **höchstens 561 px** (Arial 20 px). Andere schreibt `sanitizeTitle` um oder kürzt sie; Titel mit 50 bis 58 Zeichen ohne „Tezgel“ lässt er unverändert, also ohne Marke (Abschnitt 4).
  - Description 120 bis 155 Zeichen ohne „…“, „ – “, „&“ und „!“, Ziel 140 bis 155 Zeichen und **höchstens 985 px** (Arial 14 px).
  - Pixelgrenzen: Screaming Frog („Over 561 Pixels“, „Over 985 Pixels“), SISTRIX 990 px, abgerufen am 03.11.2026. Gemessen mit `src/lib/seo/pixelbreite.ts` (Maße von Liberation Sans, metrisch gleich Arial, ohne Unterschneidung). Google darf Titel und Descriptions umschreiben (Zyppy: 61,6 % der Titel; Ahrefs: 62 bis 70 % der Descriptions); die Längen halten den eigenen Text vollständig sichtbar.
  - Wo sie stehen: Titel einzelner Seiten in `src/inhalte/meta/titel.ts` (`META_TITEL`), Descriptions in `src/inhalte/meta/*.ts`; ein Eintrag dort geht vor den Text der Seite, in Metadaten und Strukturdaten (`src/lib/seo/seitentitel.ts`, `src/lib/beschreibung.ts`). Die Startseite steht in `src/inhalte/start.ts` und in den Ersatzwerten von `_dokument.tsx`. Zahlen im Suchergebnis (Bewertung, Stimmen, Fotos) folgen ihrer Quelle (`test/titleLength.test.mjs`, Test 8c).
  - Alt-Text höchstens 125 Zeichen.
  - Galerie-Unterschrift höchstens 80 Zeichen, ohne Fachwort.
- **Lesbarkeit:** Flesch mindestens 60 auf Erzähl- und Ortsseiten; Sätze im Schnitt höchstens 14 Wörter, keiner über 25; Absätze höchstens vier Sätze.
- **Glossar:** Fachwörter wie „bodengleiche Dusche“ beim ersten Vorkommen je Seite als Textmarke `[[id|Wort]]` mit kurzer Erklärung; eine unbekannte Kennung bricht den Test.
- **Eine H1 je Seite**, Alltagssprache.
- **Wahrheit:** Zahlen und Zusagen nur aus dem Faktenblatt und den Einträgen in Abschnitt 13; nichts erfinden (keine Orte zu Fotos, keine Ausstellung, keine Bewertungen, keine Projekte). Ortsseiten unterscheiden sich nur durch echte Angaben.

**Wo die Regeln mit SEO kollidieren, und wie beides geht:**

| Regel | SEO-Wunsch | Weg |
|---|---|---|
| H1 der Startseite ist UNANTASTBAR | Marke und Ort in der H1 | H1 lassen; Marke und Aßlar in Titel, Ortszeile `start.ts:31` und H2. Sonst Freigabe |
| Kein Ort im Alt-Text ohne Beleg | Ortsname am Bild | Motiv und Material ins Alt; Ort im Seitentext; Ort am Bild erst nach Bestätigung durch Deniz |
| Ortsseiten nur mit echten Unterschieden | starke Wetzlar-Seite | echte Belege (Projekte, Stimmen, Stadtteile) statt Textmenge |
| Ruhe, wenig Text | Inhaltstiefe | Aufklapper „Mehr erfahren“ |
| „Meisterbetrieb“ verboten | häufiger Suchbegriff | „Fachbetrieb“, bis ein Nachweis vorliegt |
| Begriffe aus E0 bleiben (`_werkstatt/adressen-e0.csv`) | Startseite gibt Wetzlar ab | Entscheidung dokumentieren; der Begriff zieht auf die Wetzlar-Seite um |

## 11. Arbeitspakete in Reihenfolge

Jedes Paket endet mit grüner Prüfkette (`npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, bei Schemaänderungen `npm run qa:graph`) und einem kurzen Bericht: Was ist geändert (bei Titeln alt und neu), was ist offen? P1 darf ohne weitere Zustimmung beginnen (lokal); P2 bis P8 erst nach Umuts Zustimmung zum Plan. Ein Push auf `main` erfolgt nur mit Freigabe „live“. Werkstatt-Dateien laut Abschnitt 3.

| Paket | Inhalt | Dateien (Auszug) | Fertig, wenn | Werkstatt-Konflikt |
|---|---|---|---|---|
| **P0 Klären und einrichten** | S1 bis S10 entscheiden lassen; Fragen an Deniz (Abschnitt 12); Zugang zu Search Console und Profil, Maps- oder CID-Link; Ausgangswerte sichern; Klon außerhalb `~/Downloads`; `npm ci`; Prüfkette auf dem Ausgangsstand | – | Entscheidungen und Ausgangswerte in Abschnitt 13, Prüfkette grün | nein |
| **P1 Technik sofort** | T01 robots, T02 Product-Sterne raus (mit `schemaPyramid.ts:1`, `:350`), T03 Wikidata, T04 zweites LocalBusiness durch Service ersetzen, T09 in `schema.ts:447`, T12 `/api/indexnow` ohne Secret mit 403. T05 erst mit dem Profil-Link von Umut. K01 und K02 nach S10 (Dateien frei von der Werkstatt) | `src/app/robots.ts`, `src/lib/schema.ts`, `src/lib/schemaPyramid.ts`, `scripts/qa/check-graph.mjs`, `src/app/api/indexnow/route.ts`, `src/lib/email/*`, `src/app/api/anfrage/route.ts` | Rich-Results-Test ohne Fehler; ausgelieferte robots.txt ohne `/*?*`; die URL-Prüfung der Search Console meldet keine durch robots.txt blockierten Ressourcen; Tests grün | nein |
| **P2 Meta und Zuordnung** | Ein Markensuffix und Titel ohne Marke (A10, T10); Descriptions ohne Ortswechsel; Links „Fliesenleger in Wetzlar“ aus `Einsatzorte.tsx` und Fuß; S2 umsetzen (ohne Startseitentitel); T07 nach M-03 und Freigabe der Firmendaten. A01 und A02 (Wetzlar raus) erst mit P3 | `src/inhalte/meta/*`, `src/lib/metadata.ts`, `B/_dokument.tsx`, `B/leistungen/[id]/*`, `Einsatzorte.tsx`, `navigation.js`, Layouts; Meta-Zeilen in `src/inhalte/*.ts` | Tabelle Titel alt und neu im Bericht | mittel bis hoch: Meta-Zeilen in `src/inhalte/*.ts` nur als eigener Commit; S2-Links in `Einzugsband.tsx`, `Einsatzkarte.tsx` und `B/standorte/[stadt]/page.tsx` erst nach dem Merge |
| **P3 Wetzlar-Seite** | Eigener Inhalt, Fotos, Stimmen, Fragen, Links, Schema (Abschnitt 6); im selben Push A01 (Startseite) und A02 (Übersichten ortsneutral) | neue `src/inhalte/orte-eigen.ts`, `B/standorte/[stadt]/page.tsx`, `Fachdetails.tsx`, `src/inhalte/start.ts:14-15` | Wetzlar-Seite unterscheidet sich deutlich von anderen Ortsseiten; Links mit Ankertext gesetzt | hoch, nach Merge oder mit Dateisperre |
| **P4 Ortsseiten-Matrix** | S3 umsetzen: 52 Leistung-×-Ort-Seiten noindex oder 308, ferne Orte, Nachbarorte A08, Entfernungen A09, Ausstellung A06 (S4), T06, T12 (lastmod, IndexNow ohne noindex-Seiten), Rest von T09 | `B/leistungen/[id]/[stadt]/page.tsx`, `B/standorte/[stadt]/page.tsx`, `next.config.ts`, `sitemap.ts`, `indexnow.ts`, `cities.ts`, `einzugszonen.ts`, `schema.ts`; Tests `orte`, `wege` | Sitemap enthält nur Seiten mit eigenem Inhalt | mittel: `B/standorte/[stadt]/page.tsx` (A08, noindex ferner Ortsseiten), `src/inhalte/orte.ts:27` (A09), `test/orte`, `B/leistungen/page.jsx` (T09) nach dem Merge oder mit Dateisperre |
| **P5 Bilder** | Webfassungen der Auswahl (Abschnitt 8), Einträge in `arbeiten.ts`, Alt-Texte, Lücken füllen, Teilen-Bilder (T08), Referenzprojekte (T11), Vorher und Nachher, stabile Bild-Adressen (T13) | `_werkstatt/bilder/neue-bilder-2026-10-31/`, `public/images/arbeiten/**`, `src/config/arbeiten.ts`; Platzierung in `src/inhalte/*`, `galerie-filter/daten.ts` | Jede Seite aus der Lückenliste hat ein echtes Foto; `bilder.mjs --pruefe` ohne Fund; Bild-Adressen bleiben über zwei Deploys gleich | gering (Daten), hoch (Platzierung) |
| **P6 Formulare** | Kurzanfrage, Quelle und Messung, Stilllegung mit 308 (K03, K04; Rest von K01 und K02) | `src/components/forms/*`, `src/lib/formulare/*`, `src/lib/email/*`, `src/app/api/anfrage/route.ts`, Seiten | eine Kurzanfrage überall, keine stille Verwerfung, Tests grün | hoch bei Seiten, nein bei Logik |
| **P7 Entität und Offpage** | N01 bis N06: Liste für Umut (Profil, NAP in Verzeichnissen, fliesen-asslar.de, Bewertungen anfragen und beantworten, lokale Erwähnungen, S7). Die SEO-Runde kontaktiert keine Dritten und ändert keine Einträge selbst | außerhalb des Repos | NAP überall gleich; Profil gepflegt | nein |
| **P8 Messen und melden** | Search Console (Property www, Bericht „Bilder“), Bing Webmaster Tools, Ereignisse (Einwilligung: Freigabe), nach Freigabe IndexNow; Vergleich nach 4 und 8 Wochen | `src/components/common/TrackingScripts.jsx` | Bericht mit Ausgangs- und Zielwerten | nein |

## 12. Offene Fragen und Entscheidungen

**Entscheidungen, an Umut (blockierend für die genannten Pakete):**
- S1: Branch-Strategie, Variante A oder B (Abschnitt 3)? Blockiert jeden Push der SEO-Runde.
- S2: Aßlar, Variante 1 (Startseite) oder 2 (eigene Aßlar-Seite)? Blockiert P2 und P3.
- S3: Leistung × Ort und ferne Orte: noindex, 308 oder mit eigenem Inhalt ausbauen? In welchen Orten gibt es echte Aufträge und belegbare eigene Inhalte? Blockiert P4.
- S4: Ausstellung Wetzlar und Gießen (M-22): Gibt es einen Ort mit Adresse, oder nur Beratung? Blockiert A06.
- S5: Darf die H1 der Startseite einen Ortsbezug bekommen?
- S6: Formulare: Welche Werkzeuge bleiben (Konfigurator, Projektcheck, Kalender)? Darf die Einwilligungs-Checkbox weg (Rechtsprüfung)? Ort als Pflichtfeld? Welche eine Zusage gilt? Blockiert P6.
- S7: Repo auf privat stellen (Vercel-Verbindung vorher prüfen)?
- S8: fliesen-asslar.de: mit STARK auf Link oder 301 klären?
- S9: Gilt für jeden Push auf `main` eine eigene Freigabe „live“? Bis zur Antwort: ja.
- S10: Dürfen K01 (Zeitsperre auf im Browser gemessene Ausfülldauer) und K02 (Wunschtermin übernehmen) sofort und vor P2 behoben werden?

**Weitere Fragen an Umut:**
- Ist der Wettbewerber Haak gemeint (Leun oder Wetzlar)?
- Wie lautet der Maps- oder CID-Link des Google-Unternehmensprofils, und welche Website steht dort?
- Darf `seo/lokal` Vorschau-Builds auslösen, oder wird der Branch in `vercel.json` ausgenommen?
- Sind `NEXT_PUBLIC_GA4_ID` und `NEXT_PUBLIC_META_PIXEL_ID` in Vercel gesetzt? Gibt es Zugang zur Search Console?

**An Deniz (Fakten):**
- In welchen Orten und Wetzlarer Stadtteilen lagen die Baustellen der neuen Fotos? Dürfen Ort und Projekt genannt werden?
- Freigaben für die Gewerbeanlage (P09: `nb-027` bis `nb-029`, `nb-032` bis `nb-037`), den Mitarbeiter auf alten Fotos (M-17) und die Mosaike `nb-113` bis `nb-116`. Stammen die älteren Arbeiten (etwa ab `nb-099`) und die Mosaike von ihm?
- Empfängt der Betrieb Kunden an der Hohwardstraße 14 mit Personal zu festen Zeiten (N03)?
- Öffnungszeiten (M-03), Einsatzgebiet (M-04), Zusagen (M-07), Meisterbrief vorhanden?
- Zugang zu Google-Unternehmensprofil und Search Console; aktuelle Bewertungszahl; Kundenstimmen aus Wetzlar mit Erlaubnis zur Ortsnennung.
- Herkunft alter Fotos (M-08), Generatorbilder löschen (M-10).

## 13. Stand und Entscheidungen der SEO-Runde

Von der SEO-Runde zu führen: jede Entscheidung, jeder bestätigte Fakt und jeder Paketstand mit Datum und Quelle. Dieses Dokument, das Inventar und `projekte.md` sind öffentlich: Orte, Stadtteile und Projekte zu Fotos nur eintragen, wenn Deniz die Nennung erlaubt hat; nicht freigegebene Angaben, Kundendaten und Zugänge bleiben außerhalb des Repos.

| Datum | Thema | Entscheidung oder Stand | Quelle |
|---|---|---|---|
| 01.11.2026 | Bilder | 127 neue Originale bewusst im Repo, Ordner `_werkstatt/bilder/neue-bilder-2026-10-31/`; `nb-079` mit verpixeltem Straßenschild | Auftrag Umut |
| 01.11.2026 | Unterlagen | Kontext, Startprompt und Analysen unter `docs/seo/`; SEO-Block in `CLAUDE.md` | Auftrag Umut |
| 01.11.2026 | Prüfung | Kontext, Startprompt und Inventar unabhängig gegengeprüft (Repo, Google-Doku, Bild-Stichprobe), danach ein zweites Mal auf Widersprüche; Befunde eingearbeitet, SEO-Block in `CLAUDE.md` auf SEO-Sitzungen begrenzt | Vorbereitung |
| 01.11.2026 | S1 Branch-Strategie | **Variante A umgesetzt:** Der Werkstatt-Stand ging nach Merge von `main` (8b51ff58, fe82d04d) und grüner Prüfkette als `00876c76` per Fast-Forward auf `main` (22:26 MEZ, Vercel READY, www.tezgel.de). Die Werkstatt ist angehalten (`_werkstatt/ENTSCHEIDUNGEN.md` E-115). Die Werkstatt-Dateiliste aus Abschnitt 3 gilt damit nicht mehr; die SEO-Runde arbeitet auf `seo/lokal` von diesem `main` | Umut im Chat, 01.11.2026 gegen 22:20 MEZ: „push alles was du hast auf main und mach die ganze Nacht ohne zwischenpause weiter mit SEO“; Rückfrage „wie vereinbart“ bestätigt |
| 01.11.2026 | Sitzung | Die SEO-Runde läuft in der bisherigen Werkstatt-Sitzung, nicht in einer neuen. Sie folgt ab jetzt nur dem Startprompt und dem SEO-Block in `CLAUDE.md` | Umut im Chat, 01.11.2026 |
| 01.11.2026 | Prüfkette Ausgangsstand | `main` 00876c76, Node 24.22.1: `npm ci`, `npm run build`, `npm run typecheck`, `npm run lint`, `npm test` (280 von 280), `npm run qa:graph` grün (sauberer Klon) | Prüflauf der Sitzung |
| 01.11.2026 | Vorschau-Builds | `seo/lokal` in `vercel.json` unter `git.deploymentEnabled` ausgenommen (erster Commit des Branches, 2882e905), bis Umut anders entscheidet | Abschnitt 3, Standard |
| 01.11.2026 | S9 | Jeder Push auf `main` aus der SEO-Runde nur nach „live“ von Umut für genau diesen Stand (Standard bis zur Antwort) | Abschnitt 12 |
| 01.11.2026 | Wikidata | Kennungen der 13 Orte, 5 Kreise und Hessens über die Wikidata-API (`wbgetentities`) geprüft: Bezeichnung, Beschreibung, Postleitzahl. Richtig: Hessen Q1199, Lahn-Dill-Kreis Q7905, Aßlar Q558494, Wetzlar Q4178, Herborn Q18998, Dillenburg Q517381, Haiger Q516448, Braunfels Q525612, Solms Q566156, Landkreis Gießen Q7904, Gießen Q3874, Landkreis Marburg-Biedenkopf Q7902, Marburg Q3869, Landkreis Limburg-Weilburg Q7906, Limburg an der Lahn Q16026, Wetteraukreis Q7910, Bad Nauheim Q16105, Friedberg (Hessen) Q516485, Butzbach Q569680 | Wikidata-API, Abruf 01.11.2026 |
| 01.11.2026 | P1 Technik | **Lokal fertig auf `seo/lokal`, nicht live.** T01 robots.txt ohne `/*?*`; T02 Product mit Sternen und Rezensionen entfernt; T03 Wikidata-Kennungen berichtigt; T04 Ortsseiten melden `Service` (provider `#local-business`, areaServed der Ort) statt eines zweiten LocalBusiness; T09 `priceValidUntil` im Service-Baustein entfernt; T12 `POST /api/indexnow` ohne `INDEXNOW_SECRET` mit 403. `scripts/qa/check-graph.mjs` verlangt jetzt das Fehlen von Product und Bewertungen, genau ein LocalBusiness und die geprüften Wikidata-Kennungen (Begründung im Skript). Prüfkette grün (typecheck, lint, 280 von 280 Tests nach dem Build, build, qa:graph); im Build 170 Seiten mit genau einem LocalBusiness, ohne Product, alle `@id`-Verweise mit Ziel. Offen: T05 (Profil-Link von Umut), K01 und K02 (S10), Rest von T09 in `B/leistungen/page.jsx` (P4); nach dem Live-Gang: Rich-Results-Test, ausgelieferte robots.txt auf www.tezgel.de und URL-Prüfung der Search Console (Zugang offen, Abschnitt 12) | Prüflauf der Sitzung |
| 01.11.2026 | P1 Gegenprüfung | Zwei unabhängige Prüfer (Technik, Leitplanken): Verhalten der Website ohne Fehler. Nachgearbeitet: `scripts/qa/check-graph.mjs` prüft provider und areaServed des Service der Ortsseite genau, erkennt Untertypen von LocalBusiness, eine Filiale per Spread, doppelte Orte und die alten Wikidata-Kennungen, liest CRLF und prüft zusätzlich das ausgelieferte JSON-LD im Bau (Test 6); Ersatzzweig der Ortsseite entfernt, fehlende Ortsangaben brechen den Bau ab (`test/orte.test.mjs`, Orte 8); `/api/indexnow` vergleicht das Secret in konstanter Zeit und antwortet bei leerem Körper mit 401 statt 500; Kommentare in `robots.ts` und `.env.example` berichtigt. Prüfkette grün (281 von 281 Tests) | Gegenprüfung der Sitzung |
| 01.11.2026 | Plan P2 bis P8 | Umut vorgelegt: `docs/seo/arbeit/plan-p2-bis-p8.md` (Cluster je Zielseite, Markenzusatz, Titel und Descriptions alt und neu für 35 Seiten, H1, Reihenfolge). Vorschläge maschinell geprüft mit `docs/seo/arbeit/pruefe-meta.mjs`. **Wartet auf Freigabe** | Sitzung |
| 02.11.2026 | P2 Vorbereitung | Fertiger Patch `docs/seo/arbeit/p2.patch`. Inhalt: einheitlicher Markenzusatz für 55 Seiten ohne Wetzlar in Titel oder Description (Liste alt und neu: `docs/seo/arbeit/p2-markenzusatz.json`); T10, `src/lib/metadata.ts` füllt nur noch mit „\| Fliesenverlegung Tezgel“ oder „· Tezgel“ auf; Titel und Description von `/preise`; Links „Fliesenleger in Wetzlar“ aus dem Einsatzgebiet der Startseite und aus dem Fuß. In einer Arbeitskopie geprüft: Typprüfung, Lint, Build, 282 von 282 Tests, `qa:graph`; alle 55 Titel im gebauten HTML, kein Titel doppelt. **Nicht eingespielt, wartet auf die Freigabe des Plans** | Sitzung |
| 02.11.2026 | K01 und K02 | Fertiger Patch `docs/seo/arbeit/k01-k02.patch`: Die Zeitsperre nimmt die im Browser gemessene Ausfülldauer statt des Vergleichs mit der Serveruhr; der Terminkalender sendet Wunschtag, Zeitfenster und Thema in den Feldern der API-Prüfung. Geprüft: Typprüfung, Lint, Build, 283 von 283 Tests, `qa:graph`; unabhängige Gegenprüfung „einspielbar“, Hinweise eingearbeitet. Übergabe an die Werkstatt über Umut: `_werkstatt/werkzeuge/tests/funktion-termin.spec.mjs` erwartet noch die alte Nutzlast. **Nicht eingespielt, wartet auf S10** | Sitzung, Gegenprüfung |
| 02.11.2026 | P6 Entwurf | `docs/seo/arbeit/p6-kurzanfrage.md`: Bestand, weitere Befunde (drei verschiedene Zusagen zur Rückmeldung), Entscheidungen zu S6 mit Empfehlung, Zielbild der Kurzanfrage. Wartet auf S6 und die Rechtsprüfung (M-11) | Sitzung |
| 02.11.2026 | P3 Vorbereitung | Fertiger Patch `docs/seo/arbeit/p3-meta.patch` (nach `p2.patch` und `zusagen.patch` anzuwenden; neu aufgebaut, dazu die Ersatzwerte in `_dokument.tsx` wie die Startseite): 28 Titel und Descriptions mit Paket P3 aus dem Plan, Abschnitt 4 (Wetzlar raus, eigene Description für `/standorte/wetzlar`), und 10 H1 mit P3 aus Abschnitt 5. Geprüft: Typprüfung, Lint, Build, 282 von 282 Tests, `qa:graph`, Titel, Descriptions und H1 im gebauten HTML. **Geht laut Leitplanke nur im selben Push wie die neue Wetzlar-Seite live** | Sitzung |
| 02.11.2026 | Befund Zusagen | Garantie- und Zertifikatsaussagen auf älteren Seiten (`/preise`, `/faq` samt Schema, Musterbäder, `/bad/bad-aus-einer-hand`, `/fliesen/neubau`, `/partner`, `/leistungen/*`, Abschlussblock, `/llms.txt`), Liste und Vorschläge in `docs/seo/arbeit/zusagen-befund.md`. Faktenblatt: Zertifikate nicht verwenden, Zusagen nur sinngleich (M-07 offen). Eigene Vorschläge für `/preise` und `/bad/badsanierung` auf „Festpreisangebot“ ohne „verbindlich“ berichtigt (Plan, `p2.patch`, `p3-meta.patch`). Nicht geändert, wartet auf Umut | Sitzung |
| 02.11.2026 | Zusagen-Patch | Fertiger Patch `docs/seo/arbeit/zusagen.patch` (nach `p2.patch`, vor `p3-meta.patch`): Garantie, Zertifikat und feste Zusagen raus aus sichtbaren Texten, Schema und `/llms.txt`. Der Baustein „Qualitätsversprechen“ der älteren Seiten (135 Seiten im Bau) nutzt die bereinigte Fassung der Vorlagen; `company.js` bleibt unverändert. Geprüft: Typprüfung, Lint, Build, 282 von 282 Tests, `qa:graph`; im Bau bleiben nur die zwei Sätze, die ausdrücklich keine Garantie geben. „verbindlich“ auf 44 Seiten bleibt zur Entscheidung. **Nicht eingespielt** | Sitzung |
| 02.11.2026 | S2 Vorbereitung | Fertiger Patch `docs/seo/arbeit/s2-asslar.patch` (Variante 1, nach `p2.patch`): `/standorte/asslar` per 308 auf `/`, Links über `ortsPfad()`, ohne die Adresse in Sitemap und IndexNow. Geprüft: Build, 283 von 283 Tests, `qa:graph`; kein Link mehr auf `/standorte/asslar`. **Wartet auf S2 und die Freigabe der Adressänderung** | Sitzung |
| 02.11.2026 | P4 Vorbereitung | Fertiger Patch `docs/seo/arbeit/p4-noindex.patch` (empfohlene Variante von S3, zuletzt anzuwenden): 52 Seiten Leistung × Ort und die Ortsseiten ohne eigenen Inhalt (alle außer Wetzlar, Liste `ORTE_MIT_EIGENEM_INHALT` in `src/lib/seo/indexierung.ts`) mit „noindex, follow“; Sitemap und IndexNow nur mit indexierbaren Seiten (auch ohne die Rechtstexte, T12). Geprüft: Build, 284 von 284 Tests, `qa:graph`; im Bau 71 Seiten mit noindex, Sitemap 100 Adressen ohne noindex-Seite. **Wartet auf S3 und die Freigabe** | Sitzung |
| 02.11.2026 | P3 Inhalt Wetzlar | Fertiger Patch `docs/seo/arbeit/p3-wetzlar.patch` (nach `p4-noindex.patch`): eigener Vorspann, Abschnitt „Sie suchen einen Fliesenleger in Wetzlar?“ (Sitz in Aßlar, etwa 5 km, F-09 mit Annahme M-04; Termin vor Ort kostenfrei, F-12; Festpreisangebot) und sechs Leistungen mit Links auf die Fachseiten statt auf die Seiten Leistung × Ort; neue Datei `src/inhalte/orte-eigen.ts`, die anderen Ortsseiten unverändert. Geprüft: Typprüfung, Lint, Build, 285 von 285 Tests, `qa:graph`, Texte, Links und eine H1 im gebauten HTML. Alle sieben Patches lassen sich nacheinander auf `seo/lokal` anwenden (Reihenfolge im Plan, Abschnitt 7). Baustellen, Stadtteile und Stimmen aus Wetzlar warten auf Deniz, die Beratung auf S4. **Wartet auf die Freigabe des Plans und auf S3** | Sitzung |
| 02.11.2026 | Alt-Texte im Bestand | Fertiger Patch `docs/seo/arbeit/alt-bestand.patch`: Logo der Autorenkarte (`BlogAuthorCard.jsx:59`) heißt „Fliesenverlegung Tezgel“ statt „Fliesenverlegung Tezgel – Fachbetrieb Aßlar & Wetzlar“. Durchsicht aller Alt-Texte in `src/`: sonst kein Verstoß. Die zwei Fotos mit je zwei leicht verschiedenen, zutreffenden Alt-Texten bleiben, weil `arbeiten.ts` aus `_werkstatt/bilder/arbeiten-e2.json` erzeugt wird. Geprüft: Typprüfung, Lint, Build, 281 von 281 Tests, `qa:graph`. **Wartet auf die Freigabe des Plans** | Sitzung |
| 02.11.2026 | Gesamtprobe | Alle neun Patches zusammen gebaut (`p2`, `zusagen`, `s2-asslar`, `p3-meta`, `p4-noindex`, `p3-wetzlar`, `k01-k02`, `alt-bestand`, `titel-rest`): Typprüfung, Lint, Build, 288 von 288 Tests, `qa:graph`. Im Bau über 171 Seiten: Titel, Descriptions, Striche, H1 und Alt-Texte ohne Verstoß (heute 13 Titel, 2 Descriptions, 1 Strich, 13 Seiten mit Alt-Text-Verstoß); Wetzlar in Titel oder Description von 35 auf 4 Seiten im Index; Garantie und feste Zusagen von 135 Seiten auf 0. Neu dabei: `titel-rest.patch` (Login-Titel mit doppelter Marke, 8 Titel Friedberg und Limburg ohne Marke, Test 6 für alle gebauten Seiten) und der Titel von `/standorte` in `p4-noindex.patch`. Tabelle im Plan, Abschnitt 7. **Nichts davon ist eingespielt** | Sitzung |
| 02.11.2026 | P8 Ablauf | `docs/seo/arbeit/p8-messplan.md`: Ausgangswerte, Schritte nach dem Live-Gang (Sitemap, URL-Prüfung, Rich-Results-Test, robots.txt, Bing), Indexierung beobachten, Vergleich je Zielseite nach 4 und 8 Wochen nur mit der Search Console. Wartet auf den Zugang (P7, Abschnitt 6) | Sitzung |
| 02.11.2026 | Gegenprüfung der neuen Patches | Unabhängiger Prüfer (nur lesend, ohne Netz) zu `p3-wetzlar`, `titel-rest` und dem Titel von `/standorte`: keine Blocker, sechs Befunde, alle eingearbeitet. Förderung im Wortlaut des Bestands („kann … dazugeben“ statt „zahlt“); Fachwörter mit Erklärung (Zeile „Bad ohne Barrieren“); kein doppelter Absatz zum Ablauf; Überschrift über den Fotos auf allen 13 Ortsseiten ohne Ort; P3 geht ohne P4 (neue Reihenfolge, P4 leitet die Orte im Index aus `orte-eigen.ts` ab); Kurzname als Feld in `cities.ts`, Titel aus `src/lib/seo/titel.ts` mit Test über alle 52 Seiten; Test 6 robust (Pfad, veralteter Bau). Dazu im Zusagen-Patch drei weitere feste Zusagen („Feste Terminabsprachen“, „Feste Terminzusagen“, „mit festen Terminen“). Geprüft: Patches frisch angewandt, Typprüfung, Lint, Build, 289 von 289 Tests, `qa:graph`; Lesbarkeit der Wetzlar-Seite im Browser ohne Befund. **Nichts davon ist eingespielt** | Gegenprüfung, Sitzung |
| 02.11.2026 | Zweite Gegenprüfung | Zwei unabhängige Prüfer (Wahrheit und Hausregeln, Code und Tests; nur lesend, ohne Netz): keine Blocker, 20 Befunde, bestätigte eingearbeitet. Wahrheit: Description `/bad/barrierefreies-bad` und `/foerderung` mit „kann … dazugeben“; DIN 18534 auf den Ortsseiten nur fürs Bad (Balkon DIN 18531); weiche Zusagen raus (Termintreue, versteckte Kosten, verlässlicher Zeitplan, geprüfter Fachbetrieb), „5 Jahre Gewährleistung nach VOB“ auf `/preise` raus (Frage an Deniz); Titel und Description von `/standorte` mit der Wetterau, Description ohne Wetzlar; Bindestrichwörter in geänderten Sätzen. Code: `titel-rest` geht ohne P4; Test 6 erkennt „...“, robust gegen kaputte Links und gelöschte Dateien; IndexNow mit `/preise`, Test für gleiche Adressen in Sitemap und IndexNow; Rückfall-Liste des IndexNow-Skripts ohne noindex-Seiten; Strukturdaten von `/standorte` und `/beratung` wie die Titel. Offen: „termintreu“ in `company.js` (Freigabe), Fachwörter ohne Erklärung in älteren Seiten (6a). Geprüft: Patches frisch angewandt, Typprüfung, Lint, Build, 289 von 289 Tests, `qa:graph`. **Nichts davon ist eingespielt** | Gegenprüfung, Sitzung |
| 02.11.2026 | P5 Bildauswahl | `docs/seo/arbeit/p5-bildauswahl.md`: 97 Fotos der Auswahl (Qualität A bis C, Freigabe im Inventar nicht offen, je Fast-Duplikat eins) in zwei Sichtungen mit Gegenprüfung und Entscheid zugeschnitten (4:5) und mit Alt-Texten gegen den Zuschnitt geprüft. 75 frei, 19 nach Zustimmung der Bewohner (Fragenliste Nr. 5), 3 nach Bestätigung „eigene Arbeit“ (Nr. 8); 6 nur mit Retusche, 4 nur klein. 38 Bildplätze auf 35 Seiten; ohne freies Foto bleiben `/fliesen/kueche`, `/treppen/treppenhaus`, `/balkon-terrasse/stelzlager` und `/kontakt`. Auftragsdatei `_werkstatt/bilder/neue-bilder-2026-10-31/auftrag-seo.json` (71 freie Fotos ohne Retusche), Probelauf des Bildwerkzeugs außerhalb des Repos: 71 Webfassungen, 205 Dateien ohne Metadaten. Keine Orte an Fotos. **Vorschlag, wartet auf die Freigabe des Plans** | Sitzung, Workflow mit Gegenprüfung |
| 02.11.2026 | Freigabe des Plans | Umut gibt den Plan frei (P2 bis P8). Markenzusatz wie Plan, Abschnitt 3: „Fliesenverlegung Tezgel“ ist der Markenname. | Umut im Chat, 02.11.2026: „Ich gebe den Plan frei.“ „Fliesenverlegung Tezgel ist der Markenname.“ |
| 02.11.2026 | S3 (noindex) | Kein unnötiges noindex: Orts- und Leistungsseiten bleiben im Index und werden nach und nach mit sinnvollem, belegtem Inhalt gefüllt. P4 deshalb ohne noindex eingespielt: Sitemap und IndexNow nennen dieselben Adressen ohne die Rechtstexte, dazu `/preise` und der Titel von `/standorte`. | Umut im Chat, 02.11.2026: „Ich möchte aber nicht, dass du Seiten unnötig auf No-Index setzt. Mein Ziel ist es, so viele Seiten auf Index zu setzen und diese dann auch mit entsprechend sinnvollem Content zu füllen, wie nur möglich.“ |
| 02.11.2026 | S2 (Aßlar) | `/standorte/asslar` bleibt als eigene Seite im Index, keine Umleitung auf die Startseite (Auslegung der Sitzung aus S3; `s2-asslar.patch` nicht eingespielt). | Sitzung, aus Umuts Ziel „so viele Seiten auf Index wie möglich“ |
| 02.11.2026 | Ziel Wetzlar | Hauptsächlich für Wetzlar ranken, nicht nur für Aßlar. Die Startseite behält Wetzlar im Titel (Live 1 unverändert „Fliesenleger Aßlar und Wetzlar“, mit Live 2 „Fliesenleger Wetzlar und Aßlar“); die Wetzlar-Seite verlinkt die Seiten Leistung × Wetzlar. | Umut im Chat, 02.11.2026: „wir wollen auf jeden Fall hauptsächlich für Wetzlar auch nochmal ranken … Nicht nur für Assler“ |
| 02.11.2026 | S4 und neuer Fakt | Keine eigene Ausstellung in Wetzlar; der Betrieb hat ein Lager im Dillfeld in Wetzlar (neben OBI). Die Ausstellungsseite Wetzlar wird berichtigt (Live 2); auf der Wetzlar-Seite steht „Unser Lager liegt im Dillfeld in Wetzlar.“ OBI wird auf der Website nicht genannt. | Umut im Chat, 02.11.2026: „Wir haben keine Ausstellung in Wetzlar, keine eigene Ausstellung. Wir haben nur unser Lager in Dillfeld neben Obi.“ |
| 02.11.2026 | Firmensitz | Umut: „Das Unternehmen ist in Wetzlar.“ Die Firmendaten (Hohwardstraße 14, Aßlar; Impressum, `company.js`) bleiben unverändert, bis Umut das Google-Unternehmensprofil geprüft hat; dann klären, welche Anschrift überall gilt. | Umut im Chat, 02.11.2026: „Das Unternehmen ist in Wetzlar.“ „Ich werde gerne mal beim Google-Unternehmensprofil nachschauen.“ |
| 02.11.2026 | Punkt 6 | „verbindlich“ vor Festpreis wird zu „Festpreisangebot“; „termintreu“ auch in den Firmendaten (`company.js`, Freigabe) raus (Live 2). | Umut im Chat, 02.11.2026: „Punkt 6, ja, auf jeden Fall.“ |
| 02.11.2026 | Bilder | „Integriere alle Bilder“ gilt als Zustimmung für die 19 Fotos mit offener Zustimmungsfrage und als Bestätigung der 3 älteren Fotos (`nb-109` bis `nb-111`). Eingebaut werden 91 der 97 geprüften Fotos; die 6 mit Retuschebedarf erst nach Retusche (Live 2). | Umut im Chat, 02.11.2026: „Und integriere alle Bilder, die wir jetzt hier haben.“ „kannst du ja alles machen“ |
| 02.11.2026 | Live 1 eingespielt | Auf `seo/lokal` je Patch ein Commit mit voller Prüfkette (Typprüfung, Lint, Tests vor und nach dem Bau, Bau, `qa:graph`): e6702da6 P2, 68e3c1c8 Zusagen, c4177c16 P3 Meta (Startseite wie bisher), 8e9cda98 P3 Wetzlar (Zeilen auf Leistung × Wetzlar und drei Fachseiten), 2337307c T12 ohne noindex, 7e2e2415 K01 K02, a7e657d6 Alt-Text, 1fc9d70f Titel; zuletzt 288 von 288 Tests. | Sitzung; Freigabe „live“: Umut im Chat, 02.11.2026: „Tu alles live, was du jetzt schon hast.“ (S9: eine Freigabe, ein Push) |
| 02.11.2026 | Live 1 auf `main` | Fast-Forward `main` 00876c76 → 07bb0193 nach Merge von `origin/main` (ohne Änderung) und grüner Prüfkette auf genau diesem Stand (288 von 288 Tests vor und nach dem Bau, `qa:graph`). Vercel-Deploy dpl_Cckk28cH6dibNJV5B9bxC4mHHMN9 READY auf www.tezgel.de. Lesend geprüft (höchstens eine Anfrage pro Sekunde): `/`, `/standorte/wetzlar`, `/standorte/asslar`, `/bad/barrierefreies-bad`, `/leistungen/bad/wetzlar` mit 200 und „index, follow“; robots.txt ohne `/*?*`; Sitemap mit 164 Adressen, ohne Rechtstexte, mit `/preise` | Sitzung; Freigabe Umut, 02.11.2026 |
| 02.11.2026 | Live 2 vorbereitet | Auf `seo/lokal` je Paket ein Commit mit voller Prüfkette (Typprüfung, Lint, Tests vor und nach dem Bau, Bau, `qa:graph`): 5a4b2657 Punkt 6 („verbindlich“ raus in 24 Dateien: vor Festpreis und Angebot meist als „Festpreisangebot“, auf `/fliesen/festpreisangebot` „Fester Preis“, bei Mengen „genaue Menge“; Schritt 03 in `company.js` „Staubschutz und normgerechte Abdichtung“ statt „Staubgeschützt, termintreu & DIN-gerecht“; in der FAQ „Termin vor Ort“ statt „Vor-Ort-Aufmaß“; unverändert AGB, Ratgeber, der Knopf „Verbindlichen Vor-Ort-Termin anfragen“ und die Bestätigungs-Mail an Kunden, die noch „verbindliches Festpreisangebot“ sagt: sie gehört zur Anfrage-Strecke, deshalb erst mit Umuts OK), 4272c4ee S4 und Ziel Wetzlar (`/ausstellung/wetzlar` sagt, dass es keine eigene Ausstellung gibt; Lager im Dillfeld auf der Wetzlar-Seite; Startseite „Fliesenleger Wetzlar und Aßlar \| Fliesenverlegung Tezgel“ mit Description; Linktext „Fliesenberatung Wetzlar“ statt „Ausstellung Wetzlar“ auf `/naturstein`; ein Satz der Wetzlar-Seite mit 29 Wörtern geteilt, K-010), danach P5 (nächste Zeile). Offen bleibt b4 (belegte Inhalte für die übrigen Orts- und Leistungsseiten): wartet auf die Angaben von Deniz (Fragenliste A und C). **Wartet auf „live“.** | Sitzung; Entscheidungen Umut, 02.11.2026 |
| 02.11.2026 | P5 umgesetzt | 90 Fotos in `src/config/arbeiten.ts` und `public/images/arbeiten/`; Galerie `/referenzen` mit 114 Fotos und der Gruppe „Wohnräume und Küche“; drei eigene Fotos auf `/standorte/wetzlar` (Test Orte 11); je zwei weitere in den Fotoreihen von `/bad/barrierefreies-bad`, `/balkon-terrasse` und `/bad/badsanierung`. Nach der Gegenprüfung: Wetzlar-Fotos mit Weg zur Leistungsseite; „Alle Fotos“ über der ganzen ersten Reihe der Filterknöpfe; `nb-049`, `nb-061` und `nb-102` mit neutralen Dateinamen unter `wohnen/` (Raumart Küche nicht bestätigt); `nb-109` und `nb-111` ohne Materialangabe (Travertin nicht bestätigt, Frage an Deniz); `nb-065` als fertiges Bad; neuer Test Galerie 10 (jede Datei liegt in public, Maße wie die Datei). Nicht eingebaut: 6 Fotos mit Retuschebedarf und `nb-122` (dasselbe Bad wie `nb-120`). Startseite unverändert (Entscheidung von Umut offen); offene Plätze mit Umbau der Seite: `docs/seo/arbeit/p5-bildauswahl.md`, Abschnitt 4. Lighthouse mobil lokal, je vier Läufe im Wechsel vorher, nachher, nachher, vorher (Median): `/referenzen` Leistung 94 → 92,5, LCP 2,93 → 3,13 s, FCP 1,21 → 1,51 s, weil das HTML größer ist (gepackt 62 → 106 KB); `/standorte/wetzlar` 93 → 94, LCP 3,08 → 2,89 s. Beide Seiten bleiben über 90. | Umut im Chat, 02.11.2026: „Und integriere alle Bilder, die wir jetzt hier haben.“ |
| 02.11.2026 | b4 vorbereitet | Die 52 Seiten Leistung × Ort nehmen ihre Texte aus `src/inhalte/leistung-ort.ts`: nur Faktenblatt (F-08, F-11 bis F-17, F-21, F-22, F-25) und Bestand sinngleich, ohne Floskeln, Gedankenstriche und weiche Zusagen („absolute Dichtigkeit“, „verlässlich geprüft“, „schlüsselfertig“, „millimetergenau“), Fachwörter mit Erklärung, kein Satz über 25 Wörter, Absätze mit höchstens vier Sätzen. Kennzahl Balkon „1,5 bis 2 % Gefälle“ statt DIN 18534 (gilt nur innen). Die Ortsbeschreibung aus `cities.ts` steht dort nicht mehr. `/standorte`: Ortsbeschreibungen nur mit echten Angaben (Wetzlar mit dem Lager im Dillfeld, Aßlar mit dem Firmensitz, die übrigen elf ohne eigenen Satz statt getauschter Ortsnamen), Kartenüberschrift mit der Wetterau, Vorspann ohne den Satz mit 32 Wörtern, Leistungsliste ohne Fachwörter statt `business.primaryServices` (company.js unverändert). Lesbarkeit der Musterseiten (lesbarkeit.mjs, acht Seiten, alter gegen neuen Bau): Flesch etwa 30 → 60 bis 65, Floskeln 1 bis 2 → 0, Gedankenstriche 3 bis 6 → 2, offene Fachwörter 6 bis 11 → 1 bis 3; `/standorte` Flesch 54 → 68, Gedankenstriche 16 → 4, offene Fachwörter 6 → 0. Was bleibt, steht in gemeinsamen Bausteinen. Gegenprüfung (drei Linsen, Skeptiker): 23 Befunde, 6 bestätigt und eingearbeitet (Angebot im Ablauf von Untergrund × Ort vor den Vorarbeiten, ein Satz bei Limburg an der Lahn über 25 Wörter, Kartenüberschrift, Absätze in zwei Spalten, Ortskarten), dazu Stilhinweise. Unverändert, weil Freigabe nötig: Qualitätsversprechen und Öffnungszeiten aus `company.js`, Bewertungszeile, Abschlussformular. **Wartet auf „live“ (Live 3).** | Sitzung; Umut im Chat, 02.11.2026: „so viele Seiten auf Index … und diese dann auch mit entsprechend sinnvollem Content zu füllen“ |
| 02.11.2026 | Entscheidungen zu Live 2 und b4 | „Alles live“: Live 2 und b4 gemeinsam auf `main`. Deniz wird zu den offenen Fragen nicht kontaktiert, um ihn nicht zu belasten; die Fragenliste ruht. Keine Baustellen und keine Projektorte auf der Website. Travertin (`nb-109` bis `nb-111`, `nb-120`, `nb-125` bis `nb-127`) und Küchen (`nb-049`, `nb-061`, `nb-102`): Umut „würde sagen, ja“; das gilt als Einschätzung, nicht als Bestätigung, deshalb bleiben die Texte wie eingespielt (`nb-109` und `nb-111` ohne Materialangabe, die drei Räume ohne „Küche“ im Dateinamen). Ohne Antwort und deshalb unverändert: Bestätigungs-Mail an Kunden (noch „verbindliches Festpreisangebot“, Anfrage-Strecke), neue Fotos auf der Startseite. | Umut im Chat, 02.11.2026: „Ich würde sagen, ja, aber wir haben keine Möglichkeit, ihn jetzt deswegen zu kontaktieren, weil wir wollen ihn damit nicht belasten. Und wir wollen auch keine Baustellen direkt angeben. … Und du kannst alles live schalten.“ |
| 02.11.2026 | Live 2 und b4 auf `main` | Fast-Forward `main` 07bb0193 → 645998d0 (Commits 5a4b2657 Punkt 6, 4272c4ee Ausstellung und Wetzlar, 8969ba8d Fotos, 645998d0 b4) nach Merge von `origin/main` (ohne Änderung) und grüner Prüfkette auf genau diesem Stand (Typprüfung, Lint, 289 von 289 Tests vor und nach dem Bau, Bau, `qa:graph`). Vercel-Deploy dpl_4EPJcpkdgPNJzx61FunFVizko6re READY auf www.tezgel.de und tezgel.de. Lesend geprüft (höchstens eine Anfrage pro Sekunde): `/`, `/standorte/wetzlar`, `/ausstellung/wetzlar`, `/referenzen`, `/bad/barrierefreies-bad`, `/leistungen/bad/giessen`, `/leistungen/untergrund/limburg`, `/standorte` und `/naturstein` mit 200, „index, follow“ und den neuen Texten; ein neues Foto als JPEG; Sitemap mit 164 Adressen. Nicht Teil dieser Runde und offen: Der Knoten LocalBusiness aller Seiten (`src/lib/schema.ts`) sagt noch „fugenlose Großformate, schlüsselfertige Badsanierung“ (nicht sichtbar; „fugenlos“ widerspricht dem eigenen Satz „Fugenarm heißt nicht fugenlos“). | Sitzung; Freigabe Umut, 02.11.2026 |
| 02.11.2026 | Letzte offene Punkte | Umut gibt die offenen Punkte frei: Bestätigungs-Mail an Kunden ändern, Beschreibung des LocalBusiness berichtigen, neue Fotos auf der Startseite ohne das Foto im Einstieg, das Google-Unternehmensprofil mit der Website verknüpfen. | Umut im Chat, 02.11.2026: „Du hast mein Okay für die letzten offenen Punkte, diese umzusetzen. Sorge dafür, dass auch das Unternehmensprofil von Fliesenverlegung Tezgel direkt damit verknüpft ist. Startseite, ja, neue Fotos kannst du auch mit implementieren. Aber das ganz oben, das Foto, ist eigentlich richtig gut gewählt, also in der Hero-Sektion, deswegen da nichts machen.“ |
| 02.11.2026 | Offene Punkte umgesetzt | Bestätigungs-Mail (HTML und Text): „Kostenfreier Termin vor Ort: Wir messen bei Ihnen auf. Danach erhalten Sie Ihr Festpreisangebot.“ statt „Pünktlicher Termin … millimetergenaues Aufmaß … verbindliches Festpreisangebot“, Konfigurator „für das Aufmaß vor Ort“. LocalBusiness: „Fachbetrieb für Fliesen-, Platten- und Mosaikverlegung, große Fliesen, Badsanierung und Abdichtung nach DIN 18534 in Aßlar, Wetzlar und Hessen.“ (F-05, F-08, F-15) statt „fugenlose Großformate, schlüsselfertige Badsanierung“. Startseite: Galerie mit sechs Fotos, vier neue der Güte A (`nb-086`, `nb-013`, `nb-085`, `nb-004`), Einstiegsfoto unverändert. Google-Profil vorbereitet: `src/config/google-profil.ts`; mit dem geteilten Link tragen ihn das LocalBusiness (`sameAs`, `hasMap`), „Alle Bewertungen bei Google lesen“ und die Google-Plakette; nie selbst gesucht (zweiter Betrieb „Özcan Tezgel“). Gegenprüfung (zwei Linsen, Skeptiker): 6 Befunde, 3 bestätigt und behoben (Prüfung der Linkformen, Proben im Test, `reviews.js` ohne Importe für `funktion-navigation.spec.mjs`). Prüfkette: 290 von 290 Tests vor und nach dem Bau, `qa:graph`. **Wartet auf „live“ und auf den Profil-Link.** | Sitzung |
| 02.11.2026 | Google-Profil verknüpft (T05) | Link von Umut: `https://share.google/BT011aS1xjrJqsRlF`. Weiterleitung lesend geprüft (höchstens eine Anfrage pro Sekunde): Sie führt auf den Google-Eintrag „Fliesenverlegung Tezgel“ mit der Kennung `/g/11kh0hjr7c`, nicht auf „Özcan Tezgel“; den Inhalt der Suchseite liefert Google an Skripte nicht aus. Eingetragen in `src/config/google-profil.ts`: `sameAs` im LocalBusiness aller Seiten, „Alle Bewertungen bei Google lesen“ und die Google-Plakette führen auf das Profil. `hasMap` nur für Links aus Google Maps; dieser Link öffnet die Google-Suche, deshalb ohne `hasMap`. Die Gegenrichtung (Website `https://www.tezgel.de/` im Profil) pflegt Umut. **Wartet auf „live“.** | Umut im Chat, 02.11.2026: „https://share.google/BT011aS1xjrJqsRlF“ |
| 02.11.2026 | Offene Punkte und Google-Profil auf `main` | Fast-Forward `main` 645998d0 → d5a2ee2b (Commits 3d532b78 Mail, Beschreibung, Startseite; d5a2ee2b Google-Profil) nach Merge von `origin/main` (ohne Änderung) und grüner Prüfkette auf genau diesem Stand (Typprüfung, Lint, 290 von 290 Tests vor und nach dem Bau, Bau, `qa:graph`). Vercel-Deploy dpl_ebvGM3Zp6jEZaxx7vPRqrX7bECiZ READY auf www.tezgel.de und tezgel.de. Lesend geprüft (höchstens eine Anfrage pro Sekunde): `/` mit unverändertem Einstiegsfoto, den vier neuen Fotos der Galerie, dem Link auf das Profil, `sameAs` und der neuen Beschreibung; `/standorte/wetzlar`, `/referenzen` und `/leistungen/bad/giessen` mit 200, „index, follow“ und `sameAs`; nirgends mehr „fugenlose Großformate“ oder „schlüsselfertig“; Sitemap mit 164 Adressen. Die Bestätigungs-Mail ist nicht live geprüft (kein Aufruf von `/api/anfrage`). | Sitzung; Freigabe Umut, 02.11.2026: „live“ |
| 03.11.2026 | Snippet-Runde, Auftrag | Titel und Descriptions aller 164 Seiten auf die Breite im Suchergebnis bringen und den Platz ausschöpfen: Titel höchstens 561 px (Arial 20 px) mit 50 bis 58 Zeichen, Description höchstens 985 px (Arial 14 px) mit 140 bis 155 Zeichen (Grenzen von Screaming Frog, SISTRIX 990 px, abgerufen am 03.11.2026; Abschnitt 10). Das Okay gilt auch für T08 (Teilen-Bilder), T11 (Leistungsbeispiele mit Fotos) und die Bild-Sitemap. Je Seitengruppe Entwurf, zwei unabhängige Prüfer und Nacharbeit (Workflow), danach ein seitenweiter Abgleich. Besser ranken nur über bessere eigene Seiten, nie durch Eingriffe bei anderen | Umut im Chat, 03.11.2026: „Du hast mein Okay, um alles zu tun, was du tun musst, um es ganz oben und um meinen Vater Kunden zu bringen. … achte einfach darauf, dass die Längen und so Zeichenlängen fachgerecht und richtig sind.“ |
| 03.11.2026 | Live 4 vorbereitet | Auf `seo/lokal` mit voller Prüfkette je Stand: 438b0539 (T08: Teilen-Bild jeder Seite aus echten Fotos 1200 × 630 mit Alt-Text statt des Logos; T11: sechs Leistungsbeispiele mit je drei Fotos ähnlicher Arbeiten und einem Satz ohne Ort; Bild-Sitemap; „schlüsselfertig“ aus sichtbaren Texten; Vorspänne ohne Floskel; Pixelbreite `src/lib/seo/pixelbreite.ts`, Titelkarte `src/inhalte/meta/titel.ts`), 0e8558e2 (26 Kernseiten: 21 Titel und 24 Descriptions neu, Startseite mit unverändertem Titel; Tests 8b und 8c), 8cab2f82 und 7fd1208f (Befunde der Prüfung). Prüfung vor dem Live-Gang: drei Linsen (Code, Wahrheit, Suche), jeder schwere Befund gegengeprüft; zwei Blocker (Alt-Text „Travertin“ für ein Foto, das die Website als Fliesen in Travertinoptik führt; „Marken“ im Vorspann der Musterbäder) und vier wichtige Befunde (Fotos der Startseite in der Sitemap, die sie nicht zeigt; „Schlüsselfertig“ im Projektcheck; Überschrift der Leistungsbeispiele; Duschwanne als Teilen-Bild der Seiten über die Dusche ohne Stufe, jetzt siebtes Teilen-Bild aus nb-085) behoben, dazu kleine. Nachprüfung (zwei Linsen): kann live gehen, drei kleine Punkte behoben. Zwischenstand 438b0539 mit drei Lint-Warnungen (unbenutzte Importe im Test, ab 0e8558e2 genutzt). Nicht dabei: die übrigen 138 Seiten (Entwürfe, Prüfungen und Nacharbeit fertig; der seitenweite Abgleich brach am Nutzungslimit ab) | Sitzung; Umut im Chat, 03.11.2026: „Kannst du schon mal alles live stellen, was du schon hast?“, „Mach weiter und stell es live, sobald die Prüfer fertig sind“ |
| 07.11.2026 | Live 4 auf `main` | Fast-Forward `main` d5a2ee2b → 7fd1208f (21498f5c KONTEXT, 438b0539, 0e8558e2, 8cab2f82, 7fd1208f) nach Merge von `origin/main` (ohne Änderung) und grüner Prüfkette auf genau diesem Stand (Typprüfung, Lint ohne Meldung, 297 von 303 Tests vor und 303 von 303 nach dem Bau, Bau, `qa:graph`). Vercel-Deploy dpl_4mR7AScxxeYza8s9NLnic6ctZSBg READY. Lesend geprüft (höchstens eine Anfrage pro Sekunde): `/`, `/standorte/wetzlar`, `/kontakt`, `/preise`, `/referenzen/balkon-stelzlager`, `/naturstein`, `/bad/musterbaeder/luxus-bad-7` und `/bad/projekt-check` mit 200, „index, follow“, den neuen Titeln und Descriptions und dem Teilen-Bild 1200 × 630; `/bad/barrierefreies-bad` mit dem Duschbild; Sitemap mit 164 Adressen und 232 Bildern; robots.txt 200. Zwischen dem 03.11. und dem 07.11. hat keine andere Sitzung am Repo gearbeitet (GitHub, Vercel, Sitzungsliste geprüft) | Umut im Chat, 07.11.2026: „Stell bitte alles live.“ |
| 07.11.2026 | Marketing | Metricool ist in einem anderen Konto installiert und eingerichtet und soll täglich 1 bis 3 Posts automatisch auf allen Plattformen veröffentlichen. Für die Website ist dafür nichts zu tun; zusätzliches Tracking auf der Website (etwa ein Pixel von Metricool) nur mit Umuts Freigabe, über die Cookie-Einwilligung und nach Rechtsprüfung (M-11). Empfehlung: Links in den Posts mit UTM-Markierung, damit Google Analytics die Besuche aus den Posts zeigt. Das SEO-Paket für den Betrieb (`docs/seo/`) entstand und läuft in dieser Sitzung | Umut im Chat, 07.11.2026: „Metrico ist eingerichtet und wir werden jetzt auch komplett auf Marketing gehen.“, „Ja, aber das ist nicht in diesem Account. Also Metricool, das wurde auf jeden Fall installiert und das wurde auch konfiguriert.“ |
| 07.11.2026 | Live-Freigabe übrige 138 Seiten | Umut gibt den Live-Gang der übrigen 138 Seiten der Snippet-Runde frei, sobald der seitenweite Abgleich eingearbeitet, der Stand unabhängig geprüft und die Prüfkette auf genau diesem Stand grün ist (Antwort auf die Frage, ob diese Seiten danach direkt live dürfen) | Umut im Chat, 07.11.2026: „Und zu Punkt 2, ja, das darfst du. Du darfst alles live stellen.“ |
| 07.11.2026 | Snippet-Runde, übrige 138 Seiten auf `main` (Live 5) | Fast-Forward `main` 7fd1208f → 6b5a16e0 (08082673 Einbau: Vorlagen für die elf Ortsseiten ohne eigenen Inhalt und die 52 Seiten Leistung × Ort, 53 Titel und 74 Descriptions der übrigen Seiten; 7c2e6c7f Wohnen × Wetzlar und × Aßlar nach §6; 6b5a16e0 Tests; dazu drei KONTEXT-Commits) nach Merge von `origin/main` (ohne Änderung) und grüner Prüfkette auf genau diesem Stand (Typprüfung, Lint, 299 von 305 Tests vor und 305 von 305 nach dem Bau, Bau, `qa:graph`; Abgleich aller 164 Seiten im Bau mit den Endfassungen). Vorher: seitenweiter Abgleich (zwei Linsen; Faktenprüfung über 116 Seiten ohne Befund; Stellenanzeige verweist auf `/karriere`, Projektcheck und Leistungsbeispiel Fußbodenheizung klarer getrennt) und unabhängige Prüfung des Einbaus (zwei Linsen, kann live gehen; Befunde: Wohnen × Wetzlar und × Aßlar, Test 8b mit noindex- und Sitemap-Sicherung, Doppel über alle Seiten, Musterbad-Titel gleich der H1). Vercel-Deploy dpl_667A86SPG6V8kGemdFbwsceJU9V2 READY. Live geprüft (höchstens eine Anfrage pro Sekunde): alle 164 Adressen der Sitemap mit 200, ohne noindex, Titel und Description wortgleich mit den Endfassungen. Gegenüber dem Stand vor der Runde 137 Titel und 161 Descriptions neu; alle Titel höchstens 561 px, alle Descriptions höchstens 985 px (Tabelle `docs/seo/arbeit/snippets-alt-neu.md`). Offen: Linie „Komfort“ oder „Premium“ bei zwei Musterbädern (Umut); Seitentexte mit unbelegten Angaben für eine spätere Textrunde | Umut im Chat, 07.11.2026: „Du darfst alles live stellen.“ |
