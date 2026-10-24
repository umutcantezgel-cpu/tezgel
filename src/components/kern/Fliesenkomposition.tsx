// Fliesenkomposition (KERN v3 K-012, Auftrag Abschnitt 8): bewusst gestaltete Fläche aus dem Formsystem für Bildplätze
// ohne passendes Foto, nie ein grauer Kasten. Fliesen 2:1 in Fliese und Fuge; je Motiv ein Verband oder ein Detail.
// Dekorativ (aria-hidden), Seitenverhältnis über `format` wie beim Bildfeld. Verbände als SVG-Muster (eine Musterkachel je Zeichnung
// statt einer Fläche je Fliese: weniger Elemente im Dokument und in den Daten der Hydrierung, gleiche Geometrie; E-034).
import { useId } from 'react';
import clsx from 'clsx';

export type Kompositionsmotiv = 'drittelverband' | 'halbverband' | 'kreuzfuge' | 'riss' | 'fischgraet' | 'verlegekante';

const B = 120; // Rasterbreite der Zeichnung (Fliese 24 × 12 bzw. 12 × 12)

type Flaeche = { x: number; y: number; w: number; h: number };

/** Musterkachel eines Verbands: `periode` Reihen der Höhe `hoehe`, Reihe r um versatz(r) nach links verschoben, Fliesen der Länge
 *  `laenge` mit 1 Einheit Fuge (je 0,5 rundum). Die Kachel wiederholt sich ab dem Ursprung wie zuvor die einzelnen Reihen. */
function kachel(versatz: (r: number) => number, periode: number, laenge: number, hoehe: number) {
  const teile: Flaeche[] = [];
  for (let r = 0; r < periode; r++) {
    for (let x = -versatz(r); x < laenge; x += laenge) {
      if (x + laenge > 0) teile.push({ x: x + 0.5, y: r * hoehe + 0.5, w: laenge - 1, h: hoehe - 1 });
    }
  }
  return { w: laenge, h: hoehe * periode, teile };
}

// Mitte des Risses (Motiv „riss“), damit ein Ausschnitt ihn zeigt
const RISS_MITTE = { x: 57, y: 41 };
// Motiv „verlegekante“ (Neubau): links gelegte Fliesen im Halbverband bis zur Kante, rechts der freie Estrich in Kalk, davor
// die Laserlinie, an der die nächste Reihe anliegt (wie die Zeichnung der 404)
const KANTE = 64;
const LASER_ABSTAND = 8;

/** `fuellen`: füllt die Höhe des Bildplatzes (Zuschnitt per slice) statt der Höhe aus dem Format, z. B. in einer Fliese mit Text.
 *  `ausschnitt`: zeigt nur diese Breite der Zeichnung (Einheiten von 120, gleiches Format), mittig bzw. um den Riss, damit
 *  ein kleines Muster wenige große Fliesen mit sichtbarer Fuge zeigt statt vieler winziger.
 *  `deutlich`: Fugen in Strich statt Fuge (≥ 3:1 gegen Fliese) und ein rotes Merkmal wie in der Zeichnung der 404: bei den
 *  Verbänden die Laserlinie auf der Fuge nahe der Mitte, beim Riss der Riss selbst (Sichtabnahme E2, Befund 12). */
export default function Fliesenkomposition({ motiv, format = '1:1', fuellen = false, ausschnitt = B, deutlich = false, className }: { motiv: Kompositionsmotiv; format?: '1:1' | '4:5' | '3:2' | '16:9'; fuellen?: boolean; ausschnitt?: number; deutlich?: boolean; className?: string }) {
  const [fb, fh] = format.split(':').map(Number);
  const H = Math.round((B * fh) / fb);
  const aw = Math.min(ausschnitt, B);
  const ah = Math.round((aw * fh) / fb);
  const mitte = motiv === 'riss' ? RISS_MITTE : { x: B / 2, y: H / 2 };
  const ax = Math.min(Math.max(mitte.x - aw / 2, 0), B - aw);
  const ay = Math.min(Math.max(mitte.y - ah / 2, 0), H - ah);
  const muster =
    motiv === 'kreuzfuge' || motiv === 'riss'
      ? kachel(() => 0, 1, 24, 24)
      : motiv === 'halbverband' || motiv === 'verlegekante'
        ? kachel((r) => r * 12, 2, 24, 12)
        : kachel((r) => r * 8, 3, 24, 12);
  const id = `fk${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const fisch = motiv === 'fischgraet';
  const kante = motiv === 'verlegekante';
  // Laserlinie auf der waagrechten Fuge, die der Mitte am nächsten liegt (Reihenhöhe 24 bei Kreuzfuge, sonst 12)
  const reihe = motiv === 'kreuzfuge' ? 24 : 12;
  const laserY = deutlich && !fisch && !kante && motiv !== 'riss' ? Math.round(mitte.y / reihe) * reihe : null;
  return (
    <svg viewBox={`${ax} ${ay} ${aw} ${ah}`} aria-hidden="true" focusable="false" className={clsx('block w-full', deutlich ? 'bg-strich' : 'bg-fuge', fuellen ? 'h-full' : 'h-auto', className)} preserveAspectRatio="xMidYMid slice">
      {fisch ? (
        <g className="fill-fliese">
          {Array.from({ length: Math.ceil(H / 12) + 2 }, (_, r) =>
            Array.from({ length: 7 }, (_, s) => {
              const x = s * 18 - 6;
              const y = r * 12 - 12 + (s % 2) * 6;
              return <rect key={`${r}-${s}`} x={x} y={y} width="17" height="5.5" transform={`rotate(${s % 2 ? -45 : 45} ${x + 8.5} ${y + 2.75})`} />;
            }),
          )}
        </g>
      ) : (
        <>
          <defs>
            <pattern id={id} patternUnits="userSpaceOnUse" width={muster.w} height={muster.h}>
              {muster.teile.map((f, i) => (
                <rect key={i} x={f.x} y={f.y} width={f.w} height={f.h} className="fill-fliese" />
              ))}
            </pattern>
          </defs>
          {/* an der Verlegekante geschnitten (Zuschnitt wie auf der Baustelle, eine halbe Fuge vor dem Estrich) */}
          <rect x={0} y={0} width={kante ? KANTE - 0.5 : B} height={H} fill={`url(#${id})`} />
        </>
      )}
      {kante && (
        <>
          <rect x={KANTE} y={0} width={B - KANTE} height={H} className="fill-kalk" />
          <line x1={KANTE + LASER_ABSTAND} y1={0} x2={KANTE + LASER_ABSTAND} y2={H} className="stroke-laser" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </>
      )}
      {motiv === 'riss' && <path d="M53 30 L58 38 L55 43 L61 52" className={clsx('fill-none', deutlich ? 'stroke-laser' : 'stroke-tinte-2')} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />}
      {laserY !== null && <line x1={ax} y1={laserY} x2={ax + aw} y2={laserY} className="stroke-laser" strokeWidth="2" vectorEffect="non-scaling-stroke" />}
    </svg>
  );
}
