"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
    Calculator,
    Check,
    ArrowRight,
    Phone,
    Info,
    BadgePercent,
    MessageCircle,
    Send,
    CheckCircle2
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';

const SCOPE_OPTIONS = [
    { id: 'komplett', label: 'Komplettbad', desc: 'Schlüsselfertig' },
    { id: 'teil', label: 'Teilsanierung', desc: 'Sanitär & Keramik' },
    { id: 'dusche-nur', label: 'Wanne zu Dusche', desc: 'Nur Duschbereich' }
];

const TIER_OPTIONS = [
    { id: 'basic', label: 'Basic', tag: 'ab ~6.900 €', desc: 'Solide Markenqualität' },
    { id: 'premium', label: 'Premium', tag: 'ab ~17.200 €', desc: 'Edle Oberflächen' },
    { id: 'luxus', label: 'Luxus', tag: 'ab ~24.000 €', desc: 'Spa, Dusch-WC' }
];

const EXTRA_OPTIONS = [
    { id: 'walkin', label: 'Bodengleiche Walk-In-Dusche' },
    { id: 'badewanne', label: 'Badewanne / Komfortwanne' },
    { id: 'dusch-wc', label: 'Dusch-WC mit Hygiene-Spülung' },
    { id: 'doppelwaschtisch', label: 'Möbel-Doppelwaschtisch' },
    { id: 'fussbodenheizung', label: 'Fußbodenheizung' },
    { id: 'design-heizkoerper', label: 'Design-Heizkörper' },
    { id: 'led-spiegel', label: 'LED-Lichtspiegel' },
    { id: 'fliesen', label: 'Großformat-Fliesenverlegung' }
];

const inputClass =
    'w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all';

export default function BudgetKalkulator() {
    const [sqm, setSqm] = useState(8.2);
    const [tier, setTier] = useState('premium');
    const [sanitaryScope, setSanitaryScope] = useState('komplett');
    const [selectedOptions, setSelectedOptions] = useState([
        'walkin',
        'led-spiegel',
        'design-heizkoerper',
        'fliesen'
    ]);
    const [contactOpen, setContactOpen] = useState(false);
    const [leadData, setLeadData] = useState({ name: '', phone: '', email: '' });
    const [sentVia, setSentVia] = useState(null);

    const toggleOption = (id) => {
        setSelectedOptions(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const baseRates = {
        basic: 1200,
        premium: 1900,
        luxus: 2800
    };

    const optionCosts = {
        'walkin': { basic: 1500, premium: 2500, luxus: 3800 },
        'badewanne': { basic: 1200, premium: 2200, luxus: 4500 },
        'dusch-wc': { basic: 1800, premium: 2800, luxus: 4200 },
        'doppelwaschtisch': { basic: 900, premium: 1800, luxus: 3200 },
        'fussbodenheizung': { basic: 800, premium: 1400, luxus: 2200 },
        'design-heizkoerper': { basic: 350, premium: 850, luxus: 1500 },
        'led-spiegel': { basic: 300, premium: 700, luxus: 1400 },
        'fliesen': { basic: 1800, premium: 3200, luxus: 5500 }
    };

    let calculatedBase = sqm * baseRates[tier];
    if (sanitaryScope === 'teil') calculatedBase *= 0.6;
    if (sanitaryScope === 'dusche-nur') calculatedBase *= 0.35;

    let optionsTotal = 0;
    selectedOptions.forEach(opt => {
        if (optionCosts[opt]) {
            optionsTotal += optionCosts[opt][tier] || 0;
        }
    });

    const minEstimate = Math.round((calculatedBase + optionsTotal) * 0.9 / 100) * 100;
    const maxEstimate = Math.round((calculatedBase + optionsTotal) * 1.15 / 100) * 100;

    const sqmLabel = sqm.toLocaleString('de-DE');
    const estimateText = `${minEstimate.toLocaleString('de-DE')} € – ${maxEstimate.toLocaleString('de-DE')} €`;
    const matchingBath = sqm <= 9
        ? { label: 'Basic-Bad 8,2 ㎡ (~6.942 €)', slug: 'basic-bad-8_2' }
        : { label: 'Komfort-Bad 15,9 ㎡ (~17.231 €)', slug: 'premium-bad-15_9' };

    const getLeadMessage = () => {
        const scopeLabel = SCOPE_OPTIONS.find((s) => s.id === sanitaryScope)?.label ?? sanitaryScope;
        const tierLabel = TIER_OPTIONS.find((t) => t.id === tier)?.label ?? tier;
        const extras = EXTRA_OPTIONS.filter((o) => selectedOptions.includes(o.id)).map((o) => o.label);
        return (
            `Hallo Herr ${COMPANY_DATA.owner.lastName},\nich habe den Bad-Budgetkalkulator genutzt und bitte um ein Festpreisangebot:\n\n` +
            `Badgröße: ca. ${sqmLabel} m²\n` +
            `Sanierungsumfang: ${scopeLabel}\n` +
            `Qualitätsstufe: ${tierLabel}\n` +
            `Wunschausstattung: ${extras.join(', ') || 'Keine Extras gewählt'}\n` +
            `Berechneter Richtpreis: ${estimateText}\n\n` +
            `Name: ${leadData.name}\n` +
            `Telefon: ${leadData.phone}\n` +
            `E-Mail: ${leadData.email || 'Nicht angegeben'}\n\n` +
            `Bitte melden Sie sich bezüglich eines unverbindlichen Vor-Ort-Aufmaßes. Vielen Dank!`
        );
    };

    const handleLeadSubmit = (e) => {
        e.preventDefault();
        const submitter = e.nativeEvent?.submitter;
        const channel = submitter && submitter.value === 'email' ? 'email' : 'whatsapp';
        const message = getLeadMessage();

        if (channel === 'whatsapp') {
            window.open(
                `https://wa.me/${COMPANY_DATA.contact.whatsappNumber}?text=${encodeURIComponent(message)}`,
                '_blank',
                'noopener,noreferrer'
            );
        } else {
            const subject = `Festpreisanfrage Bad (ca. ${sqmLabel} m²)`;
            window.location.assign(`mailto:${COMPANY_DATA.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`);
        }
        setSentVia(channel);
    };

    return (
        <div className="glass-bezel-outer max-w-4xl mx-auto overflow-hidden">
            <div className="glass-bezel-inner overflow-hidden">
                {/* Header */}
                <div className="ceramic-band p-6 sm:p-10">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="eyebrow">
                            <Calculator className="w-3.5 h-3.5" />
                            Online-Budgetrechner
                        </span>
                        <span className="eyebrow eyebrow-neutral hidden sm:inline-flex">
                            Transparente Festpreis-Orientierung
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black mb-2 text-slate-900">
                        Badsanierungs-Kosten sofort online kalkulieren
                    </h2>
                    <p className="text-sm text-slate-700 max-w-2xl leading-relaxed">
                        Ermitteln Sie eine realistische Kostenspanne für Ihr Badezimmer in Aßlar, Wetzlar und Mittelhessen –
                        inklusive hochwertiger Markenkomponenten.
                    </p>
                </div>

                <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Controls (Left 7 Cols) */}
                    <div className="lg:col-span-7 space-y-7">
                        {/* 1. Room Size Slider */}
                        <div>
                            <div className="flex items-center justify-between gap-3 mb-2">
                                <label htmlFor="budget-sqm" className="text-sm font-black text-slate-900">
                                    1. Badezimmer-Größe in Quadratmetern:
                                </label>
                                <span className="font-display text-base sm:text-lg font-black text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-xl border border-emerald-200 tabular-nums whitespace-nowrap">
                                    {sqmLabel} m²
                                </span>
                            </div>
                            <input
                                id="budget-sqm"
                                type="range"
                                min="3.5"
                                max="25"
                                step="0.5"
                                value={sqm}
                                onChange={(e) => setSqm(parseFloat(e.target.value))}
                                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                            />
                            <div className="flex justify-between text-[10px] sm:text-[11px] text-slate-600 font-semibold mt-1 tabular-nums">
                                <span>3,5 m² (Gäste-WC)</span>
                                <span>8,2 m² (Standard)</span>
                                <span>15,9 m² (Komfort)</span>
                                <span>25 m² (Spa)</span>
                            </div>
                        </div>

                        {/* 2. Sanierungsumfang */}
                        <fieldset>
                            <legend className="block text-sm font-black text-slate-900 mb-2">
                                2. Sanierungsumfang:
                            </legend>
                            <div className="grid grid-cols-3 gap-2">
                                {SCOPE_OPTIONS.map((scope) => {
                                    const isSelected = sanitaryScope === scope.id;
                                    return (
                                        <button
                                            key={scope.id}
                                            type="button"
                                            aria-pressed={isSelected}
                                            onClick={() => setSanitaryScope(scope.id)}
                                            className={`p-3 rounded-2xl border text-left transition-all duration-300 ${
                                                isSelected
                                                    ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-600/20'
                                                    : 'border-slate-200 bg-white hover:border-emerald-500/80 hover:-translate-y-0.5'
                                            }`}
                                        >
                                            <span className={`block text-xs font-black ${isSelected ? 'text-emerald-800' : 'text-slate-900'}`}>{scope.label}</span>
                                            <span className="block text-[11px] text-slate-600">{scope.desc}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </fieldset>

                        {/* 3. Qualitätskategorie */}
                        <fieldset>
                            <legend className="block text-sm font-black text-slate-900 mb-2">
                                3. Qualitätsstufe:
                            </legend>
                            <div className="grid grid-cols-3 gap-2">
                                {TIER_OPTIONS.map((t) => {
                                    const isSelected = tier === t.id;
                                    return (
                                        <button
                                            key={t.id}
                                            type="button"
                                            aria-pressed={isSelected}
                                            onClick={() => setTier(t.id)}
                                            className={`p-3 rounded-2xl border text-left transition-all duration-300 ${
                                                isSelected
                                                    ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-600/20'
                                                    : 'border-slate-200 bg-white hover:border-emerald-500/80 hover:-translate-y-0.5'
                                            }`}
                                        >
                                            <span className="block text-xs font-black text-slate-900">{t.label}</span>
                                            <span className="block text-[11px] font-bold text-emerald-800 tabular-nums">{t.tag}</span>
                                            <span className="block text-[11px] text-slate-600 leading-snug">{t.desc}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </fieldset>

                        {/* 4. Sonderausstattungen */}
                        <fieldset>
                            <legend className="block text-sm font-black text-slate-900 mb-2">
                                4. Wunschausstattung &amp; Extras:
                            </legend>
                            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2">
                                {EXTRA_OPTIONS.map((opt) => {
                                    const isSelected = selectedOptions.includes(opt.id);
                                    return (
                                        <button
                                            key={opt.id}
                                            type="button"
                                            aria-pressed={isSelected}
                                            onClick={() => toggleOption(opt.id)}
                                            className={`px-3 py-2 rounded-xl border text-xs font-bold text-left transition-all duration-300 flex items-center justify-between gap-2 ${
                                                isSelected
                                                    ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                                                    : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-500/80'
                                            }`}
                                        >
                                            <span>{opt.label}</span>
                                            {isSelected && (
                                                <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </fieldset>
                    </div>

                    {/* Price Display & Actions (Right 5 Cols) */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200">
                        <div className="space-y-4">
                            <span className="eyebrow eyebrow-sky">
                                <Info className="w-3.5 h-3.5" />
                                Unverbindliche Richtwerte
                            </span>

                            <div aria-live="polite">
                                <span className="text-[11px] font-black uppercase tracking-widest text-slate-600 block">
                                    Geschätzter Richtpreis:
                                </span>
                                <p className="font-display text-2xl sm:text-3xl font-black text-emerald-800 mt-1 tabular-nums">
                                    {estimateText}
                                </p>
                                <p className="text-xs text-slate-600 mt-1">
                                    Richtwert inkl. Material, Markenarmaturen, Vorwandinstallation und Fachmontage. Den verbindlichen
                                    Festpreis erhalten Sie nach dem kostenfreien Vor-Ort-Aufmaß.
                                </p>
                            </div>

                            {/* Reference to exact Musterbad */}
                            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1 text-xs">
                                <p className="font-bold text-slate-900 flex items-center justify-between gap-2">
                                    <span>Musterbad-Vergleich:</span>
                                    <Link href="/bad/musterbaeder" className="text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2 font-bold inline-flex items-center gap-1">
                                        Katalog
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </p>
                                <p className="text-slate-700">
                                    Passend:{' '}
                                    <Link
                                        href={`/bad/musterbaeder/${matchingBath.slug}`}
                                        className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2"
                                    >
                                        {matchingBath.label}
                                    </Link>
                                </p>
                            </div>

                            {/* Subsidies banner */}
                            <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-xs space-y-1 text-slate-700">
                                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                                    <BadgePercent className="w-4 h-4 text-sky-600" />
                                    Bis zu 4.180 € Pflegekassen-Zuschuss
                                </p>
                                <p>
                                    Bei Pflegegrad für barrierefreie Bäder nach DIN 18040-2.{' '}
                                    <Link href="/bad/barrierefreies-bad" className="font-bold text-sky-800 hover:underline underline-offset-2">
                                        Mehr erfahren
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Action Block */}
                        <div className="pt-4 border-t border-slate-200 space-y-3">
                            {!contactOpen ? (
                                <button
                                    type="button"
                                    onClick={() => setContactOpen(true)}
                                    className="btn-primary w-full text-xs"
                                >
                                    Angebot mit Festpreis anfordern
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            ) : sentVia ? (
                                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-2" role="status">
                                    <p className="font-black flex items-center gap-1.5">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                        {sentVia === 'whatsapp' ? 'WhatsApp wurde geöffnet' : 'E-Mail-Programm wurde geöffnet'}
                                    </p>
                                    <p className="text-slate-700">
                                        Bitte senden Sie die vorbereitete Nachricht mit Ihrer Kalkulation dort ab – erst dann erreicht
                                        sie uns.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setSentVia(null)}
                                        className="font-bold text-emerald-800 hover:text-emerald-700 underline underline-offset-2"
                                    >
                                        Erneut senden oder Kanal wechseln
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleLeadSubmit} className="space-y-2.5">
                                    <label htmlFor="budget-lead-name" className="sr-only">Ihr Name</label>
                                    <input
                                        id="budget-lead-name"
                                        type="text"
                                        required
                                        autoComplete="name"
                                        placeholder="Ihr Name *"
                                        value={leadData.name}
                                        onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                                        className={inputClass}
                                    />
                                    <label htmlFor="budget-lead-phone" className="sr-only">Ihre Telefonnummer</label>
                                    <input
                                        id="budget-lead-phone"
                                        type="tel"
                                        required
                                        minLength={6}
                                        autoComplete="tel"
                                        placeholder="Ihre Telefonnummer *"
                                        value={leadData.phone}
                                        onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                                        className={inputClass}
                                    />
                                    <label htmlFor="budget-lead-email" className="sr-only">Ihre E-Mail-Adresse (optional)</label>
                                    <input
                                        id="budget-lead-email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="Ihre E-Mail-Adresse (optional)"
                                        value={leadData.email}
                                        onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                                        className={inputClass}
                                    />
                                    <button type="submit" name="channel" value="whatsapp" className="glass-button-whatsapp w-full text-xs">
                                        <MessageCircle className="w-4 h-4" />
                                        Kalkulation per WhatsApp senden
                                    </button>
                                    <button type="submit" name="channel" value="email" className="btn-ghost w-full text-xs">
                                        <Send className="w-4 h-4 text-emerald-700" />
                                        Per E-Mail senden
                                    </button>
                                    <p className="text-[11px] text-slate-600 leading-relaxed">
                                        Ihre Angaben werden nur zur Bearbeitung Ihrer Anfrage verwendet.{' '}
                                        <Link href="/datenschutz" className="font-bold text-emerald-800 underline underline-offset-2 hover:text-emerald-700">
                                            Datenschutz
                                        </Link>
                                    </p>
                                </form>
                            )}

                            <a
                                href={`tel:${COMPANY_DATA.contact.phoneLink}`}
                                className="btn-ghost w-full text-xs"
                            >
                                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                                Sofort anrufen: {COMPANY_DATA.contact.phone}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
