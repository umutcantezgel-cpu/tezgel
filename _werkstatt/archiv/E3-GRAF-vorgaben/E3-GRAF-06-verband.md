# verband

## kennung

verband

## seite

/fliesen

## schlitz

zeichnungen.verband

## wiederverwendung

Bestand geprüft (grep nach verband, Verband, VerbandUmschalter, fischgr in src/, test/, _werkstatt/archiv/). Den Moment gibt es zu drei Vierteln schon. Er wird wiederverwendet, nicht neu erfunden:
(1) Die Kennung `verband` ist schon registriert: src/lib/motion/register.ts `verband: { ausloeser: 'interaktion' }`, _werkstatt/register.json (kennungen und v3), test/bewegung.test.mjs KERN_V3. Es braucht keinen neuen Eintrag in register.ts.
(2) Technik und CSS-Regeln des VerbandUmschalters (src/components/kern/VerbandUmschalter.tsx; src/app/bewegung.css Zeilen 115 bis 158) werden übernommen:
- Klasse `verband` am fieldset.
- Hülle `verband-bewegt`: ohne :has() ausgeblendet, mit :has() block.
- Reihen als `<g className="verband-reihe" data-halb data-drittel>`. Die vorhandenen Regeln setzen translate 40px (halb), 26.667px und 53.333px (drittel) und den Übergang `translate var(--dauer-3) var(--ease-setzen)` unter html.k-bewegung.
- Feldklasse `verband-wahl` mit vorhandenem Fokusrahmen und forced-colors-Rahmen.
- Eingänge mit `data-verband-wahl`, Tailwind `has-checked:bg-tinte has-checked:text-kalk`.
- Eingang im label. Darauf verlässt sich `_werkstatt/werkzeuge/bewegung.mjs` (Klick über `label:has([data-verband-wahl=…])`, Dauer aus `[data-motion="verband"] .verband-reihe`).
Deshalb rechnet die neue Zeichnung mit derselben Platte 80 × 40 Einheiten (2 : 1) wie der Reihenplan des Umschalters. So gelten die vorhandenen Versatzwerte unverändert.
(3) `reihenversatz` aus src/lib/plaene/geometrie.ts liefert die Reihenmerkmale.
(4) Zeichenmittel `Planrahmen` und `Linie` aus src/components/kern/vignetten/zeichnen.tsx: Strich 1,5 px non-scaling, Enden square, Ecken miter, currentColor, aria-hidden, focusable=false.
(5) `Fotos` aus src/components/vorlagen/teile/Fotos.tsx mit spalten={2}: einspaltig, ab @xs zweispaltig, Bildfeld mit flaeche. Damit stehen die zwei Fotos des Seitentexts im Moment. Bildkennungen `fliesen-halbverband` und `fliesen-fischgraet` aus src/config/arbeiten.ts; die Dateien liegen unter public/images/arbeiten/.
(6) Schlitz `zeichnungen` der WissensSeite (src/components/vorlagen/WissensSeite.tsx → teile/Wissen.tsx `Block`): die Zeichnung steht nach Karten, Liste und Tabelle in `flex flex-col gap-12`, Kopf seitlich.

Bewusst nicht übernommen:
- Der VerbandUmschalter selbst. Er ist eine gemeinsame Datei in kern/, hat drei Muster, Linien im Verlegeplan-Stil (1 px) und die Wahl unter dem Plan. Er bleibt auf /fliesen/verlegemuster.
- Die Fliesenkomposition. Ihre Verbände sind SVG-pattern und lassen sich nicht reihenweise verschieben. Ihr Fischgrät ist nur angenähert (3 : 1, gefüllte gedrehte Rechtecke) und taugt nicht für eine 1,5-px-Linienzeichnung.

Neu sind nur drei Dinge: die exakte Fischgrät-Geometrie (Deckung lückenlos geprüft), die Ebene „Fischgrät“ und die Beschreibung je Muster.

Geprüfte, lauffähige Fassung aller Paketdateien als Spiegel der Zielpfade: /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/verband/paket/ (src/…, test/…, _werkstatt/register/…; unter gemeinsam/ die Vorlagen für den Orchestrator). Stand der Prüfung: tsc 0 Fehler, eslint 0, werte.mjs 0 Befunde, Test 6 grün und 1 übersprungen, mit übernommenem CSS 7 grün. Vorschaubilder der vier Zustände liegen unter /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/verband/vorschau-{kreuz,halb,drittel,fisch}.png.

## aufbau

Komponente `VerbandProbe` (Serverkomponente) in zwei Dateien. Den Code 1:1 übernehmen (geprüfte Kopie im Scratchpad, siehe wiederverwendung).

DOM:
div.flex.flex-col.gap-12
  fieldset.verband[data-motion="verband"]
    legend.muster-legende  „Wählen Sie ein Muster“
    div.verband-bewegt
      div.@container > div.grid  (4 × label.verband-wahl > input[type=radio][data-verband-wahl][aria-describedby] + span)
      div (Rahmen Fuge, Fläche Fliese) > svg (Planrahmen, viewBox "-4 -4 368 208", text-tinte)
        defs > clipPath#muster-raum-{uid} > rect 0 0 360 200
        g[clip-path].text-strich
          g.muster-reihen: path der waagrechten Fugen + 5 × g.verband-reihe[data-halb][data-drittel] > path der Stöße
          g.muster-fisch > path FISCH (40 Platten)
        path der Wand "M0 0H360V200H0Z" (Tinte, über den Fugen)
    div.muster-texte.grid > 4 × p.muster-text[data-muster] (span „Name:“ + span#{name}-{id} Sätze)
  Fotos spalten={2} (abschaltbar mit fotos={false})

Reihenfolge: Die Wahl steht über der Zeichnung wie Reiter. So verdeckt der Finger am Handy die Antwort nicht, und die Legende steht direkt bei den Feldern.

Raster und Breiten:
- Der Block hat kopf="seitlich". Mobil steht der Moment in voller Inhaltsbreite (m390 ≈ 358 px), ab lg in 8 von 12 Spalten (d1440 ≈ 840 px).
- Wahl über Container-Abfrage: unter 20rem eine Spalte, ab @xs (20rem) zwei Spalten (2 × 2, m390), ab @2xl (42rem) vier Spalten (md und lg).
- Felder min-h-12 (48 px), volle Zellbreite.
- Die Zeichnung füllt die Breite, die Höhe kommt aus der viewBox (368 : 208): m390 ≈ 326 × 184 px (Platte ≈ 71 px), d1440 ≈ 792 × 448 px.
- Die Beschreibungen liegen mit :has() in einer Rasterzelle (CSS grid-area 1 / 1). Die Höhe richtet sich nach dem längsten Text, beim Umschalten springt nichts.
- Fotos ab @xs zweispaltig.

200 % Schrift: Alle Abfragen rechnen in rem. Die Wahl wird einspaltig (358 px < 20rem = 640 px), die Fotos ebenso. Die Beschreibung bricht um; das längste Wort „Drittelverband“ ist etwa 280 px breit, also schmaler als 358 px. Kein seitliches Scrollen, die Zeichnung bleibt unverändert.

A) src/components/momente/verband/geometrie.ts
// Geometrie der Musterprobe „verband“ (KERN v3.4 K-007, E3-GRAF-06): reine Rechnung ohne React, damit sie testbar ist
// (test/verband.test.mjs). Einheiten der Zeichnung (unbemaßt); Platte 2 : 1 wie im VerbandUmschalter und im Seitenwechsel,
// damit die Versatzwerte in bewegung.css (40px, 26.667px, 53.333px = ½, ⅓, ⅔ Platte) für beide Bausteine gelten.
import { reihenversatz } from '@/lib/plaene/geometrie';

export const RAUM = { b: 360, h: 200 } as const;
export const PLATTE = { b: 80, h: 40 } as const;
/** Rand um den Raum in der viewBox, damit die Wandlinie (1,5 px) nicht abgeschnitten wird */
export const RAND = 4;
export const REIHEN = RAUM.h / PLATTE.h;

export interface Rechteck {
  x: number;
  y: number;
  b: number;
  h: number;
}

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Waagrechte Fugen der Reihenverbände (Kreuzfuge, Halb- und Drittelverband): eine Linie je Reihengrenze. */
export function waagrechteFugen(): string {
  let d = '';
  for (let i = 1; i < REIHEN; i++) d += `M0 ${i * PLATTE.h}H${RAUM.b}`;
  return d;
}

/** Stoßfugen einer Reihe im Stand Kreuzfuge: die Raummitte liegt auf einer Fuge (gleiche Passstücke an beiden Rändern);
 *  links eine Platte mehr, damit nach dem Versatz (höchstens ⅔ Platte nach rechts) keine Fuge fehlt, rechts über den Rand. */
export function stossfugen(): number[] {
  const x0 = ((RAUM.b / 2) % PLATTE.b) - PLATTE.b;
  const xs: number[] = [];
  for (let k = 0; k < Math.ceil(RAUM.b / PLATTE.b) + 3; k++) xs.push(x0 + (k - 1) * PLATTE.b);
  return xs;
}

/** Pfad der Stoßfugen einer Reihe (eine senkrechte Linie je Stoß, Höhe einer Reihe). */
export function reihenPfad(reihe: number): string {
  const y1 = reihe * PLATTE.h;
  const y2 = y1 + PLATTE.h;
  return stossfugen()
    .map((x) => `M${x} ${y1}V${y2}`)
    .join('');
}

/** Merkmale einer Reihe für die Regeln in bewegung.css: Halbverband versetzt jede zweite Reihe um ½ Platte,
 *  Drittelverband jede Reihe um 0, ⅓ oder ⅔ Platte (wie im VerbandUmschalter). */
export function reihenDaten(reihe: number): { halb: '0' | '1'; drittel: '0' | '1' | '2' } {
  return {
    halb: reihenversatz('halb', reihe) > 0 ? '1' : '0',
    drittel: String(Math.round(reihenversatz('drittel', reihe) * 3)) as '0' | '1' | '2',
  };
}

// Fischgrät: im „Dominorahmen“ (Einheit = Plattenbreite W) liegen die Platten als Treppe aus einer liegenden
// (k − 2m, k + 2m)·W und einer stehenden Platte (k − 2m + 2, k + 2m − 1)·W; um −45° gedreht läuft der Grat waagrecht.
const W = PLATTE.h;
const L = PLATTE.b;
const C = Math.SQRT1_2;
/** halbe Diagonale einer Platte 80 × 40 (44,7), aufgerundet: Platten mit der Mitte weiter draußen berühren den Raum nicht */
const GRENZE = 45;

/** Punkt aus dem Dominorahmen in den Raum: Drehung um −45°, Ursprung auf der Raummitte. */
export function inRaum(u: number, v: number): [number, number] {
  return [RAUM.b / 2 + (u + v) * C, RAUM.h / 2 + (v - u) * C];
}

/** Umkehrung von inRaum (für die Prüfung der Deckung). */
export function inDominorahmen(x: number, y: number): [number, number] {
  const a = x - RAUM.b / 2;
  const b = y - RAUM.h / 2;
  return [(a - b) * C, (a + b) * C];
}

/** Platten des Fischgräts im Dominorahmen, nur die, die den Raum berühren können. */
export function fischRechtecke(): Rechteck[] {
  const liste: Rechteck[] = [];
  for (let k = -8; k <= 8; k++) {
    for (let m = -4; m <= 4; m++) {
      const paar: Rechteck[] = [
        { x: (k - 2 * m) * W, y: (k + 2 * m) * W, b: L, h: W },
        { x: (k - 2 * m + 2) * W, y: (k + 2 * m - 1) * W, b: W, h: L },
      ];
      for (const f of paar) {
        const [mx, my] = inRaum(f.x + f.b / 2, f.y + f.h / 2);
        if (mx >= -GRENZE && mx <= RAUM.b + GRENZE && my >= -GRENZE && my <= RAUM.h + GRENZE) liste.push(f);
      }
    }
  }
  return liste;
}

/** Ein Pfad mit allen Fischgrät-Platten als geschlossene Vierecke (Koordinaten auf 0,01 gerundet). */
export function fischPfad(): string {
  return fischRechtecke()
    .map((f) => {
      const ecken = [inRaum(f.x, f.y), inRaum(f.x + f.b, f.y), inRaum(f.x + f.b, f.y + f.h), inRaum(f.x, f.y + f.h)];
      return `M${ecken.map(([x, y]) => `${r2(x)} ${r2(y)}`).join('L')}Z`;
    })
    .join('');
}

B) src/components/momente/verband/VerbandProbe.tsx
// Musterprobe „verband“ (KERN v3.4 K-007 und K-008, E3-GRAF-06): großer Moment auf /fliesen im Schlitz
// zeichnungen.verband der WissensSeite. Vier Verlegemuster zum Ausprobieren als native Radiogruppe ohne JavaScript; die
// Wahl wirkt über :has() (Regeln in bewegung.css, Abschnitt verband): Kreuzfuge, Halb- und Drittelverband versetzen die
// Reihen desselben Plans (translate, Regeln des VerbandUmschalters wiederverwendet), Fischgrät blendet die Reihen aus und
// legt sein Muster eine Viertelplatte weit an den Platz (opacity, translate); Wechsel dauer-3 · ease-setzen. Linien 1,5 px
// wie die Plan-Vignetten (Planrahmen, currentColor): Fugen in Strich, Wand in Tinte, kein Rot (das Rot trägt die Leitachse).
// data-motion nur am fieldset: bewegung.mjs ordnet die Ebenen über closest() zu; eine unsichtbare Fischgrät-Ebene mit
// eigenem data-motion meldete die Prüfung „reduziert“ als Fehler. Ohne :has(): Wahl und Zeichnung ausgeblendet, die vier
// Beschreibungen stehen untereinander. Texte wörtlich aus _werkstatt/texte/fliesen.md. Serverkomponente.
import { useId } from 'react';
import clsx from 'clsx';
import { Linie, Planrahmen } from '@/components/kern/vignetten/zeichnen';
import Fotos, { type Foto } from '@/components/vorlagen/teile/Fotos';
import { RAND, RAUM, REIHEN, fischPfad, reihenDaten, reihenPfad, waagrechteFugen } from './geometrie';

export type Muster = 'kreuz' | 'halb' | 'drittel' | 'fisch';

const MUSTER: { id: Muster; name: string; satz: string }[] = [
  { id: 'kreuz', name: 'Kreuzfuge', satz: 'Die Fugen laufen gerade durch, in Reihen und Spalten wie ein Gitter. Gut passt das in Räume mit klaren Linien.' },
  { id: 'halb', name: 'Halbverband', satz: 'Jede zweite Reihe ist um eine halbe Fliese versetzt. Gut passt das in Wohnräume und auf den Balkon.' },
  { id: 'drittel', name: 'Drittelverband', satz: 'Jede Reihe ist um ein Drittel einer Fliese versetzt. Gut passt das zu großen Fliesen, die ruhig wirken sollen.' },
  { id: 'fisch', name: 'Fischgrät', satz: 'Rechteckige Fliesen liegen im rechten Winkel zueinander, wie beim Holzparkett. Gut passt das an eine Wand mit Nische.' },
];

const FOTOS: Foto[] = [
  { bild: 'fliesen-halbverband', unterschrift: 'Halbverband' },
  { bild: 'fliesen-fischgraet', unterschrift: 'Fischgrät' },
];

// Pfade einmal beim Laden des Moduls rechnen (Serverkomponente: nur das Ergebnis geht ins HTML)
const WAAGRECHT = waagrechteFugen();
const FISCH = fischPfad();
const REIHENLISTE = Array.from({ length: REIHEN }, (_, r) => ({ r, d: reihenPfad(r), ...reihenDaten(r) }));
const VIEWBOX = `${-RAND} ${-RAND} ${RAUM.b + 2 * RAND} ${RAUM.h + 2 * RAND}`;
const WAND = `M0 0H${RAUM.b}V${RAUM.h}H0Z`;

/** Draufsicht: Reihenverbände und Fischgrät als zwei Ebenen im selben Raum, beschnitten auf die Wand. */
function Zeichnung({ uid }: { uid: string }) {
  const clip = `muster-raum-${uid}`;
  return (
    <Planrahmen viewBox={VIEWBOX} className="text-tinte">
      <defs>
        <clipPath id={clip}>
          <rect x={0} y={0} width={RAUM.b} height={RAUM.h} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`} className="text-strich">
        <g className="muster-reihen">
          <Linie d={WAAGRECHT} />
          {REIHENLISTE.map((z) => (
            <g key={z.r} className="verband-reihe" data-halb={z.halb} data-drittel={z.drittel}>
              <Linie d={z.d} />
            </g>
          ))}
        </g>
        <g className="muster-fisch">
          <Linie d={FISCH} />
        </g>
      </g>
      <Linie d={WAND} />
    </Planrahmen>
  );
}

export default function VerbandProbe({ start = 'kreuz', fotos = true, className }: { start?: Muster; fotos?: boolean; className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9-]/g, '');
  const name = `muster-${uid}`;
  return (
    <div className={clsx('flex flex-col gap-12', className)}>
      <fieldset className="verband m-0 min-w-0 border-0 p-0" data-motion="verband">
        <legend className="muster-legende mb-4 font-text text-fs-3 font-semibold text-tinte">Wählen Sie ein Muster</legend>
        {/* mit :has(): die Wahl steht über der Zeichnung wie Reiter, die Zeichnung antwortet darunter */}
        <div className="verband-bewegt">
          <div className="@container">
            <div className="grid grid-cols-1 gap-px border border-strich bg-strich @xs:grid-cols-2 @2xl:grid-cols-4">
              {MUSTER.map((m) => (
                <label
                  key={m.id}
                  className="verband-wahl relative flex min-h-12 cursor-pointer items-center justify-center bg-fliese px-3 py-3 text-center font-text text-fs-2 font-semibold text-tinte decoration-1 underline-offset-4 has-checked:bg-tinte has-checked:text-kalk pointer-fine:hover:underline"
                >
                  <input
                    type="radio"
                    name={name}
                    value={m.id}
                    defaultChecked={m.id === start}
                    aria-describedby={`${name}-${m.id}`}
                    data-verband-wahl={m.id}
                    className="absolute inset-0 m-0 cursor-pointer appearance-none focus-visible:outline-none"
                  />
                  <span className="relative">{m.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="border-x border-b border-fuge bg-fliese p-4 lg:p-6">
            <Zeichnung uid={uid} />
          </div>
        </div>
        {/* Beschreibung des gewählten Musters: mit :has() alle vier in einer Rasterzelle (Höhe der längsten, kein Springen),
            sichtbar nur die gewählte; ohne :has() alle vier untereinander */}
        <div className="muster-texte mt-6 grid gap-4">
          {MUSTER.map((m) => (
            <p key={m.id} data-muster={m.id} className="muster-text max-w-mass font-text text-fs-3 text-pretty text-tinte-2">
              <span className="font-semibold text-tinte">{m.name}:</span>{' '}
              <span id={`${name}-${m.id}`}>{m.satz}</span>
            </p>
          ))}
        </div>
      </fieldset>
      {fotos && <Fotos fotos={FOTOS} spalten={2} />}
    </div>
  );
}

Hinweise für den Bau:
- Kein 'use client' und keine weiteren Hooks.
- Keine Klassen außer den oben genannten, kein style-Attribut, keine Farbe außer über Tokenklassen. Kein Rot in der Zeichnung.
- Den Wert von data-verband-wahl genau als kreuz | halb | drittel | fisch schreiben: CSS und Test hängen daran.
- Die Klassen verband, verband-bewegt, verband-reihe und verband-wahl nicht umbenennen: sie holen die vorhandenen Regeln.

## texte

[
 "Wählen Sie ein Muster [neu: sichtbare Legende der Radiogruppe, Alltagssprache in Sie-Form; steht auch für den Screenreader als Gruppenname]",
 "Kreuzfuge [wörtlich, fliesen.md Abschnitt 3: Name im Wahlfeld und am Anfang der Beschreibung]",
 "Halbverband [wörtlich: Name im Wahlfeld, in der Beschreibung und als Bildunterschrift]",
 "Drittelverband [wörtlich: Name im Wahlfeld und in der Beschreibung]",
 "Fischgrät [wörtlich: Name im Wahlfeld, in der Beschreibung und als Bildunterschrift]",
 "Kreuzfuge: Die Fugen laufen gerade durch, in Reihen und Spalten wie ein Gitter. Gut passt das in Räume mit klaren Linien. [wörtlich]",
 "Halbverband: Jede zweite Reihe ist um eine halbe Fliese versetzt. Gut passt das in Wohnräume und auf den Balkon. [wörtlich]",
 "Drittelverband: Jede Reihe ist um ein Drittel einer Fliese versetzt. Gut passt das zu großen Fliesen, die ruhig wirken sollen. [wörtlich]",
 "Fischgrät: Rechteckige Fliesen liegen im rechten Winkel zueinander, wie beim Holzparkett. Gut passt das an eine Wand mit Nische. [wörtlich]",
 "Alt-Text Foto fliesen-halbverband (aus src/config/arbeiten.ts, gleich wie fliesen.md): Balkon mit dunklen Rechteckfliesen, die versetzt verlegt sind",
 "Alt-Text Foto fliesen-fischgraet (aus src/config/arbeiten.ts, gleich wie fliesen.md): Grüne Fliesen im Fischgrätmuster an einer Wand mit großer Nische",
 "Gehört NICHT in den Moment, sondern als absatz des Wissensblocks mit zeichnung: 'verband' (E3-BAU-05), wörtlich, beide Absätze von Abschnitt 3 zusammen (4 Sätze): Zuerst prüfen wir den [[untergrund|Untergrund]]. Ist er eben und trocken genug, verlegen wir die Fliesen sauber, mit passenden Fugen und Übergängen. Wie die Fliesen angeordnet sind, bestimmt, wie eine Fläche wirkt. Hier sind vier Muster zum Ausprobieren."
]

## bewegung

Auslöser: Wahl in der Radiogruppe (Tippen, Klicken, Pfeiltasten, Leertaste). Die Wirkung kommt allein aus CSS :has(). Kein JavaScript, kein Beobachter, keine @keyframes, kein animation-timeline: es sind Zustandswechsel per transition. Animiert werden nur translate und opacity.

Wechsel zwischen Kreuzfuge, Halb- und Drittelverband:
- Die Reihen gleiten waagrecht auf ihren Versatz. Vorhandene Regeln: data-halb="1" um 40, data-drittel="1" um 26.667, data-drittel="2" um 53.333 Einheiten (½, ⅓, ⅔ Platte).
- Übergang `translate var(--dauer-3) var(--ease-setzen)` (vorhanden).

Wechsel zu Fischgrät:
- Ebene .muster-reihen: opacity 1 → 0 in var(--dauer-1) var(--ease-weg). Was geht, geht kurz.
- Ebene .muster-fisch: opacity 0 → 1 und translate -20px 0 → 0 (eine Viertelplatte von links an ihren Platz, dieselbe Achse wie der Reihenversatz) in var(--dauer-3) var(--ease-setzen).

Zurück von Fischgrät:
- .muster-fisch: opacity 1 → 0 und translate 0 → -20px in dauer-1 · ease-weg.
- .muster-reihen: opacity 0 → 1 in dauer-3 · ease-setzen. Die Reihen gleiten dabei auf den neuen Versatz.

ease-setzen schwingt nicht über: nichts federt, nichts läuft in Schleife.

Zustände (sichtbare Ebene, Versatz, Beschreibung) gelten ohne Startklasse, also auch ohne JavaScript und bei reduzierter Bewegung. Unter Startklassen stehen nur zwei Dinge:
- die transition-Angaben unter html.k-bewegung (wie beim Umschalter);
- der Anlauf, also translate -20px der nicht gewählten Fischgrät-Ebene, unter html.k-bewegung:not(.k-notaus).

Ersatzpfad:
- Ohne :has(): keine Zeichnung und keine Wahl (vorhandene Regel `.verband .verband-bewegt { display: none }`, neue Regel blendet die Legende aus). Die vier Beschreibungen stehen untereinander.
- Druck und forced-colors: transition none.

data-motion="verband" steht nur am fieldset. Das ist das Muster des VerbandUmschalters: bewegung.mjs ordnet die animierten g-Ebenen über closest('[data-motion]') zu. Ein eigenes data-motion an der Fischgrät-Ebene mit opacity 0 meldet `bewegung.mjs --modus reduziert` als unsichtbar.

Registereintrag: register.ts bleibt unverändert (verband ist schon mit Auslöser interaktion registriert). Paketdatei _werkstatt/register/verband.json, genau so:
{
  "kennung": "verband",
  "paket": "E3-GRAF-06",
  "kern": "3.4",
  "zweck": "Rückmeldung: Verlegemuster wechselt (Kreuzfuge, Halbverband, Drittelverband, Fischgrät)",
  "ausloeser": "interaktion",
  "ausloeser_detail": "Auswahl in einer nativen Radiogruppe (Tippen, Klicken, Pfeiltasten); Wirkung über CSS :has(), ohne JavaScript",
  "wechsel": { "dauer": "dauer-3", "kurve": "ease-setzen", "eigenschaften": ["translate", "opacity"] },
  "ausblenden": { "dauer": "dauer-1", "kurve": "ease-weg", "eigenschaften": ["opacity", "translate"], "wofuer": "die Ebene, die geht (Reihen oder Fischgrät)" },
  "anlauf": "Fischgrät-Ebene legt sich aus -20 Einheiten (eine Viertelplatte) nach rechts an ihren Platz, nur unter html.k-bewegung:not(.k-notaus)",
  "keyframes": [],
  "reduziert": "Sofortzustand: ohne html.k-bewegung kein Übergang und kein Anlauf",
  "ohne_js": "voll bedienbar (native Radiogruppe, CSS)",
  "ohne_has": "Wahl und Zeichnung ausgeblendet, alle vier Beschreibungen untereinander sichtbar",
  "druck_forced_colors": "keine Übergänge",
  "data_motion": "nur am fieldset (Ebenen über closest zugeordnet)",
  "wo": ["/fliesen"],
  "schlitz": "zeichnungen.verband (WissensSeite, Wissensblock mit zeichnung: 'verband')",
  "komponente": "src/components/momente/verband/VerbandProbe.tsx",
  "geometrie": "src/components/momente/verband/geometrie.ts",
  "css": "src/app/bewegung.css, Abschnitt verband (Orchestrator)",
  "register_ts": "vorhanden: verband { ausloeser: 'interaktion' } (keine Änderung)",
  "test": "test/verband.test.mjs",
  "budget": { "client_js_kb_gzip": 0, "css_kb_gzip": 0.5, "svg_kb_roh_je_instanz": 3.6, "svg_kb_gzip_je_instanz": 1.3 }
}

## reduziert

Bei prefers-reduced-motion: reduce setzt das Kopfskript html.k-bewegung nicht. Dann gibt es weder Übergang noch Anlauf, und die Wahl schaltet Reihenversatz, Ebenen und Beschreibung sofort um. Das ist der Sofortzustand laut K-007, Tabelle verband.

Bei html.k-notaus (das Bewegungsmodul hat sich nicht gemeldet) gibt es keinen Anlauf-Versatz. Die Übergänge bleiben erlaubt; sie sind harmlos und folgen dem Muster des Umschalters. Ohne JavaScript ist alles voll bedienbar und sichtbar. Druck und forced-colors: keine Übergänge.

Prüfbar mit `bewegung.mjs --modus reduziert`: 0 Animationen, 0 unsichtbare data-motion-Elemente.

## zugang

- Struktur: fieldset mit sichtbarer legend „Wählen Sie ein Muster“ als Gruppenname. Darin vier native Radiofelder mit gleichem name, eins vorgewählt (kreuz).
- Tastatur: Tab führt einmal in die Gruppe auf das gewählte Feld. Pfeiltasten wechseln und wählen zugleich, Leertaste wählt. Keine Tastenfalle, kein Skript.
- Name und Beschreibung: Jedes Feld heißt nach seinem umschließenden label (z. B. „Halbverband“). Die Beschreibung kommt über aria-describedby auf den span mit den beiden Sätzen, ohne den Namen davor; direkt referenzierter, versteckter Text zählt nach accname mit. Der Screenreader sagt also: „Halbverband, Optionsfeld, ausgewählt, 2 von 4, Jede zweite Reihe ist um eine halbe Fliese versetzt. …“. Es braucht keine Live-Region.
- Fokus: vorhandene Regel `.verband-wahl:has(input:focus-visible)` mit 2 px Tinte, nach innen versetzt. Neue Regel für das gewählte Feld: Umrandung in Kalk auf der Tintefläche (sonst unsichtbar, weil Fokus und Wahl bei Radiogruppen zusammenfallen). Kontrast Kalk auf Tinte etwa 17 : 1.
- Ziele: mindestens 48 px hoch, volle Zellbreite.
- Zustand: Das gewählte Feld ist umgekehrt gefärbt (Tinte mit Kalk) und hat die native checked-Semantik. Die Bedeutung hängt also nicht am Farbton.
- Hover: nur bei (hover: hover) und (pointer: fine) über `pointer-fine:hover:underline`.
- Zeichnung: dekorativ (Planrahmen setzt aria-hidden="true" und focusable="false"). Die Bedeutung trägt der Text. Die clipPath-ID ist je Instanz eindeutig (useId).
- Lesefolge: Legende, vier Felder, Beschreibung, zwei Fotos mit Alt-Text und Unterschrift.
- forced-colors: vorhandene Regel `.verband-wahl:has(input:checked)` mit 3 px CanvasText. Die Linien sind currentColor und erscheinen in Systemfarbe. Keine Übergänge.
- 200 % Schrift: Wahl und Fotos einspaltig über rem-Abfragen, kein seitliches Scrollen.
- Ohne :has(): Die Bedienelemente sind ausgeblendet, also nicht fokussierbar und nicht wirkungslos sichtbar. Alle vier Beschreibungen sind lesbar.

## budget

- Client-Komponente: nein. Serverkomponente ohne 'use client'; useId ist in Serverkomponenten erlaubt (Muster VerbandUmschalter). Zusätzliches JavaScript: 0 KB. Die Pfade werden einmal auf dem Server gerechnet.
- CSS in bewegung.css: etwa 1,8 KB roh, etwa 0,5 KB gzip (gemessen an der Vorlage im Scratchpad).
- SVG inline je Instanz: etwa 3,6 KB roh, etwa 1,3 KB gzip. Darin Fischgrät mit 40 Platten (Pfad etwa 2,1 KB), 5 Reihen mit je 8 Stößen, 4 Fugen und die Wand. Weit unter der Grenze von 40 KB gzip je Zeichnung (K-008, K-013).
- Texte: etwa 0,6 KB.
- Fotos: zwei vorhandene JPEG (Quelle 55 KB und 70 KB; Next liefert AVIF und WebP), verzögert geladen und unterhalb des ersten Bildschirms (Abschnitt spaet). Kein Einfluss auf LCP. CLS bleibt 0: Bilder mit festen Maßen, Beschreibungsfeld mit der festen Höhe des längsten Texts.
- Zum Bewegungsbudget von 60 KB gzip trägt der Moment nur die 0,5 KB CSS bei.

## dateien

[
 "src/components/momente/verband/geometrie.ts (neu: Raum, Platte, waagrechteFugen, stossfugen, reihenPfad, reihenDaten, inRaum, inDominorahmen, fischRechtecke, fischPfad; Code im Feld aufbau, Teil A)",
 "src/components/momente/verband/VerbandProbe.tsx (neu: Serverkomponente, export default VerbandProbe({ start?: Muster = 'kreuz', fotos?: boolean = true, className?: string }), export type Muster; Code im Feld aufbau, Teil B)",
 "_werkstatt/register/verband.json (neu: Registereintrag des Pakets; Inhalt im Feld bewegung)",
 "test/verband.test.mjs (neu: 7 Tests; Nr. 7 ist übersprungen, bis der Orchestrator das CSS übernommen hat; Code im Feld pruefung)"
]

## gemeinsam

[
 "src/app/bewegung.css, Einfügung A: direkt nach dem Ende des vorhandenen Blocks `@supports selector(:has(*)) { … html.k-bewegung .verband .verband-reihe { transition: translate var(--dauer-3) var(--ease-setzen); } }` (derzeit Zeile 150) und vor `@media print, (forced-colors: active) { .verband .verband-reihe …` einfügen:\n/* verband · Musterprobe /fliesen (E3-GRAF-06): vier Muster; Fischgrät als eigene Ebene, Beschreibung je Muster. Zustände\n   gelten ohne Startklasse (auch ohne JavaScript, reduziert sofort); nur Übergänge und der Anlauf der Fischgrät-Ebene hängen\n   an html.k-bewegung. Die Ebene, die geht, geht in dauer-1 · weg, die gewählte legt sich in dauer-3 · setzen. Fokus auf dem\n   gewählten (tintefarbenen) Feld in Kalk, sonst wäre der Rahmen unsichtbar (gilt auch für den VerbandUmschalter). */\n.verband-wahl:has(input:checked:focus-visible) {\n  outline-color: var(--color-kalk);\n}\n@supports selector(:has(*)) {\n  .verband .muster-fisch {\n    opacity: 0;\n  }\n  .verband:has([data-verband-wahl=\"fisch\"]:checked) .muster-fisch {\n    opacity: 1;\n  }\n  .verband:has([data-verband-wahl=\"fisch\"]:checked) .muster-reihen {\n    opacity: 0;\n  }\n  .verband .muster-text {\n    grid-area: 1 / 1;\n    visibility: hidden;\n  }\n  .verband:has([data-verband-wahl=\"kreuz\"]:checked) .muster-text[data-muster=\"kreuz\"],\n  .verband:has([data-verband-wahl=\"halb\"]:checked) .muster-text[data-muster=\"halb\"],\n  .verband:has([data-verband-wahl=\"drittel\"]:checked) .muster-text[data-muster=\"drittel\"],\n  .verband:has([data-verband-wahl=\"fisch\"]:checked) .muster-text[data-muster=\"fisch\"] {\n    visibility: visible;\n  }\n  html.k-bewegung:not(.k-notaus) .verband:not(:has([data-verband-wahl=\"fisch\"]:checked)) .muster-fisch {\n    translate: -20px 0;\n  }\n  html.k-bewegung .verband .muster-reihen {\n    transition: opacity var(--dauer-3) var(--ease-setzen);\n  }\n  html.k-bewegung .verband:has([data-verband-wahl=\"fisch\"]:checked) .muster-reihen {\n    transition: opacity var(--dauer-1) var(--ease-weg);\n  }\n  html.k-bewegung .verband .muster-fisch {\n    transition: opacity var(--dauer-1) var(--ease-weg), translate var(--dauer-1) var(--ease-weg);\n  }\n  html.k-bewegung .verband:has([data-verband-wahl=\"fisch\"]:checked) .muster-fisch {\n    transition: opacity var(--dauer-3) var(--ease-setzen), translate var(--dauer-3) var(--ease-setzen);\n  }\n}\n@supports not selector(:has(*)) {\n  .verband .muster-legende {\n    display: none;\n  }\n}\n(Vorlage: /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/verband/paket/gemeinsam/bewegung-verband.css; dort steht die Druckregel als eigener Block, im Repo stattdessen Änderung B.)",
 "src/app/bewegung.css, Änderung B: die vorhandene Regel\n@media print, (forced-colors: active) {\n  .verband .verband-reihe {\n    transition: none !important;\n  }\n}\nersetzen durch\n@media print, (forced-colors: active) {\n  .verband .verband-reihe,\n  .verband .muster-reihen,\n  .verband .muster-fisch {\n    transition: none !important;\n  }\n}",
 "package.json, scripts.test: ` test/verband.test.mjs` ans Ende der Dateiliste anhängen (nach test/orte.test.mjs).",
 "src/lib/motion/register.ts, _werkstatt/register.json, test/bewegung.test.mjs: keine Änderung (verband ist registriert, Auslöser interaktion).",
 "Vorlagen: kein neuer Schlitz (WissensSeite.zeichnungen und Block.zeichnung gibt es schon). Übergabe an E3-BAU-05 (dessen Dateien, nicht gemeinsam), bitte ins Briefing aufnehmen: In src/inhalte/fliesen.ts der Wissensblock { titel: 'Alles beginnt mit dem Boden.', absatz: '<Absatz 1> <Absatz 2 aus fliesen.md Abschnitt 3, endet mit „Hier sind vier Muster zum Ausprobieren.“>', zeichnung: 'verband' }. Die vier Mustersätze und die Fotos fliesen-halbverband und fliesen-fischgraet NICHT noch einmal als liste, karten oder Fotos eintragen, die trägt der Moment. In src/app/(bestand)/fliesen/page.jsx: `import VerbandProbe from '@/components/momente/verband/VerbandProbe';` und `<WissensSeite inhalt={FLIESEN} zeichnungen={{ verband: <VerbandProbe /> }} … />`. Die Importe von VerbandUmschalter und Planblatt entfernen (der Umschalter im Einstieg entfällt mit der Vorlage).",
 "Schaufenster vor dem Haiku-Lauf, damit Bild- und Bewegungsprüfungen möglich sind: neue Datei src/app/(bestand)/werkstatt-schaufenster/momente/page.dev.tsx. Sie rendert Einstieg (art=\"arbeit\", etikett=\"Schaufenster · nur Entwicklung\", titel=\"Große Momente\") und darunter in <Leitachse> den Block aus src/components/vorlagen/teile/Wissen mit nummer={1}, block={{ titel: 'Alles beginnt mit dem Boden.', absatz: '<beide Absätze wie oben>', zeichnung: 'verband' }} und zeichnung={<VerbandProbe />}. Vorlage, typgeprüft: /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/verband/paket/gemeinsam/schaufenster-momente.page.dev.tsx",
 "Optional _werkstatt/werkzeuge/bewegung.mjs Zeile 45: `const WAHL_FOLGEN = ['drittel', 'fisch', 'kreuz'];` und den Kommentar anpassen. So nimmt die Bildfolge auch Drittel → Fischgrät → Kreuz auf. Auf /fliesen/verlegemuster gibt es kein Feld fisch; dort wird die Folge mit einem Befundeintrag übersprungen.",
 "Optional KERN K-007, Zeile verband: Dauer · Kurve „dauer-3 · ease-setzen; die Ebene, die geht, dauer-1 · ease-weg“; Wo „/fliesen (Musterprobe, vier Muster), /fliesen/verlegemuster (VerbandUmschalter, drei Muster)“.",
 "Optional _werkstatt/bildplaetze.md, Zeilen fliesen-fischgraet und fliesen-halbverband: sizes auf den Wert des Bausteins Fotos mit spalten={2} setzen (`(min-width: 640px) 50vw, 100vw`), weil die Fotos bei 200 % Schrift einspaltig stehen."
]

## bildbedarf

[]

## pruefung

Vorab: Der Orchestrator setzt das CSS (Einfügung A und Änderung B), den Eintrag in package.json und die Schaufensterseite und startet den Entwicklungsserver 4320. Haiku startet keine Server.

1. Typen und Stil: `npx tsc --noEmit -p .` ohne Fehler in den Paketdateien. `npx eslint src/components/momente/verband test/verband.test.mjs` ergibt 0. `node _werkstatt/werkzeuge/werte.mjs --dateien src/components/momente/verband/VerbandProbe.tsx,src/components/momente/verband/geometrie.ts --ziel $SCRATCH/E3-GRAF-06/werte` ergibt 0 Befunde (an der Vorlage schon so gemessen).

2. Test: `node --experimental-strip-types --loader ./test/resolver.mjs --test test/verband.test.mjs`. Vor der CSS-Übernahme: 6 bestanden, 1 übersprungen (erwartet). Danach 7 bestanden; `npm test` alles grün. Inhalt von test/verband.test.mjs, 1:1:
// Musterprobe „verband“ (E3-GRAF-06, KERN v3.4 K-007): Geometrie von Fischgrät und Reihenverbänden, Versatz und Regeln in bewegung.css.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { RAUM, PLATTE, REIHEN, fischRechtecke, fischPfad, inDominorahmen, reihenDaten, reihenPfad, stossfugen, waagrechteFugen } from '../src/components/momente/verband/geometrie.ts';

const CSS = fs.readFileSync(new URL('../src/app/bewegung.css', import.meta.url), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

test('Verband 1: Fischgrät deckt den Raum lückenlos und ohne Überlappung', () => {
  const platten = fischRechtecke();
  let fehler = 0;
  for (let x = 0.37; x < RAUM.b; x += 1.7) {
    for (let y = 0.53; y < RAUM.h; y += 1.9) {
      const [u, v] = inDominorahmen(x, y);
      const n = platten.filter((f) => u > f.x && u < f.x + f.b && v > f.y && v < f.y + f.h).length;
      if (n !== 1) fehler++;
    }
  }
  assert.equal(fehler, 0);
});

test('Verband 2: jede Fischgrät-Platte hat das Maß der Reihenplatten', () => {
  for (const f of fischRechtecke()) {
    const liegend = f.b === PLATTE.b && f.h === PLATTE.h;
    const stehend = f.b === PLATTE.h && f.h === PLATTE.b;
    assert.ok(liegend || stehend, JSON.stringify(f));
  }
});

test('Verband 3: Fischgrät-Pfad bleibt klein, je Platte ein geschlossenes Viereck', () => {
  const d = fischPfad();
  const n = fischRechtecke().length;
  assert.ok(n >= 30 && n <= 60, `Platten: ${n}`);
  assert.equal((d.match(/Z/g) || []).length, n);
  assert.ok(d.length <= 4000, `Zeichen: ${d.length}`);
});

test('Verband 4: Kreuzfuge legt die Raummitte auf eine Stoßfuge, die Stöße reichen über beide Ränder', () => {
  const xs = stossfugen();
  assert.ok(xs.includes(RAUM.b / 2));
  assert.ok(Math.min(...xs) <= -PLATTE.b, 'links eine Platte Vorrat für den Versatz');
  assert.ok(Math.max(...xs) >= RAUM.b);
  for (let i = 1; i < xs.length; i++) assert.equal(xs[i] - xs[i - 1], PLATTE.b);
  assert.ok(reihenPfad(0).startsWith(`M${xs[0]} 0V${PLATTE.h}`));
  assert.equal((waagrechteFugen().match(/M/g) || []).length, REIHEN - 1);
});

test('Verband 5: Reihenmerkmale folgen dem Reihenversatz', () => {
  assert.equal(REIHEN, 5);
  const z = Array.from({ length: REIHEN }, (_, r) => reihenDaten(r));
  assert.deepEqual(z.map((d) => d.halb), ['0', '1', '0', '1', '0']);
  assert.deepEqual(z.map((d) => d.drittel), ['0', '1', '2', '0', '1']);
});

test('Verband 6: Versatz in bewegung.css passt zur Platte (½, ⅓, ⅔)', () => {
  const regel = (sel) => {
    const i = CSS.indexOf(sel);
    assert.ok(i >= 0, `Regel fehlt: ${sel}`);
    return CSS.slice(i, CSS.indexOf('}', i));
  };
  assert.match(regel('.verband-reihe[data-halb="1"]'), new RegExp(`translate: ${PLATTE.b / 2}px 0`));
  assert.match(regel('.verband-reihe[data-drittel="1"]'), new RegExp(`translate: ${(PLATTE.b / 3).toFixed(3)}px 0`));
  assert.match(regel('.verband-reihe[data-drittel="2"]'), new RegExp(`translate: ${((2 * PLATTE.b) / 3).toFixed(3)}px 0`));
});

const MIT_PROBE = CSS.includes('.muster-fisch');
test('Verband 7: Fischgrät-Ebene und Beschreibungen in bewegung.css (Übergänge nur unter html.k-bewegung)', { skip: !MIT_PROBE && 'CSS der Musterprobe noch nicht in bewegung.css übernommen' }, () => {
  assert.ok(CSS.includes('.verband:has([data-verband-wahl="fisch"]:checked) .muster-fisch'));
  assert.ok(CSS.includes(`translate: -${PLATTE.b / 4}px 0`));
  assert.ok(CSS.includes('transition: opacity var(--dauer-3) var(--ease-setzen), translate var(--dauer-3) var(--ease-setzen)'));
  for (const [, sel, rumpf] of CSS.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!sel.includes('muster-') || !rumpf.includes('transition') || rumpf.includes('none')) continue;
    assert.ok(sel.includes('html.k-bewegung'), `Übergang ohne Startklasse: ${sel.trim()}`);
  }
});

3. Bild: `einzelbild.mjs` auf /werkstatt-schaufenster/momente bei m390, d1440 und m390 mit 200 % Schrift. Erwartet:
- Konsole 0, Überlauf 0, Überlappung 0.
- m390: Wahl 2 × 2, Zeichnung etwa 326 px breit. d1440: Wahl in einer Reihe zu vier. 200 %: Wahl einspaltig.
- Kreuzfuge vorgewählt, Felder in Tinte, Fugen grau, kein Rot in der Zeichnung.
Zum Vergleich die Vorschaubilder unter /tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/verband/vorschau-*.png.

4. Zustände (Playwright mit installSperre, Skript unter $SCRATCH): Nacheinander jedes label anklicken und je Zustand nach 700 ms prüfen:
- Halbverband: computed translate von `.verband-reihe[data-halb="1"]` ist 40px.
- Fischgrät: `.muster-fisch` hat opacity 1, `.muster-reihen` opacity 0.
- Genau ein `.muster-text` ist visibility visible, und zwar der mit data-muster gleich dem gewählten Wert.
- Die Höhe von `.muster-texte` ist in allen vier Zuständen gleich.

5. Tastatur: Tab, bis document.activeElement ein `[data-verband-wahl]` ist, dann dreimal ArrowRight. Danach ist fisch gewählt. Der Fokusrahmen auf dem tintefarbenen Feld ist sichtbar (outline-color des label entspricht --color-kalk).

6. Ohne JavaScript (Kontext mit javaScriptEnabled false): Klick auf „Halbverband“ setzt translate 40px, ohne Übergang. reducedMotion 'reduce': Wechsel sofort.

7. Bewegung: `node _werkstatt/werkzeuge/bewegung.mjs --modus einzelbilder --seite /werkstatt-schaufenster/momente --kennung verband --ansicht m390`. Erwartet die Folgen kreuz → drittel und drittel → kreuz, laengste_dauer_ms 600. `--modus reduziert` ergibt 0 unsichtbar. `--modus register` ergibt verband bekannt und keine Animation ohne data-motion.

8. SVG: `node _werkstatt/werkzeuge/svg.mjs --seiten /werkstatt-schaufenster/momente` ergibt keine doppelten IDs, das SVG ist aria-hidden.

9. `git status --porcelain`: neu sind nur die vier Paketdateien.

## risiken

[
 "Die Klasse `verband` teilen sich Musterprobe und VerbandUmschalter. Die neuen Regeln zielen nur auf `.muster-*` und treffen den Umschalter nicht. Ausnahme: die neue Fokusregel `.verband-wahl:has(input:checked:focus-visible)` gilt auch dort. Das ist gewollt, denn dort war der Fokusrahmen auf dem gewählten Tintefeld bisher unsichtbar (2 px Tinte innen auf Tinte).",
 "Doppelter Text, wenn E3-BAU-05 die vier Mustersätze oder die zwei Fotos zusätzlich als liste, karten oder Fotos einträgt, oder wenn der Block-absatz nicht mit „Hier sind vier Muster zum Ausprobieren.“ endet. Deshalb steht die Übergabe im Briefing von BAU-05 (Liste gemeinsam).",
 "Mit dem Umbau auf die WissensSeite verschwindet der VerbandUmschalter aus dem Einstieg von /fliesen (die Vorlage hat keinen Rand-Platz). Er bleibt auf /fliesen/verlegemuster mit drei Mustern. Ob diese Seite später VerbandProbe mit fotos={false} bekommt, entscheidet der Orchestrator.",
 "bewegung.mjs wählt nur 'drittel' und 'kreuz' (WAHL_FOLGEN). Den Übergang zu Fischgrät nimmt das Werkzeug erst nach der optionalen Änderung auf. Bis dahin deckt Prüfschritt 4 Fischgrät ab.",
 "Ohne :has() (Browser vor Ende 2023) fehlt die Zeichnung, nur die vier Beschreibungen stehen da. Annehmbar, weil :has() seit 2023 Baseline ist und kein Inhalt verloren geht.",
 "Die Fotos nutzen die sizes des Bausteins Fotos, nicht die aus bildplaetze.md. Am Desktop wird dadurch etwas größer geladen, bei 200 % Schrift (einspaltig) dafür nicht zu klein. Die Quellen sind höchstens 800 px breit, der Unterschied ist gering.",
 "margin-bottom an der legend wirkt in allen aktuellen Engines. Fehlt der Abstand im Bild, die legend nicht umbauen, sondern melden.",
 "Die legend „Wählen Sie ein Muster“ und die Bildunterschriften sind neuer Text. Er sollte durch die Lektorprüfung (textpruefung.mjs, lesbarkeit.mjs) gehen.",
 "Test 7 ist übersprungen, bis der Orchestrator das CSS übernimmt. Haiku meldet das als erwartet, nicht als Fehler.",
 "Der Moment bindet Fotos aus vorlagen/teile ein (Abhängigkeit vom Vorlagenteil). Wenn das nicht gewünscht ist, stattdessen Bildfeld direkt in einem Raster mit gap-px verwenden."
]

