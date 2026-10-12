import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import BannerPlatz from '@/components/kern/einwilligung/BannerPlatz';
import SprungHalter from '@/components/kern/fuss/SprungHalter';
import { knopfKlassen, seitenKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';
import {
    footerBathLinks,
    footerServiceLinks,
    footerLocationLinks,
    footerCompanyLinks,
    footerLegalLinks
} from '@/config/navigation';

const LINK_COLUMNS = [
    { title: 'Badsanierung', links: footerBathLinks },
    { title: 'Fachgewerke & Fachthemen', links: footerServiceLinks },
    { title: 'Standorte Hessen', links: footerLocationLinks },
    { title: 'Unternehmen & Ratgeber', links: footerCompanyLinks }
];

const GUARANTEES = [
    { title: 'HWK Fachbetrieb', text: COMPANY_DATA.authority.shortName },
    { title: 'DIN 18534', text: 'Verbundabdichtung' },
    { title: 'Staubschutz-Garantie', text: 'bei bewohnten Sanierungen' },
    { title: 'Festpreisgarantie', text: 'transparent kalkuliert' }
];

const etikett = 'font-mono text-fs-1 text-nacht-2';
const fussLink = 'text-kalk underline decoration-nacht-fuge underline-offset-4 transition-colors dauer-1 ease-setzen hover:decoration-kalk';

// Fuß (KERN K-009): Tinte-Fläche; oben die Zusagen an der Fuge, links das Schriftfeld des Betriebs
// (wie das Stempelfeld eines Verlegeplans), rechts der Seitenindex. Inhalte wie im Bestand.
// Breiten (R-01a): Zusagen mobil einspaltig, ab sm zwei, ab xl vier Felder; der Seitenindex ab lg zwei, ab xl vier
// Spalten. So passen die langen Wörter („Verbundabdichtung“, „Qualitätsversprechen“) in jeder Breite in ihr Feld, auch
// bei erhöhtem Textabstand (WCAG 1.4.12) – vorher ragten sie mobil über den waagerechten clip des Fußes (N-01b) und
// zwischen 768 und 1279 px ins Nachbarfeld. Wird es enger (Zoom), bricht das Wort im Feld um, statt zu überstehen.
export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { headquarters, contact, hours, authority, tax, owner, motto, business } = COMPANY_DATA;

    return (
        <footer className="flaeche-tinte border-t border-nacht-fuge bg-tinte text-kalk">
            <div className="border-b border-nacht-fuge">
                <div className={clsx(seitenKlassen, 'flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between')}>
                    <ul className="grid grid-cols-1 gap-px bg-nacht-fuge sm:grid-cols-2 lg:flex-1 xl:grid-cols-4">
                        {GUARANTEES.map(({ title, text }, idx) => (
                            <li
                                key={title}
                                className={clsx('flex items-start gap-3 bg-tinte py-4 pr-4', idx % 2 === 1 && 'sm:pl-4', idx === 2 && 'xl:pl-4')}
                            >
                                <Fugenkreuz className="mt-1 size-4 shrink-0 text-nacht-2" />
                                <span className="min-w-0 text-fs-2 wrap-break-word">
                                    <span className="block font-semibold text-kalk">{title}</span>
                                    <span className="text-nacht-2">{text}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                    <Link href="/kontakt" className={knopfKlassen('hell', 'shrink-0 self-start lg:self-auto')} data-motion="druck">
                        Kostenfreies Vor-Ort-Aufmaß
                        <Icon name="pfeil-rechts" groesse={4} />
                    </Link>
                </div>
            </div>

            <div className={clsx(seitenKlassen, 'grid grid-cols-1 gap-12 py-16 lg:grid-cols-12 lg:gap-8')}>
                <div className="flex flex-col gap-6 lg:col-span-5">
                    <Link href="/" className="inline-block self-start" aria-label={`Fliesenverlegung Tezgel – Inh. ${owner.fullName} · Fachbetrieb Aßlar / Wetzlar – Startseite`}>
                        <Image
                            src="/images/logo/tezgel-logo-dark.webp"
                            alt="Fliesenverlegung Tezgel – Fachbetrieb Aßlar & Wetzlar"
                            width={220}
                            height={68}
                            className="h-12 w-auto shrink-0 object-contain sm:h-16"
                        />
                        <span className={clsx(etikett, 'mt-3 block')}>
                            Inh. {owner.fullName} &middot; Fachbetrieb Aßlar / Wetzlar
                        </span>
                    </Link>

                    <blockquote className="border-l-2 border-laser pl-4 text-fs-3 text-kalk">
                        &bdquo;{motto}&ldquo;
                    </blockquote>

                    {/* Schriftfeld: Stammdaten in Feldern an der Fuge */}
                    <address className="grid grid-cols-1 gap-px border border-nacht-fuge bg-nacht-fuge not-italic sm:grid-cols-2">
                        <div className="bg-tinte p-4 sm:col-span-2">
                            <span className={etikett}>Anschrift</span>
                            <span className="mt-1 block text-fs-2">{headquarters.street}, {headquarters.postalCode} {headquarters.city}</span>
                        </div>
                        <div className="bg-tinte p-4">
                            <span className={etikett}>Telefon</span>
                            <a
                                href={`tel:${contact.phoneLink}`}
                                className={clsx(fussLink, 'mt-1 block font-mono text-fs-2')}
                                data-motion="zustand"
                                aria-label={`Fliesenverlegung Tezgel telefonisch anrufen: ${contact.phone}`}
                            >
                                {contact.phone}
                            </a>
                        </div>
                        <div className="bg-tinte p-4">
                            <span className={etikett}>Mobil &amp; WhatsApp</span>
                            <a
                                href={contact.whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={clsx(fussLink, 'mt-1 block font-mono text-fs-2')}
                                data-motion="zustand"
                                aria-label={`Mobil & WhatsApp: ${contact.mobile} – Chat mit Deniz Tezgel starten`}
                            >
                                {contact.mobile}
                            </a>
                        </div>
                        <div className="bg-tinte p-4">
                            <span className={etikett}>Fax</span>
                            <span className="mt-1 block font-mono text-fs-2">{contact.fax}</span>
                        </div>
                        <div className="bg-tinte p-4">
                            <span className={etikett}>E-Mail</span>
                            <a
                                href={`mailto:${contact.email}`}
                                className={clsx(fussLink, 'mt-1 block text-fs-2')}
                                data-motion="zustand"
                                aria-label={`E-Mail an Fliesenverlegung Tezgel senden: ${contact.email}`}
                            >
                                {contact.email}
                            </a>
                        </div>
                        <div className="bg-tinte p-4 sm:col-span-2">
                            <span className={etikett}>Zeiten</span>
                            <span className="mt-1 block text-fs-2">
                                {hours.formattedWeekdays}
                                <br />
                                {hours.formattedSaturday}
                            </span>
                        </div>
                    </address>

                    <dl className="grid grid-cols-2 gap-px border border-nacht-fuge bg-nacht-fuge">
                        <div className="col-span-2 bg-tinte p-4">
                            <dt className={etikett}>Kammer</dt>
                            <dd className="mt-1 text-fs-2">{authority.name}</dd>
                        </div>
                        <div className="bg-tinte p-4">
                            <dt className={etikett}>Betrieb seit</dt>
                            <dd className="mt-1 font-mono text-fs-2">{business.establishmentYear}</dd>
                        </div>
                        <div className="bg-tinte p-4">
                            <dt className={etikett}>USt-IdNr.</dt>
                            <dd className="mt-1 font-mono text-fs-2">{tax.ustId}</dd>
                        </div>
                    </dl>
                </div>

                <div id="seitenindex" className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-7 xl:grid-cols-4 xl:gap-4">
                    {LINK_COLUMNS.map((column) => (
                        <nav key={column.title} aria-label={column.title}>
                            <p className={clsx(etikett, 'border-b border-nacht-fuge pb-2')}>{column.title}</p>
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
                        </nav>
                    ))}
                </div>
            </div>

            <div className="border-t border-nacht-fuge">
                <div className={clsx(seitenKlassen, 'flex flex-col items-start gap-4 pb-24 pt-6 font-mono text-fs-1 text-nacht-2 lg:pb-6 lg:flex-row lg:items-center lg:justify-between')}>
                    <p>
                        &copy; {currentYear} {COMPANY_DATA.legalName} &middot; Inh. {owner.fullName} &middot; Alle Rechte vorbehalten.
                    </p>
                    <nav aria-label="Rechtliches">
                        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
                            {footerLegalLinks.map((item) => (
                                <li key={item.path} className={item.path === '#cookie-settings' ? 'lg:hidden' : undefined}>
                                    <Link href={item.path} className={clsx(fussLink, 'inline-block py-1')} data-motion="zustand">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                            {/* Platz für den Widerruf-Knopf der Einwilligung (ab lg und auf Seiten ohne untere Leiste;
                                eingehängt von CookieConsent, E3-NACH-06) */}
                            <li id="fuss-schild" />
                        </ul>
                    </nav>
                    <p>
                        Webdesign &amp; SEO:{' '}
                        <a
                            href="https://www.codayweb.de/de"
                            target="_blank"
                            rel="noopener"
                            title="Coday – Webdesign-Agentur Wetzlar | Webseiten, SEO & Branding"
                            className={clsx(fussLink, 'inline-block py-1 font-semibold')}
                            data-motion="zustand"
                        >
                            Webdesign Wetzlar – Coday
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
