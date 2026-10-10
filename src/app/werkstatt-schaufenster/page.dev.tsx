// Dev-Schaufenster (nur next dev): Formsystem und Bausteine in allen Zuständen für Prüfstufe A.
import Icon from '@/components/icons/Icon';
import { ICON_NAMEN } from '@/components/icons/namen';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { PLAENE, type PlanName } from '@/lib/plaene/vorgaben';

export const metadata = { title: 'Werkstatt-Schaufenster', robots: { index: false, follow: false } };

export default function Schaufenster() {
  return (
    <div className="mx-auto max-w-seite px-4 py-24 md:px-8 lg:px-12">
      <h1 className="text-fs-6">Schaufenster · Formsystem</h1>
      <section className="mt-12" aria-labelledby="sf-icons">
        <h2 id="sf-icons" className="text-fs-5">Icons</h2>
        <ul className="mt-6 grid grid-cols-4 border-l border-t border-fuge md:grid-cols-8">
          {ICON_NAMEN.map((n) => (
            <li key={n} className="flex flex-col items-center gap-2 border-b border-r border-fuge bg-fliese p-4">
              <Icon name={n} groesse={6} />
              <span className="font-mono text-fs-1 text-tinte-2">{n}</span>
            </li>
          ))}
          <li className="flex flex-col items-center gap-2 border-b border-r border-fuge bg-fliese p-4">
            <Fugenkreuz className="size-4 text-tinte" />
            <span className="font-mono text-fs-1 text-tinte-2">fugenkreuz</span>
          </li>
        </ul>
      </section>
      <section className="mt-16" aria-labelledby="sf-plaene">
        <h2 id="sf-plaene" className="text-fs-5">Verlegepläne</h2>
        <ul className="mt-6 grid grid-cols-1 border-l border-t border-fuge md:grid-cols-3">
          {(Object.keys(PLAENE) as PlanName[]).map((n) => (
            <li key={n} className="sig-plan-ziel border-b border-r border-fuge bg-fliese p-6" tabIndex={0}>
              <Verlegeplan plan={n} interaktiv beschriftet />
              <p className="mt-4 font-mono text-fs-1 text-tinte-2">{n}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
