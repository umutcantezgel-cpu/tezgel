// /leistungen · Gewerk (S-01, KERN v2 K-003 „Fuge statt Karte“, K-006, K-008): ein Fachgewerk als Plan-Feld im 12er-Raster.
// Bestand: `article#<id>` im „Grid der 4 Fachgewerke“ (Glas-Karte mit Icon-Kachel). Jetzt: Planfeld (gezeichnete Vignette aus
// `@/components/start/vignetten`, 5 Spalten) und Textfeld (7 Spalten), durch eine Fuge getrennt; die Seite des Plans wechselt
// von Feld zu Feld (01 links, 02 rechts …), die Zeichnung steht mittig in ihrem Feld. Unter lg steht der Plan über dem Text:
// Er eröffnet das Feld wie auf der Startseite, und der Text läuft danach ohne Unterbrechung bis zu den Wegen.
// Inhalt in Bestandsreihenfolge: Feldkopf (Nummer, Etikett „Geprüfte Fachkompetenz“) · H2 · detailText · Unterleistungen als
// Mono-Etiketten an der Fuge · „Ausstattungsmerkmale & Vorteile:“ · Merkmale mit Fugenkreuz · Fachdetails-Link und „Aufmaß
// anfragen“. Wortlaut aus `SERVICES` (`@/config/services`) und `src/app/(bestand)/leistungen/page.jsx`.
// Bewegung: ein `auftritt` je Feld (am Artikel), Link-Farbwechsel `zustand`, der Knopf trägt `druck` selbst. Kein Hover-Heben,
// Rot nur in der Vignette „wohnen“ (ihre Laserachse).
// Ansatz für SIG-3 (S-11, „Verlegeplan je Leistung“): Der Artikel ist der Auslöser (Hover/Fokus auf seinen Wegen), das
// Element `[data-plan-feld]` trägt nur die Zeichnung – dort kann die Bewegung je Feld ansetzen, ohne Markup-Umbau.
import Link from 'next/link';
import clsx from 'clsx';
import { SERVICES } from '@/config/services';
import Icon from '@/components/icons/Icon';
import Knopf from '@/components/kern/Knopf';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { etikettKlassen } from '@/components/kern/stile';
import { VIGNETTEN, istVignette } from '@/components/start/vignetten';
import { gewerkNummer } from '@/components/leistungen/Sprungindex';

export type Leistung = (typeof SERVICES)[number];

export default function Gewerk({ leistung, nr }: { leistung: Leistung; nr: number }) {
  // Plan links bei 01, 03 …; rechts bei 02, 04 … (nur ab lg, darunter steht er über dem Text)
  const planRechts = nr % 2 === 1;
  const Vignette = istVignette(leistung.id) ? VIGNETTEN[leistung.id] : null;
  const titelId = `${leistung.id}-titel`;

  return (
    <article
      id={leistung.id}
      aria-labelledby={titelId}
      data-motion="auftritt"
      className="grid scroll-mt-24 grid-cols-4 border-r border-b border-fuge bg-fliese md:grid-cols-8 lg:grid-cols-12"
    >
      {/* Planfeld: Vignette mit fester Proportion; ab lg senkrecht mittig in der Höhe des Textfelds (wie die Zeichnung
          auf einem Planblatt). Kein Kleben beim Scrollen: Ein klebendes Feld liefe am Feldende unter den festen Kopf. */}
      {Vignette ? (
        <div
          className={clsx(
            'col-span-4 border-b border-fuge md:col-span-8 lg:col-span-5 lg:row-start-1 lg:flex lg:items-center lg:border-b-0',
            planRechts ? 'lg:col-start-8 lg:border-l' : 'lg:col-start-1 lg:border-r',
          )}
        >
          <div className="w-full p-6 md:p-12">
            <div data-plan-feld={leistung.id} className="mx-auto max-w-md text-tinte">
              <Vignette />
            </div>
          </div>
        </div>
      ) : null}

      {/* Textfeld */}
      <div
        className={clsx(
          'col-span-4 flex min-w-0 flex-col md:col-span-8 lg:row-start-1',
          Vignette ? 'lg:col-span-7' : 'lg:col-span-12',
          Vignette && (planRechts ? 'lg:col-start-1' : 'lg:col-start-6'),
        )}
      >
        {/* Feldkopf: Nummer in Mono links, Etikett rechts */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-fuge px-6 py-3 lg:px-12">
          <span className="font-mono text-fs-1 text-tinte">{gewerkNummer(nr)}</span>
          <span className={etikettKlassen}>Geprüfte Fachkompetenz</span>
        </div>

        <div className="px-6 py-8 lg:px-12 lg:py-12">
          <h2 id={titelId} className="text-fs-6 text-tinte">
            {leistung.name}
          </h2>
          <p className="mt-6 max-w-mass text-fs-3 text-tinte-2">{leistung.detailText}</p>

          {/* Unterleistungen: Mono-Etiketten an der Fuge (Ränder fallen zusammen, keine Pillen) */}
          <ul className="mt-8 flex flex-wrap pt-px pl-px">
            {leistung.subcategories.map((unter) => (
              <li key={unter.id} className="-mt-px -ml-px border border-fuge px-3 py-2 font-mono text-fs-1 text-tinte">
                {unter.name}
              </li>
            ))}
          </ul>

          <p className="mt-12 font-mono text-fs-1 text-tinte-2">Ausstattungsmerkmale &amp; Vorteile:</p>
          <ul className="mt-4 grid gap-3 md:grid-cols-2 md:gap-x-8 lg:grid-cols-1 xl:grid-cols-2">
            {leistung.features.map((merkmal) => (
              <li key={merkmal} className="flex gap-3 font-text text-fs-2 text-tinte">
                <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                  <Fugenkreuz className="size-3" />
                </span>
                <span className="min-w-0">{merkmal}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Wege: Fachdetails (Textlink) und Aufmaß (Nebenknopf) */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-fuge px-6 py-2 lg:px-12">
          <Link
            href={`/leistungen/${leistung.id}`}
            data-motion="zustand"
            className="group inline-flex min-h-12 items-center gap-2 font-text text-fs-2 font-semibold text-tinte"
          >
            <span className="underline decoration-strich decoration-1 underline-offset-4 pointer-fine:group-hover:decoration-tinte pointer-fine:group-hover:decoration-2 group-active:decoration-tinte group-active:decoration-2">
              Fachdetails &amp; Ratgeber: {leistung.name}
            </span>
            <span aria-hidden="true" className="flex shrink-0">
              <Icon name="pfeil-rechts" groesse={5} />
            </span>
          </Link>
          <Knopf href="#express-anfrage" variante="neben" className="my-2 w-full sm:w-auto">
            Aufmaß anfragen
          </Knopf>
        </div>
      </div>
    </article>
  );
}
