import Planblatt, { Fugen, Laser, Linie, type PlanProps } from '@/components/kern/motive/plaene/Planblatt';
import { Punkt } from '@/components/kern/motive/vignetten/zeichnen';
import { gleich, kreuzfuge, ketteWaagrecht, lot, pfeil, rechteck, reihe, stricheWaagrecht, teilung, wandschnitt } from '@/components/kern/motive/plaene/geometrie';

// Plan „stelzlager“ (Leistung Balkon- & Terrassensanierung, Platten auf Stelzlagern): Draufsicht einer Terrasse vor
// der Hauswand (im Schnitt). Platten in Kreuzfuge mit offenen Fugen, unter jedem Fugenkreuz ein Stelzlager (Kreis) –
// die Lager wandern mit dem Belag. Gefälle-Pfeile vom Gebäude weg, vorn der Randabschluss als Doppellinie. In der
// Flucht steht das Lot auf der Mittelfuge, Passstücke links und rechts gleich.
const FELD = { x0: 24, y0: 24, x1: 296, y1: 184 };
const VERSATZ = { x: 12, y: 0 };
const SPALTEN = teilung(FELD.x0, FELD.x1, 40, 160);
const ZEILEN = reihe(64, FELD.y1, 40);
const BELAG = kreuzfuge(FELD, VERSATZ, SPALTEN, ZEILEN, { links: true, rechts: true });
const RAND = [SPALTEN[0], SPALTEN[SPALTEN.length - 1]];
const LAGER = SPALTEN.flatMap((x) => ZEILEN.map((y) => [x, y] as const));

const WAND = wandschnitt({ x0: 16, y0: 16, x1: 304, y1: 24 });
const KANTEN = `M16 16H304M16 24H304M16 16V24M304 16V24M24 24V188M296 24V188M24 184H296M24 188H296${pfeil(100, 44, 100, 164)}${pfeil(220, 44, 220, 164)}`;

export default function PlanStelzlager(props: PlanProps) {
  return (
    <Planblatt
      {...props}
      viewBox="0 0 320 216"
      feld={rechteck(FELD)}
      versatz={VERSATZ}
      belag={<Fugen d={BELAG.passstuecke + BELAG.fugen} />}
      achse={
        <>
          <Laser d={lot(160, 6, 196)} />
          <Linie d={stricheWaagrecht(204, RAND)} />
          {LAGER.map(([x, y]) => (
            <Punkt key={`${x}-${y}`} cx={x} cy={y} r="4" />
          ))}
        </>
      }
      bau={
        <>
          <Fugen d={WAND} />
          <Linie d={KANTEN + ketteWaagrecht(204, [FELD.x0, FELD.x1])} />
        </>
      }
      gleich={gleich(32, 196) + gleich(288, 196)}
    />
  );
}
