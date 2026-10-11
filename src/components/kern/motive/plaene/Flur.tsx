import Planblatt, { Fugen, Laser, Linie, type PlanProps } from '@/components/kern/motive/plaene/Planblatt';
import { gleich, ketteSenkrecht, rechteck, reihe, stricheSenkrecht, teilung, verband, waage, wandschnitt } from '@/components/kern/motive/plaene/geometrie';

// Plan „flur“ (Küchen, Dielen & Flure): Draufsicht eines schmalen Flurs mit Türen an beiden Längsseiten und an der
// Stirnseite. Rechteckformat 2 : 1, Versatz auf ein Drittel begrenzt. Die Waage läuft längs durch die Flurmitte und
// durch die Stirntür; in der Flucht sind die Randstreifen an beiden Wänden gleich (Bemaßung links).
const FELD = { x0: 40, y0: 24, x1: 304, y1: 96 };
const VERSATZ = { x: 0, y: 9 };
const PLATTE = 48;
const ZEILEN = teilung(FELD.y0, FELD.y1, 24, 60);
const STOESSE = Array.from({ length: ZEILEN.length + 1 }, (_, i) => reihe(FELD.x0 + ((12 + (i * PLATTE) / 3) % PLATTE), FELD.x1, PLATTE));
const BELAG = verband(FELD, VERSATZ, ZEILEN, STOESSE, { oben: true, unten: true });
const RAND = [ZEILEN[0], ZEILEN[ZEILEN.length - 1]];

const WAND = wandschnitt(
  { x0: 32, y0: 16, x1: 88, y1: 24 },
  { x0: 136, y0: 16, x1: 312, y1: 24 },
  { x0: 32, y0: 96, x1: 184, y1: 104 },
  { x0: 232, y0: 96, x1: 312, y1: 104 },
  { x0: 32, y0: 24, x1: 40, y1: 96 },
  { x0: 304, y0: 24, x1: 312, y1: 40 },
  { x0: 304, y0: 80, x1: 312, y1: 96 },
);
const WANDKANTEN =
  'M88 16H32V104H184M232 104H312V80M312 40V16H136M88 24H40V96H184M232 96H304V80M304 40V24H136' +
  'M88 16V24M136 16V24M184 96V104M232 96V104M304 40H312M304 80H312';

export default function PlanFlur(props: PlanProps) {
  return (
    <Planblatt
      {...props}
      viewBox="0 0 336 120"
      feld={rechteck(FELD)}
      versatz={VERSATZ}
      belag={<Fugen d={BELAG.passstuecke + BELAG.fugen} />}
      achse={
        <>
          <Laser d={waage(60, 28, 326)} />
          <Linie d={stricheSenkrecht(16, RAND)} />
        </>
      }
      bau={
        <>
          <Fugen d={WAND} />
          <Linie d={WANDKANTEN + ketteSenkrecht(16, [FELD.y0, FELD.y1])} />
        </>
      }
      gleich={gleich(25, 30) + gleich(25, 90)}
    />
  );
}
