E3-PRUEF-W1 · Prüfer · Modell: ARBEITSMODELL · Stufe 1 · Kern-Version: v2 · Umfang: Werkzeuglücken aus dem E2-Tor schließen (bewegung.mjs, bildsatz.mjs, server.sh) und die Änderungen an echten Läufen belegen
Schreibrechte (exakt): `_werkstatt/werkzeuge/bewegung.mjs`, `_werkstatt/werkzeuge/bildsatz.mjs`, `_werkstatt/werkzeuge/server.sh`, `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/E3-PRUEF-W1/**`, dazu die Rückgabe `_werkstatt/pakete/E3-PRUEF-W1.rueckgabe.md`. Sonst nichts.

## Rollenbriefing · Prüfer
Du richtest Prüfwerkzeuge ein, führst die Prüfungen deiner Stufe aus, schreibst Tests für neue Logik und berichtest knapp mit Belegpfaden. Häufige Fehler: Einzelmessung statt Median; deuten statt berichten; über die Stufe hinaus prüfen.

## Aufgabe in einem Satz
Behebe drei Werkzeugfehler, die das E2-Tor gezeigt hat, ohne eine Prüfung zu lockern: Namensfehler im Bewegungswerkzeug, Ersatzpfad-Lauf mit reduzierter Bewegung, blockierender Serverstart.

## Das Projekt in fünf Sätzen (wortgleich aus KERN)
1. Wir heben die Website von Fliesenverlegung Tezgel (Deniz Tezgel, Aßlar, seit 2008 bei der Handwerkskammer Wiesbaden eingetragen) auf allen Seiten auf Spitzenniveau, ohne Texte, Logo, Rechtliches oder Funktionen zu verlieren.
2. Leitidee: Jede Seite ist ein Verlegeplan – ein Fugenraster, eine rote Laserachse, und alles fluchtet daran.
3. Besucher sind Eigentümer in Mittelhessen zwischen 35 und 75, die in wenigen Schritten die passende Leistung finden, Vertrauen prüfen, ihren Ort prüfen, den Ablauf verstehen und ein Aufmaß anfragen wollen.
4. Gestaltet wird mit Archivo und IBM Plex Mono, mit Kalk, Tinte und genau einem Rot, mit gezeichneten Verlegeplänen statt Effekten und mit Bewegung, die ausrichtet und nie federt.
5. Alles ist zugänglich nach WCAG 2.2 AA, schnell (mobil LCP ≤ 2,5 s), ohne Effektteppich und ohne Erfundenes – im Zweifel gilt Bestand vor Gestaltung.

## Kern-Auszug (unveränderlich)
## Maßstab
- Keine Prüfung wird schwächer: Schwellen, Zählweisen und Befundarten bleiben gleich; nur die drei benannten Fehler werden behoben.
- Jede Änderung ist mit einem echten Lauf vorher/nachher belegt (Befehl und Ausgabe in der Rückgabe).

## Grenzen
- Repository `/home/user/tezgel`, Branch `claude/amazing-mendel-b0g40w`. Kein `git commit`, `push`, `checkout`, `reset`, `stash`, `restore` – Git nur lesend (`status`, `diff`, `log`, `show`).
- Nur die Dateien unter „Schreibrechte“ ändern. Fehler in fremden Dateien melden (OFFENE FRAGEN), nicht beheben. Gemeinsame Dateien (`src/app/globals.css`, `src/app/(bestand)/layout.tsx`, `src/app/(bestand)/_dokument.tsx`, `next.config.ts`, `package.json`, `src/config/*`, `_werkstatt/KERN.md`, `_werkstatt/werkzeuge/tests/*`) nie ändern – Bedarf unter GEMEINSAME DATEIEN melden.
- Kein `next build`, kein `npm run build`, kein Start oder Stopp von Servern. Server laufen bereits: Produktion http://127.0.0.1:4310 (Stand des letzten Commits), Entwicklung http://127.0.0.1:4320 (Arbeitsbaum). Ist einer nicht erreichbar: melden, nicht starten.
- Keine echten Formularsendungen, kein `npm run indexnow`, keine POST-Anfragen per curl; Browserläufe nur über die Werkzeuge in `_werkstatt/werkzeuge` (Anfragesperre aus `lib.mjs`). Keine `.env*`-Dateien lesen oder anlegen.
- UNANTASTBAR: Logo, Rechtstexte, Geschäftslogik (`src/app/api/**`, `src/lib/email/**`, Validierung, Einwilligungslogik), Verhalten der Datenmodelle (`src/config/*`), Überschriften und Fließtexte (nur Vorschlag in der Rückgabe). Mikrotexte (Knöpfe, Labels, Etiketten, Alt-Texte, Zustandsmeldungen) nur, wenn das Paket es ausdrücklich erlaubt, und jede Änderung alt → neu in der Rückgabe auflisten.
- Neue Abhängigkeiten nie im Projekt. Scratchpad für Hilfsdateien: `/tmp/claude-0/-home-user-tezgel/dace07c4-99ff-5ad3-8991-61c068a26ed1/scratchpad/<Kennung>/` (eigener Unterordner).
- Nur die drei Werkzeugdateien ändern; keine Testdateien, keine Quelldateien unter src/, keine Paketdateien.
- Kein Build. Server: 4310 (Produktion 5324b62) und 4320 (Dev) laufen und bleiben laufen. Für den Serverstart-Nachweis nur Port 4312 benutzen (`PORT=4312 bash _werkstatt/werkzeuge/server.sh start 5324b62`, danach `PORT=4312 … stop`); 4310 und 4320 nie stoppen.
- Es laufen gleichzeitig vier Baumeister-Pakete gegen 4320: Läufe auf 4310 ausführen, Playwright mit höchstens einem Worker.

## Schritte
1. 1. bewegung.mjs: In der Auslöser-Tabelle heißt der Eintrag `sig-ablauf`, das Register (`src/app/bewegung.css`, Kennungen in `data-motion`) nennt ihn `szene-ablauf`. Gleiche die ganze Tabelle mit den Kennungen des Registers ab (Liste aller `data-motion`-Werte und Registereinträge in bewegung.css) und berichtige nur Namensabweichungen. Nachweis: Registerlauf `node _werkstatt/werkzeuge/bewegung.mjs --modus register --base http://127.0.0.1:4310 --seite /` (genaue Optionen laut Kopf des Werkzeugs) vorher und nachher.
2. 2. bildsatz.mjs `--ersatzpfad`: Der Ersatzpfad (ohne animation-timeline und View Transitions) wird bisher mit `reducedMotion: 'reduce'` aufgenommen und ist deshalb mit dem normalen Bildsatz pixelgleich. Mit `--ersatzpfad` soll der Kontext `reducedMotion: 'no-preference'` nutzen; damit Bilder vergleichbar bleiben, nach dem Durchscrollen warten, bis alle Animationen beendet sind (`document.getAnimations()` ohne laufende, Zeitlimit 5 s, Restzahl im Bericht vermerken). Der normale Bildsatz bleibt unverändert reduziert. Kopfkommentar und Nutzungszeile anpassen. Nachweis: `--ersatzpfad --seiten /` auf 4310 in d1440 und m390; Rückgabe nennt, ob sich Bilder vom normalen Satz unterscheiden (Pixelvergleich mit einer kleinen Prüfung im Scratch, z. B. Größe und Hash) und ob Inhalte fehlen.
3. 3. server.sh `start`: Der Aufruf blockiert die aufrufende Shell, weil die Hintergrund-Unterschale (`cd … && setsid nohup …&`) die Standardausgabe des Aufrufers offen hält. Den Start so ändern, dass die Unterschale ihre Ausgabe vollständig umlenkt (z. B. `( cd "$DIR" && exec setsid nohup npx next start … > LOG 2>&1 < /dev/null ) > /dev/null 2>&1 &`) und die PID weiter stimmt (PID-Datei → Prozessgruppe für `stop`). Nachweis: `time (PORT=4312 bash _werkstatt/werkzeuge/server.sh start 5324b62 | cat)` endet nach dem Start in unter 70 s, `PORT=4312 … status` = OK, `PORT=4312 … stop` beendet den Server (Port antwortet nicht mehr), 4310 bleibt 200.
4. 4. `node --check` für die beiden .mjs-Dateien, `bash -n` für server.sh.

## Schnellprüfung und Selbstprüfung
- Läufe vorher/nachher wie in den Schritten; Ausgabeauszüge in der Rückgabe.
- Mengen gezählt (je Schritt die geforderte Menge erreicht), Schreibrechte und Grenzen eingehalten (`git status --porcelain` zeigt nur erlaubte Dateien), offene Fragen gelistet.
- git diff der drei Dateien gelesen: keine Schwelle, Zählung oder Befundart verändert.
- 4310 und 4320 antworten am Ende mit 200.

## Ausgabeformular
In `_werkstatt/pakete/E3-PRUEF-W1.rueckgabe.md` UND als letzte Antwort, höchstens 600 Wörter (Kundschafter 1.500): GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Markiere Unsicheres als OFFENE FRAGE statt zu raten, und erfülle nur deinen Auftrag.

=== ENDE E3-PRUEF-W1 · BEREIT ZUR RÜCKGABE ===
