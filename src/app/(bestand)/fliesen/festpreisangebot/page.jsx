// Festpreisangebot (E4-BAU-06, KERN v2): Erzählansicht nach dem Muster der Fliesen-Familie (/fliesen) und von /bad.
// Einstieg mit Laserachse, H1 links, Vorspann und Knöpfe; rechts das Planblatt „wohnen“ mit dem Verlegeplan (ohne Bemaßung,
// interaktiv). Danach die Leitachse über die Abschnitte: Schritte als Feldraster, Kostenfaktoren als Merkliste, Positionen als
// Tabelle, Rückbau und Vergleich als Feldraster, Steuerbonus als Text, Weiterführende Ratgeber als Feldraster. Wortlaut,
// Überschriften, Links, IDs und Lesefolge wie im Bestand. Der Konfigurator ist nachgeladen (Tempo), die Rückfrage steht daneben.
// Kein großer Moment und kein Auftritt (setzt der Orchestrator).
import Link from 'next/link';
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import SeitenDaten from '@/components/seo/SeitenDaten';
import Icon from '@/components/icons/Icon';
import QualityPromise from '@/components/sections/QualityPromise';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import Leitachse from '@/components/kern/Leitachse';
import Merkliste from '@/components/kern/Merkliste';
import Rueckfrage from '@/components/kern/Rueckfrage';
import Tabelle from '@/components/kern/Tabelle';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { linkKlassen } from '@/components/kern/stile';

// Konfigurator nachladen (Tempo, wie auf der Startseite und den Leistungsseiten); der Funnel steht am Abschnitt unten
const FliesenKonfigurator = dynamic(() => import('@/components/funnels/FliesenKonfigurator'), {
    loading: () => <FormularPlatzhalter />,
});

export const metadata = createMetadata({
    title: 'Fliesenleger Festpreisangebot | Fachbetrieb Tezgel',
    description:
        'Transparentes Festpreisangebot für Fliesenarbeiten: Aufmaß, Material & Verlegung ohne versteckte Kosten. Jetzt kostenfreies Vor-Ort-Aufmaß anfragen!',
    path: '/fliesen/festpreisangebot'
});

const PROMISES = [
    { title: 'Kostenfreies Aufmaß vor Ort', desc: 'Flächen, Untergrund und Details werden vor Ort aufgenommen – die Grundlage für ein belastbares Angebot.' },
    { title: 'Verbindlicher Festpreis', desc: 'Für den im Angebot beschriebenen Leistungsumfang gilt der vereinbarte Preis – ohne versteckte Zusatzkosten.' },
    { title: 'Transparente Positionen', desc: 'Jede Leistung steht als eigene Position mit Menge und Einheit im Angebot – nachvollziehbar und vergleichbar.' },
    { title: 'Bauzeitenplan & Termintreue', desc: 'Feste Zusagen für Start und Fertigstellung, damit Sie Ihren Alltag und andere Gewerke planen können.' },
    { title: 'Ein Ansprechpartner', desc: `${COMPANY_DATA.owner.fullName} begleitet Ihr Projekt persönlich – vom Aufmaß bis zur Abnahme.` }
];

const COST_FACTORS = [
    { title: 'Fläche', desc: 'Die Quadratmeterzahl bestimmt Material- und Arbeitsmenge. Kleine Flächen mit vielen Ecken, Nischen und Aussparungen verursachen pro Quadratmeter mehr Aufwand als große, offene Flächen.' },
    { title: 'Format', desc: 'Großformate brauchen einen besonders ebenen Untergrund, vollflächige Bettung und Hebetechnik. Mosaik und kleine Formate bedeuten viele Fugen und viel Handarbeit. Standardformate liegen dazwischen.' },
    { title: 'Muster & Details', desc: 'Diagonal-, Fischgrät- oder wilder Verband erzeugen mehr Zuschnitte als eine gerade Verlegung. Gehrungskanten, Nischen, Sockel und Profile kommen als eigene Positionen hinzu.' },
    { title: 'Untergrund', desc: 'Ob ausgeglichen, grundiert, entkoppelt oder abgedichtet werden muss, entscheidet sich beim Aufmaß. Ein guter Untergrund spart Aufwand, ein schwieriger erfordert Vorarbeiten.' }
];

const POSITIONS = [
    { unit: 'm²', label: 'Flächenleistungen', desc: 'Boden- und Wandfliesen verlegen, Untergrund ausgleichen, grundieren, Verbundabdichtung auftragen.' },
    { unit: 'lfm', label: 'Laufende Meter', desc: 'Sockel, Gehrungskanten, Abschlussprofile, elastische Anschlussfugen, Dichtbänder.' },
    { unit: 'Stk', label: 'Stückpositionen', desc: 'Aussparungen für Rohre und Abläufe, Dichtmanschetten, Treppenstufen, Nischen.' },
    { unit: 'Zulage', label: 'Zulagen', desc: 'Mehraufwand für Diagonal- oder Fischgrätverlegung, Großformate oder schwer zugängliche Bereiche.' }
];

const COMPARE = [
    'Ist der Leistungsumfang gleich – gleiche Flächen, gleiche Details, gleiche Vorarbeiten?',
    'Ist das Fliesenmaterial enthalten, oder wird es von Ihnen gestellt?',
    'Sind Untergrundvorbereitung und Abdichtung ausgeschrieben – und nach welcher Norm?',
    'Welche Kleber- und Fugenmörtelklassen sind vorgesehen?',
    'Sind Rückbau, Entsorgung und Schutzmaßnahmen enthalten oder separat?',
    'Gibt es Bedarfs- oder Eventualpositionen, und wie wahrscheinlich sind sie?',
    'Sind Termine für Beginn und Fertigstellung genannt?'
];

const CROSS_LINKS = [
    { href: '/bad/projekt-check', label: 'Bad-Projektcheck', desc: 'Ihr Badprojekt strukturiert beschreiben' },
    { href: '/beratung', label: 'Beratung', desc: 'Ihr Projekt persönlich besprechen' },
    { href: '/unternehmen', label: 'Über unseren Betrieb', desc: 'Fachbetrieb aus Aßlar' },
    { href: '/agb', label: 'AGB', desc: 'Unsere Vertragsbedingungen' }
];

export default function FestpreisangebotPage() {
    return (
        <>
            <SeitenDaten
                pfad="/fliesen/festpreisangebot"
                titel="Fliesenleger Festpreisangebot | Fachbetrieb Tezgel"
                beschreibung="Transparentes Festpreisangebot für Fliesenarbeiten: Aufmaß, Material & Verlegung ohne versteckte Kosten. Jetzt kostenfreies Vor-Ort-Aufmaß anfragen!"
                brotkrumen={[
                    { name: 'Start', href: '/' },
                    { name: 'Fliesen und Verlegung', href: '/fliesen' },
                    { name: 'Festpreisangebot für Fliesenarbeiten: was den Aufwand bestimmt' },
                ]}
            />
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, Knöpfe; rechts das Planblatt „wohnen“ */}
            <section aria-labelledby="festpreis-heading">
                <Einstieg
                    art="erzaehl"
                    etikett="Transparente Kalkulation"
                    titel={<span id="festpreis-heading">Festpreisangebot für Fliesenarbeiten: was den Aufwand bestimmt</span>}
                    vorspann={
                        <p>
                            Was eine Fliesenarbeit kostet, lässt sich seriös erst nach einem Blick auf Fläche, Untergrund und Details sagen. Diese
                            Seite erklärt, welche Faktoren den Aufwand bestimmen, wie ein Angebot aufgebaut ist und wie Sie Angebote fair vergleichen.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Kostenfreies Aufmaß anfragen
                            </Knopf>
                            <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
                                <span className="font-mono font-normal">{COMPANY_DATA.contact.phone}</span>
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Fliesenleger Festpreisangebot', 'wohnen')}>
                            <Verlegeplan plan="wohnen" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. VOM AUFMASS ZUM FESTPREIS: fünf Schritte als Feldraster; der fünfte Schritt über die volle Breite */}
                <Abschnitt
                    titelId="aufmass-heading"
                    leitachse
                    spaet
                    etikett="Unser Weg zum Angebot"
                    titel="Vom kostenfreien Aufmaß zum Festpreisangebot"
                    einleitung={
                        <p>
                            Beim Termin vor Ort nehmen wir die Flächen auf, prüfen Untergrund und Restfeuchte und besprechen Format, Verlegemuster und
                            Details mit Ihnen. Auf dieser Grundlage erstellen wir das schriftliche Angebot mit einem Festpreis für den darin beschriebenen
                            Leistungsumfang.
                        </p>
                    }
                >
                    <Feldraster spalten={3}>
                        {PROMISES.map((item, i) => (
                            <Feld key={item.title} spanne={i === PROMISES.length - 1 ? 2 : undefined}>
                                <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                <p className="mt-3 font-text text-fs-2 text-tinte-2">{item.desc}</p>
                            </Feld>
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 3. KOSTENFAKTOREN: vier Punkte als Merkliste an der Fuge */}
                <Abschnitt titelId="faktoren-heading" leitachse spaet flaeche="fliese" etikett="Aufwand" titel="Die wichtigsten Kostenfaktoren: Fläche, Format, Muster, Untergrund">
                    <Merkliste spalten={4} titelAls="h3" eintraege={COST_FACTORS.map((item) => ({ titel: item.title, text: item.desc }))} />
                </Abschnitt>

                {/* 4. POSITIONEN: Abrechnungseinheiten als Tabelle mit Zeilenkopf */}
                <Abschnitt
                    titelId="positionen-heading"
                    leitachse
                    spaet
                    etikett="Angebot lesen"
                    titel="Positionen im Angebot lesen: m², laufende Meter, Stück, Zulagen"
                    einleitung={
                        <p>
                            Ein gutes Angebot trennt die Leistungen nach ihrer Abrechnungseinheit. So sehen Sie genau, wofür Sie bezahlen, und können
                            Mengen mit dem Aufmaß abgleichen.
                        </p>
                    }
                >
                    <Tabelle
                        name="Typische Abrechnungseinheiten in einem Angebot für Fliesenarbeiten"
                        kopf={['Einheit', 'Art', 'Typische Beispiele']}
                        zeilen={POSITIONS.map((row) => [row.unit, row.label, row.desc])}
                    />
                </Abschnitt>

                {/* 5. RÜCKBAU UND VERGLEICH: zwei Felder nebeneinander, je mit eigener Überschrift; Überfliesen als Textlink */}
                <Abschnitt flaeche="fliese" leitachse spaet>
                    <Feldraster spalten={2}>
                        <Feld>
                            <article aria-labelledby="rueckbau-heading" className="flex flex-1 flex-col">
                                <h2 id="rueckbau-heading" className="font-anzeige text-fs-5 text-tinte">
                                    Rückbau, Entsorgung und Staubschutz
                                </h2>
                                <div className="mt-4 space-y-3 font-text text-fs-3 text-tinte-2">
                                    <p>
                                        Muss ein alter Belag entfernt werden, hängt der Aufwand davon ab, wie fest er haftet, was darunter liegt und wie
                                        viel Material abtransportiert wird. Rückbau und Entsorgung stehen deshalb als eigene Positionen im Angebot.
                                    </p>
                                    <p>
                                        Schutzmaßnahmen für bewohnte Räume – Abdeckungen, Staubschutzwände, geschützte Laufwege – gehören bei Sanierungen
                                        dazu und werden ebenfalls ausgewiesen. Ob ein Überfliesen statt Rückbau möglich ist, klären wir beim Aufmaß.
                                    </p>
                                </div>
                                <div className="mt-auto pt-6">
                                    <Knopf href="/untergrund-abdichtung/fliesen-auf-fliesen" variante="text" icon="pfeil-rechts">
                                        Überfliesen oder Rückbau?
                                    </Knopf>
                                </div>
                            </article>
                        </Feld>
                        <Feld>
                            <article aria-labelledby="vergleich-heading" className="flex flex-1 flex-col">
                                <h2 id="vergleich-heading" className="font-anzeige text-fs-5 text-tinte">
                                    Angebote fair vergleichen: worauf Sie achten sollten
                                </h2>
                                <ul className="mt-4 grid gap-3">
                                    {COMPARE.map((item) => (
                                        <li key={item} className="flex gap-3 font-text text-fs-2 text-tinte">
                                            <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                                                <Fugenkreuz className="size-3" />
                                            </span>
                                            <span className="min-w-0">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        </Feld>
                    </Feldraster>
                    <p className="mt-8 max-w-mass font-text text-fs-2 text-tinte-2">
                        Der Festpreis gilt für den im Angebot beschriebenen Leistungsumfang. Wie mit zusätzlichen Wünschen oder Änderungen umgegangen
                        wird, besprechen wir mit Ihnen vor der Ausführung; es gelten unsere{' '}
                        <Link href="/agb" className={linkKlassen}>
                            AGB
                        </Link>
                        .
                    </p>
                </Abschnitt>

                {/* 6. STEUERBONUS: Text mit Hinweis und Textlink; der Abschnitt steht auf Kalk */}
                <Abschnitt
                    titelId="steuer-heading"
                    leitachse
                    spaet
                    titel="Steuerbonus für Handwerkerleistungen im Kurzüberblick"
                    einleitung={
                        <>
                            <p>
                                Für Renovierungs-, Erhaltungs- und Modernisierungsarbeiten im selbst genutzten Haushalt können Privatpersonen nach § 35a
                                Abs. 3 EStG eine Steuerermäßigung von 20 % der Arbeitskosten geltend machen, begrenzt auf einen gesetzlichen
                                Jahreshöchstbetrag. Begünstigt sind Arbeits-, Maschinen- und Fahrtkosten, nicht das Material. Arbeiten im Neubau sind nicht
                                begünstigt. Voraussetzung sind eine Rechnung mit ausgewiesenem Arbeitsanteil und die unbare Zahlung, etwa per Überweisung.
                            </p>
                            <p className="mt-3 text-fs-2 text-tinte-2">
                                Allgemeine Information, keine Steuerberatung. Ob und in welcher Höhe die Ermäßigung in Ihrem Fall greift, klären Sie bitte
                                mit Ihrer Steuerberatung.
                            </p>
                            <div className="mt-6">
                                <Knopf href="/blog/handwerkerbonus-fliesenarbeiten" variante="text" icon="pfeil-rechts">
                                    Handwerkerbonus für Fliesenarbeiten im Ratgeber
                                </Knopf>
                            </div>
                        </>
                    }
                />

                {/* 7. WEITERFÜHRENDE RATGEBER: vier Felder je mit einem Verweis; das ganze Feld ist der Link */}
                <Abschnitt titelId="ratgeber-heading" leitachse spaet flaeche="fliese" titel="Weiterführende Ratgeber zu Preisen & Fliesenverlegung">
                    <Feldraster spalten={4}>
                        {CROSS_LINKS.map((link) => (
                            <Feld key={link.href} className="relative">
                                <Link href={link.href} className="group flex flex-1 flex-col gap-2 after:absolute after:inset-0">
                                    <span className="flex items-center justify-between gap-2 font-anzeige text-fs-4 text-tinte underline decoration-strich underline-offset-4 group-hover:decoration-tinte">
                                        {link.label}
                                        <Icon name="pfeil-rechts" groesse={5} className="shrink-0 text-tinte" />
                                    </span>
                                    <span className="font-text text-fs-2 text-tinte-2">{link.desc}</span>
                                </Link>
                            </Feld>
                        ))}
                    </Feldraster>
                </Abschnitt>
            </Leitachse>

            {/* 8. ABSCHLUSS DER LESEFOLGE: Qualitätsversprechen, danach der Konfigurator mit Rückfrage daneben */}
            <QualityPromise />

            <Abschnitt aria-label="Fliesen-Konfigurator" flaeche="fliese" spaet>
                <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                    <div className="min-w-0 lg:col-span-8">
                        <FliesenKonfigurator />
                    </div>
                    <div className="lg:col-span-4">
                        <Rueckfrage />
                    </div>
                </div>
            </Abschnitt>
        </>
    );
}
