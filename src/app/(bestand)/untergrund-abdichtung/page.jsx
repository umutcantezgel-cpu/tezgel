// Untergrund & Abdichtung (E5-BAU-01, KERN v2): Seitenkörper der Themenseite als Erzählansicht nach dem Muster der
// Referenz (leistungen/[id], fliesen). Einstieg mit Laserachse, H1 links, Vorspann und zwei Knöpfe; rechts das Planblatt
// „untergrund“ ohne Achse, interaktiv. Danach die Leitachse über die Abschnitte: Themen als Register, Ursachen als
// Feldraster, Prüfkriterien als Schrittfolge, Überblick mit Ankern, Untergründe als Halbverband, Vor-Ort-Aufmaß mit
// Knöpfen, Ratgeber als Merkliste. Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand. Kein Auftritt und
// kein großer Moment (setzt der Orchestrator). Metadaten und Daten unverändert.
import Link from 'next/link';
import { COMPANY_DATA } from '@/config/company';
import { TOPIC_HUBS } from '@/config/topics';
import { createMetadata } from '@/lib/metadata';
import Icon from '@/components/icons/Icon';
import QualityPromise from '@/components/sections/QualityPromise';
import { FinalCTA } from '@/components/ui/FinalCTA';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Knopf from '@/components/kern/Knopf';
import Leitachse from '@/components/kern/Leitachse';
import Merkliste from '@/components/kern/Merkliste';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Schrittfolge from '@/components/kern/Schrittfolge';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { linkKlassen, seitenKlassen } from '@/components/kern/stile';

export const metadata = createMetadata({
    title: 'Untergrund & Abdichtung für Fliesen | Fachbetrieb Tezgel',
    description:
        'Untergrundvorbereitung & DIN 18534 Verbundabdichtung für Fliesen in Wetzlar & Aßlar: Estrichprüfung, Entkopplung & Gefälleausgleich. Jetzt beraten lassen!',
    path: '/untergrund-abdichtung'
});

const HUB = TOPIC_HUBS.find((hub) => hub.id === 'untergrund-abdichtung');
const SUBPAGES = HUB ? HUB.pages.filter((page) => page.path !== HUB.path) : [];

const DAMAGE_PATTERNS = [
    {
        title: 'Risse im Fliesenbelag',
        desc: 'Bewegt sich der Untergrund – weil der Estrich noch schwindet, Holzdielen federn oder Bewegungsfugen überfliest wurden –, überträgt sich die Spannung auf die starre Keramik. Die Folge sind Risse quer durch Fliesen und Fugen.'
    },
    {
        title: 'Hohlstellen und lose Fliesen',
        desc: 'Staub, Sinterschichten, Trennmittel oder ein zu saugfähiger Untergrund ohne Grundierung verhindern die Haftung des Klebers. Die Fliese klingt beim Abklopfen hohl und kann sich später lösen oder unter Last brechen.'
    },
    {
        title: 'Feuchte hinter der Fliese',
        desc: 'Fliesen und Fugen sind nicht wasserdicht. Fehlt im Nassbereich die Abdichtung oder ist sie an Ecken und Durchdringungen unterbrochen, zieht Wasser in Estrich und Mauerwerk – oft lange unbemerkt.'
    }
];

const CRITERIA = [
    {
        title: 'Tragfähig',
        desc: 'Der Untergrund muss die Lasten aufnehmen, ohne sich spürbar zu verformen. Wir prüfen Oberflächenfestigkeit (z. B. per Gitterritzprüfung), Haftung von Altbelägen und das Verhalten von Holzkonstruktionen.'
    },
    {
        title: 'Eben',
        desc: 'Maßgeblich sind die Ebenheitstoleranzen nach DIN 18202. Für das Dünnbettverfahren und für Großformate braucht es eine entsprechend ebene Fläche – sonst wird vorher gespachtelt oder nivelliert.'
    },
    {
        title: 'Trocken',
        desc: 'Estriche müssen belegreif sein. Die Restfeuchte wird vor Beginn der Verlegung gemessen, bei Estrichen mit der CM-Methode.'
    },
    {
        title: 'Sauber',
        desc: 'Frei von Staub, Öl, Wachs, Farb- und Kleberresten, Trennmitteln und losen Teilen. Sinterschichten auf Calciumsulfatestrich werden abgeschliffen und abgesaugt.'
    },
    {
        title: 'Dicht',
        desc: 'In Duschen, an Badewannen und auf Böden mit Ablauf gehört unter die Fliese eine Verbundabdichtung nach DIN 18534 – einschließlich Dichtbändern und Manschetten an allen Anschlüssen.'
    }
];

const OVERVIEWS = [
    {
        id: 'din18534',
        titel: 'Abdichtung im Verbund nach DIN 18534 im Überblick',
        text: 'Im Bad liegt die Abdichtung direkt unter Fliese und Kleber – als flüssig aufgetragene Schicht, Bahn oder Platte. Welcher Aufwand nötig ist, richtet sich nach der Wassereinwirkungsklasse der jeweiligen Fläche.',
        link: 'DIN 18534 im Detail',
        href: '/untergrund-abdichtung/din-18534'
    },
    {
        id: 'abbruch',
        titel: 'Rückbau oder Überfliesen im Überblick',
        text: 'Überfliesen spart Rückbau, setzt aber einen fest haftenden, ebenen Altbelag und genügend Aufbauhöhe voraus. Ob das zutrifft, entscheidet erst die Prüfung vor Ort.',
        link: 'Fliesen auf Fliesen oder Rückbau?',
        href: '/untergrund-abdichtung/fliesen-auf-fliesen'
    },
    {
        id: 'ausgleich',
        titel: 'Ausgleich und Gefälle im Überblick',
        text: 'Unebenheiten werden gemessen und mit Spachtel- oder Nivelliermassen ausgeglichen. Vor Bodenabläufen und Duschrinnen sorgt ein sauber ausgebildetes Gefälle dafür, dass Wasser gezielt abläuft.',
        link: 'Ausgleich & Gefälle im Detail',
        href: '/untergrund-abdichtung/ausgleich-gefaelle'
    },
    {
        id: 'rissverharzung',
        titel: 'Risse und Entkopplung im Überblick',
        text: 'Ruhende Risse im Estrich lassen sich kraftschlüssig verharzen. Entkopplungsmatten bauen Spannungen zwischen Untergrund und Belag ab – ersetzen aber keine fehlende Tragfähigkeit.',
        link: 'Entkopplung & Holzuntergründe',
        href: '/untergrund-abdichtung/entkopplung'
    }
];

const SUBSTRATES = [
    {
        title: 'Zement- und Calciumsulfatestrich',
        desc: 'Der häufigste Untergrund im Neubau. Entscheidend sind Belegreife, Oberflächenfestigkeit und der Umgang mit Rand-, Schein- und Bewegungsfugen.',
        href: '/untergrund-abdichtung/estrich-belegreife'
    },
    {
        title: 'Alte Fliesen und Altbeläge',
        desc: 'Fest haftende Altfliesen können unter Umständen überfliest werden. Lose Bereiche, Hohlstellen oder zu geringe Raumhöhen sprechen für den Rückbau.',
        href: '/untergrund-abdichtung/fliesen-auf-fliesen'
    },
    {
        title: 'Holzdielen und Holzwerkstoffplatten',
        desc: 'Holz arbeitet und kann federn. Fliesen sind hier nur auf einer ausreichend steifen Konstruktion und mit geeigneter Zwischenschicht sinnvoll.',
        href: '/untergrund-abdichtung/entkopplung'
    },
    {
        title: 'Putz, Mauerwerk und Bauplatten',
        desc: 'Wände werden auf Ebenheit, Festigkeit und Saugverhalten geprüft, bei Bedarf begradigt und grundiert. Feuchteempfindliche Untergründe brauchen im Spritzwasserbereich besonderen Schutz.',
        href: '/untergrund-abdichtung/ausgleich-gefaelle'
    }
];

const READ_MORE = [
    { label: 'Leistung: Untergrund & DIN 18534 Abdichtung', href: '/leistungen/untergrund' },
    { label: 'Badsanierung vom Fachbetrieb', href: '/bad/badsanierung' },
    { label: 'Barrierefreies Bad mit bodengleicher Dusche', href: '/bad/barrierefreies-bad' },
    { label: 'Balkon, Terrasse und Außenbeläge', href: '/leistungen/aussen' }
];

// Zeile des Registers (Themen): die ganze Zeile ist der Link; Hover färbt die Fläche auf Fliese
const ZEILE = 'group flex min-h-12 items-center gap-4 px-3 py-4 hover:bg-fliese active:bg-fliese';
// Name in der Zeile: Unterstrich beim Überfahren
const NAME =
    'font-text text-fs-3 font-semibold text-tinte md:w-1/3 md:shrink-0 decoration-1 underline-offset-4 decoration-tinte group-hover:underline group-active:underline';

export default function UntergrundAbdichtungPage() {
    return (
        <>
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts das Planblatt „untergrund“ ohne Achse */}
            <section aria-labelledby="untergrund-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={<>Fachwissen &middot; Untergrund &amp; Abdichtung</>}
                    titel={
                        <span id="untergrund-heading">
                            Untergrund und Abdichtung:{' '}
                            <span>das Fundament jedes Fliesenbelags</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Untergrund und Abdichtung für Fliesen: Fundiertes Fachwissen und das Fundament jedes Fliesenbelags vom Fachbetrieb Tezgel.
                            Eine Fliese ist nur so gut wie das, worauf sie liegt: Bevor wir verlegen, prüfen wir den Untergrund auf Tragfähigkeit,
                            Ebenheit, Restfeuchte und Sauberkeit und führen im Nassbereich die normgerechte Verbundabdichtung nach DIN 18534 aus.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Untergrund prüfen lassen
                            </Knopf>
                            <Knopf href="/leistungen/untergrund" variante="neben">
                                Zur Leistungsseite
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Untergrund & Abdichtung für Fliesen', 'untergrund')}>
                            <Verlegeplan plan="untergrund" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. THEMEN: Register der Unterseiten, je Zeile Name, Beschreibung und „Mehr zu …“; die Überschrift ist nur für Screenreader.
                    Die Beschreibung ist ab md mindestens so breit wie ihr längstes Wort (ohne min-w-0): bei 768 px lief
                    „Verbundabdichtung“ sonst in „Mehr zu … erfahren“ hinein (einzelbild textkreuzung, R-02b); „Mehr zu …“ bricht
                    dann selbst um. Ab lg ist genug Platz, dort ändert sich nichts */}
                <section aria-labelledby="themen-heading" className="relative py-16 lg:py-24">
                    <div className={`${seitenKlassen} spaet-zeichnen`}>
                        <h2 id="themen-heading" className="sr-only">
                            Themen rund um Untergrund und Abdichtung
                        </h2>
                        <ul className="border-t border-tinte">
                            {SUBPAGES.map((page) => (
                                <li key={page.path} className="border-b border-fuge">
                                    <Link href={page.path} className={ZEILE}>
                                        <span className="flex min-w-0 flex-1 flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
                                            <span className={NAME}>{page.name}</span>
                                            <span className="font-text text-fs-2 text-tinte-2 md:flex-1">{page.desc}</span>
                                            <span className="font-text text-fs-2 text-tinte">Mehr zu {page.name} erfahren</span>
                                        </span>
                                        <span aria-hidden="true" className="flex shrink-0 text-strich">
                                            <Icon name="pfeil-rechts" groesse={5} />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* 3. URSACHEN: Feldraster mit drei Schadensbildern; das dritte Feld überspannt in Md die freie Breite */}
                <Abschnitt titelId="schaeden-heading" leitachse spaet etikett="Ursachen" titel="Warum viele Fliesenschäden im Untergrund beginnen" einleitung={<p>Die sichtbare Oberfläche verzeiht wenig. Was darunter nicht stimmt, zeigt sich oft erst Monate nach der Verlegung – typischerweise in einem dieser drei Schadensbilder.</p>}>
                    <Feldraster spalten={3}>
                        {DAMAGE_PATTERNS.map((item, i) => {
                            const letzter = i === DAMAGE_PATTERNS.length - 1;
                            return (
                                <Feld key={item.title} spanne={letzter ? 2 : undefined} className={letzter ? 'lg:col-span-1' : undefined}>
                                    <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                    <p className="mt-3 font-text text-fs-2 text-tinte-2">{item.desc}</p>
                                </Feld>
                            );
                        })}
                    </Feldraster>
                    <p className="mt-8 font-text text-fs-2 text-tinte-2">
                        Sie haben bereits einen Schaden?{' '}
                        <Link href="/schadensanalyse" className={linkKlassen}>
                            So klären wir die Ursache vor Ort
                        </Link>
                        .
                    </p>
                </Abschnitt>

                {/* 4. PRÜFKRITERIEN: fünf Schritte als Schrittfolge; die Nummern sind für Screenreader ausgeblendet */}
                <Abschnitt titelId="kriterien-heading" leitachse spaet flaeche="fliese" etikett="Untergrundprüfung" titel="Die Prüfkriterien: tragfähig, eben, trocken, sauber, dicht" einleitung={<p>Diese fünf Punkte klären wir, bevor der erste Kleber aufgezogen wird. Erfüllt der Untergrund sie nicht, wird er zuerst vorbereitet – oder wir sprechen offen an, warum eine Verlegung so nicht sinnvoll ist.</p>}>
                    <Schrittfolge nummerStumm schritte={CRITERIA.map((item) => ({ titel: item.title, text: item.desc }))} />
                </Abschnitt>

                {/* 5. ÜBERBLICK: vier Felder mit Anker je Thema, zwei Spalten ohne Rest. Die Artikel sind Sprungziele
                    (#din18534, #abbruch, #ausgleich, #rissverharzung): darum ohne `spaet` und ohne eigenes scroll-margin –
                    sie landen allein über scroll-padding-top bei 96 px (R-02b) */}
                <Abschnitt aria-label="Themen im Überblick" leitachse>
                    <Feldraster spalten={2}>
                        {OVERVIEWS.map((item) => (
                            <Feld key={item.id}>
                                <article id={item.id} className="flex flex-1 flex-col">
                                    <h2 className="font-anzeige text-fs-5 text-tinte">{item.titel}</h2>
                                    <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{item.text}</p>
                                    <div className="mt-auto pt-6">
                                        <Knopf href={item.href} variante="text" icon="pfeil-rechts">
                                            {item.link}
                                        </Knopf>
                                    </div>
                                </article>
                            </Feld>
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 6. UNTERGRÜNDE: Halbverband an der Fuge, je Eintrag der Name als Link und die Beschreibung */}
                <Abschnitt titelId="untergruende-heading" leitachse spaet etikett="Typische Untergründe" titel="Estrich, Altbelag, Holz: was jeder Untergrund braucht">
                    <Merkliste
                        spalten={2}
                        verband
                        eintraege={SUBSTRATES.map((item) => ({
                            titel: (
                                <Link href={item.href} className={linkKlassen}>
                                    {item.title}
                                </Link>
                            ),
                            text: item.desc
                        }))}
                    />
                </Abschnitt>

                {/* 7. VOR-ORT-AUFMASS: Überschrift, Einleitung und drei Wege als Knöpfe; Telefon und WhatsApp aus COMPANY_DATA */}
                <Abschnitt
                    titelId="aufmass-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Vor-Ort-Termin"
                    titel="Untergrundprüfung beim kostenfreien Vor-Ort-Aufmaß"
                    einleitung={
                        <p>
                            {COMPANY_DATA.owner.fullName} sieht sich Ihren Untergrund persönlich an: Ebenheit, Haftung des Altbelags,
                            Restfeuchte und die Situation an Abläufen und Anschlüssen. Danach wissen Sie, welche Vorarbeiten nötig sind –
                            bevor sie im Angebot auftauchen.
                        </p>
                    }
                >
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Knopf href="/kontakt" icon="pfeil-rechts">
                            Aufmaß anfragen
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
                            Fotos per WhatsApp senden
                        </Knopf>
                    </div>
                </Abschnitt>

                {/* 8. RATGEBER: vier Verweise als Merkliste mit zwei Spalten */}
                <Abschnitt titelId="ratgeber-heading" leitachse spaet titel="Weiterführende Ratgeber zu Untergrund & Abdichtung">
                    <Merkliste
                        spalten={2}
                        eintraege={READ_MORE.map((link) => ({
                            titel: (
                                <Link href={link.href} className={linkKlassen}>
                                    {link.label}
                                </Link>
                            )
                        }))}
                    />
                </Abschnitt>
            </Leitachse>

            <QualityPromise />
            <FinalCTA />
        </>
    );
}
