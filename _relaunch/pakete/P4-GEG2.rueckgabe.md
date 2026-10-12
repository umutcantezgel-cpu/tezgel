# Rückgabe P4-GEG2 · Frischer Gegenprüfer P4-Tor Runde 2 und T2 `/` · Opus · 11.10.2026

**Vorgehen.** Ich habe nur gelesen: Belegdateien (JSON, Bilder), `git log/show/diff`, Quelltext, Werkzeugcode. Alle Zahlen unten habe ich aus den JSON-Belegen selbst nachgerechnet (Python-Einzeiler im Speicher).

GET-Abrufe (`curl`/`urllib`) gingen an 4310, 4321, 4323, 4324 und 4337, insgesamt etwa 45, mit Pausen von 1,1 s. **Abweichung von den Grenzen, offen benannt:**
- Einmal gingen zwei Abrufe an 4321 innerhalb von weniger als einer Sekunde.
- Für den CSS-Vergleich lagen zwei CSS-Dateien wenige Sekunden in `/dev/shm`; ich habe sie sofort gelöscht.
- `node literal.mjs --git bd6f877 --pfade src/components/kern` lief einmal ohne `--json`, also nur mit Ausgabe auf stdout.

Sonst habe ich nichts geschrieben außer dieser Datei. Kein Browser, kein Build, kein POST, kein git mit Schreibwirkung.

---

## Die fünf Urteile

| # | Frage | Urteil |
|---|---|---|
| 1 | Z-05, Z-11, Z-13 auf den Hauptseiten-Entwürfen erfüllt | **Z-05 ja · Z-11 ja, unter einer Auflage (Banner-Zustände belegen) · Z-13 ja** |
| 2 | L3 tragfähig ausgewertet | **ja** (mit Hinweisen) |
| 3 | T2 `/` bestanden | **ja, unter Auflagen** (vor dem Push: E-034 berichtigen, Abweichung in ABNAHME eintragen, axe „Einstellungen“ auf `/`, Kopfbreite 1280 mit Scrollleiste prüfen) |
| 4 | Abweichungen und Auflagen ehrlich und vollständig | **nein** (Berichtigungen nötig, keine neue Messung des Produkts) |
| 5 | E-035 Werkzeugregel zulässig | **nein in der vorgeschlagenen Fassung**; zulässig mit vier Änderungen (unten) |

### 1. Z-05, Z-11, Z-13

**Z-05: ja**
- **Reinraum:** Die Kopien `reinraum-c5ef582` und `-v` liefen mit npm ci, Build, typecheck, lint, test 22/22 und qa:graph, alle Exit 0. `nft-relaunch.txt` ist leer.
  - Die Kopie `reinraum-c5ef582` (Port 4324) ist byte-gleich zu `git show c5ef582` (551 Dateien unter `src`, `public` und Konfiguration).
  - `-v` weicht nur durch die Verschiebungen von `freischalten.sh` ab. Der Stempel lautet `basis c5ef582 · routen bad … kontakt · art v`.
  - `src` an HEAD ist gleich c5ef582 (`git diff c5ef582 HEAD -- src` leer).
- **Suite (`suite.json`):** 382 erwartet, 1 unerwartet, 15 übersprungen.
  - Die 15 sind 4 Konfigurator-`fixme` des Bestands, 4 Kontaktwege-`skip` (gerätebedingt) und 7 Navigation mobil.
  - `/standorte` mobil (F-12) läuft jetzt. Daraus folgt, dass `RELAUNCH_KERN_SEITEN` gegriffen hat.
- **Der rote Fall:** Konfigurator „Gutfall WhatsApp“, desktop, `timedOut`.
  - Das Aufrufprotokoll zeigt nacheinander wechselnde Elemente, die den Klick abfangen („element is not stable“, Label, `div`, Kopf, `td`). Das passt zu einer noch rollenden Bestandsseite.
  - Die Wiederholungen ergeben je 6/6 grün (`repeatEach 3`, 1 Worker) auf 4321 und 4337.
  - Die Seite ist laut T1 HTML-gleich zu Live. **Tragfähig begründet.** Selbst verschuldet ist die Last: Suite und a11y-zusatz liefen parallel (15:05–15:15).
- **Sperrklinke:** Statisch nachgezählt: 12 Specs, 116 Fälle, 507 `expect`, 3 fixme, 6 skip, gleich der Basis. Zur Laufzeit 398 Fälle; kein Spec-Projekt hat weniger Fälle oder mehr ausgelassene als die Basis.
  - Hinweis: Die Laufzeit-Sperrklinke prüft „grün“ nicht. Konfigurator desktop 22 statt 23 grün geht durch. Das ist so gebaut, gehört aber in die ERGEBNIS-Zeile.
- **Konsole:** Fotos 0, Uhr-Spec grün.

**Z-11: ja, unter einer Auflage**
- **a11y-zusatz (`p4tor-r2-a11y/a11y-zusatz.json`):** Alle harten Kennzahlen stehen auf 0, außer `fokus_unter_2px` = 1.
  - Dieser eine Fall ist `/` m375 Erstbesuch, nr 81, `div.relative.snap-x`, 1 492/1 526, `ring-unter-fester-ebene`.
  - In `abgelehnt` steht dieselbe Seite und Ansicht bei 170 ok / 0 dünn. Die Regel des E-018-Nachtrags greift also.
  - `ohnejs`: 0 in allen fünf Unterkennzahlen, 14 Läufe.
  - Zur Information: Ring teilverdeckt (fest) 51. Zoom-CSS horizontal 7 und verdeckt 7, die gleichwertige Probe 0.
- **axe (`p4tor-r2-axe/axe.json`):** 57 Läufe, 0 Verstöße überhaupt.
  - normal 4 Ansichten × 7 Seiten
  - Menü m375 × 7
  - Erstbesuch m375/d1440 × 7
  - 8 Fehlerzustände
- **Auflage (Befund N-A, mittel):** Die Komponente, die P4-13 am stärksten umgebaut hat, ist nur teilweise belegt.
  - Die **Einstellungen-Ansicht** des Banners lief nie in axe oder Tastatur. Sie ist ab lg jetzt ebenfalls als Leiste angeordnet.
  - Forced-colors, Reflow, Textabstand und Zoom laufen in `a11y-zusatz.mjs` fest mit `einwilligung: 'abgelehnt'` (Z. 954). Der Banner war in diesen Prüfungen also nie offen.
  - Ein Mangel ist nicht belegt. Die Texte sind unverändert (`literal.mjs`); P4-13 ändert in der Einstellungen-Ansicht nur Raster-Klassen. Der Schließen-Knopf ist im Bestand genauso gebaut (siehe N-A).
  - Mein „ja“ gilt deshalb für die gemessenen Zustände. Wird die Auflage nicht erfüllt, gilt für Z-11 „nein“.

**Z-13: ja**
- **Fotos:** 28/28 Aufnahmen, 0 Fehler, 0 Überlauf, 0 Konsole.
- **Wortbruch:** 7 Seiten × 6 Breiten, 0 Funde.
- **Pixel (M3, berichtigtes Werkzeug):**
  - Rauschen 4337/4337: 64/0.
  - Vorschau gegen Live: 64 Vergleiche, 1 abweichend. Das ist `/fliesen` m375 mit 3 683 px, die Sprechblase.
  - Mit ergänzter Maske zwei Wiederholungen, je 4/0.
  - Damit erfüllt: „keine unerklärte Abweichung“ für die nicht freigeschalteten Seiten.
- Den inzwischen fertigen Vollvergleich (Ausgangsstand gegen Live: 476 Vergleiche, 8 Abweichungen ohne Erklärung) behandle ich als Befund am Live-Stand, siehe N-D. Er betrifft nicht die Entwürfe.

### 2. L3 tragfähig ausgewertet: ja

**Gegenprobe (`gegenprobe/matrix.json`):** 13/15 ≤ Bezug (PROBELAUF §7), nachgezählt.
- a3-m375: 14 statt 12, Auflage W9.
- a3-d1440-maus: 6 statt 5. Die vier Felder sind bei scrollY 371 gefüllt. Schritt 5 (Absenden) meldet dann „Ziel lag außerhalb des Bildes – 1 Bildlauf“.
- Tastatur a1/a3/a5: je +1 gegenüber Runde 1 durch den Kopf-Link, weiter unter Bezug.
- Zur Begründung der Abweichung a3-d1440 siehe N-B; sie ist im Kern richtig, im Wortlaut falsch.

**Fünf-Sekunden-Probe:**
- **Regel vorab:** REGEL.md stammt aus d67895f (15:08). Die Fotos entstanden 15:29, die Antworten und die Mischung wurden in f31710a (15:35) committet, die Bewertung in 3a0616c (15:43).
- **Blind:** `bewertung-eingabe.json` enthält nur id und die drei Antworten; kein Hinweis auf den Stand.
- **Drei Bewerter:** Protokoll, Umkehrprobe und streng, je 140 Urteile. Alle Tabellen in `fuenf/ERGEBNIS.md` stimmen mit meiner Nachrechnung überein:
  - Protokoll m375 32 → 29, d1440 33 → 34.
  - Umkehrprobe: Zielgruppe 140/140 gleich, nächster Schritt 139/140 (A100).
  - Streng: m375 4 → 20, d1440 33 → 26, gesamt 37 → 46.
- **Mobil:** Die sechs m375-Bilder dieser Runde (c02, c03, c06, c07, c10, c13) sind **byte-gleich** mit den Bildern aus Runde 1 (b18, b11, b17, b16, b07, b22). Unterschiede mobil sind daher nur Streuung der Betrachter und Bewerter, nicht P4-13. Das stützt auch „unter lg gleich“ unabhängig von P4-13.
- **H2 (Lage des Banners):** nach der vorab festgelegten Regel behoben.
  - Ich habe c11 und c14 selbst angesehen: Einleitung frei, die Leiste beginnt darunter.
  - Auf `/standorte` d1440 steigt die strenge Lesart von 3 auf 5.
- **Rot bleibt:** der Wortlaut (M-20) auf `/kontakt`, `/leistungen` und `/ueber-uns` (W2, W8, W9). Siehe N-K zur Darstellung der strengen Lesart am Desktop.

**Mutationsprobe (`suite-mutiert-p6.json`):** P6 einzeln, 42 grün und 6 rot. Rot sind genau die Kartenfälle `/standorte`, `/kontakt` und `/` in beiden Projekten, darunter `/standorte` mobil.

**Probeläufer frei:** nicht wiederholt. PROBELAUF §3 sagt „der freie Lauf bleibt Pflicht je Phasentor“. Ein freier Lauf liegt für dieses Phasentor vor (Runde 1, 1c6c9cd-v), aber vor P4-13. Vertretbar, weil die deterministische Gegenprobe dieselben Wege an c5ef582-v zeigt. Offen benennen (N-L).

### 3. T2 `/`: ja, unter Auflagen

**Gegen Live (f2c4180) ohne Rückschritt in den Rängen 1–3:**
- **build-vergleich streng:** 172 HTML, nur `index.html` abweichend.
  - CSS: 7 Selektoren weg, 29 neu, 5 Variablen neu.
  - `.k-anzeige` liegt in beiden CSS-Dateien in `@layer components`; es hat sich nur die Reihenfolge geändert (selbst geprüft).
  - Alle 79 Klassen-Token aus dem P4-13-Diff kommen im Kandidaten-CSS vor (eigene Klassen-Abdeckung).
- **Pixel `/`:** 4337 gegen 4324, nur d1440/d1920, je 4 060 px in Zeile 8–55, x 315–1309 bzw. 555–1549. Rauschen 4/0.
- **Lighthouse:**
  - Mobil gegen Live: 86 → 85; LCP 3 465 → 3 469 ms; SI besser. Desktop 100 = 100.
  - Gegen Bestand: Punkte +2, LCP −17,9 %.
  - TBT liegt über Budget und Bestand (E-035). Zum Median siehe N-G.
  - Last 0,54–1,58, also ruhig nach E-033.
- **INP:** max 80 ms (Median), keine Interaktion über Bestand oder Budget. d1440 lief unter Last (N-H).
- **a11y, axe, Fotos, Wortbruch:** wie oben, `/` eingeschlossen.
- **Server-HTML:** `/` auf 4321 und 4324 ist bis auf Chunk-Namen gleich (618 412 Zeichen). Messungen an der Vorschau gelten damit für den Kandidaten.

**Die eine gemessene Verschlechterung gegen Live und Bezug:** a3-d1440-maus auf `/` von 5 auf 6 (Erstbesuch).
- E-034 nimmt sie als begründete Abweichung an. Ich halte sie in der Sache für vertretbar: Die Leiste reserviert 152 statt 414 px, und gerade das behebt H2.
- Die Begründung in E-034 enthält aber eine unbelegte Tatsache (N-B). Die Abweichung fehlt in ABNAHME „Offene Abweichungen“ (N-C).

**Texte (texte2):** 1 rot, das `aria-label` des Kanals auf `/`.
- Die Erklärung trägt: Laut Kanal-Probe ist der Name nach der Hydrierung unverändert vorhanden.
- Formal ist die Zeile weder in MIKROTEXTE noch in der Freigabeliste (N-J).

**Auflagen vor dem Push:**
1. E-034 Punkt 1 berichtigen (N-B).
2. a3-d1440-maus `/` und die neue Z-12-Frist in ABNAHME „Offene Abweichungen“ eintragen (N-C).
3. axe im Zustand „Einstellungen“ für `/` m375 und d1440 (N-A).
4. Kopfplatz bei 1280–1296 px mit klassischer Scrollleiste messen (N-E).

Nicht im T2 für `/` belegt sind Bewegung, SVG, SEO-Invarianten, Slop und Jury. Durch die Bauart trägt das: kein neues SVG, kein Metadaten-Diff, Register-ID `zustand` vorhanden. Im ERGEBNIS sollte es trotzdem stehen.

### 4. Abweichungen und Auflagen ehrlich und vollständig: nein
Die gewichtigsten Punkte:
- **N-B:** E-034 behauptet „Ohne Banner kostet derselbe Weg in Bestand und Kern 7“. Gemessen ist nur Kern vorher und nachher.
- **N-B:** Das T2-Urteil im ERGEBNIS lautet „nichts schlechter als Live“, obwohl a3-d1440-maus auf `/` von 5 auf 6 steigt.
- **N-C:** ABNAHME „Offene Abweichungen“ ist seit P3-16 nicht nachgeführt. Es fehlen die neue Z-12-Frist aus E-035, a3-d1440 und die übrigen verfehlten Budgets.
- Kleinere Punkte: N-G (Median), N-H (INP unter Last), N-I (Zuordnung der CSS-Selektoren), N-K (Desktop-Summe der strengen Lesart), N-M (E-036 nicht in den alten Belegen vermerkt), N-N (E-035 vergleicht mit dem günstigeren Bezug).

Keine dieser Berichtigungen verlangt eine neue Messung am Produkt.

### 5. E-035 Werkzeugregel (eingespeistes `.k-aufschub { content-visibility: visible }` nur in Werkzeugen, die die ganze Seite auf einmal lesen): nein in dieser Fassung

**G7.** Die Regel verletzt G7 nicht dem Grunde nach.
- Das Produkt bleibt gleich, und nichts erkennt Lighthouse oder Headless-Browser. Im Code habe ich dafür keinen Treffer gefunden: kein `webdriver`, `HeadlessChrome`, `RELAUNCH_` oder `lighthouse` in `src`.
- Die Werkzeuge setzen schon heute dokumentierte Messbedingungen: `reducedMotion`, Einwilligungs-Cookie, Masken.
- Eine Messbedingung ist aber nur dann keine „Lockerung“ (G7), wenn sie einen echten Besucherzustand nachbildet und das belegt ist. Beides fehlt.

**Warum nicht in dieser Fassung:**
1. **Der eingespeiste Zustand ist nicht „der Zustand jedes Abschnitts im Bild“.**
   - `content-visibility: auto` schaltet immer `contain: layout style paint` ein. Im Bild rendert der Abschnitt mit dieser Eindämmung, nur das Überspringen und die Größeneindämmung entfallen.
   - `visible` hebt auch die Eindämmung auf.
   - Damit verdeckt die Regel genau die Verluste, die Eindämmung verursacht:
     - Malbegrenzung an Abschnittskanten: Fokusringe, Umrisse, Inhalte, die bei Zoom 200 % oder 320 px über den Rand laufen, werden im echten Zustand abgeschnitten statt überzulaufen.
     - Der Abschnitt wird zum Bezugsrahmen für `fixed`/`absolute`-Nachfahren.
     - Ränder fallen nicht mehr über die Abschnittsgrenze zusammen.
   - Das trifft die Prüfungen `zoom` (CSS und gleichwertig) und `forced`, für die die Regel gelten soll.
   - P4-12 hat die Malbegrenzung einmal von Hand geprüft. Eine Werkzeugregel muss sie aber für jede künftige Welle tragen (W6 mit Fließtextlinks).
2. **Probeläufer:** „`probelauf.mjs` für Überschriften“ ist zu breit, wenn der Stil im Messkontext des ganzen Laufs steht. Dann ändern sich Seitenhöhen und Lage der Ziele und damit die gezählten Bildläufe (Z-04). Der Weg muss im echten Zustand gemessen werden.
3. **Keine Gleichwertigkeitsprobe und kein Positiv-Selbsttest vorgesehen.** E-036 zeigt, wohin ein Werkzeug ohne beides führt (LERNEN 2026-10-11).
4. **Fotos und Pixel „messen den echten Zustand“.** Nicht belegt ist, dass Ganzseitenaufnahmen (`fullPage`, `captureBeyondViewport`) übersprungene Abschnitte überhaupt zeichnen.
   - Zeichnen sie leer, werden nach P4-14 Pixelvergleiche zwischen zwei Ständen mit Aufschub wieder blind: beide Seiten leer, also „gleich“.
   - Die Prüfung auf eine „fast einfarbige“ Aufnahme fängt nur ganz leere Bilder.

**Zulässig wird die Regel mit diesen Änderungen:**
- **(a) Exakter Zustand im Bild:** `.k-aufschub { content-visibility: visible !important; contain: layout style paint !important; }`.
- **(b) Enger Geltungsbereich:** nur a11y-zusatz `forced` und `zoom` sowie `texte.mjs`, je in einem eigenen Kontext und unter „bedingungen“ ausgewiesen.
  - `tastatur`, `reflow`, `textabstand`, `ohnejs`, Probeläufer-Wege, Fotos, Pixel, Jury, Lighthouse, INP und Spur laufen ohne Einspeisung.
  - Überschriften im Probeläufer liest man über den Barrierebaum (er enthält übersprungene Inhalte) oder `textContent`, ohne den Stil einzuspeisen.
- **(c) Pflicht-Gegenprobe je Tor:** dieselben Prüfungen einmal ohne Einspeisung, mit jedem Abschnitt einzeln ins Bild gerollt vor dem Lesen; die Kennzahlen müssen gleich sein. Dazu ein Positiv-Selbsttest: ein absichtlich an einer Abschnittskante abgeschnittenes Element muss in beiden Fassungen gefunden werden.
- **(d) Aufschub-Probe im echten Zustand in P4-14 und jeder Welle mit `.k-aufschub`:**
  - Sprungziele
  - Rollen mit CLS 0
  - Seitensuche, Druck
  - Fokus in einem aufgeschobenen Abschnitt
  - Barrierebaum vollständig
  - Nachweis, dass Ganzseitenaufnahmen alle Abschnitte zeichnen (Positiv-Test: eine bekannte Änderung in einem unteren Abschnitt muss als Pixelabweichung erscheinen)

Forced-colors selbst ist von `content-visibility` nicht berührt. Das Werkzeug liest dort Stil und Text, die Regel verdeckt dort nichts außer (1). Den Fokus berührt die Regel nur, wenn (b) nicht eingehalten wird.

---

## Befunde aus Runde 1

| Befund | Stand | Beleg / Begründung |
|---|---|---|
| **H1** ohne JS kein WhatsApp-Weg am Desktop | **behoben** | GET 7 Seiten × 4321 und 4324: Kopf-`<a href="https://api.whatsapp.com/send?phone=491726728504" … aria-label="WhatsApp-Chat starten" class="hidden … lg:flex …">` im Server-HTML; `whatsapp-floating-btn` 0; `data-k-banner` 0. a11y `ohnejs` 0/0/0/0/0 in 14 Läufen. Kanal-Probe: nach der Hydrierung 7/7 da, Name unverändert. Ziel und Name wie der Bestandskopf (`Header.jsx`). Rest siehe N-F. |
| **H2** Banner verdeckt die Einleitung | **behoben** (Lage); Wortlaut **tragfähig begründet** (M-20, Auflagen) | Regel vorab, blind, 3 Bewerter, Zahlen nachgerechnet; c11 und c14 gesichtet; P4-13-Verdeckung nachgerechnet (`nachher-verdeckung.json`): 1440/1920 alles 0; 1024 4 Seiten (`/` 71 %, `/bad` 58 %, `/standorte` 44 %, `/ueber-uns` 12 %), 1280 3 Seiten. Geometrie-Argument trägt (Restraum unter der Einleitung 17–133 px, Leiste ≥ 142 px); der Satz „bis 17 px an den Bildrand“ gilt nur für `/` und `/bad`. |
| M1 F-12 `/standorte` mobil übersprungen | **behoben** | läuft in `suite.json`; Mutation P6: mobil rot |
| M2 Sperrklinke | **behoben** | statisch 116/507, Laufzeit 398, nachgerechnet; Hinweis „grün“ unter Z-05 |
| M3 Pixel nicht freigeschalteter Seiten | **behoben** (Werkzeug berichtigt, 64/0 nach Maske) | `pixel/p4r2-*.json`; Selbsttest `cache/pixel/pixel-selbsttest-maske` (Maske `body` → Abbruch, 1 324 Nachfahren). Vollvergleich: N-D |
| M4 axe nur 2 Ansichten, ohne Fehler | **behoben** | 57 Läufe, Aufteilung nachgezählt. Neue Lücke: N-A |
| N1 Abstand 8 px fest | **behoben** | `umfangStuecke(…, 2·(Versatz+Breite))`, Umriss < 2 px = dünn, Selbsttest 5 Fälle, Erwartungswerte selbst nachgerechnet (244/788/762/888/498) |
| N2 E-031 Wortlaut | **tragfähig begründet** | Text berichtigt; die Umkehrprobe ist auf P7 (`--blind`) verschoben, das ist offen benannt |
| N3 Matrix trägt alte Befunde | **offen** (gering) | Offenlegung steht im ERGEBNIS. `gegenprobe/matrix.json` führt weiter die Befunde des Ausgangsstands, ohne Kennzeichnung; a5-d1440-tastatur zeigt „hoch“, a3-d1440-maus Banner-Befunde aus dem Bestand. Zwei a4-Abbrüche „nicht gefunden“ nach erreichtem Ziel |
| N4 sechs Mutationen gleichzeitig | **behoben** | P6 einzeln |
| N5 Informationskennzahlen ohne Bezug | **offen** (gering) | Runde 2 nennt nur den Bezug zu Runde 1. Gegen den Bestand (p4tor-a11y-basis): Zoom-CSS horizontal 0 → 7, verdeckt 1 → 7; Ring teilverdeckt 221 → 51 |
| N6 texte2 ohne Zustände | **tragfähig begründet** (wie Runde 1) | `zustaende_verglichen` 0. Neu dazu: texte2 sieht keine reinen Browser-Elemente (N-J) |
| N7 K-006 Ring innen | **behoben** | KERN Z. 93 |
| N8 Belegablage | **behoben** | `p4-tor/suite-live-4337-p4-06.json` (382/0/16); `/` in Runde 2 gemessen |

---

## Neue Befunde

### N-A · mittel · Banner-Zustände für Z-11 nicht vollständig belegt (Einstellungen-Ansicht; offener Banner unter forced-colors, Reflow, Textabstand)
- **Ort:**
  - `werkzeuge/axe.mjs` Z. 97: nur `menue` und `erstbesuch`.
  - `werkzeuge/a11y-zusatz.mjs` Z. 954: `einwilligung: 'abgelehnt'` für alle Prüfungen außer Tastatur.
  - `src/components/kern/einwilligung/Banner.tsx`, Schließen-Knopf.
- **Beleg:**
  - **Axe:** Keine axe- oder Tastatur-Messung der Ansicht „Einstellungen“ in Runde 2, P4-13 oder einem Beleg seit P3-08. P4-13 hat ihre Anordnung ab lg geändert (`LEISTE_KOPF`/`LEISTE_TEXT`/`LEISTE_KNOEPFE`). Laut `leistenhoehe-nachher.txt` rollt sie bei 1230–1279 px um 1 px.
  - **Forced-colors:** Der Schließen-Knopf ist reines Symbol ohne Rand. Die Klassen sind `flex size-k-7 … text-k-kalk …`, es gibt kein `forced-colors:border`. Nach dem Werkzeugkriterium „ohne Grenze“ (`FORCED()`, Z. 459 ff.: kein Rand, kein Umriss, kein Text) zählt er, sobald der Banner offen ist.
  - Der Bestand-Knopf (`CookieConsent.tsx` Z. 452 ff.) ist genauso gebaut. „Ohne Verlust“ hält also wahrscheinlich, die Kern-Regel für reine Symbole (Kopf-Telefon: `forced-colors:border`) aber nicht.
- **Vorschlag:**
  - axe-Zustand `einstellungen` (Klick „Einstellungen“; m375/d1440; 7 Seiten, für den Push mindestens `/`).
  - a11y-zusatz `forced`/`textabstand`/`reflow` zusätzlich mit `erstbesuch` und `einstellungen`.
  - Schließen-Knopf `forced-colors:border` wie das Kopf-Telefon.

### N-B · mittel · E-034, Punkt 1 (a3-d1440-maus 6 statt 5): Begründung stützt sich auf eine nicht gemessene Tatsache; T2-Urteil verschweigt den Rückschritt gegen Live
- **Ort:**
  - `ENTSCHEIDUNGEN.md` E-034, Punkt 1: „Ohne Banner kostet derselbe Weg in Bestand und Kern 7 Handlungen.“
  - `belege/p4-tor-r2/ERGEBNIS.md`, Urteil T2: „nichts schlechter als Live“.
- **Beleg:**
  - Die Diagnose liegt in `cache/p4-13/gegenprobe/{vorher,nachher}/diagnose-abgelehnt-a3-d1440-maus/lauf.json` und lief auf 4343 (Kern bd6f877) und 4344 (Kern nach P4-13), je 7. Dazu kommt, dass `bedingungen.einwilligung` dort „erstbesuch“ heißt, obwohl der Lauf als „abgelehnt“ geführt wird.
  - Der Ausgangsstand (4310) ohne Banner ist **nicht** gemessen. Die P4-13-Rückgabe schreibt richtig „in beiden Fassungen“; E-034 macht daraus „Bestand und Kern“.
  - Live (f2c4180) hatte 5, der Kandidat hat 6. Das ist eine Verschlechterung auf der Live-Seite `/` gegen Live und gegen den Bezug.
  - In der Sache ist der Rückschritt vertretbar: Ein Bildlauf zum Absende-Knopf (y ≈ 1267) ist nötig, weil das kleinere scroll-padding (152 statt 414 px) das Formular weniger hochrollt. Das ist der Preis für H2.
- **Vorschlag:**
  - E-034 berichtigen: „Kern vorher und nachher ohne Banner je 7; Ausgangsstand ohne Banner nicht gemessen.“ Optional die Diagnose an 4310 nachholen.
  - Im T2-Urteil die Abweichung nennen.
  - Auflage P6 („Absenden im Bild“, ≤ 5) vorziehen, weil `/` live ist; sonst steht die Abweichung bis P6 live.

### N-C · mittel · ABNAHME „Offene Abweichungen“ seit P3-16 nicht nachgeführt
- **Ort:** `ABNAHME.md`, letzter Commit 452504a.
- **Beleg:**
  - Z-12 steht noch mit „Ziel: nicht über dem Bestand bis zum P4-Tor“ und 196/141 ms. E-035 hat die Frist aber auf P4-14 vor W1 verlegt.
  - a3-d1440-maus `/` +1 (E-034) fehlt.
  - Auch Lighthouse mobil ≥ 90 (85/86) und LCP ≤ 2,5 s (3,46 s) aus K-013 sind verfehlt. Der Bestand verfehlt sie ebenfalls (84; 4,2 s), steht dort aber nicht.
- **Vorschlag:** Die drei Zeilen nachtragen, jeweils mit Bezug und Frist.

### N-D · mittel · Vollvergleich rückwirkend (Ausgangsstand 4310 gegen Live 4337): 8 Abweichungen ohne Erklärung, kein Rauschlauf
- **Ort:** `cache/pixel/p4r2-voll-rueckwirkend/ergebnis.json`, fertig um 16:47 UTC. Es gab 476 Vergleiche; `/` war ausgenommen. 36 davon wichen ab.
- **Beleg** (aus `ergebnis.json`, Diff-Bilder selbst ausgezählt):
  - **28 erklärbar:** je 76 px als 11×11-Kasten in allen 4 Ansichten auf `/faq`, `/leistungen`, `/leistungen/aussen`, `/leistungen/bad`, `/leistungen/untergrund`, `/leistungen/wohnen`, `/preise`. Das ist der Einwilligungshaken (E-014/N-14).
    - Zwei davon zeigen zusätzlich Textversatz: `/leistungen/aussen` d1440 hat 384 px (Bänder y 972–1 286), `/leistungen/bad` d1920 hat 810 px (y 998–1 360). In der Stichprobe trat das schon einmal auf und verschwand bei der Wiederholung.
  - **8 nicht erklärt:**
    - `/ueber-uns` t768 116, d1440 231 und d1920 538 px: eine 3 px breite Senkrechte in der Seitenmitte, y ≈ 2 300–2 630.
    - `/fliesen/konfigurator` d1920: 1 661 px, 160 × 48 px bei y ≈ 5 915.
    - `/standorte/braunfels` t768 403 px, `/standorte/giessen` d1440 414 px, `/standorte/solms` d1440 404 px: je ein flaches Band (4–21 × ~240 px) bei y ≈ 2 115–2 150.
    - `/blog/barrierefreier-balkonaustritt` t768: **18 977 px** in zwei Bändern, y 4 997–5 124 und 7 815–7 864.
  - Das Server-HTML von `/ueber-uns`, `/fliesen/konfigurator`, `/standorte/giessen` und `/blog/barrierefreier-balkonaustritt` ist auf 4310 und 4337 **gleich**, abgesehen von den Klassen-Hashes der Schriften.
  - Die Ursache liegt also im Browser: Zeitabhängigkeit bzw. Lade-Zeitpunkt, oder eine echte Laufzeitänderung im Bestand durch die umverdrahteten Hooks (P3-00l, P4-05, P4-08d; z. B. `MapConsentGate` auf `/standorte/[stadt]`). Welche von beiden, ist nicht entschieden.
  - Ein A/A-Lauf über den Vollvergleich fehlt. Nach der Werkzeugregel und dem T2 im PLAN ist er Pflicht.
- **Vorschlag:**
  - A/A 4337/4337 über alle 119 Seiten laufen lassen und die 8 abweichenden wiederholen.
  - Die Aufnahmen der Abweichungen sichten.
  - Je Fall erklären oder nach der E-036-Umkehrprobe als Befund am Live-Stand vor W1 beheben.
  - Bis dahin gilt E-036 Punkt 3 („einzige Abweichung ist der Haken“) nur für die Stichprobe.

### N-E · mittel (Risiko, nicht messbar mit den Werkzeugen) · Kopf bei 1280–~1296 px mit klassischer Scrollleiste vermutlich zu schmal
- **Ort:** `src/components/kern/kopf-b/Kopf.tsx`; `belege/p4-13/kopfplatz-nachher.txt`.
- **Beleg:**
  - Gemessen sind bei 1280 px 1 172 px Bedarf gegen 1 184 verfügbar, also 12 px Spielraum (vorher 36).
  - Alle Messungen laufen headless mit `--hide-scrollbars`. Das setzt Playwright selbst, siehe `playwright-core/lib/coreBundle.js` Z. 44759.
  - Unter Windows mit klassischer Scrollleiste (≈ 15–17 px) greift `xl` ab einer Fensterbreite von 1 280 px, denn die Medienabfrage zählt die Scrollleiste mit. Der Inhalt hat dann nur ≈ 1 263 px, verfügbar ≈ 1 167 < 1 172.
  - Laut P4-13-Rückgabe ragte bei Unterdeckung das Logo über die Fuge. Gilt auch live für `/`.
- **Vorschlag:**
  - `kopfplatz.mjs` mit `ignoreDefaultArgs: ['--hide-scrollbars']` (oder eingespeister 17-px-Scrollleiste) bei 1280, 1290 und 1296 messen.
  - Bei Unterdeckung die Felder ab xl weiter verengen oder die Hauptnavigation ab einer höheren Stufe zeigen.

### N-F · gering · Kopf-WhatsApp-Link ohne die Touch-Weiche des Bestands
- **Ort:**
  - Kern: `kopf-b/Kopf.tsx`, nur `target="_blank"`.
  - Bestand: `components/common/Header.jsx` Z. 227 ff., `onClick` → `openWhatsApp` bei `isMobileDevice()`, also gleiches Fenster und App-Start ohne leeren Tab.
- **Beleg:** Ab lg ist der Kopf-Link auch auf Tablets quer der einzige WhatsApp-Weg ohne Kanal, etwa iPad mit 1 024–1 366 px; `isMobileDevice` erkennt iPadOS. Dort öffnet der Kern einen neuen Tab, der Bestand die App. Ziel und Name sind gleich (texte/GET).
- **Vorschlag:** `href` behalten und mit dem vorhandenen Hook bzw. `openWhatsApp` als progressive Verbesserung ergänzen (F-10).

### N-G · gering · `lighthouse.mjs` nimmt bei gerader Laufzahl den oberen Mittelwert als „Median“
- **Ort:** `werkzeuge/lighthouse.mjs` Z. 43: `s[Math.floor(s.length / 2)]`.
- **Beleg** (10 Läufe, echter Median):
  - TBT gegen Bestand: 151,5 → 221 ms statt 159 → 247.
  - TBT gegen Live: 251,5 → 233,5 statt 253 → 249.
  - Die Schlüsse ändern sich nicht: über Budget, über Bestand, gegen Live nicht schlechter. Die Zahlen in E-035 und im ERGEBNIS sind aber nach oben verzerrt; Verhältnis 1,46 statt 1,55.
- **Vorschlag:** Den Median für gerade n als Mittel der beiden mittleren Werte rechnen, oder die Definition unter „bedingungen“ ausweisen.

### N-H · gering · INP d1440 nicht im ruhigen Fenster
- **Beleg:** `inp.json`, `last_1min` je Lauf d1440 2,2–4,9 bei 4 CPUs. Die Bestandswerte (296/376/280 ms) sind dadurch vermutlich überhöht. Der Kandidat bleibt mit max 96 ms im Einzellauf unter Budget.
- **Vorschlag:** Im ERGEBNIS offen nennen; d1440 im ruhigen Fenster wiederholen, wenn der Vergleich mit dem Bestand zählen soll.

### N-I · gering · build-vergleich: Herkunft der 29 neuen Selektoren
- **Beleg:** Zu den 29 gehören `@sm:odd:border-r`, `decoration-transparent`, `gap-y-k-6`, `sm:gap-k-3`, `sm:items-baseline` und `sm:px-k-5`. Sie stammen aus den ruhenden Kontakt-Entwürfen bzw. 1c6c9cd und waren schon in T1 additiv. „Leiste, Tokens“ stimmt dafür nicht.
- **Vorschlag:** Die Zeile genauer fassen.

### N-J · gering · texte2 rot 1 nicht freigegeben
- **Beleg:** `texte2/vergleich.json`, `/`: `entfernt aria:aria-label „WhatsApp-Nachricht an Fliesenverlegung Tezgel senden“`, Grund „nicht in der Freigabeliste“. Der PLAN-T2 erlaubt nur MIKROTEXTE. Die Erklärung trägt, ist aber nur im ERGEBNIS festgehalten.
- **Vorschlag:** Eine Regel „reines Browser-Element“ in die Freigabeliste bzw. in MIKROTEXTE aufnehmen (mit Verweis auf die Kanal-Probe), damit texte2 grün meldet und der Fall nachvollziehbar bleibt.

### N-K · gering · Strenge Lesart: Desktop-Summe gehört in die Überschrift
- **Beleg:**
  - Das ERGEBNIS nennt „gesamt 37 → 46“. Am Desktop sind es aber 33 → 26.
  - Für die sechs Entwürfe am Desktop: Runde 1 28 → 23, Runde 2 28 → 22, in der Summe also nicht besser.
  - Je Seite gilt: `/standorte` 3 → 5, `/ueber-uns` 2 → 0, `/kontakt` 5 → 4, die übrigen gleich.
  - Die Erklärung (Wortlaut M-20, „vermutlich“-Streuung bei n = 5) trägt nach den Antworten. Die Summe gehört trotzdem neben die 37 → 46.

### N-L · gering · Freier Probeläufer nicht wiederholt (PROBELAUF §3: Pflicht je Phasentor)
- **Vorschlag:** Mindestens die 5 d1440-Maus-Läufe frei an c5ef582-v wiederholen, oder die Abweichung in L3 ausdrücklich begründen. Die Gegenprobe deckt die Wege, aber nicht die Entscheidungen eines freien Besuchers vor der neuen Leiste.

### N-M · gering · E-036 nicht an den betroffenen Belegen vermerkt
- **Beleg:**
  - Keine der ERGEBNIS-Dateien `t2-5421e5b`, `t2-bcd8fcb`, `t2-4bd371f`, `t2-ca8d5ff`, `t2-f2c4180`, `t2-8319525`, `t2-56fd0dd` und `t2-74e768c` enthält „E-036“.
  - LERNEN (31fc739 „Pixel `/` 4/0“) und E-015 („Umzug … Pixel 0“) sind nicht vermerkt.
  - Der T2 ff531a1 (Umzug P3-00h + P3-00k) steht nicht in der Liste. Ein Pixelbeleg dazu fehlt in `belege/`; die Endpunkte deckt der Vollvergleich.
  - Weitere Werkzeuge mit derselben Maske gibt es nicht (grep über `werkzeuge/*.mjs`: nur `pixel.mjs`). Fotos, Jury-Material, Fünf-Sekunden und a11y-Fokusbilder sind nicht betroffen.
- **Vorschlag:** In jeder genannten Datei eine Zeile „Pixel ungültig (E-036)“ ergänzen.

### N-N · gering · E-035 vergleicht mit dem günstigeren Bezug
- **Beleg:**
  - E-035 stellt 1,55 gegen E-024 (224/140 = 1,60).
  - Der letzte Live-T2 vor P4 (t2-5421e5b, 10 Paare) stand bei 196/141 = 1,39. Gegen diesen Wert ist der Abstand zum Bestand während P4 gewachsen. Ursache ist nicht P4-13, das gegen Live gleich ist.
  - Das berührt die Umkehrprobe von E-024 („steigt TBT in einer späteren Welle weiter“). Wegen verschiedener Fenster und N-G ist das nicht schlüssig, gehört aber genannt.
- **Vorschlag:** 5421e5b und f2c4180 im selben Fenster messen (beide aus git reproduzierbar). Die praktische Folge (keine Freischaltung vor P4-14) hat E-035 schon gezogen.

### N-O · gering · Restfälle „Platz ohne Banner“ über E-034 hinaus
- **Ort:** `src/lib/motion/kopfskript.ts`; ausgeliefertes `<head>` von `/`.
- **Beleg:**
  - Im Server-HTML stehen 11 der 12 `<script src="/_next/…" async>` **vor** dem Kopfskript. Ein sehr früh fehlschlagendes Skript, etwa sofort von einer Erweiterung blockiert, kann sein `error` vor dem Einhängen des Lauschers auslösen. Dann bleibt der Platz stehen.
  - Ebenso: Cookie-Banner-Blocker, die den Dialog per CSS ausblenden, lassen das Attribut stehen. Dann bleiben 152 bzw. 389 px Leerraum am Seitenende und das scroll-padding. Live ist es heute dabei schlechter: Die alte Messung hätte die volle Bildhöhe reserviert.
  - Das Kopfskript selbst liest nur: Cookie-Name und Version kommen aus `cookie-inventory`, die Logik ist gleich `readConsentCookie` + Versionsprüfung. Es schreibt kein Cookie.
- **Vorschlag:** In E-034 als weitere angenommene Restfälle nennen.

---

## Bestätigt (Beleg geöffnet und nachgerechnet)
- **Reinraum und Kopien:** Quelltext gleich c5ef582 bzw. freigeschaltete Kopie; Stempel; Exit 0; 22/22; nft leer.
- **H1 per GET:** 14 Seitenabrufe; Ziel und Name gleich dem Bestandskopf; Kopfskript im ausgelieferten HTML.
- **P4-13-Diff:**
  - Die Banner-Texte sind unverändert (`literal.mjs`): nur das Template `${…}px` der entfernten Messung fällt weg; der Kopf hat `target`, `rel`, `data-motion` und Icon-Namen neu, das Modell den Text „WhatsApp-Chat starten“ (Bestandswortlaut).
  - Knopffolge und gleiche Breite des Paars sind unverändert.
  - Kein Sonderweg für Werkzeuge im Produkt (G7). CSP mit `'unsafe-inline'`, also kein Hash-Problem für das geänderte Kopfskript.
- **Werte aus den Belegen:** a11y, axe, Fotos, Wortbruch, texte2, Suite, Sperrklinke, Mutation und Fünf-Sekunden (alle drei Bewerter) stimmen mit dem ERGEBNIS. Ebenso Gegenprobe (13/15), build-vergleich (172/1; 7/29/5), Pixel `/` (4 060 px, Zeile 8–55), M3-Pixel (64/1 → 0), Lighthouse (Werte wie gemeldet, Median siehe N-G) und INP (alle zwölf Mediane).
- **Verdeckung (P4-13-Tabelle):** Alle 28 Zeilen von vorher und nachher stimmen.
- **Unter lg:** `unter-lg-vorher.txt` = `unter-lg-nachher.txt`; Fünf-Sekunden-Bilder m375 byte-gleich zu Runde 1.
- **E-036, Werkzeug:**
  - Maske nur `#whatsapp-floating-btn` und die Sprechblase.
  - Abbruch bei mehr als 40 Nachfahren und bei mehr als 98 % einer Farbe.
  - Der Positiv-Selbsttest ist belegt.
  - Positive Funde zeigen, dass das Werkzeug jetzt sieht: Kopf-Link, Haken, Sprechblase.
  - Restschwäche: `[style*="z-index: 9996"]` ist ein brüchiger Selektor, gedeckt durch die 40-Nachfahren-Grenze. Teilweise leere Aufnahmen fängt die 98-%-Prüfung nicht (wichtig für P4-14, siehe Urteil 5).

## Nicht geprüft bzw. nicht prüfbar
- **Keine eigenen Browsermessungen erlaubt:**
  - Einstellungen-Ansicht, forced-colors mit offenem Banner, echter Zoom 200 %
  - Kopf mit Scrollleiste (N-E)
  - Ganzseitenaufnahmen unter `content-visibility: auto`
  - Spur aus P4-13 und Lighthouse-Rohdaten über die JSON hinaus
- **Ob die drei Opus-Bewerter wirklich unabhängig waren,** kann ich nicht belegen. Die Begründungen von Protokoll und Umkehrprobe sind im Mittel zu 0,8 wortähnlich, keine ist identisch. Das passt zu einem festen Antwortschema, ist aber kein Beweis.
- **Die Regel, nach der Chrome mehrzeilige Umrisse verbindet,** bleibt wie in Runde 1 nur über Bilder gestützt.
- **Vercel-Live-Stand:** nicht geprüft (kein Zugriff vorgesehen).
- **Jury, Slop, SVG, Bewegung für `/`:** nicht gemessen, nur durch die Bauart begründet.
- **Vollvergleich:** Ich habe nur `ergebnis.json` und die Diff-Bilder ausgewertet. Die Aufnahmen selbst lagen nicht vor.

## Nachtrag Vollvergleich (`cache/pixel/p4r2-voll-rueckwirkend/`)
**Fertig um 16:47 UTC:** 476 Vergleiche, 36 abweichend. 28 davon sind der Einwilligungshaken, der auf sieben Seiten in je 4 Ansichten gewollt leer ist; zwei dieser Fälle haben zusätzlich Textversatz. 8 sind ohne Erklärung. Einzelheiten unter N-D.

Für die Entwürfe ändert das an Z-13 und am P4-Tor nichts, weil M3 Vorschau gegen Live nach der Maske 0 zeigt. Es ist aber ein offener Befund am Live-Stand, der vor W1 geklärt werden muss (E-036, Umkehrprobe).
