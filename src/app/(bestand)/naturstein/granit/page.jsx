// Granit, Schiefer & Quarzit (E5-BAU-06 · S-15, KERN v2): Seitenkörper der Unterseite als Erzählansicht nach dem Muster
// der Familienreferenz (leistungen/[id], fliesen) und der Hubseite /naturstein. Einstieg mit Laserachse, H1 links, Vorspann
// und zwei Knöpfe; rechts das Planblatt „naturstein“ (Drittelverband), interaktiv. Danach die Leitachse über die
// Abschnitte, Flächen Fliese und Kalk im Wechsel:
// 2. Grundlagen (Fliese): Text an der Fuge mit Warnhinweis, daneben das Feld „Granit im Handel“ · 3. Gesteine (Kalk):
// Feldraster mit fünf Feldern ohne Restzelle · 4. Schiefer und Oberflächen (Fliese): Feld zu Schiefer, daneben die
// Oberflächen als Zeilen an der Fuge · 5. Verlegung und Einsatz (Kalk): zwei Felder, darunter der Hinweis zur Sortierung ·
// 6. Beratung und Aufmaß (Fliese): drei Wege, darunter die weiterführenden Ratgeber.
// Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand. Kein Auftritt und kein großer Moment. Metadaten unverändert.
import Link from 'next/link';
import clsx from 'clsx';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import Icon from '@/components/icons/Icon';
import QualityPromise from '@/components/sections/QualityPromise';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import Leitachse from '@/components/kern/Leitachse';
import Merkliste from '@/components/kern/Merkliste';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { etikettKlassen, linkKlassen } from '@/components/kern/stile';
import SeitenDaten from '@/components/seo/SeitenDaten';

export const metadata = createMetadata({
    title: 'Granit & Schiefer verlegen lassen | Fliesen Tezgel',
    description:
        'Granit- & Schieferbeläge für Boden, Treppe und Außenbereich fachgerecht verlegen lassen: passende Kleber & Imprägnierung. Fachbetrieb Tezgel in Hessen.',
    path: '/naturstein/granit'
});

const STONES = [
    {
        title: 'Granit & granitähnliche Tiefengesteine',
        desc: 'Grobkörnig, sehr hart und dicht. Klassiker für stark begangene Böden, Eingangsbereiche und Treppen; viele Sorten sind frostbeständig und damit auch für außen geeignet.'
    },
    {
        title: 'Gneis',
        desc: 'Metamorphes, unter Druck und Hitze umgewandeltes Gestein mit oft streifiger, bewegter Zeichnung. Ähnlich robust wie Granit, im Handel häufig ebenfalls unter „Granit“ geführt.'
    },
    {
        title: 'Quarzit',
        desc: 'Besteht fast vollständig aus Quarz und ist entsprechend hart und abriebfest. Häufig spaltrau oder mit feiner Oberfläche erhältlich, innen wie außen beliebt.'
    },
    {
        title: 'Schiefer',
        desc: 'Feinschichtig, meist dunkel, spaltrau oder geschliffen. Vergleichsweise weich und kratzempfindlicher als Granit, aber überwiegend silikatisch aufgebaut.'
    },
    {
        title: 'Silikatische Sandsteine',
        desc: 'Körnige Steine mit warmer, natürlicher Oberfläche. Entscheidend ist das Bindemittel zwischen den Körnern: Nur bei kieseligem Bindemittel ist der Stein weitgehend säureunempfindlich.'
    }
];

const SURFACES = [
    { name: 'Poliert', text: 'Glänzend, farbintensiv, pflegeleicht – bei Nässe aber glatt. Für trockene Wohnbereiche und Wandflächen.' },
    { name: 'Geschliffen / gehont', text: 'Seidenmatt, ruhige Optik, trittsicherer als poliert. Vielseitig für Böden innen.' },
    { name: 'Geflammt', text: 'Durch Hitze aufgeraute, griffige Oberfläche. Typisch für Granit im Außenbereich und auf Außentreppen.' },
    { name: 'Gebürstet / sandgestrahlt', text: 'Leicht strukturiert, samtige Haptik. Verbindet Rutschhemmung mit angenehmem Gehgefühl.' },
    { name: 'Spaltrau', text: 'Natürliche Spaltfläche, besonders bei Schiefer und Quarzit. Lebendige Optik, gute Trittsicherheit.' }
];

const FURTHER_READING = [
    { label: 'Naturstein-Ratgeber: Imprägnierung & Pflege', href: '/naturstein' },
    { label: 'Marmor, Travertin & Kalkstein', href: '/naturstein/marmor-kalkstein' },
    { label: 'Treppen neu belegen', href: '/treppen' },
    { label: 'Leistung: Außenbereiche & Balkone', href: '/leistungen/aussen' }
];

// Hinweis von Hand (Gestalt wie kern/Hinweis): Der Text beginnt wie im Bestand mit seinem fetten Stichwort im selben
// Absatz – ohne den vorgesetzten Artnamen des Bausteins, der den Wortlaut der Zeile ändern würde.
const HINWEIS = 'flex items-start gap-4 border border-l-2 bg-fliese p-6 font-text text-fs-2 text-tinte';
// Überschrift in einem Feld (H2 bzw. H3 im Bestand, eine Stufe unter den Abschnittsköpfen)
const FELD_TITEL = 'font-anzeige text-fs-5 text-tinte';
// Feld mit eigener Überschrift (Gestalt wie kern/Feld; als article mit aria-labelledby wie im Bestand)
const FELD = 'flex flex-col bg-fliese p-6 lg:p-8';
// Fließtext in Feldern
const FELD_TEXT = 'max-w-mass space-y-3 font-text text-fs-3 text-tinte-2';

export default function GranitPage() {
    return (
        <>
            <SeitenDaten
                pfad="/naturstein/granit"
                titel="Granit & Schiefer verlegen lassen | Fliesen Tezgel"
                beschreibung="Granit- & Schieferbeläge für Boden, Treppe und Außenbereich fachgerecht verlegen lassen: passende Kleber & Imprägnierung. Fachbetrieb Tezgel in Hessen."
                brotkrumen={[{ name: 'Start', href: '/' }, { name: 'Naturstein', href: '/naturstein' }, { name: 'Granit, Schiefer und Quarzit: silikatische Natursteine richtig verlegen' }]}
            />
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts das Planblatt „naturstein“ */}
            <section aria-labelledby="granit-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={<>Silikatische Natursteine</>}
                    titel={
                        <span id="granit-heading">
                            Granit, Schiefer und Quarzit:{' '}
                            <span>silikatische Natursteine richtig verlegen</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Granit, Schiefer und Quarzit: silikatische Natursteine richtig verlegen mit verfärbungsfreien Spezialmörteln und hohlraumfreier Bettung. Hart im Nehmen und deutlich unempfindlicher gegen Säure als Marmor, eignen sie sich perfekt für stark genutzte Böden, Treppen und Außenbereiche.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Granitverlegung anfragen
                            </Knopf>
                            <Knopf href="/naturstein" variante="neben">
                                Naturstein-Ratgeber
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Granit & Schiefer verlegen lassen', 'naturstein')}>
                            <Verlegeplan plan="naturstein" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. GRUNDLAGEN: Text an der Fuge mit Warnhinweis (7 Spalten), daneben das Feld zum Handelsnamen (5 Spalten) */}
                <Abschnitt
                    titelId="granit-silikat-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Grundlagen"
                    titel="Silikatisch statt kalkhaltig: was das für Säure, Flecken und Pflege bedeutet"
                >
                    <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                        <div className="max-w-mass space-y-4 font-text text-fs-3 text-tinte-2 lg:col-span-7">
                            <p>
                                Silikatische Gesteine bestehen überwiegend aus Quarz, Feldspat und Glimmer. Diese Minerale werden von
                                haushaltsüblichen Säuren wie Essig oder Zitronensaft praktisch nicht angegriffen – anders als der Kalk in
                                Marmor oder Travertin.
                            </p>
                            <p>
                                Unempfindlich gegen Flecken sind sie deshalb nicht automatisch: Auch Granit hat Poren, in die Öl oder
                                Rotwein eindringen können. Eine Imprägnierung und eine pH-neutrale Pflege halten die Oberfläche
                                dauerhaft schön – Einzelheiten dazu im{' '}
                                <Link href="/naturstein" className={linkKlassen}>
                                    Naturstein-Ratgeber
                                </Link>
                                .
                            </p>
                            <div className={clsx(HINWEIS, 'mt-8 border-tinte')}>
                                <Icon name="hinweis" groesse={5} className="mt-1 text-tinte" />
                                <p className="min-w-0">
                                    <strong className="font-semibold">Ausnahmen kennen:</strong> Sandsteine mit kalkhaltigem Bindemittel
                                    reagieren auf Säure wie Kalkstein. Schiefer kann Kalk oder Pyrit enthalten; Pyrit oxidiert an der Luft
                                    und hinterlässt Rostflecken. Fragen Sie beim Kauf nach den Prüfwerten der Sorte.
                                </p>
                            </div>
                        </div>
                        <div className="lg:col-span-5">
                            <div className="border border-fuge bg-kalk p-6 lg:p-8">
                                <h3 className="font-anzeige text-fs-4 text-tinte">„Granit“ im Handel: Handelsname und Gesteinsart</h3>
                                <p className="mt-3 font-text text-fs-2 text-tinte-2">
                                    Im Natursteinhandel steht „Granit“ oft für eine ganze Gruppe harter, polierfähiger Gesteine. Unter diesem Namen
                                    werden auch Gneis, Gabbro oder andere Tiefengesteine verkauft. Für die Verlegung zählen deshalb nicht der
                                    Handelsname, sondern Gesteinsart und Prüfwerte: Wasseraufnahme, Frostbeständigkeit und Biegefestigkeit.
                                </p>
                            </div>
                        </div>
                    </div>
                </Abschnitt>

                {/* 3. GESTEINE: fünf Felder; das letzte überspannt ab md zwei Spalten (keine graue Restzelle in md und lg) */}
                <Abschnitt
                    titelId="granit-sorten-heading"
                    leitachse
                    spaet
                    etikett="Gesteine"
                    titel={
                        <>
                            Die silikatischen Natursteine{' '}
                            <span>im Überblick</span>
                        </>
                    }
                >
                    <Feldraster spalten={3}>
                        {STONES.map((item, i) => (
                            <Feld key={item.title} spanne={i === STONES.length - 1 ? 2 : undefined}>
                                <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{item.desc}</p>
                            </Feld>
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 4. SCHIEFER UND OBERFLÄCHEN (ein Abschnitt wie im Bestand): links das Feld zu Schiefer (5 Spalten), rechts die
                    Oberflächen mit Etikett, Überschrift, Text und den fünf Bearbeitungen als Zeilen an der Fuge (7 Spalten) */}
                <Abschnitt flaeche="fliese" leitachse spaet>
                    <div className="grid gap-y-16 lg:grid-cols-12 lg:gap-x-12">
                        <article className="self-start border border-fuge bg-kalk p-6 lg:col-span-5 lg:p-8" aria-labelledby="granit-schiefer-heading">
                            <h2 id="granit-schiefer-heading" className={FELD_TITEL}>
                                Schiefer: spaltrau oder geschliffen, kalibriert oder unkalibriert
                            </h2>
                            <div className={clsx(FELD_TEXT, 'mt-6')}>
                                <p>
                                    <strong className="font-semibold text-tinte">Spaltrau</strong> zeigt die natürliche Schichtfläche mit lebendigem
                                    Relief. <strong className="font-semibold text-tinte">Geschliffen</strong> wirkt ruhiger und lässt sich leichter
                                    reinigen.
                                </p>
                                <p>
                                    <strong className="font-semibold text-tinte">Kalibrierte</strong> Platten sind auf eine einheitliche Stärke
                                    gebracht und lassen sich im Dünnbett verlegen. <strong className="font-semibold text-tinte">Unkalibrierte</strong>{' '}
                                    Platten schwanken in der Stärke; sie werden im Mittelbett verlegt, damit die Oberfläche trotzdem eben wird.
                                </p>
                                <p>
                                    Weil Schiefer weicher ist als Granit, zeigt er Kratzer durch Sand schneller. Eine Sauberlaufzone am
                                    Eingang schont den Belag.
                                </p>
                            </div>
                        </article>

                        <div className="lg:col-span-7">
                            <p className={clsx(etikettKlassen, 'mb-4')}>
                                <Fugenkreuz className="size-3 shrink-0 text-strich" />
                                Oberflächen
                            </p>
                            <h2 className="text-fs-6 text-tinte">
                                Oberflächen und Rutschhemmung
                            </h2>
                            <p className="mt-6 max-w-mass font-text text-fs-3 text-tinte-2">
                                Derselbe Stein kann je nach Bearbeitung spiegelglatt oder griffig sein. Die Rutschhemmung wird nach
                                DIN EN 16165 bestimmt (R9 bis R13 für das Begehen mit Schuhen, A bis C für Barfußbereiche). Welche Klasse
                                wo sinnvoll ist, erklärt unser Beitrag{' '}
                                <Link href="/blog/rutschfeste-fliesen-r-klassen" className={linkKlassen}>
                                    Rutschfeste Fliesen
                                </Link>
                                .
                            </p>
                            <ul className="mt-8 border-t border-tinte">
                                {SURFACES.map((surface) => (
                                    <li key={surface.name} className="grid gap-1 border-b border-fuge py-4 sm:grid-cols-3 sm:gap-6">
                                        <span className="block font-text text-fs-2 font-semibold text-tinte">{surface.name}</span>
                                        <span className="block font-text text-fs-2 text-tinte-2 sm:col-span-2">{surface.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Abschnitt>

                {/* 5. VERLEGUNG UND EINSATZ (ein Abschnitt wie im Bestand): zwei Felder mit je eigener Überschrift; darunter der
                    Hinweis zur Sortierung (im Bestand vor dem Abschluss, Lesefolge unverändert) */}
                <Abschnitt leitachse spaet>
                    <Feldraster spalten={2} als="div">
                        <article aria-labelledby="granit-verlegung-heading" className={FELD}>
                            <h2 id="granit-verlegung-heading" className={FELD_TITEL}>
                                Verlegung: Dünnbett oder Mittelbett, immer mit natursteingeeignetem Kleber
                            </h2>
                            <div className={clsx(FELD_TEXT, 'mt-6')}>
                                <p>
                                    Kalibrierte Platten verlegen wir im Dünnbett, unkalibrierte im Mittelbett. In beiden Fällen wird die Platte
                                    hohlraumarm eingebettet, damit sie unter Last nicht bricht.
                                </p>
                                <p>
                                    Auch silikatische Steine können sich verfärben: Helle Granite und Quarzite nehmen Feuchtigkeit aus dem
                                    Mörtelbett auf, was zu dunklen Flecken oder Rändern führen kann. Deshalb verwenden wir weiße, schnell
                                    abbindende Kleber, die für Naturstein geeignet sind.
                                </p>
                            </div>
                        </article>
                        <article aria-labelledby="granit-einsatz-heading" className={FELD}>
                            <h2 id="granit-einsatz-heading" className={FELD_TITEL}>
                                Einsatz innen und außen, Pflege und Imprägnierung
                            </h2>
                            <div className={clsx(FELD_TEXT, 'mt-6')}>
                                <p>
                                    Innen eignen sich silikatische Steine für Flur, Küche, Wohnbereich und Bad. Draußen entscheidet die
                                    Frostbeständigkeit der jeweiligen Sorte; eine griffige Oberfläche ist Pflicht. Passende Aufbauten zeigt
                                    unser Ratgeber{' '}
                                    <Link href="/balkon-terrasse/terrassenplatten" className={linkKlassen}>
                                        Terrassenplatten
                                    </Link>
                                    ; für Stufen aus Naturstein lohnt ein Blick in den{' '}
                                    <Link href="/treppen" className={linkKlassen}>
                                        Treppen-Ratgeber
                                    </Link>
                                    .
                                </p>
                                <p>
                                    Gepflegt wird mit Wasser und pH-neutralem Steinreiniger. Ob und wann eine Imprägnierung sinnvoll ist,
                                    erklärt der{' '}
                                    <Link href="/naturstein" className={linkKlassen}>
                                        Naturstein-Ratgeber
                                    </Link>
                                    .
                                </p>
                            </div>
                        </article>
                    </Feldraster>

                    <div className={clsx(HINWEIS, 'mt-8 border-strich')}>
                        <Icon name="info" groesse={5} className="mt-1 text-tinte" />
                        <p className="min-w-0">
                            Naturstein variiert von Platte zu Platte in Farbe und Zeichnung. Das ist Teil seines Charakters – wir sortieren
                            größere Flächen vor dem Verlegen, damit das Gesamtbild stimmig wirkt.
                        </p>
                    </div>
                </Abschnitt>

                {/* 6. BERATUNG UND AUFMASS: Einleitung und drei Wege als Knöpfe; darunter die weiterführenden Ratgeber (Navigation) */}
                <Abschnitt
                    titelId="granit-cta-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett={<>Beratung &amp; Aufmaß</>}
                    titel="Granit, Schiefer oder Quarzit für Ihr Projekt?"
                    einleitung={
                        <p>
                            Wir prüfen Untergrund und Einsatzbereich, besprechen Oberfläche und Plattenstärke und verlegen Ihren Stein mit
                            dem passenden Mörtelbett.
                        </p>
                    }
                >
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Knopf href="/kontakt" icon="pfeil-rechts">
                            Granitverlegung anfragen
                        </Knopf>
                        <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
                            <span className="font-mono font-normal">{COMPANY_DATA.contact.phone}</span>
                        </Knopf>
                        <Knopf href={COMPANY_DATA.contact.whatsappLink} extern variante="neben" vorne={<WhatsAppLogo className="size-5 shrink-0" />}>
                            WhatsApp
                        </Knopf>
                    </div>

                    <nav aria-labelledby="granit-ratgeber-heading" className="mt-16 border-t border-fuge pt-12">
                        <h2 id="granit-ratgeber-heading" className="font-anzeige text-fs-5 text-tinte">
                            Weiterführende Ratgeber zu Granit &amp; Natursteinbelägen
                        </h2>
                        <Merkliste
                            spalten={2}
                            className="mt-8"
                            eintraege={FURTHER_READING.map((link) => ({
                                titel: (
                                    <Link href={link.href} className={linkKlassen}>
                                        {link.label}
                                    </Link>
                                )
                            }))}
                        />
                    </nav>
                </Abschnitt>
            </Leitachse>

            {/* 7. ABSCHLUSS */}
            <QualityPromise />
        </>
    );
}
