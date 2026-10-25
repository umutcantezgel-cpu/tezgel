# E3-PRUEF-A

## 1. Kopfzeile
E3-PRUEF-A (Teile -1 und -2) · Rolle Prüfer · Modell Haiku 5.5 · Stufe A · Kern-Version v3.6 · Schreibrechte (exakt): keine Datei im Repo; Arbeitsdateien nur unter `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-PRUEF-A/**`, `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-PRUEF-A-*/**`, `_werkstatt/cache/texte/E3-PRUEF-A-*/**`, `_werkstatt/cache/einzelbild/**` · Umfang: Stufe A über den heutigen Stand der Etappe E3, 17 Prüfpakete (Teil -1: Pakete 1 bis 9 und die Lesbarkeit der zwölf Hauptansichten; Teil -2: Pakete 10 bis 17).

## 2. Rollenbriefing
Du bist **Prüfer**: Du führst die Prüfungen deiner Stufe mit den Werkzeugen der Werkstatt aus und berichtest knapp mit Belegpfaden.
- Gute Arbeit: Jede Aussage ist mit Befehl und Ausgabe belegt; ein Paket ist nur grün, wenn jede Prüfung grün ist; jedes Einzelbild hast du selbst angesehen (Read auf die Bilddatei); was du nicht prüfen konntest, steht als nicht geprüft da.
- Die drei häufigsten Fehler: 1. Fehler in fremden Dateien dem Paket anlasten (tsc trennt eigene und übrige Fehler); 2. „sieht gut aus“ ohne das Bild angesehen zu haben; 3. Werkzeugprobleme (Zeitüberschreitung, falsche Adresse) als Befund melden statt als OFFENE FRAGE.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Führe für jedes Prüfpaket deines Teils `pruefe-a.sh` aus (Typprüfung und Linter der Dateien, zugeordnete Funktionstests aus dem Gesamtlauf, Einzelbilder mobil und Desktop, Textvergleich), sieh dir die Bilder an und melde je Paket grün oder rot mit Beleg; Teil -1 misst zusätzlich die Lesbarkeit der zwölf Hauptansichten.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel (Inhaber Deniz Tezgel, Hohwardstraße 14, 35614 Aßlar), gebaut mit Next.js 16.3.6, React 19 und Tailwind 4.
2. Etappe E3 hat die zwölf Hauptansichten (`_werkstatt/HAUPTANSICHTEN.json`) auf Vorlagen umgestellt (Prinzip „Ruhe“, K-016), neun große Momente gebaut, Formular- und Suchmaschinentexte in Alltagssprache gebracht und den Seitenwechsel mit Logo erneuert.
3. Prüfstein ist eine 72-jährige Kundin am Handy, die ihre Wanne gegen eine bodengleiche Dusche tauschen will.
4. Alle Adressen, Funktionen, Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten (unantastbar: Logo, Rechtstexte, Firmendaten, Wortlaut der Kundenstimmen, Cookie-Einwilligung, Pflichtfelder und Empfänger der Formulare).
5. Die Funktionstests liefen einmal für den ganzen Stand gegen den Entwicklungsserver (Gesamtlauf, JSON-Bericht in `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-PRUEF-A-WELLE/berichte/`, Stand in `stand.txt`); `pruefe-a.sh` wertet daraus die zugeordneten Specs aus.

## 5. Kern-Auszug
- Werkzeug `_werkstatt/werkzeuge/pruefe-a.sh` (Kopfkommentar lesen): tsc mit Trennung eigener und übriger Fehler, eslint, Funktionstests nach `test-zuordnung.json` (hier aus dem Gesamtlauf über `PRUEFE_A_WELLENLAUF`), Einzelbilder m390 und d1440 je Ansicht, Textvergleich gegen E0 (zeigt beabsichtigte Neutexte; wirkt nicht auf das Ergebnis). Höchstens zwei Läufe gleichzeitig (Semaphor im Werkzeug); der andere Prüfer läuft parallel, starte deine Läufe nacheinander.
- Lesbarkeit: `_werkstatt/werkzeuge/lesbarkeit.mjs` (K-010, Glossar K-011; ROT nennt die Fundstelle), Schwellen je Seitenart in `HAUPTANSICHTEN.json` (erzaehl, ort, arbeit Flesch ≥ 60; wissen ≥ 50).
- Ein Paket ist **grün**, wenn tsc und eslint für seine Dateien 0 Fehler melden, alle zugeordneten Funktionstests im Gesamtlauf bestanden sind, jede Ansicht HTTP 200 ohne Konsolenfehler, Überlauf 0 und Überlappung 0 liefert und die Bilder nichts sichtbar Falsches zeigen (abgeschnitten, überdeckt, leer, doppelt).

## 6. Maßstab
- Je Paket das Ergebnis von `pruefe-a.sh` (Datei `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-PRUEF-A-<n>/pruefe-a.txt`) mit den Zahlen: tsc eigene Fehler, eslint Fehler, Funktionstests erwartet/unerwartet/fehlend, je Ansicht und Gerät HTTP, Konsole, Überlauf, Überlappung.
- Scheitert ein zugeordneter Test im Gesamtlauf, laufe ihn einmal einzeln nach: `cd /home/user/tezgel/_werkstatt/werkzeuge && RELAUNCH_BASE=http://127.0.0.1:4320 timeout 590 npx playwright test -c playwright.config.mjs tests/<spec> --workers=1 --reporter=line -g "<Testname>"`, und gib beide Ergebnisse an.
- Teil -1: Lesbarkeit der zwölf Hauptansichten GRÜN je Seite oder ROT mit Fundstelle.

## 7. Grenzen
- Keine Datei im Repo anlegen oder ändern; nie committen, pushen, `git checkout`, `reset`, `stash` oder `clean`. Keine `.env*`-Dateien lesen.
- Server 4320 nur nutzen, nie starten, beenden oder neu starten; Port 4311 nicht benutzen; kein `next build`.
- Keine echten Formularsendungen, Anrufe oder Nachrichten; Browserläufe nur über die Werkzeuge (sie sperren fremde Anfragen).
- Jeden Befehl im Vordergrund ausführen, nie im Hintergrund (Bash-Zeitlimit 600000 ms).
- Arbeitsdateien nur unter den absoluten Pfaden aus Abschnitt 1, nie unter `/E3-…` im Wurzelverzeichnis.

## 8. Schritte
Vorab in jeder Shell: `cd /home/user/tezgel/_werkstatt/werkzeuge && export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad RELAUNCH_BASE=http://127.0.0.1:4320 RELAUNCH_SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome WELLE=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-PRUEF-A-WELLE/berichte`.
1. Positivprobe (nur Teil -1): `PRUEFE_A_WELLENLAUF=$WELLE ./pruefe-a.sh E3-PRUEF-A-PROBE src/components/kern/Hauptknopf.tsx -- /gibt-es-wirklich-nicht-200` muss den HTTP-Status 404 melden und rot enden.
2. `npm test` in `/home/user/tezgel` einmal (nur Teil -1); Zahl bestanden und gescheitert notieren.
3. Je Paket deines Teils, nacheinander, aus `/home/user/tezgel/_werkstatt/werkzeuge`:
   - **1 Startseite:** `PRUEFE_A_WELLENLAUF=$WELLE ./pruefe-a.sh E3-PRUEF-A-1 src/inhalte/start.ts 'src/app/(bestand)/page.tsx' -- /`
   - **2 Bad:** `PRUEFE_A_WELLENLAUF=$WELLE ./pruefe-a.sh E3-PRUEF-A-2 src/inhalte/bad.ts 'src/app/(bestand)/bad/page.jsx' -- /bad`
   - **3 Badsanierung:** `PRUEFE_A_WELLENLAUF=$WELLE ./pruefe-a.sh E3-PRUEF-A-3 src/inhalte/bad-badsanierung.ts 'src/app/(bestand)/bad/badsanierung/page.jsx' -- /bad/badsanierung`
   - **4 Barrierefreies Bad:** `PRUEFE_A_WELLENLAUF=$WELLE ./pruefe-a.sh E3-PRUEF-A-4 src/inhalte/barrierefreies-bad.ts 'src/app/(bestand)/bad/barrierefreies-bad/page.jsx' -- /bad/barrierefreies-bad`
   - **5 Leistungen:** `PRUEFE_A_WELLENLAUF=$WELLE ./pruefe-a.sh E3-PRUEF-A-5 src/inhalte/leistungen.ts 'src/app/(bestand)/leistungen/page.jsx' -- /leistungen`
   - **6 Fliesen:** `PRUEFE_A_WELLENLAUF=$WELLE ./pruefe-a.sh E3-PRUEF-A-6 src/inhalte/fliesen.ts 'src/app/(bestand)/fliesen/page.jsx' -- /fliesen`
   - **7 Balkon und Terrasse:** `PRUEFE_A_WELLENLAUF=$WELLE ./pruefe-a.sh E3-PRUEF-A-7 src/inhalte/balkon-terrasse.ts 'src/app/(bestand)/balkon-terrasse/page.jsx' -- /balkon-terrasse`
   - **8 Referenzen:** `PRUEFE_A_WELLENLAUF=$WELLE ./pruefe-a.sh E3-PRUEF-A-8 src/inhalte/referenzen.ts 'src/app/(bestand)/referenzen/page.jsx' src/components/sections/ReviewsSection.jsx -- /referenzen`
   - **9 Über uns:** `PRUEFE_A_WELLENLAUF=$WELLE ./pruefe-a.sh E3-PRUEF-A-9 src/inhalte/ueber-uns.ts 'src/app/(bestand)/ueber-uns/page.jsx' -- /ueber-uns`
   - **10 Kontakt:** `PRUEFE_A_WELLENLAUF=$WELLE ./pruefe-a.sh E3-PRUEF-A-10 src/inhalte/kontakt.ts 'src/app/(bestand)/kontakt/page.jsx' src/components/contact/DirectContactCard.tsx src/components/maps/ContactPremiumMap.tsx -- /kontakt`
   - **11 Ortsseiten:** `PRUEFE_A_WELLENLAUF=$WELLE ./pruefe-a.sh E3-PRUEF-A-11 src/inhalte/orte.ts 'src/app/(bestand)/standorte/[stadt]/page.tsx' -- /standorte/wetzlar /standorte/limburg`
   - **12 Ratgeber:** `PRUEFE_A_WELLENLAUF=$WELLE ./pruefe-a.sh E3-PRUEF-A-12 src/inhalte/blog.ts 'src/app/(bestand)/blog/page.jsx' src/components/blog/BlogFilter.jsx src/components/blog/BlogCard.jsx -- /blog`
   - **13 Vorlagen und Teile:** `PRUEFE_A_WELLENLAUF=$WELLE ./pruefe-a.sh E3-PRUEF-A-13 src/components/vorlagen/ArbeitsSeite.tsx src/components/vorlagen/ErzaehlSeite.tsx src/components/vorlagen/OrtsSeite.tsx src/components/vorlagen/WissensSeite.tsx src/components/vorlagen/inhalt.ts src/components/vorlagen/teile/Ablauf.tsx src/components/vorlagen/teile/Beleg.tsx src/components/vorlagen/teile/Einsatzorte.tsx src/components/vorlagen/teile/Einstieg.tsx src/components/vorlagen/teile/EinstiegMitte.tsx src/components/vorlagen/teile/EinstiegPlanblatt.tsx src/components/vorlagen/teile/Fotos.tsx src/components/vorlagen/teile/Lage.tsx src/components/vorlagen/teile/Schritt.tsx src/components/vorlagen/teile/Stimmen.tsx src/components/vorlagen/teile/Tun.tsx src/components/vorlagen/teile/Wissen.tsx -- /bad /fliesen /standorte/wetzlar /kontakt`
   - **14 Große Momente:** `PRUEFE_A_WELLENLAUF=$WELLE ./pruefe-a.sh E3-PRUEF-A-14 src/components/momente/formatregler/Formatregler.tsx src/components/momente/formatregler/Wand.tsx src/components/momente/formatregler/geometrie.ts src/components/momente/galerie-filter/GalerieFilter.tsx src/components/momente/galerie-filter/GalerieWahl.tsx src/components/momente/galerie-filter/daten.ts src/components/momente/gefaelle-balkon/GefaelleBalkon.tsx src/components/momente/gefaelle-balkon/geometrie.ts src/components/momente/gefaelle-dusche/GefaelleDusche.tsx src/components/momente/gefaelle-dusche/geometrie.ts src/components/momente/karte/Einsatzkarte.tsx src/components/momente/karte/geometrie.ts src/components/momente/schichten/Schichten.tsx src/components/momente/schichten/Zeichnung.tsx src/components/momente/schichten/daten.ts src/components/momente/verband/VerbandProbe.tsx src/components/momente/verband/geometrie.ts src/components/momente/vorher-nachher/Regler.tsx src/components/momente/vorher-nachher/VorherNachher.tsx src/components/momente/vorher-nachher/teilung.ts src/components/momente/weg/Weg.tsx -- /bad/barrierefreies-bad /balkon-terrasse /fliesen /referenzen`
   - **15 Werkzeugtexte:** `PRUEFE_A_WELLENLAUF=$WELLE ./pruefe-a.sh E3-PRUEF-A-15 src/components/contact/BookingCalendar.tsx src/components/forms/LeadQuickForm.tsx src/components/funnels/BadProjektCheck/Schritt1.jsx src/components/funnels/BadProjektCheck/Schritt2.jsx src/components/funnels/BadProjektCheck/Schritt3.jsx src/components/funnels/BadProjektCheck/Schritt4.jsx src/components/funnels/BadProjektCheck/Zusammenfassung.jsx src/components/funnels/BadProjektCheck/index.jsx src/components/funnels/BadanfrageFunnel/Erfolg.jsx src/components/funnels/BadanfrageFunnel/Schritt1.jsx src/components/funnels/BadanfrageFunnel/Schritt2.jsx src/components/funnels/BadanfrageFunnel/Schritt3.jsx src/components/funnels/BadanfrageFunnel/Schritt4.jsx src/components/funnels/BadanfrageFunnel/Schritt5.jsx src/components/funnels/BadanfrageFunnel/WhatsAppGeoeffnet.jsx src/components/funnels/BadanfrageFunnel/index.jsx src/components/funnels/FliesenKonfigurator/Erfolg.jsx src/components/funnels/FliesenKonfigurator/OptionGroup.jsx src/components/funnels/FliesenKonfigurator/ResultSummary.jsx src/components/funnels/FliesenKonfigurator/Schritt1.jsx src/components/funnels/FliesenKonfigurator/Schritt2.jsx src/components/funnels/FliesenKonfigurator/Schritt3.jsx src/components/funnels/FliesenKonfigurator/Schritt4.jsx src/components/funnels/FliesenKonfigurator/WhatsAppGeoeffnet.jsx src/components/funnels/FliesenKonfigurator/index.jsx src/components/funnels/TezgelAnfrageFunnel/Erfolg.jsx src/components/funnels/TezgelAnfrageFunnel/Platzhalter.tsx src/components/funnels/TezgelAnfrageFunnel/Schritt1.jsx src/components/funnels/TezgelAnfrageFunnel/Schritt2.jsx src/components/funnels/TezgelAnfrageFunnel/Schritt3.jsx src/components/funnels/TezgelAnfrageFunnel/WhatsAppGeoeffnet.jsx src/components/funnels/TezgelAnfrageFunnel/index.tsx src/components/funnels/TezgelAnfrageFunnel/logik.ts src/components/funnels/TezgelAnfrageFunnel/stile.ts src/components/maps/ServiceMapWrapper.tsx src/components/pricing/PricingCalculator.tsx src/lib/formulare/useAnfrageFunnel.ts src/lib/maps/getMapEmbedUrl.ts -- /kontakt /fliesen/konfigurator /bad/projekt-check /standorte`
   - **16 Suchmaschinen-Angaben:** `PRUEFE_A_WELLENLAUF=$WELLE ./pruefe-a.sh E3-PRUEF-A-16 src/lib/beschreibung.ts src/lib/metadata.ts src/lib/schema.ts src/components/seo/SeitenDaten.tsx src/inhalte/meta/bauteile.ts src/inhalte/meta/beispiele.ts src/inhalte/meta/blog.ts src/inhalte/meta/fliesen.ts src/inhalte/meta/index.ts src/inhalte/meta/leistungen.ts src/inhalte/meta/seiten.ts -- / /termin /standorte`
   - **17 Seitenwechsel und Kernbausteine:** `PRUEFE_A_WELLENLAUF=$WELLE ./pruefe-a.sh E3-PRUEF-A-17 src/components/verlegen/Verlegen.tsx src/lib/verlegen/raster.ts src/components/kern/Karussell.tsx src/components/kern/Glasbild.tsx src/app/bewegung.css -- / /ueber-uns`
4. Je Paket die Einzelbilder (Pfade in der Ausgabe von `pruefe-a.sh`) mit dem Read-Werkzeug ansehen: Steht etwas sichtbar falsch? Nur melden, was du siehst, mit Bildpfad.
5. Nur Teil -1: `node lesbarkeit.mjs --satz e3-pruef-a --seiten /,/bad,/bad/badsanierung,/bad/barrierefreies-bad,/leistungen,/fliesen,/balkon-terrasse,/referenzen,/ueber-uns,/kontakt,/standorte/wetzlar,/blog --ziel /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/E3-PRUEF-A/lesbarkeit`.

## 9. Schnellprüfung und Selbstprüfung
- `git -C /home/user/tezgel status --porcelain` vor und nach deiner Arbeit gleich.
- Jede Zahl im Bericht stammt aus einer Werkzeugausgabe, deren Pfad du nennst.

## 10. Ausgabeformular
Höchstens 700 Wörter, genau diese Abschnitte: ERGEBNIS JE PAKET (Kennung, grün oder rot, je Prüfung Ergebnis und Belegpfad) · POSITIVPROBE (Teil -1) · LESBARKEIT (Teil -1, je Seite) · BILDBEFUNDE (nummeriert: Paket, Ansicht, Gerät, was ist falsch, Bildpfad) · GEMEINSAME DATEIEN (Fehler in Dateien außerhalb der Pakete) · OFFENE FRAGEN. Dein Bericht ist deine Antwort; lege keine Berichtsdatei im Repo an.

## 11. Letzte Zeile
=== ENDE E3-PRUEF-A-<Teil> · BEREIT ZUR RÜCKGABE ===
