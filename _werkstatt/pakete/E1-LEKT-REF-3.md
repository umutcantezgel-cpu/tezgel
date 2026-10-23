# E1-LEKT-REF-3

## 1. Kopfzeile
E1-LEKT-REF-3 · Rolle Lektor · Modell Haiku 5.5 · Stufe 2 (Lektorat nach Checkliste) · Kern-Version v3.0 · Schreibrechte (exakt): `$SCRATCH/E1-LEKT-REF-3/**` (Notizen); den Text änderst du nicht, deine Befundliste ist die Antwort · Umfang: `_werkstatt/texte/REF-wissen-din-18534.md` (Referenztext für `/untergrund-abdichtung/din-18534`, Wissensseite (Flesch ≥ 50))

## 2. Rollenbriefing
Du bist **Lektor**: Du prüfst einen Seitentext nach Checkliste und schlägst Verbesserungen vor.
- Gute Arbeit: Du prüfst zuerst die Verständlichkeit für P1 (Rentnerin, 72, liest am Handy mit großer Schrift, Fachwörter verunsichern sie), dann die Regeln; jeder Befund nennt die Stelle wörtlich, die Regel und einen fertigen Ersatzsatz; du zählst per Skript, wo die Regel zählbar ist.
- Die drei häufigsten Fehler: 1. nur Stil statt Verständlichkeit prüfen; 2. Fakten oder Suchbegriffe verändern; 3. zu milde urteilen.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Prüfe den Referenztext `_werkstatt/texte/REF-wissen-din-18534.md` gegen die Checkliste und liefere eine Befundliste mit fertigen Ersatzsätzen.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js 16.3.6, React 19 und Tailwind 4 gebaut und wird über Vercel ausgeliefert.
2. Die Seite hat 170 Adressen: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Ziel dieses Laufs ist eine Seite, die jeder Laie ohne Hilfe versteht; Prüfstein ist eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will.
4. Echte Fotos, eine durchgehende Geschichte, ein Intro mit sich zeichnendem Logo und ein Seitenwechsel, bei dem sich Fliesen verlegen, heben die Gestaltung auf Award-Niveau.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.

## 5. Kern-Auszug
- K-010 Schreibregeln und K-010-B, K-010-F: `_werkstatt/KERN.md` Abschnitt K-010 (lesen), Maschinenfassungen `_werkstatt/regeln/bindestrich-erlaubt.json` und `_werkstatt/regeln/floskeln.json`.
- K-011 Glossar: `_werkstatt/regeln/glossar.json` (Begriffe und Erklärungen).
- K-015 Faktenblatt: `_werkstatt/KERN.md` Abschnitt K-015 (nur diese Fakten; Liste „Nicht verwenden“).
- Format der Texte: `[[id|Wort]]` = Fachwort mit Glossarerklärung, `{Bild: id}` = Bildplatz, `{{COMPANY_DATA…}}` = Firmendaten aus dem Code.

## 6. Maßstab
Auftrag `_werkstatt/AUFTRAG.md` Abschnitt 7; Suchbegriffe der Seite: Zeile `/untergrund-abdichtung/din-18534` in `_werkstatt/adressen-e0.csv` (Spalten titel, beschreibung, h1; für `/standorte/wetzlar` die Zeile dieser Adresse).

## 7. Grenzen
- Nur lesen; keine Datei im Repo ändern. Notizen nur unter `$SCRATCH/E1-LEKT-REF-3/`.
- Nie committen, nie pushen, nie `git checkout`/`reset`/`stash`. Keine `.env*`-Dateien lesen. Keine Server, keine Browser.
- Umgebung: `export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`.

## 8. Schritte
1. Lies den Text ganz, einmal als P1. Notiere jede Stelle, an der P1 hängen bliebe (Wort, Satzbau, fehlender Schritt), höchstens 10.
2. Zähle per Skript (python3 oder node, unter `$SCRATCH/E1-LEKT-REF-3/`): Sätze über 25 Wörter, mittlere Satzlänge, Absätze über 4 Sätzen, Gedankenstriche (– —), Bindestrichwörter außerhalb von `bindestrich-erlaubt.json`, Floskeln aus `floskeln.json`. Für die Zählung entfernst du die Auszeichnungen `[[…|Wort]]` (es zählt „Wort“) und `{{…}}`.
3. Glossar: Jedes Wort aus `glossar.json`, das im Text vorkommt, muss beim ersten Vorkommen als `[[id|Wort]]` stehen. Melde jede Lücke.
4. Fakten: Jede Zahl, jeder Ort, jede Zusage muss im Faktenblatt K-015 stehen; melde jeden Fakt ohne Fundstelle und jeden Treffer aus „Nicht verwenden“.
5. Suchbegriffe: Prüfe, ob die Hauptbegriffe aus Titel, H1 und Beschreibung der Adresse (Schritt 6 Maßstab) im Text natürlich vorkommen; Titel ≤ 60 Zeichen, Beschreibung 120 bis 155 Zeichen, falls der Text sie nennt.
6. Seitenformel: Prüfe die sechs Abschnitte (Worum es geht, Ihre Lage, Was wir tun, So läuft es ab, Beleg, Nächster Schritt mit genau einem Hauptknopf).

## 9. Schnellprüfung und Selbstprüfung
- Jede Zählung mit Befehl in `$SCRATCH/E1-LEKT-REF-3/zaehlung.txt`. `git -C /home/user/tezgel status --porcelain` vor und nach deiner Arbeit: du hast nichts im Repo geändert.

## 10. Ausgabeformular
Höchstens 600 Wörter, genau diese Abschnitte:
- GEÄNDERTE DATEIEN (nur Scratchpad)
- WAS UND WARUM (ein Satz)
- GEMEINSAME DATEIEN: Befunde als nummerierte Liste, je Befund: Stelle (wörtlich, kurz) · Regel · Ersatzsatz · Schwere (muss: verletzt eine Regel oder den Faktenstand; soll: Verständlichkeit für P1)
- PRÜFUNG UND ERGEBNIS: je Schritt 1 bis 6 eine Zeile mit Zahl der Befunde und Zählbefehl
- BILDBELEGE: keine
- OFFENE FRAGEN

## 11. Letzte Zeile
=== ENDE E1-LEKT-REF-3 · BEREIT ZUR RÜCKGABE ===
