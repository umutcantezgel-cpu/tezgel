// Vorlagen · Aufklapper (UM-E4-SICHT-FIX M-B3 und M-B4; Muster der Aufklapper in Gewerk und den Fragen, gleiche Klassen): natives
// <details> mit einer Zeile zum Öffnen (Mikrotext, keine Überschrift im summary) und Plus bzw. Minus am Ende. Ohne JavaScript
// bedienbar; der Inhalt steht vollständig im DOM (G4, E-104 Nr. 3), lesbarkeit.mjs öffnet vor dem Lesen jedes details. Fokus
// über die globale Regel (:focus-visible), die Trefffläche ist mindestens 48 px hoch. Ruhig: kein Auftritt, Sofortzustand.
// Serverkomponente.
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';

/** `className` am details, `zeileKlassen` an der Zeile (z. B. schmal und mittig über einem breiten Inhalt) */
export default function Aufklapper({ zeile, children, className, zeileKlassen }: { zeile: ReactNode; children: ReactNode; className?: string; zeileKlassen?: string }) {
  return (
    <details className={clsx('group', className)}>
      <summary
        className={clsx(
          'flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 font-text text-fs-3 font-semibold text-tinte [&::-webkit-details-marker]:hidden',
          zeileKlassen,
        )}
      >
        <span className="min-w-0">{zeile}</span>
        <span className="flex shrink-0 items-center text-tinte" aria-hidden="true">
          <span className="group-open:hidden">
            <Icon name="plus" groesse={6} />
          </span>
          <span className="hidden group-open:block">
            <Icon name="minus" groesse={6} />
          </span>
        </span>
      </summary>
      {children}
    </details>
  );
}
