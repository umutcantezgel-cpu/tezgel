// Beitragsliste (P4-02, KERN v1.2): Liste der Ratgeber-Artikel auf `/blog` – hervorgehobener Beitrag, Raster der
// Beiträge und Leerzustand. Ersetzt `glass-bezel`-Karte und `BlogCard` (Schatten, Zoom beim Hover, Verlauf über dem
// Foto, Pillen auf dem Bild) durch Felder im Fugenraster: Bild 2:1 mit Fugenrahmen, darunter Kennzeile (Kategorie als
// Mono-Etikett, Lesezeit, Datum in Mono), Titel, Auszug, „Artikel lesen“. Kein Text auf dem Bild (K-008).
// Selektoren wie im Bestand: Titel als `h3 > a[href="/blog/…"]` (Hervorhebung: `h2`), das ganze Feld ist über den Link
// anklickbar (Fläche per ::after), der Fokus-Ring sitzt am Link selbst (Lehre 4). Auswahl von Hervorhebung und gefilterten
// Beiträgen trifft der Aufrufer (Logik im Bestand, OFFENE FRAGE G9). Der Leerzustand steht in einer stets vorhandenen
// Statusregion, damit ein Hook-Wechsel zu „keine Treffer“ angesagt wird.
// P4-10a: Spalten nach dem Platz des Behälters (`teile/Fugenraster`, höchstens zwei je Reihe), Titelstufe nach dem längsten
// Wort. Die Hervorhebung steht ab Behälterbreite 42rem zweispaltig; ihr Bild füllt dann die volle Höhe seiner Spalte
// (`cover`, bzw. `contain` auf Kalk bei Kennzeichnung) statt als schmaler 2:1-Streifen oben links zu stehen.
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Etikett, Knopf, fokus, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import Bild, { type BildAngaben } from '@/components/kern/vorlagen/liste/Bild';
import { Fugenfeld, Fugenraster } from '@/components/kern/vorlagen/teile/Fugenraster';
import { stufeFuerAlle, stufeNachWort } from '@/components/kern/vorlagen/teile/satz';
import { UMBRUCH } from '@/components/kern/vorlagen/teile/typen';

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
  const titelStufe = stufeFuerAlle(beitraege.map((b) => b.titel), 'feld', 'text-k-4');
  return (
    <div className={verbinde('flex flex-col gap-k-6', className)}>
      {h ? (
        <div className="@container">
          <article className="group relative grid border border-k-fuge border-t-k-tinte bg-k-fliese @2xl:grid-cols-2 pointer-fine:hover:bg-k-kalk">
            {h.bild ? (
              <div className="min-w-0 border-b border-k-fuge @2xl:border-r @2xl:border-b-0">
                <Bild {...h.bild} sizes="(min-width: 1024px) 33vw, 100vw" preload={erstesBildVorladen} rahmen="keiner" className="@2xl:aspect-auto @2xl:h-full" />
              </div>
            ) : null}
            <div className="flex min-w-0 flex-col gap-k-4 p-k-5 lg:p-k-6">
              {h.marke ? <Etikett kreuz>{h.marke}</Etikett> : null}
              <Kennzeile kategorie={h.kategorie} lesezeit={h.lesezeit} datum={h.datum} />
              <h2 className={verbinde('k-anzeige text-k-tinte', stufeNachWort(h.titel, 'hervorhebung', 'text-k-5'), UMBRUCH)}>
                <Link href={h.href} data-motion="zustand" className={LINK}>
                  {h.titel}
                </Link>
              </h2>
              {h.text ? <p className="max-w-(--k-mass) k-text text-k-3 text-k-tinte-2">{h.text}</p> : null}
              <Mehr>{h.mehr}</Mehr>
            </div>
          </article>
        </div>
      ) : null}

      {beitraege.length > 0 ? (
        <Fugenraster als="ul" spalten={2}>
          {beitraege.map((b, i) => (
            <Fugenfeld key={b.href} als="li" innen="keiner" flaeche="fliese" className="group relative flex flex-col pointer-fine:hover:bg-k-kalk">
              {b.bild ? <Bild {...b.bild} sizes="(min-width: 1024px) 33vw, 100vw" preload={erstesBildVorladen && !h && i === 0} rahmen="unten" /> : null}
              <div className="flex flex-1 flex-col gap-k-3 p-k-5">
                <Kennzeile kategorie={b.kategorie} lesezeit={b.lesezeit} datum={b.datum} />
                <Titel className={verbinde('k-anzeige text-k-tinte', titelStufe, UMBRUCH)}>
                  <Link href={b.href} data-motion="zustand" className={LINK}>
                    {b.titel}
                  </Link>
                </Titel>
                {b.text ? <p className="k-text text-k-2 text-k-tinte-2 line-clamp-3">{b.text}</p> : null}
                <Mehr>{mehr}</Mehr>
              </div>
            </Fugenfeld>
          ))}
        </Fugenraster>
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
