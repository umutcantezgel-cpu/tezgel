// Fliesenkomposition (KERN v3 K-012, Auftrag Abschnitt 8): bewusst gestaltete Fläche aus dem Formsystem für Bildplätze
// ohne passendes Foto, nie ein grauer Kasten. Fliesen 2:1 in Fliese und Fuge; je Motiv ein Verband oder ein Detail.
// Dekorativ (aria-hidden), Seitenverhältnis über `format` wie beim Bildfeld.
import clsx from 'clsx';

export type Kompositionsmotiv = 'drittelverband' | 'halbverband' | 'kreuzfuge' | 'riss' | 'fischgraet';

const B = 120; // Rasterbreite der Zeichnung (Fliese 24 × 12 bzw. 12 × 12)

function reihen(versatz: (r: number) => number, laenge: number, hoehe: number, h: number) {
  const fl: { x: number; y: number; w: number; h: number }[] = [];
  for (let r = 0; r * hoehe < h; r++) {
    for (let x = -versatz(r); x < B; x += laenge) fl.push({ x, y: r * hoehe, w: laenge, h: hoehe });
  }
  return fl;
}

// Mitte des Risses (Motiv „riss“), damit ein Ausschnitt ihn zeigt
const RISS_MITTE = { x: 57, y: 41 };

/** `fuellen`: füllt die Höhe des Bildplatzes (Zuschnitt per slice) statt der Höhe aus dem Format, z. B. in einer Fliese mit Text.
 *  `ausschnitt`: zeigt nur diese Breite der Zeichnung (Einheiten von 120, gleiches Format), mittig bzw. um den Riss, damit
 *  ein kleines Muster wenige große Fliesen mit sichtbarer Fuge zeigt statt vieler winziger. */
export default function Fliesenkomposition({ motiv, format = '1:1', fuellen = false, ausschnitt = B, className }: { motiv: Kompositionsmotiv; format?: '1:1' | '4:5' | '3:2' | '16:9'; fuellen?: boolean; ausschnitt?: number; className?: string }) {
  const [fb, fh] = format.split(':').map(Number);
  const H = Math.round((B * fh) / fb);
  const aw = Math.min(ausschnitt, B);
  const ah = Math.round((aw * fh) / fb);
  const mitte = motiv === 'riss' ? RISS_MITTE : { x: B / 2, y: H / 2 };
  const ax = Math.min(Math.max(mitte.x - aw / 2, 0), B - aw);
  const ay = Math.min(Math.max(mitte.y - ah / 2, 0), H - ah);
  const fliesen =
    motiv === 'kreuzfuge' || motiv === 'riss'
      ? reihen(() => 0, 24, 24, H)
      : motiv === 'halbverband'
        ? reihen((r) => (r % 2) * 12, 24, 12, H)
        : reihen((r) => (r % 3) * 8, 24, 12, H);
  const fisch = motiv === 'fischgraet';
  return (
    <svg viewBox={`${ax} ${ay} ${aw} ${ah}`} aria-hidden="true" focusable="false" className={clsx('block w-full bg-fuge', fuellen ? 'h-full' : 'h-auto', className)} preserveAspectRatio="xMidYMid slice">
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
        <g className="fill-fliese">
          {fliesen.map((f, i) => (
            <rect key={i} x={f.x + 0.5} y={f.y + 0.5} width={f.w - 1} height={f.h - 1} />
          ))}
        </g>
      )}
      {motiv === 'riss' && <path d="M53 30 L58 38 L55 43 L61 52" className="fill-none stroke-tinte-2" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}
