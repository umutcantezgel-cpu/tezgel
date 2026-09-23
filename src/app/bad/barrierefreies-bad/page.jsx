import React from 'react';
import Link from 'next/link';
import {
    ShieldCheck,
    BadgePercent,
    Phone,
    ArrowRight,
    Droplets,
    ShowerHead,
    Accessibility,
    Sparkles,
    HeartHandshake,
    Lightbulb,
    Star,
    Quote
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { REVIEWS } from '@/config/reviews';
import BadanfrageFunnel from '@/components/funnels/BadanfrageFunnel';

export const metadata = {
    title: 'Barrierefreie Badmodernisierung Aßlar & Wetzlar | Bis 4.000 € Pflegekassenzuschuss',
    description: 'Altersgerechte und barrierefreie Badmodernisierung nach DIN 18040-2 in Aßlar, Wetzlar & Umgebung. Bodengleiche Duschen, Dusch-WC & bis zu 4.000 € Zuschuss der Pflegekasse.',
    alternates: { canonical: '/bad/barrierefreies-bad' }
};

const SOLUTIONS = [
    { title: 'Bodengleiche Walk-In-Duschen', desc: 'Schwellenloser Einstieg ohne Stolperfallen. Integrierte Duschrinne, rutschhemmende Fliesen (R10B) und breite Glaszugänge.', icon: Droplets },
    { title: 'Wanne-zur-Dusche-Umbau', desc: 'Wir tauschen Ihre alte, hohe Badewanne gegen eine moderne, begehbare Duschzone – normgerecht abgedichtet nach DIN 18534.', icon: ShowerHead },
    { title: 'Unterfahrbare Waschtische', desc: 'Ergonomische Waschtischanlagen mit Beinfreiheit für Rollstuhlfahrer und komfortable Einhebel- oder Sensorarmaturen.', icon: Accessibility },
    { title: 'Komfort- & Dusch-WCs', desc: 'Höhenverstellbare oder erhöhte WCs für bequemes Aufstehen sowie moderne Dusch-WCs für optimale Intimhygiene auf Knopfdruck.', icon: Sparkles },
    { title: 'Design-Haltegriffsysteme', desc: 'Stabile, geprüfte Stützklappgriffe und Duschhandläufe, die sich harmonisch in modernes Baddesign einfügen.', icon: HeartHandshake },
    { title: 'Rutschhemmung & Beleuchtung', desc: 'Sichere Bodenbeläge, blendfreie LED-Beleuchtung mit Orientierungslicht und schwellenlose Bewegungsflächen.', icon: Lightbulb }
];

export default function BarrierefreiesBadPage() {
    const review = REVIEWS.find((r) => r.id === 'ute-t');

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="ambient-glow-mint -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-24 opacity-60" />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10" aria-labelledby="barrierefrei-heading">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        DIN 18040-2 &middot; Barrierefreies Wohnen
                    </span>
                    <h1 id="barrierefrei-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Barrierefreie Badmodernisierung in Aßlar &amp; Wetzlar: <br />
                        <span className="text-ceramic-gradient">Sicherheit, Komfort &amp; bis zu 4.000 € Zuschuss</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                        Selbstbestimmt und sicher im eigenen Zuhause leben: Wir gestalten Ihr Badezimmer altersgerecht,
                        rollstuhlgerecht oder barrierearm – mit bodengleichen Duschen, rutschfesten Böden und Unterstützung bei der
                        Pflegekassen-Förderung.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                        <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs group">
                            Pflegekassen-Beratung vereinbaren
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-ghost px-7 py-3.5 text-xs">
                            <Phone className="w-4 h-4 text-emerald-700" />
                            {COMPANY_DATA.contact.phone}
                        </a>
                    </div>
                </div>
            </section>

            {/* Grant / Funding Highlight Box - Double Bezel */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10" aria-labelledby="zuschuss-heading">
                <div className="glass-bezel-outer">
                    <div className="glass-bezel-inner p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        <div className="md:col-span-2 flex flex-col sm:flex-row gap-5">
                            <span className="icon-chip w-14 h-14">
                                <BadgePercent className="w-7 h-7" />
                            </span>
                            <div className="space-y-2">
                                <p className="text-[11px] font-black uppercase tracking-widest text-emerald-800">
                                    Zuschuss für wohnumfeldverbessernde Maßnahmen (§ 40 SGB XI)
                                </p>
                                <h2 id="zuschuss-heading" className="text-2xl font-black text-slate-900">
                                    Bis zu 4.000 € Zuschuss von der Pflegekasse
                                </h2>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    Bereits ab Pflegegrad 1 bezuschusst die Pflegekasse den Umbau auf ein barrierefreies Bad mit bis
                                    zu 4.000 € pro Person (bei Ehepaaren mit Pflegegrad sogar bis zu 8.000 €). Wir erstellen für Sie
                                    den förderkonformen Kostenvoranschlag.
                                </p>
                            </div>
                        </div>
                        <div className="text-center md:text-right">
                            <Link href="/kontakt" className="btn-primary px-6 py-3.5 text-xs">
                                Beratung anfordern
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Solutions Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" aria-labelledby="loesungen-heading">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="eyebrow eyebrow-sky mb-4">Barrierefreie Lösungen</span>
                    <h2 id="loesungen-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Unsere barrierefreien Bad-Lösungen{' '}
                        <span className="text-ceramic-gradient">im Detail</span>
                    </h2>
                    <p className="mt-3 text-base text-slate-700 leading-relaxed">
                        Ästhetik trifft auf maximale Sicherheit – ohne sterilen Krankenhaus-Charakter.
                    </p>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SOLUTIONS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li
                                key={item.title}
                                className="group glass-surface p-7 rounded-[2rem] hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
                            >
                                <span className="icon-chip w-12 h-12 mb-5">
                                    <Icon className="w-6 h-6" />
                                </span>
                                <h3 className="font-black text-base text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors">{item.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                            </li>
                        );
                    })}
                </ul>

                {review && (
                    <figure className="mt-12 ceramic-hero rounded-[2rem] p-7 sm:p-10 max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="flex items-center gap-0.5 text-amber-500" aria-label={`${review.rating} von 5 Sternen`}>
                                {Array.from({ length: review.rating }, (_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                                ))}
                            </span>
                            <Quote className="w-6 h-6 text-emerald-600/40" aria-hidden="true" />
                        </div>
                        <blockquote className="text-base sm:text-lg text-slate-800 leading-relaxed">„{review.text}“</blockquote>
                        <figcaption className="mt-4 text-sm">
                            <span className="font-bold text-slate-900">{review.author}</span>
                            <span className="text-slate-600"> &middot; {review.source}-Rezension &middot; {review.topic}</span>
                        </figcaption>
                    </figure>
                )}
            </section>

            {/* Funnel */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 scroll-mt-28" id="anfrage" aria-label="Badanfrage">
                <BadanfrageFunnel />
            </section>
        </div>
    );
}
