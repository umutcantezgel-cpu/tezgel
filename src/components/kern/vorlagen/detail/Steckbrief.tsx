// Steckbrief (P4-02, KERN v1.2, K-008 Schriftfeld-Logik): Projektdaten als Beschreibungsliste mit Fugen – Referenz
// „Auf einen Blick“ bzw. „Projektdaten im Detail“ (Kategorie, Status, Bauzeit, Ort). Begriff links in Nebentext,
// Wert rechts in Tinte; Maße und Jahreszahlen in Mono (`mono`). Nur belegte Angaben: Der Aufrufer übergibt für
// Platzhalter-Referenzen keine Projektfakten (wie der Bestand, `isPlaceholderProject`).
import type { ReactNode } from 'react';
import { verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import type { IconName } from '@/components/kern/icons/geometrie';

export type Angabe = { begriff: ReactNode; wert: ReactNode; zeichen?: IconName; mono?: boolean };

export default function Steckbrief({ angaben, className }: { angaben: Angabe[]; className?: string }) {
  return (
    <dl className={verbinde('border-t border-k-fuge', className)}>
      {angaben.map((a, i) => (
        <div key={i} className="flex flex-wrap items-baseline justify-between gap-x-k-4 gap-y-k-1 border-b border-k-fuge py-k-3">
          <dt className="flex items-center gap-k-2 k-text text-k-2 text-k-tinte-2">
            {a.zeichen ? (
              <span aria-hidden="true" className="flex shrink-0">
                <Icon name={a.zeichen} groesse={16} />
              </span>
            ) : null}
            <span>{a.begriff}</span>
          </dt>
          <dd className={verbinde('min-w-0 text-right text-k-tinte wrap-break-word hyphens-auto', a.mono ? 'k-mono text-k-1' : 'k-text text-k-2 font-semibold')}>{a.wert}</dd>
        </div>
      ))}
    </dl>
  );
}
