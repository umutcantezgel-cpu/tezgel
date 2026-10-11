// Pfeillink und Rücklink (P4-02, gemeinsam seit P4-10a): Wege mit Pfeil – Verweis auf eine Unterseite („Küche fliesen →“)
// und Rücksprung („← Zurück zur Ratgeber-Übersicht“). Trefferfläche 48 px hoch, Unterstreichung in Strich (Hover/aktiv:
// 2 px Tinte), Fokus 2 px Tinte am Link (K-006). Kein Rot.
import Link from 'next/link';
import type { ReactNode } from 'react';
import { fokus, verbinde } from '@/components/kern/basis';
import { istIntern } from '@/components/kern/basis/klassen';
import Icon from '@/components/kern/icons/Icon';
import type { IconName } from '@/components/kern/icons/geometrie';
import { UMBRUCH } from '@/components/kern/vorlagen/teile/typen';

const PFEILLINK = verbinde(
  'group inline-flex min-h-k-7 max-w-full items-center gap-k-2 rounded-k-1 k-text text-k-2 font-semibold text-k-tinte',
  fokus(),
);
const PFEILLINK_TEXT = verbinde(
  UMBRUCH,
  'underline decoration-1 underline-offset-4 decoration-k-strich pointer-fine:group-hover:decoration-2 pointer-fine:group-hover:decoration-k-tinte group-active:decoration-2 group-active:decoration-k-tinte',
);

/** Weg mit Pfeil (Verweis auf Unterseite, „Mehr …“). */
export function Pfeillink({ href, children, ariaLabel, zeichen = 'pfeil', className }: { href: string; children: ReactNode; ariaLabel?: string; zeichen?: IconName; className?: string }) {
  const inhalt = (
    <>
      <span className={PFEILLINK_TEXT}>{children}</span>
      <span aria-hidden="true" className="flex shrink-0">
        <Icon name={zeichen} groesse={20} />
      </span>
    </>
  );
  return istIntern(href) ? (
    <Link href={href} aria-label={ariaLabel} data-motion="zustand" className={verbinde(PFEILLINK, className)}>
      {inhalt}
    </Link>
  ) : (
    <a href={href} aria-label={ariaLabel} data-motion="zustand" className={verbinde(PFEILLINK, className)}>
      {inhalt}
    </a>
  );
}

/** Rücksprung („Zurück zur … Übersicht“): Textlink mit Pfeil nach links. */
export function Ruecklink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} data-motion="zustand" className={PFEILLINK}>
      <span aria-hidden="true" className="flex shrink-0">
        <Icon name="pfeil" richtung="links" groesse={20} />
      </span>
      <span className={PFEILLINK_TEXT}>{children}</span>
    </Link>
  );
}
