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
| `src/config/company.js:174`, `:191`; `src/lib/config.ts:195` | „Garantierter Staubschutz bei Sanierungen“, „Staubschutz-Garantie“, „Staubschutz-Garantie bei bewohnten Sanierungen“ | Firmendaten und Konfiguration. Die Vorlagen zeigen sie schon ohne Garantie-Wort. | Firmendaten ändern sich nur mit Umuts Freigabe; Vorschlag wie oben |

**Milder, aber zu klären:**
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
  - zu Wetzlar auf `/standorte` fällt „jeden Tag pünktlich auf Ihrer Baustelle“ weg (`src/config/cities.ts`).
- **Geprüft** in einer Arbeitskopie: Typprüfung, Lint, Build, 282 von 282 Tests, `qa:graph`. Im gebauten HTML stehen danach keine Garantie, kein Zertifikat und keine festen Zusagen mehr, außer den zwei Sätzen, die ausdrücklich keine Garantie geben.
- **Bleibt zur Entscheidung:** „verbindlicher Festpreis“ und „verbindliches Festpreisangebot“ auf 44 Seiten (im Bau gezählt), zum Beispiel in den Musterbädern, im Preisrechner („Angebot: Verbindlicher Festpreis“), auf `/fliesen/festpreisangebot` und `/fliesen/konfigurator`. Siehe „Milder, aber zu klären“.
- **Nicht genutzt:** `src/lib/config.ts:183` und `:195` („Feste Zusagen …“, „Staubschutz-Garantie …“) wird auf keiner Seite angezeigt.

## Vorschlag

1. Umut entscheidet, ob diese Texte jetzt geändert werden. Das sind Seitentexte, sie gehören zum Plan, Abschnitt 6a. Für die Firmendaten braucht es seine ausdrückliche Freigabe.
2. Deniz beantwortet M-07 (Fragenliste Nr. 15). Gibt er eine Zusage schriftlich frei, darf sie mit Datum und Quelle in KONTEXT.md Abschnitt 13 und wieder auf die Website.
3. Danach erweitert ein Test die Garantie-Prüfung der Werkstatt (`GARANTIE` in `Versprechen.tsx`) auf alle Seiten, damit solche Wörter nicht wieder auftauchen.
