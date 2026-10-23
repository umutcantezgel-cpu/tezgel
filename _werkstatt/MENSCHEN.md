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
- **M-03 · Öffnungszeiten.** Freitag bis 17 Uhr (`company.js:125`) oder bis 18 Uhr (`company.js:128`, `src/lib/config.ts:174`)? Annahme: Mo bis Do 7:30 bis 18 Uhr, Fr 7:30 bis 17 Uhr, Sa nach Vereinbarung.
- **M-04 · Einsatzgebiet.** Die Entfernungen in `src/config/cities.ts` gelten laut Kommentar ab Wetzlar Stadtmitte, die Karte rechnet ab Aßlar (`src/lib/maps/getMapEmbedUrl.ts`); Radius 45 km im Code, 25 km in einem früheren Textvorschlag. Ehringshausen, Hüttenberg und Lahnau stehen im Einsatzgebiet, haben aber keine Ortsseite. Annahme: Entfernungen als „etwa … km“ wie im Bestand, Bezug „ab Wetzlar“, Radius 45 km.
- **M-05 · Team.** 5 Mitarbeitende (`src/shared/config/site.ts:38`) oder „bis zu 12 Fachkräfte“ (`ueber-uns`, `unternehmen`)? Annahme: keine Zahl nennen, nur „Deniz Tezgel und sein Team“.
- **M-06 · Größte Fliese.** 120 × 260 cm (`pricing.constants.ts:52`) oder 120 × 278 cm (`services.js:23`)? Annahme: 120 × 260 cm.
- **M-07 · Versprechen mit rechtlicher Bindung.** Bitte bestätigen oder streichen: verbindlicher Festpreis (dazu AGB § 2 Abs. 3 mit gesonderter Vergütung bei Mehrleistungen); Rückruf „innerhalb von 24 Stunden“ (Startformular, Schnellanfrage, Ortsseiten) gegenüber „binnen 24 bis 48 Stunden“ (Konfigurator, Express-Anfrage, Projektcheck); Staubschutz-Garantie; „feste Zusagen für Baustart und Fertigstellung“; „100 % kostenfrei und unverbindlich“. Annahme: jedes Formular behält seine Zusage wörtlich, neue Texte versprechen keine Frist.
- **M-08 · Herkunft einzelner Fotos.** Die Schiefer-Dusche mit Glaswand (`bilder/referenzen/03_bad-dusche/…walk-in-dusche-schieferoptik-glaswand.jpg`, IMG_2600-Bereich) wirkt wie ein Herstellerfoto; IMG_2577 ist ein Bildschirmfoto aus einem Bildbetrachter. Sind beide eigene Arbeiten? Annahme: nicht verwenden.
- **M-09 · Vektordatei des Logos.** Gibt es das Logo als SVG, PDF oder AI (Wortmarke und Maskottchen)? Annahme: Nachbau nach E-011; gelingt er nicht, Ersatz-Intro.
- **M-10 · Generatorbilder löschen.** Die 11 Bilder in `public/images/bad/` werden nicht mehr verwendet. Dürfen die Dateien gelöscht werden? Annahme: liegen lassen.

## Rechtliches und Bestand (keine Änderung durch den Lauf)
- **M-11 · Einwilligung in Formularen.** Startformular, Express-Anfrage, Badanfrage und Projektcheck übertragen Name und Telefon ohne Häkchen zur Datenschutzerklärung (E0-KUND-04, Befund 29). Bitte rechtlich prüfen lassen; Pflichtfelder bleiben unverändert (G8).
- **M-12 · Knopf „Cookie-Einstellungen“ im Kartenplatzhalter** öffnet den Banner nicht (`_relaunch/FUNKTIONSLISTE.md:30`). Die Einwilligung ist unantastbar (G8); bitte beauftragen, falls gewünscht.
- **M-13 · Cookie-Inventar** nennt `visitor_type`, `tezgel_wa_button_pos` und Calendly ohne passenden Code (`src/lib/cookie-inventory.ts`). Gehört zur Cookie-Richtlinie; bitte prüfen.
- **M-14 · Login** leitet nach Erfolg nach `/admin`, das es nicht gibt (`src/app/(bestand)/login/page.jsx:33`).

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
