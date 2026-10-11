// Schieberegler (P4-05a, P4-10b, K-011): natives <input type="range"> – Tastatur (Pfeile, Pos1/Ende, Bild auf/ab),
// Screenreader und Fokus bleiben die des Browsers. Spur und Griff kommen aus Kern-Farben (Regel `.k-regler` in kern.css,
// Pseudo-Elemente `::-webkit-slider-*` und `::-moz-range-*`): ungefüllte Spur Strich (3,62 : 1 auf Fliese, 3,29 : 1 auf
// Kalk, WCAG 1.4.11), gefüllter Teil und Griff Tinte. Den gefüllten Teil zeichnet WebKit über `--k-regler-stand`
// (Anteil des Werts zwischen min und max in Prozent), Firefox über `::-moz-range-progress`. Ohne die Regel (und in
// forced-colors) bleibt die Browser-Darstellung mit accent-color Tinte.
// 48 px Trefferfläche (K-007, Touch-Ziele ≥ 44 px), Fokus 2 px Tinte mit 2 px Abstand am Regler selbst (K-006).
// Beschriftung über `id` + <label htmlFor> beim Aufrufer. Alle Eingabe-Attribute (min, max, step, value, onChange …)
// werden durchgereicht.
import type { ComponentPropsWithRef, CSSProperties } from 'react';
import { fokus, verbinde } from '@/components/kern/basis/klassen';

export type ReglerProps = Omit<ComponentPropsWithRef<'input'>, 'type'>;

const zahl = (wert: unknown, ersatz: number) => {
  const n = typeof wert === 'number' ? wert : parseFloat(String(wert ?? ''));
  return Number.isFinite(n) ? n : ersatz;
};

/** Anteil des Werts zwischen min und max (0–100 %); Vorgaben wie beim nativen Regler (0, 100, Mitte). */
function stand({ min, max, value, defaultValue }: Pick<ReglerProps, 'min' | 'max' | 'value' | 'defaultValue'>): string {
  const unten = zahl(min, 0);
  const oben = zahl(max, 100);
  const spanne = oben - unten;
  if (spanne <= 0) return '0%';
  const wert = Math.min(Math.max(zahl(value ?? defaultValue, unten + spanne / 2), unten), oben);
  return `${((wert - unten) / spanne) * 100}%`;
}

export default function Regler({ className, style, ...rest }: ReglerProps) {
  return (
    <input
      {...rest}
      type="range"
      data-motion="zustand"
      style={{ ...style, '--k-regler-stand': stand(rest) } as CSSProperties}
      className={verbinde(
        'k-regler block h-k-7 w-full min-w-0 cursor-pointer rounded-k-1 accent-k-tinte disabled:cursor-not-allowed',
        fokus('hell'),
        className,
      )}
    />
  );
}
