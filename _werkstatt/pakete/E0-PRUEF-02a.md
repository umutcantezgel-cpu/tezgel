# E0-PRUEF-02a

## 1. Kopfzeile
E0-PRUEF-02a · Rolle Prüfer · Modell Haiku 5.5 · Stufe 1 (Werkzeug nach Checkliste) · Kern-Version: v2 (bis v3), Auftrag `_werkstatt/AUFTRAG.md` · Schreibrechte (exakt): `_werkstatt/werkzeuge/lib.mjs`, `_werkstatt/werkzeuge/bildsatz.mjs`, `_werkstatt/werkzeuge/einzelbild.mjs`, `_werkstatt/werkzeuge/erstesbild.mjs` (neu), `_werkstatt/werkzeuge/tests-logik/erstesbild-probe.html` (neu), `$SCRATCH/E0-PRUEF-02a/**` · Umfang: ein neues Werkzeug, Erweiterung von drei Dateien, eine Positivprobe, ein Rauchlauf (2 Seiten × 10 Geräte × 2 Durchgänge)

## 2. Rollenbriefing
Du bist **Prüfer**: Du richtest Werkzeuge ein, führst die Prüfungen deiner Stufe aus und berichtest knapp mit Belegpfaden.
- Gute Arbeit: Jede Aussage ist mit einem Befehl und seiner Ausgabe belegt; neue Werkzeuge haben eine Positivprobe, die zeigt, dass sie einen bekannten Fehler wirklich finden; Messungen sind Mediane, keine Einzelwerte.
- Die drei häufigsten Fehler: 1. Einzelmessung statt Median; 2. deuten statt berichten; 3. über die eigene Stufe hinaus prüfen oder ändern.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Erweitere die Werkzeuge auf alle 10 Gerätegrößen und baue die Prüfung „Erstes Bild“, die die Lage der fünf Pflichtelemente im ersten Bildschirm misst.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js 16.3.6, React 19 und Tailwind 4 gebaut und wird über Vercel ausgeliefert.
2. Die Seite hat 170 Adressen: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Ziel dieses Laufs ist eine Seite, die jeder Laie ohne Hilfe versteht; Prüfstein ist eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will.
4. Echte Fotos, eine durchgehende Geschichte, ein Intro mit sich zeichnendem Logo und ein Seitenwechsel, bei dem sich Fliesen verlegen, heben die Gestaltung auf Award-Niveau.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.
(Fassung aus STATUS.md bis KERN v3; wortgleich in allen E0-Paketen.)

## 5. Kern-Auszug
- K-004 Stack und Konventionen (Auszug): Prüfwerkzeuge liegen nur in `_werkstatt/werkzeuge` mit eigener `package.json`; ihre `node_modules` liegen außerhalb des Repos im Scratchpad (Symlink). Jeder Browserlauf geht über `installSperre()` aus `lib.mjs` (Formulare nur an Attrappen, Dritt-Hosts gesperrt, G5). Nichts erkennt Prüfwerkzeuge, um sich anders zu verhalten (G7).
- K-013 Geräte und Budgets (Auszug): Gerätegrößen stehen in `_werkstatt/HAUPTANSICHTEN.json` unter `geraete` (10 Größen: m360 360×740, m390 390×844, m430 430×932, q844 844×390, t768 768×1024, t1024 1024×768, d1280 1280×800, d1440 1440×900, d1920 1920×1080, d2560 2560×1440). Budgets mobil, Median aus drei Läufen: LCP ≤ 2,5 s, CLS ≤ 0,1, TBT/INP ≤ 200 ms, Lighthouse mobil Leistung ≥ 90, Zugänglichkeit ≥ 95, Best Practices ≥ 95, SEO 100.
- K-014 Adressen (Auszug): Jede Adresse liefert 200 oder eine dauerhafte Weiterleitung; je Seite genau eine H1, Titel, Beschreibung, Canonical; strukturierte Daten gültig.

## 6. Maßstab
Auftrag Abschnitt 6 („Erstes Bild“) und 10 (Handy quer ≤ ein Viertel der Höhe); Muster für Aufbau und Stil: `_werkstatt/werkzeuge/einzelbild.mjs` und `ueberlappung.mjs`.

## 7. Grenzen
- Nur die Dateien unter „Schreibrechte“ ändern oder anlegen; alles andere nur lesen. Fehler in fremden Dateien unter GEMEINSAME DATEIEN melden, nie beheben.
- Nie committen, nie pushen, nie `git checkout`/`reset`/`stash` im Repo. Nie Dateien unter `src/`, `public/`, `test/`, `next.config.ts` oder die `package.json` der Wurzel ändern.
- Keine `.env*`-Dateien lesen oder zitieren. Keine echten Formularsendungen, E-Mails, Anrufe oder WhatsApp-Nachrichten. Netzwerk nur für die npm-Registry.
- Ports: 4310 = Produktionsserver (Reinraum), 4320 = Entwicklungsserver. Fremde Prozesse nie beenden; `pkill -f next-server` ist verboten (trifft beide Server).
- Rechenintensives (Build, Lighthouse) nur nacheinander. Große Ausgaben (Bilder, Berichte von Lighthouse, Protokolle) nur nach `$SCRATCH` oder `_werkstatt/cache` (Symlink in den Scratchpad), nie ins Repo außer den genannten Belegdateien.
- Umgebung in jeder Shell: `export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`, `export RELAUNCH_SCRATCH="$SCRATCH"`, `export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.

## 8. Schritte
1. Lies `_werkstatt/werkzeuge/lib.mjs`, `_werkstatt/werkzeuge/bildsatz.mjs`, `_werkstatt/werkzeuge/einzelbild.mjs`, `_werkstatt/werkzeuge/ueberlappung.mjs` und `_werkstatt/werkzeuge/abschnitte.mjs` sowie `_werkstatt/HAUPTANSICHTEN.json`.
2. **Gerätegrößen:** Ergänze in `lib.mjs` alle 10 Geräte aus `HAUPTANSICHTEN.json` (`geraete`) als Ansichten mit denselben Schlüsseln (m360, m390, m430, q844, t768, t1024, d1280, d1440, d1920, d2560). `isMobile` und `hasTouch` = true für m*, q*, t*; false für d*. Alte Schlüssel (m375 usw.) bleiben erhalten. Exportiere `GERAETE_ALLE` (Liste der 10 Schlüssel in obiger Reihenfolge). `bildsatz.mjs` und `einzelbild.mjs` nehmen `--geraete alle|<kommaliste>` an; Standard für `bildsatz.mjs` ist `alle`.
3. **Neues Werkzeug `_werkstatt/werkzeuge/erstesbild.mjs`** (Prüfung „Erstes Bild“, Auftrag Abschnitt 6): Aufruf `node erstesbild.mjs --satz <name> (--hauptansichten | --seiten /a,/b) [--geraete alle|liste] [--ziel DIR] [--bilder] [--probe]`. Je Seite und Gerät ein frischer Kontext (Viewport, isMobile, hasTouch, deviceScaleFactor 1, reducedMotion no-preference, locale de-DE), `installSperre()`, Warten mit `bereit()`. Zwei Durchgänge: **erstbesuch** (Einwilligungsbanner sichtbar, wie ein neuer Besucher) und **nach-einwilligung** (Einwilligung per `setzeEinwilligung` abgelehnt gesetzt). Gesucht werden fünf Pflichtelemente, zuerst über Datenattribute, sonst über Ersatzregeln:
   - logo: `[data-erstes-bild="logo"]`, sonst `header a[href="/"] img`, sonst `header img[alt*="Tezgel"]`;
   - ueberschrift: `[data-erstes-bild="ueberschrift"]`, sonst die erste `h1`;
   - ort: `[data-erstes-bild="ort"]`, sonst das erste sichtbare Textelement im Ausschnitt, dessen Text `/Aßlar|Wetzlar|Gießen|Mittelhessen|Lahn-Dill|Hessen/` enthält (gefundenen Text mitschreiben);
   - hauptknopf: `[data-erstes-bild="hauptknopf"]`, sonst das erste sichtbare `a` oder `button` mit Text `/anfragen|Termin|Aufmaß/i`;
   - kontakt: `[data-erstes-bild="kontakt"]`, sonst `a[href^="tel:"]`, `a[href*="wa.me"]` oder `a[href*="whatsapp"]`.
   „Vollständig sichtbar“ heißt: Rechteck liegt ganz im Ausschnitt (0 ≤ links, 0 ≤ oben, rechts ≤ Breite, unten ≤ Höhe), Breite und Höhe > 0, berechnet sichtbar (visibility, opacity > 0, display), und `document.elementFromPoint` liefert an fünf Punkten (Mitte und vier um 2 px nach innen versetzte Ecken) das Element selbst oder ein Kind. Sonst Ursache melden: `fehlt`, `unter-dem-falz`, `abgeschnitten`, `verdeckt-durch <Selektor>`. Zusätzlich für Querformat (Höhe < Breite und Höhe ≤ 500): Summe der Höhen aller festen oder klebenden Elemente am oberen und unteren Rand ≤ 25 % der Höhe (Wert melden).
   Ausgabe: `<ziel>/erstes-bild.json` (je Seite, Gerät, Durchgang und Element: gefunden, sichtbar, Ursache, Rechteck, Selektor) und eine Kurztabelle auf stdout (Seite × Gerät: Zahl der bestandenen Elemente von 5, Querformat-Anteil). Standard-Ziel `_werkstatt/belege/<satz>`. `--bilder` legt je Fall ein JPEG des ersten Bildschirms nach `<ziel>/bilder/`.
4. **Positivprobe:** Lege `_werkstatt/werkzeuge/tests-logik/erstesbild-probe.html` an: Logo und H1 sichtbar, Ort sichtbar, Hauptknopf durch `margin-top: 2000px` unter den Falz geschoben, Telefonlink von einem festen Element überdeckt. `--probe` lädt die Datei per `page.setContent` (ohne Server) auf m390 und muss genau melden: logo ok, ueberschrift ok, ort ok, hauptknopf `unter-dem-falz`, kontakt `verdeckt-durch`. Exit-Code 0 nur, wenn genau das herauskommt.
5. **Rauchlauf:** `node erstesbild.mjs --satz e0-rauch --seiten /,/kontakt --geraete alle --ziel "$SCRATCH/E0-PRUEF-02a"` gegen 4310. Tabelle in den Bericht. Nichts am Produkt deuten; nur berichten.
6. Probe- und Rauchläufe schreiben ihre Ausgaben mit `--ziel "$SCRATCH/<Kennung>"` in den Scratchpad, nie nach `_werkstatt/belege/`.

## 9. Schnellprüfung und Selbstprüfung
- `node --check` für jede geänderte oder neue .mjs-Datei; `node erstesbild.mjs --probe` Exit 0.
- `node einzelbild.mjs --seite / --ansichten q844 --ziel "$SCRATCH/E0-PRUEF-02a/einzel"` erzeugt ein Bild (neue Ansicht greift).
- Selbstprüfung: `git -C /home/user/tezgel status --porcelain` zeigt nur Dateien aus deinen Schreibrechten (dazu ggf. `AGENTS.md`, siehe Schritte, und den Symlink `_werkstatt/werkzeuge/node_modules`). Alle Mengen gezählt, alle offenen Punkte gelistet.

## 10. Ausgabeformular
Schreibe deinen Bericht nach `_werkstatt/pakete/E0-PRUEF-02a.rueckgabe.md` UND gib ihn als letzte Antwort zurück, höchstens 600 Wörter, mit genau diesen Überschriften:
GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Letzte Zeile genau: `=== ENDE E0-PRUEF-02a · BEREIT ZUR RÜCKGABE ===`
