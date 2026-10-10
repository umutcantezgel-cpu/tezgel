// Feldraster (KERN K-005 „Fuge statt Karte“): Felder ohne Zwischenraum, getrennt nur durch 1-px-Fugen.
import type { ReactNode, ElementType } from 'react';
import clsx from 'clsx';

const SPALTEN = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
} as const;

export function Feldraster({ spalten = 3, als = 'ul', className, children }: { spalten?: 2 | 3 | 4; als?: ElementType; className?: string; children: ReactNode }) {
  const Tag = als;
  return <Tag className={clsx('grid grid-cols-1 gap-px border border-fuge bg-fuge', SPALTEN[spalten], className)}>{children}</Tag>;
}

export function Feld({ als = 'li', spanne, className, children }: { als?: ElementType; spanne?: 2; className?: string; children: ReactNode }) {
  const Tag = als;
  return <Tag className={clsx('flex flex-col bg-fliese p-6 lg:p-8', spanne === 2 && 'md:col-span-2', className)}>{children}</Tag>;
}

export default Feldraster;
