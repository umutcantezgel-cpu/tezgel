// /leistungen/[id] (S-04, KERN v2, Erzählansicht nach dem Vorbild der Startseite und von `/leistungen`): die vier
// Leistungsseiten bad · wohnen · aussen · untergrund. Abschnittsfolge wie im Bestand:
// 1. Einstieg an der Laserachse (Kalk): Rückweg und Etikett in der Kennzeile, H1, Vorspann, zwei Wege; Randspalte = Plan der
//    Leistung (dieselbe Vignette und Nummer wie auf /leistungen) · 2. Spezialisierungen als Feldraster (Band auf Fliese, Felder
//    Kalk, einziger Auftritt) · 3. Fachkompetenz & Ausführungsdetails (Kalk): Text an der Fuge (8 Spalten) neben dem
//    Schriftfeld „Direktkontakt“ (4 Spalten, ohne Kleben), darunter die Wege: Index „Weitere Gewerke“ und Ortsliste ·
//    4. Projektanfrage mit Preisrechner (Fliese) · 5. Fragen, Kopf seitlich (Kalk) · 6. Express-Anfrage #express-anfrage,
//    Kopf seitlich (Fliese) · 7. Abschluss (Tinte). Lange Komposita in H1/H2 tragen ein weiches Trennzeichen (`fugen`, K-006).
// Kein großer Moment (Auftrag S-04). Rot nur in der Laserachse des Einstiegs; auf /leistungen/wohnen trägt die Vignette
// selbst die Laserachse (Waage), dort entfällt das Lot, damit je Bildschirm genau ein Rot steht.
// Server-Komponente (async, params als Promise nach Next 16); Client-Inseln sind nur Formulare und Fragen.
// Wortlaut, Anker, JSON-LD, generateStaticParams und notFound wie im Bestand; Metadaten im layout.jsx der Route.
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SERVICES } from '@/config/services';
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
import Knopf from '@/components/kern/Knopf';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Planfeld from '@/components/leistungen/detail/Planfeld';
import Unterkategorien from '@/components/leistungen/detail/Unterkategorien';
import Fachdetails from '@/components/leistungen/detail/Fachdetails';
import { fugen } from '@/components/leistungen/detail/satz';

export function generateStaticParams() {
  return SERVICES.map((service) => ({ id: service.id }));
}

export default async function ServiceDetailPage({ params }) {
  const { id } = await params;
  const service = SERVICES.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

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

      {/* 1. EINSTIEG an der Laserachse: Rückweg und Etikett in der Mono-Kennzeile, H1, Vorspann, zwei Wege; rechts der Plan */}
      <Einstieg
        achse={service.id !== 'wohnen'}
        etikett={
          <>
            <Link
              href="/leistungen"
              data-motion="zustand"
              className="group mr-4 inline-flex min-h-11 items-center gap-2 text-tinte"
            >
              <Icon name="pfeil-links" groesse={4} />
              <span className="underline decoration-strich decoration-1 underline-offset-4 pointer-fine:group-hover:decoration-tinte group-active:decoration-tinte">
                Zurück zur Leistungsübersicht
              </span>
            </Link>
            <span className="inline-flex items-center gap-2">
              <Fugenkreuz className="size-3 text-strich" />
              Fachgewerk &middot; {COMPANY_DATA.legalName}
            </span>
          </>
        }
        titel={fugen(h1Title)}
        vorspann={<p className="text-fs-3">{serviceIntroTexts[service.id] || service.detailText}</p>}
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
        rand={<Planfeld id={service.id} />}
      />

      {/* 2. SPEZIALISIERUNGEN als Feldraster (Bestand „Subcategories Bento“) */}
      <Unterkategorien leistung={service} />

      {/* 3. FACHKOMPETENZ & AUSFÜHRUNGSDETAILS: Text an der Fuge, Index der weiteren Gewerke, Orte; Schriftfeld rechts */}
      <Fachdetails
        leistung={service}
        qualitaet={serviceQualityNotes[service.id] || serviceQualityNotes.bad}
        randText={serviceSidebarIntros[service.id] || serviceSidebarIntros.bad}
      />

      {/* 4. PROJEKTANFRAGE (umfassendes Formular mit Situationsschilderung) */}
      <Abschnitt
        id="kosten-rechner"
        titelId="rechner-heading"
        flaeche="fliese"
        etikett="Individuelle Anfrage"
        titel="Projekt anfragen & Situation schildern"
        einleitung={
          <p>
            Schildern Sie uns Ihr Vorhaben für {service.name} für eine fachmännische Einschätzung und ein Festpreisangebot nach Vor-Ort-Aufmaß.
          </p>
        }
      >
        <PricingCalculator />
      </Abschnitt>

      {/* 5. HÄUFIGE FRAGEN: Kopf links, Fragen rechts (wie auf der Startseite) */}
      <Abschnitt
        id="faq"
        titelId="faq-heading"
        kopf="seitlich"
        etikett="Transparenz & Ratgeber"
        titel={fugen(`Häufige Fragen zu ${service.name}`)}
        einleitung={<p>Antworten unseres Handwerksteams für eine reibungslose Planung und Ausführung.</p>}
      >
        <div>
          {currentFaqs.map((faq) => (
            <FAQAccordion key={faq.q} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </Abschnitt>

      {/* 6. EXPRESS-ANFRAGE: Kopf links, Assistent rechts (wie auf der Startseite) */}
      <Abschnitt
        id="express-anfrage"
        titelId="anfrage-heading"
        flaeche="fliese"
        kopf="seitlich"
        etikett="Express-Aufmaß"
        titel="Jetzt unverbindlich anfragen"
      >
        <TezgelAnfrageFunnel />
      </Abschnitt>

      {/* 7. ABSCHLUSS */}
      <FinalCTA />
    </>
  );
}
