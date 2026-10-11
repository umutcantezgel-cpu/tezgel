// Seitenkopf der Vorlagen Liste, Artikel und Detail (P4-02, KERN v1.2, K-011).
// Arbeitsseite (`/blog`, Blogartikel): kompakter Kopf, H1 in k-6, kein Lot, wenig Abstand – die Liste bzw. der Text
// beginnt im ersten Bildschirm. Erzählseite (`/bad/musterbaeder`, `/referenzen` und ihre Detailseiten laut
// GRUNDMENGE.json): H1 in k-7, Lot (mobil am Rand, ab lg an der Spaltengrenze der Textspalte), sonst gleich gebaut.
// Lesefolge: Rücksprung · Etiketten (Mono, je ein Element) · H1 · Vorspann · Kennzeile (Datum, Lesezeit in Mono) ·
// Hinweis (z. B. „Verbindlicher Festpreis nach …“) · Wege. Ersetzt den zentrierten `ceramic-hero`.
import type { ReactNode } from 'react';
import { Etikett, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import type { IconName } from '@/components/kern/icons/geometrie';
import { ACHSE_SPALTE, Aktionen, Lot, Ruecklink, type Aktion, type Seitenart } from '@/components/kern/vorlagen/uebersicht/Abschnitt';

/** Kennzeile: Maßangabe in Mono mit optionalem Zeichen (Kalender, Uhr). */
export type Kennung = { zeichen?: IconName; text: ReactNode };

export type KopfProps = {
  seitenart?: Seitenart;
  ruecklink?: { href: string; label: ReactNode };
  etiketten?: ReactNode[];
  titel: ReactNode;
  titelId?: string;
  text?: ReactNode;
  kennungen?: Kennung[];
  /** gerahmter Satz unter dem Vorspann (Bestand: weißes Kästchen) */
  hinweis?: ReactNode;
  aktionen?: Aktion[];
  /** Randspalte (nur Erzählseite, ab lg rechts) */
  rand?: ReactNode;
  className?: string;
};

export default function Kopf({ seitenart = 'arbeit', ruecklink, etiketten = [], titel, titelId, text, kennungen = [], hinweis, aktionen = [], rand, className }: KopfProps) {
  const erzaehl = seitenart === 'erzaehl';
  return (
    <header className={verbinde('relative border-b border-k-fuge bg-k-kalk', className)}>
      {erzaehl ? <Lot /> : null}
      <div className={verbinde('mx-auto grid max-w-(--k-seite) gap-k-6 px-(--k-rand) lg:grid-cols-12 lg:gap-0', erzaehl ? 'pt-k-8 pb-k-8 lg:pt-k-9' : 'pt-k-6 pb-k-6 lg:pt-k-7')}>
        <div className={verbinde('flex min-w-0 flex-col', erzaehl ? verbinde('lg:col-span-8', ACHSE_SPALTE) : 'lg:col-span-9')}>
          {ruecklink ? (
            <div className="-ml-k-1">
              <Ruecklink href={ruecklink.href}>{ruecklink.label}</Ruecklink>
            </div>
          ) : null}
          {etiketten.length > 0 ? (
            <ul className={verbinde('flex flex-wrap gap-k-2', ruecklink ? 'mt-k-3' : '')}>
              {etiketten.map((e, i) => (
                <li key={i} className="min-w-0">
                  <Etikett rahmen ton={i === 0 ? 'tinte' : 'neben'}>
                    {e}
                  </Etikett>
                </li>
              ))}
            </ul>
          ) : null}
          <h1 id={titelId} className={verbinde('mt-k-4 k-anzeige text-k-tinte wrap-break-word hyphens-auto', erzaehl ? 'text-k-7' : 'text-k-6')}>
            {titel}
          </h1>
          {text ? <div className={verbinde('mt-k-4 max-w-(--k-mass) k-text text-k-tinte', erzaehl ? 'text-k-4' : 'text-k-3')}>{text}</div> : null}
          {kennungen.length > 0 ? (
            <ul className="mt-k-4 flex flex-wrap gap-x-k-5 gap-y-k-2">
              {kennungen.map((k, i) => (
                <li key={i} className="flex items-center gap-k-2 k-mono text-k-1 text-k-tinte-2">
                  {k.zeichen ? (
                    <span aria-hidden="true" className="flex shrink-0">
                      <Icon name={k.zeichen} groesse={16} />
                    </span>
                  ) : null}
                  <span>{k.text}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {hinweis ? <p className="mt-k-5 w-fit max-w-(--k-mass) border border-k-strich bg-k-fliese px-k-4 py-k-3 k-text text-k-2 text-k-tinte">{hinweis}</p> : null}
          <Aktionen aktionen={aktionen} className="mt-k-5" />
        </div>
        {rand ? <div className="min-w-0 lg:col-span-4 lg:self-end lg:pl-k-7">{rand}</div> : null}
      </div>
    </header>
  );
}
