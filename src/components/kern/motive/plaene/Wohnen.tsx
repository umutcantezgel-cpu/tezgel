import Planblatt, { Fugen, Laser, Linie, type PlanProps } from '@/components/kern/motive/plaene/Planblatt';
import { gleich, kreuzfuge, ketteSenkrecht, rechteck, reihe, stricheSenkrecht, teilung, waage, wandschnitt } from '@/components/kern/motive/plaene/geometrie';

// Plan „wohnen“ (Leistung Wohnbereiche & Neubau): zwei Räume, verbunden durch eine Tür. Die Waage läuft durch die
// Türmitte über beide Räume – eine Fugenachse für beide Bereiche. Kreuzfuge, je Raum ganze Fliesen in der Breite;
// in der Flucht liegt die Waage auf der Fuge in Türmitte, Passstücke oben und unten gleich (Bemaßung rechts).
const FELD = { x0: 24, y0: 24, x1: 288, y1: 192 };
const RAUM_A = { x0: 24, y0: 24, x1: 152, y1: 192 };
const TUER = { x0: 152, y0: 88, x1: 160, y1: 128 };
const RAUM_B = { x0: 160, y0: 24, x1: 288, y1: 192 };
const VERSATZ = { x: 0, y: 9 };
const SPALTEN = [...reihe(56, 152, 32), ...reihe(192, 288, 32)];
const ZEILEN = teilung(FELD.y0, FELD.y1, 32, 108);
const BELAG = kreuzfuge(FELD, VERSATZ, SPALTEN, ZEILEN, { oben: true, unten: true });
const RAND = [ZEILEN[0], ZEILEN[ZEILEN.length - 1]];

const WAND = wandschnitt(
  { x0: 16, y0: 16, x1: 296, y1: 24 },
  { x0: 16, y0: 192, x1: 296, y1: 200 },
  { x0: 16, y0: 24, x1: 24, y1: 192 },
  { x0: 288, y0: 24, x1: 296, y1: 192 },
  { x0: 152, y0: 24, x1: 160, y1: 88 },
  { x0: 152, y0: 128, x1: 160, y1: 192 },
);
const WANDKANTEN = `${rechteck({ x0: 16, y0: 16, x1: 296, y1: 200 })}M152 88V24H24V192H152V128M160 88V24H288V192H160V128M152 88H160M152 128H160`;

export default function PlanWohnen(props: PlanProps) {
  return (
    <Planblatt
      {...props}
      viewBox="0 0 328 216"
      feld={rechteck(RAUM_A) + rechteck(TUER) + rechteck(RAUM_B)}
      versatz={VERSATZ}
      belag={<Fugen d={BELAG.passstuecke + BELAG.fugen} />}
      achse={
        <>
          <Laser d={waage(108, 6, 306)} />
          <Linie d={stricheSenkrecht(312, RAND)} />
        </>
      }
      bau={
        <>
          <Fugen d={WAND} />
          <Linie d={WANDKANTEN + ketteSenkrecht(312, [FELD.y0, FELD.y1])} />
        </>
      }
      gleich={gleich(304, 34) + gleich(304, 182)}
    />
  );
}
