// Partner (S-20 nach E5-BAU-04 sinngemäß, KERN v2): Erzählansicht nach dem Vorbild von /ueber-uns. Einstieg mit
// Laserachse, Kennzeile, H1 links und Vorspann; rechts das Planblatt „Materialpartner & Verlegesysteme“ mit dem Plan
// „untergrund“ (Dichtband und Abdichtung vor dem Verlegen – die Verlegesysteme der Seite; interaktiv, die rote Achse trägt
// das Blatt). Danach die Leitachse über die Abschnitte:
// 2. Marken als Feldraster ohne Kartenoptik (Fliese, drei Spalten ab lg): je Feld ein Fachzeichen der eigenen Familie nach
// der Kategorie (statt des einheitlichen Haken-Icons), Marke als H2, Kategorie; darunter an der Fuge der Markenhinweis und
// der Knopf · Qualitätsversprechen (geteilter Baustein). Kein Auftritt, kein großer Moment.
// Wortlaut, Überschriften, Links und Lesefolge wie im Bestand; Metadaten und Daten unverändert. Serverkomponente.
import { partnerBrands } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import Icon from '@/components/icons/Icon';
import QualityPromise from '@/components/sections/QualityPromise';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import Leitachse from '@/components/kern/Leitachse';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Verlegeplan from '@/components/kern/Verlegeplan';
import SeitenDaten from '@/components/seo/SeitenDaten';

const TITEL = 'Materialpartner & Verlegesysteme | Tezgel Fachbetrieb';
const BESCHREIBUNG = 'Hochwertige Verlegewerkstoffe & Fliesenmarken bei Tezgel: Schlüter-Systems, Ardex, Sopro, PCI, Marazzi & Villeroy & Boch. Höchste Qualität für Ihr Projekt!';

export const metadata = createMetadata({
    title: TITEL,
    description: BESCHREIBUNG,
    path: '/partner'
});

// Fachzeichen je Kategorie (Stichwort in `brand.category`, ohne Groß-/Kleinschreibung → Zeichen der Familie); rein
// dekorativ, ohne Treffer das Fugenkreuz
const ZEICHEN = [
    ['abdichtung', 'abdichtung'],
    ['fliesenkleber', 'fliese'],
    ['estrich', 'untergrund'],
    ['großformat', 'grossformat'],
    ['badkeramik', 'bad']
];

const zeichenFuer = (kategorie) => ZEICHEN.find(([stichwort]) => kategorie.toLowerCase().includes(stichwort))?.[1];

// Uses the brand names & categories from COMPANY_DATA only. Partner-status labels are
// intentionally not shown until they are verified.
export default function PartnerPage() {
    return (
        <>
            <SeitenDaten
                pfad="/partner"
                titel={TITEL}
                beschreibung={BESCHREIBUNG}
                brotkrumen={[{ name: 'Start', href: '/' }, { name: 'Materialpartner & Verlegesysteme: Tezgel Fachbetrieb' }]}
            />
            {/* 1. EINSTIEG: Kennzeile, H1 an der Laserachse, Vorspann; rechts das Planblatt „untergrund“ */}
            <Einstieg
                art="erzaehl"
                etikett={
                    <>
                        <Fugenkreuz className="size-3 shrink-0 text-strich" />
                        Markenqualität ohne Kompromisse
                    </>
                }
                titel={
                    <>
                        Materialpartner &amp; Verlegesysteme:{' '}
                        <span>Tezgel Fachbetrieb</span>
                    </>
                }
                vorspann={
                    <p>
                        Als Fachbetrieb Tezgel setzen wir bei Verbundabdichtung, Klebern und Fliesen auf führende Materialpartner und zertifizierte Verlegesysteme renommierter Hersteller.
                    </p>
                }
                rand={
                    <Planblatt felder={planfelder('Materialpartner & Verlegesysteme', 'untergrund')}>
                        <Verlegeplan plan="untergrund" ohneAchse bemassung={false} interaktiv />
                    </Planblatt>
                }
            />

            {/* LEITACHSE: das Lot setzt die Achse des Einstiegs über die Abschnitte fort */}
            <Leitachse>
                {/* 2. MARKEN als Feldraster (Fliese): sechs Felder, eine Spalte mobil, zwei ab md, drei ab lg (keine Restzelle);
                    darunter an der Fuge der Markenhinweis und der Knopf */}
                <Abschnitt flaeche="fliese" leitachse spaet>
                    <Feldraster spalten={3}>
                        {partnerBrands.map((brand) => {
                            const zeichen = zeichenFuer(brand.category);
                            return (
                                <Feld key={brand.name}>
                                    <span aria-hidden="true" className="flex size-6 items-center justify-center text-tinte">
                                        {zeichen ? <Icon name={zeichen} groesse={6} /> : <Fugenkreuz className="size-3 text-strich" />}
                                    </span>
                                    <h2 className="mt-6 text-fs-5 text-tinte">{brand.name}</h2>
                                    <p className="mt-2 text-fs-2 text-tinte-2">{brand.category}</p>
                                </Feld>
                            );
                        })}
                    </Feldraster>

                    {/* pb-1: Fokusrahmen des Knopfs (2 px Versatz + 2 px Linie) unten innerhalb der spaet-Hülle (Zeichenbeschnitt) */}
                    <div className="mt-8 flex flex-col gap-6 border-t border-strich pt-8 pb-1 md:flex-row md:items-center md:justify-between">
                        <p className="max-w-mass text-fs-1 text-tinte-2">
                            Genannte Marken- und Produktnamen sind Eigentum der jeweiligen Hersteller.
                        </p>
                        <Knopf href="/kontakt" icon="pfeil-rechts" className="w-full sm:w-auto md:shrink-0">
                            Material &amp; Fugenbild beraten lassen
                        </Knopf>
                    </div>
                </Abschnitt>
            </Leitachse>

            <QualityPromise />
        </>
    );
}
