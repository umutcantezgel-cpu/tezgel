'use client';
// Bewegungsschalter „Bewegung: an | ruhig“ (KERN v4, UM-E3-MOD, E-080) im Fuß und im Menü: zwei Knöpfe mit aria-pressed in
// einer benannten Gruppe. Die Wahl gilt sofort und je Gerät (waehleBewegung). Wünscht das Gerät reduzierte Bewegung, steht
// „ruhig“ fest: „an“ ist dann aria-disabled (bleibt mit der Tastatur erreichbar), ein Hinweis nennt den Grund. Auf dem
// Server und bis zur Hydrierung zeigt er „an“, danach den wirklichen Stand.
import { useId, useSyncExternalStore } from 'react';
import clsx from 'clsx';
import { waehleBewegung } from '@/lib/motion/bewegung';
import { abonniereBewegung, bewegungRuhig, systemRuhig } from '@/lib/motion/schalter';

type Stand = 'an' | 'ruhig' | 'geraet';
const lese = (): Stand => (systemRuhig() ? 'geraet' : bewegungRuhig() ? 'ruhig' : 'an');
const vorHydrierung = (): Stand => 'an';

const knopfGrund =
  'inline-flex min-h-11 min-w-11 items-center justify-center border px-3 font-text text-fs-1 focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:pointer-events-none aria-disabled:opacity-50';
const knopfHell =
  'border-strich bg-fliese text-tinte hover:border-tinte aria-pressed:border-tinte aria-pressed:bg-tinte aria-pressed:text-kalk focus-visible:outline-tinte';
const knopfDunkel =
  'border-nacht-fuge bg-tinte text-kalk hover:border-kalk aria-pressed:border-kalk aria-pressed:bg-kalk aria-pressed:text-tinte focus-visible:outline-kalk';

export default function BewegungsSchalter({ dunkel = false, className }: { dunkel?: boolean; className?: string }) {
  const id = useId();
  const stand = useSyncExternalStore(abonniereBewegung, lese, vorHydrierung);
  const ruhig = stand !== 'an';
  const geraet = stand === 'geraet';
  const knopf = clsx(knopfGrund, dunkel ? knopfDunkel : knopfHell);

  return (
    <div role="group" aria-labelledby={`${id}-name`} className={clsx('flex flex-wrap items-center gap-x-3 gap-y-1', className)}>
      <span id={`${id}-name`} className="font-text text-fs-1">
        Bewegung
      </span>
      <span className="inline-flex">
        <button
          type="button"
          className={knopf}
          aria-pressed={!ruhig}
          aria-disabled={geraet || undefined}
          aria-describedby={geraet ? `${id}-hinweis` : undefined}
          onClick={() => {
            if (!geraet) waehleBewegung('an');
          }}
          data-motion="zustand"
        >
          an
        </button>
        <button type="button" className={clsx(knopf, '-ml-px')} aria-pressed={ruhig} onClick={() => waehleBewegung('ruhig')} data-motion="zustand">
          ruhig
        </button>
      </span>
      {geraet && (
        <span id={`${id}-hinweis`} className="font-text text-fs-1">
          Ihr Gerät ist auf weniger Bewegung eingestellt.
        </span>
      )}
    </div>
  );
}
