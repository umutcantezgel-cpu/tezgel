// Etikett (K-012 Klasse 3): Form und Ort für bestehende Badges und Eyebrows – der Wortlaut bleibt, nur die Gestalt ändert sich.
// IBM Plex Mono, Satzschreibung, keine Versalien-Sperrung (K-005). Optional 1-px-Rahmen (Feldkopf) und Fugenkreuz als Markierung.
// Kein Bedienelement: keine Hover-/Fokuszustände; Farbe Tinte-2 (7,22 : 1) bzw. auf Tinte Nacht-Text (8,45 : 1).
import type { HTMLAttributes, ReactNode } from 'react';
import { Fugenkreuz } from '@/components/kern/basis/Zeichen';
import { verbinde, type Grund } from '@/components/kern/basis/klassen';

export type EtikettProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  /** 1-px-Rahmen in Strich (auf Tinte Nacht-Text) */
  rahmen?: boolean;
  /** Fugenkreuz vor dem Text */
  kreuz?: boolean;
  /** neben = Tinte-2 (Standard) · tinte = volle Tinte */
  ton?: 'neben' | 'tinte';
  auf?: Grund;
  als?: 'span' | 'p' | 'div' | 'li' | 'dt' | 'dd';
};

const TON: Record<Grund, Record<'neben' | 'tinte', string>> = {
  hell: { neben: 'text-k-tinte-2', tinte: 'text-k-tinte' },
  tinte: { neben: 'text-k-nacht-2', tinte: 'text-k-kalk' },
};

export default function Etikett({ children, rahmen = false, kreuz = false, ton = 'neben', auf = 'hell', als: Element = 'span', className, ...rest }: EtikettProps) {
  return (
    <Element
      {...rest}
      className={verbinde(
        'inline-flex w-fit max-w-full items-start gap-k-2 k-mono text-k-1',
        TON[auf][ton],
        rahmen && 'rounded-k-0 border px-k-2 py-k-1',
        rahmen && (auf === 'tinte' ? 'border-k-nacht-2' : 'border-k-strich'),
        className,
      )}
    >
      {kreuz ? (
        <span className="flex h-lh shrink-0 items-center">
          <Fugenkreuz className="size-k-3" />
        </span>
      ) : null}
      <span className="min-w-0">{children}</span>
    </Element>
  );
}
