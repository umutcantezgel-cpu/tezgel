"use client";

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Mail, 
  Award, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  MessageSquare,
  Droplets,
  Sun,
  Layers,
  ChevronRight
} from 'lucide-react';
import { SERVICES } from '@/config/services';
import { COMPANY_DATA, processSteps } from '@/config/company';
import TezgelAnfrageFunnel from '@/components/funnels/TezgelAnfrageFunnel';

export default function ServiceDetailPage() {
  const { id } = useParams();

  const service = useMemo(() => {
    return SERVICES.find(s => s.id === id) || SERVICES[0];
  }, [id]);

  const relatedServices = useMemo(() => {
    return SERVICES.filter(s => s.id !== service.id);
  }, [service.id]);

  return (
    <div className="pt-36 pb-24 min-h-screen relative overflow-hidden bg-[#060911] text-white">
      
      {/* Ambient Lighting Orbs */}
      <div className="ambient-glow-mint -top-20 -left-20 opacity-35" />
      <div className="ambient-glow-sky top-96 -right-20 opacity-25" />

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
        <div className="glass-surface-dark rounded-[3rem] p-8 sm:p-12 space-y-6 border border-white/15 shadow-2xl relative overflow-hidden">
          
          <Link href="/leistungen" className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" />
            Zurück zur Leistungsübersicht
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="flex-1 space-y-4">
              <span className="text-xs uppercase font-black tracking-wider text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/30 inline-block">
                Meister-Fachgewerk &middot; Fliesenverlegung Tezgel
              </span>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                {service.name}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
                {service.detailText}
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
              <a
                href="#express-anfrage"
                className="glass-button-primary text-center"
              >
                <span>Aufmaß anfordern</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_DATA.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button-whatsapp text-center"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp Direkt</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Subcategories Bento */}
      {service.subcategories && service.subcategories.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl font-black text-white">
              Spezialisierungen in {service.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.subcategories.map((sub, idx) => (
              <div 
                key={idx} 
                className="glass-surface p-6 rounded-3xl text-center hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 border border-white/10"
              >
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-emerald-500/30 font-bold">
                  {service.id === 'bad' && <Droplets className="w-5 h-5" />}
                  {service.id === 'wohnen' && <Sparkles className="w-5 h-5" />}
                  {service.id === 'aussen' && <Sun className="w-5 h-5" />}
                  {service.id === 'untergrund' && <ShieldCheck className="w-5 h-5" />}
                </div>
                <h3 className="font-bold text-sm text-white">{sub.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail Content & Sticky Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Description & Features */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-surface p-8 sm:p-10 rounded-[2.5rem] space-y-6 border border-white/15">
              <h2 className="text-2xl font-black text-white">Fachkompetenz &amp; Ausführungsdetails</h2>
              
              <p className="text-sm text-slate-300 leading-relaxed">
                {service.shortDescription}
              </p>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400 block">
                  Ihre handwerklichen Vorteile:
                </span>
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-200">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-slate-300 leading-relaxed">
                <h3 className="font-black text-white text-sm mb-1">
                  Warum Meisterqualität von Fliesenverlegung Tezgel?
                </h3>
                Mit modernster Schneid- und Nivelliertechnik garantieren wir planebene Oberflächen ohne Kantenversatz. Bei Sanierungen im bewohnten Bestand setzen wir Schonvliese und Staubabsaugungen ein – für ein staubarmes und stressfreies Ergebnis.
              </div>
            </div>

            {/* Other Services */}
            <div className="glass-surface p-8 rounded-3xl border border-white/15">
              <h3 className="text-lg font-black text-white mb-4">
                Weitere Gewerke von Fliesenverlegung Tezgel:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedServices.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/leistungen/${rel.id}`}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-400/50 transition-all group block"
                  >
                    <h4 className="font-bold text-xs text-white group-hover:text-emerald-400 transition-colors">
                      {rel.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 block mt-1">Details ansehen &rarr;</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="glass-surface-dark p-8 rounded-[2.5rem] border border-white/20 shadow-2xl sticky top-28 space-y-6">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 inline-block">
              Direktkontakt
            </span>

            <h3 className="text-xl font-black text-white">
              Projekt in {service.name} anfragen?
            </h3>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              Inhaber Deniz Tezgel berät Sie gerne persönlich vor Ort in Aßlar, Wetzlar, Mittelhessen oder ganz Hessen.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <a 
                href={`tel:${COMPANY_DATA.contact.phoneLink}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.05] border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{COMPANY_DATA.contact.phone}</span>
              </a>

              <a 
                href={COMPANY_DATA.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] font-bold hover:bg-[#25D366]/25 transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp Chat</span>
              </a>
            </div>

            <a
              href="#express-anfrage"
              className="block w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-black text-xs text-center shadow-md hover:shadow-lg transition-all"
            >
              Kostenfreies Aufmaß buchen &rarr;
            </a>

            <div className="pt-4 border-t border-white/10 text-[11px] text-slate-400 italic">
              „{COMPANY_DATA.motto}“
            </div>
          </div>

        </div>
      </div>

      {/* Embedded Funnel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-10" id="express-anfrage">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-black tracking-wider text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/30 mb-2 inline-block">
            Express-Aufmaß
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Jetzt unverbindlich anfragen
          </h2>
        </div>
        <TezgelAnfrageFunnel />
      </div>

    </div>
  );
}
