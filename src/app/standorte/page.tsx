import React from 'react';
import Link from 'next/link';
import { MapPin, PhoneCall, CheckCircle2, ArrowRight } from 'lucide-react';
import { CITIES, type CityData } from '@/config/cities';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import { buildGraph, buildBreadcrumbNode, buildWebPageNode, SITE_URL, ORG_ID } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = createMetadata({
  title: 'Standorte & Einsatzgebiete in Mittelhessen',
  description: 'Fliesenverlegung, Badsanierung und DIN 18534 Abdichtung vom Meisterbetrieb aus Aßlar – im Einsatz in Wetzlar, Gießen, Marburg, Limburg, Herborn und im gesamten Lahn-Dill-Kreis.',
  path: '/standorte',
});

const pageUrl = `${SITE_URL}/standorte`;
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Standorte', path: '/standorte' },
];

const standorteGraph = buildGraph([
  buildWebPageNode({
    url: pageUrl,
    name: 'Standorte & Einsatzgebiete in Mittelhessen | Fliesenverlegung Tezgel',
    description: 'Übersicht aller Städte und Gemeinden, in denen Fliesenverlegung Tezgel aus Aßlar Fliesen verlegt und Bäder saniert.',
    breadcrumbItems: breadcrumbs,
  }),
  buildBreadcrumbNode(breadcrumbs, pageUrl),
  {
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#collection`,
    name: 'Fliesenverlegung Tezgel – Standorte & Einsatzgebiete',
    description: 'Meisterbetrieb für Fliesen-, Platten- und Mosaikverlegung, Badsanierung und Verbundabdichtung in Mittelhessen.',
    publisher: { '@id': ORG_ID },
  },
]);

const REGIONS = Array.from(new Set(CITIES.map((city) => city.region)));

function distanceLabel(city: CityData) {
  if (city.name === COMPANY_DATA.headquarters.city) return 'Unser Firmensitz';
  if (city.distanceKm === 0) return 'Direkt neben unserem Firmensitz';
  return `ca. ${city.distanceKm} km ab Wetzlar`;
}

export default function StandorteOverviewPage() {
  const { headquarters, contact, business } = COMPANY_DATA;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <JsonLd schema={standorteGraph} />

      {/* Hero Section */}
      <section className="ceramic-band relative pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <span className="eyebrow">
            <MapPin className="w-3.5 h-3.5" />
            Mittelhessen &amp; Lahn-Dill-Kreis
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            Standorte &amp; Einsatzgebiete in <span className="text-ceramic-gradient">Mittelhessen</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Als Meisterbetrieb mit Firmensitz in der {headquarters.street} in {headquarters.postalCode}{' '}
            {headquarters.city} betreuen wir Privatkunden, Architekten und Bauherren in Wetzlar, Gießen, Herborn und
            ganz Mittelhessen – mit persönlicher Beratung vor Ort und handwerklicher Meisterqualität.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs">
              Vor-Ort-Aufmaß anfragen
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={`tel:${contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
              <PhoneCall className="w-4 h-4 text-emerald-700" />
              {contact.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto relative z-10">
        <div className="ambient-glow-mint -top-10 -left-32 opacity-60" />
        <div className="text-center max-w-3xl mx-auto mb-14 relative z-10">
          <span className="eyebrow eyebrow-sky mb-4">{CITIES.length} Städte &amp; Gemeinden</span>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
            Wählen Sie Ihre Stadt oder Gemeinde
          </h2>
          <p className="text-slate-700">
            Klicken Sie auf Ihren Wohnort, um mehr über unsere Fliesen- und Badleistungen und den Ablauf vor Ort zu
            erfahren. Entfernungen sind ungefähre Angaben ab Wetzlar.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {CITIES.map((city) => (
            <li key={city.slug}>
              <Link
                href={`/standorte/${city.slug}`}
                className="group glass-surface rounded-3xl p-6 h-full flex flex-col justify-between hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-[11px] font-black uppercase tracking-widest text-emerald-800">
                      {city.region}
                    </span>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full whitespace-nowrap tabular-nums">
                      {distanceLabel(city)}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-emerald-800 transition-colors">
                    {city.name}
                  </h3>

                  <p className="text-slate-700 text-sm leading-relaxed mb-6">
                    {city.description}
                  </p>
                </div>

                <span className="pt-4 border-t border-slate-200 flex items-center justify-between text-sm font-bold text-emerald-800">
                  <span>Details &amp; Leistungen</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Services everywhere */}
      <section className="py-16 bg-white border-y border-slate-200 relative z-10" aria-labelledby="leistungen-ueberall">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="eyebrow mb-4">In allen Einsatzgebieten</span>
            <h2 id="leistungen-ueberall" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Unsere Leistungen vor Ort
            </h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {business.primaryServices.map((service) => (
              <li
                key={service}
                className="flex items-start gap-3 rounded-2xl bg-slate-50 border border-slate-200 p-4 text-sm font-semibold text-slate-800"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link
              href="/leistungen"
              className="text-sm font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2 inline-flex items-center gap-1.5"
            >
              Alle Leistungen im Überblick
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-20 px-4 max-w-5xl mx-auto relative z-10">
        <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
          <span className="eyebrow eyebrow-neutral">Weitere Orte auf Anfrage</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Ihre Stadt ist nicht aufgeführt?
          </h2>
          <p className="text-slate-700 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Wir sind unter anderem im {REGIONS.join(', ')} unterwegs. Rufen Sie uns einfach an – wir klären gern,
            ob wir Ihr Projekt an Ihrem Wohnort übernehmen können.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <a href={`tel:${contact.phoneLink}`} className="btn-primary px-7 py-3.5 text-xs w-full sm:w-auto">
              <PhoneCall className="w-4 h-4" />
              <span>{contact.phone}</span>
            </a>
            <Link href="/kontakt" className="btn-ghost px-7 py-3.5 text-xs w-full sm:w-auto">
              Kostenlose Beratung anfragen
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
