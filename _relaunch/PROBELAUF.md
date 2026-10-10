# PROBELAUF · Festes Protokoll der Besucheraufgaben · Kriterium Z-04 · Kern v1.2 · P3-00g

Dieses Protokoll ist fest. Probeläufer ändern es nicht; Änderungen nur per Entscheidung in `ENTSCHEIDUNGEN.md`. Es gilt für den Ausgangsstand (Bezugswerte) und für jeden späteren Stand gleich, sonst sind die Schrittzahlen nicht vergleichbar.

## 1 Werkzeug
- Fernsteuerung: `_relaunch/werkzeuge/probelauf.mjs` (Node 22, Playwright 1.56.1, Chromium). Hilfe: `node probelauf.mjs --hilfe`; Aufträge: `node probelauf.mjs --aufgaben`.
- Lauf: `node probelauf.mjs <lauf.json> --satz <satz>` aus `_relaunch/werkzeuge/`. Jeder Aufruf startet in einem frischen Browser-Kontext am Startpfad und spielt die ganze Schrittfolge von vorn ab (zustandslos, reproduzierbar). Der Probeläufer baut seinen Weg also Schritt für Schritt: Schritt anhängen → Lauf erneut starten → letztes Bild ansehen → nächsten Schritt wählen.
- Lauf-Datei (Ablage: `_relaunch/cache/probelauf/eingaben/<satz>/a<N>-<ansicht>-<eingabe>.json`):
  ```json
  { "aufgabe": 4, "start": "/", "ansicht": "m375", "eingabe": "touch",
    "antwort": "Was der Besucher herausgefunden hat, in einem Satz",
    "befunde": [ { "schwere": "mittel", "schritt": 6, "text": "…" } ],
    "schritte": [ { "tippe": "Standorte" }, { "scrolle": "unten" } ] }
  ```
- Ausgabe je Schritt unter `_relaunch/cache/probelauf/<satz>/<lauf>/`: `NN-<art>.jpg` (sichtbarer Ausschnitt), `NN-aria.txt` (offene Ebenen, Kopf, Hauptbereich – gekürzt), `NN-sichtbar.txt` (Bedienelemente im Bild mit Rolle, Name, Verdeckung), `lauf.json` (Kopf `{satz, base, bedingungen, erstellt}`, URL, H1, Fokus, Zählung, Zielprüfung, Anfragen an die Attrappe, Konsolenfehler). Konsole: kompakte Schrittliste; Abbruch beim ersten Fehler mit Grund und Kandidatenliste (Exit 2).
- Übersicht eines Satzes: `node probelauf.mjs --matrix --satz <satz>` → `cache/probelauf/<satz>/matrix.json` (mit `--beleg` zusätzlich `belege/<satz>/probelauf.json`, nur wenn das Paket dort Schreibrechte gibt).

### Schrittarten
| Schritt | Wirkung | Touch | Maus | Tastatur |
|---|---|---|---|---|
| `{"tippe": "<sichtbarer Text oder Name>"}` | Auflösung `getByRole(name)` → `getByText` → `getByLabel`, je erst genau, dann enthaltend; nur für Besucher sichtbare Elemente. Mehrere Treffer: eindeutig, wenn genau einer frei im Bild liegt (bzw. genau einer im Bild); sonst Abbruch mit Kandidatenliste. Wählen mit `"nr": k` oder `"in": "<Name einer Navigation/eines Dialogs/Abschnitts>"`. | tap | click | verboten |
| `{"taste": "Tab"}` · `"mal": n` · `"bis": "<Name>"` (`"max"`) | Taste drücken; mit `bis` so oft, bis der Fokus auf einem Element mit diesem Namen steht (Abbruch, wenn der Fokus zum Anfang zurückkehrt) | erlaubt | erlaubt | einzige Bewegungsart |
| `{"fuelle": {"feld": "<Beschriftung>", "text": "…"}}` | Feld antippen/anklicken und ausfüllen; ohne `feld` in das fokussierte Feld | ✓ | ✓ | nur fokussiertes Feld |
| `{"waehle": {"feld": "<Beschriftung>", "option": "…"}}` | Auswahlliste bzw. Optionsgruppe | ✓ | ✓ | nur fokussierte Auswahlliste |
| `{"scrolle": "unten"\|"oben"\|"ende"\|"anfang"\|<px>}` | Mausrad/Wischen senkrecht; „unten“ = 85 % einer Bildschirmhöhe | ✓ | ✓ | verboten (PageDown/Space per `taste`) |
| `{"wische": "links"\|"rechts", "an": "<Text in der Leiste>"}` | waagerechte Leiste (Chips, Karussell) seitlich bewegen; „links“ zeigt, was rechts liegt | ✓ | ✓ | verboten |
| `{"warte_auf": "<Text>"}` | warten, bis der Text sichtbar ist (höchstens 10 s) | ✓ | ✓ | ✓ |
| `{"zurueck": true}` | Zurück-Knopf des Browsers | ✓ | ✓ | ✓ |

### Abbrüche lesen
| Meldung | Bedeutung | Was der Probeläufer tut |
|---|---|---|
| `nicht gefunden` (mit ähnlichen Bedienelementen) | kein sichtbares Element dieses Namens | Name nach dem Bild korrigieren (Eingabefehler, zählt nicht); gibt es das Gesuchte für einen Besucher wirklich nicht → anderer Weg, ggf. Befund |
| `mehrdeutig` (mit Kandidatenliste) | mehrere sichtbare Treffer, keiner eindeutig frei im Bild | mit `"nr"` oder `"in"` den gemeinten wählen (zählt nicht) |
| `nicht bedienbar: … verdeckt durch …` | Ziel liegt unter einer anderen Ebene | Befund; Ebene mit der kürzesten Handlung freimachen (zählt), dann erneut |
| `nicht erreichbar` / `nicht erreicht` (Tastatur, mit Fokusspur) | der Fokus kommt nicht hin | Befund (hoch, wenn das Ziel mit der Tastatur gar nicht erreichbar ist) |
| `Werkzeug:` / `Werkzeugfehler` | Abfrage unter Last nicht lesbar | kein Befund – Lauf wiederholen |

`tel:`, `mailto:` und `sms:` werden nicht ausgelöst (zählen als 1, „Website verlassen“). Fremd-Hosts (z. B. WhatsApp) liefert die Sperre leer aus; das Werkzeug vermerkt „Website verlassen“. Keine Aufgabe gilt durch Anrufen, Mailen oder WhatsApp als gelöst.

## 2 Die fünf Aufgaben
Start ist immer `/`. Der Probeläufer erhält **nur** den Auftrag (Spalte 2), nicht den Zielzustand und nicht den Zielweg aus KERN K-002. Er nutzt kein Insiderwissen: keine eingetippten URLs, keine Kenntnis von Seitennamen, Menüaufbau oder Seitentexten außer dem, was im aktuellen Bild steht.

| Nr | Auftrag an den Besucher | Objektiver Zielzustand (prüft das Werkzeug nach jedem Schritt) | `antwort` muss nennen |
|---|---|---|---|
| 1 | „Sie möchten Ihr Bad barrierefrei umbauen. Finden Sie die passende Leistungsseite.“ | Aktuelle Seite liegt unter `/bad/…` oder `/leistungen/…` **und** ihre H1 enthält „barrierefrei“ (Groß/Klein egal). | Titel der gefundenen Seite |
| 2 | „Prüfen Sie, wie lange es den Betrieb gibt und wie Kunden ihn bewerten.“ | (a) „2008“ oder „über N Jahre(n)“ stand unverdeckt im Bild **und** (b) eine Note der Form „x,y“ stand im Bild zusammen mit „Bewertung/Rezension/Sterne/Kundenstimme“. (a) und (b) dürfen in verschiedenen Schritten erfüllt sein. | Jahr bzw. Dauer und Note mit Anzahl |
| 3 | „Fordern Sie einen kostenlosen Vor-Ort-Termin an und senden Sie die Anfrage ab.“ | (a) Ein `POST /api/anfrage` ging an die Attrappe **und** (b) danach stand eine Bestätigung im Bild („danke/erfolgreich/eingegangen/gesendet/übermittelt/erhalten“ oder die Kennung `TEZ-26-TEST`). Testdaten: Name „Probe Läufer“, Telefon „0641 000000“, E-Mail „probe@example.org“, Ort „35614 Aßlar“, Pflicht-Einwilligungen ankreuzen. | Bestätigungstext |
| 4 | „Prüfen Sie, ob der Betrieb auch in Butzbach arbeitet.“ | Eines von: (a) Ortsseite geöffnet, deren H1 „Butzbach“ enthält; (b) „Butzbach“ stand unverdeckt im Bild, im selben Bild ein Hinweis „Einsatz…/Einzugsgebiet/Standort/Region/vor Ort“. | ja/nein und woran erkannt |
| 5 | „Finden Sie heraus, wie der Ablauf einer Badsanierung ist und ob es Förderung gibt.“ | (a) Eine Überschrift „Ablauf / in N Schritten zu… / Schritt für Schritt / So läuft…“ (oder ein kurzer Text „Ablauf“) stand unverdeckt im Bild **und** (b) eine Überschrift mit „Förder…/Zuschuss/Zuschüsse“ stand unverdeckt im Bild; verschiedene Schritte erlaubt. | Ablauf in Stichworten, Förderung ja/nein |

„Im Bild“ heißt: im sichtbaren Ausschnitt, sichtbar (nicht `display:none`, `visibility:hidden`, Deckkraft 0) und an seinem Anfang nicht von einer anderen Ebene (Banner, Menü, Chat-Blase) überdeckt. Gezählt wird bis zum **ersten** Schritt, nach dem alle Bedingungen erfüllt sind (`ziel.handlungen_bis_ziel`). Schritte danach (z. B. eine Bestätigung öffnen) sind erlaubt, zählen aber nicht zur Vergleichszahl.

## 3 Matrix
5 Aufgaben × {`m375` Touch, `d1440` Maus, `d1440` Tastatur} = 15 Läufe; mobil mit Tastatur entfällt. Laufname `a<N>-<ansicht>-<eingabe>` (z. B. `a3-d1440-tastatur`), Satz `ausgangsstand` für die Bezugswerte, später der Wellen- bzw. Phasenname. Gegenproben und Erkundungen nie im Bewertungssatz (eigener Satz, z. B. `gegenprobe`, `erkundung`).

## 4 Zählregeln
- Ein Schritt = eine Besucherhandlung. Lesezeit zählt nicht.
- Tippen/Klick = 1. Liegt das Ziel außerhalb des Bildes, zählt das Werkzeug den nötigen Bildlauf dazu (1 je angefangene Bildschirmhöhe Abstand).
- Taste = 1 je Druck (`"bis"`: Zahl der Drücke).
- Feld ausfüllen = 1 je Feld (in der Tastatur zählen die Tabs dorthin zusätzlich); Auswahl = 1.
- Scrollen = 1 je angefangene Bildschirmhöhe; Wischen in einer Leiste = 1 je angefangene Leistenbreite.
- Zurück = 1. Warten = 0.
- **Einwilligungsbanner** (gehört zur Wirklichkeit, Einwilligung „erstbesuch“): Er bleibt stehen, solange er die nächste Handlung nicht verhindert. Meldet das Werkzeug „verdeckt durch … Cookie-Einwilligungsbanner“ oder steht das Ziel unter ihm, schließt der Probeläufer ihn mit der kürzesten Handlung („Alle ablehnen“; in der Tastatur so viele Tabs, wie nötig sind) – das zählt. Der vergebliche Versuch zählt nicht, ist aber ein Befund.
- **Kein Idealweg**: Der Probeläufer geht, wie ein Besucher ohne Vorwissen gehen würde. Ein Irrweg, den er tatsächlich eingeschlagen hat (falsches Menü, falsche Seite), bleibt mit dem Rückweg in der Schrittfolge und zählt. Gestrichen werden dürfen nur Werkzeug-Eingabefehler (Abbruch „nicht gefunden“/„mehrdeutig“ wegen eines falsch geschriebenen Namens).
- Ergebnis je Lauf (steht in `lauf.json`, Übersicht per `--matrix`): Schritte bis Ziel und gesamt, gelöst ja/nein, Antwort, Reibungsbefunde mit Schwere.

## 5 Reibung und Schwere
| Schwere | Bedeutung | Beispiele |
|---|---|---|
| hoch | Aufgabe nicht oder nur mit Umweg lösbar; Bedienelement nicht erreichbar | Ziel mit Tastatur nicht erreichbar; Absenden scheitert; Pflichtfeld ohne erkennbare Fehlermeldung |
| mittel | Umweg ≥ 3 Schritte oder Verwechslungsgefahr | Ziel nur über 3+ zusätzliche Handlungen; zwei gleich benannte Wege zu Verschiedenem; Banner nur nach vielen Tabs schließbar |
| gering | Unschönheit | Chat-Blase verdeckt Text teilweise; Rückmeldung nach einem Tippen außerhalb des Bildes |

Jeder Befund nennt Schritt, Ort und das Bild (`NN-*.jpg`). Befunde „hoch“ bestätigt ein frisch gestarteter Opus-Gegenprüfer (AUFTRAG, Rolle Probeläufer); bis dahin gelten sie als offen.

## 6 Messbedingungen (stehen in jeder `lauf.json`)
Chromium (Playwright 1.56.1), Ansichten aus `lib.mjs` (`m375` 375 × 812 Touch, `d1440` 1440 × 900), DPR 1, locale de-DE, Europe/Berlin, feste Uhrzeit Montag 12.10.2026 10:00, reducedMotion „no-preference“, Einwilligung „erstbesuch“, `installSperre` (Formulare nur an die Attrappe, Fremd-Hosts leer, andere schreibende Anfragen abgebrochen), lokaler Server (`assertLocal`). Warten nur über Zustandsabfragen mit Obergrenze (Netz ruhig, DOM ruhig, endliche Animationen, Schriften; Banner-Erscheinen höchstens 8 s; Bedienbarkeit je Handlung höchstens 30 s). Höchstens 2 Browser-Kontexte gleichzeitig.

## 7 Bezugswerte Ausgangsstand (`127.0.0.1:4310`, Satz `ausgangsstand`)
| Aufgabe | m375 Touch | d1440 Maus | d1440 Tastatur |
|---|---|---|---|
| 1 | folgt (Probeläufer-Paket) | folgt | folgt |
| 2 | folgt | folgt | folgt |
| 3 | folgt | folgt | folgt |
| 4 | gelöst · 8 Schritte | gelöst · 1 Schritt | gelöst · 8 Schritte |
| 5 | folgt | folgt | folgt |

Wege Aufgabe 4 (Lauf-Dateien unter `cache/probelauf/eingaben/ausgangsstand/`): Touch – „Alle ablehnen“ (Banner liegt über dem Mobilmenü), Menü, „Standorte“, „Alle 13 Standorte“, 1 Bildlauf, 3× Wischen in der Stadt-Leiste → „Butzbach 35 km“ unter „Unser 45-km-Einsatzgebiet“ (ohne Wischen: 10 Schritte, Satz `erkundung`). Maus – Klick „Standorte“ → Stadt-Leiste mit „Butzbach 35 km“ im ersten Bild (Banner bleibt stehen, verdeckt nichts Nötiges). Tastatur – 7× Tab bis „Standorte“, Enter. Banner-Probe Tastatur (`banner-d1440-tastatur`): „Alle ablehnen“ erst nach 190× Tab erreichbar.

Z-04 vergleicht jeden späteren Lauf mit dieser Tabelle (Schrittzahl bis Ziel ≤ Bezugswert, gelöst, 0 Befunde „hoch“).
