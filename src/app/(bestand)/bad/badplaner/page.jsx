// Badplaner (E4-BAU-03, KERN v2): Arbeitsansicht nach dem Muster von (bestand)/kontakt und der Familienreferenz /bad.
// Einstieg mit H1 (bisherige ID) und Knöpfen, danach ruhige Abschnitte: Tipp als Merk-Hinweis, Anleitung als
// Schrittfolge, „Und danach?“ als Feldraster, Badanfrage nachgeladen mit Rückfrage. Texte, Überschriften, Links,
// IDs und Lesefolge wie im Bestand; keine Auftritte außer aufklappen, druck, zustand.
import Link from 'next/link';
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import { COMPANY_DATA } from '@/config/company';
import Icon from '@/components/icons/Icon';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Hinweis from '@/components/kern/Hinweis';
import Knopf from '@/components/kern/Knopf';
import Rueckfrage from '@/components/kern/Rueckfrage';
import Schrittfolge from '@/components/kern/Schrittfolge';
import { seitenKlassen } from '@/components/kern/stile';
import { createMetadata } from '@/lib/metadata';
import SeitenDaten from '@/components/seo/SeitenDaten';

// Anfrageweg nachladen wie auf der Startseite (TEMPO, Z-08 / E-025)
const BadanfrageFunnel = dynamic(() => import('@/components/funnels/BadanfrageFunnel'), {
    loading: () => <FormularPlatzhalter />,
});

const TITEL = 'Badplaner zum Bad online planen | Fliesenverlegung Tezgel';
const BESCHREIBUNG = 'Planen Sie Ihr Bad online: Raumgröße, Fliesen & Ausstattung wählen. Fliesenverlegung Tezgel berät Sie mit kostenfreiem Vor-Ort-Aufmaß in Wetzlar & Aßlar!';

const METADATEN = createMetadata({
    title: TITEL,
    description: BESCHREIBUNG,
    path: '/bad/badplaner'
});

export const metadata = METADATEN;

const PLANNING_STEPS = [
    { num: '01', title: 'Raummaße & Anschlüsse erfassen', desc: 'Messen Sie Länge, Breite und Raumhöhe aus und notieren Sie die Positionen von Türen, Fenstern, Heizkörpern und Rohrleitungsanschlüssen.' },
    { num: '02', title: 'Ausstattung & Aufteilung festlegen', desc: 'Legen Sie Ihre Wunschausstattung fest – Walk-In-Dusche, Badewanne, Waschtischmöbel, Spiegelschrank und WC – und skizzieren Sie eine sinnvolle Anordnung.' },
    { num: '03', title: 'Farben, Fliesen & Licht abstimmen', desc: 'Kombinieren Sie Fliesenoberflächen, Wandfarben und moderne LED-Beleuchtung für eine harmonische Wohlfühlatmosphäre.' }
];

const NEXT_STEPS = [
    { title: 'Projektcheck', desc: 'Größe, Umfang und Wünsche vorab erfassen', href: '/bad/projekt-check' },
    { title: 'Musterbäder vergleichen', desc: 'Raumkonzepte von 4,6 bis 15,9 m² als Inspiration', href: '/bad/musterbaeder' },
    { title: 'Badanfrage stellen', desc: 'Ihre Planung direkt an den Fachbetrieb senden', href: '/bad/badanfrage' }
];

export default function BadplanerPage() {
    return (
        <>
            <SeitenDaten
                pfad="/bad/badplaner"
                titel={METADATEN.title.absolute}
                beschreibung={METADATEN.description}
                brotkrumen={[
                    { name: 'Start', href: '/' },
                    { name: 'Bad', href: '/bad' },
                    { name: 'Badplaner: Bad online planen mit Fliesenverlegung Tezgel' },
                ]}
            />

            {/* 1. EINSTIEG: Kennzeile, H1 mit bisheriger ID, Vorspann, Knöpfe; kein Plan, keine Randzeichnung */}
            <section aria-labelledby="badplaner-heading">
                <Einstieg
                    art="arbeit"
                    etikett={<>Badplanung Schritt für Schritt</>}
                    titel={
                        <span id="badplaner-heading">
                            Badplaner: Bad online planen mit{' '}
                            <span>Fliesenverlegung Tezgel</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Planen Sie Ihr Bad online in 3 Schritten: Raummaße erfassen, Ausstattung festlegen und
                            Fliesen abstimmen. Fliesenverlegung Tezgel berät Sie persönlich beim kostenfreien Vor-Ort-Aufmaß.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="#planung" icon="pfeil-rechts">Zur Schritt-für-Schritt-Anleitung</Knopf>
                            <Knopf href="/bad/projekt-check" variante="neben">Projektcheck starten</Knopf>
                        </>
                    }
                />
            </section>

            {/* 2. TIPP als Merk-Hinweis mit Überschrift (H2 mit bisheriger ID) */}
            <section aria-labelledby="badplaner-tipp-heading" className="py-12 lg:py-16">
                <div className={seitenKlassen}>
                    <div className="max-w-mass">
                        <Hinweis
                            art="merk"
                            titel={
                                <h2 id="badplaner-tipp-heading" className="text-fs-5 text-tinte">
                                    Tipp: Skizze, Maße &amp; Fotos genügen für den Start
                                </h2>
                            }
                        >
                            <p>
                                Eine einfache Grundriss-Skizze mit Maßen, Fenstern, Dachschrägen und Anschlüssen sowie ein paar Fotos
                                reichen für die erste Planung. Beim kostenfreien Vor-Ort-Aufmaß prüft {COMPANY_DATA.owner.fullName} alle
                                Details gemeinsam mit Ihnen.
                            </p>
                        </Hinweis>
                    </div>
                </div>
            </section>

            {/* 3. ANLEITUNG: Schrittfolge im Kopf links, die drei Schritte rechts (ab lg waagrecht an der Fuge) */}
            <Abschnitt
                id="planung"
                titelId="planung-heading"
                art="arbeit"
                kopf="seitlich"
                spaet
                etikett="Anleitung"
                titel="So funktioniert die Badplanung"
                einleitung={<p>In drei einfachen Schritten von Ihrer Idee zum durchdachten Badkonzept.</p>}
            >
                <Schrittfolge
                    ausrichtung="waagrecht"
                    nummerStumm
                    schritte={PLANNING_STEPS.map((step) => ({
                        nummer: step.num,
                        titel: (
                            <>
                                <span className="sr-only">Schritt {step.num}: </span>
                                {step.title}
                            </>
                        ),
                        text: step.desc,
                    }))}
                />
            </Abschnitt>

            {/* 4. UND DANACH: drei Felder als Wege, je Feld ein Link (ganze Fläche) */}
            <Abschnitt art="arbeit" kopf="seitlich" flaeche="fliese" spaet titel="Und danach?">
                <Feldraster spalten={3}>
                    {NEXT_STEPS.map((item) => (
                        <Feld key={item.href} className="relative">
                            <Link href={item.href} className="group flex flex-1 flex-col gap-2 after:absolute after:inset-0">
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

            {/* 5. ANFRAGE: Badanfrage (nachgeladen) mit Rückfrage daneben; ab lg 8 + 4 Spalten */}
            <Abschnitt id="anfrage" aria-label="Badanfrage" art="arbeit" flaeche="fliese" spaet>
                <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                    <div className="min-w-0 lg:col-span-8">
                        <BadanfrageFunnel />
                    </div>
                    <div className="lg:col-span-4">
                        <Rueckfrage />
                    </div>
                </div>
            </Abschnitt>
        </>
    );
}
