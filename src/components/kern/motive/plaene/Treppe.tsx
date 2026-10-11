import Planblatt, { Fugen, Laser, Linie, type PlanProps } from '@/components/kern/motive/plaene/Planblatt';
import { gleich, kreuzfuge, ketteWaagrecht, lot, rechteck, reihe, stricheWaagrecht, teilung, wandschnitt } from '@/components/kern/motive/plaene/geometrie';

// Plan „treppe“ (Treppen neu belegen): Draufsicht einer geraden Treppe zwischen zwei Wangen (im Schnitt), fünf
// Trittstufen mit Stufenkante (Doppellinie an der Vorderkante). Die Fugen fluchten über alle Stufen; in der Flucht
// steht das Lot auf der Mittelfuge und die Passstücke jeder Stufe sind links und rechts gleich.
const FELD = { x0: 48, y0: 24, x1: 272, y1: 184 };
const VERSATZ = { x: 12, y: 0 };
const SPALTEN = teilung(FELD.x0, FELD.x1, 48, 160);
const STUFEN = reihe(56, FELD.y1, 32);
const BELAG = kreuzfuge(FELD, VERSATZ, SPALTEN, STUFEN, { links: true, rechts: true });
const RAND = [SPALTEN[0], SPALTEN[SPALTEN.length - 1]];

const WANGEN = wandschnitt({ x0: 40, y0: 16, x1: 48, y1: 184 }, { x0: 272, y0: 16, x1: 280, y1: 184 });
const KANTEN =
  rechteck({ x0: 40, y0: 16, x1: 48, y1: 184 }) +
  rechteck({ x0: 272, y0: 16, x1: 280, y1: 184 }) +
  `M48 24H272${[...STUFEN, FELD.y1].map((y) => `M48 ${y - 3}H272M48 ${y}H272`).join('')}`;

export default function PlanTreppe(props: PlanProps) {
  return (
    <Planblatt
      {...props}
      viewBox="0 0 320 220"
      feld={rechteck(FELD)}
      versatz={VERSATZ}
      belag={<Fugen d={BELAG.passstuecke + BELAG.fugen} />}
      achse={
        <>
          <Laser d={lot(160, 6, 198)} />
          <Linie d={stricheWaagrecht(208, RAND)} />
        </>
      }
      bau={
        <>
          <Fugen d={WANGEN} />
          <Linie d={KANTEN + ketteWaagrecht(208, [FELD.x0, FELD.x1])} />
        </>
      }
      gleich={gleich(56, 199) + gleich(264, 199)}
    />
  );
}
