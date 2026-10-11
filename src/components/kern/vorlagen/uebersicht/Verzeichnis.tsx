// Übersicht · Verzeichnis der Unterseiten (P4-02, KERN v1.2): Querverweise eines Hubs auf seine Unterseiten.
// Ersetzt die Icon-Kachel-Raster des Bestands (`glass-surface` + `icon-chip`, S-04/S-11) durch zwei Formen ohne Karten:
//  - `zeilen`: Register, eine Zeile je Seite (Name, Beschreibung, Umfang in Mono, Pfeil), Fugen dazwischen –
//    für `/bad` (Bad-Leistungen), `/fliesen` (Alle Themen, Weitere Fachthemen), Fachthemen-Hubs;
//  - `felder`: Feldraster im Halbverband (K-007: Listen), ganzes Feld ist der Link – für `/standorte` (Städte mit
//    Region und Entfernung) und andere Verzeichnisse mit Kopfzeile je Eintrag.
// Jeder Eintrag ist genau ein Link (ein Tab-Halt); Kopfzeile, Name, Text und Fußzeile stehen in eigenen Elementen
// (Lehre 2). Zustände: Ruhe, Hover (feiner Zeiger: Fläche Fliese, Unterstreichung), :active, Fokus 2 px Tinte am Link.
import Link from 'next/link';
import type { ReactNode } from 'react';
import { fokus, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';

export type VerzeichnisEintrag = {
  href: string;
  titel: ReactNode;
  text?: ReactNode;
  /** Kopfzeile links (z. B. Region) */
  etikett?: ReactNode;
  /** Maß in Mono (z. B. „3 Seiten“, „ca. 12 km ab Wetzlar“) */
  zusatz?: ReactNode;
  /** Fußzeile mit Pfeil (z. B. „Fliesenleger in Wetzlar“) */
  fuss?: ReactNode;
  ariaLabel?: string;
};

export type VerzeichnisProps = {
  eintraege: VerzeichnisEintrag[];
  form?: 'zeilen' | 'felder';
  /** Name der Liste für Screenreader (id einer sichtbaren Überschrift) */
  labelledBy?: string;
  className?: string;
};

const UNTERSTRICH = 'decoration-1 underline-offset-4 decoration-k-tinte pointer-fine:group-hover:underline group-active:underline';

function Zeilen({ eintraege, labelledBy, className }: Omit<VerzeichnisProps, 'form'>) {
  return (
    <ul aria-labelledby={labelledBy} className={verbinde('border-t border-k-tinte', className)}>
      {eintraege.map((e) => (
        <li key={e.href} className="border-b border-k-fuge">
          <Link
            href={e.href}
            aria-label={e.ariaLabel}
            data-motion="zustand"
            className={verbinde('group flex min-h-k-7 items-center gap-k-4 px-k-3 py-k-3 pointer-fine:hover:bg-k-fliese active:bg-k-fliese', fokus())}
          >
            <span className="flex min-w-0 flex-1 flex-col gap-k-1 md:flex-row md:items-baseline md:gap-k-5">
              <span className={verbinde('min-w-0 k-text text-k-3 font-semibold text-k-tinte wrap-break-word hyphens-auto md:w-1/3 md:shrink-0', UNTERSTRICH)}>
                {e.titel}
              </span>
              {e.text ? <span className="min-w-0 k-text text-k-2 text-k-tinte-2">{e.text}</span> : null}
              {e.zusatz ? <span className="k-mono text-k-1 text-k-tinte-2 md:ml-auto md:shrink-0">{e.zusatz}</span> : null}
            </span>
            <span aria-hidden="true" className="flex shrink-0 text-k-strich">
              <Icon name="pfeil" groesse={20} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Felder({ eintraege, labelledBy, className }: Omit<VerzeichnisProps, 'form'>) {
  // Verband: Felder auf Fugengrund mit 1-px-Abstand, sodass jede Fuge genau einmal entsteht.
  return (
    <ul aria-labelledby={labelledBy} className={verbinde('grid gap-px border border-k-fuge bg-k-fuge md:grid-cols-2 lg:grid-cols-3', className)}>
      {eintraege.map((e) => (
        <li key={e.href} className="min-w-0 bg-k-kalk">
          <Link
            href={e.href}
            aria-label={e.ariaLabel}
            data-motion="zustand"
            className={verbinde(
              'group flex h-full min-h-k-7 flex-col gap-k-3 p-k-5 pointer-fine:hover:bg-k-fliese active:bg-k-fliese',
              fokus(),
              'focus-visible:relative focus-visible:z-10',
            )}
          >
            {e.etikett || e.zusatz ? (
              <span className="flex flex-wrap items-baseline justify-between gap-x-k-3 gap-y-k-1 border-b border-k-fuge pb-k-3">
                {e.etikett ? <span className="min-w-0 k-mono text-k-1 text-k-tinte">{e.etikett}</span> : null}
                {e.zusatz ? <span className="k-mono text-k-1 text-k-tinte-2">{e.zusatz}</span> : null}
              </span>
            ) : null}
            <span className={verbinde('k-anzeige text-k-5 text-k-tinte wrap-break-word hyphens-auto', UNTERSTRICH)}>{e.titel}</span>
            {e.text ? <span className="k-text text-k-2 text-k-tinte-2">{e.text}</span> : null}
            {e.fuss ? (
              <span className="mt-auto flex items-center justify-between gap-k-3 border-t border-k-fuge pt-k-3 k-text text-k-2 font-semibold text-k-tinte">
                <span className="min-w-0">{e.fuss}</span>
                <span aria-hidden="true" className="flex shrink-0">
                  <Icon name="pfeil" groesse={20} />
                </span>
              </span>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Verzeichnis({ form = 'zeilen', ...rest }: VerzeichnisProps) {
  return form === 'felder' ? <Felder {...rest} /> : <Zeilen {...rest} />;
}
