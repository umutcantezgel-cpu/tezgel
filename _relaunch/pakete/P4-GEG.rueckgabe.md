# Rückgabe P4-GEG · Frischer Gegenprüfer P4-Tor (T3 Phasentor P4) · Opus · 11.10.2026

Ich habe nur gelesen. Belegdateien, `git log/show/diff`, Quelltext. Dazu einige GET-Abrufe an 4321 (Vorschau 1c6c9cd-v) und 4337 (f2c4180), höchstens einer pro Sekunde: `/kontakt`, `/blog`, `/leistungen`, `/bad`. Kein Browser, kein Build, kein POST, kein git mit Schreibwirkung. Meine Nachrechnungen liefen als Python-Einzeiler über die JSON-Belege und liegen nur im Scratchpad.

## Die drei Urteile

### 1. Z-05, Z-11, Z-13 auf den Hauptseiten-Entwürfen erfüllt
| Kriterium | Urteil | Begründung |
|---|---|---|
| **Z-05** | **ja** | Reinraum 1c6c9cd-v: npm ci, Build, typecheck, lint, `npm test` 22/22 und qa:graph haben alle Exit 0; `nft-relaunch.txt` ist leer (`cache/reinraum-1c6c9cd-v/`). Nachgezählt in `suite.json`: 382 erwartet, 0 unerwartet, 16 übersprungen. Die Kern-Zweige liefen wirklich im Modus `vorschau`: Projektcheck `/bad` mit Radios, Termin `/kontakt#termin-buchen`, Fußlink-Widerruf `/standorte`, alle grün. Konsolenfehler: Fotos 0, Uhr-Spec 32/32 grün, `konsolenfehler` in allen 30 Probeläufer-Läufen leer. **Vorbehalt M1:** Ein Kern-Fall auf `/standorte` mobil wird mit einer Begründung aus dem Bestand übersprungen. Ein Vorbehalt zur Darstellung der Sperrklinke steht unter M2. |
| **Z-11** | **nein** (noch nicht tragfähig belegt; in der Sache kein bekannter A11y-Mangel der sechs Entwürfe) | axe zeigt 0 ernste oder kritische Befunde. Die harten Kennzahlen aus a11y-zusatz habe ich gegen beide JSONs geprüft: 474/225/466/2/6/26/53 → 0. Zwei Lücken bleiben: **(H1)** Die harte Kennzahl „ohne JS“ (E-018) steht im Werkzeug auf **rot**, 4 gegen Bezug 0. Das ERGEBNIS führt sie als „nur Information“, und die Begründung in E-029 ist sachlich falsch. **(M4)** axe lief nur in m375 und d1440 und ohne Fehlerzustände. ABNAHME Z-11 und AUFTRAG §11 Ebene 5 verlangen alle Ansichten samt Fehlerzustand. Bei Z-11 gibt es keinen Ausnahmeweg. Darum muss zuerst der Beleg stimmen. |
| **Z-13** | **ja** | `fotos-zusammenfassung.json` zeigt 24/24 Aufnahmen, 0 Fehler, 0 Überlauf, 0 Konsolenfehler. Wortbruch ergibt 0 Funde über 6 Breiten. Stichprobe gesichtet: drei Ganzseitenbilder m375 von `/kontakt` und `/leistungen`, ohne Mangel. **Getrennt davon:** Die Bedingung des P4-Phasentors „der Pixelvergleich zeigt keine unerklärte Abweichung“ (AUFTRAG §10) fehlt im ERGEBNIS ganz (M3). |

### 2. L3 tragfähig ausgewertet: **nein**
- **Probeläufer:** tragfähig. Die Matrix habe ich nachgezählt: frei 15/15 gelöst, a5-m375 11 statt 10; Gegenprobe a3-m375 14 statt 12, sonst ≤ Bezug. E-031 trägt für den Vergleich, weil `probelauf.mjs` seit c65946d (10.10., 19:59) unverändert ist und die Basis 42a9a48 erst am 11.10. um 01:30 entstand. Die Gegenprobe ist ein deterministisches Nachspielen und hängt nicht an der Zielanzeige. Kleinere Punkte unter N2 und N3.
- **Mutationsprobe:** tragfähig. Die 55 roten Fälle in `suite-mutiert.json` habe ich den sechs Mutationen zugeordnet. Kein Bestandsfall wurde rot. Die Verschärfung der Termin-Spec ist richtig: nachher 8 rot, Vorschau und Live 26/26 grün. Einschränkungen unter N4 und M1.
- **Fünf-Sekunden-Probe:** **nicht tragfähig** (H2). Die Neubewertung nach Protokoll war zulässig und sogar Pflicht. Die Regel wurde blind und für beide Stände gleich angewandt. Aber die Umkehrprobe, die E-030 selbst vorschreibt, ist nicht gelaufen, obwohl sich 29 von 120 Urteilen geändert haben, alle in dieselbe Richtung. Der Bewerter hat zwei Antworten als richtig gewertet, die wörtlich dem Falsch-Beispiel der Regel entsprechen. Und „10/12 erfüllt“ besteht bei drei Seiten-Ansichten nur, weil ausdrücklich geratene Zielgruppen als richtig zählen. Darunter verschwinden zwei Rückschritte am Desktop (/standorte, /ueber-uns).

### 3. Abweichungen und Auflagen ehrlich und vollständig: **nein**
- **H1:** Eine harte Z-11-Kennzahl ist zur Information abgestuft, die Begründung ist falsch.
- **H2:** Der Wert „10/12“ in der Fünf-Sekunden-Probe hängt an geratenen Zielgruppen. Dadurch fehlen Auflagen für W3 und W8.
- **M2:** Die Zahlen zur Sperrklinke sind falsch, und dass die Laufzeit-Sperrklinke seit P3-14 nicht lief, wird nicht offengelegt.
- **M3:** Der Pixelvergleich wird stillschweigend weggelassen.
- **M1:** Ein übersprungener Fall aus dem Bestand gilt für einen Kern-Zweig weiter.

Was ich bestätigen kann, steht am Ende unter „Bestätigt“.

---

## Befunde

### H1 · hoch · „ohne JS“ ist eine harte Kennzahl, wird als Information geführt und falsch begründet
- **Ort:**
  - `belege/p4-tor/ERGEBNIS.md`, Z. 20: neun harte Kennzahlen ohne „ohne JS“, dazu „ohne Verlust“.
  - Ebenda Z. 21: „nur Information … Ohne JS: WhatsApp-Kanal … verborgen“.
  - `ENTSCHEIDUNGEN.md`, E-029, Z. 351.
- **Beleg:**
  - E-018 zählt „ohne JS“ ausdrücklich zu den **harten** Kennzahlen von Z-11. Nur Information sind dort allein „Zoom per CSS-Emulation“ und „Ring teilverdeckt“. ABNAHME Z-11 führt „ohne JS“ in der Methode, die Schwelle heißt „ohne Verlust“.
  - `p4tor-a11y-vorschau3/a11y-zusatz.json` meldet `status.ohnejs = "rot"`, `erster_bildschirm_versteckt` 4. Die Basis hat 0 und `"gruen"`.
  - E-029 behauptet: „Im Bestand ist der Knopf ohne JavaScript zwar sichtbar, aber ein `<button>` ohne Ziel und damit tot.“ **Das ist falsch.**
    - Der Bestands-Kanal wird mit `dynamic(…, { ssr: false })` geladen und erst nach `requestIdleCallback` eingehängt (`src/components/layout/ClientWidgets.tsx:7,35–38`; im Ausgangsstand 707a93d genauso).
    - Das GET-HTML von 4337 `/kontakt`, `/blog`, `/leistungen` und `/bad` enthält weder `whatsapp-floating-btn` noch einen `<button>` mit WhatsApp.
    - Ohne JS hat der Bestand also gar keinen schwebenden Knopf. Es „entfällt“ kein toter Knopf.
  - E-029 sagt auch: „Der Weg zu WhatsApp steht ohne JavaScript im Fuß und in der unteren Leiste.“ Die Kennzahl betrifft aber nur d1440, und die untere Leiste gibt es erst unterhalb von lg (`src/components/kern/fuss/WhatsAppKanal.tsx`, Kopfkommentar). Bei 1440 bleibt ohne JS nur der Fuß.
  - Was ohne JS am Desktop tatsächlich wegfällt:
    - Der Bestandskopf hat einen funktionierenden `<a href="https://api.whatsapp.com/…" class="hidden sm:inline-flex …">` im Server-HTML, also ohne JS sichtbar.
    - Der Kern-Kopf hat ihn nicht. MIKROTEXTE `*` „WhatsApp-Chat starten“ → „–“ (P3-06) begründet das mit „WhatsApp bleibt … als Kanal am Desktop“.
    - Ohne JS ist dieser Kanal unsichtbar. Auf `/bad` und `/kontakt` bleibt er bei d1440 auch **mit** JS im ersten Bildschirm verborgen (`erster_bildschirm_ebenso_mit_js`).
    - Folge: Bei d1440 ohne JS hat keine Kern-Seite einen WhatsApp-Weg im ersten Bildschirm, der Bestand schon. Die Funktion selbst bleibt über den Fuß erreichbar.
- **Bewertung:** Gegenüber dem schwebenden Bestands-Kanal ist das Rot teilweise eine Messasymmetrie: Der Bestand rendert das Element ohne JS gar nicht. Ehrlich wäre deshalb „hart rot 4 (Bezug 0), Messasymmetrie, so begründet“ und nicht „Information“ mit einer falschen Tatsache. Z-11 hat keinen Ausnahmeweg (AUFTRAG §12, L7). Eine „begründete Abweichung“ einer harten Z-11-Kennzahl gibt es nicht.
- **Vorschlag:**
  1. E-029 und das ERGEBNIS korrigieren: „ohne JS“ in die Zeile der harten Kennzahlen, mit Bezug und der richtigen Begründung (ssr:false im Bestand).
  2. Entscheiden, ob der Desktop ohne JS einen WhatsApp-Weg im ersten Bildschirm braucht. Möglich wäre, den Kanal ohne JS sichtbar zu lassen, sodass `invisible` nur an der Klasse des Kopfskripts hängt (K-009, AUFTRAG §7 „Ohne JavaScript ist jeder Inhalt sichtbar“). Er muss dann so liegen, dass er nichts verdeckt. Sonst wird die Streichung aus P3-06 ausdrücklich auch für „ohne JS“ und für `/bad` und `/kontakt` mit JS begründet.
  3. Optional: Die ohne-JS-Prüfung zählt zusätzlich sichtbare Kontaktwege im ersten Bildschirm, bei Bestand und Vorschau gleich.

### H2 · hoch · Fünf-Sekunden-Probe: Umkehrprobe aus E-030 fehlt, Regel inkonsistent angewandt, „10/12“ hängt an geratenen Zielgruppen
- **Ort:**
  - `belege/p4-tor/fuenf/ERGEBNIS.md`
  - `belege/p4-tor/ERGEBNIS.md`, Z. 35
  - `ENTSCHEIDUNGEN.md`, E-030, Z. 359 (Umkehrprobe)
- **Beleg (nachgerechnet aus `zuordnung-*.json`, `bewertung-protokoll.json`, `bewertung-je-bild-verworfen.json`, `antworten.json`):**
  - Die Tabelle im ERGEBNIS stimmt exakt: Bestand 57 (Region 35), Vorschau 56 (Region 60). `bewertung-eingabe.json` enthält nur id und die drei Antworten und deckt sich zu 120/120 mit `antworten.json`. Der Bewerter war also blind.
  - Gegenüber der Rohwertung kippen **29 von 120 Urteilen (24 %), alle von falsch auf richtig** und alle bei der Zielgruppe (Bestand 18, Vorschau 11). E-030 schreibt für diesen Fall vor: „Weicht die Neubewertung … stark ab, wird eine zweite unabhängige Bewertung als Gegenprobe beigelegt.“ **Diese Bewertung gibt es nicht**; der Ordner enthält keine zweite.
  - Die Neubewertung rettet genau drei Seiten-Ansichten der Vorschau über die Schwelle: /ueber-uns d1440 von 2 auf 5, /ueber-uns m375 von 1 auf 5, /standorte d1440 von 4 auf 5 (vorher unter der Basis).
    - **/ueber-uns m375:** Alle fünf Betrachter schreiben sinngemäß „nennt keine Zielgruppe ausdrücklich; vermutlich …“, einer wörtlich „geraten sind Privat- und Gewerbekunden“ (A027). Gewertet wurde 5/5 richtig, im ERGEBNIS als „✓ (besser)“.
    - **/standorte d1440:** Im Bestand nennen alle fünf „Privatkunden, Architekten und Bauherren“ aus dem Begrüßungstext. In der Vorschau schreiben zwei, der Banner verdecke diesen Satz („Nur teilweise erkennbar … vermutlich“). Der Kern-Banner liegt am Desktop also über dem Satz, der die Zielgruppe nennt.
    - **/ueber-uns d1440:** Im Bestand nennen vier die Zielgruppe ausdrücklich, in der Vorschau zwei, drei schreiben „steht nicht ausdrücklich auf dem Bildschirm“.
  - Der Bewerter hat seiner eigenen Regel widersprochen. E-030 nennt als **falsch** „ob privat oder gewerblich, unklar“. Als richtig gewertet wurden trotzdem:
    - **A029** (Vorschau /kontakt m375): „Ob Privat- oder Gewerbekunden gemeint sind, ist nicht eindeutig erkennbar.“
    - **A039** (Bestand /standorte m375): „ob privat oder gewerblich … nicht zu erkennen“.
    - Beides ändert kein Schwellen-Urteil, zeigt aber, dass die Strenge auch im Protokoll-Lauf schwankt.
- **Bewertung:**
  - Die Neubewertung war zulässig, denn §8 verlangt einen Bewerter für alle. Die Regel ist für beide Stände gleich angewandt. Dass sie Vorsicht nicht bestraft, lässt sich vertreten.
  - Sie misst aber das Vorwissen des Modells („Fliesenleger, also Privatleute“) statt dessen, was die Seite sagt. Der Bestand bekommt mobil 5/5 auf Bildern, die der Banner fast ganz verdeckt.
  - So deckt die Regel genau die Fälle zu, die die Probe finden soll. Die Ursachenanalyse („Zielgruppe steht nirgends im Wortlaut“) gilt nicht nur für /kontakt und /leistungen, sondern auch für /ueber-uns. Dazu kommt der verdeckte Satz auf /standorte d1440.
- **Vorschlag:**
  1. Die Umkehrprobe aus E-030 ausführen: ein zweiter frischer Opus, blind, dieselben A001–A120.
  2. Im ERGEBNIS zusätzlich eine strenge Lesart ausweisen, „Zielgruppe aus dem Bild genannt, nicht geraten“, für beide Stände.
  3. A029 und A039 nach der Regel werten.
  4. Auflagen ergänzen:
     - **W3 `/standorte`:** Banner bei d1440 gegen den Einleitungssatz mit der Zielgruppe, oder Satz im ersten Bildschirm frei.
     - **W8 `/ueber-uns`:** M-20 wie bei W2/W9.
  5. Die Zeile „/ueber-uns ✓ (besser)“ streichen oder einschränken.

### M1 · mittel · Kern-Fall F-12 `/standorte` mobil wird mit einer Bestandsbegründung übersprungen
- **Ort:** `werkzeuge/tests/funktion-einwilligung.spec.mjs:220`: `test.fixme(isMobile, 'Ausgangsstand: Info-Kasten der Standortkarte überdeckt …')`.
- **Beleg:**
  - Der Kern behebt genau diese Ursache. Laut `src/components/kern/seiten/standorte/Abschnitte.tsx:59–60` steht der Kasten neben der Karte und „verdeckt den Platzhalter-Knopf nicht mehr (Ausgangsstand: F-12 mobil `fixme`)“.
  - Trotzdem bleibt der Fall in `suite.json` (Vorschau) mobil `skipped`. Auch in der Mutationsprobe wurde P6 auf `/standorte` nur am Desktop erkannt.
  - Die Formulierung „gleiche 16 wie am Live-Stand“ verdeckt das: Für die Vorschau ist dieses Auslassen nicht mehr begründet.
- **Vorschlag:** `test.fixme(isMobile && !istKern('/standorte'), …)`, dann die Einwilligungs-Spec gegen 4321 wiederholen. Erwartet ist der mobile Fall grün und Mutation P6 auch mobil rot. Die Sperrklinke bleibt gültig, denn am Live-Stand bleibt der Fall `fixme`.

### M2 · mittel · Sperrklinke: falsche Zahlen, und die Lücke in der Laufzeit-Sperrklinke ist nicht offengelegt
- **Ort:** `belege/p4-tor/ERGEBNIS.md`, Z. 17 („expect 506 statt Basis 501“) und Z. 43 („507“).
- **Beleg:**
  - **Statische Basis:** `git show efdc29e^:_relaunch/belege/testzahl-basis.json` ergibt 456 `expect`, 109 Fälle. Nach efdc29e sind es 507 und 116. „Basis 501“ ist die Zählung aus T2 bcd8fcb/5421e5b, nicht die Basis. 506 (Z. 17) und 507 (Z. 43) widersprechen sich, gemeint sind vor und nach der Verschärfung.
  - **Laufzeit-Sperrklinke:** P4-06 (Rückgabe, Abschnitt Tests) belegt, dass sie gegen die alte Basis schon mit dem T2-Bericht 74e768c rot war: `kontaktwege::mobil` 1→2, `navigation::mobil` 4→7. Keines der späteren T2-ERGEBNISSE (bcd8fcb, 5421e5b, f2c4180) nennt eine Laufzeit-Sperrklinke, nur statische Zahlen. Laut PLAN (Runde-3-Tabelle Z. 8) ist sie Teil von T2.
  - **Neue Basis in der Sache gerechtfertigt:** Die neun mobilen `skip` sind Gerätefälle: Mega-Menü 3 × `/` und `/leistungen`, Inhaltsverzeichnis, Entprellung `/` und `/kontakt`. Ihre Desktop-Gegenstücke sind grün, Navigation am Desktop 31/31.
- **Vorschlag:**
  - Zahlen korrigieren: statisch 456 → 507, Laufzeit 292 → 398 Fälle.
  - Offen sagen, dass die Laufzeit-Sperrklinke seit P3-14 in keinem T2 lief bzw. rot war.
  - `--bericht` fest in das T2-Skript aufnehmen.

### M3 · mittel · Pixelvergleich des P4-Phasentors fehlt ohne Erwähnung
- **Ort:**
  - AUFTRAG §10 P4: „Phasentor: Z-05, Z-11 und Z-13 auf den Hauptseiten erfüllt; der Pixelvergleich zeigt keine unerklärte Abweichung.“
  - `ERGEBNIS.md`, Z. 7 nennt nur Z-05, Z-11 und Z-13.
- **Beleg:** In `belege/p4tor*`, `belege/p4-tor` und `cache/pixel/` gibt es keinen Pixel-Lauf für die Vorschau. Für das Live-Produkt trägt T1 1752144: build-vergleich streng, HTML 172/172 gleich, CSS gleich.
- **Vorschlag:** Entweder Pixel der nicht freigeschalteten Seiten gegen Live laufen lassen (4 Ansichten, Stichprobe nach T2-Regel). Oder im ERGEBNIS ausweisen, dass T1 1752144 die Bedingung für das Live-Produkt trägt und der Pixelvergleich je Seite in den Wellen-T2 folgt.

### M4 · mittel · axe nur in 2 von 4 Ansichten, ohne Fehlerzustand
- **Ort:**
  - `belege/p4tor-axe-vorschau/axe.json`
  - `ERGEBNIS.md`, Z. 19 („6 Seiten × Ansichten + Zustände“)
- **Beleg:**
  - Laufzählung: `normal` nur in m375 und d1440 (je 6), dazu `menue` m375 (7) und `erstbesuch` m375/d1440 (je 7), zusammen 33 Läufe. Es gibt keinen Lauf in t768 oder d1920 und keinen Fehlerzustand eines Formulars.
  - ABNAHME Z-11 verlangt „alle Ansichten + Menü/Dialog/Fehler“, AUFTRAG §11 Ebene 5 ebenso. Die P0-Basis (`p0-ausgangsstand/axe.json`) lief in allen vier Ansichten.
- **Vorschlag:**
  - axe auf den sechs Seiten auch in t768 und d1920 laufen lassen.
  - Fehlerzustände ergänzen: leeres Absenden des Anfrage-Funnels auf `/kontakt` und `/leistungen`, Projektcheck `/bad`, Kalender `/kontakt`.
  - Die ERGEBNIS-Zeile präzise fassen.

### N1 · niedrig · Messkorrektur E-029: richtig für die gemessenen Formen, aber der Abstand von 8 px ist für 2 px/2 px fest verdrahtet
- **Ort:** `werkzeuge/a11y-zusatz.mjs:241` (`LUECKE_MAX = 8`) und `umfangStuecke`.
- **Beleg, dass die Korrektur sachlich richtig ist:**
  - Die Fokusbilder `cache/a11y-zusatz/p4tor-a11y-vorschau2/tastatur/*/blog/*-fokus.png` zeigen bei übereinanderliegenden Zeilen **einen** Umriss ohne innere Kanten, auch als Treppe (m375/016). Das Bild `p4tor-a11y-vorschau/…/bad/040-fokus.png` zeigt getrennte, vollständige Ringe.
  - Nachgerechnet:
    - `/bad` d1440 mit zwei getrennten Stücken: U = 698, abzüglich Radien 695, Verhältnis 2,09. Das alte Rechteck kam auf 985 und damit fälschlich auf 1,47.
    - `/blog` d1440 mit drei gestapelten Stücken: 758 → 755, Verhältnis 2,03.
    - `/blog` m375 als Treppe: 598 → 595, Verhältnis 2,04.
  - Alle 80 mehrteiligen Elemente der Vorschau haben `outline: solid 2px`, `outline-offset: 2px`. Das kleinste Verhältnis ist 2,03, deutlich über 1,5. Die Hürde sinkt in diesem Tor also nicht.
- **Restrisiko:**
  - Der Abstand 8 = 2·(Versatz + Breite) gilt nur für 2 px/2 px. Ein Ring mit 1 px ohne Versatz wäre bei Zeilenabständen von 3 bis 8 px in Chrome getrennt gezeichnet. Das Werkzeug verbindet die Stücke trotzdem und setzt U zu klein an.
  - Beispiel: zwei Zeilen 200 × 22 mit 5 px Abstand. Das ergibt Verhältnis ≈ 1,8 und damit „ok“, ein echter dünner Ring bliebe unentdeckt.
  - Außerdem:
    - Die Basis (225 „dünn“) ist mit dem alten Rechteck gemessen. „Gilt für Basis und Vorschau gleich“ stimmt nur der Regel nach; ohne Folgen, weil die Vorschau 0 hat.
    - „An drei Formen nachgerechnet“ ist nirgends abgelegt.
    - „22 Artikeltitel“ zählt Einträge über Zustände und Ansichten, gemeint sind 10 bzw. 11 Titel.
- **Vorschlag:**
  - Den Abstand aus der berechneten `outline-width` und `outline-offset` ableiten.
  - `outline-width` < 2 px unabhängig von den Pixeln als „dünn“ werten (`stil` liegt schon vor).
  - Die drei Formen als Selbsttest ins Werkzeug aufnehmen. Wichtig vor W6.

### N2 · niedrig · E-031: „nicht den Weg dorthin“ stimmt so nicht
- **Ort:** `ENTSCHEIDUNGEN.md`, Z. 370; `werkzeuge/probelauf.mjs:957–959`.
- **Beleg:**
  - Der Probeläufer startet nach jedem angehängten Schritt neu (PROBELAUF §1). Die Liste der Ziele mit ✓/· erscheint also nach jedem Teilschritt.
  - Die Namen verraten teils Inhalte, etwa „Gründungsjahr 2008 oder ‚über N Jahre‘“ und „Note mit Bewertungen/Rezensionen“.
  - Für den Vergleich trägt es trotzdem, weil Basis und P4 unter derselben Bedingung liefen und die Gegenprobe nichts davon abhängt.
  - Die Umkehrprobe aus E-031 („zeigt ein Lauf, dass …“) ist nicht als durchgeführt belegt. Der Probeläufer selbst schreibt: „kann eine Beeinflussung aber nicht ausschließen“.
- **Vorschlag:** Den Wortlaut in E-031 berichtigen und die Umkehrprobe kurz belegen.

### N3 · niedrig · Matrix der Gegenprobe trägt alte Befunde des Ausgangsstands, darunter einen „hoch“
- **Ort:** `belege/p4-tor/probelauf/gegenprobe/matrix.json`.
- **Beleg:**
  - Die Eingaben wurden unverändert übernommen, samt `befunde`.
  - Darin stehen a5-d1440-tastatur „hoch: … 87 Tab-Drücke“ und a4-d1440-tastatur „Banner erst nach 190× Tab“. Der Vorschau-Lauf braucht aber 35 Schritte.
  - Wer nur die Matrix liest, zählt 1 hoch.
  - Dazu laufen die Gegenproben a4 mit Abbruch „nicht gefunden“ („Butzbach 35 km“, „Gießen 25 km“). Das Ziel war vorher erreicht, das ERGEBNIS nennt den Abbruch aber nicht.
- **Vorschlag:** `befunde` in den Gegenprobe-Eingaben leeren oder als „übernommen aus Ausgangsstand“ kennzeichnen. Die Abbrüche in einem Satz erwähnen.

### N4 · niedrig · Mutationsprobe: sechs Mutationen gleichzeitig, vom Orchestrator gesetzt
- **Ort:** `belege/p4-tor/mutation/MUTATION.md`; AUFTRAG §11 Ebene 2 („Ein Gegenprüfer bricht je Funktion …“).
- **Beleg:**
  - Die Zuordnung ist sauber, das habe ich nachgeprüft. Rot wurden Einwilligung 5, Express-Funnel 42, Kontaktwege 2, Navigation (Blog-Suche) 2 und Projektcheck 4, nach der Verschärfung Termin 8. Kein Bestandsfall wurde rot.
  - Gleichzeitige Mutationen können sich aber grundsätzlich überdecken. F-12 `/standorte` mobil ist nicht abgedeckt (M1).
- **Vorschlag:** In der Welle nur akzeptieren, wenn die Zuordnung je Fall belegt bleibt, wie hier. Sonst je Mutation einzeln laufen lassen.

### N5 · niedrig · Werte der Informationskennzahlen ohne Bezug genannt
- **Beleg:** Der CSS-Zoom hat sich verschlechtert: horizontal 0 → 6, verdeckt 1 → 6 (Basis- und Vorschau-JSON). Das ERGEBNIS nennt nur „horizontal 6“. Der gleichwertige Zoom ist in Ordnung, 0 gegen 1. `fokus_ring_teilverdeckt_fest` steht bei 133 gegen 221 und ist nicht genannt.
- **Vorschlag:** Den Bezug mit angeben.

### N6 · niedrig · texte2 ohne Zustände
- **Beleg:** `p4tor-texte2/vergleich.json` meldet `zustaende_verglichen: 0`. Laut PLAN gehören zu T2 „Build-HTML + Zustände“.
- Die 369 Einträge „hinzu“ habe ich gesichtet: Texte der Hülle und der Navigation, Ortsnamen, Bedienbeschriftungen, keine neue Überschrift und kein neuer Absatz. Die zwei Einträge „pflichtanker-fehlt“ fehlten schon in A.
- **Vorschlag:** Zustände der Formular-Inseln ergänzen oder ihr Fehlen begründen.

### N7 · niedrig · KERN K-006 kennt den Ring innen nicht
- **Beleg:** K-006 schreibt `outline-offset: 2px` vor. Der Ring innen (`-outline-offset-4`) steht jetzt an vier Stellen: Hauptnavigation, untere Leiste, Kontaktblatt und Kalender (E-029).
- **Vorschlag:** Die Regel „an Kanten zu Tinte Ring innen“ in K-006 aufnehmen.

### N8 · niedrig · Belegablage
- Der Live-Lauf 4337 mit 382/0/16 ist nur in der Rückgabe P4-06 als Zusammenfassung belegt. Die Datei `lauf1-4337.json` lag im Scratchpad des Unteragenten.
- `/` als siebte Hauptseite ist in diesem Tor nicht neu gemessen (a11y-zusatz, Fotos, Wortbruch). Belegt ist die Seite über das P3-Tor und die T1-Gleichheit.
- **Vorschlag:** Den Live-JSON nach `belege/p4-tor/` legen und die Abdeckung von `/` ausdrücklich nennen.

---

## Bestätigt (Beleg geöffnet und nachgerechnet)
- **Übertrag 5913897-v → 1c6c9cd-v trägt.** `git diff 5913897 1c6c9cd -- . ':(exclude)_relaunch'` berührt nur zwei Dateien: Klassenlisten, einen weggefallenen `fokus`-Import und Kommentare. Texte, Metadaten, Links und Struktur bleiben unverändert. Damit gelten texte2, SEO und axe der älteren Vorschau weiter. axe wertet `:focus-visible` im Ruhezustand nicht aus. 4321 liefert heute die 1c6c9cd-Klassen aus (`-outline-offset-4`, `outline-k-kalk`).
- **Teständerungen P4-06 sind gleichwertig oder strenger.**
  - `page.goto` wird zu `oeffne`, also goto plus Wartebedingung, und bricht ohne Element ab.
  - Die Rolle wechselt nach `istKern`: Radio oder Checkbox mit `toBeChecked` statt Knopf mit `aria-pressed`. Die Aussage bleibt gleich.
  - Kein `expect` ist weggefallen; statisch geht es von 456 auf 507.
  - Neu ist die Uhr-Spec, die zusätzlich prüft, dass die Uhr wirklich vorgestellt ist.
- **Verschärfung der Termin-Spec ist richtig.** Im Kern-Zweig muss das Datum der Überschrift von Schritt 2 gleich dem Datum des angeklickten Tag-Knopfs sein. Mit Mutation P2 sind 8 Fälle rot, und zwar genau die F-07-Fälle auf `/kontakt`. Vorschau und Live sind je 26/26 grün.
- **Neue Laufzeit-Basis ist in der Sache gerechtfertigt** (Einschränkung zur Offenlegung unter M2).
- **a11y-zusatz, harte Kennzahlen außer „ohne JS“:** Bezug und Vorschau stimmen mit den JSONs überein. „dünn“ steht bei 10 → 22 → 0 über vorschau, vorschau2 und vorschau3, der Verlauf ist nachvollziehbar.
- **Fünf-Sekunden-Tabelle:** Die Zahlen stimmen mit dem Protokoll überein; zur Belastbarkeit siehe H2.
- **Probeläufer:** Die Matrix stimmt mit dem ERGEBNIS überein. Konsolenfehler 0. P4-11 hat Abschnitt 7 nicht gelesen (Selbstauskunft).
- **Slop:** Die Summe weich 23 und hart 0 je Seite stimmt. P0 auf den sechs Seiten: 58.
- **UNANTASTBAR:**
  - texte2 0 rot und keine neue Überschrift.
  - Logodateien `tezgel-logo.webp` und `-dark.webp` sind gleich, seit f2c4180 gibt es keine Änderung unter `public/images/logo`.
  - Seit f2c4180 hat sich nur Code unter `src/components/kern` und `src/app/(kern)` geändert, also keine Hooks und kein `src/lib` (G9).
  - Im Kern-Code gibt es kein `fetch`, kein `/api/` und keinen Zugriff auf `localStorage` oder Cookies.
- **SEO:** meta 0, seo 0, Sitemap ohne Änderung, 0 kaputte Links.
- **Reinraum 1c6c9cd-v:** alle Schritte Exit 0, Tests 22/22.

## Nicht geprüft bzw. nicht prüfbar
- Keine eigenen Browser-Messungen erlaubt. Nicht nachgemessen habe ich deshalb:
  - Fokusringe, ohne JS, Reflow, Zoom, forced-colors
  - axe
  - Fotos, Wortbruch
  - Suite, Mutationsprobe, Probeläufer, Fünf-Sekunden-Antworten
- Ich habe nur die Belege gelesen und mit GET-HTML gegengeprüft.
- Die genaue Regel, nach der Blink Umrisse verbindet, kenne ich aus dem Quelltext nicht. Gestützt habe ich mich auf die Fokusbilder, die zu „2·(Versatz + Breite)“ passen.
- Ob a11y-zusatz, Fotos und Wortbruch genau gegen 1c6c9cd-v liefen, kann ich nicht beweisen. Die JSONs tragen keinen Stempel. Plausibel ist es über die Zeitstempel nach `reinraum-1c6c9cd-v` (10:43) und den heutigen Stand auf 4321.
- Der Live-Lauf 4337 (382/0/16) ist nur als Angabe aus P4-06 belegt, die JSON-Datei liegt nicht in `belege/`.
- Fotos: Von 24 Aufnahmeserien habe ich nur drei Bilder und die Fokusbilder selbst angesehen.
- Den Inhalt der Slop-Funde habe ich nicht neu beurteilt.
- Das Ergebnis von T1 1752144 (build-vergleich) habe ich nicht nachgerechnet, nur gelesen.
- Lighthouse und Z-12 gehören nicht zum Auftrag.
- Ausgangsstand 4310 war für GET nicht freigegeben. Den Bestand von 707a93d habe ich nur über `git show` geprüft.
