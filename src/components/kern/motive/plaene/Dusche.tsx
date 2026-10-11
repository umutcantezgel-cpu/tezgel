import Planblatt, { Fugen, Laser, Linie, type PlanProps } from '@/components/kern/motive/plaene/Planblatt';
import { gleich, kreuzfuge, ketteWaagrecht, lot, pfeil, rechteck, reihe, stricheWaagrecht, teilung, wandschnitt } from '@/components/kern/motive/plaene/geometrie';

// Plan „dusche“ (Bodengleiche Walk-In-Duschen): Draufsicht eines bodengleichen Duschfelds. Wände an drei Seiten im
// Schnitt, die Duschrinne läuft am Wandanschluss von Wand zu Wand, Gefälle-Pfeile zur Rinne. Unten keine Schwelle: das
// Feld läuft bodengleich weiter (gestrichelte Feldgrenze). Kreuzfuge ab Rinnenkante, Lot auf der Mittelfuge.
const FELD = { x0: 24, y0: 34, x1: 296, y1: 176 };
const VERSATZ = { x: 12, y: 0 };
const SPALTEN = teilung(FELD.x0, FELD.x1, 40, 160);
const ZEILEN = reihe(74, FELD.y1, 40);
const BELAG = kreuzfuge(FELD, VERSATZ, SPALTEN, ZEILEN, { links: true, rechts: true });
const RAND = [SPALTEN[0], SPALTEN[SPALTEN.length - 1]];

const WAND = wandschnitt(
  { x0: 16, y0: 16, x1: 304, y1: 24 },
  { x0: 16, y0: 24, x1: 24, y1: 176 },
  { x0: 296, y0: 24, x1: 304, y1: 176 },
);
const WANDKANTEN = 'M16 176V16H304V176M24 176V24H296V176M16 176H24M296 176H304';
const RINNE = `M24 34H296M32 29H288${pfeil(100, 150, 100, 44)}${pfeil(220, 150, 220, 44)}`;

export default function PlanDusche(props: PlanProps) {
  return (
    <Planblatt
      {...props}
      viewBox="0 0 320 208"
      feld={rechteck(FELD)}
      versatz={VERSATZ}
      belag={<Fugen d={BELAG.passstuecke + BELAG.fugen} />}
      achse={
        <>
          <Laser d={lot(160, 6, 186)} />
          <Linie d={stricheWaagrecht(196, RAND)} />
        </>
      }
      bau={
        <>
          <Fugen d={WAND} />
          <g className="text-k-strich">
            <Linie d="M24 176H296" strokeDasharray="4 4" />
          </g>
          <Linie d={WANDKANTEN + RINNE + ketteWaagrecht(196, [FELD.x0, FELD.x1])} />
        </>
      }
      gleich={gleich(32, 187) + gleich(288, 187)}
    />
  );
}
