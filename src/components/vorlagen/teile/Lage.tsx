// Vorlagen · 2 Ihre Lage (KERN v3 K-003 Nr. 2, K-009; E-025; K-016 „Ruhe“, E-047): die Lage der Kundschaft in ihren Worten.
// Wahlweise als Absätze, als Wege-Zeilen mit Link (wie die Bereiche in „Was wir tun“) oder als Auswahl wie auf der
// Startseite: große Zeilen mit Satz und Pfeil an einer Fuge, ab md in zwei Spalten, ohne Fotos (Bilder werden nie
// angeschnitten; ein Foto je Wahl wäre zu viel auf einem Bildschirm, E-047). Kopf mittig. Der Abschnitt zeichnet spät
// (content-visibility, unter dem ersten Bildschirm, E3-LEIST-01). Serverkomponente.
import Link from 'next/link';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Abschnitt from '@/components/kern/Abschnitt';
import Textmarken from '@/components/kern/Textmarken';
import type { BildOderMotiv, LageInhalt } from '../inhalt';
import { Bereichszeilen } from './Tun';

type Fliese = { satz: string; href: string } & BildOderMotiv;

/** Auswahl: je Lage eine Zeile mit Satz und Pfeil; Bild oder Motiv im Inhalt bleiben für andere Formen erhalten, hier ruhen sie */
export function LageFliesen({ fliesen, className }: { fliesen: Fliese[]; className?: string }) {
  return (
    <ul className={clsx('grid border-t border-fuge md:grid-cols-2 md:gap-x-12', className)}>
      {fliesen.map((f) => (
        <li key={f.href} className="border-b border-fuge">
          <Link href={f.href} data-motion="zustand" className="group flex min-h-16 items-center justify-between gap-6 py-6 text-tinte">
            <span className="font-text text-fs-4 font-semibold text-pretty hyphens-none underline decoration-transparent decoration-2 underline-offset-8 transition-colors dauer-1 group-hover:decoration-laser">
              {f.satz}
            </span>
            <Icon name="pfeil-rechts" groesse={5} className="shrink-0 text-tinte-2 transition-colors dauer-1 group-hover:text-tinte" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Lage({ inhalt }: { inhalt: LageInhalt }) {
  const fliesen = inhalt.fliesen ?? [];
  return (
    <Abschnitt
      id="ihre-lage"
      formel="lage"
      leitachse
      spaet
      mitte
      titel={inhalt.titel}
      einleitung={inhalt.einleitung ? <p><Textmarken text={inhalt.einleitung} /></p> : undefined}
    >
      {inhalt.absaetze && inhalt.absaetze.length > 0 && (
        <div className="mx-auto max-w-mass space-y-4 font-text text-fs-4 text-pretty text-tinte">
          {inhalt.absaetze.map((a) => (
            <p key={a}>
              <Textmarken text={a} />
            </p>
          ))}
        </div>
      )}
      {fliesen.length > 0 && <LageFliesen fliesen={fliesen} className={clsx(inhalt.absaetze?.length && 'mt-12')} />}
      {inhalt.wege && inhalt.wege.length > 0 && (
        <div className={clsx('mx-auto max-w-mass', (inhalt.absaetze?.length || fliesen.length) && 'mt-12')}>
          <Bereichszeilen bereiche={inhalt.wege} />
        </div>
      )}
    </Abschnitt>
  );
}
