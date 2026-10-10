E2-PRUEF-T-2 · Prüfer · Modell: ARBEITSMODELL · Stufe 1 · Kern-Version: v2 · Umfang: Textbasis e0 mit texte.mjs (Wortgrenzen an Blöcken, Zeilen ohne CSS-Großschreibung) neu erheben (4310) und Probe auf drei Seiten gegen 4320
Schreibrechte (exakt): `_werkstatt/belege/e0/texte-index.json`, `_werkstatt/belege/e0/texte/** (nur durch texte.mjs erzeugt)`, `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-T-2/**`, dazu die Rückgabe `_werkstatt/pakete/E2-PRUEF-T-2.rueckgabe.md`. Sonst nichts.

## Rollenbriefing · Prüfer
Du richtest Prüfwerkzeuge ein, führst die Prüfungen deiner Stufe aus, schreibst Tests für neue Logik und berichtest knapp mit Belegpfaden. Häufige Fehler: Einzelmessung statt Median; deuten statt berichten; über die Stufe hinaus prüfen.

## Aufgabe in einem Satz
Erhebe die Textbasis e0 mit dem geänderten `texte.mjs` (Commit „E2-WERK-T2“) neu gegen den Reinraum-Server 4310, belege die Wiederholbarkeit und vergleiche drei Seiten des Arbeitsstands auf 4320 dagegen – du behebst nichts und änderst keine Werkzeuge.

## Das Projekt in fünf Sätzen (wortgleich aus KERN)
1. Wir heben die Website von Fliesenverlegung Tezgel (Deniz Tezgel, Aßlar, seit 2008 bei der Handwerkskammer Wiesbaden eingetragen) auf allen Seiten auf Spitzenniveau, ohne Texte, Logo, Rechtliches oder Funktionen zu verlieren.
2. Leitidee: Jede Seite ist ein Verlegeplan – ein Fugenraster, eine rote Laserachse, und alles fluchtet daran.
3. Besucher sind Eigentümer in Mittelhessen zwischen 35 und 75, die in wenigen Schritten die passende Leistung finden, Vertrauen prüfen, ihren Ort prüfen, den Ablauf verstehen und ein Aufmaß anfragen wollen.
4. Gestaltet wird mit Archivo und IBM Plex Mono, mit Kalk, Tinte und genau einem Rot, mit gezeichneten Verlegeplänen statt Effekten und mit Bewegung, die ausrichtet und nie federt.
5. Alles ist zugänglich nach WCAG 2.2 AA, schnell (mobil LCP ≤ 2,5 s), ohne Effektteppich und ohne Erfundenes – im Zweifel gilt Bestand vor Gestaltung.

## Kern-Auszug (unveränderlich)
## Maßstab
- Wiederholbarkeit: zwei Läufe desselben Servers ergeben im Vergleich `ergebnis` GRÜN, 0 entfernte und 0 hinzugefügte Zeilen, 0 Wortspannen.
- Basis vollständig: so viele Seiten wie `grundmenge()` liefert (bisher 121) × 2 Ansichten = Indexeinträge (bisher 242), Sitemap 163, 0 kaputte Links.
- Berichtet wird nur, was die Werkzeuge ausgeben – Zahlen und Fundstellen, keine Deutung.

## Grenzen
- Repository `/home/user/tezgel`, Branch `claude/amazing-mendel-b0g40w`. Kein `git commit`, `push`, `checkout`, `reset`, `stash`, `restore` – Git nur lesend (`status`, `diff`, `log`, `show`).
- Nur die Dateien unter „Schreibrechte“ ändern. Fehler in fremden Dateien melden (OFFENE FRAGEN), nicht beheben. Gemeinsame Dateien (`src/app/globals.css`, `src/app/layout.tsx`, `next.config.ts`, `package.json`, `src/config/*`, `_werkstatt/KERN.md`, `_werkstatt/werkzeuge/tests/*`) nie ändern – Bedarf unter GEMEINSAME DATEIEN melden.
- Kein `next build`, kein `npm run build`, kein Start oder Stopp von Servern. Server laufen bereits: Produktion http://127.0.0.1:4310 (Stand des letzten Commits), Entwicklung http://127.0.0.1:4320 (Arbeitsbaum). Ist einer nicht erreichbar: melden, nicht starten.
- Keine echten Formularsendungen, kein `npm run indexnow`, keine POST-Anfragen per curl; Browserläufe nur über die Werkzeuge in `_werkstatt/werkzeuge` (Anfragesperre aus `lib.mjs`). Keine `.env*`-Dateien lesen oder anlegen.
- UNANTASTBAR: Logo, Rechtstexte, Geschäftslogik (`src/app/api/**`, `src/lib/email/**`, Validierung, Einwilligungslogik), Verhalten der Datenmodelle (`src/config/*`), Überschriften und Fließtexte (nur Vorschlag in der Rückgabe). Mikrotexte (Knöpfe, Labels, Etiketten, Alt-Texte, Zustandsmeldungen) nur, wenn das Paket es ausdrücklich erlaubt, und jede Änderung alt → neu in der Rückgabe auflisten.
- Neue Abhängigkeiten nie im Projekt. Scratchpad für Hilfsdateien: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/<Kennung>/` (eigener Unterordner).
- Werkzeuge in `_werkstatt/werkzeuge` nicht ändern (auch nicht `texte.mjs`, `texte-vergleich.mjs`, `_werkstatt/texte-erlaubt.json`). Fällt ein Werkzeug aus: Fehlermeldung wörtlich in die Rückgabe und abbrechen.
- Alle Befehle aus `/home/user/tezgel` ausführen. Kein `pruefe-a.sh`.
- Es laufen parallel andere Prüfer auf 4320; das ist erwartet. Nur `curl` mit GET verwenden.

## Schritte
1. Erreichbarkeit: `for p in 4310 4320; do curl -s -o /dev/null -w "$p %{http_code}\n" --max-time 60 http://127.0.0.1:$p/; done` → beide 200, sonst melden und abbrechen. Scratch-Ordner `S=/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-T-2` anlegen.
2. Wiederholbarkeit (4310): `node _werkstatt/werkzeuge/texte.mjs --satz t1 --seiten /,/fliesen,/kontakt --ansichten d1440,m390 --base http://127.0.0.1:4310 --ziel $S/t1`, dasselbe mit `--satz t2 --ziel $S/t2`, dann `node _werkstatt/werkzeuge/texte-vergleich.mjs t1 t2 --vorher-ordner $S/t1 --nachher-ordner $S/t2 > $S/t1-t2.log`. Erste Zeile des Logs und `summe` aus `$S/t2/texte-vergleich-gegen-t1.json` notieren. Ist das nicht GRÜN mit 0 Spannen: Abweichungen (erste 10) wörtlich melden und NICHT weitermachen.
3. Probe Wortgrenzen: aus `$S/t1/texte/start.json` die Anzahl der Wörter in `bloecke.main`, `bloecke.header`, `bloecke.footer` und die ersten 15 Wörter von `bloecke.footer` wörtlich notieren; prüfen, ob in `bloecke.main` ein Wort vorkommt, das zwei offensichtlich getrennte Wörter verbindet (Großbuchstabe mitten im Wort nach Kleinbuchstabe, z. B. „anfragenAnrufen“) – Fundstellen (höchstens 10) wörtlich nennen.
4. Basis neu: Anzahl Dateien in `_werkstatt/belege/e0/texte/` notieren (vorher, bisher 363). Dann `node _werkstatt/werkzeuge/texte.mjs --satz e0 --ansichten d1440,m390 --base http://127.0.0.1:4310 --ziel _werkstatt/belege/e0 > $S/e0.log 2>&1` (ohne `--seiten`: alle Seiten der Grundmenge). Danach: Anzahl Dateien (nachher), Zahl der Indexeinträge in `_werkstatt/belege/e0/texte-index.json` (`seiten`), `sitemap_anzahl`, `kaputte_links`, Zahl der Einträge mit `status` ≠ 200. `git status --porcelain _werkstatt/belege/e0 | wc -l` notieren (geänderte Basisdateien sind erwartet).
5. Probe Arbeitsstand (4320, nur drei Seiten): `node _werkstatt/werkzeuge/texte.mjs --satz probe --seiten /,/fliesen,/kontakt --ansichten d1440,m390 --base http://127.0.0.1:4320 --ziel $S/probe > $S/probe.log 2>&1`, dann `node _werkstatt/werkzeuge/texte-vergleich.mjs e0 probe --vorher-ordner _werkstatt/belege/e0 --nachher-ordner $S/probe --erlaubt _werkstatt/texte-erlaubt.json > $S/probe-vergleich.log 2>&1`. Erste Zeile des Logs und `summe` notieren. Aus `$S/probe/texte-vergleich-gegen-e0.json` ALLE Einträge mit `erlaubt: false` (je Seitenschlüssel und Block: Text, kontext_vor, kontext_nach) sowie alle entfernten Zeilen (je Teil) vollständig in die Rückgabe übernehmen (bei mehr als 60 Einträgen die ersten 60 und den Pfad).
6. Rückgabe: Ergebnisse aus Schritt 1–5 mit Zahlen und Pfaden.

## Schnellprüfung und Selbstprüfung
- Keine Werkzeugänderung; Belege: Logdateien und JSON-Pfade im Scratch-Ordner.
- Mengen gezählt (je Schritt die geforderte Menge erreicht), Schreibrechte und Grenzen eingehalten (`git status --porcelain` zeigt nur erlaubte Dateien), offene Fragen gelistet.
- Die Zahlen in der Rückgabe stimmen mit den JSON-Dateien überein (je eine Zahl stichprobenartig nachgerechnet und genannt).
- `git status --porcelain` zeigt außer `_werkstatt/belege/e0/**` und der Rückgabe keine von dir geänderten Dateien (fremde Änderungen anderer Pakete sind möglich und werden nicht angefasst).

## Ausgabeformular
In `_werkstatt/pakete/E2-PRUEF-T-2.rueckgabe.md` UND als letzte Antwort, höchstens 600 Wörter (Kundschafter 1.500): GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.

=== ENDE E2-PRUEF-T-2 · BEREIT ZUR RÜCKGABE ===
