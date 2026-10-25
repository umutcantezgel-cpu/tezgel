# E3-BAU-05

## 1. Kopfzeile
E3-BAU-05 · Rolle Baumeister · Modell Haiku 5.5 · Stufe 2 · Kern-Version v3.6 · Schreibrechte (exakt): `src/inhalte/fliesen.ts`, `src/app/(bestand)/fliesen/page.jsx`, `$SCRATCH/E3-BAU-05/**`, `src/app/(bestand)/fliesen/layout.tsx` (nur name und description nach Zusatz 6.6), `_werkstatt/texte/fliesen.md` (nur Satzteilungen nach Zusatz 6.2) · Umfang: Seite `/fliesen` auf die Vorlage `WissensSeite` umstellen, Text wörtlich aus `_werkstatt/texte/fliesen.md`

## 2. Rollenbriefing
Du bist **Baumeister**: Du baust eine Seite nach einer fertigen Vorlage und einem fertigen Text, ohne eigene Gestaltung.
- Gute Arbeit: Der Text steht Wort für Wort wie in der Textdatei auf der Seite; jede Funktion des Bestands ist noch da; die Seite besteht alle Prüfungen ohne Ausnahme.
- Die drei häufigsten Fehler: 1. Text umformulieren oder kürzen; 2. eigene Klassen, Farben oder Abstände; 3. eine Funktion, Kennung oder strukturierte Daten des Bestands verlieren.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Stelle `src/app/(bestand)/fliesen/page.jsx` auf die Vorlage `src/components/vorlagen/WissensSeite.tsx` um: Inhalt als typisierte Daten in `src/inhalte/fliesen.ts` (Konstante `FLIESEN`), Metadaten aus dem Inhalt, Funktionen und strukturierte Daten des Bestands unverändert.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js 16.3.6, React 19 und Tailwind 4 gebaut und wird über Vercel ausgeliefert.
2. Die Seite hat 170 Adressen: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Ziel dieses Laufs ist eine Seite, die jeder Laie ohne Hilfe versteht; Prüfstein ist eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will.
4. Echte Fotos, eine durchgehende Geschichte, ein Intro und ein Seitenwechsel, bei dem sich Fliesen verlegen, heben die Gestaltung auf Award-Niveau.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.


## 5. Kern-Auszug
- **Zuerst:** `_werkstatt/pakete/E3-BAU-K016.md` ganz lesen (K-016 „Ruhe“, E-047, Entscheidungen zu dieser Seite in Abschnitt 4, Prüfungen in Abschnitt 5). Der Zusatz geht diesem Briefing vor.
- Bauart der Vorlagen: `_werkstatt/ENTSCHEIDUNGEN.md` Abschnitt E-025 lesen. Inhaltsmodell mit Kommentaren: `src/components/vorlagen/inhalt.ts`. Vorlage: `src/components/vorlagen/WissensSeite.tsx` (Kommentar am Anfang), Bausteine unter `src/components/vorlagen/teile/`. Beispiel einer fertigen Inhaltsdatei: `src/inhalte/barrierefreies-bad.ts`; Beispiel einer Seite mit Vorlage: `src/app/(bestand)/werkstatt-schaufenster/erzaehlseite/page.dev.tsx`.
- Text: `_werkstatt/texte/fliesen.md`. Texte in Backticks übernimmst du wörtlich mit ihren Textmarken `[[id|Wort]]`; `{Bild: id}` wird ein `ArbeitId`-Wert, `{Stimme: id}` ein Eintrag in `beleg.stimmen`, `{{COMPANY_DATA…}}` setzt die Vorlage selbst (nicht übernehmen). Bauhinweise in Klammern sind kein Seitentext.
- Hauptknöpfe, Anruf, WhatsApp, Seitenformel, Leitachse und Brotkrumen-Navigation setzt die Vorlage; die Seite schreibt keine eigenen Knöpfe.
- Metadaten: `createMetadata({ title: <meta.titel>, description: <meta.beschreibung>, path: '/fliesen' })` aus `src/lib/metadata`, wie im Bestand.
- Strukturierte Daten (`JsonLd`, `buildGraph` …), `generateStaticParams`, `dynamic`-Importe und eingebettete Funktionen (Formulare, Rechner, Kalender, Karten, Filter) des Bestands bleiben. Ein eingebettetes Werkzeug kommt in den Platz `werkzeug` der Vorlage (Typ `Arbeitsabschnitt`: `id` und `titelId` wie im Bestand, Titel und Einleitung aus dem Text oder, wenn der Text keinen hat, die heutige Überschrift ohne Werbewörter).
- Keine neuen Klassen, Farben, Abstände oder Komponenten; die Seite enthält nur Vorlage, Inhalt, Metadaten, strukturierte Daten und Funktionen.
- Seitenbesonderheiten: Inhaltstyp `WissenInhalt` (Wissensblöcke statt `tun`).

## 6. Maßstab
- `npx tsc --noEmit -p .` ohne Fehler in deinen Dateien; `npx eslint <deine Dateien>` ohne Fehler; `node _werkstatt/werkzeuge/werte.mjs --dateien <deine Dateien> --ziel $SCRATCH/E3-BAU-05/werte` 0 Befunde; `npm test` alle grün.
- `/fliesen` (bei Ortsseiten `/standorte/wetzlar` und `/standorte/limburg`) liefert auf http://127.0.0.1:4320 Status 200; `lesbarkeit.mjs` GRÜN; `einzelbild.mjs` bei m390 und d1440: Konsole 0, Überlauf 0, Überlappung 0.
- Jeder Satz der Textdatei steht auf der Seite (Stichprobe: zehn Sätze per `curl` und `grep -F` im HTML gefunden).

## 7. Grenzen
- Nur die Dateien unter „Schreibrechte“ ändern oder anlegen; alles andere nur lesen. Fehler oder Wünsche an gemeinsamen Dateien (Vorlagen, Bausteine, Navigation, Konfiguration, Tests) unter GEMEINSAME DATEIEN melden, nie selbst ändern.
- Nie committen, nie pushen, nie `git checkout`, `reset`, `stash` oder `clean` im Repo. Keine `.env*`-Dateien lesen oder zitieren. Dateien des Bestands nicht löschen (unbenutzte Komponenten nur melden).
- Server 4310 und 4320 nur nutzen, nie starten, beenden oder neu starten; kein `next build`. Browser nur über `installSperre()` aus `_werkstatt/werkzeuge/lib.mjs`; keine echten Formularsendungen.
- Umgebung in jeder Shell: `export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`, `export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, `export CHROME_PATH=/opt/pw-browsers/chromium`.

## 8. Schritte
1. Lies E-025, `inhalt.ts`, die Vorlage, die Beispiele und die Textdatei ganz; lies die Bestandsseite `src/app/(bestand)/fliesen/page.jsx` und notiere unter `$SCRATCH/E3-BAU-05/bestand.md`: Metadaten, strukturierte Daten, eingebettete Funktionen mit Kennungen und Ankern, Importe.
2. Schreibe `src/inhalte/fliesen.ts` mit `export const FLIESEN: WissenInhalt` (bei der Arbeitsseite die Props der Vorlage als Daten ohne Funktionen).
3. Stelle `src/app/(bestand)/fliesen/page.jsx` um: Vorlage mit Inhalt, Metadaten, strukturierte Daten und Funktionen wie im Bestand; entferne Importe, die die Seite nicht mehr braucht.
4. Prüfungen nach Maßstab, nacheinander (Rechner mit vier Kernen); Seite vorher einmal per `curl` aufrufen (Übersetzen bis 30 s).
5. Liste der Bestandskomponenten, die die Seite nicht mehr nutzt, für den Orchestrator.

## 9. Schnellprüfung und Selbstprüfung
- `node /home/user/tezgel/_werkstatt/werkzeuge/textpruefung.mjs _werkstatt/texte/fliesen.md` bleibt wie vorher (du änderst den Text nicht).
- `git -C /home/user/tezgel status --porcelain` vor und nach deiner Arbeit vergleichen: neu oder geändert sind nur Dateien aus deinen Schreibrechten.

## 10. Ausgabeformular
Höchstens 600 Wörter, genau diese Abschnitte: GEÄNDERTE DATEIEN · WAS UND WARUM · FUNKTIONEN (je Funktion des Bestands: wo sie jetzt steht, Kennung) · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste, unbenutzte Komponenten) · PRÜFUNG UND ERGEBNIS (Befehl und Ergebnis je Prüfung) · BILDBELEGE (Pfade) · OFFENE FRAGEN. Dein Bericht ist deine Antwort; lege keine Berichtsdatei an.

## 11. Letzte Zeile
=== ENDE E3-BAU-05 · BEREIT ZUR RÜCKGABE ===
