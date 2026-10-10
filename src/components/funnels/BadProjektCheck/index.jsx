"use client";
// Bad-Projektcheck (E-011): Zustand und Absenden hier, Logik in logik.js (gesperrt), Markup in Schritt1–4 und Zusammenfassung.
import React, { useState } from 'react';
import { ClipboardCheck } from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';
import { openWhatsApp } from '@/lib/whatsapp';
import { beschriftungen, leadNachricht, anfrageNutzlast } from './logik';
import Schritt1 from './Schritt1';
import Schritt2 from './Schritt2';
import Schritt3 from './Schritt3';
import Schritt4 from './Schritt4';
import Zusammenfassung from './Zusammenfassung';

export default function BadProjektCheck() {
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
    const [sentVia, setSentVia] = useState(null); // 'whatsapp' | 'online'
    const [referenceId, setReferenceId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const toggleOption = (id) => {
        setSelectedOptions(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const { sqmLabel, scopeLabel, tierLabel, extras, matchingBath } = beschriftungen({ sqm, sanitaryScope, tier, selectedOptions });

    const getLeadMessage = () => leadNachricht({ ownerLastName: COMPANY_DATA.owner.lastName, sqmLabel, scopeLabel, tierLabel, extras, leadData });

    const handleLeadSubmit = async (e) => {
        e.preventDefault();
        const submitter = e.nativeEvent?.submitter;
        const channel = submitter && submitter.value === 'whatsapp' ? 'whatsapp' : 'online';
        const message = getLeadMessage();

        if (channel === 'whatsapp') {
            openWhatsApp({
                phone: COMPANY_DATA.contact.whatsappNumber,
                text: message,
            });
            setSentVia('whatsapp');
            return;
        }

        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const response = await fetch('/api/anfrage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(anfrageNutzlast({ sqmLabel, sanitaryScope, scopeLabel, tier, tierLabel, extras, leadData }))
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Übertragung fehlgeschlagen.');
            }

            if (data.referenceId) {
                setReferenceId(data.referenceId);
            }
            setSentVia('online');
        } catch (err) {
            console.error('BadProjektCheck submission error:', err);
            setErrorMessage(err.message || 'Verbindungsfehler beim Absenden.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="glass-bezel-outer max-w-4xl mx-auto overflow-hidden">
            <div className="glass-bezel-inner overflow-hidden">
                {/* Header */}
                <div className="ceramic-band p-6 sm:p-10">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="eyebrow">
                            <ClipboardCheck className="w-3.5 h-3.5" />
                            Bad-Projektcheck
                        </span>
                        <span className="eyebrow eyebrow-neutral hidden sm:inline-flex">
                            Festpreis nach Vor-Ort-Aufmaß
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black mb-2 text-slate-900">
                        Ihr Badprojekt in vier Schritten beschreiben
                    </h2>
                    <p className="text-sm text-slate-700 max-w-2xl leading-relaxed">
                        Wählen Sie Größe, Umfang, Ausstattungsniveau und Wünsche – wir erhalten eine strukturierte Anfrage und
                        melden uns für einen kostenfreien Aufmaßtermin in Aßlar, Wetzlar und Mittelhessen.
                    </p>
                </div>

                <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Controls (Left 7 Cols) */}
                    <div className="lg:col-span-7 space-y-7">
                        <Schritt1 sqm={sqm} setSqm={setSqm} sqmLabel={sqmLabel} />
                        <Schritt2 sanitaryScope={sanitaryScope} setSanitaryScope={setSanitaryScope} />
                        <Schritt3 tier={tier} setTier={setTier} />
                        <Schritt4 selectedOptions={selectedOptions} toggleOption={toggleOption} />
                    </div>

                    <Zusammenfassung
                        sqmLabel={sqmLabel} scopeLabel={scopeLabel} tierLabel={tierLabel} extras={extras} matchingBath={matchingBath}
                        contactOpen={contactOpen} setContactOpen={setContactOpen}
                        sentVia={sentVia} setSentVia={setSentVia} referenceId={referenceId} setReferenceId={setReferenceId}
                        leadData={leadData} setLeadData={setLeadData}
                        isSubmitting={isSubmitting} errorMessage={errorMessage} handleLeadSubmit={handleLeadSubmit}
                    />
                </div>
            </div>
        </div>
    );
}
