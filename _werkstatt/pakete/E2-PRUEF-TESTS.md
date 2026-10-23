# E2-PRUEF-TESTS

## 1. Kopfzeile
E2-PRUEF-TESTS · Rolle Prüfer · Modell Haiku 5.5 · Stufe 2 · Kern-Version v3.0 · Schreibrechte (exakt): `_werkstatt/werkzeuge/tests/funktion-hero-kontakt.spec.mjs`, `_werkstatt/werkzeuge/tests/funktion-preisrechner.spec.mjs`, `_werkstatt/werkzeuge/tests/funktion-express-funnel.spec.mjs`, `_werkstatt/werkzeuge/tests/funktion-navigation.spec.mjs`, `_werkstatt/werkzeuge/tests/funktion-einwilligung.spec.mjs`, `$SCRATCH/E2-PRUEF-TESTS/**` · Umfang: fünf Funktionsspecs, die Orte auf der Startseite oder die alte Navigation voraussetzen

## 2. Rollenbriefing
Du bist **Prüfer**: Du schreibst Tests für neue Logik nach Muster der vorhandenen Tests (Rolle Prüfer, Stufe 2).
- Gute Arbeit: Jeder Test prüft eine Eigenschaft aus der Spezifikation, nicht die Umsetzung; jeder Test scheitert nachweislich, wenn die Eigenschaft verletzt ist (Gegenprobe mit absichtlich falschem Wert, danach zurück); die Tests laufen schnell und ohne Netz.
- Die drei häufigsten Fehler: 1. Tests, die nur die aktuelle Umsetzung abschreiben, statt die Spezifikation zu prüfen; 2. fehlende Gegenprobe, sodass ein Test nie scheitern kann; 3. fremde Dateien ändern, auch die geprüfte Logik.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Passe die Funktionsspecs an die neuen Orte der Funktionen an (neue Startseite, neue Navigation, neue 404), ohne eine Funktion aus der Prüfung zu verlieren, und zeige je geänderter Prüfung, dass sie grün ist und mit einem absichtlich falschen Wert scheitert.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js 16.3.6, React 19 und Tailwind 4 gebaut und wird über Vercel ausgeliefert.
2. Die Seite hat 170 Adressen: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Ziel dieses Laufs ist eine Seite, die jeder Laie ohne Hilfe versteht; Prüfstein ist eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will.
4. Echte Fotos, eine durchgehende Geschichte, ein Intro mit sich zeichnendem Logo und ein Seitenwechsel, bei dem sich Fliesen verlegen, heben die Gestaltung auf Award-Niveau.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.

## 5. Kern-Auszug
- Funktionsliste mit alten und neuen Orten: `_werkstatt/LAGEBILD.md` Abschnitt 3 (F-01 bis F-20). Keine Funktion darf aus der Prüfung fallen; nur ihr Ort ändert sich (Z-02).
- Neue Startseite `/` (`src/app/(bestand)/page.tsx`, `src/components/start/*`): Erster Bildschirm mit Hauptknopf „Termin vor Ort anfragen“ zum Anker `#termin`; Abschnitt „Termin vor Ort anfragen“ (H2 `id="termin"`) mit dem Formular `HeroContactForm` (Logik, Felder, IDs und Texte unverändert); drei Kundenstimmen wörtlich aus `src/config/reviews.js` (Kennungen elke-s, c-wolf, rabia-oe) statt Karussell; keine Karte, kein Preisrechner, keine Express-Anfrage, kein FAQ-Akkordeon mehr auf `/`.
- Navigation (`src/config/navigation.js`, `src/components/common/Header.jsx`, `MobileMenu.jsx`): fünf Hauptpunkte (Bad, Böden und Wände, Balkon und Terrasse, Unsere Arbeiten, Über uns), ab Kopfbreite 80rem im Kopf mit je einem schmalen Aufklappblatt (eine Ebene); darunter Menü-Schalter („Menü öffnen“/„Menü schließen“) mit einem Popover-Menüblatt. Lies die Komponenten für Rollen, Namen und Zustände.
- 404 (`src/app/(bestand)/not-found.tsx`): H1 „Seite nicht gefunden“, drei Wege: „Zur Startseite“, „Termin vor Ort anfragen“, Anruf.
- Preisrechner (F-02) bleibt auf `/preise`, `/leistungen`, `/leistungen/[id]`, `/faq`; Express-Anfrage (F-03) auf `/kontakt`, `/leistungen`, `/foerderung`; Karten hinter Einwilligung (F-12) auf `/standorte` und `/kontakt`; FAQ-Akkordeon (F-14) auf `/faq`.
- Prüfläufe sind wiederkehrende Besuche: `installSperre` setzt den Speicher des Intros (kein Intro im Test, E-019). Seitenwechsel B-01 läuft bei internen Links mit (Spec `tests/verlegen.spec.mjs` zeigt, wie man auf `data-zustand="ruhe"` wartet).

## 6. Maßstab
- Vorhandene Specs und `tests/fixtures.mjs` (Sperre, Einwilligung, `bedienbar()`), Konfiguration `playwright.config.mjs` (nicht ändern).
- Stand E0 der Funktionsspecs: 290 bestanden, 12 übersprungen (`belege/e0/STUFE-B.md`); neue Zählung mindestens gleich viele Prüfungen je Funktion.

## 7. Grenzen
- Nur die Dateien unter „Schreibrechte“ ändern oder anlegen; alles andere nur lesen. Fehler in fremden Dateien unter GEMEINSAME DATEIEN melden, nie beheben.
- Nie committen, nie pushen, nie `git checkout`, `reset`, `stash` oder `clean` im Repo. Keine `.env*`-Dateien lesen oder zitieren.
- Keine echten Formularsendungen, E-Mails, Anrufe oder WhatsApp-Nachrichten; Browserläufe nur über `installSperre()` aus `_werkstatt/werkzeuge/lib.mjs`.
- Fremde Prozesse nie beenden; `pkill -f next` und Ähnliches sind verboten. Server 4310 (Produktion, alter Stand bis E2) und 4320 (Entwicklung, zeigt den Arbeitsbaum) nur nutzen, nicht neu starten.
- Keine Dateien außerhalb von `/home/user/tezgel` und `$SCRATCH` anlegen, auch nicht im Wurzelverzeichnis `/`.
- Umgebung in jeder Shell: `export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`.
- Keine Komponente und keine Seite ändern: Weicht die Seite von diesem Briefing ab, melde es unter GEMEINSAME DATEIEN.
- Nur Server 4320 für die neuen Orte nutzen; nie `next build` oder einen neuen Server starten.

## 8. Schritte
1. Lies die fünf Specs und die Funktionsliste. Lege in `$SCRATCH/E2-PRUEF-TESTS/plan.md` je Prüfung an: Funktion, alter Ort, neuer Ort, Änderung (bleibt, Ort ändern, Inhalt ändern).
2. Lauf vorher gegen den Arbeitsbaum: `cd /home/user/tezgel/_werkstatt/werkzeuge && RELAUNCH_BASE=http://127.0.0.1:4320 npx playwright test tests/<datei> --workers=1 --reporter=line`; notiere, welche Prüfungen rot sind und warum.
3. Passe nur an, was der neue Ort verlangt: F-01 auf `/` über den Anker `#termin` (Formular nach unten gerollt); F-02 und F-03 auf ihren übrigen Seiten (eine Seite je Spec genügt, falls die Spec heute nur `/` prüft); F-12 auf `/` wird zu „keine Anfrage an Karten-Hosts auf `/`“, die Zustimmungs-Prüfung bleibt auf `/standorte` und `/kontakt`; F-13 auf die neue Navigation (Aufklappblatt per Zeiger und per Tastatur, Escape, Klick auf einen Eintrag führt zum Ziel; Menüblatt mobil öffnen, schließen, einem Link folgen); F-14 ohne `/`; F-19 als Prüfung der drei Stimmen auf `/` (Text wörtlich gleich `REVIEWS`, gelesen aus `src/config/reviews.js`).
4. Gegenprobe je geänderter Prüfung: einen erwarteten Wert absichtlich verfälschen, Lauf zeigt rot, zurück auf richtig, Lauf zeigt grün. Notiere beide Läufe.
5. Schlusslauf aller fünf Specs gegen 4320, Ergebnis mit Zahl bestanden, gescheitert, übersprungen.

## 9. Schnellprüfung und Selbstprüfung
- Jede geänderte Prüfung mit Gegenprobe belegt (`$SCRATCH/E2-PRUEF-TESTS/gegenproben.txt`).
- Keine Prüfung gelöscht, ohne dass dieselbe Funktion an anderer Stelle geprüft wird; `test.skip` und `test.fixme` nur, wenn sie schon in E0 so standen.
- `git -C /home/user/tezgel status --porcelain` vor und nach deiner Arbeit vergleichen: neu oder geändert sind nur Dateien aus deinen Schreibrechten (fremde Einträge, etwa Arbeit des Orchestrators unter `src/`, bleiben unberührt und werden nicht gemeldet).

## 10. Ausgabeformular
Höchstens 600 Wörter, genau diese Abschnitte: GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS (Befehl und Ergebnis je Prüfung) · BILDBELEGE (Pfade) · OFFENE FRAGEN. Dein Bericht ist deine Antwort; lege keine Berichtsdatei an.

## 11. Letzte Zeile
=== ENDE E2-PRUEF-TESTS · BEREIT ZUR RÜCKGABE ===
