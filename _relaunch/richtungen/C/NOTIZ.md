# Richtung C · Angestrichen

## Leitidee
Die Seite ist Deniz Tezgels Aufmaßblatt: Im Text steht das Wort der Kunden, am Rand steht mit Rotstift, was der Inhaber dafür tut. Vertrauen wird zitiert und angestrichen, nicht behauptet.

## Herleitung aus dem Markenaspekt
Markenaspekt: Inhaber und Weiterempfehlung. Tezgel wirbt nach eigenem Motto nicht selbst („Die Zufriedenheit unserer Kunden ist die beste Reklame für uns.“). Seine Werbung sind die Kunden, und sein Werkzeug für die Nähe ist der Termin vor Ort, bei dem er persönlich aufmisst. Daraus ergeben sich die drei Bausteine:
- **Blatt** (Aufmaßnotiz auf Kästchenpapier): Fläche Papier/Karton, ein 24-px-Raster als Fugenraster, Vordruck in Mono.
- **Wort** (Kundenstimmen, Motto): eine Zeitungs-Antiqua, wörtlich zitiert, mit Name und Quelle.
- **Rotstift** (die Hand des Inhabers): Er streicht an, was Kunden loben (unterstreichen), hakt ab, was er prüft (Ebenheit, Restfeuchte, Tragfähigkeit), und schreibt an den Rand, welche Zusage dahintersteht (Ablauf 01–03, Leistung, Direktkontakt).

Der Einstieg setzt das Motto als Überschrift. „Kunden“ wird mit Rotstift unterstrichen, und gleich daneben (Desktop) oder darunter (mobil) steht eine echte Stimme: „… kam Herr Tezgel kurzfristig zur Absprache …“. So wird die Behauptung im selben Blick durch ein Zitat belegt.

## Austauschprobe (warum nur Tezgel)
- Das Motto ist Tezgels eigener Satz. Ein anderer Betrieb müsste den Einstieg ganz neu schreiben.
- Die Randnotizen ordnen jede Stimme Tezgels eigenem Ablauf zu: „kurzfristig“ → 01 Planung & Aufmaß vor Ort, „präzise“ → 02 Material & Fugenbild (Fugenachsen, R10/R11), „pünktlich“ → 03 Ausführung & Abnahme (besenreine Endreinigung), „barrierefrei“ → Leistung Walk-In-Duschen. Ohne diese Stimmen und diesen Ablauf bleibt vom Abschnitt nichts übrig.
- Der Aufmaßzettel prüft Fliesen-Untergrundkriterien (Ebenheit, Restfeuchte, statische Tragfähigkeit). Ein Malerbetrieb hat diese Liste so nicht.
- Kachelraster, Fugenkreuz, Maßlinie und der Zollstock als Sprechblase stammen aus dem Fliesenhandwerk. Das Raster ist zugleich das 24er-Ikonenraster.
- Grenzfall: Rotstift und Kästchenpapier allein wären austauschbar. Spezifisch wird es erst durch die Kopplung von echter Stimme, Tezgels Ablauf und dem Inhaber. Diese Kopplung muss in jedem Abschnitt erhalten bleiben (siehe Risiken).

## Schriften (Pool, OFL, latin, base64)
- **Wort · Newsreader** (variabel, opsz + wght, 420–500): Motto, Stimmen, Überschriften. Die Optical-Size-Achse hält die Antiqua bei 92 px straff und bei 20 px offen. Sie klingt nach gedrucktem Zitat, nicht nach Werbeschrift, und hebt sich deutlich von der heutigen Plus-Jakarta-Optik ab.
- **Gebrauch · Atkinson Hyperlegible Next** (wght 400–700): Fließtext, Knöpfe, Formular. Sie wurde für Leserinnen und Leser mit Sehschwäche entwickelt, passt zur Zielgruppe 35–75 und unterscheidet 1/l/I und 0/O klar (wichtig bei Telefonnummern).
- **Vordruck · IBM Plex Mono 400**: Schritte, Normen, Orte, Quellen. Es ist das, was auf einem Aufmaßblatt vorgedruckt steht. Verwendung nur in Sentence Case, nie im Fließtext.
- Skala: 8 Stufen von --fs-xs bis --fs-4xl, alle als `clamp(rem, rem + vw, rem)`, Verhältnis Max/Min höchstens 2,42 (4xl). Werte stehen in der Kachel unter C · 3. Display-Zeilenhöhe 1,0, Titel 1,1, Text 1,6, Maß 66ch.
- „Verbundabdichtung“ läuft mit 38 px bei 375 px Breite ohne Überlauf (geprüft).

## Palette (Abstufungsregel: Flächen OKLCH L ≥ 85 %, Schrift L ≤ 50 %)
| Rolle | Hex | Kontrast (WCAG, gerechnet) |
|---|---|---|
| Papier · Grundfläche | #F5F1E8 | Tinte 16,56 |
| Karton · Zettel, deaktiviert | #EAE3D3 | Tinte 14,60 · Bleistift 5,22 |
| Raster · Fugenlinien (nur Deko) | #D8CFBC | auf Papier 1,37 (kein Text) |
| Bleistift · Nebentext, Feldränder | #575C6B | Papier 5,92 · Karton 5,22 |
| Tinte · Text, Hauptknopf, Fokus (Logo-Navy) | #0A1129 | Papier 16,56 · Karton 14,60 |
| Rotstift · Anstrich, Fehler | #B3241B | Papier 5,85 · Karton 5,16 · auf Tinte 2,83 = verboten |
| Haken · Erfolg | #2D6A43 | Papier 5,72 · Karton 5,05 |

Logo-Rot #D82020 erreicht auf Papier nur 4,49:1 und bleibt deshalb in der Wortmarke. Das Orange des Overalls kommt in der Palette nicht vor, damit das Logo der einzige warme Farbfleck im Kopf bleibt. Fokusring: 2 px Tinte mit 2 px Abstand (16,56:1); auf dunklen Flächen Papier.

## Formsystem: Lineal und Rotstift
- **Lineal (geometrisch):** 24er-Raster, Schutzzone 2, Strich 1,75, runde Enden und Verbindungen, Ecken r 2 wie eine gefaste Fliese, `currentColor`. Eigene Details sind die Maßlinie (Großformat) und das Fugenkreuz (Trenner „Fugenschnur“, später auch Aufzählungszeichen). Die Ikonen sind Telefon, Sprechblase (generisch), Bad, Großformat, Abdichtung und Ort.
- **Rotstift (frei, von Hand):** genau vier Anstriche, nämlich Unterstreichen, Haken, Randstrich und Zeiger. Je Abschnitt höchstens einer davon als Hauptgeste.
- **Motiv:** ein Zollstock, zur Sprechblase gefaltet (Maß und Wort). Die Gelenke liegen auf Rasterpunkten. Einsatzorte: Kontaktseite, 404, Leerzustände.
- Das Raster wird mit harten 1-px-Linien per `linear-gradient` gezeichnet. Das ist eine Linientechnik ohne sichtbaren Farbverlauf.

## Signaturmomente (Vorschläge für die ganze Website)
1. **Unterstreichen** (in der Kachel, `unterstreichen`): Tritt eine Kundenstimme ins Bild, streicht der Rotstift ihr Schlüsselwort an (Wisch-Enthüllung per Gegen-Translate, 900 ms, --k-stift). Danach erscheint die Randnotiz mit Tezgels Zusage. *Austauschprobe:* Ohne Tezgels Stimmen und Ablauf bleibt nur ein Strich ohne Aussage. Bestanden, solange die Randnotiz immer auf echten Ablauf oder echte Leistung verweist.
2. **Abhaken beim Aufmaß** (Einstieg, `einstieg-haken`; später Ablaufseite): Ebenheit, Restfeuchte und statische Tragfähigkeit werden nacheinander abgehakt, so wie bei der Begehung vor Ort. Auf der Ablaufseite wird jeder Schritt 01–03 beim Erreichen abgehakt. *Austauschprobe:* Die Prüfpunkte sind Fliesen-Untergrundprüfung, bestanden.
3. **„Notiert.“** (Formular-Erfolg, `erfolg-haken`): Nach dem Absenden erscheint die Anfrage als Notiz mit grünem Haken: „Ihre Anfrage liegt bei Deniz Tezgel.“ Die Telefonnummer steht direkt daneben. *Austauschprobe:* Ohne den Inhabernamen wäre das generisch. Der Name muss bleiben.
Gemeinsamer Rahmen: Signatur ≤ 1600 ms, nur transform/opacity, reduziert als Überblendung oder Sofortzustand, ohne JS alles sichtbar.

## Umgang mit echten Fotos (später)
- Nur echte Baustellen- und Ergebnisfotos, keine KI-Bilder. Zuschnitt 4:3 oder 3:4, Kanten auf die 24er-Kachel gerastert, Radius 2 px, keine Duoton- oder Farbfilter (Fliesenfarben müssen stimmen).
- Bildunterschrift im Vordruck („Wetzlar · Badsanierung“) und nur mit echten Angaben.
- Der Rotstift darf ein Detail im Foto anstreichen (z. B. eine Fugenachse oder eine Edelstahlschiene), höchstens einmal pro Bild und nur, wenn es im Text erklärt wird.
- Ein Inhaberfoto (Deniz Tezgel beim Aufmaß) wäre das stärkste Bild dieser Richtung, siehe offene Fragen.

## Risiken
- **Kitschgefahr Schulheft:** Zu viel Rotstift wirkt wie Korrektur oder Tadel. Gegenmittel: höchstens eine Hauptgeste je Abschnitt, Rot nie als Fläche. Rot steht auch für Fehler; die Bedeutung trägt deshalb die Form (Strich = Lob, Rahmen + Zeichen + Text = Fehler).
- **Abhängigkeit von Stimmen:** Die Richtung lebt von Zitaten. Bei wenigen oder veralteten Bewertungen verliert sie Kraft. Die Stimmen brauchen Pflege und Freigabe.
- **Display-Antiqua mobil:** Das Motto mit 38 px braucht 4 Zeilen. Die Knöpfe stehen bei 812 px Höhe noch im ersten Bildschirm, bei kleineren Geräten (667 px) knapp darunter. Bei Bedarf rückt die Kurzstimme unter die Knöpfe.
- **Bildschirmfotos und IntersectionObserver:** Ganzseitenfotos lösen den Observer nicht aus. Die Seite erkennt deshalb `navigator.webdriver` und zeigt dann den Endzustand. Mit `?bewegung` lässt sich die Bewegung im Test erzwingen.
- **Rohwerte außerhalb :root:** SVG-interne Strichstärken (1,75 / 18 / 13 …), Zeilenhöhen 1,2–1,35 für Kurzzitate und `scale(.98)` stehen direkt im Code, nicht als Variable. Für den KERN sollten Strichstärke und Zitat-Zeilenhöhe als Token nachgezogen werden.
- **Silbentrennung:** `hyphens:auto` hängt vom Trennwörterbuch des Browsers ab. Die Größen sind so gewählt, dass die längsten Wörter auch ohne Trennung passen.

## Offene Fragen
- OFFENE FRAGE: Gibt es ein echtes Foto von Deniz Tezgel (beim Aufmaß oder in der Werkstatt) und dürfen wir es verwenden?
- OFFENE FRAGE: Dürfen die Kundenstimmen mit gekürztem Namen und dem Zusatz „Google“ so gezeigt werden (Einwilligung, Bewertungsrichtlinien)?
- OFFENE FRAGE: Darf „kostenfrei“ am Aufmaß-Knopf stehen? Es steht in der Projektbeschreibung, aber nicht in den freigegebenen echten Inhalten. In der Kachel ist es deshalb weggelassen.
- OFFENE FRAGE: Soll „Werkstatt“ (aus dem Markenaspekt) eine eigene Seite oder einen Abschnitt bekommen? Dafür fehlen echte Inhalte.
