# UM-E3-SCROLL · Notiz des Baumeisters (28.10.2026)

Paket: scrollbar-gutter, overscroll, svh, scroll-margin, content-visibility, passive Listener, Speculation Rules für öffentliche Seiten (PLAN-Zeile UM-E3-SCROLL; Z-07, Z-10).
Briefing `pakete/UM-E3-W3.md`, Kern 4.3. Arbeitskopie `w3/baum` (fortlaufend nach CURSOR), Stand vorher `w3/vor-UM-E3-SCROLL`, Diff `w3/UM-E3-SCROLL.diff`.
Hinweis zum Stand vorher: `rsync` fehlt in der Umgebung. Der Abzug entstand deshalb mit `tar --exclude=./node_modules`, also inhaltlich wie im Briefing. `diff -rq` gegen die Arbeitskopie war vor dem ersten Edit leer.

## Entwurf

Je Punkt der PLAN-Zeile, mit Bestand und Änderung:

| Punkt | Bestand vorher | Änderung |
|---|---|---|
| scrollbar-gutter | fehlte | `html { scrollbar-gutter: stable }` (globals.css) |
| overscroll | Banner (`overscroll-contain`) und B-01 hatten es, das Menü nicht | `.menue-liste { overscroll-behavior: contain }` |
| Dokumenthintergrund | `html` in Kalk wie Kopf und Einstieg | nur Kommentar, Anforderung war schon erfüllt |
| svh | `body` mit `100vh` (globals.css) und `min-h-screen` (_dokument.tsx). Einstiege nutzen keine vh. Die Sticky-Szene in bewegung.css hat schon `100svh` | `body` mit `100svh` und `min-h-svh` |
| scroll-margin | R-01a: `scroll-padding-top` an `html` ist die einzige Quelle des Sprungversatzes (96 px) | unverändert, siehe Entscheidung 3. Neu ist `scroll-padding-bottom` in der Menüliste für den klebenden Hinweis „Mehr darunter“ |
| content-visibility | `.spaet-zeichnen` mit `contain-intrinsic-size: auto 50rem` in rund 40 Dateien | keine Änderung in diesem Paket, Übergaben unter offene Fragen 5 |
| passive Listener, keine Scroll-Ereignisse | ReadingProgress: `scroll`-Lauscher ohne `passive`, `setState` bei jedem Ereignis. Inhaltsverzeichnis: `scroll` und `resize`, in jedem Bild `getBoundingClientRect` aller Überschriften | beide ohne Scroll-Ereignis, Einzelheiten unten |
| Speculation Rules | keine | Regelblock im `<head>` von `_dokument.tsx`, nur Abruf (`prefetch`); Vorrendern nach der Prüfung gestrichen, siehe Entscheidung 1 |

**Lesefortschritt (`ReadingProgress.jsx`, globals.css)**
- Kennt der Browser Scroll-Zeitstrahlen, zieht CSS die Linie: `@supports (animation-timeline: scroll())`, `html.k-bewegung:not(.k-notaus) .lesefortschritt-linie` (nach der Prüfung mit Notaus wie alle Startzustände), Keyframes `lesefortschritt-ziehen` (scale 0 → 1, linear). Das Muster ist dasselbe wie bei der Laserachse; `animation-timeline` steht nach der Kurzform.
- In diesem Fall läuft kein Skript (`CSS.supports(...)`).
- Rückfall ohne Zeitstrahl ist ein IntersectionObserver auf `<body>`.
  - Die Wurzel ist der Bildschirm, nach oben um 10⁶ px offen. Der Teil von `<body>` über dem unteren Bildrand wächst linear mit dem Scrollen, und 101 Schwellen melden jede Hundertstelstufe.
  - Der Anteil errechnet sich als `-rect.top / (rect.height − rootBounds.bottom)`. Das Skript liest dafür kein Layout und hält keinen React-Zustand; die Variable `--lesefortschritt` wird am Element gesetzt.
- Bei „ruhig“, reduzierter Bewegung und Notaus gibt es keinen Beobachter (`k-bewegung`, `k-notaus` und `bewegungRuhig()`). Ein Wechsel von Wahl oder Systemeinstellung kommt über `abonniereBewegung`.
- Das Notaus setzt das Kopfskript nach 2 s ohne Ereignis. Darum prüft jede Meldung des Beobachters die beiden Klassen: Bei Notaus trennt sie ihn und nimmt `--lesefortschritt` weg, die Linie steht bei 0 wie in der CSS-Fassung. Die Wahl „an“ im Schalter nimmt `k-notaus` weg und meldet den Wechsel, dann beobachtet die Linie wieder.
- Die Linie bleibt ausgeblendet (`motion-reduce:hidden ruhig:hidden print:hidden`, unverändert). Es gibt keine Regel an der Medienabfrage, also braucht es keinen Spiegel.

**Inhaltsverzeichnis (`TableOfContents.jsx`)**
- Ein IntersectionObserver ersetzt den Scroll-Lauscher. Die Wurzel reicht vom Bildschirm bis zur Kante (`scroll-padding-top` + 1 px, wie vorher) und ist nach oben 10⁶ px offen.
- Damit gilt `isIntersecting` genau für jede Überschrift, die die Kante erreicht oder passiert hat, auch nach einem weiten Sprung (Anker, Zurück, Seitensuche), bei dem die Überschrift die Kante nie im Bild kreuzt.
- Aktiv ist wie vorher die letzte Überschrift, die die Kante passiert hat.
- Bei `resize` (passiv, gebündelt über `naechstesBild`) wird der Beobachter neu aufgebaut, weil die Wurzel an der Fensterhöhe hängt.
- Die Links sind jetzt native Anker. `preventDefault` und `scrollIntoView({ behavior: 'smooth' })` entfallen (Entscheidung 5); die Markierung folgt beim Klick sofort.

**Speculation Rules (`_dokument.tsx`)**
- Nach `KOPFSKRIPT` steht `<script type="speculationrules">` mit 472 Byte JSON (Konstanten `NIE_VORLADEN`, `VORLADEN`).
  - Nur `prefetch` mit Eifer `moderate`: Zeiger 200 ms über dem Link oder Drücken. Geholt wird nur das HTML, es läuft kein Skript der Zielseite.
  - Kein `prerender` (nach der Prüfung gestrichen, Entscheidung 1).
- Kandidaten sind alle Links derselben Herkunft (`/*`). Ausgenommen sind:
  - die Pfade `/api/*`, `/login`, `/kontakt`, `/termin`, `/beratung`, `/preise`, `/bad/badanfrage`, `/bad/badplaner`, `/bad/projekt-check`, `/fliesen/konfigurator` und `/fliesen/festpreisangebot` (nach der Prüfung ergänzt), jeweils mit Unterpfaden;
  - Dateien: `/_next/*`, `/images/*`, `/*.pdf`;
  - per Selektor Links mit Anker (`[href*="#"]`), `[download]` und Links mit anderem `target`.
- Die CSP erlaubt den Block (`script-src 'unsafe-inline'`).

## Entscheidungen
1. **Nur Abruf beim Zeigen, kein Vorrendern (geändert nach der Prüfung).** Der erste Stand hatte dazu `prerender` mit `conservative` (beim Drücken). Zwei Prüfer haben das beanstandet, und beide Einwände stimmen nach dem Code:
   - **Statistik:** Ein vorgerendertes Dokument führt seine Skripte aus. `TrackingScripts.jsx` (Z. 17-35) sendet im Effekt `fbq('track','PageView')` ohne Blick auf `document.prerendering`. Mit Einwilligung und gesetzter `NEXT_PUBLIC_META_PIXEL_ID` zählte Meta Seiten, die nie gezeigt werden, und bekäme Daten dazu. Heute ist die ID leer; die Wirkung begänne mit dem Eintragen.
   - **Nutzen und Last:** Nach der Hydrierung fängt B-01 jeden internen Klick ab (`Verlegen.tsx`, Lauscher in der Capture-Phase, `router.push`). Das vorgerenderte Dokument wird deshalb nie aktiviert, kostet aber bei jedem Drücken Skript, Hydrierung und Bilder, parallel zu B-01. Vor der Hydrierung liegen zwischen Drücken und Klick nur Millisekunden.
   - Gewählt ist Weg (a) der ersten Notiz: nur `prefetch` (`moderate`). Er holt nur das HTML im Netzprozess, ohne Skript und ohne Rendern, und braucht keine gemeinsame Datei. Der Auftrag (AUFTRAG 8: „wo es fehlt, Abruf beim Antippen oder Zeigen“) ist damit in seinem Rückfall erfüllt; das Vorrendern selbst bleibt offen (offene Frage 1).
   - `eager` oder `immediate` wären bei dieser Lage Verschwendung und ein Risiko für Z-10.
2. **„Nie Formulare“ heißt: Arbeitsseiten, deren Inhalt das Formular oder der Rechner ist** (K-010-Liste ohne Rechtstexte und `/downloads`, dazu `/beratung` mit Calendly und, nach der Prüfung, `/fliesen/festpreisangebot`). Das Festpreisangebot führt KERN unter „Seitenarten“ bei den Arbeitsseiten (Z. 260), E-012 nennt es unter den Werkzeugen, und die Seite bettet `FliesenKonfigurator` ein. Ihr Kopfkommentar nennt sie Erzählansicht; maßgeblich ist KERN. Viele Erzählseiten tragen unten den Anfrage-Platzhalter, sie bleiben erlaubt; sonst bliebe fast nichts übrig. Muster nach URL Pattern: Ohne `?` und `#` gelten Suchparameter und Anker als Platzhalter. Das ist mit dem URLPattern von Node 24 gegen 34 Fälle geprüft.
3. **scroll-margin bleibt `scroll-padding-top` (R-01a).** Ein `scroll-margin` an Sprungzielen käme zu den 96 px hinzu und bräche R-01a, den Sprunghalter (rechnet Padding + Margin) und die Kommentare in Gewerke, Gewerk, Calendly und Preise. Die Pflicht „Sprungziele unter festen Leisten“ ist am Wurzelscroller damit erfüllt.
   - Eine echte Lücke gab es im Menü: Der klebende Hinweis „Mehr darunter“ liegt über den letzten sichtbaren Einträgen der Liste, und ein per Tab fokussierter Eintrag rollte unter ihn.
   - Lösung: `scroll-padding-bottom` an `.menue-liste`. Der Wert ist die Zeile in fs-1 plus vier Einheiten (Innenabstand 8 px, Rand 1 px, Fokusring 4 px), aus Tokens und mit der Systemschrift wachsend.
4. **`scrollbar-gutter: stable` nur an `html`.** Anders als `overflow` geht es nicht von `body` auf den Viewport über.
   - Folge: Bei offenem Menü (Sperre über `body`) rückt die Seite mit klassischen Leisten nicht mehr.
   - Auf kurzen Seiten bleibt rechts ein leerer Streifen in Kalk. Die zwölf Hauptansichten sind alle länger als der Bildschirm.
   - Überlagernde Leisten (Handy, macOS, Playwright headless) belegen keinen Platz, also bleiben die Pixel dort gleich.
5. **Inhaltsverzeichnis mit nativen Ankern.** So springt das Verzeichnis wie jeder andere Anker der Seite, mit Adresse, Zurück-Taste, Tab-Startpunkt an der Überschrift und `scroll-padding-top`. B-01 stempelt den Verlaufseintrag (`stempeln`, eigens für Anker derselben Seite gebaut). Der Sprunghalter hält das Ziel, wenn die Seite noch wächst. Weich scrollt der Sprung nur mit Bewegung, über `html { scroll-behavior }`; reduziert und „ruhig“ springt er sofort (Spiegel in bewegung.css).
   - Vorher: `behavior: 'smooth'` fest im Skript. Das bewegte auch bei „ruhig“ und reduzierter Bewegung (Verstoß gegen E-080). Die Adresse blieb ohne Anker, und der Sprunghalter griff nicht.
   - Die neue Folge für Nutzer steht in offene Frage 2.
6. **svh am `body`.** Am Desktop und in der Gerätenachbildung (keine Adressleiste) ist svh gleich vh, die Pixel bleiben also gleich. Mobil scrollt eine kurze Seite nicht mehr um die Höhe der Adressleiste. Es ist die einzige Viewport-Höhe in den vier Dateien; Einstiege und Sticky-Szenen tragen kein vh (bewegung.css hat schon svh).
7. **Rückfall des Lesefortschritts über IntersectionObserver statt Ausblenden.** So verlangt es das Briefing (scrollgebunden nur über `animation-timeline`, IO als Rückfall).
   - Die Auflösung ist 1 % des Anteils: höchstens 1,07 % Abweichung in der Probe, ohne Übergang.
   - Für Chromium und Safari läuft kein Skript; der Rückfall gilt vor allem Firefox.
8. **Kein neuer Test, keine Änderung an `package.json`.** Die PLAN-Zeile nennt keinen Test, und bestehende Testdateien gehören anderen Paketen. Geprüft wurde mit Proben im Scratchpad, siehe Prüfzahlen; ein Vorschlag steht in offene Frage 7.
9. **Konstante 10⁶ px zweimal**, in ReadingProgress und im Inhaltsverzeichnis, je mit Begründung. Ein gemeinsamer Ort wäre `src/lib/motion/*`, und das schreibt nur der Orchestrator.

## Offene Fragen und Übergaben
1. **Speculation Rules: Abruf messen, Vorrendern später entscheiden (Stufe A, Orchestrator).**
   - DevTools „Speculative loads“ oder CDP `Preload.*` auf Desktop und mobil: Wird der Abruf beim Zeigen ausgelöst, und keiner für die ausgenommenen Pfade (auch `/fliesen/festpreisangebot`)? Kein Vorrendern im Bericht.
   - Bleibt die Konsole leer (Suite „Konsole“)? Ein ungültiger Regelblock meldet Chrome dort.
   - Auch der Abruf wird nach der Hydrierung meist nicht genutzt (B-01 und `Link` holen RSC). Er kostet je Zeigen eine HTML-Anfrage im Netzprozess, ohne Skript. Bitte INP und Bildrate von B-01 mit und ohne Regeln vergleichen. Ist auch das zu viel, gilt der Regelblock nur bis zur Hydrierung (Skriptelement nach der Hydrierung entfernen, eine Zeile im `BewegungsWaechter`, gemeinsame Datei).
   - **Vorrendern wieder zuschalten** nur, wenn beides erfüllt ist: (1) `TrackingScripts.jsx` stellt den Meta-Start bei `document.prerendering` bis `prerenderingchange` zurück (G8-Nähe, Datei des Orchestrators), mit gesetzter Test-ID gegengeprüft; (2) die Messung zeigt einen Gewinn ohne Last für B-01, etwa mit dem Regelblock nur bis zur Hydrierung. Dann ist es ein Eintrag `prerender` neben `prefetch` mit denselben Ausnahmen.
   - Abweichung vom Wortlaut: KERN Regeln v4 und AUFTRAG 8 sprechen von „Vorrendern über Speculation Rules“. Ausgeliefert ist nur der Abruf. Bitte als Entscheidung festhalten oder Stufe A abwarten.
   - Liste der Ausnahmen bestätigen: `/preise`, `/beratung` und `/fliesen/festpreisangebot` ausgenommen, Rechtstexte und `/downloads` erlaubt.
2. **Inhaltsverzeichnis: neues Verhalten.** Jeder Klick setzt den Anker in die Adresse und legt einen Verlaufseintrag an; die Zurück-Taste führt zur vorigen Stelle im Artikel. Das ist natives Ankerverhalten (AUFTRAG 8: „Anker, Zurück-Taste … funktionieren unverändert“). Die Spec „Inhaltsverzeichnis: Klick springt zur Überschrift“ prüft nur die Sichtbarkeit und sollte grün bleiben. Bitte bestätigen.
3. **Überziehen unten.** Unter dem dunklen Fuß zeigt Safari beim Überziehen am Seitenende Kalk.
   - Oben ist der Rand richtig, weil Kopf, Einstieg und Dokument in Kalk sind.
   - Eine robuste CSS-Lösung für unten kenne ich nicht. `overscroll-behavior` am Wurzelscroller nähme das native Federn und mobil „Ziehen zum Aktualisieren“; das widerspricht AUFTRAG 8. Ein Verlauf am Hintergrund oder ein Schatten unter dem Fuß ist ohne Browser nicht belegbar.
   - Vorschlag: in WebKit ansehen (UM-4) und so lassen.
4. **Stufe A, ohne Browser nicht belegbar:**
   - Linie am Zeitstrahl in Chromium und Safari; der Rückfall in Firefox (große positive `rootMargin` am impliziten Wurzelelement).
   - `bewegung.mjs --modus register`: Die scrollgebundene Animation `lesefortschritt-ziehen` liegt an `data-motion="leitachse"`, also bekannt.
   - Menü bei 200 %: Ein fokussierter letzter Eintrag liegt über „Mehr darunter“.
   - Klassische Leisten am Desktop, schmales Fenster mit offenem Menü: 15-px-Streifen in Kalk rechts neben dem Blatt statt Seitensprung.
   - Pixel der 48 Paare sollten 0 bleiben. Begründung: svh = vh in der Nachbildung, keine Leisten in headless, die Linie zeigt denselben Anteil wie vorher.
5. **Übergaben an andere Dateien** (nicht in diesem Paket):
   - `min-h-dvh` der Suspense-Platzhalter in `ErzaehlSeite.tsx`, `WissensSeite.tsx` und `OrtsSeite.tsx`: dvh ändert sich mit der Adressleiste, solange der Platzhalter steht. Vorschlag svh (UM-E4-VORL).
   - Ratgeber-Artikel `/blog/[slug]` haben kein `spaet-zeichnen`. Der Text ist lang, und die Seite liegt mobil unter dem Budget (`/blog` 87). Eine Hülle je Kapitel wäre ein Hebel für UM-E3-LEISTUNG oder UM-E4.
6. **Positionswiederherstellung mit content-visibility (Z-07, Bestand seit E3-NACH-07).**
   - Was befürchtet wird: Nach Zurück auf eine lange Seite mit `spaet`-Abschnitten tragen noch nicht gezeichnete Abschnitte über der Stelle den Schätzwert 50rem, und die Stelle kann danebenliegen.
   - Ausnahme: Aus dem bfcache stimmt alles.
   - Bitte in Stufe A prüfen: tief scrollen, wechseln, Zurück.
7. **Testvorschlag für den Orchestrator** (Datei nach Wahl):
   - Statisch: `html` hat `scrollbar-gutter: stable`, `.menue-liste` hat `overscroll-behavior: contain`, `body` hat `100svh`.
   - Die Regeln in `_dokument.tsx` schließen `/api`, `/login` und die Formularansichten aus und enthalten kein `prerender`; dafür können `w3/scroll-pruef/muster.mjs` und `regeln.mjs` übernommen werden.
   - `ReadingProgress.jsx` und `TableOfContents.jsx` enthalten keinen `'scroll'`-Lauscher.
   - Die Logik prüft `w3/scroll-pruef/rauch.mjs`: geometrischer IntersectionObserver, 29 Prüfungen, 12 Gegenproben rot (dazu zwei für die Regeln).
8. **CSP:** Ändert sich die CSP später ohne `'unsafe-inline'`, braucht der Regelblock `'inline-speculation-rules'` oder einen Hash.

## Nacharbeit nach der Prüfung (zwei Prüfer, sieben Befunde)
Jeder Befund ist am Code nachgeprüft.
- **Befunde 1 bis 4 (mittel, zwei Paare zum selben Kern): bestätigt, behoben.** `prerender` ist gestrichen, nur `prefetch` (`moderate`) bleibt. Damit führt keine nie gezeigte Seite Skripte aus, also auch kein Meta-Pixel, und beim Drücken läuft kein Vorrendern neben B-01. `TrackingScripts.jsx` bleibt unberührt (Orchestrator-Datei, G8-Nähe). Bedingungen für ein späteres Zuschalten stehen in offene Frage 1. Die Konstanten heißen jetzt `NIE_VORLADEN` und `VORLADEN`.
- **Befunde 5 und 6 (gering): bestätigt, behoben.** `'/fliesen/festpreisangebot{/*}?'` steht in der Ausnahmeliste; die Mustertests haben drei neue Fälle für diese Adresse und einen Grenzfall (`/fliesen/festpreisangebote` bleibt erlaubt).
- **Befund 7 (gering): bestätigt, behoben.** CSS `html.k-bewegung:not(.k-notaus) .lesefortschritt-linie`; im Rückfall prüft `stellen()` auch `k-notaus`, und jede Meldung des Beobachters prüft die Klassen, weil das Notaus ohne Ereignis kommt. Beim Trennen fällt die Variable weg, die Linie steht bei 0.

## Prüfzahlen (Arbeitskopie, Node 24.22.1, nach der Nacharbeit)
- `npm test`: 243 von 243 bestanden, 0 Fehler. Die Zahl ist gleich, kein Test neu, kein Test gelockert. Die Wächter Schalter 4 und 5 sowie Eingang (`_dokument.tsx` ohne „Intro“) bleiben grün.
- `npx tsc --noEmit -p .`: 0 Fehler. `next-env.d.ts` wurde vorübergehend angelegt und wieder gelöscht, ebenso `tsconfig.tsbuildinfo`.
- `npx eslint` (`_dokument.tsx`, `ReadingProgress.jsx`, `TableOfContents.jsx`): 0 Fehler, 0 Warnungen. `globals.css` liegt außerhalb der ESLint-Konfiguration; übergeben kommt nur die Warnung „File ignored“.
- `werte.mjs --arbeitsbaum --dateien` (die vier Dateien, kommagetrennt): 0 Befunde.
- globals.css mit `@tailwindcss/postcss` gebaut (`w3/scroll-pruef/css-bau.mjs`): ohne Warnung, alle neuen Regeln im Ergebnis, die Linie unter `html.k-bewegung:not(.k-notaus) .lesefortschritt-linie`.
  - Die Regel des Lesefortschritts liegt im Layer `utilities`, im selben Muster wie `leitachse-ziehen`.
  - lightningcss kürzt `scroll(root block)` zu `scroll(root)`.
- Speculation Rules (`w3/scroll-pruef/regeln.mjs`, `muster.mjs`): JSON gültig, 472 Byte, ohne `</script`, nur die Art `prefetch` (die Probe weist `prerender` jetzt ab). URL-Muster 38 von 38 richtig (13 erlaubt, 25 ausgenommen, darunter fremde Herkunft, `mailto:`, `tel:` und `/fliesen/festpreisangebot` mit Unterpfad, Suche und Anker).
- Rauchprobe (`w3/scroll-pruef/rauch.mjs`, nicht Teil des Pakets; JSX über `typescript.transpileModule`, nachgebautes React, IntersectionObserver nach Spezifikation mit Kanten und Schwellen): 29 von 29.
  - Lesefortschritt: linear, höchstens 1,07 % Abweichung; monoton; 0 oben, 1 unten, 0 ohne Scrollweg; Sprünge; kein Skript mit Zeitstrahl; „ruhig“ und reduziert beim Laden und zur Laufzeit; Notaus beim Laden und zur Laufzeit (getrennt, Variable weg, weiteres Scrollen zieht nichts), Wahl „an“ danach; Abbau.
  - Inhaltsverzeichnis: gleiche Markierung wie das alte Verfahren an 1.067 Stellen, mit 400 Zufallssprüngen und je vier Stellen an jeder Kante, auch nach einem Höhenwechsel. Mehrere `resize` ergeben einen Neuaufbau. Kein `preventDefault`. Abbau mit denselben Optionen.
- Gegenproben, alle rot, Kontrolle grün:
  - Inhaltsverzeichnis ohne offene Oberkante (777 Abweichungen) und Kante ohne +1 px (10);
  - `resize` nicht passiv; `preventDefault` zurück;
  - Lesefortschritt ohne offene Oberkante; grobe Stufen (11 %); ohne `bewegungRuhig()`; Skript trotz Zeitstrahl;
  - neu: ohne Klassenprüfung in der Meldung (2 rot), ohne `k-notaus` in `frei()` (3 rot), ohne `removeProperty` (2 rot);
  - neu: Ausnahmeliste ohne Festpreisangebot (3 rot in `muster.mjs`), `prerender` zurück (`regeln.mjs` bricht ab).
- Der Diff (344 Zeilen) lässt sich auf den Stand vorher anwenden (`patch`), und das Ergebnis gleicht der Arbeitskopie Datei für Datei. Das Repository blieb unberührt (`git status` leer, HEAD d1aa4448). Die Notiz vor der Nacharbeit liegt als `w3/scroll-pruef/notiz-vor-nacharbeit.md`.

## Dateien
- `src/app/globals.css`: `scrollbar-gutter`, `body` svh, `.menue-liste` overscroll und scroll-padding, Lesefortschritt am Zeitstrahl.
- `src/app/(bestand)/_dokument.tsx`: Speculation Rules (nur `prefetch`) und `min-h-svh`.
- `src/components/blog/ReadingProgress.jsx`
- `src/components/blog/TableOfContents.jsx`
