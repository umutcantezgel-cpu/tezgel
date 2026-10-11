import Planblatt, { Fugen, Laser, Linie, type PlanProps } from '@/components/kern/motive/plaene/Planblatt';
import { gleich, ketteWaagrecht, lot, rechteck, reihe, stricheWaagrecht, teilung, verband, wandschnitt } from '@/components/kern/motive/plaene/geometrie';

// Plan „verlegemuster“ (Verlegemuster, Verbände): Draufsicht im Halbverband, Platten 2 : 1, Reihen um eine halbe Platte
// versetzt. Das Lot liegt auf einem Stoß der Reihen A, durch die Plattenmitte der Reihen B; in der Flucht sind die
// Reihenenden links und rechts je Reihe gleich (Bemaßung an den Reihen A). Tür oben.
const FELD = { x0: 24, y0: 24, x1: 312, y1: 184 };
const VERSATZ = { x: 12, y: 0 };
const PLATTE = 64;
const ZEILEN = reihe(56, FELD.y1, 32);
const REIHE_A = teilung(FELD.x0, FELD.x1, PLATTE, 168);
const REIHE_B = teilung(FELD.x0, FELD.x1, PLATTE, 168 + PLATTE / 2);
const STOESSE = Array.from({ length: ZEILEN.length + 1 }, (_, i) => (i % 2 === 0 ? REIHE_A : REIHE_B));
const BELAG = verband(FELD, VERSATZ, ZEILEN, STOESSE, {});
const RAND = [REIHE_A[0], REIHE_A[REIHE_A.length - 1]];

const WAND = wandschnitt(
  { x0: 16, y0: 184, x1: 320, y1: 192 },
  { x0: 16, y0: 24, x1: 24, y1: 184 },
  { x0: 312, y0: 24, x1: 320, y1: 184 },
  { x0: 16, y0: 16, x1: 56, y1: 24 },
  { x0: 104, y0: 16, x1: 320, y1: 24 },
);
const WANDKANTEN = 'M56 16H16V192H320V16H104M56 24H24V184H312V24H104M56 16V24M104 16V24';

export default function PlanVerlegemuster(props: PlanProps) {
  return (
    <Planblatt
      {...props}
      viewBox="0 0 336 224"
      feld={rechteck(FELD)}
      versatz={VERSATZ}
      belag={<Fugen d={BELAG.passstuecke + BELAG.fugen} />}
      achse={
        <>
          <Laser d={lot(168, 6, 202)} />
          <Linie d={stricheWaagrecht(208, RAND)} />
        </>
      }
      bau={
        <>
          <Fugen d={WAND} />
          <Linie d={WANDKANTEN + ketteWaagrecht(208, [FELD.x0, FELD.x1])} />
        </>
      }
      gleich={gleich(32, 199) + gleich(304, 199)}
    />
  );
}
