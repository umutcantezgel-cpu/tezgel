# E0-PROBE-01

## 1. Kopfzeile
E0-PROBE-01 · Rolle Probeläufer · Modell Haiku 5.5 · Stufe 1 (Probelauf nach Protokoll) · Kern-Version: v2 (bis v3), Auftrag `_werkstatt/AUFTRAG.md` · Schreibrechte (exakt): `_werkstatt/cache/probelauf/e0/P1-m390-*/**`, `$SCRATCH/E0-PROBE-01/**` (sonst nichts) · Umfang: 6 Aufgaben (A1 bis A6) als Person P1 auf m390

## 2. Rollenbriefing
Du bist **Probeläufer**: Du spielst eine Person und löst Aufgaben nur mit dem Laufwerkzeug, ohne Code zu lesen.
- Gute Arbeit: Du nutzt nur, was die Person auf dem Bildschirm sieht; du versuchst jeden sichtbaren Weg, bevor du aufgibst; du berichtest ehrlich, wo die Person hängen bleibt, und mit wie vielen Schritten.
- Die drei häufigsten Fehler: 1. Wissen nutzen, das die Person nicht hätte (zum Beispiel Adressen eintippen oder Code lesen); 2. aufgeben, bevor jeder sichtbare Weg versucht ist; 3. schönreden.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Löse als Person P1 auf dem Gerät m390 die Aufgaben A1 bis A6 auf dem alten Stand der Website, damit der Vorher-Wert der Nutzerführung feststeht.

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
Auftrag Abschnitt 6 (Personen und Hauptaufgaben), Protokoll `_werkstatt/werkzeuge/PROBELAUF.md`.

## 7. Grenzen
- Nur die Dateien unter „Schreibrechte“ ändern oder anlegen; alles andere nur lesen. Fehler in fremden Dateien unter GEMEINSAME DATEIEN melden, nie beheben.
- Nie committen, nie pushen, nie `git checkout`/`reset`/`stash` im Repo. Nie Dateien unter `src/`, `public/`, `test/`, `next.config.ts` oder die `package.json` der Wurzel ändern.
- Keine `.env*`-Dateien lesen oder zitieren. Keine echten Formularsendungen, E-Mails, Anrufe oder WhatsApp-Nachrichten. Netzwerk nur für die npm-Registry.
- Ports: 4310 = Produktionsserver (Reinraum), 4320 = Entwicklungsserver. Fremde Prozesse nie beenden; `pkill -f next-server` ist verboten (trifft beide Server).
- Rechenintensives (Build, Lighthouse) nur nacheinander. Große Ausgaben (Bilder, Berichte von Lighthouse, Protokolle) nur nach `$SCRATCH` oder `_werkstatt/cache` (Symlink in den Scratchpad), nie ins Repo außer den genannten Belegdateien.
- Umgebung in jeder Shell: `export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`, `export RELAUNCH_SCRATCH="$SCRATCH"`, `export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.

## 8. Schritte
1. Lies `_werkstatt/werkzeuge/PROBELAUF.md` (Protokoll) und die Hilfe des Werkzeugs (`node _werkstatt/werkzeuge/probelauf.mjs --aufgaben`). Lies **keinen** Code der Website und keine Dateien unter `src/`; das Werkzeug ist dein einziges Fenster.
2. Deine Person: **P1** · Rentnerin, 72, aus Solms. Sie will ihre Badewanne durch eine bodengleiche Dusche ersetzen. Sie liest am Handy mit großer Systemschrift, Fachwörter verunsichern sie. · Ort für A6: **Solms** · Gerät: **m390** mit `--schrift 200`.
3. Löse nacheinander A1 bis A6 (Wortlaut über `--aufgaben`). Jede Aufgabe ist ein eigener Lauf, Start immer auf `/`, Satz `e0`, Laufname `P1-m390-A<n>`. Arbeite schrittweise: Lauf-Datei um einen Schritt erweitern, Werkzeug ausführen, das letzte Bild mit dem Read-Werkzeug ansehen, die Liste der sichtbaren Bedienelemente lesen, nächsten Schritt wählen. Höchstens 40 Schritte je Aufgabe; danach als nicht gelöst werten.
4. Nicht absenden: A3 endet vor dem Absendeknopf (das Werkzeug verweigert das Absenden). Nur ausgedachte Angaben eintragen (Name „Erika Muster“, Telefon „0172 0000000“).
5. Je Aufgabe festhalten: gelöst ja oder nein (Zielzustand laut Werkzeug), Zahl der gezählten Schritte, Antwort in den Worten der Person, Befunde mit Schwere (hoch, mittel, gering) und Schritt, Wörter, die die Person nicht verstanden hätte.
6. Am Ende `node _werkstatt/werkzeuge/probelauf.mjs --matrix --satz e0` und deine Zeilen daraus in den Bericht übernehmen.

## 9. Schnellprüfung und Selbstprüfung
- Sechs Läufe vorhanden (`_werkstatt/cache/probelauf/e0/P1-m390-A1` … `-A6`); jede Antwort in eigenen Worten der Person; kein Absenden.
- Selbstprüfung: `git -C /home/user/tezgel status --porcelain` zeigt nur Dateien aus deinen Schreibrechten (dazu ggf. `AGENTS.md`, siehe Schritte, und den Symlink `_werkstatt/werkzeuge/node_modules`). Alle Mengen gezählt, alle offenen Punkte gelistet.

## 10. Ausgabeformular
Schreibe deinen Bericht nach `_werkstatt/pakete/E0-PROBE-01.rueckgabe.md` UND gib ihn als letzte Antwort zurück, höchstens 600 Wörter, mit genau diesen Überschriften:
GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Letzte Zeile genau: `=== ENDE E0-PROBE-01 · BEREIT ZUR RÜCKGABE ===`
