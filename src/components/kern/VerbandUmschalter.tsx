// Verband-Umschalter (KERN K-007 verband, E3-ORCH-04, großer Moment /fliesen): derselbe Raum im Kreuzfugen-, Halb- und
// Drittelverband. Native Radiogruppe ohne JavaScript – die Auswahl blendet über `:has()` den passenden Plan ein
// (CSS in bewegung.css, Register `verband`: Farbwechsel ohne Lageänderung). Ohne `:has()` stehen alle drei Pläne
// untereinander (nichts geht verloren). Begriffe aus dem Bestand (/fliesen/verlegemuster, Konfigurator).
// Serverkomponente; die Pläne ohne Laserachse – das eine Rot trägt die Achse des Einstiegs.
import { useId } from 'react';
import clsx from 'clsx';
import Verlegeplan from './Verlegeplan';
import type { Planvorgabe, Verband } from '@/lib/plaene/typen';

const VERBAENDE: Array<{ id: Verband; name: string }> = [
  { id: 'kreuz', name: 'Kreuzfuge' },
  { id: 'halb', name: 'Halbverband' },
  { id: 'drittel', name: 'Drittelverband' },
];

// Raster 2 : 1 (Rastereinheiten, unbemaßt), damit Halb- und Drittelverband sichtbar versetzen
const RAUM = { b: 36, h: 20 };
const PLATTE = { b: 8, h: 4 };

export default function VerbandUmschalter({ start = 'halb', className }: { start?: Verband; className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9-]/g, '');
  const name = `verband-${uid}`;
  return (
    <fieldset className={clsx('verband m-0 min-w-0 border-0 p-0', className)} data-motion="verband">
      <legend className="sr-only">Verband</legend>
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
          <label key={v.id} className="verband-wahl relative flex min-h-11 cursor-pointer items-center justify-center bg-fliese px-2 py-3 text-center font-text text-fs-2 text-tinte">
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
