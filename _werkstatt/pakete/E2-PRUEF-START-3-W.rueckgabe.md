E2-R3-W, Stufe 1. Server 127.0.0.1:4320. Letzte Quelländerung 01:35:27, alle Läufe danach. Repo unverändert (git status leer).

ERGEBNIS JE WERKZEUG
1. `bildsatz.mjs --satz e2r3 --hauptansichten --geraete alle --worker 1`, Exit 0. 120 Läufe (12 Seiten × 10 Geräte), 1276 Aufnahmen, Fehler 0, nicht 200: 0, Überlauf 0, Überlappung 0, Konsole 0.
   `/gibt-es-nicht` m390 und d1440: Exit 1 nur wegen HTTP 404 (erwartet), 7 Aufnahmen, Überlauf 0, Überlappung 0, Konsole nur das Dokument-404.
2. `erstesbild.mjs --seiten /,/bad --geraete alle --bilder`, Exit 0. 40 Fälle, 25 davon alle 5 Elemente bestanden, Fehler 0, nicht 200: 0, fremd 0, blockiert 0.
3. `axe.mjs --seiten /,/bad,/gibt-es-nicht --ansichten m390,d1440 --zustaende`, Exit 0. 27 Läufe, 14 ernst/kritisch (alle target-size). Alle übrigen Zustände ohne Befund.
4. `lesbarkeit.mjs --seiten /,/gibt-es-nicht`, Exit 0. `/` GRÜN (Flesch 78.5, Satz Ø 7.2, längster Satz 23, Titel 56, Beschreibung 146, Alt ok). `/gibt-es-nicht` ROT (2 Regeln, siehe Befund E).
5. Konsole (m390, d1440): `/` und `/bad` ohne Meldungen, Seitenfehler oder Antworten ≥ 400. `/gibt-es-nicht` nur das Dokument-404. Positivprobe erkannt.

BEFUNDE
A. target-size, Menü-Zustand m390 (axe, in zwei Läufen gleich): `/`, `/bad`, `/leistungen`, `/standorte`, `/blog`, `/ueber-uns`, `/kontakt` je 2 Knoten. `/gibt-es-nicht` ergab mein Skript ebenfalls 2 Knoten. Betroffen sind `.px-3.no-underline[href="tel:+4964414483567"]` (x 17, y 778.8, 174.5×49.3, Mitte trifft den eigenen Link) und `.px-3[rel="noopener noreferrer"][target="_blank"]` (WhatsApp, x 199.5, y 778.8).
   failureSummary wörtlich: „Target has insufficient size because it is partially obscured (smallest space is 174.5px by 5.7px, should be at least 24px by 24px)“ und „Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 6.8px instead of at least 24px.“
   Handprüfung: Die Links sind im Bild vollständig sichtbar (`.../E2-R3-W/skripte/menue-m390-start.png`). An allen 100 Prüfpunkten je Link ist der Link oberste Ebene. Die untere Leiste `aside.unten-sicher` (y 783.5–844) liegt in der DOM unter den Links.
B. Erstes Bild `/`, q844: Einstieg-Hauptknopf und -Telefon liegen unter dem Falz (vh 390), in beiden Durchgängen. Die untere Leiste zeigt Anrufen und Termin vollständig (y 346–390). Beleg `.../E2-R3-W/erstesbild/bilder/start__q844__nach-einwilligung.jpg`. Das Werkzeug misst nur die Einstiegselemente.
C. t768 und t1024: `/` t768 5/5 in beiden Durchgängen. `/bad` t768 Erstbesuch: Termin und Anrufen in der Leiste (y 964–1024) sind an der Oberkante von ca. 11 px vom Banner überdeckt, die Beschriftung bleibt lesbar (`bad__t768__erstbesuch.jpg`). `/bad` t1024 Erstbesuch: Hauptknopf und Telefon im Bild, nur die Überschrift ist verdeckt.
D. Erstbesuch: Der Banner (`div.hoehe-banner.ueber-leiste-12`, `p#cookie-consent-description`) verdeckt auf `/` Hauptknopf und Telefon (m360) bzw. Überschrift und Ort (q844, t1024, d1280, d1440, d1920). Auf `/bad` verdeckt er Hauptknopf und Telefon (m360, m390, m430, t768) bzw. Überschrift und Ort (q844, t1024, d1280, d1440). Nach Einwilligung fehlt nur `/` q844 (Befund B).
E. `/gibt-es-nicht` Lesbarkeit ROT: „main hat keinen sichtbaren Fließtext“ und „HTTP 404“. Der Status ist richtig.

BILDPFADE (Ordner `.../scratchpad/E2-R3-W/`)
- Vollbild-Satz: `bildsatz/` (`bildsatz.json` darin). `/` m390: `bildsatz/m390/start/00.jpg`. `/` d1440: `bildsatz/d1440/start/00.jpg`.
- Erstes Bild: `erstesbild/bilder/` (40 Dateien).
- 404: `bildsatz-404/`.

OFFENE FRAGEN
1. Menü-target-size: reproduzierbarer axe-Befund, aber keine Verdeckung im Bild oder beim Trefferpunkt-Test. Ist die Leiste unter dem Menü ein echter Überlapp oder ein Werkzeugbefund?
2. Erstbesuch schwankt: `/` t1024 war im ersten Lauf 5/5, im zweiten 3/5 (Überschrift und Ort vom Banner verdeckt). Das Werkzeug wartet nicht auf den Banner, der nach ca. 400 ms erscheint.
3. Im ersten `erstesbild`-Lauf gab es eine Blockade, deren Ziel nicht protokolliert wurde. Im zweiten Lauf keine.
4. Ist die Banner-Überdeckung im Erstbesuch (D) gewollt?
5. Ist der fehlende Fließtext auf der 404-Seite gewollt?
6. Das Briefing nennt Stand 7502d90, HEAD ist 4bffebe (7502d90 ist Vorfahr).

VORFÄLLE (mein Fehler)
- Drei Einträge liegen außerhalb des erlaubten Bereichs: `/E2-R3-W/axe.log`, `/E2-R3-W/erstesbild.log`, `/E2-R3-W/skripte/ziel-groesse.mjs`. Ursache war eine leere Variable. Das Löschen wurde von der Sicherheitsprüfung abgelehnt. Bitte von Hand entfernen (`rm -r /E2-R3-W`), nicht umgangen.
- Die ersten Hilfsläufe gingen an Port 4310 (RELAUNCH_BASE fehlte). Diese Ergebnisse sind verworfen. `konsole-4310/` und `axe/ziel-groesse-4310.log` nicht verwenden.
- Läufe vor 01:52 liegen in `bildsatz-altlauf/`, `erstesbild-altlauf/`, `axe-altlauf/`. Sie stammen teils aus der Quelländerungsphase. Für Befunde nicht verwenden.

=== ENDE E2-R3-W ===
