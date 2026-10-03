"use client";

import { useState, useId } from "react";
import { Plus, HelpCircle } from "lucide-react";
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

export default function FAQAccordion({ question, answer, isDarkerBg = false }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const buttonId = `faq-btn-${uniqueId}`;
  const panelId = `faq-panel-${uniqueId}`;

  const linkText = pickVariant(callVariants, question);

  return (
    <div className={`rounded-2xl ${isDarkerBg ? 'bg-neutral-50' : 'bg-white'} border border-neutral-200 overflow-hidden transition-all duration-300 ease-out mb-4 shadow-sm hover:shadow-md`}>
      <div>
        <button
          id={buttonId}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-2xl cursor-pointer"
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <span className="flex gap-3 text-base sm:text-lg font-bold text-neutral-900">
            <HelpCircle className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{question}</span>
          </span>
          <span className={`shrink-0 text-orange-600 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-45' : 'rotate-0'}`} aria-hidden="true">
            <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
        </button>
      </div>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-0 sm:px-6 sm:pb-6 flex flex-col gap-3">
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              {answer}
            </p>
            <div className="mt-2 text-xs sm:text-sm font-semibold text-neutral-700 pt-3 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center gap-2">
              <span>Haben Sie eine Frage zu Ihrem Bauvorhaben?</span>
              <a
                href={siteConfig.contact.phone.link}
                aria-label={`Fliesenverlegung Tezgel telefonisch kontaktieren: ${linkText}`}
                className="inline-flex items-center text-orange-800 hover:text-orange-900 hover:underline font-bold"
              >
                {linkText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { FAQAccordion as FaqAccordion };
