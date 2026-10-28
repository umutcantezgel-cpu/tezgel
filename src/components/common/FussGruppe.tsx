'use client';

// Eine Gruppe des Seitenindex im Fuß (K-009): breit immer offen; am Handy nach dem Laden zugeklappt, der Gruppenname ist dann
// ein Schalter (≥ 44 px, aria-expanded). Ohne JavaScript bleibt alles offen, kein Link geht verloren (Sichtprüfung E2:
// der Fuß war mobil 35 % der Seite). Der Fuß steht unter dem ersten Bildschirm, das Zuklappen verschiebt nichts Sichtbares.
// „Handy“ heißt schmal oder flach (quer, höchstens 32rem hoch; Varianten fuss-zu und fuss-offen in globals.css, dieselbe
// Grenze wie Kopf und untere Leiste): Vorher zählte nur die Breite, auf q844 standen alle Gruppen offen, der Fuß maß rund
// sieben Bildschirmhöhen (UM-E3-FIX F6, Prüfung Teil B).
import { useId, useState, useSyncExternalStore, type ReactNode } from 'react';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';

const MOBIL = '(width < 40rem), (orientation: landscape) and (height <= 32rem)';

function abonniere(melde: () => void) {
  const m = window.matchMedia(MOBIL);
  m.addEventListener('change', melde);
  return () => m.removeEventListener('change', melde);
}

/** mobil? Auf dem Server und beim Hydrieren „nein“ (alles offen), danach der echte Wert. */
function useMobil(): boolean {
  return useSyncExternalStore(abonniere, () => window.matchMedia(MOBIL).matches, () => false);
}

export default function FussGruppe({ titel, kopfKlassen, className, children }: { titel: string; kopfKlassen: string; className?: string; children: ReactNode }) {
  const mobil = useMobil();
  const [gewaehlt, setGewaehlt] = useState<boolean | null>(null);
  const offen = gewaehlt ?? !mobil;
  const id = useId();
  return (
    <nav aria-label={titel} className={className}>
      <p className={clsx(kopfKlassen, 'border-b border-nacht-fuge pb-2 fuss-zu:hidden')}>{titel}</p>
      <button
        type="button"
        aria-expanded={offen}
        aria-controls={id}
        onClick={() => setGewaehlt(!offen)}
        className={clsx(kopfKlassen, 'flex min-h-11 w-full items-center justify-between border-b border-nacht-fuge fuss-offen:hidden')}
        data-motion="zustand"
      >
        <span>{titel}</span>
        <Icon name={offen ? 'minus' : 'plus'} groesse={4} />
      </button>
      <div id={id} className={clsx(!offen && 'fuss-zu:hidden')}>
        {children}
      </div>
    </nav>
  );
}
