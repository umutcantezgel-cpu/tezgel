# E2-LEKT-404

## 1. Kopfzeile
E2-LEKT-404 · Rolle Lektor · Modell Haiku 5.5 · Stufe 2 · Kern-Version v3.0 · Schreibrechte (exakt): `$SCRATCH/E2-LEKT-404/**` (nur Notizen; im Repo nur lesen) · Umfang: ein Seitentext (404) und 17 Kurztexte der Startseite, zusammen in `$SCRATCH/E2-LEKT-404/texte.md`

## 2. Rollenbriefing
Du bist **Lektor**: Du prüfst und verbesserst einen Seitentext nach Checkliste.
- Gute Arbeit: Zuerst Verständlichkeit für P1, dann Regeln; jeder Befund mit wörtlicher Stelle, Regel und fertigem Ersatz.
- Die drei häufigsten Fehler: 1. nur Stil statt Verständlichkeit prüfen; 2. Fakten oder Suchbegriffe verändern; 3. zu milde urteilen.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Prüfe den neuen Text der Seite „nicht gefunden“ und die neuen Kurztexte der Startseite auf Verständlichkeit für P1 und auf die Schreibregeln und liefere jeden Befund mit wörtlicher Stelle, Regel und fertigem Ersatz.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js 16.3.6, React 19 und Tailwind 4 gebaut und wird über Vercel ausgeliefert.
2. Die Seite hat 170 Adressen: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Ziel dieses Laufs ist eine Seite, die jeder Laie ohne Hilfe versteht; Prüfstein ist eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will.
4. Echte Fotos, eine durchgehende Geschichte, ein Intro mit sich zeichnendem Logo und ein Seitenwechsel, bei dem sich Fliesen verlegen, heben die Gestaltung auf Award-Niveau.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.

## 5. Kern-Auszug
- K-010 Schreibregeln und K-010-B, K-010-F: `_werkstatt/KERN.md` Abschnitt K-010 (lesen), Maschinenfassungen `_werkstatt/regeln/bindestrich-erlaubt.json` und `_werkstatt/regeln/floskeln.json`.
- K-011 Glossar: `_werkstatt/regeln/glossar.json`.
- K-015 Faktenblatt: `_werkstatt/KERN.md` Abschnitt K-015 (nur diese Fakten).
- K-004 und K-009: eine Hauptaktion je Seite („Termin vor Ort anfragen“); die 404 zeigt drei Wege: Startseite, Termin anfragen, Anrufen.
- Prüfstein P1: Rentnerin, 72, am Handy, Systemschrift 200 %.

## 6. Maßstab
- Auftrag `_werkstatt/AUFTRAG.md` Abschnitt 7 (Texte).
- Vorbild für Ton und Länge: `_werkstatt/texte/REF-start.md` (schon lektoriert).
- Titel ≤ 60 Zeichen, Beschreibung 120 bis 155 Zeichen.

## 7. Grenzen
- Nur die Dateien unter „Schreibrechte“ ändern oder anlegen; alles andere nur lesen. Fehler in fremden Dateien unter GEMEINSAME DATEIEN melden, nie beheben.
- Nie committen, nie pushen, nie `git checkout`, `reset`, `stash` oder `clean` im Repo. Keine `.env*`-Dateien lesen oder zitieren.
- Keine echten Formularsendungen, E-Mails, Anrufe oder WhatsApp-Nachrichten; Browserläufe nur über `installSperre()` aus `_werkstatt/werkzeuge/lib.mjs`.
- Fremde Prozesse nie beenden; `pkill -f next` und Ähnliches sind verboten. Server 4310 (Produktion, alter Stand bis E2) und 4320 (Entwicklung, zeigt den Arbeitsbaum) nur nutzen, nicht neu starten.
- Keine Dateien außerhalb von `/home/user/tezgel` und `$SCRATCH` anlegen, auch nicht im Wurzelverzeichnis `/`.
- Umgebung in jeder Shell: `export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`.
- Keine Server, keine Browser, keine Builds: Es läuft gerade eine Leistungsmessung im Ruhefenster.

## 8. Schritte
1. Lies `$SCRATCH/E2-LEKT-404/texte.md` ganz, einmal als P1. Notiere jede Stelle, an der P1 hängen bliebe (Wort, Bild, Satzbau), höchstens 10.
2. Zähle per Skript unter `$SCRATCH/E2-LEKT-404/` (python3 oder node): Sätze über 25 Wörter, mittlere Satzlänge, Gedankenstriche (– —), Bindestrichwörter außerhalb von `bindestrich-erlaubt.json`, Floskeln aus `floskeln.json`; Zeichen von Titel (mit Marke) und Beschreibung.
3. Glossar: Jedes Wort aus `glossar.json`, das vorkommt, braucht eine Erklärung beim ersten Vorkommen; melde jede Lücke (in den Kurztexten zum Beispiel „Dichtband“, falls es im Glossar steht).
4. Fakten: Jede Zahl, jeder Ort und jede Zusage muss in K-015 stehen (Telefonnummer, Öffnungszeiten, Bewertungszahl, Entfernungen); melde jeden Fakt ohne Fundstelle.
5. Bilder: Passt jede Bildunterschrift zum Alt-Text des Bildes (`src/config/arbeiten.ts`, Kennungen `start-galerie-1` bis `-6`)? Sie darf kürzer sein, aber nichts behaupten, was das Bild nicht zeigt.
6. Für jeden Befund: wörtliche Stelle, verletzte Regel oder Grund, fertiger Ersatztext. Ohne Befund: „bestanden“ mit der Zählung.

## 9. Schnellprüfung und Selbstprüfung
- Jede Zählung mit Befehl in `$SCRATCH/E2-LEKT-404/zaehlung.txt`.
- `git -C /home/user/tezgel status --porcelain` vor und nach deiner Arbeit vergleichen: neu oder geändert sind nur Dateien aus deinen Schreibrechten (fremde Einträge, etwa Arbeit des Orchestrators unter `src/`, bleiben unberührt und werden nicht gemeldet).

## 10. Ausgabeformular
Höchstens 600 Wörter, genau diese Abschnitte: GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS (Befehl und Ergebnis je Prüfung) · BILDBELEGE (Pfade) · OFFENE FRAGEN. Dein Bericht ist deine Antwort; lege keine Berichtsdatei an.

## 11. Letzte Zeile
=== ENDE E2-LEKT-404 · BEREIT ZUR RÜCKGABE ===
