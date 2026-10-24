# weg

## kennung

weg

## seite

/bad/badsanierung (Erzählseite, Abschnitt 4 „So läuft es ab“, ersetzt dort die Schritte der Vorlage)

## schlitz

momente.ablauf

## wiederverwendung

Vorher geprüft: Den Moment gibt es noch nicht. `grep` nach weg, sanierung-weg und Station in src/, test/ und _werkstatt/archiv/ findet nur die drei Bildkennungen in src/config/arbeiten.ts (Zeilen 180 bis 203). Das archivierte E2-GRAF-02 betraf Icons, nicht diesen Moment. src/components/momente/ und _werkstatt/register/ gibt es noch nicht.

Genutzt wird:
- Lage und Satz der Schritte aus src/components/vorlagen/teile/Ablauf.tsx: die Liste mit -ml-2 md:-ml-4 genau auf dem Lot der Leitachse (ACHSE_LAGE in kern/Leitachse.tsx), pl-8, Nummer in font-mono text-fs-4 text-tinte-2, h3 in font-anzeige text-fs-5 font-extrabold text-tinte, Satz in font-text text-fs-3 text-tinte-2 max-w-mass.
- src/components/kern/Fugenkreuz.tsx als Stationsmarke, zweimal übereinander (Strich = noch nicht erreicht, Tinte = gesetzt).
- src/components/kern/Textmarken.tsx für die Sätze.
- src/components/kern/Bildfeld.tsx mit `flaeche`, `sizes` und `beschriftung` für die Fotos `sanierung-weg-1…3` aus src/config/arbeiten.ts (Alt-Texte stehen schon dort).
- Typ `Foto` aus src/components/vorlagen/teile/Fotos.tsx und das Fugenraster der Fotos von dort (gap-px border-fuge bg-fuge, Kacheln bg-kalk, @xs zweispaltig). Die Anordnung ist eigen: Das erste Foto ist mobil doppelt breit, damit keine Lücke entsteht.
- Typ `AblaufInhalt['schritte']` aus src/components/vorlagen/inhalt.ts. So gibt es die Stationen nur einmal, im Seiteninhalt.
- Keyframes aus src/app/bewegung.css: `leitachse-ziehen` (scale 1 0 → 1 1) für das rote Stück und `szene-setzen` (opacity 0, scale 0,6 → 1) für die Marke. Es kommen keine neuen Keyframes dazu.
- Muster „view-timeline je Element“ und die Absicherung aus dem Block szene-ablauf (@supports, @media screen and (prefers-reduced-motion: no-preference), html.k-bewegung:not(.k-notaus)). Linienbild wie .leitachse/.leitachse-rot: Grund 1 px, Laser 2 px.
- Schlitz `momente.ablauf` in ErzaehlSeite → Ablauf (`moment ?? <Schritte/>`).

Bewusst nicht genutzt:
- SzeneAblauf: genau drei feste Planzustände.
- Verlegeplan und Zeitband: Der Weg ist keine Zeichnung.
- fugenband-CSS: Ein einziger Zeitstrahl über das ganze Band lässt sich nicht an den Stationen ausrichten.

## aufbau

DATEI src/components/momente/weg/Weg.tsx (Serverkomponente). Inhalt bitte exakt so übernehmen:

```tsx
// Großer Moment „weg“ (KERN v3.3 K-007, E3-GRAF-02) für /bad/badsanierung, Schlitz `momente.ablauf` der Erzählseite (ersetzt
// dort die Schritte): Vom Anruf bis zur letzten Fuge als Weg mit Stationen an der roten Laserlinie. Die Linie liegt auf dem
// Lot der Leitachse (Lage wie die Schritte der Vorlage: -ml-2 md:-ml-4) und führt durch die Fläche des Abschnitts, die die
// Leitachse verdeckt. Jedes Wegstück reicht von der Marke einer Station bis zur Marke der nächsten; sein rotes Stück wächst
// scrollgebunden, und die Marke der nächsten Station setzt sich, wenn die Spitze ankommt (bewegung.css, Register `weg`).
// Ohne JavaScript, bei reduzierter Bewegung, ohne animation-timeline, im Notaus und im Druck steht die Linie voll und alle
// Marken sind gesetzt. Ab 56 rem Breite des Bausteins (Container-Abfrage, wächst mit der Systemschrift) steht jede Station
// als Zeile: Nummer, Name, Satz; die Fotos bei der Station „Fliesen verlegen“ beginnen unter dem Satz, ein Drittel
// eingerückt (Drittelversatz, K-005). Die Fotos stammen aus verschiedenen Baustellen: keine Nummern, keine Pfeile,
// Unterschriften nur mit dem, was zu sehen ist (K-012). Texte kommen aus dem Seiteninhalt. Serverkomponente.
import clsx from 'clsx';
import Bildfeld from '@/components/kern/Bildfeld';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Textmarken from '@/components/kern/Textmarken';
import type { AblaufInhalt } from '@/components/vorlagen/inhalt';
import type { Foto } from '@/components/vorlagen/teile/Fotos';

/** Fotos: ab lg etwa ein Fünftel der Breite (drei in acht Spalten), Tablet ein Drittel, mobil höchstens volle Breite */
const BILD_GROESSEN = '(min-width: 1024px) 20vw, (min-width: 768px) 30vw, 100vw';

export interface WegProps {
  /** Stationen in fester Reihenfolge: Name (höchstens vier Wörter) und ein Satz mit Textmarken; fünf bis sieben */
  stationen: AblaufInhalt['schritte'];
  /** echte Fotos während der Arbeit (verschiedene Baustellen, ohne Reihenfolge); das erste steht mobil doppelt breit */
  bilder?: Foto[];
  /** Nummer der Station (ab 1), unter deren Satz die Fotos stehen */
  bilderBei?: number;
}

export default function Weg({ stationen, bilder = [], bilderBei = 5 }: WegProps) {
  return (
    <div data-motion="weg" className="@container">
      <ol className="-ml-2 md:-ml-4">
        {stationen.map((s, i) => {
          const letzte = i === stationen.length - 1;
          const mitBildern = bilder.length > 0 && i + 1 === bilderBei;
          return (
            <li key={s.titel} className={clsx('relative pl-8 @4xl:grid @4xl:grid-cols-12 @4xl:items-baseline @4xl:gap-x-12', !letzte && 'pb-12')}>
              {/* Wegstück bis zur Marke der nächsten Station: Grund in Strich, darüber das rote Stück (wächst von oben) */}
              {!letzte && (
                <span aria-hidden="true" className="weg-strecke absolute top-3 -bottom-3 left-0 w-px @4xl:top-6 @4xl:-bottom-6">
                  <span className="absolute inset-y-0 left-0 w-0 -translate-x-1/2 border-l border-strich" />
                  <span className="weg-rot absolute inset-y-0 left-0 w-0 origin-top -translate-x-1/2 border-l-2 border-laser" />
                </span>
              )}
              {/* Marke der Station auf der Linie: Fugenkreuz in Strich, darüber das gesetzte in Tinte */}
              <span aria-hidden="true" className="absolute top-3 left-0 size-3 -translate-x-1/2 -translate-y-1/2 @4xl:top-6">
                <Fugenkreuz className="absolute inset-0 size-3 text-strich" />
                <span className="weg-marke-an absolute inset-0 flex">
                  <Fugenkreuz className="size-3 text-tinte" />
                </span>
              </span>
              <p className="font-mono text-fs-4 text-tinte-2 @4xl:col-span-1">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 font-anzeige text-fs-5 font-extrabold text-tinte @4xl:col-span-3 @4xl:mt-0">{s.titel}</h3>
              <p className="mt-4 max-w-mass font-text text-fs-3 text-tinte-2 @4xl:col-span-8 @4xl:mt-0">
                <Textmarken text={s.text} />
              </p>
              {mitBildern && (
                <div className="@container mt-8 @4xl:col-span-8 @4xl:col-start-5">
                  <ul className="grid grid-cols-1 gap-px border border-fuge bg-fuge @xs:grid-cols-2 @2xl:grid-cols-3">
                    {bilder.map((b, j) => (
                      <li key={b.bild} className={clsx('bg-kalk', j === 0 && '@xs:col-span-2 @2xl:col-span-1')}>
                        <Bildfeld arbeit={b.bild} sizes={BILD_GROESSEN} beschriftung={b.unterschrift} flaeche />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
```

GEOMETRIE
- Die Liste beginnt genau auf dem Lot der Leitachse: mobil 8 px, ab md 16 px, ab lg 32 px vom Rand des Satzspiegels, bei 200 % Schrift gleich, weil alles in rem steht.
- Je Station:
  - Marke mit dem Mittelpunkt 12 px unter der Oberkante der Station (ab 56 rem Container 24 px, damit sie auf der Höhe der Großbuchstaben des Namens sitzt).
  - Wegstück von dieser Marke bis zur Marke der nächsten Station (top-3/-bottom-3, ab 56 rem top-6/-bottom-6).
  - Die Stationen stoßen ohne Außenabstand aneinander (Abstand nur über pb-12). So bilden die Stücke eine Linie ohne Lücke.
  - Die letzte Station hat kein Wegstück; die Linie endet an ihrer Marke.
- Der senkrechte Balken des Fugenkreuzes (2 px) deckt die 2-px-Laserlinie genau ab.

BREITEN
- m390: Textspalte 334 px. Fotos zweispaltig: zuerst sanierung-weg-2 über beide Spalten (334 × 418), darunter weg-1 und weg-3 je 166 px. Unter 20 rem Containerbreite (m360, 200 % Schrift) einspaltig.
- t768: Textspalte 688 px, gestapelt. Fotos dreispaltig ab 42 rem Container (je etwa 229 px).
- Ab 56 rem Breite des Bausteins (bei 100 % Schrift ab Viewport etwa 992 px, also lg): jede Station eine Zeile im 12er-Raster.
  - Nummer: Spalte 1. Name: Spalten 2 bis 4. Satz: Spalten 5 bis 12. Alle auf der ersten Grundlinie.
  - Der Fotostreifen steht in den Spalten 5 bis 12. Er ist um ein Drittel eingerückt; das ist der eine Drittelversatz dieses Bildschirms.
  - d1440: Fotos je etwa 261 px. t1024: je etwa 197 px, Name 192 px breit („Staubschutz“ passt).

200 % SCHRIFT
- Alle Container-Abfragen stehen in rem. Die Zeilenform greift deshalb erst bei 1792 px Containerbreite.
- Auf allen Handys und Tablets und auf d1440 bleibt alles gestapelt.
- Fotos einspaltig unter 640 px Container, sonst zweispaltig.
- Kein seitliches Scrollen. Das längste Wort „Staubschutz“ ist in fs-5 bei 200 % auf m390 etwa 240 px breit, die Spalte 278 px.

UMGEBUNG
- Der Baustein sitzt im Abschnitt `ablauf` der Vorlage: `flaeche="fliese"`, `leitachse` (Fugenkreuz oben auf dem Lot), `spaet`.
- Die weiße Fläche verdeckt die Leitachse. Innerhalb des Abschnitts ist die Linie des Wegs also das einzige Rot.

## texte

[
 "Alle Texte stehen wörtlich in _werkstatt/texte/bad-badsanierung.md, Abschnitt 4. Der Baustein bringt keinen eigenen Text mit; er bekommt alles über Props aus src/inhalte/bad-badsanierung.ts (E3-BAU-02).",
 "H2 (setzt die Vorlage): „So kommen Sie zu Ihrem neuen Bad.“",
 "Einleitung (setzt die Vorlage, nach der Änderung an Ablauf.tsx): „Deniz Tezgel ist Ihr fester Ansprechpartner, von der ersten Skizze bis zum Schluss.“",
 "Station 1: „Anruf und Rückruf“ · „Sie rufen an oder schicken uns Ihre Anfrage. Deniz Tezgel ruft Sie zurück.“",
 "Station 2: „Termin bei Ihnen“ · „Deniz Tezgel kommt zu Ihnen, sieht sich Ihr Bad genau an, und dieser Termin ist kostenfrei.“",
 "Station 3: „Planen und auswählen“ · „Gemeinsam wählen Sie Fliesen und Dusche aus, danach bekommen Sie ein Festpreisangebot, also ein Angebot mit festem Preis.“",
 "Station 4: „Ausbau mit Staubschutz“ · „Wenn Sie während des Umbaus zu Hause wohnen, schützen wir Ihre Räume mit Staubschutzwänden und Luftreinigern.“",
 "Station 5: „Fliesen verlegen“ · „Wir verlegen den neuen Boden und die Wände, bis die letzte Fuge fertig ist.“ Darunter die drei Fotos.",
 "Station 6: „Übergabe an Sie“ · „Zum Schluss ist der Raum gefegt und sauber, und wir gehen alles gemeinsam mit Ihnen durch.“",
 "Foto 1 im Baustein, sanierung-weg-2, Unterschrift: „Bad während der Arbeit: offene Decke und dunkle Holzoptik am Boden.“ (Alt-Text aus arbeiten.ts: „Bad während der Arbeit: offene Decke, dunkle Holzoptik am Boden und eine Badewanne“)",
 "Foto 2, sanierung-weg-1, Unterschrift: „Bad während der Arbeit: beige Wandfliesen bis halbhoch.“ (Alt-Text aus arbeiten.ts)",
 "Foto 3, sanierung-weg-3, Unterschrift: „Bad während der Arbeit: brauner Boden im Duschbereich, Decke im Ausbau.“ (Alt-Text aus arbeiten.ts)",
 "Reihenfolge der Fotos: Der Text sagt „ohne feste Reihenfolge“. weg-2 steht zuerst, weil nur das erste Foto mobil doppelt breit ist. weg-1 hat nur 480 px Quelle und darf nie in den breiten Platz.",
 "Nummern 01 bis 06 erzeugt der Baustein in Mono. Es gibt keine weiteren Etiketten und keine Fachwortmarken; die Stationstexte enthalten keine.",
 "NEU, nur im Dev-Schaufenster (nicht auf der Seite): Etikett „Schaufenster · nur Entwicklung“ und H1 „Großer Moment „weg““."
]

## bewegung

AUSLÖSER
Scroll über CSS animation-timeline. Es gibt keinen Beobachter und kein JavaScript. Register: `weg: { ausloeser: 'scroll' }`.

ROTES STÜCK `.weg-rot` (je Wegstück, fünf Stück)
- Keyframes `leitachse-ziehen` (vorhanden): scale 1 0 → 1 1, transform-origin oben (Klasse `origin-top`).
- Zeitstrahl `--weg-strecke`: view-timeline block am Elternelement `.weg-strecke`, also am Wegstück selbst. Das rote Stück liest nur den Zeitstrahl seines eigenen Elternelements. view-timeline nie an li oder ol hängen: Geschwister sehen den Namen nicht.
- Bereich `cover 40vh cover calc(100% - 60vh)`. Das Stück wächst linear, während es die Höhe 60 % des Bildschirms (von oben) kreuzt.
- Weil die Stücke von Marke zu Marke aneinanderstoßen, steht die Spitze immer auf derselben Höhe. Die Linie zieht ohne Lücke und ohne Sprung von Station zu Station, bei jeder Stationshöhe, auch bei 200 % Schrift.

MARKE `.weg-marke-an` (sechs Stück)
- Keyframes `szene-setzen` (vorhanden): opacity 0, scale 0,6 → opacity 1, scale 1. Kein Überschwingen.
- Zeitstrahl `view()`: die Marke selbst.
- Bereich `cover 40vh cover 44vh`. Die Marke setzt sich auf 4vh Scrollweg (etwa 30 bis 36 px), sobald die Spitze sie erreicht. Darunter bleibt das Fugenkreuz in Strich immer sichtbar.

DAUER UND KURVE
Linear an Scroll (K-005 ease-linear, wie szene-ablauf). Keine Zeitdauer. Animiert werden nur scale und opacity. Texte und Fotos bewegen sich nie und werden nie abgedunkelt.

STARTZUSTAND
Nur über die Füllung der Animation (fill both), und nur wenn alles gleichzeitig gilt:
- @supports (animation-timeline: view()) and (animation-range-end: cover calc(100% - 60vh))
- @media screen and (prefers-reduced-motion: no-preference)
- html.k-bewegung:not(.k-notaus)

ERSATZPFAD = ENDZUSTAND
Linie voll, alle Marken in Tinte. Das gilt ohne JavaScript, ohne Unterstützung für Zeitstrahlen oder für Längen im Bereich, bei reduzierter Bewegung, nach dem Notaus, im Druck und bei erzwungenen Farben (Regel `animation: none !important`). Zurück und Vor brauchen nichts Eigenes, weil der Zustand allein aus der Scrollstellung folgt.

data-motion="weg" steht nur an der Wurzel (div), wie bei szene-ablauf und leitachse. bewegung.mjs ordnet Animationen über closest('[data-motion]') zu. An den Marken selbst würde die Sichtbarkeitsprüfung noch nicht erreichte Marken mit Deckkraft 0 melden.

REGISTERDATEI _werkstatt/register/weg.json, Inhalt exakt:
```json
{
  "kennung": "weg",
  "paket": "E3-GRAF-02",
  "kern": "v3.3",
  "zweck": "Orientierung: Vom Anruf bis zur letzten Fuge",
  "ausloeser": "scroll",
  "register_ts": { "ausloeser": "scroll" },
  "technik": "CSS animation-timeline: je Wegstück (.weg-strecke) eine view-timeline --weg-strecke für sein rotes Stück; die Marke über view() des Elements selbst",
  "dauer_kurve": "linear an Scroll; rotes Stück cover 40vh bis cover calc(100% - 60vh) (Spitze auf 60 % der Bildschirmhöhe, Stücke stoßen aneinander); Marke cover 40vh bis cover 44vh",
  "keyframes": ["leitachse-ziehen", "szene-setzen"],
  "eigenschaften": ["scale", "opacity"],
  "elemente": { "data-motion": "Wurzel des Bausteins (div)", "animiert": [".weg-rot", ".weg-marke-an"] },
  "startzustand": "nur unter html.k-bewegung:not(.k-notaus), @supports (animation-timeline: view()) and (animation-range-end: cover calc(100% - 60vh)), @media screen and (prefers-reduced-motion: no-preference)",
  "reduziert": "Linie voll, alle Stationen gesetzt (kein Startzustand, keine Animation)",
  "ersatzpfad": "ohne JavaScript, ohne animation-timeline, Notaus, Druck, erzwungene Farben: Endzustand wie reduziert",
  "wo": ["/bad/badsanierung"],
  "schlitz": "momente.ablauf",
  "baustein": "src/components/momente/weg/Weg.tsx",
  "budget": { "client_js_kb": 0, "css_kb_gzip": 0.4, "svg": "keine neue Zeichnung (Fugenkreuz)" }
}
```

## reduziert

Bei prefers-reduced-motion: reduce setzt das Kopfskript kein html.k-bewegung, und die @media-Bedingung greift nicht. Es gibt deshalb weder Startzustand noch Animation (Sofortzustand nach K-007), und es ist keine Überblendung nötig.

Zu sehen ist der Endzustand wie im Register:
- Linie voll: alle fünf roten Stücke ganz, 2 px Laser über dem Grund in Strich.
- Alle sechs Stationen gesetzt: Fugenkreuz in Tinte.
- Texte und Fotos unverändert.

Die Leitachse bleibt dabei grau (globals.css). Im Abschnitt steht so genau ein Rot. Derselbe Zustand gilt ohne JavaScript, nach dem Notaus (2 s), im Druck, bei erzwungenen Farben und in Browsern ohne Zeitstrahlen oder ohne Längen im Bereich (Firefox ohne Schalter).

## zugang

Rolle und Name: Die Stationen sind eine geordnete Liste (`ol`/`li`) unter der H2 des Abschnitts. Jede Station hat eine h3 (Name). Die Nummer 01 bis 06 steht als sichtbarer Text davor, der Satz als Absatz. Die Reihenfolge ergibt sich aus Liste und Nummern, nicht aus Farbe oder Bewegung (K-005 „Bedeutung nie nur über Farbe“).

Linie und Marken sind reine Zier: `aria-hidden="true"` an Wegstück und Marke; Fugenkreuz ist selbst aria-hidden und focusable=false.

Fotos: `ul` mit je einem `figure` aus Bildfeld (Alt-Text aus arbeiten.ts, figcaption mit der Unterschrift). Feste Maße, also keine Layoutverschiebung; Laden verzögert.

Tastatur und Fokus: Der Baustein hat keine bedienbaren Elemente, die Tabfolge der Seite bleibt unverändert. Die Stationstexte haben keine Fachwortmarken.

Screenreader: Gelesen werden „Liste, 6 Einträge“, je Eintrag „01, Überschrift Ebene 3 Anruf und Rückruf, Satz“, bei Station 5 die drei Bilder mit Alt-Text und Unterschrift. Bekannte Grenze: Wie bei den Schritten der Vorlage kann Safari einer Liste ohne Aufzählungszeichen die Listenrolle nehmen. Die Nummern bleiben als Text, die Folge bleibt klar. role="list" ist bewusst weggelassen, weil jsx-a11y es als überflüssig meldet.

Kontrast:
- Text Tinte bzw. Tinte-2 auf Fliese (9 : 1).
- Laser auf Fliese 4,6 : 1 und Grund in Strich etwa 3,7 : 1, also für Grafik ≥ 3 : 1.

forced-colors: Linie und Grund sind Ränder, nicht Hintergründe; sie bleiben in CanvasText sichtbar. Die Fugenkreuze nutzen currentColor (CanvasText). Animationen sind aus (`animation: none !important`), die Linie steht voll.

200 % Systemschrift: Container-Abfragen in rem halten alles gestapelt, Fotos einspaltig unter 20 rem Containerbreite, kein seitliches Scrollen. Bewegung: nur scale und opacity, keine Schleifen, nichts, das Inhalt verdeckt.

## budget

Client-Komponente: nein. Der Moment ist rein CSS-gesteuert über Scroll-Zeitstrahlen, ohne Zustand und ohne Zeitgeber, daher 0 KB zusätzliches JavaScript.

| Teil | Größe |
|---|---|
| Weg.tsx (Quelle) | etwa 3,5 KB |
| CSS in bewegung.css | etwa 1,1 KB roh, etwa 0,4 KB gzip (Keyframes leitachse-ziehen und szene-setzen wiederverwendet) |
| SVG | keine neue Zeichnung; 12 Fugenkreuze inline (je etwa 150 B HTML, zusammen etwa 1,8 KB HTML) |
| Fotos | vorhandene Webfassungen (Quellen 16 KB, 73 KB, 42 KB), verzögert geladen, AVIF/WebP über next/image, sizes '(min-width: 1024px) 20vw, (min-width: 768px) 30vw, 100vw' |

Der erste Bildschirm ist nicht betroffen: Der Abschnitt liegt darunter und zeichnet spät (`spaet`). Ein Layoutsprung entfällt, weil die Bildmaße fest sind. Gemessen am Gesamtbudget für Bewegung (≤ 60 KB gzip, K-013) bleibt der Beitrag unter 1 KB.

## dateien

[
 "src/components/momente/weg/Weg.tsx",
 "_werkstatt/register/weg.json",
 "test/weg.test.mjs"
]

## gemeinsam

[
 "1. src/app/bewegung.css – direkt nach der Zeile `@keyframes szene-setzen { from { opacity: 0; scale: 0.6; } to { opacity: 1; scale: 1; } }` (Ende des Blocks szene-ablauf) genau diesen Block einfügen:\n/* weg (großer Moment /bad/badsanierung, K-007, E3-GRAF-02) – Vom Anruf bis zur letzten Fuge: Die Laserlinie zieht\n   scrollgebunden von Station zu Station. Jedes Wegstück (.weg-strecke, von einer Marke zur nächsten) ist sein eigener\n   Zeitstrahl; sein rotes Stück wächst linear, während das Stück die Höhe 60 % des Bildschirms (von oben) kreuzt. Die\n   Stücke stoßen aneinander, so steht die Spitze immer auf derselben Höhe und die Linie hat keine Lücke; die Marke der\n   nächsten Station setzt sich auf 4vh Scrollweg, sobald die Spitze sie erreicht (Zeitstrahl der Marke selbst). Nur scale\n   und opacity, Keyframes leitachse-ziehen und szene-setzen. Ersatzpfad (ohne animation-timeline oder ohne Längen im\n   Bereich, reduziert, ohne JavaScript, Notaus, Druck, erzwungene Farben) = Endzustand: Linie voll, alle Stationen gesetzt. */\n@supports (animation-timeline: view()) and (animation-range-end: cover calc(100% - 60vh)) {\n  @media screen and (prefers-reduced-motion: no-preference) {\n    [data-motion=\"weg\"] .weg-strecke {\n      view-timeline: --weg-strecke block;\n    }\n    html.k-bewegung:not(.k-notaus) [data-motion=\"weg\"] .weg-rot {\n      animation: leitachse-ziehen linear both;\n      animation-timeline: --weg-strecke;\n      animation-range: cover 40vh cover calc(100% - 60vh);\n    }\n    html.k-bewegung:not(.k-notaus) [data-motion=\"weg\"] .weg-marke-an {\n      animation: szene-setzen linear both;\n      animation-timeline: view();\n      animation-range: cover 40vh cover 44vh;\n    }\n  }\n}\n@media print, (forced-colors: active) {\n  [data-motion=\"weg\"] .weg-rot,\n  [data-motion=\"weg\"] .weg-marke-an {\n    animation: none !important;\n  }\n}\n(Der Kommentar enthält bewusst keine geschweiften Klammern und keinen Selektor mit data-motion, sonst greift die Regelzählung in test/weg.test.mjs nicht. Zusätzlich über `@keyframes szene-setzen` den Kommentar `/* auch weg: Marke setzt sich */` ergänzen.)",
 "2. src/lib/motion/register.ts – in REGISTER direkt nach `fugenband: { ausloeser: 'scroll' },` einfügen:\n  // große Momente (K-007, E3-ORCH-02a): scroll-gebunden über CSS, kein Beobachter\n  weg: { ausloeser: 'scroll' },",
 "3. _werkstatt/register.json – \"weg\" in die Arrays \"kennungen\" und \"v3\" (nach \"fugenband\") aufnehmen; in \"hinweis\" aus der Liste der später kommenden Momente „weg, “ streichen.",
 "4. test/bewegung.test.mjs – nach `const V2_SVG_E037 = [...]` die Zeile `const GROSSE_MOMENTE = ['weg'];` einfügen; in Test „Bewegung 1“ beide Listen erweitern: `[...KERN_V3, ...V2_SVG_E037, ...GROSSE_MOMENTE, ...ENTFALLEN_E009]` und `for (const k of [...KERN_V3, ...V2_SVG_E037, ...GROSSE_MOMENTE])`. Ohne diese Änderung schlägt Bewegung 1 fehl, sobald weg registriert ist.",
 "5. package.json – im Skript \"test\" am Ende ` test/weg.test.mjs` anhängen.",
 "6. src/components/vorlagen/inhalt.ts – in `AblaufInhalt` nach `titel: string;` einfügen:\n  /** Satz unter der Überschrift (z. B. der feste Ansprechpartner), vor den Schritten oder dem großen Moment */\n  einleitung?: Markentext;",
 "7. src/components/vorlagen/teile/Ablauf.tsx – dem `<Abschnitt id=\"ablauf\" …>` die Prop `einleitung={inhalt.einleitung ? <p><Textmarken text={inhalt.einleitung} /></p> : undefined}` geben (Textmarken ist dort schon importiert). Ohne diese Änderung hat der Satz „Deniz Tezgel ist Ihr fester Ansprechpartner …“ keinen Platz.",
 "8. Neue Route (nur Entwicklung, vom Orchestrator anlegen oder dem Paket ausdrücklich erlauben; von werte.mjs ausgenommen): src/app/(bestand)/werkstatt-schaufenster/weg/page.dev.tsx mit genau diesem Inhalt:\n// Dev-Schaufenster (nur next dev, pageExtensions „dev.tsx“): großer Moment „weg“ (E3-GRAF-02) im Abschnitt „So läuft es ab“\n// wie auf /bad/badsanierung, Texte wörtlich aus _werkstatt/texte/bad-badsanierung.md. Davor und danach je eine leere\n// Bildschirmhöhe, damit die Linie beim Scrollen von unten kommt und ganz durchläuft.\nimport Einstieg from '@/components/kern/Einstieg';\nimport Abschnitt from '@/components/kern/Abschnitt';\nimport Leitachse from '@/components/kern/Leitachse';\nimport Weg from '@/components/momente/weg/Weg';\nimport type { Foto } from '@/components/vorlagen/teile/Fotos';\n\nexport const metadata = { title: 'Schaufenster · Weg', robots: { index: false, follow: false } };\n\nconst STATIONEN = [\n  { titel: 'Anruf und Rückruf', text: 'Sie rufen an oder schicken uns Ihre Anfrage. Deniz Tezgel ruft Sie zurück.' },\n  { titel: 'Termin bei Ihnen', text: 'Deniz Tezgel kommt zu Ihnen, sieht sich Ihr Bad genau an, und dieser Termin ist kostenfrei.' },\n  { titel: 'Planen und auswählen', text: 'Gemeinsam wählen Sie Fliesen und Dusche aus, danach bekommen Sie ein Festpreisangebot, also ein Angebot mit festem Preis.' },\n  { titel: 'Ausbau mit Staubschutz', text: 'Wenn Sie während des Umbaus zu Hause wohnen, schützen wir Ihre Räume mit Staubschutzwänden und Luftreinigern.' },\n  { titel: 'Fliesen verlegen', text: 'Wir verlegen den neuen Boden und die Wände, bis die letzte Fuge fertig ist.' },\n  { titel: 'Übergabe an Sie', text: 'Zum Schluss ist der Raum gefegt und sauber, und wir gehen alles gemeinsam mit Ihnen durch.' },\n];\n\nconst BILDER: Foto[] = [\n  { bild: 'sanierung-weg-2', unterschrift: 'Bad während der Arbeit: offene Decke und dunkle Holzoptik am Boden.' },\n  { bild: 'sanierung-weg-1', unterschrift: 'Bad während der Arbeit: beige Wandfliesen bis halbhoch.' },\n  { bild: 'sanierung-weg-3', unterschrift: 'Bad während der Arbeit: brauner Boden im Duschbereich, Decke im Ausbau.' },\n];\n\nexport default function SchaufensterWeg() {\n  return (\n    <>\n      <Einstieg art=\"arbeit\" etikett=\"Schaufenster · nur Entwicklung\" titel=\"Großer Moment „weg“\" />\n      <Leitachse>\n        <div aria-hidden=\"true\" className=\"min-h-dvh\" />\n        <Abschnitt id=\"ablauf\" formel=\"ablauf\" leitachse spaet flaeche=\"fliese\" titel=\"So kommen Sie zu Ihrem neuen Bad.\" einleitung={<p>Deniz Tezgel ist Ihr fester Ansprechpartner, von der ersten Skizze bis zum Schluss.</p>} className=\"lg:pb-32\">\n          <Weg stationen={STATIONEN} bilder={BILDER} />\n        </Abschnitt>\n        <div aria-hidden=\"true\" className=\"min-h-dvh\" />\n      </Leitachse>\n    </>\n  );\n}",
 "9. Briefing _werkstatt/pakete/E3-BAU-02.md, Abschnitt 5 „Seitenbesonderheiten: keine“ ersetzen durch: (a) In src/inhalte/bad-badsanierung.ts `ablauf: { titel: 'So kommen Sie zu Ihrem neuen Bad.', einleitung: 'Deniz Tezgel ist Ihr fester Ansprechpartner, von der ersten Skizze bis zum Schluss.', schritte: [die sechs Stationen wörtlich als { titel, text }] }`. (b) Zusätzlich `export const WEG_BILDER: Foto[]` (Typ aus '@/components/vorlagen/teile/Fotos') in der Reihenfolge sanierung-weg-2, sanierung-weg-1, sanierung-weg-3 mit den Unterschriften wörtlich. (c) In page.jsx `import Weg from '@/components/momente/weg/Weg'` und `<ErzaehlSeite inhalt={BADSANIERUNG} momente={{ ablauf: <Weg stationen={BADSANIERUNG.ablauf.schritte} bilder={WEG_BILDER} /> }} … />`. Ohne den Moment würden die sechs Schritte in die Dreier-Treppe der Vorlage fallen, die nur für zwei bis vier Schritte gebaut ist. (d) Abhängigkeit E3-GRAF-02 sowie die Punkte 6 und 7 vor E3-BAU-02.",
 "10. Wahlweise _werkstatt/KERN.md K-007, Zeile `weg`, Spalte „Dauer · Kurve“ genauer fassen: „linear an Scroll, je Wegstück ein Zeitstrahl, Spitze bei 60 % der Bildschirmhöhe; Marke setzt sich auf 4vh (szene-setzen)“."
]

## bildbedarf

[
 "Kein neues Bild nötig: sanierung-weg-1, -2 und -3 sind als Webfassungen in src/config/arbeiten.ts eingetragen und liegen unter public/images/arbeiten/bad/.",
 "Wahlweise (E3-BILD-01): sanierung-weg-1 aus IMG_2587 (Original 1080 × 1350) mit mindestens 800 px Breite neu schneiden, falls der Zuschnitt ohne die blaue Montageplatte mit Herstellerzeichen das hergibt. Heute ist die Datei 480 × 600 und wird bei einspaltiger Anordnung (m360, 200 % Schrift) leicht weich. Darum steht sie im Baustein nie im breiten Platz."
]

## pruefung

A. STATISCH (Haiku, im Paket)
1. `npx tsc --noEmit -p .`: keine Fehler in Weg.tsx.
2. `npx eslint src/components/momente/weg/Weg.tsx test/weg.test.mjs`: 0 Fehler.
3. `node _werkstatt/werkzeuge/werte.mjs --dateien src/components/momente/weg/Weg.tsx --ziel $SCRATCH/E3-GRAF-02/werte`: 0 Befunde. Erlaubte Stufen: top-3, -bottom-3, top-6, -bottom-6, pl-8, pb-12, mt-2/4/8, w-px, w-0, size-3, Farben strich/laser/tinte/tinte-2/fuge/kalk.
4. `node --experimental-strip-types --loader ./test/resolver.mjs --test test/weg.test.mjs test/bewegung.test.mjs`. Vor der Übernahme durch den Orchestrator sind Weg 3 und Weg 4 übersprungen, alle übrigen grün.

DATEI test/weg.test.mjs, Inhalt exakt:
```js
// Großer Moment „weg“ (E3-GRAF-02, KERN v3.3 K-007): Registerdatei, Baustein und – sobald der Orchestrator sie übernommen
// hat – die Regeln in bewegung.css und der Eintrag in register.ts. Liest nur Dateien, rendert nichts.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { REGISTER, beobachteteKennungen, ladeKennungen } from '../src/lib/motion/register.ts';

const lies = (pfad) => readFileSync(new URL(`../${pfad}`, import.meta.url), 'utf8');

test('Weg 1: Registereintrag als Datei', () => {
  const e = JSON.parse(lies('_werkstatt/register/weg.json'));
  assert.equal(e.kennung, 'weg');
  assert.equal(e.ausloeser, 'scroll');
  assert.deepEqual(e.register_ts, { ausloeser: 'scroll' });
  assert.deepEqual(e.wo, ['/bad/badsanierung']);
  assert.equal(e.schlitz, 'momente.ablauf');
  assert.deepEqual([...e.keyframes].sort(), ['leitachse-ziehen', 'szene-setzen']);
  assert.deepEqual([...e.eigenschaften].sort(), ['opacity', 'scale']);
  assert.match(e.reduziert, /Linie voll/);
});

test('Weg 2: Baustein ohne Client, ohne feste Werte, data-motion nur an der Wurzel', () => {
  const q = lies('src/components/momente/weg/Weg.tsx');
  assert.equal(q.match(/data-motion="weg"/g)?.length, 1);
  assert.ok(!/['"]use client['"]/.test(q), 'Serverkomponente');
  assert.ok(!/#[0-9a-fA-F]{3,8}\b/.test(q), 'keine Hex-Werte');
  assert.ok(!/-\[[^\]]+\]/.test(q) && !/\[&/.test(q), 'keine Beliebigwerte in Klassen');
  assert.ok(!/style=\{/.test(q), 'kein Inline-Stil');
  for (const k of ['weg-strecke', 'weg-rot', 'weg-marke-an', 'border-laser', 'origin-top', 'aria-hidden="true"']) assert.ok(q.includes(k), k);
});

test('Weg 3: Regeln in bewegung.css', (t) => {
  const css = lies('src/app/bewegung.css');
  if (!css.includes('[data-motion="weg"]')) { t.skip('bewegung.css trägt weg noch nicht (Orchestrator)'); return; }
  assert.ok(css.includes('@supports (animation-timeline: view()) and (animation-range-end: cover calc(100% - 60vh))'));
  const regeln = [...css.matchAll(/([^{}]*\[data-motion="weg"\][^{}]*)\{([^{}]*)\}/g)];
  assert.equal(regeln.length, 4);
  for (const [, sel, rumpf] of regeln) {
    const eigen = rumpf.split(';').map((d) => d.split(':')[0].trim()).filter(Boolean);
    for (const p of eigen) assert.ok(['animation', 'animation-timeline', 'animation-range', 'view-timeline'].includes(p), `${sel.trim()}: ${p}`);
    if (/animation:\s*(leitachse-ziehen|szene-setzen)/.test(rumpf)) assert.match(sel.trim(), /^html\.k-bewegung:not\(\.k-notaus\) \[data-motion="weg"\] \.weg-(rot|marke-an)$/);
  }
  assert.match(css, /\[data-motion="weg"\] \.weg-rot,\s*\[data-motion="weg"\] \.weg-marke-an\s*\{\s*animation: none !important;\s*\}/);
  for (const name of ['leitachse-ziehen', 'szene-setzen']) {
    const kf = css.match(new RegExp(`@keyframes ${name}\\s*\\{((?:[^{}]*\\{[^{}]*\\})+)\\s*\\}`));
    assert.ok(kf, `@keyframes ${name}`);
    const eigen = [...kf[1].matchAll(/\{([^{}]*)\}/g)].flatMap((m) => m[1].split(';').map((d) => d.split(':')[0].trim()).filter(Boolean));
    for (const p of eigen) assert.ok(['scale', 'opacity'].includes(p), `${name}: ${p}`);
  }
});

test('Weg 4: Registereintrag in register.ts und register.json', (t) => {
  if (!REGISTER.weg) { t.skip('register.ts trägt weg noch nicht (Orchestrator)'); return; }
  assert.deepEqual(REGISTER.weg, { ausloeser: 'scroll' });
  assert.ok(!ladeKennungen().includes('weg'));
  assert.ok(!beobachteteKennungen(true).includes('weg') && !beobachteteKennungen(false).includes('weg'));
  assert.ok(JSON.parse(lies('_werkstatt/register.json')).kennungen.includes('weg'));
});
```

B. IM BROWSER (nach den gemeinsamen Punkten 1 bis 5 und 8; Server 4320 nur nutzen; Umgebung PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers)
1. `node _werkstatt/werkzeuge/bewegung.mjs --modus einzelbilder --seite /werkstatt-schaufenster/weg --kennung weg --ansicht m390`, danach dasselbe mit `--ansicht d1440`. Erwartet auf den Bildern bei 10, 30, 50, 70 und 90 %:
   - Die rote Spitze steht immer etwa auf 60 % der Bildschirmhöhe.
   - Die Linie hat keine Lücke zwischen den Stationen.
   - Erreichte Marken sind in Tinte, kommende in Strich.
   - Texte und Fotos sind immer voll sichtbar. Ab d1440 stehen die Stationen als Zeilen, und der Fotostreifen beginnt unter dem Satz (Spalte 5).
2. `--modus reduziert --seite /werkstatt-schaufenster/weg`: 0 Animationen, Linie voll, alle Marken in Tinte, keine unsichtbaren data-motion-Elemente.
3. `--modus register`: weg ist bekannt, keine Animation ohne data-motion.
4. `--modus bildrate --ansicht m390`: keine langen Bilder durch den Moment.
5. `node _werkstatt/werkzeuge/einzelbild.mjs --base http://127.0.0.1:4320 --seite /werkstatt-schaufenster/weg --ansichten m360,m390,t768,d1440 --voll`, dazu `--ansichten m390 --schrift 200 --voll` und `--ansichten m390 --bewegung reduce --voll`. Erwartet:
   - Überlauf 0, Überlappung 0, Konsole 0.
   - Bei 200 %: gestapelt, Fotos einspaltig, „Staubschutz“ ohne Überlauf.
   - Reduziert: Linie ganz rot.
6. Ohne JavaScript (Playwright-Kontext javaScriptEnabled: false, nur lesend) und mit forcedColors 'active': Linie voll, alle Texte da.
7. Tastatur: Tab durchläuft die Seite, kein Fokus im Moment.

C. Nach E3-BAU-02 dieselben Läufe auf /bad/badsanierung, dazu `lesbarkeit.mjs` GRÜN.

## risiken

[
 "Längen und calc() im Bereich (cover 40vh, cover calc(100% - 60vh)) brauchen Unterstützung im Browser. Darum steht diese Bedingung im @supports. Fehlt sie, gilt der Endzustand (Linie voll); ein halb richtiges Zeichnen gibt es nicht.",
 "Gültigkeit des Zeitstrahls: view-timeline muss am Wegstück `.weg-strecke` stehen, das rote Stück ist sein Kind. Hängt es an li oder ol, finden Geschwister den Namen nicht, und das rote Stück bleibt leer. Die Marke nutzt bewusst view() an sich selbst.",
 "content-visibility (Abschnitt `spaet`): Solange der Abschnitt übersprungen wird, sind die Zeitstrahlen nicht aktiv. In den Einzelbildern prüfen, dass die Linie beim Eintritt nicht kurz voll oder leer aufblitzt. Falls doch, darf der Orchestrator `spaet` nur für diesen Abschnitt weglassen; das ist eine Vorlagenfrage.",
 "Deutung der Fotos: Alle drei stehen bei Station 5 „Fliesen verlegen“, weil alle drei verlegte Wand- und Bodenfliesen bei offener Decke zeigen (Sichtprüfung). Bei „Ausbau mit Staubschutz“ wäre das unehrlich, weil kein Staubschutz zu sehen ist. Es gibt keine Nummern und keine Pfeile, und die Unterschriften verbinden die Fotos nicht. weg-1 und weg-2 haben beide Holzoptik am Boden, laut bildinventar ist aber kein Paar belegt; die Unterschriften behaupten keines.",
 "data-motion=\"weg\" steht nur an der Wurzel und nicht an jedem animierten Kind. Das folgt der Praxis von szene-ablauf und leitachse; bewegung.mjs ordnet über closest('[data-motion]') zu. An den Marken würde die Sichtbarkeitsprüfung noch nicht erreichte Marken (Deckkraft 0) melden.",
 "Ein Rot je Bildschirm: Am Übergang vom Abschnitt „Was wir tun“ (Kalk, rote Spitze der Leitachse) zur weißen Fläche des Ablaufs können zwei rote Stücke im Bild stehen. Beide liegen auf demselben Lot und lesen sich als eine Linie. Die Schritte der Vorlage machen es mobil genauso.",
 "Linienstärke: Der Weg ist die Laserlinie der Seite, keine Vignette. Darum gilt K-008 mit 2 px Laser und 1 px Grund in Strich (wie Leitachse und Schritte) statt 1,5 px wie in den Plan-Zeichnungen. Der Grund steht in Strich statt Fuge, damit der Weg auf Weiß vor dem Zeichnen lesbar ist.",
 "Reihenfolge der Pakete: Ohne die gemeinsamen Punkte 6 und 7 (einleitung in Inhalt und Ablauf) hat der Einleitungssatz keinen Platz. Ohne Punkt 9 baut E3-BAU-02 die Seite nach „Seitenbesonderheiten: keine“, und die sechs Stationen fallen in die Treppe der Vorlage, die für zwei bis vier Schritte gebaut ist.",
 "Mobile Adressleiste: vh im Bereich bezieht sich auf den großen Viewport. Die Höhe der Spitze verschiebt sich beim Ein- und Ausfahren der Leiste um einige Pixel; das ist harmlos.",
 "Safari kann einer Liste ohne Aufzählungszeichen die Listenrolle nehmen. Die Nummern 01 bis 06 bleiben als Text lesbar (wie bei den Schritten).",
 "Bei t1024 ist die Namensspalte (drei Rasterspalten) nur 192 px breit. „Staubschutz“ passt bei 100 % knapp; bei 200 % greift die Zeilenform wegen der rem-Container-Abfrage nicht. In den Einzelbildern auf t1024 und d1280 bestätigen."
]

