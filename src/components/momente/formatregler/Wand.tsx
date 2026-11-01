// Eine Wand des Formatreglers (K-008): Fliesenfläche, Fugen und Schraffur des Passstreifens in Strich, Wandkante in Tinte,
// Linien 1,5 px wie die Plan-Vignetten. Dekorativ (Planrahmen ist aria-hidden); den Namen trägt das Bildfeld des Reglers.
// Keine IDs, keine Muster: beide Ebenen dürfen mehrfach auf einer Seite stehen.
// Fliesenoberfläche (UM-E4-SICHT-FIX-2 M2-C5 Nr. 2, Sicht E4 Anlauf 2: las sich als Drahtmodell ohne Bezugsgröße): die Fliesen im
// Wechsel fliese und kalk (ein Pfad für die kalkfarbenen, Zellen aus geometrie.ts), je Fuge ein breites Band in fuge unter dem
// Strich (3 Einheiten, wächst mit der Zeichnung), unten rechts eine Türzarge als Bezugsgröße (Linien 1,5 px, ohne Zahl nach E-045;
// in beiden Ebenen an derselben Stelle, sie steht also still, während die Linie wandert). geometrie.ts bleibt unverändert; Farben
// in bewegung.css (Block formatregler), erzwungene Farben: Fliesen und Tür auf Canvas, Fugen als Linie.
import { Linie, Planrahmen, schraffur } from '@/components/kern/vignetten/zeichnen';
import { WAND, wandbild, type Format } from './geometrie';
const VIEWBOX = `-2 -2 ${WAND.b + 4} ${WAND.h + 4}`; // 2 Einheiten Rand: die Kante wird nicht angeschnitten
/** Türzarge an der Wand (lichte Öffnung 84 × 200, Zarge 6), unten rechts auf dem Boden */
const TUER = { links: 250, rechts: 346, oben: 54, zarge: 6 } as const;
const TUER_FLAECHE = `M${TUER.links} ${WAND.h}V${TUER.oben}H${TUER.rechts}V${WAND.h}Z`;
const TUER_LINIEN = `M${TUER.links} ${WAND.h}V${TUER.oben}H${TUER.rechts}V${WAND.h}M${TUER.links + TUER.zarge} ${WAND.h}V${TUER.oben + TUER.zarge}H${TUER.rechts - TUER.zarge}V${WAND.h}M${TUER.rechts - TUER.zarge - 12} 160h6`;
/** Pfade einer Wand je Format, einmal beim Laden gerechnet (Nacharbeit M2-C5): Der Regler rendert bei jedem Schritt neu, die
 *  Pfade hängen nur am Format */
function pfade(format: Format) {
  const bild = wandbild(format);
  const fugen = [...bild.senkrecht.map((x) => `M${x} 0V${WAND.h}`), ...bild.waagrecht.map((y) => `M0 ${y}H${WAND.b}`)].join('');
  const schraffen = bild.passstuecke.map(([x, y, b, h]) => schraffur(x, y, b, h, 6)).join('');
  // jede zweite Fliese (Schachbrett) in kalk, die übrigen zeigen die Fläche in fliese
  const xs = [0, ...bild.senkrecht, WAND.b];
  const ys = [0, ...bild.waagrecht, WAND.h];
  const wechsel = ys
    .slice(0, -1)
    .flatMap((y, j) => xs.slice(0, -1).map((x, i) => ((i + j) % 2 ? `M${x} ${y}H${xs[i + 1]}V${ys[j + 1]}H${x}Z` : '')))
    .join('');
  return { fugen, schraffen, wechsel };
}
const PFADE: Record<Format, ReturnType<typeof pfade>> = { klein: pfade('klein'), gross: pfade('gross') };

export default function Wand({ format }: { format: Format }) {
  const { fugen, schraffen, wechsel } = PFADE[format];
  return (
    <Planrahmen viewBox={VIEWBOX}>
      <rect className="formatregler-flaeche" x={0} y={0} width={WAND.b} height={WAND.h} />
      {wechsel && <path className="formatregler-wechsel" d={wechsel} />}
      {fugen && <path className="formatregler-fugenband" d={fugen} />}
      <g className="text-strich">
        {schraffen && <Linie d={schraffen} />}
        <Linie d={fugen} />
      </g>
      <path className="formatregler-tuer" d={TUER_FLAECHE} />
      <Linie d={TUER_LINIEN} />
      <Linie d={`M0 0H${WAND.b}V${WAND.h}H0Z`} />
    </Planrahmen>
  );
}
