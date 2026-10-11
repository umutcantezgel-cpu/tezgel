"use client";
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
    Sparkles,
    Loader2,
    AlertCircle
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import {
    useBadanfrage,
    OBJECT_TYPES,
    SCOPES,
    TIERS,
    PERSON_OPTIONS,
    FEATURES,
    TOTAL_STEPS
} from '@/lib/formulare/useBadanfrage';

const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 placeholder:text-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition-all';

const optionClass = (selected, padding = 'p-5') =>
    `group ${padding} rounded-xl border-2 text-left transition-all duration-200 ${
        selected
            ? 'border-orange-600 bg-orange-50 ring-2 ring-orange-600/20'
            : 'border-neutral-200 bg-white hover:border-orange-500/80 hover:-translate-y-0.5'
    }`;

export default function BadanfrageFunnel() {
    const {
        step,
        setStep,
        status,
        errorMessage,
        referenceId,
        formData,
        setFormData,
        toggleFeature,
        calculatedSqm,
        objectTitle,
        scopeTitle,
        tierTitle,
        featureLabels,
        addressText,
        handleWhatsApp,
        handleOnlineSubmit,
        handleNewRequest,
        handleBackFromWhatsApp
    } = useBadanfrage();

    if (status === 'success') {
        return (
            <div className="glass-bezel-outer max-w-2xl mx-auto shadow-xl">
                <div className="glass-bezel-inner p-8 md:p-12 text-center" role="status">
                    <div className="icon-chip w-20 h-20 rounded-xl mx-auto mb-6 bg-orange-100 text-orange-700">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                        <span className="eyebrow">Badanfrage erfolgreich übermittelt</span>
                        {referenceId && (
                            <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full font-mono text-xs font-bold text-slate-800">
                                Vorgangs-Nr.: {referenceId}
                            </span>
                        )}
                    </div>
                    <p className="text-2xl md:text-3xl font-black text-neutral-900 mb-3">
                        Vielen Dank, {formData.name}!
                    </p>
                    <p className="text-sm sm:text-base text-neutral-700 mb-6 leading-relaxed">
                        Ihre detaillierte Badanfrage ({calculatedSqm} m² &middot; {scopeTitle}) ist erfolgreich bei Fliesenverlegung Tezgel eingegangen.
                        {formData.email && (
                            <span className="block mt-2 font-semibold text-orange-800 bg-orange-50/80 border border-orange-200/80 rounded-xl p-2.5 max-w-md mx-auto text-xs sm:text-sm">
                                ✉️ Eine ausführliche Bestätigung mit allen Angaben wurde an <em>{formData.email}</em> gesendet.
                            </span>
                        )}
                    </p>

                    <div className="bg-neutral-50 p-5 rounded-xl border border-neutral-200 text-left text-sm space-y-2 mb-6">
                        <p className="font-black text-neutral-900 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-orange-600" />
                            Zusammenfassung Ihres Badkonzepts:
                        </p>
                        <p className="text-slate-700 text-xs sm:text-sm"><strong>Kontakt:</strong> {formData.name} &middot; {formData.phone}</p>
                        <p className="text-slate-700 text-xs sm:text-sm"><strong>Ort:</strong> {addressText}</p>
                        <p className="text-slate-700 text-xs sm:text-sm"><strong>Projekt:</strong> {objectTitle} &middot; Stufe: {tierTitle} &middot; {calculatedSqm} m²</p>
                        {featureLabels.length > 0 && (
                            <p className="text-slate-700 text-xs"><strong>Ausstattung:</strong> {featureLabels.join(', ')}</p>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-primary w-full sm:w-auto text-xs">
                            <Phone className="w-4 h-4" />
                            Direkt anrufen: {COMPANY_DATA.contact.phone}
                        </a>
                        <button
                            type="button"
                            onClick={handleNewRequest}
                            className="btn-ghost w-full sm:w-auto text-xs"
                        >
                            Neue Badanfrage starten
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (status === 'whatsapp_opened') {
        return (
            <div className="glass-bezel-outer max-w-2xl mx-auto shadow-xl">
                <div className="glass-bezel-inner p-8 md:p-12 text-center" role="status">
                    <div className="icon-chip w-20 h-20 rounded-tile-xl mx-auto mb-6 bg-green-100 text-green-700">
                        <MessageCircle className="w-10 h-10" />
                    </div>
                    <span className="eyebrow mb-4">WhatsApp geöffnet</span>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
                        Fast geschafft – Nachricht jetzt absenden
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 mb-6 leading-relaxed">
                        Ihre Badanfrage ({calculatedSqm} m² &middot; {scopeTitle}) ist in WhatsApp vorbereitet. Senden Sie die Nachricht einfach ab – {COMPANY_DATA.owner.fullName} meldet sich umgehend bei Ihnen.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-primary w-full sm:w-auto text-xs">
                            <Phone className="w-4 h-4" />
                            Direkt anrufen: {COMPANY_DATA.contact.phone}
                        </a>
                        <button
                            type="button"
                            onClick={handleBackFromWhatsApp}
                            className="btn-ghost w-full sm:w-auto text-xs"
                        >
                            Zurück
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
                    <h2 className="text-xl sm:text-2xl font-black text-neutral-900">
                        Planen Sie Ihr Traumbad mit dem Fachbetrieb aus Aßlar
                    </h2>

                    {/* Progress Indicators */}
                    <div className="grid grid-cols-5 gap-2 mt-6" aria-hidden="true">
                        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
                            <div
                                key={s}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    s <= step ? 'bg-orange-600' : 'bg-neutral-200'
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
                            <p className="text-base sm:text-lg font-black text-slate-900">
                                1. Um welche Art von Immobilie handelt es sich?
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {OBJECT_TYPES.map((obj) => (
                                    <button
                                        key={obj.id}
                                        type="button"
                                        aria-pressed={formData.objectType === obj.id}
                                        onClick={() => setFormData({ ...formData, objectType: obj.id })}
                                        className={optionClass(formData.objectType === obj.id)}
                                    >
                                        <span className="block font-black text-slate-900 text-sm sm:text-base mb-1 group-hover:text-orange-600 transition-colors">{obj.title}</span>
                                        <span className="block text-xs text-slate-600">{obj.desc}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Sanierungsumfang */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <p className="text-base sm:text-lg font-black text-slate-900">
                                2. Welcher Sanierungsumfang ist geplant?
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {SCOPES.map((sc) => (
                                    <button
                                        key={sc.id}
                                        type="button"
                                        aria-pressed={formData.scope === sc.id}
                                        onClick={() => setFormData({ ...formData, scope: sc.id })}
                                        className={optionClass(formData.scope === sc.id)}
                                    >
                                        <span className="block font-black text-slate-900 text-sm sm:text-base mb-1 group-hover:text-orange-600 transition-colors">{sc.title}</span>
                                        <span className="block text-xs text-slate-600">{sc.desc}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Raummaße */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <p className="text-base sm:text-lg font-black text-slate-900">
                                3. Ungefähre Raummaße Ihres Badezimmers
                            </p>
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
                            <p className="text-base sm:text-lg font-black text-slate-900">
                                4. Qualitätskategorie &amp; gewünschte Elemente
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {TIERS.map((t) => (
                                    <button
                                        key={t.id}
                                        type="button"
                                        aria-pressed={formData.tier === t.id}
                                        onClick={() => setFormData({ ...formData, tier: t.id })}
                                        className={optionClass(formData.tier === t.id, 'p-4')}
                                    >
                                        <span className="block font-black text-slate-900 text-xs sm:text-sm mb-1 group-hover:text-orange-600 transition-colors">{t.title}</span>
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
                                                className={`px-3 py-2.5 rounded-tile-sm border text-xs font-bold text-left transition-all duration-300 flex items-center gap-2 ${
                                                    isSelected
                                                        ? 'bg-orange-50 text-orange-950 border-orange-600'
                                                        : 'bg-white text-slate-700 border-slate-200 hover:border-orange-500'
                                                }`}
                                            >
                                                {isSelected ? (
                                                    <Check className="w-3.5 h-3.5 text-orange-600 shrink-0" />
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
                        <form onSubmit={handleOnlineSubmit} className="space-y-4">
                            <p className="text-base sm:text-lg font-black text-slate-900 mb-1">
                                5. Kontaktdaten &amp; Versand Ihrer Anfrage
                            </p>
                            <p className="text-sm text-slate-700 mb-4">
                                Senden Sie Ihre Badanfrage direkt online an {COMPANY_DATA.owner.fullName} oder nutzen Sie WhatsApp. Keine
                                Weitergabe an Dritte.
                            </p>

                            {/* Anti-spam honeypot */}
                            <div className="hidden" aria-hidden="true">
                                <label htmlFor="badanfrage-hp">Nicht ausfüllen</label>
                                <input
                                    type="text"
                                    id="badanfrage-hp"
                                    name="badanfrage-hp"
                                    value={formData.honeypot}
                                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                                    tabIndex={-1}
                                    autoComplete="off"
                                />
                            </div>

                            {errorMessage && (
                                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2.5 font-medium" role="alert">
                                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                                    <span>{errorMessage}</span>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="badanfrage-name" className="block text-sm font-bold text-slate-800 mb-1.5">
                                        Vor- &amp; Nachname <span className="text-orange-600">*</span>
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
                                        Telefonnummer für Rückfragen <span className="text-orange-600">*</span>
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
                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="btn-primary w-full sm:flex-1 text-sm justify-center py-3.5 shadow-md shadow-orange-900/10 disabled:opacity-50"
                                    >
                                        {status === 'submitting' ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                <span>Übermittle Anfrage an Fachbetrieb …</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                <span>Badanfrage jetzt absenden (Online)</span>
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleWhatsApp}
                                        disabled={status === 'submitting'}
                                        className="glass-button-whatsapp w-full sm:w-auto text-sm justify-center py-3.5 disabled:opacity-50"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        <span>Per WhatsApp</span>
                                    </button>
                                </div>

                                <p className="flex items-start justify-center gap-1.5 text-xs text-slate-700 text-center leading-relaxed">
                                    <Lock className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                                    <span>
                                        Ihre Angaben werden vertraulich zur Angebotserstellung genutzt. Beim optionalen Versand per WhatsApp gelten
                                        zusätzlich die Richtlinien von WhatsApp. Mehr in unserer{' '}
                                        <Link href="/datenschutz" className="font-bold text-orange-600 underline underline-offset-2 hover:text-orange-700">
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
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors"
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
                                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-slate-700 hover:text-orange-600 font-bold text-xs transition-colors"
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
