# Bericht · Lauf „Universal Motion“

## Morgenbericht · Mittwoch, 28. Oktober 2026

1. Fertig: Die Technik ist auf dem neuesten Stand (Next.js 16.4, React 19.3, Node 24, Tailwind 4.3), ohne Sicherheitslücke. Alle 398 Funktionsprüfungen bestehen mit und ohne Bewegung, und der Bildvergleich zeigt keinen ungewollten Unterschied.
2. Fertig: Knöpfe zeigen „Wird gesendet …“ erst, wenn es wirklich dauert (ab 0,3 Sekunden, dann mindestens 0,5 Sekunden, ohne Flackern). Auswahlknöpfe und Kontrollkästchen zeigen klar, wenn sie gerade nicht wählbar sind.
3. Fertig: Der Seitenwechsel bleibt genau so, wie er ist, wie du es gewünscht hast. Nichts daran wurde verändert.
4. Geprüft: Die Seite rechnet am Handy nach dem Umbau nicht langsamer als vorher. Alle Unterschiede liegen in der normalen Streuung der Messung.
5. Gefunden: Für ein schnelleres erstes Bild am Handy gibt es drei Hebel: das große Foto früher laden, den Cookie-Hinweis auf den Ortsseiten nicht zum größten Element werden lassen und eine Stildatei verkleinern. Sie kommen in den nächsten Aufgaben.
6. Neu, noch in der Prüfung: der Schalter „Bewegung: an | ruhig“ im Fuß und im Menü. „ruhig“ stellt die Seite still, so wie die Einstellung „Bewegung reduzieren“ am Gerät, und gilt beim nächsten Besuch weiter (`_werkstatt/bilder/bericht/2026-10-28/1-bewegungsschalter-fuss-desktop.jpg`, `2-bewegungsschalter-menue-handy.jpg`). Die Funktionsprüfungen sind schon grün.
7. Stand der 13 Kriterien: Noch keines ist endgültig erfüllt; die Endabnahme ist für den Schluss geplant. Auf der Zwischenstufe erfüllt sind Technik, Sicherheit, Zugänglichkeit, Darstellung, Bewegung und Leistung (Z-02, Z-03, Z-06, Z-07, Z-09, Z-10, Z-11).
8. Kontingent der Woche: In der Cloud gibt es dafür keine Anzeige. Gestern war das Limit dreimal früher erreicht als geschätzt. Ich arbeite jetzt in weniger, größeren Schritten und habe heute Nacht vier Stunden pausiert.
9. Als Nächstes: Prüfung des Schalters abschließen, dann der neue Eingang der Startseite, der Cursor am Computer und das Scrollen.
10. Bitte prüfe oder entscheide (Einzelheiten in `_werkstatt/MENSCHEN.md`):
    - Neu: Soll „an“ im Schalter die Geräteeinstellung „Bewegung reduzieren“ überstimmen können? Ich nehme an: nein (UM-7).
    - Vor dem Zusammenführen bei Vercel die Node-Version auf 24 stellen (UM-1).
    - Garantie-Wörter bestätigen oder streichen (UM-5, M-07). Weiter dringend: die Originalfotos in der Git-Historie (UM-6).

## Morgenbericht · Dienstag, 27. Oktober 2026

1. Neuer Auftrag übernommen: Erst bringe ich die Technik der Seite auf den neuesten Stand, dann Bewegung, Seitenwechsel, Scrollen und Cursor auf Spitzenniveau. Der Plan steht nach zwei Prüfrunden: 58 Pflichtaufgaben, geschätzt etwa anderthalb Arbeitstage (`_werkstatt/PLAN.md`).
2. Fertig: Die Ausgangsmessung aller 12 Hauptseiten in vier Bildschirmgrößen. Kein Text läuft über, keine ernste Hürde für Menschen mit Einschränkungen, am Computer volle Punktzahl bei der Ladezeit. So sieht der Ausgangsstand aus: `_werkstatt/bilder/bericht/2026-10-27/1-ausgangsstand-startseite-handy.jpg`, `2-ausgangsstand-startseite-desktop.jpg`.
3. Gefunden: Am Handy erscheint das große erste Bild auf allen Hauptseiten erst nach 2,9 bis 4,5 Sekunden (Ziel 2,5). Dafür gibt es jetzt drei eigene Aufgaben im Plan.
4. Fertig: Die Seite läuft auf der aktuellen Langzeitversion von Node (24) und mit TypeScript 6; alle 210 Prüfungen bestehen ohne Warnung.
5. Fast fertig: Next.js 16.4.3 (schließt eine kritische Sicherheitslücke) und React 19.3.1 sind eingebaut, alle Prüfungen sind grün. Es fehlt nur noch der Bildvergleich gegen den Ausgangsstand.
6. Nicht möglich: TypeScript 7 und ESLint 10 sind erschienen, aber das Prüfwerkzeug für den Code unterstützt TypeScript 7 noch nicht. Ich habe es ausprobiert und belegt; die Lücke steht in `MENSCHEN.md` (UM-2).
7. Stand der 13 Kriterien: noch keines ganz erfüllt, das ist zu Beginn so geplant. Die Ausgangswerte stehen in `_werkstatt/ABNAHME.md`.
8. Kontingent der Woche: nicht messbar, weil es in der Cloud keine Anzeige dafür gibt. Das aktuelle Fenster schätze ich auf 16 %; der Tempomat bremst gerade etwas.
9. Als Nächstes: Bildvergleich abschließen, dann Tailwind, Zod und die übrigen kleinen Pakete aktualisieren. Danach kommt die Startseite als Vorbild für die neue Bewegung.
10. Bitte prüfe oder entscheide (Einzelheiten in `_werkstatt/MENSCHEN.md`):
    - Vor dem Zusammenführen bei Vercel die Node-Version auf 24 stellen (UM-1).
    - Drei Inhalte des alten Auftritts kommen zurück: der Vergleich der Aufbauten, die Werte und das Qualitätsversprechen. Die Garantie-Wörter erscheinen erst, wenn du sie bestätigst (UM-5).
    - Weiter dringend: die Originalfotos in der Git-Historie (UM-6).

## Vorlauf „Verständlich, echt, ausgezeichnet“

## Morgenbericht · Montag, 26. Oktober 2026

1. Fertig: Auf main liegt seit gestern Abend der neue Stand, Vercel hat ihn veröffentlicht (auf deine Anweisung). Seitdem wird nur auf dem Arbeitsstand gebaut, ohne neuen Deploy.
2. Fertig: Die Fotos sind neu verteilt. Kein Foto steht mehr auf zwei Hauptseiten, Baustellenfotos nur noch dort, wo es um die Arbeit geht, die Texte unter den Fotos sagen nur, was zu sehen ist (`_werkstatt/bilder/bericht/2026-10-26/1-balkon-einstieg-desktop.jpg`, `2-startseite-fotos-desktop.jpg`, `4-badsanierung-handy.jpg`).
3. Fertig: Die Karte auf „Kontakt“ erklärt jetzt ihre Zeichen: Firmensitz, Orte, Ringe (`3-kontakt-karte-legende-desktop.jpg`).
4. Fertig: Bei doppelt großer Schrift reißen Kundenstimmen, Adresse und Knöpfe keine Wörter mehr mittendrin auseinander (`5-kundenstimmen-grosse-schrift-handy.jpg`); der Fuß hat keine Lücken mehr.
5. Geprüft: Alle 369 Prüfungen der Funktionen bestehen. Wir haben sieben Wege ausprobiert, das erste große Bild am Handy schneller zu zeigen; keiner bringt genug. Der nächste Versuch: weniger Daten vor dem ersten Bild.
6. Stand der 14 Kriterien: Die Zwischenprüfung ist im ersten Anlauf nicht bestanden. Offen sind vor allem die Gestaltung (Ziel 8 von 10) und die Ladezeit am Handy (Ziel 2,5 Sekunden, heute 2,9 bis 4,6).
7. Läuft gerade: fünf Formulare werden umgebaut, damit sie bei großer Schrift gut lesbar sind und nichts mehr vorausgewählt ist, ohne ein neues Pflichtfeld.
8. Als Nächstes: Formulare abnehmen, alles neu bauen und prüfen, den Ladezeit-Versuch machen, dann die zweite Gestaltungsprüfung mit frischen Bildern.
9. Bitte prüfe oder entscheide (Einzelheiten in `_werkstatt/MENSCHEN.md`):
   - Wer im Formular nichts wählt, schickt „keine Angabe“ statt „Badsanierung“. Passt das so? (M-24)
   - Darf unter das Schloss-Zeichen in der Leiste am Handy das Wort „Cookies“? (M-28)
   - Noch offen: Einzugsgebiet ganz Hessen (M-04), Fragen M-18 bis M-27, Videos.

## Morgenbericht · Sonntag, 25. Oktober 2026

1. Fertig: Die Seite ist nach deiner Rückmeldung ruhiger: Überschrift mittig, Bilder vollständig, Kundenstimmen als langsames Karussell (`_werkstatt/bilder/bericht/2026-10-25/1-startseite-desktop.jpg`).
2. Fertig: Alle zehn Hauptseiten sind neu gebaut, unabhängig geprüft und nachgebessert: Bad, Badsanierung („Ihr neues Traumbad zum Festpreis.“), barrierefreies Bad, Balkon und Terrasse, Leistungen, Fliesen, Referenzen, Kontakt, Ortsseiten und Ratgeber (`2-leistungen-karten-desktop.jpg`, `4-referenzen-bewertungen-desktop.jpg`).
3. Fertig: Kontakt hat nur noch ein Anfrageformular, die Mobilnummer ruft an, die Öffnungszeiten widersprechen sich nicht mehr (`3-kontakt-handy.jpg`). Im Ratgeber steht die Artikelliste direkt unter ihrer Erklärung (`5-ratgeber-handy.jpg`).
4. Fertig: Der Seitenwechsel legt die Fliesen langsamer und zeigt euer Logo auf der fertigen Wand; zwei Fehler sind behoben, alle 66 Prüfungen dazu bestehen (`6-seitenwechsel-logo-desktop.jpg`).
5. Berichtigt: Auf „Leistungen“ stand, der Rechner nenne einen ungefähren Preis. Er nimmt aber nur die Angaben auf; das steht jetzt so da.
6. Kosten: Vercel baut den Arbeitsstand seit gestern nicht mehr bei jedem Speichern (zuletzt geprüft heute Nacht).
7. Stand: Alle 304 Prüfungen der Funktionen bestehen, auf den geprüften Seiten gibt es keine ernsten Hürden für Menschen mit Einschränkungen, und die Seitentexte lesen sich leicht. Offen sind alte Texte in Formularen und Rechnern. Die 14 Kriterien werden am Schluss am fertigen Bau abgenommen.
8. Als Nächstes (läuft gerade): Formular- und Rechnertexte in einfacher Sprache und die Angaben für Suchmaschinen je Seite; danach die Titel der Ratgeber-Artikel, der Gesamtbau mit Messung der Ladezeit und die Schlussprüfung.
9. Bitte prüfe oder entscheide (Einzelheiten in `_werkstatt/MENSCHEN.md`):
   - Sollen die gezeichneten Fliesenpläne auf den Bad- und Balkonseiten wiederkommen? (M-19)
   - Möchtest du den Weg der Badsanierung als gezeichnete Strecke sehen statt als 3 + 3 Schritte? (M-20)
   - Der Kalender bietet samstags Termine bis 16:30 Uhr an, die Öffnungszeiten sagen „Sa nach Vereinbarung“: Was gilt? (M-21)
   - Gefallen dir die neue Startseite und der Seitenwechsel mit Logo (Videos von gestern)?
   - Noch offen: Freitag bis 17 oder 18 Uhr (M-03), größte Fliese (M-06), Herkunft einzelner Fotos (M-08).

## Morgenbericht · Samstag, 24. Oktober 2026

1. Fertig: Die neue Startseite steht und ist viermal unabhängig geprüft; die letzte Bewertung liegt bei knapp 8 von 10, das Ziel ist 8. Bilder: `_werkstatt/bilder/bericht/2026-10-24/1-startseite-desktop.jpg`, `2-startseite-handy.jpg`.
2. Fertig: echte Fotos eurer Arbeit als ruhige Galerie, Kundenstimmen im Wortlaut, alle Orte mit Entfernung ab Aßlar (`3-galerie-desktop.jpg`).
3. Fertig: Die Seite trägt auch sehr große Schrift am Handy, etwa im Menü (`4-menue-grosse-schrift.jpg`); dazu eine freundliche Fehlerseite mit drei Wegen (`5-seite-nicht-gefunden-handy.jpg`).
4. Fertig: das Intro „Der erste Boden“, der Seitenwechsel, bei dem sich Fliesen verlegen, die Texte für neun weitere Hauptseiten in einfacher Sprache und die Vorlage, nach der sie gebaut werden (`6-vorlage-dusche-statt-wanne.jpg`).
5. Stand: Alle 114 Tests sind grün, auf zehn Gerätegrößen läuft nichts über den Rand, die Startseite liest sich leicht. Die Gestaltung ist knapp unter dem Ziel; Ladezeit, Probeläufe mit Testpersonen und die Prüfung aller Funktionen folgen heute.
6. Als Nächstes: Funktionsprüfungen abschließen, Ladezeit am fertigen Bau messen, Probeläufe, Abnahme der Startseite, danach die neun Hauptseiten bauen.
7. Bitte prüfe oder entscheide (Einzelheiten in `_werkstatt/MENSCHEN.md`):
   - Freitag bis 17 oder bis 18 Uhr? (M-03)
   - Bis zu welcher Entfernung fahrt ihr, und gilt sie ab Aßlar? (M-04)
   - Größte Fliese 120 × 260 oder 120 × 278 cm? (M-06)
   - Stammen alle Fotos von Deniz, auch die Schieferdusche mit Glaswand? (M-08)
   - Darf der Mitarbeiter von hinten im Tezgel-Pullover gezeigt werden? (M-17)
   - Der Cookie-Hinweis verdeckt beim ersten Besuch einen Teil der Startseite; darf er kleiner werden? (M-18)
8. Bitte von Hand löschen: zwei leere Arbeitsordner außerhalb des Projekts (`/E1-PRUEF-PLAN-2`, `/E2-R3-W`); das automatische Löschen wurde abgelehnt.
