// Zeichnung „Schichtaufbau“ (KERN v3 K-012, Formsystem Verlegeplan; Sichtabnahme E2, Befund 13 Grafik): Schnitt durch
// einen Boden im Bad, von oben Fliese mit Fuge, Kleber, Abdichtung, Untergrund. Nur Flächen und Linien aus Fliese, Fuge,
// Strich und der Laserlinie: Die Abdichtung ist die rote Schicht (die Linie, auf die es ankommt), der Untergrund schraffiert
// wie in einer Bauzeichnung. Beschriftung in Mono rechts mit Hinweislinien. Die Zeichnung ist dekorativ (aria-hidden), den
// Inhalt trägt die Bildunterschrift des Aufrufers. Serverkomponente.
import { useId } from 'react';
import clsx from 'clsx';

// Maße in Einheiten der Zeichnung (Breite 200, sichtbar ab Höhe 16): links der Schnitt bis 128, rechts die Beschriftung
const SCHNITT = 128;
const SCHICHTEN = [
  { name: 'Fliese', oben: 22, unten: 38, schrift: 24 },
  { name: 'Kleber', oben: 38, unten: 44, schrift: 44 },
  { name: 'Abdichtung', oben: 44, unten: 48, schrift: 64 },
  { name: 'Untergrund', oben: 48, unten: 92, schrift: 84 },
] as const;
const FLIESE = 40; // Fliesenlänge, Fuge 2
const FUGE = 2;

export default function Schichtaufbau({ className }: { className?: string }) {
  const schraffur = `sa${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const [fliese, kleber, abdichtung, untergrund] = SCHICHTEN;
  return (
    <svg viewBox="0 16 200 80" aria-hidden="true" focusable="false" className={clsx('block h-auto w-full', className)}>
      <defs>
        <pattern id={schraffur} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" className="stroke-strich" strokeWidth="0.6" />
        </pattern>
      </defs>
      {/* Untergrund: Kalk mit Schraffur */}
      <rect x="0" y={untergrund.oben} width={SCHNITT} height={untergrund.unten - untergrund.oben} className="fill-kalk" />
      <rect x="0" y={untergrund.oben} width={SCHNITT} height={untergrund.unten - untergrund.oben} fill={`url(#${schraffur})`} />
      {/* Abdichtung: die rote Schicht */}
      <rect x="0" y={abdichtung.oben} width={SCHNITT} height={abdichtung.unten - abdichtung.oben} className="fill-laser" />
      {/* Kleber: Fuge mit Zahnung des Kammspachtels */}
      <rect x="0" y={kleber.oben} width={SCHNITT} height={kleber.unten - kleber.oben} className="fill-fuge" />
      <path
        d={`M0 ${kleber.unten} ${Array.from({ length: SCHNITT / 4 }, (_, i) => `L${i * 4 + 2} ${kleber.oben + 2} L${i * 4 + 4} ${kleber.unten}`).join(' ')}`}
        className="fill-none stroke-strich"
        strokeWidth="0.5"
      />
      {/* Fliesen mit Fuge in Strich */}
      <rect x="0" y={fliese.oben} width={SCHNITT} height={fliese.unten - fliese.oben} className="fill-strich" />
      {Array.from({ length: Math.ceil(SCHNITT / FLIESE) }, (_, i) => {
        const x = i * FLIESE + FUGE / 2;
        return <rect key={i} x={x} y={fliese.oben} width={Math.min(FLIESE - FUGE, SCHNITT - x)} height={fliese.unten - fliese.oben} className="fill-fliese" />;
      })}
      {/* Umriss des Schnitts */}
      <rect x="0" y={fliese.oben} width={SCHNITT} height={untergrund.unten - fliese.oben} className="fill-none stroke-tinte" strokeWidth="0.8" />
      {/* Beschriftung mit Hinweislinien */}
      {SCHICHTEN.map((s) => {
        const mitte = (s.oben + s.unten) / 2;
        return (
          <g key={s.name}>
            <polyline points={`${SCHNITT - 6},${mitte} ${SCHNITT + 6},${mitte} ${SCHNITT + 12},${s.schrift - 3}`} className="fill-none stroke-tinte" strokeWidth="0.6" />
            <circle cx={SCHNITT - 6} cy={mitte} r="1.2" className="fill-tinte" />
            <text x={SCHNITT + 14} y={s.schrift} className={clsx('font-mono', s.name === 'Abdichtung' ? 'fill-tinte' : 'fill-tinte-2')} fontSize="8.5">
              {s.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
