'use client';

// Inhalt eines Knopfs während des Ladens (K-010, UM-E3-ZUST-M): Die Ladezeile mit laufender Fuge erscheint erst nach der
// Ladeschwelle (300 ms) und bleibt mindestens 500 ms. Eigene kleine Client-Einheit, damit Knopf ohne Laden Server-tauglich bleibt.
import type { ReactNode } from 'react';
import { useLadeschwelle } from '@/lib/ladeschwelle';

export default function LadeInhalt({ laedt, ladeText, children }: { laedt: boolean; ladeText: string; children: ReactNode }) {
  const zeigen = useLadeschwelle(laedt);
  if (!zeigen) return <>{children}</>;
  return (
    <span className="flex flex-col items-center gap-2">
      <span>{ladeText}</span>
      <span className="laden-fuge w-16" data-motion="laden" aria-hidden="true" />
    </span>
  );
}
