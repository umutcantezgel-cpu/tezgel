'use client';

// Absende-Knopf eines Formulars (P3-03b): sperrt sofort, sobald gesendet wird, zeigt die Ladeanzeige aber erst nach 300 ms
// und dann mindestens 500 ms (useLadeanzeige). Ohne JavaScript ist er ein gewöhnlicher Submit-Knopf.
//
// Sperre ohne Fokusverlust (gemessen in Chromium 141, Rückgabe P3-03 Nachtrag):
// - natives `disabled` am fokussierten Knopf setzt den Fokus auf <body> zurück (Screenreader verlieren die Stelle);
// - `type="button"` hebt zwar den Klick auf, lässt aber ein Formular mit nur einem Feld per Enter implizit absenden.
// Darum bleibt er type="submit", fokussierbar und aria-disabled, und bricht im gesperrten Zustand den Klick ab.
// Implizites Absenden feuert nach HTML einen Klick am Standardknopf; ist der abgebrochen, wird nicht gesendet.
// So sind Mausklick, Enter/Leertaste am Knopf und Enter in einem Feld gesperrt, und der Fokus bleibt, wo er ist.
import type { MouseEvent } from 'react';
import { KnopfInhalt, knopfKlassen, type KnopfAlsButton } from '@/components/kern/basis/Knopf';
import { useLadeanzeige } from '@/components/kern/basis/useLadeanzeige';

export type SendeKnopfProps = Omit<KnopfAlsButton, 'laedt' | 'beschaeftigt' | 'type'> & {
  /** true, solange die Anfrage läuft */
  sendet: boolean;
};

export default function SendeKnopf({ sendet, art, groesse, auf, breit, deaktiviert, ladetext, vorne, hinten, children, className, onClick, ...rest }: SendeKnopfProps) {
  const anzeige = useLadeanzeige(sendet);
  const gesperrt = Boolean(deaktiviert || sendet || anzeige);

  const klick = (e: MouseEvent<HTMLButtonElement>) => {
    if (gesperrt) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <button
      {...rest}
      type="submit"
      onClick={klick}
      aria-disabled={gesperrt || undefined}
      aria-busy={sendet || anzeige || undefined}
      data-motion={gesperrt ? undefined : 'druck'}
      className={knopfKlassen({ art, groesse, auf, breit, deaktiviert, laedt: anzeige, className })}
    >
      <KnopfInhalt vorne={vorne} hinten={hinten} laedt={anzeige} ladetext={ladetext}>
        {children}
      </KnopfInhalt>
    </button>
  );
}
