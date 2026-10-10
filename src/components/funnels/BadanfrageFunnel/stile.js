// Klassen der Badanfrage (E-011) – Gestaltung später nach kern/stile.ts.
export const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 placeholder:text-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition-all';

export const optionClass = (selected, padding = 'p-5') =>
    `group ${padding} rounded-xl border-2 text-left transition-all duration-200 ${
        selected
            ? 'border-orange-600 bg-orange-50 ring-2 ring-orange-600/20'
            : 'border-neutral-200 bg-white hover:border-orange-500/80 hover:-translate-y-0.5'
    }`;
