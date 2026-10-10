// Logik der Express-Anfrage (E-011: aus TezgelAnfrageFunnel.tsx verschoben, Verhalten unverändert – gesperrt).
// Auswahllisten, Schritte, WhatsApp-Nachricht und Nutzlast für /api/anfrage.
import { Droplets, Sparkles, Sun, Layers, ShieldCheck } from 'lucide-react';

export const PROJECT_TYPES = [
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

export const AREA_OPTIONS = ['Bis 15 m²', '15 - 35 m²', '35 - 75 m²', 'Über 75 m²'];

export const TIMING_OPTIONS = ['Schnellstmöglich', 'In 1 - 3 Monaten', 'In mehr als 3 Monaten / Flexibel'];

export const STEPS = [
  { title: 'Welches Projekt planen Sie?', text: 'Wählen Sie Ihr Fachgewerk für eine passende Planung.' },
  { title: 'Fläche, Zeitraum & Ort', text: 'Eine grobe Orientierung genügt – Details klären wir beim Aufmaß.' },
  { title: 'Kontaktdaten & Absenden', text: 'Direkt online absenden oder alternativ per WhatsApp anfragen.' }
];

export type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error' | 'whatsapp_opened';

export function beschriftungen(projectType: string, customArea: string, selectedArea: string, location: string) {
  const projectTitle = PROJECT_TYPES.find((p) => p.id === projectType)?.title ?? projectType;
  const finalArea = customArea ? `${customArea.replace(/\s*m²$/i, '')} m²` : selectedArea;
  const locationText = location || 'Aßlar / Wetzlar / Hessen';
  return { projectTitle, finalArea, locationText };
}

interface NachrichtDaten { projectTitle: string; finalArea: string; locationText: string; timing: string; name: string; phone: string; email: string; notes: string }

export function nachricht({ projectTitle, finalArea, locationText, timing, name, phone, email, notes }: NachrichtDaten) {
  return (
    `Hallo Herr Tezgel,\nich interessiere mich für eine fachgerechte Fliesenverlegung:\n\n` +
    `📌 Projekt: ${projectTitle}\n` +
    `📐 Fläche: ca. ${finalArea}\n` +
    `📍 Ort: ${locationText}\n` +
    `⏱️ Gewünschter Zeitraum: ${timing}\n\n` +
    `👤 Name: ${name}\n` +
    `📞 Telefon: ${phone}\n` +
    `✉️ E-Mail: ${email || 'Nicht angegeben'}\n` +
    (notes ? `📝 Anmerkungen: ${notes}\n\n` : '\n') +
    `Bitte melden Sie sich bezüglich eines unverbindlichen Vor-Ort-Aufmaßes. Vielen Dank!`
  );
}

interface NutzlastDaten { projectType: string; projectTitle: string; name: string; phone: string; email: string; locationText: string; finalArea: string; timing: string; notes: string; honeypot: string; formInitTime: number }

export function nutzlast({ projectType, projectTitle, name, phone, email, locationText, finalArea, timing, notes, honeypot, formInitTime }: NutzlastDaten) {
  return {
    inquiryType: 'general',
    projectType,
    projectTitle,
    contact: {
      name,
      phone,
      email: email || undefined,
      location: locationText
    },
    area: finalArea,
    timing,
    notes: notes || undefined,
    honeypot: honeypot || undefined,
    _t: formInitTime
  };
}
