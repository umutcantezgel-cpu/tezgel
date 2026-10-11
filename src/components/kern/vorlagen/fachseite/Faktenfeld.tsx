// Faktenfeld (P4-01, KERN v1.2 K-003 „Maß statt Behauptung“, K-005 Mono für Belegbares, K-011 Dichte wechseln).
// Zwei Anordnungen:
// - raster: Fugenraster (`teile/Fugenraster`, Spalten nach Behälterbreite, höchstens `spalten` je Reihe). Je Feld Wert in Mono
//   groß, Titel, Text (Bestand: Förderung „§ 40 SGB XI · Pflegekassen-Zuschuss · …“, Kennzahlen). Der Wert steht in k-5, wenn
//   sein längstes Wort in die schmalste Zelle passt, sonst eine Stufe kleiner („Pflegegrad 1–5“, Ort `feld`, Lage Mono);
//   Titel nach demselben Maß in Archivo (P4-10a: vorher vier Felder je 232 px bei 1024 px, „Pflegegrad“ brach).
// - zeilen: dichte Kennliste in einem Feld – Schlüssel in Mono links (ab Behälter 36rem Sp. 1–3), Text rechts, Zeilen durch
//   Fugen getrennt (Bestand: DIN 18534 „Teil 1 … Teil 6“). Optional Unterüberschrift (H3) und Fußnote.
// Werte zählen nicht hoch (K-003), keine Icons (S-11). Kein Bedienelement. Wortlaut vollständig von der Seite.
import type { ReactNode } from 'react';
import { verbinde } from '@/components/kern/basis';
import Abschnitt, { type AbschnittProps } from '@/components/kern/vorlagen/teile/Abschnitt';
import { Fugenfeld, Fugenraster } from '@/components/kern/vorlagen/teile/Fugenraster';
import { stufeFuerAlle, stufeNachWort } from '@/components/kern/vorlagen/teile/satz';
import { UMBRUCH, feldFlaeche, istText, type Ebene } from '@/components/kern/vorlagen/teile/typen';

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
        {untertitel ? <Titel className={verbinde('k-anzeige text-k-tinte', stufeNachWort(untertitel, 'feld', 'text-k-5'), UMBRUCH)}>{untertitel}</Titel> : null}
        <ul className={verbinde('@container border-t border-k-strich', untertitel ? 'mt-k-5' : undefined)}>
          {eintraege.map((e, i) => (
            <li key={i} className="grid grid-cols-1 gap-k-1 border-b border-k-fuge py-k-3 @xl:grid-cols-12 @xl:gap-0">
              <div className={verbinde('k-mono text-k-2 text-k-tinte @xl:col-span-3 @xl:pr-k-4', UMBRUCH)}>{e.wert}</div>
              <div className="flex min-w-0 flex-col gap-k-1 @xl:col-span-9">
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

  const wertStufe = stufeFuerAlle(eintraege.map((e) => e.wert), 'feld', 'text-k-5', 'mono');
  const titelStufe = stufeFuerAlle(eintraege.map((e) => e.titel), 'feld', 'text-k-4');
  return (
    <>
      {untertitel ? <Titel className={verbinde('mb-k-5 k-anzeige text-k-tinte', stufeNachWort(untertitel, 'abschnitt', 'text-k-5'), UMBRUCH)}>{untertitel}</Titel> : null}
      <Fugenraster als="ul" spalten={spalten}>
        {eintraege.map((e, i) => (
          <Fugenfeld key={i} als="li" flaeche={flaeche} className="flex flex-col">
            <div className={verbinde('k-mono text-k-tinte', wertStufe, UMBRUCH)}>{e.wert}</div>
            {e.titel ? <Titel className={verbinde('mt-k-4 k-anzeige text-k-tinte', titelStufe, UMBRUCH)}>{e.titel}</Titel> : null}
            {e.text ? (
              <div className={verbinde('mt-k-3 k-text text-k-2 text-k-tinte-2', UMBRUCH)}>{istText(e.text) ? <p>{e.text}</p> : e.text}</div>
            ) : null}
          </Fugenfeld>
        ))}
      </Fugenraster>
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
