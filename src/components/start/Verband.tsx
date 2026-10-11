// Verband (E020-F-3, KERN v2): ruhige Textur großer Platten für das Verband-Feld im Großformat.
// Port von src/components/kern/motive/Verband.tsx: gleiche Geometrie und Muster, nur die Kennung der Muster-ID
// ohne Kern-Präfix. Fugenfarbe über currentColor (Klasse text-strich am Container). Plattenformat 2 : 1.
import { useId } from 'react';

type Art = 'kreuzfuge' | 'halbverband' | 'drittelverband';

// Verbände als Rastervarianten: Fugenbild als SVG-Muster, Fugenfarbe über currentColor.
// Halbverband versetzt jede Reihe um 1/2, Drittelverband um 1/3 Platte.
export default function Verband({ art = 'drittelverband', hoehe = 24, className = '' }: { art?: Art; hoehe?: number; className?: string }) {
  const reactId = useId().replace(/[^a-zA-Z0-9-]/g, '');
  const id = `verband-${art}-${reactId}`;
  const b = hoehe * 2;
  const reihen = art === 'drittelverband' ? 3 : art === 'halbverband' ? 2 : 1;
  const versatz = art === 'drittelverband' ? b / 3 : art === 'halbverband' ? b / 2 : 0;
  const pfade: string[] = [];
  for (let r = 0; r < reihen; r++) {
    const y = r * hoehe;
    const x = (r * versatz) % b;
    pfade.push(`M0 ${y}h${b}`, `M${x} ${y}v${hoehe}`);
  }
  return (
    <svg className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width={b} height={hoehe * reihen} patternUnits="userSpaceOnUse">
          <path d={pfade.join('')} stroke="currentColor" strokeWidth="1" fill="none" shapeRendering="crispEdges" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
