GEÄNDERTE DATEIEN
- Neu: /home/user/tezgel/_werkstatt/werkzeuge/probelauf.mjs (Kopie der Vorlage `_relaunch/werkzeuge/probelauf.mjs`, Version 1.1-E0-PRUEF-02d)
- Neu: /home/user/tezgel/_werkstatt/werkzeuge/PROBELAUF.md (Protokoll für Probeläufer, Kern v2)
- Scratchpad: /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E0-PRUEF-02d/ (Lauf-Dateien, Positivprobe, Rauchläufe, Hilfsskripte)
- Unverändert: lib.mjs, src/, public/, test/, next.config.ts, package.json, AGENTS.md. Keine Läufe nach `_werkstatt/cache/probelauf` oder `belege/`. Nichts committet oder gepusht. Im Repo gehören mir nur die zwei neuen Dateien; die übrigen 50 Git-Einträge sind nicht von mir.

WAS UND WARUM
- A1 bis A6 nach AUFTRAG §6 mit den Zielzuständen des Briefings. A1 und A5 prüfen die Antwort per Regex, A4 prüft zusätzlich mindestens zwei Fotos im Bild, A2 einen Kontaktlink oder eine Nummer im Bild, A3 ein Formular mit gültigen Pflichtfeldern und sichtbarem Absendeknopf (ohne Absenden), A6 den Ortsnamen der Person.
- Personen P1 bis P5 über `"person"` mit Ort, Standardgerät und Systemschrift. P1 läuft mit 200 %, als Näherung über `html font-size`, vermerkt in `bedingungen`.
- Telefon und WhatsApp: Init-Skript fängt Klicks ab, protokolliert `kontakt_angetippt`, nichts wird ausgelöst. Die Vorlage hat tel-Links gar nicht angetippt; das ist jetzt geändert.
- Absendesperre: `tippe` auf einen Absendeknopf wird mit dem verlangten Wortlaut verweigert und zählt nicht. Ohne `<form>` gilt `<main>` als Behälter, und eine Absende-Beschriftung zählt ebenfalls.
- `tippe {"nr": n}` tippt Element Nr. n der nummerierten Bedienliste. Die Konsole nennt den Pfad des letzten Bildes.
- Antworten werden erst am Laufende geprüft. Optionen `--schrift` und `--ziel` ergänzt. Chromium startet über `CHROME_PATH`, weil der Host nur chromium-1243 hat.

PRÜFUNG UND ERGEBNIS
- `node --check`: OK. `--aufgaben` listet A1 bis A6.
- Positivprobe auf lokaler Testseite (127.0.0.1:4330, Formular mit Pflichtfeldern, Checkbox, Absenden; Server danach beendet): Name, Telefon, Checkbox, dann A3 erfüllt bei Schritt 03. `tippe „Absenden“` wird verweigert, Abbruch mit der Meldung, keine Anfrage. Gegenprobe ohne Eingaben: nicht erreicht.
- Rauchlauf (a), 4310, P5 auf m390, A2, ein Schritt `tippe „WhatsApp-Chat starten“`: Ziel erreicht bei Schritt 01, 1 Handlung. `kontakt_angetippt` protokolliert, URL blieb `/`, keine Anfrage an `/api/anfrage`. Zusätzlich steht ein fremd-GET auf api.whatsapp.com im Protokoll (von der Sperre mit 204 beantwortet), Ursache offen.
- Rauchlauf (b), 4310, P1 auf m390 mit `--schrift 200`, A3 auf `/kontakt`: Abbruch bei Schritt 01, `fuelle „Name“` nicht gefunden. Die Verweigerung auf 4310 ist damit nicht geprüft; sie ist auf der Positivprobe belegt.
- Matrix-Ausgabe funktioniert (`--matrix --satz e0-rauch`).
- Die 60 Aufgabenläufe sind nicht Teil dieses Pakets und nicht gelaufen.

BILDBELEGE
- Rauchlauf (a): .../scratchpad/E0-PRUEF-02d/rauch/e0-rauch/a-p5-m390-whatsapp/01-tippe.jpg
- Rauchlauf (b): .../scratchpad/E0-PRUEF-02d/rauch/e0-rauch/b-p1-m390-schrift200/01-fehler.jpg
- Positivprobe: .../scratchpad/E0-PRUEF-02d/rauch/e0-positiv/pos-a/04-fehler.jpg
- Erkundung `/kontakt`: .../scratchpad/E0-PRUEF-02d/rauch/e0-rauch/erkund-kontakt-p1-c/05-scrolle.jpg
- Lauf-Protokolle je Ordner als `lauf.json`.

GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste)
- Keine Änderung an lib.mjs nötig; ANSICHTEN enthält m360, m390, t768, d1280 und d1440.
- Entscheidung des Orchestrators zum A3-Startpfad: Auf `/kontakt` gibt es kein Name- oder Telefonfeld, daher kann Rauchlauf (b) so nicht laufen. Vorschlag: einen Anfrage-Funnel als Startpfad festlegen.
- Beobachtung für die Nutzerführung (Fehler in fremder Seite, nicht behoben): Der Link „Aufmaß anfragen“ auf `/` führt auf `/kontakt`, dort ist kein Anfrageformular in der Erstansicht sichtbar.

OFFENE FRAGEN
1. Die Vorgabe, den Bericht nach `_werkstatt/pakete/E0-PRUEF-02d.rueckgabe.md` zu schreiben, liegt außerhalb meiner Schreibrechte und ist ein Berichtsdokument; deshalb habe ich ihn nicht als Datei angelegt. Bitte Datei anlegen oder Freigabe erteilen.
2. Die Aufgabentabelle in `_relaunch/PROBELAUF.md` (§2) passt nicht zu A1 bis A6. Ob die Fassung ersetzt wird, ist eine Entscheidung in ENTSCHEIDUNGEN.md.
3. A1, A4 und A5 prüfen nur Schlüsselwörter bzw. Mindestlänge der Antwort. A1 hat keine Seitenbedingung: Das Ziel gilt am Laufende, und die Handlungszahl ist die Schrittzahl des ganzen Laufs.
4. A3 weicht vom alten Protokoll ab (dort POST an `/api/anfrage`). Ich habe die Briefing-Fassung übernommen.
5. Bei P4 vergleiche ich mit m390, bei den mobilen Personen mit d1440. P2 auf t768 zählt zur Touch-Gruppe. Bitte bestätigen.
6. Die 200-%-Schrift ist eine Näherung und nicht gegen echte Systemschrift geprüft.
7. Die Ursache des fremd-GET auf api.whatsapp.com beim Antippen ist offen.
8. Die Ausführung braucht `CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome`; ohne diese Variable bricht Playwright ab.

=== ENDE E0-PRUEF-02d · BEREIT ZUR RÜCKGABE ===
