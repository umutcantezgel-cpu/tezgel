E2-PRUEF-A-2 · Prüfer · Modell: ARBEITSMODELL · Stufe 1 · Kern-Version: v2 · Umfang: Prüfstufe A für E2-ORCH-05a-N1/N2, -04-N1, -05b, -05c, -06 (Stand: Arbeitsbranch, Dev-Server 4320)
Schreibrechte (exakt): `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-A-2/**`, dazu die Rückgabe `_werkstatt/pakete/E2-PRUEF-A-2.rueckgabe.md`. Sonst nichts.

## Rollenbriefing · Prüfer
Du richtest Prüfwerkzeuge ein, führst die Prüfungen deiner Stufe aus, schreibst Tests für neue Logik und berichtest knapp mit Belegpfaden. Häufige Fehler: Einzelmessung statt Median; deuten statt berichten; über die Stufe hinaus prüfen.

## Aufgabe in einem Satz
Prüfe die committeten Orchestrator-Pakete seit 211417c (Nacharbeiten Kopf/Fuß/Register, Kundenstimme, Banner und WhatsApp-Knopf, Provider-Verlegung, 404, Weiterleitungen, Funnel-Zerlegung) nach Prüfstufe A und berichte Befunde mit Belegpfad – du behebst nichts.

## Das Projekt in fünf Sätzen (wortgleich aus KERN)
1. Wir heben die Website von Fliesenverlegung Tezgel (Deniz Tezgel, Aßlar, seit 2008 bei der Handwerkskammer Wiesbaden eingetragen) auf allen Seiten auf Spitzenniveau, ohne Texte, Logo, Rechtliches oder Funktionen zu verlieren.
2. Leitidee: Jede Seite ist ein Verlegeplan – ein Fugenraster, eine rote Laserachse, und alles fluchtet daran.
3. Besucher sind Eigentümer in Mittelhessen zwischen 35 und 75, die in wenigen Schritten die passende Leistung finden, Vertrauen prüfen, ihren Ort prüfen, den Ablauf verstehen und ein Aufmaß anfragen wollen.
4. Gestaltet wird mit Archivo und IBM Plex Mono, mit Kalk, Tinte und genau einem Rot, mit gezeichneten Verlegeplänen statt Effekten und mit Bewegung, die ausrichtet und nie federt.
5. Alles ist zugänglich nach WCAG 2.2 AA, schnell (mobil LCP ≤ 2,5 s), ohne Effektteppich und ohne Erfundenes – im Zweifel gilt Bestand vor Gestaltung.

## Kern-Auszug (unveränderlich)
## Maßstab
- Prüfstufe A: Typprüfung und Lint ohne Fehler in den Paketdateien; alle zugeordneten Funktionstests grün (bekannte fixme zählen nicht als Fehler); Bilder m390/d1440 mit Status 200 und ohne Überlauf; Textvergleich gegen e0 mit Erlaubnisliste GRÜN.
- Die Funnel-Zerlegung (E2-ORCH-06) darf kein Verhalten ändern: die Funktionstests der vier Abläufe müssen genau so grün sein wie im Ausgangswert (E0-PRUEF-04: 292 Fälle, 279 bestanden, 8 übersprungen, 5 fixme).
- Berichtet wird, was die Werkzeuge ausgeben – Zahlen, Fundstellen, Pfade; keine Deutung, ob eine Änderung gestalterisch gut ist.

## Grenzen
- Repository `/home/user/tezgel`, Branch `claude/amazing-mendel-b0g40w`. Kein `git commit`, `push`, `checkout`, `reset`, `stash`, `restore` – Git nur lesend (`status`, `diff`, `log`, `show`).
- Nur die Dateien unter „Schreibrechte“ ändern. Fehler in fremden Dateien melden (OFFENE FRAGEN), nicht beheben. Gemeinsame Dateien (`src/app/globals.css`, `src/app/layout.tsx`, `next.config.ts`, `package.json`, `src/config/*`, `_werkstatt/KERN.md`, `_werkstatt/werkzeuge/tests/*`) nie ändern – Bedarf unter GEMEINSAME DATEIEN melden.
- Kein `next build`, kein `npm run build`, kein Start oder Stopp von Servern. Server laufen bereits: Produktion http://127.0.0.1:4310 (Stand des letzten Commits), Entwicklung http://127.0.0.1:4320 (Arbeitsbaum). Ist einer nicht erreichbar: melden, nicht starten.
- Keine echten Formularsendungen, kein `npm run indexnow`, keine POST-Anfragen per curl; Browserläufe nur über die Werkzeuge in `_werkstatt/werkzeuge` (Anfragesperre aus `lib.mjs`). Keine `.env*`-Dateien lesen oder anlegen.
- UNANTASTBAR: Logo, Rechtstexte, Geschäftslogik (`src/app/api/**`, `src/lib/email/**`, Validierung, Einwilligungslogik), Verhalten der Datenmodelle (`src/config/*`), Überschriften und Fließtexte (nur Vorschlag in der Rückgabe). Mikrotexte (Knöpfe, Labels, Etiketten, Alt-Texte, Zustandsmeldungen) nur, wenn das Paket es ausdrücklich erlaubt, und jede Änderung alt → neu in der Rückgabe auflisten.
- Neue Abhängigkeiten nie im Projekt. Scratchpad für Hilfsdateien: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/<Kennung>/` (eigener Unterordner).
- Werkzeuge, Tests und `_werkstatt/texte-erlaubt.json` nicht ändern. Fällt ein Werkzeug aus: Fehlermeldung wörtlich melden.
- Parallel arbeitet ein Baumeister an `src/components/maps/**` und `src/components/legal/MapConsentGate.tsx` (unkommittiert). Befunde, die nur aus diesen Dateien stammen, getrennt unter „[BAU-04]“ melden.
- Alle Befehle aus `/home/user/tezgel`.

## Schritte
1. Erreichbarkeit 4310/4320 per curl (200). Scratch-Ordner `S=/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E2-PRUEF-A-2` anlegen. Der Dev-Server 4320 kann nach der Änderung von `next.config.ts` kurz neu starten: bei Status ≠ 200 bis zu 3 Minuten in 20-s-Schritten erneut prüfen (Monitor/Schleife mit Obergrenze), dann melden.
2. Prüfstufe A: `bash _werkstatt/werkzeuge/pruefe-a.sh E2-PRUEF-A-2 next.config.ts src/app/beratung/page.jsx src/app/blog/layout.tsx src/app/globals.css src/app/layout.tsx src/app/login/layout.tsx src/app/not-found.tsx src/app/werkstatt-schaufenster/page.dev.tsx src/components/common/CookieConsent.tsx src/components/common/FloatingWhatsAppWidget.tsx src/components/common/Footer.jsx src/components/common/Header.jsx src/components/funnels/BadProjektCheck/Schritt1.jsx src/components/funnels/BadProjektCheck/Schritt2.jsx src/components/funnels/BadProjektCheck/Schritt3.jsx src/components/funnels/BadProjektCheck/Schritt4.jsx src/components/funnels/BadProjektCheck/Zusammenfassung.jsx src/components/funnels/BadProjektCheck/index.jsx src/components/funnels/BadProjektCheck/logik.js src/components/funnels/BadProjektCheck/stile.js src/components/funnels/BadanfrageFunnel/Erfolg.jsx src/components/funnels/BadanfrageFunnel/Schritt1.jsx src/components/funnels/BadanfrageFunnel/Schritt2.jsx src/components/funnels/BadanfrageFunnel/Schritt3.jsx src/components/funnels/BadanfrageFunnel/Schritt4.jsx src/components/funnels/BadanfrageFunnel/Schritt5.jsx src/components/funnels/BadanfrageFunnel/WhatsAppGeoeffnet.jsx src/components/funnels/BadanfrageFunnel/index.jsx src/components/funnels/BadanfrageFunnel/logik.js src/components/funnels/BadanfrageFunnel/stile.js src/components/funnels/FliesenKonfigurator/Erfolg.jsx src/components/funnels/FliesenKonfigurator/OptionGroup.jsx src/components/funnels/FliesenKonfigurator/ResultSummary.jsx src/components/funnels/FliesenKonfigurator/Schritt1.jsx src/components/funnels/FliesenKonfigurator/Schritt2.jsx src/components/funnels/FliesenKonfigurator/Schritt3.jsx src/components/funnels/FliesenKonfigurator/Schritt4.jsx src/components/funnels/FliesenKonfigurator/WhatsAppGeoeffnet.jsx src/components/funnels/FliesenKonfigurator/index.jsx src/components/funnels/FliesenKonfigurator/logik.js src/components/funnels/FliesenKonfigurator/stile.js src/components/funnels/TezgelAnfrageFunnel/Erfolg.jsx src/components/funnels/TezgelAnfrageFunnel/Schritt1.jsx src/components/funnels/TezgelAnfrageFunnel/Schritt2.jsx src/components/funnels/TezgelAnfrageFunnel/Schritt3.jsx src/components/funnels/TezgelAnfrageFunnel/WhatsAppGeoeffnet.jsx src/components/funnels/TezgelAnfrageFunnel/index.tsx src/components/funnels/TezgelAnfrageFunnel/logik.ts src/components/funnels/TezgelAnfrageFunnel/stile.ts src/components/kern/Abschnitt.tsx src/components/kern/stile.ts src/components/layout/ClientWidgets.tsx src/components/layout/MobileBottomBar.tsx src/components/reviews/ReviewCard.tsx src/components/sections/CompanyHistory.jsx src/components/ui/WhatsAppLogo.tsx src/lib/whatsapp.ts -- / /kontakt /bad /bad/badanfrage /bad/projekt-check /fliesen/konfigurator /blog /login /beratung /ueber-uns /fliesen > $S/pruefe-a.log 2>&1`. Wegen `layout.tsx` laufen alle Funktionstests (15–20 Minuten). Ergebnis je Stufe (GRÜN/ROT/ÜBERSPRUNGEN) und Zahlen aus `$S/pruefe-a.log` bzw. der Zusammenfassung übernehmen; bei Testfehlern je Fall Spec, Titel, Projekt und Fehlermeldung (erste 3 Zeilen); einen fehlgeschlagenen Fall genau einmal einzeln wiederholen und beide Ergebnisse nennen.
3. Textvergleich: aus `_werkstatt/cache/texte/E2-PRUEF-A-2/texte-vergleich-gegen-e0.json` je Seitenschlüssel alle unerlaubt entfernten Spannen (Text, kontext_vor, kontext_nach) und alle entfernten Zeilen je Teil vollständig in die Rückgabe (höchstens 60 Einträge, sonst die ersten 60 und Pfad).
4. Weiterleitungen und 404: `curl -s -o /dev/null -w '%%{http_code} %%{redirect_url}\n' http://127.0.0.1:4320/bad/budgetkalkulator` und dasselbe für `/blog/barrierefreies-bad-planung-zuschuesse` und `/diese-seite-gibt-es-nicht` (erwartet 308, 308, 404) – Ausgabe wörtlich.
5. Kopfzeile ohne Überlauf (E-017): mit einem kleinen Playwright-Skript im Scratch-Ordner (Import aus `_werkstatt/werkzeuge/node_modules/@playwright/test`, nur lesend, nur 127.0.0.1:4320) `/` bei 1280×800 und 1440×900 laden und für `header[data-feste-ebene] > div` `clientWidth` und `scrollWidth` sowie die Breite des Rufnummer-Links melden; zusätzlich je ein Bildschirmfoto des Kopfes (`$S/kopf-1280.png`, `$S/kopf-1440.png`).
6. Systemwerte: `node _werkstatt/werkzeuge/werte.mjs --dateien <dieselbe Dateiliste wie in Schritt 2>` (falls die Option anders heißt: Kopfkommentar lesen) – Anzahl Befunde und alle Befunde mit Datei, Zeile, Wert.
7. Rückgabe mit Zahlen, Befunden nach Schwere und Bildpfaden.

## Schnellprüfung und Selbstprüfung
- Keine Werkzeugänderung; Belege: Logdateien, JSON- und Bildpfade im Scratch-Ordner.
- Mengen gezählt (je Schritt die geforderte Menge erreicht), Schreibrechte und Grenzen eingehalten (`git status --porcelain` zeigt nur erlaubte Dateien), offene Fragen gelistet.
- Jede Zahl in der Rückgabe stammt aus einer genannten Datei; eine Zahl stichprobenartig nachgerechnet.

## Ausgabeformular
In `_werkstatt/pakete/E2-PRUEF-A-2.rueckgabe.md` UND als letzte Antwort, höchstens 600 Wörter (Kundschafter 1.500): GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.

=== ENDE E2-PRUEF-A-2 · BEREIT ZUR RÜCKGABE ===
