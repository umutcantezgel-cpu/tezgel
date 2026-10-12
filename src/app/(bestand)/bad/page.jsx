// Bad (E3-BAU-01, KERN v2): Erzählansicht nach dem Muster der Startseite und von /leistungen. Einstieg mit Achse, H1 links
// bündig, Vorspann, Knöpfe und Zusagen; rechts der Verlegeplan „bad“ ohne Achse (je Bildschirm nur ein roter Blickfang).
// Danach die Leitachse über die Abschnitte: Bad-Leistungen als Feldraster, Qualitäts-Kategorien als Feldraster auf Fliese
// mit je einem Grundriss, Anfragewege (Projektcheck, darunter Badanfrage) in EINEM Abschnitt auf Fliese: Raster aus Funnel
// (8 Spalten) und eine Rückfrage (4 Spalten, ab lg klebend).
// Die Anfragewege werden nachgeladen (TEMPO). Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand.
// Kein großer Moment und keine Bewegung (setzt der Orchestrator).
import Link from 'next/link';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import { COMPANY_DATA } from '@/config/company';
import { QUALITY_TIERS } from '@/config/musterbaeder';
import { RATING_SUMMARY } from '@/config/reviews';
import { FinalCTA } from '@/components/ui/FinalCTA';
import { createMetadata } from '@/lib/metadata';
import Icon from '@/components/icons/Icon';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Leitachse from '@/components/kern/Leitachse';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import Rueckfrage from '@/components/kern/Rueckfrage';
import Verlegeplan from '@/components/kern/Verlegeplan';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import { etikettKlassen, linkKlassen } from '@/components/kern/stile';

// Anfragewege nachladen wie auf der Startseite (TEMPO, Z-08 / E-025)
const BadProjektCheck = dynamic(() => import('@/components/funnels/BadProjektCheck'), {
    loading: () => <p className="py-12 font-mono text-fs-1 text-tinte-2">Anfrageformular wird geladen...</p>,
});
const BadanfrageFunnel = dynamic(() => import('@/components/funnels/BadanfrageFunnel'), {
    loading: () => <p className="py-12 font-mono text-fs-1 text-tinte-2">Anfrageformular wird geladen...</p>,
});

// Grundrisse je Qualitäts-Kategorie (Befund 17): gezeichnet, ohne Achse und ohne Bemaßung, keine Flächenangaben.
// Der Plan zeigt, was die Beschreibung der Kategorie nennt.
const TIER_PLAENE = {
    Basic: {
        name: 'basic', beschreibung: 'Grundriss Basic: Raum mit Duschwanne in einer Ecke.',
        raum: { b: 24, h: 16 }, platte: { b: 6, h: 3 }, verband: 'halb', achse: 'lot',
        elemente: [{ art: 'wanne', x: 1.5, y: 1.5, b: 6, h: 3 }],
    },
    Premium: {
        name: 'premium', beschreibung: 'Grundriss Premium: bodengleiche Dusche mit Gefälle zur Rinne.',
        raum: { b: 24, h: 16 }, platte: { b: 8, h: 4 }, verband: 'halb', achse: 'lot',
        elemente: [{ art: 'gefaelle', x: 18, y: 3, laenge: 8, richtung: 'unten' }, { art: 'rinne', x: 14, y: 12, laenge: 9, richtung: 'waagrecht' }],
    },
    Luxus: {
        name: 'luxus', beschreibung: 'Grundriss Luxus: freistehende Wanne mittig im Raum, großes Format im Drittelverband.',
        raum: { b: 24, h: 16 }, platte: { b: 12, h: 6 }, verband: 'drittel', achse: 'lot',
        elemente: [{ art: 'wanne', x: 8, y: 5.5, b: 8, h: 5 }],
    },
};

export const metadata = createMetadata({
    title: 'Badsanierung Wetzlar & Aßlar | Fachbetrieb Tezgel',
    description: 'Schlüsselfertige Badsanierung in Wetzlar & Aßlar: barrierefreie Walk-In Duschen, XXL-Fliesen & DIN 18534 Abdichtung. Jetzt Festpreisangebot anfragen!',
    path: '/bad'
});

const BATH_SERVICES = [
    { title: 'Badsanierung komplett', desc: 'Komplettbad schlüsselfertig zum Festpreis', path: '/bad/badsanierung' },
    { title: 'Fliesen & XXL-Großformate', desc: 'Fugenarm verlegt, abgedichtet nach DIN 18534', path: '/bad/fliesen' },
    { title: 'Barrierefreies Bad', desc: 'DIN 18040-2 & bis zu 4.180 € Zuschuss', path: '/bad/barrierefreies-bad' },
    { title: 'Bad aus einer Hand', desc: 'Ein Ansprechpartner, abgestimmte Gewerke', path: '/bad/bad-aus-einer-hand' },
    { title: 'Musterbad-Konzepte', desc: 'Basic, Premium & Luxus (4,6 bis 15,9 m²)', path: '/bad/musterbaeder' },
    { title: 'Badplaner', desc: 'Ihr neues Bad Schritt für Schritt planen', path: '/bad/badplaner' }
];

const ZUSAGEN = ['Kostenfreies Vor-Ort-Aufmaß', 'Staubschutz-Garantie', 'Verbindlicher Festpreis'];

export default function BadPage() {
    const google = RATING_SUMMARY.google;

    return (
        <>
            {/* 1. EINSTIEG: Kennzeile, H1 auf der Achse, Vorspann, Knöpfe, Zusagen; rechts der Plan ohne Achse */}
            <section aria-labelledby="bad-hero-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={
                        <>
                            <span>HWK Fachbetrieb für Badsanierung &middot; Aßlar &amp; Wetzlar</span>
                            <Fugenkreuz className="size-3 shrink-0 text-strich" />
                            <span className="inline-flex items-center gap-2">
                                <Icon name="stern-voll" groesse={4} />
                                {google.displayRating} &middot; {google.count} {google.label}
                            </span>
                        </>
                    }
                    titel={
                        <span id="bad-hero-heading">
                            Ihr Traumbad schlüsselfertig{' '}
                            <span>in Fachqualität</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Ihr Fachbetrieb Tezgel realisiert Ihre schlüsselfertige Badsanierung in Aßlar, Wetzlar und ganz Mittelhessen. Von der ersten Planungsskizze bis zur schlüsselfertigen Übergabe Ihres Traumbads in Fachqualität koordinieren wir alle Gewerke, garantieren transparente Festpreise und verbauen normgerechte Verbundabdichtungen nach DIN 18534.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/bad/projekt-check" icon="pfeil-rechts">Bad-Projektcheck starten</Knopf>
                            <Knopf href="/bad/musterbaeder" variante="neben">Musterbäder entdecken</Knopf>
                        </>
                    }
                    merkmale={
                        <ul className="grid gap-3">
                            {ZUSAGEN.map((item) => (
                                <li key={item} className="flex items-center gap-3 font-text text-fs-2 text-tinte">
                                    <Fugenkreuz className="size-3 shrink-0 text-strich" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    }
                    rand={
                        // Planblatt (E4-NACH-01): eigenes Motiv „badsanierung“ (der Badplan gehört zu /leistungen/bad);
                        // großer Moment (E4-NACH-02): beim Laden rückt das Fugenbild in die Flucht – die Lücke an der Wand
                        // schließt sich, beide Passstücke werden gleich
                        <Planblatt felder={planfelder('Badsanierung', 'badsanierung')}>
                            <Verlegeplan plan="badsanierung" ohneAchse bemassung={false} flucht="laden" />
                        </Planblatt>
                    }
                />
            </section>

            {/* LEITACHSE: das Lot setzt die Achse des Einstiegs über die Abschnitte fort */}
            <Leitachse>
                {/* 2. BAD-LEISTUNGEN als Feldraster: je Leistung ein Feld, das ganz als Link dient */}
                <Abschnitt
                    titelId="bad-services-heading"
                    leitachse
                    spaet
                    etikett="Bad-Leistungen im Überblick"
                    titel="Alles für Ihr neues Bad aus einer Hand"
                >
                    <Feldraster spalten={3}>
                        {BATH_SERVICES.map((item) => (
                            <Feld key={item.path} className="relative">
                                <Link href={item.path} className="group flex flex-1 flex-col gap-2 after:absolute after:inset-0">
                                    <span className="font-text text-fs-4 font-semibold text-tinte underline decoration-strich underline-offset-4 group-hover:decoration-tinte">
                                        {item.title}
                                    </span>
                                    <span className="font-text text-fs-2 text-tinte-2">{item.desc}</span>
                                    <span className="mt-auto pt-4">
                                        <Icon name="pfeil-rechts" groesse={5} className="text-tinte" />
                                    </span>
                                </Link>
                            </Feld>
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 3. QUALITÄTS-KATEGORIEN auf Kalk (die Anfragewege danach stehen auf Fliese – keine zwei gleichen Flächen in Folge,
                    Rückgabe E4-N2-04): je Kategorie ein Feld, Musterbäder als Textlink, Telefon im Satz */}
                <Abschnitt
                    titelId="bad-tiers-heading"
                    leitachse
                    spaet
                    etikett="Transparente Standards"
                    titel="Unsere Qualitäts-Kategorien im Überblick"
                    einleitung={
                        <p>
                            Wählen Sie das passende Konzept für Ihre Ansprüche – den verbindlichen Festpreis erhalten Sie nach dem kostenfreien Vor-Ort-Aufmaß.
                        </p>
                    }
                >
                    <Feldraster spalten={3}>
                        {QUALITY_TIERS.map((tier) => (
                            <Feld key={tier.name} className="justify-between gap-6">
                                <div>
                                    <div className="mb-6 w-1/2">
                                        <Verlegeplan plan={TIER_PLAENE[tier.name]} ohneAchse bemassung={false} />
                                    </div>
                                    <p className={etikettKlassen}>{tier.name}</p>
                                    <h3 className="mt-3 font-anzeige text-fs-4 text-tinte">{tier.subtitle}</h3>
                                    <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{tier.description}</p>
                                </div>
                                <div className="border-t border-fuge pt-6">
                                    <Knopf href="/bad/musterbaeder" variante="text" icon="pfeil-rechts">Musterbäder ansehen</Knopf>
                                </div>
                            </Feld>
                        ))}
                    </Feldraster>

                    <p className="mt-8 font-text text-fs-2 text-tinte-2">
                        Fragen zu Ihrem Bad? Rufen Sie {COMPANY_DATA.owner.fullName} direkt an:{' '}
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className={clsx(linkKlassen, 'whitespace-nowrap font-mono')}>
                            {COMPANY_DATA.contact.phone}
                        </a>
                    </p>
                </Abschnitt>

                {/* 4. ANFRAGEWEGE in einem Abschnitt auf Fliese: der Projektcheck, darunter mit Fuge die Badanfrage (beide Werkzeuge
                    bleiben); rechts EINE Rückfrage (ab lg klebend, unter lg nach beiden Werkzeugen). Die IDs und ARIA-Namen liegen an
                    den beiden inneren Hüllen; die Hüllen sind Regionen mit Namen, wie zuvor die Abschnitte. */}
                <Abschnitt flaeche="fliese" leitachse spaet>
                    <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                        <div className="min-w-0 lg:col-span-8">
                            <div id="projekt-check" role="region" aria-label="Bad-Projektcheck" className="scroll-mt-24">
                                <BadProjektCheck />
                            </div>
                            <div id="anfrage" role="region" aria-label="Badanfrage" className="mt-12 scroll-mt-24 border-t border-fuge pt-12">
                                <BadanfrageFunnel />
                            </div>
                        </div>
                        <div className="lg:col-span-4">
                            <Rueckfrage />
                        </div>
                    </div>
                </Abschnitt>
            </Leitachse>

            {/* 6. ABSCHLUSS */}
            <FinalCTA />
        </>
    );
}
