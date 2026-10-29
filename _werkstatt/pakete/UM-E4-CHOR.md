# UM-E4-CHOR-nn · Choreografie einer Hauptansicht · Rolle Prüfer · Modell Haiku · nur Bericht

## Zuordnung
Nummer → Seite (HAUPTANSICHTEN.json ohne `/`):

| Nr. | Seite |
|---|---|
| 01 | `/bad` |
| 02 | `/bad/badsanierung` |
| 03 | `/bad/barrierefreies-bad` |
| 04 | `/leistungen` |
| 05 | `/fliesen` |
| 06 | `/balkon-terrasse` |
| 07 | `/referenzen` |
| 08 | `/ueber-uns` |
| 09 | `/kontakt` |
| 10 | `/standorte/wetzlar` |
| 11 | `/blog` |

## Prüfen (KERN K-007 Signatur, K-008 Bewegung, K-003 Prinzipien; Referenz ist `/`)
1. **Auftritte mit Gewicht:** höchstens einer je Bildschirmhöhe; Auftritte auf höchstens 50 % der Abschnitte.
   - Zählen mit `node /home/user/tezgel/_werkstatt/werkzeuge/bewegung.mjs --modus register --seite <Seite> --base <BASE> --ansicht d1440` und `--ansicht m390`.
   - Dazu die Abschnitte im Code der Vorlage oder Seite.
2. **Signaturmoment:** Gibt es auf der Seite einen erkennbaren Moment (Plan, Treppe, Lineal, Vergleich …), und ist er der einzige mit Gewicht in seinem Bildschirm?
3. **Leitfaden** wie auf `/`:
   - Kopf nur auf Linie;
   - keine doppelten Kreuze;
   - Kopf nie neben Überschrift oder Formular.
   Bilder dazu mit `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/fix/sicht2/bewegt.mjs <BASE> <ZIEL> m390,d1440 <Seite>`.
4. **Rhythmus:** nicht drei gleich gebaute Abschnitte in Folge (K-003 Prinzip 4), ein bewusster Bruch je Desktop-Bildschirm.

## Regeln
- `BASE` = `http://127.0.0.1:4325` (Produktionsbau des aktuellen Stands, läuft).
- Bilder nur in `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/chor/<nn>/`.
- Nur lesen; kein Server starten oder beenden; kein Git mit Schreibwirkung.
- Befunde mit Datei und Zeile im Code, Schwere (hoch/mittel/gering), Bildpfad und Vorschlag.
- Nichts an Wortlaut, Einwilligung, Rechtstexten, Firmendaten, Formularen oder Kundenstimmen vorschlagen (G8). Nichts an B-01 (E-078).

## Rückgabe
Der Bericht als Text, im Aufbau von `_werkstatt/berichte/UM-E4-CHOR-nn.md`:
- Zählwerte;
- Signaturmoment;
- Befunde als Tabelle;
- Fazit in zwei Sätzen.
Der Orchestrator legt die Datei ab.
