Kopfzeile: UM-E3-TBT · Rolle Kundschafter · Modell Haiku 5.5 · Stufe 1 · Kern-Version 4.1 · Kostenklasse S · Schreibrechte: `_werkstatt/berichte/UM-E3-TBT.md` (neu; diese Berichtsdatei ist ausdrücklich dein Schreibrecht), Hilfsskripte nur unter `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/tbt/auswertung/` · Umfang: nur Auswertung vorhandener Rohberichte, keine Messung, keine Codeänderung.

## Rollenbriefing
Du bist Kundschafter. Du liest Messdaten und ordnest sie zu, ohne zu raten.
Häufige Fehler, die du vermeidest:
- Selbst neu messen.
- Ursachen behaupten, die die Daten nicht zeigen.
- Mittelwerte statt Mediane nennen.

## Aufgabe in einem Satz
Kläre, ob die Total Blocking Time (TBT) mobil auf `/`, `/leistungen` und `/balkon-terrasse` nach dem Stack-Upgrade wirklich höher ist als in E0, und ordne die Differenz den Skripten zu.

## Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js 16.4, React 19.3 und Tailwind 4.3 gebaut, wird über Vercel ausgeliefert und steht auf dem neuesten stabilen Stand ihres Stacks.
2. Die Seite hat 202 Adressen – 168 Seiten, 2 Weiterleitungen und 32 dauerhaft entfernte –: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Prüfstein bleibt eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will: Sie versteht jede Seite ohne Hilfe, und jede Bewegung ist für sie verständlich, abschaltbar und nie im Weg.
4. Die Leitidee „Klar verlegt“ trägt den Seitenwechsel Fliese für Fliese, den Eingang an der Schnur, die rote Laserlinie als Leitfaden und das Fugenkreuz als Cursor; echte Fotos zeigen die Arbeit.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.

## Lage
- Tor E2 (E-076, `_werkstatt/berichte/UM-E2-B2.md`): TBT mobil lag auf den drei Seiten knapp über der E0-Spanne. Die Reihenfolge war fest (E0 vor HEAD).
- Neue Messung (Skript `scratchpad/tbt/messung.sh`): je Seite E0, HEAD, HEAD, E0, je 3 gezählte Läufe.
- Server: E0 = 4311 (7ceb5e41, Next 16.3.6, React 19.2), HEAD = 4317 (27d87b66, Next 16.4.3, React 19.3.1).
- Rohberichte: `/home/user/tezgel/_werkstatt/cache/lighthouse/um-e3-tbt/{e0-a,head-a,head-b,e0-b}/*-mobil-*.report.json`.
- Zusammenfassungen: `/home/user/tezgel/_werkstatt/belege/um-e3-tbt/{e0-a,head-a,head-b,e0-b}/lighthouse.json`.

## Schritte
1. **Prüfe die Vollständigkeit:** je Seite und Satz 3 Rohberichte, keine Fehler.
2. **TBT je Seite:** Median aus 6 Läufen für E0 (e0-a und e0-b) und für HEAD (head-a und head-b). Dazu die Spanne, und dazu die Mediane je Satz, damit eine Drift über die Zeit sichtbar wird.
3. **Zuordnung je Seite:** Median je Satz aus den Audits
   - `bootup-time`: Skriptzeit je URL;
   - `mainthread-work-breakdown`: Kategorien;
   - `long-tasks`: Anzahl, Summe, die drei längsten mit URL.

   Ordne jede Skript-URL zu:
   - Next-Laufzeit (`/_next/static/chunks/` mit framework, main, webpack, turbopack oder polyfill im Namen, sonst über den Inhalt der Datei im Reinraum `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/reinraum-27d87b66/.next/static/chunks/` bzw. `reinraum-7ceb5e41`);
   - React (react-dom);
   - eigener Code;
   - Bewegungsmodul (`src/lib/motion`, Verlegen, Intro);
   - Dritte.

   Vergleiche E0 mit HEAD je Gruppe in ms.
4. **Ergebnis:**
   - Ist der TBT-Unterschied bei wechselnder Reihenfolge noch da? (Median HEAD minus E0 im Vergleich zur Spanne)
   - Welche Gruppe trägt ihn?

## Ausgabeformular (Bericht `_werkstatt/berichte/UM-E3-TBT.md`, höchstens 700 Wörter plus Tabellen)
- QUELLEN UND VOLLSTÄNDIGKEIT
- TABELLE TBT je Seite: E0 Median (Spanne), HEAD Median (Spanne), je Satz
- TABELLE Zuordnung je Seite und Gruppe: E0 ms, HEAD ms, Differenz
- LONG TASKS: die drei längsten je Seite, E0 gegen HEAD
- ERGEBNIS in drei Sätzen
- OFFENE FRAGEN

Letzte Zeile: `=== ENDE UM-E3-TBT · BEREIT ZUR RÜCKGABE ===`

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.
