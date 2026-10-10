// Einstieg Variante A (P3-09a) · Kreuzlinie: Waage und Lot mit dem Fugenkreuz als Kreuzpunkt (K-001, K-010, SIG-1).
// Ein 1-px-SVG sitzt genau auf dem Kreuzpunkt; beide Linien laufen mit `overflow: visible` weit über das SVG hinaus und
// werden vom Abschnitt (overflow: hidden) beschnitten. Jede Linie liegt symmetrisch um den Kreuzpunkt, damit der Mittelpunkt
// ihrer fill-box der Kreuzpunkt ist: Das Register (kern.css, `sig-kreuzlinie`, transform-origin: center) lässt sie so
// aus dem Kreuzpunkt wachsen, ohne eigenes CSS. Ohne html.k-bewegung (reduziert, ohne JS, Zeitlimit) stehen sie sofort.
// Mobil wächst nur das Lot (K-009 „Mobil nur das Lot“): Die Waage steht dort als ruhende Linie ohne Registerklasse.
// Farbe über die Hülle (currentColor), damit forced-colors die Linien in Textfarbe zeichnet (vgl. basis/Zeichen.tsx).
// Dekorativ (aria-hidden), keine IDs.

/** Halbe Länge jeder Linie in px: reicht auch auf 5K-Breiten über den Rand; der Abschnitt schneidet ab. */
const WEIT = 4000;
const WAAGE = `M${-WEIT} 0H${WEIT}`;
const LOT = `M0 ${-WEIT}V${WEIT}`;
// Fugenkreuz (Form aus basis/Zeichen.tsx, 18 px) um den Kreuzpunkt zentriert.
const KREUZ = 'M10.5 3h3v7.5H21v3h-7.5V21h-3v-7.5H3v-3h7.5z';

export default function Kreuzlinie({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none block size-px text-k-laser ${className}`}>
      <svg viewBox="0 0 1 1" width="1" height="1" overflow="visible" focusable="false" className="block size-px overflow-visible">
        <g data-motion="sig-kreuzlinie" stroke="currentColor" strokeWidth="2" fill="none">
          {/* Waage: ab lg wachsend (Register), darunter ruhend */}
          <path className="k-laser-waage hidden lg:inline" d={WAAGE} />
          <path className="lg:hidden" d={WAAGE} />
          {/* Lot: wächst in jeder Breite */}
          <path className="k-laser-lot" d={LOT} />
        </g>
        <path d={KREUZ} transform="translate(-12 -12)" fill="currentColor" />
      </svg>
    </span>
  );
}
