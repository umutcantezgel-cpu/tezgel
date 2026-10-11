// Bestandteile (P4-02, KERN v1.2): gegliederte Ausstattungsliste – Musterbad „Detaillierte Ausstattungs- und
// Komponentenliste“ (Dusch-Anlage, Waschtisch-Anlage, WC-Anlage …). Ersetzt gestapelte `glass-surface`-Karten mit
// Hover-Schatten durch ein Verzeichnis im Fugenraster: Gruppenname links (Desktop 4/12, Tablett 3/8), Einträge rechts
// als Haken-Liste. Gruppenname bleibt ein Absatz (Bestand: <p>, keine Überschrift); jede Gruppe ist ein Listenpunkt.
import type { ReactNode } from 'react';
import { verbinde } from '@/components/kern/basis';
import { Merkmale } from '@/components/kern/vorlagen/uebersicht/Abschnitt';

export type Gruppe = { name: ReactNode; punkte: ReactNode[] };

export default function Bestandteile({ gruppen, className }: { gruppen: Gruppe[]; className?: string }) {
  return (
    <ul className={verbinde('border-t border-k-tinte', className)}>
      {gruppen.map((g, i) => (
        <li key={i} className="grid gap-k-3 border-b border-k-fuge py-k-5 md:grid-cols-8 lg:grid-cols-12 md:gap-0">
          <p className="min-w-0 k-text text-k-3 font-semibold text-k-tinte wrap-break-word hyphens-auto md:col-span-3 md:pr-k-5 lg:col-span-4">{g.name}</p>
          <div className="min-w-0 md:col-span-5 lg:col-span-8">
            <Merkmale punkte={g.punkte} dicht />
          </div>
        </li>
      ))}
    </ul>
  );
}
