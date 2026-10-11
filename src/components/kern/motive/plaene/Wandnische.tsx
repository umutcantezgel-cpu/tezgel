import Planblatt, { Fugen, Laser, Linie, type PlanProps } from '@/components/kern/motive/plaene/Planblatt';
import { gleich, kreuzfuge, ketteWaagrecht, lot, rechteck, stricheWaagrecht, teilung, wandschnitt } from '@/components/kern/motive/plaene/geometrie';

// Plan „wandnische“ (Beleuchtete Wandnischen): Wandansicht statt Draufsicht – eine Nischenwand gehört in die Ansicht.
// Fliesen 2 : 1 in Kreuzfuge vom Boden aufwärts, Passstücke links und rechts gleich, oben ein Passstück unter der
// Fliesenkante. Die Nische (ausgespart, mit Leibung und Lichtprofil oben) steht fest; in der Flucht liegen ihre Kanten
// auf Fugen und das Lot läuft durch ihre Mitte.
const FELD = { x0: 24, y0: 24, x1: 296, y1: 200 };
const NISCHE = { x0: 136, y0: 80, x1: 184, y1: 128 };
const VERSATZ = { x: -12, y: 0 };
const SPALTEN = teilung(FELD.x0, FELD.x1, 48, 184);
const ZEILEN = teilung(FELD.y0, FELD.y1, 24, 200);
const BELAG = kreuzfuge(FELD, VERSATZ, SPALTEN, ZEILEN, { links: true, rechts: true, oben: true });
const RAND = [SPALTEN[0], SPALTEN[SPALTEN.length - 1]];

const BODEN = wandschnitt({ x0: 8, y0: 200, x1: 312, y1: 206 });
const KANTEN = `M8 200H312M24 200V16M296 200V16M24 24H296${rechteck(NISCHE)}${rechteck({ x0: 140, y0: 84, x1: 180, y1: 124 })}M144 88H176`;

export default function PlanWandnische(props: PlanProps) {
  return (
    <Planblatt
      {...props}
      viewBox="0 0 320 232"
      feld={rechteck(FELD) + rechteck(NISCHE)}
      versatz={VERSATZ}
      belag={<Fugen d={BELAG.passstuecke + BELAG.fugen} />}
      achse={
        <>
          <Laser d={lot(160, 6, 212)} />
          <Linie d={stricheWaagrecht(220, RAND)} />
        </>
      }
      bau={
        <>
          <Fugen d={BODEN} />
          <Linie d={KANTEN + ketteWaagrecht(220, [FELD.x0, FELD.x1])} />
        </>
      }
      gleich={gleich(32, 212) + gleich(288, 212)}
    />
  );
}
