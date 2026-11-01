# UM-E4-SICHT-FIX-2 · Bauteil SF2-A2 (Stufe 2, Vorlagen-Rest) · M2-A2 → M2-A3 → M2-A8 → M2-A4 → M2-A5 → M2-A7 → M2-A9 → M2-A10 → Szenenliste

Arbeitskopie `$SCRATCH/sfix2/a2/baum` (Abzug HEAD 2a93b91f nach Stufe 1), Vergleich `$SCRATCH/sfix2/a2/vor` (unverändert). Server: 4520 =
baum (Endbau `build-final3`, nach der Nacharbeit `build-nach3`, nach allen Messungen gestoppt, `.next` und die echte Kopie von `node_modules` gelöscht, Verweis
wiederhergestellt), 4325 = Vorher-Stand (nicht angefasst), 4324 und 4326 nicht angefasst.

- **Diff:** `$SCRATCH/sfix2/a2/UM-E4-SICHT-FIX-2-a2.diff` (`diff -ruN vor baum` ohne node_modules, node_modules_echt, .next, bilder,
  next-env.d.ts, tsconfig.tsbuildinfo; nach der Nacharbeit 21 Dateien, 914 Zeilen). `patch -p1 --dry-run` gegen das Repository (HEAD
  8f4ad1a9): alle 21 Dateien sauber; gegen die Arbeitskopien von SF2-B und SF2-C ebenso (nur Versatz und eine Unschärfe, kein
  Fehlschlag). OrtsSeite.tsx und WissensSeite.tsx sind nicht mehr im Diff (Nacharbeit N-8): Die eine Zeile für die Ortsseiten steht
  als Begleitdiff für den Orchestrator in `$SCRATCH/sfix2/a2/UM-E4-SICHT-FIX-2-a2.begleit-ortsseite.diff`.
- **Nacharbeit:** Abschnitt 7 (Befund für Befund); die Abschnitte 1, 2, 5 und 6 sind an den betroffenen Stellen nachgezogen.
- **Bilder** (alle `bildsatz.mjs --png`, d1440, d1920, m390, zwölf Hauptansichten):
  - `$SCRATCH/sfix2/a2/bilder/vor` (4325, 407 Aufnahmen) und `$SCRATCH/sfix2/a2/bilder/nach` (4520 Endbau, 407 Aufnahmen), ruhig
    (reduziert).
  - `$SCRATCH/sfix2/a2/bilder/bewegung-vor` und `…/bewegung-nach` (`--ersatzpfad`, mit Bewegung im Endzustand; `/`, `/bad`,
    `/bad/badsanierung`, `/bad/barrierefreies-bad`, d1440 und m390).
  - **Probe M2-A3** (die Daten `versprechen.offen` setzen SF2-B und SF2-C, siehe EV-1): `$SCRATCH/sfix2/a2/bilder/probe-offen`
    (Endcode plus Probedaten auf sechs Ansichten, danach zurückgenommen). `…/bilder/probe1` ist ein früherer Probestand aller zwölf
    Ansichten (Laserweg noch mit Lücke, EV-3), nur zur Nachvollziehbarkeit.
  - Elementaufnahmen und Maße: `$SCRATCH/sfix2/a2/blick/` (`nach1`–`nach3`, `s200` = m390 mit 200 % Schrift, `t1024`, `mass`, `align`),
    Bögen vorher/nachher: `$SCRATCH/sfix2/a2/boegen/`. Pixelvergleich: `$SCRATCH/sfix2/a2/pixel-vergleich.txt`, mit Bewegung
    `…/pixel-bewegung.txt`.

## 1 Maßnahmen und Stand

### M2-A2 Formularblock auf der Kopfachse, Kontaktzeile zwei Spalten, Projektraster geschlossen · umgesetzt
- `Schritt.tsx` (FormularSchritt): `satz="achse"` statt `links`, Formular und Kontaktzeile über `satzMass('achse')`. Der Formularkasten
  steht mittig über zwei Drittel, die lange Einleitung im selben Block (Lesemaß am eigenen Element). Gemessen (Endbau): d1440 Block
  x 315–1125 (811), d1920 x 504–1416 (912), t1024 x 203–821 (619); vorher x 112–717 bzw. 276–957. Kontaktzeile ab md in zwei Spalten
  über dieselbe Breite (Lieber anrufen | Lieber schreiben). Der Zusatz steht seit der Nacharbeit (N-6, EV-12) als ein Block
  (Öffnungszeiten auf `/`, Nachbarorte auf den Ortsseiten) ab md rechts unter „Lieber schreiben“, aus zwei Blöcken (/leistungen:
  Öffnungszeiten und „Sie möchten mehr erzählen?“) darunter über beide Spalten wie bisher. Unter lg unverändert (605 px mittig, m390 pixelgleich). Formularinseln, Felder,
  Texte, Empfänger und `/api/anfrage` unberührt (G8).
- `Schritt1.jsx` (nur Raster): der leere Füll-`span` entfällt; der letzte Knopf trägt `@md:col-span-2` (bei ungerader Zahl). Mit fünf
  Feldern schließt das sowohl das Zweierraster (2 + 2 + 1) als auch das Dreierraster (3 + 2). Knöpfe, Texte, Auswahl, `aria-pressed`,
  Fokus und Daten gleich. Dazu EV-5 (Pfeil im Weiter-Knopf mit Standardklasse statt Beliebigwert, Abweichung unter 1 px).
- Wirkung: `/` (Termin-Band d1440/d1920), `/leistungen`, alle Ortsseiten, `/kontakt` (Raster: „Untergrund und Abdichtung“ über zwei
  Spalten, einzeilig statt zweizeilig, der Formularkasten wird rund 20 px niedriger; Bogen `boegen/kontakt-d1440.png`). Auf /leistungen
  steht der Funnel im 811-px-Block bei d1440 und d1920 zweispaltig (vorher d1920 dreispaltig mit leerer sechster Zelle).

### M2-A3 Qualitätsversprechen: drei Punkte offen als Fugenreihe · umgesetzt (Darstellung; Daten bei SF2-B/SF2-C, EV-1)
- `Versprechen.tsx`: neue Prop `offen?: number[]` (aus `VersprechenInhalt.offen`, Typ aus Stufe 1 unverändert). Mit Auswahl:
  - **Fugenreihe** ab lg in drei Spalten über die volle Breite (d1440 x 112–1328), ohne Kasten und Fläche, senkrechte 1-px-Fugen je
    Zelle links (außer der ersten), Fuge oben und unten; darunter Fugenzeilen. Titel als H3 in fs-4 halbfett, Satz in fs-3, ohne
    Nummer. Zellen `lg:py-8`, Innenabstand zur Fuge 48 px (`lg:pl-12`/`lg:pr-12`).
  - **Aufklapper „Weitere {n} Punkte zeigen“** (Mikrotext, Zahl aus den Daten) direkt darunter über die volle Breite; die Fuge unter der
    Reihe ist seine obere Kante. Darin die übrigen Punkte in Quellfolge, ohne Mono-Nummern, ab lg in zwei Spalten nach `satzSpalten`
    (ein ungerader letzter über beide), je mit Fuge unten.
  - Eine Hülle mit genau einem `data-kopf-pause="ganz"` für Reihe und Aufklapper; die Pause an der Liste entfällt in dieser Form.
  - `marken()` läuft in der Anzeigefolge (offene zuerst, in der Folge der Auswahl), jedes Fachwort wird beim ersten sichtbaren
    Vorkommen erklärt. PUNKTE, ANPASSUNG, GARANTIE-Prüfung und Wortlaut unverändert. Eine ungültige Auswahl (außerhalb 1–8, doppelt,
    mehr als drei; Nacharbeit N-9) bricht den Bau ab, statt still Punkte wegzulassen oder eine Reihe ohne Form zu bauen.
  - Ohne `offen` wie heute (Aufklapper „Alle 8 Punkte zeigen“, nummerierte Liste, Pause an der Liste); im Endbau ist das auf allen
    Seiten so, weil die Daten bei SF2-B/SF2-C liegen.
- `ErzaehlSeite.tsx`: eine Zeile, `offen={inhalt.versprechen.offen}` weiterreichen. OrtsSeite.tsx und WissensSeite.tsx seit der
  Nacharbeit nicht mehr in diesem Diff (EV-1 neu gefasst): Die Ortsseiten brauchen die Zeile aus dem Begleitdiff, die Wissensseiten
  reicht SF2-C selbst durch (`{...inhalt.versprechen}`).
- **Wirkung erst nach dem Einspielen der Daten** (Nacharbeit N-1): Im Endbau dieses Bauteils steht auf allen sechs Ansichten weiter
  „Alle 8 Punkte zeigen“; die sechs Befunde des Plans sind damit **nicht behoben**, bis die Daten von SF2-B und SF2-C und (für
  /standorte/wetzlar) der Begleitdiff eingespielt sind. Die Probe unten zeigt nur die Form.
- Probe (Daten wie Plan: Standard [2, 5, 7] auf /bad/badsanierung, /balkon-terrasse, /standorte/wetzlar, /blog; /ueber-uns [4, 5, 7];
  /fliesen [3, 5, 7]): Bilder `bilder/probe-offen`, Bogen `boegen/bs-d1440-versprechen-probe.png`, Elementbilder
  `blick/nach1/bs-versprechen-*`, `blick/nach2/*-versprechen-d1440.png`, t1024 `blick/t1024/` (mittlere Spalte 212 px Text, lesbar),
  m390 mit 200 % `blick/s200/`. `lesbarkeit.mjs` (öffnet `details`) vorher und mit Probedaten auf allen zwölf Ansichten Wert für Wert
  gleich, „Glossar offen“ überall 0 (`lesbarkeit/{vor,probe}`).
- Prüfung der Auswahl am sichtbaren Text (Regel: nichts, was die Seite sichtbar schon sagt; Punkt 8 nur auf /ueber-uns; Punkt 3 nie
  auf /balkon-terrasse):
  | Ansicht | Auswahl | sichtbar schon gesagt (vor dem Versprechen) | Ergebnis |
  |---|---|---|---|
  | /bad/badsanierung | 2, 5, 7 | 1 (Einstieg, Ablauf 02 „kostenfrei“), 3 (Tun 03 DIN 18534), 4 (H1 „zum Festpreis“, Ablauf 03), 6 (Ablauf 04 Staubschutz) | bestätigt; 2 ergänzt die Erwähnung „Großformate“ um Nivelliersystem und Überzähne |
  | /balkon-terrasse | 2, 5, 7 | 1 und 4 (Einstieg, Schritt), 3 gesperrt | bestätigt; 7 (Kleberklasse) passt zum Vergleich „Kleber- bzw. Mörtelbett“; 6 wäre die Alternative zu 2 |
  | /standorte/wetzlar | 2, 5, 7 | 1 (Ablauf 01), 3 (Tun), 4 (Ablauf 02) | bestätigt |
  | /blog | 2, 5, 7 | 1 (Ablauf 01), 3 (Beleg DIN 18534) | bestätigt (4 und 6 wären auch frei) |
  | /fliesen | 3, 5, 7 | 1, 2 (Lage „Großformate“), 4, 6 (Raumliste Staubschutz) | bestätigt |
  | /ueber-uns | 4, 5, 7 | **alle außer 7**: 1 (Einstieg, Ablauf 01), 2 (Punkte 02, Zeitleiste 2014, Werte), 3 (Punkte, Zeitleiste, Werte), 4 und 5 (Werte „Termintreue und fester Preis: Abgestimmte Zeitpläne und klare Kosten“), 6 (Werte, Ablauf 03), 8 (Lage „Deniz Tezgel, der Inhaber, kommt selbst“) | Regel auf dieser Seite nicht erfüllbar; Plan [4, 5, 7] bleibt die beste Wahl (4 und 5 fügen dem Kurzwert Kostenaufstellung nach Quadratmetern und abgestimmten Baustart hinzu); Frage 1 |

### M2-A8 Glasfläche schlanker · umgesetzt
- `Glasbild.tsx`: Name in fs-3 statt fs-4. `bewegung.css` Block glasbild: Auslauf in `.glasbild-text` 4 statt 12 Einheiten, der
  64-%-Stopp wandert mit (jede Zeile weiter auf mindestens 64 % Tinte). Der Zweig `data-verlauf` ohne Maus hatte 8 Einheiten; er
  hätte jetzt dieselben Werte wie die Grundregel und entfällt (EV-6). Mit Maus und Link erscheint die Glasfläche beim Darüberfahren
  wie bisher und behält seit der Nacharbeit (N-5) auch den Auslauf von 12 Einheiten (Eigenschaft `--glas-auslauf`, im Block
  `@media (hover: hover)` für `a.glasbild` auf 12 gesetzt); nur der Name ist dort wie überall eine Stufe kleiner (Plan Nr. 2).
  Erzwungene Farben unverändert.
- Wirkung: alle Fotos ohne Link (Beleg-Reihen, Zweierbild) und alle Fotos ohne Maus; auf `/` nur m390 (Galerie, Ausschnitt 04,
  Verlaufsrand 7 px), d1440/d1920 dort ohne sichtbare Änderung (Fotos mit Link, Fläche nur beim Darüberfahren). Galerienamen jetzt
  einzeilig (z. B. „Badewanne mit gestreifter Verkleidung“), Bogen `boegen/bs-d1440-b.png`.

### M2-A4 Zweierbild als Verband an einer echten Fuge · umgesetzt, in der Nacharbeit ungleich gesetzt (N-3, EV-11)
- **Stand nach der Nacharbeit:** `Fotos.tsx` (Glaspaar): Fuge `gap-6` auf allen Breiten statt Haarlinie, ab md das erste Foto zwei
  Drittel so groß wie das zweite (`md:glas-hoch-zwei-drittel` neben `glas-hoch`), beide unten bündig (`md:items-end`); unter md beide
  gleich breit untereinander. `globals.css`: Utility `glas-hoch-zwei-drittel` (zwei Drittel von 70svh, Untergrenze 24 rem) statt
  `glas-hoch-paar`; `md:mt-24` entfällt. d1440: 336 × 420 bei x 288 neben 504 × 630 bei x 648, Kopf des ersten 210 px tiefer
  (ein Drittel), Kopf bis Unterkante /bad/barrierefreies-bad 801 px (Soll 836), /bad/badsanierung 704 px. Zahlen darunter: erster Bau.
- Erster Bau (überholt): Fuge `gap-6`, ab md das zweite Foto `md:mt-24` tiefer, beide `glas-hoch-paar` (60svh, Untergrenze 30 rem).
- Gemessen d1440: 432 × 540 px bei x 276 und 732 (vorher 504 × 630 bei 216 und 720), zweites 96 px tiefer. Kopf und Paar in einer
  Bildschirmhöhe: /bad/badsanierung Unterkopf bis Paarunterkante 709 px, /bad/barrierefreies-bad H2 bis Unterkante 807 px (sichtbar
  rund 835 px unter dem Kopf). m390: 358 px breit untereinander mit 24 px Fuge (vorher 2 px). q844: zweispaltig wie vorher (ab md),
  378 × 473 px, mit Versatz; Kopf und Paar passen dort wie vorher nicht in eine Höhe (Untergrenze 30 rem, SF-B2). Keine Bewegung.

### M2-A5 Ablauf mit sechs Schritten als ein Laserweg · umgesetzt, mit EV-3
- `Ablauf.tsx`: Bei zwei Läufen ersetzt ab lg ein Zwischenraum `h-32` den `gap-32`. Darin drei Striche in `border-laser` 2 px
  (aria-hidden): Lot am rechten Rand bis zur Mitte, Waagrechte über die ganze Breite, Lot links bis zum Fugenkreuz von 04. Das rechte
  Lot beginnt am Ende der Stufenlinie von 03 (Strich in deren Zelle, EV-3). Mobil unverändert (das Lot lief schon durch, `weiter`).
  Keine Bewegung, kein Registereintrag, reduziert und ruhig gleich.
- Wirkung: /bad/badsanierung (einzige Hauptansicht mit sechs Schritten); Bilder `blick/nach2/bs-ablauf-f2-{d1440,d1920,t1024}.png`,
  Bogen `boegen/bs-d1440-ablauf.png`. Rechter Rand d1440 x 1328, t1024 x 976 (kein Überlauf, Überlauf-Prüfung 0).

### M2-A7 Anriss an der ersten Stimme, Punktliste ohne zweite Nummernfolge · umgesetzt
- `Stimmen.tsx` MARKIERUNG: `ute-t` „unser Bad (barrierefrei) gefliest“, `hasan-oe` „die Fliesen auf dem Balkon neu verlegt“ (beide
  wörtlich aus REVIEWS, Wortlaut unverändert, statische Unterstreichung in Laser wie `c-wolf`). Wirkt überall, wo die Stimmen groß
  stehen (/bad/barrierefreies-bad, /balkon-terrasse, Ortsseiten, /bad, /ueber-uns). Bild `blick/nach2/bf-stimmen-d1440.png`.
- `Tun.tsx` Punktliste ohne Mono-Nummern (Fugenzeilen, das `ol` bleibt), kein Fugenkreuz je Zeile. Wirkt in „Was wir tun“ und in den
  Wissensblöcken (`Wissen.tsx` nutzt dieselbe Liste; nur der Kommentar dort nachgezogen). Der Satz läuft über die frühere
  Nummernspalte (56 px breiter), Abschnitte werden einige Zeilen kürzer (/ueber-uns Tun 1442 → 1411 px).

### M2-A9 Abstandsstufe je Abschnitt · umgesetzt, mit EV-4
- `Abschnitt.tsx`: Prop `dichte?: 'dicht' | 'weit'` (nur Erzählabschnitte): `dicht` py-12 lg:py-16, `weit` py-24 lg:py-32, ohne Angabe
  py-16 lg:py-24. Arbeitsabschnitte unverändert py-12 lg:py-16.
- `Lage.tsx`: `dicht` außer der reinen Auswahl (`/` unverändert); auf Fliese bleibt `lg:pt-16`. `Tun.tsx`: `weit` mit großem Moment oder
  Zeichnung (/bad, /bad/badsanierung, /bad/barrierefreies-bad, /balkon-terrasse, /leistungen). `Versprechen.tsx`: `dicht` statt
  derselben Stufen als Klassen (keine Änderung). Fläche und Kantenkreuze unverändert.
- Wirkung je Seite: Lage ab lg 32 px niedriger (unten), mobil 32 px; Tun mit Moment ab lg 64 px höher. Leitfaden-Bahn: Abstand der Marke
  zum Kantenkreuz folgt dem Innenabstand (Lage auf Kalk nur /blog, dort 64 px statt 96 px; Bild `blick/nach2/bl-lage-d1440.png`).

### M2-A10 Gefälle-Zeichnung: Tropfen liegt am Ende im Ablauf · umgesetzt (E-113 Nr. 9)
- `bewegung.css` Block gefaelle-dusche: Grundregel `.gefaelle-tropfen { translate: 159px 29.5px }` (Ersatzpfad: ohne JavaScript,
  reduziert, Notaus, Druck, erzwungene Farben), Vorzustand im Bewegungszweig `translate: 0 0`, Keyframe 100 % mit `opacity: 1`,
  Zurück/Vor (`html.k-verlauf`) `translate` wie 100 % und `opacity: 1`. Nur translate und opacity.
- `test/gefaelle-dusche.test.mjs` Zeile 55: Erwartung `opacity: 1` (geändert, nicht gelockert); dazu zwei strengere Erwartungen
  (Ersatzpfad und Zurück/Vor zeigen den Tropfen an derselben Stelle, EV-8). Register-Zeile „reduziert“ in `register.ts` und
  `register.json` gleichlautend: „die Pfeile stehen, der Tropfen liegt im Ablauf“ (Bewegung 13 grün). Nachgezogen:
  `_werkstatt/register/gefaelle-dusche.json` (reduziert, ersatzpfad), KERN K-007 Zeile gefaelle-dusche, Kommentar in
  `GefaelleDusche.tsx`.
- Belege: `bewegung.mjs --modus einzelbilder` (0/25/50/75/100 %): Tropfen oben, läuft das Gefälle hinab, liegt bei 100 % unter dem Rost
  in der Rinne (`bewegung/einzel/folge.png`); reduziert und ruhig: `blick/nach1/bf-gefaelle-d1440.png`, mit Bewegung im Endzustand
  `blick/nach2/bf-gefaelle-bew-d1440.png`.

### Szenenliste „schichten“ auf /bad · angeglichen, in der Nacharbeit auf den ganzen Block gesetzt (N-7)
- **Stand nach der Nacharbeit:** Die Liste füllt ab lg den Block auf der Achse (`satzMass('achse')`): d1440 x 315–1124, d1920
  x 505–1416, t1024 x 203–820. Sie beginnt an der Kante der Punkte darunter und steht zugleich mittig unter der Zeichnung (Mitte
  720 bzw. 960 und 512 wie die Zeichnung, eine Achse in der Karte). Der Satz jeder Schicht trägt `max-w-mass` (d1440 713 px, d1920
  803 px, im Lesemaß fs-3). Listenpunkte gleich hoch wie vorher (d1440 202/203/167/167/167 px, alle Breiten gleich), Zeitstrahlen
  und Ablauf darum unverändert. Zahlen darunter: erster Bau.
- Erster Bau (überholt): `Schichten.tsx`: Die Liste steht im `Satzblock` `achse` mit `satzBlock('achse')` (ab lg Lesemaß fs-3 an der Blockkante): d1440
  x 315–1034 (vorher mittig 605 px ab x 417), d1920 x 505–1313, t1024 x 203–820; die Punkte darunter stehen auf derselben Kante.
  Unter lg unverändert (mittig im Lesemaß). Kein Wort geändert; Reihenfolge, Zeitstrahlen (`view-timeline` an den Listenpunkten,
  `timeline-scope` an der Figur) und Auslauf unverändert, `bewegung.css` unberührt. Zeichnung und Satz darüber bleiben mittig; der
  Innenabstand `px-4` der Zeilen bleibt (Text und Muster beginnen 16 px innerhalb der Fuge). Bild `blick/nach1/bad-schichten-f-d1440.png`.

## 2 Entscheidungsvermerke

**EV-1 · `offen` weiterreichen (neu gefasst in der Nacharbeit, N-8)**
- Ziel: M2-A3 wirkt auf allen sechs Ansichten, sobald die Daten (`versprechen.offen`, gesetzt von SF2-B und SF2-C) eingespielt sind.
- Umsetzung: Im Diff reicht nur `ErzaehlSeite.tsx` (Teil SF2-A) `offen` weiter (/bad/badsanierung, /balkon-terrasse, /ueber-uns).
  Die Zeilen in OrtsSeite.tsx (SF2-B) und WissensSeite.tsx (SF2-C) sind aus dem Diff genommen, weil sie die Grenze der Bauteile
  verletzten und WissensSeite.tsx mit SF2-C kollidierte (Hunk FAILED). SF2-C reicht den ganzen Inhalt selbst durch
  (`<Versprechen vorher={vorher} {...inhalt.versprechen} />`), /fliesen und /blog brauchen also nichts weiter. SF2-B reicht `offen`
  nicht durch; für /standorte/wetzlar und alle Ortsseiten liegt die eine Zeile als Begleitdiff bereit:
  `$SCRATCH/sfix2/a2/UM-E4-SICHT-FIX-2-a2.begleit-ortsseite.diff` (`patch -p1 --dry-run`: Repository sauber, Arbeitskopie SF2-B
  „Hunk #1 succeeded at 53 (offset 2 lines)“). Der Orchestrator spielt ihn nach SF2-B ein oder legt die Durchreichung wie SF2-C an.
- Alternativen: Zeilen im Diff lassen (Grenze verletzt, Konflikt mit SF2-C); Versprechen liest den Inhalt selbst (bräuchte ebenso
  eine Änderung an jedem Aufrufer).
- Wirkung: ohne Daten keine. Risiko: Ohne Begleitdiff bleibt M2-A3 auf den Ortsseiten wirkungslos. Rückweg: Zeile in ErzaehlSeite
  zurück.

**EV-2 · Dateien außerhalb der Aufzählung im Auftrag** — Abschnitt.tsx (M2-A9 Prop), Lage.tsx und Tun.tsx (M2-A9, M2-A7), ErzaehlSeite.tsx
und Wissen.tsx (nur Kommentar) stehen in der Spalte `dateien` der Maßnahmen bzw. in `teile[SF2-A].dateien` des Endplans und gehören
keinem parallelen Bauteil. Beleg.tsx und GefaelleBalkon.tsx (in der Aufzählung) sind unverändert: Das Zweierbild hängt allein an
Fotos.tsx, der Balkon zeigt den Endzustand mit Tropfen schon.

**EV-3 · Laserweg: rechtes Lot ab dem Ende der Stufenlinie von 03 statt ab der Unterkante**
- Ziel: „ein durchgehender Laserweg“ (Titel und Befund „Laserlinie reißt ab“). Der Plan erlaubt die Verlängerung, wenn sich das Lot im
  Bildsatz als Lücke liest.
- Befund im Probebild (`blick/nach1/bs-ablauf-f-d1440.png`): Zwischen dem Ende der Linie von 03 (y 327) und dem Lot (ab y 583) standen
  256 px Leere; das Lot las sich als Stummel in der Fläche, der Weg riss weiter ab.
- Umsetzung: ein 2-px-Strich am rechten Rand der Zelle von 03 von ihrer Linie bis zur Unterkante (Zellen einer Reihe sind gleich hoch),
  er geht nahtlos in das Lot des Zwischenraums über. Abstand zum Text von 03 rund 70 px (pr-12 plus Flatterrand).
- Alternativen: Lot erst unter dem Text (Plan, Lücke sichtbar); Lot entfällt (zwei getrennte Treppen wie vorher).
- Risiko: Stufe 03 trägt Linie oben und rechts, liest sich am Desktop wie ein offener Rahmen um den Schritt; Rot bleibt Schrittfolge
  (K-003 Nr. 5). Rückweg: die Zeile `weiter && letzter …` in `Schritte` entfernen.

**EV-4 · Lage `dicht` auch, wo sie nicht direkt nach dem Einstieg steht (/blog)**
- Ziel: Plan „dicht bekommt die Lage nach dem Einstieg“. Die Lage kennt ihre Stelle nicht; auf /blog steht sie nach der Artikelliste
  (`wissenVorLage`, auf Kalk).
- Alternativen: Prop an Lage, die WissensSeite (SF2-C) im getauschten Fall setzt (zweite Änderung in fremder Datei); Erkennung über die
  Inhaltsdaten (unzuverlässig).
- Wirkung: /blog Lage 64 px statt 96 px Innenabstand ab lg (Seite 64 px kürzer). Die Lage ist auf jeder Seite ein kurzer Rahmen; dicht
  passt dort ebenso.
- Risiko: gering. Rückweg: `dichte={nurAuswahl ? undefined : 'dicht'}` an eine Angabe der WissensSeite koppeln.

**EV-5 · `Schritt1.jsx`: Pfeil im Weiter-Knopf `align-text-bottom` statt `align-[-0.2em]`**
- Ziel: `werte.mjs` 0 über die geänderten Dateien. Der Beliebigwert stand seit E4-W1-FORMULARE in der Datei; weil M2-A2 sie berührt,
  zählte ihn die Prüfung des Orchestrators (`werte --basis …` prüft ganze geänderte Dateien) neu als Befund.
- Alternativen: lassen (werte 1 Befund im Bauteil); Zeilenausnahme in `werte-regeln.json` (Lockerung, G7, verworfen).
- Wirkung: geprüft mit Stilregel im Browser, Weiter-Knopf auf /kontakt bei d1440, t1024 und m390 im Bild gleich, gemessen aber nicht
  pixelgleich (Prüfung, Nacharbeit N-10): Pfeil um Bruchteile eines Pixels anders, bei 200 % Schrift am Desktop Knopf rund 0,8 px
  niedriger, m390 gleich; Abweichung also unter 1 px (`blick/align/`). Keine
  neue Klasse im Stylesheet (`align-text-bottom` gibt es schon). Außerhalb von „nur Raster“, aber ohne Wirkung auf Verhalten, Felder
  und Wortlaut (G8). Schritt2.jsx trägt denselben Wert weiter (nicht meine Datei).
- Rückweg: Klasse zurücktauschen.

**EV-6 · Glasfläche: eigene Regel im Zweig `data-verlauf` entfällt** — Plan: dort 8 → 4 Einheiten. Mit 4 Einheiten wären Abstand und Verlauf
gleich der Grundregel; die Regel wäre doppelt. Sie entfällt (Kommentar bleibt), die Container-Regeln für schmale Kacheln bleiben und
gewinnen weiter (höhere Spezifität). Wirkung wie geplant, Stylesheet kleiner. Rückweg: Regel mit 4 Einheiten zurück.

**EV-7 · Versprechen: Einzelheiten der Form**
- Die Aufklappzeile steht über die volle Breite ohne eigene obere Linie (die Fuge unter der Reihe ist ihre Kante, wie „Mehr erfahren“
  nach offenen Punkten); eine schmale mittige Zeile unter der breiten Reihe ergäbe zwei Linien verschiedener Breite.
- Die übrigen Punkte stehen in derselben Stufe wie die Reihe (Titel fs-4, Satz fs-3; der Plan nennt für sie keine Stufe) und ab lg in
  zwei Spalten nach `satzSpalten` (K-003 „Fläche“: Listen ab vier Einträgen voll breit in zwei Spalten, ungerader letzter über beide).
- Reihe und Rest als `ul` (Auswahl, keine Folge); die offenen stehen in der Folge der Auswahl. Im Rest steht Punkt 8 („Inhaber“)
  weiter nur im geschlossenen Aufklapper (Plan: kein „Inhaber“ offen außerhalb /ueber-uns).
- Ab lg drei Spalten auch bei t1024: mittlere Spalte 212 px Text, Titel dreizeilig, lesbar (`blick/t1024/bs-versprechen-t1024.png`).
  Rückweg für eine spätere Schwelle: `lg:grid-cols-3` → `xl:grid-cols-3`.

**EV-8 · Gefälle-Test um zwei Erwartungen ergänzt** — Neben der geänderten Zeile 55 prüft der Test jetzt, dass Grundregel (Ersatzpfad) und
Zurück/Vor den Tropfen an derselben Stelle wie 100 % zeigen. Strenger, nicht lockerer (G7). Rückweg: die zwei `assert` entfernen.

**EV-9 · Projektraster: eine Spanne für beide Raster** — `@md:col-span-2` am letzten Knopf bei ungerader Zahl. Bei fünf Feldern schließt sie
auch das Dreierraster. Eine andere Zahl (etwa 7 oder 9) bräuchte eine eigene `@3xl`-Regel; die Daten (PROJECT_TYPES, G8) haben fünf.
Kommentar in der Datei. Rückweg: Füll-span zurück.

**EV-10 · KERN** — K-003 „Fläche“: der Hinweis „bis M2-A2 der Formularblock im Schritt“ ist ersetzt durch „steht seit M2-A2 auf der Achse“;
K-003 „Abläufe“: ein Satz zum Laserweg (M2-A5); K-007 Zeile gefaelle-dusche, Spalte „Reduziert“: „Tropfen im Ablauf“ (M2-A10). Nur
diese drei Stellen.

**EV-11 · Zweierbild ungleich statt Versatz um eine Stufe 24 (Nacharbeit N-3)**
- Ziel: Befund 2b auf /bad/barrierefreies-bad („zwei Fotoabschnitte in Folge gleich gebaut“) ganz beheben. Mit `md:mt-24` und 60svh
  stand das Paar fast so da wie die zwei gleich großen Hochformate der Galerie direkt davor und war kleiner als sie.
- Umsetzung: ab md das erste Foto zwei Drittel so groß wie das zweite, beide unten bündig. Der Versatz der Köpfe ist damit ein Drittel
  der Fotohöhe (d1440 210 px), ohne Beliebigwert und ohne das Paar zu verlängern (Plan: „ein Drittel ginge nur über einen
  Beliebigwert und verlängerte das Paar um rund 210 px“). Das größere Foto hat wieder glas-hoch (70svh, so groß wie die Galerie), das
  Paar ist 630 statt 636 px hoch, Kopf und Paar passen weiter in eine Bildschirmhöhe (801 px, Soll 836). Das kleinere ist das erste:
  der Weg vom Bau zum größeren Bild, und der kürzere Name bleibt auf der schmaleren Kachel zweizeilig. Untergrenze 24 rem Höhe, damit
  die Kachel bei wenig Höhe (q844: 307 × 384) breiter als 16 rem bleibt und der Name nicht unter das Foto rückt.
- Alternativen: Versatz md:mt-48 (Paar 822 px, Kopf und Paar passen nicht mehr in eine Höhe); Galerie davor versetzen (Daten bzw.
  Beleg-Regel für alle Reihen aus zwei Hochformaten, mehr Seiten betroffen); andere Fuge im Paar (zu schwacher Unterschied).
- Wirkung: /bad/barrierefreies-bad und /bad/badsanierung ab md; m390 unverändert gegenüber dem ersten Bau. CSS: eine Utility ersetzt
  eine andere, `md:mt-24` entfällt. Risiko: gering, Fotos ganz im eigenen Seitenverhältnis. Rückweg: Klassen und Utility des ersten
  Baus zurück.

**EV-12 · Kontaktzeile: Zusatz aus einem Block rechts unter „Lieber schreiben“ (Nacharbeit N-6)**
- Ziel: Befund der Prüfung (rechte Spalte auf `/` und den Ortsseiten nur eine Zeile, rechtes unteres Viertel des Blocks leer). Der Plan
  sah den Zusatz „darunter über beide Spalten, wie heute“ vor.
- Umsetzung: `Schritt.tsx` setzt den Zusatz ab md in die zweite Spalte (`md:col-start-2`); neue Prop `zusatzBreit` für einen Zusatz
  aus zwei Blöcken, die `ErzaehlSeite.tsx` setzt, wenn Werkzeuge im Schritt stehen (/leistungen, dort unverändert über beide). Die
  Ortsseiten brauchen keine Änderung in OrtsSeite.tsx. Lesefolge, Texte und Links gleich; unter md unverändert.
- Gemessen d1440: `/` Öffnungszeiten x 736, y 7127 unter WhatsApp (vorher x 315 über beide); /standorte/wetzlar Nachbarorte x 736
  (t768 zweizeilig in der Spalte); /leistungen über beide wie vorher.
- Alternative: Spalten auf Inhaltsbreite (verschiebt die Leere nur nach rechts außen). Risiko: links unten ist jetzt frei, die große
  Rufnummer trägt die linke Spalte. Rückweg: `md:col-start-2` → `md:col-span-2`, Prop entfernen.

**EV-13 · Szenenliste über den ganzen Block auf der Achse (Nacharbeit N-7)** — Die Fugen der Liste laufen ab lg über den
Zwei-Drittel-Block (d1440 811 px), die Punkte darunter im Lesemaß (719 px). Grund: Zeichnung und Liste stehen in derselben Karte;
eine Mitte in der Karte wiegt dort mehr als dieselbe rechte Kante wie die Punkte außerhalb der Karte. Der Satz jeder Schicht bleibt
im Lesemaß (`max-w-mass`, Muster und Innenabstand nehmen rund 96 px der Zeile). Kein Wort und kein Ablauf geändert. Rückweg:
`satzMass('achse')` → `satzBlock('achse')`, `max-w-mass` am Satz entfernen.

## 3 Gewollte Pixeländerungen je Ansicht (ruhig, `pixel-vergleich.txt`; abweichende Ausschnitte d1440 / d1920 / m390)

Erstes Bild (Ausschnitt 00) auf keiner Ansicht verändert.

| Ansicht | Änderung | d1440 | d1920 | m390 |
|---|---|---|---|---|
| `/` | nur Termin-Band: Formularblock und Kontaktzeile auf der Achse (06, 07); m390 nur der Verlaufsrand eines Galeriefotos (04, M2-A8) | 2/11 | 2/10 | 1/12 |
| /bad | Lage dicht, Tun weit (Szene), Szenenliste auf der Achse, Punkte ohne Nummern, Glasnamen, Stimme Hasan Ö. bzw. Ute T. markiert (wo gezeigt) | 10/12 | 10/12 | 10/12 |
| /bad/badsanierung | Lage dicht, Tun weit, Punkte ohne Nummern, Laserweg, Glasnamen, Zweierbild im Verband | 10/12 | 10/12 | 11/12 |
| /bad/barrierefreies-bad | Lage dicht, Tun weit, Punkte ohne Nummern, Tropfen im Ablauf, Zweierbild, Glasnamen, Anriss Ute T. | 8/11 | 8/11 | 11/12 |
| /balkon-terrasse | Lage dicht, Tun weit, Wissensliste ohne Nummern, Glasnamen, Anriss Hasan Ö. | 9/12 | 8/11 | 11/12 |
| /leistungen | Formularblock auf der Achse, Raster geschlossen, Lage dicht, Tun weit, Glasnamen | 10/12 | 8/11 | 10/12 |
| /referenzen | Lage dicht, Punkte ohne Nummern, Glasnamen (Galerie ohne Maus) | 10/12 | 10/12 | 11/12 |
| /ueber-uns | Lage dicht, Punkte ohne Nummern, Glasnamen, Anriss Ute T. | 10/12 | 11/12 | 11/12 |
| /fliesen | Lage dicht, Glasnamen | 8/11 | 8/11 | 11/12 |
| /kontakt | Projektraster geschlossen (Kasten rund 20 px niedriger, alles darunter rückt auf) | 7/8 | 5/7 | 0/9 |
| /standorte/wetzlar | Lage dicht, Formularblock auf der Achse, Punkte ohne Nummern, Glasnamen, Stimmen | 8/11 | 7/10 | 10/12 |
| /blog | Lage dicht (nach der Liste), Glasnamen | 6/12 | 5/11 | 5/12 |

Seitenhöhen (Endbau gegen 4325, Bildsatz; /ueber-uns direkt nachgemessen, der Vorher-Bildsatz hatte dort 12 066 statt 12 831 px erfasst):
`/` ±0 auf allen drei Geräten; /kontakt d1440 −51; /leistungen d1440 −129; /bad/badsanierung d1440 +7; /bad/barrierefreies-bad +38;
/balkon-terrasse +32; /bad +32; /fliesen −32; /standorte/wetzlar −32; /referenzen −62; /ueber-uns −62; /blog −64 (d1440).
Mit Bewegung im Endzustand (`pixel-bewegung.txt`): dieselben Stellen; auf `/` zusätzlich Ausschnitte 02, 03, 08 (d1440) und 09 (m390)
mit Unterschieden von wenigen Pixelzeilen in der Anriss-Treppe und am Karussell: Zeitpunkt laufender Animationen (der Lauf meldet
„rest 1, zeitlimit“), keine Codeänderung dort (AnrissTreppe unberührt).

Mit Probedaten (`bilder/probe-offen`, nicht im Endbau): Versprechen auf sechs Ansichten offen; Abschnitt d1440 rund 743 px statt 355 px.

## 4 Textvorschläge
Keine. Wortlaut aller Inhalte und Stimmen unverändert; neu ist nur der vom Plan vorgesehene Mikrotext „Weitere {n} Punkte zeigen“.

## 5 Offene Fragen
1. **Auswahl `versprechen.offen` (Daten bei SF2-B und SF2-C):** Auf /ueber-uns sagt die Seite vor dem Versprechen jeden Punkt außer 7
   schon sichtbar (Tabelle in 1). Plan [4, 5, 7] annehmen (empfohlen) oder dort nur [7] offen? Die Darstellung kennt höchstens drei
   offene Punkte (Nacharbeit N-9): drei Spalten (drei), zwei Spalten (zwei), eine Zelle über die volle Breite (einer); mehr bricht den
   Bau ab. Geprüft im Bild ist die Form mit drei und mit zwei (Prüfung). Dazu die Empfehlung verschiedener Dreier je Ansicht in 7 (N-2).
2. **EV-1 (neu gefasst):** Begleitdiff für OrtsSeite.tsx nach SF2-B einspielen oder die Durchreichung dort selbst anlegen?
3. **EV-3 Laserweg:** Lot ab dem Ende der Linie von 03 (gebaut) annehmen?
4. **EV-4:** Lage `dicht` auch auf /blog annehmen?

## 6 Prüfzahlen (erster Endbau `build-final2` bzw. `build-final3`, Port 4520; die gültigen Zahlen nach der Nacharbeit stehen in 7)
- `npm test`: 280 Tests, 280 bestanden, 0 rot, 0 übersprungen (mit Bau; Gefälle 1 bis 6 und Bewegung 13 grün).
- `npx tsc --noEmit`: 0. `npx eslint` über die 18 geänderten Code- und Testdateien (17 aus src, dazu der Gefälle-Test): 0.
- `werte.mjs --dateien` (19 Dateien aus src, 1377 Klassenvorkommen, 276 eindeutig; Lauf aus der Arbeitskopie gegen deren globals.css):
  0 Befunde (vor EV-5: 1, der alte Beliebigwert in Schritt1.jsx).
- `next build`: Exit 0 (`build-final3`; gegenüber `build-final2` nur die Spaltenwahl der Reihe für eine oder zwei offene Punkte,
  Stylesheet gleich, 70 Ausschnitte von `/`, /bad/badsanierung, /standorte/wetzlar bei d1440 und m390 pixelgleich zu `bilder/nach`);
  ein Stylesheet je Seite (`/`, /bad/badsanierung, /kontakt, /fliesen je ein `link rel=stylesheet`).
- CSS gzip -9 wie `kette.sh`: 25.218 B (4325) → 25.204 B (4520), **−14 B** (roh 147.194 → 146.810, −384 B). Richtwert SF2-A2 0,9 KB:
  nicht beansprucht. Neu: `glas-hoch-paar`, `h-32`, `top-16`, `md:mt-24`; entfallen: Glasbild-Zweigregel, Füll-span, Nummernspalte.
- `erstesbild.mjs` (zwölf Ansichten, q844, m390, d1440, zwei Durchgänge): 72 Fälle, Summe 308 → 308, alle fünf 56 → 56, Fall für Fall
  gleich. m360 mit 200 % (Kopie mit Stilregel `html{font-size:200%}` nach DOMContentLoaded): 24 Fälle, Summe 54 → 54, Fall für Fall
  gleich (Altbefund: alle fünf 0 → 0). Belege `erstesbild/{vor,nach,vor-200,nach-200}`.
- `bildsatz.mjs --png`: vorher und nachher je 407 Aufnahmen, 0 Fehler, 0 nicht 200, Überlauf 0, Konsole 0, Überlappung je 34 (nur
  `leitachse`, wie vorher). Mit Bewegung je 94 Aufnahmen, Überlauf 0.
- Playwright (`_werkstatt/werkzeuge/tests`, RELAUNCH_BASE 4520): alle `funktion-*` und `bewegungsschalter`, reduziert: 325 bestanden,
  19 übersprungen (Projekt- und Umgebungsbedingungen: nur mobil bzw. nur Desktop, Tracking nur mit GA4-Bau, ein fixme), 0 rot. Mit
  Bewegung (`RELAUNCH_BEWEGUNG=an`) hero-kontakt, express-funnel, schnellanfrage, kontaktwege, projektcheck, bewegungsschalter: 120
  bestanden, 4 übersprungen, 0 rot.
- `axe.mjs --zustaende` (zwölf Ansichten, m390 und d1440, Zustände normal, Menü, Erstbesuch): 72 Läufe, ernst/kritisch 0, Verstöße 0
  (vorher ebenso).
- `lesbarkeit.mjs` (zwölf Ansichten): vorher und mit Probedaten Wert für Wert gleich, GRÜN 10, ROT 2 (Altbefunde Floskel auf `/` und
  /bad/badsanierung).
- `bewegung.mjs`: register auf `/`, /bad/badsanierung, /bad/barrierefreies-bad: unbekannt 0, ohne Register 0; reduziert dort und ruhig
  (Schalter) auf /bad/barrierefreies-bad m390: Bewegungsbefunde 0 (unsichtbar-Liste wie vorher, 12 bzw. 14); einzelbilder
  gefaelle-dusche: fünf Bilder, Endzustand Tropfen im Ablauf.
- Selbst angesehen: d1440, d1920, t1024 (Ablauf, Versprechen), q844 (Zweierbild), m390 und m390 mit 200 % Schrift (Punkte, Versprechen,
  Zweierbild, Projektraster, Formular, Kontaktzeile; `blick/s200/bogen-200.png`): kein Überlauf, alles lesbar.
- Keine Lighthouse- und keine Zeitmessung (E-076). Hilfsskripte `_werkstatt/werkzeuge/_sf2a2-*.mjs` wieder gelöscht; in der Arbeitskopie
  `.next`, die echte Kopie von `node_modules` und `tsconfig.tsbuildinfo` gelöscht, Verweis wiederhergestellt.

## 7 Nacharbeit (Prüfung Welle SF2-A2, zehn Befunde)

Jeder Befund selbst nachgeprüft (Code, Messung im Browser gegen 4325 und den neuen Endbau auf 4520). Behoben: N-3, N-5, N-6, N-7,
N-8, N-9, N-10 (Code bzw. Notiz); in der Notiz berichtigt: N-1, N-2, N-4.

| Nr. | Befund (Schwere) | Nachprüfung | Ergebnis |
|---|---|---|---|
| N-1 | M2-A3 ohne Wirkung im Endbau von SF2-A2 (mittel) | bestätigt: kein `offen` in src/inhalte dieser Kopie, auf allen sechs Ansichten „Alle 8 Punkte zeigen“ | Notiz berichtigt (Abschnitt 1, M2-A3): Wirkung erst nach dem Einspielen der Daten von SF2-B und SF2-C und des Begleitdiffs; bis dahin nicht als behoben verbuchen. Die Daten liegen in den Kopien von SF2-B ([2, 5, 7] viermal) und SF2-C (/ueber-uns [4, 5, 7], /fliesen [3, 5, 7]). Die Dateien gehören nicht zu SF2-A2 |
| N-2 | dieselbe Dreierreihe auf vier Ansichten (mittel) | bestätigt (Daten SF2-B). Am sichtbaren Text vor `#qualitaet` (4325) nachgeprüft: /bad/badsanierung sagt 1, 3, 4, 6 (frei nur 2, 5, 7); /balkon-terrasse 1, 4 (3 gesperrt); /standorte/wetzlar 1, 3, **4** („Angebot mit festem Preis“ in Ablauf 02); /blog 1, 3. Der Vorschlag [2, 4, 7] für /standorte/wetzlar verletzt die Regel | Empfehlung für die Daten (SF2-B bzw. Orchestrator), nicht in meinen Dateien: /bad/badsanierung **[2, 5, 7]** (einzig mögliche Wahl), /balkon-terrasse **[6, 5, 7]**, /standorte/wetzlar **[2, 5, 6]**, /blog **[4, 5, 6]**. Vier verschiedene Dreier, der Fachwort-Block C2TE S1 (Punkt 7) offen nur auf zwei Ansichten. m390-Höhe des Abschnitts (rund 840 px) bleibt eine Folge der Plan-Form |
| N-3 | Zweierbild auf /bad/barrierefreies-bad zu ähnlich der Galerie davor (mittel) | bestätigt (4520 alt: 432 × 540 mit 96 px Versatz neben Galerie 504 × 630) | behoben, EV-11: erstes Foto zwei Drittel, unten bündig; d1440 336 × 420 neben 504 × 630, Köpfe 210 px versetzt, Kopf bis Unterkante 801 px; q844 307 × 384 neben 384 × 480 (Name bleibt auf dem Foto); t768 272 × 340 neben 408 × 510; m390 untereinander 358 breit. Bilder `blick/nacharbeit/{vor,nach}-{d1440,d1920,t768,q844,m390}-bf-entstehung.png`, `nach-d1440-bs-zweier.png` |
| N-4 | M2-A9 Rhythmus kaum wahrnehmbar (gering) | bestätigt (Lage −32 px, Tun mit Moment +64 px; Leere nach Stimmen und Karussells unberührt) | nicht im Code geändert: Plan setzt die Stufen fest (dicht py-12 lg:py-16, weit py-24 lg:py-32); weiter spreizen oder die Abstände an Stimmen und Karussells kürzen wäre eine neue Maßnahme auf acht Ansichten (Leitfaden-Bahn, Kantenkreuze). Notiz: den erwarteten Gewinn (Design Rhythmus +0,05 bis +0,1) **nicht ansetzen**; Vorschlag für eine spätere Runde: dicht py-8 lg:py-12 für Lage und Versprechen |
| N-5 | Hover-Fläche durch kurzen Auslauf verändert (gering) | bestätigt (4520 alt: `padding-top` 16 px auch an `a.glasbild` mit Maus) | behoben: `--glas-auslauf` am Textblock (4 Einheiten), im Block `@media (hover: hover)` für `a.glasbild` 12 Einheiten. Gemessen: /referenzen d1440 mit Maus 48 px wie 4325, m390 (ohne Maus) 16 px, Foto ohne Link 16 px. Bild `blick/nacharbeit/hover-vor-nach-d1440.png` (weicher Übergang wie vorher, Name eine Stufe kleiner nach Plan) |
| N-6 | Kontaktzeile rechts unten leer auf `/` und den Ortsseiten (gering) | bestätigt (rechte Spalte nur „Nachricht per WhatsApp“) | behoben, EV-12 (Zusatz aus einem Block rechts unter WhatsApp). Bilder `blick/nacharbeit/{vor,nach}-*-kontakt_*.png` |
| N-7 | Szenenliste und Zeichnung auf zwei Achsen in einer Karte (gering) | bestätigt (Liste Mitte 674, Zeichnung Mitte 720 bei d1440) | behoben, EV-13: Liste über den ganzen Block, d1440 x 315–1124 (Mitte 720 wie die Zeichnung), linke Kante weiter auf den Punkten. Ablauf unverändert (Listenpunkte auf allen Breiten gleich hoch wie vorher; mit Bewegung `bilder/bewegung-nach/d1440/bad/03.png`). Bilder `blick/nacharbeit/{vor,nach}-*-bad-schichten-*.png` |
| N-8 | Grenze verletzt: Zeilen in OrtsSeite.tsx und WissensSeite.tsx (mittel) | bestätigt (Hunk in WissensSeite.tsx scheitert gegen SF2-C) | behoben: beide Dateien aus dem Diff genommen (EV-1 neu gefasst); Begleitdiff für OrtsSeite.tsx für den Orchestrator; WissensSeite deckt SF2-C ab |
| N-9 | Fugenreihe mit mehr als drei offenen Punkten falsch gebaut (gering) | bestätigt (Code: `lg:grid-cols-2` mit Linie an jeder Zelle ab der zweiten) | behoben: `auswahl()` lässt höchstens drei zu (`OFFEN_HOECHSTENS`), mehr bricht den Bau ab wie eine ungültige Nummer. Geprüft durch Übersetzen der Funktion: [2, 5, 7], [2, 5], [4] gültig; [2, 5, 7, 1], [2, 2], [0], [9] brechen ab. Notiz (Frage 1) berichtigt |
| N-10 | EV-5 „pixelgleich“ stimmt nicht (gering) | bestätigt laut Messung der Prüfung (unter 1 px) | Notiz berichtigt (Abschnitt 1 und EV-5: „unter 1 px“); Klasse bleibt (werte.mjs sonst ein Befund) |

**Prüfzahlen nach der Nacharbeit** (Endbau `build-nach3`, Port 4520, danach gestoppt; `.next`, echte Kopie von `node_modules` und
`tsconfig.tsbuildinfo` gelöscht, Verweis wiederhergestellt; Hilfsskripte `_werkstatt/werkzeuge/_sf2a2-*.mjs` gelöscht):
- `npm test`: 280 Tests, 280 bestanden, 0 rot, 0 übersprungen (`log/npmtest-nach2.log`).
- `npx tsc --noEmit`: 0. `npx eslint` über die 16 geänderten Code- und Testdateien (15 aus src, dazu der Gefälle-Test): 0.
- `werte.mjs --dateien` (15 Dateien aus src, 1373 Klassenvorkommen, 278 eindeutig): 0 Befunde (`werte/2026-11-01T12-45-07-002Z.json`).
- `next build`: Exit 0, keine Warnung (`log/build-nach3.log`); ein Stylesheet je Seite (`/`, /bad/badsanierung,
  /bad/barrierefreies-bad, /kontakt, /fliesen je ein `link rel=stylesheet`).
- CSS gzip -9 wie `kette.sh`: 25.218 B (4325) → 25.273 B (4520), **+55 B** (roh 147.194 → 146.922, −272 B). Richtwert SF2-A2 0,9 KB
  eingehalten. Neu gegenüber dem ersten Bau: `md:glas-hoch-zwei-drittel`, `md:items-end`, `md:col-start-2`, Hover-Regel
  `--glas-auslauf`; entfallen: `glas-hoch-paar`, `md:mt-24`.
- `erstesbild.mjs` (zwölf Ansichten, q844, m390, d1440, zwei Durchgänge): 72 Fälle, Summe 308 → 308, alle fünf 56 → 56, Fall für Fall
  gleich wie 4325. m360 mit 200 %: 24 Fälle, Summe 54 → 54, Fall für Fall gleich (`erstesbild/nach2`, `erstesbild/nach2-200`).
- `bildsatz.mjs --png` nachher erneuert (`bilder/nach`, d1440, d1920, m390, zwölf Ansichten): 407 Aufnahmen, 0 Fehler, 0 nicht 200,
  Überlauf 0, Konsole 0, Überlappung 34 (nur `leitachse`, wie vorher). Mit Bewegung erneuert (`bilder/bewegung-nach`): 94 Aufnahmen,
  Überlauf 0. Pixelvergleich gegen `bilder/vor`: dieselben Ausschnitte wie in Abschnitt 3 (`pixel-vergleich-nacharbeit.txt`,
  `pixel-bewegung-nacharbeit.txt`).
- Seitenhöhen d1440 gegen 4325 jetzt: /bad/badsanierung +1 (vorher +7), /bad/barrierefreies-bad +32 (vorher +38), sonst wie in
  Abschnitt 3; d1920 /bad/badsanierung +1, /bad/barrierefreies-bad +36.
- Playwright (RELAUNCH_BASE 4520) alle `funktion-*` und `bewegungsschalter`, reduziert: 325 bestanden, 19 übersprungen, 0 rot. Mit
  Bewegung hero-kontakt, express-funnel, schnellanfrage, kontaktwege, projektcheck, bewegungsschalter: 120 bestanden, 4 übersprungen,
  0 rot.
- `axe.mjs --zustaende` (zwölf Ansichten, m390 und d1440): 72 Läufe, ernst/kritisch 0, Verstöße 0.
- `lesbarkeit.mjs` (zwölf Ansichten): Wert für Wert gleich wie vorher (GRÜN 10, ROT 2, Altbefunde).
- `bewegung.mjs`: register auf /bad und /bad/barrierefreies-bad unbekannt 0, ohne Register 0; reduziert /bad m390 Bewegungsbefunde 0.
- Keine Lighthouse- und keine Zeitmessung (E-076).
