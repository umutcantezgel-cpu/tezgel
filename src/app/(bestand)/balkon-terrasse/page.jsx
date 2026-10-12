// Balkon & Terrasse (E5-BAU-04 im Relaunch-Ablauf S-13, KERN v2): Seitenkörper der Themenseite als Erzählansicht nach
// dem Muster der Familienreferenz (leistungen/[id], fliesen) und der Schwesterseite /untergrund-abdichtung. Einstieg mit
// Laserachse, H1 links, Vorspann und zwei Knöpfe; rechts das Planblatt „aussen“ (Plan ohne Bemaßung, interaktiv; das
// Blatt trägt die rote Achse des Plans). Danach die Leitachse über die Abschnitte, Flächen Kalk und Fliese im Wechsel:
// 2. Grundlagen als Feldraster (Kalk) · 3. Aufbauten im Vergleich als Tabelle mit Hinweis (Fliese) · 4. Entscheidungshilfe,
// Kopf seitlich: Situationen als Merkliste an der Fuge, Eigenschaften als Feldraster 2 × 2 (Kalk) · 5. Detailseiten als
// Register (Fliese) · 6. Vom Ratgeber zum Angebot mit drei Wegen (Kalk) · 7. Weiterführende Ratgeber als Navigation mit
// Merkliste (Fliese). Danach Qualitätsversprechen und Abschluss (geteilte Bausteine).
// Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand. Kein Auftritt und kein großer Moment. `spaet` auf
// allen Abschnitten unter dem ersten Bildschirm (keine Sprungziele, keine Formulare). Metadaten und Daten unverändert.
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
import Tabelle from '@/components/kern/Tabelle';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { linkKlassen } from '@/components/kern/stile';

export const metadata = createMetadata({
    title: 'Balkon & Terrasse fliesen Wetzlar | Fachbetrieb Tezgel',
    description:
        'Balkon & Terrasse fliesen lassen in Wetzlar & Aßlar: frostsichere Keramik, Stelzlager & Naturstein. Jetzt kostenfreies Vor-Ort-Aufmaß anfragen!',
    path: '/balkon-terrasse'
});

const HUB = TOPIC_HUBS.find((hub) => hub.id === 'balkon-terrasse');
const SUBPAGES = HUB ? HUB.pages.filter((page) => page.path !== HUB.path) : [];

const OUTDOOR_RULES = [
    {
        title: 'Frost',
        desc: 'Wasser dehnt sich beim Gefrieren um rund 9 % aus. Dringt es in Poren, Hohlstellen oder Mörtelfugen ein, sprengt jeder Frost-Tau-Wechsel das Gefüge ein Stück weiter auf.'
    },
    {
        title: 'Wasser',
        desc: 'Regen, Schnee und Tauwasser müssen die Fläche zügig verlassen. Stehendes Wasser im oder unter dem Belag ist die häufigste Ursache für Ausblühungen, Frostschäden und lose Platten.'
    },
    {
        title: 'Temperaturwechsel',
        desc: 'Eine besonnte Fläche heizt sich im Sommer stark auf und kühlt bei einem Gewitterschauer schlagartig ab. Belag, Bettung und Untergrund bewegen sich dabei unterschiedlich – das Aufbausystem muss das aufnehmen.'
    }
];

const CONSTRUCTIONS = [
    {
        name: 'Stelzlager',
        height: 'Mittel bis hoch, über die Lager stufenlos einstellbar',
        drainage: 'Wasser läuft durch offene Fugen auf die Abdichtungsebene und dort im Gefälle ab',
        slabs: '2-cm-Platten (Feinsteinzeug oder geeigneter Naturstein)',
        suitability: 'Balkon, Loggia, Dachterrasse auf tragfähiger, abgedichteter Fläche',
        access: 'Platten einzeln abnehmbar, Abdichtung und Abläufe bleiben zugänglich'
    },
    {
        name: 'Splittbett (ungebunden)',
        height: 'Mittel, abhängig von Bettungsdicke und Unterbau',
        drainage: 'Wasser versickert über Fugen und Bettung in einen wasserdurchlässigen Unterbau',
        slabs: '2-cm-Platten oder dickere Terrassenplatten',
        suitability: 'Vor allem Terrassen auf Erdreich mit tragfähigem, frostsicherem Unterbau',
        access: 'Platten aufnehmbar, Bettung lässt sich nachrichten'
    },
    {
        name: 'Gebundene Verlegung',
        height: 'Gering, Belag im Kleber- bzw. Mörtelbett auf der Abdichtung',
        drainage: 'Wasser fließt auf der Belagsoberfläche im Gefälle ab, Fugen sind geschlossen',
        slabs: 'Frostbeständiges Feinsteinzeug in üblicher Stärke möglich',
        suitability: 'Flächen mit knapper Aufbauhöhe, wenn Gefälle und Abdichtung darunter stimmen',
        access: 'Kein zerstörungsfreier Zugang zur Abdichtung'
    }
];

// Zeilen der Vergleichstabelle (Kriterium → Schlüssel in CONSTRUCTIONS), Reihenfolge wie im Bestand
const CRITERIA_ROWS = [
    { key: 'height', label: 'Aufbauhöhe' },
    { key: 'drainage', label: 'Entwässerung' },
    { key: 'slabs', label: 'Platten' },
    { key: 'suitability', label: 'Geeignet für' },
    { key: 'access', label: 'Revision' }
];

const SITUATIONS = [
    {
        title: 'Balkon & Loggia',
        text: 'Im Bestand entscheidet meist die Höhe bis zur Türschwelle. Reicht sie aus, sind Stelzlager auf einer intakten, im Gefälle liegenden Abdichtung die robusteste Lösung. Vorher prüfen wir, ob Abdichtung und Untergrund das zulassen; die Tragfähigkeit der Balkonplatte beurteilt bei Zweifeln ein Tragwerksplaner.'
    },
    {
        title: 'Dachterrasse über Wohnraum',
        text: 'Hier ist die Abdichtung Teil der Dachabdichtung und häufig Aufgabe des Dachdeckers. Ein Plattenbelag auf Stelzlagern belastet diese Abdichtung nur punktuell über Schutzpads und bleibt für Kontrollen abnehmbar. Wir stimmen den Belag auf die vorhandene oder neu hergestellte Abdichtung ab.'
    },
    {
        title: 'Terrasse auf Erdreich',
        text: 'Voraussetzung ist ein tragfähiger, frostsicherer und wasserdurchlässiger Unterbau mit Gefälle vom Haus weg. Darauf eignen sich Splittbett oder Stelzlager. Wie der Unterbau aufgebaut sein muss, klären wir vor Ort, bevor ein Belag geplant wird.'
    }
];

const BENEFITS = [
    { title: 'Frostbeständig', desc: 'Nur Platten mit geprüfter Frostbeständigkeit kommen ins Freie.' },
    { title: 'Rutschhemmend', desc: 'Oberflächen mit einer für außen sinnvollen Rutschhemmung, auch bei Nässe.' },
    { title: 'Schnell entwässernd', desc: 'Gefälle und Aufbau führen Wasser gezielt von Belag und Gebäude weg.' },
    { title: 'Pflegeleicht', desc: 'Dichtes Feinsteinzeug nimmt kaum Schmutz auf und lässt sich einfach reinigen.' }
];

const FURTHER_READING = [
    { label: 'Leistung: Außenbereiche & Balkone', href: '/leistungen/aussen' },
    { label: 'Leistung: Untergrund & Abdichtung', href: '/leistungen/untergrund' },
    { label: 'Barrierefreier Balkonaustritt', href: '/blog/barrierefreier-balkonaustritt' },
    { label: 'Häufige Fragen', href: '/faq' }
];

// Zeile des Registers (Detailseiten) auf Fliese: die ganze Zeile ist der Link; Überfahren färbt die Fläche auf Kalk
const ZEILE = 'group flex min-h-12 items-center gap-4 px-3 py-4 pointer-fine:hover:bg-kalk active:bg-kalk';
// Name in der Zeile (H3 wie im Bestand): Unterstrich beim Überfahren
const NAME =
    'font-text text-fs-3 font-semibold text-tinte lg:w-1/3 lg:shrink-0 decoration-1 underline-offset-4 decoration-tinte pointer-fine:group-hover:underline group-active:underline';

export default function BalkonTerrassePage() {
    return (
        <>
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts das Planblatt „aussen“ */}
            <section aria-labelledby="balkon-heading">
                <Einstieg
                    art="erzaehl"
                    etikett="Ratgeber Außenbeläge"
                    titel={
                        <span id="balkon-heading">
                            Balkon und Terrasse:{' '}
                            <span>Beläge, die Frost und Regen standhalten</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Balkon und Terrasse: Belagsaufbauten im Vergleich für Beläge, die Frost und Regen standhalten. Draußen entscheidet nicht die Fliese allein, sondern der gesamte Aufbau darunter. Als Fachbetrieb Tezgel vergleichen wir Stelzlager, Splittbett und gebundene Verlegung und zeigen, welche Lösung zu Balkon, Dachterrasse oder Terrasse auf Erdreich passt.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Aufmaß für Balkon oder Terrasse anfragen
                            </Knopf>
                            <Knopf href="/leistungen/aussen" variante="neben">
                                Leistung Außenbereiche
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Balkon & Terrasse fliesen', 'aussen')}>
                            <Verlegeplan plan="aussen" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. GRUNDLAGEN: drei Belastungen als Feldraster; das dritte Feld überspannt in md die freie Breite */}
                <Abschnitt
                    titelId="balkon-regeln-heading"
                    leitachse
                    spaet
                    etikett="Grundlagen"
                    titel="Warum Außenbeläge eigene Regeln brauchen"
                    einleitung={
                        <p>
                            Ein Belag im Freien ist Belastungen ausgesetzt, die im Wohnraum keine Rolle spielen. Drei Faktoren bestimmen,
                            ob er über viele Winter hält.
                        </p>
                    }
                >
                    <Feldraster spalten={3}>
                        {OUTDOOR_RULES.map((item, i) => {
                            const letzter = i === OUTDOOR_RULES.length - 1;
                            return (
                                <Feld key={item.title} spanne={letzter ? 2 : undefined} className={letzter ? 'lg:col-span-1' : undefined}>
                                    <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                    <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{item.desc}</p>
                                </Feld>
                            );
                        })}
                    </Feldraster>
                    <p className="mt-8 max-w-mass font-text text-fs-2 text-tinte-2">
                        Typische Schadensbilder, Gefälle und Entwässerung, Abdichtungsanschlüsse und Tropfkanten behandeln wir ausführlich
                        auf der Seite{' '}
                        <Link href="/balkon-terrasse/balkonsanierung" className={linkKlassen}>
                            Balkonsanierung
                        </Link>
                        .
                    </p>
                </Abschnitt>

                {/* 3. VERGLEICH: Tabelle als benannte Region (Name = bisherige Beschriftung), darunter der Hinweis zur Plattenstärke */}
                <Abschnitt
                    titelId="balkon-vergleich-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Vergleich"
                    titel={
                        <>
                            Aufbauten im Vergleich:{' '}
                            <span>Stelzlager, Splittbett, gebunden</span>
                        </>
                    }
                    einleitung={
                        <p>
                            Alle drei Bauweisen funktionieren – wenn sie zur Fläche passen. Entscheidend sind verfügbare Aufbauhöhe,
                            Untergrund und der Weg, den das Wasser nehmen soll.
                        </p>
                    }
                >
                    <Tabelle
                        name="Vergleich der Aufbauten für Balkon und Terrasse"
                        kopf={['Kriterium', ...CONSTRUCTIONS.map((c) => c.name)]}
                        zeilen={CRITERIA_ROWS.map((row) => [row.label, ...CONSTRUCTIONS.map((c) => c[row.key])])}
                    />
                    {/* Hinweis in der Form des Bausteins (Rahmen, Kante links, Info-Zeichen); der Titel steht im Satz wie im Bestand.
                        Breite = Lesebreite der Einleitung (max-w-mass in der Fließtextstufe), damit rechts im Kasten keine leere Fläche bleibt */}
                    <div className="mt-6 max-w-mass text-fs-3">
                        <div className="flex items-start gap-4 border border-l-2 border-strich bg-fliese p-6 font-text text-fs-2 text-tinte">
                            <Icon name="info" groesse={5} className="mt-1 text-tinte" />
                            <p className="min-w-0">
                                <strong className="font-semibold">Plattenstärke:</strong> 2-cm-Platten sind für Stelzlager und Splittbett
                                nötig, weil sie dort frei spannen bzw. punktuell aufliegen. Bei gebundener Verlegung trägt das Bett die
                                Platte vollflächig – dann genügt frostbeständiges Feinsteinzeug in üblicher Stärke.
                            </p>
                        </div>
                    </div>
                </Abschnitt>

                {/* 4. ENTSCHEIDUNGSHILFE: Kopf links mit dem Plan „balkon“ als Zeichnung (dekorativ, ohne Achse, halbe Spaltenbreite
                    wie in der Referenz /fliesen, Abschnitt „Weitere Fachthemen“); rechts die drei Situationen als Merkliste an der Fuge
                    (H3 wie im Bestand), darunter die vier Eigenschaften als Feldraster 2 × 2 */}
                <Abschnitt
                    titelId="balkon-situation-heading"
                    leitachse
                    spaet
                    kopf="seitlich"
                    etikett="Entscheidungshilfe"
                    titel="Welche Lösung passt zu Ihrer Fläche?"
                    einleitung={
                        <div className="mt-2 w-1/2">
                            <Verlegeplan plan="balkon" ohneAchse bemassung={false} />
                        </div>
                    }
                >
                    <Merkliste spalten={1} titelAls="h3" eintraege={SITUATIONS.map((item) => ({ titel: item.title, text: item.text }))} />
                    <Feldraster spalten={2} className="mt-12">
                        {BENEFITS.map((item) => (
                            <Feld key={item.title}>
                                <h3 className="font-text text-fs-3 font-semibold text-tinte">{item.title}</h3>
                                <p className="mt-2 font-text text-fs-2 text-tinte-2">{item.desc}</p>
                            </Feld>
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 5. DETAILSEITEN: Register der Unterseiten des Themas, je Zeile Name (H3), Beschreibung und „Mehr zu …“ */}
                <Abschnitt
                    titelId="balkon-themen-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    etikett="Vertiefen"
                    titel="System, Sanierung, Material: die Detailseiten"
                >
                    <ul className="border-t border-tinte">
                        {SUBPAGES.map((page) => (
                            <li key={page.path} className="border-b border-fuge">
                                <Link href={page.path} data-motion="zustand" className={ZEILE}>
                                    <div className="flex min-w-0 flex-1 flex-col gap-1 lg:flex-row lg:items-baseline lg:gap-6">
                                        <h3 className={NAME}>{page.name}</h3>
                                        <p className="font-text text-fs-2 text-tinte-2 lg:min-w-0 lg:flex-1">{page.desc}</p>
                                        <span className="font-text text-fs-2 text-tinte">Mehr zu {page.name} erfahren</span>
                                    </div>
                                    <span aria-hidden="true" className="flex shrink-0 text-strich">
                                        <Icon name="pfeil-rechts" groesse={5} />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Abschnitt>

                {/* 6. VOM RATGEBER ZUM ANGEBOT: Überschrift, Einleitung und drei Wege als Knöpfe; Telefon und WhatsApp aus COMPANY_DATA */}
                <Abschnitt
                    titelId="balkon-angebot-heading"
                    leitachse
                    spaet
                    etikett="Vom Ratgeber zum Angebot"
                    titel="Wir sehen uns Ihre Fläche vor Ort an"
                    einleitung={
                        <p>
                            Beim kostenfreien Aufmaß prüft {COMPANY_DATA.owner.fullName} Gefälle, Abdichtung, Anschlusshöhen und
                            Untergrund und empfiehlt den passenden Aufbau. Was wir im Außenbereich ausführen, finden Sie auf unserer
                            Leistungsseite.
                        </p>
                    }
                >
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Knopf href="/kontakt" icon="pfeil-rechts">
                            Kostenfreies Aufmaß anfragen
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

                {/* 7. WEITERFÜHRENDE RATGEBER: bleibt eine Navigation (Bestand nav mit H2); vier Verweise als Merkliste in zwei Spalten */}
                <Abschnitt flaeche="fliese" leitachse spaet>
                    <nav aria-labelledby="balkon-ratgeber-heading">
                        <h2 id="balkon-ratgeber-heading" className="max-w-mass text-fs-6 text-tinte">
                            Weiterführende Ratgeber zu Balkon &amp; Terrasse
                        </h2>
                        <Merkliste
                            spalten={2}
                            className="mt-12"
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

            <QualityPromise />
            <FinalCTA />
        </>
    );
}
