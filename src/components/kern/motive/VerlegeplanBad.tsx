import { useId } from 'react';

// Motiv „Verlegeplan“ (K-010): Draufsicht eines Bades, Achse mittig, Passstücke an beiden Rändern gleich breit (schraffiert),
// Duschrinne und Abschlussschiene als Linien. Bemaßung nur mit „=“ – keine erfundenen Maße. Dekorativ (aria-hidden).
// SIG-1 (Kreuzlinie): Waage und Lot wachsen aus dem Kreuzpunkt, nur unter html.k-bewegung (kern.css, `sig-kreuzlinie`).
export default function VerlegeplanBad({ achse = true, className = '' }: { achse?: boolean; className?: string }) {
  const schraffur = `k-schraffur-${useId().replace(/:/g, '')}`;
  return (
    <svg
      viewBox="0 -20 480 380"
      className={`block h-auto w-full text-k-tinte ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id={schraffur} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0v8" className="stroke-k-strich" strokeWidth="1" />
        </pattern>
      </defs>
      {/* Passstücke: links und rechts gleich breit, oben und unten gleich hoch */}
      <rect x="20" y="20" width="100" height="300" fill={`url(#${schraffur})`} />
      <rect x="360" y="20" width="100" height="300" fill={`url(#${schraffur})`} />
      <rect x="120" y="20" width="240" height="30" fill={`url(#${schraffur})`} />
      <rect x="120" y="290" width="240" height="30" fill={`url(#${schraffur})`} />
      {/* Fugenraster */}
      <g className="stroke-k-strich" strokeWidth="1" fill="none">
        <path d="M120 20v300M240 20v300M360 20v300" />
        <path d="M20 50h440M20 110h440M20 170h440M20 230h440M20 290h440" />
      </g>
      {/* Duschrinne (rechts) und Abschlussschiene an der Tür (unten) */}
      <path d="M446 32v96" className="stroke-k-tinte" strokeWidth="4" fill="none" />
      <path d="M60 320h80" className="stroke-k-tinte" strokeWidth="4" fill="none" />
      {/* Wand mit Türöffnung */}
      <path d="M140 320h320V20H20v300h40" className="stroke-k-tinte" strokeWidth="3" strokeLinecap="square" fill="none" />
      {/* Bemaßung: Passstücke gleich */}
      <g className="stroke-k-tinte" strokeWidth="1" fill="none">
        <path d="M20 6h440M20 1v10M120 1v10M360 1v10M460 1v10" />
      </g>
      <g className="fill-k-tinte-2 font-k-mono" fontSize="15">
        <text x="70" y="-2" textAnchor="middle">=</text>
        <text x="410" y="-2" textAnchor="middle">=</text>
      </g>
      {achse && (
        <g data-motion="sig-kreuzlinie" className="stroke-k-laser" strokeWidth="2" fill="none">
          <path className="k-laser-waage" d="M-8 170h496" />
          <path className="k-laser-lot" d="M240 4v350" />
        </g>
      )}
    </svg>
  );
}
