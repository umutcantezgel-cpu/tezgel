// Eine Wand des Formatreglers (K-008): Fliesenfläche, Fugen und Schraffur des Passstreifens in Strich, Wandkante in Tinte,
// Linien 1,5 px wie die Plan-Vignetten. Dekorativ (Planrahmen ist aria-hidden); den Namen trägt das Bildfeld des Reglers.
// Keine IDs, keine Muster: beide Ebenen dürfen mehrfach auf einer Seite stehen.
import { Linie, Planrahmen, schraffur } from '@/components/kern/vignetten/zeichnen';
import { WAND, wandbild, type Format } from './geometrie';
const VIEWBOX = `-2 -2 ${WAND.b + 4} ${WAND.h + 4}`; // 2 Einheiten Rand: die Kante wird nicht angeschnitten
export default function Wand({ format }: { format: Format }) {
  const bild = wandbild(format);
  const fugen = [...bild.senkrecht.map((x) => `M${x} 0V${WAND.h}`), ...bild.waagrecht.map((y) => `M0 ${y}H${WAND.b}`)].join('');
  const schraffen = bild.passstuecke.map(([x, y, b, h]) => schraffur(x, y, b, h, 6)).join('');
  return (
    <Planrahmen viewBox={VIEWBOX}>
      <rect className="formatregler-flaeche" x={0} y={0} width={WAND.b} height={WAND.h} />
      <g className="text-strich">
        {schraffen && <Linie d={schraffen} />}
        <Linie d={fugen} />
      </g>
      <Linie d={`M0 0H${WAND.b}V${WAND.h}H0Z`} />
    </Planrahmen>
  );
}
