"use client";
import React from 'react';
import Link from 'next/link';
import { CalendarCheck, Phone, MessageCircle, Mail, Clock, ArrowRight } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';

// Formerly an external calendar embed. Appointments are now arranged directly
// with the company (phone, WhatsApp, e-mail) – no third-party widget.
const CalendlySection = () => {
    const { contact, hours, owner } = COMPANY_DATA;

    const channels = [
        {
            icon: Phone,
            label: 'Telefon',
            value: contact.phone,
            href: `tel:${contact.phoneLink}`
        },
        {
            icon: MessageCircle,
            label: 'WhatsApp',
            value: contact.whatsapp,
            href: contact.whatsappLink,
            external: true
        },
        {
            icon: Mail,
            label: 'E-Mail',
            value: contact.email,
            href: `mailto:${contact.email}?subject=${encodeURIComponent('Terminanfrage Beratung / Vor-Ort-Aufmaß')}`
        }
    ];

    return (
        <section id="booking" className="py-16 sm:py-20 scroll-mt-28" aria-labelledby="booking-heading">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="ceramic-hero rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden">
                    <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
                        <span className="icon-chip w-14 h-14 rounded-2xl mx-auto">
                            <CalendarCheck className="w-7 h-7" />
                        </span>
                        <h2 id="booking-heading" className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                            Termin vereinbaren
                        </h2>
                        <p className="text-base text-slate-700 leading-relaxed">
                            Rufen Sie uns an, schreiben Sie per WhatsApp oder senden Sie eine E-Mail – {owner.fullName} stimmt
                            Ihren Wunschtermin für Beratung und kostenfreies Vor-Ort-Aufmaß persönlich mit Ihnen ab.
                        </p>
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        {channels.map(({ icon: Icon, label, value, href, external }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                    className="group h-full flex flex-col items-center text-center gap-3 p-6 rounded-tile-md bg-white border border-slate-200 hover:-translate-y-0.5 hover:border-orange-500 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                                >
                                    <span className="icon-chip w-12 h-12">
                                        <Icon className="w-6 h-6" />
                                    </span>
                                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-600">{label}</span>
                                    <span className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors break-all">
                                        {value}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-200">
                        <div className="flex items-start gap-3 text-sm text-slate-700">
                            <Clock className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-bold text-slate-900">Erreichbarkeit</p>
                                <p>{hours.formattedWeekdays}</p>
                                <p>{hours.formattedSaturday}</p>
                            </div>
                        </div>
                        <Link href="/kontakt#express-anfrage" className="btn-primary px-7 py-3.5 text-xs w-full md:w-auto">
                            Express-Anfrage stellen
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CalendlySection;
