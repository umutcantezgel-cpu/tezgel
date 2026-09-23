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
    <div className="pt-36 pb-24 min-h-screen relative overflow-hidden bg-[#060911] text-white">
      
      {/* Ambient Lighting Orbs */}
      <div className="ambient-glow-mint -top-24 -left-24 opacity-35" />
      <div className="ambient-glow-sky top-96 -right-24 opacity-30" />
      <div className="ambient-glow-slate top-[1200px] left-1/3 opacity-40" />

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="glass-surface-dark rounded-[3rem] p-8 sm:p-14 text-center space-y-5 border border-white/15 shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-black uppercase tracking-wider border border-emerald-500/30">
              <Award className="w-3.5 h-3.5" />
              HWK Wiesbaden Meisterbetrieb
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-sky-500/15 text-sky-300 text-xs font-black uppercase tracking-wider border border-sky-400/30">
              Aßlar &middot; Wetzlar &middot; Mittelhessen
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Exklusive Handwerksleistungen &amp; Fachgewerke
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Ob fugenarme XXL-Großformate im Badezimmer, repräsentatives Feinsteinzeug im Neubau oder witterungsbeständige Außenbeläge auf Stelzlagern: Fliesenverlegung Tezgel garantiert millimetergenaue Präzision, zertifizierte Verbundabdichtung nach DIN 18534 und kompromisslosen Staubschutz.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a href="#express-anfrage" className="glass-button-primary">
              <span>Vor-Ort-Aufmaß vereinbaren</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href={COMPANY_DATA.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button-whatsapp"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Schnellkontakt</span>
            </a>
          </div>

        </div>
      </div>

      {/* Grid der 4 Fachgewerke */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative z-10" id="gewerke">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              id={srv.id}
              className="glass-surface rounded-[2.5rem] p-8 sm:p-10 border border-white/15 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                    {srv.id === 'bad' && <Droplets className="w-7 h-7" />}
                    {srv.id === 'wohnen' && <Sparkles className="w-7 h-7" />}
                    {srv.id === 'aussen' && <Sun className="w-7 h-7" />}
                    {srv.id === 'untergrund' && <ShieldCheck className="w-7 h-7" />}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
                    Geprüfte Fachkompetenz
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 group-hover:text-emerald-300 transition-colors">
                  {srv.name}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                  {srv.detailText}
                </p>

                {/* Subcategories Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {srv.subcategories.map((sub) => (
                    <span 
                      key={sub.id}
                      className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/[0.05] text-slate-300 border border-white/10"
                    >
                      {sub.name}
                    </span>
                  ))}
                </div>

                {/* Feature Bullet Points */}
                <div className="space-y-2 mb-8">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                    Ausstattungsmerkmale &amp; Vorteile:
                  </span>
                  <ul className="space-y-2">
                    {srv.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  href={`/leistungen/${srv.id}`}
                  className="w-full sm:w-auto text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>Ausführliche Fachdetails &amp; Ratgeber</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <a
                  href="#express-anfrage"
                  className="w-full sm:w-auto text-xs font-black px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-center border border-white/15 transition-all"
                >
                  Aufmaß anfragen
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3-Schritte Ablauf */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-black tracking-wider text-sky-400 bg-sky-500/10 px-4 py-1.5 rounded-full border border-sky-400/30 mb-2 inline-block">
            Ausführungs-Standards
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Ihr verlässlicher Weg zum neuen Traumbelag
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {processSteps.map((step, idx) => (
            <div key={idx} className="glass-surface rounded-3xl p-7 border border-white/15">
              <span className="text-3xl font-black text-emerald-400 font-mono block mb-3">
                {step.step}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                {step.subtitle}
              </span>
              <h4 className="text-lg font-black text-white mb-2">
                {step.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Express-Anfrage Funnel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="express-anfrage">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase font-black tracking-wider text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/30 mb-2 inline-block">
            Online-Bedarfsabfrage
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Fordern Sie Ihr persönliches Angebot an
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Wählen Sie Ihr Vorhaben in Aßlar, Wetzlar oder Hessen für ein kostenfreies Vor-Ort-Aufmaß.
          </p>
        </div>

        <TezgelAnfrageFunnel />
      </div>

    </div>
  );
}
