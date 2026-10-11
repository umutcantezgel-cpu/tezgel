import Planblatt, { Fugen, Laser, Linie, type PlanProps } from '@/components/kern/motive/plaene/Planblatt';
import { Punkt } from '@/components/kern/motive/vignetten/zeichnen';
import { gleich, kreuzfuge, ketteWaagrecht, lot, rechteck, stricheWaagrecht, teilung, wandschnitt } from '@/components/kern/motive/plaene/geometrie';

// Plan „reparatur“ (Fliesenreparatur): Wandansicht in Kreuzfuge vom Boden aufwärts. Eine ausgetauschte Fliese ist mit
// innerem Rahmen markiert, daneben zwei verschlossene Bohrlöcher; beides gehört zum Belag und wandert mit ihm. In der
// Flucht steht das Lot auf der Mittelfuge, Passstücke links und rechts gleich.
const FELD = { x0: 24, y0: 24, x1: 296, y1: 184 };
const VERSATZ = { x: 12, y: 0 };
const SPALTEN = teilung(FELD.x0, FELD.x1, 40, 160);
const ZEILEN = teilung(FELD.y0, FELD.y1, 40, 184);
const BELAG = kreuzfuge(FELD, VERSATZ, SPALTEN, ZEILEN, { links: true, rechts: true });
const RAND = [SPALTEN[0], SPALTEN[SPALTEN.length - 1]];

const BODEN = wandschnitt({ x0: 8, y0: 184, x1: 312, y1: 190 });
const KANTEN = 'M8 184H312M24 184V16M296 184V16M24 24H296';

export default function PlanReparatur(props: PlanProps) {
  return (
    <Planblatt
      {...props}
      viewBox="0 0 320 216"
      feld={rechteck(FELD)}
      versatz={VERSATZ}
      belag={
        <>
          <Fugen d={BELAG.passstuecke + BELAG.fugen} />
          <Linie d={rechteck({ x0: 164, y0: 68, x1: 196, y1: 100 })} />
          <Punkt cx={212} cy={124} r="2.5" />
          <Punkt cx={228} cy={124} r="2.5" />
        </>
      }
      achse={
        <>
          <Laser d={lot(160, 6, 194)} />
          <Linie d={stricheWaagrecht(204, RAND)} />
        </>
      }
      bau={
        <>
          <Fugen d={BODEN} />
          <Linie d={KANTEN + ketteWaagrecht(204, [FELD.x0, FELD.x1])} />
        </>
      }
      gleich={gleich(32, 196) + gleich(288, 196)}
    />
  );
}
