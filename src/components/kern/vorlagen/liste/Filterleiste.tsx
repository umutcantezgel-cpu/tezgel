// Filterleiste der Liste (P4-02, KERN v1.2, F-16 „Kategorien/Filter“): Suche und Kategorie-Knöpfe über der Liste.
// Nur Darstellung: Zustand (aktive Kategorie, Suchtext) und Rückrufe kommen von außen – die Logik steckt im Bestand in
// `(bestand)/blog/page.jsx` und `BlogSidebar.jsx` (useState) und braucht einen gemeinsamen Hook (OFFENE FRAGE, G9).
// Ohne Rückrufe (Server, ohne JavaScript) steht die Leiste im übergebenen Zustand, die Knöpfe tun nichts.
// Zugängliche Namen und Rollen wie im Bestand: Suchfeld `type="text"` (Rolle textbox) mit Namen aus `suche.beschriftung`
// (hier sichtbar über dem Feld, K-011), Kategorien als <button type="button" aria-pressed>, „Alle …“ zuerst.
// Der Bestand führt Suche und Kategorien doppelt (mobil oben, Desktop in der Seitenleiste); der Kern zeigt sie einmal,
// über der Liste, auf allen Breiten (Tab-Folge = Lesefolge, Lehre 7). Die entfallenden Doppel stehen als Vorschlag in
// der Rückgabe (MIKROTEXTE).
// Zustände der Knöpfe: Ruhe (Rahmen Strich), Hover (feiner Zeiger: Fläche Fliese, Rahmen Tinte), :active, Fokus 2 px,
// gedrückt (Tinte mit Kalk-Text und Fugenkreuz – nicht nur Farbe, K-006), deaktiviert entfällt (leere Kategorien
// blendet der Bestand aus).
import type { ChangeEvent, ReactNode } from 'react';
import { Feld, Fugenkreuz, fokus, verbinde } from '@/components/kern/basis';

export type Kategorie = { id: string; name: ReactNode };

export type FilterleisteProps = {
  suche?: {
    beschriftung: ReactNode;
    platzhalter?: string;
    wert: string;
    onAendern?: (wert: string) => void;
    id?: string;
  };
  /** Titel der Kategorie-Gruppe (Bestand: „Kategorien“) */
  gruppenTitel?: ReactNode;
  kategorien: Kategorie[];
  aktiv: string;
  onWaehlen?: (id: string) => void;
  className?: string;
};

const KNOPF = verbinde(
  'relative inline-flex min-h-k-7 items-center gap-k-2 rounded-k-0 border px-k-4 py-k-2 k-text text-k-2 font-semibold text-left',
  fokus(),
  'focus-visible:z-10',
);
const RUHE = 'cursor-pointer border-k-strich bg-transparent text-k-tinte pointer-fine:hover:border-k-tinte pointer-fine:hover:bg-k-fliese active:bg-k-fuge';
const GEDRUECKT = 'cursor-pointer border-k-tinte bg-k-tinte text-k-kalk';

export default function Filterleiste({ suche, gruppenTitel, kategorien, aktiv, onWaehlen, className }: FilterleisteProps) {
  const gruppeId = suche?.id ? `${suche.id}-gruppe` : 'k-filter-gruppe';
  const steuerung = suche?.onAendern
    ? { value: suche.wert, onChange: (e: ChangeEvent<HTMLInputElement>) => suche.onAendern?.(e.target.value) }
    : { defaultValue: suche?.wert };
  return (
    <div role="search" className={verbinde('grid gap-k-5 border-b border-k-fuge pb-k-5 lg:grid-cols-12 lg:items-end lg:gap-k-6', className)}>
      {suche ? (
        <div className="min-w-0 lg:col-span-4">
          <Feld id={suche.id} beschriftung={suche.beschriftung} placeholder={suche.platzhalter} autoComplete="off" {...steuerung} />
        </div>
      ) : null}
      {kategorien.length > 1 ? (
        <div className={verbinde('min-w-0', suche ? 'lg:col-span-8' : 'lg:col-span-12')}>
          {gruppenTitel ? (
            <p id={gruppeId} className="mb-k-2 k-mono text-k-1 text-k-tinte-2">
              {gruppenTitel}
            </p>
          ) : null}
          <ul role="list" aria-labelledby={gruppenTitel ? gruppeId : undefined} className="flex flex-wrap gap-k-2">
            {kategorien.map((k) => {
              const gedrueckt = k.id === aktiv;
              return (
                <li key={k.id}>
                  <button
                    type="button"
                    aria-pressed={gedrueckt}
                    onClick={onWaehlen ? () => onWaehlen(k.id) : undefined}
                    data-motion="zustand"
                    className={verbinde(KNOPF, gedrueckt ? GEDRUECKT : RUHE)}
                  >
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
        </div>
      ) : null}
    </div>
  );
}
