'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Droplets,
  Sparkles,
  Sun,
  Layers,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Send,
  MessageCircle,
  Phone,
  Check,
  Lock,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { COMPANY_DATA } from '@/config/company';

const PROJECT_TYPES = [
  {
    id: 'bad',
    title: 'Bad & Wellness',
    subtitle: 'Walk-In-Dusche, Großformate, Ablagenischen',
    icon: Droplets,
    badge: 'Sehr beliebt'
  },
  {
    id: 'wohnen',
    title: 'Wohnbereich & Neubau',
    subtitle: 'Feinsteinzeug, Küche, Diele & Flure',
    icon: Sparkles,
    badge: 'Großformat'
  },
  {
    id: 'balkon',
    title: 'Balkon & Terrasse',
    subtitle: '2-cm-Keramikplatten auf Stelzlagern',
    icon: Sun,
    badge: 'Frostsicher'
  },
  {
    id: 'treppe',
    title: 'Treppen & Naturstein',
    subtitle: 'Granit, Naturstein & Treppenstufen',
    icon: Layers,
    badge: 'Präzision'
  },
  {
    id: 'untergrund',
    title: 'Untergrund & Abdichtung',
    subtitle: 'Estrichausgleich & DIN 18534 Verbundabdichtung',
    icon: ShieldCheck,
    badge: 'DIN-Norm'
  }
];

const AREA_OPTIONS = ['Bis 15 m²', '15 - 35 m²', '35 - 75 m²', 'Über 75 m²'];

const TIMING_OPTIONS = ['Schnellstmöglich', 'In 1 - 3 Monaten', 'In mehr als 3 Monaten / Flexibel'];

const STEPS = [
  { title: 'Welches Projekt planen Sie?', text: 'Wählen Sie Ihr Fachgewerk für eine passende Planung.' },
  { title: 'Fläche, Zeitraum & Ort', text: 'Eine grobe Orientierung genügt – Details klären wir beim Aufmaß.' },
  { title: 'Kontaktdaten & Absenden', text: 'Direkt online absenden oder alternativ per WhatsApp anfragen.' }
];

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error' | 'whatsapp_opened';

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all';

const optionClass = (selected: boolean) =>
  `py-3 px-3 rounded-xl text-sm font-bold border transition-all duration-300 ${
    selected
      ? 'bg-emerald-50 text-emerald-800 border-emerald-600 ring-2 ring-emerald-600/20'
      : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-500/80 hover:-translate-y-0.5'
  }`;

export default function TezgelAnfrageFunnel() {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState('bad');
  const [selectedArea, setSelectedArea] = useState('15 - 35 m²');
  const [customArea, setCustomArea] = useState('');
  const [timing, setTiming] = useState('In 1 - 3 Monaten');
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const projectTitle = PROJECT_TYPES.find((p) => p.id === projectType)?.title ?? projectType;
  const finalArea = customArea ? `${customArea.replace(/\s*m²$/i, '')} m²` : selectedArea;
  const locationText = location || 'Aßlar / Wetzlar / Hessen';

  const getWhatsAppMessage = () =>
    `Hallo Herr Tezgel,\nich interessiere mich für eine fachgerechte Fliesenverlegung:\n\n` +
    `📌 Projekt: ${projectTitle}\n` +
    `📐 Fläche: ca. ${finalArea}\n` +
    `📍 Ort: ${locationText}\n` +
    `⏱️ Gewünschter Zeitraum: ${timing}\n\n` +
    `👤 Name: ${name}\n` +
    `📞 Telefon: ${phone}\n` +
    `✉️ E-Mail: ${email || 'Nicht angegeben'}\n` +
    (notes ? `📝 Anmerkungen: ${notes}\n\n` : '\n') +
    `Bitte melden Sie sich bezüglich eines unverbindlichen Vor-Ort-Aufmaßes. Vielen Dank!`;

  const handleWhatsAppDirect = () => {
    if (!name || !phone) {
      setErrorMessage('Bitte tragen Sie zumindest Ihren Namen und eine Telefonnummer ein.');
      return;
    }
    const waUrl = `https://wa.me/${COMPANY_DATA.contact.whatsappNumber}?text=${encodeURIComponent(getWhatsAppMessage())}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setStatus('whatsapp_opened');
  };

  const handleOnlineSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setStatus('submitting');

    try {
      const response = await fetch('/api/anfrage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectType,
          projectTitle,
          area: finalArea,
          timing,
          location: locationText,
          name,
          phone,
          email: email || undefined,
          notes: notes || undefined,
          honeypot: honeypot || undefined
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Übertragung fehlgeschlagen.');
      }

      setStatus('success');
    } catch (err: unknown) {
      console.error('Submission error:', err);
      const msg = err instanceof Error ? err.message : 'Es gab ein Problem bei der Übertragung.';
      setErrorMessage(msg);
      setStatus('error');
    }
  };

  // SUCCESS STATE (Direct confirmation)
  if (status === 'success') {
    return (
      <div className="glass-surface rounded-[2.5rem] p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xl" role="status">
        <div className="icon-chip w-20 h-20 rounded-full mx-auto mb-6 bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="eyebrow mb-4">Anfrage erfolgreich übermittelt</span>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">Vielen Dank, {name}!</h3>
        <p className="text-base text-slate-700 leading-relaxed mb-6">
          Ihre Anfrage für <strong>{projectTitle}</strong> ({finalArea}) in <strong>{locationText}</strong> ist erfolgreich bei Meister Deniz Tezgel eingegangen.
          {email && (
            <span className="block mt-2 text-sm text-emerald-800 font-semibold">
              Eine Bestätigung wurde an <em>{email}</em> gesendet.
            </span>
          )}
        </p>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-sm text-slate-700 mb-6 space-y-2">
          <div className="font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Nächste Schritte:
          </div>
          <p className="text-xs text-slate-600">
            1. Wir prüfen Ihre Angaben und den geschätzten Material- &amp; Zeitaufwand.<br />
            2. Herr Tezgel meldet sich binnen <strong>24 bis 48 Stunden</strong> telefonisch zur Terminabstimmung des kostenfreien Aufmaßes.
          </p>
        </div>

        <figure className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 text-sm text-slate-700 mb-6">
          <blockquote className="italic">„{COMPANY_DATA.motto}“</blockquote>
          <figcaption className="mt-1 font-bold text-emerald-800">— {COMPANY_DATA.owner.fullName}, Meisterbetrieb Aßlar</figcaption>
        </figure>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-primary w-full sm:w-auto">
            <Phone className="w-4 h-4" />
            Direkt anrufen: {COMPANY_DATA.contact.phone}
          </a>
          <button
            type="button"
            onClick={() => {
              setStatus('idle');
              setStep(1);
              setName('');
              setPhone('');
              setEmail('');
              setNotes('');
            }}
            className="btn-ghost w-full sm:w-auto"
          >
            Weitere Anfrage starten
          </button>
        </div>
      </div>
    );
  }

  // WHATSAPP OPENED STATE
  if (status === 'whatsapp_opened') {
    return (
      <div className="glass-surface rounded-[2.5rem] p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xl" role="status">
        <div className="icon-chip w-20 h-20 rounded-full mx-auto mb-6 bg-emerald-100 text-emerald-700">
          <MessageCircle className="w-10 h-10" />
        </div>
        <span className="eyebrow mb-4">WhatsApp geöffnet</span>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">Fast geschafft – Nachricht absenden</h3>
        <p className="text-base text-slate-700 leading-relaxed mb-6">
          Ihre Anfrage ist in WhatsApp vorbereitet. Senden Sie die Nachricht einfach ab – Herr Tezgel antwortet Ihnen schnellstmöglich.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-primary w-full sm:w-auto">
            <Phone className="w-4 h-4" />
            Direkt anrufen: {COMPANY_DATA.contact.phone}
          </a>
          <button
            type="button"
            onClick={() => {
              setStatus('idle');
              setStep(1);
            }}
            className="btn-ghost w-full sm:w-auto"
          >
            Zurück zur Übersicht
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-surface rounded-[2.5rem] p-6 sm:p-10 lg:p-12 relative overflow-hidden max-w-4xl mx-auto shadow-lg border border-slate-200">
      {/* Decorative gradient corner */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-2xl" aria-hidden="true" />

      {/* Header & step indicator */}
      <div className="mb-8 text-center sm:text-left relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <span className="eyebrow mx-auto sm:mx-0">
            <Sparkles className="w-3.5 h-3.5" />
            Express-Anfrage in 60 Sekunden
          </span>
          <ol className="flex items-center gap-2 mx-auto sm:mx-0" aria-label="Fortschritt">
            {STEPS.map((item, idx) => {
              const s = idx + 1;
              return (
                <li
                  key={item.title}
                  aria-current={step === s ? 'step' : undefined}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black tabular-nums transition-all duration-300 ${
                    step === s
                      ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/30'
                      : step > s
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : 'bg-white text-slate-700 border border-slate-300'
                  }`}
                >
                  {step > s ? <Check className="w-4 h-4" aria-label={`Schritt ${s} erledigt`} /> : s}
                </li>
              );
            })}
          </ol>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-slate-900">
          Schritt {step}: {STEPS[step - 1].title}
        </h3>
        <p className="text-sm text-slate-700 mt-1">{STEPS[step - 1].text}</p>
      </div>

      {/* STEP 1: PROJECT */}
      {step === 1 && (
        <div className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {PROJECT_TYPES.map((pt) => {
              const IconComp = pt.icon;
              const isSelected = projectType === pt.id;
              return (
                <button
                  type="button"
                  key={pt.id}
                  onClick={() => setProjectType(pt.id)}
                  aria-pressed={isSelected}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-600/20 shadow-md'
                      : 'bg-white border-slate-200 hover:border-emerald-500/80 hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="icon-chip w-11 h-11">
                      <IconComp className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {pt.badge}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base mb-1">{pt.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{pt.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="btn-primary w-full sm:w-auto"
            >
              Weiter zu Schritt 2: Fläche &amp; Ort
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: DETAILS */}
      {step === 2 && (
        <div className="space-y-6 relative z-10">
          <div>
            <span id="funnel-area-heading" className="block text-sm font-bold text-slate-800 mb-2">
              Ungefähre Fläche in Quadratmetern
            </span>
            <div role="group" aria-labelledby="funnel-area-heading" className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
              {AREA_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => {
                    setSelectedArea(opt);
                    setCustomArea('');
                  }}
                  className={optionClass(selectedArea === opt && !customArea)}
                >
                  {opt}
                </button>
              ))}
            </div>
            <label htmlFor="funnel-custom-area" className="sr-only">
              Genaue Quadratmeterzahl eingeben
            </label>
            <input
              id="funnel-custom-area"
              type="text"
              placeholder="Oder genaue m²-Zahl eingeben (z. B. 24 m²)"
              value={customArea}
              onChange={(e) => setCustomArea(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <span id="funnel-timing-heading" className="block text-sm font-bold text-slate-800 mb-2">
              Gewünschter Ausführungszeitraum
            </span>
            <div role="group" aria-labelledby="funnel-timing-heading" className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {TIMING_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setTiming(opt)}
                  className={optionClass(timing === opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="funnel-location" className="block text-sm font-bold text-slate-800 mb-1.5">
              Einsatzort / Postleitzahl
            </label>
            <input
              id="funnel-location"
              type="text"
              placeholder="z. B. 35614 Aßlar, 35578 Wetzlar oder Nachbarort"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={inputClass}
            />
            <p className="text-xs text-slate-500 mt-1">Wir arbeiten im Lahn-Dill-Kreis, Raum Gießen und ganz Hessen.</p>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-emerald-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="btn-primary w-full sm:w-auto"
            >
              Weiter zu Schritt 3: Kontaktdaten
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: CONTACT & SUBMISSION */}
      {step === 3 && (
        <form onSubmit={handleOnlineSubmit} className="space-y-6 relative z-10">
          {/* Honeypot for spam bots */}
          <input
            type="text"
            name="website_url_hp"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
              <div>
                <strong>Fehler beim Absenden:</strong> {errorMessage}
                <div className="mt-1">
                  Sie können die Anfrage alternativ direkt per{' '}
                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="underline font-bold text-emerald-800"
                  >
                    WhatsApp senden
                  </button>{' '}
                  oder anrufen.
                </div>
              </div>
            </div>
          )}

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs sm:text-sm text-emerald-950 flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong>Projekt:</strong> {projectTitle} &middot; <strong>Umfang:</strong> {finalArea} &middot;{' '}
              <strong>Ort:</strong> {locationText}
            </span>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-xs font-bold text-emerald-800 underline underline-offset-2 hover:text-emerald-900"
            >
              Ändern
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="funnel-name" className="block text-sm font-bold text-slate-800 mb-1.5">
                Ihr Name <span className="text-emerald-800">*</span>
              </label>
              <input
                id="funnel-name"
                type="text"
                required
                autoComplete="name"
                placeholder="Vor- und Nachname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="funnel-phone" className="block text-sm font-bold text-slate-800 mb-1.5">
                Telefon- oder Mobilnummer <span className="text-emerald-800">*</span>
              </label>
              <input
                id="funnel-phone"
                type="tel"
                required
                autoComplete="tel"
                minLength={6}
                placeholder="Für die Rücksprache zum Aufmaß"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="funnel-email" className="block text-sm font-bold text-slate-800 mb-1.5">
              E-Mail-Adresse <span className="text-slate-500 font-normal">(für die Eingangsbestätigung)</span>
            </label>
            <input
              id="funnel-email"
              type="email"
              autoComplete="email"
              placeholder="ihre-adresse@beispiel.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="funnel-notes" className="block text-sm font-bold text-slate-800 mb-1.5">
              Projekt-Details / Wünsche (optional)
            </label>
            <textarea
              id="funnel-notes"
              rows={3}
              placeholder="z. B. Altbelag vorhanden, bodengleiche Dusche gewünscht, Fliesenformat ca. 60 x 120 cm …"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full sm:flex-1 text-sm py-3.5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Anfrage wird sicher übertragen...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Anfrage verbindlich absenden
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="glass-button-whatsapp w-full sm:w-auto text-sm py-3.5 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                Direkt per WhatsApp
              </button>
            </div>

            <p className="flex items-start justify-center gap-1.5 text-xs text-slate-600 text-center leading-relaxed">
              <Lock className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                Ihre Angaben werden vertraulich behandelt und verschlüsselt übertragen. Keine Weitergabe an Dritte. Details in unserer{' '}
                <Link href="/datenschutz" className="font-bold text-emerald-800 underline underline-offset-2">
                  Datenschutzerklärung
                </Link>
                .
              </span>
            </p>
          </div>

          <div className="pt-1 flex justify-start">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-emerald-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück zu Schritt 2
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
