Kopfzeile: UM-E3-LCP-K · Rolle Kundschafter · Modell Haiku 5.5 · Stufe 1 · Kern-Version 4.1 · Kostenklasse S · Schreibrechte: `_werkstatt/berichte/UM-E3-LCP-K.md` (neu; diese Berichtsdatei ist ausdrücklich dein Schreibrecht), Hilfsskripte nur unter `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/um-e3-lcp-k/` · Umfang: nur Bericht, keine Messung, keine Änderung am Code.

## Rollenbriefing
Du bist Kundschafter. Du liest vorhandene Messdaten und berichtest, was sie zeigen.
Häufige Fehler, die du vermeidest:
- Selbst neu messen.
- Ursachen behaupten, die die Daten nicht zeigen.
- Mittelwerte statt Mediane nennen.

## Aufgabe in einem Satz
Schlüssle für jede der 12 Hauptansichten das mobile LCP und die langsamste Reaktion auf. Grundlage sind die vorhandenen Lighthouse-Rohberichte des aktuellen Stands. Das Ergebnis ist die Arbeitsgrundlage für UM-E3-LEISTUNG.

## Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js 16.4, React 19.3 und Tailwind 4.3 gebaut, wird über Vercel ausgeliefert und steht auf dem neuesten stabilen Stand ihres Stacks.
2. Die Seite hat 202 Adressen – 168 Seiten, 2 Weiterleitungen und 32 dauerhaft entfernte –: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Prüfstein bleibt eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will: Sie versteht jede Seite ohne Hilfe, und jede Bewegung ist für sie verständlich, abschaltbar und nie im Weg.
4. Die Leitidee „Klar verlegt“ trägt den Seitenwechsel Fliese für Fliese, den Eingang an der Schnur, die rote Laserlinie als Leitfaden und das Fugenkreuz als Cursor; echte Fotos zeigen die Arbeit.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.

## Kern-Auszug
- K-012 BUDGETS in `_werkstatt/KERN.md`: LCP mobil ≤ 2,5 s, Leistung mobil ≥ 90, TBT ≤ 200 ms, CLS ≤ 0,1, Reaktion ≤ 200 ms. Etwa 10 Zeilen.
- Stand: LCP mobil wird auf 0 von 12 Ansichten erreicht (2,8 bis 4,6 s).

## Quellen (nur lesen)
- Rohberichte (Lighthouse-JSON, je Seite × Form × Lauf): `/home/user/tezgel/_werkstatt/cache/lighthouse/um-e2-b2/lh-head/*.report.json`, Server 4315 = Commit f5544581, mobil mit Lighthouse-Standarddrosselung. Zusammenfassung: `/home/user/tezgel/_werkstatt/belege/um-e2-b2/lh-head/lighthouse.json`.
- Reaktion: `/home/user/tezgel/_werkstatt/belege/um-e2/reaktion/reaktion.json` (E2-Endstand, m390, 4× Drosselung).
- Hauptansichten: `/home/user/tezgel/_werkstatt/HAUPTANSICHTEN.json`.

## Schritte
1. Lies je mobilem Rohbericht der 12 Ansichten (3 Läufe) diese Audits und Werte:
   - `largest-contentful-paint-element`: Selektor, Knotentyp, Bild-URL, falls ein Bild.
   - `lcp-phases` oder `largest-contentful-paint` mit den Phasen TTFB, Ladeverzögerung, Ladezeit, Renderverzögerung. Fehlt das Audit in dieser Lighthouse-Version, nimm die Felder, die es gibt, und nenne die Audit-ID.
   - `network-requests`: Größe, Typ, Priorität und Start des LCP-Bilds.
   - `font-display` und Schriftanfragen.
   - Ob das LCP-Element zum Einwilligungsbanner gehört.
   - `render-blocking-resources`, `bootup-time`, `mainthread-work-breakdown` und die drei größten Long Tasks.
   Nimm je Wert den Median der drei Läufe.
2. Reaktion: je Ansicht die langsamste Handlung (höchster Median) mit Spanne. Ordne die Long Animation Frames zu, wenn die Datei sie enthält.
3. Werte aus:
   - Welche Phase dominiert je Ansicht?
   - Welche Ansichten teilen dieselbe Ursache (z. B. dasselbe Bildfeld, dieselbe Schrift)?
   - Welche drei Hebel versprechen nach den Daten die größte LCP-Senkung?

## Ausgabeformular (Bericht `_werkstatt/berichte/UM-E3-LCP-K.md`, höchstens 900 Wörter plus Tabellen)
- QUELLEN (Dateien, Lighthouse-Version)
- TABELLE je Ansicht: LCP-Element, LCP ms, TTFB, Ladeverzögerung, Ladezeit, Renderverzögerung, LCP-Bild (Format, KB, Priorität), Banner ja/nein, TBT, größte Long Task
- REAKTION je Ansicht
- MUSTER und HEBEL, jeweils mit Beleg-Zahl
- OFFENE FRAGEN

Letzte Zeile: `=== ENDE UM-E3-LCP-K · BEREIT ZUR RÜCKGABE ===`

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.
