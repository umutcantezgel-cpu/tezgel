// Auswahlknopf (Radio) (K-011): eigene Darstellung, natives <input type="radio"> bleibt bedienbar (Pfeiltasten in der Gruppe).
// K-008 kennt nur die Radien 0 und 2 px – darum eckig wie die Checkbox; unterschieden wird über das Zeichen:
// gesetzt trägt das Kästchen das Fugenkreuz (K-010: Markierung), die Checkbox den Haken.
// art="zeile": Zeile mit Kästchen · art="kachel": ganzes Feld als Fläche, gesetzt Tinte mit Kalk-Text (für Feldgruppe anordnung="kacheln").
// Mehrere Auswahlknöpfe gehören in eine Feldgruppe (fieldset + legend) mit gemeinsamem name.
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { KAESTCHEN } from '@/components/kern/basis/Ankreuzfeld';
import { useFeldIds } from '@/components/kern/basis/Feldrahmen';
import { Fugenkreuz } from '@/components/kern/basis/Zeichen';
import { fokus, verbinde } from '@/components/kern/basis/klassen';

export type AuswahlknopfProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'children'> & {
  children: ReactNode;
  art?: 'zeile' | 'kachel';
  /** Fehlerzustand der Gruppe (roter Rand). Die Meldung steht einmal in der Feldgruppe (role="alert", aria-describedby am fieldset);
   *  aria-invalid trägt ein Radio nach ARIA nicht. */
  ungueltig?: boolean;
  className?: string;
};

export default function Auswahlknopf({ children, art = 'zeile', ungueltig, className, id, disabled, ...rest }: AuswahlknopfProps) {
  const { id: eigeneId } = useFeldIds(id);
  const kachel = art === 'kachel';
  const label = kachel
    ? verbinde(
        'group relative flex min-h-k-7 items-start gap-k-3 border-r border-b border-k-strich bg-k-fliese p-k-4 k-text text-k-3 font-semibold',
        'has-checked:bg-k-tinte has-checked:text-k-kalk',
        'has-focus-visible:z-10 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-k-tinte',
        disabled ? 'cursor-not-allowed text-k-tinte-2' : 'cursor-pointer text-k-tinte pointer-fine:hover:bg-k-kalk pointer-fine:hover:has-checked:bg-k-tinte',
      )
    : verbinde('group flex min-h-k-7 items-start gap-k-3 py-k-3 k-text text-k-3', disabled ? 'cursor-not-allowed text-k-tinte-2' : 'cursor-pointer text-k-tinte');
  const kaestchen = verbinde(
    KAESTCHEN,
    ungueltig ? 'border-k-laser' : 'border-k-strich pointer-fine:enabled:group-hover:border-k-tinte',
    // Fokus auch am Kästchen (K-006, 2 px mit 2 px Abstand): die Kachel trägt zusätzlich den Ring an ihrer Fläche (label),
    // das Kästchen zeigt ihn dort, wo der Blick und die Messung (Element + 8 px) liegen. Gesetzte Kachel ist Tinte → Ring in Kalk.
    kachel
      ? verbinde('checked:border-k-kalk checked:bg-k-kalk', fokus('hell'), 'checked:focus-visible:outline-k-kalk')
      : verbinde('checked:border-k-tinte checked:bg-k-tinte', fokus('hell')),
    'disabled:checked:border-solid disabled:checked:bg-k-fuge',
  );
  return (
    <label htmlFor={eigeneId} className={verbinde(label, className)}>
      <span className="relative flex h-lh shrink-0 items-center">
        <input {...rest} id={eigeneId} type="radio" disabled={disabled} data-motion="zustand" className={kaestchen} />
        <span
          className={verbinde(
            'pointer-events-none invisible absolute inset-0 flex items-center justify-center peer-checked:visible peer-disabled:text-k-tinte-2',
            kachel ? 'text-k-tinte' : 'text-k-kalk',
          )}
        >
          <Fugenkreuz className="size-k-3" />
        </span>
      </span>
      <span className="min-w-0">{children}</span>
    </label>
  );
}
