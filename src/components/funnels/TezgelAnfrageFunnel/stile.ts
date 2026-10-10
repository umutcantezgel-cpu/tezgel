// Klassen der Express-Anfrage (E-011) – Gestaltung später nach kern/stile.ts.
export const inputClass =
  'w-full px-4 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 placeholder:text-neutral-500 text-sm focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all';

export const optionClass = (selected: boolean) =>
  `py-3 px-3 rounded-xl text-sm font-bold border transition-all duration-200 ${
    selected
      ? 'bg-orange-50 text-orange-900 border-orange-600 ring-2 ring-orange-600/20'
      : 'bg-white text-neutral-800 border-neutral-200 hover:border-orange-500/80 hover:-translate-y-0.5'
  }`;
