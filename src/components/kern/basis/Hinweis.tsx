// Hinweis (K-006, K-011): Bedeutung nie nur über Farbe – jede Art hat Rahmen, eigenes Zeichen und Text.
// info: Rahmen Strich, Hinweis-Zeichen · erfolg: Rahmen Abnahme, Haken zeichnet sich (Register `notiert`), role="status" ·
// fehler: Rahmen Laser, Versatz-Zeichen, Titel in Laser tief, role="alert".
// Für Ansagen beim Erscheinen den Hinweis erst bei Bedarf einsetzen; ankuendigen={false} für statische Hinweise.
import type { ReactNode } from 'react';
import { ZeichenFehler, ZeichenHaken, ZeichenHinweis } from '@/components/kern/basis/Zeichen';
import { verbinde } from '@/components/kern/basis/klassen';

export type HinweisArt = 'info' | 'erfolg' | 'fehler';

export type HinweisProps = {
  art?: HinweisArt;
  /** erste Zeile, kräftig (z. B. „Notiert.“) */
  titel?: ReactNode;
  children?: ReactNode;
  /** Ansage für Screenreader (fehler: alert, erfolg: status). Standard: an bei erfolg und fehler. */
  ankuendigen?: boolean;
  id?: string;
  className?: string;
};

const RAND: Record<HinweisArt, string> = { info: 'border-k-strich', erfolg: 'border-k-abnahme', fehler: 'border-k-laser' };
const TITEL: Record<HinweisArt, string> = { info: 'text-k-tinte', erfolg: 'text-k-abnahme', fehler: 'text-k-laser-tief' };

const ZEICHEN_FARBE: Record<HinweisArt, string> = { info: 'text-k-tinte', erfolg: 'text-k-abnahme', fehler: 'text-k-laser' };

function Zeichen({ art }: { art: HinweisArt }) {
  if (art === 'fehler') return <ZeichenFehler className="size-k-5" />;
  if (art === 'erfolg') return <ZeichenHaken notiert className="size-k-5" />;
  return <ZeichenHinweis className="size-k-5" />;
}

export default function Hinweis({ art = 'info', titel, children, ankuendigen, id, className }: HinweisProps) {
  const ansage = ankuendigen ?? art !== 'info';
  const rolle = !ansage ? undefined : art === 'fehler' ? 'alert' : 'status';
  return (
    <div id={id} role={rolle} className={verbinde('flex items-start gap-k-3 border bg-k-fliese p-k-4 k-text text-k-3 text-k-tinte', RAND[art], className)}>
      {/* Zeichen fluchtet mit der ersten Zeile (Höhe = Zeilenhöhe von Titel k-3 bzw. Text k-2);
          Farbe an der Hülle, damit das SVG in forced-colors die erzwungene Textfarbe erbt */}
      <span className={verbinde('flex h-lh shrink-0 items-center', titel ? 'text-k-3' : 'text-k-2', ZEICHEN_FARBE[art])}>
        <Zeichen art={art} />
      </span>
      <div className="flex min-w-0 flex-col gap-k-1">
        {titel ? <p className={verbinde('font-semibold', TITEL[art])}>{titel}</p> : null}
        {children ? <div className="text-k-2">{children}</div> : null}
      </div>
    </div>
  );
}
