// Stelzlager (E5-BAU-05 / S-14, KERN v2): Erzählansicht nach dem Muster der Familie Themen (/leistungen/[id], /fliesen,
// /untergrund-abdichtung/ausgleich-gefaelle). Einstieg mit Laserachse, H1 links, Vorspann und zwei Knöpfe; rechts das
// Planblatt mit dem Plan „aussen“ (interaktiv, ohne Achse). Danach die Leitachse über die Abschnitte, Flächen im Wechsel:
// 2. Prinzip (Kalk): Text an der Fuge neben dem gezeichneten Schnitt (Schichten als Bänder auf einem Blatt, Legende darunter)
// · 3. Vorteile (Fliese): Feldraster, Felder Kalk · 4. Voraussetzungen, Höhenausgleich, Revision (Kalk): drei Zeilen an der
// Fuge, Überschrift links, Text rechts · 5. Grenzen (Fliese): drei Spalten an der Fuge · 6. Aufmaß (Kalk): Knöpfe mit Telefon
// und WhatsApp aus COMPANY_DATA · 7. Weiterführende Ratgeber (Fliese): Navigation als Register wie auf der Startseite.
// Abschluss: QualityPromise. Kein großer Moment, kein Auftritt, keine Icon-Kacheln (eine Icon-Familie). Wortlaut,
// Überschriften, Links, IDs und Lesefolge wie im Bestand; Metadaten unverändert.
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
import Leitachse, { ACHSE_LAGE, KREUZ_GROESSE } from '@/components/kern/Leitachse';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { linkKlassen, seitenKlassen } from '@/components/kern/stile';
import SeitenDaten from '@/components/seo/SeitenDaten';

export const metadata = createMetadata({
    title: 'Terrassenplatten auf Stelzlagern verlegen | Tezgel',
    description:
        'Terrassenplatten auf Stelzlagern verlegen lassen: höhenverstellbar, frostsicher & drainagefähig. Fachbetrieb Tezgel in Wetzlar & Aßlar. Jetzt anfragen!',
    path: '/balkon-terrasse/stelzlager'
});

// Schnitt von oben nach unten: Höhe und Fläche je Schicht (nur Tokens); das Lager zeigt seine Stützen
const CROSS_SECTION = [
    { label: '2-cm-Feinsteinzeugplatte', note: 'frostbeständig, liegt nur an den Ecken auf', className: 'h-8 bg-fliese text-tinte' },
    { label: 'Stelzlager mit Fugensteg', note: 'höhenverstellbar, gibt die offene Fuge vor', className: 'h-16 bg-kalk text-tinte', stuetzen: true },
    { label: 'Schutzlage / Lagerpad', note: 'verteilt die Last, schont die Abdichtung', className: 'h-8 bg-fuge text-tinte' },
    { label: 'Abdichtung im Gefälle', note: 'führt das Wasser zu Ablauf oder Rinne', className: 'h-8 bg-tinte text-kalk' },
    { label: 'Tragender Untergrund', note: 'Balkonplatte, Dachdecke oder Betonplatte', className: 'h-12 bg-strich text-tinte' }
];

const FEATURES = [
    {
        title: 'Punktförmige Auflage',
        desc: 'Jedes Lager trägt die Ecken von bis zu vier Platten. Die Platte überspannt den Raum dazwischen – deshalb kommen hier 2-cm-Platten mit hoher Bruchlast zum Einsatz, keine dünnen Innenfliesen.'
    },
    {
        title: 'Offene Fugen',
        desc: 'Der Fugensteg am Lagerkopf hält einen gleichmäßigen Abstand von wenigen Millimetern. Regenwasser läuft sofort durch die Fugen nach unten ab, statt auf dem Belag zu stehen.'
    },
    {
        title: 'Kein Mörtelbett',
        desc: 'Ohne Mörtel unter dem Belag gibt es auch keine Quelle für Kalkausblühungen an Fugen und Stirnkanten. Das ist ein Vorteil des Systems, der einen fachgerechten Aufbau voraussetzt.'
    },
    {
        title: 'Zugängliche Abdichtung',
        desc: 'Die Abdichtung liegt geschützt unter dem Belag und bleibt erreichbar. Abläufe, Rinnen und Anschlüsse lassen sich kontrollieren, ohne einen Belag zu zerstören.'
    },
    {
        title: 'Stufenloser Höhenausgleich',
        desc: 'Über ein Gewinde lassen sich die Lager in der Höhe einstellen. So entsteht auf einem Untergrund mit Gefälle und kleinen Unebenheiten eine ebene, trittsichere Oberfläche.'
    },
    {
        title: 'Sofort begehbar',
        desc: 'Da nichts abbinden oder trocknen muss, ist die Fläche direkt nach der Verlegung nutzbar. Das ist besonders bei bewohnten Häusern und Dachterrassen ein Plus.'
    }
];

const REQUIREMENTS = [
    'Die Abdichtung ist dicht, funktionsfähig und liegt im Gefälle – Stelzlager ersetzen keine Abdichtung.',
    'Der Untergrund ist tragfähig. Bei Zweifeln an der Balkonplatte oder bei schweren Lasten beurteilt ein Tragwerksplaner die Statik.',
    'Die verfügbare Höhe bis zur Türschwelle reicht für Lager und Platte aus.',
    'Abläufe, Speier oder Rinnen sind vorhanden und bleiben frei zugänglich.',
    'Die Oberfläche der Abdichtung ist so beschaffen, dass Lagerpads flächig aufliegen können.'
];

const LIMITS = [
    {
        title: 'Windsog',
        desc: 'Auf hohen Gebäuden, an Gebäudeecken und auf frei liegenden Dachterrassen können Windkräfte lose aufliegende Platten anheben. Ob und wie der Belag gesichert werden muss, richtet sich nach Gebäude, Lage und den Angaben des Systemherstellers.'
    },
    {
        title: 'Punktlasten',
        desc: 'Schwere Pflanzkübel, Außenküchen oder Wasserbecken erzeugen hohe Einzellasten. Sie werden vor der Verlegung eingeplant, etwa mit zusätzlichen Lagern unter den betroffenen Platten.'
    },
    {
        title: 'Absturzsicherung',
        desc: 'Jeder zusätzliche Zentimeter Belagshöhe verringert die wirksame Höhe von Geländer oder Brüstung. Das ist bei der Planung zu prüfen; Arbeiten am Geländer gehören nicht zu unseren Leistungen.'
    }
];

const FURTHER_READING = [
    { label: 'Aufbauten im Vergleich: Balkon & Terrasse', href: '/balkon-terrasse' },
    { label: 'Balkonsanierung: Gefälle, Abdichtung, Randabschluss', href: '/balkon-terrasse/balkonsanierung' },
    { label: 'Barrierefreier Balkonaustritt', href: '/blog/barrierefreier-balkonaustritt' },
    { label: 'Leistung: Außenbereiche & Balkone', href: '/leistungen/aussen' }
];

const nummer = (i) => String(i + 1).padStart(2, '0');

// Zeile an der Fuge (Abschnitt 4): Überschrift links (5 Spalten ab lg), Text rechts in Lesebreite; die H2 bleibt H2
const ZEILE = 'grid grid-cols-4 gap-y-6 border-t border-fuge py-12 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-12';
const ZEILE_KOPF = 'col-span-4 md:col-span-8 lg:col-span-5';
const ZEILE_TEXT = 'col-span-4 flex max-w-mass flex-col gap-4 font-text text-fs-3 text-tinte-2 md:col-span-8 lg:col-span-7';
const ZEILE_TITEL = 'font-anzeige text-fs-5 text-tinte';

// Unterstrich der Registerzeile erscheint beim Überfahren (wie „Fachthemen im Detail“ auf der Startseite)
const UNTERSTRICH = 'decoration-1 underline-offset-4 decoration-tinte pointer-fine:group-hover:underline group-active:underline';

export default function StelzlagerPage() {
    return (
        <>
            <SeitenDaten
                pfad="/balkon-terrasse/stelzlager"
                titel="Terrassenplatten auf Stelzlagern verlegen | Tezgel"
                beschreibung="Terrassenplatten auf Stelzlagern verlegen lassen: höhenverstellbar, frostsicher & drainagefähig. Fachbetrieb Tezgel in Wetzlar & Aßlar. Jetzt anfragen!"
                brotkrumen={[{ name: 'Start', href: '/' }, { name: 'Balkon und Terrasse', href: '/balkon-terrasse' }, { name: 'Terrassenplatten auf Stelzlagern verlegen mit Tezgel' }]}
            />
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts das Planblatt mit dem Plan „aussen“ */}
            <section aria-labelledby="stelzlager-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={<>Balkon- &amp; Terrassensanierung auf Stelzlagern</>}
                    titel={<span id="stelzlager-heading">Terrassenplatten auf Stelzlagern verlegen mit Tezgel</span>}
                    vorspann={
                        <p>
                            Terrassenplatten auf Stelzlagern verlegen lassen: Fachbetrieb Tezgel montiert 2-cm-Feinsteinzeug auf höhenverstellbaren Stelzlagern in Wetzlar &amp; Aßlar – frostsicher, dauerhaft drainagefähig und ohne Mörtelbett.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Terrassensanierung anfragen
                            </Knopf>
                            <Knopf href="/balkon-terrasse" variante="neben">
                                Aufbauten vergleichen
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Terrassenplatten auf Stelzlagern verlegen', 'aussen')}>
                            <Verlegeplan plan="aussen" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. PRINZIP: zwei Absätze an der Fuge, daneben der Schnitt als Zeichenblatt (Bänder dekorativ wie im Bestand),
                    darunter die Legende mit denselben Nummern */}
                <Abschnitt
                    titelId="stelzlager-prinzip-heading"
                    leitachse
                    spaet
                    etikett="Das Prinzip"
                    titel="So funktioniert die Stelzlager-Verlegung"
                >
                    <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                        <div className="flex max-w-mass flex-col gap-4 font-text text-fs-3 text-tinte-2 lg:col-span-6">
                            <p>
                                Statt die Platten in ein Mörtelbett zu legen, stehen sie auf einzelnen, höhenverstellbaren Lagern. Das
                                Wasser fließt durch die offenen Fugen auf die Abdichtungsebene und wird dort im Gefälle zu Ablauf oder
                                Rinne geführt. Der Belag selbst bleibt trocken aufgelegt – Frost findet keine nasse Mörtelschicht, die er
                                aufsprengen könnte.
                            </p>
                            <p>
                                Wir setzen dafür 2-cm-Feinsteinzeug ein: dicht, frostbeständig und in dieser Stärke für die
                                punktförmige Auflage ausgelegt. Das Gefälle bleibt in der Abdichtung, die Lager gleichen es aus – die
                                Oberfläche liegt eben oder mit leichtem Restgefälle.
                            </p>
                        </div>

                        <figure className="self-start lg:col-span-6">
                            <Planblatt>
                                <div className="border border-strich" aria-hidden="true">
                                    {CROSS_SECTION.map((layer, i) => (
                                        <div key={layer.label} className={clsx('flex items-stretch border-b border-strich last:border-b-0', layer.className)}>
                                            <span className="flex min-w-0 items-center gap-4 px-4 font-mono text-fs-1">
                                                <span>{nummer(i)}</span>
                                                <span>{layer.label}</span>
                                            </span>
                                            {layer.stuetzen && (
                                                <span className="ml-auto flex w-2/5 shrink-0 justify-around">
                                                    <span className="w-2 shrink-0 bg-tinte-2" />
                                                    <span className="w-2 shrink-0 bg-tinte-2" />
                                                    <span className="w-2 shrink-0 bg-tinte-2" />
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </Planblatt>
                            <figcaption className="border-x border-b border-fuge bg-fliese p-6 lg:p-8">
                                <p className="font-text text-fs-2 font-semibold text-tinte">Schematischer Aufbau von oben nach unten</p>
                                <ol className="mt-4 border-t border-fuge">
                                    {CROSS_SECTION.map((layer, i) => (
                                        <li key={layer.label} className="flex items-baseline gap-4 border-b border-fuge py-3 font-text text-fs-2 text-tinte-2 last:border-b-0 last:pb-0">
                                            <span aria-hidden="true" className="font-mono text-fs-1 text-tinte">
                                                {nummer(i)}
                                            </span>
                                            <span className="min-w-0">
                                                <span className="font-semibold text-tinte">{layer.label}</span> – {layer.note}
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            </figcaption>
                        </figure>
                    </div>
                </Abschnitt>

                {/* 3. VORTEILE: sechs Felder auf Kalk im Band auf Fliese (drei bzw. zwei Spalten ohne Restzelle) */}
                <Abschnitt
                    titelId="stelzlager-vorteile-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Vorteile"
                    titel="Freier Wasserablauf, kein Mörtel, zugängliche Abdichtung"
                >
                    <ul className="grid grid-cols-1 gap-px border border-fuge bg-fuge md:grid-cols-2 lg:grid-cols-3">
                        {FEATURES.map((item) => (
                            <li key={item.title} className="flex flex-col bg-kalk p-6 lg:p-8">
                                <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{item.desc}</p>
                            </li>
                        ))}
                    </ul>
                </Abschnitt>

                {/* 4. VORAUSSETZUNGEN, HÖHENAUSGLEICH, REVISION: wie im Bestand drei Teile mit eigener H2 in einem Abschnitt
                    ohne eigenen Kopf – als Zeilen an der Fuge (Überschrift links, Text rechts) */}
                <Abschnitt leitachse spaet>
                    <article aria-labelledby="stelzlager-voraussetzungen-heading" className={ZEILE}>
                        <div className={ZEILE_KOPF}>
                            <h2 id="stelzlager-voraussetzungen-heading" className={ZEILE_TITEL}>
                                Voraussetzungen: tragfähig und abgedichtet
                            </h2>
                        </div>
                        <div className={ZEILE_TEXT}>
                            <ul className="grid gap-3">
                                {REQUIREMENTS.map((req) => (
                                    <li key={req} className="flex gap-3 text-tinte">
                                        <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                                            <Fugenkreuz className="size-3" />
                                        </span>
                                        <span className="min-w-0">{req}</span>
                                    </li>
                                ))}
                            </ul>
                            <p>
                                Ist die vorhandene Abdichtung schadhaft, wird sie vor dem neuen Belag erneuert – mehr dazu unter{' '}
                                <Link href="/balkon-terrasse/balkonsanierung" className={linkKlassen}>
                                    Balkonsanierung
                                </Link>
                                .
                            </p>
                        </div>
                    </article>

                    <article aria-labelledby="stelzlager-hoehe-heading" className={ZEILE}>
                        <div className={ZEILE_KOPF}>
                            <h2 id="stelzlager-hoehe-heading" className={ZEILE_TITEL}>
                                Höhenausgleich: Gefälle und Unebenheiten auffangen
                            </h2>
                        </div>
                        <div className={ZEILE_TEXT}>
                            <p>
                                Die Abdichtung muss Gefälle haben, damit Wasser abläuft – der Belag soll trotzdem eben sein. Die Lager
                                werden deshalb einzeln eingestellt: am Hochpunkt niedriger, zum Ablauf hin höher.
                            </p>
                            <p>
                                Für geneigte Untergründe gibt es Lagerköpfe, die sich der Neigung anpassen, damit die Platte satt
                                aufliegt. Kleinere Unebenheiten werden über Ausgleichsscheiben oder die Gewindeverstellung aufgefangen.
                            </p>
                            <p>
                                Die Gesamthöhe aus Lager und Platte muss zur Türschwelle passen. Wie niedrig der Übergang sein darf, erklärt
                                unser Beitrag zum{' '}
                                <Link href="/blog/barrierefreier-balkonaustritt" className={linkKlassen}>
                                    barrierefreien Balkonaustritt
                                </Link>
                                .
                            </p>
                        </div>
                    </article>

                    <article aria-labelledby="stelzlager-revision-heading" className={ZEILE}>
                        <div className={ZEILE_KOPF}>
                            <h2 id="stelzlager-revision-heading" className={ZEILE_TITEL}>
                                Revision und Pflege
                            </h2>
                        </div>
                        <div className={ZEILE_TEXT}>
                            <p>
                                Einzelne Platten lassen sich mit einem Saugheber anheben. So erreichen Sie Abläufe und Rinnen, ohne den
                                Belag zu beschädigen, und eine beschädigte Platte wird einfach getauscht.
                            </p>
                            <p>
                                Halten Sie Abläufe und Fugen frei von Laub und Schmutz, damit das Wasser ungehindert abfließt. Einmal im
                                Jahr – am besten nach dem Laubfall – lohnt ein Blick unter die Platten vor dem Ablauf.
                            </p>
                            <p>
                                Die Oberfläche des Feinsteinzeugs reinigen Sie mit Wasser und einem milden Reiniger; Tipps dazu im
                                Beitrag{' '}
                                <Link href="/blog/fliesen-reinigen-pflegen" className={linkKlassen}>
                                    Fliesen richtig reinigen
                                </Link>
                                .
                            </p>
                        </div>
                    </article>
                </Abschnitt>

                {/* 5. GRENZEN: drei Spalten an der Fuge (ab lg nebeneinander), je Spalte Überschrift und Text */}
                <Abschnitt
                    titelId="stelzlager-grenzen-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Ehrlich geplant"
                    titel="Grenzen: Wind, Möblierung, Punktlasten"
                    einleitung={
                        <p>
                            Stelzlager sind kein Universalsystem. Diese Punkte klären wir vor der Verlegung – und ziehen, wo nötig,
                            Fachplaner hinzu.
                        </p>
                    }
                >
                    <ul className="grid gap-y-12 lg:grid-cols-3 lg:gap-x-12">
                        {LIMITS.map((item) => (
                            <li key={item.title} className="border-t border-tinte pt-6">
                                <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{item.desc}</p>
                            </li>
                        ))}
                    </ul>
                </Abschnitt>

                {/* 6. AUFMASS: Hauptknopf, Telefon in Mono und WhatsApp aus COMPANY_DATA */}
                <Abschnitt
                    titelId="stelzlager-cta-heading"
                    leitachse
                    spaet
                    etikett="Kostenfreies Aufmaß"
                    titel="Passt ein Stelzlager-Belag auf Ihren Balkon?"
                    einleitung={
                        <p>
                            Wir messen Aufbauhöhe und Gefälle, prüfen die Abdichtung und sagen Ihnen offen, ob das System passt oder
                            vorher saniert werden muss.
                        </p>
                    }
                >
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Knopf href="/kontakt" icon="pfeil-rechts">
                            Terrassensanierung anfragen
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

                {/* 7. WEITERFÜHRENDE RATGEBER: Navigation wie im Bestand (eigener Landmark), Kopf und Fläche wie ein Abschnitt
                    auf Fliese, die Verweise als Register mit Pfeil (Muster „Fachthemen im Detail“ der Startseite) */}
                <nav aria-labelledby="stelzlager-ratgeber-heading" className="relative border-y border-fuge bg-fliese py-16 lg:py-24">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10">
                        <div className={clsx(seitenKlassen, 'relative')}>
                            <Fugenkreuz className={clsx('absolute top-0 -translate-x-1/2 -translate-y-1/2 text-tinte', KREUZ_GROESSE, ACHSE_LAGE)} />
                        </div>
                    </div>
                    <div className={clsx(seitenKlassen, 'spaet-zeichnen')}>
                        <h2 id="stelzlager-ratgeber-heading" className="max-w-mass text-fs-6 text-tinte">
                            Weiterführende Ratgeber zu Stelzlagern &amp; Terrassenbelägen
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
