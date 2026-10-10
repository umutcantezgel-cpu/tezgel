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
import { buildGraph, buildServiceNode, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';
import TezgelAnfrageFunnel from '@/components/funnels/TezgelAnfrageFunnel';
import { PricingCalculator } from '@/components/pricing/PricingCalculator';
import FAQAccordion from '@/components/ui/FAQAccordion';
import { FinalCTA } from '@/components/ui/FinalCTA';

export function generateStaticParams() {
  return SERVICES.map((service) => ({ id: service.id }));
}

export default async function ServiceDetailPage({ params }) {
  const { id } = await params;
  const service = SERVICES.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  const relatedServices = SERVICES.filter((s) => s.id !== service.id);

  const serviceH1Titles = {
    bad: 'Badsanierung & Komplettbäder: Bäder & Wellness in Wetzlar',
    wohnen: 'Fliesenverlegung Wohnbereich & Neubau in Wetzlar',
    aussen: 'Balkon- & Terrassensanierung in Wetzlar & Mittelhessen',
    untergrund: 'DIN 18534 Abdichtung & Untergrundvorbereitung in Wetzlar',
  };
  const serviceIntroTexts = {
    bad: 'Für Ihre professionelle Badsanierung & schlüsselfertige Komplettbäder sowie exklusive Bäder & Wellness in Wetzlar und Mittelhessen realisieren wir maßgeschneiderte Wohlfühloasen. Wir verarbeiten raumhohe Fliesenformate mit minimalen Fugenanteilen, integrieren barrierefreie Walk-In-Bereiche und garantieren zertifizierten Staubschutz für Ihr bewohntes Zuhause.',
    wohnen: 'Für anspruchsvolle Fliesenverlegung Wohnbereich & Neubau in Wetzlar verlegen wir exklusives Feinsteinzeug und Naturstein mit perfekter Fluchtung. Wir planen Fugenachsen raumübergreifend, stimmen den Schichtenaufbau exakt auf Ihre Fußbodenheizung ab und schaffen dauerhaft plane, schwellenlose Wohnflächen.',
    aussen: 'Für die nachhaltige Balkon- & Terrassensanierung in Wetzlar & Mittelhessen ist Fliesenverlegung Tezgel Ihr spezialisierter Fachbetrieb: Mit aufgestelzter 2-cm-Keramik auf verstellbaren Stelzlagern und optimalem Gefälleaufbau verhindern wir stehendes Wasser, Frostausbrüche und unansehnliche Fugenverfärbungen ein für alle Mal.',
    untergrund: 'Vor jedem Belagsaufbau steht die fachgerechte DIN 18534 Abdichtung & Untergrundvorbereitung in Wetzlar und der gesamten Region. Mit präziser CM-Restfeuchtemessung, Risssanierung und hochelastischen Verbundabdichtungen schützen wir Ihr Bauwerk verlässlich vor Durchfeuchtung und Bauschäden.',
  };
  const serviceQualityNotes = {
    bad: 'Bei der Badsanierung verbinden wir moderne Verlegemethoden mit kompromisslosem Staubschutz: Staubschutztüren, Unterdruckabsaugung und Schonvliese schützen Ihr bewohntes Zuhause. Verbundabdichtungen nach DIN 18534 garantieren jahrzehntelange Sicherheit gegen Feuchtigkeit.',
    wohnen: 'In Wohnräumen und offenen Küchen sorgen präzise Lasernivellierung und Gehrungsschnitte (Jolly-Kanten) für ein makelloses, ebenes Fugenbild. Wir stimmen den Aufbau exakt auf die Heizkurve Ihrer Fußbodenheizung ab.',
    aussen: 'Auf Terrassen und Balkonen verhindern entkoppelte Stelzlagersysteme und frostsichere 2-cm-Keramikplatten Ausblühungen und Frostschäden. Wir sorgen für das notwendige 2%-Gefälle zur zuverlässigen Wasserabführung.',
    untergrund: 'Vom CM-Messgerät bis zur Rissverharzung und Entkopplung: Wir schaffen für jeden Alt- und Neubauuntergrund die normgerechte Ebenheit und Festigkeit, bevor der hochwertige Belag verlegt wird.',
  };
  const serviceSidebarIntros = {
    bad: `Fachbetriebsleiter ${COMPANY_DATA.owner.fullName} berät Sie zur schlüsselfertigen Badsanierung, Walk-In-Duschen und DIN 18534 Abdichtung persönlich bei Ihnen vor Ort in Aßlar, Wetzlar oder Mittelhessen.`,
    wohnen: `Fachbetriebsleiter ${COMPANY_DATA.owner.fullName} berät Sie persönlich zu Großformaten, Wohnraumfliesen und Fußbodenheizungs-Belegreife direkt in Ihren Räumlichkeiten.`,
    aussen: `Fachbetriebsleiter ${COMPANY_DATA.owner.fullName} begutachtet Ihren Balkon oder Ihre Terrasse vor Ort: Gefälle, Abdichtungsanschlüsse und Stelzlagersysteme.`,
    untergrund: `Fachbetriebsleiter ${COMPANY_DATA.owner.fullName} prüft Ihren Estrich und Untergrund persönlich: CM-Restfeuchtemessung, Risssanierung und Entkopplungskonzepte.`,
  };
  const serviceFaqs = {
    bad: [
      {
        q: 'Wie läuft die Badsanierung von der Planung bis zur Übergabe ab?',
        a: 'Nach Ihrer Anfrage begutachten wir das Bad vor Ort in Aßlar, Wetzlar oder Mittelhessen. Wir prüfen Wand- und Bodenuntergründe, besprechen Sanitärobjekte und Fugenachsen und übergeben Ihnen ein verbindliches Festpreisangebot mit festem Zeitplan.',
      },
      {
        q: 'Welche Abdichtungsnormen gelten für Dusche und Badewanne?',
        a: 'Wir dichten alle Nass- und Spritzwasserbereiche streng nach DIN 18534 (Wassereinwirkungsklassen W1-I bis W2-I) mit geprüften Dichtbändern und Dichtmanschetten ab. Ihr bewohntes Zuhause schützen wir mit Staubschutztüren.',
      },
      {
        q: 'Koordiniert Fliesenverlegung Tezgel auch Sanitär- und Elektroarbeiten?',
        a: 'Auf Wunsch koordinieren wir Ihr Bad aus einer Hand gemeinsam mit befreundeten regionalen Sanitär- und Elektrofachbetrieben – von der Demontage bis zur fertigen Endreinigung.',
      },
    ],
    wohnen: [
      {
        q: 'Wie werden Großformatfliesen im Wohnbereich eben verlegt?',
        a: 'Wir nutzen spezielle mechanische Nivelliersysteme und hochflexible Dünnbettkleber (C2-Klassifizierung), um Kantenversätze (Überzähne) selbst bei Fliesenformaten von 120x120 cm oder 120x278 cm komplett auszuschließen.',
      },
      {
        q: 'Kann Feinsteinzeug direkt auf einer Fußbodenheizung verlegt werden?',
        a: 'Ja, Keramik und Feinsteinzeug besitzen eine hervorragende Wärmeleitfähigkeit. Voraussetzung ist das ordnungsgemäße Funktions- und Belegreifheizen des Estrichs sowie das Einhalten von Bewegungsfugen über den Heizkreisgrenzen.',
      },
      {
        q: 'In welchem Umkreis verlegen Sie Wohnraum- und Fliesenbeläge?',
        a: 'Wir verlegen Wohn- und Bodenfliesen im Umkreis von ca. 45 km rund um unseren Firmensitz in Aßlar – insbesondere in Wetzlar, Gießen, Butzbach, Herborn und Marburg.',
      },
    ],
    aussen: [
      {
        q: 'Warum sind Stelzlager für Balkon und Terrasse besonders langlebig?',
        a: 'Stelzlager ermöglichen eine aufgestelzte Verlegung von 2-cm-Feinsteinzeugplatten ohne starren Mörtel. Regenwasser fließt durch die offenen Fugen direkt auf die Abdichtungsebene ab, wodurch Frostabplatzungen und Staunässe unmöglich werden.',
      },
      {
        q: 'Welches Mindestgefälle ist im Außenbereich vorgeschrieben?',
        a: 'Wir stellen im Untergrund ein Mindestgefälle von 1,5 bis 2 % vom Gebäude weg her. So wird sichergestellt, dass Niederschlagswasser rasch abfließt und Türschwellen nach DIN 18531 / 18533 geschützt bleiben.',
      },
      {
        q: 'Können vorhandene Beton- oder Fliesenbeläge überbaut werden?',
        a: 'Sofern die Tragfähigkeit und die Anschlusshöhen an Balkontüren ausreichen, können alte Beläge oft nach Gefällekorrektur mit Stelzlagern schadensfrei überbaut werden.',
      },
    ],
    untergrund: [
      {
        q: 'Warum ist die CM-Restfeuchtemessung vor dem Fliesenlegen Pflicht?',
        a: 'Die CM-Messung ist das handwerksrechtlich anerkannte Verfahren zur Bestimmung der Belegreife. Verfrühtes Belegen auf feuchtem Zement- oder Calciumsulfatestrich führt unweigerlich zu Hohlstellen, Rissen oder Schimmel.',
      },
      {
        q: 'Wie werden Risse im Estrich vor dem Verlegen saniert?',
        a: 'Risse werden quer aufgeflext, mit Estrichklammern armiert und kraftschlüssig mit 2-Komponenten-Epoxidharz vergossen. Anschließend wird die Fläche mit Quarzsand abgestreut, um optimalen Haftverbund zu sichern.',
      },
      {
        q: 'Wann ist eine Entkopplungsmatte erforderlich?',
        a: 'Bei Mischuntergründen, jungen Zementestrichen, Holzbalkendecken oder extremen Großformaten fangen Entkopplungsmatten Spannungen aus dem Untergrund ab und verhindern Rissübertragungen auf die Fliese.',
      },
    ],
  };
  const currentFaqs = serviceFaqs[service.id] || serviceFaqs.bad;
  const h1Title = serviceH1Titles[service.id] || service.name;

  const pageUrl = `${SITE_URL}/leistungen/${service.id}`;
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Leistungen', path: '/leistungen' },
    { name: service.name, path: `/leistungen/${service.id}` },
  ];

  const serviceSchemaGraph = buildGraph([
    buildWebPageNode({
      url: pageUrl,
      name: `${service.name} | Fliesenverlegung Tezgel`,
      description: service.shortDescription,
      breadcrumbItems: breadcrumbs,
    }),
    buildBreadcrumbNode(breadcrumbs, pageUrl),
    buildServiceNode({
      name: `${service.name} in Aßlar, Wetzlar & Mittelhessen`,
      serviceType: service.name,
      description: service.shortDescription,
      url: pageUrl,
      image: service.heroImage ?? undefined,
      offers: (service.features || []).map((feat) => ({ name: feat })),
    }),
  ]);

  return (
    <div className="pt-36 pb-24 min-h-screen relative overflow-hidden">
      <JsonLd schema={serviceSchemaGraph} />

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
                {h1Title}
              </h1>

              <p className="text-sm sm:text-base text-neutral-700 max-w-2xl leading-relaxed">
                {serviceIntroTexts[service.id] || service.detailText}
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
                <p className="font-bold text-sm text-neutral-900">{sub.name}</p>
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
                <p className="font-black text-neutral-900 text-sm mb-1">
                  Warum Fachqualität von {COMPANY_DATA.legalName}?
                </p>
                {serviceQualityNotes[service.id] || serviceQualityNotes.bad}
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
                    <p className="font-bold text-sm text-neutral-900 group-hover:text-orange-800 transition-colors">
                      {rel.name}
                    </p>
                    <span className="text-xs font-bold text-orange-800 flex items-center gap-1 mt-1">
                      Gewerk {rel.name} ansehen
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
              {serviceSidebarIntros[service.id] || serviceSidebarIntros.bad}
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

      {/* Umfassendes Projektanfrage-Formular */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="eyebrow mb-3">Individuelle Anfrage</span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            Projekt anfragen &amp; Situation schildern
          </h2>
          <p className="text-sm text-neutral-700 mt-2">
            Schildern Sie uns Ihr Vorhaben für {service.name} für eine fachmännische Einschätzung und ein Festpreisangebot nach Vor-Ort-Aufmaß.
          </p>
        </div>
        <PricingCalculator />
      </div>

      {/* Häufige Fragen & Antworten */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="eyebrow mb-3">Transparenz &amp; Ratgeber</span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            Häufige Fragen zu {service.name}
          </h2>
          <p className="text-sm text-neutral-700 mt-2">
            Antworten unseres Handwerksteams für eine reibungslose Planung und Ausführung.
          </p>
        </div>

        <div className="space-y-4">
          {currentFaqs.map((faq) => (
            <FAQAccordion
              key={faq.q}
              question={faq.q}
              answer={faq.a}
            />
          ))}
        </div>
      </div>

      {/* Embedded Funnel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 relative z-10 scroll-mt-28" id="express-anfrage">
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

      {/* Final Conversion CTA */}
      <FinalCTA />

    </div>
  );
}
