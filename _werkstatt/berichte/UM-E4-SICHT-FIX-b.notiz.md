# UM-E4-SICHT-FIX · Bauteil SF-B (Welle 1) · M-B7 → M-B3 → M-B4 · Kern 4.4.1

Arbeitskopie `$SCRATCH/sfix/b/baum` (Abzug HEAD 57e05acf, Code gleich 4d2d3fef), Vergleich `$SCRATCH/sfix/b/vor` (unverändert).
Diff: `$SCRATCH/sfix/b/UM-E4-SICHT-FIX-b.diff` (Stand Nacharbeit: 27 Dateien, `patch -p1 --dry-run` gegen das Repository ohne Fehler; Abschnitt 7 ersetzt, wo er abweicht, die Abschnitte 1 bis 6).
Bilder: `$SCRATCH/sfix/b/bilder/{vor,nach}/{d1440,m390}/{ruhig/<seite>.png | bewegt/<seite>/NN.png}`, dazu `nach/*/offen/` (alle Aufklapper geöffnet).
Prüfbelege: `$SCRATCH/sfix/b/pruef/` (erstesbild vor/nach, lesbarkeit vor/nach, werte, Lagen der Abschnitte).

## 1 Maßnahmen und Stand

### M-B7 Schalter für die Folge · umgesetzt, teilweise eingeschaltet (V-1)
- `src/components/vorlagen/folge.ts` (neu, reine Daten): Standardfolge nach der Seitenformel, `erzaehlFolge({ belegVorn })`, `wissenFolge({ wissenVorLage })`, Abschnittsnummer je Teil für den Test.
- ErzaehlSeite: setzt die Teile nach der Folge; Slot `nachLage` (eigener Abschnitt direkt nach der Lage); `belegVorn` (Beleg mit Momenten und `nachBeleg` direkt nach der Lage, danach Tun, Vergleich, nachTun, Ablauf, Versprechen, Schritt). `Versprechen vorher` entsteht aus den Teilen, die tatsächlich vor dem Versprechen stehen.
- WissensSeite: `wissenVorLage` (Wissensblöcke direkt nach dem Einstieg, Lage danach).
- Tun: `momentZuerst` (großer Moment direkt nach Kopf und Satz, Bereiche, Punkte, Absatz und Zeichnung danach).
- Ablauf: Hinweis unter der Treppe ab lg unter Stufe 02 (im Raster der Treppe ab Spalte 2; bei zwei Läufen im Raster des Laufs); erste Stufe mit rotem Waagstück (16 px, von der Achse bis zur Inhaltskante, statisch) nur im Ablauf der Vorlagen (Prop `anschluss`).
- Eingeschaltet in den Inhaltsdateien: `/referenzen` belegVorn, `/balkon-terrasse` belegVorn, `/blog` wissenVorLage, `/bad/barrierefreies-bad` tun.momentZuerst.
- Nicht eingeschaltet (V-1): `/bad` momentZuerst, `/balkon-terrasse` momentZuerst, `/ueber-uns` nachLage.
- Test `test/seitenformel-folgen.test.mjs` (neu, 5 Tests): Standard steigt 1 bis 6; Schalter ändern nur die erlaubte Stelle, alle sechs Teile, Einstieg zuerst, Schritt zuletzt; Schalter nur in Inhalten der Seiten aus K-009 (Liste ERLAUBT) und genau dort, wo eingeschaltet (Liste EIN); Slot nachLage nur auf gelisteten Seiten; geladene Inhalte setzen ihren Schalter, `/` folgt der Formel.
- KERN (Kopie): Eintrag „Folgen per Schalter“ und „Ein Abschluss“ unter der Seitenformel in K-010 „Informationsarchitektur (alt K-009)“ (V-15).

### M-B3 Ein Abschluss je Seite · umgesetzt
- `Arbeitsabschnitt` neu: `imSchritt`, `zu` (Zeile des Aufklappers), `seite` (eigene Seite des Werkzeugs). `Werkzeug` mit `imSchritt`: kein eigener Abschnitt und keine eigene H2; Kennung am Element um das Werkzeug, Titel als Regionsname; mit `zu` im nativen `details`; mit Einleitung ohne `zu` als Zeile mit H3 und Satz. Ohne `imSchritt` wie bisher (Standard).
- Schritt: Slot `werkzeuge` unter Anruf und WhatsApp (Liste, je Werkzeug eine Zeile an der Fuge), darunter Hilfen und „Mehr zum Thema“ als eine Linkzeile (zwei Gruppen ab md nebeneinander, eine Gruppe allein mit den Links in zwei Spalten).
- ErzaehlSeite/WissensSeite: `werkzeug` nimmt ein Werkzeug oder eine Liste; Werkzeuge im Schritt, übrige wie bisher danach; ein Hilfen-Link auf die `seite` eines Werkzeugs im Schritt entfällt (Filter, die Daten bleiben).
- `/bad`: Projektcheck offen (`#projekt-check`, Region „Projektcheck fürs Bad“), Badanfrage zu („Badanfrage öffnen“, `#anfrage`, Region „Badanfrage“); Hilfen nur noch Badplaner.
- `/bad/badsanierung`, `/bad/barrierefreies-bad`: Badanfrage zu im Schritt; auf /bad/badsanierung entfällt der Hilfen-Link „Angebot anfordern“ (/bad/badanfrage).
- `/fliesen`: Konfigurator zu („Projekt im Konfigurator vorbereiten“, `#konfigurator`), der gleichnamige Hilfen-Link entfällt.
- `/leistungen`: FormularSchritt bleibt; „Sie möchten mehr erzählen?“ mit Satz und Link (Text gleich) als Zeile im Zusatz neben „Wann Sie uns erreichen“; der eigene Abschnitt entfällt.
- Funnels bleiben nachgeladen wie bisher, kein neues JavaScript; Formulare, Felder, Texte und /api/anfrage unverändert.
- Zielmaß: geschlossen ein dunkler Knopf im Block (Hauptknopf); /bad m390 14.345 → 13.332 px (−1.013 px, 1,2 Bildschirme) – das Zielmaß „mindestens zwei Bildschirmhöhen“ ist nicht erreicht (V-13).

### M-B4 Aufklapper · umgesetzt
- `teile/Aufklapper.tsx` (neu): natives `details`, Zeile als Mikrotext (keine Überschrift im summary), Plus/Minus, Klassen aus dem vorhandenen Muster (Gewerk, Fragen), Fokus über die globale Regel.
- Versprechen: H2 sichtbar, darunter „Alle 8 Punkte zeigen“ (Zahl aus den Daten); geöffnet zwei Spalten in einer Flucht (der Versatz `md:even:mt-12` entfällt). Wortlaut, ANPASSUNG und Garantie-Prüfung unverändert. Gilt auf jeder Seite mit Versprechen (Erzähl-, Wissens- und alle Ortsseiten).
- Vergleich: je Bauweise Schnitt, Name (H3) und „Geeignet für“ offen (`offen: 'geeignet'` in balkon-terrasse.ts), ab lg drei Spalten (Subgrid), mobil untereinander; übrige Kriterien im Aufklapper „Alle Merkmale im Vergleich“ (ab lg fluchtende Tabelle, mobil je Bauweise in fester Folge); Plattenstärke im Aufklapper „Mehr erfahren“. `#vergleich` bleibt am Abschnitt.
- Tun: `absatzMehr` am Ende des Abschnitts im Aufklapper „Mehr erfahren“ (Mechanik). Auf /bad/badsanierung nicht eingeschaltet, das ist M-C9 Nr. 1 (O-3).

## 2 Entscheidungsvermerke (Abweichungen vom Plan)
- **V-1 Schalter nur dort eingeschaltet, wo lesbarkeit.mjs grün bleibt.** Ziel: Folgen wie in M-B7 gelistet. Befund im Bau: Mit den Schaltern wandert das erste Vorkommen von Glossarwörtern in Komponenten ohne Textmarken – `/bad` (momentZuerst: „Abdichtung“, „Untergrund“ in der Legende der Szene schichten), `/balkon-terrasse` (momentZuerst: „Abdichtung“ in der Legende von gefaelle-balkon), `/ueber-uns` (nachLage: „Abdichtung“, „bodengleiche Duschen“ in CompanyHistory, Daten aus der Firmenkonfiguration). lesbarkeit.mjs wurde ROT (Glossar offen 1 bis 2), G7 lässt das nicht zu. Alternativen: (a) Fachwort-Marke in die Legenden der Momente bzw. CompanyHistory (Klammer-Erklärung mitten in der Legende, fremde Dateien, die Szene schichten baut M-C1 ohnehin um; CompanyHistory gehört M-C4); (b) DOM-Folge anders als Sichtfolge (verboten, nur für die Messung); (c) Schalter bis zum Teil C aus. Gewählt (c). Wirkung: Die Befunde /bad b5, /balkon b3 und /ueber-uns a1/b2 bleiben bis M-C1, M-C9 und M-C4 offen; diese Maßnahmen nennen das Einschalten selbst (M-C1 Nr. 3, M-C9 Nr. 3, M-C4 Nr. 1). Risiko: keins für Welle 1. Rückweg: je eine Zeile (`momentZuerst: true` in bad.ts bzw. balkon-terrasse.ts, `nachLage={<Werkzeug … CompanyHistory />}` in ueber-uns/page.jsx statt `werkzeug`) plus Seite in EIN im Test; die Erklärung muss dann im Moment bzw. in der Komponente stehen. K-009 listet die Seiten mit „eingeschaltet mit M-C…“.
- **V-2 Seitendateien für M-B3.** `page.jsx` von /bad, /bad/badsanierung, /bad/barrierefreies-bad, /fliesen und /leistungen stehen nicht in der Spalte `dateien`, tragen aber die Werkzeuge; ohne sie bliebe der Opt-in wirkungslos (Zielmaß /bad verlangt die Messung). Teil C (M-C1, M-C9) baut auf diesem Stand auf. Rückweg: `imSchritt`/`zu`/`seite` entfernen.
- **V-3 Neue Datei `teile/Aufklapper.tsx`** statt dreimal dasselbe details-Muster; Klassen alle schon im Stylesheet (CSS-Zuwachs 0). Dafür eine Import-Zeile in ArbeitsSeite.tsx außerhalb von Typ und Werkzeug.
- **V-4 Linkzeile für jeden Schritt ohne Formular**, nicht nur mit `imSchritt` (Hilfen und „Mehr zum Thema“ nebeneinander bzw. zweispaltig). Ziel: ein ruhiger Abschluss auf allen Seiten; Wirkung: gewollte Pixeländerung auch auf /referenzen, /balkon-terrasse, /ueber-uns, /blog (Liste 3). Rückweg: Bedingung `werkzeuge` an die Klassen.
- **V-5 Waagstück nur im Ablauf der Vorlagen** (Prop `anschluss`): /kontakt und /preise nutzen `Schritte` ebenfalls und bleiben pixelgleich. Das Lot ist auf Fliese (weißer Ablauf) bis M-A4 nicht sichtbar; bis dahin liest sich das Stück als Verlängerung der ersten Stufe bis zur Achse.
- **V-6 Zwei Werkzeuge auf /bad** als zwei Arbeitsabschnitte (Liste) statt eines Abschnitts `anfragewege`; die Abschnittskennung `anfragewege` entfällt (kein Link, keine Spec, kein Werkzeug verweist darauf). `#projekt-check` und `#anfrage` bleiben.
- **V-7 package.json:** die neue Testdatei steht im Skript `test` (Paketdatei des Orchestrators), damit sie in `npm test` zählt. Rückweg: Eintrag entfernen und separat aufrufen.
- **V-8 Hilfen-Link entfällt per Filter** (`seite` des Werkzeugs), nicht durch Löschen im Inhalt: Texte bleiben in den Daten, ohne `imSchritt` erscheint der Link wieder.
- **V-9 /blog Glossarmarke:** Mit wissenVorLage steht „bodengleiche Dusche“ zuerst im Anriss zu Duschrinne und Punktablauf. Die Marke mit Erklärung wandert dorthin, der Lage-Absatz nennt das Wort danach ohne Marke (Wortlaut gleich, Schreibregel „erstes Vorkommen“). Wirkung: Die Klammer-Erklärung steht im Anriss statt im Absatz; texte-vergleich zeigt sie als verschobene Spanne; `_werkstatt/texte/blog.md` trägt die Marke noch im Absatz (Orchestrator gleicht ab). M-C8 gruppiert die Liste neu und muss das erste Vorkommen erneut prüfen.
- **V-10 /leistungen:** Die Zeile „Sie möchten mehr erzählen?“ steht im Zusatz zweispaltig neben den Öffnungszeiten (ab md), der Link ohne die zentrierende Hülle.
- **V-11 Einstieg /blog unverändert:** `fugeUnten` im Aufruf des Einstiegs (Teil A) bleibt `lage.aufFliese`; mit wissenVorLage folgt Kalk statt Fliese, der Abstand ist 64 statt 96 px. Vorschlag für die Zusammenführung: `fugeUnten={inhalt.lage.aufFliese && !inhalt.wissenVorLage}`.
- **V-12 Vergleich:** Im Aufklapper steht der Name der Bauweise als Zeile (p), nicht als zweite H3; „Mehr erfahren“ ist ein eigener Aufklapper unter „Alle Merkmale“.
- **V-13 Zielmaß /bad mobil nicht erreicht:** −1.013 px statt ≥ 1.688 px. Der Projektcheck bleibt offen (3.026 px bei m390, F-05 prüft sichtbare Inhalte, E-104 Nr. 4: Specs unverändert). Siehe O-2.
- **V-14 Messweise:** Ruhig als ganze Seite, dafür `content-visibility` der späten Abschnitte für die Aufnahme auf `visible` (sonst malt Chromium außerhalb des Bildschirms nur Platzhalter, wie `@media print`); mit Bewegung Ausschnitte je Bildschirmhöhe nach dem Durchscrollen (Muster bewegt.mjs). erstesbild „m360 mit 200 %“ über eine vorübergehende Kopie mit `html { font-size: 200% }`.
- **V-15 KERN:** K-009 ist heute das SVG-Formsystem; die Seitenformel steht als „alt K-009“ in K-010. Der Eintrag steht dort; Version und Änderungsprotokoll nicht angehoben (Orchestrator), ENTSCHEIDUNGEN nicht angefasst.

## 3 Gewollte Pixeländerungen je Ansicht (gegen 4324)
- `/bad`: Ablauf (Hinweis unter Stufe 02, Waagstück ab lg); Schritt mit Projektcheck offen und „Badanfrage öffnen“ darunter, Hilfen nur Badplaner; eigener Werkzeugabschnitt entfällt (Seitenende).
- `/bad/badsanierung`: Ablauf (Waagstück); Versprechen zu; Schritt mit „Badanfrage öffnen“, Hilfen nur „Projektcheck starten“; Abschnitt „Badanfrage“ entfällt.
- `/bad/barrierefreies-bad`: Tun (Gefälle-Zeichnung vor den Punkten); Ablauf (Waagstück, Pflegegrad-Hinweis unter Stufe 02); Schritt mit „Badanfrage öffnen“; Abschnitt „Badanfrage“ entfällt.
- `/leistungen`: Formular-Schritt mit Zeile „Sie möchten mehr erzählen?“ neben den Öffnungszeiten; Abschnitt danach entfällt.
- `/fliesen`: Ablauf (Waagstück, Hinweis unter Stufe 02); Versprechen zu; Schritt mit „Projekt im Konfigurator vorbereiten“ zu, Hilfen entfällt, „Mehr zum Thema“ zweispaltig; Konfigurator-Abschnitt entfällt.
- `/balkon-terrasse`: Folge (Fotos und Stimmen direkt nach der Lage); Vergleich (offen Schnitt, Name, Geeignet für; zwei Aufklapper); Ablauf (Waagstück); Versprechen zu; Linkzeile zweispaltig.
- `/referenzen`: Folge (Galerie, Vorher-Nachher, Bewertungen nach der Lage, dann Tun, Ablauf, Schritt); Ablauf (Waagstück); „Mehr zum Thema“ zweispaltig ab md.
- `/ueber-uns`: Versprechen zu; Ablauf (Waagstück); Linkzeile mit zwei Gruppen nebeneinander. Folge unverändert (V-1).
- `/blog`: Folge (Suche, Themen, Liste direkt nach dem Einstieg, „Vieles rund ums Bad …“ danach); Klammer-Erklärung „bodengleiche Dusche“ im Anriss statt im Absatz; Ablauf (Waagstück); Versprechen zu; Linkzeile.
- `/standorte/wetzlar` und alle Ortsseiten: Versprechen zu; Ablauf (Waagstück, Hinweis unter Stufe 02, wo vorhanden).
- Unverändert: `/` (Bildschirmausschnitt pixelgleich; die ganze Seite weicht bei d1440 auch zwischen zwei Läufen auf 4324 ab – Quadratmeter im Einstieg, nicht deterministisch), `/kontakt` (pixelgleich d1440, m390), `/preise` (Bildschirmausschnitt pixelgleich, m390 ganze Seite gleich; ganze Seite d1440 Messartefakt der Vollbildaufnahme). Erster Bildschirm aller zehn Ansichten unverändert (erstesbild je Fall gleich).

Seitenhöhen ruhig (ganze Seite, vorher → nachher): d1440 /bad 13.610 → 12.794 · /bad/badsanierung 12.151 → 10.673 · /bad/barrierefreies-bad 10.692 → 9.954 · /leistungen 11.350 → 11.106 · /fliesen 13.361 → 11.107 · /balkon-terrasse 12.323 → 10.886 · /referenzen 14.081 → 14.058 · /ueber-uns 13.853 → 12.994 · /blog 12.393 → 11.498 · /standorte/wetzlar 9.630 → 8.895. m390 /bad 14.345 → 13.332 · /bad/badsanierung 13.198 → 10.805 · /bad/barrierefreies-bad 10.748 → 9.841 · /leistungen 12.439 → 12.279 · /fliesen 13.459 → 10.488 · /balkon-terrasse 14.281 → 11.386 · /referenzen 21.132 → 21.132 · /ueber-uns 14.824 → 13.404 · /blog 13.343 → 11.890 · /standorte/wetzlar 10.831 → 9.444.

## 4 Textvorschläge (für TEXTVORSCHLAEGE.md; bis zur Antwort bleiben die Texte)
Direkt gesetzte Mikrotexte (Zeilen der Aufklapper): „Badanfrage öffnen“, „Projekt im Konfigurator vorbereiten“, „Alle 8 Punkte zeigen“ (Zahl aus den Daten), „Alle Merkmale im Vergleich“, „Mehr erfahren“.
1. Ansicht: alle Seiten mit Versprechen · Stelle: H2 des Qualitätsversprechens · heute: „Unser Qualitätsversprechen in acht Punkten.“ · Vorschlag: „Unser Qualitätsversprechen.“ · Grund: Die Zahl steht jetzt in der Zeile darunter („Alle 8 Punkte zeigen“), die H2 doppelt sie.
2. Ansicht: /bad · Stelle: Hilfen im nächsten Schritt · heute: „Badplaner“ (ohne Satz, allein in der Gruppe) · Vorschlag: „Badplaner“ mit Satz „Planen Sie Ihr Bad selbst am Bildschirm.“ · Grund: Die beiden anderen Hilfen mit Satz entfallen (Werkzeuge im Block), der einzelne Link ohne Satz liest sich wie ein Rest.
3. Ansicht: /balkon-terrasse · Stelle: Legende der Gefälle-Zeichnung, Satz 2 · heute: „Darunter liegt eine wasserdichte Schicht, die Abdichtung. Sie schützt den Beton.“ · Vorschlag: gleicher Wortlaut, „Abdichtung“ als Fachwort ausgezeichnet (Erklärung beim ersten Vorkommen), im Tun-Punkt ohne Marke · Grund: Voraussetzung für momentZuerst auf /balkon-terrasse (V-1, lesbarkeit.mjs).
4. Ansicht: /bad · Stelle: Legende der Szene schichten, Satz zu Abdichtung · heute: „Die Abdichtung liegt zwischen Untergrund und Kleber.“ · Vorschlag: Erklärungen von „Untergrund“ und „Abdichtung“ in die Legende (oder ein Satz vor der Szene, der beide erklärt), in den Punkten ohne Marke · Grund: Voraussetzung für momentZuerst auf /bad (M-C1, V-1).

## 5 Offene Fragen
- O-1: momentZuerst auf /bad und /balkon-terrasse und nachLage auf /ueber-uns schalten M-C1, M-C9 und M-C4 ein, zusammen mit der Glossar-Erklärung im Moment bzw. in CompanyHistory (Textvorschläge 3 und 4). Oder soll SF-B das in der Nacharbeit mit Fachwort-Marken in den Legenden nachholen?
- O-2: Zielmaß /bad mobil (≥ 2 Bildschirme kürzer) ist mit offenem Projektcheck nicht erreichbar. Soll der Projektcheck auf /bad ebenfalls zu (spart rund 3.000 px)? Das verlangt, dass funktion-projektcheck auf /bad den Aufklapper vor der Prüfung öffnet (gegen E-104 Nr. 4).
- O-3: `absatzMehr` auf /bad/badsanierung schon in Welle 1 einschalten (eine Zeile in bad-badsanierung.ts, Absatz mit DIN-Normen) oder wie geplant mit M-C9?
- O-4: Ankersprung von außen auf `#anfrage` bzw. `#konfigurator` im geschlossenen details: Chromium öffnet; Firefox und Safari ungeprüft (kein Browser hier). Kein interner Link zeigt auf diese Anker der fünf Seiten.
- O-5: Neue Testdatei im Skript `test` von package.json (V-7) übernehmen?
- O-6: Zusammenführung mit SF-A: `fugeUnten` bei wissenVorLage (V-11); `_werkstatt/texte/blog.md` Marke nachziehen (V-9).
- O-7: erstesbild m360 mit 200 % (Emulation `html { font-size: 200% }`): auf allen zehn Ansichten H1 bzw. Ort verdeckt oder unter dem Falz, Hauptknopf und Kontakt im Bild – vorher und nachher je Fall gleich (20/20), also nicht durch SF-B; Teil A (Einstieg) sollte es mit seinem Messverfahren gegenprüfen.

## 6 Prüfzahlen
- `npm test`: 266 Tests, 266 bestanden, 0 übersprungen mit Produktionsbau (darin `test/seitenformel-folgen.test.mjs` 5/5 und `test/stylesheets.test.mjs`: ein Stylesheet je Seite); auf dem Endstand nach dem Löschen von `.next` 265 bestanden, 1 übersprungen (der Stylesheet-Test braucht den Bau), 0 Fehler.
- `npx tsc --noEmit`: 0 Fehler auf dem Endstand (mit `next-env.d.ts` aus dem Repository, vorübergehend; die Datei ist nicht im Diff).
- `npx eslint` über 21 geänderte Code- und Testdateien: 0 Befunde (Endstand).
- `werte.mjs --dateien` (20 Dateien, 713 Klassenvorkommen): 0 Befunde.
- `next build`: erfolgreich.
- CSS gebaut (ein Stylesheet je Seite, /, /bad, /blog, /standorte/wetzlar, /kontakt): roh 136.410 → 136.449 B (+39), gzip −9 23.412 → 23.411 B (−1), gzip −6 23.526 → 23.524 B (−2). Neu `.w-4`, `.md:border-b-0`; entfallen `lg:row-span-7/8`.
- erstesbild (zehn Ansichten): m390, q844, d1440 vorher 46/60, nachher 46/60, nach Einwilligung 30/30, je Fall gleich (60/60); m360 mit 200 % vorher 0/20, nachher 0/20, je Fall gleich (20/20, O-7).
- lesbarkeit.mjs (zehn Ansichten): vorher GRÜN 9 / ROT 1, nachher GRÜN 9 / ROT 1; ROT ist in beiden Ständen /bad/badsanierung „Floskel: Traumbad“ (H1, G8).
- Bilder: 10 Ansichten × d1440, m390 × ruhig (ganze Seite) und bewegt (Ausschnitte) vorher (4324) und nachher (4450); `nach/*/offen/` für /balkon-terrasse, /standorte/wetzlar, /bad/badsanierung (aus dem ersten Bau, in dem /balkon-terrasse noch momentZuerst trug; Vergleich und Versprechen selbst sind unverändert).
- Keine Lighthouse- und keine Zeitmessung (E-076). Server 4450 gestoppt, `.next` und die echte Kopie von node_modules gelöscht, Symlink wiederhergestellt; Hilfsskripte aus `werkzeuge/` gelöscht.

## 7 Nacharbeit nach der Prüfung Welle 1 (15 Befunde, Stand gegen 4324)

Alle Befunde selbst nachgemessen (`pruef-2/mess/{vor,nach}/<gerät>/<seite>.json`: Abschnittsfolge, Fläche je Abschnitt aus dem
berechneten Hintergrund, sichtbare dunkle Knöpfe, Aufklapper, Suchfeld). Neuer Bau auf 4450; Bilder `bilder/nach/` neu.

### 7.1 Befunde und Stand
1. **hoch · /ueber-uns Zeitleiste hinter der Schlussaktion: behoben, anders als vorgeschlagen (V-16).** Die Firmengeschichte steht
   jetzt nach „Was wir tun“ und vor den Werten (Slot `nachTun` der Seite), die Seite endet einmal mit dem nächsten Schritt, die
   Linkzeile steht am Ende. Folge d1440: lage W · tun G · company-history G · werte W · ablauf W · … · qualitaet G · naechster-schritt W
   (vorher company-history nach dem Schritt). Höhe d1440 13.853 → 12.930, m390 14.847 → 13.395. `nachLage` direkt nach der Lage
   habe ich gebaut und gemessen: lesbarkeit ROT (Satz über 25 Wörter, 35), siehe V-16; zurückgenommen.
2. **mittel · /bad Abschluss halb: nicht behoben (O-2 offen).** Bestätigt: Der offene Projektcheck bringt seinen dunklen Knopf mit,
   die Kürzung mobil ist −1.105 px (Soll ≥ 1.688). Nachgemessen ist aber der erste Teil des Zielmaßes erfüllt: sichtbar höchstens
   ein dunkler Knopf je Bildschirm auf m390, q844, t768 und d1440 (Hauptknopf zu „Angebot mit Festpreis anfordern“: d1440 2.301 px,
   t768 2.258 px, m390 3.165 px Abstand; „Weiter zu Schritt 2“ liegt im geschlossenen Aufklapper und wird nicht gemalt). Den
   Projektcheck schließen geht nur mit geänderter Spec (gegen E-104 Nr. 4), seinen Knopf hell setzen nur in
   `BadProjektCheck/Zusammenfassung.jsx` (Formular, G8, Teil C2). Beides braucht die Entscheidung des Orchestrators. Der Rest-Befund
   (Nr. 11) ist behoben.
3. **mittel · momentZuerst /bad und /balkon-terrasse: /balkon-terrasse behoben, /bad nicht.** /balkon-terrasse: Gefälle-Zeichnung
   direkt nach Kopf und Satz, Prüfliste danach; „Abdichtung“ steht zuerst in der Legende und trägt dort die Marke
   (`GefaelleBalkon fachwort`, Wortlaut gleich, Klammer aus `config/glossar.ts`), der Tun-Punkt nennt es danach ohne Marke,
   `versprechen.erklaert: ['abdichtung']`. lesbarkeit /balkon-terrasse GRÜN. /bad: Das erste Vorkommen von „Untergrund“ wäre der
   Name der ersten Schicht in der Szene (fett, fs-4); die Klammer dort (14 Wörter) oder ein neuer Satz vor der Szene ist eine
   Textentscheidung (Textvorschlag 4), die Szene baut M-C1 um. Für /bad im Anlauf-2-Material nicht als gebaut führen.
4. **mittel · /blog Lage nach der Liste: teilweise.** Behoben: Flächen. Mit `wissenVorLage` trägt der erste Wissensblock die Fliese
   der Lage (mit ihrer kleineren Stufe darüber), die Lage Kalk (V-18). Folge d1440 und m390 jetzt wissen-1 W · lage G · ablauf W ·
   unsere-arbeiten G · kundenstimmen W · qualitaet G · naechster-schritt W (vorher nach Welle 1: Lage und Ablauf beide W). Die
   Grenze unter dem Einstieg (`fugeUnten`) stimmt damit ohne Änderung am Einstieg-Aufruf (V-11 erledigt). Nicht geändert: die
   Reihenfolge Liste vor Lage; sie ist Plan (M-B7 Nr. 2, M-C8 Nr. 1). Suche und Themen von der Liste trennen geht nur durch Umbau
   der Client-Komponente `BlogFilter` (gemeinsamer Zustand, JavaScript; M-C8 baut die Liste ohnehin neu). Der Nachsatz-Eindruck
   ist Text: Textvorschlag 5.
5. **mittel · /referenzen mobil: Reihenfolge widerlegt, Flächen geprüft.** Stimmen vor die Galerie hat der Plan in M-C3 Nr. 1 als
   Widerspruch entschieden (Galerie zuerst, Stimmen mobil nach rund vier Bildschirmen mit eingeklappter Galerie, M-C3). Mobil bleibt
   die Seite 21.155 px, die Bewertungen bei 13.889; im Anlauf-2-Material mobil nicht als gelöst führen, bis M-C3 gebaut ist.
   Flächen: nachgemessen (berechneter Hintergrund) ist Tun Kalk und Ablauf Fliese, also kein Doppel Tun/Ablauf; Doppel sind
   bewertungen/tun (Kalk) und ablauf/schritt (Fliese, auch vorher), keine drei gleichen Flächen (Risiko M-B7). Ganz wechselnd ginge
   es nur mit dem Ablauf auf Kalk; das ändert den Ablauf auf allen Seiten, daher nicht.
6. **gering · Waagstück: behoben.** Aus, bis das Lot auf Fliese sichtbar ist (M-A4); die Prop `anschluss` bleibt (V-20).
7. **gering · /blog Suche unter dem Falz: gemildert.** Suchfeld d1440 1.558 → 890 px (Falz 900: Etikett im ersten Bildschirm, das
   Feld an der Kante), m390 1.525 → 958 (oberes Drittel von Bildschirm 2). Den Rest bestimmt der Einstieg (Teil A ändert ihn für
   /blog) und Textvorschlag 8.
8. **gering · /bad/barrierefreies-bad momentZuerst ohne sichtbaren Gewinn: nicht geändert.** Bestätigt, aber kein Fehler: Der
   Schalter ist die Vorbereitung für M-C9 Nr. 2 (Zeichnung in voller Breite zuerst) und M-B1; ihn auszuschalten hieße, ihn dort
   wieder einzuschalten. Höhe unverändert, kein Nachteil.
9. **gering · geschlossenes Versprechen leer: behoben.** Eine Stufe weniger über und unter dem Band (`pt-12 pb-12 lg:pt-16
   lg:pb-16`, wie „Was wir tun“ mit Leistungszeilen): d1440 419 → 355 px, m390 301 → 269 px (V-21).
10. **gering · Vergleich unter lg: behoben.** Von md bis lg je Bauweise Schnitt links, Name und „Geeignet für“ rechts; ab lg
    unverändert drei Spalten im Subgrid (V-22). vergleich t768 3.102 → 1.178 px (Welle 1: 1.862), q844 3.117 → 1.186 (1.869),
    d1440 928, m390 1.610 (unter md untereinander wie bisher).
11. **gering · /bad Reste unter dem Projektcheck: behoben.** Stehen Werkzeuge im Schritt, folgen die Hilfen als weitere Zeilen
    derselben Liste an der Fuge (Name mit Pfeil, Satz darunter, wo vorhanden); die Gruppe „Hilfen“ entfällt dort (V-19). /bad:
    „Badanfrage öffnen +“ und „Badplaner →“ als zwei Zeilen einer Liste; /bad/badsanierung „Badanfrage öffnen“ und
    „Projektcheck starten“.
12. **gering · Diffs SF-A/SF-B nicht nacheinander anwendbar: behoben.** Die Folge steht in einer eigenen Funktion `Teile`
    über der Vorlage; der Einstieg-Aufruf und `const bild` bleiben im Abschnitt der Vorlage unberührt. Trockenläufe in Kopien von
    `vor`: SF-A dann SF-B und SF-B dann SF-A laufen durch (WissensSeite je mit fuzz 1, alle übrigen Dateien ohne), beide Reihenfolgen
    ergeben dieselbe Datei. Das Ergebnis trägt `ohneAchse` und `lot schnur bewertung` (SF-A) und `<Teile …/>` (SF-B).
13. **mittel · /blog Klammer-Erklärung gewandert: plan-gedeckt, Quelle nachgezogen.** Die Klammer kommt aus `config/glossar.ts`
    (kein Seitentext) und folgt der Schreibregel „erstes Vorkommen“ (K-011); M-B7 nennt genau das im Risiko („Erklärung beim neuen
    ersten Vorkommen“). Der Wortlaut beider Sätze bleibt gleich. Der Eintrag „Klammer-Erklärungen“ unter nicht_umsetzen meint neue
    oder geänderte Erklärungstexte. Für die Quelle liegt ein eigener Patch bereit:
    `$SCRATCH/sfix/b/UM-E4-SICHT-FIX-b-texte.diff` (`texte/blog.md` Z. 21 und 39, `texte/balkon-terrasse.md` Z. 34; dry-run ok).
    Rückweg wie im Befund: blog.ts Z. 31 und 111 zurück, `wissenVorLage` aus, im Test `EIN.wissenVorLage` leeren.
14. **gering · texte-vergleich ROT: behoben.** Erlaubt-Liste `$SCRATCH/sfix/b/UM-E4-SICHT-FIX-b.erlaubt.json` (39 Einträge, je mit
    Vermerk): ohne Liste ROT (16 Spannen, 23 Zeilen), mit Liste GRÜN (0 unerlaubt, SEO 0, kaputte Links 0). Ausdrücklich entfallende
    Texte (alle im DOM der Daten, nur nicht mehr auf der Seite):
    - Hilfen-Links auf ein Werkzeug im Schritt (M-B3 Nr. 5): /bad „Badanfrage · Schreiben Sie uns, was Sie sich für Ihr Bad
      wünschen.“ und „Projektcheck · Mit wenigen Fragen sehen Sie online, was bei Ihrem Bad möglich ist.“; /bad/badsanierung
      „Angebot anfordern“; /fliesen „Projekt im Konfigurator vorbereiten · Hier wählen Sie Raum, Untergrund, Fliesengröße und Fläche.“
    - H2 „Badanfrage“ auf /bad, /bad/badsanierung, /bad/barrierefreies-bad (Region und Zeile „Badanfrage öffnen“ bleiben).
    - Gruppenlabel „Hilfen“ dort, wo Werkzeuge im Schritt stehen (V-19).
    - „Zurück“/„Weiter“ des Badanfrage-Funnels auf /bad (im geschlossenen Aufklapper, im DOM).
    Verschoben und wortgleich: /referenzen (Galerie, Vorher-Nachher, Bewertungen), /balkon-terrasse (Fotos und Stimmen, Legende,
    „Geeignet für“), /ueber-uns (Firmengeschichte), /bad/barrierefreies-bad („Das Wasser läuft von selbst zum Ablauf.“); Klammern
    gewandert auf /blog und /balkon-terrasse.
15. **gering · Import in ArbeitsSeite, page.jsx außerhalb der Spalte: kein Handlungsbedarf.** V-2/V-3 gelten; neu dazu V-17.

### 7.2 Entscheidungsvermerke (Nacharbeit)
- **V-16 /ueber-uns: Geschichte nach „Was wir tun“ statt `nachLage`.** Ziel: Zeitleiste vor der Schlussaktion, ein Ende. Befund im
  Bau: Direkt nach der Lage ist der Satz zu 2019 („Abdichtung nach Norm für bodengleiche Duschen und Feuchträume.“,
  `config/company.js`) das erste Vorkommen von „Abdichtung“ und „bodengleiche Duschen“; mit beiden Klammern 35 Wörter, lesbarkeit
  ROT (höchstens 25, G7). Alternativen: (a) `nachLage` mit beiden Klammern (ROT); (b) nur eine Klammer (Glossar offen, ROT);
  (c) Erklärung als eigene Zeile unter dem Satz (gegen K-011 „in Klammern, direkt dabei“); (d) Satz teilen (Firmendaten, nur als
  Textvorschlag 6); (e) Geschichte in den Slot `nachTun` vor die Werte. Gewählt (e): keine Marke wandert, `CompanyHistory` und
  `ueber-uns.ts` bleiben unverändert, nur `ueber-uns/page.jsx`. Wirkung: a1/b2 (Zeitleiste hinter dem Schritt, Seite endet zweimal)
  behoben; die Geschichte folgt auf „Was wir tun“ statt auf „Wer kommt in Ihr Haus?“. Risiko: Das Motto-Zitat der Geschichte steht
  jetzt mitten in der Seite (M-C4 löst es aus der Komponente). Rückweg: `werkzeug={…CompanyHistory…}` wie vorher. `nachLage` schaltet
  M-C4 ein, mit Textvorschlag 6 oder einer Entscheidung zu (c). K-009 in KERN entsprechend.
- **V-17 weitere Dateien außerhalb der Spalte `dateien`:** `momente/gefaelle-balkon/GefaelleBalkon.tsx` (Prop `fachwort`, Standard
  aus; M-C9 baut die Zeichnung später breit), `balkon-terrasse/page.jsx` (`fachwort`), `ueber-uns/page.jsx` (V-16),
  `vorlagen/teile/Wissen.tsx` (Prop `ersterAufFliese`, V-18). Keine davon steht in SF-As Diff.
- **V-18 Flächentausch bei `wissenVorLage`:** Steht die Lage auf Fliese, trägt der erste Wissensblock die Fliese (und `lg:pt-16`),
  die Lage Kalk. Nur /blog betroffen. Rückweg: `getauscht` in WissensSeite auf false.
- **V-19 Hilfen als Zeilen unter den Werkzeugen** (Schritt, nur mit Slot `werkzeuge`); ohne Werkzeuge bleibt die Linkzeile wie in
  Welle 1. Rückweg: `hilfen={inhalt.hilfen}` an die Linkzeile, `Hilfezeilen` entfernen.
- **V-20 Waagstück aus:** Prop `anschluss` bleibt in `Schritte`, der Ablauf der Vorlagen setzt sie nicht mehr (ersetzt V-5). Die
  Klasse `.w-4` bleibt dafür im Stylesheet (eine Regel).
- **V-21 Versprechen-Abstände** gelten auf allen Seiten mit Versprechen (Erzähl-, Wissens-, Ortsseiten), offen und geschlossen.
- **V-22 Vergleich md bis lg zweispaltig** je Bauweise; neue Klassen `md:row-span-2`, `lg:row-span-1`, `lg:grid-cols-1`.

### 7.3 Gewollte Pixeländerungen (Nachtrag zu Abschnitt 3)
- Alle Ansichten mit Ablauf der Vorlagen: Waagstück entfällt wieder (an dieser Stelle wie vorher).
- Alle Ansichten mit Versprechen (/bad/badsanierung, /fliesen, /balkon-terrasse, /ueber-uns, /blog, Ortsseiten): Band kleiner.
- /bad, /bad/badsanierung, /bad/barrierefreies-bad: Hilfen als Zeile unter „Badanfrage öffnen“, ohne Label „Hilfen“.
- /balkon-terrasse: Tun mit Zeichnung zuerst (Legende mit Klammer zu „Abdichtung“, Punkt 4 ohne); Vergleich ab md zweispaltig.
- /blog: erster Wissensblock auf Fliese, Lage auf Kalk.
- /ueber-uns: Firmengeschichte nach „Was wir tun“, vor den Werten; Seite endet mit dem nächsten Schritt.
- Unverändert: /, /kontakt, /preise (keine der geänderten Stellen; / hat kein Versprechen), erster Bildschirm aller zehn Ansichten.

Seitenhöhen (ruhig, vorher 4324 → nachher 4450):
- d1440: /bad 13.610 → 12.699 · /bad/badsanierung 12.151 → 10.515 · /bad/barrierefreies-bad 10.692 → 9.954 · /leistungen
  11.350 → 11.106 · /fliesen 13.361 → 11.043 · /balkon-terrasse 12.323 → 10.792 · /referenzen 14.081 → 14.058 · /ueber-uns
  13.853 → 12.930 · /blog 12.393 → 11.434 · /standorte/wetzlar 9.630 → 8.831
- m390: /bad 14.369 → 13.264 · /bad/badsanierung 13.221 → 10.705 · /bad/barrierefreies-bad 10.772 → 9.865 · /leistungen
  12.462 → 12.302 · /fliesen 13.483 → 10.480 · /balkon-terrasse 14.305 → 11.377 · /referenzen 21.155 → 21.155 · /ueber-uns
  14.847 → 13.395 · /blog 13.367 → 11.882 · /standorte/wetzlar 10.854 → 9.436
- t768: /balkon-terrasse 14.159 → 11.110 · q844: /balkon-terrasse 12.584 → 9.571 (übrige in `pruef-2/mess`)

### 7.4 Textvorschläge (Nachtrag; bis zur Antwort bleiben die Texte)
5. Ansicht: /blog · Stelle: Lage, Absatz 2, letzter Satz · heute: „Hier finden Sie Antworten.“ · Vorschlag: „Viele Antworten
   stehen in den Artikeln darüber.“ · Grund: Mit `wissenVorLage` steht der Absatz nach der Liste; „hier“ kündigt an, was schon kam.
6. Ansicht: /ueber-uns · Stelle: Zeitleiste 2019 (`historyTimeline`, Firmendaten) · heute: „Abdichtung nach Norm für bodengleiche
   Duschen und Feuchträume.“ · Vorschlag: „Die Abdichtung nach Norm ist bei uns Standard. Sie schützt bodengleiche Duschen und
   Feuchträume.“ · Grund: Voraussetzung für `nachLage` (M-C4); mit beiden Klammern bliebe jeder Satz unter 25 Wörtern (23 und 18).
7. Textvorschlag 3 ist mit der Nacharbeit umgesetzt (Marke an „Abdichtung“ in der Legende, Wortlaut gleich); Textvorschlag 4
   (/bad) bleibt Voraussetzung für `momentZuerst` auf /bad.
8. Ansicht: /blog · Stelle: Wissensblock „Alle Artikel auf einen Blick.“, Satz · heute: „Jeder Artikel gehört zu einem Thema. Sie
   wählen ein Thema oder geben einen Begriff in die Suche ein.“ · Vorschlag: „Wählen Sie ein Thema, oder suchen Sie nach einem
   Begriff.“ · Grund: Das Suchfeld rückt bei d1440 näher an den ersten Bildschirm.

### 7.5 Offene Fragen (Nachtrag)
- O-2 bleibt: Projektcheck auf /bad schließen (Spec-Änderung) oder sein Knopf hell (Formular, Teil C2)?
- O-8: V-16 bis V-22 und die Dateien aus V-17 bestätigen.
- O-9: Texte-Patch `UM-E4-SICHT-FIX-b-texte.diff` und die Erlaubt-Liste übernehmen (Befund 13 und 14).
- O-10: /ueber-uns `nachLage` mit M-C4 nur mit Textvorschlag 6 oder einer Entscheidung zu V-16 (c).
- Beobachtung (nicht SF-B, vorher wie nachher): In der Vollbildaufnahme d1440 steht in der H2 „Sprechen wir über Ihre
  Badsanierung.“ (/bad/badsanierung) das letzte Wort sichtbar kleiner; bei m390 nicht. Bitte im Messpunkt im Bildschirmausschnitt
  prüfen.

### 7.6 Prüfzahlen (Endstand Nacharbeit)
- `npm test`: 266 Tests, 266 bestanden, 0 übersprungen (mit Produktionsbau, Stylesheet-Test aktiv; darin seitenformel-folgen 5/5).
- `npx tsc --noEmit`: 0 Fehler (mit `next-env.d.ts` aus dem Repository, vorübergehend, nicht im Diff).
- `npx eslint` über 25 geänderte Code- und Testdateien: 0 Befunde.
- `werte.mjs --dateien` (24 Dateien, 797 Klassenvorkommen): 0 Befunde.
- `next build`: erfolgreich (zweimal; der zweite Bau nach V-16).
- CSS gebaut (ein Stylesheet): roh 136.410 → 136.590 B (+180), gzip −9 23.412 → 23.428 B (+16), gzip −6 23.526 → 23.543 B (+17).
  Neu `.w-4`, `.md:border-b-0`, `.md:row-span-2`, `.lg:row-span-1`, `.lg:grid-cols-1`; entfallen `lg:row-span-7/8`.
- erstesbild (zehn Ansichten): m390, q844, d1440 vorher 46/60, nachher 46/60, je Fall gleich (60/60); m360 mit 200 % (vorübergehende
  Kopie mit `html { font-size: 200% }`) vorher 0/20, nachher 0/20, je Fall gleich (20/20, O-7).
- lesbarkeit.mjs (zehn Ansichten): nachher GRÜN 9 / ROT 1, ROT wie vorher nur /bad/badsanierung „Floskel: Traumbad“ (H1, G8).
- texte-vergleich (d1440, zehn Ansichten): ohne Liste ROT, mit `UM-E4-SICHT-FIX-b.erlaubt.json` GRÜN.
- Patch: `patch -p1 --dry-run` gegen das Repository ohne Fehler; nach SF-A nur WissensSeite mit fuzz 1 (beide Reihenfolgen).
- Bilder: `bilder/nach/{d1440,m390}/{ruhig,bewegt}` für alle zehn Ansichten neu, `bilder/nach/{d1440,m390}/offen` für /bad,
  /bad/badsanierung, /balkon-terrasse, /standorte/wetzlar, dazu `bilder/{vor,nach}/{t768,q844}/ruhig/balkon-terrasse.png`;
  `bilder/vor` unverändert gültig. Ausschnitte der Sichtprüfung in `pruef-2/blick/`.
- Keine Lighthouse- und keine Zeitmessung (E-076). Server 4450 gestoppt (nur eigene Prozesse), `.next` und die Kopie von
  node_modules gelöscht, Symlink wiederhergestellt, Hilfsskripte aus `werkzeuge/` gelöscht.
