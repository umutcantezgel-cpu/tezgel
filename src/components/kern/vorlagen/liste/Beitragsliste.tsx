// Beitragsliste (P4-02, KERN v1.2): Liste der Ratgeber-Artikel auf `/blog` – hervorgehobener Beitrag, Raster der
// Beiträge und Leerzustand. Ersetzt `glass-bezel`-Karte und `BlogCard` (Schatten, Zoom beim Hover, Verlauf über dem
// Foto, Pillen auf dem Bild) durch Felder im Fugenraster: Bild 2:1 mit Fugenrahmen, darunter Kennzeile (Kategorie als
// Mono-Etikett, Lesezeit, Datum in Mono), Titel, Auszug, „Artikel lesen“. Kein Text auf dem Bild (K-008).
// Selektoren wie im Bestand: Titel als `h3 > a[href="/blog/…"]` (Hervorhebung: `h2`), das ganze Feld ist über den Link
// anklickbar (Fläche per ::after), der Fokus-Ring sitzt am Link selbst (Lehre 4). Auswahl von Hervorhebung und gefilterten
// Beiträgen trifft der Aufrufer (Logik im Bestand, OFFENE FRAGE G9). Der Leerzustand steht in einer stets vorhandenen
// Statusregion, damit ein Hook-Wechsel zu „keine Treffer“ angesagt wird.
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Etikett, Knopf, fokus, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import Bild, { type BildAngaben } from '@/components/kern/vorlagen/liste/Bild';

export type Beitrag = {
  href: string;
  titel: ReactNode;
  text?: ReactNode;
  kategorie?: ReactNode;
  datum?: ReactNode;
  lesezeit?: ReactNode;
  bild?: BildAngaben;
};

export type Hervorhebung = Beitrag & {
  /** Badge (Bestand: „Empfohlener Leitfaden“) */
  marke?: ReactNode;
  /** Wegtext (Bestand: „Vollständigen Leitfaden lesen“) */
  mehr: ReactNode;
};

export type BeitragslisteProps = {
  hervorhebung?: Hervorhebung;
  beitraege: Beitrag[];
  /** Wegtext je Beitrag (Bestand: „Artikel lesen“) */
  mehr: ReactNode;
  /** Leerzustand: Meldung und Knopf zum Zurücksetzen (Bestand: „Keine Artikel …“, „Filter zurücksetzen“) */
  leer: { text: ReactNode; zuruecksetzen: ReactNode; onZuruecksetzen?: () => void };
  /** Titelebene der Beiträge; Standard h3 wie im Bestand */
  titelEbene?: 'h2' | 'h3';
  /** erstes Bild ist LCP-Kandidat */
  erstesBildVorladen?: boolean;
  className?: string;
};

const LINK = verbinde(
  'rounded-k-1 decoration-1 underline-offset-4 decoration-k-tinte pointer-fine:group-hover:underline group-active:underline',
  'after:absolute after:inset-0',
  fokus(),
);

function Kennzeile({ kategorie, lesezeit, datum }: Pick<Beitrag, 'kategorie' | 'lesezeit' | 'datum'>) {
  if (!kategorie && !lesezeit && !datum) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-k-4 gap-y-k-2">
      {kategorie ? (
        <Etikett rahmen ton="tinte">
          {kategorie}
        </Etikett>
      ) : null}
      {lesezeit ? (
        <span className="flex items-center gap-k-1 k-mono text-k-1 text-k-tinte-2">
          <span aria-hidden="true" className="flex shrink-0">
            <Icon name="uhr" groesse={16} />
          </span>
          <span>{lesezeit}</span>
        </span>
      ) : null}
      {datum ? <span className="k-mono text-k-1 text-k-tinte-2">{datum}</span> : null}
    </div>
  );
}

function Mehr({ children }: { children: ReactNode }) {
  return (
    <span className="mt-auto flex items-center gap-k-2 border-t border-k-fuge pt-k-3 k-text text-k-2 font-semibold text-k-tinte">
      <span>{children}</span>
      <span aria-hidden="true" className="flex shrink-0">
        <Icon name="pfeil" groesse={20} />
      </span>
    </span>
  );
}

export default function Beitragsliste({ hervorhebung, beitraege, mehr, leer, titelEbene: Titel = 'h3', erstesBildVorladen = false, className }: BeitragslisteProps) {
  const h = hervorhebung;
  return (
    <div className={verbinde('flex flex-col gap-k-6', className)}>
      {h ? (
        <article className="group relative grid border border-k-fuge border-t-k-tinte bg-k-fliese md:grid-cols-2 pointer-fine:hover:bg-k-kalk">
          {h.bild ? (
            <div className="min-w-0 border-b border-k-fuge md:border-r md:border-b-0">
              <Bild {...h.bild} sizes="(min-width: 768px) 50vw, 100vw" preload={erstesBildVorladen} rahmen="keiner" />
            </div>
          ) : null}
          <div className="flex min-w-0 flex-col gap-k-4 p-k-5 lg:p-k-7">
            {h.marke ? <Etikett kreuz>{h.marke}</Etikett> : null}
            <Kennzeile kategorie={h.kategorie} lesezeit={h.lesezeit} datum={h.datum} />
            <h2 className="k-anzeige text-k-5 text-k-tinte wrap-break-word hyphens-auto">
              <Link href={h.href} data-motion="zustand" className={LINK}>
                {h.titel}
              </Link>
            </h2>
            {h.text ? <p className="max-w-(--k-mass) k-text text-k-3 text-k-tinte-2">{h.text}</p> : null}
            <Mehr>{h.mehr}</Mehr>
          </div>
        </article>
      ) : null}

      {beitraege.length > 0 ? (
        <ul className="grid gap-px border border-k-fuge bg-k-fuge md:grid-cols-2">
          {beitraege.map((b, i) => (
            <li key={b.href} className="group relative flex min-w-0 flex-col bg-k-fliese pointer-fine:hover:bg-k-kalk">
              {b.bild ? <Bild {...b.bild} sizes="(min-width: 768px) 50vw, 100vw" preload={erstesBildVorladen && !h && i === 0} rahmen="unten" /> : null}
              <div className="flex flex-1 flex-col gap-k-3 p-k-5">
                <Kennzeile kategorie={b.kategorie} lesezeit={b.lesezeit} datum={b.datum} />
                <Titel className="k-anzeige text-k-4 text-k-tinte wrap-break-word hyphens-auto">
                  <Link href={b.href} data-motion="zustand" className={LINK}>
                    {b.titel}
                  </Link>
                </Titel>
                {b.text ? <p className="k-text text-k-2 text-k-tinte-2 line-clamp-3">{b.text}</p> : null}
                <Mehr>{mehr}</Mehr>
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      <div role="status">
        {beitraege.length === 0 && !h ? (
          <div className="flex flex-col items-start gap-k-4 border border-k-strich bg-k-fliese p-k-5 lg:flex-row lg:items-center lg:justify-between">
            <p className="flex items-start gap-k-3 k-text text-k-3 font-semibold text-k-tinte">
              <span aria-hidden="true" className="flex h-lh shrink-0 items-center">
                <Icon name="suche" groesse={24} />
              </span>
              <span className="min-w-0">{leer.text}</span>
            </p>
            <Knopf type="button" art="haupt" onClick={leer.onZuruecksetzen}>
              {leer.zuruecksetzen}
            </Knopf>
          </div>
        ) : null}
      </div>
    </div>
  );
}
