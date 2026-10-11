// Felder (P4-02, KERN v1.2, K-003 „Fuge statt Karte“): wiederkehrende Inhaltsfelder der Hubs und Listen –
// `/bad` Qualitäts-Kategorien, `/fliesen` „Wissen kompakt“, `/leistungen` die vier Fachgewerke, `/bad/musterbaeder`
// die Musterbäder, `/referenzen` die Leistungsbeispiele. Ersetzt `glass-surface`/`glass-bezel`-Karten mit Schatten,
// Hover-Hub und Pillen durch ein Feldraster ohne Zwischenraum (Fugen 1 px), 2 oder 3 Spalten ab Tablett/Desktop.
// Je Feld in Lesefolge: Motiv (optional, dekorativ) · Kopfzeile mit Etiketten in Mono · Status (z. B. „Projekt-
// dokumentation in Vorbereitung“, mit Hinweis-Zeichen und Text) · Titel (Ebene wie im Bestand, optional als Link) ·
// Text · Marken (Unterkategorien als Mono-Etiketten mit Rahmen) · Liste mit eigenem Kopf · Fuß mit Verweisen und Knöpfen.
// Kein Feld ist selbst ein Link (die Felder tragen mehrere Wege); Zustände sitzen an Links und Knöpfen.
import type { ReactNode } from 'react';
import Link from 'next/link';
import { Etikett, fokus, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import { Aktionen, Merkmale, Pfeillink, type Aktion, type Verweis } from '@/components/kern/vorlagen/uebersicht/Abschnitt';

export type Feld = {
  /** Sprungziel (z. B. `/leistungen#bad`) */
  id?: string;
  motiv?: ReactNode;
  etiketten?: ReactNode[];
  status?: ReactNode;
  titel: ReactNode;
  /** Titel als Link (Bestand: `h3 > a`) */
  titelHref?: string;
  text?: ReactNode;
  marken?: ReactNode[];
  liste?: { titel?: ReactNode; punkte: ReactNode[] };
  verweise?: Verweis[];
  aktionen?: Aktion[];
};

export type FelderProps = {
  felder: Feld[];
  /** Ebene der Feldtitel wie im Bestand */
  titelEbene?: 'h2' | 'h3' | 'p';
  spalten?: 2 | 3;
  labelledBy?: string;
  ariaLabel?: string;
  /** Fläche der Felder: fliese (Standard) · kalk (auf Fliese-Abschnitt) */
  flaeche?: 'fliese' | 'kalk';
  className?: string;
};

const SPALTEN = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-2 lg:grid-cols-3' } as const;

const TITEL_LINK = verbinde(
  'rounded-k-1 underline decoration-1 underline-offset-4 decoration-k-strich pointer-fine:hover:decoration-2 pointer-fine:hover:decoration-k-tinte active:decoration-2 active:decoration-k-tinte',
  fokus(),
);

export default function Felder({ felder, titelEbene: Titel = 'h3', spalten = 2, labelledBy, ariaLabel, flaeche = 'fliese', className }: FelderProps) {
  return (
    <ul
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : ariaLabel}
      className={verbinde('grid gap-px border border-k-fuge bg-k-fuge', SPALTEN[spalten], className)}
    >
      {felder.map((feld, i) => (
        <li key={feld.id ?? i} className={verbinde('min-w-0', flaeche === 'kalk' ? 'bg-k-kalk' : 'bg-k-fliese')}>
          <article id={feld.id} className="flex h-full flex-col">
            {feld.motiv ? <div className="border-b border-k-fuge">{feld.motiv}</div> : null}
            <div className="flex flex-1 flex-col gap-k-4 p-k-5 lg:p-k-6">
              {feld.etiketten && feld.etiketten.length > 0 ? (
                <ul className="flex flex-wrap gap-k-2">
                  {feld.etiketten.map((e, j) => (
                    <li key={j} className="min-w-0">
                      <Etikett rahmen ton={j === 0 ? 'tinte' : 'neben'}>
                        {e}
                      </Etikett>
                    </li>
                  ))}
                </ul>
              ) : null}
              {feld.status ? (
                <p className="flex items-start gap-k-2 k-mono text-k-1 text-k-tinte">
                  <span className="flex h-lh shrink-0 items-center">
                    <Icon name="hinweis" groesse={16} />
                  </span>
                  <span className="min-w-0">{feld.status}</span>
                </p>
              ) : null}
              <Titel className="k-anzeige text-k-5 text-k-tinte wrap-break-word hyphens-auto">
                {feld.titelHref ? (
                  <Link href={feld.titelHref} data-motion="zustand" className={TITEL_LINK}>
                    {feld.titel}
                  </Link>
                ) : (
                  feld.titel
                )}
              </Titel>
              {feld.text ? <div className="max-w-(--k-mass) k-text text-k-2 text-k-tinte-2">{feld.text}</div> : null}
              {feld.marken && feld.marken.length > 0 ? (
                <ul className="flex flex-wrap gap-k-2">
                  {feld.marken.map((m, j) => (
                    <li key={j} className="min-w-0">
                      <Etikett rahmen>{m}</Etikett>
                    </li>
                  ))}
                </ul>
              ) : null}
              {feld.liste ? (
                <div className="flex flex-col gap-k-2">
                  {feld.liste.titel ? <p className="k-mono text-k-1 text-k-tinte-2">{feld.liste.titel}</p> : null}
                  <Merkmale punkte={feld.liste.punkte} dicht />
                </div>
              ) : null}
              {(feld.verweise && feld.verweise.length > 0) || (feld.aktionen && feld.aktionen.length > 0) ? (
                <div className="mt-auto flex flex-col gap-k-2 border-t border-k-fuge pt-k-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  {feld.verweise && feld.verweise.length > 0 ? (
                    <ul className="flex min-w-0 flex-col">
                      {feld.verweise.map((v) => (
                        <li key={v.href} className="min-w-0">
                          <Pfeillink href={v.href} ariaLabel={v.ariaLabel}>
                            {v.label}
                          </Pfeillink>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {feld.aktionen ? <Aktionen aktionen={feld.aktionen} /> : null}
                </div>
              ) : null}
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
