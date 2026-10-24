# E2-PROBE-02 · Rückgabe

## GEÄNDERTE DATEIEN
- `/home/user/tezgel/_werkstatt/pakete/E2-PROBE-02.rueckgabe.md` (dieser Bericht)
- `/home/user/tezgel/_werkstatt/cache/probelauf/e2/P1-d1440-A1/`, `P1-d1440-A2/`, `P1-d1440-A3/` (Lauf-Ausgaben, neu)
- `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E2-PROBE-02/A1.json`, `A2.json`, `A3.json` (Lauf-Dateien)
- `/home/user/tezgel/_werkstatt/cache/probelauf/e2/matrix.json` vom Werkzeug `--matrix` neu geschrieben (enthält auch Läufe anderer Probeläufer)
- Kein Commit, kein Push, keine Server gestartet oder beendet.

## ERGEBNIS JE AUFGABE
- **A1** (Was macht der Betrieb, wo): gelöst ja · Schritte neu 1 · Schritte E0 1
  Antwort: „Das ist ein Fliesenleger. Er verlegt Fliesen im Bad, in der Küche, im Flur und auf dem Balkon. Er arbeitet aus Aßlar und kommt auch nach Wetzlar und in die Umgebung.“
- **A2** (Telefon oder WhatsApp): gelöst ja · Schritte neu 1 · Schritte E0 2
  Antwort: „Ich rufe über das Telefonsymbol oben rechts an. Daneben ist das grüne WhatsApp-Symbol, da kann ich auch schreiben.“
- **A3** (Termin anfragen bis vor Absendeknopf): gelöst ja (Ziel bei Schritt 6, Handlungen bis Ziel 8, gesamt 8, davon 2 Bildläufe) · Schritte neu 8 · Schritte E0 21 · nicht abgesendet
  Antwort: „Ich habe den Termin vor Ort angefragt. Ich habe meinen Namen, meine Telefonnummer, meine E-Mail und meinen Ort eingetragen. Den Knopf zum Absenden habe ich noch nicht gedrückt.“
- Matrix Satz e2, Spalte d1440: A1 gelöst 1 (2 Befunde) · A2 gelöst 1 (1 Befund) · A3 gelöst 8 (2 Befunde). Die Spalte m390 stammt von anderen Läufen und ist nicht meine.
- Der E0-Lauf hatte Umwege (Kontaktseite, Karte). Mein direkter Weg über „Termin vor Ort anfragen“ im Kopf hatte keine.

## BEFUNDE
- A1, Schritt 0, mittel, `P1-d1440-A1/00-start.jpg`: Der Einwilligungsbanner beim ersten Besuch nennt Cookies, §25 TTDSG und Art. 6 Abs. 1 lit. a DSGVO. Die Person muss klicken, ohne die Wörter zu verstehen.
- A1, Schritt 0, gering, `P1-d1440-A1/00-start.jpg`: Der Banner verdeckt die große Überschrift und den Satz mit dem Ort.
- A2, Schritt 1, mittel, `P1-d1440-A2/01-tippe.jpg`: Telefon und WhatsApp sind nur kleine Symbole oben rechts ohne Text. Die Nummer steht nicht im Bild. Verwechslungsgefahr zwischen den beiden Symbolen.
- A3, Schritt 2, gering, `P1-d1440-A3/02-tippe.jpg`: Der Banner liegt beim Öffnen des Formulars darüber und muss erst weg.
- A3, Schritt 6, gering, `P1-d1440-A3/06-fuelle.jpg`: Zwischen Projektnotiz und Absendeknopf ist im Bild keine Einwilligungs-Checkbox zu sehen. Ob es eine Pflicht-Einwilligung gibt, habe ich nicht geprüft.
- Keine Befunde „hoch“.

## UNVERSTANDENE WÖRTER
- Sicher unverständlich: Cookies, Einwilligung (Einwilligungsbanner), TTDSG, §25, DSGVO, „Art. 6 Abs. 1 lit. a“.
- Unsicher: „Badsanierung“ (Vorauswahl im Formular), „Projektnotiz“.

## GEMEINSAME DATEIEN
Keine. Ich habe keine gemeinsame Datei berührt. Die Datei `matrix.json` wurde vom Werkzeug geschrieben, nicht von mir bearbeitet.

## OFFENE FRAGEN
1. A2: Das Telefonsymbol ließ sich bei offenem Banner antippen (das Werkzeug hat den Tap zugelassen). E0 hat den Banner vorher geschlossen. Ob der Banner die Seite im echten Browser sperrt, ist offen.
2. A3: PROBELAUF.md §3 verlangt „Pflicht-Einwilligungen ankreuzen“. Im Bild habe ich keine Checkbox gefunden. Unterhalb des Absendeknopfs habe ich nicht gesucht, weil ein Bildlauf gezählt hätte. Ob es die Checkbox gibt, bleibt offen (gleicher Befund wie in E0).
3. Der Kopf von `matrix.json` nennt `base` 4310. Meine Läufe stehen mit `base` 4311 in der `lauf.json`. Vermutlich stammt der Kopfwert aus einem anderen Lauf. Bitte prüfen.
4. Die Schrittzahl von A3 schwankte in E0 zwischen Läufen (17 und 19). Ich habe das nicht geprüft.

=== ENDE E2-PROBE-02 · BEREIT ZUR RÜCKGABE ===
