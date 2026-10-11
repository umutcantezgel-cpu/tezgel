// Verwandte Artikel (P4-02, KERN v1.2): „Das könnte Sie auch interessieren“ unter dem Artikel. Drei Felder im
// Fugenraster (Spalten nach Behälterbreite, höchstens drei je Reihe; P4-10a): Bild 2:1, Kategorie als Mono-Etikett, Titel als Link (Bestand: <p> mit Link, keine
// Überschrift), Kurztext, „Artikel lesen“. Ganzes Feld über den Link anklickbar, Fokus-Ring am Link (Lehre 4).
// Die Auswahl (gleiche Kategorie, gemeinsame Schlagworte, sonst neueste) trifft der Aufrufer – im Bestand steckt sie in
// `RelatedPosts.jsx` und gehört in einen gemeinsamen Helfer (OFFENE FRAGE, G9).
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Etikett, fokus, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import Bild, { type BildAngaben } from '@/components/kern/vorlagen/liste/Bild';
import { Fugenfeld, Fugenraster } from '@/components/kern/vorlagen/teile/Fugenraster';
import { stufeNachWort } from '@/components/kern/vorlagen/teile/satz';
import { UMBRUCH } from '@/components/kern/vorlagen/teile/typen';

export type VerwandterArtikel = { href: string; titel: ReactNode; kategorie?: ReactNode; text?: ReactNode; bild?: BildAngaben };

export type VerwandteProps = {
  titel: ReactNode;
  titelId?: string;
  artikel: VerwandterArtikel[];
  mehr: ReactNode;
  className?: string;
};

const LINK = verbinde(
  'rounded-k-1 decoration-1 underline-offset-4 decoration-k-tinte pointer-fine:group-hover:underline group-active:underline after:absolute after:inset-0',
  fokus(),
);

export default function Verwandte({ titel, titelId, artikel, mehr, className }: VerwandteProps) {
  if (artikel.length === 0) return null;
  return (
    <div className={verbinde('flex flex-col gap-k-6', className)}>
      <h2 id={titelId} className={verbinde('k-anzeige text-k-tinte', stufeNachWort(titel, 'abschnitt', 'text-k-5'), UMBRUCH)}>
        {titel}
      </h2>
      <Fugenraster als="ul" spalten={3} aria-labelledby={titelId}>
        {artikel.map((a) => (
          <Fugenfeld key={a.href} als="li" innen="keiner" flaeche="fliese" className="group relative flex flex-col pointer-fine:hover:bg-k-kalk">
            {a.bild ? <Bild {...a.bild} sizes="(min-width: 1024px) 25vw, 100vw" rahmen="unten" /> : null}
            <div className="flex flex-1 flex-col gap-k-3 p-k-5">
              {a.kategorie ? (
                <Etikett rahmen ton="tinte">
                  {a.kategorie}
                </Etikett>
              ) : null}
              <p className={verbinde('k-text text-k-3 font-semibold text-k-tinte', UMBRUCH)}>
                <Link href={a.href} data-motion="zustand" className={LINK}>
                  {a.titel}
                </Link>
              </p>
              {a.text ? <p className="k-text text-k-2 text-k-tinte-2 line-clamp-2">{a.text}</p> : null}
              <span className="mt-auto flex items-center gap-k-2 border-t border-k-fuge pt-k-3 k-text text-k-2 font-semibold text-k-tinte">
                <span>{mehr}</span>
                <span aria-hidden="true" className="flex shrink-0">
                  <Icon name="pfeil" groesse={20} />
                </span>
              </span>
            </div>
          </Fugenfeld>
        ))}
      </Fugenraster>
    </div>
  );
}
