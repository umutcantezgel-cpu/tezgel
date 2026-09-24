"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
    Phone,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    Check,
    Plus,
    Send,
    MessageCircle,
    Lock,
    Sparkles
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';

const OBJECT_TYPES = [
    { id: 'efh', title: 'Einfamilienhaus', desc: 'Freistehend oder Reihenhaus' },
    { id: 'etw', title: 'Eigentumswohnung', desc: 'Im Mehrparteienhaus' },
    { id: 'mfh', title: 'Mehrfamilienhaus', desc: 'Vermieter / Hausverwaltung' },
    { id: 'gewerbe', title: 'Gewerbeobjekt', desc: 'Büro, Praxis, Betrieb' }
];

const SCOPES = [
    { id: 'komplett', title: 'Komplettbadsanierung', desc: 'Alles neu inkl. Fliesen, Sanitär & Elektrik' },
    { id: 'barrierefrei', title: 'Barrierefreies Bad', desc: 'DIN 18040-2 mit bis zu 4.180 € Pflegekassen-Zuschuss' },
    { id: 'dusche', title: 'Wanne zu Dusche', desc: 'Umbau auf bodengleiche Walk-In-Dusche' },
    { id: 'gaeste', title: 'Gäste-WC / Kleinbad', desc: 'Kompakte Modernisierung auf kleinem Raum' }
];

const TIERS = [
    { id: 'basic', title: 'Basic', desc: 'Solide Markenqualität, funktional und zeitlos' },
    { id: 'premium', title: 'Premium', desc: 'Gehobener Komfort mit edlen Oberflächen & Echtglas' },
    { id: 'luxus', title: 'Luxus', desc: 'Freistehende Wanne, Dusch-WC & maßgefertigtes Design' }
];

const PERSON_OPTIONS = [
    { value: '1', label: '1 Person' },
    { value: '2', label: '2 Personen' },
    { value: '3-4', label: '3 - 4 Personen (Familie)' },
    { value: '5+', label: '5+ Personen' }
];

const FEATURES = [
    { id: 'walkin', label: 'Bodengleiche Walk-In-Dusche' },
    { id: 'wanne', label: 'Badewanne' },
    { id: 'doppel', label: 'Doppelwaschtisch' },
    { id: 'duschwc', label: 'Komfort Dusch-WC' },
    { id: 'fussboden', label: 'Fußbodenheizung' },
    { id: 'led-spiegel', label: 'LED-Lichtspiegel' }
];

const TOTAL_STEPS = 5;

const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all';

const optionClass = (selected, padding = 'p-5') =>
    `group ${padding} rounded-2xl border-2 text-left transition-all duration-300 ${
        selected
            ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-600/20'
            : 'border-slate-200 bg-white hover:border-emerald-500/80 hover:-translate-y-0.5'
    }`;

export default function BadanfrageFunnel() {
    const [step, setStep] = useState(1);
    const [sentVia, setSentVia] = useState(null);
    const [formData, setFormData] = useState({
        objectType: 'efh',
        scope: 'komplett',
        length: '3.0',
        width: '2.5',
        persons: '2',
        tier: 'premium',
        features: ['walkin', 'led-spiegel'],
        name: '',
        phone: '',
        email: '',
        street: '',
        zipCity: '',
        notes: ''
    });

    const toggleFeature = (feat) => {
        setFormData(prev => {
            const exists = prev.features.includes(feat);
            return {
                ...prev,
                features: exists ? prev.features.filter(f => f !== feat) : [...prev.features, feat]
            };
        });
    };

    const calculatedSqm = (parseFloat(formData.length || 0) * parseFloat(formData.width || 0)).toFixed(1);

    const objectTitle = OBJECT_TYPES.find((o) => o.id === formData.objectType)?.title ?? formData.objectType;
    const scopeTitle = SCOPES.find((s) => s.id === formData.scope)?.title ?? formData.scope;
    const tierTitle = TIERS.find((t) => t.id === formData.tier)?.title ?? formData.tier;
    const personsLabel = PERSON_OPTIONS.find((p) => p.value === formData.persons)?.label ?? formData.persons;
    const featureLabels = FEATURES.filter((f) => formData.features.includes(f.id)).map((f) => f.label);
    const addressText = [formData.street, formData.zipCity].filter(Boolean).join(', ') || 'Nicht angegeben';

    const getMessage = () =>
        `Hallo Herr ${COMPANY_DATA.owner.lastName},\nich interessiere mich für eine Badsanierung:\n\n` +
        `Immobilie: ${objectTitle}\n` +
        `Sanierungsumfang: ${scopeTitle}\n` +
        `Raummaße: ca. ${formData.length} x ${formData.width} m (${calculatedSqm} m²)\n` +
        `Personen im Haushalt: ${personsLabel}\n` +
        `Qualitätsstufe: ${tierTitle}\n` +
        `Wunschausstattung: ${featureLabels.join(', ') || 'Noch offen'}\n\n` +
        `Name: ${formData.name}\n` +
        `Telefon: ${formData.phone}\n` +
        `E-Mail: ${formData.email || 'Nicht angegeben'}\n` +
        `Adresse: ${addressText}\n` +
        (formData.notes ? `Anmerkungen: ${formData.notes}\n\n` : '\n') +
        `Bitte melden Sie sich bezüglich eines unverbindlichen Vor-Ort-Aufmaßes. Vielen Dank!`;

    const getWhatsAppUrl = () =>
        `https://wa.me/${COMPANY_DATA.contact.whatsappNumber}?text=${encodeURIComponent(getMessage())}`;

    const getMailtoUrl = () => {
        const subject = `Badanfrage: ${scopeTitle} (${calculatedSqm} m²)`;
        return `mailto:${COMPANY_DATA.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(getMessage())}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submitter = e.nativeEvent?.submitter;
        const channel = submitter && submitter.value === 'email' ? 'email' : 'whatsapp';

        if (channel === 'whatsapp') {
            window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer');
        } else {
            window.location.assign(getMailtoUrl());
        }
        setSentVia(channel);
    };

    if (sentVia) {
        const isWhatsApp = sentVia === 'whatsapp';
        return (
            <div className="glass-bezel-outer max-w-2xl mx-auto">
                <div className="glass-bezel-inner p-8 md:p-12 text-center" role="status">
                    <div className="icon-chip w-20 h-20 rounded-full mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <span className="eyebrow mb-4">
                        {isWhatsApp ? 'WhatsApp wurde geöffnet' : 'E-Mail-Programm wurde geöffnet'}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
                        Fast geschafft – bitte jetzt absenden
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 mb-6 leading-relaxed">
                        Ihre Badanfrage ({calculatedSqm} m² &middot; {scopeTitle}) ist vorbereitet. Senden Sie die Nachricht in{' '}
                        {isWhatsApp ? 'WhatsApp' : 'Ihrem E-Mail-Programm'} ab – erst dann erreicht sie uns.{' '}
                        {COMPANY_DATA.owner.fullName} meldet sich anschließend persönlich bei Ihnen, um das kostenfreie
                        Vor-Ort-Aufmaß abzustimmen.
                    </p>

                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left text-sm space-y-1.5 mb-6">
                        <p className="font-black text-slate-900">Ihre Zusammenfassung:</p>
                        <p className="text-slate-700">Kontakt: {formData.name} &middot; {formData.phone}</p>
                        <p className="text-slate-700">Ort: {addressText}</p>
                        <p className="text-slate-700">Immobilie: {objectTitle} &middot; Qualitätsstufe: {tierTitle}</p>
                    </div>

                    <p className="text-sm text-slate-700 mb-8">
                        {isWhatsApp ? 'WhatsApp hat sich nicht geöffnet?' : 'Ihr E-Mail-Programm hat sich nicht geöffnet?'}{' '}
                        <a
                            href={isWhatsApp ? getWhatsAppUrl() : getMailtoUrl()}
                            target={isWhatsApp ? '_blank' : undefined}
                            rel={isWhatsApp ? 'noopener noreferrer' : undefined}
                            className="font-bold text-emerald-800 hover:text-emerald-700 hover:underline underline-offset-2"
                        >
                            Nachricht erneut öffnen
                        </a>
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-primary w-full sm:w-auto text-xs">
                            <Phone className="w-4 h-4" />
                            Direkt anrufen: {COMPANY_DATA.contact.phone}
                        </a>
                        <button
                            type="button"
                            onClick={() => { setSentVia(null); setStep(1); }}
                            className="btn-ghost w-full sm:w-auto text-xs"
                        >
                            Weitere Anfrage stellen
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-bezel-outer max-w-3xl mx-auto overflow-hidden">
            <div className="glass-bezel-inner overflow-hidden">
                {/* Header / Progress Bar */}
                <div className="ceramic-band p-6 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="eyebrow">
                            <Sparkles className="w-3.5 h-3.5" />
                            Interaktive Badanfrage &middot; Schritt {step} von {TOTAL_STEPS}
                        </span>
                        <span className="eyebrow eyebrow-neutral">
                            Kostenlos &amp; unverbindlich
                        </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                        Planen Sie Ihr Traumbad mit dem Meisterbetrieb aus Aßlar
                    </h2>

                    {/* Progress Indicators */}
                    <div className="grid grid-cols-5 gap-2 mt-6" aria-hidden="true">
                        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
                            <div
                                key={s}
                                className={`h-2 rounded-full transition-all duration-500 ${
                                    s <= step ? 'bg-emerald-600' : 'bg-slate-200'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-6 sm:p-10">
                    {/* Step 1: Objekttyp */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <h3 className="text-base sm:text-lg font-black text-slate-900">
                                1. Um welche Art von Immobilie handelt es sich?
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {OBJECT_TYPES.map((obj) => (
                                    <button
                                        key={obj.id}
                                        type="button"
                                        aria-pressed={formData.objectType === obj.id}
                                        onClick={() => setFormData({ ...formData, objectType: obj.id })}
                                        className={optionClass(formData.objectType === obj.id)}
                                    >
                                        <span className="block font-black text-slate-900 text-sm sm:text-base mb-1 group-hover:text-emerald-800 transition-colors">{obj.title}</span>
                                        <span className="block text-xs text-slate-600">{obj.desc}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Sanierungsumfang */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <h3 className="text-base sm:text-lg font-black text-slate-900">
                                2. Welcher Sanierungsumfang ist geplant?
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {SCOPES.map((sc) => (
                                    <button
                                        key={sc.id}
                                        type="button"
                                        aria-pressed={formData.scope === sc.id}
                                        onClick={() => setFormData({ ...formData, scope: sc.id })}
                                        className={optionClass(formData.scope === sc.id)}
                                    >
                                        <span className="block font-black text-slate-900 text-sm sm:text-base mb-1 group-hover:text-emerald-800 transition-colors">{sc.title}</span>
                                        <span className="block text-xs text-slate-600">{sc.desc}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Raummaße */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <h3 className="text-base sm:text-lg font-black text-slate-900">
                                3. Ungefähre Raummaße Ihres Badezimmers
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="badanfrage-length" className="block text-xs font-black text-slate-800 mb-1.5">Länge (m)</label>
                                    <input
                                        id="badanfrage-length"
                                        type="number"
                                        step="0.1"
                                        min="1"
                                        max="15"
                                        value={formData.length}
                                        onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                                        className={`${inputClass} font-bold tabular-nums`}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="badanfrage-width" className="block text-xs font-black text-slate-800 mb-1.5">Breite (m)</label>
                                    <input
                                        id="badanfrage-width"
                                        type="number"
                                        step="0.1"
                                        min="1"
                                        max="15"
                                        value={formData.width}
                                        onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                                        className={`${inputClass} font-bold tabular-nums`}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="badanfrage-persons" className="block text-xs font-black text-slate-800 mb-1.5">Personen im Haushalt</label>
                                    <select
                                        id="badanfrage-persons"
                                        value={formData.persons}
                                        onChange={(e) => setFormData({ ...formData, persons: e.target.value })}
                                        className={`${inputClass} font-bold`}
                                    >
                                        {PERSON_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-700">Berechnete Grundfläche:</span>
                                <span className="font-display text-lg font-black text-slate-900 tabular-nums" aria-live="polite">{calculatedSqm} m²</span>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Ausstattung & Qualitätsstufe */}
                    {step === 4 && (
                        <div className="space-y-6">
                            <h3 className="text-base sm:text-lg font-black text-slate-900">
                                4. Qualitätskategorie &amp; gewünschte Elemente
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {TIERS.map((t) => (
                                    <button
                                        key={t.id}
                                        type="button"
                                        aria-pressed={formData.tier === t.id}
                                        onClick={() => setFormData({ ...formData, tier: t.id })}
                                        className={optionClass(formData.tier === t.id, 'p-4')}
                                    >
                                        <span className="block font-black text-slate-900 text-xs sm:text-sm mb-1 group-hover:text-emerald-800 transition-colors">{t.title}</span>
                                        <span className="block text-[11px] text-slate-600 leading-snug">{t.desc}</span>
                                    </button>
                                ))}
                            </div>

                            <fieldset className="pt-3">
                                <legend className="block text-xs font-black uppercase tracking-widest text-slate-800 mb-2.5">Wunschausstattung auswählen</legend>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {FEATURES.map((item) => {
                                        const isSelected = formData.features.includes(item.id);
                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                aria-pressed={isSelected}
                                                onClick={() => toggleFeature(item.id)}
                                                className={`px-3 py-2.5 rounded-xl border text-xs font-bold text-left transition-all duration-300 flex items-center gap-2 ${
                                                    isSelected
                                                        ? 'bg-emerald-50 text-emerald-800 border-emerald-600'
                                                        : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-500/80'
                                                }`}
                                            >
                                                {isSelected ? (
                                                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                                                ) : (
                                                    <Plus className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                                                )}
                                                {item.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </fieldset>
                        </div>
                    )}

                    {/* Step 5: Kontaktdaten & Absenden */}
                    {step === 5 && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1">
                                5. Kontaktdaten &amp; Versand Ihrer Anfrage
                            </h3>
                            <p className="text-sm text-slate-700 mb-4">
                                Senden Sie Ihre Badanfrage direkt per WhatsApp oder E-Mail an {COMPANY_DATA.owner.fullName}. Keine
                                Weitergabe an Dritte.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="badanfrage-name" className="block text-sm font-bold text-slate-800 mb-1.5">
                                        Vor- &amp; Nachname <span className="text-emerald-800">*</span>
                                    </label>
                                    <input
                                        id="badanfrage-name"
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
                                    <label htmlFor="badanfrage-phone" className="block text-sm font-bold text-slate-800 mb-1.5">
                                        Telefonnummer für Rückfragen <span className="text-emerald-800">*</span>
                                    </label>
                                    <input
                                        id="badanfrage-phone"
                                        type="tel"
                                        required
                                        minLength={6}
                                        autoComplete="tel"
                                        placeholder="Für die Rücksprache zum Aufmaß"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="badanfrage-email" className="block text-sm font-bold text-slate-800 mb-1.5">E-Mail-Adresse (optional)</label>
                                    <input
                                        id="badanfrage-email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="ihre-adresse@beispiel.de"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="badanfrage-street" className="block text-sm font-bold text-slate-800 mb-1.5">Straße &amp; Hausnummer (optional)</label>
                                    <input
                                        id="badanfrage-street"
                                        type="text"
                                        autoComplete="street-address"
                                        placeholder="Straße und Hausnummer"
                                        value={formData.street}
                                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="badanfrage-zip" className="block text-sm font-bold text-slate-800 mb-1.5">PLZ &amp; Ort des Bauvorhabens</label>
                                <input
                                    id="badanfrage-zip"
                                    type="text"
                                    autoComplete="postal-code"
                                    placeholder="z. B. 35614 Aßlar"
                                    value={formData.zipCity}
                                    onChange={(e) => setFormData({ ...formData, zipCity: e.target.value })}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label htmlFor="badanfrage-notes" className="block text-sm font-bold text-slate-800 mb-1.5">Anmerkungen oder besondere Wünsche (optional)</label>
                                <textarea
                                    id="badanfrage-notes"
                                    rows={3}
                                    placeholder="z. B. Pflegegrad vorhanden, Nischenlösung gewünscht, Altbau-Besonderheiten …"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    className={`${inputClass} resize-none`}
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-200 space-y-3">
                                <div className="flex flex-col sm:flex-row items-center gap-3">
                                    <button type="submit" name="channel" value="whatsapp" className="glass-button-whatsapp w-full sm:flex-1 text-sm">
                                        <MessageCircle className="w-4 h-4" />
                                        Badanfrage per WhatsApp senden
                                    </button>
                                    <button type="submit" name="channel" value="email" className="btn-ghost w-full sm:w-auto">
                                        <Send className="w-4 h-4 text-emerald-700" />
                                        Per E-Mail senden
                                    </button>
                                </div>

                                <p className="flex items-start justify-center gap-1.5 text-xs text-slate-700 text-center leading-relaxed">
                                    <Lock className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                                    <span>
                                        Ihre Angaben werden nur zur Bearbeitung Ihrer Anfrage verwendet. Beim Versand per WhatsApp gelten
                                        zusätzlich die Datenschutzbestimmungen von WhatsApp. Details in unserer{' '}
                                        <Link href="/datenschutz" className="font-bold text-emerald-800 underline underline-offset-2 hover:text-emerald-700">
                                            Datenschutzerklärung
                                        </Link>
                                        .
                                    </span>
                                </p>
                            </div>

                            <div className="pt-1 flex justify-start">
                                <button
                                    type="button"
                                    onClick={() => setStep(4)}
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-emerald-800 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Zurück zu Schritt 4
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Navigation Buttons for Steps 1-4 */}
                    {step < TOTAL_STEPS && (
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
