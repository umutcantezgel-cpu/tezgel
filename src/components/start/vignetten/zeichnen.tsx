// Gemeinsame Zeichenmittel der Plan-Vignetten (P3-10, K-010 SVG-Formsystem).
// Rahmen: currentColor, Strich 1,5 px, Enden square, Ecken miter, keine Füllung, dekorativ (aria-hidden).
// Jede Linie trägt vector-effect="non-scaling-stroke" (die Eigenschaft erbt nicht), damit der Strich bei jeder
// Darstellungsgröße 1,5 px bleibt. Töne über `color` an einer Gruppe (Strich für Fugen und Schraffur, Laser nur für
// die Achse), nie als feste Farbe – so übersteht die Zeichnung forced-colors.
// Schraffur und Bemaßung „=“ werden als Linien gerechnet: keine Muster, keine Clip-Pfade, keine Texte, also auch
// keine IDs, die je Instanz eindeutig sein müssten.
import type { ReactNode, SVGProps } from 'react';

const r = (n: number) => Math.round(n * 100) / 100;

/** Schraffur unter 45° (Passstück, Bauteil im Schnitt), auf das Rechteck x, y, b, h beschnitten. */
export function schraffur(x: number, y: number, b: number, h: number, abstand = 6): string {
  const teile: string[] = [];
  for (let k = x + y + abstand; k < x + b + y + h; k += abstand) {
    const x1 = Math.max(x, k - (y + h));
    const x2 = Math.min(x + b, k - y);
    teile.push(`M${r(x1)} ${r(k - x1)}L${r(x2)} ${r(k - x2)}`);
  }
  return teile.join('');
}

/** Bemaßung „=“ als zwei waagrechte Striche, mittig auf (cx, cy). */
export function gleich(cx: number, cy: number): string {
  return `M${r(cx - 3)} ${r(cy - 1.5)}h6M${r(cx - 3)} ${r(cy + 1.5)}h6`;
}

/** Senkrechter Pfeil von y1 nach y2 (Spitze bei y2, Schenkel unter 45°). */
export function pfeil(x: number, y1: number, y2: number, spitze = 5): string {
  const s = y2 < y1 ? spitze : -spitze;
  return `M${x} ${y1}V${y2}M${x - spitze} ${y2 + s}L${x} ${y2}L${x + spitze} ${y2 + s}`;
}

/** Pfad mit unveränderlicher Strichstärke. */
export function Linie(props: SVGProps<SVGPathElement>) {
  return <path vectorEffect="non-scaling-stroke" {...props} />;
}

/** Kreis mit unveränderlicher Strichstärke (Lagerpunkt). */
export function Punkt(props: SVGProps<SVGCircleElement>) {
  return <circle vectorEffect="non-scaling-stroke" {...props} />;
}

export type VignetteProps = { className?: string };

/** SVG-Rahmen einer Vignette: feste Proportion über viewBox, Breite vom Feld, Höhe folgt (kein Layoutsprung). */
export function Planrahmen({ viewBox, className, children }: { viewBox: string; className?: string; children: ReactNode }) {
  return (
    <svg
      viewBox={viewBox}
      className={className ? `block h-auto w-full ${className}` : 'block h-auto w-full'}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      {children}
    </svg>
  );
}
