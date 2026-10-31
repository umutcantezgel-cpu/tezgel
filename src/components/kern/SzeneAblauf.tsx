// Szene „Verlegeplan entsteht“ (KERN K-007 szene-ablauf, großer Moment /bad): die drei Schritte des Ablaufs mit dem
// Plan im jeweiligen Stand – Aufmaß mit Prüfmarken, Fugenbild mit Passstücken, verlegt und abgenommen.
// Scroll-gebunden (view-timeline je Plan, CSS in bewegung.css): das Raster zieht sich von oben, Prüfmarken und
// Abnahme setzen sich. Ohne animation-timeline, ohne JavaScript oder bei reduzierter Bewegung stehen alle drei
// Zustände fertig nebeneinander. Serverkomponente.
// Form „treppe“ (UM-E4-SICHT-FIX M-C2 Nr. 2, nur ruhig): die drei Planstände als Stufen an der roten Stufenlinie wie die Treppe
// der Vorlagen (teile/Ablauf.tsx, Schritte): ab lg jede Stufe um 16 Stufen tiefer mit roter Setzstufe, mobil senkrecht auf dem
// Lot; je Stufe ein Fugenkreuz am Anfang der Linie, darunter der Plan im jeweiligen Stand ohne Kasten, dann Nummer, Titel und
// Satz. So trägt /leistungen die Treppe wie die übrigen Seiten und behält die Planstände der Szene (E-037). Die Treppe ist
// statisch (kein Anriss: der große Moment der Seite ist der Formatregler, K-007).
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { KREUZ_GROESSE } from '@/components/kern/Leitachse';
import Verlegeplan from '@/components/kern/Verlegeplan';
import type { PlanName } from '@/lib/plaene/vorgaben';

export interface SzeneSchritt {
  nummer: ReactNode;
  titel: ReactNode;
  untertitel?: ReactNode;
  text?: ReactNode;
}

const ZUSTAENDE = ['aufmass', 'fugenbild', 'verlegt'] as const;
/** Stufen der Treppe ab lg (wie teile/Ablauf.tsx, Klassen fest im Quelltext) */
const STUFE = ['', 'lg:mt-16', 'lg:mt-32'];

export interface SzeneAblaufProps {
  /** genau drei Schritte (weitere werden nicht gezeigt) */
  schritte: SzeneSchritt[];
  plan?: PlanName;
  titelEbene?: 'h3' | 'h4';
  untertitelOben?: boolean;
  /** scroll-gebundene Szene (großer Moment); false: die drei Stände ruhig nebeneinander – für Ansichten, deren großer
   *  Moment ein anderer ist (je Erzählansicht genau einer, K-007; `/` trägt SIG-1, E4-NACH-02) */
  bewegt?: boolean;
  /** `raster` (Standard): drei Felder nebeneinander; `treppe`: Stufen an der roten Linie (nur mit bewegt=false) */
  form?: 'raster' | 'treppe';
}

/** Planstände an der Treppe (ruhig): Stufenlinie, Setzstufen und Fugenkreuze wie die Treppe der Vorlagen, ohne Kästen */
function Treppe({ schritte, plan, Titel }: { schritte: SzeneSchritt[]; plan: PlanName; Titel: 'h3' | 'h4' }) {
  return (
    // mobil auf dem Lot (wie Schritte in teile/Ablauf.tsx: 8 bzw. 16 px vor der Inhaltskante), ab lg die Treppe
    <ol className="-ml-2 grid md:-ml-4 lg:ml-0 lg:grid-cols-3">
      {schritte.slice(0, 3).map((s, i) => (
        <li
          key={i}
          className={clsx(
            'relative border-l-2 pt-6 pb-6 pl-8 lg:border-t-2 lg:border-l-0 lg:pt-8 lg:pr-12 lg:pb-0 lg:pl-0',
            i === 2 ? 'border-l-transparent lg:border-t-laser' : 'border-laser',
            STUFE[i],
          )}
        >
          {/* Setzstufe ab lg: vom Ende der vorigen Linie senkrecht herab zum Anfang dieser */}
          {i > 0 && <span aria-hidden="true" className="absolute bottom-full left-0 hidden h-16 -translate-x-1/2 border-l-2 border-laser lg:block" />}
          <Fugenkreuz className={clsx('absolute top-0 left-0 -translate-1/2 text-tinte', KREUZ_GROESSE)} />
          {/* Planstand ohne Kasten und ohne Laserachse (das Rot trägt die Stufenlinie); die erste Stufe mit Bemaßung. Unter lg stehen
              die Stufen untereinander: ab sm ein Drittel der Spalte (Nacharbeit SF-C2: bei t768 und q844 standen drei Pläne mit
              rund 448 × 290 px untereinander und überwogen den Text); am Handy zwei Drittel wie bisher */}
          <div className="w-2/3 max-w-md sm:w-1/3 lg:w-2/3">
            <Verlegeplan plan={plan} zustand={ZUSTAENDE[i]} bemassung={i === 0} ohneAchse />
          </div>
          <div className="mt-6 font-mono text-fs-4 text-tinte-2">{s.nummer}</div>
          <Titel className="mt-2 font-anzeige text-fs-5 font-extrabold text-tinte">{s.titel}</Titel>
          {s.text && <div className="mt-4 max-w-mass font-text text-fs-3 text-tinte-2">{s.text}</div>}
        </li>
      ))}
    </ol>
  );
}

export default function SzeneAblauf({ schritte, plan = 'bad', titelEbene = 'h3', untertitelOben = false, bewegt = true, form = 'raster' }: SzeneAblaufProps) {
  const Titel = titelEbene;
  if (form === 'treppe' && !bewegt) return <Treppe schritte={schritte} plan={plan} Titel={Titel} />;
  return (
    <ol
      className={clsx(bewegt && 'szene-ablauf', 'grid grid-cols-1 gap-px border border-fuge bg-fuge lg:grid-cols-3')}
      data-motion={bewegt ? 'szene-ablauf' : undefined}
    >
      {schritte.slice(0, 3).map((s, i) => (
        // ab lg teilen die drei Stände ihre Zeilen (Subgrid): Plan, Nummer, Untertitel, Titel und Text stehen je Zeile auf
        // einer Linie, auch wenn der erste Plan mit Bemaßung höher ist (Rückgabe E4-N2-05)
        <li key={i} className="flex flex-col bg-fliese p-6 lg:row-span-5 lg:grid lg:grid-rows-subgrid lg:gap-y-0 lg:p-8">
          <div className="szene-plan flex items-center border border-fuge bg-fliese p-4">
            {/* ohne Laserachse: das eine Rot je Bildschirm trägt die Leitachse bzw. der Einstieg (E3-ORCH-01) */}
            <Verlegeplan plan={plan} zustand={ZUSTAENDE[i]} bemassung={i === 0} ohneAchse />
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
