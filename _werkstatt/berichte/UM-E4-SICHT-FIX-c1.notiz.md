# UM-E4-SICHT-FIX-c1 · Bauteil SF-C1, Welle 1 · M-C6 (mit dem Ortsseiten-Teil von M-A3) → M-C1 → M-C3 → M-C8 · Kern 4.4.1

Stand 31.10.2026. Arbeitskopie `$SCRATCH/sfix/c1/baum` (Abzug HEAD 7e117c19 nach SF-A und SF-B), Vergleich `…/vor` (unverändert).
Diff: `$SCRATCH/sfix/c1/UM-E4-SICHT-FIX-c1.diff` (29 Dateien, `diff -ruN vor baum` ohne node_modules, .next, bilder, next-env.d.ts,
tsconfig.tsbuildinfo; `patch -p1` auf eine Kopie von `vor` ergibt genau `baum`, `patch -p1 --dry-run` gegen das Repository
(809333d4) ohne Fehler). Bau, Server 4460, `.next` und die echte Kopie von node_modules sind entfernt, die Hilfsskripte in
`werkzeuge/` gelöscht.
Bilder: `$SCRATCH/sfix/c1/bilder/{vor,nach}/{d1440,m390}/{ruhig/<seite>.png | bewegt/<seite>/NN.png}` (vor = 4325, nach = 4460;
ruhig = `data-bewegung="ruhig"` als ganze Seite, bewegt = je Bildschirmhöhe nach dem Durchscrollen, Endzustand), dazu
`bilder/schichten-nach/` (Szenenende /bad, m390, t1024, d1440, je neun Stände mit Protokoll `log.txt`).
Ansichten: /standorte/wetzlar (dazu /standorte/limburg als zweite Ortsseite und /standorte wegen des Registers), /bad, /referenzen, /blog.
SF-C2-Dateien (Schritt1.jsx, ArbeitsSeite.tsx, DirectContactCard, CompanyHistory, Werte, Einsatzkarte, VerbandProbe, /leistungen,
/kontakt, /ueber-uns, /fliesen) sind unberührt. ErzaehlSeite, WissensSeite, Einstieg, EinstiegMitte und Schnurebene sind unberührt.

## 1 Maßnahmen und Stand

### M-C6 Ortsseiten · umgesetzt (Nr. 5 untersucht, ohne Änderung)
- Nr. 1 und M-A3 (Ortsseiten-Teil): OrtsSeite ruft den Einstieg mit `schnur bewertung` und `bild={worum.bild}` auf, in einem
  Schritt mit dem Auszug des Einzugsbands aus dem Einstieg. H1 auf der Schnur, rotes Lotstück bis zum Foto (Aufhängung an der
  Fuge), Bewertungszeile unter den Knöpfen, dann das Foto (lcp, einziges preload, Alt-Text aus ARBEITEN ohne Ort), dann der
  Vorspann. Nie Schnur und rotes Band im selben Bildschirm.
  Aufmacher (orte.ts, Helligkeit ≥ 0,45, Schärfe ≥ 0,10 laut bildinventar.csv, keiner Aufmacher oder erstes Galeriefoto einer
  Hauptansicht, verglichen nach Originalnummer): `start-beleg-dusche` (IMG_2553, 0,50/0,12; auf / Beleg Platz 3),
  `start-beleg-terrasse` (IMG_2532, 0,51/0,21; auf / Beleg Platz 4), `balkon-beleg-3` (IMG_2539, 0,56/0,22; Galerie Platz 12).
  Verteilung über die 13 Orte: Dusche 7 (darunter Wetzlar, Limburg), blaugraue Terrasse 3, Terrasse in Erdtönen 3, diese nur bei
  ungeradem Index, weil `ort-terrasse-erdtoene` (dasselbe Original IMG_2539) in der Fotoreihe der Orte mit geradem Index steht.
- Nr. 2: Das Einzugsband steht als Ortsmoment in der Lage nach den Absätzen („Sie suchen einen Fliesenleger in …?“), im Satzmaß.
  Offen die Zone ≤ 10 km und die Zone des Ortes mit „Sie sind hier“ (EV-1; Nacharbeit N-2: alle Zonen bis zur Zone des Ortes), die übrigen Zonen im Aufklapper „Weitere Orte bis
  50 km“ (vorlagen/teile/Aufklapper, Inhalt im DOM). „Sie sind hier“ ab lg in eigener Zeile unter dem Ortsnamen. Lot des Bandes in
  Tinte (neben dem Leitfaden), die Firmensitz-Marke bleibt rot.
  Auslöser `einzugsband` Laden → Sichtbarkeit (IO 40 %, E-104 Nr. 9): register.ts, register.json (Eintrag, Staffel, Hinweis),
  KERN K-008 (Zeile einzugsband) und test/bewegung.test.mjs „Bewegung 3“ in der Kopie nachgezogen. bewegung.css Block
  einzugsband: Startzustand nur unter html.k-bewegung ohne Notaus und ohne `data-motion-stand="an"`; ruhig, reduziert, ohne
  JavaScript, im Druck, bei Zurück/Vor (k-verlauf) und im Aufklapper steht die Kante voll. Geprüft: vor dem Eintritt Kante
  `scale 0 1`, nach dem Eintritt Animation bis `scale 1` (m390, d1440).
- Nr. 3: `anDerLinie` entfällt für alle 13 Orte (Kopf mittig, Zeilen über die Inhaltsbreite); Zeilen mit Plan-Vignetten `bad`,
  `wohnen`, `aussen`, `untergrund` im Feld 4 : 3 statt der Verlegemuster (neue Angabe `Zeile.vignette`, EV-5).
- Nr. 4: Fotoreihe hellste zuerst (NACH_HELLIGKEIT aus bildinventar.csv): gerade Orte `start-galerie-5`, `ort-terrasse-erdtoene`,
  `ort-gaeste-wc`; ungerade `start-galerie-3`, `start-galerie-1`, `start-beleg-bad`. Das Gäste-WC steht nie vorn (Test „Orte 7“).
- Nr. 5 Navigation im Erstbesuch: Ursache gesucht, nicht reproduzierbar, keine Änderung an Header.jsx (EV-8).

### M-C1 /bad · umgesetzt (Nr. 5 optional nicht umgesetzt)
- Nr. 1 Auslauf: Schichten.tsx hat hinter der Liste einen Platz `schichten-auslauf`; nur im Bewegungszweig von bewegung.css
  (Block schichten, @supports und Höhe > 32rem) steht er in Bühnenhöhe, sonst `display: none`. Die Zeichnung ist höchstens 40svh
  hoch (`max-block-size: var(--schichten-zeichnung)`), sonst so hoch wie ihre Breite verlangt; Bühnenhöhe
  `--schichten-buehne` aus Seitenrand, Innenabstand und Spaltenbreite in vw und rem (EV-11). Gemessen: Auslauf = Bühne auf m390
  (173,4 px), t1024 (251,8), d1440 (314,2).
- Nr. 2 Zugabe: Jeder Satz blendet über 48 px (`--spacing` · 12) vor der Bühnenunterkante aus (eigener Zeitstrahl `view()` mit
  dem Einzug Kopf plus Bühne, nur opacity); die Unterkante der Bühne ist die vorhandene 1-px-Fuge. Ruhig und ohne Unterstützung
  klebt nichts, kein Auslauf, keine Blende.
  Bildfolge (bilder/schichten-nach/log.txt): Satz 5 steht lesbar unter der Bühne, während sich die Fugen füllen (m390: Füllung
  0,05 → 1 bei Satz 5 auf 591 → 351 px, Bühne endet bei 237 px; d1440: 0,16 → 0,79 bei 630 → 464 px, voll bei 381 px, Bühne endet
  bei 410 px). Am Ende steht die fertige Zeichnung allein, im Stillstand nirgends angeschnittene Schrift.
- Nr. 3 `momentZuerst` eingeschaltet: Zeichnung direkt nach Kopf und Einleitung, die vier Punkte und der DIN-Satz danach. Die
  Legende trägt die Erklärungen von „Untergrund“ und „Abdichtung“ ohne neuen Wortlaut: Schichten `fachwort` setzt an die Namen
  der Schichten 1 und 2 die Fachwort-Marke (dfn mit der Klammer aus config/glossar.ts, wie GefaelleBalkon in SF-B), die Klammer in
  Textstärke und in der Stufe des Satzes darunter; die Punkte nennen beide Wörter danach ohne Marke (Wortlaut gleich, K-011).
  test/seitenformel-folgen.test.mjs: /bad in `EIN.momentZuerst`. lesbarkeit.mjs /bad GRÜN (Glossar offen 0).
- Nr. 4 Seitenende: wie SF-B (Hauptknopf im Schritt, Projektcheck offen, Badanfrage zu). Projektcheck bleibt offen (E-104 Nr. 4),
  das Zielmaß „zwei Bildschirme kürzer“ gilt für /bad mobil als nicht erreichbar (Orchestrator).
- Nr. 5 (optional, Etiketten im Projektcheck): nicht umgesetzt, BadProjektCheck ist Formular (G8).

### M-C3 /referenzen · umgesetzt
- Nr. 1 `belegVorn`: seit SF-B eingeschaltet, unverändert.
- Nr. 2 Galerie: bei „Alle Fotos“ zuerst drei Reihen, 6 Fotos in einer oder zwei Spalten, 9 im Dreierraster (`ZUERST`), darunter
  „Alle {GALERIE.length} Fotos zeigen“ (aria-expanded, aria-controls; danach Fokus auf dem ersten neuen Foto, die neuen blenden
  gestaffelt ein wie beim Filtern, Staffel ≤ 8, Register galerie-filter). Der eingeklappte Zustand steht im Server-HTML
  (`data-eingeklappt`, `data-galerie-mehr`), verborgen nur mit `@media screen and (scripting: enabled)` (EV-14): ohne
  JavaScript und im Druck alle 24. Ein Raum zeigt immer alle Fotos seiner Gruppe (`?raum=dusche`: 2 von 2). Eingeklappt zeigt
  „Alle“ nur fertige Arbeiten (Test „Galerie 8“).
  Im Dreierraster bei „Alle Fotos“ im Verband: mittlere Spalte um ein Drittel einer Kachel tiefer (EV-13), Fotos ganz in 4 : 5.
  Ohne Maus der kurze Verlauf nur hinter dem Namen, „Ansehen →“ nur für den Vorleser (Glasbild `verlauf`, vorhandene Regel).
  Filterknöpfe ab md in drei gleich breiten Spalten, ab xl in einer Zeile (EV-15).
  Gemessen (galerie-Probe): m390 und t768 6 → 24 sichtbar, Fokus Foto 7; d1440 9 → 24, Fokus Foto 10; ohne JS 24.
- Nr. 3 Vorher-Nachher: Anleitung über dem Regler, „Vorher“ und „Nachher“ am Griff (wandern mit dem Lot, ohne JavaScript nicht
  gezeigt), die Zeile „Vorher/Nachher“ unter dem Bild entfällt (Wörter jetzt am Griff); Höhe `min(80svh, 100svh − 11rem)` ×
  Seitenverhältnis (EV-16).
- Nr. 4 Aufmacher: seit SF-A (start-dusche), unverändert.
- Seite m390 21.097 → 13.100 px, d1440 14.005 → 11.681 px (ruhig, ganze Seite).

### M-C8 /blog · umgesetzt
- Nr. 1 `wissenVorLage`: seit SF-B, unverändert.
- Nr. 2 Liste nach Thema: Bei „Alle Artikel“ ohne Suche je Thema ein mittiger Kopf (H3, Anzahl in Mono), Folge der Kategorien,
  „Ratgeber und Neuigkeiten“ zuletzt, die Stellenanzeige als letzter Eintrag. Vorsortiert auf dem Server (`nachThema` in
  inhalte/blog.ts, Aufruf in page.jsx); die Insel ordnet nur zu (ein Filter je Thema). Mit Filter oder Suche eine Liste wie bisher
  (H3 je Zeile; unter Gruppenköpfen H4; Nacharbeit N-5: Köpfe H2, Zeilen immer H3).
- Nr. 3 Zeilen: ab lg eine kompakte Zeile über die volle Inhaltsbreite (Zeichnung ein Fünftel breit links, Titel und Anriss in der
  Mitte, Kennzeile mit Thema und Lesezeit in Mono rechts, „Artikel lesen →“ unter dem Anriss); Anriss auf zwei Zeilen
  (line-clamp, Text im DOM), ein Anriss mit Fachwort ganz (EV-18). Gruppenköpfe ab lg abwechselnd um ein Sechstel versetzt.
- Nr. 4 Zeichnungen: je Thema eine Plan-Vignette (bad → bad, fliesen → wohnen, aussen → aussen, ratgeber → reparatur), auf dem
  Server gezeichnet und als fertige Knoten an die Insel gegeben (EV-17). Leitartikel als ruhiger Wissensmoment: Verlegeplan des
  Themas groß über die volle Breite des Kastens (ohne rote Achse), Kasten mit `sig-plan` und `sig-plan-ziel` wie die
  Leistungspläne (Desktop Hover/Fokus, Touch IO 40 %; ruhig Sofortzustand). KERN K-008 Spalte „Wo“ für sig-plan und
  register.json `hinweis` ergänzt; kein neuer Eintrag.
- Nr. 5: Titel mit `leading-tight` und `text-pretty`, Titel und Anriss im selben Satzmaß; Themenknöpfe brechen an der Kante des
  Suchfelds um (keine querlaufende Zeile mehr), gedrückt mit Haken statt Fugenkreuz (alle Themen, EV-17); Zeichnungen stehen ab
  dem ersten Bild (keine Bewegung an den Vignetten).
- Nr. 6 Seitenende: Versprechen zu seit SF-B; M-B6 Nr. 4 (Beleg ohne Bandhöhe) ist Welle 2; die Treppe bleibt.
- Seite d1440 11.438 → 10.808 px; m390 11.894 → 11.893 px (umbrechende Themenknöpfe und Gruppenköpfe gleichen die kürzeren
  Anrisse aus).

## 2 Entscheidungsvermerke (Abweichungen vom Plan)
- **EV-1 Einzugsband: offen auch die Zone des Ortes.** (Nacharbeit: ersetzt durch Variante (b), siehe N-2 in Abschnitt 7.) Ziel: „offen nur die Zone ≤ 10 km mit ‚Sie sind hier‘“. Befund: Nur vier
  der 13 Orte liegen ≤ 10 km (Aßlar, Wetzlar, Solms, Braunfels); bei Gießen, Limburg, Marburg u. a. stünde „Sie sind hier“ im
  geschlossenen Aufklapper und der Ortsmoment fehlte. Alternativen: (a) wie geplant nur ≤ 10 km; (b) alle Zonen bis zur Zone des
  Ortes offen; (c) ≤ 10 km und die Zone des Ortes offen, die übrigen zu. Gewählt (c). Wirkung: Wetzlar wie geplant (eine Zone
  offen); Limburg ≤ 10 km und ≤ 50 km offen, ≤ 25 km im Aufklapper. Risiko: gering, die Zeile des Aufklappers nennt „Weitere Orte
  bis 50 km“ auch dann richtig. Rückweg: in Einzugsband.tsx die Bedingung `|| g.orte.some(…)` streichen.
- **EV-2 register.ts geändert.** Der Plan nennt register.json, K-008 und die Registertests; der Auslöser steht zur Laufzeit in
  `src/lib/motion/register.ts` (Quelle von register.json, Test „Bewegung 1c/10“ hält beide gleich). Nur der Eintrag einzugsband
  (`sicht`, Schwelle 0,4) und seine letzte Staffelstufe. Rückweg: Eintrag auf `{ ausloeser: 'laden' }`, Test „Bewegung 3“ zurück.
- **EV-3 Staffel einzugsband 0/3/6 statt 0/5/10.** Der Eintrag stand in register.json `staffel_offen` (Stufe 10 über der Grenze 7,
  Vorschlag dort: 0, 3, 6). Da der Block ohnehin umgebaut wird, mit umgesetzt; `staffel_offen` verliert den Eintrag (Test
  „Bewegung 11“ verlangt das). Gesamt 0,96 s statt 1,2 s. Rückweg: zwei Zeilen in bewegung.css, letzteStufe 10, Eintrag zurück.
- **EV-4 /standorte (Übersicht) mitbetroffen.** Eine Kennung hat einen Auslöser; das Band im Einstieg der Übersicht zieht seine
  Kanten jetzt beim Eintritt (dort sofort nach dem Start des Bewegungsmoduls) statt ab dem ersten Bild per CSS. Bis dahin steht
  die 1-px-Kante nicht; Orte und Entfernungen stehen ab dem ersten Bild wie bisher. Bilder vorher/nachher liegen bei.
- **EV-5 Dateien außerhalb der Spalte `dateien`:** `vorlagen/teile/Lage.tsx` (Slot `zusatz` nach den Absätzen, ohne Angabe
  unverändert), `vorlagen/inhalt.ts` und `vorlagen/teile/Tun.tsx` (`Zeile.vignette`, Feld 4 : 3 wie in der Lage; Vorgriff auf
  M-B2 Nr. 2 nur für die Angabe, Namensstufe und Punktfliesen bleiben M-B2), `galerie-filter/GalerieFilter.tsx` (`verlauf`),
  `blog/liste/Leitfaden.jsx` (Leitartikel), `test/orte.test.mjs` („Orte 7“), `test/galerie-filter.test.mjs` („Galerie 8“),
  `test/blogKategorien.test.mjs` („Blog 4“). Keine davon gehört SF-C2. Wirkung auf andere Ansichten: keine (nur neue optionale
  Angaben). Rückweg: Angaben entfernen.
- **EV-6 Aufmacher Wetzlar: Dusche statt einer der Terrassen.** (Nacharbeit: Dusche für alle 13 Orte, siehe N-1.) Der Plan schlägt drei Fotos vor, ohne Zuordnung. Wetzlar (Index 0)
  bekommt die Dusche: Der Vorspann nennt zuerst Badsanierung, und beide Terrassen sind Nebenleistung. Prop der Seite heißt jetzt
  `band` statt `karte` (der Schlitz trägt keine Karte mehr). Rückweg: Tabellen AUFMACHER_* in orte.ts.
- **EV-7 Grundlinie fs-4 flach: tritt auf den Ortsseiten nicht auf.** Alle 13 Titel „Fliesenleger in …“ haben höchstens 44
  Zeichen (längster „Fliesenleger in Limburg an der Lahn“, 35); der Einstieg setzt sie in fs-6 und flach in fs-5, und für beide
  rechnet `schnur-grundlinie` mit der richtigen Zeilenhöhe (1,1 bzw. 1,15). Keine Änderung an Einstieg oder globals.css nötig.
  Wird ein Titel länger als 44 Zeichen, gilt Frage 5 aus der Notiz von SF-A (Rechnen mit `lh`).
- **EV-8 Navigation im Erstbesuch (M-C6 Nr. 5): ohne Änderung.** Untersucht auf 4324 (Stand der Sichtung) und 4325 bei d1440 im
  Erstbesuch: MutationObserver ab Dokumentbeginn (je drei Läufe): Die Navigation steht ab rund 90 ms durchgehend (flex, 659 px),
  wird nie entfernt, ersetzt oder verborgen; Screencast und das Verfahren der Bildfolge aus Anlauf 1 (je Bild ein neuer Kontext,
  Aufnahme bei domcontentloaded, Zeit-Animationen auf t gesetzt) zeigen sie in allen neun Ständen; keine Konsolenmeldung, keine
  Hydrierungsmeldung; Kopfbreite 1440 px (über @7xl = 1280 px), Scrollleiste 0 px. Die Lücke bei 800 und 1000 ms in Anlauf 1
  entstand im Messlauf, nicht im Ablauf der Seite. Header.jsx bleibt unberührt (gemeinsame Datei). Belege
  `$SCRATCH/sfix/c1/kopf-cast/`, `kopf-cast-4324/` (Screencast-Bilder), `kopf-vor/`.
- **EV-9 /bad Klammer in der Legende.** Die Erklärungen stehen jetzt im Namen der Schicht (Klammer in Textstärke, fs-3); der Satz
  der Schicht folgt darunter. `_werkstatt/texte/bad.md` trägt die Marken noch in den Punkten (Abgleich durch den Orchestrator).
- **EV-10 Leerzeichen zwischen Nummer und Name der Schicht.** Die Nummer (aria-hidden) stand ohne Textabstand vor dem Namen; im
  Text lautete die Zeile „1Untergrund“, und die Glossarprüfung fand das erste Vorkommen deshalb erst im Satz zu Schicht 2 (ROT).
  Jetzt ein echtes Leerzeichen, Rand `mr-2` statt `mr-3` (Abstand etwa gleich). Kein Bau nur für die Messung: Auch Kopieren und
  Vorlesen ohne Stil lesen jetzt „1 Untergrund“. Rückweg: `{' '}` streichen, `mr-3`.
- **EV-11 Bühnenhöhe aus vw und rem.** Keine Container-Einheiten im Zeitstrahl (Plan): Die Breite der Zeichnung ist aus
  seitenKlassen (px-4, md:px-8, lg:px-12, max-w-seite), dem Rand der Figur (2 px), dem Innenabstand der Bühne (p-4, lg:p-8) und
  max-w-md bzw. lg:w-1/2 nachgerechnet. Ändert sich eines davon, stimmt der Auslauf nicht mehr genau (zu groß schadet nicht,
  zu klein ließe Satz 5 knapp unter der Kante). Eine Scrollleiste macht 100vw bis 15 px breiter: Bühne rechnerisch bis rund 3 px zu
  hoch, der Satz blendet entsprechend früher aus. Die Höhenbegrenzung steht als `max-block-size` (`block-size` unterläge dem
  `h-auto` der Zeichnung in der Schicht utilities). Die letzte Stufe der Fugenfüllung (rund ein Fünftel) läuft auf d1440 und
  t1024, während Satz 5 schon ausblendet; die Zeitbereiche (cover 15 bis 45 %) blieben unverändert (Register).
- **EV-12 M-C1 Nr. 5 nicht umgesetzt** (optional; Projektcheck ist Formular, G8).
- **EV-13 Galerie im Verband per translate.** Plan: „Abstand innen wie fotosVersatz“. Ein Innenabstand im Raster macht jede Reihe
  um das Drittel höher und lässt in allen drei Spalten Lücken zwischen den Fotos. Gewählt: ruhendes `translate: 0 33.333 %` der
  mittleren Spalte (keine Bewegung, gleich in ruhig und reduziert), jede Kachel mit vollem 1-px-Rand (−1 px überlappend), unter der
  Liste ein Drittel einer Kachel Platz (100cqi · 5/36). Nur bei „Alle Fotos“; mit Filter ein glattes Raster (nth-child zählte sonst
  verborgene Kacheln mit). Rückweg: Block „Galerie … im Verband“ in globals.css und `data-verband` streichen.
- **EV-14 Rückfall per `scripting: enabled` statt noscript-Regel.** Gleiches Ergebnis wie eine noscript-Regel, zusätzlich ohne
  Sonderfall im Druck und in Browsern ohne diese Abfrage (dort stehen alle Fotos). Der Knopf trägt `noscript:hidden print:hidden`.
- **EV-15 Filterknöpfe:** ab md drei gleich breite Spalten (zwei Reihen zu drei), ab xl wie bisher eine Zeile.
- **EV-16 Vorher-Nachher nicht größer.** (Nacharbeit: Höhe, Anleitung und Wörter am Griff geändert, ab lg zweispaltig, siehe N-3 und N-4.) Befund: Die Fotos stehen 0,515 : 1 (hoch), der Regler war schon vorher durch 80svh begrenzt
  (d1440 370 × 718 px). Größer ginge nur mit Zuschnitt (E-104 Nr. 6, nicht zulässig) oder über einen Bildschirm hinaus. Umgesetzt:
  Anleitung oben, Wörter am Griff, Höhe `min(80svh, 100svh − 11rem)`, damit Anleitung und Regler in einen Bildschirm passen
  (d1440 unverändert 80svh; t1024 rund 592 statt 614 px hoch). Der Kopf (H2) passt bei d1440 nicht mit in denselben Bildschirm.
- **EV-17 /blog:** (Nacharbeit: Zeichnung je Beitrag, Gruppenköpfe H2 und Zeilen H3, Raster ab lg, siehe N-5 bis N-7.) Zeichnungen auf dem Server statt in der Insel (Verlegeplan-Code verlässt das Client-Bündel; `Themenmotiv` in
  BlogCard entfällt, einziger Nutzer war Leitfaden). Haken für jedes gedrückte Thema, nicht nur „Alle Artikel“ (ein Zeichen für
  „gewählt“). Gruppenköpfe ab lg in zwei Dritteln der Breite links bzw. rechts (Versatz ein Sechstel). „Artikel lesen →“ bleibt.
- **EV-18 Anriss mit Fachwort ohne line-clamp.** Mit Klemme stand auf m390 die Erklärung von „bodengleiche Dusche“ (erstes
  Vorkommen, SF-B V-9) halb da. Vier von zwölf Anrissen tragen eine Marke und stehen ganz. Rückweg: Bedingung in BlogCard streichen.

## 3 Gewollte Pixeländerungen je Ansicht (gegen 4325)
- `/standorte/wetzlar` und alle 13 Ortsseiten: Einstieg an der Schnur mit Lotstück, Bewertungszeile und Foto vor dem Vorspann
  (vorher Einzugsband im Bildplatz); Lage mit Einzugsband (Zone ≤ 10 km und die des Ortes offen, Aufklapper); „Das machen wir in …“
  mittig mit Vignetten; Fotoreihe in neuer Folge. Höhe d1440 8.831 → 9.380, m390 9.412 → 9.446 (Wetzlar).
- `/standorte`: Kante des Einzugsbands zieht beim Eintritt statt ab dem Laden (EV-4); Endzustand gleich.
- `/bad`: Tun mit der Szene zuerst, Legende mit zwei Klammern, Punkte und DIN-Satz danach; bewegt: Auslauf am Szenenende, Sätze
  blenden vor der Bühne aus. Höhe d1440 12.600 → 12.581, m390 13.162 → 13.178.
- `/referenzen`: Galerie eingeklappt (6/9), Verband im Dreierraster, Knopf „Alle 24 Fotos zeigen“, Filterknöpfe ab md dreispaltig;
  Vorher-Nachher mit Anleitung oben und Wörtern am Griff. Höhe d1440 14.005 → 11.681, m390 21.097 → 13.100.
- `/blog`: Liste nach Thema mit Gruppenköpfen, breite Zeilen ab lg, Vignetten, Leitartikel mit großem Plan, Themenknöpfe
  umbrechend mit Haken. Höhe d1440 11.438 → 10.808, m390 11.894 → 11.893.
- Alle übrigen Ansichten: nur die Bausteine oben, sonst pixelgleich (Lage `zusatz`, `Zeile.vignette`, Glasbild-Regel unverändert).

## 4 Textvorschläge (für TEXTVORSCHLAEGE.md)
1. Ansicht: /bad · Stelle: Legende der Szene „schichten“, Satz zu Schicht 1 · heute: „Darauf wird alles aufgebaut.“ · Vorschlag:
   „Auf ihm wird alles aufgebaut.“ · Grund: Nach der Klammer am Namen bezieht sich „Darauf“ auf die Klammer statt auf den Untergrund.
2. Ansicht: /standorte/limburg (und Orte mit langem Namen) · Stelle: Ortszeile im Einstieg · heute: „Fliesenverlegung Tezgel aus
   Aßlar, etwa 35 km bis Limburg an der Lahn.“ · Vorschlag: „Aus Aßlar, etwa 35 km bis Limburg an der Lahn.“ · Grund: wie der Vorschlag von SF-A zur
   Ortszeile von /referenzen: Name und Beruf stehen im Kopf; mobil eine Zeile weniger über dem Hauptknopf.
Neue Mikrotexte (Plan): „Weitere Orte bis 50 km“, „Alle {n} Fotos zeigen“, „{n} Artikel“ (Gruppenkopf).

## 5 Offene Fragen an den Orchestrator
1. EV-1: Zone des Ortes zusätzlich offen – so übernehmen?
2. EV-3: Staffel des Einzugsbands 0/3/6 gleich mit (register.json `staffel_offen` verliert den Eintrag)?
3. `_werkstatt/texte/bad.md`: Marken von „Untergrund“ und „Abdichtung“ aus den Punkten in die Legende der Szene nachziehen (EV-9)?
4. Lighthouse /standorte/wetzlar (LCP jetzt das Foto statt Text) und /blog (Insel ohne Verlegeplan-Code, Server-Knoten für die
   Zeichnungen) misst nur der Orchestrator; /referenzen: verborgene Fotos laden erst nach dem Aufklappen.
5. KERN K-008 und register.json: Versionsnummer und Änderungsprotokoll setzt der Orchestrator (in der Kopie nicht angehoben).

## 6 Prüfzahlen
- `npm test`: 269 Tests, 269 bestanden, 0 übersprungen (vorher 1 übersprungen ohne Bau; neu „Orte 7“, „Galerie 8“, „Blog 4“).
- `npx tsc --noEmit`: ohne Fehler. `npx eslint` über die geänderten Quell- und Testdateien: ohne Befund.
- `werte.mjs` über die 22 geänderten Quelldateien: 5 Befunde, dieselben 5 wie in `vor` (0.01ms in den Reduziert-Regeln von
  bewegung.css/globals.css, deren Ausnahme mit absoluten Pfaden nicht greift, und `STAFFEL_MAX: 7`); neu 0.
- `next build`: erfolgreich (Turbopack 16.4.3), ein Stylesheet je Seite (test/stylesheets.test.mjs grün).
- CSS gebaut (ein Stylesheet, /, /bad, /blog, /referenzen, /standorte/wetzlar, /kontakt): roh 137.787 → 140.587 B (+2.800),
  gzip −9 23.628 → 24.191 B (+563), gzip −6 23.746 → 24.319 B (+573).
- `erstesbild.mjs` (m390, q844, d1440; Erstbesuch und nach Einwilligung): vorher 19/24, nachher 19/24, je Fall gleich (Ausfälle
  sind der offene Cookie-Hinweis im Erstbesuch: q844 auf allen vier Ansichten, /referenzen m390 Kontakt). m360 mit 200 %
  (Kopie mit `html { font-size: 200% }` ab dem ersten Bild, Verfahren wie SF-B V-14): nach Einwilligung 4/4 → 4/4 alle fünf
  Punkte; Erstbesuch /standorte/wetzlar 3/5 → 4/5 (Hauptknopf jetzt über dem Hinweis), /bad 3/5, /referenzen 2/5, /blog 4/5
  unverändert (Hinweis deckt Hauptknopf bzw. Kontakt; Messbild, G7, nicht umgebaut). Belege `$SCRATCH/sfix/c1/erstesbild/`.
- `lesbarkeit.mjs` (/standorte/wetzlar, /standorte/limburg, /bad, /referenzen, /blog): vorher 5 GRÜN, nachher 5 GRÜN (Glossar
  offen überall 0; Flesch /bad 74,8 → 75,0, /referenzen 66,7 → 68,8, /blog 63,4 → 63,7). Belege `$SCRATCH/sfix/c1/lesbarkeit/`.
- Konsole (m390, /blog, /referenzen, /standorte/wetzlar, /bad auf 4460): keine Fehler oder Warnungen.
- Funktionsproben auf 4460 (Hilfsskripte, danach gelöscht): /blog „Alle Artikel“ vier Gruppen (4, 5, 1, 2), zwölf Zeilen als H4 (Nacharbeit: H3, Spec F-16 grün, siehe 7.4),
  Leitartikel mit sig-plan, Stellenanzeige zuletzt; Thema „Bad und Dusche“ eine Liste mit 4 Zeilen (H3) ohne Köpfe; Suche „Fugen“
  6 Zeilen; Leerzustand mit „Filter zurücksetzen“, danach wieder Gruppen und Fokus im Suchfeld (F-16 im Verhalten gleich).
  /referenzen eingeklappt, Aufklappen, Fokus, `?raum=`, ohne JavaScript wie unter M-C3. Einzugsband vor/nach dem Eintritt wie
  unter M-C6.
- Keine Lighthouse- und keine Zeitmessung (E-076).

## 7 Nacharbeit (nach Prüfung Welle 1, zwei Prüfer, 16 Befunde)

Stand 31.10.2026, Arbeitskopie wie oben, Server 4460 (neuer Bau), Vergleich 4325. Jeder Befund selbst nachgeprüft (eigene
Messung mit Hilfsskript, Bilder unter `$SCRATCH/sfix/c1/nacharbeit/{vor,nach,vn-bild}/`, Protokolle `vor/mess.log`,
`nach/mess.log`). Die Abschnitte 1 bis 6 oben gelten weiter, soweit hier nichts anderes steht; EV-1, EV-6, EV-16 und EV-17
sind durch N-1 bis N-5 ersetzt bzw. ergänzt.

### 7.1 Behoben
- **N-1 Aufmacher der Ortsseiten (mittel, orte.ts) – bestätigt.** Eigene Sicht: Terrasse in Erdtönen (balkon-beleg-3) zeigt im
  4 : 5-Feld Boden, Ablaufrost und Laub; die blaugraue Terrasse zeigt im ersten Bildschirm Hauswand, Fenster und Dachunterseite,
  die Fliesen erst unter der Falz. Jetzt die Dusche (start-beleg-dusche, IMG_2553) für alle 13 Orte (der Vorschlag des Prüfers
  als Rückfall; ein anderes helles Foto mit sichtbarer Arbeit, das nirgends Aufmacher ist, gibt es nach Originalnummer nicht
  ohne Konflikt: start-beleg-treppe liegt unter Helligkeit 0,45). Die Dusche steht in keiner Fotoreihe der Orte (Test „Orte 7“
  grün). Ersetzt EV-6. Rückweg: Konstante `AUFMACHER` in orte.ts.
- **N-2 Einzugsband: Zonenfolge lückenlos (mittel, zwei Befunde, Einzugsband.tsx) – bestätigt** (vorher bei Bad Nauheim,
  Butzbach, Friedberg, Haiger, Limburg, Marburg offen ≤ 10 und ≤ 50 km, ≤ 25 km im Aufklapper). Jetzt EV-1 Variante (b): offen
  alle Zonen bis einschließlich der Zone des Ortes, nur die ferneren im Aufklapper „Weitere Orte bis 50 km“ (die Zeile stimmt
  damit immer: verborgen sind nur fernere Orte). Gemessen: Wetzlar, Aßlar offen ≤ 10 | Aufklapper ≤ 25, ≤ 50; Gießen, Herborn
  offen ≤ 10, ≤ 25 | Aufklapper ≤ 50; Limburg, Marburg, Bad Nauheim alle drei offen, kein Aufklapper. DOM-Folge und Vorlesefolge
  nach Entfernung. Ersetzt EV-1 (c). Rückweg: Zeile `offen` in Einzugsband.tsx.
  Zeile des eigenen Ortes: `flex-nowrap items-baseline` (nur diese Zeile), Name und „Sie sind hier“ brechen in ihrer Spalte, die
  Entfernung bleibt in der ersten Zeile neben dem Namen. Limburg d1440: vorher (4325) 83 px, Entfernung 46 px tiefer (dritte
  Zeile), nach 62 px, Entfernung in der ersten Zeile; m390 59 px, erste Zeile (vorher 23 px tiefer). KERN K-008 (Zeile
  einzugsband) nachgezogen.
- **N-3 Vorher-Nachher auf q844 und an den Rändern (hoch und gering, VorherNachher.tsx, bewegung.css .vn-hoehe) – bestätigt.**
  - Höhe: `min(80svh, 100svh − 11rem)` gilt nur noch unter lg in Fenstern ab 40rem Höhe; flache Fenster (q844) und ab lg wieder
    80svh. q844 Bühne 110 × 212 → 160 × 310 px (= Stand 4325).
  - Anleitung außerhalb des Bildkastens in der Breite des Rahmens (max-w-md): q844 vorher (4325) 160 px breit in 4 Zeilen, nach
    448 px in 2 Zeilen; m390 2 Zeilen.
  - Wörter am Griff nur ab 18rem Bühnenbreite (Container-Abfrage an .vn-hoehe), sonst wie vor M-C3 die Zeile „Vorher | Nachher“
    unter dem Bild (q844, große Schrift). Zum Rand hin blenden sie aus (opacity an --teilung gebunden, keine neue Bewegungsart,
    kein Übergang): „Vorher“ ab 27 % abwärts, „Nachher“ ab 68 % aufwärts, je über 8 Stufen. Gemessen bei 8, 22, 30, 50, 70, 78,
    94 % auf m390, t768, t1024, d1440: kein Wort angeschnitten sichtbar (Deckkraft 0, solange es über den Rand ragt).
- **N-4 Vorher-Nachher ab lg zweispaltig (mittel) – bestätigt** (d1440 370 × 718 in sonst leerer Fläche). Ab lg Raster mit zwei
  Spalten im Seitenmaß: links die Anleitung in fs-4 (linksbündig, zwei Drittel der Spalte, an der Mitte), rechts der Regler in
  gleicher Größe (kein Zuschnitt). Der Kopf (H2) bleibt mittig darüber (Beleg.tsx unberührt). Bilder `vn-bild/`. Ergänzt EV-16.
- **N-5 Blog: Zeilen in jedem Zustand H3 (hoch, BlogFilter.jsx, BlogCard.jsx) – bestätigt** (Spec F-16 rot gegen den ersten Bau).
  Gruppenköpfe jetzt H2 (wie der Titel des Leitartikels), jede Zeile H3; `ebene` entfällt. Spec unverändert: `funktion-navigation
  -g "Blog-Übersicht"` gegen 4460 reduziert 4 passed, mit RELAUNCH_BEWEGUNG=an 4 passed. Überschriftenfolge: H2 Abschnitt, H2
  Leitartikel, H2 je Thema, H3 je Zeile (keine Stufe übersprungen).
- **N-6 Blog: Zeichnung je Beitrag (mittel, blog.ts, page.jsx, BlogFilter.jsx) – bestätigt.** `ARTIKEL_ZEICHNUNG` ordnet jedem
  Beitrag die Plan-Vignette seines Gegenstands zu (bad: Duschrinne und Gefälle; untergrund: Abdichtung am Wandanschluss;
  reparatur: Riss und eingesetztes Stück; wohnen: Raum im Großformat; treppe; aussen), innerhalb eines Themas keine zweimal und
  in der Folge nie zwei gleiche hintereinander (Test „Blog 5“). Die Insel bekommt jede benutzte Vignette einmal als Knoten (6)
  und je Beitrag nur den Namen (`motive`), keine größere Nutzlast als je Thema plus zwei Knoten. „Jede zweite Zeile größer“
  (Takt) nicht umgesetzt: es verlängerte die Liste, die N-7 kürzen soll.
- **N-7 Blog: Liste kürzer (mittel, BlogCard.jsx, BlogFilter.jsx) – bestätigt, Zielmaß nicht erreichbar.** Ab lg Sechserraster:
  Zeichnung ein Sechstel (vorher ein Fünftel), Titel und Anriss über vier Sechstel, rechts Kennzeile und darunter „Artikel lesen →“
  (vorher eine eigene Zeile unter dem Anriss). Mobil Zeichnung 64 px links neben der Spalte (vorher eigene Reihe mit 96 px), bei
  großer Schrift darüber. Themenknöpfe unter sm in zwei Spalten, „Alle Artikel“ über beide (m390 Reihen 5 Knöpfe in 4 Reihen →
  1/2/2). Abschnitt „Alle Artikel“ bis „Vieles rund ums Bad“ (H2 zu H2):

  | Ansicht | 4325 (vor C1) | erster Bau (Prüfer, 4462) | Nacharbeit 4460 | Zeilenhöhe nachher |
  |---|---|---|---|---|
  | d1440 | 5426 px | 4796 px | 4245 px (−22 % gegen 4325, −11 % gegen den ersten Bau) | 173 px (Leitartikel 785) |
  | t1024 | 5044 px | – | 4207 px (−17 %) | 176 px |
  | t768 | 4653 px | 4671 px | 4671 px (+0,4 %) | 222 px |
  | m390 | 5460 px | 5460 px | 5168 px (−5 %) | 200 bis 471 px (Anriss mit Fachwort ganz) |

  Seitenhöhe /blog m390 nach vollständigem Zeichnen (Fußbereich gezeichnet, 1,5 s nach dem Laden): 4325 16 343 px, 4460
  16 050 px. Die Spalte „Seite“ in `vor/mess.log` und `nach/mess.log` misst direkt nach dem Laden und hängt vom späten Zeichnen
  ab (m390 vorher 12 113 px ist ein Messartefakt), sie ist kein Beleg.

  t768 bleibt bei 222 px je Zeile (md-Fassung mit Zeichnung 128 px neben der Spalte unverändert). „Rund zwei Bildschirme“ ist mit zwölf Beiträgen, Leitartikel und vier Gruppenköpfen nicht
  erreichbar, ohne Inhalt zu kürzen (G4): zwölf Zeilen zu je rund 173 px sind allein 2,3 Bildschirme auf d1440.
  „Jede zweite Zeile größer“ nicht umgesetzt (s. N-6).
- **N-8 Galerie: Filterknöpfe unter md (gering, GalerieWahl.tsx) – bestätigt.** Zwei gleich breite Spalten (m390 Reihen 3/1/2 →
  2/2/2), bei großer Schrift eine Spalte (Container-Abfrage am Bedienblock), ab md wie bisher drei Spalten, ab xl eine Zeile.
- **N-9 Galerie: Verlauf auf Touch (gering, globals.css Block Galerie) – bestätigt.** Ohne Maus steht der Name auf dem Verlauf in
  höchstens zwei Zeilen (line-clamp, Text im DOM, Name des Links unverändert), nur in der Galerie von /referenzen (die Regel
  `glasbild[data-verlauf]` für / bleibt unberührt, / pixelgleich). Größter Anteil des Verlaufs an der Kachel: t768 rund 33 % →
  26 %, m390 24 %.
- **N-10 register.json (gering) – bestätigt.** Einrückung von `eingang` in `staffel_offen` auf 4 Leerzeichen zurück; der Diff
  zeigt dort nur noch den entfernten Eintrag einzugsband.

### 7.2 Nicht behoben (mit Begründung)
- **Tun.tsx: Einleitung mittig (gering).** Bestätigt als Beobachtung, aber kein Fehler dieses Bauteils: Die mittige Einleitung
  folgt aus `Abschnitt mitte` (alle Ansichten ohne `anDerLinie`, z. B. /bad, /referenzen, /ueber-uns); eine Ausnahme nur für
  Ortsseiten bräche die Einheitlichkeit der Vorlage, die Zeilenbreite (`Bereichszeilen`) teilen /referenzen und /ueber-uns (SF-C2).
  Vorschlag an den Orchestrator: Einleitung in `Abschnitt mitte` generell linksbündig im Satzmaß (Welle 2, M-B2), dann für alle
  Ansichten.
- **Schichten (gering).** (1) Punkte wiederholen die Legende: Kürzung ist Text und gehört zu M-B2 (Welle 2). (2) „Darauf wird alles
  aufgebaut.“: Textvorschlag „Auf ihm …“ steht in Abschnitt 4; nach E-104 Nr. 7 und K-011 bleiben Texte bis zur Antwort des
  Auftraggebers. (3) Leere Fläche am Szenenende: gewollt nach M-C1 Nr. 1 („am Ende steht die fertige Zeichnung allein“, Satz 5
  muss ganz unter die Bühne gleiten); ein Füllen mit dem ersten Punkt verschöbe die Reihenfolge Zeichnung → Punkte.
- **Einstieg: Foto ab lg auf 70svh (gering).** Das Format 4 : 5 vollständig gilt für alle Einstiege an der Schnur (Vorlage
  Einstieg, SF-A); eine Begrenzung nur für Ortsseiten wäre eine Sonderform der gemeinsamen Vorlage („ohne Wirkung auf andere
  Ansichten“), eine allgemeine ändert Ansichten anderer Bauteile. Vorschlag an den Orchestrator: `lg:max-h` für alle
  Schnur-Einstiege gemeinsam entscheiden.
- **Hover-Fehlalarm im Aufklapper (gering, Hinweis).** Kein Eingriff (G7). Mit N-2 gibt es den Aufklapper nur noch auf den Orten
  der Zonen ≤ 10 und ≤ 25 km (Wetzlar, Aßlar, Solms, Braunfels, Gießen, Herborn, Dillenburg); dort bleibt die Meldung
  `hover_fehler` für die Links im geschlossenen `details` als bekannte Folge im Belegvermerk.

### 7.3 Gewollte Pixeländerungen gegenüber dem ersten Bau (zusätzlich zu Abschnitt 3)
- Ortsseiten: Einstiegsfoto überall die Dusche; Einzugsband mit allen Zonen bis zur Zone des Ortes (Limburg, Marburg, Bad
  Nauheim, Butzbach, Friedberg, Haiger ohne Aufklapper); Zeile des eigenen Ortes mit Entfernung in der ersten Zeile.
- /referenzen: Vorher-Nachher ab lg zweispaltig (Anleitung links), unter lg Anleitung über dem Bild in Rahmenbreite; q844 Bühne
  wieder 160 × 310 mit Zeile „Vorher | Nachher“ darunter; Filterknöpfe mobil 2/2/2; Namen auf Touch höchstens zweizeilig.
- /blog: Zeichnung je Beitrag, Zeilen ab lg im Sechserraster mit Weg rechts, mobil Zeichnung neben dem Text, Themenknöpfe mobil im
  Raster.

### 7.4 Prüfzahlen der Nacharbeit
Alle Zahlen auf dem Endstand (Bau 14:01 UTC nach den letzten Änderungen an BlogCard.jsx, VorherNachher.tsx und KERN.md um
13:16; der Bau von 13:07 galt dafür nicht mehr), Server 4460, Vergleich 4325.
- `next build` (Turbopack 16.4.3): erfolgreich, rc 0 (`$SCRATCH/sfix/c1/build3.log`).
- `npm test`: 270 Tests, 270 bestanden, 0 übersprungen (erster Bau 269; neu „Blog 5“: Zeichnung je Beitrag, im Thema keine
  zweimal, nie zwei gleiche hintereinander). `npx tsc --noEmit`: ohne Fehler. `npx eslint` über die 27 geänderten Code- und
  Testdateien: ohne Befund (`npmtest3.log`, `tsc3.log`, `eslint3.log`).
- `werte.mjs` über die 22 geänderten Quelldateien: 5 Befunde, dieselben 5 wie in `vor` (zwei Reduziert-Regeln in bewegung.css,
  zwei in globals.css, `STAFFEL_MAX: 7` in galerie-filter/daten.ts); neu 0 (`werte3/`, `werte3-vor/`).
- Spec F-16 (`funktion-navigation -g "Blog-Übersicht"`, unverändert) gegen 4460: reduziert 4 passed, `RELAUNCH_BEWEGUNG=an`
  4 passed (`spec-f16-reduziert.log`, `spec-f16-bewegt.log`).
- `erstesbild.mjs` (m390, q844, d1440; Erstbesuch und nach Einwilligung, /standorte/wetzlar, /bad, /referenzen, /blog): 19/24,
  Tabelle gleich dem ersten Bau und dem Stand vor C1 (Ausfälle: offener Cookie-Hinweis im Erstbesuch, q844 alle vier,
  /referenzen m390 Kontakt). m360 mit 200 %: diesmal mit `html { font-size: 200% !important }` ab dem ersten Bild (strenger als die
  frühere Kopie, die Zahlen aus Abschnitt 6 sind damit nicht vergleichbar), dafür beide Stände im selben Verfahren: 4325 und
  4460 je 0/8 mit denselben 23 Abweichungen (Erstbesuch 1/5 überall, der Cookie-Hinweis deckt den Bildschirm; nach Einwilligung
  /standorte/wetzlar 4/5, /bad, /referenzen, /blog 3/5, Ort unter der Falz bzw. Leistenschild). Keine Verschlechterung durch C1
  (`erstesbild/nach3`, `nach3-200`, `vor3-200`).
- Messungen (`nacharbeit/nach/mess.log`, Endstand): Vorher-Nachher q844 Bühne 160 × 310 (= 4325), Anleitung 448 px in 2 Zeilen,
  Zeile „Vorher | Nachher“ unter dem Bild; m390 343 × 666, t768 421 × 817, t1024 316 × 612, d1440 370 × 718, ab lg Anleitung
  links (d1440 389 px, 2 Zeilen; t1024 293 px, 3 Zeilen); kein Wort am Griff mit Deckkraft > 0 über den Bühnenrand. Einzugsband
  wie unter N-2 auf 7 Orten × 2 Ansichten. Galerie m390 Knopfreihen 2/2/2, t768 3/3, Verlauf höchstens 24 % bzw. 26 % der Kachel.
- Bilder: `$SCRATCH/sfix/c1/bilder/nach/` (d1440 und m390, ruhig als ganze Seite, bewegt je Bildschirm: /standorte/wetzlar,
  /standorte/limburg, /standorte, /bad, /referenzen, /blog) neu vom Endstand; `nacharbeit/nach/` (vn, orte, blog, galerie) und
  `nacharbeit/vn-bild/*-nach.png` neu, `*-vor.png` und `nacharbeit/vor/` gegen 4325.
- Diff `$SCRATCH/sfix/c1/UM-E4-SICHT-FIX-c1.diff` neu vom Endstand (`diff -ruN` vor gegen baum, ohne node_modules, .next,
  next-env.d.ts, tsconfig.tsbuildinfo).
- `lesbarkeit.mjs` nicht erneut gefahren: kein Seitentext geändert (der Anriss ist nur zweizeilig gesetzt, Text vollständig im DOM).
- Keine Lighthouse- und keine Zeitmessung (E-076).
- Aufgeräumt: Server 4460 beendet, `baum/.next` und die echte Kopie von node_modules gelöscht, `baum/node_modules` wieder als
  Verweis auf die Wurzel. Hilfsskripte `_c1-nach.mjs` und `_c1-vn.mjs` liegen weiter im Werkzeugordner (entfernt der
  Orchestrator); die vorübergehenden Kopien `_c1-blogh.mjs` und `_c1-eb200.mjs` sind gelöscht.
