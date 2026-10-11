// Stimme (P4-01, KERN v1.2 K-001 Vertrauensschicht, K-011 Kundenstimme, Lehren 1 und 2): eine Kundenstimme der Fachseite
// (Bestand: `REVIEWS.find(…)` mit Sternen, Zitat und „Name · Quelle-Rezension · Thema“).
// Wörtliches Zitat groß in Archivo, genau ein Anriss (`data-motion="anriss"`, IO 50 %) unter dem Schlüsselwort, falls die
// Seite eines nennt (`ANRISS` aus `start/vertrauen/stimmen-daten`); fehlt das Wort im Zitat, entfällt der Anriss.
// Bildunterschrift in Mono: Name, Quelle und Thema je ein eigenes Element, Trenner „·“ wie im Bestand (`aria-hidden`).
// Bewertung: Sterne nur mit Textwert daneben (K-003); der Text ist der zugängliche Name des Bestands („5 von 5 Sternen“).
// Kein Häkchen, kein „verifiziert“ (Lehre 1). Randnotiz nur als Verweis mit vorhandenem Wortlaut (K-012).
// Mit `abschnitt` steht die Stimme in einem eigenen Abschnitt (Bestand: `aria-label="Kundenstimme"`), sonst als <figure>
// in einem anderen Abschnitt (Bestand Badsanierung: im Ablauf).
import type { ReactNode } from 'react';
import { Textlink, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import Sterne from '@/components/kern/start/vertrauen/Sterne';
import Abschnitt, { type AbschnittRahmenProps } from '@/components/kern/vorlagen/teile/Abschnitt';
import Knopfreihe from '@/components/kern/vorlagen/teile/Knopfreihe';
import { Trenner } from '@/components/kern/vorlagen/teile/Mass';
import type { KnopfAngabe } from '@/components/kern/vorlagen/teile/typen';

export type StimmeProps = {
  /** Zitat wörtlich (ohne Anführungszeichen) */
  zitat: string;
  /** Schlüsselwort für den Anriss (steht wörtlich im Zitat) */
  anriss?: string;
  name: ReactNode;
  /** z. B. „Google-Rezension“ (Bestand: `${review.source}-Rezension`) */
  quelle?: ReactNode;
  /** z. B. „Badsanierung“ */
  thema?: ReactNode;
  /** Sterne und Textwert, z. B. { wert: 5, max: 5, text: '5 von 5 Sternen' } */
  bewertung?: { wert: number; max: number; text: string };
  /** Verweis auf einen Ablaufschritt oder eine Leistung, nur mit vorhandenem Wortlaut */
  randnotiz?: { text: ReactNode; href: string };
  aktionen?: readonly KnopfAngabe[];
  /** eigener Abschnitt mit diesem Namen (Bestand: „Kundenstimme“); ohne: nur die <figure> */
  abschnitt?: string;
  rahmen?: Omit<AbschnittRahmenProps, 'ariaLabel'>;
  className?: string;
};

function Zitat({ text, wort }: { text: string; wort?: string }) {
  const stelle = wort ? text.indexOf(wort) : -1;
  if (!wort || stelle < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, stelle)}
      <span data-motion="anriss" data-ausloeser="sicht" data-schwelle="0.5" className="whitespace-nowrap">
        {wort}
      </span>
      {text.slice(stelle + wort.length)}
    </>
  );
}

export function Stimmenfigur({ zitat, anriss, name, quelle, thema, bewertung, randnotiz, aktionen = [], className }: Omit<StimmeProps, 'abschnitt' | 'rahmen'>) {
  return (
    <figure className={verbinde('grid grid-cols-1 border-t border-k-strich pt-k-6 lg:grid-cols-12 lg:pt-k-7', className)}>
      <blockquote className="min-w-0 k-anzeige text-k-5 text-k-tinte lg:col-span-8 lg:pr-k-8">
        <p>
          „<Zitat text={zitat} wort={anriss} />“
        </p>
      </blockquote>
      <div className="mt-k-6 flex min-w-0 flex-col gap-k-5 lg:col-span-4 lg:mt-0">
        <figcaption className="flex flex-col gap-k-2 border-l border-k-fuge pl-k-4 k-mono text-k-1 text-k-tinte-2">
          {bewertung ? (
            <div className="flex flex-wrap items-center gap-k-2 text-k-tinte">
              <Sterne wert={bewertung.wert} max={bewertung.max} />
              <span>{bewertung.text}</span>
            </div>
          ) : null}
          <div>
            <span className="text-k-tinte">{name}</span>
            {quelle ? (
              <>
                <Trenner />
                <span>{quelle}</span>
              </>
            ) : null}
            {thema ? (
              <>
                <Trenner />
                <span>{thema}</span>
              </>
            ) : null}
          </div>
        </figcaption>
        {randnotiz ? (
          <p className="k-mono text-k-1">
            <Textlink href={randnotiz.href} className="inline-flex items-center gap-k-1">
              <Icon name="pfeil" groesse={16} />
              <span>{randnotiz.text}</span>
            </Textlink>
          </p>
        ) : null}
        <Knopfreihe knoepfe={aktionen} anordnung="spalte" />
      </div>
    </figure>
  );
}

export default function Stimme({ abschnitt, rahmen, ...stimme }: StimmeProps) {
  if (!abschnitt) return <Stimmenfigur {...stimme} />;
  return (
    <Abschnitt ariaLabel={abschnitt} dichte="normal" {...rahmen}>
      <Stimmenfigur {...stimme} />
    </Abschnitt>
  );
}
