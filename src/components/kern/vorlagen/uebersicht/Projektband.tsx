// Projektband (P4-02): Übergang vom Lesen zum Anfragen auf Hubs und Listen – `/fliesen` „Vom Ratgeber zum Projekt“,
// `/referenzen` „Überzeugen Sie sich selbst …“, `/standorte` „Ihre Stadt ist nicht aufgeführt?“.
// Seit P4-10a das gemeinsame `Handlungsfeld` (`teile/Handlungsfeld.tsx`) als Planblatt: Blattkante Tinte, links Etikett mit
// Fugenkreuz, Überschrift (höchstens k-5), Text, Zusagen, Zitat; rechts auf Fliese der Beleg in Mono und die Wege. Kein Rot.
// Früher `aktionen` → `knoepfe`.
import type { ReactNode } from 'react';
import Handlungsfeld from '@/components/kern/vorlagen/teile/Handlungsfeld';
import type { KnopfAngabe } from '@/components/kern/vorlagen/teile/typen';

export type ProjektbandProps = {
  etikett?: ReactNode;
  titel: ReactNode;
  titelId: string;
  text?: ReactNode;
  punkte?: readonly ReactNode[];
  /** Zitat (z. B. Motto aus COMPANY_DATA), wörtlich */
  zitat?: ReactNode;
  /** Beleg: Wert in Mono (z. B. „5,0“) und Zeile darunter (z. B. „aus 27 Google-Rezensionen (Stand …)“) */
  beleg?: { wert: ReactNode; text: ReactNode };
  knoepfe?: readonly KnopfAngabe[];
  className?: string;
};

export default function Projektband(props: ProjektbandProps) {
  return <Handlungsfeld groesse="mittel" etikettForm="kreuz" kante="tinte" rechts="fliese" punkteSpalten={1} punkteGroesse="dicht" {...props} />;
}
