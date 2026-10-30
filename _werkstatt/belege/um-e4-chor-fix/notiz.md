# UM-E4-CHOR-FIX · Notiz des Baumeisters (Kern 4.4)

Arbeitskopie `chorfix/baum` (Abzug von HEAD 6b9b25ab), vorher `chorfix/vor` (vor dem ersten Edit angelegt, danach unverändert).
Diff: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/chorfix/UM-E4-CHOR-FIX.diff` (22 Dateien, nur `src/`; Stand nach der Nacharbeit, siehe unten).
Alle Pfade unten relativ zu `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/chorfix/`.

## Bau und Prüfzahlen

- Bau: Produktionsbau mit echter `node_modules`-Kopie (Turbopack), `baum` zweimal (`log/build-baum-1.log`, `-2.log`, Endstand = Bau 2),
  dazu ein Vergleichsbau des Stands vorher in einer eigenen Kopie `vorbau` (aus `vor`, ohne `_relaunch`; `vor` selbst blieb unberührt).
  Server `npx next start -p 4410 -H 127.0.0.1` (baum) und 4419 (vorbau), beendet über die Prozessgruppe aus `log/server-<port>.pid`.
  Danach `.next`, `node_modules`-Kopie, `next-env.d.ts` und `tsconfig.tsbuildinfo` gelöscht, `node_modules` wieder als Verweis;
  `vorbau` ganz gelöscht. Skripte: `skript/`.
- `npm test`: 249 Tests, 249 bestanden, 0 fehlgeschlagen (`log/npm-test.log`).
- `npx eslint`: Exit 0, keine Meldung (`log/eslint.log`).
- `npx tsc --noEmit` mit der vom Bau erzeugten, vorübergehenden `next-env.d.ts`: Exit 0 (`log/tsc.log`).
- `werte.mjs --arbeitsbaum --dateien <21 geänderte Dateien>`: 0 Befunde (`log/werte.log`, `mess/werte/`). Aufgerufen aus
  `baum/_werkstatt/werkzeuge/` (gleich HEAD), damit die Pfadausnahmen von `werte-regeln.json` (relativ zum Repo) greifen; mit
  absoluten Pfaden in die Arbeitskopie meldet das Werkzeug sonst die zwei vorhandenen `0.01ms` im Ruhig-Spiegel von `bewegung.css`
  (Zeile 1699 f., nicht Teil dieses Pakets, in `werte-regeln.json` ausgenommen).
- `bewegung.mjs` gegen 4410, Seiten `/`, `/bad`, `/bad/badsanierung`, `/bad/barrierefreies-bad`, `/ueber-uns`, `/balkon-terrasse`,
  `/standorte/wetzlar`, `/blog`, `/fliesen`, `/leistungen`, `/referenzen` (`mess/bewegung-nach/`, `log/bewegung-nach-a.txt`, `-b.txt`):
  - register d1440 und m390: unbekannt 0, ohne Register 0 auf allen elf Seiten (vorher d1440 je 2: `span.leitfaden-marke`, 9 bzw. 12
    Läufe opacity und 3 bzw. 4 opacity mit translate; `mess/bewegung-vor/`, `log/bewegung-vor.txt`).
  - reduziert d1440 und m390: Bewegungsbefunde 0 auf allen elf Seiten. „Unsichtbar“ nur in Klassen, die es vorher schon gab
    (Menü, mobile Leiste, Cursor-Schild, Karussellknöpfe, nicht gezeigte Kantenkreuze vor Kalk); Zahlen vorher/nachher z. B. `/` 14/14,
    `/bad/badsanierung` 14/12, `/bad/barrierefreies-bad` 18/17, `/bad` 16/17 (+1: Kantenkreuz der Stimmen, die jetzt auf Kalk nach Kalk
    stehen und darum kein Kreuz zeigen). Geprüfte Elemente je Seite +3 (die Bahnen mit `data-motion="leitachse"`).
  - ruhig (Schalter) m390: 0 Bewegungsbefunde. d1440: je 4 Bewegungsbefunde an Kopfnavigation und Mega-Menü (`svg` rotate,
    `#kopf-blatt-*` translate) auf allen Seiten, vorher genauso (`/`, `/bad`, `/bad/badsanierung`, `/bad/barrierefreies-bad` vorher
    gemessen); nicht Teil dieses Pakets.
- `/` im Ruhezustand: `pixelvergleich.mjs --vorher 4419 --nachher 4410 --seiten / --geraete m390,t1024,d1440`: 3 Paare, 0 abweichende
  Pixel über die ganzen Seiten (`mess/pixel/pixelvergleich.json`). Leitfaden-Abtastung `/` d1440 vorher und nachher gleich (2078
  Stellungen, 369 mit Kopf, gleicher Befund „rot2“ 5236–5940 am roten Ursprung der Einsatzorte, schon vorher; `log/kopf-vor.txt`,
  `log/kopf-nach.txt`).
- Überlauf (`skript/ueberlauf.mjs`, `log/ueberlauf.txt`): m360, q844 und m390 mit Schrift 200 % auf den zehn geänderten Seiten ohne
  Überlauf.

## Je Entscheidung

### 1 · Register der Leitfaden-Marke
- `src/components/kern/Abschnitt.tsx`: `data-motion="leitachse"` am Behälter `.leitfaden-bahn` (nicht an der Marke; sie ist im
  Grundzustand unsichtbar und würde in „reduziert“ als unsichtbar gezählt). Keine Regel hängt daran.
- Nachweis: register d1440 auf `/`, `/bad`, `/blog`, `/leistungen`, `/standorte/wetzlar` und den übrigen sechs Seiten: ohne Register 0
  (vorher 2). `/` pixelgleich (siehe oben).

### 2 · Flächenfolge wie auf `/`
- `aufFliese: true` im Block `lage` von `bad-badsanierung.ts`, `barrierefreies-bad.ts`, `ueber-uns.ts`, `balkon-terrasse.ts`, `orte.ts`
  (alle 13 Ortsseiten), `blog.ts`; `anDerLinie: true` im Block `tun` von `orte.ts`.
- Nacharbeit (Prüfbefund, Messung je Seite nach dem Ziel von Punkt 2): ebenso `aufFliese: true` im Block `lage` von `bad.ts`,
  `leistungen.ts` und `referenzen.ts`. Dort lagen Einstieg, Lage und „Was wir tun“ sonst als drei Abschnitte auf Kalk in Folge.
  Alle drei nutzen den mittigen Einstieg (`ErzaehlSeite` reicht `fugeUnten` schon durch); kein Wortlaut berührt.
- `/fliesen`: vorher Einstieg, Lage und Wissensblock als drei Abschnitte auf Kalk in Folge (gemessen) → `aufFliese: true` in `fliesen.ts`.
- `WissensSeite.tsx` gibt `inhalt.lage.aufFliese` als `fugeUnten` an den Einstieg (Lage liest `aufFliese` selbst). Dafür kennt der einfache
  Einstieg (`teile/Einstieg.tsx`) jetzt `fugeUnten`: ab lg eine Stufe 16 Kalk bis zur Fuge statt einer Stufe 24, wie `EinstiegMitte`;
  ohne die Angabe unverändert. `OrtsSeite.tsx` gibt es ebenso weiter (die Ortsseiten nutzen denselben einfachen Einstieg; ohne das
  stünden über der neuen Fuge 96 statt 64 px Kalk). Die Erzählseiten mit mittigem Einstieg taten das schon (`ErzaehlSeite.tsx`).
- Bilder: `bilder/nach/blaetter/d1440_einstieg_lage.png` (Einstieg → Fuge mit Kantenkreuz → Lage auf Fliese: Wetzlar, Blog, Fliesen,
  Über uns), je Bildschirm `bilder/nach/{d1440,t1024,m390}/<seite>/NN.png`, Bögen `bilder/nach/blaetter/*.png`.

### 3 · Ende der Bad-Seiten
- Gemessen nach Punkt 2:
  - `/bad/badsanierung`: Stimmen F, Versprechen K (UM-E4-INHALT A), Schritt F, Badanfrage F → keine drei gleichen Flächen in Folge, keine
    Änderung.
  - `/bad/barrierefreies-bad`: Stimmen, Schritt und Badanfrage auf Fliese → Stimmen auf Kalk.
  - `/bad`: Stimmen, Schritt und Anfragewege (Projektcheck, Badanfrage) auf Fliese → Stimmen auf Kalk (die Regel „Ende der Bad-Seiten“
    trifft hier wörtlich zu; `/bad` stand nicht in der Liste von Punkt 2, siehe offene Fragen).
  - `/blog`: Stimmen F, Versprechen K, Schritt F → keine Änderung.
- Umsetzung: `BelegInhalt.stimmenAufKalk` (`inhalt.ts`), ausgewertet in `teile/Beleg.tsx` (nur die Fläche der Kundenstimmen), gesetzt in
  `barrierefreies-bad.ts` und `bad.ts`. Anfrage und Anfragewege bleiben auf Fliese.
- Auf Kalk steht jetzt der Kopf des Leitfadens neben den Stimmenkarten (keine Überschrift, kein Formular; Abtastung ohne Befund).
- Bilder: `bilder/nach/d1440/bad__barrierefreies-bad/07.png`, `08.png`; `bilder/nach/d1440/bad/07.png`, `08.png`; Bogen
  `bilder/nach/blaetter/d1440_punkte_3_4_8.png`.

### 4 · Fotoreihen mit Drittelversatz
- `fotosVersatz: true` im Block `beleg` von `bad-badsanierung.ts` (5 Fotos), `leistungen.ts` (3), `balkon-terrasse.ts` (4).
  Gemessen d1440: Oberkanten 5060/5124/5060, 5993/6057/5993, 6811/6875/6811 (mittleres Foto 64 px tiefer).
- `/bad/barrierefreies-bad` (zwei Fotos): `Beleg.tsx` unverändert. Der Flächenwechsel nach Punkt 2 ist dort der Bruch (Kalk des Belegs
  4447 bis 7458 px, mit den Stimmen auf Kalk nach Punkt 3 rund 3,35 Bildschirme ohne weiteren Bruch; siehe offene Fragen).
- Bilder: `bilder/nach/d1440/bad__badsanierung/05.png`, `bilder/nach/d1440/leistungen/06.png`, `bilder/nach/d1440/balkon-terrasse/07.png`.

### 5 · Kopf-Pausen
- `data-kopf-pause="ganz"`
  - am `fieldset` der Musterwahl in `momente/verband/VerbandProbe.tsx` (Legende, Wahl, Zeichnung, Beschreibung; neben den zwei Fotos
    darunter steht der Kopf wieder);
  - an der `figure` des Zweierbilds in `teile/Beleg.tsx`;
  - an der Hülle von Satz, Filterknöpfen und Statuszeile in `momente/galerie-filter/GalerieWahl.tsx`.
  Je Abschnitt höchstens eine Pause „ganz“ (geprüft: keiner dieser Abschnitte hat eine zweite).
- Abtastung d1440, Schritt 4 px (`skript/kopf.mjs`: `leitfaden.mjs` aus UM-E4-VORL, dazu Bildunterschriften in Anzeigeschrift,
  Legende und Labels der Musterwahl, Galerie-Satz, -Knöpfe und -Statuszeile):
  - vorher (`log/kopf-vor.txt`): `/bad/badsanierung` Kopf neben „So sieht ein Bad im Bau aus“ 5292–5352;
    `/bad/barrierefreies-bad` neben „So entsteht eine Dusche ohne Stufe“ 5208–5268; `/fliesen` neben Legende, „Kreuzfuge“ und
    Beschreibung 2564–3464; `/referenzen` neben Satz, „Alle Fotos“ und Statuszeile 4068–4228.
  - nachher (`log/kopf-nach.txt`, `log/kopf-nach-t1024.txt`): auf allen elf Seiten d1440 und den vier Seiten t1024 kein Kopf neben
    Überschrift, Bildunterschrift, Musterwahl, Galerie-Bedienung oder Formular, nie zwei Kreuze unter 24 px.
- Bilder (Leselinie an der Oberkante des Elements, Versatz in px):
  - vorher `bilder/kopf-vor/d1440/bad__badsanierung/zweierbild_5311.png`, `bilder/kopf-vor/d1440/bad__barrierefreies-bad/zweierbild_5226.png`,
    `bilder/kopf-vor/d1440/fliesen/musterwahl_2624.png`, `bilder/kopf-vor/d1440/referenzen/galerie_4126.png`;
  - nachher `bilder/kopf-nach/d1440/bad__badsanierung/zweierbild_5389.png`, `_5409.png`, `_5439.png`,
    `bilder/kopf-nach/d1440/bad__barrierefreies-bad/zweierbild_5240.png`, `_5260.png`, `_5290.png`,
    `bilder/kopf-nach/d1440/fliesen/musterwahl_2512.png`, `_2562.png`, `_3352.png`,
    `bilder/kopf-nach/d1440/referenzen/galerie_4076.png`, `_4126.png`, `_4186.png`;
  - an den Stellen der Sammlung: `bilder/kopf-nach/d1440/bad__badsanierung/sammlung_5301.png`, `sammlung_5316.png`,
    `bilder/kopf-nach/d1440/referenzen/sammlung_4100.png`, `sammlung_4150.png` (die Seite ist durch Punkt 2 und 4 um rund 100 px
    gewachsen; die elementbezogenen Bilder oben zeigen dieselbe Stelle).

### 6 · `/leistungen`, zwei Kartenraster in Folge
- `Ablauf` kennt die Treppe (`Schritte`, ohne Moment). `/leistungen` gibt aber `SzeneAblauf` als `momente.ablauf` aus der Seite
  (`page.jsx`) in den Ablauf, nicht aus `leistungen.ts`; die Treppe ginge nur über `page.jsx` und nähme `szene-ablauf` von
  `/leistungen`, das K-008 dort führt und nach E-037 nicht ohne Rückfrage entfällt. Mit „nur der Inhalt von `leistungen.ts`“ also nicht
  erreichbar → `SzeneAblauf` unverändert; der Bruch kommt aus Punkt 4 (Fotoversatz im Beleg, Oberkanten 5993/6057/5993).
- Bild: `bilder/nach/d1440/leistungen/06.png`, Bogen `bilder/nach/blaetter/d1440_leistungen_02-07.png`.

### 7 · `/leistungen` mobil, Plan-Auftritte
- Die Reihe als ein Auftritt: `ul#gewerke` trägt `data-plan-reihe`; in `bewegung.css` (Block sig-plan, nur `(hover: none), (pointer:
  coarse)`) rücken alle Pläne der Reihe in die Flucht, sobald einer von ihnen `data-motion-stand="an"` hat (`:has()`). Kennung, Auslöser
  (IO 40 % je Karte) und Register bleiben; `register.ts` und `register.json` unverändert. Desktop unverändert (Hover je Karte).
  Ohne `:has()` wie bisher je Karte.
- Nicht gewählt: `data-motion` an `ul#gewerke`. Die Liste ist mobil rund 2 200 px hoch, 40 % davon passen nie in 844 px; die Pläne
  blieben dort dauerhaft aus der Flucht.
- Messung (`skript/planreihe.mjs`, Schritt 40 px, `log/planreihe.txt`, `mess/planreihe-*.json`):
  - m390 vorher: 4 Auftritte im Bild (1760, 2320, 2880, 3480), dreimal zwei in einer Bildschirmhöhe. Nachher: 1 Auftritt (Bad bei 1760),
    die übrigen drei rücken im selben Zug außerhalb des Bildes in die Flucht.
  - t1024 vorher: zwei Reihen je zwei Karten (1960, 2680). Nachher: nur die erste Reihe (Bad und Böden zugleich, ein Auftritt); die
    zweite Reihe liegt beim Hereinkommen schon in der Flucht.
  - d1440: Hover je Karte vorher und nachher gleich (`skript/planhover.mjs`: ohne Maus alle aus der Flucht, Hover rückt genau die Karte).
- Bilder: `bilder/nach/m390/leistungen/02.png` bis `04.png`, Bogen `bilder/nach/blaetter/m390_leistungen_01-08.png`.

### 8 · `/referenzen`
- `ZweiterBeleg.flaeche` (`teile/Beleg.tsx`), in `referenzen/page.jsx` `flaeche: 'fliese'` für Vorher-Nachher. Folge jetzt Galerie K,
  Vorher-Nachher F, Bewertungen K, Schritt F. Wortlaut, Stimmen und Bewertungszahlen unverändert.
- Folge davon: Die Oberkante der Bewertungen ist jetzt eine Trennlinie, ihr Kantenkreuz (`ReviewsSection.jsx`) wird sichtbar. Es ist
  gebaut wie in `kern/Abschnitt` (Kreuz in Grundschicht und rotes Kreuz zum Einrasten, `abschnitt-lot`, `data-motion="leitachse"`),
  sonst wäre es das einzige Kantenkreuz ohne Einrasten. Gemessen: ±10 px um die Leselinie rot, ±200 px schwarz; vorher nicht zu sehen.
  Bild `bilder/nach/kante/referenzen_bewertungen_kante_d1440.png`.
- Auf Fliese hat Vorher-Nachher keinen Kopf mehr neben dem Regler.
- Bilder: `bilder/nach/d1440/referenzen/09.png` bis `11.png`, `bilder/nach/blaetter/t1024_referenzen_08-13.png`.

### 9 · `/blog`, lange Artikelliste
- Liste unverändert (Werkzeug, K-016). Bruch über Punkt 2: Lage auf Fliese, die Liste auf Kalk; längste Strecke ohne Bruch d1440 von
  6 661 px (7,4 Bildschirme, Einstieg bis Ablauf) auf 5 364 px (5,96 Bildschirme, nur die Liste).

### 10 · `/kontakt`
- Keine Codeänderung.

## Flächenfolge je Seite (gemessen, `skript/flaechen.mjs`)

K Kalk, F Fliese, Einstieg mitgezählt bis zum letzten Abschnitt vor dem Fuß. „Längste Strecke“: größter Abstand zwischen zwei Brüchen
(Flächenwechsel, Versatz der Ablauf-Treppe oder der Fotoreihe, Fuß). Rohdaten `mess/flaechen-{vor,nach}-{d1440,m390}.json`,
`log/flaechen-*.txt`.

| Seite | d1440 vorher | d1440 nachher | längste Strecke d1440 vorher → nachher | m390 vorher | m390 nachher |
|---|---|---|---|---|---|
| `/` | K F K F K F K F | gleich | 1,74 → 1,74 | K F K F K F K F | gleich |
| `/bad/badsanierung` | K K K F K F K F F | K F K F K F K F F | 3,72 → 1,96 | K K K F K F K F F | K F K F K F K F F |
| `/bad/barrierefreies-bad` | K K K F K F F F | K F K F K K F F | 3,87 → 3,35 | K K K F K F F F | K F K F K K F F |
| `/bad` | K K K F K F F F | K F K F K K F F | 5,60 → 4,41 | K K K F K F F F | K F K F K K F F |
| `/ueber-uns` | K K K F F K F K F K | K F K F F K F K F K | 4,06 → 2,32 | K K K F F K F K F K | K F K F F K F K F K |
| `/balkon-terrasse` | K K K F F K F K F | K F K F F K F K F | 4,56 → 2,13 | K K K F F K F K F | K F K F F K F K F |
| `/standorte/wetzlar` | K K K F K F K F | K F K F K F K F | 3,07 → 1,60 | K K K F K F K F | K F K F K F K F |
| `/blog` | K K K F K F K F | K F K F K F K F | 7,40 → 5,96 | K K K F K F K F | K F K F K F K F |
| `/fliesen` | K K K F K F K F K | K F K F K F K F K | 5,74 → 2,92 | K K K F K F K F K | K F K F K F K F K |
| `/leistungen` | K K K F K F F K | K F K F K F F K | 5,35 → 3,07 | K K K F K F F K | K F K F K F F K |
| `/referenzen` | K K K F K K K F | K F K F K F K F | 7,82 → 5,03 | K K K F K K K F | K F K F K F K F |

Drei gleiche Flächen in Folge nachher: auf keiner der elf Seiten (d1440 und m390). Die Zeilen `/bad`, `/leistungen`, `/referenzen`
sind nach der Nacharbeit neu gemessen (`skript/flaechen.mjs`, `mess/flaechen-nach2-{d1440,m390}.json`, `log/flaechen-nach2-*.txt`;
die übrigen acht Seiten dort unverändert gegenüber `flaechen-nach-*`). Die längsten Strecken danach:
- `/bad` 4,41 (d1440) und 5,82 (m390): nächster Schritt und Anfragewege mit Formularen, beide auf Fliese (Punkt 3: Formulare nie auf
  Kalk), schon vorher so.
- `/leistungen` 3,07: „Was wir tun“ mit dem Plankartenraster und dem Formatregler (ein Abschnitt).
- `/referenzen` 5,03 (d1440) und 13,31 (m390): die Galerie (offene Frage 4).
- `/bad/barrierefreies-bad` 3,35: Beleg und Stimmen auf Kalk (offene Frage 3).
- `/blog` 5,96: die Artikelliste (Punkt 9).

## Offene Fragen

1. Erledigt in der Nacharbeit: `/bad`, `/leistungen`, `/referenzen` haben jetzt die Lage auf Fliese (siehe Punkt 2 und Abschnitt
   „Nacharbeit“). Vorher lagen dort Einstieg, Lage und „Was wir tun“ als drei Abschnitte auf Kalk, 5,6 / 5,35 / 3,8 Bildschirme ohne Bruch.
2. `/bad`: Punkt 3 wörtlich angewandt (Stimmen auf Kalk, weil Stimmen, Schritt und Anfragewege auf Fliese standen). Ist `/bad` nicht
   gemeint, ist es eine Zeile in `bad.ts` zurückzunehmen.
3. `/bad/barrierefreies-bad`: Mit den Stimmen auf Kalk (Punkt 3) und zwei Fotos ohne Versatz (Punkt 4) liegen Fotos, Zweierbild und
   Stimmen 3 011 px (3,35 Bildschirme) auf Kalk ohne Bruch; vorher war die längste Strecke 3,87 Bildschirme am Anfang. Ein Bruch dort
   bräuchte eine Änderung an `Beleg.tsx` (Versatz bei zwei Fotos) oder eine andere Fläche.
4. `/referenzen`: Die Galerie selbst (24 Fotos, drei Spalten bündig) bleibt 4 528 px (5 Bildschirme) ohne Bruch; der Prüfer CHOR-07
   schlug dafür einen Versatz in der Galerie vor (nicht Teil dieses Briefings).
5. `/blog`: Die Artikelliste bleibt 5 364 px ohne Bruch (Punkt 9, bewusst nach K-016).
6. KERN K-008, Zeile `sig-plan`: „auf Touch IO 40 %“ gilt weiter je Karte; neu ist, dass eine Reihe mit `data-plan-reihe` auf Touch ein
   Auftritt ist. Ob der Orchestrator das in K-008 nachträgt, entscheidet er (Kennung unverändert, darum kein Eintrag in `register.json`).
7. `ReviewsSection.jsx` (Bestand) wurde über die reine Fläche hinaus angefasst (Kantenkreuz mit Einrasten, Punkt 8), weil die neue
   Trennlinie sonst ein Kreuz ohne Einrasten zeigte.

## Geänderte Dateien

`src/components/kern/Abschnitt.tsx`, `src/app/bewegung.css`, `src/components/vorlagen/inhalt.ts`, `src/components/vorlagen/WissensSeite.tsx`,
`src/components/vorlagen/OrtsSeite.tsx`, `src/components/vorlagen/teile/Einstieg.tsx`, `src/components/vorlagen/teile/Beleg.tsx`,
`src/components/momente/verband/VerbandProbe.tsx`, `src/components/momente/galerie-filter/GalerieWahl.tsx`,
`src/components/leistungen/Leistungsplaene.tsx`, `src/components/sections/ReviewsSection.jsx`, `src/app/(bestand)/referenzen/page.jsx`,
`src/inhalte/bad-badsanierung.ts`, `src/inhalte/barrierefreies-bad.ts`, `src/inhalte/bad.ts`, `src/inhalte/ueber-uns.ts`,
`src/inhalte/balkon-terrasse.ts`, `src/inhalte/orte.ts`, `src/inhalte/blog.ts`, `src/inhalte/fliesen.ts`, `src/inhalte/leistungen.ts`,
`src/inhalte/referenzen.ts` (neu in der Nacharbeit; in `bad.ts` und `leistungen.ts` kam dort je ein Block dazu).
Kein Wortlaut, keine Kundenstimme, keine Bewertungszahl, kein Formular, keine H1, nichts an B-01.

## Nacharbeit nach der Prüfung (Runde A)

Sechs Befunde. Jeden selbst nachgeprüft: ein Befund mit Schwere mittel ist bestätigt und behoben, fünf mit Schwere gering bleiben
ohne Codeänderung (Begründung je Befund unten).

Behoben:
- Mittel, Flächenfolge `/bad`, `/leistungen`, `/referenzen`. Die Folge war bei d1440 und m390 je dreimal Kalk am Anfang
  (`log/flaechen-nach-*.txt`); das widerspricht dem Ziel von Punkt 2.
  - Änderung: `aufFliese: true` im Block `lage` von `src/inhalte/bad.ts`, `src/inhalte/leistungen.ts` und `src/inhalte/referenzen.ts`.
    Der Kommentar steht wie in den übrigen Dateien. Wortlaute, Stimmen und Bewertungszahlen bleiben unberührt.
  - Folge nachher bei d1440 und m390:
    - `/bad` K F K F K K F F
    - `/leistungen` K F K F K F F K
    - `/referenzen` K F K F K F K F

    Auf keiner der elf Seiten stehen mehr drei gleiche Flächen in Folge (`log/flaechen-nach2-*.txt`). Die Seiten sind ab lg um
    34 px länger, durch Fuge und Stufe wie auf den anderen Seiten.
  - `/bad` behält die Stimmen auf Kalk (Punkt 3). Ohne sie stünde das Ende wieder als F F F.
  - Kopfabtastung `skript/kopf.mjs` (Schritt 4 px) auf den drei Seiten, d1440 und t1024 (`log/kopf-nach2.txt`, `mess/kopf2/`): keine
    Befunde, also kein Kopf neben einer Überschrift oder einem Formular, nie zwei Kreuze unter 24 px und höchstens ein rotes
    Kreuz zugleich. Der Kopf steht nicht mehr in `ihre-lage`, weil dort Fliese ist.
  - Bilder (Einstieg, dann Fuge mit Kantenkreuz, dann Lage auf Fliese):
    - `bilder/nach2/d1440/{bad,leistungen,referenzen}/einstieg_lage_1000.png`
    - `bilder/nach2/m390/{bad,leistungen,referenzen}/einstieg_lage_800.png`
    - Lage, dann Kante, dann „Was wir tun“ auf Kalk: `bilder/nach2/d1440/bad/lage_tun_2250.png`, `bilder/nach2/d1440/leistungen/lage_tun_1700.png`

Nicht geändert (gering):
- `/bad/barrierefreies-bad`, 3,35 Bildschirme Kalk aus Beleg und Stimmen: nachgemessen und bestätigt (3 011 px ab 4 447).
  - Briefing Punkt 4 schließt eine Änderung an `Beleg.tsx` für zwei Fotos aus. Eine wählbare Fläche für den Schritt ginge über
    das Briefing hinaus.
  - Die Entscheidung liegt beim Orchestrator (offene Frage 3).
- `/referenzen`, Galerie mit 5,03 Bildschirmen (d1440) ohne Bruch: nachgemessen und bestätigt.
  - Die Galerie ist nicht Teil des Briefings und ein Werkzeug (K-016).
  - Ein Versatz je Zeile wäre ein eigenes Paket (offene Frage 4).
- `/leistungen`, Kopf neben dem Formatregler: Der Befund ist vorbestehend und nicht Teil des Diffs; der Prüfer belegt den gleichen
  Stand vor dem Diff.
  - Regler außerhalb von Formularen zählen nach der Regel aus UM-E4-VORL nicht.
  - Eine zweite Pause „ganz“ im Abschnitt `was-wir-tun` ginge nicht: `ul#gewerke` trägt dort schon die einzige.
  - Nur zur Kenntnis.
- `sig-plan`, Reihe als ein Auftritt auf Touch: Das Verhalten ist so gewollt. Beschrieben ist es im Kommentar in `bewegung.css` (Block
  sig-plan) und im Kopf von `Leistungsplaene.tsx`.
  - Die Kennung bleibt gleich, daher bleiben `register.ts` und `register.json` wie im Briefing (Punkt 7) unverändert.
  - Der Halbsatz in KERN K-008 (Zeile `sig-plan`) ist Sache des Orchestrators, etwa: „Reihe mit `data-plan-reihe` (/leistungen):
    auf Touch ein Auftritt je Reihe“ (offene Frage 6).
- `ReviewsSection.jsx` über die reine Fläche hinaus: Die Abweichung ist bewusst so gebaut (offene Frage 7).
  - Der Prüfer bestätigt Fangbereich, forced-colors und axe ohne Befund.
  - Keine Codeänderung; in der Abnahme vermerken.

Prüfzahlen nach der Nacharbeit (Bau 3, `log/build-baum-3.log`; Server 4410 über die eigene PID-Datei beendet; danach `.next`,
`node_modules`-Kopie, `next-env.d.ts` und `tsconfig.tsbuildinfo` gelöscht, `node_modules` wieder als Verweis):
- `npm test`: 249 Tests, 249 bestanden, 0 fehlgeschlagen (`log/npm-test-2.log`).
- `npx eslint`: Exit 0, keine Meldung (`log/eslint-2.log`).
- `npx tsc --noEmit`, mit der vorübergehenden `next-env.d.ts`: Exit 0 (`log/tsc-2.log`).
- `werte.mjs --arbeitsbaum --dateien <22 geänderte Dateien>`: 0 Befunde (`log/werte-2.log`, `mess/werte/2026-10-30T00-52-38-980Z.json`).
- `bewegung.mjs` auf `/`, `/bad`, `/leistungen`, `/referenzen` (`mess/bewegung-nach2/`, `log/bewegung-nach2-*.txt`):
  - register d1440 und m390: unbekannt 0 und ohne Register 0 auf allen vier Seiten.
  - reduziert d1440 und m390: 0 Bewegungsbefunde.
  - „Unsichtbar“ auf den drei Seiten je 2 weniger als vorher: Die zwei Kantenkreuze der Lage (Grundschicht und rot) standen vorher
    auf Kalk nach Kalk und waren ausgeblendet; jetzt werden sie gezeigt. „Geprüft“ ist je 1 weniger, denn auf Fliese hat die Lage
    keine Leitfaden-Bahn. `/` ist unverändert (14 und 12).
  - ruhig: m390 0 Bewegungsbefunde; d1440 je 4 an Kopfnavigation und Mega-Menü, wie vorher und nicht Teil dieses Pakets.
- Überlauf (`log/ueberlauf-2.txt`): m360, q844 und m390 mit Schrift 200 % auf den drei Seiten ohne Überlauf.
- `/` ist nicht berührt (nur drei Inhaltsdateien anderer Seiten). Folge und Register auf `/` sind gleich wie vorher.
