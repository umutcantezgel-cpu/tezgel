# Befund: Garantien und Zertifikate in sichtbaren Texten

Stand 02.11.2026, Code-Stand `seo/lokal`. **Befund mit Vorschlägen, nichts davon ist geändert.**

## Warum das wichtig ist

- **Wahrheit:** Laut Faktenblatt (`_werkstatt/KERN.md`, Anhang F) gilt für Zusagen nur sinngleich „Festpreisangebot“ und „kostenfreier Termin“. „Zertifikate“ stehen dort unter „nicht verwenden“.
- **Offene Zusagen:** Ob es einen verbindlichen Festpreis, eine Staubschutz-Garantie oder feste Termine für Baustart und Fertigstellung gibt, ist offen. Das ist M-07, Fragenliste an Deniz Nr. 15.
- **Was die Werkstatt schon tut:** Sie hat das in ihren Vorlagen bereits abgesichert. `src/components/vorlagen/teile/Versprechen.tsx` bricht den Bau ab, wenn ein Garantie-Wort auftaucht. Die älteren Seiten unten sind davon nicht erfasst.
- **Vermutung, keine Rechtsauskunft:** Werbung mit dem Wort „Garantie“ kann Pflichtangaben zu den Garantiebedingungen nach sich ziehen. Das gehört in die Rechtsprüfung (M-11).

## Fundstellen (sichtbarer Text, im Code geprüft)

| Stelle | Wortlaut heute | Wo sichtbar | Vorschlag mit gleicher Bedeutung |
|---|---|---|---|
| `src/components/ui/FinalCTA.tsx:41-42` (Standardpunkte) | „Verbindlicher Festpreis ohne versteckte Kosten“, „Saubere Baustelle mit Staubschutz-Garantie“ | Abschluss aller Seiten, die keine eigenen Punkte setzen, unter anderem die Leistung-×-Ort-Seiten | „Festpreisangebot nach dem Termin vor Ort“, „Staubschutz in bewohnten Räumen“ (F-17) |
| `src/app/(bestand)/preise/page.jsx:62`, `:66`, `:202`, `:204`, `:256` | „Verbindliche Festpreisgarantie“, H1 „Kosten & Preise auf Anfrage. Verbindliche Festpreise.“, „Der vereinbarte Preis ist garantiert.“, „Saubere Baustelle mit garantiertem Staubschutz“ | `/preise` | „Festpreisangebot“; H1 zum Beispiel „Preise und Festpreisangebot“; „Den Preis nennen wir nach dem Termin vor Ort als Festpreisangebot.“; „Staubschutz in bewohnten Räumen“ |
| `src/app/(bestand)/faq/page.jsx:45`, `:63`; gleiche Antworten im Schema `faq/layout.tsx:42`, `:65` | „verbindlichen Bauzeitenplan mit festen Zusagen für Baustart und Fertigstellung“; „Gibt es bei Ihnen eine Festpreisgarantie? Ja! …“ | `/faq` und die strukturierten Daten (FAQPage) | Frage „Bekomme ich einen festen Preis?“, Antwort „Ja. Nach dem kostenfreien Termin vor Ort bekommen Sie ein Festpreisangebot.“; Bauzeit: „Den Ablauf und die Termine stimmen wir vor Baustart mit Ihnen ab.“ |
| `src/app/(bestand)/bad/musterbaeder/[slug]/page.jsx:187` | „Festpreisgarantie“, „Verbindlicher Bauzeitplan“ | 12 Musterbad-Seiten | „Festpreisangebot“, „Ablauf vorab abgestimmt“ |
| `src/app/(bestand)/bad/bad-aus-einer-hand/page.jsx:29`, `:76` | „garantierter Festpreis“, „garantieren wir Ihnen einen Ansprechpartner, einen Festpreis und termingerechte Fertigstellung mit null Stress“ | `/bad/bad-aus-einer-hand` und seine Beschreibung in den strukturierten Daten | „ein fester Ansprechpartner von der Planung bis zur Abnahme (F-13) und ein Festpreisangebot“ |
| `src/app/(bestand)/fliesen/neubau/page.jsx:239`, `:241-242` | „Festpreis und verbindlicher Bauzeitenplan“, „Start und Fertigstellung unserer Arbeiten sagen wir verbindlich zu“ | `/fliesen/neubau` | „Festpreisangebot und abgestimmte Termine“; „Start und Fertigstellung stimmen wir mit Ihrem Bauzeitenplan ab.“ |
| `src/app/(bestand)/partner/page.jsx:72` | „führende Materialpartner und zertifizierte Verlegesysteme renommierter Hersteller“ | `/partner` | „Verlegesysteme bekannter Hersteller“ (Partnerstatus und Zertifikate nicht verwenden) |
| `src/app/(bestand)/leistungen/[id]/page.jsx:68-76` | „garantieren zertifizierten Staubschutz“, „garantieren jahrzehntelange Sicherheit gegen Feuchtigkeit“, „kompromisslosem Staubschutz“, „maßgeschneiderte Wohlfühloasen“ | `/leistungen/bad`, `/wohnen`, `/aussen`, `/untergrund` | Staubschutz wie F-17 (Staubschutzwände oder -türen, Luftreiniger, Schutzabdeckungen, besenreine Übergabe); Abdichtung nach DIN 18534 (F-15) ohne Garantie; Floskeln raus |
| `src/components/sections/QualityPromise.jsx:22` | „Garantierter Standard“ | `/bad/badanfrage`, `/bad/bad-aus-einer-hand`, `/bad/projekt-check`, `/team`, `/downloads` | „Unser Standard“ |
| `src/app/llms.txt/route.ts:24`, `:43`, `:47` | „Zertifizierte Abdichtung“, „Vertrauensmerkmale & Garantien“, „Staubschutz-Garantie“ | `/llms.txt` (Text für KI-Dienste) | „Abdichtung nach DIN 18534“, „Vertrauensmerkmale“, „Staubschutz in bewohnten Räumen“ |
| `src/app/(bestand)/standorte/page.tsx:274` (Abschluss) | „Feste Terminabsprachen“ | `/standorte` | „Termine nach Absprache“ |
| `src/app/(bestand)/team/page.jsx:129` (Abschluss) | „Feste Terminzusagen“ | `/team` | „Termine nach Absprache“ |
| `src/config/cities.ts:57` (Text zu Friedberg) | „sauber abgestimmt und mit festen Terminen“ | `/standorte` und die vier Seiten Leistung × Friedberg | „sauber abgestimmt“ |
| `src/components/vorlagen/teile/Versprechen.tsx:77` (Qualitätsversprechen Punkt 5, auch für `QualityPromise.jsx`) | Titel „Verlässliche Termintreue und Bauzeitenplan“ über dem Text „Wir stimmen Baustart und Fertigstellung mit Ihnen ab“ | 133 Seiten | Titel „Abgestimmter Bauzeitenplan“ wie auf `/fliesen/festpreisangebot` |
| `src/inhalte/ueber-uns.ts:147`, `treppen/treppenhaus/page.jsx:133`, `bad/bad-aus-einer-hand/page.jsx:111` | „Termintreue und fester Preis“, „termintreu“ | `/ueber-uns`, `/treppen/treppenhaus`, `/bad/bad-aus-einer-hand` | „Abgestimmte Termine und fester Preis“, „auch im bewohnten Bestand“, „Persönlich und sauber“ |
| `bad/bad-aus-einer-hand/page.jsx:46`, `fliesen/festpreisangebot/page.jsx:42`, `beratung/page.jsx:61` | „ohne versteckte Kosten oder böse Überraschungen“, „ohne versteckte Zusatzkosten“, „ohne versteckte Kosten mit verlässlichem Zeitplan“ | drei Seiten | „Kalkulation aller Gewerke mit festem Preis“, Satz ohne den Zusatz, „Ausführliches Festpreisangebot mit abgestimmtem Zeitplan“ |
| `preise/page.jsx:211` | „Volle 5 Jahre Gewährleistung nach VOB … nach den strengen Richtlinien der Handwerkskammer Wiesbaden“ | `/preise` | „Im Bad dichten wir nach DIN 18534 ab. Die Gewährleistung regeln unsere AGB.“ Die Zahl steht nicht im Faktenblatt, die AGB nennen in § 4 die gesetzliche Frist nach BGB; Frage an Deniz |
| `leistungen/[id]/[stadt]/page.tsx:60-61` (Wohnen × Ort) | „geprüfter Fachbetrieb“, „erstklassiges Feinsteinzeug“, „Estrich-Belegreife“, „Vor-Ort-Aufmaß“ | 13 Seiten | „eingetragener Fachbetrieb“ (F-05, F-28), ohne Floskel und Bindestrichwörter |
| `src/inhalte/meta/leistungen.ts:9` (Description `/foerderung`) | „Die Pflegekasse zahlt mit Pflegegrad bis zu 4.180 € je Person dazu.“ | Suchergebnis von `/foerderung` | „Mit Pflegegrad kann die Pflegekasse bis zu 4.180 € je Person dazugeben.“ wie im Seitentext (F-23, F-25) |
| `src/config/company.js:174`, `:191`; `src/lib/config.ts:195` | „Garantierter Staubschutz bei Sanierungen“, „Staubschutz-Garantie“, „Staubschutz-Garantie bei bewohnten Sanierungen“ | Firmendaten und Konfiguration. Die Vorlagen zeigen sie schon ohne Garantie-Wort. | Firmendaten ändern sich nur mit Umuts Freigabe; Vorschlag wie oben |

**Milder, aber zu klären:**
- **„Termintreue“:** Seit der zweiten Gegenprüfung nimmt der Patch sie überall heraus, wo der Code sie zeigt. Es bleibt „Staubgeschützt, termintreu & DIN-gerecht“ auf drei Seiten aus den Firmendaten (`src/config/company.js:213`); das ändert sich nur mit Umuts Freigabe. „Pünktlich“ steht im Wortlaut einer Kundenstimme, der bleibt.
- **Fachwörter in neuen Sätzen älterer Seiten:** Die umgeschriebenen Einleitungen der vier Leistungsseiten, `/bad/bad-aus-einer-hand` und `/partner` nennen Fachwörter (zum Beispiel Abdichtung, DIN 18534, Estrich, Stelzlager) ohne Erklärung. Das war vorher genauso; die Erklärung gehört zur Überarbeitung der älteren Seiten (Plan, Abschnitt 6a).
- **Das Wort „verbindlich“** vor Festpreis oder Festpreisangebot steht zusätzlich in Descriptions der Werkstatt: `src/inhalte/meta/seiten.ts` (`/bad/musterbaeder`, `/bad/projekt-check`, `/faq`) und in der Antwort `faq/page.jsx:44`.
- **Einordnung (Vermutung):** Ein Angebot bindet nach dem BGB ohnehin; das Wort ist also weniger heikel als „Garantie“. Solange M-07 offen ist, bleibt der Wortlaut des Faktenblatts trotzdem sicherer: „Festpreisangebot“.
- **Eigene Vorschläge berichtigt:** Meine Vorschläge für `/preise` und `/bad/badsanierung` nutzen seit dem 02.11.2026 nur noch „Festpreisangebot“ (Plan, Tabelle 4b, und die Patches).

**Nicht gezählt:** Kommentare im Code und interne Zuordnungen. Ebenso Aussagen, die ausdrücklich keine Garantie geben (`/untergrund-abdichtung/entkopplung`: „eine Garantie gegen Risse gibt es nicht“), und der Datenschutz-Begriff „DPF zertifiziert“ im Cookie-Inventar.

## Die größte Quelle: das Qualitätsversprechen der älteren Seiten

- **Fakt (im gebauten HTML gezählt):** Auf 135 Seiten steht „Garantierter Staubschutz bei Sanierungen“, dazu „Verbindliche Festpreis-Kalkulation“ und „Feste Zusagen für Baustart und Fertigstellung“.
- **Woher:** Der Baustein `src/components/sections/QualityPromise.jsx` (auf etwa 48 Seitendateien, darunter die Vorlage der 52 Leistung-×-Ort-Seiten) zeigt die acht Punkte aus `src/config/company.js` im Rohwortlaut. Die Vorlagen der Werkstatt zeigen dieselben Punkte schon bereinigt (`PUNKTE` in `src/components/vorlagen/teile/Versprechen.tsx`).
- **Weitere Stellen:**
  - `/referenzen/<id>` zeigt die ersten vier Punkte im Rohwortlaut.
  - Die 13 Seiten „Wohnen × Ort“ sagen „mit Festpreisgarantie“ (`leistungen/[id]/[stadt]/page.tsx:59`).
  - Listen auf `/bad/bad-aus-einer-hand`, `/fliesen/festpreisangebot` und `/fliesen/neubau` sagen „Feste Zusagen für Start und Fertigstellung“.

## Fertiger Patch: `docs/seo/arbeit/zusagen.patch`

- **Anwenden** nach `p2.patch` und vor `p3-meta.patch`.
- **Inhalt:**
  - alle Fundstellen der Tabelle oben;
  - `QualityPromise.jsx` und `/referenzen/<id>` nutzen die bereinigte Fassung der Vorlagen. Die Firmendaten in `company.js` bleiben unverändert;
  - „mit Festpreisgarantie“ und „Feste Zusagen“ werden zu „Festpreisangebot“ und „abgestimmt“;
  - „Festpreisangebot mit festem Zeitplan“ in den Fragen der vier Leistungsseiten wird zu „Festpreisangebot“;
  - zu Wetzlar auf `/standorte` fällt „jeden Tag pünktlich auf Ihrer Baustelle“ weg (`src/config/cities.ts`);
  - seit der Gegenprüfung vom 02.11.2026 auch „Feste Terminabsprachen“ (`/standorte`), „Feste Terminzusagen“ (`/team`) und „mit festen Terminen“ im Text zu Friedberg.
- **Geprüft** in einer Arbeitskopie: Typprüfung, Lint, Build, 282 von 282 Tests, `qa:graph`. Zuletzt im Gesamtstand aller Patches nach der Gegenprüfung (289 von 289 Tests): Im gebauten HTML stehen keine Garantie, kein Zertifikat und keine festen Zusagen oder festen Termine mehr, außer den zwei Sätzen, die ausdrücklich keine Garantie geben.
- **Bleibt zur Entscheidung:** „verbindlicher Festpreis“ und „verbindliches Festpreisangebot“ auf 44 Seiten (im Bau gezählt), zum Beispiel in den Musterbädern, im Preisrechner („Angebot: Verbindlicher Festpreis“), auf `/fliesen/festpreisangebot` und `/fliesen/konfigurator`. Siehe „Milder, aber zu klären“.
- **Nicht genutzt:** `src/lib/config.ts:183` und `:195` („Feste Zusagen …“, „Staubschutz-Garantie …“) wird auf keiner Seite angezeigt.

## Vorschlag

1. Umut entscheidet, ob diese Texte jetzt geändert werden. Das sind Seitentexte, sie gehören zum Plan, Abschnitt 6a. Für die Firmendaten braucht es seine ausdrückliche Freigabe.
2. Deniz beantwortet M-07 (Fragenliste Nr. 15). Gibt er eine Zusage schriftlich frei, darf sie mit Datum und Quelle in KONTEXT.md Abschnitt 13 und wieder auf die Website.
3. Danach erweitert ein Test die Garantie-Prüfung der Werkstatt (`GARANTIE` in `Versprechen.tsx`) auf alle Seiten, damit solche Wörter nicht wieder auftauchen.
