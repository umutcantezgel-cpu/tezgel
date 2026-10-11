// Punkteliste der Fachseite (P4-01, KERN v1.2 K-006, K-010): Abschnitt mit Aufzählung – Prüfpunkte mit Haken („Vor dem
// Fliesen“), Grenzen mit Hinweis-Zeichen, schlichte Listen mit Fugenkreuz. Der Block `Punkte` ist seit P4-10a gemeinsam in
// `teile/Punkte.tsx` (zusammen mit `Merkmale` aus P4-02); zwei Spalten nach Behälterbreite.
import Abschnitt, { type AbschnittProps } from '@/components/kern/vorlagen/teile/Abschnitt';
import { Punkte, type PunkteProps } from '@/components/kern/vorlagen/teile/Punkte';

export { Punkte, type PunkteProps };

export type PunktelisteProps = AbschnittProps & Omit<PunkteProps, 'className'>;

export default function Punkteliste({ punkte, zeichen, spalten = 2, geordnet, groesse, children, ...abschnitt }: PunktelisteProps) {
  return (
    <Abschnitt {...abschnitt}>
      <Punkte punkte={punkte} zeichen={zeichen} spalten={spalten} geordnet={geordnet} groesse={groesse} />
      {children ? <div className="mt-k-8">{children}</div> : null}
    </Abschnitt>
  );
}
