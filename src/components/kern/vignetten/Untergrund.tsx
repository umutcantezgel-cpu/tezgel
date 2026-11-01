import { Linie, Planrahmen, Punkt, schraffur, type VignetteProps } from '@/components/kern/vignetten/zeichnen';

// Vignette „untergrund“ (P3-10, K-010): Schichtenschnitt am Wandanschluss. Von unten: Rohdecke und Mauerwerk im Schnitt
// (schraffiert), Estrich mit Randfuge, Verbundabdichtung über Boden und Wand, Dichtband in der Ecke mit Dehnschlaufe,
// darauf Wand- und Bodenfliesen mit Fugen. Ohne Laserachse, ohne Bemaßung, also ohne Rot.
// `bruchkante` (UM-E4-SICHT-FIX-2 M2-C4 Nr. 2, /fliesen: der Schnitt stand rechts offen): schließt die Schichten rechts mit einer
// Bruchlinie (senkrecht von der Oberkante der Fliesen bis zur Unterkante der Rohdecke, der Knick im leeren Feld des Estrichs).
// Ohne Prop unverändert (/, /leistungen, Ortsseiten).
// `marken` (Nacharbeit M2-C4 Nr. 2, /fliesen: ohne Marken war nicht zu sehen, welche Linie die Bildunterschrift meint): Ziffern 1
// bis 4 in kleinen Kästen, in der Folge der Bildunterschrift, jede mit Hinweislinie und Punkt auf ihrer Schicht. 1 bis 3
// (Bodenfliesen, Abdichtung, Estrich) in einer Spalte rechts neben der Bruchkante (die Zeichenfläche wird dafür 28 Einheiten
// breiter), 4 (Randfuge) im leeren Feld des Estrichs direkt neben der Fuge an der Wand. Ziffern in Mono, 10 Einheiten hoch
// (m390 rund 12 px, bei max-w-md rund 17 px), Kästen und Linien in Strich. Die einzigen Zeichen in einer Vignette: Sie benennen
// nichts, die Bildunterschrift trägt dieselben Ziffern vor den Begriffen und den Text für Vorleser (die Zeichnung bleibt
// aria-hidden). Statt Wörtern im SVG (mobil rund 9,6 px, Plan M2-C4 Nr. 2).
const MARKEN: { n: number; x: number; y: number; ziel: [number, number]; ende: [number, number] }[] = [
  { n: 1, x: 256, y: 40, ziel: [214, 49], ende: [250, 40] },
  { n: 2, x: 256, y: 58, ziel: [214, 61], ende: [250, 58] },
  { n: 3, x: 256, y: 76, ziel: [200, 78], ende: [250, 76] },
  { n: 4, x: 50, y: 80, ziel: [31, 80], ende: [44, 80] },
];
const MARKEN_LINIEN = MARKEN.map((m) => `M${m.ziel[0]} ${m.ziel[1]}L${m.ende[0]} ${m.ende[1]}M${m.x - 6} ${m.y - 6}h12v12h-12Z`).join('');
const BRUCHKANTE = 'M232 46V72L237 76L227 82L232 86V120';
const SCHNITT = schraffur(8, 8, 20, 84) + schraffur(8, 92, 224, 28, 4);
const FLIESEN = 'M38 8V40M44 8V40M38 40H44M38 24h6M48 46H232M48 52H232M48 46V52M88 46v6M128 46v6M168 46v6M208 46v6';

export default function VignetteUntergrund({ className, fuellen, bruchkante = false, marken = false }: VignetteProps & { bruchkante?: boolean; marken?: boolean }) {
  return (
    <Planrahmen viewBox={marken ? '0 0 268 128' : '0 0 240 128'} className={className} fuellen={fuellen}>
      <g className="text-strich">
        <Linie d={SCHNITT} />
      </g>
      {/* Mauerwerk und Rohdecke: Kanten */}
      <Linie d="M8 8V120M28 8V92M8 92H232M8 120H232" />
      {/* Estrich mit Randfuge zur Wand */}
      <Linie d="M34 92V64H232" />
      {/* Verbundabdichtung über Wand und Boden */}
      <Linie d="M31 16V61H232" />
      {/* Dichtband in der Ecke, Dehnschlaufe im Boden */}
      <Linie d="M34 44V58H40V54H44V58H60" />
      <g className="text-strich">
        <Linie d={FLIESEN} />
      </g>
      {bruchkante && <Linie d={BRUCHKANTE} />}
      {marken && (
        <>
          <g className="text-strich">
            <Linie d={MARKEN_LINIEN} />
            {MARKEN.map((m) => (
              <Punkt key={m.n} cx={m.ziel[0]} cy={m.ziel[1]} r={1.5} fill="currentColor" />
            ))}
          </g>
          {MARKEN.map((m) => (
            <text key={m.n} x={m.x} y={m.y} fontSize={10} textAnchor="middle" dominantBaseline="central" fill="currentColor" stroke="none" className="font-mono">
              {m.n}
            </text>
          ))}
        </>
      )}
    </Planrahmen>
  );
}
