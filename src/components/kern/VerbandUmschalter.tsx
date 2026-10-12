// Verband-Umschalter (KERN K-007 verband, E3-ORCH-04, großer Moment /fliesen): derselbe Raum im Kreuzfugen-, Halb- und
// Drittelverband. Native Radiogruppe ohne JavaScript – die Auswahl versetzt über `:has()` die Reihen des einen Plans um
// ½ bzw. ⅓ Plattenlänge (E4-NACH-02, K-007: „die Reihen versetzen sich“; CSS in bewegung.css, Übergang dauer-3 · setzen,
// nur translate). Gewählt ist das Feld in Tinte (Tailwind `has-checked:` – im Utility-Layer, damit die Fläche des
// Felds nicht gewinnt). Ohne `:has()` stehen die drei Verbände als eigene Pläne untereinander (nichts geht verloren).
// Begriffe aus dem Bestand (/fliesen/verlegemuster, Konfigurator). Serverkomponente; ohne Laserachse – das eine Rot
// trägt die Achse des Einstiegs.
import { useId } from 'react';
import clsx from 'clsx';
import Verlegeplan from './Verlegeplan';
import { reihenversatz } from '@/lib/plaene/geometrie';
import type { Planvorgabe, Verband } from '@/lib/plaene/typen';

const VERBAENDE: Array<{ id: Verband; name: string }> = [
  { id: 'kreuz', name: 'Kreuzfuge' },
  { id: 'halb', name: 'Halbverband' },
  { id: 'drittel', name: 'Drittelverband' },
];

// Raster 2 : 1 (Rastereinheiten, unbemaßt), damit Halb- und Drittelverband sichtbar versetzen
const RAUM = { b: 36, h: 20 };
const PLATTE = { b: 8, h: 4 };
const S = 10;
const RAND = 6;

/** Ein Plan, dessen Reihen sich je nach Wahl versetzen: je Reihe die Stoßfugen über die Raumbreite hinaus (eine Platte
 *  links und rechts mehr), damit beim Versetzen keine Lücke entsteht; der Raum schneidet sie ab. */
function Reihenplan({ uid }: { uid: string }) {
  const W = RAUM.b * S;
  const H = RAUM.h * S;
  const pb = PLATTE.b * S;
  const ph = PLATTE.h * S;
  const reihen = Math.round(RAUM.h / PLATTE.h);
  // Kreuzfuge: Fugen so, dass die Mitte des Raums auf einer Fuge liegt (wie startversatz im Verlegeplan)
  const x0 = ((W / 2) % pb) - pb;
  const clip = `verband-raum-${uid}`;
  return (
    <svg viewBox={`${-RAND} ${-RAND} ${W + RAND * 2} ${H + RAND * 2}`} className="verlegeplan block h-auto w-full" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={clip}>
          <rect x={0} y={0} width={W} height={H} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        {Array.from({ length: reihen - 1 }, (_, i) => (
          <path key={`w${i}`} className="plan-fuge" d={`M0 ${(i + 1) * ph}H${W}`} />
        ))}
        {Array.from({ length: reihen }, (_, r) => (
          <g
            key={r}
            className="verband-reihe"
            data-halb={reihenversatz('halb', r) > 0 ? '1' : '0'}
            data-drittel={String(Math.round(reihenversatz('drittel', r) * 3))}
          >
            {Array.from({ length: Math.ceil(W / pb) + 3 }, (_, k) => {
              const x = x0 + (k - 1) * pb;
              return <path key={k} className="plan-fuge" d={`M${x} ${r * ph}V${(r + 1) * ph}`} />;
            })}
          </g>
        ))}
      </g>
      <rect className="plan-raum" x={0} y={0} width={W} height={H} />
    </svg>
  );
}

export default function VerbandUmschalter({ start = 'halb', className }: { start?: Verband; className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9-]/g, '');
  const name = `verband-${uid}`;
  return (
    <fieldset className={clsx('verband m-0 min-w-0 border-0 p-0', className)} data-motion="verband">
      <legend className="sr-only">Verband</legend>
      {/* mit :has(): ein Plan, die Reihen versetzen sich */}
      <div className="verband-bewegt">
        <Reihenplan uid={uid} />
      </div>
      {/* ohne :has(): die drei Verbände als eigene Pläne */}
      <div className="verband-plaene">
        {VERBAENDE.map((v) => {
          const plan: Planvorgabe = {
            name: `verband-${v.id}`,
            beschreibung: v.name,
            raum: RAUM,
            platte: PLATTE,
            verband: v.id,
            achse: 'lot',
          };
          return (
            <div key={v.id} className="verband-plan" data-verband={v.id}>
              <Verlegeplan plan={plan} ohneAchse bemassung={false} />
            </div>
          );
        })}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-px border border-strich bg-strich">
        {VERBAENDE.map((v) => (
          <label
            key={v.id}
            className="verband-wahl relative flex min-h-11 cursor-pointer items-center justify-center bg-fliese px-2 py-3 text-center font-text text-fs-2 text-tinte has-checked:bg-tinte has-checked:text-kalk"
          >
            <input
              type="radio"
              name={name}
              value={v.id}
              defaultChecked={v.id === start}
              className="peer absolute inset-0 m-0 cursor-pointer appearance-none focus-visible:outline-none"
              data-verband-wahl={v.id}
            />
            <span className="relative">{v.name}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
