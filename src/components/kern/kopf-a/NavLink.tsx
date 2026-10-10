'use client';

// Navigationslink des Kopfs (Variante A): liest den Pfad selbst (usePathname, auch im Server-HTML richtig, SSG).
// `aria-current="page"` nur am exakten Ziel. Aktiver Bereich bzw. Punkt sichtbar nicht nur über Farbe:
// - marke="balken": 2-px-Strich in Tinte an der Unterkante des Felds (das Feld trägt `relative`), die Fuge wird Strich;
// - marke="lot": 2-px-Strich in Tinte am linken Rand des Felds (das Feld trägt `relative`).
// `data-aktiv` steht am Link für Gestaltung über `data-aktiv:`.
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export type NavLinkProps = {
  href: string;
  /** Pfade, unter denen der Link als aktiver Bereich gilt (Präfix-Treffer). Ohne Angabe: nur das exakte Ziel. */
  pfade?: readonly string[];
  marke?: 'balken' | 'lot' | 'keine';
  prefetch?: boolean;
  className?: string;
  children: ReactNode;
};

const trifft = (pfad: string, ziel: string) => pfad === ziel || pfad.startsWith(`${ziel}/`);

export default function NavLink({ href, pfade, marke = 'keine', prefetch, className, children }: NavLinkProps) {
  const pfad = usePathname() ?? '';
  const exakt = pfad === href;
  const aktiv = pfade ? pfade.some((p) => trifft(pfad, p)) : exakt;
  return (
    <Link
      href={href}
      prefetch={prefetch}
      aria-current={exakt ? 'page' : undefined}
      data-aktiv={aktiv ? '' : undefined}
      data-motion="zustand"
      className={className}
    >
      {children}
      {marke === 'balken' && aktiv ? (
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-(--k-linie-2) bg-k-tinte" />
      ) : null}
      {marke === 'lot' && aktiv ? (
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-(--k-linie-2) bg-k-tinte" />
      ) : null}
    </Link>
  );
}
