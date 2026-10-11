# P3-16-GEG · Rückgabe · Frischer Gegenprüfer Kandidat-Tor `/` (Opus, Stufe 3) · 11.10.2026

Arbeitsweise: nur lesend. Belegdateien selbst geöffnet und nachgerechnet; `diff -r` Kandidat-Kopie ↔ Repo; `git diff/show/log`; GET an 4331 (Kandidat) und 4323 (Basis), höchstens eine Anfrage pro Sekunde (`/` und eine unbekannte Adresse je Server). Kein POST, kein Browser, kein Build. Meine Auswertungsskripte und Abrufe liegen in `scratchpad/geg316/`.

## Urteile

### 1. Freischalt-Schwelle erfüllt: **nein**
| Rang | Urteil | Begründung (Belege unten) |
|---|---|---|
| 1 Grenzen und Leitplanken | **nein** | G5/G4 grün: keine neuen Drittanbieter, Tracking-Komponente gleich, keine Geheimnisse, keine Prüfumgebungs-Weiche. UNANTASTBAR grün: Überschriften, Logo, Rechts- und Einwilligungstexte gleich. **Leitplanke Wahrheit rot:** Der neu gebaute Kern zeigt 16× „Verifizierter Kunde“, obwohl das Projekt selbst diese Angabe als unbelegt eingestuft und in MIKROTEXTE zur Entfernung freigegeben hat (H-1). |
| 2 Bestand und Funktion | ja | Suite 350 grün, 0 rot, 16 übersprungen auf 4331. Jede live erreichbare Funktion ist in Kern und Bestand geprüft (siehe unten). Reinraum grün. Hooks werden gemeinsam genutzt (G9). |
| 3 Barrierefreiheit und Leistung | **bedingt** | axe `/` 0. Eine harte Kennzahl nach E-018 steht nicht auf 0: `fokus_2px` ist „rot“, „dünn“ = 1. Sie wird als „0 harte Kennzahlen“ berichtet (M-1). Sachlich ist sie zulassbar, die Regel muss aber nachgezogen werden. TBT mobil reißt das Budget neu (M-4). |
| 4 DoD der Seite | **nein (offen)** | Z-04: Die Tastatur-Abweichung +3 ist formal ein Verstoß gegen „nie höher“. Der in E-023 angekündigte ABNAHME-Eintrag fehlt (M-3). Die Probelauf-Belege für den Endstand sind lückenhaft (M-2). Jury +2,6 ✓. |

### 2. Nichts schlechter als der Bestand: **nein**
Im strengen Sinn ist der Kandidat in vier gemessenen Größen schlechter:
- Tastatur a1/a5 +3 Schritte (M-3)
- TBT mobil 140 → 224 ms, damit über dem Budget (M-4)
- Region am Desktop in der Fünf-Sekunden-Probe 5/5 → 0/5 (M-6)
- CSS-Zoom-Emulation horizontal 0 → 1, laut E-018 nur Information (N-1)

Nur die Tastatur-Abweichung ist durch eine Entscheidung (E-023) gedeckt. Alles andere ist gleich oder besser: Leistungspunkte, LCP −7,8 %, INP, axe, a11y-Kennzahlen (Bestand 44 „dünn“, 130 „verdeckt fest“), Jury, Kernantworten der Fünf-Sekunden-Probe 10/10.
→ Das Urteil kann „ja mit begründeten Abweichungen“ werden, wenn H-1 behoben ist und M-3, M-4 und M-6 mit Denkprotokoll in ENTSCHEIDUNGEN bzw. ABNAHME stehen.

## Befunde

### hoch
**H-1 · „Verifizierter Kunde“ bleibt im Kern trotz eigener Wahrheitskorrektur (Rang 1)**
- **Ort:** `src/components/kern/start/Stimmen.tsx:67` (`<Icon name="haken" … titel="Verifizierter Kunde" />`).
- **Beleg:**
  - MIKROTEXTE, Zeile `/ | Verifizierter Kunde | – | 4 | P3-12`: „Wahrheitskorrektur: ‚verifiziert‘ ist für die Kundenstimmen nicht belegt“.
  - Kandidat-HTML (GET 4331 `/`): 16× `<title id="k-icon-titel_…">Verifizierter Kunde</title>`, je Stimme.
  - `texte2-vergleich.json` führt es als gelb „hinzu aria:svg-title“. Die Freigabezeile ist also unwirksam, weil der Code nie geändert wurde.
  - `P3-12.rueckgabe.md:136` hatte es ausdrücklich offen gelassen.
  - Im Bestand steht dasselbe (aria-label). Schlechter wird es also nicht. Die Schwelle verlangt aber Rang 1 grün, und nach eigenem Präzedenzfall (E-014, P3-00k) werden Rang-1-Fehler sofort behoben.
- **Verwandt:** `Vertrauen.tsx:56` „verifizierte Google-Rezensionen“ ist wortgleich mit dem Bestand und von keiner MIKROTEXTE-Zeile gedeckt. Bitte im selben Zug entscheiden.
- **Vorschlag:** `titel` entfernen. Der Haken bleibt dann `aria-hidden` oder entfällt. Danach Text v2 und die Stimmen-/Karussell-Fälle neu laufen lassen, neue Kandidat-Kopie. Hält jemand die Angabe für belegt, gehört das als E-Eintrag mit Quelle dazu und die MIKROTEXTE-Zeile gestrichen.

### mittel
**M-1 · Harte Kennzahl „dünn“ als 0 berichtet; die Zahl „2 %“ ist nicht belegt**
- **Ort:** `ERGEBNIS.md` (Zeile a11y-zusatz), E-023 („Die harten Kennzahlen stehen auf 0“).
- **Beleg:**
  - In `t2-bcd8fcb/a11y-zusatz.json` steht `status.tastatur.fokus_2px = "rot"` und `kennzahlen.tastatur.m375_erstbesuch.fokus_unter_2px = 1`.
  - E-018 zählt „Fokusring < 3:1 oder < 2 px (‚dünn‘)“ zu den harten Kennzahlen.
  - Befund nr 81 (`div.relative.snap-x`, Stimmen-Karussell): 1492 Kontrastpixel bei U = 1526, also 0,98·U. „ok“ verlangt 1,5·U. Am erwarteten 2-px-Ring fehlt damit rund die Hälfte, nicht „2 %“.
- **Sachlich zulassbar**, weil:
  - dasselbe Element ohne Banner „ok“ misst (`m375_abgelehnt` 0);
  - die Mitte frei ist (`fokus_verdeckt_fest` 0, WCAG 2.4.11 erfüllt);
  - der Grund `ring-unter-fester-ebene` ist, keine Ringstärke;
  - der Bestand 44 solche Fälle hat.
- **Vorschlag:** ERGEBNIS und E-023 berichtigen und Zahl und Ursache korrekt nennen. Danach eines von beiden:
  - E-018 nachtragen: ein Ring, der teilweise unter dem nicht-modalen Banner liegt, zählt wie „Ring teilverdeckt (fest)“ als Information;
  - oder das Werkzeug so umstellen, dass es diesen Fall nicht als „dünn“ zählt.

  Optional: `scroll-padding-bottom` bei offenem Banner um dessen Höhe erweitern.

**M-2 · Probelauf-Gegenprobe für den Endstand unvollständig; Methodenwechsel ohne Denkprotokoll**
- **Ort:** E-023 „Endstand bcd8fcb-k …“; ERGEBNIS Zeile Probeläufer.
- **Beleg** (`probelauf/gegenprobe/*`, Felder `base`, `ziel.handlungen_bis_ziel`):
  - Auf 4331 (bcd8fcb-k) liegen nur vier Wege vor: a2-touch 4, a3-maus 5, a4-touch 8, a5-touch 10. a5 lief mit geänderter Eingabe `gegenprobe-d548/a5-m375-touch.json`.
  - Die Tastatur-Wege a1 (26) und a5 (117) stammen von 4327 (bf63dbe-k). a3-touch (12) stammt zuletzt von 4328 (d548bab-k). Für „a3 Touch 12“ am Endstand gibt es keine Datei.
  - Acht Wege wurden nie nachgespielt: a1 maus/touch, a2 maus/tastatur, a3 tastatur, a4 maus/tastatur, a5 maus. Für sie gibt es nur den freien Lauf auf ad80754 (4326). Danach änderten d548bab, 21f1f01, bf1ad72 und bcd8fcb Hero-Formular, Mobilmenü, Hauptnavigation und content-visibility.
  - „Gegenprobe … alle gleich“ deckt also 7 von 15 Wegen ab.
- **Methode:** Die Gegenprobe ist als Rauschfilter tragfähig: gleiche Eingaben, Wiederholungen, auch auf der Basis. a3-touch schwankt auf der Basis selbst zwischen 12 und 15, das ist belegt. Sie misst aber nur die Weglänge, nicht die Auffindbarkeit.
  - PROBELAUF §3 schließt Gegenproben aus dem Bewertungssatz aus. E-023 ersetzt dennoch die freie Bewertung durch sie, und zwar erst, nachdem 7 von 15 freien Läufen über dem Bezugswert lagen.
  - Ein Denkprotokoll mit drei Wegen und Umkehrprobe fehlt.
  - Am Endstand gibt es keinen freien Lauf.
  - Das ist noch kein Schönrechnen, aber eine nachträgliche Messregel mit unvollständiger Deckung.
- **Vorschlag:**
  - alle 15 Eingaben des Ausgangsstands auf dem Endstand-Kandidaten mindestens einmal nachspielen, die 7 früher abweichenden zweimal;
  - die 7 früher abweichenden Wege einmal frei laufen lassen;
  - E-023 um ein Denkprotokoll ergänzen und PROBELAUF §3 nachtragen.

**M-3 · Tastatur-Abweichung: Ursache bestätigt, Begründung teils falsch, ABNAHME-Eintrag fehlt**
- **Beleg:**
  - **a1:** Schritt 2 hält die Basis den Fokus auf „Badsanierung“ (clientseitiger Wechsel, Kopf bleibt). Schritt 3 braucht dort 18 Tabs. Beim Kandidaten lädt die Seite voll, der Fokus startet am Dokumentanfang, Schritt 3 braucht 21 Tabs.
  - **a5:** dasselbe Muster, +3 in Schritt 3. Die 87 Tabs in Schritt 5 sind in beiden Ständen gleich.
- **Bewertung:** Die Zahl ist ehrlich. Die Kosten folgen aus der Architektur nach E-015, wo der volle Neuladevorgang als „unkritisch“ hingenommen ist.
  - Unzutreffend ist der Satz, der Bezugswert „beruhe auf dem Fehler des Bestands“. Der „hoch“-Befund des Bestands betrifft Schritt 5 (Fokus im Inhalt an alter Stelle). Der Vorteil in Schritt 2 ist der stehende Kopf, und dass das ein Fehler ist, ist nicht gezeigt.
  - E-023 kündigt „offene Abweichung in ABNAHME Z-04“ an, aber `ABNAHME.md:11` enthält nichts dazu.
- **Vorschlag:** die Begründung auf E-015 stützen, den ABNAHME-Eintrag nachholen, in W1 neu messen.

**M-4 · TBT mobil reißt das Budget neu**
- **Beleg:** `lighthouse-vergleich.json`, Median TBT: Basis 140 ms (Läufe 128–193), Kandidat 224 ms (Läufe 188–327). Die Verteilungen sind fast getrennt. Das Budget aus AUFTRAG BUDGETS und K-013 liegt bei ≤ 200 ms; die Basis hielt es auf `/`, der Kandidat nicht. Dazu Schriften 77 → 182 KB und JS +35 KB, beide im Budget.
  - Die Z-12-Formel (Punkte bzw. LCP) schlägt nicht an, formal also „nicht schlechter“.
  - ERGEBNIS führt es nur als „nicht blockierend“, ohne Entscheidung.
- **Vorschlag:** E-Eintrag mit Denkprotokoll (Ursache, z. B. Hydration von Banner, Hero und Karussell; Plan), oder vor der Freischaltung beheben.

**M-5 · Freischalt-Commit-Weg kann so nicht „GLEICH“ melden**
- **Beleg:**
  - `freischalten.sh --commit` bricht ab, wenn HEAD ≠ `KANDIDAT_BASIS`. HEAD ist fc87ace, also bcd8fcb plus fünf Beleg- und Werkzeug-Commits, darunter e35370b mit `texte2.mjs`.
  - Mit `KANDIDAT_BASIS=HEAD` fehlt `reinraum-fc87ace-k` → ROT.
  - Der Pflichtvergleich `diff -rq` schließt `_relaunch/` nicht aus, und die Kopie bcd8fcb-k weicht dort ab (14 Einträge).
  - Der Quelltext ist gleich: `git diff bcd8fcb..HEAD -- src public package*.json next.config.ts test scripts` ist leer. `diff -r` Repo ↔ Kopie zeigt nur die fünf erwarteten Einträge (dazu unten mehr).
- **Vorschlag:** neue Kandidat-Kopie am aktuellen HEAD (`KANDIDAT="/" reinraum.sh HEAD`); die Belege übertragen sich, weil der Quelltext gleich ist. Kein Umgehen der Prüfung, kein händisches `git mv`.

**M-6 · Region am Desktop-Erstbildschirm verloren; Fünf-Sekunden-Probe nicht am Endstand**
- **Beleg:**
  - `t2-ad80754/fuenf/bewertung.json`: regional d1440 bei ad80754 0/5, Ausgangsstand 5/5.
  - Bild `start-d1440.jpg`: Der Banner verdeckt „aus Aßlar“.
  - `kopf-b/Marke.tsx`: Das Etikett „Fachbetrieb Aßlar · Wetzlar“ ist `xl:hidden`, ab 1280 px also nur noch im aria-label.
  - `belege/fuenf-bcd8fcb/` enthält nur `fotos-ergebnis.json`, keine Antworten und keine Bewertung. Die Probe am Endstand fehlt.
  - Die Schwelle nach PROBELAUF §8 (alle drei ≥ 4/5, Summe ≥ Basis) ist erfüllt.
- **Vorschlag:** Probe auf bcd8fcb-k wiederholen. Regionale Angabe am Desktop im ersten Bildschirm frei von Banner (z. B. Kennzeile), oder E-Eintrag.

### niedrig
- **N-1 · Zoom per CSS-Emulation:** horizontal 0 → 1. Der Kopf ab xl läuft bis 2135 px; „Aufmaß anfragen“ und „Über uns“ sind nie im Bild (`a11y-zusatz.json`, `ergebnisse.zoom[0]`). Laut E-018 nur Information; die Äquivalenz-Messung 640 × 400 @2 ergibt 0. In ERGEBNIS nicht erwähnt, bitte vermerken.
- **N-2 · Text v2:**
  - e35370b ist nicht zu großzügig: Ein Paar entsteht nur, wenn die Ersetzung genau stimmt (`n(a.split(alt).join(neu)) === b`), der Typ gleich ist und es keine Überschrift ist.
  - Der Kommentar spricht von „Abschnitt“, der Code paart aber über alle Lücken der Seite. Das ist harmlos, weil exakt.
  - Lockerer ist die vorbestehende Volatil-Regel (`^[A-ZÄÖÜ]$`, `^[0-9] / [0-9]$`). Sie paart 15 entfernte Avatar-Initialen mit 15 neuen „5 / 5“ als „geändert/volatil“. Vorschlag: Volatilität nur innerhalb desselben Musters.
- **N-3 · Google-Markenzeichen an den Stimmen entfällt** (MIKROTEXTE P3-12, K-010). Das widerspricht AUFTRAG §7 („Fremde Marken-, Partner- und Zahlungslogos bleiben unverändert“). Die Quelle steht als Text „Google Rezension“. Konflikt in MENSCHEN vermerken.
- **N-4 · Belege von älteren Kandidaten:**
  - von ad80754: SEO, SVG, Bewegung, Slop, Jury, Fünf-Sekunden, Pixel;
  - von bf63dbe-k: Mutationsprobe 2 und P3-14e, obwohl `MUTATION-2.md` unter t2-bcd8fcb liegt.
  - Seit ad80754 sind nur Kern-Dateien geändert (selbst geprüft: `git diff ad80754..HEAD --name-only -- src` nur `kern`/`(kern)`; `globals.css` hat `@source not` auf die Kern-Ordner). Für Pixel gilt der Nachweis damit durch Bauart.
  - Die Mutationen K8, K10, K11 (Mobilmenü) und K14 (Hero) liegen in Code, der danach noch geändert wurde. Die Suite ist am Endstand grün.
  - Vorschlag: Kandidat je Beleg in ERGEBNIS nennen.
- **N-5 · axe-Abdeckung:** auf `/` nur m375 und d1440 (normal, Menü mobil, Erstbesuch). Es fehlen t768, d1920, das offene Mega-Blatt am Desktop und der Fehlerzustand der Formulare (AUFTRAG §11 Ebene 5).

## Selbst bestätigt
- **Freischalt-Diff (N-08):** `diff -r` Repo ↔ `reinraum-bcd8fcb-k` zeigt nur fünf Einträge:
  - `(bestand)/page.tsx` entfernt;
  - `_entwurf/page.tsx` und `_entwurf/not-found.tsx` nach `(kern)/` verschoben, byte-gleich;
  - dazu `CLAUDE.md`, das im Arbeitsbaum geändert ist; die Kopie entspricht dem Commit.

  Erhalten bleiben `(bestand)/layout.tsx`, `not-found.tsx`, `_dokument.tsx` und alle Unterrouten. Die privaten Entwürfe `p3-*` bleiben ungeroutet. Eine unbekannte Adresse liefert in beiden Ständen 404 mit Bestands-Schale.
- **Überschriften:** H1–H3 auf `/` in Wortlaut und Reihenfolge gleich; einziger Unterschied ist das weiche Trennzeichen in „Quadrat­meter“.
- **Kopfbereich:** Titel, Canonical, robots, OG-/Twitter-Titel und JSON-LD-Hashes gleich. Die Beschreibung entspricht genau MIKROTEXTE Klasse 4.
- **Links:** Kein Linkziel fällt weg, neu ist eine WhatsApp-URL.
- **Fremd-Hosts:** Neu ist nur `www.openstreetmap.org`. Es kommt nur als `children` des Kartenplatzhalters im RSC-Strom vor (hinter der Einwilligung) und war im Bestand schon Kartenanbieter (E-021).
- **G5/G4:** kein `navigator.webdriver`, kein Headless- oder Lighthouse-Schalter, keine Geheimnisse; `TrackingScripts` ist dieselbe Komponente.
- **Logo:** dieselbe Datei `tezgel-logo.webp` mit 140 × 44 und `h-auto`.
- **G9:** Die Kern-Formulare und die Einwilligung nutzen die gemeinsamen Hooks (`useHeroKontakt`, `usePreisrechner`, `useAnfrageFunnel`, `useEinwilligungsBanner`, `useKartenEinwilligung`, `useWhatsAppKanal`). Die Platzhalter-Änderung (Hash `#cookie-settings`) lässt die Logik unverändert; der Hook setzt den Hash zurück.
- **Einwilligung (E-013):** Text und Kategorien laut Text v2 nur „neu gegliedert“, Wortlaut vollständig enthalten. „Alle ablehnen“ hat auch der Bestand in den Einstellungen (`CookieConsent.tsx:703`).
- **Funktionen F-01…F-19:**
  - Die Suite deckt `/` (Kern) und die Bestandsorte ab: Preisrechner `/preise`, Funnel `/kontakt`, Karten `/standorte` und `/kontakt`, FAQ `/faq`, Navigation `/leistungen`, Einwilligung `/kontakt`, dazu 404, Blog und Login.
  - F-01 und F-19 des Bestands sind nach der Freischaltung nirgends mehr live; `HeroContactForm` und `ReviewCarousel` hängen nur an `(bestand)/page.tsx`.
- **Jury nachgerechnet:** 0,4·7 + 0,3·6,5 + 0,2·7,5 + 0,1·6,5 = 6,9. Bestand 4,30, Lockvogel 4,80–4,95, also innerhalb von 1 Punkt.
- **Messwerte:** Lighthouse- und INP-Zahlen wie berichtet. Reinraum-Log k7 grün.

## Nicht geprüft
- Kein Browserlauf (verboten). Die Werte zu Fokus, Bewegung, Reflow, Probeläufen und INP sind nur aus den Belegdateien geprüft, nicht nachgemessen.
- Die Bilder der Fünf-Sekunden-Probe am Endstand (`fuenf-bcd8fcb`) liegen nicht im Repo; Banner und Erstbildschirm am Endstand habe ich nicht gesehen. Gesichtet: ad80754 und Ausgangsstand d1440.
- Bewegungsregister, SVG-Prüfung und Slop am Endstand: nur die Belege von ad80754 gelesen.
- Der Inhalt der Einwilligungsdialoge ist nur über Text v2 geprüft; sie werden im Client gerendert und stehen nicht im Server-HTML.
- Vercel-Build und -Laufzeit, echte Geräte (M-06), Firefox und WebKit.
- Kern-Code vor `1efad2a~40` habe ich nur stichprobenhaft gelesen (Stimmen, Marke, Platzhalter, Layout, Seite), nicht vollständig.
- Ob „Verifizierter Kunde“ doch belegt ist (Quelle beim Betrieb), kann ich nicht prüfen. Ich folge der Einstufung in MIKROTEXTE.
