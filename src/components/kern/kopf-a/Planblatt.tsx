// Planblatt (Mega-Menü-Inhalt, ab lg) – Variante A „Schriftfeld“. Server-Komponente.
// Ein Blatt im Feldraster: links der Feldkopf auf Tinte (K-008 „Schriftfeld-Kopf“) mit Bereichsname und Beschreibung,
// darunter – wo vorhanden – der „featured“-Block mit Mono-Etikett; rechts die Kategorien als Spalten, getrennt durch
// 1-px-Fugen statt Karten, jeder Punkt ein Feld (Name + Beschreibung). Wortlaut vollständig aus `@/config/navigation`.
import Etikett from '@/components/kern/basis/Etikett';
import Knopf from '@/components/kern/basis/Knopf';
import { fokus } from '@/components/kern/basis/klassen';
import Icon from '@/components/kern/icons/Icon';
import NavLink from '@/components/kern/kopf-a/NavLink';
import type { Bereich } from '@/components/kern/kopf-a/daten';

// Eine Kategorie: über die ganze Breite, zwei Punkte je Reihe (Fuge zwischen den Spalten) · mehrere: je eine Spalte.
const PUNKTE = {
  eine: { liste: 'grid-cols-2', punkt: 'even:border-l' },
  mehrere: { liste: 'grid-cols-1', punkt: '' },
} as const;

export default function Planblatt({ bereich }: { bereich: Bereich }) {
  const { kategorien, featured } = bereich;
  const mehrere = kategorien.length > 1;
  const raster = mehrere ? PUNKTE.mehrere : PUNKTE.eine;
  return (
    <div className="border-t border-b border-t-k-fuge border-b-k-strich bg-k-fliese">
      <div className="mx-auto grid max-w-(--k-seite) grid-cols-12 border-x border-k-fuge">
        {/* Feldkopf */}
        <div className="col-span-3 flex flex-col bg-k-tinte text-k-kalk">
          <div className="p-k-5">
            <p className="k-anzeige text-k-5">{bereich.name}</p>
            <p className="mt-k-2 k-text text-k-2 text-k-nacht-2">{bereich.description}</p>
          </div>
          {featured ? (
            <div className="flex flex-1 flex-col border-t border-k-nacht-fuge p-k-5">
              <Etikett auf="tinte" rahmen>
                {featured.eyebrow}
              </Etikett>
              <p className="mt-k-3 k-anzeige text-k-4 text-k-kalk">{featured.title}</p>
              <p className="mt-k-2 k-text text-k-2 text-k-nacht-2">{featured.text}</p>
              <div className="mt-auto pt-k-5">
                <Knopf href={featured.cta.path} art="neben" auf="tinte" hinten={<Icon name="pfeil" groesse={16} />}>
                  {featured.cta.label}
                </Knopf>
              </div>
            </div>
          ) : null}
        </div>

        {/* Kategorien als Spalten */}
        <div className={`col-span-9 grid ${mehrere ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {kategorien.map((kategorie) => (
            <div key={kategorie.category} className="min-w-0 border-l border-k-fuge">
              <div className="border-b border-k-fuge px-k-4 py-k-3">
                <Etikett als="p">{kategorie.category}</Etikett>
              </div>
              <ul className={`grid ${raster.liste}`}>
                {kategorie.items.map((punkt) => (
                  <li key={punkt.path + punkt.name} className={`min-w-0 border-b border-k-fuge ${raster.punkt}`}>
                    <NavLink
                      href={punkt.path}
                      marke="lot"
                      prefetch={false}
                      className={`group/punkt relative flex min-h-k-7 items-start gap-k-2 px-k-4 py-k-3 pointer-fine:hover:bg-k-kalk active:bg-k-kalk data-aktiv:bg-k-kalk ${fokus('hell')}`}
                    >
                      <span className="flex min-w-0 flex-col">
                        <span className="k-text text-k-2 font-semibold text-k-tinte decoration-k-strich decoration-1 underline-offset-4 pointer-fine:group-hover/punkt:underline">
                          {punkt.name}
                        </span>
                        {punkt.desc ? <span className="k-text text-k-2 text-k-tinte-2">{punkt.desc}</span> : null}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
