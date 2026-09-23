"use client";
import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, CheckCircle2, Ruler, Clock, ArrowRight, Quote } from 'lucide-react';
import { useContent } from '@/contexts/ContentContext';
import { projects as configProjects, categories } from '@/config/projects';
import { COMPANY_DATA } from '@/config/company';
import QualityPromise from '@/components/sections/QualityPromise';

export default function ProjectDetailPage() {
    const { id } = useParams();
    const content = useContent();
    const contentProjects = content?.projects;

    const project = useMemo(() => {
        const projectsData = contentProjects || configProjects;
        const projectList = Array.isArray(projectsData) ? projectsData : (projectsData?.projects || []);
        return projectList.find(p => p.id.toString() === id);
    }, [contentProjects, id]);

    if (!project) {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl font-black text-slate-900 mb-4">Projekt nicht gefunden</h1>
                <p className="text-sm text-slate-600 mb-8">Das gesuchte Referenzprojekt existiert leider nicht.</p>
                <Link href="/referenzen" className="btn-primary px-6 py-3 text-xs">
                    Zurück zur Referenzen-Übersicht
                </Link>
            </div>
        );
    }

    const categoryName = categories.find(c => c.id === project.category)?.name || project.category;

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="ambient-glow-sky -top-20 -left-20" />
            <div className="ambient-glow-mint top-96 -right-20" />

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-14 space-y-6 relative overflow-hidden">
                    <Link href="/referenzen" className="inline-flex items-center text-xs font-bold text-slate-700 hover:text-emerald-800 transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" />
                        Zurück zur Referenzen-Übersicht
                    </Link>

                    <div className="flex flex-wrap items-center gap-3">
                        <span className="eyebrow">
                            {categoryName}
                        </span>
                        {project.year && (
                            <span className="eyebrow eyebrow-neutral">
                                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="tabular-nums">{project.year}</span>
                            </span>
                        )}
                        <span className="eyebrow eyebrow-neutral">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                            {project.location}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight max-w-4xl">
                        {project.title}
                    </h1>

                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl leading-relaxed">
                        {project.description}
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="glass-surface p-8 sm:p-10 rounded-[2.5rem] space-y-6">
                            <h2 className="text-2xl font-black text-slate-900">
                                Projekt-Überblick: {project.title}
                            </h2>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Projekt im Bereich {categoryName} in {project.location}
                                {project.duration ? ` mit einer Bauzeit von ${project.duration}` : ''}: Ausgangssituation vor Ort
                                und gewählte Lösung im Überblick.
                            </p>

                            {/* Challenge & Solution */}
                            <div className="grid sm:grid-cols-2 gap-4 pt-2">
                                {project.challenge && (
                                    <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
                                        <h3 className="text-xs font-black text-amber-900 uppercase tracking-wider mb-2">Herausforderung vor Ort</h3>
                                        <p className="text-sm text-amber-900 leading-relaxed">{project.challenge}</p>
                                    </div>
                                )}
                                {project.solution && (
                                    <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                                        <h3 className="text-xs font-black text-emerald-900 uppercase tracking-wider mb-2">Lösung</h3>
                                        <p className="text-sm text-emerald-900 leading-relaxed">{project.solution}</p>
                                    </div>
                                )}
                            </div>

                            {/* Quality standard */}
                            <div className="pt-4 border-t border-slate-200">
                                <h3 className="text-lg font-black text-slate-900 mb-3">Unser Qualitätsstandard</h3>
                                <ul className="grid sm:grid-cols-2 gap-3">
                                    {COMPANY_DATA.qualityPromises.slice(0, 4).map((promise) => (
                                        <li key={promise.title} className="flex items-start gap-2 text-sm font-semibold text-slate-800">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                            <span>{promise.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Testimonial */}
                        {project.testimonial && (
                            <figure className="glass-surface p-8 rounded-[2rem] border-l-4 border-l-emerald-600">
                                <Quote className="w-6 h-6 text-emerald-600/40 mb-3" aria-hidden="true" />
                                <blockquote className="text-sm italic text-slate-800 leading-relaxed">
                                    &bdquo;{project.testimonial.text}&ldquo;
                                </blockquote>
                                <figcaption className="mt-3 text-sm font-black text-slate-900">
                                    — {project.testimonial.author}
                                    {project.testimonial.role && <span className="text-slate-600 font-normal">, {project.testimonial.role}</span>}
                                </figcaption>
                            </figure>
                        )}
                    </div>

                    {/* Double-Bezel Sidebar */}
                    <div className="glass-bezel-outer shadow-2xl lg:sticky lg:top-28">
                        <div className="glass-bezel-inner p-8 space-y-6">
                            <h2 className="text-xl font-black text-slate-900">
                                Projektdaten im Detail
                            </h2>

                            <dl className="space-y-3 text-sm">
                                {project.duration && (
                                    <div className="flex items-center justify-between gap-3 py-2 border-b border-slate-200">
                                        <dt className="text-slate-600 font-medium flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5 text-emerald-600" />
                                            Bauzeit
                                        </dt>
                                        <dd className="font-black text-slate-900">{project.duration}</dd>
                                    </div>
                                )}
                                <div className="flex items-center justify-between gap-3 py-2 border-b border-slate-200">
                                    <dt className="text-slate-600 font-medium flex items-center gap-1.5">
                                        <Ruler className="w-3.5 h-3.5 text-emerald-600" />
                                        Kategorie
                                    </dt>
                                    <dd className="font-black text-slate-900 capitalize">{categoryName}</dd>
                                </div>
                                <div className="flex items-center justify-between gap-3 py-2 border-b border-slate-200">
                                    <dt className="text-slate-600 font-medium flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                                        Ort
                                    </dt>
                                    <dd className="font-black text-slate-900">{project.location}</dd>
                                </div>
                            </dl>

                            <div className="pt-2">
                                <p className="text-sm text-slate-700 mb-3 font-medium text-center">
                                    Planen Sie ein ähnliches Projekt?
                                </p>
                                <Link
                                    href="/kontakt"
                                    className="btn-primary w-full text-xs"
                                >
                                    Jetzt Beratung anfragen
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <QualityPromise />
        </div>
    );
}
