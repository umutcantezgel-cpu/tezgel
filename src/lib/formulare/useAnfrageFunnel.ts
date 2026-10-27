// Logik der Express-Anfrage (F-03, TezgelAnfrageFunnel) – wörtlich aus der Komponente verschoben (P3-00l).
// Ohne Markup; Bestand und Kern-Ansicht nutzen denselben Hook.
import React, { useState } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { openWhatsApp } from '@/lib/whatsapp';

export const PROJECT_TYPES = [
  {
    id: 'bad',
    title: 'Bad & Wellness',
    subtitle: 'Bodengleiche Dusche, große Fliesen, Nischen für Ablagen',
    icon: 'bad',
    badge: 'Sehr beliebt'
  },
  {
    id: 'wohnen',
    title: 'Wohnbereich & Neubau',
    subtitle: 'Küche, Flur und Wohnräume',
    icon: null,
    badge: 'Großformat'
  },
  {
    id: 'balkon',
    title: 'Balkon & Terrasse',
    subtitle: 'Frostfeste Platten für draußen',
    icon: 'balkon',
    badge: 'Frostsicher'
  },
  {
    id: 'treppe',
    title: 'Treppen & Naturstein',
    subtitle: 'Stufen mit Fliesen, Granit oder Naturstein',
    icon: 'untergrund',
    badge: 'Präzision'
  },
  {
    id: 'untergrund',
    title: 'Untergrund & Abdichtung',
    subtitle: 'Boden ausgleichen, Bad abdichten (DIN\u00a018534)',
    icon: 'abdichtung',
    badge: 'DIN-Norm'
  }
];

export const AREA_OPTIONS = ['Bis 15 m²', '15 - 35 m²', '35 - 75 m²', 'Über 75 m²'];

export const TIMING_OPTIONS = ['Schnellstmöglich', 'In 1 - 3 Monaten', 'In mehr als 3 Monaten / Flexibel'];

/** Anzeige eines ungewählten Feldes in Zusammenfassung und Nachricht (E4-W1, F4: keine Vorauswahl) */
export const KEINE_ANGABE = 'keine Angabe';

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error' | 'whatsapp_opened';

export function useAnfrageFunnel() {
  const [step, setStep] = useState(1);
  // Keine Vorauswahl beim Laden (E4-W1, F4): gewählt wird nur, was die Besucherin selbst antippt.
  const [projectType, setProjectType] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [customArea, setCustomArea] = useState('');
  const [timing, setTiming] = useState('');
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [formInitTime] = useState<number>(() => Date.now());
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [referenceId, setReferenceId] = useState('');

  // Leer, wenn nichts gewählt oder eingetragen ist; Anzeige und Nachricht setzen dafür „keine Angabe“ ein
  const projectTitle = PROJECT_TYPES.find((p) => p.id === projectType)?.title ?? '';
  const eigeneFlaeche = customArea.trim();
  const finalArea = eigeneFlaeche ? `${eigeneFlaeche.replace(/\s*m²$/i, '')} m²` : selectedArea;
  const locationText = location.trim();

  const getWhatsAppMessage = () =>
    `Hallo Herr Tezgel,\nich interessiere mich für eine fachgerechte Fliesenverlegung:\n\n` +
    `📌 Projekt: ${projectTitle || KEINE_ANGABE}\n` +
    `📐 Fläche: ${finalArea ? `ca. ${finalArea}` : KEINE_ANGABE}\n` +
    `📍 Ort: ${locationText || KEINE_ANGABE}\n` +
    `⏱️ Gewünschter Zeitraum: ${timing || KEINE_ANGABE}\n\n` +
    `👤 Name: ${name}\n` +
    `📞 Telefon: ${phone}\n` +
    `✉️ E-Mail: ${email || KEINE_ANGABE}\n` +
    (notes ? `📝 Anmerkungen: ${notes}\n\n` : '\n') +
    `Bitte melden Sie sich bezüglich eines unverbindlichen Vor-Ort-Aufmaßes. Vielen Dank!`;

  const handleWhatsAppDirect = () => {
    if (!name || !phone) {
      setErrorMessage('Bitte tragen Sie zumindest Ihren Namen und eine Telefonnummer ein.');
      return;
    }
    openWhatsApp({
      phone: COMPANY_DATA.contact.whatsappNumber,
      text: getWhatsAppMessage(),
    });
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
        // Ungewählte Felder fehlen in der Nutzlast (JSON.stringify lässt undefined weg); die Anfrage enthält nur Gewähltes.
        body: JSON.stringify({
          inquiryType: 'general',
          projectType: projectType || undefined,
          projectTitle: projectTitle || undefined,
          contact: {
            name,
            phone,
            email: email || undefined,
            location: locationText || undefined
          },
          area: finalArea || undefined,
          timing: timing || undefined,
          notes: notes || undefined,
          honeypot: honeypot || undefined,
          _t: formInitTime
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Übertragung fehlgeschlagen.');
      }

      if (data.referenceId) {
        setReferenceId(data.referenceId);
      }

      setStatus('success');
    } catch (err: unknown) {
      console.error('Submission error:', err);
      const msg = err instanceof Error ? err.message : 'Es gab ein Problem bei der Übertragung.';
      setErrorMessage(msg);
      setStatus('error');
    }
  };

  const handleNewRequest = () => {
    setStatus('idle');
    setStep(1);
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setReferenceId('');
  };

  const handleBackToOverview = () => {
    setStatus('idle');
    setStep(1);
  };

  const selectArea = (opt: string) => {
    setSelectedArea(opt);
    setCustomArea('');
  };

  return {
    step,
    setStep,
    projectType,
    setProjectType,
    selectedArea,
    customArea,
    setCustomArea,
    timing,
    setTiming,
    location,
    setLocation,
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    notes,
    setNotes,
    honeypot,
    setHoneypot,
    status,
    errorMessage,
    referenceId,
    projectTitle,
    finalArea,
    locationText,
    handleWhatsAppDirect,
    handleOnlineSubmit,
    handleNewRequest,
    handleBackToOverview,
    selectArea
  };
}
