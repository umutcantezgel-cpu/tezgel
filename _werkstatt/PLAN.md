# PLAN · Fassung 0 (im Chat freigegeben am 23.10.2026)

> Wörtliche Kopie des freigegebenen Plans. E1 erweitert ihn zu PLAN.md Fassung 1 (alle Pakete mit Kennung, Rolle, Modell, Schreibrechten, Abhängigkeit, Kriterium).


## Context

**Warum:** Deniz Tezgel findet seine eigene Website schwer verständlich, und ein Kunde hat sich nicht zurechtgefunden. Die Erkundung (E0, nur lesend, bereits gelaufen) bestätigt die Ursachen:
- 5 Aufklappmenüs mit 37 Zielen und 3 Ebenen. Das Bad steht dreimal darin. Fachwörter stehen schon in der Navigation (DIN 18534, Verbundabdichtung, Estrichspachtelung, Stelzlager).
- 9 Anfragewege in 8 Komponenten; Badplaner und Badanfrage sind sogar dieselbe Komponente. Die Startseite hat 3 Formulare.
- 830 Gedankenstriche in 217 Dateien. „Vor-Ort-Aufmaß“ steht 132-mal da, „Verbundabdichtung“ 114-mal. Die H1 der Startseite lautet „Perfektion auf jedem Quadratmeter.“
- „5,0 von 527“ entsteht im Textinhalt, weil „5,0 von 5“ und „27 Google-Rezensionen“ ohne Trenner aneinanderstoßen (`GoogleReviewsBadge.tsx:35-38`). Screenreader und Suchschnipsel lesen es genau so.
- Es gibt keine echten Projektfotos. Die 11 Bad-Fotos in `public/images/bad` tragen laut früheren Notizen Generatorzeichen (M-02, M-19). Die 6 Referenzprojekte sind `placeholder: true`, obwohl die Seite „Echte Referenzen“ sagt.

**Ziel (Nordstern):** Jeder Laie versteht tezgel.de ohne Hilfe. Prüfstein ist P1, eine Frau von 72 Jahren, die am Handy die Wanne gegen eine bodengleiche Dusche tauschen will. Echte Bilder und eine durchgehende Geschichte zeigen die Arbeit. Intro, Seitenwechsel „Verlegen“ und Bewegung mit Sinn bringen die Gestaltung auf Award-Niveau. Alle 170 Adressen, alle Funktionen, Rechtstexte, Stimmen und Firmendaten bleiben erhalten.

**Ausgangslage im Code:**
- Next.js 16.3.6, React 19.2.4, Tailwind 4.3, kein CMS (Texte in TSX und `src/config/*`), Root-Layout `src/app/(bestand)/_dokument.tsx`.
- 170 Adressen: 70 statisch, 100 aus Daten (13 Orte, 52 Leistung × Ort, 13 Artikel, 12 Musterbäder, 6 Referenzen, 4 Leistungen).
- KERN v2 „Verlegeplan“ der Vorläufe: Kalk, Fliese und Tinte mit einem Laser-Rot, Archivo und IBM Plex Mono, 45 eigene Icons (Sprite, 1,5er Strich), 16 Bewegungskennungen, Tailwind-Palette gesperrt. Als Seitenwechsel gibt es nur den Plan-Morph `/leistungen → [id]`.
- Branch `claude/tezgel-website-redesign-iqxt8z` = main (388fa7b, live) + 3 Bild-Commits vom 23.10.: 81 Social-Zuschnitte und 84 Originale (iPhone-Screenshots, meist 1320 px breit) in `_werkstatt/bilder/referenzen/`.

## Grundentscheidungen vor dem Start (gehen in ENTSCHEIDUNGEN.md)

1. **Arbeitsbranch:** `claude/tezgel-website-redesign-iqxt8z`. Die Sitzungsvorgabe geht dem Standard `werkstatt/tezgel-…` und dem veralteten Branch im CLAUDE.md-Block vor. Push nur dorthin (`git push -u origin claude/tezgel-website-redesign-iqxt8z`), nach jeder Welle und mindestens stündlich. Nie main, nie erzwungen, kein Deploy. Automatische Vercel-Vorschauen des Branchs sind erlaubt (G3).
2. **Neuer Lauf, keine Wiederaufnahme:** Das vorhandene `_werkstatt` gehört zu einem früheren, formell beendeten Lauf (HALT/ÜBERGEBEN). Seine Dokumente ziehen per `git mv` nach `_werkstatt/archiv/2026-10-werkstatt/`. `_werkstatt/werkzeuge` bleibt und wird erweitert; `_relaunch` bleibt unberührt. Wiederverwendbares übernehme ich mit Fundstelle: KERN v2 als Ausgangspunkt, Funktionsliste, Werkzeuge, Lernpunkte aus `_relaunch/LERNEN.md`.
3. **Fehlender Auftragsteil:** `_werkstatt/AUFTRAG.md` enthält den Auftrag wörtlich bis zur Abbruchstelle. Darunter folgt ein markierter Block „ERGÄNZUNG · rekonstruiert (Annahme)“ (deine Wahl). Er enthält den Rest von Stufe B, Stufe C, die Award-Rubrik, Z-01 bis Z-14, L0 bis L7, Statuszeile und Start, abgeleitet aus dem Vorgänger-Auftrag und den Abschnitten 6 bis 11. Kurzfassung siehe „Abnahme“ unten.
4. **Bildquelle:**
   - BILDQUELLE sind die 84 Originale. In E0 kommt `/_eingang/` in die .gitignore, die Originale werden nach `_eingang/entpackt/` kopiert und per `git rm` aus dem Baum genommen (G4: Originale nie im Commit).
   - Wiederherstellung bei neuer Umgebung: `git checkout 35af5cc -- _werkstatt/bilder/referenzen/originale` und verschieben (steht in EINRICHTUNG.md).
   - Die 81 Social-Zuschnitte bleiben als Arbeitsmaterial. Webfassungen entstehen neu aus den Originalen, mit entfernten Metadaten.
   - Weil das Repo laut Vorlauf öffentlich ist und die Originale schon in der Geschichte stehen, kommt das als dringender Punkt in MENSCHEN.md. Empfehlung: zusammenführen per Squash, Repo-Sichtbarkeit prüfen; Personenbilder IMG_2542/43/47 betroffen.
5. **Modelle und Plätze:**
   - Jeder Haiku-Agent wird mit `model: 'haiku'` aufgerufen, Prüfer und Texter mit hoher Denkstufe, reine Fleißarbeit niedriger. 5 Haiku-Plätze.
   - Dieser Container hat 4 Kerne, deshalb begrenzt ein Workflow auf 2 gleichzeitige Agenten. Rechenleichte Wellen (Texte, Lektorat, Bildsichtung) laufen in bis zu zwei parallelen Workflows plus Hintergrundagenten, zusammen höchstens 5.
   - Rechenintensives (Build, Lighthouse, Playwright) läuft strikt nacheinander; Lighthouse in einem eigenen Ruhefenster.
   - Höchstens 2 Reinraum-Kopien gleichzeitig (Plattenbudget).
   - Orchestrierung: Jede Welle läuft als Workflow-Skript: Bau oder Text durch Haiku, dann unabhängige Stufe-A-Prüfung durch einen zweiten Haiku-Agenten, dann meine Abnahme an Bericht, Diff und Bild.
   - Tore laufen mit unabhängigen Gutachtern. Befunde werden gegengeprüft, bevor sie Pakete werden.
6. **Takt und Gedächtnis:**
   - PRUEFPUNKT nach jedem Paket, eine STATUS-Zeile stündlich, Push nach jeder grünen Welle.
   - Zwei Routinen in diese Sitzung: „Morgenbericht“ täglich 06:47 Europe/Berlin (damit er um 07:00 steht) und ein stündliches „WEITER“, das nach Leerlauf oder Containerwechsel an PRUEFPUNKT.md fortsetzt (L5).
   - Morgenbericht in BERICHT.md: höchstens 20 Zeilen, du-Anrede, ohne Fachjargon, höchstens 6 Bilder (≤ 1440 px) je Tag. Ins Repo kommen nur die Bildsätze von E0, Referenz und Abschluss.
7. **Umgebung und Einstellungen:**
   - UMGEBUNG ist hier die Cloud, nicht lokal. Alle übrigen Einstellungen gelten wie in Abschnitt 0.
   - KLANG aus. MUT „deutlich sichtbar neu“: Wiedererkennung tragen nur Logo, Farbwelt und Firmendaten.
   - Pakete folgen dem 11-teiligen Paket-Bauplan, Berichte haben höchstens 600 Wörter.
   - Zu Beginn jeder Etappe lese ich KERN, PLAN und ABNAHME und verankere mich in drei Sätzen am Nordstern.
   - Vor jeder Welle prüfe ich `_eingang` und die Bildquelle neu.
8. **Vorrang bei Konflikten** wie im Auftrag. Besonders:
   - Pflichtfelder und Empfänger bleiben (G8). Alle Formulare verlangen heute nur Name und Telefon, plus Einwilligung bei Preisrechner, Konfigurator, Kalender und Schnellanfrage. Der Hauptweg kommt also ohne Eingriff auf höchstens 4 Pflichtangaben.
   - Fehlende Einwilligungs-Häkchen in 4 Formularen sind eine Rechtsfrage für MENSCHEN.md und keine Änderung.

## Ablauf

### E0 · Start und Ausgangswerte (Tag 1)
1. **E0-ORCH-01 (ich):**
   - .gitignore um `/_eingang/` ergänzen, Originale verschieben, alte Dokumente archivieren.
   - AUFTRAG.md mit Ergänzung schreiben, CLAUDE.md-Block mit Marken ersetzen (alter Werkstatt-Block → neuer Block mit diesem Branch).
   - STATUS.md und PRUEFPUNKT.md anlegen.
   - Kundschafterberichte E0-KUND-01 bis -09 und die beiden Technikgutachten nach `_werkstatt/berichte/` schreiben; Bildsichtung und Technikwerte nach `_werkstatt/bildinventar.csv`.
   - Drei Streudateien außerhalb des Repos löschen, die Kundschafter versehentlich angelegt haben: `/tmp/x`, `/root/.cache_tezgel_home.html`, `/root/.noop`.
   - Committen, pushen, Routinen anlegen.
2. **E0-PRUEF-01 (Haiku · Prüfer):**
   - `npm ci`, Build, Start über `server.sh` (Port 4310) und `dev-server.sh` (4320).
   - Werkzeuge per `npm ci` in `_werkstatt/werkzeuge`, `node_modules` als Symlink in den Scratchpad.
   - Feste alte Sitzungspfade in den Skripten auf eine Variable umstellen. Fehlende Abhängigkeiten (chrome-launcher, @babel/*, magic-string) in deren package.json eintragen.
   - `lighthouse.mjs`: frisches Chrome-Profil je Lauf, damit localStorage leer ist und das Intro in jedem Lauf vorkommt. LCP-Element und Zeitpunkt werden mitgeschrieben.
   - EINRICHTUNG.md aktualisieren.
3. **E0-PRUEF-02a–d (Haiku · Prüfer), neue Werkzeuge:**
   - a: Gerätegrößen in `lib.mjs` auf alle 10 erweitern; Prüfung „Erstes Bild“ (Logo, H1, Ort, Hauptknopf, Telefon oder WhatsApp vollständig im ersten Bildschirm, je Gerätegröße).
   - b: `lesbarkeit.mjs` über die gerenderte Seite:
     - Flesch nach Amstad, mittlere Satzlänge, längster Satz, Sätze je Absatz;
     - Gedanken- und Bindestriche gegen die Liste K-010-B, Floskeln K-010-F;
     - Glossarwort beim ersten Vorkommen mit Erklärung (über `<dfn data-glossar>` und `data-erklaert`);
     - Titel ≤ 60, Beschreibung 120 bis 155, Alt-Texte ≤ 125;
     - Rechtstexte und wörtliche Stimmen ausgenommen.
   - c: Linkprüfer und Crawler für `adressen-e0.csv` (Status, Titel, Beschreibung, H1, Canonical, strukturierte Daten, Suchbegriffe).
   - d: Laufwerkzeug aus `_relaunch/werkzeuge/probelauf.mjs` übernehmen (tippe, scrolle, zurück, Schrittzähler, sichtbare Bedienelemente), dazu Attrappen für Formularziele, Analyse und WhatsApp (G5) und eine Einstellung für große Systemschrift.
4. **E0-PRUEF-03 (Haiku · Prüfer), Ausgangswerte Stufe B auf den 12 Hauptansichten:**
   - Build, Typprüfung, Linter, Suite (37 Tests plus 13 Funktionsspecs), Konsolenfehler.
   - Bildsatz in 10 Größen mit Überlauf und Erstem Bild, axe, Lighthouse mobil und Desktop als Median aus 3, reduzierte Bewegung, Lesbarkeit, Links.
   - Danach Durchlauf der Funktionsliste.
5. **E0-PROBE-01–10 (Haiku · Probeläufer):** P1 bis P5 lösen A1 bis A6 auf dem alten Stand, je mobil und am Desktop. Das ist der Vorher-Wert der Nutzerführung.
6. **E0-ORCH-02 (ich):**
   - Hauptansichten festlegen: `/`, `/bad`, `/bad/badsanierung`, `/bad/barrierefreies-bad`, `/leistungen`, `/fliesen`, `/balkon-terrasse`, `/referenzen`, `/ueber-uns`, `/kontakt`, `/standorte/wetzlar`, `/blog`.
   - LAGEBILD.md schreiben und Faktenblatt-Entwurf K-015 mit allen Widersprüchen.

### E1 · Plan, einmal gründlich (Tag 1 bis 2, ich)
- Denkprotokolle (Ziel, drei Wege, Bewertung, Umkehrprobe, Folgen):
  - Leitidee, Informationsarchitektur und Navigation, Zusammenlegen der Werkzeuge, B-01-Technik, B-02-Weg;
  - Auswahl der großen Momente, Bildablage, Umgang mit Generatorbildern und Platzhalter-Referenzen;
  - Werkzeugbibliotheken (sharp, potrace, Schriftdateien nur in `_werkstatt/werkzeuge`).
- KERN.md v3 als Weiterentwicklung von v2 mit K-001 bis K-015, darin:
  - der Erzählbogen der ganzen Seite in drei Sätzen;
  - Skalen statt Einzelwerten für Abstände, Schrift, Dauern, Kurven, Radien und Schatten. Das Fugenraster ist das Grundraster; Abstände leiten sich aus Fliese und Fuge ab.
  - Logo-Farben bleiben exakt (#0F172A, #DC2626). Ob `tinte` und `laser` darauf angeglichen werden, entscheide ich per Kontrastrechnung.
- Vier Referenztexte: `/`, `/bad/barrierefreies-bad` (Bereich), `/untergrund-abdichtung/din-18534` (Wissen), `/standorte/wetzlar` (Ort).
- Bildplatzliste `bildplaetze.md`.
- PLAN.md (alle Pakete mit Kennung, Rolle, Modell, Schreibrechten, Abhängigkeit, Kriterium), ABNAHME.md, MENSCHEN.md (Fragebogen an Deniz, ≤ 10 Fragen).
- Planprüfung durch einen Haiku-Prüfer, höchstens 2 Runden.

### E2 · Referenz: Kernsysteme und Startseite (Tag 2 bis 4, ich baue selbst)
- Zuerst E2-ORCH-00, die Ursache des LCP auf `/` mobil:
  - Letzter Messwert vom 13.10.: 3,46 s bei FCP 1,38 s, Lighthouse 90. LCP-Element ist ein Absatz. Kandidaten: Schriftwechsel bei Archivo, Startzustände der Bewegung, späte Abschnitte.
  - Ich behebe sie, bevor Intro und Startbild dazukommen, weil das Budget daran hängt.
- Designsystem-Erweiterung, Formsystem mit Icons (eine Familie, ein Strich), Kopf, Navigation, Fuß, Brotkrumen, Markierung der aktuellen Seite.
- 404 mit Charakter (eine verrutschte Fliese) und den drei wichtigsten Wegen: Startseite, Termin anfragen, Anrufen.
- B-01, B-02 und die Startseite auf Zielniveau. Haiku erledigt Bildbearbeitung und Prüfungen.
- Erstes Bild auf allen 10 Gerätegrößen. Am Handy quer nehmen Kopf und Leisten höchstens ein Viertel der Höhe ein.
- Tor:
  - Stufe B für `/`;
  - Probelauf P1 und P5 mit A1 bis A3;
  - Sichtabnahme durch einen frischen Opus-Unteragenten nach Rubrik, Ansichtswert ≥ 8.
- Höchstens 2 Anläufe, danach ist `/` das Muster.

### E3 · Seitenvorlagen und Hauptansichten (Tag 4 bis 5)
- Ich baue die Vorlagen je Seitenart (gemeinsame Dateien): Erzählseite, Wissensseite, Ortsseite, Arbeitsseite. Grundlage ist die Seitenformel: Worum es geht, Ihre Lage, Was wir tun, So läuft es ab, Beleg, Nächster Schritt.
- Die übrigen 11 Hauptansichten laufen als Paare: Baumeister (Haiku) baut nach Vorlage und Referenz, Texter (Haiku) schreibt nach Referenztext, Lektor (Haiku) prüft eine Welle später.
- Texte in gemeinsamen Datendateien (`cities.ts`, `services.js`, `company.js`, `topics.js`, `musterbaeder.js`, `projects.js`) liefern Texter als Datei in `_werkstatt/texte/<Kennung>.json`. Ich übertrage sie am Wellenende.
- Stufe B am Etappenende, Probeläufe P1 bis P5 auf allen A-Aufgaben.

### E4 · Alle übrigen Seiten (Tag 5 bis 8)
- Wellen nach Dateihoheit:
  - 25 Wissensseiten unter `/fliesen`, `/untergrund-abdichtung`, `/balkon-terrasse`, `/naturstein`, `/treppen`;
  - Bad-Unterseiten und Musterbäder, `/blog` mit 13 Artikeln;
  - 13 Ortsseiten und 52 Leistung-mal-Ort-Seiten (Text aus Daten, echte Angaben wie Entfernung und Anfahrt);
  - Arbeitsseiten (Werkzeuge, `/termin`, `/beratung`, `/faq`, `/preise`, `/downloads`, `/login`), Rechtstexte nur gestalterisch.
- Textstichprobe je Welle (10 %, mindestens 5 Seiten). Verfehlen mehr als 10 % die Regeln, geht die Welle zurück.

### E5 · Große Momente, Galerie, Bilder vollständig (Tag 7 bis 9, parallel zu E4)
- Galerie „Unsere Arbeiten“ auf `/referenzen` mit Raumfilter.
- Vorher-Nachher-Regler (Außentreppe IMG_2527 → IMG_2525). „So entsteht eine bodengleiche Dusche“ als Zweierbild (IMG_2555 → IMG_2549, andere Blickwinkel, deshalb kein Regler).
- Je Erzählseite ein großer Moment, Bildplätze nach Liste, Weiterleitungen für zusammengelegte Werkzeuge.

### Kür (nach Wirkung)
- Zuerst Feinschliff: Ein Haiku-Juror bewertet jede Hauptansicht nach der Rubrik. Jede Kategorie unter 9 wird ein Paket, höchstens 2 Runden je Hauptansicht und Kategorie.
- Dann die übrigen Kürpakete aus PLAN.md. Neue Pakete entstehen nur aus Lücken der Abnahmeliste oder aus Befunden von Sichtabnahme und Jury.

### Abschluss
- Stufe C, BERICHT.md, Vorher-Nachher-Galerie als eigene Seite in `_werkstatt/bilder`.
- Anleitung zum Zusammenführen (Squash, `_werkstatt` und `_relaunch` vorher entfernen) und zum Zurückrollen; MENSCHEN.md vollständig.
- Ein frischer Opus-Unteragent bestätigt jedes Kriterium gegen seinen Beleg. Sein Urteil gebe ich wörtlich wieder. Danach Block aus CLAUDE.md entfernen, committen, pushen, Statuszeile ABSCHLUSS.

## Kernsysteme, Richtung (endgültig per Denkprotokoll in E1/E2)

**Leitidee (Entwurf):** „Klar verlegt.“ Jede Seite legt dem Kunden eine Sache nach der anderen hin: Fliese für Fliese, im festen Fugenraster, an einer geraden Linie, bis das Ganze fertig daliegt wie ein Boden von Deniz Tezgel.
- Daraus folgt: ein Gedanke je Block, Versatz als bewusster Bruch, die Laserlinie zur Orientierung, und Bewegung, die setzt und nie federt.
- Austauschprobe: Weder Bäckerei noch Steuerbüro haben Verband, Fuge, Gefälle oder Laser.

**Informationsarchitektur (Kandidat, wird in E1 per Baumtest mit 5 Haiku-Personen geprüft):**
- Fünf Hauptpunkte, je höchstens eine Aufklappebene, kein Thema doppelt:
  - **Bad**: komplett erneuern, Dusche statt Wanne, große Fliesen, alles aus einer Hand, Beispielbäder;
  - **Böden und Wände**: Küche, Flur, Wohnräume, Treppen, Naturstein, Reparatur und Fugen;
  - **Balkon und Terrasse**;
  - **Unsere Arbeiten**;
  - **Über uns**: Deniz Tezgel und Team, Wo wir arbeiten, Ratgeber, Fragen und Antworten, Kontakt.
- Immer sichtbar: Hauptknopf „Termin vor Ort anfragen“ und Telefon. Mobil zusätzlich die vorhandene untere Leiste mit Anrufen, WhatsApp und Anfrage.
- Fachthemen wie Untergrund und Abdichtung stehen im Fuß (vollständiger Index) und in der jeweiligen Seite, aber nicht im Kopf.
- Mobilmenü passt ohne Scrollen auf 360 × 740.

**Anfrage-Hauptweg:**
- Ein Formular „Termin vor Ort anfragen“ mit der vorhandenen HeroContactForm-Logik. Pflicht sind Name und Telefon, Ziel `general`, Empfänger info@tezgel.de unverändert. Es steht oben auf `/kontakt` und einmal unten auf der Startseite, daneben Anruf und WhatsApp.
- Preisrechner und Express-Funnel verlassen die Startseite; sie bleiben auf ihren übrigen Seiten erhalten.
- Werkzeuge (Badplaner, Projektcheck, Konfigurator, Kalender) erscheinen als „Hilfen“ unter dem Hauptweg.
- Zusammenlegen nur, wo es dieselbe Funktion ist: Kandidat `/bad/badplaner` → `/bad/badanfrage` mit 308. Endgültig per Denkprotokoll, alte Adressen leiten dauerhaft weiter.
- „Kostenfrei“ beim Termin vor Ort ist Bestand und bleibt sinngleich.

**B-01 „Verlegen“, gewählte Richtung:** eine eigene Überlagerung statt View-Transition-Pseudoelementen. Nur so geht „erst bedecken, dann wechseln, bei Wartezeit Laserlinie bis 3 s“ in allen Browsern.
- Ein Gutachter hat den Quelltext von Next 16.3.6 geprüft (Next liefert dafür sein eigenes React 19.3 Canary). Ergebnis: Für Klicks ist der Ansatz tragfähig, mit den folgenden Korrekturen.
- Aufbau:
  - Client-Komponente in `_dokument.tsx` außerhalb von `main`. Sie wird nur mit `usePathname` gebaut; `useSearchParams` im Root-Layout würde ohne Suspense alles clientseitig rendern.
  - Fester Layer mit `aria-hidden` und höchstens 80 DOM-Fliesen über WAAPI, nur `transform` und `opacity`. Der Schatten ist eine eigene Ebene mit Deckkraft.
  - Die Fliesen entstehen erst bei der ersten Navigation, damit DOM-Größe und TBT der Erstansicht unberührt bleiben.
  - Während des Wechsels fängt der Layer Klicks ab (`pointer-events: auto`), und `header`, `main` und `footer` sind `inert`.
- Abfangen per Klick-Listener in der Capture-Phase für interne Links:
  - `next/link` prüft nach dem eigenen onClick `e.defaultPrevented` (link.tsx#L692). Der Listener erfasst auch reine `<a>`, etwa Markdown-Links und Kartenlinks.
  - Ausgenommen sind Zusatztasten, `target`, `download`, `tel:`, `mailto:`, WhatsApp, externe Links, Anker auf derselben Seite, dieselbe Adresse, Formulare und Links mit `data-kein-verlegen` (dafür alle Links mit `replace` oder `scroll={false}` markieren).
  - Beim Klick sofort `router.prefetch(href)`.
- Ablauf:
  - Verlegen über ~45 % der Dauer: Verband nach SEITENWECHSEL, Kante von rechts nach links, neue Fliesen unter der gelegten Kante, Größe 1,06 auf 1,0 ohne Nachfedern.
  - Dann `router.push` in `startTransition`. Abschluss erkannt über `isPending` und den `usePathname`-Commit plus zwei Frames, mit Zeitlimit.
  - Danach Scroll nach oben (`behavior: 'instant'`, weil global smooth gesetzt ist) und Fokus auf die H1 (`tabindex=-1`). Next setzt keinen Fokus; die Titelansage kommt vom Routen-Ansager von Next. Auf Doppelansage per Screenreader-Test achten.
  - Weiterziehen über ~40 %: Spalten ziehen links aus dem Bild, die linke Spalte startet zuerst, also überholt keine Fliese eine andere.
- Größenwahl: etwa 3 Fliesen je Reihe bei 390 px und etwa 8 bei 1440 px, gedeckelt auf 80. Fuge 1 % der kurzen Seite, mindestens 2 px.
- Dauer: der erste Wechsel einer Sitzung ≤ 1.200 ms, ab dem zweiten ≤ 900 ms (sessionStorage). Doppelklicks sperrt ein Zustandsautomat.
- Zurück und Vor (gespiegelt, 70 % der Dauer), zwei Wege; in E2 entscheide ich per Denkprotokoll und Playwright-Test:
  - (a) **Aufschub:**
    - Ein `popstate`-Lauscher in der Capture-Phase, registriert auf Modulebene (wegen Firefox 111 bis 115), stoppt das Ereignis, verlegt gespiegelt und schickt es dann mit dem aktuellen `history.state` neu ab. Next prüft `isTrusted` nicht.
    - Durchlassen bei `!state?.__NA` und reinen Hash-Wechseln; abbrechen, wenn sich `location` inzwischen geändert hat.
    - Die Scrollposition merkt er selbst (`scrollRestoration = 'manual'`).
  - (b) **Sicher:**
    - Im Capture-Lauscher liegt der Boden sofort fertig (statisch), das Ereignis läuft unverzögert weiter. React rendert beim popstate synchron, der Browser stellt den Scroll selbst wieder her.
    - Danach Weiterziehen in gespiegelter Richtung.
  - (a) ist näher am Auftrag; (b) ist der Rückfall, falls (a) die Tests nicht besteht.
- Reduzierte Bewegung: Überblendung 150 ms.
- Der Plan-Morph `/leistungen → [id]` entfällt zugunsten eines einzigen Systems. Laufende View Transitions würden benannte Elemente über die Überlagerung heben.
- Vor dem Bauen lese ich die Next-16-Doku zu Link, Router, View Transitions und Scroll in `node_modules/next/dist/docs/`.

**B-02 „Logo zeichnet sich“:**
- Vektorweg:
  - Die Wortmarke ist laut Logo-SVG in „Plus Jakarta Sans“ 900 gesetzt (OFL). In E2 baue ich sie per Schriftkontur nach und prüfe alternativ gegen Inter.
  - Das Maskottchen entsteht per Farbebenen-Nachzeichnung (potrace als Werkzeug) und wird zu wenigen glatten Pfaden bereinigt.
  - Abnahme per Skript: Formflächen bei doppelter Größe ≥ 98 % deckungsgleich, Farben exakt #0F172A, #DC2626, #DE5126 usw. aus dem PNG.
- Ablauf:
  - Kontur zeichnet sich (~1.000 ms): `stroke-dashoffset` direkt auf den Umrisspfaden, ohne Maske. Das ist die einzige dokumentierte Ausnahme von „nur Lage, Größe, Drehung, Deckkraft“, begründet mit B-02 selbst.
  - Flächen füllen sich (~400 ms), überlappend mit dem Ende der Kontur.
  - Das Logo gleitet per FLIP (nur `transform`) an seinen Platz im Kopf (~600 ms). Gleichzeitig ziehen Fliesen die Decke von der Startseite ab, sodass der sichtbare Teil stetig wächst.
  - Ziel ist eine deckende Phase ≤ 800 ms und gesamt ≤ 1.600 ms; Obergrenze 2.200 ms.
- Auslösung:
  - Ein Inline-Kopfskript setzt die Klasse nur beim ersten Besuch je Browser (localStorage, im Fehlerfall kein Intro).
  - Der Beenden-Lauscher steckt im Kopfskript (passiv, `once`, setzt nur eine Klasse). Aufräumen erst nach dem nächsten Bild.
  - Reduzierte Bewegung: Einblenden in 300 ms.
- Leistung (Gutachten Lighthouse 13.5):
  - Verdeckter Inhalt zählt als LCP, solange er mit Deckkraft > 0 malt. Deshalb nie `opacity: 0` oder `visibility: hidden` auf html, body oder main.
  - Die Überlagerung ist kein LCP-Kandidat: nur `path` und `rect`, kein `<image>`, kein `url()`, kein Text. Sie ist in Kalk gehalten, weil der Speed Index Farbverteilungen vergleicht.
  - Keine Scroll-Sperre per `overflow: hidden`, weil die Scrollleiste sonst die Breite verschiebt (CLS). Das Kopf-Logo wird nur per Deckkraft versteckt.
  - Das Lighthouse-Werkzeug leert localStorage bisher nicht und nutzt eine Chrome-Instanz für alle Läufe. E0-PRUEF-01 stellt auf ein frisches Profil je Lauf um und weist Läufe mit und ohne Intro getrennt aus.
- Gelingt die 98-%-Prüfung nicht: Ersatz-Intro „Der erste Boden“ und Bitte um Vektordatei in MENSCHEN.md.

**Bilder:**
- Bearbeitung per Skript mit `sharp` in `_werkstatt/werkzeuge`: Ränder der Screenshots weg, Ausrichtung, nur Belichtung und Weißabgleich, Zuschnitt nach Bildplatz und Schwerpunkt, keine Hochskalierung, Metadaten weg.
- Ablage `public/images/arbeiten/<raum>/<sprechender-name>.jpg`. Einbau über `next/image` mit festen Maßen, `sizes`, Platzhalter (vorab erzeugte blurDataURL) und `preload` nur für das Startbild.
- Befund der Sichtung (81 Zuschnitte, 84 Originale):
  - Qualität: 4 Bilder mit Note A, 72 mit B, 5 mit C. Kein Querformat, keine Standortdaten. Alle Zuschnitte tragen EXIF-Bildtexte, die Webfassungen entfernen sie.
  - Viele Bäder zeigen die fertigen Fliesen bei noch offener Sanitärmontage. Die Alt-Texte sagen das ehrlich.
  - Wegschneiden oder weglassen: Kind im Hintergrund (Balkon Steinoptik), Gesichter auf zwei Stelzlager-Fotos, Logo eines Autohauses auf zwei Treppen-Fotos, Markenaufdrucke (Dosen, Klebeband).
  - Ein starkes Echtheitsbild: Mitarbeiter von hinten im Pullover mit Tezgel-Logo (Balkon, Dichtband).
  - Herkunft klären: Die Schiefer-Dusche mit Glaswand wirkt wie ein Herstellerfoto, IMG_2577 ist ein Bildschirmfoto aus einem Bildbetrachter. Beide bis zur Antwort nicht verwenden.
- Startbild: „Bodengleiche Dusche mit großen grauen Fliesen und Glaswand“ (Note A, 4:5). Es ist das Ziel von P1 und zeigt sichtbar Fugenraster. Am Desktop steht es in der rechten Spalte statt als Vollbild, weil die Quellen höchstens 1320 px breit sind.
- Die Generatorbilder in `public/images/bad` verschwinden aus allen Verwendungen (Leistungen, Musterbäder, Artikel, OG-Bild). Die Dateien bleiben vorerst liegen; Löschung steht in MENSCHEN.md.
- Platzhalter-Referenzen `/referenzen/[id]`: jedes Projekt wird zur ehrlichen Themenansicht mit echten Fotos und ohne erfundene Projektangaben, oder zur 308 auf die gefilterte Galerie, wenn keine passenden Fotos da sind.
- Personen, Kind im Hintergrund und Autohaus-Logos werden weggeschnitten oder das Bild entfällt; die Liste kommt in MENSCHEN.md.

**Texte:**
- Gemeinsame Bausteine `Fachwort` (dfn plus Erklärung) und `Abschnitt` nach Seitenformel.
- Glossar K-011 aus der Zählung, mit über 80 Kandidaten wie Verbundabdichtung, DIN 18534, Stelzlager, Kuvertschnitt, Nivelliersystem, Belegreife.
- K-010-B startet mit E-Mail, Gäste-WC, Lahn-Dill-Kreis, Marburg-Biedenkopf; geprüft wird Walk-in-Dusche als Suchbegriff. „Vor-Ort-Aufmaß“ wird durchgehend zu „Termin bei Ihnen vor Ort“.
- Suchbegriffe je Seite aus `adressen-e0.csv` bleiben natürlich im Text.
- Faktenblatt K-015 nur mit Fundstelle. Widersprüche (5 oder 12 Mitarbeitende, Fr 17 oder 18 Uhr, Rückruf 24 h oder 24 bis 48 h, Radius 45 oder 25 km, 260 oder 278 cm, „Über 15 Jahre“) bleiben bis zur Antwort auf der vorsichtigen Bestandsfassung. Alle Versprechen kommen zur Bestätigung in MENSCHEN.md.

**Gefundene Bestandsfehler:**
- Werden behoben (kleine Pakete in E3 und E4, je mit Test, wo es Logik ist):
  - „527“ durch saubere Trennung in der Bewertungszeile; die Zahl 27 steht heute vierfach hart im Code und kommt künftig aus `reviews.js`.
  - Kundenstimmen in `schema.ts` weichen vom Wortlaut ab und werden auf den wörtlichen Text aus `reviews.js` zurückgeführt (G8).
  - `video-sitemap.xml` verweist auf zwei fehlende Videos.
  - OG-Bild meldet 1200×630 für eine 640×200-Datei.
  - Relative Canonicals bei Blog und Referenzen.
  - `/preise` ist indexierbar, steht aber nicht in der Sitemap.
- Bleiben unberührt und kommen in MENSCHEN.md:
  - Login führt nach Erfolg zu `/admin`, das es nicht gibt.
  - Der Knopf „Cookie-Einstellungen“ im Kartenplatzhalter öffnet den Banner nicht (G8 Einwilligung).
  - Das Cookie-Inventar nennt Einträge ohne Code.
  - 4 Formulare ohne Einwilligungshäkchen.
  - Die Festpreis-Zusagen stehen im Widerspruch zu AGB § 2 Abs. 3.

## Abnahme (rekonstruiert, Kurzfassung; Schwellen aus Abschnitt 0, 6 bis 11)
- Z-01 Plan: 100 % Pflicht, Kür leer.
- Z-02 Bestand: Build, Typen, Linter, Tests ≥ E0, Funktionsliste vollständig, 0 neue Konsolenfehler.
- Z-03 Designsystem: 0 freie Werte in geänderten Dateien.
- Z-04 Gestaltung: Endprüfer ≥ 8 je Hauptansicht, keine Kategorie < 7, blinder Vorher-Nachher-Vergleich für den neuen Stand.
- Z-05 Bewegung: Register vollständig, B-01 und B-02 nach Spezifikation, reduzierte Bewegung, ≤ 5 % verworfene Bilder bei 4× gedrosselter CPU.
- Z-06 Grafik: eine Icon-Familie, SVGs optimiert und zugänglich, Logo-Vektor ≥ 98 % oder Ersatz-Intro.
- Z-07 Zugänglichkeit: 0 ernste oder kritische axe-Befunde, Tastatur, Fokus, Kontraste, Systemschrift 200 %.
- Z-08 Leistung: BUDGETS mit Intro (LCP ≤ 2,5 s, CLS ≤ 0,1, INP ≤ 200 ms, Lighthouse mobil 90/95/95/100, Bewegungscode ≤ 60 KB, Startbild ≤ 200 KB); E0 gilt, wenn besser.
- Z-09 Darstellung: 10 Gerätegrößen ohne Überlauf, Erstes Bild auf allen Hauptansichten.
- Z-10 Übergabe: BERICHT, KERN, MENSCHEN, Galerie, Anleitung.
- Z-11 Nutzerführung: P1 bis P5 lösen A1 bis A6 mobil und am Desktop, Schritte ≤ E0. Navigationsregeln, ein Hauptknopf je Seite, Startseite ≤ 1 Formular, Hauptweg ≤ 4 Pflichtangaben.
- Z-12 Texte: Schreibregeln per Skript auf allen Seiten, Stichproben bestanden, 0 Fakten außerhalb K-015.
- Z-13 Bilder: jede Hauptansicht mit echtem Bild, Startbild, Galerie mit Filter, Regler, 0 Metadaten, Alt-Regeln, keine erkennbaren Personen.
- Z-14 Adressen: alle Adressen aus `adressen-e0.csv` mit 200 oder 308 gleichwertig, 0 kaputte Links, je Seite 1 H1, Titel, Beschreibung, Canonical, gültige Daten, Sitemap vollständig.
- Keine AUSNAHME für Z-02, Z-11, Z-14.
- UMGEBUNGSAUSNAHMEN (in MENSCHEN.md): echte Geräte und echtes Safari oder Firefox (nur Chromium vorhanden), Bildrate auf echter Grafik, echtes Mobilnetz.

## Mengengerüst und Kapazität (Schätzung, PLAN.md legt fest)
- Etwa 330 Pakete:
  - E0: 20; E1: 6; E2: 25 (davon 10 Opus);
  - E3: 60; E4: 170 (75 Texter, 75 Lektor, 20 Baumeister);
  - E5: 30; Kür: 25.
- Modellanteil etwa 85 % Haiku, 15 % Opus.
- Tage ≈ 330 ÷ (5 × 10 Wellen) × 1,2 ≈ 8; die Laufzeit läuft bis alle Kriterien belegt sind.

## Kritische Dateien
- Rahmen: `src/app/(bestand)/_dokument.tsx`, `src/lib/motion/{kopfskript,bewegung,register}.ts`, `src/app/{globals,bewegung}.css`, `src/config/navigation.js`, `src/components/common/{Header,MobileMenu,Footer}.jsx`, `src/components/layout/MobileBottomBar.tsx`.
- Startseite: `src/app/(bestand)/page.tsx`, `src/components/start/*`.
- Bausteine: `src/components/kern/*`, `src/components/forms/HeroContactForm.tsx`, `src/components/reviews/GoogleReviewsBadge.tsx`.
- Daten: `src/config/{company,cities,services,topics,projects,musterbaeder,reviews}.*`.
- Adressen: `next.config.ts` (Weiterleitungen), `src/lib/wege.ts`, `src/app/sitemap.ts`, `src/app/video-sitemap.xml/route.ts` (zeigt auf fehlende Videos), `src/lib/{metadata,schema}.ts` (Bewertungstexte weichen vom Wortlaut ab).
- Neu: `src/components/verlegen/*` (B-01), `src/components/intro/*` und Logo-Vektor (B-02), `src/components/galerie/*`, `public/images/arbeiten/*`.

## Verifikation
- Je Paket Stufe A durch einen Haiku-Prüfer: Typprüfung und Linter der Dateien, betroffene Tests, Lesbarkeit der Seite, ein Bild mobil und am Desktop. Nach jeder Welle ein Build im Reinraum.
- Je Etappe Stufe B auf den Hauptansichten (Werkzeuge siehe E0) und Probeläufe.
- Neue Logik bekommt Tests nach `node --test`: Fliesenraster, Größenwahl ≤ 80, Linkfilter, Zustandsautomat von B-01, Intro-Schalter, Glossarprüfung, Weiterleitungen.
- Prüfwerkzeuge werden vor ihrem ersten Einsatz mit einer Positivprobe geprüft (Lernpunkt aus `_relaunch/LERNEN.md`).

## Risiken und Gegenmaßnahmen
- Lighthouse liegt schon heute an der Grenze (90, LCP 3,46 s). Speed Index kostet mit Intro 1 bis 3 Punkte. Gegenmaßnahmen:
  - LCP-Ursache zuerst (E2-ORCH-00); deckende Phase des Intros ≤ 800 ms in Kalk, Freilegung per `transform`.
  - Budget je Paket, Messung mit frischem Profil im Ruhefenster.
- `popstate`-Aufschub bricht mit Next (Wettlauf mit dem HistoryUpdater, Firefox ≤ 115) → sicherer Weg (b), Test für Zurück und Vor, Schalter in der Komponente.
- B-01 im Feld: Der Inhaltswechsel kommt nach 540 ms, also nach dem 500-ms-Eingabefenster der CLS-Messung. Verschiebungen bleibender Elemente zählen dort. Deshalb bewegt der Wechsel nur die Überlagerung, der Kopf bleibt fest. Eine Layout-Shift-Messung während des Wechsels steht im Test.
- Logo-Vektor erreicht keine 98 % → Ersatz-Intro nach Spezifikation.
- Bilder sind Screenshots mittlerer Qualität (fast alles Note B) → nur gute Ausschnitte, kein Vollbild am Desktop, gestaltete Fliesenkompositionen, wo nichts passt.
- Gedächtnisverlust durch Containerwechsel → Takt L2 und L4, WEITER-Routine, EINRICHTUNG.md mit Bildwiederherstellung.
- Platte voll → höchstens 2 Reinraum-Kopien, Bildsätze im Scratchpad, nur zugelassene Bilder ins Repo.
