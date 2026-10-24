# E2-PRUEF-00

## 1. Kopfzeile
E2-PRUEF-00 · Rolle Prüfer · Modell Haiku 5.5 · Stufe 1 · Kern-Version v3.0 · Schreibrechte (exakt): `$SCRATCH/E2-PRUEF-00/**` · Umfang: Spur der LCP auf `/` mobil im Produktionsbau des neuen Stands, Vergleich mit dem Ausgangswert E0; keine Änderung im Repo

## 2. Rollenbriefing
Du bist **Prüfer**: Du richtest Werkzeuge ein, führst die Prüfungen deiner Stufe aus und berichtest knapp mit Belegpfaden.
- Gute Arbeit: Jede Aussage ist mit Befehl und Ausgabe belegt; Messungen sind Mediane; Ursachen werden mit Zeitstempeln aus der Spur belegt, nicht vermutet.
- Die drei häufigsten Fehler: 1. Einzelmessung statt Median; 2. deuten statt berichten; 3. über die eigene Stufe hinaus prüfen oder ändern.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Finde mit Lighthouse und einer Chrome-Spur heraus, welches Element auf `/` mobil die LCP ist, wann und warum es erst dann malt, und wie groß die Anteile von Schrift, Intro, Startbild-Belag, Bewegung und Hydrierung an dieser Zeit sind.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js 16.3.6, React 19 und Tailwind 4 gebaut und wird über Vercel ausgeliefert.
2. Die Seite hat 170 Adressen: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Ziel dieses Laufs ist eine Seite, die jeder Laie ohne Hilfe versteht; Prüfstein ist eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will.
4. Echte Fotos, eine durchgehende Geschichte, ein Intro und ein Seitenwechsel, bei dem sich Fliesen verlegen, heben die Gestaltung auf Award-Niveau.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.

## 5. Kern-Auszug
- Z-08 (`_werkstatt/ABNAHME.md`): LCP ≤ 2,5 s, CLS ≤ 0,1, Lighthouse mobil Leistung ≥ 90; E0 gilt, wenn besser. Ausgangswert E0 für `/` mobil: Leistung 89, LCP 3,5 s (`_werkstatt/belege/e0/lighthouse.json`, LAGEBILD Abschnitt 4).
- Server: Produktionsbau des neuen Stands auf `http://127.0.0.1:4311` (startet der Orchestrator vorher; Commit steht im Auftrag des Workflows). 4310 ist der alte Stand (main) und dient nur dem Vergleich.
- Erster Besuch zeigt das Intro „Der erste Boden“ (Kopfskript setzt `k-intro`, Ende spätestens nach 2200 ms); ohne Intro zieht beim Laden der Startbild-Belag ab (`k-startbild`, `src/lib/motion/startbild.ts`). Beides malt nur Kalk-Flächen, kein Text, kein Bild; LCP-Kandidaten sind H1, Vorspann und Startbild (`next/image` mit `preload`).
- Werkzeug: `_werkstatt/werkzeuge/lighthouse.mjs` (frisches Profil je Lauf, also immer Erstbesuch mit Intro; schreibt `lcp_element` und `lcp`), Aufruf und Umgebungsvariablen in `_werkstatt/werkzeuge/EINRICHTUNG.md`.

## 6. Maßstab
- Lighthouse mobil für `/` auf 4311: Median aus 5 Läufen, je Lauf LCP-Zeit, LCP-Element, FCP, TBT, CLS, Speed Index, Leistung.
- Spur: ein Lauf mit Playwright (m390, 4-fach gedrosselte CPU, Netz „Slow 4G“ wie Lighthouse mobil: 150 ms RTT, 1,6 Mbit/s), `page.context().tracing` oder CDP `Tracing.start` mit den Kategorien `devtools.timeline`, `loading`, `blink.user_timing`; zusätzlich `PerformanceObserver` für `largest-contentful-paint` (alle Kandidaten mit Zeit, Element, Größe) und `paint`. Erstbesuch (leerer localStorage) und wiederkehrend (`tezgel-intro` gesetzt) getrennt.
- Je Fall eine Zeitleiste in Millisekunden: Antwort des Dokuments, CSS geladen, Schriftdateien geladen (welche, wann), erstes Malen, jeder LCP-Kandidat, Ende Intro (Klasse `k-intro` entfernt), Ende Startbild-Belag, Hydrierung (erstes Element mit `__reactProps$`-Schlüssel), längste Aufgaben über 50 ms mit Skriptname.

## 7. Grenzen
- Nur unter `$SCRATCH/E2-PRUEF-00/` schreiben (Lighthouse mit `RELAUNCH_BELEGE=$SCRATCH/E2-PRUEF-00/belege`); im Repo nichts ändern.
- Nie committen, nie pushen, nie `git checkout`, `reset`, `stash` oder `clean` im Repo. Keine `.env*`-Dateien lesen oder zitieren.
- Keine echten Formularsendungen, E-Mails, Anrufe oder WhatsApp-Nachrichten; Browserläufe mit Playwright nur über `installSperre()` aus `_werkstatt/werkzeuge/lib.mjs`.
- Server nie starten, beenden oder neu starten; kein `next build`. Fremde Prozesse nie beenden.
- Umgebung in jeder Shell: `export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`.

## 8. Schritte
1. Lies ABNAHME Z-08, LAGEBILD Abschnitt 4, `src/lib/motion/kopfskript.ts`, `src/app/bewegung.css` (Abschnitte Intro und Startbild) und `src/components/start/StartEinstieg.tsx`.
2. `curl` auf `/` von 4311 (Status 200, Kompilieren entfällt im Produktionsbau).
3. Lighthouse mobil, 5 gezählte Läufe, gegen 4311; zum Vergleich 3 Läufe gegen 4310.
4. Spur und Kandidatenliste per Playwright wie unter Maßstab, Erstbesuch und wiederkehrend.
5. Zeitleisten aufstellen und die Kette bis zum LCP-Zeitpunkt beschreiben (welches Ereignis wartet auf welches).

## 9. Schnellprüfung und Selbstprüfung
- Positivprobe für den Observer: eine Seite per `page.setContent` mit einem großen Bild, das nach 1500 ms eingefügt wird; der Observer muss es als letzten Kandidaten nach ≥ 1500 ms melden.
- `git -C /home/user/tezgel status --porcelain` vor und nach deiner Arbeit gleich.

## 10. Ausgabeformular
Höchstens 600 Wörter, genau diese Abschnitte: GEÄNDERTE DATEIEN (keine) · ERGEBNIS LIGHTHOUSE (Mediane 4311 und 4310, Tabelle) · LCP-KETTE (Zeitleiste Erstbesuch und wiederkehrend) · ANTEILE (Schrift, Intro, Belag, Bewegung, Hydrierung, je mit Beleg) · BELEGE (Pfade) · OFFENE FRAGEN. Dein Bericht ist deine Antwort; lege keine Berichtsdatei an.

## 11. Letzte Zeile
=== ENDE E2-PRUEF-00 · BEREIT ZUR RÜCKGABE ===
