// Suche und Kategorien der Ratgeber-Liste `/blog` (P4-08d, KERN v1.2 K-011, F-16). Nur Darstellung: Zustand und Rückrufe
// kommen aus `useBlogListe` (über die Ansicht); die Setzer-Verdrahtung `(e) => setSearchQuery(e.target.value)` steht hier
// wie im Bestand am Feld.
// Der Bestand führt Suche und Kategorien doppelt, je nach Breite eines davon sichtbar: unter lg über der Liste
// („Ratgeber durchsuchen“, „Alle Themen“, page.jsx), ab lg in der Seitenleiste („Suche“, „Artikel suchen“, „Kategorien“,
// „Alle Artikel“, BlogSidebar.jsx). Der Entwurf behält beide Fassungen mit ihrem Wortlaut und denselben Breiten
// (`lg:hidden` bzw. `hidden lg:grid`), damit je Ansicht genau ein Suchfeld und eine Knopfgruppe im Barrierebaum stehen.
// Die Desktop-Fassung steht aber über der Liste statt rechts neben ihr: Das Suchfeld käme sonst erst nach allen Beiträgen in
// der Tab-Folge (Lehre 7). Bereinigung auf eine Fassung: Vorschlag in der Rückgabe P4-08d.
// Kategorien als <button type="button" aria-pressed> wie im Bestand. Zustände: Ruhe (Rahmen Strich), Hover (feiner Zeiger:
// Fliese, Rahmen Tinte), :active (Fuge), Fokus 2 px am Knopf (vor Nachbarn: z-10), gedrückt (Tinte, Kalk-Text und
// Fugenkreuz – nicht nur Farbe, K-006). Leere Kategorien blendet die Logik aus; deaktiviert entfällt.
// Ohne JavaScript stehen Feld und Knöpfe im Ausgangszustand (alle Beiträge sichtbar), sie tun dann nichts – wie im Bestand.
import type { ReactNode } from 'react';
import { Etikett, Feld, Fugenkreuz, fokus, verbinde } from '@/components/kern/basis';

export type FilterKategorie = { id: string; name: ReactNode };

const KNOPF = verbinde(
  'relative inline-flex min-h-k-7 items-center gap-k-2 rounded-k-0 border px-k-4 py-k-2 k-text text-k-2 font-semibold text-left',
  fokus(),
  'focus-visible:z-10',
);
const RUHE = 'cursor-pointer border-k-strich bg-transparent text-k-tinte pointer-fine:hover:border-k-tinte pointer-fine:hover:bg-k-fliese active:bg-k-fuge';
const GEDRUECKT = 'cursor-pointer border-k-tinte bg-k-tinte text-k-kalk';

function Kategorieknoepfe({ kategorien, aktiv, onWaehlen, titelId }: { kategorien: readonly FilterKategorie[]; aktiv: string; onWaehlen: (id: string) => void; titelId?: string }) {
  return (
    <ul role="list" aria-labelledby={titelId} className="flex flex-wrap gap-k-2">
      {kategorien.map((k) => {
        const gedrueckt = k.id === aktiv;
        return (
          <li key={k.id} className="min-w-0">
            <button type="button" aria-pressed={gedrueckt} onClick={() => onWaehlen(k.id)} data-motion="zustand" className={verbinde(KNOPF, gedrueckt ? GEDRUECKT : RUHE)}>
              {gedrueckt ? (
                <span aria-hidden="true" className="flex shrink-0">
                  <Fugenkreuz className="size-k-3" />
                </span>
              ) : null}
              <span className="min-w-0 wrap-break-word hyphens-auto">{k.name}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

type Gemeinsam = {
  suchwert: string;
  setSearchQuery: (wert: string) => void;
  aktiv: string;
  setActiveCategory: (id: string) => void;
  /** Knöpfe; ohne Angabe entfällt die Gruppe (Bedingung des Bestands trifft die Ansicht) */
  kategorien?: readonly FilterKategorie[];
};

/** Fassung unter lg (Bestand page.jsx, „Search and Category Filter (Mobile & Tablet)“). */
export function FilterSchmal({ suchwert, setSearchQuery, aktiv, setActiveCategory, kategorien }: Gemeinsam) {
  return (
    <div role="search" data-hauptaktion="" className="flex flex-col gap-k-4 border-b border-k-fuge pb-k-5 lg:hidden">
      <Feld beschriftung="Ratgeber durchsuchen" placeholder="Ratgeber durchsuchen..." value={suchwert} onChange={(e) => setSearchQuery(e.target.value)} />
      {kategorien ? <Kategorieknoepfe kategorien={kategorien} aktiv={aktiv} onWaehlen={setActiveCategory} /> : null}
    </div>
  );
}

/** Fassung ab lg (Bestand BlogSidebar.jsx, Such- und Kategorien-Feld), über der Liste. */
export function FilterBreit({ suchwert, setSearchQuery, aktiv, setActiveCategory, kategorien, titelId }: Gemeinsam & { titelId: string }) {
  return (
    <div role="search" data-hauptaktion="" className="hidden border-b border-k-fuge pb-k-5 lg:grid lg:grid-cols-12 lg:items-end">
      <div className="flex min-w-0 flex-col gap-k-3 lg:col-span-4">
        <Etikett als="p" kreuz ton="tinte">
          Suche
        </Etikett>
        <Feld beschriftung="Artikel suchen" placeholder="Artikel suchen..." value={suchwert} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
      {kategorien ? (
        <div className="flex min-w-0 flex-col gap-k-3 lg:col-span-8 lg:pl-k-6">
          <Etikett als="p" id={titelId} kreuz ton="tinte">
            Kategorien
          </Etikett>
          <Kategorieknoepfe kategorien={kategorien} aktiv={aktiv} onWaehlen={setActiveCategory} titelId={titelId} />
        </div>
      ) : null}
    </div>
  );
}
