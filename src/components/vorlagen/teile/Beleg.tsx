// Vorlagen · 5 Beleg (KERN v3 K-003 Nr. 3 und 4, K-009, K-012; E-025): echte Fotos als verlegte Fläche, wahlweise ein
// Zweierbild desselben Vorgangs (zwei Blickwinkel, darum kein Regler), Kundenstimmen wörtlich und der Weg zu allen
// Arbeiten. Fotos und Stimmen stehen in zwei Abschnitten (beide data-formel="beleg"), damit jeder seine eigene Form hat
// wie auf der Startseite. Platz für einen großen Moment (z. B. Galerie mit Filter, Karte); steht nichts davor, beginnt er
// direkt unter der Überschrift. Wahlweise ein zweiter großer Moment mit eigener H2 als eigener Abschnitt zwischen Fotos und
// Stimmen (z. B. vorher-nachher auf /referenzen, E-045) und die Einsatzorte als letzter Abschnitt. Alle zeichnen spät (unter
// dem ersten Bildschirm, E-044). Serverkomponente.
import type { ReactNode } from 'react';
import Abschnitt from '@/components/kern/Abschnitt';
import Textmarken from '@/components/kern/Textmarken';
import WeiterLink from '@/components/kern/WeiterLink';
import type { BelegInhalt } from '../inhalt';
import Einsatzorte from './Einsatzorte';
import Fotos from './Fotos';
import Stimmen from './Stimmen';

/** zweiter großer Moment im Beleg mit eigener H2 (id des Abschnitts, H2 `${id}-titel`) */
export interface ZweiterBeleg {
  id: string;
  titel: string;
  moment: ReactNode;
}

export default function Beleg({ inhalt, moment, zweiter, stimmenTitel = 'Das sagen unsere Kunden.' }: { inhalt: BelegInhalt; moment?: ReactNode; zweiter?: ZweiterBeleg; stimmenTitel?: string }) {
  const davor = inhalt.fotos.length > 0 || Boolean(inhalt.satz) || Boolean(inhalt.zweierbild);
  return (
    <>
      <Abschnitt id="unsere-arbeiten" formel="beleg" leitachse spaet titel={inhalt.titel}>
        {inhalt.fotos.length > 0 && <Fotos fotos={inhalt.fotos} spalten={inhalt.fotos.length === 1 ? 1 : inhalt.fotos.length % 3 === 0 ? 3 : 2} />}
        {inhalt.satz && (
          <p className="mt-8 max-w-mass font-text text-fs-4 text-pretty text-tinte">
            <Textmarken text={inhalt.satz} />
          </p>
        )}
        {inhalt.zweierbild && (
          <figure className="mt-16">
            <figcaption className="font-anzeige text-fs-5 font-extrabold text-tinte">{inhalt.zweierbild.titel}</figcaption>
            <div className="mt-6">
              <Fotos fotos={inhalt.zweierbild.bilder} spalten={2} />
            </div>
          </figure>
        )}
        {moment && <div className={davor ? 'mt-16' : undefined}>{moment}</div>}
        {inhalt.verweis && (
          <p className="mt-12">
            <WeiterLink href={inhalt.verweis.href}>{inhalt.verweis.name}</WeiterLink>
          </p>
        )}
      </Abschnitt>
      {zweiter && (
        <Abschnitt id={zweiter.id} formel="beleg" leitachse spaet kopf="seitlich" titel={zweiter.titel}>
          {zweiter.moment}
        </Abschnitt>
      )}
      {inhalt.stimmen && inhalt.stimmen.length > 0 && (
        <Abschnitt id="kundenstimmen" formel="beleg" leitachse spaet flaeche="fliese" titel={stimmenTitel}>
          <Stimmen ids={inhalt.stimmen} />
        </Abschnitt>
      )}
      {inhalt.orte && <Einsatzorte titel={inhalt.orte.titel} einleitung={inhalt.orte.einleitung} />}
    </>
  );
}
