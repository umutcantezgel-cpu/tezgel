"use client";

import React from "react";
import { Phone, Clock, ShieldCheck, Star, MessageCircle, Ruler } from "lucide-react";
import HeroContactForm from "@/components/forms/HeroContactForm";
import GoogleIcon from "@/components/ui/GoogleIcon";
import { siteConfig } from "@/lib/config";
import { triggerHaptic } from "@/lib/haptics";

export default function ContactSection({
  title = "In 2 Minuten zum kostenfreien Vor-Ort-Aufmaß",
  subtitle = "Rufen Sie direkt an oder senden Sie uns Ihre Projekt-Eckdaten. Fachbetriebsleiter Deniz Tezgel meldet sich persönlich bei Ihnen.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section id="express-anfrage" aria-labelledby="kontakt-heading" className="bg-white relative px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-3">
            <Ruler className="w-3.5 h-3.5 text-orange-600" />
            <span>Kostenloses Vor-Ort-Aufmaß</span>
          </div>
          <h2 id="kontakt-heading" className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 mt-3 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Linke Spalte: Trust & Sofort-Kontakt */}
          <div className="lg:col-span-5 bg-gradient-to-br from-neutral-900 via-neutral-850 to-neutral-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-neutral-800 flex flex-col justify-between h-full relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                Direkter Meister-Kontakt
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1 mb-3">
                Lieber direkt persönlich sprechen?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                Rufen Sie uns unverbindlich an. Wir klären Ihre Fragen zu Fliesen,
                Untergrund, Badmaßen und Zeitfenstern direkt am Telefon.
              </p>

              <a
                href={siteConfig.contact.phone.link}
                onClick={() => triggerHaptic("medium")}
                className="group flex items-center justify-center gap-3 w-full h-14 bg-orange-600 hover:bg-orange-500 text-white font-bold text-base sm:text-lg rounded-xl shadow-lg shadow-orange-950/40 transition-all duration-200 cursor-pointer mb-3"
              >
                <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                <span>{siteConfig.contact.phone.formatted}</span>
              </a>

              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerHaptic("light")}
                className="flex items-center justify-center gap-2.5 w-full h-12 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/15 transition-colors mb-6"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Aufmaß-Termin per WhatsApp anfragen</span>
              </a>

              <div className="space-y-2 text-xs text-neutral-300 border-t border-neutral-800 pt-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>{siteConfig.openingHours.store}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Eingetragener HWK-Fachbetrieb Wiesbaden</span>
                </div>
              </div>
            </div>

            {/* Google Reviews Box */}
            <div className="mt-8 pt-6 border-t border-neutral-800 relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-semibold">
                  <GoogleIcon size={14} />
                  <span>5,0 Sterne (27 Bewertungen)</span>
                </div>
              </div>
              <p className="italic text-xs text-neutral-300 leading-relaxed">
                &quot;Handwerklich perfekt, saubere u. präzise Ausführung und absolut termintreu.
                Wir können die Firma Tezgel uneingeschränkt empfehlen.&quot;
              </p>
              <span className="text-[11px] text-neutral-400 font-semibold mt-2 block">
                – Elke S., verifizierte Google-Rezension
              </span>
            </div>
          </div>

          {/* Rechte Spalte: Formular */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200/90 p-4 sm:p-6 shadow-sm">
            <HeroContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
