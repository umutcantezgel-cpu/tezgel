# UM-E4-SICHT-FIX-a2 · Bauteil SF-A2, Welle 2 · M-A5 → M-A4 Nr. 1 bis 3 · R-1 · R-2 · Notiz des Baumeisters

Stand 31.10.2026. Arbeitskopie `$SCRATCH/sfix/a2/baum` (Abzug HEAD 13315fa8 nach Welle 1), Vergleich `$SCRATCH/sfix/a2/vor`
(unverändert). Eigener Produktionsbau auf Port 4480, Vorher-Stand 4325 (13315fa8), 4324 (4d2d3fef) nur für das CSS-Budget.
Diff: `$SCRATCH/sfix/a2/UM-E4-SICHT-FIX-a2.diff` (12 Dateien, `diff -ruN vor baum`, ohne node_modules, node_modules_echt,
.next, bilder, next-env.d.ts, tsconfig.tsbuildinfo). `patch -p1 --dry-run` ist sauber gegen das Repository (HEAD adcd30be).
Kern-Version 4.4.1; K-007 und K-008 sind in der Kopie nachgezogen, Versionsnummer und Änderungsprotokoll setzt der Orchestrator.

**Nacharbeit nach Prüfrunde 1: Abschnitt 9.** Er ersetzt die Angaben zu M-A5 Nr. 3 und 4, zum Lotstück mobil, EV-1, EV-2, die Fragen 1 bis 3 und 8 und die Prüfzahlen.

## 1 Maßnahmen mit Stand

| Maßnahme | Stand | Dateien |
|---|---|---|
| M-A5 Nr. 1 Maß mobil | **fertig.** Unter sm entfällt der Quadratmeter (`max-sm:hidden` an seinem Platz); am rechten Ende der Schnur steht ein Fugenkreuz (Tinte, 8 px, mittig auf dem Schnurende, statisch, `data-leitachse`). Die H1 steht mittig auf der Achse: m390 Zeilenmitten 195,0 / 195,0 px bei Achse 195 (vorher H1-Block 20,6 bis 318,2, Mitte 169,4); m360 ebenso. Grundlinie weiter auf der Schnur. Ab sm unverändert. | `EinstiegMitte.tsx`, `Quadratmeter.tsx` (Kommentar), `globals.css` Block quadratmeter (Kommentar) |
| M-A5 Nr. 2 Zeilenmaske | **fertig.** `eingang-zeile` hat ein Schlüsselbild bei 85 % (Zeile steht, Maske unten an `--eingang-maske-unten`) und bei 100 % die offene Maske (0,2em Polster); die Füllung backwards nimmt sie danach ohne Sprung weg. `--eingang-maske-unten` (Grundlinie) gilt jetzt für die letzte Zeile aller Figur-Einstiege samt `/` (`.schnur-grundlinie > …:last-child` statt `.titel-zeile > …`). Dauer, Folge und Takt unverändert (test/intro.test.mjs „Eingang 1“, „6“, „9“ grün, ohne Änderung). Bildfolge siehe Abschnitt 6. | `bewegung.css` (Schlüsselbilder, Block „Zeilenmaske an der Schnur“) |
| M-A5 Nr. 3 gemeinsame Kanten ab lg | **teilweise** (EV-1). Knopfgruppe und Querformat-Foto nehmen dasselbe Maß (`einstieg-foto-start`, neu `einstieg-knoepfe-start`, `--bild-format` am gemeinsamen Behälter); die Knöpfe teilen sich die Breite. Obergrenze des Fotos 7/10 statt 2/3 der Spalte. Exakt gleiche Kanten: t1024 189–835 / 189–835, d1920 481,2–1438,8 / 481,2–1438,8, d2560 748–1812 / 748–1812. d1280 und d1440 unverändert (das Foto bleibt für den ersten Bildschirm schmaler als die drei Knöpfe). | `EinstiegMitte.tsx`, `globals.css` (@utility einstieg-foto-start, einstieg-knoepfe-start) |
| M-A5 Nr. 4 flach | **fertig, Ziel knapp verfehlt** (EV-2). Schnur → Ort 8 statt 12, Ort → Knöpfe 8 statt 12, Knöpfe → Foto 12 statt 16 px (Lotstück und Aufhängung mit). q844: Foto ab 202 statt 214 px, sichtbar über der Leiste 142,8 von 299,6 px = 47,7 % (vorher 43,7 %). | `EinstiegMitte.tsx` |
| M-A5 Nr. 5 | **unverändert**: M-A1 Nr. 5 ist nicht eingeschaltet (EV-7 von SF-A, Lighthouse beim Orchestrator); `/` bleibt mobil wie abgenommen. | – |
| M-A4 Nr. 1 Lot ohne Lücke ab md | **fertig.** Ab md trägt nur das Lot-Element (`.leitachse` in `.leitfaden-ebene`, 1 px, rotes Stück 2 px) `z-index: 10`; der Behälter der Zierebene bleibt ohne z-index. Die Grundschicht läuft über Fliese (belegt: d1440 /bad Spalte x 95–96 von y 1353 bis 10810 neu sichtbar), mit Bewegung auch das gezogene Rot. Auf Tinte deckt ein Stück in `nacht-fuge` (z-10, später im Baum) Grundschicht und Rot (EV-5). | `globals.css` Block „Leitfaden-Ebene“, `Leitachse.tsx` (Kommentare) |
| M-A4 Nr. 2 Abschnittsmarken mobil | **fertig** (Fassung mit Abschnittsmarken, E-104 Nr. 5). Unter md keine Haarlinie, kein gezogenes Rot, kein Einrasten; an jeder Kante (Fliese- oder Tintefläche, bestehende Kantenregel) Fugenkreuz mit statischem rotem Anrissstück (Stufe 6, 24 px, nach unten, 2 px, unter dem Kreuz). Im Einstieg Schnur und Lotstück wie bisher, das graue Einstiegslot darunter entfällt mobil. `lot="satzkante"` entfällt auch auf `/` (Lage x = 8 px überall): Schnur 8–382 px, Lotstück 7,5–9,5 px bei m390. Treppe auf `/`: behält ihre Stufenlinie, rückt mit `-ml-2` auf 8 px (vorher 14 px), Seite m390 27 px kürzer (Umbruch der Treppentexte). Bilder beider Fassungen bei m390 unter `bilder/m-a4-mobil/` (Abschnitt 6). | `globals.css` (Leitfaden-Ebene, Anrissstück an der Kante, Block „Lot an der Satzkante“ entfällt), `bewegung.css` (Kopf und Einrasten nur ab md), `Leitachse.tsx` (ACHSE_LAGE und SCHNUR_LAGE ohne Marken `achse`, `achse-rechts`), `Seitenformel.tsx`, `start.ts` |
| M-A4 Nr. 3 ruhige Fassung ab md | **fertig.** Unter jedem Kantenkreuz dasselbe statische Anrissstück als Pseudoelement an `.abschnitt-kreuz` (`.abschnitt-kreuz > ::before`, keine Änderung an Abschnitt.tsx); mit Bewegung ab md entfernt es bewegung.css (hängt an `html.k-bewegung`), dort rastet der Kopf ein. Reduziert, „ruhig“ und ohne JavaScript steht es. Druck und erzwungene Farben ohne (wie `.kreuz-rot`). Spiegel im Block Bewegungsschalter (EV-9). | `globals.css`, `bewegung.css` |
| M-A4 Register, KERN | **fertig in der Kopie.** `leitachse`: `was` und `reduziert.text` in `register.json` und gleichlautend in `src/lib/motion/register.ts` (EV-8, test „Bewegung 13“); `reduziert.art` bleibt `grundform`. KERN K-007 (Leitfaden-Motiv) und K-008 (Zeile `leitachse`). | `_werkstatt/register.json`, `src/lib/motion/register.ts`, `_werkstatt/KERN.md` |
| M-A4 Nr. 4 | nicht in diesem Bauteil (SF-B2 mit M-B1). | – |
| R-1 Galerie aufklappen | **fertig.** reaktion.mjs /referenzen, Akkordeon (Knopf „Alle 24 Fotos zeigen“): vorher 320 ms (360/320/272) und 416 ms (432/416/416) auf 4325, nachher 176 ms (272/176/176) und 168 ms (168/184/168) auf 4480. Ursache und Behebung in Abschnitt 5. Verhalten gleich: aria-expanded, Fokus auf dem ersten neuen Foto (m390: Foto 7), ohne JavaScript 24 Fotos, `?raum=dusche` 2 Fotos mit Statuszeile. | `galerie-filter/GalerieWahl.tsx`, `galerie-filter/GalerieFilter.tsx`, `globals.css` Block Galerie |
| R-2 /kontakt erstes Bild | **nicht gebaut, Vermerk** (EV-11). Kein gestalterisch begründeter Weg, der das größte Element früh stellt, ohne das Formular aus dem ersten Bildschirm zu schieben oder einer Ruhe-Regel zu widersprechen. Flächenrechnung und die eine strukturelle Möglichkeit in Abschnitt 5. | – |

## 2 Entscheidungsvermerke (Abweichungen vom Plan)

**EV-1 · M-A5 Nr. 3: gleiche Kanten nur, wo das Foto ganz im ersten Bildschirm bleibt; Obergrenze 7/10**
- Ziel: Fotokante und Knopfgruppe ab lg auf denselben Kanten, ohne die abgenommene Regel „Startfoto ganz im ersten Bildschirm“ (UM-E4-START) zu brechen.
- Befund vorher (`pruef/mass-vor.txt`): Gruppe 840,7 px (d1280, d1440), 945 (d1920), 1049 (d2560), 569 (t1024, ohne WhatsApp); Foto 653, 799, 912, 1013, 619. Bei d1280 und d1440 begrenzt die Höhe das Foto, bei d1920 und d2560 die Obergrenze 2/3 der Spalte.
- Umsetzung: Gruppe und Foto nehmen dasselbe Maß; die Gruppe ist mindestens so breit wie ihr Inhalt (`min-width: max-content`, dafür `container-type: normal` am Knopfbehälter ab lg, die `@max-3xs`-Abfragen greifen dort ohnehin nie); Obergrenze 7/10 (die drei Knöpfe brauchen rund 69 % der Spalte).
- Alternativen: (a) Foto immer so breit wie die Gruppe: d1440 läge die Unterkante 14 px, d1280 rund 100 px unter dem Falz (Prüfer Anlauf 3: „Foto halb unter dem Falz“). (b) Gruppe immer so breit wie das Foto: drei Knöpfe passen bei d1280 und d1440 nicht, sie brächen um. (c) WhatsApp im Einstieg erst ab 2xl: gegen die Ruhe-Regel K-003 „Hauptknopf, Anruf, WhatsApp“. (d) Abstände oder H1 kleiner: rechnet auch bei d1440 nicht auf (es fehlen rund 13 px Höhe), / ist die Referenzansicht.
- Wirkung: exakte Kanten bei t1024, d1920, d2560; Foto dort größer (d1920 912 → 957,6 px, Unterkante 1034 statt 1008 bei 1080 Höhe; d2560 1013 → 1064). d1280 und d1440 unverändert (Abstand je Seite 94 bzw. 21 px wie vorher).
- Risiko: `STARTBILD_GROSS_SIZES` in `start/Startbild.tsx` (nicht meine Datei) rechnet weiter mit 2/3; die gewählte Quelle bleibt groß genug (d1920 1080 für 958 px, d2560 1080 für 1064 px bei DPR 1). Bei sehr großer Schrift wird die Gruppe breiter als das Foto (wie bisher).
- Rückweg: `7 / 10` → `2 / 3` und `lg:einstieg-knoepfe-start` streichen.

**EV-2 · M-A5 Nr. 4: flach für alle Figur-Einstiege, Ziel 50 % nicht ganz erreicht**
- Ziel: „mindestens das halbe Foto im ersten Bild“ bei q844 über eine Stufe kleinere Abstände.
- Umsetzung: Die drei Abstände (Schnur → Ort, Ort → Knöpfe, Knöpfe → Foto) je eine Stufe kleiner. Die Klassen stehen in der gemeinsamen Figur (EinstiegMitte), gelten also auch für die sechs Unterseiten bei q844 (dort hatte SF-A „Foto nur als Streifen“ als Befund 6 offen).
- Ergebnis: 47,7 % statt 43,7 %; es fehlen 7 px. Weitere Stufen hätten Ort und Unterlängen der H1 zusammengeschoben (wie EV-12 von SF-A).
- Alternativen für den Rest (nicht gebaut): oben `flach:pt-16` eine Stufe kleiner (`pt-12`, H1 direkt am Kopf), oder das Foto flach eine Stufe schmaler (`max-w-sm` statt `max-w-md`: 53 %). Beides ist nicht im Plan; Frage 3.
- Rückweg: `flach:pt-2`, `flach:mt-2`, `flach:pt-3`, `flach:top-3`, `flach:-bottom-3` auf die alten Werte.

**EV-3 · M-A5 Nr. 1: Kreuz am Schnurende statisch, H1 behält ihre Größe**
- Das Kreuz kommt nicht in den Eingang: Unter sm kommen laut Register nur Schnur und Zeilen. Es steht ab dem ersten Bild als Ziel der ziehenden Schnur (Bildfolge `start-nach-m390-0200`).
- Die Zeilengrenze `titel-spalte` (10,6cqi) bleibt unter sm, obwohl dort jetzt kein Maß mehr neben der Zeile steht: Die H1 der Referenzansicht behält ihre abgenommene Größe (m390 37,9 px, m360 34,8 px). Ohne die Grenze stünde sie in fs-7 (39,5 bzw. 38 px); Frage 7.
- Rückweg: Block um das Kreuz in EinstiegMitte und `max-sm:hidden` streichen.

**EV-4 · M-A5 Nr. 2: Schlüsselbild bei 85 % für alle Zeilenmasken**
- Die Kurve (ease-setzen) gilt in CSS je Abschnitt zwischen zwei Schlüsselbildern. Mit dem Schlüsselbild bei 85 % kommt jede Zeile bei 85 % der Dauer an statt bei 100 % (bei 85 % fehlten ihr vorher 0,28 % des Wegs, rund 0,3 px bei d1440); danach öffnet sich nur die Maske. Das gilt für alle Zeilenmasken, auch das Planblatt (keine Hauptansicht nutzt es). Die Unterkante bis 85 % liegt nur dort an der Grundlinie, wo `--eingang-maske-unten` gesetzt ist (letzte Zeile der Figur); sonst bleibt die Maske gleich.
- Ein eigener Name der Schlüsselbilder bräche „Eingang 1“ (Wiederkehr nur mit `eingang-zeile`) und „Eingang 9“.
- Rückweg: das Schlüsselbild `85%` streichen und `to` auf die vorherige Fassung.

**EV-5 · M-A4 Nr. 1: Geltungsbereich und Tinte**
- Alle neuen Leitfaden-Regeln hängen am Haken der Seitenformel (`[data-seitenformel] > [data-formel="worum"] + .leitfaden`), wie die bisherigen Regeln für Kopf und Kantenkreuze. Bestandsseiten mit eigener `<Leitachse>` ohne Seitenformel (z. B. /treppen, /fliesen/kueche) bleiben unverändert; Frage 10.
- Auf Tinte deckt das Stück in nacht-fuge auch das gezogene Rot (dieselbe Ebene z-10, später im Baum): Die Spitze taucht unter die Tinte und kommt danach wieder. Grundschicht in nacht-fuge und Rot darüber ginge nur mit einem zweiten Lot-Element hinter dem Inhalt samt `timeline-scope`; das ist Bewegungsmodul und Vorlage, nicht dieses Bauteil.
- Heute steht in keiner Vorlage eine Tintefläche im Leitfaden (nur der Fuß, außerhalb); die Regel ist vorbereitet und kostet rund 100 B gzip.
- Rückweg: Block „Leitfaden-Ebene“ ab md streichen.

**EV-6 · M-A4 Nr. 2: Marken an den Kanten, Einrasten mobil aus**
- „An jeder Abschnittskante“ ist hier jede Kante, an der das Kreuz heute schon steht (Fliese- und Tintekanten; UM-E3-FIX F3: vor ruhiger Kalkfläche las es sich als verirrtes Pluszeichen). Kalk an Kalk bleibt ohne Marke.
- Das Einrasten (rotes Kreuz an der Leselinie) gehört zur Bewegung `leitachse`, die nach Plan nur ab md bleibt; die Medienabfrage des Blocks hat dafür `and (width >= 48rem)` bekommen.
- Rückweg: Medienabfrage zurück, Regel `display: none` unter md streichen (dann kommt die Haarlinie wieder).

**EV-7 · Seitenformel behält die Angabe `lot` im Typ**
- `ErzaehlSeite.tsx` (übergibt `lot`) und `inhalt.ts` (`lotAnDerSatzkante`) gehören in Welle 2 SF-B2. Damit beide Diffs zusammengehen, nimmt Seitenformel die Angabe weiter an, setzt aber kein `data-lot` mehr; `start.ts` setzt `lotAnDerSatzkante` nicht mehr. Nach der Zusammenführung: in ErzaehlSeite `lot=…` und in inhalt.ts das Feld streichen, dann in Seitenformel den Typ (je eine Zeile).
- Die Marken `achse` und `achse-rechts` an ACHSE_LAGE und SCHNUR_LAGE hatten nur den Satzkanten-Block als Haken; sie entfallen (keine Prüfung, kein Werkzeug nutzt sie).

**EV-8 · register.ts mitgeändert**
- test/bewegung.test.mjs „Bewegung 13“ verlangt `register.json` gleich `register.ts`. Geändert sind nur die Texte `leitachse.was` und `leitachse.reduziert.text`, gleichlautend in beiden Dateien. Rückweg: beide Texte zurück.

**EV-9 · Spiegel im Bewegungsschalter**
- Die Regel, die das Anrissstück mit Bewegung ab md wegnimmt, hängt an `html.k-bewegung`; „ruhig“ zeigt es also ohne Spiegel (test/bewegungsschalter.test.mjs „Schalter 4“ nimmt solche Regeln aus). Der Spiegel steht zur Sicherheit wie bei der Leitachse, nur am Bildschirm ohne erzwungene Farben, damit er Druck und erzwungene Farben nicht überstimmt.

**EV-10 · R-1: Aufklappen in zwei Schritten, späte Fotos in Sichtnähe, Platzhalter als Rasterbild**
- Ziel: Reaktion ≤ 200 ms ohne Verhaltensänderung.
- Umsetzung (GalerieWahl, GalerieFilter, Galerie-Block in globals.css):
  1. Der Klick zeigt bis zum ersten Bild nur die erste Reihe der neuen Fotos (so viele wie Spalten; darin das Foto, das den Fokus bekommt) und malt; die übrigen folgen in einer eigenen Aufgabe nach diesem Bild (`naechstesBild` aus takt.ts statt eigenem requestAnimationFrame, dann `setTimeout`). Eine Wahl dazwischen gewinnt.
  2. Fotos ab dem siebten (`data-galerie-mehr`) mit `content-visibility: auto` und Platzhalterhöhe der 4 : 5-Kachel (1, 2 oder 3 Spalten); sie zeichnen erst in Sichtnähe.
  3. Der unscharfe Platzhalter jedes Galeriefotos ist das kleine WebP aus ARBEITEN (16 px) als Hintergrund des Fotos, gestreckt und damit weich (`--galerie-platzhalter` am Listeneintrag, `!important` gegen den Inline-Stil von next/image), statt des SVG mit Weichzeichner.
- Alternativen: nur Platzhalter ersetzen ohne Schritte (Spur 152–160 ms, aber Spitzen über 200 im Lauf wie reaktion.mjs); Platzhalter ganz weglassen (gegen K-006 „unscharfer Platzhalter“); Änderung in Bildfeld für alle Fotos (nicht meine Datei, wirkt auf alle Seiten).
- Wirkung: Abschnitt 5. Das gestaffelte Einblenden bleibt; die zweite Gruppe beginnt ein Bild später.
- Risiko: (a) Der Platzhalter der Galerie sieht beim Laden etwas anders aus als bei übrigen Bildfeldern (gestrecktes Rasterbild statt Gauß-Weichzeichner, `bilder/galerie/referenzen-m390-platzhalter-nach.png`). (b) Malbegrenzung durch content-visibility: Bei d1920 ist in der letzten Galeriereihe der untere 1-px-Rand der Kacheln ab dem siebten Foto sichtbar, den vorher das Foto um einen Rundungspixel deckte. (c) Späte Fotos laden in Sichtnähe statt mit dem Vorlauf von `loading="lazy"`; beim schnellen Scrollen ist der Platzhalter etwas öfter zu sehen.
- Rückweg: je Schritt einzeln (Feld `bis` und `naechstesBild`-Block in GalerieWahl; Regel `content-visibility` im Galerie-Block; `platzhalter` in GalerieFilter samt Regel `.galerie-liste img`).

**EV-11 · R-2: kein Bau**
- Kein gestalterisch begründeter Weg gefunden (Abschnitt 5). Die strukturelle Möglichkeit (Satzzeilen der H1 als Inline-Zeilen mit festem Umbruch statt als Block-Zeilen) ändert nichts am Bild; sie wäre ein Bau nur für die Messung (G7, gleiche Lage wie die abgelehnte Teilung des Bannertexts, E-101). Entscheidung beim Orchestrator (Frage 4).

**EV-12 · Anrissstück: Maß und Lage**
- 2 px breit, mittig unter dem Kreuzpunkt (die Kreuzarme sind ab md 2 px, mobil 1,33 px breit), 24 px vom Kreuzpunkt nach unten, im Baum vor dem Kreuz (das Kreuz liegt darüber). Es steht im oberen Innenabstand des Abschnitts (64 bzw. 96 px), nie neben Text.

## 3 Gewollte Pixeländerungen je Ansicht (gegen 4325)

Belege: ganze Seiten ruhig und Bildschirm-Ausschnitte mit Bewegung unter `bilder/{vor,nach}/{m390,d1440,d1920}/…`. Ruhig gemessen mit `pruef/pixel.py` (Unterschied > 30 je Pixel).

| Ansicht | Änderung |
|---|---|
| `/` | m390: Einstieg (H1 mittig, statt Quadratmeter Fugenkreuz am Schnurende, Schnur und Lotstück bei 8 statt 15 px), keine Haarlinie, Kantenkreuze mit Anrissstück, Treppe 6 px weiter links (Seite 10 300 → 10 273 px). d1440: nur die Spalte des Lots (x 95–96, Lot über den Fliese-Abschnitten; ruhig zusätzlich die Anrissstücke). d1920: Foto 912 → 957,6 px und Knöpfe auf seinen Kanten (Seite 10 146 → 10 172), dazu die Lot-Spalte. t1024: Foto 619 → 646 px, Knöpfe auf seinen Kanten. d2560: Foto 1013 → 1064 px, Knöpfe auf seinen Kanten. q844: Ort, Knöpfe und Foto 4, 8 und 12 px höher. d1280: nur die Lot-Spalte. Eingang: Unterlängen der letzten Zeile erst ab 85 % (Bildfolge). |
| `/bad`, `/bad/badsanierung`, `/bad/barrierefreies-bad`, `/leistungen`, `/balkon-terrasse`, `/ueber-uns`, `/fliesen`, `/blog`, `/standorte/wetzlar` | m390 nur die Spalte x 7–8 (Haarlinie und graues Einstiegslot weg, Anrissstücke an den Kanten, auch mit Bewegung); d1440 nur x 95–96, d1920 nur x 257–258 (Lot über Fliese, ruhig mit Anrissstück, mit Bewegung das gezogene Rot auch über Fliese). Seitenhöhen gleich. Figur-Unterseiten zusätzlich bei q844: Ort, Knöpfe, Foto 4, 8, 12 px höher (EV-2). |
| `/referenzen` | wie oben; dazu Galerie: Platzhalter beim Laden als gestrecktes Rasterbild; d1920 1-px-Unterrand der Kacheln 7 bis 9 in der letzten Reihe (EV-10). Aufgeklappt und geladen gleich (`bilder/galerie/`). |
| `/kontakt` | keine (Arbeitsseite, `gezogen={false}`, kein Leitfaden; R-2 nicht gebaut). |
| Bewegung | Leitfaden ab md wie bisher (Kopf, Einrasten); mobil keine Bewegung des Leitfadens mehr. Eingang auf `/` mobil ohne die Kanten des Quadratmeters (6 statt 11 Animationen). |

## 4 Textvorschläge

Keine neuen. Keine Mikrotexte geändert.

## 5 R-1 und R-2 im Einzelnen

**R-1 · Ursache (Leistungsspur, `pruef/spur-vor`, m390, CPU 4×, wie reaktion.mjs)**
- Klick „Alle 24 Fotos zeigen“ vorher: Ereignis 312 und 352 ms; ein Layout von rund 170 ms in der Aufgabe des Klicks. Darin 18 Dokumente (`DocumentLoader::CommitNavigation`, je rund 9 ms): Jedes neu gezeigte Foto legt das SVG-Platzhalterbild von next/image (placeholder="blur", Weichzeichner-Filter um das 16-px-WebP) als eigenes Dokument an, sobald es Stil und Layout bekommt. Long Animation Frame 237 und 270 ms, Skripte darin nur 17 bis 25 ms (onclick) und 6 bis 7 ms (Fokus im nächsten Bild).
- Gegenprobe ohne SVG-Platzhalter (eingespielter Stil, keine Änderung am Bau): 0 Dokumente, Klick 152 und 160 ms.
- Im Lauf wie reaktion.mjs (Knopf erst beim Antippen in Sicht) kam dazu die Eingabeverzögerung durch das erste Zeichnen der Galerie beim Hereinscrollen (Layout rund 40 ms, 6 weitere SVG-Dokumente) und das Rastern des Platzhalters.
- Nachher (`pruef/spur-nach-final`): Klick 112 und 144 ms, 0 SVG-Dokumente, kein Layout über 9,4 ms bis 300 ms nach dem Klick.

**R-1 · Nachweis reaktion.mjs** (m390, CPU 4×, Median aus 3; Belege `pruef/reaktion-vor`, `reaktion-vor2`, `reaktion-nach`, `reaktion-nach2`)

| Stand | Akkordeon (Werte) | Median | Seite höchster Median |
|---|---|---|---|
| 4325 Reihe 1 | 360 / 320 / 272 | 320 | 320 |
| 4325 Reihe 2 | 432 / 416 / 416 | 416 | 416 |
| 4480 Reihe 1 | 272 / 176 / 176 | 176 | 176 |
| 4480 Reihe 2 | 168 / 184 / 168 | 168 | 168 |

Übrige Handlungen nachher: Hauptknopf 80/96, Menü 96/88, Link 48/48 ms.

**R-2 · Flächenrechnung /kontakt** (Erstbesuch mit Einwilligungsbanner; LCP-Einträge aus `largest-contentful-paint`, Fläche in px² im ersten Bildschirm; Werkzeug `_a2-lcp.mjs`, Stil zur Abschätzung vor dem ersten Bild eingespielt, kein Bau)

| Fassung | m390: LCP-Element (Fläche) | q844: LCP-Element (Fläche) | Formular |
|---|---|---|---|
| heute | Bannertext 24 820 (vorher Ortszeile 21 812); die H1 zählt nicht als ein Element: ihre zwei Satzzeilen sind Block-Zeilen, jede kleiner als die Ortszeile, zusammen 38 837 | Bannertext 27 405 (H1 einzeilig 22 272) | Abschnitt ab 556 px (m390), Kastenkopf im ersten Bild |
| H1 in voller Stufe fs-7 (nicht flach) | Zeile 2 der H1 27 840 > Bannertext | unverändert (flach fs-5), Bannertext | rückt 66 px tiefer; widerspricht „Arbeitsansicht: H1 fs-6“ (E3-SICHT-2-ARB) und dem Sichtbefund /kontakt (verdichten, Formular früher) |
| Satzzeilen als Inline-Zeilen mit festem Umbruch (Bild gleich) | H1 38 232 als ein Element, der Banner wird kein LCP | unverändert (flach ohnehin eine Zeile), Bannertext | unverändert |
| Foto im Einstieg | – | – | schiebt das Formular aus dem ersten Bildschirm |
| O-1 (kompakt mit optionalem Vorspann, dichte Stufe) | ohne Vorspann keine Wirkung auf LCP; mit Vorspann im Einstieg wäre er das größte Element, das nimmt aber die Verschiebung von SF-C2 (Sichtbefund) zurück | – | rückt bei d1440 rund 100 px höher (ohne Vorspann) |

Ergebnis: Kein gestalterisch begründetes erstes Bild stellt das größte Element früh, ohne Formular oder Ruhe-Regel zu verletzen. Die Inline-Fassung der Satzzeilen wirkt bei m390 (und voraussichtlich bei Lighthouse mobil), ändert aber nichts Sichtbares; ich habe sie nach G7 nicht gebaut (Frage 4). erstesbild.mjs für /kontakt entfällt, weil nichts gebaut ist.

## 6 Prüfzahlen

**Tests und Bau** (Endstand, Bau 3)
- `npm test`: 270 Tests, 270 bestanden, 0 übersprungen (`pruef/npmtest2.log`); keine Testdatei geändert.
- `npx tsc --noEmit`: 0. `npx eslint` über die acht geänderten TS/TSX-Dateien: 0.
- `werte.mjs` (Kopie mit der Kopie als Wurzel) über die 10 geänderten Quelldateien samt globals.css und bewegung.css: 0 Befunde, `vor` ebenso 0.
- `next build`: Exit 0, ein Stylesheet je Seite (/, /bad, /referenzen dieselbe Datei; test/stylesheets.test.mjs grün).
- **CSS gebaut** (gzip -9): 4325 24 554 B → 4480 24 904 B, **+350 B** (roh 142 465 → 144 999, +2 534; gzip -6 24 680 → 25 025). Gegen 4d2d3fef (4324, 23 413 B): +1 491 B (Welle 1 +1 141 B).

**erstesbild.mjs** (11 Ansichten, Erstbesuch und nach Einwilligung; `pruef/erstesbild/`, `erstesbild200/`, `erstesbild360/`)
- q844, m390, d1440: 66 Fälle, bestanden 283 → 283, kein Fall verändert (q844 66/66, m390 107/107, d1440 110/110).
- m360 mit 200 % (Systemschrift ab dem ersten Bild, strenge Fassung wie SF-C1): 22 Fälle, 49 → 49, kein Fall verändert.
- m360 mit 100 % auf `/`: 8 → 8.

**Weitere Prüfungen**
- ueberlappung.mjs (/, /bad, /referenzen, /standorte/wetzlar): m390 je 3 → 1 Befund (es bleibt die gewollte Kreuzung von H1 und Schnur; weg sind die Kreuzungen der mobilen Haarlinie mit „Cookies“ in der unteren Leiste), d1440 je 1 → 1. Am Kreuz des Schnurendes kein Befund.
- axe.mjs (/, /bad, /referenzen, /fliesen, /standorte/wetzlar × m390, d1440): ernst/kritisch 0 → 0.
- Galerie: Verhalten gleich vorher/nachher (6 → 24, Fokus Foto 7, Knopf danach weg; ohne JavaScript 24; `?raum=dusche` 2 Fotos, „Sie sehen 2 Fotos von Duschen.“).

**Bilder** (PNG, DPR 1, unter `$SCRATCH/sfix/a2/bilder/`)
- `vor/` und `nach/`: 11 Ansichten × m390, d1440, d1920; `ruhig/<seite>.png` ganze Seite (aus Bildschirm-Ausschnitten zusammengesetzt: Playwright `fullPage` rechnete die H1 in einzelnen Aufnahmen falsch), `bewegt/<seite>/NN.png` je Bildschirmhöhe im Endzustand.
- `folge/`: Erstbesuch `/` bei d1440 und m390, angehaltene Zeitleiste 0, 100, 200, 300, 400, 600, 800, 1200 ms, vorher und nachher (bei 300 bis 400 ms vorher Bruchstücke der zweiten Zeile unter der Schnur, nachher keine).
- `start-extra/{vor,nach}/{q844,t1024,d1280,d2560}/bewegt/start/00.png`: erster Bildschirm `/`.
- `m-a4-mobil/`: E-104 Nr. 5, m390, beide Fassungen: `nur-marken/` (gebaut) und `lot-8px-und-marken/` (Lot per eingespieltem Stil, durchgehend, z-10), ruhig für /, /bad/barrierefreies-bad, /referenzen und mit Bewegung für /bad/barrierefreies-bad.
- `galerie/`: /referenzen m390 aufgeklappt und Platzhalter (Fotos gesperrt), vorher und nachher.

## 7 Offene Fragen

1. **E-104 Nr. 5:** Gebaut ist die Fassung mit Abschnittsmarken. Bilder beider Fassungen bei m390 unter `bilder/m-a4-mobil/`. Bitte am Messpunkt entscheiden.
2. **M-A5 Nr. 3 bei d1280 und d1440:** Gleiche Kanten nur mit einem Foto, das 14 px (d1440) bzw. rund 100 px (d1280) unter den Falz reicht. Annehmen wie gebaut, oder die Falzregel dort lockern?
3. **M-A5 Nr. 4:** 47,7 % des Fotos bei q844. Reicht das, oder flach das Foto eine Stufe schmaler (`max-w-sm`, rund 53 %)?
4. **R-2:** Satzzeilen der kompakten H1 als Inline-Zeilen mit festem Umbruch (Einstieg.tsx, Bild gleich) würden LCP mobil auf die H1 legen. Gilt das als Bau nur für die Messung (G7, wie E-101), oder als zulässige Struktur? Ohne Freigabe bleibt es ungebaut.
5. **Zusammenführung mit SF-B2:** In ErzaehlSeite `lot=…` und in inhalt.ts `lotAnDerSatzkante` streichen, danach den Typ in Seitenformel (EV-7).
6. **M-A4 Nr. 4 (SF-B2):** Das Lot bleibt bei x = 8/16/32 px; Abschnitte mit `satz` links stehen dann 16 px daneben. Die Anrissstücke stehen nur im oberen Innenabstand, also nicht neben dem linksbündigen Satz.
7. **H1 auf `/` unter sm:** Ohne das Maß könnte die Zeilengrenze `titel-spalte` dort entfallen; die H1 stünde dann in fs-7 (m390 39,5 statt 37,9 px). Gewünscht?
8. **Startbild.tsx `STARTBILD_GROSS_SIZES`** rechnet mit 2/3 statt 7/10 (EV-1); die Quelle reicht, eine Anpassung wäre sauberer (nicht meine Datei).
9. **Galerie-Platzhalter:** Rasterbild statt SVG-Weichzeichner nur in der Galerie (EV-10). Soll Bildfeld das für alle Fotos übernehmen (dieselbe Ursache kostet überall rund 9 ms je Foto beim ersten Zeichnen, CPU 4×)?
10. **Bestandsseiten** mit eigener `<Leitachse>` ohne Seitenformel bleiben im alten Leitfaden (EV-5). Nachziehen?

## 8 Aufräumen

- Server 4480 gestoppt; 4324 und 4325 laufen unberührt.
- `baum/.next` und die echte Kopie von node_modules gelöscht; `baum/node_modules` zeigt wieder auf `/home/user/tezgel/node_modules`.
- Hilfsskripte `_a2-*.mjs` aus `_werkstatt/werkzeuge` gelöscht. Keine Git-Schreibvorgänge.

## 9 Nacharbeit (Prüfrunde 1, 31.10.2026 abends)

Grundlage: zehn Befunde der Prüfer (pruef-0, pruef-1), jeder selbst nachgeprüft. Neuer Bau auf 4480 (`next build` Exit 0), Vorher-Stand
4325 (13315fa8). Diese Nacharbeit ersetzt in den Abschnitten 1 bis 7 die Angaben zu M-A5 Nr. 3 und 4, zum Lotstück mobil
(M-A4 Nr. 2), EV-1, EV-2, EV-3 (Kreuz), EV-5 (Tinte), Fragen 1 bis 3 und 8 sowie die Prüfzahlen.

### 9.1 Befunde mit Ergebnis

| Nr. | Befund (Schwere) | Nachprüfung | Ergebnis |
|---|---|---|---|
| 1 | M-A5 Nr. 3: gleiche Kanten nur bei t1024, d1920, d2560, nicht im Band d1280 bis d1599 (mittel) | bestätigt: d1440 Gruppe 841 gegen Foto 799 px, je Seite 20,7 px | **behoben für d1440** (Referenzgröße), dazu t1024, d1920, d2560 und 1680 × 1050; d1280, Bildschirme unter rund 900 px Höhe und 1600 × 900 behalten einen kleineren Versatz (EV-1 neu). Knöpfe der Gruppe ab lg mit Innenabstand Stufe 4 statt 6; Obergrenze des Fotos wieder 2/3 (statt 7/10). Werte unten. |
| 2 | M-A5 Nr. 4: q844 nur 47,7 % des Fotos sichtbar (mittel) | bestätigt | **behoben für `/`**: Querformat flach auf der halben Spalte (`flach:max-w-1/2`, 390 statt 448 px): 54,7 % sichtbar (4325: 43,7 %). Hochformat der Figur-Unterseiten bleibt breit (25,5 %, 4325: 23,4 %), EV-2 neu. |
| 3 | M-A4 Nr. 2: rotes Lotstück im Einstieg mobil weiter bei 8 px, Rahmenbefund b1 im ersten Bildschirm unberührt, auf `/` von 14 auf 8 px (mittel) | bestätigt (eigene Bilder m390, `pruef-n/shots/cmp-m390-einstieg.png`) | **behoben**: unter md entfällt das Lotstück in allen Einstiegen mit Seitenformel (EinstiegMitte und Einstieg mit Schnur), es bleibt die Schnur unter der H1 (EV-13). Drei Bildfassungen für E-104 Nr. 5 unter `bilder/m-a4-mobil/`. |
| 4 | Marken mobil bei x = 8 frei schwebend, führen nicht (gering) | teils bestätigt: Rahmen- und Nahtbefund ist weg, ein Leitfaden ist mobil nicht erkennbar | **nicht umgesetzt** (Lage 8 px und je Kante ein Anrissstück sind Plan und Leitplanke, siehe 9.4). Wirkung für mobil jetzt nur als „Rahmenbefund beseitigt“ geführt, nicht als „Leitfaden führt“. |
| 5 | Kreuz am Schnurende steht ab 0 ms allein am Rand (gering) | bestätigt (Runde 1 ohne Eingang am Kreuz, es stand ab dem ersten Bild; Prüferbild `pruef-0/folge/folge-m390.png`) | **behoben**: `data-eingang="schnurende"`, erscheint mit dem Ende des Zugs (Deckkraft 0 bis 320 ms, 1 ab 460 ms; `pruef-n/folge/4480`). Register `eingang.was` gleichlautend in register.json und register.ts. |
| 6 | Diff A2 und Diff B2 gehen an drei Zeilen nicht zusammen (mittel) | bestätigt (KERN K-007, register.json und register.ts `leitachse`) | **behoben als Zusammenführungspatch** `UM-E4-SICHT-FIX-a2-nach-b2.diff` und Wortlaut in 9.5. |
| 7 | HTML von /referenzen wächst (gering) | bestätigt: roh 475 210 → 485 335 B (+10 125), gzip -9 60 039 → 62 403 B (+2 364) | **ausgewiesen**; Abbau nur über Bildfeld (nicht meine Datei), Frage 13. |
| 8 | Tinte-Regel im Leitfaden ungeprüft (gering) | im Prüfbrowser belegt (Fliese-Abschnitt per DOM auf Tinte gestellt, d1440 und t768): Lage stimmt (x 96 bzw. 16 wie das Lot), **aber das 2-px-Rot blieb an beiden Seiten halb sichtbar** | **behoben**: Deckstück 3 px (außen Tinte, Mitte 1 px nacht-fuge), Rot ganz verdeckt; Selektor auf Tinte-Abschnitte eingeengt (`section.flaeche-tinte[data-kante]`, nicht der Tinte-Kasten des Preisrechners). Bild `pruef-n/tinte-neu/tinte-zoom.png`. |
| 9 | Kommentare in Ablauf.tsx und Abschnitt.tsx veraltet, Klasse `treppe-auf-lot` ohne Regel (gering) | bestätigt, dazu Schnurebene.tsx und Einstieg.tsx (Lotstück) | **nicht meine Dateien**: Frage 14 (Zusammenführung). |
| 10 | Platzhalterhöhe übersprungener Galeriefotos ohne Ränder, 2,5 px zu hoch (gering) | bestätigt | **behoben**: Höhe `((Liste − 1 px) / Spalten − 1 px) · 5/4`; m390, t768, d1440 alle 24 Einträge gleich hoch (446 / 439,13 / 507 px, wie 4325). Kopplung der Schwellen: Prüfzeile vorgeschlagen (Frage 15). |

**Gleiche Kanten ab lg** (Gruppe gegen Foto, Versatz je Seite in px; `pruef-n/kanten.txt`, `kanten-final.txt`):

| Ansicht | 4325 | 4480 Runde 1 | 4480 Nacharbeit | Foto (Nacharbeit) |
|---|---|---|---|---|
| t1024 (1024 × 768) | −24,7 | 0 | **0** | 618,7 (wie 4325) |
| d1280 (1280 × 800) | 94 | 94 | 70 | 652,8 |
| d1440 (1440 × 900) | 20,7 | 20,7 | **0** | 799,3 |
| d1920 | 16,5 | 0 | **0** | 912 (wie 4325; Runde 1: 957,6) |
| d2560 | 18 | 0 | **0** | 1013,3 (wie 4325; Runde 1: 1064) |
| 1366 × 768 | 116 | – | 92 | 608 |
| 1536 × 864 | 73 | – | 48 | 715 |
| 1600 × 900 | 54,5 | – | 29,5 | 766 |
| 1680 × 1050 | 15,7 | – | **0** | 861 |

### 9.2 Entscheidungsvermerke (neu oder neu gefasst)

**EV-1 (neu gefasst) · M-A5 Nr. 3: schmalere Knöpfe statt größerem Foto, Obergrenze wieder zwei Drittel**
- Ziel: Fotokante und Knopfgruppe ab lg auf denselben Kanten, ohne die Falzregel (Startfoto ganz im ersten Bildschirm, UM-E4-START) zu brechen.
- Umsetzung: In der Gruppe (einstieg-knoepfe-start) tragen die Knöpfe ab lg Innenabstand Stufe 4 (16 px) statt 6 (24 px). Weil alle drei mit gleicher Zugabe auf das Maß wachsen, ändern sich ihre Breiten überall dort nicht, wo sie schon vorher passten; der Inhalt der Gruppe sinkt aber von 841 auf 793 px und passt so in das Foto von d1440 (799 px). Die Obergrenze des Fotos steht wieder bei zwei Dritteln der Spalte (Runde 1: 7/10), weil die Knöpfe mit Stufe 4 auch auf d1920 (891 gegen 912) und d2560 in das alte Maß passen.
- Wirkung: exakte Kanten auf t1024, d1440, d1920, d2560 und 1680 × 1050; das Foto ist auf allen Größen wieder so groß wie auf 4325 (keine Pixeländerung am Foto der Referenzansicht). Sichtbarer Innenabstand der Knöpfe d1440 17 px, d1920 rund 21 px.
- Grenze: Unter rund 900 px Bildschirmhöhe (d1280, 1366 × 768, 1536 × 864) und bei 1600 × 900 (Grundschrift wächst mit der Breite, die Höhe nicht) bleibt das Foto schmaler als die drei Knöpfe; der Versatz sinkt dort um 24 px je Seite (d1280 94 → 70). Gleiche Kanten gingen dort nur mit einem Foto unter dem Falz (d1280 rund 100 px) oder mit gekürzten Beschriftungen (Wortlaut, Entscheidung 6) – nicht gebaut.
- Alternativen: Foto auf die Gruppenbreite bei Lockerung der Falzregel (d1440 +14 px unter dem Falz, d1280 rund 100 px); Knöpfe in zwei Reihen (Foto würde rund 100 px schmaler); WhatsApp im Einstieg erst ab 2xl (gegen K-003).
- Risiko: Knöpfe im Einstieg ab lg mit kleinerem Mindest-Innenabstand als sonst; bei sehr großer Schrift steht die Gruppe breiter als das Foto (wie bisher). Frage 8 (STARTBILD_GROSS_SIZES) entfällt, weil die Obergrenze wieder 2/3 ist.
- Rückweg: `padding-inline` in einstieg-knoepfe-start streichen (dann wie Runde 1 mit 2/3).

**EV-2 (neu gefasst) · M-A5 Nr. 4: Querformat flach auf der halben Spalte**
- Ziel: mindestens das halbe Foto im ersten Bild bei q844.
- Umsetzung: Zu den kleineren Abständen aus Runde 1 steht das Querformat flach auf der halben Spalte (`flach:max-w-1/2`, q844 390 statt 448 px). `max-w-sm` (Vorschlag der Prüfer) ist kein Wert des Designsystems (werte.mjs: „max-w-sm: nicht in groessen“); die halbe Spalte ist es und misst bei q844 fast dasselbe.
- Wirkung: `/` q844 sichtbar 142,8 von 260,9 px = 54,7 % (4325: 43,7 %, Runde 1: 47,7 %).
- Hochformat (Figur-Unterseiten ohne bildQuer): bleibt breit. Die Hälfte eines 4 : 5-Fotos stünde über der Leiste erst bei rund 230 px Breite; eine halbe Spalte brächte 29 statt 25 % und weniger Bildfläche. Der Befund „Foto nur als Streifen“ bleibt für diese Unterseiten offen (Querformat-Zuschnitte sind ausgeschlossen, Entscheidung 6 von E-104).
- Rückweg: `!hochformat && 'flach:max-w-1/2'` streichen.

**EV-3 (Nachtrag) · Kreuz am Schnurende im Eingang**
- Das Kreuz erscheint jetzt im Eingang mit dem Ende des Zugs (eigene Regel, Deckkraft wie die Maße, Beginn `--eingang-schnur`, Dauer `dauer-1`); Wiederkehr, reduziert, „ruhig“, ohne JavaScript, Druck und erzwungene Farben: steht ab dem ersten Bild. Takt mobil weiter bis 0,86 s, voll unverändert (test/intro „Eingang 1“, „6“ grün).
- Register `eingang.was`: „unter sm kommen nur Schnur und Zeilen, auf / erscheint das Fugenkreuz am Schnurende mit dem Ende des Zugs“.

**EV-5 (Nachtrag) · Tinte im Leitfaden**
- Das Deckstück ist 3 px breit (1 px Tinte, 1 px nacht-fuge auf dem Lot, 1 px Tinte) und steht 1 px links vor der Lage des Lots; so deckt es auch die Halbpixel des 2-px-Rots (bei 1 px lag das Rot links und rechts halb frei, im Bild ein dunkelroter Faden). Kantenkreuz und Anrissstück liegen weiter darüber.
- Nur an Tinte-Abschnitten aus kern/Abschnitt (`section.flaeche-tinte[data-kante]`); der Tinte-Kasten des Preisrechners (PricingCalculator) fiele sonst darunter, sobald er in einem Leitfaden steht.
- Belegt per Prüfbrowser auf d1440 und t768 (Pixel in der Tinte: Spalte des Lots nacht-fuge, Nachbarspalten Tinte, ruhig und mit Bewegung gleich). Heute steht keine Tintefläche im Leitfaden; der Beleg ersetzt die Prüfseite.

**EV-13 · M-A4 Nr. 2: kein rotes Lotstück im Einstieg unter md**
- Ziel: „mobil kein Rahmen- oder Nahtbefund mehr“ (Wirkung der Maßnahme) auch im ersten Bildschirm.
- Befund: Das Lotstück (2 px rot, auf `/` rund 290 px lang) stand nach Runde 1 bei 8 px, also genau dort, wo die Prüfer auf /bad/barrierefreies-bad eine Rahmenlinie sahen (b1 hoch, Teil); auf der Satzkante (vorher `/`) las es sich als Naht neben den Knöpfen (b6), bei UM-E4-START als Schnittmarke. Die Begründung des Plans („im 16-px-Rand liest sich jede Haarlinie als Rand, Marken nicht“) gilt für das Lotstück genauso.
- Umsetzung: Unter md trägt das Lotstück mit Seitenformel `display: none` (globals.css „Leitfaden-Ebene“, eine Zeile neben dem grauen Einstiegslot). Im Einstieg bleibt die Schnur unter der H1, auf `/` mit dem Kreuz am Ende. Ab md unverändert.
- Abweichung vom Planwortlaut „im Einstieg Schnur und Lotstück wie bisher“. Alternativen: Lotstück auf der Satzkante (Naht, b6), kurzes Stück wie das Anrissstück (liest sich mit der Schnur als Winkel, also als Schnittmarke), Planwortlaut (Rahmenlinie, b1). Bilder aller drei Fassungen unter `bilder/m-a4-mobil/` für E-104 Nr. 5.
- Wirkung: m390 kein senkrechtes Rot mehr im Seitenrand des ersten Bildschirms; ueberlappung.mjs unverändert (je 1 Befund, die gewollte Kreuzung von H1 und Schnur).
- Risiko: Kommentare in Schnurebene.tsx und Einstieg.tsx beschreiben das Lotstück für alle Breiten (Frage 14).
- Rückweg: Selektor `[data-seitenformel] > [data-formel="worum"] .lot-stueck` aus der Regel unter md streichen.

**EV-14 · R-1: Platzhalterhöhe mit Rändern**
- `contain-intrinsic-block-size` rechnet jetzt mit der Kachel ohne Ränder: `((100cqi − 1px) / Spalten − 1px) · 5/4` (Liste links 1 px, Kachel rechts 1 px; der untere Rand liegt außerhalb). Gilt auch im Verband (dort Innenabstand statt Rand, gleiche Breite).

### 9.3 Gewollte Pixeländerungen (Änderung gegen Abschnitt 3)

- `/` d1440: Knöpfe auf den Kanten des Fotos (320,4 bis 1119,6), Innenabstand 17 statt 24 px; Foto gleich. d1920, d2560, t1024: Foto wieder wie 4325 (Runde 1 war es größer), Knöpfe auf seinen Kanten. d1280: Knöpfe mit 16 px Innenabstand, Gruppe 793 statt 841 px; Foto gleich.
- m390 auf `/` und allen Einstiegen mit Seitenformel (Figur-Unterseiten, /fliesen, /blog, /standorte/wetzlar): kein rotes Lotstück mehr neben Ort und Knöpfen.
- q844 auf `/`: Foto 390 statt 448 px breit, mittig.
- Eingang `/` mobil: Kreuz am Schnurende erst ab 320 ms.
- Galerie, Tinte: keine sichtbare Änderung (Höhen gleich, keine Tintefläche im Leitfaden).

### 9.4 Nicht umgesetzt, mit Begründung

- **Befund 4 (Marken bei 8 px):** Der Plan legt die Lage auf x = 8 px fest (ACHSE_LAGE auf allen Seiten, Risiko „Kreuz mobil 4 px vor der Textkante wie heute“). Auf der Satzkante (16 px) stünde das Kreuz auf der Kante von Karten und Formularen, die direkt unter dem oberen Innenabstand beginnen (Leitplanke „nie neben Text“, Risiko ueberlappung.mjs); ein waagerechter Anriss wäre ein zweites Zeichen je Kante (Leitplanke „je Kante höchstens ein Anrissstück“). Übernommen ist die Lesart der Prüfer: Für mobil gilt die Wirkung nur als „Rahmen- und Nahtbefund beseitigt“, nicht als „Leitfaden führt“.
- **Befund 9 (fremde Kommentare):** Ablauf.tsx, Abschnitt.tsx (SF-B2), Schnurebene.tsx und Einstieg.tsx sind nicht meine Dateien; Frage 14.
- **Befund 7 (HTML-Zuwachs):** innerhalb meiner Dateien nicht abbaubar (die Datenadresse muss zum Listeneintrag; der SVG-Platzhalter von next/image kommt aus Bildfeld); Frage 13.

### 9.5 Zusammenführung mit SF-B2 (Befund 6)

- Nach dem B2-Diff schlagen drei Hunks des A2-Diffs fehl (KERN K-007, register.json und register.ts `leitachse`); alle übrigen gehen durch (globals.css mit 7 Zeilen Versatz). Danach `UM-E4-SICHT-FIX-a2-nach-b2.diff` anwenden (`patch -p1`, gegen den Stand „vor + B2 + A2 ohne die drei Hunks“, trocken geprüft gegen den B2-Diff von 19:51). Ergebnis: register.json und register.ts gleichlautend (test „Bewegung 13“).
- Wortlaut `leitachse.was` (register.json und register.ts): „Leitfaden: das rote Lot wächst mit dem Lesen; auf den Erzählseiten der Vorlage steht die Spitze bei 40 %, mit der Abschnittsmarke nur neben dem Inhalt der Abschnitte auf Kalk, und an Kanten rastet sie ins Fugenkreuz ein (UM-E3-LEIT, UM-E3-FIX2); ab md läuft das Lot ohne Lücke über Fliese und Tinte, mobil stehen statt Lot und Bewegung nur Kantenkreuze mit statischem Anrissstück, im Einstieg nur die Schnur ohne Lotstück (UM-E4-SICHT-FIX M-A4); Abschnitte mit Satz links stehen ab md 16 px am Lot (UM-E4-SICHT-FIX M-B1, M-A4 Nr. 4); dazu der Lesefortschritt der Ratgeber“. `reduziert.text` wie im A2-Diff.
- KERN K-007, Spalte „Was“: A2-Text, dann „; am Desktop rückt sie an den Inhalt: Abschnitte mit `satz` links stehen ab md 16 px am Lot (UM-E4-SICHT-FIX M-B1, M-A4 Nr. 4)“; Spalten „Wo“ und „Ruhig“ wie im A2-Diff.
- Weitere Zusammenführungspunkte wie in EV-7: `lot=` in ErzaehlSeite und `lotAnDerSatzkante` in inhalt.ts streichen, danach den Typ in Seitenformel.

### 9.6 Prüfzahlen (Nacharbeit, Bau auf 4480)

- `npm test`: 270 Tests, 270 bestanden, 0 übersprungen (mit Bau; `pruef-n/npmtest-final.log`, nach einem Kommentarumbruch in bewegung.css erneut gelaufen; Kommentare stehen nicht im gebauten CSS). Keine Testdatei geändert.
- `npx tsc --noEmit`: 0. `npx eslint` über die acht geänderten TS/TSX-Dateien: 0.
- `werte.mjs` (Kopie mit der Kopie als Wurzel, 10 Quelldateien samt globals.css und bewegung.css): 0 Befunde (Zwischenstand mit `flach:max-w-sm`: 1 Befund „groesse_ausserhalb“, darum die halbe Spalte).
- `next build`: Exit 0, ein Stylesheet je Seite (test/stylesheets grün). Echte Kopie von node_modules unter dem Namen `node_modules` (mit einem Symlink auf `node_modules_echt` las Turbopack die Pakete als App-Code und brach an react-markdown ab).
- CSS gebaut (gzip -9): 4325 24 552 B → 4480 24 982 B, **+430 B** (roh 142 465 → 145 561). Gegen 4d2d3fef (4324, 23 411 B): +1 571 B (Welle 1 +1 141 B).
- HTML: /referenzen +10 125 B roh, +2 364 B gzip (24 Platzhalter als Inline-Stil und in der Nutzlast); `/` +680 B roh, +108 B gzip.
- erstesbild.mjs (11 Ansichten × q844, m390, d1440 × Erstbesuch und nach Einwilligung, 4325 und 4480 im selben Lauf): 66 Fälle, bestandene Elemente 283 → 283, kein Fall verändert (q844 66/66, m390 107/107, d1440 110/110). m360 mit 200 % Grundschrift ab dem ersten Bild (eigene Kopie `_a2n-eb200.mjs`, Stil `html{font-size:200%}` per Init-Skript; anders als die Fassung von Runde 1, Zahlen darum nicht mit 49 vergleichbar): 22 Fälle, 91 → 91, kein Fall verändert.
- axe.mjs (/, /bad, /bad/barrierefreies-bad, /referenzen, /fliesen, /standorte/wetzlar × m390, d1440): ernst/kritisch 0.
- ueberlappung.mjs (/, /bad, /bad/barrierefreies-bad, /referenzen, /standorte/wetzlar): m390 je 3 → 1, d1440 je 1 → 1 (wie Runde 1).
- Galerie: Höhen aller 24 Einträge nach „Alle 24 Fotos zeigen“ gleich (m390 446, t768 439,13, d1440 507 px), wie 4325.
- reaktion.mjs /referenzen (m390, CPU 4×, 3 Läufe; beide Stände direkt nacheinander, ohne weitere Last aus diesem Bauteil; Galerie-CSS nach Runde 1 nur in der Platzhalterhöhe geändert): Akkordeon 4325 424 / 368 / 304 ms (Median 368) → 4480 160 / 144 / 136 ms (Median 144); Seitenwert 368 → 144 ms, Urteil ok. Übrige Handlungen 4480: Hauptknopf 104, Menü 96, Link 56 ms. Verhalten gleich: Fokus m390 auf Foto 7, d1440 auf Foto 10, danach 24 Fotos sichtbar (`pruef-n/reaktion-4325`, `reaktion-4480`).

### 9.7 Bilder (erneuert, `$SCRATCH/sfix/a2/bilder/`)

- `nach/{m390,d1440,d1920}/{ruhig,bewegt}`: 11 Ansichten vom Bau der Nacharbeit (ruhig: ganze Seite aus Bildschirm-Ausschnitten, bewegt: je Bildschirmhöhe im Endzustand). `vor/` unverändert (4325).
- `start-extra/nach/{q844,t1024,d1280,d2560}/bewegt/start/00.png`: erster Bildschirm `/`.
- `kanten/`: erster Bildschirm `/` vorher und nachher bei d1280, d1440, d1920 und 1600 × 900 (Befund 1).
- `m-a4-mobil/`: E-104 Nr. 5, m390, drei Fassungen, je ruhig ganze Seite (/, /bad/barrierefreies-bad, /referenzen) und erster Bildschirm: `a-gebaut-nur-marken/` (gebaut: Marken, im Einstieg nur die Schnur), `b-marken-mit-lotstueck/` (Planwortlaut, Lotstück 8 px), `c-lot-8px-und-marken/` (durchgehendes Lot 8 px, Lotstück, Marken); Übersicht `uebersicht-erster-bildschirm.png`.
- `folge/`: Erstbesuch `/` m390 und d1440 nachher neu (0 bis 1200 ms), dazu `folge/kreuz-m390-{4325,4480}/` (0 bis 900 ms, Ausschnitt Kopf).
- `galerie/`, `q844/`, `tinte/`: Galerie aufgeklappt nachher, q844 `/` und Unterseiten vorher und nachher, Prüfbild der Tinte-Regel.

### 9.8 Offene Fragen (neu oder geändert)

1. **E-104 Nr. 5 (geändert):** Gebaut ist „nur Marken, im Einstieg nur die Schnur“ (EV-13). Bilder der drei Fassungen bei m390 unter `bilder/m-a4-mobil/`.
2. **M-A5 Nr. 3 (geändert):** d1280 und Bildschirme unter rund 900 px Höhe behalten einen Versatz (d1280 70 px je Seite). Annehmen, oder dort die Falzregel lockern?
3. **M-A5 Nr. 4 (geändert):** Für `/` erfüllt (54,7 %). Für die Figur-Unterseiten mit Hochformat (25,5 %) gibt es ohne Querformat-Zuschnitt keinen Weg; als offen führen?
8. entfällt (Obergrenze wieder 2/3).
13. **HTML /referenzen:** Bietet Bildfeld eine Angabe ohne SVG-Platzhalter (placeholder „empty“ bei eigenem Platzhalter), fallen in der Galerie 24 SVG-Datenadressen im HTML (rund 18 KB) und dieselben in der Nutzlast weg; das HTML würde dann kleiner als vor R-1. Nicht meine Datei.
14. **Veraltete Kommentare fremder Dateien** (bei der Zusammenführung nachziehen): Ablauf.tsx Z. 91–96 (Verweis auf den entfallenen Block „Lot an der Satzkante“, Klasse `treppe-auf-lot` ohne Regel: als Markierung lassen oder streichen); Abschnitt.tsx Z. 62–63 („Fliese und Tinte decken es“, gilt ab md nicht mehr; SF-B2); Schnurebene.tsx Kopf (Lot im Seitenrand bis zum Fuß, Lotstück in jedem Zustand rot: unter md mit Seitenformel nicht mehr); Einstieg.tsx Z. 21, 26, 76 (Lotstück).
15. **Prüfzeile für die Galerie** (test/galerie-filter.test.mjs, Orchestrator): Die Spaltengrenzen 42 und 64rem im Galerie-Block von globals.css müssen zu `@2xl:` und `@5xl:` der Liste in GalerieWahl passen; eine Zeile, die beide Stellen vergleicht, sichert das.

### 9.9 Aufräumen (Nacharbeit)

- Server 4480 gestoppt; 4324 und 4325 laufen unberührt.
- `baum/.next` und die echte Kopie von node_modules gelöscht; `baum/node_modules` zeigt wieder auf `/home/user/tezgel/node_modules`.
- Hilfsskripte `_a2n-*.mjs` aus `_werkstatt/werkzeuge` gelöscht. Die Ordner der Prüfer (`pruef-0`, `pruef-1`) unberührt. Keine Git-Schreibvorgänge.
- Diff neu erzeugt: `UM-E4-SICHT-FIX-a2.diff` (12 Dateien wie Runde 1, Aufruf wie oben, 742 Zeilen; nach dem letzten Bau nur noch Kommentare in EinstiegMitte.tsx, globals.css und bewegung.css berichtigt, danach eslint, tsc und werte erneut 0); `patch -p1 --dry-run` sauber gegen das Repository (HEAD 1a848a78). Dazu `UM-E4-SICHT-FIX-a2-nach-b2.diff` (9.5).
