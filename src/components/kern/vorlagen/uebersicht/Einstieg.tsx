// Übersicht · Einstieg (P4-02, KERN v1.2, K-011 Erzählseite): Cluster-Hubs wie `/bad`, `/fliesen`, `/leistungen`,
// `/standorte` und die Hubs der Fachthemen. Ersetzt den zentrierten `ceramic-hero` mit Eyebrows, H1, Absatz,
// Knopfreihe und Zusagen-Zeile des Bestands.
// Struktur: H1 links bündig in der Textspalte (8/12), an deren rechter Kante die Achse als Lot an der Spaltengrenze
// steht (mobil: Lot am linken Rand). Rechts eine Randspalte (4/12) für ein Motiv (Verlegeplan, ruhend; P4-03) oder ein
// Register der Unterseiten. Etiketten in Mono, jedes in einem eigenen Element (Lehre 2). Kein Signaturmoment, kein
// Auftritt (die Seite wählt höchstens einen Scroll-Auftritt für spätere Abschnitte).
import type { ReactNode } from 'react';
import { Etikett, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import { ACHSE_SPALTE, Aktionen, Lot, type Aktion } from '@/components/kern/vorlagen/uebersicht/Abschnitt';

export type EinstiegProps = {
  /** Eyebrows/Badges des Bestands, Wortlaut unverändert (K-012 Klasse 3) */
  etiketten?: ReactNode[];
  titel: ReactNode;
  titelId?: string;
  /** Absatz unter der H1 */
  text?: ReactNode;
  aktionen?: Aktion[];
  /** Zusagen-Zeile (Bestand: Haken-Liste unter den Knöpfen) */
  zusagen?: ReactNode[];
  /** Randspalte rechts: Motiv (dekorativ) oder Register; leer = Textspalte allein */
  rand?: ReactNode;
  /** zugänglicher Name des Abschnitts, falls kein titelId */
  ariaLabel?: string;
  className?: string;
};

export default function Einstieg({ etiketten = [], titel, titelId, text, aktionen = [], zusagen = [], rand, ariaLabel, className }: EinstiegProps) {
  return (
    <section aria-labelledby={titelId} aria-label={titelId ? undefined : ariaLabel} className={verbinde('relative border-b border-k-fuge bg-k-kalk', className)}>
      <Lot />
      <div className="mx-auto grid max-w-(--k-seite) gap-k-7 px-(--k-rand) pt-k-8 pb-k-8 lg:grid-cols-12 lg:gap-0 lg:pt-k-9 lg:pb-k-9">
        <div className={verbinde('min-w-0 lg:col-span-8', ACHSE_SPALTE)}>
          {etiketten.length > 0 ? (
            <ul className="flex flex-wrap gap-k-2">
              {etiketten.map((etikett, i) => (
                <li key={i} className="min-w-0">
                  <Etikett rahmen kreuz={i === 0}>
                    {etikett}
                  </Etikett>
                </li>
              ))}
            </ul>
          ) : null}
          <h1 id={titelId} className="mt-k-5 k-anzeige text-k-7 text-k-tinte wrap-break-word hyphens-auto">
            {titel}
          </h1>
          {text ? <div className="mt-k-5 max-w-(--k-mass) k-text text-k-4 text-k-tinte">{text}</div> : null}
          <Aktionen aktionen={aktionen} className="mt-k-6" />
          {zusagen.length > 0 ? (
            <ul className="mt-k-5 flex flex-col gap-k-2 sm:flex-row sm:flex-wrap sm:gap-x-k-5">
              {zusagen.map((zusage, i) => (
                <li key={i} className="flex min-w-0 items-start gap-k-2 k-text text-k-2 font-semibold text-k-tinte">
                  <span className="flex h-lh shrink-0 items-center">
                    <Icon name="haken" groesse={20} />
                  </span>
                  <span className="min-w-0">{zusage}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {rand ? <div className="min-w-0 lg:col-span-4 lg:pl-k-7 lg:self-end">{rand}</div> : null}
      </div>
    </section>
  );
}
