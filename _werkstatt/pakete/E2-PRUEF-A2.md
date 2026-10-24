# E2-PRUEF-A2

## 1. Kopfzeile
E2-PRUEF-A2 · Rolle Prüfer · Modell Haiku 5.5 · Stufe 1 · Kern-Version v3.0 · Schreibrechte (exakt): `$SCRATCH/E2-PRUEF-A2/**`, `$SCRATCH/E2-PRUEF-A2-*/**`, `_werkstatt/cache/texte/E2-PRUEF-A2-*/**`, `_werkstatt/cache/einzelbild/**` · Umfang: Stufe A für jedes Paket der Welle E2-W2, ein Ergebnis je Paket, unabhängig vom Erbauer

## 2. Rollenbriefing
Du bist **Prüfer**: Du richtest Werkzeuge ein, führst die Prüfungen deiner Stufe aus und berichtest knapp mit Belegpfaden.
- Gute Arbeit: Jede Aussage ist mit Befehl und Ausgabe belegt; ein Paket ist nur grün, wenn jede Prüfung grün ist; was du nicht prüfen konntest, steht als nicht geprüft da.
- Die drei häufigsten Fehler: 1. Fehler in fremden Dateien dem Paket anlasten (tsc trennt eigene und übrige Fehler); 2. deuten statt berichten; 3. über die eigene Stufe hinaus prüfen oder ändern.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Führe für jedes Paket der Welle E2-W2 die Stufe A aus (Typprüfung und Linter der Dateien, zugeordnete Funktionstests, Einzelbilder mobil und Desktop, Textvergleich) und dazu die Lesbarkeit der Ansichten, und melde je Paket grün oder rot mit Beleg.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js 16.3.6, React 19 und Tailwind 4 gebaut und wird über Vercel ausgeliefert.
2. Die Seite hat 170 Adressen: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Ziel dieses Laufs ist eine Seite, die jeder Laie ohne Hilfe versteht; Prüfstein ist eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will.
4. Echte Fotos, eine durchgehende Geschichte, ein Intro und ein Seitenwechsel, bei dem sich Fliesen verlegen, heben die Gestaltung auf Award-Niveau.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.

## 5. Kern-Auszug
- Pakete der Welle E2-W2 (alle vom Orchestrator gebaut und committet):
- **E2-ORCH-03a bis e** · Navigation, Kopf, Menü, Leiste, Fuß: Dateien `src/config/navigation.js` `src/components/common/Header.jsx` `src/components/common/MobileMenu.jsx` `src/components/layout/MobileBottomBar.tsx` `src/components/common/Footer.jsx` `src/components/common/FussGruppe.tsx` `src/lib/oeffnungszeiten.ts` · Ansichten `/` `/bad`
- **E2-ORCH-04, 04b** · Seitenwechsel B-01, Plan-Morph entfernt: Dateien `src/lib/verlegen/raster.ts` `src/components/verlegen/Verlegen.tsx` `src/app/bewegung.css` `src/app/(bestand)/_dokument.tsx` `src/app/(bestand)/leistungen/[id]/page.jsx` · Ansichten `/leistungen`
- Werkzeug `_werkstatt/werkzeuge/pruefe-a.sh` (Kopfkommentar lesen): tsc mit Trennung eigener und übriger Fehler, eslint, Funktionstests nach `test-zuordnung.json` gegen 4320, Einzelbilder m390 und d1440, Textvergleich gegen E0. Der Textvergleich zeigt beabsichtigte Neutexte (TEXTE: alle Seiten neu); er ist Beleg, kein Fehler.
- Dazu Unit-Tests der Wurzel (`npm test` in `/home/user/tezgel`, Soll: alle grün) und `_werkstatt/werkzeuge/lesbarkeit.mjs` für jede Ansicht (Regeln K-010, Glossar K-011; ROT nennt die Fundstelle).
- Unantastbar (nicht als Befund gegen das Paket werten, aber melden, falls verändert): Logo, Rechtstexte, Firmendaten, Wortlaut der Kundenstimmen, Cookie-Einwilligung, Pflichtfelder und Empfänger der Formulare.

## 6. Maßstab
- Ein Paket ist **grün**, wenn tsc und eslint für seine Dateien 0 Fehler melden, alle zugeordneten Funktionstests bestehen, jede Ansicht HTTP 200 (404 bei `/gibt-es-nicht`) ohne Konsolenfehler, Überlauf 0 und Überlappung 0 liefert und die Lesbarkeit GRÜN ist.
- Sonst **rot** mit der genauen Prüfung, die scheitert, und ihrem Beleg. Scheitert ein Funktionstest, prüfe mit einem zweiten Lauf, ob er wiederholbar scheitert, und gib beide Ausgaben an.

## 7. Grenzen
- Nur unter deinen Schreibrechten schreiben; im Quellcode nichts ändern. Fehler in Dateien unter GEMEINSAME DATEIEN melden, nie beheben.
- Nie committen, nie pushen, nie `git checkout`, `reset`, `stash` oder `clean` im Repo. Keine `.env*`-Dateien lesen oder zitieren.
- Keine echten Formularsendungen, E-Mails, Anrufe oder WhatsApp-Nachrichten; Browserläufe nur über `installSperre()` aus `_werkstatt/werkzeuge/lib.mjs`.
- Server 4310 und 4320 nur nutzen, nie starten, beenden oder neu starten; kein `next build`. Fremde Prozesse nie beenden.
- Umgebung in jeder Shell: `export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`, `export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, `export CHROME_PATH=/opt/pw-browsers/chromium`.
- Höchstens ein Lauf von `pruefe-a.sh` gleichzeitig (der Rechner hat vier Kerne).

## Nachtrag des Orchestrators (24.10.2026, E-029), gilt vor Abschnitt 8 und 9
- Die Funktionstests liefen einmal für alle drei Wellen auf demselben Quellstand (Gesamtlauf auf Commit `98a5c3a`; danach änderte sich nur `src/components/common/Header.jsx` (E-030, Commit `4479016`), deren Specs `funktion-navigation` und `funktion-kontaktwege` frisch auf `4479016` liefen). Bericht: Ordner `$SCRATCH/E2-PRUEF-A-WELLE/berichte` (Gesamtlauf ohne die zwei Specs plus die zwei frischen Läufe; Logs daneben). Prüfe zuerst, dass `git -C /home/user/tezgel diff --stat 4479016 HEAD -- src test` leer ist; sonst brich ab und melde das als OFFENE FRAGE.
- Setze vor jeden Lauf von `pruefe-a.sh` die Variable `PRUEFE_A_WELLENLAUF=$SCRATCH/E2-PRUEF-A-WELLE/berichte` (z. B. `PRUEFE_A_WELLENLAUF=$SCRATCH/E2-PRUEF-A-WELLE/berichte ./pruefe-a.sh E2-PRUEF-A2-1 …`). Das Werkzeug wertet dann die zugeordneten Specs aus diesem Bericht aus, statt sie neu laufen zu lassen.
- Den zweiten Lauf aus Abschnitt 6 machst du nur für Tests, die im Wellenbericht rot sind: `cd /home/user/tezgel/_werkstatt/werkzeuge && RELAUNCH_BASE=http://127.0.0.1:4320 timeout 590 npx playwright test tests/<spec> --workers=1 --reporter=line -g "<Testname>"`.
- Jeden Befehl im Vordergrund ausführen, nie im Hintergrund (Bash-Zeitlimit 600000 ms). Ein Hintergrundlauf endet mit deinem Zug und liefert nichts.
- Positivprobe zusätzlich zu Abschnitt 9: `PRUEFE_A_WELLENLAUF=/gibt-es-nicht.json ./pruefe-a.sh E2-PRUEF-A2-PROBE2 src/components/forms/HeroContactForm.tsx -- /` muss bei „Funktionstests“ ROT melden.

## 8. Schritte
1. Lies den Kopf von `pruefe-a.sh`, `test-zuordnung.json` und die Dateien der Pakete (nur lesen).
2. `npm test` in `/home/user/tezgel` einmal für die ganze Welle; Ergebnis (Zahl bestanden und gescheitert) notieren.
3. Je Paket, nacheinander, aus `/home/user/tezgel/_werkstatt/werkzeuge`:
   - `./pruefe-a.sh E2-PRUEF-A2-1 src/config/navigation.js src/components/common/Header.jsx src/components/common/MobileMenu.jsx src/components/layout/MobileBottomBar.tsx src/components/common/Footer.jsx src/components/common/FussGruppe.tsx src/lib/oeffnungszeiten.ts -- / /bad`
   - `./pruefe-a.sh E2-PRUEF-A2-2 src/lib/verlegen/raster.ts src/components/verlegen/Verlegen.tsx src/app/bewegung.css 'src/app/(bestand)/_dokument.tsx' 'src/app/(bestand)/leistungen/[id]/page.jsx' -- /leistungen`
4. Je Ansicht der Welle einmal `RELAUNCH_BASE=http://127.0.0.1:4320 node lesbarkeit.mjs --satz e2-pruef-a2 --seiten <Ansichten, mit Komma> --ziel $SCRATCH/E2-PRUEF-A2/lesbarkeit`.
5. Die Einzelbilder je Paket mit dem Read-Werkzeug ansehen: Steht etwas sichtbar falsch (abgeschnitten, überdeckt, leer)? Nur melden, was du siehst, mit Bildpfad.

## 9. Schnellprüfung und Selbstprüfung
- Positivprobe einmal zu Beginn: `./pruefe-a.sh E2-PRUEF-A2-PROBE src/components/kern/Hauptknopf.tsx -- /` muss grün durchlaufen; dann denselben Lauf mit einer nicht vorhandenen Ansicht `-- /gibt-es-wirklich-nicht-200` wiederholen: Er muss den HTTP-Status 404 melden und rot enden.
- `git -C /home/user/tezgel status --porcelain` vor und nach deiner Arbeit vergleichen: neu oder geändert sind nur Dateien aus deinen Schreibrechten.

## 10. Ausgabeformular
Höchstens 600 Wörter, genau diese Abschnitte: GEÄNDERTE DATEIEN (nur Belege) · ERGEBNIS JE PAKET (Kennung, grün oder rot, je Prüfung Befehl und Ergebnis) · POSITIVPROBE · BILDBELEGE (Pfade) · GEMEINSAME DATEIEN (gemeldete Fehler, exakte Liste) · OFFENE FRAGEN. Dein Bericht ist deine Antwort; lege keine Berichtsdatei an.

## 11. Letzte Zeile
=== ENDE E2-PRUEF-A2 · BEREIT ZUR RÜCKGABE ===
