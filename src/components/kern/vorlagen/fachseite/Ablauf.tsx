// Ablauf der Fachseite (P4-01, KERN v1.2 K-003 „Fuge statt Karte“, K-007, K-009): gleiche Logik wie der Ablauf von `/`
// (`src/components/kern/start/Ablauf.tsx`, P3-11; bleibt unverändert, E-027), aber mit Schritten als Prop und beliebiger
// Schrittzahl. Abfolge an einer Linie statt Kachelraster: Je Reihe eine Waage (1-px-Linie Strich) über den Schritten, bei
// wenig Platz ein Lot am linken Rand. Je Schritt ein statischer Prüfhaken als Kreuzpunkt auf der Linie (K-009: kein
// Signaturmoment außerhalb von `/bad`; Ablaufabschnitte nutzen `auftritt` und statische Prüfhaken). Die Linie ist nicht die
// Seitenachse: Strich, kein Rot.
// Reihen nach dem Platz des Behälters (Container-Abfrage, P4-10a; vorher je Fensterbreite, bei 1024 px vier Schritte je
// 208 px, „Untergrundprüfung“ brach): höchstens 2, 3 oder 4 Schritte je Reihe (2–4 Schritte: alle, 5–6: drei, ab 7: vier).
//   zwei je Reihe ab Behälter 42rem · drei je Reihe ab 56rem · vier je Reihe: ab 42rem zwei, ab 72rem vier; darunter Lot.
// Schritttitel: eine Stufe für alle nach dem längsten Wort (Ort `ablauf`, höchstens k-5).
// Schrittnummer in Mono, `aria-hidden` wie im Bestand (die Liste nummeriert); `titelVorsatz` hält den nur vorgelesenen
// Vorsatz des Bestands („Schritt 01: “, `sr-only`). Ein Auftritt für die ganze Schrittfolge (IO 20 %), abschaltbar.
// `children` steht unter der Schrittfolge (Bestand Badsanierung: Kundenstimme im selben Abschnitt).
import type { ReactNode } from 'react';
import { verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import Abschnitt, { type AbschnittProps } from '@/components/kern/vorlagen/teile/Abschnitt';
import { stufeFuerAlle } from '@/components/kern/vorlagen/teile/satz';
import { UMBRUCH, istText, type Ebene, type Flaeche } from '@/components/kern/vorlagen/teile/typen';

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

// Wörtliche Klassen, damit Tailwind sie findet. Je Reihenform: Liste (Lot → Raster), Schritt (Lot → Waage), Prüfhaken.
type Form = 2 | 3 | 4;
const LISTE: Record<Form, string> = {
  2: '@2xl:ml-0 @2xl:grid @2xl:grid-cols-2 @2xl:gap-y-k-9 @2xl:border-l-0',
  3: '@4xl:ml-0 @4xl:grid @4xl:grid-cols-3 @4xl:gap-y-k-9 @4xl:border-l-0',
  4: '@2xl:ml-0 @2xl:grid @2xl:grid-cols-2 @2xl:gap-y-k-9 @2xl:border-l-0 @6xl:grid-cols-4',
};
const SCHRITT: Record<Form, string> = {
  2: '@2xl:border-t @2xl:border-k-strich @2xl:pt-k-8 @2xl:pb-0 @2xl:pl-0 @2xl:pr-k-7',
  3: '@4xl:border-t @4xl:border-k-strich @4xl:pt-k-8 @4xl:pb-0 @4xl:pl-0 @4xl:pr-k-7',
  4: '@2xl:border-t @2xl:border-k-strich @2xl:pt-k-8 @2xl:pb-0 @2xl:pl-0 @2xl:pr-k-5',
};
const HAKEN: Record<Form, string> = {
  2: '@2xl:-top-k-4 @2xl:left-0',
  3: '@4xl:-top-k-4 @4xl:left-0',
  4: '@2xl:-top-k-4 @2xl:left-0',
};

function form(anzahl: number): Form {
  if (anzahl <= 2) return 2;
  if (anzahl === 3 || anzahl === 5 || anzahl === 6) return 3;
  return 4;
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
  const f = form(schritte.length);
  const eng = f === 4;
  const titelStufe = stufeFuerAlle(schritte.map((s) => s.titel), 'ablauf', 'text-k-5');
  return (
    <div className="@container">
      <ol
        data-motion={auftritt ? 'auftritt' : undefined}
        data-ausloeser={auftritt ? 'sicht' : undefined}
        className={verbinde('relative ml-k-4 border-l border-k-strich', LISTE[f])}
      >
        {schritte.map((s) => (
          <li key={s.nummer} className={verbinde('relative min-w-0 pb-k-7 pl-k-7 last:pb-0', SCHRITT[f])}>
            {/* Prüfhaken als Kreuzpunkt auf der Linie – dekorativ, die Nummerierung trägt die Liste */}
            <span
              aria-hidden="true"
              className={verbinde(
                'absolute -left-k-4 top-0 flex size-k-6 items-center justify-center border border-k-strich text-k-tinte',
                HAKEN[f],
                flaeche === 'fliese' ? 'bg-k-fliese' : 'bg-k-kalk',
              )}
            >
              <Icon name="haken" groesse={20} />
            </span>
            <span aria-hidden="true" className="block k-mono text-k-4 text-k-tinte">
              {s.nummer}
            </span>
            {s.unterzeile ? <span className="mt-k-4 block k-text text-k-2 font-semibold text-k-tinte-2">{s.unterzeile}</span> : null}
            <Titel className={verbinde('k-anzeige text-k-tinte', titelStufe, s.unterzeile ? 'mt-k-2' : 'mt-k-4', UMBRUCH)}>
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
    </div>
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
