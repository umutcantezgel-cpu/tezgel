import Planblatt, { Fugen, Laser, Linie, type PlanProps } from '@/components/kern/motive/plaene/Planblatt';
import { gleich, ketteSenkrecht, rechteck, reihe, stricheSenkrecht, teilung, verband, waage, wandschnitt } from '@/components/kern/motive/plaene/geometrie';

// Plan „grossformat“ (XXL-Großformatfliesen, Großformat-Seiten): Draufsicht eines Raums, Platten 2 : 1 im Drittelverband
// (Reihenversatz 1/3 Platte, K-007). Erster Stoß je Reihe so gewählt, dass kein Reihenende zum Splitter wird. Waage auf
// der mittleren Lagerfuge; in der Flucht sind die Passreihen oben und unten gleich (Bemaßung rechts). Tür unten.
const FELD = { x0: 24, y0: 24, x1: 296, y1: 184 };
const VERSATZ = { x: 0, y: 12 };
const PLATTE = 64;
const ZEILEN = teilung(FELD.y0, FELD.y1, 32, 104);
const STOESSE = Array.from({ length: ZEILEN.length + 1 }, (_, i) => reihe(FELD.x0 + ((20 + (i * PLATTE) / 3) % PLATTE), FELD.x1, PLATTE));
const BELAG = verband(FELD, VERSATZ, ZEILEN, STOESSE, { oben: true, unten: true });
const RAND = [ZEILEN[0], ZEILEN[ZEILEN.length - 1]];

const WAND = wandschnitt(
  { x0: 16, y0: 16, x1: 304, y1: 24 },
  { x0: 16, y0: 24, x1: 24, y1: 184 },
  { x0: 296, y0: 24, x1: 304, y1: 184 },
  { x0: 16, y0: 184, x1: 200, y1: 192 },
  { x0: 248, y0: 184, x1: 304, y1: 192 },
);
const WANDKANTEN = 'M200 192H16V16H304V192H248M200 184H24V24H296V184H248M200 184V192M248 184V192';

export default function PlanGrossformat(props: PlanProps) {
  return (
    <Planblatt
      {...props}
      viewBox="0 0 336 208"
      feld={rechteck(FELD)}
      versatz={VERSATZ}
      belag={<Fugen d={BELAG.passstuecke + BELAG.fugen} />}
      achse={
        <>
          <Laser d={waage(104, 6, 314)} />
          <Linie d={stricheSenkrecht(320, RAND)} />
        </>
      }
      bau={
        <>
          <Fugen d={WAND} />
          <Linie d={WANDKANTEN + ketteSenkrecht(320, [FELD.y0, FELD.y1])} />
        </>
      }
      gleich={gleich(312, 32) + gleich(312, 176)}
    />
  );
}
