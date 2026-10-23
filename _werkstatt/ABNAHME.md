# ABNAHME · Definition of Done

Stand 24.10.2026, E1, Fassung 1.2 (nach Planprüfung Runde 1 und 2). Grundlage: AUFTRAG.md Abschnitt 16 (rekonstruiert, Annahme) mit den Schwellen aus Abschnitt 0 und 6 bis 11. Jede Zeile: Kriterium · Methode · Schwelle · Beleg · Ausgangswert E0 · Stand. Ein Kriterium gilt erst als erfüllt, wenn sein Beleg im Repository liegt und der Abschlussprüfer (AB-END) es bestätigt. Kriterien sinken nie still.

Ausgangswerte E0 trägt der Orchestrator nach E0-PRUEF-03 und E0-PROBE-01…10 ein (`belege/e0/`). „Besser als Budget“ heißt: Der E0-Wert wird zur Schwelle.

## Kriterien

### Z-01 Plan
- Methode: Abgleich PLAN.md gegen Commits.
- Schwelle: 100 % der Pflichtpakete erledigt und abgenommen, jede Zeile mit Commit-Kennung; Kür leer (jedes Kürpaket erledigt).
- Beleg: PLAN.md.
- E0: 0 von 398 Pflichtzeilen (PLAN.md Fassung 1.2). Stand: offen.

### Z-02 Bestand (keine Ausnahme)
- Methode: Stufe C, Reinraum (`reinraum.sh`), Durchlauf der Funktionsliste aus LAGEBILD.md.
- Schwelle: `npm run build`, `typecheck`, `lint`, `test`, `qa:graph` mit Exit 0; Zahl bestandener Tests mindestens wie E0; alle Funktionen der Liste so gut wie in E0; null neue Konsolenfehler in allen Browserläufen der Stufe C (Hauptansichten und Stichprobe).
- Beleg: `belege/abschluss/reinraum.txt`, `belege/abschluss/funktionsliste.md`, `belege/abschluss/konsole.json`.
- E0: reinraum grün bei c53faf4 (Build, Typen, Linter, Tests, Graph alle 0); Testzahl und Konsolenfehler folgen aus E0-PRUEF-03. Stand: offen.

### Z-03 Designsystem
- Methode: Suche nach Werten außerhalb der Tokens in geänderten Dateien (`werte.mjs` mit `werte-regeln.json`: Farben, Abstände, Größen, Schrift, Radien, Dauern, Tailwind-Beliebigwerte und Stilwerte; dazu `statisch.mjs` für Icon-Familien, Emojis und Platzhalter), Stichprobe von 10 neuen Komponenten durch den Prüfer.
- Schwelle: null Treffer außer Unantastbarem (Logo, Rechtstexte) und Bildinhalten; jede neue Komponente nutzt Tokens aus K-005.
- Beleg: `belege/abschluss/werte.json`.
- E0: Zählung im Bestand folgt aus E0-PRUEF-03 (nur Bericht, nicht Schwelle). Stand: offen.

### Z-04 Gestaltung
- Methode: Endprüfung nach Award-Rubrik (AUFTRAG Abschnitt 14) durch einen frischen Opus-Unteragenten an den Nachher-Bildsätzen; blinder Vergleich: Ein Haiku-Dokumentar benennt Vorher- und Nachher-Bilder neutral und mischt sie, der Schlüssel liegt getrennt.
- Schwelle: jede der 12 Hauptansichten mit Ansichtswert mindestens 8, keine Kategorie unter 7; im blinden Vergleich zieht der Prüfer auf jeder Hauptansicht den neuen Stand vor.
- Beleg: `berichte/ABSCHLUSS-rubrik.md`, `bilder/abschluss/blind/` mit getrenntem Schlüssel.
- E0: Rubrik des alten Stands aus der Sichtabnahme E0 (folgt mit LAGEBILD). Stand: offen.

### Z-05 Bewegung
- Methode: Register K-007 gegen den Code (`bewegung.mjs` Registerabgleich), Einzelbildfolgen von B-01 und B-02, Tests `test/verlegen.test.mjs` und Intro-Schalter, Lauf mit reduzierter Bewegung, Bildratenmessung mobil bei 4-fach gedrosselter CPU.
- Schwelle:
  - Jede Animation steht im Register mit Zweck, Auslöser, Dauer, Kurve, Verhalten bei reduzierter Bewegung.
  - B-01: 30 × 60 quer, Drittelverband, rechts herein, links hinaus, gesamt ≤ 1.200 ms, ab dem zweiten Wechsel ≤ 900 ms, Zurück und Vor gespiegelt mit 70 % der Dauer, Wartephase mit Laserlinie ≤ 3 s, keine Fliesen bei den Ausnahmen aus Abschnitt 9, kein zweiter Wechsel bei Doppelklick, Fokus auf H1, Titel angesagt, reduziert 150 ms Überblendung, ≤ 80 Fliesen.
  - B-02: nur beim ersten Besuch je Browser, ≤ 2.200 ms, Abbruch durch Klick, Tipp, Taste und Scroll, reduziert 300 ms Einblenden, ohne Speicher kein Intro.
  - Reduzierte Bewegung: keine Lage- oder Größenänderung, alle Inhalte sichtbar.
  - Große Momente mobil mit 4-fach gedrosselter CPU: höchstens 5 % verworfene Bilder.
- Beleg: `belege/abschluss/bewegung.json`, `bilder/abschluss/b01/`, `bilder/abschluss/b02/`.
- E0: Register v2 mit 16 Kennungen, B-01 und B-02 fehlen. Stand: offen.

### Z-06 Grafik
- Methode: `svg.mjs` über alle SVG-Dateien und Hauptansichten, Sichtprüfung des Sprites, Deckungsmessung des Logo-Vektors (`werkzeuge/logo/`).
- Schwelle: eine Icon-Familie mit einer Strichstärke; jede SVG-Datei optimiert (svgo ohne sichtbaren Verlust, keine Editor-Reste und Metadaten) und zugänglich (dekorativ mit `aria-hidden`, sonst mit Titel); keine doppelten Kennungen je Ansicht; Logo-Vektor mit mindestens 98 % Deckung bei doppelter Größe und exakten Farben, sonst Ersatz-Intro „Der erste Boden“ und Bitte in MENSCHEN.md (M-09).
- Beleg: `belege/abschluss/svg.json`, `belege/e2/logo-deckung.json`.
- E0: 45 Icons im Sprite, Logo-SVGs betten ein PNG ein. Stand: offen.

### Z-07 Zugänglichkeit
- Methode: axe (WCAG 2.2 AA) auf allen Hauptansichten mobil und Desktop, Tastaturlauf für A1 bis A6 (`probelauf.mjs --eingabe tastatur`), Kontrastrechnung der Tokens, Bildsatz mit Systemschrift 200 %.
- Schwelle: null ernste oder kritische Befunde; alle Hauptaufgaben A1 bis A6 am Desktop nur mit Tastatur lösbar; Fokus immer sichtbar; Text ≥ 4,5:1, große Schrift, Bedienelemente und bedeutungstragende Grafik ≥ 3:1; bei 200 % Systemschrift alles lesbar und bedienbar; Lighthouse Zugänglichkeit ≥ 95 oder E0-Wert, falls höher.
- Beleg: `belege/abschluss/axe.json`, `belege/abschluss/tastatur.md`, `belege/abschluss/schrift200/`.
- E0: folgt aus E0-PRUEF-03. Stand: offen.

### Z-08 Leistung
- Methode: `lighthouse.mjs` mobil und Desktop, Median aus 3 Läufen, frisches Profil je Lauf (also mit Intro), im Ruhefenster ohne parallele Last; Reaktion (INP) per Playwright: `PerformanceObserver` vom Typ `event` (Schwelle 16 ms) auf m390 mit 4-fach gedrosselter CPU bei fünf Handlungen (Hauptknopf, Menü öffnen, Akkordeon, Eingabefeld, interner Link), höchster Wert je Seite, Median aus 3; Bundle-Messung des Bewegungscodes (`build-vergleich.mjs`); Größe der Startbild-Datei.
- Schwelle mobil je Hauptansicht: LCP ≤ 2,5 s, CLS ≤ 0,1, Reaktion (INP aus der Playwright-Messung) ≤ 200 ms, dazu TBT ≤ 200 ms aus Lighthouse, Lighthouse Leistung ≥ 90, Zugänglichkeit ≥ 95, Best Practices ≥ 95, SEO 100; keine Hauptansicht schlechter als E0 um mehr als die Spanne ihrer drei E0-Läufe; ist ein E0-Wert besser als das Budget, gilt er. Bewegungscode zusätzlich ≤ 60 KB komprimiert. Startbild mobil ≤ 200 KB.
- Beleg: `belege/abschluss/lighthouse/`, `belege/abschluss/bundle.json`.
- E0: Probe `/` mobil 88, LCP 3.240 ms, TBT 237 ms, CLS 0 (ein Lauf); Medianwerte aller Hauptansichten aus E0-PRUEF-03, INP-Messung ab E2 (Werkzeug `reaktion.mjs`, Paket E2-PRUEF-INP). Stand: offen.

### Z-09 Darstellung
- Methode: `bildsatz.mjs` mit Überlaufprüfung und `ueberlappung.mjs` in allen 10 Gerätegrößen; `erstesbild.mjs` je Hauptansicht und Gerät in beiden Durchgängen (Erstbesuch, nach Einwilligung); Stichprobe 10 % der übrigen Seiten.
- Schwelle: null seitliches Scrollen, null abgeschnittener, überlappender oder verdeckter Text; Erstes Bild (Logo, Überschrift, Ort, Hauptknopf, Telefon oder WhatsApp) vollständig sichtbar auf allen 12 Hauptansichten in allen 10 Gerätegrößen; Handy quer: Kopf und Leisten ≤ 25 % der Höhe; Fließtext mobil ≥ 16 px; Touchziele ≥ 44 × 44.
- Beleg: `belege/abschluss/erstes-bild.json`, `belege/abschluss/bildsatz/`.
- E0: Rauchlauf `/` und `/kontakt`: alle fünf Elemente in 20 von 40 Fällen, Querformat 32,4 % (E0-PRUEF-02a); vollständig folgt aus E0-PRUEF-03. Stand: offen.

### Z-10 Übergabe
- Methode: Endprüfung der Dateien.
- Schwelle: BERICHT.md, KERN.md, MENSCHEN.md, Vorher-Nachher-Galerie (`bilder/galerie.html`), Anleitung zum Zusammenführen (Squash, `_werkstatt` und `_relaunch` vorher entfernen) und Zurückrollen vollständig und aktuell.
- Beleg: die Dateien.
- E0: entfällt. Stand: offen.

### Z-11 Nutzerführung (keine Ausnahme)
- Methode: `probelauf.mjs` mit P1 bis P5 (K-002) für A1 bis A6, je mobil und Desktop, Systemschrift 200 % für P1; Strukturprüfung der Navigation; Zählung von Hauptknöpfen (`data-hauptknopf`), Formularen der Startseite und Pflichtangaben des Hauptwegs.
- Schwelle: alle 60 Fälle (5 Personen × 6 Aufgaben × 2 Geräte) gelöst, ohne Abbruch, je Fall höchstens so viele Schritte wie in E0; höchstens 5 Hauptpunkte, eine Aufklappebene, kein Thema doppelt, Mobilmenü ohne Scrollen auf 360 × 740; jede Seite genau ein Hauptknopf; Startseite höchstens ein Formular; Hauptweg höchstens 4 Pflichtangaben.
- Beleg: `belege/abschluss/probelauf/`, `belege/abschluss/struktur.json`.
- E0: Startseite mit 3 Formularen; Menü 5 Aufklappmenüs, 37 Ziele, 3 Ebenen; Schritte je Fall folgen aus E0-PROBE-01…10. Stand: offen.

### Z-12 Texte
- Methode: `lesbarkeit.mjs` über alle gerenderten Seiten außer Rechtstexten (Flesch nach Amstad, Satzlängen, Absätze, Striche gegen `regeln/bindestrich-erlaubt.json`, Floskeln gegen `regeln/floskeln.json`, Glossar gegen `regeln/glossar.json`, Titel und Beschreibung); Textstichprobe je Welle (10 %, mindestens 5 Seiten) durch den unabhängigen Haiku-Prüfer der Welle (`E*-PRUEF-A`), Urteil durch den Orchestrator; Faktenabgleich gegen K-015; Suchbegriffe gegen `adressen-e0.csv`.
- Schwelle: Flesch ≥ 60 auf Erzähl- und Ortsseiten, ≥ 50 auf Wissensseiten; mittlere Satzlänge ≤ 14 Wörter; kein Satz über 25 Wörter; Absätze ≤ 4 Sätze; null Gedankenstriche und null Bindestriche außerhalb der Liste; null Floskeln; jedes Glossarwort beim ersten Vorkommen erklärt (≤ 15 Wörter); Titel ≤ 60, Beschreibung 120 bis 155 Zeichen; alle Stichproben bestanden (höchstens 10 % Regelverstöße je Welle, sonst zurück); null Fakten außerhalb K-015; Suchbegriffe je Seite erhalten; Kundenstimmen wörtlich.
- Beleg: `belege/abschluss/lesbarkeit.json`, `berichte/*-LEKT-*.md`, `belege/abschluss/suchbegriffe.json`.
- E0: 830 Gedankenstriche in 217 Dateien, „Vor-Ort-Aufmaß“ 132-mal; Seitenwerte folgen aus E0-PRUEF-03. Stand: offen.

### Z-13 Bilder
- Methode: Bildinventar gegen `bildplaetze.md`, Metadatenprüfung aller ausgelieferten Rasterbilder unter `public/**` (`bilder.mjs --pruefe`), Alt-Text-Prüfung in `lesbarkeit.mjs`, Sichtprüfung auf Personen und Kennzeichen.
- Schwelle: jede Hauptansicht mit mindestens einem echten Bild, sofern passende Bilder da sind (sonst Fliesenkomposition mit Vermerk in `bildplaetze.md`); Startbild vorhanden; Galerie „Unsere Arbeiten“ mit Filter nach Raum; Vorher-Nachher-Regler; null Metadaten (EXIF, XMP, IPTC, GPS) in allen ausgelieferten Rasterbildern unter `public/**`; Alt-Texte ≤ 125 Zeichen nach Zeichenregeln, dekorative Bilder leer; keine erkennbaren Personen, Hausnummern, Kennzeichen, Namen oder Dokumente; keine Generatorbilder mehr in Verwendung (E-013).
- Beleg: `bildinventar.csv`, `belege/abschluss/bilder.json`.
- E0: keine echten Projektfotos auf der Seite, 11 Generatorbilder in Verwendung. Stand: offen.

### Z-14 Adressen (keine Ausnahme)
- Methode: `adressen.mjs` gegen `adressen-e0.csv` (alle 170 Adressen), Linkprüfung aller internen Links, Prüfung strukturierter Daten, Abgleich Sitemap.
- Schwelle: jede Adresse aus `adressen-e0.csv`, die Abschnitt 11 meint (Sitemap und Durchlauf aller internen Links, Quellen `sitemap`, `link`, `weiterleitung`: 170 Adressen), liefert 200 oder leitet dauerhaft auf eine gleichwertige Seite; die übrigen 32 Zeilen (Quelle `wege`, Status 410 schon in E0, weder in der Sitemap noch verlinkt) bleiben unverändert 410 (E-016, Bestätigung M-16); null kaputte interne Links; je Seite genau eine H1, ein Titel, eine Beschreibung, ein absoluter Canonical; strukturierte Daten gültig (JSON-LD parst, `@context` schema.org, Pflichteigenschaften je verwendetem Typ: LocalBusiness, Organization, WebSite, WebPage, BreadcrumbList, FAQPage, Article, Service, Review); Sitemap enthält jede indexierbare Adresse.
- Beleg: `belege/abschluss/adressen.csv`, `belege/abschluss/links.json`.
- E0: `adressen-e0.csv` (E0-PRUEF-02c): 168 × 200, 2 × 308, 32 × 410, 0 kaputte Links, 0 Abweichungen bei H1, Titel, Beschreibung, Canonical und JSON-LD-Syntax; Video-Sitemap zeigt auf zwei fehlende Videos. Stand: offen.

## Umgebungsausnahmen (zählen nicht als AUSNAHME, M-15)
- U-01 Echte Geräte (iPhone, Android): nicht vorhanden. Ersatz: Chromium mit Geräteemulation in allen 10 Größen, Touch, Systemschrift 200 % per Textskalierung. Bitte an den Menschen: Startseite, ein Seitenwechsel und das Formular auf einem echten Handy.
- U-02 Safari und Firefox: nicht vorhanden, nur Chromium. Ersatz: Code-Prüfung gegen bekannte Unterschiede (Reihenfolge von `popstate`-Lauschern in Firefox vor 116, WAAPI und `inert` in Safari 17), Rückfall auf Weg (b) bei B-01 dokumentiert.
- U-03 Bildrate auf echter Grafik: nur Software-Rendering im Container. Ersatz: Messung mit 4-fach gedrosselter CPU in Chromium headless; Werte sind konservativ.
- U-04 Echtes Mobilnetz: Ersatz: Lighthouse-Drosselung (simuliert, Standard von Lighthouse 13.5).
- U-05 Screenreader: kein VoiceOver oder TalkBack. Ersatz: Barrierefreiheitsbaum aus Playwright, Prüfung von Titelansage (Routen-Ansager von Next) und Fokus auf H1.

## Ausnahmen (höchstens zwei, keine für Z-02, Z-11, Z-14)
- keine

## Prüfmatrix (welche Stufe belegt was)
| Kriterium | Stufe A je Paket | Stufe B je Etappe | Stufe C Abschluss |
|---|---|---|---|
| Z-02 | Typen, Linter, betroffene Tests | volle Suite, Konsole | Reinraum, Funktionsliste |
| Z-03 | `werte.mjs` der geänderten Dateien | `werte.mjs` der Etappe | alle geänderten Dateien |
| Z-04 | Bild mobil und Desktop | Sichtabnahme ≥ 8 | Endprüfung, blind |
| Z-05 | Register-Eintrag | Einzelbilder neuer Momente, Bildrate | Registerabgleich, B-01, B-02 |
| Z-06 | SVG des Pakets | SVG der Hauptansichten | alle SVG |
| Z-07 | – | axe Hauptansichten | axe, Tastatur A1 bis A6, 200 % |
| Z-08 | Budget des Pakets (Größe) | Lighthouse und Reaktion Hauptansichten | Lighthouse und Reaktion Hauptansichten |
| Z-09 | Bild mobil und Desktop | 10 Größen, Erstes Bild | 10 Größen, Erstes Bild, Stichprobe |
| Z-11 | – | Probeläufe nach Etappenplan | P1 bis P5, A1 bis A6, Tastatur |
| Z-12 | Lesbarkeit der Seite | Lesbarkeit Hauptansichten, Stichprobe | alle Seiten |
| Z-13 | Bildplatz des Pakets | Hauptansichten | alle Bilder, Metadaten |
| Z-14 | Links der Seite | Linkprüfung | alle Adressen |
