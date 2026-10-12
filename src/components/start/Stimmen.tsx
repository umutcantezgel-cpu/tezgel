// Startseite · Kundenstimmen (KERN v2, E020-F-4): „Was unsere Kunden in Mittelhessen sagen“.
// Kopf zweispaltig: links Etikett und Überschrift, rechts die Kennwerte Google und Trustlocal als Maß (ohne Sterne-Grafik).
// Darunter der Bestandsbaustein `ReviewCarousel` (Client): gleiche Kartenhöhen, Zähler „n von N“, ohne sichtbare Scrollleiste.
// Karten und Daten wie im Bestand: Name vor dem Zitat, Zitat in der Grundschrift mit Anriss, Bewertung mit Google-Logo,
// Querverweis auf Ablauf oder Leistung. Zitate aus `@/config/reviews`, Anrisse und Querverweise aus `@/lib/stimmen`.
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen, seitenKlassen } from '@/components/kern/stile';
import ReviewCarousel from '@/components/reviews/ReviewCarousel';
import { RATING_SUMMARY } from '@/config/reviews';

export default function Stimmen() {
  const { google, trustlocal } = RATING_SUMMARY;
  return (
    <section aria-labelledby="bewertungen-heading" className="py-16 lg:py-24">
      <div className={seitenKlassen}>
        <div className="grid grid-cols-4 gap-y-12 md:grid-cols-8 lg:grid-cols-12 lg:items-end">
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:pr-12">
            <span className={etikettKlassen}>
              <Fugenkreuz className="size-3 text-strich" />
              Echte Kundenstimmen
            </span>
            <h2 id="bewertungen-heading" className="mt-4 text-fs-6 text-tinte">
              Was unsere Kunden in Mittelhessen sagen
            </h2>
          </div>
          <dl className="col-span-4 grid grid-cols-2 border-l border-t border-fuge md:col-span-8 lg:col-span-5">
            <div className="flex flex-col gap-1 border-b border-r border-fuge p-4 lg:p-6">
              <dt className="font-mono text-fs-1 text-tinte-2">{google.source}</dt>
              <dd className="font-mono text-fs-4 text-tinte">
                {google.displayRating} / {google.maxRating}
              </dd>
              <dd className="font-text text-fs-2 text-tinte-2">
                {google.count} {google.label}
              </dd>
            </div>
            <div className="flex flex-col gap-1 border-b border-r border-fuge p-4 lg:p-6">
              <dt className="font-mono text-fs-1 text-tinte-2">{trustlocal.source}</dt>
              <dd className="font-mono text-fs-4 text-tinte">{trustlocal.displayRating}</dd>
              <dd className="font-text text-fs-2 text-tinte-2">
                {trustlocal.count} {trustlocal.label}
              </dd>
            </div>
          </dl>
        </div>

        <ReviewCarousel className="mt-16" zaehler />

        <div className="mt-12">
          <Knopf href="/referenzen" variante="neben" icon="pfeil-rechts">
            Alle Kundenbewertungen ansehen
          </Knopf>
        </div>
      </div>
    </section>
  );
}
