import Planblatt, { Fugen, Laser, Linie, type PlanProps } from '@/components/kern/motive/plaene/Planblatt';
import {
  fugenkreuz, gleich, kreuzfuge, ketteSenkrecht, ketteWaagrecht, lot, rechteck, stricheSenkrecht, stricheWaagrecht, teilung, waage, wandschnitt,
} from '@/components/kern/motive/plaene/geometrie';

// Plan „kreuzfuge“ (Feinsteinzeug & Fliesen): Draufsicht eines Raums in Kreuzfuge, Achsenkreuz wie beim
// Kreuzlinienlaser – Waage und Lot, im Kreuzpunkt das Fugenkreuz. Der Belag rückt in beide Richtungen in die Flucht:
// Passstücke links = rechts und oben = unten (Bemaßung unten und rechts). Tür links.
const FELD = { x0: 24, y0: 24, x1: 248, y1: 184 };
const VERSATZ = { x: 12, y: -10 };
const SPALTEN = teilung(FELD.x0, FELD.x1, 32, 136);
const ZEILEN = teilung(FELD.y0, FELD.y1, 32, 104);
const BELAG = kreuzfuge(FELD, VERSATZ, SPALTEN, ZEILEN, { links: true, rechts: true, oben: true, unten: true });
const RAND_X = [SPALTEN[0], SPALTEN[SPALTEN.length - 1]];
const RAND_Y = [ZEILEN[0], ZEILEN[ZEILEN.length - 1]];

const WAND = wandschnitt(
  { x0: 16, y0: 16, x1: 256, y1: 24 },
  { x0: 16, y0: 184, x1: 256, y1: 192 },
  { x0: 248, y0: 24, x1: 256, y1: 184 },
  { x0: 16, y0: 24, x1: 24, y1: 120 },
  { x0: 16, y0: 168, x1: 24, y1: 184 },
);
const WANDKANTEN = 'M16 120V16H256V192H16V168M24 120V24H248V184H24V168M16 120H24M16 168H24';

export default function PlanKreuzfuge(props: PlanProps) {
  return (
    <Planblatt
      {...props}
      viewBox="0 0 288 224"
      feld={rechteck(FELD)}
      versatz={VERSATZ}
      belag={<Fugen d={BELAG.passstuecke + BELAG.fugen} />}
      achse={
        <>
          <Laser d={lot(136, 6, 200) + waage(104, 6, 264)} kreuz={fugenkreuz(136, 104)} />
          <Linie d={stricheWaagrecht(208, RAND_X) + stricheSenkrecht(272, RAND_Y)} />
        </>
      }
      bau={
        <>
          <Fugen d={WAND} />
          <Linie d={WANDKANTEN + ketteWaagrecht(208, [FELD.x0, FELD.x1]) + ketteSenkrecht(272, [FELD.y0, FELD.y1])} />
        </>
      }
      gleich={gleich(32, 199) + gleich(240, 199) + gleich(264, 32) + gleich(264, 176)}
    />
  );
}
