GEÄNDERTE DATEIEN (nur Scratchpad)
- /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E1-LEKT-REF-4/zaehlung.py
- /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E1-LEKT-REF-4/zaehlung.txt
- /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E1-LEKT-REF-4/amstad.py
- /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E1-LEKT-REF-4/status-vor.txt und status-nach.txt
- Repo-Hinweis: `git status` unterscheidet sich nach meiner Arbeit. Die neuen Dateien (`_werkstatt/belege/e0/erstes-bild.json`, `_werkstatt/pakete/E0-PROBE-*.rueckgabe.md`, `E1-LEKT-REF-*.rueckgabe.md`, `E2-TEST-04.md`) stammen nicht von mir. Ich habe nichts im Repo geschrieben.

WAS UND WARUM (ein Satz)
Der Referenztext für `/standorte/wetzlar` hat für Laien mehrere Stellen mit Fachwörtern und verschachtelten Sätzen, außerdem fehlen Suchbegriffe im Fließtext und die Seitenformel ist in Abschnitt 1 überladen; die Fakten stimmen bis auf den Landkreis.

GEMEINSAME DATEIEN
1. „Ob neues Bad, neuer Boden oder ein Balkon, auf dem Wasser steht: Wir kommen zu Ihnen …“ (Abschnitt 2) · Regel: P1 (unklare Wendung, Doppelpunkt-Satz mit 23 Wörtern), K-010 Ton · Ersatz: „Haben Sie ein neues Bad, einen neuen Boden oder einen Balkon, der nicht mehr dicht ist? Dann kommen wir zu Ihnen nach Wetzlar und sehen uns alles an.“ · Schwere: soll
2. Abschnitt 1 hat drei Sätze: „Wetzlar liegt direkt neben …“ · „Ja, wir arbeiten in Wetzlar und im Lahn-Dill-Kreis.“ · „Wir erneuern Bäder …“ · Regel: K-009 Seitenformel („ein bis zwei Sätze“); das „Ja“ beantwortet die Frage erst in Abschnitt 2 · Ersatz: Abschnitt 1 nur „Wir machen Badsanierung und Fliesenverlegung. Balkone machen wir dicht.“ Unter der H2 in Abschnitt 2 als ersten Absatz: „Ja, wir arbeiten in Wetzlar und im Lahn-Dill-Kreis. Wetzlar liegt direkt neben unserem Betrieb in Aßlar.“ · Schwere: muss
3. „Untergrund und Abdichtung“ (Abschnitt 3, Leistungslink) · Regel: K-011 Glossar, erstes Vorkommen als `[[id|Wort]]`; der Text hat 0 Markierungen · Ersatz: „[[untergrund|Untergrund]] und [[abdichtung|Abdichtung]]“ · Schwere: muss
4. Fließtext nennt weder „Badsanierung“ noch „Fliesenverlegung“ (nur in der Meta-Zeile und im Titel) · Regel: K-010 „Suchbegriffe aus adressen-e0.csv bleiben natürlich im Text“; Maßstab ist die E0-Zeile mit H1 „Fliesenverlegung & Badsanierung in Wetzlar“ · Ersatz: siehe Befund 2 (Abschnitt 1) · Schwere: muss. Optional: „DIN 18534“ aus der E0-Beschreibung fehlt; als Ergänzung „Wir dichten nach [[din-18534|DIN 18534]] ab, damit kein Wasser in Wand und Boden dringt.“ (soll)
5. Meta „Wetzlar: 48 Zeichen“ bei Titel · Regel: Zählangabe · Zählung: 49 Zeichen (`Fliesenleger in Wetzlar | Fliesenverlegung Tezgel`), Grenze 60 eingehalten · Ersatz: „(Wetzlar: 49 Zeichen)“ · Schwere: soll. Beschreibung mit 131 Zeichen stimmt.
6. „im Lahn-Dill-Kreis“ · Regel: K-015 Faktenstand (jeder Ort und Region braucht eine Fundstelle); K-015 nennt keine Landkreise · Fundstelle nur `src/config/cities.ts:16` · Ersatz: K-015 um die Landkreis-Angabe (F-09) ergänzen oder den Satz ohne Landkreis formulieren · Schwere: muss

PRÜFUNG UND ERGEBNIS
- Schritt 1 (P1-Lesung): 3 Stellen, die P1 hängen lassen (Befund 1, 2, 3). Zählbefehl: manuell, Ergebnis in zaehlung.txt.
- Schritt 2 (Zählung): 0 Sätze über 25 Wörter (längster 23), mittlere Satzlänge ca. 9 Wörter, 0 Absätze über 4 Sätzen, 0 Gedankenstriche, 0 nicht erlaubte Bindestrichwörter im sichtbaren Text (nur „Kern-Version“, „M-04“, „REF-ort“ in Meta-Kopf/Notizen), 0 Floskeln. Befehl: `python3 -I zaehlung.py`. Lesbarkeit Amstad grob geschätzt ca. 75 (Silbenheuristik, nicht `lesbarkeit.mjs`, daher Schätzung). 1 Befund (Befund 6 nur als Faktenlücke, Schritt 4).
- Schritt 3 (Glossar): 2 Lücken (Abdichtung, Untergrund), Befund 3. Befehl: zaehlung.py.
- Schritt 4 (Fakten): 1 Fakt ohne Fundstelle in K-015 (Landkreis, Befund 6). 0 Treffer aus „Nicht verwenden“. Telefon, Aßlar, kostenfrei, drei Schritte und Entfernungen sind belegt. Befehl: zaehlung.py.
- Schritt 5 (Suchbegriffe): „Fliesenleger“ natürlich vorhanden; „Badsanierung“ und „Fliesenverlegung“ fehlen im Fließtext (Befund 4). Titel 49 Zeichen (≤60), Beschreibung 131 (120 bis 155). Befund 5. Befehl: zaehlung.py.
- Schritt 6 (Seitenformel): sechs Abschnitte vorhanden, 1 Befund (Abschnitt 1, Befund 2). Abschnitt 4 und 5 nur mit Verweisen, nicht prüfbar (siehe Offene Fragen).

BILDBELEGE: keine

OFFENE FRAGEN
- Hauptknopf: Abschnitt 1 hat „Termin vor Ort anfragen“, Abschnitt 6 hat das Formular. Soll der Hauptknopf nur einmal stehen (K-009 Seitenformel)? Welcher?
- Abschnitt 4: „Drei Schritte wie auf der Startseite“. Der Wortlaut steht nicht im Referenztext, daher nicht prüfbar.
- Abschnitt 5: Bildunterschriften und der Wortlaut der Kundenstimme fehlen; Wörtlichkeit nicht prüfbar.
- Die Lesbarkeit ist nur geschätzt. Die verbindliche Messung mit `werkzeuge/lesbarkeit.mjs` an der gerenderten Seite steht aus, da ich keine Server starte.

=== ENDE E1-LEKT-REF-4 · BEREIT ZUR RÜCKGABE ===
