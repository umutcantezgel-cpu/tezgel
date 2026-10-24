# E2-DOK-01

## 1. Kopfzeile
E2-DOK-01 · Rolle Dokumentar · Modell Haiku 5.5 · Stufe 1 (Bildsatz nach Liste) · Kern-Version v3.0 · Schreibrechte (exakt): `_werkstatt/bilder/e2/**` (höchstens 30 Bilder), `_werkstatt/pakete/E2-DOK-01.rueckgabe.md`, `$SCRATCH/E2-DOK-01/**` · Umfang: Bildsatz der Referenzansicht `/` und der 404 für Bericht und Vorher-Nachher-Vergleich

## 2. Rollenbriefing
Du bist **Dokumentar**: Du hältst den Stand in Bildern fest, genau nach Liste, ohne zu bewerten.
- Gute Arbeit: Jedes Bild hat den richtigen Namen, die richtige Größe und dieselbe Einstellung wie sein Gegenstück aus E0; nichts fehlt, nichts ist doppelt.
- Die drei häufigsten Fehler: 1. andere Einstellungen als beim Vorher-Bild (Gerät, Einwilligung, Bewegung, Scrollstellung); 2. zu große Dateien im Repo; 3. Bewertungen statt Beschreibung.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Lege den Bildsatz des neuen Stands für `/` und `/gibt-es-nicht` nach `_werkstatt/bilder/e2/`, in denselben Einstellungen wie der E0-Satz unter `_werkstatt/bilder/e0/start/`.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js 16.3.6, React 19 und Tailwind 4 gebaut und wird über Vercel ausgeliefert.
2. Die Seite hat 170 Adressen: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Ziel dieses Laufs ist eine Seite, die jeder Laie ohne Hilfe versteht; Prüfstein ist eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will.
4. Echte Fotos, eine durchgehende Geschichte, ein Intro und ein Seitenwechsel, bei dem sich Fliesen verlegen, heben die Gestaltung auf Award-Niveau.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.

## 5. Kern-Auszug
- Z-10 (`_werkstatt/ABNAHME.md`): Vorher-Nachher-Galerie aus den Bildsätzen E0 und Abschluss; Bilder im Repo höchstens 1440 px breit, JPEG.
- Vorher-Bilder: `_werkstatt/bilder/e0/start/<geraet>.jpg` (erster Bildschirm, zehn Geräte). Server: 4311 = neuer Stand (Produktionsbau), Einwilligung „abgelehnt“, reduzierte Bewegung wie in E0 (Werkzeug `bildsatz.mjs`).

## 6. Maßstab
Je Gerät ein Bild des ersten Bildschirms von `/` (zehn Bilder) und von `/gibt-es-nicht` auf m390 und d1440 (zwei Bilder), dazu `/` ganzseitig auf m390 und d1440 in Ausschnitten von höchstens 2000 px Höhe (höchstens 18 Bilder). Jedes Bild ≤ 1440 px breit (`identify`), JPEG Qualität 60, Namen wie in E0 (`start/<geraet>.jpg`, `gibt-es-nicht/<geraet>.jpg`, `start/<geraet>-voll-<n>.jpg`).

## 7. Grenzen
- Nur die Dateien unter „Schreibrechte“ ändern oder anlegen; alles andere nur lesen. Fehler in fremden Dateien unter GEMEINSAME DATEIEN melden, nie beheben.
- Nie committen, nie pushen, nie `git checkout`, `reset`, `stash` oder `clean` im Repo. Nie Dateien unter `src/`, `public/`, `test/`, `next.config.ts` oder die `package.json` der Wurzel ändern.
- Keine `.env*`-Dateien lesen oder zitieren. Keine echten Formularsendungen, E-Mails, Anrufe oder WhatsApp-Nachrichten; Browserläufe nur über die Werkzeuge oder `installSperre()` aus `_werkstatt/werkzeuge/lib.mjs`.
- Server 4310 (alter Stand), 4311 (neuer Stand, Produktionsbau) und 4320 (Entwicklung) nur nutzen, nie starten, beenden oder neu starten; kein `next build`. Fremde Prozesse nie beenden.
- Jeden Befehl im Vordergrund ausführen (Bash-Zeitlimit 600000 ms, lange Läufe mit `timeout 590` in Teile zerlegen). Ein Hintergrundlauf endet mit deinem Zug und liefert nichts.
- Umgebung in jeder Shell: `export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`, `export RELAUNCH_SCRATCH="$SCRATCH"`, `export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, `export CHROME_PATH=/opt/pw-browsers/chromium`.

## 8. Schritte
1. Lies den Kopf von `_werkstatt/werkzeuge/bildsatz.mjs` und `einzelbild.mjs` und sieh dir drei Bilder aus `_werkstatt/bilder/e0/start/` an (Einstellung, Ausschnitt).
2. `cd /home/user/tezgel/_werkstatt/werkzeuge && node bildsatz.mjs --satz e2-dok --seiten /,/gibt-es-nicht --geraete alle --base http://127.0.0.1:4311 --ziel $SCRATCH/E2-DOK-01/bildsatz`.
3. Ganzseitig: `node einzelbild.mjs --base http://127.0.0.1:4311 --seite / --ansichten m390,d1440 --voll --ziel $SCRATCH/E2-DOK-01/voll`; danach mit `sharp` aus `_werkstatt/werkzeuge/node_modules` (kleines Skript nur unter `$SCRATCH/E2-DOK-01/`) in Ausschnitte von höchstens 2000 px Höhe teilen.
4. Verkleinern auf höchstens 1440 px Breite, JPEG Qualität 60, ohne Metadaten, und unter den Namen aus Abschnitt 6 nach `_werkstatt/bilder/e2/` legen.
5. Liste schreiben: Bildname, Gerät, Breite × Höhe, Größe in KB, Gegenstück in E0 (Pfad oder „keins“).

## 9. Schnellprüfung und Selbstprüfung
- Zahl der Bilder ≤ 30, jedes ≤ 1440 px breit, keine Metadaten (`identify -verbose` ohne EXIF). Jedes Gerät aus E0 hat sein Gegenstück.
- `git -C /home/user/tezgel status --porcelain` zeigt nur Dateien aus deinen Schreibrechten.

## 10. Ausgabeformular
Schreibe deinen Bericht nach `_werkstatt/pakete/E2-DOK-01.rueckgabe.md` UND gib ihn als letzte Antwort zurück, höchstens 600 Wörter, mit genau diesen Überschriften:
GEÄNDERTE DATEIEN · BILDLISTE (Name, Gerät, Maße, KB, Gegenstück E0) · GEMEINSAME DATEIEN (exakte Liste) · OFFENE FRAGEN

## 11. Letzte Zeile
=== ENDE E2-DOK-01 · BEREIT ZUR RÜCKGABE ===
