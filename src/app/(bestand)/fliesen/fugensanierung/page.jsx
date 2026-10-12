// Fugensanierung (E4-BAU-07, KERN v2): Erzählansicht nach dem Muster der Familienreferenz (/fliesen, /leistungen/[id]).
// Einstieg mit Laserachse, H1 links, Vorspann und zwei Knöpfe; rechts das Planblatt „fugen“ mit dem Fugenbild (interaktiv).
// Danach die Leitachse über die Abschnitte: Grundlagen als Text, Warnzeichen als Feldraster, Arbeitsschritte als
// Schrittfolge, Zementfugen und Material als Feldpaar, Abdichtungsproblem als Hinweis, Kundenstimme, Ratgeber als
// Merkliste. Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand. Kein großer Moment, kein Auftritt.
// Metadaten unverändert.
import Link from 'next/link';
import { COMPANY_DATA } from '@/config/company';
import { REVIEWS } from '@/config/reviews';
import { createMetadata } from '@/lib/metadata';
import Icon from '@/components/icons/Icon';
import QualityPromise from '@/components/sections/QualityPromise';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Leitachse from '@/components/kern/Leitachse';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Knopf from '@/components/kern/Knopf';
import Merkliste from '@/components/kern/Merkliste';
import Schrittfolge from '@/components/kern/Schrittfolge';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { linkKlassen } from '@/components/kern/stile';

export const metadata = createMetadata({
    title: 'Fugensanierung & Silikonfugen erneuern | Tezgel',
    description:
        'Fugensanierung in Wetzlar & Aßlar: Schimmelige Silikonfugen & bröselnde Zementfugen fachgerecht austauschen und dauerhaft abdichten. Jetzt anfragen!',
    path: '/fliesen/fugensanierung'
});

const WARNING_SIGNS = [
    { title: 'Schwarze Punkte im Silikon', desc: 'Schimmel sitzt im elastischen Dichtstoff selbst und lässt sich durch Reinigen meist nicht dauerhaft entfernen.' },
    { title: 'Risse und Flankenabriss', desc: 'Löst sich das Silikon von Fliese oder Wanne, kann Wasser dahinter laufen.' },
    { title: 'Bröselnde Zementfugen', desc: 'Ausgewaschene oder sandende Fugen bieten Schmutz und Feuchtigkeit Angriffsfläche.' },
    { title: 'Dauerhaft dunkle Fugen', desc: 'Bleiben Fugen auch nach dem Trocknen dunkel, kann Feuchtigkeit von hinten kommen – ein Fall für die Ursachenklärung.' }
];

const WORK_STEPS = [
    {
        title: 'Altes Silikon vollständig entfernen',
        desc: 'Der alte Dichtstoff wird mechanisch herausgeschnitten, ohne Glasur, Wanne oder die darunterliegende Abdichtung zu beschädigen. Auch Silikonfilme an den Flanken müssen restlos weg – neues Silikon haftet nicht auf altem.'
    },
    {
        title: 'Reinigen und trocknen',
        desc: 'Die Fugenflanken werden gereinigt und entfettet. Die Fuge muss vor dem Neuverfugen trocken sein, sonst haftet der Dichtstoff schlecht.'
    },
    {
        title: 'Vorbehandeln und hinterfüllen',
        desc: 'Je nach Untergrund wird ein Primer aufgetragen. Tiefe Fugen erhalten ein Hinterfüllmaterial, damit das Silikon nur an den beiden Flanken haftet und nicht am Fugengrund – die sogenannte Dreiflankenhaftung würde die Fuge schneller reißen lassen.'
    },
    {
        title: 'Einbringen und glätten',
        desc: 'Sanitärsilikon wird blasenfrei eingebracht und glatt abgezogen. Bis zur Benutzung von Dusche oder Wanne muss es gemäß Herstellerangabe aushärten.'
    },
    {
        title: 'Weitere kleine Reparaturen',
        desc: 'Lose Sockelfliesen, eine gesprungene Fliese oder beschädigte Kanten? Kleinere Arbeiten erledigen wir beim selben Termin nach Absprache mit.'
    }
];

const CROSS_LINKS = [
    { href: '/bad/badsanierung', label: 'Badsanierung', desc: 'Wenn eine Sanierung nicht mehr reicht' },
    { href: '/leistungen/untergrund', label: 'Untergrund & Abdichtung', desc: 'Die Basis unter jeder Fuge' },
    { href: '/blog/schimmel-fliesenfugen-vermeiden', label: 'Schimmel in Fugen vermeiden', desc: 'Feuchte, Pflege und Materialwahl' },
    { href: '/faq', label: 'Häufige Fragen', desc: 'Antworten rund um Fliesenarbeiten' }
];

export default function FugensanierungPage() {
    const review = REVIEWS.find((r) => r.id === 'christian-d');

    return (
        <>
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts das Planblatt „fugen“ ohne Achse */}
            <section aria-labelledby="fugen-heading">
                <Einstieg
                    art="erzaehl"
                    etikett="Service & Reparatur"
                    titel={
                        <span id="fugen-heading">
                            Fugensanierung:{' '}
                            <span>Silikon- und Zementfugen fachgerecht erneuern</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Verfärbte, rissige oder abgelöste Fugen lassen ein gepflegtes Bad schnell alt aussehen – und können Feuchtigkeit hinter den Belag lassen. Oft reicht es, die Fugen zu erneuern, statt neu zu fliesen. Wir prüfen, was nötig ist, und arbeiten so, dass Abdichtung und Nachbarfliesen geschützt bleiben.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Fugensanierung anfragen
                            </Knopf>
                            <Knopf
                                href={COMPANY_DATA.contact.whatsappLink}
                                extern
                                variante="neben"
                                vorne={<WhatsAppLogo className="size-5 shrink-0" />}
                            >
                                Fotos per WhatsApp senden
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Fugensanierung & Silikonfugen erneuern', 'fugen')}>
                            <Verlegeplan plan="fugen" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. GRUNDLAGEN: Kopf links, Text rechts (Wartungsfuge nach DIN 52460) */}
                <Abschnitt
                    titelId="wartungsfuge-heading"
                    leitachse
                    spaet
                    kopf="seitlich"
                    etikett="Grundlagen"
                    titel="Wartungsfuge: warum Silikon regelmäßig erneuert werden muss"
                >
                    <div className="max-w-mass space-y-4 font-text text-fs-3 text-tinte">
                        <p>
                            Elastische Fugen – etwa an Wanne, Duschtasse, in Raumecken und an Übergängen – nehmen Bewegungen
                            zwischen Bauteilen auf. Sie sind starker Beanspruchung durch Wasser, Reinigungsmittel und
                            Temperaturwechsel ausgesetzt. Fachlich gelten sie deshalb als Wartungsfugen (Begriff nach DIN 52460):
                            Sie müssen in regelmäßigen Abständen geprüft und bei Bedarf erneuert werden.
                        </p>
                        <p>
                            Dass Silikon mit der Zeit altert, verfärbt oder reißt, ist Verschleiß und in der Regel kein
                            Ausführungsfehler. Wie oft ein Austausch nötig ist, hängt von Nutzung, Feuchtebelastung und Pflege ab – einen
                            festen Zeitplan gibt es nicht. Eine Rechtsberatung zu Gewährleistungsfragen ersetzt diese Seite nicht.
                        </p>
                    </div>
                </Abschnitt>

                {/* 3. WARNZEICHEN: vier Felder im Raster, darunter der Verweis auf die Dusche */}
                <Abschnitt
                    titelId="warnzeichen-heading"
                    leitachse
                    spaet
                    etikett="Warnzeichen"
                    titel="Warnzeichen: Schimmel, Risse, Flankenabriss, dunkle Zementfugen"
                >
                    <Feldraster spalten={4}>
                        {WARNING_SIGNS.map((item) => (
                            <Feld key={item.title}>
                                <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{item.desc}</p>
                            </Feld>
                        ))}
                    </Feldraster>
                    <p className="mt-8 max-w-mass font-text text-fs-3 text-tinte-2">
                        Ausführlich zu Feuchtigkeitsanzeichen in der Dusche:{' '}
                        <Link href="/blog/undichte-dusche-warnzeichen" className={linkKlassen}>
                            Undichte Dusche – die Warnzeichen
                        </Link>
                    </p>
                </Abschnitt>

                {/* 4. ARBEITSSCHRITTE: fünf Schritte als Schrittfolge am Lot; Nummern bleiben für Screenreader stumm wie im Bestand */}
                <Abschnitt
                    titelId="silikon-heading"
                    leitachse
                    spaet
                    flaeche="fliese"
                    etikett="Arbeitsschritte"
                    titel="Silikonfugen tauschen: entfernen, reinigen, vorbehandeln, hinterfüllen, glätten"
                >
                    <Schrittfolge
                        nummerStumm
                        schritte={WORK_STEPS.map((item, idx) => ({
                            titel: item.title,
                            text:
                                idx === WORK_STEPS.length - 1 ? (
                                    <>
                                        {item.desc}
                                        <span className="mt-3 block">
                                            <Knopf href="/fliesenreparatur" variante="text" icon="pfeil-rechts">
                                                Fliesenreparatur
                                            </Knopf>
                                        </span>
                                    </>
                                ) : (
                                    item.desc
                                )
                        }))}
                    />
                </Abschnitt>

                {/* 5. ZEMENTFUGEN UND MATERIAL: zwei Felder nebeneinander, je Überschrift, Text; der zweite mit einem Link */}
                <Abschnitt leitachse spaet>
                    <Feldraster spalten={2} als="div">
                        <article aria-labelledby="zement-heading" className="flex flex-col bg-fliese p-6 lg:p-8">
                            <h2 id="zement-heading" className="font-anzeige text-fs-5 text-tinte">Zementfugen auskratzen und neu verfugen</h2>
                            <div className="mt-4 max-w-mass space-y-3 font-text text-fs-2 text-tinte">
                                <p>
                                    Mürbe oder stark verfärbte Zementfugen werden mit geeignetem Werkzeug gleichmäßig tief
                                    ausgeräumt. Dabei dürfen weder Fliesenkanten noch – im Nassbereich – die Verbundabdichtung unter
                                    dem Belag verletzt werden.
                                </p>
                                <p>
                                    Anschließend wird die Fuge entstaubt, vorgenässt und mit neuem Fugenmörtel vollständig gefüllt.
                                    Nach dem Abwaschen und Aushärten werden die elastischen Anschlussfugen erneuert. Ein
                                    Farbton, der exakt dem alten Bestand entspricht, lässt sich nicht immer treffen – deshalb
                                    erneuern wir zusammenhängende Flächen meist vollständig.
                                </p>
                            </div>
                        </article>
                        <article aria-labelledby="material-heading" className="flex flex-col bg-fliese p-6 lg:p-8">
                            <h2 id="material-heading" className="font-anzeige text-fs-5 text-tinte">Fugenmaterial bei der Erneuerung: zementär oder Reaktionsharz</h2>
                            <div className="mt-4 max-w-mass space-y-3 font-text text-fs-2 text-tinte">
                                <p>
                                    Für die meisten Bäder und Wohnräume ist ein zementärer Fugenmörtel der Klasse CG2 WA nach
                                    DIN EN 13888 die passende Wahl: wasserabweisend und abriebfest.
                                </p>
                                <p>
                                    Reaktionsharz-Fugenmörtel (RG) ist nahezu dicht und sehr beständig gegen Reinigungsmittel und
                                    Säuren, verlangt aber sorgfältige Verarbeitung. Welche Variante zu Ihrer Fläche passt, besprechen
                                    wir vor Ort.
                                </p>
                            </div>
                            <Knopf href="/fliesen/verlegetechnik" variante="text" icon="pfeil-rechts" className="mt-6 self-start">
                                Fugenmörtel im Vergleich
                            </Knopf>
                        </article>
                    </Feldraster>
                </Abschnitt>

                {/* 6. ABDICHTUNGSPROBLEM: Überschrift im Abschnitt, darunter ein Hinweis mit Text und Verweis */}
                <Abschnitt titelId="abdichtung-heading" leitachse spaet titel="Wenn hinter der Fuge ein Abdichtungsproblem steckt">
                    <div className="flex items-start gap-4 border border-l-2 border-tinte bg-fliese p-6 lg:p-8">
                        <Icon name="hinweis" groesse={6} className="mt-1 text-tinte" />
                        <div className="min-w-0 max-w-mass">
                            <div className="space-y-4 font-text text-fs-3 text-tinte">
                                <p>
                                    Neue Fugen lösen kein Problem, das tiefer liegt. Hohl klingende oder lose Fliesen, Feuchtigkeit in
                                    angrenzenden Wänden, Wasserflecken an der Decke darunter oder Fugen, die kurz nach der Erneuerung
                                    wieder dunkel werden, deuten auf eine Ursache hinter dem Belag hin. Dann muss zuerst geklärt werden,
                                    woher das Wasser kommt.
                                </p>
                                <p>
                                    Großflächiger Schimmelbefall an Wänden oder in der Bausubstanz gehört in die Hände eines
                                    spezialisierten Fachbetriebs.
                                </p>
                            </div>
                            <Knopf href="/schadensanalyse" variante="text" iconLinks="suche" icon="pfeil-rechts" className="mt-6">
                                Ursachen vor Ort klären: Schadensanalyse
                            </Knopf>
                        </div>
                    </div>
                </Abschnitt>

                {/* 7. KUNDENSTIMME: eine Bewertung mit Sternen, Zitat und Quelle in Mono */}
                {review && (
                    <Abschnitt aria-label="Kundenstimme" flaeche="fliese" spaet>
                        <figure className="max-w-mass">
                            <span className="flex items-center gap-1 text-tinte" aria-label={`${review.rating} von 5 Sternen`}>
                                {Array.from({ length: review.rating }, (_, i) => (
                                    <Icon key={i} name="stern-voll" groesse={5} />
                                ))}
                            </span>
                            <blockquote className="mt-6 font-anzeige text-fs-4 text-tinte">„{review.text}“</blockquote>
                            <figcaption className="mt-6 font-text text-fs-2">
                                <span className="font-semibold text-tinte">{review.author}</span>
                                <span className="font-mono text-fs-1 text-tinte-2"> &middot; {review.source}-Rezension &middot; {review.topic}</span>
                            </figcaption>
                        </figure>
                    </Abschnitt>
                )}

                {/* 8. WEITERFÜHRENDE RATGEBER: vier Verweise als Merkliste, darunter Fotos per WhatsApp und Telefon */}
                <Abschnitt titelId="ratgeber-heading" leitachse spaet titel="Weiterführende Ratgeber zur Fugensanierung & Fliesenpflege">
                    <Merkliste
                        spalten={2}
                        eintraege={CROSS_LINKS.map((link) => ({
                            titel: (
                                <Link href={link.href} className={linkKlassen}>
                                    {link.label}
                                </Link>
                            ),
                            text: link.desc
                        }))}
                    />
                    <p className="mt-8 max-w-mass font-text text-fs-3 text-tinte-2">
                        Für eine erste Einschätzung helfen ein paar Fotos per{' '}
                        <a href={COMPANY_DATA.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className={linkKlassen}>
                            WhatsApp
                        </a>{' '}
                        oder telefonisch unter{' '}
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className={linkKlassen + ' inline-flex items-center gap-1 whitespace-nowrap font-mono'}>
                            <Icon name="telefon" groesse={4} />
                            {COMPANY_DATA.contact.phone}
                        </a>
                        .
                    </p>
                </Abschnitt>
            </Leitachse>

            {/* 9. ABSCHLUSS: Merkliste des Qualitätsversprechens */}
            <QualityPromise />
        </>
    );
}
