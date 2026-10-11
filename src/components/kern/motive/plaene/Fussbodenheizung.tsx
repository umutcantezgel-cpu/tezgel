import Planblatt, { Fugen, Laser, Linie, type PlanProps } from '@/components/kern/motive/plaene/Planblatt';
import { gleich, kreuzfuge, ketteWaagrecht, lot, rechteck, stricheWaagrecht, teilung, wandschnitt } from '@/components/kern/motive/plaene/geometrie';

// Plan „fussbodenheizung“ (Fliesen auf Fußbodenheizung): Draufsicht eines Raums mit zwei Heizfeldern. Die Heizrohre
// liegen im Estrich (gestrichelt, unter dem Belag), zwischen den Feldern die Bewegungsfuge (Doppellinie). Kreuzfuge,
// Lot auf der Mittelfuge; in der Flucht liegt die Belagsfuge deckungsgleich auf der Bewegungsfuge, Passstücke links und
// rechts gleich. Tür links.
const FELD = { x0: 24, y0: 24, x1: 296, y1: 184 };
const VERSATZ = { x: 12, y: 0 };
const SPALTEN = teilung(FELD.x0, FELD.x1, 40, 160);
const ZEILEN = teilung(FELD.y0, FELD.y1, 40, 104);
const BELAG = kreuzfuge(FELD, VERSATZ, SPALTEN, ZEILEN, { links: true, rechts: true });
const RAND = [SPALTEN[0], SPALTEN[SPALTEN.length - 1]];

/** Heizkreis als Mäander zwischen y 36 und 172; Läufe im Abstand 20, je 10 neben den Fugen der Flucht. */
function heizkreis(x0: number, laeufe: number): string {
  let d = `M${x0} 172`;
  for (let i = 0; i < laeufe; i++) {
    d += i % 2 === 0 ? 'V36' : 'V172';
    if (i < laeufe - 1) d += `H${x0 + (i + 1) * 20}`;
  }
  return d;
}
const HEIZROHRE = heizkreis(30, 7) + heizkreis(170, 7);

const WAND = wandschnitt(
  { x0: 16, y0: 16, x1: 304, y1: 24 },
  { x0: 16, y0: 184, x1: 304, y1: 192 },
  { x0: 296, y0: 24, x1: 304, y1: 184 },
  { x0: 16, y0: 24, x1: 24, y1: 64 },
  { x0: 16, y0: 112, x1: 24, y1: 184 },
);
const WANDKANTEN = 'M16 64V16H304V192H16V112M24 64V24H296V184H24V112M16 64H24M16 112H24';

export default function PlanFussbodenheizung(props: PlanProps) {
  return (
    <Planblatt
      {...props}
      viewBox="0 0 320 220"
      feld={rechteck(FELD)}
      versatz={VERSATZ}
      belag={<Fugen d={BELAG.passstuecke + BELAG.fugen} />}
      achse={
        <>
          <Laser d={lot(160, 6, 202)} />
          <Linie d={stricheWaagrecht(208, RAND)} />
        </>
      }
      bau={
        <>
          <Fugen d={WAND} />
          <g className="text-k-strich">
            <Linie d={HEIZROHRE} strokeDasharray="3 3" />
          </g>
          <Linie d={`${WANDKANTEN}M158 24V184M162 24V184${ketteWaagrecht(208, [FELD.x0, FELD.x1])}`} />
        </>
      }
      gleich={gleich(32, 199) + gleich(288, 199)}
    />
  );
}
