// Leistung (E3-BAU-03, KERN v2): Seitenkörper der Leistungsseiten als Erzählansicht nach dem Muster der
// Leistungsübersicht (E3-BAU-02). Einstieg mit Laserachse, H1 links, Vorspann und Knöpfe; rechts der Verlegeplan der
// Leistung ohne Achse. Danach die Leitachse über die Abschnitte: Spezialisierungen und Merkmale als Feldraster,
// Hinweis zur Fachqualität, Städteregister, Direktkontakt, Projektanfrage mit Rechner, Fragen, Express-Anfrage mit
// Funnel. Wortlaut, Überschriften, Links, IDs (#express-anfrage) und Lesefolge wie im Bestand. Keine Icon-Kacheln,
// kein Auftritt und kein großer Moment (setzt der Orchestrator). Daten und Metadaten unverändert.
import { ViewTransition } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import clsx from 'clsx';
import { SERVICES } from '@/config/services';
import { CITIES } from '@/config/cities';
import { COMPANY_DATA } from '@/config/company';
import { buildGraph, buildServiceNode, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';
import TezgelAnfrageFunnel from '@/components/funnels/TezgelAnfrageFunnel';
import { PricingCalculator } from '@/components/pricing/PricingCalculator';
import FAQAccordion from '@/components/ui/FAQAccordion';
import { FinalCTA } from '@/components/ui/FinalCTA';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Icon from '@/components/icons/Icon';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Leitachse from '@/components/kern/Leitachse';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Hinweis from '@/components/kern/Hinweis';
import Knopf from '@/components/kern/Knopf';
import Verlegeplan from '@/components/kern/Verlegeplan';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import { etikettKlassen, linkKlassen } from '@/components/kern/stile';

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
    <>
      <JsonLd schema={serviceSchemaGraph} />

      {/* 1. EINSTIEG: Rückweg und Etikett, H1 an der Laserachse, Vorspann, Knöpfe; rechts der Verlegeplan ohne Achse */}
      <Einstieg
        art="erzaehl"
        etikett={
          <>
            <Link href="/leistungen" className={clsx(linkKlassen, 'inline-flex min-h-11 items-center gap-2 font-text text-fs-2')}>
              <Icon name="pfeil-links" groesse={4} />
              Zurück zur Leistungsübersicht
            </Link>
            <Fugenkreuz className="size-3 shrink-0 text-strich" />
            <span>Fachgewerk &middot; {COMPANY_DATA.legalName}</span>
          </>
        }
        titel={h1Title}
        vorspann={<p>{serviceIntroTexts[service.id] || service.detailText}</p>}
        aktionen={
          <>
            <Knopf href="#express-anfrage" icon="pfeil-rechts">
              Aufmaß anfordern
            </Knopf>
            <Knopf
              href={COMPANY_DATA.contact.whatsappLink}
              extern
              variante="neben"
              vorne={<WhatsAppLogo className="size-5 shrink-0" />}
            >
              WhatsApp Direkt
            </Knopf>
          </>
        }
        rand={
          // Seitenwechsel (E3-ORCH-02): derselbe Plan wie im Feld der Leistungsübersicht, gleitet bei „Fachdetails“ hierher
          // Planblatt (E4-NACH-01): nur die Zeichnung trägt den Namen, so gleitet sie aus dem Feld der Übersicht ins Blatt
          <Planblatt felder={planfelder(service.name, service.id)}>
            <ViewTransition name={`plan-${service.id}`} share={{ 'plan-vor': 'plan-morph', default: 'none' }} default="none">
              <Verlegeplan plan={service.id} ohneAchse bemassung={false} />
            </ViewTransition>
          </Planblatt>
        }
      />

      <Leitachse>
        {/* 2. SPEZIALISIERUNGEN als Feldraster: je Unterpunkt ein Feld mit Fugenkreuz, ohne Icon-Kacheln */}
        {service.subcategories && service.subcategories.length > 0 && (
          <Abschnitt titelId="spezialisierung-heading" leitachse titel={<>Spezialisierungen in {service.name}</>}>
            <Feldraster spalten={service.subcategories.length > 3 ? 4 : 3}>
              {service.subcategories.map((sub) => (
                <Feld key={sub.id}>
                  <Fugenkreuz className="size-3 text-strich" />
                  <p className="mt-6 font-text text-fs-3 font-semibold text-tinte">{sub.name}</p>
                </Feld>
              ))}
            </Feldraster>
          </Abschnitt>
        )}

        {/* 3. FACHKOMPETENZ: Vorspann, Merkmale mit Fugenkreuz, Hinweis zur Fachqualität */}
        <Abschnitt
          titelId="fachkompetenz-heading"
          leitachse
          titel={<>Fachkompetenz &amp; Ausführungsdetails</>}
          einleitung={<p>{service.shortDescription}</p>}
        >
          <div className="flex flex-col gap-12">
            <div>
              <p className={etikettKlassen}>Ihre handwerklichen Vorteile:</p>
              <ul className="mt-6 grid gap-3 lg:grid-cols-2 lg:gap-x-8">
                {service.features.map((feature) => (
                  <li key={feature} className="flex gap-3 font-text text-fs-2 text-tinte">
                    <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                      <Fugenkreuz className="size-3" />
                    </span>
                    <span className="min-w-0">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Hinweis titel={<>Warum Fachqualität von {COMPANY_DATA.legalName}?</>}>
              {serviceQualityNotes[service.id] || serviceQualityNotes.bad}
            </Hinweis>
          </div>
        </Abschnitt>

        {/* 4. WEITERE GEWERKE als Feldraster: Name und Verweis je Leistung */}
        <Abschnitt titelId="weitere-heading" leitachse titel={<>Weitere Gewerke von {COMPANY_DATA.legalName}:</>}>
          <Feldraster spalten={3}>
            {relatedServices.map((rel) => (
              <Feld key={rel.id}>
                <Link href={`/leistungen/${rel.id}`} className="group flex flex-1 flex-col gap-3">
                  <span className="font-text text-fs-4 font-semibold text-tinte">{rel.name}</span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-3 font-text text-fs-2 text-tinte underline decoration-strich underline-offset-4 group-hover:decoration-tinte">
                    Gewerk {rel.name} ansehen
                    <Icon name="pfeil-rechts" groesse={4} />
                  </span>
                </Link>
              </Feld>
            ))}
          </Feldraster>
        </Abschnitt>

        {/* 5. REGION: Orte als Städteregister, je Ort ein Link auf die Seite der Leistung vor Ort */}
        <Abschnitt
          titelId="region-heading"
          leitachse
          titel={<>{service.name} in Ihrer Region</>}
          einleitung={
            <p>
              Vom Firmensitz in {COMPANY_DATA.headquarters.city} aus im Lahn-Dill-Kreis und in Mittelhessen im Einsatz.
            </p>
          }
        >
          <ul className="grid grid-cols-2 border-l border-t border-fuge md:grid-cols-4">
            {CITIES.map((city) => (
              <li key={city.slug} className="border-b border-r border-fuge">
                <Link
                  href={`/leistungen/${service.id}/${city.slug}`}
                  className={clsx(linkKlassen, 'flex min-h-11 items-center gap-2 px-4 py-3 font-text text-fs-2')}
                >
                  <Icon name="ort" groesse={4} className="shrink-0 text-strich" />
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </Abschnitt>

        {/* 6. DIREKTKONTAKT: Telefon, WhatsApp, Aufmaß-Knopf und Leitsatz des Inhabers (vormals Seitenleiste) */}
        <Abschnitt
          titelId="direktkontakt-heading"
          flaeche="fliese"
          kopf="seitlich"
          leitachse
          etikett="Direktkontakt"
          titel={<>Projekt in {service.name} anfragen?</>}
          einleitung={<p>{serviceSidebarIntros[service.id] || serviceSidebarIntros.bad}</p>}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
                <span className="font-mono font-normal">{COMPANY_DATA.contact.phone}</span>
              </Knopf>
              <Knopf
                href={COMPANY_DATA.contact.whatsappLink}
                extern
                variante="neben"
                vorne={<WhatsAppLogo className="size-5 shrink-0" />}
              >
                WhatsApp Chat
              </Knopf>
            </div>
            <Knopf href="#express-anfrage" icon="pfeil-rechts" className="w-full sm:w-auto sm:self-start">
              Kostenfreies Aufmaß buchen
            </Knopf>
            <p className="border-t border-fuge pt-6 font-text text-fs-2 text-tinte-2">
              &bdquo;{COMPANY_DATA.motto}&ldquo;
            </p>
          </div>
        </Abschnitt>

        {/* 7. PROJEKT: Vorhaben und Ausgangslage schildern, danach der Rechner */}
        <Abschnitt
          titelId="projekt-heading"
          leitachse
          etikett="Individuelle Anfrage"
          titel="Projekt anfragen & Situation schildern"
          einleitung={
            <p>
              Schildern Sie uns Ihr Vorhaben für {service.name} für eine fachmännische Einschätzung und ein Festpreisangebot
              nach Vor-Ort-Aufmaß.
            </p>
          }
        >
          <PricingCalculator />
        </Abschnitt>

        {/* 8. FRAGEN: Etikett, Überschrift und Vorspann links, die Antworten rechts als Fugenliste */}
        <Abschnitt
          titelId="faq-heading"
          leitachse
          kopf="seitlich"
          etikett="Transparenz & Ratgeber"
          titel={<>Häufige Fragen zu {service.name}</>}
          einleitung={<p>Antworten unseres Handwerksteams für eine reibungslose Planung und Ausführung.</p>}
        >
          <div>
            {currentFaqs.map((faq) => (
              <FAQAccordion key={faq.q} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </Abschnitt>

        {/* 9. EXPRESS-ANFRAGE: Kopf links, Assistent rechts; Anker #express-anfrage */}
        <Abschnitt
          id="express-anfrage"
          titelId="anfrage-heading"
          flaeche="fliese"
          kopf="seitlich"
          leitachse
          etikett="Express-Aufmaß"
          titel="Jetzt unverbindlich anfragen"
        >
          <TezgelAnfrageFunnel />
        </Abschnitt>
      </Leitachse>

      {/* 10. ABSCHLUSS */}
      <FinalCTA />
    </>
  );
}
