import Planblatt, { Fugen, Laser, Linie, type PlanProps } from '@/components/kern/motive/plaene/Planblatt';
import { gleich, kreuzfuge, ketteWaagrecht, lot, pfeil, rechteck, reihe, stricheWaagrecht, teilung, wandschnitt } from '@/components/kern/motive/plaene/geometrie';

// Plan „balkon“ (Balkonsanierung, Gefälleausbildung & Entwässerung, witterungsbeständige Abdichtung): Draufsicht eines
// Balkons vor der Hauswand. Gefälle-Pfeile vom Gebäude zur Rinne an der freien Kante, davor Randabschluss mit
// Tropfkante (Doppellinie). Zwei Geländerpfosten (ausgespart) mit Manschette (gestrichelt). Kreuzfuge ab der Hauswand,
// an der Rinne ein Passstück; in der Flucht steht das Lot auf der Mittelfuge, Passstücke links und rechts gleich.
const FELD = { x0: 24, y0: 24, x1: 296, y1: 160 };
const VERSATZ = { x: -12, y: 0 };
const SPALTEN = teilung(FELD.x0, FELD.x1, 40, 160);
const ZEILEN = reihe(64, FELD.y1, 40);
const BELAG = kreuzfuge(FELD, VERSATZ, SPALTEN, ZEILEN, { links: true, rechts: true, unten: true });
const RAND = [SPALTEN[0], SPALTEN[SPALTEN.length - 1]];
const PFOSTEN = rechteck({ x0: 56, y0: 136, x1: 64, y1: 144 }) + rechteck({ x0: 256, y0: 136, x1: 264, y1: 144 });

const WAND = wandschnitt({ x0: 16, y0: 16, x1: 304, y1: 24 });
const KANTEN =
  `M16 16H304M16 24H304M16 16V24M304 16V24M24 24V178M296 24V178M24 160H296M32 165H288M20 174H300M20 178H300` +
  `${pfeil(100, 40, 100, 150)}${pfeil(220, 40, 220, 150)}`;
const MANSCHETTEN = rechteck({ x0: 52, y0: 132, x1: 68, y1: 148 }) + rechteck({ x0: 252, y0: 132, x1: 268, y1: 148 });

export default function PlanBalkon(props: PlanProps) {
  return (
    <Planblatt
      {...props}
      viewBox="0 0 320 208"
      feld={rechteck(FELD) + PFOSTEN}
      versatz={VERSATZ}
      belag={<Fugen d={BELAG.passstuecke + BELAG.fugen} />}
      achse={
        <>
          <Laser d={lot(160, 6, 184)} />
          <Linie d={stricheWaagrecht(194, RAND)} />
        </>
      }
      bau={
        <>
          <Fugen d={WAND} />
          <Linie d={MANSCHETTEN} strokeDasharray="4 2" />
          <Linie d={KANTEN + PFOSTEN + ketteWaagrecht(194, [FELD.x0, FELD.x1])} />
        </>
      }
      gleich={gleich(32, 186) + gleich(288, 186)}
    />
  );
}
