# UM-E4-SICHT-FIX-2 · Bauteil SF2-A1 (Stufe 1) · M2-A6 → M2-A1 · Kern 4.4.1

Arbeitskopie `$SCRATCH/sfix2/a/baum` (Abzug HEAD 9276b878, Code gleich a3c28d36), Vergleich `$SCRATCH/sfix2/a/vor` (unverändert;
die beim ersten `tsc` dort entstandene, gitignorierte `tsconfig.tsbuildinfo` ist wieder gelöscht). Server: 4510 = baum (Endbau
build-5 der Nacharbeit, nach den Messungen gestoppt, `.next` gelöscht), 4324 = a3c28d36 (vorher, nicht angefasst), 4326 nicht angefasst.
**Stand nach der Nacharbeit: Abschnitt 9.** Wo die Abschnitte 1 bis 8 durch die Nacharbeit überholt sind, steht es dort mit „(N)“.

- **Diff (N):** `$SCRATCH/sfix2/a/UM-E4-SICHT-FIX-2-a1.diff` (`diff -ruN vor baum` ohne node_modules, node_modules_echt, .next, bilder,
  next-env.d.ts, tsconfig.tsbuildinfo; 11 Dateien, 863 Zeilen). `patch -p1 --dry-run` gegen das Repository (HEAD abbdd9d0): alle 11
  Dateien sauber. Erste Fassung als `….diff.v1` aufbewahrt.
- **Zusätzlich, nicht im Diff (N, EV-1, EV-15):** `$SCRATCH/sfix2/a/legenden-vorschlag.diff`, M2-A1 Nr. 5 samt Nr. 6 für zwei Seiten:
  Legenden der Gefälle-Zeichnungen im Block auf der Achse mit Lesemaß, `tun.satz: 'rechts'` entfällt auf `/bad/barrierefreies-bad`
  und `/balkon-terrasse`, Kommentare in Tun und inhalt.ts und die zwei KERN-Sätze dazu (7 Dateien, 112 Zeilen). Gilt auf dem Stand nach
  dem Hauptdiff: `patch -p1 --dry-run` nach dem Hauptdiff sauber, im Probebau geprüft (9.3). Erste Fassung `legenden-vorschlag.v1.diff`.
- **Bilder:** `$SCRATCH/sfix2/a/bilder/vor` (4324) und `…/bilder/nach` (4510), je ein Lauf `bildsatz.mjs --png`, Geräte d1440, d1920,
  t1024, m390, Seiten: alle betroffenen Ansichten und `/`. Probeansichten: `<gerät>/bad__badsanierung`, `<gerät>/fliesen`,
  `<gerät>/referenzen`. Dazu `bilder/schrift200/` (200 % Schrift, m390 und d1440, vorher und nachher) und `probe/` (Schnittstellen im
  Probebau, siehe 7).

## 1 Maßnahmen und Stand

### M2-A6 Schnittstellen für alle Teile · umgesetzt (ohne `WorumInhalt.bildZwei`, E-113 Nr. 4)
Ohne Angabe im Inhalt ändert keine dieser Angaben eine Seite (geprüft: Probebau mit Daten, danach Daten zurück, siehe 7).
1. `TunInhalt.punkteMehr?: boolean` (inhalt.ts, Tun.tsx): Die Punkte stehen im Aufklapper „Mehr erfahren“ am Ende des Abschnitts,
   vor `absatzMehr`; genau ein Aufklapper je Abschnitt, Kennung und Wortlaut wie heute (`Aufklapper zeile="Mehr erfahren"`,
   natives `details`, Inhalt im DOM). Der Absatz bleibt offen. Rahmenlinie: `nachListe` gilt nur für offene Punkte; liegen die
   Punkte im Aufklapper, trägt er `border-y`, und die Punktliste verliert ihre letzte Fuge, wenn kein `absatzMehr` folgt (neue Prop
   `Punktliste schluss`), sonst stehen zwei Linien übereinander. `absatzMehr` nach den Punkten mit `pt-6`.
2. `Wissensblock.wegeForm?: 'zeilen' | 'reihe'` (inhalt.ts, Wissen.tsx `Wegefeld`): `reihe` = Fugenfeld voll breit, ab lg und 32 rem
   (Container-Abfrage) sechs Spalten mit drei Zellen je Reihe, nur 1-px-Fugen (Liste mit Fuge oben, jede Zelle mit Fuge unten,
   senkrechte Fugen nur zwischen Nachbarn), keine Füllung, kein Rahmen je Zelle; unvollständige letzte Reihe um eine halbe Zelle
   eingerückt (5 → 3 + 2, Halbverband), je Zelle Name (fs-4 halbfett), Satz (fs-3), Pfeil; ab lg oben bündig. Unter lg Zeilen wie die
   Wege.
3. `VersprechenInhalt.offen?: number[]` (nur Typ und Doku, Darstellung M2-A3).
4. `ZweiterBeleg.flaeche` um `'tinte'` erweitert (Beleg.tsx; Abschnitt kennt Tinte).
5. `ErzaehlSeite momente.stimmen?: ReactNode` → `Beleg stimmenZusatz`: steht im Abschnitt `kundenstimmen` direkt nach der Einleitung
   vor den Stimmen (`mb-12`, `data-kopf-pause="ganz"`, EV-8). Laut E-113 Nr. 5 vorerst ohne Nutzer.

### M2-A1 Satzspiegel v2 · umgesetzt bis auf Nr. 5 (Legenden, EV-1) und, seit der Nacharbeit, Nr. 6 für zwei Seiten (EV-15)
1. **kern/Abschnitt.tsx:** `Satz` um `'achse'` erweitert: mittiger Block ab lg und ab 32 rem Inhaltsbreite (`@container` +
   `mx-auto lg:@lg:w-2/3`, d1440 811 px, d1920 912 px, t1024 619 px), darunter wie `mitte`. `Satzblock`, `satzMass`, `satzBlock` und
   `einleitungGeteilt` kennen `achse`; der Abschnitt hüllt bei `satz="achse"` den ganzen Inhalt in den Block. Lange Einleitung im
   Block linksbündig, kurze mittig unter dem Kopf. Neuer Helfer **`satzSpalten(n)`**: ab lg zwei Spalten mit `gap-x-12` ab vier
   Einträgen, drei bei genau drei, zeilenweise, ungerader letzter Eintrag in zwei Spalten über beide (`letzte`). `links`/`rechts`
   bleiben unverändert (ausdrückliche Wahl: Leistungsreihe auf `/`, bis M2-A2 FormularSchritt, bis Nr. 5 die Gefälle-Legenden).
   `abschnitt-inhalt` (Bahn der Marke) bleibt volle Breite, `ACHSE_VOR_SATZ` unverändert.
2. **Lage.tsx:** Standard `achse`. Absätze als großer Vorspann (fs-4 Tinte, `max-w-mass` am selben Element, d1440 811 px Block,
   Text bis 790 px). Ausrichtung je Block: ab lg mittig bis `VORSPANN_MITTIG` = 160 Zeichen Klartext aller Absätze, sonst linksbündig an
   der Blockkante; unter lg linksbündig wie bisher (EV-6). Mittig: /referenzen (107), /bad (153). Linksbündig: /bad/badsanierung (207),
   /fliesen (167), /blog (200), /leistungen (218), /balkon-terrasse (217), /bad/barrierefreies-bad (289), /ueber-uns (413), Ortsseiten
   (rund 190). Wege ab drei voll breit mit `Bereichszeilen spalten` (/fliesen 6 → 3 × 2, /bad 5 → 2 + 2 + 1, /balkon-terrasse 3 → 3
   nebeneinander); `zusatz` (Einzugsband) breit über die volle Satzbreite. Lage nur mit Auswahl (`/`) unverändert `breit`.
3. **Tun.tsx:** Standard `achse` mit oder ohne Moment (`TunInhalt.satz` nur noch als ausdrückliche Wahl). Punkte einspaltig, Absatz und
   Aufklapper im Block auf der Achse, lange Einleitung im selben Block. Bereiche ab drei voll breit in Spalten (EV-3), weniger im Block.
   Zeichnung `unterKopf` breit, mittig, `max-w-5xl` (d1440 1024 × 616 px Feld statt 811 × 502), Unterschrift mittig darunter im Lesemaß
   mit `data-kopf-pause="ganz"`. Moment breit. Leistungsreihe von `/` unverändert (`mitte`, pixelgleich). Der Abschnitt selbst steht
   `breit`, jeder Block trägt seinen Satz (EV-4).
4. **Wissen.tsx:** ohne Zeichnung `achse` (Liste und Tabelle im Block, Wege ab drei voll breit in Spalten, lange Einleitung im Block);
   mit Zeichnung `breit` wie bisher (/fliesen, /blog unverändert in diesem Teil).
5. GefaelleDusche/GefaelleBalkon: **nicht gebaut** (Momente in Stufe 1 gesperrt), fertiger Vorschlag als eigener Diff (EV-1).
6. Inhalte: `tun.satz: 'rechts'` in `barrierefreies-bad.ts` und `balkon-terrasse.ts`, `tun.satz: 'mitte'` in `referenzen.ts` entfallen
   (samt ihren Kommentarzeilen, die nur die Überschreibung begründeten).
7. Probe für den Orchestrator: Bilder siehe Kopf; selbst angesehen bei d1440, d1920, t1024, m390 und 200 % (m390, d1440), Abschnitt 6.
- **Register/KERN (in der Kopie):** `leitachse.was` in `register.ts` und `register.json` gleichlautend (Bewegung 13 grün): „…der Inhalt
  steht auf der Kopfachse, die Marke bleibt auf dem Lot und tritt neben mittigem Text zurück, ausdrücklich links gesetzte Blöcke stehen
  ab lg 16 px am Lot (Satzspiegel v2, UM-E4-SICHT-FIX-2 M2-A1)…“. KERN K-003 „Fläche“ (Satzspiegel v2 nach E-113 Nr. 3, Lesart
  „zwei Spalten derselben Liste sind ein Strang“), K-007 Leitfaden-Motiv (Spalte Gestalt), K-009 (neue Zeile „Zeichnungen im Satzspiegel
  v2“, EV-12). ENTSCHEIDUNGEN nicht angefasst (Rücknahmen M-B1 Nr. 2, V-6, NO-3, O-3 trägt SF2-O ein).

## 2 Entscheidungsvermerke

**EV-1 · M2-A1 Nr. 5 (Gefälle-Legenden) nicht im Diff**
- Ziel: Briefing-Grenze halten („Nicht anfassen: … Momente; die baut Stufe 2“), obwohl der Plan die beiden Dateien in M2-A1 nennt.
- Alternativen: (a) Legenden mitbauen (Grenzverletzung); (b) `tun.satz: 'rechts'` auf barrierefrei und balkon stehen lassen, bis die
  Legenden folgen (gegen den ausdrücklichen Auftrag); (c) gewählt: Überschreibungen entfallen wie beauftragt, die Legenden-Änderung liegt
  fertig als `legenden-vorschlag.diff` bei.
- Wirkung bis zum Einspielen des Vorschlags: Auf /bad/barrierefreies-bad und /balkon-terrasse stehen ab lg im Abschnitt „Was wir tun“
  drei linke Kanten in Folge: Einleitung x 315, Legende x 517 (Satzblock rechts im Moment), Punkte x 315 (d1440; vorher alle drei bei
  517). Mit dem Vorschlag steht alles bei 315 (Probebau gemessen: Balkon-Legende `ul x 315–1125`, Bild `probe/balkon-klein.png`).
- Risiko: Der Vorschlag hängt an keiner Maßnahme von SF2-A2 (M2-A10 ändert nur bewegung.css); ohne Zuweisung bliebe der Zwischenstand.
- Rückweg: keiner nötig; Empfehlung: Vorschlag mit Stufe 1 einspielen oder ausdrücklich SF2-A2 zuweisen (Frage 1).

**EV-2 · Lesemaß auf der Achse am eigenen Element**
- Ziel: Text steht symmetrisch zur Kopfachse, Zeilen bleiben im Lesemaß (K-006).
- Alternativen: (a) Lesemaß in der Grundschrift wie in v1 (605 px links im 811-px-Block: rechts 206 px leer, Textmitte 103 px links der
  Achse); (b) Text füllt den Block (fs-3 bei d1440 rund 85 Zeichen je Zeile); (c) gewählt: `satzMass('achse')` gibt den Block frei,
  Einleitung und Absatz tragen `max-w-mass` selbst (66ch der eigenen Stufe: fs-3 719 px, fs-4 bis 811 px).
- Wirkung: Einleitung/Absatz x 315–1033 (d1440), Mitte 46 px links der Achse; Punktliste unverändert (Satz 605 px in 811 px breiten
  Fugenzeilen).
- Risiko: rechte Flatterkanten von Absatz (719) und Punktsatz (605) verschieden; gering (Flattersatz).
- Rückweg: `max-w-mass` aus `einleitungKlassen` (Abschnitt) und vom Absatz in Tun entfernen, `satzMass('achse')` → `'mx-auto max-w-mass lg:@lg:mx-0'`.

**EV-3 · `satzSpalten` ab drei Einträgen auch in Tun und Wissen**
- Ziel: eine Regel für alle Listen (Lage-Beispiel /balkon-terrasse 3 → drei nebeneinander), Plantext Tun nennt nur „ab vier“.
- Alternativen: Tun/Wissen erst ab vier voll breit, drei im Block.
- Wirkung heute keine (kein Tun oder Wissensblock hat drei Bereiche/Wege); unter drei im Block auf der Achse.
- Risiko: gering. Rückweg: Schwelle `>= 3` → `>= 4` in Tun (`bereicheVoll`) und Wissen (`wegeTeil`).

**EV-4 · „Was wir tun“, Lage und Wissensblock: Abschnitt `breit` + Satz je Block**
- Ziel: Liste voll breit, Zeichnung breit, Punkte und Absatz auf der Achse im selben Abschnitt.
- Alternativen: Abschnitt `satz="achse"` (hüllt alles in den Zwei-Drittel-Block, Liste und Zeichnung könnten nicht breiter sein).
- Wirkung: Abschnitt bekommt `satz="breit"` und `einleitungSatz` = Satz der Blöcke; jeder Block steht in einem eigenen `Satzblock`
  (`@container`-Hülle). DOM-Folge und Fokusfolge unverändert. `satz="achse"` am Abschnitt ist gebaut und dokumentiert (für M2-A2).
- Risiko: einige zusätzliche Hüllen-`div` ohne Rolle. Rückweg: Teile wieder unter einen Satzblock legen.

**EV-5 · Marke und Kopf-Pausen**
- Ziel: „Marke nie neben mittigem Text“ (Risiko M2-A1).
- Umsetzung: Bahn und Marke bleiben auf dem Lot (abschnitt-inhalt volle Breite). `data-kopf-pause="ganz"` an mittig gesetztem Text in
  der Bahn: Lage-Vorspann (mittig), Unterschrift der Tun-Zeichnung, `stimmenZusatz`. Höchstens eine Pause „ganz“ je Abschnitt bleibt
  gewahrt (Lage hat sonst keine; Tun mit Zeichnung hat keinen Moment mit eigener Pause; Stimmen ohne Pause).
- Geprüft mit Bewegung (d1440, /bad/badsanierung): Unterschrift auf der Leselinie → Marke Deckkraft 0; Punkt 02 auf der Leselinie →
  Marke sichtbar bei x 96, Kreuz auf 360 px (40 % von 900). Lagen stehen heute alle auf Fliese (keine Marke) außer /blog (linksbündig).
- Risiko: Ein künftiger Tun mit `unterKopf` und einem Moment mit eigener Pause „ganz“ hätte zwei (Kommentar an `Zeichnung`).
- Rückweg: Attribut entfernen.

**EV-6 · Lage mittig erst ab lg**
- Ziel: Lesbarkeit für P1 (m390, 200 %): mittig gesetzt stand der Vorspann von /referenzen in vier (100 %) bis zehn Zeilen (200 %).
- Alternativen: Plantext ohne Bruchstelle (mittig auf allen Breiten).
- Wirkung: unter lg linksbündig wie bisher (m390 /bad und /referenzen pixelgleich zu vorher), ab lg mittig im Block.
- Risiko: keins. Rückweg: `lg:@lg:text-center` → `text-center`.

**EV-7 · Fugenfeld (`wegeForm 'reihe'`): Fugen ohne Außenkanten**
- Ziel: „ohne Einzelrahmen, Zellen nur durch 1-px-Fugen getrennt“.
- Alternativen: Halbverband-Zellen mit Kante links und rechts (liest sich als zwei Kästen).
- Wirkung: keine äußeren senkrechten Fugen; Zellen der letzten Reihe teilen eine Mittelfuge, ihre Fuge unten reicht nur unter ihnen
  (Bild `probe/fl-feld-d1440-unten.png`, t1024 und m390 ebenso).
- Risiko: gering. Rückweg: `lg:@lg:border-l`/`-r` an den Randzellen der Restreihe.

**EV-8 · `stimmenZusatz` im Inhalt statt im Einleitungsplatz** — Ziel: eigene Typografie des Elements (z. B. Leitsatz), nicht die Klassen
der Einleitung (fs-3, tinte-2). Wirkung: erstes Kind des Abschnitts vor den Stimmen, `mb-12`, mit Pause. Risiko keins (ohne Nutzer).
Rückweg: in `einleitung` als zweites Kind legen.

**EV-9 · Abstände in Tun** — Absatz direkt nach Bereichen oder Zeichnung (nur mit `punkteMehr` möglich) `mt-16` statt `mt-8`; Absatz als
erstes Element ohne oberen Abstand. Der Moment behält auch ohne Folge `mt-16` (wie bisher, /leistungen pixelgleich bei m390). Heute keine
Seite betroffen. Rückweg: Klassen in `folge`.

**EV-10 · Zeichnung unter lg** — breit statt Lesemaß: bei t768 bis zu 704 px statt 605 px; Unterschrift auf allen Breiten mittig (m390
/bad/badsanierung: einzige sichtbare Änderung mobil). Rückweg: `max-w-mass` am `figure` unter lg.

**EV-11 · `/bad` Lage mittig** — 153 Zeichen ≤ 160 → nach Regel mittig (Plantext nennt nur /referenzen); Folge der Regel, kein Sonderfall.

**EV-12 · KERN „K-009“** — als SVG-Formsystem (Zeichnungen) gelesen: neue Zeile zu Zeichnungen im Satzspiegel v2 samt Hinweis, dass die
Gefälle-Legenden bis Nr. 5 rechts stehen. Rückweg: Zeile streichen.

## 3 Gewollte Pixeländerungen je Ansicht (Stand vor der Nacharbeit; neu und mit q844 und t768 in 9.4)

Allgemein ab lg (d1440, d1920, t1024): Lage-Absätze x 112–717 (605) → Block x 315–1125 (811), Text fs-4 bis 790 px; Tun-Einleitung,
Punkte, Absatz, Aufklapper x 517 (Spalten 2–3) bzw. mittig 417 → Block x 315 (Punkte 811 breit, Text 719); Listen ab drei voll breit
x 112–1328 in Spalten. t1024: Block x 202–821 (619). m390: nur die Bildunterschrift auf /bad/badsanierung mittig; sonst pixelgleich.

| Ansicht | Änderung (d1440) | Ausschnitte abweichend d1440/d1920/t1024/m390 |
|---|---|---|
| `/` | keine | 0/0/0/0 |
| /bad/badsanierung | Lage linksbündig im Block (h 590 → 554); Tun: Einleitung im Block, Zeichnung 1024 px mittig (Feld 502 → 616 hoch), Unterschrift mittig, Punkte und „Mehr erfahren“ im Block (h 1722 → 1805) | 10/10/11/1 |
| /fliesen | Lage: Vorspann im Block, Raumliste 6 → 3 × 2 voll breit (h 1327 → 951, Seite eine Bildschirmhöhe kürzer); Wissensblock unverändert | 11/9/11/0 |
| /referenzen | Lage mittig im Block; Tun (vorher `mitte`): Einleitung im Block, Bereiche 2 × 2 voll breit, Punkte und Absatz im Block (h 1519 → 1288) | 6/6/5/0 |
| /bad/barrierefreies-bad | Lage linksbündig im Block (h 601 → 529); Tun: Einleitung, Punkte, Absatz von x 517 nach x 315, Legende bleibt x 517 (EV-1) | 9/9/11/0 |
| /balkon-terrasse | Lage im Block, Wege 3 nebeneinander voll breit (h 1008 → 756); Tun wie barrierefrei (Legende bleibt x 517) | 11/11/11/0 |
| /ueber-uns | Lage im Block (h 575 → 503); Tun: Bereiche 5 → 2 + 2 + 1 voll breit, Punkte und Absatz im Block (h 1672 → 1502) | 11/11/11/0 |
| /standorte/wetzlar (alle Ortsseiten) | Lage im Block, Einzugsband voll breit (1216 statt 605); Tun: Bereiche 4 → 2 × 2 voll breit mit Vignetten (h 1089 → 768) | 9/8/10/0 |
| /leistungen | Lage: Einleitung (fs-3) und Absätze im Block (h 644 → 577); Tun-Einleitung von mittig 417 nach Blockkante 315 | 11/11/2/0 |
| /bad | Lage mittig im Block, Wege 5 → 2 + 2 + 1 voll breit (h 1167 → 890); Tun: Einleitung, Punkte, Absatz im Block (Legende der Szene im Moment bleibt mittig x 417, Frage 3) | 11/11/11/0 |
| /blog | Lage (nach der Liste, auf Kalk) linksbündig im Block | 6/6/1/0 |

Erstes Bild unberührt (alle Änderungen unter dem ersten Bildschirm, erstesbild Fall für Fall gleich).

## 4 Schnittstelle für Stufe 2 (neue Props und Standards)

- `kern/Abschnitt`: `type Satz = 'mitte' | 'achse' | 'links' | 'rechts' | 'breit'`; `<Abschnitt satz="achse">` hüllt den Inhalt in
  den Zwei-Drittel-Block (für **M2-A2** FormularSchritt: `satz="achse"`, Formularkasten und Kontaktzeile dann rund 811 px; dort
  `satzMass('achse')` statt `satzMass('links')`, Text braucht `max-w-mass` am eigenen Element); `einleitungSatz="achse"` setzt die lange
  Einleitung in den Block. `Satzblock satz="achse"`, `satzMass('achse')` (Block = Breite), `satzBlock('achse')`,
  `satzSpalten(n) → { liste, letzte? }` (Hülle braucht `@container`).
- `teile/Tun`: `Bereichszeilen spalten` (voll breit in Spalten, Zeichnung je Zeile ab 20 rem Spaltenbreite), `Punktliste schluss`,
  `TunInhalt.punkteMehr` (für **M2-C2** /referenzen: `punkteMehr: true` + Zusatzabsatz nach `absatzMehr`; `tun.satz` ist schon entfernt).
  DOM-Folge mit `punkteMehr`: Bereiche, Absatz, [Moment], Aufklapper (Punkte, Fachtext). Auf /referenzen ohne Glossar-Konflikt (der
  Absatz trägt nur „barrierefrei“, die Punkte Untergrund, Abdichtung, DIN 18534); lesbarkeit.mjs öffnet `details`.
- `teile/Wissen`: `Wissensblock.wegeForm: 'reihe'` (für **M2-C4** auf `wissen[0]` von /fliesen; Fugenfeld voll breit auch im Block
  mit Zeichnung, geprüft 3 + 2).
- `teile/Lage`: `VORSPANN_MITTIG = 160` (export); `zusatz` steht voll breit (für **M2-B7**).
- `VersprechenInhalt.offen?: number[]` (**M2-A3**), `ZweiterBeleg.flaeche: 'tinte'` (**M2-C2**), `momente.stimmen` → `stimmenZusatz`
  (**M2-C3**, laut E-113 Nr. 5 ohne Nutzer).
- `legenden-vorschlag.diff` (M2-A1 Nr. 5, EV-1). **M2-A9** (Prop `dichte`) setzt auf `Abschnitt` auf; Innenabstände hier unverändert.

## 5 Textvorschläge
Keine. Wortlaut aller Inhalte unverändert (Diff in `src/inhalte/` nur die drei `tun.satz`-Zeilen samt Kommentar); kein Mikrotext neu.

## 6 Selbst angesehen
d1440, d1920, t1024 (alle betroffenen Ansichten, Bildbögen), m390 (Probeansichten), 200 % bei m390 (/fliesen Lage, /bad/badsanierung
Tun, /referenzen Lage) und d1440 (/fliesen Lage: zwei Spalten à rund 600 px, lesbar). Ergebnis: keine schmale Mittelsäule allein, die
Breite wechselt je Abschnitt (Vorspann 811, Liste 1216, Zeichnung 1024, Moment 1216); kein halbleerer Bildschirm mehr in Lage und Tun;
Köpfe mittig, Inhalt auf der Kopfachse. Erste vier Bildschirme der Probeansichten ohne zwei gleich gebaute Nachbarn (/badsanierung:
Einstieg, Lage Vorspann, Tun mit breiter Zeichnung, Treppe; /fliesen: Einstieg mit Plan, Lage mit Liste in zwei Spalten, Wissensblock mit
Wähler; /referenzen: Einstieg, Lage kurz mittig, Galerie). Rest: zwei Achsen nur noch im Zwischenstand von EV-1 und in der Szene auf /bad
(Frage 3). (N, berichtigt) Bei d1920 ist der Block 912 px breit (x 504–1416), daneben je 504 px frei; Listen füllen 1368 px (x 276–1644), die
Zeichnung auf /bad/badsanierung 1152 px (x 384–1536). Die Zahlen 811 / 1216 / 1024 gelten für d1440.

## 7 Offene Fragen
1. **Legenden (EV-1):** `legenden-vorschlag.diff` mit Stufe 1 einspielen oder SF2-A2 zuweisen? Ohne ihn bleibt auf barrierefrei und
   balkon die Kante x 517 zwischen zwei Blöcken bei x 315.
2. Einzugsband der Ortsseiten steht voll breit (Zonen über 1216 px) und wirkt bis M2-B7 gedehnt; als Zwischenstand annehmen?
3. /bad: Die Legende der Szene `schichten` (Moment, mittig 605 px, x 417) steht direkt über den Punkten im Block (x 315). Nicht im Plan;
   Moment-Datei gesperrt. In Stufe 2 angleichen (Szene im Block auf der Achse) oder lassen (Moment mit eigenem Rahmen)?
4. EV-6 (Lage mittig erst ab lg) und EV-3 (Spalten ab drei auch in Tun/Wissen) bestätigen?
- Probebau (nicht im Diff, danach zurückgesetzt): Legenden-Vorschlag, `punkteMehr: true` auf /referenzen, `wegeForm: 'reihe'` auf
  /fliesen; Bilder `probe/ref-mehr-offen-d1440.png`, `probe/fl-feld-{d1440,t1024,m390}*.png`, `probe/balkon-klein.png`,
  `probe/bs-marke-{caption,punkte}.png` (Marke mit Bewegung).

## 8 Prüfzahlen (Endbau build-4, Stand vor der Nacharbeit; neu in 9.5)
- `npm test`: 280 Tests, 280 bestanden, 0 rot, 0 übersprungen (Bewegung 13 grün mit neuem `leitachse.was`).
- `npx tsc --noEmit`: 0. `npx eslint` über die 11 geänderten Code-Dateien: 0. `werte.mjs --dateien` (11 Dateien, 597 Klassen): 0 Befunde.
- `next build`: Exit 0; ein Stylesheet je Seite (`test/stylesheets` grün; /fliesen, /bad/badsanierung je ein `link rel=stylesheet`).
- CSS gzip -9 (wie `kette.sh`): 25.111 B (4324) → 25.207 B (4510), **+96 B** (roh 146.367 → 147.015, +648 B); Richtwert Stufe 1 ≤ 0,5 KB.
- `erstesbild.mjs` (11 Ansichten inkl. `/`, q844, m390, d1440, zwei Durchgänge): 66 Fälle, Summe 283 → 283, alle fünf 52 → 52, Fall für
  Fall gleich. m360 mit 200 % (Kopie mit `font-size: 200%`): 22 Fälle, Summe 49 → 49, Fall für Fall gleich (alle fünf 0 → 0, Altbefund
  OF-C3-4). Belege `erstesbild/{vor,nach,vor-200,nach-200}/erstes-bild.json`.
- `bildsatz.mjs`: vorher 518, nachher 515 Aufnahmen; 0 Fehler, 0 nicht 200, Überlauf 0, Konsole 0; Überlappung je 44 (`leitachse`,
  Schnur-Figur, vorher wie nachher). Pixel: `/` auf allen vier Geräten gleich; Abweichungen nur in gewollten Ansichten (Abschnitt 3).
- Keine Lighthouse- und keine Zeitmessung (E-076). Hilfsskripte `_werkstatt/werkzeuge/_sf2a1-*.mjs` wieder gelöscht.

## 9 Nacharbeit (zwei Prüfer, 14 Befunde; E-113, E-104, E-111, E-112)

Jeder Befund selbst nachgeprüft (Code im Baum, eigene Messung `mass2/`, Bilder `bilder/nach`, Bildbögen `blick2/`). Neuer Endbau
build-5 (Port 4510), danach Probebau mit dem Begleitdiff (9.3), danach Begleitdiff wieder zurückgenommen; Baum = Hauptdiff.

### 9.1 Befunde und Stand
| Nr. | Befund (Prüfer, Schwere) | Prüfung | Stand |
|---|---|---|---|
| B1 | Gefälle-Legenden fehlen (M2-A1 Nr. 5), auf barrierefrei und balkon drei linke Kanten, schlechter als vorher (hoch) | bestätigt (x 315 / 517 / 315) | Zwischenstand behoben, Nr. 5 im Begleitdiff (EV-15): Der Hauptdiff lässt `tun.satz: 'rechts'` dort stehen, „Was wir tun“ steht auf beiden Seiten wieder auf einer Kante (x 517, Abschnittshöhe 1590 bzw. 1742 px wie vorher). Die Legenden liegen in `Momente` (laut Auftrag nicht anfassen); `legenden-vorschlag.diff` bringt Legenden und Inhalte zusammen auf die Achse (alle Blöcke x 315–1033, 9.3) |
| B12 | dasselbe, mit Lesemaß der Legende und Testlauf (mittel) | bestätigt | im Begleitdiff: `max-w-mass` am Satz (Dusche) und an der Legende (Balkon); `test/gefaelle-*.test.mjs` im Probebau grün (280 von 280) |
| B2 | /bad: Liste der Szene „schichten“ (x 417, im Rahmen des Moments) über den Punkten (x 315) (mittel) | teils bestätigt | nicht im Diff, Frage 9.6 Nr. 2: Plan Nr. 3 setzt die Punkte mit Moment ausdrücklich in den Block, die Szene ist eine Moment-Datei. Nach B3 teilen Einleitung, Punkte und Absatz eine linke und rechte Kante (x 315–1033), die Szenenliste steht in ihrem eigenen weißen Rahmen mittig unter ihrer mittigen Zeichnung |
| B3 | Punkte als schmale Säule, drei rechte Kanten im Block (Punktsatz, Absatz, Fugen) (mittel) | bestätigt | behoben (EV-16): Zeilen an der Fuge auf der Achse (Punkte, Aufklapper, Bereiche im Block, Wissen-Liste) ab lg im Lesemaß der Stufe fs-3 wie Einleitung und Absatz. d1440 alle x 315–1033 (Text der Punkte bis 1033, vorher Fugen 1125, Text 905, Absatz 982), d1920 x 504–1312, t1024 x 203–821. Zweispaltige Punkte bleiben nach Plan aus (erst mit M2-A7) |
| B4 | Einzugsband der Ortsseiten voll breit gedehnt (mittel) | bestätigt | behoben (EV-14): Band im Block auf der Achse, auf der Kante des Vorspanns (d1440 x 315–1125, unter lg wieder 605 px wie vorher); `Lage zusatzBreit` für M2-B7 |
| B5 | Spalten: Pfeile je Zelle versetzt; ungerader letzter Eintrag über beide Spalten mit fernem Pfeil (gering) | bestätigt | Pfeile behoben (EV-17: ab lg Link füllt die Zelle, oben bündig, Pfeil auf der Namenszeile, wie das Fugenfeld). Letzte Zeile über beide Spalten bleibt: Der Plan verlangt sie ausdrücklich („keine leere Zelle, keine hängende Fuge“), der Vorschlag „Fuge nur unter der Zelle“ ist genau die hängende Fuge |
| B6 | Lesemaß 66 ch der Stufe fs-3/fs-4 = bis 81 Zeichen je Zeile (gering) | bestätigt (gemessen ≈ 72 bis 77 je Zeile in Einleitung und Absatz) | nicht geändert: Der Befund verlangt eine Entscheidung des Orchestrators (Frage 9.6 Nr. 3). Mit B3 gilt dasselbe Maß jetzt auch für die Punkte (≈ 75 statt ≈ 60 Zeichen); eine Entscheidung für 60 ch träfe alle Blöcke gleich |
| B7 | Unterschrift der Zeichnung mobil mittig (gering) | bestätigt | behoben: `lg:text-center`; m390 jetzt auf allen elf Ansichten pixelgleich zum Vorher |
| B8 | Notiz: q844/t768 nicht dokumentiert, d1920-Maße falsch (gering) | bestätigt | behoben: 9.4 mit q844 und t768; d1920-Maße in 1 und 6 berichtigt |
| B9 | `VORSPANN_MITTIG` 160 setzt /bad (153) in drei mittige Zeilen (gering) | bestätigt | behoben (EV-13): 120 Zeichen; /bad steht linksbündig, mittig bleibt nur /referenzen (107, zwei Zeilen bei d1440, d1920 und t1024) |
| B10 | /leistungen: kleine graue Einleitung über großem Vorspann (gering) | bestätigt, aber nicht von M2-A1 verursacht (vorher genauso, fs-4 schon vor dem Diff) | nicht geändert: eigene Maßnahme im Plan (SF2-C, /leistungen „Lage-Hierarchie verkehrt“: Einleitung als dritter Absatz) |
| B11 | /fliesen: zweite Linkliste bleibt einspaltig (gering) | bestätigt | nicht geändert: der Prüfer selbst: „Nichts in SF2-A1“, Sache von M2-C4 (`wegeForm: 'reihe'` liegt bereit) |
| B13 | Absatz nach Bereichsfliesen oder Leistungsreihe ohne oberen Abstand (gering) | bestätigt (latent, heute keine Seite) | behoben: nach Bereichsfliesen oder Leistungsreihe wieder `mt-8`; EV-9 angepasst |
| B14 | Notiz: d1440-Maße auch für d1920 angegeben (gering) | bestätigt | behoben (Abschnitt 1 und 6, Breiten je Gerät in 9.4) |

### 9.2 Entscheidungsvermerke der Nacharbeit
**EV-13 · `VORSPANN_MITTIG` 120 statt 160** — Ziel: die Planregel „mittig, wenn rund zwei Zeilen“. Gemessen fasst eine Zeile des Vorspanns
bei d1440 rund 72 Zeichen; mit 160 stand /bad (153) mittig in drei Zeilen mit „besten passt.“ allein. Alternativen: 160 lassen (Regel
widerspricht ihrem eigenen Grund); Zeilen messen (JavaScript). Wirkung: nur /bad wechselt auf linksbündig (Lage h 890 px wie zuvor
nach Diff, Text x 315). Risiko: Ein künftiger Ort mit 121 bis 160 Zeichen steht linksbündig. Rückweg: Konstante in Lage.tsx.

**EV-14 · Zusatz (Einzugsband) im Block auf der Achse** — Ziel: kein gedehntes Band bis M2-B7 und eine Kante mit dem Vorspann.
Plan Nr. 2 setzt das Band breit „als Grundlage für M2-B7“; breit wirkt es erst mit Ortsmaß und Kennzahl. Alternativen: breit lassen
(gedehnt, eigene linke Kante x 112 neben dem Vorspann x 315). Wirkung: d1440 x 315–1125, d1920 x 504–1416, t1024 x 203–821, unter lg
605 px mittig wie vorher. Schnittstelle: `Lage zusatzBreit` (boolean, Standard false); M2-B7 setzt in OrtsSeite.tsx (SF2-B)
`<Lage … zusatzBreit />`, ohne Lage.tsx zu ändern. Rückweg: Standard auf true.

**EV-15 · Zwischenstand auf /bad/barrierefreies-bad und /balkon-terrasse; Nr. 5 und Nr. 6 dort im Begleitdiff** — Ziel: Der Hauptdiff
macht keine Ansicht schlechter als vorher und hält die Grenze „Momente nicht anfassen“. Alternativen: (a) Legenden in den Hauptdiff
(Grenzverletzung); (b) erste Fassung: `tun.satz` entfällt, Legende bleibt rechts (drei Kanten, Befund B1 hoch). (c) gewählt: Im
Hauptdiff bleibt `tun.satz: 'rechts'` in beiden Inhalten (die zwei Dateien sind unverändert), „Was wir tun“ steht dort wie vorher
auf einer Kante bei x 517; die Lage dieser Seiten folgt v2. `legenden-vorschlag.diff` bringt Legenden (mit Lesemaß, B12), das Entfallen
der beiden `tun.satz`, die Kommentare und die zwei KERN-Sätze in einem Schritt. Wirkung mit Begleitdiff: Einleitung, Legende, Punkte und
Absatz auf beiden Seiten x 315–1033 (d1440), 504–1312 (d1920), 203–821 (t1024), m390 16–374. Empfehlung: Begleitdiff mit Stufe 1
einspielen (der Plan weist beide Moment-Dateien M2-A1 zu, E-113 Nr. 2 nennt die `tun.satz`-Überschreibungen Teil von Stufe 1); sonst
ausdrücklich SF2-A2 zuweisen. Risiko: ohne Begleitdiff bleiben die zwei Ansichten in „Was wir tun“ beim Versatz aus v1. Rückweg: keiner
nötig.

**EV-16 · Zeilen an der Fuge auf der Achse im Lesemaß der Stufe fs-3** (ändert EV-2) — Ziel: Fugen und Text enden an einer Kante (B3).
Umsetzung: `satzBlock('achse')` = `mx-auto max-w-mass lg:@lg:mx-0 lg:@lg:text-fs-3`: Ab der Teilung trägt die Hülle der Liste die Stufe
fs-3, `max-w-mass` (66ch) misst damit wie an Einleitung und Absatz (d1440 719 px, d1920 808 px); alles darin setzt seine Stufe selbst
(Nummer fs-2, Satz fs-3, Zeile des Aufklappers fs-3, Namen fs-4). Unter lg unverändert (Grundschrift, 605 px mittig). Alternativen:
Fugen auf die Breite des Satzes (Grundschrift, 605 px: Punkte schmaler als Einleitung und Absatz); Text über den ganzen Block (85
Zeichen). Wirkung: Punkte, „Mehr erfahren“, Bereiche unter drei Einträgen, Wege unter drei in Lage und Wissen und die Wissen-Liste stehen
auf der Achse mit derselben rechten Kante wie Einleitung und Absatz; die Achse des Blocks bleibt (Block x 315–1125), der Inhalt darin steht
an seiner linken Kante wie in EV-2. Risiko: Die Stufe an der Hülle erbt jedes Kind ohne eigene Stufe (geprüft: keins in den genannten
Listen). Rückweg: `lg:@lg:text-fs-3` → `lg:@lg:max-w-none`.

**EV-17 · Pfeile in Spalten oben** — ab lg im Spaltenmodus von `Bereichszeilen` füllt der Link seine Zelle (`h-full`) und steht oben
(`lg:items-start`, Pfeil `lg:mt-1`, wie das Fugenfeld der Wissensseiten). Die Abfrage ist `lg:` statt `lg:@lg:`, weil jede Zelle selbst
`@container` ist (für die Vignette). Unter lg unverändert. Rückweg: Klassen entfernen.

**Geändert:** EV-1 → EV-15. EV-9: Absatz nach Bereichsfliesen oder Leistungsreihe wieder `mt-8` (B13). EV-10: Unterschrift erst ab lg
mittig (B7); die Zeichnung bleibt unter lg breit (t768 704 px, q844 rund 770 × 490 px laut Prüfer, vorher 605 px breit; auf q844 ist sie in
beiden Fassungen höher als der sichtbare Bereich unter dem Kopf). EV-11: /bad steht nach EV-13 linksbündig. EV-12: KERN K-009 nennt den Zwischenstand
(Legenden rechts und mit ihnen „Was wir tun“ auf den zwei Seiten); der Begleitdiff ersetzt den Satz.

### 9.3 Probe Begleitdiff (build-probe-2, Port 4510, danach zurückgenommen)
- `patch -p1` auf den Baum, `tsc` 0, `eslint` 0 (6 Dateien), `next build` Exit 0, `npm test` 280 von 280 (darunter Gefälle 1 bis 6 und
  Gefälle Balkon 1 bis 5), CSS gzip unverändert (gleiches Stylesheet `33huea6uslsda.css`, 25.218 B).
- Lage gemessen (`probe-nr5/legende-mass.txt`): d1440 Legende x 315–1033, Einleitung 315–1033, Punkte 315–1033 auf beiden Seiten; d1920
  504–1312; t1024 203–821; m390 16–374. Bilder `probe-nr5/d1440-{balkon-terrasse,barrierefreies-bad}-tun.png` (verkleinert `…-klein.png`;
  der Kopf der Seite steht durch die Elementaufnahme mitten im Bild).

### 9.4 Gewollte Pixeländerungen (Hauptdiff, `pixel-vergleich.txt`, je Ausschnitt; Vorher 4324, Nachher build-5)
Breiten je Gerät: Block auf der Achse d1440 811 px (x 315–1125), d1920 912 px (x 504–1416), t1024 619 px (x 203–821); Text auf der
Achse (Einleitung, Absatz, Punkte, Aufklapper) d1440 719 px, d1920 808 px, t1024 619 px; Listen voll breit d1440 1216, d1920 1368,
t1024 928 px; Zeichnung /bad/badsanierung d1440 1024, d1920 1152, t1024 928 px.

| Ansicht | Änderung (ab lg) | abweichende Ausschnitte d1440 / d1920 / t1024 / m390 / q844 / t768 |
|---|---|---|
| `/` | keine | 0 / 0 / 0 / 0 / 0 / 0 |
| /bad/badsanierung | Lage im Block linksbündig; Tun: Einleitung, Punkte, „Mehr erfahren“ x 315–1033, Zeichnung breit, Unterschrift ab lg mittig (Tun h 1722 → 1744) | 11 / 11 / 11 / 0 / 10 / 9 |
| /fliesen | Lage: Vorspann im Block, Raumliste 3 × 2 voll breit, Pfeile oben (Lage h 1327 → 951) | 11 / 9 / 11 / 0 / 10 / 9 |
| /referenzen | Lage mittig im Block; Tun: Bereiche 2 × 2 voll breit, Einleitung, Punkte, Absatz x 315–1033 (h 1519 → 1227) | 6 / 6 / 5 / 0 / 1 / 3 |
| /bad/barrierefreies-bad | nur Lage im Block (h 601 → 529); „Was wir tun“ wie vorher (x 517, h 1590) | 9 / 9 / 11 / 0 / 2 / 1 |
| /balkon-terrasse | Lage im Block, Wege drei nebeneinander, Pfeile oben (h 1008 → 756); „Was wir tun“ wie vorher (x 517, h 1742) | 11 / 11 / 11 / 0 / 10 / 1 |
| /ueber-uns | Lage im Block; Tun: Bereiche 2 + 2 + 1 voll breit, Punkte und Absatz x 315–1033 (h 1672 → 1442) | 11 / 11 / 11 / 0 / 10 / 11 |
| /standorte/wetzlar (alle Ortsseiten) | Lage: Vorspann und Einzugsband im Block x 315–1125 (h 829 wie vorher); Tun: Bereiche 2 × 2 voll breit mit Vignetten, Pfeile oben (h 1089 → 768) | 9 / 8 / 10 / 0 / 9 / 2 |
| /leistungen | Lage: Einleitung und Absätze im Block; Tun-Einleitung an der Blockkante | 11 / 11 / 2 / 0 / 1 / 1 |
| /bad | Lage linksbündig im Block (EV-13), Wege 2 + 2 + 1 voll breit (h 1167 → 890); Tun: Einleitung, Punkte, Absatz x 315–1033 (h 2414 → 2383) | 11 / 11 / 11 / 0 / 10 / 1 |
| /blog | Lage (nach der Liste) im Block | 6 / 6 / 1 / 0 / 0 / 5 |

Unter lg (q844, t768; m390 überall pixelgleich): (1) Listen ab drei Einträgen voll breit statt 605 px (Lage-Wege und Tun-Bereiche
auf /fliesen, /balkon-terrasse, /ueber-uns, /bad, /referenzen und den Ortsseiten); (2) der Vorspann der Lage misst 66ch in seiner
Stufe fs-4 und ist damit breiter als 605 px (t768 bis zur Satzbreite 704 px); (3) die Zeichnung auf /bad/badsanierung breit (EV-10). Alles
gewollt (Plan: Listen voll breit, Vorspann mit `max-w-mass` am selben Element). Nicht mehr unter lg: Einzugsband (wieder 605 px),
Unterschrift (wieder linksbündig). Erstes Bild unberührt (9.5).

### 9.5 Prüfzahlen (Endbau build-5)
- `npm test`: 280 Tests, 280 bestanden, 0 rot, 0 übersprungen (ohne Bau 279 + 1 übersprungen: `stylesheets` braucht `.next`).
- `npx tsc --noEmit`: 0. `npx eslint` über die 9 geänderten Code-Dateien: 0. `werte.mjs --dateien` (9 Dateien, 601 Klassen): 0 Befunde
  (`werte/2026-11-01T09-00-05-974Z.json`).
- `next build`: Exit 0 (`build-5.log`).
- CSS gzip -9 wie `kette.sh`: 25.111 B (4324) → 25.218 B (build-5), **+107 B** (roh 146.367 → 147.194, +827 B); Richtwert Stufe 1
  ≤ 0,5 KB. Mit Begleitdiff ebenso (+0 B).
- `erstesbild.mjs` (11 Ansichten inkl. `/`, q844, m390, d1440, zwei Durchgänge): 66 Fälle, Summe 283 → 283, alle fünf 52 → 52, Fall
  für Fall gleich (`erstesbild/{vor,nach}`). m360 mit 200 % Systemschrift: Kopie mit `html{font-size:200%}` per Init-Skript (andere
  Einspritzung als die erste Kopie, darum beide Seiten neu gemessen): 22 Fälle, Summe 91 → 91, alle fünf 11 → 11, Fall für Fall gleich
  (`erstesbild/{vor-200,nach-200}`; die erste Messung `vor-200-alt`).
- `bildsatz.mjs --png`: nachher 767 Aufnahmen auf d1440, d1920, t1024, m390, q844, t768 (`bilder/nach`), vorher ergänzt um q844 und t768
  (252 Aufnahmen, `bilder/vor/{q844,t768}`, `bildsatz-q844-t768.json`); 0 Fehler, 0 nicht 200, Überlauf 0, Konsole 0; Überlappung je
  Gerät gleich wie vorher (d1440, d1920, t1024, m390 je 11, q844 19, t768 30; nur `leitachse`).
- Bewegung: Die Nacharbeit ändert keine Bewegung, kein `data-motion` und keine Kopf-Pause außer der Lage auf /bad (jetzt linksbündig,
  darum ohne Pause „ganz“, wie alle linksbündigen Lagen); keine neuen Aufnahmen mit Bewegung, die Bilder mit Bewegung aus Abschnitt 7
  (`probe/bs-marke-*.png`) gelten weiter für die Unterschrift (ab lg mittig mit Pause wie dort).
- Keine Lighthouse- und keine Zeitmessung (E-076). Hilfsskripte `_werkstatt/werkzeuge/_sf2a1-*.mjs` wieder gelöscht, Repository sauber;
  in der Arbeitskopie `.next` gelöscht, `node_modules` wieder als Verweis.

### 9.6 Offene Fragen (ersetzen Abschnitt 7)
1. **Begleitdiff (EV-15):** `legenden-vorschlag.diff` mit Stufe 1 einspielen (empfohlen) oder SF2-A2 zuweisen?
2. **/bad, Szene „schichten“ (B2):** Szenenliste im Rahmen des Moments mittig (heute) oder im Block auf der Achse wie die Punkte
   (Moment-Datei, Stufe 2)? Empfehlung: lassen; die Liste gehört zur mittigen Zeichnung im selben Rahmen, außerhalb des Rahmens stehen
   Einleitung, Punkte und Absatz jetzt auf einer Kante.
3. **Lesemaß (B6):** 66 ch der eigenen Stufe (heute, ≈ 72 bis 77 Zeichen je Zeile in fs-3 bei d1440) oder ein engeres Maß für fs-3/fs-4
   (z. B. 60 ch, ≈ 68 Zeichen)? Ein neues Maß wäre ein Token in globals.css und träfe Einleitung, Absatz, Punkte und Vorspann gleich.
4. EV-6, EV-3 wie in Abschnitt 7; neu EV-13 (120 Zeichen) und EV-14 (`zusatzBreit` für M2-B7) bestätigen.

### 9.7 Schnittstelle für Stufe 2 (Ergänzung zu Abschnitt 4)
- `Lage zusatzBreit?: boolean` (M2-B7, SF2-B: in OrtsSeite.tsx setzen, Lage.tsx bleibt).
- `satzBlock('achse')`: Zeilen an der Fuge ab lg im Lesemaß fs-3; für M2-A2 (FormularSchritt) heißt das: Kontaktzeile und Formular im
  Block über `satzMass('achse')` (Breite des Blocks), Zeilen an der Fuge über `satzBlock('achse')` (Breite des Textes).
- M2-A7 (Punktliste ohne Nummern) erbt die Breite unverändert.
- M2-A10 (Gefälle-Endzustand) setzt auf GefaelleDusche.tsx auf; mit Begleitdiff ändert sich dort nur die Legende (zwei Zeilen).

### 9.8 Textvorschläge
Keine. Wortlaut unverändert; kein neuer Mikrotext.
