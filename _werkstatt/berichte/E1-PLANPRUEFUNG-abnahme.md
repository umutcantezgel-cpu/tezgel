# E1-PLANPRUEFUNG-abnahme

Kundschafter-/Prüferbericht aus der Planungsphase (10.10.2026, nur lesend, Arbeitsmodell bzw. Orchestrator-Unteragent). Stand: Commit 2362a5a.

**Befunde zur Abnahme-Abdeckung und Prüfbarkeit** (Repo-Pfade unter /home/user/tezgel/, „Plan Z.“ = Zeile im Plan)

**1. Z-08: Die LCP-Gegenmittel verfehlen die Hauptursachen** (Plan Z. 369–372)
- **Befund:** Mobil wird die Seite nach 1,36 s erstmals sichtbar, das größte Element aber erst nach 3,4 s (lighthouse.json). Es erscheint also spät, gebunden an JavaScript.
- Was der Plan nicht nennt:
  - `AuthProvider` und `ContentProvider` sitzen im Root-Layout (src/app/layout.tsx:14–15, 118–119). Sie laden zod, alle 13 Ratgebertexte (≈ 83 KB, src/services/dataService.js:9–15) und die Konfiguration in jedes Seitenbündel. Gebraucht werden sie nur auf `/login` und `/blog`.
  - `/blog` ist komplett `"use client"` (src/app/blog/page.jsx:1): LCP 6,6 s, TBT 255 ms.
  - Der Layoutsprung auf `/standorte` (CLS 0,516, nur in einem Teil der Läufe) hat kein Paket.
  - lighthouse.mjs:42 speichert weder das LCP-Element noch die Teilzeiten.
- **Verbesserung:**
  - E0-PRUEF-03 erfasst je Hauptansicht: LCP-Element und LCP-Teilzeiten, die verschobenen Elemente und das JS je Route. Dabei auch prüfen, ob das Banner das LCP-Element ist.
  - In E2-OPUS-05 (Orchestrator, gemeinsame Datei) die Provider an ihren Nutzungsort verlegen. Das braucht ein Denkprotokoll: Die Logik bleibt, nur der Einhängeort ändert sich.
  - `/blog` wird Server-Komponente mit kleiner Filter-Insel; F-16 schützt die Funktion.
  - Archivo auf die genutzten Achsenbereiche beschneiden und nur einen Schnitt vorladen.
  - Karte und Kalender (V-02) bekommen Platzhalter mit fester Höhe.
  - Lighthouse schon am E2-Tor messen.

**2. Z-08: Messbedingungen und Vergleichsregel sind offen** (Plan Z. 224, 308)
- **Befund:**
  - Offen ist, für welche Metrik und welche Form die „Spanne der drei E0-Läufe“ gilt. Desktop-LCP auf `/` streut nur 822–841 ms; damit zählt Rauschen als Verschlechterung.
  - Nicht festgelegt: Banner-Zustand, Messprofil (Lighthouse misst mit 412×823, nicht 390×844), Benchmark-Band, ruhiges Messfenster. Der Vorlauf nutzte den Median aus 5.
  - Lighthouse ≥ 90, Schriften ≤ 250 KB, Bewegungs-JS ≤ 60 KB und die Icon- und Illustrationsgrenzen hängen an keinem Kriterium.
- **Verbesserung:**
  - In ABNAHME festschreiben: Erstbesuch mit Banner, Dritt-Hosts gesperrt, Standardprofil, Benchmark-Index ±15 % (sonst Lauf wiederholen), kein Agent während der Messung.
  - Vergleichsregel je Metrik und nur mobil, Toleranz = max(Spanne, 10 % bzw. 3 Punkte).
  - Die übrigen Budgets als Belegfelder unter Z-08 und Z-06 führen; `font_kb` und `js_kb` werden schon gemessen.

**3. Z-03 lässt sich so nicht prüfen** (Plan Z. 74, 303)
- **Befund:**
  - Im Code stehen 1.806 Abstände außerhalb der Skala.
  - Touch-Ziele `h-11`/`w-11` (44 px, K-007) kommen 155-mal vor, Icongrößen `w-5`/`w-3.5` etwa 770-mal. Zählen Größen als Abstand, steht Z-03 gegen die Touch-Regel.
  - Durch die Prüfliste fallen: Tailwind-Standardfarben, `rounded-*`, `shadow-*`, `duration-200`, `text-4xl` und Altklassen wie `rounded-tile-*` (487-mal).
  - Es fehlen der Basis-Commit für „geänderte Dateien“ und Ausnahmen für SVG-Koordinaten und `next/og` (Kür 6 braucht Inline-Stile).
- **Verbesserung:**
  - `werte.mjs` als Positivliste bauen: jede Klasse über Tailwinds Designsystem (`@tailwindcss/node`, `candidatesToCss`) in CSS auflösen und nur KERN-Tokens zulassen.
  - Die Abstandsskala nur für p, m, gap, space, inset und translate. Eigene Größen-Tokens für Icons (16/20/24) und Touch-Ziele (44).
  - Basis = E0-Commit, Ausnahmeliste in ABNAHME.
  - Beim Abbau der Altsysteme `--color-*: initial` usw. in `@theme` setzen; Reste fallen dann sichtbar auf.

**4. Z-02 lässt sich aushöhlen, der Vorrat hat keinen Abnahmetest** (Plan Z. 189, 302, 329–332)
- **Befund:**
  - Die Testdateien (`werkzeuge/tests`) fehlen in der Dateihoheit. Haiku baut die Funnels um und kann Selektoren „anpassen“.
  - „Bekannte fixme“ lässt V-01 offen (funktion-einwilligung.spec.mjs:144).
  - V-06 ist nicht prüfbar, weil alle Tests per `bedienbar()` auf die Hydrierung warten (FUNKTIONSLISTE.md:28–29).
  - Der Fehler aus V-02 tritt nur auf, wenn die Uhr nicht auf dem Build-Tag steht (MESSUNGEN.md:27).
  - „17/17“ stimmt nicht mehr, sobald neue Tests dazukommen.
  - Ob Tracking erst nach Einwilligung lädt, testet nichts (TrackingScripts.jsx lädt nur mit Env-IDs).
- **Verbesserung:**
  - Tests ändert nur der Orchestrator, mit Vermerk, dass der Test gleichwertig bleibt.
  - Abnahmetest je V-Paket: V-01 fixme entfernt; V-02 läuft mit Uhr auf Build-Tag + 1; V-06 läuft mit gesperrtem `_next/static`; V-04 liefert 308.
  - Z-02 lautet „alle grün, ≥ 17“.
  - In E0 einen F-11-Fall mit Dummy-`NEXT_PUBLIC_GA4_ID` ergänzen.

**5. Die Text-Invarianten melden Fehlalarme** (Plan Z. 355; texte.mjs:22, 33)
- **Befund:**
  - Verglichen werden `innerText`-Zeilen bei 1440 px. Schon das Entfernen von `uppercase` (95-mal) und neue Tabellen in Schriftfeld, Kopf oder Fuß erzeugen massenhaft „entfernt“.
  - Was nur mobil sichtbar ist, wird nie geprüft.
  - Offen ist auch, ob die 462 Badge-Texte (z. B. page.tsx:76) unantastbarer Text oder Mikrotext sind.
- **Verbesserung:** Wortfolge aus `textContent` je Block vergleichen, dazu ein Lauf bei 390 px. Ein Denkprotokoll klärt die Badge-Texte, zum Beispiel: Wortlaut bleibt als Mono-Etikett.

**6. Z-05 misst das Falsche** (Plan Z. 220, 305)
- **Befund:**
  - rAF-Zeitstempel erfassen nur den Hauptthread. CSS- und scroll-gebundene Animationen laufen im Compositor, die Schwelle ≤ 5 % ist so immer erfüllt.
  - Die Scroll-Szenen laufen nur, wenn tatsächlich gescrollt wird.
  - Der Register-Abgleich geht nur in eine Richtung: Animationen ohne `data-motion` (etwa 115-mal `hover:-translate-y`) sieht er nicht.
- **Verbesserung:** Verworfene Bilder per CDP-Tracing zählen, während `Input.synthesizeScrollGesture` scrollt; DPR festlegen. Den Abgleich in beide Richtungen führen: `getAnimations()` plus berechnete `transition-property` bei Scrollen, Hover und Fokus.

**7. Bei den Umgebungsausnahmen fehlt der Ersatzpfad** (Plan Z. 312–315)
- **Befund:** Chromium kann `animation-timeline` und View Transitions. Den statischen Endzustand, den Safari < 26 und Firefox sehen (browserslist in package.json: safari ≥ 16.4, firefox ≥ 111), prüft niemand.
- **Verbesserung:** Bildsatz und axe der Szenen-Ansichten zusätzlich mit `--disable-blink-features` aufnehmen; die genauen Feature-Namen in E0 prüfen.

**8. Prüfstufe A widerspricht sich** (Plan Z. 332 gegen Z. 336)
- **Befund:**
  - Z. 332 sagt „Haiku startet keinen Build“, Z. 336 verlangt einen Build durch einen Haiku-Prüfer.
  - Ein Build überschreibt das `.next` des laufenden Servers 4310.
  - Die Dev-Bilder zeigen das Dev-Overlay und über gemeinsame Importe auch Zwischenstände gleichzeitiger Pakete.
- **Verbesserung:**
  - Wellen-Build per `reinraum.sh` im Worktree, danach 4310 neu starten.
  - Overlay vor dem Foto per CSS ausblenden.
  - Gleichzeitige Pakete zusätzlich nach Importgraph trennen.

**9. Z-04/Z-09: Aufnahmeprotokoll und Werkzeug fehlen** (Plan Z. 218–226)
- **Befund:**
  - Für den Vorher-Bildsatz sind Einwilligung, Bewegung und Ausschnitte nicht festgelegt. Alte Bilder mit Banner und Bubble verzerren den Blindvergleich.
  - Bewegung ist im Standbild unsichtbar.
  - Geprüft wird nur Überlauf, nicht abgeschnittener oder überlappender Text.
- **Verbesserung:**
  - Ein gemeinsames Aufnahmeprotokoll für vorher und nachher (Einwilligung „abgelehnt“, reduzierte Bewegung, feste Scrollpositionen).
  - Der Endprüfer bekommt zusätzlich die 5-Bild-Folgen der großen Momente.
  - Ein Überlappungsprüfer vergleicht Textflächen mit festen Ebenen und der Leitachse.
  - Die Stichprobe wird mit fester Zufallssaat nach Familien geschichtet gezogen.

**10. Z-01 kann nie abgeschlossen werden** (Plan Z. 190–199, 301)
- **Befund:** Z-01 verlangt „Kür leer“, aber Kür 8 und 9 sind offen formuliert.
- **Verbesserung:** Jede Kür-Position bekommt eine Schwelle, zum Beispiel für 9: LCP ≤ 2,0 s.

**Was bleiben soll**
- Den Vorlauf übernehmen (E-001), ohne neue Variantenrunde.
- Die Pflichtliste aus den Kriterien herleiten, bis „alle 76 Seiten auf Systemstand“.
- Gemeinsame Dateien schreibt nur der Orchestrator.
- E0 misst die Ausgangswerte in den neuen Größen und nimmt den Vorher-Bildsatz vor jeder Änderung auf.
- Bewegung CSS-first mit statischem Endzustand; 3D begründet verworfen.

### Critical Files for Implementation
- /home/user/tezgel/src/app/layout.tsx
- /home/user/tezgel/src/app/blog/page.jsx
- /home/user/tezgel/_relaunch/werkzeuge/lighthouse.mjs
- /home/user/tezgel/_relaunch/werkzeuge/texte.mjs
- /home/user/tezgel/_relaunch/werkzeuge/tests/funktion-einwilligung.spec.mjs
