// Vorlagen · 4 So läuft es ab (KERN v3 K-003 Nr. 5, K-005, K-009; E-025): die Schritte an der roten Linie wie auf der
// Startseite. Ab lg waagrecht über den Spalten, jeder zweite Schritt um Stufe 16 tiefer (die Linie springt wie eine
// versetzte Reihe); mobil senkrecht genau auf dem Lot der Laserlinie. Je Schritt ein Fugenkreuz am Anfang der Linie und die
// Nummer in Mono. Ein großer Moment (z. B. der Weg einer Badsanierung) kann die Schritte ersetzen; darunter ein Hinweis mit
// Verweis. Serverkomponente.
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Abschnitt from '@/components/kern/Abschnitt';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Textmarken from '@/components/kern/Textmarken';
import WeiterLink from '@/components/kern/WeiterLink';
import type { AblaufInhalt } from '../inhalt';

// Spalten ab lg je Schrittzahl (Klassen fest im Quelltext)
const SPALTEN: Record<number, string> = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' };

export function Schritte({ schritte }: { schritte: AblaufInhalt['schritte'] }) {
  return (
    <ol className={clsx('-ml-2 grid md:-ml-4 lg:ml-0', SPALTEN[schritte.length] ?? 'lg:grid-cols-3')}>
      {schritte.map((s, i) => {
        const letzter = i === schritte.length - 1;
        return (
          <li
            key={s.titel}
            className={clsx(
              'relative border-l-2 pb-12 pl-8 lg:border-t-2 lg:border-l-0 lg:pt-8 lg:pr-12 lg:pb-0 lg:pl-0',
              letzter ? 'border-l-transparent lg:border-t-laser' : 'border-laser',
              i % 2 === 1 && 'lg:mt-16',
            )}
          >
            <Fugenkreuz className="absolute top-1 left-0 size-3 -translate-x-1/2 text-tinte lg:top-0 lg:-translate-y-1/2" />
            <p className="font-mono text-fs-4 text-tinte-2">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-2 font-anzeige text-fs-5 font-extrabold text-tinte">{s.titel}</h3>
            <p className="mt-4 max-w-mass font-text text-fs-3 text-tinte-2">
              <Textmarken text={s.text} />
            </p>
          </li>
        );
      })}
    </ol>
  );
}

export default function Ablauf({ inhalt, moment }: { inhalt: AblaufInhalt; moment?: ReactNode }) {
  return (
    <Abschnitt id="ablauf" formel="ablauf" leitachse flaeche="fliese" titel={inhalt.titel} className="lg:pb-32">
      {moment ?? <Schritte schritte={inhalt.schritte} />}
      {inhalt.hinweis && (
        <div className="mt-12 max-w-mass border-l-2 border-tinte pl-6 lg:mt-24">
          <p className="font-text text-fs-3 text-tinte">
            <Textmarken text={inhalt.hinweis.text} />
          </p>
          {inhalt.hinweis.verweis && <WeiterLink href={inhalt.hinweis.verweis.href} className="mt-2">{inhalt.hinweis.verweis.name}</WeiterLink>}
        </div>
      )}
    </Abschnitt>
  );
}
