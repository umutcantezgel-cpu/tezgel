// Szene „Verlegeplan entsteht“ (KERN K-007 szene-ablauf, großer Moment /bad): die drei Schritte des Ablaufs mit dem
// Plan im jeweiligen Stand – Aufmaß mit Prüfmarken, Fugenbild mit Passstücken, verlegt und abgenommen.
// Scroll-gebunden (view-timeline je Plan, CSS in bewegung.css): das Raster zieht sich von oben, Prüfmarken und
// Abnahme setzen sich. Ohne animation-timeline, ohne JavaScript oder bei reduzierter Bewegung stehen alle drei
// Zustände fertig nebeneinander. Serverkomponente.
import type { ReactNode } from 'react';
import Verlegeplan from '@/components/kern/Verlegeplan';
import type { PlanName } from '@/lib/plaene/vorgaben';

export interface SzeneSchritt {
  nummer: ReactNode;
  titel: ReactNode;
  untertitel?: ReactNode;
  text?: ReactNode;
}

const ZUSTAENDE = ['aufmass', 'fugenbild', 'verlegt'] as const;

export interface SzeneAblaufProps {
  /** genau drei Schritte (weitere werden nicht gezeigt) */
  schritte: SzeneSchritt[];
  plan?: PlanName;
  titelEbene?: 'h3' | 'h4';
  untertitelOben?: boolean;
}

export default function SzeneAblauf({ schritte, plan = 'bad', titelEbene = 'h3', untertitelOben = false }: SzeneAblaufProps) {
  const Titel = titelEbene;
  return (
    <ol className="szene-ablauf grid grid-cols-1 gap-px border border-fuge bg-fuge lg:grid-cols-3" data-motion="szene-ablauf">
      {schritte.slice(0, 3).map((s, i) => (
        <li key={i} className="flex flex-col bg-fliese p-6 lg:p-8">
          <div className="szene-plan border border-fuge bg-fliese p-4">
            <Verlegeplan plan={plan} zustand={ZUSTAENDE[i]} bemassung={i === 0} />
          </div>
          <div className="mt-6 font-mono text-fs-1 text-tinte">{s.nummer}</div>
          {untertitelOben && s.untertitel && <div className="mt-2 font-mono text-fs-2 text-tinte-2">{s.untertitel}</div>}
          <Titel className="mt-1 font-text text-fs-4 font-semibold text-tinte">{s.titel}</Titel>
          {!untertitelOben && s.untertitel && <div className="mt-1 font-mono text-fs-2 text-tinte-2">{s.untertitel}</div>}
          {s.text && <div className="mt-4 text-fs-3 text-tinte-2">{s.text}</div>}
        </li>
      ))}
    </ol>
  );
}
