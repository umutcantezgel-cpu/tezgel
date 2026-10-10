# Richtung B · Streiflicht

Markenaspekt: Material, Fläche und Licht – das fugenarme Großformat, ruhige keramische Flächen, Wasser und Abdichtung, Streiflicht auf planebener Fläche: Ruhe als Luxus.

## Leitidee (ein Satz)
Die Website ist eine planeben verlegte Großformatfläche: wenige große Platten, gegliedert nur von der 2-mm-Fuge, im Drittelverband versetzt – und ein Licht, das flach von links kommt und zeigt, dass nichts übersteht.

## Herleitung aus dem Markenaspekt
- **Fläche:** Das Wertvollste an einem fugenarmen Großformat ist, was *nicht* da ist: Fugen, Kanten, Unruhe. Die Seite überträgt das wörtlich – große, leere Platten statt Kartenrastern; freie Fläche ist der Luxus.
- **Fuge:** Die einzige Gliederung ist die Fuge (2 px, Kalk 300). Technisch ist sie die Lücke eines CSS-Grids über einem fugenfarbenen Grund – das Layout *ist* ein Verlegeplan.
- **Format:** Platten haben echte Formate: XXL 3 : 1 im ersten Bildschirm (12 Spalten), Großformat 2 : 1 (6 Spalten), am Rand Zuschnitte wie am Wandanschluss. Mobil steht die Platte hochkant (3 : 4) und läuft zwischen zwei durchgehenden Randzuschnitten.
- **Drittelverband:** Jede Reihe ist um 2 von 12 Spalten (= ⅓ Platte) versetzt – so verlegt man rechteckige Großformate fachgerecht, nicht im Halbverband. Das ist der Detailgrad, an dem ein Fliesenleger seinesgleichen erkennt.
- **Licht:** Streiflicht ist das Prüfwerkzeug des Fliesenlegers – flach einfallendes Licht zeigt jeden Überstand. Daraus folgen: eine Lichtquelle von links, Lichtkante links/oben an jeder Platte (`--s-kante`), Schatten nur nach rechts (`--s-streif`) und das Streiflicht als einzige inszenierte Bewegung.
- **Wasser und Abdichtung:** Eine einzige Bedeutungsfarbe, Wasserblau (#1D5868), steht für Abdichtung, Fokus und Verweis. Im Formsystem gilt: Gerade für Keramik, Kurve nur für Wasser.

## Austauschprobe
- **Leitidee:** Ein Maler hat keine Fugen, kein Format, keinen Verband; ein Fliesenleger ohne Großformat-Schwerpunkt keine XXL-Platte 3 : 1. Drittelverband + 2-mm-Fuge + Streiflicht-Prüfung + DIN 18534 als Wasserfarbe ergeben zusammen nur bei einem Betrieb Sinn, der „fugenarme Großformatverlegung“ an erste Stelle setzt – Tezgel.
- **Einstieg:** H1 „Fugenarme Großformatverlegung“ auf einer einzigen XXL-Platte, darunter die Reihe Motto (Inhaber) · Aufmaß-Knopf · Telefon/WhatsApp/5,0 bei 27 Google-Bewertungen, Fußzeile der Platte „Aßlar · Mittelhessen · seit 2008 · Eingetragener Fachbetrieb der Handwerkskammer Wiesbaden“. Inhalt und Form sind an diesen Betrieb gebunden.
- **Grenzfall (ehrlich):** Ein anderer Großformat-Fliesenleger könnte das Fugenbild übernehmen. Was es zu Tezgel macht, ist die Kombination mit dem Inhaber im Zentrum (Motto, „Deniz Tezgel begutachtet … persönlich“), Mittelhessen-Ortsbezug und dem Ablauf, dessen Text (Ebenheit, Fugenachsen, Abdichtung) die Gestaltung wörtlich erklärt.

## Schriftwahl
- **Archivo (variabel, wdth 62–125, wght 100–900)** – eine Familie für alles. Die Breitenachse trägt Bedeutung: *Breite heißt Format*. Überschriften in 125 % laufen breit und ruhig wie eine XXL-Platte, Zwischentitel 112 %, Text 100 %. Gewichte nur 400 · 560 · 680. Grotesk ohne Ornament = glasierte, glatte Fläche; gut lesbar für 35–75.
- **IBM Plex Mono 400** – für Maß: Telefonnummern, „seit 2008“, DIN 18534, R10/R11, Schrittnummern, Etiketten. Wie ein Aufmaßblatt; zeigt Angaben statt Behauptungen.
- Eingebettet: nur die latin-Dateien (Archivo „standard“ mit wdth-Achse 90 KB, Plex Mono 15 KB). Datei gesamt ≈ 344 KB.
- Skala: 9 Stufen, `clamp()` zwischen 375 und 1440 px, größte Spreizung `--t-display` 44→104 px (× 2,36). Display-ZH 1, Titel 1,1, Text 1,6; `text-wrap: balance/pretty`; lange Wörter tragen `&shy;`, weil Headless-Chromium keine Silbentrennwörterbücher hat (bei 375 px kein Überlauf).

## Palette
Eine OKLCH-Achse von Kalk (Fliese, warm, Farbton 80°) zu Tinte (= Navy der Wortmarke, 268°): Helligkeit 97,5 · 95 · 91 · 84 | 58,5 · 40 · 18,5, Buntheit ≤ 0,045. Dazu Wasser (Abdichtung), zwei Signale, Licht.

| Token | Hex | Rolle |
|---|---|---|
| --kalk-50 | #F9F6F2 | Licht-Platte, Kopf, Felder |
| --kalk-100 | #F2EFE9 | Fläche |
| --kalk-200 | #E6E1DB | Zuschnitt, deaktiviert |
| --kalk-300 | #CFCAC2 | Fuge (dekorativ) |
| --tinte-500 | #757D85 | Feldrand, große Ziffern |
| --tinte-700 | #3F4858 | Zweittext |
| --tinte-900 | #0A1129 | Text, Hauptknopf (= Logo-Navy) |
| --wasser-100 | #DAECF0 | Wasserfläche in Zeichnungen |
| --wasser-600 | #1D5868 | Abdichtung, Fokus, Verweis |
| --fehler-600 | #A13029 | nur Formularfehler |
| --erfolg-600 | #316847 | nur Bestätigung |
| --licht | #FFFFFF | nur Streiflicht, Lichtkante |

Kontraste (WCAG, in der Kachel live aus den Tokens berechnet): Tinte 900/Kalk 50 17,32 · Tinte 900/Kalk 100 16,26 · Tinte 700/Kalk 100 8,03 · Tinte 700/Kalk 200 7,09 · Kalk 50/Tinte 900 17,32 · Kalk 50/Tinte 700 8,55 · Wasser 600/Kalk 100 6,91 · Fokusring Wasser 600/Kalk 50 7,36 · Wasser 600/Wasser 100 6,51 · Feldrand Tinte 500/Kalk 50 3,88 · Tinte 500/Kalk 100 3,64 (nur ≥ 24 px) · Fehler 6,56 · Erfolg 6,09 · Fuge 1,42 (dekorativ) · Logo-Rot/Kalk 100 4,41 (Referenz).
Das Logo-Rot und das Overall-Orange kommen in der Palette nicht vor: Das Logo bleibt die einzige laute Farbe, die Seite ist der ruhige Boden, auf dem es steht.

## Tokens (Kurzfassung)
Abstand 12 Stufen (2 · 4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 64 · 96 · 128, Basis Fuge) · Schrift 9 · Dauer 5 (140 · 320 · 700 · 1400 ms, Versatz 80) · Kurven 3 (`--k-rueck`, `--k-setzen`, `--k-licht`) · Radius 3 (0 · 2 px Fase · 50 % Punkt) · Schatten 3 (keiner · Lichtkante · Streifschatten nach rechts). Die Kachel nutzt ausschließlich diese Variablen (Ausnahme: Seitenverhältnisse, Prozent/fr, Medienabfragen, SVG-Geometrie).

## Formsystem
24er-Raster, Strich 1,5, `stroke-linecap: square`, `stroke-linejoin: miter`, rechte Winkel und 45°, `currentColor`. Regel: **Gerade für Keramik, Kurve nur für Wasser** (Tropfen, Wasserfilm, Strahl). Platten im Icon haben echte Formate (2 : 1).
- Icons: Telefon (Hörer aus Geraden), Sprechblase (generisch), Bad (Wand, Brause, Glaswand, Strahl), Großformat (Platte 2 : 1 + Maßpfeil), Abdichtung (Tropfen über Fliesen/Abdichtung/Untergrund), Ort (Fliese als Markierung).
- Trenner: Fugenlinie mit Stoßfugen im Drittelversatz.
- Muster: Großformat 2 : 1, Reihen um ⅓ versetzt, Lichtkante links.
- Motiv: Schichtaufbau einer bodengleichen Dusche (Untergrund, Verbundabdichtung, Dichtband, Großformatfliesen, Fuge, Wasser) mit nummerierter Legende in HTML.

## Signaturmomente für die ganze Website
1. **Streiflicht-Prüfung** (in der Kachel umgesetzt): Ein flaches Lichtband streicht einmal über die XXL-Platte des ersten Bildschirms (1400 ms) und über jede Schrittplatte des Ablaufs, wenn sie ins Bild kommt; Hover/Tippen wiederholt es. Vorher ziehen sich die Fugen (700 ms). *Austauschprobe:* Ein Lichtschimmer allein wäre generisch; hier ist er an das Prüfverfahren des Gewerks, die planebene Fläche und den Ablauftext („Wir prüfen die Ebenheit“) gebunden. Bei einem Maler gäbe es keine Fläche zu prüfen und keine Fuge, die das Licht bricht.
2. **Schichtaufbau DIN 18534** (Vorschlag für die Leistungsseite Abdichtung/Bad): Beim Scrollen legen sich die Schichten des Motivs nacheinander auf (Untergrund → Abdichtung in Wasserblau → Dichtband → Fliese → Fuge), zuletzt fällt Wasser darauf und bleibt auf der Fläche. Nur `transform: scaleY/translateY` + `opacity`. *Austauschprobe:* Abdichtung im Verbund ist Fliesenleger-Handwerk; Maler und Trockenbauer zeigen diesen Aufbau nicht.
3. **Drittelversatz als Seitenübergang** (Vorschlag): Beim Wechsel zwischen Erzählseiten (z. B. Leistung → Einzugsgebiet) rückt die neue Plattenreihe um ein Drittel ein und legt sich ins Bett (`--k-setzen`, 320–400 ms; reduziert: Überblendung). *Austauschprobe:* Der Versatz um ⅓ statt ½ ist die Verlegeregel für Großformat – ein Detail, das nur zu diesem Schwerpunkt passt.

## Umgang mit echten Fotos (später)
- **Zuschnitt:** nur in Plattenformaten – 3 : 1 (XXL, erster Bildschirm), 2 : 1 (Großformat), mobil 3 : 4 hochkant; Foto sitzt *als Platte* im Fugenraster, 2 px Fuge rundherum, nie gerundet, nie mit Schatten.
- **Motiv:** bevorzugt Aufnahmen mit flachem Seitenlicht (Fenster links), die Fläche und Fugenbild zeigen; Kamera niedrig, Fugenachsen gerade ausgerichtet; Menschen nur Hände/Werkzeug oder der Inhaber selbst.
- **Farbe:** Weißabgleich leicht warm Richtung Kalk 100, Sättigung −10 bis −15 %, keine Duotone, keine Filter, keine Verläufe darüber. Text nie auf Fotos; Text steht auf der Nachbarplatte.
- **Maske:** Rechteck. Das Streiflicht darf über ein Foto laufen (gleiches Licht wie die Fläche), sonst keine Effekte.
- **Bildunterschrift:** Mono, Ort + Raum + Format, nur mit echten Angaben des Betriebs.

## Risiken
- **Zu ruhig / zu leer:** Die große leere XXL-Platte kann auf manche Besucher unfertig wirken, solange keine echten Fotos da sind. Gegenmittel: das Streiflicht beim Laden, später ein echtes Großformat-Foto als Platte.
- **Kontrast der Fuge:** Die Fuge (1,42 : 1) ist absichtlich zart; auf schlechten Displays verschwindet die Plattenlogik teilweise. Sie trägt keine Information; Felder und Knöpfe haben eigene Ränder ≥ 3 : 1.
- **Lichtband = Verlauf:** Das Streiflicht ist ein linearer Verlauf. Begründet durch das Prüfverfahren, aber es muss einmalig, farblos und unter dem Text bleiben, sonst kippt es in „Shine“-Slop.
- **Breite Schrift auf 375 px:** `Großformat-verlegung` passt nur mit weichen Trennungen; neue lange Überschriften brauchen redaktionelle `&shy;`.
- **Rasterdisziplin:** Der Drittelverband ist auf Seiten mit wechselnden Inhalten schwer durchzuhalten; Arbeitsseiten verzichten deshalb darauf.
- **Mono-Telefonnummer:** IBM Plex Mono setzt „06441 / 44 83 567“ sehr luftig; in engen Spalten prüfen.

## Offene Fragen
- OFFENE FRAGE: Welche Formate verlegt der Betrieb tatsächlich am häufigsten (z. B. 120 × 60, 120 × 120, 120 × 260)? Davon hängt ab, ob 3 : 1 / 2 : 1 die richtigen Plattenformate des Rasters sind.
- OFFENE FRAGE: Verlegt Tezgel Großformate im Drittelverband (oder bevorzugt Kreuzfuge/wilder Verband)? Die Leitidee setzt den Drittelverband als fachliche Aussage.
- OFFENE FRAGE: Schichtbenennung im Motiv (Dichtband, Untergrund, ggf. Grundierung/Dünnbettmörtel) – vom Inhaber bestätigen lassen.
- OFFENE FRAGE: Gibt es echte Baustellenfotos mit Streiflicht/Fensterlicht von fertigen Großformatflächen?
- OFFENE FRAGE: Darf die WhatsApp-Nummer prominent im ersten Bildschirm stehen (heute so), oder soll das Telefon Vorrang behalten?
- OFFENE FRAGE: Soll „Trustlocal 9,6 bei 25“ ebenfalls im ersten Bildschirm erscheinen? In der Kachel steht nur Google.
