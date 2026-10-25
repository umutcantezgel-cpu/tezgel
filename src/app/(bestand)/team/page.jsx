// Team (S-20 nach E5-BAU-04 sinngemäß, KERN v2): Erzählansicht nach dem Vorbild von /ueber-uns. Einstieg mit Laserachse,
// Kennzeile, H1 links und Vorspann; rechts das Planblatt „Unser Team“ mit dem Plan „wohnen“ (interaktiv, die rote Achse
// trägt das Blatt). Danach die Leitachse über die Abschnitte:
// 2. Personen als Feldraster mit zwei Feldern ohne Kartenoptik (Fliese): das Monogramm des Bestands als gezeichnete Marke
// (keine Fotos – der Bestand hat keine), Name als H2, Rolle als Mono-Etikett, Text; darunter das Kennenlernen als zweites
// Feldraster in Kalk (Text | Telefon und Aufmaß, in der Flucht der Personenfelder) und der Weg zu Karriere als Textlink ·
// Qualitätsversprechen und Abschluss (geteilte Bausteine). Kein Auftritt, kein großer Moment.
// Wortlaut, Überschriften, Links und Lesefolge wie im Bestand; Metadaten und Daten unverändert. Serverkomponente.
import Link from 'next/link';
import { COMPANY_DATA, team } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';
import FinalCTA from '@/components/ui/FinalCTA';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import Leitachse from '@/components/kern/Leitachse';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { etikettKlassen, linkKlassen } from '@/components/kern/stile';
import SeitenDaten from '@/components/seo/SeitenDaten';

const TITEL = 'Unser Team | Fliesenleger-Fachbetrieb Tezgel Aßlar';
const BESCHREIBUNG = 'Das Team von Fliesenverlegung Tezgel: Inhaber Deniz Tezgel und qualifizierte Fliesenleger für Fliesen- & Badprojekte in Aßlar, Wetzlar & ganz Hessen.';

export const metadata = createMetadata({
    title: TITEL,
    description: BESCHREIBUNG,
    path: '/team'
});

export default function TeamPage() {
    const { owner, contact, authority } = COMPANY_DATA;

    return (
        <>
            <SeitenDaten
                pfad="/team"
                titel={TITEL}
                beschreibung={BESCHREIBUNG}
                brotkrumen={[{ name: 'Start', href: '/' }, { name: 'Unser Team: Fliesenleger-Fachbetrieb Tezgel Aßlar' }]}
            />
            {/* 1. EINSTIEG: Kennzeile, H1 an der Laserachse, Vorspann; rechts das Planblatt „wohnen“ */}
            <Einstieg
                art="erzaehl"
                etikett={
                    <>
                        <Fugenkreuz className="size-3 shrink-0 text-strich" />
                        Kompetenz &amp; Leidenschaft
                    </>
                }
                titel={
                    <>
                        Unser Team:{' '}
                        <span>Fliesenleger-Fachbetrieb Tezgel Aßlar</span>
                    </>
                }
                vorspann={
                    <p>
                        Lernen Sie unser Team kennen: Hinter dem Fliesenleger-Fachbetrieb Tezgel Aßlar steht ein eingespieltes Team aus Handwerkern – geführt von Inhaber {owner.fullName}. Für Ihr Projekt in Wetzlar, Gießen und ganz Hessen.
                    </p>
                }
                rand={
                    <Planblatt felder={planfelder('Unser Team', 'wohnen')}>
                        <Verlegeplan plan="wohnen" ohneAchse bemassung={false} interaktiv />
                    </Planblatt>
                }
            />

            {/* LEITACHSE: das Lot setzt die Achse des Einstiegs über die Abschnitte fort */}
            <Leitachse>
                {/* 2. PERSONEN als Feldraster (Fliese) und darunter das Kennenlernen als Feldraster in Kalk */}
                <Abschnitt flaeche="fliese" leitachse spaet>
                    <Feldraster spalten={2}>
                        {team.map((member) => (
                            <Feld key={member.name}>
                                <span
                                    aria-hidden="true"
                                    className="flex size-12 items-center justify-center border border-strich font-anzeige text-fs-5 font-extrabold text-tinte"
                                >
                                    {member.name.charAt(0)}
                                </span>
                                <h2 className="mt-8 text-fs-5 text-tinte">{member.name}</h2>
                                <p className="mt-3 font-mono text-fs-1 text-tinte-2">{member.role}</p>
                                <p className="mt-4 max-w-mass text-fs-3 text-tinte-2">{member.experience}</p>
                            </Feld>
                        ))}
                    </Feldraster>

                    <div className="mt-12 grid grid-cols-1 gap-px border border-fuge bg-fuge md:grid-cols-2">
                        <div className="flex flex-col gap-2 bg-kalk p-6 lg:p-8">
                            <p className={etikettKlassen}>
                                <Fugenkreuz className="size-3 shrink-0 text-strich" />
                                {authority.certification}
                            </p>
                            <p className="mt-2 font-anzeige text-fs-5 font-extrabold text-tinte">
                                Lernen Sie uns persönlich kennen
                            </p>
                            <p className="text-fs-2 text-tinte-2">
                                Beim kostenfreien Vor-Ort-Aufmaß berät Sie {owner.fullName} persönlich.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center gap-3 bg-kalk p-6 sm:flex-row sm:flex-wrap sm:items-center md:justify-start lg:p-8">
                            <Knopf href={`tel:${contact.phoneLink}`} variante="neben" iconLinks="telefon" className="w-full sm:w-auto">
                                <span className="font-mono font-normal">{contact.phone}</span>
                            </Knopf>
                            <Knopf href="/kontakt" icon="pfeil-rechts" className="w-full sm:w-auto">
                                Aufmaß anfragen
                            </Knopf>
                        </div>
                    </div>

                    {/* pb-1: Fokusrahmen des Links unten innerhalb der spaet-Hülle (content-visibility schneidet am Rand ab) */}
                    <p className="mt-8 pb-1 text-fs-2 text-tinte-2">
                        Sie möchten unser Team verstärken?{' '}
                        <Link href="/karriere" className={`${linkKlassen} whitespace-nowrap`}>
                            Zu Karriere &amp; Jobs
                        </Link>
                    </p>
                </Abschnitt>
            </Leitachse>

            <QualityPromise />

            <FinalCTA
                headline="Bauen Sie auf ein starkes Team: Jetzt Ihr Fliesen- oder Badprojekt anfragen."
                subtitle="Erfahrene Fachkräfte • Inhabergeführte Baustelle • Feste Terminzusagen"
                buttonText="Jetzt Projekt unverbindlich anfragen"
            />
        </>
    );
}
