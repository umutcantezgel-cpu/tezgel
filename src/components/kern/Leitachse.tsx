// Leitachse der Erzählansichten (KERN K-007 leitachse): ein Lot im Seitenfluss über alle Abschnitte nach dem
// Einstieg, an derselben Stelle wie Lot bzw. Kreuzlinie des Einstiegs (im Seitenrand vor der Inhaltskante, mobil
// ≥ 8 px Abstand zum Text). Grundschicht Fuge, das rote Stück wächst mit dem Lesefortschritt (Laserachse).
// Abschnitte mit `leitachse` setzen an ihrer Oberkante ein Fugenkreuz auf das Lot. Schneidet nie Text.
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Laserachse from './Laserachse';
import { seitenKlassen } from './stile';

/** Lage des Lots im Seitenrahmen – gemeinsam für Einstieg, Leitachse und Abschnittsmarken */
export const ACHSE_LAGE = 'left-1 md:left-4 lg:left-8';

export default function Leitachse({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx('relative', className)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
        <div className={clsx(seitenKlassen, 'relative h-full')}>
          <Laserachse className={ACHSE_LAGE} />
        </div>
      </div>
      {children}
    </div>
  );
}
