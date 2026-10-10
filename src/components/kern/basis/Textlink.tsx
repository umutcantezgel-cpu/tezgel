// Textlink (K-011): im Fließtext, erkennbar an der Unterstreichung (nicht nur an der Farbe).
// Ruhe: Linie Strich 1 px · Hover (feiner Zeiger) und :active: Linie Tinte 2 px · Fokus: 2 px Tinte (auf Tinte Kalk), Ecken 2 px.
// Register `zustand`. Schriftgröße erbt er vom Satz; Links im Fließtext sind von der Mindest-Trefferfläche ausgenommen (WCAG 2.5.8).
import Link from 'next/link';
import type { ComponentPropsWithRef } from 'react';
import { fokus, istIntern, verbinde, type Grund } from '@/components/kern/basis/klassen';

export type TextlinkProps = Omit<ComponentPropsWithRef<'a'>, 'href'> & {
  href: string;
  auf?: Grund;
};

const FARBE: Record<Grund, string> = {
  hell: 'text-k-tinte decoration-k-strich pointer-fine:hover:decoration-k-tinte active:decoration-k-tinte',
  tinte: 'text-k-kalk decoration-k-nacht-2 pointer-fine:hover:decoration-k-kalk active:decoration-k-kalk',
};

export default function Textlink({ href, auf = 'hell', className, children, ...rest }: TextlinkProps) {
  const klassen = verbinde(
    'rounded-k-1 underline decoration-1 underline-offset-4 pointer-fine:hover:decoration-2 active:decoration-2',
    FARBE[auf],
    fokus(auf),
    className,
  );
  if (istIntern(href)) {
    return (
      <Link {...rest} href={href} data-motion="zustand" className={klassen}>
        {children}
      </Link>
    );
  }
  return (
    <a {...rest} href={href} data-motion="zustand" className={klassen}>
      {children}
    </a>
  );
}
