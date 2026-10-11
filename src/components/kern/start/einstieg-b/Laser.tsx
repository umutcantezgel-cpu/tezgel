// Einstieg Variante B „Planblatt“ (P3-09b): die beiden Laserlinien von SIG-1 als SVG-Linien (K-009, Register `sig-kreuzlinie`).
// Jede Linie ist ein eigenes SVG ohne Seitenverhältnis (preserveAspectRatio="none"), das die Fläche seiner Hülle füllt.
// Die Hülle legt fest, wo die Linie liegt; die Linie ist immer symmetrisch um den Kreuzpunkt gelegt, denn `kern.css`
// skaliert sie aus ihrer Mitte (transform-origin: center, transform-box: fill-box) – so wächst sie aus dem Kreuzpunkt.
// Strich 2 Einheiten = 2 px quer zur Linie (die Querachse des viewBox ist 1 : 1 abgebildet). Ende `butt`, damit bei
// Skalierung 0 kein Punkt stehen bleibt. Dekorativ (aria-hidden), ohne IDs. Animation nur unter html.k-bewegung.

/** Waage: füllt ihre Hülle in der Breite, 2 px hoch. Mitte der Hülle = Kreuzpunkt. */
export function LaserWaage({ className = '' }: { className?: string }) {
  return (
    <svg
      data-motion="sig-kreuzlinie"
      viewBox="0 0 100 2"
      preserveAspectRatio="none"
      className={`block ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <path className="k-laser-waage stroke-k-laser" d="M0 1h100" strokeWidth="2" fill="none" />
    </svg>
  );
}

/** Lot: füllt seine Hülle in der Höhe, 2 px breit. Mitte der Hülle = Kreuzpunkt. */
export function LaserLot({ className = '' }: { className?: string }) {
  return (
    <svg
      data-motion="sig-kreuzlinie"
      viewBox="0 0 2 100"
      preserveAspectRatio="none"
      className={`block ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <path className="k-laser-lot stroke-k-laser" d="M1 0v100" strokeWidth="2" fill="none" />
    </svg>
  );
}
