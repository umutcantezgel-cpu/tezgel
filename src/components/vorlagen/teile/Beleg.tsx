// Vorlagen · 5 Beleg (KERN v3 K-003 Nr. 3 und 4, K-009, K-012; E-025): echte Fotos als verlegte Fläche, wahlweise ein
// Zweierbild desselben Vorgangs (zwei Blickwinkel, darum kein Regler), Kundenstimmen wörtlich und der Weg zu allen
// Arbeiten. Fotos und Stimmen stehen in zwei Abschnitten (beide data-formel="beleg"), damit jeder seine eigene Form hat
// wie auf der Startseite. Platz für einen großen Moment (z. B. Galerie mit Filter, Karte). Serverkomponente.
import type { ReactNode } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Abschnitt from '@/components/kern/Abschnitt';
import { linkKlassen } from '@/components/kern/stile';
import type { BelegInhalt } from '../inhalt';
import Fotos from './Fotos';
import Stimmen from './Stimmen';

export default function Beleg({ inhalt, moment, stimmenTitel = 'Das sagen unsere Kunden.' }: { inhalt: BelegInhalt; moment?: ReactNode; stimmenTitel?: string }) {
  return (
    <>
      <Abschnitt id="unsere-arbeiten" formel="beleg" leitachse titel={inhalt.titel}>
        {inhalt.fotos.length > 0 && <Fotos fotos={inhalt.fotos} spalten={inhalt.fotos.length % 3 === 0 ? 3 : 2} />}
        {inhalt.zweierbild && (
          <figure className="mt-16">
            <figcaption className="font-anzeige text-fs-5 font-extrabold text-tinte">{inhalt.zweierbild.titel}</figcaption>
            <div className="mt-6">
              <Fotos fotos={inhalt.zweierbild.bilder} spalten={2} />
            </div>
          </figure>
        )}
        {moment && <div className="mt-16">{moment}</div>}
        {inhalt.verweis && (
          <p className="mt-12">
            <Link href={inhalt.verweis.href} data-motion="zustand" className={clsx(linkKlassen, 'inline-flex min-h-11 items-center gap-2 font-semibold text-fs-3')}>
              {inhalt.verweis.name}
              <Icon name="pfeil-rechts" groesse={5} />
            </Link>
          </p>
        )}
      </Abschnitt>
      {inhalt.stimmen && inhalt.stimmen.length > 0 && (
        <Abschnitt id="kundenstimmen" formel="beleg" leitachse flaeche="fliese" titel={stimmenTitel}>
          <Stimmen ids={inhalt.stimmen} />
        </Abschnitt>
      )}
    </>
  );
}
