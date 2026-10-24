# schichten

## kennung

schichten

## seite

/bad

## schlitz

momente.tun

## wiederverwendung

Vorhandenes geprüft (grep nach schichten, Schichtaufbau, Schicht in src/, _werkstatt/archiv, PLAN, ENTSCHEIDUNGEN, git log). Ergebnis: Den Moment gibt es noch nicht. src/components/momente/ fehlt ganz, _werkstatt/register/ fehlt, register.ts und register.json kennen schichten nicht. Es gab eine Vorstufe: die Zeichnung kern/Schichtaufbau.tsx aus 76501a6 (E2-ORCH-08g), mit 00a0c30 (E2-ORCH-09, E-037) entfernt (`git show 76501a6:src/components/kern/Schichtaufbau.tsx`). Übernommen werden daraus die Reihenfolge und das Bild der Schichten (Fliese mit Fuge, Kleber als Zahnung des Kammspachtels, Abdichtung als Band, Untergrund schraffiert). Bewusst NICHT übernommen: (a) die Abdichtung in Laser-Rot, weil das eine Rot je Bildschirm die Leitachse trägt (Präzedenz SzeneAblauf.tsx: „ohne Laserachse: das eine Rot je Bildschirm trägt die Leitachse“). (b) Mono-Text im SVG mit pattern-ID: die Vignetten-Regel verbietet Text und IDs, Text im SVG wächst nicht mit 200 % Systemschrift, die Beschriftung steht deshalb als HTML-Liste mit Legende.
Wird wiederverwendet:
1. src/components/kern/vignetten/zeichnen.tsx: Planrahmen (viewBox, aria-hidden, focusable=false, fill none, stroke currentColor 1,5, square/miter), Linie (non-scaling-stroke), schraffur(x,y,b,h,abstand). Nur importieren, nicht ändern.
2. Zeichensprache von src/components/kern/vignetten/Untergrund.tsx: Kanten in Tinte über `color`, Schraffur in Strich über eine Gruppe `text-strich`, keine IDs, kein Text.
3. Muster der Scroll-Szene szene-ablauf in src/app/bewegung.css (Zeilen 735 bis 771) und SzeneAblauf.tsx: view-timeline je Element, `@supports (animation-timeline: view())` + `@media screen and (prefers-reduced-motion: no-preference)` + `html.k-bewegung:not(.k-notaus)`, `animation: … linear both` vor `animation-timeline`, Bereich `cover 15% cover 45%`, gestaffelte Bereiche über nth-child mit höherer Spezifität, transform-box fill-box für scale in SVG. Neu dazu kommt timeline-scope, damit die Sätze der Liste die Zeichnung steuern.
4. Muster aus vorlagen/teile/Tun.tsx (Bereichszeilen): `@container` an der Liste, Bildzeichen `hidden … @xs:block` (fällt bei großer Schrift unter 20rem weg). Fläche an der Fuge wie Punktfliesen und Bereichsfliesen (`border border-fuge bg-fliese`).
5. Klebende Spalte wie EinstiegPlanblatt und Rueckfrage (`lg:top-24` = 96 px ab lg). Mobil bündig unter dem Kopf (h-16 = 64 px, Header.jsx). body, main und footer haben overflow-x: clip, das bildet keinen Scroll-Container, sticky funktioniert also.
6. Schlitz: ErzaehlSeite `momente.tun` → Tun setzt den Moment in `<div className="mt-16">` nach Punkten und Absatz. An der Vorlage ändert sich nichts.
7. Globale Druck- und forced-colors-Regel in bewegung.css (`html.k-bewegung [data-motion] { opacity:1; translate:none; scale:none !important }`) deckt die bewegten SVG-Teile mit ab.

## aufbau

Drei Quelldateien unter src/components/momente/schichten/, alles Serverkomponenten (kein 'use client', kein style-Attribut, keine Hex-Werte, keine Beliebigwerte, keine IDs, kein Text im SVG, kein Rot).

DOM:
figure.schichten[data-motion=schichten]
  figcaption (Unterschrift)
  div Feld (border border-fuge bg-fliese, ab lg grid 2 Spalten)
    div.schichten-buehne (Zeichnung, mobil oben mit border-b, ab lg links; klebt nur über bewegung.css)
      div mx-auto max-w-md > svg (Planrahmen 0 0 240 104)
        g text-strich > Schraffur Untergrund | Kante Untergrund (Tinte, ohne Bewegung)
        g.schichten-abdichtung[data-motion] text-tinte-2 > Band (fill currentColor)
        g.schichten-kleber[data-motion] text-strich > Zickzack
        g.schichten-fugen[data-motion] text-strich > 3 gefüllte Fugen (VOR den Fliesen gezeichnet, damit die Kanten der Fliesen obenauf liegen)
        g.schichten-fliesen > 4 × path.schichten-fliese[data-motion] (Umriss Tinte)
    ol @container (ab lg border-l border-fuge) > 5 × li.schichten-satz: Legende (48×24, aria-hidden, ab @xs) | p Nummer (aria-hidden, Mono) + Name | p Satz

Maße: Fliesenskala. Mobil volle Inhaltsbreite (4 Spalten, Rand 16 px), Zeichnung höchstens max-w-md (448 px), bei m390 etwa 324 × 140 px. Tablet (md, eine Spalte) 448 × 194 px. Ab lg zwei gleiche Spalten in den 8 Inhaltsspalten von Tun, Zeichnung etwa 330 bis 380 px breit. Jeder Listenpunkt ab lg mindestens lg:min-h-48 (192 px = 2F, eine lange Fliesenseite), so steht die klebende Zeichnung, während fünf „Fliesen“ Text vorbeiziehen. Bei 200 % Schrift: Die Legende entfällt unter 20rem Containerbreite, Nummer, Name und Satz brechen um, die Zeichnung bleibt gleich groß. Kleben und Bewegung hängen an (height > 32rem), bei Zoom oder vergrößerter Standardschrift steht alles fertig da.

=== Datei 1: src/components/momente/schichten/daten.ts (reine Daten, kein JSX, keine Importe) ===
// Großer Moment „schichten“ (KERN v3.3 K-007, /bad; E3-GRAF-01): Wortlaut aus _werkstatt/texte/bad.md (Abschnitt 3) und
// Maße der Zeichnung in Zeichnungseinheiten (viewBox 0 0 240 104, y wächst nach unten). Reine Daten ohne JSX, damit
// test/schichten.test.mjs sie direkt lesen kann.
export type SchichtKennung = 'untergrund' | 'abdichtung' | 'kleber' | 'fliese' | 'fuge';
export interface Schicht {
  kennung: SchichtKennung;
  name: string;
  satz: string;
  /** Oberkante in Zeichnungseinheiten */
  oben: number;
  /** Unterkante in Zeichnungseinheiten */
  unten: number;
}
export const UNTERSCHRIFT = 'So ist eine Fläche im Bad aufgebaut, von unten nach oben.';
/** Zeichenfläche: Schnitt von links bis rechts, vier Fliesen, drei Fugen; `weg` = Weg von Kleber und Fliesen beim Setzen
 *  (passt zu calc(var(--spacing) * -4) = 16 px in bewegung.css) */
export const ZEICHNUNG = { breite: 240, hoehe: 104, links: 8, rechts: 232, fliesen: 4, fuge: 4, weg: 16 } as const;
/** von unten nach oben, Reihenfolge des Seitentexts; die Fuge liegt zwischen den Fliesen auf deren Höhe */
export const SCHICHTEN: readonly Schicht[] = [
  { kennung: 'untergrund', name: 'Untergrund', satz: 'Darauf wird alles aufgebaut.', oben: 50, unten: 96 },
  { kennung: 'abdichtung', name: 'Abdichtung', satz: 'Die Abdichtung liegt zwischen Untergrund und Kleber.', oben: 46, unten: 50 },
  { kennung: 'kleber', name: 'Kleber', satz: 'Der Kleber hält die Fliese fest auf der Abdichtung.', oben: 36, unten: 46 },
  { kennung: 'fliese', name: 'Fliese', satz: 'Die Fliese liegt oben, und darauf stehen Sie im Bad.', oben: 20, unten: 36 },
  { kennung: 'fuge', name: 'Fuge', satz: 'Die Fugen füllen die Lücken zwischen den Fliesen.', oben: 20, unten: 36 },
];
export function schicht(kennung: SchichtKennung): Schicht {
  const s = SCHICHTEN.find((e) => e.kennung === kennung);
  if (!s) throw new Error(`Schicht fehlt: ${kennung}`);
  return s;
}
/** Breite einer Fliese: (224 − 3 × 4) / 4 = 53 */
export const FLIESE_B = (ZEICHNUNG.rechts - ZEICHNUNG.links - (ZEICHNUNG.fliesen - 1) * ZEICHNUNG.fuge) / ZEICHNUNG.fliesen;
/** linke Kante jeder Fliese: 8, 65, 122, 179 */
export const FLIESEN_X: readonly number[] = Array.from({ length: ZEICHNUNG.fliesen }, (_, i) => ZEICHNUNG.links + i * (FLIESE_B + ZEICHNUNG.fuge));
/** linke Kante jeder Fuge: 61, 118, 175 */
export const FUGEN_X: readonly number[] = FLIESEN_X.slice(1).map((x) => x - ZEICHNUNG.fuge);
/** Zahnung des Kammspachtels als Zickzack von x1 bis x2: Täler auf `tal`, Spitzen auf `spitze`, je `schritt` ein Punkt */
export function zickzack(x1: number, x2: number, tal: number, spitze: number, schritt: number): string {
  const n = Math.round((x2 - x1) / schritt);
  return Array.from({ length: n + 1 }, (_, i) => `${i === 0 ? 'M' : 'L'}${x1 + i * schritt} ${i % 2 === 0 ? tal : spitze}`).join('');
}

=== Datei 2: src/components/momente/schichten/Zeichnung.tsx ===
// Zeichnung des großen Moments „schichten“ (E3-GRAF-01): Schnitt durch einen Boden im Bad in der Zeichensprache der
// Plan-Vignetten (kern/vignetten/zeichnen.tsx: Strich 1,5 px non-scaling, currentColor, Schraffur als Linien, keine IDs,
// kein Text). Von unten: Untergrund schraffiert (liegt von Anfang an), Abdichtung als dunkles Band, Kleber mit Zahnung,
// Fugen gefüllt, vier Fliesen. Kein Rot: das eine Rot je Bildschirm trägt die Leitachse (wie SzeneAblauf). Bewegte Teile
// tragen data-motion="schichten" und eine Klasse für bewegung.css. Dekorativ (aria-hidden über Planrahmen), den Inhalt
// tragen Bildunterschrift und Liste. Dazu die Legende je Schicht (Schichtmuster). Serverkomponente.
import { Linie, Planrahmen, schraffur } from '@/components/kern/vignetten/zeichnen';
import { FLIESE_B, FLIESEN_X, FUGEN_X, ZEICHNUNG, schicht, zickzack, type SchichtKennung } from './daten';

const { breite, hoehe, links, rechts, fuge } = ZEICHNUNG;
const BREITE = rechts - links;
const U = schicht('untergrund');
const A = schicht('abdichtung');
const K = schicht('kleber');
const F = schicht('fliese');
const FH = F.unten - F.oben;

export default function Schichtzeichnung() {
  return (
    <Planrahmen viewBox={`0 0 ${breite} ${hoehe}`}>
      {/* Untergrund: Schraffur in Strich, Kante in Tinte; liegt von Anfang an (ohne Bewegung) */}
      <g className="text-strich">
        <Linie d={schraffur(links, U.oben, BREITE, U.unten - U.oben, 8)} />
      </g>
      <Linie d={`M${links} ${U.oben}H${rechts}V${U.unten}H${links}Z`} />
      {/* Abdichtung: dunkles Band, streicht sich von links auf */}
      <g data-motion="schichten" className="schichten-abdichtung text-tinte-2">
        <path d={`M${links} ${A.oben}H${rechts}V${A.unten}H${links}Z`} fill="currentColor" stroke="none" />
      </g>
      {/* Kleber: Zahnung des Kammspachtels, Täler auf der Abdichtung, Spitzen knapp unter den Fliesen */}
      <g data-motion="schichten" className="schichten-kleber text-strich">
        <Linie d={zickzack(links, rechts, K.unten, K.oben + 2, 4)} />
      </g>
      {/* Fugen: gefüllt in Strich, füllen sich von unten; unter den Fliesenkanten gezeichnet */}
      <g data-motion="schichten" className="schichten-fugen text-strich">
        {FUGEN_X.map((x) => (
          <path key={x} d={`M${x} ${F.oben}h${fuge}v${FH}h${-fuge}Z`} fill="currentColor" stroke="none" />
        ))}
      </g>
      {/* Fliesen: vier Umrisse in Tinte, legen sich Fliese für Fliese */}
      <g className="schichten-fliesen">
        {FLIESEN_X.map((x) => (
          <Linie key={x} data-motion="schichten" className="schichten-fliese" d={`M${x} ${F.oben}h${FLIESE_B}v${FH}h${-FLIESE_B}Z`} />
        ))}
      </g>
    </Planrahmen>
  );
}

/** Legende: dasselbe Zeichen jeder Schicht im Kleinen (48 × 24), so finden Liste und Zeichnung ohne Text im Bild zusammen */
export function Schichtmuster({ kennung }: { kennung: SchichtKennung }) {
  return (
    <Planrahmen viewBox="0 0 48 24">
      {kennung === 'untergrund' && (
        <>
          <g className="text-strich">
            <Linie d={schraffur(2, 6, 44, 16, 6)} />
          </g>
          <Linie d="M2 6H46V22H2Z" />
        </>
      )}
      {kennung === 'abdichtung' && <path d="M2 12H46V16H2Z" className="text-tinte-2" fill="currentColor" stroke="none" />}
      {kennung === 'kleber' && (
        <g className="text-strich">
          <Linie d={zickzack(4, 44, 18, 10, 4)} />
        </g>
      )}
      {kennung === 'fuge' && <path d="M22 8h4v12h-4Z" className="text-strich" fill="currentColor" stroke="none" />}
      {(kennung === 'fliese' || kennung === 'fuge') && <Linie d="M2 8h20v12H2ZM26 8h20v12H26Z" />}
    </Planrahmen>
  );
}

=== Datei 3: src/components/momente/schichten/Schichten.tsx (Standardexport, Einbau durch E3-BAU-01) ===
// Großer Moment „schichten“ (KERN v3.3 K-007, Register `schichten`, /bad; E3-GRAF-01): Was unter der Fliese steckt.
// Figur mit Bildunterschrift; darunter in einem Feld an der Fuge die Zeichnung (mobil oben, ab lg links) und die fünf
// Schichten von unten nach oben als nummerierte Liste mit Legende, je Schicht ein Satz. Die Bewegung steht allein in
// bewegung.css: ein Zeitstrahl je Satz (view-timeline). Je Satz setzt sich seine Schicht in der Zeichnung, die Zeichnung
// klebt dabei unter dem Kopf. Ohne Unterstützung, reduziert, ohne JavaScript, bei wenig Höhe: alle Schichten sichtbar,
// nichts klebt. Platz: ErzaehlSeite `momente.tun`. Serverkomponente.
import Schichtzeichnung, { Schichtmuster } from './Zeichnung';
import { SCHICHTEN, UNTERSCHRIFT } from './daten';

export default function Schichten() {
  return (
    <figure className="schichten" data-motion="schichten">
      <figcaption className="max-w-mass font-text text-fs-3 text-pretty text-tinte-2">{UNTERSCHRIFT}</figcaption>
      <div className="mt-6 border border-fuge bg-fliese lg:grid lg:grid-cols-2">
        <div className="schichten-buehne border-b border-fuge bg-fliese p-4 text-tinte lg:self-start lg:border-b-0 lg:p-8">
          <div className="mx-auto max-w-md">
            <Schichtzeichnung />
          </div>
        </div>
        <ol className="@container lg:border-l lg:border-fuge">
          {SCHICHTEN.map((s, i) => (
            <li key={s.kennung} className="schichten-satz flex gap-4 border-t border-fuge px-4 py-6 first:border-t-0 lg:min-h-48 lg:p-8">
              <span aria-hidden="true" className="hidden w-12 shrink-0 pt-1 text-tinte @xs:block">
                <Schichtmuster kennung={s.kennung} />
              </span>
              <div className="min-w-0">
                <p className="font-text text-fs-4 font-semibold text-tinte">
                  <span aria-hidden="true" className="mr-3 font-mono text-fs-2 font-normal text-tinte-2">{i + 1}</span>
                  {s.name}
                </p>
                <p className="mt-1 font-text text-fs-3 text-pretty text-tinte-2">{s.satz}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}

Einbau (nicht in diesem Paket, für E3-BAU-01): `import Schichten from '@/components/momente/schichten/Schichten';` … `<ErzaehlSeite inhalt={…} momente={{ tun: <Schichten /> }} />`. Die Seite liefert die Unterschrift und die fünf Sätze NICHT noch einmal in tun.absatz oder tun.punkte.

## texte

[
 "Unterschrift (figcaption), wörtlich aus bad.md Abschnitt 3: „So ist eine Fläche im Bad aufgebaut, von unten nach oben.“",
 "1 · Name „Untergrund“ · Satz „Darauf wird alles aufgebaut.“ (wörtlich)",
 "2 · Name „Abdichtung“ · Satz „Die Abdichtung liegt zwischen Untergrund und Kleber.“ (wörtlich)",
 "3 · Name „Kleber“ · Satz „Der Kleber hält die Fliese fest auf der Abdichtung.“ (wörtlich)",
 "4 · Name „Fliese“ · Satz „Die Fliese liegt oben, und darauf stehen Sie im Bad.“ (wörtlich)",
 "5 · Name „Fuge“ · Satz „Die Fugen füllen die Lücken zwischen den Fliesen.“ (wörtlich)",
 "Keine neuen Texte. Keine Fachwort-Marken im Moment: Untergrund und Abdichtung kommen zum ersten Mal in den Punkten von „Was wir tun“ vor ([[untergrund|…]], [[abdichtung|…]]) und sind dort erklärt (Tun setzt Punkte und Absatz vor den Moment). Kleber, Fliese und Fuge stehen nicht im Glossar. Die Nummern 1 bis 5 sind nur sichtbar (aria-hidden), die Liste nummeriert für Screenreader selbst."
]

## bewegung

Auslöser: Scroll (Register `schichten: { ausloeser: 'scroll' }`), reines CSS, kein Beobachter, kein JS. Zeitstrahl: Die Listenpunkte 2 bis 5 tragen je eine view-timeline (--schichten-2 … --schichten-5, Achse block). `timeline-scope` an `.schichten` macht sie für die Zeichnung sichtbar. Jede Schicht folgt genau ihrem Satz, die Staffelung ergibt sich aus der Lage der Sätze.
Ablauf (linear an Scroll = Kurve ease-linear aus K-005, keine Dauer):
- Untergrund (Satz 1): keine Bewegung, liegt von Anfang an. Er ist schon da, bevor wir anfangen, und so ist die Zeichnung nie leer.
- Abdichtung (Satz 2): Keyframe `schichten-streichen` { from { scale: 0 1 } to { scale: 1 1 } }, transform-box fill-box, Ursprung links (0 50%): das Band streicht sich von links auf. Bereich cover 15% bis cover 45%.
- Kleber (Satz 3): Keyframe `schichten-setzen` { from { opacity: 0; translate: 0 calc(var(--spacing) * -4) } to { opacity: 1; translate: 0 0 } }: die Zahnung legt sich von oben (16 Einheiten) an ihren Platz. cover 15% bis 45%.
- Fliesen (Satz 4): `schichten-setzen` je Fliese, Fliese für Fliese von links: nth-child(1) cover 15–30 %, (2) 20–35 %, (3) 25–40 %, (4) 30–45 %.
- Fugen (Satz 5): Keyframe `schichten-fuellen` { from { scale: 1 0 } to { scale: 1 1 } }, fill-box, Ursprung unten (50% 100%): die Fugen füllen sich von unten.
Nichts federt: lineare Abbildung, kein Überschwingen, Endwerte = Ruhezustand. Klebende Bühne: Solange die Liste läuft, steht die Zeichnung fest unter dem Kopf (mobil top 64 px = Kopfhöhe h-16, ab 64rem Breite 96 px wie lg:top-24, z-index 10 = Ebene „Inhalt über Deko“). Kleben und Bewegung gelten nur gemeinsam unter `@supports (animation-timeline: view()) and (timeline-scope: --a)` + `@media screen and (prefers-reduced-motion: no-preference) and (height > 32rem)` + `html.k-bewegung:not(.k-notaus)`. Ohne Kleben sähe man die Zeichnung im Querformat nie fertig, weil die späteren Sätze erst unter ihr laufen. Animiert werden nur scale, translate und opacity. Jedes bewegte Element (g.schichten-abdichtung, g.schichten-kleber, g.schichten-fugen, 4 × path.schichten-fliese) und die Figur tragen data-motion="schichten". Ersatzpfad = Endzustand: Gibt es keine view-timeline oder kein timeline-scope (Firefox, ältere Safari), kein JS (keine k-bewegung), Notaus nach 2 s, Druck oder forced-colors, dann sind alle Schichten sichtbar und die Zeichnung steht oben bzw. links neben der Liste. Zurück oder Vor (k-verlauf) braucht nichts: der Zustand folgt der Scrollstellung.

## reduziert

Bei prefers-reduced-motion: reduce greift kein Startzustand und keine Klebe-Regel (die ganze Regelgruppe steht unter no-preference). Der Endzustand steht sofort da: Untergrund, Abdichtung, Kleber, alle vier Fliesen und alle drei Fugen sind sichtbar, die Zeichnung steht als ruhige Abbildung über bzw. neben der Liste (Register: „alle Schichten sichtbar“). Gleiches ohne JavaScript, nach dem Notaus, im Querformat mit Höhe ≤ 32rem, bei Zoom bzw. vergrößerter Standardschrift (Höhe in rem ≤ 32), im Druck und bei forced-colors (zusätzlich `animation: none !important`).

## zugang

Rolle und Name: figure mit figcaption (der Name der Abbildung ist die Unterschrift). Die Zeichnung ist dekorativ (Planrahmen setzt aria-hidden="true" focusable="false"), ebenso die Legenden-Zeichen (span aria-hidden) und die sichtbaren Nummern (aria-hidden). Den Inhalt trägt die ol mit fünf li, je Name (p, halbfett) und Satz (p). Ein Screenreader liest: „Abbildung, So ist eine Fläche im Bad aufgebaut, von unten nach oben. Liste, 5 Einträge. 1 von 5, Untergrund. Darauf wird alles aufgebaut. …“. Tastatur und Fokus: keine Bedienelemente, also unberührt. Die klebende Bühne enthält nichts Fokussierbares und klebt nur innerhalb der Figur, sie verdeckt keine Fokusziele der Seite. Reihenfolge: DOM = Lesereihenfolge (Unterschrift, Zeichnung, Liste 1 bis 5), visuell gleich. Kontrast: Text tinte (17:1) und tinte-2 (8,2:1 auf Kalk, 9,0:1 auf Fliese), Grafik in Strich (≥ 3:1) und Tinte. Bedeutung nicht nur über Farbe: Jede Schicht hat eine eigene Form (Schraffur, volles Band, Zahnung, Umriss, gefüllte Lücke), dazu Legende und Text. forced-colors: Alle Linien und Flächen laufen über currentColor an Gruppen mit text-*, werden also CanvasText. Animation aus, Kleben aus. 200 % Systemschrift (P1): Die Legende fällt unter 20rem Containerbreite weg, der Text bricht um (text-pretty). Wo die Media Query rem mitwächst, bleibt alles fertig stehen. Texte ≥ 16 px (fs-3, fs-4). Keine Touchziele nötig.

## budget

Client-Komponente: nein. Alle drei Dateien sind Serverkomponenten, die Bewegung ist reines CSS, also 0 KB zusätzliches JS (Budget Bewegung ≤ 60 KB gzip unberührt). CSS in bewegung.css: rund 2,4 KB roh, etwa 0,6 KB gzip. SVG inline: Zeichnung mit etwa 33 Schraffurlinien, Zickzack mit 57 Punkten, 4 Fliesen und 3 Fugen, dazu 5 Legenden, zusammen rund 3 KB roh, unter 1,3 KB gzip (Grenze Zeichnung ≤ 40 KB gzip). Daten daten.ts unter 1 KB. Keine Bilder, keine Schriften, keine Abhängigkeiten. CLS: feste Proportion über viewBox (h-auto w-full), kein Layoutsprung. Die Bewegung ändert nur transform und opacity und läuft im Compositor.

## dateien

[
 "src/components/momente/schichten/daten.ts",
 "src/components/momente/schichten/Zeichnung.tsx",
 "src/components/momente/schichten/Schichten.tsx",
 "_werkstatt/register/schichten.json",
 "test/schichten.test.mjs"
]

## gemeinsam

[
 "src/app/bewegung.css: folgenden Block wörtlich direkt nach Zeile 771 einfügen (nach `@keyframes szene-setzen …`, vor dem Kommentar `/* einzugsband …`):\n/* schichten (großer Moment /bad, K-007, E3-GRAF-01) – Was unter der Fliese steckt: Schnitt durch einen Boden im Bad.\n   Der Untergrund liegt von Anfang an; je Satz der Liste setzt sich linear an Scroll eine Schicht darauf: die Abdichtung\n   streicht sich von links auf, der Kleber setzt sich, die Fugen füllen sich von unten, die Fliesen legen sich Fliese für\n   Fliese. Zeitstrahl je Satz (view-timeline --schichten-2 bis -5 an den Listenpunkten, über timeline-scope an der Figur\n   für die Zeichnung sichtbar). Solange die Liste läuft, klebt die Zeichnung unter dem Kopf. Alles nur ab 32rem Höhe\n   (Querformat, Zoom: ohne Kleben sähe man die Zeichnung nie fertig). Nur scale, translate und opacity. Ersatzpfad (ohne\n   animation-timeline oder timeline-scope, reduziert, ohne JS, nach dem Notaus, Druck, forced-colors) = Endzustand. */\n.schichten .schichten-abdichtung,\n.schichten .schichten-fugen {\n  transform-box: fill-box;\n}\n.schichten .schichten-abdichtung { transform-origin: 0 50%; }\n.schichten .schichten-fugen { transform-origin: 50% 100%; }\n@supports (animation-timeline: view()) and (timeline-scope: --a) {\n  @media screen and (prefers-reduced-motion: no-preference) and (height > 32rem) {\n    html.k-bewegung:not(.k-notaus) .schichten {\n      timeline-scope: --schichten-2, --schichten-3, --schichten-4, --schichten-5;\n    }\n    html.k-bewegung:not(.k-notaus) .schichten .schichten-satz:nth-child(2) { view-timeline: --schichten-2 block; }\n    html.k-bewegung:not(.k-notaus) .schichten .schichten-satz:nth-child(3) { view-timeline: --schichten-3 block; }\n    html.k-bewegung:not(.k-notaus) .schichten .schichten-satz:nth-child(4) { view-timeline: --schichten-4 block; }\n    html.k-bewegung:not(.k-notaus) .schichten .schichten-satz:nth-child(5) { view-timeline: --schichten-5 block; }\n    html.k-bewegung:not(.k-notaus) .schichten .schichten-buehne {\n      position: sticky;\n      top: calc(var(--spacing) * 16);\n      z-index: 10;\n    }\n    html.k-bewegung:not(.k-notaus) .schichten .schichten-abdichtung {\n      animation: schichten-streichen linear both;\n      animation-timeline: --schichten-2;\n      animation-range: cover 15% cover 45%;\n    }\n    html.k-bewegung:not(.k-notaus) .schichten .schichten-kleber {\n      animation: schichten-setzen linear both;\n      animation-timeline: --schichten-3;\n      animation-range: cover 15% cover 45%;\n    }\n    html.k-bewegung:not(.k-notaus) .schichten .schichten-fliese {\n      animation: schichten-setzen linear both;\n      animation-timeline: --schichten-4;\n    }\n    html.k-bewegung:not(.k-notaus) .schichten .schichten-fliese:nth-child(1) { animation-range: cover 15% cover 30%; }\n    html.k-bewegung:not(.k-notaus) .schichten .schichten-fliese:nth-child(2) { animation-range: cover 20% cover 35%; }\n    html.k-bewegung:not(.k-notaus) .schichten .schichten-fliese:nth-child(3) { animation-range: cover 25% cover 40%; }\n    html.k-bewegung:not(.k-notaus) .schichten .schichten-fliese:nth-child(4) { animation-range: cover 30% cover 45%; }\n    html.k-bewegung:not(.k-notaus) .schichten .schichten-fugen {\n      animation: schichten-fuellen linear both;\n      animation-timeline: --schichten-5;\n      animation-range: cover 15% cover 45%;\n    }\n  }\n  @media screen and (prefers-reduced-motion: no-preference) and (height > 32rem) and (width >= 64rem) {\n    html.k-bewegung:not(.k-notaus) .schichten .schichten-buehne {\n      top: calc(var(--spacing) * 24);\n    }\n  }\n}\n@keyframes schichten-streichen { from { scale: 0 1; } to { scale: 1 1; } }\n@keyframes schichten-setzen { from { opacity: 0; translate: 0 calc(var(--spacing) * -4); } to { opacity: 1; translate: 0 0; } }\n@keyframes schichten-fuellen { from { scale: 1 0; } to { scale: 1 1; } }\n@media print, (forced-colors: active) {\n  .schichten [data-motion] {\n    animation: none !important;\n  }\n  .schichten .schichten-buehne {\n    position: static !important;\n  }\n}\n(Hinweis: Im selben Regelblock muss `animation` vor `animation-timeline` stehen, denn die Kurzform setzt animation-timeline und animation-range zurück. Die Bereiche je Fliese wirken über die höhere Spezifität von :nth-child. Nach dem Bau prüfen, dass `timeline-scope` und `view-timeline` im ausgelieferten CSS stehen.)",
 "src/lib/motion/register.ts: in REGISTER nach der Zeile `fugenband: { ausloeser: 'scroll' },` einfügen:\n  // große Momente (E3-ORCH-02a): je Seite eine Szene, scroll-gebunden per CSS (bewegung.css)\n  schichten: { ausloeser: 'scroll' },",
 "test/bewegung.test.mjs: nach `const ENTFALLEN_E009 = [];` die Zeile `const GROSSE_MOMENTE = ['schichten'];` einfügen (E3-ORCH-02a ergänzt die übrigen acht). In Test 1 `[...KERN_V3, ...V2_SVG_E037, ...ENTFALLEN_E009]` durch `[...KERN_V3, ...V2_SVG_E037, ...GROSSE_MOMENTE, ...ENTFALLEN_E009]` ersetzen und die Schleife `for (const k of [...KERN_V3, ...V2_SVG_E037])` durch `for (const k of [...KERN_V3, ...V2_SVG_E037, ...GROSSE_MOMENTE])`. Neuer Test am Ende: test('Bewegung 6: schichten läuft scroll-gebunden über CSS, ohne Beobachter und ohne Ladezustand', () => { assert.equal(REGISTER.schichten.ausloeser, 'scroll'); assert.ok(!beobachteteKennungen(true).includes('schichten') && !beobachteteKennungen(false).includes('schichten')); assert.ok(!ladeKennungen().includes('schichten')); });",
 "_werkstatt/register.json: \"schichten\" ans Ende der Felder \"kennungen\" und \"v3\" anhängen. Im \"hinweis\" schichten aus der Liste „kommen mit E3-ORCH-02a dazu“ nehmen und vermerken: „schichten seit E3-ORCH-02a (E3-GRAF-01)“. In \"quelle\" nichts ändern.",
 "_werkstatt/werkzeuge/bewegung.mjs: in AUSLOESER `schichten: 'scroll',` ergänzen (Unbekanntes gilt dort zwar schon als Scroll, aber dann mit Vermerk „Annahme“).",
 "package.json: an das Skript \"test\" ` test/schichten.test.mjs` anhängen (Testkonfiguration).",
 "Vorlagen (ErzaehlSeite.tsx, teile/Tun.tsx): keine Änderung nötig. Der Schlitz momente.tun ist da (Tun setzt `{moment && <div className=\"mt-16\">{moment}</div>}`).",
 "Optional für die Prüfung vor E3-BAU-01 (Route, nur next dev): src/app/(bestand)/werkstatt-schaufenster/schichten/page.dev.tsx nach dem Muster von werkstatt-schaufenster/szene/page.dev.tsx. Inhalt: metadata { title: 'Schaufenster · Schichten', robots: { index: false, follow: false } }, darin <Leitachse><Abschnitt id=\"sf-schichten\" kopf=\"seitlich\" leitachse spaet titel=\"Wir arbeiten Schicht für Schicht.\"><div className=\"min-h-dvh\" /><Schichten /><div className=\"min-h-dvh\" /></Abschnitt></Leitachse> (Leerraum davor und danach, damit sich der Scroll-Moment ganz durchlaufen lässt)."
]

## bildbedarf

[]

## pruefung

Paket (Haiku, ohne Server):
1. `node --experimental-strip-types --loader ./test/resolver.mjs --test test/schichten.test.mjs` muss grün sein.
2. `npx tsc --noEmit` und `npx eslint src/components/momente/schichten test/schichten.test.mjs` ohne Fehler.
3. Selbstprüfung per grep, Ergebnis leer: `grep -nE "#[0-9a-fA-F]{3,8}\b|style=|use client|\bid=|<text|laser|-\[" src/components/momente/schichten/*`.
Inhalt von test/schichten.test.mjs (wörtlich):
import test from 'node:test';
import assert from 'node:assert/strict';
import { SCHICHTEN, UNTERSCHRIFT, ZEICHNUNG, FLIESE_B, FLIESEN_X, FUGEN_X, schicht, zickzack } from '../src/components/momente/schichten/daten.ts';
// Großer Moment „schichten“ (E3-GRAF-01): Wortlaut aus _werkstatt/texte/bad.md und Maße der Zeichnung.
test('Schichten 1: fünf Schichten von unten nach oben, Wortlaut wie im Seitentext', () => {
  assert.equal(UNTERSCHRIFT, 'So ist eine Fläche im Bad aufgebaut, von unten nach oben.');
  assert.deepEqual(SCHICHTEN.map((s) => [s.name, s.satz]), [
    ['Untergrund', 'Darauf wird alles aufgebaut.'],
    ['Abdichtung', 'Die Abdichtung liegt zwischen Untergrund und Kleber.'],
    ['Kleber', 'Der Kleber hält die Fliese fest auf der Abdichtung.'],
    ['Fliese', 'Die Fliese liegt oben, und darauf stehen Sie im Bad.'],
    ['Fuge', 'Die Fugen füllen die Lücken zwischen den Fliesen.'],
  ]);
});
test('Schichten 2: die Schichten liegen lückenlos aufeinander und im Bild', () => {
  const [u, a, k, f, g] = ['untergrund', 'abdichtung', 'kleber', 'fliese', 'fuge'].map((n) => schicht(n));
  assert.equal(a.unten, u.oben);
  assert.equal(k.unten, a.oben);
  assert.equal(f.unten, k.oben);
  assert.deepEqual([g.oben, g.unten], [f.oben, f.unten], 'Fuge auf Höhe der Fliese');
  for (const s of SCHICHTEN) assert.ok(s.oben < s.unten && s.oben >= 0 && s.unten <= ZEICHNUNG.hoehe, s.name);
  assert.ok(f.oben - ZEICHNUNG.weg >= 0, 'Startlage der Fliesen bleibt in der Zeichenfläche');
});
test('Schichten 3: vier Fliesen und drei Fugen füllen die Breite genau', () => {
  assert.equal(FLIESE_B, 53);
  assert.deepEqual([...FLIESEN_X], [8, 65, 122, 179]);
  assert.deepEqual([...FUGEN_X], [61, 118, 175]);
  assert.equal(FLIESEN_X.at(-1) + FLIESE_B, ZEICHNUNG.rechts);
  FUGEN_X.forEach((x, i) => assert.equal(x + ZEICHNUNG.fuge, FLIESEN_X[i + 1]));
});
test('Schichten 4: die Zahnung des Klebers bleibt im Kleberbett', () => {
  const k = schicht('kleber');
  const d = zickzack(ZEICHNUNG.links, ZEICHNUNG.rechts, k.unten, k.oben + 2, 4);
  const punkte = [...d.matchAll(/[ML](-?[\d.]+) (-?[\d.]+)/g)].map((m) => [Number(m[1]), Number(m[2])]);
  assert.equal(punkte.length, 57);
  assert.deepEqual(punkte[0], [ZEICHNUNG.links, k.unten]);
  assert.deepEqual(punkte.at(-1), [ZEICHNUNG.rechts, k.unten]);
  for (const [, y] of punkte) assert.ok(y >= k.oben && y <= k.unten);
});
test('Schichten 5: Texte ohne Gedankenstrich (K-010)', () => {
  for (const t of [UNTERSCHRIFT, ...SCHICHTEN.flatMap((s) => [s.name, s.satz])]) assert.ok(!/[–—]| - /.test(t), t);
});
Inhalt von _werkstatt/register/schichten.json (wörtlich): {"kennung":"schichten","paket":"E3-GRAF-01","kern":"3.3","zweck":"Zusammenhang: Was unter der Fliese steckt","ausloeser":"scroll","registerTs":"schichten: { ausloeser: 'scroll' },","zeitstrahl":"view-timeline je Satz (--schichten-2 bis --schichten-5) an li.schichten-satz, timeline-scope an figure.schichten","dauerKurve":"linear an Scroll; je Schicht cover 15 % bis 45 % ihres Satzes, Fliesen gestaffelt 15–30, 20–35, 25–40, 30–45 %","keyframes":["schichten-streichen","schichten-setzen","schichten-fuellen"],"eigenschaften":["scale","translate","opacity"],"elemente":["figure.schichten","g.schichten-abdichtung","g.schichten-kleber","g.schichten-fugen","path.schichten-fliese (4)"],"kleben":"div.schichten-buehne sticky unter dem Kopf (64 px, ab 64rem 96 px), nur mit Bewegung","reduziert":"alle Schichten sichtbar, nichts klebt","ersatzpfad":"Endzustand ohne animation-timeline oder timeline-scope, ohne JS, nach Notaus, bei Höhe ≤ 32rem, Druck, forced-colors","wo":["/bad"],"schlitz":"momente.tun","bewegungMjs":"schichten: 'scroll'","budget":{"js":"0 KB (Serverkomponente)","css":"etwa 0,6 KB gzip","svg":"unter 1,3 KB gzip"}}
Nach Übernahme durch den Orchestrator (CSS, Register, Schaufenster oder /bad aus E3-BAU-01), Server 4320 bzw. Reinraum:
4. `node _werkstatt/werkzeuge/bewegung.mjs --modus register --seite /bad` (schichten bekannt, keine Animation ohne data-motion). `--modus einzelbilder --kennung schichten --seite /bad --ansicht m390` und `--ansicht d1440`: fünf Bilder bei 10/30/50/70/90 %, Abdichtung, Kleber, Fliesen (nacheinander) und Fugen erscheinen in dieser Folge, der Untergrund steht immer, die Zeichnung klebt mobil bündig unter dem Kopf und ab lg links bei 96 px. `--modus reduziert`: keine Animation, alle data-motion-Elemente sichtbar. `--modus bildrate`: keine Long Animation Frames durch den Moment.
5. `node _werkstatt/werkzeuge/einzelbild.mjs --seite /bad --ansichten m360,m390,t768,d1440 --scroll '#was-wir-tun'`, dazu `--bewegung reduce` (alle Schichten sichtbar), `--schrift 200` auf m390 (Legende weg, Text lesbar, kein seitliches Scrollen) und q844 (Querformat: nichts klebt, Zeichnung fertig). forced-colors (Playwright forcedColors 'active'): alle Schichten sichtbar in CanvasText.
6. Sichtprüfung: kein Rot in der Figur, nichts federt, Linien 1,5 px wie die Vignetten, Fliesen und Fugen gerade auf einer Linie. Nach E3-BAU-01 `lesbarkeit.mjs` über /bad (Fachwörter nur beim ersten Vorkommen erklärt, keine Gedankenstriche).

## risiken

[
 "Browserunterstützung: timeline-scope und view-timeline gibt es in Chromium und neuem Safari, in Firefox nicht. Dort und in älteren Browsern greift der Ersatzpfad (fertige Zeichnung). Gewollt, aber die Prüfwerkzeuge laufen nur in Chromium (Umgebungsausnahme).",
 "Die `animation`-Kurzform setzt animation-timeline und animation-range zurück. Steht `animation-timeline` vor `animation` oder verliert ein nth-child-Bereich an Spezifität, laufen die Schichten am Dokument-Zeitstrahl oder alle Fliesen gleichzeitig. Den CSS-Block wörtlich übernehmen.",
 "Klebende Bühne mobil: Die Liste läuft unter der Zeichnung durch. Die Bühne muss deckend bg-fliese mit z-10 tragen und bündig bei 64 px sitzen (Kopf h-16). Wird der Kopf höher (z. B. Banner), muss top nachziehen. Sichtprüfung m360, m390 und t768 nötig.",
 "Lightning CSS (Tailwind 4) muss die unbekannte Eigenschaft `timeline-scope` und die Bedingung `(timeline-scope: --a)` durchreichen. Im gebauten CSS nachsehen. Fehlt sie, bleibt der Moment still (Ersatzpfad), es geht aber nichts kaputt.",
 "Hervorhebung ohne Rot: Die Abdichtung ist nur durch das volle Band in tinte-2 betont (eine rote Linie je Bildschirm trägt die Leitachse, Präzedenz SzeneAblauf). Will die Sichtabnahme mehr Gewicht, dann über Bandstärke, nicht über Laser-Rot.",
 "Reihenfolge der Vorlage: Tun setzt den Absatz („Seit 2019 … DIN 18534 …“) vor den Moment, bad.md nennt ihn danach. Inhaltlich unschädlich. Soll die Reihenfolge des Seitentexts gelten, müsste der Orchestrator Tun.tsx anpassen (gemeinsame Datei), für diesen Moment nicht nötig.",
 "Bei vergrößerter Standardschrift wächst rem in der Media Query auf manchen Geräten mit (Android). Dann greift (height > 32rem) nicht und P1 sieht die fertige Zeichnung ohne Bewegung. Gewollt (gleiche Grenze wie `flach:`), aber in der Bewegungsprüfung als still vermerken.",
 "knip meldet Schichten.tsx und Zeichnung.tsx als unbenutzt, bis E3-BAU-01 den Moment einbaut (daten.ts ist über den Test benutzt). Nicht löschen.",
 "test/bewegung.test.mjs (Test 1 prüft die Kennungen genau) und register.ts müssen in E3-ORCH-02a zusammen geändert werden, sonst wird die Suite rot.",
 "bewegung.mjs löst im Scrollmodus je data-motion-Element aus (Figur plus 7 Teile = 8 ≤ MAX_AUSLOESER 12). Die Bildfolgen sind deshalb zahlreich, aber gültig.",
 "content-visibility (spaet-zeichnen) an Tun: Zeitstrahlen werden erst in Sichtnähe aktiv. Das ist wie bei szene-ablauf, sichtbar flackert nichts, weil vor dem Eintritt gerendert wird."
]

