# UM-E4-SICHT-FIX-2 · Bauteil SF2-C (Stufe 2) · M2-C1 → M2-C2 → M2-C3 → M2-C4 → M2-C5 · Kern 4.4.1

Arbeitskopie `$SCRATCH/sfix2/c/baum` (Abzug HEAD 2a93b91f nach Stufe 1), Vergleich `$SCRATCH/sfix2/c/vor` (unverändert). Server:
4540 = baum (Endbau build-4, nach den Messungen gestoppt, `.next` gelöscht, `node_modules` wieder Verweis), 4325 = Vorher-Stand
(nicht angefasst), 4324 und 4326 nicht angefasst. `$SCRATCH` = `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`.

- **Diff:** `$SCRATCH/sfix2/c/UM-E4-SICHT-FIX-2-c.diff` (`diff -ruN vor baum` ohne node_modules, node_modules_echt, .next, bilder,
  next-env.d.ts, tsconfig.tsbuildinfo; nach der Nacharbeit 24 Dateien, 1.155 Zeilen). `patch -p1 --dry-run` gegen das Repository
  (HEAD 8f4ad1a9, seit 2a93b91f nur STATUS und PRUEFPUNKT): alle 24 Dateien sauber, ohne Versatz. Dazu eine **Übergabe** außerhalb
  des Bauteils: `$SCRATCH/sfix2/c/UM-E4-SICHT-FIX-2-c-uebergabe-tun.diff` (Tun.tsx, nicht im Diff, Abschnitt 7).
- **Bilder:** `$SCRATCH/sfix2/c/bilder/vor` (4325) und `…/bilder/nach` (4540), je `bildsatz.mjs --png`, d1440, d1920, m390, Seiten
  /referenzen, /ueber-uns, /fliesen, /leistungen (`<gerät>/<slug>/NN.png`). Dazu `bilder/einstieg/` (Einstieg /referenzen vorher und
  nachher, d1440 und m390, mit Gegenüberstellung `referenzen-<gerät>-vergleich.png`), `bilder/schrift200/` (m390 mit 200 % Schrift),
  `bilder/bewegung/` (Bewegung an, Endzustand), Ausschnitte `$SCRATCH/sfix2/c/blick/` (`n…`, Bildbögen `bogen-*.png`).
- Hilfsskripte `_werkstatt/werkzeuge/_sf2c-*.mjs` wieder gelöscht. Die unversionierten `_werkstatt/werkzeuge/_pruef1-*.mjs` im
  Repository stammen nicht von SF2-C.

## 1 Maßnahmen und Stand

### M2-C1 /referenzen: Galerie im Verband ohne Loch oben, ehrliche Zählzeile, ein Filtermuster mobil, Einstieg bad-beleg-3 · umgesetzt
1. **Statuszeile im Behälter der Liste** (GalerieWahl.tsx, globals.css Block „Galerie eingeklappt und im Verband“): `role="status"`
   steht jetzt direkt vor dem `ul` im `@container` der Liste (DOM-Folge vor der Liste unverändert: Satz, Knöpfe, Status, Fotos;
   ohne JavaScript und im Druck verborgen wie die Knöpfe). Ab 64 rem Containerbreite bei „Alle Fotos“ (`data-verband` an der Zeile)
   steht sie absolut im freien Feld über der tieferen Mittelspalte, mittig in der Höhe eines Drittels der Kachel (d1440 404 × 169 px,
   gemessen: Feld = Versatz der Mittelspalte). Das Feld ist oben von der Fuge der Liste geschlossen (EV-C2) und liest sich als Zelle.
   Unter der längsten Spalte schließt der Rand der Liste über die volle Breite, genau auf dem Rand der tieferen Kachel (gemessen:
   Unterkante Liste = Unterkante letzte Mittelkachel, 2102,4 px); eingeklappt steht „Alle 24 Fotos zeigen“ mittig auf dieser Fuge
   (EV-C3). Unter den äußeren Spalten bleibt ein Streifen von einem Drittel Kachelhöhe (169 px): **Teilbehebung**, oben geschlossen,
   unten eine bündige Fuge, kein Zackenrand mehr, aber der Streifen bleibt. Unter 64 rem und bei einem gewählten Raum steht die Zeile
   wie bisher über der Liste.
2. **`ansage(wahl, n, eingeklappt = false)`** (daten.ts): eingeklappt bei „Alle Fotos“ „Sie sehen eine Auswahl aus 24 Fotos.“
   (Mikrotext, laut Plan), aufgeklappt „Sie sehen alle 24 Fotos.“, gefiltert wie bisher. Test „Galerie 7“ unverändert grün.
3. **Ein Filtermuster mobil:** Raumknöpfe (GalerieWahl) und Themen der Bewertungen (ReviewsSection) unter sm dasselbe Raster aus zwei
   gleich breiten Spalten, Zeichen und Wort linksbündig als Einheit; sechs Raumknöpfe = drei volle Reihen, fünf Themen = 2 + 2 + 1 (die
   letzte Zelle füllt beide Spalten, nur ab 20 rem Containerbreite); bei großer Schrift (unter 20 rem) eine Spalte. Ab sm wie bisher
   (Galerie Raster/Zeile, Themen als Reihe). Ziel 44 px (min-h-11) unverändert. Ohne stile.ts-Variante (EV-C1).
4. **Einstieg bad-beleg-3** (referenzen.ts) statt start-dusche; start-dusche nimmt in daten.ts den Platz von bad-beleg-3 ein
   (Platz 5, Gruppe Dusche, Name „Dusche ohne Stufe mit großen grauen Fliesen“ aus dem Alt-Text). Weiter 24 Fotos, jede Datei einmal,
   Einstieg nicht in der Galerie („Galerie 2“ grün schon ohne SF2-B). bad-beleg-3 steht außerhalb der Galerie danach zweimal (/bad,
   /referenzen), start-dusche einmal (Einstieg /bad/badsanierung nach M2-B1). Gegenüberstellung `bilder/einstieg/*-vergleich.png`.
   Rückweg je eine Zeile in referenzen.ts und daten.ts.
- R-1: Beim Aufklappen ändern sich wie bisher nur `hidden` und die Staffel der neuen Fotos, dazu der Text der Statuszeile; der Knopf
  entfällt wie bisher. Keine neue Animation, kein Layoutwechsel und keine Stilberechnung je Foto (die neuen Regeln hängen an
  `data-verband`, das beim Aufklappen bleibt). Gemessen wurde nichts (misst der Orchestrator mit reaktion.mjs).

### M2-C2 /referenzen: Vorher/Nachher als Bühne auf Tinte, Fachtext im Aufklapper, Stimmen ohne Rahmen · umgesetzt
1. `belegZwei.flaeche: 'tinte'` (referenzen/page.jsx); VorherNachher einspaltig mittig auf allen Breiten, Anleitung (Wortlaut gleich)
   mittig über dem Regler, mit `aufTinte` in nacht-2, Rahmen der Bühne in nacht-fuge, Lot in Kalk mit Kanten in Tinte, Griff und
   Wortmarken unverändert (EV-C4). `.vn-hoehe` ab lg: `(100svh − Stufe 24) × Seitenverhältnis` (Kopf 16 + Stufe 8): d1440 412 × 804 px
   (vorher 370 × 718), d1920 rund 506 px breit. Unter lg unverändert. Ohne JavaScript bleiben die Fotos im noscript-Paar (auf Kalk).
2. `tun.punkteMehr: true`, der Zusatzabsatz als `absatzMehr` (nur Daten): Punkte und Zusatz im einen Aufklapper „Mehr erfahren“,
   Leistungslinks und Einleitung offen. Glossar: die Erstvorkommen (Untergrund, Abdichtung, DIN 18534, barrierefrei) stehen mit
   Erklärung im Aufklapper im DOM; lesbarkeit.mjs grün.
3. ReviewsSection: Karten ohne Rahmen und Fläche, je Karte eine 1-px-Fuge links (`border-l border-fuge`, `py-2 pl-6 lg:pl-8`);
   Wortlaut, Sterne, Quelle, Bewertungszahlen unverändert (G8).

### M2-C3 /ueber-uns: Werte gleich gebaut, Arbeitsfotos nach der Lage, Punkte offen · umgesetzt ohne Motto-Stufe (E-113 Nr. 5)
1. Motto: Stufe „bestand“, kein Datenschalter (E-113 Nr. 5); das Motto steht weiter viermal.
2. Werte.tsx: alle sechs Werte gleich gebaut, je Wert eine Zeile an der Fuge: Zeichen links (aus den Daten, dekorativ), Name fs-4
   halbfett (H3), Satz fs-3; die belegten Fakten tragen einen kleinen Hinweis „belegt“ (Mono fs-1, Mikrotext laut Plan, EV-C7).
   Sechs Einträge voll breit in zwei Spalten (`satzSpalten`, K-003 „Fläche“). Wortlaut, M-07-Anpassungen, Garantie-Prüfung unverändert.
3. Punkte in „Wir verlegen …“ offen (kein `punkteMehr`).
4. Fotoreihe „Auf der Baustelle“ als eigener Abschnitt direkt nach der Lage (Slot `nachLage`, H2 im Wortlaut der bisherigen
   Zwischenzeile, Karussell wie bisher), Fläche Fliese mit einer Fuge zur Lage (EV-C6); CompanyHistory ohne `unten`, die Zeitleiste
   steht allein (Prop entfernt, EV-C8). Firmenzeile unter dem Leitsatz ohne Trennung im Firmennamen (`hyphens-none`, EV-C9).
   test/seitenformel-folgen: `EIN.nachLage = ['/ueber-uns']` (nachgezogen, nicht gelockert); KERN K-010 „Folgen per Schalter“ Zeile
   `nachLage` neu gefasst.
5. `versprechen.offen: [4, 5, 7]` (Begründung in ueber-uns.ts und EV-C17; die Darstellung baut SF2-A).

### M2-C4 /fliesen · umgesetzt (Plan „Laden“ als Datenschalter, ohne Zeilenmaske)
1. **Plan „Laden“:** neuer Datenschalter `worum.planFlucht: 'laden'` in fliesen.ts (kleinste Typergänzung in inhalt.ts, EV-C10);
   WissensSeite setzt `flucht={worum.planFlucht ?? 'zeigen'}`. Register (Kommentar an `sig-plan` in register.ts), register.json
   (`hinweis`) und KERN K-008 (Zeile sig-plan, Spalte Wo) nachgezogen. Geprüft: Bewegung an 39/39 Reihenteile beim Laden versetzt,
   nach 2 s 0; reduziert und „ruhig“ von Anfang an in der Flucht (d1440, m390). Keine Zeilenmaske (E-113 Nr. 2). Der Cursor „Ansehen“
   entfällt am Einstiegsplan (er gilt nur `data-flucht="zeigen"`), gewollt. **Abbruchkriterium** (Orchestrator): Median Lighthouse
   mobil /fliesen aus sechs Läufen unter 91 → Zeile `planFlucht: 'laden'` streichen, KERN-Zeile und register.json-Satz zurück.
   Bildunterschrift unter dem Plan (Mikrotext „Die geschnittenen Fliesen am Rand sind links und rechts gleich breit.“) über die
   vorhandene Prop `unterBild` des Einstiegs, **erst ab sm** (EV-C11).
2. **Schichtschnitt vor dem Wähler:** eigenes Feld nach dem Absatz „Zuerst prüfen wir den Untergrund …“, im Lesemaß, Zeichnung
   `max-w-md`, rechts mit Bruchkante geschlossen (Untergrund.tsx Prop `bruchkante`, ohne Prop unverändert für /, /leistungen und
   Ortsseiten). Bildunterschrift (Mikrotext, fs-3) in Zeichnungsfolge: „Oben die Fliesen, darunter die [[abdichtung|Abdichtung]]. Dann
   folgt der Estrich, an der Wand mit einer [[randfuge|Randfuge]].“ (je Satz mit Erklärung 21 Wörter); „Randstreifen“ entfällt; der
   alte Satz aus der Wegzeile „Fliesen im Neubau“ entfällt als Dublette. `versprechen.erklaert: ['abdichtung', 'randfuge']` (EV-C15).
   Der Musterkasten trägt danach nur Muster und Foto.
3. **Raumliste mit Zeichnungen:** vier Plan-Vignetten, keine doppelt: Küche → `wohnen`, Flur und Diele → `treppe`, Neubau →
   `untergrund`, Renovierung → `reparatur`; die letzte Reihe (Fugensanierung, Fußbodenheizung) ohne Zeichnung (EV-C13).
4. `wissen[0].wegeForm: 'reihe'`: Fugenfeld 3 + 2 im Halbverband (Stufe-1-Baustein), anders gebaut als die Raumliste.
5. Fotoreihe: start-lage-balkon (Großformat zuerst), start-lage-bad („Eckbadewanne mit grauer Verkleidung“, Weg /bad),
   start-lage-treppe; start-lage-dusche verlässt /fliesen. Alle quadratisch; außerhalb der Galerie je höchstens zweimal (start-lage-*
   ruhen auf / im Datensatz der Lage, gezeigt wird dort nur die Vignette).
6. `versprechen.offen: [3, 5, 7]`.

### M2-C5 /leistungen · umgesetzt
1. Lage in einer Stufe: `einleitung` entfällt, derselbe Text als dritter Absatz (Wortlaut gleich), alle drei im Vorspann fs-4
   Tinte, linksbündig im Block (über VORSPANN_MITTIG).
2. Wand.tsx: Fliesen im Wechsel fliese/kalk (ein Pfad für die kalkfarbenen Zellen aus geometrie.ts), je Fuge ein Band in fuge (3
   Einheiten, `stroke-linecap: butt`) unter dem Strich, Türzarge unten rechts als Bezugsgröße (Linien 1,5 px, Türblatt in fliese, ohne
   Zahl, in beiden Ebenen an derselben Stelle), keine IDs, keine Muster, kein Glanzstreifen. geometrie.ts unverändert,
   Formatregler.tsx unverändert (EV-C16). Erzwungene Farben: Fliesen und Tür auf Canvas, Band auf Canvas, die Fugen bleiben als Linie.
3. Abschnitt `formatregler` auf Fliese mit Kantenkreuz an der Leitachse (`flaeche="fliese"`).

### versprechen.offen in den Inhalten von SF2-C
/ueber-uns `[4, 5, 7]`, /fliesen `[3, 5, 7]` (Begründung je Inhalt im Kommentar). Wirkung erst mit der Darstellung von SF2-A und
nur, wenn die Vorlage den Wert weiterreicht (Frage 1).

## 2 Entscheidungsvermerke

**EV-C1 · Linksbündige Filter ohne Variante in stile.ts** — Ziel: Zeichen und Wort unter sm linksbündig (M2-C1 Nr. 3). Alternativen:
(a) Plan: Variante von `wahlKlassen` in kern/stile.ts (gemeinsame Datei, SF2-O; parallel arbeiten zwei weitere Bauteile); (b)
gewählt: `max-sm:justify-start max-sm:text-left` am Aufrufer. Tailwind v4 gibt Variantenklassen nach den Grundklassen aus, die
Varianten überstimmen `justify-center`/`text-center` aus wahlKlassen (gemessen und im Bild m390 und 200 % geprüft); der Konflikt,
den clsx nicht löst, besteht nur zwischen zwei Grundklassen. Wirkung: wie geplant, stile.ts unberührt. Risiko: Bekommt wahlKlassen
später selbst eine responsive Ausrichtung, ist die Reihenfolge neu zu prüfen. Rückweg: Variante in stile.ts, Klassen an den zwei
Aufrufern ersetzen.

**EV-C2 · Freies Feld oben mit Fuge geschlossen** — Ziel: kein „nicht geladenes Foto“. Plan: Statuszeile im Feld. Zusätzlich trägt
die Liste ab 64 rem im Verband ihren Rand oben (`border-width: 1px 0`, Innenabstand oben 0; die Ränder der äußeren Kacheln liegen
darauf): das Feld ist eine geschlossene Zelle mit der Zeile darin. Alternative: offen lassen (Feld oben ohne Kante, las sich im
Probebild weiter als Lücke). Risiko: keins (1 px, ruhend). Rückweg: `border-width: 0 0 1px; padding: 1px 0 … 1px`.

**EV-C3 · Knopf auf der Fuge** — *entfällt mit der Nacharbeit (Abschnitt 7, N-1): Der Knopf deckte das Foto der Mittelspalte; er steht
wieder mit Abstand 6 unter der Liste.* Ursprünglich: „darauf mittig“ als halb über der Fuge gelesen: Hülle des Knopfs ab 64 rem im Verband mit
`translate: 0 -50%` (ruhend, die Hülle ist nicht der Knopf, dessen `active:translate-y-px` bleibt), Knopffläche in fliese deckt die
Fuge. Alternative: Knopf mit Abstand 6 darunter (wie bisher). Rückweg: Regel `.galerie-liste[data-verband] + .galerie-mehr-knopf`
streichen.

**EV-C4 · VorherNachher mit Prop `aufTinte`; Lot in Kalk, Griff unverändert** — Ziel: Bühne auf Tinte (M2-C2), Schaufenster
(page.dev, Kalk) lesbar lassen. Lot in Kalk mit Kanten in Tinte (Plan: „Lot und Griff stehen in Kalk“); der Griff ist schon hell
(`bg-fliese`, Regler.tsx steht nicht in der Dateiliste und bleibt). KERN K-008 Zeile vorher-nachher ergänzt („Lot in Tinte, E-045;
auf der Bühne in Tinte in Kalk“). Risiko: E-045 nennt „Lot in Tinte“; Rückweg: `aufTinte` an der Seite weglassen (Lot wieder Tinte).

**EV-C6 · /ueber-uns Fotoreihe auf Fliese** — Ziel laut Plan: keine zwei Kalkabschnitte in Folge. Folge vorher: Lage Fliese, Tun Kalk,
Zeitleiste Kalk. Kalk für die Fotos ergäbe drei Kalkabschnitte (K-003 Nr. 4), Tinte verworfen (Karussellknöpfe und Fokusring der
Reihe sind für helle Flächen gebaut). Gewählt Fliese wie die Lage, `-mt-px`: eine Fuge mit Kantenkreuz statt zweier. Folge jetzt
Fliese, Fliese, Kalk, Kalk, Fliese, Fliese (wie Werte und Ablauf schon). Rückweg: `flaeche`/`className` am Abschnitt.

**EV-C7 · Hinweis „belegt“ als eigene Zeile** — nicht in der H3 (der Name bleibt die Überschrift, Vorleser hören „belegt“ als Satz
danach). Mikrotext laut Plan („belegt als kleiner Hinweis“); Alternative „nachgewiesen“ (Textvorschlag T-C-2). Rückweg: Zeile entfernen.

**EV-C8 · CompanyHistory ohne Prop `unten`** — kein Nutzer mehr; Rückweg: Prop wieder einfügen.

**EV-C9 · Firmenzeile `hyphens-none`** — Befund 3a gering („Fliesen-/verlegung“) gehörte zum Motto-Element, das nicht gebaut wird;
die Zeile steht weiter am Leitsatz, dort gilt der Befund ebenso. Die Fugen des Titels trennen weiter (mitFugen setzt
`hyphens-manual` innen). Rückweg: Klasse entfernen.

**EV-C10 · `WorumInhalt.planFlucht` (Typergänzung in inhalt.ts)** — Ziel: Plan „Laden“ als Datenschalter in fliesen.ts (E-113 Nr. 6).
Ein optionales Feld neben `plan`, ohne Angabe unverändert; keine andere Seite setzt es. Alternative: Schalter in WissensSeite fest
(kein Datenschalter). Risiko: inhalt.ts ist SF2-A-Datei; die Ergänzung ist eine eigene Zeile in WorumInhalt (dry-run sauber).
Rückweg: Feld und die Zeile in fliesen.ts streichen.

**EV-C11 · Bildunterschrift unter dem Plan erst ab sm** — Ziel: LCP-Element von /fliesen unverändert (Vorspann). Gemessen m390: Mit
der Zeile auf allen Breiten rückte der Vorspann von 727 auf 790 px (sichtbar 117 → 54 px, Fläche 41.774 → 19.399 px²); die H1 (rund
26.000 px²) würde LCP-Element, mitten in der Messung des Abbruchkriteriums für „laden“. Ab sm (t768, q844, Desktop) steht sie; mobil
erklären die Gleich-Zeichen allein wie bisher. Risiko: Handy ohne die Zeile (sie ist neu, es fällt nichts weg). Rückweg: `hidden
sm:block` entfernen (nach einer Lighthouse-Messung).

**EV-C12 · Versprechen-Angaben per Spread** — WissensSeite reicht `{...inhalt.versprechen}` an Versprechen weiter, damit `offen` dort
ankommt, sobald SF2-A die Prop so nennt wie den Typ (heute ignoriert, tsc 0). Alternative: `offen={…}` (bricht tsc vor dem Einspielen
von SF2-A). Risiko: nennt SF2-A die Prop anders, wirkt sie auf /fliesen nicht (Frage 1). Rückweg: `erklaert={…}` wie bisher.

**EV-C13 · Raumliste: vier Vignetten, letzte Reihe ohne Zeichnung** — Ziel: Plan Nr. 3 („je Zeile eine vorhandene Plan-Vignette oder
ein Verlegemuster, keine zweimal“). Für Fugensanierung und Fußbodenheizung zeigt keine der sechs Vignetten das Thema (bad: Dusche mit
Rinne, aussen: Terrasse auf Stelzlagern), und die Verlegemuster stehen in Bereichszeilen auf Fliese fast unsichtbar wie leere Felder
(Probebau `blick/n2-fl-liste.png`; schon M-B2 Nr. 2 nannte sie „blass“); `verlegekante` trägt dazu eine rote Laserlinie neben der
Leitachse. Gemischt (Vignette 128 px, Muster 64 px) sprangen die Textkanten Reihe für Reihe. Gewählt: die zwei Räume und die zwei
Lagen (Reihen 1 und 2) mit Vignette, die zwei Techniken (Reihe 3) ohne; jede Reihe in sich gleich gebaut (Bild `blick/n3-fl-liste.png`).
Alternativen: Muster in Reihe 3 (eine Angabe je Zeile in fliesen.ts), irreführende Vignetten (verworfen). Risiko: der Befund 3a
„je Zeile eine Vignette“ ist zu vier Sechsteln erfüllt; `untergrund` steht klein in der Liste und groß im Schichtschnitt darunter.
Rückweg: `motiv` in den zwei Zeilen.

**EV-C14 · Schichtschnitt-Feld** — im Lesemaß (`max-w-mass`, schmaler als der Wähler darunter: ein Breitenwechsel), Zeichnung
`max-w-md` (werte.mjs kennt `max-w-xl` nicht), Unterschrift im Feld, ab lg mittig wie zuvor (*Nacharbeit N-4: linksbündig auf allen
Breiten, mit Ziffernmarken*); keine zweite Kopf-Pause (die eine Pause
„ganz“ des Abschnitts trägt der Wähler). Rückweg: Klassen in fliesen/page.jsx.

**EV-C15 · Bildunterschrift und `erklaert`** — Abdichtung und Randfuge stehen auf /fliesen hier zum ersten Mal und tragen ihre
Erklärung; das Qualitätsversprechen führt sie in `erklaert`, falls es sie später auszeichnet. Estrich ist in der Lage erklärt.

**EV-C16 · Formatregler** — Tür rechts unten bei den großen Fliesen (dort wirkt der Vergleich „eine Fliese höher als eine Tür“), nicht
unter dem Griff; Formatregler.tsx bleibt unverändert, alles in Wand.tsx und bewegung.css (Block formatregler). Bündel: Wand.tsx ist Teil
der Insel; hinzu kommen eine Zellenschleife und zwei Pfade (*Nacharbeit N-12: gemessen +219 B gzip JavaScript auf /leistungen; die
Pfade werden einmal beim Laden je Format gerechnet, nicht bei jedem Schritt des Reglers*). Rückweg: Wand.tsx aus vor.

**EV-C17 · versprechen.offen /ueber-uns 4, 5, 7** — Plan-Vorschlag übernommen, am sichtbaren Text geprüft: 7 sagt die Seite nirgends;
4 und 5 stehen kurz im Wert „Termintreue und fester Preis“, 4 auch als „Angebot mit festem Preis“ im Ablauf 02; alle übrigen (1, 2, 3,
6, 8) stehen ebenso oft oder öfter. Die Sätze von 4 und 5 sagen mehr (Kosten nach Quadratmetern und Aufwand; Baustart und Fertigstellung
abgestimmt). /fliesen 3, 5, 7 wie im Plan (3: die Norm nennt die Seite sonst nicht).

**EV-C18 · Vorher/Nachher: Anleitung und Bühne ab lg nicht zusammen in einem Bildschirm** — wie Plan (Bühne bis zur Bildschirmhöhe
unter dem Kopf); steht die Bühne unter dem Kopf, steht die Anleitung direkt darüber. Rückweg: Regel ab 64rem in bewegung.css.

## 3 Gewollte Pixeländerungen je Ansicht (`bildsatz`, vorher 4325, nachher 4540; Ausschnitte je Bildschirmhöhe)

| Ansicht | abweichend d1440 / d1920 / m390 | Änderung |
|---|---|---|
| /referenzen | 12/12 · 11/12 · 11/12 | Einstieg bad-beleg-3 (00, alle Geräte); Galerie: Statuszeile im Feld über der Mittelspalte (ab 64 rem, sonst über der Liste, Text „Auswahl“), Fuge oben und unten, Knopf auf der Fuge, start-dusche an Platz 5; mobil Raumknöpfe linksbündig; Vorher/Nachher auf Tinte, einspaltig, d1440 412 statt 370 px; Bewertungen: Themen mobil im Zweierraster, Karten ohne Rahmen; Tun mit „Mehr erfahren“ statt offener Punkte (Seite d1440 11.292 → 10.816 px, m390 13.147 → 12.338) |
| /ueber-uns | 10/12 · 10/12 · 10/12 | ab Ausschnitt 02: Abschnitt „Auf der Baustelle“ nach der Lage, Zeitleiste ohne Fotos, Werte als sechs gleiche Zeilen in zwei Spalten, Firmenzeile am Leitsatz ungetrennt (d1440 12.831 → 12.975, m390 12.987 → 13.272); Einstieg und Lage gleich |
| /fliesen | 11/11 · 10/11 · 11/12 | Einstieg ab sm mit Bildunterschrift unter dem Plan (d1440 00), m390 00 gleich; Raumliste mit vier Vignetten; Schichtschnitt als Feld vor dem Wähler mit Bruchkante und Unterschrift; Wege als Fugenfeld 3 + 2; Fotoreihe Balkon, Eckbadewanne, Treppe (d1440 9.824 → 9.748, m390 10.354 → 10.712) |
| /leistungen | 11/12 · 11/11 · 11/12 | Lage: drei Absätze fs-4 (Überblick zuletzt); Formatregler auf Fliese, Fliesen im Wechsel, Fugenbänder, Tür; 00 gleich |

Erstes Bild unberührt (Fall für Fall gleich, Abschnitt 6). Mit Bewegung: /fliesen Plan rückt beim Laden in die Flucht
(`bilder/bewegung/fliesen-*-einstieg-ende.png` = Endzustand), sonst keine Bewegung neu.

## 4 Textvorschläge (Wortlaut unverändert; nur in die Notiz)

| Nr. | Ansicht | Stelle | heute | Vorschlag | Grund |
|---|---|---|---|---|---|
| T-C-1 | /fliesen | Absatz „Alles beginnt mit dem Boden.“ (ein Absatz im Wissensblock) | „Zuerst prüfen wir den Untergrund. Ist er eben und trocken genug, verlegen wir die Fliesen sauber, mit passenden Fugen und Übergängen. Wie die Fliesen angeordnet sind, bestimmt, wie eine Fläche wirkt. Hier sind vier Muster zum Ausprobieren.“ | Die ersten zwei Sätze vor dem Schichtschnitt, die letzten zwei als eigener Satz direkt vor dem Wähler (Wortlaut gleich, zwei Absätze; braucht einen zweiten Text im Block) | Nach M2-C4 steht zwischen „Hier sind vier Muster zum Ausprobieren.“ und den Mustern der Schichtschnitt |
| T-C-2 | /ueber-uns | Hinweis an den Werten „HWK Wiesbaden Mitglied“ und „DIN 18534 Abdichtung“ | „belegt“ | „nachgewiesen“ oder „im Register eingetragen“ (HWK) / „nach Norm“ (DIN) | „belegt“ ist knapp; ein Wort aus dem Alltag sagt, was belegt ist |
| T-C-3 | /leistungen | Name des Bildes im Formatregler (aria-label) | „Dieselbe Wand, links mit kleinen Fliesen, rechts mit großen Fliesen.“ | „Dieselbe Wand, links mit kleinen Fliesen, rechts mit großen Fliesen. Rechts unten steht zum Vergleich eine Tür.“ | Die Bezugsgröße ist neu und für Vorleser sonst stumm |
| T-C-4 | /referenzen | Statuszeile eingeklappt | „Sie sehen eine Auswahl aus 24 Fotos.“ (Mikrotext neu laut Plan) | „Sie sehen 9 von 24 Fotos.“ (Zahl je Raster) | Genauer; braucht die Spaltenzahl in der Insel (JavaScript je Breite), darum nicht gebaut |

## 5 Offene Fragen
1. **`versprechen.offen` erreicht die Darstellung nur, wenn die Vorlage es weiterreicht:** WissensSeite (SF2-C) reicht alle Angaben
   weiter (EV-C12, wirkt, wenn SF2-A die Prop `offen` nennt). ErzaehlSeite (SF2-A-Datei, in Stufe 2 nicht vergeben) und OrtsSeite
   (SF2-B) reichen heute nur `erklaert` weiter; ohne Nachtrag beim Einspielen wirkt `offen` auf /ueber-uns (und den Seiten von SF2-B)
   nicht.
2. **Abbruchkriterium „laden“** (E-113 Nr. 6): Messung durch den Orchestrator; Rückweg drei Stellen (fliesen.ts Zeile `planFlucht`,
   KERN K-008 Zeile sig-plan, register.json `hinweis`; der Kommentar in register.ts nennt nur die Möglichkeit).
3. **EV-C11** (Plan-Unterschrift erst ab sm) und **EV-C13** (letzte Reihe der Raumliste ohne Zeichnung) bestätigen?
4. **EV-C4:** Lot auf der Bühne in Kalk (K-008 nachgezogen) gegen E-045 „Lot in Tinte“ bestätigen?
5. R-1: bitte wie geplant mit sieben Läufen nachmessen (keine zusätzliche Arbeit je Foto gebaut, nicht gemessen).
6. Galerie 2 ist schon ohne SF2-B grün; beim Einspielen B und C in einem Zug bleibt start-dusche einmal auf /bad/badsanierung (Einstieg)
   und einmal in der Galerie von /referenzen.

## 6 Prüfzahlen (Endbau build-4)
- `npm test`: 280 Tests, 280 bestanden, 0 rot, 0 übersprungen (mit Bau; ohne Bau 279 + 1 übersprungen). Galerie 1 bis 9, Folge 1 bis
  5 (mit `EIN.nachLage = ['/ueber-uns']`), Bewegung, Vorher-Nachher, Formatregler, Pläne, Verband, Cursor grün.
- `npx tsc --noEmit`: 0. `npx eslint` über die 20 geänderten Code- und Testdateien: 0.
- `werte.mjs --dateien` (21 Dateien inkl. globals.css und bewegung.css): 5 Befunde, dieselben 5 wie auf vor (0.01ms-Ausnahmen greifen
  mit Scratch-Pfaden nicht, `STAFFEL_MAX: 7` in daten.ts): **0 neu** (`werte/vor`, `werte/baum`).
- `next build`: Exit 0 (`build-4.log`); ein Stylesheet je Seite (`/`, /referenzen, /ueber-uns, /fliesen, /leistungen je 1).
- CSS gzip -9 (wie `kette.sh`): 25.218 B (4325) → 25.388 B (4540), **+170 B** (roh 147.194 → 148.215, +1.021 B); Richtwert SF2-C 0,7 KB;
  seit 4d2d3fef damit +1.988 B von 4 KB.
- `erstesbild.mjs` (4 Ansichten, m390, q844, d1440, zwei Durchgänge): 24 Fälle, sichtbare Pflichtelemente 101 → 101, alle fünf 17 → 17,
  Fall für Fall gleich. m360 mit 200 % Schrift (Kopie mit Init-Skript `html{font-size:200%}`): 8 Fälle, 17 → 17, alle fünf 0 → 0
  (Altbefund OF-C3-4), Fall für Fall gleich (`erstesbild/{vor,nach,vor-200,nach-200}`).
- `bildsatz.mjs --png`: vorher 141, nachher 142 Aufnahmen; 0 Fehler, 0 nicht 200, Überlauf 0, Konsole 0; Überlappung 12 → 12 (nur
  `leitachse`). 200 % m390: kein waagrechter Überlauf auf den vier Ansichten.
- `axe.mjs --zustaende` (4 Ansichten, alle Geräte und Zustände): 132 Läufe, 0 Verstöße (auch keine mittleren und geringen).
- Playwright (`_werkstatt/werkzeuge`, `RELAUNCH_BASE=http://127.0.0.1:4540`): funktion-konfigurator, -express-funnel, -navigation,
  -schnellanfrage, -kontaktwege: 190 bestanden, 10 übersprungen, 0 rot.
- `lesbarkeit.mjs` (4 Ansichten): 4/4 grün vorher und nachher, keine neuen Befunde (längster Satz 25 Wörter).
- Bewegung sig-plan „laden“ (/fliesen): Bewegung an 39/39 Reihenteile versetzt → nach 2 s 0; reduziert und „ruhig“ 0 von Anfang an.
- Galerie: eingeklappt 9 Fotos (m390 6), Zeile „Auswahl“; aufgeklappt 24, Zeile „alle“, Knopf weg, Fokus auf dem ersten neuen Foto;
  Dusche 3 Fotos, Zeile über der Liste.
- Keine Lighthouse- und keine Zeitmessung (E-076).

## 7 Nacharbeit nach der Prüfung (12 Befunde, je selbst nachgeprüft)

Endbau build-6 auf 4540 (nach den Messungen gestoppt, `.next` gelöscht, `node_modules` wieder Verweis). Vorher-Stand 4325
unverändert, 4324 und 4326 nicht angefasst. Hilfsskripte `_werkstatt/werkzeuge/_sf2c-*.mjs` wieder gelöscht. Belege der Nacharbeit
unter `$SCRATCH/sfix2/c/nacharbeit/` (`nach/` Ausschnitte und `messung.json`, Logs, `axe/`, `lesbar/`, `css/`).

| Nr. | Befund (Schwere) | Prüfung | Stand |
|---|---|---|---|
| N-1 | Galerie: Streifen unter den äußeren Spalten, Knopf deckt Foto (mittel) | bestätigt (d1440: Knopf bis 24 px auf dem Foto) | behoben |
| N-2 | Feld oben liest sich als fehlendes Foto (gering) | bestätigt | behoben mit N-1 (Passstück in fliese) |
| N-3 | Raumliste: Textkante springt, zwei Vignetten passen nicht (mittel) | bestätigt | im Bauteil nicht lösbar, Übergabe Tun.tsx |
| N-4 | Schichtschnitt ohne Marken, Unterschrift zentriert (mittel) | bestätigt | behoben |
| N-5 | `versprechen.offen` kommt nicht an (mittel) | bestätigt | Daten gesetzt, Weitergabe liegt in fremden Dateien, Übergabe |
| N-6 | Vorher/Nachher: Bühne nur 12 % breiter, q844 schwerer (gering) | bestätigt | Teilbehebung, nicht geändert |
| N-7 | Werte: „belegt“ fällt kaum auf, Bau wie die Linkliste (gering) | bestätigt | Hinweis sichtbar gemacht; Einspaltigkeit abgelehnt |
| N-8 | Formatregler: Wechsel und Fugenband kaum sichtbar, zwei Fliese-Abschnitte (gering) | bestätigt | nicht geändert (Plan M2-C5 Nr. 2 und 3) |
| N-9 | Wege unter lg wie die Raumliste (gering) | bestätigt | nicht geändert (Wissen.tsx fremd), Übergabe N-3 hilft |
| N-10 | Statuszeile ohne JavaScript und im Druck sichtbar (gering) | bestätigt (Spezifität 0,2,0 über 0,1,0 in derselben Schicht) | behoben |
| N-11 | /referenzen: erstes sichtbares „Untergrund“ im Ablauf ohne Erklärung (gering) | bestätigt | Entscheidung Orchestrator (Empfehlung unten) |
| N-12 | Formatregler-Bündel wächst (gering) | bestätigt, gemessen | Pfade als Modulkonstanten, Zahl vermerkt |

### N-1, N-2, N-10 · Galerie im Drittelverband mit Passstücken (globals.css Block „Galerie eingeklappt und im Verband“, GalerieWahl.tsx nur Kommentare)
- Ab 64 rem Containerbreite bei „Alle Fotos“: Die Liste ist `position: relative; isolation: isolate`. `::before` (oben) und `::after`
  (unten) sind je ein Streifen über die volle Breite, `z-index: -1` in der isolierten Liste, Höhe V − 1 px (V = Versatz der
  Mittelspalte = Kachel / 3), Fläche fliese, Fuge links und rechts. Wo Fotos stehen, decken die Kacheln den Streifen. Sichtbar bleiben
  das Feld über der Mittelspalte und die zwei Felder unter den äußeren Spalten, rundum von Fugen geschlossen: geschnittene Fliesen
  am Rand einer Wand im Drittelverband. Alle drei Spalten enden bündig.
- Gemessen (d1440, eingeklappt): Unterkante Liste 3.879,4 = Unterkante der letzten Mittelkachel; äußere Kacheln enden bei 3.710,4,
  darunter das Passstück (168 px + Fugen); oben das Passstück 404 × 168 px mit der Statuszeile. Aufgeklappt (24 Fotos) und d1920
  gleich (d1920: Passstück 189 px). Ohne JavaScript dieselben Passstücke, das obere leer.
- Der Knopf „Alle 24 Fotos zeigen“ steht wieder mit Abstand 6 (24 px) unter der Liste (d1440: Liste endet 3.879,4, Knopf beginnt
  3.903,4); die Regel mit `translate: 0 -50%` ist entfernt (EV-C3 entfällt).
- Statuszeile: Die Lage im Passstück (`position: absolute`, `display: flex`) gilt nur noch in `@media screen and (scripting: enabled)`,
  dazu `z-index: 1` über der isolierten Liste. Gemessen: ohne JavaScript `display: none`, im Druck (mit Skript) `display: none`; vorher
  in beiden Fällen sichtbar mit „Auswahl aus 24 Fotos“ über 24 Fotos.
- R-1: ruhend, nichts davon ändert sich beim Aufklappen (dieselben Regeln eingeklappt und aufgeklappt, `data-verband` bleibt); keine
  Arbeit je Foto. Unter 64 rem und bei gewähltem Raum unverändert.
- Bilder: `nacharbeit/nach/galerie-d1440-oben.png`, `galerie-d1440-unten.png`, `galerie-d1440-auf-unten.png`,
  `galerie-d1920-{oben,unten,auf-unten}.png`, `galerie-d1440-ohnejs-oben.png`.

**EV-C19 · Passstücke statt höherer Randkacheln** — Ziel: bündige Unterkante ohne Zackenrand (N-1). Alternativen: (a) letzte Kachel der
äußeren Spalten per `:nth-last-child` höher (Vorschlag der Prüfung): Das Foto bleibt 4 : 5 (Fotos vollständig, kein Beschnitt), die
Kachel bekäme ein leeres Feld unter dem Foto, eingeklappt zählt `:nth-last-child` die verborgenen Kacheln mit (bräuchte weitere
Marken); (b) Knopf nur unter die Fuge, Streifen bleibt (Teilbehebung); (c) gewählt: Passstücke in fliese hinter den Kacheln, je ein
Pseudo-Element oben und unten, ohne Markup und ohne JavaScript. Wirkung: Feld oben und Felder unten lesen als Teile des Verbands,
nicht als fehlende Fotos (helle Fläche statt der grauen Ladefläche der Kacheln). Risiko: `isolation` an der Liste (keine
Mischmodi in den Kacheln, Glasbild ohne absolute Lage; die Glasfläche mit `backdrop-filter` liegt über ihrem Foto in derselben
Liste, geprüft); 9 und 24 Fotos füllen volle Reihen, bei einer unvollständigen
letzten Reihe stünde dort ein Passstück unter einem Foto (heute nicht der Fall, Galerie 2 prüft 24). CSS +63 B gzip. Rückweg:
die drei Regeln `::before`/`::after` und `position`/`isolation` streichen.

**EV-C20 · Knopf und Zählzeile nicht gemeinsam ins Feld oben** (Vorschlag N-2) — der Knopf stünde vor den Fotos sichtbar, im DOM aber
danach (Fokusfolge gegen Lesefolge, WCAG 2.4.3); ins DOM vor die Liste verschoben stünde er mobil über sechs Fotos, deren
Fortsetzung niemand mehr unten findet. Darum Knopf unter der Liste, Feld oben als Passstück mit Zählzeile.

### N-4 · Schichtschnitt mit Ziffernmarken (Untergrund.tsx Prop `marken`, fliesen/page.jsx)
- `VignetteUntergrund bruchkante marken`: Ziffern 1 bis 4 in kleinen Kästen (Kasten und Hinweislinie in Strich, Punkt auf der
  Schicht, Ziffer in Mono in Tinte). 1 Bodenfliesen, 2 Abdichtung, 3 Estrich rechts neben der Bruchkante (Zeichenfläche dafür 28
  Einheiten breiter, viewBox 268 × 128), 4 Randfuge im leeren Feld des Estrichs mit kurzer Linie in die Fuge an der Wand. Ohne Prop
  unverändert (/, /leistungen, Ortsseiten, Raumliste). Ziffer 10 Einheiten: m390 rund 12 px (Zeichnung 324 px), d1440 rund 17 px
  (448 px). Mit 200 % Schrift auf m360 wird die Zeichnung 230 px schmal, die Ziffern dort rund 8 px (Zeichnung dekorativ; die
  Ziffern der Unterschrift wachsen mit).
- Unterschrift: Wortlaut gleich, vor jedem Begriff die Ziffer seiner Marke (Inline-Element mit Rand in Strich, Mono fs-1,
  `aria-hidden`, Wortverbinder; ein `inline-flex` brach im ersten Bau zwischen Ziffer und Begriff um, darum ein gewöhnliches
  Inline-Element). Linksbündig auf allen Breiten (vorher ab lg vierzeilig zentriert). Vorleser hören den Satz unverändert.
- lesbarkeit.mjs 4/4 grün (kein Satz über 25 Wörter), axe 0.
- Bilder: `nacharbeit/nach/schicht-{d1440,d1920,m390,m360-200}.png`.

**EV-C21 · Ziffern als SVG-Text in der Vignette** — Ziel: zeigen, welche Linie gemeint ist (N-4). Plan M2-C4 Nr. 2 verwarf Wörter im SVG
(mobil 9,6 px, für Vorleser stumm). Ziffern sind kurz genug für 12 px mobil, und die Unterschrift trägt Text und Ziffern; die
Zeichnung bleibt `aria-hidden`. zeichnen.tsx nennt „keine Texte“ für die Plan-Vignetten (wegen der IDs je Instanz); Ziffern
brauchen keine IDs. Alternativen: Ziffern als HTML über der Zeichnung (Lage in Prozent, Größe in cqi, mehr Code, gleiche Wirkung);
Hinweislinien ohne Ziffern (ohne Zuordnung zur Unterschrift). Risiko: erste Zeichen in einer Vignette (nur mit Prop, nur /fliesen).
Rückweg: `marken` in fliesen/page.jsx weglassen und die Unterschrift auf `<Textmarken text={…} />` zurück.

### N-7 · Werte: Hinweis „belegt“ sichtbar (Werte.tsx)
- „belegt“ in fs-2 halbfett Tinte mit Haken (Icon `haken`, dekorativ) statt Mono fs-1 grau; Wortlaut laut Plan (genauere Fassung
  bleibt T-C-2). Bild `nacharbeit/nach/werte-{d1440,m390}.png`. Der Wert „HWK Wiesbaden Mitglied“ trägt in den Daten schon den Haken
  als Zeichen; beide stehen in derselben Zelle (Zeichen links, Hinweis unten), gewollt: Haken heißt „nachgewiesen“.
- Nicht umgesetzt: Werte einspaltig im Lesemaß. E-113 Nr. 2 (K-003 „Fläche“): Listen ab vier Einträgen voll breit in zwei Spalten;
  sechs Werte einspaltig widersprächen der Regel. Die Zeitleiste steht zwischen beiden Listen.

### N-12 · Formatregler: Pfade einmal je Format (Wand.tsx)
- `pfade(format)` rechnet Fugen, Schraffur und Wechselzellen; `PFADE` hält beide Formate als Modulkonstante. Der Regler rendert bei
  jedem Schritt neu (Zustand in Formatregler.tsx); die Pfade werden nicht mehr je Schritt gerechnet (vorher auch Fugen und Schraffur
  je Schritt, seit SF2-C dazu die Wechselzellen). Bündel gemessen (Summe der `/_next/static/**/*.js` je Seite, gzip -9, 4325 gegen
  4540): /leistungen 226.571 → 226.790 B (**+219 B**), /referenzen 222.711 → 222.804 B (+93), /fliesen und /ueber-uns ±0. Der
  Plan-Hinweis „nicht vergrößern (nur Klassen)“ wird damit um 219 B verfehlt: Die Wechselzellen brauchen ihre Pfade im Bündel, die Insel
  zeichnet beide Ebenen. Geprüft: Regler mit Pfeiltasten 50 % → 45 %, beide Wände mit Wechsel, Band und Tür, keine Konsolenmeldung.

### N-3 · Raumliste /fliesen: nicht im Bauteil lösbar, Übergabe
- Bestätigt: Vier Zeilen mit Vignette, die letzte Reihe ohne; die Textkante springt (d1440 rund 144 px, m390/t768 rund 70 px).
- Warum nicht in SF2-C: Die Zeile baut `Bereichszeilen` in `vorlagen/teile/Tun.tsx` (keinem Bauteil von Stufe 2 zugewiesen). Mit
  den Daten allein geht es nicht: (a) sechs Vignetten für sechs Zeilen: für Fußbodenheizung zeigt keine vorhandene das Thema (bad
  Duschrinne, aussen Stelzlager, treppe Stufen), für Küche und Flur nur `wohnen`; jede Zuordnung von sechs hat mindestens eine
  falsche Zeichnung. (b) Verlegemuster (`motiv`) stehen als 64-px-Feld neben 96- bzw. 128-px-Vignetten, die Kante spränge weiter.
  (c) Zeilen in die Wege verschieben ändert den Aufbau der Textdatei (Fugensanierung gehört zum Satz „… oder nur die Fugen erneuern
  lassen …“ der Lage), das ist eine Textentscheidung (T-C-5 unten).
- **Übergabe:** `$SCRATCH/sfix2/c/UM-E4-SICHT-FIX-2-c-uebergabe-tun.diff` (Tun.tsx, `Bereichszeilen`): Trägt eine Zeile der Liste
  eine Vignette, hält jede Zeile ohne Zeichnung deren Feld leer frei (`hidden w-24 shrink-0 @xs:block lg:w-32`, `aria-hidden`); alle
  Texte beginnen an einer Kante (hängende Zeichnungen). Wirkt heute nur auf /fliesen (die Ortslisten tragen in jeder Zeile eine
  Vignette). Geprüft vorübergehend in der Arbeitskopie: tsc 0, eslint 0, dann zurückgesetzt; `patch -p1 --dry-run` gegen HEAD sauber.
  Nicht im Bau und nicht in den Bildern.
- Zuordnung bleibt: Flur und Diele → `treppe` (Hauseingang mit Stufen: die Diele ist der Eingang, „nasse Schuhe“); eine Plan-Vignette
  ohne Stufen, die einen Flur zeigt, gibt es nicht (`wohnen` trägt die Küche). Küche → `wohnen` ist eine Raum-Draufsicht mit Tür
  (bei 128 px liest sie sich als Wandplan; Größe ist Sache von Tun.tsx).

### N-5 · `versprechen.offen`: Daten gesetzt, Weitergabe in fremden Dateien
- /fliesen: WissensSeite reicht `{...inhalt.versprechen}` weiter (EV-C12); wirkt, sobald `Versprechen` (SF2-A2) die Prop `offen`
  nimmt. /ueber-uns: `ErzaehlSeite.tsx:109` reicht nur `erklaert` weiter (Datei in Stufe 2 unvergeben), Ortsseiten ebenso
  `OrtsSeite.tsx` (SF2-B). **Beim Einspielen** beide Zeilen auf `{...inhalt.versprechen}` umstellen (z. B.
  `versprechen: inhalt.versprechen && <Versprechen vorher={vorher} {...inhalt.versprechen} />`), dann /ueber-uns und /fliesen auf drei
  offene Punkte prüfen. Das Motto viermal auf /ueber-uns bleibt (E-113 Nr. 5).

### Nicht geändert (gering, mit Grund)
- **N-6 Vorher/Nachher:** Die Bühne bindet sich an die Bildschirmhöhe (Plan M2-C2 Nr. 1, mehr Breite nur mit anderem Zuschnitt,
  E-104 Nr. 6). Auf q844 (Höhe 390) stünde eine an die Breite gebundene Bühne höher als der Bildschirm (Vergleich nur mit Blättern);
  die Fläche Tinte je Breite umzuschalten hieße Fläche, Schriftfarben und Lot zugleich per Medienabfrage zu tauschen. Wortmarken
  größer: Regler.tsx gehört nicht zum Bauteil. Teilbehebung, wie die Prüfung zulässt.
- **N-8 Formatregler:** Farben (fliese/kalk, Band in fuge) und Fläche fliese stehen so im Plan (M2-C5 Nr. 2 und 3). Abschnitt auf Kalk
  und Wand auf Fliese brächte denselben Kontrast (kalk-97 gegen kalk-100) nur mit vertauschten Rollen und nähme Nr. 3 zurück; ein Band
  in Strich mit Deckkraft 0,4 ist kein Token. Vorschlag für eine spätere Runde: Band in `nacht-2` (kalk-75), nach Sicht.
- **N-9 Wege unter lg:** Wegefeld liegt in `teile/Wissen.tsx` (nicht im Bauteil). Mit der Übergabe N-3 tragen alle Zeilen der Raumliste
  ihr Zeichnungsfeld, die Wege keines; das trennt beide Listen auch mobil sichtbarer.
- **N-11 Glossar /referenzen:** planKonform (M2-C2 Nr. 2). Empfehlung (b): Ablauf 01 als erstes sichtbares Vorkommen markieren, „… und
  prüft den [[untergrund|Untergrund]].“: der Satz hat mit Klammer 22 Wörter (Grenze 25). Ändert den Fließtext (Markierung im
  Ablauf), darum nicht ohne Entscheidung gebaut.

### Textvorschlag aus der Nacharbeit
| Nr. | Ansicht | Stelle | heute | Vorschlag | Grund |
|---|---|---|---|---|---|
| T-C-5 | /fliesen | Lage „Jeder Raum braucht einen anderen Boden.“, Zeile „Fliesen auf Fußbodenheizung“ | sechste Zeile der Raumliste | als sechster Weg unter „Formate und Technik“ (Wortlaut gleich); Raumliste fünf Zeilen, alle mit Zeichnung, Wege 3 + 3 | Fußbodenheizung ist Technik („Kleber und Fugen“ wie „Verlegetechnik“), kein Raum und keine Lage; der Satz der Lage nennt sie nicht |

### Gewollte Pixeländerungen der Nacharbeit (zusätzlich zu Abschnitt 3)
- /referenzen d1440 und d1920: Galerie mit Passstücken (oben über der Mittelspalte, unten unter den äußeren Spalten), Knopf mit Abstand
  unter der Liste. m390 unverändert gegenüber dem ersten Bau.
- /fliesen alle Geräte: Schichtschnitt mit Ziffernmarken (Zeichnung rund 10 % niedriger durch die Markenspalte), Unterschrift
  linksbündig mit Ziffern.
- /ueber-uns alle Geräte: „belegt“ in fs-2 halbfett mit Haken.
- /leistungen: keine (Wand.tsx nur Rechenweg).
- Bildsatz nachher erneuert (`bilder/nach`, 142 Aufnahmen): abweichend gegenüber `bilder/vor` d1440 / d1920 / m390: /referenzen
  12/12 · 11/12 · 11/12, /ueber-uns 10/12 · 10/12 · 10/12, /fliesen 11/11 · 10/11 · 11/12, /leistungen 11/12 · 11/12 · 11/12 (Anzahl
  wie im ersten Bau, Inhalt der Ausschnitte wie oben).

### Prüfzahlen nach der Nacharbeit (Endbau build-6)
- `npm test`: 280 Tests, 280 bestanden, 0 rot, 0 übersprungen (mit Bau; vor dem Bau 279 + 1 übersprungen).
- `npx tsc --noEmit`: 0. `npx eslint` über die 20 geänderten Code- und Testdateien: 0.
- `werte.mjs --dateien` (21 Quelldateien inkl. globals.css und bewegung.css): 5 Befunde, dieselben 5 wie auf vor (0.01ms-Ausnahmen,
  `STAFFEL_MAX: 7`): **0 neu** (`werte/nach2`).
- `next build`: Exit 0 (`build-6.log`); ein Stylesheet je Seite (/, /referenzen, /ueber-uns, /fliesen, /leistungen je 1).
- CSS gzip -9 (wie `kette.sh`, über die Standardeingabe): 25.218 B (4325) → 25.451 B (4540), **+233 B** (roh 147.194 → 148.597);
  davon Nacharbeit +63 B. Gegenüber a3c28d36 (4324, 25.111 B) +340 B; seit 4d2d3fef rund +2.051 B von 4 KB. Richtwert SF2-C 0,7 KB.
- `erstesbild.mjs` (4 Ansichten, m390, q844, d1440, zwei Durchgänge): 24 Fälle, sichtbare Pflichtelemente 101 → 101, alle fünf
  17 → 17, Fall für Fall gleich. m360 mit 200 % Schrift: 8 Fälle, 17 → 17, alle fünf 0 → 0 (Altbefund OF-C3-4), Fall für Fall gleich
  (`erstesbild2/{nach,nach-200}` gegen `erstesbild/{vor,vor-200}`).
- `bildsatz.mjs --png` nachher: 142 Aufnahmen, 0 Fehler, 0 nicht 200, Überlauf 0, Konsole 0, Überlappung 12 (nur `leitachse`, wie vor).
- `axe.mjs` (4 Ansichten, m390, d1440, d1920): 12 Läufe, 0 Verstöße jeder Schwere. `lesbarkeit.mjs` (4 Ansichten): 4/4 grün.
- Keine Lighthouse- und keine Zeitmessung (E-076); R-1 bitte wie geplant nachmessen (keine Arbeit je Foto hinzugekommen).
