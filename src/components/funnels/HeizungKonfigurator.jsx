"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    Award,
    Phone
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';

const TECH_OPTIONS = [
    { id: 'heatpump-air', title: 'Luft/Wasser-Wärmepumpe', desc: 'Propan R290, schnell installiert' },
    { id: 'heatpump-ground', title: 'Erdwärmepumpe', desc: 'Höchste Effizienz mit Erdsonde' },
    { id: 'hybrid', title: 'Gas-Hybrid', desc: 'Wärmepumpe mit Gas-Kessel' }
];

const inputClass =
    'w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all';

const cardOptionClass = (selected) =>
    `p-4 rounded-2xl border-2 text-left transition-all duration-300 ${
        selected
            ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-600/20'
            : 'border-slate-200 bg-white hover:border-emerald-500/80 hover:-translate-y-0.5'
    }`;

const chipOptionClass = (selected) =>
    `p-3 rounded-xl border text-xs font-bold transition-all duration-300 ${
        selected
            ? 'bg-emerald-50 text-emerald-800 border-emerald-600'
            : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-500/80'
    }`;

export default function HeizungKonfigurator() {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        buildingType: 'efh',
        constructionYear: '1980-2000',
        livingArea: 140,
        currentFuel: 'gas',
        distribution: 'radiators',
        targetTech: 'heatpump-air',
        annualConsumption: '20000',
        ownerStatus: 'owner_occupier',
        householdIncomeUnder40k: false,
        name: '',
        phone: '',
        email: '',
        zipCity: '',
        notes: '',
        privacyConsent: false
    });

    const calculateSubsidyRate = () => {
        let rate = 30;
        if (formData.targetTech.includes('heatpump')) {
            rate += 5;
            if (formData.ownerStatus === 'owner_occupier') {
                rate += 20;
            }
            if (formData.householdIncomeUnder40k) {
                rate += 30;
            }
        }
        return Math.min(rate, 70);
    };

    const subsidyRate = calculateSubsidyRate();
    const estimatedMaxGrant = (30000 * (subsidyRate / 100)).toFixed(0);
    const techTitle = TECH_OPTIONS.find((t) => t.id === formData.targetTech)?.title ?? formData.targetTech;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.privacyConsent) {
            alert('Bitte stimmen Sie der Datenschutzerklärung zu.');
            return;
        }
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="glass-bezel-outer max-w-2xl mx-auto">
                <div className="glass-bezel-inner p-8 md:p-12 text-center">
                    <div className="icon-chip w-16 h-16 rounded-full mx-auto mb-6">
                        <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
                        Ihre Heizungsanalyse &amp; Förderberechnung liegt vor!
                    </h3>
                    <p className="text-sm text-slate-700 mb-6 leading-relaxed">
                        Vielen Dank, {formData.name}. Für Ihr Gebäude ({formData.livingArea} m² &middot; bisher {formData.currentFuel.toUpperCase()}) berechnen wir eine staatliche Förderquote von bis zu <strong className="text-emerald-800 font-black">{subsidyRate} %</strong> (bis zu ca. {estimatedMaxGrant} € Zuschuss über KfW 458).
                    </p>

                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left text-sm space-y-2 mb-8">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                            <span className="font-black text-slate-900">Technologie: {techTitle}</span>
                            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-black text-xs tabular-nums">{subsidyRate} % Förderung</span>
                        </div>
                        <p className="text-slate-700">Kontakt: {formData.name} &middot; {formData.phone} &middot; {formData.email}</p>
                        <p className="text-slate-700">Standort: {formData.zipCity}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href={`tel:${COMPANY_DATA.contact.phoneLink}`}
                            className="btn-primary w-full sm:w-auto text-xs"
                        >
                            <Phone className="w-4 h-4" />
                            Jetzt Termin sichern: {COMPANY_DATA.contact.phone}
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-bezel-outer max-w-3xl mx-auto overflow-hidden">
            <div className="glass-bezel-inner overflow-hidden">
                {/* Header */}
                <div className="ceramic-band p-6 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="eyebrow">
                            <Award className="w-3.5 h-3.5" />
                            Wärmepumpen-Konfigurator
                        </span>
                        <span className="eyebrow eyebrow-neutral tabular-nums">
                            Schritt {step} von 4
                        </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                        Heizungstausch &amp; Wärmepumpen-Förderung berechnen
                    </h2>

                    {/* Live Subsidy Preview */}
                    <div className="mt-4 p-3.5 rounded-2xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-2" aria-live="polite">
                        <span className="text-xs font-bold text-slate-700">Berechneter Fördersatz (BEG/KfW 458):</span>
                        <span className="font-display text-lg font-black text-emerald-800 tabular-nums">bis zu {subsidyRate} %</span>
                    </div>

                    {/* Progress Indicators */}
                    <div className="grid grid-cols-4 gap-2 mt-4" aria-hidden="true">
                        {[1, 2, 3, 4].map((s) => (
                            <div
                                key={s}
                                className={`h-2 rounded-full transition-all duration-500 ${
                                    s <= step ? 'bg-emerald-600' : 'bg-slate-200'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Form Steps */}
                <div className="p-6 sm:p-10">
                    {/* Step 1: Gebäudeart & Baujahr */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <h3 className="text-base sm:text-lg font-black text-slate-900">
                                1. Gebäudetyp &amp; Baujahr Ihrer Immobilie
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    { id: 'efh', label: 'Einfamilienhaus', sub: 'Freistehend oder Doppelhaushälfte' },
                                    { id: 'rh', label: 'Reihenhaus', sub: 'Mittel- oder Endhaus' },
                                    { id: 'mfh', label: 'Mehrfamilienhaus', sub: '3+ Wohneinheiten' },
                                    { id: 'gewerbe', label: 'Gewerbeimmobilie', sub: 'Büro, Halle, Praxis' }
                                ].map((b) => (
                                    <button
                                        key={b.id}
                                        type="button"
                                        aria-pressed={formData.buildingType === b.id}
                                        onClick={() => setFormData({ ...formData, buildingType: b.id })}
                                        className={cardOptionClass(formData.buildingType === b.id)}
                                    >
                                        <span className="block font-black text-slate-900 text-xs sm:text-sm">{b.label}</span>
                                        <span className="block text-[11px] text-slate-600">{b.sub}</span>
                                    </button>
                                ))}
                            </div>

                            <fieldset className="pt-2">
                                <legend className="block text-xs font-black text-slate-800 mb-2">Ungefähres Baujahr:</legend>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {[
                                        { id: 'vor-1978', label: 'Vor 1978 (Altbau)' },
                                        { id: '1978-1995', label: '1978 – 1995' },
                                        { id: '1996-2015', label: '1996 – 2015' },
                                        { id: 'ab-2016', label: 'Ab 2016 / Neubau' }
                                    ].map((yr) => (
                                        <button
                                            key={yr.id}
                                            type="button"
                                            aria-pressed={formData.constructionYear === yr.id}
                                            onClick={() => setFormData({ ...formData, constructionYear: yr.id })}
                                            className={chipOptionClass(formData.constructionYear === yr.id)}
                                        >
                                            {yr.label}
                                        </button>
                                    ))}
                                </div>
                            </fieldset>
                        </div>
                    )}

                    {/* Step 2: Wohnfläche & aktueller Brennstoff */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <h3 className="text-base sm:text-lg font-black text-slate-900">
                                2. Beheizte Wohnfläche &amp; bisherige Heiztechnik
                            </h3>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label htmlFor="heizung-living-area" className="text-xs font-black text-slate-800">Wohnfläche (m²):</label>
                                    <span className="font-display text-base font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 tabular-nums">
                                        {formData.livingArea} m²
                                    </span>
                                </div>
                                <input
                                    id="heizung-living-area"
                                    type="range"
                                    min="60"
                                    max="450"
                                    step="10"
                                    value={formData.livingArea}
                                    onChange={(e) => setFormData({ ...formData, livingArea: Number(e.target.value) })}
                                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                                />
                                <div className="flex justify-between text-[10px] text-slate-600 font-semibold mt-1 tabular-nums">
                                    <span>60 m²</span>
                                    <span>250 m²</span>
                                    <span>450 m²</span>
                                </div>
                            </div>

                            <fieldset>
                                <legend className="block text-xs font-black text-slate-800 mb-2">Aktueller Energieträger:</legend>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {[
                                        { id: 'gas', label: 'Erdgas' },
                                        { id: 'oel', label: 'Heizöl' },
                                        { id: 'strom', label: 'Nachtspeicher' },
                                        { id: 'holz', label: 'Holz / Pellets' }
                                    ].map((fuel) => (
                                        <button
                                            key={fuel.id}
                                            type="button"
                                            aria-pressed={formData.currentFuel === fuel.id}
                                            onClick={() => setFormData({ ...formData, currentFuel: fuel.id })}
                                            className={chipOptionClass(formData.currentFuel === fuel.id)}
                                        >
                                            {fuel.label}
                                        </button>
                                    ))}
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend className="block text-xs font-black text-slate-800 mb-2">Wärmeverteilung im Haus:</legend>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { id: 'radiators', label: 'Heizkörper' },
                                        { id: 'underfloor', label: 'Fußbodenheizung' },
                                        { id: 'mixed', label: 'Kombiniert' }
                                    ].map((dist) => (
                                        <button
                                            key={dist.id}
                                            type="button"
                                            aria-pressed={formData.distribution === dist.id}
                                            onClick={() => setFormData({ ...formData, distribution: dist.id })}
                                            className={chipOptionClass(formData.distribution === dist.id)}
                                        >
                                            {dist.label}
                                        </button>
                                    ))}
                                </div>
                            </fieldset>
                        </div>
                    )}

                    {/* Step 3: Wunschtechnik & Förderbonus-Kriterien */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <h3 className="text-base sm:text-lg font-black text-slate-900">
                                3. Zukünftige Wunsch-Technologie
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {TECH_OPTIONS.map((tech) => (
                                    <button
                                        key={tech.id}
                                        type="button"
                                        aria-pressed={formData.targetTech === tech.id}
                                        onClick={() => setFormData({ ...formData, targetTech: tech.id })}
                                        className={cardOptionClass(formData.targetTech === tech.id)}
                                    >
                                        <span className="block font-black text-slate-900 text-xs mb-1">{tech.title}</span>
                                        <span className="block text-[11px] text-slate-600">{tech.desc}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                                <h4 className="font-black text-xs text-amber-900 uppercase tracking-wide">
                                    Staatliche Förder-Boni aktivieren (BEG / KfW 458):
                                </h4>
                                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                                    <input
                                        type="checkbox"
                                        checked={formData.ownerStatus === 'owner_occupier'}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            ownerStatus: e.target.checked ? 'owner_occupier' : 'landlord'
                                        })}
                                        className="mt-0.5 rounded accent-emerald-700"
                                    />
                                    <span>
                                        <strong className="text-slate-900">+20 % Geschwindigkeits-Bonus:</strong> Ich bewohne die Immobilie selbst und tausche eine alte fossile Heizung.
                                    </span>
                                </label>

                                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                                    <input
                                        type="checkbox"
                                        checked={formData.householdIncomeUnder40k}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            householdIncomeUnder40k: e.target.checked
                                        })}
                                        className="mt-0.5 rounded accent-emerald-700"
                                    />
                                    <span>
                                        <strong className="text-slate-900">+30 % Einkommens-Bonus:</strong> Zu versteuerndes Haushaltsjahreseinkommen unter 40.000 €.
                                    </span>
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Kontaktdaten & Ergebnis absenden */}
                    {step === 4 && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1">
                                4. Kostenfreie Vor-Ort-Heizlastanalyse anfordern
                            </h3>
                            <p className="text-sm text-slate-700 mb-4">
                                Die genaue Auslegung und die Begleitung des Förderantrags erfolgen durch einen Heizungsfachbetrieb.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="heizung-name" className="block text-xs font-bold text-slate-800 mb-1">Name, Vorname *</label>
                                    <input
                                        id="heizung-name"
                                        type="text"
                                        required
                                        autoComplete="name"
                                        placeholder="Vor- und Nachname"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="heizung-phone" className="block text-xs font-bold text-slate-800 mb-1">Telefonnummer *</label>
                                    <input
                                        id="heizung-phone"
                                        type="tel"
                                        required
                                        autoComplete="tel"
                                        placeholder="Für Rückfragen"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="heizung-email" className="block text-xs font-bold text-slate-800 mb-1">E-Mail-Adresse *</label>
                                    <input
                                        id="heizung-email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        placeholder="ihre-adresse@beispiel.de"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="heizung-zip" className="block text-xs font-bold text-slate-800 mb-1">PLZ &amp; Ort</label>
                                    <input
                                        id="heizung-zip"
                                        type="text"
                                        autoComplete="postal-code"
                                        placeholder="PLZ und Ort"
                                        value={formData.zipCity}
                                        onChange={(e) => setFormData({ ...formData, zipCity: e.target.value })}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                                    <input
                                        type="checkbox"
                                        required
                                        checked={formData.privacyConsent}
                                        onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                                        className="mt-0.5 rounded accent-emerald-700"
                                    />
                                    <span>
                                        Ich stimme zu, dass meine Daten gemäß der{' '}
                                        <Link href="/datenschutz" className="text-emerald-800 hover:text-emerald-700 underline underline-offset-2 font-semibold">
                                            Datenschutzerklärung
                                        </Link>{' '}
                                        verarbeitet werden.
                                    </span>
                                </label>
                            </div>

                            <button type="submit" className="btn-primary w-full mt-4 text-xs sm:text-sm">
                                Heizungsangebot &amp; {subsidyRate} % Förderanalyse anfordern
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    )}

                    {/* Step Navigation */}
                    {step < 4 && (
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
                            {step > 1 ? (
                                <button
                                    type="button"
                                    onClick={() => setStep(step - 1)}
                                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-slate-700 hover:text-emerald-800 font-bold text-xs transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Zurück
                                </button>
                            ) : (
                                <div />
                            )}

                            <button
                                type="button"
                                onClick={() => setStep(step + 1)}
                                className="btn-primary px-6 py-3 text-xs"
                            >
                                Weiter zu Schritt {step + 1}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
