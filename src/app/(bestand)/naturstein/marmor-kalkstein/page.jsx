// Marmor, Travertin & Kalkstein (E5-BAU-07 · S-16, KERN v2): Seitenkörper der Unterseite als Erzählansicht nach dem Muster
// der Familienreferenz (leistungen/[id], fliesen) und der Schwesterseiten /naturstein und /naturstein/granit. Einstieg mit
// Laserachse, H1 links, Vorspann und zwei Knöpfe; rechts das Planblatt „naturstein“ (Drittelverband, interaktiv; das Blatt
// trägt die rote Achse des Plans). Danach die Leitachse über die Abschnitte, Flächen Kalk und Fliese im Wechsel:
// 2. Grundlagen (Kalk): Text an der Fuge, daneben der Warnkasten „Säure ist tabu“ · 3. Verlegung (Fliese): drei Felder im
// Raster, darunter der Verweis auf die Abdichtung · 4. Einsatzbereiche (Kalk), Kopf seitlich: fünf Zeilen an der Fuge mit
// Einschätzung als Mono-Etikett · 5. Travertin und Pflege (Fliese): Text mit Merkliste, daneben das Pflegefeld ·
// 6. Alternative (Kalk), Kopf seitlich: Text und zwei Nebenknöpfe · 7. Beratung und Aufmaß (Fliese): drei Wege, darunter die
// weiterführenden Ratgeber als Navigation. Danach das Qualitätsversprechen (geteilter Baustein).
// Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand. Kein Auftritt und kein großer Moment. `spaet` auf allen
// Abschnitten unter dem ersten Bildschirm (keine Sprungziele, keine Formulare). Metadaten unverändert. Serverkomponente.
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
import Knopf from '@/components/kern/Knopf';
import Leitachse from '@/components/kern/Leitachse';
import Merkliste from '@/components/kern/Merkliste';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { etikettKlassen, linkKlassen } from '@/components/kern/stile';

export const metadata = createMetadata({
    title: 'Marmor & Travertin verlegen lassen | Fliesen Tezgel',
    description:
        'Marmor, Travertin & Kalkstein fachgerecht verlegen lassen: verfärbungsfreie Kleber, Imprägnierung & Schutz. Fachbetrieb Tezgel in Aßlar & Wetzlar.',
    path: '/naturstein/marmor-kalkstein'
});

// Einsatzbereiche; `good` wählt das Zeichen vor der Einschätzung (Haken bzw. Hinweis – die Einschätzung steht immer im Text)
const PLACES = [
    {
        title: 'Wohnbereich & Flur',
        verdict: 'Sehr gut geeignet',
        text: 'Im trockenen Wohnbereich entfaltet Marmor seine Wirkung am besten. Eine Sauberlaufzone am Eingang hält Sand fern, der die vergleichsweise weiche Oberfläche zerkratzen würde.',
        good: true
    },
    {
        title: 'Badwände',
        verdict: 'Gut geeignet',
        text: 'An Wänden ist Marmor wenig beansprucht. In der Dusche nur mit konsequent säurefreier Reinigung – übliche Kalkreiniger sind tabu.',
        good: true
    },
    {
        title: 'Küchenboden & Arbeitsbereiche',
        verdict: 'Nur mit Einschränkungen',
        text: 'Essig, Zitrusfrüchte, Wein und Obstsäfte hinterlassen matte Stellen. Wer das nicht als Patina akzeptiert, wählt hier besser einen silikatischen Stein oder Feinsteinzeug.',
        good: false
    },
    {
        title: 'Duschboden',
        verdict: 'Sorgfältig abwägen',
        text: 'Polierter Marmor ist nass rutschig; geeignet sind nur rutschhemmende Oberflächen. Seifen- und Kalkreste lassen sich ohne säurehaltige Reiniger schwerer entfernen.',
        good: false
    },
    {
        title: 'Außenbereich',
        verdict: 'Meist ungeeignet',
        text: 'Viele Marmor- und Kalksteinsorten sind nicht ausreichend frost- und witterungsbeständig; Regen macht polierte Flächen stumpf. Draußen sind silikatische Steine oder Keramik die sicherere Wahl.',
        good: false
    }
];

const TRAVERTINE = [
    {
        name: 'Offenporig (ungespachtelt)',
        text: 'Die natürlichen Poren und Löcher bleiben sichtbar. Sehr rustikal, aber schmutzfangend – eher für Wände als für Böden.'
    },
    {
        name: 'Gespachtelt oder gefüllt',
        text: 'Die Poren sind werkseitig mit einer Spachtelmasse geschlossen. Die Oberfläche ist glatter und leichter zu reinigen; einzelne Füllungen können sich mit der Zeit lösen und werden dann ausgebessert.'
    },
    {
        name: 'Getrommelt / antik',
        text: 'Gerundete Kanten und eine weich gealterte Oberfläche. Kleine Unregelmäßigkeiten gehören zum Stil.'
    }
];

const ACID_TABOO = [
    'Essig- und Zitronenreiniger, Kalk- und Badreiniger',
    'WC-Reiniger, die auf den Boden tropfen',
    'Zitrusfrüchte, Wein, Obstsaft, Cola, Tomatensoße',
    'Scheuermittel, Scheuerschwämme und Schleifpads'
];

const DISCOLOURATION = [
    {
        title: 'Durchscheinender Stein',
        text: 'Heller Marmor ist leicht durchscheinend. Ein grauer Kleber oder feuchte Stellen im Mörtelbett können sich dauerhaft auf der Oberfläche abzeichnen.'
    },
    {
        title: 'Wasser schnell binden',
        text: 'Weiße Natursteinkleber, die das Anmachwasser schnell kristallin binden, lassen dem Stein keine Zeit, Feuchtigkeit aufzunehmen – so bleiben Farbe und Zeichnung unverändert.'
    },
    {
        title: 'Sonderfälle erkennen',
        text: 'Manche grünen, als „Marmor“ gehandelten Steine reagieren auf wasserhaltige Kleber mit Verformung. Für sie kommen Reaktionsharzkleber infrage. Das klären wir vor der Verlegung am Material.'
    }
];

const FURTHER_READING = [
    { label: 'Naturstein-Ratgeber: Imprägnierung & Pflege', href: '/naturstein' },
    { label: 'Feinsteinzeug oder Naturstein? Der Vergleich', href: '/blog/feinsteinzeug-oder-naturstein-vergleich' },
    { label: 'Musterbäder ansehen', href: '/bad/musterbaeder' },
    { label: 'Leistung: Wohnbereiche & Böden', href: '/leistungen/wohnen' }
];

// Fließtext an der Fuge (Abschnittstext in Lesebreite)
const TEXT = 'max-w-mass space-y-4 font-text text-fs-3 text-tinte-2';

export default function MarmorKalksteinPage() {
    return (
        <>
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts das Planblatt „naturstein“ */}
            <section aria-labelledby="marmor-heading">
                <Einstieg
                    art="erzaehl"
                    etikett="Kalkhaltige Natursteine"
                    titel={
                        <span id="marmor-heading">
                            Marmor, Travertin und Kalkstein:{' '}
                            <span>edle Natursteine richtig verlegen</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Marmor, Travertin und Kalkstein: edle Natursteine richtig verlegen mit verfärbungsfreiem Trasszement-Natursteinkleber und feuchtigkeitsregulierender Fuge. Kaum ein Belag wirkt so repräsentativ und elegant – erfordert jedoch fachgerechten Schutz und säurefreie Pflege.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Marmorverlegung anfragen
                            </Knopf>
                            <Knopf href="/naturstein" variante="neben">
                                Naturstein-Ratgeber
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Marmor & Travertin verlegen lassen', 'naturstein')}>
                            <Verlegeplan plan="naturstein" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. GRUNDLAGEN: Text an der Fuge (7 Spalten), daneben der Warnkasten als Randnotiz (5 Spalten, Gestalt wie
                    kern/Hinweis „warn“: Rahmen, Kante links in Tinte, Hinweiszeichen); je Eintrag ein Kreuz als Marke */}
                <Abschnitt
                    titelId="marmor-saeure-heading"
                    leitachse
                    spaet
                    etikett="Grundlagen"
                    titel="Kalkhaltig: warum Säure die Oberfläche angreift"
                >
                    <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                        <div className={clsx(TEXT, 'border-t border-tinte pt-6 lg:col-span-7')}>
                            <p>
                                Marmor, Travertin und Kalkstein bestehen überwiegend aus Calciumcarbonat (Kalk). Säure löst dieses
                                Mineral an: Schon ein Spritzer Zitronensaft oder Essig hinterlässt eine matte, raue Stelle – eine
                                sogenannte Verätzung. Sie ist kein Fleck, der sich wegwischen lässt, sondern eine Veränderung der
                                Oberfläche selbst.
                            </p>
                            <p>
                                Das hat nichts mit der Härte zu tun. Marmor ist zwar weicher als Granit und deshalb kratzempfindlicher –
                                seine Säureempfindlichkeit kommt aber allein vom Kalkgehalt. Eine Imprägnierung verzögert das Eindringen
                                von Flüssigkeiten, macht den Stein aber nicht säurefest.
                            </p>
                        </div>

                        <aside
                            className="self-start border border-l-2 border-tinte bg-fliese p-6 lg:col-span-5 lg:p-8"
                            aria-labelledby="marmor-tabu-heading"
                        >
                            <h3 id="marmor-tabu-heading" className="flex items-center gap-3 font-anzeige text-fs-4 text-tinte">
                                <Icon name="hinweis" groesse={5} />
                                Säure ist tabu
                            </h3>
                            <ul className="mt-6 border-t border-fuge">
                                {ACID_TABOO.map((item) => (
                                    <li key={item} className="flex gap-3 border-b border-fuge py-3 font-text text-fs-2 text-tinte">
                                        <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-tinte-2">
                                            <Icon name="schliessen" groesse={4} />
                                        </span>
                                        <span className="min-w-0">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-6 font-text text-fs-2 text-tinte-2">
                                Stattdessen: klares Wasser und ein pH-neutraler Steinreiniger. Verschüttetes sofort abtupfen.
                            </p>
                        </aside>
                    </div>
                </Abschnitt>

                {/* 3. VERLEGUNG: drei Felder; das dritte überspannt in md die freie Breite (keine Restzelle), darunter der Verweis */}
                <Abschnitt
                    titelId="marmor-kleber-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Verlegung"
                    titel={
                        <>
                            Verfärbungen vermeiden:{' '}
                            <span>weiße, schnell abbindende Natursteinkleber</span>
                        </>
                    }
                >
                    <Feldraster spalten={3}>
                        {DISCOLOURATION.map((item, i) => {
                            const letzter = i === DISCOLOURATION.length - 1;
                            return (
                                <Feld key={item.title} spanne={letzter ? 2 : undefined} className={letzter ? 'lg:col-span-1' : undefined}>
                                    <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                    <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{item.text}</p>
                                </Feld>
                            );
                        })}
                    </Feldraster>
                    <p className="mt-8 max-w-mass font-text text-fs-3 text-tinte-2">
                        Die Platten werden hohlraumarm verlegt – kalibriert im Dünnbett, unkalibriert im Mittelbett. Im Bad liegt darunter
                        eine Abdichtung nach DIN 18534; die Details dazu erklärt unsere Seite{' '}
                        <Link href="/untergrund-abdichtung/din-18534" className={linkKlassen}>
                            Abdichtung nach DIN 18534
                        </Link>
                        .
                    </p>
                </Abschnitt>

                {/* 4. EINSATZBEREICHE: Kopf links, rechts fünf Zeilen an der Fuge – Ort (H3) mit Einschätzung als Mono-Etikett
                    (vormals Versal-Badge, Wortlaut gleich; Zeichen Haken bzw. Hinweis), daneben die Begründung */}
                <Abschnitt
                    titelId="marmor-einsatz-heading"
                    leitachse
                    spaet
                    kopf="seitlich"
                    etikett="Einsatzbereiche"
                    titel="Wo Marmor passt – und wo besser nicht"
                >
                    <ul className="border-t border-tinte">
                        {PLACES.map((place) => (
                            <li key={place.title} className="grid gap-3 border-b border-fuge py-6 md:grid-cols-3 md:gap-8">
                                <div>
                                    <h3 className="font-anzeige text-fs-4 text-tinte">{place.title}</h3>
                                    <p className={clsx(etikettKlassen, 'mt-2')}>
                                        <Icon name={place.good ? 'haken' : 'hinweis'} groesse={4} />
                                        {place.verdict}
                                    </p>
                                </div>
                                <p className="max-w-mass font-text text-fs-2 text-tinte-2 md:col-span-2">{place.text}</p>
                            </li>
                        ))}
                    </ul>
                </Abschnitt>

                {/* 5. TRAVERTIN UND PFLEGE (ein Abschnitt wie im Bestand, zwei Artikel mit eigener H2): links Travertin mit den drei
                    Ausführungen als Merkliste (H3 wie im Bestand), rechts die Pflege als Feld auf Kalk */}
                <Abschnitt flaeche="fliese" leitachse spaet>
                    <div className="grid gap-y-16 lg:grid-cols-12 lg:gap-x-12">
                        <article aria-labelledby="marmor-travertin-heading" className="lg:col-span-7">
                            <h2 id="marmor-travertin-heading" className="max-w-mass text-fs-6 text-tinte">
                                Travertin: offenporig, gespachtelt oder gefüllt
                            </h2>
                            <p className="mt-6 max-w-mass font-text text-fs-3 text-tinte-2">
                                Travertin ist ein Kalkstein, der aus Quellwasser ausgefällt wurde. Dabei entstehen die typischen Hohlräume und
                                Poren. Wie sie behandelt sind, bestimmt Optik und Pflegeaufwand.
                            </p>
                            <Merkliste
                                spalten={1}
                                titelAls="h3"
                                className="mt-8"
                                eintraege={TRAVERTINE.map((type) => ({ titel: type.name, text: type.text }))}
                            />
                        </article>

                        <article
                            aria-labelledby="marmor-pflege-heading"
                            className="self-start border border-fuge bg-kalk p-6 lg:col-span-5 lg:p-8"
                        >
                            <h2 id="marmor-pflege-heading" className="font-anzeige text-fs-5 text-tinte">
                                Imprägnierung und pH-neutrale Pflege
                            </h2>
                            <div className="mt-6 space-y-3 font-text text-fs-2 text-tinte-2">
                                <p>
                                    Bei kalkhaltigen Steinen ist eine Imprägnierung besonders sinnvoll: Sie verschafft Ihnen Zeit, verschüttete
                                    Flüssigkeiten aufzunehmen, bevor sie eindringen. Aufgetragen wird sie auf den trockenen, gereinigten Belag
                                    und nach einem Test an einem Reststück.
                                </p>
                                <p>
                                    Für die tägliche Pflege genügen Wasser und ein pH-neutraler Steinreiniger. Matte Stellen durch Säure
                                    lassen sich nicht wegputzen; das Aufarbeiten der Oberfläche ist Sache eines Steinmetzbetriebs.
                                </p>
                                <p>
                                    Wie Imprägnierung, Auffrischung und Wirkungskontrolle im Detail funktionieren, lesen Sie im{' '}
                                    <Link href="/naturstein" className={linkKlassen}>
                                        Naturstein-Ratgeber
                                    </Link>
                                    .
                                </p>
                            </div>
                        </article>
                    </div>
                </Abschnitt>

                {/* 6. ALTERNATIVE: Kopf links (Etikett, H2), rechts der Text und die zwei Wege als Nebenknöpfe */}
                <Abschnitt
                    titelId="marmor-alternative-heading"
                    leitachse
                    spaet
                    kopf="seitlich"
                    etikett="Naturstein oder Marmoroptik"
                    titel="Alternative: Feinsteinzeug in Marmoroptik"
                >
                    <p className="max-w-mass font-text text-fs-3 text-tinte-2">
                        Wer die Optik von Marmor liebt, aber mit Säure, Flecken und Kratzern nicht leben möchte, findet in
                        Feinsteinzeug mit Marmordekor eine pflegeleichte Alternative – auch für Küche, Dusche und große Formate. Echter
                        Marmor bleibt dagegen ein Unikat mit Tiefenwirkung, das würdevoll altert. Beide Wege haben ihre Berechtigung;
                        die Unterschiede im Detail zeigt unser Vergleich.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Knopf href="/blog/feinsteinzeug-oder-naturstein-vergleich" variante="neben" icon="pfeil-rechts">
                            Feinsteinzeug oder Naturstein?
                        </Knopf>
                        <Knopf href="/bad/fliesen" variante="neben" icon="pfeil-rechts">
                            Fliesen im Bad
                        </Knopf>
                    </div>
                </Abschnitt>

                {/* 7. BERATUNG UND AUFMASS: drei Wege (Telefon und WhatsApp aus COMPANY_DATA); darunter bleibt die Navigation der
                    weiterführenden Ratgeber im selben Abschnitt wie im Bestand, vier Verweise als Merkliste in zwei Spalten */}
                <Abschnitt
                    titelId="marmor-cta-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Beratung & Aufmaß"
                    titel="Marmor oder Travertin für Ihr Zuhause?"
                    einleitung={
                        <p>
                            {COMPANY_DATA.owner.fullName} berät Sie ehrlich, wo der Stein passt, und verlegt ihn mit dem richtigen Kleber
                            und hohlraumarm – die beste Grundlage dafür, dass der Stein lange schön bleibt.
                        </p>
                    }
                >
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Knopf href="/kontakt" icon="pfeil-rechts">
                            Marmorverlegung anfragen
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

                    <nav className="mt-16 border-t border-fuge pt-12" aria-labelledby="marmor-ratgeber-heading">
                        <h2 id="marmor-ratgeber-heading" className="max-w-mass font-anzeige text-fs-5 text-tinte">
                            Weiterführende Ratgeber zu Marmor, Kalkstein &amp; Travertin
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

            {/* 8. QUALITÄTSVERSPRECHEN (geteilter Baustein); einen Abschluss hat die Seite im Bestand nicht */}
            <QualityPromise />
        </>
    );
}
