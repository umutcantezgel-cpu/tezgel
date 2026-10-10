// Klassen des Fliesen-Konfigurators (E-011) – Gestaltung später nach kern/stile.ts.
export const inputClass =
    'w-full px-4 py-2.5 rounded-tile-sm bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition-all';

export const cardOptionClass = (selected) =>
    `p-4 rounded-tile-md border-2 text-left transition-all duration-300 ${
        selected
            ? 'border-orange-600 bg-orange-50 ring-2 ring-orange-600/20'
            : 'border-slate-200 bg-white hover:border-orange-500 hover:-translate-y-0.5'
    }`;

export const chipOptionClass = (selected) =>
    `px-3 py-2.5 rounded-tile-sm border text-xs font-bold transition-all duration-300 ${
        selected
            ? 'bg-orange-50 text-orange-950 border-orange-600 ring-2 ring-orange-600/20'
            : 'bg-white text-slate-700 border-slate-200 hover:border-orange-500'
    }`;

export const legendClass = 'block text-xs font-black text-slate-800 mb-2';
export const labelClass = 'block text-xs font-bold text-slate-800 mb-1';
export const linkClass = 'font-bold text-orange-600 hover:text-orange-700 underline underline-offset-2';
