# E3-SEO-JSONLD

## 1. Kopfzeile
E3-SEO-JSONLD-1 bis -3 · Rolle Baumeister · Modell Haiku 5.5 · Stufe 2 · Kern-Version v3.6 · Schreibrechte (exakt, je Teilpaket; jeweils `layout.*` und `page.*` der genannten Ordner und aller Unterordner, nichts sonst):
- **-1:** `src/app/(bestand)/bad/**/layout.*`, `src/app/(bestand)/bad/**/page.*` (ohne `*.dev.*`), `$SCRATCH/E3-SEO-JSONLD-1/**`
- **-2:** `src/app/(bestand)/fliesen/**/layout.*`, `src/app/(bestand)/fliesen/**/page.*`, `$SCRATCH/E3-SEO-JSONLD-2/**`
- **-3:** dasselbe für die Ordner `untergrund-abdichtung`, `treppen`, `balkon-terrasse`, `naturstein`, `referenzen`, `karriere`, `blog`, dazu `$SCRATCH/E3-SEO-JSONLD-3/**`

Umfang: Strukturierte Daten (JSON-LD) je Seite statt je Ordner. Heute steht in `layout.tsx` eines Ordners ein JSON-LD-Block mit WebPage, BreadcrumbList und Service, und das Layout vererbt ihn an alle Unterseiten (z. B. meldet `/bad/badsanierung` die WebPage von `/bad`). Danach hat jede Seite genau ihre eigenen Daten.

## 2. Rollenbriefing
Du bist **Baumeister**: Du baust nach einer fertigen Vorgabe, ohne eigene Gestaltung.
- Gute Arbeit: `jsonld.mjs` ist für jede Seite deines Teilpakets GRÜN; sichtbar ändert sich nichts; jede Seite liefert 200.
- Die drei häufigsten Fehler: 1. Inhalte der Daten ändern (Namen der Leistungen, Beschreibungen, Adressen, Telefonnummern); 2. etwas Sichtbares ändern (Texte, Klassen, Brotkrumen auf der Seite); 3. eine Seite vergessen, die nur über das Layout Daten hatte.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Verschiebe den JSON-LD-Block aus dem `layout.*` jedes Ordners in dessen eigene `page.*` und gib jeder Unterseite mit dem Baustein `SeitenDaten` ihre eigene WebPage und BreadcrumbList.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel (Deniz Tezgel, Hohwardstraße 14, 35614 Aßlar), gebaut mit Next.js 16.3.6, React 19 und Tailwind 4.
2. Die Seite hat 170 Adressen; viele Bereiche haben eine Ordnerseite (z. B. `/fliesen`) und Unterseiten (z. B. `/fliesen/kueche`).
3. Strukturierte Daten helfen Suchmaschinen, jede Seite richtig einzuordnen; doppelte oder geerbte Daten verwirren sie.
4. Firmendaten, Adressen und Inhalte bleiben unverändert (G8); diese Aufgabe ändert nur, auf welcher Seite welche Daten stehen.
5. Der Baustein `src/components/seo/SeitenDaten.tsx` und das Prüfwerkzeug `_werkstatt/werkzeuge/jsonld.mjs` sind fertig (nur lesen).

## 5. Kern-Auszug
- **Baustein:** `import SeitenDaten from '@/components/seo/SeitenDaten';` mit `pfad`, `titel`, `beschreibung`, `brotkrumen` (Typ `Krume[]`: `{ name, href? }`, die letzte ohne `href` ist die Seite selbst) und wahlweise `weitere` (zusätzliche Knoten wie `buildServiceNode(…)` aus `@/lib/schema`). Kommentar am Anfang der Datei lesen.
- **Ordnerseite** (z. B. `src/app/(bestand)/bad/page.jsx`): Die Knoten aus dem `layout.*` des Ordners wandern hierher. WebPage und BreadcrumbList baut `SeitenDaten`; einen Service-Knoten (und andere Knoten außer WebPage/BreadcrumbList, z. B. FAQPage, CollectionPage) übergibst du unverändert als `weitere`. `titel` und `beschreibung` sind dieselben Werte wie in den Metadaten der Seite (`createMetadata`/`metadata`). `brotkrumen`: die Brotkrumen, die auf der Seite sichtbar stehen (bei Seiten auf einer Vorlage `inhalt.worum.brotkrumen`; sonst aus dem Markup der Seite, z. B. ein `Brotkrumen`-Baustein oder `breadcrumbs`-Liste), Startseite als `{ name: 'Start', href: '/' }`, wenn die Seite nichts anderes zeigt.
- **Layout** (`layout.*` des Ordners): JSON-LD-Block und die nur dafür nötigen Importe entfernen; die Datei bleibt bestehen und gibt `children` zurück (andere Inhalte wie `metadata`-Exporte bleiben unverändert).
- **Unterseite ohne eigenes JSON-LD:** `<SeitenDaten … />` als erstes Element der Rückgabe (bei Bedarf in `<>…</>`); `pfad` ist die Adresse der Seite, `titel` und `beschreibung` die Werte ihrer Metadaten (bei `generateMetadata` dieselben Ausdrücke), `brotkrumen` wie oben (wenn die Seite keine zeigt: Start, Ordnerseite mit ihrem sichtbaren Namen im Menü, Seite selbst mit ihrer H1 oder ihrem Titel ohne „ | …“).
- **Unterseite mit eigenem JSON-LD** (z. B. `blog/[slug]`, `referenzen/[id]`): nichts hinzufügen; sie wird grün, sobald das Layout des Ordners nichts mehr vererbt. Ist sie danach nicht grün, OFFENE FRAGE mit dem Befund aus `jsonld.mjs`.
- Kein sichtbarer Unterschied: keine Texte, Klassen, Brotkrumen oder Abschnitte ändern.

## 6. Maßstab
- `node _werkstatt/werkzeuge/jsonld.mjs --ordner <deine Ordner> --beispiel "<siehe Abschnitt 8>" --ziel $SCRATCH/<Teilpaket>/jsonld` → alle Seiten GRÜN, keine übersprungen.
- `npx tsc --noEmit -p .` ohne Fehler in deinen Dateien; `npx eslint <deine Dateien>` ohne Fehler; `npm test` alle grün.
- Jede Seite deines Teilpakets liefert 200 (`curl`); `einzelbild.mjs` auf der Ordnerseite und zwei Unterseiten bei m390: Konsole 0.
- Inhalt der Daten unverändert: Für die Ordnerseite vorher und nachher den Service-Knoten (und weitere Knoten) aus dem HTML ziehen und vergleichen (gleiches JSON außer `@id`/`url`-Bezügen auf WebPage/Breadcrumb).

## 7. Grenzen
- Nur die Dateien unter „Schreibrechte“ deines Teilpakets ändern; zwei andere Baumeister arbeiten gleichzeitig an anderen Ordnern, ein Lektor an Formularen. Fremde geänderte Dateien in `git status` sind normal und bleiben unberührt.
- Nie committen, nie pushen, nie `git checkout`, `reset`, `stash` oder `clean`. Keine `.env*`-Dateien lesen. Keine Datei löschen.
- `src/components/seo/*`, `src/lib/schema.ts`, Vorlagen und Konfiguration nur lesen; Wünsche unter GEMEINSAME DATEIEN.
- Server 4320 nur nutzen, nie starten, beenden oder neu starten; kein `next build`. Browser nur über `installSperre()` aus `_werkstatt/werkzeuge/lib.mjs`.
- Umgebung in jeder Shell: `cd /home/user/tezgel && export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad RELAUNCH_BASE=http://127.0.0.1:4320 RELAUNCH_SCRATCH=$SCRATCH PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome`.

## 8. Schritte
1. Ausgangslauf: `jsonld.mjs` wie in Abschnitt 6 (Beispielwerte für dynamische Routen: **-1** `"bad/musterbaeder/[slug]=basic-bad-4_6"`; **-3** `"blog/[slug]=fliesen-reinigen-pflegen,referenzen/[id]=badsanierung-grossformat"`; **-2** keine). Ergebnis notieren.
2. Je Ordner: `layout.*` lesen, die Knoten notieren, in die Ordnerseite verschieben (Abschnitt 5), Layout bereinigen.
3. Je Unterseite: Metadaten und sichtbare Brotkrumen ablesen, `SeitenDaten` einsetzen.
4. Prüfungen nach Abschnitt 6, nacheinander. Rot → beheben, wiederholen.

## 9. Schnellprüfung und Selbstprüfung
- `git -C /home/user/tezgel status --porcelain` vorher und nachher: neu geändert sind nur Dateien aus deinen Schreibrechten.
- `git diff -- <deine Dateien>`: nur JSON-LD-Zeilen, Importe und `SeitenDaten`; keine sichtbaren Änderungen.

## 10. Ausgabeformular
Höchstens 500 Wörter, genau diese Abschnitte: GEÄNDERTE DATEIEN · WAS UND WARUM (je Ordner ein Satz) · GEMEINSAME DATEIEN · PRÜFUNG UND ERGEBNIS (Ausgangslauf und Endlauf von `jsonld.mjs` mit Zahlen, weitere Befehle und Ergebnisse) · OFFENE FRAGEN. Dein Bericht ist deine Antwort; lege keine Berichtsdatei an.

## 11. Letzte Zeile
=== ENDE E3-SEO-JSONLD-<n> · BEREIT ZUR RÜCKGABE ===
