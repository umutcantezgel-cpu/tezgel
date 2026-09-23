import React from 'react';
import Link from 'next/link';
import { 
    Phone, 
    Calendar, 
    ShieldCheck, 
    Sparkles, 
    CheckCircle2, 
    ArrowRight, 
    Droplets, 
    Sun, 
    Layers, 
    Award, 
    Check, 
    Clock, 
    Ruler,
    Hammer,
    MapPin,
    MessageSquare,
    ChevronRight,
    Star
} from 'lucide-react';
import { COMPANY_DATA, values, processSteps } from '@/config/company';
import { SERVICES } from '@/config/services';
import TezgelAnfrageFunnel from '@/components/funnels/TezgelAnfrageFunnel';

export const metadata = {
    title: 'Fliesenverlegung Tezgel | Meisterbetrieb für exklusive Fliesen & Badsanierung Aßlar & Wetzlar',
    description: 'Ihr Meisterbetrieb für fugenarme Großformate, barrierefreie Badsanierung, Terrassen auf Stelzlagern & DIN 18534 Verbundabdichtung in Aßlar, Wetzlar und ganz Hessen.',
    alternates: {
        canonical: 'https://tezgel.de'
    }
};

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen relative overflow-hidden bg-[#F8FAFC] text-slate-900">
            
            {/* AMBIENT GLOW ORBS (Clean Light Ceramic & Emerald Architecture) */}
            <div className="ambient-glow-mint -top-32 -left-32 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-24 opacity-60" />
            <div className="ambient-glow-slate top-[1500px] left-1/4 opacity-40" />

            {/* ========================================================================
               1. HERO BÜHNE - CLEAN ARCHITECTURAL LIGHT & CRAFTSMANSHIP
               ======================================================================== */}
            <section className="relative pt-32 pb-16 md:pt-36 md:pb-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                        
                        {/* Hero Text Content (Left 7 Cols) */}
                        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                            
                            {/* Eyebrow Pill Badges */}
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black tracking-wider uppercase border border-emerald-200 shadow-xs">
                                    <Award className="w-3.5 h-3.5 text-emerald-700" />
                                    HWK Wiesbaden &middot; Eingetragener Meisterbetrieb
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-[11px] font-black tracking-wider uppercase border border-sky-200 shadow-xs">
                                    <MapPin className="w-3.5 h-3.5 text-sky-600" />
                                    Aßlar &middot; Wetzlar &middot; Hessen
                                </span>
                            </div>

                            {/* Main Headline */}
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                                Perfektion auf jedem <br />
                                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">Quadratmeter.</span> <br />
                                <span className="text-slate-700 text-2xl sm:text-3xl lg:text-4xl font-extrabold">
                                    Fliesenverlegung &amp; Badsanierung
                                </span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                                Von fugenarmen XXL-Großformaten und barrierefreien Walk-In-Duschen über repräsentative Wohnbereichsbeläge bis hin zu frostsicheren Terrassen: Fliesenverlegung Tezgel steht für millimetergenaue Handwerkskunst mit zertifizierter DIN 18534 Verbundabdichtung und Staubschutz-Garantie.
                            </p>

                            {/* Conversion Buttons (Aufmaß + WhatsApp + Phone) */}
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                                <Link
                                    href="/kontakt"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5 group"
                                >
                                    <span>Vor-Ort-Aufmaß vereinbaren</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <a
                                    href={COMPANY_DATA.contact.whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 transition-all shadow-xs"
                                >
                                    <MessageSquare className="w-4 h-4 fill-current text-emerald-600" />
                                    <span>Direkt per WhatsApp</span>
                                </a>

                                <a
                                    href={`tel:${COMPANY_DATA.contact.phoneLink}`}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 shadow-xs transition-colors"
                                    title="Direkt anrufen"
                                >
                                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>{COMPANY_DATA.contact.phone}</span>
                                </a>
                            </div>

                            {/* Trust Signals */}
                            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs font-bold text-slate-600">
                                <span className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    Zertifizierte DIN 18534 Abdichtung
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    Staubarme Sanierung
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    Verbindliche Festpreise
                                </span>
                            </div>

                            {/* Leitmotiv Quote Card */}
                            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-xl mx-auto lg:mx-0">
                                <p className="text-xs italic text-slate-700">
                                    „{COMPANY_DATA.motto}“
                                </p>
                                <span className="block mt-1 text-[11px] font-bold text-emerald-700 not-italic">
                                    — Deniz Tezgel, Inhaber &amp; Handwerksmeister
                                </span>
                            </div>

                        </div>

                        {/* Hero Interactive Quick-Picker (Right 5 Cols) */}
                        <div className="lg:col-span-5">
                            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-slate-200/50 relative">
                                
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                                        Fachgewerke &amp; Beratung
                                    </span>
                                    <span className="text-xs text-slate-500 font-bold">Aßlar &middot; Wetzlar</span>
                                </div>

                                <h3 className="text-xl font-black text-slate-900 mb-1">
                                    Was möchten Sie verlegen lassen?
                                </h3>
                                <p className="text-xs text-slate-500 mb-5">
                                    Wählen Sie Ihr Einsatzgebiet für eine exakte Material- und Ausführungsberatung:
                                </p>

                                <div className="space-y-3">
                                    <Link
                                        href="/bad"
                                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all flex items-center justify-between group block shadow-xs"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                                                <Droplets className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                                                    Bäder &amp; Private Wellness
                                                </h4>
                                                <p className="text-[11px] text-slate-500">Walk-In Duschen, Großformate, 3D-Planer</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                                    </Link>

                                    <Link
                                        href="/leistungen/wohnen"
                                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-500 hover:bg-sky-50/50 transition-all flex items-center justify-between group block shadow-xs"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                                                <Sparkles className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-sky-700 transition-colors">
                                                    Wohnbereiche &amp; Neubau
                                                </h4>
                                                <p className="text-[11px] text-slate-500">Feinsteinzeug, Küche, Flure &amp; Treppen</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
                                    </Link>

                                    <Link
                                        href="/leistungen/aussen"
                                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-500 hover:bg-amber-50/50 transition-all flex items-center justify-between group block shadow-xs"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                                                <Sun className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-700 transition-colors">
                                                    Balkon- &amp; Terrassensanierung
                                                </h4>
                                                <p className="text-[11px] text-slate-500">2-cm-Keramik auf Stelzlagern, Entwässerung</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                                    </Link>

                                    <Link
                                        href="/leistungen/untergrund"
                                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all flex items-center justify-between group block shadow-xs"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                                                <ShieldCheck className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                                                    Untergrund &amp; DIN 18534 Abdichtung
                                                </h4>
                                                <p className="text-[11px] text-slate-500">Estrichausgleich, Abbruch, Feuchteschutz</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                                    </Link>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                    <span>Schnellste Rückmeldung:</span>
                                    <a 
                                        href={COMPANY_DATA.contact.whatsappLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="font-bold text-emerald-700 hover:underline flex items-center gap-1"
                                    >
                                        <MessageSquare className="w-3.5 h-3.5 fill-current text-emerald-600" />
                                        <span>WhatsApp Chat &rarr;</span>
                                    </a>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ========================================================================
               2. DIE 3 VERTRAUENS-SÄULEN (DIN 18534, HWK WIESBADEN, STAUBSCHUTZ)
               ======================================================================== */}
            <section className="py-16 relative z-10" id="vertrauen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Säule 1: DIN 18534 */}
                        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-md shadow-slate-200/40 hover:border-emerald-500 hover:shadow-lg transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block mb-1">
                                Normgerechte Sicherheit
                            </span>
                            <h3 className="text-lg font-black text-slate-900 mb-2">
                                Zertifizierte Verbundabdichtung (DIN 18534)
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Höchste Feuchtigkeitssicherheit für Walk-In-Duschen und Nassbereiche. Wir dichten lückenlos nach DIN 18534 im Verbund ab – für dauerhaften Schutz vor Feuchteschäden und Schimmelbildung.
                            </p>
                        </div>

                        {/* Säule 2: HWK Wiesbaden */}
                        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-md shadow-slate-200/40 hover:border-sky-500 hover:shadow-lg transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <Award className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 block mb-1">
                                Meisterhafte Ausführung
                            </span>
                            <h3 className="text-lg font-black text-slate-900 mb-2">
                                Eingetragener HWK-Wiesbaden Meisterbetrieb
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Handwerkliche Präzision bei jedem Schnitt. Wir garantieren harmonische Fugenachsen, exakte Jolly-Gehrungskanten und fehlerfreie Nivellierung – insbesondere bei anspruchsvollen XXL-Großformaten.
                            </p>
                        </div>

                        {/* Säule 3: Staubschutz */}
                        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-md shadow-slate-200/40 hover:border-teal-500 hover:shadow-lg transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 block mb-1">
                                Wohnkomfort bei Sanierung
                            </span>
                            <h3 className="text-lg font-black text-slate-900 mb-2">
                                Garantierter Staubschutz &amp; Sauberkeitsversprechen
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Schutz für Ihr bewohntes Zuhause: Wir nutzen mobile Staubschutzwände, Hochleistungs-Luftreiniger und Schutzabdeckungen auf allen Wegen. Wir übergeben jede Baustelle besenrein und bezugsfertig.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* ========================================================================
               NEU: DAS 100+ SEITEN PORTAL-NETZWERK (WEGWEISER ZU ALLEN SPEZIALBEREICHEN)
               ======================================================================== */}
            <section className="py-16 bg-white border-y border-slate-200 relative z-10" id="portal-netzwerk">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="text-xs uppercase font-black tracking-wider text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-200 mb-3 inline-block">
                            Strukturierte Fachbereiche &amp; Tools
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Alles für Ihr Bauvorhaben auf über 100 Fachseiten
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Wählen Sie Ihren gesuchten Themenbereich – von schlüsselfertigen Badsanierungen und interaktiven Online-Planern über Meister-Fachgewerke bis hin zu regionalen Standorten in Hessen.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        
                        {/* Hub 1: Bad & Sanitär */}
                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
                                    <Droplets className="w-6 h-6" />
                                </div>
                                <span className="text-[11px] font-black uppercase text-emerald-700 tracking-wider">Komplettbäder</span>
                                <h3 className="text-lg font-black text-slate-900 mt-1 mb-2">Badsanierung &amp; Wellness</h3>
                                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                                    Alles aus einer Hand: Barrierefreie Walk-In Duschen, Großformat-Design und staubarme Kernsanierung.
                                </p>
                                <div className="space-y-1.5 border-t border-slate-200 pt-3 text-xs font-semibold text-slate-700">
                                    <Link href="/bad/badsanierung" className="block hover:text-emerald-700 transition-colors">&rarr; Badsanierung Übersicht</Link>
                                    <Link href="/bad/fliesen" className="block hover:text-emerald-700 transition-colors">&rarr; Großformatfliesen im Bad</Link>
                                    <Link href="/bad/barrierefreies-bad" className="block hover:text-emerald-700 transition-colors">&rarr; Barrierefreie Walk-In Bäder</Link>
                                    <Link href="/bad/bad-aus-einer-hand" className="block hover:text-emerald-700 transition-colors">&rarr; Bad aus einer Hand</Link>
                                    <Link href="/bad/musterbaeder" className="block hover:text-emerald-700 transition-colors">&rarr; Musterbäder Galerie</Link>
                                </div>
                            </div>
                            <div className="pt-4 mt-4 border-t border-slate-200">
                                <Link href="/bad" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
                                    <span>Zur Bad-Hauptseite</span>
                                    <ChevronRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>

                        {/* Hub 2: Interaktive Tools */}
                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-sky-500 hover:shadow-lg transition-all flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold mb-4">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <span className="text-[11px] font-black uppercase text-sky-700 tracking-wider">Kalkulatoren &amp; Planer</span>
                                <h3 className="text-lg font-black text-slate-900 mt-1 mb-2">Online-Rechner &amp; Planung</h3>
                                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                                    Berechnen Sie vorab Ihr Budget oder konfigurieren Sie Ihre Wunschmaterialien interaktiv.
                                </p>
                                <div className="space-y-1.5 border-t border-slate-200 pt-3 text-xs font-semibold text-slate-700">
                                    <Link href="/bad/budgetkalkulator" className="block hover:text-sky-700 transition-colors">&rarr; Bad-Budgetkalkulator</Link>
                                    <Link href="/bad/badplaner" className="block hover:text-sky-700 transition-colors">&rarr; 3D-Badplaner Tool</Link>
                                    <Link href="/bad/badanfrage" className="block hover:text-sky-700 transition-colors">&rarr; Geführte Bad-Anfrage</Link>
                                    <Link href="/beratung" className="block hover:text-sky-700 transition-colors">&rarr; Persönliche Beratung</Link>
                                    <Link href="/foerderung" className="block hover:text-sky-700 transition-colors">&rarr; KfW-Förderung &amp; Zuschüsse</Link>
                                </div>
                            </div>
                            <div className="pt-4 mt-4 border-t border-slate-200">
                                <Link href="/bad/budgetkalkulator" className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1">
                                    <span>Zum Kostenrechner</span>
                                    <ChevronRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>

                        {/* Hub 3: Standorte Hessen */}
                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <span className="text-[11px] font-black uppercase text-emerald-700 tracking-wider">Regionales Netzwerk</span>
                                <h3 className="text-lg font-black text-slate-900 mt-1 mb-2">Standorte &amp; Ausstellungen</h3>
                                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                                    Vor-Ort-Service in über 50 Städten und Landkreisen im gesamten Bundesland Hessen.
                                </p>
                                <div className="space-y-1.5 border-t border-slate-200 pt-3 text-xs font-semibold text-slate-700">
                                    <Link href="/standorte/wetzlar" className="block hover:text-emerald-700 transition-colors">&rarr; Fliesenleger Wetzlar</Link>
                                    <Link href="/standorte/giessen" className="block hover:text-emerald-700 transition-colors">&rarr; Fliesenleger Gießen</Link>
                                    <Link href="/standorte/marburg" className="block hover:text-emerald-700 transition-colors">&rarr; Fliesenleger Marburg</Link>
                                    <Link href="/ausstellung/wetzlar" className="block hover:text-emerald-700 transition-colors">&rarr; Badausstellung Wetzlar</Link>
                                    <Link href="/ausstellung/giessen" className="block hover:text-emerald-700 transition-colors">&rarr; Badausstellung Gießen</Link>
                                </div>
                            </div>
                            <div className="pt-4 mt-4 border-t border-slate-200">
                                <Link href="/standorte" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
                                    <span>Alle 50+ Standorte</span>
                                    <ChevronRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>

                        {/* Hub 4: Wissen, FAQ & Referenzen */}
                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-amber-500 hover:shadow-lg transition-all flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-4">
                                    <Award className="w-6 h-6" />
                                </div>
                                <span className="text-[11px] font-black uppercase text-amber-700 tracking-wider">Referenzen &amp; Wissen</span>
                                <h3 className="text-lg font-black text-slate-900 mt-1 mb-2">Projekte &amp; Ratgeber</h3>
                                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                                    Einblicke in reale Baustellen, Tipps zu DIN-Normen und Materialpflege von Deniz Tezgel.
                                </p>
                                <div className="space-y-1.5 border-t border-slate-200 pt-3 text-xs font-semibold text-slate-700">
                                    <Link href="/referenzen" className="block hover:text-amber-700 transition-colors">&rarr; Echte Projektgalerie</Link>
                                    <Link href="/blog" className="block hover:text-amber-700 transition-colors">&rarr; Fliesen &amp; Bad Ratgeber</Link>
                                    <Link href="/faq" className="block hover:text-amber-700 transition-colors">&rarr; Häufig gestellte Fragen (FAQ)</Link>
                                    <Link href="/ueber-uns" className="block hover:text-amber-700 transition-colors">&rarr; Über Handwerksmeister Tezgel</Link>
                                    <Link href="/kontakt" className="block hover:text-amber-700 transition-colors">&rarr; Kontakt &amp; Terminbuchung</Link>
                                </div>
                            </div>
                            <div className="pt-4 mt-4 border-t border-slate-200">
                                <Link href="/referenzen" className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1">
                                    <span>Zur Fotogalerie</span>
                                    <ChevronRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            {/* ========================================================================
               3. MODULARE LEISTUNGS-PRÄSENTATION (BENTO-GRID)
               ======================================================================== */}
            <section className="py-20 relative z-10" id="leistungen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs uppercase font-black tracking-wider text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-200 mb-3 inline-block">
                            Fachgewerke im Detail
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Exklusive Fliesen-, Platten- &amp; Verlegearbeiten
                        </h2>
                        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                            Ob barrierefreie Wellnessoase, offenes Wohnen mit XXL-Feinsteinzeug oder die wetterfeste Sanierung Ihrer Terrasse: Fliesenverlegung Tezgel bietet Meisterqualität aus Aßlar für den gesamten Lahn-Dill-Kreis und Hessen.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {SERVICES.map((srv) => (
                            <div
                                key={srv.id}
                                className="bg-white rounded-[2rem] p-8 border border-slate-200 hover:border-emerald-500 shadow-md shadow-slate-200/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                            {srv.id === 'bad' && <Droplets className="w-7 h-7" />}
                                            {srv.id === 'wohnen' && <Sparkles className="w-7 h-7" />}
                                            {srv.id === 'aussen' && <Sun className="w-7 h-7" />}
                                            {srv.id === 'untergrund' && <ShieldCheck className="w-7 h-7" />}
                                        </div>
                                        <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                                            Meister-Fachgewerk
                                        </span>
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                                        {srv.name}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                                        {srv.shortDescription}
                                    </p>

                                    <div className="space-y-2 mb-6">
                                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                                            Leistungsschwerpunkte:
                                        </span>
                                        <ul className="space-y-2">
                                            {srv.features.slice(0, 4).map((feat, i) => (
                                                <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                                                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                                    <span>{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                                    <Link
                                        href={`/leistungen/${srv.id}`}
                                        className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 transition-colors"
                                    >
                                        <span>Details &amp; Ausführung ansehen</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                    <a
                                        href={COMPANY_DATA.contact.whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors flex items-center gap-1"
                                    >
                                        <MessageSquare className="w-3 h-3 fill-current text-emerald-600" />
                                        <span>WhatsApp</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ========================================================================
               4. TRANSPARENTER 3-SCHRITTE-ABLAUF
               ======================================================================== */}
            <section className="py-20 relative z-10" id="ablauf">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs uppercase font-black tracking-wider text-sky-800 bg-sky-100 px-4 py-1.5 rounded-full border border-sky-200 mb-3 inline-block">
                            Verlässlicher Prozess
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            In 3 Schritten zu Ihrem Wunschbelag
                        </h2>
                        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                            Keine Überraschungen, keine versteckten Kosten. Von der ersten Begutachtung bis zur sauberen Abnahme durch Deniz Tezgel persönlich.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {processSteps.map((stepItem, idx) => (
                            <div 
                                key={idx}
                                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md shadow-slate-200/40 relative overflow-hidden group hover:border-emerald-500 hover:shadow-lg transition-all"
                            >
                                <div className="text-5xl font-black text-slate-200 group-hover:text-emerald-100 transition-colors mb-4 font-mono">
                                    {stepItem.step}
                                </div>
                                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 block mb-1">
                                    {stepItem.subtitle}
                                </span>
                                <h3 className="text-lg font-black text-slate-900 mb-3">
                                    {stepItem.title}
                                </h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    {stepItem.description}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ========================================================================
               5. GROSSFORMAT & BADSANIERUNGS-FOKUS (ARCHITECTURAL SPOTLIGHT)
               ======================================================================== */}
            <section className="py-20 relative z-10" id="ueber-uns">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white rounded-[3rem] p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl relative overflow-hidden">
                        
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                            <div className="lg:col-span-7 space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-black">
                                    <Award className="w-4 h-4" />
                                    Meisterbetrieb für anspruchsvolle Architektur
                                </div>

                                <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                                    Fugenarme XXL-Großformate &amp; meisterhafte Badsanierung
                                </h2>

                                <p className="text-sm text-slate-300 leading-relaxed">
                                    Großformatige Platten (bis zu 120 x 278 cm) verlangen höchste Handwerkskunst. Wo herkömmliche Verleger an ihre Grenzen stoßen, setzen wir Spezialwerkzeuge, Lasernivellierung und modernste C2-Flexkleber ein. Das Resultat: Ein atemberaubend ruhiges, monolithisches Raumgefühl ohne störende Fugenkreuze.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                    <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/10">
                                        <span className="text-2xl font-black text-emerald-400">100 %</span>
                                        <p className="text-xs text-slate-300 mt-1">Dichtigkeit nach DIN 18534 Verbundabdichtung</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/10">
                                        <span className="text-2xl font-black text-sky-400">XXL</span>
                                        <p className="text-xs text-slate-300 mt-1">Großformate für fugenarme Wand- &amp; Bodenflächen</p>
                                    </div>
                                </div>

                                <div className="pt-2 flex flex-wrap items-center gap-4">
                                    <Link
                                        href="/kontakt"
                                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all"
                                    >
                                        <span>Vor-Ort-Beratung sichern</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <a
                                        href={`tel:${COMPANY_DATA.contact.phoneLink}`}
                                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/15 transition-all"
                                    >
                                        <Phone className="w-4 h-4 text-emerald-400" />
                                        <span>{COMPANY_DATA.contact.phone}</span>
                                    </a>
                                </div>
                            </div>

                            {/* Trust Badge Box */}
                            <div className="lg:col-span-5">
                                <div className="bg-white/10 backdrop-blur-md p-7 sm:p-8 rounded-3xl border border-white/15 shadow-xl space-y-4 text-white">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">
                                        Regional verwurzelt
                                    </span>
                                    <h3 className="text-xl font-black text-white">
                                        Fliesenverlegung Tezgel in Aßlar
                                    </h3>
                                    <p className="text-xs text-slate-300 leading-relaxed">
                                        Wir betreuen Privatkunden, Architekten und Bauherren in Aßlar, Wetzlar, Gießen, Herborn und ganz Hessen.
                                    </p>

                                    <div className="space-y-3 pt-2 text-xs text-slate-200">
                                        <div className="flex items-center gap-2.5">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                            <span>Persönliche Betreuung durch Deniz Tezgel</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                            <span>Kostenfreies Vor-Ort-Aufmaß &amp; Begutachtung</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                            <span>Faires Festpreisangebot ohne Nachforderungen</span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-white/10">
                                        <p className="text-[11px] text-slate-300 italic">
                                            „{COMPANY_DATA.motto}“
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ========================================================================
               6. KUNDENZUFRIEDENHEIT & SOCIAL PROOF
               ======================================================================== */}
            <section className="py-20 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-xs uppercase font-black tracking-wider text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-200 mb-3 inline-block">
                            Echte Referenzen
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Begeisterte Kunden in Mittelhessen
                        </h2>
                        <div className="flex items-center justify-center gap-1 mt-3">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                            ))}
                            <span className="text-xs font-bold text-slate-700 ml-2">5.0 Meisterqualität</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md shadow-slate-200/40">
                            <div className="flex items-center gap-1 text-amber-500 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed mb-4">
                                „Herr Tezgel hat unser gesamtes Badezimmer kernsaniert und großformatige Fliesen verlegt. Das Fugenbild ist ein Traum und die Baustelle wurde jeden Tag absolut sauber hinterlassen!“
                            </p>
                            <span className="text-xs font-bold text-slate-900 block">Familie M.</span>
                            <span className="text-[10px] text-slate-500 font-medium">Badsanierung in Wetzlar</span>
                        </div>

                        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md shadow-slate-200/40">
                            <div className="flex items-center gap-1 text-amber-500 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed mb-4">
                                „Perfekte Ausführung der Terrassenplatten auf Stelzlagern. Endlich läuft das Wasser rückstandslos ab und keine geplatzten Fugen mehr nach dem Winter. Absolut empfehlenswert!“
                            </p>
                            <span className="text-xs font-bold text-slate-900 block">Klaus S.</span>
                            <span className="text-[10px] text-slate-500 font-medium">Terrassensanierung in Aßlar</span>
                        </div>

                        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md shadow-slate-200/40">
                            <div className="flex items-center gap-1 text-amber-500 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed mb-4">
                                „120x120 cm Feinsteinzeug im gesamten Erdgeschoss. Herr Tezgel hat mit Laser und Nivelliersystem gearbeitet – kein einziger Zahn spürbar. Meisterleistung!“
                            </p>
                            <span className="text-xs font-bold text-slate-900 block">Dr. Thomas B.</span>
                            <span className="text-[10px] text-slate-500 font-medium">Neubauverlegung in Gießen</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================================
               7. EXPRESS-ANFRAGE FUNNEL SECTION
               ======================================================================== */}
            <section className="py-20 relative z-10" id="express-anfrage">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="text-xs uppercase font-black tracking-wider text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-200 mb-3 inline-block">
                            Kostenfrei &amp; unverbindlich
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Starten Sie Ihre Express-Anfrage
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Wählen Sie in 3 Klicks Ihr Vorhaben und senden Sie Ihre Anfrage wahlweise direkt per WhatsApp an Deniz Tezgel oder über unser digitales Anfrageformular.
                        </p>
                    </div>

                    {/* The Interactive Funnel Component */}
                    <TezgelAnfrageFunnel />
                </div>
            </section>

        </div>
    );
}
