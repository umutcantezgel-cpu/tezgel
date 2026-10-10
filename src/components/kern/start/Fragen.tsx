import { Akkordeon, AkkordeonEintrag, Etikett } from '@/components/kern/basis';
import { pickVariant } from '@/lib/textRotation';
import { siteConfig } from '@/lib/config';

// Häufige Fragen der Startseite (P3-15, F-14) in Kern-Erscheinung. Fragen, Antworten, Überschrift und Etikett wörtlich aus
// dem Bestand (`(bestand)/page.tsx`, Abschnitt 9) – Kopie, weil die Bestandsseite mit der Freischaltung von `/` entfällt;
// bis dahin prüft texte2 den Wortlaut. Der Anruf-Hinweis je Antwort folgt `FAQAccordion` (gleiche Varianten, gleiche Wahl).
const FRAGEN = [
  { frage: "Was kostet eine professionelle Fliesenverlegung oder Badsanierung?", antwort: "Die Kosten richten sich nach Format, Material und Zustand des Untergrunds. Nach dem kostenfreien Vor-Ort-Aufmaß in Aßlar, Wetzlar oder Hessen erhalten Sie eine transparente Kostenaufstellung nach Quadratmetern und Arbeitsaufwand – als verbindliches Festpreisangebot." },
  { frage: "Wie garantieren Sie den Staubschutz bei bewohnten Sanierungen?", antwort: "Wir setzen moderne Staubschutztüren, Unterdruck-Luftreiniger und saugfähige Schutzvliese ein. So bleibt der Feinstaub im Arbeitsbereich und Ihre übrigen Wohnräume bleiben sauber und bewohnbar." },
  { frage: "Warum ist die Verbundabdichtung nach DIN 18534 im Bad unverzichtbar?", antwort: "Normgerechte Verbundabdichtung nach DIN 18534 mit Dichtbändern und Dichtmanschetten schützt das Mauerwerk und den Estrich dauerhaft vor Feuchteschäden, Wassereintritt und Schimmelbildung – besonders in bodengleichen Walk-In-Duschen." },
  { frage: "Verlegen Sie auch XXL-Großformate planeben ohne Überzähne?", antwort: "Ja! Wir nutzen modernste Nivelliersysteme und Vakuum-Hebetechnik für millimetergenaue Großformatverlegung (z. B. 120x120 cm oder 120x260 cm) mit minimalen, harmonischen Fugenachsen." },
  { frage: "Wie schnell erhalten wir einen Termin zum Aufmaß vor Ort?", antwort: "In der Regel vereinbaren wir binnen 24 bis 48 Stunden einen passenden Termin direkt bei Ihnen vor Ort in Aßlar, Wetzlar, Gießen oder Mittelhessen." },
];

// Wortgleich aus `src/components/ui/FAQAccordion.tsx` (Linktext des Anruf-Hinweises, je Frage fest gewählt).
const ANRUF_VARIANTEN = [
  `${siteConfig.contact.phone.formatted} anrufen`,
  `Unter ${siteConfig.contact.phone.formatted} kontaktieren`,
  `Direkt anrufen: ${siteConfig.contact.phone.formatted}`,
  `Kostenfreie Fachberatung: ${siteConfig.contact.phone.formatted}`,
  `Jetzt unter ${siteConfig.contact.phone.formatted} anfragen`,
  `Fliesen-Fachbetrieb kontaktieren: ${siteConfig.contact.phone.formatted}`,
  `Vor-Ort-Aufmaß anfragen: ${siteConfig.contact.phone.formatted}`,
  `Persönliche Beratung: ${siteConfig.contact.phone.formatted}`,
  `Rückfragen unter ${siteConfig.contact.phone.formatted}`,
];

export default function Fragen() {
  return (
    <section id="faq" aria-labelledby="home-faq-heading" className="border-t border-k-fuge bg-k-kalk py-k-9">
      <div className="mx-auto grid max-w-(--k-seite) gap-k-7 px-(--k-rand) lg:grid-cols-12">
        <header className="lg:col-span-4">
          <Etikett>Transparente Antworten</Etikett>
          <h2 id="home-faq-heading" className="k-anzeige mt-k-4 text-k-6 text-k-tinte">
            Häufig gestellte Fragen zu Fliesen & Badsanierung
          </h2>
          <p className="k-text mt-k-4 max-w-(--k-mass) text-k-3 text-k-tinte-2">
            Wichtige Fragen zu Kosten, DIN 18534 Abdichtung, Staubschutz und dem Ablauf vor Ort.
          </p>
        </header>
        <Akkordeon className="lg:col-span-8">
          {FRAGEN.map(({ frage, antwort }) => {
            const anruf = pickVariant(ANRUF_VARIANTEN, frage);
            return (
              <AkkordeonEintrag key={frage} titel={frage}>
                <p className="k-text max-w-(--k-mass) text-k-2 text-k-tinte-2">{antwort}</p>
                <p className="k-text mt-k-4 flex flex-col gap-k-2 border-t border-k-fuge pt-k-3 text-k-1 text-k-tinte-2 sm:flex-row sm:items-center">
                  <span>Haben Sie eine Frage zu Ihrem Bauvorhaben?</span>
                  <a
                    href={siteConfig.contact.phone.link}
                    aria-label={`Fliesenverlegung Tezgel telefonisch kontaktieren: ${anruf}`}
                    data-motion="zustand"
                    className="k-mono text-k-tinte underline decoration-k-strich underline-offset-4 hover:decoration-k-tinte focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-k-tinte"
                  >
                    {anruf}
                  </a>
                </p>
              </AkkordeonEintrag>
            );
          })}
        </Akkordeon>
      </div>
    </section>
  );
}
