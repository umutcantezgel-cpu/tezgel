GEÄNDERTE DATEIEN
Keine Repo-Dateien geändert. Geschrieben habe ich nur unter Schreibrecht: `$SCRATCH/E0-PROBE-05/A1.json` bis `A6.json`, `A3.json` und `A4.json` mehrfach überschrieben, `A6b.json` und `A5.json`, sowie die Lauf-Ordner `_werkstatt/cache/probelauf/e0/P3-m360-A1` bis `-A6`. Eine Erkundung (`P3-m360-A6-menue`) habe ich aus `e0` entfernt und unter `$SCRATCH/E0-PROBE-05/erkundung/` neu abgelegt. Nicht geschrieben: `_werkstatt/pakete/E0-PROBE-05.rueckgabe.md` (kein Schreibrecht, und der Orchestrator verbietet Berichtsdateien).

WAS UND WARUM
Person P3 (Vermieter, Herborn, m360, Touch). Alle Läufe ohne Absenden.
- A1 gelöst in 1 Schritt (Banner „Alle ablehnen“). Antwort: „Fliesenleger, die Fliesen verlegen und Bäder sanieren, in Aßlar.“
- A2 gelöst in 2 Schritten (Banner, „Anrufen“, Attrappe). Die Nummer steht nicht auf dem ersten Bildschirm.
- A3 gelöst (Formular bis Absendeknopf im Bild): 15 Handlungen gezählt, Ziel bei Schritt 14. Weg: Aufmaß, Projekt „Wohnbereich & Neubau“, Fläche „Bis 15 m²“, „Schnellstmöglich“, Ort, Name, Telefon, E-Mail.
- A4 offen. Auf Startseite, Leistungen, Referenzen und Musterbäder fand ich nur Grundriss-Zeichnungen, Konzeptkarten und Bewertungen, keine Fotos fertiger Arbeiten. Der gespeicherte Lauf hat 7 Handlungen (Musterbäder-Weg). Über etwa 18 Erkundungsläufe waren es mehr; das Werkzeug speichert nur einen Weg je Lauf.
- A5 gelöst in 4 Schritten (Startseite-Kosten „kostenloses Aufmaß“, Formular „Zur Express-Anfrage“).
- A6 gelöst in 11 Schritten (Startseite-Standorte, Herborn). Der Menüweg zu Herborn scheiterte zweimal am Antippen.

Matrix (`--matrix --satz e0`, P3 m360): A1 gelöst 1 (2 Befunde) · A2 gelöst 2 (1) · A3 gelöst 15 (4) · A4 offen (3, davon 1 hoch) · A5 gelöst 4 (1) · A6 gelöst 11 (2). Die Matrix zeigt außerdem P3-d1440-Zeilen, die ich nicht gelaufen bin.

Befunde (Auswahl): Cookie-Banner verdeckt die Einstiegsseite (gering). Menüpunkte am Menüende werden vom unteren Kontaktblock verdeckt, Antippen schlug in A4 und A6 zweimal fehl (mittel, Ursache offen). Im Formular sind Projekt, Fläche und Zeitraum vorausgewählt (mittel). „Aufmaß“ und „Vor-Ort-Aufmaß“ statt „Termin“ (mittel). Unverständliche Wörter: TTDSG, DSGVO, Einwilligung, Aufmaß, Express-Anfrage, Feinsteinzeug, Fachbetriebsleiter, Konfigurator, Fachgewerke.

GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste)
1. Briefing Schritt 4 nennt „Erika Muster“ und „0172 0000000“. Protokoll §3 nennt „Probe Läufer“, „0641 000000“, „probe@example.org“. Ich habe die Protokolldaten verwendet. Bitte angleichen.
2. Protokoll §6 verlangt „Pflicht-Einwilligungen ankreuzen“. Im sichtbaren A3-Formular gibt es kein Einwilligungs-Kästchen (nur Text). Bitte klären, ob das Produkt fehlt oder das Protokoll anzupassen ist.
3. Produkt: Menüpunkte am Menüende lassen sich nicht zuverlässig antippen (A4 „Musterbäder“, A6 „Herborn“). Bitte prüfen, ob echter Fehler oder Werkzeug-Timing.
4. Produkt: Auf dem alten Stand (4310) fand ich keine Fotos fertiger Arbeiten auf den besuchten Seiten. Bitte prüfen, ob das Fotoziel dort überhaupt erfüllt ist.

PRÜFUNG UND ERGEBNIS
- `git status --porcelain` zeigt viele fremde Änderungen (src/, test/, _werkstatt/…). Keine davon stammt von mir.
- Mein Schreibbereich `_werkstatt/cache/probelauf/e0/P3-m360-*` ist nicht im Status, also ignoriert.
- Sechs Läufe vorhanden. Antworten in eigenen Worten, kein Absenden.
- Sechs Aufgaben, 5 gelöst, 1 offen (A4).

BILDBELEGE
- A1: /home/user/tezgel/_werkstatt/cache/probelauf/e0/P3-m360-A1/01-tippe.jpg
- A2: /home/user/tezgel/_werkstatt/cache/probelauf/e0/P3-m360-A2/02-tippe.jpg
- A3: /home/user/tezgel/_werkstatt/cache/probelauf/e0/P3-m360-A3/03-scrolle.jpg, 05-tippe.jpg, 14-scrolle.jpg (Absendeknopf im Bild, nicht gedrückt)
- A4: /home/user/tezgel/_werkstatt/cache/probelauf/e0/P3-m360-A4/06-tippe.jpg, 07-scrolle.jpg, 08-scrolle.jpg
- A5: /home/user/tezgel/_werkstatt/cache/probelauf/e0/P3-m360-A5/02-scrolle.jpg, 04-tippe.jpg
- A6: /home/user/tezgel/_werkstatt/cache/probelauf/e0/P3-m360-A6/11-tippe.jpg

OFFENE FRAGEN
- A4: Gibt es auf dem alten Stand irgendwo Fotos fertiger Arbeiten? Die Befunde „hoch“ muss der Opus-Gegenprüfer bestätigen.
- Warum schlugen die Menü-Taps fehl (Scroll-Animation oder echte Verdeckung)?
- Die Rückgabedatei fehlt; soll ich sie an anderer Stelle anlegen?

=== ENDE E0-PROBE-05 · BEREIT ZUR RÜCKGABE ===
