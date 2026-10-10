// Eingabefeld mit Einheit im Feld (z. B. „m²“), gebaut aus dem Feldrahmen der Grundbausteine (P3-13b).
// Beschriftung über dem Feld, Hilfe, Fehler und Erfolg wie `Feld`; die Einheit steht in Mono rechts im Feld und ist
// dekorativ (aria-hidden) – wie im Bestand. Alle Eingabe-Attribute werden durchgereicht.
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { Feldrahmen, feldBeschreibung, feldKlassen, useFeldIds, type FeldAngaben } from '@/components/kern/basis/Feldrahmen';
import { verbinde } from '@/components/kern/basis/klassen';

export type FeldMitEinheitProps = FeldAngaben &
  Omit<ComponentPropsWithRef<'input'>, keyof FeldAngaben | 'type'> & {
    /** Einheit rechts im Feld, z. B. „m²“ */
    einheit: ReactNode;
  };

export default function FeldMitEinheit({ beschriftung, zusatz, hilfe, fehler, erfolg, className, einheit, id, disabled, 'aria-describedby': eigene, ...rest }: FeldMitEinheitProps) {
  const ids = useFeldIds(id);
  return (
    <Feldrahmen beschriftung={beschriftung} zusatz={zusatz} hilfe={hilfe} fehler={fehler} erfolg={erfolg} className={className} ids={ids} deaktiviert={disabled}>
      <div className="relative">
        <input
          {...rest}
          id={ids.id}
          type="text"
          disabled={disabled}
          aria-invalid={fehler ? true : undefined}
          aria-describedby={feldBeschreibung({ hilfe, fehler, erfolg }, ids, eigene)}
          data-motion="zustand"
          className={verbinde(feldKlassen({ ungueltig: Boolean(fehler), gueltig: Boolean(erfolg) }), 'pr-k-8')}
        />
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-k-3 flex items-center k-mono text-k-2 text-k-tinte-2">
          {einheit}
        </span>
      </div>
    </Feldrahmen>
  );
}
