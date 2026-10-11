// Felder (P4-10a, gemeinsam für alle Vorlagen; KERN v1.2 K-003 „Fuge statt Karte“, K-007, K-011).
// Vorher doppelt: `fachseite/Felder` (P4-01: Lösungen, Schadensbilder, Stoffe, Details – Titel + Text, als Raster oder Zeilen)
// und `uebersicht/Felder` (P4-02: Qualitäts-Kategorien, Wissen kompakt, Fachgewerke, Musterbäder, Leistungsbeispiele – mit
// Motiv, Etiketten, Status, Titel als Link, Marken, Liste und Wegen). Eine Feldliste für beide; jedes Feld zeigt nur, was es
// trägt, in fester Lesefolge: Motiv · Nummer · Etikett bzw. Etiketten · Status · Titel · Inhalt · Marken · Liste · Fuß (Verweise,
// Knöpfe). Icon-Kacheln entfallen (S-11). Kein Feld ist selbst ein Link (Felder tragen mehrere Wege); Zustände sitzen an Links
// und Knöpfen. Trägt ein Feld ein Motiv (Verlegeplan), nimmt es Hover und Fokus für SIG-3 auf (`SIG_PLAN_AUSLOESER`): Auf
// `/leistungen` steht dort `<Plan />`, auf Fachseiten `<Plan ruhend />` (dann ohne Wirkung).
// anordnung raster: Fugenraster mit Spalten nach Behälterbreite (siehe `Fugenraster`); zeilen: eine Zeile je Feld, ab Behälter
// 48rem Titel Sp. 1–5 und Text Sp. 6–12. Titelstufe nach dem längsten Wort aller Titel der Liste (Ort `feld` bzw. `zeile`):
// kein Wortbruch, und die Titel einer Liste stehen in derselben Größe.
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Etikett, fokus, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import { SIG_PLAN_AUSLOESER } from '@/components/kern/motive/plaene/Planblatt';
import Abschnitt, { type AbschnittProps } from '@/components/kern/vorlagen/teile/Abschnitt';
import { Fugenfeld, Fugenraster, type Spalten } from '@/components/kern/vorlagen/teile/Fugenraster';
import Knopfreihe from '@/components/kern/vorlagen/teile/Knopfreihe';
import { Pfeillink } from '@/components/kern/vorlagen/teile/Pfeillink';
import { Punkte } from '@/components/kern/vorlagen/teile/Punkte';
import { stufeFuerAlle } from '@/components/kern/vorlagen/teile/satz';
import { UMBRUCH, feldFlaeche, istText, type Ebene, type Flaeche, type KnopfAngabe, type Verweis } from '@/components/kern/vorlagen/teile/typen';

export type Feld = {
  titel: ReactNode;
  /** ID des Titels aus dem Bestand */
  titelId?: string;
  /** Sprungziel des Felds (z. B. `/leistungen#bad`); das Feld wird dann ein <article> */
  id?: string;
  /** Titel als Link (Bestand: `h3 > a`) */
  titelHref?: string;
  /** Inhalt: Zeichenkette = ein Absatz; sonst Absätze, Listen (`Punkte`) und Verweise (`Textlink`) */
  inhalt?: ReactNode;
  /** Nummer wörtlich („1“, „01“), nur bei `geordnet` */
  nummer?: string;
  /** Eyebrow über dem Titel (Etikett mit Fugenkreuz) */
  etikett?: ReactNode;
  /** Badges über dem Titel (gerahmte Etiketten, das erste in Tinte) */
  etiketten?: readonly ReactNode[];
  /** Statuszeile mit Hinweis-Zeichen (z. B. „Projektdokumentation in Vorbereitung“) */
  status?: ReactNode;
  /** Motiv über dem Feld (Verlegeplan, Musterfeld); dekorativ */
  motiv?: ReactNode;
  /** Unterkategorien als gerahmte Mono-Etiketten */
  marken?: readonly ReactNode[];
  /** Haken-Liste mit eigenem Kopf */
  liste?: { titel?: ReactNode; punkte: readonly ReactNode[] };
  /** Wege im Fuß des Felds (Pfeillinks) */
  verweise?: readonly Verweis[];
  /** Knöpfe im Fuß des Felds */
  aktionen?: readonly KnopfAngabe[];
  /** 2 = über zwei Spalten, sobald es zwei gibt (Bestand Reparatur: großes Feld neben zwei kleinen) */
  spanne?: 1 | 2;
};

export type FeldlisteProps = {
  eintraege: readonly Feld[];
  anordnung?: 'raster' | 'zeilen';
  /** Felder je Reihe höchstens (raster) */
  spalten?: Spalten;
  geordnet?: boolean;
  /** Ebene der Feldtitel: h3 (Standard); h2, wenn der Bestand den Abschnitt aus Feldern mit H2 baut; p wie im Bestand */
  ebene?: Ebene | 'p';
  /** Titel: gross (höchstens k-5) · klein (höchstens k-4); Standard nach Spalten (bis 2 gross) */
  titelGroesse?: 'gross' | 'klein';
  /** Inhalt: normal (k-3) · klein (k-2); Standard nach Spalten (bis 2 normal) */
  textGroesse?: 'normal' | 'klein';
  /** Fläche der Felder (Gegenfläche des Abschnitts) */
  flaeche?: Flaeche;
  labelledBy?: string;
  ariaLabel?: string;
  className?: string;
};

const TITEL_LINK = verbinde(
  'rounded-k-1 underline decoration-1 underline-offset-4 decoration-k-strich pointer-fine:hover:decoration-2 pointer-fine:hover:decoration-k-tinte active:decoration-2 active:decoration-k-tinte',
  fokus(),
);

function Inhalt({ inhalt, klein }: { inhalt: ReactNode; klein: boolean }) {
  return (
    <div className={verbinde('flex max-w-(--k-mass) flex-col gap-k-3 k-text text-k-tinte-2', klein ? 'text-k-2' : 'text-k-3', UMBRUCH)}>
      {istText(inhalt) ? <p>{inhalt}</p> : inhalt}
    </div>
  );
}

function Kopfteile({ e, geordnet }: { e: Feld; geordnet: boolean }) {
  return (
    <>
      {geordnet && e.nummer ? (
        <span aria-hidden="true" className="block k-mono text-k-4 text-k-tinte">
          {e.nummer}
        </span>
      ) : null}
      {e.etikett ? <Etikett kreuz>{e.etikett}</Etikett> : null}
      {e.etiketten && e.etiketten.length > 0 ? (
        <ul className="flex flex-wrap gap-k-2">
          {e.etiketten.map((x, j) => (
            <li key={j} className="min-w-0">
              <Etikett rahmen ton={j === 0 ? 'tinte' : 'neben'}>
                {x}
              </Etikett>
            </li>
          ))}
        </ul>
      ) : null}
      {e.status ? (
        <p className="flex items-start gap-k-2 k-mono text-k-1 text-k-tinte">
          <span aria-hidden="true" className="flex h-lh shrink-0 items-center">
            <Icon name="hinweis" groesse={16} />
          </span>
          <span className={UMBRUCH}>{e.status}</span>
        </p>
      ) : null}
    </>
  );
}

function Titel({ e, Ebene, klasse }: { e: Feld; Ebene: Ebene | 'p'; klasse: string }) {
  return (
    <Ebene id={e.titelId} className={verbinde('k-anzeige text-k-tinte', klasse, UMBRUCH)}>
      {e.titelHref ? (
        <Link href={e.titelHref} data-motion="zustand" className={TITEL_LINK}>
          {e.titel}
        </Link>
      ) : (
        e.titel
      )}
    </Ebene>
  );
}

function Fussteile({ e, klein }: { e: Feld; klein: boolean }) {
  const verweise = e.verweise ?? [];
  const aktionen = e.aktionen ?? [];
  return (
    <>
      {e.marken && e.marken.length > 0 ? (
        <ul className="flex flex-wrap gap-k-2">
          {e.marken.map((m, j) => (
            <li key={j} className="min-w-0">
              <Etikett rahmen>{m}</Etikett>
            </li>
          ))}
        </ul>
      ) : null}
      {e.liste ? (
        <div className="flex flex-col gap-k-2">
          {e.liste.titel ? <p className="k-mono text-k-1 text-k-tinte-2">{e.liste.titel}</p> : null}
          <Punkte punkte={e.liste.punkte} groesse={klein ? 'dicht' : 'klein'} />
        </div>
      ) : null}
      {verweise.length > 0 || aktionen.length > 0 ? (
        <div className="mt-auto flex flex-wrap items-center justify-between gap-k-2 border-t border-k-fuge pt-k-3">
          {verweise.length > 0 ? (
            <ul className="flex min-w-0 flex-col">
              {verweise.map((v) => (
                <li key={v.href} className="min-w-0">
                  <Pfeillink href={v.href} ariaLabel={v.ariaLabel}>
                    {v.titel}
                  </Pfeillink>
                </li>
              ))}
            </ul>
          ) : null}
          <Knopfreihe knoepfe={aktionen} />
        </div>
      ) : null}
    </>
  );
}

export function Feldliste({
  eintraege,
  anordnung = 'raster',
  spalten = 3,
  geordnet = false,
  ebene = 'h3',
  titelGroesse,
  textGroesse,
  flaeche = 'fliese',
  labelledBy,
  ariaLabel,
  className,
}: FeldlisteProps) {
  if (eintraege.length === 0) return null;
  const Liste = geordnet ? 'ol' : 'ul';
  const benennung = { 'aria-labelledby': labelledBy, 'aria-label': labelledBy ? undefined : ariaLabel };

  if (anordnung === 'zeilen') {
    const zeilenStufe = stufeFuerAlle(eintraege.map((e) => e.titel), 'zeile', 'text-k-5');
    return (
      <div className={verbinde('@container', className)}>
        <Liste {...benennung} className="border-t border-k-strich">
          {eintraege.map((e, i) => (
            <li key={e.id ?? i} id={e.id} className="grid grid-cols-1 gap-k-3 border-b border-k-fuge py-k-6 @3xl:grid-cols-12 @3xl:gap-0 lg:py-k-7">
              <div className="flex min-w-0 flex-col gap-k-3 @3xl:col-span-5 @3xl:pr-k-7">
                <Kopfteile e={e} geordnet={geordnet} />
                <Titel e={e} Ebene={ebene} klasse={zeilenStufe} />
              </div>
              {e.inhalt || e.marken || e.liste || e.verweise || e.aktionen ? (
                <div className="flex min-w-0 flex-col gap-k-4 @3xl:col-span-7">
                  {e.inhalt ? <Inhalt inhalt={e.inhalt} klein={false} /> : null}
                  <Fussteile e={e} klein={false} />
                </div>
              ) : null}
            </li>
          ))}
        </Liste>
      </div>
    );
  }

  const gross = (titelGroesse ?? (spalten <= 2 ? 'gross' : 'klein')) === 'gross';
  const kleinText = (textGroesse ?? (spalten <= 2 ? 'normal' : 'klein')) === 'klein';
  const titelStufe = stufeFuerAlle(eintraege.map((e) => e.titel), 'feld', gross ? 'text-k-5' : 'text-k-4');
  return (
    <Fugenraster als={Liste} spalten={spalten} className={className} {...benennung}>
      {eintraege.map((e, i) => {
        const Huelle = e.id ? 'article' : 'div';
        return (
          <Fugenfeld key={e.id ?? i} als="li" spanne={e.spanne} innen="keiner" flaeche={flaeche === 'kalk' ? 'kalk' : 'fliese'} className={verbinde('flex', Boolean(e.motiv) && SIG_PLAN_AUSLOESER)}>
            <Huelle id={e.id} className="flex min-w-0 flex-1 flex-col">
              {e.motiv ? <div className="border-b border-k-fuge">{e.motiv}</div> : null}
              <div className="flex flex-1 flex-col gap-k-4 p-k-5 lg:p-k-6">
                <Kopfteile e={e} geordnet={geordnet} />
                <Titel e={e} Ebene={ebene} klasse={titelStufe} />
                {e.inhalt ? <Inhalt inhalt={e.inhalt} klein={kleinText} /> : null}
                <Fussteile e={e} klein={kleinText} />
              </div>
            </Huelle>
          </Fugenfeld>
        );
      })}
    </Fugenraster>
  );
}

export type FelderProps = AbschnittProps & Omit<FeldlisteProps, 'flaeche' | 'className' | 'labelledBy' | 'ariaLabel'>;

/** Abschnitt mit Feldliste; Felder auf der Gegenfläche des Abschnitts, `children` darunter (z. B. Stimme, Notiz). */
export default function Felder({ eintraege, anordnung, spalten, geordnet, ebene, titelGroesse, textGroesse, children, ...abschnitt }: FelderProps) {
  const flaeche = feldFlaeche(abschnitt.flaeche ?? 'kalk');
  return (
    <Abschnitt {...abschnitt}>
      <Feldliste
        eintraege={eintraege}
        anordnung={anordnung}
        spalten={spalten}
        geordnet={geordnet}
        ebene={ebene}
        titelGroesse={titelGroesse}
        textGroesse={textGroesse}
        flaeche={flaeche}
      />
      {children ? <div className="mt-k-8">{children}</div> : null}
    </Abschnitt>
  );
}
