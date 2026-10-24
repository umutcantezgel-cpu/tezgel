VORAB bestanden: Der Server liefert `src_app_1s6nba_._.css` mit „hyphenate-limit-chars: 12 5 5“.

**ERGEBNIS JE WERKZEUG**

1. `bildsatz.mjs --satz e2r4 --hauptansichten --geraete alle --worker 1`: Exit 0. 12 Seiten × 10 Geräte, 1277 Aufnahmen, Fehler 0, nicht 200 0, fremd 0. „Überlauf 0 Ansichten (0 Befunde)“, „Überlappung 0 Ansichten (0 Befunde: keine)“, „Konsole 0 Ansichten (0 Meldungen)“.
   `--seiten /gibt-es-nicht` (m390, d1440): Exit 1 wie erwartet, nicht 200: 2 (HTTP 404). Konsole: 2 × „Failed to load resource … 404“, Dokument, ausgenommen.
2. `erstesbild.mjs --satz e2r4 --seiten /,/bad --geraete alle --bilder`: Exit 1 durch einen Werkzeugfehler (/ m390 Erstbesuch: „page.addStyleTag: Execution context was destroyed“). Wiederholung ohne Bilder: Exit 0, 40 Fälle, Fehler 0, / m390 Erstbesuch jetzt 5/5, alle übrigen Ergebnisse gleich.
   Bestandene Elemente von 5, Erstbesuch: / m360 3, m390 5, m430 5, q844 1, t768 5, t1024 3, d1280 3, d1440 3, d1920 4, d2560 5. /bad m360 3, m390 3, m430 3, q844 3, t768 3, t1024 4, d1280 4, d1440 4, d1920 5, d2560 5. Nach Einwilligung alle 5/5, außer / q844 mit 3/5.
3. `axe.mjs --satz e2r4 --seiten /,/bad,/gibt-es-nicht --ansichten m390,d1440 --zustaende`: Exit 0, 27 Läufe. Normal und Erstbesuch: 0 Verstöße. Menü m390: target-size (serious), 7 Knoten, je Seite einer.
4. `lesbarkeit.mjs --satz e2r4 --seiten /,/gibt-es-nicht`: Exit 0. / GRÜN (Flesch 78.5, Satz Ø 7.2, Satz max 23, Titel 56, Beschreibung 146). /gibt-es-nicht ROT: `fliesstext-fehlt` („main hat keinen sichtbaren Fließtext“) und `status` („HTTP 404“).
5. Konsole (eigenes Skript, 3 s warten, durchscrollen): / und /bad in m390 und d1440 ohne Konsolenmeldungen (error/warning), Seitenfehler oder Anfragen ≥ 400. /gibt-es-nicht zeigt nur das Dokument-404. Positivprobe (console.error und fetch auf 404) wurde erfasst.

**BEFUNDE**

- **target-size, alle 7 Menüseiten, m390**: Knoten `.p-4.border-t.bg-fliese > .border-tinte.hover\:border-tinte-2[data-hauptknopf=""]` („Termin vor Ort anfragen“). getBoundingClientRect x 17, y 778.8, w 357, h 49.3. elementFromPoint in der Mitte: `span.whitespace-nowrap` (im Ziel). failureSummary wörtlich: „Fix any of the following: Target has insufficient size because it is partially obscured (smallest space is 357px by 5.7px, should be at least 24px by 24px) Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 6.8px instead of at least 24px.“ Die Stapelprüfung an der Oberkante (y 779.5 bis 790) zeigt nur Ziel, Wrapper und `#mobile-menu`. Die untere Leiste (z 30, y ab 783.5) taucht darin nicht auf.
- **/ q844 (844×390)**: Einstieg-Hauptknopf und -Anrufen liegen unter dem Falz (y 395 bis 446). Die untere Leiste (y 345 bis 390) zeigt Anrufen (x 49 bis 313) und Termin (x 580 bis 844) vollständig und unverdeckt. Der Banner (y 79 bis 341) deckt im Erstbesuch Überschrift und Ort.
- **/ t768**: Einstieg-Termin (y 385 bis 435) und -Anrufen (y 384 bis 435) frei in beiden Durchgängen. Leiste y 963 bis 1024, Banner y 667 bis 975: die obersten 12 px sind überdeckt.
- **/ t1024**: Kopf-Anrufen (x 444 bis 642) und Kopf-Termin (x 702 bis 924), y 7 bis 57, frei. Einstieg-Termin (y 671 bis 722) liegt im Erstbesuch unter dem Banner (x 24 bis 472, y 372 bis 744).
- **/bad**: Der Einstieg hat weder Telefon noch Hauptknopf (nur „Bad-Projektcheck starten“ und „Musterbäder entdecken“). Anrufen und Termin kommen aus der Leiste, unter 1024 px. Im Erstbesuch überdeckt der Banner deren Oberkante um 12 px (m390, t768).
- **/ m360 und m430**: Banner-Unterkante 11 bis 12 px über der Leistenoberkante (Erstbesuch).
- **Banner als Ursache**: Jede „verdeckt-durch“-Meldung im Erstbesuch nennt `div.hoehe-banner.ueber-leiste-12.fixed` oder `p#cookie-consent-description`.
- **Werkzeugbefund erstesbild.mjs**: `ersterSichtbar` nimmt den ersten gerenderten Treffer in Dokumentreihenfolge, nicht den im Ausschnitt. Bei q844 wird so der Einstieg statt der Leiste gemessen.
- **Werkzeugbefund axe.mjs**: `--zustaende` läuft über `G.hauptseiten` (7 Seiten), nicht über `--seiten`.

**BILDPFADE**

- Bildsatz: `$SCRATCH/E2-R4-W/bildsatz/` (z. B. `m390/start/00.jpg`, `d1440/start/00.jpg`; Protokoll `bildsatz.json`)
- Erstes Bild: `$SCRATCH/E2-R4-W/erstesbild/bilder/` (d1440: `start__d1440__erstbesuch.jpg`; m390: `start__m390__nach-einwilligung.jpg`, da der m390-Erstbesuch im ersten Lauf fehlte)
- Eigene Aufnahmen: `$SCRATCH/E2-R4-W/eigen/` (`___t768__erstbesuch.jpg`, `___q844__erstbesuch.jpg`, `___t1024__erstbesuch.jpg`)
- Belege: `erstesbild/erstes-bild.json`, `axe/axe.json`, `lesbarkeit/lesbarkeit.md`, `eigen/target-size.json`, `eigen/untere-leiste.json`, `eigen/konsole.json`

**OFFENE FRAGEN**

1. Quellstand: Ab 02:42 änderten sich `src/inhalte/*.ts` und `src/components/vorlagen/*` (zuletzt 02:50:54). HEAD ist jetzt 0ff5196 statt 58df170, der Arbeitsbaum ist sauber. Die Startseiten-Quellen blieben unverändert, und die /bad-Wiederholung stimmt überein.
2. Gilt „Einstieg oder untere Leiste“ für /bad, wo Telefon und Hauptknopf nur in der Leiste stehen?
3. Ist die 11- bis 12-px-Überlappung von Banner und Leiste gewollt (Klasse `ueber-leiste-12`)?
4. Welches Element verdeckt die 5.7-px-Zone des Menü-Termins? Die Stapelprüfung findet keinen Verdecker.
5. Soll die 404-Seite von der Regel `fliesstext-fehlt` ausgenommen werden?

=== ENDE E2-R4-W ===
