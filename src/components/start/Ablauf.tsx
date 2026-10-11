// Startseite · Ablauf (E020-F-3, KERN v2): „In 3 Schritten zu Ihrem neuen Belag“, Anker #ablauf.
// Nachbau des Vorbilds (src/components/kern/start/Ablauf.tsx) im KERN-v2-System: Zeitleiste mit durchgehender Linie,
// je Schritt ein Kästchen auf der Linie. Abweichung zum Vorbild: Im Kästchen steht die Schrittziffer (Mono), kein
// Haken – ein Haken liest sich wie „bereits erledigt“. Dafür entfällt die zweite große Ziffer unter dem Kästchen,
// damit es je Schritt nur eine Ziffer gibt.
// Desktop: waagrechte Linie über drei Spalten; mobil: senkrechte Linie links, Schritte untereinander.
// Bewegung: ein `auftritt` am Container (Register K-007); ohne JS und bei reduzierter Bewegung sofort sichtbar.
// Inhalt wörtlich aus dem Bestand, Daten aus `@/config/company` (processSteps, owner.fullName).
import { COMPANY_DATA, processSteps } from '@/config/company';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { etikettKlassen, seitenKlassen } from '@/components/kern/stile';

export default function Ablauf() {
  const { owner } = COMPANY_DATA;
  return (
    <section id="ablauf" aria-labelledby="ablauf-heading" className="spaet-zeichnen py-16 lg:py-24">
      <div className={seitenKlassen}>
        <div className="max-w-mass">
          <span className={etikettKlassen}>
            <Fugenkreuz className="size-3 text-strich" />
            Transparenter Ablauf
          </span>
          <h2 id="ablauf-heading" className="mt-4 text-fs-6 text-tinte">
            In 3 Schritten zu Ihrem neuen Belag
          </h2>
          <p className="mt-6 text-fs-4 text-tinte-2">
            Keine Überraschungen, keine versteckten Kosten – von der ersten Begutachtung bis zur sauberen Abnahme durch{' '}
            {owner.fullName} persönlich.
          </p>
        </div>

        <ol
          data-motion="auftritt"
          className="ml-6 mt-16 border-l border-strich lg:ml-0 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:border-l-0 lg:border-t"
        >
          {processSteps.map((schritt) => (
            <li key={schritt.step} className="relative pb-12 pl-12 last:pb-0 lg:col-span-4 lg:pb-0 lg:pl-0 lg:pt-12">
              {/* Kästchen auf der Linie mit der Schrittziffer – dekorativ, die Liste trägt die Reihenfolge */}
              <span
                aria-hidden="true"
                className="absolute -left-6 top-0 flex size-12 items-center justify-center border border-strich bg-kalk font-mono text-fs-4 text-tinte lg:-top-6 lg:left-0"
              >
                {schritt.step}
              </span>
              <p className="font-text text-fs-2 font-semibold text-tinte-2">{schritt.subtitle}</p>
              <h3 className="mt-2 font-anzeige text-fs-5 text-tinte">{schritt.title}</h3>
              <p className="mt-4 max-w-mass text-fs-3 text-tinte-2">{schritt.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
