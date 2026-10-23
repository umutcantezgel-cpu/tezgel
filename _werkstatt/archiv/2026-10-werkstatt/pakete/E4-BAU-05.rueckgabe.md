# E4-BAU-05 · Rückgabe (Baumeister, Arbeitsmodell)

## GEÄNDERTE DATEIEN
- `src/app/(bestand)/fliesen/abnahme/page.jsx`
- `src/app/(bestand)/fliesen/auf-fussbodenheizung/page.jsx`

Kein Commit, kein Push. Keine anderen Dateien berührt.

## WAS UND WARUM
- Seitenkörper beider Seiten auf KERN umgebaut nach dem Muster von `fliesen/page.jsx` und `bad/page.jsx`. Einstieg `art="erzaehl"` in `section` (Etikett = frühere Kennzeile, H1 mit bisheriger ID, Vorspann, Knöpfe), rechts Planblatt mit Verlegeplan (`fugen` bzw. `fussbodenheizung`, `interaktiv`). Abschnitte in `Leitachse` mit `leitachse` und `spaet`.
- Badges werden Mono-Etiketten mit gleichem Wortlaut. H2 werden `Abschnitt`-Titel; die bisherigen Überschriften-IDs bleiben erhalten (als `titelId` bzw. ID am Titel).
- Abnahme: fünf Prüfpunkte als Feldraster (letztes Feld über zwei Spalten), Toleranzen als `Tabelle` mit bisheriger Caption als Name, vier Erläuterungen als Feldraster mit `article` und `aria-labelledby`, Checkliste als Merkliste (Anker `#checkliste` bleibt), Konfigurator-Hinweis mit zwei Knöpfen, Ratgeber als Merkliste.
- Fußbodenheizung: fünf Punkte als Feldraster mit Textlinks, Gewerke als `Tabelle`, Ratgeber als Merkliste, Konfigurator (`FliesenKonfigurator floorHeating`, per `next/dynamic` nachgeladen) mit `Rueckfrage` daneben, Abschluss mit Knöpfen Aufmaß, Telefon und WhatsApp.
- Lucide-Icons und Icon-Kacheln entfallen (eine Icon-Familie; Pfeile und Telefon über `Knopf`). Altklassen (glass, ceramic, eyebrow, btn-*, Schatten, Beliebigwerte) entfernt.
- Metadaten, `generateStaticParams`, Links, Anker, Funnel-Props und Daten unverändert. Keine `"use client"`-Datei.

Mikrotexte alt → neu: kein Wortlaut geändert. Neu hinzu (aus Mustern und Bausteinen): Ladehinweis „Anfrageformular wird geladen...“ (Fußbodenheizung); Tabellenname „Wer macht was?“ (Region und Caption); Rückfrage-Feld (Ansprechpartner, Telefon, Mobil & WhatsApp, E-Mail, Sitz aus COMPANY_DATA); Planblatt-Feldnamen (Blatt, Verband, Betrieb, Inhaber, Kammer, Betrieb seit).

## GEMEINSAME DATEIEN
- `src/components/kern/Rueckfrage.tsx`: die Klasse `lg:sticky lg:top-24` schiebt die Rückfrage am Ende des Konfigurators unter die feste Kopfzeile (siehe OFFENE FRAGEN). Nicht geändert.

## PRÜFUNG UND ERGEBNIS
- Umbau: Trockenlauf, dann `--schreiben`; Körper danach von Hand neu geschrieben.
- Textprobe gegen HEAD: keine Wortverluste. ENTFERNT-Einträge treten als Prop mit gleichem Wortlaut wieder auf (`titel=`, `etikett=`, `name=`) oder stehen in Datenfeldern.
- `werte.mjs`: 0 Befunde. `bezeichner.cjs`: keine freien Namen. eslint: 0 Fehler, 0 Warnungen.
- Prüfstufe A (E4-BAU-05): GRÜN. tsc GRÜN (0 Fehler). eslint GRÜN. Funktionstests 72 erwartet, 0 unerwartet, 0 flaky (`funktion-navigation`, `funktion-kontaktwege`). Bilder HTTP 200/200 je Seite. Textvergleich GRÜN: entfernt 0, unerlaubt 0 je Seite.
- Einzelbilder m390 und d1440: Überlauf 0. Abnahme Überlappung 0. Fußbodenheizung d1440 Überlappung 2 (siehe unten).
- Konsole: Abnahme d1440 einmal eine React-Dev-Warnung, im Wiederholungslauf nicht mehr. Fußbodenheizung 0.
- Ganzseitenbilder geprüft: keine leere Rasterspalte, keine grauen Restzellen; Tabellen laufen im Region-Container, Seite ohne Querscroll.

## BILDBELEGE
Scratchpad `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E4-BAU-05/`
- Abnahme: `bilder/fliesen__abnahme/m390.jpg`, `d1440.jpg`; ganze Seite `voll_fliesen_abnahme/m390-voll.jpg`, `d1440-voll.jpg`
- Fußbodenheizung: `bilder/fliesen__auf-fussbodenheizung/m390.jpg`, `d1440.jpg`; ganze Seite `voll_fliesen_auf-fussbodenheizung/m390-voll.jpg`, `d1440-voll.jpg`
- Prüflog: `pruefe-a.stdout.txt`. Textvergleich: `/home/user/tezgel/_werkstatt/cache/texte/E4-BAU-05/texte-vergleich-gegen-e0.json`

## OFFENE FRAGEN
1. Einstieg `merkmale` (Fugenkreuz-Liste) nicht gesetzt. Auf beiden Seiten gibt es keinen bestehenden Zusagen-Text. Ich habe keinen Text erfunden und nichts umgeordnet. Vorschlag: Zusagen bestätigen lassen oder Verzicht.
2. Fußbodenheizung d1440: zwei Befunde „sticky“. Die Rückfrage (`lg:sticky`, gemeinsame Komponente) gleitet am Ende des Konfigurators unter die Kopfzeile; die Referenz `/fliesen` zeigt keinen Befund. Optionen: (a) nur in meiner Datei die Spalte mit `lg:self-start` versehen (Rückfrage dann nicht klebend); (b) `Rueckfrage.tsx` anpassen. Entscheidung beim Orchestrator.
3. Die Tabellen-Beschriftung „Wer macht was?“ ist neu (nur Zugänglichkeit). Bitte bestätigen.
4. Die Textvergleich-Liste `links_entfernt` (wa.me-Link) betrifft Kopf- und Fußbereich. Keine der beiden Dateien enthält `wa.me`; kein Eingriff.
