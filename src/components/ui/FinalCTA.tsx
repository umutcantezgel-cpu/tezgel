import clsx from "clsx";
import Icon from "@/components/icons/Icon";
import Knopf from "@/components/kern/Knopf";
import { seitenKlassen } from "@/components/kern/stile";
import { siteConfig } from "@/lib/config";
import { LeadQuickForm } from "@/components/forms/LeadQuickForm";
import WhatsAppLogo from "@/components/ui/WhatsAppLogo";

interface FinalCTAProps {
  className?: string;
  headline?: string;
  benefits?: string[];
  buttonText?: string;
  socialProof?: string;
  subtitle?: string;
  serviceContext?: string;
  showQuickForm?: boolean;
  quickFormSource?: string;
}

const defaultBenefits = [
  "Kostenfreies Vor-Ort-Aufmaß in Aßlar, Wetzlar & Hessen",
  "Verbindlicher Festpreis ohne versteckte Kosten",
  "Saubere Baustelle mit Staubschutz-Garantie",
];

// Telefonnummer groß in Mono, als tel:-Link (Farbwechsel der Linie: zustand)
const TELEFON_KLASSEN =
  "inline-flex w-fit font-mono text-fs-5 text-kalk underline decoration-nacht-fuge decoration-1 underline-offset-8 transition-colors dauer-1 ease-setzen hover:decoration-kalk";

// WhatsApp als Nebenknopf auf Tinte: Kontur in Nacht-Farben (die Knopf-Varianten sind für helle Flächen gedacht)
const NEBENKNOPF_AUF_TINTE =
  "inline-flex min-h-11 w-full items-center justify-center gap-2 border border-nacht-2 bg-transparent px-6 py-3 font-text text-fs-2 font-semibold text-kalk no-underline transition-colors dauer-1 ease-setzen hover:border-kalk";

// Abschluss (KERN v2, nach src/components/kern/start/Abschluss.tsx): Tinte-Fläche, gerahmtes Feld mit klarer Rangfolge
// (Überschrift, Untertitel, große Telefonnummer, gefüllter Hauptknopf, WhatsApp mit Markenzeichen, ruhige Leiste).
// Ein Aufmaß-Aufruf: der Hauptknopf (buttonText). Props und Standardwerte wie im Bestand.
// Das Schnellformular erscheint nur bei showQuickForm (Unterseiten mit Standorten/Leistungen), wie bisher.
// Server-Komponente: kein Zustand, daher keine Haptik beim Klick.
export default function FinalCTA({
  className,
  headline = "Planen Sie ein Fliesen- oder Badprojekt? Sprechen Sie direkt mit Fachbetriebsleiter Deniz Tezgel.",
  benefits = defaultBenefits,
  buttonText = "Jetzt kostenfrei anrufen",
  socialProof = "5,0 Google-Bewertung bei 27 echten Kundenstimmen",
  subtitle = "Schnelle Reaktionszeit • Persönliche Betreuung vor Ort • HWK-Fachbetrieb",
  serviceContext,
  showQuickForm = false,
  quickFormSource,
}: FinalCTAProps) {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className={clsx("flaeche-tinte relative w-full border-t border-nacht-fuge bg-tinte py-24 text-kalk lg:py-32", className)}
    >
      <div className={seitenKlassen}>
        <div className="border border-nacht-fuge">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Anliegen: Kontext, Überschrift, Untertitel, Zusagen */}
            <div className="flex flex-col gap-6 p-4 md:p-8 lg:col-span-7 lg:p-12">
              {serviceContext && <p className="font-mono text-fs-1 text-nacht-2">{serviceContext}</p>}
              <h2 id="final-cta-heading" className="font-anzeige text-fs-6 text-kalk">
                {headline}
              </h2>
              <p className="font-text text-fs-2 text-nacht-2">{subtitle}</p>
              <ul className="flex flex-col border-t border-nacht-fuge">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 border-b border-nacht-fuge py-3 font-text text-fs-3 text-kalk">
                    <Icon name="haken" groesse={5} className="mt-1 text-nacht-2" />
                    <span className="min-w-0">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Wege: Telefonnummer, Hauptknopf, WhatsApp */}
            <div className="flex flex-col justify-center gap-4 border-t border-nacht-fuge p-4 md:p-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:p-12">
              <a
                href={siteConfig.contact.phone.link}
                aria-label={`Fliesenverlegung Tezgel telefonisch anrufen: ${siteConfig.contact.phone.formatted}`}
                data-motion="zustand"
                className={TELEFON_KLASSEN}
              >
                {siteConfig.contact.phone.formatted}
              </a>
              <Knopf href={siteConfig.contact.phone.link} variante="hell" iconLinks="telefon" className="w-full">
                {buttonText}
              </Knopf>
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Nachricht an Fliesenverlegung Tezgel senden"
                data-motion="druck"
                className={NEBENKNOPF_AUF_TINTE}
              >
                <WhatsAppLogo className="size-5" />
                <span>Per WhatsApp schreiben</span>
              </a>
            </div>
          </div>

          {/* Leiste: Beleg in Mono, ruhig */}
          <div className="flex items-center gap-2 border-t border-nacht-fuge px-4 py-4 md:px-8 lg:px-12">
            <Icon name="stern" groesse={4} className="text-nacht-2" />
            <p className="font-mono text-fs-1 text-nacht-2">{socialProof}</p>
          </div>
        </div>

        {showQuickForm && (
          <div className="mx-auto mt-12 w-full max-w-mass text-left">
            <LeadQuickForm
              variant="card"
              sourceTag={quickFormSource || serviceContext || "final-cta"}
              heading="Kostenfreies Vor-Ort-Aufmaß anfordern"
              subheading="Tragen Sie Ihre Kontaktdaten ein – Fachbetriebsleiter Deniz Tezgel meldet sich innerhalb von 24 Stunden persönlich."
            />
          </div>
        )}
      </div>
    </section>
  );
}

export { FinalCTA };
