# UM-E4-VORL · Bewegung der Vorlagen auf den Stand von `/` · Notiz des Baumeisters (29.10.2026)

Arbeitskopie `…/vorl/baum` (fortlaufend), Vergleich `…/vorl/vor` (= HEAD 93465938, unverändert). Gebaut wurde der Vergleich in
einer eigenen Kopie `…/vorl/vorbau` (Quelltext von `vor` ohne `_werkstatt` und `_relaunch`), damit `vor` unberührt bleibt.
Server: vorher 127.0.0.1:4391, nachher 127.0.0.1:4398, beide `next start`, beendet über die Prozessgruppe der eigenen PID-Datei.
Diff: `…/vorl/UM-E4-VORL.diff` (17 Dateien nach der Nacharbeit). Bilder und Messungen: `…/vorl/bild/` und `…/vorl/mess/`, Skripte
`…/vorl/skript/`; Nacharbeit unter `…/vorl/nach3/` (Abschnitt „Nacharbeit nach der Prüfung“ am Ende).
Alle Aufnahmen als PNG, gegen die lokalen Server, mit `installSperre` und `setzeEinwilligung` aus `_werkstatt/werkzeuge/lib.mjs`.

## Zuordnung Vorlage → Prüfseite (aus dem Code)

| Vorlage | Einstieg | Seiten (Hauptansichten) |
|---|---|---|
| ErzaehlSeite | `EinstiegMitte` (alle acht Inhalte mit `einstieg: 'mitte'`) | `/`, `/bad`, `/leistungen`, `/referenzen` (und `/bad/*`, `/balkon-terrasse`, `/ueber-uns`) |
| ErzaehlSeite | `EinstiegPlanblatt` (nur mit `plan` und `bildGross`) | zurzeit kein Inhalt; geprüft mit einem vorübergehenden Schaufenster unter `next dev`, danach gelöscht |
| ErzaehlSeite | `Einstieg` (einfacher Zweig) | zurzeit kein Inhalt; gleicher Baustein wie bei Wissen und Ort |
| WissensSeite | `Einstieg` | `/blog`, `/fliesen` |
| OrtsSeite | `Einstieg` mit Einzugsband | `/standorte/wetzlar` |
| ArbeitsSeite | `Einstieg kompakt` | `/kontakt` |

`/blog/<Artikel>` ist keine Vorlage (eigene Seite `blog/[slug]/page.jsx`) und bleibt unverändert.

## Geändert (17 Dateien)

1. `src/components/vorlagen/teile/Einstieg.tsx`
   - Unter sm stehen Ort und Knopfzeile ab dem ersten Bild (`max-sm:animate-none`), der Fugenriss über einem Foto entfällt
     (`max-sm:after:hidden`). Mobil kommt nur die H1 herein, wie im mittigen Einstieg (E-090 N6).
   - Neue Eigenschaft `lot`: Steht der Einstieg in der Seitenformel vor der Leitachse, trägt er ein eigenes Lot in Grundschicht an
     der Stelle der Leitachse (wie `Leitachse gezogen={false}`), Inhalt in einer positionierten Hülle darüber.
   - Der Vorspann bekommt bewusst kein `data-eingang` (siehe Entscheidung 1).
2. `src/components/vorlagen/teile/EinstiegPlanblatt.tsx`: Ort und Knopfzeile unter sm ab dem ersten Bild (`max-sm:animate-none`).
   Waage und Lot (sig-kreuzlinie) bleiben unverändert.
3. `src/components/vorlagen/WissensSeite.tsx`, `OrtsSeite.tsx`, `ErzaehlSeite.tsx` (einfacher Zweig): Der Einstieg steht vor der
   Leitachse (`<Einstieg … lot /><Leitachse>…</Leitachse>`). Damit greifen die Leitfaden-Regeln aus `bewegung.css` und
   `globals.css` ohne Änderung an diesen Dateien (Übergabe aus UM-E3-LEIT, Offene Frage 6).
4. `src/components/vorlagen/ArbeitsSeite.tsx`: `<Leitachse gezogen={false}>` (siehe Entscheidung 3); Kommentar nennt die
   Rückmeldung über den Treffertest (Nacharbeit).
5. `src/components/vorlagen/teile/Wissen.tsx`: Karten mit H3 tragen `data-kopf-pause="ganz"` (wie das Kartenraster der Leistungen;
   kein Inhalt nutzt zurzeit Karten, geprüft mit einem vorübergehenden Schaufenster, siehe Nacharbeit).
6. `src/components/blog/BlogFilter.jsx`: Wurzel trägt `data-kopf-pause="ganz"` (siehe Entscheidung 4).
7. `src/components/kern/Glasbild.tsx`: Link mit `data-cursor="ansehen" data-cursor-text=""` (siehe Entscheidung 5).
8. `src/components/kern/Leitachse.tsx`: nur Kommentar (welche Vorlagen den Leitfaden tragen).

Nacharbeit (gemeinsame Dateien nach Entscheidung des Orchestrators):

9. `src/lib/motion/cursor.ts` mit `test/cursor.test.mjs`: Treffertest für gesperrte und ladende Bedienelemente ohne
   Zeigerereignisse („Nicht verfügbar“, „Lädt“); über ihnen gibt das Schild beim Drücken nicht nach. Kommentare zum Glasbild.
10. `src/components/kern/Abschnitt.tsx`: `data-motion="leitachse"` an der Gruppe der Kantenkreuze (`.abschnitt-kreuz`).
11. `src/app/bewegung.css`: Unter Druck und erzwungenen Farben `.kreuz-rot { display: none !important }` (vorher ohne Wirkung).
12. `src/lib/motion/register.ts`, `_werkstatt/register.json` (`cursor.zustaende.ansehen.wo`) und `_werkstatt/KERN.md` (K-007,
    nur Zeile „Cursor-Charakter“): Über Fotos mit Glasfläche zeigt das Schild nur das Kreuz.

Nicht geändert: `globals.css`, `kern/stile.ts` (gesperrte und ladende Knöpfe behalten `pointer-events: none`), B-01,
Formulare, Texte, Inhalte.

## Entscheidungen mit Begründung

1. **Vorspann im einfachen Einstieg steht ab dem ersten Bild.** Gemessen (PerformanceObserver, Erstbesuch und reduziert,
   `mess/lcp-vor.json`): Auf `/blog`, `/fliesen` und `/standorte/wetzlar` ist der Vorspann das LCP-Element auf m390, t1024,
   d1440 und d1920 (q844: die H1). Mit `data-eingang` startete er mit Deckkraft 0, und Chromium zählte ihn erst nach etwa 0,6 s;
   das verletzt E-067-4. Er bleibt darum stehen; Ort und Knopfzeile setzen sich am Desktop wie bisher darüber. Dasselbe gilt
   im Planblatt (Vorspann nach der Knopfzeile). Nachher (`mess/lcp-nach.json`): dieselben LCP-Elemente, in keinem der 50 Läufe
   liegt LCP mehr als 300 ms nach FCP.
2. **Leitfaden auch auf Wissens- und Ortsseiten.** K-007 nennt „alle Erzählansichten“; `/standorte/[stadt]` ist Erzählansicht
   (K-010), Wissensansichten sind „ruhige Erzählung“ und trugen schon das wachsende Rot der v2-Leitachse. UM-E3-LEIT hatte sie
   nur wegen der DOM-Lage ausgenommen und wegen eines zweiten Rots im ersten Bildschirm. Gelöst so: Das Lot des Einstiegs bleibt
   Grundschicht, rot wird erst das Lot nach dem Einstieg. Im ersten Bildschirm steht damit kein Rot mehr neben Plan oder Karte;
   vorher stand dort ein roter Stummel unter dem Kopf (`bild/vor/eingang/d1440-standorte_wetzlar-erstbesuch-1500.png` gegen
   `bild/nach/eingang/d1440-standorte_wetzlar-erstbesuch-1500.png`). Zurück: `lot` weglassen und den Einstieg wieder in die
   Leitachse setzen.
   - Folge im Ruhezustand (gewollt, Regel des Leitfadens aus UM-E3-FIX F3): Auf diesen Seiten stehen Kantenkreuze nur noch an
     Trennlinien (Fliese, Tinte), nicht mehr zwischen zwei Kalkflächen. Siehe Pixelvergleich.
3. **ArbeitsSeite ohne gezogenes Rot.** K-007 und K-010: Arbeitsansichten bekommen keinen Signaturmoment; die Laserlinie ist ein
   Glied des Signatur-Satzes (Wo: Erzählansichten). Vorschlag aus UM-E3-LEIT (Übergabe 6), dazu `Planblatt.tsx`
   („Arbeitsansichten ohne Leitachse“). Lot und Fugenkreuze bleiben als Grundschicht, der Ruhezustand ist pixelgleich; nur das
   Wachsen des Rots beim Scrollen und der Stummel unter dem Kopf entfallen. Eingang auf `/kontakt`: nur der Logo-Aufbau im Kopf
   (kompakt, keine Zeilenmaske), wie bisher. Zurück: `gezogen={false}` entfernen.
4. **Pause neben der Artikelliste von `/blog`.** Die Abtastung fand den Kopf neben 13 Überschriften der Liste (H2 „Was bringt der
   Handwerkerbonus …“, H3 je Beitrag; `mess/leit-nach1/blog-*.json`). Nach dem Muster von `Leistungsplaene.tsx` und
   `Einsatzkarte.tsx` sitzt die Pause am Inhalt selbst. Der Kopf tritt neben der ganzen Insel zurück, also auch neben Suchfeld und
   Kategorien; in diesem Abschnitt läuft nur die rote Spitze. Ein Wrapper in `Wissen.tsx` um jede Zeichnung hätte auch `/fliesen`
   (Musterprobe ohne Überschrift, keine Befunde) den Kopf genommen und mit der Pause der Karten kollidiert (höchstens eine
   `ganz` je Abschnitt).
5. **Doppelte Beschriftung am Glasbild (Sicht Anlauf 3, Prüfer 1, gering): Das Schild zeigt nur das Fugenkreuz.** Die Glasfläche
   sagt „Ansehen →“ für Maus, Tastatur und Touch an derselben Stelle; das Schild gibt es nur bei feinem Zeiger. Die Glasfläche
   beim Zeigen zu leeren (Vorschlag des Prüfers) hätte den Namen des Links nur für Maus verändert und Glasbild-CSS an den
   Zustand des Cursor-Moduls gekoppelt, das erst nach der ersten Mausbewegung lädt. Umgesetzt über das vorhandene Muster:
   `data-cursor="ansehen"` mit leerem `data-cursor-text` (eigene Wahl vor den Orten, `.k-cursor-text:empty` blendet das Wort aus);
   der Zustand bleibt „ansehen“. Es ist der einzige Ort, an dem das Glasbild gebaut wird, darum ändert es auch `/` (nur beim
   Darüberfahren mit der Maus, kein Ruhezustand). Bilder: `bild/vor/cursor/referenzen-glasbild.png` (Schild „+ Ansehen“ über
   „Ansehen →“) gegen `bild/nach/cursor/referenzen-glasbild.png` (Schild „+“). Nacharbeit (Entscheidung 2 des Orchestrators):
   Das Schild mit dem Kreuz bleibt; Register v4 (`register.ts`, `register.json`), K-007 und die Kommentare in `cursor.ts`
   sagen es jetzt auch.

## Je Vorlage und Baustein: vorher, nachher, Bild

Abkürzungen: `bv` = `…/vorl/bild/vor`, `bn` = `…/vorl/bild/nach`.

### ErzaehlSeite (`/`, `/bad`, `/leistungen`, `/referenzen`)
- **Eingang, EinstiegMitte:** vorher wie `/` (Referenz): Desktop 1,40 s mit Schnur, Lot, Zeilen, Ort, Knöpfen, Fugenriss; mobil nur
  Schnur und Zeilen bis 0,86 s (Flucht 0,92 s). Nachher unverändert. Bilder `bv/eingang/d1440-bad-erstbesuch-0300.png`,
  `bv/eingang/m390-bad-erstbesuch-info.json`.
- **Eingang, EinstiegPlanblatt:** vorher mobil Ort und Knopfzeile 0,50–1,22 s. Nachher mobil nur Zeilen (bei vier Zeilen bis
  1,10 s) und das Lot der Kreuzlinie (eigener Moment); Desktop Eingang bis 1,22 s, Waage und Lot wie vorher bis 1,52 s.
  Bilder `bn/planblatt/m390-werkstatt-schaufenster_vorl-planblatt-erstbesuch-0300.png`, `…/d1440-…-0600.png`, Liste `…-info.json`.
- **Zeilenmaske (Wiederkehr):** Zeilen 0+320 ms und 120+320 ms mit Flucht, auf `/` und `/bad` gleich
  (`bn/wiederkehr/m390-bad-wiederkehr-0100.png`, `…-info.json`).
- **Leitfaden:** unverändert (8 Seiten der Vorlage schon im Leitfaden). Abtastung alle 8 px, 4 Geräte, `/`, `/bad`, `/leistungen`,
  `/referenzen`: 0 Befunde (zwei Kreuze < 24 px, Kopf neben H2/H3/Formular, Kopf in Fläche), `/` wie vorher.
- **Cursor:** Glasbild vorher „Ansehen“ doppelt, nachher nur das Kreuz (`bv/cursor/referenzen-glasbild.png`,
  `bn/cursor/referenzen-glasbild.png`); Formatregler „Ziehen“, Vorher-nachher „Vergleichen“, Plan mit Flucht „Ansehen“
  unverändert (`mess/cursor-vor/*.json`, `mess/cursor-nach/*.json`). Einstiegsfoto ohne Glasfläche: kein Schild (richtig).

### WissensSeite (`/blog`, `/fliesen`)
- **Eingang:** vorher mobil H1 0,14–0,74 s, Ort 0,50–1,10 s, Knopfzeile 0,62–1,22 s (gesamt 1,22 s). Nachher mobil nur die H1
  (0,74 s; Logo im Kopf 0,80 s). Desktop unverändert: H1, Ort, Knopfzeile bis 1,22 s, Vorspann (LCP) steht.
  Bilder `bv/eingang/m390-blog-erstbesuch-0300.png` gegen `bn/eingang/m390-blog-erstbesuch-0300.png`, Listen `*-info.json`.
- **Zeilenmaske (Wiederkehr):** H1 als Block 0+320 ms (`bn/wiederkehr/m390-blog-wiederkehr-0100.png`).
- **Leitfaden:** vorher kein Leitfaden (Spitze wanderte mit `contain`, roter Stummel unter dem Kopf im ersten Bildschirm, Kreuz an
  jeder Abschnittskante). Nachher wie `/`: Kopf in „Ihre Lage“, „Alles beginnt mit dem Boden“ (`/fliesen`), „Unsere Arbeiten“;
  neben der Artikelliste Pause; Kopf nie auf Fliese; Einrasten an den Kanten. Abtastung m390, t1024, d1440, d1920: 0 Befunde
  (`mess/leit-nach/blog-*.json`, `fliesen-*.json`). Bilder `bn/bewegt/d1440/blog/01.png`, `02.png`,
  `bn/bewegt/t1024/fliesen/02.png`, `bn/bewegt/m390/blog/01.png`.
- **Cursor:** Plan mit Flucht „Ansehen“ (`/fliesen` Einstieg), Glasbild nur Kreuz. Der gesperrte Knopf „Weiter zu Schritt 2“ im
  Konfigurator zeigte kein Schild; nach der Nacharbeit „Nicht verfügbar“, mit `aria-busy` „Lädt“
  (`nach3/mess/cursor/gesperrt-nach.json`, Bild `nach3/bild/cursor/nach-konfigurator-gesperrt.png`).

### OrtsSeite (`/standorte/wetzlar`)
- **Eingang:** wie Wissen; das Einzugsband im Bildplatz läuft wie vorher 0–1,20 s (eigener Moment der Ortsseite).
  Bilder `bv/eingang/m390-standorte_wetzlar-erstbesuch-0300.png` (Ort und Knöpfe fehlen noch) gegen
  `bn/eingang/m390-standorte_wetzlar-erstbesuch-0300.png` (stehen).
- **Zeilenmaske (Wiederkehr):** H1 0+320 ms, Einzugsband wie vorher (`bn/wiederkehr/d1440-standorte_wetzlar-wiederkehr-*.png`).
- **Leitfaden:** vorher keiner, nachher wie `/`: Kopf in „Ihre Lage“, „Das machen wir in Wetzlar“, „Unsere Arbeiten“, Ablauf und
  Schritt auf Fliese ohne Kopf, Kanten rasten ein. 0 Befunde auf 4 Geräten (`mess/leit-nach/standorte_wetzlar-*.json`; die
  Meldung „zwei Rot im Bild“ ist der Karte im Einstieg, vorher gleich). Bilder `bn/bewegt/d1440/standorte_wetzlar/02.png`, `03.png`,
  `bn/eingang/d1440-standorte_wetzlar-erstbesuch-1500.png` (kein roter Stummel mehr).
- **Cursor:** Glasbild nur Kreuz. „Lädt“ am Absenden der Schnellanfrage: vorher nie (der Knopf nimmt mit `aria-busy` keine
  Zeigerereignisse an), nach der Nacharbeit nach 300 ms „Lädt“, auch bei Bewegung auf dem Knopf; geprüft mit gesetztem
  `aria-busy`, nichts abgeschickt (G5; `nach3/bild/cursor/nach-schnellanfrage-laedt.png`).

### ArbeitsSeite (`/kontakt`)
- **Eingang:** kompakt, kein Eingang außer dem Logo im Kopf (K-007), vorher und nachher gleich (`bn/wiederkehr/d1440-kontakt-*`:
  0 Animationen im Einstieg).
- **Zeilenmaske:** keine (kompakt).
- **Leitfaden:** vorher wachsendes Rot (Spiegelprobe: rote Länge 5828 px über 12 Stellen), nachher Grundschicht (0 px), Kreuze
  unverändert (`mess/spiegel/kontakt-vor.json`, `kontakt-nach.json`; Bild `bn/bewegt/d1920/kontakt/01.png`).
- **Cursor:** keine Fotos; beim Laden kein gesperrter oder ladender Knopf im Bild.

## Prüfzahlen (erste Fassung, vor der Nacharbeit)

- `npm test`: 248 von 248 (`log/npm-test.log`).
- `npx eslint` über die 10 Code-Dateien: 0 Fehler, 0 Warnungen.
- `werte.mjs --arbeitsbaum --dateien …` (Werkzeug der Arbeitskopie, 10 Dateien, 385 Klassenvorkommen): 0 Befunde
  (`mess/werte/`).
- `npx tsc --noEmit -p .` mit der von `next build` erzeugten `next-env.d.ts`: 0 Fehler; `next-env.d.ts` und `tsconfig.tsbuildinfo`
  sind gelöscht.
- `next build` nachher: ok (`log/build-baum-2.log`).
- `bewegung.mjs` gegen nachher, je Prüfseite (`/`, `/bad`, `/leistungen`, `/referenzen`, `/standorte/wetzlar`, `/blog`,
  `/fliesen`, `/kontakt`; `mess/kette-nach/`):
  - register: 0 unbekannte Kennungen auf allen 8 Seiten. „Animation ohne data-motion“: die Kantenkreuze des Leitfadens
    (`svg.inline-block.shrink-0`, opacity), wie vorher auf `/` (14), jetzt auch auf den Leitfaden-Seiten; `/kontakt` 0
    (offene Frage 3).
  - reduziert: 0 Bewegungsbefunde auf 8 Seiten. ruhig (`--schalter ruhig`): 0 Bewegungsbefunde auf 8 Seiten.
- Spiegel des Leitfadens (`skript/spiegel.mjs`, d1440, 12 Stellen je Zustand, `mess/spiegel/`): reduziert, ruhig, erzwungene
  Farben und Druck auf `/blog`, `/standorte/wetzlar`, `/kontakt`: 0 Köpfe, 0 rote Kreuze, 0 px Rot. (Die roten Kreuze zählte
  der Lauf nach der Farbe `laser`; unter erzwungenen Farben sagt das nichts. Nachgemessen in der Nacharbeit.)
- Überlappung (`ueberlappung.mjs`, m360, m390, t1024, d1440): auf `/blog`, `/fliesen`, `/standorte/wetzlar`, `/kontakt` nur die
  bekannte Meldung „leitachse durch Cookies“ (E-090, Messartefakt der festen Leiste); auf `/fliesen` und `/standorte/wetzlar`
  mobil zweimal statt einmal, weil das Lot jetzt aus zwei Stücken besteht (Einstieg, Leitachse). Desktop 0.
- Pixelvergleich Ruhezustand (`pixelvergleich.mjs --hauptansichten`, m390, t768, d1440, d1920, reduziert, ganze Seiten, vorher
  4391 gegen nachher 4398, `mess/pixel/pixelvergleich.json`): 48 Paare, 36 ohne Abweichung, darunter `/` auf allen vier Geräten,
  alle Erzählseiten und `/kontakt`. 12 Paare mit Abweichung, nur `/blog`, `/fliesen`, `/standorte/wetzlar`, zusammen 1058 Pixel,
  Seitenhöhen gleich. Jede Abweichung ist ein Fugenkreuz von Kreuzgröße auf der Achse (x 4–11 bzw. 10–21 bzw. 90–101), also die
  entfallenen Kreuze zwischen zwei Kalkflächen (Entscheidung 2, offene Frage 6).
- Bildrate (`skript/mess.mjs` → `bewegung.mjs` bildrate, m390, DPR 2, CPU 4×, Geste oben → unten → oben, 3 Läufe, Median;
  vorher und nachher im Wechsel, zwei Durchgänge, vor jedem Lauf Ruhe abgewartet: kein Bau, kein anderer Browser, Last < 1,2;
  Messreihe `mess/messreihe.jsonl`, Einzelergebnisse `mess/bildrate/`):

| Uhrzeit (MEZ) | Durchgang | Stand | Seite | Median % | Läufe % | verworfen | LoAF |
|---|---|---|---|---|---|---|---|
| 15:42 | 1 | vorher | `/` | 0,07 | 1,01 / 0,07 / 0,07 | 15 / 1 / 1 | 4 / 0 / 0 |
| 15:44 | 1 | nachher | `/` | 0 | 1,56 / 0 / 0 | 23 / 0 / 0 | 6 / 0 / 0 |
| 15:47 | 1 | vorher | `/blog` | 0,13 | 0,26 / 0,13 / 0 | 4 / 2 / 0 | 4 / 1 / 0 |
| 15:49 | 1 | nachher | `/blog` | 0,87 | 0,87 / 2,51 / 0,06 | 14 / 40 / 1 | 5 / 4 / 0 |
| 15:52 | 1 | vorher | `/standorte/wetzlar` | 0,33 | 0,74 / 0,33 / 0,16 | 8 / 4 / 2 | 3 / 2 / 0 |
| 15:55 | 1 | nachher | `/standorte/wetzlar` | 0,33 | 0,28 / 0,33 / 0,33 | 3 / 4 / 4 | 1 / 5 / 1 |
| 15:57 | 2 | nachher | `/` | 0,20 | 0,20 / 0,34 / 0,07 | 3 / 5 / 1 | 1 / 1 / 1 |
| 15:59 | 2 | vorher | `/` | 0,41 | 1,16 / 0,41 / 0,07 | 17 / 6 / 1 | 4 / 2 / 1 |
| 16:02 | 2 | nachher | `/blog` | 0 | 1,07 / 0 / 0 | 17 / 0 / 0 | 4 / 0 / 0 |
| 16:05 | 2 | vorher | `/blog` | 0,31 | 0,31 / 0,06 / 0,38 | 5 / 1 / 6 | 5 / 1 / 1 |
| 16:08 | 2 | nachher | `/standorte/wetzlar` | 0,25 | 0,27 / 0,25 / 0 | 3 / 3 / 0 | 0 / 2 / 0 |
| 16:10 | 2 | vorher | `/standorte/wetzlar` | 0,16 | 0,55 / 0,16 / 0,08 | 6 / 2 / 1 | 1 / 2 / 0 |

  Alle Mediane ≤ 1 %. `/` nachher 0 und 0,20 % gegen vorher 0,07 und 0,41 %. `/blog` (neu im Leitfaden: Marke, Bahnen und die Kreuz-Animationen
  der Kanten laufen jetzt auch dort) nachher 0,87 und 0 % gegen 0,13 und 0,31 %; der eine Lauf mit 2,51 % hat 4 LoAF (780 ms) wie andere
  erste und zweite Läufe beider Stände, im zweiten Durchgang 0 %. `/standorte/wetzlar` 0,33 und 0,25 % gegen 0,33 und 0,16 %.

## Nacharbeit nach der Prüfung (29.10.2026, Entscheidungen des Orchestrators)

Arbeitsstand: `…/vorl/nach3/` (Skripte, Messungen, Bilder, Protokolle). Ein erster Anlauf (`…/vorl/nach2/`) hatte für die
Cursor-Zustände `pointer-events` an gesperrten Knöpfen gelockert (`kern/stile.ts`, `druck` in `bewegung.css`, Spiegeltest).
Das ist nach Entscheidung 1 des Orchestrators zurückgenommen: `kern/stile.ts`, die Regel `druck` und
`test/bewegungsschalter.test.mjs` stehen wieder wie HEAD. Geblieben aus diesem Anlauf sind die Prüfung der Karten mit einem
vorübergehenden Schaufenster und der erste Spiegellauf.

| Befund (Schwere) | Ergebnis | Änderung | Beleg |
|---|---|---|---|
| Cursor „nicht verfügbar“ und „lädt“ erscheinen nie (mittel) | bestätigt, behoben | `cursor.ts`: Treffertest (siehe unten), Knöpfe und Formulare unverändert | `nach3/mess/cursor/gesperrt-vor.json` und `-nach.json`, Bilder `nach3/bild/cursor/nach-*.png` |
| Kommentar in `ArbeitsSeite.tsx` behauptet die Rückmeldung (gering) | bestätigt, behoben | Kommentar auf den Stand gekürzt (Treffertest in `cursor.ts`) | Diff |
| Glasbild-Schild ohne Wort, Register und KERN sagen „Ansehen“ (gering, zweimal gemeldet) | bestätigt; Entscheidung 2 des Orchestrators: das Schild mit Kreuz bleibt | `REGISTER_V4.cursor.zustaende.ansehen.wo`, `register.json`, K-007 (nur Zeile „Cursor-Charakter“), Kommentare in `cursor.ts` | `nach3/mess/cursor-nach/*.json`: 39 Glasbild-Links `an/ansehen/""` auf 6 Seiten |
| Kantenkreuze ohne `data-motion` (gering) | bestätigt, behoben | `kern/Abschnitt.tsx`: `data-motion="leitachse"` an der Kreuzgruppe `.abschnitt-kreuz` | Register-Lauf: „ohne data-motion“ 0 auf allen 8 Prüfseiten (vorher 1 auf den 7 Leitfaden-Seiten) |
| `.kreuz-rot` unter erzwungenen Farben nicht ausgeblendet (gering) | bestätigt, behoben, auch auf `/` | `bewegung.css`: `.kreuz-rot { display: none !important }` im Block für Druck und erzwungene Farben | Spiegel: erzwungene Farben und Druck: 0 Kreuz-Animationen, 0 gerenderte rote Kreuze auf `/`, `/blog`, `/fliesen`, `/standorte/wetzlar`, `/kontakt` (HEAD auf `/` unter erzwungenen Farben 7 und 7) |
| Vorspann im Einstieg steht ab dem ersten Bild (gering) | bestätigt ohne Codeänderung (Entscheidung 5: E-067-4 geht vor) | keine | `mess/lcp-nach.json` |
| `data-kopf-pause="ganz"` an Karten ungeprüft (gering) | geprüft mit einem vorübergehenden Schaufenster, Änderung bleibt | Kommentar in `Wissen.tsx` nennt die Regel | `nach2/mess/leit-karten/*.json` gegen `nach2/mess/leit-karten-ohne/*.json` |

### Treffertest für „nicht verfügbar“ und „lädt“ (`src/lib/motion/cursor.ts`)

- Gesperrte und ladende Knöpfe nehmen weiter keine Zeigerereignisse an (`disabled:`, `aria-disabled:` und
  `aria-busy:pointer-events-none` in `kern/stile.ts`, `Karussell.tsx`, `LeadQuickForm.tsx`; G8). Der Zeiger trifft ihren
  Behälter. Das Modul sammelt jetzt beim Wechsel des getroffenen Elements dessen gesperrte und ladende Bedienelemente
  (`CURSOR_SPERRE`, dieselben Selektoren wie „lädt“ und „nicht verfügbar“ im Register) und nimmt bei jedem Zeigerereignis das
  erste, in dessen Rahmen die Zeigerlage liegt (`getroffen`). Danach gilt die bisherige Zuordnung (`zielZustand`), samt
  Ladeschwelle.
- Layout liest das Modul nur dort: beim Zeigerereignis und nur, wenn der Behälter ein solches Element enthält; pro Bild nie.
  Der Wächter in `test/cursor.test.mjs` (Cursor 9) erlaubt `getBoundingClientRect` nur in `getroffen` und verbietet
  Layout-Lesen sonst weiter (Gegenprobe: ein Lesen in `zeichne` lässt Cursor 9 scheitern).
- Ein eigener `MutationObserver` beobachtet nur den aktuellen Behälter (disabled, aria-disabled, aria-busy, Kinder): Wird unter
  dem stehenden Zeiger ein Knopf gesperrt, ladend oder frei, ordnet das Modul sofort neu zu.
- Über einem gesperrten oder ladenden Element gibt das Schild beim Drücken nicht nach (der Knopf selbst wird ohne
  Zeigerereignisse nie `:active`).
- Messung (d1440, feiner Zeiger, `nach3/skript/gesperrt3.mjs`), vorher → nachher:
  - `/fliesen` Konfigurator „Weiter zu Schritt 2“ (disabled): kein Schild → „Nicht verfügbar“ (×), auch nach Bewegung auf dem
    Knopf; beim Drücken nicht gedrückt; in der Lücke daneben kein Schild.
  - derselbe Knopf mit `aria-busy` (wie `kern/Knopf` beim Laden): kein Schild → nach 150 ms noch nichts, nach 450 ms „Lädt“.
  - `/standorte/wetzlar` Schnellanfrage „Termin vor Ort anfragen“ mit `aria-busy` (nur das Attribut gesetzt, nichts
    abgeschickt, G5): kein Schild → „Lädt“ nach der Schwelle, bleibt bei Bewegung auf dem Knopf.
  - Der Knopf selbst ist vorher und nachher gleich: `pointer-events: none`, Deckkraft 0,5, Lage beim Drücken unverändert.
- Auf allen acht Prüfseiten sonst unverändert (`nach3/mess/cursor-vor/`, `cursor-nach/`): Formatregler „Ziehen“,
  Vorher-nachher „Vergleichen“, Pläne „Ansehen“, Fotos ohne Weg ohne Schild; neu nur `/fliesen` 1 × „Nicht verfügbar“.

### Prüfzahlen nach der Nacharbeit (Bau `log/build-baum-5.log`, Server 4398 gegen HEAD-Bau 4391)

- `npm test`: 249 von 249 (neu Cursor 7b, Treffertest; `nach3/log/npm-test.log`).
- `npx eslint` über die 14 geänderten Code-Dateien (13 unter `src/`, `test/cursor.test.mjs`): 0 Fehler, 0 Warnungen.
- `werte.mjs --arbeitsbaum --dateien …` (15 Dateien samt `bewegung.css`, 487 Klassenvorkommen): 0 Befunde (`nach3/mess/werte/`).
- `npx tsc --noEmit -p .` mit vorübergehender `next-env.d.ts`: 0 Fehler; `next-env.d.ts` und `tsconfig.tsbuildinfo` danach gelöscht.
- `next build`: ok.
- `bewegung.mjs` je Prüfseite (`/`, `/bad`, `/leistungen`, `/referenzen`, `/blog`, `/fliesen`, `/standorte/wetzlar`, `/kontakt`;
  `mess/kette-nach3/`, Vergleich mit dem ersten Lauf `mess/kette-nach/`, Zahlen `nach3/skript/kette-zahlen.mjs`):
  - register: 0 unbekannte Kennungen, 0 Animationen ohne `data-motion` auf allen 8 Seiten (erster Lauf: je 1 auf den 7
    Leitfaden-Seiten, die Kantenkreuze).
  - reduziert und ruhig: 0 Bewegungsbefunde auf allen 8 Seiten. Unter „unsichtbar“ neu je 2 (`/referenzen` 3) Kreuzgruppen mit
    `display: none` auf den Leitfaden-Seiten außer `/` (offene Frage 1 nach der Nacharbeit); `/` und `/kontakt` unverändert.
- Spiegel des Leitfadens (`nach3/skript/spiegel3.mjs`, d1440, 12 Stellen, Animationen mit Namen, `nach3/mess/spiegel/`) auf `/`,
  `/blog`, `/fliesen`, `/standorte/wetzlar`, `/kontakt`: reduziert, ruhig, erzwungene Farben und Druck je 0 Köpfe, 0 rote Kreuze,
  0 px Rot, 0 Kreuz-Animationen; unter erzwungenen Farben und Druck 0 gerenderte `.kreuz-rot`. Einzige Animation unter
  erzwungenen Farben: `einzugsband-kante-ziehen` auf `/standorte/wetzlar` (Einzugsband im Einstieg, nicht Leitfaden, wie HEAD).
- Cursor-Lauf (`skript/cursor.mjs`, d1440, 8 Seiten, `nach3/mess/cursor-vor/`, `cursor-nach/`): siehe oben; dazu
  `nach3/skript/gesperrt3.mjs` mit drei Fällen.
- Pixelvergleich Ruhezustand (`pixelvergleich.mjs`, reduziert, ganze Seiten, m390, t768, d1440, d1920; `/`, `/bad`,
  `/referenzen`, `/blog`, `/fliesen`, `/standorte/wetzlar`, `/kontakt`; `nach3/mess/pixel/pixelvergleich.json`): 28 Paare,
  16 ohne Abweichung, darunter `/` auf allen vier Geräten. 12 Paare mit zusammen 1058 Pixeln, nur `/blog`, `/fliesen`,
  `/standorte/wetzlar`, genau wie im ersten Lauf (entfallene Kreuze zwischen zwei Kalkflächen, bestätigt).
- Nicht neu erhoben, weil die Nacharbeit Layout und Eingang nicht berührt (Pixelvergleich gleich): LCP, Überlappung,
  Leitfaden-Abtastung; es gelten die Zahlen der ersten Fassung.
- Bildrate (`nach3/skript/mess3.mjs` → `bewegung.mjs` bildrate, m390, DPR 2, CPU 4×, grober Zeiger: das Cursor-Modul lädt
  dort nicht; 3 Läufe, Median; ein Durchgang, nachher und vorher im Wechsel, vor jedem Lauf Ruhe abgewartet;
  `nach3/mess/messreihe.jsonl`, Einzelergebnisse `nach3/mess/bildrate/`):

| Uhrzeit (MEZ) | Durchgang | Stand | Seite | Median % | Läufe % | verworfen | LoAF | Last |
|---|---|---|---|---|---|---|---|---|
| 19:30 | 3 | nachher | `/` | 0,54 | 0,54 / 0,48 / 0,54 | 8 / 7 / 8 | 4 / 1 / 3 | 0,02–1,87 |
| 19:33 | 3 | vorher | `/` | 0,41 | 0,41 / 1,23 / 0,27 | 6 / 18 / 4 | 3 / 3 / 0 | 0,74–1,39 |
| 19:36 | 3 | nachher | `/blog` | 0,06 | 0 / 0,06 / 0,75 | 0 / 1 / 12 | 3 / 0 / 6 | 0,62–1,3 |
| 19:38 | 3 | vorher | `/blog` | 0 | 0 / 0 / 0 | 0 / 0 / 0 | 2 / 0 / 0 | 0,52–1,04 |
| 19:41 | 3 | nachher | `/standorte/wetzlar` | 0 | 0,18 / 0 / 0 | 2 / 0 / 0 | 0 / 0 / 0 | 0,41–0,9 |
| 19:43 | 3 | vorher | `/standorte/wetzlar` | 0,18 | 0,18 / 0 / 0,25 | 2 / 0 / 3 | 0 / 1 / 0 | 0,42–1,22 |

  Alle Mediane ≤ 1 %. `/` nachher 0,54 % gegen vorher 0,41 %, `/blog` 0,06 % gegen 0 %, `/standorte/wetzlar` 0 % gegen 0,18 %.
  Die Nacharbeit ändert unter grobem Zeiger nur ein Attribut an der Kreuzgruppe; die Unterschiede liegen in der Streuung der
  Läufe (vorher `/` 0,27 bis 1,23 %).

## Offene Fragen (erste Fassung) und ihr Stand nach der Nacharbeit

1. **„Nicht verfügbar“ und „Lädt“ an gesperrten und ladenden Knöpfen.** Erledigt durch den Treffertest in `cursor.ts`
   (Entscheidung 1 des Orchestrators); `kern/stile.ts` und die Formulare bleiben unverändert (G8).
2. **Register und KERN zum Glasbild.** Erledigt (Entscheidung 2): `register.ts`, `register.json`, K-007 (Zeile
   „Cursor-Charakter“) und die Kommentare in `cursor.ts` nachgezogen.
3. **Kantenkreuze ohne `data-motion`.** Erledigt (Entscheidung 3): `data-motion="leitachse"` in `kern/Abschnitt.tsx`; der
   Register-Lauf meldet auf allen 8 Prüfseiten 0 Animationen ohne `data-motion`.
4. **Wissensansichten im KERN** (Leitfaden auch auf Wissens- und Ortsseiten): vom Orchestrator bestätigt (Entscheidung 5),
   ohne Codeänderung.
5. **Planblatt mobil 1,10 s:** vom Orchestrator bestätigt, ohne Codeänderung.
6. **Kantenkreuze zwischen zwei Kalkflächen entfallen** auf Wissens- und Ortsseiten: vom Orchestrator bestätigt, ohne
   Codeänderung. Dazu bestätigt: `ArbeitsSeite` mit `gezogen={false}` und der Vorspann als LCP ab dem ersten Bild (E-067-4 geht vor).

## Offene Fragen nach der Nacharbeit

1. **Sichtbarkeitsprüfung in `bewegung.mjs reduziert`:** Mit `data-motion="leitachse"` an der Kreuzgruppe zählt das Werkzeug
   die im Leitfaden ausgeblendeten Kreuze (Kante zwischen zwei Kalkflächen, `display: none` nach UM-E3-FIX F3) unter
   „unsichtbar“: 2 bis 3 Einträge je Leitfaden-Seite außer `/` (dort sind alle 7 Kreuzgruppen sichtbar), Grund „display none“.
   Bewegungsbefunde bleiben 0. Das ist Absicht, kein Rest einer Animation; wenn die Liste leer bleiben soll, müsste das Werkzeug
   Elemente ohne Rahmen in einer Gruppe mit `display: none` als „verdeckt durch Zustand“ führen (Werkzeug, nicht dieses Paket).
2. **Treffertest liest Layout beim Zeigerereignis.** `getBoundingClientRect` je gesperrtem oder ladendem Element im Behälter,
   nur dann und nie pro Bild; der Wächter Cursor 9 ist entsprechend enger gefasst. Falls der Kern „kein Layout-Lesen“ im Modul
   wörtlich meint, wäre die Alternative eine Erkennung am Behälter ohne Rahmen (ungenau: „Nicht verfügbar“ auch in der Lücke
   neben dem Knopf).
3. **Gesperrte Karussell-Pfeile und `aria-disabled` am Bewegungsschalter** zeigen jetzt beim Darüberfahren mit der Maus ebenfalls
   „Nicht verfügbar“, wenn sie gesperrt sind (gleiche Regel aus dem Register, E-084). Der Cursor-Lauf über die acht Prüfseiten
   (`nach3/mess/cursor-nach/`, Bewegung an) fand außer dem Konfigurator-Knopf auf `/fliesen` kein gesperrtes oder ladendes
   Bedienelement; wo eines auftaucht, ändert sich nur die Anzeige beim Darüberfahren mit der Maus, kein Ruhezustand.
