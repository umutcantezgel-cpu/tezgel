# E1-PLANPRUEFUNG-machbarkeit

Kundschafter-/Prüferbericht aus der Planungsphase (10.10.2026, nur lesend, Arbeitsmodell bzw. Orchestrator-Unteragent). Stand: Commit 2362a5a.

**Prüfung Plan „Werkstatt-Lauf“: Machbarkeit und Paketschnitt**

## (1)+(2) Schwachstellen und Verbesserungen

**1. Die Funktionstests der Prüfstufe A prüfen den alten Stand (Plan Z. 332–336)**
- **Befund:**
  - `_relaunch/werkzeuge/playwright.config.mjs:3` zielt standardmäßig auf Port 4310. Dort läuft laut `server.sh` nur der Reinraum-Build eines Commits. Die Paketänderungen sind aber noch nicht committet.
  - `workers: 2` (Z. 9) mal 4 Plätze ergibt 8 Chromium-Prozesse. Dazu kommen Turbopack-Dev und viermal `tsc` über das ganze Projekt, auf 4 Kernen mit 15 GB und ohne Swap.
  - Der Dev-Server läuft tagelang ohne Wächter.
  - Widerspruch: Z. 332 sagt „Haiku startet keinen Build“, Z. 336 „Build durch Haiku-Prüfer“.
- **Änderung:**
  - Ein gemeinsames `pruefe-a.sh` für alle Pakete: `RELAUNCH_BASE=…:4320`, eigenes `RELAUNCH_OUTPUT`/`RELAUNCH_REPORT`, `--workers=1`.
  - Eine `flock`-Sperre lässt höchstens zwei Läufe von `tsc`/Playwright gleichzeitig zu.
  - `tsc --tsBuildInfoFile <scratch>/<Kennung>`; die Ausgabe wird auf die eigenen Dateien gefiltert.
  - Der Dev-Server läuft in einer Neustart-Schleife mit Gesundheitsprobe.
  - Der Wellen-Build läuft nur per `reinraum.sh` nach den Paket-Commits; 4310 startet der Orchestrator neu.

**2. Die Kapazitätsrechnung lässt die Opus-Spur weg (Z. 201)**
- **Befund:**
  - Die 26 Opus-Pakete werden auf die Haiku-Plätze verrechnet.
  - E2 legt sechs aufeinanderfolgende Opus-Pakete in „Tag 2–3“: 16 Bausteine mit allen Zuständen, den Rahmen und `/` mit 710 Zeilen und vier Formularen.
  - Dazu kommen etwa 110 Briefings mit zwölfteiligem Bauplan und ein Lighthouse-Ruhefenster an jedem Tor (MESSUNGEN Z. 80).
  - Was nach zwei gescheiterten Anläufen am Tor passiert (Z. 262), ist nicht festgelegt.
- **Änderung:**
  - Zwei Spuren planen: Opus-Stunden auf dem kritischen Pfad und Haiku-Plätze getrennt. Messfenster bekommen eigene Zeitfenster.
  - Ein Briefing-Generator füllt die festen Teile: fünf Sätze, Kern-Auszug, Grenzen, Ausgabeformular.
  - Torregel: nach zwei Anläufen weiterarbeiten; die Befunde werden Pakete der nächsten Etappe und am nächsten Tor erneut geprüft.

**3. Die Parallelarbeit in E2 ist zu dünn, teils Wegwerfarbeit, teils überlappend (Z. 257–261)**
- **Befund:**
  - Laut `belege/p0-ausgangsstand/axe.json` sitzen die axe-Fehler in 13 Seitentabellen (`.overflow-x-auto`) und 7 Sternzeilen. Das sind genau die Seitendateien, die E4–E6 ohnehin neu bauen.
  - V-02 und V-05 teilen sich `BookingCalendar.tsx`, V-03 und V-05 teilen sich `LeadQuickForm.tsx`.
  - V-03 fasst `TezgelAnfrageFunnel` an, den E2-OPUS-06 gestaltet. E3 fasst dieselben Dateien noch einmal an.
  - Die Tests für neue Logik hängen an Modulen, die Opus erst baut.
- **Änderung:**
  - Die axe-Fehler im Baustein selbst lösen: Baustein „Tabelle“ mit `tabindex`, Region und Namen; Bewertung ohne verbotene ARIA-Attribute.
  - V-02, V-03 und V-05 jeweils in das E3-Paket derselben Datei legen.
  - Die Plätze in E1/E2 stattdessen füllen mit:
    - Seitenpässen für alle 76 Seitendateien (Abschnitt → Baustein, lucide → Icon, Textliste, Test-IDs; schreibt nur in `_werkstatt`),
    - dem Entfernen der 13 verwaisten Komponenten,
    - etwa 11 Bausteinen nach Muster, sobald Opus 4–5 Referenzbausteine fertig hat.

**4. Bestand und neue Bausteine sind doppelt geplant**
- **Befund:**
  - E2-OPUS-04 baut Merkliste, Abschluss, Kundenstimme und FAQ-Abschnitt.
  - Daneben bestehen `QualityPromise` (53 Seiten, ohne Props) und `FinalCTA` (22 Seiten, mit Props).
  - Mehrfach zugeordnet: das E3-Paket „QualityPromise“; „Stimmen“ (E2-OPUS-06) und „Bewertungen“ (E3); „Banner-Form“ (E2-OPUS-05) und „CookieConsent 1“ (E4–E6).
- **Änderung:**
  - In PLAN.md eine Tabelle Bestand → Baustein, mit Umbau an Ort und Stelle (gleicher Pfad, gleiche Props):
    - FinalCTA = Abschluss
    - QualityPromise = Merkliste
    - ReviewCarousel/ReviewCard = Kundenstimme
    - FAQAccordion = FAQ-Abschnitt
    - TrustStrip = Schriftfeld
  - Jede Datei hat über den ganzen Lauf genau einen Eigentümer. So wechseln 75 Einbindungen, ohne dass eine Seite geändert wird.

**5. Bei den Icons kollidieren Dateihoheit und UNANTASTBAR**
- **Befund:**
  - GRAF-01/02 (Z. 247) schreiben gleichzeitig in Sprite und Namensliste.
  - Etwa 36 eigene Icons sollen 134 lucide-Icons ersetzen. Damit muss jedes Seitenpaket selbst wählen – eine Geschmacksfrage bei Haiku.
  - `src/config/company.js:4` und `src/config/blog.js:10` importieren lucide als Daten. `src/config/*` ist UNANTASTBAR (Z. 40), Z-06 verlangt aber die Deinstallation.
  - `navigation.js` steht gleichzeitig in UNANTASTBAR und in der Schreibliste (Z. 330).
- **Änderung:**
  - Ein SVG je Datei; der Sprite wird per Skript erzeugt.
  - Opus legt in E2-OPUS-03 die vollständige Zuordnung der 134 lucide-Icons im `iconMapper` fest (jeweils eigenes Icon oder „entfällt“).
  - Für die Config ein Denkprotokoll in E1. Entweder `turbopack.resolveAlias` leitet `lucide-react` auf ein eigenes Ersatzmodul um, dann bleibt die Config bytegleich. Oder eine dokumentierte Änderung der Importzeile.
  - `navigation.js` wird nur gelesen.

**6. Die Seitenpakete sind nicht „mechanisch“ (Z. 114), der Textschutz greift zu spät**
- **Befund:**
  - 71 von 76 Seiten sind `.jsx`. Wegen `allowJs` ohne `checkJs` prüft `tsc` sie nicht.
  - 20.593 Zeilen Markup mit unantastbarem Text stehen direkt in den Seiten.
  - Der Textvergleich kommt erst in Prüfstufe C (Z. 302, 355).
  - Die Wiederholung ist dafür hoch: 50× dieselbe Klassenkette im Einstieg, 116× dieselbe H2-Kette, 245 Badge-Spans.
- **Änderung:**
  - Opus schreibt ein Umbauskript auf Syntaxbaum-Ebene (Einstieg; Badge + H2 → AbschnittKopf; lucide → Icon; Weiterlesen → Ratgeber-Liste). Es übernimmt die Textknoten wörtlich.
  - Haiku wendet das Skript je Familie an und erledigt den Rest von Hand.
  - Zentrale Regel für Badge-Texte: Sie werden zum Mono-Etikett, der Wortlaut bleibt.
  - `texte-vergleich` der eigenen Seiten wird Teil der Selbstprüfung (Bauplan Punkt 12). Das ist keine zusätzliche Prüfstufe.

**7. In E3 fehlen Zuständigkeiten (Z. 264–272)**
- **Befund:**
  - Die Seitendateien der sieben Erzähl-Hauptansichten haben keinen Eigentümer; Opus baut dort nur die Komponenten der großen Momente.
  - Die vier Arbeitsansichten baut Haiku „nach Referenz“. Die Referenz `/` ist aber keine Arbeitsansicht. Das ist Komposition, also Stufe 3, und es betrifft 4 der 12 Ansichten unter Z-04.
- **Änderung:**
  - Opus baut `/kontakt` am Ende von E2 als Referenz für Arbeitsansichten.
  - Für die Erzählansichten: In Welle 1 baut Haiku den Seitenkörper aus Bausteinen, in Welle 2 setzt Opus den großen Moment und die Komposition – dieselbe Datei, nacheinander.

**8. Der FliesenKonfigurator ist schlecht geschnitten**
- **Befund:**
  - 1.375 Zeilen sollen in zwei Haiku-Paketen nacheinander auf derselben Datei umgebaut werden, mitten im kritischen Pfad.
  - Die Rechenlogik (Z. 161–340) liegt direkt neben dem Markup.
- **Änderung:**
  - Opus verschiebt zuerst nur Code, ohne ihn zu ändern: `logik.js` (gesperrt), `stile.js` (Klassenkonstanten Z. 136–155), `Schritt1–4.jsx`, `ResultSummary.jsx`. Nachweis: F-06 bleibt 46/46.
  - Danach laufen bis zu vier Haiku-Pakete parallel.
  - Derselbe Schnitt für BadanfrageFunnel (675 Zeilen), TezgelAnfrageFunnel (620) und BadProjektCheck (513).

**9. Bausteine sind in Prüfstufe A nicht sichtbar**
- **Befund:** Die E2-Bausteine erscheinen erst in E3–E6 auf Seiten. Zustände wie lädt, Fehler oder deaktiviert sind dort kaum erreichbar, also gibt es keine Bilder in 390/1440.
- **Änderung:** Ein Schaufenster nur im Dev-Server: `pageExtensions` in `next.config` nur in der Entwicklung um `dev.tsx` erweitern. Im Build gibt es die Route nicht; Routentabelle und Sitemap bleiben gleich.

## (3) Gut, bleibt so

- **E-001:** Der Vorlauf wird übernommen (KERN v1, Atlas, 289 Funktionstests, Messbasis) statt einer neuen Runde mit Stilproben.
- **E-004:** Tokens global mit Aliasen, Basisklassen früh umfärben, entfernen erst bei null Nutzungen.
- **Reihenfolge** Fundament → Bausteine → Rahmen → `/` → Hauptansichten → Familien → Abbau. „Alle 76 Seiten auf Systemstand“ ist als Pflicht richtig. Es folgt aus Z-06 (lucide in 120 Dateien) zusammen mit Z-03 für geänderte Dateien und dem Abbau von `tokens.css`, der unumgebaute Seiten umfärben würde. Diese Begründungskette sollte ausdrücklich in Z. 186 stehen.
- **Arbeitsregeln:** Grundsatz der Dateihoheit, ein Paket je Commit, Revert statt Reset, Haiku ohne Commit und Push.
- **UMGEBUNGSAUSNAHMEN** mit Ersatzprüfung statt AUSNAHME; beide AUSNAHMEN bleiben frei.

### Critical Files for Implementation
- /root/.claude/plans/master-auftrag-gestalten-entwickeln-cheeky-patterson.md
- /home/user/tezgel/_relaunch/werkzeuge/playwright.config.mjs
- /home/user/tezgel/src/components/funnels/FliesenKonfigurator.jsx
- /home/user/tezgel/src/config/company.js
- /home/user/tezgel/src/components/sections/QualityPromise.jsx
