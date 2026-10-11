import Planblatt, { Fugen, Laser, Linie, type PlanProps } from '@/components/kern/motive/plaene/Planblatt';
import { gleich, kreuzfuge, ketteWaagrecht, lot, pfeil, rechteck, stricheWaagrecht, teilung, wandschnitt } from '@/components/kern/motive/plaene/geometrie';

// Plan „bad“ (Leistung Bäder & Wellness): Draufsicht eines Bades. Wände im Schnitt, Tür unten, Duschbereich oben rechts
// mit Glastrennwand, Duschrinne am Wandanschluss (ausgespart) und Gefälle-Pfeilen zur Rinne. Kreuzfuge, Lot auf der
// Mittelfuge; in der Flucht liegen die Rinnenenden auf Fugen, Passstücke links und rechts gleich, oben und unten gleich.
const FELD = { x0: 24, y0: 24, x1: 296, y1: 192 };
const RINNE = { x0: 200, y0: 26, x1: 280, y1: 34 };
const VERSATZ = { x: 12, y: 0 };
const SPALTEN = teilung(FELD.x0, FELD.x1, 40, 160);
const ZEILEN = teilung(FELD.y0, FELD.y1, 40, 128);
const BELAG = kreuzfuge(FELD, VERSATZ, SPALTEN, ZEILEN, { links: true, rechts: true, oben: true, unten: true });
const RAND = [SPALTEN[0], SPALTEN[SPALTEN.length - 1]];

const WAND = wandschnitt(
  { x0: 16, y0: 16, x1: 304, y1: 24 },
  { x0: 16, y0: 24, x1: 24, y1: 192 },
  { x0: 296, y0: 24, x1: 304, y1: 192 },
  { x0: 16, y0: 192, x1: 48, y1: 200 },
  { x0: 96, y0: 192, x1: 304, y1: 200 },
);
const WANDKANTEN = 'M48 200H16V16H304V200H96M48 192H24V24H296V192H96M48 192V200M96 192V200';
const DUSCHE = `${rechteck(RINNE)}M206 30H274M192 24V112M196 24V112M192 112H196${pfeil(220, 104, 220, 44)}${pfeil(260, 104, 260, 44)}`;

export default function PlanBad(props: PlanProps) {
  return (
    <Planblatt
      {...props}
      viewBox="0 0 320 228"
      feld={rechteck(FELD) + rechteck(RINNE)}
      versatz={VERSATZ}
      belag={<Fugen d={BELAG.passstuecke + BELAG.fugen} />}
      achse={
        <>
          <Laser d={lot(160, 6, 210)} />
          <Linie d={stricheWaagrecht(216, RAND)} />
        </>
      }
      bau={
        <>
          <Fugen d={WAND} />
          <Linie d={WANDKANTEN + DUSCHE + ketteWaagrecht(216, [FELD.x0, FELD.x1])} />
        </>
      }
      gleich={gleich(32, 207) + gleich(288, 207)}
    />
  );
}
