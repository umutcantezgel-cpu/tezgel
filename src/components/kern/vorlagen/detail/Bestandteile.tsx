// Bestandteile (P4-02, KERN v1.2): gegliederte Ausstattungsliste – Musterbad „Detaillierte Ausstattungs- und
// Komponentenliste“ (Dusch-Anlage, Waschtisch-Anlage, WC-Anlage …). Ersetzt gestapelte `glass-surface`-Karten mit
// Hover-Schatten durch ein Verzeichnis im Fugenraster: Gruppenname links (ab Behälterbreite 36rem Sp. 1–4 von 12), Einträge
// rechts als Haken-Liste (`teile/Punkte`, dicht). Gruppenname bleibt ein Absatz (Bestand: <p>, keine Überschrift); jede Gruppe ist ein Listenpunkt.
import type { ReactNode } from 'react';
import { verbinde } from '@/components/kern/basis';
import { Punkte } from '@/components/kern/vorlagen/teile/Punkte';
import { UMBRUCH } from '@/components/kern/vorlagen/teile/typen';

export type Gruppe = { name: ReactNode; punkte: readonly ReactNode[] };

export default function Bestandteile({ gruppen, className }: { gruppen: Gruppe[]; className?: string }) {
  return (
    <div className={verbinde('@container', className)}>
      <ul className="border-t border-k-tinte">
        {gruppen.map((g, i) => (
          <li key={i} className="grid gap-k-3 border-b border-k-fuge py-k-5 @xl:grid-cols-12 @xl:gap-0">
            <p className={verbinde('k-text text-k-3 font-semibold text-k-tinte @xl:col-span-4 @xl:pr-k-5', UMBRUCH)}>{g.name}</p>
            <div className="min-w-0 @xl:col-span-8">
              <Punkte punkte={g.punkte} groesse="dicht" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
