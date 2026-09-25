import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, MapPin, CheckCircle2, Ruler, Clock, ArrowRight, Quote, Camera, Star, Bath, House, Layers, Sun, LayoutGrid } from 'lucide-react';
import { PORTFOLIO_PROJECTS, categories, isPlaceholderProject } from '@/config/projects';
import { COMPANY_DATA } from '@/config/company';
import QualityPromise from '@/components/sections/QualityPromise';

const CATEGORY_ICONS = {
    bad: Bath,
    wohnen: House,
    treppen: Layers,
    aussen: Sun
};

// Keramik-Fliesenraster als Visual (statt Fotos)
const TILE_PATTERN_STYLE = {
    backgroundImage:
        'linear-gradient(rgba(100,116,139,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,0.18) 1px, transparent 1px)',
    backgroundSize: '32px 32px'
};

export function generateStaticParams() {
    return PORTFOLIO_PROJECTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const project = PORTFOLIO_PROJECTS.find((p) => p.id === id);
    if (!project) return { title: 'Referenzprojekt' };

    return {
        title: `${project.title} – Referenzen Fliesenverlegung Tezgel`,
        description: project.description,
        alternates: { canonical: `/referenzen/${id}` }
    };
}

export default async function ProjectDetailPage({ params }) {
    const { id } = await params;
    const project = PORTFOLIO_PROJECTS.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    const placeholder = isPlaceholderProject(project);
    const categoryName = categories.find(c => c.id === project.category)?.name || project.category;
    const Icon = CATEGORY_ICONS[project.category] || LayoutGrid;
    const scopeItems = Array.isArray(project.scopeItems) ? project.scopeItems : [];
    // Project facts are only shown for documented (non-placeholder) projects.
    const location = !placeholder ? project.location : null;
    const year = !placeholder ? project.year : null;
    const duration = !placeholder ? project.duration : null;
    const testimonial = !placeholder ? project.testimonial : null;
    const images = !placeholder && Array.isArray(project.images) ? project.images.filter((img) => img?.url) : [];

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="ambient-glow-orange -top-20 -left-20 opacity-70" />
            <div className="ambient-glow-warm top-96 -right-20 opacity-60" />

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
                <div className="ceramic-hero rounded-tile-2xl p-8 sm:p-14 space-y-6 relative overflow-hidden">
                    <Link href="/referenzen" className="inline-flex items-center text-xs font-bold text-slate-700 hover:text-orange-600 transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" />
                        Zurück zur Referenzen-Übersicht
                    </Link>

                    <div className="flex flex-wrap items-center gap-3">
                        {placeholder && (
                            <span className="eyebrow eyebrow-orange">
                                <Camera className="w-3.5 h-3.5" aria-hidden="true" />
                                Projektdokumentation in Vorbereitung
                            </span>
                        )}
                        <span className="eyebrow">
                            {categoryName}
                        </span>
                        {year && (
                            <span className="eyebrow eyebrow-neutral">
                                <Calendar className="w-3.5 h-3.5 text-orange-600" />
                                <span className="tabular-nums">{year}</span>
                            </span>
                        )}
                        {location && (
                            <span className="eyebrow eyebrow-neutral">
                                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                                {location}
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight max-w-4xl">
                        {project.title}
                    </h1>

                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl leading-relaxed">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3.5 pt-2">
                        {project.serviceLink && (
                            <Link href={project.serviceLink} className="btn-primary px-7 py-3.5 text-xs">
                                Mehr zur Leistung
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        )}
                        <Link href="/kontakt" className="btn-ghost px-7 py-3.5 text-xs">
                            Vor-Ort-Aufmaß anfragen
                        </Link>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="glass-surface p-8 sm:p-10 rounded-tile-xl space-y-6">
                            <h2 className="text-2xl font-black text-slate-900">
                                {placeholder ? 'Was ein solches Projekt umfasst' : `Projekt-Überblick: ${project.title}`}
                            </h2>
                            {placeholder ? (
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    Dieses Leistungsbeispiel beschreibt einen typischen Projekttyp aus dem Bereich {categoryName}.
                                    Der genaue Umfang richtet sich nach Ihrem Objekt und wird beim Vor-Ort-Aufmaß festgelegt.
                                </p>
                            ) : (
                                (location || duration) && (
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                        Projekt im Bereich {categoryName}
                                        {location ? ` in ${location}` : ''}
                                        {duration ? ` mit einer Bauzeit von ${duration}` : ''}.
                                    </p>
                                )
                            )}

                            {scopeItems.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-black text-slate-900 mb-3">Typischer Leistungsumfang</h3>
                                    <ul className="space-y-2.5">
                                        {scopeItems.map((item) => (
                                            <li key={item} className="flex items-start gap-2.5 text-sm text-slate-800">
                                                <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" aria-hidden="true" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Challenge & Solution (only for documented projects) */}
                            {!placeholder && (project.challenge || project.solution) && (
                                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                                    {project.challenge && (
                                        <div className="p-5 rounded-tile-lg bg-amber-50 border border-amber-200">
                                            <h3 className="text-xs font-black text-amber-900 uppercase tracking-wider mb-2">Herausforderung vor Ort</h3>
                                            <p className="text-sm text-amber-900 leading-relaxed">{project.challenge}</p>
                                        </div>
                                    )}
                                    {project.solution && (
                                        <div className="p-5 rounded-tile-lg bg-orange-50/70 border border-orange-200">
                                            <h3 className="text-xs font-black text-orange-950 uppercase tracking-wider mb-2">Lösung</h3>
                                            <p className="text-sm text-orange-900 leading-relaxed">{project.solution}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Quality standard */}
                            <div className="pt-4 border-t border-slate-200">
                                <h3 className="text-lg font-black text-slate-900 mb-3">Unser Qualitätsstandard</h3>
                                <ul className="grid sm:grid-cols-2 gap-3">
                                    {COMPANY_DATA.qualityPromises.slice(0, 4).map((promise) => (
                                        <li key={promise.title} className="flex items-start gap-2 text-sm font-semibold text-slate-800">
                                            <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                                            <span>{promise.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Project photos (only for documented projects) */}
                        {images.length > 0 && (
                            <section aria-labelledby="projekt-fotos" className="glass-surface p-6 sm:p-8 rounded-tile-xl space-y-4">
                                <h2 id="projekt-fotos" className="text-xl font-black text-slate-900">Projektfotos</h2>
                                <ul className="grid sm:grid-cols-2 gap-4">
                                    {images.map((img, index) => (
                                        <li key={img.url} className="relative aspect-[4/3] rounded-tile-lg overflow-hidden border border-slate-200">
                                            <Image
                                                src={img.url}
                                                alt={img.alt || `${project.title} – Foto ${index + 1}`}
                                                fill
                                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                                className="object-cover"
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Placeholder note */}
                        {placeholder && (
                            <div className="p-6 sm:p-8 rounded-tile-xl bg-orange-50/60 border border-orange-200/80 text-slate-700 space-y-3">
                                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                                    <Camera className="w-5 h-5 text-orange-600" aria-hidden="true" />
                                    Fotos und Details folgen
                                </h2>
                                <p className="text-sm leading-relaxed">
                                    Fotos und Details realer Projekte – etwa Ort, Bauzeit und Kundenstimme – veröffentlichen wir erst
                                    mit dem Einverständnis unserer Kunden. Bis dahin zeigen die echten Bewertungen unserer Kunden,
                                    wie wir arbeiten.
                                </p>
                                <Link
                                    href="/referenzen#bewertungen"
                                    className="inline-flex items-center gap-1.5 text-sm font-black text-orange-600 hover:text-orange-700 hover:underline underline-offset-2"
                                >
                                    <Star className="w-4 h-4 text-amber-500 fill-current" aria-hidden="true" />
                                    Echte Kundenbewertungen lesen
                                </Link>
                            </div>
                        )}

                        {/* Testimonial (only for documented projects) */}
                        {testimonial && (
                            <figure className="glass-surface p-8 rounded-tile-xl border-l-4 border-l-orange-500">
                                <Quote className="w-6 h-6 text-orange-500/40 mb-3" aria-hidden="true" />
                                <blockquote className="text-sm italic text-slate-800 leading-relaxed">
                                    &bdquo;{testimonial.text}&ldquo;
                                </blockquote>
                                <figcaption className="mt-3 text-sm font-black text-slate-900">
                                    — {testimonial.author}
                                    {testimonial.role && <span className="text-slate-600 font-normal">, {testimonial.role}</span>}
                                </figcaption>
                            </figure>
                        )}
                    </div>

                    {/* Double-Bezel Sidebar */}
                    <div className="glass-bezel-outer shadow-2xl lg:sticky lg:top-28">
                        <div className="glass-bezel-inner p-8 space-y-6">
                            {/* Ceramic visual panel (no photo) */}
                            <div
                                className="relative h-44 rounded-tile-lg border border-slate-200 bg-gradient-to-br from-orange-50/70 via-white to-amber-50/50 overflow-hidden flex items-center justify-center"
                                style={TILE_PATTERN_STYLE}
                                aria-hidden="true"
                            >
                                <div className="w-20 h-20 rounded-tile-md bg-white/90 border border-white/80 shadow-sm flex items-center justify-center">
                                    <Icon className="w-10 h-10 text-orange-600" />
                                </div>
                            </div>

                            <h2 className="text-xl font-black text-slate-900">
                                {placeholder ? 'Auf einen Blick' : 'Projektdaten im Detail'}
                            </h2>

                            <dl className="space-y-3 text-sm">
                                <div className="flex items-center justify-between gap-3 py-2 border-b border-slate-200">
                                    <dt className="text-slate-600 font-medium flex items-center gap-1.5">
                                        <Ruler className="w-3.5 h-3.5 text-orange-600" />
                                        Kategorie
                                    </dt>
                                    <dd className="font-black text-slate-900 text-right">{categoryName}</dd>
                                </div>
                                {placeholder && (
                                    <div className="flex items-center justify-between gap-3 py-2 border-b border-slate-200">
                                        <dt className="text-slate-600 font-medium flex items-center gap-1.5">
                                            <Camera className="w-3.5 h-3.5 text-orange-600" />
                                            Status
                                        </dt>
                                        <dd className="font-black text-slate-900 text-right">Dokumentation in Vorbereitung</dd>
                                    </div>
                                )}
                                {duration && (
                                    <div className="flex items-center justify-between gap-3 py-2 border-b border-slate-200">
                                        <dt className="text-slate-600 font-medium flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5 text-orange-600" />
                                            Bauzeit
                                        </dt>
                                        <dd className="font-black text-slate-900 text-right">{duration}</dd>
                                    </div>
                                )}
                                {location && (
                                    <div className="flex items-center justify-between gap-3 py-2 border-b border-slate-200">
                                        <dt className="text-slate-600 font-medium flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5 text-orange-600" />
                                            Ort
                                        </dt>
                                        <dd className="font-black text-slate-900 text-right">{location}</dd>
                                    </div>
                                )}
                            </dl>

                            <div className="pt-2 space-y-3">
                                <p className="text-sm text-slate-700 font-medium text-center">
                                    Planen Sie ein ähnliches Projekt?
                                </p>
                                <Link
                                    href="/kontakt"
                                    className="btn-primary w-full text-xs"
                                >
                                    Jetzt Beratung anfragen
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                {project.serviceLink && (
                                    <Link
                                        href={project.serviceLink}
                                        className="btn-ghost w-full text-xs"
                                    >
                                        Mehr zur Leistung
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <QualityPromise />
        </div>
    );
}
