# Gutachten u5-projektcheck · Fusion II (E-039)

Blind erstellt (Gutachter sah nur X/Y). Auflösung: X = A (im Baum, live), Y = B (f53181e, Server 4371).
Gesamt (0–10): A Desktop 4.5 · A Handy 6 · B Desktop 8.5 · B Handy 8.

## Wahl je Abschnitt bzw. Zustand
| Abschnitt | Ansicht | Wahl | Begründung | aus der anderen übernehmen |
|---|---|---|---|---|
| Start (Baustein gesamt) | m390 | **B** | B kommt dem Vorbild näher: Schrittnummern als dunkle Mono-Kästchen wie „1 Gewerk“ im Vorbild, Wertanzeige in Mono (Maß statt Behauptung), 44-px-Regler mit gefüllter Spur, Schritt 4 als echte Ankreuzfelder, Zusammenfassung als randbündige Kalk-Zone (mobil ein eigenes Blatt). Dazu ein knapper Musterbad-Hinweis in einer Zeile, DIN 18040-2 in Mono und ein einzeiliger Hauptknopf. A stapelt Kasten in Kasten in Kasten (Zusammenfassung, Musterbad, Pflegekasse) und wirkt in Schritt 4 wie ein dunkler Block. | Linksbündiger Satz der Auswahlknöpfe aus A (fluchtet mit Legende und Rasterkante); als Option. |
| Schritt 1 – Badgröße (Regler) mit Auswahl | m390 | **B** | Bei B zeigt die gefüllte Spur den Wert auch grafisch, der Regler ist 44 px hoch (Touch-Ziel) und der Wert steht in Plex Mono. Die Spur von A ist durchgehend grau ohne Fortschritt, 8 px hoch und mit dem Daumen schwer zu treffen; der Wert steht in Archivo statt in Mono. |  |
| Schritt 2 – Sanierungsumfang mit Auswahl | m390 | **beide** | Beide sind einspaltig, sauber und ohne Überstand. A setzt die Texte linksbündig und dichter, das fluchtet mit Legende und Feldkante. B zentriert die Texte (wie die Flächenknöpfe im Vorbild) und markiert den Schritt mit dem Nummernkästchen. | Aus B das Mono-Nummernkästchen „2.“, aus A optional der linksbündige, dichtere Satz in den Knöpfen. |
| Schritt 3 – Ausstattungsniveau mit Auswahl | m390 | **beide** | Wie Schritt 2: in der Gestaltung gleichwertig. A ist linksbündig und dichter, B zentriert und hat das Nummernkästchen. | Nummernkästchen aus B; linksbündiger Satz aus A optional und einheitlich mit Schritt 2. |
| Schritt 4 – Wunschausstattung (Ankreuzfelder im Raster) mit Auswahl | m390 | **B** | B liest sich sofort als Mehrfachauswahl: Kästchen links, gewählt gefüllt mit Haken, dazu ein dunkler Feldrand. Das ist genau das Muster der Rahmenbedingungen im Vorbild, und Bedeutung hängt nicht nur an der Fläche. A füllt 6 von 8 Feldern dunkel, das ergibt eine schwere Streifenmasse, sieht aus wie eine Einfachauswahl, und der kleine dünne Haken rechts ist schwach. |  |
| Schritt 4 – Tastaturfokus im Raster | m390 | **gleich** | In beiden ist der Ring 2 px Tinte mit 2 px Abstand ringsum frei. In B zeigt das Kästchen den Zustand auch im Fokus, in A sieht man ihn über Fläche und Haken. |  |
| Zusammenfassung nach Auswahl | m390 | **gleich** | Gleicher Inhalt, Mono-Etiketten, dl live. Bei B laufen die Fugen bis an den Feldrand (mehr Feldraster), bei A sind die Trenner eingerückt. Beide brechen Komposita am Bindestrich um. |  |
| Baustein gesamt nach allen Auswahlen | m390 | **B** | Wie beim Start: B ist ruhiger, die Aktionszone ist ein eigenes Blatt, Schritt 4 ist klar und der Musterbad-Wechsel auf „Komfort-Bad 15,9 m²“ steht kompakt in einer Zeile. A wirkt durch die verschachtelten Kästen und die dunkle Masse in Schritt 4 unruhiger. | Sinnhinweis „Hinweis:“ nur für Screenreader vor den Hinweiskästen (A). |
| Formular offen | m390 | **beide** | B hat ein ruhigeres Aktionsfeld, WhatsApp-Logo im Knopf (Markenfarbe nur im Logo, K-005) und einen einzeiligen WhatsApp-Knopf. A kennzeichnet Pflichtfelder sichtbar am Label, wie im Vorbild („Ihr Name *“). Bei B steht das Sternchen nur im Platzhalter und verschwindet bei der Eingabe. Das Sternchen von A ist allerdings rot und damit ein weiteres rotes Element; im Vorbild ist es grau. | Sichtbares Sternchen hinter „Ihr Name“ und „Ihre Telefonnummer“ aus A (aria-hidden), aber in tinte-2 wie im Vorbild, nicht in Laser-Rot. |
| Pflichtfeldfehler (leeres Absenden) | m390 | **A** | Beide prüfen nur nativ, ohne eigene Meldung (K-009 verlangt Versatz-Zeichen, Text und role=alert). Der einzige sichtbare Unterschied: A zeigt vorab am Label, welche Felder Pflicht sind, deshalb ist der Sprung in „Ihr Name“ verständlich. | Grundgerüst des Formulars aus B. |
| Laden (Übertragung läuft) | m390 | **gleich** | Beide: „Wird übertragen …“, laufende Fuge, beide Absendeknöpfe gesperrt. B setzt zusätzlich aria-busy am Online-Knopf. | aria-busy aus B. |
| Serverfehler 500 | m390 | **A** | A erfüllt K-005 wörtlich: Fehler = Rahmen + Versatz-Zeichen + Text, dazu role=alert mit dem Vorsatz „Fehler:“ nur für Screenreader. B hat nur einen Akzentstrich links und roten Text. Das ist schwächer abgesetzt und hat keinen Vorsatz. | Fehlertext in laser-tief (B) ist zulässig. Wahlweise Text in Tinte wie A, aber einheitlich. |
| Erfolg (Aktionsspalte) | m390 | **B** | B nutzt die volle Breite: Haken und Überschrift in einer Zeile, Fließtext gut lesbar, „16 m²“ in Mono, Symbole für Mail und Uhr, „Nächste Schritte“ in Lesegröße. A rückt den Text hinter eine Symbolspalte ein, das ergibt eine schmale Spalte, und die nächsten Schritte stehen klein und grau. | Vorsatz „Erledigt:“ nur für Screenreader (A); optional der Rahmen in „abnahme“ aus A als zusätzliches Erfolgssignal, nur als Linie. |
| Erfolg (Baustein gesamt) | m390 | **B** | Die Gesamtwirkung ist ruhiger, die Statusbox in B ist besser lesbar. Schritte und Zusammenfassung wie oben. |  |
| WhatsApp-Weg (Aktionsspalte) | m390 | **B** | Beide sind klar. B setzt Sprechblase und Überschrift in eine Zeile mit voller Textbreite, A rückt hinter das Info-Symbol ein. Der Unterschied ist knapp. | Vorsatz „Hinweis:“ nur für Screenreader vor „WhatsApp wurde geöffnet“ (A). |
| WhatsApp-Weg (Baustein gesamt) | m390 | **B** | Gleiche Gründe wie bei Baustein gesamt und Statusbox. |  |
| Ohne JavaScript | m390 | **B** | B rendert den ganzen Baustein auf dem Server, der Anruf-Link funktioniert. Das verlangt K-004: Inhalte sind ohne JavaScript sichtbar. A zeigt nur „Anfrageformular wird geladen...“; Inhalt, Telefon und Hinweise fehlen. |  |
| Tastaturfokus Regler | m390 | **B** | Bei B liegt der Ring um eine 44 px hohe Fläche, gut sichtbar und messbar. Bei A umschließt er eine 8 px hohe Spur, die Seiten sind kaum zu erkennen. |  |
| Tastaturfokus umbrochener Textlink | m390 | **gleich** | In beiden folgt der Ring den Zeilenstücken. A setzt den Link halbfett, B normal und unterstrichen. Beides ist zulässig. |  |
| Tastaturfokus Ankreuzfeld im Raster (Rand und Mitte) | m390 | **gleich** | Der Ring ist in beiden auf allen vier Seiten frei, nichts verdeckt ihn. B zeigt im Fokus zusätzlich den Zustand im Kästchen. |  |
| Start (Baustein gesamt) | d1440 | **B** | Bei B ist der Kopf durch eine Linie über die volle Breite abgesetzt. Die Aktionsspalte ist eine randbündige Kalk-Fläche wie die Formularspalte im Vorbild (Fuge statt Karte), die Skala steht in einer Zeile, nichts steht über, die Knöpfe sind einzeilig. A ist in 795 px gequetscht: Die Skala bricht um („(Gäste-/WC)“), in Schritt 2 steht Text über den Knopf, die Knöpfe in Schritt 3 sind eng, Haken liegen auf Text, und die Zusammenfassung ist eine Karte in der Karte. | section#projekt-check mit aria-label „Bad-Projektcheck“ aus der Seitenumgebung von A (getestete ID). |
| Schritt 1 – Badgröße (Regler) mit Auswahl | d1440 | **B** | 612 px Spur mit Füllung, Wert in Mono rechts neben dem Label, Skala einzeilig. Bei A bricht die Skala dreizeilig um, die Spur zeigt keinen Fortschritt und ist 8 px hoch. |  |
| Schritt 2 – Sanierungsumfang mit Auswahl | d1440 | **B** | B hat keinen Überstand, die Texte stehen zweizeilig ruhig. In A ragen „Komplettbad“, „Schlüsselfertig“ und „Teilsanierung“ 4 bis 11 px über die Knopfkante; axe meldet dafür einen Kontrastfall als unvollständig. Das ist ein klarer Mangel. |  |
| Schritt 3 – Ausstattungsniveau mit Auswahl | d1440 | **B** | B passt zweizeilig in jeden Knopf. Bei A bricht „Spa-Charakter, Dusch-WC“ dreizeilig, die Knöpfe sind ungleich gefüllt. |  |
| Schritt 4 – Wunschausstattung (Ankreuzfelder im Raster) mit Auswahl | d1440 | **B** | B zeigt ein zweispaltiges Raster mit Kästchen links, ganz im Muster des Vorbilds, jeder Text in einer Zeile. Bei A berührt oder überlagert der Haken den Text („Fußbodenheizung“) und steht am Rand („Großformat-Fliesenverlegung“); die Felder haben drei Zeilen, dazu die dunkle Masse. |  |
| Schritt 4 – Tastaturfokus im Raster | d1440 | **gleich** | Der Ring ist in beiden ringsum frei, auch zur Nachbarzelle hin. |  |
| Zusammenfassung nach Auswahl | d1440 | **B** | B stellt Umfang und Ausstattung als Feldraster mit Fuge nebeneinander (Fuge statt Karte), das ist kürzer und ordnet besser. Bei A steht alles untereinander in einer schmalen Spalte mit eingerückten Trennern. |  |
| Baustein gesamt nach allen Auswahlen | d1440 | **B** | Die Gesamtordnung ist klar: Kopfzone, zwei Spalten, Kalk-Aktionsspalte, kein Überstand. Bei A häufen sich die Mängel aus den Schritten 1 bis 4. | Vorsatz „Hinweis:“ nur für Screenreader vor Musterbad- und Pflegekassen-Hinweis (A). |
| Formular offen | d1440 | **beide** | B hat 522 px Spaltenbreite, einzeilige Absendeknöpfe, das WhatsApp-Logo, „Sofort anrufen:“ und Nummer in einer Zeile. A zeigt die Pflicht sichtbar am Label, hat aber zweizeilige Knöpfe und eine gedrängte Spalte. | Sichtbares Pflichtsternchen am Label aus A, in tinte-2 statt Rot. |
| Pflichtfeldfehler (leeres Absenden) | d1440 | **A** | Gleich nativ und ohne eigene Meldung. Nur A macht die Pflicht vorab am Label sichtbar. | Layout aus B. |
| Laden (Übertragung läuft) | d1440 | **gleich** | Gleicher Zustand, gleiche Ladefuge, beide Knöpfe gesperrt. B einzeilig und mit aria-busy. | aria-busy aus B. |
| Serverfehler 500 | d1440 | **A** | Gerahmter Kasten mit Versatz-Zeichen und Text: das Fehlerbild nach K-005, dazu „Fehler:“ nur für Screenreader. B hat nur Akzentstrich und roten Text. | Die breitere Spalte von B, in die der Kasten aus A kommt. |
| Erfolg (Aktionsspalte) | d1440 | **B** | Bei B steht der Danksatz in drei Zeilen, die nächsten Schritte in Lesegröße mit Symbolen, „16 m²“ in Mono. Bei A stehen dieselben Sätze in einer 150 px schmalen Textspalte über neun Zeilen. | „Erledigt:“ nur für Screenreader (A); optional der Rahmen in „abnahme“. |
| Erfolg (Baustein gesamt) | d1440 | **B** | Gesamtordnung wie oben, die Statusbox ist besser lesbar. |  |
| WhatsApp-Weg (Aktionsspalte) | d1440 | **B** | Klare Statusbox: Sprechblase und Überschrift in einer Zeile, zwei Zeilen Text, ein Link. Bei A ist die Box schmal und siebenzeilig. Achtung: B trennt im Pflegekassen-Hinweis „DIN“ von „18040-2“. | „Hinweis:“ nur für Screenreader (A). |
| WhatsApp-Weg (Baustein gesamt) | d1440 | **B** | Gesamtordnung wie oben. |  |
| Ohne JavaScript | d1440 | **B** | Bei B ist der ganze Baustein sichtbar und der Anruf-Link nutzbar (K-004). Bei A steht nur der Platzhaltertext. |  |
| Tastaturfokus Regler | d1440 | **B** | Bei B liegt der Ring um eine 44 px hohe und 612 px breite Fläche. Bei A sitzt der Ring an der 8 px hohen Spur und die Skala darunter wird angeschnitten. |  |
| Tastaturfokus umbrochener Textlink | d1440 | **gleich** | In beiden folgt der Ring den Zeilen (A drei, B zwei Zeilen). |  |
| Tastaturfokus Ankreuzfeld im Raster (Rand und Mitte) | d1440 | **gleich** | Der Ring ist in beiden auf allen vier Seiten frei, nichts verdeckt ihn. Bei B bleibt die Textzeile einzeilig. |  |

## Barrierefreiheit und Verhalten – muss in die Fusion
- aus B: Ohne JavaScript ist der Baustein vollständig serverseitig sichtbar (Überschrift, Schritte, Hinweise, Anruf-Link tel:+4964414483567 nutzbar); kein Platzhalter „Anfrageformular wird geladen...“, kein hidden-Vorrat
- aus B: Regler 44 px hoch (308×44 mobil, 612×44 Desktop), nativ mit accent-color Tinte; Fokusring ringsum messbar
- aus B: aria-valuetext am Regler mit Einheit („8,2 m²“, nach 4 × Pfeil „10 m²“)
- aus B: Link „Katalog“ mit 44 px Touch-Höhe (72,8×44 / 76,4×44)
- aus B: Auf d1440 kein Überlauf (kein Text ragt aus den Knöpfen in Schritt 2, kein Haken überlagert Text in Schritt 4), axe meldet keinen Kontrastfall als „unvollständig“
- aus B: Erhöhter Textabstand (WCAG 1.4.12): auch auf d1440 0 neue Befunde
- aus B: 200 % CSS-Zoom: nichts ragt aus dem Baustein, die Zusammenfassung überlappt die Schritte nicht (20 statt 40 Befunde; die übrigen Knopfüberstände in der Fusion ebenfalls beheben)
- aus B: Ankreuzfelder mit sichtbarem Kästchen 20×20 px (ungewählt Rand 3,62:1, gewählt gefüllt 18,66:1 mit Haken) plus dunkler Feldrand: Zustand über Form, nicht nur über Fläche
- aus B: aria-busy=true am Online-Knopf während der Übertragung
- aus B: Absendeknöpfe auf d1440 einzeilig (49 bis 51 px hoch), WhatsApp-Knopf mit WhatsApp-Logo (Markenfarbe nur im Logo)
- aus A: Sichtbares Pflichtsternchen hinter den Labels „Ihr Name“ und „Ihre Telefonnummer“ (span aria-hidden=true, zugänglicher Name bleibt unverändert) zusätzlich zu required und Platzhalter-Sternchen
- aus A: section#projekt-check mit aria-label „Bad-Projektcheck“ um den Baustein auf /bad/projekt-check (getestete ID nach E0-KUN-05 Abschnitt 2; bei B fehlt sie)
- aus A: Serverfehler als Kasten mit Rahmen, Versatz-Zeichen und Text, role=alert, Vorsatz „Fehler:“ nur für Screenreader
- aus A: Statusmeldungen role=status mit Vorsatz nur für Screenreader: „Erledigt:“ vor „Projektcheck übermittelt“, „Hinweis:“ vor „WhatsApp wurde geöffnet“
- aus A: Vorsatz „Hinweis:“ nur für Screenreader vor Musterbad- und Pflegekassen-Hinweis
- aus B: Beide gleich, unbedingt halten: fieldset/legend für Schritte 2 bis 4 (group mit Name), <label for=budget-sqm> für Schritt 1, IDs budget-sqm, budget-lead-name, budget-lead-phone, budget-lead-email
- aus A: Beide gleich, unbedingt halten: Auswahl als <button type=button aria-pressed>, Leertaste und Enter schalten um, in Schritt 2 und 3 ist genau einer gedrückt
- aus B: Beide gleich, unbedingt halten: Zusammenfassung als dl aria-live=polite, aktualisiert sofort
- aus A: Beide gleich, unbedingt halten: Fokusring 2 px solid Tinte, Abstand 2 px, :focus-visible, nie von festen Ebenen verdeckt (0/26), im Raster auf allen vier Seiten frei (8/8)
- aus B: Beide gleich, unbedingt halten: sichtbare Labels mit for, autocomplete name/tel/email, type text/tel/email
- aus A: Beide gleich, unbedingt halten: im Ladezustand „Wird übertragen …“ und beide Absendeknöpfe gesperrt; Eingaben bleiben bei Fehler und auf beiden Rückwegen erhalten
- aus B: Beide gleich, unbedingt halten: axe 0 Verstöße in allen 16 Läufen und auf der ganzen Seite; 320 px und 200 %-Äquivalent ohne Befund; Feldränder 3,62:1

## Fusionsrezept
Grundgerüst: B. B rendert auf dem Server, nimmt die volle Inhaltsbreite, hat eine durchgehende Kopflinie, zwei Spalten mit randbündiger Kalk-Aktionsspalte, Mono-Nummernkästchen „1.“ bis „4.“, einen nativen 44-px-Regler mit aria-valuetext, Ankreuzfelder mit Kästchen, eine Zusammenfassung als Feldraster, einen einzeiligen Musterbad-Hinweis und DIN in Mono.

Reihenfolge der Übernahmen aus A:

1. Seitenrahmen auf /bad/projekt-check: Den Baustein in section#projekt-check mit aria-label „Bad-Projektcheck“ fassen. Die ID ist getestet (E0-KUN-05 Abschnitt 2), B fehlt sie. Den Abschnitt `#projekt-check` auf /bad nicht anfassen.
   - Das clientseitige Nachladen von A (Platzhalter „Anfrageformular wird geladen...“, hidden-Vorrat) NICHT übernehmen.
   - Die klebende Seitenleiste „Ansprechpartner“ von A nicht neben den Baustein setzen. Bei 795 px Bausteinbreite kehren die Überstände, umbrochenen Skalen und Haken auf Text von A zurück.
   - Stammt die Leiste aus dem Bestand: unter den Baustein in voller Breite, als Schriftfeld. Sonst entfällt sie, denn Anruf und WhatsApp stehen schon im Baustein (ein Weg je Aufgabe, K-003.6).
2. Formular: sichtbares Sternchen hinter „Ihr Name“ und „Ihre Telefonnummer“.
   - Als span aria-hidden=true, damit der zugängliche Name exakt „Ihr Name“ und „Ihre Telefonnummer“ bleibt (Tests).
   - Farbe tinte-2 wie im Vorbild, nicht Laser. Sonst stehen mit dem Fehlerkasten zwei bis drei rote Elemente in einem Bildschirm.
   - Platzhalter „Ihr Name *“ und „Ihre Telefonnummer *“ bleiben wörtlich.
3. Serverfehler: den Kasten aus A (1 px Rahmen laser-tief, Versatz-Zeichen, Text, role=alert, Vorsatz „Fehler:“ nur für Screenreader) in die breite Spalte von B setzen.
   - Er steht über den Feldern, die Meldung ist der error-Text der Antwort.
   - Textfarbe einheitlich wählen: laser-tief oder Tinte.
4. Statusmeldungen: Vorsätze nur für Screenreader ergänzen: „Erledigt:“ (Erfolg), „Hinweis:“ (WhatsApp, Musterbad, Pflegekasse).
   - Optional die Erfolgsbox mit Rahmen in „abnahme“, nur als Linie, keine Fläche.
   - aria-busy aus B behalten.
5. Optional: linksbündiger Satz in den Auswahlknöpfen der Schritte 2 und 3 (A), dann einheitlich mobil und Desktop.

Stolpersteine:
- **Wortlaut:** in allen Zuständen exakt gleich lassen (Skala, Hinweise, Lade-, Fehler-, Erfolgs- und WhatsApp-Texte, „Sofort anrufen: 06441 / 44 83 567“).
- **Nutzlast:** byte-gleich lassen, auch projectTitle „Bad-Projektcheck (ca. 8,2 m²)“ bei 16 m² nicht „korrigieren“.
- **Regler:** Startwert 8 bei Anzeige „8,2 m²“, step 0,5, min 3,5, max 25 beibehalten; Musterbad-Wechsel ab > 9 m².
- **Zustände:** IDs budget-*, aria-pressed (kein role=checkbox), dl aria-live und name=channel online|whatsapp unverändert lassen.
- **WhatsApp:** Desktop window.open plus Navigation, mobil location.href, URL und Text gleich.
- **Geschütztes Leerzeichen:** in „DIN 18040-2“ setzen (B trennt im WhatsApp-Zustand auf d1440 „DIN“ von „18040-2“), auch vor „m²“.
- **200 % CSS-Zoom:** B hat noch 20 Knopfüberstände (bis 141 px). Knopftexte umbruchfähig machen (min-w-0, hyphens/break-words), dabei 1.4.12 und d1440 ohne Überstand halten.
- **Fokus:** landet nach Erfolg, Fehler, WhatsApp und „Angebot … anfordern“ in beiden auf body. Besser auf die Statusbox, die Fehlermeldung oder das erste Feld setzen (tabindex=-1), das ist ein Gewinn gegenüber beiden.
- **Pflichtfeldfehler:** ist in beiden nur nativ. K-009 verlangt eine eigene Meldung mit Versatz-Zeichen und role=alert; wenn ergänzt, dann mit aria-invalid und aria-describedby, ohne die native required-Prüfung oder den Fokussprung zu brechen.
- **Rot:** höchstens ein rotes Element je Bildschirm; Sternchen nicht rot.
- **Prüfen:** Tests F-05 (funktion-projektcheck) gegen /bad und /bad/projekt-check erneut laufen lassen, weil der Wurzel-Selektor auf /bad `#projekt-check` nutzt.

## Fakten (Material, neutral erhoben)
| Merkmal | A | B |
|---|---|---|
| axe ernst/kritisch je Regel (wcag2a/aa, 21a/aa, 22aa), nur Baustein, 8 Zustände (Start, Auswahl, Formular, Pflichtfeld, Laden, Serverfehler 500, Erfolg, WhatsApp) × m390/d1440 | 0 Verstöße in allen 16 Läufen (keine Regel ausgelöst) | 0 Verstöße in allen 16 Läufen (keine Regel ausgelöst) |
| axe ganze Seite /bad/projekt-check, Start, m390 und d1440 | 0 Verstöße | 0 Verstöße |
| axe „unvollständig“ (manuell zu prüfen) | color-contrast, 3 Knoten auf d1440 in jedem Zustand: Texte der Umfang-Knöpfe in Schritt 2, „Hintergrund teilweise verdeckt“ (überstehender Text) | keine |
| Fokusring-Stil (alle Bedienelemente des Bausteins) | outline solid 2px rgb(10,17,41), offset 2px; :focus-visible bei Tab | outline solid 2px rgb(10,17,41), offset 2px; :focus-visible bei Tab |
| Fokusring gemessen (Pixelvergleich Ruhe/Fokus, 26 Tab-Stopps je Ansicht) | Dicke 2 px (Felder 3 px), Kontrast Ring zu Ruhefarbe 17–18,7:1. Ringsum 100 % auf allen Knöpfen, Feldern, CTA, Anruf- und Datenschutz-Link. Regler (8 px hoch): oben/unten 2 px gemessen, links/rechts nicht messbar, im Bild geschlossener Rahmen. Umbrochene Links: Ring je Zeile (Bild) | Dicke 2 px (Felder 3 px), Kontrast 17–18,7:1. Ringsum 100 % auf allen Knöpfen, Feldern, Regler, CTA und Links. Umbrochener Link „Details …“: Ring je Zeile (Bild) |
| Fokus verdeckt durch feste Ebenen (natürliche Lage nach Tab; Mitte und Ringecken per elementFromPoint) | 0 von 26 Stopps je Ansicht (m390, d1440) | 0 von 26 Stopps je Ansicht (m390, d1440) |
| Ankreuzfelder im Raster: Fokusring vollständig sichtbar, nicht von Nachbarzellen verdeckt | 8/8 Felder: auf allen vier Seiten 100 % Abdeckung (m390 und d1440); kein anderes Bedienelement im Ringbereich ±6 px | 8/8 Felder: auf allen vier Seiten 100 % Abdeckung (m390 und d1440); kein anderes Bedienelement im Ringbereich ±6 px |
| Ankreuzfelder: Zustand (aria-pressed / checked) | <button type=button aria-pressed=true/false>, kein role=checkbox. Leertaste und Enter schalten um. Gewählt: dunkle Fläche, heller Haken (SVG 16×16, 16,96:1) | <button type=button aria-pressed=true/false>, kein role=checkbox. Leertaste und Enter schalten um. Kästchen 20×20 px: ungewählt Rand rgb(129,134,152) auf Weiß 3,62:1, gewählt gefüllt rgb(10,17,41) (18,66:1) mit hellem Haken; Feldrand gewählt dunkel |
| Einfachauswahl Schritte 2 und 3 | aria-pressed-Knöpfe, genau einer gedrückt. Pfeiltasten bewegen den Fokus nicht (Tab-Folge) | aria-pressed-Knöpfe, genau einer gedrückt. Pfeiltasten bewegen den Fokus nicht (Tab-Folge) |
| Gruppenbeschriftung | Schritte 2–4: fieldset/legend („2. Sanierungsumfang:“, „3. Ausstattungsniveau:“, „4. Wunschausstattung & Extras:“), im ARIA-Baum group mit Name. Schritt 1: <label for=budget-sqm> | Gleich: fieldset/legend für Schritte 2–4, group mit Name; Schritt 1 per <label for=budget-sqm>; Schrittnummer als dunkles Kästchen |
| Regler aria-valuetext | nicht gesetzt. Vorgelesen wird der Rohwert („8“, nach 4 × Pfeil „10“); Anzeige „8,2 m²“ | „8,2 m²“, nach 4 × Pfeil „10 m²“ |
| Sichtbare Labels (Formular) | Alle drei Felder mit sichtbarem <label for>: „Ihr Name“, „Ihre Telefonnummer“, „Ihre E-Mail-Adresse (optional)“ | Alle drei Felder mit sichtbarem <label for>, Wortlaut gleich |
| Pflicht-Kennzeichnung | required. Sichtbares „*“ neben dem Label (span aria-hidden=true) und im Platzhalter („Ihr Name *“, „Ihre Telefonnummer *“) | required. „*“ nur im Platzhalter (verschwindet bei Eingabe), am Label keines |
| autocomplete / type | name / tel / email; type text / tel / email; kein name-Attribut | name / tel / email; type text / tel / email; kein name-Attribut |
| Meldung Serverfehler | div role=alert, Text „Fehler: Test-Ausfall“ („Fehler:“ sr-only) | p role=alert, Text „Test-Ausfall“ |
| Meldung Erfolg / WhatsApp | div role=status; vorangestellt sr-only „Erledigt:“ bzw. „Hinweis:“ | div role=status, ohne Vorsatz |
| Zusammenfassung live | dl aria-live=polite | dl aria-live=polite |
| Pflichtfeldfehler (leeres Absenden) | nur native Browserprüfung; Fokus ins erste ungültige Feld; kein aria-invalid, kein aria-describedby, keine eigene Meldung | nur native Browserprüfung; Fokus ins erste ungültige Feld; kein aria-invalid, kein aria-describedby, keine eigene Meldung |
| Ladezustand | „Wird übertragen …“, beide Absendeknöpfe disabled; kein aria-busy | „Wird übertragen …“, beide disabled; aria-busy=true am Online-Knopf |
| Fokus nach Zustandswechsel | nach „Angebot … anfordern“, Erfolg, Fehler und WhatsApp: body (auslösender Knopf entfernt bzw. gesperrt) | gleich: body in allen vier Fällen |
| Sinnhinweise nur für Screenreader | sr-only „Hinweis:“ vor Musterbad- und Pflegekassen-Hinweis | keine; Pflegekassen-Hinweis im ARIA-Baum als Text plus Link statt zwei Absätzen |
| Touch-Ziele ≥ 44 px (m390 / d1440) | Regler 308×8 / 332×8 px; Link „Katalog“ 72,8×23,3 / 76,4×24,8 px; Auswahlknöpfe min. 47 / 50 px hoch; Felder 53 / 56 px; Absendeknöpfe 72,5 / 75,6 px; Inline-Links (Kompaktbad, Details, Datenschutz 14–15 px) im Fließtext | Regler 308×44 / 612×44 px; „Katalog“ 72,8×44 / 76,4×44 px; Knöpfe min. 44 px; Felder 53 / 56 px; Absendeknöpfe 72,5 und 49,3 / 50,8 px; Inline-Links „Kompaktbad 8,2 m²“ 16–17 px und Datenschutz 14–15 px im Fließtext |
| Überlauf Standardansicht | m390: keiner. d1440: Text ragt aus Knöpfen in Schritt 2 („Komplettbad“ 6 px, „Schlüsselfertig“ 4 px, „Teilsanierung“ 11 px); Haken überlagert Text in Schritt 4 (Bild) | m390 und d1440: keiner |
| Überlauf 320 × 640 (Start und Formular) | kein horizontales Scrollen, kein Text-/Elementüberstand | kein horizontales Scrollen, kein Text-/Elementüberstand |
| 200 % Zoom (Äquivalent 640×400 bei DPR 2, Medienabfragen greifen) | keine Befunde | keine Befunde |
| 200 % CSS-Zoom auf 1280×800 (Desktopraster bleibt) | 40 Befunde: 27 × Text ragt aus Knopf/Kasten, 13 × aus dem Baustein (Skala „25 m² (Spa)“, Zusammenfassungsspalte überlappt die Schritte, Bild) | 20 Befunde: Text ragt aus Knöpfen bzw. Kästen (u. a. Schritt 2 und 4, bis 141 px), keiner aus dem Baustein |
| Erhöhter Textabstand (WCAG 1.4.12), neu gegenüber ohne | m390: 0. d1440: 5 (Text aus Knopf: „Nur Duschbereich“ 18 px, „Edle Oberflächen“ 7, „Möbel-Doppelwaschtisch“ 16, „Fußbodenheizung“ 14, „Großformat-Fliesenverlegung“ 7) | m390: 0. d1440: 0 |
| Kontrast Auswahlfelder (berechnet) | Text 18,66:1 (ungewählt) / 16,96:1 (gewählt); Rand ungewählt rgb(129,134,152) zu Weiß 3,62:1; gewählte Fläche zu Umgebung 18,66:1; Reglerspur (appearance none) 3,62:1 | Text 18,66:1; Rand ungewählt 3,62:1; gewählt in Schritt 2/3 Fläche 18,66:1, in Schritt 4 Rand plus gefülltes Kästchen 18,66:1; Regler nativ mit accent-color rgb(10,17,41) |
| Ohne JavaScript | Nur Platzhalter „Anfrageformular wird geladen...“ sichtbar; der Baustein steckt in einem hidden-Vorrat | Baustein vollständig sichtbar (Bedienung ohne Wirkung, Anruf-Link funktioniert) |
| Sprungziel / IDs | Baustein in section#projekt-check (aria-label „Bad-Projektcheck“); IDs im Baustein: budget-sqm, budget-lead-name, budget-lead-phone, budget-lead-email | kein Element #projekt-check auf der Seite (nächster Vorfahr mit ID: main#main-content); IDs im Baustein gleich |
| Konsolenfehler | 0, außer erwartbar 2 im Serverfehler (500-Ressource, console.error „BadProjektCheck submission error“) | 0, außer erwartbar 2 im Serverfehler (gleiche Meldungen) |

## Funktion und Wortlaut
- Ablauf gleich: Schritte 1–4 aktualisieren die Zusammenfassung sofort (dl aria-live). „Angebot mit Festpreis anfordern“ öffnet das Formular an der Stelle des Knopfs, mit zwei Absendewegen (type=submit, name=channel: online | whatsapp). Erfolg ersetzt das Formular durch eine Statusbox mit Knopf „Erneut anfragen oder anpassen“, WhatsApp durch eine Hinweisbox mit „Erneut senden oder Kanal wechseln“. Beide Rückwege zeigen das Formular wieder mit erhaltenen Eingaben (16 m², Name, Telefon, E-Mail).
- Alle Zustände sind in beiden erreichbar: Start, Schritte 1–4, Zusammenfassung, Formular, Pflichtfeld (nativ), Laden, Serverfehler, Erfolg, WhatsApp, beide Rückwege. Nur in A gibt es zusätzlich einen Ladeplatzhalter „Anfrageformular wird geladen...“ (Baustein wird clientseitig nachgeladen); ohne JavaScript bleibt er stehen. In B wird der Baustein serverseitig ausgeliefert.
- Sichtbarer Wortlaut ist in allen Zuständen gleich (Überschrift, Schrittlabels, Optionen, Skala „3,5 m² (Gäste-WC) · 8,2 m² (Standard) · 15,9 m² (Komfort) · 25 m² (Spa)“, Hinweise, Formularlabels, Platzhalter, Knöpfe, Datenschutzsatz, Lade-, Fehler-, Erfolgs- und WhatsApp-Texte, „Sofort anrufen: 06441 / 44 83 567“). Unterschiede: A hat sichtbare „*“ hinter „Ihr Name“ und „Ihre Telefonnummer“ (aria-hidden) sowie die sr-only-Vorsätze „Hinweis:“ (2 × vor den Hinweiskästen und vor „WhatsApp wurde geöffnet“), „Fehler:“ vor der Fehlermeldung und „Erledigt:“ vor „Projektcheck übermittelt“. In B fehlen diese.
- Erfolgstext gleich: „Projektcheck übermittelt“, Referenz, „Vielen Dank, Prüf Person! Ihre Projektangaben für ca. 16 m² (Teilsanierung) sind direkt bei Herrn Deniz Tezgel eingegangen.“, „Eine Bestätigung wurde an pruef@example.de gesendet.“, „Nächste Schritte: 1. Herr Tezgel prüft Ihre Angaben & Materialbedarf. 2. Rückruf binnen 24–48 Std. zur Vor-Ort-Aufmaß-Abstimmung.“ WhatsApp-Text gleich: „WhatsApp wurde geöffnet – Bitte senden Sie die vorbereitete Nachricht mit Ihren Angaben dort ab – erst dann erreicht sie uns.“
- Anfrage-Nutzlast (POST /api/anfrage, abgefangen) ist byte-gleich: inquiryType projekt_check, projectType bad, projectTitle „Bad-Projektcheck (ca. 8,2 m²)“, contact, projektCheckDetails (sqm, scope, scopeLabel, tier, tierLabel, extras), area, timing „Nach Aufmaß“.
- WhatsApp-URL gleich: https://api.whatsapp.com/send?phone=491726728504&text=… mit identischem Nachrichtentext. Desktop: window.open plus Navigationsanfrage zur selben URL. Mobil (m390): Navigation per location.href. In beiden gleich.
- Fehlerverhalten gleich: Die Fehlermeldung zeigt den error-Text der Serverantwort („Test-Ausfall“) über den Feldern; Eingaben bleiben erhalten, Knöpfe werden wieder freigegeben.
- Regler-Startwert in beiden: Anzeige „8,2 m²“, Eingabewert 8 (Schrittweite 0,5, min 3,5, max 25). Der Musterbad-Link wechselt ab > 9 m² von „Kompaktbad 8,2 m²“ (/bad/musterbaeder/basic-bad-8_2) zu „Komfort-Bad 15,9 m²“. Links gleich: /bad/musterbaeder, /bad/barrierefreies-bad, /datenschutz, tel:+4964414483567.
- Layout-Unterschiede (Bilder): Auf d1440 ist der Baustein in A 795 px breit (Schrittspalte 332 px, Aktionsspalte 266 px; Kopf mit Trennlinie innen), in B 1216 px (Schrittspalte 612 px, Aktionsspalte 409 px; Kopfzone durch Linie über volle Breite abgesetzt). B nummeriert die Schritte als dunkle Kästchen „1.“–„4.“, A als Text. Wertanzeige: A Kasten mit hochgestelltem „m²“, B grauer Kasten in Mono-Schrift. Zusammenfassung: A untereinander, B teils nebeneinander. Musterbad-Hinweis: A Kasten mit Info-Symbol, B Zeile mit „Katalog →“ rechts. Absendeknöpfe auf d1440: A zweizeilig, B einzeilig.
- Schritt 4 (Raster): A gewählte Felder vollflächig dunkel mit Haken rechts. B Felder weiß mit Kästchen links (gewählt gefüllt mit Haken, Feldrand dunkel). Auf m390 sind beide einspaltig.
- Seitenumgebung (nicht Teil des Bausteins): A stellt neben den Baustein eine klebende Seitenleiste „Ansprechpartner“ (Telefon, Mobil & WhatsApp, E-Mail, Sitz) in section#projekt-check. B hat keine Seitenleiste und kein #projekt-check auf /bad/projekt-check.

## Nicht aufgenommen
- Die native Hinweisblase des Browsers (Pflichtfeld) ist bewusst nicht im Bild: Sie erschien zeitabhängig nur in einem der beiden Läufe und ist in beiden Fassungen dieselbe Browser-Oberfläche. Ihr Text ist im Testbrowser englisch („Please fill out this field.“, bei falscher E-Mail „Please include an '@' …“), in beiden gleich.
- Fokusring-Pixelmessung: Beim 8 px hohen Regler in X sind die linke und rechte Ringseite mit der Kantenprobe nicht messbar (zu kurze Seite). Auch bei mehrzeilig umbrochenen Inline-Links (in X „Kompaktbad 8,2 m²“ und „Details …“, in Y „Details …“) passt die Messung am Begrenzungsrechteck nicht. Diese Fälle sind per Bild belegt (17-fokus-regler, 18-fokus-link-umbrochen): Der Ring ist sichtbar.
- Die 200-%-CSS-Zoom-Variante (documentElement.style.zoom = 2 auf 1280 px) behält das Desktopraster bei; die Überstandswerte in px sind dort nur Näherungen. Maßgeblich für echtes Browser-Zoom ist die Äquivalent-Variante 640×400 bei DPR 2 (beide ohne Befund).
- Nichts wurde echt gesendet. Erfolg beruht auf der Anfrage-Attrappe der Sperre (Referenz TEZ-26-TEST), Laden auf einer hängenden Route, der Serverfehler auf page.route 500. Der WhatsApp-Weg wurde abgefangen (window.open bzw. Navigation mit 204 beantwortet). Eine echte Server- bzw. E-Mail-Bestätigung ist daher nicht beurteilbar.
- Der kurze Ladeplatzhalter von X vor dem Nachladen (mit JavaScript) wurde nicht als eigenes Bild aufgenommen. Belegt ist er nur über den Zustand ohne JavaScript (16-ohne-javascript).

Bilder (Scratchpad): siehe u5-projektcheck.json, Feld „abschnitte“.
