"use client";

import { useState, useId } from "react";
import Fugenkreuz from "@/components/kern/Fugenkreuz";
import { pickVariant } from "@/lib/textRotation";
import { siteConfig } from "@/lib/config";

interface FAQAccordionProps {
  question: string;
  answer: string;
  isDarkerBg?: boolean;
}

const callVariants = [
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

// FAQ (KERN K-009): Fragen an der Fuge, das Fugenkreuz dreht sich zum Schließen-Zeichen,
// die Antwort klappt über grid-template-rows auf (Register „aufklappen“).
export default function FAQAccordion({ question, answer, isDarkerBg = false }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const buttonId = `faq-btn-${uniqueId}`;
  const panelId = `faq-panel-${uniqueId}`;

  const linkText = pickVariant(callVariants, question);

  return (
    <div className={`border-b border-fuge first:border-t ${isDarkerBg ? "bg-kalk" : "bg-fliese"}`}>
      <div>
        <button
          id={buttonId}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full cursor-pointer items-start justify-between gap-6 px-4 py-6 text-left transition-colors dauer-1 ease-setzen hover:bg-kalk md:px-6"
          aria-expanded={isOpen}
          aria-controls={panelId}
          data-motion="zustand"
        >
          <span className="font-text text-fs-4 font-semibold text-tinte">{question}</span>
          <span
            className={`mt-2 shrink-0 text-tinte motion-safe:transition-transform motion-safe:dauer-2 motion-safe:ease-setzen motion-reduce:transition-none ${isOpen ? "rotate-45" : "rotate-0"}`}
            aria-hidden="true"
            data-motion="aufklappen"
          >
            <Fugenkreuz className="size-4" />
          </span>
        </button>
      </div>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="aufklappen"
        data-offen={isOpen ? "true" : "false"}
        data-motion="aufklappen"
        inert={!isOpen}
      >
        <div>
          <div className="flex max-w-mass flex-col gap-4 px-4 pb-6 md:px-6">
            <p className="text-fs-3 text-tinte">
              {answer}
            </p>
            <p className="flex flex-col gap-2 border-t border-fuge pt-4 text-fs-2 text-tinte-2 sm:flex-row sm:items-center">
              <span>Haben Sie eine Frage zu Ihrem Bauvorhaben?</span>
              <a
                href={siteConfig.contact.phone.link}
                aria-label={`Fliesenverlegung Tezgel telefonisch kontaktieren: ${linkText}`}
                className="font-semibold text-tinte underline decoration-strich underline-offset-4 transition-colors dauer-1 ease-setzen hover:decoration-tinte"
              >
                {linkText}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { FAQAccordion as FaqAccordion };
