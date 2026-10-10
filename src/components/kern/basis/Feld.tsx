// Eingabefeld (K-011): Text, Telefon, E-Mail (dazu Zahl, URL, Suche). Beschriftung über dem Feld, Hilfetext,
// Fehler mit Versatz-Zeichen + role="alert", verknüpft per aria-describedby; aria-invalid bei Fehler.
// Alle Eingabe-Attribute (name, value, onChange, autoComplete, inputMode, required, ref …) werden durchgereicht.
// Telefon steht in Mono (K-005: Telefonnummern sind Messbares) und bekommt autoComplete="tel" und inputMode="tel" als Vorgabe.
import type { ComponentPropsWithRef } from 'react';
import { Feldrahmen, feldBeschreibung, feldKlassen, useFeldIds, type FeldAngaben } from '@/components/kern/basis/Feldrahmen';

export type FeldArt = 'text' | 'tel' | 'email' | 'number' | 'url' | 'search';

export type FeldProps = FeldAngaben &
  Omit<ComponentPropsWithRef<'input'>, keyof FeldAngaben | 'type'> & {
    /** Eingabeart; Standard text */
    art?: FeldArt;
    /** Wert in Mono setzen (Standard: nur bei Telefon) */
    mono?: boolean;
  };

const VORGABEN: Partial<Record<FeldArt, { autoComplete?: string; inputMode?: 'tel' | 'email' | 'url' | 'search'; spellCheck?: boolean }>> = {
  tel: { autoComplete: 'tel', inputMode: 'tel' },
  email: { autoComplete: 'email', inputMode: 'email', spellCheck: false },
  url: { autoComplete: 'url', inputMode: 'url', spellCheck: false },
  search: { inputMode: 'search' },
};

export default function Feld({ beschriftung, zusatz, hilfe, fehler, erfolg, className, art = 'text', mono, id, disabled, 'aria-describedby': eigene, ...rest }: FeldProps) {
  const ids = useFeldIds(id);
  const vorgabe = VORGABEN[art] ?? {};
  return (
    <Feldrahmen beschriftung={beschriftung} zusatz={zusatz} hilfe={hilfe} fehler={fehler} erfolg={erfolg} className={className} ids={ids} deaktiviert={disabled}>
      <input
        {...vorgabe}
        {...rest}
        id={ids.id}
        type={art}
        disabled={disabled}
        aria-invalid={fehler ? true : undefined}
        aria-describedby={feldBeschreibung({ hilfe, fehler, erfolg }, ids, eigene)}
        data-motion="zustand"
        className={feldKlassen({ ungueltig: Boolean(fehler), gueltig: Boolean(erfolg), mono: mono ?? art === 'tel' })}
      />
    </Feldrahmen>
  );
}
