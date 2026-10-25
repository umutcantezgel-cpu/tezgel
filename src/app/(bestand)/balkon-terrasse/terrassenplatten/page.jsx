// Terrassenplatten (E5-BAU-05 / S-14, KERN v2): Erzählansicht nach dem Muster der Familie Themen (/leistungen/[id],
// /fliesen, /untergrund-abdichtung/ausgleich-gefaelle). Einstieg mit Laserachse, H1 links, Vorspann und zwei Knöpfe; rechts
// das Planblatt mit dem Plan „aussen“ (interaktiv, ohne Achse). Danach die Leitachse über die Abschnitte, Flächen im Wechsel:
// 2. Materialien (Fliese): Feldraster, Felder Kalk, das fünfte Feld füllt die Zeile; darunter die Naturstein-Verweise ·
// 3. Kennwerte (Kalk): zwei Spalten an der Fuge (Frost, Rutschhemmung), darunter die Tabelle Feinsteinzeug/Naturstein ·
// 4. Erdreich und Fugen (Fliese): wie im Bestand zwei Teile mit eigener H2 in einem Abschnitt – als Zeilen an der Fuge,
// Überschrift links, Text rechts; die Fugenarten als Merkliste, der Hinweis zur gebundenen Verlegung als Merkhinweis ·
// 5. Beratung & Aufmaß (Kalk): Knöpfe mit Telefon und WhatsApp aus COMPANY_DATA · 6. Weiterführende Ratgeber (Fliese):
// Navigation als Register wie auf der Startseite. Abschluss: QualityPromise. Kein großer Moment, kein Auftritt, keine
// Icon-Kacheln (eine Icon-Familie). Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand; Metadaten unverändert.
import Link from 'next/link';
import clsx from 'clsx';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Icon from '@/components/icons/Icon';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import Leitachse, { ACHSE_LAGE } from '@/components/kern/Leitachse';
import Merkliste from '@/components/kern/Merkliste';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Tabelle from '@/components/kern/Tabelle';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { etikettKlassen, linkKlassen, seitenKlassen } from '@/components/kern/stile';
import SeitenDaten from '@/components/seo/SeitenDaten';

export const metadata = createMetadata({
    title: 'Terrassenplatten verlegen lassen | Fliesen Tezgel',
    description:
        'Terrassenplatten aus Keramik oder Naturstein fachgerecht verlegen lassen: frostsicher, rutschfest & langlebig. Fachbetrieb Tezgel – Jetzt Aufmaß anfragen!',
    path: '/balkon-terrasse/terrassenplatten'
});

const MATERIAL_ROWS = [
    {
        label: 'Wasseraufnahme',
        ceramic: 'Sehr gering (Feinsteinzeug: höchstens 0,5 %)',
        stone: 'Je nach Sorte sehr unterschiedlich'
    },
    {
        label: 'Frostbeständigkeit',
        ceramic: 'Geprüft nach DIN EN ISO 10545-12, bei Außenplatten Standard',
        stone: 'Sortenabhängig, geprüft nach DIN EN 12371 – Nachweis anfordern'
    },
    {
        label: 'Flecken',
        ceramic: 'Nimmt Öl, Rotwein und Grillfett kaum auf',
        stone: 'Offenporige Sorten brauchen eine Imprägnierung'
    },
    {
        label: 'Optik',
        ceramic: 'Gleichmäßig; Holz-, Beton- und Steinoptiken',
        stone: 'Jede Platte ein Unikat mit natürlichen Farbschwankungen'
    },
    {
        label: 'Pflege',
        ceramic: 'Wasser und milder Reiniger',
        stone: 'Steingerechte, meist pH-neutrale Pflege'
    }
];

const PROPERTIES = [
    {
        title: '2-cm-Feinsteinzeug',
        desc: 'Durchgesintert, dicht und in 2 cm Stärke tragfähig genug, um auf Stelzlagern oder im Splittbett frei zu spannen. Kratzfest, farbecht unter UV-Licht und unempfindlich gegen die meisten Haushaltsflecken.'
    },
    {
        title: 'Naturstein im Freien',
        desc: 'Granit, Quarzit oder Schiefer wirken im Außenbereich besonders natürlich. Ob eine Sorte frost- und tausalzbeständig ist, hängt vom Gestein ab – nicht vom Namen. Details auf unseren Natursteinseiten.'
    },
    {
        title: 'Holzoptik draußen',
        desc: 'Keramik in Holzoptik muss im Freien frostbeständig sein. Die 2-cm-Stärke ist nötig für Stelzlager oder Splittbett; bei gebundener Verlegung ist frostbeständiges Feinsteinzeug in üblicher Stärke möglich.'
    },
    {
        title: 'Formate & Gewicht',
        desc: 'Gängig sind quadratische und rechteckige Formate wie 60 × 60 oder 60 × 120 cm. 2-cm-Feinsteinzeug wiegt rund 45 bis 50 kg pro Quadratmeter – relevant für Balkonlasten, Transport und Verlegung.'
    },
    {
        title: 'Oberflächen & Optiken',
        desc: 'Strukturierte Oberflächen verbessern die Trittsicherheit bei Nässe. Beton-, Stein- und Holzoptiken lassen sich passend zum Innenbelag wählen, damit Wohnraum und Terrasse ineinander übergehen.'
    }
];

const JOINTS = [
    {
        title: 'Offene Fugen',
        text: 'Bei Stelzlagern bleiben die Fugen offen. Der Fugensteg der Lager hält den Abstand, Wasser läuft direkt ab.'
    },
    {
        title: 'Gebundene Fugen im Splittbett',
        text: 'Im Splittbett kommen wasserdurchlässige Fugenmörtel oder ungebundene Fugenfüllungen zum Einsatz. Dichte Zementfugen würden das Wasser auf der Bettung stauen.'
    },
    {
        title: 'Elastische Fugen und Bewegungsfugen',
        text: 'An Hauswand, Brüstung und Einbauteilen sowie zur Feldbegrenzung größerer, gebunden verlegter Flächen nehmen Bewegungsfugen die Temperaturbewegungen des Belags auf.'
    }
];

const FURTHER_READING = [
    { label: 'Aufbauten im Vergleich: Balkon & Terrasse', href: '/balkon-terrasse' },
    { label: 'Feinsteinzeug oder Naturstein? Der Vergleich', href: '/blog/feinsteinzeug-oder-naturstein-vergleich' },
    { label: 'Rutschfeste Fliesen: Welche R-Klasse wo?', href: '/blog/rutschfeste-fliesen-r-klassen' },
    { label: 'Leistung: Außenbereiche & Balkone', href: '/leistungen/aussen' }
];

// Zeile an der Fuge (Abschnitt 4): Überschrift links (5 Spalten ab lg), Text rechts in Lesebreite; die H2 bleibt H2
const ZEILE = 'grid grid-cols-4 gap-y-6 border-t border-fuge py-12 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-12';
const ZEILE_KOPF = 'col-span-4 md:col-span-8 lg:col-span-5';
const ZEILE_TEXT = 'col-span-4 max-w-mass md:col-span-8 lg:col-span-7';
const ZEILE_TITEL = 'font-anzeige text-fs-5 text-tinte';

// Unterstrich der Registerzeile erscheint beim Überfahren (wie „Fachthemen im Detail“ auf der Startseite)
const UNTERSTRICH = 'decoration-1 underline-offset-4 decoration-tinte pointer-fine:group-hover:underline group-active:underline';

export default function TerrassenplattenPage() {
    return (
        <>
            <SeitenDaten
                pfad="/balkon-terrasse/terrassenplatten"
                titel="Terrassenplatten verlegen lassen | Fliesen Tezgel"
                beschreibung="Terrassenplatten aus Keramik oder Naturstein fachgerecht verlegen lassen: frostsicher, rutschfest & langlebig. Fachbetrieb Tezgel – Jetzt Aufmaß anfragen!"
                brotkrumen={[{ name: 'Start', href: '/' }, { name: 'Balkon und Terrasse', href: '/balkon-terrasse' }, { name: 'Terrassenplatten richtig wählen: Material, Stärke und Oberfläche' }]}
            />
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts das Planblatt mit dem Plan „aussen“ */}
            <section aria-labelledby="terrassenplatten-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={<>Materialratgeber Außenbeläge</>}
                    titel={<span id="terrassenplatten-heading">Terrassenplatten richtig wählen: Material, Stärke und Oberfläche</span>}
                    vorspann={
                        <p>
                            Terrassenplatten richtig wählen: Material, Stärke und Oberfläche passend zu Untergrund und Witterung abstimmen. Ob 2-cm-Feinsteinzeug oder Naturstein, rutschfest strukturiert oder matt – wir beraten Sie zu Aufbau, Haltbarkeit und Pflegeaufwand für Terrasse und Balkon.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Beratung zu Terrassenplatten
                            </Knopf>
                            <Knopf href="/balkon-terrasse" variante="neben">
                                Aufbauten vergleichen
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Terrassenplatten verlegen lassen', 'aussen')}>
                            <Verlegeplan plan="aussen" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. MATERIALIEN: fünf Felder auf Kalk im Band auf Fliese, das letzte Feld füllt die Zeile (keine Restzelle);
                    darunter die Verweise auf die Natursteinseiten */}
                <Abschnitt
                    titelId="terrassenplatten-material-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Materialien"
                    titel="Was Terrassenplatten draußen leisten müssen"
                >
                    <ul className="grid grid-cols-1 gap-px border border-fuge bg-fuge md:grid-cols-2 lg:grid-cols-3">
                        {PROPERTIES.map((item, i) => (
                            <li
                                key={item.title}
                                className={clsx('flex flex-col bg-kalk p-6 lg:p-8', i === PROPERTIES.length - 1 && 'md:col-span-2')}
                            >
                                <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{item.desc}</p>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-8 max-w-mass font-text text-fs-3 text-tinte-2">
                        Mehr zu frostbeständigen Natursteinen:{' '}
                        <Link href="/naturstein/granit" className={linkKlassen}>
                            Granit, Schiefer &amp; Quarzit
                        </Link>{' '}
                        und{' '}
                        <Link href="/naturstein" className={linkKlassen}>
                            Naturstein-Ratgeber mit Imprägnierung
                        </Link>
                        .
                    </p>
                </Abschnitt>

                {/* 3. KENNWERTE: zwei Spalten an der Fuge, darunter die Tabelle (Name = bisherige Tabellenbeschriftung) und der
                    Verweis auf den ausführlichen Vergleich */}
                <Abschnitt
                    titelId="terrassenplatten-kennwerte-heading"
                    leitachse
                    spaet
                    etikett="Kennwerte"
                    titel="Frostbeständigkeit und Rutschhemmung: worauf es ankommt"
                >
                    <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-12">
                        <article className="border-t border-tinte pt-6">
                            <h3 className="font-anzeige text-fs-5 text-tinte">Frostbeständigkeit</h3>
                            <p className="mt-4 max-w-mass font-text text-fs-3 text-tinte-2">
                                Keramische Fliesen werden nach DIN EN ISO 10545-12 auf Frostbeständigkeit geprüft; Feinsteinzeug mit
                                seiner sehr geringen Wasseraufnahme besteht diese Prüfung in der Regel. Bei Naturstein entscheidet die
                                Sorte – maßgeblich ist die Frostwiderstandsprüfung nach DIN EN 12371. Lassen Sie sich den Nachweis
                                für die konkrete Platte zeigen.
                            </p>
                        </article>
                        <article className="border-t border-tinte pt-6">
                            <h3 className="font-anzeige text-fs-5 text-tinte">Rutschhemmung</h3>
                            <p className="mt-4 max-w-mass font-text text-fs-3 text-tinte-2">
                                Die Rutschhemmung wird nach DIN EN 16165 ermittelt: R9 bis R13 für das Begehen mit Schuhen, A, B und C
                                für barfuß begangene Nassbereiche. Für private Terrassen und Balkone gibt es keine feste Vorgabe; wir
                                empfehlen strukturierte Oberflächen ab R11, an Pool-Rändern zusätzlich eine Barfuß-Klasse. Mehr im
                                Beitrag{' '}
                                <Link href="/blog/rutschfeste-fliesen-r-klassen" className={linkKlassen}>
                                    Rutschfeste Fliesen
                                </Link>
                                .
                            </p>
                        </article>
                    </div>

                    <Tabelle
                        className="mt-12"
                        name="Feinsteinzeug und Naturstein im Außenbereich"
                        kopf={['Eigenschaft', '2-cm-Feinsteinzeug', 'Naturstein']}
                        zeilen={MATERIAL_ROWS.map((row) => [row.label, row.ceramic, row.stone])}
                    />
                    <p className="mt-6 max-w-mass font-text text-fs-3 text-tinte-2">
                        Den ausführlichen Vergleich beider Materialien – auch für Innenräume – lesen Sie in{' '}
                        <Link href="/blog/feinsteinzeug-oder-naturstein-vergleich" className={linkKlassen}>
                            Feinsteinzeug oder Naturstein? Der ehrliche Vergleich
                        </Link>
                        .
                    </p>
                </Abschnitt>

                {/* 4. ERDREICH UND FUGEN: zwei Zeilen an der Fuge in einem Abschnitt ohne eigenen Kopf (wie im Bestand) */}
                <Abschnitt flaeche="fliese" leitachse spaet>
                    <article aria-labelledby="terrassenplatten-erdreich-heading" className={ZEILE}>
                        <div className={ZEILE_KOPF}>
                            <h2 id="terrassenplatten-erdreich-heading" className={ZEILE_TITEL}>
                                Terrasse auf Erdreich: der Unterbau als Voraussetzung
                            </h2>
                        </div>
                        <div className={clsx(ZEILE_TEXT, 'flex flex-col gap-4 font-text text-fs-3 text-tinte-2')}>
                            <p>
                                Die beste Platte sackt ab oder kippelt, wenn der Unterbau nachgibt. Eine Terrasse auf Erdreich braucht
                                deshalb eine tragfähige, frostsichere und verdichtete Tragschicht, die Wasser versickern lässt, und ein
                                Gefälle vom Haus weg.
                            </p>
                            <p>
                                Wie dieser Unterbau vorhanden ist oder hergestellt werden muss, klären wir beim Aufmaß. Erdarbeiten und
                                Tragschicht sind die Voraussetzung für unseren Belag – den Belag selbst verlegen wir im Splittbett oder
                                auf Stelzlagern.
                            </p>
                        </div>
                    </article>

                    <div className={ZEILE}>
                        <div className={ZEILE_KOPF}>
                            <p className={clsx(etikettKlassen, 'mb-4')}>
                                <Fugenkreuz className="size-3 shrink-0 text-strich" />
                                Fugen
                            </p>
                            <h2 id="terrassenplatten-fugen-heading" className={ZEILE_TITEL}>
                                Fugen außen: offen, gebunden oder elastisch
                            </h2>
                        </div>
                        <div className={ZEILE_TEXT}>
                            <Merkliste titelAls="h3" eintraege={JOINTS.map((joint) => ({ titel: joint.title, text: joint.text }))} />
                            {/* Merkhinweis wie `Hinweis` (Rahmen, Kante links, Info-Zeichen), ohne zusätzliches Vorwort: Wortlaut wie im Bestand */}
                            <div className="mt-8 flex items-start gap-4 border border-l-2 border-strich bg-kalk p-6 font-text text-fs-2 text-tinte">
                                <Icon name="info" groesse={5} className="mt-1 text-tinte" />
                                <p className="min-w-0">
                                    Bei gebundener Verlegung auf einer Verbundabdichtung werden die Fugen geschlossen und mit frostbeständigem
                                    Fugenmörtel verfüllt; das Wasser läuft dann über die Belagsoberfläche im Gefälle ab.
                                </p>
                            </div>
                        </div>
                    </div>
                </Abschnitt>

                {/* 5. BERATUNG & AUFMASS: Hauptknopf, Telefon in Mono und WhatsApp aus COMPANY_DATA */}
                <Abschnitt
                    titelId="terrassenplatten-cta-heading"
                    leitachse
                    spaet
                    etikett="Beratung & Aufmaß"
                    titel="Die passende Platte für Ihren Aufbau"
                    einleitung={
                        <p>
                            Wir stimmen Material, Stärke, Format und Oberfläche auf Ihre Fläche ab und sagen Ihnen, welche Platte zum
                            gewählten Aufbau passt.
                        </p>
                    }
                >
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Knopf href="/kontakt" icon="pfeil-rechts">
                            Terrassenplatten anfragen
                        </Knopf>
                        <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
                            <span className="font-mono font-normal">{COMPANY_DATA.contact.phone}</span>
                        </Knopf>
                        <Knopf
                            href={COMPANY_DATA.contact.whatsappLink}
                            extern
                            variante="neben"
                            vorne={<WhatsAppLogo className="size-5 shrink-0" />}
                        >
                            WhatsApp
                        </Knopf>
                    </div>
                </Abschnitt>

                {/* 6. WEITERFÜHRENDE RATGEBER: Navigation wie im Bestand (eigener Landmark), Kopf und Fläche wie ein Abschnitt
                    auf Fliese, die Verweise als Register mit Pfeil (Muster „Fachthemen im Detail“ der Startseite) */}
                <nav aria-labelledby="terrassenplatten-ratgeber-heading" className="relative border-y border-fuge bg-fliese py-16 lg:py-24">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10">
                        <div className={clsx(seitenKlassen, 'relative')}>
                            <Fugenkreuz className={clsx('absolute top-0 size-3 -translate-x-1/2 -translate-y-1/2 text-tinte', ACHSE_LAGE)} />
                        </div>
                    </div>
                    <div className={clsx(seitenKlassen, 'spaet-zeichnen')}>
                        <h2 id="terrassenplatten-ratgeber-heading" className="max-w-mass text-fs-6 text-tinte">
                            Weiterführende Ratgeber zu Terrassenplatten &amp; Außenbelägen
                        </h2>
                        <ul className="mt-12 border-t border-tinte">
                            {FURTHER_READING.map((link) => (
                                <li key={link.href} className="border-b border-fuge">
                                    <Link
                                        href={link.href}
                                        data-motion="zustand"
                                        className="group flex min-h-12 items-center gap-4 px-3 py-3 pointer-fine:hover:bg-kalk active:bg-kalk"
                                    >
                                        <span className={clsx('min-w-0 flex-1 font-text text-fs-3 font-semibold text-tinte', UNTERSTRICH)}>
                                            {link.label}
                                        </span>
                                        <span aria-hidden="true" className="flex shrink-0 text-strich">
                                            <Icon name="pfeil-rechts" groesse={5} />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </Leitachse>

            <QualityPromise />
        </>
    );
}
