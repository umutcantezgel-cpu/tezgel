"use client";

import React from "react";
import Link from "next/link";
import { Phone, Check, ArrowRight, Star, MessageCircle, Ruler } from "lucide-react";
import { cn } from "@/lib/utils";
import HeartbeatCTA from "@/components/animations/HeartbeatCTA";
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

export default function FinalCTA({
  className,
  headline = "Planen Sie ein Fliesen- oder Badprojekt? Sprechen Sie direkt mit Meister Deniz Tezgel.",
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
      className={cn(
        "w-full bg-gradient-to-br from-neutral-900 via-neutral-850 to-neutral-950 text-white py-16 sm:py-20 md:py-24 overflow-hidden relative border-t border-neutral-800",
        className
      )}
    >
      {/* Background glow and subtle tile pattern */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,#ea580c_0%,transparent_70%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl relative z-10 flex flex-col items-center text-center">
        {serviceContext && (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30 mb-4">
            {serviceContext}
          </span>
        )}

        <h2
          id="final-cta-heading"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-balance text-white leading-tight tracking-tight mb-6"
        >
          {headline}
        </h2>

        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 mb-10 max-w-3xl">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm sm:text-base font-medium text-neutral-200"
            >
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-orange-600/30 border border-orange-500/40 text-orange-400 shrink-0">
                <Check className="h-3.5 w-3.5" />
              </div>
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
          <a
            href={siteConfig.contact.phone.link}
            onClick={() => triggerHaptic("light")}
            aria-label={`Fliesenverlegung Tezgel telefonisch anrufen: ${siteConfig.contact.phone.formatted}`}
            className="text-2xl sm:text-3xl md:text-4xl font-black text-orange-400 hover:text-orange-300 transition-colors tracking-tight tabular-nums whitespace-nowrap"
          >
            {siteConfig.contact.phone.formatted}
          </a>

          <div className="w-full flex flex-col sm:flex-row gap-3 pt-2">
            <HeartbeatCTA className="flex-1">
              <a
                href={siteConfig.contact.phone.link}
                onClick={() => triggerHaptic("medium")}
                className="group flex items-center justify-center gap-2.5 w-full h-14 bg-orange-700 hover:bg-orange-600 text-white text-base font-bold rounded-xl shadow-lg shadow-orange-950/40 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-500/40 cursor-pointer"
              >
                <Phone className="h-5 w-5 shrink-0" />
                <span>{buttonText}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </HeartbeatCTA>

            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => triggerHaptic("light")}
              className="flex items-center justify-center gap-2 h-14 px-5 bg-emerald-700 hover:bg-emerald-600 text-white text-base font-bold rounded-xl shadow-lg shadow-emerald-950/30 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-500/40"
              aria-label="WhatsApp Nachricht an Fliesenverlegung Tezgel senden"
            >
              <MessageCircle className="h-5 w-5 shrink-0" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>

          <div className="w-full pt-1">
            <Link
              href="/kontakt#express-anfrage"
              className="inline-flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-white/10 hover:bg-white/15 text-neutral-200 text-sm font-semibold border border-white/10 transition-colors"
            >
              <Ruler className="w-4 h-4 text-orange-400" />
              <span>Kostenloses Vor-Ort-Aufmaß anfordern</span>
            </Link>
          </div>

          <div className="flex flex-col items-center gap-2 mt-4">
            <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-neutral-200 font-medium">
                {socialProof}
              </span>
            </div>
            <span className="text-xs text-neutral-400 text-center max-w-sm">
              {subtitle}
            </span>
          </div>

          {showQuickForm && (
            <div className="w-full max-w-xl mx-auto mt-10 text-left">
              <LeadQuickForm
                variant="card"
                sourceTag={quickFormSource || serviceContext || 'final-cta'}
                heading="Kostenfreies Vor-Ort-Aufmaß anfordern"
                subheading="Tragen Sie Ihre Kontaktdaten ein – Meister Deniz Tezgel meldet sich innerhalb von 24 Stunden persönlich."
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export { FinalCTA };
