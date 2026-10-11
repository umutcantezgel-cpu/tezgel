// Verweise (P4-10a, gemeinsam für alle Vorlagen; KERN v1.2 K-002 Aufgaben 1/5, K-003, K-011): Listen von Wegen zu anderen
// Seiten. Vorher dreifach: `fachseite/Querverweise` (P4-01, Verweisfelder), `uebersicht/Verzeichnis` (P4-02, Register und
// Verweisfelder mit Kopf- und Fußzeile) und `uebersicht/Weiterlesen` (P4-02, Pfeillinks in zwei Spalten). Drei Formen:
// - felder: Fugenraster aus Verweisfeldern (Spalten nach Behälterbreite); das ganze Feld ist der Link (≥ 64 px), Titel
//   unterstrichen, Pfeil, optional Kopfzeile (Etikett, Zusatz in Mono), Beschreibung, Fußzeile.
// - zeilen: Register, eine Zeile je Seite (Name, Beschreibung, Umfang in Mono, Pfeil), Fugen dazwischen.
// - liste: Pfeillinks, ab Behälterbreite 36rem in zwei Spalten.
// Jeder Eintrag ist genau ein Link (ein Tab-Halt). Zustände: Ruhe · Hover (feiner Zeiger: Gegenfläche, Unterstreichung 2 px
// Tinte) · aktiv/Touch (Fläche Fuge) · Fokus 2 px Tinte mit Abstand, über den Nachbarfeldern (`relative z-10`, Lehre 4) ·
// Leerzustand: keine Ausgabe.
// `Verweisblock`: Überschrift + Liste + Nachsatz + Knöpfe; Überschrift oben (felder, zeilen) oder links (liste: ab lg Sp. 1–4,
// Liste Sp. 5–12, Blattkante in Tinte). `Querverweise`: der Block als eigener Abschnitt (nav oder section) oder eingebettet.
import Link from 'next/link';
import { useId, type ReactNode } from 'react';
import { fokus, verbinde } from '@/components/kern/basis';
import { istIntern } from '@/components/kern/basis/klassen';
import Icon from '@/components/kern/icons/Icon';
import Abschnitt, { Abschnittskopf, Nachsatz, type AbschnittRahmenProps } from '@/components/kern/vorlagen/teile/Abschnitt';
import { Fugenfeld, Fugenraster, type Spalten } from '@/components/kern/vorlagen/teile/Fugenraster';
import Knopfreihe from '@/components/kern/vorlagen/teile/Knopfreihe';
import { Pfeillink } from '@/components/kern/vorlagen/teile/Pfeillink';
import { stufeFuerAlle, stufeNachWort, type Stufe } from '@/components/kern/vorlagen/teile/satz';
import { UMBRUCH, feldFlaeche, type Flaeche, type KnopfAngabe, type Verweis } from '@/components/kern/vorlagen/teile/typen';

export type VerweisForm = 'felder' | 'zeilen' | 'liste';

export type VerweislisteProps = {
  verweise: readonly Verweis[];
  form?: VerweisForm;
  /** Felder je Reihe höchstens (felder) */
  spalten?: Spalten;
  /** Titel der Felder: text (Text 600, k-3) · anzeige (Archivo-Anzeige, Stufe nach dem längsten Wort) */
  titelForm?: 'text' | 'anzeige';
  /** Fläche der Felder (felder); Hover zeigt die Gegenfläche */
  flaeche?: Flaeche;
  /** Name der Liste für Screenreader (id einer sichtbaren Überschrift) */
  labelledBy?: string;
  className?: string;
};

const UNTERSTRICH = 'underline decoration-1 underline-offset-4 decoration-k-strich pointer-fine:group-hover:decoration-2 pointer-fine:group-hover:decoration-k-tinte group-active:decoration-2 group-active:decoration-k-tinte';

function Ziel({ href, ariaLabel, className, children }: { href: string; ariaLabel?: string; className: string; children: ReactNode }) {
  return istIntern(href) ? (
    <Link href={href} aria-label={ariaLabel} data-motion="zustand" className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} aria-label={ariaLabel} data-motion="zustand" className={className}>
      {children}
    </a>
  );
}

function Pfeil() {
  return (
    <span aria-hidden="true" className="flex h-lh shrink-0 items-center">
      <Icon name="pfeil" groesse={20} />
    </span>
  );
}

function Verweisfeld({ v, flaeche, stufe }: { v: Verweis; flaeche: Flaeche; stufe?: Stufe }) {
  const klasse = verbinde(
    'group flex h-full min-h-k-8 flex-col gap-k-3 p-k-4 text-k-tinte lg:p-k-5',
    flaeche === 'fliese' ? 'pointer-fine:hover:bg-k-kalk' : 'pointer-fine:hover:bg-k-fliese',
    'active:bg-k-fuge focus-visible:relative focus-visible:z-10',
    fokus(),
  );
  const titel = stufe ? verbinde('k-anzeige', stufe) : 'k-text text-k-3 font-semibold';
  return (
    <Fugenfeld als="li" innen="keiner" flaeche={flaeche}>
      <Ziel href={v.href} ariaLabel={v.ariaLabel} className={klasse}>
        {v.etikett || v.zusatz ? (
          <span className="flex flex-wrap items-baseline justify-between gap-x-k-3 gap-y-k-1 border-b border-k-fuge pb-k-3">
            {v.etikett ? <span className="min-w-0 k-mono text-k-1 text-k-tinte">{v.etikett}</span> : null}
            {v.zusatz ? <span className="k-mono text-k-1 text-k-tinte-2">{v.zusatz}</span> : null}
          </span>
        ) : null}
        <span className={verbinde('flex items-start justify-between gap-k-3', titel)}>
          <span className={verbinde(UNTERSTRICH, UMBRUCH)}>{v.titel}</span>
          {v.fuss ? null : <Pfeil />}
        </span>
        {v.beschreibung ? <span className={verbinde('block k-text text-k-2 text-k-tinte-2', UMBRUCH)}>{v.beschreibung}</span> : null}
        {v.fuss ? (
          <span className="mt-auto flex items-center justify-between gap-k-3 border-t border-k-fuge pt-k-3 k-text text-k-2 font-semibold text-k-tinte">
            <span className={UMBRUCH}>{v.fuss}</span>
            <Pfeil />
          </span>
        ) : null}
      </Ziel>
    </Fugenfeld>
  );
}

/** Die Liste allein (ohne Überschrift). Alter Name P4-02: `Verzeichnis`. */
export function Verweisliste({ verweise, form = 'felder', spalten = 4, titelForm = 'text', flaeche = 'fliese', labelledBy, className }: VerweislisteProps) {
  if (verweise.length === 0) return null;
  if (form === 'felder') {
    const stufe = titelForm === 'anzeige' ? stufeFuerAlle(verweise.map((v) => v.titel), 'feld', 'text-k-5') : undefined;
    return (
      <Fugenraster als="ul" spalten={spalten} aria-labelledby={labelledBy} className={className}>
        {verweise.map((v, i) => (
          <Verweisfeld key={`${v.href}-${i}`} v={v} flaeche={flaeche} stufe={stufe} />
        ))}
      </Fugenraster>
    );
  }
  if (form === 'zeilen') {
    return (
      <ul aria-labelledby={labelledBy} className={verbinde('border-t border-k-tinte', className)}>
        {verweise.map((v, i) => (
          <li key={`${v.href}-${i}`} className="border-b border-k-fuge">
            <Ziel
              href={v.href}
              ariaLabel={v.ariaLabel}
              className={verbinde('group flex min-h-k-7 items-center gap-k-4 px-k-3 py-k-3 pointer-fine:hover:bg-k-fliese active:bg-k-fliese', fokus())}
            >
              <span className="flex min-w-0 flex-1 flex-col gap-k-1 md:flex-row md:items-baseline md:gap-k-5">
                <span className={verbinde('k-text text-k-3 font-semibold text-k-tinte md:w-1/3 md:shrink-0', UNTERSTRICH, UMBRUCH)}>{v.titel}</span>
                {v.beschreibung ? <span className={verbinde('k-text text-k-2 text-k-tinte-2', UMBRUCH)}>{v.beschreibung}</span> : null}
                {v.zusatz ? <span className="k-mono text-k-1 text-k-tinte-2 md:ml-auto md:shrink-0">{v.zusatz}</span> : null}
              </span>
              <span aria-hidden="true" className="flex shrink-0 text-k-strich">
                <Icon name="pfeil" groesse={20} />
              </span>
            </Ziel>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className={verbinde('@container', className)}>
      <ul aria-labelledby={labelledBy} className="grid grid-cols-1 @xl:grid-cols-2 @xl:gap-x-k-5">
        {verweise.map((v, i) => (
          <li key={`${v.href}-${i}`} className="min-w-0 border-b border-k-fuge">
            <Pfeillink href={v.href} ariaLabel={v.ariaLabel}>
              {v.titel}
            </Pfeillink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export type VerweisblockProps = Omit<VerweislisteProps, 'labelledBy' | 'className'> & {
  titel?: ReactNode;
  titelId?: string;
  etikett?: ReactNode;
  /** Satz nach der Liste (Bestand: Satz mit weiteren Verweisen) */
  nachsatz?: ReactNode;
  aktionen?: readonly KnopfAngabe[];
  /** Element des Blocks: div (in einem benannten Abschnitt) oder eigene Landmarke */
  als?: 'div' | 'nav' | 'section';
  className?: string;
};

/** Überschrift, Liste, Nachsatz und Knöpfe. Alter Name P4-02: `Weiterlesen` (Form liste). */
export function Verweisblock({ titel, titelId, etikett, verweise, form = 'felder', nachsatz, aktionen = [], als: Element = 'div', className, ...liste }: VerweisblockProps) {
  const eigeneId = `k-verweise${useId()}`;
  const tid = titelId ?? eigeneId;
  if (verweise.length === 0) return null;
  const benannt = Element !== 'div' && titel ? { 'aria-labelledby': tid } : {};
  const unten = (
    <>
      {nachsatz ? <Nachsatz className="mt-k-5">{nachsatz}</Nachsatz> : null}
      <Knopfreihe knoepfe={aktionen} className="mt-k-6" />
    </>
  );
  if (form === 'liste') {
    return (
      <Element {...benannt} className={verbinde('grid gap-k-5 border-t border-k-tinte pt-k-5 lg:grid-cols-12 lg:gap-0', className)}>
        {titel ? (
          <h2 id={tid} className={verbinde('min-w-0 k-anzeige text-k-tinte lg:col-span-4 lg:pr-k-6', stufeNachWort(titel, 'rand', 'text-k-4'), UMBRUCH)}>
            {titel}
          </h2>
        ) : null}
        <div className={verbinde('min-w-0', titel ? 'lg:col-span-8' : 'lg:col-span-12')}>
          <Verweisliste {...liste} verweise={verweise} form="liste" labelledBy={titel ? tid : undefined} />
          {unten}
        </div>
      </Element>
    );
  }
  return (
    <Element {...benannt} className={className}>
      {titel || etikett ? (
        <header className="max-w-(--k-mass)">
          <Abschnittskopf etikett={etikett} titel={titel} titelId={tid} kopfGroesse="mittel" />
        </header>
      ) : null}
      <Verweisliste {...liste} verweise={verweise} form={form} labelledBy={titel ? tid : undefined} className={titel || etikett ? 'mt-k-6' : undefined} />
      {unten}
    </Element>
  );
}

export type QuerverweiseProps = Omit<AbschnittRahmenProps, 'als' | 'auftritt'> &
  Omit<VerweisblockProps, 'als' | 'flaeche' | 'className'> & {
    /** Landmarke wie im Bestand: nav (Standard) oder section */
    landmarke?: 'nav' | 'section';
    /** ohne eigenen Abschnittsrahmen, als Block in einem anderen Abschnitt (Bestand Balkonsanierung: im Abschluss) */
    eingebettet?: boolean;
  };

/** „Weiterführende Ratgeber …“ des Bestands als eigener Abschnitt (benannt über die Überschrift im Block). */
export default function Querverweise({
  titel,
  titelId,
  etikett,
  verweise,
  form,
  spalten,
  titelForm,
  nachsatz,
  aktionen,
  landmarke = 'nav',
  eingebettet = false,
  flaeche = 'kalk',
  dichte = 'eng',
  ...rahmen
}: QuerverweiseProps) {
  const eigeneId = `k-querverweise${useId()}`;
  const tid = titelId ?? eigeneId;
  if (verweise.length === 0) return null;
  const block = (als: 'div' | 'nav' | 'section') => (
    <Verweisblock
      als={als}
      titel={titel}
      titelId={tid}
      etikett={etikett}
      verweise={verweise}
      form={form}
      spalten={spalten}
      titelForm={titelForm}
      nachsatz={nachsatz}
      aktionen={aktionen}
      flaeche={eingebettet ? 'fliese' : feldFlaeche(flaeche)}
    />
  );
  if (eingebettet) return block(landmarke);
  return (
    <Abschnitt als={landmarke} titelId={titel ? tid : undefined} ariaLabel={titel ? undefined : rahmen.ariaLabel} flaeche={flaeche} dichte={dichte} {...rahmen}>
      {block('div')}
    </Abschnitt>
  );
}
