"use client";

import React from "react";
import { Phone, MessageCircle, MapPin, Clock, Ruler, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { triggerHaptic } from "@/lib/haptics";
import HeartbeatCTA from "@/components/animations/HeartbeatCTA";

interface LocationContactProps {
  cityName?: string;
  className?: string;
}

export default function LocationContact({
  cityName = "Aßlar & Wetzlar",
  className = "",
}: LocationContactProps) {
  return (
    <section className={`py-12 sm:py-16 bg-white border-y border-neutral-200/80 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="bg-gradient-to-br from-neutral-900 via-neutral-850 to-neutral-950 rounded-3xl p-6 sm:p-10 md:p-12 text-white shadow-xl border border-neutral-800 relative overflow-hidden text-center">
          <div
            className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/30 border border-orange-500/30 text-orange-400 text-xs font-bold mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>Ihr regionaler Ansprechpartner für {cityName}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-4">
              Fliesenleger oder Badsanierung in {cityName} gesucht?
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-8">
              Fachbetriebsleiter Deniz Tezgel berät Sie in {cityName} persönlich und unverbindlich. Vereinbaren Sie
              direkt Ihr kostenfreies Aufmaß vor Ort.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
              <HeartbeatCTA className="w-full sm:w-auto">
                <a
                  href={siteConfig.contact.phone.link}
                  onClick={() => triggerHaptic("medium")}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-base shadow-lg shadow-orange-950/40 transition-all cursor-pointer"
                >
                  <Phone className="w-5 h-5" />
                  <span>{siteConfig.contact.phone.formatted}</span>
                </a>
              </HeartbeatCTA>

              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerHaptic("light")}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-md transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Chat</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-neutral-800 text-xs text-neutral-400">
              <div className="flex items-center justify-center gap-1.5">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <span>{siteConfig.openingHours.store}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Ruler className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Vor-Ort-Aufmaß kostenfrei</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verbindlicher Festpreis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
