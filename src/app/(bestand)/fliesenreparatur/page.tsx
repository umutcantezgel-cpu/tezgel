// Fliesenreparatur (E5-BAU-07 · S-16, KERN v2): Seitenkörper der Themenseite als Erzählansicht nach dem Muster der
// Familienreferenz (leistungen/[id], fliesen) und der Schwesterseite /fliesen/fugensanierung. Einstieg mit Laserachse, H1
// links, Vorspann und zwei Knöpfe (WhatsApp, Telefon); rechts das Planblatt „reparatur“ mit der markierten Fliese
// (interaktiv; das Blatt trägt die rote Achse des Plans). Danach die Leitachse über die Abschnitte, Flächen im Wechsel:
// 2. Leistungen und Erstmaßnahmen (Fliese): Liste an der Fuge, daneben der Warnkasten „Wasser tritt aus?“ · 3. Austausch
// (Kalk): vier Schritte als Schrittfolge · 4. Ersatzfliesen (Fliese), Kopf seitlich: drei Wege als Merkliste · 5. Grenzen
// (Kalk): Liste an der Fuge, daneben zwei Felder mit Verweis · 6. Kundenstimme mit Anriss (Fliese) · 7. Reparatur anfragen
// (Kalk), Kopf seitlich: Fotoliste, Erreichbarkeit, zwei Wege · 8. Weiterführende Ratgeber als Register (Fliese).
// Danach das Qualitätsversprechen (geteilter Baustein).
// Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand. Kein Auftritt und kein großer Moment. `spaet` auf allen
// Abschnitten unter dem ersten Bildschirm (keine Sprungziele, keine Formulare). Metadaten unverändert. Serverkomponente.
import Link from 'next/link';
import clsx from 'clsx';
import { COMPANY_DATA } from '@/config/company';
import { REVIEWS } from '@/config/reviews';
import { createMetadata } from '@/lib/metadata';
import Icon from '@/components/icons/Icon';
import QualityPromise from '@/components/sections/QualityPromise';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import Leitachse from '@/components/kern/Leitachse';
import Merkliste from '@/components/kern/Merkliste';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Schrittfolge from '@/components/kern/Schrittfolge';
import Verlegeplan from '@/components/kern/Verlegeplan';

export const metadata = createMetadata({
    title: 'Fliesenreparatur Wetzlar & Aßlar | Fliesen Tezgel',
    description:
        'Professionelle Fliesenreparatur in Wetzlar & Aßlar: einzelne Fliesen austauschen, Bohrlöcher verschließen & Fugen sanieren. Schneller Vor-Ort-Service!',
    path: '/fliesenreparatur'
});

const REPAIRS = [
    'Einzelne gesprungene, abgeplatzte oder hohl liegende Boden- und Wandfliesen',
    'Lose oder beschädigte Sockelfliesen',
    'Ausgebrochene Zementfugen und gerissene Silikonfugen',
    'Beschädigte Stufenkanten und lose Stufenplatten',
    'Bohrlöcher nach einem Umbau oder Fliesen hinter entfernten Einbauten'
];

const WATER_STEPS = [
    'Absperrventil bzw. Hauptabsperrhahn hinter dem Wasserzähler schließen',
    'Elektrische Geräte im betroffenen Bereich nur stromlos schalten, wenn das gefahrlos möglich ist',
    'Wasser aufnehmen und den Schaden für die Versicherung fotografieren',
    'Einen Installateur mit der Behebung der Leckage beauftragen'
];

const REPLACE_STEPS = [
    { t: 'Fugen öffnen', d: 'Die Fugen rund um die Fliese werden vorsichtig ausgefräst bzw. ausgekratzt, damit Spannungen nicht auf die Nachbarfliesen übergehen.' },
    { t: 'Fliese kontrolliert entfernen', d: 'Die beschädigte Fliese wird von der Mitte aus zerlegt – nicht von der Kante, wo die Nachbarfliesen anliegen.' },
    { t: 'Untergrund prüfen', d: 'Kleberreste werden entfernt. In Dusche und Bad liegt direkt unter der Fliese oft die Verbundabdichtung: Sie bleibt unversehrt oder wird mit einem verträglichen System örtlich ergänzt.' },
    { t: 'Neu setzen und verfugen', d: 'Die Ersatzfliese wird vollflächig in flexiblem Kleber gesetzt, bündig ausgerichtet und nach dem Abbinden verfugt; Anschlussfugen werden elastisch geschlossen.' }
];

const NO_LONGER_AVAILABLE = [
    { t: 'Restfliesen', d: 'Oft liegen im Keller oder in der Garage noch Fliesen aus der Bauzeit. Bewahren Sie diese auf – sie passen am besten.' },
    { t: 'Fliese an unauffälliger Stelle entnehmen', d: 'Eine Fliese unter der Waschmaschine, hinter einem Schrank oder in einer Abstellkammer kann ausgebaut und an der sichtbaren Stelle eingesetzt werden; die unsichtbare Stelle erhält eine ähnliche Fliese.' },
    { t: 'Bewusster Akzent', d: 'Passt nichts mehr, kann ein gezielt gesetzter Kontrast – etwa ein Dekorband oder eine Reihe in anderer Farbe – besser aussehen als eine fast passende Fliese.' }
];

const NOT_WORTH_IT = [
    'Viele Fliesen klingen hohl oder lösen sich auf größerer Fläche',
    'Risse laufen über mehrere Fliesen hinweg – ein Hinweis auf Bewegungen im Untergrund',
    'Hinter den Fliesen ist es dauerhaft feucht, die Abdichtung ist vermutlich defekt',
    'Es sind so viele Ersatzfliesen nötig, dass keine passenden mehr zu bekommen sind'
];

const PHOTO_TIPS = [
    'eine Nahaufnahme des Schadens',
    'ein Übersichtsfoto des Raums bzw. der Fläche',
    'Format der Fliese (z. B. mit Zollstock im Bild)',
    'ob noch Restfliesen vorhanden sind'
];

const WEITERLESEN = [
    { title: 'Fugensanierung', path: '/fliesen/fugensanierung', desc: 'Silikon- und Zementfugen erneuern' },
    { title: 'Schadensanalyse', path: '/schadensanalyse', desc: 'Ursachen vor Ort klären' },
    { title: 'Badsanierung', path: '/bad/badsanierung', desc: 'Wenn eine Reparatur nicht mehr reicht' },
    { title: 'Häufige Fragen', path: '/faq', desc: 'Antworten rund um Fliesen und Ablauf' }
];

// Zeile des Registers (Ratgeber auf Fliese): die ganze Zeile ist der Link; Überfahren färbt die Fläche auf Kalk
const ZEILE = 'group flex min-h-12 items-center gap-4 px-3 py-4 pointer-fine:hover:bg-kalk active:bg-kalk';
// Name in der Zeile: Unterstrich beim Überfahren
const NAME =
    'font-text text-fs-3 font-semibold text-tinte md:w-1/3 md:shrink-0 decoration-1 underline-offset-4 decoration-tinte pointer-fine:group-hover:underline group-active:underline';
// Überschrift eines Felds bzw. einer Spalte (H2 im Bestand, eine Stufe unter den Abschnittsköpfen)
const FELD_TITEL = 'font-anzeige text-fs-5 text-tinte';

// Liste an der Fuge: Fugenkreuz als Marke, Text in Textschrift (wie /treppen)
function FugenListe({ eintraege, className }: { eintraege: string[]; className?: string }) {
    return (
        <ul className={clsx('border-t border-fuge', className)}>
            {eintraege.map((item) => (
                <li key={item} className="flex gap-3 border-b border-fuge py-4 font-text text-fs-2 text-tinte">
                    <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                        <Fugenkreuz className="size-3" />
                    </span>
                    <span className="min-w-0">{item}</span>
                </li>
            ))}
        </ul>
    );
}

export default function FliesenreparaturPage() {
    const review = REVIEWS.find((r) => r.id === 'christian-d');

    return (
        <>
            {/* 1. EINSTIEG: Kennzeile, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts das Planblatt „reparatur“ */}
            <section aria-labelledby="reparatur-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={<>Service &middot; Reparaturen &amp; kleinere Arbeiten</>}
                    titel={
                        <span id="reparatur-heading">
                            Fliesenreparatur und kleine Arbeiten:{' '}
                            <span>einzelne Fliesen, Fugen, Sockel</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Nicht jeder Schaden erfordert einen neuen Boden. Eine gesprungene Fliese, eine lose Sockelfliese
                            oder eine bröselnde Fuge lassen sich oft gezielt ausbessern. Als HWK-Fachbetrieb mit bis zu 12 Handwerkern aus{' '}
                            {COMPANY_DATA.headquarters.city} übernehmen wir auch kleinere Arbeiten – sorgfältig ausgeführt,
                            nach vereinbartem Termin.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href={COMPANY_DATA.contact.whatsappLink} extern vorne={<WhatsAppLogo className="size-5 shrink-0" />}>
                                Fotos per WhatsApp senden
                            </Knopf>
                            <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
                                <span className="font-mono font-normal">{COMPANY_DATA.contact.phone}</span>
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Fliesenreparatur', 'reparatur')}>
                            <Verlegeplan plan="reparatur" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. LEISTUNGEN UND ERSTMASSNAHMEN (ein Abschnitt wie im Bestand, zwei H2): links was repariert wird als Liste an
                    der Fuge, rechts der Warnkasten (Gestalt wie kern/Hinweis „warn“) mit den vier Erstmaßnahmen, Nummer in Mono.
                    Zier-Icons der Überschriften entfallen (Flucht an der Inhaltskante); das Hinweiszeichen gehört zum Warnkasten */}
                <Abschnitt aria-label="Leistungen und Erstmaßnahmen" flaeche="fliese" leitachse spaet>
                    <div className="grid gap-y-16 lg:grid-cols-12 lg:gap-x-12">
                        <div className="lg:col-span-6">
                            <h2 className="text-fs-6 text-tinte">Was repariert wird</h2>
                            <FugenListe eintraege={REPAIRS} className="mt-8" />
                        </div>

                        <div className="self-start border border-l-2 border-tinte bg-kalk p-6 lg:col-span-6 lg:p-8">
                            <h2 className={clsx(FELD_TITEL, 'flex items-start gap-3')}>
                                <Icon name="hinweis" groesse={6} className="mt-1" />
                                <span className="min-w-0">Wasser tritt aus? Erst absperren, dann Installateur</span>
                            </h2>
                            <ol className="mt-6 border-t border-fuge">
                                {WATER_STEPS.map((step, idx) => (
                                    <li key={step} className="flex gap-4 border-b border-fuge py-3 font-text text-fs-2 text-tinte">
                                        <span aria-hidden="true" className="w-6 shrink-0 font-mono text-fs-1 leading-6 text-tinte-2">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <span className="min-w-0">{step}</span>
                                    </li>
                                ))}
                            </ol>
                            <p className="mt-6 font-text text-fs-2 text-tinte-2">
                                Leitungsarbeiten gehören nicht zu unserem Handwerk. Sobald die Leitung repariert und der
                                Untergrund trocken ist, erneuern wir Fliesen und Abdichtung – nach vereinbartem Termin.
                            </p>
                        </div>
                    </div>
                </Abschnitt>

                {/* 3. EINZELNE FLIESEN AUSTAUSCHEN: vier Schritte als Schrittfolge (ab lg waagrecht); Nummern bleiben für
                    Screenreader stumm wie im Bestand */}
                <Abschnitt
                    titelId="austausch-heading"
                    leitachse
                    spaet
                    etikett="Einzelne Fliesen austauschen"
                    titel="So bleiben Abdichtung und Nachbarfliesen geschützt"
                >
                    <Schrittfolge
                        ausrichtung="waagrecht"
                        nummerStumm
                        schritte={REPLACE_STEPS.map((step) => ({ titel: step.t, text: step.d }))}
                    />
                </Abschnitt>

                {/* 4. ERSATZFLIESEN: Kopf links mit Einleitung, rechts die drei bewährten Wege als Merkliste (H3 wie im Bestand) */}
                <Abschnitt
                    titelId="ersatz-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    kopf="seitlich"
                    etikett="Ersatzfliesen"
                    titel="Kein Ersatz mehr lieferbar?"
                    einleitung={
                        <p>
                            Fliesen werden in Chargen produziert; selbst dieselbe Serie kann nach Jahren in Farbton und Maß
                            leicht abweichen. Eine exakt passende Ersatzfliese lässt sich deshalb nicht immer beschaffen. Diese
                            Wege haben sich bewährt:
                        </p>
                    }
                >
                    <Merkliste spalten={1} titelAls="h3" eintraege={NO_LONGER_AVAILABLE.map((item) => ({ titel: item.t, text: item.d }))} />
                </Abschnitt>

                {/* 5. GRENZEN DER REPARATUR (ein Abschnitt wie im Bestand, drei H2): links die Grenzen als Liste an der Fuge mit
                    Schluss, rechts zwei Felder an der Fuge mit je einem Verweis (Fugensanierung, Schadensanalyse) */}
                <Abschnitt aria-label="Grenzen der Reparatur" leitachse spaet>
                    <div className="grid gap-y-16 lg:grid-cols-12 lg:gap-x-12">
                        <div className="lg:col-span-7">
                            <h2 className="max-w-mass text-fs-6 text-tinte">Wann eine Reparatur nicht mehr sinnvoll ist</h2>
                            <FugenListe eintraege={NOT_WORTH_IT} className="mt-8" />
                            <p className="mt-6 max-w-mass font-text text-fs-3 text-tinte-2">
                                Dann würde eine Reparatur nur das Symptom beheben. Sinnvoller ist eine Teil- oder
                                Komplettsanierung – wir sagen Ihnen offen, was sich lohnt.
                            </p>
                        </div>

                        <div className="grid gap-px self-start border border-fuge bg-fuge lg:col-span-5">
                            <div className="flex flex-col bg-fliese p-6 lg:p-8">
                                <h2 className={FELD_TITEL}>Fugen und Silikon erneuern</h2>
                                <p className="mt-3 font-text text-fs-2 text-tinte-2">
                                    Sitzen die Fliesen fest und nur die Fugen sind verschlissen, genügt oft eine Fugensanierung.
                                </p>
                                <Knopf href="/fliesen/fugensanierung" variante="text" icon="pfeil-rechts" className="mt-4 self-start">
                                    Zur Fugensanierung
                                </Knopf>
                            </div>
                            <div className="flex flex-col bg-fliese p-6 lg:p-8">
                                <h2 className={FELD_TITEL}>Ursache unklar?</h2>
                                <p className="mt-3 font-text text-fs-2 text-tinte-2">
                                    Wenn Risse wiederkehren oder Feuchtigkeit im Spiel ist, klären wir zuerst die Ursache.
                                </p>
                                <Knopf href="/schadensanalyse" variante="text" icon="pfeil-rechts" className="mt-4 self-start">
                                    Zur Schadensanalyse
                                </Knopf>
                            </div>
                        </div>
                    </div>
                </Abschnitt>

                {/* 6. KUNDENSTIMME: eine Bewertung mit Anriss, Quelle in Mono (wie /treppen/innentreppe); Zitat im Lesemaß */}
                {review && (
                    <Abschnitt aria-label="Kundenstimme" flaeche="fliese" breite="mass" leitachse spaet>
                        <figure className="border-l-2 border-laser-tief pl-6 sm:pl-8">
                            {/* role="img": ohne Rolle ist aria-label an einem span unzulässig und wird nicht vorgelesen (axe aria-prohibited-attr) */}
                            <span role="img" className="flex items-center gap-1 text-tinte" aria-label={`${review.rating} von 5 Sternen`}>
                                {Array.from({ length: review.rating }, (_, i) => (
                                    <Icon key={i} name="stern-voll" groesse={4} />
                                ))}
                            </span>
                            <blockquote className="mt-4 max-w-mass font-text text-fs-4 text-tinte">„{review.text}“</blockquote>
                            <figcaption className="mt-4 font-text text-fs-2 text-tinte">
                                <span className="font-semibold">{review.author}</span>
                                <span className="font-mono text-fs-1 text-tinte-2"> &middot; {review.source}-Rezension &middot; {review.topic}</span>
                            </figcaption>
                        </figure>
                    </Abschnitt>
                )}

                {/* 7. REPARATUR ANFRAGEN: Kopf links mit Einleitung, rechts die Fotoliste in zwei Spalten an der Fuge, die
                    Erreichbarkeit (aus COMPANY_DATA) und zwei Wege; der Hauptknopf ist WhatsApp wie im Bestand */}
                <Abschnitt
                    titelId="anfragen-heading"
                    leitachse
                    spaet
                    kopf="seitlich"
                    etikett="Reparatur anfragen"
                    titel="Fotos per WhatsApp senden"
                    einleitung={<p>Mit ein paar Fotos können wir den Aufwand besser einschätzen. Hilfreich sind:</p>}
                >
                    <ul className="grid border-t border-fuge sm:grid-cols-2 sm:gap-x-8">
                        {PHOTO_TIPS.map((item) => (
                            <li key={item} className="flex gap-3 border-b border-fuge py-4 font-text text-fs-2 text-tinte">
                                <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                                    <Fugenkreuz className="size-3" />
                                </span>
                                <span className="min-w-0">{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-8 flex max-w-mass items-start gap-3 font-text text-fs-2 text-tinte-2">
                        <Icon name="uhr" groesse={5} className="mt-px text-tinte" />
                        <span>
                            Erreichbar {COMPANY_DATA.hours.formattedWeekdays} und {COMPANY_DATA.hours.formattedSaturday}.
                            Den Termin stimmen wir persönlich mit Ihnen ab.
                        </span>
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Knopf href={COMPANY_DATA.contact.whatsappLink} extern vorne={<WhatsAppLogo className="size-5 shrink-0" />}>
                            WhatsApp: <span className="font-mono font-normal">{COMPANY_DATA.contact.whatsapp}</span>
                        </Knopf>
                        <Knopf href="/kontakt" variante="neben">
                            Kontaktformular
                        </Knopf>
                    </div>
                </Abschnitt>

                {/* 8. WEITERFÜHRENDE RATGEBER: Register, je Zeile Titel, Beschreibung und Pfeil; die ganze Zeile ist der Link */}
                <Abschnitt
                    titelId="reparatur-ratgeber-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    titel="Weiterführende Ratgeber zur Fliesenreparatur"
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
                </Abschnitt>
            </Leitachse>

            {/* 9. QUALITÄTSVERSPRECHEN (geteilter Baustein); einen Abschluss hat die Seite im Bestand nicht */}
            <QualityPromise />
        </>
    );
}
