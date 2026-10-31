# UM-E4-SICHT-FIX-a · Bauteil SF-A, Welle 1 · Notiz des Baumeisters

Stand 31.10.2026. Arbeitskopie `$SCRATCH/sfix/a/baum` (Abzug HEAD 57e05acf, Code wie 4d2d3fef), Vergleich `…/vor` (unverändert).
Diff: `$SCRATCH/sfix/a/UM-E4-SICHT-FIX-a.diff` (18 Dateien, `diff -ruN vor baum`, ohne node_modules, .next, bilder, next-env.d.ts, tsconfig.tsbuildinfo). `patch -p1 --dry-run` ist sauber gegen `vor` und gegen den Repo-Stand 77c4b79c.
Kern-Version 4.4.1; K-003 in der Kopie nachgezogen (siehe unten).

## 1 Maßnahmen mit Stand

| Maßnahme | Stand | Dateien |
|---|---|---|
| M-A3 Nr. 1 Schnurebene | fertig. Neue Serverkomponente `Schnurebene` (Zierebene mit Schnur und gezogenem Lot) mit `Lotstueck` und `Aufhaengung` (Fuge mit Fugenkreuz). EinstiegMitte nutzt sie; / bleibt pixelgleich (AE 0). Einstieg nutzt sie mit der neuen Angabe `schnur` (mit `lot`, nicht kompakt). | `teile/Schnurebene.tsx` (neu), `teile/EinstiegMitte.tsx`, `teile/Einstieg.tsx` |
| M-A1 Nr. 1 Figur für alle `mitte` | fertig. ErzaehlSeite setzt `schnurFigur={worum.schnurFigur ?? true}` (die Angabe bleibt Abschalter). Auf sechs Unterseiten gilt: H1-Grundlinie auf der Schnur, Lotstück bis zum Foto, Fuge mit Kreuz ab sm, Foto direkt nach den Knöpfen; erster Schritt und Bewertung kommen unter dem Foto. Flach wie auf /. | `ErzaehlSeite.tsx` (nur Aufruf), `inhalt.ts` (WorumInhalt) |
| M-A1 Nr. 2 H1 fs-7 | fertig. Außer auf / steht die H1 auf allen Breiten in fs-7. Ab md bemisst die längste Zeile die H1: `titel-zeile` mit `--titel-em` aus der Tabelle `ZEILEN_EM` in TSX. Abnahmeregel erfüllt, Zahlen in Abschnitt 6. | `EinstiegMitte.tsx`, `globals.css` Block „titel-zeile“ |
| M-A1 Nr. 3 Schnurzeichen | fertig für `/bad` (`bad` ab xl) und `/balkon-terrasse` (`aussen` ab lg). `/bad/badsanierung` folgt mit M-C9 (Teil C). Das Zeichen setzt sich mit `data-eingang="knoepfe"`, kein neuer Registereintrag. | `inhalt.ts`, `bad.ts`, `balkon-terrasse.ts`, `globals.css` „schnur-zeichen“ |
| M-A1 Nr. 4 Hochformat | fertig. Ab lg gilt `einstieg-foto-hoch`: höchstens 80svh hoch, höchstens zwei Drittel der Spalte. Dazu kommt `EINSTIEG_HOCH_SIZES` neben `EINSTIEG_MITTE_SIZES`. d1440 576 × 720 px, d1920 691 px. | `EinstiegMitte.tsx`, `globals.css` |
| M-A1 Nr. 5 Zeilenmaske | **unverändert**: Lighthouse misst nur der Orchestrator (E-076). Siehe EV-7 und Frage 1. | – |
| M-A2 Einstiegsfotos | fertig auf 5 von 5 Seiten, Verteilungstabelle in Abschnitt 4. Der Test „Galerie 2“ hängt jetzt an `REFERENZEN.worum.bild`. | `inhalte/{bad,bad-badsanierung,barrierefreies-bad,leistungen,referenzen}.ts`, `galerie-filter/daten.ts`, `test/galerie-filter.test.mjs` |
| M-A3 Nr. 2 bis 7 (/fliesen, /blog) | fertig. Die H1 steht ab dem ersten Bild, ohne Maske. Im Eingang ziehen nur Schnur und Lotstück (dauer-1, 140 ms). Reihenfolge: H1, Ort, Knöpfe, Bewertungszeile, Bild oder Plan, Vorspann. Der Vorspann steht ab 90 Zeichen linksbündig, unter 20rem Spalte immer. Der Plan auf /fliesen steht `ohneAchse`. | `Einstieg.tsx`, `WissensSeite.tsx` (nur Aufruf), `bewegung.css` Block „Einfacher Einstieg an der Schnur“, `test/intro.test.mjs` „Eingang 7“ |
| M-A3 Nr. 5 `titelZeilen` | fertig, gilt auch kompakt. Werte für /kontakt setzt Teil C (M-C5); ArbeitsSeite ist unverändert. | `Einstieg.tsx` |
| M-A3 Nr. 6 flach | fertig für alle Nutzer von `vorlagen/teile/Einstieg`, also /fliesen, /blog, /kontakt und die 13 Ortsseiten: Brotkrumen aus, pt-16, Abstände 12 und 16 statt 24 und 32, H1 eine Stufe kleiner. | `Einstieg.tsx` |
| Ortsseiten | **nicht eingeschaltet**. OrtsSeite übergibt kein `schnur`. Für SF-C1 reicht `schnur` (und `bewertung`) im Aufruf, nachdem das Einzugsband den Einstieg verlassen hat (M-C6). /standorte/wetzlar ist bei d1440 und m390 pixelgleich (AE 0), bei q844 ändert es sich gewollt durch flach. | – |
| KERN K-003 | Die Ruhe-Regel „Einstieg“ ist in der Kopie nachgezogen: H1 ab md in fs-7, unter sm nach E-104 Nr. 2, Grundlinie auf der Schnur, Bewertungszeile unter dem Foto. Die Versionsnummer setzt der Orchestrator. | `_werkstatt/KERN.md` |

**Vorschlag für den ENTSCHEIDUNGEN-Eintrag (M-A3 Nr. 2):** „H1 der Wissens- und Ortsseiten steht ab dem ersten Bild (LCP-Kandidat, E-067-4). Im einfachen Einstieg entfällt die Zeilenmaske für alle Nutzer. An der Schnur stehen auch Ort, Knöpfe, Bewertung und Bild ab dem ersten Bild; es ziehen nur Schnur und Lotstück in dauer-1. test/intro.test.mjs ‚Eingang 7‘ prüft die positive Fassung: Einstieg ohne `zeilenmaske`, Vorspann ohne `data-eingang`, Behälter `data-motion="eingang" data-einstieg="schnur"`, Schnurebene mit `data-eingang="schnur"` und `"lot"`.“

## 2 Entscheidungsvermerke (Abweichungen vom Plan)

**EV-1 · Unter md keine Grenze von 16,5cqi** (Plan Nr. 2: „nur die Grenze 16,5cqi wie heute“)
- Ziel: Die Abnahmeregel „bei 200 % H1 ≥ H2“ einhalten. Mit 16,5cqi wäre die H1 bei m360 und 200 % 48,8 px groß, die H2 64 px; bei m390 53,8 gegen 64 px.
- Alternativen:
  - 16,5cqi wie geplant: bricht die Regel.
  - Grenze nach dem längsten Wort (98cqi durch Wortmaß): „barrierefreies“ ergäbe 57,6 px, also weiter unter der H2.
- Wirkung: Bei 100 % keine, denn 16,5cqi griff dort nie (m360: 54 px Grenze gegen 38 px Schrift). Bei 200 % steht die H1 wie heute bei fs-6 in 2rem = H2. Lange Wörter trennt die Seitenregel wie bisher. Kein Überlauf, scrollWidth ist auf allen Messgeräten gleich der Breite.
- Risiko: Bei 200 % stehen getrennte H1-Wörter wie bisher („barriere-freies“).
- Rückweg: unter md `.titel-zeile > * { font-size: min(1em, 16.5cqi) }` ergänzen.

**EV-2 · Untergrenze 1,15 × fs-6 im Maß ab md** (`max()` in der Formel)
- Ziel: Das Zeilenmaß drückt die H1 nie unter die Abnahmeregel. Reicht die Spalte nicht, bricht die Zeile um, statt kleiner zu werden.
- Alternativen: reines Maß 98cqi/em; das ergäbe bei t768 mit 200 % für /bad 47 px gegen 65 px H2.
- Wirkung: Bei 100 % greift die Untergrenze nie; das kleinste Verhältnis ab md ist 1,24 (d1920 /bad). Nur bei großer Systemschrift bricht die Zeile um.
- Risiko: keines bekannt.
- Rückweg: `max(...)` streichen.

**EV-3 · em-Breiten mit Wortabstand gemessen**
- Ziel: echte Breiten. `font-anzeige` setzt 0,06em Wortabstand; die Plantabelle rechnet ohne ihn (/bad 12,95 statt 13,30).
- Alternativen: die Planwerte; dann bräche /bad bei d1920 um.
- Wirkung: Die Tabelle steht in Abschnitt 5.
- Risiko: Ändert sich der Wortlaut einer Zeile, muss sie neu gemessen werden. Fehlt eine Zeile in der Tabelle, gilt das größte Maß 13,3, also eine sichere, eher kleinere H1.
- Rückweg: Werte in `ZEILEN_EM` ändern.

**EV-4 · Maße des Schnurzeichens**
- Ziel: Der Plan nennt keine Größe. Gewählt: eine Zeilenhöhe der H1 (1,1em), 0,5em Luft, eingerechnet mit 2 × (Breite + Luft), weil die H1 mittig steht.
- Zusätzlich entfällt das Zeichen bei einer Spalte unter 56rem (Container-Abfrage). Sonst stünde es bei großer Systemschrift, die die Werkzeuge über `html { font-size }` nachbilden und bei der die Medienabfragen nicht mitwachsen, an der H1.
- Wirkung: Luft zur H1 63 bis 116 px (t1024 bis d1920). Die Unterkante steht auf der Schnur (0 px). ueberlappung.mjs meldet am Zeichen nichts.
- Risiko: Auf t1024 und d1280 wirkt das Zeichen am rechten Rand klein; das ist ein Geschmacksurteil für die Prüfer.
- Rückweg: Konstanten `ZEICHEN_HOEHE` und `ZEICHEN_LUFT`, Wert 56rem in globals.css.

**EV-5 · Einstieg an der Schnur: Bewertung und Aufhängung**
- Ziel: Der Plan nennt nur die Reihenfolge. Die Bewertungszeile steht 16 px unter den Knöpfen. Das Lotstück reicht bis zum nächsten Block. Fuge und Kreuz stehen nur über einem Foto, nicht über dem Plan, denn der Plan trägt eigenen Rahmen und eigene Bemaßung.
- Wirkung: /fliesen zeigt den Plan ohne zweite Querlinie.
- Rückweg: in `Einstieg.tsx` `foto &&` vor `<Aufhaengung>` streichen.

**EV-6 · H1-Block über der Schnurebene** (`relative z-10` im Einstieg an der Schnur, wie `figur && 'z-10'` in EinstiegMitte)
- Ziel: Die Unterlängen ragen über die Schnur. Ohne Stapelreihenfolge deckte der positionierte Ortsblock sie zu. erstesbild meldete das bei q844 auf /fliesen und /blog als „ueberschrift verdeckt-durch“.
- Wirkung: behoben, im Endlauf beide 5 von 5.
- Rückweg: Klasse streichen.

**EV-7 · M-A1 Nr. 5 Zeilenmaske unverändert**
- Ziel: Lighthouse m360 und m390 je Seite misst nach E-076 nur der Orchestrator.
- Erwartung aus der Geometrie: In der Figur ist mobil das Foto das größte sichtbare Element.
  - m360: Foto rund 328 × 270 px sichtbar, H1 rund 328 × 125.
  - m390: Foto 358 × 370, H1 358 × 125 bis 175.
  - Das LCP-Foto startet nie unsichtbar (E-067-4).
- Rückweg bei LCP-H1, LCP über 2,5 s oder Leistung unter 90: in `EinstiegMitte.tsx` die Zeilenklasse um `max-sm:animate-none` ergänzen. Das gilt dann für alle sieben samt /; der Test „Eingang 7“ erlaubt es.

**EV-8 · /referenzen: `referenzen-einstieg` wandert in die Galerie, statt zu entfallen**
- Ziel: Tausch statt Entfernung. Die Galerie hat weiter 24 Fotos (Raster ohne Loch, M-C3 „Alle 24“, G4). Das Foto steht an Platz 15 am Ende der fertigen Räume, Gruppe Bad.
- Alternativen: ganz entfallen lassen (der Plan erlaubt es, Schärfe 0,068 unter 0,08); dann blieben 23 Fotos.
- Risiko: ein blasses Foto in der Galerie, nicht vorn.
- Rückweg: die Zeile in `daten.ts` streichen.

**EV-9 · Mikrotexte für getauschte Fotos** (Namen auf der Glasfläche, Wörter aus dem Alt-Text, höchstens sechs)
- /bad Reihe: „Helles Bad mit Glasdusche“.
- /bad/badsanierung Reihe: „Badewanne mit Ornamentfliesen und Nische“.
- Galerie: „Bad in Marmoroptik mit Regendusche“.
- Der Test „Galerie 4“ (Länge, kein Fachwort) ist grün.

**EV-10 · flach gilt für alle Nutzer des einfachen Einstiegs**, auch die 13 Ortsseiten und kompakt
- Ziel: M-A3 Nr. 6 „auch kompakt“.
- Wirkung: Ortsseiten ändern sich nur bei q844.
- Die H1-Zeilenmaske entfällt im einfachen Einstieg für alle, auch auf den Ortsseiten. Das ist reine Bewegung, der Endzustand ist pixelgleich. So verlangt es die positive Fassung von „Eingang 7“.
- Rückweg: `flach:`-Klassen an `kompakt`/`schnur` binden.

**EV-11 · Kennzeichen `data-einstieg="schnur"` am Abschnitt**
- Ziel: Der Plan verlangt „Schnur 0 bis 150 ms“. Die Variable `--eingang-schnur: var(--dauer-1)` (140 ms) gilt nur dort, mit eigenem Block in bewegung.css und ohne neue Kennung.
- Rückweg: Block streichen; dann gilt dauer-2.

## 3 Gewollte Pixeländerungen je Ansicht

| Ansicht | Änderung |
|---|---|
| `/` | **keine**: d1440, m390 und q844, ruhig und bewegt, AE 0 gegen 4324. |
| `/bad` | Einstieg auf allen Breiten: Figur, H1 fs-7, Schnurzeichen ab xl. Einstiegsfoto `bad-beleg-1`. Reihe „Bäder, die wir gebaut haben.“ neu: bad-beleg-2, bad-einstieg, bad-beleg-3. Alles darunter verschiebt sich. |
| `/bad/badsanierung` | Einstieg: Figur, fs-7, Foto `badsanierung-beleg-2`. In der Reihe steht an Platz 2 `badsanierung-einstieg`. Verschiebung darunter. |
| `/bad/barrierefreies-bad` | Einstieg: Figur, fs-7, Foto `bereich-dusche-streifen-sitzbank`. Verschiebung darunter. |
| `/leistungen` | Einstieg: Figur, fs-7, Foto `bad-einstieg`. Verschiebung darunter. |
| `/balkon-terrasse` | Einstieg: Figur, fs-7, Schnurzeichen `aussen` ab lg, Hochformat ab lg. Verschiebung darunter. |
| `/referenzen` | Einstieg: Figur, fs-7, Foto `start-dusche`. Galerie: Das erste Foto ist jetzt `start-beleg-bad`, `referenzen-einstieg` steht an Platz 15. Verschiebung darunter. |
| `/ueber-uns` | Einstieg: Figur, fs-7, Hochformat ab lg; das Foto bleibt. Verschiebung darunter. |
| `/fliesen` | Einstieg auf allen Breiten: Schnur und Lotstück, Bewertungszeile, Plan vor dem Vorspann ohne rote Achse, Vorspann linksbündig. Verschiebung darunter. |
| `/blog` | Einstieg: Schnur, Lotstück, Bewertungszeile, Vorspann linksbündig. Verschiebung darunter. |
| `/kontakt` | nur q844 (flach): einzeilige H1, ohne Brotkrumen, Knöpfe im ersten Bild. d1440 und m390 AE 0. |
| 13 Ortsseiten | nur q844 (flach). Wetzlar d1440 und m390 AE 0. |
| Bewegung | Wissensseiten: Eingang nur Schnur (140 ms) und Lotstück. Ortsseiten: H1 ohne Zeilenmaske. Ruhig und bewegt sind im Endzustand gleich bis auf Kantenglättung (AE 0 mit fuzz 25 %). Ausnahme ist der Plan auf /fliesen mit seiner bestehenden `sig-plan`-Flucht; die gab es vorher auch. |

## 4 Verteilungstabelle Einstiegsfotos (M-A2)

Die Originalnummern stammen aus `_werkstatt/bilder/auftrag-e2.json` und `auftrag-e4.json`.

| Kennung | Original (gleiche Originale) | Ansichten vorher | Ansichten nachher | Rolle |
|---|---|---|---|---|
| bad-beleg-1 | IMG_2573 | /bad Reihe 1., /leistungen Reihe 1., Galerie 12. | **Einstieg /bad**, /leistungen Reihe 1. (verlässt sie mit M-C2 Nr. 5), Galerie 11. | Einstieg |
| bad-einstieg | IMG_2550 | Einstieg /bad | **Einstieg /leistungen**, /bad Reihe 2. | Einstieg |
| badsanierung-beleg-2 | IMG_2605 | /bad/badsanierung Reihe 2. | **Einstieg /bad/badsanierung** | Einstieg |
| badsanierung-einstieg | IMG_2606 | Einstieg /bad/badsanierung, Galerie 9. | /bad/badsanierung Reihe 2., Galerie 8. | Reihe |
| bereich-dusche-streifen-sitzbank | IMG_2608 (= start-lage-dusche, auf / in der Lage nur als Vignette, Foto ruht) | Galerie 17. (So arbeiten wir) | **Einstieg /bad/barrierefreies-bad**, Galerie 17. | Einstieg |
| barrierefrei-einstieg | IMG_2566 | Einstieg /bad/barrierefreies-bad | entfällt (ersetzt; Schärfe 0,023 unter 0,08) | – |
| leistungen-einstieg | IMG_2548 | Einstieg /leistungen | entfällt (ersetzt; 0,064 und 0,34 unter den Untergrenzen) | – |
| start-dusche | IMG_2578 (= start-dusche-boden, unbenutzt) | Galerie 1., Einzelfoto /fliesen | **Einstieg /referenzen**, Einzelfoto /fliesen (bis M-C7) | Einstieg |
| referenzen-einstieg | IMG_2562 | Einstieg /referenzen | Galerie 15. (Bad) | Galerie |

Kriterien:
- Bodenlage: im Bild ab rund 40 bis 60 %. Auf d1440 zeigt der erste Bildschirm 59 bis 65 % des Fotos (Oberkante bei 433 bis 476 px, Höhe 720 px).
- Quellen: alle ≥ 690 px (d1920 bei DPR 1). Kleiner als vorher, mit Grund:
  - /bad 960 → 800;
  - /bad/badsanierung 960 → 792;
  - /bad/barrierefreies-bad 1280 → 800 (die alte Quelle war weich, 0,023);
  - /leistungen 1140 → 960.
- Mobile Bytes bei w=750 (AVIF): 12,7 bis 27,4 KB, alle unter 200 KB.
- Desktop: Das Hochformat lädt auf d1440 die Breite 640 statt 750.

Durchgesehen:
- `bereich-dusche-streifen-sitzbank` zeigt den stufenlosen Boden klar und scharf. Oben links sind Anschlüsse ohne Armatur, ein Schlauch und eine blaue Kappe zu sehen. Ich habe ihn übernommen, weil die Aussage der Seite (Dusche ohne Stufe, Sitzbank) im ersten Bildschirm steht. Risiko: Prüfer lesen „Baustelle“. Rückweg: eine Zeile in `barrierefreies-bad.ts`.
- `bad-einstieg` auf /leistungen: Bei d1440 stehen im ersten Bildschirm Decke, Fenster und Möbel; der Holzboden beginnt am Falz (Grenzfall Kriterium 1). Trotzdem deutlich heller und schärfer als vorher. Übernommen.

Offen für Teil C:
- `start-dusche` bleibt bis M-C7 als Einzelfoto auf /fliesen; Kriterium 4 ist erst danach erfüllt.
- Das neue erste Galeriefoto `start-beleg-bad` (IMG_2610) steht auch auf / und den Ortsseiten. Die Reihenfolge der Galerie gehört M-C3.

## 5 Tabelle der em-Breiten (M-A1 Nr. 2)

Messweise:
- Browser, d1440, Kopie der H1-Schrift.
- Archivo, `font-stretch` 74 %, wght 760, Laufweite −0,015em, Wortabstand 0,06em.
- nowrap bei 100 px, Breite durch 100.

| Ansicht | Zeile 1 | Zeile 2 | längstes Wort |
|---|---|---|---|
| / | 5,245 | 7,853 | Quadratmeter. 5,369 |
| /bad | 13,296 | 7,492 | nutzen. 2,735 |
| /bad/badsanierung | 7,384 | 5,408 | Traumbad 3,766 |
| /bad/barrierefreies-bad | 8,072 | 8,387 | barrierefreies 5,034 |
| /leistungen | 12,252 | 9,936 | Fliesenleger 4,551 |
| /balkon-terrasse | 7,018 | 7,580 | Terrasse 3,231 |
| /referenzen | 9,890 | 11,427 | Kunden, 3,084 |
| /ueber-uns | 9,444 | 10,223 | Fliesenleger 4,551 |

Mit Schnurzeichen:
- /bad ab xl: 13,30 + 2 × (1,1 × 1,304 + 0,5) = 17,17.
- /balkon-terrasse ab lg: 7,58 + 2 × (1,1 × 1,875 + 0,5) = 12,71.

## 6 Prüfzahlen

**Tests und Bau**
- `npm test`: 261 Tests, 261 bestanden, 0 Fehler.
- `npx tsc --noEmit`: 0 Fehler nach `next build`. Davor fehlt `next-env.d.ts`; derselbe Fehler zu `sprite.svg` steht auch in `vor`.
- `npx eslint` über alle geänderten TS/TSX/MJS-Dateien: 0.
- `werte.mjs` über 15 Dateien, gegen das globals.css der Kopie: 1 Befund `dauer_zahl` in `galerie-filter/daten.ts` Zeile 77 (`STAFFEL_MAX: 7`). Die Zeile ist unverändert und war vorher auch da; sonst 0.
- `next build`: Exit 0. Ein Stylesheet je Seite (/, /bad, /fliesen: dieselbe Datei).
- **CSS-Zuwachs:** roh 136 410 → 137 316 B (+906 B), **gzip −9 23 400 → 23 529 B (+129 B)** gegen 4324. Budget aller Bauteile 4 KB.

**H1 gegen H2** (ruhig, `_sfa-h1`, Rohdaten `$SCRATCH/sfix/a/h1-nach.txt`)

| Breite | H1 / H2 |
|---|---|
| m360 | 1,19 |
| m390 | 1,21 |
| m430 | 1,24 |
| t768 | 1,27 bis 1,43 |
| t1024 | 1,47 bis 1,53 |
| d1280 | 1,30 bis 1,61 |
| d1440 | 1,25 bis 1,65 |
| d1920 | 1,24 bis 1,64 |
| m360 und m390 bei 200 % | 1,00 (H1 = H2 = 64 px) |
| t768 und d1440 bei 200 % | ≥ 1,15 |

Weitere Messungen:
- Ab md bricht keine Zeile um (je Satzzeile eine Zeile).
- Grundlinie der letzten Zeile gegen Schnur: −1,1 bis +0,1 px auf allen Geräten.
- Kein Überlauf.

**erstesbild.mjs** (Kopie mit `SFA_SCHRIFT` für 200 %, Endlauf auf dem Endbau; Belege `$SCRATCH/sfix/a/erstesbild/{vor,nach,vor-200,nach-200}/erstes-bild.json` samt Bildern)

q844, m390 und d1440, 11 Ansichten, 2 Durchgänge:
- Summe bestanden 279 → 280.
- Besser:
  - /kontakt q844 nach Einwilligung 3 → 5;
  - /bad m390 Erstbesuch 4 → 5.
- Schlechter: /referenzen und /ueber-uns m390 im **Erstbesuch mit offenem Banner** 4 → 3 (siehe Frage 2).
- Alle Fälle „nach Einwilligung“ sind 5 von 5.

m360 bei 200 %:
- Summe 48 → 48.
- /bad/badsanierung 3 → 4.
- /blog 4 → 3: Messartefakt, siehe Frage 3.

**ueberlappung.mjs** (über `einzelbild.mjs`; /bad, /bad/barrierefreies-bad, /balkon-terrasse, /fliesen, /blog in m360 bis d1920)
- Neu ist nur die Art `leitachse`: Der Zeilenkasten der letzten H1-Zeile kreuzt die 2 px der Schnur.
- Dieselbe Meldung steht auf / im Vorher-Stand (d1440, q844). Das ist die gewollte Figur: Die Unterlängen kreuzen die Schnur.
- Am Schnurzeichen keine Meldung. Überlauf: 0.

**Bewegung im Erstbesuch** (`getAnimations`)
- /fliesen: nur `eingang-schnur` und `eingang-lot` mit 140 ms.
- /blog m390: nur `eingang-schnur`.
- Vorher liefen dort `eingang-zeile` an der H1 und `eingang-setzen` an Ort und Knöpfen.

**Bilder** (PNG, DPR 1, unter `$SCRATCH/sfix/a/bilder/`)
- `erster-bildschirm/`: 11 Ansichten × d1440, m390 × ruhig, bewegt × vorher (4324), nachher (4440); 88 Bilder.
- `q844/`: 22 Bilder.
- `ort/`: /standorte/wetzlar vorher und nachher.
- `reihen/`: /bad-Reihe, /bad/badsanierung-Reihe, /referenzen-Galerie.
- `m-a2/`: Kandidatenbogen.

## 7 Textvorschläge (für TEXTVORSCHLAEGE.md; bis zur Antwort bleiben die Texte)

| Ansicht | Stelle | heute | Vorschlag | Grund |
|---|---|---|---|---|
| /referenzen | Ortszeile im Einstieg | „Fliesenleger Deniz Tezgel aus Aßlar, für Wetzlar und Mittelhessen.“ | „Aus Aßlar, für Wetzlar und Mittelhessen.“ | Mobil eine Zeile statt zwei: Der Hauptknopf rückt im Erstbesuch m390 über den Rand des Cookie-Banners (Frage 2). Name und Beruf stehen im Kopf. |
| /ueber-uns | Ortszeile im Einstieg | „Aus Aßlar in Hessen, für Wetzlar und Umgebung.“ | „In Hessen, für Wetzlar und Umgebung.“ | Die H1 sagt schon „aus Aßlar“ (Befund 3b). Mobil eine Zeile kürzer, gleicher Effekt wie oben. |
| /fliesen | Ortszeile im Einstieg | „Fliesenverlegung Tezgel aus Aßlar“ | „Für Aßlar, Wetzlar und Umgebung.“ | Befund 3a: kein Einsatzgebiet. Gleiche Ortszeile wie die Erzählseiten. |
| /leistungen | H1 | „Alle Leistungen vom Fliesenleger aus Aßlar, Fliese für Fliese.“ | „Alle Leistungen vom Fliesenleger aus Aßlar.“ | In fs-7 mobil vier Zeilen (m360: 2 + 2). Ohne Werbezusatz drei Zeilen; das Foto rückt höher (Befunde 2a, 2b). Die Zeilen in `ZEILEN_EM` neu messen. |

## 8 Offene Fragen an den Orchestrator

1. **M-A1 Nr. 5:** Lighthouse mobil m360 und m390 auf den sieben Erzählseiten. Ich erwarte das Foto als LCP-Element (EV-7). Bei LCP-H1 oder Leistung unter 90 gilt der Rückweg aus EV-7.
2. **erstesbild m390, Erstbesuch mit offenem Banner:**
   - Befund: /referenzen und /ueber-uns 4 → 3. Der Hauptknopf steht bei 405 bis 454 px; der Bannerrand liegt bei rund 445. Vorher stand er bei 391 bis 441, die H1 war dort zwei- statt vierzeilig.
   - Ursache: fs-7 unter sm. E-104 Nr. 2 knüpft fs-7 unter sm nur an m360 mit 200 % und an q844; beide sind unverändert bzw. grün.
   - Die Abnahmeregel verlangt bei m390 1,15 × H2; fs-6 ergäbe 1,0.
   - Wege: annehmen, die Ortszeilen kürzen (Abschnitt 7) oder unter sm fs-6 nur für diese zwei Seiten (bricht die Abnahmeregel).
3. **erstesbild m360 bei 200 %, /blog nach Einwilligung 4 → 3:**
   - Der Hauptknopf des Einstiegs (Figur: Fugenstufe 12 statt 32) beginnt jetzt bei 694 px, also im Bild, aber unter der unteren Leiste.
   - Das Werkzeug wählt das erste Element im Ausschnitt und meldet „unter-dem-falz“. Der Termin-Knopf der Leiste (621 bis 740 px) ist sichtbar und vollständig.
   - Ich habe nicht für die Messung umgebaut (G7). Bitte entscheiden, ob das als Messartefakt gilt.
4. **Repo-Hygiene:**
   - `_werkstatt/werkzeuge/_sfa-mass.mjs` ist mein temporäres Messskript. Es ist mit Commit 698638d4 (KONTINGENT …) ins Repository geraten, während es kurz dort lag.
   - Ich habe es wie vorgeschrieben gelöscht; im Arbeitsbaum steht es als gelöscht. Bitte die Löschung committen.
   - Alle übrigen Hilfsskripte (`_sfa-*`, `_tmp-sfa-eb.mjs`) sind gelöscht und nie versioniert.
5. Für SF-C1: Die Ortsseiten brauchen im Aufruf von OrtsSeite `schnur bewertung`, wenn das Einzugsband den Bildplatz verlassen hat. Steht der Titel dort in fs-5 bei Titeln über 44 Zeichen und flach in fs-4, rechnet `schnur-grundlinie` mit Zeilenhöhe 1,1 bzw. flach 1,15. Bei fs-4 (Zeilenhöhe 1,5) läge die Grundlinie flach rund 3,5 px unter der Schnur; ein Rechnen mit `lh` wäre der Ausweg.

## 9 Aufräumen

- Server 4440 gestoppt; 4324 läuft unberührt.
- `baum/.next` und die echte Kopie von `node_modules` gelöscht; `baum/node_modules` zeigt wieder auf `/home/user/tezgel/node_modules`.
- Keine Git-Schreibvorgänge.

## 10 Nacharbeit nach der Prüfung von Welle 1

Stand 31.10.2026. Ich habe zwölf Befunde der zwei Prüfer selbst nachgeprüft, mit eigenem Bau auf Port 4440 gegen 4324.
- Der Diff ist neu erzeugt: 19 Dateien, neu dabei ist `_werkstatt/register.json`.
- `patch -p1 --dry-run` ist sauber gegen `vor` und gegen den Repo-Stand 77c4b79c.
- Die Zahlen in diesem Abschnitt ersetzen die Zahlen aus Abschnitt 6, wo sie abweichen.

### 10.1 Befunde und Stand

| Nr. | Befund (Schwere) | Nachprüfung | Stand |
|---|---|---|---|
| 1 und 9 | fs-7 unter sm macht lange Titel vierzeilig. Im Erstbesuch rückt der Hauptknopf bei m390 unter den Bannerrand (mittel). | bestätigt (Messung `erstesbild` vor dem Fix) | **behoben für m390** (EV-12). Rest bei m360: siehe 10.3 |
| 3 | Maskenbruchstücke bis rund 25 px unter der Schnur beim Aufsteigen der letzten Zeile (mittel) | bestätigt: Die Maske reichte 0,2em unter den Zeilenkasten, der Kasten selbst reicht 0,216em unter die Grundlinie | **behoben** für die sechs Unterseiten (EV-13). `/` folgt mit M-A5 Nr. 2 |
| 4 | „einheitlich statt austauschbar“: Erwartung Kreativität zu hoch (mittel) | bestätigt | Erwartung korrigiert (10.4). Ein zweites Schnurzeichen braucht eine Planerweiterung (Frage 6) |
| 2 | `/leistungen`: Einstiegsfoto zeigt bei d1440 Decke und Fenster (mittel) | bestätigt | **nicht behoben**: Kein zulässiges besseres Bild, siehe 10.3. Als Kompromiss geführt, Erwartung +0,2 |
| 5 | `/bad/barrierefreies-bad` liest sich wie eine Baustelle (gering) | bestätigt | Bild bleibt; Erwartung +0,3 statt +0,6. Rückweg: eine Zeile in `barrierefreies-bad.ts` |
| 6 | q844: Foto nur als Streifen (gering) | bestätigt | **nicht behoben**: M-A3 Nr. 6 verlangt, dass die Ortszeile weiter umbricht (kein Abschneiden). Keine Zuschnitte. Erwartung bei q844: Aussage nur auf `/bad` und `/balkon-terrasse` |
| 7 | Wissensseiten: Lotstück endet ohne Zeichen; H1 = H2; Eingang 140 ms (gering) | (1) und (2) bestätigt; (3) ist Planvorgabe („Schnur 0 bis 150 ms“) | **nicht umgesetzt**: siehe 10.3 und Frage 7 |
| 8 | Galerie `/referenzen` beginnt mit drei dunklen Motiven (gering) | bestätigt (Folge von EV-8) | **behoben**: `start-galerie-1` (helle Dusche mit Sitzbank, Gruppe `dusche` wie vorher `start-dusche`) steht an Platz 1. Die erste Reihe heißt wieder Dusche, Bad, Balkon; weiter 24 Fotos. Die Reihenfolge im Ganzen legt M-C3 |
| 10 | `/blog` bei m360 und 200 %: Hauptknopf 4 → 3 (gering) | bestätigt, Messartefakt | **nicht behoben** (G7), Frage 3 bleibt |
| 11 | ENTSCHEIDUNGEN-Eintrag fehlt im Diff; EV-10 nicht abgestimmt (gering) | bestätigt | Vorschlag erweitert (10.5). Den Eintrag schreibt der Orchestrator |
| 12 | `register.json`: Beschreibung von `eingang` veraltet (gering) | bestätigt | **teilweise**: `hinweis` ergänzt. Für `eingang.was` liegt der Wortlaut in 10.5. Er steht auch in `register.ts`, und das ist das Bewegungsmodul, nicht dieses Bauteil |

### 10.2 Neue Entscheidungsvermerke

**EV-12 · Unter sm Brotkrumen und H1 näher am Kopf** (Figur der Unterseiten mit Brotkrumen)
- Ziel: Den Hauptknopf im Erstbesuch m390 wieder über den Bannerrand bringen, ohne die H1 zu verkleinern.
  - Die Abnahmeregel 1,15 × H2 und E-104 Nr. 2 bleiben erfüllt.
  - Die Texte bleiben unverändert.
- Umsetzung in `EinstiegMitte.tsx`:
  - Der Abschnitt bekommt `max-sm:pt-16` statt `pt-24`.
  - Die Brotkrumen bekommen `max-sm:mt-4 max-sm:mb-4`.
  - Luft unter dem Kopf: 16 statt 32 px; Abstand bis zur H1: 16 statt 24 px; zusammen 24 px Gewinn. Alles in Fliesenstufen.
  - Nur wenn Brotkrumen stehen (`engKopf`). Ohne Brotkrumen stünde die H1 direkt am Kopf.
  - `/` (ohne Brotkrumen) bleibt bei pt-24.
- Verworfene Alternativen:
  - `pt-16` ohne Ausgleich: Die Brotkrumen stießen mit rund 3 px an die Unterkante des Kopfs. Gebaut, angesehen und verworfen.
  - Unter sm fs-6 für vierzeilige Titel: bricht die Abnahmeregel.
  - Ort und Knöpfe enger an die Schnur: Die Unterlängen kreuzen die Schnur, und der Ort stieße an sie.
  - Texte kürzen: geht nur als Vorschlag (Abschnitt 7).
- Wirkung:
  - Erstbesuch m390 auf `/referenzen` und `/ueber-uns` wieder 4 von 5 wie vorher, Hauptknopf jetzt bei 381 bis 430 px.
  - Auf allen sechs Unterseiten steht das Foto mobil 24 px höher.
  - d1440 und q844 sind unverändert (AE 0 gegen den ersten Stand).
- Risiko: weniger Luft über den Brotkrumen als auf `/` und den Wissensseiten (32 px). Bild: `bilder/erster-bildschirm/*-m390-*-nach.png`.
- Rückweg: `engKopf` auf `false` setzen.

**EV-13 · Zeilenmaske der letzten Zeile endet an der Grundlinie** (Vorgriff auf M-A5 Nr. 2, nur Unterseiten)
- Ziel: Beim Aufsteigen steht nichts unter der Schnur.
- Umsetzung:
  - Die Schlüsselbilder `eingang-zeile` lesen die Unterkante der Maske aus `--eingang-maske-unten`. Ohne Angabe gilt −0,2em, also derselbe berechnete Wert wie bisher; `/`, Planblatt und Ortsseiten bleiben gleich.
  - In `bewegung.css` setzt der Block „Zeilenmaske an der Schnur“ die Variable an `.titel-zeile > [data-motion="zeilenmaske"]:last-child` auf 0,216em, also auf die Grundlinie. Die Klasse `titel-zeile` tragen nur die Unterseiten.
  - Name, Dauer, Kurve und Folge bleiben. Die Tests „Eingang 1“, „Eingang 6“ (außerhalb der Medienabfrage nur `--eingang-*`) und „Eingang 9“ sind grün.
- Vom Plan abweichend: M-A5 Nr. 2 sieht ein Schlüsselbild bei 85 % vor, das die Unterlängen allmählich freigibt.
  - Hier erscheinen die Unterlängen in einem Bild, wenn der Zug endet (Zeile 2 auf `/bad` bei 860 ms). Die Zeile steht dann schon (ease-setzen, Restweg unter 0,1 px).
  - Ein 85-%-Schlüsselbild in den gemeinsamen Schlüsselbildern hätte auch `/` verändert, weil die Kurve je Abschnitt gilt. Ein eigener Name bricht „Eingang 1“ (Wiederkehr nur `eingang-zeile`).
  - Das allmähliche Freigeben bleibt M-A5 Nr. 2 für alle sieben samt `/`. M-A5 Nr. 2 deshalb nicht verschieben.
- Beleg (Standbilder mit angehaltener Zeitleiste, d1440, Ausschnitt um die H1):
  - nachher: `bilder/folge/bad-d1440-stand-{0150…0900}-nach.png`. Bei 300 bis 450 ms ist die zweite Zeile an der Schnur abgeschnitten, darunter nichts.
  - vorher: `…-vor.png`.
- Rückweg: den Block „Zeilenmaske an der Schnur“ streichen.

### 10.3 Begründete Nicht-Umsetzungen und Rest

- **m360 im Erstbesuch, `/leistungen` und `/ueber-uns`: 3 → 2 (Ort unter dem Banner).**
  - Der Banner beginnt bei m360 (Höhe 740) bei rund 325 px.
  - `/leistungen`: Der Ort steht bei 302 bis 332 px. 8 px mehr hätten Abstände von 12 px unter dem Kopf und vor der H1 verlangt; das habe ich verworfen.
  - `/ueber-uns`: Der zweizeilige Ort steht bei 302 bis 362 px.
  - Hauptknopf und Telefon liegen bei m360 im Erstbesuch auf allen Seiten, vorher wie nachher, unter dem Banner. Nach Einwilligung sind beide Seiten 5 von 5.
  - Wege: die Textvorschläge aus Abschnitt 7. Die Ortszeile von `/ueber-uns` wird einzeilig; die H1 von `/leistungen` wird dreizeilig, dann rückt der Ort um eine Zeile höher. Der Vorschlag für `/leistungen` löst auch „aus Aßlar,“ allein in Zeile 3. Sonst entscheidet der Orchestrator über die Annahme.
- **`/leistungen`-Foto:**
  - Die Bäder mit Boden in den oberen 55 % sind Einstiege anderer Seiten (Kriterium 4): `bad-beleg-1` auf `/bad`, `badsanierung-beleg-2`, `bereich-dusche-streifen-sitzbank` und `start-dusche`.
  - Gestrichen sind `bad-beleg-2`, `bad-beleg-4`, `start-beleg-dusche` und `barrierefrei-beleg-1`: Ihr Boden beginnt erst bei 80 bis 90 %.
  - Außenfotos aus ARBEITEN (Balkon, Terrasse) stellten eine Nebenleistung vor das Bad. Mehrere davon stehen schon als Einstieg oder Beleg.
  - Zuschnitte sind verboten (E-104 Nr. 6).
  - `bad-einstieg` bleibt als Kompromiss: heller und schärfer als vorher, der Boden beginnt am Falz.
- **Wissensseiten:**
  - Ein Zielzeichen am Lotende ohne Foto wäre neue Gestaltung außerhalb von M-A3; EV-5 hat die Aufhängung bewusst an das Foto gebunden.
  - H1 in fs-7 auf den Wissensseiten liegt außerhalb von M-A1 Nr. 2, das nur die Figur betrifft. K-003 für den einfachen Einstieg ist unverändert. Die Änderung gälte für alle Nutzer von `Einstieg` (`/fliesen`, `/blog`, `/kontakt`, mit SF-C1 die 13 Ortsseiten) und bräuchte dort eine Zeilenmessung. Frage 7.

### 10.4 Erwartung (korrigiert)

| Ansicht | Kategorie | Plan | jetzt |
|---|---|---|---|
| alle sieben Erzählseiten | Kreativität | +0,5 bis 0,8 | +0,3 bis 0,5: einheitliche Figur, unterscheidbar nur durch Foto und Schnurzeichen |
| `/referenzen`, `/ueber-uns` | Kreativität | ≥ 7,5 | bleibt voraussichtlich unter 7,5 (vorher 6,0 bis 6,6); siehe Frage 6 |
| `/leistungen` | Design (Bild) | +0,5 | +0,2 (Kompromiss `bad-einstieg`) |
| `/bad/barrierefreies-bad` | Design, Inhalt (Bild) | +0,6 | +0,3. Prüfer werden „Baustelle“ nennen |
| q844 | Foto im ersten Bild | Aussage | Streifen. Eine Aussage hat er nur auf `/bad` und `/balkon-terrasse` |

### 10.5 Für den Orchestrator

**ENTSCHEIDUNGEN, Vorschlag (ersetzt den Vorschlag in Abschnitt 1)**

„M-A3 Nr. 2 und EV-10:
- Die H1 der Wissens- und Ortsseiten steht ab dem ersten Bild (LCP-Kandidat, E-067-4).
- Im einfachen Einstieg (`vorlagen/teile/Einstieg`) entfällt die Zeilenmaske für alle Nutzer, auch für die 13 Ortsseiten und kompakt. Das ist reine Bewegung, der Endzustand ist pixelgleich.
- flach (Brotkrumen aus, Abstände 12 und 16, H1 eine Stufe kleiner) gilt ebenfalls für alle Nutzer. Ortsseiten ändern sich dadurch nur bei q844.
- An der Schnur stehen Ort, Knöpfe, Bewertung und Bild ab dem ersten Bild; es ziehen nur Schnur und Lotstück in dauer-1.
- test/intro.test.mjs ‚Eingang 7‘ prüft die positive Fassung:
  - Einstieg ohne `zeilenmaske`;
  - Vorspann ohne `data-eingang`;
  - Behälter `data-motion="eingang" data-einstieg="schnur"`;
  - Schnurebene mit `data-eingang="schnur"` und `"lot"`.
- Die Figur der Unterseiten setzt die Maske der letzten H1-Zeile an die Grundlinie (`--eingang-maske-unten`, EV-13).“

**Hinweis an SF-C1:** Die Ortsseiten haben nach diesem Diff schon H1 ohne Zeilenmaske und flach. Einschalten heißt nur noch `schnur bewertung` im Aufruf von OrtsSeite (Frage 5).

**`eingang.was`, gleicher Wortlaut in `register.json` und `src/lib/motion/register.ts`** (test/bewegung.test.mjs „Bewegung 13“ vergleicht beide):

„Eingang ohne Vorhang: Logo baut sich im Kopf auf, Schnur und rotes Lotstück ziehen aus dem Kreuzpunkt unter der H1, auf / zeichnet sich der Quadratmeter an der Schnur, Ort und Knopfzeile (mittig mit allem darunter, auf den Erzählseiten mit dem Schnurzeichen) setzen sich, Fugenriss am Foto; unter sm kommen nur Schnur und Zeilen; im einfachen Einstieg an der Schnur (Wissensseiten) ziehen nur Schnur und Lotstück, alles andere steht (E-067-4, UM-E3-FIX, UM-E3-FIX2, UM-E4-SICHT-FIX)“

**Neue offene Fragen**
6. Ein seitenspezifisches Schnurzeichen für `/referenzen` und `/ueber-uns` (Vignette aus `kern/vignetten`, gleiche Mechanik `schnurZeichen`)? M-A1 Nr. 3 nennt nur `/bad`, `/balkon-terrasse` und `/bad/badsanierung`; dafür braucht es eine Planerweiterung.
7. H1 der Wissensseiten ab md in fs-7 (Abnahmeregel 1,15 × H2 wie bei der Figur) und ein Zielzeichen am Lotende ohne Foto: in Welle 2 aufnehmen oder nicht?

### 10.6 Prüfzahlen (Endbau der Nacharbeit, Port 4440)

**Tests und Bau**
- `npm test`: 261 Tests, 261 bestanden, 0 übersprungen. Der Stylesheet-Test lief mit Produktionsbau.
- `npx tsc --noEmit`: 0.
- `npx eslint` über die geänderten Dateien: 0.
- `werte.mjs` über 17 Dateien, gegen das globals.css der Kopie: 1 Befund `dauer_zahl`, `STAFFEL_MAX: 7` in `daten.ts`. Die Zeile ist unverändert und war vorher auch da, jetzt Zeile 79.
- `next build`: Exit 0. Ein Stylesheet auf `/` und `/bad` (dieselbe Datei).
- **CSS gegen 4324:** roh 136 410 → 137 607 B (+1 197 B), **gzip −9 23 400 → 23 605 B (+205 B)**.

**erstesbild.mjs** (11 Ansichten, je Erstbesuch und nach Einwilligung; Belege `$SCRATCH/sfix/a/erstesbild/nach2/` und `nach2-200/`, vorher `erstesbild/vor`, `vor-200` und `pruef-1/ep/vor-m`)

| Gerät | vorher | nachher |
|---|---|---|
| q844 | 64 | 66 (/kontakt nach Einwilligung 3 → 5) |
| m390 | 105 | 106 (/bad Erstbesuch 4 → 5; /referenzen und /ueber-uns 4 → 4, vorher in Welle 1 3) |
| d1440 | 110 | 110 |
| m360 bei 100 %, ohne / | 78 | 81 (+1 auf /bad/badsanierung, /bad/barrierefreies-bad, /balkon-terrasse, /fliesen, /blog; −1 auf /leistungen und /ueber-uns, siehe 10.3) |
| m360 bei 200 % | 48 | 49 (+1 auf /bad/badsanierung und /balkon-terrasse; −1 auf /blog, Frage 3) |

Alle Fälle „nach Einwilligung“ auf q844, m360, m390 und d1440 sind 5 von 5.

**Bilder** (unter `$SCRATCH/sfix/a/bilder/`, nachher erneuert)
- `erster-bildschirm/`: Gegen den ersten Stand geändert sind nur die m390-Bilder der sechs Unterseiten (EV-12). d1440, `/`, Wissensseiten, `/kontakt` und q844 sind AE 0. Ruhig und bewegt sind im Endzustand gleich (AE 0, fuzz 25 %), außer `/fliesen` d1440 (bestehende `sig-plan`-Flucht).
- `reihen/referenzen/referenzen-d1440-ruhig-nach-s.png`: Galerie mit der hellen Dusche vorn.
- `folge/bad-d1440-stand-*-{vor,nach}.png`: Standbilder des Eingangs zu EV-13.

**Aufräumen**
- Server 4440 gestoppt; 4324 läuft unberührt.
- `.next` und die echte Kopie von `node_modules` gelöscht; der Symlink ist wiederhergestellt.
- Hilfsskripte `_sfa-eb.mjs`, `_sfa-werte.mjs` und `_sfa-bilder.mjs` aus `_werkstatt/werkzeuge` gelöscht.
- Keine Git-Schreibvorgänge.
