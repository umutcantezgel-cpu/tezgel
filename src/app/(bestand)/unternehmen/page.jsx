// Unternehmen (S-20 nach E5-BAU-04 sinngemäß, KERN v2): Erzählansicht nach dem Vorbild von /ueber-uns. Einstieg mit
// Laserachse, Kennzeile, H1 links und Vorspann; rechts das Planblatt „Unternehmen & Qualitätsversprechen“ mit dem Plan
// „wohnen“ (interaktiv, die rote Achse trägt das Blatt). Danach die Leitachse über die Abschnitte, Flächen im Wechsel:
// 2. Unternehmensgeschichte als ruhige Zeitleiste an der Fuge (Kalk, ohne das scroll-gebundene Fugenband von /ueber-uns) ·
// 3. Inhaber als Text an der Fuge: Motto mit Quelle in Mono, daneben die vier Zusagen als Liste an der Fuge und der
// Knopf (Fliese) · Qualitätsversprechen und Abschluss (geteilte Bausteine). Kein Auftritt, kein großer Moment.
// Wortlaut, Überschriften, Links und Lesefolge wie im Bestand; Metadaten und Daten unverändert. Serverkomponente.
import { COMPANY_DATA, historyTimeline } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import Icon from '@/components/icons/Icon';
import QualityPromise from '@/components/sections/QualityPromise';
import { FinalCTA } from '@/components/ui/FinalCTA';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import Leitachse from '@/components/kern/Leitachse';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Verlegeplan from '@/components/kern/Verlegeplan';
import SeitenDaten from '@/components/seo/SeitenDaten';

const TITEL = 'Unternehmen & Qualitätsversprechen | Tezgel Fachbetrieb';
const BESCHREIBUNG = 'Fliesenverlegung Tezgel aus Aßlar: Fachbetrieb der HWK seit 2008. Firmengeschichte, Inhaber Deniz Tezgel & unser Qualitätsversprechen für Hessen.';

export const metadata = createMetadata({
    title: TITEL,
    description: BESCHREIBUNG,
    path: '/unternehmen'
});

export default function UnternehmenPage() {
    const { legalName, owner, business, authority, headquarters, motto } = COMPANY_DATA;

    return (
        <>
            <SeitenDaten
                pfad="/unternehmen"
                titel={TITEL}
                beschreibung={BESCHREIBUNG}
                brotkrumen={[{ name: 'Start', href: '/' }, { name: `${legalName}: Unternehmen & Qualität` }]}
            />
            {/* 1. EINSTIEG: Kennzeile, H1 an der Laserachse, Vorspann; rechts das Planblatt „wohnen“ */}
            <Einstieg
                art="erzaehl"
                etikett={
                    <>
                        <Fugenkreuz className="size-3 shrink-0 text-strich" />
                        Gegründet {business.establishmentYear} &middot; {authority.shortName}
                    </>
                }
                titel={
                    <>
                        {legalName}:{' '}
                        <span>Unternehmen &amp; Qualität</span>
                    </>
                }
                vorspann={
                    <p>
                        Verlässlichkeit, handwerkliche Perfektion und saubere Baustellen: Seit {business.establishmentYear} steht unser Fachbetrieb aus {headquarters.city} mit einem Team von bis zu 12 Handwerkern für Fliesen-, Platten- und Mosaikarbeiten in Wetzlar, Gießen und ganz Mittelhessen.
                    </p>
                }
                rand={
                    <Planblatt felder={planfelder('Unternehmen & Qualitäts­versprechen', 'wohnen')}>
                        <Verlegeplan plan="wohnen" ohneAchse bemassung={false} interaktiv />
                    </Planblatt>
                }
            />

            {/* LEITACHSE: das Lot setzt die Achse des Einstiegs über die Abschnitte fort */}
            <Leitachse>
                {/* 2. UNTERNEHMENSGESCHICHTE als Zeitleiste an der Fuge: eine Linie in Strich (mobil links, ab md bei einem
                    Viertel), je Jahr ein Fugenkreuz auf der Linie, das Jahr in Mono, Titel (H3) und Text rechts davon */}
                <Abschnitt
                    titelId="unternehmensgeschichte-heading"
                    leitachse
                    spaet
                    etikett="Unsere Geschichte"
                    // &shy; an der Fuge des Kompositums (K-006, Darstellung): bei 320 px und bei erhöhten Textabständen (WCAG 1.4.12)
                    // trennt „Unternehmens-geschichte“ dort, statt über den Rand der spaet-Hülle zu laufen und beschnitten zu werden
                    titel={<>Unsere Unternehmens&shy;geschichte seit {business.establishmentYear}</>}
                    einleitung={
                        <p>
                            Von der Betriebsgründung in {headquarters.city} zum Fliesen-Fachbetrieb für ganz Mittelhessen.
                        </p>
                    }
                >
                    <div className="relative">
                        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-2 border-l border-strich md:left-1/4" />
                        <ol className="relative">
                            {historyTimeline.map((item) => (
                                <li key={item.year} className="relative pb-12 pl-8 last:pb-0 md:grid md:grid-cols-12 md:pb-16 md:pl-0">
                                    <p className="relative font-mono text-fs-4 text-tinte md:col-span-3 md:self-start md:pr-8 md:text-right md:text-fs-5 lg:pr-12">
                                        <span
                                            aria-hidden="true"
                                            className="absolute top-1/2 -left-6 flex -translate-x-1/2 -translate-y-1/2 text-tinte md:right-0 md:left-auto md:translate-x-1/2"
                                        >
                                            <Fugenkreuz className="size-4" />
                                        </span>
                                        {item.year}
                                    </p>
                                    <div className="mt-2 md:col-span-9 md:mt-0 md:pl-8 lg:col-span-7 lg:pl-12">
                                        <h3 className="text-fs-5 text-tinte">{item.title}</h3>
                                        <p className="mt-4 max-w-mass text-fs-3 text-tinte-2">{item.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </Abschnitt>

                {/* 3. INHABER als Text an der Fuge (Fliese): links das Motto mit der Linie in Tinte und der Quelle in Mono,
                    rechts die vier Zusagen als Liste an der Fuge und darunter der Knopf; mobil untereinander */}
                <Abschnitt
                    titelId="inhaber-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Inhaber"
                    titel={<>{owner.fullName} &amp; das Fachverlegeteam</>}
                >
                    {/* pb-1: der Fokusrahmen des Knopfs (2 px Versatz + 2 px Linie) liegt unten am Rand der spaet-Hülle und würde
                        dort vom Zeichenbeschnitt (content-visibility) abgeschnitten */}
                    <div className="grid grid-cols-4 gap-y-12 border-t border-strich pt-8 pb-1 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-12 lg:pt-12">
                        <figure className="col-span-4 self-start border-l-2 border-tinte pl-6 md:col-span-8 lg:col-span-7">
                            <blockquote className="max-w-mass font-anzeige text-fs-5 font-extrabold text-tinte">
                                &bdquo;{motto}&ldquo;
                            </blockquote>
                            <figcaption className="mt-4 font-mono text-fs-1 text-tinte-2">
                                — {owner.fullName}, {owner.title}
                            </figcaption>
                        </figure>

                        <div className="col-span-4 flex flex-col gap-8 md:col-span-8 lg:col-span-5">
                            <ul className="border-t border-fuge">
                                {[
                                    `Gegründet ${business.establishmentYear}`,
                                    'DIN 18534 Verbundabdichtung',
                                    `${authority.shortName} Mitglied`,
                                    'Bis zu 12 Fachkräfte'
                                ].map((badge) => (
                                    <li key={badge} className="flex items-start gap-3 border-b border-fuge py-3 font-text text-fs-3 text-tinte">
                                        <Icon name="haken" groesse={5} className="mt-1 text-strich" />
                                        <span className="min-w-0">{badge}</span>
                                    </li>
                                ))}
                            </ul>
                            <Knopf href="/kontakt" icon="pfeil-rechts" className="w-full sm:w-auto sm:self-start">
                                Lernen Sie uns persönlich kennen
                            </Knopf>
                        </div>
                    </div>
                </Abschnitt>
            </Leitachse>

            <QualityPromise />
            <FinalCTA />
        </>
    );
}
