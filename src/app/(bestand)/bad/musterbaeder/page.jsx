// Musterbäder (E4-BAU-04, KERN v2): Erzählansicht nach dem Muster der Familienreferenz (bad/page.jsx). Einstieg mit Achse,
// H1 links bündig, Vorspann, Knöpfe; rechts das Planblatt „bad“ mit dem Verlegeplan (interaktiv, ohne Bemaßung).
// Danach die Leitachse über die Musterbad-Karten als Feldraster (je Musterbad ein Feld) und der Richtwert-Hinweis.
// Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand. Kein großer Moment (setzt der Orchestrator).
import Link from 'next/link';
import clsx from 'clsx';
import { MUSTERBAEDER } from '@/config/musterbaeder';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import SeitenDaten from '@/components/seo/SeitenDaten';
import Icon from '@/components/icons/Icon';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Leitachse from '@/components/kern/Leitachse';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import Verlegeplan from '@/components/kern/Verlegeplan';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import { etikettKlassen, linkKlassen } from '@/components/kern/stile';

const TITEL = 'Musterbäder & Badideen Wetzlar | Badsanierung Tezgel';
const BESCHREIBUNG = 'Inspiration für Ihr neues Bad: Musterbäder von 4,6 bis 15,9 m² mit Großformatfliesen, Walk-In Duschen & Markenkomponenten. Fachbetrieb Tezgel in Wetzlar!';

const METADATEN = createMetadata({
    title: TITEL,
    description: BESCHREIBUNG,
    path: '/bad/musterbaeder'
});

export const metadata = METADATEN;

export default function MusterbaederPage() {
    return (
        <>
            <SeitenDaten
                pfad="/bad/musterbaeder"
                titel={METADATEN.title.absolute}
                beschreibung={METADATEN.description}
                brotkrumen={[
                    { name: 'Start', href: '/' },
                    { name: 'Bad', href: '/bad' },
                    { name: 'Musterbäder & Badideen Wetzlar: Badsanierung Tezgel' },
                ]}
            />

            {/* 1. EINSTIEG: Etikett, H1 auf der Achse, Vorspann, Knöpfe; rechts das Planblatt „bad“ */}
            <section aria-labelledby="musterbaeder-heading">
                <Einstieg
                    art="erzaehl"
                    etikett="Transparente Raumkonzepte"
                    titel={
                        <span id="musterbaeder-heading">
                            Musterbäder &amp; Badideen Wetzlar:{' '}
                            <span>Badsanierung Tezgel</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Entdecken Sie unsere Musterbäder und modernen Badideen für Wetzlar, Aßlar und Mittelhessen. Als Fachbetrieb für Badsanierung Tezgel bieten wir transparente Ausstattungslisten und verlässliche Festpreis-Orientierungen mit hochwertigen Markenprodukten.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/bad/projekt-check" iconLinks="aufmass">Individuelles Bad online kalkulieren</Knopf>
                            <Knopf href="/bad/badanfrage" variante="neben">Badanfrage stellen</Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Musterbäder & Badideen', 'bad')}>
                            <Verlegeplan plan="bad" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            {/* LEITACHSE: das Lot setzt die Achse des Einstiegs über die Abschnitte fort */}
            <Leitachse>
                {/* 2. MUSTERBÄDER als Feldraster: je Musterbad ein Feld mit Ausstattungs-Highlights und den beiden Wegen */}
                <Abschnitt aria-label="Musterbäder" leitachse spaet>
                    <Feldraster spalten={2}>
                        {MUSTERBAEDER.map((bath) => (
                            <Feld key={bath.id} className="gap-6">
                                <article className="flex flex-1 flex-col justify-between gap-6">
                                    <div>
                                        <p className={clsx(etikettKlassen, 'flex-wrap')}>
                                            <span className="tabular-nums">{bath.size}</span>
                                            <Fugenkreuz className="size-3 shrink-0 text-strich" />
                                            <span>{bath.tier}</span>
                                        </p>

                                        <h2 className="mt-4 font-anzeige text-fs-4 font-semibold text-tinte">
                                            {bath.title}
                                        </h2>
                                        <p className="mt-2 font-text text-fs-2 text-tinte-2">
                                            {bath.headline}
                                        </p>

                                        <p className={clsx(etikettKlassen, 'mt-6')}>Ausstattungs-Highlights</p>
                                        <ul className="mt-3 grid gap-3">
                                            {bath.highlights.map((h) => (
                                                <li key={h} className="flex items-start gap-3 font-text text-fs-2 text-tinte">
                                                    <Fugenkreuz className="mt-1 size-3 shrink-0 text-strich" />
                                                    <span>{h}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-fuge pt-6">
                                        <Link
                                            href={`/bad/musterbaeder/${bath.slug}`}
                                            className={clsx(linkKlassen, 'inline-flex min-h-11 items-center gap-2 font-semibold')}
                                        >
                                            <Icon name="suche" groesse={4} />
                                            <span>Ausstattung &amp; Details: {bath.title}</span>
                                        </Link>

                                        <Knopf href="/bad/badanfrage" icon="pfeil-rechts">Anfragen</Knopf>
                                    </div>
                                </article>
                            </Feld>
                        ))}
                    </Feldraster>

                    <p className="mx-auto mt-8 flex max-w-mass items-start justify-center gap-2 text-center font-text text-fs-2 text-tinte-2">
                        <Icon name="info" groesse={4} className="mt-1 shrink-0 text-tinte" />
                        <span>
                            Alle Preise sind Richtwerte zur Orientierung. Den verbindlichen Festpreis erhalten Sie nach dem kostenfreien
                            Vor-Ort-Aufmaß – Fragen beantwortet {COMPANY_DATA.owner.fullName} gerne unter{' '}
                            <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className={clsx(linkKlassen, 'whitespace-nowrap font-mono')}>
                                {COMPANY_DATA.contact.phone}
                            </a>
                            .
                        </span>
                    </p>
                </Abschnitt>
            </Leitachse>
        </>
    );
}
