// Innentreppe (S-17 nach E5-BAU-08, KERN v2): Seitenkörper der Unterseite als Erzählansicht nach dem Muster der
// Familienreferenz (leistungen/[id], fliesen) und der Themenseite /treppen. Einstieg mit Laserachse, H1 links, Vorspann,
// zwei Knöpfe und der Hinweis zur Voraussetzung (in der Textspalte nach den Knöpfen, Lesefolge wie im Bestand); rechts das
// Planblatt „Innentreppe fliesen lassen“ mit dem Plan „treppe“ (interaktiv, die rote Achse trägt das Blatt). Danach die
// Leitachse über die Abschnitte, Flächen im Wechsel Kalk/Fliese:
// 2. Tritt- und Setzstufen als Feldraster mit zwei Spalten (Kalk) · 3. Kantenlösungen als Tabelle (Fliese) · 4. Details
// als Merkliste an der Fuge, Kopf seitlich (Kalk) · 5. Kundenstimme mit Anriss (Kalk, schmal) · 6. Ratgeber als Register mit
// zwei Wegen (Fliese) · Qualitätsversprechen (geteilter Baustein). Kein Auftritt, kein großer Moment.
// Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand; Metadaten und Daten unverändert. Serverkomponente.
import Link from 'next/link';
import { COMPANY_DATA } from '@/config/company';
import { REVIEWS } from '@/config/reviews';
import { createMetadata } from '@/lib/metadata';
import Icon from '@/components/icons/Icon';
import QualityPromise from '@/components/sections/QualityPromise';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Knopf from '@/components/kern/Knopf';
import Leitachse from '@/components/kern/Leitachse';
import Merkliste from '@/components/kern/Merkliste';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Tabelle from '@/components/kern/Tabelle';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { linkKlassen } from '@/components/kern/stile';

export const metadata = createMetadata({
    title: 'Innentreppe fliesen lassen | Stufen & Kanten · Tezgel',
    description:
        'Innentreppe im Haus fliesen lassen: Stufen aus Feinsteinzeug oder Naturstein, Gehrungskanten & Sockel. Fachbetrieb Tezgel – Jetzt Angebot anfragen!',
    path: '/treppen/innentreppe'
});

const STEP_FACTS = [
    {
        title: 'Jede Stufe einzeln aufmessen',
        desc: 'Auch Betonfertigteiltreppen haben Maßabweichungen. Wir messen Breite, Auftritt und Steigung jeder Stufe und schneiden Tritt- und Setzstufen individuell zu – bei gewendelten Treppen mit Schablone.'
    },
    {
        title: 'Formate passend zur Stufe',
        desc: 'Ideal ist ein Format, das die Stufenbreite ohne oder mit nur einer mittigen Fuge überbrückt. Die Fugen der Setzstufe laufen dann in einer Achse mit denen der Trittstufe.'
    },
    {
        title: 'Keramik oder Naturstein',
        desc: 'Feinsteinzeug ist dicht, abriebfest und pflegeleicht. Naturstein wirkt massiv und warm, braucht je nach Sorte aber Imprägnierung und schonende Pflege. Natursteinstufen lässt man meist vom Steinlieferanten nach Aufmaß zuschneiden.'
    },
    {
        title: 'Vollflächig verklebt',
        desc: 'Trittstufen werden hohlraumarm im Buttering-Floating-Verfahren mit flexiblem Fliesenkleber (z. B. Klasse C2 nach DIN EN 12004) verlegt. Hohlstellen unter der Vorderkante sind die häufigste Ursache für gebrochene Stufenkanten.'
    }
];

const EDGES = [
    {
        title: 'Gehrungskante',
        how: 'Tritt- und Setzstufe werden an der Kante im 45°-Winkel geschnitten und passgenau gestoßen; die Kante wird leicht gefast.',
        pros: 'Durchgehende Materialoptik ohne sichtbares Metall; wirkt wie aus dem Vollen gearbeitet.',
        cons: 'Hoher Schneidaufwand, nur mit dichtem, durchgefärbtem Material wirklich schön; die Kante ist stoßempfindlicher als mit Profil.'
    },
    {
        title: 'Stufenprofil',
        how: 'Ein Treppenkantenprofil – etwa aus Edelstahl – wird beim Verlegen mit eingebettet und schließt die Vorderkante ab.',
        pros: 'Schützt die Fliesenkante vor Abplatzungen, deutlich sichtbare Stufenkante; manche Profile haben eine rutschhemmende Einlage.',
        cons: 'Metall bleibt sichtbar und prägt die Optik; das Profil muss zur Belagdicke passen.'
    },
    {
        title: 'Stufenplatte',
        how: 'Fertige Stufenfliesen oder Natursteinplatten mit werkseitig bearbeiteter Vorderkante (gerundet oder gefast).',
        pros: 'Robuste, ab Werk saubere Kante; beim Naturstein massiver Eindruck.',
        cons: 'Abmessungen durch das Sortiment bzw. den Zuschnitt vorgegeben; passende Bodenfliesen im gleichen Dekor sind nicht immer verfügbar.'
    }
];

const MORE = [
    {
        title: 'Treppensockel: gestufte Sockel sauber schneiden',
        text: 'An der Wand entlang folgt der Sockel dem Treppenverlauf. Als gestufter Sockel (Sägezahnsockel) wird er aus Fliesenstreifen passend zu jeder Stufe geschnitten, sodass Sockelfugen auf die Stufenfugen treffen. Alternativ läuft ein schräger Wandsockel parallel zur Lauflinie. Die Anschlussfuge zwischen Sockel und Stufe wird elastisch geschlossen.'
    },
    {
        title: 'Podeste und Anschluss an den angrenzenden Boden',
        text: 'Podeste und Austritte werden im selben Fugenraster wie die Stufen geplant. Wo Treppe und Flurboden aneinanderstoßen, entscheiden Belagdicke und Aufbauhöhe, ob die letzte Steigung passt. Deshalb planen wir Treppe und Boden idealerweise gemeinsam.'
    },
    {
        title: 'Durchgängige Optik mit dem Wohnbereich',
        text: 'Wer Flur, Diele und Treppe mit derselben Fliese belegt, erhält eine ruhige, großzügige Wirkung. Bei großformatigen Bodenfliesen schneiden wir Tritt- und Setzstufen aus demselben Material – so bleibt die Farbwirkung einheitlich.'
    },
    {
        title: 'Trittsicherheit und Pflege im Alltag',
        text: 'Auf Innentreppen empfehlen sich matte bzw. leicht strukturierte Oberflächen; hochglanzpolierte Stufen werden mit Socken oder nassen Sohlen rutschig. Eine kontrastreiche Stufenkante erleichtert die Orientierung. Feinsteinzeug reinigen Sie mit pH-neutralem Reiniger, Naturstein mit einem auf die Sorte abgestimmten Pflegemittel.'
    }
];

const WEITERLESEN = [
    { title: 'Treppen im Überblick', path: '/treppen', desc: 'Voraussetzungen, Belagsarten und Steigungen' },
    { title: 'Wohnbereiche fliesen', path: '/leistungen/wohnen', desc: 'Flur, Wohnraum und Treppe aus einem Guss' },
    { title: 'Verlegemuster & Abschlüsse', path: '/fliesen/verlegemuster', desc: 'Fugenbild, Kanten und Sockel' },
    { title: 'Rutschhemmung', path: '/blog/rutschfeste-fliesen-r-klassen', desc: 'R-Klassen nach DIN EN 16165 erklärt' }
];

// Hochkant-Plan im Planblatt: mittig, schmaler als das Blatt (wie auf /treppen)
const PLAN_HOCHKANT = 'mx-auto max-w-1/2 md:max-w-1/3 lg:max-w-1/2';

// Zeile des Registers (Ratgeber auf Fliese): die ganze Zeile ist der Link; Hover färbt die Fläche auf Kalk
const ZEILE = 'group flex min-h-12 items-center gap-4 px-3 py-4 pointer-fine:hover:bg-kalk active:bg-kalk';
// Name in der Zeile: Unterstrich beim Überfahren
const NAME =
    'font-text text-fs-3 font-semibold text-tinte md:w-1/3 md:shrink-0 decoration-1 underline-offset-4 decoration-tinte pointer-fine:group-hover:underline group-active:underline';

export default function InnentreppePage() {
    const review = REVIEWS.find((r) => r.id === 'sara-j');

    return (
        <>
            {/* 1. EINSTIEG: Kennzeile, H1 an der Laserachse, Vorspann, zwei Knöpfe, Hinweis zur Voraussetzung; rechts das Planblatt */}
            <section aria-labelledby="innentreppe-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={<>Treppen &middot; Innenbereich</>}
                    titel={
                        <span id="innentreppe-heading">
                            Innentreppe fliesen:{' '}
                            <span>Stufen, Setzstufen und Sockel aus einem Guss</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Ob Neubau oder Renovierung: Eine massive Betontreppe im Haus lässt sich mit Feinsteinzeug oder Naturstein passend zum
                            Wohnbereich belegen. Entscheidend sind exaktes Aufmaß, die richtige Kantenlösung und eine vollflächige Verlegung.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Aufmaß für Ihre Treppe anfragen
                            </Knopf>
                            <Knopf href="/treppen" variante="neben">
                                Alle Treppentypen
                            </Knopf>
                        </>
                    }
                    merkmale={
                        // Hinweis des Bestands unter den Knöpfen (kein Stichpunkt, kein doppelter Text): Nebentext mit Textlink
                        <p className="max-w-mass font-text text-fs-2 text-tinte-2">
                            Voraussetzung ist eine tragfähige Massivtreppe – Holz- und Stahltreppen sind für starre Beläge nicht ohne Weiteres
                            geeignet.{' '}
                            <Link href="/treppen" className={linkKlassen}>
                                Was sich belegen lässt
                            </Link>
                        </p>
                    }
                    rand={
                        // Der Plan „treppe“ steht hochkant (16 × 24): mittig auf halber bzw. (md) einem Drittel der Blattbreite
                        <Planblatt felder={planfelder('Innentreppe fliesen lassen', 'treppe')}>
                            <Verlegeplan plan="treppe" ohneAchse bemassung={false} interaktiv className={PLAN_HOCHKANT} />
                        </Planblatt>
                    }
                />
            </section>

            {/* LEITACHSE: das Lot setzt die Achse des Einstiegs über die Abschnitte fort */}
            <Leitachse>
                {/* 2. TRITT- UND SETZSTUFEN: vier Felder in zwei Spalten (ohne Restzelle) */}
                <Abschnitt
                    titelId="stufen-heading"
                    leitachse
                    spaet
                    etikett="Tritt- und Setzstufen"
                    titel="Aufmaß, Formate und Material"
                    einleitung={
                        <p>
                            Eine Treppe mit n Steigungen hat n Setzstufen und meist n−1 Trittstufen. Belegt wird jeweils der Auftritt
                            einschließlich Überstand an der Vorderkante sowie die senkrechte Setzstufe.
                        </p>
                    }
                >
                    <Feldraster spalten={2}>
                        {STEP_FACTS.map((item) => (
                            <Feld key={item.title}>
                                <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{item.desc}</p>
                            </Feld>
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 3. KANTENLÖSUNGEN auf Fliese: Vergleich als Tabelle (benannte Region, Name = Überschrift darüber) */}
                <Abschnitt
                    titelId="kanten-heading"
                    leitachse
                    spaet
                    flaeche="fliese"
                    etikett="Kantenlösungen im Vergleich"
                    titel="Gehrung, Profil oder Stufenplatte?"
                    einleitung={
                        <p>
                            Die Vorderkante ist die am stärksten beanspruchte Stelle jeder Stufe – und prägt die Optik der ganzen Treppe. Welche
                            Lösung passt, hängt von Material, Nutzung und Geschmack ab.
                        </p>
                    }
                >
                    <Tabelle
                        name="Gehrung, Profil oder Stufenplatte?"
                        kopf={['Lösung', 'Ausführung', 'Vorteile', 'Zu beachten']}
                        zeilen={EDGES.map((edge) => [edge.title, edge.how, edge.pros, edge.cons])}
                    />
                </Abschnitt>

                {/* 4. DETAILS: Kopf seitlich, vier Punkte als Merkliste an der Fuge (Titel bleiben h3), darunter der Verweis auf
                    die Rutschhemmung */}
                <Abschnitt
                    titelId="details-heading"
                    leitachse
                    spaet
                    kopf="seitlich"
                    etikett="Details, die man sieht"
                    titel="Sockel, Podeste und ein stimmiges Gesamtbild"
                >
                    <Merkliste titelAls="h3" eintraege={MORE.map((item) => ({ titel: item.title, text: item.text }))} />
                    <p className="mt-8 max-w-mass font-text text-fs-2 text-tinte-2">
                        Welche Rutschhemmungsklasse für Ihre Stufen sinnvoll ist, lesen Sie in unserem Beitrag zu den{' '}
                        <Link href="/blog/rutschfeste-fliesen-r-klassen" className={linkKlassen}>
                            R-Klassen nach DIN EN 16165
                        </Link>
                        .
                    </p>
                </Abschnitt>

                {/* 5. KUNDENSTIMME: eine Bewertung mit Anriss, Quelle in Mono (wie auf /bad/fliesen); Zitat im Lesemaß */}
                {review && (
                    <Abschnitt aria-label="Kundenstimme" breite="mass" leitachse spaet>
                        <figure className="border-l-2 border-laser-tief pl-6 sm:pl-8">
                            <span className="flex items-center gap-1 text-tinte" aria-label={`${review.rating} von 5 Sternen`}>
                                {Array.from({ length: review.rating }, (_, i) => (
                                    <Icon key={i} name="stern-voll" groesse={4} />
                                ))}
                            </span>
                            <blockquote className="mt-4 max-w-mass font-text text-fs-4 text-tinte">„{review.text}“</blockquote>
                            <figcaption className="mt-4 font-text text-fs-2 text-tinte">
                                <span className="font-semibold">{review.author}</span>
                                <span className="font-mono text-fs-1 text-tinte-2">
                                    {' '}
                                    &middot; {review.source}-Rezension &middot; {review.topic}
                                </span>
                            </figcaption>
                        </figure>
                    </Abschnitt>
                )}

                {/* 6. RATGEBER auf Fliese: Register, je Zeile Titel, Beschreibung und Pfeil; darunter Beratung und Telefon als
                    Nebenknöpfe. Die Fläche trennt den Abschnitt vom folgenden Qualitätsversprechen (Kalk) */}
                <Abschnitt
                    titelId="innentreppe-ratgeber-heading"
                    leitachse
                    spaet
                    flaeche="fliese"
                    titel="Weiterführende Ratgeber zu Innentreppen & Fliesenbelägen"
                >
                    <ul className="border-t border-tinte">
                        {WEITERLESEN.map((link) => (
                            <li key={link.path} className="border-b border-fuge">
                                <Link href={link.path} data-motion="zustand" className={ZEILE}>
                                    <span className="flex min-w-0 flex-1 flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
                                        <span className={NAME}>{link.title}</span>
                                        <span className="font-text text-fs-2 text-tinte-2">{link.desc}</span>
                                    </span>
                                    <span aria-hidden="true" className="flex shrink-0 text-strich">
                                        <Icon name="pfeil-rechts" groesse={5} />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Knopf href="/beratung" variante="neben">
                            Beratung zu Material und Kanten
                        </Knopf>
                        <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
                            <span className="font-mono font-normal">{COMPANY_DATA.contact.phone}</span>
                        </Knopf>
                    </div>
                </Abschnitt>
            </Leitachse>

            {/* 7. QUALITÄTSVERSPRECHEN (geteilter Baustein); einen Abschluss hat die Seite im Bestand nicht */}
            <QualityPromise />
        </>
    );
}
