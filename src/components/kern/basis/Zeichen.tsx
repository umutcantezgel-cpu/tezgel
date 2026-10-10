// Zustandszeichen der Grundbausteine aus dem Formsystem (K-010): 24er-Raster, Lebensbereich 2,75–21,25,
// Strich 1,5 px, Enden square, Ecken miter, currentColor, immer dekorativ (aria-hidden) – die Bedeutung trägt der Text daneben.
// Inline statt Sprite, weil die Bausteine ohne Sprite-Einbindung funktionieren müssen und der Haken für „notiert“
// einen eigenen Pfad mit pathLength="1" braucht. Gefüllt ist nur das Fugenkreuz.
// Farbe nie als Klasse am SVG, sondern an einer Hülle: Chromium erhält SVG-Farben in forced-colors (preserve-parent-color),
// nur über die Hülle erbt das Zeichen die erzwungene Textfarbe (sonst z. B. Kalk-Haken auf weißem Canvas unsichtbar).
import type { SVGProps } from 'react';

type ZeichenProps = Omit<SVGProps<SVGSVGElement>, 'children' | 'viewBox'>;

const STRICH = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'square',
  strokeLinejoin: 'miter',
  'aria-hidden': true,
  focusable: false,
} as const;

/** Fugenkreuz – das einzige gefüllte Zeichen: Markierung, Kreuzpunkt, Trenner, Auswahl gesetzt. */
export function Fugenkreuz(props: ZeichenProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} {...props}>
      <path d="M10.5 3h3v7.5H21v3h-7.5V21h-3v-7.5H3v-3h7.5z" />
    </svg>
  );
}

/** Fehler: Versatz-Zeichen – zwei Fliesen mit Fuge, die rechte aus der Flucht gerückt. */
export function ZeichenFehler(props: ZeichenProps) {
  return (
    <svg {...STRICH} {...props}>
      <path d="M2.75 8.75h8v10h-8zM13.25 5.25h8v10h-8z" />
    </svg>
  );
}

/** Haken. Mit `notiert` zeichnet er sich beim Erscheinen (Register `notiert`, reduziert sofort sichtbar). */
export function ZeichenHaken({ notiert = false, ...props }: ZeichenProps & { notiert?: boolean }) {
  return (
    <svg {...STRICH} data-motion={notiert ? 'notiert' : undefined} {...props}>
      <path d="M5.25 12.75l4.5 4.5 9-9" pathLength={notiert ? 1 : undefined} />
    </svg>
  );
}

/** Hinweis: Fliese in der Flucht mit „i“. */
export function ZeichenHinweis(props: ZeichenProps) {
  return (
    <svg {...STRICH} {...props}>
      <path d="M3.75 3.75h16.5v16.5H3.75zM12 10.75v6.5M12 7.25v1" />
    </svg>
  );
}

/** Winkel (Chevron) nach unten – Auswahlliste. */
export function ZeichenWinkel(props: ZeichenProps) {
  return (
    <svg {...STRICH} {...props}>
      <path d="M6.75 9.75 12 15l5.25-5.25" />
    </svg>
  );
}

/** Plus, das im offenen Akkordeon zum Minus wird (senkrechter Strich entfällt über group-open). */
export function ZeichenAufZu(props: ZeichenProps) {
  return (
    <svg {...STRICH} {...props}>
      <path d="M5.75 12h12.5" />
      <path d="M12 5.75v12.5" className="group-open:hidden" />
    </svg>
  );
}
