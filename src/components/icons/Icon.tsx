// Icon der eigenen Familie (KERN K-008): 24er-Raster, 1,5-px-Strich, eckige Enden, currentColor.
// Das Sprite wird als gehashte Datei geladen (cachebar, keine IDs im DOM). Dekorativ ohne label,
// bedeutungstragend mit label (role="img").
import clsx from 'clsx';
import sprite from './sprite.svg';
import type { IconName } from './namen';

type Groesse = 4 | 5 | 6;
const GROESSE: Record<Groesse, string> = { 4: 'size-4', 5: 'size-5', 6: 'size-6' };

export interface IconProps {
  name: IconName;
  groesse?: Groesse;
  label?: string;
  className?: string;
}

export default function Icon({ name, groesse = 5, label, className }: IconProps) {
  const quelle = typeof sprite === 'string' ? sprite : sprite.src;
  return (
    <svg
      className={clsx('inline-block shrink-0', GROESSE[groesse], className)}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true, focusable: false })}
    >
      <use href={`${quelle}#${name}`} />
    </svg>
  );
}

export type { IconName };
