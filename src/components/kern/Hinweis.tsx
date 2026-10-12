// Hinweis (KERN K-009): Merk-, Warn- und Fehlerhinweis sowie Erfolgsmeldung. Die Art steht im Icon, in der Farbe
// und im Text, nie allein in der Farbe. Rahmen und 2-px-Kante links in der Artfarbe, Fläche Fliese.
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import type { IconName } from '@/components/icons/namen';

export type HinweisArt = 'merk' | 'warn' | 'fehler' | 'erfolg';

const ARTEN: Record<HinweisArt, { icon: IconName; rahmen: string; symbol: string; name: string }> = {
  merk: { icon: 'info', rahmen: 'border-strich', symbol: 'text-tinte', name: 'Hinweis' },
  warn: { icon: 'hinweis', rahmen: 'border-tinte', symbol: 'text-tinte', name: 'Warnung' },
  fehler: { icon: 'fehler', rahmen: 'border-laser-tief', symbol: 'text-laser-tief', name: 'Fehler' },
  erfolg: { icon: 'haken', rahmen: 'border-abnahme', symbol: 'text-abnahme', name: 'Erledigt' },
};

export interface HinweisProps {
  art?: HinweisArt;
  titel?: ReactNode;
  children?: ReactNode;
  /** role="alert" bzw. role="status"; ohne Prop keine Rolle */
  rolle?: 'alert' | 'status';
  className?: string;
}

export default function Hinweis({ art = 'merk', titel, children, rolle, className }: HinweisProps) {
  const a = ARTEN[art];
  return (
    <div
      role={rolle}
      className={clsx('flex items-start gap-4 border border-l-2 bg-fliese p-6 font-text text-fs-2 text-tinte', a.rahmen, className)}
    >
      <Icon name={a.icon} groesse={5} className={clsx('mt-1', a.symbol)} />
      <div className="min-w-0">
        {titel && <div className="font-semibold">{titel}</div>}
        {children && (
          <div className={clsx(titel && 'mt-2')}>
            {/* Ohne Titel nennt der Hinweis seine Art für Screenreader (sonst stünde sie nur in Icon und Farbe) */}
            {!titel && <span className="sr-only">{a.name}: </span>}
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
