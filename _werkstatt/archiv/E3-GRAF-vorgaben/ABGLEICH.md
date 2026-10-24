# Abgleich der großen Momente E3-GRAF-01 bis 09

Ich habe nichts im Repo geändert. Nachgeprüft am Bestand:
- `bewegung.css` wird mit `@import … layer(components)` geladen. Utilities gewinnen also bei gleicher Eigenschaft.
- `Planrahmen` kennt `fuellen`, `Abschnitt` kennt `einleitung` und `titelId`.
- Alle Icons und Bildkennungen gibt es, alle Bilder sind 4 : 5.
- Die 25 Galerie-Unterschriften enthalten kein Glossarwort.
- Die Kontrollwerte von gefaelle-balkon habe ich nachgerechnet, sie stimmen.
- `tsconfig` schließt `page.dev.tsx` ein.

## 1. Konflikte und Doppelungen

1. **Vier CSS-Blöcke an derselben Stelle.** schichten, weg, gefaelle-dusche und gefaelle-balkon wollen alle „nach Zeile 771“. formatregler und galerie-filter wollen beide hinter den verband-Block. Die Zeilennummern verschieben sich, sobald etwas eingefügt ist. Lösung: am Text verankern, feste Reihenfolge (siehe 2a).
2. **test/bewegung.test.mjs.** Es gibt drei Namen für dieselbe Liste (GROSSE_MOMENTE, GROSSE_MOMENTE_E3, MOMENTE_E3) und dreimal einen neuen Test „Bewegung 6“ (schichten, gefaelle-dusche, karte). Lösung: eine Fassung, Tests 6 bis 8 (siehe 2d).
3. **register.ts.** galerie-filter will hinter `verband`, alle anderen hinter `fugenband`. Lösung: ein Block hinter `fugenband`.
4. **register.json „quelle“.** schichten sagt „nichts ändern“, gefaelle-balkon und galerie-filter sagen „auf v3.4“. KERN steht schon auf v3.4 (Commit e4fdc62), also anheben.
5. **Schaufenster `werkstatt-schaufenster/momente/page.dev.tsx`.** Vier Pakete beanspruchen diese Datei mit verschiedenem Inhalt (formatregler, verband, vorher-nachher, galerie-filter). Lösung: je Moment eine eigene Route (2i). Wichtig: Eine Route darf erst mit ihrem Paket landen. Sonst bricht `tsc --noEmit` in jedem Paket, weil der Import fehlt.
6. **bewegung.mjs.** formatregler will `'regler'` und einen Eintrag in NICHT_AUSLOESBAR. vorher-nachher will „nicht setzen“. galerie-filter will einen neuen Modus `'galerie'`. Lösung: siehe 2f.
7. **/referenzen, zwei Momente in einem Schlitz.** galerie-filter und vorher-nachher stehen beide in `momente.beleg`, also im selben Abschnitt. Der Seitentext gibt vorher-nachher aber eine eigene H2. Am Übergang stehen beide in einem Bildschirm. Dazu widersprechen sich die Anweisungen an E3-BAU-07:
   - galerie-filter: `<div className="mt-24">` um vorher-nachher,
   - vorher-nachher: schlichtes Fragment, Abstand über `mt-16 first:mt-0` am Moment.

   Empfehlung: ein eigener Abschnitt mit H2 (2g, Punkt 4). Ersatzweise das Fragment mit `mt-24` und h3, dann die Abweichung vom Text vermerken.
8. **Dasselbe Foto zweimal auf /referenzen.** `start-galerie-5` (Galerie) und das künftige `ref-nachher` stammen beide aus IMG_2525. Vorschlag: `start-galerie-5` bleibt, bis E3-BILD-01 ein weiteres Foto für „Treppe und Eingang“ liefert, dann tauschen.
9. **Mehr als ein Rot je Bildschirm.**
   - Das Lot von vorher-nachher ist rot, und der Beleg-Abschnitt ist Kalk mit Leitachse. Das ergibt zwei Rot. Lösung: Lot `bg-laser` durch `bg-tinte` ersetzen. Das ist auch die Form der Trennlinie im formatregler.
   - Die Karte hat zwei rote Kreuze (Zeichnung und Legende) neben der Leitachse. Das gehört zur Sichtabnahme; wenn es stört, wird das Legendenkreuz `text-tinte`.
   - weg ist in Ordnung, weil die weiße Fläche die Leitachse verdeckt.
10. **Zwei Regler, die sich unterscheiden.** formatregler und vorher-nachher berufen sich beide auf denselben Vertrag, weichen aber ab:

    | Teil | formatregler | vorher-nachher |
    |---|---|---|
    | Trennlinie | Tinte 2 px | Laser 2 px |
    | Griffrand | `border-tinte` | `border-strich` |
    | Schiebefeld | sichtbar | sr-only |
    | Schritt der Pfeiltasten | 1 | 5 |
    | `wertAusZeiger` ohne Breite | null | 50 |

    Lösung jetzt: Lot Tinte und Griff `border-tinte` in vorher-nachher. Die Bedienung später in einem gemeinsamen Baustein `kern/Vergleichsregler` angleichen.
11. **Zurück und Vor (`k-verlauf`) ist uneinheitlich.** Bei gefaelle-dusche steht dann sofort der Endzustand (wie SIG-1). gefaelle-balkon und karte laufen noch einmal. Lösung: alle drei Endzustand (CSS in 2a).
12. **Gleiche Rechenhilfen doppelt.** `pfeilEntlang` und der Tropfenpfad stehen in beiden gefaelle-Paketen, `wertAusZeiger` in formatregler und vorher-nachher. Das ist kein Fehler. Später in eine `.ts`-Datei in kern ziehen, nicht in `zeichnen.tsx`, denn die Tests laden kein `.tsx`.
13. **Keyframe-Namen.** Es gibt keine Kollision. `gefaelle-tropfen` und `gefaelle-pfeil` (Dusche) stehen neben `gefaelle-balkon-*`. Umbenennen in `gefaelle-dusche-*` ginge, ist aber nicht nötig; wenn, dann in vier Dateien gleichzeitig.
14. **Allgemeine Variablennamen.** `--ab` (gefaelle-balkon) sowie `--x` und `--y` (karte) sind sehr allgemein, und `--x/--y` erben. Wahlweise `--gefaelle-balkon-ab`, `--karte-x`, `--karte-y`; das kostet je eine Zeile CSS und TSX.
15. **CSS und Register gemeinsam.** Die Pakete karte, gefaelle-dusche und gefaelle-balkon blenden Teile aus, bis `data-motion-stand` gesetzt ist. Fehlt der Registereintrag, bleiben die Pfeile bzw. Ringe für immer unsichtbar. Darum gehören CSS und `register.ts` in denselben Commit, nicht nur bei der Karte.
16. **Regel für `data-motion`.** Sechs Pakete setzen es nur am Behälter (wie einzugsband und szene-ablauf; bewegung.mjs ordnet über `closest` zu). schichten und galerie-filter setzen es je Element. Beides funktioniert. Vorschlag: K-007 so fassen: „Jedes animierte Element liegt in einem Element mit data-motion.“ Am Code muss sich dafür nichts ändern.
17. **schichten verschiebt in rem.** `translate: 0 calc(var(--spacing) * -4)` wächst mit der Systemschrift und passt dann nicht mehr zum Test (`ZEICHNUNG.weg = 16`). Lösung: `translate: 0 -16px` (Zeichnungseinheiten wie beim verband).
18. **Text und Fakten.**
    - K-007 nennt beim formatregler „60 × 60“, aber ENTSCHEIDUNGEN Zeile 183 sagt „60 × 60 cm bleiben draußen“.
    - „17,4 m“ und „2,6 m“ Fugen stehen nicht in K-015.
    - Die Karte sagt „Entfernungen … ab Aßlar“, die Standortseite „ab Wetzlar“ (M-04, M-17).
    - Die Karte auf /standorte oder einer Stadtseite würde das Einzugsband ersetzen. Das ist nach E-037 geschützt, also nicht ohne Rückfrage.
19. **Weitere Seiten mit zwei Momenten.**
    - /leistungen: SzeneAblauf bleibt in E3-BAU-04 ruhig (`bewegt={false}` wie heute), sonst steht es direkt hinter dem formatregler.
    - /ueber-uns: fugenband und karte sind getrennt, solange Fotos im Beleg vor der Karte stehen.
20. **Bildkennungen über mehrere Seiten.** `sanierung-weg-1` bis `-3` und `fliesen-fischgraet` stehen auch in der Galerie, das ist eine andere Seite und unschädlich. `fliesen-halbverband` ist dieselbe Datei wie `start-galerie-3`, `leistungen-balkon` und `balkon-beleg-1`. E3-BAU-05 darf keine davon zusätzlich auf /fliesen setzen, E3-BAU-02 keine `sanierung-weg-*` im Beleg.

## 2. Gemeinsame Dateien, zusammengeführt

Alles außer i, j und den Einträgen in `package.json` kommt in einen Commit E3-ORCH-02a, **vor** den Paketen. Das zieht 02a im PLAN vor; dort hängt 02a heute an den GRAF-Paketen. Grund: Dann laufen alle Pakettests vollständig, ohne Übersprünge.

**a) src/app/bewegung.css.** Am Text verankern, Blöcke wörtlich aus den Vorgaben. Nichts neu formatieren: Die Tests vergleichen einzeilige Regeln wörtlich.
1. Nach dem fugenband-Druckblock (`.fugenband-rot { animation: none !important; } }`), vor `/* verband (K-007`: Block vorher-nachher.
2. verband:
   - Einfügung A direkt nach `html.k-bewegung .verband .verband-reihe { transition: … }` und dem `}` von `@supports`.
   - Änderung B: Die Druckregel umfasst zusätzlich `.verband .muster-reihen` und `.verband .muster-fisch`.
   - Wörtlich aus `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/verband/paket/gemeinsam/bewegung-verband.css`, dort ohne den eigenen Druckblock.
3. Nach `@media (forced-colors: active) { .verband-wahl:has(input:checked) {…} }`, vor `/* aufklappen – Höhe`: erst der formatregler-Block, dann der galerie-filter-Block.
4. Über `@keyframes szene-setzen` die Zeile `/* auch weg: Marke setzt sich */` einfügen. Nach dieser Keyframe-Zeile, vor `/* einzugsband`, in dieser Folge:
   - schichten, mit der Korrektur `@keyframes schichten-setzen { from { opacity: 0; translate: 0 -16px; } to { opacity: 1; translate: 0 0; } }`,
   - weg,
   - gefaelle-dusche,
   - gefaelle-balkon, dazu:
     ```css
     html.k-verlauf [data-motion="gefaelle-balkon"] .gefaelle-balkon-tropfen,
     html.k-verlauf [data-motion="gefaelle-balkon"] .gefaelle-balkon-pfeil { animation: none !important; opacity: 1 !important; translate: none !important; }
     ```
5. Nach `@media print { .einzugsband .einzugsband-kante {…} }`, vor `/* sig-kreuzlinie`: Block karte aus `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/karte/final/gemeinsam-bewegung.css`, dazu:
   ```css
   html.k-verlauf [data-motion="karte"] .karte-ring,
   html.k-verlauf [data-motion="karte"] .karte-orte { opacity: 1 !important; scale: none !important; transition: none !important; }
   ```

Für die weg-Regeln keine `k-verlauf`-Regel ergänzen: Test „Weg 3“ verlangt genau vier Regeln mit `[data-motion="weg"]`.

Hinweis zum Layer: Die Elemente mit Haken für bewegung.css dürfen keine Tailwind-Klassen für translate, position oder top bekommen, sonst überstimmt die Utility die Regel. Das betrifft `vn-fenster`, `vn-teiler`, `formatregler-gross`, `formatregler-trenner` und `schichten-buehne`.

**b) src/app/globals.css.** In `@layer utilities` nach `.zeitband-stueck {…}`: `.karte-marke { position: absolute; left: var(--x); top: var(--y); }` samt Kommentar (aus `…/karte/final/gemeinsam-globals.css`).

**c) src/lib/motion/register.ts.** Nach `fugenband: { ausloeser: 'scroll' },`:
```ts
  // große Momente (KERN v3.4 K-007, E3-ORCH-02a; E3-GRAF-01 bis 09): Szenen scroll-gebunden per CSS, Sicht 0,4 über das
  // Modul (data-motion-stand), Regler und Auswahl ohne Beobachter; verband steht oben
  schichten: { ausloeser: 'scroll' },
  weg: { ausloeser: 'scroll' },
  'gefaelle-dusche': { ausloeser: 'sicht', schwelle: 0.4 },
  'gefaelle-balkon': { ausloeser: 'sicht', schwelle: 0.4 },
  formatregler: { ausloeser: 'interaktion' },
  'vorher-nachher': { ausloeser: 'interaktion' },
  karte: { ausloeser: 'sicht', schwelle: 0.4 },
  'galerie-filter': { ausloeser: 'interaktion' },
```

**d) test/bewegung.test.mjs.**
- Nach `const ENTFALLEN_E009 = [];`:
  ```js
  const MOMENTE_SCROLL = ['schichten', 'weg'];
  const MOMENTE_SICHT = ['gefaelle-dusche', 'gefaelle-balkon', 'karte'];
  const MOMENTE_INTERAKTION = ['formatregler', 'vorher-nachher', 'galerie-filter'];
  const GROSSE_MOMENTE = [...MOMENTE_SCROLL, ...MOMENTE_SICHT, ...MOMENTE_INTERAKTION]; // E3-ORCH-02a, verband steht in KERN_V3
  ```
- In Test 1 beide Listen um `...GROSSE_MOMENTE` erweitern (Vergleich und Schleife).
- Neue Tests:
  - Bewegung 6: jede Kennung aus MOMENTE_SCROLL hat `ausloeser === 'scroll'`, wird nicht beobachtet (grob und fein) und ist kein Ladeeintrag.
  - Bewegung 7: jede Kennung aus MOMENTE_SICHT hat `schwelleFuer === 0.4`, wird grob und fein beobachtet und ist kein Ladeeintrag.
  - Bewegung 8: jede Kennung aus MOMENTE_INTERAKTION hat `ausloeser === 'interaktion'`, wird nicht beobachtet, steht nicht in SELBST und ist kein Ladeeintrag.
- Bewegung 1b und 3 bleiben unverändert.

**e) _werkstatt/register.json.**
- Die acht Kennungen in derselben Folge wie in `register.ts` an `kennungen` und `v3` anhängen.
- `quelle` auf „KERN v3.4 K-007 (24.10.2026, E-044; große Momente E3-ORCH-02a) …“ heben.
- Im `hinweis` den Satz „Große Momente (…) kommen mit E3-ORCH-02a dazu.“ ersetzen durch „Die großen Momente stehen seit E3-ORCH-02a im Register (Bauvorgaben je Moment in _werkstatt/register/<kennung>.json).“

**f) _werkstatt/werkzeuge/bewegung.mjs.**
- In AUSLOESER:
  ```js
  schichten: 'scroll', weg: 'scroll', 'gefaelle-dusche': 'scroll', 'gefaelle-balkon': 'scroll', karte: 'scroll',
  formatregler: 'regler', 'vorher-nachher': 'regler', 'galerie-filter': 'auswahl',
  ```
- In NICHT_AUSLOESBAR:
  ```js
  regler: 'Regler ohne Animation (K-007 direkt): die Lage folgt der Eingabe',
  auswahl: 'Galerie: Folgen per Playwright-Schritt (Klick auf [data-galerie-wahl]), bis das Werkzeug eine Auswahl-Folge kennt',
  ```
- Wahlweise `WAHL_FOLGEN = ['drittel', 'fisch', 'kreuz']`. Ein fehlendes Feld überspringt das Werkzeug schon heute mit Befund. Den Kommentar „Start ist Halb“ anpassen: Auf /fliesen beginnt die Wahl bei Kreuzfuge.

**g) Vorlagen.**
1. `src/components/vorlagen/inhalt.ts`, in `AblaufInhalt` nach `titel: string;`: `einleitung?: Markentext;` mit Kommentar (für weg).
2. `teile/Ablauf.tsx`: am Abschnitt `einleitung={inhalt.einleitung ? <p><Textmarken text={inhalt.einleitung} /></p> : undefined}`.
3. `teile/Beleg.tsx`: `{moment && <div className={inhalt.fotos.length > 0 || inhalt.satz || inhalt.zweierbild ? 'mt-16' : undefined}>{moment}</div>}` (für galerie-filter).
4. Empfohlen für vorher-nachher mit H2:
   - In `ErzaehlSeite` `momente.belegZwei?: { titel: string; moment: ReactNode }`.
   - `Beleg` setzt daraus zwischen Fotos- und Stimmen-Abschnitt `<Abschnitt id="vorher-nachher" titelId="vorher-nachher-titel" formel="beleg" leitachse spaet flaeche="fliese" titel={…}>`.
   - `VorherNachher` bekommt `titelId?: string`. Ist sie gesetzt, entfällt das eigene h3, und das Schiebefeld nutzt diese Id für `aria-labelledby`.
   - Die weiße Fläche verdeckt die Leitachse. Ohne diesen Punkt gilt das Fragment mit `mt-24` aus Konflikt 7.

**h) package.json, Skript „test“.** Je Testdatei erst, wenn ihr Paket gelandet ist: `test/karte.test.mjs`, `test/verband.test.mjs`, `test/schichten.test.mjs`, `test/gefaelle-dusche.test.mjs`, `test/gefaelle-balkon.test.mjs`, `test/weg.test.mjs`, `test/galerie-filter.test.mjs`, `test/formatregler.test.mjs`, `test/vorher-nachher.test.mjs`.

**i) Schaufenster.** Der Orchestrator legt die Route jeweils mit ihrem Paket an:
- `werkstatt-schaufenster/<kennung>/page.dev.tsx` für schichten, weg, gefaelle-balkon, formatregler, verband, vorher-nachher, galerie-filter und karte.
- Aufbau: Einstieg mit Etikett „Schaufenster · nur Entwicklung“, Leitachse, eine leere Bildschirmhöhe (`min-h-dvh`), der Moment im echten Abschnitt bzw. Block, wieder eine leere Bildschirmhöhe.
- Fertige Vorlagen: verband aus `…/verband/paket/gemeinsam/schaufenster-momente.page.dev.tsx`, umbenannt nach `verband/`; karte aus `…/karte/final/gemeinsam-schaufenster-page.dev.tsx`.
- gefaelle-dusche über `erzaehlseite/page.dev.tsx` mit `momente={{ tun: <GefaelleDusche /> }}`, wie vorgegeben.
- vorher-nachher mit den Platzhaltern `kontakt-eingang` und `start-galerie-5`.

**j) src/config/arbeiten.ts (E3-ORCH-02d).** Die Einträge `ref-vorher` und `ref-nachher`, beide 800 × 1000, Werte aus `_werkstatt/bilder/arbeiten-e3.json`.

**k) Dokumente.**
- KERN K-007:
  - formatregler, Zweck „kleine Fliese gegen 120 × 260“ statt „60 × 60 gegen 120 × 260“;
  - wahlweise die genaueren Angaben zu Dauer und Kurve aus den Vorgaben weg, gefaelle-dusche, verband, karte und galerie-filter;
  - die Regel aus Konflikt 16;
  - Eintrag im Änderungsprotokoll.
- ENTSCHEIDUNGEN, neuer Eintrag E-045:
  - formatregler: die Zahlen 17,4 m und 2,6 m weglassen (K-010) oder als Rechenwert der Beispielwand zulassen;
  - Vergleichsregler wie in Konflikt 10;
  - vorher-nachher als eigener Abschnitt;
  - `k-verlauf` endet bei allen Sicht-Momenten im Endzustand;
  - `start-galerie-5` wie in Konflikt 8.
- `_werkstatt/texte/REF-bereich-barrierefreies-bad.md`: der zweite Satz der Unterschrift („In echt ist die Neigung so klein, dass man sie kaum sieht.“).
- Neue Texte durch das Lektorat: Legende gefaelle-balkon (drei Sätze), aria-label und zweiter Satz bei gefaelle-dusche, Beschriftung und Ansage des formatreglers, Legende „Wählen Sie ein Muster“ (verband), „Alle Fotos“, Statuszeilen und 19 Unterschriften der Galerie, Bildname, Legende und Hinweis der Karte, Ansage von vorher-nachher.
- Wahlweise `_werkstatt/bildplaetze.md`: sizes für `fliesen-*` auf `(min-width: 640px) 50vw, 100vw`.

**l) Briefings E3-BAU.**
- E3-BAU-01: schichten in `tun`; Unterschrift und Sätze nicht noch einmal eintragen.
- E3-BAU-02: Punkt 9 der weg-Vorgabe übernehmen (`einleitung`, `WEG_BILDER`, `momente.ablauf`); kein `sanierung-weg-*` im Beleg.
- E3-BAU-03: `momente.tun` mit `<GefaelleDusche />`.
- E3-BAU-04: formatregler in `tun`; SzeneAblauf bleibt ruhig.
- E3-BAU-05:
  - Wissensblock mit `zeichnung: 'verband'`; der Absatz endet auf „Hier sind vier Muster zum Ausprobieren.“;
  - die vier Mustersätze und die zwei Fotos nicht doppeln;
  - die Importe von VerbandUmschalter und Planblatt entfernen.
- E3-BAU-06: `momente.tun` mit `<GefaelleBalkon />`.
- E3-BAU-07:
  - `beleg.fotos: []`, kein `beleg.satz`;
  - `momente.beleg` ist `<GalerieFilter />`;
  - vorher-nachher über `belegZwei`, sonst das Fragment mit `mt-24`;
  - die neue `einleitung` für den Absatz „Deniz Tezgel ist Ihr fester Ansprechpartner …“ nutzen.
- E3-BAU-08: Einsatzkarte mit Unterschrift und Verweis; `beleg.verweis = { name: 'Alle Arbeiten ansehen', href: '/referenzen' }`; kein `beleg.orte`.

## 3. Bildbedarf für E3-BILD-01

1. **ref-vorher**
   - Quelle `_eingang/entpackt/IMG_2527.PNG`, Ziel `public/images/arbeiten/treppe/aussentreppe-vorher-beton.jpg`.
   - 800 × 1000, JPEG q82, ohne Metadaten, Breitenstufen über `bilder.mjs`.
   - Alt-Text „Vorher: Außentreppe aus ausgebessertem Beton“, raum `treppe`.
   - Nicht den Social-Zuschnitt aus `_werkstatt/bilder/referenzen/04_baustelle-vorher/` nehmen.
2. **ref-nachher**
   - Quelle `IMG_2525.PNG`, Ziel `public/images/arbeiten/treppe/aussentreppe-nachher-terrakotta.jpg`, gleiche Maße.
   - Alt-Text „Nachher: Außentreppe mit terrakottafarbenen Fliesen“.
   - `start-galerie-5` bleibt unverändert.
3. **Ausrichtung (Pflicht für den Regler)**
   - Das Vorher-Foto projektiv auf das Nachher-Foto einpassen, mit mindestens vier Passpunkten an zwei Stufenvorderkanten.
   - Grenzwerte: Stufenkanten höchstens 2 % der Höhe auseinander, rechte Wange höchstens 3 % der Breite.
   - Auf die gemeinsame Fläche zuschneiden, nie hochskalieren (mindestens 800 Quellpixel breit).
   - Weg, wenn möglich: Tuch, Blätter, Pflanze, Fensterrahmen.
   - Beleg: Überblendung zu 50 % als `$SCRATCH/E3-BILD-01/ref-ueberblendung.jpg`.
   - Werden die Grenzwerte verfehlt, als offene Frage melden. Der Orchestrator wählt dann das Zweierbild statt des Reglers.
4. **Galerie**
   - Weitere Fotos im Format 4 : 5 für „Treppe und Eingang“ (bisher zwei, z. B. IMG_2522 Eingangspodest).
   - Vorher-Bilder für „So arbeiten wir“.
   - Danach in `GALERIE` in `daten.ts` ergänzen; der Test prüft Format und Doppel.
5. **Wahlweise** `sanierung-weg-1` aus IMG_2587 mit mindestens 800 px Breite neu schneiden, ohne die blaue Montageplatte mit Herstellerzeichen.
6. schichten, gefaelle-dusche, gefaelle-balkon, formatregler, verband und karte brauchen kein Bild.

## 4. Reihenfolge, höchstens zwei Pakete gleichzeitig

0. **Orchestrator allein.**
   - E-045 entscheiden.
   - E3-ORCH-02a mit 2a bis 2g als ein Commit; danach `npm test` grün.
   - Die wörtlichen Dateien jedes Pakets als echte Dateien nach `_werkstatt/pakete/E3-GRAF-0X/vorlage/` legen, die Entwürfe von verband und karte aus dem Scratchpad mit eingeschlossen.
1. **Welle 1: GRAF-09 karte + GRAF-06 verband.** Nur Kopieren der geprüften Dateien, danach tsc, eslint und Test.
2. **Welle 2: GRAF-01 schichten + GRAF-03 gefaelle-dusche.** Wörtliche Serverkomponenten, reine Datentests.
3. **Welle 3: GRAF-04 gefaelle-balkon + GRAF-02 weg.**
4. **Welle 4: GRAF-08 galerie-filter + GRAF-05 formatregler.** Die ersten Client-Komponenten; formatregler erst nach der Zahlenentscheidung.
5. **Welle 5: GRAF-07 vorher-nachher + E3-BILD-01.** vorher-nachher nach der Sichtprüfung des formatreglers und mit Platzhalterbildern; danach E3-ORCH-02d.

Nach jeder Welle legt der Orchestrator Route und Eintrag in `package.json` an, committet und führt Stufe A am Schaufenster aus (bewegung.mjs, einzelbild). Erst danach kommen die E3-BAU-Pakete.

## 5. Zu vage oder riskant für Haiku, mit Verbesserung

1. **Wörtliche Dateien liegen als JSON-escaped Text vor.** Darin stehen `\n`, `\"` und bei gefaelle-balkon sogar `\\\"`. Verbesserung: Der Orchestrator legt sie als echte Dateien ab (Schritt 0). Haiku kopiert mit `cp` und prüft mit `diff`, tippt nie ab.
2. **Zwei Quellen bei verband und karte.** Es gibt den Scratchpad und den Text in der Vorgabe. Nur die Dateien zählen, und der Scratchpad hängt an dieser Sitzung. Darum vorher nach `_werkstatt/pakete` sichern.
3. **Bedingte Erwartungen** wie „5 grün, 1 übersprungen, danach 6“. Mit Schritt 0 gelten feste Zahlen: schichten 5, weg 4, gefaelle-dusche 6, gefaelle-balkon 5, formatregler 6, verband 7, vorher-nachher 6, galerie-filter 7, karte 7. Jeder Übersprung ist ein Fehler.
4. **Der Test für gefaelle-balkon fehlt ganz.** Fertig und gegen einen Spiegel geprüft (5 von 5): `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/abgleich/gefaelle-balkon.test.mjs`. Die Registerdatei ohne Escapes: `…/abgleich/gefaelle-balkon.json`.
5. **Test und Registerdatei von vorher-nachher sind nur beschrieben.** Fertig und geprüft (6 von 6): `…/abgleich/vorher-nachher.test.mjs` und `…/abgleich/vorher-nachher.json`.
6. **Falsch-Alarm in der Selbstprüfung von gefaelle-balkon.** `grep -nE "#[0-9a-fA-F]{3,6}|\[[0-9]"` trifft `[76, 118, 160]` in `geometrie.ts`. Ersetzen durch `grep -nE '#[0-9a-fA-F]{3,8}\b|className="[^"]*\[' src/components/momente/gefaelle-balkon/*`.
7. **Unbestimmte Anweisung bei galerie-filter.** Statt „falls jsx-key meldet …“ gleich `key={f.bild}` am Bildfeld setzen. Prüfung, dass `daten.ts` nur Typen importiert: `grep -n "^import " … | grep -v "import type"` muss leer sein.
8. **schichten:** die Korrektur auf `-16px` (Konflikt 17) auch im Kommentar zu `ZEICHNUNG.weg` in `daten.ts` nachziehen.
9. **Offene Entscheidungen vor dem Briefing klären:** Zahlen und M-06 beim formatregler, Lotfarbe und H2 bei vorher-nachher. Mit Lot `bg-tinte`, Griff `border-tinte` und `titelId` ins Briefing.
10. **Routen und `package.json` bleiben beim Orchestrator.** Haiku prüft nur statisch und startet keinen Server. „git status: nur die Paketdateien neu“ als letzter Schritt.
11. **Anker als Zeilennummern** („Zeile 771“, „Zeile 150“, „Zeile 45“) in allen Briefings durch Textanker ersetzen.
12. **karte hängt an `cities.ts`.** Ändert E3-ORCH-02b dort Entfernungen oder Koordinaten, wird Test „Karte 4“ rot. Nach 02b den Test erneut laufen lassen und die Werte neu rechnen.

Dateien dieses Abgleichs, nur im Scratchpad: `/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/abgleich/` mit `gefaelle-balkon.test.mjs`, `vorher-nachher.test.mjs`, `gefaelle-balkon.json`, `vorher-nachher.json`, dazu die Prüfskripte `bilder.mjs` und `balkon.ts`.
