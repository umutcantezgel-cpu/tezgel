// Bad (E3-BAU-01, KERN v2): Erzählansicht nach dem Muster der Startseite und von /leistungen. Einstieg mit Achse, H1 links
// bündig, Vorspann, Knöpfe und Zusagen; rechts der Verlegeplan „bad“ ohne Achse (je Bildschirm nur ein roter Blickfang).
// Danach die Leitachse über die Abschnitte: Bad-Leistungen als Feldraster, Qualitäts-Kategorien als Feldraster auf Fliese,
// Projektcheck und Badanfrage in Lesebreite (Kopf seitlich, 8 Spalten). Wortlaut, Überschriften, Links, IDs und Lesefolge
// wie im Bestand. Kein großer Moment und keine Bewegung (setzt der Orchestrator).
import Link from 'next/link';
import clsx from 'clsx';
import { COMPANY_DATA } from '@/config/company';
import { QUALITY_TIERS } from '@/config/musterbaeder';
import { RATING_SUMMARY } from '@/config/reviews';
import BadProjektCheck from '@/components/funnels/BadProjektCheck';
import BadanfrageFunnel from '@/components/funnels/BadanfrageFunnel';
import { FinalCTA } from '@/components/ui/FinalCTA';
import { createMetadata } from '@/lib/metadata';
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
                                <Icon name="stern" groesse={4} />
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
                        // großer Moment: das Fugenbild rückt in die Flucht – am Desktop beim Zeigen, mobil beim Eintritt
                        <Planblatt felder={planfelder('Badsanierung', 'badsanierung')}>
                            <Verlegeplan plan="badsanierung" ohneAchse bemassung={false} interaktiv />
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

                {/* 3. QUALITÄTS-KATEGORIEN auf Fliese: je Kategorie ein Feld, Musterbäder als Textlink, Telefon im Satz */}
                <Abschnitt
                    titelId="bad-tiers-heading"
                    flaeche="fliese"
                    leitachse
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
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className={clsx(linkKlassen, 'font-mono')}>
                            {COMPANY_DATA.contact.phone}
                        </a>
                    </p>
                </Abschnitt>

                {/* 4. BAD-PROJEKTCHECK in Lesebreite: der Funnel trägt seine Überschrift selbst */}
                <Abschnitt id="projekt-check" aria-label="Bad-Projektcheck" kopf="seitlich" leitachse>
                    <BadProjektCheck />
                </Abschnitt>

                {/* 5. BADANFRAGE in Lesebreite auf Fliese */}
                <Abschnitt id="anfrage" aria-label="Badanfrage" kopf="seitlich" flaeche="fliese" leitachse>
                    <BadanfrageFunnel />
                </Abschnitt>
            </Leitachse>

            {/* 6. ABSCHLUSS */}
            <FinalCTA />
        </>
    );
}
