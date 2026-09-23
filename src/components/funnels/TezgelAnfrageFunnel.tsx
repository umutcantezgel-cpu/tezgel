'use client';

import React, { useState } from 'react';
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
  MessageSquare, 
  Phone, 
  Calendar,
  Check,
  Shield,
  Clock
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

const AREA_OPTIONS = [
  'Bis 15 m²',
  '15 - 35 m²',
  '35 - 75 m²',
  'Über 75 m²'
];

const TIMING_OPTIONS = [
  'Schnellstmöglich',
  'In 1 - 3 Monaten',
  'In mehr als 3 Monaten / Flexibel'
];

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
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate formatted WhatsApp message text
  const getWhatsAppMessage = () => {
    const selectedProjectObj = PROJECT_TYPES.find(p => p.id === projectType);
    const projTitle = selectedProjectObj ? selectedProjectObj.title : projectType;
    const finalArea = customArea ? `${customArea} m²` : selectedArea;
    const locText = location ? location : 'Aßlar / Wetzlar / Hessen';

    const text = `Hallo Herr Tezgel,\nich interessiere mich für eine fachgerechte Fliesenverlegung:\n\n` +
      `📌 Projekt: ${projTitle}\n` +
      `📐 Fläche: ca. ${finalArea}\n` +
      `📍 Ort: ${locText}\n` +
      `⏱️ Gewünschter Zeitraum: ${timing}\n\n` +
      `👤 Name: ${name || 'Interessent'}\n` +
      `📞 Telefon: ${phone || 'Nicht angegeben'}\n` +
      `✉️ E-Mail: ${email || 'Nicht angegeben'}\n` +
      (notes ? `📝 Anmerkungen: ${notes}\n\n` : '\n') +
      `Bitte melden Sie sich bezüglich eines unverbindlichen Vor-Ort-Aufmaßes. Vielen Dank!`;

    return encodeURIComponent(text);
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waUrl = `https://wa.me/${COMPANY_DATA.contact.whatsappNumber}?text=${getWhatsAppMessage()}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate standard submission
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 text-center max-w-2xl mx-auto border border-slate-200 shadow-xl relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs uppercase tracking-wider mb-4 border border-emerald-200">
          Anfrage erfolgreich übermittelt
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
          Vielen Dank für Ihr Vertrauen!
        </h3>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
          Deniz Tezgel wird Ihre Angaben persönlich prüfen und sich in der Regel innerhalb von 24 Stunden bei Ihnen für das kostenfreie Vor-Ort-Aufmaß in Aßlar, Wetzlar oder Umgebung melden.
        </p>
        
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 mb-6 italic">
          „{COMPANY_DATA.motto}“
          <span className="block mt-1 font-bold not-italic text-emerald-700">— Deniz Tezgel, Inhaber</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`tel:${COMPANY_DATA.contact.phoneLink}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Direkt anrufen: {COMPANY_DATA.contact.phone}</span>
          </a>
          <button
            onClick={() => { setIsSubmitted(false); setStep(1); }}
            className="w-full sm:w-auto text-xs text-slate-500 hover:text-slate-900 underline py-2"
          >
            Neue Anfrage starten
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden max-w-4xl mx-auto">
      
      {/* Subtle background ambient lights */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Step Indicator */}
      <div className="mb-8 text-center sm:text-left relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Express-Anfrage in 60 Sekunden
          </span>
          
          {/* Step circles */}
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            {[1, 2, 3].map((s) => (
              <div 
                key={s}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : step > s 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                }`}
              >
                {step > s ? <Check className="w-3.5 h-3.5" /> : s}
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-slate-900">
          {step === 1 && 'Schritt 1: Welches Projekt planen Sie?'}
          {step === 2 && 'Schritt 2: Dimension & Ausführungsort'}
          {step === 3 && 'Schritt 3: Kontaktdaten & Express-Übermittlung'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          {step === 1 && 'Wählen Sie Ihr Fachgewerk für eine maßgeschneiderte Planung.'}
          {step === 2 && 'Geben Sie uns eine grobe Orientierung zu Fläche und Ort.'}
          {step === 3 && 'Übermitteln Sie Ihre Anfrage bequem direkt per WhatsApp oder E-Mail.'}
        </p>
      </div>

      {/* STEP 1: PROJECT SELECTION */}
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
                  className={`text-left p-4 rounded-2xl transition-all duration-300 flex flex-col justify-between border relative overflow-hidden group ${
                    isSelected 
                      ? 'bg-emerald-50/80 border-emerald-500 shadow-md ring-2 ring-emerald-500' 
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-colors ${
                      isSelected 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-white text-emerald-600 border border-slate-200 shadow-xs group-hover:bg-emerald-50'
                    }`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200">
                      {pt.badge}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {pt.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                      {pt.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5"
            >
              <span>Weiter zu Schritt 2</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: AREA & LOCATION */}
      {step === 2 && (
        <div className="space-y-6 relative z-10">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5">
              Geschätzte Fläche (m²):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
              {AREA_OPTIONS.map((area) => (
                <button
                  type="button"
                  key={area}
                  onClick={() => { setSelectedArea(area); setCustomArea(''); }}
                  className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all ${
                    selectedArea === area && !customArea
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-400 font-black shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Oder genaue Quadratmeterzahl eingeben (z. B. 42 m²)"
              value={customArea}
              onChange={(e) => setCustomArea(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5">
              Gewünschter Ausführungszeitraum:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {TIMING_OPTIONS.map((time) => (
                <button
                  type="button"
                  key={time}
                  onClick={() => setTiming(time)}
                  className={`py-3 px-3 rounded-xl text-xs font-bold border text-center transition-all ${
                    timing === time
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-400 font-black shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
              Postleitzahl &amp; Ort des Bauvorhabens:
            </label>
            <input
              type="text"
              placeholder="z. B. 35614 Aßlar oder 35576 Wetzlar"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>

          <div className="pt-4 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Zurück</span>
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5"
            >
              <span>Weiter zu Kontaktdaten</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: CONTACT & EXPRESS SEND */}
      {step === 3 && (
        <form className="space-y-5 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Ihr vollständiger Name *
              </label>
              <input
                type="text"
                required
                placeholder="Vor- und Nachname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Telefon- oder Mobilnummer *
              </label>
              <input
                type="tel"
                required
                placeholder="Für schnelle Rücksprache zum Aufmaß"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              E-Mail-Adresse (optional)
            </label>
            <input
              type="email"
              placeholder="ihre-adresse@beispiel.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Projekt-Details / Wünsche (optional)
            </label>
            <textarea
              rows={3}
              placeholder="z. B. Altbelag vorhanden, bodengleiche Dusche gewünscht, Fliesenformat ca. 60x120 cm..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
            />
          </div>

          {/* Action triggers */}
          <div className="pt-3 border-t border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              
              {/* Primary WhatsApp 1-Click Button */}
              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all text-center"
              >
                <MessageSquare className="w-4 h-4 fill-current text-white" />
                <span>Blitz-Anfrage per WhatsApp</span>
              </button>

              {/* Alternative Email Submit */}
              <button
                type="button"
                onClick={handleEmailSubmit}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition-all"
              >
                <Send className="w-4 h-4 text-emerald-600" />
                <span>Klassisch per E-Mail</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 text-center leading-relaxed">
              🔒 Ihre Daten werden streng vertraulich nur zur Bearbeitung Ihrer Anfrage gem. DSGVO verarbeitet. Keine Weitergabe an Dritte.
            </p>
          </div>

          <div className="pt-2 flex justify-start">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Zurück zu Schritt 2</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
