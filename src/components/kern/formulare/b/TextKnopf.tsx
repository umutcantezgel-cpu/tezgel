// Knopf im Fließtext (P3-13b): sieht aus wie ein Textlink (Unterstreichung, K-011), löst aber eine Handlung aus.
// Für Handlungen mitten im Satz (z. B. „… direkt per WhatsApp senden …“); im Satz von der Mindest-Trefferfläche
// ausgenommen (WCAG 2.5.8). Register `zustand`, Hover nur bei feinem Zeiger.
import type { ComponentPropsWithRef } from 'react';
import { fokus, verbinde } from '@/components/kern/basis/klassen';

export type TextKnopfProps = Omit<ComponentPropsWithRef<'button'>, 'type'>;

export default function TextKnopf({ className, children, ...rest }: TextKnopfProps) {
  return (
    <button
      {...rest}
      type="button"
      data-motion="zustand"
      className={verbinde(
        'cursor-pointer rounded-k-1 font-semibold text-k-tinte underline decoration-k-strich decoration-1 underline-offset-4',
        'pointer-fine:hover:decoration-k-tinte pointer-fine:hover:decoration-2 active:decoration-k-tinte active:decoration-2',
        fokus('hell'),
        className,
      )}
    >
      {children}
    </button>
  );
}
