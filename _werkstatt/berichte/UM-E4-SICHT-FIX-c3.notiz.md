# UM-E4-SICHT-FIX · Bauteil SF-C3 (Welle 2) · M-C9 → M-B5 → M-B8 (Priorität 3 nach E-106) · Kern 4.4.1

Grundlage: `vor` = Endstand SF-B2 nach der Nacharbeit (Kopie von `sfix/b2/baum`), `baum` = vor + SF-C3. Erster Anlauf brach um 22:43 UTC
durch den Neustart ab; Wiederaufnahme: Stand gesichtet (`diff -ruN vor baum`), gegen den Auftrag abgeglichen, eine Kommentarzeile
nachgetragen (Stimmen.tsx), Nachweise nachher vervollständigt. Bauten: build-1 (erster Anlauf) und build-2 (nach der Kommentarzeile);
die 57 statischen Dateien beider Bauten tragen dieselben Hash-Namen (`build1-static.txt`, `build2-static.txt`), alle Messungen auf
build-1 gelten also für den Endstand. Server: 4500 = baum, 4505 = vor (neu gebaut nur für die Abschnittsmessung, danach gelöscht),
4325 = reinraum-13315fa8 (lief durchgehend, nicht angefasst).

**Stand nach der Nacharbeit (Abschnitt 8):** Diff `$SCRATCH/sfix/c3/UM-E4-SICHT-FIX-c3.diff` neu erzeugt (14 Dateien, 751 Zeilen;
neu dabei `src/components/kern/Abschnitt.tsx`, EV-C3-8; Fassung des ersten Anlaufs aufbewahrt als `nach2/UM-E4-SICHT-FIX-c3-anlauf1.diff`).
`patch -p1 --dry-run` gegen HEAD **5cb4facc**: alle 14 Dateien ohne Versatz und ohne Fuzz (`nach2/patch-final-c3.log`); danach
`UM-E4-SICHT-FIX-c3-nachtrag-schnurzeichen-head.diff` (unverändert) ohne Versatz und ohne Fuzz (`nach2/patch-final-nachtrag.log`).
HEAD + c3: `tsc` 0; HEAD + c3 + Nachtrag-head: `tsc` 0, `eslint` 0, `next build` erfolgreich, im Bild geprüft (Abschnitt 8, N-2).
Nachweise der Nacharbeit unter `$SCRATCH/sfix/c3/nach2/`.

Ergebnis des ersten Anlaufs (überholt): Diff mit 13 Dateien, 649 Zeilen. `patch -p1 --dry-run` gegen den heutigen
Repository-Stand **5cb4facc (mit A2 und B2 eingespielt)**: alle 13 Dateien ohne Versatz und ohne Fuzz; `tsc --noEmit` über
HEAD + c3: 0 Fehler. Nachtrag Schnurzeichen getrennt (siehe EV-C3-1): `UM-E4-SICHT-FIX-c3-nachtrag-schnurzeichen-head.diff` (neu,
gegen HEAD 5cb4facc + c3, sauber) und die ältere Fassung `…-nachtrag-schnurzeichen.diff` (gegen den Stand ohne A2; auf 5cb4facc nur
mit Versatz 22 und Fuzz 1; nicht mehr verwenden). HEAD + c3 + Nachtrag-head: `tsc` 0, `eslint` über die drei Nachtragsdateien 0.

## 1 Maßnahmen und Stand

### M-C9 Bad-Unterseiten und Balkon · umgesetzt (Schnurzeichen als Nachtrag)
1. **/bad/badsanierung**
   - Normen-Absatz („Wir bauen barrierefreie Bäder … DIN 18040 …“) von `tun.absatz` nach `tun.absatzMehr`: steht am Ende von „Was wir
     tun“ im geschlossenen Aufklapper „Mehr erfahren“ (M-B4, Inhalt im DOM). Wortlaut und Textmarken gleich.
   - Neue statische Vignette **`wanne-dusche`** (`kern/vignetten/WanneDusche.tsx`, Eintrag in `index.ts`; neuer Typ `ZeichnungName` =
     Plan-Vignetten + Schnittzeichnungen eines Seitenthemas, `VignettenName` unverändert): Schnitt durch das Bad, Rohdecke und Wand
     schraffiert (Strich), alte Wanne gestrichelt mit Pfeil nach oben (ausgebaut), Fliesenboden ohne Kante vom Bad in die Dusche, im
     Gefälle zur Rinne an der Wand, zwei Gefällepfeile parallel zum Boden, Wandfliesen und Brause. **Nacharbeit:** neu komponiert
     (Wanne groß über der ganzen Dusche, kurzer Badboden, Gefällepfeile 10 statt 6 Einheiten über der Fliese, Schraffur 6 statt 4,
     Wand und Decke im selben Schraffurraster), viewBox unverändert 240 × 128; siehe Abschnitt 8, N-3. Zeichenmittel aus
     `kern/vignetten/zeichnen` (Planrahmen, Linie 1,5 px nicht skalierend, currentColor, `schraffur`, `pfeil`), viewBox 240 × 128.
     Gerendert (erster Anlauf) 2.101 B roh / 820 B gzip (Budget 40 KB; Nacharbeit siehe Abschnitt 6), keine IDs, `aria-hidden` über den Planrahmen, kein Rot, keine Bewegung (kein
     Registereintrag). `svg.mjs` (Seitenmodus, /bad/badsanierung, /bad/barrierefreies-bad, /balkon-terrasse, /, m390 und d1440): 0 Befunde.
   - Als **`tun.unterKopf`** mit einem vorhandenen Satz der Seite als Unterschrift („Der Einstieg bleibt dabei eben, ohne Stufe.“, zweiter
     Satz von Punkt 2; ohne Fachwort, die Glossar-Erklärungen bleiben beim ersten Vorkommen in den Punkten). `Tun.tsx`: die Zeichnung
     steht jetzt direkt nach Kopf und Satz vor Zeilen und Punkten, im Feld auf Fliese mit Fuge (wie die großen Momente), so breit wie die
     Liste darunter (ab lg Spalten 2 bis 3, d1440 x 517–1328 wie die Liste), Unterschrift im Lesemaß in `fs-3`. Nur diese Seite nutzt
     `unterKopf` (geprüft), keine Wirkung anderswo.
   - **Schnurzeichen** (dieselbe Vignette am Schnurende des Einstiegs, M-A1 Nr. 3): nicht im Hauptdiff, sondern als Nachtrag, weil
     `EinstiegMitte.tsx` (SF-A2) den Typ und `ZEICHEN_FORMAT` (240/128 = viewBox) kennen muss (EV-C3-1). Nacharbeit: im Bau HEAD +
     Hauptdiff + Nachtrag-head geprüft und im Bild belegt (Abschnitt 8, N-2).
   - Badanfrage im Abschluss: seit Welle 1 (M-B3), unverändert.
2. **/bad/barrierefreies-bad**
   - `gefaelle-dusche` in voller Rasterbreite zuerst: `GefaelleDusche` mit neuer Angabe `breit` (Feld über die ganze Rasterbreite,
     Unterschrift im Satz rechts), `tun.satz: 'rechts'`: Unterschrift, Punkte und Absatz darunter in den Spalten 2 bis 3 (vorher mittig im
     Lesemaß auf der Kante der Zeichnung, V-16 von SF-B2); `momentZuerst` bestand seit M-B7. **Nacharbeit:** die lange Einleitung steht
     mit im Satzblock rechts (eine Textkante bei x 517 auf d1440, EV-C3-8), die Zeichnung im Feld ab xl höchstens drei Viertel breit
     (EV-C3-9).
   - „So entsteht eine Dusche ohne Stufe“ als eigener Abschnitt mit mittigem Kopf über die Prop aus M-B6
     (`zweierbild.abschnitt: { id: 'entstehung', flaeche: 'fliese' }`): Abschnitt `#entstehung` zwischen „Unsere Arbeiten“ (Kalk) und
     den Stimmen (Kalk); die Flächen wechseln weiter Abschnitt für Abschnitt (gemessen: Kalk, Fliese, Kalk, Fliese … bis zum Schluss).
   - Badanfrage im Abschluss: seit Welle 1, unverändert.
3. **/balkon-terrasse**
   - `belegVorn` stand schon in `vor` (SF-B, M-B7), die Prüfliste ist seit SF-B2 die Punktliste aus M-B2: unverändert übernommen.
   - Neu: `gefaelle-balkon` in voller Rasterbreite (`GefaelleBalkon … breit`), Legende im Satz rechts, `tun.satz: 'rechts'` (Legende und
     Prüfliste fluchten in den Spalten 2 bis 3). **Nacharbeit:** Einleitung mit im Satzblock rechts (EV-C3-8), Zeichnung im Feld ab xl
     höchstens zwei Drittel breit, Legende im breiten Satz ohne Fugenkreuze (EV-C3-9).
   - Vergleich und Versprechen nach M-B4 seit Welle 1, unverändert.
   - Anker `#vergleich`: Die drei Unterseiten (balkonsanierung, terrassenplatten, stelzlager) verlinken je einmal
     `/balkon-terrasse#vergleich`, `id="vergleich"` steht auf der Seite (4500).
   - Glossar-Reihenfolge mit `lesbarkeit.mjs`: „Glossar offen“ 0 auf allen sieben Ansichten; die Liste der erfüllten Begriffe ist je
     Seite vorher und nachher gleich (balkon 11 Begriffe, badsanierung 13, barrierefrei 6).

### M-B5 Kundenstimmen einzeln mit Versatz · umgesetzt
- `Beleg.tsx`: ohne `stimmenGross` Form „einzeln“ mit Versatz (`versatz = !stimmenGross`; mit `stimmenEinzeln` wie angegeben, also
  / unverändert, /ueber-uns mit `stimmenGross` unverändert). `Stimmen.tsx`: Form „klein“ (vier Karten ab lg, Wortlaut `fs-2`) entfernt.
- Karte ab lg um ein Drittel versetzt (x 517–1328 auf d1440, 732–1644 auf d1920, auf allen betroffenen Seiten gemessen), Kennzeile im
  freien Drittel. Der Link „Alle Bewertungen bei Google lesen“ steht je Seite einmal, wenn eine gezeigte Google-Stimme gekürzt ist
  (`AlleBewertungen`, Stimmen.tsx, unverändert; so verlangt es M-B5). Berichtigt in der Nacharbeit: Im ersten Anlauf stand hier
  „bei jeder Stimme, nicht nur bei gekürzten“; das war falsch (Prüfung, Abschnitt 8, N-10). Auf allen sieben Ansichten steht der Link,
  weil jede Stimmenreihe mindestens eine gekürzte Google-Stimme zeigt.
- Markierung: die markierte Stelle trägt `hyphens-none` (nie getrennt; vorher „ordnungs-/gemäß“). Die Unterstreichung liegt ohnehin
  auf jedem Zeilenstück für sich. Die im Plan genannte Klasse für `box-decoration-break: clone` ist in der Nacharbeit entfallen: Sie
  wirkt auf `text-decoration` nicht (pixelgleich, Prüfung pruef-1), EV-C3-10.
- d1920 (und ab lg): Die Kennzeile hängt an einer Fuge, die von der Kartenoberkante über das freie Drittel läuft (`lg:border-t
  lg:border-fuge`); Kennzeile und Karte beginnen auf derselben Höhe.
- Wortlaut, Reihenfolge und Bewertungszahlen unverändert (G8). K-016 unverändert (Karussell, 8 s, Anhalten, Knöpfe, gleich große
  Karten): `funktion-navigation` grün, mit und ohne Bewegung.
- Wirkung auf Seiten mit mehreren Stimmen: /bad, /bad/badsanierung, /bad/barrierefreies-bad, /leistungen, /balkon-terrasse,
  /standorte/* (die Ortsseiten zeigen fünf Stimmen) und auf / (Kennzeile, Markierung). /fliesen und /blog zeigen je eine Stimme
  (Form ohne Karussell): keine Abschnittshöhe geändert.

### M-B8 Startseite: „Was wir tun“ als verlegte Reihe · umgesetzt
- `Tun.tsx`: `Leistungszeile` → `Leistungsreihe`: vier gleich hohe Fliesen (`auto-rows-fr`) an 1-px-Fugen (`gap-px` auf Fuge, Rahmen
  Fuge), je Fliese Linktext (`fs-3`, halbfett, trennt nur an der Fuge) und Pfeil im Feld unten rechts, die ganze Fliese ist die
  Trefffläche. Ab lg um ein Drittel versetzt (Satzblock `rechts`, Spalten 2 bis 3). Spalten nach der eigenen Breite (Container):
  ab 42 rem vier nebeneinander (Nacharbeit, vorher 36 rem; d1280 bis d2560 und t768 vier, t1024 jetzt zwei mal zwei), darunter zwei
  mal zwei, unter 20 rem (große Systemschrift) untereinander. Ohne Zeichnungen.
- Kopf und Satz unverändert, Band ab lg weiter mit Stufe 16 oben und unten (darunter Standard 16). Hover nur Unterstrich in Laser und
  Pfeil in Tinte, wie die Bereichszeilen derselben Datei; Fokus über den globalen `:focus-visible`. Kein JavaScript, keine Bewegung.
- `data-motion="zustand"` bleibt an jedem Link (Register unverändert).

## 2 Entscheidungsvermerke (Abweichungen vom Plan)

**EV-C3-1 Schnurzeichen als Nachtrag statt im Hauptdiff.**
- Ziel: M-C9 Nr. 1 verlangt `wanne-dusche` auch als `worum.schnurZeichen`.
- Alternativen:
  - (a) `EinstiegMitte.tsx` im Hauptdiff mitändern: Die Datei gehört SF-A2, ein Konflikt beim Zusammenführen wäre sicher.
  - (b) Nur `schnurZeichen` im Inhalt setzen: `tsc` rot (Typ `VignettenName`); zur Laufzeit hätte `ZEICHEN_FORMAT['wanne-dusche']`
    keinen Wert, die H1-Breite würde NaN.
  - (c) Nachtrag nach SF-A2 (gewählt): drei Stellen in `EinstiegMitte.tsx` (Import, `Schnurzeichen.vignette`, `ZEICHEN_FORMAT`), der Typ
    von `WorumInhalt.schnurZeichen` in `inhalt.ts` und eine Zeile in `bad-badsanierung.ts`.
- Wirkung: Bis der Nachtrag eingespielt ist, gleicht der Einstieg von /bad/badsanierung weiter /bad (a5 offen).
- Risiko (erster Anlauf): Der Nachtrag war nur über Patch-Probe, `tsc` und `eslint` geprüft. **Nacharbeit: im Bau geprüft** (HEAD
  5cb4facc + Hauptdiff der Nacharbeit + Nachtrag-head, eigener Abzug `nach2/head`, Server 4501; Abschnitt 8, N-2). Die Grenze bleibt:
  `EinstiegMitte.tsx` steht nicht im Hauptdiff (Auftrag der Nacharbeit: „diese Dateien fasst du nicht an“); `schnurZeichen` lässt sich
  über den Inhalt allein nicht setzen, weil `ZEICHEN_FORMAT: Record<VignettenName, number>` und `Schnurzeichen.vignette` dort den
  Namen tragen müssen. Vorschlag: Nachtrag-head als eigener Commit nach dem Hauptdiff. Die ältere Fassung
  `…-nachtrag-schnurzeichen.diff` (ohne A2) nicht mehr verwenden.
- Rückweg: den Nachtrag nicht anwenden.

**EV-C3-2 Angabe `breit` an `GefaelleDusche` und `GefaelleBalkon`.** Die Dateien `src/components/momente/gefaelle-*` stehen nicht in der
Spalte `dateien` von M-C9.
- Ziel: „in voller Breite zuerst“. Beide Momente begrenzten sich selbst (`mx-auto max-w-mass`).
- Alternativen: `className` von außen (fehlt bei GefaelleDusche; `clsx` ohne Zusammenführen, die CSS-Reihenfolge entschiede); eine
  Hülle (begrenzt die Figur nicht auf).
- Wirkung: Standard `false`, also unverändert auf allen anderen Aufrufen (nur die Entwicklungsseiten `werkstatt-schaufenster/*.dev`
  zeigen die Momente ohne `breit` neben dem neuen `tun.satz`; im Produktionsbau nicht enthalten).
- Risiko: gering.
- Rückweg: Angabe in den zwei `page.jsx` entfernen.

**EV-C3-3 Reichweite von M-B5.** Die Beschreibung macht „einzeln mit Versatz“ zum Standard jeder Seite ohne `stimmenGross`; die Liste
der Ansichten nennt sieben Seiten.
- Gebaut nach der Beschreibung. Gemessen ändert sich nur der Stimmen-Abschnitt dieser sieben Ansichten (und gleich gebaut aller
  /standorte/*); /fliesen und /blog haben je eine Stimme und bleiben in der Höhe gleich.
- Die Änderung am Standard von SF-B2 (Beleg) ist genau der Formwechsel aus M-B5, ohne weitere Wirkung.
- Rückweg: Formwahl in `Beleg.tsx` zurück, Form „klein“ aus dem Diff zurückholen.

**EV-C3-4 Ort und Feld der Zeichnung (`unterKopf`).**
- Vorher stand eine `unterKopf`-Zeichnung am Ende des Abschnitts ohne Feld.
- Jetzt steht sie vor den Punkten im Feld auf Fliese, in der Breite der Liste: Sie ist der Erklärmoment des Abschnitts (Befund a4/b4:
  „nur Textkästen, kein eigener Moment“), und so liest sie sich wie die großen Momente der Schwesterseiten.
- Nur /bad/badsanierung nutzt `unterKopf`.
- Rückweg: Block in `Tun.tsx` zurück ans Ende.

**EV-C3-5 Leistungsreihe (M-B8) im Detail.**
- „Innenabstand Stufe 16“ gelesen als Abstand des Bands (ab lg 16 statt 24, wie bisher); in der Fliese Feldinnenabstand Stufe 4
  (16 px), ab 48 rem Reihenbreite Stufe 6.
- Linktexte ohne Dauerunterstrich: Die Fliese mit Pfeil trägt die Erkennbarkeit, der Unterstrich erscheint beim Darüberfahren in Laser
  wie bei den Bereichszeilen (dieselbe Klasse, kein neues CSS dafür). Alternative wäre Tinte wie `linkKlassen`.
- Spaltenwechsel nach Containerbreite statt Bildschirmbreite (bei 200 % sicher).
- Risiko: Pixel nur in diesem Band.
- Rückweg: alte `Leistungszeile` aus dem Diff.

**EV-C3-6 Zwei Bänder auf / statt einem.**
- Der Auftrag nennt für M-B8 „Pixel nur in diesem Band“. M-B5 führt / in seiner Liste (b7 Kennzeile d1920, a2 Markierung), darum ändert
  sich auf / auch das Stimmen-Band: Fuge über dem freien Drittel ab lg; Markierung ohne Trennung, auf m390 eine Zeile mehr (+30 px).
- Alles andere auf / ist gleich hoch, und die Fensteraufnahmen sind bis zum Tun-Band pixelgleich.
- Rückweg: `lg:border-t lg:border-fuge` bzw. `hyphens-none` an der Markierung entfernen.

**EV-C3-8 Einleitung im Satzblock bei breitem Moment (Nacharbeit, Befund N-1).** `Abschnitt.tsx` steht nicht in der Spalte `dateien`.
- Ziel: Auf /bad/barrierefreies-bad und /balkon-terrasse standen in einer Bildschirmhöhe drei linke Kanten (Einleitung mittig im Lesemaß
  bei 417, Feld 112, Unterschrift und Liste 517 auf d1440).
- Gewählt: neue Angabe `einleitungSatz` an `Abschnitt` (Standard `satz`, also unverändert für jeden Aufruf ohne Angabe); `Tun` setzt sie
  nur mit großem Moment und eigenem `tun.satz` im Inhalt. Das tun nur diese zwei Seiten (geprüft: `satz: 'rechts'` steht nur in
  `barrierefreies-bad.ts` und `balkon-terrasse.ts`). Die lange Einleitung steht dann wie auf /bad/badsanierung linksbündig im Satzblock
  rechts, außerhalb der Leitfaden-Bahn, die H2 bleibt mittig.
- Alternativen: (a) Einleitung als erstes Kind des Inhalts: Sie stünde in der Bahn neben der Abschnittsmarke (verboten: „nie neben Kopf
  und Satz“) und 48 statt 24 px unter der H2; (b) `tun.satz` streichen und alles im Lesemaß lassen (zweite Lösung des Prüfers): keine
  Versatzkante mehr in diesem Bildschirm, die Unterschrift im Lesemaß unter einem 1216 px breiten Feld.
- Wirkung: d1440 Einleitung, Unterschrift bzw. Legende und Liste bei x 517, Feld 112–1328 (rechte Kante gleich der Liste); d1920 732 und
  276–1644; t1024 357 und 48–976; unter lg unverändert eine Spalte.
- Standards von SF-B2: Satzspiegel und Liste unverändert für jede andere Ansicht (Angabe nur hier gesetzt; Abschnittshöhen aller übrigen
  Abschnitte gleich, Abschnitt 6).
- Risiko: gering. Rückweg: `einleitungSatz` in `Tun.tsx` entfernen (Abschnitt behält die ungenutzte Angabe) oder beide Hunks zurück.

**EV-C3-9 Breite Momente begrenzt, Legende ohne Kreuze (Nacharbeit, Befunde N-1 und N-4).**
- Ziel: Die Zeichnung blieb in voller Rasterbreite der Blickfang, war aber d1920 rund 700 px hoch (Balkon); beim Sprung an den Abschnitt
  fehlten Rinne und Tropfen. Die Legende trug Fugenkreuze neben der nummerierten Prüfliste (zwei Markenarten; M-B2: das Kreuz gehört
  Kanten und Aufklappern).
- Gewählt: Das Feld bleibt in voller Rasterbreite, die Zeichnung darin ab xl höchstens drei Viertel (`gefaelle-dusche`) bzw. zwei Drittel
  (`gefaelle-balkon`, höher im Format 240 : 112) breit, mittig (`mx-auto xl:max-w-3/4` bzw. `xl:max-w-2/3`, Tokens). Die Legende im
  breiten Satz ohne Fugenkreuze (drei Sätze untereinander, Liste bleibt Liste). Ohne `breit` beide Momente unverändert.
- Alternativen: Höhe über `svh` (eigener CSS-Block in globals.css, mehr CSS, bei 1366 × 768 ohnehin nicht ganz im Fenster); das ganze Feld
  schmaler (neue Kante ohne Bezug); Zeichnung in den Satzblock rechts wie /bad/badsanierung (gegen den Plan „in voller Breite“).
- Wirkung: Feldhöhe d1440 Dusche 486 → 378, Balkon 593 → 413; d1920 Dusche 425, Balkon 464 (vorher rund 700). Nach dem Sprung an
  `#was-wir-tun` steht das Feld ganz im Fenster: d1440 Unterkante 855 bzw. 890 von 900, d1920 964 bzw. 1003 von 1080 (`nach2/blick2`).
- Risiko: gering, Pixel nur in diesen zwei Feldern und der Legende. Rückweg: die Klassen an `Planrahmen` und die Bedingung an der
  Legende entfernen.

**EV-C3-10 `box-decoration-clone` entfällt (Nacharbeit, Befund N-9).** Der Plan M-B5 nennt `hyphens-none` und `box-decoration-clone`.
Die Markierung ist eine `text-decoration`; die Klasse wirkt darauf nicht (Probe pruef-1 pixelgleich). Sie kostete nur Stylesheet und gab
dem Kommentar eine falsche Begründung. Wirkung: keine im Bild; CSS ohne `.box-decoration-clone`. Rückweg: Klasse wieder anfügen.

**EV-C3-11 „Mehr erfahren“ an der Liste (Nacharbeit, Befund N-8).** Folgt der Aufklapper direkt auf die Punkte (kein Absatz, kein Moment
dazwischen), ist die letzte Fuge der Liste seine obere Kante (Aufklapper nur `border-b`, ohne Abstand); vorher zwei volle Linien 33 px
übereinander. Die Punktliste (Standard von SF-B2) bleibt unverändert; geändert ist nur der Aufklapper in `Tun`, und `absatzMehr` nutzt nur
/bad/badsanierung. Rückweg: Bedingung `nachListe` entfernen.

**EV-C3-7 `vor` für die Abschnittsmessung neu gebaut (4505).**
- Nötig, um je Abschnitt vorher und nachher zu messen; 4325 trägt SF-B2 nicht.
- Dafür die echte Kopie von node_modules kurz nach `vor` verschoben und wieder zurück.
- `vor` danach unverändert (`next-env.d.ts` aus der Sicherung, `.next` gelöscht, Symlink wie vorher).

## 3 Gewollte Pixeländerungen je Ansicht (gegen vor = SF-B2-Endstand)
**Nacharbeit:** Werte in der Tabelle auf den Endstand nachgezogen (`nach2/abschnitte-4500-n.json` gegen `mess/abschnitte-4505.json`).
Gegenüber dem ersten Anlauf geändert sind nur die drei Abschnitte „Was wir tun“ von M-C9 und auf / die Reihe bei t1024 (zwei mal zwei);
jeder andere Abschnitt der sieben Ansichten ist auf d1440, d1920 und m390 so hoch wie im ersten Anlauf (±0,5 px). Zusätzlich
Vergleich der vorgerenderten Seiten (alle 172 HTML-Dateien, Asset-Namen normalisiert, Skript-Nutzdaten ausgenommen; `nach2/htmlvgl.py`,
`nach2/html-vor-baum-dom.json`): 152 gleich, 20 anders, genau / , /bad, /bad/badsanierung, /bad/barrierefreies-bad, /balkon-terrasse,
/leistungen, /blog (nur die Klasse `hyphens-none` an der Markierung) und die 13 Ortsseiten /standorte/*. /fliesen gleich. Drei Seiten
(/ueber-uns, /referenzen, /leistungen/untergrund/*) unterscheiden sich nur in den Verweisen der Client-Bündel im Skript, nicht im DOM.
Die Fensteraufnahmen der Nacharbeit (neues Aufnahmeskript) sind gegen die Vorher-Bilder des ersten Anlaufs nicht durchweg
pixelgleich (28 von 82 Fenstern vor dem ersten gewollten Abschnitt; die übrigen mit Kantenglättung und Teilpixel-Lagen, ohne
sichtbaren Unterschied, Stichprobe /bad d1440 Fenster 03). Ganzseitenbilder taugen nur als Übersicht: Playwright stellt dafür das
Fenster auf die volle Seitenhöhe, höhenabhängige Regeln (svh) setzen dann anders, z. B. die Stimmenkarte. Maßgeblich bleiben
Abschnittshöhen und DOM-Vergleich.

Messung (erster Anlauf): Abschnittshöhen im Browser (ruhig, `content-visibility` für die Messung sichtbar, getBoundingClientRect, deterministisch;
`mess/abschnitte-4505.json` gegen `mess/abschnitte-4500.json`) und Fensteraufnahmen ruhig (`bilder/*/ruhig-ausschnitte`). Die
Fensteraufnahmen sind auf allen 21 Fällen **bis zum ersten gewollten Abschnitt pixelgleich**. Ab dort verschiebt sich alles um die
Höhendifferenz; Vergleiche nach der Verschiebung zeigen in Ganzseiten- und Abschnittsaufnahmen Rauschen (Ganzseite: O-5;
Abschnittsaufnahmen über Fensterhöhe wechselten auch auf demselben Bau von Lauf zu Lauf). Deshalb belege ich „sonst nichts“ über
die Abschnittshöhen: Alle nicht genannten Abschnitte sind auf d1440, d1920 und m390 gleich hoch (±0,4 px).

| Ansicht | Abschnitt: Änderung | d1440 | d1920 | m390 | erste Abweichung (Seiten-y, d1440 / d1920 / m390) |
|---|---|---|---|---|---|
| / | Was wir tun: Reihe aus vier Fliesen, ab lg Spalten 2–3 (M-B8) | 445,7 → 538,1 | 502,2 → 605,8 | 502,3 → 645,4 | 2045 / 2308 / 2219 |
| / | Kundenstimmen: Fuge über dem freien Drittel, Markierung ohne Trennung (M-B5) | gleich hoch | gleich hoch | 707,8 → 737,8 | |
| /bad | Kundenstimmen einzeln mit Versatz | 778,4 → 765,0 | 875,8 → 861,9 | 643,6 → 735,8 | 7156 / 8105 / 6819 |
| / | Was wir tun bei t1024 (Nacharbeit): Reihe zwei mal zwei statt vier Spalten | – | – | – | t1024 Abschnitt 604 px |
| /bad/badsanierung | Was wir tun: Zeichnung wanne-dusche (neu gezeichnet) vor den Punkten, Normen in „Mehr erfahren“ an der letzten Fuge | 1344,9 → 1721,6 | 1513,1 → 1936,7 | 1485,0 → 1546,1 | 2364 / 2715 / 1903 |
| /bad/badsanierung | Kundenstimmen einzeln | 780,4 → 767,0 | 877,8 → 863,9 | 645,6 → 737,8 | |
| /bad/barrierefreies-bad | Was wir tun: Feld volle Breite (Zeichnung ab xl ¾), Einleitung/Unterschrift/Punkte/Absatz rechts | 1470,3 → 1590,1 | 1654,0 → 1788,8 | gleich | 2374 / 2725 / 4945 |
| /bad/barrierefreies-bad | Unsere Arbeiten ohne Zweierbild | 1874,1 → 1106,9 | 2203,8 → 1293,3 | 1887,6 → 867,7 | |
| /bad/barrierefreies-bad | neu: „So entsteht eine Dusche ohne Stufe“ (Fliese) | neu 994,5 | neu 1166,6 | neu 1145,7 | |
| /bad/barrierefreies-bad | Kundenstimmen einzeln | 778,4 → 765,0 | 875,8 → 861,9 | 643,6 → 735,8 | |
| /balkon-terrasse | Kundenstimmen einzeln (vor Tun, belegVorn) | 780,4 → 717,8 | 877,8 → 808,2 | 645,6 → 737,8 | 3705 / 4224 / 3162 |
| /balkon-terrasse | Was wir tun: Feld volle Breite (Zeichnung ab xl ⅔), Einleitung, Legende (ohne Kreuze) und Prüfliste rechts | 1638,7 → 1742,5 | 1843,6 → 1960,2 | 1664,2 → 1636,8 | |
| /leistungen | Kundenstimmen einzeln | 780,4 → 767,0 | 877,8 → 863,9 | 645,6 → 737,8 | 6475 / 7342 / 7093 |
| /standorte/wetzlar (alle Ortsseiten) | Kundenstimmen einzeln | 780,4 → 767,0 | 877,8 → 863,9 | 645,6 → 737,8 | 5241 / 5897 / 4858 |
| /fliesen, /blog | keine Abschnittshöhe geändert (eine Stimme; /blog: Markierung bei c-wolf ohne Trennung, bei diesen Breiten ohne Umbruchänderung) | – | – | – | |
| übrige Ansichten | keine (kein geänderter Baustein im Einsatz) | | | | |

Summe der Abschnittshöhen in main (vor → Endstand der Nacharbeit, px):
- d1440: / 7244 → 7337 · /bad 10781 → 10768 · /bad/badsanierung 8516 → 8880 · /bad/barrierefreies-bad 7773 → 8107 ·
  /balkon-terrasse 8952 → 8994 · /leistungen 8807 → 8793 · /standorte/wetzlar 7607 → 7593.
- d1920: / 8157 → 8261 · /bad 12179 → 12165 · /bad/badsanierung 9685 → 10095 · /bad/barrierefreies-bad 8894 → 9271 ·
  /balkon-terrasse 10127 → 10174 · /leistungen 9964 → 9950 · /standorte/wetzlar 8557 → 8543.
- m390: / 8062 → 8236 · /bad 10975 → 11067 · /bad/badsanierung 8263 → 8417 · /bad/barrierefreies-bad 7404 → 7622 ·
  /balkon-terrasse 9034 → 9099 · /leistungen 9288 → 9381 · /standorte/wetzlar 7232 → 7324.

Seitenhöhen ruhig (Ganzseitenaufnahme, nur Übersicht, siehe oben; vor aus dem ersten Anlauf → Endstand der Nacharbeit):
- d1440: / 9014 → 9106 · /bad 12551 → 12538 · /bad/badsanierung 10286 → 10649 · /bad/barrierefreies-bad 9543 → 9876 ·
  /balkon-terrasse 10722 → 10763 · /leistungen 10576 → 10563 · /standorte/wetzlar 9376 → 9363.
- d1920: / 10146 → 10250 · /bad 14168 → 14154 · /bad/badsanierung 11674 → 12084 · /bad/barrierefreies-bad 10884 → 11260 ·
  /balkon-terrasse 12116 → 12163 · /leistungen 11953 → 11939 · /standorte/wetzlar 10546 → 10532.
- m390: / 10277 → 10473 · /bad 13189 → 13305 · /bad/badsanierung 10477 → 10654 · /bad/barrierefreies-bad 9618 → 9859 ·
  /balkon-terrasse 11248 → 11336 · /leistungen 11502 → 11618 · /standorte/wetzlar 9446 → 9562. (m390 auf fünf Seiten 23 px mehr als
  die Ganzseitenbilder des ersten Anlaufs bei gleichen Abschnittshöhen in main und gleichem Fuß (2238 px auf 4500 und 4325, mit fester
  und laufender Uhrzeit): Unterschied des Aufnahmeverfahrens, nicht des Baus.)

Kein Pixel: Typ `ZeichnungName`, Kommentare, Wegfall der ungenutzten Form „klein“ im Code, Angabe `einleitungSatz` ohne Wert
(jede andere Ansicht), Wegfall von `box-decoration-clone`.

## 4 Textvorschläge (für TEXTVORSCHLAEGE.md; bis zur Antwort bleiben die Texte)
- **T-C3-1** · /bad/barrierefreies-bad · H2 des neuen Abschnitts `#entstehung` (`beleg.zweierbild.titel`)
  - heute: „So entsteht eine Dusche ohne Stufe“
  - Vorschlag: „So entsteht eine Dusche ohne Stufe.“
  - Grund: Als eigener Abschnitt steht der Kopf jetzt in der Reihe der H2 der Seite, die alle mit Punkt enden.
- **T-C3-2** · /bad/badsanierung · Unterschrift der Zeichnung `wanne-dusche` (`tun.unterKopf.unterschrift`)
  - heute: „Der Einstieg bleibt dabei eben, ohne Stufe.“ (Satz aus Punkt 2, wie der Plan es verlangt)
  - Vorschlag: „Die Wanne kommt raus. Der Boden läuft eben in die Dusche und neigt sich zur Rinne.“
  - Grund: Die Unterschrift steht direkt über Punkt 2 und wiederholt dessen Satz. Der Vorschlag sagt, was man in der Zeichnung sieht
    (Ruhe-Regel „Zeichnungen mit einem Satz, was man sieht“).
- **T-C3-3** · /balkon-terrasse · Punkt 1 der Prüfliste (`tun.punkte[0]`)
  - heute: „Das Wasser läuft ab. Der Belag bekommt ein [[gefaelle|Gefälle]] von mindestens 1,5 bis 2 %.“
  - Vorschlag: „Genug Gefälle. Wir planen mindestens 1,5 bis 2 % [[gefaelle|Gefälle]].“
  - Grund: Befund b3 („Gefälle dreimal erklärt“). Die Legende der Zeichnung direkt darüber sagt schon „So läuft der Regen zum Rand“;
    der Punkt nennt dann nur noch die Zahl. Die Glossar-Erklärung bleibt beim ersten Vorkommen.
- **T-C3-4** (Nacharbeit) · /balkon-terrasse · erste Zeile der Legende von `gefaelle-balkon` (`LEGENDE[0]` in GefaelleBalkon.tsx)
  - heute: „Die Platten liegen leicht schräg, weg vom Haus. So läuft der Regen zum Rand.“
  - Vorschlag: „Die Platten liegen leicht schräg, weg vom Haus.“
  - Grund: Prüfung N-4 (Gefälle dreimal in einem Bildschirm: Zeichnung, Legende, Punkt 01). Der Titel der Legende direkt darüber
    sagt schon „Der Regen läuft vom Balkon ab.“; zusammen mit T-C3-3 steht das Gefälle dann einmal erklärt (Legende) und einmal als
    Zahl (Punkt 01). Die Zeile ganz zu streichen hieße Inhalt wegnehmen (G4), darum nur der doppelte Satz.

## 5 Offene Fragen
- **OF-C3-1** Nachtrag Schnurzeichen: In der Nacharbeit gebaut und im Bild geprüft (HEAD 5cb4facc + Hauptdiff + Nachtrag-head;
  Abschnitt 8, N-2; Bilder `bilder/nachtrag/`). Entscheidung des Orchestrators: als eigenen Commit nach dem Hauptdiff einspielen,
  sonst bleibt a5 („Einstieg gleicht /bad“) offen. Nur die Fassung `-head.diff` verwenden.
- **OF-C3-2** Hilfsskripte: Der Commit c57491ad („Buchführung: Neustart während SF-C3 …“) hat meine Hilfsskripte
  `_werkstatt/werkzeuge/sfixc3-{band,bilder,erstesbild200,mass,render}.mjs` versioniert. Ich habe sie auftragsgemäß gelöscht;
  `git status` zeigt dort jetzt 5 × D. Bitte die Löschung mitcommitten (Git habe ich nicht angefasst).
- **OF-C3-3** (erledigt in der Nacharbeit) Die Zeichnung `wanne-dusche` ist neu komponiert: Die Wanne steht groß über der Dusche, der
  Badboden ist kurz, links bleibt nur noch ein schmaler Streifen über dem Boden frei (Abschnitt 8, N-3). viewBox unverändert.
- **OF-C3-4** m360 bei 200 %: vorher und nachher 0/14 Fälle voll, je Fall gleich (Ursachen: Kopfleiste und Formularleiste, wie bei
  SF-B2 0/24); kein neuer Befund, aber weiter offen. Nacharbeit: unverändert 0/14 (baum) bzw. 0/6 (HEAD + c3 + Nachtrag).
- **OF-C3-5** (Nacharbeit, N-5) / „Was wir tun“: Die Reihe folgt weiter direkt auf die Auswahl „Was möchten Sie ändern?“ mit
  überlappenden Zielen. Das ist die Planentscheidung von M-B8 (Streichen nähme Text und Seitenformel weg); a1/b2 sind damit nur
  gemildert, nicht behoben.
- **OF-C3-6** (Nacharbeit, N-6) Stimmen: Unter der Kennzeile bleibt ab lg Leerraum (d1920 rund 250 px), kurze Stimmen stehen in der
  gleich hohen Karte mit Luft (K-016 „gleich große Karten“), mobil braucht die Kopfzeile zwei Zeilen. Vom Prüfer als „kein Muss“
  eingestuft; nicht geändert. Möglicher nächster Schritt: Kennzeile am Fuß der Karte.
- **OF-C3-7** (Nacharbeit, N-7) /bad/barrierefreies-bad: Das Fotopaar in „Unsere Arbeiten“ (Karussell-Karten, 24 px Abstand, x 204–1236)
  und das Zweierbild in „So entsteht“ (Glaspaar an der 1-px-Fuge, x 216–1224) haben fast, aber nicht genau dieselben Kanten; „So
  entsteht“ ist bei d1440 995 px hoch. Beides sind Standards von SF-B2 (Beleg, M-B6: Paar im Karussell, Glaspaar, glas-hoch 70svh);
  eine Angleichung wirkte auf jede Seite mit diesen Bausteinen und liegt außerhalb dieses Bauteils (Auftrag: Standards von SF-B2 nur,
  soweit M-B5 und M-B8 es verlangen). Bitte bei SF-B2 bzw. im nächsten Anlauf entscheiden.
- **OF-C3-8** (Nacharbeit, N-3 und N-4) Unterschrift auf /bad/badsanierung wiederholt Punkt 02, auf /balkon-terrasse steht das Gefälle
  dreimal: beides nur über Text lösbar (T-C3-2, T-C3-3, T-C3-4 warten auf den Auftraggeber, E-108 Nr. 6).

## 6 Prüfzahlen

### 6a Endstand nach der Nacharbeit (baum, Bau build-n3 auf 4500; Belege unter `nach2/`)
- `npm test`: 270 Tests, 270 bestanden, 0 fehlgeschlagen, 0 übersprungen (mit Produktionsbau, `stylesheets` grün; `nach2/npm-test.log`).
- `npx tsc --noEmit`: 0 Fehler (`nach2/tsc.log`). `npx eslint` über die 14 geänderten Dateien: 0 Befunde (`nach2/eslint.log`).
  HEAD 5cb4facc + c3: `tsc` 0 (`nach2/tsc-head-ohne-nachtrag.log`); HEAD + c3 + Nachtrag-head: `tsc` 0, `eslint` über 14 Dateien +
  EinstiegMitte.tsx 0 (`nach2/tsc-head.log`, `nach2/eslint-head.log`).
- `werte.mjs --dateien` (14 Dateien, 668 Klassenvorkommen, 191 eindeutig): 0 Befunde (`nach2/werte/`, `nach2/werte.log`). globals.css,
  bewegung.css und register.json unverändert (kein Hunk im Diff).
- `next build`: erfolgreich, 179/179 Seiten (`nach2/build-n3.log`); HEAD + c3 + Nachtrag erfolgreich (`nach2/build-head.log`); vor für
  den DOM-Vergleich neu gebaut (`nach2/build-vor.log`, danach gelöscht).
- CSS (ein Stylesheet je Bau): vor 143.156 B roh / 24.681 B gzip -9 (24.804 gzip -6); Endstand 143.227 B / 24.693 B (24.815);
  **SF-C3 +71 B roh, +12 B gzip -9** (erster Anlauf +155 / +30). Neu gegenüber vor: `@3xl:p-6`, `auto-rows-fr`, `self-end`,
  `xl:max-w-2/3`, `xl:max-w-3/4`; weg: `gap-x-12`, `justify-items-center`, `lg:w-1/4` (und gegenüber dem ersten Anlauf
  `box-decoration-clone`). HEAD + c3 + Nachtrag: 146.367 B / 25.129 B gzip -9 (zur Einordnung; HEAD allein nicht gebaut).
- `erstesbild.mjs` (7 Ansichten × m390, q844, d1440 × Erstbesuch und nach Einwilligung = 42 Fälle): 34 voll, je Fall gleich wie vor
  (`pruef/erstesbild-vor`) und wie der erste Anlauf, 42/42. m360 mit 200 % (14 Fälle): 0 voll, je Fall gleich 14/14
  (`nach2/erstesbild`, `nach2/erstesbild200`). HEAD + c3 + Nachtrag (/, /bad, /bad/badsanierung × m390, q844, d1440, d1920 = 24 Fälle):
  21 voll, je Fall gleich wie die Probe des Prüfers mit der alten Zeichnung (24/24); m360 200 %: 0/6, je Fall gleich (`nach2/eb-head*`).
  Hauptknopf und Telefon stehen überall im ersten Bildschirm außer den bekannten q844-Erstbesuch-Fällen (Cookie-Hinweis) und m360/200 %.
- axe (`--zustaende`, 7 Ansichten × m390, d1440): 42 Läufe, ernst/kritisch 0 (`nach2/axe`). HEAD + c3 + Nachtrag (3 Ansichten): 18
  Läufe, 0 (`nach2/axe-head`).
- `svg.mjs` (Seitenmodus): /bad/badsanierung, /bad/barrierefreies-bad, /balkon-terrasse, / × m390, d1440: 0 Befunde (`nach2/svg`);
  HEAD + c3 + Nachtrag /bad/badsanierung (mit Schnurzeichen, 165 Inline-SVG): 0 (`nach2/svg-head`). `wanne-dusche` gerendert rund
  1,8 KB roh / 0,7 KB gzip (Nachbildung des Markups; erster Anlauf 2,1 / 0,8 KB).
- `lesbarkeit.mjs` (7 Ansichten + drei Balkon-Unterseiten): je Seite gleich wie der erste Anlauf (Flesch, Satzzahl, Glossar, Urteil;
  GRÜN 5 / ROT 5 wie vorher, ROT = Floskel in der H1 von / und /bad/badsanierung (G8) und die Balkon-Unterseiten im Altbestand)
  (`nach2/lesbarkeit`).
- Funktionsspecs: in der Nacharbeit nicht erneut gelaufen (keine Änderung an Formularen, Navigation, Karussell-Logik oder Kontaktwegen;
  erster Anlauf 104/8 in beiden Bewegungszuständen).
- Bilder (erneuert): `bilder/nach/{d1440,d1920,m390}/{ruhig/<seite>.png | ruhig-ausschnitte/<seite>/NN.png | bewegt/<seite>/NN.png}` für
  die sieben Ansichten, PNG, DPR 1, Einwilligung abgelehnt; ruhig über den Bewegungsschalter (`data-bewegung="ruhig"` 21/21), bewegt je
  Fensterhöhe nach langsamem Scrollen bis zum Endzustand; 42 Läufe, alle HTTP 200; 537 Aufnahmen. `bilder/vor/` unverändert aus dem
  ersten Anlauf. Abschnitte der Nacharbeit: `bilder/nach/abschnitte/` („Was wir tun“ der drei M-C9-Seiten bei d1440, d1920, t1024, m390
  mit Sprungaufnahme `…-sprung.png`, / bei t768 bis d1920 und m390; Maße `mass-m-c9.json`, `mass-start.json`). Schnurzeichen:
  `bilder/nachtrag/` (ruhig und bewegt, /bad/badsanierung, /bad, / bei t1024, d1280, d1440, d1920, m390; `schnur.json`;
  `vergleich-d1440-badsanierung-bad-zeichen.png`). Vorher-Ausschnitte der Prüfer: `pruef-0/crops/b{b,s,t}-tun-vor-d1440.png`.

### 6b Erster Anlauf (überholt, soweit 6a abweicht; vorher = vor auf 4505, nachher = baum auf 4500)
- `npm test`: 270 Tests, 270 bestanden, 0 übersprungen (mit Produktionsbau; `stylesheets` grün). Log `npm-test.log`.
- `npx tsc --noEmit`: 0 Fehler. `npx eslint` über die 13 geänderten Dateien: 0 Befunde. Außerdem HEAD 5cb4facc + c3: `tsc` 0;
  HEAD + c3 + Nachtrag-head: `tsc` 0, `eslint` 0.
- `werte.mjs --dateien` (13 Dateien, 554 Klassenvorkommen, 144 eindeutig): 0 Befunde (`pruef/werte-nach/`). Vorher (erster Anlauf) 0.
  globals.css, bewegung.css und register.json unverändert.
- `next build`: erfolgreich, 179/179 Seiten (build-1 und build-2, `build-1.log`, `build-2.log`); vor: `build-vor2.log`.
- CSS (ein Stylesheet je Bau, auf /, /bad/badsanierung, /balkon-terrasse, /fliesen, /kontakt, /blog dieselbe Datei):
  - vor 143.156 B roh / 24.681 B gzip -9 (24.804 gzip -6);
  - nachher 143.311 B / 24.711 B (24.833);
  - **SF-C3 +155 B roh, +30 B gzip -9**.
  - Gegen 4d2d3fef (23.418 B nach SF-B2-Notiz): +1.293 B (Welle 1 +1.141, SF-B2 und SF-C3 zusammen +152). Der Zuwachs von SF-A2 ist
    darin nicht enthalten (parallel); vom Budget 4 KB bleiben ohne A2 rund 2,7 KB.
- `erstesbild.mjs` (7 Ansichten × m390, q844, d1440 × Erstbesuch und nach Einwilligung = 42 Fälle): vorher 34 voll, nachher 34 voll,
  je Fall gleich 42/42 (q844 Erstbesuch 1/5 durch den Cookie-Hinweis, wie vorher). m360 mit 200 % (14 Fälle): 0 voll vorher und
  nachher, je Fall gleich 14/14. Belege `pruef/erstesbild-{vor,nach}`, `pruef/erstesbild200-{vor,nach}`.
- axe (`--zustaende`, 7 Ansichten × m390, d1440): 4500 42 Läufe, 0 Verstöße; 4325 42 Läufe, 0 Verstöße; vor ohne Zustände 14/0.
- `svg.mjs` (Seitenmodus, 4 Ansichten × m390, d1440): 0 Befunde auf 4500 und 4325.
- `lesbarkeit.mjs`:
  - 7 Ansichten wie vorher, GRÜN 5 / ROT 2 (Floskel in der H1 von / und /bad/badsanierung, G8). Flesch gleich bis auf
    /bad/badsanierung 66,1 → 66,2; Sätze dort 59 → 60 (die Bildunterschrift zählt mit). Glossar offen 0, erfüllte Begriffe je Seite gleich.
  - Die drei Balkon-Unterseiten (Altbestand, nicht geändert) sind ROT wie bisher.
- Funktionsspecs gegen 4500 (`funktion-navigation`, `funktion-badanfrage`, `funktion-kontaktwege`, `funktion-hero-kontakt`): reduziert
  104 bestanden / 8 übersprungen, mit Bewegung 104 / 8.
- Bilder: `bilder/{vor,nach}/{d1440,d1920,m390}/{ruhig/<seite>.png | ruhig-ausschnitte/<seite>/NN.png | bewegt/<seite>/NN.png}` für
  /, /bad, /bad/badsanierung, /bad/barrierefreies-bad, /balkon-terrasse, /leistungen, /standorte/wetzlar. PNG, DPR 1, Einwilligung
  abgelehnt. Ruhig über den Bewegungsschalter (`data-bewegung="ruhig"` in 42/42 ruhigen Aufnahmen bestätigt); bewegt je Fensterhöhe nach
  langsamem Durchscrollen (Endzustand); alle 63 Läufe HTTP 200. Nahaufnahmen der Bänder: `blick2/` (u. a. `start-tun-d1440.png`,
  `start-tun-m390.png`, `bs-tun-d1440.png`, `m390-drei.png`, `bb-entstehung-d1440.png`, `bt-tun-d1440.png`,
  `start-stimmen-d1920.png`, `bad-stimmen-d1440.png`, `wetzlar-m390-vergleich.png`).
- Kanten (`mess/kanten-nach.json`): Zeichnung badsanierung x 517–1328 = Liste 517–1328 (d1440), 732–1644 (d1920); Stimmenkarte auf
  allen vier gemessenen Ansichten 517–1328 bzw. 732–1644; Leistungsreihe auf / 517–1328 bzw. 732–1644.

## 7 Aufräumen
- Server 4500 und 4505 gestoppt (nur eigene Prozesse, Arbeitsverzeichnis baum bzw. vor); 4325 lief durchgehend.
- In baum: `.next` und die echte Kopie von node_modules gelöscht, `node_modules` wieder Symlink auf `/home/user/tezgel/node_modules`,
  `next-env.d.ts` gleich vor, kein `tsconfig.tsbuildinfo`. In vor: `.next` gelöscht, `next-env.d.ts` aus der Sicherung, Symlink wie
  vorher.
- Hilfsskripte `sfixc3-{bilder,erstesbild200,mass,render,band,abschnitte}.mjs` aus `_werkstatt/werkzeuge` gelöscht (OF-C3-2).
  Unzuverlässige Abschnittsaufnahmen gelöscht.
- Nacharbeit: Server 4500 (baum) und 4501 (HEAD + c3 + Nachtrag) gestoppt, nur eigene Prozesse (Arbeitsverzeichnis geprüft); 4325 lief
  durchgehend, nicht angefasst. In baum `.next` und die echte Kopie von node_modules gelöscht, `node_modules` wieder Symlink,
  `next-env.d.ts` gleich vor, kein `tsconfig.tsbuildinfo`. vor: für den DOM-Vergleich kurz gebaut, danach `.next` und node_modules-Kopie
  gelöscht, Symlink und `next-env.d.ts` wie vorher. Abzug `nach2/head` (HEAD per `git archive`, nur lesend) und Probe gelöscht.
  Hilfsskripte `sfixc3n-{blick,bilder,abschnitte,erstesbild200,schnur,fuss}.mjs` aus `_werkstatt/werkzeuge` gelöscht; `git status`
  im Repository unverändert gegenüber dem Beginn (nur die 5 × D aus OF-C3-2).

## 8 Nacharbeit (Prüfung Welle 2, elf Befunde)
Jeden Befund am eigenen Bau nachgeprüft (baum, build-n3 auf 4500; Nachtrag auf HEAD + c3 + Nachtrag-head, 4501). Behoben sind alle
bestätigten Befunde der Schwere mittel, soweit sie ohne Textänderung und innerhalb der Grenzen des Auftrags lösbar sind, und die
geringen, die klar richtig und klein waren. Grenzen eingehalten: EinstiegMitte.tsx, Quadratmeter.tsx, Leitachse.tsx, Seitenformel.tsx
und start.ts nicht angefasst; globals.css, bewegung.css und register.json ohne Hunk; Wortlaut der Kundenstimmen, Bewertungszahlen und
alle Texte gleich (G8, E-108 Nr. 6); Mail-Logik nicht berührt; keine Lighthouse- und keine Zeitmessung.

- **N-1 (mittel) Drei linke Kanten auf /bad/barrierefreies-bad und /balkon-terrasse · bestätigt, behoben.** Am Bau vorher d1440
  Einleitung 417, Feld 112–1328, Unterschrift und Liste 517. Jetzt steht die lange Einleitung mit im Satzblock rechts (EV-C3-8): d1440
  Einleitung, Unterschrift bzw. Legende und Liste bei 517, das Feld 112–1328 mit derselben rechten Kante wie die Liste; d1920 732 /
  276–1644, t1024 357 / 48–976; m390 eine Spalte wie vorher. Belege `bilder/nach/abschnitte/bad__barrierefreies-bad-was-wir-tun-*.png`,
  `balkon-terrasse-was-wir-tun-*.png`, `mass-m-c9.json`.
- **N-2 (mittel) Schnurzeichen fehlt im Hauptdiff, als Zeichen zu dicht · bestätigt, teilweise behoben.** Die Grenze des Auftrags
  bleibt: Über den Inhalt allein lässt sich `schnurZeichen: { vignette: 'wanne-dusche' }` nicht setzen, weil EinstiegMitte.tsx den
  Namen in `ZEICHEN_FORMAT: Record<VignettenName, number>` und `Schnurzeichen.vignette` tragen muss (sonst `tsc` rot und zur Laufzeit
  NaN im Maß der H1). Darum bleibt das Zeichen im getrennten Nachtrag-head (unverändert, drei Dateien), jetzt **im Bau geprüft**: HEAD
  5cb4facc + Hauptdiff der Nacharbeit + Nachtrag ohne Versatz und Fuzz, `tsc` 0, `eslint` 0, `next build` erfolgreich. H1
  „Ihr neues Traumbad zum Festpreis.“ unverändert, kein Überlauf; das Zeichen steht ab lg am Schnurende (t1024 x 845–992, d1280
  1075–1248, d1440 1154–1344 und 101 px hoch, d1920 1449–1662), unter lg nicht. `erstesbild` 21/24 und 0/6 je Fall gleich wie vor der
  neuen Zeichnung, axe 0, svg.mjs 0. Die Zeichnung selbst ist neu gezeichnet (N-3), damit sie auch eine H1-Zeile hoch liest: große
  gestrichelte Wanne mit Pfeil, zwei Gefällepfeile mit Abstand über der Fliese, Schraffur nicht mehr als Fläche
  (`bilder/nachtrag/vergleich-d1440-badsanierung-bad-zeichen.png`: oben /bad/badsanierung, Mitte /bad, unten das Zeichen dreifach).
  Offen: a5 ist erst behoben, wenn der Orchestrator den Nachtrag als eigenen Commit einspielt (OF-C3-1).
- **N-3 (mittel) wanne-dusche dünn, Unterschrift doppelt · bestätigt; Zeichnung behoben, Unterschrift nicht.** Neu komponiert,
  viewBox gleich (240 × 128): Wanne über der ganzen Dusche (x 64–184, vorher 118–198), Badboden kurz (bis x 60, vorher 112), Gefälle
  1 : 21 zur Rinne, zwei Gefällepfeile 10 Einheiten über der Fliese, Schraffur 6 statt 4 Einheiten, Wand und Decke im selben Raster
  (keine Bruchkante mehr in der Ecke). Links bleibt nur ein schmaler Streifen über dem Badboden frei (vorher rund 40 % der Breite).
  `bilder/nach/abschnitte/bad__badsanierung-was-wir-tun-{d1440,d1920,t1024,m390}.png`. Die Unterschrift „Der Einstieg bleibt dabei eben,
  ohne Stufe.“ bleibt: Der Plan verlangt einen vorhandenen Satz der Seite, Textvorschläge warten (T-C3-2, E-108 Nr. 6; OF-C3-8).
- **N-4 (mittel) /balkon-terrasse: Gefälle dreimal, zwei Markenarten, Zeichnung sehr groß · bestätigt; Markenarten und Größe
  behoben, Text nicht.** Legende im breiten Satz ohne Fugenkreuze (eine Markenart neben der nummerierten Prüfliste). Zeichnung im
  Feld ab xl höchstens zwei Drittel breit (EV-C3-9): Feld d1440 593 → 413 px, d1920 rund 700 → 464 px; nach dem Sprung an
  `#was-wir-tun` steht das Feld mit Rinne und Tropfen ganz im Fenster (d1440 Unterkante 890 von 900, d1920 1003 von 1080;
  `…-sprung.png`). Gleiche Regel für `gefaelle-dusche` mit drei Vierteln (d1440 486 → 378 px). „Gefälle dreimal“ nur über Text lösbar:
  Punkt 01 kürzen (T-C3-3) und den doppelten Satz der Legende streichen (neuer Vorschlag T-C3-4); die Legendenzeile ganz zu streichen
  nähme Inhalt weg (G4).
- **N-5 (gering) Leistungsreihe bei t1024 · bestätigt, behoben.** Vier Spalten erst ab 42 rem Reihenbreite (`@2xl`), darunter zwei mal
  zwei: t1024 jetzt 2 × 2 zu je 308 × 135 px (vorher vier zu rund 155 px mit drei bis vier Zeilen), d1280 bis d1920 und t768 weiter vier,
  m390 2 × 2 wie vorher; Abschnittshöhen d1440, d1920, m390 unverändert (538 / 606 / 645 px). Die Nachbarschaft zur Auswahl darüber
  ist Planentscheidung (OF-C3-5).
- **N-6 (gering) Stimmen: Leerraum unter der Kennzeile, kurze Stimmen, mobile Kopfzeile · bestätigt, nicht geändert.** Vom Prüfer
  ausdrücklich „kein Muss“; die gleich hohen Karten sind Regel K-016. Als OF-C3-6 vermerkt.
- **N-7 (gering) /bad/barrierefreies-bad: zwei Fotopaare mit fast gleichen Kanten, „So entsteht“ 995 px · bestätigt, nicht geändert.**
  Beide Paare kommen aus Standards von SF-B2 (Karussell-Paar und Glaspaar, glas-hoch 70svh, M-B6); eine Angleichung wirkte auf alle
  Seiten mit diesen Bausteinen und ist nach dem Auftrag nicht Teil dieses Bauteils. Als OF-C3-7 vermerkt.
- **N-8 (gering) Doppellinie über „Mehr erfahren“ · bestätigt, behoben.** Folgt der Aufklapper direkt auf die Punkte, ist die letzte
  Fuge der Liste seine obere Kante (EV-C3-11): d1440 letzter Punkt endet bei y 3551, der Aufklapper beginnt bei 3551, eine Linie statt
  zwei im Abstand von 33 px. Punktliste unverändert; nur /bad/badsanierung nutzt `absatzMehr`.
- **N-9 (gering) `box-decoration-clone` wirkungslos · bestätigt, behoben.** Klasse entfernt, Kommentar berichtigt (EV-C3-10). CSS ohne
  `.box-decoration-clone`; die Markierung bricht weiter nicht über eine Trennung (`hyphens-none`).
- **N-10 (gering) Notiz zur Kennzeile falsch · bestätigt, behoben.** Abschnitt 1 (M-B5) berichtigt: Der Link „Alle Bewertungen bei
  Google lesen“ steht je Seite einmal, wenn eine gezeigte Google-Stimme gekürzt ist; am Code nichts geändert.
- **N-11 (gering) Nachtrag-head als eigener Commit · bestätigt.** EV-C3-1 auf „im Bau geprüft“ nachgezogen (siehe N-2); die ältere
  Fassung ohne A2 nicht mehr verwenden.

Zu den Entscheidungen E-108 im Auftrag: R-1, R-2 und X-1 betreffen SF-A2 und SF-B2 und sind nicht Teil dieses Bauteils; aus Nr. 5 bis 7
folgt hier: Texte unverändert, neue Vorschläge nur in Abschnitt 4 (T-C3-4), keine Lighthouse-Messung, B-01 unberührt, Prüfungen nur
in Chromium (O-6).
