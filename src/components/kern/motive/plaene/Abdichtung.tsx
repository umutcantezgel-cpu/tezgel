import Planblatt, { Fugen, Laser, Linie, type PlanProps } from '@/components/kern/motive/plaene/Planblatt';
import {
  gleich, kreuzfuge, ketteSenkrecht, ketteWaagrecht, lot, rechteck, stricheSenkrecht, stricheWaagrecht, teilung, waage, wandschnitt,
} from '@/components/kern/motive/plaene/geometrie';

// Plan „abdichtung“ (Leistung Untergrund & DIN 18534 Abdichtung): Draufsicht eines Nassraums. Unter dem Belag
// (gestrichelt): Dichtband an allen Wandanschlüssen, Manschetten an den Rohrdurchdringungen und am Bodenablauf. Der
// Ablauf ist ausgespart; in der Flucht sitzt er im Fugenkreuz von Waage und Lot, Passstücke links = rechts und
// oben = unten. Tür unten.
const FELD = { x0: 24, y0: 24, x1: 248, y1: 184 };
const ABLAUF = { x0: 128, y0: 96, x1: 144, y1: 112 };
const VERSATZ = { x: -12, y: 10 };
const SPALTEN = teilung(FELD.x0, FELD.x1, 32, 136);
const ZEILEN = teilung(FELD.y0, FELD.y1, 32, 104);
const BELAG = kreuzfuge(FELD, VERSATZ, SPALTEN, ZEILEN, { links: true, rechts: true, oben: true, unten: true });
const RAND_X = [SPALTEN[0], SPALTEN[SPALTEN.length - 1]];
const RAND_Y = [ZEILEN[0], ZEILEN[ZEILEN.length - 1]];

/** Kreis als Pfad (für Aussparung und Darstellung gleich). */
const kreis = (cx: number, cy: number, rad: number) => `M${cx - rad} ${cy}a${rad} ${rad} 0 1 0 ${2 * rad} 0a${rad} ${rad} 0 1 0 ${-2 * rad} 0Z`;
const ROHRE = kreis(184, 36, 4) + kreis(208, 36, 4);

const WAND = wandschnitt(
  { x0: 16, y0: 16, x1: 256, y1: 24 },
  { x0: 16, y0: 24, x1: 24, y1: 184 },
  { x0: 248, y0: 24, x1: 256, y1: 184 },
  { x0: 16, y0: 184, x1: 56, y1: 192 },
  { x0: 104, y0: 184, x1: 256, y1: 192 },
);
const WANDKANTEN = 'M56 192H16V16H256V192H104M56 184H24V24H248V184H104M56 184V192M104 184V192';
const UNTER_DEM_BELAG = `M56 180H28V28H244V180H104${kreis(184, 36, 8)}${kreis(208, 36, 8)}${rechteck({ x0: 120, y0: 88, x1: 152, y1: 120 })}`;
const ABLAUF_KANTEN = rechteck(ABLAUF) + rechteck({ x0: 131, y0: 99, x1: 141, y1: 109 });

export default function PlanAbdichtung(props: PlanProps) {
  return (
    <Planblatt
      {...props}
      viewBox="0 0 288 224"
      feld={rechteck(FELD) + rechteck(ABLAUF) + ROHRE}
      versatz={VERSATZ}
      belag={<Fugen d={BELAG.passstuecke + BELAG.fugen} />}
      achse={
        <>
          <Laser d={lot(136, 6, 200) + waage(104, 6, 264)} />
          <Linie d={stricheWaagrecht(208, RAND_X) + stricheSenkrecht(272, RAND_Y)} />
        </>
      }
      bau={
        <>
          <Fugen d={WAND} />
          <Linie d={UNTER_DEM_BELAG} strokeDasharray="6 3" />
          <Linie d={WANDKANTEN + ROHRE + ABLAUF_KANTEN + ketteWaagrecht(208, [FELD.x0, FELD.x1]) + ketteSenkrecht(272, [FELD.y0, FELD.y1])} />
        </>
      }
      gleich={gleich(32, 199) + gleich(240, 199) + gleich(264, 32) + gleich(264, 176)}
    />
  );
}
