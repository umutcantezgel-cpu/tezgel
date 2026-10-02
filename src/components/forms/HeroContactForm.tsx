"use client";

import React, { useState } from 'react';
import {
    MessageCircle,
    ArrowRight,
    CheckCircle2,
    Loader2,
    ShieldCheck,
    Clock,
    AlertCircle
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { buildWhatsAppUrl, openWhatsApp, isMobileDevice } from '@/lib/whatsapp';

const PROJECT_OPTIONS = [
    { id: 'bad', label: 'Badsanierung' },
    { id: 'fliesen', label: 'Fliesenverlegung' },
    { id: 'aussen', label: 'Balkon & Terrasse' },
    { id: 'reparatur', label: 'Reparatur & Fugen' }
];

export default function HeroContactForm() {
    const [projectType, setProjectType] = useState('bad');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [referenceId, setReferenceId] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const selectedOption = PROJECT_OPTIONS.find((opt) => opt.id === projectType);
    const projectTitle = selectedOption ? selectedOption.label : 'Fliesenarbeiten';

    const getWhatsAppText = () => {
        return (
            `Hallo Herr Tezgel,\n` +
            `ich interessiere mich für: ${projectTitle}.\n` +
            (location ? `Ort / Region: ${location}\n` : '') +
            (name ? `Mein Name: ${name}\n` : '') +
            (phone ? `Telefon: ${phone}\n` : '') +
            (notes ? `Hinweise: ${notes}\n` : '') +
            `\nBitte melden Sie sich bezüglich eines kostenfreien Termins zum Aufmaß vor Ort. Vielen Dank!`
        );
    };

    const getWhatsAppUrl = () => {
        return buildWhatsAppUrl(COMPANY_DATA.contact.whatsappNumber, getWhatsAppText());
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');

        if (!name.trim() || !phone.trim()) {
            setErrorMessage('Bitte geben Sie Ihren Namen und Ihre Telefonnummer für den Rückruf an.');
            return;
        }

        setStatus('submitting');

        try {
            const res = await fetch('/api/anfrage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    inquiryType: 'general',
                    projectType,
                    projectTitle,
                    contact: {
                        name: name.trim(),
                        phone: phone.trim(),
                        email: email.trim() || undefined,
                        location: location.trim() || 'Aßlar / Wetzlar / Hessen'
                    },
                    area: 'Wird vor Ort ermittelt',
                    timing: 'Schnellstmöglich',
                    notes: notes.trim() || undefined
                })
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || 'Übertragung fehlgeschlagen.');
            }

            if (data.referenceId) {
                setReferenceId(data.referenceId);
            }

            setStatus('success');
        } catch (err: unknown) {
            console.error('Hero contact form error:', err);
            const msg = err instanceof Error ? err.message : 'Es gab ein Problem bei der Übertragung.';
            setErrorMessage(msg);
            setStatus('error');
        }
    };

    // SUCCESS VIEW
    if (status === 'success') {
        return (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xl text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-1">
                        <span className="text-[11px] font-black uppercase tracking-wider text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                            Anfrage übermittelt
                        </span>
                        {referenceId && (
                            <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                                {referenceId}
                            </span>
                        )}
                    </div>
                    <h3 className="font-display text-xl font-black text-neutral-900 pt-1">
                        Vielen Dank, {name}!
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-sm mx-auto">
                        Ihre Anfrage für <strong>{projectTitle}</strong> ist direkt bei Herrn Deniz Tezgel eingegangen.
                    </p>
                    {email && (
                        <p className="text-xs text-orange-800 font-semibold bg-orange-50/80 border border-orange-200/80 rounded-xl p-2.5 max-w-sm mx-auto">
                            ✉️ Eine schriftliche Zusammenfassung wurde an <strong>{email}</strong> gesendet.
                        </p>
                    )}
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-left text-xs text-neutral-700 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-neutral-900">
                        <Clock className="w-4 h-4 text-orange-600 shrink-0" />
                        <span>Nächste Schritte:</span>
                    </div>
                    <p className="text-neutral-600 leading-relaxed text-[11px]">
                        Herr Tezgel prüft Ihre Angaben persönlich und ruft Sie innerhalb von <strong>24 Stunden</strong> unter {phone} an, um den Termin für das kostenfreie Aufmaß vor Ort abzustimmen.
                    </p>
                </div>

                <div className="pt-2">
                    <button
                        type="button"
                        onClick={() => {
                            setStatus('idle');
                            setName('');
                            setPhone('');
                            setEmail('');
                            setLocation('');
                            setNotes('');
                            setReferenceId('');
                        }}
                        className="text-xs font-bold text-orange-700 hover:text-orange-800 underline underline-offset-4"
                    >
                        Weitere Anfrage stellen
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white/98 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-neutral-200/90 shadow-2xl space-y-4 text-left">
            {/* Form Header */}
            <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-lg border border-orange-200">
                        Direktanfrage an Deniz Tezgel
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-neutral-600">
                        <Clock className="w-3.5 h-3.5 text-orange-700" />
                        Rückruf &lt; 24h
                    </span>
                </div>
                <h2 className="font-display text-lg sm:text-xl font-black text-neutral-900 tracking-tight">
                    Kostenloses Aufmaß vor Ort anfragen
                </h2>
                <p className="text-xs text-neutral-600 mt-0.5 leading-snug">
                    Beschreiben Sie Ihr Projekt in 30 Sekunden – Herr Tezgel meldet sich direkt persönlich bei Ihnen.
                </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-800 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                    <span>{errorMessage}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* 1. Vorhaben-Auswahl */}
                <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-700 mb-1.5">
                        1. Ihr Vorhaben wählen
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                        {PROJECT_OPTIONS.map((opt) => {
                            const isSelected = projectType === opt.id;
                            return (
                                <button
                                    key={opt.id}
                                    type="button"
                                    onClick={() => setProjectType(opt.id)}
                                    className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center border ${
                                        isSelected
                                            ? 'bg-orange-700 text-white border-orange-800 shadow-xs'
                                            : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border-neutral-200'
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 2. Kontaktdaten */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                        <label htmlFor="hero-name" className="block text-[11px] font-black uppercase tracking-wider text-neutral-700 mb-1">
                            Name <span className="text-orange-700">*</span>
                        </label>
                        <input
                            id="hero-name"
                            type="text"
                            required
                            placeholder="Vor- und Nachname"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs sm:text-sm font-semibold text-neutral-900 placeholder:text-neutral-600 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="hero-phone" className="block text-[11px] font-black uppercase tracking-wider text-neutral-700 mb-1">
                            Telefonnummer <span className="text-orange-700">*</span>
                        </label>
                        <input
                            id="hero-phone"
                            type="tel"
                            required
                            placeholder="Für den Rückruf"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs sm:text-sm font-semibold text-neutral-900 placeholder:text-neutral-600 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
                        />
                    </div>
                </div>

                {/* 3. Ort & E-Mail */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                        <label htmlFor="hero-email" className="block text-[11px] font-black uppercase tracking-wider text-neutral-700 mb-1">
                            E-Mail <span className="text-neutral-600 font-normal text-[10px]">(für Bestätigung)</span>
                        </label>
                        <input
                            id="hero-email"
                            type="email"
                            placeholder="ihre.adresse@beispiel.de"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs sm:text-sm font-semibold text-neutral-900 placeholder:text-neutral-600 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="hero-location" className="block text-[11px] font-black uppercase tracking-wider text-neutral-700 mb-1">
                            Ort / PLZ
                        </label>
                        <input
                            id="hero-location"
                            type="text"
                            placeholder="z. B. Aßlar, Wetzlar, Gießen"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs sm:text-sm font-semibold text-neutral-900 placeholder:text-neutral-600 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
                        />
                    </div>
                </div>

                {/* 4. Kurzbeschreibung */}
                <div>
                    <label htmlFor="hero-notes" className="block text-[11px] font-black uppercase tracking-wider text-neutral-700 mb-1">
                        Projektnotiz (optional)
                    </label>
                    <input
                        id="hero-notes"
                        type="text"
                        placeholder="z. B. ca. 15 m² Fliesen, Altbau, Walk-In Dusche"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full h-11 px-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs sm:text-sm font-semibold text-neutral-900 placeholder:text-neutral-600 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
                    />
                </div>

                {/* Submit Actions */}
                <div className="pt-1.5 space-y-2">
                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="btn-primary w-full py-3.5 text-xs sm:text-sm font-black justify-center shadow-lg shadow-orange-900/15 group"
                    >
                        {status === 'submitting' ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Wird übertragen...</span>
                            </>
                        ) : (
                            <>
                                <span>Kostenfreies Aufmaß anfragen</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <div className="flex items-center justify-between gap-2 pt-1 text-[11px] text-neutral-600">
                        <span className="flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-orange-700" />
                            100 % unverbindlich
                        </span>
                        <a
                            href={getWhatsAppUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                                if (isMobileDevice()) {
                                    e.preventDefault();
                                    openWhatsApp({ phone: COMPANY_DATA.contact.whatsappNumber, text: getWhatsAppText() });
                                }
                            }}
                            className="flex items-center gap-1 font-bold text-emerald-800 hover:text-emerald-900 hover:underline"
                        >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Oder via WhatsApp</span>
                        </a>
                    </div>
                </div>
            </form>
        </div>
    );
}
