import type { Metadata } from 'next';
import { Etikett, Knopf } from '@/components/kern/basis';

// 404 der Kern-Seiten (Plan Runde 3, Bauregel 5 / N-07): greift bei notFound() in Kern-Routen; unbekannte Adressen
// laufen bis W10 über global-not-found (Bestand). Wortlaut und Metadaten wörtlich aus `(bestand)/not-found.tsx`.
// Wandert mit der Freischaltung von „/“ nach `(kern)/not-found.tsx` (freischalten.sh verschiebt die Dateien des Entwurfs).
export const metadata: Metadata = {
  title: 'Seite nicht gefunden (404) | Fliesenverlegung Tezgel',
  description: 'Die angeforderte Seite konnte leider nicht gefunden werden. Nutzen Sie unsere Übersicht zu Fliesenverlegung & Badsanierung in Aßlar & Wetzlar.',
  robots: {
    index: false,
    follow: true,
  },
};

// Planausschnitt mit einer verrutschten Fliese (K-011 „404 mit Charakter“): Raster 3 × 3, eine Platte aus der Flucht.
function VerrutschtePlatte() {
  const feld = [0, 1, 2];
  return (
    <svg viewBox="0 0 120 120" className="h-auto w-32 text-k-strich" aria-hidden="true" focusable="false">
      {feld.flatMap((zeile) =>
        feld.map((spalte) =>
          zeile === 1 && spalte === 2 ? null : (
            <rect key={`${zeile}-${spalte}`} x={4 + spalte * 38} y={4 + zeile * 38} width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          ),
        ),
      )}
      <rect x="84" y="50" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
      <rect x="80" y="42" width="36" height="36" fill="none" className="text-k-laser-tief" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" transform="rotate(8 98 60)" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <section className="mx-auto grid max-w-(--k-seite) gap-k-7 px-(--k-rand) py-k-9 md:grid-cols-12">
      <div className="md:col-span-8">
        <Etikett>Fehler 404</Etikett>
        <h1 className="k-anzeige mt-k-4 text-k-7 text-k-tinte">Seite nicht gefunden</h1>
        <p className="k-text mt-k-5 max-w-(--k-mass) text-k-3 text-k-tinte-2">
          Die von Ihnen aufgerufene Seite existiert leider nicht oder wurde verschoben.
          Kehren Sie zur Startseite zurück oder informieren Sie sich über unsere Fachleistungen.
        </p>
        <div className="mt-k-6 flex flex-wrap gap-k-3">
          <Knopf href="/" art="haupt">
            Zur Startseite
          </Knopf>
          <Knopf href="/leistungen" art="neben">
            Zur Leistungsübersicht
          </Knopf>
        </div>
      </div>
      <div className="flex items-start md:col-span-4 md:justify-end">
        <VerrutschtePlatte />
      </div>
    </section>
  );
}
