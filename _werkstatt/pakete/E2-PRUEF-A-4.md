E2-PRUEF-A-4 · Prüfer · Modell: ARBEITSMODELL · Stufe 1 · Kern-Version: v2 · Umfang: Prüfstufe A für E2-ORCH-09 (/kontakt, BookingCalendar V-02/V-05, DirectContactCard) und E2-ORCH-04-N2; vollständige Funktionstests (Dev-Server 4320)
Schreibrechte (exakt): `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-A-4/**`, dazu die Rückgabe `_werkstatt/pakete/E2-PRUEF-A-4.rueckgabe.md`. Sonst nichts.

## Rollenbriefing · Prüfer
Du richtest Prüfwerkzeuge ein, führst die Prüfungen deiner Stufe aus, schreibst Tests für neue Logik und berichtest knapp mit Belegpfaden. Häufige Fehler: Einzelmessung statt Median; deuten statt berichten; über die Stufe hinaus prüfen.

## Aufgabe in einem Satz
Prüfe E2-ORCH-09 nach Prüfstufe A, belege die Abnahmetests V-02 (Kalender rechnet mit dem Besuchstag) und F-12 (Karten hinter Einwilligung, nach Testanpassung) und erhebe Bilder von /kontakt – du behebst nichts.

## Das Projekt in fünf Sätzen (wortgleich aus KERN)
1. Wir heben die Website von Fliesenverlegung Tezgel (Deniz Tezgel, Aßlar, seit 2008 bei der Handwerkskammer Wiesbaden eingetragen) auf allen Seiten auf Spitzenniveau, ohne Texte, Logo, Rechtliches oder Funktionen zu verlieren.
2. Leitidee: Jede Seite ist ein Verlegeplan – ein Fugenraster, eine rote Laserachse, und alles fluchtet daran.
3. Besucher sind Eigentümer in Mittelhessen zwischen 35 und 75, die in wenigen Schritten die passende Leistung finden, Vertrauen prüfen, ihren Ort prüfen, den Ablauf verstehen und ein Aufmaß anfragen wollen.
4. Gestaltet wird mit Archivo und IBM Plex Mono, mit Kalk, Tinte und genau einem Rot, mit gezeichneten Verlegeplänen statt Effekten und mit Bewegung, die ausrichtet und nie federt.
5. Alles ist zugänglich nach WCAG 2.2 AA, schnell (mobil LCP ≤ 2,5 s), ohne Effektteppich und ohne Erfundenes – im Zweifel gilt Bestand vor Gestaltung.

## Kern-Auszug (unveränderlich)
## Maßstab
- Prüfstufe A: tsc und Lint ohne Fehler; alle Funktionstests grün außer bekannten fixme (wegen globals.css laufen alle Specs); Bilder Status 200 ohne Überlauf; Textvergleich gegen e0 mit Erlaubnisliste GRÜN.
- V-02: der neue Test in funktion-termin.spec.mjs („V-02 Kalender rechnet mit dem Besuchstag“) ist grün.
- Berichtet wird, was die Werkzeuge ausgeben; keine Gestaltungsurteile.

## Grenzen
- Repository `/home/user/tezgel`, Branch `claude/amazing-mendel-b0g40w`. Kein `git commit`, `push`, `checkout`, `reset`, `stash`, `restore` – Git nur lesend (`status`, `diff`, `log`, `show`).
- Nur die Dateien unter „Schreibrechte“ ändern. Fehler in fremden Dateien melden (OFFENE FRAGEN), nicht beheben. Gemeinsame Dateien (`src/app/globals.css`, `src/app/layout.tsx`, `next.config.ts`, `package.json`, `src/config/*`, `_werkstatt/KERN.md`, `_werkstatt/werkzeuge/tests/*`) nie ändern – Bedarf unter GEMEINSAME DATEIEN melden.
- Kein `next build`, kein `npm run build`, kein Start oder Stopp von Servern. Server laufen bereits: Produktion http://127.0.0.1:4310 (Stand des letzten Commits), Entwicklung http://127.0.0.1:4320 (Arbeitsbaum). Ist einer nicht erreichbar: melden, nicht starten.
- Keine echten Formularsendungen, kein `npm run indexnow`, keine POST-Anfragen per curl; Browserläufe nur über die Werkzeuge in `_werkstatt/werkzeuge` (Anfragesperre aus `lib.mjs`). Keine `.env*`-Dateien lesen oder anlegen.
- UNANTASTBAR: Logo, Rechtstexte, Geschäftslogik (`src/app/api/**`, `src/lib/email/**`, Validierung, Einwilligungslogik), Verhalten der Datenmodelle (`src/config/*`), Überschriften und Fließtexte (nur Vorschlag in der Rückgabe). Mikrotexte (Knöpfe, Labels, Etiketten, Alt-Texte, Zustandsmeldungen) nur, wenn das Paket es ausdrücklich erlaubt, und jede Änderung alt → neu in der Rückgabe auflisten.
- Neue Abhängigkeiten nie im Projekt. Scratchpad für Hilfsdateien: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/<Kennung>/` (eigener Unterordner).
- Werkzeuge, Tests und `_werkstatt/texte-erlaubt.json` nicht ändern.
- Parallel arbeitet ein Baumeister an `src/components/maps/LocalDominanceMap.tsx`; Befunde nur daraus unter „[BAU-04]“.
- Alle Befehle aus `/home/user/tezgel`.

## Schritte
1. Erreichbarkeit 4320 (200). `S=/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-A-4` anlegen.
2. Prüfstufe A: `bash _werkstatt/werkzeuge/pruefe-a.sh E2-PRUEF-A-4 src/app/kontakt/page.jsx src/components/contact/BookingCalendar.tsx src/components/contact/DirectContactCard.tsx src/app/globals.css src/components/ui/FAQAccordion.tsx src/components/common/MobileMenu.jsx -- /kontakt /termin / /faq > $S/pruefe-a.log 2>&1` (15–20 Minuten, vollständig abwarten). Ergebnis je Stufe mit Zahlen; jeder Testfehlschlag mit Spec, Titel, Projekt und Meldung (erste 3 Zeilen); einen Fehlschlag genau einmal einzeln wiederholen und beide Ergebnisse nennen.
3. V-02 gezielt: in `_werkstatt/werkzeuge` `RELAUNCH_BASE=http://127.0.0.1:4320 RELAUNCH_OUTPUT=$S/v02 npx playwright test tests/funktion-termin.spec.mjs --grep "V-02" --workers=1` – Ergebnis beider Projekte; bei Fehlschlag die gesammelten Konsolenmeldungen aus dem Fehlerkontext wörtlich (höchstens 10 Zeilen).
4. Textvergleich: aus `_werkstatt/cache/texte/E2-PRUEF-A-4/texte-vergleich-gegen-e0.json` je Seitenschlüssel alle unerlaubt entfernten Spannen (Text, kontext_vor, kontext_nach) und alle entfernten Zeilen vollständig (höchstens 60).
5. Vollbilder: `node _werkstatt/werkzeuge/einzelbild.mjs --base http://127.0.0.1:4320 --seite /kontakt --ansichten m390,t768,d1440 --voll --ziel $S/voll-kontakt` und dasselbe mit `--scroll '#termin-buchen'` statt `--voll` (Ziel `$S/termin`) – Pfade nennen.
6. Bewegung auf 4320 für /kontakt: `--modus register` und `--modus reduziert` (m390, d1440) – Zusammenfassungen.
7. Systemwerte: `node _werkstatt/werkzeuge/werte.mjs --dateien <Dateiliste aus Schritt 2, kommagetrennt> --ziel $S/werte` – Anzahl und alle Befunde.
8. Rückgabe mit Zahlen, Befunden nach Schwere und Bildpfaden.

## Schnellprüfung und Selbstprüfung
- Keine Werkzeugänderung; Belege im Scratch-Ordner.
- Mengen gezählt (je Schritt die geforderte Menge erreicht), Schreibrechte und Grenzen eingehalten (`git status --porcelain` zeigt nur erlaubte Dateien), offene Fragen gelistet.
- Jede Zahl stammt aus einer genannten Datei.

## Ausgabeformular
In `_werkstatt/pakete/E2-PRUEF-A-4.rueckgabe.md` UND als letzte Antwort, höchstens 600 Wörter (Kundschafter 1.500): GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.

=== ENDE E2-PRUEF-A-4 · BEREIT ZUR RÜCKGABE ===
