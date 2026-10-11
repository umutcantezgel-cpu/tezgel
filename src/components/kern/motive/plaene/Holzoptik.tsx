import Planblatt, { Fugen, Laser, Linie, type PlanProps } from '@/components/kern/motive/plaene/Planblatt';
import { gleich, ketteSenkrecht, rechteck, reihe, stricheSenkrecht, teilung, verband, waage, wandschnitt } from '@/components/kern/motive/plaene/geometrie';

// Plan „holzoptik“ (Fliesen in Holzoptik): Draufsicht mit Dielen 4 : 1 im wilden Verband – die Stöße springen von Reihe
// zu Reihe ohne festes Maß, kein Reihenende wird zum Splitter. Waage auf einer Längsfuge in Raummitte; in der Flucht
// sind die Randdielen oben und unten gleich breit (Bemaßung rechts). Tür unten.
const FELD = { x0: 24, y0: 24, x1: 296, y1: 192 };
const VERSATZ = { x: 0, y: -9 };
const DIELE = 96;
// Erster Stoß je Reihe (Abstand vom linken Rand); jedes Reihenende bleibt mindestens 14 lang.
const ERSTER = [40, 20, 60, 88, 32, 52, 14, 66];
const ZEILEN = teilung(FELD.y0, FELD.y1, 24, 108);
const STOESSE = ERSTER.map((a) => reihe(FELD.x0 + a, FELD.x1, DIELE));
const BELAG = verband(FELD, VERSATZ, ZEILEN, STOESSE, { oben: true, unten: true });
const RAND = [ZEILEN[0], ZEILEN[ZEILEN.length - 1]];

const WAND = wandschnitt(
  { x0: 16, y0: 16, x1: 304, y1: 24 },
  { x0: 16, y0: 24, x1: 24, y1: 192 },
  { x0: 296, y0: 24, x1: 304, y1: 192 },
  { x0: 16, y0: 192, x1: 56, y1: 200 },
  { x0: 104, y0: 192, x1: 304, y1: 200 },
);
const WANDKANTEN = 'M56 200H16V16H304V200H104M56 192H24V24H296V192H104M56 192V200M104 192V200';

export default function PlanHolzoptik(props: PlanProps) {
  return (
    <Planblatt
      {...props}
      viewBox="0 0 336 216"
      feld={rechteck(FELD)}
      versatz={VERSATZ}
      belag={<Fugen d={BELAG.passstuecke + BELAG.fugen} />}
      achse={
        <>
          <Laser d={waage(108, 6, 314)} />
          <Linie d={stricheSenkrecht(320, RAND)} />
        </>
      }
      bau={
        <>
          <Fugen d={WAND} />
          <Linie d={WANDKANTEN + ketteSenkrecht(320, [FELD.y0, FELD.y1])} />
        </>
      }
      gleich={gleich(312, 30) + gleich(312, 186)}
    />
  );
}
