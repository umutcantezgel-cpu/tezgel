import React from 'react';
import {
    CheckCircle2,
    ShieldCheck,
    Award,
    Ruler,
    FileText,
    Clock,
    Sparkles,
    Layers,
    UserCheck,
    ArrowRight,
    Phone
} from 'lucide-react';
import Link from 'next/link';
import { COMPANY_DATA } from '@/config/company';

// One icon per entry of COMPANY_DATA.qualityPromises (same order).
const PROMISE_ICONS = [
    Ruler,
    Layers,
    ShieldCheck,
    FileText,
    Clock,
    Sparkles,
    Award,
    UserCheck
];

export default function QualityPromise() {
    return (
        <section className="py-20 sm:py-24 relative overflow-hidden" aria-labelledby="quality-promise-heading">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="eyebrow mb-4">
                        <Award className="w-3.5 h-3.5" />
                        HWK Fachbetrieb &middot; {COMPANY_DATA.authority.shortName}
                    </span>
                    <h2 id="quality-promise-heading" className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
                        Unser 8-Punkte-Qualitätsversprechen{' '}
                        <span className="text-ceramic-gradient">für Ihr Fliesenprojekt</span>
                    </h2>
                    <p className="mt-4 text-base text-neutral-700 leading-relaxed">
                        Vom Aufmaß bis zur fertigen Fuge: Wir stehen zu unseren Vereinbarungen, Preisen und Terminen –
                        in Aßlar, Wetzlar und ganz Hessen.
                    </p>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {COMPANY_DATA.qualityPromises.map((promise, idx) => {
                        const Icon = PROMISE_ICONS[idx % PROMISE_ICONS.length];
                        return (
                            <li
                                key={promise.title}
                                className="glass-surface rounded-2xl p-6 group flex flex-col justify-between hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(23,23,23,0.14)] transition-all duration-200"
                            >
                                <div>
                                    <div className="icon-chip w-12 h-12 mb-5">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600">
                                        Punkt {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <h3 className="text-base font-black text-neutral-900 mt-1 mb-2 leading-snug group-hover:text-orange-800 transition-colors">
                                        {promise.title}
                                    </h3>
                                    <p className="text-sm text-neutral-700 leading-relaxed">{promise.description}</p>
                                </div>
                                <p className="mt-5 pt-3 border-t border-neutral-200 flex items-center gap-1.5 text-xs font-bold text-orange-800">
                                    <CheckCircle2 className="w-4 h-4 text-orange-600" />
                                    Garantierter Standard
                                </p>
                            </li>
                        );
                    })}
                </ul>

                <div className="ceramic-hero mt-12 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center md:text-left">
                        <p className="font-display text-xl sm:text-2xl font-black text-neutral-900">
                            Überzeugen Sie sich selbst von unserer Fachqualität
                        </p>
                        <p className="text-sm text-neutral-700">
                            Kostenfreies Vor-Ort-Aufmaß durch {COMPANY_DATA.owner.fullName} – in Aßlar, Wetzlar, Gießen und Umgebung.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost">
                            <Phone className="w-4 h-4 text-orange-700" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                        <Link href="/kontakt" className="btn-primary">
                            Aufmaß anfragen
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
