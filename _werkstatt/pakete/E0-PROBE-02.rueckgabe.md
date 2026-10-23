GEÄNDERTE DATEIEN
- `$SCRATCH/E0-PROBE-02/P1-d1440-A1.json` bis `P1-d1440-A6.json` (Lauf-Dateien, neu)
- `_werkstatt/cache/probelauf/e0/P1-d1440-A1` bis `-A6/` (Lauf-Ausgaben, neu; Symlink auf Scratch)
- `_werkstatt/cache/probelauf/e0/matrix.json` (vom Werkzeug bei `--matrix` geschrieben, außerhalb meines Musters)
- Keine Repo-Dateien geändert, nichts committet. `git status` zeigt nur fremde Änderungen (src/, PLAN.md, PRUEFPUNKT.md, STATUS.md, pakete/E1-PRUEF-PLAN-2.md).

WAS UND WARUM
P1 (72, Solms), Gerät d1440 (Maus, Vergleichsgerät), Start `/`, Satz e0, je Aufgabe ein frischer Lauf. Nur Sichtbares genutzt, kein Code gelesen. Zählung laut Werkzeug:
- A1 gelöst, 1 Handlung (Banner „Alle ablehnen“).
- A2 gelöst, 2 Handlungen (Banner, Telefonsymbol; Attrappe, nichts ausgelöst).
- A3 gelöst (Formular bis vor Absendeknopf), 21 Handlungen bis Ziel. Nicht abgesendet.
- A4 offen, 25 Handlungen, auf keinem besuchten Weg Fotos gefunden.
- A5 gelöst, 6 Handlungen.
- A6 gelöst, 4 Handlungen (Karte „Standorte“: „Solms ca. 8 km“).

Befunde (Schritt, Schwere):
- A4 hoch: Start, Badsanierung, Barrierefreies Bad, Referenzen, Musterbäder, Fliesen & XXL, Ratgeber, Badsanierung komplett zeigen nur Schemazeichnungen und Listen, keine Fotos fertiger Arbeiten.
- A4 mittel (Schritt 4): Menü-Unterpunkte liegen hinter der Fußleiste mit Anruf- und WhatsApp-Knöpfen; Klick scheitert.
- A3 mittel (Schritte 2 und 4): „Aufmaß anfragen“ führt zur Kontaktseite, nicht zum Formular; „Zur Express-Anfrage“ landet auf der Karte, das Formular liegt zwei Bildschirme tiefer.
- A3 mittel (Schritt 8): Fachwörter („Walk-In-Dusche“, „Ablagenischen“, „Stelzlagern“, „DIN 18534 Verbundabdichtung“, „Ausführungszeitraum“, „Einsatzort / Postleitzahl“).
- A3 gering: Vorauswahl ohne Hinweis (Bad & Wellness, 15–35 m², 1–3 Monate); „Schnellstmöglich“ ragt über sein Kästchen; Platzhalter „Vor- und Nachname“ abgeschnitten.
- A1 mittel (Schritt 0): Banner mit „Cookies“, „§25 TTDSG“, „Art. 6 Abs. 1 lit. a DSGVO“. Gering: Banner verdeckt die Überschrift; „Badsanierung“ ist ein Fachwort.
- A2 gering: Telefon nur als Symbol, Nummer nicht lesbar.
- A5 mittel: Ablauf steht nicht als Schrittfolge; die Antwort stützt sich auf Textfragmente. Fachwörter „Begutachtung“, „Festpreisangebot“, „Endübergabe“.
- A6 mittel: Weg über Menü („Standorte“, dann Standortseite), drei Handlungen. Gering: in der Karte überdeckt „Wetzlar“ den Text „Firmensitz“.
- Werkzeug: A4-Lauf brach bei doppeltem Linktext „Barrierefreies Bad“ ab (nicht gezählt). Die Antwort „Ich finde nur Zeichnungen…“ bestand die Prüfung „beschreibt, was auf den Fotos zu sehen ist“; die Schlüsselwortprüfung ist zu grob.

PRÜFUNG UND ERGEBNIS
- Sechs Läufe vorhanden, Antworten in eigenen Worten, kein Absenden.
- Matrix e0, Spalte d1440: A1 gelöst 1 (3 Befunde); A2 gelöst 2 (2); A3 gelöst 21 (6); A4 offen (5, davon 1 hoch); A5 gelöst 6 (2); A6 gelöst 4 (2).
- Die Matrix enthält außerdem P1-m390-Läufe, die nicht von mir stammen; nicht bewertet.
- Selbstprüfung: keine Repo-Änderung durch mich.
- Keine Berichtsdatei angelegt (Vorgabe des Orchestrators).

BILDBELEGE (unter `/home/user/tezgel/_werkstatt/cache/probelauf/e0/`)
- A1: P1-d1440-A1/00-start.jpg (Banner über Überschrift)
- A2: P1-d1440-A2/02-tippe.jpg (Telefonsymbol im Kopf)
- A3: P1-d1440-A3/04-tippe.jpg (Sprung auf Karte), 09-tippe.jpg (Schritt 2), 14-tippe.jpg (Schritt 3), 19-scrolle.jpg (Absendeknopf im Bild, nicht gedrückt)
- A4: P1-d1440-A4/02-tippe.jpg (Menü), 08-tippe.jpg, 10-tippe.jpg, 12-tippe.jpg, 14-tippe.jpg, 16-tippe.jpg, 18-tippe.jpg (alle Seiten ohne Fotos)
- A5: P1-d1440-A5/02-tippe.jpg (Kosten), 04-scrolle.jpg (Ablauf-Text)
- A6: P1-d1440-A6/04-tippe.jpg (Karte mit Solms)

GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste)
1. `_werkstatt/werkzeuge/probelauf.mjs`: Schlüsselwortprüfung der Antwort so schärfen, dass „Ich finde nur Zeichnungen…“ für A4 nicht als Fotobeschreibung zählt.
2. `_werkstatt/werkzeuge/probelauf.mjs`: `scrolle` auch innerhalb offener Panels (Hauptnavigation) ermöglichen.
3. Site (Bauteam prüfen): Menü-Liste so scrollbar machen, dass alle Unterpunkte oberhalb der Fußleiste liegen.

OFFENE FRAGEN
1. A4: Scrollt das Menü per Finger oder Mausrad, oder sind die Unterpunkte real unerreichbar? Das Werkzeug kann es nicht prüfen.
2. A4 „hoch“: Fotos könnten auf nicht besuchten Seiten liegen (Standortseiten, Über Deniz Tezgel, Kundenstimmen weiter unten). Vor einer Bestätigung durch den Gegenprüfer nicht ausgeschlossen.
3. A3: Im Schritt „Kontaktdaten“ war keine Einwilligungs-Checkbox sichtbar; das Protokoll verlangt „Pflicht-Einwilligungen ankreuzen“. Ob es eine gibt, ist offen.
4. A3: Die Zielschritt-Zahl schwankte zwischen Läufen (17 und 19). Die Zählung ist nicht ganz stabil.
5. Systemschrift 200 % kam über das Personenprofil; nicht gesondert geprüft.

=== ENDE E0-PROBE-02 · BEREIT ZUR RÜCKGABE ===
