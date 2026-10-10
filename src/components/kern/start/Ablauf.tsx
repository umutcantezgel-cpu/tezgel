// Startseite · Ablauf (P3-11, KERN v1.2): „In 3 Schritten zu Ihrem neuen Belag“, Anker #ablauf.
// Struktur: Abfolge an einer Achse statt Kachelraster (K-003 „Fuge statt Karte“, K-011 Struktur und Dichte wechseln).
// Desktop: Waage als 1-px-Linie über drei Schritten; mobil und Tablett: Lot am linken Rand (K-003 Prinzip 7, K-007).
// Je Schritt ein statischer Prüfhaken als Kreuzpunkt auf der Linie (K-009: Ablauf auf / ohne Signaturmoment, K-010).
// Bewegung: genau ein `auftritt` (IO 20 %) für die Schrittfolge; ohne JS und bei reduzierter Bewegung sofort sichtbar (Register).
// Inhalt wörtlich aus dem Bestand, Daten aus `@/config/company` (processSteps, owner.fullName).
import { COMPANY_DATA, processSteps } from '@/config/company';
import Etikett from '@/components/kern/basis/Etikett';
import Icon from '@/components/kern/icons/Icon';

type Schritt = { step: string; title: string; subtitle: string; description: string };

export default function Ablauf() {
  const { owner } = COMPANY_DATA;
  const schritte: readonly Schritt[] = processSteps;
  return (
    <section id="ablauf" aria-labelledby="ablauf-heading" className="py-k-9 lg:py-k-10">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        <div className="max-w-(--k-mass)">
          <Etikett kreuz>Transparenter Ablauf</Etikett>
          <h2 id="ablauf-heading" className="mt-k-4 k-anzeige text-k-6 text-k-tinte">
            In 3 Schritten zu Ihrem neuen Belag
          </h2>
          <p className="mt-k-5 k-text text-k-4 text-k-tinte-2">
            Keine Überraschungen, keine versteckten Kosten – von der ersten Begutachtung bis zur sauberen Abnahme durch {owner.fullName} persönlich.
          </p>
        </div>

        <ol
          data-motion="auftritt"
          data-ausloeser="sicht"
          className="relative mt-k-8 ml-k-4 border-l border-k-strich lg:ml-0 lg:grid lg:grid-cols-12 lg:border-t lg:border-l-0"
        >
          {schritte.map((schritt) => (
            <li key={schritt.step} className="relative pb-k-7 pl-k-7 last:pb-0 lg:col-span-4 lg:pb-0 lg:pl-0 lg:pt-k-8 lg:pr-k-7">
              {/* Prüfhaken als Kreuzpunkt auf der Achse – dekorativ, die Nummerierung trägt die Liste */}
              <span
                aria-hidden="true"
                className="absolute -left-k-4 top-0 flex size-k-6 items-center justify-center border border-k-strich bg-k-kalk text-k-tinte lg:-top-k-4 lg:left-0"
              >
                <Icon name="haken" groesse={20} />
              </span>
              <span aria-hidden="true" className="block k-mono text-k-4 text-k-tinte">
                {schritt.step}
              </span>
              <span className="mt-k-4 block k-text text-k-2 font-semibold text-k-tinte-2">{schritt.subtitle}</span>
              <h3 className="mt-k-2 k-anzeige text-k-5 text-k-tinte">{schritt.title}</h3>
              <p className="mt-k-4 max-w-(--k-mass) k-text text-k-3 text-k-tinte-2">{schritt.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
