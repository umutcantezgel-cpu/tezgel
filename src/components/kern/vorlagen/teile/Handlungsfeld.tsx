// Handlungsfeld (P4-10a, gemeinsam für alle Vorlagen; KERN v1.2 K-003, K-011): ein Feld mit Aussage links und Wegen rechts.
// Vorher dreifach gebaut: `fachseite/Abschluss` (P4-01, Schlussaufruf), `fachseite/Merkfeld` (P4-01, Zuschuss-Kasten) und
// `uebersicht/Projektband` (P4-02, Übergang zur Anfrage). Unterschiede sind Varianten:
// - anteil: 7/5 (Abschluss, Projektband) oder 8/4 (Merkfeld) Spalten ab lg; ohne Wege und Beleg Sp. 1–12.
// - groesse: gross (Titel höchstens k-6, Abschluss) oder mittel (höchstens k-5); Stufe nach dem längsten Wort (Ort `handlung`).
// - kante: fuge (Standard) oder tinte (Blattkante oben, Projektband).
// - rechts: keine Fläche (Grund scheint durch, Abschluss/Merkfeld) oder fliese (Projektband).
// - etikettForm: rahmen (Feldkopf, Abschluss/Merkfeld) oder kreuz (Eyebrow mit Fugenkreuz, Projektband).
// Links in Lesefolge: Etikett · Titel · Text · Punkte · Zitat · Hinweiszeile mit Zeichen. Rechts: Beleg in Mono (Wert und Zeile,
// z. B. Bewertung aus RATING_SUMMARY, K-003 „Maß statt Behauptung“), Knöpfe untereinander, Hauptknopf zuerst. Kein Rot.
// Raster: `basis/Feldraster` (Fugen links/oben am Raster, rechts/unten an den Feldern).
import type { ReactNode } from 'react';
import { Etikett, Feldraster, Rasterfeld, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import type { IconName } from '@/components/kern/icons/geometrie';
import Knopfreihe from '@/components/kern/vorlagen/teile/Knopfreihe';
import { Punkte } from '@/components/kern/vorlagen/teile/Punkte';
import { stufeNachWort } from '@/components/kern/vorlagen/teile/satz';
import { UMBRUCH, istText, type KnopfAngabe } from '@/components/kern/vorlagen/teile/typen';

export type HandlungsfeldProps = {
  etikett?: ReactNode;
  etikettForm?: 'rahmen' | 'kreuz';
  titel: ReactNode;
  titelId: string;
  ebene?: 'h2' | 'h3';
  groesse?: 'gross' | 'mittel';
  text?: ReactNode;
  /** Aufzählung im Feld (Bestand Reparatur: „Hilfreich sind: …“; Projektband: Zusagen) */
  punkte?: readonly ReactNode[];
  /** Punkte in einer oder (ab Behälter 36rem) zwei Spalten; Größe wie `Punkte` */
  punkteSpalten?: 1 | 2;
  punkteGroesse?: 'klein' | 'dicht';
  /** Zitat (z. B. Motto aus COMPANY_DATA), wörtlich */
  zitat?: ReactNode;
  /** Zeile mit Zeichen unter dem Text (Bestand Reparatur: Erreichbarkeit mit Uhr) */
  hinweis?: ReactNode;
  hinweisZeichen?: IconName;
  /** Beleg rechts über den Wegen: Wert in Mono und Zeile darunter */
  beleg?: { wert: ReactNode; text: ReactNode };
  knoepfe?: readonly KnopfAngabe[];
  knopfGroesse?: 'normal' | 'gross';
  anteil?: '7/5' | '8/4';
  kante?: 'fuge' | 'tinte';
  rechts?: 'keine' | 'fliese';
  /** Innenabstand: weit (24/48 px) · normal (24/32 px) */
  innen?: 'weit' | 'normal';
  className?: string;
};

// Wörtliche Klassen, damit Tailwind sie findet.
const LINKS = { '7/5': 7, '8/4': 8 } as const;
const RECHTS = { '7/5': 5, '8/4': 4 } as const;
const INNEN = { weit: 'p-k-5 lg:p-k-7', normal: 'p-k-5 lg:p-k-6' } as const;

export default function Handlungsfeld({
  etikett,
  etikettForm = 'rahmen',
  titel,
  titelId,
  ebene: Titel = 'h2',
  groesse = 'gross',
  text,
  punkte = [],
  punkteSpalten = 2,
  punkteGroesse = 'klein',
  zitat,
  hinweis,
  hinweisZeichen = 'uhr',
  beleg,
  knoepfe = [],
  knopfGroesse = 'normal',
  anteil = '7/5',
  kante = 'fuge',
  rechts = 'keine',
  innen = 'weit',
  className,
}: HandlungsfeldProps) {
  const seite = Boolean(beleg) || knoepfe.length > 0;
  return (
    <Feldraster className={verbinde(kante === 'tinte' && 'border-t-k-tinte', className)}>
      <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: seite ? LINKS[anteil] : 12 }} innen="keiner" flaeche="fliese" className={verbinde('flex flex-col', INNEN[innen])}>
        {etikett ? (
          etikettForm === 'kreuz' ? (
            <Etikett kreuz>{etikett}</Etikett>
          ) : (
            <Etikett rahmen ton="tinte" className="self-start">
              {etikett}
            </Etikett>
          )
        ) : null}
        <Titel
          id={titelId}
          className={verbinde('k-anzeige text-k-tinte', stufeNachWort(titel, 'handlung', groesse === 'gross' ? 'text-k-6' : 'text-k-5'), etikett ? 'mt-k-5' : undefined, UMBRUCH)}
        >
          {titel}
        </Titel>
        {text ? (
          <div className={verbinde('mt-k-5 flex max-w-(--k-mass) flex-col gap-k-3 k-text text-k-3 text-k-tinte-2', UMBRUCH)}>
            {istText(text) ? <p>{text}</p> : text}
          </div>
        ) : null}
        {punkte.length ? <Punkte punkte={punkte} spalten={punkteSpalten} groesse={punkteGroesse} className="mt-k-5" /> : null}
        {zitat ? <blockquote className="mt-k-5 max-w-(--k-mass) border-t border-k-fuge pt-k-4 k-text text-k-3 text-k-tinte">{zitat}</blockquote> : null}
        {hinweis ? (
          <p className="mt-k-5 flex items-start gap-k-2 k-text text-k-2 text-k-tinte-2">
            <span aria-hidden="true" className="flex h-lh shrink-0 items-center text-k-tinte">
              <Icon name={hinweisZeichen} groesse={16} />
            </span>
            <span className={UMBRUCH}>{hinweis}</span>
          </p>
        ) : null}
      </Rasterfeld>
      {seite ? (
        <Rasterfeld
          breite={{ mobil: 4, tablett: 8, desktop: RECHTS[anteil] }}
          innen="keiner"
          flaeche={rechts}
          className={verbinde('flex flex-col justify-center gap-k-5', INNEN[innen])}
        >
          {beleg ? (
            <div className="flex flex-col gap-k-1 border-b border-k-fuge pb-k-5">
              <p className="flex items-center gap-k-2 k-mono text-k-6 text-k-tinte">
                <span aria-hidden="true" className="flex shrink-0">
                  <Icon name="stern-voll" groesse={24} />
                </span>
                <span>{beleg.wert}</span>
              </p>
              <p className={verbinde('k-mono text-k-1 text-k-tinte-2', UMBRUCH)}>{beleg.text}</p>
            </div>
          ) : null}
          <Knopfreihe knoepfe={knoepfe} anordnung="spalte" groesse={knopfGroesse} />
        </Rasterfeld>
      ) : null}
    </Feldraster>
  );
}
