# REF-start · Referenztext Startseite `/` (Erzählseite)

> Muster für alle Erzählseiten. Kern-Version 3.0, Lektorat E1-LEKT-REF-1 eingearbeitet (24.10.2026). Die Ich-Form der Lage-Fliesen ist gewollt: Sie gibt die Stimme des Kunden wieder. Zeilen mit „→“, „data-…“ und Klammerhinweisen sind Bauhinweise, kein Seitentext. Schreibweise: Fachwörter als `[[id|Wort]]` (wird zum Baustein `Fachwort`, Erklärung aus `src/config/glossar.ts`), Bilder als `{Bild: id}` (Bildplatz aus `_werkstatt/bildplaetze.md`), Daten als `{{COMPANY_DATA.…}}`. Kundenstimmen nur wörtlich aus `src/config/reviews.js`.

## Meta
- Titel (56 Zeichen): `Fliesenleger Aßlar und Wetzlar | Fliesenverlegung Tezgel`
- Beschreibung (146 Zeichen): `Fliesenverlegung Tezgel aus Aßlar: Badsanierung, Böden, Balkon und Terrasse für Wetzlar und Umgebung. Der Termin bei Ihnen vor Ort ist kostenfrei.`
- H1: `Wir verlegen Fliesen in Bad, Küche, Flur und auf dem Balkon.`
- Suchbegriffe aus E0 (bleiben im Text): Fliesenleger, Aßlar, Wetzlar, Badsanierung, große Fliesen (fugenarm), Terrasse, Abdichtung DIN 18534, Termin vor Ort.

## 1 · Worum es geht (erster Bildschirm)
- Ort (data-erstes-bild="ort"): `Fliesenleger Deniz Tezgel aus Aßlar, für Wetzlar und die Orte rundherum.`
- H1 (data-erstes-bild="ueberschrift"): `Wir verlegen Fliesen in Bad, Küche, Flur und auf dem Balkon.`
- Vorspann: `Deniz Tezgel kommt selbst zu Ihnen, schaut sich alles an und sagt Ihnen, was zu tun ist. Danach verlegt er mit seinem Team Fliese für Fliese.`
- Hauptknopf (data-hauptknopf, data-erstes-bild="hauptknopf"): `Termin vor Ort anfragen` → `#termin`
- Kontakt (data-erstes-bild="kontakt"): `Anrufen: {{COMPANY_DATA.contact.phone}}` · `Nachricht per WhatsApp`
- Bild: `{Bild: start-dusche}` Alt: `Dusche ohne Stufe mit großen grauen Fliesen und einer Glaswand`
- Kennzeile unter dem Bild: `5,0 von 5 Sternen · 27 Bewertungen bei Google` (aus `RATING_SUMMARY`, zwei getrennte Elemente mit Trennzeichen „·“ im Text)

## 2 · Ihre Lage
- H2: `Was möchten Sie ändern?`
- Satz: `Wählen Sie, was am besten passt. Sie kommen direkt zu den Bildern und Antworten für Ihre Lage.`
- Sechs Fliesen (eine Aussage je Fliese, Link auf die Seite):
  1. `Die Badewanne soll raus. Ich möchte eine Dusche ohne Stufe.` → `/bad/barrierefreies-bad`
  2. `Das ganze Bad ist alt und soll neu werden.` → `/bad/badsanierung`
  3. `Im Neubau sollen Böden und Wände gefliest werden.` → `/fliesen/neubau`
  4. `Eine Fliese ist gesprungen, oder die Fugen sind alt.` → `/fliesenreparatur`
  5. `Auf dem Balkon bleibt nach dem Regen Wasser stehen.` → `/balkon-terrasse`
  6. `Die Treppe vor dem Haus ist kaputt.` → `/treppen/aussentreppe`

## 3 · Was wir tun
- H2: `Wir kümmern uns um alles, was mit Fliesen zu tun hat.`
- Absatz: `Wir nehmen alte Fliesen heraus und bereiten den [[untergrund|Untergrund]] vor. Dann verlegen wir neue Fliesen, auch große Fliesen mit wenigen Fugen. Am Ende ist alles sauber, und Sie können Ihren Raum wieder nutzen.`
- Vier Bereiche (je eine Zeile, Link):
  - `Badsanierung und neue Dusche` → `/bad`
  - `Böden und Wände in Haus und Wohnung` → `/leistungen/wohnen`
  - `Balkon, Terrasse und Treppen` → `/balkon-terrasse`
  - `Reparatur von Fliesen und Fugen` → `/fliesenreparatur`
- Drei Belege aus dem Faktenblatt (je ein Satz, kein Etikett):
  - `Seit 2008 sind wir bei der Handwerkskammer Wiesbaden eingetragen.`
  - `Die [[abdichtung|Abdichtung]] machen wir nach [[din-18534|DIN 18534]]. So kommt kein Wasser in Wand und Boden.`
  - `Wohnen Sie während der Arbeiten im Haus, schützen wir Ihre Räume vor Staub.`
- Großer Moment `startbild` sitzt im ersten Bildschirm (siehe 1).

## 4 · So läuft es ab
- H2: `So kommen Sie zu Ihrem neuen Boden.`
- Drei Schritte (Bestand: Ablauf in drei Schritten, F-11; kostenfrei F-12; Festpreis M-07):
  1. `Termin bei Ihnen vor Ort` · `Deniz Tezgel kommt zu Ihnen. Er schaut sich den Raum genau an und prüft den Untergrund. Dieser Termin ist für Sie kostenfrei.`
  2. `Planen und auswählen` · `Sie suchen mit uns Fliesen, ihre Größe und die Farbe der Fugen aus. Danach bekommen Sie ein Angebot mit festem Preis.`
  3. `Verlegen und übergeben` · `Wir verlegen sauber und übergeben den Raum besenrein. Zum Schluss gehen wir alles gemeinsam durch.`

## 5 · Beleg
- H2: `So sieht unsere Arbeit aus.`
- Sechs Fotos aus der Galerie (je Raum eins: Dusche, Bad, Balkon, Terrasse, Treppe, Baustelle), jedes mit kurzer Unterschrift, zum Beispiel `{Bild: start-galerie-1}` `Dusche mit Sitzbank und Mosaik`.
- Link: `Alle Arbeiten ansehen` → `/referenzen`
- H2: `Das sagen unsere Kunden.`
- Drei Stimmen wörtlich aus `REVIEWS` (Elke S., C. W., Rabia Ö.), gekürzt nur mit „…“, Quelle `Google`.
- Kennzeile: `5,0 von 5 Sternen · 27 Bewertungen bei Google · Stand September 2026`
- H2: `Hier sind wir für Sie unterwegs.`
- Satz: `Unser Betrieb sitzt in Aßlar. Wir arbeiten in Wetzlar, Gießen, Herborn und den Orten rundherum.`
- Ortsliste (alle 13 aus `CITIES`, Link je Ort) und Link `Alle Orte ansehen` → `/standorte`

## 6 · Nächster Schritt
- H2 (id `termin`): `Termin vor Ort anfragen`
- Satz: `Schreiben Sie uns Ihren Namen und Ihre Telefonnummer. Deniz Tezgel ruft Sie zurück und macht einen Termin mit Ihnen aus.`
- Formular: Logik und Pflichtfelder von `HeroContactForm` unverändert (Pflicht Name und Telefon). Bestehende Zusage im Formular bleibt wörtlich (M-07).
- Daneben: `Lieber anrufen? {{COMPANY_DATA.contact.phone}}` · `Nachricht per WhatsApp` · Öffnungszeiten aus `COMPANY_DATA.hours`.
