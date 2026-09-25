import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle2,
  ArrowRight,
  Phone,
  ShieldCheck,
  Sparkles,
  MessageSquare,
  Droplets,
  Sun,
  MapPin
} from 'lucide-react';
import { SERVICES } from '@/config/services';
import { CITIES } from '@/config/cities';
import { COMPANY_DATA } from '@/config/company';
import TezgelAnfrageFunnel from '@/components/funnels/TezgelAnfrageFunnel';

export function generateStaticParams() {
  return SERVICES.map((service) => ({ id: service.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const service = SERVICES.find((s) => s.id === id);
  if (!service) return { title: 'Fachgewerk' };

  return {
    title: `${service.name} – Fachbetrieb Tezgel`,
    description: `${service.shortDescription}. Fachbetrieb für Fliesenverlegung & Sanierung in Aßlar, Wetzlar und ganz Hessen.`,
    alternates: { canonical: `/leistungen/${id}` }
  };
}

export default async function ServiceDetailPage({ params }) {
  const { id } = await params;
  const service = SERVICES.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  const relatedServices = SERVICES.filter((s) => s.id !== service.id);

  return (
    <div className="pt-36 pb-24 min-h-screen relative overflow-hidden">

      {/* Ambient Lighting Orbs */}
      <div className="ambient-glow-orange -top-20 -left-20 opacity-70" />
      <div className="ambient-glow-red top-96 -right-20 opacity-60" />

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
        <div className="ceramic-hero rounded-2xl p-8 sm:p-12 space-y-6 relative overflow-hidden">

          <Link href="/leistungen" className="inline-flex items-center text-xs font-bold text-neutral-700 hover:text-orange-800 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" />
            Zurück zur Leistungsübersicht
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="flex-1 space-y-4">
              <span className="eyebrow">
                Fachgewerk &middot; {COMPANY_DATA.legalName}
              </span>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
                {service.name}
              </h1>

              <p className="text-sm sm:text-base text-neutral-700 max-w-2xl leading-relaxed">
                {service.detailText}
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
              <a
                href="#express-anfrage"
                className="btn-primary"
              >
                <span>Aufmaß anfordern</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_DATA.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button-whatsapp text-sm"
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
            <h2 className="text-2xl font-black text-neutral-900">
              Spezialisierungen in {service.name}
            </h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.subcategories.map((sub) => (
              <li
                key={sub.id}
                className="group glass-surface p-6 rounded-2xl text-center hover:border-orange-500/80 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="icon-chip w-12 h-12 mx-auto mb-3">
                  {service.id === 'bad' && <Droplets className="w-5 h-5" />}
                  {service.id === 'wohnen' && <Sparkles className="w-5 h-5" />}
                  {service.id === 'aussen' && <Sun className="w-5 h-5" />}
                  {service.id === 'untergrund' && <ShieldCheck className="w-5 h-5" />}
                </div>
                <h3 className="font-bold text-sm text-neutral-900">{sub.name}</h3>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Detail Content & Sticky Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* Main Description & Features */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-surface p-8 sm:p-10 rounded-2xl space-y-6">
              <h2 className="text-2xl font-black text-neutral-900">Fachkompetenz &amp; Ausführungsdetails</h2>

              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                {service.shortDescription}
              </p>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-black uppercase tracking-wider text-orange-800 block">
                  Ihre handwerklichen Vorteile:
                </span>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-orange-50/50 border border-orange-200 text-sm text-neutral-700 leading-relaxed">
                <h3 className="font-black text-neutral-900 text-sm mb-1">
                  Warum Fachqualität von {COMPANY_DATA.legalName}?
                </h3>
                Mit moderner Schneid- und Nivelliertechnik sorgen wir für planebene Oberflächen ohne Kantenversatz. Bei Sanierungen im bewohnten Bestand setzen wir Schonvliese und Staubabsaugungen ein – für ein staubarmes und stressfreies Ergebnis.
              </div>
            </div>

            {/* Other Services */}
            <div className="glass-surface p-8 rounded-2xl">
              <h2 className="text-lg font-black text-neutral-900 mb-4">
                Weitere Gewerke von {COMPANY_DATA.legalName}:
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedServices.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/leistungen/${rel.id}`}
                    className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 hover:bg-white hover:border-orange-500/80 hover:-translate-y-0.5 transition-all duration-200 group block"
                  >
                    <h3 className="font-bold text-sm text-neutral-900 group-hover:text-orange-800 transition-colors">
                      {rel.name}
                    </h3>
                    <span className="text-xs font-bold text-orange-800 flex items-center gap-1 mt-1">
                      Details ansehen
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Service by city */}
            <div className="glass-surface p-8 rounded-2xl">
              <h2 className="text-lg font-black text-neutral-900 mb-1">
                {service.name} in Ihrer Region
              </h2>
              <p className="text-sm text-neutral-700 mb-4">
                Vom Firmensitz in {COMPANY_DATA.headquarters.city} aus im Lahn-Dill-Kreis und in Mittelhessen im Einsatz.
              </p>
              <ul className="flex flex-wrap gap-2">
                {CITIES.map((city) => (
                  <li key={city.slug}>
                    <Link
                      href={`/leistungen/${service.id}/${city.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-800 hover:border-orange-500/80 hover:text-orange-800 transition-colors"
                    >
                      <MapPin className="w-3 h-3 text-orange-600" />
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="glass-surface border-neutral-200 p-8 rounded-2xl shadow-xl lg:sticky lg:top-28 space-y-6">
            <span className="eyebrow">
              Direktkontakt
            </span>

            <h2 className="text-xl font-black text-neutral-900">
              Projekt in {service.name} anfragen?
            </h2>

            <p className="text-sm text-neutral-700 leading-relaxed">
              Inhaber {COMPANY_DATA.owner.fullName} berät Sie gerne persönlich vor Ort in Aßlar, Wetzlar, Mittelhessen oder ganz Hessen.
            </p>

            <div className="space-y-3 pt-2 text-sm">
              <a
                href={`tel:${COMPANY_DATA.contact.phoneLink}`}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 font-bold hover:bg-white hover:border-orange-500/80 transition-all"
              >
                <Phone className="w-4 h-4 text-orange-600" />
                <span>{COMPANY_DATA.contact.phone}</span>
              </a>

              <a
                href={COMPANY_DATA.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-800 font-bold hover:border-green-500/80 transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp Chat</span>
              </a>
            </div>

            <a
              href="#express-anfrage"
              className="btn-primary w-full text-xs"
            >
              Kostenfreies Aufmaß buchen
              <ArrowRight className="w-4 h-4" />
            </a>

            <p className="pt-4 border-t border-neutral-200 text-xs text-neutral-600 italic">
              &bdquo;{COMPANY_DATA.motto}&ldquo;
            </p>
          </aside>

        </div>
      </div>

      {/* Embedded Funnel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-10 scroll-mt-28" id="express-anfrage">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="eyebrow mb-4">
            Express-Aufmaß
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            Jetzt unverbindlich anfragen
          </h2>
        </div>
        <TezgelAnfrageFunnel />
      </div>

    </div>
  );
}
