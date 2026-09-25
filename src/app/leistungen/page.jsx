"use client";

import React from 'react';
import Link from 'next/link';
import {
  Droplets,
  Sparkles,
  Sun,
  ShieldCheck,
  Check,
  ArrowRight,
  Award,
  Phone,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { SERVICES } from '@/config/services';
import { COMPANY_DATA, processSteps } from '@/config/company';
import TezgelAnfrageFunnel from '@/components/funnels/TezgelAnfrageFunnel';

export default function ServiceHubPage() {
  return (
    <div className="pt-36 pb-24 min-h-screen relative overflow-hidden">

      {/* Ambient Lighting Orbs */}
      <div className="ambient-glow-orange -top-24 -left-24 opacity-70" />
      <div className="ambient-glow-red top-96 -right-24 opacity-60" />
      <div className="ambient-glow-slate top-[1200px] left-1/3 opacity-40" />

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="ceramic-hero rounded-2xl p-8 sm:p-14 text-center space-y-5 relative overflow-hidden">

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="eyebrow">
              <Award className="w-3.5 h-3.5" />
              {COMPANY_DATA.authority.shortName} Fachbetrieb
            </span>
            <span className="eyebrow eyebrow-red">
              Aßlar &middot; Wetzlar &middot; Mittelhessen
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-tight">
            Handwerksleistungen &amp;{' '}
            <span className="text-ceramic-gradient">Fachgewerke</span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-700 max-w-3xl mx-auto leading-relaxed">
            Ob fugenarme XXL-Großformate im Badezimmer, repräsentatives Feinsteinzeug im Neubau oder witterungsbeständige Außenbeläge auf Stelzlagern: Fliesenverlegung Tezgel steht für millimetergenaue Präzision, normgerechte Verbundabdichtung nach DIN 18534 und konsequenten Staubschutz.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a href="#express-anfrage" className="btn-primary">
              <span>Vor-Ort-Aufmaß vereinbaren</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={COMPANY_DATA.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button-whatsapp text-sm"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Schnellkontakt</span>
            </a>
            <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost">
              <Phone className="w-4 h-4 text-orange-700" />
              <span>{COMPANY_DATA.contact.phone}</span>
            </a>
          </div>

        </div>
      </div>

      {/* Grid der 4 Fachgewerke */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative z-10" id="gewerke">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((srv) => (
            <article
              key={srv.id}
              id={srv.id}
              className="scroll-mt-28 glass-surface rounded-2xl p-8 sm:p-10 hover:border-orange-500/80 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(23,23,23,0.14)] transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="icon-chip w-14 h-14">
                    {srv.id === 'bad' && <Droplets className="w-7 h-7" />}
                    {srv.id === 'wohnen' && <Sparkles className="w-7 h-7" />}
                    {srv.id === 'aussen' && <Sun className="w-7 h-7" />}
                    {srv.id === 'untergrund' && <ShieldCheck className="w-7 h-7" />}
                  </div>
                  <span className="eyebrow eyebrow-neutral">
                    Geprüfte Fachkompetenz
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 mb-3 group-hover:text-orange-800 transition-colors">
                  {srv.name}
                </h2>

                <p className="text-sm text-neutral-700 mb-6 leading-relaxed">
                  {srv.detailText}
                </p>

                {/* Subcategories Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {srv.subcategories.map((sub) => (
                    <span
                      key={sub.id}
                      className="text-[11px] font-bold px-3 py-1 rounded-xl bg-neutral-50 text-neutral-700 border border-neutral-200"
                    >
                      {sub.name}
                    </span>
                  ))}
                </div>

                {/* Feature Bullet Points */}
                <div className="space-y-2 mb-8">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-600 block mb-2">
                    Ausstattungsmerkmale &amp; Vorteile:
                  </span>
                  <ul className="space-y-2">
                    {srv.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-700">
                        <Check className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  href={`/leistungen/${srv.id}`}
                  className="w-full sm:w-auto text-sm font-bold text-orange-800 hover:text-orange-700 flex items-center gap-1.5 transition-colors"
                >
                  <span>Ausführliche Fachdetails &amp; Ratgeber</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <a
                  href="#express-anfrage"
                  className="btn-ghost w-full sm:w-auto px-5 py-2.5 text-xs"
                >
                  Aufmaß anfragen
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* 3-Schritte Ablauf */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="eyebrow eyebrow-red mb-4">
            Ausführungs-Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            Ihr verlässlicher Weg zum neuen Traumbelag
          </h2>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {processSteps.map((step) => (
            <li
              key={step.step}
              className="group glass-surface rounded-2xl p-7 hover:-translate-y-0.5 hover:border-orange-500/80 transition-all duration-200"
            >
              <span className="font-display text-3xl font-black text-orange-700 tabular-nums block mb-3" aria-hidden="true">
                {step.step}
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest text-orange-800 block mb-1">
                {step.subtitle}
              </span>
              <h3 className="text-lg font-black text-neutral-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Express-Anfrage Funnel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-28" id="express-anfrage">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="eyebrow mb-4">
            Online-Bedarfsabfrage
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            Fordern Sie Ihr persönliches Angebot an
          </h2>
          <p className="text-sm sm:text-base text-neutral-700 mt-3">
            Wählen Sie Ihr Vorhaben in Aßlar, Wetzlar oder Hessen für ein kostenfreies Vor-Ort-Aufmaß.
          </p>
        </div>

        <TezgelAnfrageFunnel />
      </div>

    </div>
  );
}
