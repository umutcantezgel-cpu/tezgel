"use client";

import { useState, useId } from "react";
import Icon from "@/components/icons/Icon";
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

// FAQ (KERN K-009, Erscheinung der Kern-Startseite): Fragen in der Grundschrift zur Abschnittsüberschrift, ohne Kästen,
// nur mit Fuge unten; Plus rechts, Minus wenn offen. Die Antwort klappt über grid-template-rows auf (Register „aufklappen“).
export default function FAQAccordion({ question, answer, isDarkerBg = false }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const buttonId = `faq-btn-${uniqueId}`;
  const panelId = `faq-panel-${uniqueId}`;

  const linkText = pickVariant(callVariants, question);

  return (
    <div className={`border-b border-fuge first:border-t${isDarkerBg ? " bg-kalk" : ""}`}>
      <div>
        <button
          id={buttonId}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-6 py-4 text-left font-text text-fs-3 font-semibold text-tinte transition-colors dauer-1 ease-setzen hover:text-tinte-2"
          aria-expanded={isOpen}
          aria-controls={panelId}
          data-motion="zustand"
        >
          <span className="min-w-0">{question}</span>
          <span className="flex shrink-0 items-center text-tinte" aria-hidden="true" data-motion="aufklappen">
            <Icon name={isOpen ? "minus" : "plus"} groesse={6} />
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
          <div className="flex max-w-mass flex-col gap-4 pb-6">
            <p className="font-text text-fs-2 text-tinte-2">
              {answer}
            </p>
            <p className="flex flex-col gap-2 border-t border-fuge pt-4 font-text text-fs-2 text-tinte-2 sm:flex-row sm:items-center">
              <span>Haben Sie eine Frage zu Ihrem Bauvorhaben?</span>
              <a
                href={siteConfig.contact.phone.link}
                aria-label={`Fliesenverlegung Tezgel telefonisch kontaktieren: ${linkText}`}
                data-motion="zustand"
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
