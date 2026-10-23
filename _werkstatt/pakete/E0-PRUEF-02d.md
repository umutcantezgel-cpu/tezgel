# E0-PRUEF-02d

## 1. Kopfzeile
E0-PRUEF-02d · Rolle Prüfer · Modell Haiku 5.5 · Stufe 2 (Werkzeug nach Vorlage) · Kern-Version: v2 (bis v3), Auftrag `_werkstatt/AUFTRAG.md` · Schreibrechte (exakt): `_werkstatt/werkzeuge/probelauf.mjs` (neu, Kopie mit Anpassungen), `_werkstatt/werkzeuge/PROBELAUF.md` (neu), `$SCRATCH/E0-PRUEF-02d/**`, `_werkstatt/cache/probelauf/**` · Umfang: ein Werkzeug nach Vorlage, ein Protokoll, zwei Rauchläufe

## 2. Rollenbriefing
Du bist **Prüfer**: Du richtest Werkzeuge ein, führst die Prüfungen deiner Stufe aus und berichtest knapp mit Belegpfaden.
- Gute Arbeit: Jede Aussage ist mit einem Befehl und seiner Ausgabe belegt; neue Werkzeuge haben eine Positivprobe, die zeigt, dass sie einen bekannten Fehler wirklich finden; Messungen sind Mediane, keine Einzelwerte.
- Die drei häufigsten Fehler: 1. Einzelmessung statt Median; 2. deuten statt berichten; 3. über die eigene Stufe hinaus prüfen oder ändern.
Markiere Unsicheres als OFFENE FRAGE statt zu raten und erfülle nur deinen Auftrag.

## 3. Aufgabe in einem Satz
Baue das Laufwerkzeug für die Probeläufe der Personen P1 bis P5 mit den Aufgaben A1 bis A6 nach der Vorlage des Vorlaufs.

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
Vorlage `_relaunch/werkzeuge/probelauf.mjs` und `_relaunch/PROBELAUF.md`; Auftrag Abschnitt 6 (Personen, Aufgaben) und G5 (keine echten Sendungen, Anrufe, Nachrichten).

## 7. Grenzen
- Nur die Dateien unter „Schreibrechte“ ändern oder anlegen; alles andere nur lesen. Fehler in fremden Dateien unter GEMEINSAME DATEIEN melden, nie beheben.
- Nie committen, nie pushen, nie `git checkout`/`reset`/`stash` im Repo. Nie Dateien unter `src/`, `public/`, `test/`, `next.config.ts` oder die `package.json` der Wurzel ändern.
- Keine `.env*`-Dateien lesen oder zitieren. Keine echten Formularsendungen, E-Mails, Anrufe oder WhatsApp-Nachrichten. Netzwerk nur für die npm-Registry.
- Ports: 4310 = Produktionsserver (Reinraum), 4320 = Entwicklungsserver. Fremde Prozesse nie beenden; `pkill -f next-server` ist verboten (trifft beide Server).
- Rechenintensives (Build, Lighthouse) nur nacheinander. Große Ausgaben (Bilder, Berichte von Lighthouse, Protokolle) nur nach `$SCRATCH` oder `_werkstatt/cache` (Symlink in den Scratchpad), nie ins Repo außer den genannten Belegdateien.
- Umgebung in jeder Shell: `export SCRATCH=/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad`, `export RELAUNCH_SCRATCH="$SCRATCH"`, `export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.

## 8. Schritte
1. Lies `_relaunch/werkzeuge/probelauf.mjs` vollständig (Vorlage, 1.000 Zeilen) und `_relaunch/PROBELAUF.md` (Protokoll des Vorlaufs). Lies im Auftrag Abschnitt 6 (Personen P1 bis P5, Aufgaben A1 bis A6). `lib.mjs` nur importieren, nicht ändern; Gerätegrößen aus `_werkstatt/HAUPTANSICHTEN.json` lesen.
2. **Kopiere** die Vorlage nach `_werkstatt/werkzeuge/probelauf.mjs` und passe an:
   - `AUFGABEN` = A1 bis A6 mit dem Wortlaut aus Abschnitt 6 und diesen Zielzuständen: A1 Antwort nennt eine Leistung (`/fliese|bad|boden|balkon|terrasse|dusche/i`) und einen Ort (`/aßlar|wetzlar|mittelhessen|lahn-dill|hessen/i`); A2 ein Telefon- oder WhatsApp-Link wurde angetippt (Attrappe) oder ist mit sichtbarer Nummer im Ausschnitt gesehen; A3 ein Formular, dessen Pflichtfelder gültig ausgefüllt sind (`checkValidity()` der Pflichtfelder), und sein Absendeknopf ist sichtbar im Ausschnitt; A4 mindestens zwei Fotos (`img` in `main`, natürliche Breite ≥ 300 px) wurden sichtbar im Ausschnitt gesehen, und die Antwort sagt, was darauf zu sehen ist; A5 sichtbar gesehen ein Text zu den Kosten des Termins (`/kosten(los|frei)|0 ?€|unverbindlich/i`) und eine Antwort zum Ablauf; A6 der Ortsname der Person wurde sichtbar gesehen und die Antwort sagt ja oder nein.
   - Personen über `person` in der Lauf-Datei: P1 (Ort Solms, Standardgerät m390, Systemschrift 200 %), P2 (Gießen, t768), P3 (Herborn, m360), P4 (Braunfels, d1280), P5 (Limburg, m390). Jede Person läuft zusätzlich mit `--ansicht` in der jeweils anderen Gerätegruppe (mobil ↔ Desktop d1440).
   - Systemschrift 200 %: Option `--schrift 200` setzt per Init-Skript und Stil `html { font-size: 200% !important }` nach jeder Navigation; in `bedingungen` als „Näherung über Wurzelschriftgröße“ vermerken.
   - Telefon und WhatsApp: Ein Init-Skript fängt Klicks auf `tel:`, `wa.me`, `api.whatsapp.com` und `whatsapp:` ab (preventDefault), protokolliert das Ziel als Attrappe `kontakt_angetippt` und ruft nichts auf (G5).
   - Absenden gesperrt: Zielt `tippe` auf einen Absendeknopf (`button[type=submit]`, `input[type=submit]` oder Knopf ohne Typ in einem Formular), verweigert das Werkzeug den Schritt mit der Meldung „Absenden ist im Probelauf nicht erlaubt (A3 endet vor dem Absendeknopf)“ und zählt ihn nicht. Die Sperre aus `installSperre()` bleibt zusätzlich.
   - Ausgabe nach `_werkstatt/cache/probelauf/<satz>/<lauf>/` (Symlink in den Scratchpad); `--matrix --satz <name> --beleg` schreibt `_werkstatt/belege/<satz>/probelauf.json`.
   - Für Probeläufer-Agenten: Nach jedem Lauf gibt die Konsole das letzte Bildschirmbild (Pfad) und eine nummerierte Liste der sichtbaren Bedienelemente mit Rolle und Beschriftung aus; `{"tippe": {"nr": 3}}` tippt Element Nr. 3 dieser Liste. Ein Probeläufer arbeitet schrittweise: Lauf-Datei um einen Schritt erweitern, Werkzeug erneut ausführen (Wiederholung von vorn ist gewollt, reproduzierbar), Bild ansehen, nächsten Schritt wählen.
   - Zählregeln wie in der Vorlage (jede Handlung 1, `warte_auf` 0).
3. **Protokoll `_werkstatt/werkzeuge/PROBELAUF.md`** für Probeläufer: Person spielen, nur Sichtbares nutzen, kein Code, kein Wissen über die Seite; jeden sichtbaren Weg versuchen, bevor man aufgibt; Antwort in eigenen Worten der Person; Befunde mit Schwere (hoch, mittel, gering) und Schritt; Matrix der Läufe (5 Personen × 6 Aufgaben × 2 Gerätegruppen = 60 Aufgabenläufe).
4. **Rauchlauf** gegen 4310 mit `--satz e0-rauch`: (a) P5 auf m390, Aufgabe A2, ein Schritt `tippe` auf den sichtbaren Anruf- oder WhatsApp-Knopf → Attrappe protokolliert, kein Anruf; (b) P1 auf m390 mit `--schrift 200`, Aufgabe A3 auf `/kontakt`: Name und Telefon ausfüllen, dann `tippe` auf den Absendeknopf → Schritt wird verweigert, Zielzustand A3 erfüllt. Ausgaben mit `--ziel` oder Satzname in den Scratchpad.
5. Probe- und Rauchläufe schreiben ihre Ausgaben mit `--ziel "$SCRATCH/<Kennung>"` in den Scratchpad, nie nach `_werkstatt/belege/`.

## 9. Schnellprüfung und Selbstprüfung
- `node --check _werkstatt/werkzeuge/probelauf.mjs`; Rauchläufe (a) und (b) mit dem beschriebenen Ergebnis; kein POST an `/api/anfrage` in den Rauchläufen (Attrappen-Protokoll prüfen).
- Selbstprüfung: `git -C /home/user/tezgel status --porcelain` zeigt nur Dateien aus deinen Schreibrechten (dazu ggf. `AGENTS.md`, siehe Schritte, und den Symlink `_werkstatt/werkzeuge/node_modules`). Alle Mengen gezählt, alle offenen Punkte gelistet.

## 10. Ausgabeformular
Schreibe deinen Bericht nach `_werkstatt/pakete/E0-PRUEF-02d.rueckgabe.md` UND gib ihn als letzte Antwort zurück, höchstens 600 Wörter, mit genau diesen Überschriften:
GEÄNDERTE DATEIEN · WAS UND WARUM · GEMEINSAME DATEIEN (gewünschte Änderungen als exakte Liste) · PRÜFUNG UND ERGEBNIS · BILDBELEGE · OFFENE FRAGEN

Letzte Zeile genau: `=== ENDE E0-PRUEF-02d · BEREIT ZUR RÜCKGABE ===`
