// Vorlagen · 4 So läuft es ab (KERN v3 K-003 Nr. 5, K-005, K-009; E-025, E-044): die Schritte an der roten Linie wie auf der
// Startseite. Ab lg als fallende Treppe über den Spalten, jeder Schritt um ein Drittel der langen Fliesenseite tiefer als
// der vorige (Stufe 16, der Versatz dieses Bildschirms), dazwischen eine rote Setzstufe; so liest sich die Folge 01, 02, 03
// (vorher stand nur jeder zweite tiefer und wirkte wie ein Versatzfehler, E2-SICHT-2 Befund 7). Mobil senkrecht genau auf
// dem Lot der Laserlinie. Je Schritt ein Fugenkreuz am Anfang der Linie und die Nummer in Mono, ohne Kästen. Darunter,
// abgesetzt durch eine Fuge, Belege aus dem Faktenblatt (ab lg in Spalten wie die Schritte, je mit Fugenkreuz). Ein großer
// Moment (z. B. der Weg einer Badsanierung) kann die Schritte ersetzen; darunter ein Hinweis mit Verweis. Wahlweise ein Satz
// unter der Überschrift (Einleitung). Fünf oder sechs Schritte stehen ab lg in zwei Spalten unter einem mittigen Kopf
// (K-016, E-047). Der Abschnitt zeichnet spät (unter dem ersten Bildschirm). Serverkomponente.
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Abschnitt from '@/components/kern/Abschnitt';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Textmarken from '@/components/kern/Textmarken';
import WeiterLink from '@/components/kern/WeiterLink';
import type { AblaufInhalt } from '../inhalt';

// Spalten ab lg je Schrittzahl und Stufen der Treppe (Klassen fest im Quelltext)
const SPALTEN: Record<number, string> = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' };
const STUFE = ['', 'lg:mt-16', 'lg:mt-32', 'lg:mt-48'];
/** Ab so vielen Schritten wäre die Treppe zu breit: zwei Spalten, die erste Hälfte links, die zweite rechts (K-016, E-047) */
export const ZWEI_SPALTEN_AB = 5;
const REIHEN: Record<number, string> = { 5: 'lg:grid-rows-3', 6: 'lg:grid-rows-3', 7: 'lg:grid-rows-4', 8: 'lg:grid-rows-4' };

/** Fünf oder sechs Schritte: ab lg zwei Spalten (1 bis 3 links, 4 bis 6 rechts), je an ihrer roten Linie senkrecht wie mobil;
 *  die Linie endet am letzten Schritt jeder Spalte. Mobil eine Linie durch alle Schritte. */
function SchritteZweiSpaltig({ schritte }: { schritte: AblaufInhalt['schritte'] }) {
  const haelfte = Math.ceil(schritte.length / 2);
  return (
    <ol className={clsx('-ml-2 grid md:-ml-4 lg:ml-0 lg:grid-flow-col lg:grid-cols-2 lg:gap-x-24', REIHEN[schritte.length] ?? 'lg:grid-rows-4')}>
      {schritte.map((s, i) => {
        const letzter = i === schritte.length - 1;
        return (
          <li key={s.titel} className={clsx('relative border-l-2 pb-12 pl-8', letzter ? 'border-l-transparent' : 'border-laser', i === haelfte - 1 && 'lg:border-l-transparent')}>
            <Fugenkreuz className="absolute top-1 left-0 size-3 -translate-x-1/2 text-tinte" />
            <p className="font-mono text-fs-4 text-tinte-2">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-2 font-anzeige text-fs-5 font-extrabold text-tinte">{s.titel}</h3>
            <p className="mt-4 max-w-mass font-text text-fs-3 text-tinte-2">
              <Textmarken text={s.text} />
            </p>
          </li>
        );
      })}
    </ol>
  );
}

export function Schritte({ schritte }: { schritte: AblaufInhalt['schritte'] }) {
  if (schritte.length >= ZWEI_SPALTEN_AB) return <SchritteZweiSpaltig schritte={schritte} />;
  return (
    <ol className={clsx('-ml-2 grid md:-ml-4 lg:ml-0', SPALTEN[schritte.length] ?? 'lg:grid-cols-3')}>
      {schritte.map((s, i) => {
        const letzter = i === schritte.length - 1;
        return (
          <li
            key={s.titel}
            className={clsx(
              'relative border-l-2 pb-12 pl-8 lg:border-t-2 lg:border-l-0 lg:pt-8 lg:pr-12 lg:pb-0 lg:pl-0',
              letzter ? 'border-l-transparent lg:border-t-laser' : 'border-laser',
              STUFE[i],
            )}
          >
            {/* Setzstufe ab lg: vom Ende der vorigen Linie senkrecht herab zum Anfang dieser */}
            {i > 0 && <span aria-hidden="true" className="absolute bottom-full left-0 hidden h-16 -translate-x-1/2 border-l-2 border-laser lg:block" />}
            <Fugenkreuz className="absolute top-1 left-0 size-3 -translate-x-1/2 text-tinte lg:top-0 lg:-translate-y-1/2" />
            <p className="font-mono text-fs-4 text-tinte-2">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-2 font-anzeige text-fs-5 font-extrabold text-tinte">{s.titel}</h3>
            <p className="mt-4 max-w-mass font-text text-fs-3 text-tinte-2">
              <Textmarken text={s.text} />
            </p>
          </li>
        );
      })}
    </ol>
  );
}

/** Belege unter den Schritten: ab lg in Spalten wie die Schritte, mobil untereinander, je mit Fugenkreuz, ohne Kästen */
function Belege({ belege }: { belege: string[] }) {
  return (
    <ul className={clsx('mt-4 grid gap-6 border-t border-fuge pt-8 lg:mt-24 lg:gap-12', SPALTEN[belege.length] ?? 'lg:grid-cols-3')}>
      {belege.map((b) => (
        <li key={b} className="flex gap-3">
          <Fugenkreuz className="mt-2 size-3 shrink-0 text-tinte" />
          <p className="font-text text-fs-3 text-tinte">
            <Textmarken text={b} />
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function Ablauf({ inhalt, moment }: { inhalt: AblaufInhalt; moment?: ReactNode }) {
  // zwei Spalten: Überschrift und Satz mittig darüber (Auftraggeber zu /bad/badsanierung, E-047)
  const zweiSpaltig = !moment && inhalt.schritte.length >= ZWEI_SPALTEN_AB;
  return (
    <Abschnitt
      id="ablauf"
      formel="ablauf"
      leitachse
      spaet
      flaeche="fliese"
      mitte={zweiSpaltig}
      titel={inhalt.titel}
      einleitung={inhalt.einleitung ? <p><Textmarken text={inhalt.einleitung} /></p> : undefined}
      className="lg:pb-32"
    >
      {moment ?? <Schritte schritte={inhalt.schritte} />}
      {inhalt.belege && inhalt.belege.length > 0 && <Belege belege={inhalt.belege} />}
      {inhalt.hinweis && (
        <div className="mt-12 max-w-mass border-l-2 border-tinte pl-6 lg:mt-24">
          <p className="font-text text-fs-3 text-tinte">
            <Textmarken text={inhalt.hinweis.text} />
          </p>
          {inhalt.hinweis.verweis && <WeiterLink href={inhalt.hinweis.verweis.href} className="mt-2">{inhalt.hinweis.verweis.name}</WeiterLink>}
        </div>
      )}
    </Abschnitt>
  );
}
