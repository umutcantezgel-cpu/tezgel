// Mega-Menü-Inhalt Variante B „Achse“: ein weites Blatt (12 Spalten, 1-px-Fugen statt Karten) unter der Waage.
// Links der Bereich (Name in Anzeige-Satz, Beschreibung), dann die Kategorien als nummerierte Listen (Mono-Ziffern 01 …,
// laufend über das Blatt), rechts der „featured“-Block als Feld mit Mono-Etikett. Wortlaut vollständig aus der Konfiguration.
// Rein darstellend (keine Hooks): die Navigation reicht `beimFolgen` (Menü schließen) herein, die Vorschau zeigt es statisch.
// Hover-Ziel und aktiver Punkt: 2-px-Laserlot links am Punkt; aktiv zusätzlich Ziffer und Name in Laser tief + aria-current.
import Link from 'next/link';
import { Etikett, Knopf, fokus, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import type { Eintrag, Unterpunkt } from '@/components/kern/kopf-b/modell';

type BlattProps = {
  eintrag: Eintrag;
  pfad: string;
  beimFolgen?: () => void;
};

function Punkt({ punkt, pfad, beimFolgen }: { punkt: Unterpunkt; pfad: string; beimFolgen?: () => void }) {
  const aktiv = pfad === punkt.pfad;
  return (
    <Link
      href={punkt.pfad}
      prefetch={false}
      onClick={beimFolgen}
      aria-current={aktiv ? 'page' : undefined}
      data-motion="zustand"
      className={verbinde('group/punkt relative flex min-h-k-7 gap-k-3 rounded-k-1 py-k-2 pl-k-3 pr-k-2', fokus('hell'))}
    >
      <span
        aria-hidden="true"
        className={verbinde(
          'pointer-events-none absolute inset-y-k-2 left-0 border-l-2 border-k-laser',
          aktiv ? 'opacity-100' : 'opacity-0 pointer-fine:group-hover/punkt:opacity-100',
        )}
      />
      <span aria-hidden="true" className={verbinde('w-k-5 shrink-0 k-mono text-k-1', aktiv ? 'text-k-laser-tief' : 'text-k-tinte-2')}>
        {punkt.nummer}
      </span>
      <span className="min-w-0 k-text">
        <span className={verbinde('block text-k-2 font-semibold', aktiv ? 'text-k-laser-tief' : 'text-k-tinte')}>{punkt.name}</span>
        {punkt.beschreibung ? <span className="mt-k-1 block text-k-1 text-k-tinte-2">{punkt.beschreibung}</span> : null}
      </span>
    </Link>
  );
}

export default function MegaBlatt({ eintrag, pfad, beimFolgen }: BlattProps) {
  const h = eintrag.hervorhebung;
  const mehrere = eintrag.kategorien.length > 1;
  // Ohne Hervorhebung bekommt der Kategorienbereich 9 statt 6 Spalten; eine einzelne Kategorie läuft dann zweispaltig.
  const zweispaltig = !h && !mehrere;
  return (
    <div className="mx-auto grid max-w-(--k-seite) grid-cols-12 px-(--k-rand) py-k-6">
      <div className="col-span-3 pr-k-5">
        <p className="k-anzeige text-k-5 text-k-tinte">{eintrag.name}</p>
        {eintrag.beschreibung ? <p className="mt-k-3 k-text text-k-2 text-k-tinte-2">{eintrag.beschreibung}</p> : null}
      </div>
      <div className={verbinde('grid border-l border-k-fuge', h ? 'col-span-6' : 'col-span-9', mehrere ? 'grid-cols-2' : 'grid-cols-1')}>
        {eintrag.kategorien.map((kat, j) => (
          <div key={kat.titel} className={verbinde('min-w-0 px-k-4', j > 0 && 'border-l border-k-fuge')}>
            <Etikett als="p" className="pl-k-3">
              {kat.titel}
            </Etikett>
            <ol role="list" className={verbinde('mt-k-3 grid', zweispaltig && 'grid-cols-2 gap-x-k-4')}>
              {kat.punkte.map((p) => (
                <li key={p.pfad + p.name}>
                  <Punkt punkt={p} pfad={pfad} beimFolgen={beimFolgen} />
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      {h ? (
        <div className="col-span-3 flex flex-col items-start gap-k-3 border-l border-k-fuge pl-k-5">
          <Etikett rahmen kreuz>
            {h.etikett}
          </Etikett>
          <p className="k-anzeige text-k-4 text-k-tinte">{h.titel}</p>
          <p className="k-text text-k-2 text-k-tinte-2">{h.text}</p>
          <Knopf href={h.ziel.pfad} art="neben" onClick={beimFolgen} hinten={<Icon name="pfeil" groesse={16} />} className="mt-k-2">
            {h.ziel.name}
          </Knopf>
        </div>
      ) : null}
    </div>
  );
}
