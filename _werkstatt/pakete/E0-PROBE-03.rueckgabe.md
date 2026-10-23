GEÄNDERTE DATEIEN
- Keine Repo-Dateien von mir geändert. Schreibbereich genutzt: `_werkstatt/cache/probelauf/e0/P2-t768-A1` bis `-A6` (Bilder, aria, sichtbar, lauf.json) und `$SCRATCH/E0-PROBE-03/` (Lauf-Dateien P2-t768-A1 bis A6.json, A4-home-scan.json).
- Vom Matrix-Aufruf geschrieben: `/home/user/tezgel/_werkstatt/cache/probelauf/e0/matrix.json`.
- `git status` zeigt 19 Einträge, keiner davon von mir (src/, test/, register.json, werte-regeln.json, belege/e0, bilder/e0, werkzeuge/logo, verlegen-Dateien).
- Die Rückgabedatei `_werkstatt/pakete/E0-PROBE-03.rueckgabe.md` habe ich nach deiner Vorgabe nicht angelegt.

WAS UND WARUM
Person P2 (Gießen, Tablet t768, Basis http://127.0.0.1:4310). Keine Absendung, keine Kontaktauslösung außer Attrappe.
- A1 gelöst, 0 Handlungen. „Das ist ein Fliesenlegerbetrieb, der Fliesen verlegt und Bäder saniert, und er arbeitet in Aßlar.“
- A2 gelöst, 1 Handlung (Per WhatsApp schreiben, Attrappe). Telefonnummer nicht gesucht.
- A3 gelöst bis vor den Absendeknopf, 13 Handlungen. Weg: Aufmaß vor Ort anfragen, Zur Express-Anfrage, Wohnbereich & Neubau, Alle ablehnen, scrollen, Weiter zu Schritt 2, Über 75 m², Einsatzort 35614 Aßlar, Weiter zu Schritt 3, Name, Telefon, E-Mail (fiktiv), scrollen. „Anfrage verbindlich absenden“ im Bild, nicht angetippt.
- A4 offen. Keine Fotos fertiger Arbeiten gefunden. Besucht: Startseite (vollständig), Referenzen, Wohnbereich & Neubau, Balkon & Terrasse, Musterbäder, Ratgeber & Blog. Überall technische Zeichnungen, Textkarten und Kundenstimmen. Nicht besucht: Ortsseiten außer Gießen, Bäder & Wellness, Treppen, Standorte-Liste. Die sechs Teilwege zählen zusammen rund 40 Handlungen; gespeichert ist nur der letzte (3 Handlungen).
- A5 gelöst, 4 Handlungen. Menü, Ratgeber, Vor-Ort-Beratung, Bildlauf. Dort steht „Unser 4-Stufen-Beratungsablauf“ und „kostenfrei“. Antwort nennt den Ablauf.
- A6 gelöst, 3 Handlungen. Menü, Standorte, Fliesenleger Gießen. Seite nennt „Fliesenverlegung & Badsanierung in Gießen, ca. 25 km ab Wetzlar“. Gießen steht schon nach einer Handlung im Menü.

BEFUNDE (Schwere, Schritt)
- hoch, A4: Keine Fotos fertiger Arbeiten auf den besuchten Wegen. Gegenprüfung durch Opus offen.
- mittel, A3: Drei gleich benannte Wege „Aufmaß“ (Seite, Kopf, Leiste), Verwechslungsgefahr.
- mittel, A4: „Referenzen & Bewertungen“ zweimal im Menü.
- mittel, A5: Ablauf nur über Ratgeber (drei Handlungen), nicht auf der Anfrageseite.
- mittel, A6: Gießen nicht auf der Startseite, Ortsseite erst nach drei Handlungen.
- gering: Banner verdeckt Karten und Knöpfe (A3, A4, A6). Voreinstellungen 15 - 35 m² und 1 - 3 Monate (A3). Telefon-Symbol oben ohne Beschriftung (A2). Fachbegriffe für Laien: Aufmaß, Restfeuchte, Untergrund, Kreuzfuge, Halbverband, Verbundabdichtung, DIN 18534, Stelzlager.

PRÜFUNG UND ERGEBNIS
Matrix `--matrix --satz e0`, meine Zeilen (P2, t768):
- A1 gelöst 0 · 2 Befunde
- A2 gelöst 1 · 2 Befunde
- A3 gelöst 13 · 5 Befunde
- A4 offen · 4 Befunde, 1 hoch
- A5 gelöst 4 · 2 Befunde
- A6 gelöst 3 · 2 Befunde
Die Matrix enthält auch Zeilen von P1 aus anderen Läufen, nicht von mir.

BILDBELEGE
- A1: /home/user/tezgel/_werkstatt/cache/probelauf/e0/P2-t768-A1/01-warte_auf.jpg
- A2: /home/user/tezgel/_werkstatt/cache/probelauf/e0/P2-t768-A2/01-tippe.jpg
- A3: /home/user/tezgel/_werkstatt/cache/probelauf/e0/P2-t768-A3/13-scrolle.jpg (Absendeknopf im Bild)
- A4: /home/user/tezgel/_werkstatt/cache/probelauf/e0/P2-t768-A4/03-tippe.jpg
- A5: /home/user/tezgel/_werkstatt/cache/probelauf/e0/P2-t768-A5/04-scrolle.jpg
- A6: /home/user/tezgel/_werkstatt/cache/probelauf/e0/P2-t768-A6/03-tippe.jpg

GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste)
- `_werkstatt/werkzeuge/PROBELAUF.md` §3 und das Briefing widersprechen sich bei den Testdaten (Name „Probe Läufer“ gegen „Erika Muster“, Telefon „0641 000000“ gegen „0172 0000000“). Bitte eine Fassung festlegen.
- `probelauf.mjs --hilfe`: Die Ansichten-Beispiele nennen `m375|d1440`, t768 funktioniert, die Hilfe ist unvollständig.
- `probelauf.mjs`: „scrolle unten“ in einer geöffneten Seitenschublade meldet 0 px, obwohl sich der Inhalt bewegt.

OFFENE FRAGEN
1. Im Schritt Kontaktdaten (A3) ist keine Einwilligungs-Checkbox sichtbar. Das Protokoll verlangt „Pflicht-Einwilligungen ankreuzen“. Fehlt sie oder wird sie nicht erkannt?
2. A4: Sind die nicht besuchten Wege (Ortsseiten, Bäder & Wellness, Treppen) zu prüfen, bevor der Befund „hoch“ bestätigt wird?
3. A4: Die Teilwege haben sich überschrieben. Soll jeder Weg einen eigenen Laufnamen bekommen?
4. A3: Die Bedienliste enthält mehrfach „verdeckt“ markierte Zeitknöpfe (08:30 Uhr usw.). Sind das unsichtbare Dubletten?
5. Persona wohnt in Gießen, die Testdaten nennen Aßlar. Bitte bestätigen, dass Aßlar für A3 gilt.

=== ENDE E0-PROBE-03 · BEREIT ZUR RÜCKGABE ===
