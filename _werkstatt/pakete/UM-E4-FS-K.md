# UM-E4-FS-K · Zuordnung der offenen Darstellungsbefunde · Rolle Kundschafter · Modell Haiku · nur Bericht

## Ziel
Die Befunde Nr. 2 bis 17 aus `_werkstatt/belege/um-e0/runde5-befunde.json` (Browserprüfung Runde 5; Nr. 1 bleibt laut E-065) sind je Befund zugeordnet:
- Seite und Gerät;
- verantwortliche Datei und Zeile im heutigen Code (HEAD);
- Ursache in einem Satz;
- noch vorhanden (ja / nein / unklar), geprüft am Code. Fehlt ein Beleg, mit Vermerk „am Code nicht entscheidbar“;
- passendes Folgepaket: FS-FUGEN (Trennfugen, Nr. 2, 5, 6, 10, 11, 12, 15, 16, 17) oder FS (Darstellung, Nr. 3, 4, 7, 8, 9, 13, 14).

## Regeln
- Nur lesen: Code, Belege, KERN. Keine Datei außer dem Bericht schreiben. Kein Git mit Schreibwirkung.
- Seit Runde 5 hat sich viel geändert (E3, UM-E3-FIX, FIX2). Prüfe jeden Befund gegen den heutigen Code; die Datei aus dem Beleg allein reicht nicht.

## Rückgabe
Bericht `_werkstatt/berichte/UM-E4-FS-K.md`: eine Tabelle Nr. · Seite/Gerät · Datei:Zeile · Ursache · noch vorhanden · Paket. Darunter die offenen Fragen.
