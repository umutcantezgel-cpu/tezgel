# UM-E3-LEIT · Notiz des Baumeisters (28.10.2026, mit Nacharbeit nach zwei Prüfern)

Paket: Laserlinie als Leitfaden auf `/` mit Abschnittsmarke (PLAN-Zeile UM-E3-LEIT; Z-05, Z-06). Schreibrechte `src/components/kern/Leitachse.tsx`, `src/app/bewegung.css`.
Briefing `pakete/UM-E3-W3.md`, Kern 4.3 (K-007 Leitfaden-Motiv „markiert den aktuellen Abschnitt“, K-008 `leitachse`, Regeln v4), E-067-1/-2, E-078, E-080, E-081, E-082.
Arbeitskopie `w3/baum` (fortlaufend nach CURSOR und SCROLL), Stand vorher `w3/vor-UM-E3-LEIT`, Diff `w3/UM-E3-LEIT.diff` (2 Dateien, 186 Zeilen, nach der Nacharbeit neu erzeugt).
Stand vorher: `rsync` fehlt, Abzug wie bei SCROLL mit `tar --exclude=./node_modules`; `diff -rq` gegen die Arbeitskopie war vor dem ersten Edit leer.

## Nacharbeit nach der Prüfung (vier Befunde)
Jeder Befund ist am Code nachgeprüft. Ein Browser stand nicht zur Verfügung (Briefing); die Bildbelege der Prüfer sind übernommen, die Rechnung ist nachvollzogen.

1. **Hoch, behoben: Marke im gemalten Bild nicht an der Spitze (`100cqb`).**
   - Nachgeprüft:
     - Der Keyframe verschob die Marke um eine Länge in Container-Einheiten.
     - Die Bahnhöhe ändert sich nach dem Start der Animation immer. Der Platzhalter der Suspense-Grenze (`min-h-dvh`, ErzaehlSeite.tsx) wird durch den Inhalt ersetzt, und `spaet-zeichnen` (content-visibility) korrigiert Höhen beim Scrollen.
     - Der Prüfer hat gemessen: Der Versatz beträgt p mal (Bahnhöhe − 100dvh). Das passt dazu, dass Chromium die Länge auf dem Compositor beim Start festhält. Weil die Main-Thread-Werte stimmen, konnten DOM-Rechtecke und mein Rechenmodell den Fehler nicht sehen.
   - Umbau (Vorschlag des Prüfers):
     - Die Marke ist jetzt ein Streifen in voller Höhe der Bahn (`height: 100%`, 12 px breit, `margin-inline-start` wie bisher). Das Fugenkreuz sitzt mittig auf seiner Unterkante (`absolute bottom-0 left-0 size-3 translate-y-1/2`).
     - Keyframe `from { translate: 0 -100% } to { translate: 0 0 }`, opacity wie bisher. Prozent bezieht sich auf die eigene Box, und Chromium startet Transform-Animationen mit Prozentwerten neu, wenn sich die Box ändert. Der Prüfer hat in einer privaten Kopie gemessen: Kreuzarm in Zeile 337 bei Spitze 337,6, in allen fünf Kalk-Stellungen von `/` (m390).
     - `container-type: size` an der Bahn entfällt.
   - Folgeänderungen:
     - `data-leitachse` sitzt am 12-px-Kreuz, nicht am Streifen. Sonst prüfte `ueberlappung.mjs` ein Rechteck in voller Seitenhöhe.
     - Die Position steht in Utilities statt in Regeln im Layer components, wegen des Hinweises zu `inset-0`.
     - `-bottom-1.5` aus dem Vorschlag liegt nicht auf der Abstandsskala (`werte.mjs`: 1 Befund). Darum `bottom-0` mit `translate-y-1/2`, das ergibt dieselbe Lage.
   - Kommentar in bewegung.css: „keine cq-Einheiten“, mit Begründung.
   - Die Rauchprobe hat dafür eine Prüfung „keine cq- oder Bildschirm-Längen an Streifen und Bahn“ und zwei Gegenproben (`cqb`, `eingefroren`).
2. **Mittel, behoben: Marke unter den Fliese-Flächen.**
   - Nachgeprüft: Die Abschnitte mit `bg-fliese` sind positioniert (z-auto) und malen in Baumreihenfolge über der Zierebene. Auf `/` betrifft das Ablauf, Kundenstimmen und Schritt, rund die Hälfte der Lot-Länge.
   - Umbau:
     - Die Bahn trägt `z-10`. Die Zierebene und ihre innere Hülle bilden keinen Stapelkontext, also steht die Bahn in Ebene 10 der Seite: über den Flächen und dem Inhalt (z-auto, `spaet-zeichnen` als eigener Kontext), unter den Fugenkreuzen der Abschnittskanten (z-10, im Baum später) und unter Kopf, unterer Leiste, Banner und Menü (z-30 bis z-50).
     - Das Lot bleibt unter den Flächen (Gutachten u8).
     - Keine Ebene über Text: Die Bahn ist 0 px breit, der Streifen 12 px im Seitenrand (mobil 2 bis 14 px, md 10 bis 22, lg 26 bis 38). Der Text beginnt bei 16, 32 und 48 px.
     - Die Zierebene selbst bleibt ohne z-index. Die alte Ebene `absolute inset-0 z-10` über allem war die Ursache für 1 836 bgOverlap (R-01a, 9a5ea812).
   - Für die Sichtabnahme:
     - Im Ablauf mobil steht die Marke auf der roten Schrittlinie (`-ml-2`, also auf dem Lot). Ab lg steht sie neben der roten Treppe.
     - Im Schritt steht sie 2 px neben dem roten Rand der Ziel-H2 (mobil).
     - Das ist dieselbe Linie, kein zweites Rot. Trotzdem bitte in Z-05 ansehen (K-003 „ein Rot je Bildschirm“).
   - Zu wiederholen: axe (bgOverlap) und `ueberlappung.mjs`, siehe Offene Fragen 1.
3. **Mittel, als Entscheidung festgehalten: Geltung auf acht Erzählseiten statt nur `/`.**
   - Nachgeprüft: 8 Inhalte mit `einstieg: 'mitte'`. Die Regel hängt an der Lage im DOM.
   - Entschieden: **Die Ausweitung bleibt und ist gewollt.** Gründe:
     - K-007 nennt „alle Erzählansichten“.
     - Die sieben weiteren Seiten sind aus derselben Vorlage gebaut wie `/`.
     - UM-E4-VORL kann ohne Schreibrecht an `bewegung.css` den Leitfaden in die übrigen Vorlagen tragen, wenn die Regel an der Lage im DOM hängt (Übergabe 6).
     - Eine Begrenzung auf `/` bräuchte einen Haken, den die beiden Paketdateien nicht sauber setzen können. Möglich wären eine Eigenschaft aus ErzaehlSeite.tsx (nicht im Paket) oder `:has()` auf ein Startseiten-Element (zerbrechlich). UM-E4-VORL müsste ihn dann ohne Schreibrecht an `bewegung.css` wieder lösen.
   - Kommentare in bewegung.css und Leitachse.tsx sagen das jetzt ausdrücklich („mit Absicht die übrigen Seiten dieser Vorlage“).
   - Für den Orchestrator:
     - PLAN-Zeile UM-E3-LEIT nachführen, z. B. „auf `/` und den Erzählseiten der Vorlage“.
     - Prüfplan um die sieben Seiten erweitern (Offene Fragen 1).
   - Richtigstellung zu meiner ersten Notiz und zum Beleg des Prüfers: Der große Moment `weg` steht auf **keiner** Live-Seite.
     - `/bad/badsanierung` übergibt keine `momente`.
     - `Weg` ist nur in `src/app/(bestand)/werkstatt-schaufenster/weg/page.dev.tsx` eingebunden.
     - Der Abgleich `weg` gegen Leselinie ist also kein Prüfpunkt dieses Pakets. Er gilt erst, wenn `weg` auf eine Seite kommt (Offene Fragen 4).
4. **Gering, nicht umgestellt: `html.k-bewegung` statt `:not(.k-notaus)`.**
   - Begründung siehe Entscheidung 5 und nicht_behoben in der Rückgabe.
   - Neu ist ein Satz im Kommentar von bewegung.css: Der Leitfaden hat keinen Startzustand und läuft im Notaus weiter.
   - Die Abweichung vom Muster der Nachbarregeln ist so im Code festgehalten. Für REG bleibt Offene Frage 2.

## Entwurf

**Bestand vorher.**
- Auf `/` umschließt die Leitachse alle Abschnitte nach dem mittigen Einstieg.
- Sie besteht aus einem grauen Lot und einem roten Stück. Das rote Stück wächst über einen view-timeline des Lots im Bereich `contain`.
- Die Spitze wanderte dabei über die ganze Seite langsam vom oberen zum unteren Bildschirmrand.
- Jeder der sieben Abschnitte setzt an seiner Oberkante ein Fugenkreuz in Tinte auf das Lot (Ebene z-10).
- Den aktuellen Abschnitt markierte nichts.

**Neu: Leitfaden mit Abschnittsmarke (nur CSS, kein Skript).**
- **Leselinie.** Die rote Spitze steht fest bei 40 % der Bildschirmhöhe von oben.
  - Über der Linie ist das Lot gezogen, also gelesen; darunter liegt die graue Grundschicht, also das, was noch kommt.
  - Beim Scrollen bewegt sich auf dem Bildschirm nichts: Linie und Marke stehen still, der Inhalt läuft unter ihnen durch.
  - Bereich `cover 60vh` bis `cover calc(100% - 40vh)`, Zeitstrahl ohne Inset.
- **Abschnittsmarke.** An der Spitze sitzt ein rotes Fugenkreuz (12 px, `laser`, gleiche Lage wie die Fugenkreuze der Abschnittskanten).
  - Sie steht immer im Abschnitt, der gerade gelesen wird, auch auf Fliese-Flächen.
  - Sie trifft das Fugenkreuz an der Oberkante eines Abschnitts genau in dem Moment, in dem er an die Reihe kommt.
  - Nach einem Sprung zu einem Anker liegt die Abschnittsoberkante bei 96 px (scroll-padding-top) und damit über der Leselinie; die Marke steht also im Zielabschnitt.
  - Sichtbar ist sie nur, solange die Leselinie auf dem Lot liegt. Sie erscheint unter dem Fugenkreuz des ersten Abschnitts („Ihre Lage“) und endet mit der Linie im letzten Abschnitt der Leitachse.
- **Technik.**
  - Neben der Laserachse rendert die Leitachse eine Bahn (`.leitfaden-bahn`, `z-10`). Die Bahn hat dieselbe Box wie das Lot (absolut, volle Höhe, `ACHSE_LAGE`) und einen eigenen view-timeline `--leitfaden`.
  - Die Marke (`.leitfaden-marke`) ist ein Streifen in voller Höhe der Bahn, das Fugenkreuz sitzt mittig auf seiner Unterkante.
  - Der Streifen verschiebt sich per `translate: 0 -100% → 0 0` um seine eigene Höhe. Die Unterkante läuft so von 0 bis zur Bahnhöhe, im selben Bereich und am selben Fortschritt wie `scale` des roten Stücks. Spitze und Marke liegen in jeder Stellung aufeinander.
  - Prozent statt Container-Einheiten: Chromium hält eine Länge auf dem Compositor beim Start fest, die Bahn wächst danach (Befund 1).
  - `opacity` steht nur im Keyframe, ohne fill: Außerhalb des Bereichs ist die Marke unsichtbar.
  - Die Laserachse (`Laserachse.tsx`) ist unverändert; `timeline-scope` wird nicht gebraucht.
- **Geltung.** Nur die Leitachse, die in einer Ansicht mit Seitenformel direkt auf den Einstieg folgt: `[data-seitenformel] > [data-formel="worum"] + .leitfaden`.
  - Das ist die Vorlage Erzählseite mit mittigem Einstieg oder Planblatt.
  - Sie gilt für `/` und mit Absicht für die übrigen sieben Seiten dieser Vorlage, siehe Entscheidung 2 und Befund 3.
- **Endzustand ohne Marke, Lot in Grundschicht.**
  - Er gilt ohne JavaScript, ohne Startklasse, bei reduzierter Bewegung, bei „ruhig“, ohne `animation-timeline` oder ohne Längen im Bereich (`@supports`-Weiche wie bei `weg`), im Druck und bei erzwungenen Farben.
  - Der Spiegel „ruhig“ nennt die Marke zusätzlich.
  - Druck und erzwungene Farben: Marke `display: none`, das rote Stück des Leitfadens `animation: none`.
- **Ebenen.**
  - Die Zierebene liegt wie bisher unter dem Inhalt. Fliese-Flächen (Ablauf, Kundenstimmen, Schritt) decken das Lot und das rote Stück, wie bisher (Gutachten u8).
  - Nur die Bahn der Marke steht in Ebene z-10 über den Flächen, ganz im Seitenrand.
  - Die Fugenkreuze der Abschnittskanten (z-10, im Baum später) liegen über der Marke. Trifft die Marke eines, deckt es sie für diesen Moment.
- **Register.**
  - Die Bahn trägt `data-motion="leitachse"`. Die Animation des Streifens wird damit der registrierten Kennung zugeordnet; es gibt keine neue Kennung.
  - Das Kreuz trägt `data-leitachse` für `ueberlappung.mjs`. Bahn (0 px breit) und Streifen tragen es nicht.

## Entscheidungen
1. **Leselinie statt wandernder Spitze.** „Markiert den aktuellen Abschnitt“ braucht eine feste Bezugshöhe; mit `contain` hätte die Marke oben auf der Seite den obersten und unten den untersten Abschnitt am Bildschirm markiert.
   - Gewählt sind 40 %, weil dort die Abschnittsüberschrift im Blick ist, wenn die Marke ihr Fugenkreuz trifft, und weil mobil das Rot nur zwei Fünftel der Höhe belegt („Farbe sparsam“).
   - Andere Laserlinien mit eigener Spitze (`weg`, nominal 60 %) stehen zurzeit auf keiner Live-Seite, siehe Offene Fragen 4.
2. **Geltung über die Lage im DOM, nicht über die Adresse; Ausweitung auf die Vorlage gewollt** (nach Befund 3 bestätigt).
   - Die PLAN-Zeile nennt `/`. Aber `ErzaehlSeite.tsx` gehört nicht zum Paket, `Leitachse` ist der gemeinsame Baustein, und für Adressen gibt es keinen sauberen Haken.
   - Die Regel greift dort, wo die Leitachse auf den Einstieg folgt. Das deckt K-007 („alle Erzählansichten“) und die Vorlage, aus der `/` gebaut ist.
   - Mitbetroffen sind die übrigen Erzählseiten dieser Vorlage, alle mit `einstieg: 'mitte'`: `/bad`, `/bad/badsanierung`, `/bad/barrierefreies-bad`, `/balkon-terrasse`, `/leistungen`, `/referenzen`, `/ueber-uns`.
   - Ein Planblatt-Einstieg (`bildGross`) ist zurzeit in keinem Inhalt gesetzt; er fiele unter dieselbe Regel.
   - Bewusst ausgenommen sind:
     - Leitachsen, die den Einstieg umfassen (Wissens- und Ortsseiten, Erzählseite mit einfachem Einstieg). Dort stünden Spitze und Marke schon im ersten Bildschirm neben dem roten Lot von Verlegeplan oder Karte, also ein zweites Rot (K-003).
     - Arbeitsansichten (`ArbeitsSeite`, ohne Seitenformel; K-010: kein Signaturmoment).
     - Alle Seiten außerhalb der Vorlagen.
   - Sie behalten die Leitachse wie bisher, auch im Druck. Im Markup bekommen sie nur die inerte Bahn, mit Deckkraft 0 und ohne Animation.
   - PLAN-Zeile und Prüfplan führt der Orchestrator nach (Befund 3).
3. **Zwei Zeitstrahlen gleicher Box statt `timeline-scope`.** Die Marke kann nicht in `.leitachse` liegen, weil `Laserachse.tsx` nicht zum Paket gehört. `timeline-scope` wäre die Alternative; die eigene Bahn kommt ohne aus und braucht keine weitere Unterstützungsfrage. Gleiche Box und gleiche Deklarationen ergeben denselben Fortschritt; das Rechenmodell der Probe prüft das.
4. **Inset 0 für beide Zeitstrahlen.** `view-timeline-inset: auto` nimmt scroll-padding (oben 96 px, unten 128 px mobil und 96 px ab lg). Die Spitze wanderte dann über die Seitenlänge von 0,4·V − 128 bis 0,4·V + 96, also mobil von 210 auf 434 px. Mit Inset 0 steht sie fest.
   - Kennt ein Browser `view-timeline-inset` nicht, gilt für Lot und Bahn gleichermaßen `auto`: Sie bleiben deckungsgleich, nur die Linie wandert leicht.
5. **Bedingung wie das rote Stück: `html.k-bewegung`, nicht zusätzlich `:not(.k-notaus)`** (nach Befund 4 beibehalten).
   - Die Marke ist kein Startzustand. Ihr Grundzustand „keine Marke“ ist der Endzustand, und sie verbirgt nichts. Das bestätigt auch der Prüfer (keine Verletzung von E-080).
   - Sie gehört zur Linie, und die Linie zieht seit E2 auch im Notaus (globals.css hängt nur an `k-bewegung`).
   - Umgestellt hieße das: Bei langsamer Hydrierung (Notaus nach 2 s, gerade mobil) spränge die Spitze nach 2 s von der Leselinie auf die wandernde `contain`-Lage, und die Marke verschwände. Bei einem Seitenaufruf mit Anker (`/#termin`) wäre das sichtbar.
   - Der Leitfaden braucht das Bewegungsmodul nicht, er ist reines CSS. Einen Ausfall des Moduls muss er nicht abfangen.
   - Den Bestand der Linie im Notaus zu ändern, war nicht Auftrag. Siehe Offene Frage 2.
   - Der Wächter (`bewegungsschalter.test.mjs`, Schalter 4) ist erfüllt, weil jede neue Regel unter der Medienabfrage mit `html.k-bewegung` beginnt. Gegenprobe: Ohne das Präfix wird Schalter 4 rot.
6. **Kein Rückfall über IntersectionObserver.**
   - Ein Rückfall bräuchte eine Client-Insel. `Leitachse.tsx` muss Servermodul bleiben, weil `ACHSE_LAGE` von Serverkomponenten importiert wird; eine neue Datei liegt außerhalb der Schreibrechte.
   - Ohne `animation-timeline` (Firefox, UM-4) gilt der K-008-Endzustand: Grundschicht, keine Marke. Das ist wie beim Lot seit E2. Siehe offene Frage 3.
7. **Fugenkreuz als Marke.** Das Formsystem hat genau ein gefülltes Zeichen für „Kreuzpunkt, Markierung“ (K-008). An der Spitze ist es der Kreuzpunkt von Lot und Leselinie, wie Waage und Lot der Kreuzlinie. Größe und Lage sind dieselben wie bei den Fugenkreuzen der Abschnittskanten (mobil 2 bis 14 px, Text ab 16 px).
8. **Kein neuer Test, `package.json` unverändert.** Die PLAN-Zeile nennt keinen Test, und bestehende Testdateien gehören anderen Paketen. Geprüft ist mit einer Probe im Scratchpad; ein Testvorschlag steht unter offene Frage 7.
9. **Streifen mit Prozent-Verschiebung statt Länge** (Befund 1). Eine Verschiebung um eine Länge, die von der Bahnhöhe abhängt (cq, vh, calc mit Container), friert auf dem Compositor ein. Prozent der eigenen Box folgt der Box. `top` oder `height` zu animieren wäre Layout (Leitplanke: nur transform, translate, scale, opacity).
10. **Ebene z-10 nur für die Bahn** (Befund 2). Die ganze Zierebene in z-10 zu heben, hieße Lot und rotes Stück über Fliese und eine Ebene über allem Text, also wieder bgOverlap. Darum steht nur die 0 px breite Bahn darin.

## Offene Fragen und Übergaben
1. **Stufe A (Browser), ohne Browser nicht belegbar.**
   - Chromium und WebKit auf `/` in m390, t768 und d1440:
     - **Pixelprobe statt DOM-Rechtecke** (Befund 1): Die Zeile des roten Kreuzarms neben dem Lot gegen die Spitze, in jeder Lage. Beide liegen ohne Spalt aufeinander (Soll: Kreuzarm-Mitte = Spitze ± 1 px).
       - Die Probe läuft mit Wartezeit nach dem Einsetzen der Suspense-Grenze und nach Sprüngen über `spaet`-Abschnitte (Bahn wächst).
       - Gegenprobe der Prüfer: statisches Fixture, Bahn wächst nach 600 ms von 100dvh auf 5500 px.
       - Stellungen: Lage +300 px, Was wir tun, Unsere Arbeiten, Einsatzgebiet (Kalk) und Ablauf, Kundenstimmen, Schritt (Fliese, neu sichtbar).
     - Die Marke erscheint unter dem Fugenkreuz von „Ihre Lage“, steht über den Fliese-Flächen und endet mit der Linie.
     - Nach einem Ankersprung (z. B. `#ablauf`, `#termin`) steht sie im Zielabschnitt.
     - Das Fugenkreuz einer Abschnittskante deckt die Marke, wenn beide sich treffen.
   - In q844 (Höhe 390) liegt die Leselinie bei 156 px, bei 200 % Zoom am Desktop bei 180 px, beide unter dem Anker bei 96 px.
   - **axe** (Z-09), wegen der neuen Ebene z-10: bgOverlap und `elmPartiallyObscuring` auf `/` und den sieben Seiten unverändert gegen vorher. Die Bahn ist 0 px breit, der Streifen 12 px im Seitenrand.
   - `ueberlappung.mjs`: Das Kreuz (`data-leitachse`, 12 × 12 px) kreuzt keinen Text, auch über den Karussells (`-mx-3`) in Kundenstimmen und Fotos.
   - `bewegung.mjs`:
     - `--modus register`: keine Einträge ohne Register; die Animation `leitfaden-marke` liegt an `data-motion="leitachse"`.
     - `--modus reduziert` und `--schalter ruhig`: 0 Bewegungsbefunde, die Bahn als sichtbares `data-motion`-Element.
   - Bildrate m390 bei vierfacher Drosselung: eine zusätzliche Compositor-Animation (translate, opacity) je Erzählseite. Der Streifen ist eine Ebene von 12 px × Bahnhöhe und fast leer.
   - Druckvorschau und erzwungene Farben ohne Marke. Firefox: Lot grau, keine Marke.
   - **Pixel und Bildfolgen der sieben weiteren Erzählseiten** (Befund 3): `/bad`, `/bad/badsanierung`, `/bad/barrierefreies-bad`, `/balkon-terrasse`, `/leistungen`, `/referenzen`, `/ueber-uns`.
     - Mit Bewegung weichen dort und auf `/` die Bereiche um das Lot ab, gewollt: Spitze auf der Leselinie, Marke, auch auf Fliese.
     - Bei reduzierter Bewegung bleiben es 0 Pixel.
     - Wissens-, Orts- und Arbeitsseiten sollten in jedem Fall 0 zeigen.
     - Auf `/leistungen` (Ablauf mit `SzeneAblauf`) und `/ueber-uns` (Werkzeug mit Fugenband) bitte ansehen, ob ein zweites Rot im Bildschirm stört.
   - **Sichtabnahme (Z-05):** Marke auf der roten Schrittlinie im Ablauf (mobil), neben der roten Treppe (lg) und neben der Ziel-H2 im Schritt, siehe Befund 2.
2. **Notaus.**
   - Soll der Leitfaden (Linie und Marke) im Notaus stehen bleiben, wie Lesefortschritt und `weg`? Dann gehören das rote Stück aller Laserachsen und die Marke an `html.k-bewegung:not(.k-notaus)`. Dazu kommt eine Regel `html.k-notaus .leitachse-rot { animation: none }` für den Endzustand.
   - Nur die vier Leitfaden-Regeln umzustellen (Vorschlag des Prüfers), ließe im Notaus die alte wandernde Linie laufen. Das ist weder Endzustand noch Leitfaden, und es gibt den Sprung nach 2 s (Entscheidung 5).
   - Vorschlag: so lassen, weil der Leitfaden nichts verbirgt und ohne Skript läuft. In REG entscheiden und im Register v4 (Spalte Notaus) festhalten.
3. **IO-Rückfall für Firefox.** Wenn er gewünscht ist, braucht er eine Client-Insel. Möglich wären eine neue Datei `src/components/kern/LeitfadenRueckfall.tsx` (Bahn sichtbar, Marke per `--fortschritt` aus einem IntersectionObserver wie im Lesefortschritt) oder eine Ergänzung im Bewegungsmodul (gemeinsame Datei). Vorschlag: erst nach UM-4 entscheiden.
4. **Eine Leselinie für alle Laserlinien.**
   - `weg` rechnet nominal mit 60 % und Inset `auto`. Effektiv wandert seine Spitze je Wegstück zwischen etwa 45 und 71 %.
   - Richtigstellung: `weg` steht zurzeit auf keiner Live-Seite, nur im Schaufenster (`page.dev.tsx`). Meine erste Notiz hatte es `/bad/badsanierung` zugeordnet.
   - Vorschlag für REG oder für das Paket, das `weg` auf eine Seite bringt:
     - eine gemeinsame Größe `--leselinie` in `bewegung.css`;
     - `weg` auf Inset 0 und 40 %.
     - Das ist eine Änderung an einem abgenommenen großen Moment, also nur mit Bildfolge. Dabei auch prüfen, ob die Marke (jetzt über Fliese) neben dem roten Weg in dessen Fläche steht.
5. **Register v4 (REG).**
   - Vorschlag für den Eintrag `leitachse`:
     - Zweck Orientierung (Leselinie und aktueller Abschnitt);
     - Auslöser Scroll (view-timeline je Lot, ohne Inset);
     - Stufen linear, Spitze fest bei 40 %;
     - reduziert und „ruhig“: Grundschicht, keine Marke;
     - Notaus: läuft (Entscheidung 5);
     - Wo: Erzählansichten der Vorlage, Lot nach dem Einstieg, Marke über den Flächen; sonst Lot wie bisher.
   - Widerspruch im KERN: K-007 sagt in der Spalte „Ruhig“ „steht vollständig“, K-008 und globals.css sagen „Grundschicht, nichts gezogen“. Gebaut ist das zweite, globals.css ist nicht in diesem Paket. Bitte in REG oder KERN vereinheitlichen; „vollständig“ kann das graue Lot meinen.
6. **Übergaben an UM-E4-VORL.**
   - Wissens- und Ortsseiten tragen den Einstieg in der Leitachse. Sollen sie den Leitfaden bekommen, muss der Einstieg vor die Leitachse rücken, wie in der Erzählseite. Die Regel greift dann ohne Änderung an `bewegung.css`.
   - `ArbeitsSeite` (`/kontakt`) hat eine Leitachse mit wachsendem Rot. Das ist Bestand, verträgt sich aber nicht mit K-007 („Arbeitsansichten kein Signaturmoment“) und dem Kommentar in `FinalCTA.tsx`. Vorschlag: dort `gezogen={false}`.
   - Die frühere Übergabe „Marke über Fliese-Flächen“ ist mit Befund 2 erledigt und entfällt.
7. **Testvorschlag für den Orchestrator** (Datei nach Wahl, z. B. `test/leitfaden.test.mjs`).
   - Statisch:
     - Der Bereich der Marke ist gleich dem des roten Stücks;
     - beide Zeitstrahlen haben Inset 0;
     - die Keyframes enthalten nur opacity und translate, die Verschiebung ist in Prozent, ohne cq- oder vh-Längen und ohne Container an Bahn und Streifen;
     - die Marke hat keinen fill-Modus;
     - jede Leitfaden-Regel unter der Medienabfrage beginnt mit `html.k-bewegung`;
     - Druck und erzwungene Farben blenden die Marke aus.
   - Markup: Bahn mit `z-10`; `data-leitachse` nur an Lot und Kreuz.
   - Selektoren gegen gerendertes Markup: 1 Treffer in der Erzählseite, 0 in Wissens- und Arbeitsseite und bei `gezogen={false}`.
   - Vorlage ist `w3/leit-pruef/rauch.mjs`. Für TSX braucht der Test `typescript.transpileModule`, für die Selektoren `css-select` aus den Werkzeugen.
   - Die Pixelprobe aus Offene Fragen 1 gehört in Stufe A, nicht in `npm test`.

## Prüfzahlen (Arbeitskopie nach der Nacharbeit, Node 24.22.1)
- `npm test`: 243 von 243 bestanden, 0 Fehler. Die Zahl ist gleich wie vorher, kein Test neu, kein Test gelockert. Die Wächter Schalter 4 und 5 bleiben grün.
- `npx tsc --noEmit -p .`: 0 Fehler. `next-env.d.ts` war vorübergehend angelegt und ist wieder gelöscht, ebenso `tsconfig.tsbuildinfo`.
- `npx eslint src/components/kern/Leitachse.tsx`: 0 Fehler, 0 Warnungen. `bewegung.css` liegt außerhalb der ESLint-Konfiguration; dafür kommt nur die Warnung „File ignored“.
- `werte.mjs --arbeitsbaum --dateien src/components/kern/Leitachse.tsx,src/app/bewegung.css`: 0 Befunde (2 Dateien, 21 Klassenvorkommen, 16 eindeutig). Zwischenstand mit `-bottom-1.5`: 1 Befund `abstand_ausserhalb`, darum `bottom-0 translate-y-1/2`.
- **CSS-Bau** mit `@tailwindcss/postcss` (`w3/leit-pruef/css-bau.mjs`, normal und minifiziert): ohne Warnung.
  - Alle Regeln stehen im Ergebnis, im Layer `components` wie bisher.
  - Die Utilities `z-10`, `bottom-0`, `translate-y-1/2` und `size-3` sind erzeugt.
  - Im Ergebnis gibt es kein `100cqb` und kein `container-type: size` mehr.
  - lightningcss kürzt `translate: 0 0` zu `translate: 0` und `from` zu `0%`, beides gleichwertig. Inset 0, die `@supports`-Weiche und die Bereiche bleiben unverändert.
- **Rauchprobe** (`w3/leit-pruef/rauch.mjs`, nicht Teil des Pakets; Stand vorher als `rauch-v1.mjs`): 68 von 68 grün.
  - Markup: Leitachse statisch gerendert.
    - Haken, Bahn mit Kennung und `z-10`.
    - Streifen ohne Kennung, Kreuz mit `data-leitachse` an der Unterkante (`bottom-0`, `translate-y-1/2`).
    - `data-leitachse` genau zweimal (Lot, Kreuz).
    - Reihenfolge der Ebenen; `gezogen={false}` mit Markup wie vorher.
  - CSS:
    - Zweig, Bereiche, Inset, fill, Zeitstrahl.
    - Streifen in voller Höhe, 12 px breit, mittig.
    - Bahn ohne Container.
    - Keyframes (-100 % bis 0, nur opacity und translate), keine cq- oder Bildschirm-Längen an Bahn und Streifen.
    - Grundzustand, Druck und erzwungene Farben, Spiegel „ruhig“, Präfix `html.k-bewegung`.
  - Selektoren mit `css-select` gegen gerendertes Markup:
    - Erzählseite: je 1 Treffer, nur in der Zierebene; die Laserachse im Inhalt ist nicht mitgemeint.
    - Wissens- und Ortsseite, Arbeitsseite und `gezogen={false}`: je 0 Treffer.
  - Rechenmodell der view-timelines (V 390, 740, 844, 900; H 300, 2400, 7200):
    - Kreuz an der Unterkante des Streifens, Verschiebung in Prozent der aktuellen Höhe. Versatz gegen die Spitze höchstens 0,000 px; Spitze fest bei 0,4·V.
    - Vor dem Bereich ist nichts gezogen, danach alles gezogen, und in beiden Fällen gibt es keine Marke.
    - Ein Anker bei 96 px liegt über der Leselinie.
- **Gegenproben, alle rot** (15 von 15):
  - ohne Bahn-Kennung;
  - Haken auch bei `gezogen={false}`;
  - Bahn ohne `z-10` (neu);
  - `data-leitachse` am Streifen statt am Kreuz (neu);
  - Bereich der Marke `contain`;
  - Marke mit fill `both`;
  - Inset `auto` (Drift 128 px);
  - ohne Startklasse;
  - ohne Druckregel;
  - `top` im Keyframe;
  - Keyframe mit `100cqb` wie vorher (neu);
  - Modell mit ungleichem Bereich;
  - Modell mit eingefrorener Länge, also Platzhalter von einer Bildschirmhöhe statt Bahnhöhe (neu, Versatz bis 6 805 px wie im Befund);
  - ohne Nachbar-Selektor (Wissensseite träfe);
  - Nachfahre statt Zierebene (träfe 2, die Laserachse im Inhalt).
  - Dazu der Wächter Schalter 4: rot ohne das Präfix `html.k-bewegung` an der Marken-Regel (4 von 5 bestanden). Danach zurückgesetzt, `cmp` gleich.
- **Diff** (`w3/UM-E3-LEIT.diff`, neu erzeugt mit dem Befehl aus dem Briefing):
  - Er lässt sich auf den Stand vorher anwenden (`patch`), und das Ergebnis gleicht der Arbeitskopie Datei für Datei.
  - Gegen das Repository gilt er im Trockenlauf ohne Konflikt; der Versatz −118 Zeilen kommt von CURSOR und SCROLL.
  - Das Repository blieb unberührt (`git status` leer, HEAD 0d943440).

## Dateien
- `src/components/kern/Leitachse.tsx`:
  - Haken `leitfaden` an der Hülle und `leitfaden-ebene` an der Zierebene, beide nur bei `gezogen`;
  - Bahn mit `data-motion="leitachse"` und `z-10`, darin der Streifen `.leitfaden-marke` mit dem Kreuz (`data-leitachse`, `Fugenkreuz`) an der Unterkante;
  - Kopfkommentar (Geltung, Technik, Ebenen).
- `src/app/bewegung.css`:
  - Block „Leitfaden mit Abschnittsmarke“ nach `leitachse-ziehen`: Grundregeln für Bahn und Streifen, `@supports`-Zweig, Keyframes `leitfaden-marke` (Prozent), Druck und erzwungene Farben, Kommentar mit Geltung, Ebenen, Begründung „keine cq-Einheiten“ und Notaus;
  - Spiegel „ruhig“ um `.leitfaden-marke` ergänzt, mit Kommentar.
