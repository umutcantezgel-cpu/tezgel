// Fugenkreuz (K-010): das einzige gefüllte Zeichen – Markierung, Kreuzpunkt, Trenner, Auswahl gesetzt.
// Die übrigen Zustandszeichen (Haken, Fehler, Hinweis, Winkel, Plus/Minus) kommen aus der Icon-Familie
// (`@/components/kern/icons/Icon`, P3-04); das Fugenkreuz führt die Familie nicht, darum steht es hier.
// 24er-Raster, currentColor, immer dekorativ (aria-hidden) – die Bedeutung trägt der Text daneben.
// Farbe nie als Klasse am SVG, sondern an einer Hülle: Chromium erhält SVG-Farben in forced-colors (preserve-parent-color),
// nur über die Hülle erbt das Zeichen die erzwungene Textfarbe (sonst z. B. Kalk-Zeichen auf weißem Canvas unsichtbar).
// Gilt ebenso für Icon-Instanzen in den Bausteinen.
import type { SVGProps } from 'react';

type ZeichenProps = Omit<SVGProps<SVGSVGElement>, 'children' | 'viewBox'>;

export function Fugenkreuz(props: ZeichenProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} {...props}>
      <path d="M10.5 3h3v7.5H21v3h-7.5V21h-3v-7.5H3v-3h7.5z" />
    </svg>
  );
}
