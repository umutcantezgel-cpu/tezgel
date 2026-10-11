// Faktenfeld (P4-01, KERN v1.2 K-003 „Maß statt Behauptung“, K-005 Mono für Belegbares, K-011 Dichte wechseln).
// Zwei Anordnungen:
// - raster: Feldraster aus Fugenfeldern (2/3/4 je Reihe ab lg, Tablett 2, mobil 1). Je Feld Wert in Mono groß, Titel, Text
//   (Bestand: Förderung „§ 40 SGB XI · Pflegekassen-Zuschuss · …“, Kennzahlen).
// - zeilen: dichte Kennliste in einem Feld – Schlüssel in Mono links, Text rechts, Zeilen durch Fugen getrennt
//   (Bestand: DIN 18534 „Teil 1 … Teil 6“). Optional Unterüberschrift (H3) und Fußnote.
// Werte zählen nicht hoch (K-003), keine Icons (S-11). Kein Bedienelement. Wortlaut vollständig von der Seite.
import type { ReactNode } from 'react';
import { Feldraster, Rasterfeld, verbinde, type Breite } from '@/components/kern/basis';
import Abschnitt, { type AbschnittProps } from '@/components/kern/vorlagen/fachseite/Abschnitt';
import { UMBRUCH, feldFlaeche, istText, type Ebene } from '@/components/kern/vorlagen/fachseite/typen';

export type Fakt = {
  /** Wert oder Schlüssel in Mono (z. B. „§ 40 SGB XI“, „Teil 1“) */
  wert: ReactNode;
  titel?: ReactNode;
  text?: ReactNode;
};

export type FaktenfeldProps = AbschnittProps & {
  eintraege: readonly Fakt[];
  anordnung?: 'raster' | 'zeilen';
  /** Felder je Reihe ab lg (raster) */
  spalten?: 2 | 3 | 4;
  /** Überschrift über der Liste (Bestand: „Die sechs Teile der Norm“, H3) */
  untertitel?: ReactNode;
  /** Satz unter der Liste */
  fussnote?: ReactNode;
  /** Ebene der Feldtitel bzw. des Untertitels */
  ebene?: Exclude<Ebene, 'h2'>;
};

const BREITE: Record<2 | 3 | 4, Breite> = {
  2: { mobil: 4, tablett: 4, desktop: 6 },
  3: { mobil: 4, tablett: 4, desktop: 4 },
  4: { mobil: 4, tablett: 4, desktop: 3 },
};

export function Faktenliste({
  eintraege,
  anordnung = 'raster',
  spalten = 4,
  untertitel,
  fussnote,
  ebene: Titel = 'h3',
  flaeche = 'fliese',
}: Pick<FaktenfeldProps, 'eintraege' | 'anordnung' | 'spalten' | 'untertitel' | 'fussnote' | 'ebene'> & { flaeche?: 'fliese' | 'kalk' }) {
  if (eintraege.length === 0) return null;
  const fuss = fussnote ? (
    <div className="mt-k-5 max-w-(--k-mass) k-text text-k-2 text-k-tinte-2">{istText(fussnote) ? <p>{fussnote}</p> : fussnote}</div>
  ) : null;

  if (anordnung === 'zeilen') {
    return (
      <div className={verbinde('border border-k-fuge p-k-5 lg:p-k-6', flaeche === 'fliese' ? 'bg-k-fliese' : 'bg-k-kalk')}>
        {untertitel ? <Titel className={verbinde('k-anzeige text-k-5 text-k-tinte', UMBRUCH)}>{untertitel}</Titel> : null}
        <ul className={verbinde('border-t border-k-strich', untertitel ? 'mt-k-5' : undefined)}>
          {eintraege.map((e, i) => (
            <li key={i} className="grid grid-cols-1 gap-k-1 border-b border-k-fuge py-k-3 md:grid-cols-12 md:gap-0">
              <div className={verbinde('k-mono text-k-2 text-k-tinte md:col-span-3 md:pr-k-4', UMBRUCH)}>{e.wert}</div>
              <div className="flex min-w-0 flex-col gap-k-1 md:col-span-9">
                {e.titel ? <div className={verbinde('k-text text-k-2 font-semibold text-k-tinte', UMBRUCH)}>{e.titel}</div> : null}
                {e.text ? <div className={verbinde('k-text text-k-2 text-k-tinte-2', UMBRUCH)}>{e.text}</div> : null}
              </div>
            </li>
          ))}
        </ul>
        {fuss}
      </div>
    );
  }

  return (
    <>
      {untertitel ? <Titel className={verbinde('mb-k-5 k-anzeige text-k-5 text-k-tinte', UMBRUCH)}>{untertitel}</Titel> : null}
      <Feldraster als="ul">
        {eintraege.map((e, i) => (
          <Rasterfeld key={i} als="li" breite={BREITE[spalten]} flaeche={flaeche} className="flex flex-col">
            <div className={verbinde('k-mono text-k-5 text-k-tinte', UMBRUCH)}>{e.wert}</div>
            {e.titel ? <Titel className={verbinde('mt-k-4 k-anzeige text-k-4 text-k-tinte', UMBRUCH)}>{e.titel}</Titel> : null}
            {e.text ? (
              <div className={verbinde('mt-k-3 k-text text-k-2 text-k-tinte-2', UMBRUCH)}>{istText(e.text) ? <p>{e.text}</p> : e.text}</div>
            ) : null}
          </Rasterfeld>
        ))}
      </Feldraster>
      {fuss}
    </>
  );
}

export default function Faktenfeld({ eintraege, anordnung, spalten, untertitel, fussnote, ebene, children, ...abschnitt }: FaktenfeldProps) {
  const flaeche = feldFlaeche(abschnitt.flaeche ?? 'kalk');
  return (
    <Abschnitt {...abschnitt}>
      <Faktenliste eintraege={eintraege} anordnung={anordnung} spalten={spalten} untertitel={untertitel} fussnote={fussnote} ebene={ebene} flaeche={flaeche} />
      {children ? <div className="mt-k-8">{children}</div> : null}
    </Abschnitt>
  );
}
