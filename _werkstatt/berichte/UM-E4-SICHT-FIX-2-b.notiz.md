# UM-E4-SICHT-FIX-2 · Bauteil SF2-B (Stufe 2) · Einstiege, Fotos, Ortsseiten · M2-B1 → M2-B2 → M2-B7 → M2-B3 → M2-B4 → M2-B5 → M2-B6

Arbeitskopie `$SCRATCH/sfix2/b/baum` (Abzug HEAD 2a93b91f nach Stufe 1), Vergleich `$SCRATCH/sfix2/b/vor` (unverändert). Server:
4530 = baum (Endbau build-4, `next start`), 4325 = HEAD 2a93b91f (Vorher-Stand, nicht angefasst), 4324 und 4326 nicht angefasst.
Grundlage: Briefing `pakete/UM-E4-SICHT-FIX-2.md`, `belege/um-e4-sicht-fix-2/endplan.json` (M2-B1 bis M2-B7, nicht_umsetzen),
E-113 (Nr. 1, 2, 4, 7, 8), E-104, E-111, E-112, Notiz Stufe 1 (`berichte/UM-E4-SICHT-FIX-2-a1.notiz.md`, EV-14 `zusatzBreit`).
M2-B8 entfällt (E-113 Nr. 4). Die `tun.satz`-Überschreibungen sind seit Stufe 1 entfallen (in meinen Inhalten keine mehr).

- **Diff:** `$SCRATCH/sfix2/b/UM-E4-SICHT-FIX-2-b.diff` (`diff -ruN vor baum` ohne node_modules, node_modules_echt, .next, bilder,
  next-env.d.ts, tsconfig.tsbuildinfo; 19 Dateien). `patch -p1 --dry-run` gegen das Repository (HEAD 8f4ad1a9): alle 19 Dateien sauber.
- **Bilder:** `$SCRATCH/sfix2/b/bilder/vor` (4325) und `…/bilder/nach` (4530), je ein Lauf `bildsatz.mjs --png`, Geräte d1440, d1920,
  m390, Seiten `/`, `/bad`, `/bad/badsanierung`, `/bad/barrierefreies-bad`, `/balkon-terrasse`, `/standorte/wetzlar`,
  `/standorte/giessen`, `/standorte/marburg`, `/blog`, `/fliesen` (`/` und `/fliesen` als Gegenprobe). Dazu
  `bilder/bad-einstieg-dpr/` (M2-B1: /bad bei d1440 mit DPR 1 und 2, bad-beleg-1 gegen bad-beleg-2), `bilder/bewegung/` (mit Bewegung im
  Endzustand: Wetzlar Einstieg und Band bei d1440 und m390, /balkon-terrasse Einstieg, je vorher und nachher), Arbeitsbilder `blick/`
  (u. a. `blick/eingang/` Bildfolge des Eingangs auf Wetzlar, `blick/s200/` 200 % Schrift, `blick/nach-*-band-*.png` Band auf Gießen,
  Marburg, Limburg bei d1440 und t1024).

## 1 Maßnahmen und Stand

### M2-B1 Bildtabelle · umgesetzt wie im Plan (E-113 Nr. 7), an den Dateien nachgemessen
Nachgemessen (Laplace-Varianz bei 640 px Breite, Helligkeit, Anteil ≥ 250): Die Verhältnisse des Plans stimmen (bad-beleg-1 191 :
bad-beleg-2 162 = 1,18 wie 2,94 : 2,50; bad-beleg-3 1,28; start-dusche 0,97; start-galerie-1 1,02; barrierefrei-beleg-1 1,25; jeweils
relativ zu bad-beleg-1), badsanierung-beleg-2 13,4 % ausgefressen, start-dusche 0,1 %. Originale je Seite geprüft
(`bilder/auftrag-e2.json`, `auftrag-e4.json`): kein Original zweimal auf derselben Seite.

| Ansicht | Einstieg vorher → nachher | Reihe nachher |
|---|---|---|
| `/bad` | bad-beleg-1 → **bad-beleg-2** (Landhausbad, IMG_2599) | bad-einstieg, bad-beleg-3, bad-beleg-1 (Name neu: „Badewanne mit Lichtlinie und Ornamentfliesen“) |
| `/bad/badsanierung` | badsanierung-beleg-2 → **start-dusche** (IMG_2578, Güte A) | badsanierung-beleg-1, badsanierung-einstieg, badsanierung-beleg-2 („Badewanne und Dusche mit Mosaikboden“), sanierung-weg-1 bis 3 |
| `/bad/barrierefreies-bad` | bereich-dusche-streifen-sitzbank → **barrierefrei-beleg-1** (IMG_2595) | bad-beleg-4, bereich-dusche-streifen-sitzbank („Dusche mit Fliesenstreifen und Sitzbank“) |
| `/balkon-terrasse` | unverändert | balkon-beleg-2, balkon-beleg-anthrazit, balkon-beleg-aluprofil, balkon-stelzlager |
| 13 Ortsseiten | start-beleg-dusche → **start-galerie-1** (IMG_2582, Güte A) | GALERIE_START neu: badsanierung-einstieg, start-beleg-bad, start-beleg-terrasse, balkon-beleg-aluprofil, kontakt-eingang, start-beleg-treppe; Wetzlar (Index 0) nach Helligkeit: badsanierung-einstieg, kontakt-eingang, start-beleg-terrasse |

- `orte.ts`: AUFMACHER, NACH_HELLIGKEIT mit allen sechs Kennungen (Reihenfolge aus `bildinventar.csv`, an den Webdateien bestätigt:
  0,665 / 0,584 / 0,520 / 0,514 / 0,494 / 0,348), Kopfkommentar zur Regel (Aufmacher darf erstes Galeriefoto sein, E-113 Nr. 7).
- `galerie.ts`: GALERIE_START und Kopfkommentar berichtigt (die Regel aus E4-W0-BILDER gilt nicht mehr; welche Fotos auch wo stehen).
- `standorte/[stadt]/page.tsx` FOTOS: Namen (aus dem Alt-Text, höchstens sechs Wörter) und Wege für alle sechs Plätze:

| Kennung | Name auf der Glasfläche | Weg |
|---|---|---|
| badsanierung-einstieg | Badewanne mit Ornamentfliesen und Nische (wie auf /bad/badsanierung) | /bad/badsanierung |
| start-beleg-bad | Badewanne mit dunklen Mosaikfliesen (wie bisher) | /bad/badsanierung |
| start-beleg-terrasse | Terrasse mit blaugrauen Fliesen (wie auf /) | /balkon-terrasse |
| balkon-beleg-aluprofil | Terrassenkante mit hellem Aluprofil (wie auf /balkon-terrasse) | /balkon-terrasse |
| kontakt-eingang | Treppenstufen mit beigen Fliesen (Alt-Text) | /treppen |
| start-beleg-treppe | Außentreppe mit anthrazitfarbenen Fliesen (Alt-Text) | /treppen/aussentreppe (wie auf /) |

- Gezählt am gerenderten HTML (4530, alle Hauptansichten außer /referenzen und alle 13 Ortsseiten als eine Ansicht): kein Foto zweimal
  auf derselben Ansicht, jedes höchstens zweimal (13 Fotos genau zweimal, darunter neu badsanierung-einstieg, start-beleg-terrasse,
  start-beleg-treppe, balkon-beleg-aluprofil mit den Ortsseiten und die zwei Fotos auf /blog). `start-dusche` steht bis zum Einspielen von
  SF2-C zugleich auf /referenzen (Einstieg dort): **B und C in einem Zug einspielen** (Plan, Risiko M2-B1).
- Vergleich /bad bei d1440 mit DPR 1 und 2 (`bilder/bad-einstieg-dpr/vergleich-dpr1.png`, `vergleich-dpr2-klein.png`,
  `detail-dpr2-1zu1.png`): bad-beleg-2 zeigt das ganze Bad (Regal, Tür, Wanne mit Lichtlinie), bad-beleg-1 nur Wannenrand und Boden.
  Bei DPR 2 sind beide weich, bad-beleg-2 etwas mehr (688 px Quelle für 1148 Gerätepixel); bei DPR 1 kein sichtbarer Schärfeverlust.
  Der Befund ist vor allem einer des Motivs (Plan); empfohlen wie gebaut. Rückweg je eine Zeile (`bild:` in `bad.ts`,
  `bad-badsanierung.ts`, `barrierefreies-bad.ts`, `AUFMACHER` in `orte.ts`).

### M2-B2 Eingang „An der Schnur“ mit Zeilenmaske · umgesetzt nur für die Ortsseiten (E-113 Nr. 2)
1. `Einstieg.tsx`: neue Angabe `zeilenmaske` (nur mit `schnur`). Die H1 steht als Block-Zeilen hinter Zeilenmasken
   (`data-motion="zeilenmaske"`, `--zeile`; `titelZeilen`, sonst eine Zeile mit dem Titel), die letzte an der Schnur
   (`schnur-grundlinie`, die vorhandene Regel „Zeilenmaske an der Schnur“ greift). Ort ab sm im Eingang (`max-sm:animate-none` statt
   `animate-none`), Knopfzeile mit `data-eingang="knoepfe"` und `max-sm:animate-none`. Foto, Bewertungszeile und Vorspann ab dem ersten
   Bild. Zusatzattribut `data-zeilenmaske` am Abschnitt; `data-einstieg="schnur"` bleibt wörtlich (intro.test Zeile 323).
2. `bewegung.css`, eigener Block nach „Einfacher Einstieg an der Schnur“: `[data-motion="eingang"][data-einstieg="schnur"][data-zeilenmaske]
   { --eingang-schnur: var(--dauer-2) }`. Takt damit wie EinstiegMitte: Schnur und Lotstück 0–320, Zeilen 140–860, Ort 500–1100,
   Knöpfe 620–1220 ms, voll ≤ 1,5 s (intro.test „Eingang 1“ grün). Wiederkehr nur die Zeilen, kürzer. Ruhig, reduziert, ohne JS, Druck:
   Endzustand (vorhandene Regeln).
3. Wissensseiten: nicht gebaut (E-113 Nr. 2, EV-B5). `WissensSeite.tsx` (SF2-C) setzt die Angabe nicht; die Schnur der Wissensseiten
   bleibt in dauer-1.
4. Vorspann mit Foto im Bildplatz (nur Ortsseiten) in der Hülle des Fotos (`mx-auto w-full max-w-md lg:w-1/2`): d1440 Foto x 417–1023,
   Vorspann x 416–1024 (vorher 56 px links der Bildkante). Klassenfolge des `p` unverändert (intro.test Zeile 321).
5. `OrtsSeite.tsx` setzt `zeilenmaske` (und `zusatzBreit`, M2-B7).
6. `test/intro.test.mjs` „Eingang 7“: Zeile 320 positiv gefasst (Maske an genau einer Stelle, nur hinter `maske = anDerSchnur &&
   zeilenmaske`, Zeile als Block mit Nummer, flach ohne Maske, Zusatzattribut, Ort und Knopfzeile ab sm im Eingang, OrtsSeite setzt die
   Angabe, WissensSeite nicht, Schnur dauer-1 bzw. dauer-2 in den zwei Regeln). Zeile 323 wörtlich, Zeile 321 unverändert.
7. Register (`register.ts` und `register.json` gleichlautend, Bewegung 16/16 grün): `zeilenmaske.was` nennt die Orte (/, mittige
   Einstiege, Planblatt, Ortsseiten mit `data-zeilenmaske`, nicht Wissensseiten); `eingang.was` ergänzt um die Fassung der Ortsseiten;
   `register.json` → `hinweis` berichtigt. KERN K-007 „Typografischer Moment“, Spalte „Wo“: Erzähl- und Ortsansichten, nicht Wissen.
- Geprüft mit Bewegung (Erstbesuch, `blick/eingang/bogen-d1440.png`, `bogen-m390.png`): d1440 Schnur gezogen, H1 steigt aus der Schnur,
  Ort und Knöpfe setzen sich danach, Bewertung und Foto stehen ab dem ersten Bild; m390 Ort, Hauptknopf, Anruf und Bewertung ab dem ersten
  Bild, nur Schnur und Zeile kommen herein. Endzustand mit Bewegung (`bilder/bewegung/nach-wetzlar-einstieg-*.png`) gleich dem ruhigen.

### M2-B7 Ortsmaß am Einzugsband · umgesetzt (mit EV-B1 bis EV-B4)
1. Band breit: `OrtsSeite` setzt `Lage zusatzBreit` (Lage.tsx unverändert, EV-14 aus Stufe 1). `standorte/[stadt]/page.tsx`: Form `band`
   statt `stapel` (der Plan setzt die Form band voraus, EV-B3). d1440 Band x 112–1328 (vorher 315–1125), d1920 und t1024 über die Satzbreite.
2. `Einzugsband.tsx` nur mit `aktuell`, nicht kompakt, Form band (`ortsmass`): Ab 42 rem stehen die offenen Zonen nebeneinander und füllen
   die Zeile (drei 3 : 3 : 4 wie vorhanden, zwei zu gleichen Teilen, eine über die volle Breite; ebenso die Zonen im Aufklapper; EV-B1);
   die Orte einer Zone ab 36 rem Zonenbreite in zwei, ab 56 rem in vier Spalten, erste Reihe ohne Fuge oben.
3. Laserlinie (**Nacharbeit: Rot nur bis zum Ende der Spalte des Ortes, EV-B11, Abschnitt 8**): Die Kante jeder Zone bis einschließlich der Zone des Ortes ist eine rote Linie (2 px, `border-t-2 border-laser`), die über die
   Fuge rechts bis an die nächste Zone reicht (`-right-px`); sie beginnt am Lot des Firmensitzes und zieht mit dem vorhandenen Auftritt
   `einzugsband` (Kante je Zone, Staffel 0/3/6). Im Aufklapper (Zonen hinter dem Ort) bleibt die Kante in Tinte. Das Lot bleibt in Tinte
   (EV-B2). Keine neue Bewegung, kein Registereintrag, keine neuen Daten, kein neuer Text.
4. Kennzahl: Am eigenen Ort Name (halbfett), darunter die vorhandene Entfernung („ca. 5 km“) in Mono fs-5 (`whitespace-nowrap`), darunter
   „Sie sind hier“ (Mono fs-1, eine Stufe 1 Luft: sonst kreuzten sich die Zeilenkästen um 1 bis 2 px, ueberlappung.mjs). Am Firmensitz
   (Aßlar) bleibt das Wort „Firmensitz“ klein (EV-B4). Links, `aria-current`, Muss-Inhalte unverändert; die Reihenfolge im Linktext ist
   jetzt Name, Entfernung, „Sie sind hier“.
- Gemessen d1440: Wetzlar eine Zone über 1214 px, vier Orte in einer Reihe, Linie x 114–1328; Gießen zwei Zonen je 607 px, je zwei
  Spalten; Limburg und Marburg drei Zonen 3 : 3 : 4, Linie über die ganze Breite. t1024: Wetzlar vier Spalten, Limburg 3 : 3 : 4
  einspaltig. m390 und 200 % Schrift (m390, d1440): Zonen untereinander, Orte einspaltig bzw. zweispaltig, Kennzahl lesbar.
- KERN K-008 (Zeile `einzugsband`) nachgezogen; der Halbsatz in K-003 „Fläche“ ist in der Nacharbeit zurückgenommen (Abschnitt 8, Grenze zu SF2-A2). `test/einzugszonen.test.mjs` grün.

### M2-B3 Schnurzeichen an der H1 · umgesetzt
- `EinstiegMitte.tsx`: Das Zeichen hängt in der Gruppe der H1 (`div.relative.flex.max-w-full`, wie der Quadratmeter auf `/`): `absolute
  bottom-0 left-full`, Luft `ZEICHEN_LUFT` (0,5 em der H1) über `--zeichen-luft` am Zeichen und `margin-inline-start` in
  `globals.css` (Block „schnur-zeichen“, EV-B6), Unterkante auf der Schnur, eine H1-Zeile hoch, an seiner linken Unterkante ein
  Fugenkreuz (`KREUZ_GROESSE`, Tinte, `data-leitachse` für die Überlappungsprüfung). Schwellen (lg bzw. xl), `titel-em`-Rechnung
  (`mitZeichen`) und `data-eingang="knoepfe"` unverändert.
- H1 unverändert (G8): Lage und Größe gemessen gleich auf /bad, /bad/badsanierung, /balkon-terrasse bei d1280, d1440, d1920, t1024
  (z. B. /balkon-terrasse d1440 x 371–1069, h 183 vorher wie nachher). Zeichen vorher → nachher (x): /balkon-terrasse d1440 1154–1344 →
  1115–1304 (Luft zur H1 85 → 46 px), d1920 1449–1662 → 1404–1617, t1024 845–992 → 817–964 (Abstand zum rechten Rand 32 → 60 px),
  d1280 1075–1248 → 1000–1174; /bad d1440 1244–1344 → 1214–1314; /bad/badsanierung d1440 1154–1344 → 1106–1295. Die Strecke ist
  klein, weil die H1 den Platz neben sich schon ausfüllt (Maß mit Zeichen, unverändert nach Plan); neu ist die Bindung an die H1 und das
  Kreuz auf der Schnur. Bei 200 % und unter 56 rem Spalte entfällt das Zeichen wie bisher.

### M2-B4 /bad, nur der Rückfall · umgesetzt (E-113 Nr. 1; Projektcheck offen eingebettet, Specs unverändert)
- `bad/page.jsx`: Badanfrage und Badplaner als **eine Zeile**: der Aufklapper heißt „Badanfrage oder Badplaner öffnen“ (Mikrotext,
  Bedienbeschriftung) und enthält zuerst den Weg „Badplaner“ (WeiterLink, `/bad/badplaner`), dann die Badanfrage wie bisher (Kennung
  `#anfrage`, Region „Badanfrage“, Funnel nachgeladen). `bad.ts` → `schritt.hilfen` ohne die eigene Zeile „Badplaner“ (EV-B7).
- Projektcheck offen wie bisher (F-05), Felder, Logik, Nutzlast, Ziele unverändert. Die zwei hohen Befunde gelten nach Plan als bestehend.

### M2-B5 /blog untere Hälfte · umgesetzt (E-113 Nr. 8; EV-B8, **in der Nacharbeit ersetzt durch EV-B12: zwei fertige Arbeiten**)
- `blog.ts` → `beleg.fotos`: entstehung-dusche-2 („Fliesen schräg zum Ablauf geschnitten“ → /blog/duschrinne-oder-punktablauf) und
  badsanierung-zweier-1 („Dusche im Bau mit Nische“ → /blog/wandnischen-dusche-planen); Güte B (bildinventar), ohne Vorrang, unter dem
  ersten Bildschirm. `beleg.stimmen`: c-wolf, peter-p, elke-s, ute-t (Wortlaut aus REVIEWS, Karussell zählt 01 / 04).
- `versprechen.offen` [2, 5, 7] (Darstellung SF2-A2). Der Ablauf bleibt (K-009).

### M2-B6 Bildunterschrift der Zeichnung auf /bad/badsanierung · umgesetzt
- `tun.unterKopf.unterschrift`: „Die Wanne kommt raus, der Boden neigt sich zur Rinne.“ (Mikrotext, 10 Wörter, kein Glossarwort, kein
  Strich). Punkt 02 wörtlich.

### versprechen.offen in meinen Inhalten · gesetzt
- `bad-badsanierung.ts`, `balkon-terrasse.ts` (zusammen mit `erklaert: ['abdichtung']`), `orte.ts` (alle 13), `blog.ts`: `offen: [2, 5, 7]`
  (Standard des Plans), am sichtbaren Text jeder Seite geprüft, Begründung je Datei im Kommentar:
  - 1 (Termin kostenfrei, Schadensanalyse) steht im Ablauf 01 aller vier; 4 (Angebot mit festem Preis) im Ablauf 02 von badsanierung,
    balkon und den Ortsseiten und im ersten Schritt unter den Knöpfen der mittigen Einstiege; 3 (Verbundabdichtung DIN 18534) in Punkt 03
    von badsanierung, in der Einleitung von „Was wir tun“ der Ortsseiten, im Vorspann und Beleg von /blog, auf /balkon-terrasse nie
    (Nassräume); 6 (Staubschutz) im Ablauf 04 von badsanierung; 8 (Inhaber) nur /ueber-uns.
  - 2 (Großformat): auf badsanierung nur im Aufklapper „Mehr erfahren“ (nicht sichtbar), sonst nirgends; 5 und 7: auf keiner der vier.
- **Die Wirkung hängt an SF2-A2:** `OrtsSeite.tsx` (mein Bauteil) gibt heute nur `erklaert` an `Versprechen`; wie `offen` durchgereicht
  wird, legt SF2-A2 fest (Frage O-2).

## 2 Entscheidungsvermerke

**EV-B1 · M2-B7: offene Zonen füllen die Zeile statt fester Plätze 3 : 3 : 4**
- Ziel: Band breit ohne leere Fläche („rechts leer“ war der Befund), Laserlinie bis zur Zone des Ortes.
- Alternativen: (a) feste Plätze 3 : 3 : 4 auch bei weniger offenen Zonen: Wetzlar (eine Zone) stünde in 3/10 der Breite (365 px), 851 px
  rechts leer, die Zonen im Aufklapper an verschobenen Plätzen; (b) Aufklapper als Zelle rechts neben den offenen Zonen (Wetzlar 7/10 als
  Kasten mit einer Zeile, darunter leer); (c) gewählt: offene Zonen füllen die Zeile, ebenso die Zonen im Aufklapper; drei Zonen 3 : 3 : 4
  wie vorhanden.
- Wirkung: Wetzlar, Solms, Braunfels, Aßlar: eine Zone über die volle Breite, vier Orte in einer Reihe; Gießen, Herborn, Dillenburg: zwei
  Zonen zu gleichen Teilen; die übrigen sechs: drei Zonen 3 : 3 : 4. Die Linie läuft immer über die offenen Zonen (Plan: „markiert die
  Zone, keinen Maßstab“); die Entfernung trägt die Kennzahl.
- Risiko: Die Linie ist auf allen Ortsseiten gleich lang (immer bis zum Ende der offenen Zonen). Rückweg: `FUELLEN` in Einzugsband.tsx
  entfernen (dann feste Plätze).

**EV-B2 · M2-B7: Lot des Firmensitzes in Tinte, rot nur die Linie**
- Ziel: ein Rot je Bildschirm neben dem Leitfaden (E3-SICHT-ERZ Befund 26) und K-003 Nr. 5 (Rot markiert den aktuellen Ort).
- Lage: Der Plan schreibt „vom vorhandenen roten Lot“; auf den Ortsseiten stand das Band als `stapel` mit Lot in Tinte. Breit steht das
  Lot bei d1440 x 112, 16 px neben der Leitachse (x 96): rot gäbe es zwei rote Senkrechte nebeneinander.
- Alternativen: rotes Lot der Form band (zwei rote Lote); Lot ganz weglassen (Firmensitz-Marke verlöre ihre Kante).
- Wirkung: Die rote Linie beginnt am Lot in Tinte und läuft die obere Fuge entlang; mit Bewegung endet die rote Spitze der Leitachse knapp
  links über ihrem Anfang (`bilder/bewegung/nach-wetzlar-band-d1440.png`) und liest sich wie ein Abzweig des Leitfadens zum Ort.
- Risiko: gering. Rückweg: `stapel || ortsmass` → `stapel` in `listenKlassen`.

**EV-B3 · M2-B7: Form band auf den Ortsseiten**
- Ziel: „Ab 42 rem stehen die drei Zonen nebeneinander (vorhanden)“ setzt die Form band voraus; `page.tsx` setzte seit E4-NACH-01
  `form="stapel"` (schmale Randspalte im alten Planblatt). Wirkung: `stapel` bleibt nur auf /standorte (unverändert), die kompakten
  Vorschauen bleiben. Risiko keins. Rückweg: `form="stapel"` in page.tsx (dann auch ohne Ortsmaß, `ortsmass` gilt nur in der Form band).

**EV-B4 · M2-B7: Kennzahl am Firmensitz klein**
- Aßlar hat die Entfernung 0 und trägt das Wort „Firmensitz“; in Mono fs-5 stünde ein Wort, keine Zahl (K-006). Es bleibt fs-1 wie
  bisher, mit Fugenkreuz. Rückweg: Bedingung `o.distanceKm === 0` in der Kennzahl entfernen.

**EV-B5 · M2-B2: nichts auf den Wissensseiten**
- Plan Nr. 2 (Schnur der Wissensseiten dauer-1 → dauer-2) und Nr. 3 (Zeilenmaske nach Messpunkt) nicht gebaut: E-113 Nr. 2 und Auftrag
  („M2-B2 nur Ortsseiten“, „keine Zeilenmaske auf den Wissensseiten“). intro.test hält das fest (WissensSeite ohne `zeilenmaske`,
  Schnur dauer-1). Rückweg: entfällt.

**EV-B6 · M2-B3: Luft als Variable `--zeichen-luft` in globals.css statt durch SF2-O**
- Plan: SF2-O setzt die Utility. Laut Auftrag darf ich eigene Blöcke in globals.css ändern; der Block „schnur-zeichen“ gehört zur
  Maßnahme. Eine Quelle (`ZEICHEN_LUFT` in EinstiegMitte) für das Maß der H1 und den Abstand, kein Beliebigwert (werte 0).
  Rückweg: Zeile `margin-inline-start` entfernen.

**EV-B7 · M2-B4 Rückfall: eine Zeile als Aufklapper mit beiden Namen**
- Ziel: „Badanfrage und Badplaner zu einer Zeile zusammenlegen“, ohne Formulare, Specs oder den offenen Projektcheck zu ändern.
- Alternativen: (a) Badplaner-Link in die Zeile des Aufklappers (Link im `summary`: ungültig, nicht bedienbar); (b) Badplaner nur im Fuß
  (Weg verschwindet von der Seite, gegen Abnahme E3-BAU-01); (c) gewählt: Aufklapper „Badanfrage oder Badplaner öffnen“, darin zuerst der
  Weg zum Badplaner, dann die Badanfrage.
- Wirkung: am Seitenende Hauptknopf, Anruf, WhatsApp, Projektcheck offen, eine Zeile (vorher zwei). Der Badplaner ist einen Klick
  tiefer (G4: im DOM). F-04 und F-05 prüfen /bad/badanfrage bzw. #projekt-check; beide unberührt.
- Risiko: Der Badplaner steht innerhalb der Region „Badanfrage“. Rückweg: `zu` wieder „Badanfrage öffnen“, Inhalt nur der Funnel, die
  Hilfezeile in `bad.ts` zurück.

**EV-B8 · M2-B5: Fotos aus der Arbeit trotz offener Nische (E-113 Nr. 8 gelesen als die zwei Dateien aus E-065)**
- E-113 Nr. 8: „die in E-065 entfernten Motive (Wanne mit Herstelleraufkleber, Duschnische ohne Armatur) bleiben draußen“. Entfernt
  wurden IMG_2567 (bereich-wanne-mit-tuer) und IMG_2583 (blog-beleg, „Duschnische … die Armatur fehlt noch“, als fertiges Beispiel
  benannt); beide sind nicht dabei. Die gewählten Fotos des Plans (IMG_2549, IMG_2557, Güte B) zeigen aber ebenfalls Duschen **im Bau**
  mit offener Nische, IMG_2557 ohne Armaturen. Sie stehen schon so auf /bad/barrierefreies-bad („So entsteht eine Dusche ohne Stufe“) und
  /bad/badsanierung („So sieht ein Bad im Bau aus“); der Name der zweiten sagt „Dusche im Bau“, die Artikel handeln von Ablauf bzw.
  Nischenplanung.
- Alternativen: badsanierung-zweier-2 (dieselbe offene Nische); fertige Fotos ohne passenden Artikel (bad-beleg-1, start-beleg-dusche):
  der Weg zum Artikel wäre ein erfundener Bezug; entstehung-dusche-1 steht schon zweimal.
- Wirkung: /blog hat in der unteren Hälfte zwei echte Fotos mit Glasfläche und Weg, vier Stimmen, drei offene Versprechen (nach SF2-A2).
- Risiko: Ein Prüfer kann „Duschnische ohne Armatur“ als Motiv lesen (Frage O-1). Rückweg: `fotos: []` in `blog.ts` (eine Zeile).

**EV-B9 · M2-B1: Namen und Wege neu**
- Neue Namen nur aus dem Alt-Text (Tabellen oben); start-beleg-treppe führt wie auf / zu /treppen/aussentreppe, kontakt-eingang zu
  /treppen. Rückweg: FOTOS in page.tsx.

**EV-B10 · Register und KERN über die Spalte „Wo“ hinaus**
- Mit „Wo“ von `zeilenmaske` ändert sich die Beschreibung von `eingang` (Schnur der Ortsseiten in dauer-2) und der Hinweis in
  `register.json` („Wissens- und Ortsseiten … ohne Zeilenmaske“ war falsch geworden); K-008 `einzugsband` und der Halbsatz in K-003
  „Fläche“ beschreiben das Ortsmaß. Kommentar des Blocks „Einfacher Einstieg an der Schnur“ in bewegung.css nennt die Ortsseiten nicht
  mehr. Nur Text, keine Regeln. Rückweg: Sätze streichen.

## 3 Gewollte Pixeländerungen je Ansicht

`pixelvergleich.mjs` 4325 gegen 4530 (Einwilligung abgelehnt, reduziert, DPR 1, ganze Seite), Ziel `$SCRATCH/sfix2/b/pixel/`
(`pixelvergleich.json`, Differenzbilder je Gerät und Seite). Abweichende Ausschnitte / Ausschnitte, Seitenhöhe vorher → nachher:

| Ansicht | d1440 | d1920 | m390 | q844 | t1024 | gewollt |
|---|---|---|---|---|---|---|
| `/` | 0/11 | 0/10 | 0/13 | 0/22 | 0/13 | keine (Gegenprobe EinstiegMitte, ohne Schnurzeichen) |
| `/bad` | 6/14 (12230 → 12175) | 11/13 | 4/16 | 9/28 | 6/16 | Einstiegsfoto bad-beleg-2, Schnurzeichen ab xl an der H1 mit Kreuz, Fotoreihe neu, am Ende eine Zeile weniger (−53 bis −63 px) |
| `/bad/badsanierung` | 5/12 | 11/12 | 12/13 (10654 → 10682) | 3/23 | 5/14 | Einstiegsfoto start-dusche, Schnurzeichen ab lg an der H1, neue Bildunterschrift (mobil eine Zeile mehr, darum verschiebt sich der Rest der Seite um 28 px), Fotoreihe mit drittem fertigem Bad |
| `/bad/barrierefreies-bad` | 3/11 | 4/11 | 2/12 | 4/21 | 4/13 | Einstiegsfoto barrierefrei-beleg-1, Fotos der Reihe getauscht; Höhe gleich |
| `/balkon-terrasse` | 3/12 | 3/11 | 2/14 | 2/25 | 3/14 | Schnurzeichen ab lg an der H1 (mobil, q844 nur die Reihe), Fotoreihe beginnt mit dem rosébraunen Balkon; Höhe gleich |
| `/standorte/wetzlar` | 7/11 | 9/10 | 12/12 (9562 → 9608) | 20/21 (8029 → 8083) | 11/12 | Einstiegsfoto start-galerie-1, Vorspann auf der Bildkante, Band breit mit Laserlinie und Kennzahl (mobil 46 px höher durch die Kennzahl), Fotoreihe neu |
| `/standorte/giessen` | 10/11 (9221 → 9088) | 9/10 | 12/12 | 21/21 | 11/12 | wie Wetzlar; ab 42 rem zwei Zonen nebeneinander (Seite 63 bis 149 px kürzer) |
| `/standorte/marburg` | 10/11 (9432 → 9256) | 9/10 | 13/13 | 21/22 | 11/12 | wie Wetzlar; drei Zonen 3 : 3 : 4 nebeneinander (Seite bis 197 px kürzer) |
| `/standorte/limburg` | 10/11 (9633 → 9457) | 10/10 | 12/13 | 21/22 | 12/12 | wie Marburg (langer Ortsname bei t1024 geprüft: Kennzahl und Name in der 371-px-Zone) |
| `/blog` | 6/12 (10157 → 10942) | 5/11 | 6/14 | 9/25 | 6/14 | Beleg mit zwei Fotos (+785 px bei d1440), Karussell mit vier Stimmen (01 / 04) |
| `/fliesen` | 0/11 | 0/11 | 0/13 | 0/22 | 0/13 | keine (Gegenprobe Einstieg an der Schnur mit Plan, ohne Zeilenmaske) |
| `/referenzen`, `/leistungen`, `/ueber-uns` | 0 | 0 | 0 | 0 | 0 | keine (d1920 /referenzen Höhe 12812 → 12811 nur gerundet, 0 Pixel) |

Erstes Bild ohne Bewegung und mit Bewegung im Endzustand gleich: Wetzlar d1440 und m390 sowie /balkon-terrasse d1440, Aufnahme
2,5 s nach dem Erstbesuch gegen den ruhigen Ausschnitt 00 des Bildsatzes, vorher wie nachher 0 abweichende Pixel; einzige Ausnahme
/balkon-terrasse nachher 14 Pixel an einer senkrechten 1-px-Kante im Schnurzeichen (Kantenglättung: Das Zeichen steht jetzt auf einer
gebrochenen Pixelposition und war im Eingang auf eigener Ebene; keine Lage- oder Größenänderung, `blick/balkon-zeichen-vgl.png`).

## 4 Textvorschläge

| Nr. | Ansicht | Stelle | heute | Vorschlag | Grund |
|---|---|---|---|---|---|
| T-B-1 | `/bad` | Aufklapper „Badanfrage oder Badplaner öffnen“, Weg „Badplaner“ | Name ohne Satz | Satz unter dem Namen: „Planen Sie Ihr Bad online in drei Schritten.“ (aus der Beschreibung der Seite /bad/badplaner) | der Weg erklärt sich sonst nur über seinen Namen; die übrigen Hilfen tragen einen Satz |

Sonst keine. Geändert sind nur Mikrotexte: Bildunterschrift (M2-B6), Namen auf Glasflächen (M2-B1, M2-B5) und die Zeile des Aufklappers
(M2-B4). Wortlaut der Stimmen und Bewertungen unverändert (G8).

## 5 Offene Fragen

- **O-1 (EV-B8):** *Nacharbeit: gebaut ist die Fassung, die beide Lesarten erfüllt (EV-B12); der Plan-Stand ist eine Zeile Rückweg.* Gelten die Baustellenfotos IMG_2549 und IMG_2557 auf /blog als „Duschnische ohne Armatur“ im Sinn von E-113 Nr. 8?
  Wenn ja: `fotos: []` (Rückweg) oder fertige Fotos ohne Artikelbezug, dann ohne Weg.
- **O-2 (versprechen.offen):** *Nacharbeit: erledigt durch SF2-A2 EV-1 (Zeile in OrtsSeite.tsx im Diff von A2, Prop `offen`; legt sich sauber auf den Stand von B, Abschnitt 8).* `OrtsSeite.tsx` gibt `offen` nicht an `Versprechen` weiter, weil dessen neue Schnittstelle SF2-A2 baut.
  Nach dem Einspielen von A2 eine Zeile `offen={inhalt.versprechen.offen}` in OrtsSeite (und ErzaehlSeite, WissensSeite), falls A2 die
  Aufrufe nicht selbst anpasst. In meinen Inhalten steht `offen: [2, 5, 7]` bereit.
- **O-3 (B und C):** Bis SF2-C den Einstieg von /referenzen tauscht, steht start-dusche auf zwei Einstiegen. B und C in einem Zug.
- **O-4 (M2-B1):** /bad/barrierefreies-bad: Das neue Einstiegsfoto zeigt bei d1440 im ersten Bildschirm vor allem Fenster und weiße
  Fliesen, Mosaikboden und Eckbank liegen in der unteren Hälfte. Scharf und ohne den blauen Gegenstand (Befund 2a), aber das Motiv wirkt
  erst ganz gesehen. Wie im Plan gebaut; im Tor beobachten.
- **O-5 (M2-B2):** ENTSCHEIDUNGEN (M-A3 Nr. 2 für Ortsseiten aufgehoben) trägt der Orchestrator ein. Lighthouse Wetzlar mobil beobachten
  (H1 startet maskiert, das Foto bleibt größer; A-1).
- **O-6 (EV-B1):** Feste Plätze 3 : 3 : 4 statt füllender Zonen, wenn die Linie als Maßstab lesen soll? Ich empfehle füllend. *Nacharbeit: füllend bleibt; die Länge trägt jetzt die Spalte des Ortes (EV-B11).*

## 6 Prüfzahlen (Endbau build-4, Server 4530 frisch gestartet; neue Zahlen nach der Nacharbeit in Abschnitt 8)

- `npm test`: 280 Tests, 280 bestanden, 0 rot, 0 übersprungen (mit `.next`; darin intro.test „Eingang 1“ bis „9“, Bewegung 16/16,
  Orte 1 bis 7, Galerie 1 bis 4, Einzugszonen, Stylesheets).
- `npx tsc --noEmit`: 0. `npx eslint` über die 15 geänderten Code- und Testdateien: 0.
- `werte.mjs --dateien` über die 14 geänderten Code-Dateien (462 Klassenvorkommen, 151 eindeutig): 0 Befunde. Über `globals.css` und
  `bewegung.css` dazu 4 Befunde `dauer_zahl` (0.01ms in den Blöcken für reduzierte Bewegung, Zeilen 467 f. bzw. 1970 f.), im
  unveränderten `vor` genauso 4: Bestand, nicht aus diesem Diff.
- `next build`: Exit 0 (`logs/build-4.log`); ein Stylesheet je Seite.
- **CSS gzip** (wie `kette.sh`, `curl | gzip -9`): 25.218 B (4325) → 25.296 B (4530), **+78 B** (roh 147.194 → 147.788, +594 B);
  Richtwert SF2-B 0,6 KB.
- `erstesbild.mjs` (`/`, `/bad`, `/bad/badsanierung`, `/bad/barrierefreies-bad`, `/balkon-terrasse`, `/standorte/wetzlar`, `/blog`,
  `/fliesen`; q844, m390, d1440; Erstbesuch und nach Einwilligung, mit Bewegung): 48 Fälle, Summe 208 → 208, alle fünf 40 → 40, Fall für
  Fall gleich (rot nur q844 im Erstbesuch, Einwilligungsbanner, vorher wie nachher). m360 mit 200 % Schrift (Kopie mit Init-Skript
  `html{font-size:200%}`): 16 Fälle, Summe 37 → 37, alle fünf 0 → 0, Fall für Fall gleich (Altbefund OF-C3-4). Belege
  `erstesbild/{vor,nach,vor-200,nach-200}/erstes-bild.json`.
- `bildsatz.mjs --png` (10 Seiten × d1440, d1920, m390): vorher 342, nachher 343 Aufnahmen; 0 Fehler, 0 nicht 200, Überlauf 0,
  Konsole 0; Überlappung je 30, nur `leitachse` (vorher wie nachher). Eine Zwischenfassung meldete 6 × `textkreuzung` (Kennzahl über „Sie
  sind hier“, 1 bis 2 px); behoben mit `mt-1`.
- `axe.mjs --zustaende` (`/bad`, `/bad/badsanierung`, `/bad/barrierefreies-bad`, `/balkon-terrasse`, `/standorte/wetzlar`,
  `/standorte/giessen`, `/blog`; 11 Ansichten; normal, Menü, Erstbesuch): je 231 Läufe, ernst/kritisch 0, Verstöße gesamt 0 (vorher
  ebenso). Belege `axe/{vor,nach}/axe.json`.
- Playwright (`_werkstatt/werkzeuge/tests`, RELAUNCH_BASE=4530): projektcheck, schnellanfrage, kontaktwege, navigation, einwilligung,
  badanfrage, verlegen, bewegungsschalter, express-funnel, weiterleitung, je mobil und Desktop: reduziert 280 bestanden, 10 übersprungen,
  0 rot; mit Bewegung (RELAUNCH_BEWEGUNG=an) 280 bestanden, 10 übersprungen, 0 rot (`suite/suite.txt`, `suite/suite-b.txt`). F-05
  (Projektcheck offen auf /bad) und F-09 (Schnellanfrage der Ortsseiten) grün, Specs unverändert.
- Lesbarkeit (`lesbarkeit.mjs`, 6 betroffene Seiten): vorher wie nachher 5 grün, rot nur /bad/badsanierung „Floskel 1“ (die
  geschützte H1, Bestand); Glossar offen 0; Flesch /bad 75 → 74,6, /bad/badsanierung 66,2 → 66,4, Wetzlar 66,7 → 66,4, /blog 63,7.
- Fotos je Ansicht am gerenderten HTML gezählt (Abschnitt 1, M2-B1): kein Foto zweimal auf einer Ansicht, außerhalb /referenzen
  jedes höchstens zweimal.
- Keine Lighthouse- und keine Zeitmessung (E-076). Hilfsskripte `_werkstatt/werkzeuge/_sf2b-blick.mjs` und
  `_sf2b-erstesbild200.mjs` wieder gelöscht. In der Arbeitskopie `.next`, die echte Kopie von node_modules und `tsconfig.tsbuildinfo`
  gelöscht, `node_modules` wieder als Verweis; Server 4530 gestoppt.
- Hinweis zum Ablauf: Nach build-3 lief kurz noch der Serverprozess von build-2 auf 4530 weiter (der neue Start scheiterte an der
  belegten Adresse); Zwischenmessungen gegen ihn sind verworfen, alle Zahlen dieses Abschnitts stammen vom frisch gestarteten Server mit
  build-4.

## 7 Selbst angesehen
- d1440, d1920, t1024 und m390: Einstiege /bad, /bad/badsanierung, /bad/barrierefreies-bad, /balkon-terrasse (Foto und Schnurzeichen),
  Wetzlar, Gießen, Marburg, Limburg (Einstieg, Vorspann, Band), /blog (Beleg), /bad (Schluss). Ergebnis: Das Band füllt die Satzbreite
  ohne leere Hälfte, die rote Linie liest sich als Markierung des eigenen Bereichs, die Kennzahl ist der Blickpunkt der Lage; das
  Schnurzeichen gehört sichtbar zur H1 (Kreuz auf der Schnur); /bad endet mit einer Zeile weniger; /blog hat in der unteren Hälfte Fotos.
- 200 % Schrift: m390 Wetzlar (H1 in zwei Zeilen hinter einer Maske, Ort, Knöpfe; Band mit Orten untereinander, Entfernung unter dem Namen,
  Kennzahl lesbar), d1440 Wetzlar (Band unter 42 rem gestapelt, Orte in zwei Spalten). Bilder `blick/s200/`.
- Eingang mit Bewegung (Erstbesuch): `blick/eingang/bogen-d1440.png` (Schnur gezogen, Zeile steigt, Ort und Knöpfe setzen sich nach der
  Zeile, Bewertung und Foto stehen) und `bogen-m390.png` (Ort, Hauptknopf, Anruf, Bewertung ab dem ersten Bild).
- Mit Bewegung im Band (`bilder/bewegung/nach-wetzlar-band-d1440.png`): Die rote Leitachse endet an der Leselinie knapp links über dem
  Anfang der roten Linie des Bandes; es entsteht kein zweites rotes Lot (EV-B2).

## 8 Nacharbeit (Prüfung Stufe 2: 13 Befunde, jeder selbst nachgeprüft)

Endbau **build-6** (Server 4530, frisch gestartet), Arbeitsbilder unter `$SCRATCH/sfix2/b/nach2/` (`band/`, `blick/`, `pixel/`,
`axe/`, `pruef/`, `patchprobe/`), Bildsatz nachher erneuert unter `$SCRATCH/sfix2/b/bilder/nach` (Satz `sf2b-nach2`). Geändert in der
Nacharbeit: `Einzugsband.tsx` (EV-B11), `blog.ts` (EV-B12), `KERN.md` (K-003 „Fläche“ zurück auf den Stand von HEAD, K-008
`einzugsband` an EV-B11 angepasst). Sonst nichts.

### 8.1 Befunde

| Nr. | Befund (Schwere) | Nachgeprüft | Ergebnis |
|---|---|---|---|
| 1 | Laserlinie sagt nichts über den Ort (mittel) | bestätigt: `offen` reicht immer bis zur Zone des Ortes, `imMass` färbte alle offenen Zonen, die Linie lief auf jeder Ortsseite über die ganze offene Breite | **behoben, EV-B11** |
| 2 | /bad: Seitenschluss fast unverändert (hoch) | bestätigt als Beobachtung; Höhen wie vom Prüfer gemessen (d1440 −55, d1920 −63, m390 −52) | **nicht behoben**, siehe unten |
| 3 | /bad/barrierefreies-bad: Motiv am Desktop unter dem Falz (mittel) | bestätigt (d1440 zeigt die oberen 59 % des Fotos) | **nicht behoben**, Gegenprobe bad-beleg-4 unten |
| 4 | bad-beleg-1 und badsanierung-beleg-2 sichtbar in der Reihe (gering) | bestätigt | **nicht behoben** (stehen schon an der letzten möglichen Stelle) |
| 5 | bad-beleg-2 bei DPR 2 weich (gering) | bestätigt: 688 px Quelle für 574 CSS-Pixel × 2 = 1148 Gerätepixel, 60 % (bad-beleg-1 800 px, 70 %) | **als Vermerk erledigt**: hier festgehalten, im Tor mit einem DPR-2-Bild beobachten; eine neue Datei ist nicht erlaubt (E-104 Nr. 6) |
| 6 | Schnurzeichen hängt am Titelblock, nicht an der letzten Zeile (gering) | Maße bestätigt | **nicht behoben**, Geometrie unten |
| 7 | Lot des Bandes 16 px neben der Leitachse (gering) | bestätigt | **nicht behoben**, Begründung unten |
| 8, 12 | /blog: zwei Baustellenfotos gegen E-113 Nr. 8 (mittel, zwei Prüfer) | bestätigt: entstehung-dusche-2 mit offener Nische (Mineralwolle) und Rohrstutzen, badsanierung-zweier-1 Dusche ohne Armaturen mit blanken Anschlüssen (bildinventar IMG_2549, IMG_2557; selbst angesehen) | **behoben, EV-B12** |
| 9 | `versprechen.offen` wirkt im Bau von B nicht (mittel) | bestätigt für B allein | **in B keine Änderung nötig**: die Zeile liefert SF2-A2 (EV-1), Probe unten |
| 10 | Eingang der Wissensseiten nicht gebaut (gering) | bestätigt | **nicht behoben**: E-113 Nr. 2 (EV-B5); keine Kreativität aus M2-B2 für /fliesen und /blog einrechnen |
| 11 | start-dusche bis zum Einspielen von C auf zwei Einstiegen (gering) | bestätigt | **Hinweis**, bleibt O-3: B und C in einem Zug |
| 13 | `patch` scheitert in KERN.md (A2/B) und register.json (B/C) (gering) | bestätigt mit eigener Probe | **zum Teil behoben**: KERN.md jetzt sauber; register.json bleibt Handarbeit (Rezept in 8.3) |

**Zu 2 (hoch, /bad):** Der Rückfall ist so gebaut, wie E-113 Nr. 1 ihn erlaubt. Musterbäder-Kasten, Pflegekassen-Hinweis und der zweite
dunkle Knopf „Angebot mit Festpreis anfordern“ stehen in `src/components/funnels/BadProjektCheck/Zusammenfassung.jsx`, also im
Formular selbst (G8, F-05 prüft sichtbare Inhalte in `#projekt-check`) und außerhalb der Dateien von SF2-B. Sie in einen Aufklapper zu
legen, änderte das Formular. Ich schließe mich dem Prüfer an: Für /bad nur „ohne Freigabe: Bedienbarkeit +0,05“ einrechnen (Plan), die
Befunde 1a und 1b gelten weiter.

**Zu 3 (mittel, Einstieg /bad/barrierefreies-bad):** Gegenprobe wie vorgeschlagen, an den Webdateien bei 574 × 718 px, oberer
Ausschnitt 421 px wie der erste Bildschirm bei d1440 (`nach2/blick/barrierefrei-erster-schirm.png`): bad-beleg-4 zeigt dort Brause,
Mosaikstreifen, Ablagekorb und weiße Wand; Mosaikboden und Rinne liegen auch bei ihm im untersten Achtel, also ebenfalls unter dem
Falz. Laplace-Varianz bei 640 px: barrierefrei-beleg-1 195,8, bad-beleg-4 89,6, das alte Foto 53,2. Der Tausch brächte die „Dusche ohne
Stufe“ nicht in den ersten Bildschirm und holte „weich“ (Befund 2a) zurück. Bei 4 : 5 und dieser Lage des Fotos trägt kein vorhandenes
Foto den Boden über den Falz; die Lage zu ändern hieße die Figur aller mittigen Einstiege zu ändern. Bleibt wie gebaut, im Tor
beobachten (O-4). Rückweg weiter eine Zeile (`bild:`).

**Zu 4 (gering):** Auf /bad steht bad-beleg-1 schon als letzte von drei Karten. Auf /bad/badsanierung steht badsanierung-beleg-2 als
letztes der fertigen Bäder; die drei Fotos der Arbeit stehen nach Textdatei Abschnitt 5 (Kommentar in `bad-badsanierung.ts`) hinter den
fertigen und unter der Überschrift „… fertig und während der Arbeit.“. Weiter nach hinten ginge nur gegen diese Folge. Als bekannt
geführt.

**Zu 6 (gering, Schnurzeichen):** Das Zeichen ist eine H1-Zeile hoch (`ZEICHEN_HOEHE` 1,1 em = Zeilenhöhe von fs-7) und steht mit der
Unterkante auf der Schnur; seine Oberkante liegt also genau auf der Grundlinie der ersten Zeile. Am Ende einer kürzeren letzten Zeile
stünde es unter der ersten Zeile und stieße an deren Buchstaben: auf /bad/badsanierung (`ZEILEN_EM` 7,38 und 5,41) 0,985 em zurück,
mit der linken Kante unter dem „d“ von „Traumbad“; auf /bad (13,3 und 7,49) 2,9 em zurück, ganz unter „neues“. Ein kleineres Zeichen
ginge nur über `ZEICHEN_HOEHE`, und das steckt im Maß der H1 (`mitZeichen`): Größe und Umbruch der H1 auf /bad/badsanierung änderten
sich (G8). Der Plan schreibt „ab dem rechten Rand des Titelblocks“. Bleibt wie gebaut; Gewinn klein (Design +0,05, wie vom Prüfer
vorgeschlagen).

**Zu 7 (gering, Lot und Leitachse):** Das Lot auf die Achse zu setzen, legte zwei Linien übereinander (Überlappung `leitachse`) und
bräuchte einen Versatz nach der Achslage je Breite (mobil 8 px, ab md 16 px vor dem Satz; `ACHSE_LAGE` in `kern/Leitachse.tsx`, nicht
SF2-B). Die rote Linie bis an die Achse zu führen, zöge ein rotes Stück durch den Seitenrand, in dem Abschnittsmarke und Kantenkreuze
stehen; die Marke pausiert dort ausdrücklich „am Ursprung der Entfernungsskala“ (Leitachse.tsx). EV-B2 bleibt. Mit EV-B11 hat die
Linie jetzt eine eigene Aussage (Ende über dem Ort) und liest sich weniger als Kastenrand.

**Zu 9 (mittel, versprechen.offen):** SF2-A2 reicht `offen` in allen drei Vorlagen durch (A2-Notiz EV-1; Hunk für `OrtsSeite.tsx` im
Diff von A2, dazu `UM-E4-SICHT-FIX-2-a2.begleit-ortsseite.diff`), die Prop heißt `offen` wie das Datenfeld. Probe auf `git archive HEAD`
(`nach2/patchprobe/k2`): A2-Diff, danach mein Diff: `OrtsSeite.tsx` sauber, weil mein Hunk die Zeile des Versprechens nicht berührt; der
Begleitdiff legt sich auch direkt auf meine Datei (Versatz 2 Zeilen). Würde B dieselbe Zeile setzen, schlüge der Hunk von A2 fehl.
Darum in B keine Änderung. Nach dem Einspielen /blog, /standorte/wetzlar und /balkon-terrasse bei d1440 und m390 ansehen.

### 8.2 Entscheidungsvermerke der Nacharbeit

**EV-B11 · M2-B7: Rot bis zum Ende der Spalte des Ortes statt bis zum Ende seiner Zone**
- Ziel: Befund 1 (Prüfung Wirkung): Die Linie soll etwas über den Ort sagen. Bis zum Ende der Zone war sie wegen der füllenden Zonen
  (EV-B1) auf allen 13 Ortsseiten gleich lang.
- Alternativen: (a) feste Plätze 3 : 3 : 4 (O-6): Länge 3/10, 6/10, 10/10, aber Wetzlar wieder mit 70 % leerer Breite („rechts leer“
  war der Befund); (b) Länge nach Kilometern (5 von 50 km): ein Maßstab, den K-007 ausschließt (gerundete Angaben); (c) Erwartung auf
  +0,1 senken, Linie bleibt Schmuck; (d) gewählt: Vor der Zone des Ortes bleibt die ganze Kante rot, in der Zone des Ortes reicht das Rot
  bis zum Ende der Spalte des Ortes, dahinter läuft die Kante in Tinte weiter. Die Orte einer Zone stehen nach Entfernung, die Spalte ist
  also ihr Rang in der Zone.
- Bau: In der Zone des Ortes liegt über der Kante (1 px Tinte) ein Raster wie die Ortsliste (gleicher Innenabstand `px-4 lg:px-6`,
  gleiche Spalten `@xl:grid-cols-2`, `@4xl:grid-cols-4`, gleiche Fuge `@xl:gap-x-6`); darin ein 2-px-Strich `border-laser` über
  `col-span` bis zur Spalte des Ortes (`BIS_SPALTE_ZWEI`, `BIS_SPALTE_VIER`, Index = Stelle des Ortes in der Zone), mit `-mx-4 lg:-mx-6`
  bis an die linke Kante der Zone; in einer Spalte (schmale Zone, mobil) bis an die rechte Kante wie die Kanten davor (`@xl:mr-0` hebt
  das auf, sobald es Spalten gibt). Eine Kante je Zone, `einzugsband-kante` wie bisher: Sie zieht mit dem vorhandenen Auftritt auf
  (scale von links), reduziert, ruhig, ohne JavaScript und im Druck steht sie fertig. Keine neue Bewegung, kein Registereintrag, kein
  Text, keine Daten. Nur Tokens (werte 0).
- Wirkung, gemessen mit Bewegung nach 2,8 s (`nach2/band/nach.log`, Bilder `nach2/band/nach-<ort>-<gerät>-band.png`,
  Gegenüberstellung `nach2/band/paar-band-d1440.png`, Bögen `blatt-d1440.png`, `blatt-m390.png`): d1440 Aßlar Rot x 114–411, Wetzlar
  114–709, Solms 114–1006, Braunfels 114–1303 (je genau bis zur rechten Kante der Zelle des Ortes); Herborn und Gießen bis 1012, Dillenburg
  bis 1303; Haiger bis Friedberg (Zone ≤ 50 km einspaltig) bis 1327. d1920 ebenso (Wetzlar 278–947 von 276–1644). t1024 Wetzlar 50–501
  (zweite von vier Spalten), t768 zweite von zwei. m390 ist jede Zone einspaltig: Rot bis zur Kante, verschieden ist nur die Zahl der
  roten Kanten (eine, zwei oder drei). Ab Tablet trägt die Linie damit auf 7 von 13 Orten eine eigene Länge (vier in ≤ 10 km, zwei Längen
  in ≤ 25 km), die sechs Orte in ≤ 50 km teilen sich die volle Länge, solange ihre Zone einspaltig ist.
- Risiko: gering. CSS +17 B gzip gegenüber der ersten Fassung. Die Linie endet bei Orten der letzten Spalte 24 px vor der Zonenkante
  (Ende der Zelle), in einer Spalte an der Kante. Rückweg: der Zweig `ortsmass && zone.id === …` in `Einzugsband.tsx` entfällt und
  `vorDemOrt` wird wieder `i <= eigene` (Stand vor der Nacharbeit).

**EV-B12 · M2-B5: zwei fertige Arbeiten statt der Baustellenfotos des Plans (löst O-1 und EV-B8 ab)**
- Ziel: Befunde 8 und 12. E-113 Nr. 8 hält „die in E-065 entfernten Motive (… Duschnische ohne Armatur)“ draußen; beide Fotos des Plans
  zeigen genau dieses Motiv (offene Nische, keine Armaturen). Ich baue die Fassung, die unter beiden Lesarten von Nr. 8 (Motivregel oder
  nur die zwei Dateien aus E-065) gilt, und lasse die Entscheidung über die Lesart beim Orchestrator.
- Alternativen: (a) `fotos: []` (Rückweg aus EV-B8): Der hohe Befund 4b bliebe bis auf die Stimmen offen; (b) ort-gaeste-wc mit Weg zum
  Ratgeber „Gäste-WC“: das Foto mit Klobürste und Balken, das der Prüfer 4a in der Galerie von Wetzlar bemängelt hat, darum in M2-B1 aus
  GALERIE_START genommen; (c) Terrasse IMG_2539 (Gefälleschnitte zum Ablauf): Laub auf den Fliesen (Befund Wetzlar 4a); (d)
  leistungen-einstieg, barrierefrei-einstieg: wegen Schärfe bzw. Helligkeit unter den Grenzen schon ersetzt; (e) gewählt:
  start-beleg-dusche („Dusche mit Glastür und Mosaik“ → /bad, Name und Weg wie auf /) und leistungen-balkon („Balkon mit
  anthrazitfarbenen Fliesen“ → /balkon-terrasse, Name aus dem Alt-Text). Beide Güte B, „Nachher“, Glasfläche mit Weg zur Leistung (K-003
  „Bilder“) statt zum Artikel: Für fertige Fotos gibt es keinen Ratgeber, dem sie ohne erfundenen Bezug zugehören.
- Wirkung: /blog zeigt unter „Aus unserer Praxis.“ eine fertige Dusche (mit Armatur und Rinne) und einen fertigen Balkon, darunter der
  Satz zur Abdichtung und vier Stimmen (`bilder/nach/d1440/blog/07.png`). Seitenhöhe wie in der ersten Fassung (d1440 10157 → 10942).
  Jedes Foto steht danach zweimal (/ bzw. /leistungen und /blog), am gerenderten HTML aller zwölf Hauptansichten gezählt; kein Foto
  zweimal auf einer Ansicht außer der Vorher-nachher-Treppe auf /referenzen (Bestand, SF2-C). start-beleg-dusche war als großer
  Aufmacher der Ortsseiten „weich, dunstig“ (Laplace 182, etwa wie bad-beleg-1 mit 165); als Karte unter dem ersten Bildschirm ohne
  Vorrang zählt das weniger.
- Risiko: Abweichung von den im Plan genannten Fotos und Wegen. Rückweg zum Plan (wenn der Orchestrator Nr. 8 nur auf die zwei Dateien
  aus E-065 bezieht): in `blog.ts` die zwei Zeilen  
  `{ bild: 'entstehung-dusche-2', unterschrift: 'Fliesen schräg zum Ablauf geschnitten', href: '/blog/duschrinne-oder-punktablauf' },`  
  `{ bild: 'badsanierung-zweier-1', unterschrift: 'Dusche im Bau mit Nische', href: '/blog/wandnischen-dusche-planen' },`

### 8.3 Einspielen (Befund 13)

Probe auf `git archive HEAD` (8f4ad1a9, nur `_werkstatt/KERN.md`, `_werkstatt/register.json`, `src`, `test`; `nach2/patchprobe/`):
- B allein: alle 19 Dateien sauber.
- A2-Diff, dann B: **alle Dateien von B sauber** (vorher scheiterte KERN.md). Dafür ist meine Änderung in K-003 „Fläche“ zurückgenommen;
  die Zeile von HEAD sagt „das Einzugsband der Ortsseiten im Block, bis M2-B7 es breit setzt“ und stimmt als Verlauf. Wer sie nach dem
  Einspielen nachziehen will (in der Fassung von A2): „das Einzugsband der Ortsseiten breit über die Satzbreite mit Ortsmaß (M2-B7)“.
  Die volle Beschreibung des Ortsmaßes steht in K-008 (`einzugsband`), dort ändert nur B.
- Danach C: `_werkstatt/register.json` Hunk 1 scheitert (beide ändern die einzeilige `hinweis`; zeilenweise nicht vermeidbar, denn ohne
  meine Berichtigung stünde dort „Wissens- und Ortsseiten … ohne Zeilenmaske“). **Von Hand:** in der `hinweis` von B den Satz von C
  „Seit UM-E4-SICHT-FIX-2 M2-C4 (E-113 Nr. 6) rückt der Plan im Einstieg von /fliesen beim Laden in die Flucht (…).“ unmittelbar vor
  „Seit UM-E4-SICHT-FIX M-C6 (E-104 Nr. 9) löst einzugsband …“ einsetzen (dort steht er im Diff von C), danach `npm test`
  (bewegung.test). KERN.md von C legt sich mit Versatz auf A2 + B. Außerhalb von B: `WissensSeite.tsx` von C scheitert nach A2 in Hunk 2
  (die Zeile `offen=` aus A2 EV-1), das betrifft A2 und C.

### 8.4 Gewollte Pixeländerungen der Nacharbeit

`pixelvergleich.mjs` 4325 gegen 4530 (build-6), d1440, m390, t1024 (`nach2/pixel/pixelvergleich.json`): `/` und `/fliesen` 0 Pixel
(Gegenproben); Abweichungen nur auf `/standorte/wetzlar`, `/standorte/giessen`, `/standorte/limburg`, `/blog`, `/bad/badsanierung`, wie
in Abschnitt 3. Gegenüber der ersten Fassung ändern sich nur die rote Kante der eigenen Zone auf den Ortsseiten (EV-B11; Höhen gleich)
und die zwei Fotos auf `/blog` (EV-B12; Höhe gleich). Bildsatz nachher (343 Aufnahmen): Seitenhöhen Fall für Fall wie in Abschnitt 3.

### 8.5 Prüfzahlen nach der Nacharbeit (build-6)

- `npm test`: 280 Tests, 280 bestanden, 0 rot, 0 übersprungen (mit `.next`; `nach2/pruef/npm-test.txt`).
- `npx tsc --noEmit`: Exit 0, keine Ausgabe. `npx eslint` über die 15 geänderten Code- und Testdateien: Exit 0.
- `werte.mjs --dateien` über die 14 geänderten Code-Dateien: 481 Klassenvorkommen (157 eindeutig), **0 Befunde**. `globals.css` und
  `bewegung.css`: 4 × `dauer_zahl`, im unveränderten `vor` ebenso 4 (Bestand).
- `next build`: Exit 0 (`logs/build-6.log`); ein Stylesheet je Seite (/, /bad, /bad/badsanierung, /blog, /standorte/wetzlar geprüft).
- **CSS gzip** (`curl | gzip -9`): 25.218 B (4325) → 25.313 B (4530), **+95 B** (erste Fassung +78 B; roh 147.194 → 147.955); Richtwert
  SF2-B 0,6 KB.
- `erstesbild.mjs` (8 Seiten wie in Abschnitt 6; q844, m390, d1440; Erstbesuch und nach Einwilligung): 48 Fälle, Summe 208 → 208, alle
  fünf 40 → 40, **0 Abweichungen Fall für Fall** gegen `erstesbild/vor`. m360 mit 200 % Schrift (Hilfskopie `_sf2b-eb200.mjs`, wieder
  gelöscht): 16 Fälle, Summe 37 → 37, alle fünf 0 → 0, 0 Abweichungen (Altbefund OF-C3-4). Belege `erstesbild/nach2/`,
  `erstesbild/nach2-200/`.
- `bildsatz.mjs --png` (10 Seiten × d1440, d1920, m390): 343 Aufnahmen, 0 Fehler, 0 nicht 200, Überlauf 0, Konsole 0, Überlappung 30,
  nur `leitachse` (wie vorher).
- `axe.mjs --zustaende` (`/blog`, `/standorte/wetzlar`, `/standorte/giessen`, `/standorte/limburg`): 132 Läufe, ernst/kritisch 0,
  Verstöße 0 (`nach2/axe/axe.json`).
- Fotos am gerenderten HTML der zwölf Hauptansichten gezählt: außerhalb von /referenzen jedes Foto höchstens zweimal.
- Keine Lighthouse- und keine Zeitmessung (E-076). Hilfsskripte `_werkstatt/werkzeuge/_sf2b-band.mjs` und `_sf2b-eb200.mjs` gelöscht;
  `.next` und die echte Kopie von node_modules gelöscht, `node_modules` wieder als Verweis; Server 4530 gestoppt.

### 8.6 Selbst angesehen
- Band mit Bewegung im Endzustand bei d1440, d1920, t1024, t768 und m390 auf Aßlar, Wetzlar, Solms, Braunfels, Herborn, Dillenburg,
  Gießen, Limburg, Marburg, Friedberg: Das Rot endet über der Zelle des Ortes (Wetzlar über „Wetzlar ca. 5 km“, Solms über Solms),
  dahinter läuft die Kante in Tinte; auf Gießen rot durch ≤ 10 km und über der ersten Spalte von ≤ 25 km. Mobil wie vorher eine bis drei
  rote Kanten über die volle Breite.
- /blog d1440: fertige Dusche und fertiger Balkon nebeneinander, darunter der Satz zur Abdichtung.
- `nach2/blick/barrierefrei-erster-schirm.png` (Gegenprobe zu Befund 3), `nach2/blick/blog-kandidaten*.png` (geprüfte Fotos für /blog).
