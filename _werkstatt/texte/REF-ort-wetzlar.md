# REF-ort · Referenztext Ortsseite `/standorte/wetzlar` (Ortsseite, Muster aller 13 Orte)

> Ortsseiten unterscheiden sich nur durch echte Angaben aus `src/config/cities.ts` (Name, Region, Entfernung) und aus dem Bestand; keine erfundenen Projekte im Ort. Platzhalter im Muster: `{stadt}`, `{region}`, `{km}`. Kern-Version 3.0.

## Meta (Muster, Beispiel Wetzlar)
- Titel: `Fliesenleger in {stadt} | Fliesenverlegung Tezgel` (Wetzlar: 49 Zeichen; längster Ort „Limburg an der Lahn“: 60 → für Limburg `Fliesenleger in Limburg | Fliesenverlegung Tezgel`)
- Beschreibung: `Fliesenleger für {stadt}: Wir erneuern Bäder, verlegen Böden und machen Balkone dicht. Der Termin bei Ihnen vor Ort ist kostenfrei.` (Wetzlar 131, Limburg an der Lahn 143 Zeichen; je Ort prüfen, 120 bis 155)
- H1: `Fliesenleger in {stadt}`
- Suchbegriffe aus E0: Fliesenleger {stadt}, Badsanierung {stadt}, Fliesenverlegung {stadt}.

## 1 · Worum es geht
- Brotkrumen: `Start › Wo wir arbeiten › {stadt}`
- Ort: Wetzlar: `Fliesenverlegung Tezgel aus Aßlar, direkt neben Wetzlar.` · andere Orte: `Fliesenverlegung Tezgel aus Aßlar, etwa {km} km bis {stadt}.` (Bezug der Entfernung laut Bestand: Wetzlar Stadtmitte, M-04)
- H1: `Fliesenleger in {stadt}`
- Vorspann: `Wir machen Badsanierung und Fliesenverlegung in {stadt}. Balkone machen wir dicht.`
- Hauptknopf: `Termin vor Ort anfragen` → `/kontakt` · Kontakt: `Anrufen: {{COMPANY_DATA.contact.phone}}`

## 2 · Ihre Lage
- H2: `Sie suchen einen Fliesenleger in {stadt}?`
- Absatz: `Ja, wir arbeiten in {stadt} und {im_region}.` (Wetzlar: `im Lahn-Dill-Kreis`; Präposition und Name aus `region` in `src/config/cities.ts`, F-09)
- Absatz: `Haben Sie ein altes Bad, einen neuen Boden oder einen Balkon, der nicht mehr dicht ist? Dann kommen wir zu Ihnen nach {stadt} und sehen uns alles an.`

## 3 · Was wir tun
- H2: `Das machen wir in {stadt}.`
- Einleitung: `Wir prüfen zuerst den [[untergrund|Untergrund]]. Im Bad und auf dem Balkon kommt eine [[abdichtung|Abdichtung]] nach [[din-18534|DIN 18534]] unter die Fliesen.` (Fachwörter hier, nicht in den Linknamen: die Glossarklammer gehört in den Fließtext, E-025)
- Vier Zeilen mit Link auf die Leistung im Ort (`/leistungen/{id}/{stadt}`): `Badsanierung und Dusche` · `Böden und Wände` · `Balkon und Terrasse` · `Untergrund und Abdichtung`

## 4 · So läuft es ab
- Drei Schritte wie auf der Startseite (gleicher Text), ohne Ortsbezug.

## 5 · Beleg
- H2: `So sieht unsere Arbeit aus.`
- Drei Fotos aus der Galerie mit Unterschrift; **kein** Ortsbezug an den Fotos (die Projektorte sind nicht bekannt).
- Eine Stimme wörtlich aus `REVIEWS`.
- Gezeichnete Karte (klein, statisch): Aßlar in der Mitte, {stadt} markiert. Die echte Karte nur nach Einwilligung (bestehendes `MapConsentGate`).

## 6 · Nächster Schritt
- H2: `Termin in {stadt} anfragen`
- Satz: `Schreiben Sie uns oder rufen Sie an. Wir sprechen einen Termin bei Ihnen in {stadt} ab.`
- Formular: bestehende Schnellanfrage (`LeadQuickForm`, Pflichtfelder und Zusage unverändert).
- Nachbarorte: `Wir arbeiten auch in:` fünf nächstgelegene Orte aus `CITIES` (vorhandene Logik `getNearbyCities`).
