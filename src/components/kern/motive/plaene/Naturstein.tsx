import Planblatt, { Fugen, Laser, Linie, type PlanProps } from '@/components/kern/motive/plaene/Planblatt';
import { gleich, kreuzfuge, ketteWaagrecht, lot, rechteck, stricheWaagrecht, teilung, wandschnitt } from '@/components/kern/motive/plaene/geometrie';

// Plan „naturstein“ (Granit & Natursteinbeläge): Draufsicht eines Wohnraums mit großen quadratischen Platten in
// Kreuzfuge. Anders als bei den übrigen Plänen liegt die Achse hier auf der Plattenmitte, nicht auf einer Fuge: das Lot
// teilt die mittlere Plattenreihe. In der Flucht sind die Passstücke an allen vier Rändern paarweise gleich. Tür unten.
const FELD = { x0: 24, y0: 24, x1: 296, y1: 200 };
const VERSATZ = { x: -12, y: 0 };
const PLATTE = 48;
const SPALTEN = teilung(FELD.x0, FELD.x1, PLATTE, 160 + PLATTE / 2);
const ZEILEN = teilung(FELD.y0, FELD.y1, PLATTE, 112 + PLATTE / 2);
const BELAG = kreuzfuge(FELD, VERSATZ, SPALTEN, ZEILEN, { links: true, rechts: true, oben: true, unten: true });
const RAND = [SPALTEN[0], SPALTEN[SPALTEN.length - 1]];

const WAND = wandschnitt(
  { x0: 16, y0: 16, x1: 304, y1: 24 },
  { x0: 16, y0: 24, x1: 24, y1: 200 },
  { x0: 296, y0: 24, x1: 304, y1: 200 },
  { x0: 16, y0: 200, x1: 64, y1: 208 },
  { x0: 112, y0: 200, x1: 304, y1: 208 },
);
const WANDKANTEN = 'M64 208H16V16H304V208H112M64 200H24V24H296V200H112M64 200V208M112 200V208';

export default function PlanNaturstein(props: PlanProps) {
  return (
    <Planblatt
      {...props}
      viewBox="0 0 320 236"
      feld={rechteck(FELD)}
      versatz={VERSATZ}
      belag={<Fugen d={BELAG.passstuecke + BELAG.fugen} />}
      achse={
        <>
          <Laser d={lot(160, 6, 218)} />
          <Linie d={stricheWaagrecht(224, RAND)} />
        </>
      }
      bau={
        <>
          <Fugen d={WAND} />
          <Linie d={WANDKANTEN + ketteWaagrecht(224, [FELD.x0, FELD.x1])} />
        </>
      }
      gleich={gleich(32, 215) + gleich(288, 215)}
    />
  );
}
