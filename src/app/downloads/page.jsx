import React from 'react';
import Link from 'next/link';
import { FileText, ArrowRight, ClipboardList, BadgePercent, HelpCircle, Layers, Phone, Mail, FolderOpen } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { createMetadata } from '@/lib/metadata';
import QualityPromise from '@/components/sections/QualityPromise';

export const metadata = createMetadata({
    title: 'Downloads & Infomaterial',
    description: `Informationen rund um Fliesen und Badsanierung von ${COMPANY_DATA.legalName}: Checkliste zur Terminvorbereitung, Förderung, häufige Fragen und Materialien – Unterlagen zu Ihrem Projekt erhalten Sie auf Anfrage.`,
    path: '/downloads'
});

// No downloadable files are currently published (nothing under /public).
// Documents are sent on request; these online guides replace the former PDF list.
const RESOURCES = [
    { icon: ClipboardList, title: 'Checkliste zur Terminvorbereitung', desc: 'Welche Maße, Fotos und Unterlagen Ihnen und uns beim Beratungstermin helfen.', href: '/beratung', cta: 'Zur Checkliste' },
    { icon: BadgePercent, title: 'Förderung & Zuschüsse', desc: 'Pflegekassen-Zuschuss und KfW-Programm 159 für das barrierefreie Bad im Überblick.', href: '/foerderung', cta: 'Zur Förderung' },
    { icon: HelpCircle, title: 'Häufige Fragen', desc: 'Antworten zu Großformaten, Abdichtung nach DIN 18534, Balkon & Terrasse und Festpreisangebot.', href: '/faq', cta: 'Zu den FAQ' },
    { icon: Layers, title: 'Materialien & Systeme', desc: 'Verlegewerkstoffe, Abdichtungssysteme und Fliesen, mit denen wir arbeiten.', href: '/partner', cta: 'Zu den Materialien' }
];

export default function DownloadsPage() {
    const { contact } = COMPANY_DATA;

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="ambient-glow-orange -top-20 -left-20 opacity-70" />
            <div className="ambient-glow-red top-96 -right-20 opacity-60" />

            {/* Hero */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
                <div className="ceramic-hero rounded-tile-xl p-8 sm:p-14 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <FolderOpen className="w-3.5 h-3.5" />
                        Wissenscenter &amp; Dokumente
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Downloads &amp; <span className="text-ceramic-gradient">Infomaterial</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Unterlagen zu Ihrem Projekt senden wir Ihnen gern persönlich zu. Die wichtigsten Informationen rund um Fliesen und Badsanierung finden Sie direkt hier auf der Website.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                {/* On request */}
                <div className="glass-surface rounded-tile-lg p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="flex items-start gap-4">
                        <span className="icon-chip w-12 h-12">
                            <FileText className="w-6 h-6" />
                        </span>
                        <div>
                            <h2 className="font-black text-lg text-slate-900 mb-1">Unterlagen auf Anfrage</h2>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Sie benötigen Dokumente zu Ihrem Vorhaben? Sprechen Sie uns an – wir senden Ihnen die gewünschten Informationen per E-Mail zu.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                        <Link href="/kontakt" className="btn-primary px-6 py-3 text-xs">
                            Unterlagen anfragen
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a href={`mailto:${contact.email}?subject=${encodeURIComponent('Anfrage Unterlagen')}`} className="btn-ghost px-6 py-3 text-xs">
                            <Mail className="w-4 h-4 text-orange-600" />
                            {contact.email}
                        </a>
                    </div>
                </div>

                {/* Online resources */}
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6 text-center">Online-Ratgeber &amp; Checklisten</h2>
                <ul className="space-y-4">
                    {RESOURCES.map(({ icon: Icon, title, desc, href, cta }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                className="group glass-surface p-6 sm:p-8 rounded-tile-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                            >
                                <span className="flex items-start gap-4">
                                    <span className="icon-chip w-12 h-12">
                                        <Icon className="w-6 h-6" />
                                    </span>
                                    <span>
                                        <span className="block font-black text-base text-slate-900 mb-1 group-hover:text-orange-700 transition-colors">{title}</span>
                                        <span className="block text-sm text-slate-700">{desc}</span>
                                    </span>
                                </span>
                                <span className="shrink-0 inline-flex items-center gap-1.5 text-sm font-bold text-orange-700 group-hover:text-orange-600">
                                    {cta}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <p className="mt-10 text-center text-sm text-slate-700">
                    Lieber persönlich?{' '}
                    <a href={`tel:${contact.phoneLink}`} className="inline-flex items-center gap-1 font-bold text-orange-700 hover:text-orange-600 hover:underline underline-offset-2">
                        <Phone className="w-4 h-4" />
                        {contact.phone}
                    </a>
                </p>
            </div>

            <QualityPromise />
        </div>
    );
}
