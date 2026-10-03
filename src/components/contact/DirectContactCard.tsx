'use client';

import React from 'react';
import { Phone, MessageSquare, Mail, Clock, MapPin, Award, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '@/shared/config/site';

export interface DirectContactCardProps {
  className?: string;
}

/**
 * Direct Contact Information Card
 * Immediate direct contact pathways to Inhaber Deniz Tezgel without wait times.
 */
export function DirectContactCard({ className = '' }: DirectContactCardProps) {
  return (
    <div
      className={`p-6 sm:p-8 rounded-2xl bg-neutral-900 text-white border border-neutral-800 shadow-2xl relative overflow-hidden ${className}`}
    >
      {/* Background Accent Mesh */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>Eingetragener HWK-Fachbetrieb</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black tracking-tight">Direkter Kontakt</h3>
        <p className="mt-1 text-xs sm:text-sm text-neutral-400 leading-relaxed">
          Sprechen Sie direkt mit Inhaber Deniz Tezgel – ohne Callcenter oder Warteschleifen.
        </p>

        <div className="mt-6 space-y-3.5 text-sm">
          {/* Phone */}
          <a
            href={`tel:${SITE_CONFIG.contact.telephone}`}
            className="group flex items-center justify-between p-3.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 hover:text-white transition-all border border-neutral-700/60 hover:border-orange-500/50"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-orange-500/20 text-orange-400 group-hover:scale-105 transition-transform">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">Büro / Festnetz</div>
                <div className="font-bold text-white">{SITE_CONFIG.contact.telephoneFormatted}</div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-orange-400 transition-colors" />
          </a>

          {/* WhatsApp / Mobile */}
          <a
            href={SITE_CONFIG.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-3.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 hover:text-white transition-all border border-neutral-700/60 hover:border-green-500/50"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-green-500/20 text-green-400 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">Mobil &amp; WhatsApp</div>
                <div className="font-bold text-white">{SITE_CONFIG.contact.mobileFormatted}</div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-green-400 transition-colors" />
          </a>

          {/* Email */}
          <a
            href={`mailto:${SITE_CONFIG.contact.email}`}
            className="group flex items-center justify-between p-3.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 hover:text-white transition-all border border-neutral-700/60 hover:border-orange-500/50"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-orange-500/20 text-orange-400 group-hover:scale-105 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">E-Mail Adresse</div>
                <div className="font-semibold text-white">{SITE_CONFIG.contact.email}</div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-orange-400 transition-colors" />
          </a>

          {/* Hours */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-800/40 border border-neutral-700/40 text-neutral-300">
            <div className="p-2.5 rounded-lg bg-neutral-700/40 text-neutral-400 shrink-0 mt-0.5">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">Bürozeiten</div>
              <div className="font-medium text-white text-xs mt-0.5">
                Mo–Do: {SITE_CONFIG.contact.openingHours.opens} – {SITE_CONFIG.contact.openingHours.closes} Uhr
              </div>
              <div className="font-medium text-neutral-300 text-xs">
                Fr: {SITE_CONFIG.contact.openingHours.opens} – {SITE_CONFIG.contact.openingHours.fridayCloses} Uhr
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">
                Sa: 08:00 – 14:00 Uhr (Vor-Ort-Termine nach Vereinbarung)
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-800/40 border border-neutral-700/40 text-neutral-300">
            <div className="p-2.5 rounded-lg bg-neutral-700/40 text-neutral-400 shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">Betriebssitz (HQ)</div>
              <div className="font-semibold text-white text-xs mt-0.5">
                {SITE_CONFIG.headquarters.streetAddress}
              </div>
              <div className="text-xs text-neutral-300">
                {SITE_CONFIG.headquarters.postalCode} {SITE_CONFIG.headquarters.addressLocality} (Mittelhessen)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DirectContactCard;
