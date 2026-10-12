// Startseite · Großformat (E020-F-3, KERN v2): „Fugenarme XXL-Großformate & fachgerechte Badsanierung“, Anker spotlight-heading.
// Nachbau des Vorbilds (src/components/kern/start/Grossformat.tsx) im KERN-v2-System: Feldraster mit Fugen, links das
// Textfeld, rechts das Bildfeld, darunter die Kennzahlen über die volle Breite (ohne zweites Fliesenmotiv).
// Abweichung zum Vorbild: Das KI-generierte Badfoto entfällt (Leitplanke M-19). An seiner Stelle zeichnet der Verlegeplan
// „grossformat“ das Feld; die Bildunterschrift bleibt der Bestandstext.
// Knöpfe stehen im Textfeld, nicht in einer Mittelspalte. Kennzahlen mit Etikett oben und Wert darunter; der Wert
// bricht nicht um („DIN 18534“). Kein Auftritt (wie im Vorbild).
// Wortlaut wie im Bestand (src/app/(bestand)/page.tsx, Abschnitt 7); Telefon und Inhaber aus `@/config/company`.
import clsx from 'clsx';
import { COMPANY_DATA } from '@/config/company';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { etikettForm, etikettKlassen, seitenKlassen } from '@/components/kern/stile';

export default function Grossformat() {
  const { contact, owner } = COMPANY_DATA;
  return (
    <section aria-labelledby="spotlight-heading" className="py-16 lg:py-24">
      <div className={seitenKlassen}>
        <div className="grid grid-cols-4 gap-px border border-fuge bg-fuge md:grid-cols-8 lg:grid-cols-12">
          {/* Textfeld */}
          <div className="col-span-4 flex flex-col bg-kalk p-6 md:col-span-8 lg:col-span-5 lg:p-8">
            <span className={etikettKlassen}>
              <Fugenkreuz className="size-3 shrink-0 text-strich" />
              Fachbetrieb für anspruchsvolle Architektur
            </span>
            <h2 id="spotlight-heading" className="mt-6 text-fs-6 text-tinte">
              Fugenarme XXL-Großformate &amp; fachgerechte Badsanierung
            </h2>
            <p className="mt-6 max-w-mass text-fs-3 text-tinte">
              Großformatige Platten verlangen höchste Präzision: Mit Nivelliersystem, Vakuumhebetechnik und flexiblen
              C2-Fliesenklebern entstehen planebene Flächen mit ruhigem, monolithischem Raumgefühl – ohne störende
              Fugenkreuze.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 lg:mt-auto lg:pt-8">
              <Knopf href="/bad/fliesen" icon="pfeil-rechts">
                Großformate im Bad
              </Knopf>
              <Knopf
                href={`tel:${contact.phoneLink}`}
                variante="neben"
                iconLinks="telefon"
                aria-label={`Großformat-Fliesenberatung telefonisch anfragen: ${contact.phone}`}
              >
                <span className="font-mono font-normal">{contact.phone}</span>
              </Knopf>
            </div>
          </div>

          {/* Bildfeld: gezeichneter Verlegeplan statt Foto, Bildunterschrift und Regionalzeile darunter */}
          <div className="col-span-4 flex flex-col bg-fliese md:col-span-8 lg:col-span-7">
            <figure className="flex flex-1 flex-col">
              <div className="flex flex-1 flex-col justify-center bg-kalk p-6 lg:p-8">
                <Verlegeplan plan="grossformat" beschriftet />
              </div>
              <figcaption className="border-t border-fuge px-6 py-4 font-mono text-fs-1 text-tinte lg:px-8">
                Millimetergenauer Gehrungsschnitt &amp; C2TE S1 Flexkleber
              </figcaption>
            </figure>
            <div className="border-t border-fuge p-6 lg:p-8">
              <span className={clsx(etikettForm, 'text-tinte')}>
                <Fugenkreuz className="size-3 text-strich" />
                Regional verwurzelt in Aßlar &middot; Wetzlar
              </span>
              <p className="mt-2 max-w-mass text-fs-2 text-tinte-2">
                Persönliche Betreuung durch {owner.fullName} von der 3D-Beratung bis zur makellosen Endabnahme.
              </p>
            </div>
          </div>

          {/* Faktenfeld: Kennzahlen mit Etikett oben und Wert darunter */}
          <div className="col-span-4 bg-fliese md:col-span-8 lg:col-span-12">
            <dl className="grid h-full divide-y divide-fuge md:grid-cols-2 md:divide-x md:divide-y-0">
              <div className="flex flex-col gap-2 p-6 lg:p-8">
                <dt className="font-text text-fs-2 text-tinte-2">Normgerechte Verbundabdichtung</dt>
                <dd className="font-mono text-fs-5 whitespace-nowrap text-tinte">DIN 18534</dd>
              </div>
              <div className="flex flex-col gap-2 p-6 lg:p-8">
                <dt className="font-text text-fs-2 text-tinte-2">Großformate für fugenarme Wand- &amp; Bodenflächen</dt>
                <dd className="font-mono text-fs-5 whitespace-nowrap text-tinte">XXL</dd>
              </div>
            </dl>
          </div>

        </div>
      </div>
    </section>
  );
}
