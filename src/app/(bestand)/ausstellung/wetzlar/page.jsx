// Fliesenberatung Wetzlar (S-22 · E6-BAU-03, KERN v2): Arbeitsansicht nach dem Muster von (bestand)/kontakt (Ort, Zeiten, Weg)
// und (bestand)/standorte/[stadt] (Leistungen vor Ort als Felder). Kompakter Einstieg mit Kennzeile, H1, Vorspann und den drei
// Wegen als Knöpfe; danach der Ablauf als Zeitleiste und daneben der Direktkontakt als Schriftfeld-Spalte (Firmensitz und
// Geschäftszeiten in Mono, dazwischen die Wege an der Fuge, ab lg klebend wie im Bestand); dann die Beratungsthemen als
// Feldraster (je Fachgewerk ein Feld, Fliese-Fläche) und das Qualitätsversprechen. Keine Karte (der Bestand hat keine), kein
// großer Moment, keine Auftritte. Texte, Überschriften, Links, IDs, Metadaten und Lesefolge wie im Bestand.
import Link from 'next/link';
import clsx from 'clsx';
import { COMPANY_DATA, processSteps } from '@/config/company';
import { SERVICES } from '@/config/services';
import { CITIES } from '@/config/cities';
import QualityPromise from '@/components/sections/QualityPromise';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Knopf from '@/components/kern/Knopf';
import Schrittfolge from '@/components/kern/Schrittfolge';
import Schriftfeld from '@/components/kern/Schriftfeld';
import { Feld, Feldraster } from '@/components/kern/Feldraster';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Icon from '@/components/icons/Icon';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import { etikettKlassen, linkKlassen, seitenKlassen } from '@/components/kern/stile';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
    title: 'Fliesenberatung in Wetzlar | Fliesenverlegung Tezgel',
    description: 'Persönliche Fliesenberatung für Wetzlar: Formate, Oberflächen & Fugenbild abstimmen mit Fachbetriebsleiter Deniz Tezgel. Jetzt Termin vereinbaren!',
    path: '/ausstellung/wetzlar'
});

const CITY_SLUG = 'wetzlar';

// Fachzeichen der eigenen Icon-Familie je Leistung (vormals lucide; Zuordnung wie im Anfrage-Funnel)
const SERVICE_ICONS = {
    bad: 'bad',
    wohnen: 'fliese',
    aussen: 'balkon',
    untergrund: 'untergrund'
};

// Weg im Direktkontakt: Zeile an der Fuge, Wert in Mono, unterstrichen wie ein Textlink (Farbwechsel ohne Überblendung)
const WEG = 'group flex min-h-11 items-center gap-3 bg-fliese p-4 font-mono text-fs-2 text-tinte';
const WEG_WERT = 'underline decoration-strich underline-offset-4 group-hover:decoration-tinte';
// Textlink in einer Überschrift: Unterstreichung erst bei Hover (die Aktion des Felds ist der Link darunter)
const TITEL_LINK = 'underline decoration-transparent underline-offset-4 hover:decoration-tinte';

// Zeitangabe mit Zusatz in Klammern: der Zusatz bricht mobil als Ganzes um, nicht am Bindestrich (Wortlaut unverändert)
function mitZusatz(text) {
    const i = text.indexOf(' (');
    if (i < 0) return text;
    return (
        <>
            {text.slice(0, i)} <span className="whitespace-nowrap">{text.slice(i + 1)}</span>
        </>
    );
}

export default function AusstellungWetzlarPage() {
    const { headquarters, contact, hours, owner } = COMPANY_DATA;
    const city = CITIES.find((c) => c.slug === CITY_SLUG);
    const cityName = city?.name || 'Wetzlar';
    const locationNote = city && city.distanceKm > 0
        ? `ca. ${city.distanceKm} km ab Wetzlar`
        : `direkt neben unserem Firmensitz in ${headquarters.city}`;

    return (
        <>
            {/* 1. EINSTIEG: Kennzeile (vormals Badge), H1, Vorspann; Anfrage als Hauptknopf, WhatsApp und Telefon als Nebenknöpfe */}
            <Einstieg
                art="arbeit"
                etikett={
                    <>
                        <Icon name="kalender" groesse={4} />
                        Nach Terminvereinbarung
                    </>
                }
                titel={<>Fliesenberatung &amp; Materialauswahl in {cityName}</>}
                vorspann={
                    <p>
                        Welche Fliese passt zu Ihrem Bad, Ihrem Wohnbereich oder Ihrer Terrasse? In einem persönlichen
                        Beratungstermin klärt Inhaber {owner.fullName} mit Ihnen Formate, Oberflächen, Fugenbild und
                        Rutschhemmung – für {cityName} und Umgebung, {locationNote}.
                    </p>
                }
                aktionen={
                    <>
                        <Knopf href="/kontakt" icon="pfeil-rechts">
                            Beratung für Wetzlar anfragen
                        </Knopf>
                        <Knopf href={contact.whatsappLink} extern variante="neben" vorne={<WhatsAppLogo className="size-5 shrink-0" />}>
                            WhatsApp
                        </Knopf>
                        <Knopf href={`tel:${contact.phoneLink}`} variante="neben" iconLinks="telefon">
                            <span className="font-mono font-normal">{contact.phone}</span>
                        </Knopf>
                    </>
                }
            />

            {/* 2. ABLAUF UND DIREKTKONTAKT: links die Zeitleiste (Schrittfolge senkrecht, Nummer stumm wie im Bestand) mit dem
                Terminhinweis, rechts der Direktkontakt als Schriftfeld-Spalte; mobil und Tablett untereinander */}
            <div className="py-12 lg:py-16">
                <div className={seitenKlassen}>
                    <div className="grid grid-cols-4 items-start gap-y-12 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-12">
                        <section className="col-span-4 md:col-span-8 lg:col-span-7" aria-labelledby="ablauf-heading">
                            <p className={clsx(etikettKlassen, 'mb-4')}>
                                <Fugenkreuz className="size-3 shrink-0 text-strich" />
                                Ihr Beratungstermin
                            </p>
                            <h2 id="ablauf-heading" className="text-fs-5 text-tinte">
                                So läuft die Beratung ab
                            </h2>

                            <Schrittfolge
                                className="mt-12"
                                titelEbene="div"
                                untertitelOben
                                nummerStumm
                                schritte={processSteps.map((step) => ({
                                    nummer: step.step,
                                    untertitel: step.subtitle,
                                    titel: step.title,
                                    text: step.description
                                }))}
                            />

                            <div className="mt-12 flex items-start gap-4 border border-l-2 border-strich bg-fliese p-6 font-text text-fs-2 text-tinte">
                                <Icon name="info" groesse={5} className="mt-1 text-tinte" />
                                <p>
                                    Für die Fliesenausstellung in Wetzlar vergeben wir Termine flexibel nach Vereinbarung – kontaktieren Sie uns direkt per WhatsApp, Telefon oder über unser{' '}
                                    <Link href="/kontakt" className={linkKlassen}>
                                        Kontaktformular
                                    </Link>
                                    .
                                </p>
                            </div>
                        </section>

                        {/* Direktkontakt: Firmensitz und Geschäftszeiten als Schriftfeld (Etikett in Mono über dem Wert), die drei
                            Wege dazwischen als Zeilen derselben Fugenspalte; „Termin anfragen“ als Hauptknopf darunter */}
                        <aside className="col-span-4 md:col-span-8 lg:sticky lg:top-24 lg:col-span-5" aria-labelledby="kontakt-heading">
                            <p className={clsx(etikettKlassen, 'mb-4')}>
                                <Fugenkreuz className="size-3 shrink-0 text-strich" />
                                Direktkontakt
                            </p>
                            <h2 id="kontakt-heading" className="text-fs-5 text-tinte">
                                {COMPANY_DATA.legalName}
                            </h2>

                            <Schriftfeld
                                spalten={1}
                                className="mt-6"
                                felder={[
                                    {
                                        etikett: 'Firmensitz:',
                                        wert: (
                                            <span className="font-mono">
                                                {headquarters.street}, {headquarters.postalCode} {headquarters.city}
                                            </span>
                                        )
                                    }
                                ]}
                            />
                            <ul className="grid gap-px border-x border-fuge bg-fuge">
                                <li>
                                    <a href={`tel:${contact.phoneLink}`} className={WEG}>
                                        <Icon name="telefon" groesse={5} className="text-tinte-2" />
                                        <span className={WEG_WERT}>{contact.phone}</span>
                                    </a>
                                </li>
                                <li>
                                    <a href={contact.whatsappLink} target="_blank" rel="noopener noreferrer" className={WEG}>
                                        <Icon name="sprechblase" groesse={5} className="text-tinte-2" />
                                        <span className={WEG_WERT}>WhatsApp: {contact.mobile}</span>
                                    </a>
                                </li>
                                <li>
                                    <a href={`mailto:${contact.email}`} className={WEG}>
                                        <Icon name="mail" groesse={5} className="text-tinte-2" />
                                        <span className={WEG_WERT}>{contact.email}</span>
                                    </a>
                                </li>
                            </ul>
                            <Schriftfeld
                                spalten={1}
                                felder={[
                                    {
                                        etikett: 'Geschäftszeiten',
                                        wert: (
                                            <>
                                                <p className="font-mono">{hours.formattedWeekdays}</p>
                                                <p className="font-mono">{mitZusatz(hours.formattedSaturday)}</p>
                                            </>
                                        )
                                    }
                                ]}
                            />

                            <Knopf href="/kontakt" icon="pfeil-rechts" className="mt-6 w-full">
                                Termin anfragen
                            </Knopf>
                        </aside>
                    </div>
                </div>
            </div>

            {/* 3. BERATUNGSTHEMEN: je Fachgewerk ein Feld mit Fachzeichen, Titel-Link, Kurztext und Verweis; zwei Spalten über die
                volle Breite (in vier Spalten brechen die Komposita der Titel bei 1024 px, ein seitlicher Kopf ließe links eine leere
                Rasterspalte); darunter der Verweis aufs Einsatzgebiet */}
            <Abschnitt
                art="arbeit"
                flaeche="fliese"
                spaet
                titelId="themen-heading"
                etikett="Beratungsthemen"
                titel={<>Wobei wir Sie in {cityName} beraten</>}
            >
                <Feldraster spalten={2}>
                    {SERVICES.map((srv) => {
                        const icon = SERVICE_ICONS[srv.id];
                        const serviceCityUrl = `/leistungen/${srv.id}/${CITY_SLUG}`;
                        return (
                            <Feld key={srv.id}>
                                <div className="flex-1">
                                    {icon && <Icon name={icon} groesse={6} className="text-tinte-2" />}
                                    <h3 className="mt-4 text-fs-4 text-tinte">
                                        <Link href={serviceCityUrl} className={TITEL_LINK}>
                                            {srv.name} in {cityName}
                                        </Link>
                                    </h3>
                                    <p className="mt-3 font-text text-fs-2 text-tinte-2">{srv.shortDescription}</p>
                                </div>
                                <Link
                                    href={serviceCityUrl}
                                    className="group mt-6 flex min-h-11 items-center justify-between gap-3 border-t border-fuge pt-4 font-text text-fs-2 font-semibold text-tinte"
                                >
                                    <span className={WEG_WERT}>{srv.name} für {cityName} ansehen</span>
                                    <Icon name="pfeil-rechts" groesse={5} />
                                </Link>
                            </Feld>
                        );
                    })}
                </Feldraster>
                <p className="mt-8 font-text text-fs-2 text-tinte-2">
                    Mehr zu unserem Einsatzgebiet:{' '}
                    <Link href={`/standorte/${CITY_SLUG}`} className={linkKlassen}>
                        Fliesenverlegung in {cityName}
                    </Link>
                </p>
            </Abschnitt>

            {/* 4. QUALITÄT: Bestandsbaustein (Merkliste), unverändert eingebunden, Stufen der Arbeitsansicht */}
            <QualityPromise art="arbeit" />
        </>
    );
}
