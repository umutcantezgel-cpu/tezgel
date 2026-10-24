{
 "gesamturteil": "Runde 3, Stand am Server 127.0.0.1:4320 (HEAD 4bffebe, Quelle 7502d90 und Folgecommits). Bei normaler Schrift ist die Startseite jetzt klar und ruhig. Der erste Bildschirm von m390 zeigt H1, Ort, Hauptknopf und Telefon; WhatsApp steht nur noch in der Leiste. t768 hat fünf statt acht Bedienflächen. Die Schrittlinie liegt auf dem Lot der Laserlinie. Orte mit Maßkette, Verlegemuster als Bildzeichen und der Termin-Abschnitt mit großer Rufnummer machen die Seite eigenständiger. Kundenstimmen, Auswahlknöpfe, Telefonknopf, Abdichtungsbeleg, HWK und 404 sind behoben.\n\nDie Abnahme scheitert weiter an drei Dingen. Erstens an P1 mit 200 %: Die Leiste zeigt nur Zeichen. Der Hauptknopf im Mobilmenü läuft beidseitig aus seiner Fläche. Entfernungen der Orte werden am Fensterrand abgeschnitten. Lage-Fliesen, Belegkasten, Galerie und Formular setzen 1 bis 2 Wörter je Zeile, weil die rem-Innenabstände mitwachsen. Zweitens an Nebenwirkungen der Runde-2-Korrekturen: `zusammen()` erzeugt in Flex-Knöpfen drei Flex-Kinder. Deshalb hat der Kopf-Hauptknopf auf jeder Seite ab lg doppelte Wortabstände, und der Menüknopf läuft bei 200 % über. Außerdem schrumpft das Kopf-Logo ab 2xl (d1920, d2560) auf 74 px Breite, die Wortmarke ist unlesbar. Drittens an der Auslieferung: Das CSS-Bündel `.next/dev/static/chunks/src_app_1s6nba_._.css` ist von 01:32. Die Leisten-Regel aus 7a82235 (01:33:34, `a:not([data-hauptknopf])`, `flex-grow: 2`) fehlt darin. Die Korrektur der Leiste ist also am Prüfstand nicht sichtbar und nicht prüfbar.\n\nUrteil: Verständlichkeit 7, Hierarchie 8, Komposition 7, Typografie 7, Bild 8, Eigenständigkeit 7, Handwerk 6. Ansichtswert etwa 7,1, Ziel nicht erreicht.\n\nZu den offenen Fragen der Werkzeuge: Im Bild verdeckt das offene Menü die Leiste vollständig, der axe-Befund target-size im Menüfuß ist also ein Werkzeugbefund. Die Laser-Spitze wandert sichtbar als Fortschritt vom Kopf nach unten und steht immer im Bild; das liest sich richtig.\n\nAufnahmen: /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/ (ganzseitig `*__ganz.jpg`, Ausschnitte in `teile/`, Scrollstellungen `bew__*`, `bew404__*`, `p1-200-bew__*`, Erstbesuch `erst__*`, Menü `menue__*`, Vergrößerungen in `zoom/`, Skripte in `skripte/`). Repo unverändert.",
 "rubrik": {
  "verstaendlichkeit": 7,
  "hierarchie": 8,
  "komposition": 7,
  "typografie": 7,
  "bild": 8,
  "eigenstaendigkeit": 7,
  "handwerk": 6
 },
 "abgleich_runde2": [
  {
   "befund": "R2-1 [hoch] m390 200 %: Kundenstimmen laufen rechts über den Rand",
   "stand": "behoben",
   "beleg": "Alle drei Stimmen bleiben zwischen 32 und 358 px. „empfehlen.Handwerk|lich“ bricht ohne Trennstrich, das ist durch den Wortlaut (G8) hingenommen. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/teile/p1-200__m390__t10_y18000.jpg und teile/p1-200__m390__t11_y19800.jpg"
  },
  {
   "befund": "R2-2 [hoch] m390 200 %: Auswahlknöpfe im Formular überdecken sich",
   "stand": "behoben",
   "beleg": "Vier Knöpfe einspaltig, je 260 px breit, ohne Überlappung. Das Formular ist innen aber weiter nur 260 px breit, siehe neuer Befund zu Platzhaltern. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/teile/p1-200__m390__t14_y25200.jpg"
  },
  {
   "befund": "R2-3 [mittel] m390 200 %: Telefonknopf im Einstieg, Symbol außerhalb, Nummer über den Rahmen",
   "stand": "behoben",
   "beleg": "„Anrufen: / 06441 / / 44 83 567“ steht in drei Zeilen im Rahmen, Hörer innen, Umbruch nur am Schrägstrich. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/teile/p1-200__m390__t00_y0.jpg"
  },
  {
   "befund": "R2-4 [mittel] m390 200 %: Lage-Fliesen mit 1 bis 2 Wörtern je Zeile; „Was wir tun“-Zeilen zu schmal",
   "stand": "teilweise",
   "beleg": "Die Bereichszeilen von „Was wir tun“ haben jetzt 2 bis 3 Wörter je Zeile, gut. Die Lage-Fliesen haben das Bild jetzt als 192-px-Streifen über dem Text. Der Text steht aber weiter in etwa 230 px Breite mit 1 bis 2 Wörtern je Zeile („Die / Badewanne / soll raus. / Ich möchte / eine / Dusche / ohne Stufe.“, 7 Zeilen). Der Pfeil von Kachel 4 stößt an die Kachelkante. teile/p1-200__m390__t02_y3600.jpg, teile/p1-200__m390__t03_y5400.jpg, zoom/p1_lagepfeil.jpg (alle unter /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/)"
  },
  {
   "befund": "R2-5 [mittel] m390 200 %: Untere Leiste zeigt nur Zeichen, „Termin“ nicht selbsterklärend",
   "stand": "offen",
   "beleg": "Die Leiste zeigt vier Felder mit je 96 bis 97 px (Schloss, Hörer, WhatsApp, Kalender), ohne ein Wort. Gemessen: `.leiste-text` von Termin ist 1 px breit. Ursache ist die Auslieferung, nicht die Quelle. `src/app/globals.css:405–417` enthält `a:not([data-hauptknopf])` und `flex-grow: 2`. Das ausgelieferte Bündel `/_next/static/chunks/src_app_1s6nba_._.css` (Datei `.next/dev/static/chunks/…`, 01:32) hat noch die alte Regel `[data-leiste] .leiste-text` ohne Ausnahme. Commit 7a82235 ist von 01:33:34. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/teile/p1-200__m390__t00_y0.jpg, ausgeliefertes CSS gesichert als …/E2-R3-SICHT/css.txt Zeile 6779–6788"
  },
  {
   "befund": "R2-6 [mittel] Kundenstimmen: große Stimme Elke S. mit fehlenden Leerzeichen in fs-5",
   "stand": "behoben",
   "beleg": "Die große Stimme ist jetzt C. W. (vollständige Sätze, fs-4). Elke S. steht klein rechts. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/bew__d1440__s06_y5400.jpg"
  },
  {
   "befund": "R2-7 [mittel] t768: acht Bedienflächen für drei Aufgaben im ersten Bildschirm",
   "stand": "behoben",
   "beleg": "Jetzt 5 Bedienflächen: Termin 2 (Einstieg, Leiste), Anrufen 2, WhatsApp 1 (Leiste). Der Kopf trägt unter lg keinen Knopf mehr. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/teile/start__t768__t00_y0.jpg"
  },
  {
   "befund": "R2-8 [mittel] m390 200 %: Mobilmenü-Fuß, Anrufen und WhatsApp sprengen ihre Knöpfe",
   "stand": "teilweise",
   "beleg": "Anrufen und WhatsApp stehen jetzt einspaltig vollständig im Knopf, WhatsApp mit Marke. Im selben Fuß läuft aber der Hauptknopf „Termin vor Ort anfragen“ links und rechts aus der dunklen Fläche (scrollWidth 357 > clientWidth 323), siehe neuer Befund N1. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/menue__m390_200.jpg"
  },
  {
   "befund": "R2-9 [mittel] m390 200 %: Hauptknopf erst nach 1,7 Bildschirmen, Knopf bricht dreizeilig",
   "stand": "teilweise",
   "beleg": "Der Vorspann steht jetzt nach Hauptknopf und Telefon. Der Hauptknopf liegt aber weiter im zweiten Bildschirm (y 956 bei 844 px Höhe) und bricht dreizeilig („Termin / vor Ort / anfragen“). Im ersten Bildschirm sind nur H1 und Ort. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/teile/p1-200__m390__t00_y0.jpg"
  },
  {
   "befund": "R2-10 [gering] m390: rote Leitachse und rote Ablauflinie 8 px nebeneinander",
   "stand": "behoben",
   "beleg": "Eine einzige rote Linie auf dem Lot bei x 8, die Schrittmarken sitzen darauf. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/bew__m390__s04_y3376.jpg"
  },
  {
   "befund": "R2-11 [gering] d1440: Ortskästen mit 290 px leerer Fläche, Orte und Termin schablonenhaft",
   "stand": "behoben",
   "beleg": "Zwei Spalten mit Maßkette je Entfernungsbereich. Die letzte Gruppe füllt die Spalte, rechts bleiben etwa 170 px Weiß in der Fliese. Der Termin-Abschnitt hat jetzt die große Rufnummer. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/teile/start__d1440__t05_y6000.jpg und teile/start__d1440__t06_y7200.jpg"
  },
  {
   "befund": "R2-12 [gering] Abdichtungsbeleg 41 Wörter, doppelt, „DIN / 18534“ bricht",
   "stand": "behoben",
   "beleg": "Zwei Sätze mit 22 und 15 Wörtern, ohne Wiederholung. „DIN 18534“ steht auf m390 und d1440 in einer Zeile. Bei 200 % ist der Kasten zu schmal, siehe neuer Befund N6. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/teile/start__m390__t01_y1800.jpg"
  },
  {
   "befund": "R2-13 [gering] Mono-Reste außerhalb von Zahlen, Platzhalter abgeschnitten",
   "stand": "behoben",
   "beleg": "„(für Bestätigung)“, „Firmensitz“ und die Feldnamen im Fuß sind jetzt in Archivo. Mono steht nur noch bei Nummern, Jahr, km und Schrittnummern. Platzhalter sind bei 100 % vollständig. Bei 200 % sind sie abgeschnitten, siehe N8. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/teile/start__m390__t04_y7200.jpg und teile/start__m390__t05_y9000.jpg"
  },
  {
   "befund": "R2-14 [gering] „Termin vor / Ort anfragen“ bricht in H2 und Hauptknopf",
   "stand": "behoben",
   "beleg": "„vor Ort“ bleibt in H2 und Knöpfen zusammen (200 %: „Termin / vor Ort / anfragen“). Nebenwirkung: In Flex-Knöpfen ohne inneren Span (Kopf, Mobilmenü) entstehen doppelte Wortabstände und bei 200 % ein Überlauf, siehe N1 und N5. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/teile/p1-200__m390__t13_y23400.jpg"
  },
  {
   "befund": "R2-15 [gering] Fuß: Abkürzung HWK unerklärt",
   "stand": "behoben",
   "beleg": "„Kammer: Handwerkskammer Wiesbaden“ steht ausgeschrieben. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/teile/start__m390__t06_y10800.jpg"
  },
  {
   "befund": "R2-16 [gering] 404: Nebenknopf vor dem Hauptknopf, Anrufen allein in Reihe 2",
   "stand": "behoben",
   "beleg": "Der Hauptknopf steht zuerst. Darunter stehen „Zur Startseite“ und „Anrufen“ in einer Reihe (d1440), mobil untereinander. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/teile/404__d1440__t00_y0.jpg und teile/404__m390__t00_y0.jpg"
  },
  {
   "befund": "R1 offen: Abdichtungssatz zu lang",
   "stand": "behoben",
   "beleg": "Längster Satz jetzt 22 Wörter, siehe R2-12."
  },
  {
   "befund": "R1 offen: mobil zu viele Bedienflächen",
   "stand": "behoben",
   "beleg": "Erster Bildschirm m390: Hauptknopf und Telefon im Einstieg, Leiste mit Anrufen, WhatsApp und Termin. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/bew__m390__s00_y0.jpg"
  },
  {
   "befund": "R1 offen: 200 %: H1 und Hauptknopf spät",
   "stand": "teilweise",
   "beleg": "Die H1 steht sofort im Bild. Der Hauptknopf kommt im zweiten Bildschirm (y 956). Der Ersatz im ersten Bildschirm wäre die Leiste mit „Termin“, sie zeigt aber kein Wort (R2-5)."
  },
  {
   "befund": "R1 offen: Silbentrennung kurzer Wörter",
   "stand": "teilweise",
   "beleg": "Weiterhin getrennt: „Unter-grund“ (t768, Ablauf, bei 700 px Zeilenbreite unnötig), „Tele-fonnummer“ (m390, Termin-Einleitung), „Bewer-tungen“ (m360, Kennzeile), „Handwerks-kammer“ (m390). Bei 200 % auch der Ortsname „Dillen-burg“ in einem Link. teile/start__t768__t02_y3200.jpg, teile/start__m360__t00_y0.jpg, teile/p1-200__m390__t12_y21600.jpg (unter …/E2-R3-SICHT/)"
  },
  {
   "befund": "R1 offen: Fuß mit Mono-Feldnamen",
   "stand": "behoben",
   "beleg": "Die Feldnamen sind in Archivo, Mono nur bei Nummern. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/teile/start__d1440__t07_y8400.jpg"
  }
 ],
 "befunde": [
  {
   "schwere": "hoch",
   "ansicht": "m390 und m360 mit 200 % Systemschrift, Mobilmenü offen",
   "abschnitt": "Mobilmenü, Fuß des Blatts (Hauptknopf)",
   "beobachtung": "Der Hauptknopf „Termin vor Ort anfragen“ läuft links und rechts aus seiner dunklen Fläche. „Te“ steht weiß auf hellem Grund und ist praktisch unsichtbar, der Pfeil liegt außerhalb rechts. Gemessen: scrollWidth 357 px, clientWidth 323 px, Wortabstand 16 px. Ausgerechnet P1s Hauptweg im Menü ist beschnitten.",
   "grund": "Der Link ist `flex` mit `gap-2`. `zusammen()` liefert drei Flex-Kinder: Text „Termin “, Span „vor Ort“ (nowrap) und Text „ anfragen“, dazu das Symbol. Die Wörter können nicht in eine zweite Zeile wechseln, und der rem-Abstand verdoppelt sich bei 200 %. Der Baustein `Knopf` setzt seinen Inhalt dagegen in einen einzigen `<span>`, dort tritt der Fehler nicht auf (Formular, Einstieg). Quelle: `src/components/common/MobileMenu.jsx:171–174`.",
   "vorschlag": "Im Menüfuß den Baustein `Knopf` bzw. `Hauptknopf` verwenden oder `{zusammen(primaryCta.name)}` in genau einen `<span>` legen (wie in `Knopf.tsx:28`). Dann wirkt `gap-2` nur zwischen Text und Pfeil, und der Text bricht innerhalb der Fläche zwei- bis dreizeilig um, wie im Einstieg.",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/zoom/menue200_knopf.jpg"
  },
  {
   "schwere": "hoch",
   "ansicht": "d1920 und d2560 (jede Seite ab 2xl = 1536 px)",
   "abschnitt": "Kopf, Logo",
   "beobachtung": "Das Kopf-Logo schrumpft auf 74 × 23 px. Zum Vergleich: d1440 138 px, t1024 154 px, d1280 107 px. Die Wortmarke „Fliesenverlegung Tezgel“ ist etwa 7 px hoch und auf dem größten Bildschirm nicht lesbar. Nach MUT tragen Logo, Farbwelt und Firmendaten die Wiedererkennung, das Logo ist hier am schwächsten.",
   "grund": "Der Logo-Link hat `min-w-0 shrink`. Ab 2xl werden Navigation und Knopf breiter (`2xl:pl-3`, `2xl:pr-3`, `2xl:w-8`, `2xl:gap-6`, `2xl:px-4`). Die Kopfzeile bleibt aber bei `max-w-seite` (1312 px), und es gibt nur noch einen Schrumpfkandidaten: das Logo mit `object-contain` (eingeführt für 200 %, E-021). `src/components/common/Header.jsx:117–119`, `:139–150`, `:231`.",
   "vorschlag": "Ab @7xl den Logo-Link `shrink-0` setzen. Die Navigation gibt dann über ihre Innenabstände nach, das Schrumpfen bleibt für große Systemschrift unterhalb @7xl erhalten. Alternativ die 2xl-Zuschläge der Navigation streichen und die Werte von d1440 behalten. Mindestbreite des Logos über eine Skalenstufe sichern (`min-w-32` = 128 px).",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/zoom/d1920_kopf.jpg"
  },
  {
   "schwere": "hoch",
   "ansicht": "m390 und m360 mit 200 % Systemschrift",
   "abschnitt": "Beleg, „Hier sind wir für Sie unterwegs.“ (Ortsgruppen)",
   "beobachtung": "Die Entfernungen ragen über die Fliese hinaus und werden am Fensterrand abgeschnitten („ca. 10 km“, „ca. 35 km“, „ca. 45 km“ verlieren das „m“ bzw. „km“). Die Trennfugen enden bei 308 px, die Angaben laufen bis 390. „Dillen-burg“, „Limburg / an der / Lahn“ und „Bad / Nauheim“ brechen in den Links. Die Überschrift „Mehr als 25 / km ab Aßlar“ trennt Zahl und Einheit.",
   "grund": "Die Fliese hat `p-6` (48 px bei 200 %). Name und Entfernung stehen in einer Zeile, die Entfernung ist `shrink-0` in Mono. `overflow-x: clip` an `main` versteckt den Überstand, statt ihn zu verhindern (Regelprüfer B1). `src/components/start/StartBeleg.tsx:123–146`.",
   "vorschlag": "Mit derselben Container-Abfrage wie bei den Lage-Fliesen (unter 20 rem) die Zeile untereinander setzen: Ort oben, Entfernung darunter (`flex-col items-start gap-1`), Innenabstand der Fliese `p-4` statt `p-6`. Ortsnamen und Links nie trennen (`hyphens-none`, wie Navigation und Fuß). In der Gruppenüberschrift Zahl und Einheit zusammenhalten (`zusammen()` um „25 km“ erweitern).",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/teile/p1-200__m390__t12_y21600.jpg"
  },
  {
   "schwere": "hoch",
   "ansicht": "Prüfstand 127.0.0.1:4320, sichtbar bei m390 mit 200 %",
   "abschnitt": "Untere Leiste (Auslieferung des globalen CSS)",
   "beobachtung": "Das ausgelieferte CSS-Bündel ist älter als die Quelle. Die Leisten-Regel aus Commit 7a82235 (Termin behält sein Wort, doppelte Breite) fehlt. Bei 200 % zeigt die Leiste nur Zeichen; ein Kalender für „Termin“ ist für P1 nicht selbsterklärend. Das war im ersten Bildschirm der einzige Weg zum Termin, weil der Hauptknopf erst im zweiten Bildschirm steht. Die Korrektur der Runde 2 ist damit am Prüfstand weder sichtbar noch prüfbar.",
   "grund": "`.next/dev/static/chunks/src_app_1s6nba_._.css` hat den Zeitstempel 01:32, der Commit mit der Änderung in `globals.css` 01:33:34. Turbopack hat `globals.css` danach nicht neu übersetzt. Ausgeliefert wird `@container not (min-width: 20em) { [data-leiste] .leiste-text {…} }` ohne Ausnahme für `[data-hauptknopf]`.",
   "vorschlag": "Vor der nächsten Runde den Entwicklungsserver mit geleertem `.next/dev` neu bauen lassen (Orchestrator) und die Leiste bei 200 % neu ansehen. Erwartet: Termin mit Wort bei `flex-grow: 2`, Hörer und WhatsApp als Zeichen. Für die Werkzeuge eine Gegenprobe ergänzen, die eine Regel aus der Quelle im ausgelieferten CSS sucht. Keine Gestaltungsänderung nötig.",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/teile/p1-200__m390__t00_y0.jpg"
  },
  {
   "schwere": "mittel",
   "ansicht": "d1280, d1440, d1920 (Kopf auf jeder Seite ab lg); m390 und m360 Mobilmenü bei 100 %",
   "abschnitt": "Kopf und Mobilmenü, Hauptknopf",
   "beobachtung": "Der wichtigste Knopf der Seite hat sichtbar doppelte Wortabstände: „Termin␣␣vor Ort␣␣anfragen“. Der Knopf im Einstieg und der Absendeknopf im Formular haben normale Abstände. Der gleiche Knopf wirkt also an zwei Stellen verschieden gesetzt.",
   "grund": "Gleiche Ursache wie beim Überlauf im Menü: `flex` mit `gap-2` (8 px) zwischen den drei Kindern aus `zusammen()`, zusätzlich zu den Leerzeichen. `Header.jsx:229–237`, `MobileMenu.jsx:171–174`.",
   "vorschlag": "Mit derselben Korrektur beheben: Text aus `zusammen()` in einen einzigen `<span>` legen oder den Baustein `Knopf` verwenden. Für die Prüfwerkzeuge eine Regel ergänzen, dass `[data-hauptknopf]` kein Flex-Container mit mehr als zwei Kindern sein darf.",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/zoom/d1440_kopf.jpg"
  },
  {
   "schwere": "mittel",
   "ansicht": "m390 mit 200 % Systemschrift",
   "abschnitt": "Was wir tun, Belegkasten (drei Sätze mit Plus-Zeichen)",
   "beobachtung": "Der Text steht in etwa 170 px Breite (x 130 bis 300), 1 bis 2 Wörter je Zeile. Acht Trennungen („Hand-/werks-/kammer“, „einge-/tragen“, „Abdich-/tung“, „wasser-/dichte“, „Abdich-/tungen“). Drei Sätze brauchen etwa 1.600 px, fast zwei Bildschirme.",
   "grund": "Fliesen-Innenabstand und Plus-Spalte sind in rem und verdoppeln sich bei 200 %. Die Container-Abfrage aus E-022 erfasst nur Lage-Fliesen und Bereichszeilen, nicht diesen Kasten.",
   "vorschlag": "Gleiche Container-Abfrage (unter 20 rem): Plus-Zeichen über den Satz statt in eine eigene Spalte (`flex-col gap-2`), Innenabstand `p-4` statt des heutigen Werts. Bei den Lage-Fliesen ebenso den Pfeil unter den Text (eigene Zeile, rechts) und `p-4`, damit der Satz die volle Breite von 324 px bekommt.",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/teile/p1-200__m390__t05_y9000.jpg"
  },
  {
   "schwere": "mittel",
   "ansicht": "m390 mit 200 % Systemschrift",
   "abschnitt": "Beleg, „So sieht unsere Arbeit aus.“ (Galerie)",
   "beobachtung": "Die Galerie bleibt zweispaltig. Fotos sind 147 × 180 px groß, Bildunterschriften stehen in 147 px Breite mit 1 bis 2 Wörtern je Zeile („Außen-/treppe“, „Balkon-/boden“, „Mosaik-/fliesen“). Für P1 sind die Fotos fertiger Arbeiten (A4) der Beweis, in dieser Größe sind Fugen und Gefälle kaum zu erkennen.",
   "grund": "Für die Galerie fehlt die Container-Abfrage, die bei den Lage-Fliesen schon greift.",
   "vorschlag": "Gleiche Container-Abfrage: unter 20 rem eine Spalte (`grid-cols-1`), Foto über die volle Breite von 326 px, Unterschrift darunter. Der Versatz der mittleren Spalte entfällt dort.",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/teile/p1-200__m390__t09_y16200.jpg"
  },
  {
   "schwere": "mittel",
   "ansicht": "m390 mit 200 % Systemschrift",
   "abschnitt": "Nächster Schritt, Formular",
   "beobachtung": "Die Eingabefelder sind nur 260 px breit, alle Platzhalter werden abgeschnitten: „Vor- und Nac“, „Für den Rück“, „ihre.adresse(“, „z. B. Aßlar, W“, „z. B. Dusche“. Die Kopfzeile „Anfrage direkt an Deniz Tezgel / Rückruf innerhalb von 24 Stunden“ braucht fünf Zeilen mit hängendem Einzug.",
   "grund": "Rahmen-Innenabstand (`p-8`, 64 px bei 200 %) und Feld-Innenabstand verdoppeln sich. Der Platzhalter ist die einzige Hilfe, was eingetragen werden soll.",
   "vorschlag": "Unter 20 rem den Formularrahmen `p-4` und die Felder `px-3` setzen. Die Eingaben bekommen dann etwa 310 px, die Platzhalter passen. Die Kopfzeile ohne Zeichenspalte untereinander setzen (Zeichen vor dem ersten Wort, `inline`).",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/teile/p1-200__m390__t14_y25200.jpg"
  },
  {
   "schwere": "mittel",
   "ansicht": "m390 mit 200 % Systemschrift, Mobilmenü offen",
   "abschnitt": "Mobilmenü, Liste der Hauptpunkte",
   "beobachtung": "Ohne Scrollen ist nur „Bad“ mit seiner Unterzeile zu sehen. Der feste Fuß mit drei großen Knöpfen nimmt etwa 384 der 844 px ein, der Scrollbereich der Liste nur 330 px. Dass es vier weitere Bereiche gibt, ist nicht zu erkennen.",
   "grund": "Der Fuß ist fest, und jede Unterzeile (z. B. „Neues Bad, Dusche ohne Stufe und große Fliesen“) braucht bei 200 % vier Zeilen. K-009 verlangt, dass das Menü die fünf Punkte zeigt (Regelprüfer B7).",
   "vorschlag": "Unter 20 rem Blattbreite die Unterzeilen der Hauptpunkte ausblenden (die Namen tragen allein). Nur den Hauptknopf fest stehen lassen. Anrufen und WhatsApp ans Listenende verschieben, sie scrollen dann mit und stehen ohnehin in der Leiste. Ziel: alle fünf Namen im ersten Bild des Menüs.",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/menue__m390_200.jpg"
  },
  {
   "schwere": "mittel",
   "ansicht": "m390 mit 200 % Systemschrift",
   "abschnitt": "Fuß, Firmendaten",
   "beobachtung": "Die Rufnummern brechen innerhalb der Zifferngruppen („06441 / 44 83 / 567“, „0172 / 67 28 / 504“, Fax ebenso). „USt-IdNr. DE 259249094“ ragt rechts aus dem Kasten und wird am Fensterrand abgeschnitten. „Betrieb seit“ und „USt-IdNr.“ stehen in zwei 130 px schmalen Spalten.",
   "grund": "Der Fuß nutzt nicht den Baustein `Rufnummer`, der seit E-022 nur nach dem Schrägstrich umbricht. Die zweispaltigen Datenkästen haben keine Container-Abfrage. Die Firmendaten tragen nach MUT die Wiedererkennung.",
   "vorschlag": "Telefon, Mobil und Fax im Fuß über den Baustein `Rufnummer` setzen. Die Datenkästen unter 20 rem einspaltig, Innenabstand `p-4`.",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/teile/p1-200__m390__t18_y32400.jpg"
  },
  {
   "schwere": "gering",
   "ansicht": "d1440 und d1920",
   "abschnitt": "Beleg, „Das sagen unsere Kunden.“",
   "beobachtung": "Die große Stimme von C. W. steht senkrecht mittig in ihrer Spalte, darüber etwa 150 px leere Fläche. Ihre Oberkante liegt nicht an der Linie der rechten Spalte. Die Stimmen sind die einzige Stelle des Belegs ohne Laserlinie oder Fugenraster und wirken wie ein gewöhnlicher Bewertungsblock.",
   "grund": "Die Spalten sind mittig ausgerichtet. Der Baustein `anriss` aus dem Register (K-007, Schlüsselwort einer Stimme) wird auf der Startseite nicht genutzt.",
   "vorschlag": "Die große Stimme oben an der Fuge ausrichten (`self-start`), die Hierarchie trägt allein die Größe. Ein Schlüsselwort der großen Stimme mit dem vorhandenen `anriss` markieren (Wortlaut bleibt), z. B. „ordnungsgemäß, sauber und pünktlich“.",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/bew__d1440__s06_y5400.jpg"
  },
  {
   "schwere": "gering",
   "ansicht": "d1440 und d1920",
   "abschnitt": "Ihre Lage, So läuft es ab, So sieht unsere Arbeit aus",
   "beobachtung": "Drei Abschnitte hintereinander nutzen denselben Kunstgriff: Die rechte Lage-Spalte, Schritt 2 und die mittlere Galerie-Spalte sind jeweils um Stufe 16 nach unten versetzt. Der Versatz wirkt dadurch wie eine Masche und nicht mehr wie der eine bewusste Bruch.",
   "grund": "K-003 Nr. 4: „Lassen: drei gleich gebaute Abschnitte in Folge“. Der Drittelverband lebt davon, dass er auffällt.",
   "vorschlag": "Die Galerie ohne Versatz als gerade Fläche im Fugenraster setzen (`gap-px bg-fuge`, Fotos stoßen mit einer Fuge aneinander, wie die Ortsfliesen). Der Versatz bleibt bei Lage und Ablauf.",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/teile/start__d1440__t03_y3600.jpg"
  },
  {
   "schwere": "gering",
   "ansicht": "t768, m390, m360 (100 %)",
   "abschnitt": "Ablauf, Termin, Kennzeile im Einstieg",
   "beobachtung": "Wörter mit 10 bis 12 Buchstaben werden auch bei ausreichender Zeilenbreite getrennt: „prüft den Unter-grund“ (t768, 700 px Zeile), „Ihre Tele-fonnummer“ (m390, Termin-Einleitung), „27 Bewer-tungen bei Google“ (m360, Kennzeile).",
   "grund": "`hyphenate-limit-chars: 10 4 4` lässt Trennungen ab 10 Buchstaben zu. Für P1 sind getrennte Schlüsselwörter (Untergrund, Telefonnummer) schwerer zu lesen als eine kürzere Zeile.",
   "vorschlag": "Grenze auf `12 5 5` anheben und Kennzeilen sowie Bildunterschriften (`text-fs-1`/`fs-2`) mit `hyphens-none` setzen, wie Navigation und Fuß.",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/teile/start__t768__t02_y3200.jpg"
  },
  {
   "schwere": "gering",
   "ansicht": "t768",
   "abschnitt": "Worum es geht (Startbild)",
   "beobachtung": "Das Startbild ist 527 px breit und endet bei x 559. Rechts daneben bleiben 177 px leere Kalkfläche bis zur Textkante 736. Das ist weder volle Breite noch ein lesbarer Drittelversatz und wirkt wie ein Rest.",
   "grund": "Die Bildbreite folgt keiner Rasterstufe dieses Bildschirms. Im ersten Bildschirm von t768 ist das Foto der größte Blickfang.",
   "vorschlag": "Startbild über die volle Textbreite (8 Spalten) setzen, oder bewusst um ein Drittel der Spaltenbreite einrücken und dies als den einen Versatz des Bildschirms nutzen.",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/teile/start__t768__t00_y0.jpg"
  },
  {
   "schwere": "gering",
   "ansicht": "d1440, m390",
   "abschnitt": "Ihre Lage, Fliese „Im Neubau sollen Böden und Wände gefliest werden.“",
   "beobachtung": "Neben echten Fotos zeigt diese Fliese nur ein weißes Halbverband-Muster auf Weiß. Sie liest sich wie ein fehlendes Bild. Die Reparatur-Fliese daneben erklärt sich dagegen sofort durch den Riss.",
   "grund": "K-012 erlaubt die Fliesenkomposition, wo kein Foto da ist; sie soll aber etwas zeigen (Fliese, Fuge, Laserlinie). Ohne Linie oder Kante ist sie stumm.",
   "vorschlag": "In der Komposition eine Verlegekante zeigen: halbe Fläche gelegt, halbe leer, dazwischen die Laserlinie (2 px `laser`), wie in der 404-Zeichnung. Oder ein Neubau-Foto aus `bildinventar.csv`, falls eines frei ist.",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R3-SICHT/bew__d1440__s01_y900.jpg"
  }
 ],
 "weg_zu_acht": "Reihenfolge nach der größten Wirkung:\n\n1. Handwerk (6 → 8)\n   - `zusammen()` in Flex-Knöpfen in einen einzigen Span legen oder den Baustein `Knopf` verwenden. Eine Änderung behebt den beschnittenen Menü-Hauptknopf bei 200 % (hoch) und die doppelten Wortabstände im Kopf auf jeder Seite.\n   - Kopf-Logo ab @7xl `shrink-0`, dazu die 2xl-Zuschläge der Navigation streichen. Das Logo muss auf d1920 und d2560 so groß bleiben wie auf d1440.\n   - Ortsgruppen bei 200 % ohne Überstand: Entfernung unter dem Namen, `p-4`.\n   - Fuß mit dem Baustein `Rufnummer`, Datenkästen bei 200 % einspaltig.\n   - Prüfstand neu bauen, damit das ausgelieferte CSS der Quelle entspricht. Danach die Leiste prüfen.\n\n2. Verständlichkeit (7 → 8), Prüfstein P1\n   - Nach dem Neubau muss die Leiste bei 200 % „Termin“ als Wort zeigen. Sie ist dort der einzige Weg zum Termin im ersten Bildschirm, weil der Hauptknopf erst bei y 956 steht.\n   - Der Menü-Hauptknopf muss lesbar in seiner Fläche stehen.\n   - Das Menü muss alle fünf Bereiche ohne Scrollen zeigen: Unterzeilen unter 20 rem ausblenden, Anrufen und WhatsApp in die Liste.\n   - Entfernungen müssen vollständig lesbar sein.\n   - Damit sind A2, A3 und A6 bei 200 % ohne Suchen lösbar.\n\n3. Komposition (7 → 8)\n   - Die vorhandene Container-Abfrage (unter 20 rem) auf alle schmalen Mehrspalter anwenden: Lage-Text über die volle Breite mit Pfeil darunter, Belegkasten mit Plus-Zeichen über dem Satz, Galerie einspaltig, Formular mit `p-4` und `px-3`. Ziel: mindestens 3 bis 4 Wörter je Zeile bei 200 %.\n   - Auf Desktop die große Stimme oben an der Fuge ausrichten.\n   - Den Versatz nicht dreimal hintereinander zeigen: Galerie gerade im Fugenraster.\n   - Das Startbild auf t768 an eine Rasterstufe binden.\n\n4. Typografie (7 → 8)\n   - Doppelte Wortabstände entfernen (siehe 1).\n   - `hyphenate-limit-chars` auf 12 5 5 setzen. Ortsnamen, Links, Kennzeilen und Bildunterschriften nie trennen, also kein „Dillen-burg“, „Bewer-tungen“, „Unter-grund“ mehr.\n   - Rufnummern im Fuß nur am Schrägstrich umbrechen.\n   - In der Gruppenüberschrift „25 km“ zusammenhalten.\n\n5. Eigenständigkeit (7 → 8)\n   - Austauschprobe heute: Mit anderem Logo könnte die Seite einem anderen Fliesenleger gehören, keinem anderen Gewerk. Laserlinie auf dem Lot, Maßkette, Verlegemuster als Bildzeichen und die 404-Fliese tragen.\n   - Generisch bleiben Kundenstimmen und Galerie. Abhilfe: Die große Stimme bekommt den vorhandenen `anriss` (Laser markiert das Schlüsselwort, Wortlaut bleibt). Die Galerie liegt als Fläche mit 1-px-Fugen wie ein verlegter Boden. Die Neubau-Fliese zeigt eine Verlegekante an der Laserlinie statt eines leeren Musters.\n   - Das Logo muss auf großen Bildschirmen lesbar groß bleiben (siehe 1), sonst fehlt dort der stärkste Wiedererkennungsträger.\n\nHierarchie (8) und Bild (8) erfüllen das Ziel. Beim Bild würde die einspaltige Galerie bei 200 % zusätzlich helfen."
}
