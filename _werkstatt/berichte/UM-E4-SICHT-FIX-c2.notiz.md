# UM-E4-SICHT-FIX · Bauteil SF-C2 (Welle 1) · M-C2 → M-C5 mit M-C4 → M-C7 · Kern 4.4.1

Arbeitskopie `$SCRATCH/sfix/c2/baum` (Abzug HEAD 7e117c19 nach SF-A und SF-B), Vergleich `$SCRATCH/sfix/c2/vor` (unverändert).
Diff: `$SCRATCH/sfix/c2/UM-E4-SICHT-FIX-c2.diff` (nach der Nacharbeit 2: 23 Dateien, 1440 Zeilen; `patch -p1 --dry-run` gegen das Repository nach SF-C1, d55f00d8, ohne Fehler, drei Hunks mit Versatz). Der Diff nach der ersten Nacharbeit liegt als `UM-E4-SICHT-FIX-c2.diff.runde2` daneben. Abschnitt 8 (Nacharbeit 2) geht den Abschnitten 1 bis 7 vor, Abschnitt 7 den Abschnitten 1 bis 6, wo sie abweichen.
Bilder: `$SCRATCH/sfix/c2/bilder/{vor,nach}/{d1440,m390}/{ruhig,bewegt}/<seite>/NN.png` (je Bildschirmhöhe ein Bild, Scroll 0 bis Ende; vorher 4325, nachher 4470).
Prüfbelege: `$SCRATCH/sfix/c2/erstesbild/{vor,nach,vor-200,nach-200}/erstes-bild.json` samt `bilder/`, `$SCRATCH/sfix/c2/lesbarkeit/{vor,nach}/`, `$SCRATCH/sfix/c2/werte/` und `werte-vor/`, `css-vor.css`, `css-nach.css`, Logs `npmtest.log`, `tsc.log`, `eslint.log`, `build.log`, `build2.log`.

## 1 Maßnahmen und Stand

### M-C2 /leistungen · umgesetzt (Nr. 4 seit M-B3, Zeichen `bad` offen beim Orchestrator)
- Nr. 1 `Leistungsplaene.tsx`: die vier Bereiche als eine Fläche an 1-px-Fugen (`gap-px` auf `bg-fuge`, Rahmen außen), keine Kartenrahmen, kein Abstand. Ab lg Raster aus sechs Spalten: erste Reihe halb und halb, zweite Reihe ein Drittel (Balkon) und zwei Drittel (Untergrund), die Fuge der zweiten Reihe steht versetzt (V-9). Planfeld 4 : 3 klein (`w-2/5`, ab 32rem Fliesenbreite links neben dem Text mit `w-1/3`, ab 48rem `w-1/4`), Link direkt unter dem Satz (`mt-2`, keine Bodenausrichtung). Kennungen `#gewerke`, `#bad`, `#wohnen`, `#aussen`, `#untergrund`, `data-uebergang="plan-vor"`, `data-plan-uebergang`, `data-plan-reihe`, `data-motion="sig-plan"`, `sig-plan-ziel`, `data-kopf-pause` bleiben.
- Nr. 2 `SzeneAblauf.tsx`: Prop `form` (`raster` Standard, `treppe` nur mit `bewegt={false}`). Treppe wie `Schritte` der Vorlagen: rote Stufenlinie, ab lg Stufen `lg:mt-16`/`lg:mt-32` mit Setzstufen, mobil auf dem Lot (`-ml-2 md:-ml-4`), Fugenkreuz je Stufe, Planstand ohne Kasten (`w-2/3`, erste Stufe mit Bemaßung), dann Nummer (Mono), Titel (Anzeige fs-5), Satz. /bad (bewegte Szene) unverändert.
- Nr. 3 Formatregler als eigener Abschnitt über `nachTun` (`Abschnitt id="formatregler"`, mittig, Leitachse, spät), H2 = `FORMATREGLER_TITEL` aus `inhalte/leistungen.ts` („Große Fliesen haben weniger Fugen.“, Wortlaut gleich). `Formatregler` mit Prop `titel` (Standard true; auf /leistungen false: keine figcaption). Schieberegler bündig unter der Wand, Hinweis direkt darunter mittig. Mikrotext: „Große Fliese“, das Maß „bis 120 × 260 cm“ in eigener Zeile (Mono fs-1), beide Namen an der Unterkante ausgerichtet.
- Nr. 4 „Sie möchten mehr erzählen?“ im Zusatz des Formular-Schritts: seit SF-B (M-B3), unverändert.
- Nr. 5 Fotoreihe „Drei Arbeiten von uns.“: `bad-beleg-4` (bodengleiche Dusche) zuerst, Unterschrift von /bad/barrierefreies-bad „Bodengleiche Dusche mit Mosaik“, Ziel `/bad`; `bad-beleg-1` verlässt die Reihe (V-12).
- Nr. 6 `Schritt1.jsx` (nur Darstellung): gleiche Spalten (ab sm zwei, ab lg drei), zweite Reihe in denselben Spalten, freie letzte Zelle als ruhige Fläche (`span aria-hidden`, `bg-fliese`, ohne Rolle), Inhalt oben bündig (`sm:justify-start`, `sm:gap-3`), Symbol auf allen Breiten Stufe 6. Werte, Namen, `aria-pressed`, Klick, Weiter-Knopf und Felder unverändert (G8). Das Zeichen `bad` im Sprite: siehe O-4.

### M-C5 /kontakt · umgesetzt bis auf die Abstände im Einstieg (V-1)
- Nr. 1 H1 in zwei Satzzeilen (`KONTAKT.titelZeilen`, Prop `titelZeilen` durch `ArbeitsSeite` an den unveränderten Einstieg, Wortlaut gleich). Der Vorspann steht unter dem Formular im Abschnitt `express-anfrage` (Text gleich, `Textmarken … fugen`), im Einstieg nicht mehr (Prop `vorspann` in ArbeitsSeite optional). Abstände des Einstiegs: nicht geändert (gemeinsame Vorlage), ersatzweise beginnt der Formularabschnitt dicht (`dicht`: `pt-8 lg:pt-12`), V-1.
- Nr. 2 Einleitung des Formularabschnitts fs-2 (`einleitungKlein`), H2 bleibt.
- Nr. 3 Kacheln nach M-C2 Nr. 6.
- Nr. 4 Einsatzkarte (liste=false) auf voller Kastenbreite (bei d1440 rund 600 px statt 300 px); Namen außerhalb der Ringe mit 1-px-Führungslinie auf Papierfläche; Ringmaße am Ringrand unten links; unbenannte Punkte entfallen (V-2); Mikrotext „Abstände nicht maßstäblich.“ in der Legende; Wurzelmaßstab unverändert (`radius(10)` 84,9, `radius(25)` 134,2); ein einziges `role="img"` mit dem bisherigen Namen.
- Nr. 5 Kontaktkarte ohne obere Trennlinie im Kasten (`DirectContactCard`), `-mt-4` gleicht den Innenabstand der ersten Zeile aus (V-15).
- Nr. 6 Absatz unter der Treppe an der Flucht der Schritttexte: mobil `pl-6` (Textkante der Schritte, 40 px), md `pl-4`, ab lg unter Stufe 02 (`lg:grid-cols-3`, `lg:col-span-2 lg:col-start-2`) wie der Hinweis der Vorlagen-Treppe (V-14).
- Der Hauptknopf im Einstieg bleibt (K-010).

### M-C4 /ueber-uns · umgesetzt, Folge nach Orchestrator-Entscheidung (Geschichte bleibt in `nachTun`, `nachLage` aus)
- Nr. 1 `CompanyHistory.jsx`: kein Mono-Etikett über der H2 (K-006); sein Inhalt steht als Satz am Anfang der Einleitung: „Gegründet 2008 in Aßlar, eingetragen bei der Handwerkskammer Wiesbaden.“ (Mikrotext aus Firmendaten, V-5). Motto lösbar: Prop `motto` (Standard true), neue Komponente `Leitsatz` (Motto ohne Kasten, mittig, Anzeige fs-5/lg fs-6, Unterschrift in Text fs-2, Wortlaut und Unterschrift unverändert). Auf /ueber-uns steht der Leitsatz im Slot `nachBeleg` direkt nach den Stimmen auf deren Fläche, vor Versprechen und Schritt (V-4). Die Seite endet weiter einmal (seit V-16 von SF-B).
- Nr. 2 `Werte.tsx`: Vertrauensliste an der Fuge ohne Symbolraster: die zwei belegten Fakten groß nebeneinander (ab md je halbe Breite), die übrigen vier als Zeilen (Name links, Satz rechts ab md, mobil untereinander), alles linksbündig. Wortlaut und Garantie-Prüfung unverändert; `zeichen` bleibt in den Daten (V-13).
- Nr. 3 Fotoreihe der Arbeitsweise unter der Zeitleiste (Prop `unten` in CompanyHistory, Inhalt `ARBEITSWEISE` in `inhalte/ueber-uns.ts`): `entstehung-dusche-1`, `sanierung-weg-2`, `balkon-stelzlager` als Karussell-Reihe mit Glasfläche (wie die Fotos im Beleg), Namen wörtlich aus der Galerie-Gruppe „So arbeiten wir“, kein Link, kein Jahresbezug. Nicht `start-galerie-6`.
- Nr. 4 Einsatzkarte mit Liste: mobil im nativen Aufklapper „Alle 13 Orte zeigen“ (Zahl aus `CITIES.length`), ab lg offen in zwei Spalten (bis 25 km | mehr als 25 km) ohne Zeile zum Öffnen (globals.css „Einsatzkarte · Ortsliste“, V-3); Namen und Ringmaße wie M-C5 Nr. 4.

### M-C7 /fliesen · umgesetzt bis auf Format 4 : 3, 8 bis 12 Fliesen je Reihe und Fugenfarbe (V-6)
- Nr. 1 `VerbandProbe.tsx`: ein Feld unter den Reitern; der Satz zum Muster steht direkt unter den Reitern (gleiche Rasterzelle, kein Springen; ohne `:has()` weiter alle vier untereinander). Ab lg Zeichnung auf drei Fünfteln (`lg:grid-cols-5`, `lg:col-span-3`), rote Laserlinie als Bezugsachse in der Raummitte (Stoßfuge der Kreuzfuge, über die Wand hinaus). Fliesen als Fläche Fliese, Fugen in Strich (V-6). Geometrie unverändert.
- Nr. 2 Start Halbverband (`start="halb"` auf /fliesen; Standard der Komponente bleibt `kreuz`). Foto zum Muster im selben Feld rechts (ab lg zwei Fünftel, `max-w-md`, `flaeche`, Alt-Text aus ARBEITEN): `fliesen-halbverband` bei Halbverband, `fliesen-fischgraet` bei Fischgrät, sonst keines (bewegung.css Block „verband · Foto im Feld“, V-7). Der zweite Kasten mit zwei Fotos entfällt.
- Nr. 3 Beleg „Fliesen, die wir verlegt haben.“: drei Fotos nach Raum als Reihe mit Drittelversatz (`fotosVersatz`): `bad-beleg-3` „Bad mit Ornamentboden“ → /bad, `kontakt-eingang` „Stufen mit beigen Fliesen“ → /treppen, `balkon-beleg-3` „Terrasse mit Fliesen in Erdtönen“ → /balkon-terrasse; ohne `start-dusche` (V-11).
- Nr. 4 Konfigurator geschlossen im Abschluss, Hilfen-Link entfällt: seit SF-B (M-B3), unverändert.
- Nr. 5 Schichtzeichnung: vorhandene statische Vignette `untergrund` im selben Wissensblock nach dem Verband-Wähler (`max-w-md`), Unterschrift ein vorhandener Satz der Seite: „Wir fliesen, wenn der Estrich fertig ist.“ (Wegzeile „Fliesen im Neubau“ der Lage, als Klartext; V-8). Kein Registereintrag (statisch).

## 2 Entscheidungsvermerke

- **V-1 /kontakt: Abstände des kompakten Einstiegs nicht geändert, Vorspann leer, Formularabschnitt dicht.** Ziel: Kastenkopf und erste Kachelreihe bei d1440 im ersten Bild (M-C5 Nr. 1). Die Abstände (`lg:pt-24`, `pb-8`) und das Weglassen des Vorspanns gehören in `vorlagen/teile/Einstieg.tsx`, die Vorlage ist für SF-C2 gesperrt. Alternativen: (a) Prop im Einstieg (gesperrt); (b) eigener Einstieg in ArbeitsSeite (doppelte Knöpfe, Erstes-Bild-Marken und Flach-Regeln, driftet von SF-A weg); (c) Formular mit seitlichem Kopf (gegen Ruhe-Regel „Köpfe mittig“); (d) gewählt: ArbeitsSeite gibt `vorspann ?? ''` weiter, der Formularabschnitt beginnt eine Stufe dichter (`pt-8 lg:pt-12`). Wirkung: Der Kasten beginnt bei d1440 rund 110 px höher (Oberkante etwa 776 statt 888 px); Kastenkopf-Zeile „Kurze Anfrage in drei Schritten“ im ersten Bild, die H3 „Schritt 1“ steht am Falz, die erste Kachelreihe nicht. Mobil folgt der Formularabschnitt direkt auf Hauptknopf und Anruf. Risiko: Der Einstieg rendert ein leeres `p` mit `mt-8` (32 px Raum, keine Rolle, kein Text; axe hat dafür keine Regel). Rückweg: `vorspann={KONTAKT.vorspann}` an ArbeitsSeite, Absatz unter dem Formular und `dicht` entfernen. Siehe O-1.
- **V-2 Einsatzkarte: unbenannte Punkte entfallen, statt benannt zu werden.** Ziel: keine Streupunkte, keine Namen auf Ringen. Zwölf Namen passen bei m360 bis m430 nicht außerhalb der Ringe (Bänder oben und unten je rund 50 px). Gezeichnet werden nur Orte mit Namen (Standard Wetzlar, Gießen, Herborn, wie im Satz der Seite), die Liste bzw. /standorte nennt alle. Neu in `geometrie.ts`: `FUEHRUNG` (Anker außerhalb des äußeren Rings, |y| ≥ 142) und `ringmass(km)` (225°); bestehende Exporte und Tests unverändert. Das Legendenzeichen „Jeder Punkt …“ zeigt nur noch einen gefüllten Punkt. Ein Ort mit `aktuell` (Ortsseite) behält seine Lage am Punkt. Risiko: Die weite Zone hat keinen Punkt mehr in der Zeichnung (Register `karte`: Gruppe bleibt leer, Staffel unverändert). Rückweg: Filter `benannt` in Einsatzkarte auf alle `PUNKTE` zurück.
- **V-3 Ortsliste ab lg offen über `::details-content`.** Ziel: mobil zu, ab lg offen (M-C4 Nr. 4) ohne JavaScript und ohne doppelte Liste im DOM. Alternativen: zwei Fassungen (doppelte Links und Inhalte); Aufklapper auf allen Breiten (gegen den Plan). Gewählt: CSS in globals.css nur unter `@supports selector(::details-content)` und ab 64rem (Zeile ausgeblendet, Inhalt sichtbar). Wirkung: in Chromium geprüft (d1440 zwei Spalten offen, m390 geschlossen). Risiko: Firefox und Safari hier nicht geprüft; ohne Unterstützung bleibt die Zeile sichtbar und der Aufklapper bedienbar. Rückweg: Block in globals.css löschen.
- **V-4 Leitsatz im Slot `nachBeleg` auf der Fläche der Stimmen.** Ziel: Motto ohne Kasten als letzte Zeile nach den Stimmen. `Beleg.tsx` (gemeinsame Vorlage, Welle 2 M-B6) hat keinen Platz nach den Stimmen; ein eigener Streifen auf Kalk verschmölze mit dem Versprechen darunter. Gewählt: `nachBeleg` mit `relative -mt-px border-b border-fuge bg-fliese`: Der Leitsatz liegt über der unteren Fuge der Stimmen und setzt sie selbst darunter fort. „Direkt vor dem Schritt“ gilt nur bis auf das geschlossene Versprechen, das nach `folge.ts` zwischen Beleg und Schritt steht. Rückweg: `nachBeleg` entfernen, `motto` in CompanyHistory wieder an.
- **V-5 Satz statt Etikett in der Firmengeschichte.** „Gegründet {Jahr} in {Ort}, eingetragen bei der {authority.name}.“ statt „Gegründet 2008 in Aßlar · HWK Wiesbaden“ (Mikrotext, Firmendaten unverändert, nur Langform des Kammernamens). Steht als erster Satz in der Einleitung, damit Kopf und Satz eine Einheit bleiben. Rückweg: Etikett wieder setzen.
- **V-6 Verband-Wähler: Format 9 : 5 und 4,5 Fliesen je Reihe bleiben, Fugen in Strich.** Ziel M-C7 Nr. 1: 4 : 3, 8 bis 12 Fliesen je Reihe, Fugen in `fuge`. `test/verband.test.mjs` schreibt die Geometrie fest (Verband 3: Fischgrät 30 bis 60 Platten und höchstens 4000 Zeichen Pfad; Verband 5: fünf Reihen; Verband 2: Fischgrät-Platte = Reihenplatte). Kleinere Platten verlangten ein Lockern von Verband 3 (G7). Die Fugenfarbe `fuge` auf `fliese` hätte einen Kontrast von etwa 1,3 : 1. Die Fugen sind hier der Inhalt der Zeichnung, `strich` erreicht etwa 3,6 : 1. Umgesetzt: drei Fünftel Breite, rote Bezugsachse, Satz unter den Reitern, Foto im Feld. Wirkung: Eine Platte ist bei d1440 rund 150 px breit statt rund 250 px; die „leeren Rechtecke“ (a1/b1) sind kleiner, aber nicht maßstäblich dicht. Rückweg: entfällt; Weiterführung siehe O-2.
- **V-7 Foto im Feld ohne Übergang; bei Kreuzfuge und Drittelverband ohne Foto.** Der Fotowechsel ist ein Zustand (`display`) wie der Satzwechsel, keine Bewegung, keine neue Kennung. Ab lg bleibt die rechte Spalte frei, die Zeichnung steht still (Zeilenhöhe von der Zeichnung). Mobil rückt der Inhalt darunter beim Wechsel zu Kreuzfuge oder Drittelverband um die Fotohöhe nach oben (nur nach Tippen). Das Fischgrät-Foto lädt erst, wenn es gezeigt wird (lazy). Rückweg: Block „verband · Foto im Feld“ und `FOTOS` im Feld entfernen.
- **V-8 Unterschrift der Schichtzeichnung aus der Lage, nicht aus dem Wissensblock.** Jeder Satz des Blocks stünde ein zweites Mal im selben Bildschirm (Wegzeilen direkt darunter); „Wir fliesen, wenn der Estrich fertig ist.“ steht in der Lage (anderer Abschnitt), „Estrich“ ist dort beim ersten Vorkommen erklärt. Textvorschlag 1 für einen eigenen Satz.
- **V-9 Zweite Reihe der Bereiche ein Drittel plus zwei Drittel** statt zwei plus ein Drittel: Der kurze Satz (Balkon) steht in der schmalen, der lange (Untergrund, vier Sätze) in der breiten Fliese. Der Verband ist derselbe.
- **V-10 Formatregler-Abschnitt auf Kalk** direkt nach „Was wir tun“ (Kalk): kein Kantenkreuz dazwischen (Leitfaden nur an Trennlinien); die H2 in der Abschnittsstufe fs-6 wie alle H2 der Seite (b4 schlug fs-5 vor).
- **V-11 Fotos im Beleg /fliesen:** nach Raum aus dem Bestand gewählt, außerhalb der Galerie bisher höchstens einmal genutzt (`bad-beleg-3` /bad; `kontakt-eingang` und `balkon-beleg-3` nur Galerie). Namen aus Wörtern des Alt-Texts (Mikrotext, höchstens sechs Wörter). Danach je höchstens zweimal außerhalb der Galerie.
- **V-12 Erstes Foto /leistungen:** `bad-beleg-4` (außerhalb der Galerie bisher nur /bad/barrierefreies-bad), Unterschrift von dort übernommen; „bodengleiche Dusche“ ist auf der Seite vorher in „Was wir tun“ erklärt.
- **V-13 `zeichen` der Werte bleibt in den Daten**, der Baustein zeigt es nicht mehr. So bleibt `inhalte/ueber-uns.ts` bis auf `ARBEITSWEISE` unverändert, Rückweg ohne Datenänderung.
- **V-14 Absatz unter der Treppe /kontakt ab lg unter Stufe 02** (b4, zweite Variante), wie der Hinweis der Vorlagen-Treppe seit M-B7; mobil an der Textkante der Schritte.
- **V-15 Kontaktkarte `-mt-4`** nach dem Entfernen der oberen Linie, sonst stand die erste Zeile 48 px unter dem Rahmen.
- **V-16 Bilder als Folge je Bildschirmhöhe statt Vollbild.** Die Vollbildaufnahme (Playwright `fullPage`) verkleinerte bei H1 in Satzzeilen auf 4470 die Schrift im Bild, obwohl die berechnete Größe gleich blieb (/kontakt 55,68 px vorher und nachher, auch nach der Aufnahme gemessen). Messartefakt, nicht umgebaut (G7). Alle Bilder vorher und nachher daher Bildschirm für Bildschirm wie `bildsatz.mjs`.
- **V-17 Datei außerhalb der Spalte `dateien`:** `src/components/momente/karte/geometrie.ts` (zwei neue Exporte für V-2, Wurzelmaßstab und Tests unverändert). Gemeinsame Dateien nur mit eigenen Blöcken: globals.css „Einsatzkarte · Ortsliste“ (nach `.karte-marke`), bewegung.css „verband · Foto im Feld“ (im Block verband). `register.json`, KERN und Tests unverändert (keine neue Kennung).

## 3 Gewollte Pixeländerungen je Ansicht

- `/leistungen` (alle Größen): „Was wir tun“ als verlegte Fläche mit kleinen Plänen; neuer Abschnitt Formatregler mit H2, Regler bündig, Maß in eigener Zeile; Ablauf als Treppe mit Planständen; erstes Foto der Reihe; Kacheln in Schritt 1. Erster Bildschirm unverändert (erstesbild gleich). Seitenhöhe d1440 11.051 → 10.529, m390 12.244 → 11.488.
- `/kontakt`: Einstieg mit H1 in zwei Satzzeilen und ohne Vorspann; Formularabschnitt dichter, Einleitung kleiner; Vorspann unter dem Formular; Kacheln; Kontaktkarte ohne obere Linie; Karte auf voller Kastenbreite mit Namen außerhalb der Ringe, Ringmaßen am Rand und Maßstabshinweis; Absatz unter der Treppe. Seitenhöhe d1440 6.235 → 6.662 (Karte größer), m390 7.087 → 7.097.
- `/ueber-uns`: Kopf der Geschichte ohne Etikett; Fotoreihe unter der Zeitleiste; Mottokasten mitten auf der Seite entfällt; Leitsatz nach den Stimmen; Werte als Liste ohne Zeichen; Karte mit Führungslinien und Maßstabshinweis, Ortsliste mobil geschlossen, ab lg zweispaltig. Seitenhöhe d1440 12.876 → 13.365, m390 13.373 → 12.957.
- `/fliesen`: Verband-Wähler (Satz unter den Reitern, Zeichnung drei Fünftel, rote Achse, Foto im Feld, Start Halbverband); zweiter Fotokasten entfällt; Schichtzeichnung; Beleg mit drei Fotos und Versatz. Seitenhöhe d1440 10.984 → 10.416, m390 10.460 → 10.422.
- Alle Seiten mit sichtbarem Schritt 1 der Express-Anfrage (`TezgelAnfrageFunnel`): Kachelraster (u. a. /preise, /foerderung, /leistungen/[id], Unterseiten von /fliesen und /bad mit offenem Formular).
- Unverändert: `/` (Formular dort `HeroContactForm`; keine geänderte Komponente auf `/`), /bad (Szene `raster` bewegt), Ortsseiten (keine Einsatzkarte). Erster Bildschirm aller vier Ansichten in q844, m390, d1440 und m360 bei 200 % je Fall gleich (32 von 32).

## 4 Textvorschläge

1. Ansicht: /fliesen · Stelle: Unterschrift der Schichtzeichnung im Block „Alles beginnt mit dem Boden.“ · heute (übernommen): „Wir fliesen, wenn der Estrich fertig ist.“ · Vorschlag: „Unter der Fliese liegen Estrich und Abdichtung, in der Ecke ein Dichtband.“ (mit Textmarke für „Abdichtung“, falls dort erstes Vorkommen) · Grund: ein eigener Satz, was man sieht (K-003 Nr. 3); der übernommene Satz ist eine Doppelung aus der Lage.
2. Ansicht: /ueber-uns · Stelle: Einleitung „Das sagen unsere Kunden.“ · heute: „… Die Sätze stehen so, wie sie geschrieben wurden. Unser Motto: „Die Zufriedenheit unserer Kunden ist die beste Reklame für uns.““ · Vorschlag: den Satz „Unser Motto: …“ streichen · Grund: Der Leitsatz steht jetzt direkt nach den Stimmen; das Motto stünde zweimal in einem Bildschirm (nicht_umsetzen: Kürzung nur als Vorschlag).
3. Ansicht: /ueber-uns · Stelle: Einleitung der Firmengeschichte · heute: „Gegründet 2008 in Aßlar, eingetragen bei der Handwerkskammer Wiesbaden. Von der Betriebsgründung in Aßlar bis zum Fliesenfachbetrieb für ganz Mittelhessen: …“ · Vorschlag: „… Von der Gründung bis zum Fliesenfachbetrieb für ganz Mittelhessen: …“ · Grund: „in Aßlar“ zweimal hintereinander, seit der Etikett-Satz davor steht.
4. Ansicht: /kontakt · Stelle: Vorspann, jetzt unter dem Formular · heute: „Wollen Sie Ihre Badewanne gegen eine Dusche ohne Stufe tauschen oder einen Boden neu verlegen lassen? Dann genügt ein Anruf oder eine kurze Nachricht. Der Termin bei Ihnen vor Ort ist für Sie kostenfrei, und wir beraten Sie dabei persönlich.“ · Vorschlag: „Lieber erst sprechen? Dann genügt ein Anruf. Der Termin bei Ihnen vor Ort ist kostenfrei.“ · Grund: Unter dem Formular wiederholt der erste Satz die Auswahl der Kacheln; kurz liest er sich als Hinweis statt als zweite Einleitung.

## 5 Offene Fragen

- O-1: Darf `Einstieg.tsx` (SF-A) für `kompakt` einen optionalen Vorspann und eine dichte Stufe bekommen (`lg:pt-24`, `pb-8`)? Dann entfiele das leere `p`, und bei d1440 rückten rund 100 px weiter nach oben (erste Kachelreihe am Falz). Rückweg in V-1.
- O-2: Neue Geometrie des Verband-Wählers (Platte 40 × 20, zehn Reihen, 4 : 3) verlangt geänderte Grenzen in `test/verband.test.mjs` (Verband 3 und 5). Nur mit Zustimmung (G7).
- O-3: Fugenfarbe der Musterzeichnung: `strich` (lesbar, gewählt) oder `fuge` nach Plan (Kontrast etwa 1,3 : 1)?
- O-4: Zeichen `bad` im Sprite: Mit Stufe 6 ist es größer, die Form ist unverändert. Ob es sich weiter wie ein Bildschirm liest, entscheidet der Orchestrator (gemeinsame Datei, Icon ≤ 1,5 KB).
- O-5: `register.json` `verband.was` könnte den Fotowechsel nennen („das Foto zum Muster wechselt mit“). Nicht geändert, weil keine Bewegung dazukommt.
- O-6: `::details-content` in Firefox und Safari hier nicht prüfbar (V-3).
- O-7: Die Ortsliste trägt den Inhalt der Zeichnung als Text (A6). Mobil steht sie jetzt hinter einem Tippen. Der Plan hat das so vorgesehen; bitte bestätigen.

## 6 Prüfzahlen

- `npm test`: 266 Tests, 266 bestanden, 0 fehlgeschlagen, 0 übersprungen (erster Lauf vor dem ersten Bau: 265 bestanden, 1 übersprungen).
- `npx tsc --noEmit`: Exit 0. `npx eslint` über die 19 geänderten JS/TS-Dateien: Exit 0, keine Meldung.
- `node werte.mjs` über die 21 geänderten Dateien: 5 Befunde, dieselben 5 in denselben Dateien im Stand `vor`. Alle bestehen schon vorher: bewegung.css 1855/1856 und globals.css 442/443 „0.01ms“, `align-[-0.2em]` im unveränderten Weiter-Knopf von Schritt1. Neu: 0.
- `next build`: Exit 0 (zweimal; zweiter Bau nach V-8). Ein Stylesheet für alle geprüften Seiten (/, /leistungen, /kontakt, /ueber-uns, /fliesen dieselbe Datei).
- CSS gebaut: roh 137.787 → 138.471 B (+684), gzip -9 23.632 → 23.755 B (+123), gzip -6 23.750 → 23.873 B (+123). Neu: `-mt-4`, `-mt-px`, `@3xl:w-1/4`, `@lg:items-start`, `@lg:w-1/3`, `@xs:items-end`, `lg:border-y-0`, `lg:grid-cols-5`, `md:pl-4`, `orte-zu`, `pl-1`, `sm:gap-3`, `sm:justify-start`, `verband-foto`, `w-2/3`. Entfallen: `mt-24`, `sm:size-6`, `xl:col-span-2`, `xl:grid-cols-4`.
- erstesbild (Kopie mit `C2_SCHRIFT=200`: Init-Skript wie `einzelbild.mjs --schrift`; sonst `erstesbild.mjs` unverändert; Seiten /leistungen, /kontakt, /ueber-uns, /fliesen):
  - q844, m390, d1440: vorher und nachher je Fall gleich. Nach Einwilligung 12/12 mit 5/5. Erstbesuch q844 1/5 auf allen vier (Banner), m390 4/5 auf /leistungen, /kontakt, /ueber-uns (Kontakt unter dem Banner), /fliesen 5/5, d1440 5/5.
  - m360 bei 200 %: vorher und nachher je Fall gleich. Erstbesuch 1/5 auf allen vier (Banner). Nach Einwilligung /leistungen 3/5 (H1 unter der unteren Leiste, Ort unter dem Falz), /kontakt 4/5 (Ort unter dem Falz), /ueber-uns 3/5 (H1 verdeckt, Ort unter dem Falz), /fliesen 4/5 (Ort unter dem Falz).
  - Nicht durch SF-C2. Die Reste bei m360 auf /leistungen und /ueber-uns warten auf T-A1 bis T-A4.
- lesbarkeit.mjs (vorher → nachher, alle GRÜN): /leistungen Flesch 76,5 → 76,4; /kontakt 79 → 78,6; /ueber-uns 64,8 → 64,7; /fliesen 61,6 → 61. Glossar offen überall 0, längster Satz unverändert.
- Keine Lighthouse- und keine Zeitmessung (E-076).
- Aufgeräumt: Server 4470 gestoppt (nur der eigene Prozess, geprüft über das Arbeitsverzeichnis), `.next`, die echte Kopie von node_modules und `tsconfig.tsbuildinfo` gelöscht, Symlink wiederhergestellt; Hilfsskripte `_c2-*.mjs` aus `werkzeuge/` gelöscht (die `_c1-*` gehören SF-C1 und stehen noch dort). 4325 lief durchgehend.

## 7 Nacharbeit nach der Prüfung (Welle 1, 17 Befunde)

Stand 4470 nach der Nacharbeit gegen 4325 (HEAD nach SF-A und SF-B, unverändert). Belege: Messungen `$SCRATCH/sfix/c2/nach2/mass.json` und `mass2.json` (vorher und nachher), Kartenmatrix `nach2/karte.json` mit `karte.log`, Ausschnitte `nach2/b/*.png`, erstes Bild `erstesbild2/{vor,nach,vor-200,nach-200}/erstes-bild.json`, Lesbarkeit `lesbarkeit2/nach/`, Werte `werte2/`, Logs `build3.log` bis `build5.log`, `npmtest2.log`, `tsc2.log`, `eslint2.log`, `werte2.log`. Bilder `bilder/nach/{d1440,m390}/{ruhig,bewegt}/<seite>/NN.png` neu (Bildschirm für Bildschirm wie V-16), `bilder/vor/` unverändert (4325 unverändert). Hilfsskripte liegen in `$SCRATCH/sfix/c2/werkzeug/` (`c2-nach.mjs`, `c2-schnitt.mjs`, `c2-erstesbild.mjs`, `eb-vergleich.py`, `lauf-nach2.sh`).

### 7.1 Befunde: geprüft und behoben

Jeden Befund am Stand nachgemessen (Werte vorher 4325 → nachher 4470).

1. **/kontakt: Formular nicht im ersten Bild, dreifache Ankündigung (mittel).** Bestätigt. Behoben: Der Formularabschnitt zeigt keinen Kopf mehr (`kopfVerborgen` in ArbeitsSeite). Die H2 „Termin vor Ort anfragen“ steht nur für Hilfsmittel (sr-only, Kennung `express-anfrage-heading`), die Region trägt denselben Namen. Die Einleitung des Abschnitts steht wörtlich unter dem Formular in fs-2, vor dem Vorspann. Der leere Absatz des Einstiegs ist ausgeblendet (Nr. 15). Oberkante der ersten Kachel (Bildhöhe in Klammern): d1440 1136 → 792 (900), t1024 1097 → 765 (768; Kastenkopf 588), t768 1023 → 699 (1024), m390 1299 → 851 (844; Kastenkopf 614, der Kasten beginnt im ersten Bild), m360 1322 → 847 (740; Kastenkopf 611), q844 847 → 537 (390; Kastenkopf 362). Sichtbar folgen jetzt Hauptknopf, Kastenkopf und „Schritt 1“; die Zeile „Termin vor Ort anfragen“ steht nicht mehr zweimal untereinander. Der Hauptknopf springt weiter nur kurz (K-010, Plan). V-18, V-19.
2. **Ortsliste /ueber-uns im Satzmaß (mittel).** Bestätigt. Behoben: Block aus Legende und Liste ab lg auf der Breite des Kastens (`lg:max-w-full`). Spalten bei d1440 247 → 551 px, t1024 407 px; jede Zeile wieder eine Zeile (li 68 → 45 px, Name links, Entfernung rechts); Figur 1727 (vorher) → 1436 px.
3. **Motto dreimal auf /ueber-uns (mittel).** Bestätigt, nur teilweise behoben: Der Leitsatz steht eine Stufe leiser (fs-4, ab lg fs-5; zwei Zeilen statt drei in Anzeigegröße fs-6), also als Schlusszeile und nicht mehr als lauteste Wiederholung. Es bleibt bei drei Vorkommen, weil die anderen beiden Wortlaut sind: Einleitung der Stimmen (Text, Textvorschlag 2) und der Wert „Kundenbegeisterung“ (EP2, F-19, Wortlaut aus `values`). Siehe nicht_behoben.
4. **/fliesen Beleg ohne große Fliesen (mittel).** Bestätigt. Behoben: Großformat zuerst. Die Reihe: `start-lage-dusche` „Dusche mit weißen Großformatfliesen“ → /bad, `start-beleg-treppe` „Außentreppe in Anthrazit“ (Name wie auf /) → /treppen, `start-lage-balkon` „Balkon mit hellgrauen Großformatfliesen“ → /balkon-terrasse. Kein Foto steht doppelt auf /fliesen; jedes steht außerhalb der Galerie jetzt zweimal (/ und /fliesen, M-A2). `balkon-beleg-3` (Vorschlag in M-A2 für Ortsaufmacher) und `kontakt-eingang` sind wieder frei, also keine Überschneidung mit SF-C1. V-22.
5. **Verband: leere Rechtecke, leere rechte Hälfte, Sprung (mittel).** Bestätigt. (a) Teilweise behoben: Die Fliesen liegen als Fläche (Füllung `fuge`) auf dem weißen Feld, die Fugen in `tinte-2` (etwa 4,9 : 1 zur Fläche; `strich` auf `fuge` hätte nur etwa 2,7 : 1). Die Kreuzfuge liest sich als verlegte Wand, nicht mehr als leeres Gitter. Nicht behoben ist die kleinere Platte mit 8 bis 12 Fliesen je Reihe im Format 4 : 3 (O-2, `test/verband.test.mjs` Verband 3 und 5, G7). (b) Behoben: Bei Kreuzfuge und Drittelverband entfällt die Fotozelle, und die Zeichnung steht ab lg mittig (Spalten 2 bis 4 von 5, x 137 → 377 bei d1440). Die Höhe des Felds bleibt in allen vier Zuständen 437 px (d1440). (c) Mobil nicht behoben, bewusst (V-7): m390 456 ↔ 216 px, t768 734 ↔ 412 px, nur nach dem Tippen und unterhalb der Wahl. Eine reservierte Fotohöhe ließe dort 216 bis 300 px leer. V-21.
6. **Formatregler: Namen versetzt, zwei Griffe (gering).** (a) Behoben: Beide Namen stehen oben bündig auf einer Zeile (Abstand der Oberkanten 0 px bei d1440, t768 und m390), das Maß „bis 120 × 260 cm“ steht als eigene Zeile unter „Große Fliese“. (b) Nicht geändert, siehe nicht_behoben.
7. **Kacheln Schritt 1 (gering).** Spalten richten sich nach der Breite des Formularkastens statt nach der des Fensters (Containerabfrage: ab 28rem zwei, ab 48rem drei Spalten). Im schmalen Kasten von /kontakt und /leistungen bei d1440 stehen jetzt zwei Spalten mit je 252 px statt drei mit je 168 px; t768, m390 und /preise wie vorher. Werte, Namen, `aria-pressed` und Verhalten bleiben gleich (G8). Das Zeichen `bad` ist nicht geändert (O-4, gemeinsame Datei). V-24.
8. **Ablauf-Treppe unter lg (gering).** Teilweise behoben: Der Planstand ist ab sm unter lg ein Drittel der Spalte breit (am Handy wie bisher zwei Drittel, ab lg zwei Drittel bis max-w-md). Abschnitt t768 1834 → 1157 px, q844 1842 → 1216 px. Den Einzug der Zeichnung gleiche ich nicht aus: Der Rand im Planrahmen beträgt 22 Einheiten mit Bemaßung (Stufe 1) und 6 ohne (Stufen 2 und 3), ein fester negativer Rand passt nicht für beide.
9. **Leistungspläne: ungleiche Anordnung (gering).** Behoben: Der Plan steht in allen vier Fliesen oben, gleich groß (`w-32`, 128 × 96 px, ein Wert). Die Leerfläche durch gleiche Reihenhöhen bleibt wie vorgeschlagen (d1440: Bad und Balkon je 62 px; t768: Balkon 233 px). Abschnitt d1440 863 px. V-23.
10. **Führungslinie Gießen als Tangente (gering).** Behoben mit Nr. 14: Die Linie läuft vom Ring schräg nach außen (45°) und dann senkrecht in die Ecke oben rechts.
11. **Schichtzeichnung /fliesen ohne Fassung (gering).** Behoben, bis auf den Satz: Die Zeichnung steht im Feld wie der Wähler darüber (Rahmen `fuge`, Fläche `fliese`, gleiche Kante). Ab lg steht die Zeichnung auf drei Fünfteln und der Satz daneben in fs-3, wie beim Muster. Der Satz selbst bleibt (Textvorschlag 1).
12. **Vorspann unter dem Formular (gering).** Behoben wie vorgeschlagen: Der Vorspann steht in fs-2, nach der Einleitung des Abschnitts. Die Kürzung bleibt Textvorschlag 4.
13. **Firmengeschichte: Doppelung, Fotoreihe ohne Zeile (gering).** Behoben: Der Satz über der Zeitleiste heißt nur noch „Eingetragen bei der Handwerkskammer Wiesbaden.“ (Mikrotext, wie vorgeschlagen nur die Kammer). „in Aßlar“ steht damit einmal im Absatz, „Gegründet 2008“ nicht mehr dreimal. Die Fotoreihe hat eine eigene Zeile, H3 „Auf der Baustelle“ (Mikrotext). Nicht „So arbeiten wir“: Die Seite trägt weiter unten die H2 „So arbeiten wir mit Ihnen.“, und alle drei Fotos zeigen Arbeit im Gang. Die Trennung „Fliesenfachbe-trieb“ bleibt (FUGEN in `kern/zusammen.tsx`, gemeinsame Datei). V-26, V-27.
14. **Karte: Namen bei größerer Schrift beschnitten (mittel).** Bestätigt mit den Daten des Prüfers. Behoben: Die Namen stehen in freien Ecken der Fläche und wachsen vom Anker nach außen (`FUEHRUNG` mit `ecke` und Linienzug in geometrie.ts). Herborn steht oben links, Gießen oben rechts, Wetzlar unten rechts außerhalb des Rings. Die Linie endet unter dem Namen, sein Grund deckt das Ende. Messung wie beim Prüfer, ergänzt um m320 und t1024: m320, m360, m390, m430, t768, t1024 und d1440 bei 100, 110, 125, 150, 175 und 200 % auf /kontakt und /ueber-uns, zusammen 84 Fälle. In 54 Fällen stehen Namen; davon ist keiner beschnitten (vorher 26 von 48 in den Läufen des Prüfers), keiner liegt näher als 136 Einheiten am Mittelpunkt (Ring 25 km: 134,2), und keine zwei Beschriftungen überlappen. Ausgeblendet sind die Namen in denselben 30 Fällen wie im Stand des Prüfers (Schwelle 16rem unverändert; vorher zusätzlich t1024 bei 175 und 200 % auf /kontakt, wo die Karte nur 300 px breit war). Wurzelmaßstab und `test/karte.test.mjs` unverändert. V-20.
15. **Leerer Absatz im Einstieg (gering).** Behoben: globals.css „Einstieg · leerer Vorspann“ blendet einen leeren Absatz im Einstieg aus (`[data-formel="worum"] p:empty`). Im DOM steht er noch (der gesperrte Einstieg setzt ihn), sichtbar ist er nicht mehr. V-19.
16. **Mobiler Sprung im Verband (gering).** Wie Nr. 5 (c), bewusst (V-7).
17. **Register und K-008 zur leeren Zone weit (gering).** Den Registertext habe ich nachgezogen und wieder zurückgenommen: `register.json` spiegelt `src/lib/motion/register.ts` (Test „Bewegung 13“, deepEqual), und register.ts gehört zum Bewegungsmodul. Nachgezogen ist nur der Kommentar im Block „karte“ von bewegung.css. Wortlaut für den Orchestrator in O-8. K-008 („Punkte je Zone“) stimmt weiter.

### 7.2 Entscheidungsvermerke der Nacharbeit

- **V-18 /kontakt: Kopf des Formularabschnitts nur für Hilfsmittel, Einleitung unter dem Formular.**
  - Ziel: M-C5 Nr. 1, also Kastenkopf und erste Kachelreihe bei d1440 im ersten Bild, Kastenkopf bei t1024, mobil das Formular direkt nach dem Telefon.
  - Abweichung von M-C5 Nr. 2 („Einleitung fs-2, H2 bleibt“): Die H2 bleibt im Baum mit gleicher Kennung, in der Überschriftenfolge und als Name der Region, ist aber nicht sichtbar. Die Einleitung steht wörtlich unter dem Formular.
  - Alternativen:
    - (a) O-1, Einstieg dichter: Die Vorlage ist gesperrt.
    - (b) Einleitung als Vorspann des Einstiegs: Das spart netto nur rund 100 px, die erste Kachel läge bei d1440 bei etwa 915.
    - (c) Kopf seitlich neben dem Formular: Das widerspricht der Ruhe-Regel „Köpfe mittig“.
    - (d) H2 sichtbar, nur die Einleitung nach unten: erste Kachel bei d1440 etwa 880, mobil der Kasten am Falz, und die doppelte Zeile bliebe.
  - Wirkung: siehe 7.1 Nr. 1.
  - Risiken:
    - Die Einleitung („Wählen Sie Ihr Vorhaben …“) steht nach dem Formular und liest sich dort als Hinweis, was nach dem Absenden passiert (Textvorschlag 5).
    - Der Abschnitt trägt `aria-label` statt `aria-labelledby`, weil `Abschnitt` (kern) `aria-labelledby` nur mit sichtbarem Titel setzt. Name und Landmarke bleiben gleich.
    - Keine Funktionsspec prüft die Sichtbarkeit dieser H2 (gesucht in `werkzeuge/tests`).
  - Rückweg: `kopfVerborgen` in `inhalte/kontakt.ts` entfernen und den Absatz `EXPRESS_EINLEITUNG` in `kontakt/page.jsx` löschen.
  - Braucht die Zustimmung des Orchestrators (O-9).
- **V-19 Leerer Absatz im Einstieg per CSS aus.**
  - Ziel: 32 px im ersten Bildschirm, ohne die gesperrte Vorlage zu ändern.
  - Alternative: O-1.
  - Risiko: Die Regel gilt für jeden leeren Absatz in einem Einstieg; einen anderen gibt es nicht.
  - Rückweg: Block in globals.css löschen, sobald O-1 entschieden ist.
- **V-20 Kartenbeschriftung in den Ecken.**
  - Ziel: Nr. 14 und Nr. 10.
  - Alternativen:
    - Namen früher ausblenden (Schwelle an der Namensgröße): Dann fehlten sie zum Beispiel bei m320 und 100 %.
    - Einzeilige Namen: Sie wären breiter und passten in kein Band.
  - Gewählt: Anker so, dass ein Name von bis zu rund 5 × 3 rem ab 16rem Flächenbreite ganz in der Fläche und außerhalb des Rings 25 km steht.
  - Risiko: Bei sehr kleiner Systemschrift endet die Linie knapp innerhalb des Namens (geprüft bis 38rem Flächenbreite bei 100 %).
  - Rückweg: `FUEHRUNG` und die Klassen am Anker der Runde 1.
- **V-21 Verband: Fläche und Lage ohne Foto.**
  - Fliesen in `fuge`, Fugen in `tinte-2`.
  - Ohne Foto steht die Zeichnung ab lg mittig. Die Spaltenlage steht in bewegung.css statt als Utility, denn bewegung.css liegt in `layer(components)`, und die Utility `lg:col-span-3` ginge der Regel des Zustands vor.
  - Wirkung: Beim Wechsel zu Kreuzfuge oder Drittelverband rückt die Zeichnung ab lg um ein Fünftel nach rechts, ohne Übergang; die Höhe bleibt.
  - Risiko: Die Bezugsachse wandert mit der Zeichnung. Den Versatz liest man weiter innerhalb der Zeichnung ab.
  - Rückweg: die zwei Regeln in „verband · Foto im Feld“, dazu `lg:col-span-3` am Element.
- **V-22 /fliesen Beleg mit großen Fliesen zuerst** (ersetzt V-11): Auswahl siehe 7.1 Nr. 4. Namen aus dem Alt-Text, höchstens sechs Wörter, bzw. wie auf /.
- **V-23 Leistungspläne oben in jeder Fliese** (ersetzt in M-C2 Nr. 1 „ab 32rem links, ab 48rem ein Viertel“): ein Planmaß `w-32`, am Handy rund zwei Fünftel der Fliese. „Immer links“ hätte in der Drittelfliese (rund 405 px) dem Text nur rund 190 px gelassen.
- **V-24 Schritt 1 nach Kastenbreite.** Die Containerabfrage folgt dem Kasten; die Kachelform (Symbol über dem Titel) beginnt mit den zwei Spalten. Rückweg: `@md` und `@3xl` zurück auf `sm` und `lg`.
- **V-25 Leitsatz fs-4, ab lg fs-5** (ersetzt die Größe in V-4).
- **V-26 Zeile „Auf der Baustelle“** über der Fotoreihe der Arbeitsweise (H3, mittig, fs-4).
- **V-27 Satz der Firmengeschichte nur mit der Kammer** (ersetzt V-5): Abweichung von M-C4 Nr. 1 („sein Text steht als Satz unter der H2“). Gründungsjahr und Ort nennt der folgende Satz und die Station 2008. Inhalt fällt nicht weg (G4).

### 7.3 Gewollte Pixeländerungen der Nacharbeit (zusätzlich zu Abschnitt 3)

- `/kontakt`:
  - Erster Bildschirm ohne Raum unter den Knöpfen.
  - Formularabschnitt ohne sichtbare H2 und Einleitung; darunter Einleitung und Vorspann in fs-2.
  - Kacheln zweispaltig im Kasten.
  - Karte mit den Namen in den Ecken.
  - Seitenhöhe ruhig: d1440 6.235 (vorher) → 6.508, m390 7.087 → 6.926.
- `/ueber-uns`:
  - Satz der Geschichte kürzer, Zeile „Auf der Baustelle“, Leitsatz kleiner.
  - Ortsliste ab lg auf der Breite des Kastens, Karte mit den Namen in den Ecken.
  - Seitenhöhe: d1440 12.876 → 13.129, m390 13.373 → 12.988.
- `/fliesen`:
  - Verband mit grauer Fliesenfläche; ohne Foto steht die Zeichnung ab lg mittig.
  - Schichtzeichnung im Feld mit dem Satz daneben.
  - Beleg mit drei neuen Fotos.
  - Seitenhöhe: d1440 10.984 → 10.425, m390 10.460 → 10.352.
- `/leistungen`:
  - Pläne oben und gleich groß.
  - Ablauf-Pläne ab sm unter lg schmaler.
  - Namen des Formatreglers auf einer Zeile.
  - Kacheln zweispaltig.
  - Seitenhöhe: d1440 11.051 → 10.644, m390 12.244 → 11.502.
- Alle Seiten mit Schritt 1 in einem Kasten unter 48rem: zwei statt drei Spalten ab lg.
- Erster Bildschirm aller vier Ansichten (q844, m390, d1440, m360 bei 200 %): 32 von 32 Fällen mit gleicher Zahl bestandener Elemente. 30 Fälle haben gleiche Rechtecke; in den übrigen 2 (/kontakt d1440, Erstbesuch und nach Einwilligung) ist nur die H1 schmaler (zwei Satzzeilen, wie in Runde 1).

### 7.4 Textvorschläge (Nacharbeit)

- Nr. 1 bis 4 gelten weiter. Nr. 4 steht jetzt nach der Einleitung unter dem Formular.
- **5. Ansicht /kontakt.**
  - Stelle: Einleitung des Formularabschnitts, jetzt unter dem Formular.
  - Heute: „Wählen Sie Ihr Vorhaben und sagen Sie uns, wo und wann. Dann tragen Sie Ihren Namen und Ihre Telefonnummer ein. Deniz Tezgel meldet sich bei Ihnen und macht einen Termin mit Ihnen aus.“
  - Vorschlag: „Nach dem Absenden meldet sich Deniz Tezgel bei Ihnen und macht einen Termin mit Ihnen aus.“
  - Grund: Die ersten zwei Sätze beschreiben das Formular darüber. Unter dem Formular zählt nur, was danach passiert. Zusammen mit Nr. 4 bleiben unter dem Formular zwei kurze Sätze statt fünf.

### 7.5 Offene Fragen (Nacharbeit)

- **O-8:** In `src/lib/motion/register.ts` und `_werkstatt/register.json` gemeinsam (Test „Bewegung 13“): `karte.was` → „Einsatzgebiet ab Aßlar: die Ringe legen sich von innen nach außen, die Punkte jeder Zone mit ihrem Ring (gezeichnet sind nur Orte mit Namen; in der Standardzeichnung Wetzlar, Gießen und Herborn; die Stufe für Orte über 25 km bleibt dort ohne Punkt)“. Die Stufe 7 bleibt gültig, sobald ein Ort über 25 km beschriftet ist (Prop `beschriftet` bzw. `aktuell`).
- **O-9:** Zustimmung zu V-18 (H2 nur für Hilfsmittel, Einleitung unter dem Formular).
- **O-10:** „Fliesenfachbetrieb“ in FUGEN (`kern/zusammen.tsx`, gemeinsam) für die Trennung an der Fuge.
- O-1, O-2, O-3, O-4, O-6 und O-7 bleiben offen. O-5 ist mit V-21 hinfällig: Eine Bewegung kommt weiter nicht dazu.

### 7.6 Prüfzahlen der Nacharbeit

- `npm test`: 266 Tests, 266 bestanden, 0 fehlgeschlagen, 0 übersprungen (mit Bau).
  - Ein Zwischenlauf schlug in „Bewegung 13“ fehl (register.json gegen register.ts).
  - Danach habe ich register.json zurückgenommen, siehe Nr. 17.
- `npx tsc --noEmit`: Exit 0.
- `npx eslint` über die 19 geänderten JS/TS-Dateien: Exit 0, keine Meldung.
- `node werte.mjs` über die 21 geänderten Dateien: 5 Befunde, dieselben 5 wie vorher (bewegung.css und globals.css je zweimal „0.01ms“, `align-[-0.2em]` im unveränderten Weiter-Knopf von Schritt 1). Neu: 0.
  - Ein Zwischenlauf meldete `w-28`, `max-w-xs` und `max-w-none` (nicht in den Größenstufen).
  - Ersetzt durch `w-32`, `sm:w-1/3` und `lg:max-w-full`.
- `next build`: Exit 0, dreimal (nach den Änderungen, nach der Spaltenlage des Verbands, nach den Größenstufen).
  - Ein Stylesheet für /, /leistungen, /kontakt, /ueber-uns und /fliesen (dieselbe Datei).
  - CSS gebaut, vor SF-C2 → jetzt: roh 137.787 → 138.912 B (+1.125), gzip -9 23.632 → 23.851 B (+219), gzip -6 23.750 → 23.966 B (+216).
- erstesbild (Kopie `c2-erstesbild.mjs`, wie in Runde 1):
  - q844, m390, d1440: vorher und nachher je Fall gleich (24 von 24 bestanden gleich). Nach Einwilligung 12 von 12 mit 5/5. Erstbesuch: q844 1/5 auf allen vier (Banner); m390 4/5 auf /leistungen, /kontakt und /ueber-uns (Kontakt unter dem Banner), /fliesen 5/5; d1440 5/5.
  - m360 bei 200 %: 8 von 8 gleich, mit gleichen Rechtecken. Erstbesuch 1/5. Nach Einwilligung /leistungen 3/5, /kontakt 4/5, /ueber-uns 3/5, /fliesen 4/5 (wie vorher; nicht durch SF-C2).
- lesbarkeit.mjs (vorher → nachher), alle GRÜN: /leistungen Flesch 76,5 → 76,4, /kontakt 79 → 78,6, /ueber-uns 64,8 → 64,7, /fliesen 61,6 → 60,4. Glossar offen überall 0.
- Kartenmatrix: 84 Fälle; 54 mit Namen, 0 beschnitten, 0 am Ring, 0 Überlappungen (7.1 Nr. 14).
- Keine Lighthouse- und keine Zeitmessung (E-076).
- Aufgeräumt:
  - Server 4470 gestoppt (nur die eigenen Prozesse, geprüft über das Arbeitsverzeichnis); 4325 lief durchgehend.
  - `.next`, die echte Kopie von node_modules und `tsconfig.tsbuildinfo` gelöscht, Symlink wiederhergestellt, `next-env.d.ts` wie im Stand `vor`.
  - Hilfsskripte `_c2-*.mjs` aus `werkzeuge/` gelöscht.

## 8 Nacharbeit 2 nach der zweiten Prüfung (14 Befunde)

Stand 4470 (neu gebaut) gegen 4325 (HEAD nach SF-A und SF-B, unverändert). Belege:
- Messungen `$SCRATCH/sfix/c2/nach3/mass.json` mit `mass.log` (Fotoreihe /fliesen, Feld des Verbands je Zustand bei m390, t768, t1024 und d1440, Schichtzeichnung, Karte bei 100, 150 und 200 % auf /kontakt und /ueber-uns, vorher und nachher);
- Bewegung `nach3/bew/` (`bewegung.mjs --modus reduziert`, `--schalter ruhig` und `--modus register`, m390, /fliesen, /kontakt, /ueber-uns);
- erstes Bild `erstesbild3/{vor,nach,vor-200,nach-200}/erstes-bild.json`, Wiederholung `erstesbild3/kontakt-q844-{vor,nach}`;
- Lesbarkeit `lesbarkeit3/nach/`, Werte `werte3/`, Logs `build6.log`, `npmtest3.log`, `tsc3.log`, `eslint3.log`, `werte3.log`, `css-nach3.css`;
- Bilder `bilder/nach/{d1440,m390}/{ruhig,bewegt}/<seite>/NN.png` neu (Bildschirm für Bildschirm wie V-16), `bilder/vor/` unverändert.
- Hilfsskripte `werkzeug/c2-nach3.mjs` und `werkzeug/lauf-nach3.sh` (Kopien in `werkzeuge/` nach dem Lauf gelöscht).

### 8.1 Befunde: geprüft und behoben

1. **/fliesen: Fotoreihe im Beleg mit gemischtem Seitenverhältnis (mittel).** Bestätigt: Das Treppenfoto (`start-beleg-treppe`, 4 : 5) stand zwischen zwei quadratischen. Behoben: An seiner Stelle steht `start-lage-treppe` (quadratisch, Treppe, Name aus dem Alt-Text: „Hauseingang mit beigen Fliesen auf Stufen“, Ziel /treppen). Kartenhöhen m390 [358, 448, 358] → [358, 358, 358], d1440 [453, 453, 453]. `bewegung.mjs` reduziert und ruhig auf /fliesen (m390): 0 Bewegungsbefunde (beim Prüfer 1, `karussell`, `height`). Das Foto steht außerhalb der Galerie jetzt zweimal (/ und /fliesen), auf /fliesen nur einmal; `start-beleg-treppe` steht wieder nur auf / und in der Galerie. V-30.
2. **/fliesen: Schichtzeichnung lose, Satz weit weg, zweiter Kasten (mittel), und zwei Stränge nebeneinander ab lg (gering).** Beide bestätigt. Behoben in einem Zug:
   - Ein Feld mit dem Wähler: Die Zeichnung schließt an der Fuge unter dem Wähler an (`-mt-px`, eine gemeinsame 1-px-Linie statt 48 px Abstand zwischen zwei Kästen). Gemessen: Oberkante der Schichtzeichnung 1 px über der Unterkante des Wähler-Felds auf allen vier Breiten.
   - Einspaltig auf allen Breiten: Zeichnung mittig (`max-w-md`, ab t768 448 px breit), der Satz direkt darunter (16 px Abstand), mittig, an derselben linken Kante wie die Zeichnung. Vorher ab lg Zeichnung links und Satz rechts mit rund 285 px Lücke. Damit gilt die Ruhe-Regel „Fläche“ (nie zwei Stränge nebeneinander).
   - Die Schichtnamen in der Zeichnung sind Text und stehen als Textvorschlag 6 in 8.5. V-31.
3. **Verband: Sprung beim Musterwechsel unter lg (gering).** Bestätigt (t768 579 ↔ 902 px). Ab md behoben: Zeichnung und Foto stehen schon ab md nebeneinander (vorher ab lg). Das Foto (3 : 2) ist auf zwei Fünfteln stets niedriger als die Zeichnung (9 : 5) auf drei Fünfteln, also bleibt die Höhe. Gemessen in allen vier Zuständen: t768 421 px, t1024 518 px, d1440 619 px (je gleich). Unter md (m390) bleibt der Sprung 484 ↔ 724 px, bewusst (V-7, siehe 8.2). V-29.
4. **Einsatzkarte: Führungslinien ohne Namen bei großer Schrift (gering).** Bestätigt. Behoben: Die Linien stehen je Zone in einer eigenen Gruppe mit derselben Schwelle wie die Namen (`@max-3xs:hidden`, unter 16rem Flächenbreite). Gemessen auf /kontakt und /ueber-uns: m360 und m390 bei 150 und 200 % Namen 0, Linien 0 (vorher Linien 3); bei 100 % Namen 6, Linien 3; d1440 bis 200 % Namen 6, Linien 3. Die drei Punkte bleiben in jedem Fall stehen.
5. **Einsatzkarte: Legende „Jeder Punkt …“ bei nur drei Punkten (gering).** Bestätigt. Behoben mit einem Mikrotext: „Die Punkte sind eine Auswahl der Orte, in denen wir arbeiten.“ (vorher „Jeder Punkt ist ein Ort, in dem wir arbeiten.“). Direkt darunter folgen auf /ueber-uns „Alle 13 Orte zeigen“ und auf /kontakt „Alle Orte ansehen“. V-32.
6. **Register `karte` und Zeichnung stimmen nicht überein (gering).** Bestätigt. Behoben mit O-8: `karte.was` in `src/lib/motion/register.ts` und `_werkstatt/register.json` gleich ergänzt („… mit ihrem Ring (gezeichnet sind nur Orte mit Namen; in der Standardzeichnung Wetzlar, Gießen und Herborn, die Stufe für Orte über 25 km bleibt dort ohne Punkt)“). Sonst ist der Block unverändert. Tests „Bewegung 1c“ und „Bewegung 13“ grün. Registerprüfung auf /fliesen, /kontakt und /ueber-uns: unbekannt 0, ohne Register 0. KERN K-008 bleibt unverändert: Die Zeile „Punkte je Zone `dauer-2`“ behauptet keinen Punkt in jeder Zone. Außerdem ändert SF-C1 dieselbe Tabelle (Zeile `einzugsband`, acht Zeilen darüber). V-28.

### 8.2 Befunde: geprüft, nicht behoben

- **Motto viermal, DIN 18534 sechsmal auf /ueber-uns (mittel).** Bestätigt: Im HTML stehen auf 4325 und auf 4470 je 4-mal „beste Reklame“ und 7-mal „DIN 18534“ (eines davon im geschlossenen Aufklapper). Im Bau lässt sich das nicht beheben:
  - Die vier Vorkommen sind Text der Einleitung der Stimmen (Textvorschlag 2), der Wert „Kundenbegeisterung“ (EP2, Wortlaut aus `values`, G8), der Fuß (alle Seiten, nicht SF-C2) und der Leitsatz. Den Leitsatz verlangt M-C4 Nr. 1 an dieser Stelle.
  - Alle sechs DIN-Stellen sind Text.
  - „Direkt vor dem Schritt“ geht nicht: `ErzaehlSeite` hat zwischen Versprechen und Schritt keinen Slot, und die Vorlage ist gesperrt.
  - Entscheidung: O-11.
- **Verband: Plan-Ziel 4 : 3 mit 8 bis 12 Fliesen nicht erreicht (gering).** Bestätigt, bleibt bei O-2 (Grenzen in `test/verband.test.mjs`, G7). Den Bestand habe ich durchgesehen:
  - Ein Foto im Drittelverband gibt es nicht.
  - Für die Kreuzfuge käme `balkon-beleg-2` in Frage („Balkon mit rosébraunen Fliesen im geraden Verband“). Das Foto ist aber 4 : 5 hoch. Auf zwei Fünfteln wäre es ab md höher als die Zeichnung, und das Feld spränge beim Wechsel wieder (Nr. 3). Ohne Zuschnitt (E-013) passt es nicht. Angebot: O-12.
- **Verband mobil: Sprung unter md (gering, Teil von Nr. 3).** Nicht geändert (V-7). Unter md gibt es zwei Wege, und beide sind schlechter als der Sprung nach dem Tippen:
  - Die Fotohöhe reservieren: 240 px leere Fläche bei Kreuzfuge und Drittelverband. Leere Fläche war der Befund der ersten Runde.
  - Zeichnung und Foto nebeneinander: Die Zeichnung wäre bei m390 nur rund 190 px breit, eine Platte rund 40 px.
  - Der Sprung trifft nur Inhalt unter der Wahl. Nach dem Tippen steht die Wahl im Blick.
- **/kontakt: Einleitung unter dem Formular liest sich als Nachtrag (gering).** Bestätigt. Die Lage habe ich nicht geändert. Die Einleitung (bei d1440 zwei Zeilen, mit Abstand rund 76 px) zwischen Knöpfe und Kasten schöbe die erste Kachelreihe bei d1440 unter den Falz (Oberkante 792 → etwa 870 bei 900 px Bildhöhe). Das widerspräche M-C5 Nr. 1 und Befund 1 der ersten Runde. Die Textvorschläge 4 und 5 sind wie vorgeschlagen zu einem zusammengeführt (8.5); die Lage hängt an O-9.
- **/kontakt: H2 nur für Hilfsmittel ohne Zustimmung (gering).** Bestätigt. Das entscheidet der Orchestrator (O-9). Der Rückweg steht in V-18: `kopfVerborgen` entfernen, den Absatz `EXPRESS_EINLEITUNG` löschen.
- **Schritt 1: Zeichen `bad` und leere sechste Zelle (gering).**
  - Das Zeichen steht in der gemeinsamen Sprite-Datei (O-4).
  - Die freie Zelle als ruhige Fläche schreibt M-C2 Nr. 6 vor.
  - Ein Hinweis wie „Anderes? Rufen Sie an“ wäre neuer Text im Formular (G8, Wortlaut).
  - „Untergrund“ über zwei Spalten gäbe einer Kachel eine andere Form als ihren gleichrangigen Nachbarn.
- **Formatregler: zwei Bedienelemente (gering).** Nicht geändert, und zwar mit Absicht:
  - Der native Regler ist das zugängliche Bedienelement (Tastatur, Ansage); der Griff in der Wand bedient den Zeiger.
  - Den Regler als Schiene des Griffs zu zeichnen hieße, Spur und Daumen in WebKit und Gecko über Pseudo-Elemente neu zu setzen. Das ist nicht klein, und Fokusring und 44-px-Ziel kämen in Gefahr.
  - Ein Hinweis in der Zeichnung verdeckte die Wand.
  - Der Prüfer gewichtet den Befund selbst gering.
- **/ueber-uns am Desktop länger (gering, Rückmeldung).** Bestätigt (d1440 12.876 → 13.129 wie in Abschnitt 7, m390 13.373 → 13.012). Die Ortsliste ab lg offen (M-C4 Nr. 4) und die Fotoreihe (Nr. 3) verlangt der Plan; Länge ist kein Planziel. Kürzer würde die Seite nur gegen den Plan (Liste ab lg im Aufklapper) oder mit zwei statt drei Fotos (Nr. 3 nennt drei).

### 8.3 Entscheidungsvermerke der Nacharbeit 2

- **V-28 Register `karte.was` in register.ts und register.json** (O-8 angewendet).
  - Ziel: Register, Zeichnung und Bewegung stimmen überein.
  - Abweichung: `src/lib/motion/register.ts` steht nicht in der Spalte `dateien`. Er muss aber wörtlich gleich zu `register.json` bleiben (Test „Bewegung 13“, deepEqual), und `register.json` darf das Bauteil in seinem Block ändern.
  - Geändert ist nur der Text `was` im Block `karte`. Kennungen, Stufen und Auslöser bleiben gleich.
  - Alternative: einen weiten Ort in der Zeichnung benennen. Die Ecke unten links trägt die Ringmaße; die 84 Fälle der Kartenmatrix müssten neu belegt werden.
  - Rückweg: den Text in beiden Dateien zurücksetzen.
- **V-29 Verband ab md zweispaltig** (ersetzt „ab lg“ in M-C7 Nr. 1 und 2 sowie V-7 für t768 und t1024).
  - Wirkung: gleiche Höhe in allen Zuständen ab 48rem.
  - Preis: Bei t768 ist die Zeichnung 389 px breit (vorher volle Breite, rund 670 px), eine Platte rund 85 px (d1440 rund 150 px).
  - Rückweg: `md:` an Raster und Fotozelle zurück auf `lg:`, die Medienabfrage in bewegung.css zurück auf 64rem.
- **V-30 Treppenfoto quadratisch** (ersetzt die Treppe in V-22). Gewählt: `start-lage-treppe`, das einzige quadratische Treppenfoto im Bestand. Alle drei Fotos sind quadratisch, also gleich hoch. Rückweg: `start-beleg-treppe` mit „Außentreppe in Anthrazit“.
- **V-31 Schichtzeichnung im Feld des Wählers, einspaltig** (ersetzt 7.1 Nr. 11).
  - Der Slot `zeichnungen.verband` umschließt Wähler und Zeichnung mit einem `div`. So fällt der Abstand der Reihe zwischen beiden weg, und `-mt-px` legt die Fuge übereinander.
  - Ohne `:has()` schließt die Figur die Beschreibungen unten ab.
  - Rückweg: Fragment statt `div`, `-mt-px` entfernen.
- **V-32 Legende der Karte.** Mikrotext, ein Satz. Er sagt, dass die Zeichnung eine Auswahl zeigt; die Zahl steht nicht als Literal da. Rückweg: der alte Satz.

### 8.4 Gewollte Pixeländerungen der Nacharbeit 2 (zusätzlich zu den Abschnitten 3 und 7.3)

- `/fliesen`:
  - Schichtzeichnung schließt am Wähler an, mittig, Satz darunter.
  - Fotoreihe im Beleg mit dem quadratischen Treppenfoto.
  - Ab md (t768) Zeichnung und Foto des Verbands nebeneinander.
  - Seitenhöhe ruhig d1440 10.984 (vorher) → 10.325 (Runde 2: 10.425), m390 10.460 → 10.303 (Runde 2: 10.352).
- `/kontakt` und `/ueber-uns`:
  - Legende mit neuem Satz.
  - Bei großer Schrift unter 16rem Kartenbreite keine Führungslinien mehr.
  - Seitenhöhen ruhig: d1440 wie in 7.3 (6.508 und 13.129); m390 /kontakt 7.087 (vorher) → 6.949 (Runde 2: 6.926), /ueber-uns 13.373 → 13.012 (Runde 2: 12.988). Die Legende steht mobil in zwei Zeilen statt einer.
- `/leistungen`: unverändert gegen Abschnitt 7.
- Erstes Bild: Die Zahl bestandener Elemente ist vorher und nachher in jedem Fall gleich (q844, m390, d1440, m360 bei 200 %).
  - Im Hauptlauf stand bei /kontakt q844 (Erstbesuch) vorher 5/5 statt 1/5: Das Banner war im Vorher-Lauf noch nicht da, die Rechtecke sind gleich. Die Wiederholung ergibt 1/5 und 1/5.
  - Sonst wie in 7.6: /kontakt d1440 nur mit schmalerer H1.

### 8.5 Textvorschläge (Nacharbeit 2)

- **4 und 5 zusammengeführt (ersetzt beide).**
  - Ansicht: /kontakt.
  - Stelle: die beiden Absätze unter dem Formular (Einleitung des Abschnitts und Vorspann).
  - Heute: „Wählen Sie Ihr Vorhaben und sagen Sie uns, wo und wann. Dann tragen Sie Ihren Namen und Ihre Telefonnummer ein. Deniz Tezgel meldet sich bei Ihnen und macht einen Termin mit Ihnen aus.“ und „Wollen Sie Ihre Badewanne gegen eine Dusche ohne Stufe tauschen oder einen Boden neu verlegen lassen? Dann genügt ein Anruf oder eine kurze Nachricht. Der Termin bei Ihnen vor Ort ist für Sie kostenfrei, und wir beraten Sie dabei persönlich.“
  - Vorschlag, ein Absatz: „Nach dem Absenden meldet sich Deniz Tezgel bei Ihnen und macht einen Termin mit Ihnen aus. Lieber erst sprechen? Dann genügt ein Anruf. Der Termin bei Ihnen vor Ort ist kostenfrei.“
  - Grund: Unter dem Formular zählt, was danach passiert, und der andere Weg. Aus fünf Sätzen in zwei Absätzen werden drei kurze in einem.
- **6. Beschriftung der Schichtzeichnung.**
  - Ansicht: /fliesen.
  - Stelle: Schichtzeichnung im Block „Alles beginnt mit dem Boden.“
  - Heute: keine Namen in der Zeichnung.
  - Vorschlag: fünf Namen an den Schichten, von oben: „Fliese“, „Dichtband“, „Abdichtung“, „Estrich“, „Rohdecke“.
  - Diese Schichten zeichnet die Vignette `untergrund`. Eine eigene Kleberschicht zeichnet sie nicht; „Kleber“ käme deshalb nur mit einer neuen Linie in die gemeinsame Vignette.
  - Grund: Ohne Namen erklärt die Zeichnung den Aufbau nicht (K-003 Nr. 3). Zusammen mit Textvorschlag 1 trägt sie dann den Wissensmoment.

### 8.6 Offene Fragen (Nacharbeit 2)

- **O-11:** /ueber-uns, Motto viermal. Textvorschlag 2 (Satz „Unser Motto: …“ in der Einleitung der Stimmen streichen) und die Wiederholung im Wert „Kundenbegeisterung“ (EP2) entscheiden. Wird Textvorschlag 2 abgelehnt, könnte der Leitsatz entfallen; das wiche von M-C4 Nr. 1 ab und braucht Zustimmung.
- **O-12:** Kreuzfuge mit `balkon-beleg-2` (gerader Verband, 4 : 5 hoch)? Nur wenn eine kleinere Breite für Hochformate in der Fotozelle akzeptiert wird, damit das Feld nicht springt.
- O-8 ist mit V-28 umgesetzt. Offen bleiben O-1, O-2, O-3, O-4, O-6, O-7, O-9 und O-10.

### 8.7 Prüfzahlen der Nacharbeit 2

- `npm test`: 266 Tests, 266 bestanden, 0 fehlgeschlagen, 0 übersprungen (mit Bau).
- `npx tsc --noEmit`: Exit 0.
  - Ein erster Lauf brach mit zu wenig Speicher ab: Die echte Kopie lag als `node_modules_echt` im Projekt und fiel unter `**/*.ts` in tsconfig.
  - Danach lag die Kopie direkt als `node_modules` (ausgeschlossen); der Lauf endete mit Exit 0.
- `npx eslint` über die 20 geänderten JS/TS-Dateien: Exit 0, keine Meldung.
- `node werte.mjs` über die 23 geänderten Dateien: 5 Befunde, dieselben 5 wie vorher (bewegung.css und globals.css je zweimal „0.01ms“, `align-[-0.2em]` im unveränderten Weiter-Knopf von Schritt 1). Neu: 0.
- `next build`: Exit 0. Ein Stylesheet für /, /leistungen, /kontakt, /ueber-uns und /fliesen (dieselbe Datei).
- CSS gebaut, vor SF-C2 → jetzt: roh 137.787 → 138.823 B (+1.036), gzip -9 23.632 → 23.845 B (+213), gzip -6 23.750 → 23.959 B (+209). Gegen Runde 2: −89 B roh, −6 B gzip.
- Bewegung (m390, 4470):
  - reduziert und ruhig auf /fliesen, /kontakt und /ueber-uns je 0 Bewegungsbefunde.
  - Register auf den drei Seiten: unbekannt 0, ohne Register 0.
- erstesbild (Kopie `c2-erstesbild.mjs`):
  - q844, m390, d1440: Bestanden-Zahl in 24 von 24 Fällen gleich, nach Wiederholung des Vorher-Laufs /kontakt q844.
  - m360 bei 200 %: 8 von 8 gleich, mit gleichen Rechtecken.
  - Werte wie in 7.6: Nach Einwilligung 12/12 mit 5/5. Erstbesuch q844 1/5 (Banner), m390 4/5 auf drei Seiten, /fliesen 5/5. m360 bei 200 % nach Einwilligung 3/5, 4/5, 3/5, 4/5.
- lesbarkeit.mjs, alle GRÜN, Glossar offen überall 0, vorher (4325) → Runde 2 → jetzt: /leistungen 76,5 → 76,4 → 76,4; /kontakt 79 → 78,6 → 78; /ueber-uns 64,8 → 64,7 → 64,5; /fliesen 61,6 → 60,4 → 60,6.
- Keine Lighthouse- und keine Zeitmessung (E-076).
- Aufgeräumt:
  - Server 4470 gestoppt (nur der eigene Prozess); 4325 lief durchgehend.
  - `.next` und die echte Kopie von node_modules gelöscht, der Symlink auf die Wurzel wiederhergestellt; `next-env.d.ts` und `tsconfig.tsbuildinfo` wie im Stand `vor`.
  - Hilfsskripte `_c2-*.mjs` aus `werkzeuge/` gelöscht.
  - Hinweis: Im Arbeitsbaum des Repositorys fehlen `_werkstatt/werkzeuge/_pr1-eb.mjs`, `_pr1-mess.mjs` und `_pr1-verh.mjs` (Hilfsskripte des Prüfers, Commit 73860974). SF-C2 hat sie nicht angefasst und nicht wiederhergestellt.
- Diff neu erzeugt: 23 Dateien, 1440 Zeilen. `patch -p1 --dry-run` gegen das Repository (d55f00d8, nach SF-C1) läuft ohne Fehler durch. Drei Hunks setzen mit Versatz an (bewegung.css +17 und +65 Zeilen, register.ts +1).
