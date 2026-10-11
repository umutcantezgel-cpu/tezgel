// Startseite · Fachgewerke (E020-F-2, KERN v2): „Fliesen-, Platten- & Verlegearbeiten in Fachqualität“, Anker #leistungen.
// Komposition nach dem Vorbild: Bento-Raster aus Feldern mit Fugen (K-003 „Fuge statt Karte“), je Leistung eine gezeichnete
// Plan-Vignette statt Foto, Feldkopf mit Nummer und Etikett, Name, Kurzbeschreibung, Merkmale mit Fugenkreuz und Verweis.
// Bad ist das Hauptfeld über alle 12 Spalten (Vignette 5, Text 7, sechs Merkmale zweispaltig), darunter drei Felder zu je
// 4 Spalten (Tablett 4 · 4 · 8, das breite mit Vignette neben dem Text).
// Kein Hover-Heben, kein Zoom. Ein Auftritt im Abschnitt: die Felder rücken beim Scrollen in die Flucht (`auftritt`, ohne
// Staffel). Links mit Farbwechsel nach Register (`zustand`). Rot nur in der Vignette „wohnen“ (Laserachse).
// Inhalt aus `@/config/services` (`SERVICES`), Etiketten aus `@/lib/kern/start/daten`; Merkmale wie im Bestand: Bad 6, sonst 3.
import Link from 'next/link';
import clsx from 'clsx';
import { SERVICES } from '@/config/services';
import Icon from '@/components/icons/Icon';
import Knopf from '@/components/kern/Knopf';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { etikettForm, etikettKlassen, seitenKlassen } from '@/components/kern/stile';
import { VIGNETTEN, istVignette } from '@/components/start/vignetten';
import { FACHGEWERK_ETIKETTEN } from '@/lib/kern/start/daten';

type Leistung = (typeof SERVICES)[number];
type Lage = 'haupt' | 'neben' | 'breit';

// Spalten je Ansicht: mobil 4 · ab 768 px 8 · ab 1024 px 12. Wörtliche Klassen, damit Tailwind sie findet.
const SPANNE: Record<Lage, string> = {
  haupt: 'col-span-4 md:col-span-8 lg:col-span-12',
  neben: 'col-span-4 md:col-span-4 lg:col-span-4',
  breit: 'col-span-4 md:col-span-8 lg:col-span-4',
};

// Aufteilung im Feld: Bad ab 1024 px Vignette 5 · Text 7; das breite Feld ab 768 px Vignette und Text nebeneinander.
const AUFTEILUNG: Record<Lage, string> = {
  haupt: 'md:grid md:grid-cols-2 lg:grid-cols-12',
  neben: '',
  breit: 'md:grid md:grid-cols-2 lg:flex',
};

const VIGNETTE_KLASSEN: Record<Lage, string> = {
  haupt: 'md:border-r md:border-b-0 lg:col-span-5 lg:p-12',
  neben: '',
  breit: 'md:border-r md:border-b-0 lg:border-r-0 lg:border-b',
};

function Fachgewerk({ leistung, nr, lage }: { leistung: Leistung; nr: number; lage: Lage }) {
  const haupt = lage === 'haupt';
  const Vignette = istVignette(leistung.id) ? VIGNETTEN[leistung.id] : null;
  const titelId = `leistung-${leistung.id}`;
  return (
    <article
      aria-labelledby={titelId}
      data-motion="auftritt"
      className={clsx('flex min-w-0 flex-col border-r border-b border-fuge bg-fliese', SPANNE[lage], AUFTEILUNG[lage])}
    >
      {Vignette ? (
        <div className={clsx('flex items-center border-b border-fuge p-6 text-tinte', VIGNETTE_KLASSEN[lage])}>
          <Vignette />
        </div>
      ) : null}

      <div className={clsx('flex min-w-0 flex-1 flex-col', haupt && 'lg:col-span-7')}>
        {/* Feldkopf: Nummer und Etikett der Leistung links, Gattung rechts (Mono, Ziffer in Tinte) */}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-fuge px-6 py-3 lg:px-8">
          <p className={clsx(etikettForm, 'text-tinte-2')}>
            <span className="text-tinte">{String(nr + 1).padStart(2, '0')}</span>
            <span aria-hidden="true">·</span>
            <span className="text-tinte">{FACHGEWERK_ETIKETTEN[leistung.id] ?? leistung.name}</span>
          </p>
          <span className={etikettKlassen}>Fachgewerk</span>
        </div>

        <div className="px-6 py-6 lg:px-8">
          <h3 id={titelId} className={clsx('text-tinte', haupt ? 'text-fs-5' : 'text-fs-4')}>
            {leistung.name}
          </h3>
          <p className={clsx('mt-3 max-w-mass font-text text-tinte-2', haupt ? 'text-fs-3' : 'text-fs-2')}>
            {leistung.shortDescription}
          </p>
          <ul className={clsx('mt-6 grid gap-3', haupt && 'lg:grid-cols-2 lg:gap-x-8')}>
            {leistung.features.slice(0, haupt ? 6 : 3).map((merkmal) => (
              <li key={merkmal} className="flex gap-3 font-text text-fs-2 text-tinte">
                <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                  <Fugenkreuz className="size-3" />
                </span>
                <span className="min-w-0">{merkmal}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-fuge px-6 py-2 lg:px-8">
          <Link
            href={`/leistungen/${leistung.id}`}
            data-motion="zustand"
            className="group inline-flex min-h-12 items-center gap-2 rounded-r1 font-text text-fs-2 font-semibold text-tinte"
          >
            <span className="underline decoration-1 underline-offset-4 decoration-strich pointer-fine:group-hover:decoration-2 pointer-fine:group-hover:decoration-tinte group-active:decoration-2 group-active:decoration-tinte">
              Details &amp; Ausführung: {leistung.name}
            </span>
            <span aria-hidden="true" className="flex shrink-0">
              <Icon name="pfeil-rechts" groesse={5} />
            </span>
          </Link>
          {haupt ? (
            <Knopf href="/bad" className="my-2 w-full md:w-auto">
              Zum Fachbereich Badsanierung
            </Knopf>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function Fachgewerke() {
  // Nebenfelder in Bestandsreihenfolge; bei ungerader Zahl füllt das letzte auf dem Tablett die Reihe.
  const nebenIds = SERVICES.filter((s) => s.id !== 'bad').map((s) => s.id);
  const breitId = nebenIds.length % 2 === 1 ? nebenIds[nebenIds.length - 1] : null;
  return (
    <section id="leistungen" aria-labelledby="leistungen-heading" className="py-16 lg:py-24">
      <div className={seitenKlassen}>
        <div className="max-w-mass">
          <p className={etikettKlassen}>
            <Fugenkreuz className="size-3 text-strich" />
            Fachgewerke
          </p>
          <h2 id="leistungen-heading" className="mt-4 text-fs-6 text-tinte">
            Fliesen-, Platten- &amp; Verlegearbeiten{' '}<span>in Fachqualität</span>
          </h2>
          <p className="mt-6 font-text text-fs-4 text-tinte-2">
            Ob barrierefreie Wellnessoase, offenes Wohnen mit Feinsteinzeug oder die wetterfeste Terrasse: Fachqualität aus Aßlar für den Lahn-Dill-Kreis und Hessen.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-4 border-t border-l border-fuge md:grid-cols-8 lg:grid-cols-12">
          {SERVICES.map((leistung, nr) => (
            <Fachgewerk
              key={leistung.id}
              leistung={leistung}
              nr={nr}
              lage={leistung.id === 'bad' ? 'haupt' : leistung.id === breitId ? 'breit' : 'neben'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
