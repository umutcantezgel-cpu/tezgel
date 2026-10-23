# E0-PRUEF-02b

## 1. Kopfzeile
E0-PRUEF-02b · Rolle Prüfer · Modell Haiku 5.5 · Stufe 2 (Werkzeug und Tests nach Muster) · Kern-Version: v2 (bis v3), Auftrag `_werkstatt/AUFTRAG.md` · Schreibrechte (exakt): `_werkstatt/werkzeuge/lesbarkeit.mjs` (neu), `_werkstatt/werkzeuge/lesbarkeit-logik.mjs` (neu), `_werkstatt/werkzeuge/tests-logik/lesbarkeit.test.mjs` (neu), `_werkstatt/werkzeuge/tests-logik/lesbarkeit-probe.html` (neu), `$SCRATCH/E0-PRUEF-02b/**` · Umfang: ein Logikmodul mit Tests (≥ 16 Fälle), ein Werkzeug, eine Positivprobe, ein Rauchlauf (3 Seiten)

## 2. Rollenbriefing
Du bist **Prüfer**: Du richtest Werkzeuge ein, führst die Prüfungen deiner Stufe aus und berichtest knapp mit Belegpfaden.
- Gute Arbeit: Jede Aussage ist mit einem Befehl und seiner Ausgabe belegt; neue Werkzeuge haben eine Positivprobe, die zeigt, dass sie einen bekannten Fehler wirklich finden; Messungen sind Mediane, keine Einzelwerte.
- Die drei häufigsten Fehler: 1. Einzelmessung statt Median; 2. deuten statt berichten; 3. über die eigene Stufe hinaus prüfen oder ändern.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Baue die messbare Zeichen- und Lesbarkeitsprüfung nach den Schreibregeln des Auftrags über die gerenderte Seite.

## 4. Das Projekt in fünf Sätzen
1. tezgel.de ist die Website von Fliesenverlegung Tezgel, dem Fliesenlegerbetrieb von Deniz Tezgel in der Hohwardstraße 14, 35614 Aßlar; sie ist mit Next.js 16.3.6, React 19 und Tailwind 4 gebaut und wird über Vercel ausgeliefert.
2. Die Seite hat 170 Adressen: Bad und Badsanierung, Fachthemen, 13 Ortsseiten, Ratgeber, Werkzeuge für Anfragen und Rechtstexte.
3. Ziel dieses Laufs ist eine Seite, die jeder Laie ohne Hilfe versteht; Prüfstein ist eine 72-jährige Kundin, die am Handy ihre Wanne gegen eine bodengleiche Dusche tauschen will.
4. Echte Fotos, eine durchgehende Geschichte, ein Intro mit sich zeichnendem Logo und ein Seitenwechsel, bei dem sich Fliesen verlegen, heben die Gestaltung auf Award-Niveau.
5. Jede Adresse, jede Funktion, die Rechtstexte, Kundenstimmen und Firmendaten bleiben erhalten; die Seite bleibt schnell und zugänglich.
(Fassung aus STATUS.md bis KERN v3; wortgleich in allen E0-Paketen.)

## 5. Kern-Auszug
- K-004 Stack und Konventionen (Auszug): Prüfwerkzeuge liegen nur in `_werkstatt/werkzeuge` mit eigener `package.json`; ihre `node_modules` liegen außerhalb des Repos im Scratchpad (Symlink). Jeder Browserlauf geht über `installSperre()` aus `lib.mjs` (Formulare nur an Attrappen, Dritt-Hosts gesperrt, G5). Nichts erkennt Prüfwerkzeuge, um sich anders zu verhalten (G7).
- K-013 Geräte und Budgets (Auszug): Gerätegrößen stehen in `_werkstatt/HAUPTANSICHTEN.json` unter `geraete` (10 Größen: m360 360×740, m390 390×844, m430 430×932, q844 844×390, t768 768×1024, t1024 1024×768, d1280 1280×800, d1440 1440×900, d1920 1920×1080, d2560 2560×1440). Budgets mobil, Median aus drei Läufen: LCP ≤ 2,5 s, CLS ≤ 0,1, TBT/INP ≤ 200 ms, Lighthouse mobil Leistung ≥ 90, Zugänglichkeit ≥ 95, Best Practices ≥ 95, SEO 100.
- K-014 Adressen (Auszug): Jede Adresse liefert 200 oder eine dauerhafte Weiterleitung; je Seite genau eine H1, Titel, Beschreibung, Canonical; strukturierte Daten gültig.

## 6. Maßstab
Auftrag Abschnitt 7 „Schreibregeln“ (Flesch nach Amstad, Satzlängen, Absätze, Fachwörter, Zeichen, KI-Spuren, Titel und Beschreibung) und Abschnitt 8 (Alt-Texte ≤ 125). Muster: `_werkstatt/werkzeuge/texte.mjs`.

## 7. Grenzen
- Nur die Dateien unter „Schreibrechte“ ändern oder anlegen; alles andere nur lesen. Fehler in fremden Dateien unter GEMEINSAME DATEIEN melden, nie beheben.
- Nie committen, nie pushen, nie `git checkout`/`reset`/`stash` im Repo. Nie Dateien unter `src/`, `public/`, `test/`, `next.config.ts` oder die `package.json` der Wurzel ändern.
- Keine `.env*`-Dateien lesen oder zitieren. Keine echten Formularsendungen, E-Mails, Anrufe oder WhatsApp-Nachrichten. Netzwerk nur für die npm-Registry.
- Ports: 4310 = Produktionsserver (Reinraum), 4320 = Entwicklungsserver. Fremde Prozesse nie beenden; `pkill -f next-server` ist verboten (trifft beide Server).
- Rechenintensives (Build, Lighthouse) nur nacheinander. Große Ausgaben (Bilder, Berichte von Lighthouse, Protokolle) nur nach `$SCRATCH` oder `_werkstatt/cache` (Symlink in den Scratchpad), nie ins Repo außer den genannten Belegdateien.
- Umgebung in jeder Shell: `export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`, `export RELAUNCH_SCRATCH="$SCRATCH"`, `export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.

## 8. Schritte
1. Lies `_werkstatt/regeln/floskeln.json`, `bindestrich-erlaubt.json`, `glossar.json`, dazu `_werkstatt/werkzeuge/lib.mjs` (nur importieren, nicht ändern) und `_werkstatt/werkzeuge/texte.mjs` (Muster für das Auslesen gerenderter Seiten). Lies im Auftrag Abschnitt 7 „Schreibregeln“.
2. **Reine Logik `_werkstatt/werkzeuge/lesbarkeit-logik.mjs`** (ohne Browser, exportiert):
   - `silben(wort)`: deutsche Silbenzahl per Vokalgruppen; als eine Gruppe zählen ie, ei, ai, ey, au, eu, äu, aa, ee, oo und Doppelvokale; y als Vokal; mindestens 1.
   - `saetze(text)`: Satztrennung an `. ! ?` gefolgt von Leerraum und Großbuchstabe oder Textende; keine Trennung nach Abkürzungen (z. B., u. a., d. h., ca., bzw., ggf., inkl., Nr., Str., Tel., Dr., St., evtl., usw., zzgl.) und nicht in Zahlen (1.200, 7.30, 2.5).
   - `woerter(satz)`: Wörter ohne Satzzeichen; Zahlen zählen als Wort.
   - `flesch(text)`: Flesch nach Amstad = 180 − mittlere Satzlänge − 58,5 × mittlere Silben je Wort; gerundet auf eine Stelle.
   - `striche(text)`: Fundstellen von „–“, „—“ und von „ - “ (Bindestrich mit Leerzeichen davor und danach) mit Ausschnitt.
   - `bindestrichwoerter(text, erlaubt)`: Wörter mit Bindestrich zwischen Buchstaben oder Ziffern, die nicht in der Erlaubtliste stehen (Groß- und Kleinschreibung egal; Präfixe aus `praefixe_mit_bindestrich_erlaubt` zählen als erlaubt). Ausgenommen: URLs, E-Mail-Adressen, Telefonnummern, Datumsangaben (2026-10-23), Postleitzahlen.
   - `floskeln(text, regeln)`: Treffer der Wörter (Wortgrenze, Groß und klein egal) und Muster; Muster mit `nur_ueberschriften` nur auf Überschriften anwenden.
3. **Tests `_werkstatt/werkzeuge/tests-logik/lesbarkeit.test.mjs`** mit `node:test`, mindestens 16 Fälle, darunter: `silben('Fliese') === 2`, `silben('Badezimmer') === 4`, `silben('Abdichtung') === 3`, `silben('bodengleiche') === 4`, `silben('Dusche') === 2`, `silben('Ausgleich') === 2`, `silben('Aßlar') === 2`; „Wir kommen z. B. am Montag. Dann messen wir.“ ergibt 2 Sätze; „Das kostet 1.200 Euro.“ ergibt 1 Satz; `striche('Bad – fertig')` ergibt 1; `bindestrichwoerter('Vor-Ort-Aufmaß und E-Mail')` ergibt genau `Vor-Ort-Aufmaß`; `floskeln('Ein nahtloser Übergang')` findet „nahtlos“ nur, wenn die Wortgrenze das zulässt (Regel festlegen und im Test belegen); `flesch` eines festen Beispieltexts mit von Hand gerechnetem Erwartungswert ±0,5. Lauf: `node --test _werkstatt/werkzeuge/tests-logik/lesbarkeit.test.mjs`.
4. **Werkzeug `_werkstatt/werkzeuge/lesbarkeit.mjs`**: Aufruf `node lesbarkeit.mjs --satz <name> (--hauptansichten | --seiten /a,/b | --alle) [--ziel DIR] [--probe]`. `--alle` liest die Adressen aus `BASE/sitemap.xml`. Je Seite: Playwright, `installSperre()`, Einwilligung abgelehnt gesetzt, `bereit()`. Aus dem DOM:
   - Fließtext: sichtbare `p` und `li` in `main`, außer in `nav`, `header`, `footer`, `form`, `[data-zitat]`, `blockquote`, `[aria-hidden="true"]`; Absätze sind die `p`-Elemente.
   - Sichtbarer Text der ganzen Seite (`body.innerText` ohne `[data-zitat]` und `blockquote`), Alt-Texte, `title`, `meta[name=description]`, `aria-label`, Knopf- und Linktexte, Überschriften h1 bis h6.
   - Glossar: erstes Vorkommen jedes Begriffs aus `glossar.json` im Fließtext; erfüllt, wenn es in `dfn[data-glossar]` steht und ein Element `[data-erklaert="<data-glossar-Wert>"]` mit höchstens 15 Wörtern existiert.
   - Seitenart: aus `HAUPTANSICHTEN.json`, sonst nach Pfad: `/standorte/*` und `/leistungen/*/*` = ort; `/fliesen/*`, `/untergrund-abdichtung*`, `/naturstein*`, `/treppen*`, `/balkon-terrasse/*`, `/blog/*`, `/faq`, `/foerderung` = wissen; `/kontakt`, `/termin`, `/beratung`, `/preise`, `/downloads`, `/login`, `/bad/badanfrage`, `/bad/badplaner`, `/bad/projekt-check`, `/fliesen/konfigurator`, `/fliesen/festpreisangebot` = arbeit; sonst erzaehl. Rechtstexte (`/impressum`, `/datenschutz`, `/agb`, `/widerruf`, `/cookie-richtlinie`, `/barrierefreiheit`) = ausgenommen.
   - Regeln je Seite (Schwellen Auftrag Abschnitt 7): Flesch ≥ 60 (erzaehl, ort), ≥ 50 (wissen), keine Flesch-Schwelle bei arbeit; mittlere Satzlänge ≤ 14 und kein Satz > 25 Wörter (erzaehl, wissen, ort; bei arbeit nur kein Satz > 25); Absätze ≤ 4 Sätze; 0 Gedankenstriche; 0 nicht erlaubte Bindestrichwörter; 0 Floskeln; 0 Glossarbegriffe ohne Erklärung; Titel ≤ 60 Zeichen; Beschreibung 120 bis 155 Zeichen; Alt-Texte ≤ 125 Zeichen und ohne Gedankenstrich.
   - Ausgabe `<ziel>/lesbarkeit.json` (alle Werte und Fundstellen mit Ausschnitt) und `<ziel>/lesbarkeit.md` (Tabelle je Seite: Art, Flesch, Satzlänge Mittel und Maximum, Absätze > 4, Striche, Bindestrichwörter, Floskeln, Glossar offen, Titel, Beschreibung, Alt; GRÜN oder ROT mit Grund). Standard-Ziel `_werkstatt/belege/<satz>`.
5. **Positivprobe** `_werkstatt/werkzeuge/tests-logik/lesbarkeit-probe.html` mit bekannten Verstößen (2 Gedankenstriche, „Vor-Ort-Aufmaß“, „nahtlos“, ein Satz mit 30 Wörtern, ein Absatz mit 5 Sätzen, ein Glossarwort ohne Erklärung, ein Glossarwort mit korrekter Erklärung, ein Zitat in `[data-zitat]` mit Gedankenstrich, das nicht zählen darf). `--probe` lädt sie per `page.setContent` und muss genau diese Befunde melden; Exit 0 nur dann.
6. **Rauchlauf:** `node lesbarkeit.mjs --satz e0-rauch --seiten /,/standorte/wetzlar,/impressum --ziel "$SCRATCH/E0-PRUEF-02b"` gegen 4310; Tabelle in den Bericht.
7. Probe- und Rauchläufe schreiben ihre Ausgaben mit `--ziel "$SCRATCH/<Kennung>"` in den Scratchpad, nie nach `_werkstatt/belege/`.

## 9. Schnellprüfung und Selbstprüfung
- `node --test` der neuen Tests grün; `node lesbarkeit.mjs --probe` Exit 0; `node --check` für jede neue .mjs-Datei.
- Selbstprüfung: `git -C /home/user/tezgel status --porcelain` zeigt nur Dateien aus deinen Schreibrechten (dazu ggf. `AGENTS.md`, siehe Schritte, und den Symlink `_werkstatt/werkzeuge/node_modules`). Alle Mengen gezählt, alle offenen Punkte gelistet.

## 10. Ausgabeformular
Schreibe deinen Bericht nach `_werkstatt/pakete/E0-PRUEF-02b.rueckgabe.md` UND gib ihn als letzte Antwort zurück, höchstens 600 Wörter, mit genau diesen Überschriften:
GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Letzte Zeile genau: `=== ENDE E0-PRUEF-02b · BEREIT ZUR RÜCKGABE ===`
