// Qualitätsversprechen auf `/kontakt` (P4-08f, KERN v1.2 K-003 „Fuge statt Karte“, K-012 Klasse 3).
// Bestand: zweite Karte neben dem Direktkontakt (`(bestand)/kontakt/page.jsx`, „Quality & Regional Promise Card“). Im Kern ein
// eigener Abschnitt auf Fliese, als Feldraster in Lesefolge des Bestands:
//   Feld 1 (Sp. 1–5)  Etiketten „Qualitätsversprechen“ und „HWK Wiesbaden“, h2, Satz zum Inhaber
//   Feld 2 (Sp. 6–9)  Motto als Zitat mit Herkunft in Mono
//   Feld 3 (Sp. 10–12) drei Punkte mit Fugenkreuz
//   Fußzeile (Sp. 1–12) Einsatzgebiet und Weg zu `/standorte`
// Anders gebaut als der Kopf davor (Blatt mit Spalten) und der Standort-Abschnitt danach (Kopf über Register und Karte).
// Inhalte aus COMPANY_DATA (Inhaber, Motto, Kammer). Wortlaut der Punkte wörtlich (Lehre 1: „Garantierter Staubschutz“ steht
// im Bestand; Prüfhinweis in der Rückgabe). Server-Komponente, kein Auftritt (Arbeitsseite).
import { useId } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { Etikett, Feldraster, Rasterfeld, verbinde } from '@/components/kern/basis';
import { Pfeillink, Punkte, UMBRUCH, stufeNachWort } from '@/components/kern/vorlagen/teile';

const TITEL = 'Persönliche Fachberatung';

export default function Qualitaet() {
  const titelId = `k-qualitaet${useId()}`;
  const { owner, motto, authority } = COMPANY_DATA;
  return (
    <section aria-labelledby={titelId} className="border-b border-k-fuge bg-k-fliese py-k-7 lg:py-k-8">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        <Feldraster>
          <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 5 }} className="flex flex-col">
            <div className="flex flex-wrap items-start justify-between gap-k-3">
              <Etikett kreuz ton="tinte">
                Qualitätsversprechen
              </Etikett>
              <Etikett rahmen>{authority.shortName}</Etikett>
            </div>
            <h2 id={titelId} className={verbinde('mt-k-5 k-anzeige text-k-tinte', stufeNachWort(TITEL, 'feld', 'text-k-5'), UMBRUCH)}>
              {TITEL}
            </h2>
            <p className="mt-k-3 k-text text-k-3 text-k-tinte-2">
              Inhaber {owner.fullName} betreut jedes Projekt von der Vor-Ort-Begutachtung bis zur sauberen Endübergabe persönlich.
            </p>
          </Rasterfeld>

          <Rasterfeld als="figure" breite={{ mobil: 4, tablett: 4, desktop: 4 }} flaeche="kalk" className="flex flex-col justify-between gap-k-4">
            <blockquote className="k-text text-k-4 text-k-tinte">&bdquo;{motto}&ldquo;</blockquote>
            <figcaption className="k-mono text-k-1 text-k-tinte-2">— {owner.fullName}, Inhaber</figcaption>
          </Rasterfeld>

          <Rasterfeld breite={{ mobil: 4, tablett: 4, desktop: 3 }} innen="eng" className="lg:p-k-5">
            <Punkte
              zeichen="kreuz"
              groesse="klein"
              punkte={[
                'Normgerechte Verbundabdichtung nach DIN 18534',
                'Garantierter Staubschutz bei Renovierungen',
                `Eingetragen bei der ${authority.name}`,
              ]}
            />
          </Rasterfeld>

          <Rasterfeld
            breite={{ mobil: 4, tablett: 8, desktop: 12 }}
            innen="keiner"
            className="flex flex-col gap-k-2 px-k-5 py-k-3 md:flex-row md:items-center md:justify-between md:gap-k-5 lg:px-k-6"
          >
            <div className="flex min-w-0 flex-col gap-k-1 sm:flex-row sm:items-baseline sm:gap-k-3">
              <div className="k-mono text-k-1 text-k-tinte-2">Einsatzgebiet:</div>
              <div className={verbinde('k-text text-k-2 font-semibold text-k-tinte', UMBRUCH)}>
                Aßlar, Wetzlar, Gießen, Herborn, Dillenburg &amp; ganz Hessen
              </div>
            </div>
            <Pfeillink href="/standorte" className="shrink-0">
              Alle Standorte ansehen
            </Pfeillink>
          </Rasterfeld>
        </Feldraster>
      </div>
    </section>
  );
}
