GEÄNDERTE DATEIEN
Keine Datei im Repo geändert, nichts committet, nichts gepusht. Geschrieben wurde nur unter `/home/user/tezgel/_werkstatt/cache/probelauf/e0/P2-d1440-A1` bis `-A6` und unter `$SCRATCH/E0-PROBE-04/` (Lauf-Dateien, Konsolenprotokolle). Entfernt habe ich zwei eigene Erkundungsläufe `P2-d1440-A4-alle` und `-ueber` im Satz e0. `git status` zeigt nur fremde Änderungen (src/, test/, `_werkstatt/register.json`, `werte-regeln.json`, drei untracked Ordner).

WAS UND WARUM
Person P2 (Gießen, Neubau, Tablet), Gerät d1440 mit Maus, Systemschrift 100 %, Start `/`, Basis 127.0.0.1:4310 (laut lauf.json bestätigt).
- A1 gelöst, 1 Schritt (Banner „Alle ablehnen“). Antwort: „Sie machen Fliesenverlegung und Badsanierung, und zwar hier in Aßlar.“
- A2 gelöst, 0 Schritte bis Ziel (Nummer steht im Startbild), 1 Handlung gesamt (Antippen, Attrappe). Antwort: „Ich rufe die Nummer 06441 / 44 83 567 an …“
- A3 gelöst bis vor den Absendeknopf, 12 Handlungen inklusive 1 Bildlauf. Nicht abgesendet. Weg: Kontakt, Express-Anfrage, Wohnbereich, Fläche, Kontaktdaten.
- A4 NICHT gelöst, 34 Handlungen (Grenze 40). Keine Fotos fertiger Arbeiten gefunden. Antwort: „Ich habe keine Fotos fertiger Arbeiten gefunden, nur Zeichnungen und Textbeispiele.“
- A5 gelöst, 4 Schritte. Antwort: „Erst kommt eine Bedarfsanalyse, dann die technische Prüfung und der Materialcheck, am Ende ein Festpreis-Angebot. Der Termin vor Ort ist kostenlos.“
- A6 gelöst, 2 Schritte (Standorte, Fliesenleger Gießen). Antwort: „Ja, der Betrieb arbeitet auch in Gießen …“

Befunde: 12 (hoch 1, mittel 2, gering 9). Die wichtigsten:
- hoch, A4 Schritt 25: Auf allen besuchten Seiten gibt es keine Fotos. Die „Leistungsbeispiele“ zeigen Zeichnungen und den Satz „Fotos und Details realer Projekte veröffentlichen wir erst, wenn unsere Kunden zugestimmt haben.“
- mittel, A3 Schritt 2: „Aufmaß vor Ort anfragen“ führt auf „Kontakt & Aufmaß“, nicht ins Formular; ein zweiter Knopf ist nötig.
- mittel, A4 Schritt 5: Die Kacheln „Küchen, Dielen & Flure“ sehen anklickbar aus, sind es aber nicht.
- gering: Vorauswahl „Bad & Wellness“ und „15 - 35 m²“ (A3); Banner verdeckt Text (A1, A6); Fachwörter wie „DIN 18534“, „Restfeuchte“, „Zuschuss-Check“ (A1, A5); zwei Kostenaussagen mit verschiedenen Begriffen (A5).

PRÜFUNG UND ERGEBNIS
- Sechs Läufe vorhanden, alle Antworten in eigenen Worten, kein Absenden.
- Matrix (`--matrix --satz e0`), meine d1440-Zeilen: A1 gelöst 1 (3 Befunde), A2 gelöst 0 (1), A3 gelöst 12 (3), A4 offen (2, davon 1 hoch), A5 gelöst 4 (2), A6 gelöst 2 (1). Die Matrix enthält außerdem fremde Läufe im Satz e0 (P1, P2 auf t768), die nicht von mir stammen.
- Ein Abbruch: Von vier A6-Läufen brach einer bei Schritt 2 ab, weil der Eintrag Gießen nach „Untermenü Standorte öffnen“ nicht sichtbar war. Die Wiederholungen gelangen beide. Die Lauf-Datei wurde überschrieben, die Matrix zeigt den gelungenen Lauf.

BILDBELEGE
- `…/cache/probelauf/e0/P2-d1440-A1/00-start.jpg` (verdeckter Text) und `01-tippe.jpg`
- `…/P2-d1440-A2/01-tippe.jpg` (Telefonnummer oben rechts)
- `…/P2-d1440-A3/02-tippe.jpg`, `03-tippe.jpg`, `05-tippe.jpg`, `11-fuelle.jpg` (Formular bis Absendeknopf, nicht abgesendet)
- `…/P2-d1440-A4/25-scrolle.jpg` (Leistungsbeispiele ohne Fotos), `05-tippe.jpg`, `13-tippe.jpg`, `21-tippe.jpg`
- `…/P2-d1440-A5/02-tippe.jpg`, `04-scrolle.jpg`
- `…/P2-d1440-A6/02-tippe.jpg`

GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste)
Keine gemeinsame Datei geändert. Wünsche:
1. PROBELAUF.md §3: Testdaten A3 angleichen. Protokoll: „Probe Läufer“ / „0641 000000“. Paket: „Erika Muster“ / „0172 0000000“. Ich habe die Paket-Werte genutzt.
2. Zielprüfung A2 und A6 prüfen: A2 gilt schon im Startbild als erfüllt, A6 schon in der Menüliste. Klären, ob „gesehen“ reicht.
3. Zielprüfung A3 verlangt laut Protokoll Pflicht-Einwilligungen. Im Formular war keine Einwilligungs-Checkbox zu sehen. Klären.
4. Werkzeug: `tippe {"nr": n}` traf bei einer Wiederholung ein anderes Element (Banner statt Kachel). Namenstippen war stabiler.
5. Werkzeug oder Seite: Das Standorte-Menü öffnete sich in einem von vier Läufen nicht (siehe PRÜFUNG).

OFFENE FRAGEN
- A4 „hoch“ ist noch nicht vom Opus-Gegenprüfer bestätigt (PROBELAUF §7). Die Suche war nicht erschöpfend: Ich habe bei 34 Handlungen am Ende von /referenzen aufgehört.
- Die Rückgabedatei `_werkstatt/pakete/E0-PROBE-04.rueckgabe.md` habe ich nicht geschrieben. Sie liegt außerhalb meiner Schreibrechte, und der Auftrag verlangt keine Berichtsdatei im Repo. Der Bericht steht hier als Antwort.
- P2 lief auf d1440 mit Maus statt auf dem Standardgerät t768 (so vorgegeben).

=== ENDE E0-PROBE-04 · BEREIT ZUR RÜCKGABE ===
