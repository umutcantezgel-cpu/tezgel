// Fugenlinie (K-010 Trenner „Fugenlinie mit Kreuz“): 1-px-Fuge mit Fugenkreuz am Anfang, in der Mitte oder am Ende.
// Standard dekorativ (aria-hidden); trennt={true} meldet einen inhaltlichen Wechsel als role="separator".
// Kreuz in Strich (Grafik, 3,29 : 1); ton="laser" nur dort, wo die Linie auf der Achse liegt (K-003: ein Rot je Bildschirmhöhe).
import { Fugenkreuz } from '@/components/kern/basis/Zeichen';
import { verbinde, type Grund } from '@/components/kern/basis/klassen';

export type FugenlinieProps = {
  kreuz?: 'anfang' | 'mitte' | 'ende';
  ton?: 'strich' | 'tinte' | 'laser';
  auf?: Grund;
  trennt?: boolean;
  className?: string;
};

const KREUZ_HELL = { strich: 'text-k-strich', tinte: 'text-k-tinte', laser: 'text-k-laser' } as const;
const KREUZ_TINTE = { strich: 'text-k-nacht-2', tinte: 'text-k-kalk', laser: 'text-k-laser' } as const;

export default function Fugenlinie({ kreuz = 'anfang', ton = 'strich', auf = 'hell', trennt = false, className }: FugenlinieProps) {
  const linie = verbinde('h-px min-w-0 flex-1', auf === 'tinte' ? 'bg-k-nacht-fuge' : 'bg-k-fuge');
  const zeichen = (
    <span className={verbinde('flex shrink-0', auf === 'tinte' ? KREUZ_TINTE[ton] : KREUZ_HELL[ton])}>
      <Fugenkreuz className="size-k-4" />
    </span>
  );
  return (
    <div
      role={trennt ? 'separator' : undefined}
      aria-hidden={trennt ? undefined : true}
      className={verbinde('flex w-full items-center', className)}
    >
      {kreuz !== 'anfang' ? <span className={linie} /> : null}
      {zeichen}
      {kreuz !== 'ende' ? <span className={linie} /> : null}
    </div>
  );
}
