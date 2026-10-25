// Fliesenarten (E4-BAU-06, KERN v2): Erzählansicht nach dem Muster der Fliesen-Familie (/fliesen) und von /bad.
// Einstieg mit Laserachse, H1 links, Vorspann und Knöpfe; rechts das Planblatt „naturstein“ mit dem Verlegeplan (ohne
// Bemaßung, interaktiv). Danach die Leitachse über die Abschnitte: Gruppen als Feldraster mit Vergleichstabelle, Kennwerte
// als Feldraster, Kauf als Merkliste, Raumübersicht als Tabelle, Weiterführende Ratgeber als Merkliste; dann der Konfigurator
// mit Rückfrage. Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand. Kein großer Moment und kein Auftritt
// (setzt der Orchestrator).
import Link from 'next/link';
import dynamic from 'next/dynamic';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import SeitenDaten from '@/components/seo/SeitenDaten';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import QualityPromise from '@/components/sections/QualityPromise';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Knopf from '@/components/kern/Knopf';
import Leitachse from '@/components/kern/Leitachse';
import Merkliste from '@/components/kern/Merkliste';
import Rueckfrage from '@/components/kern/Rueckfrage';
import Tabelle from '@/components/kern/Tabelle';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { linkKlassen } from '@/components/kern/stile';

// Konfigurator nachladen (Tempo, wie auf der Startseite und den Leistungsseiten); ID #konfigurator liegt am Abschnitt
const FliesenKonfigurator = dynamic(() => import('@/components/funnels/FliesenKonfigurator'), {
    loading: () => <FormularPlatzhalter />,
});

export const metadata = createMetadata({
    title: 'Fliesenarten im Vergleich mit Feinsteinzeug | Tezgel',
    description:
        'Fliesenarten im Vergleich: Feinsteinzeug, Steinzeug & Steingut. Wasseraufnahme, Frostsicherheit & Abriebklassen erklärt vom Fachbetrieb Tezgel aus Aßlar.',
    path: '/fliesen/fliesenarten'
});

const MATERIAL_CARDS = [
    {
        title: 'Gebrannte Keramik',
        desc: 'Alle keramischen Fliesen bestehen aus Ton, Feldspat, Quarz und weiteren Mineralien, die geformt und bei hoher Temperatur gebrannt werden. Brenntemperatur und Rohstoffe bestimmen, wie dicht der Scherben wird.'
    },
    {
        title: 'Wasseraufnahme als Schlüsselwert',
        desc: 'DIN EN 14411 ordnet Fliesen nach Formgebung (A = stranggepresst, B = trockengepresst) und nach ihrer Wasseraufnahme in Gruppen von I bis III ein. Je geringer die Wasseraufnahme, desto dichter und belastbarer die Fliese.'
    },
    {
        title: 'Feinsteinzeug',
        desc: 'Gruppe BIa mit einer Wasseraufnahme von höchstens 0,5 %. Sehr dicht, frostbeständig, bruchfest und für Boden und Wand, innen wie außen geeignet – der heute gebräuchlichste Fliesenwerkstoff.'
    },
    {
        title: 'Steinzeug',
        desc: 'Dicht gebrannt, aber etwas offener als Feinsteinzeug (meist Gruppen BIb bis BIIa). Robust für Böden im Innenbereich; frostbeständig nur, wenn der Hersteller dies ausdrücklich angibt.'
    },
    {
        title: 'Steingut',
        desc: 'Gruppe BIII mit einer Wasseraufnahme über 10 %. Poröser, glasierter Scherben, leicht zu schneiden, für Wandflächen im Innenbereich. Nicht frostbeständig und nicht für Böden geeignet.'
    },
    {
        title: 'Frostbeständigkeit',
        desc: 'Draußen zählt, ob eine Fliese Frost-Tau-Wechsel ohne Schäden übersteht. Das wird nach DIN EN ISO 10545-12 geprüft und vom Hersteller deklariert. Für Balkon und Terrasse kommt praktisch nur Feinsteinzeug in Frage.'
    }
];

const COMPARISON = [
    ['Feinsteinzeug', 'BIa: ≤ 0,5 %', 'Ja', 'Boden und Wand, innen und außen, Großformate, Treppen, Balkon und Terrasse'],
    ['Steinzeug', 'meist BIb bis BIIa: > 0,5 bis 6 %', 'Nur wenn vom Hersteller angegeben', 'Böden und Wände im Innenbereich'],
    ['Steingut', 'BIII: > 10 %', 'Nein', 'Wandfliesen im Innenbereich, z. B. Bad- und Küchenwände']
];

const ROOM_TABLE = [
    ['Wohn- und Essbereich', 'Feinsteinzeug, gern im Großformat oder als Holzoptik-Diele', 'Ruhige Fläche, auf Fußbodenheizung geeignet'],
    ['Küche', 'Feinsteinzeug am Boden; an der Wand auch Steingut oder Großformat', 'Fleckunempfindliche Oberfläche, belastbare Fugen'],
    ['Flur und Diele', 'Feinsteinzeug mit matter, strukturierter Oberfläche', 'Hohe Abriebfestigkeit, Rutschhemmung bei nassen Schuhen'],
    ['Bad – Wand', 'Steingut oder Feinsteinzeug', 'Im Spritzwasserbereich Abdichtung nach DIN 18534'],
    ['Bad – Boden und Dusche', 'Feinsteinzeug, in der Dusche rutschhemmend', 'Rutschhemmung für nassbelastete Barfußbereiche beachten'],
    ['Balkon und Terrasse', 'Frostbeständiges Feinsteinzeug, je nach Aufbau als 2-cm-Platte', 'Frostbeständigkeit, Gefälle, Entwässerung'],
    ['Treppe', 'Feinsteinzeug oder Naturstein', 'Trittsichere Oberfläche, saubere Stufenkanten']
];

const KENNWERTE = [
    {
        id: 'fa-glasur',
        title: 'Glasiert oder unglasiert',
        text: 'Unglasiertes Feinsteinzeug ist durchgefärbt: Die Oberfläche entspricht dem Scherben, Abnutzung fällt kaum auf. Glasierte Fliesen tragen Farbe und Dekor in einer eingebrannten Glasur – das ermöglicht nahezu jede Optik, macht die Oberfläche aber zur entscheidenden Verschleißschicht.'
    },
    {
        id: 'fa-kante',
        title: 'Rektifiziert oder kalibriert',
        text: 'Rektifizierte Fliesen werden nach dem Brand an den Kanten maßgenau geschliffen und erlauben schmale Fugen. Kalibrierte Fliesen werden nach dem Brand in Größenklassen sortiert; das Kaliber steht auf dem Karton. Innerhalb einer Fläche sollte nur ein Kaliber verlegt werden.'
    },
    {
        id: 'fa-abrieb',
        title: 'Abriebklasse',
        text: 'Die Abriebklassen 1 bis 5 (häufig PEI-Klassen genannt, geprüft nach DIN EN ISO 10545-7) gelten nur für glasierte Bodenfliesen. Für Wohnräume genügen meist mittlere Klassen; stark begangene Flure und Eingänge brauchen höhere. Unglasiertes Feinsteinzeug wird stattdessen auf Tiefenverschleiß geprüft.'
    },
    {
        id: 'fa-rklasse',
        title: 'Rutschhemmung (R-Klasse)',
        text: 'Die Rutschhemmung wird nach DIN EN 16165 ermittelt, die die früheren Prüfnormen DIN 51130 und DIN 51097 ersetzt hat. Angegeben werden R9 bis R13 für Bereiche mit Schuhen und die Klassen A, B, C für nassbelastete Barfußbereiche. Für Privathaushalte sind sie eine Empfehlung, keine Pflicht.'
    }
];

const KAUF = [
    {
        title: 'Eine Farbcharge',
        text: 'Fliesen aus unterschiedlichen Produktionen können leicht im Farbton abweichen. Die Charge steht auf dem Karton – bestellen Sie die gesamte Menge aus einer Charge.'
    },
    {
        title: 'Ein Kaliber',
        text: 'Bei kalibrierten Fliesen gehört auch das Kaliber auf die Bestellung. Unterschiedliche Kaliber in einer Fläche führen zu verlaufenden Fugen.'
    },
    {
        title: 'Reserve aufbewahren',
        text: 'Heben Sie einige Fliesen für spätere Reparaturen auf. Nach Jahren ist dieselbe Serie oft nicht mehr lieferbar.'
    }
];

const WEITERLESEN = [
    { label: 'Feinsteinzeug oder Naturstein?', href: '/blog/feinsteinzeug-oder-naturstein-vergleich' },
    { label: 'Rutschfeste Fliesen: R-Klassen erklärt', href: '/blog/rutschfeste-fliesen-r-klassen' },
    { label: 'Leistung: Balkon, Terrasse & Außenbereiche', href: '/leistungen/aussen' },
    { label: 'Häufige Fragen', href: '/faq' }
];

export default function FliesenartenPage() {
    return (
        <>
            <SeitenDaten
                pfad="/fliesen/fliesenarten"
                titel="Fliesenarten im Vergleich mit Feinsteinzeug | Tezgel"
                beschreibung="Fliesenarten im Vergleich: Feinsteinzeug, Steinzeug & Steingut. Wasseraufnahme, Frostsicherheit & Abriebklassen erklärt vom Fachbetrieb Tezgel aus Aßlar."
                brotkrumen={[
                    { name: 'Start', href: '/' },
                    { name: 'Fliesen und Verlegung', href: '/fliesen' },
                    { name: 'Feinsteinzeug, Steinzeug, Steingut: Fliesenarten und ihre Eigenschaften' },
                ]}
            />
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, Knöpfe; rechts das Planblatt „naturstein“ */}
            <section aria-labelledby="fliesenarten-heading">
                <Einstieg
                    art="erzaehl"
                    etikett={<>Materialkunde &middot; DIN EN 14411</>}
                    titel={<span id="fliesenarten-heading">Feinsteinzeug, Steinzeug, Steingut: Fliesenarten und ihre Eigenschaften</span>}
                    vorspann={
                        <p>
                            Feinsteinzeug, Steinzeug, Steingut: Die verschiedenen Fliesenarten und ihre spezifischen Eigenschaften entscheiden, wo eine
                            Fliese dauerhaft funktioniert. Wasseraufnahme, Frostbeständigkeit, Rutschhemmung und Kantenbearbeitung im fundierten Überblick
                            nach DIN EN 14411.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Fliesenberatung anfragen
                            </Knopf>
                            <Knopf href="/bad/fliesen" variante="neben">
                                Fliesen im Bad
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Fliesenarten im Vergleich', 'naturstein')}>
                            <Verlegeplan plan="naturstein" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. GRUPPEN NACH DIN EN 14411: sechs Felder als Feldraster, darunter vergleichende Tabelle und Hinweis */}
                <Abschnitt titelId="fa-gruppen-heading" leitachse spaet etikett="Gruppen nach DIN EN 14411" titel="Gebrannte Keramik: drei Werkstoffe, viele Einsatzorte">
                    <Feldraster spalten={3}>
                        {MATERIAL_CARDS.map((item) => (
                            <Feld key={item.title}>
                                <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                <p className="mt-3 font-text text-fs-2 text-tinte-2">{item.desc}</p>
                            </Feld>
                        ))}
                    </Feldraster>
                    <div className="mt-12">
                        <Tabelle
                            name="Vergleich der Fliesenarten nach Wasseraufnahme, Frostbeständigkeit und Einsatz"
                            kopf={['Fliesenart', 'Wasseraufnahme (Gruppe)', 'Frostbeständig', 'Typischer Einsatz']}
                            zeilen={COMPARISON}
                        />
                    </div>
                    <p className="mt-6 max-w-mass font-text text-fs-3 text-tinte-2">
                        Stranggepresste Fliesen wie Spaltplatten oder Cotto gehören zur Gruppe A und werden nach demselben Prinzip eingeordnet.
                    </p>
                </Abschnitt>

                {/* 3. KENNWERTE LESEN: vier Felder je mit Überschrift und Text; die R-Klasse verweist im Satz weiter */}
                <Abschnitt titelId="fa-kennwerte-heading" leitachse spaet flaeche="fliese" etikett="Kennwerte lesen" titel="Was auf dem Karton steht – und was es bedeutet">
                    <Feldraster spalten={2}>
                        {KENNWERTE.map((item) => (
                            <Feld key={item.id}>
                                <article aria-labelledby={item.id} className="flex flex-1 flex-col">
                                    <h3 id={item.id} className="font-anzeige text-fs-4 text-tinte">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 font-text text-fs-2 text-tinte-2">
                                        {item.text}
                                        {item.id === 'fa-rklasse' && (
                                            <>
                                                {' '}
                                                <Link href="/blog/rutschfeste-fliesen-r-klassen" className={linkKlassen}>
                                                    Mehr zu R-Klassen
                                                </Link>
                                            </>
                                        )}
                                    </p>
                                </article>
                            </Feld>
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 4. BEIM KAUF: drei Punkte als Merkliste; darunter zwei Textlinks im Satz */}
                <Abschnitt titelId="fa-kauf-heading" leitachse spaet titel="Beim Kauf: Farbcharge, Kaliber und Reservefliesen">
                    <Merkliste spalten={1} titelAls="h3" eintraege={KAUF.map((item) => ({ titel: item.title, text: item.text }))} />
                    <p className="mt-8 max-w-mass font-text text-fs-3 text-tinte-2">
                        Wie viel Verschnitt Sie je nach Verlegemuster einplanen sollten, steht bei{' '}
                        <Link href="/fliesen/verlegemuster" className={linkKlassen}>
                            Verlegemuster &amp; Abschlüsse
                        </Link>
                        . Sie möchten Fliesen gemeinsam auswählen?{' '}
                        <Link href="/ausstellung/wetzlar" className={linkKlassen}>
                            Fliesenberatung nach Terminvereinbarung
                        </Link>
                        .
                    </p>
                </Abschnitt>

                {/* 5. RAUMÜBERSICHT: Tabelle mit Zeilenkopf je Raum; Einleitung als Satz */}
                <Abschnitt
                    titelId="fa-raum-heading"
                    leitachse
                    spaet
                    flaeche="fliese"
                    etikett="Übersicht"
                    titel="Welche Fliese für welchen Raum?"
                    einleitung={<p>Eine erste Orientierung. Welche Fliese im Einzelfall passt, hängt von Nutzung, Untergrund und Gestaltung ab.</p>}
                >
                    <Tabelle name="Welche Fliese für welchen Raum?" kopf={['Raum', 'Geeignete Fliesenart', 'Worauf achten']} zeilen={ROOM_TABLE} />
                </Abschnitt>

                {/* 6. WEITERFÜHRENDE RATGEBER: vier Verweise als Merkliste, darunter der Verweis auf die Leistung */}
                <Abschnitt titelId="fa-ratgeber-heading" leitachse spaet titel="Weiterführende Ratgeber zu Fliesenarten & Materialien">
                    <Merkliste
                        spalten={2}
                        eintraege={WEITERLESEN.map((link) => ({
                            titel: (
                                <Link href={link.href} className={linkKlassen}>
                                    {link.label}
                                </Link>
                            )
                        }))}
                    />
                    <p className="mt-8 max-w-mass font-text text-fs-3 text-tinte-2">
                        Projekt im Wohnbereich geplant?{' '}
                        <Link href="/leistungen/wohnen" className={linkKlassen}>
                            Leistung: Wohnbereiche &amp; Neubau
                        </Link>
                    </p>
                </Abschnitt>

                {/* 7. KONFIGURATOR: Funnel (nachgeladen) im Raster mit 8 Spalten, rechts die Rückfrage in 4 Spalten (ab lg); Anker #konfigurator bleibt */}
                <Abschnitt id="konfigurator" aria-label="Fliesen-Konfigurator" leitachse spaet flaeche="fliese">
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

            {/* 8. ABSCHLUSS: Qualitätsversprechen, danach der Schluss-Aufruf mit Aufmaß, Telefon und WhatsApp */}
            <QualityPromise />

            <Abschnitt
                titelId="fa-cta-heading"
                flaeche="tinte"
                etikett="Materialberatung vom Fachbetrieb"
                titel="Unsicher, welche Fliese passt?"
                einleitung={
                    <p>
                        Beim kostenfreien Vor-Ort-Aufmaß besprechen wir Nutzung, Untergrund und Wunschoptik und empfehlen die passende Fliesenart.
                    </p>
                }
            >
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Knopf href="/kontakt" variante="hell">
                        Aufmaß anfragen
                    </Knopf>
                    <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
                        <span className="font-mono font-normal">{COMPANY_DATA.contact.phone}</span>
                    </Knopf>
                    <Knopf href={COMPANY_DATA.contact.whatsappLink} extern variante="neben" vorne={<WhatsAppLogo className="size-5 shrink-0" />}>
                        WhatsApp
                    </Knopf>
                </div>
            </Abschnitt>
        </>
    );
}
