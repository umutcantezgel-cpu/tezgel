# E3-PRUEF-B

## 1. Kopfzeile
E3-PRUEF-B (Teile -1, -2, -3) · Rolle Prüfer · Modell Haiku 5.5 · Stufe B · Kern-Version v3.6 · Schreibrechte (exakt): `_werkstatt/belege/e3/**` (nur Zusammenfassungen als JSON und Markdown, keine Bilder, keine Rohberichte), `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-PRUEF-B/**` · Umfang: alle Prüfungen der Stufe B (ABNAHME.md, Prüfmatrix Spalte „Stufe B je Etappe“) für die zwölf Hauptansichten auf dem Produktionsbau des Stands, den der Auftrag nennt, gegen die Ausgangswerte E0.
- **Teil -1 Darstellung:** Bildsatz zehn Geräte, Konsole, große Systemschrift, Erstes Bild.
- **Teil -2 Zugang, Text, Bewegung, Werte, Adressen:** axe mit Zuständen, Lesbarkeit, reduzierte Bewegung und Register, Einzelbilder der großen Momente, Bildrate, freie Werte der Etappe, Adressen und Links.
- **Teil -3 Leistung:** Reaktion und Lighthouse, zuletzt und allein.

## 2. Rollenbriefing
Du bist **Prüfer**: Du misst mit den Werkzeugen der Werkstatt und berichtest Zahlen mit Belegpfad, ohne Deutung.
- Gute Arbeit: Jede Zahl stammt aus einem Werkzeuglauf mit Pfad; neben jedem Wert steht der E0-Wert und das Budget; jedes Bild, über das du urteilst, hast du selbst angesehen (Read auf die Bilddatei).
- Die drei häufigsten Fehler: 1. Werkzeugprobleme (Zeitüberschreitung, hängender Bildoptimierer, falsche Adresse) als Befund an der Seite melden statt als OFFENE FRAGE; 2. zwei Browser-Werkzeuge gleichzeitig laufen lassen (verfälscht Leistungswerte); 3. Rohberichte oder Bilder ins Repo schreiben.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Miss auf dem Produktionsbau (Port 4311) die Prüfungen deines Teils für die zwölf Hauptansichten aus `_werkstatt/HAUPTANSICHTEN.json` und stelle sie den Ausgangswerten E0 und den Budgets gegenüber.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel (Inhaber Deniz Tezgel, Hohwardstraße 14, 35614 Aßlar), gebaut mit Next.js 16.3.6, React 19 und Tailwind 4.
2. Etappe E3 hat die zwölf Hauptansichten auf Vorlagen umgestellt (Prinzip „Ruhe“, K-016), neun große Momente gebaut, Texte in Alltagssprache gebracht und den Seitenwechsel mit Logo erneuert (B-01).
3. Prüfstein ist eine 72-jährige Kundin am Handy, die ihre Wanne gegen eine bodengleiche Dusche tauschen will.
4. Alle Adressen, Funktionen, Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten (unantastbar: Logo, Rechtstexte, Firmendaten, Wortlaut der Kundenstimmen, Cookie-Einwilligung, Pflichtfelder und Empfänger der Formulare).
5. Die Funktionssuite gegen den Produktionsbau, Reinraum und Linkprüfung der Suchmaschinen-Angaben liegen schon vor (`_werkstatt/ENTSCHEIDUNGEN.md` E-054, E-055); sie sind nicht Teil dieses Pakets.

## 5. Kern-Auszug
- Kriterien Z-03 bis Z-09, Z-12 bis Z-14 (`_werkstatt/ABNAHME.md`). Budgets mobil (K-013), Median aus mindestens drei Läufen: LCP ≤ 2,5 s, CLS ≤ 0,1, Reaktion (INP) ≤ 200 ms, Lighthouse mobil Leistung ≥ 90, Zugänglichkeit ≥ 95, Best Practices ≥ 95, SEO 100; der E0-Wert gilt, wenn er besser ist.
- Ausgangswerte E0: `_werkstatt/belege/e0/` (`STUFE-B.md`, `lighthouse.json`, `axe.json`, `bildsatz.json`, `erstes-bild.json`, `lesbarkeit.json`, `konsole.json`, `links.json`). Werte E2 (nur `/`): `_werkstatt/belege/e2/`.
- Geräte (K-013, `HAUPTANSICHTEN.json`): m360, m390, m430, q844, t768, t1024, d1280, d1440, d1920, d2560. Große Systemschrift: 200 % auf m360, m390, m430 (`einzelbild.mjs --schrift 200`).
- Der erste Besuch zeigt das Intro; die Werkzeuge setzen den Intro-Speicher, außer `lighthouse.mjs` (frisches Profil je Lauf).
- Werkzeuge in `_werkstatt/werkzeuge` mit Kopfkommentar als Nutzungsanleitung: `bildsatz.mjs`, `einzelbild.mjs`, `erstesbild.mjs`, `axe.mjs`, `lesbarkeit.mjs`, `bewegung.mjs`, `werte.mjs`, `adressen.mjs`, `reaktion.mjs`, `lighthouse.mjs`.

## 6. Maßstab
Jede Zahl stammt aus einem Werkzeuglauf mit Pfad. Bildsatz und Schrift 200 %: Überlauf 0 und Überlappung 0 je Seite und Gerät. Erstes Bild: 5 von 5 je Seite und Gerät. Konsole: 0 Fehler. axe: 0 kritisch, 0 ernst. Lesbarkeit GRÜN je Seite. Reduzierte Bewegung: 0 Befunde. Bildrate: ≤ 5 % verworfene Bilder. Werte: 0 Funde. Adressen: alle aus E0 mit 200 oder 308, 0 kaputte Links. Reaktion: höchster Median ≤ 200 ms. Lighthouse: Median aus 3 Läufen mobil und 3 Läufen Desktop je Seite.

## 7. Grenzen
- Nur unter den Schreibrechten schreiben; im Quellcode nichts ändern. Fehler in Dateien unter GEMEINSAME DATEIEN melden, nie beheben.
- Nie committen, nie pushen, nie `git checkout`, `reset`, `stash` oder `clean` im Repo. Keine `.env*`-Dateien lesen.
- Keine echten Formularsendungen, Anrufe oder Nachrichten; Browserläufe nur über die Werkzeuge.
- Server 4311 (Produktionsbau) nur nutzen, nie starten, beenden oder neu starten; 4320 nicht benutzen; kein `next build`.
- Jeden Befehl im Vordergrund ausführen (Bash-Zeitlimit 600000 ms; lange Läufe mit `timeout 590` je Seite oder Gerätegruppe in Teile zerlegen). Rechenintensives strikt nacheinander, nie zwei Browser-Werkzeuge gleichzeitig.
- Hängt der Bildoptimierer (Bilder antworten nicht, `load` kommt nie, E-034), Lauf abbrechen und als OFFENE FRAGE melden; den Server nicht neu starten.
- Umgebung in jeder Shell: `cd /home/user/tezgel/_werkstatt/werkzeuge && export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad RELAUNCH_SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad RELAUNCH_BASE=http://127.0.0.1:4311 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome Z=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-PRUEF-B HA=/,/bad,/bad/badsanierung,/bad/barrierefreies-bad,/leistungen,/fliesen,/balkon-terrasse,/referenzen,/ueber-uns,/kontakt,/standorte/wetzlar,/blog`.

## 8. Schritte
Zuerst `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4311/` (200) und `…:4311/gibt-es-nicht` (404).

**Teil -1 Darstellung**
1. Bildsatz: `node bildsatz.mjs --satz e3 --seiten $HA,/gibt-es-nicht --geraete alle --base http://127.0.0.1:4311 --ziel $Z/bildsatz` (bei Zeitlimit in Gruppen von drei Seiten); Kennzahlen je Seite und Gerät nach `_werkstatt/belege/e3/bildsatz.json`.
2. Konsole: `node einzelbild.mjs --base http://127.0.0.1:4311 --seite <seite> --geraete alle --ziel $Z/einzel/<slug>` je Hauptansicht; Konsolenfehler je Seite und Gerät nach `_werkstatt/belege/e3/konsole.json`.
3. Große Schrift: `node einzelbild.mjs --base http://127.0.0.1:4311 --seite <seite> --geraete m360,m390,m430 --schrift 200 --voll --ziel $Z/schrift200/<slug>` je Hauptansicht; Kennzahlen nach `_werkstatt/belege/e3/schrift200.json`. Sieh die ganzseitigen m390-Bilder in Ausschnitten an (Read) und melde nur, was sichtbar abgeschnitten, überdeckt oder leer ist, mit Bildpfad.
4. Erstes Bild: `node erstesbild.mjs --satz e3 --hauptansichten --geraete alle --ziel /home/user/tezgel/_werkstatt/belege/e3` (Kopf lesen; Ergebnis je Seite und Gerät, 5 von 5).
5. Zusammenfassung `_werkstatt/belege/e3/STUFE-B-1.md`: je Prüfung eine Tabelle Seite × Gerät oder Seite mit Wert, E0-Wert, Budget, erfüllt ja oder nein.

**Teil -2 Zugang, Text, Bewegung, Werte, Adressen**
1. axe: `node axe.mjs --satz e3 --seiten $HA,/gibt-es-nicht --zustaende --ziel /home/user/tezgel/_werkstatt/belege/e3`; Befunde je Schwere, Seite und Zustand.
2. Lesbarkeit: `node lesbarkeit.mjs --satz e3 --seiten $HA,/gibt-es-nicht --ziel /home/user/tezgel/_werkstatt/belege/e3`.
3. Bewegung: `node bewegung.mjs --modus reduziert --seite <seite> --base http://127.0.0.1:4311 --ziel $Z/bewegung-reduziert/<slug>` je Hauptansicht und `--modus register --seite /`; Befunde nach `_werkstatt/belege/e3/bewegung-reduziert.json`. Einzelbilder der großen Momente auf ihren Seiten: `--modus einzelbilder --ansicht m390` mit `--seite /bad/barrierefreies-bad --kennung gefaelle-dusche`, `--seite /balkon-terrasse --kennung gefaelle-balkon`, `--seite /fliesen --kennung verband`, `--seite /ueber-uns --kennung karte`, `--seite / --kennung verlegen` (`weg` steht auf keiner Seite, E-048; die Karte steht auf `/ueber-uns`); meldet das Werkzeug für eine Kennung „keine Bilder“ oder keinen Auslöser, steht das als OFFENE FRAGE. Bildrate: `--modus bildrate --seite / --ansicht m390` und `--seite /referenzen` (Anteil verworfener Bilder).
4. Werte: `node werte.mjs --dateien <Liste> --ziel $Z/werte` mit allen Dateien aus `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/e3-pruef-a-pakete.json` (Feld `dateien` aller Pakete, durch Komma getrennt); Zahl der Funde je Art.
5. Adressen und Links: `node adressen.mjs --satz e3 --ziel $Z/adressen` (Kopf lesen); Zahl der Adressen je Status, kaputte Links, Seiten ohne genau eine H1, Titel, Beschreibung oder Canonical; Vergleich mit `_werkstatt/adressen-e0.csv`. Zusammenfassung nach `_werkstatt/belege/e3/adressen.json`.
6. Zusammenfassung `_werkstatt/belege/e3/STUFE-B-2.md` wie oben.

**Teil -3 Leistung (zuletzt, allein)**
1. Reaktion: `node reaktion.mjs --satz e3 --seiten /,/bad,/kontakt,/referenzen --laeufe 3 --base http://127.0.0.1:4311 --ziel /home/user/tezgel/_werkstatt/belege/e3`; Median je Handlung und Seite.
2. Lighthouse: `RELAUNCH_BELEGE=$Z/lh-belege node lighthouse.mjs --satz e3 --hauptansichten --laeufe 3 --formen mobil --base http://127.0.0.1:4311`, danach `--laeufe 3 --formen desktop --zusammenfuehren` (Kopf lesen; je Seite ein Aufruf, falls das Zeitlimit nicht reicht, dann `--seiten <seite>` und `--zusammenfuehren`). Zusammenfassung nach `_werkstatt/belege/e3/lighthouse.json` (keine Rohberichte ins Repo); je Seite Median Leistung, Zugänglichkeit, Best Practices, SEO, LCP mit LCP-Element, CLS, TBT, mobil und Desktop, neben E0.
3. Zusammenfassung `_werkstatt/belege/e3/STUFE-B-3.md` wie oben.

## 9. Schnellprüfung und Selbstprüfung
- Positivprobe zu Beginn (jeder Teil): `node einzelbild.mjs --base http://127.0.0.1:4311 --seite /gibt-es-wirklich-nicht-200 --ansichten m390 --ziel $Z/probe` muss mit Exit 1 enden (HTTP 404); Teil -3 zusätzlich `node reaktion.mjs --probe --laeufe 1` mit Exit 0.
- Jede Zahl in deiner Zusammenfassung hat ihre Quelldatei. `git -C /home/user/tezgel status --porcelain` zeigt nur Dateien aus deinen Schreibrechten.

## 10. Ausgabeformular
Höchstens 700 Wörter, genau diese Abschnitte: GEÄNDERTE DATEIEN · ERGEBNIS JE PRÜFUNG (Befehl, Wert, E0, Budget, erfüllt; je Seite, wo es Seitenwerte gibt) · POSITIVPROBE · BILDBEFUNDE (nummeriert: Seite, Gerät, was ist falsch, Bildpfad) · GEMEINSAME DATEIEN · OFFENE FRAGEN. Dein Bericht ist deine Antwort.

## 11. Letzte Zeile
=== ENDE E3-PRUEF-B-<Teil> · BEREIT ZUR RÜCKGABE ===
