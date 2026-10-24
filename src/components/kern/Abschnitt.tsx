// Abschnitt (KERN K-006, K-009): Kopf mit Mono-Etikett (vormals Badge, Wortlaut bleibt) und H2,
// wahlweise gestapelt oder seitlich (Kopf links, Inhalt rechts). Flächen: Kalk, Fliese, Tinte.
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Fugenkreuz from './Fugenkreuz';
import { ACHSE_LAGE } from './Leitachse';
import { etikettForm, seitenKlassen } from './stile';
import type { Formelteil } from './Seitenformel';

export interface AbschnittProps {
  id?: string;
  /** id der H2 für aria-labelledby; Standard: `${id}-titel` */
  titelId?: string;
  etikett?: ReactNode;
  /** laufende Nummer im Mono-Etikett, z. B. „02“ */
  nummer?: string;
  titel?: ReactNode;
  einleitung?: ReactNode;
  /** nur mit kopf="seitlich": Block unter dem Kopf (ab lg in der Kopfspalte, mobil nach dem Inhalt), z. B. Anruf neben
   *  einem Formular, das mobil direkt auf die Überschrift folgen soll */
  unterKopf?: ReactNode;
  art?: 'erzaehl' | 'arbeit';
  flaeche?: 'kalk' | 'fliese' | 'tinte';
  kopf?: 'gestapelt' | 'seitlich';
  breite?: 'seite' | 'mass';
  /** data-motion="auftritt" für den Inhalt (nur Erzählansichten, höchstens jeder zweite Abschnitt) */
  auftritt?: boolean;
  /** Fugenkreuz auf der Leitachse an der Oberkante (innerhalb von <Leitachse>) */
  leitachse?: boolean;
  /** Inhalt erst in Sichtnähe zeichnen (content-visibility, nur unterhalb des ersten Bildschirms; E3-NACH-07) */
  spaet?: boolean;
  /** Teil der Seitenformel (KERN v3 K-009), als data-formel für die Prüfung */
  formel?: Formelteil;
  className?: string;
  children?: ReactNode;
  'aria-label'?: string;
}

export default function Abschnitt({ id, titelId, etikett, nummer, titel, einleitung, unterKopf, art = 'erzaehl', flaeche = 'kalk', kopf = 'gestapelt', breite = 'seite', auftritt = false, leitachse = false, spaet = false, formel, className, children, ...rest }: AbschnittProps) {
  const hId = titelId ?? (id ? `${id}-titel` : undefined);
  const tinte = flaeche === 'tinte';
  const kopfInhalt = (titel || etikett) && (
    <div className={clsx(kopf === 'seitlich' ? 'col-span-4 md:col-span-8 lg:col-span-4' : 'max-w-mass')}>
      {(etikett || nummer) && (
        <p className={clsx(etikettForm, 'mb-4', tinte ? 'text-nacht-2' : 'text-tinte-2')}>
          {!nummer && <Fugenkreuz className={clsx('size-3 shrink-0', tinte ? 'text-nacht-2' : 'text-strich')} />}
          {nummer && <span className={tinte ? 'text-kalk' : 'text-tinte'}>{nummer}</span>}
          {nummer && etikett && <span aria-hidden="true">·</span>}
          {etikett}
        </p>
      )}
      {/* Arbeitsansicht: H1 steht in text-fs-6, die H2 eine Stufe darunter (E3-SICHT-2-ARB Befunde 4, 15, 25) */}
      {titel && <h2 id={hId} className={clsx(art === 'arbeit' ? 'text-fs-5' : 'text-fs-6', tinte ? 'text-kalk' : 'text-tinte')}>{titel}</h2>}
      {einleitung && <div className={clsx('mt-6 text-fs-3', tinte ? 'text-nacht-2' : 'text-tinte-2')}>{einleitung}</div>}
    </div>
  );
  return (
    <section
      id={id}
      data-formel={formel}
      aria-labelledby={titel ? hId : undefined}
      aria-label={!titel ? rest['aria-label'] : undefined}
      className={clsx(
        // Sprungziel ohne eigenen Versatz: allein scroll-padding-top (Kopfhöhe + 16 px) an <html> setzt es auf 96 px (R-01a)
        'relative',
        art === 'erzaehl' ? 'py-16 lg:py-24' : 'py-12 lg:py-16',
        flaeche === 'fliese' && 'border-y border-fuge bg-fliese',
        tinte && 'flaeche-tinte bg-tinte text-kalk',
        className,
      )}
    >
      {leitachse && (
        // Fugenkreuz auf dem Lot (Ebene z-10, K-005): über der Zierebene der Leitachse und über einer Nachbarfläche mit z-10
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10">
          <div className={clsx(seitenKlassen, 'relative')}>
            <Fugenkreuz className={clsx('absolute top-0 size-3 -translate-x-1/2 -translate-y-1/2', ACHSE_LAGE, tinte ? 'text-nacht-2' : 'text-tinte')} />
          </div>
        </div>
      )}
      <div className={clsx(seitenKlassen, breite === 'mass' && 'max-w-mass', spaet && 'spaet-zeichnen')}>
        {kopf === 'seitlich' ? (
          <div className="grid grid-cols-4 gap-y-12 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-12">
            {kopfInhalt}
            <div className={clsx('col-span-4 md:col-span-8', unterKopf && 'lg:row-span-2')} data-motion={auftritt ? 'auftritt' : undefined}>{children}</div>
            {unterKopf && <div className="col-span-4 md:col-span-8 lg:col-span-4">{unterKopf}</div>}
          </div>
        ) : (
          <>
            {kopfInhalt}
            <div className={clsx(kopfInhalt && 'mt-12')} data-motion={auftritt ? 'auftritt' : undefined}>{children}</div>
          </>
        )}
      </div>
    </section>
  );
}
