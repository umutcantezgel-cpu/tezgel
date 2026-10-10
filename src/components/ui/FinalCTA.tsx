"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Icon from "@/components/icons/Icon";
import Fugenkreuz from "@/components/kern/Fugenkreuz";
import { knopfKlassen } from "@/components/kern/stile";
import { triggerHaptic } from "@/lib/haptics";
import { siteConfig } from "@/lib/config";
import { LeadQuickForm } from "@/components/forms/LeadQuickForm";

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

// Abschluss (KERN K-009): Tinte-Fläche, Überschrift links an der Fuge, Merkliste mit Fugenkreuz,
// drei Wege (Anrufen · Aufmaß anfragen · WhatsApp). Props und Texte bleiben wie im Bestand.
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
      className={cn("flaeche-tinte relative w-full border-t border-nacht-fuge bg-tinte py-24 text-kalk lg:py-32", className)}
    >
      <div className="mx-auto w-full max-w-seite px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-4 gap-y-12 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            {serviceContext && (
              <p className="mb-4 font-mono text-fs-1 text-nacht-2">{serviceContext}</p>
            )}
            <h2 id="final-cta-heading" className="text-fs-6 text-kalk">
              {headline}
            </h2>
            <ul className="mt-8 grid gap-px border border-nacht-fuge bg-nacht-fuge md:grid-cols-3">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 bg-tinte p-4 text-fs-2 text-kalk">
                  <Fugenkreuz className="mt-1 size-3 text-laser" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-4 flex flex-col gap-4 md:col-span-8 lg:col-span-5">
            <a
              href={siteConfig.contact.phone.link}
              onClick={() => triggerHaptic("light")}
              aria-label={`Fliesenverlegung Tezgel telefonisch anrufen: ${siteConfig.contact.phone.formatted}`}
              className="font-mono text-fs-5 text-kalk underline decoration-nacht-fuge underline-offset-8 transition-colors dauer-1 ease-setzen hover:decoration-kalk"
            >
              {siteConfig.contact.phone.formatted}
            </a>
            <a
              href={siteConfig.contact.phone.link}
              onClick={() => triggerHaptic("medium")}
              className={knopfKlassen("hell", "w-full")}
              data-motion="druck"
            >
              <Icon name="telefon" />
              <span>{buttonText}</span>
            </a>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link
                href="/kontakt#express-anfrage"
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-nacht-2 px-4 py-3 text-center text-fs-2 font-semibold text-kalk transition-colors dauer-1 ease-setzen hover:border-kalk"
                data-motion="druck"
              >
                <Icon name="aufmass" />
                <span>Kostenloses Vor-Ort-Aufmaß anfordern</span>
              </Link>
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerHaptic("light")}
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-nacht-2 px-4 py-3 text-fs-2 font-semibold text-kalk transition-colors dauer-1 ease-setzen hover:border-kalk"
                aria-label="WhatsApp Nachricht an Fliesenverlegung Tezgel senden"
                data-motion="druck"
              >
                <span>Per WhatsApp schreiben</span>
              </a>
            </div>
            <p className="mt-4 border-t border-nacht-fuge pt-4 font-mono text-fs-1 text-nacht-2">
              {socialProof}
            </p>
            <p className="text-fs-2 text-nacht-2">{subtitle}</p>
          </div>
        </div>

        {showQuickForm && (
          <div className="mx-auto mt-12 w-full max-w-mass text-left">
            <LeadQuickForm
              variant="card"
              sourceTag={quickFormSource || serviceContext || 'final-cta'}
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
