E4-NACH-17-PA · Prüfer · Modell: ARBEITSMODELL · Stufe 1 · Kern-Version: v2 · Umfang: Prüfstufe A für E4-NACH-17 (nachgeladene Inseln: Schnellformular im Abschluss, Karten, Terminwahl, Rechner) und den Kartenplatz-Nachtrag E4-NACH-12
Schreibrechte (exakt): `_werkstatt/belege/e4-nach/tempo-pa/**`, dazu die Rückgabe `_werkstatt/pakete/E4-NACH-17-PA.rueckgabe.md`. Sonst nichts.

## Rollenbriefing · Prüfer
Du richtest Prüfwerkzeuge ein, führst die Prüfungen deiner Stufe aus, schreibst Tests für neue Logik und berichtest knapp mit Belegpfaden. Häufige Fehler: Einzelmessung statt Median; deuten statt berichten; über die Stufe hinaus prüfen.

## Aufgabe in einem Satz
Belege, dass die nachgeladenen Teile auf dem Server gerendert, nach dem Laden bedienbar und von den Funktionstests weiter gefunden werden – nur prüfen und berichten.

## Das Projekt in fünf Sätzen (wortgleich aus KERN)
1. Wir heben die Website von Fliesenverlegung Tezgel (Deniz Tezgel, Aßlar, seit 2008 bei der Handwerkskammer Wiesbaden eingetragen) auf allen Seiten auf Spitzenniveau, ohne Texte, Logo, Rechtliches oder Funktionen zu verlieren.
2. Leitidee: Jede Seite ist ein Verlegeplan – ein Fugenraster, eine rote Laserachse, und alles fluchtet daran.
3. Besucher sind Eigentümer in Mittelhessen zwischen 35 und 75, die in wenigen Schritten die passende Leistung finden, Vertrauen prüfen, ihren Ort prüfen, den Ablauf verstehen und ein Aufmaß anfragen wollen.
4. Gestaltet wird mit Archivo und IBM Plex Mono, mit Kalk, Tinte und genau einem Rot, mit gezeichneten Verlegeplänen statt Effekten und mit Bewegung, die ausrichtet und nie federt.
5. Alles ist zugänglich nach WCAG 2.2 AA, schnell (mobil LCP ≤ 2,5 s), ohne Effektteppich und ohne Erfundenes – im Zweifel gilt Bestand vor Gestaltung.

## Kern-Auszug (unveränderlich)
(K-013 nicht gefunden in KERN.md)

## Maßstab
- Geänderte Dateien: `src/components/ui/FinalCTA.tsx`, `src/app/(bestand)/kontakt/page.jsx`, `src/app/(bestand)/standorte/page.tsx`, `src/app/(bestand)/page.tsx`, `src/components/maps/ContactPremiumMap.tsx`, `src/components/maps/ServiceMapWrapper.tsx`. `next/dynamic` (ohne `ssr: false`) in Serverkomponenten: Server-Rendering bleibt, das Client-Paket lädt nach.
- 1. `bash _werkstatt/werkzeuge/pruefe-a.sh E4-NACH-17 'src/components/ui/FinalCTA.tsx' 'src/app/(bestand)/kontakt/page.jsx' 'src/app/(bestand)/standorte/page.tsx' 'src/app/(bestand)/page.tsx' 'src/components/maps/ContactPremiumMap.tsx' 'src/components/maps/ServiceMapWrapper.tsx' -- / /kontakt /standorte /standorte/wetzlar /leistungen` – Ergebnis je Stufe (tsc, Lint, Funktionstests laut Zuordnung – u. a. Termin, Einwilligung/Karten F-12, Rechner, Kontaktwege, Schnellformular –, Bilder, Texte).
- 2. Zusätzlich: Für `/`, `/kontakt`, `/standorte` im ausgelieferten HTML (curl gegen 4320) prüfen, dass Rechner-Überschrift, Terminwahl-Texte, Karten-Einwilligungstext und – auf `/leistungen` – das Schnellformular des Abschlusses im Server-HTML stehen (Textstichprobe, je ein Wort). Ergebnis als Tabelle.
- 3. Mobil 390 px auf `/` und `/kontakt`: Kartenplatz-Bild (Platzhalter vor Einwilligung) – Zonen auf `/kontakt` sichtbar, auf `/` keine zweite Ortsliste im Platzhalter, kein Leerfeld > 48 px; Ablage `_werkstatt/belege/e4-nach/tempo-pa/`.

## Grenzen
- Repository `/home/user/tezgel`, Branch `claude/amazing-mendel-b0g40w`. Kein `git commit`, `push`, `checkout`, `reset`, `stash`, `restore` – Git nur lesend (`status`, `diff`, `log`, `show`).
- Nur die Dateien unter „Schreibrechte“ ändern. Fehler in fremden Dateien melden (OFFENE FRAGEN), nicht beheben. Gemeinsame Dateien (`src/app/globals.css`, `src/app/(bestand)/layout.tsx`, `src/app/(bestand)/_dokument.tsx`, `next.config.ts`, `package.json`, `src/config/*`, `_werkstatt/KERN.md`, `_werkstatt/werkzeuge/tests/*`) nie ändern – Bedarf unter GEMEINSAME DATEIEN melden.
- Kein `next build`, kein `npm run build`, kein Start oder Stopp von Servern. Server laufen bereits: Produktion http://127.0.0.1:4310 (Stand des letzten Commits), Entwicklung http://127.0.0.1:4320 (Arbeitsbaum). Ist einer nicht erreichbar: melden, nicht starten.
- Keine echten Formularsendungen, kein `npm run indexnow`, keine POST-Anfragen per curl; Browserläufe nur über die Werkzeuge in `_werkstatt/werkzeuge` (Anfragesperre aus `lib.mjs`). Keine `.env*`-Dateien lesen oder anlegen.
- UNANTASTBAR: Logo, Rechtstexte, Geschäftslogik (`src/app/api/**`, `src/lib/email/**`, Validierung, Einwilligungslogik), Verhalten der Datenmodelle (`src/config/*`), Überschriften und Fließtexte (nur Vorschlag in der Rückgabe). Mikrotexte (Knöpfe, Labels, Etiketten, Alt-Texte, Zustandsmeldungen) nur, wenn das Paket es ausdrücklich erlaubt, und jede Änderung alt → neu in der Rückgabe auflisten.
- Neue Abhängigkeiten nie im Projekt. Scratchpad für Hilfsdateien: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/<Kennung>/` (eigener Unterordner).
- Keine Projektdateien ändern; keine Formularsendung; kein Server-Start.

## Schritte
1. 1. Läufe 1–3.
2. 2. Rückgabe nach Ausgabeformular.

## Schnellprüfung und Selbstprüfung
- Jedes neue oder geänderte Werkzeug einmal gegen eine echte Ansicht ausführen (Beleg: Ausgabepfad), `node --check` bzw. `bash -n` grün.
- Mengen gezählt (je Schritt die geforderte Menge erreicht), Schreibrechte und Grenzen eingehalten (`git status --porcelain` zeigt nur erlaubte Dateien), offene Fragen gelistet.
- Jede Stufe mit Zahl belegt.

## Ausgabeformular
In `_werkstatt/pakete/E4-NACH-17-PA.rueckgabe.md` UND als letzte Antwort, höchstens 600 Wörter (Kundschafter 1.500): GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.

=== ENDE E4-NACH-17-PA · BEREIT ZUR RÜCKGABE ===
