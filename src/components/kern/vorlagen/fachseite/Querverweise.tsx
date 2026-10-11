// Querverweise (P4-01, KERN v1.2 K-002 Aufgabe 1/5, K-003, K-011): „Weiterführende Ratgeber …“ des Bestands –
// Liste verwandter Seiten. Im Kern ein Feldraster aus Verweisfeldern (2 oder 4 je Reihe ab lg, Tablett 2, mobil 1):
// jedes Feld ist ganz der Link (Trefferfläche ≥ 64 px), Titel unterstrichen, Pfeil, optional Beschreibung in Tinte-2.
// Zustände: Ruhe · Hover (feiner Zeiger: Fläche Kalk, Unterstreichung Tinte 2 px) · aktiv/Touch (Fläche Fuge) ·
// Fokus 2 px Tinte mit Abstand; der Ring liegt über den Nachbarfeldern (`relative z-10`, Lehre 4).
// Landmarke wie im Bestand: `nav` (Standard) oder `section`. `nachsatz` (Satz mit weiteren Verweisen) und `aktionen`
// (Knöpfe) stehen darunter. `eingebettet`: ohne eigenen Abschnittsrahmen, als Block in einem anderen Abschnitt
// (Bestand Balkonsanierung/Granit: Navigation im Abschluss-Abschnitt).
import Link from 'next/link';
import { useId, type ReactNode } from 'react';
import { Feldraster, Rasterfeld, fokus, verbinde, type Breite } from '@/components/kern/basis';
import { istIntern } from '@/components/kern/basis/klassen';
import Icon from '@/components/kern/icons/Icon';
import Abschnitt, { Abschnittskopf, Nachsatz, type AbschnittRahmenProps } from '@/components/kern/vorlagen/fachseite/Abschnitt';
import Knopfreihe from '@/components/kern/vorlagen/fachseite/Knopfreihe';
import { UMBRUCH, type KnopfAngabe } from '@/components/kern/vorlagen/fachseite/typen';

export type Verweis = {
  titel: ReactNode;
  href: string;
  beschreibung?: ReactNode;
};

export type QuerverweiseProps = Omit<AbschnittRahmenProps, 'als' | 'auftritt'> & {
  titel: ReactNode;
  titelId?: string;
  etikett?: ReactNode;
  verweise: readonly Verweis[];
  landmarke?: 'nav' | 'section';
  spalten?: 2 | 3 | 4;
  aktionen?: readonly KnopfAngabe[];
  eingebettet?: boolean;
};

const BREITE: Record<2 | 3 | 4, Breite> = {
  2: { mobil: 4, tablett: 4, desktop: 6 },
  3: { mobil: 4, tablett: 4, desktop: 4 },
  4: { mobil: 4, tablett: 4, desktop: 3 },
};

const FELDLINK = verbinde(
  'group flex h-full min-h-k-8 flex-col gap-k-2 p-k-4 text-k-tinte lg:p-k-5',
  'pointer-fine:hover:bg-k-kalk active:bg-k-fuge',
  'focus-visible:relative focus-visible:z-10',
  fokus(),
);

function Verweisfeld({ verweis, breite, flaeche }: { verweis: Verweis; breite: Breite; flaeche: 'fliese' | 'kalk' }) {
  const inhalt = (
    <>
      <span className="flex items-start justify-between gap-k-3 k-text text-k-3 font-semibold">
        <span
          className={verbinde(
            'underline decoration-1 underline-offset-4 decoration-k-strich',
            'pointer-fine:group-hover:decoration-2 pointer-fine:group-hover:decoration-k-tinte group-active:decoration-2 group-active:decoration-k-tinte',
            UMBRUCH,
          )}
        >
          {verweis.titel}
        </span>
        <span aria-hidden="true" className="flex h-lh shrink-0 items-center">
          <Icon name="pfeil" groesse={20} />
        </span>
      </span>
      {verweis.beschreibung ? <span className={verbinde('block k-text text-k-2 text-k-tinte-2', UMBRUCH)}>{verweis.beschreibung}</span> : null}
    </>
  );
  return (
    <Rasterfeld als="li" breite={breite} innen="keiner" flaeche={flaeche}>
      {istIntern(verweis.href) ? (
        <Link href={verweis.href} data-motion="zustand" className={FELDLINK}>
          {inhalt}
        </Link>
      ) : (
        <a href={verweis.href} data-motion="zustand" className={FELDLINK}>
          {inhalt}
        </a>
      )}
    </Rasterfeld>
  );
}

function Verweisblock({
  titel,
  tid,
  etikett,
  verweise,
  landmarke = 'nav',
  spalten = 4,
  nachsatz,
  aktionen = [],
  flaeche,
  mitRahmen,
}: Pick<QuerverweiseProps, 'titel' | 'etikett' | 'verweise' | 'landmarke' | 'spalten' | 'nachsatz' | 'aktionen'> & {
  tid: string;
  flaeche: 'fliese' | 'kalk';
  mitRahmen: boolean;
}) {
  const Element = mitRahmen ? 'div' : landmarke;
  return (
    <Element aria-labelledby={mitRahmen ? undefined : tid}>
      {mitRahmen ? null : (
        <header className="max-w-(--k-mass)">
          <Abschnittskopf etikett={etikett} titel={titel} titelId={tid} kopfGroesse="klein" />
        </header>
      )}
      <Feldraster als="ul" className={mitRahmen ? undefined : 'mt-k-6'}>
        {verweise.map((v, i) => (
          <Verweisfeld key={`${v.href}-${i}`} verweis={v} breite={BREITE[spalten]} flaeche={flaeche} />
        ))}
      </Feldraster>
      {nachsatz && !mitRahmen ? <Nachsatz className="mt-k-5">{nachsatz}</Nachsatz> : null}
      <Knopfreihe knoepfe={aktionen} className="mt-k-6" />
    </Element>
  );
}

export default function Querverweise({
  titel,
  titelId,
  etikett,
  verweise,
  landmarke = 'nav',
  spalten = 4,
  nachsatz,
  aktionen,
  eingebettet = false,
  flaeche = 'kalk',
  dichte = 'eng',
  ...rahmen
}: QuerverweiseProps) {
  const eigeneId = `k-verweise${useId()}`;
  const tid = titelId ?? eigeneId;
  if (verweise.length === 0) return null;
  const feld = flaeche === 'fliese' ? 'kalk' : 'fliese';
  if (eingebettet) {
    return (
      <Verweisblock
        titel={titel}
        tid={tid}
        etikett={etikett}
        verweise={verweise}
        landmarke={landmarke}
        spalten={spalten}
        nachsatz={nachsatz}
        aktionen={aktionen}
        flaeche={feld}
        mitRahmen={false}
      />
    );
  }
  return (
    <Abschnitt
      als={landmarke}
      titel={titel}
      titelId={tid}
      etikett={etikett}
      kopfGroesse="klein"
      flaeche={flaeche}
      dichte={dichte}
      nachsatz={nachsatz}
      {...rahmen}
    >
      <Verweisblock titel={titel} tid={tid} verweise={verweise} spalten={spalten} aktionen={aktionen} flaeche={feld} mitRahmen />
    </Abschnitt>
  );
}
