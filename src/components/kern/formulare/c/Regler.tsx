// Schieberegler (P4-05a, K-011): natives <input type="range"> – Tastatur (Pfeile, Pos1/Ende, Bild auf/ab), Screenreader
// und forced-colors bleiben die des Browsers. Gestaltet nur über accent-color (Tinte) und die Höhe: 48 px Trefferfläche
// (K-007, Touch-Ziele ≥ 44 px), Fokus 2 px Tinte mit 2 px Abstand am Regler selbst (K-006). Beschriftung über
// `id` + <label htmlFor> beim Aufrufer. Alle Eingabe-Attribute (min, max, step, value, onChange …) werden durchgereicht.
import type { ComponentPropsWithRef } from 'react';
import { fokus, verbinde } from '@/components/kern/basis/klassen';

export type ReglerProps = Omit<ComponentPropsWithRef<'input'>, 'type'>;

export default function Regler({ className, ...rest }: ReglerProps) {
  return (
    <input
      {...rest}
      type="range"
      data-motion="zustand"
      className={verbinde(
        'block h-k-7 w-full min-w-0 cursor-pointer rounded-k-1 accent-k-tinte disabled:cursor-not-allowed',
        fokus('hell'),
        className,
      )}
    />
  );
}
