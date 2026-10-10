'use client';

// Absende-Knopf eines Formulars: sperrt sofort (aria-busy, kein zweites Absenden, Fokus bleibt),
// zeigt die Ladeanzeige aber erst nach 300 ms und dann mindestens 500 ms (useLadeanzeige).
// Ohne JavaScript ist er ein gewöhnlicher Submit-Knopf.
import Knopf, { type KnopfAlsButton } from '@/components/kern/basis/Knopf';
import { useLadeanzeige } from '@/components/kern/basis/useLadeanzeige';

export type SendeKnopfProps = Omit<KnopfAlsButton, 'laedt' | 'beschaeftigt'> & {
  /** true, solange die Anfrage läuft */
  sendet: boolean;
};

export default function SendeKnopf({ sendet, type = 'submit', ...props }: SendeKnopfProps) {
  const anzeige = useLadeanzeige(sendet);
  return <Knopf {...props} type={type} beschaeftigt={sendet} laedt={anzeige} />;
}
