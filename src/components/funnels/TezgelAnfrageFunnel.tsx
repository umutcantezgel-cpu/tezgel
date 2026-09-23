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
  Lock
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
  { title: 'Kontaktdaten & Versand', text: 'Senden Sie Ihre Anfrage direkt per WhatsApp oder per E-Mail.' }
];

type Channel = 'whatsapp' | 'email';

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
  const [sentVia, setSentVia] = useState<Channel | null>(null);

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

  const getEmailBody = () =>
    `Hallo Herr Tezgel,\n\nich interessiere mich für eine fachgerechte Fliesenverlegung:\n\n` +
    `Projekt: ${projectTitle}\n` +
    `Fläche: ca. ${finalArea}\n` +
    `Ort: ${locationText}\n` +
    `Gewünschter Zeitraum: ${timing}\n\n` +
    `Name: ${name}\n` +
    `Telefon: ${phone}\n` +
    `E-Mail: ${email || 'Nicht angegeben'}\n` +
    (notes ? `Anmerkungen: ${notes}\n\n` : '\n') +
    `Bitte melden Sie sich bezüglich eines unverbindlichen Vor-Ort-Aufmaßes. Vielen Dank!`;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel: Channel = submitter?.value === 'email' ? 'email' : 'whatsapp';

    if (channel === 'whatsapp') {
      const waUrl = `https://wa.me/${COMPANY_DATA.contact.whatsappNumber}?text=${encodeURIComponent(getWhatsAppMessage())}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } else {
      const subject = `Anfrage Vor-Ort-Aufmaß: ${projectTitle} (${locationText})`;
      window.location.href = `mailto:${COMPANY_DATA.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(getEmailBody())}`;
    }
    setSentVia(channel);
  };

  if (sentVia) {
    return (
      <div className="glass-surface rounded-[2.5rem] p-8 sm:p-12 text-center max-w-2xl mx-auto" role="status">
        <div className="icon-chip w-20 h-20 rounded-full mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="eyebrow mb-4">
          {sentVia === 'whatsapp' ? 'WhatsApp wurde geöffnet' : 'E-Mail-Programm wurde geöffnet'}
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">Fast geschafft – bitte jetzt absenden</h3>
        <p className="text-base text-slate-700 leading-relaxed mb-6">
          Ihre Anfrage ist vorbereitet. Senden Sie die Nachricht in{' '}
          {sentVia === 'whatsapp' ? 'WhatsApp' : 'Ihrem E-Mail-Programm'} ab – {COMPANY_DATA.owner.fullName} meldet sich dann
          persönlich bei Ihnen, um das kostenfreie Vor-Ort-Aufmaß abzustimmen.
        </p>

        <figure className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-700 mb-6">
          <blockquote className="italic">„{COMPANY_DATA.motto}“</blockquote>
          <figcaption className="mt-1 font-bold text-emerald-800">— {COMPANY_DATA.owner.fullName}, Inhaber</figcaption>
        </figure>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={`tel:${COMPANY_DATA.contact.phoneLink}`} className="btn-primary w-full sm:w-auto">
            <Phone className="w-4 h-4" />
            Direkt anrufen: {COMPANY_DATA.contact.phone}
          </a>
          <button
            type="button"
            onClick={() => {
              setSentVia(null);
              setStep(1);
            }}
            className="btn-ghost w-full sm:w-auto"
          >
            Neue Anfrage starten
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-surface rounded-[2.5rem] p-6 sm:p-10 lg:p-12 relative overflow-hidden max-w-4xl mx-auto">
      <div className="ambient-glow-mint -top-40 -right-40 opacity-60" />

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
                  className={`group text-left p-4 rounded-2xl transition-all duration-300 flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/20'
                      : 'bg-white border-slate-200 hover:border-emerald-500/80 hover:-translate-y-0.5'
                  }`}
                >
                  <span className="flex items-center justify-between mb-3">
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                        isSelected ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                      {pt.badge}
                    </span>
                  </span>
                  <span className="block font-black text-sm text-slate-900 group-hover:text-emerald-800 transition-colors">{pt.title}</span>
                  <span className="block text-xs text-slate-700 mt-0.5 leading-snug">{pt.subtitle}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex justify-end">
            <button type="button" onClick={() => setStep(2)} className="btn-primary">
              Weiter zu Schritt 2
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: AREA, TIMING & LOCATION */}
      {step === 2 && (
        <div className="space-y-6 relative z-10">
          <fieldset>
            <legend className="block text-xs font-black uppercase tracking-widest text-slate-800 mb-2.5">Geschätzte Fläche</legend>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
              {AREA_OPTIONS.map((area) => (
                <button
                  type="button"
                  key={area}
                  aria-pressed={selectedArea === area && !customArea}
                  onClick={() => {
                    setSelectedArea(area);
                    setCustomArea('');
                  }}
                  className={optionClass(selectedArea === area && !customArea)}
                >
                  {area}
                </button>
              ))}
            </div>
            <label htmlFor="funnel-custom-area" className="sr-only">Genaue Quadratmeterzahl</label>
            <input
              id="funnel-custom-area"
              type="text"
              inputMode="decimal"
              placeholder="Oder genaue Quadratmeterzahl eingeben (z. B. 42)"
              value={customArea}
              onChange={(e) => setCustomArea(e.target.value)}
              className={inputClass}
            />
          </fieldset>

          <fieldset>
            <legend className="block text-xs font-black uppercase tracking-widest text-slate-800 mb-2.5">Gewünschter Zeitraum</legend>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {TIMING_OPTIONS.map((time) => (
                <button type="button" key={time} aria-pressed={timing === time} onClick={() => setTiming(time)} className={optionClass(timing === time)}>
                  {time}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="funnel-location" className="block text-xs font-black uppercase tracking-widest text-slate-800 mb-2">
              Postleitzahl &amp; Ort des Bauvorhabens
            </label>
            <input
              id="funnel-location"
              type="text"
              autoComplete="postal-code"
              placeholder="z. B. 35614 Aßlar oder 35576 Wetzlar"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="pt-2 flex items-center justify-between gap-4">
            <button type="button" onClick={() => setStep(1)} className="btn-ghost px-5">
              <ArrowLeft className="w-4 h-4" />
              Zurück
            </button>
            <button type="button" onClick={() => setStep(3)} className="btn-primary">
              Weiter zu Kontaktdaten
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: CONTACT & SEND */}
      {step === 3 && (
        <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
              E-Mail-Adresse (optional)
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
              <button type="submit" name="channel" value="whatsapp" className="glass-button-whatsapp w-full sm:flex-1 text-sm">
                <MessageCircle className="w-4 h-4" />
                Anfrage per WhatsApp senden
              </button>
              <button type="submit" name="channel" value="email" className="btn-ghost w-full sm:w-auto">
                <Send className="w-4 h-4 text-emerald-700" />
                Per E-Mail senden
              </button>
            </div>

            <p className="flex items-start justify-center gap-1.5 text-xs text-slate-700 text-center leading-relaxed">
              <Lock className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                Ihre Angaben werden nur zur Bearbeitung Ihrer Anfrage verwendet. Beim Versand per WhatsApp gelten zusätzlich
                die Datenschutzbestimmungen von WhatsApp. Details in unserer{' '}
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
