# E0-PRUEF-02c

## 1. Kopfzeile
E0-PRUEF-02c · Rolle Prüfer · Modell Haiku 5.5 · Stufe 1 (Werkzeug und Messung nach Checkliste) · Kern-Version: v2 (bis v3), Auftrag `_werkstatt/AUFTRAG.md` · Schreibrechte (exakt): `_werkstatt/werkzeuge/adressen.mjs` (neu), `_werkstatt/adressen-e0.csv` (neu), `_werkstatt/belege/e0/links.json` (neu), `_werkstatt/belege/e0/adressen-zusammenfassung.md` (neu), `$SCRATCH/E0-PRUEF-02c/**` · Umfang: ein Werkzeug, eine Positivprobe, ein vollständiger Durchlauf aller Adressen (rund 170 plus Weiterleitungen und 410-Adressen)

## 2. Rollenbriefing
Du bist **Prüfer**: Du richtest Werkzeuge ein, führst die Prüfungen deiner Stufe aus und berichtest knapp mit Belegpfaden.
- Gute Arbeit: Jede Aussage ist mit einem Befehl und seiner Ausgabe belegt; neue Werkzeuge haben eine Positivprobe, die zeigt, dass sie einen bekannten Fehler wirklich finden; Messungen sind Mediane, keine Einzelwerte.
- Die drei häufigsten Fehler: 1. Einzelmessung statt Median; 2. deuten statt berichten; 3. über die eigene Stufe hinaus prüfen oder ändern.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Baue den Adress- und Linkprüfer und erhebe damit `_werkstatt/adressen-e0.csv`, den Ausgangswert aller Adressen.

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
Auftrag Abschnitt 11 (K-014). Gutachten: `_werkstatt/berichte/E0-KUND-06.md` (Weiterleitungen, 410-Liste, Sitemap, Canonical).

## 7. Grenzen
- Nur die Dateien unter „Schreibrechte“ ändern oder anlegen; alles andere nur lesen. Fehler in fremden Dateien unter GEMEINSAME DATEIEN melden, nie beheben.
- Nie committen, nie pushen, nie `git checkout`/`reset`/`stash` im Repo. Nie Dateien unter `src/`, `public/`, `test/`, `next.config.ts` oder die `package.json` der Wurzel ändern.
- Keine `.env*`-Dateien lesen oder zitieren. Keine echten Formularsendungen, E-Mails, Anrufe oder WhatsApp-Nachrichten. Netzwerk nur für die npm-Registry.
- Ports: 4310 = Produktionsserver (Reinraum), 4320 = Entwicklungsserver. Fremde Prozesse nie beenden; `pkill -f next-server` ist verboten (trifft beide Server).
- Rechenintensives (Build, Lighthouse) nur nacheinander. Große Ausgaben (Bilder, Berichte von Lighthouse, Protokolle) nur nach `$SCRATCH` oder `_werkstatt/cache` (Symlink in den Scratchpad), nie ins Repo außer den genannten Belegdateien.
- Umgebung in jeder Shell: `export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`, `export RELAUNCH_SCRATCH="$SCRATCH"`, `export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.

## 8. Schritte
1. Lies `_werkstatt/werkzeuge/lib.mjs` (nur importieren), `src/app/sitemap.ts`, `src/lib/wege.ts`, `src/proxy.ts` und die `redirects()` in `next.config.ts` (nur lesen).
2. **Werkzeug `_werkstatt/werkzeuge/adressen.mjs`**: Aufruf `node adressen.mjs --satz <name> [--ziel DIR] [--csv DATEI] [--probe]`, nur gegen lokalen Server (`assertLocal`). Ohne Browser, mit `fetch` und `redirect: 'manual'`.
   - Adressmenge = Sitemap (`BASE/sitemap.xml`) ∪ alle internen Links, die beim Durchlauf aller Seiten gefunden werden (Breitensuche, Ziel ohne `#…`, gleiche Herkunft, ohne `/api/`, ohne Dateien unter `/_next/`) ∪ die Quellen der Weiterleitungen aus `next.config.ts` ∪ die 410-Adressen aus `src/lib/wege.ts` (per regulärem Ausdruck aus den Dateien gelesen; Muster mit Platzhaltern als Beispieladresse auflösen und markieren).
   - Je Adresse: Status, Ziel bei 3xx (Location), bei 200 aus dem HTML: `<title>`, `meta name=description`, Zahl der `h1` und Text der ersten (Tags entfernt), `link rel=canonical` (absolut und gleich der Adresse ohne Abschlussschrägstrich?), `meta name=robots`, alle `script type=application/ld+json`: JSON parsebar ja oder nein, `@context` vorhanden, Liste der `@type` (auch verschachtelt, auch in `@graph`); `in_sitemap` ja oder nein; Zahl der eingehenden internen Links.
   - Kaputte interne Links: jeder interne Link, dessen Ziel 4xx oder 5xx liefert, mit Quelle, Ziel und Status; Links auf absichtlich entfernte Adressen (410) getrennt ausweisen.
   - Ausgabe CSV (Semikolon, UTF-8): `adresse;status;ziel;titel;titel_laenge;beschreibung;beschreibung_laenge;h1_anzahl;h1;canonical;canonical_ok;robots;jsonld_gueltig;jsonld_typen;in_sitemap;eingehende_links;quelle` (quelle = sitemap, link, weiterleitung oder wege). Standard `--csv _werkstatt/adressen-<satz>.csv`. Dazu `<ziel>/links.json` (kaputte Links) und `<ziel>/adressen-zusammenfassung.md` (Zahlen: Adressen gesamt, 200, 308, 404, 410, andere; Seiten mit H1-Zahl ≠ 1; ohne Canonical oder Canonical abweichend; Titel > 60; Beschreibung außerhalb 120 bis 155; JSON-LD ungültig; kaputte interne Links). Standard-Ziel `_werkstatt/belege/<satz>`.
3. **Positivprobe:** `--probe` startet einen winzigen eigenen HTTP-Server auf einem freien Port mit 4 Seiten (eine mit zwei H1, eine mit kaputtem Link auf `/fehlt`, eine 308-Weiterleitung, eine mit ungültigem JSON-LD) und muss genau diese Befunde melden. Exit 0 nur dann.
4. **E0-Lauf (echt, das ist der Ausgangswert K-014):** `node adressen.mjs --satz e0` gegen 4310. Erzeugt `_werkstatt/adressen-e0.csv`, `_werkstatt/belege/e0/links.json` und `_werkstatt/belege/e0/adressen-zusammenfassung.md`. Berichte die Zahlen aus der Zusammenfassung vollständig.
5. Nichts deuten oder reparieren; Auffälligkeiten nur auflisten.

## 9. Schnellprüfung und Selbstprüfung
- `node --check _werkstatt/werkzeuge/adressen.mjs`; `node adressen.mjs --probe` Exit 0; Zeilenzahl der CSV gleich der Zahl der Adressen in der Zusammenfassung.
- Selbstprüfung: `git -C /home/user/tezgel status --porcelain` zeigt nur Dateien aus deinen Schreibrechten (dazu ggf. `AGENTS.md`, siehe Schritte, und den Symlink `_werkstatt/werkzeuge/node_modules`). Alle Mengen gezählt, alle offenen Punkte gelistet.

## 10. Ausgabeformular
Schreibe deinen Bericht nach `_werkstatt/pakete/E0-PRUEF-02c.rueckgabe.md` UND gib ihn als letzte Antwort zurück, höchstens 600 Wörter, mit genau diesen Überschriften:
GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Letzte Zeile genau: `=== ENDE E0-PRUEF-02c · BEREIT ZUR RÜCKGABE ===`
