// Großer Moment `gefaelle-balkon` (KERN v3.4 K-007, K-008; E3-GRAF-04) für /balkon-terrasse, Schlitz momente.tun der
// ErzaehlSeite: Schnitt durch einen Balkon. Ein Regentropfen fällt auf die Platten, läuft über das Gefälle zur Kante, über
// das Tropfblech in die Rinne und bleibt dort liegen; hinter ihm erscheinen die Pfeile des Wasserwegs. Auslöser Sicht 0,4
// (Register), dauer-5 linear, einmal; CSS in src/app/bewegung.css. Gezeichnet ist der Endzustand (Tropfen in der Rinne, alle
// Pfeile): ohne JavaScript, bei reduzierter Bewegung, nach dem Notaus, im Druck und bei erzwungenen Farben stehen die Pfeile
// still. Die Zeichnung ist dekorativ (aria-hidden über Planrahmen); was sie zeigt, sagen Unterschrift und Liste darunter.
// Linien 1,5 px wie die Plan-Vignetten, Töne über `color` (Strich für Schraffur und Fugen, Tinte für Bauteile und Wasser),
// kein Rot, keine IDs, kein Text im SVG. Serverkomponente ohne JavaScript.
import type { CSSProperties } from 'react';
import clsx from 'clsx';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { Linie, Planrahmen, schraffur } from '@/components/kern/vignetten/zeichnen';
import { ABDICHTUNG, BETON, ESTRICH, FUGEN, PFEILE, PLATTEN, RINNE, TROPFEN, TROPFKANTE, VIEWBOX, WAND } from './geometrie';

/** Hauswand und Betonplatte im Schnitt */
const SCHNITT = schraffur(8, 20, 20, 100) + schraffur(28, 96, 172, 16, 4);

const LEGENDE = [
  'Die Platten liegen leicht schräg, weg vom Haus. So läuft der Regen zum Rand.',
  'Darunter liegt eine wasserdichte Schicht, die Abdichtung. Sie schützt den Beton.',
  'Am Rand tropft das Wasser über eine Blechkante in die Rinne.',
];

type Stil = CSSProperties & Record<`--${string}`, number>;

export default function GefaelleBalkon({ className }: { className?: string }) {
  return (
    <figure className={clsx('mx-auto max-w-mass text-tinte', className)}>
      <div data-motion="gefaelle-balkon" className="border border-fuge bg-fliese p-4 lg:p-6">
        <Planrahmen viewBox={VIEWBOX}>
          <g className="text-strich">
            <Linie d={SCHNITT} />
            <Linie d={FUGEN} />
          </g>
          <Linie d={WAND + BETON + ESTRICH} />
          <Linie d={ABDICHTUNG} />
          <Linie d={PLATTEN} />
          <Linie d={TROPFKANTE + RINNE} />
          {PFEILE.map((p) => (
            <Linie key={p.d} d={p.d} className="gefaelle-balkon-pfeil" style={{ '--ab': p.ab } as Stil} />
          ))}
          <Linie d={TROPFEN} fill="currentColor" className="gefaelle-balkon-tropfen" />
        </Planrahmen>
      </div>
      <figcaption className="mt-4 font-text text-fs-3">
        <p className="font-semibold text-pretty text-tinte">Der Regen läuft vom Balkon ab.</p>
        <ul className="mt-3 grid gap-2 text-tinte-2">
          {LEGENDE.map((satz) => (
            <li key={satz} className="flex gap-3">
              <Fugenkreuz className="mt-2 size-3 text-strich" />
              <span className="min-w-0 flex-1 text-pretty hyphens-auto">{satz}</span>
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
