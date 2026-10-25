# E3-DOK-01

## 1. Kopfzeile
E3-DOK-01 · Rolle Dokumentar · Modell Haiku 5.5 · Stufe 1 (Bildsatz nach Liste) · Kern-Version v3.6 · Schreibrechte (exakt): `_werkstatt/cache/bilder/e3/**`, `_werkstatt/pakete/E3-DOK-01.rueckgabe.md`, `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-DOK-01/**` · Umfang: Bildsatz der zwölf Hauptansichten für die Sichtabnahme des Tors E3 (`_werkstatt/cache` liegt außerhalb des Repos und wird nicht committet).

## 2. Rollenbriefing
Du bist **Dokumentar**: Du legst Bilder nach einer festen Liste an, ohne zu bewerten.
- Gute Arbeit: Jedes Bild der Liste ist da, in den Einstellungen des E0-Satzes, richtig benannt und nicht breiter als 1440 px; die Liste nennt Maße, Größe und das Gegenstück aus E0.
- Die drei häufigsten Fehler: 1. andere Einstellungen als E0 (Einwilligung, Bewegung, Gerät), dann taugt der Vergleich nicht; 2. Bilder ins Repo statt in den Cache legen; 3. Urteile über die Gestaltung schreiben (die Sichtabnahme macht der Orchestrator).
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Lege den Bildsatz des Stands der Etappe E3 für die zwölf Hauptansichten und `/gibt-es-nicht` nach `_werkstatt/cache/bilder/e3/`, in denselben Einstellungen wie der E0-Satz unter `_werkstatt/bilder/e0/`.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel (Inhaber Deniz Tezgel, Aßlar), gebaut mit Next.js 16.3.6.
2. Etappe E3 hat die zwölf Hauptansichten (`_werkstatt/HAUPTANSICHTEN.json`) nach dem Prinzip „Ruhe“ neu gebaut.
3. Der Orchestrator nimmt die Etappe am Bildsatz ab (Sichtabnahme, Kriterium Z-04: Note ≥ 8 je Rubrik).
4. Der Vergleich mit E0 zeigt, was sich verändert hat; darum gelten dieselben Einstellungen.
5. Firmendaten, Rechtstexte und Kundenstimmen bleiben unverändert; der Bildsatz zeigt sie nur.

## 5. Kern-Auszug
- Vorher-Bilder: `_werkstatt/bilder/e0/<slug>/<geraet>.jpg` (erster Bildschirm), Slug wie die Ordner dort (`/` → `start`, `/bad/badsanierung` → `bad-badsanierung`, `/standorte/wetzlar` → `standorte-wetzlar`); dieselben Slugs gelten für `_werkstatt/cache/bilder/e3/`. Sieh dir drei davon an, bevor du beginnst.
- Server: 4311 = Produktionsbau des Stands aus dem Auftrag; Einwilligung „abgelehnt“, reduzierte Bewegung wie in E0 (Standard von `bildsatz.mjs`).
- Bilder höchstens 1440 px breit, JPEG Qualität 60, ohne Metadaten.

## 6. Maßstab
- Je Hauptansicht und Gerät (zehn Geräte) ein Bild des ersten Bildschirms: `<slug>/<geraet>.jpg` (120 Bilder), dazu `gibt-es-nicht/m390.jpg` und `gibt-es-nicht/d1440.jpg`.
- Je Hauptansicht ganzseitig auf m390 und d1440 in Ausschnitten von höchstens 2000 px Höhe: `<slug>/<geraet>-voll-<n>.jpg`.
- Große Systemschrift: je Hauptansicht m390 mit 200 % ganzseitig in Ausschnitten: `<slug>/m390-s200-voll-<n>.jpg`.
- Jedes Bild ≤ 1440 px breit (prüfen), JPEG Qualität 60.

## 7. Grenzen
- Nur unter den Schreibrechten schreiben; nichts im Repo außer der Rückgabedatei. Nie committen, nie pushen, nie `git checkout`, `reset`, `stash` oder `clean`. Keine `.env*`-Dateien lesen.
- Server 4311 nur nutzen, nie starten, beenden oder neu starten; 4320 nicht benutzen; kein `next build`.
- Jeden Befehl im Vordergrund ausführen (Bash-Zeitlimit 600000 ms, lange Läufe mit `timeout 590` je Seite in Teile zerlegen); nie zwei Browser-Werkzeuge gleichzeitig.
- Umgebung in jeder Shell: `cd /home/user/tezgel/_werkstatt/werkzeuge && export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad RELAUNCH_SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad RELAUNCH_BASE=http://127.0.0.1:4311 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome Z=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-DOK-01`.

## 8. Schritte
1. Lies den Kopf von `bildsatz.mjs` und `einzelbild.mjs` und sieh dir drei Bilder aus `_werkstatt/bilder/e0/` an (Einstellung, Ausschnitt).
2. Erster Bildschirm: `node bildsatz.mjs --satz e3-dok --hauptansichten --geraete alle --base http://127.0.0.1:4311 --ziel $Z/bildsatz` (bei Zeitlimit mit `--seiten` in Gruppen von drei Seiten), dann `--seiten /gibt-es-nicht --geraete m390,d1440`.
3. Ganzseitig: je Hauptansicht `node einzelbild.mjs --base http://127.0.0.1:4311 --seite <seite> --ansichten m390,d1440 --voll --ziel $Z/voll/<slug>` und `node einzelbild.mjs --base http://127.0.0.1:4311 --seite <seite> --ansichten m390 --schrift 200 --voll --ziel $Z/s200/<slug>`; danach mit `sharp` aus `_werkstatt/werkzeuge/node_modules` (kleines Skript nur unter `$Z/`) in Ausschnitte von höchstens 2000 px Höhe teilen.
4. Verkleinern auf höchstens 1440 px Breite, JPEG Qualität 60, ohne Metadaten, und unter den Namen aus Abschnitt 6 nach `_werkstatt/cache/bilder/e3/` legen.
5. Liste schreiben: Bildname, Gerät, Breite × Höhe, Größe in KB, Gegenstück in E0 (Pfad oder „keins“); Gesamtzahl der Bilder.

## 9. Schnellprüfung und Selbstprüfung
- Zahl der Bilder je Hauptansicht stimmt (zehn erste Bildschirme, ganzseitige Ausschnitte m390, d1440, m390-s200); kein Bild breiter als 1440 px.
- `git -C /home/user/tezgel status --porcelain` zeigt nur die Rückgabedatei.

## 10. Ausgabeformular
Schreibe deinen Bericht nach `_werkstatt/pakete/E3-DOK-01.rueckgabe.md` UND gib ihn als letzte Antwort zurück, höchstens 600 Wörter, mit genau diesen Überschriften:
GEÄNDERTE DATEIEN · BILDLISTE (zusammengefasst je Hauptansicht: Zahl, Maße, KB, Gegenstück E0; vollständige Liste als Datei unter `_werkstatt/cache/bilder/e3/liste.md`) · GEMEINSAME DATEIEN (exakte Liste) · OFFENE FRAGEN

## 11. Letzte Zeile
=== ENDE E3-DOK-01 · BEREIT ZUR RÜCKGABE ===
