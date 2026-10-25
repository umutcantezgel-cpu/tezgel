# MENSCHEN · Was nur ein Mensch klären kann

Jeder Eintrag: Frage · Beleg · Standardannahme bis zur Antwort. Offene Punkte der Vorläufe: `archiv/2026-10-werkstatt/MENSCHEN.md` und `_relaunch/MENSCHEN.md` (werden in E1 übernommen, soweit noch offen).

## Dringend

**M-01 · Originalfotos sind in der Git-Geschichte, das Repo ist laut Vorlauf öffentlich**
- Beleg: Die 84 Originale (171 MB) wurden am 23.10. in die Commits dec6dd3 und 35af5cc dieses Branchs gelegt und gepusht. Laut `_relaunch/ENTSCHEIDUNGEN.md:25` ist das Repository öffentlich. Drei Fotos zeigen Personen (IMG_2542, IMG_2543, IMG_2547), zwei das Logo eines Autohauses (IMG_2530, IMG_2531).
- Was du tun kannst: Sichtbarkeit des Repositorys prüfen; beim Zusammenführen per Squash zusammenführen, damit main die Originale nicht in seiner Geschichte trägt; den Branch danach löschen. Eine vollständige Entfernung aus der Geschichte geht nur durch dich (Umschreiben der Geschichte ist mir untersagt).
- Annahme bis zur Antwort: Die Originale liegen nur noch lokal in `_eingang/` (nie committet); im aktuellen Baum sind sie entfernt. Auf der Website erscheinen keine erkennbaren Personen und keine fremden Logos.

## Fakten zur Bestätigung durch Deniz Tezgel
Bis zur Antwort gilt die genannte Annahme; neue Texte nennen nur, was dort steht (KERN K-015).

- **M-02 · Bewertungszahlen.** Google 5,0 bei 27, Trustlocal 9,6 von 10 bei 25, Stand September 2026 (`src/config/reviews.js:9-27`). Annahme: so belassen, Zahl kommt künftig nur aus dieser Datei.
- **M-03 · Öffnungszeiten.** Freitag bis 17 Uhr (`company.js:125`) oder bis 18 Uhr (`company.js:128`, `src/lib/config.ts:174`)? Annahme: Mo bis Do 7:30 bis 18 Uhr, Fr 7:30 bis 17 Uhr, Sa nach Vereinbarung. Dazu Samstag: Die Tageswerte sagen 8 bis 14 Uhr „nach Vereinbarung / Aufmaßtermine“, die vorformatierte Zeile „Sa: 08:00 – 14:00 Uhr (Vor-Ort-Termine)“ (`company.js:126-129`). Neue Texte schreiben „Sa nach Vereinbarung“; die vorformatierten Zeilen bleiben unberührt (Firmendaten, G8) und verschwinden aus den Seiten, sobald diese neu geschrieben sind (E3, E4).
- **M-04 · Einsatzgebiet.** Die Entfernungen in `src/config/cities.ts` gelten laut Kommentar ab Wetzlar Stadtmitte, die Karte rechnet ab Aßlar (`src/lib/maps/getMapEmbedUrl.ts`); Radius 45 km im Code, 25 km in einem früheren Textvorschlag. Ehringshausen, Hüttenberg und Lahnau stehen im Einsatzgebiet, haben aber keine Ortsseite. Annahme: Entfernungen als „etwa … km“ wie im Bestand, Bezug „ab Wetzlar“, Radius 45 km.
- **M-05 · Team.** 5 Mitarbeitende (`src/shared/config/site.ts:38`) oder „bis zu 12 Fachkräfte“ (`ueber-uns`, `unternehmen`)? Annahme: keine Zahl nennen, nur „Deniz Tezgel und sein Team“.
- **M-06 · Größte Fliese.** 120 × 260 cm (`pricing.constants.ts:52`) oder 120 × 278 cm (`services.js:23`)? Annahme: 120 × 260 cm.
- **M-07 · Versprechen mit rechtlicher Bindung.** Bitte bestätigen oder streichen: verbindlicher Festpreis (dazu AGB § 2 Abs. 3 mit gesonderter Vergütung bei Mehrleistungen); Rückruf „innerhalb von 24 Stunden“ (Startformular, Schnellanfrage, Ortsseiten) gegenüber „binnen 24 bis 48 Stunden“ (Konfigurator, Express-Anfrage, Projektcheck); Staubschutz-Garantie; „feste Zusagen für Baustart und Fertigstellung“; „100 % kostenfrei und unverbindlich“. Annahme: jedes Formular behält seine Zusage wörtlich, neue Texte versprechen keine Frist.
- **M-08 · Herkunft einzelner Fotos.** Die Schiefer-Dusche mit Glaswand (IMG_2561, `…walk-in-dusche-schieferoptik-glaswand.jpg`) wirkt wie ein Herstellerfoto; IMG_2577 ist ein Bildschirmfoto aus einem Bildbetrachter. Ebenso sauber ausgeleuchtet wirken das Startbild, die graue Dusche mit Glaswand (IMG_2578, `public/images/arbeiten/dusche/dusche-ohne-stufe-graue-fliesen-*.jpg`), und das Dachgeschossbad mit freistehender Wanne (IMG_2570, mit Katze und Bilderrahmen im Bild). Sind das eigene Arbeiten? Annahme: IMG_2561 und IMG_2577 nicht verwenden; IMG_2578 und IMG_2570 verwenden, weil sie in deinem Fotosatz liegen. Ist IMG_2578 fremd, wird die Dusche mit Sitzbank (IMG_2582) das Startbild (E2-BILD-02, Frage 1 und 2).
- **M-18 · Einwilligungsbanner im ersten Bildschirm.** Beim Erstbesuch verdeckt der Banner auf Handy und Desktop Teile von Überschrift, Ort oder Hauptknopf (Prüfung „Erstes Bild“: 11 von 20 Fällen vollständig, nach der Wahl 18 von 20). Banner und Verhalten sind unantastbar (G8). Soll der Banner kleiner werden (zum Beispiel eine Leiste am unteren Rand mit denselben drei Knöpfen)? Annahme: bleibt wie er ist.
- **M-17 · Mitarbeiter von hinten.** Drei Bildplätze zeigen einen Mitarbeiter von hinten im Pullover mit Tezgel-Logo beim Dichtband auf dem Balkon (IMG_2547, kein Gesicht). Ist er mit der Veröffentlichung einverstanden? Annahme: ja, das Bild bleibt (es zeigt echte Arbeit); bei Nein ersetzt es die Fliesenkomposition.
- **M-09 · Vektordatei des Logos (bitte).** Gibt es das Logo als SVG, PDF oder AI (Wortmarke und Maskottchen)? Der Nachbau aus dem PNG erreicht höchstens 96 % Deckung statt der geforderten 98 % (E-018). Deshalb zeigt das Intro jetzt „Der erste Boden“ mit dem Original-Logo als Bild. Mit einer Vektordatei zeichnet sich das Logo im Intro selbst.
- **M-10 · Generatorbilder löschen.** Die 11 Bilder in `public/images/bad/` werden nicht mehr verwendet. Dürfen die Dateien gelöscht werden? Annahme: liegen lassen.
- **M-19 · Rote Linie und Plan-Zeichnung (E-047, E-048).** Mit dem ruhigen, mittigen Einstieg stehen auf der Startseite die rote Waage mit Lot und der Verlegeplan nicht mehr, auf `/bad` entfällt die Zeichnung im Einstieg, weil Sie sie unverständlich fanden; ebenso die Verlegepläne auf `/bad/badsanierung`, `/balkon-terrasse` und bei den Qualitätsstufen auf `/bad`. Beide bleiben im System (andere Seiten, Seitenwechsel zu den Leistungen). Sollen sie auf `/` oder `/bad` an anderer Stelle wiederkommen? Annahme: nein, so ist es ruhiger.
- **M-20 · Weg der Badsanierung.** Der gezeichnete Weg „Vom Anruf bis zur letzten Fuge“ (rote Linie, die beim Scrollen von Schritt zu Schritt zieht) ist gebaut, steht aber auf `/bad/badsanierung` vorerst nicht; dort stehen die sechs Schritte als 3 + 3, wie Sie es vorgeschlagen haben. Möchten Sie den Weg als Roadmap sehen? Annahme: 3 + 3.
- **M-21 · Samstagstermine im Kalender.** Der Terminkalender auf `/kontakt#termin-buchen` bietet samstags feste Zeiten bis 16:30 Uhr an (Bestand, `BookingCalendar`). Die Öffnungszeiten sagen „Sa nach Vereinbarung“, die Tageswerte in `company.js` nennen samstags 8 bis 14 Uhr für Aufmaßtermine. Sollen samstags nur Zeiten bis 14 Uhr stehen, oder nur „nach Vereinbarung“ ohne feste Zeiten? Annahme: bleibt wie im Bestand, bis Sie entscheiden.
- **M-22 · Ausstellung oder Beratung?** Die Seiten `/ausstellung/wetzlar` und `/ausstellung/giessen` sprechen von „Fliesenausstellung“ und „Badausstellung“. Im Bestand stehen dazu keine Adressen; das Faktenblatt kennt nur „Fliesenberatung in Wetzlar und Gießen nach Terminvereinbarung“. Gibt es in Wetzlar oder Gießen einen festen Ort mit ausgestellten Fliesen (zum Beispiel bei einem Händler), oder ist es eine Beratung bei Ihnen zu Hause? Annahme: Beratung nach Vereinbarung ohne festen Ort; die Suchbeschreibungen nennen keinen Ort.
- **M-23 · Angaben auf älteren Unterseiten.** Auf `/fliesenreparatur` stehen „bis zu 12 Handwerker“ und „Mo bis Fr 7:30 bis 18 Uhr“; das Faktenblatt sagt „keine Zahl nennen“ (M-05) und freitags 17 Uhr (M-03). Die Unterseiten von `/fliesen` zeigen ein „8-Punkte-Qualitätsversprechen“ mit „Garantierter Standard“ und „Garantierter Staubschutz“. Diese Texte werden in einer späteren Bauwelle in Alltagssprache gebracht; Zahlen und Garantien bleiben bis zu Ihrer Antwort auf M-03, M-05 und M-07 so vorsichtig wie im Faktenblatt.

## Rechtliches und Bestand (keine Änderung durch den Lauf)
- **M-11 · Einwilligung in Formularen.** Startformular, Express-Anfrage, Badanfrage und Projektcheck übertragen Name und Telefon ohne Häkchen zur Datenschutzerklärung (E0-KUND-04, Befund 29). Bitte rechtlich prüfen lassen; Pflichtfelder bleiben unverändert (G8).
- **M-12 · Knopf „Cookie-Einstellungen“ im Kartenplatzhalter** öffnet den Banner nicht (`_relaunch/FUNKTIONSLISTE.md:30`). Die Einwilligung ist unantastbar (G8); bitte beauftragen, falls gewünscht.
- **M-13 · Cookie-Inventar** nennt `visitor_type`, `tezgel_wa_button_pos` und Calendly ohne passenden Code (`src/lib/cookie-inventory.ts`). Gehört zur Cookie-Richtlinie; bitte prüfen.
- **M-14 · Login** leitet nach Erfolg nach `/admin`, das es nicht gibt (`src/app/(bestand)/login/page.jsx:33`).

- **M-16 · Entfernte Adressen mit 410.** 32 Adressen aus früheren Läufen (`src/lib/wege.ts`, davon 7 Platzhalterbeispiele) antworten mit 410 „dauerhaft entfernt“. Annahme: Sie bleiben so; die 170 Adressen des Auftrags sind die übrigen. Falls einige davon wieder auf eine passende Seite weiterleiten sollen (308), bitte nennen.

## Umgebungsausnahmen (Ersatzprüfung in ABNAHME.md)
- **M-15 ·** Kein echtes iPhone, Android-Gerät, Safari oder Firefox in der Cloud (nur Chromium). Bitte die Startseite, einen Seitenwechsel und das Formular einmal auf einem echten Handy prüfen.

## Fragebogen an Deniz Tezgel (höchstens zehn Fragen)
Bitte kurz und in eigenen Worten antworten. Bis dahin erzählt die Seite nur mit Fakten aus dem Bestand.
1. Wie hat 2008 alles angefangen, und warum gerade in Aßlar?
2. Auf welche Arbeit sind Sie besonders stolz, und warum?
3. Was fragen Kunden beim ersten Termin am häufigsten?
4. Welches Projekt war Ihr schönstes? Gibt es dazu Fotos, die wir zeigen dürfen?
5. Wer gehört zu Ihrem Team, und wie viele sind Sie?
6. Was machen Sie anders als andere Fliesenleger?
7. Wie lange dauert bei Ihnen typischerweise ein neues Bad, von der Zusage bis zur letzten Fuge?
8. Dürfen wir zu Fotos den Ort nennen (zum Beispiel „Bad in Solms“)?
9. Was soll ein Kunde nach dem ersten Besuch Ihrer Website unbedingt wissen?
10. Gibt es einen Satz, den Sie Kunden immer sagen?
