GEÄNDERTE DATEIEN
Keine Repo-Datei von mir geändert oder angelegt. Lauf-Dateien und Ausgaben liegen unter `_werkstatt/cache/probelauf/e0/P4-m390-*` und `$SCRATCH/E0-PROBE-08/`. Keine Berichtsdatei geschrieben (Vorgabe des Orchestrators). Fehler außerhalb meiner Rechte, von mir verursacht: `/E0-PROBE-08/A1.json` (Wurzelverzeichnis, 115 Byte; eine leere Shell-Variable war schuld; das Löschen wurde vom Sicherheitscheck verweigert) und `_werkstatt/cache/probelauf/e0/P4-d1280-A1/` (Lauf auf dem Standardgerät statt m390). Die Matrix zeigt außerdem d1280-Zeilen für A2 bis A6, die nicht von mir stammen.

WAS UND WARUM
Nur `probelauf.mjs` mit Gerät m390, Touch, Port 4310 (Standard), nie 4320. Kein Code gelesen. Person P4 (Braunfels). Testdaten nach Briefing: Erika Muster, 0172 0000000, probe@example.org, Einsatzort 35614 Aßlar. Nichts abgesendet.

- A1 gelöst, 1 Handlung (Banner "Alle ablehnen"). Antwort: "Das ist ein Fliesenlegerbetrieb, der Fliesen verlegt und Bäder saniert, und er arbeitet in Aßlar."
- A2 gelöst, 2 Handlungen (Banner, "Anrufen"). Antwort: "Ich kann den Betrieb unter 06441 / 44 83 567 anrufen oder ihm per WhatsApp schreiben."
- A3 bis vor Absendeknopf gelöst, 16 Handlungen (Ziel bei Schritt 13). Antwort: "Ich habe einen Termin vor Ort angefragt, das Formular ist bis vor den Absendeknopf ausgefüllt."
- A4 nicht gelöst, 28 Handlungen auf dem Balkonpfad bis Seitenende. Dazu Vorläufe: Ratgeber/Referenzen (8), Startseite (24), Über uns (3), alle ohne Fotos. Antwort: "Ich finde hier keine Fotos von fertigen Balkonen oder Terrassen, nur Zeichnungen und Texte."
- A5 gelöst, 5 Handlungen. Antwort: "Erst gibt es ein Gespräch vor Ort, dann Prüfung, Material und Angebot, und die Beratung ist kostenlos."
- A6 gelöst, 18 Handlungen (13 davon Bildlauf zum Link). Antwort: "Ja, der Betrieb arbeitet auch in Braunfels."

PRÜFUNG UND ERGEBNIS
Matrix e0, P4, m390: A1 gelöst 1 (2 Befunde), A2 gelöst 2 (0), A3 gelöst 16 (5), A4 offen (3, davon 2 hoch), A5 gelöst 5 (3), A6 gelöst 18 (2). Befunde:
- hoch, A4, Schritt 4: Keine Fotos fertiger Arbeiten auf Balkonseite, Referenzen, Startseite und Über uns. Die Bilder sind Zeichnungen.
- mittel, A3, Schritt 2: "Aufmaß vor Ort anfragen" führt auf die Kontaktseite. Das Formular liegt erst hinter "Zur Express-Anfrage" und einem Bildlauf.
- mittel, A3, Schritt 5: Die Formular-Option "Balkon & Terrasse" trägt den Namen eines Navigationspunkts.
- mittel, A3, Schritt 5: Fachwörter (Stelzlager, Feinsteinzeug, Estrichausgleich, Verbundabdichtung, DIN 18534).
- mittel, A4, Schritt 4: Zeichnungen wirken für Laien wie Fotos.
- mittel, A6, Schritt 4: Braunfels steht erst am Ende einer langen Liste. Das Untermenü nennt nur Wetzlar, Gießen, Marburg.
- gering: Banner verdeckt den Start (A1). Vorauswahl "Bad & Wellness", "15 - 35 m²", "In 1 - 3 Monaten" (A3). Zwei Ablaufangaben, 3 Schritte und 4 Stufen (A5). Fachwörter (A1, A5).
Werkzeugbefunde, keine Seitenbefunde: Die Antwortprüfung bestand eine verneinte Antwort wegen des Worts "Fotos". Das Kostenziel von A5 war schon bei Schritt 02 durch Menütext erfüllt. "Balkon & Terrasse" löste still auf den Navigationslink auf. "Musterbäder" im offenen Menü brach nach 30 s Timeout ab. Repo-Status: 36 Einträge, keiner davon von mir.

GEMEINSAME DATEIEN (gewünschte Änderungen)
1. `probelauf.mjs`: Antwortprüfung muss Verneinungen erkennen.
2. `probelauf.mjs`: Kostenziel A5 nur aus dem Seiteninhalt bewerten, nicht aus Menütext.
3. `probelauf.mjs`: Mehrdeutige Namen zwischen Navigation und Inhalt melden statt still auflösen.
4. `probelauf.mjs`: Tippen im offenen Menü auf Überlagerung prüfen, nicht 30 s warten.
5. Orchestrator: `/E0-PROBE-08` und `_werkstatt/cache/probelauf/e0/P4-d1280-A1` entfernen (mein Fehler).

BILDBELEGE (unter `/home/user/tezgel/_werkstatt/cache/probelauf/e0/`)
- `P4-m390-A1/00-start.jpg` (Banner), `P4-m390-A1/01-tippe.jpg` (Startbild)
- `P4-m390-A2/02-tippe.jpg` (Anrufen-Link)
- `P4-m390-A3/02-tippe.jpg` (Kontaktseite), `03-tippe.jpg` (Kartenplatzhalter), `04-scrolle.jpg` (Schritt 1), `06-tippe.jpg` (Schritt 2), `13-scrolle.jpg` (Formularende ohne Checkbox)
- `P4-m390-A4/04-tippe.jpg` (Balkonseite), `05-scrolle.jpg` (Zeichnung), `28-scrolle.jpg` (Seitenende)
- `P4-m390-A4-ratgeber/07-scrolle.jpg` (Bewertungen ohne Fotos), `P4-m390-A4-start/23-scrolle.jpg` (Fliesenraster-Zeichnungen)
- `P4-m390-A5/05-tippe.jpg` (FAQ), `P4-m390-A5-vorort/04-tippe.jpg` (Beratung), `05-scrolle.jpg` (Ablauf)
- `P4-m390-A6/04-tippe.jpg` (Standorte), `05-tippe.jpg` (Braunfels)

OFFENE FRAGEN
1. A3: Auf der Kontaktseite zeigten die Bilder keine Einwilligungs-Checkbox. Die Balkonseite hat eine Pflicht-Checkbox "Ich stimme zu, …". Ist die Einwilligung auf /kontakt gewollt?
2. A2: Die Antwort nennt die Nummer, die P4 erst nach dem Tippen im Link sieht. Soll die Antwort nur "Anrufen-Knopf unten" nennen?
3. A4: Gibt es im alten Stand überhaupt Fotos fertiger Arbeiten? Musterbäder sowie Fliesen- und XXL-Seiten wurden nicht vollständig geprüft, weil das Tippen im Menü scheiterte.
4. Lässt sich das Menü bei P4 scrollen? Das Werkzeug scrollte darin nicht (0 px).
5. Testdaten: Briefing (Erika Muster, 0172 0000000) und Protokoll (Probe Läufer, 0641 000000) weichen ab. Ich habe die Briefing-Werte genommen.

=== ENDE E0-PROBE-08 · BEREIT ZUR RÜCKGABE ===
