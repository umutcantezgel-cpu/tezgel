"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { CalendarCheck, CheckCircle2, Phone, MessageCircle, Send, Lock } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';

const TOPICS = [
    { value: 'badsanierung', label: 'Badsanierung / Komplettbad aus einer Hand' },
    { value: 'barrierefrei', label: 'Barrierefreie Badmodernisierung (Pflegekassenzuschuss)' },
    { value: 'grossformate', label: 'Fliesen & fugenarme XXL-Großformate' },
    { value: 'wohnen', label: 'Wohnbereiche, Küche, Flure & Treppen' },
    { value: 'aussen', label: 'Balkon & Terrasse auf Stelzlagern' },
    { value: 'untergrund', label: 'Untergrund & DIN 18534 Verbundabdichtung' },
    { value: 'naturstein', label: 'Naturstein- und Granitverlegung' }
];

const TIME_SLOTS = [
    { value: 'vormittags', label: 'Vormittags (08:00 – 12:00 Uhr)' },
    { value: 'nachmittags', label: 'Nachmittags (13:00 – 17:00 Uhr)' },
    { value: 'flexibel', label: 'Flexibel nach telefonischer Vereinbarung' }
];

const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all';

const labelOf = (list, value) => list.find((item) => item.value === value)?.label ?? value;

const formatDate = (isoDate) => {
    if (!isoDate) return 'nach Absprache';
    const [year, month, day] = isoDate.split('-');
    return `${day}.${month}.${year}`;
};

export default function TerminPage() {
    const [sentVia, setSentVia] = useState(null);
    const [formData, setFormData] = useState({
        topic: 'badsanierung',
        date: '',
        timeSlot: 'vormittags',
        name: '',
        phone: '',
        email: '',
        zipCity: '',
        notes: '',
        privacyConsent: false
    });

    const update = (field) => (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const buildMessage = () =>
        `Hallo Herr Tezgel,\nich möchte einen Termin für eine Beratung / ein Vor-Ort-Aufmaß vereinbaren:\n\n` +
        `Thema: ${labelOf(TOPICS, formData.topic)}\n` +
        `Wunschdatum: ${formatDate(formData.date)}\n` +
        `Zeitfenster: ${labelOf(TIME_SLOTS, formData.timeSlot)}\n` +
        `Ort: ${formData.zipCity || 'Nicht angegeben'}\n\n` +
        `Name: ${formData.name}\n` +
        `Telefon: ${formData.phone}\n` +
        `E-Mail: ${formData.email || 'Nicht angegeben'}\n` +
        (formData.notes ? `Anmerkungen: ${formData.notes}\n\n` : '\n') +
        `Bitte bestätigen Sie mir den Termin oder schlagen Sie einen Alternativtermin vor. Vielen Dank!`;

    const handleSubmit = (e) => {
        e.preventDefault();
        const submitter = e.nativeEvent?.submitter;
        const channel = submitter?.value === 'email' ? 'email' : 'whatsapp';

        if (channel === 'whatsapp') {
            const waUrl = `https://wa.me/${COMPANY_DATA.contact.whatsappNumber}?text=${encodeURIComponent(buildMessage())}`;
            window.open(waUrl, '_blank', 'noopener,noreferrer');
        } else {
            const subject = `Terminanfrage: ${labelOf(TOPICS, formData.topic)}${formData.zipCity ? ` (${formData.zipCity})` : ''}`;
            window.location.href = `mailto:${COMPANY_DATA.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage())}`;
        }
        setSentVia(channel);
    };

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="ambient-glow-mint -top-20 -left-20 opacity-70" />
            <div className="ambient-glow-sky top-96 -right-20 opacity-60" />

            {/* Hero */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
                <div className="ceramic-hero rounded-[3rem] p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
                    <span className="eyebrow">
                        <CalendarCheck className="w-3.5 h-3.5" />
                        Direkte Meisterberatung
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Termin <span className="text-ceramic-gradient">vereinbaren</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Wählen Sie Ihr Wunschthema und Ihren Wunschtermin für ein unverbindliches Beratungsgespräch bei Ihnen vor Ort in {COMPANY_DATA.headquarters.city}, Wetzlar &amp; Umgebung. Ihre Anfrage senden Sie per WhatsApp oder E-Mail direkt an {COMPANY_DATA.owner.fullName}.
                    </p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
                {sentVia ? (
                    <div className="glass-surface rounded-[2.5rem] p-8 md:p-12 text-center" role="status">
                        <div className="icon-chip w-20 h-20 rounded-full mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <span className="eyebrow mb-4">
                            {sentVia === 'whatsapp' ? 'WhatsApp wurde geöffnet' : 'E-Mail-Programm wurde geöffnet'}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
                            Fast geschafft – bitte jetzt absenden
                        </h2>
                        <p className="text-slate-700 mb-6 leading-relaxed text-sm sm:text-base">
                            Vielen Dank, {formData.name}. Ihre Terminanfrage ({formatDate(formData.date)} &middot; {labelOf(TIME_SLOTS, formData.timeSlot)}) ist vorbereitet. Senden Sie die Nachricht in {sentVia === 'whatsapp' ? 'WhatsApp' : 'Ihrem E-Mail-Programm'} ab – {COMPANY_DATA.owner.fullName} meldet sich dann persönlich bei Ihnen, um den Termin abzustimmen.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-primary w-full sm:w-auto">
                                <Phone className="w-4 h-4" />
                                Direkt anrufen: {COMPANY_DATA.contact.phone}
                            </a>
                            <button
                                type="button"
                                onClick={() => setSentVia(null)}
                                className="btn-ghost w-full sm:w-auto"
                            >
                                Anfrage bearbeiten
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="glass-bezel-outer shadow-2xl">
                        <form onSubmit={handleSubmit} className="glass-bezel-inner p-8 sm:p-10 space-y-6">
                            <div>
                                <label htmlFor="termin-topic" className="block text-sm font-black text-slate-900 mb-2">
                                    1. Welches Thema möchten Sie besprechen? <span className="text-emerald-800">*</span>
                                </label>
                                <select
                                    id="termin-topic"
                                    required
                                    value={formData.topic}
                                    onChange={update('topic')}
                                    className={`${inputClass} font-semibold`}
                                >
                                    {TOPICS.map((topic) => (
                                        <option key={topic.value} value={topic.value}>{topic.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="termin-date" className="block text-sm font-black text-slate-900 mb-1.5">
                                        2. Wunschdatum
                                    </label>
                                    <input
                                        id="termin-date"
                                        type="date"
                                        value={formData.date}
                                        onChange={update('date')}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="termin-slot" className="block text-sm font-black text-slate-900 mb-1.5">
                                        Bevorzugtes Zeitfenster
                                    </label>
                                    <select
                                        id="termin-slot"
                                        value={formData.timeSlot}
                                        onChange={update('timeSlot')}
                                        className={inputClass}
                                    >
                                        {TIME_SLOTS.map((slot) => (
                                            <option key={slot.value} value={slot.value}>{slot.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div>
                                    <label htmlFor="termin-name" className="block text-sm font-bold text-slate-800 mb-1.5">
                                        Name, Vorname <span className="text-emerald-800">*</span>
                                    </label>
                                    <input
                                        id="termin-name"
                                        type="text"
                                        required
                                        autoComplete="name"
                                        placeholder="Max Mustermann"
                                        value={formData.name}
                                        onChange={update('name')}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="termin-phone" className="block text-sm font-bold text-slate-800 mb-1.5">
                                        Telefonnummer <span className="text-emerald-800">*</span>
                                    </label>
                                    <input
                                        id="termin-phone"
                                        type="tel"
                                        required
                                        minLength={6}
                                        autoComplete="tel"
                                        placeholder="Für die Rücksprache zum Termin"
                                        value={formData.phone}
                                        onChange={update('phone')}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="termin-email" className="block text-sm font-bold text-slate-800 mb-1.5">
                                        E-Mail-Adresse (optional)
                                    </label>
                                    <input
                                        id="termin-email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="ihre-adresse@beispiel.de"
                                        value={formData.email}
                                        onChange={update('email')}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="termin-zip" className="block text-sm font-bold text-slate-800 mb-1.5">
                                        PLZ &amp; Ort
                                    </label>
                                    <input
                                        id="termin-zip"
                                        type="text"
                                        autoComplete="postal-code"
                                        placeholder="z. B. 35614 Aßlar"
                                        value={formData.zipCity}
                                        onChange={update('zipCity')}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="termin-notes" className="block text-sm font-bold text-slate-800 mb-1.5">
                                    Ihre Notizen / Anliegen
                                </label>
                                <textarea
                                    id="termin-notes"
                                    rows={3}
                                    placeholder="z. B. Bad-Grundriss vorhanden, bodengleiche Dusche gewünscht, Fliesenformat ca. 60 x 120 cm …"
                                    value={formData.notes}
                                    onChange={update('notes')}
                                    className={`${inputClass} resize-none`}
                                />
                            </div>

                            <div>
                                <label className="flex items-start gap-2.5 cursor-pointer text-sm text-slate-700">
                                    <input
                                        type="checkbox"
                                        required
                                        checked={formData.privacyConsent}
                                        onChange={update('privacyConsent')}
                                        className="mt-1 w-4 h-4 rounded accent-emerald-700 shrink-0"
                                    />
                                    <span>
                                        Ich stimme zu, dass meine Angaben zur Bearbeitung der Terminanfrage gemäß der{' '}
                                        <Link href="/datenschutz" target="_blank" className="font-bold text-emerald-800 hover:text-emerald-700 underline underline-offset-2">
                                            Datenschutzerklärung
                                        </Link>{' '}
                                        verarbeitet werden. Beim Versand per WhatsApp gelten zusätzlich die Datenschutzbestimmungen von WhatsApp.
                                    </span>
                                </label>
                            </div>

                            <div className="pt-4 border-t border-slate-200 space-y-3">
                                <div className="flex flex-col sm:flex-row items-center gap-3">
                                    <button type="submit" name="channel" value="whatsapp" className="glass-button-whatsapp w-full sm:flex-1 text-sm">
                                        <MessageCircle className="w-4 h-4" />
                                        Terminanfrage per WhatsApp senden
                                    </button>
                                    <button type="submit" name="channel" value="email" className="btn-ghost w-full sm:w-auto">
                                        <Send className="w-4 h-4 text-emerald-700" />
                                        Per E-Mail senden
                                    </button>
                                </div>
                                <p className="flex items-start justify-center gap-1.5 text-xs text-slate-700 text-center leading-relaxed">
                                    <Lock className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                                    <span>
                                        Ihre Anfrage wird erst verschickt, wenn Sie die vorbereitete Nachricht in WhatsApp bzw. Ihrem E-Mail-Programm absenden. Der Termin gilt nach persönlicher Bestätigung als vereinbart.
                                    </span>
                                </p>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
