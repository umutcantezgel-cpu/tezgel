// Musterbad-Detail (E4-BAU-04, KERN v2): Erzählansicht nach dem Muster der Familienreferenz (bad/page.jsx). Einstieg mit Achse,
// Rücklink und Maße im Etikett, H1 links bündig, Vorspann und Festpreis-Merkmal; rechts das Planblatt „badsanierung“ mit dem
// Verlegeplan (interaktiv, ohne Bemaßung). Danach die Leitachse: Ausstattung als Feldraster, Anfrage zu diesem Musterbad im
// Seitenlayout, Badanfrage mit Rückfrage. Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand.
// Die Badanfrage wird nachgeladen (TEMPO). Kein großer Moment und keine neue Bewegung (setzt der Orchestrator).
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import { notFound } from 'next/navigation';
import { MUSTERBAEDER } from '@/config/musterbaeder';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Leitachse from '@/components/kern/Leitachse';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import Rueckfrage from '@/components/kern/Rueckfrage';
import Verlegeplan from '@/components/kern/Verlegeplan';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import SeitenDaten from '@/components/seo/SeitenDaten';

// Badanfrage nachladen wie auf der Familienreferenz (TEMPO, Z-08 / E-025)
const BadanfrageFunnel = dynamic(() => import('@/components/funnels/BadanfrageFunnel'), {
    loading: () => <FormularPlatzhalter />,
});

// Metadaten je Musterbad; die Seite nimmt Titel und Beschreibung für die strukturierten Daten (SeitenDaten) von hier
function musterbadMetadaten(bath, slug) {
    return createMetadata({
        title: `Musterbad ${bath.title} – Komplettbad & Badsanierung | Tezgel`,
        description: `Musterbad ${bath.title}: ${bath.headline}. Ausstattungsliste, Markenkomponenten & transparente Festpreise von Fachbetrieb Tezgel aus Aßlar.`,
        path: `/bad/musterbaeder/${slug}`
    });
}

export async function generateStaticParams() {
    return MUSTERBAEDER.map((b) => ({
        slug: b.slug
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const bath = MUSTERBAEDER.find((b) => b.slug === slug);
    if (!bath) {
        return createMetadata({
            title: 'Musterbäder & Badkonzepte | Fliesenverlegung Tezgel',
            description: 'Musterbäder und Badkonzepte von Fachbetrieb Tezgel in Aßlar, Wetzlar und ganz Mittelhessen.',
            path: '/bad/musterbaeder'
        });
    }

    return musterbadMetadaten(bath, slug);
}

export default async function MusterbadDetailPage({ params }) {
    const { slug } = await params;
    const bath = MUSTERBAEDER.find((b) => b.slug === slug);

    if (!bath) {
        notFound();
    }

    const metadaten = musterbadMetadaten(bath, slug);

    // Bei ungerader Zahl der Ausstattungsgruppen belegt die letzte Gruppe beide Spalten (keine graue Restzelle)
    const gruppen = bath.components.length;
    const letzteBreit = gruppen % 2 === 1;

    return (
        <>
            <SeitenDaten
                pfad={`/bad/musterbaeder/${slug}`}
                titel={metadaten.title.absolute}
                beschreibung={metadaten.description}
                brotkrumen={[
                    { name: 'Start', href: '/' },
                    { name: 'Bad', href: '/bad' },
                    { name: `Musterbad ${bath.title} – Komplettbad & Badsanierung` },
                ]}
            />

            {/* 1. EINSTIEG: Rücklink und Maße im Etikett, H1 auf der Achse, Vorspann, Festpreis-Merkmal; rechts der Plan */}
            <section aria-labelledby="musterbad-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={
                        <>
                            <Knopf href="/bad/musterbaeder" variante="text" iconLinks="pfeil-links" className="font-text text-fs-2">
                                Zurück zur Musterbad-Übersicht
                            </Knopf>
                            <span className="tabular-nums">{bath.size}</span>
                            <Fugenkreuz className="size-3 shrink-0 text-strich" />
                            <span>{bath.tier}</span>
                        </>
                    }
                    titel={
                        <span id="musterbad-heading">
                            Musterbad {bath.title} –{' '}
                            <span>Komplettbad &amp; Badsanierung</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            {bath.headline}: Unser Musterbad {bath.title} bietet Ihnen ein schlüsselfertiges Komplettbad und eine professionelle Badsanierung von Fachbetrieb Tezgel in Aßlar und Wetzlar. Entdecken Sie alle Ausstattungsdetails, Sanitärobjekte und Markenkomponenten für Ihre Badplanung.
                        </p>
                    }
                    merkmale={
                        <ul className="grid gap-3">
                            <li className="flex items-center gap-3 font-text text-fs-2 text-tinte">
                                <Fugenkreuz className="size-3 shrink-0 text-strich" />
                                Verbindlicher Festpreis nach kostenfreiem Vor-Ort-Aufmaß – abgestimmt auf Ihren Grundriss.
                            </li>
                        </ul>
                    }
                    rand={
                        <Planblatt felder={planfelder(`Musterbad ${bath.title}`, 'badsanierung')}>
                            <Verlegeplan plan="badsanierung" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            {/* LEITACHSE: das Lot setzt die Achse des Einstiegs über die Abschnitte fort */}
            <Leitachse>
                {/* 2. AUSSTATTUNG als Feldraster: je Gruppe ein Feld mit Fugenkreuz-Liste der Komponenten */}
                <Abschnitt
                    titelId="komponenten-heading"
                    etikett="Ausstattung"
                    titel="Detaillierte Ausstattungs- und Komponentenliste"
                    einleitung={
                        <p>
                            Transparente Komponentenübersicht für das {bath.title} ({bath.sizeM2} m²): Alle Sanitärelemente, Armaturen und Fliesenoberflächen stimmen wir passgenau auf Ihren Grundriss ab.
                        </p>
                    }
                    leitachse
                    spaet
                >
                    <Feldraster spalten={2}>
                        {bath.components.map((comp, i) => (
                            <Feld key={comp.category} spanne={letzteBreit && i === gruppen - 1 ? 2 : undefined} className="gap-4">
                                <p className="border-b border-fuge pb-4 font-anzeige text-fs-4 font-semibold text-tinte">
                                    {comp.category}
                                </p>
                                <ul className="grid gap-3">
                                    {comp.items.map((item) => (
                                        <li key={item} className="flex items-start gap-3 font-text text-fs-2 text-tinte">
                                            <Fugenkreuz className="mt-1 size-3 shrink-0 text-strich" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Feld>
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 3. ANFRAGE ZU DIESEM MUSTERBAD: Kopf links, die beiden Wege und die Sicherheiten rechts */}
                <Abschnitt
                    titelId="musterbad-anfragen-heading"
                    kopf="seitlich"
                    titel="Dieses Musterbad anfragen"
                    einleitung={
                        <p>
                            Möchten Sie das {bath.title} ({bath.sizeM2} m²) in Ihrem Zuhause umsetzen? Wir passen Fliesenraster, Sanitärobjekte und Anschlüsse exakt an Ihre Raumsituation an.
                        </p>
                    }
                    leitachse
                    spaet
                >
                    <div className="space-y-8">
                        <div className="space-y-3 pt-2">
                            <Knopf href="#anfrage" icon="pfeil-rechts" className="w-full">Konzept unverbindlich anfragen</Knopf>
                            <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon" className="w-full">
                                Direkt anrufen: {COMPANY_DATA.contact.phone}
                            </Knopf>
                        </div>

                        <div className="border-t border-fuge pt-6">
                            <p className="font-text text-fs-3 font-semibold text-tinte">
                                Ihre Sicherheiten bei {COMPANY_DATA.legalName}:
                            </p>
                            <ul className="mt-4 grid gap-3">
                                {['Festpreisgarantie', 'Verbindlicher Bauzeitplan', 'Staubarme Sanierung'].map((item) => (
                                    <li key={item} className="flex items-center gap-3 font-text text-fs-2 text-tinte">
                                        <Fugenkreuz className="size-3 shrink-0 text-strich" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Abschnitt>

                {/* 4. BADANFRAGE auf Fliese: das Formular (8 Spalten) und die Rückfrage (4 Spalten, ab lg klebend) */}
                <Abschnitt id="anfrage" aria-label="Badanfrage" flaeche="fliese" leitachse spaet>
                    <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                        <div className="min-w-0 lg:col-span-8">
                            <BadanfrageFunnel />
                        </div>
                        <div className="lg:col-span-4">
                            <Rueckfrage />
                        </div>
                    </div>
                </Abschnitt>
            </Leitachse>
        </>
    );
}
