// Felder (P4-01, KERN v1.2 K-003 „Fuge statt Karte“, K-007, K-011): der häufigste Bestandsabschnitt der Fachseiten –
// Titel + Text je Eintrag (Lösungen, Schadensbilder, Stoffe, Details, Ursachen, Anforderungen …). Statt gleichförmiger
// Icon-Karten mit Schatten und Hover-Heben (S-04, S-11) zwei Anordnungen:
// - raster: Feldraster ohne Zwischenraum, Fugen 1 px, 1–4 Felder je Reihe ab lg (Tablett 2, mobil 1) – dicht.
// - zeilen: Zeilen über die volle Breite, Titel links (Sp. 1–5), Text rechts (Sp. 6–12), Fugen zwischen den Zeilen – ruhig.
// geordnet: <ol> mit Nummer in Mono (Wortlaut der Nummer von der Seite, `aria-hidden`, die Liste zählt).
// Einträge dürfen eigene Breiten tragen (Bestand Reparatur: großes Feld 3/5 neben zwei kleinen); `inhalt` darf Absätze,
// Listen (`Punkte`) und Verweise (`Textlink`) enthalten. Icons des Bestands entfallen (Icon-Kachel, S-11).
// Kein Bedienelement, kein Hover am Feld (nur die Links darin haben Zustände).
import type { ReactNode } from 'react';
import { Etikett, Feldraster, Rasterfeld, verbinde, type Breite } from '@/components/kern/basis';
import Abschnitt, { type AbschnittProps } from '@/components/kern/vorlagen/fachseite/Abschnitt';
import { UMBRUCH, feldFlaeche, istText, type Ebene } from '@/components/kern/vorlagen/fachseite/typen';

export type Feld = {
  titel: ReactNode;
  /** Text: Zeichenkette = ein Absatz; sonst Absätze/Listen, wie die Seite sie setzt */
  inhalt?: ReactNode;
  /** Etikett über dem Titel (Wortlaut aus dem Bestand) */
  etikett?: ReactNode;
  /** Nummer wörtlich („1“, „01“), nur bei `geordnet` */
  nummer?: string;
  /** eigene Breite (überschreibt `spalten`) */
  breite?: Breite;
  /** ID des Titels aus dem Bestand */
  titelId?: string;
};

export type FelderProps = AbschnittProps & {
  eintraege: readonly Feld[];
  anordnung?: 'raster' | 'zeilen';
  /** Felder je Reihe ab lg (raster) */
  spalten?: 1 | 2 | 3 | 4;
  geordnet?: boolean;
  /** Ebene der Feldtitel: h3 (Standard); h2, wenn der Bestand den Abschnitt ohne eigene Überschrift aus Feldern mit H2 baut */
  ebene?: Ebene;
};

const BREITE: Record<1 | 2 | 3 | 4, Breite> = {
  1: { mobil: 4, tablett: 8, desktop: 12 },
  2: { mobil: 4, tablett: 4, desktop: 6 },
  3: { mobil: 4, tablett: 4, desktop: 4 },
  4: { mobil: 4, tablett: 4, desktop: 3 },
};

function Inhalt({ inhalt, groesse }: { inhalt: ReactNode; groesse: 'text-k-2' | 'text-k-3' }) {
  return (
    <div className={verbinde('flex flex-col gap-k-3 k-text text-k-tinte-2', groesse, UMBRUCH)}>{istText(inhalt) ? <p>{inhalt}</p> : inhalt}</div>
  );
}

export function Feldliste({
  eintraege,
  anordnung = 'raster',
  spalten = 3,
  geordnet = false,
  ebene: Titel = 'h3',
  flaeche = 'fliese',
}: Pick<FelderProps, 'eintraege' | 'anordnung' | 'spalten' | 'geordnet' | 'ebene'> & { flaeche?: 'fliese' | 'kalk' }) {
  if (eintraege.length === 0) return null;
  const Liste = geordnet ? 'ol' : 'ul';

  if (anordnung === 'zeilen') {
    return (
      <Liste className="border-t border-k-strich">
        {eintraege.map((e, i) => (
          <li key={i} className="grid grid-cols-1 gap-k-3 border-b border-k-fuge py-k-6 lg:grid-cols-12 lg:gap-0 lg:py-k-7">
            <div className="min-w-0 lg:col-span-5 lg:pr-k-7">
              {geordnet && e.nummer ? (
                <span aria-hidden="true" className="mb-k-3 block k-mono text-k-4 text-k-tinte">
                  {e.nummer}
                </span>
              ) : null}
              {e.etikett ? <Etikett kreuz className="mb-k-3">{e.etikett}</Etikett> : null}
              <Titel id={e.titelId} className={verbinde('k-anzeige text-k-5 text-k-tinte', UMBRUCH)}>
                {e.titel}
              </Titel>
            </div>
            {e.inhalt ? (
              <div className="min-w-0 lg:col-span-7">
                <Inhalt inhalt={e.inhalt} groesse="text-k-3" />
              </div>
            ) : null}
          </li>
        ))}
      </Liste>
    );
  }

  const gross = spalten <= 2;
  return (
    <Feldraster als={Liste}>
      {eintraege.map((e, i) => (
        <Rasterfeld key={i} als="li" breite={e.breite ?? BREITE[spalten]} flaeche={flaeche} className="flex flex-col">
          {geordnet && e.nummer ? (
            <span aria-hidden="true" className="mb-k-4 block k-mono text-k-4 text-k-tinte">
              {e.nummer}
            </span>
          ) : null}
          {e.etikett ? <Etikett kreuz className="mb-k-3">{e.etikett}</Etikett> : null}
          <Titel id={e.titelId} className={verbinde('k-anzeige text-k-tinte', gross ? 'text-k-5' : 'text-k-4', UMBRUCH)}>
            {e.titel}
          </Titel>
          {e.inhalt ? (
            <div className="mt-k-4">
              <Inhalt inhalt={e.inhalt} groesse={gross ? 'text-k-3' : 'text-k-2'} />
            </div>
          ) : null}
        </Rasterfeld>
      ))}
    </Feldraster>
  );
}

export default function Felder({ eintraege, anordnung, spalten, geordnet, ebene, children, ...abschnitt }: FelderProps) {
  const flaeche = feldFlaeche(abschnitt.flaeche ?? 'kalk');
  return (
    <Abschnitt {...abschnitt}>
      <Feldliste eintraege={eintraege} anordnung={anordnung} spalten={spalten} geordnet={geordnet} ebene={ebene} flaeche={flaeche} />
      {children ? <div className="mt-k-8">{children}</div> : null}
    </Abschnitt>
  );
}
