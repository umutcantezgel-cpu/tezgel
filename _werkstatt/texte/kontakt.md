# kontakt · Seitentext `/kontakt` (Arbeitsseite)

> Format wie `REF-start.md`, für die Arbeitsseite nach K-009 mit fünf Abschnitten (ohne „6 · Nächster Schritt“). Zeilen mit „→“, „data-…“ und Klammerhinweisen sind Bauhinweise, kein Seitentext. Firmendaten nur als `{{COMPANY_DATA…}}`. Öffnungszeiten nach M-03 als Text: „Samstag nach Vereinbarung“. Das Formular bleibt wie im Bestand (HeroContactForm), seine Zusage steht im Formular selbst.

## Meta
- Titel (54 Zeichen): `Kontakt und Termin vor Ort | Fliesenleger Tezgel Aßlar`
- Beschreibung (153 Zeichen): `Fliesenleger Tezgel in Aßlar: Anruf, WhatsApp oder Anfrage. Der Termin vor Ort ist kostenfrei. Persönliche Beratung und Festpreis für Wetzlar und Hessen.`
- H1: `Nehmen Sie Kontakt auf. Wir kommen für einen Termin zu Ihnen.`
- Suchbegriffe aus E0 (bleiben im Text): Kontakt, Fliesenleger Tezgel Aßlar, Termin vor Ort (ersetzt Vor-Ort-Aufmaß), kostenfrei, persönliche Beratung, Festpreis, Wetzlar, Hessen.

## 1 · Worum es geht (erster Bildschirm)
- Ort (data-erstes-bild="ort"): `Fliesenleger Deniz Tezgel aus Aßlar in Hessen, für Wetzlar und die Orte rundherum.`
- H1 (data-erstes-bild="ueberschrift"): `Nehmen Sie Kontakt auf. Wir kommen für einen Termin zu Ihnen.`
- Vorspann: `Wollen Sie Ihre Badewanne gegen eine Dusche ohne Stufe tauschen oder einen Boden neu verlegen lassen? Dann genügt ein Anruf oder eine kurze Nachricht. Der Termin bei Ihnen vor Ort ist für Sie kostenfrei, und wir beraten Sie dabei persönlich.`
- Hauptknopf (data-hauptknopf, data-erstes-bild="hauptknopf"): `Termin vor Ort anfragen` → `#termin` (zeigt auf das Formular unter Abschnitt 2)
- Kontakt (data-erstes-bild="kontakt"): `Anrufen: {{COMPANY_DATA.contact.phone}}` · `Nachricht per WhatsApp`

## 2 · Termin vor Ort anfragen
- H2 (id `termin`): `Termin vor Ort anfragen`
- Satz: `Wählen Sie Ihr Vorhaben, dann tragen Sie Ihren Namen und Ihre Telefonnummer ein. Deniz Tezgel ruft Sie zurück und macht einen Termin mit Ihnen aus.` (Formular HeroContactForm unverändert: Pflichtfelder Name und Telefon; die Zusage im Formular bleibt wörtlich, M-07)

## 3 · Andere Wege
- H2: `Lieber anrufen oder schreiben?`
- Telefon: `{{COMPANY_DATA.contact.phone}}` (Anruf, K-015 F-04)
- Mobil und WhatsApp: `{{COMPANY_DATA.contact.mobile}}` · `Nachricht per WhatsApp` (Link, Funktion F-10)
- E-Mail: `{{COMPANY_DATA.contact.email}}` (K-015 F-04)
- Adresse unseres Betriebs: `{{COMPANY_DATA.address.fullAddress}}` (K-015 F-03)
- Satz: `Seit 2008 sind wir als Handwerksbetrieb bei der Handwerkskammer Wiesbaden eingetragen.` (K-015 F-05, F-06)
- Einsatzgebiet: `Wir arbeiten in Aßlar, Wetzlar, Gießen, Herborn und Dillenburg.` (K-015 F-09)
- Anfahrt: `Den Weg zu uns zeigt eine Karte. Sie erscheint, wenn Sie auf „Karte laden & zustimmen“ klicken.` (Karte hinter Einwilligung, Funktion F-12; Knopftext aus `MapConsentGate.tsx:118`; Einwilligung unverändert, Funktion F-11)
- Öffnungszeiten: `Öffnungszeiten: Montag bis Donnerstag 7:30 bis 18 Uhr, Freitag 7:30 bis 17 Uhr, Samstag nach Vereinbarung.` (K-015 F-07; Freitag 17 Uhr wie im Bestand company.js:125, M-03 offen: company.js:128 sagt 18 Uhr)
- Bild: `{Bild: kontakt-eingang}` Alt: `Hauseingang mit Podest und beigen Fliesen` (kleines Bild neben den Kontaktwegen; Alt-Text aus `bildplaetze.md`, Motiv nicht gegengesichtet, siehe OFFENE FRAGEN)

## 4 · Hilfen
- H2: `Hilfen, wenn Sie vorher planen möchten.`
- Satz: `Diese beiden Hilfen können Sie nutzen, müssen Sie aber nicht. Beide führen zu einem Termin bei Ihnen vor Ort.`
1. `Anfrage in drei Schritten` · `Sie beschreiben Ihr Vorhaben Schritt für Schritt.` (Nebenknopf, Link #express-anfrage, Funktion F-03; der Name Express-Anfrage steht nicht im Text, weil K-010-B ihn nicht erlaubt, siehe OFFENE FRAGEN)
2. `Termin im Kalender` · `Wählen Sie direkt einen freien Tag und eine Uhrzeit.` (Link `/kontakt#termin-buchen`, Funktion F-07)

## 5 · Was nach Ihrer Anfrage passiert
- H2: `Was nach Ihrer Anfrage passiert.`
- Satz: `So läuft es in drei Schritten ab.` (K-015 F-11)
1. `Termin bei Ihnen vor Ort` · `Deniz Tezgel kommt zu Ihnen. Er schaut sich den Raum genau an und prüft den [[untergrund|Untergrund]].`
2. `Planen und auswählen` · `Sie suchen mit uns die Fliesen aus, dazu die Größe und die Farbe der Fugen. Danach bekommen Sie ein Angebot mit festem Preis.` (M-07 offen)
3. `Verlegen und übergeben` · `Wir verlegen die Fliesen und übergeben Ihnen den Raum sauber gefegt. Zum Schluss gehen wir alles gemeinsam durch.`
- Absatz: `Wohnen Sie während der Arbeiten im Haus, schützen wir Ihre Räume vor Staub. Deniz Tezgel bleibt in allen drei Schritten Ihr fester Ansprechpartner.` (K-015 F-17, F-13; eine Staubschutz-Garantie steht nicht im Text, M-07)
