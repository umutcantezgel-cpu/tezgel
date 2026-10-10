// Startseite · Vertrauen (P3-12, KERN v1.2): Vertrauensleiste mit Google-Bewertungsabzeichen direkt unter dem Einstieg
// und die Garantien (Anker #vertrauen). K-002: Vertrauen prüfen innerhalb von zwei Bildschirmhöhen.
// Struktur:
// - Leiste: ein Feld aus acht Fugenfeldern (2 × 4 mobil, 4 × 2 ab md) – sieben Bestandssignale plus das Abzeichen als
//   achtes Feld. Statt Laufband (Bestand: Endlos-Marquee mit Klon-Reihe) stehen alle Signale still und einmal da.
// - Garantien: Zeilen mit Fugen statt Dreierraster aus Icon-Karten (S-04, S-11): Etikett in Mono · Titel · Text.
// Kein Auftritt (K-009: Scroll-Auftritte auf höchstens der Hälfte der Abschnitte; der Ablauf trägt einen).
// Inhalt wörtlich aus dem Bestand: `TrustStrip`, `GoogleReviewsBadge`, `PILLAR_EYEBROWS` und `trustPillars`.
// Bewertungszahlen aus `RATING_SUMMARY` (Single Source, K-008).
import { useId } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { RATING_SUMMARY } from '@/config/reviews';
import { Etikett, Fugenkreuz } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import MonoZahlen from '@/components/kern/start/vertrauen/MonoZahlen';
import Sterne from '@/components/kern/start/vertrauen/Sterne';

// Bestand `src/app/(bestand)/page.tsx`, Abschnitt „2. TRUST PILLARS“ – Reihenfolge wie `trustPillars`.
const PILLAR_EYEBROWS = ['Normgerechte Sicherheit', 'Fachgerechte Ausführung', 'Wohnkomfort bei Sanierung'];

// Bestand `TrustStrip.tsx`; das siebte Signal aus der Bewertungsquelle (gleicher Wortlaut: „5,0 Google-Bewertungen (27 Rezensionen)“).
function signale(): string[] {
  const { google } = RATING_SUMMARY;
  return [
    'Aßlar & Wetzlar regional vor Ort',
    'Eingetragener HWK Wiesbaden Fachbetrieb',
    'DIN 18534 Verbundabdichtung',
    'XXL-Großformat Nivelliertechnik',
    'Staubschutz & Sauberkeits-Garantie',
    'Verbindliche Festpreis-Kalkulation',
    `${google.displayRating} Google-Bewertungen (${google.count} Rezensionen)`,
  ];
}

const FELD = 'border-r border-b border-k-fuge';

/** Google-Bewertungsabzeichen als Feld der Leiste (Bestand `GoogleReviewsBadge`: Ziel, Titel, Wert, Anzahl). */
function Bewertungsabzeichen() {
  const { google } = RATING_SUMMARY;
  return (
    <li className={FELD}>
      <a
        href="https://www.google.com/search?q=Fliesenverlegung+Tezgel+A%C3%9Flar+Bewertungen"
        target="_blank"
        rel="noopener noreferrer"
        title="Zu den Google Bewertungen von Fliesenverlegung Tezgel"
        data-motion="zustand"
        className="flex h-full min-h-k-8 flex-col justify-center gap-k-1 bg-k-fliese p-k-3 text-k-tinte pointer-fine:hover:bg-k-kalk active:bg-k-fuge focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-k-tinte md:p-k-4"
      >
        <span className="flex items-center gap-k-2">
          <span className="k-mono text-k-4">{google.displayRating}</span>
          <Sterne wert={google.rating} max={google.maxRating} />
        </span>
        <span className="flex items-start justify-between gap-k-2 k-text text-k-1 font-semibold text-k-tinte-2 md:text-k-2">
          <span className="underline decoration-k-strich decoration-1 underline-offset-4">
            <span className="k-mono font-normal">{google.count}</span> verifizierte Google-Rezensionen
          </span>
          <span className="flex h-lh shrink-0 items-center">
            <Icon name="pfeil" groesse={16} />
          </span>
        </span>
      </a>
    </li>
  );
}

/** Vertrauensleiste unter dem Einstieg: sieben Signale und das Bewertungsabzeichen. */
export function Vertrauensleiste() {
  const titelId = `k-vertrauensleiste${useId()}`;
  return (
    <div className="mx-auto max-w-(--k-seite) px-(--k-rand) py-k-6">
      <section aria-labelledby={titelId}>
        <p id={titelId} className="sr-only">
          Vertrauenssignale und Fachbetriebs-Garantien
        </p>
        <ul className="grid grid-cols-2 border-t border-l border-k-fuge md:grid-cols-4">
          {signale().map((text) => (
            <li key={text} className={`${FELD} flex items-start gap-k-2 p-k-3 k-text text-k-1 font-semibold text-k-tinte md:p-k-4 md:text-k-2`}>
              <span className="flex h-lh shrink-0 items-center text-k-strich">
                <Fugenkreuz className="size-k-3" />
              </span>
              <span className="min-w-0">
                <MonoZahlen text={text} />
              </span>
            </li>
          ))}
          <Bewertungsabzeichen />
        </ul>
      </section>
    </div>
  );
}

type Garantie = { title: string; description: string };

/** Garantien (Anker #vertrauen): drei Zeilen mit Fugen, ohne sichtbare Überschrift wie im Bestand. */
export function Garantien() {
  const garantien: readonly Garantie[] = COMPANY_DATA.trustPillars;
  return (
    <section id="vertrauen" aria-label="Garantien & Qualitätsversprechen von Fliesenverlegung Tezgel" className="py-k-8 lg:py-k-9">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        <ul className="border-t border-k-strich">
          {garantien.map((garantie, i) => (
            <li key={garantie.title} className="grid grid-cols-1 gap-k-3 border-b border-k-fuge py-k-6 lg:grid-cols-12 lg:gap-0 lg:py-k-7">
              <Etikett kreuz className="lg:col-span-3 lg:pr-k-5">
                {PILLAR_EYEBROWS[i]}
              </Etikett>
              <p className="k-anzeige text-k-5 text-k-tinte lg:col-span-4 lg:pr-k-6">{garantie.title}</p>
              <p className="max-w-(--k-mass) k-text text-k-3 text-k-tinte-2 lg:col-span-5">{garantie.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export type VertrauenProps = {
  /** nur die Leiste (für den Platz direkt unter dem Einstieg); ohne: Leiste und Garantien wie im Bestand nacheinander */
  kompakt?: boolean;
};

export default function Vertrauen({ kompakt = false }: VertrauenProps) {
  if (kompakt) return <Vertrauensleiste />;
  return (
    <>
      <Vertrauensleiste />
      <Garantien />
    </>
  );
}
