
# BILDER-BEWEGUNG: Bilder und Bewegung am E3-Tor

**Stand:** Commit `8debc92`, Server 4310 (Produktionsbuild). Lauf am 2026-10-11, 23:06 bis 23:31 UTC.
**Prüfer:** Arbeitsmodell. Keine Quell-, Test- oder Werkzeugdateien geändert, kein Commit, kein Push, keine Erlaubnisliste berührt.
**Rohbelege:** `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/belege-roh/e3-tor/` (Bildsatz, Ersatz, Abschnitte, Bewegung, Logs in `logs/`).

Die Abschnittsbilder und Bewegungsbilder sind nur Messung und Stichprobe. Die Sichtabnahme entscheidet über die Befunde in der Überlappung.

## 1. Bildsatz (normales Protokoll, `bildsatz.mjs --satz e3-tor --hauptansichten`)

Gesamt: 398 Aufnahmen, Fehler 0, Nicht-200 0, Überlauf-Befunde 0, Überlappung 110 Befunde (sticky 2, textkreuzung 108), Konsolenmeldungen 0.

| Seite | Ansicht | HTTP | Höhe (px) | Aufnahmen | Konsole | Überlauf | Überlappung |
|---|---|---|---|---|---|---|---|
| `/` | m390 | 200 | 27104 | 12 | 0 | 0 | 25 (textkreuzung 25) |
| `/` | t768 | 200 | 22557 | 12 | 0 | 0 | 0 |
| `/` | d1440 | 200 | 16135 | 12 | 0 | 0 | 0 |
| `/bad` | m390 | 200 | 12798 | 12 | 0 | 0 | 0 |
| `/bad` | t768 | 200 | 9361 | 10 | 0 | 0 | 0 |
| `/bad` | d1440 | 200 | 7812 | 9 | 0 | 0 | 0 |
| `/leistungen` | m390 | 200 | 18172 | 12 | 0 | 0 | 0 |
| `/leistungen` | t768 | 200 | 12746 | 12 | 0 | 0 | 0 |
| `/leistungen` | d1440 | 200 | 9960 | 12 | 0 | 0 | 0 |
| `/leistungen/bad` | m390 | 200 | 16047 | 12 | 0 | 0 | 0 |
| `/leistungen/bad` | t768 | 200 | 12372 | 12 | 0 | 0 | 0 |
| `/leistungen/bad` | d1440 | 200 | 9869 | 11 | 0 | 0 | 0 |
| `/standorte` | m390 | 200 | 15569 | 12 | 0 | 0 | 0 |
| `/standorte` | t768 | 200 | 11262 | 11 | 0 | 0 | 0 |
| `/standorte` | d1440 | 200 | 9686 | 11 | 0 | 0 | 0 |
| `/standorte/wetzlar` | m390 | 200 | 16851 | 12 | 0 | 0 | 0 |
| `/standorte/wetzlar` | t768 | 200 | 12328 | 12 | 0 | 0 | 0 |
| `/standorte/wetzlar` | d1440 | 200 | 10722 | 12 | 0 | 0 | 0 |
| `/fliesen` | m390 | 200 | 18576 | 12 | 0 | 0 | 0 |
| `/fliesen` | t768 | 200 | 13381 | 12 | 0 | 0 | 0 |
| `/fliesen` | d1440 | 200 | 11557 | 12 | 0 | 0 | 0 |
| `/ueber-uns` | m390 | 200 | 12725 | 12 | 0 | 0 | 0 |
| `/ueber-uns` | t768 | 200 | 8971 | 9 | 0 | 0 | 0 |
| `/ueber-uns` | d1440 | 200 | 7639 | 9 | 0 | 0 | 0 |
| `/kontakt` | m390 | 200 | 11763 | 12 | 0 | 0 | 0 |
| `/kontakt` | t768 | 200 | 8828 | 9 | 0 | 0 | 0 |
| `/kontakt` | d1440 | 200 | 6915 | 8 | 0 | 0 | 0 |
| `/fliesen/konfigurator` | m390 | 200 | 14318 | 12 | 0 | 0 | 39 (textkreuzung 39) |
| `/fliesen/konfigurator` | t768 | 200 | 10178 | 10 | 0 | 0 | 22 (textkreuzung 22) |
| `/fliesen/konfigurator` | d1440 | 200 | 8766 | 10 | 0 | 0 | 22 (textkreuzung 22) |
| `/blog` | m390 | 200 | 12272 | 12 | 0 | 0 | 0 |
| `/blog` | t768 | 200 | 8652 | 9 | 0 | 0 | 0 |
| `/blog` | d1440 | 200 | 7147 | 8 | 0 | 0 | 2 (sticky 2) |
| `/blog/rutschfeste-fliesen-r-klassen` | m390 | 200 | 15689 | 12 | 0 | 0 | 0 |
| `/blog/rutschfeste-fliesen-r-klassen` | t768 | 200 | 10992 | 11 | 0 | 0 | 0 |
| `/blog/rutschfeste-fliesen-r-klassen` | d1440 | 200 | 9761 | 11 | 0 | 0 | 0 |

Überlappung, Befundarten: `sticky` = fixierte Ebene überdeckt Text; `textkreuzung` = zwei Textrechtecke kreuzen sich.

Auffällige Stellen (Rechteck aus dem Werkzeug, Vorkommen je Ansicht):

- `/blog` d1440, 2 sticky: Text „06441 / 44 83 567“ und „Aufmaß anfragen“ bei y≈3622 durch ein sticky-Element des Seitenkopfs bzw. der Seitenleiste überdeckt. Sichtprüfung nötig.
- `/fliesen/konfigurator` m390 39, t768 22, d1440 22, textkreuzung: alle Befunde betreffen Text in `details.group > p` (Richtwert-Hinweise, Ausklappinhalt mit Höhen von 3 bis 14 px). Vermutlich verdeckter Inhalt geschlossener Ausklappelemente, am Bild zu prüfen.
- `/` m390 25, textkreuzung: Text in `details.group > ul > li > span` (u. a. „Fugenarme XXL-Fliesen …“, „Indirekt illuminierte Wandnischen …“), Höhen 3 bis 13 px. Gleiches Muster wie oben, am Bild zu prüfen.

## 2. Abschnittsbilder (`abschnitte.mjs`, Ansichten m390 und d1440)

| Seite | Ordner | m390 Bilder | d1440 Bilder | HTTP | Konsole | Fehler |
|---|---|---|---|---|---|---|
| `/` | `abschnitte/start/` | 22 | 17 | 200/200 | 0/0 | -/- |
| `/bad` | `abschnitte/__bad/` | 11 | 9 | 200/200 | 0/0 | -/- |
| `/leistungen` | `abschnitte/__leistungen/` | 15 | 10 | 200/200 | 0/0 | -/- |
| `/leistungen/bad` | `abschnitte/__leistungen__bad/` | 16 | 13 | 200/200 | 0/0 | -/- |
| `/standorte` | `abschnitte/__standorte/` | 15 | 11 | 200/200 | 0/0 | -/- |
| `/standorte/wetzlar` | `abschnitte/__standorte__wetzlar/` | 16 | 11 | 200/200 | 0/0 | -/- |
| `/fliesen` | `abschnitte/__fliesen/` | 16 | 12 | 200/200 | 0/0 | -/- |
| `/ueber-uns` | `abschnitte/__ueber-uns/` | 11 | 8 | 200/200 | 0/0 | -/- |
| `/kontakt` | `abschnitte/__kontakt/` | 11 | 9 | 200/200 | 0/0 | -/- |
| `/fliesen/konfigurator` | `abschnitte/__fliesen__konfigurator/` | 14 | 11 | 200/200 | 0/0 | -/- |
| `/blog` | `abschnitte/__blog/` | 11 | 7 | 200/200 | 0/0 | -/- |
| `/blog/rutschfeste-fliesen-r-klassen` | `abschnitte/__blog__rutschfeste-fliesen-r-klassen/` | 7 | 4 | 200/200 | 0/0 | -/- |

Summe: 12 Seiten, 2 Ansichten, 24 Ordner. Bilder gesamt: 287. Keine Fehler, keine Konsolenmeldungen, alle HTTP 200.

## 3. Ersatzpfad (`bildsatz.mjs --satz e3-tor-ersatz --ersatzpfad`, Seiten /, /leistungen, /ueber-uns, /standorte)

Kennzahlen: Aufnahmen 136, Fehler 0, Nicht-200 0, Überlauf 0, Überlappung 25 (textkreuzung 25), Konsole 0. Animationen: Zeitlimit in 0 Ansichten, Restzahl laufender Animationen 0.

| Seite | Ansicht | Höhe normal / Ersatz | Aufnahmen normal / Ersatz | Stichprobe Aufnahmen 1 bis 3: mittlere Abweichung / Anteil Pixel über 24 |
|---|---|---|---|---|
| `/` | d1440 | 16135/16135 | 12/12 | 0.0 / 0.0 %; 0.0 / 0.0 %; 0.0 / 0.0 % |
| `/leistungen` | d1440 | 9960/9960 | 12/12 | 0.0 / 0.0 %; 1.1 / 1.2 %; 0.4 / 0.3 % |
| `/standorte` | d1440 | 9686/9686 | 11/11 | 0.0 / 0.0 %; 0.0 / 0.0 %; 0.0 / 0.0 % |
| `/ueber-uns` | d1440 | 7639/7639 | 9/9 | 0.0 / 0.0 %; 0.0 / 0.0 %; 0.0 / 0.0 % |
| `/` | m390 | 27104/27104 | 12/12 | 0.0 / 0.0 %; 0.1 / 0.0 %; 0.0 / 0.0 % |
| `/leistungen` | m390 | 18172/18172 | 12/12 | 0.0 / 0.0 %; 0.0 / 0.0 %; 0.0 / 0.0 % |
| `/standorte` | m390 | 15569/15569 | 12/12 | 0.0 / 0.0 %; 0.0 / 0.0 %; 0.0 / 0.0 % |
| `/ueber-uns` | m390 | 12725/12725 | 12/12 | 0.0 / 0.0 %; 0.0 / 0.0 %; 0.0 / 0.0 % |
| `/` | t768 | 22557/22557 | 12/12 | 0.0 / 0.0 %; 0.0 / 0.0 %; 0.0 / 0.0 % |
| `/leistungen` | t768 | 12746/12746 | 12/12 | 0.0 / 0.0 %; 0.0 / 0.0 %; 0.0 / 0.0 % |
| `/standorte` | t768 | 11262/11262 | 11/11 | 0.0 / 0.0 %; 0.0 / 0.0 %; 0.0 / 0.0 % |
| `/ueber-uns` | t768 | 8971/8971 | 9/9 | 0.0 / 0.0 %; 0.0 / 0.0 %; 0.0 / 0.0 % |

Ergebnis: Aufnahmenzahl, Seitenhöhe und Überlappungsbefunde stimmen mit dem normalen Bildsatz überein. In der Stichprobe (Aufnahmen 1 bis 3) ist der Unterschied praktisch null. Die größte Abweichung ist /leistungen d1440 Aufnahme 2 mit 1,1 mittlerer Abweichung und 1,2 % Pixeln über 24. Die Stichprobe deckt nur den Anfang der Seiten ab. Die Szenen-Abschnitte in der Mitte und unten sind hier nicht geprüft.

## 4a. Einzelbilder (`bewegung.mjs --modus einzelbilder`, 5 Bilder bei 0/25/50/75/100 % bzw. fünf Scrollpositionen)

| Seite | Ansicht | Kennung | Auslöser | Elemente | Modus | Dauer (ms) | Bilder | Befund |
|---|---|---|---|---|---|---|---|---|
| `/bad` | d1440 | `sig-plan` | hover (ausgelöst 1) | 1 | zeit | 320 | 5 | – |
| `/standorte` | d1440 | `einzugsband` | scroll (ausgelöst 1) | 1 | zeit | 960 | 5 | nicht im K-009-Auszug: Scroll-Auslöser angenommen |
| `/` | d1440 | `sig-kreuzlinie` | seite (ausgelöst 0) | 4 | zeit | 1800 | 5 | – |
| `/` | m390 | `sig-kreuzlinie` | seite (ausgelöst 0) | 4 | zeit | 1200 | 5 | – |
| `/` | d1440 | `szene-ablauf` | scroll (ausgelöst 1) | 1 | scroll | 0 | 5 | – |
| `/ueber-uns` | d1440 | `fugenband` | scroll (ausgelöst 1) | 1 | scroll | 0 | 5 | nicht im K-009-Auszug: Scroll-Auslöser angenommen |

Alle sechs angeforderten Kennungen waren auf der jeweiligen Seite vorhanden und haben Bilder ergeben. Keine der Kennungen fällt unter „nicht auslösbar“ (erfolg, absenden, navigation). Bei `sig-kreuzlinie` löst der Seitenaufruf die Animation aus, deshalb „ausgelöst 0“. Bei Modus `scroll` ist die Dauer 0, weil die Bilder über Scrollpositionen laufen und nicht über Zeit.

## 4b. Register (`bewegung.mjs --modus register`, je Hauptansicht m390 und d1440)

| Seite | Ansicht | data-motion-Elemente | gefunden (Kennungen) | unbekannt | Animationen ohne Register | im Register, nicht auf dieser Seite |
|---|---|---|---|---|---|---|
| `/` | m390 | 199 | 9 (anriss, aufklappen, auftritt, druck, leitachse, sig-flucht, sig-kreuzlinie, szene-ablauf, zustand) | 0 | 0 | 7 |
| `/` | d1440 | 199 | 9 (anriss, aufklappen, auftritt, druck, leitachse, sig-flucht, sig-kreuzlinie, szene-ablauf, zustand) | 0 | 0 | 7 |
| `/bad` | m390 | 111 | 5 (aufklappen, druck, leitachse, sig-plan, zustand) | 0 | 2 | 11 |
| `/bad` | d1440 | 111 | 5 (aufklappen, druck, leitachse, sig-plan, zustand) | 0 | 0 | 11 |
| `/leistungen` | m390 | 123 | 5 (aufklappen, druck, leitachse, sig-plan, zustand) | 0 | 0 | 11 |
| `/leistungen` | d1440 | 123 | 5 (aufklappen, druck, leitachse, sig-plan, zustand) | 0 | 0 | 11 |
| `/leistungen/bad` | m390 | 125 | 4 (aufklappen, druck, leitachse, zustand) | 0 | 0 | 12 |
| `/leistungen/bad` | d1440 | 125 | 4 (aufklappen, druck, leitachse, zustand) | 0 | 0 | 12 |
| `/standorte` | m390 | 99 | 5 (aufklappen, druck, einzugsband, leitachse, zustand) | 0 | 0 | 11 |
| `/standorte` | d1440 | 99 | 5 (aufklappen, druck, einzugsband, leitachse, zustand) | 0 | 0 | 11 |
| `/standorte/wetzlar` | m390 | 95 | 5 (aufklappen, druck, einzugsband, leitachse, zustand) | 0 | 1 | 11 |
| `/standorte/wetzlar` | d1440 | 95 | 5 (aufklappen, druck, einzugsband, leitachse, zustand) | 0 | 0 | 11 |
| `/fliesen` | m390 | 131 | 5 (aufklappen, druck, leitachse, verband, zustand) | 0 | 0 | 11 |
| `/fliesen` | d1440 | 131 | 5 (aufklappen, druck, leitachse, verband, zustand) | 0 | 0 | 11 |
| `/ueber-uns` | m390 | 89 | 5 (aufklappen, druck, fugenband, leitachse, zustand) | 0 | 1 | 11 |
| `/ueber-uns` | d1440 | 89 | 5 (aufklappen, druck, fugenband, leitachse, zustand) | 0 | 1 | 11 |
| `/kontakt` | m390 | 146 | 3 (aufklappen, druck, zustand) | 0 | 0 | 13 |
| `/kontakt` | d1440 | 146 | 3 (aufklappen, druck, zustand) | 0 | 0 | 13 |
| `/fliesen/konfigurator` | m390 | 80 | 3 (aufklappen, druck, zustand) | 0 | 2 | 13 |
| `/fliesen/konfigurator` | d1440 | 80 | 3 (aufklappen, druck, zustand) | 0 | 0 | 13 |
| `/blog` | m390 | 98 | 3 (aufklappen, druck, zustand) | 0 | 2 | 13 |
| `/blog` | d1440 | 98 | 3 (aufklappen, druck, zustand) | 0 | 0 | 13 |
| `/blog/rutschfeste-fliesen-r-klassen` | m390 | 96 | 3 (aufklappen, druck, zustand) | 0 | 1 | 13 |
| `/blog/rutschfeste-fliesen-r-klassen` | d1440 | 96 | 3 (aufklappen, druck, zustand) | 0 | 0 | 13 |

Summen über 24 Läufe: gefundene Kennungen 110 (Summe je Lauf), unbekannt 0, ohne Register 10 Einträge. Verschiedene Kennungen insgesamt: 13 (anriss, aufklappen, auftritt, druck, einzugsband, fugenband, leitachse, sig-flucht, sig-kreuzlinie, sig-plan, szene-ablauf, verband, zustand).

„Animationen ohne Register“ sind Farb-Übergänge an Links (`outline-color`) in den Hover- und Fokusstilen, nicht an `data-motion` gebunden. Sie kommen in /bad, /blog, /blog/rutschfeste-fliesen-r-klassen, /fliesen/konfigurator, /standorte/wetzlar, /ueber-uns vor (m390) und in /ueber-uns d1440. Die Register-Kennungen `notiert` (erfolg), `laden` (absenden) und `seitenwechsel` (navigation) stehen im Register, aber auf keiner Hauptansicht im DOM. Das ist erwartet, weil diese Auslöser nicht in Prüfläufen entstehen.

## 4c. Reduzierte Bewegung (`bewegung.mjs --modus reduziert`, prefers-reduced-motion: reduce)

| Seite | Ansicht | geprüft | Bewegungsbefunde | unsichtbar (nach Kennung) | verdeckt durch Zustand | Hover-Fehler |
|---|---|---|---|---|---|---|
| `/` | m390 | 199 | 0 | 9 (zustand 2, druck 3, aufklappen 1, sig-kreuzlinie 3) | 5 | 0 |
| `/` | d1440 | 199 | 0 | 4 (zustand 1, aufklappen 1, sig-kreuzlinie 1, druck 1) | 4 | 0 |
| `/leistungen` | m390 | 123 | 0 | 5 (zustand 2, druck 2, aufklappen 1) | 5 | 0 |
| `/leistungen` | d1440 | 123 | 0 | 2 (zustand 1, aufklappen 1) | 4 | 0 |
| `/standorte` | m390 | 99 | 0 | 5 (zustand 2, druck 2, aufklappen 1) | 5 | 0 |
| `/standorte` | d1440 | 99 | 0 | 2 (zustand 1, aufklappen 1) | 4 | 0 |
| `/fliesen` | m390 | 131 | 0 | 6 (zustand 2, druck 3, aufklappen 1) | 5 | 0 |
| `/fliesen` | d1440 | 131 | 0 | 3 (zustand 1, aufklappen 1, druck 1) | 4 | 0 |
| `/ueber-uns` | m390 | 89 | 0 | 5 (zustand 2, druck 2, aufklappen 1) | 5 | 0 |
| `/ueber-uns` | d1440 | 89 | 0 | 2 (zustand 1, aufklappen 1) | 4 | 0 |

Alle zehn Läufe ohne Bewegungsbefund. „Unsichtbar“ sind im Wesentlichen `display: none` bei mobilen Menüs, Mega-Menüs und WhatsApp-Schaltfläche. Ausnahmen: `sig-kreuzlinie` (3 Elemente auf / m390, `display: none`) und `druck` (eine Schaltfläche mit Deckkraft 0,40 auf / m390). Die Sichtprüfung soll das bestätigen.

## 4d. Bildrate (`bewegung.mjs --modus bildrate`, / m390, DPR 2, CPU 4× gedrosselt, Tracing, 3 Wiederholungen)

| Lauf | Bilder | verworfen | Anteil verworfen | LoAF (Anzahl) | LoAF (Summe ms) | Scrollhöhe (px) |
|---|---|---|---|---|---|---|
| 1 | 2638 | 157 | 5.95 % | 24 | 3187 | 16669 |
| 2 | 4033 | 188 | 4.66 % | 10 | 754 | 25765 |
| 3 | 4140 | 203 | 4.9 % | 5 | 471 | 26260 |
| Median (je Feld) | 4033 | 188 | 4.9 % | 10 | 754 | – |

Quelle: Frame-Ereignisse (`Display::FrameDisplayed`, `DroppedFrame`). Zur Gegenprüfung zählen die PipelineReporter-Ereignisse nur wenige verworfene Bilder: Lauf 1 10 von 2615 (0,4 %), Lauf 2 8 von 3982 (0,2 %), Lauf 3 5 von 4063 (0,1 %). Bei den Werten fällt auf: Die Kopfzahl „4,9 %“ ist der Median der drei Anteilswerte (5,95, 4,66, 4,90). Die Feldmediane daneben (188 verworfen bei 4033 Bildern) ergeben für sich nur 4,66 %. Das Werkzeug bildet den Anteil also aus einem anderen Median als die angezeigten Felder. Das ist ein Befund am Werkzeug, nicht am Bild; zu melden, nicht zu korrigieren.

## 5. Auffälligkeiten (zur Sichtabnahme)

1. **Überlappung auf Hauptansichten (Bildsatz):** 110 Befunde in 5 Ansichten. Größter Block: `/fliesen/konfigurator` in allen drei Ansichten (m390 39, t768 22, d1440 22), dazu `/` m390 (25). Das Muster ist Text in geschlossenen oder ausgeklappten `details`-Elementen. Ob das sichtbar ist, muss am Bild geprüft werden.
2. **Sticky-Überlappung:** `/blog` d1440, zwei Befunde am Seitenkopf bzw. der Seitenleiste (y≈3622). Das ist eine echte Überdeckung, wenn das Bild sie zeigt.
3. **Ersatzpfad:** Kennzahlen und Stichprobe stimmen mit dem normalen Bildsatz überein. Die Stichprobe deckt nur die Aufnahmen 1 bis 3 je Ansicht ab.
4. **Einzelbilder:** `einzugsband` und `fugenband` stehen nicht in der Auslösertabelle des Werkzeugs (K-009-Auszug). Das Werkzeug hat deshalb Scroll-Auslösung angenommen und das im Befund vermerkt. Die Bilder dieser beiden Kennungen gelten daher nur unter dieser Annahme.
5. **Register:** Keine unbekannte Kennung (0 auf allen 24 Läufen). Die Register-Kennungen `notiert`, `laden`, `seitenwechsel` kommen auf keiner Hauptansicht im DOM vor. Das ist erwartet. Die Farb-Übergänge an Links ohne Registereintrag (10 Einträge) sind vermutlich Hover- und Fokusstile; das ist nicht einzeln geprüft.
6. **Reduzierte Bewegung und Register:** Keine Bewegungsbefunde in den zehn reduzierten Läufen. Im Registerlauf `/fliesen/konfigurator` m390 gab es einen Hover-Fehler: `locator.hover` Timeout nach 1500 ms bei einem Element (1 von 20 Hover-Schritten). Die Ursache ist nicht geprüft; ob das Element im Mobilbild überhaupt hover-bar ist, bleibt offen.
7. **Bildrate:** Der Kopfwert 4,9 % verworfene Bilder ist der Median der Anteilswerte. Er passt nicht zu den mitgelieferten Feldmedianen (188 von 4033 = 4,66 %). Das Werkzeug mischt die Mediane. Der PipelineReporter zeigt weit weniger verworfene Bilder (0,1 bis 0,4 %). Die beiden Quellen weichen stark voneinander ab; welche Messung die Wirklichkeit beschreibt, ist hier nicht entschieden. Die LoAF-Werte sind 24, 10 und 5 Ereignisse.
8. **Konsole, HTTP, Überlauf:** Keine Konsolenfehler, keine Nicht-200-Antworten, keine Überlaufbefunde in 36 Seiten-Ansichten und 24 Abschnittsläufen.

## 6. Ordnerliste der Abschnittsbilder (für die Gutachter)

Basis: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/belege-roh/e3-tor/abschnitte/`. Je Seite zwei Unterordner `m390/` und `d1440/`. Dateinamen in Reihenfolge; die Namen sind vom Werkzeug auf 40 Zeichen gekürzt, Fuß-Streifen sind mit `Fuß: footer` benannt.

### `/`: `abschnitte/start/`

- `m390/` (22 Bilder): `00-erster-bildschirm.jpg`, `01-Perfektion auf jedem Quadratmeter.Fliese.jpg`, `02-Perfektion auf jedem Quadratmeter.Fliese.jpg`, `03-Vertrauenssignale und Fachbetriebs-Garan.jpg`, `04-Garantien & Qualitätsversprechen von Fli.jpg`, `05-Alles für Ihr Vorhaben auf über 100 Fach.jpg`, `06-Alles für Ihr Vorhaben auf über 100 Fach.jpg`, `07-Projekt anfragen & Situation schildern.jpg`, `08-Projekt anfragen & Situation schildern.jpg`, `09-Projekt anfragen & Situation schildern.jpg`, `10-Fliesen-, Platten- & Verlegearbeiten in .jpg`, `11-Fliesen-, Platten- & Verlegearbeiten in .jpg`, `12-In 3 Schritten zu Ihrem neuen Belag.jpg`, `13-In 3 Schritten zu Ihrem neuen Belag.jpg`, `14-Fugenarme XXL-Großformate & fachgerechte.jpg`, `15-Was unsere Kunden in Mittelhessen sagen.jpg`, `16-In ganz Mittelhessen schnell auf Ihrer B.jpg`, `17-In ganz Mittelhessen schnell auf Ihrer B.jpg`, `18-Häufig gestellte Fragen zu Fliesen & Bad.jpg`, `19-Ihre Express-Anfrage in 3 Klicks.jpg`, `20-Bereit für Ihr Fliesen- oder Badprojekt?.jpg`, `21-Fuß: footer.jpg`
- `d1440/` (17 Bilder): `00-erster-bildschirm.jpg`, `01-Perfektion auf jedem Quadratmeter.Fliese.jpg`, `02-Vertrauenssignale und Fachbetriebs-Garan.jpg`, `03-Garantien & Qualitätsversprechen von Fli.jpg`, `04-Alles für Ihr Vorhaben auf über 100 Fach.jpg`, `05-Projekt anfragen & Situation schildern.jpg`, `06-Projekt anfragen & Situation schildern.jpg`, `07-Fliesen-, Platten- & Verlegearbeiten in .jpg`, `08-Fliesen-, Platten- & Verlegearbeiten in .jpg`, `09-In 3 Schritten zu Ihrem neuen Belag.jpg`, `10-Fugenarme XXL-Großformate & fachgerechte.jpg`, `11-Was unsere Kunden in Mittelhessen sagen.jpg`, `12-In ganz Mittelhessen schnell auf Ihrer B.jpg`, `13-Häufig gestellte Fragen zu Fliesen & Bad.jpg`, `14-Ihre Express-Anfrage in 3 Klicks.jpg`, `15-Bereit für Ihr Fliesen- oder Badprojekt?.jpg`, `16-Fuß: footer.jpg`

### `/bad`: `abschnitte/__bad/`

- `m390/` (11 Bilder): `00-erster-bildschirm.jpg`, `01-Ihr Traumbad schlüsselfertig in Fachqual.jpg`, `02-Alles für Ihr neues Bad aus einer Hand.jpg`, `03-Unsere Qualitäts-Kategorien im Überblick.jpg`, `04-Bad-Projektcheck.jpg`, `05-Bad-Projektcheck.jpg`, `06-Badanfrage.jpg`, `07-Planen Sie ein Fliesen- oder Badprojekt?.jpg`, `08-Fuß: footer.jpg`, `09-Fuß: footer.jpg`, `10-Fuß: footer.jpg`
- `d1440/` (9 Bilder): `00-erster-bildschirm.jpg`, `01-Ihr Traumbad schlüsselfertig in Fachqual.jpg`, `02-Alles für Ihr neues Bad aus einer Hand.jpg`, `03-Unsere Qualitäts-Kategorien im Überblick.jpg`, `04-Bad-Projektcheck.jpg`, `05-Bad-Projektcheck.jpg`, `06-Badanfrage.jpg`, `07-Planen Sie ein Fliesen- oder Badprojekt?.jpg`, `08-Fuß: footer.jpg`

### `/leistungen`: `abschnitte/__leistungen/`

- `m390/` (15 Bilder): `00-erster-bildschirm.jpg`, `01-Fliesenleger Leistungen & Fachgewerke We.jpg`, `02-Bäder & Wellness.jpg`, `03-Bäder & Wellness.jpg`, `04-Bäder & Wellness.jpg`, `05-Bäder & Wellness.jpg`, `06-Ihr verlässlicher Weg zum neuen Traumbel.jpg`, `07-Projekt anfragen & Situation schildern.jpg`, `08-Projekt anfragen & Situation schildern.jpg`, `09-Projekt anfragen & Situation schildern.jpg`, `10-Fordern Sie Ihr persönliches Angebot an.jpg`, `11-Planen Sie ein Fliesen- oder Badprojekt?.jpg`, `12-Fuß: footer.jpg`, `13-Fuß: footer.jpg`, `14-Fuß: footer.jpg`
- `d1440/` (10 Bilder): `00-erster-bildschirm.jpg`, `01-Fliesenleger Leistungen & Fachgewerke We.jpg`, `02-Bäder & Wellness.jpg`, `03-Bäder & Wellness.jpg`, `04-Ihr verlässlicher Weg zum neuen Traumbel.jpg`, `05-Projekt anfragen & Situation schildern.jpg`, `06-Projekt anfragen & Situation schildern.jpg`, `07-Fordern Sie Ihr persönliches Angebot an.jpg`, `08-Planen Sie ein Fliesen- oder Badprojekt?.jpg`, `09-Fuß: footer.jpg`

### `/leistungen/bad`: `abschnitte/__leistungen__bad/`

- `m390/` (16 Bilder): `00-erster-bildschirm.jpg`, `01-Badsanierung & Komplettbäder: Bäder & We.jpg`, `02-Spezialisierungen in Bäder & Wellness.jpg`, `03-Fachkompetenz & Ausführungsdetails.jpg`, `04-Weitere Gewerke von Fliesenverlegung Tez.jpg`, `05-Bäder & Wellness in Ihrer Region.jpg`, `06-Projekt in Bäder & Wellness anfragen?.jpg`, `07-Projekt anfragen & Situation schildern.jpg`, `08-Projekt anfragen & Situation schildern.jpg`, `09-Projekt anfragen & Situation schildern.jpg`, `10-Häufige Fragen zu Bäder & Wellness.jpg`, `11-Jetzt unverbindlich anfragen.jpg`, `12-Planen Sie ein Fliesen- oder Badprojekt?.jpg`, `13-Fuß: footer.jpg`, `14-Fuß: footer.jpg`, `15-Fuß: footer.jpg`
- `d1440/` (13 Bilder): `00-erster-bildschirm.jpg`, `01-Badsanierung & Komplettbäder: Bäder & We.jpg`, `02-Spezialisierungen in Bäder & Wellness.jpg`, `03-Fachkompetenz & Ausführungsdetails.jpg`, `04-Weitere Gewerke von Fliesenverlegung Tez.jpg`, `05-Bäder & Wellness in Ihrer Region.jpg`, `06-Projekt in Bäder & Wellness anfragen?.jpg`, `07-Projekt anfragen & Situation schildern.jpg`, `08-Projekt anfragen & Situation schildern.jpg`, `09-Häufige Fragen zu Bäder & Wellness.jpg`, `10-Jetzt unverbindlich anfragen.jpg`, `11-Planen Sie ein Fliesen- oder Badprojekt?.jpg`, `12-Fuß: footer.jpg`

### `/standorte`: `abschnitte/__standorte/`

- `m390/` (15 Bilder): `00-erster-bildschirm.jpg`, `01-Standorte & Einsatzgebiete in Mittelhess.jpg`, `02-Unser 45-km-Einsatzgebiet in Mittelhesse.jpg`, `03-Wählen Sie Ihre Stadt oder Gemeinde.jpg`, `04-Wählen Sie Ihre Stadt oder Gemeinde.jpg`, `05-Wählen Sie Ihre Stadt oder Gemeinde.jpg`, `06-Wählen Sie Ihre Stadt oder Gemeinde.jpg`, `07-Unsere Leistungen vor Ort.jpg`, `08-Ihre Stadt ist nicht aufgeführt?.jpg`, `09-Unser Hauptstandort in Aßlar.jpg`, `10-Fliesenleger oder Badsanierung in Mittel.jpg`, `11-Planen Sie ein Fliesen- oder Badprojekt .jpg`, `12-Fuß: footer.jpg`, `13-Fuß: footer.jpg`, `14-Fuß: footer.jpg`
- `d1440/` (11 Bilder): `00-erster-bildschirm.jpg`, `01-Standorte & Einsatzgebiete in Mittelhess.jpg`, `02-Unser 45-km-Einsatzgebiet in Mittelhesse.jpg`, `03-Wählen Sie Ihre Stadt oder Gemeinde.jpg`, `04-Wählen Sie Ihre Stadt oder Gemeinde.jpg`, `05-Unsere Leistungen vor Ort.jpg`, `06-Ihre Stadt ist nicht aufgeführt?.jpg`, `07-Unser Hauptstandort in Aßlar.jpg`, `08-Fliesenleger oder Badsanierung in Mittel.jpg`, `09-Planen Sie ein Fliesen- oder Badprojekt .jpg`, `10-Fuß: footer.jpg`

### `/standorte/wetzlar`: `abschnitte/__standorte__wetzlar/`

- `m390/` (16 Bilder): `00-erster-bildschirm.jpg`, `01-Fliesenverlegung & Badsanierung in Wetzl.jpg`, `02-Ihr Fliesen-Fachbetrieb für Wetzlar.jpg`, `03-Schnell bei Ihnen in Wetzlar.jpg`, `04-Einsatzgebiet und Marktabdeckung Wetzlar.jpg`, `05-Unsere Leistungen in Wetzlar.jpg`, `06-Weitere Einsatzgebiete in der Region.jpg`, `07-Weitere Einsatzgebiete in der Region.jpg`, `08-Fliesenleger oder Badsanierung in Wetzla.jpg`, `09-Unser 8-Punkte-Qualitätsversprechen für .jpg`, `10-Unser 8-Punkte-Qualitätsversprechen für .jpg`, `11-Ihr Fliesenleger für Wetzlar: Jetzt kost.jpg`, `12-Ihr Fliesenleger für Wetzlar: Jetzt kost.jpg`, `13-Fuß: footer.jpg`, `14-Fuß: footer.jpg`, `15-Fuß: footer.jpg`
- `d1440/` (11 Bilder): `00-erster-bildschirm.jpg`, `01-Fliesenverlegung & Badsanierung in Wetzl.jpg`, `02-Ihr Fliesen-Fachbetrieb für Wetzlar.jpg`, `03-Schnell bei Ihnen in Wetzlar.jpg`, `04-Einsatzgebiet und Marktabdeckung Wetzlar.jpg`, `05-Unsere Leistungen in Wetzlar.jpg`, `06-Weitere Einsatzgebiete in der Region.jpg`, `07-Fliesenleger oder Badsanierung in Wetzla.jpg`, `08-Unser 8-Punkte-Qualitätsversprechen für .jpg`, `09-Ihr Fliesenleger für Wetzlar: Jetzt kost.jpg`, `10-Fuß: footer.jpg`

### `/fliesen`: `abschnitte/__fliesen/`

- `m390/` (16 Bilder): `00-erster-bildschirm.jpg`, `01-Fliesen-Ratgeber: Formate, Räume und Ver.jpg`, `02-Fliesen & Verlegung im Überblick.jpg`, `03-Vom Raum bis zur Abnahme: die wichtigste.jpg`, `04-Vom Raum bis zur Abnahme: die wichtigste.jpg`, `05-Vom Raum bis zur Abnahme: die wichtigste.jpg`, `06-Unter der Fliese und über das Wohnen hin.jpg`, `07-Wohnbereiche, Küche, Flur und Neubau – a.jpg`, `08-Weiterführende Ratgeber zur Fliesenverle.jpg`, `09-Fliesen-Konfigurator.jpg`, `10-Unser 8-Punkte-Qualitätsversprechen für .jpg`, `11-Unser 8-Punkte-Qualitätsversprechen für .jpg`, `12-Planen Sie ein Fliesen- oder Badprojekt?.jpg`, `13-Fuß: footer.jpg`, `14-Fuß: footer.jpg`, `15-Fuß: footer.jpg`
- `d1440/` (12 Bilder): `00-erster-bildschirm.jpg`, `01-Fliesen-Ratgeber: Formate, Räume und Ver.jpg`, `02-Fliesen & Verlegung im Überblick.jpg`, `03-Vom Raum bis zur Abnahme: die wichtigste.jpg`, `04-Vom Raum bis zur Abnahme: die wichtigste.jpg`, `05-Unter der Fliese und über das Wohnen hin.jpg`, `06-Wohnbereiche, Küche, Flur und Neubau – a.jpg`, `07-Weiterführende Ratgeber zur Fliesenverle.jpg`, `08-Fliesen-Konfigurator.jpg`, `09-Unser 8-Punkte-Qualitätsversprechen für .jpg`, `10-Planen Sie ein Fliesen- oder Badprojekt?.jpg`, `11-Fuß: footer.jpg`

### `/ueber-uns`: `abschnitte/__ueber-uns/`

- `m390/` (11 Bilder): `00-erster-bildschirm.jpg`, `01-Über uns – Fliesenleger-Fachbetrieb Tezg.jpg`, `02-Handwerkliche Präzision aus Aßlar.jpg`, `03-Unsere Werte im Handwerk.jpg`, `04-Unsere Unternehmensgeschichte.jpg`, `05-Unser 8-Punkte-Qualitätsversprechen für .jpg`, `06-Unser 8-Punkte-Qualitätsversprechen für .jpg`, `07-Lernen Sie uns persönlich kennen: Kosten.jpg`, `08-Fuß: footer.jpg`, `09-Fuß: footer.jpg`, `10-Fuß: footer.jpg`
- `d1440/` (8 Bilder): `00-erster-bildschirm.jpg`, `01-Über uns – Fliesenleger-Fachbetrieb Tezg.jpg`, `02-Handwerkliche Präzision aus Aßlar.jpg`, `03-Unsere Werte im Handwerk.jpg`, `04-Unsere Unternehmensgeschichte.jpg`, `05-Unser 8-Punkte-Qualitätsversprechen für .jpg`, `06-Lernen Sie uns persönlich kennen: Kosten.jpg`, `07-Fuß: footer.jpg`

### `/kontakt`: `abschnitte/__kontakt/`

- `m390/` (11 Bilder): `00-erster-bildschirm.jpg`, `01-Kontakt & Aufmaß Fliesenleger Tezgel.jpg`, `02-Direkter Kontakt und Qualitätsverspreche.jpg`, `03-Unser Fachbetrieb & Einsatzgebiet Mittel.jpg`, `04-Fliesenleger oder Badsanierung in Aßlar,.jpg`, `05-Wunschtermin in 2 Schritten reservieren.jpg`, `06-Ihr Vor-Ort-Aufmaß anfordern.jpg`, `07-Sie möchten Ihr Bad oder Ihre Fliesen er.jpg`, `08-Fuß: footer.jpg`, `09-Fuß: footer.jpg`, `10-Fuß: footer.jpg`
- `d1440/` (9 Bilder): `00-erster-bildschirm.jpg`, `01-Kontakt & Aufmaß Fliesenleger Tezgel.jpg`, `02-Direkter Kontakt und Qualitätsverspreche.jpg`, `03-Unser Fachbetrieb & Einsatzgebiet Mittel.jpg`, `04-Fliesenleger oder Badsanierung in Aßlar,.jpg`, `05-Wunschtermin in 2 Schritten reservieren.jpg`, `06-Ihr Vor-Ort-Aufmaß anfordern.jpg`, `07-Sie möchten Ihr Bad oder Ihre Fliesen er.jpg`, `08-Fuß: footer.jpg`

### `/fliesen/konfigurator`: `abschnitte/__fliesen__konfigurator/`

- `m390/` (14 Bilder): `00-erster-bildschirm.jpg`, `01-Fliesen-Konfigurator & Bedarfsrechner vo.jpg`, `02-Vier Schritte bis zur strukturierten Anf.jpg`, `03-Fliesen-Konfigurator.jpg`, `04-So rechnet der Konfigurator: Fläche, Mus.jpg`, `05-Bei Treppen nur die Nettofläche.jpg`, `06-Wie es weitergeht: Aufmaß und Festpreisa.jpg`, `07-Häufige Fragen zum Konfigurator.jpg`, `08-Weiterführende Ratgeber zur Fliesenplanu.jpg`, `09-Unser 8-Punkte-Qualitätsversprechen für .jpg`, `10-Unser 8-Punkte-Qualitätsversprechen für .jpg`, `11-Fuß: footer.jpg`, `12-Fuß: footer.jpg`, `13-Fuß: footer.jpg`
- `d1440/` (11 Bilder): `00-erster-bildschirm.jpg`, `01-Fliesen-Konfigurator & Bedarfsrechner vo.jpg`, `02-Vier Schritte bis zur strukturierten Anf.jpg`, `03-Fliesen-Konfigurator.jpg`, `04-So rechnet der Konfigurator: Fläche, Mus.jpg`, `05-Bei Treppen nur die Nettofläche.jpg`, `06-Wie es weitergeht: Aufmaß und Festpreisa.jpg`, `07-Häufige Fragen zum Konfigurator.jpg`, `08-Weiterführende Ratgeber zur Fliesenplanu.jpg`, `09-Unser 8-Punkte-Qualitätsversprechen für .jpg`, `10-Fuß: footer.jpg`

### `/blog`: `abschnitte/__blog/`

- `m390/` (11 Bilder): `00-erster-bildschirm.jpg`, `01-Fliesen-Ratgeber & Badsanierung Tipps.jpg`, `02-Handwerkerbonus: Fliesenarbeiten von der.jpg`, `03-Handwerkerbonus: Fliesenarbeiten von der.jpg`, `04-Handwerkerbonus: Fliesenarbeiten von der.jpg`, `05-Handwerkerbonus: Fliesenarbeiten von der.jpg`, `06-Unser 8-Punkte-Qualitätsversprechen für .jpg`, `07-Unser 8-Punkte-Qualitätsversprechen für .jpg`, `08-Fuß: footer.jpg`, `09-Fuß: footer.jpg`, `10-Fuß: footer.jpg`
- `d1440/` (7 Bilder): `00-erster-bildschirm.jpg`, `01-Fliesen-Ratgeber & Badsanierung Tipps.jpg`, `02-Handwerkerbonus: Fliesenarbeiten von der.jpg`, `03-Handwerkerbonus: Fliesenarbeiten von der.jpg`, `04-Handwerkerbonus: Fliesenarbeiten von der.jpg`, `05-Unser 8-Punkte-Qualitätsversprechen für .jpg`, `06-Fuß: footer.jpg`

### `/blog/rutschfeste-fliesen-r-klassen`: `abschnitte/__blog__rutschfeste-fliesen-r-klassen/`

- `m390/` (7 Bilder): `00-erster-bildschirm.jpg`, `01-Rutschfeste Fliesen: Welche R-Klasse ist.jpg`, `02-Unser 8-Punkte-Qualitätsversprechen für .jpg`, `03-Unser 8-Punkte-Qualitätsversprechen für .jpg`, `04-Fuß: footer.jpg`, `05-Fuß: footer.jpg`, `06-Fuß: footer.jpg`
- `d1440/` (4 Bilder): `00-erster-bildschirm.jpg`, `01-Rutschfeste Fliesen: Welche R-Klasse ist.jpg`, `02-Unser 8-Punkte-Qualitätsversprechen für .jpg`, `03-Fuß: footer.jpg`

Gesamt: 287 Abschnittsbilder in 24 Ordnern. Die Datei `abschnitte.json` in jedem Seitenordner enthält Name, Höhe und Datei je Abschnitt.

