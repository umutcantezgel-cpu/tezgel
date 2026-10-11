// Ablauf der Fachseite (P4-01, KERN v1.2 K-003 „Fuge statt Karte“, K-007, K-009): gleiche Logik wie der Ablauf von `/`
// (`src/components/kern/start/Ablauf.tsx`, P3-11), aber mit Schritten als Prop und beliebiger Schrittzahl.
// Abfolge an einer Linie statt Kachelraster: Desktop je Reihe eine Waage (1-px-Linie Strich) über den Schritten –
// 2, 3 oder 4 Schritte stehen in einer Reihe, 5–6 in Reihen zu drei, 7–8 in Reihen zu vier; mobil und Tablett ein Lot
// am linken Rand. Je Schritt ein statischer Prüfhaken als Kreuzpunkt auf der Linie (K-009: kein Signaturmoment außerhalb
// von `/bad`; Ablaufabschnitte nutzen `auftritt` und statische Prüfhaken). Die Linie ist nicht die Seitenachse: Strich, kein Rot.
// Schrittnummer in Mono, `aria-hidden` wie im Bestand (die Liste nummeriert); `titelVorsatz` hält den nur vorgelesenen
// Vorsatz des Bestands („Schritt 01: “, `sr-only`). Ein Auftritt für die ganze Schrittfolge (IO 20 %), abschaltbar.
// `children` steht unter der Schrittfolge (Bestand Badsanierung: Kundenstimme im selben Abschnitt).
import type { ReactNode } from 'react';
import { verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import Abschnitt, { type AbschnittProps } from '@/components/kern/vorlagen/fachseite/Abschnitt';
import { UMBRUCH, istText, type Ebene, type Flaeche } from '@/components/kern/vorlagen/fachseite/typen';

export type Schritt = {
  /** Schrittnummer wörtlich („01“, „1“) */
  nummer: string;
  titel: ReactNode;
  text?: ReactNode;
  /** Zeile über dem Titel (Bestand `/`: subtitle) */
  unterzeile?: ReactNode;
  /** nur vorgelesener Vorsatz im Titel (Bestand: `<span className="sr-only">Schritt 01: </span>`) */
  titelVorsatz?: string;
};

export type AblaufProps = AbschnittProps & {
  schritte: readonly Schritt[];
  ebene?: Exclude<Ebene, 'h2'>;
};

// Wörtliche Klassen, damit Tailwind sie findet: Spalten je Schritt ab lg.
const SPANNE: Record<number, string> = { 1: 'lg:col-span-12', 2: 'lg:col-span-6', 3: 'lg:col-span-4', 4: 'lg:col-span-3' };

function spanne(anzahl: number): string {
  if (anzahl <= 4) return SPANNE[anzahl] ?? SPANNE[4];
  if (anzahl <= 6) return SPANNE[3];
  return SPANNE[4];
}

export function Schrittfolge({
  schritte,
  ebene: Titel = 'h3',
  auftritt = true,
  flaeche = 'kalk',
}: {
  schritte: readonly Schritt[];
  ebene?: Exclude<Ebene, 'h2'>;
  auftritt?: boolean;
  /** Fläche des Abschnitts: der Prüfhaken deckt die Linie mit derselben Fläche ab */
  flaeche?: Flaeche;
}) {
  if (schritte.length === 0) return null;
  const breite = spanne(schritte.length);
  const eng = schritte.length >= 4 && schritte.length !== 5 && schritte.length !== 6;
  return (
    <ol
      data-motion={auftritt ? 'auftritt' : undefined}
      data-ausloeser={auftritt ? 'sicht' : undefined}
      className="relative ml-k-4 border-l border-k-strich lg:ml-0 lg:grid lg:grid-cols-12 lg:gap-y-k-9 lg:border-l-0"
    >
      {schritte.map((s) => (
        <li key={s.nummer} className={verbinde('relative min-w-0 pb-k-7 pl-k-7 last:pb-0 lg:border-t lg:border-k-strich lg:pt-k-8 lg:pb-0 lg:pl-0', eng ? 'lg:pr-k-5' : 'lg:pr-k-7', breite)}>
          {/* Prüfhaken als Kreuzpunkt auf der Linie – dekorativ, die Nummerierung trägt die Liste */}
          <span
            aria-hidden="true"
            className={verbinde(
              'absolute -left-k-4 top-0 flex size-k-6 items-center justify-center border border-k-strich text-k-tinte lg:-top-k-4 lg:left-0',
              flaeche === 'fliese' ? 'bg-k-fliese' : 'bg-k-kalk',
            )}
          >
            <Icon name="haken" groesse={20} />
          </span>
          <span aria-hidden="true" className="block k-mono text-k-4 text-k-tinte">
            {s.nummer}
          </span>
          {s.unterzeile ? <span className="mt-k-4 block k-text text-k-2 font-semibold text-k-tinte-2">{s.unterzeile}</span> : null}
          <Titel className={verbinde('k-anzeige text-k-5 text-k-tinte', s.unterzeile ? 'mt-k-2' : 'mt-k-4', UMBRUCH)}>
            {s.titelVorsatz ? <span className="sr-only">{s.titelVorsatz}</span> : null}
            {s.titel}
          </Titel>
          {s.text ? (
            <div className={verbinde('mt-k-4 max-w-(--k-mass) k-text text-k-tinte-2', eng ? 'text-k-2' : 'text-k-3', UMBRUCH)}>
              {istText(s.text) ? <p>{s.text}</p> : s.text}
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export default function Ablauf({ schritte, ebene, auftritt = true, children, ...abschnitt }: AblaufProps) {
  return (
    <Abschnitt {...abschnitt}>
      <Schrittfolge schritte={schritte} ebene={ebene} auftritt={auftritt} flaeche={abschnitt.flaeche} />
      {children ? <div className="mt-k-9">{children}</div> : null}
    </Abschnitt>
  );
}
