# E4-BAU-04 · Rückgabe (Baumeister, ARBEITSMODELL)

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/bad/musterbaeder/page.jsx`
- `src/app/(bestand)/bad/musterbaeder/[slug]/page.jsx`
- Kein Commit, kein Push.

## WAS UND WARUM
- Beide Seiten auf KERN-Bausteinen nach der Familienreferenz `bad/page.jsx`: Einstieg `erzaehl` mit Etikett, H1 (bisherige ID), Vorspann, Knöpfen; Randspalte als Planblatt mit interaktivem Verlegeplan (ohne Achse, ohne Bemaßung); danach `Leitachse`.
- `/bad/musterbaeder`: 12 Musterbad-Karten als Feldraster (2 Spalten, gerade Zahl, keine Restzelle); Richtwert-Hinweis mit Telefon am Abschnittsende.
- `/bad/musterbaeder/[slug]`: Ausstattung als Feldraster (ungerade Gruppenzahl: letzte Gruppe `spanne={2}`); Anfrage zu diesem Musterbad im Seitenlayout (Kopf links, Wege und Sicherheiten rechts); Badanfrage per `next/dynamic` mit Ladehinweis, 8 Spalten Funnel + 4 Spalten `Rueckfrage`.
- Lucide-Icons durch die Icon-Familie ersetzt, Ambient-Glow, Schatten und Kacheln entfernt; nur Systemwerte (`werte.mjs`: 0 Befunde). Keine neue Bewegung, kein großer Moment.
- Metadaten, `generateStaticParams`, `generateMetadata`, Datenzugriffe unverändert. `umbau.mjs --schreiben` lief vorab, danach Handbau.

## MIKROTEXT-ÄNDERUNGEN (alt → neu)
- Entfernt oder verändert: keine.
- Hinzu: Blattname „Musterbäder & Badideen“ (Ortsangabe „Wetzlar“ aus dem Seitentitel weggelassen) bzw. „Musterbad {Titel}“; Schriftfeld-Etiketten Blatt, Verband, Betrieb, Inhaber, Kammer, Betrieb seit, Sitz; Ladehinweis „Anfrageformular wird geladen...“; Rueckfrage-Etiketten (Ansprechpartner, Telefon, Mobil & WhatsApp, E-Mail, Sitz).
- Form: Badges als Mono-Etiketten mit gleichem Wortlaut; „Transparente Raumkonzepte“ und „Ausstattung“ als Etikett-/Titel-Prop; H1-IDs an Span bzw. Titel-ID wie in der Referenz.

## PRÜFUNG UND ERGEBNIS (Prüfstufe A, Lauf 06:36)
- tsc: GRÜN, 0 Fehler (eigene und übrige).
- eslint: GRÜN, 0 Fehler, 0 Warnungen.
- Funktionstests (navigation, kontaktwege): GRÜN, 72 erwartet, 0 unerwartet.
- Bilder m390/d1440 für `/bad/musterbaeder` und `/bad/musterbaeder/basic-bad-4_6`: HTTP 200, Konsole 0, Überlauf 0, Überlappung 0.
- `werte.mjs`: 0 Befunde. `bezeichner.cjs`: keine Befunde.
- `textprobe.cjs`: ENTFERNT-Einträge sind als Prop wiederzufinden (etikett=, titel=, einleitung=, titelId=).
- Textvergleich: ROT, ausschließlich wegen einer Wortspanne (Offene Frage 1). Zeilen entfernt: 0 auf beiden Seiten.
- Gesamt: ROT allein durch das Gate Texte. Protokoll: `$SCRATCH/E4-BAU-04/pruefe-a.txt`.

## BILDBELEGE (Scratchpad `E4-BAU-04/`)
- `bilder/bad__musterbaeder/{m390,d1440}.jpg`
- `bilder/bad__musterbaeder__basic-bad-4_6/{m390,d1440}.jpg`
- Ganze Seite: `voll/musterbaeder/{m390,d1440}-voll.jpg`, `voll/slug/d1440-voll.jpg` (Raster ohne graue Restzellen, Anfrage-/Funnel-Komposition wie geplant).

## GEMEINSAME DATEIEN (nicht geändert)
1. `src/config/musterbaeder.js`: Feld `sizeM2` fehlt in allen Einträgen. Die Seite zeigt deshalb „( m²)“, so auch im Bestand (e0). Gewünscht: Entscheidung, ob `sizeM2` (Wert = `sqm`) ergänzt oder der Text geändert wird.
2. `_werkstatt/texte-erlaubt.json`: Ausnahme für die Wortspanne „anfragenDirekt“, Block `main`, Seite `*`, Vermerk „E4-BAU-04: Knopfpaar Anfrage, Blockgrenze zwischen den Knöpfen“.

## OFFENE FRAGEN
1. Textvergleich „anfragenDirekt“ (`/bad/musterbaeder/basic-bad-4_6`, main, unerlaubt): Die Baseline e0 verbindet „Konzept unverbindlich anfragen“ und „Direkt anrufen“ ohne Wortgrenze. Der aktuelle Extraktor setzt eine Grenze zwischen den Blockboxen von Knopf-Label und Icon. Text und Reihenfolge sind identisch. Ich habe kein Workaround-Markup eingebaut. Entscheidung nötig: Ausnahme (GEMEINSAME DATEIEN 2) oder neue e0-Basis. Die Knopfstruktur ist auf allen zwölf Detailseiten gleich; dort ist derselbe Befund zu erwarten, nicht separat geprüft.
2. Einstieg der Detailseite: Es gab keine Merkmalsliste. Die Festpreis-Zeile steht als einzelner Fugenkreuz-Punkt in `merkmale`. Bitte bestätigen oder anders vorgeben.
3. `Rueckfrage` auf der Detailseite (Kompositionsregel „neben Funnel“): Die Etiketten sind neue Mikrotexte aus den Kontaktdaten. Bitte bestätigen.
4. `src/components/kern/Schrittfolge.tsx` wurde während des Laufs von anderer Stelle geändert. Nicht von mir, nicht angefasst.
