'use client';

// Eine Gruppe des Seitenindex im Fuß (K-009): ab sm immer offen; mobil nach dem Laden zugeklappt, der Gruppenname ist dann
// ein Schalter (≥ 44 px, aria-expanded). Ohne JavaScript bleibt alles offen, kein Link geht verloren (Sichtprüfung E2:
// der Fuß war mobil 35 % der Seite). Der Fuß steht unter dem ersten Bildschirm, das Zuklappen verschiebt nichts Sichtbares.
import { useId, useState, useSyncExternalStore, type ReactNode } from 'react';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';

const MOBIL = '(width < 40rem)';

function abonniere(melde: () => void) {
  const m = window.matchMedia(MOBIL);
  m.addEventListener('change', melde);
  return () => m.removeEventListener('change', melde);
}

/** mobil? Auf dem Server und beim Hydrieren „nein“ (alles offen), danach der echte Wert. */
function useMobil(): boolean {
  return useSyncExternalStore(abonniere, () => window.matchMedia(MOBIL).matches, () => false);
}

export default function FussGruppe({ titel, kopfKlassen, children }: { titel: string; kopfKlassen: string; children: ReactNode }) {
  const mobil = useMobil();
  const [gewaehlt, setGewaehlt] = useState<boolean | null>(null);
  const offen = gewaehlt ?? !mobil;
  const id = useId();
  return (
    <nav aria-label={titel}>
      <p className={clsx(kopfKlassen, 'border-b border-nacht-fuge pb-2 max-sm:hidden')}>{titel}</p>
      <button
        type="button"
        aria-expanded={offen}
        aria-controls={id}
        onClick={() => setGewaehlt(!offen)}
        className={clsx(kopfKlassen, 'flex min-h-11 w-full items-center justify-between border-b border-nacht-fuge sm:hidden')}
        data-motion="zustand"
      >
        <span>{titel}</span>
        <Icon name={offen ? 'minus' : 'plus'} groesse={4} />
      </button>
      <div id={id} className={clsx(!offen && 'max-sm:hidden')}>
        {children}
      </div>
    </nav>
  );
}
