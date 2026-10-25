// Fliesen im Neubau (E4-BAU-09, KERN v2): Erzählansicht nach dem Muster der Familie Fliesen (fliesen/page.jsx). Einstieg mit
// Laserachse, H1 links bündig, Vorspann, zwei Knöpfe; rechts das Planblatt mit dem Plan „untergrund“. Danach die Leitachse über
// die Abschnitte: Bauablauf als Schrittfolge, Schnittstellen auf Fliese, Bausteine als Merkliste, Belegreife und weitere Punkte
// als Feldraster, Weiterführende Ratgeber als Register. Qualitätsversprechen, dann Konfigurator mit Rückfrage (Tempo: nachgeladen).
// Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand.
import Link from 'next/link';
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import clsx from 'clsx';
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
import Schrittfolge from '@/components/kern/Schrittfolge';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { linkKlassen } from '@/components/kern/stile';

// Konfigurator nachladen (Tempo, wie auf der Startseite und in der Familie)
const FliesenKonfigurator = dynamic(() => import('@/components/funnels/FliesenKonfigurator'), {
    loading: () => <FormularPlatzhalter />,
});

export const metadata = createMetadata({
    title: 'Fliesen im Neubau verlegen lassen | Fliesen Tezgel',
    description:
        'Fliesenleger für Neubau-Projekte in Wetzlar & Aßlar: Termintreue, Belegreifeprüfung, Bemusterung & Schnittstellenkoordination. Jetzt Angebot anfragen!',
    path: '/fliesen/neubau'
});

const SEQUENCE = [
    { phase: 'Rohbau & Fenster', desc: 'Gebäudehülle geschlossen, Fenster eingebaut – Voraussetzung für einen geschützten Innenausbau.' },
    { phase: 'Rohinstallation', desc: 'Leitungen, Vorwandelemente und Bodenabläufe liegen in der richtigen Lage und Höhe.' },
    { phase: 'Innenputz & Estrich', desc: 'Wände verputzt bzw. beplankt, Estrich eingebaut und in der Trocknungsphase.' },
    { phase: 'Fliesenarbeiten', desc: 'Nach Freigabe der Belegreife: Abdichtung in Nassräumen, Wand- und Bodenfliesen, Sockel, Fugen.' },
    { phase: 'Fertigmontage', desc: 'Danach folgen Sanitärobjekte, Armaturen und die übrigen Ausbaugewerke.' }
];

const BUILDING_BLOCKS = [
    {
        title: 'Aufmaß & Planprüfung',
        desc: 'Wir prüfen Pläne und Rohbaumaße, messen vor Ort auf und klären Fliesenflächen, Formate und Aufbauhöhen frühzeitig.'
    },
    {
        title: 'Schnittstellen klären',
        desc: 'Höhen von Estrich und Bodenabläufen, Einbautiefen von Unterputzkörpern, Randdämmstreifen und Estrichfugen – was andere Gewerke vorbereiten, stimmen wir vorab ab.'
    },
    {
        title: 'Belegreife prüfen',
        desc: 'Vor dem ersten Kleberauftrag messen wir die Restfeuchte des Estrichs mit dem CM-Verfahren. Erst wenn der Estrich belegreif ist, wird gefliest.'
    },
    {
        title: 'Bemusterung & Bestellung',
        desc: 'Formate, Farben, Fugenfarbe und Details werden rechtzeitig festgelegt, damit das Material zum Termin auf der Baustelle ist.'
    },
    {
        title: 'Bauzeitenplan & Festpreis',
        desc: 'Verbindlicher Festpreis nach Aufmaß und feste Zusagen für Start und Fertigstellung unserer Arbeiten – abgestimmt auf Ihren Bauablauf.'
    },
    {
        title: 'Abnahme & Übergabe',
        desc: 'Gemeinsame Abnahme mit Deniz Tezgel, Übergabe von Pflegehinweisen, Materialangaben und Restfliesen.'
    }
];

const PRECONDITIONS = [
    'Estrich eingebaut, Randdämmstreifen noch vorhanden, Estrichfugen dokumentiert',
    'Wände verputzt oder beplankt, lot- und fluchtgerecht',
    'Rohinstallation abgeschlossen und geprüft, Vorwandelemente montiert',
    'Bodenabläufe und Duschrinnen in der geplanten Höhe gesetzt',
    'Fenster eingebaut, Innenräume vor Witterung geschützt',
    'Höhenbezugspunkt (Meterriss) im Gebäude angezeichnet'
];

const CROSS_LINKS = [
    { href: '/leistungen/wohnen', label: 'Fliesen im Wohnbereich', desc: 'Wohnen, Küche und Flur' },
    { href: '/leistungen/untergrund', label: 'Untergrundvorbereitung', desc: 'Estrich, Ausgleich und Abdichtung' },
    { href: '/untergrund-abdichtung/estrich-belegreife', label: 'Estrich & Belegreife', desc: 'Restfeuchte prüfen vor dem Fliesen' },
    { href: '/beratung', label: 'Beratung', desc: 'Neubauprojekt frühzeitig besprechen' }
];

// Register-Zeile (wie in der Familie): Name links, Beschreibung daneben, Pfeil am Rand; Trefferfläche 48 px
const ZEILE = 'group flex min-h-12 items-center gap-4 px-3 py-4 pointer-fine:hover:bg-fliese active:bg-fliese';
const NAME = 'font-text text-fs-3 font-semibold text-tinte md:w-1/3 md:shrink-0 decoration-1 underline-offset-4 decoration-tinte pointer-fine:group-hover:underline group-active:underline';

const TEXT = 'mt-3 font-text text-fs-3 text-tinte-2';

// Ein Feld des Feldrasters: Überschrift und Text in einem Artikel, benannt über die Überschrift
function Karte({ id, ebene: Ebene = 'h3', titel, children }) {
    return (
        <Feld>
            <article aria-labelledby={id} className="flex flex-1 flex-col">
                <Ebene id={id} className="font-anzeige text-fs-4 text-tinte">
                    {titel}
                </Ebene>
                {children}
            </article>
        </Feld>
    );
}

export default function NeubauPage() {
    return (
        <>
            <SeitenDaten
                pfad="/fliesen/neubau"
                titel="Fliesen im Neubau verlegen lassen | Fliesen Tezgel"
                beschreibung="Fliesenleger für Neubau-Projekte in Wetzlar & Aßlar: Termintreue, Belegreifeprüfung, Bemusterung & Schnittstellenkoordination. Jetzt Angebot anfragen!"
                brotkrumen={[
                    { name: 'Start', href: '/' },
                    { name: 'Fliesen und Verlegung', href: '/fliesen' },
                    { name: 'Fliesen im Neubau verlegen lassen mit Fliesen Tezgel' },
                ]}
            />
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts das Planblatt mit dem Plan „untergrund“ */}
            <Einstieg
                art="erzaehl"
                etikett={<>Neubau &middot; Bauherren</>}
                titel={
                    <span id="neubau-heading">
                        Fliesen im Neubau verlegen lassen mit{' '}
                        <span>Fliesen Tezgel</span>
                    </span>
                }
                vorspann={
                    <p>
                        Fliesen im Neubau verlegen lassen: Fachbetrieb Fliesen Tezgel begleitet Bauherren in Wetzlar &amp; Aßlar mit
                        Belegreifeprüfung, Bemusterung und terminierter Ausführung im Bauzeitenplan.
                    </p>
                }
                aktionen={
                    <>
                        <Knopf href="/kontakt" icon="pfeil-rechts">
                            Neubauprojekt anfragen
                        </Knopf>
                        <Knopf href="/termin" variante="neben">
                            Online-Termin buchen
                        </Knopf>
                    </>
                }
                rand={
                    <Planblatt felder={planfelder('Fliesen im Neubau verlegen lassen', 'untergrund')}>
                        <Verlegeplan plan="untergrund" ohneAchse bemassung={false} interaktiv />
                    </Planblatt>
                }
            />

            <Leitachse>
                {/* 2. BAUABLAUF: die fünf Phasen als Schrittfolge, Nummern stumm (wie im Bestand) */}
                <Abschnitt
                    titelId="bauablauf-heading"
                    leitachse
                    spaet
                    etikett="Bauablauf"
                    titel="Wann der Fliesenleger im Bauablauf an der Reihe ist"
                    einleitung={<p>Die genaue Reihenfolge legt Ihre Bauleitung fest. Typisch für ein Wohnhaus ist dieser Ablauf:</p>}
                >
                    <Schrittfolge nummerStumm schritte={SEQUENCE.map((s) => ({ titel: s.phase, text: s.desc }))} />
                </Abschnitt>

                {/* 3. SCHNITTSTELLEN: Kopf links, Text und Fugenkreuz-Liste der Vorleistungen rechts, auf Fliese */}
                <Abschnitt
                    titelId="vorleistungen-heading"
                    leitachse
                    spaet
                    kopf="seitlich"
                    flaeche="fliese"
                    etikett="Schnittstellen"
                    titel="Vorleistungen anderer Gewerke: Estrich, Putz, Installation, Fenster"
                    einleitung={
                        <>
                            <p>
                                Estrich, Putz, Installation und Fenster liefern andere Gewerke. Wir übernehmen die Fliesenarbeiten und
                                koordinieren unsere Termine mit Bauleitung und beteiligten Firmen. Vor Arbeitsbeginn prüfen wir, ob der
                                Untergrund für die Verlegung geeignet ist, und melden Bedenken rechtzeitig.
                            </p>
                            <p className="mt-4">
                                Wichtig: Der Randdämmstreifen des Estrichs bleibt bis nach dem Verfugen stehen und wird erst dann bündig
                                abgeschnitten – so bleibt die Randfuge zwischen Belag und Wand erhalten.
                            </p>
                        </>
                    }
                >
                    <h3 className="font-anzeige text-fs-4 text-tinte">Was vor Beginn der Fliesenarbeiten erledigt sein sollte</h3>
                    <ul className="mt-6 grid gap-3">
                        {PRECONDITIONS.map((item) => (
                            <li key={item} className="flex gap-3 font-text text-fs-2 text-tinte">
                                <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                                    <Fugenkreuz className="size-3" />
                                </span>
                                <span className="min-w-0">{item}</span>
                            </li>
                        ))}
                    </ul>
                </Abschnitt>

                {/* 4. BAUSTEINE: sechs Einträge als Merkliste (zwei Spalten, drei Zeilen) */}
                <Abschnitt titelId="bausteine-heading" leitachse spaet etikett="Unsere Leistung" titel="Sechs Bausteine für Fliesen im Neubau">
                    <Merkliste titelAls="h3" spalten={2} eintraege={BUILDING_BLOCKS.map((b) => ({ titel: b.title, text: b.desc }))} />
                </Abschnitt>

                {/* 5. BELEGREIFE, BEMUSTERUNG, FESTPREIS, ABNAHME: vier Felder im Feldraster (2 Spalten, 2 Zeilen) */}
                <Abschnitt leitachse spaet>
                    <Feldraster spalten={2}>
                        <Karte id="belegreife-heading" ebene="h2" titel="Belegreife-Freigabe vor dem Verlegen im Kurzüberblick">
                            <p className={TEXT}>
                                Frischer Estrich gibt über Wochen Feuchtigkeit ab. Wird zu früh gefliest, drohen Risse, Hohlstellen und
                                Verfärbungen. Deshalb messen wir vor Beginn die Restfeuchte mit dem CM-Verfahren. Die maßgeblichen Richtwerte
                                hängen von Estrichart und Aufbau ab und richten sich nach den einschlägigen Merkblättern und Herstellerangaben.
                                Bei temperierten Estrichen gehört das entsprechende Protokoll dazu.
                            </p>
                            <div className="mt-auto pt-6">
                                <Knopf href="/untergrund-abdichtung/estrich-belegreife" variante="text" icon="pfeil-rechts">
                                    Estrich &amp; Belegreife im Detail
                                </Knopf>
                            </div>
                        </Karte>
                        <Karte id="bemusterung-heading" ebene="h2" titel="Bemusterung und Materialbestellung rechtzeitig planen">
                            <p className={TEXT}>
                                Lieferzeiten für Fliesen – besonders für Großformate und besondere Oberflächen – sind sehr unterschiedlich.
                                Legen Sie Formate, Farben und Fugenfarbe deshalb fest, bevor der Estrich eingebaut wird. Die gesamte Menge
                                sollte aus einer Charge stammen, inklusive Reserve für Verschnitt und spätere Reparaturen.
                            </p>
                            <div className="mt-auto pt-6">
                                <Knopf href="/fliesen/fliesenarten" variante="text" icon="pfeil-rechts">
                                    Fliesenarten im Vergleich
                                </Knopf>
                            </div>
                        </Karte>
                        <Karte id="festpreis-heading" ebene="h2" titel="Festpreis und verbindlicher Bauzeitenplan">
                            <p className={TEXT}>
                                Nach dem Aufmaß erhalten Sie ein Festpreisangebot für den beschriebenen Leistungsumfang. Start und
                                Fertigstellung unserer Arbeiten sagen wir verbindlich zu und stimmen sie mit Ihrem Bauzeitenplan ab.
                                Verschieben sich Vorleistungen, passen wir den Termin gemeinsam mit Ihnen an.
                            </p>
                            <div className="mt-auto pt-6">
                                <Knopf href="/fliesen/festpreisangebot" variante="text" icon="pfeil-rechts">
                                    So entsteht das Festpreisangebot
                                </Knopf>
                            </div>
                        </Karte>
                        <Karte id="uebergabe-heading" ebene="h2" titel="Abnahme und Übergabe">
                            <p className={TEXT}>
                                Zum Abschluss gehen Sie mit {COMPANY_DATA.owner.fullName} gemeinsam über alle Flächen. Sie erhalten
                                Pflegehinweise, Angaben zu den verwendeten Materialien und Restfliesen für spätere Reparaturen. Worauf Sie bei
                                der Abnahme achten können, haben wir in einer Checkliste zusammengefasst.
                            </p>
                            <div className="mt-auto pt-6">
                                <Knopf href="/fliesen/abnahme" variante="text" icon="pfeil-rechts">
                                    Checkliste zur Abnahme
                                </Knopf>
                            </div>
                        </Karte>
                    </Feldraster>
                </Abschnitt>

                {/* 6. WEITERFÜHRENDE RATGEBER: vier Verweise als Register (Name, Beschreibung, Pfeil), darunter der direkte Weg */}
                <Abschnitt titelId="ratgeber-heading" leitachse spaet titel="Weiterführende Ratgeber für Fliesen im Neubau">
                    <ul className="border-t border-tinte">
                        {CROSS_LINKS.map((link) => (
                            <li key={link.href} className="border-b border-fuge">
                                <Link href={link.href} className={ZEILE}>
                                    <span className="flex min-w-0 flex-1 flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
                                        <span className={NAME}>{link.label}</span>
                                        <span className="font-text text-fs-2 text-tinte-2">{link.desc}</span>
                                    </span>
                                    <span aria-hidden="true" className="flex shrink-0 text-strich">
                                        <Icon name="pfeil-rechts" groesse={5} />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-8 max-w-mass font-text text-fs-3 text-tinte-2">
                        Direkt sprechen:{' '}
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className={clsx(linkKlassen, 'inline-flex items-center gap-1 whitespace-nowrap font-mono')}>
                            <Icon name="telefon" groesse={4} />
                            {COMPANY_DATA.contact.phone}
                        </a>
                    </p>
                </Abschnitt>
            </Leitachse>

            <QualityPromise />

            {/* 7. KONFIGURATOR: Funnel (nachgeladen) im Raster mit 8 Spalten, rechts die Rückfrage in 4 Spalten (ab lg) */}
            <Leitachse>
                <Abschnitt aria-label="Fliesen-Konfigurator" leitachse spaet>
                    <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
                        <div className="min-w-0 lg:col-span-8">
                            <FliesenKonfigurator />
                        </div>
                        <div className="lg:col-span-4">
                            <Rueckfrage />
                        </div>
                    </div>
                </Abschnitt>
            </Leitachse>
        </>
    );
}
