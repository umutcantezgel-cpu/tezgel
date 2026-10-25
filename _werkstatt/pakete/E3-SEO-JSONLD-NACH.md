# E3-SEO-JSONLD-NACH

## 1. Kopfzeile
E3-SEO-JSONLD-NACH · Rolle Baumeister · Modell Haiku 5.5 · Stufe 2 · Kern-Version v3.6 · Schreibrechte (exakt): `src/app/(bestand)/page.tsx`, `src/app/(bestand)/ausstellung/wetzlar/page.jsx`, `src/app/(bestand)/ausstellung/giessen/page.jsx`, `src/app/(bestand)/downloads/page.jsx`, `src/app/(bestand)/unternehmen/page.jsx`, `src/app/(bestand)/team/page.jsx`, `src/app/(bestand)/partner/page.jsx`, `src/app/(bestand)/termin/page.jsx`, `src/app/(bestand)/barrierefreiheit/page.jsx`; Arbeitsordner `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-SEO-JSONLD-NACH/**`.

Umfang: Neun Seiten haben heute keinen eigenen Seitenknoten (WebPage) und keine BreadcrumbList in den strukturierten Daten (`jsonld.mjs` meldet „kein Seitenknoten“ und „0 BreadcrumbList“). Danach hat jede dieser Seiten genau ihre eigenen Daten, wie die 48 Seiten aus E3-SEO-JSONLD (Briefing `_werkstatt/pakete/E3-SEO-JSONLD.md`, Entscheidungen E-050 und E-053).

**Arbeitsordner:** Alle eigenen Dateien nur unter dem absoluten Pfad oben, nie unter `/E3-…` im Wurzelverzeichnis und nie im Repo.

## 2. Rollenbriefing
Du bist **Baumeister**: Du baust nach einer fertigen Vorgabe, ohne eigene Gestaltung.
- Gute Arbeit: `jsonld.mjs` ist für alle neun Seiten GRÜN; sichtbar ändert sich nichts; jede Seite liefert 200.
- Die drei häufigsten Fehler: 1. etwas Sichtbares ändern (Texte, Klassen, Abschnitte); 2. einen zweiten Seitenknoten für dieselbe Seite anlegen, wo schon ein JSON-LD-Block steht (vorhandene Knoten dann als `weitere` übernehmen statt doppelt); 3. andere Werte als die Metadaten der Seite verwenden.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Setze in jede der neun Seiten den Baustein `SeitenDaten` mit Adresse, Titel und Beschreibung aus den Metadaten der Seite und den sichtbaren Brotkrumen.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel (Deniz Tezgel, Hohwardstraße 14, 35614 Aßlar), gebaut mit Next.js 16.3.6, React 19 und Tailwind 4.
2. Strukturierte Daten helfen Suchmaschinen, jede Seite richtig einzuordnen; jede Seite soll genau einen eigenen Seitenknoten und eine BreadcrumbList haben.
3. Der Baustein `src/components/seo/SeitenDaten.tsx` baut beides; die Beschreibung bringt `buildWebPageNode` über `src/lib/beschreibung.ts` auf denselben Text wie die Meta-Beschreibung (nur lesen).
4. Firmendaten, Adressen und Inhalte bleiben unverändert (G8); diese Aufgabe fügt nur Daten hinzu, die man nicht sieht.
5. Das Prüfwerkzeug `_werkstatt/werkzeuge/jsonld.mjs` prüft fünf Regeln je Seite (Kopfkommentar der Datei lesen).

## 5. Kern-Auszug
- **Baustein:** `import SeitenDaten from '@/components/seo/SeitenDaten';` mit `pfad`, `titel`, `beschreibung`, `brotkrumen` (Typ `Krume[]`: `{ name, href? }`, die letzte ohne `href` ist die Seite selbst) und wahlweise `weitere` (zusätzliche Knoten). Kommentar am Anfang der Datei lesen.
- **Einsetzen:** `<SeitenDaten … />` als erstes Element der Rückgabe der Seite (bei Bedarf in `<>…</>`).
- **Werte:** `pfad` ist die Adresse der Seite (`/` für die Startseite). `titel` und `beschreibung` sind dieselben Werte wie in den Metadaten der Seite (`metadata`, `createMetadata(…)` oder `generateMetadata` in `page.*` oder im `layout.*` desselben Ordners; dieselben Ausdrücke oder dieselbe Konstante, nicht abgeschrieben). Steht die Metadaten-Angabe nur im `layout.*` (z. B. `/termin/layout.tsx`), exportiere sie dort nicht um, sondern lies die Werte und verwende in der Seite dieselben Texte; notiere das unter OFFENE FRAGEN.
- **Brotkrumen:** die Brotkrumen, die auf der Seite sichtbar stehen (Baustein `Brotkrumen` oder eine Liste im Markup), Startseite als `{ name: 'Start', href: '/' }`. Zeigt die Seite keine: Start, die Seite selbst mit ihrer H1 oder ihrem Titel ohne „ | …“. Startseite `/`: nur `[{ name: 'Start' }]`.
- **Vorhandene JSON-LD-Blöcke** der Seite (z. B. LocalBusiness, Organization, FAQPage, Event) bleiben; sind sie ein eigener `<JsonLd …>`-Block, lass ihn stehen, solange er keinen Seitenknoten (WebPage, AboutPage, ContactPage, CollectionPage) und keine BreadcrumbList enthält. Enthält er einen, übernimm dessen übrige Knoten als `weitere` und entferne nur den doppelten Seitenknoten oder die doppelte BreadcrumbList; Inhalt der übrigen Knoten unverändert.
- **Kein sichtbarer Unterschied:** keine Texte, Klassen, Brotkrumen oder Abschnitte ändern.

## 6. Maßstab
- `node _werkstatt/werkzeuge/jsonld.mjs --seiten /,/ausstellung/wetzlar,/ausstellung/giessen,/downloads,/unternehmen,/team,/partner,/termin,/barrierefreiheit --ziel <Arbeitsordner>/jsonld` → neun GRÜN. Ausnahme: ROT nur wegen Regel 5 (Beschreibung des Seitenknotens weicht ab) auf einer Seite, deren Meta-Beschreibung gerade ein Lektor (Paket E3-SEO-META-2) neu schreibt (`/ausstellung/*`, `/downloads`, `/unternehmen`, `/team`, `/partner`, `/termin`): dann prüfe, dass `beschreibung` derselbe Ausdruck wie in den Metadaten ist, und nenne es.
- `npx tsc --noEmit -p .` ohne Fehler; `npx eslint <deine Dateien>` ohne Fehler; `npm test` alle grün.
- Jede Seite liefert 200 (`curl -s -o /dev/null -w "%{http_code}"`); `node _werkstatt/werkzeuge/einzelbild.mjs --seite / --ansichten m390 --ziel <Arbeitsordner>/bild` und dasselbe für `/termin`: Konsole 0.
- Inhalt der übrigen Knoten unverändert: vorher und nachher je Seite alle Knoten aus dem HTML ziehen (`<script type="application/ld+json">`) und vergleichen (gleich außer neuem WebPage- und BreadcrumbList-Knoten).
- Funktionsprüfung Termin, weil `/termin` geändert wird: `cd _werkstatt/werkzeuge && npx playwright test -c playwright.config.mjs funktion-termin.spec.mjs --project=desktop --workers=1 --reporter=line` grün.

## 7. Grenzen
- Nur die Dateien unter „Schreibrechte“ ändern; drei Lektoren schreiben gleichzeitig Meta-Beschreibungen in `src/inhalte/meta/*`. Fremde geänderte Dateien in `git status` sind normal und bleiben unberührt.
- `src/components/seo/*`, `src/lib/*`, `src/app/(bestand)/layout.tsx`, alle `layout.*`, Vorlagen und Konfiguration nur lesen; Wünsche unter GEMEINSAME DATEIEN.
- Nie committen, nie pushen, nie `git checkout`, `reset`, `stash` oder `clean`. Keine `.env*`-Dateien lesen. Keine Datei löschen.
- Server 4320 nur nutzen, nie starten, beenden oder neu starten; kein `next build`. Browser nur über die Werkzeuge in `_werkstatt/werkzeuge`.
- Umgebung in jeder Shell: `cd /home/user/tezgel && export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad RELAUNCH_BASE=http://127.0.0.1:4320 RELAUNCH_SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome`.

## 8. Schritte
1. Ausgangslauf: `jsonld.mjs` wie in Abschnitt 6; je Seite die vorhandenen Knoten notieren (vorher-Datei im Arbeitsordner).
2. Je Seite: Metadaten (page und layout) und sichtbare Brotkrumen ablesen, `SeitenDaten` einsetzen.
3. Prüfungen nach Abschnitt 6, nacheinander. Rot → beheben, wiederholen.

## 9. Schnellprüfung und Selbstprüfung
- `git -C /home/user/tezgel status --porcelain` vorher und nachher: neu geändert sind nur Dateien aus deinen Schreibrechten.
- `git diff -- <deine Dateien>`: nur Importe, `SeitenDaten` und gegebenenfalls entfernte doppelte Knoten; keine sichtbaren Änderungen.

## 10. Ausgabeformular
Höchstens 500 Wörter, genau diese Abschnitte: GEÄNDERTE DATEIEN · WAS UND WARUM (je Seite ein Satz) · GEMEINSAME DATEIEN · PRÜFUNG UND ERGEBNIS (Ausgangslauf und Endlauf von `jsonld.mjs` mit Zahlen, weitere Befehle und Ergebnisse) · OFFENE FRAGEN. Dein Bericht ist deine Antwort; lege keine Berichtsdatei an.

## 11. Letzte Zeile
=== ENDE E3-SEO-JSONLD-NACH · BEREIT ZUR RÜCKGABE ===
