// Startseite · Fachgewerke (P3-10, KERN v1.2): „Fliesen-, Platten- & Verlegearbeiten in Fachqualität“, Anker #leistungen.
// Struktur: Feldraster aus Leistungsfeldern (K-003 „Fuge statt Karte“), bewusst anders als das Text-Verzeichnis der
// Fachbereiche (K-011): je Leistung eine gezeichnete Plan-Vignette statt Foto (K-003 Prinzip 4), Feldkopf mit Etikett,
// Name, Kurzbeschreibung, Merkmale mit Fugenkreuz und Verweis. Bad ist das Hauptfeld über alle 12 Spalten
// (Vignette 5, Text 7, sechs Merkmale zweispaltig; Tablett Vignette und Text je halb), darunter drei Felder zu je
// 4 Spalten (Tablett 4 · 4 · 8, das breite mit Vignette neben dem Text).
// Kein Hover-Heben, kein Zoom; Links mit Zuständen nach K-011. Ein Auftritt im Abschnitt: die Felder rücken gestaffelt
// in die Flucht (`auftritt`, `--k-staffel-nr` 0–3, Regel in kern.css). Rot nur in der Vignette „wohnen“ (Laserachse).
// Inhalt aus `@/config/services` (`SERVICES`), Etiketten aus `@/lib/kern/start/daten`; Merkmale wie im Bestand: Bad 6, sonst 3.
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { SERVICES } from '@/config/services';
import Etikett from '@/components/kern/basis/Etikett';
import Knopf from '@/components/kern/basis/Knopf';
import { Feldraster, Rasterfeld, type Breite } from '@/components/kern/basis/Feldraster';
import { Fugenkreuz } from '@/components/kern/basis/Zeichen';
import { fokus, verbinde } from '@/components/kern/basis/klassen';
import Icon from '@/components/kern/icons/Icon';
import { VIGNETTEN, istVignette } from '@/components/kern/motive/vignetten';
import { FACHGEWERK_ETIKETTEN } from '@/lib/kern/start/daten';

type Leistung = (typeof SERVICES)[number];

// Tablett: die ersten beiden Nebenfelder halb, das dritte über die volle Breite (Vignette neben dem Text).
const BREITE: Record<'haupt' | 'neben' | 'breit', Breite> = {
  haupt: { mobil: 4, tablett: 8, desktop: 12 },
  neben: { mobil: 4, tablett: 4, desktop: 4 },
  breit: { mobil: 4, tablett: 8, desktop: 4 },
};

function Fachgewerk({ leistung, nr, lage }: { leistung: Leistung; nr: number; lage: 'haupt' | 'neben' | 'breit' }) {
  const haupt = lage === 'haupt';
  const Vignette = istVignette(leistung.id) ? VIGNETTEN[leistung.id] : null;
  const titelId = `leistung-${leistung.id}`;
  return (
    <Rasterfeld
      als="article"
      aria-labelledby={titelId}
      breite={BREITE[lage]}
      innen="keiner"
      flaeche="fliese"
      data-motion="auftritt"
      data-ausloeser="sicht"
      style={{ '--k-staffel-nr': nr } as CSSProperties}
      className={verbinde('flex flex-col', haupt && 'md:grid md:grid-cols-2 lg:grid-cols-12', lage === 'breit' && 'md:grid md:grid-cols-2 lg:flex')}
    >
      {Vignette ? (
        <div
          className={verbinde(
            'flex items-center border-b border-k-fuge p-k-5 text-k-tinte',
            haupt && 'md:border-r md:border-b-0 lg:col-span-5 lg:p-k-7',
            lage === 'breit' && 'md:border-r md:border-b-0 lg:border-r-0 lg:border-b',
          )}
        >
          <Vignette />
        </div>
      ) : null}

      <div className={verbinde('flex flex-1 flex-col', haupt && 'lg:col-span-7')}>
        {/* Feldkopf: Etikett der Leistung und Gattung, beide Mono (K-012 Klasse 3) */}
        <div className="flex flex-wrap items-start justify-between gap-k-3 border-b border-k-fuge px-k-5 py-k-3 lg:px-k-6">
          <Etikett ton="tinte" kreuz>
            {FACHGEWERK_ETIKETTEN[leistung.id] ?? leistung.name}
          </Etikett>
          <Etikett>Fachgewerk</Etikett>
        </div>

        <div className="px-k-5 py-k-5 lg:px-k-6">
          <h3 id={titelId} className={verbinde('k-anzeige text-k-tinte', haupt ? 'text-k-5' : 'text-k-4')}>
            {leistung.name}
          </h3>
          <p className={verbinde('mt-k-3 max-w-(--k-mass) k-text text-k-tinte-2', haupt ? 'text-k-3' : 'text-k-2')}>
            {leistung.shortDescription}
          </p>
          <ul className={verbinde('mt-k-5 grid gap-k-3', haupt && 'lg:grid-cols-2 lg:gap-x-k-6')}>
            {leistung.features.slice(0, haupt ? 6 : 3).map((merkmal) => (
              <li key={merkmal} className="flex gap-k-3 k-text text-k-2 text-k-tinte">
                <span aria-hidden="true" className="flex h-lh shrink-0 items-center text-k-strich">
                  <Fugenkreuz className="size-k-3" />
                </span>
                <span className="min-w-0">{merkmal}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-k-3 border-t border-k-fuge px-k-5 py-k-2 lg:px-k-6">
          <Link
            href={`/leistungen/${leistung.id}`}
            data-motion="zustand"
            className={verbinde('group inline-flex min-h-k-7 items-center gap-k-2 rounded-k-1 k-text text-k-2 font-semibold text-k-tinte', fokus())}
          >
            <span className="underline decoration-1 underline-offset-4 decoration-k-strich pointer-fine:group-hover:decoration-2 pointer-fine:group-hover:decoration-k-tinte group-active:decoration-2 group-active:decoration-k-tinte">
              Details &amp; Ausführung: {leistung.name}
            </span>
            <span aria-hidden="true" className="flex shrink-0">
              <Icon name="pfeil" groesse={20} />
            </span>
          </Link>
          {haupt ? (
            <Knopf href="/bad" className="my-k-2">
              Zum Fachbereich Badsanierung
            </Knopf>
          ) : null}
        </div>
      </div>
    </Rasterfeld>
  );
}

export default function Fachgewerke() {
  // Nebenfelder in Bestandsreihenfolge; bei ungerader Zahl füllt das letzte auf dem Tablett die Reihe.
  const nebenIds = SERVICES.filter((s) => s.id !== 'bad').map((s) => s.id);
  const breitId = nebenIds.length % 2 === 1 ? nebenIds[nebenIds.length - 1] : null;
  return (
    <section id="leistungen" aria-labelledby="leistungen-heading" className="py-k-9 lg:py-k-10">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        <div className="max-w-(--k-mass)">
          <Etikett kreuz>Fachgewerke</Etikett>
          <h2 id="leistungen-heading" className="mt-k-4 k-anzeige text-k-6 text-k-tinte">
            Fliesen-, Platten- &amp; Verlegearbeiten in Fachqualität
          </h2>
          <p className="mt-k-5 k-text text-k-4 text-k-tinte-2">
            Ob barrierefreie Wellnessoase, offenes Wohnen mit Feinsteinzeug oder die wetterfeste Terrasse: Fachqualität aus Aßlar für den Lahn-Dill-Kreis und Hessen.
          </p>
        </div>

        <Feldraster className="mt-k-8">
          {SERVICES.map((leistung, nr) => {
            if (leistung.id === 'bad') return <Fachgewerk key={leistung.id} leistung={leistung} nr={nr} lage="haupt" />;
            return <Fachgewerk key={leistung.id} leistung={leistung} nr={nr} lage={leistung.id === breitId ? 'breit' : 'neben'} />;
          })}
        </Feldraster>
      </div>
    </section>
  );
}
