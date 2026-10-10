# P2-GEG-02 · Rückgabe · Gegenprüfung Gesamtplan P3–P7 (L0 Runde 2)

Kennung P2-GEG-02 · Rolle Gegenprüfer · Stufe 3 · Opus (frisch) · Kern v1.1 · Schreibrechte: nur diese Datei · Umfang: PLAN.md „Gesamtplan P3–P7 · L0 Runde 2“ (Z. 362–440) gegen P2-GEG-01, AUFTRAG, E-000–E-016, KERN v1.1, ABNAHME, PRUEFPUNKT, STATUS, Erprobungsbeleg E-015, Quellcode und Werkzeuge (nur gelesen). Kein Build, kein Server, kein Netz.

## Urteil
**L0 Runde 2 nicht bestanden. Die Auflagen sind eng umrissen.** E-015 löst die drei schwersten Befunde der Runde 1 sauber (1, 2, 10): Es gibt keine gemischten Seiten mehr, nichts wird global umgefärbt, und der Umzug ist für den Bestand belegt (HTML 172/172 und CSS-Selektoren gleich, Routentabelle bis auf `✓ globalNotFound` gleich). Drei neue Befunde „hoch“ treffen aber den Kern der Bauweise:
- **N-01:** Nach der ersten Freischaltung ist „ruhender“ Code nicht mehr ruhend.
- **N-02:** Dass der Freischalt-Commit dem geprüften Kandidaten gleicht, wird nicht erzwungen.
- **N-03:** Entwürfe werden weder gebaut noch angesehen, bis das Kandidat-Tor läuft.

Dazu ist das Plantor formal weiter verfehlt (P5–P7 ohne Kriterium, Z-04 „nachher“ ohne Paket).

Alle Korrekturen sind Text- oder Skriptarbeit von wenigen Stunden. Die Werkzeugpakete P3-00a–g und P3-00j ändern das Produkt nicht und dürfen als Vorrat parallel laufen. Der Umzug P3-00h und alles unter `src/` warten auf Runde 3, die letzte nach L0.

## A) Befunde der Runde 1 → Status
| Nr | R1 | Status | Fundstelle Runde 2 | Rest |
|---|---|---|---|---|
| 1 | hoch | erledigt | PLAN.md:365 (Grundsatz 1), :394–397, :404; E-015 | siehe N-01 (nach P3-16) |
| 2 | hoch | erledigt | :365, :367 (Pixel 0 auf allen nicht freigeschalteten Seiten, 4 Ansichten, Sperrklinke je Seite); E-015 | – |
| 3 | hoch | erledigt (Plan) | :379 (texte2: Build-HTML, Zustände, `MIKROTEXTE.md`, „hinzu“ in Überschriften rot) | Fragment-Anker (N-18); `literal.mjs` je Datei passt nicht zu Texten, die beim Neubau die Datei wechseln → je Route vergleichen |
| 4 | hoch | teilweise | :368, :402, :414; `testzahl.mjs` | statische Zählung, Basis 9 statt „11“ (N-17); Testpakete F-16/F-17/F-18 fehlen, Mutationsprobe nur je Formular (N-10) |
| 5 | hoch | teilweise | PRUEFPUNKT mit laufenden Paketen; PLAN.md:98; E-003 markiert | erneut veraltet; PLAN.md:289 „Vorschau-Status“; NEBELKARTE „Fremdkörper“ (N-16) |
| 6 | hoch | teilweise | :372–384 (Werkzeuge a–j), Kriterium-Spalten P3-00/P3/P4 | P5–P7 ohne Kriterium, P3-15 „–“, Z-04 nachher (N-10) |
| 7 | mittel | erledigt | :378, :381, :396 | erlaubte Mittel offen (N-22) |
| 8 | mittel | teilweise | Entwürfe je Abschnitt + P3-15 lösen `page.tsx` | kritischer Pfad falsch, P4 ohne „hängt ab“, Dateispalte P3 leer (N-11) |
| 9 | mittel | erledigt | :391 (P3-03) | – |
| 10 | mittel | erledigt | E-015: Bestand behält MotionProvider bis W10-03 (:429) | – |
| 11 | mittel | teilweise | :438 (zwei Rechnungen, Planwert 8–9) | Eingaben weiter zu knapp (N-11) |
| 12 | mittel | erledigt | KERN K-009 (eine Signatur je Seite), K-002, W5-06 `/foerderung` (:424), K-008 | `seitenart` ohne Paket (N-23) |
| 13 | mittel | erledigt | K-012 (Klassen, Badge-Regel, Randnotiz), :432, M-09 | – |
| 14 | mittel | erledigt | :367 (verschränkt 5/10, sonst JS-Bytes, Jury 8,4), :422 | – |
| 15 | mittel | teilweise | `live-browser.mjs` (882e5d8), M-06 nach P3 (:404) | Kompatibilitäts-Lint fehlt; G1-Verstoß (N-15); nur Hauptseiten (N-02) |
| 16 | mittel | erledigt | :368–369; `commit.sh` (nur Dateien, Schreibrechte) | `PAKET=` nur optional (N-23) |
| 17 | mittel | erledigt | :399, :411–412 | – |
| 18 | mittel | teilweise | NEBELKARTE Z. 18, M-14, Ziel 8,4 | Sperrwirkung der Jury bei P3-16 offen (N-09) |
| 19 | gering | teilweise | K-005 v1.1 angeglichen | `kern.ts:21` Plex `adjustFontFallback: false` gegen K-005 (N-12); P3-00i schon vor L0 gepusht (nur Werkzeuge) |
| 20 | gering | teilweise | E-014 geschrieben, Platzhalter weg | E-014 verweist noch auf P3-10 (jetzt P3-13) |
| 21 | gering | erledigt | :432 (P6 optional, mit Tests) | KERN K-009 nicht angeglichen (N-12) |
| 22 | gering | erledigt | :415 | – |
| 23 | gering | **offen** | – | Regel „gescheitertes Paket vor dem Push revertieren“ fehlt; Commit (PLAN.md:91) steht vor dem Reinraum (:92) |
| 24 | gering | erledigt | `pixel.mjs` (4 Ansichten, `--maske`, A/A), :380 | – |
| 25 | gering | erledigt | `server.sh` Z. 15–16 | – |

Bilanz: 14 erledigt, 10 teilweise, 1 offen. Von den Befunden „hoch“ sind 1–3 erledigt, 4–6 teilweise.

## B) Neue Befunde

### hoch
**N-01 Nach P3-16 ist „ruhend“ nicht mehr ruhend; das Wellen-Tor ist zu schwach.**
- Beleg, Tor: Laut PLAN.md:366 pusht jede Welle „ruhenden Code nach grünem Reinraum-Tor“. Das Reinraum-Tor (`reinraum.sh`) umfasst Build, Typen, Lint, 17 Unit-Tests und qa:graph – keine Funktionstests, keinen Pixelvergleich, keine Konsole. Das Kandidat-Tor greift nur bei Freischaltungen (:367).
- Beleg, Kern-Seiten: Ab P3-16 nutzt die live geschaltete `/` die Dateien `src/components/kern/**`, das Sprite, `(kern)/layout.tsx` und `kern-global.css`. Genau diese Dateien ändern P4-04 (Icon-Vollsatz), P4-05 (Feld/Knopf für Formulare), P4-01/02 und W1 ff.
- Beleg, Kern-CSS: `kern-global.css` scannt per `@source` alle Kern-Ordner einschließlich `_entwurf` (:390). Jedes ruhende Paket ändert damit das live ausgelieferte CSS von `/`.
- Beleg, geteilte Module: Dasselbe gilt für Bestandsseiten. P3-04 „Abbildung `iconMapper`“ (:392) liegt in `src/utils/index.js` und wird von `BlogCard`, `BlogSidebar` und `RelatedPosts` genutzt; dazu kommen `src/config/*` und `src/hooks/useConsent.ts`.
- Folge: Das widerspricht E-015 Ziel (1) und K-004 („Bestands-Code bleibt unverändert“). Ob das alte Push-Tor (PLAN.md:93–100) noch gilt, ist offen.
- Vorschlag:
  - (a) Das Tor jeder Welle prüft gegen den letzten Live-Stand: Pixel 0 (4 Ansichten, A/A) auf allen Seiten, also Bestand und schon freigeschaltete Kern-Seiten. Dazu Funktionstests aller live erreichbaren F, Konsole und Text v2. Abweichungen auf Kern-Seiten nur in vorab erklärten Bereichen und mit Kandidat-Tor dieser Seiten.
  - (b) In `kern-global.css` `@source not "../app/(kern)/_entwurf"` setzen. Die Klassen der Entwürfe kommen dann erst mit dem Freischalt-Kandidaten.
  - (c) Dateien außerhalb von `src/components/kern/` und `src/app/(kern)/` bleiben bis W10 eingefroren. Der Kern bekommt eine eigene Icon-Abbildung und eigene Mikrotexte. Ausnahmen nur als eigenes Paket mit build-vergleich (HTML 172 gleich).
  - (d) Das Push-Skript stuft selbst ein: Trifft `git diff --name-only` die Importhülle live erreichbarer Routen, ist das Kandidat-Tor Pflicht.

**N-02 Der Freischalt-Commit muss nicht dem geprüften Kandidaten gleichen.**
- Beleg, Anspruch: E-015 sagt „Byte für Byte der spätere Live-Stand“ (ENTSCHEIDUNGEN.md:134), PLAN.md:366–367.
- Beleg, Verfahren: `freischalten.sh` arbeitet mit `mv` und `rm -rf`; `commit.sh` nimmt nur einzeln genannte Dateien, keine Verzeichnisse. W4 (15 Routen samt `_…`-Abschnittsordnern) heißt dutzende Pfade von Hand. Fehlt eine neue Datei, während die alte gelöscht ist, ist die Route live weg (404) oder der Vercel-Build ist rot.
- Beleg, zeitliche Lücke: Das Tor dauert Stunden. Zwischen Kandidat-Basis und Freischalt-Commit kann ein weiterer Commit liegen.
- Beleg, Live-Prüfung: Sie deckt nur die 7 Hauptseiten ab (`live-rauchtest.sh`, `live-browser.mjs` mit `hauptseiten`). W4, W5, W7, W8 und W10 werden live an keiner einzigen freigeschalteten Seite geprüft.
- Vorschlag:
  - `freischalten.sh --commit` läuft nur bei sauberem Baum und HEAD = Kandidat-Basis, nutzt `git mv`/`git rm` und committet selbst.
  - Danach Pflichtvergleich `git archive <Freischalt-Commit>` gegen die Kandidat-Kopie (`diff -r` ohne `node_modules` und `.next`). Ist er nicht leer, wird nicht gepusht.
  - Live-Prüfung über die Hauptseiten und alle Routen der Freischaltung (je Vorlage 2 Beispiele), höchstens 1 Anfrage/s.

**N-03 Entwürfe werden weder gebaut noch gesehen; Wellenprüfung, L1 und L8 laufen bis zum Kandidat-Tor leer.**
- Beleg, Build: Private Ordner (`_entwurf`) kompiliert Next nicht, solange niemand sie importiert. Die Aussage „werden gebaut“ in E-015 (ENTSCHEIDUNGEN.md:134) stimmt also nicht. Es laufen nur Typprüfung und Lint. Fehler an Server/Client-Grenzen, bei `next/font`, Metadaten oder `generateStaticParams` zeigen sich erst im Kandidaten. Vermutlich gilt das auch für `(kern)/layout.tsx` und `kern-global.css` ohne geroutete Seite (OFFENE FRAGE).
- Beleg, Selbstkontrolle: Unteragenten dürfen nicht bauen oder starten (:369), und Entwürfe sind nicht erreichbar. Damit gibt es keine Bildschirmfotos zur Selbstkontrolle, obwohl AUFTRAG.md:109 sie ausdrücklich erlaubt.
- Beleg, Prüfungen: Die Wellenprüfung mit „Bildprüfungen, axe der betroffenen Seiten“ (AUFTRAG.md:267), die Paket-Rubrik (Mobilansicht, Zustände) und L8 für SIG-1/2/3 entfallen.
- Folge: P3 baut 15 Pakete blind. Alle Reparaturen landen gebündelt bei P3-16, und L3 erlaubt dort nur drei Anläufe.
- Vorschlag:
  - Pflicht-„Vorschau-Kandidat“ zu jedem Wellenschluss: `KANDIDAT="<alle Entwürfe>" reinraum.sh HEAD` (den Weg gibt es schon) und `server.sh start <sha>-k` auf eigenem Port. Unteragenten fotografieren lesend über `fotos.mjs` und `axe.mjs`.
  - Für noch nicht committete Arbeit ein Vorschaubaum des Orchestrators im Scratchpad: Kopie des Arbeitsbaums, `freischalten.sh`, Build.
  - Kein Vorschauweg im Produkt (G7).

### mittel
**N-04 Die E-015-Erprobung deckt den Kern nicht ab; der 404-Beleg fehlt.**
- Beleg, Erprobung: Der Wegwerf-Baum `scratchpad/exp-gruppen/src/app` enthält nur `(bestand)`, kein `(kern)`; `bericht.json` meldet `nur_nachher: []`. Damit sind ungeprüft: ein zweites Root-Layout, `kern-global.css` mit `source(none)`, eine Kern-Route und der Wechsel zwischen den Gruppen. Logs gibt es nur für Build, Lint und qa:graph.
- Beleg, 404-Status: Er steht in keiner Belegdatei; nur NEBELKARTE.md:19 sagt „erprobt (Status 404 …)“.
- Offen ist außerdem, ob die Klammern in `@source not "./(kern)"` als Glob-Muster gelesen werden.
- Vorschlag: Erprobung 2 vor dem Umzug-Push. Ein Wegwerf-Baum mit Minimal-`(kern)/layout.tsx`, `kern-global.css`, einer statischen und einer dynamischen Probe-Route mit `notFound()`. Zu prüfen:
  - Bestands-HTML und -CSS bleiben gleich.
  - Die Kern-Route lädt nur Kern-CSS und 2 Schriften.
  - Der Wechsel in beide Richtungen läuft ohne Konsolenfehler.
  - Status 404 für unbekannte Adressen und für `notFound()` in beiden Gruppen.
  - Die Glob-Muster mit Klammern greifen.

  Die Statusprotokolle kommen als Beleg ins Repo. Scheitert die Erprobung, fällt die Entscheidung für Weg 2, bevor 172 Seiten umziehen.

**N-05 Für die Kern-Darstellung der Formulare fehlt eine Bauweise; die naheliegenden Wege kollidieren mit E-015.**
- Beleg: P3-13 und P4-05 sagen nur „Kern-Erscheinung … Logik unverändert“ (:401, :413).
- Weg `erscheinung="kern"` in den geteilten Dateien (Runde 1, PLAN.md:322): Er ändert Bestands-Code (KERN.md:44). Die Kern-Klassen lägen in `src/components/forms/`, das `kern-global.css` mit `source(none)` nicht scannt; das Kern-Formular bliebe ungestylt, das Bestands-CSS wüchse.
- Weg Kopie (374–780 Zeilen je Formular): Er dupliziert Geschäftslogik (G9, AUFTRAG.md:193 „Varianten statt Kopien“).
- Vorschlag: Orchestrator-Paket vor P3-13. Die Logik je Formular wandert in einen Hook ohne Markup, z. B. `src/lib/formulare/useHeroKontakt.ts`. Der Bestand nutzt ihn, belegt durch build-vergleich (HTML 172 gleich), Funktionstests und Pixel 0. Die Kern-Ansicht in `src/components/kern/formulare/` nutzt denselben Hook. Ebenso für Karten (`MapConsentGate`) und Einwilligung (`useConsent` unverändert teilen).

**N-06 Was das Kern-Layout mitbringen muss, ist nicht festgelegt; die Einwilligung über die Gruppengrenze ist ungeprüft.**
- Beleg, Layout: Das Root-Layout trägt `TrackingScripts`, `SkipNav`, `ErrorBoundary`, `UIProvider`, `AuthProvider`, `ContentProvider`, Geo-Meta, Verifizierung, JSON-LD, Icons und `x-build` (`src/app/layout.tsx:31–90`, :96–131). P3-02 nennt nur Metadaten-Modul, Kopfskript und BewegungsRegie (:390).
- Beleg, Tracking: `TrackingScripts.jsx:4–7` hängt an `useConsent`. Kein Test prüft „keine Tracking-Anfrage vor der Einwilligung“; `funktion-einwilligung.spec.mjs` kennt keine Tracking-Hosts.
- Vorschlag:
  - P3-02 bekommt die Liste oben als Pflichtinhalt.
  - Text v2 vergleicht den Kopfbereich Bestand ↔ Kern.
  - F-11 wird erweitert: Die Sperrprotokolle der Tracking-Hosts vor und nach der Einwilligung sind auf Bestands- und Kern-Seite gleich. Eine Einwilligung auf `/` gilt nach `/bad` und zurück, ohne erneuten Banner. `#cookie-settings` funktioniert in beiden Gruppen.
  - Das gemeinsame Metadaten-Modul darf `(bestand)/_dokument.tsx` nicht importieren, sonst zieht es `globals.css` und `tokens.css` in Kern-Seiten.

**N-07 Die Kern-404 kommt zu spät; `notFound()` steckt schon ab W2 in Kern-Vorlagen.**
- Beleg: `notFound()` steht in `leistungen/[id]` (Z. 35), `[id]/[stadt]` (128), `standorte/[stadt]` (93), `blog/[slug]` (65), `musterbaeder/[slug]` (48) und `referenzen/[id]` (47). Die Kern-404 kommt erst in W10-02 (:429).
- Folge: Ohne `(kern)/not-found.tsx` zeigt Next bei unbekanntem Parameter seine Standardansicht – englisch, ohne Weg zurück. F-17 prüft nur eine unbekannte Adresse.
- Vorschlag:
  - `(kern)/not-found.tsx` (Wortlaut der Bestands-404) in P3-15, spätestens im Kandidaten von W2.
  - F-17 prüft je freigeschalteter dynamischer Vorlage einen unbekannten Parameter auf 404 und Weg zurück.
  - W10-02 stellt dann nur noch `global-not-found` um.

**N-08 `freischalten.sh` löscht Segment-Layouts, die Bestands-Unterrouten noch brauchen.**
- Beleg: `freischalten.sh` Z. 19–22 entfernt alle Dateien der ersten Tiefe in `(bestand)/<route>/`, also auch `layout.tsx`. `src/app/bad/layout.tsx` setzt JSON-LD (WebPage, Breadcrumb, Service) für alle `/bad/*`.
- Folge: W1 schaltet `/bad` frei, aber `/bad/musterbaeder` und `[slug]` bleiben bis W7 im Bestand. Der JSON-LD-Hash dieser Seiten ändert sich, und das Kandidat-Tor von W1 wird rot.
- Vorschlag: `layout.*`, `template.*`, `not-found.*` und `error.*` im Bestand nur entfernen, wenn darunter keine Bestands-`page.*` mehr liegt. Prüfschritt: Jede Bestandsseite behält ihre Layout-Kette.

**N-09 Die Phasentore sind unter E-015 nicht neu bestimmt.**
- Beleg, P4-Tor: AUFTRAG.md:236 verlangt Z-05, Z-11 und Z-13 auf den Hauptseiten. Am Ende von P4 sind 6 von 7 Hauptseiten unveränderter Bestand (axe-Knoten /bad 36, /standorte 61, /blog 84, /kontakt 30; MESSUNGEN.md:34). Das Tor ist so unerfüllbar, und der Plan nennt keins.
- Beleg, L3: AUFTRAG.md:273 verlangt Probeläufer und Gegenprüfer am Phasentor. Beide fehlen in P3-16.
- Beleg, Jury: Offen ist, ob Jury ≥ 8,0 bzw. 8,4 die Freischaltung von `/` sperrt. Bei „Inhalt“ 4,5–5,5 droht P3-16 dreimal zu scheitern und den ganzen Pfad zu blockieren.
- Vorschlag: Denkprotokoll „Phasentore“ in E-015.
  - P4-Tor = Vorschau-Kandidat der sechs Hauptseiten-Entwürfe (W1-01, W2-01, W3-01, W6-01, W8-01, W9-01 in P4 vorziehen) auf Z-05, Z-11 und Z-13.
  - Die Freischalt-Schwelle (Rang 1–4 grün, nichts schlechter als der Bestand, Jury deutlich über dem Bestand) wird vom Phasentor getrennt (alle Z, Jury ≥ 8,0).
  - P3-16 bekommt Probeläufer, Fünf-Sekunden-Probe und einen frischen Gegenprüfer.

**N-10 Z-04 „nachher“ und P5–P7 haben kein Paket und kein Kriterium (Rest von Befund 6, Plantor AUFTRAG.md:270).**
- Beleg, Z-04: Probeläufer und Fünf-Sekunden-Probe gibt es nur als Basis (:381). Weder das Kandidat-Tor (:367) noch P7 („wie Runde 1“, :434/:352) enthalten sie.
- Beleg, Tabellen: Die P5-Tabelle hat keine Spalten für Kriterium, Dateien und Abhängigkeit (:418–429). P6 ist Fließtext, P7 ein Verweis, P3-15 hat das Kriterium „–“.
- Beleg, Tests: Testschreiber für F-16 (W6), F-17 und F-18 (W9) fehlen. Eine Mutationsprobe gibt es nur je Formular, AUFTRAG.md:260 verlangt sie je Funktion. Rechner mit „≥ 10 Eingaben gegen das Altverhalten“ sind nicht benannt, obwohl der Altstand parallel läuft.
- Beleg, weitere Lücken: Die Jury-Stichprobe von 10 % der übrigen Seiten (AUFTRAG.md:253) und der Slop-Jäger über die Grundmenge (E-016) haben kein Paket.
- Vorschlag: P5–P7 als Tabellen mit Kriterium, Dateien und Abhängigkeit. Je Welle ein Paket „Testschreiber W<n>“ und „Probeläufer W<n>“. P7 mit Probeläufer (5 Aufgaben × 2 Geräte × 3 Eingabearten), Fünf-Sekunden-Probe, Jury-Stichprobe 10 % (mindestens 5), Slop-Jäger über die Grundmenge und Mutationsprobe je F.

**N-11 Der kritische Pfad ist falsch, die Kapazität zu knapp.**
- Beleg, Pfad: P3-09 hängt an P3-06 (Opus), das an P3-03/04 hängt; P3-14 hängt an P3-06–P3-13 (:394, :397, :402). Der Pfad in :439 überspringt beides. W1 braucht BadanfrageFunnel und Projekt-Check aus P4-05 sowie die Tests aus P4-06; P4 hat keine Spalte „hängt ab“.
- Beleg, Abhängigkeitsebenen:
  - P3-00: 2 Ebenen (g braucht a und d).
  - P3: 8 Ebenen (01 → 02 → 03/04/05 → 06/07/08/10/11/13 → 09/12 → 14 → 15 → 16). Auf der vierten Ebene liegen 6 Opus-Pakete, mehr als PARALLELITÄT 5.
  - P4: mindestens 3 Ebenen.
  - P5: etwa 17 Bauwellen (Haiku erst nach dem Opus-Muster) plus 10 Kandidat-Tore in Messfenstern.
- Rechnung: zusammen etwa 40–45 Wellenschritte. Das ergibt 10–13 Tage gegen den Planwert von 8–9. „4 Wellen/Tag“ und die Dauer eines Kandidat-Tors (480 Fotos, Pixel A/A, axe, 289 Funktionsfälle, Lighthouse verschränkt, Jury) sind nicht begründet.
- Vorschlag:
  - Pfad korrigieren: P3-00h → P3-01 → P3-02 → P3-03 → P3-06 → P3-09 → P3-14 → P3-15 → P3-16 → P4-05 → P4-06 → Kandidat W1 …
  - P3-14 nach F-Gruppen teilen.
  - Das Messfenster gilt nur für Lighthouse und Framezeiten.
  - Das erste Kandidat-Tor messen und den Planwert danach festschreiben; Puffer in STATUS in Tagen angeben.

**N-12 KERN v1.1 widerspricht E-015 – und KERN gewinnt gegen den Plan.**
- Beleg:
  - K-004 legt die Tokens „ab P4 in `@theme` (globals.css)“ (KERN.md:45).
  - K-004 bindet die Schriften „in P3 am Wrapper von `/`, ab P4 an `<html>`“ (:46).
  - K-004 sieht die 404 nur über `not-found.tsx` vor (:50).
  - K-005 nennt in der Familien-Zeile „Latin + Latin Extended“ (:56), weiter unten „Latin genügt“ (:60).
  - K-005 nennt „Arial für beide Familien“, aber `src/app/fonts/kern.ts:21` setzt für Plex `adjustFontFallback: false` mit Courier New.
  - K-009 baut Seitenwechsel über `<ViewTransition>`, P6 macht sie optional.
- Folge: Ein Haiku-Baumeister, der K-004 folgt, schreibt Tokens in `globals.css` und ändert damit das Bestands-CSS.
- Vorschlag: KERN v1.2:
  - Tokens als `@theme` in `kern-global.css`; `globals.css` bleibt eingefroren.
  - Schriften am `<html>` des Kern-Layouts.
  - 404 über `(kern)/not-found.tsx` und `global-not-found.tsx`.
  - Teilmenge einheitlich angeben.
  - Ersatzschrift für Plex so festschreiben, wie gebaut, oder den Code angleichen.
  - Seitenwechsel „optional, nur innerhalb der Kern-Gruppe“.
  - Die P3-00-Briefings gegen v1.2 neu ausgeben.

**N-13 Die Varianten-Regel fehlt.**
- Beleg: AUFTRAG.md:114 verlangt für Schlüsselstellen zwei bis drei parallele Agenten, für Signaturmomente Opus. Im Plan sind SIG-1 (P3-09), SIG-2 (W1-01) und SIG-3 (W2-01) je einfach besetzt, ebenso Kopf (P3-06) und Vorlage Fachseite (P4-01).
- Vorschlag: SIG-1, SIG-2 und SIG-3 je als 2–3 Opus-Varianten; Kopf und Vorlage Fachseite als zwei Varianten. Wahl mit Denkprotokoll. Das setzt N-03 voraus und kostet etwa 6 Pakete mehr.

**N-14 E-014: Der vorab gesetzte Haken bleibt auf Bestandsseiten bis W2 bzw. W9 live.**
- Beleg: `PricingCalculator.tsx:60` setzt `useState<boolean>(true)`. Die Komponente steht auf `/`, `/preise`, `/leistungen`, 4 × `/leistungen/[id]` und `/faq`. E-014 setzt den Startwert nur „in der Kern-Darstellung“ auf `false` (ENTSCHEIDUNGEN.md:126). Fairness steht im Rang 1 und damit vor dem Bestand (AUFTRAG.md:119).
- Vorschlag: In P3-00 ein Paket für die Zeile im Bestand, mit Test „startet leer, ohne Haken kein Versand“ und erklärter Pixel-Abweichung (nur die Checkbox) auf 8 Seiten. M-13 bleibt bestehen.

**N-15 Der Live-Browser-Rauchtest verletzt G1 (höchstens eine Anfrage pro Sekunde).**
- Beleg: `live-browser.mjs` lädt jede Hauptseite mit allen Unterressourcen parallel und wartet nur zwischen den Seiten 1 s (Z. 41). G1 steht in AUFTRAG.md:55. `live-rauchtest.sh` schickt außerdem den 404- und den Sitemap-Abruf ohne Pause hintereinander.
- Vorschlag: `/_next/static/**` und `/images/**` aus dem lokalen Reinraum-Build desselben Commits bedienen (die Dateien sind inhaltsadressiert). Live gehen nur Dokument- und RSC-Abrufe, über eine Warteschlange mit mindestens 1 s Abstand.

### gering
- **N-16 Wiederaufnahme wieder veraltet.**
  - PRUEFPUNKT nennt „letzter grüner Commit 1fc0ec3“, „Laufende Pakete: keine“ und „nächster Schritt: Auflagen einarbeiten“. Tatsächlich ist HEAD = origin/main = 882e5d8 (P3-00i gepusht), und die Briefings P3-00a/b/c/d/e/g/j liegen ungetrackt vor. STATUS Zeile 1 sagt „live 1fc0ec3“.
  - Veraltet sind außerdem PLAN.md:289 („Vorschau-Status“, E-005), NEBELKARTE.md:24 „Fremdkörper … P4 globaler Umstieg“ und E-011–E-013 „in P4“ (ENTSCHEIDUNGEN.md:103, :112, :120).
  - Vorschlag: L5 sofort. P3-00 ausdrücklich als Werkzeug-Vorrat ohne `src/` führen, bis L0 besteht. In der Nebelkarte den Markenbruch Kern ↔ Bestand während der Übergangszeit eintragen und die Hauptwege früh freischalten (z. B. W9-01 `/kontakt` direkt nach W1).
- **N-17 Test-Sperrklinke zählt nur statisch.** `testzahl.mjs` zählt `test(`- und `expect(`-Textstellen. Schleifenfälle (109 statische Fälle gegen 289 im Lauf) und tote `expect` erfasst es nicht. Die Basis kennt fixme 3 + skip 6 = 9, der Plan (:368) nennt 11. Vorschlag: zusätzlich Laufzeitzahlen aus dem Playwright-JSON-Bericht je Spec und Projekt; die Zahl im Plan angleichen.
- **N-18 Fragment-Ziele bleiben ungeprüft.** `texte.mjs:73–75` prüft nur `pathname`. Die Anker `/#express-anfrage`, `/kontakt#express-anfrage` (5×), `/kontakt#termin-buchen`, `/referenzen#bewertungen`, `#cookie-settings` und `#main-content` müssen auf Kern-Seiten erhalten bleiben. Vorschlag: texte2 prüft, dass jedes interne `#ziel` auf der Zielseite als `id` existiert.
- **N-19 Klassen-Abdeckung des Kern-CSS.** Nutzen Kern-Seiten geteilte Komponenten außerhalb der Kern-Ordner (z. B. Karten), fehlen deren Klassen bei `source(none)`. Vorschlag: Kandidat-Prüfung „jede Klasse im HTML einer Kern-Seite hat eine Regel im Kern-CSS“ (siehe N-05).
- **N-20 Relative Importe in Entwürfen brechen beim Freischalten.** Die Freischaltung ändert die Ordnertiefe (`_entwurf/bad/` → `bad/`). Im Wurzelfall verschiebt das Skript alle `_*`-Ordner aus `_entwurf/`. Vorschlag: in Entwürfen nur `@/`-Importe; geteilter Kern-Code nur in `src/components/kern/`; Prüfung per grep im Tor.
- **N-21 Nicht alles in „ruhenden“ Phasen ist ruhend.** P3-00h (Umzug), P4-07 (308/410, `next.config.ts`) und N-14 wirken sofort live. Vorschlag: Diese Pakete bekommen das volle Tor (Pixel 0 auf allen Seiten, 289 Fälle, Konsole, 404, URL-Prüfliste Z-06, Live-Browser).
- **N-22 „Banner nie LCP-Element“ ohne erlaubte Mittel.** Zulässig sind Komposition, Größe oder Server-Rendern. Verboten ist ein Einblenden erst nach dem LCP-Beobachter oder per Zeitverzug – das bediente nur die Messung (AUFTRAG.md:257, nahe an G7). In P3-08 festschreiben.
- **N-23 Kleinigkeiten.**
  - `seitenart` in GRUNDMENGE (KERN.md:31, „ab P3-00“) hat kein Paket.
  - P3-16 enthält M-06 (Aufgabe eines Menschen) als Schritt; nicht blockierend formulieren.
  - Der Vorrat (:440) nennt V-01 nicht.
  - Die Liste gemeinsamer Dateien (PLAN.md:86) braucht `(kern)/layout.tsx`, `kern-global.css`, `(bestand)/_dokument.tsx`, `global-not-found.tsx` und `freischalten.sh`.
  - `commit.sh`: `PAKET=` wird für Unteragenten-Pakete Pflicht.
  - Die Rückroll-Anleitung (Z-14) muss den Stand nach W10-03 ohne Bestand abdecken.
  - Befund 23 der Runde 1 ist weiter offen.
  - Der Kommentar der `pixel.mjs`-Maske nennt eine „eigene Welle (P4)“, die es nicht mehr gibt.

### Zu B) der Aufgabe – Bauweise E-015 im Einzelnen
- **Mehrere Root-Layouts und `global-not-found`:** Für den Bestand allein belegt. Für zwei Root-Layouts, `notFound()` in Kern-Routen und Klammer-Globs nicht belegt (N-04, N-07).
- **Volle Neuladung zwischen den Gruppen:** Unkritisch, solange die Einwilligung über das Cookie geteilt wird. Dafür fehlt ein Test (N-06). Folgen sind Markenbrüche auf den Hauptwegen während der Übergangszeit (N-16) und verworfene Prefetches.
- **Getrennte CSS-Einstiege mit `@source`:** Die Richtung stimmt. Es fehlt der Ausschluss von `_entwurf` aus dem Kern-CSS (N-01) und die Regel für geteilte Komponenten (N-05, N-19).
- **Ruhende Entwürfe in `(kern)/_entwurf`:** Nicht gebaut und nicht sichtbar (N-03). Relative Importe brechen beim Freischalten (N-20).
- **Freischalt-Commits:** Identität mit dem Kandidaten nicht erzwungen (N-02). Segment-Layouts werden zu früh gelöscht (N-08).
- **Kandidat-Tor:** Inhaltlich stark. Es fehlen Probeläufer und Gegenprüfer, die Sperrwirkung der Jury ist offen (N-09, N-10), und die Dauer ist ungerechnet (N-11).
- **Abhängigkeiten und Pfad:** siehe N-11.
- **Kriterien:** Z-04 „nachher“ hat kein Paket; Z-08 ohne 10-%-Stichprobe; Z-07 ohne abschließenden Slop-Jäger über die Grundmenge; Z-03 ohne Testpakete für F-16 bis F-18 und ohne Mutationsprobe je Funktion. Die übrigen Kriterien Z-05/06 und Z-09 bis Z-14 haben Werkzeug und Paket.

## C) Regelprüfung
- **UNANTASTBAR:** Im Plan kein Verstoß. Texte laufen über texte2 und `MIKROTEXTE.md`, das Logo über den Hash, das Favicon bleibt Vorschlag, Badges behalten ihren Wortlaut, Rechtsseiten ändern nur die Darstellung. Hinweis: W10-01 berührt Rechtsseiten; nach AUFTRAG gehört das mit Verweis auf M-01 zur Prüfung in MENSCHEN.
- **G1:** Verstoß in `live-browser.mjs` (N-15).
- **G2:** Commits und Pushes laufen nur über den Orchestrator. P3-00i ging vor L0 hinaus, betrifft aber nur Werkzeuge; zulässig als Vorrat, sollte aber im Prüfpunkt stehen.
- **G3, G4, G5, G6:** In Ordnung. `server.sh` bricht bei `.env` und Versandschlüssel ab; `live-browser.mjs` sperrt schreibende Anfragen und Fremd-Hosts; neue Abhängigkeiten nur in `werkzeuge`.
- **G7:** Kein Sonderweg im Produkt gefunden. Die Tests erkennen Hydrierung über `__reactProps$`, Startklasse und Zeitlimit gelten für alle, Kandidat und Vorschau existieren nur in Werkzeugen. Risiken: N-22 (LCP-Trick) und N-17 (Lockerung bliebe unentdeckt).
- **G8:** In Ordnung.
- **G9:** E-014 ändert einen Startwert und braucht einen Test (P3-14). Wird Formularlogik kopiert, droht Abweichung (N-05).
- **KERN v1.1:** Widersprüche in K-004, K-005 und K-009 (N-12).

## Vor P3-00h und vor jeder Änderung unter `src/` zu ändern (Runde 3)
1. **Grundsätze 2 und 3:** Wellen-Tor gegen den Live-Stand, `@source not _entwurf`, Regel zum Einfrieren geteilter Module, Einstufung als live-wirksam (N-01, N-21).
2. **Freischaltung:** `freischalten.sh --commit` mit Baumvergleich gegen den Kandidaten; Live-Prüfung aller freigeschalteten Routen; Segment-Layouts bewahren (N-02, N-08).
3. **Vorschau:** Vorschau-Kandidat zu jedem Wellenschluss; E-015 berichtigen („werden gebaut“) (N-03).
4. **Erprobung 2:** zweites Root-Layout, 404-Beleg, Glob-Muster mit Klammern – vor dem Umzug-Push (N-04).
5. **Entscheidungen:** KERN v1.2 (N-12); Phasentore und Freischalt-Schwelle in E-015 (N-09); Hook-Weg für Formulare (N-05); Pflichtinhalt des Kern-Layouts und Einwilligungstest (N-06); `(kern)/not-found` vorziehen (N-07).
6. **Plan:** P5–P7 als Tabellen mit Kriterium; Z-04 „nachher“, Testschreiber und Probeläufer je Welle, Varianten; Pfad und Kapazität neu rechnen (N-10, N-11, N-13).
7. **Sofortmaßnahmen:** E-014 auch im Bestand (N-14); `live-browser.mjs` auf G1 bringen (N-15); L5 (N-16).

Ohne diese Liste dürfen laufen: die Werkzeugpakete P3-00a bis P3-00g und P3-00j (ändern das Produkt nicht). P3-00e sollte die Fragment-Prüfung (N-18) gleich mitbringen.

## OFFENE FRAGEN
- Baut Next 16.3.6 ein Root-Layout ohne geroutete Seite (`(kern)/layout.tsx` ab P3-02) und dessen CSS mit? Davon hängt ab, wie früh Fehler in `kern-global.css` sichtbar werden (Erprobung 2).
- Lesen `@source`/`@source not` von Tailwind 4.3 Klammern in Pfaden wörtlich?
- Ist das alte Push-Tor (PLAN.md:93–100, Wellenprüfung mit Pixelvergleich) in Runde 2 noch in Kraft? Grundsatz 2 nennt nur das Reinraum-Tor.

## RISIKEN DIESER PRÜFUNG
- Das Kompilierverhalten privater Ordner und layoutloser Root-Layouts habe ich aus der Next-Konvention abgeleitet, nicht durch einen Build belegt.
- Die Kapazität (40–45 Wellenschritte, 10–13 Tage) ist aus der Abhängigkeitsstruktur geschätzt; kurze Orchestrator-Schritte können sie senken.
- Der Wegwerf-Baum im Scratchpad ist lokal und flüchtig; seine Inhalte habe ich nur gelesen.

=== ENDE P2-GEG-02 · BEREIT ZUR RÜCKGABE ===
