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
