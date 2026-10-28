import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import BannerPlatz from '@/components/common/BannerPlatz';
import SprungHalter from '@/components/common/SprungHalter';
import FussGruppe from '@/components/common/FussGruppe';
import { seitenKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';
import { footerGruppen, footerLegalLinks } from '@/config/navigation';
import { oeffnungszeilen } from '@/lib/oeffnungszeiten';
import Rufnummer from '@/components/kern/Rufnummer';
import Karussell from '@/components/kern/Karussell';
import BewegungsSchalter from '@/components/kern/BewegungsSchalter';
import { zusammen } from '@/components/kern/zusammen';

const LINK_COLUMNS = footerGruppen;

// Belege aus dem Faktenblatt K-015 (F-05, F-15, F-17, F-12; Sitz und Einsatzgebiet aus COMPANY_DATA), keine Garantien (M-07).
// In Alltagssprache als langsames Laufband von rechts nach links (K-016 „Ruhe“, E-047): man soll sie lesen, ohne dass sie wie
// eine Liste von Qualifikationen wirken.
const GUARANTEES = [
    { title: 'Vor Ort in Aßlar, Wetzlar und Umgebung', text: 'Deniz Tezgel kommt selbst zu Ihnen' },
    { title: 'Eingetragen bei der Handwerkskammer', text: COMPANY_DATA.authority.name },
    // führt zur Wissensseite der Norm (E3-NORMEN, K-016: Fachtext auf eigenen Seiten statt im Laufband)
    { title: 'Abdichtung nach der Norm für Bäder', text: 'DIN 18534, bei uns Standard seit 2019', href: '/untergrund-abdichtung/din-18534' },
    { title: 'Staubschutz', text: 'wenn Sie während der Arbeiten im Haus wohnen' },
    { title: 'Termin bei Ihnen vor Ort', text: 'für Sie kostenfrei' }
];

// Feldnamen in Archivo, Mono nur für Nummern und Zahlen (K-006, Sichtprüfung E2)
const etikett = 'font-text text-fs-1 font-semibold text-nacht-2';
const fussLink = 'text-kalk underline decoration-nacht-fuge underline-offset-4 transition-colors dauer-1 ease-setzen hover:decoration-kalk';

// Fuß (KERN v3 K-009): Tinte-Fläche; oben belegte Fakten an der Fuge, links das Schriftfeld des Betriebs
// (wie das Stempelfeld eines Verlegeplans), rechts der vollständige Seitenindex in sieben Gruppen (Auftrag Abschnitt 6).
// Breiten (R-01a): Zusagen mobil einspaltig, ab sm zwei, ab xl vier Felder; der Seitenindex ab lg zwei, ab xl vier
// Spalten. So passen die langen Wörter („Verbundabdichtung“, „Qualitätsversprechen“) in jeder Breite in ihr Feld, auch
// bei erhöhtem Textabstand (WCAG 1.4.12) – vorher ragten sie mobil über den waagerechten clip des Fußes (N-01b) und
// zwischen 768 und 1279 px ins Nachbarfeld. Wird es enger (Zoom), bricht das Wort im Feld um, statt zu überstehen.
export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { headquarters, contact, hours, authority, tax, owner, motto, business } = COMPANY_DATA;

    return (
        // spätes Zeichnen (content-visibility, globals.css): der Fuß steht auf jeder Seite unter dem ersten Bildschirm; Stil und
        // Layout seiner rund 300 Elemente erst in Sichtnähe (Spur der Startseite: lange Aufgaben 1,2 s auf 0,9 s bei
        // vierfacher Drosselung, E3-LEIST-01)
        <footer className="spaet-zeichnen flaeche-tinte border-t border-nacht-fuge bg-tinte text-kalk">
            {/* Zusagen, Stammdaten und Seitenindex sind eine eigene Hydrierungseinheit (Reaktion eines frühen Tipps, E-033). Die
                untere Zeile mit #fuss-schild bleibt im Rahmen: Die Einwilligung setzt ihren Knopf per Portal dorthin, bevor eine
                spätere Grenze hydriert wäre (sonst Abweichung und Neuaufbau des Fußes). */}
            <Suspense>
                <div className="border-b border-nacht-fuge">
                    <div className={clsx(seitenKlassen, 'py-6')}>
                        <Karussell art="band" name="Was Sie von uns erwarten können" dunkel>
                            {GUARANTEES.map(({ title, text, href }) => (
                                <p key={title} className="flex items-start gap-3 text-fs-2">
                                    <Fugenkreuz className="mt-1 size-4 shrink-0 text-nacht-2" />
                                    <span>
                                        {href ? (
                                            <Link href={href} data-motion="zustand" className="font-semibold text-kalk underline decoration-nacht-2 underline-offset-4 hover:decoration-kalk focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kalk">
                                                {title}
                                            </Link>
                                        ) : (
                                            <span className="font-semibold text-kalk">{title}</span>
                                        )}
                                        {/* Mittelpunkt hängt am Wort davor, die Normnummer bleibt beisammen (Browserprüfung E4-W1, Runde 2) */}
                                        <span className="text-nacht-2">{'\u00a0· '}{zusammen(text)}</span>
                                    </span>
                                </p>
                            ))}
                        </Karussell>
                    </div>
                </div>

                <div className={clsx(seitenKlassen, 'grid grid-cols-1 gap-12 py-16 lg:grid-cols-12 lg:gap-8')}>
                    <div className="flex flex-col gap-6 lg:col-span-5">
                        {/* Die Zeile mit dem Inhaber steht neben dem Link, nicht darin: sichtbarer Text und Name des Links stimmen
                            überein (WCAG 2.5.3, Lighthouse label-content-name-mismatch, E-061) */}
                        <div className="self-start">
                            <Link href="/" className="block w-fit" aria-label="Zur Startseite von Fliesenverlegung Tezgel">
                                <Image
                                    src="/images/logo/tezgel-logo-dark.webp"
                                    alt="Fliesenverlegung Tezgel"
                                    width={220}
                                    height={68}
                                    className="h-12 w-auto shrink-0 object-contain sm:h-16"
                                />
                            </Link>
                            <span className={clsx(etikett, 'mt-3 block')}>
                                Inhaber {owner.fullName} &middot; Fachbetrieb Aßlar / Wetzlar
                            </span>
                        </div>

                        <blockquote className="border-l-2 border-laser pl-4 text-fs-3 text-kalk">
                            &bdquo;{motto}&ldquo;
                        </blockquote>

                        {/* Schriftfeld: Stammdaten in Feldern an der Fuge; als Container, damit die Rufnummer bei großer Systemschrift
                            Vorwahl und Nummer sauber untereinander setzt (unter 18rem Breite, Rufnummer.tsx, E3-START-05) */}
                        <address className="@container grid grid-cols-1 gap-px border border-nacht-fuge bg-nacht-fuge not-italic sm:grid-cols-2">
                            <div className="bg-tinte p-4 sm:col-span-2">
                                <span className={etikett}>Anschrift</span>
                                <span className="mt-1 block text-fs-2">{headquarters.street}, {headquarters.postalCode} {headquarters.city}</span>
                            </div>
                            <div className="bg-tinte p-4">
                                <span className={etikett}>Telefon</span>
                                <a
                                    href={`tel:${contact.phoneLink}`}
                                    className={clsx(fussLink, 'flex min-h-11 items-center text-fs-2')}
                                    data-motion="zustand"
                                    aria-label={`Fliesenverlegung Tezgel telefonisch anrufen: ${contact.phone}`}
                                >
                                    <Rufnummer nummer={contact.phone} />
                                </a>
                            </div>
                            <div className="bg-tinte p-4">
                                <span className={etikett}>Mobil und WhatsApp</span>
                                <a
                                    href={contact.whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={clsx(fussLink, 'flex min-h-11 items-center text-fs-2')}
                                    data-motion="zustand"
                                    aria-label={`Mobil und WhatsApp: ${contact.mobile}, Nachricht an Deniz Tezgel`}
                                >
                                    <Rufnummer nummer={contact.mobile} />
                                </a>
                            </div>
                            <div className="bg-tinte p-4">
                                <span className={etikett}>Fax</span>
                                <Rufnummer nummer={contact.fax} className="mt-1 block text-fs-2" />
                            </div>
                            <div className="bg-tinte p-4">
                                <span className={etikett}>E-Mail</span>
                                <a
                                    href={`mailto:${contact.email}`}
                                    className={clsx(fussLink, 'flex min-h-11 items-center text-fs-2 break-all')}
                                    data-motion="zustand"
                                    aria-label={`E-Mail an Fliesenverlegung Tezgel senden: ${contact.email}`}
                                >
                                    {contact.email}
                                </a>
                            </div>
                            <div className="bg-tinte p-4 sm:col-span-2">
                                <span className={etikett}>Zeiten</span>
                                <span className="mt-1 block text-fs-2">
                                    {oeffnungszeilen(hours).map((zeile) => (
                                        <span key={zeile} className="block">{zeile}</span>
                                    ))}
                                </span>
                            </div>
                        </address>

                        {/* zweispaltig nur, wenn die Kästen ihre Werte fassen (Container-Abfrage in rem, große Systemschrift) */}
                        <div className="@container">
                        <dl className="grid grid-cols-1 gap-px border border-nacht-fuge bg-nacht-fuge @xs:grid-cols-2">
                            <div className="bg-tinte p-4 @xs:col-span-2">
                                <dt className={etikett}>Kammer</dt>
                                <dd className="mt-1 text-fs-2">{authority.name}</dd>
                            </div>
                            <div className="bg-tinte p-4">
                                <dt className={etikett}>Betrieb seit</dt>
                                <dd className="mt-1 font-mono text-fs-2">{business.establishmentYear}</dd>
                            </div>
                            <div className="bg-tinte p-4">
                                <dt className={etikett}>USt-IdNr.</dt>
                                <dd className="mt-1 font-mono text-fs-2 break-all">{tax.ustId}</dd>
                            </div>
                        </dl>
                        </div>
                    </div>

                    {/* Spaltensatz statt Raster: die Gruppen fließen untereinander weiter, statt dass die zweite Reihe erst unter der
                        längsten Gruppe der ersten beginnt (Loch unter „Bad“, Browserprüfung E4-W0, E-065) */}
                    <div id="seitenindex" className="gap-x-8 sm:columns-2 lg:col-span-7 xl:columns-3">
                        {LINK_COLUMNS.map((column) => (
                            <FussGruppe key={column.title} titel={column.title} kopfKlassen={etikett} className="mb-8 break-inside-avoid">
                                <ul className="mt-3 flex flex-col gap-2 text-fs-2">
                                    {column.links.map((item) => (
                                        <li key={item.path + item.name}>
                                            <Link
                                                href={item.path}
                                                className="inline-block max-w-full py-1 text-kalk underline decoration-transparent underline-offset-4 wrap-break-word transition-colors dauer-1 ease-setzen hover:decoration-kalk"
                                                data-motion="zustand"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </FussGruppe>
                        ))}
                    </div>
                </div>
            </Suspense>
            <div className="border-t border-nacht-fuge">
                <div className={clsx(seitenKlassen, 'flex flex-col items-start gap-4 pb-24 pt-6 font-text text-fs-1 text-nacht-2 lg:pb-6 lg:flex-row lg:items-center lg:justify-between')}>
                    <p>
                        &copy; {currentYear} {COMPANY_DATA.legalName} &middot; Inhaber {owner.fullName} &middot; Alle Rechte vorbehalten.
                    </p>
                    <nav aria-label="Rechtliches">
                        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
                            {footerLegalLinks.map((item) => (
                                <li key={item.path} className={item.path === '#cookie-settings' ? 'lg:hidden' : undefined}>
                                    <Link href={item.path} className={clsx(fussLink, 'inline-flex min-h-11 items-center')} data-motion="zustand">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                            {/* Platz für den Widerruf-Knopf der Einwilligung (ab lg und auf Seiten ohne untere Leiste;
                                eingehängt von CookieConsent, E3-NACH-06) */}
                            <li id="fuss-schild" />
                        </ul>
                    </nav>
                    <BewegungsSchalter dunkel />
                    <p>
                        Webdesign und SEO:{' '}
                        <a
                            href="https://www.codayweb.de/de"
                            target="_blank"
                            rel="noopener"
                            title="Coday, Agentur für Webdesign in Wetzlar"
                            className={clsx(fussLink, 'inline-block py-1 font-semibold')}
                            data-motion="zustand"
                        >
                            Coday, Wetzlar
                        </a>
                    </p>
                </div>
            </div>
            {/* Rahmen-Inseln ohne Ausgabe (R-01a): Platz des offenen Einwilligungsbanners für scroll-padding (Fokus nie
                verdeckt) und Sprungziel halten, solange Inhalt darüber nachwächst */}
            <BannerPlatz />
            <SprungHalter />
        </footer>
    );
}
