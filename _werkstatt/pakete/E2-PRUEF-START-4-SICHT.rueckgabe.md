{
 "gesamturteil": "Runde 4 der Sichtprüfung (Runde 3 der Überarbeitung). Prüfstand 127.0.0.1:4320, HEAD 5436af2. Die Startseiten-Quellen sind seit 58df170 unverändert: Seitdem kamen nur neue Dateien unter vorlagen/, inhalte/ und lib/textmarken hinzu, start/, common/ und globals.css blieben gleich. Vorab bestanden: Das ausgelieferte `src_app_1s6nba_._.css` enthält „hyphenate-limit-chars: 12 5 5“.\n\nBei normaler Schrift ist die Startseite jetzt auf allen fünf Breiten sauber gesetzt. Doppelte Wortabstände sind weg, das Kopf-Logo ist von d1280 bis d2560 gleich groß (140,8 px), die Galerie liegt als gerade Fläche mit 1-px-Fugen, die große Stimme steht oben und trägt die Laserlinie, die Neubau-Fliese zeigt eine Verlegekante, das Startbild auf t768 sitzt an der Textkante. Auch P1 mit 200 % kommt deutlich weiter. Die Leiste zeigt „Termin“ als Wort (130 px). Der Menü-Hauptknopf steht in seiner Fläche. Orte, Belegkasten, Lage-Fliesen, Galerie und Fuß nutzen die volle Breite, nichts ragt bei m390 über den Rand. Damit sind 13 von 15 Befunden der Runde 3 behoben.\n\nOffen sind zwei Punkte, die E-023 als erledigt meldet, die am Prüfstand aber nicht stimmen. Erstens zeigt das Mobilmenü bei 200 % nur 3 von 5 Hauptpunkten (m390) bzw. 2 von 5 (m360), K-009 verlangt 5 von 5. Zweitens sind bei 200 % weiter alle fünf Platzhalter abgeschnitten (Innenbreite 226 px, nötig 241 bis 407 px). Neu dazu:\n- Die große Rufnummer im Termin wird bei m360 200 % um 3,2 px beschnitten, die letzte Ziffer „7“ ist angeschnitten.\n- Zitate werden trotz `hyphens-none` getrennt, darunter der Firmenname („Fliesenver-legung“) und „uneinge-schränkt“ selbst auf t768.\n- h3 mit `font-text` stehen im schmalen Anzeigeschnitt.\n- Bei t1024 steht im Kopf ein Mono-Etikett.\n- Zahl und Nomen werden in der Kennzeile getrennt.\nAlle neuen Befunde sind mittel oder gering, keiner ist hoch.\n\nUrteil: Verständlichkeit 8, Hierarchie 8, Komposition 8, Typografie 7, Bild 8, Eigenständigkeit 8, Handwerk 7. Ansichtswert etwa 7,7. Damit liegt keine Kategorie unter 7, das Ziel ≥ 8 ist aber knapp verfehlt. Es fehlen Handwerk und Typografie, beides sind kleine, gezielte Korrekturen.\n\nAustauschprobe: Ein anderes Gewerk kann die Seite nicht übernehmen. Dafür sorgen das Intro mit Fliesenfläche und Logo, die Laserlinie auf dem Lot, Fugenkreuze, Maßkette, Verlegemuster, Verlegekante, die Galerie als verlegte Fläche und die 404 mit verrutschter Fliese. Ein anderer Fliesenleger müsste Deniz Tezgel, die Orte mit km ab Aßlar und die echten Fotos tauschen (eines zeigt einen Mitarbeiter im eigenen Pullover). Generisch bleiben nur Formular und Stimmenblock.\n\nZu offenen Fragen der Werkzeuge:\n- axe target-size im Menü (5,7 px) ist ein Werkzeugbefund. Im Bild liegt das Popover-Blatt über der Leiste, der Knopf ist von y 779 bis 828 vollständig zu sehen (menue__m390.jpg).\n- Die Laserspitze steht in allen Abschnitten mit Kalkgrund im Bild. In den weißen Flächen (Ablauf, Stimmen, Termin) verdecken die Flächen das Lot, das ist so gebaut. Im Ablauf übernimmt die Schrittlinie, in Stimmen und Termin fehlt die Linie (gering, siehe Befund).\n- Die erste Stelle der Leiste nimmt das Cookie-Schild ein (Schloss, bei 200 % 96 px). Deshalb verliert „Anrufen“ sein Wort. Das gehört zur Einwilligung und ist hier kein Befund, sondern eine Frage für MENSCHEN.md.\n- Konsole: nur die erwarteten 404-Meldungen auf /gibt-es-nicht. Dazu kommt eine Next-Warnung zum Kopf-Logo bei m360 mit 200 %.\n\nAufnahmen liegen unter /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/:\n- ganzseitig `*__ganz.jpg`, Ausschnitte in `teile/`\n- Scrollstellungen `bew__*`, `bew404__*`, `p1-200-bew__*`\n- Erstbesuch `erst__*`, Menü `menue__*`\n- Vergrößerungen in `zoom/`, darunter laser_d1440.jpg und laser_m390.jpg als Streifen der Laserspitze über alle Stellungen\n- Messungen mess1.json und mess2.json, Skripte in `skripte/`\n\nIm Repo ist nichts geändert, nichts committet und kein Server gestartet.",
 "rubrik": {
  "verstaendlichkeit": 8,
  "hierarchie": 8,
  "komposition": 8,
  "typografie": 7,
  "bild": 8,
  "eigenstaendigkeit": 8,
  "handwerk": 7
 },
 "abgleich_vorrunde": [
  {
   "befund": "R3-1 [hoch] m390/m360 200 %, Mobilmenü: Hauptknopf läuft links und rechts aus seiner Fläche",
   "stand": "behoben",
   "beleg": "„Termin / vor Ort / anfragen“ steht dreizeilig in der Tinte-Fläche (x 33 bis 358), der Pfeil innen. Laut Regelprüfer ist scrollWidth = clientWidth. Bei 100 % normale Wortabstände. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/menue__m390_200.jpg, …/E2-R4-SICHT/menue__m360_200.jpg, …/E2-R4-SICHT/menue__m390.jpg"
  },
  {
   "befund": "R3-2 [hoch] d1920/d2560: Kopf-Logo schrumpft auf 74 px",
   "stand": "behoben",
   "beleg": "Das Logo ist bei d1280, d1440, d1920 und d2560 gleich groß, gemessen 140,8 × 44 px bei d1440. Die Wortmarke ist lesbar. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/zoom/logos.jpg, …/zoom/koepfe.jpg"
  },
  {
   "befund": "R3-3 [hoch] m390/m360 200 %: Entfernungen der Orte am Fensterrand abgeschnitten, Ortsnamen getrennt",
   "stand": "behoben",
   "beleg": "Die Entfernung steht unter dem Ort, alle 13 Angaben liegen in der Fliese (x 65 bis 325). Kein Ortsname ist getrennt, „Mehr als / 25 km ab Aßlar“ hält Zahl und Einheit zusammen. Restpunkt sind ungleiche Abstände bei zweizeiligen Namen (neuer Befund). /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/teile/p1-200__m390__t14_y22400.jpg, …/teile/p1-200__m390__t15_y24000.jpg"
  },
  {
   "befund": "R3-4 [hoch] Prüfstand: ausgeliefertes CSS älter als die Quelle, Leiste bei 200 % nur Zeichen",
   "stand": "behoben",
   "beleg": "Die Marke „hyphenate-limit-chars: 12 5 5“ steht im ausgelieferten `src_app_1s6nba_._.css`. Die Leiste bei 200 % (gemessen): Schild 96 px, Anrufen 81 px (Hörer), WhatsApp 81 px (Marke), Termin 130 px mit Kalender und dem Wort „Termin“. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/p1-200-bew__m390__s00_y0.jpg, …/E2-R4-SICHT/mess1.json"
  },
  {
   "befund": "R3-5 [mittel] Kopf ab lg und Mobilmenü: doppelte Wortabstände im Hauptknopf",
   "stand": "behoben",
   "beleg": "Kopf-, Einstieg- und Menüknopf haben gleiche, normale Wortabstände. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/zoom/d1440_knoepfe.jpg, …/E2-R4-SICHT/menue__m390.jpg"
  },
  {
   "befund": "R3-6 [mittel] m390 200 %: Belegkasten in 170 px Breite, acht Trennungen",
   "stand": "behoben",
   "beleg": "Das Fugenkreuz steht über dem Satz, der Satz läuft von x 58 bis 330 (etwa 275 px), 2 bis 4 Wörter je Zeile. Übrig sind drei Trennungen, nur in Wörtern ab 12 Zeichen („Handwerks-kammer“, „wasser-dichte“, „Abdich-tungen“), das ist regelkonform. Die Länge von etwa 1.700 px kommt aus den Fachwort-Erklärungen und ist bei 200 % hinzunehmen. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/teile/p1-200__m390__t06_y9600.jpg"
  },
  {
   "befund": "R3-7 [mittel] m390 200 %: Galerie zweispaltig, Fotos 147 px",
   "stand": "behoben",
   "beleg": "Eine Spalte, Fotos 324 px breit, die Unterschriften stehen ungetrennt darunter. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/teile/p1-200__m390__t09_y14400.jpg"
  },
  {
   "befund": "R3-8 [mittel] m390 200 %: Formular, Platzhalter abgeschnitten, Kopfzeile mit hängendem Einzug",
   "stand": "teilweise",
   "beleg": "Die Kopfzeile fließt jetzt (Zeichen vor dem ersten Wort), der Rahmen ist schmaler. Die Felder sind aber nur 276 px breit, innen 226 px (m360: 196 px). Die Platzhalter brauchen 241 bis 407 px, alle fünf sind weiter abgeschnitten: „Vor- und Nachn“, „Für den Rückru“, „ihre.adresse@l“, „z. B. Aßlar, Wet“, „z. B. Dusche oh“. Die Aussage in E-023 „passen jetzt bei 200 %“ trifft am Prüfstand nicht zu. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/teile/p1-200__m390__t17_y27200.jpg, …/E2-R4-SICHT/mess2.json"
  },
  {
   "befund": "R3-9 [mittel] m390 200 %, Mobilmenü: ohne Scrollen nur „Bad“ sichtbar",
   "stand": "teilweise",
   "beleg": "Die Unterzeilen sind weg, Anrufen und WhatsApp stehen am Listenende, im Fuß steht nur noch der Hauptknopf. Gemessen bei m390: Der Scrollbereich reicht von y 128 bis 590. Bad, Böden und Wände, Balkon und Terrasse sind sichtbar, „Unsere Arbeiten“ (576 bis 668) ist nur 14 px angeschnitten, „Über uns“ (669 bis 761) bleibt unsichtbar. m360: 2 von 5. K-009 verlangt 5 von 5, E-023 meldet „alle fünf im ersten Bild“. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/menue__m390_200.jpg, …/menue__m360_200.jpg, …/mess1.json"
  },
  {
   "befund": "R3-10 [mittel] m390 200 %: Fuß, Rufnummern brechen in Zifferngruppen, USt-IdNr. abgeschnitten",
   "stand": "behoben",
   "beleg": "Die Rufnummern brechen nur am Schrägstrich, die Kästen sind einspaltig, „DE 259249094“ steht im Kasten. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/teile/p1-200__m390__t20_y32000.jpg, …/teile/p1-200__m390__t21_y33600.jpg"
  },
  {
   "befund": "R3-11 [gering] d1440/d1920: große Stimme senkrecht mittig, ohne Laserlinie",
   "stand": "behoben",
   "beleg": "Die große Stimme steht oben an der Fuge, „ordnungsgemäß, sauber und pünktlich“ ist mit der Laserlinie unterstrichen. Restpunkt: Darunter bleiben etwa 300 px leere linke Spalte (neuer Befund). /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/bew__d1440__s06_y5400.jpg"
  },
  {
   "befund": "R3-12 [gering] d1440/d1920: Versatz dreimal hintereinander",
   "stand": "behoben",
   "beleg": "Die Galerie ist eine gerade Fläche mit 1-px-Fugen, versetzt sind nur noch der rechte Lage-Streifen und Schritt 2. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/teile/start__d1440__t02_y3000.jpg"
  },
  {
   "befund": "R3-13 [gering] t768/m390/m360: Silbentrennung mittellanger Wörter (Unter-grund, Tele-fonnummer, Bewer-tungen)",
   "stand": "behoben",
   "beleg": "„prüft den Untergrund“ (t768), „Ihre Telefonnummer“ (m390) und „27 Bewertungen“ (m360) sind ungetrennt. Neu dazu kommen Trennungen in den Zitaten, siehe neuer Befund. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/teile/start__t768__t02_y3200.jpg, …/teile/start__m390__t06_y9600.jpg, …/teile/start__m360__t00_y0.jpg"
  },
  {
   "befund": "R3-14 [gering] t768: Startbild mit 177 px Rest rechts",
   "stand": "behoben",
   "beleg": "Das Bild steht von x 208 bis 736 rechtsbündig an der Textkante, die Kennzeile auf derselben Kante. Die Einrückung um zwei von acht Spalten liest sich als gewollt. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/teile/start__t768__t00_y0.jpg"
  },
  {
   "befund": "R3-15 [gering] d1440/m390: Neubau-Fliese wirkt wie fehlendes Bild",
   "stand": "behoben",
   "beleg": "Halbverband bis zur roten Laserlinie, dahinter freie Fläche: Das Motiv ist bei m390, d1440 und 200 % als Verlegekante zu erkennen. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/teile/start__m390__t01_y1600.jpg, …/teile/start__d1440__t01_y1500.jpg, …/teile/p1-200__m390__t02_y3200.jpg"
  },
  {
   "befund": "R2 offen: Lage-Fliesen 1 bis 2 Wörter je Zeile bei 200 %",
   "stand": "behoben",
   "beleg": "Das Bild steht als Streifen über dem Satz, der Pfeil darunter, der Satz läuft von x 58 bis 330 mit 2 bis 3 Wörtern je Zeile, ungetrennt. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/teile/p1-200__m390__t02_y3200.jpg, …/teile/p1-200__m390__t03_y4800.jpg"
  },
  {
   "befund": "R2 offen: Leiste nur Zeichen bei 200 %",
   "stand": "behoben",
   "beleg": "„Termin“ steht als Wort, siehe R3-4. Anrufen und WhatsApp sind Zeichen mit Namen im aria-label. Den Platz für das Wort „Anrufen“ nimmt das Cookie-Schild (96 px), das ist eine Frage der Einwilligung."
  },
  {
   "befund": "R2 offen: Menüfuß-Hauptknopf",
   "stand": "behoben",
   "beleg": "Siehe R3-1."
  },
  {
   "befund": "R2 offen: Hauptknopf erst im zweiten Bildschirm bei 200 %",
   "stand": "teilweise",
   "beleg": "Der Einstiegs-Knopf steht weiter bei y 956 (m390) bzw. y 1026 (m360). Im ersten Bildschirm trägt jetzt aber die Leiste „Termin“ als Wort mit Ziel #termin, damit findet P1 den Weg ohne Suchen. Solange die Leiste so bleibt, besteht kein weiterer Handlungsbedarf. /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/p1-200-bew__m390__s00_y0.jpg, …/p1-200-bew__m390__s01_y844.jpg"
  },
  {
   "befund": "R2 offen: Silbentrennung kurzer Wörter",
   "stand": "behoben",
   "beleg": "Siehe R3-13."
  }
 ],
 "befunde": [
  {
   "schwere": "mittel",
   "ansicht": "m390 und m360 mit 200 % Systemschrift, Mobilmenü offen (Runde 3 Nr. 9, weiter offen)",
   "abschnitt": "Mobilmenü, Liste der Hauptpunkte und fester Fuß",
   "beobachtung": "Ohne Scrollen zeigt das Menü bei m390 nur Bad, Böden und Wände sowie Balkon und Terrasse. „Unsere Arbeiten“ ist 14 px angeschnitten, „Über uns“ (mit Kontakt und „Wo wir arbeiten“) fehlt. Bei m360 sind nur zwei Punkte zu sehen. Nichts deutet an, dass die Liste weitergeht: Unter „Balkon und Terrasse“ endet sie an einer Fuge, danach beginnt der weiße Fuß. Gemessen: Kopf des Blatts 128 px, Liste `py-6` (48 px oben), Böden und Balkon je zweizeilig (152 px), Fuß 254 px (Knopf 190 px dreizeilig plus `p-4`).",
   "grund": "K-009 verlangt bei 200 % alle fünf Punkte im ersten Bild des Menüs. E-023 meldet das als gemessen erledigt, am Prüfstand stimmt das nicht. Es fehlen etwa 172 px.",
   "vorschlag": "Mit dem vorhandenen `@container` des Blatts (MobileMenu.jsx:77) unter 20 rem: Fuß `@max-xs:p-2`, Hauptknopf `@max-xs:py-2 @max-xs:px-4` und Pfeil `@max-xs:hidden`. Der Knopf wird dann zweizeilig „Termin vor Ort / anfragen“ und spart etwa 110 px. Liste `@max-xs:py-2` statt `py-6` spart 32 px, Hauptpunkte `@max-xs:py-1` statt `py-2` sparen 5 × 16 px. Zusammen sind das etwa 220 px. Danach bei m390 und m360 messen, ob alle fünf Namen ganz sichtbar sind, und E-023 berichtigen.",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/menue__m390_200.jpg"
  },
  {
   "schwere": "mittel",
   "ansicht": "m360 mit 200 % Systemschrift",
   "abschnitt": "Nächster Schritt, „Lieber anrufen?“ (große Rufnummer)",
   "beobachtung": "Die große Rufnummer reicht bis x 363,2 bei 360 px Fensterbreite. `overflow-x: clip` schneidet die letzte Ziffer an, zu lesen ist „44 83 56“ mit halber „7“. Weil die Rasterspalte mitwächst, laufen auch „Lieber schreiben?“ und die Öffnungszeiten bis 363,2 px (12 Elemente). Bei m390 reicht die Nummer 5 px über die Inhaltskante 358.",
   "grund": "Hörer (`groesse={6}`, 48 px bei 200 %), `gap-3` (24 px) und die nicht trennbare Gruppe „44 83 567“ in fs-5 Mono (etwa 259 px) ergeben 331 px. Verfügbar sind 296 px. Eine abgeschnittene Ziffer in der Rufnummer ist für Anrufer ein echtes Risiko (Regelprüfer B1).",
   "vorschlag": "Die unterKopf-Rasterfläche in TerminAnfrage.tsx als `@container` setzen und den Anruf-Link unter 20 rem untereinander: `@max-xs:flex-col @max-xs:items-start @max-xs:gap-1`, Hörer über der Nummer, wie bei den Lage-Fliesen. Die Nummer bekommt dann 296 px, nötig sind 259 px. Alternativ unter 20 rem `@max-xs:text-fs-4`.",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/teile/p1-200__m360__termin_y30300.jpg"
  },
  {
   "schwere": "mittel",
   "ansicht": "m390 und m360 mit 200 % Systemschrift (Runde 3 Nr. 8, weiter offen)",
   "abschnitt": "Nächster Schritt, Formular, Eingabefelder",
   "beobachtung": "Alle fünf Platzhalter sind abgeschnitten: „Vor- und Nachn“, „Für den Rückru“, „ihre.adresse@l“, „z. B. Aßlar, Wet“, „z. B. Dusche oh“. Gemessen: Innenbreite der Felder 226 px (m390) bzw. 196 px (m360), die Platzhalter brauchen 241 bis 407 px. Die Beschriftungen darüber sind vollständig, die Felder sehen für P1 aber kaputt aus.",
   "grund": "Bei 200 % passen die Beispieltexte in keiner möglichen Feldbreite (≤ 310 px). Die Lösung über schmalere Innenabstände aus Runde 3 reicht nicht. E-023 („passen jetzt“) trifft nicht zu.",
   "vorschlag": "Das Muster, das das Formular schon hat, auf die anderen Felder übertragen: Den Hinweis wie bei „E-Mail (für Bestätigung)“ als Klammerzusatz in die Beschriftung setzen (`text-fs-1 text-tinte-2`), zum Beispiel „Ort / PLZ (z. B. Aßlar)“ und „Projektnotiz (optional, z. B. Dusche ohne Stufe)“. Die Platzhalter unter 20 rem ausblenden (`@max-xs:placeholder:text-transparent` am vorhandenen Formular-Container). HeroContactForm ist ein gemeinsamer Baustein, die Änderung macht der Orchestrator.",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/teile/p1-200__m390__t17_y27200.jpg"
  },
  {
   "schwere": "gering",
   "ansicht": "t768, m390, m360 (100 %) und m390 mit 200 %",
   "abschnitt": "Beleg, „Das sagen unsere Kunden.“ (kleine Stimmen)",
   "beobachtung": "Die Zitate werden getrennt, obwohl der Code „keine Silbentrennung im Zitat“ vorsieht. Elke S.: „uneinge-/schränkt“ selbst auf t768 bei 700 px Zeilenbreite. Rabia Ö. bei 200 %: „Fliesenver-/legung Tezgel“, also der Firmenname.",
   "grund": "`hyphens-none` steht am `<blockquote>`, die Basisregel `p, li, … { hyphens: auto }` trifft aber das innere `<p>` direkt und schlägt die Vererbung (gemessen: `hyphens: auto` an allen drei `blockquote p`). Getrennt wird gerade der Firmenname, der nach MUT die Wiedererkennung trägt.",
   "vorschlag": "`hyphens-none` auf das `<p>` im Zitat setzen (StartBeleg.tsx, `Stimme`, ebenso im Baustein `vorlagen/teile/Stimmen.tsx`). Oder einmal in globals.css: `blockquote p { hyphens: manual; }`. Der Wortlaut bleibt unverändert.",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/zoom/zitat_trennung.jpg"
  },
  {
   "schwere": "gering",
   "ansicht": "alle Breiten, deutlich bei d1440 und t768",
   "abschnitt": "Beleg Orte (Gruppenköpfe „Bis 10 km ab Aßlar“) und Nächster Schritt („Wann Sie uns erreichen“)",
   "beobachtung": "Diese h3 stehen im schmalen Anzeigeschnitt (font-stretch 74 %), obwohl sie `font-text` tragen. Direkt darüber stehen „Lieber anrufen?“ und „Lieber schreiben?“ in normaler Breite. In einer Spalte wirken so zwei verschiedene Schriften, die Gruppenköpfe lesen sich wie Etiketten.",
   "grund": "Die Basisregel für h1 bis h6 setzt `font-stretch: 74%`. Die Rücknahme `:is(h1, …, h6) .font-text` gilt nur für Nachfahren, nicht für die Überschrift selbst (gemessen: alle vier h3.font-text mit 74 %).",
   "vorschlag": "In globals.css die vorhandene Regel um den Fall der Überschrift selbst ergänzen: `:is(h1, h2, h3, h4, h5, h6).font-text { font-stretch: 100%; letter-spacing: normal; word-spacing: normal; }`.",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/zoom/h3_schmal_d1440.jpg"
  },
  {
   "schwere": "gering",
   "ansicht": "t1024 (Kopf auf jeder Seite, Containerbreite @5xl bis unter @7xl)",
   "abschnitt": "Kopf, Unterzeile neben dem Logo",
   "beobachtung": "Neben dem Logo steht „Fachbetrieb / Aßlar · Wetzlar“ in IBM Plex Mono, abgesetzt mit einer Fuge, also ein Mono-Etikett im Kopf.",
   "grund": "K-006: Mono nur noch für Telefonnummern, Maße und Zahlen, nicht als Etikett. Das ist der letzte Mono-Rest außerhalb von Zahlen. `Header.jsx:37` (`BrandMark`, `font-mono text-fs-1`).",
   "vorschlag": "In `BrandMark` `font-text` statt `font-mono` setzen (Größe `text-fs-1`, Farbe `text-tinte-2` bleiben). Gemeinsame Datei, die Änderung macht der Orchestrator.",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/zoom/koepfe.jpg"
  },
  {
   "schwere": "gering",
   "ansicht": "m360 (100 %), m390 mit 200 %",
   "abschnitt": "Kennzeile unter dem Startbild und unter den Stimmen",
   "beobachtung": "Zahl und Nomen werden getrennt. m360: „· 27 / Bewertungen bei Google“. Bei 200 %: „5,0 von 5 / Sternen · 27 / Bewertungen bei / Google · Stand / September 2026“. Die Trennstriche sind weg, die Zahlen hängen aber am Zeilenende.",
   "grund": "Die Kennzeile ist der Bewertungsbeweis. Eine Zahl ohne ihr Nomen liest sich schlechter, „5,0“ und „27“ stehen dann ohne Bezug.",
   "vorschlag": "`zusammen()` (kern/zusammen.tsx) um die Gruppen `/\\d+ Bewertungen/` und `/\\d+ Sternen/` ergänzen und in `Bewertungszeile` die beiden Stücke durch `zusammen()` setzen. Dann bricht die Zeile nur an „·“ und zwischen Wortgruppen.",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/teile/start__m360__t00_y0.jpg"
  },
  {
   "schwere": "gering",
   "ansicht": "d1440 und m390 mit erlaubter Bewegung",
   "abschnitt": "Leitachse in „Das sagen unsere Kunden.“ und „Termin vor Ort anfragen“",
   "beobachtung": "Die rote Laserspitze wandert in allen Kalk-Abschnitten sichtbar mit. In den weißen Flächen verschwindet sie ganz. Im Ablauf übernimmt die Schrittlinie, in Stimmen und Termin (d1440 Stellungen 06 und 08, m390 Stellungen 09 und 13) ist keine Linie im Bild. Die Linie, die führt, endet so vor dem Ziel aller Hauptknöpfe.",
   "grund": "K-003 Nr. 5: Die Laserlinie führt und markiert den aktuellen Ort. Gebaut ist, dass Flächen das Lot decken (Leitachse.tsx), am Ziel #termin fehlt dadurch der Abschluss. Für die Eigenständigkeit ist das eine verschenkte Stelle.",
   "vorschlag": "Am Ziel die Laserlinie zeigen: die H2 „Termin vor Ort anfragen“ links mit 2 px Laser markieren (`border-l-2 border-laser pl-4`, wie der Leitsatz im Fuß). Optional ebenso den Kopf der Stimmen. Die Laserlinie bleibt dabei ein Strich, keine Fläche.",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/zoom/laser_d1440.jpg"
  },
  {
   "schwere": "gering",
   "ansicht": "m390 und m360 mit 200 % Systemschrift",
   "abschnitt": "Beleg, „Hier sind wir für Sie unterwegs.“ (Ortszeilen)",
   "beobachtung": "Die Abstände sind ungleich. Bei einzeiligen Namen stehen etwa 20 px zwischen Ort und Entfernung, bei zweizeiligen („Limburg an / der Lahn“, „Friedberg / (Hessen)“) klebt die Entfernung direkt am Namen. Bei „Alle Orte ansehen“ und „Alle Arbeiten ansehen“ steht der Pfeil abgesetzt am rechten Rand, getrennt vom zweizeiligen Text.",
   "grund": "`min-h-11` ist in rem und wird bei 200 % 88 px hoch. Der einzeilige Name steht darin mittig, der zweizeilige füllt die Höhe aus. Für die Trefffläche ist das unnötig, die Schrift allein ist bei 200 % schon über 44 px hoch.",
   "vorschlag": "Unter 20 rem den Ortslink `@max-xs:min-h-0 @max-xs:pt-2` setzen und die Entfernung `@max-xs:pb-2`. Dann gilt für alle Orte derselbe Abstand. Die Weiter-Links unter 20 rem mit `@max-xs:justify-start` (Pfeil folgt dem Text).",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/teile/p1-200__m390__t15_y24000.jpg"
  },
  {
   "schwere": "gering",
   "ansicht": "d1440 und d1920",
   "abschnitt": "Beleg, „Das sagen unsere Kunden.“",
   "beobachtung": "Die große Stimme (C. W.) ist jetzt oben ausgerichtet und nur etwa 200 px hoch. Die rechte Spalte mit zwei Stimmen ist etwa 500 px hoch, links bleiben darunter rund 300 px leere weiße Fläche. Die Kennzeile mit Stand steht danach allein über die volle Breite.",
   "grund": "Die Hierarchie trägt die Größe, das Gewicht der Komposition liegt aber rechts. Die leere Fläche wirkt wie ein Loch im Fugenraster.",
   "vorschlag": "Die Kennzeile (`Bewertungszeile stand`) ab lg in die linke Spalte unter die große Stimme setzen (`lg:col-span-7`, Abstand `mt-12`). Die große Stimme steht dann mit ihrem Beleg zusammen, und die Spalten schließen ruhiger ab. Mobil bleibt die Kennzeile am Ende.",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/bew__d1440__s06_y5400.jpg"
  },
  {
   "schwere": "gering",
   "ansicht": "m390 und m360 (100 %)",
   "abschnitt": "Beleg, „So sieht unsere Arbeit aus.“",
   "beobachtung": "Die Galerie ist auch bei normaler Schrift einspaltig. Sechs Hochformatfotos von 356 × 445 px mit Unterschrift ergeben etwa 3.100 px, rund 3,7 Bildschirme. Die Seite wuchs bei m390 von etwa 12.300 auf 14.444 px, der Termin beginnt erst nach etwa 13 Bildschirmen.",
   "grund": "Die Runde-3-Regel (zweispaltig erst ab 36 rem Container) war für 200 % gedacht, greift aber auch bei 100 %. Große Fotos stützen den Beleg, die Länge geht aber zu Lasten von Stimmen, Orten und Termin. Das ist eine Abwägung, kein Fehler.",
   "vorschlag": "Zweispaltig ab 20 rem Containerbreite statt ab 36 rem (`@xs:grid-cols-2` statt `@xl:grid-cols-2`, `@5xl:grid-cols-3` bleibt). Dann ist die Galerie bei m390 und m360 mit 100 % zweispaltig (Fotos etwa 178 px, Unterschriften fs-2 mit 3 bis 4 Wörtern je Zeile), bei 200 % (Container 326 px < 640 px) weiter einspaltig. Die Seite wird etwa 1.500 px kürzer. Bleibt die Galerie einspaltig, ist das vertretbar.",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/teile/start__m390__t03_y4800.jpg"
  },
  {
   "schwere": "gering",
   "ansicht": "m360 mit 200 % Systemschrift (jede Seite)",
   "abschnitt": "Kopf, Logo",
   "beobachtung": "Die Konsole meldet: „Image with src /images/logo/tezgel-logo.webp has either width or height modified, but not the other“. Das Logo-Feld wird in der Breite gestaucht, die Höhe bleibt 96 px, `object-contain` füllt mit Leerraum auf.",
   "grund": "Das Schrumpfen über `max-w-full shrink` ändert nur die Breite. Bei m390, d1440 und allen 100-%-Ansichten tritt die Warnung nicht auf. Sie ist ein Handwerksrest im Prüfprotokoll und liefert dem Logo keinen sauberen Rahmen.",
   "vorschlag": "Die Höhe statt der Breite an den Platz binden: am vorhandenen `@container` des Kopfs unter 20 rem eine kleinere Höhenstufe (`@max-xs:h-8`), `w-auto` bleibt. Breite und Höhe ändern sich dann gemeinsam, und die Warnung entfällt. Danach bei m360 und m390 mit 200 % prüfen, ob der Menü-Schalter im Bild bleibt.",
   "bildpfad": "/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-R4-SICHT/teile/p1-200__m360__t00_y0.jpg"
  }
 ],
 "weg_zu_acht": "Ansichtswert jetzt etwa 7,7 (8, 8, 8, 7, 8, 8, 7). Unter 8 liegen nur Handwerk und Typografie. Mit beiden auf 8 ist der Ansichtswert 8,0. Reihenfolge nach der größten Wirkung:\n\n1. Handwerk (7 → 8)\n   - Mobilmenü bei 200 %: alle fünf Hauptpunkte im ersten Bild, wie K-009 verlangt. Heute sind es 3 von 5 (m390) und 2 von 5 (m360). Unter 20 rem Blattbreite: Fuß `p-2`, Hauptknopf `py-2 px-4` ohne Pfeil (zweizeilig), Liste `py-2`, Hauptpunkte `py-1`. Das spart etwa 220 px, nötig sind etwa 172 px. Diese eine Änderung stützt auch die Verständlichkeit, weil „Über uns“ mit Kontakt und „Wo wir arbeiten“ dann sichtbar ist.\n   - Große Rufnummer im Termin bei m360 mit 200 % nicht mehr beschneiden: unter 20 rem Hörer über der Nummer (Container-Abfrage). Die Nummer bekommt dann 296 px, nötig sind 259 px.\n   - Platzhalter bei 200 %: Beispiele als Klammerzusatz in die Beschriftung (Muster „E-Mail (für Bestätigung)“), Platzhalter unter 20 rem ausblenden.\n   - `hyphens-none` der Zitate wirkt nicht, weil es am blockquote statt am p sitzt (siehe Typografie).\n   - Next-Warnung zum Kopf-Logo bei m360 mit 200 % beseitigen: die Höhe statt der Breite anpassen.\n   - Zur Arbeitsweise: E-023 meldet „Menü 5 von 5“ und „Platzhalter passen“, beides stimmt am Prüfstand nicht. Solche Aussagen vor dem Eintrag mit einer Messung bei m390 und m360 mit 200 % belegen.\n\n2. Typografie (7 → 8)\n   - Zitate nie trennen: `hyphens-none` auf das `<p>` oder `blockquote p { hyphens: manual }`. Betroffen sind heute der Firmenname „Fliesenver-legung“ (200 %) und „uneinge-schränkt“ sogar auf t768.\n   - h3 mit `font-text` in normaler Breite setzen. Dazu die globals.css-Regel um `:is(h1, …, h6).font-text` ergänzen. Betroffen sind „Bis 10 km ab Aßlar“ und „Wann Sie uns erreichen“, die heute neben normal breiten Zeilen im schmalen Schnitt stehen.\n   - Die Mono-Unterzeile im Kopf bei t1024 („Fachbetrieb / Aßlar · Wetzlar“) auf `font-text` umstellen (K-006).\n   - Zahl und Nomen zusammenhalten: „27 Bewertungen“ und „5 Sternen“ über `zusammen()`.\n   - Alle vier Punkte sind Einzeiler in gemeinsamen Dateien und wirken auf jeder Seite.\n\nDie Kategorien ≥ 8 halten und festigen:\n- Verständlichkeit: Menü siehe 1.\n- Komposition: optional die Kennzeile ab lg unter die große Stimme setzen, die Galerie mobil bei 100 % zweispaltig und die Ortszeilen bei 200 % gleichmäßig.\n- Eigenständigkeit: die Laserlinie am Ziel #termin zeigen (H2 mit `border-l-2 border-laser pl-4`), damit die Linie, die führt, nicht vor dem Ziel endet.\n- Hierarchie und Bild erfüllen das Ziel ohne weitere Arbeit."
}
