import { Linie, Planrahmen, schraffur, type VignetteProps } from '@/components/kern/vignetten/zeichnen';

// Vignette „reparatur“ (E-037, NEU in der Zeichensprache der alten Vignetten, kein Original aus P3-10): Wandfeld im
// Kreuzfugenraster 48er, oben eine Platte mit Riss, unten rechts ein neu eingesetztes Stück (schraffiert wie ein
// Passstück), Rand in Tinte. Ohne Laserachse, ohne Rot.
const FUGEN = 'M72 16V112M120 16V112M168 16V112M24 64H216';
const NEU = schraffur(120, 64, 48, 48);

export default function VignetteReparatur({ className, fuellen }: VignetteProps) {
  return (
    <Planrahmen viewBox="0 0 240 128" className={className} fuellen={fuellen}>
      <g className="text-strich">
        <Linie d={FUGEN + NEU} />
      </g>
      <Linie d="M24 16H216V112H24Z" />
      {/* Riss in der Platte oben, zweite von links */}
      <Linie d="M84 22L94 36L88 44L104 58" />
      {/* neu eingesetztes Stück: Kante in Tinte */}
      <Linie d="M120 64H168V112H120Z" />
    </Planrahmen>
  );
}
