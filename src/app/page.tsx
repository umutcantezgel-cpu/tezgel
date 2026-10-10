// Startseite (E2-ORCH-08, Referenz der Erzählansichten): Einstieg mit SIG-1 Kreuzlinie, danach Abschnitte aus den
// KERN-Bausteinen. Überschriften, Fließtexte, Links und Formulare bleiben wortgleich; Badges sind Mono-Etiketten.
import Link from 'next/link';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { COMPANY_DATA, processSteps } from '@/config/company';
import { SERVICES } from '@/config/services';
import { CITIES } from '@/config/cities';
import { RATING_SUMMARY } from '@/config/reviews';
import { TOPIC_HUBS } from '@/config/topics';
import HeroContactForm from '@/components/forms/HeroContactForm';
import TrustStrip from '@/components/trust/TrustStrip';
import GoogleReviewsBadge from '@/components/reviews/GoogleReviewsBadge';
import PricingCalculator from '@/components/pricing/PricingCalculator';
import ReviewCarousel from '@/components/reviews/ReviewCarousel';
import FAQAccordion from '@/components/ui/FAQAccordion';
import FinalCTA from '@/components/ui/FinalCTA';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import { Feldraster, Feld } from '@/components/kern/Feldraster';
import Knopf from '@/components/kern/Knopf';
import Kennwerte from '@/components/kern/Kennwerte';
import Schrittfolge from '@/components/kern/Schrittfolge';
import Bildfeld from '@/components/kern/Bildfeld';
import Verlegeplan from '@/components/kern/Verlegeplan';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Icon from '@/components/icons/Icon';
import type { PlanName } from '@/lib/plaene/vorgaben';
import { etikettKlassen, linkKlassen } from '@/components/kern/stile';
import { createMetadata } from '@/lib/metadata';

const TezgelAnfrageFunnel = dynamic(() => import('@/components/funnels/TezgelAnfrageFunnel'), {
    loading: () => <p className="py-12 font-mono text-fs-1 text-tinte-2">Anfrageformular wird geladen...</p>,
});
const ServiceMapWrapper = dynamic(() => import('@/components/maps/ServiceMapWrapper'), {
    loading: () => <p className="py-12 font-mono text-fs-1 text-tinte-2">Einsatzgebietskarte wird geladen...</p>,
});

// Fotos der Fachgewerke mit den Maßen der Bilddatei (Bildfeld schneidet nicht zu). Ein Foto steht nur, wo es das
// Gewerk zeigt: alle vorhandenen Fotos sind Bäder (E2-ORCH-08-N2, MENSCHEN M-18) – für Wohnen, Außen und Untergrund
// trägt der gezeichnete Verlegeplan das Bild, bis Projektfotos vorliegen.
const SERVICE_IMAGES: Record<string, { src: string; alt: string; tag: string; breite: number; hoehe: number }> = {
    bad: { src: '/images/bad/walk-in-dusche.webp', alt: 'Bodengleiche Walk-In Dusche und Badgestaltung Tezgel', tag: 'Komplettbad & Dusche', breite: 2528, hoehe: 1696 },
};

// Verlegeplan je Fachgewerk (Planvorgaben in src/lib/plaene/vorgaben.ts)
const SERVICE_PLAENE: Record<string, PlanName> = { bad: 'bad', wohnen: 'wohnen', aussen: 'aussen', untergrund: 'untergrund' };

export const metadata: Metadata = createMetadata({
    title: 'Fliesenleger Wetzlar & Aßlar | Fliesenverlegung Tezgel',
    description: 'Ihr Fliesenleger für Wetzlar & Aßlar: Badsanierung, fugenlose Großformate & Terrassen. DIN 18534 zertifiziert. Jetzt kostenfreies Vor-Ort-Aufmaß anfragen!',
    path: '/',
});

const PILLAR_EYEBROWS = ['Normgerechte Sicherheit', 'Fachgerechte Ausführung', 'Wohnkomfort bei Sanierung'];

const PORTAL_HUBS: Array<{
    eyebrow: string;
    title: string;
    text: string;
    links: Array<{ label: string; href: string }>;
    cta: { label: string; href: string };
}> = [
    {
        eyebrow: 'Komplettbäder',
        title: 'Badsanierung & Wellness',
        text: 'Barrierefreie Walk-in-Duschen, fugenarme Großformate und staubgeschützte Komplettsanierung.',
        links: [
            { label: 'Badsanierung komplett', href: '/bad/badsanierung' },
            { label: 'Fliesen & XXL-Großformat', href: '/bad/fliesen' },
            { label: 'Barrierefreies Bad', href: '/bad/barrierefreies-bad' },
            { label: 'Bad aus einer Hand', href: '/bad/bad-aus-einer-hand' },
            { label: 'Musterbäder', href: '/bad/musterbaeder' }
        ],
        cta: { label: 'Zur Bad-Übersicht', href: '/bad' }
    },
    {
        eyebrow: 'Planungshilfen',
        title: 'Rechner & Planung',
        text: 'Badprojekt in 2 Minuten beschreiben, das Bad Schritt für Schritt planen und Fördermöglichkeiten prüfen.',
        links: [
            { label: 'Projektcheck', href: '/bad/projekt-check' },
            { label: 'Badplaner', href: '/bad/badplaner' },
            { label: 'Geführte Badanfrage', href: '/bad/badanfrage' },
            { label: 'Beratung vor Ort', href: '/beratung' },
            { label: 'Förderung & Zuschüsse', href: '/foerderung' }
        ],
        cta: { label: 'Projektcheck starten', href: '/bad/projekt-check' }
    },
    {
        eyebrow: 'Standorte Hessen',
        title: `${CITIES.length} Städte & Regionen`,
        text: 'Vom Firmensitz in Aßlar aus im Lahn-Dill-Kreis, im Raum Gießen, in Marburg und der Wetterau im Einsatz.',
        links: CITIES.map((city) => ({ label: city.name, href: `/standorte/${city.slug}` })),
        cta: { label: 'Alle Standorte', href: '/standorte' }
    },
    {
        eyebrow: 'Referenzen & Wissen',
        title: 'Bewertungen & Ratgeber',
        text: 'Echte Kundenstimmen, Antworten auf häufige Fragen und Ratgeber rund um Bad und Fliesen.',
        links: [
            { label: 'Referenzen & Bewertungen', href: '/referenzen' },
            { label: 'Ratgeber & Blog', href: '/blog' },
            { label: 'Häufige Fragen', href: '/faq' },
            { label: 'Über Deniz Tezgel', href: '/ueber-uns' },
            { label: 'Kontakt & Aufmaß', href: '/kontakt' }
        ],
        cta: { label: 'Zu den Bewertungen', href: '/referenzen' }
    }
];

export default function HomePage() {
    const { contact, motto, owner } = COMPANY_DATA;
    const google = RATING_SUMMARY.google;
    const trustlocal = RATING_SUMMARY.trustlocal;

    return (
        <>
            {/* 1. EINSTIEG mit SIG-1 Kreuzlinie */}
            <Einstieg
                kreuzlinie
                etikett={
                    <>
                        <span>Handwerkskammer-eingetragener Fachbetrieb Deniz Tezgel</span>
                        <span className="max-sm:hidden">&middot;</span>
                        <span className="max-sm:basis-full">{google.displayRating} ({google.count} Bewertungen)</span>
                    </>
                }
                titel={<>Perfektion auf jedem Quadratmeter.</>}
                unterzeile="Fliesenverlegung & Badsanierung aus Aßlar"
                vorspann={
                    <p>
                        Fugenarme XXL-Großformatfliesen, barrierefreie Walk-in-Duschen, repräsentative Wohnbereiche und
                        frostsichere Terrassen – millimetergenau verlegt, normgerecht abgedichtet nach DIN 18534 und
                        mit Staubschutzgarantie im bewohnten Zuhause.
                    </p>
                }
                aktionen={
                    <>
                        <Knopf href="/kontakt" icon="pfeil-rechts">Aufmaß vor Ort anfragen</Knopf>
                        <Knopf href={contact.whatsappLink} extern variante="neben" iconLinks="sprechblase">Per WhatsApp schreiben</Knopf>
                        <Knopf
                            href={`tel:${contact.phoneLink}`}
                            variante="neben"
                            iconLinks="telefon"
                            aria-label={`Fliesenverlegung Tezgel telefonisch anrufen: ${contact.phone}`}
                        >
                            {contact.phone}
                        </Knopf>
                    </>
                }
                merkmale={
                    <div className="flex flex-col gap-8">
                        <ul className="flex flex-col gap-3">
                            {['Kostenloses Aufmaß vor Ort', 'Staubschutzgarantie', 'Verbindlicher Festpreis'].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-fs-3 text-tinte">
                                    <Fugenkreuz className="size-3 text-laser" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <figure className="border-l-2 border-tinte pl-6">
                            <blockquote className="text-fs-4 text-tinte">&bdquo;{motto}&ldquo;</blockquote>
                            <figcaption className="mt-3 font-mono text-fs-1 text-tinte-2">— {owner.fullName}, Inhaber</figcaption>
                        </figure>
                    </div>
                }
                rand={<HeroContactForm />}
            />

            {/* VERTRAUENSZEILE & GOOGLE-KENNWERT */}
            <div className="border-b border-fuge bg-fliese">
                <div className="mx-auto grid w-full max-w-seite grid-cols-1 gap-6 px-4 py-8 md:px-8 lg:grid-cols-12 lg:px-12">
                    <div className="lg:col-span-9">
                        <TrustStrip />
                    </div>
                    <GoogleReviewsBadge className="justify-self-start lg:col-span-3 lg:justify-self-stretch" />
                </div>
            </div>

            {/* 2. GARANTIEN */}
            <Abschnitt id="vertrauen" aria-label="Garantien &amp; Qualitätsversprechen von Fliesenverlegung Tezgel">
                <Feldraster spalten={3}>
                    {COMPANY_DATA.trustPillars.map((pillar: { title: string; description: string }, idx: number) => (
                        <Feld key={pillar.title}>
                            <span className={etikettKlassen}>
                                <Fugenkreuz className="size-3 text-laser" />
                                {PILLAR_EYEBROWS[idx]}
                            </span>
                            <p className="mt-6 text-fs-4 font-semibold text-tinte">{pillar.title}</p>
                            <p className="mt-3 text-fs-3 text-tinte-2">{pillar.description}</p>
                        </Feld>
                    ))}
                </Feldraster>
            </Abschnitt>

            {/* 3. FACHBEREICHE & PLANUNGSHILFEN */}
            <Abschnitt
                id="portal-netzwerk"
                titelId="portal-heading"
                flaeche="fliese"
                etikett="Fachbereiche & Planungshilfen"
                titel="Alles für Ihr Vorhaben auf über 100 Fachseiten"
                einleitung={
                    <p>
                        Von der schlüsselfertigen Badsanierung über nützliche Planungshilfen bis zu den Standorten in Hessen –
                        wählen Sie Ihren Themenbereich.
                    </p>
                }
            >
                <Feldraster spalten={4} als="div">
                    {PORTAL_HUBS.map(({ eyebrow, title, text, links, cta }) => (
                        <Feld key={eyebrow} als="article" className="bg-kalk">
                            <span className={etikettKlassen}>{eyebrow}</span>
                            <h3 className="mt-4 text-fs-4 font-semibold text-tinte">{title}</h3>
                            <p className="mt-3 text-fs-2 text-tinte-2">{text}</p>
                            <ul className={links.length > 6 ? 'mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-fuge pt-4 text-fs-2' : 'mt-6 flex flex-col gap-2 border-t border-fuge pt-4 text-fs-2'}>
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className={linkKlassen}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-auto pt-6">
                                <Knopf href={cta.href} variante="text" icon="pfeil-rechts">
                                    {cta.label}
                                </Knopf>
                            </div>
                        </Feld>
                    ))}
                </Feldraster>

                <div className="mt-16">
                    <p className={etikettKlassen}>Fachthemen im Detail</p>
                    <ul className="mt-4 grid grid-cols-1 gap-px border border-fuge bg-fuge sm:grid-cols-2 lg:grid-cols-3">
                        {TOPIC_HUBS.map((hub) => (
                            <li key={hub.id} className="bg-kalk">
                                <Link
                                    href={hub.path}
                                    className="group flex h-full items-center justify-between gap-4 p-6 transition-colors dauer-1 ease-setzen hover:bg-fliese"
                                    data-motion="druck"
                                >
                                    <span>
                                        <span className="block text-fs-3 font-semibold text-tinte">{hub.name}</span>
                                        <span className="mt-1 block text-fs-2 text-tinte-2">
                                            {hub.pages.length} Seiten &middot; {hub.description}
                                        </span>
                                    </span>
                                    <Icon name="pfeil-rechts" groesse={5} className="text-tinte" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </Abschnitt>

            {/* 4. PROJEKTANFRAGE & SITUATIONSSCHILDERUNG */}
            <Abschnitt
                id="kosten-rechner"
                titelId="rechner-heading"
                etikett="Umfassende Projektanfrage"
                titel="Projekt anfragen & Situation schildern"
                einleitung={
                    <p>
                        Wählen Sie Ihr geplantes Vorhaben und beschreiben Sie kurz Ihre Ausgangslage vor Ort.
                        Fachbetriebsleiter Deniz Tezgel prüft Ihre Angaben und meldet sich zeitnah für eine persönliche Abstimmung und das kostenfreie Vor-Ort-Aufmaß.
                    </p>
                }
            >
                <PricingCalculator />
            </Abschnitt>

            {/* 5. FACHGEWERKE als Planliste: Plan · Text · Foto je Gewerk */}
            <Abschnitt
                id="leistungen"
                titelId="leistungen-heading"
                flaeche="fliese"
                etikett="Fachgewerke"
                titel={<>Fliesen-, Platten- &amp; Verlegearbeiten{' '}<span>in Fachqualität</span></>}
                einleitung={
                    <p>
                        Ob barrierefreie Wellnessoase, offenes Wohnen mit Feinsteinzeug oder die wetterfeste Terrasse:
                        Fachqualität aus Aßlar für den Lahn-Dill-Kreis und Hessen.
                    </p>
                }
            >
                <div className="border-t border-fuge">
                    {SERVICES.map((srv, idx) => {
                        const isFeature = srv.id === 'bad';
                        const imgData = SERVICE_IMAGES[srv.id];
                        const plan = SERVICE_PLAENE[srv.id];
                        return (
                            <article
                                key={srv.id}
                                className="grid grid-cols-4 gap-x-6 gap-y-8 border-b border-fuge py-12 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-12"
                            >
                                {imgData && (
                                    <Bildfeld
                                        src={imgData.src}
                                        alt={imgData.alt}
                                        breite={imgData.breite}
                                        hoehe={imgData.hoehe}
                                        spalten="drittel"
                                        beschriftung={imgData.tag}
                                        className="col-span-4 md:col-span-8 lg:order-last lg:col-span-3"
                                    />
                                )}
                                <div className="col-span-4 md:col-span-3 lg:col-span-3">
                                    <p className={etikettKlassen}>
                                        <span className="text-tinte">{String(idx + 1).padStart(2, '0')}</span>
                                        <span aria-hidden="true">·</span>
                                        Fachgewerk
                                    </p>
                                    {plan && <Verlegeplan plan={plan} className="mt-6 w-2/3 md:w-full" />}
                                </div>
                                <div className={imgData ? 'col-span-4 md:col-span-5 lg:col-span-6' : 'col-span-4 md:col-span-5 lg:col-span-9'}>
                                    <h3 className={isFeature ? 'text-fs-5 text-tinte' : 'text-fs-4 font-semibold text-tinte'}>{srv.name}</h3>
                                    <p className="mt-4 max-w-mass text-fs-3 text-tinte-2">{srv.shortDescription}</p>
                                    <ul className={isFeature ? 'mt-6 grid gap-3 sm:grid-cols-2' : 'mt-6 grid gap-3 lg:grid-cols-2 lg:gap-x-12'}>
                                        {srv.features.slice(0, isFeature ? 6 : 3).map((feat) => (
                                            <li key={feat} className="flex items-start gap-3 text-fs-2 text-tinte">
                                                <Fugenkreuz className="mt-1 size-3 text-tinte" />
                                                <span>{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                                        <Knopf href={`/leistungen/${srv.id}`} variante="text" icon="pfeil-rechts">
                                            Details &amp; Ausführung: {srv.name}
                                        </Knopf>
                                        {isFeature && (
                                            <Knopf href="/bad" variante="haupt">
                                                Zum Fachbereich Badsanierung
                                            </Knopf>
                                        )}
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </Abschnitt>

            {/* 6. ABLAUF */}
            <Abschnitt
                id="ablauf"
                titelId="ablauf-heading"
                etikett="Transparenter Ablauf"
                titel="In 3 Schritten zu Ihrem neuen Belag"
                einleitung={
                    <p>
                        Keine Überraschungen, keine versteckten Kosten – von der ersten Begutachtung bis zur sauberen
                        Abnahme durch {owner.fullName} persönlich.
                    </p>
                }
            >
                <Schrittfolge
                    ausrichtung="waagrecht"
                    untertitelOben
                    auftritt
                    schritte={processSteps.map((stepItem: { step: string; subtitle: string; title: string; description: string }) => ({
                        nummer: stepItem.step,
                        untertitel: stepItem.subtitle,
                        titel: stepItem.title,
                        text: stepItem.description,
                    }))}
                />
            </Abschnitt>

            {/* 7. XXL-GROSSFORMATE */}
            <Abschnitt
                titelId="spotlight-heading"
                flaeche="fliese"
                kopf="seitlich"
                etikett="Fachbetrieb für anspruchsvolle Architektur"
                titel={<>Fugenarme XXL-Großformate{' '}<span>&amp; fachgerechte Badsanierung</span></>}
                einleitung={
                    <p>
                        Großformatige Platten verlangen höchste Präzision: Mit Nivelliersystem, Vakuumhebetechnik und
                        flexiblen C2-Fliesenklebern entstehen planebene Flächen mit ruhigem, monolithischem
                        Raumgefühl – ohne störende Fugenkreuze.
                    </p>
                }
            >
                <div className="grid grid-cols-4 gap-8 md:grid-cols-8 lg:gap-12">
                    <div className="col-span-4 md:col-span-4">
                        <Kennwerte
                            werte={[
                                { etikett: 'Normgerechte Verbundabdichtung', wert: 'DIN 18534' },
                                { etikett: 'Großformate für fugenarme Wand- & Bodenflächen', wert: 'XXL' },
                            ]}
                        />
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <Knopf href="/bad/fliesen" icon="pfeil-rechts">Großformate im Bad</Knopf>
                            <Knopf
                                href={`tel:${contact.phoneLink}`}
                                variante="neben"
                                iconLinks="telefon"
                                aria-label={`Großformat-Fliesenberatung telefonisch anfragen: ${contact.phone}`}
                            >
                                {contact.phone}
                            </Knopf>
                        </div>
                    </div>
                    <div className="col-span-4 md:col-span-4">
                        <Bildfeld
                            src="/images/bad/bad-freistehende-wanne.webp"
                            alt="Freistehende Badewanne mit fugenlosem XXL-Fliesenbelag von Fliesenverlegung Tezgel"
                            breite={2752}
                            hoehe={1536}
                            spalten="halb"
                            beschriftung={
                                <>
                                    <span className="block font-semibold">Bad mit freistehender Wanne</span>
                                    <span className="block text-tinte-2">Millimetergenauer Gehrungsschnitt &amp; C2TE S1 Flexkleber</span>
                                </>
                            }
                        />
                        <div className="mt-6 border-t border-fuge pt-6">
                            <span className={etikettKlassen}>Regional verwurzelt in Aßlar &middot; Wetzlar</span>
                            <p className="mt-2 text-fs-2 text-tinte-2">
                                Persönliche Betreuung durch Deniz Tezgel von der 3D-Beratung bis zur makellosen Endabnahme.
                            </p>
                        </div>
                    </div>
                </div>
            </Abschnitt>

            {/* 8. KUNDENSTIMMEN */}
            <Abschnitt
                titelId="bewertungen-heading"
                etikett="Echte Kundenstimmen"
                titel="Was unsere Kunden in Mittelhessen sagen"
            >
                <Kennwerte
                    werte={[
                        { etikett: google.source, wert: <>{google.displayRating} / {google.maxRating}</>, quelle: <>{google.count} {google.label}</> },
                        { etikett: trustlocal.source, wert: trustlocal.displayRating, quelle: <>{trustlocal.count} {trustlocal.label}</> },
                    ]}
                    className="md:w-2/3"
                />
                <div className="mt-12">
                    <ReviewCarousel />
                </div>
                <div className="mt-12">
                    <Knopf href="/referenzen" variante="neben" icon="pfeil-rechts">Alle Kundenbewertungen ansehen</Knopf>
                </div>
            </Abschnitt>

            {/* 9. EINSATZGEBIET */}
            <Abschnitt
                id="servicegebiet"
                titelId="map-heading"
                flaeche="fliese"
                etikett="Regionale Einsatzgebiete"
                titel="In ganz Mittelhessen schnell auf Ihrer Baustelle"
                einleitung={<p>Firmensitz in Aßlar – im 45-km-Einsatzradius für Wetzlar, Gießen, Marburg, Limburg, Braunfels, Herborn und ganz Hessen.</p>}
            >
                <ServiceMapWrapper />
            </Abschnitt>

            {/* 10. HÄUFIGE FRAGEN */}
            <Abschnitt
                id="faq"
                titelId="home-faq-heading"
                kopf="seitlich"
                etikett="Transparente Antworten"
                titel="Häufig gestellte Fragen zu Fliesen & Badsanierung"
                einleitung={<p>Wichtige Fragen zu Kosten, DIN 18534 Abdichtung, Staubschutz und dem Ablauf vor Ort.</p>}
            >
                <div className="border-t border-fuge">
                    <FAQAccordion
                        question="Was kostet eine professionelle Fliesenverlegung oder Badsanierung?"
                        answer="Die Kosten richten sich nach Format, Material und Zustand des Untergrunds. Nach dem kostenfreien Vor-Ort-Aufmaß in Aßlar, Wetzlar oder Hessen erhalten Sie eine transparente Kostenaufstellung nach Quadratmetern und Arbeitsaufwand – als verbindliches Festpreisangebot."
                    />
                    <FAQAccordion
                        question="Wie garantieren Sie den Staubschutz bei bewohnten Sanierungen?"
                        answer="Wir setzen moderne Staubschutztüren, Unterdruck-Luftreiniger und saugfähige Schutzvliese ein. So bleibt der Feinstaub im Arbeitsbereich und Ihre übrigen Wohnräume bleiben sauber und bewohnbar."
                    />
                    <FAQAccordion
                        question="Warum ist die Verbundabdichtung nach DIN 18534 im Bad unverzichtbar?"
                        answer="Normgerechte Verbundabdichtung nach DIN 18534 mit Dichtbändern und Dichtmanschetten schützt das Mauerwerk und den Estrich dauerhaft vor Feuchteschäden, Wassereintritt und Schimmelbildung – besonders in bodengleichen Walk-In-Duschen."
                    />
                    <FAQAccordion
                        question="Verlegen Sie auch XXL-Großformate planeben ohne Überzähne?"
                        answer="Ja! Wir nutzen modernste Nivelliersysteme und Vakuum-Hebetechnik für millimetergenaue Großformatverlegung (z. B. 120x120 cm oder 120x260 cm) mit minimalen, harmonischen Fugenachsen."
                    />
                    <FAQAccordion
                        question="Wie schnell erhalten wir einen Termin zum Aufmaß vor Ort?"
                        answer="In der Regel vereinbaren wir binnen 24 bis 48 Stunden einen passenden Termin direkt bei Ihnen vor Ort in Aßlar, Wetzlar, Gießen oder Mittelhessen."
                    />
                </div>
            </Abschnitt>

            {/* 11. EXPRESS-ANFRAGE */}
            <Abschnitt
                id="express-anfrage"
                titelId="anfrage-heading"
                flaeche="fliese"
                etikett="Kostenfrei & unverbindlich"
                titel="Ihre Express-Anfrage in 3 Klicks"
                einleitung={
                    <p>
                        Vorhaben wählen, Eckdaten eintragen und die Anfrage direkt per WhatsApp an {owner.fullName} oder per
                        E-Mail senden.
                    </p>
                }
            >
                <TezgelAnfrageFunnel />
            </Abschnitt>

            {/* 12. ABSCHLUSS */}
            <FinalCTA
                headline="Bereit für Ihr Fliesen- oder Badprojekt? Sprechen Sie direkt mit Fachbetriebsleiter Deniz Tezgel."
                subtitle="Kostenfreies Vor-Ort-Aufmaß • Verbindlicher Festpreis • Über 15 Jahre Erfahrung"
                buttonText="Jetzt Vor-Ort-Aufmaß anfragen"
            />
        </>
    );
}
