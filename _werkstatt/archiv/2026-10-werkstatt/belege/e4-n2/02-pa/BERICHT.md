# E4-N2-02-PA · Prüfstufe A der Bausteine und Bewegung (Prüfer)

Stand: 2026-10-12, Lauf ca. 05:55 bis 06:31 UTC. Umfang laut Paket: Bausteine E4-N2-02/-03 und Orchestrator-Nachträge (172bd63, c956779, 2db9127, 28abfc9). Dev-Server 127.0.0.1:4320 (Arbeitsbaum), Produktion 127.0.0.1:4310 (siehe Hinweis unten).

## Repo-Stand

| | Beginn | Ende |
|---|---|---|
| HEAD | dc5f2ae (05:53), danach ff5eb60 (05:54) | 60a9bad (06:11, ueberlappung.mjs) |
| Status | M: 4 Dateien unter `src/app/(bestand)/bad/…` (fremd), ?? `_werkstatt/pakete/E4-BAU-02.rueckgabe.md` (fremd) | M: 6 Dateien fremder Helfer (bad/musterbaeder, fliesen/festpreisangebot, fliesen/fliesenarten, flur-diele, fugensanierung), ?? `_werkstatt/belege/adhoc/texte/` (fremd), ?? `_werkstatt/belege/e4-n2/02-pa/` (mein Beleg) |

Zwischen den Ständen wurden von anderen Helfern Commits gesetzt (ff5eb60, 4c1f614, 078b410, 872377e, 72e36ba, 559975b, 60a9bad). Die geprüften Dateien aus dem Paket sind seit ff5eb60 unverändert (`git diff --name-only ff5eb60 60a9bad` ohne Treffer). `_werkstatt/werkzeuge/ueberlappung.mjs` wurde um 06:11 geändert (60a9bad); die Überlappungszahlen in den Bildläufen (ab 06:17) stammen aus dieser Fassung.

Ich habe nur lesende Git-Befehle benutzt und keine Projektdatei, kein Werkzeug und keinen Server geändert.

## Lauf 1 · Prüfstufe A (`pruefe-a.sh`)

Ergebnis: GRÜN gesamt, Exit 0, Laufzeit 1507 s. Die Stufe lief in der Warteschlange der gemeinsamen Semaphore (beide Plätze durch andere Helfer belegt). Die Belege liegen in `stufe1/`.

- Typprüfung (tsc): GRÜN. Fehler in eigenen Dateien 0, übrige 0.
- Lint (eslint): GRÜN. Fehler 0, Warnungen 1. Die Warnung betrifft `src/app/bewegung.css`, für das ESLint keine Konfiguration hat (Datei ignoriert). Kein Codebefund.
- Funktionstests: GRÜN. 13 Specs, erwartet 290, unerwartet 0, flaky 0, übersprungen 20 (Playwright-Statistik).
- Bilder: GRÜN. 13 Ansichtspfade, HTTP 200 überall, Konsole 0, Überlauf 0. Überlappung (informativ, nicht im Gate): `/` 25, `/fliesen` 40, `/fliesen/konfigurator` 61 (m390 39, d1440 22). Die übrigen Pfade 0.
- Texte (gegen Basis e0): GRÜN. Entfernt 0, unerlaubt entfernt 0, hinzu 728, kaputte Links 0. Der Textlauf schreibt nach `_werkstatt/cache/texte/…`; dieser Pfad ist ein Symlink in das Scratchpad, also kein Repo-Pfad.

## Lauf 2 · Node-Tests

`npm test`: 37 bestanden, 0 fehlgeschlagen (Log: `logs/npm-test.log`). Darunter die Gruppen „Bewegung 1–5“ (u. a. Kopfskript mit Notaus nach 2 s) und „Plan 1–4“.

## Lauf 3 · Bewegungsfolgen (gegen 4320, Nutzung laut Kopf von bewegung.mjs)

Die Werkzeugkennzahl ist die Zahl der Bilder, die sich vom Nachbarn um mehr als 0,5 % der Pixel unterscheiden (Graustufen, Schwelle 24). Die Pixelzahlen sind aus den Bildern nachgerechnet (`logs/pixelzaehlung.txt`).

| Folge | Ansicht | Kennzahl | Anteile je Bildpaar (Werkzeug) | Pixel je Paar (eigene Zählung) | Bildbefund | Ortstext ab Bild 0 |
|---|---|---|---|---|---|---|
| /bad sig-plan | d1440 | 0/5 | 0,07 / 0,41 / 0,49 / 0,21 % | 867 / 5273 / 6400 / 2659 (Schwelle 6480) | Raster rückt in die Flucht, Achse zieht sich auf | n. a. |
| /bad sig-plan | m390 | 5/5 | 1,50 / 2,00 / 2,19 / 1,21 % | 9347 / 12495 / 13675 / 7524 | Raster rückt, Achse zieht sich von oben auf (Komposit) | n. a. |
| /leistungen/bad sig-plan | d1440 | 2/5 | 0,02 / 0,43 / 0,51 / 0,19 % | 272 / 5549 / 6586 / 2419 | Raster rückt; keine rote Achse im Blatt (siehe Befund B1) | n. a. |
| /standorte einzugsband | m390 | 0/5 | 0,08 / 0,11 / 0,09 / 0,00 % | 997 / 1515 / 1229 / 51 | Zonenkanten ziehen sich: Zone 1 bei y 364, Zonen 2 und 3 bei y 868 und 1282 | ja |
| /standorte einzugsband | d1440 | nicht gemessen | Timeout (30 s) in 2 Läufen | – | keine Bilder (Befund B2) | – |

Anmerkungen:
- Die Schwelle von 0,5 % erreicht die 1-px-Kanten des Einzugsbands nicht (0/5 trotz sichtbarer Bewegung). Bei /bad d1440 liegt das größte Paar mit 6400 px knapp unter der Schwelle von 6480 px.
- /bad sig-plan m390: vor Bild 0 wurde auf 813 px gescrollt (Element nicht ganz sichtbar). Bild 1 zeigt die Achse bereits voll, Bild 2 nur einen Stub. Der Lauf wurde mit gleichem Ergebnis wiederholt (`bewegung/einzelbilder-bad-sig-plan-m390-wdh1`). Eine Normalgeschwindigkeits-Sonde ohne Zeitlupe zeigt den CSS-Verlauf monoton: Höhe 0 bis etwa 320 ms, dann wachsend, 226 px bei 1120 ms (`logs/achse-verlauf.txt`). Die Anomalie spricht eher für einen Mess- oder Zeitbasisfehler im Werkzeug als für einen CSS-Fehler. Die Ursache ist nicht geklärt (offene Frage O4).
- Ortstext des Einzugsbands m390: Bild 0 zeigt alle Orte und Entfernungen lesbar (`bewegung/komposit-standorte-einzugsband-m390.jpg`).

Lauf 3, weitere Modi:

| Modus | Seite (Ansicht) | Befunde | geprüft | Hover (Fehler) | Fokus verschieden | unsichtbar (nur display:none) |
|---|---|---|---|---|---|---|
| reduziert | /bad (m390) | 0 | 168 | 20 (0) | 11 | 5 |
| reduziert | /bad (d1440) | 0 | 168 | 20 (0) | 23 | 2 |
| reduziert | /standorte (m390) | 0 | 156 | 20 (0) | 17 | 5 |
| reduziert | /standorte (d1440) | 0 | 156 | 20 (0) | 26 | 2 |
| register | /kontakt (m390) | 0 unbekannt, 0 ohne Register | – | 20 (0) | 5 | – |
| register | /kontakt (d1440) | 0 unbekannt, 0 ohne Register | – | 20 (0) | 20 | – |

Register-Befund /kontakt: gefunden `aufklappen`, `druck`, `zustand`. Keine Kennung `leitachse` (wie erwartet).

## Lauf 4b · axe (12 Hauptansichten × m390, d1440)

24 Läufe, Verstöße 0 in allen Stufen, ernst/kritisch 0 (`axe/axe.json`). Besonders der Artikel `/blog/rutschfeste-fliesen-r-klassen` in m390: 0 Verstöße.
Kontrolle des Werkzeugs auf einer bewusst fehlerhaften lokalen Testseite: 3 Verstöße (`button-name` kritisch, `image-alt` kritisch, `color-contrast` ernst). Das Werkzeug findet also Verstöße (`logs/axe-kontrolle.txt`).

## Lauf 4 · Sichtprüfung (je Punkt ja/nein)

Bilder: `bilder/<seite>/{m390,d1440}.jpg` (Stand 06:17 bis 06:21). Dasselbe Werkzeug und dieselben Parameter wie Stufe 1, Schritt 5. Ich habe die Bilder vorab erzeugt, weil die Stufe-1-Läufe in der Warteschlange standen.

Erster Bildschirm mit Planblatt und roter Achse:
- /bad m390: **nein**. Der Plan liegt unter dem ersten Bildschirm. Die rote Lot-Achse links ist sichtbar (`bilder/bad/m390.jpg`).
- /bad d1440: **ja**. Plan rechts, rote Achse bei x 1088 (`bilder/bad/d1440.jpg`). Standbild mit reduzierter Bewegung, dort ist auch die Leitachse links voll rot (Frage O3).
- /leistungen m390: **nein** (Plan unter dem ersten Bildschirm, `bilder/leistungen/m390.jpg`).
- /leistungen d1440: **ja** (`bilder/leistungen/d1440.jpg`).
- /leistungen/bad m390: **nein** (Plan unter dem ersten Bildschirm, keine Achse, `bilder/leistungen__bad/m390.jpg`).
- /leistungen/bad d1440: **nein**. Im Blatt keine rote Achse (`bilder/leistungen__bad/d1440.jpg`, Befund B1).

Arbeitsansichten, H2 kleiner als H1 (DOM-Messung, `logs/messung-dom.json`):
- /kontakt: m390 H1 32,58 px, H2 24,29 px; d1440 H1 55,68 px, H2 35,84 px. **ja**.
- /fliesen/konfigurator: m390 H1 32,58 px, H2 24,29 px; d1440 H1 55,68 px, H2 35,84 px. **ja**.
- /blog: m390 H1 32,58 px, erste sichtbare H2 20,16 px; d1440 H1 55,68 px, H2 24,00 px. **ja**. Die erste H2 ist „Handwerkerbonus: Fliesenarbeit“. Ob es sich um die Abschnitts-H2 oder einen Kartentitel handelt, habe ich nicht geprüft.

Ablauf auf einer Linie (d1440, DOM-Messung der Planstände `.szene-plan`):
- `/`: Oberkante 6140 px bei allen drei Ständen, x 145 / 550 / 955, Breite 340. **ja** (`bilder/start-voll/d1440-voll.jpg`).
- `/leistungen`: Oberkante 3416 px, x 145 / 550 / 955, Breite 340. **ja** (`bilder/leistungen-voll/d1440-voll.jpg`).

/standorte, Anfrageabschnitt ohne leere Hälfte (d1440): **ja**. Kopf links bei x 112, Breite 373. Inhalt rechts bei x 533, Breite 795. Bild `bilder/anfrage-standorte-d1440.png`. Im eingebetteten Ansprechpartner-Feld bricht der Telefonknopf „06441 / 44 83 567“ in drei Zeilen um (Beobachtung, kein Befund).

## Befunde

- **B1 · Planblatt ohne rote Achse auf /leistungen/[id].** Der Verlegeplan steht in `<ViewTransition>` und bekommt dort `ohneAchse` (`src/app/(bestand)/leistungen/[id]/page.jsx`, Zeilen 200–203). `Planblatt.tsx` Zeile 29 setzt die Achse nur, wenn der direkte Kind-Knoten `Verlegeplan` ist. Die Wrapper-Ebene verhindert das. Bild und Code stimmen überein. Die Datei liegt nicht in meinem Paket.
- **B2 · Einzugsband d1440 nicht messbar.** Das Head-Skript setzt `html.k-notaus`, wenn sich das Modul (`html.k-modul`) nicht binnen 2 s meldet. Die Klasse wird nicht zurückgenommen. Ergebnis: keine CSS-Animation (Sonde `logs/sonde-ladebild-d1440.txt`, zwei von drei Ladevorgängen mit `k-notaus`). Im Dev-Server meldet sich das Modul 1,9 bis 4,6 s nach Start. Auf 4320 hatten 3 von 20 Ladevorgängen `k-notaus` (`logs/sonde-notaus-4320.txt` 2 von 10, `logs/sonde-notaus.txt` 1 von 10), auf 4310 0 von 10. Die sig-plan-Folgen auf /bad (beide Ansichten) und /leistungen/bad d1440 liefen, also kam dort die Meldung rechtzeitig.
- **B3 · Dokument und Code weichen ab.** K-007 nennt `html.k-bereit` und das Head-Skript als Rückfall. Der Code verwendet `k-modul` und `k-notaus` (`src/lib/motion/kopfskript.ts`).

## Offene Fragen

- **O1 · Achse auf /leistungen/[id]:** Soll `ohneAchse` in Zeile 203 entfallen? Dann zeigt das Blatt die Achse. Auf /leistungen/bad d1440 käme eine zweite rote Linie zur Leitachse (siehe O3).
- **O2 · Notaus-Zeitfenster:** Soll `k-notaus` zurückgenommen werden, wenn das Modul spät meldet? Und soll K-007 an den Code angepasst werden?
- **O3 · Zwei rote Linien im ersten Bildschirm bei reduzierter Bewegung:** /bad d1440 zeigt Leitachse (voll rot, Sofortzustand) und Planachse. K-003 verlangt „je Bildschirmhöhe höchstens ein roter Blickfang“. Gilt das im Standbild?
- **O4 · Werkzeug bewegung.mjs:** Schwelle 0,5 % ist für 1-px-Kanten und kleine Pläne ungeeignet (Einzugsband m390 0/5, /bad d1440 knapp darunter). Bild 1 der Achse erscheint vermutlich zu früh voll (Zeitbasis der Zeitlupe, nicht geklärt). Das Werkzeug sollte geprüft werden; ich habe es nicht geändert.
- **O5 · Überlappung** 25 / 40 / 61 auf `/`, `/fliesen`, `/fliesen/konfigurator`. Ursache nicht untersucht.
- **O6 · Produktionsserver 4310** läuft mit dem Build `reinraum-adacabf` (Commit adacabf, E3-TOR-2, vor 172bd63). Er ist für einen Vergleich mit dem Stand dieses Pakets nicht geeignet. Neustart durch den Orchestrator nötig; ich habe keinen Server gestartet oder gestoppt.

## Dateien

- Stufe 1: `stufe1/` (pruefe-a.txt, stufe1-stdout.txt, pw.json, eslint.json, specs.txt, texte-vergleich.log)
- Node-Tests: `logs/npm-test.log`
- Bewegung: `bewegung/` (je Lauf `.txt` und `ergebnis.json`, Bilder in den Unterordnern, Komposite `komposit-*.jpg`)
- axe: `axe/axe.json`, `logs/axe.log`, `logs/axe-kontrolle.txt`
- Bilder: `bilder/` (Einzelbilder je Seite, Vollbilder `*-voll`, `anfrage-standorte-*.png`)
- Messungen: `logs/messung-dom.json`, `logs/anfrage-standorte.txt`, `logs/pixelzaehlung.txt`, `logs/achse-verlauf.txt`, Sonden `logs/sonde-*.txt`
- Hilfsskripte (nur Lesen, nur Scratchpad-Kopien): `hilfsskripte/`
