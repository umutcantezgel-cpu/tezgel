// /leistungen/[id] · die vier Leistungsseiten bad · wohnen · aussen · untergrund (Fusion F-02 nach Gutachten u2, E-039;
// KERN v2, Erzählansicht nach dem Vorbild der Startseite). Grundgerüst Fassung B (S-04), aus Fassung A (E3-BAU-03) der
// Einstieg als Planblatt, die Mono-Etiketten, die Gewerk-Pläne und die eigenen sections für Gewerke, Region, Direktkontakt.
// Abschnittsfolge und Flächen:
// 1. Einstieg (Kalk): Rückweg und Etikett in der Mono-Kennzeile, H1, Vorspann, zwei Wege; Randspalte = Planblatt (Plan der
//    Leistung mit „=“-Bemaßung, Eckmarken, Schriftfeld aus COMPANY_DATA), oben bündig mit der Kennzeile · 2. Spezialisierungen
//    als Feldraster (Band auf Fliese, Felder Kalk, einziger Auftritt) · 3. Fachkompetenz & Ausführungsdetails (Kalk): Text an
//    der Fuge neben dem Schriftfeld „Direktkontakt“, darunter die Wege „Weitere Gewerke“ (mit Plan-Miniaturen) und Region ·
//    4. Projektanfrage mit Preisrechner (Fliese) · 5. Fragen, Kopf seitlich (Kalk) · 6. Express-Anfrage #express-anfrage,
//    Kopf seitlich (Fliese) · 7. Abschluss (geteilter Baustein FinalCTA, ohne Achsenstück).
// Rot: genau eines je Bildschirm – ab lg die Achse im Plan (das Lot des Einstiegs bleibt Grundschicht), unter lg das Lot im
// Seitenrand (Plan ohne Achse); keine seitenlange Leitachse (Gutachten u2, Stolperstein d). In allen vier Instanzen gleich.
// Kein großer Moment. `spaet` (content-visibility) nur auf der Projektanfrage (R-01b): Der frühere Befund (bei 200 % Zoom
// Fuß „nie im Bild“) war ein Messfehler des Werkzeugs (01612f6). Nicht auf den Fragen (direkt über #express-anfrage: der
// Sprung per next/link verfehlte das Ziel sonst um bis zu 555 px) und nicht auf der Express-Anfrage (a11y-zusatz forced liest
// innerText; im übersprungenen Abschnitt galten die randlosen Kacheln als „ohne Grenze“).
// H1: Stufe nach `Einstieg` (lange Titel > 44 Zeichen text-fs-6), weil mit text-fs-7 die Knöpfe von aussen/untergrund in
// d1440 unter 900 px und in m390 unter die feste Leiste fallen (Rückgabe F-02, OFFENE FRAGE); weiche Trennung über `fugen`.
// Server-Komponente (async, params als Promise nach Next 16); Client-Inseln sind nur Formulare und Fragen.
// Wortlaut, Anker, JSON-LD, generateStaticParams und notFound wie im Bestand; Metadaten im layout.jsx der Route.
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SERVICES } from '@/config/services';
import { COMPANY_DATA } from '@/config/company';
import { buildGraph, buildServiceNode, buildBreadcrumbNode, buildWebPageNode, SITE_URL } from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';
import { PricingCalculator } from '@/components/pricing/PricingCalculator';
import FAQAccordion from '@/components/ui/FAQAccordion';
import { FinalCTA } from '@/components/ui/FinalCTA';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Icon from '@/components/icons/Icon';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Knopf from '@/components/kern/Knopf';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Verlegeplan from '@/components/kern/Verlegeplan';
import Planfeld from '@/components/leistungen/detail/Planfeld';
import Unterkategorien from '@/components/leistungen/detail/Unterkategorien';
import Fachdetails from '@/components/leistungen/detail/Fachdetails';
import { fugen, UNTERSTRICH } from '@/components/leistungen/detail/satz';

// Express-Anfrage nachladen (Tempo, wie auf der Startseite; aus Fassung A)
const TezgelAnfrageFunnel = dynamic(() => import('@/components/funnels/TezgelAnfrageFunnel'), {
  loading: () => <FormularPlatzhalter />,
});

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
  // SEO-Runde, Befund Zusagen (docs/seo/arbeit/zusagen-befund.md): ohne Garantie, Zertifikat und Floskeln; Fakten aus dem
  // Faktenblatt (F-08, F-15, F-17, F-21) und den Fachseiten
  const serviceIntroTexts = {
    bad: 'Wir sanieren Bäder, bauen Duschen ohne Stufe ein und verlegen große Fliesen. Unter die Fliesen kommt eine Abdichtung nach DIN 18534. Wohnen Sie während der Arbeiten im Haus, schützen Staubschutzwände, Luftreiniger und Abdeckungen die anderen Räume.',
    wohnen: 'Wir verlegen Feinsteinzeug und Naturstein in Wohnräumen, Küchen und im Neubau. Die Fugen planen wir über die Räume hinweg, und den Aufbau stimmen wir auf eine Fußbodenheizung ab.',
    aussen: 'Wir sanieren Balkone und Terrassen und verlegen Platten, auch auf Stelzlagern. Das Gefälle beträgt mindestens 1,5 bis 2 %, damit Regenwasser vom Haus weg abläuft.',
    untergrund: 'Vor dem Verlegen prüfen wir den Untergrund: Wir messen die Restfeuchte im Estrich, schließen Risse, gleichen Unebenheiten aus und dichten Nassräume nach DIN 18534 ab.',
  };
  const serviceQualityNotes = {
    bad: 'Bei bewohnten Räumen schützen wir die Wohnung mit Staubschutzwänden oder Staubschutztüren, Luftreinigern und Schutzabdeckungen. Danach übergeben wir den Raum besenrein. Die Abdichtung unter den Fliesen folgt DIN 18534.',
    wohnen: 'In Wohnräumen und offenen Küchen richten wir die Fliesen genau aus, damit das Fugenbild gerade wird. Den Aufbau stimmen wir auf Ihre Fußbodenheizung ab.',
    aussen: 'Auf Balkon und Terrasse legen wir ein Gefälle von mindestens 1,5 bis 2 % an. Platten auf Stelzlagern lassen das Wasser darunter ablaufen.',
    untergrund: 'Wir messen die Restfeuchte, schließen Risse und gleichen den Untergrund aus, bevor der Belag kommt.',
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
        a: 'Nach Ihrer Anfrage begutachten wir das Bad vor Ort in Aßlar, Wetzlar oder Mittelhessen. Wir prüfen Wand- und Bodenuntergründe, besprechen Sanitärobjekte und Fugenachsen und übergeben Ihnen ein Festpreisangebot.',
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

      {/* 1. EINSTIEG: Rückweg und Etikett in der Mono-Kennzeile (B), H1, Vorspann, zwei Wege; rechts das Planblatt (A) */}
      <Einstieg
        etikett={
          <>
            <Link href="/leistungen" data-motion="zustand" className="group mr-4 inline-flex min-h-11 items-center gap-2 text-tinte">
              <Icon name="pfeil-links" groesse={4} />
              <span className={UNTERSTRICH}>Zurück zur Leistungsübersicht</span>
            </Link>
            <Fugenkreuz className="size-3 shrink-0 text-strich" />
            <span>Fachgewerk &middot; {COMPANY_DATA.legalName}</span>
          </>
        }
        titel={fugen(h1Title)}
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
          <Planfeld id={service.id} name={service.name}>
            {/* Seitenwechsel (E3-ORCH-02, zurück nach E-037): derselbe Plan wie im Feld der Leistungsübersicht gleitet ab lg
                hierher (Ziel des Plan-Morphs, Verlegen.tsx) */}
            <div data-plan-uebergang={service.id}>
              <Verlegeplan plan={service.id} flucht="laden" />
            </div>
          </Planfeld>
        }
      />

      {/* 2. SPEZIALISIERUNGEN als Feldraster (Bestand „Subcategories Bento“) */}
      <Unterkategorien leistung={service} />

      {/* 3. FACHKOMPETENZ & AUSFÜHRUNGSDETAILS mit Direktkontakt, danach die Wege: Weitere Gewerke, Region */}
      <Fachdetails
        leistung={service}
        qualitaet={serviceQualityNotes[service.id] || serviceQualityNotes.bad}
        randText={serviceSidebarIntros[service.id] || serviceSidebarIntros.bad}
      />

      {/* 4. PROJEKTANFRAGE (umfassendes Formular mit Situationsschilderung) */}
      <Abschnitt
        id="kosten-rechner"
        spaet
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

      {/* 7. ABSCHLUSS (geteilter Baustein): ohne Achsenstück, die Seite hat keine Leitachse, an die es anschließen könnte */}
      <FinalCTA achse={false} />
    </>
  );
}
