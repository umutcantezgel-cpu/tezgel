# E3-W1 Lagebild (Workflow wf_39e2dd06-e37, 24.10.2026, nur gelesen)

## Karte der Startseite

KARTE DER STARTSEITE (Stand HEAD, nur gelesen). Rahmen in src/app/(bestand)/page.tsx:32-52: <Seitenformel> (data-seitenformel) > StartEinstieg (1 worum, außerhalb der Leitachse) > <Leitachse> > EINE Suspense-Grenze (Platzhalter div min-h-dvh, :40) mit Lagefliesen (2 lage), WasWirTun (3 tun), StartAblauf (4 ablauf), Arbeiten, Kundenstimmen, Einsatzorte (je 5 beleg) und TerminAnfrage (6 schritt, H2 #termin). Alle Texte stehen fest in den TSX (Quelle laut Kopfkommentar _werkstatt/texte/REF-start.md). Ein src/inhalte/start.ts gibt es nicht. Alle Abschnitte ab 2 außer TerminAnfrage zeichnen spät (Abschnitt spaet → .spaet-zeichnen, globals.css:369-386, content-visibility auto, 50rem). Hauptziel auf / ist #termin (navigation.js:70-72, Hauptknopf als einfaches <a>, Hauptknopf.tsx:45).

SVG-Bewegungen auf / gibt es NUR im Einstieg: sig-kreuzlinie (rote Waage, Lot, Lot des Plans), sig-flucht (vier H1-Zeilen) und sig-plan (ab lg „laden“, unter lg „zeigen“). Dazu kommen startbild (unter lg, Sicht 0,4) und leitachse (Scroll) über alle Abschnitte ab 2. Sonst gibt es nur druck und zustand (Interaktion) sowie im Formular laden. einzugsband, szene-ablauf und fugenband kommen auf / NICHT vor. Die Maßkette der Einsatzorte ist statisch. auftritt und anriss sind ebenfalls ungenutzt.

Zeitplan beim Laden ohne Intro, reines CSS ab dem ersten Bild unter html.k-bewegung (bewegung.css:856-947):
- Waage und Lote wachsen 0 bis 1200 ms (dauer-5, linear). Das Lot nach dem Knick folgt 1200 bis 1520 ms.
- Die H1-Zeilen rücken 12 px ein (dauer-4 · ease-setzen), versetzt um 0, 120, 240 und 360 ms.
- Das Plan-Raster rückt 320 bis 1120 ms in die Flucht.
- Mit Intro (html.k-intro-start, nur auf /) beginnt alles 800 ms später (--intro-gesamt · 0,5, :894-919).
- Bei Zurück und Vor (html.k-verlauf aus Verlegen.tsx:308-310) gilt animation:none, also der Endzustand (:921-932). Der erste Seitenwechsel nimmt k-startbild und k-intro-start weg (Verlegen.tsx:301-303).

Kopplungen, die eine Umstellung brechen kann:
- .kreuzlinie-aus-start (Ursprung 75 % + 1rem, bewegung.css:849-855) ist an lg:grid-cols-12, gap-x-12, Plan in Spalte 7 bis 12 und -left-4 gebunden. teile/Einstieg teilt 7/5.
- Die Intro-Reihen ab lg (bewegung.css:414-428) sind an pt-32 + Firmensitz-Zeile fs-1 + mt-4 + fs-7-Zeilenhöhe gebunden.
- Die Flucht wirkt nur auf Block-Kinder der H1 (StartEinstieg.tsx:54-58, 89-94).
- Die Leitachse beginnt erst NACH dem Einstieg (page.tsx:35-39, E3-START-02). ErzaehlSeite dagegen schließt den Einstieg in die Leitachse ein (ErzaehlSeite.tsx:30-31).
- LCP ist der Vorspann (E-041). Kein Bild auf / hat lcp: Startbild lcp=false (Startbild.tsx:16), Bildfeld ab lg ohne lcp (StartEinstieg.tsx:175). teile/Einstieg setzt dagegen bei einer Bild-Kennung als Text lcp (teile/Einstieg.tsx:88).

Stand der vorlagen/teile: Heute nutzt / daraus nur Passstuecke (teile/Lage.tsx:32) und Bereichsfliesen (teile/Tun.tsx:53). Kein teil trägt bisher sig-kreuzlinie, sig-flucht oder sig-plan. Dem teile-Einstieg fehlen Planblatt, Zeilen-H1, Fugenkreuz, Firmensitz, @container und flach. Weitere Abweichungen, die bei einer 1:1-Umstellung sichtbar würden, stehen je Baustein.

### `src/app/(bestand)/page.tsx`
- Rolle: Rahmen der Startseite: Seitenformel, Einstieg außerhalb der Leitachse, danach eine Suspense-Grenze mit sechs Abschnitten (5 beleg ist dreigeteilt)
- Bewegungen: keine eigene; Leitachse (data-motion=leitachse, Scroll) über Lagefliesen bis TerminAnfrage (:39-49)
- Abhängigkeiten: kern/Seitenformel, kern/Leitachse, start/StartEinstieg, start/Lagefliesen, start/WasWirTun, start/StartAblauf, start/StartBeleg (Arbeiten, Kundenstimmen, Einsatzorte), start/TerminAnfrage, lib/metadata createMetadata (:26-30)
- Besonderheiten: Die Leitachse beginnt erst am Fuß des Einstiegs (:35-39), damit ab lg bei scrollY 0 kein roter Stummel neben Waage und Lot steht (E2-SICHT-2 Befund 3). In ErzaehlSeite.tsx:30-31 umschließt die Leitachse den Einstieg, das ist anders. Eine Suspense-Grenze statt sieben (Blockierzeit E-034). Der Platzhalter min-h-dvh (:40) hält den Fuß unten (CLS E-036).

### `src/components/start/StartEinstieg.tsx`
- Rolle: 1 Worum es geht, als Planblatt (E-037). Links H1 in vier festen Zeilen (TITEL_ZEILEN :58), Ort, Vorspann, Hauptknopf #termin, Anruf, WhatsApp. Rechts Bewertungszeile über dem geschnittenen Verlegeplan Bad. Unter der Waage das Foto. Exportiert Bewertungszeile (:28-52), die StartBeleg ebenfalls nutzt.
- Bewegungen: sig-kreuzlinie, Auslöser Laden, CSS ab dem ersten Bild. Unter lg wächst das Lot neben dem Text (.kreuzlinie-lot, :76-78; bewegung.css:868-870, dauer-5 linear).; sig-kreuzlinie ab lg, Waage über die ganze Breite: .kreuzlinie-waage.kreuzlinie-aus-start (:180-182; bewegung.css:849-855, 871-873). Ursprung calc(75% + 1rem) = Lot des Plans.; sig-kreuzlinie ab lg, Lot nach dem Knick: .kreuzlinie-lot.kreuzlinie-nach-waage (:184-186; bewegung.css:875-879), dauer-2 nach dauer-5, gesamt 1,52 s.; sig-kreuzlinie als Hülle um den lg-Plan (:161-163). Das Lot des Plans wächst von der Schnittkante nach oben (bewegung.css:881-885, 889-893, überstimmt die sig-plan-Achsregel :714-719).; sig-flucht an der H1 (:88): Kinder rücken 12 px ein, dauer-4 · ease-setzen, Staffel 0/2/4/6 × 60 ms (bewegung.css:934-947).; sig-plan data-flucht=laden am lg-Plan (über Verlegeplan :121-122): Raster dauer-4 nach dauer-2 (bewegung.css:700-705).; sig-plan data-flucht=zeigen am mobilen Plan (:158-160): auf grobem Zeiger IO 40 % (register.ts:40, bewegung.css:695-699), auf feinem Zeiger Hover (:689-694), Übergang dauer-3.; Mit Intro (k-intro-start) beginnen alle oben genannten Bewegungen 800 ms später (bewegung.css:894-919). Mit k-verlauf gilt animation:none (:921-932). Bei Druck und forced-colors sind sie aus (:948-955).; druck an Hauptknopf (:115), Anruf (:120) und WhatsApp (:134).
- Abhängigkeiten: kern/Hauptknopf (href #termin, erstesBild, breit), kern/Verlegeplan (plan bad: einmal ohneAchse bemassung=false flucht=zeigen; einmal schnitt flucht=laden) und wandEinzug(), kern/Bildfeld (start-dusche-boden ab lg), start/Startbild (unter lg), kern/Fugenkreuz, kern/Rufnummer, kern/zusammen, kern/stile (knopfKlassen, seitenKlassen), icons/Icon, ui/WhatsAppLogo, config/company COMPANY_DATA, config/reviews RATING_SUMMARY, lib/whatsapp, globals.css .planblatt-wand (:351-355, nur ab lg margin-inline var(--wand)) und .plan-buendig (:363-365)
- Besonderheiten: ERSTES BILD: data-erstes-bild an ueberschrift (:88), ort (:100), hauptknopf (über Hauptknopf) und kontakt (:119). Das Logo steht im Kopf. H1-id ist start-titel (die Vorlage nutzt seite-titel mit tabIndex -1). RASTER AB LG (:71): 12 Spalten, gap-x-12, zwei Zeilen. Zeile 1: H1-Block (Spalte 1-6) und Bewertung + Plan (Spalte 7-12, self-end). Zeile 2: Text (sticky top-24, :98) und Foto (Spalte 7-12, planblatt-wand). Die Waage liegt auf der Oberkante von Zeile 2. UNTER LG eine Spalte: Text, ganzer Plan bündig, hohes Startfoto, dann die Bewertungszeile (max-lg:order-1, -mt-8, :154-155). Ab md stehen Plan und Foto in Spalte 3-8. Die Reihenfolge Ort, Hauptknopf + Anruf, Vorspann gilt auf jeder Breite (order-1, :107). WhatsApp erst ab xl (max-xl:hidden, :137), in der Vorlage schon ab lg. 200 % SCHRIFT: @container auf dem H1-Block (:81). Unter 20rem (@max-xs) entfällt Firmensitz, die H1 steht in fs-5 und die Zeilen sind inline (:87-90). @container an der Knopfreihe (:114) für Rufnummer @max-2xs. Rufnummer inline-block (:127). Bewertungszeile geteilt mit @max-md (unter 28rem eigene Zeile, :31-42). FLACH (orientation landscape, Höhe ≤ 32rem; globals.css:7): pt-16, ohne Firmensitz, H1 fs-6 und inline. In flach und @max-xs sind die H1-Zeilen inline, translate wirkt dort nicht, die Flucht ist also unsichtbar. INTRO-KOPPLUNG: Die Oberkante der H1 (pt-32 + Firmensitz fs-1 + mt-4) ist die Bezugslinie der Intro-Reihen ab lg (bewegung.css:414-428, --intro-h1 = spacing·36 + Zeile fs-1). LCP: kein Bild mit lcp, laut E-041 ist der Vorspann das LCP-Element. Das jeweils verborgene Bild (lg:hidden bzw. hidden lg:block) lädt nicht (:166-177). ABWEICHUNGEN ZU teile/Einstieg.tsx: dort Raster 7/5 mit self-center, H1 ein Textknoten mit text-balance, Brotkrumen, Vorspann max-sm:order-1, WhatsApp max-lg:hidden, Bildfeld mit lcp bei Kennung als Text, kein Plan, keine Kreuzlinie, kein Fugenkreuz, kein @container, kein flach.

### `src/components/start/Startbild.tsx (mit src/lib/motion/startbild.ts)`
- Rolle: Hohes Startfoto start-dusche unter lg. Darüber liegt ein Belag aus Fliesen (3 Spalten, 8 Reihen, Drittelverband), der Reihe für Reihe nach links abzieht.
- Bewegungen: startbild, Auslöser Sicht 0,4 (register.ts:25). bewegung.ts setzt data-motion-stand=an.; CSS bewegung.css:579-640: nur unter html.k-startbild.k-bewegung:not(.k-notaus) und width < 64rem. Reihen translate über dauer-4 · linear mit --a/--d aus startbildReihen() (startbild.ts:53-71). Danach wird die Decke per step-end auf visibility hidden gesetzt.
- Abhängigkeiten: kern/Bildfeld (arbeit start-dusche, lcp Standard false), lib/verlegen/raster (belegeFlaeche, zeitplan, versatzStufe, ANTEIL_ZIEHEN), kopfskript: k-startbild nur ohne Intro und bei erlaubter Bewegung (kopfskript.ts:166), Verlegen.tsx ohneStartbild() (:301-303)
- Besonderheiten: Die Decke ist dekorativ (aria-hidden) und reines CSS, kein LCP-Kandidat. Ohne Klasse, reduziert, bei Notaus, im Druck und bei forced-colors ist das Foto sofort frei (bewegung.css:635-640). Nur auf /. Großer Moment beim Eintritt des Fotos unter lg (K-007). Ab lg steht das Querformat start-dusche-boden ohne Belag.

### `src/components/start/Lagefliesen.tsx`
- Rolle: 2 Ihre Lage: sechs Lage-Fliesen (LAGEN :92-100, fünf Fotos und eine Zeichnung riss), je ein Link. Ab lg zwei Streifen zu drei Fliesen, der rechte um 16 versetzt, mit Passstücken.
- Bewegungen: zustand an jedem Link (:146, Hover bg-kalk dauer-1); Fugenkreuz der Leitachse an der Oberkante (Abschnitt leitachse)
- Abhängigkeiten: kern/Abschnitt (id ihre-lage, formel lage, leitachse, spaet, className lg:pb-16), vorlagen/teile/Lage Passstuecke, kern/Fliesenkomposition (motiv riss, deutlich), next/image mit ARBEITEN (alt leer, blur), icons/Icon
- Besonderheiten: Wrapper relative lg:mb-16 (:131). Er hält Versatz und unteres Passstück innerhalb der spaet-Hülle, die sonst beschneidet (E-041). Zusammen mit pb-16 ergibt das 128 px. 200 %: @container je Fliese (:137); unter 20rem steht das Bild als Streifen über dem Satz und der Pfeil darunter. ABWEICHUNG ZU teile/Lage.tsx: Markup der Fliesen fast gleich (LageFliesen :41-77). Die Vorlage nutzt jedoch lg:pb-32 statt pb-16 + mb-16 und kein spaet. Die einleitung ist dort ein eigener Prop, nicht Teil von LageInhalt.

### `src/components/start/WasWirTun.tsx`
- Rolle: 3 Was wir tun: Kopf seitlich mit Einleitung (Fachwort untergrund) und vier Bereichsfliesen mit Plan-Vignetten (bad, wohnen, aussen, reparatur). Unter dem Kopf steht die Vignette Untergrund mit Bildunterschrift (Fachwort abdichtung).
- Bewegungen: keine SVG-Bewegung, die Vignetten sind statisch; zustand an den Links der Bereichsfliesen (teile/Tun.tsx:62)
- Abhängigkeiten: kern/Abschnitt (id was-wir-tun, formel tun, leitachse, spaet, kopf seitlich, unterKopf), vorlagen/teile/Tun Bereichsfliesen, kern/vignetten/Untergrund, kern/Fachwort
- Besonderheiten: 200 %: Bereichsfliesen haben @container; unter 20rem eine Spalte ohne Zeichnung, ab 36rem zwei Spalten, ab 48rem 3:2. Die Glossar-Reihenfolge hängt hier: abdichtung wird in der Bildunterschrift erklärt, StartAblauf nutzt danach erklaert={false}. ABWEICHUNG ZU teile/Tun.tsx: Die Vorlage kennt nur Bereichszeilen, Punktfliesen, absatz und moment. Bereichsfliesen mit Vignette, unterKopf und spaet fehlen dort, das Modell TunInhalt hat kein vignette-Feld.

### `src/components/start/StartAblauf.tsx`
- Rolle: 4 So läuft es ab: drei Schritte an der roten Linie, ab lg als fallende Treppe (mt-16, mt-32, rote Setzstufe :98). Darunter drei Belege aus dem Faktenblatt (Kammer seit 2008, Abdichtung nach DIN 18534, Staubschutz).
- Bewegungen: keine; Linien statisch (border-laser); Leitachsen-Fugenkreuz
- Abhängigkeiten: kern/Abschnitt (id ablauf, formel ablauf, leitachse, spaet, flaeche fliese, lg:pb-32), kern/Fugenkreuz, kern/Fachwort (abdichtung erklaert=false, din-18534)
- Besonderheiten: Mobil senkrecht auf dem Lot der Leitachse (-ml-2 md:-ml-4, :84). ABWEICHUNG ZU teile/Ablauf.tsx Schritte: dort Zickzack (i%2 → lg:mt-16), keine Setzstufe und hinweis statt Belege-Liste, kein spaet. Eine Umstellung wäre sichtbar.

### `src/components/start/StartBeleg.tsx · Arbeiten`
- Rolle: 5 Beleg a: sechs Galeriefotos als verlegte Fläche, danach WeiterLink /referenzen
- Bewegungen: zustand am WeiterLink
- Abhängigkeiten: kern/Abschnitt (id unsere-arbeiten, formel beleg, leitachse, spaet), kern/Bildfeld flaeche, kern/WeiterLink
- Besonderheiten: 200 %: @container (:35); einspaltig unter 20rem, ab @xs zwei Spalten, ab @5xl drei. Deckt sich mit teile/Fotos (spalten 3, gleiche Klassen und sizes) und dem Verweis in teile/Beleg (mt-12). Die Vorlage hat aber kein spaet.

### `src/components/start/StartBeleg.tsx · Kundenstimmen`
- Rolle: 5 Beleg b: drei Stimmen wörtlich aus REVIEWS (c-wolf groß mit roter Unterstreichung, rabia-oe, elke-s), Bewertungszeile mit Stand unter der großen Stimme
- Bewegungen: keine (die Unterstreichung ist statisch, nicht anriss)
- Abhängigkeiten: kern/Abschnitt (id kundenstimmen, flaeche fliese, leitachse, spaet), Bewertungszeile aus StartEinstieg, config/reviews
- Besonderheiten: Ab lg Spalten 7 und 5. Linke Hülle lg:self-center, die Kennzeile darunter. Mobil löst sich die Hülle auf (contents) und die Kennzeile rückt per order ans Ende (:108-112). Große Stimme in lg:text-fs-5 (:81). ABWEICHUNG ZU teile/Stimmen.tsx: dort ohne Bewertungszeile, ohne lg:text-fs-5, ohne self-center. Stimme und markiert sind doppelt implementiert.

### `src/components/start/StartBeleg.tsx · Einsatzorte`
- Rolle: 5 Beleg c: Orte aus CITIES nach Entfernung ab Aßlar in drei Gruppen (nah, mittel, weit). Ab xl drei Spalten unter einer gemeinsamen Maßkette, darunter je Gruppe eine Maßkette. Link /standorte.
- Bewegungen: keine (statische Maßkette, NICHT einzugsband); zustand an den Orts-Links
- Abhängigkeiten: kern/Abschnitt (id einsatzgebiet, leitachse, spaet), lib/einzugszonen, lib/maps/getMapEmbedUrl CITY_HUB_DATA, config/cities, kern/WeiterLink, kern/Fugenkreuz (rot am Ursprung)
- Besonderheiten: 200 %: @container je Gruppe (:172); unter 18rem (@2xs) steht die Entfernung unter dem Ort, Trefffläche min-h-11. In vorlagen/teile gibt es kein Gegenstück (inhaltlich nahe am kern/Einzugsband, das aber animiert ist).

### `src/components/start/TerminAnfrage.tsx`
- Rolle: 6 Nächster Schritt: H2 #termin (Ziel aller Hauptknöpfe auf /, Laserlinie an der H2 über ziel), Formular HeroContactForm. Unter dem Kopf Rufnummer groß, WhatsApp und Öffnungszeilen.
- Bewegungen: zustand an Anruf und WhatsApp (:272, 286); druck und laden am Absendeknopf (kern/Knopf :51-55); zustand im Formular (HeroContactForm.tsx:148)
- Abhängigkeiten: kern/Abschnitt (titelId termin, formel schritt, leitachse, flaeche fliese, kopf seitlich, ziel, unterKopf, KEIN spaet), forms/HeroContactForm ('use client', titel false), kern/Rufnummer, lib/oeffnungszeiten, COMPANY_DATA, lib/whatsapp
- Besonderheiten: Sprungziel, darum ohne spaet (page.tsx:12-13). funktion-hero-kontakt.spec erwartet #termin im Bild. 200 %: @container (:266); unter 20rem steht der Hörer über der Nummer, die Nummer in fs-4. ABWEICHUNG ZU teile/Schritt.tsx: dort id naechster-schritt, Hauptknopf nach /kontakt statt Formular. Hilfen und Verwandte gibt es dort, hier nicht.

### `src/components/kern/Leitachse.tsx + Laserachse.tsx`
- Rolle: Lot im Seitenrand (ACHSE_LAGE left-2 md:left-4 lg:left-8, :156) über allen Abschnitten ab 2. Grundschicht fuge, rotes Stück wächst beim Scrollen.
- Bewegungen: leitachse, Auslöser Scroll: view-timeline --leitachse, animation-range contain 0-100 %, scale 1 0 auf 1 1 (bewegung.css:43-77); Grundzustand scale 1 0. Ohne k-bewegung animation none, das Lot bleibt grau (globals.css:413-418).
- Abhängigkeiten: kern/stile seitenKlassen, Abschnitt leitachse setzt das Fugenkreuz auf das Lot (Abschnitt.tsx:74-81, z-10)
- Besonderheiten: Das mobile Lot des Einstiegs (-left-2 md:-left-4 in der Textspalte) und das Lot nach der Waage (-left-4 im lg-Raster) stehen genau auf ACHSE_LAGE. Die Leitachse setzt sie ohne Versatz fort.

### `src/components/kern/Abschnitt.tsx`
- Rolle: Abschnitt-Hülle aller Startseiten-Abschnitte ab 2: Kopf gestapelt oder seitlich (mit unterKopf und order-Logik), Flächen, leitachse, spaet, ziel, formel
- Bewegungen: auftritt nur optional, auf / ungenutzt
- Abhängigkeiten: kern/Fugenkreuz, Leitachse ACHSE_LAGE, stile
- Besonderheiten: spaet setzt .spaet-zeichnen auf die innere Hülle (:82; globals.css:369-386, overflow-clip-margin 4 px). Was über die Hülle hinausragt, wird beschnitten. ziel setzt border-l-2 border-laser an die H2 (:55).

### `src/components/kern/Verlegeplan.tsx`
- Rolle: Gezeichneter Plan (SVG, Serverkomponente). schnitt zeigt nur die obere Hälfte bis zur Waage, ohne Waage. flucht laden oder zeigen setzt data-motion=sig-plan und data-flucht.
- Bewegungen: sig-plan: .plan-reihenteil mit --richtung ±1 und --plan-versatz (−0,35 Plattenbreite, :106-112, 125). laden: Animation plan-flucht (bewegung.css:700-705). zeigen: Übergang, Hover bzw. IO (:685-699).; sig-plan laden zieht die Achse auf (bewegung.css:706-723). Innerhalb von sig-kreuzlinie wird das überstimmt (:889-893).
- Abhängigkeiten: lib/plaene/geometrie, vorgaben, typen, CSS-Formen bewegung.css:653-678
- Besonderheiten: useId für eindeutige IDs je Instanz (Schraffur, Clip); auf / gibt es zwei Instanzen. wandEinzug() (:39-43) liefert --wand und --wand-aussen für planblatt-wand und plan-buendig.

### `src/components/kern/Seitenformel.tsx + Hauptknopf.tsx`
- Rolle: Seitenformel: Hülle data-seitenformel, FORMEL in fester Reihenfolge. Hauptknopf: die eine Hauptaktion.
- Bewegungen: druck am Hauptknopf
- Abhängigkeiten: navigation.js hauptziel('/') = #termin (:70-72)
- Besonderheiten: Ein Anker derselben Seite wird als <a> statt Link gerendert (Hauptknopf.tsx:45); B-01 lässt Anker derselben Seite aus. Der Pfeil hängt am letzten Wort (:33-41).

### `src/components/kern/Einstieg.tsx + Kreuzlinie.tsx + Planblatt.tsx (auf / NICHT genutzt)`
- Rolle: Älterer Einstieg (header) mit Prop kreuzlinie, Baustein Kreuzlinie (Lot, Waage, Kreuzpunkt) und Planblatt (Zeichenblatt mit Schriftfeld, planblatt-achse)
- Bewegungen: Kreuzlinie data-motion=sig-kreuzlinie (Kreuzlinie.tsx:9). H1 sig-flucht nur mit kreuzlinie (Einstieg.tsx:67).
- Abhängigkeiten: Planblatt wird von /bad/** und leistungen/detail/Planfeld genutzt
- Besonderheiten: Keine Seite setzt kreuzlinie, kern/Kreuzlinie ist faktisch tot. CSS ohne Nutzer: .kreuzlinie-grund, .kreuzlinie-lot-bildschirm, .kreuzlinie-aus-plan (bewegung.css:826-848). Mögliche Grundlage für den Vorlagen-Einstieg (Ursprung 75 % der Blattbreite).

### `src/app/bewegung.css (SVG-Bewegungen, Startbild, Intro, Leitachse)`
- Rolle: CSS-Fassung des Registers
- Bewegungen: sig-kreuzlinie :798-893 (Kommentar sagt noch „nur /“); Intro-Verzögerung nur unter .k-intro-start :894-919; k-verlauf :921-932; sig-flucht :934-947 (Staffel nur bis zum 4. Kind); sig-plan :679-723; startbild :579-640; leitachse :43-77; fugenband :79-113 (nicht auf /); szene-ablauf :735-771 (nicht auf /); einzugsband :773-797 (nicht auf /); Intro ab lg auf /: html.k-intro-start .intro :414-428
- Abhängigkeiten: Tokens dauer-2/4/5, staffel, ease-setzen, intro-gesamt aus globals.css
- Besonderheiten: sig-kreuzlinie und sig-flucht laufen ohne :not(.k-notaus); ein Notaus nach 2 s erzeugt trotzdem keinen Sprung (gleiche Keyframes in den Ersatzregeln). Die Intro-Verzögerung hängt an k-intro-start, das nur auf pathname '/' gesetzt wird. Auf anderen Seiten liefen die Einstiegsbewegungen beim Erstbesuch unter dem deckenden Intro-Blatt.

### `src/lib/motion/register.ts · bewegung.ts · kopfskript.ts (dazu Verlegen.tsx)`
- Rolle: Maschinenregister, IO-Modul und Startklassen
- Bewegungen: REGISTER (register.ts:20-44): sig-kreuzlinie, sig-flucht und einzugsband werden beim Laden gesetzt. startbild Sicht 0,4. sig-plan Sicht 0,4 nur auf grobem Zeiger. szene-ablauf, fugenband und leitachse über Scroll.; beobachte() (bewegung.ts:115-143): Laden-Kennungen bekommen per requestAnimationFrame data-motion-stand=an (das CSS der SIG-Bewegungen hängt nicht daran). Sicht-Kennungen über IntersectionObserver. Ohne aktive Bewegung wird alles sofort auf an gesetzt.; Kopfskript (kopfskript.ts:164-168): k-intro und k-intro-start nur beim Erstbesuch und nur auf '/'. k-bewegung. k-startbild nur ohne Intro. k-notaus nach 2 s ohne k-modul.; Verlegen.tsx:298-310: ohneStartbild() entfernt k-startbild und k-intro-start beim ersten Wechsel. verlauf() schaltet k-verlauf.
- Abhängigkeiten: kern/BewegungsWaechter (ruft beobachte nach jedem Pfadwechsel), _dokument.tsx (Kopfskript :117, Intro :126, INTRO_ZIEL :133, main#main-content :136, Verlegen :144)
- Besonderheiten: verlegen.spec.mjs (14) zählt auf / die Animationen unter [data-motion=sig-kreuzlinie] und [data-motion=sig-flucht]: beim Laden mehr als 0, nach Zurück genau 0. Das muss nach der Umstellung gleich bleiben.

Offene Fragen:
- Intro-Verzögerung für die Vorlagen: k-intro-start wird nur auf '/' gesetzt (kopfskript.ts:164) und steuert zugleich die Reihen-Geometrie des Intros, die an die H1 der Startseite gebunden ist (bewegung.css:414-428). Tragen Vorlagen-Einstiege sig-kreuzlinie, sig-flucht und sig-plan laden, laufen sie beim Erstbesuch einer anderen Seite unter dem deckenden Blatt ab. Braucht es eine eigene Klasse nur für die Verzögerung? Das betrifft Kopfskript und Verlegen.tsx, also gemeinsame Dateien des Orchestrators.
- .kreuzlinie-aus-start (Ursprung 75 % + 1rem) gilt nur für das 6/6-Raster mit gap-x-12 und -left-4. teile/Einstieg teilt 7/5. Soll der Vorlagen-Einstieg auf 6/6 wechseln, oder bekommt er eine eigene Ursprungsregel?
- ErzaehlSeite (und Wissens- sowie OrtsSeite) schließen den Einstieg in die Leitachse ein. Bekommt der Einstieg Waage und Lot, muss die Leitachse wie auf / erst nach dem Einstieg beginnen. Sonst stehen zwei Lote nebeneinander bzw. ein roter Stummel (E2-SICHT-2 Befund 3).
- Die Umstellung von / ohne sichtbare Änderung setzt Erweiterungen der teile voraus: Einstieg (Planblatt, Zeilen-H1, Fugenkreuz, Firmensitz, @container, flach, WhatsApp ab xl, Bild ohne lcp, Bewertungszeile), Tun (Bereichsfliesen mit Vignette, unterKopf), Ablauf (fallende Treppe mit Setzstufe, Belege-Liste statt hinweis), Stimmen (Bewertungszeile unter der großen Stimme, lg:text-fs-5, self-center), ein neuer Teil für die Einsatzorte, Schritt mit Formular statt Hauptknopf (hauptziel #termin) sowie spaet in allen Abschnitten außer Schritt. Wohin gehört die Bewertungszeile, die heute aus StartEinstieg exportiert wird?
- Inhaltsmodell: WorumInhalt.titel ist ein einzelner String. Die Flucht braucht aber Zeilen als Block-Kinder (StartEinstieg.tsx:54-58), dafür fehlt ein Feld titelZeilen. Fachwort mit erklaert={false} (StartAblauf.tsx:117) hängt an der Reihenfolge; kann Textmarken das abbilden? Ein src/inhalte/start.ts gibt es noch nicht.
- In flach und @max-xs werden die H1-Zeilen inline (StartEinstieg.tsx:90), damit wirkt die Flucht dort nicht. Ist das so gewollt, oder soll inline-block die Bewegung erhalten?
- KERN K-012 sagt noch: Startbild sofort mit hoher Priorität (eager, fetchPriority high). Seit E-037 steht im Code lcp=false, LCP ist laut E-041 der Vorspann. Muss KERN nachgezogen werden? Auch K-007 und der CSS-Kommentar bewegung.css:798 nennen sig-kreuzlinie noch „nur /“.
- Tote Teile: kern/Kreuzlinie, der Prop kreuzlinie von kern/Einstieg und die CSS-Klassen kreuzlinie-grund, kreuzlinie-lot-bildschirm, kreuzlinie-aus-plan haben keine Nutzer. Sollen sie als Basis für den Vorlagen-Einstieg dienen? Entfernen geht nach E-037 nur mit Rückfrage.
- Für den Bildvergleich vorher/nachher muss die Zeigerart festgelegt werden: Der mobile Plan (sig-plan zeigen) steht auf feinem Zeiger unter lg bis zum Hover aus der Flucht, auf grobem Zeiger erst nach IO 40 %. Außerdem müssen SIG (bis 1,52 s, mit Intro 2,32 s) und Startbild-Belag abgelaufen sein, und Intro sowie Einwilligungsbanner müssen gleich behandelt werden.

## Karte der Vorlagen

KARTE DER VORLAGEN (nur gelesen, nichts geändert). Unter src/components/vorlagen liegen 4 Vorlagen, das Modell inhalt.ts und 9 Teile. Echter Nutzer ist allein das Schaufenster werkstatt-schaufenster/erzaehlseite/page.dev.tsx:9 (ErzaehlSeite mit BARRIEREFREIES_BAD). OrtsSeite, WissensSeite und ArbeitsSeite bindet keine Seite ein; ortsInhalt() wird nur in test/orte.test.mjs benutzt. Die Startseite übernimmt aus teile/ nur Passstuecke (start/Lagefliesen.tsx:17,95) und Bereichsfliesen (start/WasWirTun.tsx:11,48).

BEWEGUNGEN: Keine Vorlage und kein Teil trägt heute selbst eine der Bewegungen aus E-037 (sig-kreuzlinie, sig-flucht, sig-plan, einzugsband, szene-ablauf, fugenband). Vorhanden sind nur leitachse über die Hülle Leitachse (kern/Laserachse.tsx:8), statische Fugenkreuze an den Abschnitten, druck an Hauptknopf/Anruf/WhatsApp und zustand an Links. Große Bewegungen kommen nur über Slots: momente.tun/ablauf/beleg in ErzaehlSeite (Ablauf ersetzt dann seine Schritte, dort passt SzeneAblauf), zeichnungen in WissensSeite, karte in OrtsSeite. sig-kreuzlinie und sig-flucht stehen im ganzen src nur in StartEinstieg; das Prop kreuzlinie von kern/Einstieg ist ungenutzt. sig-plan tragen die Bestandsseiten über Verlegeplan interaktiv bzw. flucht im Planblatt, einzugsband nur /standorte und /standorte/[stadt] (Bestand). fugenband gibt es nur als CSS (bewegung.css:79-114) und Registereintrag (register.ts:43); kein Element trägt .fugenband oder .fugenband-rot, auch CompanyHistory.jsx:6-7,31 nicht.

ABSTAND ZUR STARTSEITE: Seit E3-W0 ist die Startseite weiter als die Teile. Einstieg: Planblatt 6+6 mit Waage und Lot, H1 in festen Zeilen, Plan und Startbild gegen ein einfaches Raster 7+5 mit Bild. Ablauf: fallende Treppe mit Setzstufe gegen Zickzack. Stimmen: Bewertungszeile und lg:text-fs-5 fehlen im Teil. Einsatzorte haben kein Gegenstück. TerminAnfrage (Formular, Öffnungszeiten) hat kein Gegenstück; OrtSchritt kommt ihr am nächsten. Dazu kommen spaet mit Suspense und eine Leitachse erst ab dem Fuß des Einstiegs (E3-START-02, E3-LEIST-01). Fast deckungsgleich sind nur Lage-Fliesen und Fotos.

Lücken im Modell und in den Props (sie sperren die Umstellung ohne sichtbare Änderung): Es fehlen titelZeilen, Plan und Kennzeile, zwei Bilder mit Startbild, die Firmensitz-Zeile (an ihr hängt die Intro-Rechnung), eine Einleitung für Lage, Tun mit Plan-Zeichnungen und unterKopf, Belege im Ablauf, ein Abschnitt Einsatzorte, ein Schritt mit Formular sowie das Durchreichen von hauptziel und spaet. Die CSS-Regel für sig-kreuzlinie hängt fest am Raster der Startseite (.kreuzlinie-aus-start, bewegung.css:853-858). Das hauptziel #anfrage der OrtsSeite widerspricht heute navigation.js:70-72.

### `src/components/vorlagen/ErzaehlSeite.tsx`
- Rolle: Vorlage für Erzählseiten (K-009, alle sechs Teile in fester Folge): Seitenformel > Leitachse > Einstieg, Lage, Tun, Ablauf, Beleg, Schritt, danach wahlweise Werkzeug (:28-39). Eingabe: ErzaehlInhalt, momente {tun, ablauf, beleg} (:21), werkzeug (:23). Einziger echter Nutzer: Schaufenster erzaehlseite/page.dev.tsx:9.
- Bewegungen: leitachse über die Hülle Leitachse (kern/Leitachse.tsx:137-148, Laserachse.tsx:8; CSS bewegung.css:43-77, globals.css .leitachse-rot). Das Lot läuft auch durch den Einstieg, weil der Einstieg in der Leitachse liegt (:30-31).; Fugenkreuz je Abschnitt (Abschnitt leitachse), statisch.; szene-ablauf nur, wenn die Seite es als momente.ablauf übergibt (Ablauf.tsx:47).; Fehlt: sig-kreuzlinie, sig-flucht, sig-plan, startbild, einzugsband, fugenband, auftritt.
- Abhängigkeiten: kern/Seitenformel, kern/Leitachse, teile/Einstieg, teile/Lage, teile/Tun, teile/Ablauf, teile/Beleg, teile/Schritt, ArbeitsSeite.Werkzeug, inhalt.ts ErzaehlInhalt
- Besonderheiten: Abweichungen von (bestand)/page.tsx: (1) StartEinstieg steht außerhalb der Leitachse (page.tsx:35-39; E3-START-02: sonst roter Stummel unter dem Kopf). (2) Nach dem Einstieg folgt eine Suspense-Grenze mit Platzhalter min-h-dvh (page.tsx:40-48, E-033, E-034, E-036), die Abschnitte zeichnen spät (spaet). ErzaehlSeite hat weder Suspense noch spaet. (3) Kein hauptziel-Prop: Einstieg und Schritt führen fest zu /kontakt; die Startseite braucht #termin. (4) Kein Slot für den Einstieg (Plan, Kennzeile) und keiner für einen dritten Beleg-Abschnitt (Einsatzorte). (5) momente.beleg landet im Abschnitt unsere-arbeiten (Beleg.tsx:31), nicht als eigener Abschnitt.

### `src/components/vorlagen/WissensSeite.tsx`
- Rolle: Vorlage für Wissensseiten (K-009): dieselbe Folge wie ErzaehlSeite, an Stelle 3 stehen Wissensblöcke statt Tun (:29-35). Eingabe: WissenInhalt, zeichnungen (Record von Kennung auf ReactNode), werkzeug. Keine Seite nutzt sie.
- Bewegungen: leitachse über die Hülle, Fugenkreuze, druck und zustand aus den Teilen.; Kein momente-Slot: Ablauf und Beleg bekommen kein moment (:32-33), szene-ablauf hat also keinen Platz.; sig-plan oder verband nur, wenn die Seite einen Verlegeplan (interaktiv) oder VerbandUmschalter als zeichnung liefert (Wissen.tsx:36).; Fehlt: sig-kreuzlinie, sig-flucht und sig-plan im Einstieg.
- Abhängigkeiten: kern/Seitenformel, kern/Leitachse, teile/Einstieg, teile/Lage, teile/Wissen, teile/Ablauf, teile/Beleg, teile/Schritt, ArbeitsSeite.Werkzeug, inhalt.ts WissenInhalt
- Besonderheiten: Kein Gegenstück auf der Startseite. Die Bestands-Wissensseiten (z. B. untergrund-abdichtung/*, fliesen/*) tragen sig-plan zeigen im Planblatt des Einstiegs (Verlegeplan interaktiv). Mit dieser Vorlage verlören sie es (Regel aus E-037).

### `src/components/vorlagen/OrtsSeite.tsx`
- Rolle: Vorlage für Ortsseiten /standorte/[stadt] (K-009, E-024). Einstieg mit bild={karte} (ReactNode) und hauptziel #anfrage (:106), danach Lage, Tun, Ablauf und Beleg, am Ende ein eigener OrtSchritt (:40-99): formular-Slot (LeadQuickForm), Telefon, WhatsApp, Nachbarorte, titelId anfrage (:28, :44). Eingabe: Ortsinhalt (inhalte/orte.ts:15-17, ortsInhalt :19-81), formular, nachbarn, karte. Keine Seite nutzt die Vorlage.
- Bewegungen: zustand an Telefon, WhatsApp und Nachbarorten (:58, :72, :85).; leitachse über die Hülle.; Fehlt: einzugsband. Der Bestand /standorte/[stadt]/page.tsx:187-191 setzt Einzugsband (form stapel) ins Planblatt des Einstiegs und hat damit einzugsband (bewegung.css:773-796). Die Vorlage kann das nur über den Slot karte, und der landet als nacktes Bild ohne Planblatt und Schriftfeld in der Bildspalte des Einstiegs.; Fehlt außerdem: sig-kreuzlinie, sig-flucht, sig-plan.
- Abhängigkeiten: teile/Einstieg, teile/Lage, teile/Tun, teile/Ablauf, teile/Beleg, kern/Abschnitt, kern/Rufnummer, lib/whatsapp, inhalte/orte.ts (Ortsinhalt, ortsInhalt), inhalte/galerie.ts, navigation.js hauptziel
- Besonderheiten: OrtSchritt entspricht fast start/TerminAnfrage.tsx:23-81. Unterschiede: Nachbarorte statt Öffnungszeiten (TerminAnfrage :62-69); Telefon ohne @max-xs:text-fs-4 (TerminAnfrage :43); WhatsAppLogo mit shrink-0; Titel ohne zusammen(). OrtSchritt eignet sich als gemeinsamer Teil Schritt mit Formular, auch für die Startseite. Das hauptziel #anfrage des Einstiegs widerspricht navigation.js:70-72: Kopf, Menü und untere Leiste führen zu /kontakt (Z-11). Ziel (3) der Welle.

### `src/components/vorlagen/ArbeitsSeite.tsx`
- Rolle: Vorlage für Arbeitsseiten ohne Seitenformel (K-009): kompakter Einstieg (:61), danach Abschnitte (art arbeit, Fläche wechselt; :62-77). Eingabe: ArbeitsSeiteProps, in der Datei selbst und nicht in inhalt.ts typisiert (pfad, brotkrumen, titel, ort, vorspann, hauptziel als Pflichtfeld, abschnitte). Werkzeug (:40-56) nutzen auch ErzaehlSeite und WissensSeite. Keine Seite nutzt die Vorlage.
- Bewegungen: leitachse über die Hülle (Lot schon ab dem Kopf, der kompakte Einstieg liegt in der Leitachse).; druck am Hauptknopf und am Anruf des Einstiegs.; Keine großen Momente, wie K-007 es für Arbeitsseiten verlangt.
- Abhängigkeiten: kern/Leitachse, kern/Abschnitt, kern/Textmarken, teile/Einstieg (kompakt)
- Besonderheiten: hauptziel kommt als Prop. Für /kontakt muss navigation.js denselben Wert liefern; heute gibt hauptziel('/kontakt') den Wert '/kontakt' zurück, also einen Link auf die eigene Seite. Bestand /kontakt: Anker #express-anfrage, Überschriften termin-buchen-heading und express-anfrage-heading (kontakt/page.jsx:38,119,132).

### `src/components/vorlagen/inhalt.ts`
- Rolle: Inhaltsmodell (E-025). WorumInhalt :20-30, LageInhalt :33-39, Zeile :42-47, TunInhalt :50-59, AblaufInhalt :62-66, BelegInhalt :69-79, SchrittInhalt :82-88, ErzaehlInhalt :90-100, Wissensblock :103-113, WissenInhalt :115-124. Texte als Markentext mit [[id|Wort]].
- Bewegungen: Keine Felder für Bewegung (kein Plan, keine Flucht, keine Kreuzlinie, keine Titelzeilen).
- Abhängigkeiten: config/arbeiten ArbeitId, kern/Fliesenkomposition Kompositionsmotiv, kern/Brotkrumen Krume, lib/textmarken
- Besonderheiten: Lücken gegenüber der Startseite: WorumInhalt hat titel nur als String, kein titelZeilen (StartEinstieg.tsx:58), keine Einstiegszeichnung oder Plan, keine Kennzeile, kein Firmensitz-Etikett; bild ist nur eine ArbeitId, die Startseite braucht das mobile Startbild und start-dusche-boden ab lg. LageInhalt hat keine einleitung; Lage.tsx:175 hat das Prop, ErzaehlSeite reicht aber nichts durch. TunInhalt: bereiche nur als Zeile mit motiv, ohne vignette (der Typ Bereich steht in Tun.tsx:45), kein unterKopf und keine Zeichnung. AblaufInhalt: keine Belege-Liste (StartAblauf.tsx:56-74). BelegInhalt: keine Kennzeile, keine Orte oder Einsatzgebiet. SchrittInhalt: kein Formular, keine Öffnungszeiten, kein hauptziel. Fachwort mit erklaert=false (StartAblauf) entspricht einfachem Text ohne Marke und ist damit abbildbar.

### `src/components/vorlagen/teile/Einstieg.tsx`
- Rolle: K-009 Teil 1 (Worum es geht), Element section mit data-formel worum. Props EinstiegProps (:23-37): pfad, brotkrumen, titel, ort, vorspann, bild (ArbeitId oder ReactNode), unterBild, hauptziel (Standard /kontakt), kompakt.
- Bewegungen: data-motion druck am Anruf (:66), an WhatsApp (:76) und am Hauptknopf (kern/Hauptknopf.tsx:28).; data-erstes-bild an H1, Ort, Hauptknopf und Kontakt.; Fehlt sig-kreuzlinie: auf der Startseite mobil das Lot (StartEinstieg.tsx:76), ab lg die Waage mit kreuzlinie-aus-start (:180-181), das Lot nach der Waage (:184-185) und der Plan im sig-kreuzlinie-Wrapper (:161).; Fehlt sig-flucht: H1 der Startseite (:88).; Fehlt sig-plan: mobil zeigen ohne Achse (:159), ab lg laden mit Schnitt (:162).; Fehlt startbild (Startbild.tsx:18).; Fehlt eine eigene Laserachse oder Kreuzlinie (kern/Einstieg.tsx:62 hätte beides).
- Abhängigkeiten: kern/Bildfeld, kern/Brotkrumen, kern/Hauptknopf, kern/Rufnummer, kern/Textmarken, kern/stile, config/company, lib/whatsapp
- Besonderheiten: Gleiche Aufgabe, andere Umsetzung als StartEinstieg: (a) H1 als ein String mit text-balance, eine Stufe kleiner ab 44 Zeichen (:21, :52). Die Startseite nutzt TITEL_ZEILEN als Block-Spans; sig-flucht wirkt nur auf Block-Kinder (:54-58, :89-94). Dazu kommen dort die Stufen flach: und @max-xs: (:88). (b) H1-id seite-titel (:41) gegen start-titel (:67, :88); laut grep stützt sich kein Test und kein Werkzeug darauf. (c) Raster ab lg 7+5, mittig ausgerichtet (:46, :87), gegen das Planblatt 6+6 in zwei Zeilen mit lg:gap-y-0 und klebender Textspalte (lg:sticky lg:top-24; :71, :98). (d) Vorspann ab sm vor den Knöpfen, nur max-sm:order-1 (:60); auf der Startseite steht er auf allen Breiten danach (order-1, :107; E2-SICHT-2 Befund 6). (e) WhatsApp max-lg:hidden (:77) gegen max-xl:hidden (:137); Rufnummer ohne inline-block (:69 gegen :127); Knopfzeile ohne @container und ohne flach:mt-6 (:63 gegen :114). (f) Ort ohne text-balance (:56 gegen :100); kein flach:pt-16 (:71). (g) Kein Fugenkreuz-Anschlag und keine Zeile Firmensitz Aßlar (:86-87). Von dieser Zeile hängt die Intro-Rechnung html.k-intro-start ab (bewegung.css:417-425: --intro-h1 = pt-32 + Zeile fs-1 + mt-4). (h) Das Bild lädt mit lcp, also fetchPriority high (:88); die Startseite lädt seit E-037 ohne hohe Priorität. (i) unterBild steht unter dem Bild; die Bewertungszeile der Startseite steht über dem Plan (:154-156, E2-SICHT-2 Befund 2). (j) section statt header: die Regel globals.css:422 (header:has(.planblatt-achse) .leitachse-rot) greift nicht, falls der Einstieg einen Plan mit Achse bekommt.

### `src/components/vorlagen/teile/Lage.tsx`
- Rolle: K-009 Teil 2 (Ihre Lage), id ihre-lage. Eingabe LageInhalt (absaetze, fliesen, wege) und Prop einleitung (:175). Exportiert Passstuecke (:127-134) und LageFliesen (:136-173).
- Bewegungen: zustand an den Fliesen-Links (:153) und an den Wegen (Bereichszeilen).; Passstücke (.passstueck, globals.css:357) und Fugenkreuz statisch.; Kein auftritt.
- Abhängigkeiten: kern/Abschnitt, kern/Fliesenkomposition, kern/Textmarken, config/arbeiten, teile/Tun Bereichszeilen
- Besonderheiten: Klassen und Passstücke wie start/Lagefliesen.tsx; die Startseite importiert Passstuecke von hier. Unterschiede: Zeilen je Streifen werden berechnet (:116, :137) statt fest lg:grid-rows-3. Abstand lg:pb-32 am Abschnitt (:184); die Startseite setzt lg:pb-16 am Abschnitt und lg:mb-16 an der Hülle (Lagefliesen.tsx:57, :60), weil spaet-zeichnen Überstehendes beschneidet (Lagefliesen.tsx:59). Der Teil kennt kein spaet. einleitung nur als Prop, nicht im Modell. Die Funktion Bild steht doppelt (Lagefliesen.tsx:31-46).

### `src/components/vorlagen/teile/Tun.tsx`
- Rolle: K-009 Teil 3 (Was wir tun), id was-wir-tun, Kopf seitlich. Eingabe TunInhalt und moment. Exportiert Bereichszeilen (:16-43), den Typ Bereich (:45), Bereichsfliesen (:53-89) und Punktfliesen (:91-104).
- Bewegungen: zustand an Bereichszeilen (:21) und Bereichsfliesen (:62).; Fliesenkomposition, Plan-Vignetten (kern/vignetten, ohne data-motion) und Fugenkreuz statisch.; moment-Slot (:127), z. B. für einen großen Moment der Seite.
- Abhängigkeiten: kern/Abschnitt, kern/Fliesenkomposition, kern/vignetten, kern/Fugenkreuz, kern/Textmarken
- Besonderheiten: Tun selbst zeichnet Bereichszeilen (Zeilen mit Muster 48 px, :116). Die Startseite nutzt dagegen Bereichsfliesen mit Plan-Vignetten (WasWirTun.tsx:13-18, :48) und einen unterKopf mit VignetteUntergrund samt Bildunterschrift (WasWirTun.tsx:36-46). Tun kennt weder unterKopf noch Bereiche mit vignette; Bereichsfliesen nutzt nur die Startseite. Die Einleitung der Startseite (JSX mit Fachwort) lässt sich als Markentext abbilden. Die Startseite setzt spaet (WasWirTun.tsx:25).

### `src/components/vorlagen/teile/Ablauf.tsx`
- Rolle: K-009 Teil 4 (So läuft es ab), id ablauf, Fläche Fliese, lg:pb-32. Eingabe AblaufInhalt und moment. Exportiert Schritte (:17-42).
- Bewegungen: Keine animierte Bewegung: die rote Linie ist ein statischer border-laser.; moment ersetzt die Schritte (:47). Hier passt szene-ablauf (kern/SzeneAblauf.tsx:31-36, CSS bewegung.css:735-771), das heute nur der Bestand /leistungen nutzt.
- Abhängigkeiten: kern/Abschnitt, kern/Fugenkreuz, kern/Textmarken, kern/WeiterLink
- Besonderheiten: Schritte im Zickzack (i % 2 === 1 rückt um lg:mt-16, :28), ohne Setzstufe. Die Startseite hat die fallende Treppe mit mt-16 und mt-32 und roter Setzstufe (StartAblauf.tsx:42-43, :47; E3-START-06, Commit 11cc38d nur in start/). Der Kommentar im Teil (:2-3) beschreibt noch den alten Stand. Statt der drei Belege mit Fugenkreuz (StartAblauf.tsx:56-74) gibt es einen Hinweis-Kasten mit border-l-2 border-tinte (:49-56). Die Startseite setzt spaet (StartAblauf.tsx:32).

### `src/components/vorlagen/teile/Beleg.tsx`
- Rolle: K-009 Teil 5 (Beleg) in zwei Abschnitten, beide mit data-formel beleg: unsere-arbeiten (Fotos, Satz, Zweierbild, moment, Verweis; :16-37) und kundenstimmen (Fläche Fliese; :38-42). Eingabe BelegInhalt, moment, stimmenTitel (Standard: Das sagen unsere Kunden.).
- Bewegungen: zustand am WeiterLink (kern/WeiterLink.tsx:11).; Sonst statisch, kein anriss.
- Abhängigkeiten: kern/Abschnitt, kern/Textmarken, kern/WeiterLink, teile/Fotos, teile/Stimmen
- Besonderheiten: Die Startseite hat drei Abschnitte: Arbeiten, Kundenstimmen, Einsatzorte (StartBeleg.tsx:31, :94, :206). Einsatzorte (Maßkette, Ortsgruppen, GemeinsameKette) hat kein Gegenstück. Über moment geht es auch nicht: moment steht im Abschnitt der Fotos, vor den Stimmen.

### `src/components/vorlagen/teile/Fotos.tsx`
- Rolle: Fotos als verlegte Fläche für Beleg (K-012). Eingabe: Liste von Foto (bild, unterschrift), spalten 1, 2 oder 3.
- Bewegungen: Keine.
- Abhängigkeiten: kern/Bildfeld
- Besonderheiten: Mit 6 Fotos und spalten 3 gleiche Klassen und gleiche sizes wie Arbeiten auf der Startseite (StartBeleg.tsx:35-43); dort steht der Code doppelt. GALERIE_START (inhalte/galerie.ts:6-13) wiederholt die FOTOS der Startseite (StartBeleg.tsx:22-29).

### `src/components/vorlagen/teile/Stimmen.tsx`
- Rolle: Kundenstimmen wörtlich aus REVIEWS. Exportiert MARKIERUNG (:10), stimmenZu (:27-33) und Stimme (:36-55). Eine große Stimme links, weitere rechts (:57-81).
- Bewegungen: Keine. Die Markierung ist eine statische Unterstreichung mit decoration-laser (:20), nicht das anriss aus dem Register (K-007: Stimmen aus v2). Die Startseite macht es genauso.
- Abhängigkeiten: config/reviews, icons/Icon
- Besonderheiten: Die große Stimme hat kein lg:text-fs-5 (:46 gegen StartBeleg.tsx:81). Unter der großen Stimme fehlt die Bewertungszeile mit Stand; die Startseite setzt sie mit contents und order (StartBeleg.tsx:108-112) und importiert dafür Bewertungszeile aus StartEinstieg. MARKIERUNG, markiert, Stimme und die Prüfung auf fehlende Kennungen stehen auf der Startseite ein zweites Mal (StartBeleg.tsx:53-101).

### `src/components/vorlagen/teile/Schritt.tsx`
- Rolle: K-009 Teil 6 (Nächster Schritt), id naechster-schritt, Fläche Fliese, Kopf seitlich, ziel. Eingabe SchrittInhalt und pfad. Im Inhalt: Hauptknopf, Rufnummer groß, WhatsApp, verwandte Seiten, Hilfen.
- Bewegungen: druck am Hauptknopf.; zustand an Telefon, WhatsApp und Listen-Links (:40, :54, :68, :85).
- Abhängigkeiten: kern/Abschnitt, kern/Hauptknopf, kern/Rufnummer, kern/Textmarken, kern/stile, config/company, lib/whatsapp
- Besonderheiten: Der Hauptknopf führt fest zu /kontakt (:33 ohne href). Die Startseite (TerminAnfrage) ist dagegen selbst das Ziel: titelId termin, kein Hauptknopf, HeroContactForm als Inhalt, Telefon, WhatsApp und Öffnungszeiten im unterKopf (TerminAnfrage.tsx:24, :35-71, :79). Schritt hat keinen Slot für ein Formular und keine Öffnungszeiten. Für die Startseite passt er nicht, OrtSchritt passt besser.

### `src/components/vorlagen/teile/Wissen.tsx`
- Rolle: Teil 3 der Wissensseite: je Block ein Abschnitt mit id wissen-N und data-formel tun (:27-38). Inhalt: Karten (:12-25), Liste als Punktfliesen, Tabelle, Zeichnung.
- Bewegungen: Keine eigene.; Der Zeichnungs-Slot (:36) kann Verlegeplan interaktiv (sig-plan zeigen) oder VerbandUmschalter (verband) aufnehmen.
- Abhängigkeiten: kern/Abschnitt, kern/Tabelle, kern/Textmarken, teile/Tun Punktfliesen
- Besonderheiten: Kein Gegenstück auf der Startseite.

### `src/app/(bestand)/werkstatt-schaufenster/erzaehlseite/page.dev.tsx, src/inhalte/*, src/components/start/*`
- Rolle: Wo die Vorlagen benutzt werden (grep im ganzen src).
- Bewegungen: Keine zusätzlichen.
- Abhängigkeiten: inhalte/barrierefreies-bad.ts (ErzaehlInhalt), inhalte/orte.ts (Ortsinhalt), inhalte/galerie.ts
- Besonderheiten: Schaufenster erzaehlseite/page.dev.tsx:3,9: ErzaehlSeite mit BARRIEREFREIES_BAD, ohne momente. Die Seite hat ein Bild im Einstieg, Lage als Absätze, Tun als Punkte, Hinweis mit Verweis, Zweierbild und eine Stimme. inhalte/orte.ts nutzen OrtsSeite (gar nicht eingebunden) und test/orte.test.mjs. start/WasWirTun.tsx:11 importiert Bereichsfliesen, start/Lagefliesen.tsx:17 Passstuecke; sonst bindet keine Seite und kein anderer Baustein vorlagen/* ein. git status ist sauber für vorlagen, start und inhalte.

### `src/components/kern/{Einstieg,Kreuzlinie,Planblatt,Verlegeplan,Einzugsband,SzeneAblauf}.tsx, src/components/sections/CompanyHistory.jsx`
- Rolle: Bestehende Quellen der Bewegungen aus E-037, die eine Vorlage übernehmen kann. Kein Teil der Vorlagen.
- Bewegungen: sig-kreuzlinie: kern/Kreuzlinie.tsx:9 mit Lot, Waage (max-lg:hidden) und Fugenkreuz. Erreichbar nur über kern/Einstieg mit kreuzlinie (:34, :62); keine Seite setzt das Prop.; sig-flucht: kern/Einstieg.tsx:67 (titelZeilen als Block-Spans :68-74).; sig-plan: Verlegeplan.tsx:23-25, :121 (flucht zeigen oder laden; interaktiv bedeutet zeigen). CSS bewegung.css:679-733.; einzugsband: Einzugsband.tsx:35, CSS bewegung.css:773-796.; szene-ablauf: SzeneAblauf.tsx:34-36.; fugenband: nur CSS (bewegung.css:79-114) und Register. CompanyHistory.jsx:31 hat nur die statische fugenband-linie und ein auftritt (:27).
- Abhängigkeiten: bewegung.css, globals.css (.planblatt-wand :351, .plan-buendig :363, .spaet-zeichnen :369, header:has(.planblatt-achse) :422), lib/motion/register.ts:37-43
- Besonderheiten: Die Form der Kreuzlinie auf der Startseite ist eine andere als in kern/Kreuzlinie: dort getrennte Spans für Lot, Waage und Lot nach der Waage. Die CSS-Regel .kreuzlinie-aus-start (bewegung.css:853-858) hängt am Raster 12 Spalten, gap-x-12, Plan in Spalte 7 bis 12 und -left-4. Die Verzögerungen für das Intro (k-intro-start, bewegung.css:894-921) und der Endzustand bei Zurück (k-verlauf, :922-932) hängen an data-motion-Selektoren und lassen sich wiederverwenden. Plan-Morph: data-plan-uebergang steht nur in Gewerk.tsx:38 und leistungen/[id]/page.jsx:208. Der Vorlagen-Einstieg trägt es nicht; das ist wichtig, falls /leistungen/[id] auf eine Vorlage umzieht.

Offene Fragen:
- Einstieg der Vorlagen: Soll er das Planblatt der Startseite verallgemeinern (6+6, geschnittener Plan, Waage aus dem Kreuzpunkt, .kreuzlinie-aus-start, die am Raster hängt) oder die Form aus kern/Einstieg übernehmen (Kreuzlinie mit Planblatt in der Randspalte)? Davon hängt ab, ob die Startseite mit demselben Teil ohne sichtbare Änderung umziehen kann.
- Register K-007 und register.json nennen für sig-kreuzlinie und sig-flucht nur /, und SIG-1 zählt als großer Moment des ersten Bildschirms. Werden die beiden auf allen Vorlagenseiten zugelassen? Das betrifft auch die Regel 'ein großer Moment je Bildschirm', denn Ortsseiten haben einzugsband bzw. karte im Einstieg.
- Leitachse: Soll ErzaehlSeite (und WissensSeite, OrtsSeite, ArbeitsSeite) den Einstieg wie die Startseite aus der Leitachse nehmen (E3-START-02)? Wenn die Vorlage Waage und Lot trägt, darf das rote Stück erst am Fuß des Einstiegs beginnen.
- Startseite ohne sichtbare Änderung: Kommen die nötigen Felder und Slots als Optionen in die Teile (titelZeilen, Firmensitz-Zeile für die Intro-Rechnung, Plan mit Kennzeile, Startbild mobil und start-dusche-boden ab lg, hauptziel #termin, Einleitung der Lage, Tun mit Vignetten und unterKopf, Belege im Ablauf, Einsatzorte, Stimmen mit Bewertungszeile und lg:text-fs-5, Schritt mit Formular und Öffnungszeiten, spaet mit Suspense)? Oder bekommt die Startseite eigene Teile unter vorlagen/teile (Umkehrprobe E-025)?
- Gilt die Treppe im Ablauf (E3-START-06) für alle Vorlagen (dann ändert sich das Schaufenster) oder nur als Option?
- fugenband ist nirgends gebaut (nur CSS und Register; CompanyHistory sagt 'setzt später an'; kern/Zeitband ist ungenutzt). Wer baut es, und gehört es in eine Vorlage (Über uns als Erzählseite)?
- einzugsband auf Ortsseiten: über den Slot karte als Bild im Einstieg (dann ohne Planblatt und Schriftfeld) oder als fester Teil der OrtsSeite? KERN nennt für /standorte sowohl karte (E3-GRAF-09, offen) als auch einzugsband.
- Bildfeld mit lcp im Vorlagen-Einstieg (fetchPriority high) gegen E-037: Die Startseite lädt ihr Foto ohne Priorität, seit der Plan oben steht. Bleibt lcp, wenn der Vorlagen-Einstieg einen Plan bekommt?
- hauptziel für /kontakt: hauptziel('/kontakt') liefert heute '/kontakt', also einen Link auf die eigene Seite. Welcher Anker soll es werden (Bestand: #express-anfrage, termin-buchen-heading)? Für /standorte/[stadt] braucht es #anfrage (ORT_ANKER), für /standorte (Übersicht) ist das Ziel offen.

## Abgleich und Umstellweg

**Gutachten E3-W1: Vorlagen tragen SIG, Startseite zieht auf vorlagen/teile um**

**0. Stichprobe gegen den Code (14 Stellen nachgelesen)**

Bestätigt:
- **Rahmen:** Der Einstieg steht außerhalb der Leitachse, danach folgt eine Suspense-Grenze mit Platzhalter min-h-dvh (`src/app/(bestand)/page.tsx:38-48`). ErzaehlSeite schließt den Einstieg in die Leitachse ein (`ErzaehlSeite.tsx:30-31`).
- **StartEinstieg** trägt alles, was die Karten nennen:
  - sig-kreuzlinie: Lot mobil (`:76-78`), Waage mit kreuzlinie-aus-start (`:180-182`), Lot nach der Waage (`:184-186`), Plan-Hülle (`:161-163`).
  - sig-flucht an der H1 mit Block-Zeilen (`:88-95`).
  - Plan zweimal: mobil flucht=zeigen, ab lg schnitt flucht=laden (`:158-162`).
  - Firmensitz-Zeile und Fugenkreuz (`:86-87`), @container am H1-Block (`:81`) und an der Knopfreihe (`:114`).
  - Vorspann order-1 (`:107`), WhatsApp max-xl:hidden (`:137`), Rufnummer inline-block (`:127`), Bild ohne lcp (`:175`, `Startbild.tsx:16`).
- **teile/Einstieg** hat das alles nicht:
  - Raster 7/5 (`:46`, `:87`), H1 als ein String mit text-balance (`:52`), id seite-titel mit tabIndex -1 und outline-none (`:41-52`).
  - Vorspann max-sm:order-1 (`:60`), WhatsApp max-lg:hidden (`:77`), Bildfeld lcp bei einer Kennung als Text (`:88`).
- **CSS-Kopplungen:**
  - .kreuzlinie-aus-start hängt am Raster der Startseite (`bewegung.css:849-855`).
  - Intro-Verzögerung nur unter .k-intro-start (`:894-919`), Endzustand bei k-verlauf (`:924-932`).
  - Intro-Reihen gebunden an pt-32 + fs-1 + mt-4 (`:414-423`).
- **Startklassen:** k-intro-start wird nur auf location.pathname '/' gesetzt (`kopfskript.ts:21`). Verlegen nimmt k-startbild und k-intro-start weg (`Verlegen.tsx:302`).
- **Ziele:** hauptziel liefert '#termin' auf /, sonst /kontakt (`navigation.js:70-72`). OrtsSeite setzt #anfrage (`OrtsSeite.tsx:28`, `:106`).
- **fugenband** ist nirgends gebaut, CompanyHistory hat nur die statische fugenband-linie (`CompanyHistory.jsx:31`).
- **Fachwort mit erklaert={false}** ist gleich einfachem Text, solange das Wort keine Ziffer enthält (`Fachwort.tsx:20-21`). „Abdichtung“ lässt sich also als Markentext abbilden.

Korrekturen an den Karten:
- **Inhalt stimmt, aber Zeilenangaben sind falsch:**
  - Karte Startseite, Lagefliesen: :131, :137, :146 und :92-100 sind richtig `:60`, `:66`, `:75` und `:21-29`.
  - Karte Startseite, StartAblauf: :84, :98 und :117 sind richtig `:33`, `:47` und `:66`.
  - Karte Startseite, TerminAnfrage: :266, :272 und :286 sind richtig `:35`, `:41` und `:55`.
  - Karte Startseite, Leitachse: :156 ist richtig `:23`.
  - Karte Vorlagen, teile/Lage: :127-134, :136-173, :175 und :184 sind richtig `:32-39`, `:41-78`, `:80` und `:89`.
  - Karte Vorlagen, Leitachse :137-148: Die Datei hat nur 36 Zeilen, die Laserachse steht in `:30`.
- **Neu: Seitenformel.tsx:2-3** behauptet, die Prüfwerkzeuge lesen data-formel. Ein grep in `_werkstatt/werkzeuge` und `test` findet nichts.
- **Neu: Fokusring.** teile/Einstieg setzt outline-none an der H1. B-01 fokussiert nach dem Wechsel `#main-content h1` (`Verlegen.tsx:318-321`). Nach einem Wechsel per Tastatur fehlt mit dem Teil also der Fokusring, den / heute zeigt (`globals.css:302-305`).
- **Neu: Bildwerkzeuge verdecken spaet-Fehler.** `abschnitte.mjs:51` und `einzelbild.mjs:102` (ebenso lesbarkeit und texte) erzwingen content-visibility visible. Abgeschnittenes durch spaet ist in deren Bildern unsichtbar. bildsatz.mjs erzwingt es nicht.

**1. Lückenliste: was der Startseite in welchem Teil fehlt**

teile/Einstieg:
- **sig-kreuzlinie:** alle drei Linien (mobiles Lot, Waage aus dem Kreuzpunkt, Lot nach dem Knick) und die Hülle um den lg-Plan, deren Lot aus der Schnittkante wächst (`bewegung.css:881-893`).
- **sig-flucht:** Es gibt kein titelZeilen, im Modell (`inhalt.ts:20-30`) wie in den Props. Vorbild ist kern/Einstieg mit titelZeilen.
- **sig-plan:** Es fehlt ein Zeichnungs-Slot für den Plan (mobil zeigen ohneAchse bemassung=false mit plan-buendig, ab lg schnitt laden). Ebenso fehlen wandEinzug, --wand und planblatt-wand.
- **Planblatt-Raster:** 6/6 in zwei Zeilen mit lg:gap-y-0 und klebender Textspalte (`StartEinstieg.tsx:71`, `:98`).
- **Firmensitz-Zeile mit Fugenkreuz** als Anschlag für die Intro-Rechnung.
- **Kennzeile** (Bewertungszeile geteilt) über dem Plan, unter lg per order ans Ende (`:154-156`). unterBild steht heute unter dem Bild.
- **Zwei Bilder:** Startbild unter lg, start-dusche-boden ab lg, beide ohne lcp und mit eigenen sizes (`:173`, `:175`).
- **Satzdetails:** @container und flach-Stufen; Vorspann order-1 auf allen Breiten; WhatsApp ab xl; Rufnummer inline-block; Ort mit text-balance.
- **Plan-Morph:** Kein Haken für data-plan-uebergang (nur Gewerk.tsx und `leistungen/[id]/page.jsx`). Nötig, falls /leistungen/[id] auf eine Vorlage zieht.

teile/Lage:
- Kein spaet. Mit spaet bräuchte der Teil das Muster lg:pb-16 am Abschnitt plus lg:mb-16 an der Hülle (`Lagefliesen.tsx:57-60`) statt lg:pb-32 (`Lage.tsx:89`). Sonst schneidet spaet den versetzten Streifen und das untere Passstück ab (`Lage.tsx:36`, `:53`).
- einleitung nur als Prop (`:80`), nicht im Modell. ErzaehlSeite reicht sie nicht durch (`ErzaehlSeite.tsx:32`).

teile/Tun:
- Bereichsfliesen mit Vignette sind aus dem Modell nicht erreichbar. TunInhalt.bereiche ist eine Zeile ohne vignette (`inhalt.ts:50-59`), Tun zeichnet nur Bereichszeilen (`Tun.tsx:116`). Den Typ Bereich gibt es (`:45`).
- Es fehlen unterKopf (Vignette Untergrund mit Bildunterschrift) und spaet.

teile/Ablauf:
- Zickzack (`Ablauf.tsx:28`) statt fallender Treppe mit Setzstufe (`StartAblauf.tsx:42-43`, `:47`).
- hinweis (`Ablauf.tsx:48-55`) statt der Liste von drei Belegen mit Fugenkreuz (`StartAblauf.tsx:56-74`). Kein spaet.
- szene-ablauf geht nur über moment (`Ablauf.tsx:47`). Das reicht für „wo passend“.

teile/Beleg und Stimmen:
- Kein spaet, keine Kennzeile unter der großen Stimme (`StartBeleg.tsx:108-112`), kein lg:text-fs-5 (`StartBeleg.tsx:81` gegen `Stimmen.tsx:46`), kein self-center.
- Kein Abschnitt Einsatzorte (`StartBeleg.tsx:82-105`). moment landet im Abschnitt der Fotos (`Beleg.tsx:31`).

teile/Schritt:
- Keine Variante mit Formular. Der Teil führt fest zu /kontakt.
- OrtSchritt (`OrtsSeite.tsx:40-99`) ist fast TerminAnfrage. Unterschiede:
  - Nachbarorte statt Öffnungszeiten.
  - Es fehlt @max-xs:text-fs-4 an der Rufnummer.
  - WhatsAppLogo hat shrink-0.
  - Der Titel steht ohne zusammen().

Vorlagen-Rahmen:
- ErzaehlSeite, WissensSeite und OrtsSeite haben den Einstieg in der Leitachse, keine Suspense, kein spaet und kein durchgereichtes hauptziel.
- WissensSeite: Der Bestand trägt sig-plan zeigen im Planblatt des Einstiegs, z. B. `bad/barrierefreies-bad/page.jsx:72`. Mit der Vorlage ginge das verloren.
- OrtsSeite: einzugsband fehlt. Der Bestand hat es im Planblatt (`standorte/[stadt]/page.tsx:188-191`), die Vorlage hat nur den Slot karte als nacktes Bild.
- ArbeitsSeite: keine Lücke. K-007 sieht keine großen Momente auf Arbeitsseiten vor, kompakt bleibt also ohne SIG.
- fugenband: gehört nach K-007 zu /ueber-uns, als Slot, nicht als Standard einer Vorlage.

**2. Umstellweg für / ohne sichtbare Änderung**

Zuordnung Abschnitt → Teil, mit dem, was der Teil zusätzlich können muss:
- **StartEinstieg → teile/Einstieg, Variante planblatt.**
  - Neue Props: titelZeilen, firmensitz, kennzeile, zeichnung (Plan mobil und lg), bildMobil und bildGross (ReactNode mit eigenen sizes), kreuzlinie, titelId, keinFokusRahmen.
  - Das Raster wird 1:1 übernommen (6/6, gap-x-12, Plan in Spalte 7 bis 12, -left-4). Dann gilt .kreuzlinie-aus-start ohne CSS-Änderung für alle Vorlagen. Die Variante 7/5 bleibt nur für Einstiege ohne Zeichnung.
- **Bewertungszeile → nach kern.** Sie wird von Einstieg und Stimmen gebraucht. Heute exportiert StartEinstieg sie, und StartBeleg importiert sie von dort (`StartBeleg.tsx:20`).
- **Lagefliesen → Lage.** Dazu einleitung im Modell, spaet und das mb-16-Muster. Visuell neutral: lg:pb-16 + mb-16 ergibt dieselben 128 px wie lg:pb-32. LAGEN passt 1:1 in LageInhalt.fliesen. Die sizes der Bilder sind gleich.
- **WasWirTun → Tun.** Dazu ein Feld bereichsfliesen (Bereich mit vignette), unterKopf mit Zeichnung und Bildunterschrift als Markentext, und spaet. Die DOM-Reihenfolge muss bleiben: Erst die Bildunterschrift erklärt [[abdichtung|...]], danach steht im Ablauf das einfache Wort.
- **StartAblauf → Ablauf.** Dazu die Treppe als Option oder als Standard (Entscheidung; als Standard ändert sich das Schaufenster), belege als Markentext-Liste und spaet.
- **Arbeiten → Beleg (Fotos und Verweis).** Nur spaet fehlt, Klassen und sizes sind gleich.
- **Kundenstimmen → Beleg.** Dazu kennzeile, gross mit lg:text-fs-5 und self-center, spaet.
- **Einsatzorte → neuer Teil teile/Einsatzorte.** Code aus StartBeleg übernommen, geschaltet über ein Feld im BelegInhalt. Grund: Umkehrprobe aus E-025, eigene Form heißt eigener Teil. Später auch für Orts- und Über-uns-Seiten nutzbar.
- **TerminAnfrage → teile/Schritt, Variante formular**, aus OrtSchritt verallgemeinert.
  - Props: titelId (termin bzw. anfrage), formular-Slot und zusatz (Öffnungszeiten oder Nachbarorte).
  - Die Klassen der Startseite gelten (@max-xs:text-fs-4, zusammen(), Logo ohne shrink-0, sonst bei 200 % am m360 prüfen).
  - Ohne spaet, weil Sprungziel.
- **Rahmen.** ErzaehlSeite übernimmt den Rahmen der Startseite: Einstieg vor der Leitachse, eine Suspense-Grenze mit min-h-dvh, spaet von Lage bis Beleg, nicht am Schritt. Hauptziel als hauptziel(pfad) aus navigation.js statt fest /kontakt. page.tsx wird `<ErzaehlSeite inhalt={START} ...>`.

Bleibt eigen für die Startseite, mit Grund:
- **Startbild mit lib/motion/startbild:** Die Bewegung startbild ist nur für / registriert (K-007). Es wird als Slot übergeben.
- **Texte in src/inhalte/start.ts:** Inhalt gehört als Daten in die Seite (E-025, Quelle REF-start).
- **Plan 'bad':** Ist Inhalt der Startseite.
- **Intro-Geometrie (k-intro-start):** Sie hängt an der H1 von / (`bewegung.css:414-423`). Die Variante muss pt-32, Firmensitz in fs-1 und mt-4 für / exakt halten.
- **HeroContactForm** ('use client') als Slot, nicht im Teil.

**3. Risiken**

- **LCP und Startbild:**
  - Bei einer Kennung als Text setzt teile/Einstieg lcp. Mit eager lädt ein Bild auch in einer `hidden lg:block`-Hülle, mobil also unnötig. Auf / deshalb nur ReactNode übergeben.
  - Die sizes müssen exakt bleiben, sonst wählt der Browser ein anderes srcset und der Bildvergleich zeigt Pixel-Abweichungen.
  - KERN K-012 sagt noch, das Startbild lade eager und mit fetchPriority high. Seit E-037 und E-041 stimmt das nicht mehr, KERN muss nachgezogen werden.
- **Intro:**
  - k-intro-start gibt es nur auf /. Vorlagen-Einstiege mit SIG laufen beim Erstbesuch einer anderen Seite unter dem Blatt ab (deckend bis 800 ms, SIG bis 1520 ms). Das gilt heute schon für /bad mit flucht=laden (`bad/page.jsx:125`).
  - Lösung: Verzögerung und Geometrie in zwei Klassen trennen. Das betrifft kopfskript.ts, Verlegen.tsx:302, bewegung.css:894-919 und `test/intro.test.mjs:137-139`.
  - Ein Bildvergleich mit reduzierter Bewegung erkennt Fehler in der Intro-Geometrie nicht. Dafür eigens die Oberkante der H1 messen.
- **Leitachse:** Trägt der Einstieg Waage und Lot, muss die Leitachse in allen Vorlagen erst nach dem Einstieg beginnen, sonst entsteht ein roter Stummel (E3-START-02). Das Lot nach der Waage (-left-4) muss auf ACHSE_LAGE (`Leitachse.tsx:23`) enden. Die Regel `header:has(.planblatt-achse)` (`globals.css:422`) greift bei section nicht.
- **spaet-zeichnen:**
  - Es beschneidet alles außerhalb der inneren Hülle plus 4 px (`globals.css:369-386`): Lage-Versatz, Passstück, Fokusringe.
  - contain-intrinsic-size 50rem verschiebt Sprungziele (Kommentar in `funktion-einwilligung.spec.mjs:30-32`). #termin muss ohne spaet bleiben.
  - abschnitte und einzelbild zeigen Beschnitt nicht (siehe Abschnitt 0), für diesen Fall bildsatz nehmen.
- **Container-Abfragen und große Schrift:**
  - Der Bezug einer Abfrage ist der nächste @container-Vorfahr. Zusätzliche Hüllen in den Teilen verschieben die Schwellen. Betroffen: H1-Block @max-xs, Knopfreihe, Bewertungszeile @max-md, Fliesen, Bereichsfliesen, Fotos, Ortsgruppe, Schritt.
  - flach (`globals.css:7`) und @max-xs setzen die H1-Zeilen inline, die Flucht ist dort unsichtbar. Das ist so gewollt, die Klassen müssen erhalten bleiben.
  - Prüfung mit `einzelbild --schrift 200` und q844.
- **Tests, die auf Struktur und Klassen der Startseite schauen:**
  - `verlegen.spec.mjs:423-443` (14): zählt Animationen unter [data-motion=sig-kreuzlinie] und [data-motion=sig-flucht]. Beim Laden mehr als 0, nach Zurück 0, nach einem Vorwärtswechsel wieder mehr als 0. Nimmt außerdem den ersten sichtbaren Link `a[href^="/bad/"]`, das ist die erste Lage-Fliese.
  - `verlegen.spec.mjs:583-586` (22): Der erste sichtbare Anker `#main-content a[href^="#"]` ist der Hauptknopf #termin.
  - `verlegen.spec.mjs` (mehrfach): `#main-content h1` muss fokussiert sein.
  - `funktion-hero-kontakt.spec.mjs:6-15`: #termin mit dem Text „Termin vor Ort anfragen“ im Bild, closest('section') enthält #hero-name und #hero-phone.
  - `funktion-navigation.spec.mjs:267-293`: `#kundenstimmen blockquote` dreimal in der Reihenfolge c-wolf, rabia-oe, elke-s, die erste Stimme größer.
  - `test/bewegung.test.mjs:38`: ladeKennungen. `test/intro.test.mjs:137-139`: k-intro-start nur auf /.
  - `erstesbild.mjs:90`: liest die Namen in data-erstes-bild (im Teil gleich).
  - `funktion-einwilligung.spec.mjs:17-18`: Überschrift auf /standorte, wichtig für den späteren Seitenbau.
- **Hauptziel:**
  - Die Bestandsseite /standorte/[stadt] hat kein #anfrage, sondern stadt-schnellanfrage-titel (`[stadt]/page.tsx:341`). '#anfrage' darf in navigation.js also erst mit dem Umzug auf OrtsSeite kommen, sonst zeigen Kopf, Menü und Leiste ins Leere.
  - /kontakt hat #express-anfrage und #termin-buchen (`kontakt/page.jsx:118`, `:131`). Das Formular, das K-009 dort oben verlangt, fehlt noch.
- **K-007 und Register:** sig-kreuzlinie und sig-flucht stehen dort mit Ort „/“. Für Vorlagen braucht es eine Entscheidung, wo sie gelten:
  - Erzählseiten: SIG-1 als Moment des ersten Bildschirms.
  - Wissensseiten: nur Plan mit zeigen.
  - Ortsseiten: einzugsband statt SIG-1, wegen der Regel „ein großer Moment je Bildschirm“.

**4. Reihenfolge mit je einem Prüfkriterium**

1. **Entscheidungen festhalten** (neuer E-Eintrag; KERN K-007 Ort und K-012 nachziehen): Planblatt 6/6 als Vorlagen-Einstieg, SIG je Seitenart, Treppe und lg:text-fs-5 als Standard oder Option, getrennte Intro-Klasse, Bewertungszeile nach kern.
   - Prüfung: Eintrag und KERN widersprechen dem Code nicht mehr (grep „nur /“ in `bewegung.css:798`).
2. **Ausgangsbeleg auf HEAD:** Reinraum, bildsatz für 10 Geräte (reduziert, dazu `--ersatzpfad`), einzelbild `--schrift 200` (m360, m390, q844), Geometrie-JSON (Rechtecke aller data-erstes-bild, jeder section, der Oberkante der H1 und des Ursprungs der Waage), Funktionssuite.
   - Prüfung: Belege liegen vor, Suite 342/26/0.
3. **Doppelte Bausteine bündeln, ohne / sichtbar zu ändern:** Bewertungszeile nach kern, Stimme und markiert sowie Fotos aus den Teilen nutzen.
   - Prüfung: `build-vergleich.mjs --streng` zeigt gleiches HTML von /, `npm test` grün.
4. **Teile rückwärtsverträglich erweitern:** Lage, Tun, Ablauf, Beleg und Stimmen, neues Einsatzorte, Schritt mit Formular.
   - Prüfung: Typen, Linter und Test grün; Schaufenster-bildsatz nur mit den in Schritt 1 beschlossenen Änderungen.
5. **Einstieg-Variante planblatt mit kreuzlinie, flucht und Plan bauen**, CSS unverändert.
   - Prüfung: Schaufenster mit Plan; Ursprung der Waage gleich Lot des Plans auf ±1 px bei d1440 und d1920; verlegen.spec (14) sinngemäß auf dem Schaufenster.
6. **src/inhalte/start.ts wörtlich anlegen.**
   - Prüfung: texte.mjs und lesbarkeit für / textgleich, Flesch unverändert.
7. **page.tsx auf ErzaehlSeite mit neuem Rahmen umstellen.**
   - Prüfung: bildsatz vorher gegen nachher auf 10 Geräten plus 200 % plus Ersatzpfad mit Pixel-Abweichung 0 (Graustufen-Diff wie bewegung.mjs; sharp ist vorhanden); Geometrie-JSON identisch; volle Suite 342/26/0, besonders verlegen (14) und (22), hero-kontakt und Stimmen; Erstes Bild 5 von 5; Spur der langen Aufgaben nicht über 940 ms (E-041).
8. **Ersetzte start/*-Dateien entfernen.**
   - Prüfung: grep findet keine Importer, Reinraum grün. Keine Bewegung entfällt (E-037).
9. **Intro-Verzögerung für Vorlagen-Einstiege** (kopfskript, Verlegen, bewegung.css, intro.test).
   - Prüfung: Auf / ist alles unverändert (Geometrie-JSON); auf einer Vorlagenseite beginnt SIG beim Erstbesuch erst bei 800 ms (Verzögerung der Animation gemessen).
10. **Erzähl-, Wissens- und Ortsseite:** Einstieg aus der Leitachse nehmen, SIG je Seitenart, einzugsband im Planblatt der OrtsSeite.
    - Prüfung: ab lg bei scrollY 0 kein roter Stummel; ein großer Moment je Bildschirm.
11. **hauptziel** für /kontakt (Anker festlegen) und für /standorte/[stadt] (#anfrage erst mit dem Umzug auf OrtsSeite).
    - Prüfung: Je Seite tragen alle Hauptknöpfe dasselbe Ziel (Z-11), und das Ziel existiert per getElementById.
12. **Seitenbau nach PLAN.**
    - Prüfung je Seite: Die Bewegungen aus E-037 des Bestands sind vorhanden (Register-Modus von bewegung.mjs gegen den Vorstand).
