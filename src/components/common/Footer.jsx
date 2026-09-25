import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    ShieldCheck,
    ArrowRight,
    Award,
    Printer,
    Sparkles,
    MessageCircle,
    Landmark,
    Receipt
} from 'lucide-react';
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
    { icon: Award, title: 'Meisterbetrieb', text: COMPANY_DATA.authority.shortName },
    { icon: ShieldCheck, title: 'DIN 18534', text: 'Verbundabdichtung' },
    { icon: Sparkles, title: 'Staubschutz-Garantie', text: 'bei bewohnten Sanierungen' },
    { icon: Receipt, title: 'Festpreisgarantie', text: 'transparent kalkuliert' }
];

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { headquarters, contact, hours, authority, tax, owner, motto } = COMPANY_DATA;

    return (
        <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 relative overflow-hidden">
            {/* Guarantee plinth */}
            <div className="border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
                        {GUARANTEES.map(({ icon: Icon, title, text }) => (
                            <li key={title} className="flex items-center gap-3">
                                <span className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                                    <Icon className="w-5 h-5 text-emerald-400" />
                                </span>
                                <span className="text-xs leading-snug">
                                    <span className="block font-black text-white">{title}</span>
                                    <span className="text-slate-300">{text}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                    <Link href="/kontakt" className="btn-primary shrink-0 self-start lg:self-auto">
                        Kostenfreies Vor-Ort-Aufmaß
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Link catalogue & master data */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
                    {/* Master data */}
                    <div className="lg:col-span-4 space-y-5">
                        <Link href="/" className="inline-flex items-center gap-3 group" aria-label="Fliesenverlegung Tezgel – Startseite">
                            <Image
                                src="/images/logo/tezgel-mark.svg"
                                alt="Fliesenverlegung Tezgel Meisterbetrieb"
                                width={44}
                                height={44}
                                className="w-11 h-11 rounded-2xl shrink-0 group-hover:scale-105 transition-transform duration-300"
                            />
                            <span>
                                <span className="font-display block text-base font-black text-white leading-tight group-hover:text-emerald-300 transition-colors">
                                    {COMPANY_DATA.legalName}
                                </span>
                                <span className="block text-[11px] font-bold uppercase tracking-widest text-slate-300">
                                    Inh. {owner.fullName} &middot; Handwerksmeister
                                </span>
                            </span>
                        </Link>

                        <blockquote className="rounded-2xl bg-slate-800/60 border border-slate-700 px-4 py-3 text-sm italic text-slate-200">
                            „{motto}“
                        </blockquote>

                        <address className="not-italic space-y-2.5 text-sm">
                            <p className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{headquarters.street}, {headquarters.postalCode} {headquarters.city}</span>
                            </p>
                            <p className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                                <a href={`tel:${contact.phoneLink}`} className="hover:text-white underline-offset-4 hover:underline">
                                    {contact.phone}
                                </a>
                            </p>
                            <p className="flex items-center gap-2.5">
                                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                                <a href={contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-white underline-offset-4 hover:underline">
                                    Mobil &amp; WhatsApp: {contact.mobile}
                                </a>
                            </p>
                            <p className="flex items-center gap-2.5">
                                <Printer className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>Fax: {contact.fax}</span>
                            </p>
                            <p className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                                <a href={`mailto:${contact.email}`} className="hover:text-white underline-offset-4 hover:underline">
                                    {contact.email}
                                </a>
                            </p>
                            <p className="flex items-start gap-2.5">
                                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span>
                                    {hours.formattedWeekdays}
                                    <br />
                                    {hours.formattedSaturday}
                                </span>
                            </p>
                        </address>

                        <dl className="grid grid-cols-2 gap-3 text-xs">
                            <div className="rounded-2xl bg-slate-800/60 border border-slate-700 p-3">
                                <dt className="flex items-center gap-1.5 font-black text-white mb-0.5">
                                    <Landmark className="w-3.5 h-3.5 text-emerald-400" />
                                    Kammer
                                </dt>
                                <dd>{authority.name}</dd>
                            </div>
                            <div className="rounded-2xl bg-slate-800/60 border border-slate-700 p-3">
                                <dt className="flex items-center gap-1.5 font-black text-white mb-0.5">
                                    <Receipt className="w-3.5 h-3.5 text-emerald-400" />
                                    USt-IdNr.
                                </dt>
                                <dd>{tax.ustId}</dd>
                            </div>
                        </dl>
                    </div>

                    {/* Link columns */}
                    {LINK_COLUMNS.map((column) => (
                        <nav key={column.title} aria-label={column.title} className="lg:col-span-2">
                            <h2 className="font-display text-xs font-black uppercase tracking-widest text-white mb-4 pl-2.5 border-l-2 border-emerald-400">
                                {column.title}
                            </h2>
                            <ul className="space-y-2 text-sm">
                                {column.links.map((item) => (
                                    <li key={item.path + item.name}>
                                        <Link
                                            href={item.path}
                                            className="inline-block py-0.5 text-slate-300 hover:text-white hover:translate-x-0.5 transition-all duration-300"
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

            {/* Bottom bar */}
            <div className="bg-slate-950 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-28 md:pb-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-slate-300">
                    <p className="text-center lg:text-left">
                        &copy; {currentYear} {COMPANY_DATA.legalName} &middot; Inh. {owner.fullName} &middot; Alle Rechte vorbehalten.
                    </p>
                    <nav aria-label="Rechtliches">
                        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                            {footerLegalLinks.map((item) => (
                                <li key={item.path}>
                                    <Link href={item.path} className="hover:text-white underline-offset-4 hover:underline">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <p>
                        Webdesign:{' '}
                        <a
                            href="https://www.codayweb.de/"
                            target="_blank"
                            rel="noopener"
                            title="Coday Webdesign Wetzlar"
                            className="font-bold text-white hover:text-emerald-300 underline-offset-4 hover:underline"
                        >
                            codayweb
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
