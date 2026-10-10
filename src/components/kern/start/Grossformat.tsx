// Startseite · Großformat (P3-11, KERN v1.2): „Fugenarme XXL-Großformate & fachgerechte Badsanierung“.
// Struktur: dichtes Feldraster statt Achse (K-011: anders als der Ablauf) – Textfeld neben breitem Bildfeld,
// darunter das Faktenfeld (dl) und eine gezeichnete Fläche im Drittelverband für „fugenarm“ (K-007, K-010).
// Bild nach K-008: rechtwinklig, Rahmen 2 : 1 aus 1-px-Fugen, keine Filter, kein Verlauf, kein Text auf dem Bild,
// kein Hover-Zoom; Bildunterschrift darunter in Mono. Zuschnitt `cover` am unteren Rand verankert, damit die
// Kennzeichnung unten rechts im Bild vollständig sichtbar bleibt. Kein Auftritt (K-009: höchstens die Hälfte der Abschnitte).
// Inhalt wörtlich aus dem Bestand, Telefon und Inhaber aus `@/config/company`.
import Image from 'next/image';
import { COMPANY_DATA } from '@/config/company';
import Etikett from '@/components/kern/basis/Etikett';
import Knopf from '@/components/kern/basis/Knopf';
import { Feldraster, Rasterfeld } from '@/components/kern/basis/Feldraster';
import Icon from '@/components/kern/icons/Icon';
import Verband from '@/components/kern/motive/Verband';

export default function Grossformat() {
  const { contact, owner } = COMPANY_DATA;
  return (
    <section aria-labelledby="spotlight-heading" className="py-k-9 lg:py-k-10">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        <Feldraster>
          {/* Textfeld */}
          <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 5 }} className="flex flex-col">
            <Etikett rahmen className="self-start">Fachbetrieb für anspruchsvolle Architektur</Etikett>
            <h2 id="spotlight-heading" className="mt-k-5 k-anzeige text-k-6 text-k-tinte">
              Fugenarme XXL-Großformate &amp; fachgerechte Badsanierung
            </h2>
            <p className="mt-k-5 max-w-(--k-mass) k-text text-k-3 text-k-tinte">
              Großformatige Platten verlangen höchste Präzision: Mit Nivelliersystem, Vakuumhebetechnik und flexiblen C2-Fliesenklebern entstehen planebene Flächen mit ruhigem, monolithischem Raumgefühl – ohne störende Fugenkreuze.
            </p>
            <div className="mt-k-6 flex flex-wrap items-center gap-k-3 lg:mt-auto lg:pt-k-6">
              <Knopf href="/bad/fliesen" hinten={<Icon name="pfeil" groesse={20} />}>
                Großformate im Bad
              </Knopf>
              <Knopf
                art="neben"
                href={`tel:${contact.phoneLink}`}
                aria-label={`Großformat-Fliesenberatung telefonisch anfragen: ${contact.phone}`}
                vorne={<Icon name="telefon" groesse={20} />}
              >
                <span className="k-mono font-normal">{contact.phone}</span>
              </Knopf>
            </div>
          </Rasterfeld>

          {/* Bildfeld: Rahmen aus den Fugen des Rasters */}
          <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 7 }} innen="keiner" flaeche="fliese" className="flex flex-col">
            <figure>
              <div className="relative aspect-2/1 overflow-hidden bg-k-kalk">
                <Image
                  src="/images/bad/bad-freistehende-wanne.webp"
                  alt="Freistehende Badewanne mit fugenlosem XXL-Fliesenbelag von Fliesenverlegung Tezgel"
                  fill
                  quality={75}
                  sizes="(min-width: 82rem) 44rem, (min-width: 1024px) 58vw, 100vw"
                  className="object-cover object-bottom"
                />
              </div>
              <figcaption className="border-t border-k-fuge p-k-4 k-mono text-k-1">
                <span className="block text-k-tinte">Bad mit freistehender Wanne</span>
                <span className="block text-k-tinte-2">Millimetergenauer Gehrungsschnitt &amp; C2TE S1 Flexkleber</span>
              </figcaption>
            </figure>
            <div className="border-t border-k-fuge p-k-4 lg:mt-auto">
              <Etikett ton="tinte" kreuz>Regional verwurzelt in Aßlar &middot; Wetzlar</Etikett>
              <p className="mt-k-2 max-w-(--k-mass) k-text text-k-2 text-k-tinte-2">
                Persönliche Betreuung durch {owner.fullName} von der 3D-Beratung bis zur makellosen Endabnahme.
              </p>
            </div>
          </Rasterfeld>

          {/* Faktenfeld */}
          <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 8 }} innen="keiner" flaeche="fliese">
            <dl className="grid divide-y divide-k-fuge md:grid-cols-2 md:divide-x md:divide-y-0">
              <div className="flex flex-col-reverse justify-end gap-k-2 p-k-5 lg:p-k-6">
                <dt className="k-text text-k-2 text-k-tinte-2">Normgerechte Verbundabdichtung</dt>
                <dd className="k-mono text-k-5 text-k-tinte">DIN 18534</dd>
              </div>
              <div className="flex flex-col-reverse justify-end gap-k-2 p-k-5 lg:p-k-6">
                <dt className="k-text text-k-2 text-k-tinte-2">Großformate für fugenarme Wand- &amp; Bodenflächen</dt>
                <dd className="k-mono text-k-5 text-k-tinte">XXL</dd>
              </div>
            </dl>
          </Rasterfeld>

          {/* Gezeichnete Fläche: Drittelverband großer Platten – zeigt „fugenarm“, ersetzt das Bild nicht */}
          <Rasterfeld
            breite={{ mobil: 4, tablett: 8, desktop: 4 }}
            innen="keiner"
            aria-hidden="true"
            className="relative min-h-k-10 overflow-hidden text-k-strich"
          >
            <Verband art="drittelverband" hoehe={48} />
          </Rasterfeld>
        </Feldraster>
      </div>
    </section>
  );
}
