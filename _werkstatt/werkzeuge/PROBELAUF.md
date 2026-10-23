# PROBELAUF · Protokoll für Probeläufer · Kern v2 · E0-PRUEF-02d

Dieses Protokoll gilt für alle Probeläufe der Phase E0 und später. Probeläufer ändern es nicht. Änderungen nur per Entscheidung in `ENTSCHEIDUNGEN.md`.

## 1 Deine Rolle
- Du spielst **eine Person** aus Abschnitt 2. Du sprichst in ihrem Sinne, in eigenen Worten, mit ihrem Wissen und ihren Grenzen.
- Du nutzt **nur, was auf dem Bildschirm sichtbar ist**: das Bild (`NN-*.jpg`), die Bedienliste im Bild und den Ausschnitt-Text in `NN-aria.txt`.
- Du liest **keinen Code**, keine Dateien des Projekts, keine Seitenadressen außer der Startadresse und keine URLs, die du nicht gesehen hast.
- Du **gibst nicht auf**, bevor du jeden sichtbaren Weg versucht hast. Ein Umweg zählt; er gehört in den Lauf.
- Du kennst den **Zielzustand nicht**. Das Werkzeug prüft ihn nach jedem Schritt. Du erfährst nur den Auftrag.
- Du schönst nichts. Ein Befund ist ein Befund, auch wenn die Aufgabe gelöst wurde.

## 2 Personen (AUFTRAG §6)
| Kennung | Person | Ort (für A6) | Standardgerät | Systemschrift |
|---|---|---|---|---|
| P1 | Rentnerin, 72, will die Wanne gegen eine bodengleiche Dusche tauschen, Handy mit großer Systemschrift | Solms | m390 (390 × 844, Touch) | 200 % |
| P2 | Junge Familie im Neubau, ganzes Haus fliesen, Tablet | Gießen | t768 (768 × 1024, Touch) | 100 % |
| P3 | Vermieter, einzelne gesprungene Fliese und alte Fugen im Flur, Handy | Herborn | m360 (360 × 740, Touch) | 100 % |
| P4 | Hausbesitzer, auf dessen Balkon Wasser steht, Laptop | Braunfels | d1280 (1280 × 800, Maus) | 100 % |
| P5 | Kunde, Deutsch ist Zweitsprache, will einfach einen Termin, Handy | Limburg | m390 (390 × 844, Touch) | 100 % |

Gerätegruppen: **mobil** = Touch (m*, t*), **Desktop** = Maus (d*). Jede Person läuft einmal auf ihrem Standardgerät und einmal in der anderen Gruppe. Als Vergleichsgerät für Desktop-Personen (P4) dient m390; für mobile Personen (P1, P2, P3, P5) dient d1440. Die Wahl steht im Befund, wenn sie abweicht.

## 3 Aufgaben (der Auftrag, den du erhältst)
| Nr | Auftrag an dich |
|---|---|
| A1 | Sagen Sie in einem Satz, was dieser Betrieb macht und wo er arbeitet. |
| A2 | Finden Sie heraus, wie Sie den Betrieb anrufen oder ihm per WhatsApp schreiben können. |
| A3 | Fordern Sie einen Termin vor Ort an. Füllen Sie das Formular bis vor den Absendeknopf aus. |
| A4 | Finden Sie Bilder fertiger Arbeiten, die zu Ihrer eigenen Lage passen. Beschreiben Sie, was darauf zu sehen ist. |
| A5 | Finden Sie heraus, wie der Ablauf aussieht und ob der Termin vor Ort etwas kostet. |
| A6 | Finden Sie heraus, ob der Betrieb auch in Ihrem Ort arbeitet. |

Start ist immer `/`, außer die Lauf-Datei nennt eine andere Startadresse für einen Rauchlauf. Testdaten für A3 (Formular): Name „Probe Läufer“, Telefon „0641 000000“, E-Mail „probe@example.org“, Ort „35614 Aßlar“, Pflicht-Einwilligungen ankreuzen. Die Anfrage wird **nie abgesendet**.

## 4 Werkzeug
- Hilfe: `node probelauf.mjs --hilfe`; Aufträge: `node probelauf.mjs --aufgaben`.
- Ort des Werkzeugs: `_werkstatt/werkzeuge/probelauf.mjs`. Aufruf immer aus `_werkstatt/werkzeuge` mit `CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome`, `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, `RELAUNCH_SCRATCH="$SCRATCH"`.
- Lauf: `node probelauf.mjs <lauf.json> --satz <satz> --ziel "$SCRATCH/<Kennung>"`. Ausgabe je Lauf unter `<ziel>/<satz>/<lauf>/`.
- Jeder Lauf beginnt am Startpfad in einem frischen Browser. Er spielt die ganze Schrittfolge von vorn ab. Das ist gewollt: Wiederholung ist reproduzierbar.
- Arbeitsweise: Lauf-Datei um **einen** Schritt erweitern, Werkzeug erneut starten, letztes Bild ansehen, nächsten Schritt wählen. Die Konsole nennt das letzte Bild (Pfad) und eine **nummerierte Bedienliste** der sichtbaren Elemente.

### Lauf-Datei
```json
{ "person": "P1", "aufgabe": 2, "start": "/", "antwort": "Ihre Antwort in eigenen Worten",
  "befunde": [ { "schwere": "mittel", "schritt": 3, "text": "…" } ],
  "schritte": [ { "tippe": "WhatsApp-Chat starten" }, { "scrolle": "unten" } ] }
```
`person` setzt Ort, Standardgerät und Systemschrift. `--ansicht <gerät>` wählt ein anderes Gerät, `--schrift 200` überschreibt die Systemschrift.

### Schrittarten
| Schritt | Wirkung |
|---|---|
| `{"tippe": "<Name>"}` | Antippen (Touch) oder Klicken (Maus) eines sichtbaren Elements. Mehrdeutig: mit `"nr"` oder `"in"` wählen. |
| `{"tippe": {"nr": n}}` | Element Nr. n der nummerierten Bedienliste des letzten Bildes (vor diesem Schritt). |
| `{"fuelle": {"feld": "<Beschriftung>", "text": "…"}}` | Feld ausfüllen. |
| `{"waehle": {"feld": "<Beschriftung>", "option": "…"}}` | Auswahlliste oder Optionsgruppe. |
| `{"scrolle": "unten"\|"oben"\|"ende"\|"anfang"\|<px>}` | Bildlauf. |
| `{"wische": "links"\|"rechts", "an": "<Text>"}` | Waagerechte Leiste (Chips, Karussell). |
| `{"warte_auf": "<Text>"}` | Warten, bis der Text sichtbar ist (höchstens 10 s). |
| `{"zurueck": true}` | Zurück-Knopf des Browsers. |
| `{"taste": "Tab", "mal": n}` oder `"bis": "<Name>"` | Tastatur (nur im Modus Tastatur). |

## 5 Zählregeln
- Ein Schritt ist eine Besucherhandlung. Lesezeit zählt nicht. `warte_auf` zählt 0.
- Tippen oder Klicken zählt 1. Liegt das Ziel außerhalb des Bildes, kommt der nötige Bildlauf dazu (1 je angefangene Bildschirmhöhe).
- Feld ausfüllen zählt 1 je Feld. Auswahl zählt 1. Taste zählt 1 je Druck. Scrollen zählt 1 je angefangene Bildschirmhöhe.
- Zurück zählt 1.
- **Einwilligungsbanner** gehört zur Wirklichkeit. Steht er zwischen dir und dem Ziel, schließt du ihn mit der kürzesten Handlung („Alle ablehnen“). Das zählt. Ein vergeblicher Versuch zählt nicht und ist ein Befund.
- **Kein Idealweg**: Gehst du einen Irrweg, bleibt er in der Schrittfolge und zählt. Gestrichen werden nur Eingabefehler des Werkzeugs (falsch geschriebener Name).

## 6 Besondere Regeln (G5, Attrappen)
- **Telefon und WhatsApp** werden nicht ausgelöst. Ein Antippen von `tel:`, `whatsapp:`, `wa.me` oder `api.whatsapp.com` fängt das Werkzeug ab und protokolliert `kontakt_angetippt` als Attrappe. Keine Aufgabe gilt als gelöst, weil du angerufen oder geschrieben hättest.
- **Absenden ist verboten.** Tippst du auf einen Absendeknopf (Knopf vom Typ Absenden oder mit der Beschriftung „Absenden“, „Senden“, „Abschicken“), verweigert das Werkzeug den Schritt mit der Meldung „Absenden ist im Probelauf nicht erlaubt (A3 endet vor dem Absendeknopf)“. Dieser Schritt zählt nicht. A3 endet vor dem Absendeknopf.
- Formulare gehen nur an die Attrappe. Eine Anfrage an die Attrappe bleibt ohne Folge.
- Gehst du auf eine Seite außerhalb der Website, meldet das Werkzeug „Website verlassen“. Das zählt als Befund.

## 7 Befunde
| Schwere | Bedeutung | Beispiele |
|---|---|---|
| hoch | Aufgabe nicht oder nur mit Umweg lösbar; Bedienelement nicht erreichbar | Ziel mit Tastatur nicht erreichbar; Formular lässt sich nicht bis zum Absendeknopf füllen |
| mittel | Umweg von drei oder mehr Handlungen oder Verwechslungsgefahr | Zwei gleich benannte Wege zu Verschiedenem; Banner nur nach vielen Tabs schließbar |
| gering | Unschönheit | Chat-Blase verdeckt Text teilweise; Rückmeldung außerhalb des Bildes |

Jeder Befund nennt Schritt, Ort und Bild (`NN-*.jpg`). Befunde „hoch“ bestätigt ein frisch gestarteter Opus-Gegenprüfer. Bis dahin gelten sie als offen.

## 8 Antwort
Die Antwort ist das, was die Person am Ende sagt, in einem Satz und in eigenen Worten. Sie darf nichts enthalten, was die Person nicht gesehen hat. Prüfung: Das Werkzeug prüft die Antwort auf Schlüsselbegriffe. Eine Antwort, die das Werkzeug nicht erkennt, obwohl sie richtig ist, ist ein Befund des Werkzeugs und kein Befund der Seite.

## 9 Ergebnis je Lauf
Das Werkzeug schreibt `lauf.json` mit: Schritte bis Ziel und gesamt, gelöst ja oder nein, Antwort, Befunde, Zielprüfung je Bedingung, Anfragen an die Attrappe und Kontaktlinks. Die Matrix eines Satzes entsteht mit `node probelauf.mjs --matrix --satz <satz> --ziel "$SCRATCH/<Kennung>"`.

## 10 Matrix
5 Personen × 6 Aufgaben × 2 Gerätegruppen = **60 Aufgabenläufe** je Stand. Satz `<stand>`, Lauf `<person>-a<N>-<ansicht>`, z. B. `p1-a3-m390`. Gegenproben und Erkundungen im eigenen Satz, nie im Bewertungssatz.

## 11 Messbedingungen
Chromium über `CHROME_PATH`, Playwright 1.56.1, DPR 1, locale de-DE, Europe/Berlin, feste Uhrzeit Montag 12.10.2026 10:00, reducedMotion „no-preference“, Einwilligung „erstbesuch“ (Banner gehört dazu), `installSperre` (Formulare nur an die Attrappe, Fremd-Hosts leer). Systemschrift 200 % ist eine Näherung über die Wurzelschriftgröße (`html { font-size: 200% }`), in `bedingungen` vermerkt.
