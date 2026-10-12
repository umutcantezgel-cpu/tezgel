// Balkonsanierung (E5-BAU-04 im Relaunch-Ablauf S-13, KERN v2): Seitenkörper der Unterseite als Erzählansicht nach dem
// Muster der Familienreferenz (leistungen/[id], fliesen) und der Schwesterseite /untergrund-abdichtung/din-18534. Einstieg
// mit Laserachse, H1 links, Vorspann und zwei Knöpfe; rechts das Planblatt „balkon“ (Plan ohne Bemaßung, interaktiv; das
// Blatt trägt die rote Achse des Plans). Danach die Leitachse über die Abschnitte, Flächen Kalk und Fliese im Wechsel:
// 2. Schadensbilder als Feldraster 3 × 2 (Kalk) · 3. Ursachen, Kopf seitlich: drei Zeilen an der Fuge mit Mono-Nummer
// (Fliese) · 4. Ablauf als Schrittfolge, ab lg waagrecht (Kalk) · 5. Fachdetails: drei Themen als Text an der Fuge
// (Überschrift links, Text rechts), darunter der Hinweis „Was wir übernehmen“ (Fliese) · 6. Begutachtung vor Ort mit drei
// Wegen (Kalk) · 7. Weiterführende Ratgeber als Navigation mit Merkliste (Fliese). Danach das Qualitätsversprechen.
// Der Hinweis „Was wir übernehmen“ stand im Bestand am Anfang des Abschnitts mit dem Aufruf, vor dessen Überschrift; er
// schließt jetzt die Fachdetails ab – Lesefolge unverändert, der Abschnittskopf des Aufrufs bleibt oben.
// Wortlaut, Überschriften, Links, IDs und Lesefolge wie im Bestand. Kein Auftritt und kein großer Moment. `spaet` auf
// allen Abschnitten unter dem ersten Bildschirm (keine Sprungziele, keine Formulare). Metadaten und Daten unverändert.
import Link from 'next/link';
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
import Schrittfolge from '@/components/kern/Schrittfolge';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { linkKlassen } from '@/components/kern/stile';

export const metadata = createMetadata({
    title: 'Balkonsanierung Wetzlar & Aßlar | Abdichtung · Tezgel',
    description:
        'Balkonsanierung in Wetzlar & Aßlar: Fachgerechte Abdichtung, Gefälleerstellung & neuer Fliesenbelag vom Fachbetrieb. Jetzt Festpreisangebot anfragen!',
    path: '/balkon-terrasse/balkonsanierung'
});

const DAMAGE = [
    {
        title: 'Kalkausblühungen',
        desc: 'Weiße Krusten und Kalkfahnen an Fugen, Stirnkanten oder unter dem Balkon zeigen: Wasser wandert durch das Mörtelbett und löst dabei Kalk aus dem Zement.'
    },
    {
        title: 'Frostschäden',
        desc: 'Abgeplatzte Fliesenkanten, gesprengte Fugen und gebrochene Platten entstehen, wenn Wasser im Belag gefriert. Häufig betroffen: nicht frostbeständige Fliesen und Hohlstellen.'
    },
    {
        title: 'Hohl liegende und lose Fliesen',
        desc: 'Klingt der Belag beim Abklopfen hohl oder wackeln einzelne Fliesen, hat sich der Verbund zum Untergrund gelöst. Dahinter sammelt sich meist Wasser.'
    },
    {
        title: 'Feuchte unter dem Belag',
        desc: 'Dauerhaft dunkle Fugen, Moos, Pfützen nach dem Regen oder Wasser, das an der Unterseite austritt, deuten auf eine fehlende oder undichte Abdichtung hin.'
    },
    {
        title: 'Risse',
        desc: 'Risse durch Fliesen und Fugen folgen oft fehlenden Bewegungsfugen oder Rissen im Untergrund. Sie sind Einfallstore für Wasser und damit für Folgeschäden.'
    },
    {
        title: 'Schäden an der Balkonplatte',
        desc: 'Abplatzender Beton, freiliegender oder rostender Stahl und Feuchte an der Decke darunter gehören in die Hand eines Fachplaners für Betoninstandsetzung – bevor ein neuer Belag kommt.'
    }
];

const CAUSES = [
    {
        title: 'Fehlendes Gefälle',
        text: 'Liegt die Fläche waagerecht oder sogar zum Haus geneigt, bleibt Wasser stehen, dringt in Fugen ein und gefriert im Winter.'
    },
    {
        title: 'Abdichtungsfehler',
        text: 'Keine Abdichtung, eine Abdichtung ohne ausreichend hohe Anschlüsse an Wand und Tür oder eine Abdichtung unter einem Estrich, der sich dann dauerhaft mit Wasser vollsaugt.'
    },
    {
        title: 'Falscher Aufbau',
        text: 'Innenfliesen ohne Frostbeständigkeit, ein Mörtelbett ohne Entwässerung, fehlende Bewegungsfugen oder eine Kante, über die Wasser an der Stirnseite herunterläuft.'
    }
];

const STEPS = [
    {
        step: '01',
        title: 'Rückbau',
        text: 'Alter Belag, Mörtelbett und – wenn nötig – ein durchfeuchteter Estrich werden entfernt, bis ein tragfähiger Untergrund freiliegt.'
    },
    {
        step: '02',
        title: 'Untergrundprüfung',
        text: 'Wir prüfen Tragfähigkeit, Feuchte, Ebenheit und Gefälle. Schäden an der Betonplatte selbst werden vor dem Weiterbau durch einen Fachbetrieb instand gesetzt.'
    },
    {
        step: '03',
        title: 'Gefälle & Abdichtung',
        text: 'Ein Gefälle vom Gebäude weg wird hergestellt, darauf folgt die Abdichtung mit sauber ausgebildeten Anschlüssen an Wand, Tür, Brüstung und Durchdringungen.'
    },
    {
        step: '04',
        title: 'Neuer Belag',
        text: 'Je nach Aufbauhöhe und Situation folgt ein Belag auf Stelzlagern, im Splittbett oder in gebundener Verlegung – mit Randabschluss und Tropfkante.'
    }
];

const FURTHER_READING = [
    { label: 'Aufbauten im Vergleich: Balkon & Terrasse', href: '/balkon-terrasse' },
    { label: 'Platten auf Stelzlagern', href: '/balkon-terrasse/stelzlager' },
    { label: 'Leistung: Untergrund & Abdichtung', href: '/leistungen/untergrund' },
    { label: 'Persönliche Beratung', href: '/beratung' }
];

// Ein Fachthema als Zeile an der Fuge: Überschrift (H2 wie im Bestand) links in vier Spalten, Text rechts in Lesebreite
function Fachthema({ titelId, titel, children }) {
    return (
        <article aria-labelledby={titelId} className="grid gap-y-6 border-t border-fuge py-12 first:border-tinte lg:grid-cols-12 lg:gap-x-12">
            <h2 id={titelId} className="text-fs-5 text-tinte lg:col-span-4">
                {titel}
            </h2>
            <div className="max-w-mass space-y-4 font-text text-fs-3 text-tinte-2 lg:col-span-8">{children}</div>
        </article>
    );
}

export default function BalkonsanierungPage() {
    return (
        <>
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Knöpfe; rechts das Planblatt „balkon“ */}
            <section aria-labelledby="balkonsanierung-heading">
                <Einstieg
                    art="erzaehl"
                    etikett="Sanierung von Bestandsbalkonen"
                    titel={
                        <span id="balkonsanierung-heading">
                            Balkon sanieren:{' '}
                            <span>vom undichten Altbelag zur dauerhaften Lösung</span>
                        </span>
                    }
                    vorspann={
                        <p>
                            Balkon sanieren: Vom undichten Altbelag zur dauerhaften Lösung mit Gefälle, normgerechter Verbundabdichtung und frostsicheren Stelzlagern. Ausblühungen, Abplatzungen und Feuchteschäden packen wir an der Wurzel an, statt Schadstellen nur oberflächlich zu überdecken.
                        </p>
                    }
                    aktionen={
                        <>
                            <Knopf href="/kontakt" icon="pfeil-rechts">
                                Balkon begutachten lassen
                            </Knopf>
                            <Knopf href="/leistungen/aussen" variante="neben">
                                Leistung Außenbereiche
                            </Knopf>
                        </>
                    }
                    rand={
                        <Planblatt felder={planfelder('Balkonsanierung', 'balkon')}>
                            <Verlegeplan plan="balkon" ohneAchse bemassung={false} interaktiv />
                        </Planblatt>
                    }
                />
            </section>

            <Leitachse>
                {/* 2. SCHADENSBILDER: sechs Felder, drei Spalten ab lg, zwei ab md – ohne Restzelle */}
                <Abschnitt
                    titelId="balkon-schaden-heading"
                    leitachse
                    spaet
                    etikett="Schadensbilder"
                    // &shy; an der Fuge des Kompositums (K-006, Darstellung, Wortlaut gleich; Muster /unternehmen): bei 375 px
                    // und erhöhten Textabständen (WCAG 1.4.12) trennt „sanierungs-bedürftigen“ dort, statt 3 px über den Rand
                    // der spaet-Hülle zu laufen und beschnitten zu werden (R-02b)
                    titel={<>Woran Sie einen sanierungs&shy;bedürftigen Balkon erkennen</>}
                >
                    <Feldraster spalten={3}>
                        {DAMAGE.map((item) => (
                            <Feld key={item.title}>
                                <h3 className="font-anzeige text-fs-4 text-tinte">{item.title}</h3>
                                <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">{item.desc}</p>
                            </Feld>
                        ))}
                    </Feldraster>
                </Abschnitt>

                {/* 3. URSACHEN: Kopf links; rechts drei Zeilen an der Fuge, die Nummer in Mono (für Screenreader verborgen wie im
                    Bestand), darunter der Verweis auf die Schadensanalyse */}
                <Abschnitt
                    titelId="balkon-ursachen-heading"
                    flaeche="fliese"
                    leitachse
                    spaet
                    kopf="seitlich"
                    etikett="Ursachen"
                    titel="Drei Fehler stecken hinter fast jedem Schaden"
                >
                    <ol className="border-t border-tinte">
                        {CAUSES.map((cause, index) => (
                            <li key={cause.title} className="flex gap-6 border-b border-fuge py-6">
                                <span aria-hidden="true" className="w-8 shrink-0 font-mono text-fs-2 text-tinte-2">
                                    {index + 1}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-anzeige text-fs-4 text-tinte">{cause.title}</h3>
                                    <p className="mt-2 max-w-mass font-text text-fs-2 text-tinte-2">{cause.text}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                    <p className="mt-8 max-w-mass font-text text-fs-2 text-tinte-2">
                        Welche Ursache bei Ihrem Balkon vorliegt, klären wir vor Ort. Wie wir dabei vorgehen, beschreibt die Seite{' '}
                        <Link href="/schadensanalyse" className={linkKlassen}>
                            Schadensanalyse
                        </Link>
                        .
                    </p>
                </Abschnitt>

                {/* 4. ABLAUF: vier Schritte als Schrittfolge (ab lg waagrecht); Nummern für Screenreader verborgen wie im Bestand */}
                <Abschnitt
                    titelId="balkon-ablauf-heading"
                    leitachse
                    spaet
                    etikett="Ablauf"
                    titel={
                        <>
                            In vier Schritten zum{' '}
                            <span>sanierten Balkon</span>
                        </>
                    }
                >
                    <Schrittfolge
                        ausrichtung="waagrecht"
                        nummerStumm
                        schritte={STEPS.map((item) => ({ nummer: item.step, titel: item.title, text: item.text }))}
                    />
                    <p className="mt-8 max-w-mass font-text text-fs-2 text-tinte-2">
                        Welcher Belagsaufbau im vierten Schritt passt, vergleichen wir im{' '}
                        <Link href="/balkon-terrasse" className={linkKlassen}>
                            Ratgeber Balkon &amp; Terrasse
                        </Link>
                        .
                    </p>
                </Abschnitt>

                {/* 5. FACHDETAILS: drei Themen als Text an der Fuge (H2 wie im Bestand), darunter der Hinweis zum Leistungsumfang */}
                <Abschnitt flaeche="fliese" leitachse spaet>
                    <Fachthema titelId="balkon-gefaelle-heading" titel="Gefälle vom Gebäude weg und Entwässerung">
                        <p>
                            Als Richtwert planen wir ein Gefälle von 1,5 bis 2 % vom Gebäude weg – also 1,5 bis 2 cm Höhenunterschied
                            pro Meter. Es gehört in die Abdichtungsebene, damit auch Wasser, das durch den Belag dringt, sicher
                            abläuft.
                        </p>
                        <p>
                            Am Tiefpunkt nimmt eine Rinne, ein Speier oder ein Ablauf das Wasser auf. Bei umschlossenen Balkonen und
                            Loggien gehört ein Notüberlauf dazu, damit bei verstopftem Ablauf kein Wasser zur Tür läuft.
                        </p>
                    </Fachthema>

                    <Fachthema titelId="balkon-abdichtung-heading" titel="Abdichtung und Anschlüsse an Wand und Brüstung">
                        <p>
                            Die Fläche allein dicht zu bekommen ist selten das Problem – undicht werden Balkone an den Rändern. Die
                            Abdichtung wird deshalb an Hauswand und Brüstung ausreichend hoch über die Belagsoberfläche geführt und
                            an Geländerpfosten, Abläufen und anderen Durchdringungen mit passenden Manschetten eingebunden.
                        </p>
                        <p>
                            Maßgeblich sind DIN 18531-5 für Balkone, Loggien und Laubengänge sowie die Fachregeln des
                            Fliesenhandwerks für Außenbeläge. Welche Lösung im Einzelfall gilt, hängt vom Aufbau ab.
                        </p>
                        <p>
                            Der Anschluss an die Balkontür ist ein eigenes Thema: Mehr dazu im Beitrag{' '}
                            <Link href="/blog/barrierefreier-balkonaustritt" className={linkKlassen}>
                                Barrierefreier Balkonaustritt
                            </Link>
                            .
                        </p>
                    </Fachthema>

                    <Fachthema titelId="balkon-rand-heading" titel="Randabschluss und Tropfkante">
                        <p>
                            An der freien Balkonkante muss das Wasser abtropfen, statt an der Stirnseite herunterzulaufen. Sonst
                            entstehen Kalkfahnen, Schmutzstreifen und Frostschäden an der Plattenkante und am Beton darunter.
                        </p>
                        <p>
                            Ein Randprofil mit Tropfkante, zum Beispiel aus pulverbeschichtetem Aluminium, wird fest mit der
                            Abdichtung verbunden und schließt den Belag sauber ab. Bei Stelzlagern übernimmt eine Randblende diese
                            Aufgabe und hält die Lager unsichtbar.
                        </p>
                    </Fachthema>

                    {/* Hinweis in der Form des Bausteins (Rahmen, Kante links, Info-Zeichen); der Titel steht im Satz wie im Bestand.
                        Ab lg in der Textspalte der Fachthemen und so breit wie deren Text (max-w-mass in der Fließtextstufe) */}
                    <div className="grid lg:grid-cols-12 lg:gap-x-12">
                        <div className="max-w-mass text-fs-3 lg:col-span-8 lg:col-start-5">
                            <div className="flex items-start gap-4 border border-l-2 border-strich bg-fliese p-6 font-text text-fs-2 text-tinte">
                                <Icon name="info" groesse={5} className="mt-1 text-tinte" />
                                <p className="min-w-0">
                                    <strong className="font-semibold">Was wir übernehmen – und was nicht:</strong> Rückbau, Gefälle,
                                    Abdichtung und Belag sind Fliesenlegerarbeit. Betoninstandsetzung, Bewehrungsschäden und die Statik der
                                    Balkonplatte gehören zu spezialisierten Fachplanern und -betrieben, ebenso Arbeiten am Geländer. Wenn wir
                                    solche Schäden feststellen, sagen wir es Ihnen vor Beginn.
                                </p>
                            </div>
                        </div>
                    </div>
                </Abschnitt>

                {/* 6. BEGUTACHTUNG VOR ORT: Überschrift, Einleitung und drei Wege als Knöpfe; Telefon und WhatsApp aus COMPANY_DATA */}
                <Abschnitt
                    titelId="balkonsanierung-cta-heading"
                    leitachse
                    spaet
                    etikett="Begutachtung vor Ort"
                    titel="Schicken Sie uns Fotos Ihres Balkons"
                    einleitung={
                        <p>
                            Aufnahmen von Fläche, Kante, Unterseite und Türanschluss helfen bei der ersten Einschätzung. Den Aufbau prüft{' '}
                            {COMPANY_DATA.owner.fullName} anschließend beim Aufmaß vor Ort.
                        </p>
                    }
                >
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Knopf href="/kontakt" icon="pfeil-rechts">
                            Balkonsanierung anfragen
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
                    <nav aria-labelledby="balkonsanierung-ratgeber-heading">
                        <h2 id="balkonsanierung-ratgeber-heading" className="max-w-mass text-fs-6 text-tinte">
                            Weiterführende Ratgeber zur Balkonsanierung
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
        </>
    );
}
