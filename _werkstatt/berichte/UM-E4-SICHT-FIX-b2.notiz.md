# UM-E4-SICHT-FIX · Bauteil SF-B2 (Welle 2) · M-B2 → M-B1 (mit M-A4 Nr. 4) → M-B6, dazu X-1 · Kern 4.4.1

Arbeitskopie `$SCRATCH/sfix/b2/baum` (Abzug HEAD 13315fa8 nach Welle 1), Vergleich `$SCRATCH/sfix/b2/vor` (unverändert).
Diff: `$SCRATCH/sfix/b2/UM-E4-SICHT-FIX-b2.diff` (`diff -ruN vor baum` ohne node_modules, node_modules_echt, .next, bilder;
15 Dateien; `patch -p1 --dry-run` gegen das Repository auf adcd30be ohne Fehler und ohne Versatz). **Nacharbeit:** Diff neu, 13 Dateien,
siehe 7 (Abschnitt 7 gilt vor 1 bis 6).
Bilder: `$SCRATCH/sfix/b2/bilder/{vor,nach}/{d1440,d1920,m390}/{ruhig/<seite>.png | bewegt/<seite>/NN.png}` (vor = 4325,
nach = 4490, PNG, DPR 1, Einwilligung abgelehnt; ruhig = `data-bewegung="ruhig"` über den Bewegungsschalter, ganze Seite;
bewegt = Ausschnitte je Bildschirmhöhe nach langsamem Durchscrollen, Endzustand). Dazu `kontrolle-{vor,nach}/{d1440,d1920}/ruhig`
(dieselben Aufnahmen nacheinander statt parallel, für den Pixelvergleich, siehe 6) und `nach/t768/ruhig` (/bad, /standorte/wetzlar).
Ausschnitte der Sichtprüfung: `bilder/blick/`. Prüfbelege: `$SCRATCH/sfix/b2/pruef/` (vorher 4325 und Zwischenstand: axe,
erstesbild, lesbarkeit, ueberlappung), `$SCRATCH/sfix/b2/pruef-end/` (Endstand, Bau 4: dieselben Prüfungen und werte),
`$SCRATCH/sfix/b2/css/` (gebaute Stylesheets), `npm-test.log`, `build-4.log`, `abschluss-pruef.sh`.

## 1 Maßnahmen und Stand

### M-B2 Listen an der Fuge, ruhigere Bereichszeilen · umgesetzt
- `teile/Tun.tsx`: `Punktfliesen` heißt jetzt **`Punktliste`** (Export für SF-C3): `ol` mit einer Zeile je Punkt, Mono-Nummer
  `01, 02 …` (aria-hidden, die Liste zählt für Vorleser selbst) wie im Qualitätsversprechen, 1-px-Fugen (`border-t` je Punkt,
  `last:border-b`), ohne Außenrahmen, ohne Kasten, ohne Fugenkreuz. Unter 20 rem (große Systemschrift) steht die Nummer über dem
  Satz. Glossar-Erklärungen bleiben im Satz (Textmarken), Wortlaut gleich. Prop `className` für Breite und Lage im Satz.
- `Bereichszeilen`: Name in `font-text text-fs-4 font-semibold` statt `font-anzeige text-fs-5 font-extrabold`; neue Prop
  `className`. Die Angabe `Zeile.vignette` (Plan-Vignette im Feld 4 : 3, unter 20 rem ohne Zeichnung) hatte SF-C1 schon als
  Vorgriff gebaut (EV-5); Dokumentation in `inhalt.ts` auf M-B2 Nr. 2 umgestellt. Ortsseiten nutzen sie (M-C6).
- `teile/Wissen.tsx`: `liste` als `Punktliste`, `wege` als Bereichszeilen (dadurch ruhigere Namen auch auf /fliesen, Befund a5).

### M-B1 Satzspiegel · umgesetzt (mit M-A4 Nr. 4)
- `kern/Abschnitt.tsx`: neue Prop **`satz: 'mitte' | 'links' | 'rechts' | 'breit'`** (Standard `mitte`, nur gestapelt) und
  **`einleitungLang`**. Der Kopf bleibt mittig. `links` = Spalten 1 bis 2 an der Laserlinie, `rechts` = Spalten 2 bis 3,
  geteilt ab lg und nur ab 32 rem Inhaltsbreite (`lg:@lg:grid-cols-3`, Container-Abfrage auf einer Hülle um den Inhalt:
  zwei Drittel sind dann mindestens 21,3 rem; bei 200 % Systemschrift auf schmalen Breiten eine Spalte). `breit` und `mitte`
  lassen den DOM unverändert (keine Hülle). Die Hülle `abschnitt-inhalt` mit der Leitfaden-Bahn bleibt volle Breite; Marke
  und Kopf-Pausen wandern nicht mit (die geteilte Hülle sitzt innerhalb der Bahn).
- Neue Exporte in `kern/Abschnitt.tsx` (für SF-C3): `type Satz`, `Satzblock` (Block im Satzspiegel für Bausteine mit Teilen in
  verschiedenem Satz), `satzMass(satz)` (Lesebreite eines Textblocks: links ab md an der Inhaltskante, rechts ab der Teilung an
  der zweiten Spalte), `satzBlock(satz)` (dasselbe für Zeilen an der Fuge, geteilt über die ganze Spalte), `EINLEITUNG_LANG = 90`
  (Schwelle wie VORSPANN_LANG im Einstieg, M-A3 Nr. 4) und `langeEinleitung(text)`.
- Nr. 3 Einleitung: über 90 Zeichen Klartext linksbündig; bei `links`/`rechts` im Inhaltsblock (eigener Satzblock zwischen
  Kopf und Bahn, also nie neben der Marke), bei `mitte`/`breit` im Lesemaß unter dem Kopf (V-5). Bis 90 Zeichen mittig wie bisher.
- Nr. 2 Standard je Baustein:
  - **Lage `links`**: Absätze, Wege und Zusatz (Einzugsband der Ortsseiten) an der Laserlinie, im Lesemaß. Eine Lage nur mit der
    Auswahl (Startseite) bleibt `breit` mit mittiger Einleitung (V-4).
  - **Tun `rechts`**: Zeilen, Punkte, Absatz und „Mehr erfahren“ in Spalten 2 bis 3; mit großem Moment steht der Abschnitt
    `breit` (Moment in voller Rasterbreite), die übrigen Teile in einem eigenen Satzblock rechts (V-7). *Nacharbeit: mit Moment
    ohne Angabe mittig auf der Kante des Moments (V-16).* Die ruhige Leistungszeile
    der Startseite bleibt mittig. Neue Angabe **`TunInhalt.satz`** zum Überschreiben (V-8).
  - **große Momente `breit`**: Vergleich (unverändert breit), Fotos und Galerie im Beleg (`unsere-arbeiten`), Wissensblock mit
    `zeichnung` (Verband-Wähler /fliesen, Artikelliste /blog; V-3).
  - **Versprechen `rechts`**: Zeile „Alle 8 Punkte zeigen“ über die Spalte, geöffnet die zwei Spalten der Liste darin. *Nacharbeit:
    wieder mittig (V-17).*
  - **Schritt `mitte`**; mit Formular steht der ganze Formularblock (Kasten, Anruf, WhatsApp, Zusatz, lange Einleitung) `links`
    an der Leitachse, auch auf / (V-6). Ohne Formular: lange Einleitung linksbündig im Lesemaß.
  - **Wissensblöcke**: `Wissensblock.satz` im Inhalt, Standard `links` (mit `zeichnung` `breit`), kein Wechsel nach Index.
  - Treppe (Ablauf), Fotoreihe, Stimmen, Einsatzorte: unverändert (tragen ihren Versatz schon bzw. gehören M-B5).
- M-A4 Nr. 4: Abschnitte mit `satz` links stehen ab md an der Inhaltskante, 16 px am Lot (`md:mx-0`; geteilt ab lg in
  Spalten 1 bis 2). Register `leitachse` („was“, register.ts und register.json gleich) und KERN K-007 (Leitfaden-Motiv,
  Spalte Gestalt) in der Kopie nachgezogen (V-13). *Nacharbeit: erst ab der Teilung (lg), B8; Register und KERN wieder gleich
  `vor`, Satz für den Orchestrator in 7.1 B11.*
- Geprüft im Bildsatz d1440 und d1920 (bewegt, je Bildschirmhöhe): Lage links, Tun rechts, Treppe, Fotoreihe im Versatz,
  Versprechen rechts, Schritt mittig bzw. Formularblock links; nie zwei Stränge nebeneinander (alle Teile stehen untereinander).
  An den Übergängen stehen zwei Blöcke verschiedener Achse übereinander im selben Bildschirm (z. B. Ende Tun rechts und Kopf der
  Treppe), aber nie nebeneinander.
- ErzaehlSeite.tsx und WissensSeite.tsx (Spalte `dateien`) brauchten keine Änderung: Die Standards stehen in den Bausteinen.

### M-B6 Beleg · umgesetzt
- Nr. 1: `fotosVersatz` und `fotosVerlauf` sind ab drei Fotos Standard (`false` im Inhalt schaltet ab); der Verlauf steht ohne
  Maus nur hinter der Namenszeile („Ansehen“ bleibt für den Vorleser). Neu im Versatz: /bad, /standorte/wetzlar (alle Ortsseiten
  mit drei Fotos); neu mit Verlauf: /bad, /bad/badsanierung, /leistungen („Drei Arbeiten“), /fliesen, /balkon-terrasse, Ortsseiten.
  / unverändert (hatte beides).
- Nr. 2: neues **`@utility glas-hoch`** in globals.css (Block nach `einstieg-foto-hoch`): `width: min(100%, calc(70svh *
  var(--bild-format)))` (V-1). Gilt für Reihen mit einem oder zwei Hochformaten und für das Zweierbild. Zwei Hochformate rücken
  ab md an die Mitte zusammen (V-11). Gemessen /bad/barrierefreies-bad d1440: Fotos 596 × 745 → 504 × 630 px, Kopf bis Ende der
  Reihe 920 → 805 px (Bildschirm 900); d1920 671 × 838 → 605 × 756, 1035 → 953 px (Bildschirm 1080).
- Nr. 3: Zweierbild als **`Glaspaar`** (neu in `teile/Fotos.tsx`, Export samt `bildFormat`): zwei Glasbilder ohne Link, Name auf
  der Glasfläche (Verlauf), 1-px-Fuge zwischen den Fotos (ab md links am zweiten Bild, mobil oben), beide höchstens 70svh,
  gemeinsam mittig. Kopf mittig: im Abschnitt der Fotos als Unterkopf (figcaption, Anzeige fs-5, eine Stufe unter der H2,
  `data-kopf-pause` bleibt), oder als **eigener Abschnitt** über die neue Angabe **`zweierbild.abschnitt: { id, flaeche? }`**
  (H2 des Abschnitts, Muster wie `ZweiterBeleg`; für M-C9 auf /bad/barrierefreies-bad). Die Bildunterschriften des Inhalts sind
  jetzt die Namen auf der Glasfläche (Wortlaut gleich, Alt-Texte aus ARBEITEN unverändert).
- Nr. 4: Beleg nur mit Satz (/blog „Aus unserer Praxis“): eine Stufe weniger Innenabstand (`pt-12 pb-12 lg:pt-16 lg:pb-16`, wie
  das geschlossene Versprechen).
- Nr. 5: Zwischen Fotoreihe und Weg eine Stufe 16 (64 px): Wo alle Fotos nebeneinander passen (bis drei ab lg, zwei ab md),
  entfällt der leere Platz der unsichtbaren Karussell-Knöpfe (V-2). /bad d1440: vom tiefsten Foto bis zum Weg 132 → 64 px
  (Spur `pb-4` und Weg `mt-12`; vorher dazu Knopfzeile 44 px und `sm:mt-6`).

### X-1 axe label-content-name-mismatch · behoben
- Ursache: nicht `Knopf.tsx` mit `extern` und nicht der Name des WhatsAppLogo (es ist `aria-hidden`), sondern der WhatsApp-Link
  im Abschluss `components/ui/FinalCTA.tsx` (auf /preise, /termin, /leistungen/bad, /foerderung): `aria-label="WhatsApp Nachricht
  an Fliesenverlegung Tezgel senden"` bei sichtbarem Text „Per WhatsApp schreiben“; der Name enthielt den sichtbaren Text nicht
  (WCAG 2.5.3). Behoben durch Entfernen des aria-label: Der Name ist jetzt der sichtbare Text (V-9). Wortlaut gleich.
- Nachweis `axe.mjs --seiten /preise,/termin,/leistungen/bad,/foerderung --zustaende`: vorher (4325) 132 Läufe, 104 Knoten
  `label-content-name-mismatch`; nachher (4490, Endstand) 132 Läufe, 0 Knoten ernst/kritisch. In einem früheren Nachher-Lauf
  (Bau 2) stand einmal 1 Knoten `target-size` (/termin, q844, Zustand „menue“, Schließen-Knopf des Menüblatts); drei weitere
  Läufe (zwei nur /termin, einer auf dem Endstand) je 0. Nicht durch SF-B2 (Menü unberührt), Beobachtung in O-6.

## 2 Entscheidungsvermerke (Abweichungen vom Plan)
- **V-1 glas-hoch begrenzt über die Breite.** Ziel: höchstens 70svh hoch, Foto ganz im eigenen Seitenverhältnis. Alternativen:
  (a) `max-height: 70svh` am Bild mit `width: auto` (das Glasbild und seine Fläche blieben so breit wie die Karte, die Fläche
  stünde neben dem Foto); (b) `object-fit: contain` (Ränder im Feld); (c) Breite aus `--bild-format` (wie `einstieg-foto-hoch`).
  Gewählt (c): `--bild-format` als CSS-Variable am Element (Inline-Stil nur mit Variable, K-004). Wirkung wie max-height 70svh.
  Risiko: keins bekannt; schmaler als der Platz nur, wo nötig. Rückweg: Klasse und `bildFormat` entfernen.
- **V-2 Leerer Knopfplatz per Selektor in Beleg.** Ziel M-B6 Nr. 5 ohne Sprung. Der Platz der Knöpfe steht im Karussell absichtlich
  von Anfang an (kein Sprung beim Hydrieren). Wo die Reihe nie blättert (zwei Fotos ab md, drei ab lg), blendet Beleg die
  unsichtbare Knopfzeile aus (`md:`/`lg:[&>[aria-hidden]]:hidden` am Karussell, nur solange sie aria-hidden ist). Alternative:
  Prop am Karussell (`kern/Karussell.tsx`, nicht in der Spalte `dateien`). Risiko: Rechnet das Karussell dort doch einen Überlauf,
  erscheinen die Knöpfe nach dem Hydrieren (Sprung). Geprüft im Browser d1440 (/leistungen, /bad): kein Überlauf (scrollWidth =
  clientWidth). Rückweg: Klasse `ohneKnoepfe` entfernen.
- **V-3 Wissensblock mit großem Moment `breit`.** Plan: Standard links. Beide Wissensseiten haben je einen Block mit `zeichnung`
  (Verband-Wähler, Artikelliste mit breiten Zeilen aus M-C8); in zwei Dritteln stünden diese Momente gequetscht. Gewählt: `links`
  ohne Zeichnung, `breit` mit Zeichnung, beides im Inhalt überschreibbar (`satz`). Wirkung: /fliesen und /blog tragen ihren
  Versatz in Lage (links), Fotoreihe und Versprechen (rechts). Rückweg: Standard in `Wissen.tsx` auf `'links'`.
- **V-4 Lage nur mit der Auswahl bleibt `breit`.** Die Lage von / besteht nur aus der Auswahl in zwei Spalten; `links` hätte sie
  auf zwei Drittel gequetscht und / außerhalb des Schritt-Bands geändert (Plan: Pixel auf / nur im Schritt). Ihre Einleitung
  (94 Zeichen) bleibt dort mittig. Rückweg: Bedingung in `Lage.tsx`.
- **V-5 Lange Einleitung bei `breit` im Lesemaß linksbündig.** Plan: „länger linksbündig im Inhaltsblock“; bei breit ist der Block
  die volle Breite. Gewählt: linksbündig im mittigen Lesemaß wie bei mitte (sonst stünde sie am linken Rand unter dem mittigen
  Kopf über einem mittigen Moment). Befund /bad/barrierefreies-bad a8 (zentrierte Absätze mit Flatterrand) ist damit auch über den
  Momenten behoben. Rückweg: `einleitungBuendig` auf `satz === 'mitte'`.
- **V-6 Schritt mit Formular: der ganze Formularblock links.** Plan: „darin der Formularkasten links an der Leitachse“. Stünde nur
  der Kasten links und Anruf, WhatsApp und Öffnungszeiten mittig darunter, sprängen zwei Achsen in einem Bildschirm (Befund
  /standorte/wetzlar a7). Gewählt: Kasten, Anrufzeile, Zusatz und lange Einleitung gemeinsam links (`satz="links"`), Kopf mittig.
  Wirkung auf /, /leistungen, Ortsseiten (Pixel nur im Schritt-Band). Rückweg: `satz` im FormularSchritt entfernen, Klassen zurück.
- **V-7 Tun mit großem Moment: Abschnitt breit, Liste rechts im eigenen Satzblock.** So steht der Moment in voller Breite und die
  Einleitung im Lesemaß über ihm; Punkte und Absatz folgen rechts (der Versatz dieses Bildschirms).
- **V-8 `TunInhalt.satz` zusätzlich zu `Wissensblock.satz`.** Die Spalte `dateien` nennt in inhalt.ts nur `WissenBlock.satz`;
  M-C9 (SF-C3) braucht für die Bad-Unterseiten einen Schalter, wenn ein anderer Teil den Versatz trägt. Standard `rechts`.
- **V-9 X-1 in `components/ui/FinalCTA.tsx`** (nicht in der Spalte `dateien`; der Orchestrator nannte Knopf.tsx und WhatsAppLogo
  als Verdacht). aria-label entfernt statt „Per WhatsApp schreiben: …“ voranzustellen: kein neuer Mikrotext, Name = sichtbarer
  Text. Verloren geht nur der Zusatz „an Fliesenverlegung Tezgel“ (steht ohnehin auf der Seite). Rückweg: aria-label mit dem
  sichtbaren Text am Anfang.
- **V-10 Breite der Zeilen.** In der Lage (links) stehen die Wege im Lesemaß, damit sie mit den Absätzen darüber fluchten (wie
  bisher); im Tun (rechts) und Versprechen (rechts) laufen Zeilen und Fugen über die ganze Spalte bis zur rechten Satzkante, der
  Satz darin bleibt im Lesemaß. So liest sich rechts als ein Block an der Kante, nicht als leicht verschobene Mittelspalte.
- **V-11 Zwei Hochformate rücken zusammen** (`md:ml-auto` am ersten, `md:mr-auto` am zweiten): je mittig in ihrer Hälfte stünden
  sie mit rund 170 px Abstand. Abstand jetzt 24 px (Kartenabstand des Karussells), mobil unverändert eine Karte je Bild.
- **V-12 Unterkopf des Zweierbilds** als figcaption in Anzeige fs-5, mittig (vorher fs-5 links). Als eigener Abschnitt steht der
  Titel als H2 in fs-6. Kein neuer Text; der Titel trägt weiter keinen Punkt (Textvorschlag 1).
- **V-13 Register und KERN nur mit je einem Satz.** *(Entfällt mit der Nacharbeit, B11.)* `leitachse.was` in register.ts und register.json (gleich, Test „Bewegung 13“)
  und K-007 Leitfaden-Motiv Spalte Gestalt; die Spalte „Ruhig“/„reduziert“ ändert SF-A2 (M-A4 Nr. 2/3), so berühren sich die
  Diffs dort nicht. Version und Änderungsprotokoll nicht angehoben (Orchestrator).
- **V-14 `Punktfliesen` → `Punktliste`** (Exportname): Die Liste ist keine Fliese mehr; einzige weitere Verwendung `Wissen.tsx`.
- **V-15 `zweierbild.abschnitt` statt einer Prop an `ZweiterBeleg`.** Die Fotos stehen im Inhalt, `ZweiterBeleg` kommt als Moment
  von der Seite; die Angabe im Inhalt hält Fotos, Titel und Abschnitt zusammen (Kennung und Fläche wie bei `ZweiterBeleg`).

## 3 Gewollte Pixeländerungen je Ansicht (gegen 4325)
- `/`: nur das Schritt-Band „Termin vor Ort anfragen“: Satz linksbündig, Formularkasten mit Anruf, WhatsApp und Öffnungszeiten links
  an der Leitachse (d1440 y 5867–7142, d1920 y 6610–8043, m390 y 6467–6536 nur der Satz). Alles andere pixelgleich (Kontrolllauf).
- `/bad`: Lage links (Absätze und Wege; Wegnamen fs-4 halbfett); Tun: Schichten breit, Punkte nummeriert rechts, DIN-Satz rechts;
  Fotos im Versatz mit Verlauf, Weg 64 px unter den Fotos; Schritt-Satz linksbündig.
- `/bad/badsanierung`: Lage links; Tun rechts (Einleitung im Block, Punkte nummeriert, Absatz); Fotos mit Verlauf; Zweierbild als
  Glaspaar mit mittigem Unterkopf, 70svh; Versprechen-Zeile rechts; Schritt-Satz linksbündig, wo lang.
- `/bad/barrierefreies-bad`: Lage links; Tun-Einleitung linksbündig, Gefälle breit, Punkte nummeriert rechts; zwei Hochformate
  70svh, zusammengerückt; Zweierbild als Glaspaar mit mittigem Unterkopf; Seite d1440 9.901 → 9.482 px.
- `/leistungen`: Lage links (lange Einleitung im Block); Tun-Einleitung linksbündig über den Plänen; „Drei Arbeiten“ mit Verlauf
  und ohne leeren Knopfplatz ab lg; Formular-Schritt links.
- `/fliesen`: Lage links mit ruhigeren Wegnamen; Wissensblock-Absatz linksbündig, Wege fs-4; Fotos mit Verlauf; Versprechen rechts.
- `/balkon-terrasse`: Lage links; Fotos mit Verlauf; Tun-Einleitung linksbündig, Prüfliste nummeriert rechts; Vergleich-Einleitung
  linksbündig (lang); Versprechen rechts.
- `/referenzen`: Lage links; Tun rechts (Einleitung, Zeilen fs-4, Punkte nummeriert, Absatz); Galerie, Vorher-Nachher unverändert.
- `/ueber-uns`: Lage links; Tun rechts (Einleitung, Zeilen, Punkte); Versprechen rechts; übrige Abschnitte unverändert.
- `/standorte/wetzlar` und alle Ortsseiten: Lage links samt Einzugsband; Tun rechts (Einleitung, Zeilen mit Vignette, Namen fs-4);
  Fotoreihe im Versatz mit Verlauf, Weg 64 px darunter; Versprechen rechts; Formular-Schritt links.
- `/blog`: Wissensblock-Absatz linksbündig; Lage links; „Aus unserer Praxis“ mit kleinerem Innenabstand; Versprechen rechts.
- `/kontakt`: unverändert (d1440 und d1920 pixelgleich im Kontrolllauf; m390 nur Kantenglättung im Fuß).
- Auch alle übrigen Seiten mit den Vorlagen (Bad- und Fachseiten, Wissensseiten, Ortsseiten) folgen den neuen Standards.
- /preise, /termin, /leistungen/bad, /foerderung: nur der zugängliche Name des WhatsApp-Links (kein Pixel).

Seitenhöhen ruhig (vor → nach; d1440 aus den Kontrolläufen, m390 aus `vor`/`nach`):
- d1440: /bad 12.581 → 12.551 · /bad/badsanierung 10.461 → 10.195 · /bad/barrierefreies-bad 9.901 → 9.482 · /leistungen
  10.644 → 10.624 · /fliesen 10.325 → 10.200 · /balkon-terrasse 10.737 → 10.691 · /referenzen 11.605 → 11.493 · /ueber-uns
  13.129 → 13.043 · /standorte/wetzlar 9.380 → 9.376 · /blog 10.257 → 10.193 · / 9.014 und /kontakt 6.508 gleich.
- m390: /bad 13.178 → 13.189 · /bad/badsanierung 10.596 → 10.477 · /bad/barrierefreies-bad 9.756 → 9.618 · /leistungen
  11.502 → 11.550 · /fliesen 10.303 → 10.331 · /balkon-terrasse 11.268 → 11.248 · /referenzen 13.146 → 13.124 · /ueber-uns
  13.012 → 12.964 · /standorte/wetzlar 9.446 gleich · /blog 11.601 → 11.569 · / 10.277 und /kontakt 6.949 gleich. Mobil länger, wo
  eine Einleitung jetzt linksbündig umbricht oder die nummerierte Liste eine Zeile mehr braucht (Nummer und Satz); kürzer, wo das
  Zweierbild ohne Unterschriftleiste steht.

## 4 Textvorschläge (für TEXTVORSCHLAEGE.md; bis zur Antwort bleiben die Texte)
Keine neuen Mikrotexte gesetzt.
1. Ansicht: /bad/barrierefreies-bad · Stelle: Titel des Zweierbilds (Unterkopf, mit M-C9 H2) · heute: „So entsteht eine Dusche ohne
   Stufe“ · Vorschlag: „So entsteht eine Dusche ohne Stufe.“ · Grund: Als Kopf im Satz der übrigen Köpfe enden alle H2 mit Punkt.
2. Ansicht: /bad/badsanierung · Stelle: Titel des Zweierbilds · heute: „So sieht ein Bad im Bau aus“ · Vorschlag: „So sieht ein Bad im
   Bau aus.“ · Grund: wie 1.
3. Ansicht: /preise, /termin, /leistungen/bad, /foerderung · Stelle: WhatsApp-Knopf im Abschluss · heute: sichtbar „Per WhatsApp
   schreiben“ · Vorschlag: „Nachricht per WhatsApp“ · Grund: K-010 nennt den WhatsApp-Weg sonst überall „Nachricht per WhatsApp“
   (Kopf, untere Leiste, Schritt); ein Name für denselben Weg.

## 5 Offene Fragen
- O-1: V-5 (lange Einleitung bei `breit` linksbündig im Lesemaß) und V-3 (Wissensblock mit Zeichnung breit) bestätigen?
- O-2: V-2 auf Dauer als Prop im Karussell (`knoepfe` nur bei Bedarf) statt Selektor in Beleg?
- O-3: KERN: Der Satzspiegel ist eine Regel des Systems. Vorschlag für die Ruhe-Regel „Fläche“ (K-003): „Köpfe mittig; der Inhalt
  steht nach `satz` (Abschnitt): Lage links an der Laserlinie, Was wir tun rechts, große Momente breit, Versprechen rechts,
  Schritt mittig mit Formularblock links; je Bildschirmhöhe ein Versatz, nie zwei Stränge nebeneinander (UM-E4-SICHT-FIX M-B1).“
  Eintrag durch den Orchestrator.
- O-4: Für SF-C3: M-C9 auf /bad/barrierefreies-bad setzt `zweierbild.abschnitt = { id: '…' }` (eigener Abschnitt mit H2) und für
  „gefaelle-dusche in voller Breite“ die Breite in GefaelleDusche selbst (der Moment steht im Tun schon breit, begrenzt sich aber
  auf `max-w-mass`). *Nacharbeit (B5): dasselbe für `gefaelle-balkon` auf /balkon-terrasse (GefaelleBalkon, Figur 417–1023 bei
  d1440); erst danach zählt „große Momente breit“ dort als erfüllt. Mit vollbreitem Moment kann `tun.satz = 'rechts'` die Liste in
  Spalte 2 bis 3 setzen (V-16).* Die Liste der Prüfpunkte auf /balkon-terrasse ist schon die `Punktliste`.
- O-5: Die ruhigen Ganzseitenaufnahmen sind im ersten Bildschirm nicht deterministisch (zwei Läufe auf demselben Stand 4325
  weichen auf /bad, /bad/badsanierung, /bad/barrierefreies-bad, /blog, /fliesen, /standorte/wetzlar ab y 147 bis 449 ab, d1920 auch
  /kontakt mit verkleinerter H1); im Browser sind die Größen gleich (H1 /kontakt d1920 63 px auf 4325 und 4490). Für den
  Pixelvergleich die Kontrolläufe nehmen, für den ersten Bildschirm erstesbild (72/72 gleich).
- O-6: axe target-size am Schließen-Knopf des Menüblatts (/termin, q844, Zustand menue) einmal in vier Läufen: Messung während des
  Öffnens? Nicht SF-B2.

## 6 Prüfzahlen (Stand vor der Nacharbeit, Bau 4 auf 4490; vorher 4325; Endstand siehe 7.4)
- `npm test`: 270 Tests, 270 bestanden, 0 übersprungen (mit Produktionsbau; `test/stylesheets.test.mjs` grün, ein Stylesheet je
  Seite; `test/bewegung.test.mjs` „Bewegung 13“ grün mit dem geänderten `leitachse.was`).
- `npx tsc --noEmit`: 0 Fehler. `npx eslint` über die 12 geänderten Code-Dateien: 0 Befunde.
- `werte.mjs --dateien` (13 Dateien, 868 Klassenvorkommen, 207 eindeutig): 2 Befunde `dauer_zahl` (`0.01ms` in globals.css Z. 449/450,
  Reduziert-Regeln), dieselben 2 in `vor` (Ausnahme greift mit absoluten Pfaden nicht, wie bei SF-C1 vermerkt); neu 0.
  `lg:@lg:…` und `md:/lg:[&>[aria-hidden]]:hidden` gelten nicht als Beliebigwerte (Wert ohne Klammer).
- `next build`: erfolgreich (Turbopack 16.4.3). Bau 4 = Endstand; seine gerenderte Auszeichnung (ohne Skripte und Links) ist auf den
  12 Hauptansichten und /preise gleich der von Bau 3, auf dem die Nachher-Bilder entstanden (einzige Änderung danach: ein Zweig für
  ein einzelnes Hochformat, den keine Seite nutzt).
- CSS gebaut (ein Stylesheet je Seite; /, /bad, /blog, /standorte/wetzlar, /kontakt, /bad/barrierefreies-bad, /fliesen geprüft):
  roh 142.465 → 143.141 B (+676), gzip −9 24.541 → 24.656 B (+115), gzip −6 24.667 → 24.779 B (+112). Gegen 4d2d3fef (4324,
  23.400 B gzip −9): +1.256 B (Welle 1 +1.141, SF-B2 +115); vom Budget 4 KB bleiben für SF-A2 und SF-C3 rund 2,7 KB.
  Neu: `glas-hoch`, `lg:@lg:grid-cols-3`, `lg:@lg:col-span-2`, `lg:@lg:col-start-2`, `lg:@lg:mx-0`, `lg:@lg:max-w-none`,
  `md:mx-0`, `md:ml-auto`, `md:mr-auto`, `md:justify-center`, `md:/lg:[&>[aria-hidden]]:hidden`, `@xs:items-baseline`, `@xs:gap-6`,
  `@xs:py-6`; entfallen `@xs:gap-3`, `@xs:mt-2`.
- `erstesbild.mjs` (12 Hauptansichten, m390, q844, d1440, Erstbesuch und nach Einwilligung): vorher 56/72, nachher 56/72 mit allen
  fünf Punkten, je Fall gleich (72/72); nach Einwilligung 36/36; die Ausfälle sind im Erstbesuch der Cookie-Hinweis (q844 und
  einzelne m390), unverändert. m360 mit 200 % (vorübergehende Kopie mit `html { font-size: 200% }` ab dem ersten Bild, Verfahren wie
  SF-B V-14): vorher 12/24, nachher 12/24, je Fall gleich (24/24), nach Einwilligung 12/12.
- axe X-1 (4 Seiten, `--zustaende`): 104 → 0 Knoten (siehe 1). axe Hauptansichten (12, Standardansichten): 132 Läufe, 0 Knoten
  ernst/kritisch.
- `lesbarkeit.mjs` (12 Hauptansichten): vorher GRÜN 10 / ROT 2, nachher GRÜN 10 / ROT 2 (beide ROT: Floskeln in den H1 von / und
  /bad/badsanierung, G8); Flesch gleich bis auf /bad/barrierefreies-bad 76,3 → 76,1 (Namen des Zweierbilds auf der Glasfläche).
- `ueberlappung.mjs` (11 Ansichten × m390, t768, d1440, d1920 = 44 Fälle): vorher 84, nachher 84 Befunde, je Fall dieselben.
- Messung im Browser: /standorte/wetzlar d1440 Lage-Text ab x 112 bei Lot x 96 (16 px, M-A4 Nr. 4), Tun-Einleitung und Zeilen ab
  x 517 (Spalte 2) bis 1122 bzw. 1328 (rechte Satzkante); t768 Einleitung und Zeilen fluchtend 81–687, Lage-Text ab 32 (Lot 16).
  /bad/barrierefreies-bad siehe M-B6 Nr. 2.
- Pixelvergleich ruhig (Kontrolläufe nacheinander, d1440/d1920): /kontakt gleich; / weicht nur im Schritt-Band ab; die übrigen
  Ansichten ab dem ersten geänderten Abschnitt. Einzelne Abweichungen im ersten Bildschirm (/bad y 130, /balkon-terrasse y 108,
  /standorte/wetzlar y 178, /leistungen y 147) sind Laufrauschen der Ganzseitenaufnahme: Sie treten ebenso zwischen zwei Läufen
  auf 4325 auf (O-5); erstesbild ist je Fall gleich.
- Bilder: 12 Hauptansichten × d1440, d1920, m390 × ruhig und bewegt, vorher und nachher; Kontrolläufe ruhig d1440/d1920 vorher und
  nachher; t768 nachher für /bad und /standorte/wetzlar.
- Keine Lighthouse- und keine Zeitmessung (E-076). Server 4490 gestoppt (nur eigene Prozesse, Arbeitsverzeichnis baum), `.next`
  und die echte Kopie von node_modules gelöscht, Symlink wiederhergestellt, `next-env.d.ts` auf den Stand von `vor`,
  `tsconfig.tsbuildinfo` entfernt, Hilfsskripte `sfixb2-*.mjs` aus `werkzeuge/` gelöscht. 4324 und 4325 liefen durchgehend.

## 7 Nacharbeit nach der Prüfung (16 Befunde, Bau 6 auf 4490)

Jeder Befund selbst nachgeprüft (Messung im Browser auf 4325 und 4490: `nach5/mass-4325.json`, `nach5/mass-4490.json`; gebaute
Chunks; `patch --dry-run` mit dem a2-Diff). Wo dieser Abschnitt einer früheren Angabe in 1 bis 6 widerspricht, gilt dieser Abschnitt.

### 7.1 Behoben
- **B1 Tun mit großem Moment: zwei Kanten 100 px nebeneinander (mittel, bestätigt).** Vorher Einleitung, Zeichnung und Legende
  417–1023, Liste und Absatz 517–1328 (d1440). Jetzt stehen Zeilen, Punkte und Absatz ohne Angabe im Inhalt auf der Kante des
  Moments im mittigen Lesemaß (`satz` mitte, der Abschnitt bleibt breit): /bad/barrierefreies-bad und /balkon-terrasse d1440
  Einleitung, Zeichnung und Liste 417–1023 (Satz der Liste ab 473), d1920 620–1300; /bad Liste 417–1023 unter der Legende
  (417–1023). **V-16** (neu): Plan „Tun mit Zeilen oder Punkten rechts“ gilt so nur ohne Moment. Ziel: eine Kante je
  Bildschirmhöhe, solange der Moment im Lesemaß steht. Alternativen: Einleitung und Legende ebenfalls in Spalte 2 (der Moment
  stünde dann allein mittig, wieder zwei Kanten); Liste rechts nur ohne Moment (gewählt). Wirkung: die drei Seiten mit Moment
  (/bad, /bad/barrierefreies-bad, /balkon-terrasse; /leistungen hat nur Einleitung und Moment) tragen im Tun den Breitenwechsel
  statt des Versatzes, ihr Rhythmus unterscheidet sich jetzt von den übrigen Unterseiten (Teil von B4). Risiko: keins bekannt.
  Rückweg: in `Tun.tsx` `(moment ? 'mitte' : 'rechts')` auf `'rechts'`. Für M-C9: Füllt der Moment die volle Rasterbreite, kann
  SF-C3 je Seite `tun.satz = 'rechts'` setzen (Liste in Spalte 2 bis 3 unter einem Moment über alle drei Spalten).
- **B4 Drei Achsen am Übergang Versprechen zu Schritt (mittel, bestätigt).** Das Versprechen steht wieder mittig (Zeile 359–1081
  wie auf 4325). **V-17** (neu, Abweichung vom Plan „Versprechen rechts“): Geschlossen trägt das Band nur Kopf und eine Zeile
  (355 px); rechts gesetzt folgte im selben Bildschirm der Schritt mit mittigem Kopf und Formularblock links (/standorte/wetzlar
  d1920 k=6: drei Achsen). Alternativen: Formularblock wieder mittig (Plan M-B1 Nr. 2 und Befund / b3 verlangen ihn links);
  Versprechen rechts lassen (Befund bleibt). Wirkung: rechts folgt nie mehr unmittelbar auf links; das geöffnete Versprechen hat
  wieder die volle Breite (damit entfällt B15). Risiko: der Versatz im Bildschirm des Versprechens fehlt; das Band ist 355 px hoch
  und teilt den Bildschirm mit Stimmen bzw. Schritt, die ihren eigenen Satz tragen. Rückweg: `satz="rechts"` und `satzBlock('rechts')`
  an der Zeile. `Versprechen.tsx` ist damit bis auf den Kopfkommentar wieder gleich `vor`.
  Zum zweiten Teil (gleiche Folge auf allen Seiten): durch B1 haben /bad, /bad/barrierefreies-bad und /balkon-terrasse im Tun einen
  Breitenwechsel statt des Versatzes; weitere Seitenwechsel je Seite sind Inhaltsentscheidungen (Angaben `tun.satz`,
  `Wissensblock.satz`), siehe NO-2.
- **B5 Momente füllen die Breite nicht (mittel, bestätigt, Teil).** Der Konflikt aus B1 ist behoben (Liste auf der Kante des
  Moments). Die Breite der Zeichnungen selbst gehört M-C9 (SF-C3): `GefaelleDusche` und `GefaelleBalkon` begrenzen sich auf
  `max-w-mass` (Figur 417–1023 bei d1440 in einem breiten Abschnitt). O-4 ergänzt: auch `gefaelle-balkon`. In der Bewertung zählt
  „große Momente breit“ für diese zwei Seiten erst mit M-C9 als erfüllt.
- **B6 glas-hoch bei q844 zu klein (mittel, bestätigt).** 70svh sind bei 390 px Höhe 273 px. `glas-hoch` hat jetzt eine Untergrenze
  von 30 rem Höhe: `width: min(100%, calc(max(70svh, var(--spacing) * 120) * var(--bild-format)))`. Gemessen /bad/barrierefreies-bad:
  q844 Galerie 378 × 473 (volle Karte, so groß wie auf 4325), Glaspaar 384 × 480 je Foto (vorher 219 × 271); 667 × 375 alle vier
  384 × 480, mittig in der Karte; d1440 504 × 630 und d1920 605 × 756 unverändert (70svh greift); m390 358 × 448 (volle Breite).
  Namensfläche (Textblock auf dem Verlauf) bei q844 115 von 480 px Fotohöhe (24 %), in der Galerie 97 bis 131 von 473 px. Die Kürzung der Namensfläche auf zwei
  Zeilen (Vorschlag) hätte `kern/Glasbild` bzw. bewegung.css geändert (nicht in der Spalte `dateien`), nicht gebaut.
- **B8 Lage zwischen md und lg allein links (gering, bestätigt, klein).** `satzMass` und `satzBlock` setzen die Kante für `links`
  jetzt erst mit der Teilung (`lg:@lg:mx-0`, wie rechts); `md:mx-0` entfällt. t768 /bad: Lage und Tun beide 81–687 (vorher Lage
  32–637). M-A4 Nr. 4 („16 px am Lot“) gilt damit ab lg, also „am Desktop“ wie im Plan; d1440 Lage-Text unverändert ab x 112.
- **B9 Satz der Punktliste 719 px breit (gering, bestätigt, klein).** Die Fuge bleibt am `li` über die ganze Breite der Liste
  (V-10), Nummer und Satz stehen zusammen in einem Block mit `max-w-mass` in der Grundschrift (E-065). d1440 /referenzen,
  /bad/badsanierung, /ueber-uns: Satz 573–1122, Absatz 517–1122, Fugen 517–1328: zwei rechte Kanten (Text 1122, Fuge 1328) statt
  drei. Dasselbe für den Text im Aufklapper „Mehr erfahren“ des Tun (Lesemaß im Wrapper statt am `p` in fs-3).
- **B11 Grenze zu SF-A2 in KERN.md, register.json, register.ts (mittel, bestätigt).** Die drei Hunks (V-13) sind aus dem Diff
  genommen; die drei Dateien sind gleich `vor`. Probe: Kopie von `vor`, erst `patch -p1` mit dem a2-Diff, dann `patch -p1 --dry-run`
  mit dem neuen b2-Diff: alle 13 Dateien ohne Fehler (globals.css mit Versatz 11). **Für den Orchestrator beim Zusammenführen:**
  in `leitachse.was` (register.ts und register.json gleich, Test „Bewegung 13“) und K-007 „Leitfaden-Motiv“ den Satz „Abschnitte
  mit Satz links stehen ab lg 16 px am Lot (UM-E4-SICHT-FIX M-B1, M-A4 Nr. 4)“ in den Text von SF-A2 einfügen (dort ist der
  Halbsatz „wo das Lot gezeichnet ist“ schon gestrichen). Hinweis: „ab lg“ statt früher „ab md“ (B8). V-13 entfällt.
- **B12 klartext und Glossar in Client-Bündeln (mittel, bestätigt).** `EINLEITUNG_LANG` und `langeEinleitung` stehen in einem
  eigenen Modul `src/components/kern/einleitung.ts` (neu); Lage, Tun, Wissen und Schritt importieren von dort, Abschnitt bekommt
  nur `einleitungLang`. **V-18** (neu, Datei außerhalb der Spalte `dateien`, abgespalten aus Abschnitt.tsx). Gebaute Chunks je
  Route gegen reinraum-13315fa8: /termin +11.116 → +758 B roh (+3.948 → +243 B gzip), /faq +11.103 → +758 B (+3.029 → +228 B
  gzip), /blog +209 → 0; die zwölf Hauptansichten und die übrigen geprüften Routen 0 (/, /bad, /bad/badsanierung,
  /bad/barrierefreies-bad, /leistungen, /fliesen, /balkon-terrasse, /referenzen, /ueber-uns, /kontakt, /blog). Der Glossartext
  steht nicht mehr in den Chunks; `satzMass`/`satzBlock` werden weggeschüttelt. Die verbleibenden 758 B sind der Satzspiegel in
  Abschnitt selbst (`Satzblock`, Spaltenklassen, die Weiche für die lange Einleitung): /termin und /faq sind ganze Client-Seiten
  (Altbestand, „use client“) und bündeln Abschnitt mit. 0 ginge nur, wenn der Satzspiegel ganz aus Abschnitt herausgenommen würde
  (Hülle und Einleitungsplatz als Angaben der Aufrufer) oder diese zwei Seiten Serverkomponenten würden; beides nicht in diesem
  Bauteil. Die Arbeitsansichten /termin und /faq sind keine Hauptansichten; Lighthouse misst der Orchestrator.
- **B13 Namen des Zweierbilds nicht im Zugänglichkeitsbaum (mittel, bestätigt).** Ohne Link ist die Glasfläche aria-hidden
  (`kern/Glasbild`). Jedes Foto des Glaspaars ist jetzt ein `figure` mit `figcaption` nur für Hilfsmittel (`sr-only`), Wortlaut
  aus dem Inhalt. Zugänglichkeitsansicht (Playwright `ariaSnapshot`) /bad/barrierefreies-bad: figure „So entsteht eine Dusche ohne
  Stufe“ → figure „Die großen Fliesen liegen, das Gefälle ist geschnitten.“ (Bild mit Alt-Text, Text) und figure „Die Fugen sind
  fertig. Das Wasser läuft zum Ablauf in der Mitte.“; /bad/badsanierung ebenso mit beiden Namen. Vorher (4325) dieselben zwei
  figure-Namen in einer Liste. `lesbarkeit.mjs` liest aria-hidden nicht, die figcaption zählt einmal wie auf 4325.
- **B14 Einzelnes Hochformat unter md linksbündig (gering, bestätigt, klein).** Hochformate in Reihen mit ein oder zwei Fotos stehen
  mit `mx-auto` mittig in ihrer Karte; ab md rücken zwei wie bisher zusammen (`md:mr-0` am ersten, `md:ml-0` am zweiten statt
  `md:ml-auto`/`md:mr-auto`). 667 × 375: Foto x 142 in der Karte 16–651, also mittig (vorher x 16, Prüfer).
- **B15 Versprechen geöffnet zu schmal zwischen 1024 und 1280 (gering).** Durch V-17 entfallen: geöffnet wieder 360 px (1024),
  488 px (1280), 504 px (1440) Text je Punkt, Listenhöhe 855/672/648 px, gleich 4325.
- **B16 veralteter Kommentar im FormularSchritt (gering, bestätigt).** Kommentar beschreibt jetzt den Formularblock im Satzspiegel
  links (ab lg an der Leitachse, darunter mittig).

### 7.2 Nicht behoben, mit Begründung
- **B2 Kopf mittig, Inhalt versetzt, keine gemeinsame Kante (mittel; Regel dokumentiert, /referenzen offen).** Entscheidung: Der
  Kopf bleibt mittig (Plan M-B1 Nr. 1, Ruhe-Regel E-047, Wunsch des Auftraggebers); der Versatz misst sich am Raster (Drittel), nicht
  an der Kopfzeile. „Kopf an der Inhaltskante“ oder „Kopf mittig über dem versetzten Block“ wären Gegenvorschläge zu E-047 und
  brauchen den Orchestrator (NO-3). Durch B1 und V-17 entfallen die Fälle Versprechen (+86) und Tun mit Moment. Verbleibend (H2-Text
  gegen Inhaltskante, Range-Messung): Lage −316 bis −361 (d1440), deutlich versetzt. Tun rechts d1440 / d1920: /bad/badsanierung
  +47 / +55, /standorte/wetzlar +75 / +87, /ueber-uns +97 / +112, **/referenzen −21 / −22**. Nur /referenzen liegt unter einer
  Stufe 6 (24 px) und liest sich als knappe Flucht. Behebbar nur je Seite über `tun.satz` (Inhalt `src/inhalte/referenzen.ts`,
  nicht in der Spalte `dateien` dieses Bauteils) oder über den Titel (Text, K-011): Vorschlag an den Orchestrator in NO-3.
- **B3 Die Leere wandert (mittel; Plan erfüllt, Wirkung begrenzt).** Bestätigt: Lage links lässt rechts rund 610 px frei, Tun rechts
  links 405 px (vom Rand des Rasters 112 bis 517), der Formularblock links rechts 687 px (/ d1920). Das ist der Drittelverband des
  Plans (Versatz statt Mittelsäule); den freien Streifen zu füllen hieße, Anruf und Öffnungszeiten neben das Formular zu stellen
  (K-016/E-047: „alles mittig untereinander statt Kopf links und Knöpfe rechts zugleich“, abgenommene Startseite) oder den Satz nur
  mit Moment zu versetzen (nähme M-B1 auf den meisten Seiten zurück). Darum keine Änderung. NO-4: Wirkung „Komposition“ für M-B1
  nicht höher als +0,1 bis +0,2 ansetzen (statt +0,4 bis 0,6 im Plan).
- **B7 Zwei Fotopaare mit verschiedenen Fugen (gering).** Plan M-B6 Nr. 3 verlangt für das Zweierbild die 1-px-Fuge, die Galerie ist
  ein Karussell mit Kartenabstand; gleiche Fugen hießen das Karussell ändern (`kern/Karussell`, nicht in `dateien`) oder die
  Planvorgabe brechen. Auf /bad/barrierefreies-bad setzt M-C9 das Zweierbild als eigenen Abschnitt (`zweierbild.abschnitt`), dann
  stehen die zwei Paare nicht mehr übereinander in einem Abschnitt (Vorschlag des Prüfers). Nicht klar klein und richtig.
- **B10 Lot in weißen Abschnitten nicht gezeichnet (gering).** Gehört M-A4 Nr. 1 (SF-A2, Lot über alle Flächen). Wirkung erst mit
  beiden Diffs zusammen bewerten; mit B8 gilt „16 px am Lot“ ab lg.

### 7.3 Schnittstellen für SF-C3 (Endstand)
- `kern/Abschnitt`: Angaben `satz?: Satz` (`'mitte' | 'links' | 'rechts' | 'breit'`, Standard `mitte`, nur gestapelt; `links`/`rechts`
  teilen ab lg und ab 32 rem Inhaltsbreite) und `einleitungLang?: boolean`. Exporte `type Satz`, `Satzblock({ satz, className?,
  children })` (Block im Satz, `mitte`/`breit` ohne Hülle), `satzMass(satz)` (Lesebreite eines Textblocks; links/rechts ab der
  Teilung an der Spaltenkante, darunter mittig), `satzBlock(satz)` (dasselbe über die ganze Spalte für Zeilen an der Fuge).
- `kern/einleitung` (neu): `EINLEITUNG_LANG = 90`, `langeEinleitung(text?: string): boolean`. Nur aus Serverkomponenten importieren.
- `teile/Tun`: `Punktliste({ punkte: ReactNode[]; className? })` (Liste aus M-B2: `ol`, Mono-Nummer aria-hidden, Fuge je Punkt,
  Nummer und Satz im Lesemaß), `Bereichszeilen({ bereiche; className? })`. `TunInhalt.satz?: Satz`: Standard `rechts`, mit Moment
  `mitte` (V-16); mit Moment steht der Abschnitt immer `breit`, der Moment in voller Rasterbreite, sofern er sich nicht selbst begrenzt.
- `teile/Beleg` und `inhalt.ts`: `BelegInhalt.zweierbild.abschnitt?: { id: string; flaeche?: 'kalk' | 'fliese' }` macht das Zweierbild
  zum eigenen Abschnitt mit H2 (Titel aus `zweierbild.titel`) nach dem Abschnitt der Fotos und vor `zweiter`; ohne die Angabe Unterkopf
  im Abschnitt der Fotos. `fotosVersatz`/`fotosVerlauf` ab drei Fotos Standard, `false` schaltet ab.
- `teile/Fotos`: `Glaspaar({ fotos: Foto[] })` (zwei Glasbilder an der 1-px-Fuge, je `figure` mit figcaption nur für Hilfsmittel),
  `bildFormat(bild)` (CSS-Variable `--bild-format` für `glas-hoch`).
- `inhalt.ts`: `Wissensblock.satz?: Satz` (Standard links, mit `zeichnung` breit), `Zeile.vignette`.
- globals.css: `@utility glas-hoch` (höchstens 70svh, mindestens 30 rem hoch, nie breiter als der Platz).
- M-B5/M-B8 (Stimmen.tsx, Beleg.tsx, Tun.tsx): Beleg.tsx und Tun.tsx haben in dieser Nacharbeit nur die oben genannten Stellen
  geändert (Tun: Satz-Standard, Punktliste, Aufklapper „Mehr erfahren“; Beleg: `paarKante`); `Leistungszeile` (M-B8) und `Stimmen`
  (M-B5) sind unberührt.

### 7.4 Prüfzahlen (Endstand nach der Nacharbeit, Bau 6 auf 4490; vorher 4325 = reinraum-13315fa8)
- `npm test`: 270 Tests, 270 bestanden, 0 übersprungen (mit Produktionsbau des Endstands, Bau 7 = gleicher Quellstand wie Bau 6,
  `build-7.log`; `stylesheets` grün: ein Stylesheet je Seite; „Bewegung 13“ grün mit unverändertem `leitachse.was`). Log `npm-test.log`.
- `npx tsc --noEmit`: 0 Fehler. `npx eslint` über die 12 geänderten Code-Dateien (inkl. neu `kern/einleitung.ts`): 0 Befunde.
- `werte.mjs --dateien` (13 Dateien, 872 Klassenvorkommen, 210 eindeutig): 2 Befunde `dauer_zahl` (`0.01ms` in globals.css Z. 451/452,
  dieselben 2 wie in `vor`, Zeilen um 2 verschoben); neu 0. Bericht `werte-5/`.
- `next build`: erfolgreich (Turbopack 16.4.3, 179 Seiten), `build-6.log` (Prüfungen und Bilder) und `build-7.log` (npm test). Hinweis: Die echte Kopie von node_modules muss für den Bau
  `node_modules` heißen; als Symlink `node_modules → node_modules_echt` bricht Turbopack mit „useEffect in Server Component“
  (react-markdown) ab (`build-5.log`, erster Versuch).
- CSS gebaut (ein Stylesheet je Bau, gzip -9 mit `gzip`): 4d2d3fef 23.418 B, 13315fa8 24.559 B (+1.141, Welle 1), Endstand 24.677 B:
  **SF-B2 +118 B gzip** (roh 142.465 → 143.156, +691); gegen 4d2d3fef +1.259 B, vom Budget 4 KB bleiben rund 2,7 KB für SF-A2 und SF-C3.
- JS gebaut je Route gegen 13315fa8 (Chunks aus `page_client-reference-manifest.js`): 12 Hauptansichten 0 B; /termin +758 B roh
  (+243 gzip), /faq +758 B (+228 gzip), siehe B12.
- `erstesbild.mjs` (12 Hauptansichten × m390, q844, d1440, Erstbesuch und nach Einwilligung): vorher 56/72, nachher 56/72 mit allen
  fünf Punkten, je Fall gleich (72/72); nach Einwilligung 36/36. m360 mit 200 % (Kopie `sfixb2n-erstesbild200.mjs`, Stil
  `html{font-size:200% !important}` per Init-Skript, wie `_a2n-eb200.mjs` von SF-A2), **beide Stände mit derselben Kopie**: vorher 0/24,
  nachher 0/24 voll, je Fall gleich samt Ursachen (24/24). Die frühere Angabe 12/24 (Abschnitt 6) stammt aus einem Lauf, in dem das
  Logo 48 px hoch blieb, die rem-Stufen also nicht wuchsen; nicht mit diesem Lauf vergleichbar. Belege `pruef-n/erstesbild*`.
- axe X-1 (`--seiten /preise,/termin,/leistungen/bad,/foerderung --zustaende`): vorher (4325, `pruef/axe-4325`) 132 Läufe, 104 Knoten
  `label-content-name-mismatch`; nachher (Bau 6) 132 Läufe, 0 Knoten ernst/kritisch, 0 Treffer der Regel. axe Hauptansichten:
  132 Läufe, 0 Knoten ernst/kritisch. Belege `pruef-n/axe-x1`, `pruef-n/axe-haupt`.
- `lesbarkeit.mjs` (12 Hauptansichten): GRÜN 10 / ROT 2 vorher wie nachher (ROT: Floskeln in den H1 von / und /bad/badsanierung, G8).
  Flesch gleich bis auf /bad/barrierefreies-bad 76,3 → 76,1; Satzzahl dort 44 → 41 und /bad/badsanierung 61 → 59: Das Werkzeug zählt
  Bildunterschriften in Listenpunkten als Fließtext, die figcaption des Glaspaars (B13) nicht. Text und Wortlaut stehen im DOM und im
  Zugänglichkeitsbaum.
- `ueberlappung.mjs` (11 Ansichten × m390, t768, d1440, d1920 = 44 Fälle): vorher 84, nachher 84 Befunde, je Fall gleich.
- Messung im Browser (`nach5/mass-4325.json`, `nach5/mass-4490.json`, Skript `sfixb2n-mass.mjs`, danach gelöscht): Werte in 7.1.

### 7.5 Bilder, Pixel und gewollte Änderungen gegenüber Abschnitt 3
- Bilder neu: `bilder/nach/{d1440,d1920,m390}/{ruhig/<seite>.png | bewegt/<seite>/NN.png}` und `bilder/nach/t768/ruhig` (/bad,
  /standorte/wetzlar), Bau 6 auf 4490, PNG, DPR 1, Einwilligung abgelehnt; ruhig über den Bewegungsschalter (`tezgel-bewegung=ruhig`,
  `data-bewegung="ruhig"` in allen 38 Aufnahmen bestätigt), ganze Seite nach langsamem Durchscrollen; bewegt je Bildschirmhöhe nach dem
  Durchscrollen (Endzustand). Log `bilder/nach.log`. Vorher-Bilder `bilder/vor/` (4325) bleiben gültig (4325 unverändert). Dazu
  `bilder/kontrolle-vor2/{d1440,d1920,m390}/ruhig`: 4325 mit demselben Skript wie `nach` aufgenommen, für den Pixelvergleich.
  `bilder/kontrolle-nach` und `bilder/blick` des alten Stands gelöscht; `bilder/blick` jetzt: Tun /bad/barrierefreies-bad d1440
  (eine Kante 417), /referenzen d1440, erster Bildschirm /balkon-terrasse vorher/nachher (zum Rauschen O-5).
- Pixelvergleich ruhig (`pixel.py`; nach gegen kontrolle-vor2, gleiches Verfahren): **/kontakt auf d1440, d1920 und m390 pixelgleich**;
  **/ nur im Schritt-Band** (d1440 ab y 5867, d1920 ab y 6610, m390 nur y 6467–6535); übrige Ansichten ab dem ersten geänderten
  Abschnitt (d1440 ab y 1278 bis 1696, Lage). Im ersten Bildschirm weichen /bad/barrierefreies-bad, /balkon-terrasse, /leistungen und
  /blog (d1440) ab: In der Vorher-Aufnahme steht die H1 verkleinert (Ganzseitenaufnahme, O-5); erstesbild ist je Fall gleich (72/72).
- Seitenhöhen ruhig (vorher → nachher), d1440: /bad 12.581 → 12.551 · /bad/badsanierung 10.461 → 10.286 · /bad/barrierefreies-bad
  9.901 → 9.543 · /leistungen 10.644 → 10.576 · /fliesen 10.325 → 10.200 · /balkon-terrasse 10.737 → 10.722 · /referenzen 11.605 →
  11.584 · /ueber-uns 13.129 → 13.134 · /standorte/wetzlar 9.380 → 9.376 · /blog 10.257 → 10.193 · / 9.014 und /kontakt 6.508 gleich.
  d1920: /bad 14.203 → 14.168 · /bad/badsanierung 11.823 → 11.674 · /bad/barrierefreies-bad 11.192 → 10.884 · /leistungen 12.029 →
  11.953 · /fliesen 11.687 → 11.544 · /balkon-terrasse 12.134 → 12.116 · /referenzen 13.164 → 13.139 · /ueber-uns 14.824 → 14.793 ·
  /standorte/wetzlar 10.551 → 10.546 · /blog 11.539 → 11.467 · / und /kontakt gleich. m390: wie in Abschnitt 3 (/bad 13.189,
  /bad/badsanierung 10.477, /bad/barrierefreies-bad 9.618, /balkon-terrasse 11.248, /blog 11.569, /fliesen 10.331, /referenzen
  13.124, /ueber-uns 12.964; /leistungen, /standorte/wetzlar, /, /kontakt gleich).
- Gewollte Pixeländerungen, geändert gegenüber Abschnitt 3: Tun mit großem Moment (/bad, /bad/barrierefreies-bad, /balkon-terrasse):
  Punkte und Absatz mittig im Lesemaß auf der Kante des Moments statt rechts (V-16). Versprechen auf allen Ansichten unverändert gegen
  4325 (V-17; entfällt in 3 bei /bad/badsanierung, /fliesen, /balkon-terrasse, /ueber-uns, /standorte/wetzlar, /blog). Punktliste
  rechts: Satz endet an der Kante des Absatzes (B9). t768 und q844: Lage und Formularblock mittig wie die Nachbarn (B8). q844 und
  Handy quer: Hochformate und Glaspaar 30 rem hoch, mittig in der Karte (B6, B14). Kein Pixel: Bildunterschrift des Glaspaars für
  Hilfsmittel (B13), Register und KERN (B11), Modul `kern/einleitung` (B12).

### 7.6 Offene Fragen der Nacharbeit (NO-1 bis NO-5; O-1 bis O-6 siehe 5)
- NO-1: V-16 und V-17 bestätigen (Tun mit Moment mittig, Versprechen mittig; beides Abweichung von M-B1 Nr. 2).
- NO-2: Rhythmus je Seite (B4): Soll je Seite mindestens ein Abschnitt die Seite wechseln (z. B. Lage rechts)? Dafür fehlt eine Angabe
  `LageInhalt.satz`; nicht gebaut (Lage links trägt M-A4 Nr. 4, Lot am Inhalt). Mit `tun.satz` und `Wissensblock.satz` ist es je
  Seite im Inhalt möglich (Inhaltsdateien nicht in diesem Bauteil).
- NO-3: /referenzen (B2): Tun-Kopf und Inhaltskante 21 px auseinander. Vorschlag: `tun.satz: 'mitte'` in `src/inhalte/referenzen.ts`
  (Versatz trägt dort die Galerie), oder Abschnittsregel „Kopf mittig über dem versetzten Block“ als Gegenvorschlag zu E-047.
- NO-4: Wirkung M-B1 in der Bewertung (B3): Komposition +0,1 bis +0,2 statt +0,4 bis 0,6; die Leerfläche wandert mit dem Versatz.
- NO-5: Beobachtung ohne Bezug zu SF-B2: Im Repository fehlen beim Abschluss die versionierten Dateien
  `_werkstatt/werkzeuge/_pruefb2l-eb200.mjs` und `_pruefb2l-geo.mjs` (`git status`: D). Nicht von mir gelöscht (eigene Hilfsskripte
  hießen `sfixb2n-*.mjs`); bitte prüfen.

### 7.7 Aufräumen
Server 4490 gestoppt (nur der eigene Prozess, Arbeitsverzeichnis baum), `.next` und die echte Kopie von node_modules gelöscht, Symlink
`node_modules → /home/user/tezgel/node_modules` wiederhergestellt, `next-env.d.ts` gleich `vor`, `tsconfig.tsbuildinfo` entfernt,
Hilfsskripte `sfixb2n-mass.mjs`, `sfixb2n-erstesbild200.mjs`, `sfixb2n-bilder.mjs` aus `werkzeuge/` gelöscht. 4324 und 4325 liefen
durchgehend. Diff neu: `UM-E4-SICHT-FIX-b2.diff` (13 Dateien, 874 Zeilen, ohne node_modules, .next, bilder, tsconfig.tsbuildinfo,
next-env.d.ts); `patch -p1 --dry-run` gegen das Repository (1a848a78) ohne Fehler und ohne Versatz; nach dem a2-Diff ohne Fehler
(globals.css Versatz 11).
