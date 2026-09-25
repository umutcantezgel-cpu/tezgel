"use client";
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Quote, ShieldCheck } from 'lucide-react';
import { COMPANY_DATA, historyTimeline } from '@/config/company';

export default function CompanyHistory() {
    const containerRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const { business, headquarters, authority, owner, legalName, motto } = COMPANY_DATA;

    return (
        <section className="py-24 relative overflow-hidden" ref={containerRef} aria-labelledby="company-history-heading">
            {/* Background elements */}
            <div className="ambient-glow-orange top-0 right-0 opacity-60" />
            <div className="ambient-glow-red bottom-0 left-0 opacity-50" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <span className="eyebrow mb-4">
                        Gegründet {business.establishmentYear} in {headquarters.city} &middot; {authority.shortName}
                    </span>
                    <h2 id="company-history-heading" className="text-4xl md:text-5xl font-black text-neutral-900 mb-4 tracking-tight">
                        Unsere{' '}
                        <span className="text-ceramic-gradient">Unternehmensgeschichte</span>
                    </h2>
                    <p className="text-base sm:text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed">
                        Von der Betriebsgründung in {headquarters.city} bis zum Fliesen-Fachbetrieb für ganz Mittelhessen: So hat sich {legalName} unter {owner.fullName} entwickelt.
                    </p>
                </div>

                <div className="relative">
                    {/* Animated vertical line (Desktop) */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[3px] bg-neutral-200 hidden md:block">
                        <motion.div
                            className="w-full bg-orange-600 origin-top h-full"
                            style={{ scaleY }}
                        />
                    </div>

                    {/* Timeline items */}
                    <ol className="space-y-16 md:space-y-24 relative">
                        {historyTimeline.map((item, index) => {
                            return (
                                <li key={item.year} className="relative">
                                    {/* Mobile Dot */}
                                    <div className="md:hidden absolute left-0 top-6 w-4 h-4 rounded-full bg-orange-600 z-10" />

                                    <div className={`flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 pl-10 md:pl-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                                        {/* Content Side */}
                                        <motion.div
                                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                            className="w-full md:w-[42%]"
                                        >
                                            <div className="group relative p-8 rounded-2xl glass-surface hover:-translate-y-0.5 hover:border-orange-500/80 hover:shadow-[0_20px_40px_-12px_rgba(23,23,23,0.14)] transition-all duration-200">
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-xs font-black tabular-nums px-3 py-1 rounded-xl bg-orange-50 border border-orange-200 text-orange-800">
                                                        {item.year}
                                                    </span>
                                                    <ShieldCheck className="w-5 h-5 text-orange-600" />
                                                </div>

                                                <h3 className="text-xl font-black text-neutral-900 mb-2 group-hover:text-orange-800 transition-colors">
                                                    {item.title}
                                                </h3>
                                                <p className="text-neutral-700 leading-relaxed text-sm">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </motion.div>

                                        {/* Center Dot (Desktop) */}
                                        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center z-20">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                viewport={{ once: true }}
                                                className="w-5 h-5 rounded-full bg-white border-4 border-orange-600 shadow-md"
                                            />
                                        </div>

                                        {/* Empty Side (Desktop only) */}
                                        <div className="hidden md:block md:w-[42%]" />
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </div>

                {/* Final Vision Banner */}
                <motion.figure
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-28 p-10 rounded-2xl ceramic-hero text-center relative overflow-hidden"
                >
                    <Quote className="w-12 h-12 mx-auto mb-4 text-orange-600/60" aria-hidden="true" />
                    <blockquote className="font-display text-2xl md:text-3xl font-black mb-3 italic text-neutral-900">
                        &bdquo;{motto}&ldquo;
                    </blockquote>
                    <figcaption className="text-xs text-orange-800 font-black uppercase tracking-wider">
                        {owner.fullName} &middot; {owner.title}, {legalName}
                    </figcaption>
                </motion.figure>
            </div>
        </section>
    );
}
